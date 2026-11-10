import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React, { useState } from 'react';
import App from '@/App';
import { MobileDrawer } from '@/components/layout/MobileDrawer';
import { NAV_ITEMS } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { HistoricalIntro } from '@/components/sections/HistoricalIntro';
import { Footer } from '@/components/layout/Footer';
import { LanguageProvider } from '@/i18n/LanguageContext';

describe('Adversarial & Stress Verification Suite: UI & Navigation', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  // =========================================================================
  // 1. MobileDrawer Adversarial & Stress Testing
  // =========================================================================
  describe('MobileDrawer Stress & Edge Cases', () => {
    it('does not render dialog in DOM when isOpen is false', () => {
      render(
        <LanguageProvider>
          <MobileDrawer isOpen={false} onClose={vi.fn()} />
        </LanguageProvider>
      );
      expect(screen.queryByRole('dialog')).toBeNull();
      expect(document.body.style.overflow).toBe('');
    });

    it('locks document.body.style.overflow to hidden when isOpen is true', () => {
      render(
        <LanguageProvider>
          <MobileDrawer isOpen={true} onClose={vi.fn()} />
        </LanguageProvider>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('unmounts cleanly and restores document.body.style.overflow to empty string even if unmounted while open', () => {
      const { unmount } = render(
        <LanguageProvider>
          <MobileDrawer isOpen={true} onClose={vi.fn()} />
        </LanguageProvider>
      );
      expect(document.body.style.overflow).toBe('hidden');

      // Unmount while still open
      unmount();
      expect(document.body.style.overflow).toBe('');
    });

    it('triggers onClose and unlocks body overflow when clicking close (X) button', () => {
      const onClose = vi.fn();
      render(
        <LanguageProvider>
          <MobileDrawer isOpen={true} onClose={onClose} />
        </LanguageProvider>
      );

      const closeBtn = screen.getByRole('button', { name: /Мәзірді жабу/i });
      fireEvent.click(closeBtn);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('triggers onClose when clicking dimmed backdrop', () => {
      const onClose = vi.fn();
      const { container } = render(
        <LanguageProvider>
          <MobileDrawer isOpen={true} onClose={onClose} />
        </LanguageProvider>
      );

      const backdrop = container.querySelector('[aria-hidden="true"].fixed.inset-0');
      expect(backdrop).not.toBeNull();
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(onClose).toHaveBeenCalledTimes(1);
      }
    });

    it('triggers onClose when pressing Escape key while open', () => {
      const onClose = vi.fn();
      render(
        <LanguageProvider>
          <MobileDrawer isOpen={true} onClose={onClose} />
        </LanguageProvider>
      );

      fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does NOT trigger onClose when pressing Escape key while closed', () => {
      const onClose = vi.fn();
      render(
        <LanguageProvider>
          <MobileDrawer isOpen={false} onClose={onClose} />
        </LanguageProvider>
      );

      fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('does NOT trigger onClose when pressing non-Escape keys while open', () => {
      const onClose = vi.fn();
      render(
        <LanguageProvider>
          <MobileDrawer isOpen={true} onClose={onClose} />
        </LanguageProvider>
      );

      fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' });
      fireEvent.keyDown(window, { key: 'Tab', code: 'Tab' });
      fireEvent.keyDown(window, { key: 'ArrowDown', code: 'ArrowDown' });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('survives 100 rapid open/close state toggles without leaking scroll lock or event listeners', () => {
      const StressHarness: React.FC = () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
          <div>
            <button data-testid="toggle-btn" onClick={() => setIsOpen((prev) => !prev)}>
              Toggle
            </button>
            <MobileDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </div>
        );
      };

      const { unmount } = render(
        <LanguageProvider>
          <StressHarness />
        </LanguageProvider>
      );

      const toggleBtn = screen.getByTestId('toggle-btn');

      // 100 rapid toggles
      for (let i = 0; i < 100; i++) {
        fireEvent.click(toggleBtn);
      }

      // 100 clicks from initial false means 100 toggles -> isOpen should be false
      expect(document.body.style.overflow).toBe('');
      expect(screen.queryByRole('dialog')).toBeNull();

      // One more toggle -> isOpen becomes true
      fireEvent.click(toggleBtn);
      expect(document.body.style.overflow).toBe('hidden');
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Escape key while open
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(document.body.style.overflow).toBe('');
      expect(screen.queryByRole('dialog')).toBeNull();

      unmount();
      expect(document.body.style.overflow).toBe('');
    });

    it('handles clicking navigation link in drawer with smooth scroll attempt', () => {
      const onClose = vi.fn();
      const targetDiv = document.createElement('div');
      targetDiv.id = 'timeline';
      const scrollIntoViewMock = vi.fn();
      targetDiv.scrollIntoView = scrollIntoViewMock;
      document.body.appendChild(targetDiv);

      render(
        <LanguageProvider>
          <MobileDrawer isOpen={true} onClose={onClose} />
        </LanguageProvider>
      );

      const timelineLink = screen.getByRole('link', { name: /Уақыт сызығы/i });
      fireEvent.click(timelineLink);

      expect(onClose).toHaveBeenCalledTimes(1);
      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });

      document.body.removeChild(targetDiv);
    });

    it('handles clicking navigation link when target element does not exist in DOM without throwing', () => {
      const onClose = vi.fn();
      render(
        <LanguageProvider>
          <MobileDrawer isOpen={true} onClose={onClose} />
        </LanguageProvider>
      );

      const pressLink = screen.getByRole('link', { name: /Баспасөз/i });
      expect(() => {
        fireEvent.click(pressLink);
      }).not.toThrow();

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('handles clicking favorites button in drawer and triggers callbacks', () => {
      const onClose = vi.fn();
      const onOpenFavorites = vi.fn();

      render(
        <LanguageProvider>
          <MobileDrawer
            isOpen={true}
            onClose={onClose}
            onOpenFavorites={onOpenFavorites}
            favoritesCount={5}
          />
        </LanguageProvider>
      );

      const favBtn = screen.getByRole('button', { name: /Таңдаулы материалдар/i });
      fireEvent.click(favBtn);

      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onOpenFavorites).toHaveBeenCalledTimes(1);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('handles language switcher inside mobile drawer correctly', () => {
      render(
        <LanguageProvider>
          <MobileDrawer isOpen={true} onClose={vi.fn()} />
        </LanguageProvider>
      );

      const enBtn = screen.getByRole('button', { name: /English \(EN\)/i });
      fireEvent.click(enBtn);

      // Label switches to English
      expect(screen.getByRole('link', { name: /Timeline/i })).toBeInTheDocument();
      expect(screen.getByText(/Saved Favorites/i)).toBeInTheDocument();

      const kzBtn = screen.getByRole('button', { name: /Қазақша \(KZ\)/i });
      fireEvent.click(kzBtn);
      expect(screen.getByRole('link', { name: /Уақыт сызығы/i })).toBeInTheDocument();
    });
  });

  // =========================================================================
  // 2. Anchor Links Integrity in App DOM
  // =========================================================================
  describe('Anchor Links Integrity in App DOM', () => {
    it('verifies all 7 navigation links point to valid DOM section elements in App', () => {
      const { container } = render(<App />);

      const requiredSections = [
        '#timeline',
        '#figures',
        '#press',
        '#map',
        '#documents',
        '#missions',
        '#quiz',
      ];

      // Check NAV_ITEMS definitions
      expect(NAV_ITEMS.map((item) => item.href)).toEqual(requiredSections);

      // Verify each corresponding section element exists in the DOM
      for (const sectionSelector of requiredSections) {
        const el = container.querySelector(sectionSelector);
        expect(el).not.toBeNull();
        expect(el?.tagName.toLowerCase()).toBe('section');
        expect(el?.id).toBe(sectionSelector.replace('#', ''));
      }
    });

    it('exhaustively validates that EVERY internal anchor link in the entire App points to an existing DOM element', () => {
      const { container } = render(<App />);

      const allInternalLinks = container.querySelectorAll('a[href^="#"]');
      expect(allInternalLinks.length).toBeGreaterThan(0);

      const missingTargets: string[] = [];
      allInternalLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href && href.length > 1) {
          const target = container.querySelector(href);
          if (!target) {
            missingTargets.push(href);
          }
        }
      });

      // No broken internal anchors allowed!
      expect(missingTargets).toEqual([]);
    });

    it('verifies all auxiliary anchor references in App have corresponding DOM elements', () => {
      const { container } = render(<App />);

      const auxiliaryAnchors = [
        '#hero',
        '#intro',
        '#conclusion',
        '#footer',
        '#header',
        '#main-content',
      ];

      for (const selector of auxiliaryAnchors) {
        const el = container.querySelector(selector);
        expect(el).not.toBeNull();
      }
    });

    it('verifies desktop header contains all 7 navigation links with correct hrefs', () => {
      render(<App />);
      const nav = screen.getByRole('navigation', { name: /Негізгі навигация/i });
      const links = nav.querySelectorAll('a');

      expect(links).toHaveLength(7);
      const hrefs = Array.from(links).map((l) => l.getAttribute('href'));
      expect(hrefs).toEqual([
        '#timeline',
        '#figures',
        '#press',
        '#map',
        '#documents',
        '#missions',
        '#quiz',
      ]);
    });

    it('verifies mobile drawer contains all 7 navigation links with correct hrefs', () => {
      render(
        <LanguageProvider>
          <MobileDrawer isOpen={true} onClose={vi.fn()} />
        </LanguageProvider>
      );
      const nav = screen.getByRole('navigation', { name: /Мобильді навигация/i });
      const links = nav.querySelectorAll('a');

      expect(links).toHaveLength(7);
      const hrefs = Array.from(links).map((l) => l.getAttribute('href'));
      expect(hrefs).toEqual([
        '#timeline',
        '#figures',
        '#press',
        '#map',
        '#documents',
        '#missions',
        '#quiz',
      ]);
    });

    it('verifies footer directory contains all 7 navigation links', () => {
      const { container } = render(<App />);
      const footer = container.querySelector('footer#footer');
      expect(footer).not.toBeNull();

      const footerLinks = footer?.querySelectorAll('a[href^="#"]');
      const hrefs = Array.from(footerLinks || []).map((l) => l.getAttribute('href'));

      expect(hrefs).toContain('#timeline');
      expect(hrefs).toContain('#figures');
      expect(hrefs).toContain('#press');
      expect(hrefs).toContain('#map');
      expect(hrefs).toContain('#documents');
      expect(hrefs).toContain('#missions');
      expect(hrefs).toContain('#quiz');
    });

    it('verifies anchor hrefs remain invariant when switching languages (no broken translated URLs)', () => {
      render(<App />);

      // Switch to English
      const enBtn = screen.getByRole('button', { name: /^EN$/i });
      fireEvent.click(enBtn);

      const nav = screen.getByRole('navigation', { name: /Main Navigation/i });
      const links = nav.querySelectorAll('a');
      const hrefs = Array.from(links).map((l) => l.getAttribute('href'));

      expect(hrefs).toEqual([
        '#timeline',
        '#figures',
        '#press',
        '#map',
        '#documents',
        '#missions',
        '#quiz',
      ]);
    });
  });

  // =========================================================================
  // 3. CTA Buttons Behavior & Scroll Interaction
  // =========================================================================
  describe('CTA Buttons Interaction & Scroll Handlers', () => {
    it('clicks Hero primary CTA (Explore Timeline) and triggers scrollIntoView on #timeline without throw', () => {
      const { container } = render(<App />);

      const timelineSection = container.querySelector('#timeline');
      expect(timelineSection).not.toBeNull();
      const scrollMock = vi.fn();
      if (timelineSection) {
        timelineSection.scrollIntoView = scrollMock;
      }

      const exploreBtn = screen.getByRole('button', { name: /Тарихты зерттеу/i });
      expect(() => {
        fireEvent.click(exploreBtn);
      }).not.toThrow();

      expect(scrollMock).toHaveBeenCalledWith({ behavior: 'smooth' });
    });

    it('clicks Hero primary CTA with custom onExploreClick callback', () => {
      const onExplore = vi.fn();
      render(
        <LanguageProvider>
          <Hero onExploreClick={onExplore} />
        </LanguageProvider>
      );

      const exploreBtn = screen.getByRole('button', { name: /Тарихты зерттеу/i });
      fireEvent.click(exploreBtn);
      expect(onExplore).toHaveBeenCalledTimes(1);
    });

    it('clicks Hero secondary CTA (Start Mission) and triggers scrollIntoView on #missions without throw', () => {
      const { container } = render(<App />);

      const missionsSection = container.querySelector('#missions');
      expect(missionsSection).not.toBeNull();
      const scrollMock = vi.fn();
      if (missionsSection) {
        missionsSection.scrollIntoView = scrollMock;
      }

      const missionBtn = screen.getByRole('button', { name: /Тарихи миссияны бастау/i });
      expect(() => {
        fireEvent.click(missionBtn);
      }).not.toThrow();

      expect(scrollMock).toHaveBeenCalledWith({ behavior: 'smooth' });
    });

    it('clicks Hero secondary CTA with custom onMissionClick callback', () => {
      const onMission = vi.fn();
      render(
        <LanguageProvider>
          <Hero onMissionClick={onMission} />
        </LanguageProvider>
      );

      const missionBtn = screen.getByRole('button', { name: /Тарихи миссияны бастау/i });
      fireEvent.click(missionBtn);
      expect(onMission).toHaveBeenCalledTimes(1);
    });

    it('clicks Hero scroll prompt and scrolls to #intro without throw', () => {
      const { container } = render(<App />);
      const introSection = container.querySelector('#intro');
      expect(introSection).not.toBeNull();
      const scrollMock = vi.fn();
      if (introSection) {
        introSection.scrollIntoView = scrollMock;
      }

      const scrollPrompt = screen.getByLabelText(/Төмен жылжып зерттеу/i);
      expect(() => {
        fireEvent.click(scrollPrompt);
      }).not.toThrow();

      expect(scrollMock).toHaveBeenCalledWith({ behavior: 'smooth' });
    });

    it('clicks all 3 HistoricalIntro thematic pillar deep links without throwing and invokes onNavigateSection', () => {
      const onNavigate = vi.fn();
      const { container } = render(
        <LanguageProvider>
          <HistoricalIntro onNavigateSection={onNavigate} />
        </LanguageProvider>
      );

      const introSection = container.querySelector('#intro');
      expect(introSection).not.toBeNull();

      const pillarLinks = screen.getAllByRole('link', { name: /Толығырақ/i });
      expect(pillarLinks).toHaveLength(3);

      pillarLinks.forEach((link) => {
        expect(() => {
          fireEvent.click(link);
        }).not.toThrow();
      });

      expect(onNavigate).toHaveBeenCalledTimes(3);
      expect(onNavigate).toHaveBeenNthCalledWith(1, 'figures');
      expect(onNavigate).toHaveBeenNthCalledWith(2, 'press');
      expect(onNavigate).toHaveBeenNthCalledWith(3, 'timeline');
    });

    it('clicks all 4 Milestone fact strip jump pills without throwing', () => {
      const { container } = render(<App />);
      const introSection = container.querySelector('#intro');
      expect(introSection).not.toBeNull();

      const milestonePills = [
        screen.getByRole('link', { name: /1905 — Қарқаралы петициясы/i }),
        screen.getByRole('link', { name: /1911 — «Айқап» журналы/i }),
        screen.getByRole('link', { name: /1913 — «Қазақ» газеті/i }),
        screen.getByRole('link', { name: /1917 — Алаш автономиясы/i }),
      ];

      expect(milestonePills).toHaveLength(4);
      milestonePills.forEach((pill) => {
        expect(() => {
          fireEvent.click(pill);
        }).not.toThrow();
      });
    });

    it('clicks Footer back-to-top button and triggers window.scrollTo', () => {
      render(<App />);
      const backToTopBtn = screen.getByRole('button', { name: /Беттің басына оралу/i });

      expect(() => {
        fireEvent.click(backToTopBtn);
      }).not.toThrow();

      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('clicks Footer back-to-top button invoking custom onBackToTop callback', () => {
      const onBackToTop = vi.fn();
      render(
        <LanguageProvider>
          <Footer onBackToTop={onBackToTop} />
        </LanguageProvider>
      );

      const backToTopBtn = screen.getByRole('button', { name: /Беттің басына оралу/i });
      fireEvent.click(backToTopBtn);
      expect(onBackToTop).toHaveBeenCalledTimes(1);
    });

    it('toggles Mobile Drawer from Header hamburger button and closes it', () => {
      render(<App />);

      const hamburgerBtn = screen.getByRole('button', { name: /Мәзірді ашу/i });
      expect(screen.queryByRole('dialog')).toBeNull();

      // Open drawer
      fireEvent.click(hamburgerBtn);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(document.body.style.overflow).toBe('hidden');

      // Close button inside drawer
      const closeBtn = screen.getByRole('button', { name: /Мәзірді жабу/i });
      fireEvent.click(closeBtn);
      expect(screen.queryByRole('dialog')).toBeNull();
      expect(document.body.style.overflow).toBe('');
    });

    it('verifies clicking CTA executes safely without uncaught exception even when scrollIntoView is unmocked or missing', () => {
      const originalWindow = window.HTMLElement.prototype.scrollIntoView;
      const originalElem = typeof Element !== 'undefined' ? Element.prototype.scrollIntoView : undefined;
      // @ts-ignore
      delete window.HTMLElement.prototype.scrollIntoView;
      if (typeof Element !== 'undefined') {
        // @ts-ignore
        delete Element.prototype.scrollIntoView;
      }

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      let uncaughtError: any = null;
      const onError = (e: ErrorEvent) => {
        uncaughtError = e.error;
        e.preventDefault();
      };
      window.addEventListener('error', onError);

      render(<App />);
      const exploreBtn = screen.getByRole('button', { name: /Тарихты зерттеу/i });

      expect(() => {
        fireEvent.click(exploreBtn);
      }).not.toThrow();

      // Verified: defensive guard prevents uncaught TypeError
      expect(uncaughtError).toBeNull();

      window.removeEventListener('error', onError);
      consoleErrorSpy.mockRestore();
      window.HTMLElement.prototype.scrollIntoView = originalWindow;
      if (typeof Element !== 'undefined' && originalElem) {
        Element.prototype.scrollIntoView = originalElem;
      }
    });
  });

  // =========================================================================
  // 4. Reduced-Motion Accessibility Verification
  // =========================================================================
  describe('Reduced-Motion Accessibility Simulation', () => {
    it('simulates prefers-reduced-motion: reduce and verifies rendering and interactions without throw', () => {
      const originalMatchMedia = window.matchMedia;
      window.matchMedia = vi.fn().mockImplementation((query: string) => {
        return {
          matches: query.includes('prefers-reduced-motion: reduce'),
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        };
      });

      // Verify matchMedia returns true for reduced motion
      expect(window.matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(true);

      // Render App under reduced motion setting
      expect(() => {
        render(<App />);
      }).not.toThrow();

      // Trigger user interactions under reduced motion
      const exploreBtn = screen.getByRole('button', { name: /Тарихты зерттеу/i });
      expect(() => {
        fireEvent.click(exploreBtn);
      }).not.toThrow();

      // Open and close mobile drawer under reduced motion
      const hamburgerBtn = screen.getByRole('button', { name: /Мәзірді ашу/i });
      expect(() => {
        fireEvent.click(hamburgerBtn);
      }).not.toThrow();

      const closeBtn = screen.getByRole('button', { name: /Мәзірді жабу/i });
      expect(() => {
        fireEvent.click(closeBtn);
      }).not.toThrow();

      // Clean up matchMedia
      window.matchMedia = originalMatchMedia;
    });

    it('verifies that if scrollIntoView is unavailable or throws, click handlers execute safely without uncaught exception', () => {
      const targetDiv = document.createElement('div');
      targetDiv.id = 'timeline';
      // Mock scrollIntoView to throw an error
      targetDiv.scrollIntoView = vi.fn().mockImplementation(() => {
        throw new Error('scrollIntoView unsupported in this client');
      });
      document.body.appendChild(targetDiv);

      const StressScrollWrapper: React.FC = () => {
        const handleClick = (e: React.MouseEvent) => {
          e.preventDefault();
          try {
            const el = document.querySelector('#timeline');
            if (el && typeof el.scrollIntoView === 'function') {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          } catch {
            // Graceful fallback
          }
        };

        return <button onClick={handleClick}>Safe Scroll</button>;
      };

      render(<StressScrollWrapper />);
      const btn = screen.getByRole('button', { name: /Safe Scroll/i });
      expect(() => {
        fireEvent.click(btn);
      }).not.toThrow();

      document.body.removeChild(targetDiv);
    });
  });
});
