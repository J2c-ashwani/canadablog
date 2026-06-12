import { type NextRequest, NextResponse } from 'next/server';
import {
  getStrategyRecoveryRecords,
  markStrategyRecoveryEmailSent,
  upsertStrategyRecoveryEvent,
  type StrategyRecoveryEmailStage,
  type StrategyRecoveryRecord,
} from '@/lib/strategy-session/recovery-store';
import { sendStrategyRecoveryEmail } from '@/lib/strategy-session/recovery-emails';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

function extractCalendlyUuid(uri: string) {
  if (!uri) return '';
  if (uri.startsWith('http')) {
    const parts = uri.split('/');
    return parts[parts.length - 1];
  }
  return uri;
}

async function cancelCalendlyEvent(eventUri: string): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.CALENDLY_API_TOKEN || process.env.CALENDY_API_TOKEN;
  if (!apiKey) {
    return { success: false, error: 'CALENDLY_API_TOKEN is not configured.' };
  }

  const uuid = extractCalendlyUuid(eventUri);
  if (!uuid) {
    return { success: false, error: `Invalid Calendly event URI: ${eventUri}` };
  }

  try {
    const response = await fetch(`https://api.calendly.com/scheduled_events/${uuid}/cancellation`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reason: 'Research deposit payment not completed within the 60-minute reservation window.'
      })
    });

    if (!response.ok) {
      const text = await response.text();
      return { success: false, error: `Calendly API error: ${response.status} - ${text}` };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Unknown network error.' };
  }
}

async function trackGA4AutoCancelled(email: string, gaClientId: string) {
  const gaApiSecret = process.env.GA_API_SECRET;
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-DZ55NMNLYM';

  if (!gaClientId || gaClientId === 'N/A' || !gaApiSecret) {
    console.warn('[GA4 Auto-Cancelled] Skipped: Client ID or API Secret missing.', { gaClientId, hasSecret: !!gaApiSecret });
    return;
  }

  try {
    const response = await fetch(`https://www.google-analytics.com/mp/collect?api_secret=${gaApiSecret}&measurement_id=${gaMeasurementId}`, {
      method: 'POST',
      body: JSON.stringify({
        client_id: gaClientId,
        events: [{
          name: 'booking_auto_cancelled',
          params: {
            engagement_time_msec: '100',
            email_lookup_hint: email,
          }
        }]
      })
    });
    console.log(`[GA4 Auto-Cancelled] Event sent. Status: ${response.status}`);
  } catch (err) {
    console.error('❌ Failed to dispatch GA4 auto-cancelled event:', err);
  }
}

function getDueAction(record: StrategyRecoveryRecord, now: number): { action: 'email' | 'cancel' | null; stage?: StrategyRecoveryEmailStage } {
  if (record.status === 'paid' || record.status === 'unsubscribed') {
    return { action: null };
  }

  const createdAt = toTime(record.createdAt);
  if (!createdAt) {
    return { action: null };
  }

  const elapsed = now - createdAt;

  // 1. Email #2 (value_24h) - 4 hours
  if (elapsed >= 4 * 60 * 60 * 1000) {
    if (record.initialEmailSentAt && !record.followUp24hSentAt) {
      return { action: 'email', stage: 'value_24h' };
    }
  }

  // 2. Cancellation - 60 minutes
  if (elapsed >= 60 * 60 * 1000) {
    const isCancelled = record.reason.includes('calendly_cancelled');
    if (!isCancelled && record.calendlyEventUri) {
      return { action: 'cancel' };
    }
  }

  // 3. Email #1 (initial) - 30 minutes
  if (elapsed >= 30 * 60 * 1000) {
    if (!record.initialEmailSentAt) {
      return { action: 'email', stage: 'initial' };
    }
  }

  return { action: null };
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
  const cancelled: Array<{ recoveryId: string; email: string; eventUri: string }> = [];
  const cancellationFailed: Array<{ recoveryId: string; email: string; eventUri: string; error: string }> = [];
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
        bookedAt: toTime(record.createdAt),
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
    } else if (action === 'cancel') {
      const eventUri = record.calendlyEventUri;
      console.log(`[Auto-Cancellation] Canceling Calendly event for recovery ID ${record.recoveryId}: ${eventUri}`);

      const cancelResponse = await cancelCalendlyEvent(eventUri);
      if (cancelResponse.success) {
        const updatedReason = record.reason
          ? `${record.reason}, calendly_cancelled_60m`
          : 'calendly_cancelled_60m';

        await upsertStrategyRecoveryEvent({
          recoveryId: record.recoveryId,
          event: 'abandoned',
          reason: updatedReason,
        });

        if (record.gaClientId && record.gaClientId !== 'N/A') {
          await trackGA4AutoCancelled(record.email, record.gaClientId);
        }

        cancelled.push({ recoveryId: record.recoveryId, email: record.email, eventUri });
      } else {
        console.error(`[Auto-Cancellation] Failed to cancel event for recovery ID ${record.recoveryId}: ${cancelResponse.error}`);
        const isPermanentError = cancelResponse.error?.includes('404') || cancelResponse.error?.includes('410');
        if (isPermanentError) {
          const updatedReason = record.reason
            ? `${record.reason}, calendly_cancelled_failed_permanent`
            : 'calendly_cancelled_failed_permanent';
          await upsertStrategyRecoveryEvent({
            recoveryId: record.recoveryId,
            event: 'abandoned',
            reason: updatedReason,
          });
        }

        cancellationFailed.push({
          recoveryId: record.recoveryId,
          email: record.email,
          eventUri,
          error: cancelResponse.error || 'Unknown error'
        });
      }
    }
  }

  return NextResponse.json({
    success: failed.length === 0 && cancellationFailed.length === 0,
    checked: records.length,
    due: dueCount,
    sent: sent.length,
    failed: failed.length,
    cancelled: cancelled.length,
    cancellationFailed: cancellationFailed.length,
    sentRecords: sent,
    failedRecords: failed,
    cancelledRecords: cancelled,
    cancellationFailedRecords: cancellationFailed
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
