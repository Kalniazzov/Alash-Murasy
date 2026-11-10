import React, { useState, useMemo, useCallback } from 'react';
import {
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Users,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { KazakhOrnament } from '@/components/ui/KazakhOrnament';
import { TimelineEvent } from '@/data/types';
import { timelineEvents as defaultTimelineEvents } from '@/data/events';
import { getFigureById } from '@/data/figures';

export type TimelinePeriodFilter = 'all' | '1905-1907' | '1908-1916' | '1917-1920';

export interface TimelineProps {
  events?: TimelineEvent[];
  className?: string;
  onSelectFigure?: (figureId: string) => void;
}

interface PeriodTabOption {
  id: TimelinePeriodFilter;
  labelKz: string;
  labelEn: string;
  years: string;
}

const PERIOD_TABS: PeriodTabOption[] = [
  { id: 'all', labelKz: 'Барлық кезеңдер', labelEn: 'All Periods', years: '1905–1920' },
  { id: '1905-1907', labelKz: 'Ояну жылдары', labelEn: 'Awakening', years: '1905–1907' },
  { id: '1908-1916', labelKz: 'Баспасөз бен ағарту', labelEn: 'Press & Enlightenment', years: '1908–1916' },
  { id: '1917-1920', labelKz: 'Алашорда дәуірі', labelEn: 'Alash Orda Era', years: '1917–1920' },
];

export const Timeline: React.FC<TimelineProps> = ({
  events = defaultTimelineEvents || [],
  className = '',
  onSelectFigure,
}) => {
  const { language, t } = useLanguage();
  const isKz = language === 'kz';

  // Active period filter tab
  const [selectedPeriod, setSelectedPeriod] = useState<TimelinePeriodFilter>('all');

  // Expanded card state (set of event IDs)
  const [expandedEventIds, setExpandedEventIds] = useState<Set<string>>(new Set());

  // Active cursor index for keyboard/stepper navigation
  const [activeEventIndex, setActiveEventIndex] = useState<number>(0);

  // Filter events chronologically based on active period
  const filteredEvents = useMemo(() => {
    const list = Array.isArray(events) ? [...events] : [];
    const sorted = list.sort((a, b) => a.year - b.year);
    if (selectedPeriod === 'all') {
      return sorted;
    }
    return sorted.filter((item) => item.period === selectedPeriod);
  }, [events, selectedPeriod]);

  // Keep active index within bounds when filtering changes
  const clampedIndex = useMemo(() => {
    if (filteredEvents.length === 0) return 0;
    return Math.min(activeEventIndex, filteredEvents.length - 1);
  }, [activeEventIndex, filteredEvents.length]);

  const toggleExpand = useCallback((id: string) => {
    setExpandedEventIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedEventIds(new Set(filteredEvents.map((e) => e.id)));
  }, [filteredEvents]);

  const collapseAll = useCallback(() => {
    setExpandedEventIds(new Set());
  }, []);

  const handlePrev = useCallback(() => {
    setActiveEventIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveEventIndex((prev) => Math.min(filteredEvents.length - 1, prev + 1));
  }, [filteredEvents.length]);

  const handleFigureClick = (figureId: string) => {
    if (onSelectFigure) {
      onSelectFigure(figureId);
    } else {
      const figuresSection = document.getElementById('figures');
      if (figuresSection) {
        figuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="timeline"
      aria-labelledby="timeline-heading"
      className={`py-16 sm:py-24 border-b border-soft-line/60 bg-warm-ivory relative ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-gold font-semibold">
            {t('timeline.eyebrow', isKz ? 'МҰРАҒАТТЫҚ ХРОНОЛОГИЯ' : 'ARCHIVAL CHRONOLOGY')}
          </span>
          <h2
            id="timeline-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-brown mt-2 mb-4 tracking-tight"
          >
            {t('timeline.title', isKz ? 'Уақыт сызығы (1905–1920)' : 'Interactive Timeline (1905–1920)')}
          </h2>
          <KazakhOrnament variant="divider" size={72} className="my-3 text-muted-gold" />
          <p className="font-sans text-sm sm:text-base text-ink-brown/75 leading-relaxed">
            {t(
              'timeline.description',
              isKz
                ? '1905 жылғы Қарқаралы петициясынан бастап 1920 жылға дейінгі басты тарихи оқиғалар, съездер мен шешімдер хронологиясы.'
                : 'Pivotal historical milestones, congresses, and declarations from the 1905 Karkaraly Petition to the dissolution in 1920.'
            )}
          </p>
        </div>

        {/* Period Filter Tabs — horizontal swipe on mobile, centered wrap on desktop */}
        <div className="mb-10 sm:mb-12">
          <div
            role="tablist"
            aria-label={isKz ? 'Уақыт кезеңдері' : 'Timeline Periods'}
            className="flex items-center sm:justify-center gap-2 sm:gap-3 overflow-x-auto sm:flex-wrap pb-2 sm:pb-0 -mx-1 px-1 no-scrollbar"
          >
            {PERIOD_TABS.map((tab) => {
              const isSelected = selectedPeriod === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => {
                    setSelectedPeriod(tab.id);
                    setActiveEventIndex(0);
                  }}
                  className={`shrink-0 whitespace-nowrap px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans font-medium transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-burgundy focus-visible:ring-offset-2 ${
                    isSelected
                      ? 'bg-deep-burgundy text-warm-ivory border-deep-burgundy shadow-subtle'
                      : 'bg-archive-paper/50 hover:bg-archive-paper text-ink-brown border-soft-line/80 hover:border-muted-gold/60'
                  }`}
                >
                  <span className="font-semibold">{isKz ? tab.labelKz : tab.labelEn}</span>
                  <span
                    className={`ml-1.5 font-mono text-[11px] opacity-80 ${
                      isSelected ? 'text-warm-ivory/80' : 'text-ink-brown/60'
                    }`}
                  >
                    ({tab.years})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Controls Bar: Stepper & Expand/Collapse Toggle */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-ink-brown/70 border-t border-b border-soft-line/50 py-3 px-2">
            <div className="flex items-center gap-2">
              <span className="text-muted-gold font-semibold">
                {filteredEvents.length}{' '}
                {isKz ? 'оқиға көрсетілуде' : 'events displayed'}
              </span>
              {filteredEvents.length > 0 && (
                <span className="text-ink-brown/50 hidden sm:inline">
                  • {filteredEvents[0].year} — {filteredEvents[filteredEvents.length - 1].year}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 border border-soft-line rounded bg-archive-paper/40 p-0.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={clampedIndex === 0}
                  aria-label={t('common.prev', isKz ? 'Алдыңғы оқиға' : 'Previous event')}
                  className="p-1 rounded text-ink-brown disabled:opacity-30 disabled:cursor-not-allowed hover:bg-archive-paper transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 font-mono text-xs">
                  {filteredEvents.length > 0 ? clampedIndex + 1 : 0} / {filteredEvents.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={clampedIndex >= filteredEvents.length - 1}
                  aria-label={t('common.next', isKz ? 'Келесі оқиға' : 'Next event')}
                  className="p-1 rounded text-ink-brown disabled:opacity-30 disabled:cursor-not-allowed hover:bg-archive-paper transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={expandedEventIds.size === filteredEvents.length ? collapseAll : expandAll}
                className="hover:text-deep-burgundy underline transition-colors"
              >
                {expandedEventIds.size === filteredEvents.length
                  ? isKz
                    ? 'Барлығын жинау'
                    : 'Collapse all'
                  : isKz
                  ? 'Барлығын ашу'
                  : 'Expand all'}
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Events Container */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-archive-paper/20 rounded-lg border border-soft-line/50">
            <Calendar className="w-10 h-10 mx-auto text-muted-gold/60 mb-3" />
            <p className="font-serif text-lg text-ink-brown/80">
              {isKz ? 'Бұл кезең бойынша оқиға табылмады' : 'No events found for this period'}
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Central Timeline Spine Line */}
            <div
              className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-muted-gold via-soft-line to-muted-gold -translate-x-1/2 hidden sm:block"
              aria-hidden="true"
            />
            <div
              className="absolute left-4 top-4 bottom-4 w-0.5 bg-soft-line -translate-x-1/2 sm:hidden"
              aria-hidden="true"
            />

            {/* Event Cards List */}
            <div className="space-y-8 sm:space-y-12">
              {filteredEvents.map((event, index) => {
                const isExpanded = expandedEventIds.has(event.id);
                const isLeft = index % 2 === 0;
                const isCurrent = index === clampedIndex;

                const eventTitle = isKz ? event.title.kz : event.title.en;
                const eventSummary = isKz ? event.summary.kz : event.summary.en;
                const eventDetails = isKz ? event.details.kz : event.details.en;
                const eventSignificance = isKz ? event.significance.kz : event.significance.en;
                const eventLocation = isKz ? event.location.kz : event.location.en;
                const eventDateStr = isKz ? event.dateStr.kz : event.dateStr.en;

                return (
                  <div
                    key={event.id}
                    id={`timeline-event-${event.id}`}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isLeft ? 'sm:flex-row-reverse' : ''
                    } group`}
                  >
                    {/* Spine Node / Marker */}
                    <div
                      className={`absolute left-4 sm:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                        isCurrent
                          ? 'border-deep-burgundy bg-deep-burgundy text-warm-ivory shadow-subtle ring-4 ring-deep-burgundy/20'
                          : 'border-muted-gold bg-warm-ivory text-muted-gold hover:border-deep-burgundy'
                      }`}
                      aria-hidden="true"
                    >
                      <span className="font-mono text-[11px] font-bold">
                        {event.year.toString().slice(-2)}
                      </span>
                    </div>

                    {/* Spacer for desktop 2-column alignment */}
                    <div className="hidden sm:block sm:w-1/2" />

                    {/* Event Card */}
                    <article
                      className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${
                        isLeft ? 'sm:pr-10' : 'sm:pl-10'
                      }`}
                    >
                      <div
                        className={`museum-card rounded-xl border bg-archive-paper/35 backdrop-blur-xs p-4 sm:p-6 ${
                          isCurrent
                            ? 'border-muted-gold ring-1 ring-muted-gold/40 shadow-subtle'
                            : 'border-soft-line/80'
                        }`}
                      >
                        {/* Meta Tags Row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            {/* Year Badge */}
                            <span className="inline-flex items-center font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-deep-burgundy/10 text-deep-burgundy border border-deep-burgundy/20">
                              {event.year}
                            </span>
                            {/* Date String */}
                            <span className="font-mono text-xs text-ink-brown/70">
                              {eventDateStr}
                            </span>
                          </div>

                          {/* Location & Period Badge */}
                          <div className="flex items-center gap-2">
                            {eventLocation && (
                              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-ink-brown/65 bg-warm-ivory/80 px-2 py-0.5 rounded border border-soft-line/50">
                                <MapPin className="w-3 h-3 text-muted-gold shrink-0" />
                                {eventLocation}
                              </span>
                            )}
                            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-gold px-1.5 py-0.5 rounded bg-muted-gold/10 hidden sm:inline">
                              {event.period}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink-brown tracking-tight mb-2 group-hover:text-deep-burgundy transition-colors">
                          {eventTitle}
                        </h3>

                        {/* Summary */}
                        <p className="font-sans text-sm text-ink-brown/85 leading-relaxed mb-4">
                          {eventSummary}
                        </p>

                        {/* Expandable Details Section */}
                        {isExpanded && (
                          <div
                            id={`timeline-details-${event.id}`}
                            className="mt-4 pt-4 border-t border-soft-line/60 space-y-4 animate-in fade-in-50 duration-200"
                          >
                            {/* In-depth Narrative */}
                            <div>
                              <h4 className="font-mono text-xs uppercase tracking-wider text-muted-gold font-bold mb-1.5">
                                {isKz ? 'Толық тарихи мазмұны' : 'Detailed Narrative'}
                              </h4>
                              <p className="font-sans text-sm text-ink-brown/80 leading-relaxed">
                                {eventDetails}
                              </p>
                            </div>

                            {/* Historical Significance Callout */}
                            {eventSignificance && (
                              <div className="p-3 sm:p-4 rounded-r border-l-2 border-deep-burgundy bg-archive-paper/60 text-xs sm:text-sm text-ink-brown">
                                <span className="font-bold text-deep-burgundy block font-sans mb-1">
                                  {isKz ? 'Тарихи маңызы:' : 'Historical Significance:'}
                                </span>
                                <p className="font-sans italic leading-relaxed text-ink-brown/90">
                                  {eventSignificance}
                                </p>
                              </div>
                            )}

                            {/* Figures Involved Chips */}
                            {Array.isArray(event.figuresInvolved) &&
                              event.figuresInvolved.length > 0 && (
                                <div className="pt-2">
                                  <div className="flex items-center gap-1.5 font-mono text-xs text-ink-brown/70 mb-2">
                                    <Users className="w-3.5 h-3.5 text-muted-gold" />
                                    <span>
                                      {isKz ? 'Қатысқан тұлғалар:' : 'Involved Figures:'}
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {event.figuresInvolved.map((figId) => {
                                      const figObj = getFigureById(figId);
                                      const figDisplay = figObj
                                        ? isKz
                                          ? figObj.name.kz
                                          : figObj.name.en
                                        : `#${figId}`;
                                      return (
                                        <button
                                          key={figId}
                                          type="button"
                                          onClick={() => handleFigureClick(figId)}
                                          className="font-sans text-xs px-2.5 py-1 rounded-full bg-warm-ivory border border-soft-line hover:border-deep-burgundy hover:bg-deep-burgundy hover:text-warm-ivory text-ink-brown transition-colors cursor-pointer"
                                        >
                                          <span>{figDisplay}</span>
                                          {figObj && <span className="sr-only"> #{figId}</span>}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                          </div>
                        )}

                        {/* Card Action Row: Toggle Details */}
                        <div className="mt-4 pt-3 flex items-center justify-between border-t border-soft-line/40">
                          <button
                            type="button"
                            onClick={() => toggleExpand(event.id)}
                            aria-expanded={isExpanded}
                            aria-controls={`timeline-details-${event.id}`}
                            className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold text-deep-burgundy hover:text-burgundy-hover transition-colors focus-visible:outline-none focus-visible:underline"
                          >
                            <span>
                              {isExpanded
                                ? isKz
                                  ? 'Ықшамдау'
                                  : 'Show less'
                                : t('common.more_details', isKz ? 'Толығырақ' : 'More details')}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>

                          <span className="font-mono text-[11px] text-ink-brown/50">
                            ID: {event.id}
                          </span>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
