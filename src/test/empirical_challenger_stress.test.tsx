import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '@/App';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { Header } from '@/components/layout/Header';
import { MobileDrawer } from '@/components/layout/MobileDrawer';
import { Hero } from '@/components/sections/Hero';
import { HistoricalIntro } from '@/components/sections/HistoricalIntro';
import { Footer } from '@/components/layout/Footer';

describe('EMPIRICAL CHALLENGER: Stress & Resilience Test Suite', () => {
  let uncaughtErrors: Error[] = [];
  let unhandledRejections: any[] = [];
  const errorHandler = (event: ErrorEvent) => {
    uncaughtErrors.push(event.error || new Error(event.message));
  };
  const rejectionHandler = (event: PromiseRejectionEvent) => {
    unhandledRejections.push(event.reason);
  };

  beforeEach(() => {
    uncaughtErrors = [];
    unhandledRejections = [];
    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', rejectionHandler);
    document.body.style.overflow = '';
  });

  afterEach(() => {
    window.removeEventListener('error', errorHandler);
    window.removeEventListener('unhandledrejection', rejectionHandler);
    expect(uncaughtErrors).toEqual([]);
    expect(unhandledRejections).toEqual([]);
  });

  // =========================================================================
  // Dimension 1: Adversarial Stress Cycles (All Anchors & Buttons in KZ & EN)
  // =========================================================================
  describe('Dimension 1: Adversarial Stress Cycles on All Anchors and Buttons', () => {
    it('exhaustively clicks all anchors and buttons in Kazakh mode without uncaught errors', () => {
      const { container } = render(<App />);

      // Find all interactive elements (buttons, links)
      const buttons = container.querySelectorAll('button');
      const links = container.querySelectorAll('a');

      expect(buttons.length).toBeGreaterThan(0);
      expect(links.length).toBeGreaterThan(0);

      // Click all buttons
      buttons.forEach((btn) => {
        expect(() => fireEvent.click(btn)).not.toThrow();
      });

      // Click all links
      links.forEach((link) => {
        expect(() => fireEvent.click(link)).not.toThrow();
      });
    });

    it('exhaustively clicks all anchors and buttons in English mode without uncaught errors', () => {
      const { container } = render(<App />);

      // Switch to English
      const enBtn = screen.getByRole('button', { name: /^EN$/i });
      fireEvent.click(enBtn);
      expect(document.documentElement.lang).toBe('en');

      const buttons = container.querySelectorAll('button');
      const links = container.querySelectorAll('a');

      expect(buttons.length).toBeGreaterThan(0);
      expect(links.length).toBeGreaterThan(0);

      // Click all buttons in English mode
      buttons.forEach((btn) => {
        expect(() => fireEvent.click(btn)).not.toThrow();
      });

      // Click all links in English mode
      links.forEach((link) => {
        expect(() => fireEvent.click(link)).not.toThrow();
      });
    });

    it('survives 30 adversarial language toggle + interaction cycles in rapid succession', () => {
      const { container } = render(<App />);

      for (let cycle = 0; cycle < 30; cycle++) {
        // Find language buttons
        const isKzTurn = cycle % 2 === 0;
        const targetLangBtn = isKzTurn
          ? screen.getByRole('button', { name: /^KZ$/i })
          : screen.getByRole('button', { name: /^EN$/i });

        fireEvent.click(targetLangBtn);

        // Click all navigation links in Header
        const navLinks = container.querySelectorAll('header nav a');
        navLinks.forEach((link) => {
          fireEvent.click(link);
        });

        // Click Hero CTAs
        const exploreBtn = container.querySelector('#hero a[href="#timeline"]');
        const missionBtn = container.querySelector('#hero a[href="#missions"]');
        if (exploreBtn) fireEvent.click(exploreBtn);
        if (missionBtn) fireEvent.click(missionBtn);

        // Click Mobile Hamburger toggle
        const hamburger = container.querySelector('button[aria-label*="мәзір" i], button[aria-label*="menu" i]');
        if (hamburger) {
          fireEvent.click(hamburger);

          // If drawer opened, click close button or links inside
          const closeBtn = container.querySelector('button[aria-label*="жабу" i], button[aria-label*="close" i]');
          if (closeBtn) {
            fireEvent.click(closeBtn);
          }
        }
      }
    });

    it('survives rapid multi-click bombardment on all interactive elements in DOM simultaneously', () => {
      const { container } = render(<App />);
      const allClickables = Array.from(container.querySelectorAll('button, a'));

      // Bombard each element with 5 consecutive rapid clicks
      for (let i = 0; i < 5; i++) {
        allClickables.forEach((el) => {
          fireEvent.click(el);
        });
      }
    });
  });

  // =========================================================================
  // Dimension 2: Scroll Handlers & Target Resilience
  // =========================================================================
  describe('Dimension 2: Scroll Handlers, Edge Cases & DOM Target Missing Resilience', () => {
    it('safely handles navigation click when target anchor element is absent from DOM', () => {
      render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );

      // Synthesize click on an anchor targeting a non-existent element
      const dummyLink = document.createElement('a');
      dummyLink.href = '#non-existent-section-999';
      document.body.appendChild(dummyLink);

      // Header handleNavClick with missing target
      const navItem = screen.getByRole('link', { name: /Уақыт сызығы/i });
      // Temporarily remove #timeline from DOM if present
      const existingTimeline = document.getElementById('timeline');
      if (existingTimeline) existingTimeline.remove();

      expect(() => {
        fireEvent.click(navItem);
      }).not.toThrow();

      dummyLink.remove();
    });

    it('safely handles navigation click when scrollIntoView is completely missing or null', () => {
      const origScroll = Element.prototype.scrollIntoView;
      const origHtmlScroll = window.HTMLElement.prototype.scrollIntoView;

      // Delete scrollIntoView
      // @ts-ignore
      delete Element.prototype.scrollIntoView;
      // @ts-ignore
      delete window.HTMLElement.prototype.scrollIntoView;

      const { container } = render(<App />);

      const allLinks = container.querySelectorAll('a[href^="#"]');
      expect(allLinks.length).toBeGreaterThan(0);

      allLinks.forEach((link) => {
        expect(() => fireEvent.click(link)).not.toThrow();
      });

      // Restore
      Element.prototype.scrollIntoView = origScroll;
      window.HTMLElement.prototype.scrollIntoView = origHtmlScroll;
    });

    it('safely handles smooth scroll when smooth scroll parameter throws (legacy fallback)', () => {
      const origElem = Element.prototype.scrollIntoView;
      const origHtml = window.HTMLElement.prototype.scrollIntoView;
      let fallbackCalled = false;

      // Simulate browser that rejects { behavior: 'smooth' } but accepts parameterless call
      const mockFn = vi.fn().mockImplementation((args?: any) => {
        if (args && typeof args === 'object' && args.behavior) {
          throw new TypeError('Invalid options dictionary parameter');
        }
        fallbackCalled = true;
      });

      Element.prototype.scrollIntoView = mockFn;
      if (typeof window !== 'undefined' && window.HTMLElement) {
        window.HTMLElement.prototype.scrollIntoView = mockFn;
      }

      const { container } = render(<App />);
      const timelineLink = container.querySelector('a[href="#timeline"]');
      expect(timelineLink).not.toBeNull();

      if (timelineLink) {
        expect(() => fireEvent.click(timelineLink)).not.toThrow();
        expect(fallbackCalled).toBe(true);
      }

      Element.prototype.scrollIntoView = origElem;
      if (typeof window !== 'undefined' && window.HTMLElement) {
        window.HTMLElement.prototype.scrollIntoView = origHtml;
      }
    });

    it('safely handles Footer scroll to top when window.scrollTo is undefined or throws', () => {
      const origScrollTo = window.scrollTo;
      // @ts-ignore
      delete window.scrollTo;

      render(
        <LanguageProvider>
          <Footer />
        </LanguageProvider>
      );

      const backToTopBtn = screen.getByRole('button', { name: /Беттің басына оралу|Scroll to top/i });
      expect(() => fireEvent.click(backToTopBtn)).not.toThrow();

      // Simulate throwing scrollTo
      window.scrollTo = vi.fn().mockImplementation(() => {
        throw new Error('scrollTo hardware exception');
      });

      // Custom onBackToTop override handles safely
      const mockCustomScroll = vi.fn();
      const { unmount } = render(
        <LanguageProvider>
          <Footer onBackToTop={mockCustomScroll} />
        </LanguageProvider>
      );
      const customBtn = screen.getAllByRole('button', { name: /Беттің басына оралу|Scroll to top/i })[1];
      fireEvent.click(customBtn);
      expect(mockCustomScroll).toHaveBeenCalledTimes(1);

      unmount();
      window.scrollTo = origScrollTo;
    });

    it('safely handles HistoricalIntro and Hero with custom navigation callbacks', () => {
      const onNavigate = vi.fn();
      const onExplore = vi.fn();
      const onMission = vi.fn();

      render(
        <LanguageProvider>
          <Hero onExploreClick={onExplore} onMissionClick={onMission} />
          <HistoricalIntro onNavigateSection={onNavigate} />
        </LanguageProvider>
      );

      const exploreBtn = screen.getByRole('button', { name: /Тарихты зерттеу/i });
      const missionBtn = screen.getByRole('button', { name: /Тарихи миссияны бастау/i });
      fireEvent.click(exploreBtn);
      fireEvent.click(missionBtn);

      expect(onExplore).toHaveBeenCalledTimes(1);
      expect(onMission).toHaveBeenCalledTimes(1);

      const moreDetailsLinks = screen.getAllByRole('link', { name: /Толығырақ/i });
      fireEvent.click(moreDetailsLinks[0]);
      expect(onNavigate).toHaveBeenCalledWith('figures');
    });
  });

  // =========================================================================
  // Dimension 3: Zero Memory Leaks & Zero Dangling Event Listeners
  // =========================================================================
  describe('Dimension 3: Listener Lifecycle Accounting (Zero Dangling Listeners)', () => {
    it('verifies exact 1:1 add/remove balance of window event listeners on App mount/unmount', () => {
      type ListenerRecord = {
        type: string;
        listener: EventListenerOrEventListenerObject;
      };

      const activeListeners: ListenerRecord[] = [];

      const origAdd = window.addEventListener.bind(window);
      const origRemove = window.removeEventListener.bind(window);

      const addSpy = vi.spyOn(window, 'addEventListener').mockImplementation((type, listener, options) => {
        activeListeners.push({ type, listener: listener as any });
        return origAdd(type, listener, options);
      });

      const removeSpy = vi.spyOn(window, 'removeEventListener').mockImplementation((type, listener, options) => {
        const idx = activeListeners.findIndex(
          (rec) => rec.type === type && rec.listener === listener
        );
        if (idx !== -1) {
          activeListeners.splice(idx, 1);
        }
        return origRemove(type, listener, options);
      });

      // Mount App
      const { unmount } = render(<App />);

      // At mount, Header adds 'scroll', useFavorites adds 'storage' and 'alash_favorites_updated'
      expect(activeListeners.some((l) => l.type === 'scroll')).toBe(true);
      expect(activeListeners.some((l) => l.type === 'storage')).toBe(true);
      expect(activeListeners.some((l) => l.type === 'alash_favorites_updated')).toBe(true);

      const initialCount = activeListeners.length;
      expect(initialCount).toBeGreaterThanOrEqual(3);

      // Unmount App
      unmount();

      // Assert that all App-level listeners were cleanly unregistered
      const remainingAppListeners = activeListeners.filter(
        (l) =>
          l.type === 'scroll' ||
          l.type === 'storage' ||
          l.type === 'alash_favorites_updated' ||
          l.type === 'keydown'
      );

      expect(remainingAppListeners).toEqual([]);

      addSpy.mockRestore();
      removeSpy.mockRestore();
    });

    it('verifies MobileDrawer listener lifecycle cleanly unregisters upon unmount', () => {
      let keydownListenerCount = 0;
      const origAdd = window.addEventListener.bind(window);
      const origRemove = window.removeEventListener.bind(window);

      const addSpy = vi.spyOn(window, 'addEventListener').mockImplementation((type, listener, options) => {
        if (type === 'keydown') keydownListenerCount++;
        return origAdd(type, listener, options);
      });

      const removeSpy = vi.spyOn(window, 'removeEventListener').mockImplementation((type, listener, options) => {
        if (type === 'keydown') keydownListenerCount--;
        return origRemove(type, listener, options);
      });

      // Render closed drawer
      const { rerender, unmount } = render(
        <LanguageProvider>
          <MobileDrawer isOpen={false} onClose={vi.fn()} />
        </LanguageProvider>
      );
      // When closed, zero keydown listeners should be attached to window
      expect(keydownListenerCount).toBe(0);

      // Open drawer
      rerender(
        <LanguageProvider>
          <MobileDrawer isOpen={true} onClose={vi.fn()} />
        </LanguageProvider>
      );
      expect(keydownListenerCount).toBe(1);

      // Unmount drawer
      unmount();
      // Verified: clean unmount leaves 0 dangling listeners
      expect(keydownListenerCount).toBe(0);

      addSpy.mockRestore();
      removeSpy.mockRestore();
    });

    it('survives 25 rapid mount/unmount cycles without listener leakage', () => {
      let scrollListenerCount = 0;
      let storageListenerCount = 0;
      const origAdd = window.addEventListener.bind(window);
      const origRemove = window.removeEventListener.bind(window);

      const addSpy = vi.spyOn(window, 'addEventListener').mockImplementation((type, listener, options) => {
        if (type === 'scroll') scrollListenerCount++;
        if (type === 'storage') storageListenerCount++;
        return origAdd(type, listener, options);
      });

      const removeSpy = vi.spyOn(window, 'removeEventListener').mockImplementation((type, listener, options) => {
        if (type === 'scroll') scrollListenerCount--;
        if (type === 'storage') storageListenerCount--;
        return origRemove(type, listener, options);
      });

      for (let i = 0; i < 25; i++) {
        const { unmount } = render(<App />);
        unmount();
      }

      expect(scrollListenerCount).toBe(0);
      expect(storageListenerCount).toBe(0);

      addSpy.mockRestore();
      removeSpy.mockRestore();
    });
  });

  // =========================================================================
  // Dimension 4: Window Scroll & Resize Fuzzing
  // =========================================================================
  describe('Dimension 4: Window Scroll & Resize Event Stress', () => {
    it('dispatches 100 rapid scroll events and verifies Header transition logic is stable', () => {
      const { container } = render(<App />);
      const header = container.querySelector('#header');
      expect(header).not.toBeNull();

      act(() => {
        for (let i = 0; i < 100; i++) {
          Object.defineProperty(window, 'scrollY', { value: i % 2 === 0 ? 0 : 150, writable: true });
          window.dispatchEvent(new Event('scroll'));
        }
      });

      // Final state with scrollY = 0
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
        window.dispatchEvent(new Event('scroll'));
      });

      expect(header).toHaveClass('py-4');
    });

    it('dispatches resize events with varying window innerWidth/innerHeight without errors', () => {
      render(<App />);

      act(() => {
        const widths = [320, 375, 414, 768, 1024, 1280, 1920];
        widths.forEach((w) => {
          Object.defineProperty(window, 'innerWidth', { value: w, writable: true });
          window.dispatchEvent(new Event('resize'));
        });
      });
    });
  });
});
