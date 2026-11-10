import React, { useState, useEffect } from 'react';
import { X, Bookmark, Trash2, User, FileText } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useFavorites } from '@/hooks/useFavorites';
import { FIGURES } from '@/data/figures';
import { ARCHIVAL_DOCUMENTS } from '@/data/documents';

export interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { language, t } = useLanguage();
  const isKz = language === 'kz';
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const [activeTab, setActiveTab] = useState<'figures' | 'documents'>('figures');

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const savedFigures = FIGURES.filter((f) => favorites.figures.includes(f.id));
  const savedDocs = ARCHIVAL_DOCUMENTS.filter((d) =>
    favorites.documents.includes(d.id)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="favorites-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-forest-ink/60 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md h-full bg-warm-ivory border-l-2 border-soft-line shadow-modal flex flex-col">
        <div className="px-5 py-4 bg-archive-paper border-b border-soft-line flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-deep-burgundy" />
            <h2
              id="favorites-drawer-title"
              className="font-serif text-xl font-bold text-ink-brown"
            >
              {t('favorites.title', isKz ? 'Таңдаулы мұрағаттар' : 'Saved Archives')}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('common.close', isKz ? 'Жабу' : 'Close')}
            className="p-1.5 rounded border border-soft-line bg-warm-ivory hover:bg-deep-burgundy hover:text-warm-ivory text-ink-brown"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="p-3 bg-archive-paper/40 border-b border-soft-line grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('figures')}
            className={`py-1.5 rounded text-xs font-mono transition-colors ${
              activeTab === 'figures'
                ? 'bg-deep-burgundy text-warm-ivory font-bold'
                : 'bg-warm-ivory text-ink-brown border border-soft-line'
            }`}
          >
            {t('favorites.figures_tab', isKz ? 'Тұлғалар' : 'Figures')} (
            {savedFigures.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('documents')}
            className={`py-1.5 rounded text-xs font-mono transition-colors ${
              activeTab === 'documents'
                ? 'bg-deep-burgundy text-warm-ivory font-bold'
                : 'bg-warm-ivory text-ink-brown border border-soft-line'
            }`}
          >
            {t('favorites.documents_tab', isKz ? 'Құжаттар' : 'Documents')} (
            {savedDocs.length})
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeTab === 'figures' ? (
            savedFigures.length === 0 ? (
              <p className="text-center text-sm text-ink-brown/70 py-10">
                {t('favorites.empty_desc', isKz ? 'Сақталған тұлғалар жоқ.' : 'No saved figures yet.')}
              </p>
            ) : (
              savedFigures.map((fig) => (
                <div
                  key={fig.id}
                  className="p-3.5 rounded border border-soft-line bg-archive-paper/35 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-1.5 font-serif font-bold text-base text-ink-brown">
                      <User className="w-3.5 h-3.5 text-deep-burgundy" />
                      {isKz ? fig.name.kz : fig.name.en}
                    </div>
                    <p className="font-mono text-[11px] text-muted-gold">
                      {fig.lifeYears}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFavorite('figure', fig.id)}
                    aria-label={t('common.remove_favorite', isKz ? 'Өшіру' : 'Remove')}
                    className="p-1.5 rounded border border-soft-line bg-warm-ivory hover:bg-deep-burgundy hover:text-warm-ivory text-ink-brown"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )
          ) : savedDocs.length === 0 ? (
            <p className="text-center text-sm text-ink-brown/70 py-10">
              {t('favorites.empty_desc', isKz ? 'Сақталған құжаттар жоқ.' : 'No saved documents yet.')}
            </p>
          ) : (
            savedDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-3.5 rounded border border-soft-line bg-archive-paper/35 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-1.5 font-serif font-bold text-base text-ink-brown">
                    <FileText className="w-3.5 h-3.5 text-deep-burgundy shrink-0" />
                    <span>{isKz ? doc.title.kz : doc.title.en}</span>
                  </div>
                  <p className="font-mono text-[11px] text-muted-gold mt-0.5">
                    {doc.year}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFavorite('document', doc.id)}
                  aria-label={t('common.remove_favorite', isKz ? 'Өшіру' : 'Remove')}
                  className="p-1.5 rounded border border-soft-line bg-warm-ivory hover:bg-deep-burgundy hover:text-warm-ivory text-ink-brown"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {(savedFigures.length > 0 || savedDocs.length > 0) && (
          <div className="p-4 bg-archive-paper border-t border-soft-line">
            <button
              type="button"
              onClick={clearFavorites}
              className="w-full py-2 rounded-button border border-deep-burgundy text-deep-burgundy hover:bg-deep-burgundy hover:text-warm-ivory text-xs font-mono font-semibold transition-colors"
            >
              {t('common.clear_all', isKz ? 'Барлығын өшіру' : 'Clear All Favorites')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

