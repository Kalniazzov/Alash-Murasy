import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { KazakhOrnament } from '@/components/ui/KazakhOrnament';
import { scrollToSection } from '@/data/chapters';

export interface HeroProps {
  onExploreClick?: () => void;
  onMissionClick?: () => void;
}

const MARQUEE_NAMES = {
  kz: [
    'Ә. Бөкейхан',
    'А. Байтұрсынұлы',
    'М. Дулатұлы',
    'Ж. Досмұхамедов',
    'Х. Досмұхамедов',
    'М. Тынышбаев',
    'М. Жұмабаев',
    'Ж. Аймауытов',
    'М. Әуезов',
    'С. Торайғыров',
    'М. Сералин',
    'Ә. Ермеков',
  ],
  en: [
    'A. Bokeikhan',
    'A. Baitursynuly',
    'M. Dulatuly',
    'Zh. Dosmukhamedov',
    'Kh. Dosmukhamedov',
    'M. Tynyshpaev',
    'M. Zhumabaev',
    'Zh. Aimauytov',
    'M. Auezov',
    'S. Toraighyrov',
    'M. Seralin',
    'A. Ermekov',
  ],
};

const ORBIT_CHIPS = [
  { kz: '1905 · Петиция', en: '1905 · Petition', pos: 'top-2 left-0 sm:top-[6%] sm:-left-[4%]', delay: '0s' },
  { kz: '1911 · «Айқап»', en: '1911 · Aiqap', pos: 'top-10 right-0 sm:top-[18%] sm:-right-[8%]', delay: '1.2s' },
  { kz: '1913 · «Қазақ»', en: '1913 · Qazaq', pos: 'bottom-10 left-0 sm:bottom-[18%] sm:-left-[10%]', delay: '2.1s' },
  { kz: '1917 · Алашорда', en: '1917 · Alash Orda', pos: 'bottom-2 right-0 sm:bottom-[4%] sm:right-[2%]', delay: '0.6s' },
];

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onMissionClick }) => {
  const { language, t } = useLanguage();
  const isKz = language === 'kz';

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
    callback?: () => void
  ) => {
    e.preventDefault();
    if (callback) callback();
    const el = document.querySelector(targetId);
    if (el && typeof el.scrollIntoView === 'function') {
      try {
        el.scrollIntoView({ behavior: 'smooth' });
      } catch {
        el.scrollIntoView();
      }
    }
  };

  const title = t('hero.title', isKz ? 'Ұлт оянған дәуір' : 'The Era of National Awakening');
  const words = title.split(' ');
  const highlightIndex = isKz ? Math.min(1, words.length - 1) : words.length - 1;
  const names = isKz ? MARQUEE_NAMES.kz : MARQUEE_NAMES.en;
  const ringText = isKz
    ? 'ҰЛТ · БІЛІМ · ТІЛ · ЖЕР · ТЕҢДІК · АЗАТТЫҚ · ҰЛТ · БІЛІМ · ТІЛ · ЖЕР · ТЕҢДІК · АЗАТТЫҚ · '
    : 'NATION · KNOWLEDGE · LANGUAGE · LAND · EQUALITY · FREEDOM · NATION · KNOWLEDGE · LANGUAGE · ';

  const stats = [
    {
      value: t('hero.stats.era_value', '1905–1920'),
      label: t('hero.stats.era_label', isKz ? 'Тарихи кезең' : 'Historical Era'),
      targetId: 'timeline',
    },
    {
      value: t('hero.stats.figures_value', '16+'),
      label: t('hero.stats.figures_label', isKz ? 'Алаш тұлғасы' : 'Intellectual Leaders'),
      targetId: 'figures',
    },
    {
      value: t('hero.stats.press_value', '2'),
      label: t('hero.stats.press_label', isKz ? 'Ұлттық басылым («Айқап», «Қазақ»)' : 'National Periodicals ("Aiqap", "Qazaq")'),
      targetId: 'press',
    },
    {
      value: t('hero.stats.docs_value', '100+'),
      label: t('hero.stats.docs_label', isKz ? 'Архивтік құжат пен дерек' : 'Archival Documents'),
      targetId: 'documents',
    },
  ];

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-forest-ink text-warm-ivory"
    >
      {/* ===== Animated atmosphere ===== */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-steppe-dots" />
        <div className="absolute -top-48 -left-40 h-[420px] sm:h-[560px] w-[420px] sm:w-[560px] rounded-full bg-deep-burgundy/45 blur-[110px] animate-drift" />
        <div className="absolute top-1/4 -right-48 h-[420px] sm:h-[600px] w-[420px] sm:w-[600px] rounded-full bg-muted-gold/20 blur-[130px] animate-drift-slow" />
        <div className="absolute -bottom-40 left-1/3 h-[340px] sm:h-[420px] w-[340px] sm:w-[420px] rounded-full bg-[#2E3D39] blur-[110px] animate-drift" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-forest-ink" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center lg:min-h-[calc(100vh-84px)] py-10 sm:py-14 lg:py-10">
          {/* ===== Left: Narrative ===== */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div
              className="animate-fade-up inline-flex flex-wrap items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-muted-gold/40 bg-white/[0.05] backdrop-blur-sm text-[10px] sm:text-xs font-mono tracking-[0.16em] sm:tracking-[0.2em] text-muted-gold uppercase"
              style={{ animationDelay: '0.05s' }}
            >
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-muted-gold animate-pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-muted-gold" />
              </span>
              <span>
                {t('hero.eyebrow', isKz ? 'ҚАЗАҚСТАН ТАРИХЫ · 1900—1920' : 'HISTORY OF KAZAKHSTAN · 1900—1920')}
              </span>
              <span className="hidden sm:inline text-warm-ivory/40">·</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-warm-ivory/80">
                <Sparkles className="w-3 h-3 text-muted-gold" />
                {isKz ? 'ВИРТУАЛДЫ МУЗЕЙ' : 'VIRTUAL MUSEUM'}
              </span>
            </div>

            <h1
              id="hero-title"
              className="mt-5 sm:mt-7 font-serif font-bold tracking-tight leading-[1.06] text-4xl sm:text-6xl lg:text-7xl xl:text-[5.35rem]"
            >
              {words.map((word, i) => (
                <React.Fragment key={`${word}-${i}`}>
                  <span
                    className={`inline-block animate-fade-up ${
                      i === highlightIndex ? 'italic text-gold-shimmer pr-1.5 sm:pr-2' : 'text-warm-ivory'
                    }`}
                    style={{ animationDelay: `${0.15 + i * 0.14}s` }}
                  >
                    {word}
                  </span>
                  {i < words.length - 1 ? ' ' : ''}
                </React.Fragment>
              ))}
            </h1>

            <div
              className="mt-5 sm:mt-6 h-px w-32 sm:w-40 origin-left bg-gradient-to-r from-muted-gold to-transparent animate-draw-line"
              style={{ animationDelay: '0.6s' }}
              aria-hidden="true"
            />

            <p
              className="mt-5 sm:mt-6 font-sans text-base sm:text-xl text-warm-ivory/80 leading-relaxed max-w-2xl animate-fade-up"
              style={{ animationDelay: '0.55s' }}
            >
              {t(
                'hero.subtitle',
                isKz
                  ? 'Білімге ұмтылған, баспасөз арқылы халық үнін жеткізген және ұлттық мемлекеттілік идеясын көтерген қазақ зиялыларының тарихын зертте.'
                  : 'Discover the Kazakh intellectuals who advanced education, built a national press, and shaped the idea of self-governance.'
              )}
            </p>

            <div
              className="mt-7 sm:mt-9 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto animate-fade-up"
              style={{ animationDelay: '0.7s' }}
            >
              <a
                role="button"
                href="#timeline"
                onClick={(e) => handleSmoothScroll(e, '#timeline', onExploreClick)}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-muted-gold text-forest-ink font-sans font-semibold text-sm sm:text-base shadow-[0_12px_40px_-12px_rgba(177,138,82,0.8)] hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-12px_rgba(177,138,82,0.95)] active:scale-[0.98] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest-ink"
              >
                <span>{t('hero.cta_explore', isKz ? 'Тарихты зерттеу' : 'Explore the story')}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                role="button"
                href="#missions"
                onClick={(e) => handleSmoothScroll(e, '#missions', onMissionClick)}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full border border-warm-ivory/25 bg-white/[0.04] backdrop-blur-sm text-warm-ivory font-sans font-medium text-sm sm:text-base hover:bg-white/10 hover:border-warm-ivory/50 active:scale-[0.98] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-gold"
              >
                <Compass className="w-4 h-4 text-muted-gold transition-transform duration-500 group-hover:rotate-[360deg]" />
                <span>{t('hero.cta_mission', isKz ? 'Тарихи миссияны бастау' : 'Start the historical mission')}</span>
              </a>
            </div>

            <blockquote
              className="mt-8 sm:mt-10 max-w-xl border-l-2 border-muted-gold/60 pl-3.5 sm:pl-4 font-serif italic text-sm sm:text-lg text-warm-ivory/65 animate-fade-up"
              style={{ animationDelay: '0.85s' }}
            >
              {isKz
                ? '«Біз де ел болып, өз тізгінімізді өзіміз алып, теңдікке жетер күн бар ма?» — Әлихан Бөкейхан'
                : '"Will the day come when we, as an equal nation, take our own reins and achieve freedom?" — Alikhan Bokeikhan'}
            </blockquote>
          </div>

          {/* ===== Right: Animated seal composition ===== */}
          <div className="lg:col-span-5 flex justify-center px-2 sm:px-0" aria-hidden="true">
            <div
              className="relative w-[250px] h-[250px] sm:w-[360px] sm:h-[360px] lg:w-[430px] lg:h-[430px] animate-scale-in"
              style={{ animationDelay: '0.3s' }}
            >
              {/* Concentric rings */}
              <div className="absolute inset-0 rounded-full border border-muted-gold/25" />
              <div className="absolute inset-4 sm:inset-5 rounded-full border border-dashed border-muted-gold/35 animate-spin-slow" />
              <div className="absolute inset-[22%] rounded-full border border-warm-ivory/10" />

              {/* Rotating circular inscription */}
              <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full animate-spin-slower">
                <defs>
                  <path id="hero-ring-path" d="M200,200 m-160,0 a160,160 0 1,1 320,0 a160,160 0 1,1 -320,0" />
                </defs>
                <text className="fill-muted-gold/70" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13, letterSpacing: 4 }}>
                  <textPath href="#hero-ring-path">{ringText}</textPath>
                </text>
              </svg>

              {/* Glowing core */}
              <div className="absolute inset-[29%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#8b3a41_0%,#722F35_45%,#3a1a1d_100%)] shadow-[0_0_80px_10px_rgba(114,47,53,0.55)] flex items-center justify-center animate-float">
                <span className="absolute inset-0 rounded-full border border-muted-gold/60 animate-pulse-ring" />
                <KazakhOrnament variant="seal" size={96} color="#E9CF9C" />
              </div>

              {/* Orbiting year chips (clamped safely on 360px mobile screens) */}
              {ORBIT_CHIPS.map((chip) => (
                <div
                  key={chip.en}
                  className={`absolute ${chip.pos} animate-float-slow`}
                  style={{ animationDelay: chip.delay }}
                >
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-muted-gold/40 bg-forest-ink/90 backdrop-blur px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs text-warm-ivory/95 shadow-lg">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-gold" />
                    {isKz ? chip.kz : chip.en}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== Interactive Stats Strip (Click any counter to jump to its hall) ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              onClick={() => scrollToSection(stat.targetId)}
              className="group cursor-pointer rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-4 sm:p-6 text-center hover:border-muted-gold/60 hover:bg-white/[0.08] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${0.9 + i * 0.1}s` }}
            >
              <span className="block font-serif font-bold text-2xl sm:text-4xl text-muted-gold transition-transform duration-300 group-hover:scale-105">
                {stat.value}
              </span>
              <span className="mt-1 sm:mt-1.5 block font-sans text-[11px] sm:text-sm text-warm-ivory/70 leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* ===== Scroll prompt ===== */}
        <div className="pt-8 sm:pt-12 pb-6 sm:pb-8 flex justify-center">
          <a
            href="#intro"
            onClick={(e) => handleSmoothScroll(e, '#intro')}
            className="group inline-flex flex-col items-center gap-2.5 text-warm-ivory/60 hover:text-muted-gold transition-colors"
            aria-label={isKz ? 'Төмен жылжып зерттеу' : 'Scroll down to explore'}
          >
            <span className="relative flex h-9 w-5 sm:h-10 sm:w-6 justify-center rounded-full border-2 border-current">
              <span className="mt-1.5 h-2 w-1 rounded-full bg-current animate-scroll-dot" />
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase">
              {t('hero.scroll_prompt', isKz ? 'ТӨМЕН СЫРҒЫТЫҢЫЗ ↓' : 'SCROLL TO EXPLORE ↓')}
            </span>
          </a>
        </div>
      </div>

      {/* ===== Names marquee ===== */}
      <div className="relative border-t border-white/10 bg-black/25 py-3.5 sm:py-4 overflow-hidden mask-fade-x" aria-hidden="true">
        <div className="marquee-track flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {names.map((name) => (
                <span
                  key={`${dup}-${name}`}
                  className="flex items-center gap-5 sm:gap-6 px-5 sm:px-6 font-serif text-base sm:text-xl italic text-warm-ivory/50 hover:text-muted-gold transition-colors"
                >
                  {name}
                  <span className="text-muted-gold/60 not-italic text-xs">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
