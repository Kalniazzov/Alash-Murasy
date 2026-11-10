import { useEffect, useCallback, useSyncExternalStore } from 'react';

export interface MissionsProgressState {
  completedMissions: number[];
  badges: string[];
  totalPoints: number;
}

export interface UseMissionsProgressReturn {
  progress: MissionsProgressState;
  completeMission: (missionId: number, badgeKey?: string, pointsEarned?: number) => void;
  isMissionCompleted: (missionId: number) => boolean;
  hasBadge: (badgeKey: string) => boolean;
  resetProgress: () => void;
}

const STORAGE_KEY = 'alash_progress';
const EVENT_NAME = 'alash_progress_updated';

const DEFAULT_STATE: MissionsProgressState = Object.freeze({
  completedMissions: [],
  badges: [],
  totalPoints: 0,
});

/**
 * Validates whether an unknown value conforms strictly to MissionsProgressState schema.
 */
export function isValidProgressState(data: unknown): data is MissionsProgressState {
  if (!data || typeof data !== 'object') return false;
  const candidate = data as Record<string, unknown>;
  if (!Array.isArray(candidate.completedMissions)) return false;
  if (!candidate.completedMissions.every((m) => typeof m === 'number' && Number.isFinite(m))) {
    return false;
  }
  if (!Array.isArray(candidate.badges)) return false;
  if (!candidate.badges.every((b) => typeof b === 'string')) {
    return false;
  }
  if (typeof candidate.totalPoints !== 'number' || !Number.isFinite(candidate.totalPoints)) {
    return false;
  }
  return true;
}

/**
 * Safely parses raw JSON from storage or external sources.
 */
function parseProgress(raw: string | null): MissionsProgressState {
  if (!raw) return DEFAULT_STATE;
  try {
    const parsed = JSON.parse(raw);
    if (isValidProgressState(parsed)) {
      return {
        completedMissions: [...parsed.completedMissions],
        badges: [...parsed.badges],
        totalPoints: parsed.totalPoints,
      };
    }
  } catch {
    // Malformed JSON or parse error
  }
  return DEFAULT_STATE;
}

/**
 * Reads the latest validated missions progress state from localStorage.
 */
function readStorageProgress(): MissionsProgressState {
  try {
    if (typeof window === 'undefined') return DEFAULT_STATE;
    const raw = localStorage.getItem(STORAGE_KEY);
    return parseProgress(raw);
  } catch {
    return DEFAULT_STATE;
  }
}

function areStatesEqual(a: MissionsProgressState, b: MissionsProgressState): boolean {
  if (a === b) return true;
  if (a.totalPoints !== b.totalPoints) return false;
  if (a.completedMissions.length !== b.completedMissions.length) return false;
  if (a.badges.length !== b.badges.length) return false;
  for (let i = 0; i < a.completedMissions.length; i++) {
    if (a.completedMissions[i] !== b.completedMissions[i]) return false;
  }
  for (let i = 0; i < a.badges.length; i++) {
    if (a.badges[i] !== b.badges[i]) return false;
  }
  return true;
}

// ============================================================================
// SINGLETON MODULE-LEVEL STORE
// ============================================================================

const progressSubscribers = new Set<() => void>();
let cachedProgressSnapshot: MissionsProgressState = DEFAULT_STATE;
let lastRawProgressStorage: string | null | undefined = undefined;

function getProgressSnapshot(): MissionsProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== lastRawProgressStorage) {
      lastRawProgressStorage = raw;
      cachedProgressSnapshot = parseProgress(raw);
    }
  } catch {
    // Storage access blocked (SecurityError); retain authoritative in-memory state
  }
  return cachedProgressSnapshot;
}

function getServerProgressSnapshot(): MissionsProgressState {
  return DEFAULT_STATE;
}

function notifyProgressSubscribers(): void {
  for (const listener of progressSubscribers) {
    listener();
  }
}

function subscribeProgress(listener: () => void): () => void {
  progressSubscribers.add(listener);
  return () => {
    progressSubscribers.delete(listener);
    if (progressSubscribers.size === 0) {
      lastRawProgressStorage = undefined;
      cachedProgressSnapshot = DEFAULT_STATE;
    }
  };
}

function setProgressState(nextState: MissionsProgressState): void {
  if (areStatesEqual(cachedProgressSnapshot, nextState)) {
    return;
  }

  cachedProgressSnapshot = nextState;

  // Persist synchronously outside of React state updaters
  try {
    const serialized = JSON.stringify(nextState);
    localStorage.setItem(STORAGE_KEY, serialized);
    lastRawProgressStorage = serialized;
  } catch {
    // In-memory fallback when localStorage is blocked or quota exceeded
  }

  try {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: nextState }));
  } catch {
    // In-memory fallback
  }

  notifyProgressSubscribers();
}

function syncProgressFromStorage(): void {
  const fresh = readStorageProgress();
  if (areStatesEqual(cachedProgressSnapshot, fresh)) {
    return;
  }
  cachedProgressSnapshot = fresh;
  try {
    lastRawProgressStorage = localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage access blocked
  }
  notifyProgressSubscribers();
}

function syncProgressFromExternal(detail: MissionsProgressState): void {
  if (areStatesEqual(cachedProgressSnapshot, detail)) {
    return;
  }
  cachedProgressSnapshot = {
    completedMissions: [...detail.completedMissions],
    badges: [...detail.badges],
    totalPoints: detail.totalPoints,
  };
  try {
    lastRawProgressStorage = JSON.stringify(detail);
  } catch {
    // Fallback
  }
  notifyProgressSubscribers();
}

// ============================================================================
// REACT HOOK
// ============================================================================

export const useMissionsProgress = (): UseMissionsProgressReturn => {
  const progress = useSyncExternalStore(
    subscribeProgress,
    getProgressSnapshot,
    getServerProgressSnapshot
  );

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) {
        try {
          if (e.storageArea && e.storageArea !== window.localStorage) {
            return;
          }
        } catch {
          // In-memory fallback
        }
        syncProgressFromStorage();
      }
    };

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<unknown>;
      const detail = customEvent.detail;
      if (isValidProgressState(detail)) {
        syncProgressFromExternal(detail);
      } else {
        syncProgressFromStorage();
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(EVENT_NAME, handleCustomEvent);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(EVENT_NAME, handleCustomEvent);
    };
  }, []);

  const isMissionCompleted = useCallback(
    (missionId: number): boolean => {
      return progress.completedMissions.includes(missionId);
    },
    [progress.completedMissions]
  );

  const hasBadge = useCallback(
    (badgeKey: string): boolean => {
      return progress.badges.includes(badgeKey);
    },
    [progress.badges]
  );

  const completeMission = useCallback(
    (missionId: number, badgeKey?: string, pointsEarned: number = 10) => {
      const current = getProgressSnapshot();
      const isAlreadyCompleted = current.completedMissions.includes(missionId);
      const nextCompleted = isAlreadyCompleted
        ? current.completedMissions
        : [...current.completedMissions, missionId];

      const safePoints =
        typeof pointsEarned === 'number' && Number.isFinite(pointsEarned) ? pointsEarned : 10;

      const nextPoints = isAlreadyCompleted
        ? current.totalPoints
        : current.totalPoints + safePoints;

      let nextBadges = current.badges;
      if (badgeKey && !current.badges.includes(badgeKey)) {
        nextBadges = [...current.badges, badgeKey];
      }

      if (
        isAlreadyCompleted &&
        nextBadges === current.badges &&
        nextPoints === current.totalPoints
      ) {
        return;
      }

      const nextState: MissionsProgressState = {
        completedMissions: nextCompleted,
        badges: nextBadges,
        totalPoints: nextPoints,
      };

      setProgressState(nextState);
    },
    []
  );

  const resetProgress = useCallback(() => {
    setProgressState(DEFAULT_STATE);
  }, []);

  return {
    progress,
    completeMission,
    isMissionCompleted,
    hasBadge,
    resetProgress,
  };
};
