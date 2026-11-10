import React, { useState } from 'react';
import {
  ArrowUpRight,
  Languages,
  Bookmark,
  Award,
  Sparkles,
  CheckCircle2,
  Play,
  Compass,
  Users,
  Gamepad2,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { KazakhOrnament } from '@/components/ui/KazakhOrnament';
import { CHAPTERS, scrollToSection } from '@/data/chapters';

export interface ExhibitionGuideProps {
  visitedHalls?: string[];
  activeSection?: string;
}

interface CuratedRoute {
  id: string;
  icon: React.FC<{ className?: string }>;
  titleKz: string;
  titleEn: string;
  timeKz: string;
  timeEn: string;
  descKz: string;
  descEn: string;
  stops: string[];
}

const CURATED_ROUTES: CuratedRoute[] = [
  {
    id: 'express',
    icon: Sparkles,
    titleKz: 'Қысқа танысу туры',
    titleEn: '5-Minute Express Tour',
    timeKz: '5 мин · 3 зал',
    timeEn: '5 min · 3 halls',
    descKz: 'Алаш қозғалысының мәнін тез әрі түсінікті шолып шығу',
    descEn: 'Grasp the core story of the Alash movement in three essential halls',
    stops: ['intro', 'timeline', 'conclusion'],
  },
  {
    id: 'intellectuals',
    icon: Users,
    titleKz: 'Тұлғалар мен Баспасөз',
    titleEn: 'Leaders & Periodicals',
    timeKz: '8 мин · 3 зал',
    timeEn: '8 min · 3 halls',
    descKz: '16 қайраткердің тағдыры, «Айқап» пен «Қазақ» газеттері және құжаттар',
    descEn: 'Explore 16 biographies, original press excerpts, and primary charters',
    stops: ['figures', 'press', 'documents'],
  },
  {
    id: 'interactive',
    icon: Gamepad2,
    titleKz: 'Интерактивті ойын туры',
    titleEn: 'Interactive Quest & Quiz',
    timeKz: '10 мин · 3 зал',
    timeEn: '10 min · 3 halls',
    descKz: 'Картадан қалаларды зерттеп, 5 миссия мен 15 сұрақтық тесттен өтіңіз',
    descEn: 'Navigate the steppe map, solve 5 historian missions, and take the quiz',
    stops: ['map', 'missions', 'quiz'],
  },
];

const HALL_BADGES: Record<string, { kz: string; en: string }> = {
  intro: { kz: '~2 мин оқу', en: '~2 min read' },
  timeline: { kz: '14 оқиға', en: '14 events' },
  figures: { kz: '16 тұлға', en: '16 profiles' },
  press: { kz: '8 мақала', en: '8 issues' },
  map: { kz: '12 қала', en: '12 cities' },
  documents: { kz: '6 құжат', en: '6 charters' },
  missions: { kz: '5 ойын', en: '5 games' },
  quiz: { kz: '15 сұрақ', en: '15 questions' },
  conclusion: { kz: 'Қорытынды', en: 'Synthesis' },
};

/**
 * Virtual Museum Lobby — gives visitors curated tour routes, live hall
 * completion tracking, and 9 clear interactive hall cards.
 */
export const ExhibitionGuide: React.FC<ExhibitionGuideProps> = ({
  visitedHalls = [],
  activeSection = '',
}) => {
  const { language } = useLanguage();
  const isKz = language === 'kz';
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  const visitedCount = visitedHalls.length;
  const progressPct = Math.round((visitedCount / CHAPTERS.length) * 100);
  const selectedRoute = CURATED_ROUTES.find((r) => r.id === selectedRouteId) || null;

  const tips = [
    {
      icon: Languages,
      kz: 'Жоғарғы оң жақтағы KZ / EN арқылы тілді кез келген сәтте ауыстырыңыз',
      en: 'Switch language anytime with KZ / EN at the top right',
    },
    {
      icon: Bookmark,
      kz: 'Ұнаған тұлға мен құжатты бетбелгіге сақтап, жеке қор жинаңыз',
      en: 'Bookmark figures and documents into your personal collection',
    },
    {
      icon: Award,
      kz: 'Миссиялар мен тесттен өтіп, зерттеуші ұпайлары мен белгілерін жинаңыз',
      en: 'Complete missions and the quiz to earn historian badges and points',
    },
  ];

  return (
    <section
      id="guide"
      aria-labelledby="guide-heading"
      className="relative py-14 sm:py-24 bg-paper-texture border-b border-soft-line/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-archive-paper/70 border border-soft-line font-mono text-[11px] uppercase tracking-[0.2em] text-deep-burgundy">
            <Compass className="w-3.5 h-3.5 text-muted-gold" />
            {isKz ? 'ВИРТУАЛДЫ МУЗЕЙ НАВИГАТОРЫ' : 'VIRTUAL MUSEUM NAVIGATOR'}
          </span>
          <h2
            id="guide-heading"
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-ink-brown mt-3 mb-3 leading-tight"
          >
            {isKz ? 'Музейді қалай аралаймыз?' : 'How to Explore the Museum'}
          </h2>
          <KazakhOrnament variant="divider" size={72} className="my-3" />
          <p className="font-sans text-sm sm:text-lg text-ink-brown/75 leading-relaxed">
            {isKz
              ? 'Дайын 3 маршруттың бірін таңдаңыз немесе төмендегі 9 көрме залының кез келгеніне бірден кіріңіз.'
              : 'Pick one of 3 guided routes below, or step directly into any of the 9 exhibition halls.'}
          </p>
        </div>

        {/* Live Virtual Tour Progress Bar + 3 Curated Routes */}
        <div className="rounded-2xl border border-soft-line bg-warm-ivory/90 p-4 sm:p-6 shadow-parchment mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-soft-line/60">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-deep-burgundy text-warm-ivory font-mono text-xs font-bold shadow-xs">
                {visitedCount}/{CHAPTERS.length}
              </span>
              <div>
                <span className="font-serif font-bold text-base sm:text-lg text-ink-brown block leading-snug">
                  {isKz ? 'Виртуалды экскурсия барысы' : 'Virtual Tour Progress'}
                </span>
                <span className="font-mono text-[11px] text-ink-brown/65">
                  {visitedCount === 0
                    ? isKz
                      ? 'Маршрут таңдап, саяхатты бастаңыз'
                      : 'Choose a route or hall below to begin'
                    : isKz
                    ? `${visitedCount} зал қаралды (${progressPct}%)`
                    : `${visitedCount} of ${CHAPTERS.length} halls explored (${progressPct}%)`}
                </span>
              </div>
            </div>

            <div className="w-full sm:w-52">
              <div className="h-2 w-full rounded-full bg-archive-paper overflow-hidden border border-soft-line/60">
                <div
                  className="h-full bg-gradient-to-r from-deep-burgundy via-muted-gold to-forest-ink transition-all duration-500"
                  style={{ width: `${Math.max(progressPct, 4)}%` }}
                />
              </div>
            </div>
          </div>

          {/* 3 Guided Route Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {CURATED_ROUTES.map((route) => {
              const Icon = route.icon;
              const isSelected = selectedRouteId === route.id;
              return (
                <div
                  key={route.id}
                  className={`rounded-xl border p-4 transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'border-deep-burgundy bg-archive-paper/65 shadow-subtle'
                      : 'border-soft-line bg-archive-paper/25 hover:bg-archive-paper/50 hover:border-muted-gold/70'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-deep-burgundy">
                        <Icon className="w-3.5 h-3.5 text-muted-gold" />
                        {isKz ? route.timeKz : route.timeEn}
                      </span>
                      {isSelected && (
                        <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-deep-burgundy text-warm-ivory">
                          {isKz ? 'Таңдалды' : 'Active'}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-ink-brown">
                      {isKz ? route.titleKz : route.titleEn}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-ink-brown/75 mt-1 leading-relaxed">
                      {isKz ? route.descKz : route.descEn}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-soft-line/50 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      {route.stops.map((stopId) => {
                        const ch = CHAPTERS.find((c) => c.id === stopId);
                        return (
                          <span
                            key={stopId}
                            className="px-1.5 py-0.5 rounded bg-warm-ivory border border-soft-line font-mono text-[10px] text-ink-brown/80"
                          >
                            {ch?.num}
                          </span>
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRouteId(route.id);
                        scrollToSection(route.stops[0]);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-deep-burgundy hover:bg-burgundy-hover text-warm-ivory font-sans text-xs font-semibold transition-all active:scale-95"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      {isKz ? 'Бастау' : 'Start'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 9 Chapter Hall Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {CHAPTERS.map((chapter) => {
            const Icon = chapter.icon;
            const isVisited = visitedHalls.includes(chapter.id);
            const isCurrent = activeSection === chapter.id;
            const isHighlightedByRoute = selectedRoute
              ? selectedRoute.stops.includes(chapter.id)
              : false;
            const metaBadge = HALL_BADGES[chapter.id];

            return (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(chapter.id);
                }}
                className={`lift-card group relative flex flex-col overflow-hidden rounded-2xl border p-5 sm:p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-burgundy ${
                  isHighlightedByRoute
                    ? 'border-deep-burgundy/70 bg-warm-ivory ring-1 ring-deep-burgundy/25'
                    : isCurrent
                    ? 'border-muted-gold bg-warm-ivory'
                    : 'border-soft-line bg-warm-ivory/85 hover:border-muted-gold/70'
                }`}
              >
                {/* Animated top accent */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-deep-burgundy via-muted-gold to-deep-burgundy transition-transform duration-500 ${
                    isHighlightedByRoute || isVisited
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
                {/* Faded numeral */}
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-3 font-serif text-[5.25rem] sm:text-[6.25rem] font-bold leading-none text-archive-paper/65 transition-all duration-500 group-hover:text-muted-gold/25 group-hover:-translate-y-1 select-none"
                >
                  {chapter.num}
                </span>

                <div className="relative flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-forest-ink text-muted-gold shadow-md transition-all duration-500 group-hover:bg-deep-burgundy group-hover:text-warm-ivory group-hover:rotate-[-6deg] group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="font-mono text-[11px] tracking-[0.18em] text-muted-gold block">
                        {isKz ? 'ЗАЛ' : 'HALL'} {chapter.num}
                      </span>
                      {metaBadge && (
                        <span className="font-mono text-[10px] text-ink-brown/60">
                          {isKz ? metaBadge.kz : metaBadge.en}
                        </span>
                      )}
                    </div>
                  </div>

                  {isVisited && (
                    <span className="relative z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-forest-ink/10 text-forest-ink font-mono text-[10px] font-semibold">
                      <CheckCircle2 className="w-3 h-3 text-forest-ink" />
                      {isKz ? 'Қаралды' : 'Visited'}
                    </span>
                  )}
                </div>

                <h3 className="relative mt-4 sm:mt-5 font-serif text-xl sm:text-2xl font-bold text-ink-brown transition-colors group-hover:text-deep-burgundy">
                  {isKz ? chapter.title.kz : chapter.title.en}
                </h3>
                <p className="relative mt-1.5 sm:mt-2 flex-1 font-sans text-xs sm:text-sm text-ink-brown/75 leading-relaxed">
                  {isKz ? chapter.desc.kz : chapter.desc.en}
                </p>

                <span className="relative mt-4 sm:mt-5 inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold text-deep-burgundy">
                  {isKz ? 'Залға кіру' : 'Enter hall'}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </a>
            );
          })}
        </div>

        {/* Quick tips */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {tips.map((tip, i) => {
            const Icon = tip.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-dashed border-soft-line bg-archive-paper/30 p-3.5 sm:p-4"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted-gold/15 text-deep-burgundy">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="font-sans text-xs sm:text-sm text-ink-brown/80 leading-relaxed">
                  {isKz ? tip.kz : tip.en}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
