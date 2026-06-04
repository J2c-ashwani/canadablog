import { type NextRequest, NextResponse } from 'next/server';
import {
  getStrategyRecoveryRecords,
  markStrategyRecoveryEmailSent,
  type StrategyRecoveryEmailStage,
  type StrategyRecoveryRecord,
} from '@/lib/strategy-session/recovery-store';
import { sendStrategyRecoveryEmail } from '@/lib/strategy-session/recovery-emails';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const MAX_SENDS_PER_RUN = 50;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;

  if (!secret && process.env.NODE_ENV !== 'production') {
    return true;
  }

  if (!secret) {
    return false;
  }

  const authHeader = request.headers.get('authorization') || '';
  const headerSecret = request.headers.get('x-cron-secret') || '';
  const querySecret = request.nextUrl.searchParams.get('secret') || '';

  return authHeader === `Bearer ${secret}` || headerSecret === secret || querySecret === secret;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function toTime(value: string) {
  const time = new Date(value).getTime();
  return Number.isFinite(time) ? time : 0;
}

function minutesToMilliseconds(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed * 60 * 1000 : fallback * 60 * 1000;
}

function getDueStage(record: StrategyRecoveryRecord, now: number): StrategyRecoveryEmailStage | null {
  if (record.status === 'paid' || record.status === 'unsubscribed') {
    return null;
  }

  if (!isValidEmail(record.email)) {
    return null;
  }

  const createdAt = toTime(record.createdAt);
  const initialSentAt = toTime(record.initialEmailSentAt);
  const followUp24hSentAt = toTime(record.followUp24hSentAt);
  const objection3dSentAt = toTime(record.objection3dSentAt);
  const initialDelay = minutesToMilliseconds(process.env.STRATEGY_RECOVERY_INITIAL_DELAY_MINUTES, 60);

  if (!record.initialEmailSentAt && createdAt && now - createdAt >= initialDelay) {
    return 'initial';
  }

  if (record.initialEmailSentAt && !record.followUp24hSentAt && initialSentAt && now - initialSentAt >= DAY) {
    return 'value_24h';
  }

  if (record.followUp24hSentAt && !record.objection3dSentAt && initialSentAt && now - initialSentAt >= 3 * DAY) {
    return 'objection_3d';
  }

  if (record.objection3dSentAt && !record.final7dSentAt && initialSentAt && now - initialSentAt >= 7 * DAY) {
    return 'final_7d';
  }

  if (followUp24hSentAt && objection3dSentAt) {
    return null;
  }

  return null;
}

async function sendDueRecoveryEmails(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized recovery email run.' }, { status: 401 });
  }

  const records = await getStrategyRecoveryRecords();
  const now = Date.now();
  const paidEmails = new Set(
    records
      .filter((record) => record.status === 'paid' && isValidEmail(record.email))
      .map((record) => normalizeEmail(record.email)),
  );
  const latestUnpaidRecordByEmail = new Map<string, StrategyRecoveryRecord>();

  for (const record of records) {
    const email = normalizeEmail(record.email);
    if (!isValidEmail(email) || record.status === 'paid' || record.status === 'unsubscribed') {
      continue;
    }

    const current = latestUnpaidRecordByEmail.get(email);
    if (!current || toTime(record.createdAt) > toTime(current.createdAt)) {
      latestUnpaidRecordByEmail.set(email, record);
    }
  }

  const sent: Array<{ recoveryId: string; email: string; stage: StrategyRecoveryEmailStage }> = [];
  const failed: Array<{ recoveryId: string; email: string; stage: StrategyRecoveryEmailStage; error: string }> = [];
  let dueCount = 0;

  for (const record of records) {
    const email = normalizeEmail(record.email);
    if (paidEmails.has(email) || latestUnpaidRecordByEmail.get(email)?.recoveryId !== record.recoveryId) {
      continue;
    }

    const stage = getDueStage(record, now);
    if (!stage) continue;

    dueCount += 1;
    if (sent.length >= MAX_SENDS_PER_RUN) {
      continue;
    }

    const response = await sendStrategyRecoveryEmail({
      to: record.email,
      name: record.name,
      source: record.source || 'strategy-session-recovery',
      stage,
      recoveryId: record.recoveryId,
    });

    if (response.success) {
      await markStrategyRecoveryEmailSent(record, stage);
      sent.push({ recoveryId: record.recoveryId, email: record.email, stage });
    } else {
      failed.push({
        recoveryId: record.recoveryId,
        email: record.email,
        stage,
        error: response.error || (response.skipped ? 'Resend API key is not configured.' : 'Unknown send error.'),
      });
    }
  }

  return NextResponse.json({
    success: failed.length === 0,
    checked: records.length,
    due: dueCount,
    sent: sent.length,
    failed: failed.length,
    capped: dueCount > MAX_SENDS_PER_RUN,
    sentRecords: sent,
    failedRecords: failed,
  });
}

export async function GET(request: NextRequest) {
  try {
    return await sendDueRecoveryEmails(request);
  } catch (error) {
    console.error('Strategy session due recovery email error:', error);
    return NextResponse.json({ error: 'Unable to send due recovery emails.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
