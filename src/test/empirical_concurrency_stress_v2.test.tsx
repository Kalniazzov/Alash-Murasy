import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFavorites, isValidFavoritesState, FavoritesState } from '@/hooks/useFavorites';
import { useMissionsProgress, isValidProgressState, MissionsProgressState } from '@/hooks/useMissionsProgress';

describe('Challenger M1 IT4 Adversarial Hardening Verification', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  // =========================================================================
  // DIMENSION 1: N >= 10 Multi-Instance Same-Tick Concurrency Stress
  // =========================================================================
  describe('Dimension 1: Multi-Instance Same-Tick Concurrency (N = 10 & N = 20)', () => {
    it('preserves all updates across N = 10 distinct instances mutating in same tick', () => {
      const N = 10;
      const hooks = Array.from({ length: N }, () => renderHook(() => useFavorites()));

      act(() => {
        for (let i = 0; i < N; i++) {
          hooks[i].result.current.toggleFavorite('figure', `fig_stress_${i}`);
        }
      });

      const raw = window.localStorage.getItem('alash_favorites');
      const parsed: FavoritesState = JSON.parse(raw || '{}');

      expect(parsed.figures.length).toBe(N);
      for (let i = 0; i < N; i++) {
        expect(parsed.figures).toContain(`fig_stress_${i}`);
        expect(hooks[i].result.current.isFavorite('figure', `fig_stress_${i}`)).toBe(true);
        expect(hooks[i].result.current.totalFavoritesCount).toBe(N);
      }
    });

    it('preserves all updates across N = 20 distinct instances with interleaved figures & documents', () => {
      const N = 20;
      const hooks = Array.from({ length: N }, () => renderHook(() => useFavorites()));

      act(() => {
        for (let i = 0; i < N; i++) {
          if (i % 2 === 0) {
            hooks[i].result.current.toggleFavorite('figure', `fig_${i}`);
          } else {
            hooks[i].result.current.toggleFavorite('document', `doc_${i}`);
          }
        }
      });

      const raw = window.localStorage.getItem('alash_favorites');
      const parsed: FavoritesState = JSON.parse(raw || '{}');

      expect(parsed.figures.length).toBe(10);
      expect(parsed.documents.length).toBe(10);
      for (let i = 0; i < N; i++) {
        expect(hooks[i].result.current.totalFavoritesCount).toBe(20);
      }
    });

    it('prevents duplicate point accrual when N = 5 instances simultaneously complete the same mission', () => {
      const N = 5;
      const hooks = Array.from({ length: N }, () => renderHook(() => useMissionsProgress()));

      act(() => {
        for (let i = 0; i < N; i++) {
          // All 5 instances try to complete mission 1 with 15 points
          hooks[i].result.current.completeMission(1, 'badge_equal', 15);
        }
      });

      const raw = window.localStorage.getItem('alash_progress');
      const parsed: MissionsProgressState = JSON.parse(raw || '{}');

      expect(parsed.completedMissions).toEqual([1]);
      expect(parsed.badges).toEqual(['badge_equal']);
      expect(parsed.totalPoints).toBe(15); // Exactly 15, NOT 75!

      for (let i = 0; i < N; i++) {
        expect(hooks[i].result.current.progress.totalPoints).toBe(15);
        expect(hooks[i].result.current.isMissionCompleted(1)).toBe(true);
      }
    });

    it('correctly accrues points when N = 5 instances complete distinct missions concurrently', () => {
      const N = 5;
      const hooks = Array.from({ length: N }, () => renderHook(() => useMissionsProgress()));

      act(() => {
        for (let i = 0; i < N; i++) {
          hooks[i].result.current.completeMission(i + 1, `badge_${i + 1}`, (i + 1) * 10);
        }
      });

      // 10 + 20 + 30 + 40 + 50 = 150 points
      const raw = window.localStorage.getItem('alash_progress');
      const parsed: MissionsProgressState = JSON.parse(raw || '{}');

      expect(parsed.completedMissions.length).toBe(5);
      expect(parsed.badges.length).toBe(5);
      expect(parsed.totalPoints).toBe(150);

      for (let i = 0; i < N; i++) {
        expect(hooks[i].result.current.progress.totalPoints).toBe(150);
        expect(hooks[i].result.current.hasBadge(`badge_${i + 1}`)).toBe(true);
      }
    });
  });

  // =========================================================================
  // DIMENSION 2: Cross-Tab Storage Clear (key === null & edge cases)
  // =========================================================================
  describe('Dimension 2: Cross-Tab localStorage.clear() Edge Cases', () => {
    it('resets memory state cleanly across N = 5 mounted instances on StorageEvent with key === null', () => {
      const favHooks = Array.from({ length: 5 }, () => renderHook(() => useFavorites()));
      const progHooks = Array.from({ length: 5 }, () => renderHook(() => useMissionsProgress()));

      act(() => {
        favHooks[0].result.current.toggleFavorite('figure', 'bokeikhanov');
        favHooks[1].result.current.toggleFavorite('document', 'petition_1905');
        progHooks[0].result.current.completeMission(1, 'badge_1', 20);
      });

      expect(favHooks[4].result.current.totalFavoritesCount).toBe(2);
      expect(progHooks[4].result.current.progress.totalPoints).toBe(20);

      // Simulate WHATWG clear event
      window.localStorage.clear();
      act(() => {
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: null,
            oldValue: null,
            newValue: null,
          })
        );
      });

      for (let i = 0; i < 5; i++) {
        expect(favHooks[i].result.current.favorites.figures).toEqual([]);
        expect(favHooks[i].result.current.favorites.documents).toEqual([]);
        expect(favHooks[i].result.current.totalFavoritesCount).toBe(0);
        expect(progHooks[i].result.current.progress.completedMissions).toEqual([]);
        expect(progHooks[i].result.current.progress.badges).toEqual([]);
        expect(progHooks[i].result.current.progress.totalPoints).toBe(0);
      }
    });

    it('ignores StorageEvent from sessionStorage.clear()', () => {
      const favHook = renderHook(() => useFavorites());

      act(() => {
        favHook.result.current.toggleFavorite('figure', 'baitursynov');
      });

      expect(favHook.result.current.isFavorite('figure', 'baitursynov')).toBe(true);

      // Dispatch event simulating sessionStorage clear
      act(() => {
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: null,
            oldValue: null,
            newValue: null,
            storageArea: window.sessionStorage,
          })
        );
      });

      // Should NOT have cleared localStorage state
      expect(favHook.result.current.isFavorite('figure', 'baitursynov')).toBe(true);
      expect(favHook.result.current.totalFavoritesCount).toBe(1);
    });
  });

  // =========================================================================
  // DIMENSION 3: Malformed CustomEvent Payloads & Type Safety
  // =========================================================================
  describe('Dimension 3: Malformed CustomEvent Payloads Robustness', () => {
    it('safely handles non-object, null, array, and primitive details in useFavorites', () => {
      const hook = renderHook(() => useFavorites());

      const malformedPayloads = [
        null,
        undefined,
        42,
        'malicious string',
        true,
        [],
        [1, 2, 3],
        { figures: 'not an array', documents: [] },
        { figures: [], documents: 'not an array' },
        { figures: [123, 456], documents: [] },
        { figures: ['valid'], documents: [null] },
        { figures: [undefined], documents: [] },
        { figures: [{}], documents: [] },
        { someOtherKey: 'random' },
      ];

      for (const payload of malformedPayloads) {
        expect(() => {
          act(() => {
            window.dispatchEvent(
              new CustomEvent('alash_favorites_updated', {
                detail: payload,
              })
            );
          });
        }).not.toThrow();

        expect(Array.isArray(hook.result.current.favorites.figures)).toBe(true);
        expect(Array.isArray(hook.result.current.favorites.documents)).toBe(true);
        expect(typeof hook.result.current.totalFavoritesCount).toBe('number');
      }
    });

    it('safely handles non-object, null, NaN, and Infinity in useMissionsProgress', () => {
      const hook = renderHook(() => useMissionsProgress());

      const malformedPayloads = [
        null,
        undefined,
        'progress string',
        { completedMissions: 'all', badges: [], totalPoints: 10 },
        { completedMissions: [1, '2'], badges: [], totalPoints: 10 },
        { completedMissions: [1], badges: [123], totalPoints: 10 },
        { completedMissions: [1], badges: ['badge'], totalPoints: NaN },
        { completedMissions: [1], badges: ['badge'], totalPoints: Infinity },
        { completedMissions: [1], badges: ['badge'], totalPoints: -Infinity },
        { completedMissions: [NaN], badges: ['badge'], totalPoints: 10 },
        { completedMissions: [Infinity], badges: ['badge'], totalPoints: 10 },
      ];

      for (const payload of malformedPayloads) {
        expect(() => {
          act(() => {
            window.dispatchEvent(
              new CustomEvent('alash_progress_updated', {
                detail: payload,
              })
            );
          });
        }).not.toThrow();

        expect(Array.isArray(hook.result.current.progress.completedMissions)).toBe(true);
        expect(Array.isArray(hook.result.current.progress.badges)).toBe(true);
        expect(typeof hook.result.current.progress.totalPoints).toBe('number');
        expect(Number.isFinite(hook.result.current.progress.totalPoints)).toBe(true);
      }
    });
  });

  // =========================================================================
  // DIMENSION 4: Validator Functions Direct Unit Stress
  // =========================================================================
  describe('Dimension 4: Schema Validator Unit Stress', () => {
    it('isValidFavoritesState returns false for all non-conforming shapes', () => {
      expect(isValidFavoritesState(null)).toBe(false);
      expect(isValidFavoritesState(undefined)).toBe(false);
      expect(isValidFavoritesState('')).toBe(false);
      expect(isValidFavoritesState(123)).toBe(false);
      expect(isValidFavoritesState([])).toBe(false);
      expect(isValidFavoritesState({})).toBe(false);
      expect(isValidFavoritesState({ figures: [] })).toBe(false);
      expect(isValidFavoritesState({ documents: [] })).toBe(false);
      expect(isValidFavoritesState({ figures: [1], documents: [] })).toBe(false);
      expect(isValidFavoritesState({ figures: [], documents: [null] })).toBe(false);
      expect(isValidFavoritesState({ figures: ['ok'], documents: ['ok'] })).toBe(true);
    });

    it('isValidProgressState returns false for all non-conforming shapes', () => {
      expect(isValidProgressState(null)).toBe(false);
      expect(isValidProgressState(undefined)).toBe(false);
      expect(isValidProgressState({})).toBe(false);
      expect(isValidProgressState({ completedMissions: [], badges: [] })).toBe(false);
      expect(isValidProgressState({ completedMissions: [], badges: [], totalPoints: '10' })).toBe(false);
      expect(isValidProgressState({ completedMissions: [], badges: [], totalPoints: NaN })).toBe(false);
      expect(isValidProgressState({ completedMissions: [], badges: [], totalPoints: Infinity })).toBe(false);
      expect(isValidProgressState({ completedMissions: [NaN], badges: [], totalPoints: 0 })).toBe(false);
      expect(isValidProgressState({ completedMissions: [1], badges: [false], totalPoints: 0 })).toBe(false);
      expect(isValidProgressState({ completedMissions: [1, 2], badges: ['b1'], totalPoints: 20 })).toBe(true);
    });
  });
});
