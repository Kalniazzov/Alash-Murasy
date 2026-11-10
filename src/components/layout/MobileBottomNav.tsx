import React from 'react';
import { ChevronLeft, ChevronRight, Users, Map as MapIcon, Compass, Trophy } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { CHAPTERS, scrollToSection } from '@/data/chapters';

export interface MobileBottomNavProps {
  activeSection?: string;
}

/**
 * Thumb-friendly floating Virtual Museum Tour dock on mobile screens (< md).
 * Lets visitors step hall-by-hall or jump directly to interactive halls.
 */
export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeSection = '' }) => {
  const { language } = useLanguage();
  const isKz = language === 'kz';

  const currentIdx = CHAPTERS.findIndex((c) => c.id === activeSection);
  const currentChapter = currentIdx >= 0 ? CHAPTERS[currentIdx] : null;

  const handleStep = (delta: number) => {
    if (currentIdx === -1) {
      scrollToSection(delta > 0 ? CHAPTERS[0].id : CHAPTERS[CHAPTERS.length - 1].id);
      return;
    }
    const nextIdx = Math.min(CHAPTERS.length - 1, Math.max(0, currentIdx + delta));
    scrollToSection(CHAPTERS[nextIdx].id);
  };

  const quickStops = [
    { id: 'figures', icon: Users, kz: 'Тұлға', en: 'Figures' },
    { id: 'map', icon: MapIcon, kz: 'Карта', en: 'Map' },
    { id: 'missions', icon: Compass, kz: 'Ойын', en: 'Quest' },
    { id: 'quiz', icon: Trophy, kz: 'Тест', en: 'Quiz' },
  ];

  return (
    <div
      role="region"
      aria-label={isKz ? 'Мобильді виртуалды гид тақтасы' : 'Mobile virtual tour bar'}
      className="md:hidden fixed bottom-2.5 inset-x-3 z-30 rounded-2xl border border-muted-gold/35 bg-forest-ink/95 text-warm-ivory backdrop-blur-md shadow-[0_12px_32px_rgba(20,27,25,0.55)] px-2.5 py-2"
    >
      <div className="flex items-center justify-between gap-1.5">
        {/* Hall Stepper: Prev / Current Hall / Next */}
        <div className="flex items-center gap-1 min-w-0">
          <button
            type="button"
            onClick={() => handleStep(-1)}
            aria-label={isKz ? 'Алдыңғы зал' : 'Previous hall'}
            className="p-2 rounded-xl bg-white/[0.07] active:bg-muted-gold active:text-forest-ink transition-colors shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('guide')}
            className="px-2 py-1 text-left min-w-0 truncate"
            aria-label={isKz ? 'Көрме жоспарына өту' : 'Jump to museum guide'}
          >
            <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-gold leading-none">
              {currentChapter
                ? `${isKz ? 'ЗАЛ' : 'HALL'} ${currentChapter.num}/09`
                : isKz
                ? '9 ЗАЛДЫҚ ТУР'
                : '9-HALL TOUR'}
            </span>
            <span className="block font-sans text-xs font-semibold text-warm-ivory truncate max-w-[96px]">
              {currentChapter
                ? isKz
                  ? currentChapter.title.kz
                  : currentChapter.title.en
                : isKz
                ? 'Экскурсия'
                : 'Start Tour'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleStep(1)}
            aria-label={isKz ? 'Келесі зал' : 'Next hall'}
            className="p-2 rounded-xl bg-muted-gold text-forest-ink font-bold active:scale-95 transition-transform shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Divider */}
        <span className="h-6 w-px bg-white/15 shrink-0" aria-hidden="true" />

        {/* Quick-jump interactive halls */}
        <div className="flex items-center gap-0.5">
          {quickStops.map((stop) => {
            const Icon = stop.icon;
            const active = activeSection === stop.id;
            return (
              <button
                key={stop.id}
                type="button"
                onClick={() => scrollToSection(stop.id)}
                className={`flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-colors ${
                  active
                    ? 'bg-deep-burgundy text-warm-ivory'
                    : 'text-warm-ivory/75 hover:text-warm-ivory active:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="font-sans text-[9px] font-medium mt-0.5 leading-none">
                  {isKz ? stop.kz : stop.en}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

