import { useEffect, useCallback, useSyncExternalStore } from 'react';

export type FavoriteType = 'figure' | 'document';

export interface FavoritesState {
  figures: string[];
  documents: string[];
}

export interface UseFavoritesReturn {
  favorites: FavoritesState;
  toggleFavorite: (type: FavoriteType, id: string) => void;
  isFavorite: (type: FavoriteType, id: string) => boolean;
  clearFavorites: () => void;
  totalFavoritesCount: number;
}

const STORAGE_KEY = 'alash_favorites';
const EVENT_NAME = 'alash_favorites_updated';

const EMPTY_FAVORITES: FavoritesState = Object.freeze({
  figures: [],
  documents: [],
});

/**
 * Validates whether an unknown value conforms strictly to FavoritesState schema.
 */
export function isValidFavoritesState(val: unknown): val is FavoritesState {
  if (!val || typeof val !== 'object') return false;
  const candidate = val as Record<string, unknown>;
  return (
    Array.isArray(candidate.figures) &&
    candidate.figures.every((item) => typeof item === 'string') &&
    Array.isArray(candidate.documents) &&
    candidate.documents.every((item) => typeof item === 'string')
  );
}

/**
 * Safely parses raw JSON from storage or external sources.
 */
function parseFavorites(raw: string | null): FavoritesState {
  if (!raw) return EMPTY_FAVORITES;
  try {
    const parsed = JSON.parse(raw);
    if (isValidFavoritesState(parsed)) {
      return {
        figures: [...parsed.figures],
        documents: [...parsed.documents],
      };
    }
  } catch {
    // Corrupted JSON or parsing failure
  }
  return EMPTY_FAVORITES;
}

/**
 * Reads the latest validated favorites state from localStorage.
 */
function readStorageFavorites(): FavoritesState {
  try {
    if (typeof window === 'undefined') return EMPTY_FAVORITES;
    const raw = localStorage.getItem(STORAGE_KEY);
    return parseFavorites(raw);
  } catch {
    // Storage access blocked or SecurityError (private browsing)
    return EMPTY_FAVORITES;
  }
}

function arraysEqual(a: string[], b: string[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function statesEqual(a: FavoritesState, b: FavoritesState): boolean {
  if (a === b) return true;
  return arraysEqual(a.figures, b.figures) && arraysEqual(a.documents, b.documents);
}

// ============================================================================
// SINGLETON MODULE-LEVEL STORE
// ============================================================================

const subscribers = new Set<() => void>();
let cachedSnapshot: FavoritesState = EMPTY_FAVORITES;
let lastRawStorage: string | null | undefined = undefined;

function getFavoritesSnapshot(): FavoritesState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== lastRawStorage) {
      lastRawStorage = raw;
      cachedSnapshot = parseFavorites(raw);
    }
  } catch {
    // Storage access blocked (SecurityError); retain authoritative in-memory state
  }
  return cachedSnapshot;
}

function getServerSnapshot(): FavoritesState {
  return EMPTY_FAVORITES;
}

function notifySubscribers(): void {
  for (const listener of subscribers) {
    listener();
  }
}

function subscribeFavorites(listener: () => void): () => void {
  subscribers.add(listener);
  return () => {
    subscribers.delete(listener);
    if (subscribers.size === 0) {
      // Invalidate storage cache marker when all components unmount so subsequent
      // test suites or mounts re-verify against current localStorage state.
      lastRawStorage = undefined;
      cachedSnapshot = EMPTY_FAVORITES;
    }
  };
}

function setFavoritesState(nextState: FavoritesState): void {
  if (statesEqual(cachedSnapshot, nextState)) {
    return;
  }

  cachedSnapshot = nextState;

  // Persist synchronously outside of React state updaters
  try {
    const serialized = JSON.stringify(nextState);
    localStorage.setItem(STORAGE_KEY, serialized);
    lastRawStorage = serialized;
  } catch {
    // In-memory fallback when localStorage is blocked or quota exceeded
  }

  try {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: nextState }));
  } catch {
    // In-memory fallback for non-DOM environments
  }

  notifySubscribers();
}

function updateFavorites(updater: (prev: FavoritesState) => FavoritesState): void {
  const current = getFavoritesSnapshot();
  const next = updater(current);
  setFavoritesState(next);
}

function syncFavoritesFromStorage(): void {
  const fresh = readStorageFavorites();
  if (statesEqual(cachedSnapshot, fresh)) {
    return;
  }
  cachedSnapshot = fresh;
  try {
    lastRawStorage = localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage access blocked
  }
  notifySubscribers();
}

function syncFavoritesFromExternal(detail: FavoritesState): void {
  if (statesEqual(cachedSnapshot, detail)) {
    return;
  }
  cachedSnapshot = {
    figures: [...detail.figures],
    documents: [...detail.documents],
  };
  try {
    lastRawStorage = JSON.stringify(detail);
  } catch {
    // Fallback
  }
  notifySubscribers();
}

// ============================================================================
// REACT HOOK
// ============================================================================

export const useFavorites = (): UseFavoritesReturn => {
  const favorites = useSyncExternalStore(
    subscribeFavorites,
    getFavoritesSnapshot,
    getServerSnapshot
  );

  // Sync across browser tabs and external events
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      // Handle normal key updates as well as WHATWG Storage.clear() (key === null)
      if (e.key === STORAGE_KEY || e.key === null) {
        try {
          if (e.storageArea && e.storageArea !== window.localStorage) {
            return;
          }
        } catch {
          // In-memory fallback
        }
        syncFavoritesFromStorage();
      }
    };

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<unknown>;
      const detail = customEvent.detail;
      if (isValidFavoritesState(detail)) {
        syncFavoritesFromExternal(detail);
      } else {
        syncFavoritesFromStorage();
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(EVENT_NAME, handleCustomEvent);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(EVENT_NAME, handleCustomEvent);
    };
  }, []);

  const isFavorite = useCallback(
    (type: FavoriteType, id: string): boolean => {
      if (type === 'figure') {
        return favorites.figures.includes(id);
      }
      return favorites.documents.includes(id);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (type: FavoriteType, id: string) => {
      updateFavorites((prev) => {
        const key = type === 'figure' ? 'figures' : 'documents';
        const currentList = prev[key];
        const exists = currentList.includes(id);
        const nextList = exists
          ? currentList.filter((item) => item !== id)
          : [...currentList, id];

        return {
          ...prev,
          [key]: nextList,
        };
      });
    },
    []
  );

  const clearFavorites = useCallback(() => {
    setFavoritesState(EMPTY_FAVORITES);
  }, []);

  const totalFavoritesCount = favorites.figures.length + favorites.documents.length;

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    totalFavoritesCount,
  };
};
