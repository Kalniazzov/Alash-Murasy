import { render, screen, act, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '@/App';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';
import { useFavorites } from '@/hooks/useFavorites';
import { useMissionsProgress } from '@/hooks/useMissionsProgress';
import { kk } from '@/i18n/kk';
import { en } from '@/i18n/en';

// Helper component for testing language toggling and key fallbacks
const AdversarialLanguageProbe = () => {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="lang-val">{language}</span>
      <span data-testid="hero-title">{t('hero.title')}</span>
      <span data-testid="fallback-empty">{t('some.missing.key', '')}</span>
      <span data-testid="fallback-custom">{t('some.missing.key', 'Custom Fallback')}</span>
      <span data-testid="no-fallback-missing">{t('untranslated.dummy.key')}</span>
      <span data-testid="empty-key">{t('', 'default-empty')}</span>
      <button data-testid="toggle-en" onClick={() => setLanguage('en')}>Set EN</button>
      <button data-testid="toggle-kz" onClick={() => setLanguage('kz')}>Set KZ</button>
    </div>
  );
};

describe('Milestone 1 Adversarial & Stress Testing Suite', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = 'kk';
    document.body.style.overflow = '';
    vi.restoreAllMocks();
  });

  // =========================================================================
  // 1. RAPID LANGUAGE TOGGLING (Concurrency, Races, UI Stability)
  // =========================================================================
  describe('1. Rapid Language Toggling Stress', () => {
    it('survives 60 rapid alternating language switches without crash or state desync', async () => {
      const user = userEvent.setup();
      render(<App />);

      const kzBtn = screen.getByRole('button', { name: /^KZ$/i });
      const enBtn = screen.getByRole('button', { name: /^EN$/i });

      // Rapidly toggle back and forth 60 times
      for (let i = 0; i < 30; i++) {
        await user.click(enBtn);
        expect(document.documentElement.lang).toBe('en');
        await user.click(kzBtn);
        expect(document.documentElement.lang).toBe('kk');
      }

      // Final state must be firmly Kazakh
      expect(document.documentElement.lang).toBe('kk');
      expect(screen.getByRole('heading', { level: 1, name: /Ұлт оянған дәуір/i })).toBeInTheDocument();
      expect(window.localStorage.getItem('alash_language')).toBe('kz');

      // Now switch once more to EN to confirm full reactivity remains intact
      await user.click(enBtn);
      expect(document.documentElement.lang).toBe('en');
      expect(screen.getByRole('heading', { level: 1, name: /The Era of National Awakening/i })).toBeInTheDocument();
      expect(window.localStorage.getItem('alash_language')).toBe('en');
    });

    it('handles idempotent (repeated identical) language updates gracefully', () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      });

      // Initial state is 'kz'
      expect(result.current.language).toBe('kz');

      // Repeatedly set 'kz'
      act(() => {
        result.current.setLanguage('kz');
        result.current.setLanguage('kz');
        result.current.setLanguage('kz');
      });
      expect(result.current.language).toBe('kz');
      expect(document.documentElement.lang).toBe('kk');

      // Repeatedly set 'en'
      act(() => {
        result.current.setLanguage('en');
        result.current.setLanguage('en');
        result.current.setLanguage('en');
      });
      expect(result.current.language).toBe('en');
      expect(document.documentElement.lang).toBe('en');
    });

    it('ensures UI text across all sections synchronously updates during rapid toggle', async () => {
      const user = userEvent.setup();
      render(<App />);

      const enBtn = screen.getByRole('button', { name: /^EN$/i });
      const kzBtn = screen.getByRole('button', { name: /^KZ$/i });

      // Switch to EN
      await user.click(enBtn);

      // Verify Header, Hero, Intro, Downstream section anchors, and Footer are all in English
      expect(screen.getByRole('link', { name: /^Timeline$/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1, name: /The Era of National Awakening/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: /Kazakh Society at the Turn of the 20th Century/i })).toBeInTheDocument();
      expect(screen.getByText(/1905 — Qarqaraly Petition/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Central State Archive of the Republic of Kazakhstan/i)[0]).toBeInTheDocument();

      // Switch back to KZ
      await user.click(kzBtn);

      // Verify all revert to Kazakh
      expect(screen.getAllByRole('link', { name: /^Уақыт сызығы$/i })[0]).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1, name: /Ұлт оянған дәуір/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: /ХХ ғасыр басындағы қазақ қоғамы/i })).toBeInTheDocument();
      expect(screen.getByText(/1905 — Қарқаралы петициясы/i)).toBeInTheDocument();
      expect(screen.getAllByText(/ҚР Орталық мемлекеттік архиві/i)[0]).toBeInTheDocument();
    });
  });

  // =========================================================================
  // 2. LOCALSTORAGE ROBUSTNESS (Corrupted, Empty, Quota Exceeded, Blocked)
  // =========================================================================
  describe('2. LocalStorage Robustness & Adversarial States', () => {
    it('survives empty/null localStorage across all hooks and App without error', () => {
      window.localStorage.clear();

      const { result: langHook } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      });
      expect(langHook.current.language).toBe('kz');

      const { result: favHook } = renderHook(() => useFavorites());
      expect(favHook.current.favorites).toEqual({ figures: [], documents: [] });
      expect(favHook.current.totalFavoritesCount).toBe(0);

      const { result: missionHook } = renderHook(() => useMissionsProgress());
      expect(missionHook.current.progress).toEqual({ completedMissions: [], badges: [], totalPoints: 0 });

      // Entire App must mount cleanly
      expect(() => render(<App />)).not.toThrow();
    });

    it('gracefully handles severely corrupted localStorage data in LanguageContext', () => {
      const corruptedValues = [
        '{ malformed json !!!',
        'undefined',
        'null',
        '12345',
        'true',
        'fr',
        'ru',
        'KZ', // uppercase shouldn't break, safely defaults to kz
        'EN',
        '__proto__',
        '[object Object]',
      ];

      corruptedValues.forEach((badVal) => {
        window.localStorage.setItem('alash_language', badVal);

        const { result } = renderHook(() => useLanguage(), {
          wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
        });

        // Corrupted value must safely fallback to 'kz'
        expect(result.current.language).toBe('kz');
      });
    });

    it('gracefully handles severely corrupted localStorage data in useFavorites', () => {
      const corruptedJSONs = [
        'not valid json',
        'null',
        '123',
        '"just a string"',
        '[]', // array instead of object
        '{"figures": "not-an-array", "documents": []}',
        '{"figures": [], "documents": null}',
        '{"figures": null, "documents": null}',
        '{"figures": 42}',
      ];

      corruptedJSONs.forEach((badJSON) => {
        window.localStorage.setItem('alash_favorites', badJSON);

        const { result } = renderHook(() => useFavorites());
        expect(result.current.favorites).toEqual({ figures: [], documents: [] });
        expect(result.current.totalFavoritesCount).toBe(0);

        // Toggling still functions safely
        act(() => {
          result.current.toggleFavorite('figure', 'bokeikhan');
        });
        expect(result.current.isFavorite('figure', 'bokeikhan')).toBe(true);
        expect(result.current.totalFavoritesCount).toBe(1);
      });
    });

    it('gracefully handles severely corrupted localStorage data in useMissionsProgress', () => {
      const corruptedProgress = [
        'invalid syntax {',
        'null',
        'true',
        '{"completedMissions": "not-array"}',
        '{"completedMissions": [], "badges": "not-array", "totalPoints": 0}',
        '{"completedMissions": [], "badges": [], "totalPoints": "string"}',
        '{"completedMissions": null, "badges": null, "totalPoints": null}',
      ];

      corruptedProgress.forEach((badJSON) => {
        window.localStorage.setItem('alash_progress', badJSON);

        const { result } = renderHook(() => useMissionsProgress());
        expect(result.current.progress).toEqual({
          completedMissions: [],
          badges: [],
          totalPoints: 0,
        });

        // Complete mission still functions safely
        act(() => {
          result.current.completeMission(1, 'badge_1', 15);
        });
        expect(result.current.isMissionCompleted(1)).toBe(true);
        expect(result.current.hasBadge('badge_1')).toBe(true);
        expect(result.current.progress.totalPoints).toBe(15);
      });
    });

    it('handles QuotaExceededError in LanguageContext without crashing', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Simulate browser QuotaExceededError when saving language
      vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
        const error = new DOMException('The quota has been exceeded.', 'QuotaExceededError');
        throw error;
      });

      const enBtn = screen.getByRole('button', { name: /^EN$/i });

      // Clicking EN should not throw an uncaught exception
      await expect(user.click(enBtn)).resolves.not.toThrow();

      // In-memory state and html lang should still update successfully
      expect(document.documentElement.lang).toBe('en');
      expect(screen.getByRole('heading', { level: 1, name: /The Era of National Awakening/i })).toBeInTheDocument();
    });

    it('handles QuotaExceededError in useFavorites and useMissionsProgress without crashing', () => {
      vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
        throw new DOMException('QuotaExceededError', 'QuotaExceededError');
      });

      const { result: favHook } = renderHook(() => useFavorites());
      act(() => {
        favHook.current.toggleFavorite('figure', 'baitursynuly');
      });
      // In-memory state must still register the favorite
      expect(favHook.current.isFavorite('figure', 'baitursynuly')).toBe(true);

      const { result: missionHook } = renderHook(() => useMissionsProgress());
      act(() => {
        missionHook.current.completeMission(2, 'badge_chronology', 20);
      });
      // In-memory state must still record progress
      expect(missionHook.current.isMissionCompleted(2)).toBe(true);
      expect(missionHook.current.progress.totalPoints).toBe(20);
    });

    it('operates safely when localStorage is completely blocked (SecurityError / private mode)', () => {
      vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
        throw new DOMException('The operation is insecure.', 'SecurityError');
      });
      vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
        throw new DOMException('The operation is insecure.', 'SecurityError');
      });

      // App mount test
      expect(() => render(<App />)).not.toThrow();

      // Language hook test
      const { result: langHook } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      });
      expect(langHook.current.language).toBe('kz');

      act(() => {
        langHook.current.setLanguage('en');
      });
      expect(langHook.current.language).toBe('en');
    });

    it('mounts App cleanly with all localStorage keys simultaneously corrupted', () => {
      window.localStorage.setItem('alash_language', '<<<corrupted>>>');
      window.localStorage.setItem('alash_favorites', '{"figures": null');
      window.localStorage.setItem('alash_progress', 'invalid!!!');

      expect(() => render(<App />)).not.toThrow();
      expect(screen.getByRole('heading', { level: 1, name: /Ұлт оянған дәуір/i })).toBeInTheDocument();
    });
  });

  // =========================================================================
  // 3. TRANSLATION KEY FALLBACKS & DICTIONARY RIGOR
  // =========================================================================
  describe('3. Translation Key Fallbacks & Dictionary Rigor', () => {
    it('returns provided fallback when key is not found in either dictionary', () => {
      render(
        <LanguageProvider>
          <AdversarialLanguageProbe />
        </LanguageProvider>
      );

      expect(screen.getByTestId('fallback-custom')).toHaveTextContent('Custom Fallback');
    });

    it('returns empty string fallback when fallback is explicitly empty string', () => {
      render(
        <LanguageProvider>
          <AdversarialLanguageProbe />
        </LanguageProvider>
      );

      // t('some.missing.key', '') should return '' rather than key name
      expect(screen.getByTestId('fallback-empty')).toHaveTextContent('');
    });

    it('returns the raw key when translation is missing and no fallback is specified', () => {
      render(
        <LanguageProvider>
          <AdversarialLanguageProbe />
        </LanguageProvider>
      );

      expect(screen.getByTestId('no-fallback-missing')).toHaveTextContent('untranslated.dummy.key');
    });

    it('handles empty string key without throwing', () => {
      render(
        <LanguageProvider>
          <AdversarialLanguageProbe />
        </LanguageProvider>
      );

      expect(screen.getByTestId('empty-key')).toHaveTextContent('default-empty');
    });

    it('guarantees complete key symmetry between Kazakh (kk) and English (en) dictionaries', () => {
      const kkKeys = Object.keys(kk).sort();
      const enKeys = Object.keys(en).sort();

      // Count equality
      expect(kkKeys.length).toBeGreaterThan(40);
      expect(kkKeys.length).toBe(enKeys.length);

      // Strict parity check
      expect(kkKeys).toEqual(enKeys);

      // Ensure no empty or whitespace-only translation strings exist
      kkKeys.forEach((key) => {
        const kzVal = (kk as Record<string, string>)[key];
        const enVal = (en as Record<string, string>)[key];

        expect(typeof kzVal).toBe('string');
        expect(typeof enVal).toBe('string');
        expect(kzVal.trim().length).toBeGreaterThan(0);
        expect(enVal.trim().length).toBeGreaterThan(0);
      });
    });

    it('falls back to Kazakh translation if an entry is missing in the English dictionary', () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      });

      // Switch to English
      act(() => {
        result.current.setLanguage('en');
      });
      expect(result.current.language).toBe('en');

      // 'brand.title' exists in both
      expect(result.current.t('brand.title')).toBe('ALASH HERITAGE');

      // Test with a key present only in kk
      // To test this fallback empirically:
      const testKey = 'test.kz.only.key';
      (kk as Record<string, string>)[testKey] = 'Қазақша түпнұсқа';

      expect(result.current.t(testKey)).toBe('Қазақша түпнұсқа');

      // Clean up injected test key
      delete (kk as Record<string, string>)[testKey];
    });
  });

  // =========================================================================
  // 4. ACCESSIBILITY & UI RESILIENCE
  // =========================================================================
  describe('4. Accessibility, Viewport & UI Resilience', () => {
    it('restores body overflow lock cleanly when mobile drawer is closed via button or escape key', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Initially body overflow is normal
      expect(document.body.style.overflow).toBe('');

      // Open mobile drawer
      const openMenuBtn = screen.getByLabelText(/Мәзірді ашу/i);
      await user.click(openMenuBtn);

      // Drawer is open -> body overflow must be hidden
      expect(document.body.style.overflow).toBe('hidden');

      // Press Escape to close
      await user.keyboard('{Escape}');

      // Overflow must be restored
      expect(document.body.style.overflow).toBe('');
    });

    it('handles smooth scroll anchors safely when target element does not exist in DOM', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Click a nav link
      const timelineLink = screen.getAllByRole('link', { name: /Уақыт сызығы/i })[0];
      await expect(user.click(timelineLink)).resolves.not.toThrow();
    });
  });
});
