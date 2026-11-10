import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Bookmark,
  BookOpen,
  GraduationCap,
  Clock,
  Quote,
  Copy,
  Check,
  Award,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useFavorites } from '@/hooks/useFavorites';
import { KazakhOrnament } from '@/components/ui/KazakhOrnament';
import { SmartPortraitImg } from '@/components/ui/SmartPortraitImg';
import { Figure } from '@/data/types';

export interface FigureModalProps {
  figure: Figure | null;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export type ModalTab = 'bio' | 'education' | 'works' | 'milestones';

export const FigureModal: React.FC<FigureModalProps> = ({
  figure,
  isOpen,
  onClose,
  className = '',
}) => {
  const { language, t } = useLanguage();
  const isKz = language === 'kz';
  const { isFavorite, toggleFavorite } = useFavorites();

  const [activeTab, setActiveTab] = useState<ModalTab>('bio');
  const [copiedQuote, setCopiedQuote] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const isFav = figure ? isFavorite('figure', figure.id) : false;

  // Reset tab on modal open
  useEffect(() => {
    if (isOpen) {
      setActiveTab('bio');
      setCopiedQuote(false);
    }
  }, [isOpen, figure?.id]);

  // Lock body scroll and restore focus
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button or modal container on open
    const timer = setTimeout(() => {
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen]);

  // Escape key listener & Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyQuote = useCallback(() => {
    if (!figure?.quote) return;
    const textToCopy = `«${isKz ? figure.quote.kz : figure.quote.en}» — ${figure.quote.citation}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopiedQuote(true);
        setTimeout(() => setCopiedQuote(false), 2500);
      });
    }
  }, [figure?.quote, isKz]);

  if (!isOpen || !figure) {
    return null;
  }

  const figureName = isKz ? figure.name.kz : figure.name.en;
  const figureRoleTitle = isKz ? figure.roleTitle.kz : figure.roleTitle.en;
  const figureFullBio = isKz ? figure.fullBio.kz : figure.fullBio.en;
  const figureEducation = isKz ? figure.education.kz : figure.education.en;
  const figureWorks = isKz ? figure.keyWorks.kz : figure.keyWorks.en;
  const figureQuote = isKz ? figure.quote.kz : figure.quote.en;

  // Extract initials for typographic monogram fallback
  const initials = figure.name.kz
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('');

  return (
    <div
      role="presentation"
      onClick={(e) => {
        // Dismiss when clicking outside modal box
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 bg-forest-ink/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="figure-modal-name"
        aria-describedby="figure-modal-role"
        className={`relative w-full max-w-4xl bg-warm-ivory border-t-2 sm:border-2 border-soft-line rounded-t-2xl sm:rounded-xl shadow-modal sm:my-auto max-h-[92vh] flex flex-col overflow-hidden text-ink-brown animate-sheet-up sm:animate-modal-pop ${className}`}
      >
        {/* Decorative Ram's Horn Corner Flourishes */}
        <div className="absolute top-2 left-2 pointer-events-none opacity-40">
          <KazakhOrnament variant="corner" size={28} />
        </div>
        <div className="absolute top-2 right-12 pointer-events-none opacity-40 rotate-90">
          <KazakhOrnament variant="corner" size={28} />
        </div>

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-soft-line/60 bg-archive-paper/30">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-gold font-bold">
              {isKz ? 'ТҰЛҒА ДОССЬЕСІ' : 'FIGURE DOSSIER'}
            </span>
            <span className="font-mono text-xs text-ink-brown/50">•</span>
            <span className="font-mono text-xs text-ink-brown/60">
              ID: {figure.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Favorite Bookmark Toggle */}
            <button
              type="button"
              onClick={() => toggleFavorite('figure', figure.id)}
              aria-label={
                isFav
                  ? t('common.remove_favorite', isKz ? 'Таңдаулыдан өшіру' : 'Remove favorite')
                  : t('common.add_favorite', isKz ? 'Таңдаулыға қосу' : 'Add to favorites')
              }
              title={
                isFav
                  ? isKz ? 'Таңдаулыда сақталған' : 'In favorites'
                  : isKz ? 'Таңдаулыға қосу' : 'Add to favorites'
              }
              className={`p-2 rounded-full border transition-all ${
                isFav
                  ? 'bg-deep-burgundy text-warm-ivory border-deep-burgundy shadow-sm'
                  : 'bg-warm-ivory hover:bg-archive-paper/60 text-ink-brown/70 border-soft-line/80'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isFav ? 'fill-warm-ivory' : ''}`} />
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label={t('common.close', isKz ? 'Жабу' : 'Close')}
              className="p-2 rounded-full bg-warm-ivory hover:bg-archive-paper/60 text-ink-brown/80 border border-soft-line/80 hover:text-deep-burgundy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-burgundy"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Header Profile Banner */}
        <div className="px-6 py-6 border-b border-soft-line/60 bg-gradient-to-r from-archive-paper/40 via-warm-ivory to-archive-paper/30">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Portrait / Monogram with Kazakh Seal — Tall uncropped 3:4 portrait frame */}
            <div className="relative shrink-0">
              <div className="w-32 h-44 sm:w-40 sm:h-52 rounded-xl border-2 border-muted-gold/80 overflow-hidden shadow-parchment bg-archive-paper ring-4 ring-muted-gold/15">
                <SmartPortraitImg
                  figureId={figure.id}
                  photoUrl={figure.photoUrl}
                  alt={figureName}
                  className="w-full h-full object-cover sepia-[0.08] contrast-[1.03]"
                  fallback={
                    <div className="relative w-full h-full flex flex-col items-center justify-center bg-archive-paper/70 overflow-hidden text-center p-2">
                      <KazakhOrnament
                        variant="seal"
                        size={72}
                        className="absolute text-muted-gold/25"
                      />
                      <span className="font-serif text-3xl font-bold text-ink-brown tracking-wider relative z-10">
                        {initials || figure.id.slice(0, 2).toUpperCase()}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-muted-gold mt-1 relative z-10">
                        {isKz ? 'МҰРАҒАТ' : 'ARCHIVE'}
                      </span>
                    </div>
                  }
                />
              </div>

              {/* Core Badge */}
              {figure.isCore && (
                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-deep-burgundy text-warm-ivory shadow-xs whitespace-nowrap">
                  {isKz ? 'НЕГІЗГІ ҚҰРАМ' : 'CORE LEADER'}
                </span>
              )}
            </div>

            {/* Figure Titles & Metadata */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-muted-gold tracking-wide">
                  {figure.lifeYears}
                </span>
                <span className="font-mono text-xs text-ink-brown/40">•</span>
                <span className="font-mono text-xs uppercase text-ink-brown/75 bg-warm-ivory px-2 py-0.5 rounded border border-soft-line/60">
                  {isKz
                    ? ({
                        leader: 'Көшбасшы',
                        writer: 'Қаламгер',
                        scholar: 'Ғалым',
                        jurist: 'Заңгер',
                      }[figure.role] || figure.role)
                    : figure.role}
                </span>
              </div>

              <h3
                id="figure-modal-name"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ink-brown tracking-tight"
              >
                {figureName}
              </h3>

              <p
                id="figure-modal-role"
                className="font-sans text-xs sm:text-sm font-medium uppercase tracking-wider text-deep-burgundy mt-1.5"
              >
                {figureRoleTitle}
              </p>

              <p className="font-sans text-xs sm:text-sm text-ink-brown/75 mt-2 line-clamp-2 italic">
                {isKz ? figure.shortBio.kz : figure.shortBio.en}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="border-b border-soft-line/60 px-6 bg-warm-ivory">
          <div
            role="tablist"
            aria-label={isKz ? 'Тұлға бөлімдері' : 'Figure Dossier Tabs'}
            className="flex items-center gap-1 sm:gap-4 overflow-x-auto no-scrollbar"
          >
            {[
              { id: 'bio', labelKz: 'Өмірбаяны', labelEn: 'Biography', icon: BookOpen },
              { id: 'education', labelKz: 'Білімі мен қызметі', labelEn: 'Education & Career', icon: GraduationCap },
              { id: 'works', labelKz: 'Негізгі еңбектері', labelEn: 'Key Works', icon: Award },
              { id: 'milestones', labelKz: 'Маңызды белестер', labelEn: 'Milestones', icon: Clock },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`modal-tab-${tab.id}`}
                  aria-selected={isSelected}
                  aria-controls={`modal-panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as ModalTab)}
                  className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-sans font-semibold border-b-2 transition-all whitespace-nowrap focus-visible:outline-none ${
                    isSelected
                      ? 'border-deep-burgundy text-deep-burgundy'
                      : 'border-transparent text-ink-brown/65 hover:text-ink-brown hover:border-soft-line'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{isKz ? tab.labelKz : tab.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* TAB 1: Biography */}
          {activeTab === 'bio' && (
            <div id="modal-panel-bio" role="tabpanel" aria-labelledby="modal-tab-bio" className="space-y-6">
              {/* Full Bio Paragraphs */}
              <div className="font-sans text-sm sm:text-base text-ink-brown/85 leading-relaxed space-y-4">
                {figureFullBio.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className={idx === 0 ? 'first-letter:text-3xl first-letter:font-serif first-letter:font-bold first-letter:text-deep-burgundy first-letter:float-left first-letter:mr-2' : ''}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Authentic Historical Quote Box */}
              {figure.quote && (
                <div className="relative rounded-lg border border-muted-gold/40 bg-archive-paper/40 p-5 sm:p-6 shadow-xs">
                  <Quote className="w-8 h-8 text-muted-gold/40 absolute top-4 left-4" />
                  <div className="pl-8 sm:pl-10">
                    <p className="font-serif italic text-base sm:text-lg text-ink-brown leading-relaxed mb-3">
                      «{figureQuote}»
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-soft-line/60 pt-3">
                      <span className="font-mono text-xs text-ink-brown/70 font-medium">
                        — {figure.quote.citation}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyQuote}
                        aria-label={isKz ? 'Дәйексөзді көшіру' : 'Copy quote'}
                        className="inline-flex items-center gap-1.5 font-sans text-xs text-deep-burgundy hover:text-burgundy-hover transition-colors"
                      >
                        {copiedQuote ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-forest" />
                            <span className="text-forest font-semibold">
                              {t('common.citation_copied', isKz ? 'Көшірілді!' : 'Copied!')}
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{isKz ? 'Дәйексөзді көшіру' : 'Copy quote'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Education & Career */}
          {activeTab === 'education' && (
            <div id="modal-panel-education" role="tabpanel" aria-labelledby="modal-tab-education" className="space-y-6">
              <div className="rounded-lg border border-soft-line bg-archive-paper/30 p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2 text-deep-burgundy font-serif font-bold text-lg sm:text-xl">
                  <GraduationCap className="w-5 h-5" />
                  <h4>{isKz ? 'Білім алған орындары мен кәсіби жолы' : 'Academic & Professional Pathway'}</h4>
                </div>
                <p className="font-sans text-sm sm:text-base text-ink-brown/85 leading-relaxed">
                  {figureEducation}
                </p>
              </div>

              {/* Archival Context Note */}
              <div className="p-4 rounded border-l-2 border-muted-gold bg-warm-ivory text-xs text-ink-brown/80 font-sans leading-relaxed">
                <span className="font-bold text-ink-brown block mb-1">
                  {isKz ? 'Тарихи анықтама:' : 'Historical Reference:'}
                </span>
                {isKz
                  ? 'Алаш қайраткерлері Санкт-Петербург, Қазан, Мәскеу, Томск, Тарту университеттерінде заң, медицина, ауыл шаруашылығы және шығыстану мамандықтары бойынша терең іргелі білім алып, еуропалық саяси мәдениетті ұлттық мүддемен сабақтастырды.'
                  : 'Alash intellectuals received rigorous academic training at the imperial universities of Saint Petersburg, Kazan, Moscow, Tomsk, and Tartu in jurisprudence, medicine, agriculture, and oriental studies, blending constitutional ideals with Kazakh national sovereignty.'}
              </div>
            </div>
          )}

          {/* TAB 3: Key Works */}
          {activeTab === 'works' && (
            <div id="modal-panel-works" role="tabpanel" aria-labelledby="modal-tab-works" className="space-y-4">
              <h4 className="font-serif text-lg sm:text-xl font-bold text-ink-brown mb-2">
                {isKz ? 'Басты еңбектері, басылымдары мен мақалалары' : 'Principal Works, Primers & Publications'}
              </h4>

              {Array.isArray(figureWorks) && figureWorks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {figureWorks.map((work, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded border border-soft-line/80 bg-archive-paper/30 hover:border-muted-gold/60 transition-colors flex items-start gap-3"
                    >
                      <BookOpen className="w-4 h-4 text-muted-gold mt-1 shrink-0" />
                      <div>
                        <span className="font-serif font-bold text-sm text-ink-brown block leading-snug">
                          {work}
                        </span>
                        <span className="font-mono text-[10px] text-ink-brown/60 uppercase tracking-wide">
                          {isKz ? 'Архивтік мұра' : 'Archival Work'} #{idx + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-sans text-sm text-ink-brown/70 italic">
                  {isKz ? 'Еңбектер тізімі архивте нақтылануда' : 'Works list being curated from archives'}
                </p>
              )}
            </div>
          )}

          {/* TAB 4: Milestones Timeline */}
          {activeTab === 'milestones' && (
            <div id="modal-panel-milestones" role="tabpanel" aria-labelledby="modal-tab-milestones" className="space-y-4">
              <h4 className="font-serif text-lg sm:text-xl font-bold text-ink-brown mb-4">
                {isKz ? 'Өмір жолының маңызды белестері' : 'Key Chronological Milestones'}
              </h4>

              {Array.isArray(figure.milestones) && figure.milestones.length > 0 ? (
                <div className="relative pl-6 border-l-2 border-muted-gold/40 space-y-6">
                  {figure.milestones.map((milestone, idx) => {
                    const milestoneText = isKz ? milestone.event.kz : milestone.event.en;
                    return (
                      <div key={idx} className="relative group">
                        {/* Node */}
                        <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-muted-gold bg-warm-ivory group-hover:bg-deep-burgundy group-hover:border-deep-burgundy transition-colors" />

                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-muted-gold/15 text-muted-gold border border-muted-gold/30">
                            {milestone.year}
                          </span>
                        </div>
                        <p className="font-sans text-sm text-ink-brown/85 leading-relaxed">
                          {milestoneText}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="font-sans text-sm text-ink-brown/70 italic">
                  {isKz ? 'Белестер дерегі архивтен толықтырылуда' : 'Milestone data being updated'}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-4 border-t border-soft-line/60 bg-archive-paper/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-ink-brown/65">
          <span>
            {isKz
              ? 'ҚР Орталық мемлекеттік архиві қоры мен ғылыми басылымдар негізінде'
              : 'Based on Central State Archive of RK & academic editions'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded border border-soft-line/80 bg-warm-ivory hover:bg-archive-paper text-ink-brown font-sans text-xs font-medium transition-colors"
          >
            {t('common.close', isKz ? 'Жабу' : 'Close')}
          </button>
        </div>
      </div>
    </div>
  );
};
