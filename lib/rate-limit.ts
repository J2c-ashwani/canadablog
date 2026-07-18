import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

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

// Initialize Upstash Redis if URL and token are configured in the environment
let redis: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

/**
 * Checks rate limiting for a given IP key.
 */
export async function rateLimit(
  ip: string,
  limit: number,
  windowMs: number
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const key = `ratelimit:${ip}`;

  // If Redis is configured, use it for distributed, persistent rate limiting
  if (redis) {
    try {
      const count = await redis.incr(key);
      let ttl = Math.ceil(windowMs / 1000);
      
      if (count === 1) {
        await redis.expire(key, ttl);
      } else {
        ttl = await redis.ttl(key);
      }
      
      const remaining = Math.max(0, limit - count);
      const reset = Date.now() + (ttl > 0 ? ttl * 1000 : windowMs);
      
      return {
        success: count <= limit,
        remaining,
        reset,
      };
    } catch (err) {
      console.error('⚠️ Upstash Redis rate limiting failed, falling back to in-memory store:', err);
      // Fall through to in-memory rate limiter below
    }
  }

  // Fallback to In-Memory Limiter (ideal for local development/staging)
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record) {
    const newRecord = { count: 1, resetTime: now + windowMs };
    rateLimitStore.set(ip, newRecord);
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
export async function applyRateLimit(request: Request, limit: number, windowMs: number) {
  const ip = (request as any).ip || 
             request.headers.get("x-vercel-forwarding-ip") || 
             request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
             request.headers.get("x-real-ip") || 
             "127.0.0.1";
  const result = await rateLimit(ip, limit, windowMs);
  
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
