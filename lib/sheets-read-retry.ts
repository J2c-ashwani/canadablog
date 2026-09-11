/** Retry only idempotent reads after transient provider failures. Never use for writes. */
export async function readWithQuotaRetry<T>(
  read: () => Promise<T>,
  wait: (milliseconds: number) => Promise<void> = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await read();
    } catch (error) {
      const details = error as { status?: number; code?: number | string; response?: { status?: number } } | null;
      const status = Number(details?.response?.status || details?.status || details?.code);
      if (attempt >= 2 || ![429, 500, 502, 503, 504].includes(status)) throw error;
      // Bound the total retry budget below the recovery job's execution limit.
      await wait(1000 * (2 ** attempt) + Math.floor(Math.random() * 500));
    }
  }
}
