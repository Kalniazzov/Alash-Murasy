import React, { useState, useEffect, useRef } from 'react';
import { Menu, Bookmark } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { KazakhOrnament } from '@/components/ui/KazakhOrnament';

export interface NavItem {
  id: string;
  href: string;
  labelKey: string;
  fallbackKz: string;
  fallbackEn: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'timeline', href: '#timeline', labelKey: 'nav.timeline', fallbackKz: 'Уақыт сызығы', fallbackEn: 'Timeline' },
  { id: 'figures', href: '#figures', labelKey: 'nav.figures', fallbackKz: 'Тұлғалар', fallbackEn: 'Figures' },
  { id: 'press', href: '#press', labelKey: 'nav.press', fallbackKz: 'Баспасөз', fallbackEn: 'Press' },
  { id: 'map', href: '#map', labelKey: 'nav.map', fallbackKz: 'Карта', fallbackEn: 'Map' },
  { id: 'documents', href: '#documents', labelKey: 'nav.documents', fallbackKz: 'Құжаттар', fallbackEn: 'Documents' },
  { id: 'missions', href: '#missions', labelKey: 'nav.missions', fallbackKz: 'Миссиялар', fallbackEn: 'Missions' },
  { id: 'quiz', href: '#quiz', labelKey: 'nav.quiz', fallbackKz: 'Тест', fallbackEn: 'Quiz' },
];

export interface HeaderProps {
  onOpenFavorites?: () => void;
  favoritesCount?: number;
  activeSection?: string;
  onToggleDrawer?: () => void;
  isDrawerOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenFavorites,
  favoritesCount = 0,
  activeSection = '',
  onToggleDrawer,
  isDrawerOpen = false,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      setIsScrolled(y > 20);
      // Reading progress bar (direct DOM write — no re-render per frame)
      const doc = document.documentElement;
      const max = Math.max(1, (doc?.scrollHeight || 0) - (window.innerHeight || 0));
      const ratio = Math.min(1, Math.max(0, y / max));
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement && typeof targetElement.scrollIntoView === 'function') {
      try {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } catch {
        targetElement.scrollIntoView();
      }
    }
  };

  const isKz = language === 'kz';

  return (
    <header
      role="banner"
      id="header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-warm-ivory/95 backdrop-blur-md shadow-sm border-b border-soft-line/80 py-3'
          : 'bg-warm-ivory/80 backdrop-blur-xs border-b border-soft-line/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex items-center gap-3 text-ink-brown hover:opacity-90 transition-opacity"
          aria-label={isKz ? 'Алаш мұрасы — Басты бетке оралу' : 'Alash Heritage — Back to home'}
        >
          <div className="w-9 h-9 rounded-full bg-archive-paper border border-soft-line flex items-center justify-center shrink-0 shadow-xs">
            <KazakhOrnament variant="seal" size={26} color="#722F35" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl sm:text-2xl tracking-wide uppercase text-ink-brown leading-tight">
              {t('brand.title', isKz ? 'АЛАШ МҰРАСЫ' : 'ALASH HERITAGE')}
            </span>
            <span className="font-mono text-[10px] tracking-widest text-muted-gold uppercase">
              {t('brand.tagline', isKz ? 'ТАРИХИ МҰРАҒАТ' : 'DIGITAL ARCHIVE')}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label={isKz ? 'Негізгі навигация' : 'Main Navigation'}
          className="hidden md:flex items-center space-x-1 lg:space-x-4"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            const label = t(item.labelKey, isKz ? item.fallbackKz : item.fallbackEn);
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`group px-2.5 py-1.5 text-sm font-sans font-medium transition-colors relative rounded hover:text-deep-burgundy ${
                  isActive
                    ? 'text-deep-burgundy font-semibold'
                    : 'text-ink-brown/80'
                }`}
              >
                {label}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-2 right-2 h-0.5 bg-deep-burgundy rounded-full origin-center transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Header Actions (Favorites, Language Switcher, Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Favorites Button with Badge Counter */}
          <button
            type="button"
            onClick={onOpenFavorites}
            className="relative p-2 rounded-md border border-soft-line/80 bg-archive-paper/60 hover:bg-archive-paper text-ink-brown transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-burgundy"
            aria-label={
              isKz
                ? `Таңдаулылар (${favoritesCount})`
                : `Saved Favorites (${favoritesCount})`
            }
            title={isKz ? 'Таңдаулылар' : 'Favorites'}
          >
            <Bookmark className="w-4 h-4 text-ink-brown" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-deep-burgundy text-warm-ivory text-[10px] font-mono font-bold flex items-center justify-center shadow-xs">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Bilingual Language Switcher (KZ | EN) */}
          <div
            className="flex items-center p-0.5 rounded-md border border-soft-line bg-archive-paper/70 text-xs font-mono"
            role="group"
            aria-label={isKz ? 'Тілді таңдау' : 'Language selector'}
          >
            <button
              type="button"
              onClick={() => setLanguage('kz')}
              className={`px-2.5 py-1 rounded transition-all font-medium ${
                isKz
                  ? 'bg-deep-burgundy text-warm-ivory shadow-xs font-bold'
                  : 'text-ink-brown/70 hover:text-ink-brown'
              }`}
              aria-pressed={isKz}
            >
              KZ
            </button>
            <span className="text-soft-line px-0.5" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded transition-all font-medium ${
                !isKz
                  ? 'bg-deep-burgundy text-warm-ivory shadow-xs font-bold'
                  : 'text-ink-brown/70 hover:text-ink-brown'
              }`}
              aria-pressed={!isKz}
            >
              EN
            </button>
          </div>

          {/* Mobile Drawer Hamburger Button */}
          <button
            type="button"
            onClick={onToggleDrawer}
            className="md:hidden p-2 rounded-md border border-soft-line bg-archive-paper/60 hover:bg-archive-paper text-ink-brown transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-burgundy"
            aria-expanded={isDrawerOpen}
            aria-label={isKz ? 'Мәзірді ашу' : 'Open navigation menu'}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Reading progress bar */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute left-0 bottom-0 h-[3px] w-full origin-left bg-gradient-to-r from-deep-burgundy via-muted-gold to-deep-burgundy transition-transform duration-150 ease-out"
        style={{ transform: 'scaleX(0)' }}
      />
    </header>
  );
};
