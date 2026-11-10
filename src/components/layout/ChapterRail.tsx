import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { CHAPTERS, scrollToSection } from '@/data/chapters';

export interface ChapterRailProps {
  activeSection?: string;
}

/**
 * Fixed side "chapter rail" (desktop) — shows where the visitor is in the
 * exhibition and lets them jump between chapters with one click.
 */
export const ChapterRail: React.FC<ChapterRailProps> = ({ activeSection = '' }) => {
  const { language } = useLanguage();
  const isKz = language === 'kz';
  const activeIndex = CHAPTERS.findIndex((c) => c.id === activeSection);
  const isVisible = activeIndex !== -1;

  return (
    <div
      role="group"
      aria-label={isKz ? 'Көрме бөлімдері бойынша жылжу' : 'Exhibition chapter rail'}
      className={`hidden xl:flex fixed right-5 top-1/2 z-30 -translate-y-1/2 flex-col items-end gap-1 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6 pointer-events-none'
      }`}
    >
      {/* Progress track */}
      <span aria-hidden="true" className="absolute right-[11px] top-3 bottom-3 w-px bg-soft-line" />
      <span
        aria-hidden="true"
        className="absolute right-[11px] top-3 w-px origin-top bg-deep-burgundy transition-all duration-500"
        style={{
          height: isVisible ? `calc((100% - 1.5rem) * ${activeIndex / (CHAPTERS.length - 1)})` : 0,
        }}
      />
      {CHAPTERS.map((chapter, idx) => {
        const isActive = chapter.id === activeSection;
        const isPast = isVisible && idx < activeIndex;
        const label = isKz ? chapter.title.kz : chapter.title.en;
        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => scrollToSection(chapter.id)}
            aria-label={`${isKz ? 'Бөлім' : 'Chapter'} ${chapter.num}: ${label}`}
            aria-current={isActive ? 'step' : undefined}
            tabIndex={isVisible ? 0 : -1}
            className="group relative flex items-center gap-3 py-1.5"
          >
            <span
              className={`whitespace-nowrap rounded-full px-3 py-1 font-sans text-xs font-medium shadow-sm transition-all duration-300 ${
                isActive
                  ? 'bg-deep-burgundy text-warm-ivory opacity-100 translate-x-0'
                  : 'bg-warm-ivory/95 text-ink-brown border border-soft-line opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              <span className="font-mono opacity-70 mr-1">{chapter.num}</span>
              {label}
            </span>
            <span
              className={`relative z-10 flex h-[23px] w-[23px] items-center justify-center rounded-full border-2 transition-all duration-300 ${
                isActive
                  ? 'border-deep-burgundy bg-deep-burgundy scale-110'
                  : isPast
                  ? 'border-deep-burgundy bg-warm-ivory'
                  : 'border-soft-line bg-warm-ivory group-hover:border-muted-gold'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  isActive ? 'bg-warm-ivory' : isPast ? 'bg-deep-burgundy' : 'bg-soft-line group-hover:bg-muted-gold'
                }`}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
};

