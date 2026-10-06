/**
 * Persistent Call Idempotency Store
 *
 * Survives process restarts, deployments, and serverless instance recycling.
 * Architecture:
 * - L1: In-memory Set (microsecond cache)
 * - L2: Persistent File Store (/tmp disk cache, survives process restarts)
 * - L3: Distributed Redis (Upstash, survives cross-serverless instance concurrency)
 */

import fs from 'fs';
import path from 'path';
import { hasOperationalRedis } from '@/lib/growth-os/redis-operations';
import { Redis } from '@upstash/redis';

// L1: In-memory Set
const memoryCache = new Set<string>();

// L2: File storage path
const PERSISTENT_FILE_PATH = path.join(
  process.env.TMPDIR || '/tmp',
  'fsi-voice-idempotency.json'
);

function readDiskCache(): Set<string> {
  try {
    if (fs.existsSync(PERSISTENT_FILE_PATH)) {
      const raw = fs.readFileSync(PERSISTENT_FILE_PATH, 'utf-8');
      const data = JSON.parse(raw);
      if (Array.isArray(data)) return new Set(data);
    }
  } catch {}
  return new Set();
}

function writeDiskCache(set: Set<string>): void {
  try {
    const list = Array.from(set).slice(-2000);
    fs.writeFileSync(PERSISTENT_FILE_PATH, JSON.stringify(list), 'utf-8');
  } catch {}
}

/**
 * Checks if a call event has already been processed.
 */
export async function isCallEventProcessed(idempotencyKey: string): Promise<boolean> {
  const normalizedKey = idempotencyKey.toLowerCase().trim();

  // L1: Memory Cache
  if (memoryCache.has(normalizedKey)) {
    return true;
  }

  // L2: Disk Cache
  const diskSet = readDiskCache();
  if (diskSet.has(normalizedKey)) {
    memoryCache.add(normalizedKey);
    return true;
  }

  // L3: Redis Cache (Upstash)
  if (hasOperationalRedis()) {
    try {
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      });
      const exists = await redis.get(`fsi:voice:idempotency:${normalizedKey}`);
      if (exists) {
        memoryCache.add(normalizedKey);
        return true;
      }
    } catch (e) {
      console.warn('⚠️ [Idempotency] Redis lookup failed, using disk/memory cache:', e);
    }
  }

  return false;
}

/**
 * Marks a call event as processed across memory, disk, and Redis.
 */
export async function markCallEventProcessed(idempotencyKey: string): Promise<void> {
  const normalizedKey = idempotencyKey.toLowerCase().trim();

  // L1: Memory
  memoryCache.add(normalizedKey);

  // L2: Disk
  const diskSet = readDiskCache();
  diskSet.add(normalizedKey);
  writeDiskCache(diskSet);

  // L3: Redis (7-day TTL)
  if (hasOperationalRedis()) {
    try {
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      });
      await redis.set(`fsi:voice:idempotency:${normalizedKey}`, Date.now(), { ex: 60 * 60 * 24 * 7 });
    } catch (e) {
      console.warn('⚠️ [Idempotency] Redis set failed:', e);
    }
  }
}

/**
 * Test helper to clear in-memory cache and test disk/persistent recovery.
 */
export function _clearMemoryCacheForTesting(): void {
  memoryCache.clear();
}
