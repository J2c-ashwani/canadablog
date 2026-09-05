import { createHash } from 'crypto';
import { Redis } from '@upstash/redis';

const PREFIX = 'fsi:growthos:v1';
const RUN_INDEX_KEY = `${PREFIX}:runs`;
const EVENT_INDEX_KEY = `${PREFIX}:events`;
const CRITICAL_EVENT_INDEX_KEY = `${PREFIX}:events:critical`;
const TELEMETRY_INDEX_KEY = `${PREFIX}:telemetry`;
const CRITICAL_TELEMETRY_INDEX_KEY = `${PREFIX}:telemetry:critical`;
const RETENTION_SECONDS = 180 * 24 * 60 * 60;
const EVENT_RETENTION_MS = 120 * 24 * 60 * 60 * 1000;
const TELEMETRY_RETENTION_MS = 120 * 24 * 60 * 60 * 1000;
const RUN_RETENTION_MS = RETENTION_SECONDS * 1000;
const REDIS_MGET_CHUNK_SIZE = 200;
const REDIS_MGET_CONCURRENCY = 5;
const MAX_OPERATION_RUNS_READ = 5_000;
const MAX_GENERAL_ACTION_EVENTS_READ = 5_000;
const MAX_CRITICAL_ACTION_EVENTS_READ = 20_000;
const MAX_GENERAL_TELEMETRY_EVENTS_READ = 10_000;
const MAX_CRITICAL_TELEMETRY_EVENTS_READ = 30_000;

export type RedisOperationRun = {
  attemptId: string;
  operation: string;
  startedAt: string;
  status: string;
  completedAt: string;
  summary: string;
};

let redisClient: Redis | null | undefined;

function configured() {
  if (process.env.DISABLE_REDIS === 'true') return false;
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL
    && process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

export function hasOperationalRedis() {
  return configured();
}

function redis() {
  if (!configured()) return null;
  if (redisClient === undefined) {
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
      readYourWrites: true,
    });
  }
  return redisClient;
}

function operationKey(operation: string) {
  const digest = createHash('sha256').update(operation).digest('hex').slice(0, 32);
  return `${PREFIX}:lease:${digest}`;
}

function runKey(attemptId: string) {
  return `${PREFIX}:run:${attemptId}`;
}

function eventKey(eventId: string) {
  const digest = createHash('sha256').update(eventId).digest('hex');
  return `${PREFIX}:event:${digest}`;
}

function telemetryKey(eventId: string) {
  return `${PREFIX}:telemetry-event:${eventId}`;
}

async function chunkedMget<T>(client: Redis, keys: string[]): Promise<Array<T | null>> {
  const values: Array<T | null> = [];
  const batchSize = REDIS_MGET_CHUNK_SIZE * REDIS_MGET_CONCURRENCY;
  for (let offset = 0; offset < keys.length; offset += batchSize) {
    const batch = keys.slice(offset, offset + batchSize);
    const chunks: string[][] = [];
    for (let chunkOffset = 0; chunkOffset < batch.length; chunkOffset += REDIS_MGET_CHUNK_SIZE) {
      chunks.push(batch.slice(chunkOffset, chunkOffset + REDIS_MGET_CHUNK_SIZE));
    }
    const batchValues = await Promise.all(
      chunks.map((chunk) => client.mget<Array<T | null>>(...chunk))
    );
    values.push(...batchValues.flat());
  }
  return values;
}

async function getNewestIndexMembers(client: Redis, indexKey: string, limit: number) {
  const count = Math.max(1, Math.floor(limit));
  return client.zrange<string[]>(indexKey, -count, -1);
}

async function persistRun(run: RedisOperationRun) {
  const client = redis();
  if (!client) throw new Error('Operational Redis is not configured.');
  await Promise.all([
    client.set(runKey(run.attemptId), run, { ex: RETENTION_SECONDS }),
    client.zadd(RUN_INDEX_KEY, { score: new Date(run.startedAt).getTime(), member: run.attemptId }),
    client.expire(RUN_INDEX_KEY, RETENTION_SECONDS),
  ]);
}

export async function acquireRedisOperationLease(input: {
  attemptId: string;
  operation: string;
  startedAt: string;
  dedupeWindowMs: number;
}) {
  const client = redis();
  if (!client) throw new Error('Operational Redis is not configured.');
  const leaseKey = operationKey(input.operation);
  const result = await client.set(leaseKey, input.attemptId, {
    nx: true,
    px: Math.max(1_000, input.dedupeWindowMs),
  });
  const acquired = result === 'OK';
  const owner = acquired ? input.attemptId : String(await client.get(leaseKey) || 'another attempt');
  const completedAt = acquired ? '' : new Date().toISOString();
  await persistRun({
    attemptId: input.attemptId,
    operation: input.operation,
    startedAt: input.startedAt,
    status: acquired ? 'RUNNING' : 'SKIPPED_DUPLICATE',
    completedAt,
    summary: acquired ? '' : `Lease already owned by ${owner}`,
  });
  await client.zremrangebyscore(RUN_INDEX_KEY, 0, Date.now() - RUN_RETENTION_MS);
  return { acquired, owner };
}

export async function finishRedisOperationLease(input: {
  attemptId: string;
  operation: string;
  startedAt: string;
  status: 'SUCCEEDED' | 'PARTIAL' | 'FAILED';
  summary: string;
}) {
  const client = redis();
  if (!client) throw new Error('Operational Redis is not configured.');
  await persistRun({
    attemptId: input.attemptId,
    operation: input.operation,
    startedAt: input.startedAt,
    status: input.status,
    completedAt: new Date().toISOString(),
    summary: input.summary,
  });
}

export async function getRedisOperationRunRows(): Promise<string[][]> {
  const client = redis();
  if (!client) return [];
  const attemptIds = await getNewestIndexMembers(client, RUN_INDEX_KEY, MAX_OPERATION_RUNS_READ);
  if (!attemptIds.length) return [];
  const runs = await chunkedMget<RedisOperationRun>(client, attemptIds.map((attemptId) => runKey(String(attemptId))));
  return runs
    .filter((run): run is RedisOperationRun => Boolean(run?.attemptId))
    .sort((left, right) => new Date(left.startedAt).getTime() - new Date(right.startedAt).getTime())
    .map((run) => [
      run.attemptId,
      run.operation,
      run.startedAt,
      run.status,
      run.completedAt,
      run.summary,
    ]);
}

export async function persistRedisGrowthActionEvent<T extends {
  eventId: string;
  occurredAt: string;
  eventType?: string;
}>(event: T): Promise<T> {
  const client = redis();
  if (!client) throw new Error('Operational Redis is not configured.');
  const key = eventKey(event.eventId);
  const stored = await client.set(key, event, {
    nx: true,
    ex: Math.ceil(EVENT_RETENTION_MS / 1000),
  });
  const durableEvent = stored === 'OK' ? event : ((await client.get<T>(key)) || event);
  const indexWrites: Array<Promise<unknown>> = [
    client.zadd(EVENT_INDEX_KEY, {
      score: new Date(durableEvent.occurredAt).getTime(),
      member: durableEvent.eventId,
    }),
  ];
  if (durableEvent.eventType && durableEvent.eventType !== 'click') {
    indexWrites.push(
      client.zadd(CRITICAL_EVENT_INDEX_KEY, {
        score: new Date(durableEvent.occurredAt).getTime(),
        member: durableEvent.eventId,
      }),
    );
  }
  // Lazy index pruning to prevent quota burnout
  if (Math.random() < 0.02) {
    indexWrites.push(
      client.expire(EVENT_INDEX_KEY, Math.ceil(EVENT_RETENTION_MS / 1000)),
      client.zremrangebyscore(EVENT_INDEX_KEY, 0, Date.now() - EVENT_RETENTION_MS),
    );
    if (durableEvent.eventType && durableEvent.eventType !== 'click') {
      indexWrites.push(
        client.expire(CRITICAL_EVENT_INDEX_KEY, Math.ceil(EVENT_RETENTION_MS / 1000)),
        client.zremrangebyscore(CRITICAL_EVENT_INDEX_KEY, 0, Date.now() - EVENT_RETENTION_MS),
      );
    }
  }
  await Promise.all(indexWrites);
  return durableEvent;
}

export async function getRedisGrowthActionEvents<T extends { eventId: string }>(): Promise<T[]> {
  const client = redis();
  if (!client) return [];
  const [generalEventIds, criticalEventIds] = await Promise.all([
    getNewestIndexMembers(client, EVENT_INDEX_KEY, MAX_GENERAL_ACTION_EVENTS_READ),
    getNewestIndexMembers(client, CRITICAL_EVENT_INDEX_KEY, MAX_CRITICAL_ACTION_EVENTS_READ),
  ]);
  const eventIds = [...new Set([...generalEventIds, ...criticalEventIds])];
  if (!eventIds.length) return [];
  const events = await chunkedMget<T>(client, eventIds.map((eventId) => eventKey(String(eventId))));
  return events.filter((event): event is T => Boolean(event?.eventId));
}

export async function persistRedisTelemetryEvent<T extends {
  eventName?: string;
  trafficQualityClassification?: string;
}>(eventId: string, event: T): Promise<void> {
  const client = redis();
  if (!client) throw new Error('Operational Redis is not configured.');
  const timestamp = new Date((event as { timestamp?: string }).timestamp || '').getTime();
  const score = Number.isFinite(timestamp) ? timestamp : Date.now();
  const indexWrites: Array<Promise<unknown>> = [
    client.set(telemetryKey(eventId), event, {
      nx: true,
      ex: Math.ceil(TELEMETRY_RETENTION_MS / 1000),
    }),
    client.zadd(TELEMETRY_INDEX_KEY, { score, member: eventId }),
  ];
  const eventName = String(event.eventName || '');
  const isCritical = event.trafficQualityClassification === 'High Confidence Human'
    || /(?:checkout|purchase|payment|paypal|subscription)/i.test(eventName);
  if (isCritical) {
    indexWrites.push(
      client.zadd(CRITICAL_TELEMETRY_INDEX_KEY, { score, member: eventId }),
    );
  }
  // Lazy index pruning (approx. 1% of writes) to eliminate command bloat
  if (Math.random() < 0.01) {
    indexWrites.push(
      client.expire(TELEMETRY_INDEX_KEY, Math.ceil(TELEMETRY_RETENTION_MS / 1000)),
      client.zremrangebyscore(TELEMETRY_INDEX_KEY, 0, Date.now() - TELEMETRY_RETENTION_MS),
    );
    if (isCritical) {
      indexWrites.push(
        client.expire(CRITICAL_TELEMETRY_INDEX_KEY, Math.ceil(TELEMETRY_RETENTION_MS / 1000)),
        client.zremrangebyscore(CRITICAL_TELEMETRY_INDEX_KEY, 0, Date.now() - TELEMETRY_RETENTION_MS),
      );
    }
  }
  await Promise.all(indexWrites);
}

export async function getRedisTelemetryEvents<T>(): Promise<T[]> {
  const client = redis();
  if (!client) return [];
  const [generalEventIds, criticalEventIds] = await Promise.all([
    getNewestIndexMembers(client, TELEMETRY_INDEX_KEY, MAX_GENERAL_TELEMETRY_EVENTS_READ),
    getNewestIndexMembers(client, CRITICAL_TELEMETRY_INDEX_KEY, MAX_CRITICAL_TELEMETRY_EVENTS_READ),
  ]);
  const eventIds = [...new Set([...generalEventIds, ...criticalEventIds])];
  if (!eventIds.length) return [];
  const events = await chunkedMget<T>(client, eventIds.map((eventId) => telemetryKey(String(eventId))));
  return events.filter((event): event is T => Boolean(event));
}
