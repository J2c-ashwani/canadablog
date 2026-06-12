import { NextResponse } from 'next/server';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up expired entries periodically to prevent memory leaks
if (typeof global !== 'undefined') {
  if (!(global as any).rateLimitInterval) {
    (global as any).rateLimitInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, record] of rateLimitStore.entries()) {
        if (now > record.resetTime) {
          rateLimitStore.delete(key);
        }
      }
    }, 1000 * 60 * 5); // Clean up every 5 minutes
  }
}

/**
 * Checks rate limiting for a given IP key.
 */
export function rateLimit(ip: string, limit: number, windowMs: number): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const key = `${ip}`;
  const record = rateLimitStore.get(key);

  if (!record) {
    const newRecord = { count: 1, resetTime: now + windowMs };
    rateLimitStore.set(key, newRecord);
    return { success: true, remaining: limit - 1, reset: newRecord.resetTime };
  }

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    return { success: true, remaining: limit - 1, reset: record.resetTime };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0, reset: record.resetTime };
  }

  record.count += 1;
  return { success: true, remaining: limit - record.count, reset: record.resetTime };
}

/**
 * Helper to apply rate limiting in Next.js API Routes.
 */
export function applyRateLimit(request: Request, limit: number, windowMs: number) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "127.0.0.1";
  const result = rateLimit(ip, limit, windowMs);
  
  if (!result.success) {
    return {
      isLimited: true,
      response: NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(result.reset),
            'Retry-After': String(Math.ceil((result.reset - Date.now()) / 1000)),
          },
        }
      ),
    };
  }
  
  return {
    isLimited: false,
    headers: {
      'X-RateLimit-Limit': String(limit),
      'X-RateLimit-Remaining': String(result.remaining),
      'X-RateLimit-Reset': String(result.reset),
    },
  };
}
