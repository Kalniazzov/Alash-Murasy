import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  FileText,
  Bookmark,
  BookOpen,
  X,
  Share2,
  Check,
  Archive,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useFavorites } from '@/hooks/useFavorites';
import { KazakhOrnament } from '@/components/ui/KazakhOrnament';
import { ARCHIVAL_DOCUMENTS } from '@/data/documents';
import { DocumentItem } from '@/data/types';

type DocCategoryFilter = 'all' | DocumentItem['category'];

export const DocumentArchive: React.FC = () => {
  const { language, t } = useLanguage();
  const isKz = language === 'kz';
  const { isFavorite, toggleFavorite } = useFavorites();

  const [category, setCategory] = useState<DocCategoryFilter>('all');
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const filteredDocs = useMemo(() => {
    if (category === 'all') return ARCHIVAL_DOCUMENTS;
    return ARCHIVAL_DOCUMENTS.filter((d) => d.category === category);
  }, [category]);

  useEffect(() => {
    if (!selectedDoc) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedDoc(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDoc]);

  const categories: Array<{ id: DocCategoryFilter; kz: string; en: string }> = [
    { id: 'all', kz: 'Барлық құжаттар (6)', en: 'All Documents (6)' },
    { id: 'petition', kz: 'Петиция', en: 'Petitions' },
    { id: 'program', kz: 'Партия бағдарламасы', en: 'Party Program' },
    { id: 'decree', kz: 'Съезд қаулылары', en: 'Congress Resolutions' },
    { id: 'manifesto', kz: 'Үндеулер', en: 'Appeals' },
    { id: 'report', kz: 'Шекара баяндамасы', en: 'Territorial Report' },
  ];

  const handleCopyShare = (doc: DocumentItem) => {
    const shareText = `${isKz ? doc.title.kz : doc.title.en} (${doc.year}) — ${
      isKz ? doc.archiveReference.kz : doc.archiveReference.en
    }`;
    if (typeof navigator !== 'undefined' && navigator?.clipboard?.writeText) {
      try {
        Promise.resolve(navigator.clipboard.writeText(shareText)).catch(() => {});
      } catch {
        // Ignore clipboard unavailability in non-secure / headless environments
      }
    }
    setCopiedId(doc.id);
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => {
      setCopiedId((prev) => (prev === doc.id ? null : prev));
      copyTimerRef.current = null;
    }, 1800);
  };

  return (
    <section
      id="documents"
      aria-labelledby="docs-heading"
      className="py-16 sm:py-24 border-b border-soft-line/60 bg-warm-ivory"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-gold">
            {isKz ? 'ТАРИХТЫҢ ІЗІ · ДЕРЕККӨЗДЕР ҚОРЫ' : 'TRACES OF HISTORY · PRIMARY SOURCES'}
          </span>
          <h2
            id="docs-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-brown mt-2 mb-4"
          >
            {t('nav.documents', isKz ? 'Құжаттар' : 'Documents')} &{' '}
            {isKz ? 'Архив' : 'Archive'}
          </h2>
          <KazakhOrnament variant="divider" size={64} className="my-4" />
          <p className="font-sans text-base text-ink-brown/80 leading-relaxed">
            {isKz
              ? '1905 жылғы Қарқаралы петициясынан бастап 1917 жылғы «Алаш» бағдарламасы мен 1920 жылғы шекара баяндамасына дейінгі негізгі тарихи құжаттар мен олардың дереккөздік мәртебесі.'
              : 'Examine foundational historical charters — from the 1905 Karkaraly Petition and the 10-article 1917 Alash Party Program to the 1920 territorial demarcation report — with transparent archival status attribution.'}
          </p>
        </div>

        {/* Category Filter — horizontal swipe on mobile */}
        <div
          className="flex items-center sm:justify-center gap-2 mb-8 sm:mb-10 overflow-x-auto sm:flex-wrap pb-1.5 sm:pb-0 -mx-1 px-1 no-scrollbar"
          role="group"
          aria-label={isKz ? 'Құжат санаттары' : 'Document categories'}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              aria-pressed={category === cat.id}
              className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors ${
                category === cat.id
                  ? 'bg-deep-burgundy text-warm-ivory font-semibold'
                  : 'bg-archive-paper/50 text-ink-brown border border-soft-line hover:bg-archive-paper'
              }`}
            >
              {isKz ? cat.kz : cat.en}
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredDocs.map((doc) => {
            const saved = isFavorite('document', doc.id);
            const isCopied = copiedId === doc.id;

            return (
              <article
                key={doc.id}
                className="museum-card rounded-xl border border-soft-line bg-archive-paper/35 p-5 sm:p-6 shadow-parchment flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-warm-ivory border border-soft-line font-mono text-xs font-bold text-deep-burgundy">
                      <FileText className="w-3.5 h-3.5" />
                      {doc.year}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleCopyShare(doc)}
                        aria-label={
                          isKz
                            ? 'Құжат сілтемесін көшіру'
                            : 'Copy document citation'
                        }
                        className="p-1.5 rounded border border-soft-line bg-warm-ivory hover:bg-archive-paper text-ink-brown transition-colors"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-deep-burgundy" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleFavorite('document', doc.id)}
                        aria-pressed={saved}
                        aria-label={
                          saved
                            ? t('common.in_favorites', isKz ? 'Таңдаулыда' : 'Saved')
                            : t('common.add_favorite', isKz ? 'Таңдаулыға қосу' : 'Save')
                        }
                        className={`p-1.5 rounded border transition-colors ${
                          saved
                            ? 'bg-deep-burgundy text-warm-ivory border-deep-burgundy'
                            : 'bg-warm-ivory text-ink-brown border-soft-line hover:bg-archive-paper'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Archival Authenticity Badge */}
                  <div className="mb-2.5">
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono bg-warm-ivory/90 text-ink-brown/75 border border-soft-line/80">
                      {isKz ? doc.statusLabel.kz : doc.statusLabel.en}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-ink-brown mb-1.5 leading-snug">
                    {isKz ? doc.title.kz : doc.title.en}
                  </h3>
                  <p className="font-mono text-[11px] text-muted-gold mb-3">
                    {isKz ? doc.dateLabel.kz : doc.dateLabel.en}
                  </p>

                  <p className="font-sans text-sm text-ink-brown/85 leading-relaxed line-clamp-4">
                    {isKz ? doc.historicalContext.kz : doc.historicalContext.en}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-soft-line/70">
                  <p className="font-mono text-[11px] text-ink-brown/65 flex items-start gap-1.5 mb-3">
                    <Archive className="w-3.5 h-3.5 text-muted-gold shrink-0 mt-0.5" />
                    <span>
                      {isKz ? doc.archiveReference.kz : doc.archiveReference.en}
                    </span>
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedDoc(doc)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-button bg-deep-burgundy hover:bg-burgundy-hover text-warm-ivory text-xs sm:text-sm font-medium transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    {t('common.view_doc', isKz ? 'Құжатты қарау' : 'Inspect Document')}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Document Reader Modal */}
      {selectedDoc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="doc-modal-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-forest-ink/80 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedDoc(null);
          }}
        >
          <div className="w-full max-w-3xl max-h-[92vh] rounded-t-2xl sm:rounded-xl bg-warm-ivory border-t-2 sm:border-2 border-soft-line shadow-modal flex flex-col overflow-hidden animate-sheet-up sm:animate-modal-pop">
            <div className="px-5 py-4 bg-archive-paper border-b border-soft-line flex items-center justify-between gap-3">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-deep-burgundy font-bold block">
                  {isKz ? selectedDoc.statusLabel.kz : selectedDoc.statusLabel.en}
                </span>
                <h3
                  id="doc-modal-title"
                  className="font-serif text-xl sm:text-2xl font-bold text-ink-brown"
                >
                  {isKz ? selectedDoc.title.kz : selectedDoc.title.en}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleFavorite('document', selectedDoc.id)}
                  aria-pressed={isFavorite('document', selectedDoc.id)}
                  className={`px-3 py-1.5 rounded text-xs font-mono border inline-flex items-center gap-1.5 ${
                    isFavorite('document', selectedDoc.id)
                      ? 'bg-deep-burgundy text-warm-ivory border-deep-burgundy'
                      : 'bg-warm-ivory text-ink-brown border-soft-line'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  {isFavorite('document', selectedDoc.id)
                    ? t('common.in_favorites', isKz ? 'Таңдаулыда' : 'Saved')
                    : t('common.add_favorite', isKz ? 'Сақтау' : 'Save')}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  aria-label={t('common.close', isKz ? 'Жабу' : 'Close')}
                  className="p-1.5 rounded border border-soft-line bg-warm-ivory hover:bg-deep-burgundy hover:text-warm-ivory text-ink-brown"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5">
              <div className="text-xs font-mono text-ink-brown/70 flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-soft-line">
                <span>{isKz ? selectedDoc.dateLabel.kz : selectedDoc.dateLabel.en}</span>
                <span>
                  {isKz
                    ? selectedDoc.archiveReference.kz
                    : selectedDoc.archiveReference.en}
                </span>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-muted-gold mb-1.5">
                  {isKz ? 'Тарихи алғышарт' : 'Historical Context'}
                </h4>
                <p className="font-sans text-sm sm:text-base text-ink-brown/90 leading-relaxed">
                  {isKz
                    ? selectedDoc.historicalContext.kz
                    : selectedDoc.historicalContext.en}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded border border-soft-line bg-archive-paper/40">
                <h4 className="font-mono text-xs uppercase tracking-wider text-deep-burgundy font-bold mb-2">
                  {isKz ? 'Негізгі мазмұны / Мәтін желісі' : 'Document Content / Summary'}
                </h4>
                <p className="font-serif text-base sm:text-lg text-ink-brown leading-relaxed">
                  {isKz
                    ? selectedDoc.transcription.kz
                    : selectedDoc.transcription.en}
                </p>
              </div>

              {/* Clauses */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-muted-gold mb-3">
                  {isKz ? 'Құрылымдық баптар мен түсіндірме' : 'Key Articles & Commentary'}
                </h4>
                <div className="space-y-3">
                  {selectedDoc.clauses.map((clause, i) => (
                    <div
                      key={i}
                      className="p-4 rounded border border-soft-line bg-warm-ivory"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-deep-burgundy text-warm-ivory font-mono text-xs font-bold">
                          {clause.number}
                        </span>
                        <span className="font-serif font-bold text-base text-ink-brown">
                          {isKz ? clause.topic.kz : clause.topic.en}
                        </span>
                      </div>
                      <p className="font-sans text-sm text-ink-brown/90 mt-1.5">
                        {isKz ? clause.text.kz : clause.text.en}
                      </p>
                      <p className="font-sans text-xs text-ink-brown/70 mt-2 pt-2 border-t border-soft-line/60 italic">
                        {isKz ? clause.commentary.kz : clause.commentary.en}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
