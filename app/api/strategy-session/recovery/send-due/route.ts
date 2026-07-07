import { type NextRequest, NextResponse } from 'next/server';
import {
  getStrategyRecoveryRecords,
  markStrategyRecoveryEmailSent,
  upsertStrategyRecoveryEvent,
  type StrategyRecoveryEmailStage,
  type StrategyRecoveryRecord,
} from '@/lib/strategy-session/recovery-store';
import { sendStrategyRecoveryEmail } from '@/lib/strategy-session/recovery-emails';
import { isValidCronRequest } from '@/lib/admin/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_SENDS_PER_RUN = 50;


// Uses isValidCronRequest from @/lib/admin/auth — same pattern as all cron routes.
// Register on cron-job.org (NOT Vercel cron). Recommended: every 30 minutes.
// URL: https://www.fsidigital.ca/api/strategy-session/recovery/send-due?secret=CRON_SECRET
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

// ── FLOW NOTE ────────────────────────────────────────────────────────────────
// The checkout flow is: Pay $199 first → then /booking page unlocks Calendly.
// A Calendly booking (calendlyEventUri) therefore always implies payment is done.
// We NEVER provisionally hold a Calendly slot before payment, so there is no
// need to auto-cancel a booking or use an aggressive 15/40min recovery timeline.
// All unpaid leads follow the relaxed timeline below.
// ─────────────────────────────────────────────────────────────────────────────

function isSent(val?: string | null) {
  if (!val) return false;
  const s = val.trim().toLowerCase();
  return s !== '' && s !== 'n/a' && s !== '0' && s !== 'false';
}

function getDueAction(record: StrategyRecoveryRecord, now: number): { action: 'email' | null; stage?: StrategyRecoveryEmailStage } {
  // Skip paid or opted-out leads
  if (record.status === 'paid' || record.status === 'unsubscribed') {
    return { action: null };
  }

  const createdAt = toTime(record.createdAt);
  if (!createdAt) {
    return { action: null };
  }

  const elapsed = now - createdAt;

  // Email #4 (final_7d) — 7 days after shown event
  if (elapsed >= 7 * 24 * 60 * 60 * 1000) {
    if (isSent(record.objection3dSentAt) && !isSent(record.final7dSentAt)) {
      return { action: 'email', stage: 'final_7d' };
    }
  }

  // Email #3 (objection_3d) — 3 days after shown event
  if (elapsed >= 3 * 24 * 60 * 60 * 1000) {
    if (isSent(record.followUp24hSentAt) && !isSent(record.objection3dSentAt)) {
      return { action: 'email', stage: 'objection_3d' };
    }
  }

  // Email #2 (value_24h) — 4 hours after shown event
  if (elapsed >= 4 * 60 * 60 * 1000) {
    if (isSent(record.initialEmailSentAt) && !isSent(record.followUp24hSentAt)) {
      return { action: 'email', stage: 'value_24h' };
    }
  }

  // Email #1 (initial) — 30 minutes after shown event
  if (elapsed >= 30 * 60 * 1000) {
    if (!isSent(record.initialEmailSentAt)) {
      return { action: 'email', stage: 'initial' };
    }
  }

  return { action: null };
}

async function sendDueRecoveryEmails(request: NextRequest) {
  if (!isValidCronRequest(request)) {
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

    const { action, stage } = getDueAction(record, now);
    if (!action) continue;

    if (action === 'email' && stage) {
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
        // bookedAt is intentionally omitted: under the new Pay-First flow, Calendly is
        // only booked AFTER payment, so an unpaid recovery record never has a booking.
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
  }

  return NextResponse.json({
    success: failed.length === 0,
    checked: records.length,
    due: dueCount,
    sent: sent.length,
    failed: failed.length,
    sentRecords: sent,
    failedRecords: failed,
  });
}

export async function GET(request: NextRequest) {
  try {
    return await sendDueRecoveryEmails(request);
  } catch (error) {
    console.error('Strategy session due recovery email error:', error);
    return NextResponse.json({ error: 'Unable to process due recovery emails/cancellations.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
