import React, { useState, useEffect, useCallback } from 'react';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';
import { Header } from '@/components/layout/Header';
import { MobileDrawer } from '@/components/layout/MobileDrawer';
import { FavoritesDrawer } from '@/components/layout/FavoritesDrawer';
import { ChapterRail } from '@/components/layout/ChapterRail';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { ExhibitionGuide } from '@/components/sections/ExhibitionGuide';
import { HistoricalIntro } from '@/components/sections/HistoricalIntro';
import { Timeline } from '@/components/sections/Timeline';
import { FiguresGallery } from '@/components/sections/FiguresGallery';
import { PressArchive } from '@/components/sections/PressArchive';
import { HistoricalMap } from '@/components/sections/HistoricalMap';
import { DocumentArchive } from '@/components/sections/DocumentArchive';
import { MissionsGame } from '@/components/sections/MissionsGame';
import { Quiz } from '@/components/sections/Quiz';
import { Conclusion } from '@/components/sections/Conclusion';
import { useFavorites } from '@/hooks/useFavorites';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { CHAPTERS, scrollToSection } from '@/data/chapters';

const AppContent: React.FC = () => {
  const { language } = useLanguage();
  const isKz = language === 'kz';
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [visitedHalls, setVisitedHalls] = useState<string[]>([]);
  const [selectedFigureId, setSelectedFigureId] = useState<string | null>(null);
  const [largeTextMode, setLargeTextMode] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const { totalFavoritesCount } = useFavorites();

  // Scroll-triggered reveal animations + chapter numerals
  useScrollReveal('main-content');

  // Active chapter scroll spy + visited-halls tracker with clean 1:1 listener lifecycle
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollY = window.scrollY || 0;
      if (scrollY < 240) {
        setActiveSection('');
        return;
      }
      let current = '';
      for (const chapter of CHAPTERS) {
        const el = document.getElementById(chapter.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            current = chapter.id;
          }
        }
      }
      setActiveSection(current);
      if (current) {
        setVisitedHalls((prev) => (prev.includes(current) ? prev : [...prev, current]));
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollSpy);
    };
  }, []);

  const handleSelectFigureFromTimeline = useCallback((figureId: string) => {
    scrollToSection('figures');
    setSelectedFigureId(figureId);
  }, []);

  const clearExternalFigure = useCallback(() => {
    setSelectedFigureId(null);
  }, []);

  return (
    <div
      className={`min-h-screen bg-warm-ivory text-ink-brown flex flex-col font-sans selection:bg-deep-burgundy selection:text-warm-ivory ${
        largeTextMode ? 'reading-large' : ''
      } ${highContrastMode ? 'reading-high-contrast' : ''}`}
    >
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-deep-burgundy focus:text-warm-ivory focus:rounded font-mono text-sm"
      >
        {isKz ? 'Негізгі мазмұнға өту' : 'Skip to main content'}
      </a>

      {/* Sticky Header */}
      <Header
        favoritesCount={totalFavoritesCount}
        activeSection={activeSection}
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={() => setIsDrawerOpen((prev) => !prev)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* Responsive Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeSection={activeSection}
        favoritesCount={totalFavoritesCount}
        onOpenFavorites={() => {
          setIsDrawerOpen(false);
          setIsFavoritesOpen(true);
        }}
      />

      {/* Saved Favorites Drawer (Figures & Archival Documents) */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
      />

      {/* Desktop chapter rail — "you are here" wayfinding */}
      <ChapterRail activeSection={activeSection} />

      {/* Mobile floating Virtual Museum Tour dock (< md) */}
      <MobileBottomNav activeSection={activeSection} />

      {/* Main Content Area — Complete Interactive Virtual Museum Exhibition */}
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Virtual Museum Navigator — curated routes, progress & 9 hall cards */}
        <ExhibitionGuide visitedHalls={visitedHalls} activeSection={activeSection} />

        {/* 01. Historical Context Introduction */}
        <HistoricalIntro />

        {/* 02. Interactive Timeline (1905–1920) connected to Figure Dossiers */}
        <Timeline onSelectFigure={handleSelectFigureFromTimeline} />

        {/* 03. Alash Intellectuals Gallery & Modal Dossiers (16 Figures) */}
        <FiguresGallery
          externalSelectedId={selectedFigureId}
          onExternalSelectHandled={clearExternalFigure}
        />

        {/* 04. National Press Archive ("Aiqap" & "Qazaq") & Viewer Modal */}
        <PressArchive />

        {/* 05. Interactive Historical Geography Map (12 Centers) */}
        <HistoricalMap />

        {/* 06. Primary Documents & Archival Charters */}
        <DocumentArchive />

        {/* 07. "In the Footsteps of Alash" 5-Mission Educational Quest */}
        <MissionsGame />

        {/* 08. 15-Question Categorized Historical Quiz */}
        <Quiz />

        {/* 09. Conclusion, Daily Fact, Alash vs Turkestan Table & Reading Comfort */}
        <Conclusion
          largeTextMode={largeTextMode}
          onToggleLargeText={() => setLargeTextMode((prev) => !prev)}
          highContrastMode={highContrastMode}
          onToggleHighContrast={() => setHighContrastMode((prev) => !prev)}
        />
      </main>

      {/* Deep Forest Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
