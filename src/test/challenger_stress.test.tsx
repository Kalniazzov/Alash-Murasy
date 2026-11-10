import { render, screen, act, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '@/App';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';
import { useFavorites } from '@/hooks/useFavorites';
import { useMissionsProgress } from '@/hooks/useMissionsProgress';

describe('Challenger Empirical Stress & Concurrency Suite', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = 'kk';
    document.body.style.overflow = '';
    vi.restoreAllMocks();
  });

  // =========================================================================
  // 1. RAPID LANGUAGE TOGGLING STRESS & BOUNDARIES
  // =========================================================================
  describe('1. Ultra-Rapid Language Toggling and Edge Cases', () => {
    it('survives 100 rapid toggles and maintains synchronization between state, DOM, and localStorage', async () => {
      const user = userEvent.setup();
      render(<App />);

      const kzBtn = screen.getByRole('button', { name: /^KZ$/i });
      const enBtn = screen.getByRole('button', { name: /^EN$/i });

      for (let i = 0; i < 50; i++) {
        await user.click(enBtn);
        expect(document.documentElement.lang).toBe('en');
        await user.click(kzBtn);
        expect(document.documentElement.lang).toBe('kk');
      }

      expect(window.localStorage.getItem('alash_language')).toBe('kz');
      expect(document.documentElement.lang).toBe('kk');
      expect(screen.getByRole('heading', { level: 1, name: /Ұлт оянған дәуір/i })).toBeInTheDocument();
    });

    it('handles Kazakh special characters and glyphs across translations', () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      });

      // Special Kazakh glyphs: ә, ғ, қ, ң, ө, ұ, ү, һ, і
      const sampleKzText = result.current.t('hero.title');
      expect(sampleKzText).toContain('Ұлт');
      expect(sampleKzText).toContain('дәуір');
    });
  });

  // =========================================================================
  // 2. CORRUPTED LOCALSTORAGE INJECTIONS & RECOVERY
  // =========================================================================
  describe('2. Corrupted LocalStorage Injections and Recovery', () => {
    it('recovers when localStorage has corrupted JSON injected while running and storage event fires', () => {
      const { result: favHook } = renderHook(() => useFavorites());
      const { result: missionHook } = renderHook(() => useMissionsProgress());

      // Normal initial state
      expect(favHook.current.favorites).toEqual({ figures: [], documents: [] });
      expect(missionHook.current.progress).toEqual({ completedMissions: [], badges: [], totalPoints: 0 });

      // Inject corrupted JSON into localStorage
      window.localStorage.setItem('alash_favorites', 'CORRUPTED_JSON_<{}>');
      window.localStorage.setItem('alash_progress', 'CORRUPTED_PROGRESS_!@#$%');

      // Dispatch storage events simulating another tab writing bad data
      act(() => {
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: 'alash_favorites',
            newValue: 'CORRUPTED_JSON_<{}>',
          })
        );
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: 'alash_progress',
            newValue: 'CORRUPTED_PROGRESS_!@#$%',
          })
        );
      });

      // Hooks should not throw and should safely reset to clean empty state
      expect(favHook.current.favorites).toEqual({ figures: [], documents: [] });
      expect(missionHook.current.progress).toEqual({ completedMissions: [], badges: [], totalPoints: 0 });

      // Should still be able to operate normally
      act(() => {
        favHook.current.toggleFavorite('figure', 'bokeikhanov');
        missionHook.current.completeMission(1, 'badge_1', 10);
      });

      expect(favHook.current.isFavorite('figure', 'bokeikhanov')).toBe(true);
      expect(missionHook.current.isMissionCompleted(1)).toBe(true);
    });

    it('handles localStorage.clear() in another tab (StorageEvent with null newValue)', () => {
      const { result } = renderHook(() => useFavorites());

      act(() => {
        result.current.toggleFavorite('figure', 'bokeikhanov');
      });
      expect(result.current.isFavorite('figure', 'bokeikhanov')).toBe(true);

      // Simulate storage clear in another tab
      window.localStorage.clear();
      act(() => {
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: 'alash_favorites',
            newValue: null,
          })
        );
      });

      expect(result.current.favorites).toEqual({ figures: [], documents: [] });
      expect(result.current.totalFavoritesCount).toBe(0);
    });

    it('survives malicious prototype pollution payload in localStorage', () => {
      const evilPayload = JSON.stringify({
        "__proto__": { "polluted": true },
        "figures": ["fig_1"],
        "documents": []
      });
      window.localStorage.setItem('alash_favorites', evilPayload);

      const { result } = renderHook(() => useFavorites());
      expect(result.current.favorites.figures).toEqual(["fig_1"]);
      expect((Object.prototype as any).polluted).toBeUndefined();
    });
  });

  // =========================================================================
  // 3. STORAGE CONCURRENCY & BATCH STATE DROPPING
  // =========================================================================
  describe('3. Storage Concurrency and Batch Operations', () => {
    it('verifies whether sequential toggleFavorite calls in the same tick drop state', () => {
      const { result } = renderHook(() => useFavorites());

      act(() => {
        result.current.toggleFavorite('figure', 'fig_1');
        result.current.toggleFavorite('figure', 'fig_2');
      });

      // Does it have both or did it drop fig_1?
      console.log('Resulting favorites after two toggles in same tick:', result.current.favorites);
      expect(result.current.favorites.figures).toContain('fig_1');
      expect(result.current.favorites.figures).toContain('fig_2');
    });

    it('verifies whether sequential toggleFavorite on different categories drops state', () => {
      const { result } = renderHook(() => useFavorites());

      act(() => {
        result.current.toggleFavorite('figure', 'fig_1');
        result.current.toggleFavorite('document', 'doc_1');
      });

      console.log('Resulting favorites after figure + doc toggle:', result.current.favorites);
      expect(result.current.favorites.figures).toContain('fig_1');
      expect(result.current.favorites.documents).toContain('doc_1');
    });

    it('verifies whether sequential completeMission calls in the same tick drop state', () => {
      const { result } = renderHook(() => useMissionsProgress());

      act(() => {
        result.current.completeMission(1, 'badge_1', 10);
        result.current.completeMission(2, 'badge_2', 15);
      });

      console.log('Resulting progress after two completions:', result.current.progress);
      expect(result.current.progress.completedMissions).toContain(1);
      expect(result.current.progress.completedMissions).toContain(2);
      expect(result.current.progress.badges).toContain('badge_1');
      expect(result.current.progress.badges).toContain('badge_2');
      expect(result.current.progress.totalPoints).toBe(25);
    });

    it('verifies whether concurrent toggleFavorite calls from two distinct hook instances drop state', () => {
      const { result: hookA } = renderHook(() => useFavorites());
      const { result: hookB } = renderHook(() => useFavorites());

      act(() => {
        hookA.current.toggleFavorite('figure', 'fig_A');
        hookB.current.toggleFavorite('figure', 'fig_B');
      });

      console.log('Resulting favorites after concurrent multi-instance toggles:', hookA.current.favorites);
      expect(hookA.current.favorites.figures).toContain('fig_A');
      expect(hookA.current.favorites.figures).toContain('fig_B');
    });

    it('verifies sync between two instances of useFavorites within the same window when spaced', () => {
      const { result: instanceA } = renderHook(() => useFavorites());
      const { result: instanceB } = renderHook(() => useFavorites());

      act(() => {
        instanceA.current.toggleFavorite('figure', 'fig_alpha');
      });

      expect(instanceA.current.isFavorite('figure', 'fig_alpha')).toBe(true);
      expect(instanceB.current.isFavorite('figure', 'fig_alpha')).toBe(true);

      act(() => {
        instanceB.current.toggleFavorite('document', 'doc_beta');
      });

      expect(instanceA.current.isFavorite('document', 'doc_beta')).toBe(true);
      expect(instanceB.current.isFavorite('document', 'doc_beta')).toBe(true);
      expect(instanceA.current.totalFavoritesCount).toBe(2);
      expect(instanceB.current.totalFavoritesCount).toBe(2);
    });

    it('verifies multi-instance synchronization when localStorage.setItem throws QuotaExceededError', () => {
      const { result: instanceA } = renderHook(() => useFavorites());
      const { result: instanceB } = renderHook(() => useFavorites());

      // Mock setItem to throw QuotaExceededError
      vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
        throw new DOMException('QuotaExceededError', 'QuotaExceededError');
      });

      act(() => {
        instanceA.current.toggleFavorite('figure', 'fig_quota_test');
      });

      // Instance A has it in-memory
      expect(instanceA.current.isFavorite('figure', 'fig_quota_test')).toBe(true);

      // Does Instance B get notified via dispatchEvent when setItem throws?
      // Since window.dispatchEvent is placed AFTER localStorage.setItem inside try block,
      // it fails to notify Instance B!
      expect(instanceB.current.isFavorite('figure', 'fig_quota_test')).toBe(true);
    });

  });
});
