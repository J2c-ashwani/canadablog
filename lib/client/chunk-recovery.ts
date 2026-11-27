'use client';

const RELOAD_STORAGE_KEY = 'fsi:chunk-reload-at';
const RELOAD_COOLDOWN_MS = 15_000;

/**
 * Returns true when an error came from a failed/stale Next.js dynamic chunk load.
 */
export function isChunkLoadError(error: Error & { digest?: string }): boolean {
  const message = `${error?.name || ''} ${error?.message || ''}`;
  return /ChunkLoadError|Loading chunk \d+ failed|Failed to fetch dynamically imported module/i.test(message);
}

/**
 * Performs a guarded one-shot hard reload for transient chunk mismatches/network glitches.
 */
export function attemptChunkAutoReload(error: Error & { digest?: string }): boolean {
  if (typeof window === 'undefined' || !isChunkLoadError(error)) return false;
  try {
    const lastReloadAt = Number(window.sessionStorage.getItem(RELOAD_STORAGE_KEY) || 0);
    const now = Date.now();
    if (now - lastReloadAt < RELOAD_COOLDOWN_MS) return false;
    window.sessionStorage.setItem(RELOAD_STORAGE_KEY, String(now));
    window.location.reload();
    return true;
  } catch {
    window.location.reload();
    return true;
  }
}

/**
 * Hard-reloads stale chunks cleanly; falls back to React boundary reset for other errors.
 */
export function recoverOrReset(error: Error & { digest?: string }, reset: () => void): void {
  if (typeof window !== 'undefined' && isChunkLoadError(error)) {
    window.location.reload();
    return;
  }
  reset();
}
