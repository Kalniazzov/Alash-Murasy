import React, { useState } from 'react';
import {
  Sparkles,
  ChevronRight,
  Type,
  Eye,
  Scale,
  BookOpen,
  Landmark,
  Shield,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { KazakhOrnament } from '@/components/ui/KazakhOrnament';
import { DAILY_FACTS } from '@/data/quizQuestions';

export interface ConclusionProps {
  largeTextMode?: boolean;
  onToggleLargeText?: () => void;
  highContrastMode?: boolean;
  onToggleHighContrast?: () => void;
}

export const Conclusion: React.FC<ConclusionProps> = ({
  largeTextMode = false,
  onToggleLargeText,
  highContrastMode = false,
  onToggleHighContrast,
}) => {
  const { language } = useLanguage();
  const isKz = language === 'kz';

  const [factIdx, setFactIdx] = useState<number>(0);
  const currentFact = DAILY_FACTS[factIdx % DAILY_FACTS.length];

  const legacyPillars = [
    {
      icon: Landmark,
      kzTitle: 'Ұлттық мемлекеттілік идеясы',
      enTitle: 'Idea of National Statehood',
      kzDesc:
        'Қазақ халқының өзін-өзі басқару құқығын съездер мен автономия арқылы саяси-құқықтық деңгейде негіздеді.',
      enDesc:
        'Grounded Kazakh self-governance in constitutional congresses and territorial autonomy.',
    },
    {
      icon: Scale,
      kzTitle: 'Құқықтық-демократиялық құндылықтар',
      enTitle: 'Democratic Rule of Law',
      kzDesc:
        'Азаматтардың тегіне, дініне, жынысына қарамай теңдігін, сөз бен баспасөз бостандығын және әділ сотты жақтады.',
      enDesc:
        'Advocated universal civic equality regardless of origin, religion, or gender alongside free speech and fair courts.',
    },
    {
      icon: Shield,
      kzTitle: 'Жер тұтастығын қорғау',
      enTitle: 'Defense of Territorial Integrity',
      kzDesc:
        '1905 жылғы петициядан 1920 жылғы шекараны межелеуге дейін жерді ұлттық болмыстың тірегі ретінде қорғады.',
      enDesc:
        'Protected ancestral territory from the 1905 petition through the landmark 1920 border demarcations.',
    },
    {
      icon: BookOpen,
      kzTitle: 'Білім, ғылым және тіл мұрасы',
      enTitle: 'Education, Scholarship & Language',
      kzDesc:
        'Төте жазу әліпбиі, тұңғыш оқулықтар мен ғылыми терминология арқылы заманауи қазақ мәдениетінің іргесін қалады.',
      enDesc:
        'Created reformed orthography, vernacular textbooks, and modern academic terminology across sciences.',
    },
  ];

  const autonomyRows = [
    {
      aspectKz: 'Жарияланған уақыты',
      aspectEn: 'Proclaimed',
      alashKz: '1917 жылғы желтоқсан (II жалпықазақ съезі)',
      alashEn: 'December 1917 (2nd All-Kazakh Congress)',
      turkKz: '1917 жылғы қараша (IV Төтенше мұсылман съезі)',
      turkEn: 'November 1917 (4th Extraordinary Muslim Congress)',
    },
    {
      aspectKz: 'Саяси орталығы',
      aspectEn: 'Political Center',
      alashKz: 'Орынбор (съездер), Семей — Алаш-қала, Жымпиты',
      alashEn: 'Orenburg (congresses), Semey — Alash-qala, Zhympity',
      turkKz: 'Қоқан қаласы',
      turkEn: 'Kokand (Qoqan)',
    },
    {
      aspectKz: 'Негізгі жетекшілері',
      aspectEn: 'Key Leaders',
      alashKz: 'Әлихан Бөкейхан, Ахмет Байтұрсынұлы, Халел мен Жаһанша Досмұхамедовтер',
      alashEn: 'Alikhan Bokeikhan, Akhmet Baitursynuly, Khalel & Zhahansha Dosmukhamedov',
      turkKz: 'Мұхамеджан Тынышпаев, Мұстафа Шоқай',
      turkEn: 'Mukhamedzhan Tynyshpaev, Mustafa Shokai',
    },
    {
      aspectKz: 'Тарихи тағдыры',
      aspectEn: 'Historical Fate',
      alashKz: 'Азамат соғысы жағдайында 1920 ж. құрылымдары таратылды',
      alashEn: 'Dissolved in 1920 amid Civil War centralization',
      turkKz: '1918 ж. ақпанда большевиктік күштер тарапынан күшпен таратылды',
      turkEn: 'Crushed militarily by Bolshevik forces in February 1918',
    },
  ];

  return (
    <section
      id="conclusion"
      aria-labelledby="conclusion-heading"
      className="py-16 sm:py-24 border-b border-soft-line/60 bg-archive-paper/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Daily Verified Historical Fact Widget */}
        <div className="rounded-card border-2 border-muted-gold/50 bg-warm-ivory p-6 sm:p-7 shadow-parchment flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-deep-burgundy font-bold">
              <Sparkles className="w-4 h-4" />
              {isKz ? 'КҮННІҢ ТАРИХИ ДЕРЕГІ' : 'VERIFIED HISTORICAL FACT'} ·{' '}
              {currentFact.year}
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink-brown">
              {isKz ? currentFact.title.kz : currentFact.title.en}
            </h3>
            <p className="font-sans text-sm sm:text-base text-ink-brown/85 leading-relaxed max-w-3xl">
              {isKz ? currentFact.fact.kz : currentFact.fact.en}
            </p>
            <p className="font-mono text-[11px] text-ink-brown/65">
              {isKz ? currentFact.source.kz : currentFact.source.en}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setFactIdx((i) => (i + 1) % DAILY_FACTS.length)}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-button bg-deep-burgundy hover:bg-burgundy-hover text-warm-ivory text-xs font-mono transition-colors"
          >
            {isKz ? 'Келесі дерек' : 'Next Fact'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Conclusion Narrative */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-gold">
            {isKz ? 'ҚОРЫТЫНДЫ ЖӘНЕ ТАРИХИ САБАҚТАСТЫҚ' : 'CONCLUSION & HISTORICAL CONTINUITY'}
          </span>
          <h2
            id="conclusion-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-brown mt-2 mb-4"
          >
            {isKz
              ? 'Алаш идеясы және бүгінгі Қазақстан'
              : 'The Alash Idea & Modern Kazakhstan'}
          </h2>
          <KazakhOrnament variant="divider" size={64} className="my-4" />
          <p className="font-sans text-base text-ink-brown/85 leading-relaxed">
            {isKz
              ? 'Алашорда аяқ астынан пайда болған жоқ: оның идеялық іргетасы 1900–1914 жылдары білім алған, баспасөз арқылы халықты оятқан және заң жүзінде ұлт мүддесін қорғаған қазақ зиялыларының қажырлы еңбегімен қаланды. 1930 жылдардағы саяси қуғын-сүргінге қарамастан, олардың жер тұтастығы, білім мен құқықтық мемлекет туралы мұраты тәуелсіз Қазақстан тарихымен сабақтасып жатыр.'
              : 'Alash Orda did not emerge overnight: its intellectual foundations were forged between 1900 and 1914 by educated Kazakh reformers who built a national press, modern textbooks, and civic petitions. Despite the tragic repressions of the 1930s, their vision of territorial integrity, universal schooling, and constitutional governance endures in modern Kazakhstan.'}
          </p>
        </div>

        {/* 4 Legacy Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {legacyPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-card border border-soft-line bg-warm-ivory p-5 shadow-subtle"
              >
                <div className="w-10 h-10 rounded-full bg-archive-paper flex items-center justify-center text-deep-burgundy mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-ink-brown mb-1.5">
                  {isKz ? pillar.kzTitle : pillar.enTitle}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-brown/80 leading-relaxed">
                  {isKz ? pillar.kzDesc : pillar.enDesc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparative Table: Alash Autonomy vs Turkestan Autonomy */}
        <div className="rounded-card border border-soft-line bg-warm-ivory overflow-hidden shadow-subtle">
          <div className="px-5 py-4 bg-archive-paper/60 border-b border-soft-line">
            <h3 className="font-serif text-xl font-bold text-ink-brown">
              {isKz
                ? 'Тарихи салыстыру: Алаш автономиясы және Түркістан (Қоқан) автономиясы'
                : 'Historical Comparison: Alash Autonomy vs. Turkestan (Kokand) Autonomy'}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-soft-line bg-archive-paper/25 font-mono text-ink-brown">
                  <th className="p-3.5">{isKz ? 'Өлшем' : 'Criterion'}</th>
                  <th className="p-3.5 text-deep-burgundy">
                    {isKz ? 'Алаш автономиясы' : 'Alash Autonomy'}
                  </th>
                  <th className="p-3.5">
                    {isKz ? 'Түркістан автономиясы' : 'Turkestan Autonomy'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {autonomyRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b last:border-b-0 border-soft-line/60"
                  >
                    <td className="p-3.5 font-mono font-semibold text-ink-brown/80">
                      {isKz ? row.aspectKz : row.aspectEn}
                    </td>
                    <td className="p-3.5 text-ink-brown">
                      {isKz ? row.alashKz : row.alashEn}
                    </td>
                    <td className="p-3.5 text-ink-brown/85">
                      {isKz ? row.turkKz : row.turkEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reading Mode Accessibility Controls */}
        {(onToggleLargeText || onToggleHighContrast) && (
          <div className="rounded-card border border-soft-line bg-warm-ivory p-4 flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-xs text-ink-brown/80">
              {isKz
                ? 'Оқу режимі және қолжетімділік баптаулары:'
                : 'Reading Comfort & Accessibility Controls:'}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {onToggleLargeText && (
                <button
                  type="button"
                  onClick={onToggleLargeText}
                  aria-pressed={largeTextMode}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border transition-colors ${
                    largeTextMode
                      ? 'bg-deep-burgundy text-warm-ivory border-deep-burgundy'
                      : 'bg-archive-paper/40 text-ink-brown border-soft-line'
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  {isKz ? 'Ірі мәтін (A+)' : 'Larger Text (A+)'}
                </button>
              )}
              {onToggleHighContrast && (
                <button
                  type="button"
                  onClick={onToggleHighContrast}
                  aria-pressed={highContrastMode}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border transition-colors ${
                    highContrastMode
                      ? 'bg-forest-ink text-warm-ivory border-forest-ink'
                      : 'bg-archive-paper/40 text-ink-brown border-soft-line'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  {isKz ? 'Жоғары контраст' : 'High Contrast'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

