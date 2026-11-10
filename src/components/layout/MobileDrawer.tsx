import React, { useEffect } from 'react';
import { X, Bookmark, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { NAV_ITEMS } from './Header';
import { KazakhOrnament } from '@/components/ui/KazakhOrnament';

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFavorites?: () => void;
  favoritesCount?: number;
  activeSection?: string;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onOpenFavorites,
  favoritesCount = 0,
  activeSection = '',
}) => {
  const { language, setLanguage, t } = useLanguage();
  const isKz = language === 'kz';

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    const targetElement = document.querySelector(href);
    if (targetElement && typeof targetElement.scrollIntoView === 'function') {
      try {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } catch {
        targetElement.scrollIntoView();
      }
    }
  };

  const handleFavoritesClick = () => {
    onClose();
    if (onOpenFavorites) onOpenFavorites();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isKz ? 'Тарихи музей навигациясы' : 'Digital Museum Navigation'}
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-ink-brown/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer slide-over container */}
      <div className="relative w-4/5 max-w-sm h-full bg-warm-ivory border-l border-soft-line shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-soft-line">
            <div className="flex items-center gap-2">
              <KazakhOrnament variant="seal" size={24} color="#722F35" />
              <div>
                <span className="font-serif font-bold text-lg text-ink-brown block leading-tight">
                  {t('brand.title', isKz ? 'АЛАШ МҰРАСЫ' : 'ALASH HERITAGE')}
                </span>
                <span className="font-mono text-[9px] tracking-widest text-muted-gold uppercase block">
                  {t('brand.tagline', isKz ? 'ТАРИХИ МҰРАҒАТ' : 'DIGITAL ARCHIVE')}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md text-ink-brown hover:bg-archive-paper border border-soft-line transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-burgundy"
              aria-label={isKz ? 'Мәзірді жабу' : 'Close menu'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav
            aria-label={isKz ? 'Мобильді навигация' : 'Mobile Navigation'}
            className="mt-6 flex flex-col space-y-1"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const label = t(item.labelKey, isKz ? item.fallbackKz : item.fallbackEn);
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`flex items-center justify-between px-3 py-3 rounded-md font-sans text-base transition-colors ${
                    isActive
                      ? 'bg-archive-paper text-deep-burgundy font-semibold border-l-4 border-deep-burgundy'
                      : 'text-ink-brown hover:bg-archive-paper/60'
                  }`}
                >
                  <span>{label}</span>
                  <ChevronRight className="w-4 h-4 text-ink-brown/40" />
                </a>
              );
            })}
          </nav>
        </div>

        {/* Drawer Actions & Footer */}
        <div className="mt-8 pt-6 border-t border-soft-line space-y-4">
          {/* Favorites Button in Drawer */}
          <button
            type="button"
            onClick={handleFavoritesClick}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-md bg-archive-paper border border-soft-line text-ink-brown font-medium text-sm hover:bg-archive-paper/80 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-deep-burgundy" />
              <span>{isKz ? 'Таңдаулы материалдар' : 'Saved Favorites'}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-deep-burgundy text-warm-ivory text-xs font-mono font-bold">
              {favoritesCount}
            </span>
          </button>

          {/* Full-width Language Toggle */}
          <div className="w-full p-1 bg-archive-paper/80 rounded-md border border-soft-line flex text-center font-mono text-sm">
            <button
              type="button"
              onClick={() => setLanguage('kz')}
              className={`flex-1 py-1.5 rounded transition-all font-medium ${
                isKz
                  ? 'bg-deep-burgundy text-warm-ivory font-bold shadow-xs'
                  : 'text-ink-brown/70 hover:text-ink-brown'
              }`}
            >
              Қазақша (KZ)
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`flex-1 py-1.5 rounded transition-all font-medium ${
                !isKz
                  ? 'bg-deep-burgundy text-warm-ivory font-bold shadow-xs'
                  : 'text-ink-brown/70 hover:text-ink-brown'
              }`}
            >
              English (EN)
            </button>
          </div>

          {/* Archival Motto Footer */}
          <div className="pt-2 text-center">
            <KazakhOrnament variant="divider" size={48} className="my-2" />
            <p className="font-serif italic text-xs text-ink-brown/70">
              {t('footer.motto', isKz
                ? '«Алаш туы астында, күн сөнгенше сөнбейміз!»'
                : '"Under the banner of Alash, our flame shall never fade!"')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
