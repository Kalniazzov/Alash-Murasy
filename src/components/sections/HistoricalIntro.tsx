import React from 'react';
import { BookOpen, Newspaper, Landmark, ArrowRight, Calendar } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { KazakhOrnament } from '@/components/ui/KazakhOrnament';

export interface HistoricalIntroProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const HistoricalIntro: React.FC<HistoricalIntroProps> = ({ onNavigateSection }) => {
  const { language, t } = useLanguage();
  const isKz = language === 'kz';

  const handleJump = (e: React.MouseEvent<HTMLAnchorElement>, targetHref: string) => {
    e.preventDefault();
    if (onNavigateSection) {
      onNavigateSection(targetHref.replace('#', ''));
    }
    const el = document.querySelector(targetHref);
    if (el && typeof el.scrollIntoView === 'function') {
      try {
        el.scrollIntoView({ behavior: 'smooth' });
      } catch {
        el.scrollIntoView();
      }
    }
  };

  const pillars = [
    {
      id: 'education',
      numeral: isKz ? '01 / БІЛІМ' : '01 / EDUCATION',
      title: t('intro.pillar_education_title', isKz ? 'Білім және Ағарту' : 'Education & Enlightenment'),
      badge: t('intro.pillar_education_tag', isKz ? 'Оқу-ағарту ісі' : 'Enlightenment'),
      desc: t(
        'intro.pillar_education_desc',
        isKz
          ? 'Жәдиттік мектептер, алғашқы төл оқулықтар, Санкт-Петербург, Қазан және Мәскеу университеттерінде білім алған жаңа зиялы толқын.'
          : 'Jadid reform schools, native Kazakh textbooks, and a new generation educated at St. Petersburg, Kazan, and Moscow universities.'
      ),
      icon: BookOpen,
      targetHref: '#figures',
    },
    {
      id: 'press',
      numeral: isKz ? '02 / БАСПАСӨЗ' : '02 / PRESS',
      title: t('intro.pillar_press_title', isKz ? 'Ұлттық баспасөз' : 'The National Press'),
      badge: t('intro.pillar_press_tag', isKz ? '«Айқап» пен «Қазақ»' : '"Aiqap" & "Qazaq"'),
      desc: t(
        'intro.pillar_press_desc',
        isKz
          ? '«Айқап» журналы мен «Қазақ» газеті халықтың саяси мінберіне айналып, қоғамдық сананы оятты, азаттық идеясын таратты.'
          : 'The "Aiqap" journal and "Qazaq" newspaper served as the political podium for the nation, awakening public consciousness and defending native rights.'
      ),
      icon: Newspaper,
      targetHref: '#press',
    },
    {
      id: 'politics',
      numeral: isKz ? '03 / САЯСИ САНА' : '03 / POLITICS',
      title: t('intro.pillar_politics_title', isKz ? 'Саяси сана және Автономия' : 'Political Awakening & Autonomy'),
      badge: t('intro.pillar_politics_tag', isKz ? 'Алаш идеясы' : 'The Alash Idea'),
      desc: t(
        'intro.pillar_politics_desc',
        isKz
          ? '1905 жылғы Қарқаралы петициясынан бастап, Мемлекеттік Думадағы депутаттық қызмет және 1917 жылғы Алаш автономиясын жариялау.'
          : 'From the 1905 Qarqaraly Petition to State Duma parliamentary representation and the declaration of Alash Autonomy in 1917.'
      ),
      icon: Landmark,
      targetHref: '#timeline',
    },
  ];

  const milestones = [
    {
      year: '1905',
      label: t('intro.milestone_1905', isKz ? '1905 — Қарқаралы петициясы' : '1905 — Qarqaraly Petition'),
      targetHref: '#timeline',
    },
    {
      year: '1911',
      label: t('intro.milestone_1911', isKz ? '1911 — «Айқап» журналы' : '1911 — "Aiqap" Journal'),
      targetHref: '#press',
    },
    {
      year: '1913',
      label: t('intro.milestone_1913', isKz ? '1913 — «Қазақ» газеті' : '1913 — "Qazaq" Newspaper'),
      targetHref: '#press',
    },
    {
      year: '1917',
      label: t('intro.milestone_1917', isKz ? '1917 — Алаш автономиясы' : '1917 — Alash Autonomy'),
      targetHref: '#timeline',
    },
  ];

  return (
    <section
      id="intro"
      aria-labelledby="intro-title"
      className="py-16 sm:py-24 bg-warm-ivory border-b border-soft-line/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-archive-paper/80 border border-soft-line rounded text-xs font-mono tracking-widest text-ink-brown uppercase">
            <span className="text-muted-gold">✦</span>
            <span>{t('intro.badge', isKz ? 'ТАРИХИ КӨРІНІС' : 'HISTORICAL CONTEXT')}</span>
            <span className="text-muted-gold">✦</span>
          </div>

          <h2
            id="intro-title"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-brown leading-tight"
          >
            {t('intro.title', isKz ? 'ХХ ғасыр басындағы қазақ қоғамы' : 'Kazakh Society at the Turn of the 20th Century')}
          </h2>

          <p className="font-sans text-base sm:text-lg text-ink-brown/80 leading-relaxed pt-2">
            {t(
              'intro.text',
              isKz
                ? 'ХХ ғасырдың басында қазақ даласында отарлық басқару, жер мәселесі және әлеуметтік өзгерістер күшейді. Жаңа білім алған қазақ жастары халықтың болашағы туралы ой қозғап, оқу-ағарту, баспасөз, құқық және ұлттық мүдде жолында еңбек етті. Осы орта кейін Алаш қозғалысының қалыптасуына негіз болды.'
                : "At the beginning of the 20th century, colonial administration, land seizures, and dramatic social shifts intensified across the Kazakh steppe. Modern-educated Kazakh youths sought to safeguard their nation's future through enlightenment, the press, legal advocacy, and national self-determination. This vibrant intellectual milieu laid the foundation for the Alash movement."
            )}
          </p>
        </div>

        {/* Kazakh Ornament Divider */}
        <KazakhOrnament variant="divider" size={80} className="my-10" />

        {/* 3 Thematic Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="relative bg-archive-paper/60 hover:bg-archive-paper border border-soft-line rounded-lg p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-parchment group"
              >
                {/* Top Corner Ornament */}
                <div className="absolute top-2 right-2 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity">
                  <KazakhOrnament variant="corner" size={24} color="#B18A52" />
                </div>

                <div>
                  {/* Pillar Numeral & Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-soft-line/60">
                    <span className="font-mono text-xs font-bold tracking-widest text-deep-burgundy">
                      {pillar.numeral}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-warm-ivory border border-soft-line flex items-center justify-center text-ink-brown group-hover:text-deep-burgundy transition-colors shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Sub-badge */}
                  <span className="inline-block mt-4 font-mono text-[11px] text-muted-gold tracking-wider uppercase font-semibold">
                    {pillar.badge}
                  </span>

                  {/* Pillar Title */}
                  <h3 className="font-serif text-2xl font-bold text-ink-brown mt-1 mb-3 group-hover:text-deep-burgundy transition-colors">
                    {pillar.title}
                  </h3>

                  {/* Pillar Description */}
                  <p className="font-sans text-sm text-ink-brown/80 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                {/* Pillar Deep-link Button */}
                <div className="pt-6 mt-6 border-t border-soft-line/60">
                  <a
                    href={pillar.targetHref}
                    onClick={(e) => handleJump(e, pillar.targetHref)}
                    className="inline-flex items-center gap-2 text-sm font-sans font-medium text-deep-burgundy hover:text-burgundy-hover transition-colors group/link"
                  >
                    <span>{t('common.more_details', isKz ? 'Толығырақ' : 'More details')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Milestone Fact Strip */}
        <div className="mt-14 bg-archive-paper border border-soft-line rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-soft-line/70">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-deep-burgundy" />
              <h4 className="font-serif font-bold text-lg text-ink-brown">
                {t('intro.milestones_title', isKz ? 'НЕГІЗГІ БЕЛЕСТЕР' : 'KEY MILESTONES')}
              </h4>
            </div>
            <p className="font-mono text-xs text-ink-brown/70">
              {isKz
                ? 'Тиісті бөлімге жылдам өту үшін түртіңіз'
                : 'Click any milestone pill to jump to its record'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            {milestones.map((m) => (
              <a
                key={m.year}
                href={m.targetHref}
                onClick={(e) => handleJump(e, m.targetHref)}
                className="flex items-center gap-3 p-3 bg-warm-ivory hover:bg-warm-ivory/80 border border-soft-line rounded transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-burgundy"
              >
                <span className="font-mono font-bold text-base text-deep-burgundy px-2 py-1 rounded bg-archive-paper border border-soft-line shrink-0">
                  {m.year}
                </span>
                <span className="font-sans text-xs sm:text-sm font-medium text-ink-brown group-hover:text-deep-burgundy transition-colors truncate">
                  {m.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
