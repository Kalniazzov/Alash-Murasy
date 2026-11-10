import React, { useState, useEffect, useMemo } from 'react';
import {
  Newspaper,
  BookOpen,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  MapPin,
  User,
  Calendar,
  Info,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { KazakhOrnament } from '@/components/ui/KazakhOrnament';
import {
  PRESS_PUBLICATIONS,
  ALLIED_PERIODICALS,
  PRESS_ARTICLES,
} from '@/data/pressIssues';
import { PressArticle } from '@/data/types';

type PublicationFilter = 'all' | 'aiqap' | 'qazaq';
type ThemeFilter = 'all' | 'education' | 'land' | 'language' | 'women' | 'politics';

export const PressArchive: React.FC = () => {
  const { language, t } = useLanguage();
  const isKz = language === 'kz';

  const [pubFilter, setPubFilter] = useState<PublicationFilter>('all');
  const [themeFilter, setThemeFilter] = useState<ThemeFilter>('all');
  const [expandedPubInfo, setExpandedPubInfo] = useState<string | null>(null);
  const [activeArticleIndex, setActiveArticleIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showModernExplanation, setShowModernExplanation] = useState<boolean>(true);

  const filteredArticles = useMemo(() => {
    return PRESS_ARTICLES.filter((article) => {
      const matchesPub = pubFilter === 'all' || article.publication === pubFilter;
      const matchesTheme = themeFilter === 'all' || article.theme === themeFilter;
      return matchesPub && matchesTheme;
    });
  }, [pubFilter, themeFilter]);

  const activeArticle: PressArticle | null =
    activeArticleIndex !== null && filteredArticles[activeArticleIndex]
      ? filteredArticles[activeArticleIndex]
      : null;

  useEffect(() => {
    if (activeArticleIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setActiveArticleIndex(null);
      } else if (e.key === 'ArrowRight' && filteredArticles.length > 1) {
        setActiveArticleIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredArticles.length
        );
      } else if (e.key === 'ArrowLeft' && filteredArticles.length > 1) {
        setActiveArticleIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredArticles.length) % filteredArticles.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeArticleIndex, filteredArticles.length]);

  const themeLabels: Array<{ id: ThemeFilter; kz: string; en: string }> = [
    { id: 'all', kz: 'Барлық тақырыптар', en: 'All Topics' },
    { id: 'education', kz: 'Білім', en: 'Education' },
    { id: 'land', kz: 'Жер мәселесі', en: 'Land' },
    { id: 'language', kz: 'Тіл және әдебиет', en: 'Language' },
    { id: 'women', kz: 'Әйел теңдігі', en: 'Women\'s Equality' },
    { id: 'politics', kz: 'Саясат және автономия', en: 'Politics & Autonomy' },
  ];

  const getThemeLabel = (theme: PressArticle['theme']) => {
    const found = themeLabels.find((item) => item.id === theme);
    return found ? (isKz ? found.kz : found.en) : theme;
  };

  const openViewer = (index: number) => {
    setZoomLevel(100);
    setShowModernExplanation(true);
    setActiveArticleIndex(index);
  };

  return (
    <section
      id="press"
      aria-labelledby="press-heading"
      className="py-16 sm:py-24 border-b border-soft-line/60 bg-warm-ivory"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-gold">
            {isKz ? 'ЦИФРЛЫҚ БАСПАСӨЗ АРХИВІ' : 'DIGITAL PRESS ARCHIVE'}
          </span>
          <h2
            id="press-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-brown mt-2 mb-4"
          >
            {t('nav.press', isKz ? 'Баспасөз' : 'Press')} — «Айқап» & «Қазақ»
          </h2>
          <KazakhOrnament variant="divider" size={64} className="my-4" />
          <p className="font-sans text-base text-ink-brown/80 leading-relaxed">
            {isKz
              ? 'ХХ ғасыр басындағы ұлттық сананың қос тірегі — Троицкідегі «Айқап» журналы (1911–1915) мен Орынбордағы «Қазақ» газетінің (1913–1918) тарихи анықтамасы, мақалалар үзіндісі және қазіргі тілдегі түсіндірмесі.'
              : 'Explore the twin pillars of early 20th-century Kazakh public thought — "Aiqap" magazine (1911–1915) in Troitsk and "Qazaq" newspaper (1913–1918) in Orenburg — with verified excerpts and plain-language explanations.'}
          </p>
        </div>

        {/* Two Main Periodical Museum Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {PRESS_PUBLICATIONS.map((pub) => {
            const isExpanded = expandedPubInfo === pub.id;
            const firstMatchIndex = filteredArticles.findIndex(
              (a) => a.publication === pub.id
            );

            return (
              <article
                key={pub.id}
                className="rounded-card border border-soft-line bg-archive-paper/45 p-6 sm:p-8 shadow-parchment flex flex-col justify-between"
              >
                <div>
                  {/* Masthead Banner */}
                  <div className="border-2 border-ink-brown/30 bg-warm-ivory p-4 sm:p-5 rounded mb-5 relative">
                    <div className="flex items-center justify-between text-[11px] font-mono text-ink-brown/70 border-b border-soft-line pb-2 mb-3">
                      <span>{pub.years}</span>
                      <span>{isKz ? pub.city.kz : pub.city.en}</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-brown text-center tracking-wide">
                      {isKz ? pub.title.kz : pub.title.en}
                    </h3>
                    <p className="text-xs font-sans text-center text-deep-burgundy font-medium mt-1">
                      {isKz ? pub.subtitle.kz : pub.subtitle.en}
                    </p>
                    <div className="mt-3 pt-2 border-t border-soft-line flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-ink-brown/75">
                      <span>
                        {isKz ? 'Редакторы:' : 'Editor:'}{' '}
                        {isKz ? pub.editor.kz : pub.editor.en}
                      </span>
                      <span>{isKz ? pub.issuesCount.kz : pub.issuesCount.en}</span>
                    </div>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-ink-brown/85 leading-relaxed mb-4">
                    {isKz ? pub.description.kz : pub.description.en}
                  </p>

                  {/* Core Topics List */}
                  <div className="mb-4">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-muted-gold mb-2">
                      {isKz ? 'Көтерген негізгі мәселелері:' : 'Core Editorial Themes:'}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {(isKz ? pub.coreTopics.kz : pub.coreTopics.en).map((topic, idx) => (
                        <li
                          key={idx}
                          className="text-xs sm:text-sm text-ink-brown/80 flex items-start gap-2"
                        >
                          <span className="text-deep-burgundy font-bold mt-0.5">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable Historical Reference ("Басылым туралы") */}
                  {isExpanded && (
                    <div className="mt-4 p-4 rounded bg-warm-ivory/90 border border-soft-line text-xs sm:text-sm space-y-2">
                      <p className="text-ink-brown">
                        <strong className="font-semibold">
                          {isKz ? 'Атау тарихы: ' : 'Origin of Title: '}
                        </strong>
                        {isKz ? pub.nameOrigin.kz : pub.nameOrigin.en}
                      </p>
                      <p className="text-ink-brown/85">
                        <strong className="font-semibold">
                          {isKz ? 'Белсенді авторлар: ' : 'Key Contributors: '}
                        </strong>
                        {isKz ? pub.keyAuthors.kz : pub.keyAuthors.en}
                      </p>
                      <p className="font-mono text-[11px] text-ink-brown/70 pt-1 border-t border-soft-line/60">
                        {isKz ? pub.archivalNote.kz : pub.archivalNote.en}
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-soft-line/70 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (firstMatchIndex >= 0) {
                        openViewer(firstMatchIndex);
                      } else {
                        setPubFilter(pub.id);
                        setThemeFilter('all');
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-button bg-deep-burgundy hover:bg-burgundy-hover text-warm-ivory text-xs sm:text-sm font-medium transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    {isKz ? 'Архив беттерін ашу' : 'Open Issue Reader'}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedPubInfo((prev) => (prev === pub.id ? null : pub.id))
                    }
                    aria-expanded={isExpanded}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-button border border-soft-line bg-warm-ivory hover:bg-archive-paper text-ink-brown text-xs sm:text-sm font-medium transition-colors"
                  >
                    <Info className="w-4 h-4 text-deep-burgundy" />
                    {isKz ? 'Басылым туралы' : 'About Publication'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Filters Bar: Publication + 5 Topic Filters */}
        <div className="rounded-card border border-soft-line bg-archive-paper/30 p-4 sm:p-5 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Publication selector */}
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label={isKz ? 'Басылым сүзгісі' : 'Publication filter'}>
              {(
                [
                  { id: 'all', kz: 'Барлық басылымдар', en: 'All Periodicals' },
                  { id: 'aiqap', kz: '«Айқап»', en: '"Aiqap"' },
                  { id: 'qazaq', kz: '«Қазақ»', en: '"Qazaq"' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPubFilter(tab.id)}
                  aria-pressed={pubFilter === tab.id}
                  className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                    pubFilter === tab.id
                      ? 'bg-deep-burgundy text-warm-ivory font-semibold'
                      : 'bg-warm-ivory text-ink-brown/80 border border-soft-line hover:border-deep-burgundy/50'
                  }`}
                >
                  {isKz ? tab.kz : tab.en}
                </button>
              ))}
            </div>

            {/* Thematic filter pills — horizontal swipe on mobile */}
            <div className="flex items-center gap-1.5 overflow-x-auto md:flex-wrap pb-1 md:pb-0 -mx-1 px-1 no-scrollbar" role="group" aria-label={isKz ? 'Мақала тақырыбы бойынша сүзгі' : 'Article topic filter'}>
              {themeLabels.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setThemeFilter(theme.id)}
                  aria-pressed={themeFilter === theme.id}
                  className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-colors ${
                    themeFilter === theme.id
                      ? 'bg-forest-ink text-warm-ivory'
                      : 'bg-warm-ivory/90 text-ink-brown/80 border border-soft-line hover:bg-archive-paper'
                  }`}
                >
                  {isKz ? theme.kz : theme.en}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Archive Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-10 bg-archive-paper/20 rounded-card border border-soft-line">
            <p className="font-sans text-sm text-ink-brown/75 mb-3">
              {isKz
                ? 'Таңдалған сүзгі бойынша мақала табылмады.'
                : 'No archival articles match the current filter.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setPubFilter('all');
                setThemeFilter('all');
              }}
              className="px-4 py-2 rounded-button bg-deep-burgundy text-warm-ivory text-xs font-mono"
            >
              {isKz ? 'Сүзгіні тазарту' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {filteredArticles.map((article, idx) => (
              <div
                key={article.id}
                className="museum-card rounded-xl border border-soft-line bg-warm-ivory p-5 sm:p-6 shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-archive-paper text-ink-brown font-mono text-xs font-semibold">
                      <Newspaper className="w-3.5 h-3.5 text-deep-burgundy" />
                      {article.publication === 'qazaq'
                        ? isKz
                          ? '«Қазақ»'
                          : '"Qazaq"'
                        : isKz
                        ? '«Айқап»'
                        : '"Aiqap"'}{' '}
                      · {article.issueNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full border border-soft-line text-[11px] font-mono text-deep-burgundy bg-archive-paper/30">
                      {getThemeLabel(article.theme)}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-ink-brown mb-1.5">
                    {isKz ? article.title.kz : article.title.en}
                  </h3>
                  <p className="text-xs font-mono text-ink-brown/65 mb-3">
                    {isKz ? article.author.kz : article.author.en} ·{' '}
                    {isKz ? article.date.kz : article.date.en}
                  </p>

                  <blockquote className="border-l-2 border-deep-burgundy pl-3.5 py-1 italic font-serif text-base text-ink-brown/90 mb-3">
                    {isKz ? article.originalExcerpt.kz : article.originalExcerpt.en}
                  </blockquote>

                  <div className="p-3 rounded bg-archive-paper/35 border border-soft-line/70 text-xs sm:text-sm text-ink-brown/85">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-deep-burgundy font-bold block mb-1">
                      {isKz ? 'Қазіргі тілмен түсіндіру:' : 'Plain-Language Explanation:'}
                    </span>
                    {isKz ? article.modernExplanation.kz : article.modernExplanation.en}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-soft-line/60 flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-ink-brown/60 truncate">
                    {isKz ? article.sourceCitation.kz : article.sourceCitation.en}
                  </span>
                  <button
                    type="button"
                    onClick={() => openViewer(idx)}
                    className="shrink-0 inline-flex items-center gap-1 text-xs font-mono font-semibold text-deep-burgundy hover:underline"
                  >
                    {isKz ? 'Оқып шығу →' : 'Open Viewer →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Allied Periodicals Strip */}
        <div className="rounded-card border border-soft-line bg-archive-paper/25 p-5 sm:p-6">
          <h3 className="font-serif text-xl font-bold text-ink-brown mb-3">
            {isKz
              ? 'Сол дәуірдегі өзге де ұлттық басылымдар (1917–1919)'
              : 'Other Allied National Periodicals (1917–1919)'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALLIED_PERIODICALS.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded bg-warm-ivory border border-soft-line/80"
              >
                <div className="font-serif font-bold text-base text-ink-brown">
                  {isKz ? p.title.kz : p.title.en}
                </div>
                <div className="font-mono text-[11px] text-muted-gold flex items-center gap-1 mt-0.5 mb-1.5">
                  <MapPin className="w-3 h-3" />
                  {isKz ? p.city.kz : p.city.en}
                </div>
                <p className="text-xs text-ink-brown/80 leading-relaxed">
                  {isKz ? p.note.kz : p.note.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Newspaper & Archive Issue Viewer Modal */}
      {activeArticle && activeArticleIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="press-viewer-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-forest-ink/80 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveArticleIndex(null);
          }}
        >
          <div className="w-full max-w-4xl max-h-[92vh] rounded-t-2xl sm:rounded-xl bg-warm-ivory border-t-2 sm:border-2 border-soft-line shadow-modal flex flex-col overflow-hidden animate-sheet-up sm:animate-modal-pop">
            {/* Viewer Toolbar */}
            <div className="px-4 sm:px-6 py-3 bg-archive-paper border-b border-soft-line flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase text-deep-burgundy">
                  {activeArticle.publication === 'qazaq'
                    ? isKz
                      ? '«ҚАЗАҚ» ГАЗЕТІ'
                      : '"QAZAQ" NEWSPAPER'
                    : isKz
                    ? '«АЙҚАП» ЖУРНАЛЫ'
                    : '"AIQAP" MAGAZINE'}{' '}
                  · {activeArticle.issueNumber}
                </span>
                <span className="font-mono text-xs text-ink-brown/65">
                  ({activeArticleIndex + 1} / {filteredArticles.length})
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(80, z - 15))}
                  aria-label={isKz ? 'Кішірейту' : 'Zoom out'}
                  className="p-1.5 rounded border border-soft-line bg-warm-ivory hover:bg-archive-paper text-ink-brown"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs min-w-[44px] text-center text-ink-brown">
                  {zoomLevel}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(145, z + 15))}
                  aria-label={isKz ? 'Үлкейту' : 'Zoom in'}
                  className="p-1.5 rounded border border-soft-line bg-warm-ivory hover:bg-archive-paper text-ink-brown"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {/* Toggle Modern Explanation */}
                <button
                  type="button"
                  onClick={() => setShowModernExplanation((prev) => !prev)}
                  aria-pressed={showModernExplanation}
                  className={`px-2.5 py-1 rounded text-xs font-sans font-medium border transition-colors inline-flex items-center gap-1 ${
                    showModernExplanation
                      ? 'bg-deep-burgundy text-warm-ivory border-deep-burgundy'
                      : 'bg-warm-ivory text-ink-brown border-soft-line'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {isKz ? 'Қазіргі тілмен' : 'Plain Language'}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveArticleIndex(null)}
                  aria-label={t('common.close', isKz ? 'Жабу' : 'Close')}
                  className="p-1.5 rounded border border-soft-line bg-warm-ivory hover:bg-deep-burgundy hover:text-warm-ivory text-ink-brown transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Viewer Archival Sheet */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
              <div
                style={{ fontSize: `${zoomLevel}%` }}
                className="rounded border-2 border-ink-brown/25 bg-archive-paper/40 p-5 sm:p-8 shadow-inner transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-ink-brown/20 text-xs font-mono text-ink-brown/75">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {isKz ? activeArticle.date.kz : activeArticle.date.en}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-warm-ivory border border-soft-line text-[11px]">
                    {isKz
                      ? 'Мәртебесі: Тексерілген архивтік үзінді (жасанды скан емес)'
                      : 'Status: Verified Archival Excerpt (Non-fabricated reconstruction)'}
                  </span>
                </div>

                <h3
                  id="press-viewer-title"
                  className="font-serif text-2xl sm:text-3xl font-bold text-ink-brown mb-2"
                >
                  {isKz ? activeArticle.title.kz : activeArticle.title.en}
                </h3>

                <p className="text-xs font-mono text-ink-brown/75 flex items-center gap-1.5 mb-5">
                  <User className="w-3.5 h-3.5 text-deep-burgundy" />
                  {isKz ? activeArticle.author.kz : activeArticle.author.en}
                </p>

                <blockquote className="font-serif text-lg sm:text-xl leading-relaxed text-ink-brown border-l-4 border-deep-burgundy pl-4 py-2 bg-warm-ivory/80 rounded-r">
                  {isKz
                    ? activeArticle.originalExcerpt.kz
                    : activeArticle.originalExcerpt.en}
                </blockquote>

                <p className="mt-4 text-xs font-sans text-ink-brown/75">
                  {isKz
                    ? activeArticle.historicalNote.kz
                    : activeArticle.historicalNote.en}
                </p>
              </div>

              {showModernExplanation && (
                <div className="rounded-card border border-deep-burgundy/30 bg-archive-paper/55 p-5">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-deep-burgundy font-bold mb-2">
                    {isKz
                      ? 'Қазіргі тілмен түсіндіру'
                      : 'Modern Plain-Language Commentary'}
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-ink-brown leading-relaxed">
                    {isKz
                      ? activeArticle.modernExplanation.kz
                      : activeArticle.modernExplanation.en}
                  </p>
                  <p className="font-mono text-[11px] text-ink-brown/65 mt-3 pt-2 border-t border-soft-line">
                    {isKz
                      ? activeArticle.sourceCitation.kz
                      : activeArticle.sourceCitation.en}
                  </p>
                </div>
              )}
            </div>

            {/* Viewer Footer Navigation (Prev / Next Page) */}
            <div className="px-4 sm:px-6 py-3 bg-archive-paper border-t border-soft-line flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setActiveArticleIndex(
                    (activeArticleIndex - 1 + filteredArticles.length) %
                      filteredArticles.length
                  )
                }
                disabled={filteredArticles.length <= 1}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded border border-soft-line bg-warm-ivory hover:bg-archive-paper disabled:opacity-40 text-xs font-mono text-ink-brown"
              >
                <ChevronLeft className="w-4 h-4" />
                {t('common.prev', isKz ? 'Алдыңғы' : 'Previous')}
              </button>
              <span className="text-xs font-mono text-ink-brown/70">
                {getThemeLabel(activeArticle.theme)}
              </span>
              <button
                type="button"
                onClick={() =>
                  setActiveArticleIndex(
                    (activeArticleIndex + 1) % filteredArticles.length
                  )
                }
                disabled={filteredArticles.length <= 1}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded border border-soft-line bg-warm-ivory hover:bg-archive-paper disabled:opacity-40 text-xs font-mono text-ink-brown"
              >
                {t('common.next', isKz ? 'Келесі' : 'Next')}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

