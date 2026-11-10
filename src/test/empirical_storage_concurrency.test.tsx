import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFavorites, FavoritesState } from '@/hooks/useFavorites';
import { useMissionsProgress, MissionsProgressState } from '@/hooks/useMissionsProgress';

describe('Empirical Storage & Concurrency Adversarial Verification', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  // =========================================================================
  // 1. CONCURRENCY & SAME-TICK MUTATIONS ACROSS MULTIPLE INSTANCES (N >= 3)
  // =========================================================================
  describe('1. Same-Tick Concurrency Across Multiple Instances (N >= 3)', () => {
    it('handles rapid sequential toggle on / toggle off in the same tick on a single instance', () => {
      const { result } = renderHook(() => useFavorites());

      act(() => {
        result.current.toggleFavorite('figure', 'bokeikhanov');
        result.current.toggleFavorite('figure', 'bokeikhanov'); // toggle off
      });

      expect(result.current.favorites.figures).toEqual([]);
      expect(result.current.isFavorite('figure', 'bokeikhanov')).toBe(false);

      act(() => {
        result.current.toggleFavorite('figure', 'bokeikhanov'); // on
        result.current.toggleFavorite('figure', 'bokeikhanov'); // off
        result.current.toggleFavorite('figure', 'bokeikhanov'); // on
      });

      expect(result.current.favorites.figures).toEqual(['bokeikhanov']);
      expect(result.current.isFavorite('figure', 'bokeikhanov')).toBe(true);
    });

    it('handles interleaved figure and document toggles in the same tick on single instance', () => {
      const { result } = renderHook(() => useFavorites());

      act(() => {
        result.current.toggleFavorite('figure', 'fig_1');
        result.current.toggleFavorite('document', 'doc_1');
        result.current.toggleFavorite('figure', 'fig_2');
        result.current.toggleFavorite('document', 'doc_2');
        result.current.toggleFavorite('figure', 'fig_1'); // remove fig_1
      });

      expect(result.current.favorites.figures).toEqual(['fig_2']);
      expect(result.current.favorites.documents).toEqual(['doc_1', 'doc_2']);
      expect(result.current.totalFavoritesCount).toBe(3);
    });

    it('concurrent mutations across 3 distinct hook instances preserve all updates', () => {
      // 3 distinct components mounted on the page
      const hook0 = renderHook(() => useFavorites());
      const hook1 = renderHook(() => useFavorites());
      const hook2 = renderHook(() => useFavorites());

      act(() => {
        hook0.result.current.toggleFavorite('figure', 'fig_0');
        hook1.result.current.toggleFavorite('figure', 'fig_1');
        hook2.result.current.toggleFavorite('figure', 'fig_2');
      });

      const raw = window.localStorage.getItem('alash_favorites');
      const parsed: FavoritesState = JSON.parse(raw || '{}');

      expect(parsed.figures).toEqual(['fig_0', 'fig_1', 'fig_2']);
      expect(hook0.result.current.favorites.figures).toEqual(['fig_0', 'fig_1', 'fig_2']);
      expect(hook1.result.current.favorites.figures).toEqual(['fig_0', 'fig_1', 'fig_2']);
      expect(hook2.result.current.favorites.figures).toEqual(['fig_0', 'fig_1', 'fig_2']);
    });

    it('concurrent mission completions across 3 distinct hook instances preserve all points and missions', () => {
      const hook0 = renderHook(() => useMissionsProgress());
      const hook1 = renderHook(() => useMissionsProgress());
      const hook2 = renderHook(() => useMissionsProgress());

      act(() => {
        hook0.result.current.completeMission(1, 'badge_1', 10);
        hook1.result.current.completeMission(2, 'badge_2', 10);
        hook2.result.current.completeMission(3, 'badge_3', 10);
      });

      const raw = window.localStorage.getItem('alash_progress');
      const parsed: MissionsProgressState = JSON.parse(raw || '{}');

      expect(parsed.completedMissions).toEqual(expect.arrayContaining([1, 2, 3]));
      expect(parsed.badges).toEqual(expect.arrayContaining(['badge_1', 'badge_2', 'badge_3']));
      expect(parsed.totalPoints).toBe(30);

      expect(hook0.result.current.progress.completedMissions).toEqual(expect.arrayContaining([1, 2, 3]));
      expect(hook0.result.current.progress.totalPoints).toBe(30);
      expect(hook1.result.current.progress.completedMissions).toEqual(expect.arrayContaining([1, 2, 3]));
      expect(hook1.result.current.progress.totalPoints).toBe(30);
      expect(hook2.result.current.progress.completedMissions).toEqual(expect.arrayContaining([1, 2, 3]));
      expect(hook2.result.current.progress.totalPoints).toBe(30);
    });
  });

  // =========================================================================
  // 2. CROSS-INSTANCE SYNCHRONIZATION (SERIAL / SPACED MUTATIONS)
  // =========================================================================
  describe('2. Cross-Instance Synchronization (Serial Mutations)', () => {
    it('bidirectionally synchronizes useFavorites across multiple instances when mutations are serial', () => {
      const hookA = renderHook(() => useFavorites());
      const hookB = renderHook(() => useFavorites());
      const hookC = renderHook(() => useFavorites());

      act(() => {
        hookA.result.current.toggleFavorite('figure', 'baitursynov');
      });

      expect(hookA.result.current.isFavorite('figure', 'baitursynov')).toBe(true);
      expect(hookB.result.current.isFavorite('figure', 'baitursynov')).toBe(true);
      expect(hookC.result.current.isFavorite('figure', 'baitursynov')).toBe(true);

      act(() => {
        hookB.result.current.toggleFavorite('document', 'karkaraly_petition');
      });

      expect(hookA.result.current.isFavorite('document', 'karkaraly_petition')).toBe(true);
      expect(hookB.result.current.isFavorite('document', 'karkaraly_petition')).toBe(true);
      expect(hookC.result.current.isFavorite('document', 'karkaraly_petition')).toBe(true);
      expect(hookA.result.current.totalFavoritesCount).toBe(2);
      expect(hookB.result.current.totalFavoritesCount).toBe(2);
      expect(hookC.result.current.totalFavoritesCount).toBe(2);

      act(() => {
        hookC.result.current.clearFavorites();
      });

      expect(hookA.result.current.favorites).toEqual({ figures: [], documents: [] });
      expect(hookB.result.current.favorites).toEqual({ figures: [], documents: [] });
      expect(hookC.result.current.favorites).toEqual({ figures: [], documents: [] });
      expect(hookA.result.current.totalFavoritesCount).toBe(0);
    });

    it('bidirectionally synchronizes useMissionsProgress across multiple instances when mutations are serial', () => {
      const hookA = renderHook(() => useMissionsProgress());
      const hookB = renderHook(() => useMissionsProgress());

      act(() => {
        hookA.result.current.completeMission(4, 'badge_editor', 25);
      });

      expect(hookB.result.current.isMissionCompleted(4)).toBe(true);
      expect(hookB.result.current.hasBadge('badge_editor')).toBe(true);
      expect(hookB.result.current.progress.totalPoints).toBe(25);

      act(() => {
        hookB.result.current.resetProgress();
      });

      expect(hookA.result.current.progress.completedMissions).toEqual([]);
      expect(hookA.result.current.progress.badges).toEqual([]);
      expect(hookA.result.current.progress.totalPoints).toBe(0);
    });
  });

  // =========================================================================
  // 3. STORAGE QUOTA & STORAGE EXCEPTION RESILIENCE
  // =========================================================================
  describe('3. Storage Quota & Storage Failure Resilience', () => {
    it('survives QuotaExceededError in useFavorites and keeps in-memory state and cross-instance sync functioning', () => {
      const hookA = renderHook(() => useFavorites());
      const hookB = renderHook(() => useFavorites());

      vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
        throw new DOMException('The quota has been exceeded.', 'QuotaExceededError');
      });

      expect(() => {
        act(() => {
          hookA.result.current.toggleFavorite('figure', 'dualatov');
        });
      }).not.toThrow();

      expect(hookA.result.current.isFavorite('figure', 'dualatov')).toBe(true);
      expect(hookB.result.current.isFavorite('figure', 'dualatov')).toBe(true);

      expect(() => {
        act(() => {
          hookA.result.current.clearFavorites();
        });
      }).not.toThrow();

      expect(hookA.result.current.favorites).toEqual({ figures: [], documents: [] });
      expect(hookB.result.current.favorites).toEqual({ figures: [], documents: [] });
    });

    it('survives QuotaExceededError in useMissionsProgress and keeps in-memory state and sync functioning', () => {
      const hookA = renderHook(() => useMissionsProgress());
      const hookB = renderHook(() => useMissionsProgress());

      vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
        throw new DOMException('QuotaExceededError', 'QuotaExceededError');
      });

      expect(() => {
        act(() => {
          hookA.result.current.completeMission(2, 'badge_2', 15);
        });
      }).not.toThrow();

      expect(hookA.result.current.isMissionCompleted(2)).toBe(true);
      expect(hookB.result.current.isMissionCompleted(2)).toBe(true);
      expect(hookB.result.current.progress.totalPoints).toBe(15);
    });

    it('survives SecurityError when localStorage access is completely blocked (e.g. private browsing)', () => {
      vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
        throw new DOMException('Access is denied for this document', 'SecurityError');
      });
      vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
        throw new DOMException('Access is denied for this document', 'SecurityError');
      });

      let favHook!: ReturnType<typeof renderHook<any, any>>;
      let progHook!: ReturnType<typeof renderHook<any, any>>;
      expect(() => {
        favHook = renderHook(() => useFavorites());
        progHook = renderHook(() => useMissionsProgress());
      }).not.toThrow();

      expect(favHook.result.current.favorites).toEqual({ figures: [], documents: [] });
      expect(progHook.result.current.progress).toEqual({ completedMissions: [], badges: [], totalPoints: 0 });

      act(() => {
        favHook.result.current.toggleFavorite('figure', 'fig_blocked');
        progHook.result.current.completeMission(1, 'badge_1', 10);
      });

      expect(favHook.result.current.isFavorite('figure', 'fig_blocked')).toBe(true);
      expect(progHook.result.current.isMissionCompleted(1)).toBe(true);
    });
  });

  // =========================================================================
  // 4. PAYLOAD CORRUPTION & RECOVERY HARNESS
  // =========================================================================
  describe('4. Payload Corruption & Recovery Harness', () => {
    it('gracefully handles non-JSON, invalid schema, and null payloads on initial mount', () => {
      window.localStorage.setItem('alash_favorites', '<<NOT_JSON>>');
      window.localStorage.setItem('alash_progress', 'undefined');

      let fav = renderHook(() => useFavorites());
      let prog = renderHook(() => useMissionsProgress());

      expect(fav.result.current.favorites).toEqual({ figures: [], documents: [] });
      expect(prog.result.current.progress).toEqual({ completedMissions: [], badges: [], totalPoints: 0 });

      fav.unmount();
      prog.unmount();

      window.localStorage.setItem(
        'alash_favorites',
        JSON.stringify({ figures: 12345, documents: null })
      );
      window.localStorage.setItem(
        'alash_progress',
        JSON.stringify({ completedMissions: 'all', badges: false, totalPoints: 'lots' })
      );

      fav = renderHook(() => useFavorites());
      prog = renderHook(() => useMissionsProgress());

      expect(fav.result.current.favorites).toEqual({ figures: [], documents: [] });
      expect(prog.result.current.progress).toEqual({ completedMissions: [], badges: [], totalPoints: 0 });

      fav.unmount();
      prog.unmount();
      window.localStorage.setItem('alash_favorites', '');
      window.localStorage.setItem('alash_progress', 'null');

      fav = renderHook(() => useFavorites());
      prog = renderHook(() => useMissionsProgress());

      expect(fav.result.current.favorites).toEqual({ figures: [], documents: [] });
      expect(prog.result.current.progress).toEqual({ completedMissions: [], badges: [], totalPoints: 0 });
    });

    it('gracefully recovers when StorageEvent contains corrupted data or null newValue', () => {
      const fav = renderHook(() => useFavorites());
      const prog = renderHook(() => useMissionsProgress());

      act(() => {
        fav.result.current.toggleFavorite('figure', 'aimauytov');
        prog.result.current.completeMission(3, 'badge_3', 20);
      });

      expect(fav.result.current.isFavorite('figure', 'aimauytov')).toBe(true);
      expect(prog.result.current.progress.totalPoints).toBe(20);

      window.localStorage.setItem('alash_favorites', '{ corrupted: true');
      window.localStorage.setItem('alash_progress', '[1, 2, 3]');

      act(() => {
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: 'alash_favorites',
            newValue: '{ corrupted: true',
          })
        );
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: 'alash_progress',
            newValue: '[1, 2, 3]',
          })
        );
      });

      expect(fav.result.current.favorites).toEqual({ figures: [], documents: [] });
      expect(prog.result.current.progress).toEqual({ completedMissions: [], badges: [], totalPoints: 0 });
    });

    it('correctly clears in-memory state on cross-tab localStorage.clear() (StorageEvent with key === null)', () => {
      const fav = renderHook(() => useFavorites());
      const prog = renderHook(() => useMissionsProgress());

      act(() => {
        fav.result.current.toggleFavorite('figure', 'bokeikhanov');
        prog.result.current.completeMission(1, 'badge_1', 10);
      });

      expect(fav.result.current.isFavorite('figure', 'bokeikhanov')).toBe(true);
      expect(prog.result.current.isMissionCompleted(1)).toBe(true);

      window.localStorage.clear();

      // In WHATWG spec, when clear() is called, event.key is null
      act(() => {
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: null,
            oldValue: null,
            newValue: null,
          })
        );
      });

      expect(fav.result.current.favorites.figures).toEqual([]);
      expect(fav.result.current.totalFavoritesCount).toBe(0);
      expect(prog.result.current.progress.completedMissions).toEqual([]);
      expect(prog.result.current.progress.totalPoints).toBe(0);
    });

    it('survives malformed CustomEvent payloads without throwing TypeError in useFavorites', () => {
      const { result } = renderHook(() => useFavorites());

      act(() => {
        window.dispatchEvent(
          new CustomEvent('alash_favorites_updated', {
            detail: { figures: null, documents: null },
          })
        );
      });

      expect(result.current.favorites.figures).toEqual([]);
      expect(result.current.favorites.documents).toEqual([]);
      expect(result.current.totalFavoritesCount).toBe(0);

      act(() => {
        window.dispatchEvent(
          new CustomEvent('alash_favorites_updated', {
            detail: 'corrupted_string',
          })
        );
      });
      expect(result.current.favorites.figures).toEqual([]);
      expect(result.current.totalFavoritesCount).toBe(0);

      act(() => {
        window.dispatchEvent(
          new CustomEvent('alash_favorites_updated', {
            detail: { figures: [123, null], documents: false },
          })
        );
      });
      expect(result.current.favorites.figures).toEqual([]);
      expect(result.current.totalFavoritesCount).toBe(0);
    });

    it('survives malformed CustomEvent payloads without throwing TypeError in useMissionsProgress', () => {
      const { result } = renderHook(() => useMissionsProgress());

      act(() => {
        window.dispatchEvent(
          new CustomEvent('alash_progress_updated', {
            detail: { completedMissions: null, badges: null, totalPoints: null },
          })
        );
      });

      expect(result.current.progress.completedMissions).toEqual([]);
      expect(result.current.progress.badges).toEqual([]);
      expect(result.current.progress.totalPoints).toBe(0);
      expect(result.current.isMissionCompleted(1)).toBe(false);
      expect(result.current.hasBadge('test')).toBe(false);

      act(() => {
        window.dispatchEvent(
          new CustomEvent('alash_progress_updated', {
            detail: { completedMissions: [1], badges: ['badge_1'], totalPoints: NaN },
          })
        );
      });

      expect(result.current.progress.completedMissions).toEqual([]);
      expect(result.current.progress.totalPoints).toBe(0);
    });
  });

  // =========================================================================
  // 5. LIFECYCLE & EVENT LISTENER DISPOSAL
  // =========================================================================
  describe('5. Lifecycle and Clean Listener Teardown', () => {
    it('verifies that unmounting instances removes all window event listeners cleanly', () => {
      const addSpy = vi.spyOn(window, 'addEventListener');
      const removeSpy = vi.spyOn(window, 'removeEventListener');

      const hooks = Array.from({ length: 5 }, () => renderHook(() => useFavorites()));

      const favAddCalls = addSpy.mock.calls.filter(
        ([evt]) => evt === 'storage' || evt === 'alash_favorites_updated'
      );
      expect(favAddCalls.length).toBe(10); // 5 instances * 2

      hooks.forEach((h) => h.unmount());

      const favRemoveCalls = removeSpy.mock.calls.filter(
        ([evt]) => evt === 'storage' || evt === 'alash_favorites_updated'
      );
      expect(favRemoveCalls.length).toBe(10); // Exactly 1:1 balance
    });
  });
});
