import { type NextRequest, NextResponse } from 'next/server';
import { isValidCronRequest } from '@/lib/admin/auth';
import {
  appendMCAActivityLog,
  getMCAApplications,
  getMCAConfig,
  updateMCAApplicationRecovery,
} from '@/lib/mca/sheets';
import { sendMCARecoveryEmail1, sendMCARecoveryEmail2 } from '@/lib/emails/mca-recovery';
import { buildEmailActionContext, getGrowthActionEvents } from '@/lib/growth-os/action-attribution';
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 180;

const BATCH_LIMIT = 5;
const MIN_STAGE_1_HOURS = 24;
const MIN_STAGE_2_HOURS = 72;
const RECOVERY_TOKEN = /^mca_rec_[a-f0-9]{32}$/;
const TERMINAL_APPLICATION_STATUSES = new Set(['Approved', 'Declined', 'Funded', 'Closed']);
const RETIRED_SEQUENCE_STATUSES = new Set(['EMAIL_2_SENT', 'EMAIL_3_SENT', 'EMAIL_4_SENT', 'EMAIL_5_SENT']);

function dateValue(value: unknown) {
  const parsed = new Date(String(value || '')).getTime();
  return Number.isFinite(parsed) ? parsed : 0;
}

function configuredDelayHours(value: string | undefined, minimum: number) {
  const parsed = Number.parseFloat(String(value || ''));
  return Number.isFinite(parsed) ? Math.max(minimum, parsed) : minimum;
}

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized MCA recovery cron execution.' }, { status: 401 });
  }

  const lease = await acquireOperationLease('mca-priority-recovery', 90 * 60 * 1000);
  if (!lease.acquired) {
    return NextResponse.json({ success: true, skipped: true, reason: lease.reason });
  }

  try {
    const [config, applications, actionEvents] = await Promise.all([
      getMCAConfig(),
      getMCAApplications(2000),
      getGrowthActionEvents(),
    ]);
    const stage1DelayMs = configuredDelayHours(
      config['Recovery Stage 1 Delay (Hours)'],
      MIN_STAGE_1_HOURS,
    ) * 60 * 60 * 1000;
    const stage2DelayMs = configuredDelayHours(
      config['Recovery Stage 2 Delay (Hours)'],
      MIN_STAGE_2_HOURS,
    ) * 60 * 60 * 1000;
    const now = Date.now();
    let attempted = 0;
    let providerAccepted = 0;
    let reconciledAcceptances = 0;
    let completed = 0;
    let failed = 0;
    let skipped = 0;

    const acceptedEvent = (tagType: string, email: string) => {
      const context = buildEmailActionContext(tagType, email);
      if (!context.recipientId) return undefined;
      return actionEvents.find((event) =>
        event.eventType === 'provider_accepted'
        && event.campaign === context.campaign
        && event.recipientId === context.recipientId
        && Boolean(event.providerMessageId)
      );
    };

    for (const application of applications) {
      const status = String(application.priorityRecoveryStatus || 'ACTIVE');
      if (application.priorityProcessing
        || application.recoveryPurchased
        || ['COMPLETED', 'CANCELLED'].includes(status)
        || TERMINAL_APPLICATION_STATUSES.has(String(application.applicationStatus || ''))) {
        skipped++;
        continue;
      }
      if (RETIRED_SEQUENCE_STATUSES.has(status)) {
        await updateMCAApplicationRecovery(application.applicationId, {
          priorityRecoveryStatus: 'COMPLETED',
          recoveryStage: 'COMPLETED',
        });
        completed++;
        continue;
      }
      if (!application.consent
        || !application.consentToShare
        || !/^\S+@\S+\.\S+$/.test(String(application.email || ''))
        || !RECOVERY_TOKEN.test(String(application.recoveryToken || ''))) {
        skipped++;
        continue;
      }
      const createdAt = dateValue(application.timestamp);
      if (!createdAt || createdAt > now) {
        skipped++;
        continue;
      }

      const isStage1 = ['ACTIVE', 'NONE', '', 'CHECKOUT_STARTED'].includes(status)
        && now - createdAt >= stage1DelayMs;
      const isStage2 = status === 'EMAIL_1_SENT'
        && now - createdAt >= stage2DelayMs
        && now - dateValue(application.lastRecoveryEmail) >= 24 * 60 * 60 * 1000;
      if (!isStage1 && !isStage2) {
        skipped++;
        continue;
      }
      if (attempted >= BATCH_LIMIT) {
        skipped++;
        continue;
      }

      const stage = isStage1 ? 1 : 2;
      const tagType = `mca-recovery-email${stage}`;
      const previousAcceptance = acceptedEvent(tagType, application.email);
      const acceptedAt = previousAcceptance?.occurredAt || new Date().toISOString();
      if (!previousAcceptance) {
        attempted++;
        const result = stage === 1
          ? await sendMCARecoveryEmail1({
              to: application.email,
              name: application.ownerName,
              recoveryToken: application.recoveryToken,
            })
          : await sendMCARecoveryEmail2({
              to: application.email,
              name: application.ownerName,
              recoveryToken: application.recoveryToken,
            });
        if (!result.success || !result.providerMessageId) {
          failed++;
          continue;
        }
        providerAccepted++;
      } else {
        reconciledAcceptances++;
      }

      const finalStage = stage === 2;
      const updated = await updateMCAApplicationRecovery(application.applicationId, {
        priorityRecoveryStatus: finalStage ? 'COMPLETED' : 'EMAIL_1_SENT',
        recoveryStage: finalStage ? 'COMPLETED' : 'EMAIL_1',
        recoveryEmail1Sent: stage === 1 ? acceptedAt : application.recoveryEmail1Sent,
        recoveryEmail2Sent: stage === 2 ? acceptedAt : application.recoveryEmail2Sent,
        lastRecoveryEmail: acceptedAt,
      });
      if (!updated) {
        failed++;
        continue;
      }
      if (finalStage) completed++;
      await appendMCAActivityLog({
        timestamp: acceptedAt,
        applicationId: application.applicationId,
        email: application.email,
        event: finalStage
          ? 'mca_recovery_email_2_provider_accepted_sequence_completed'
          : 'mca_recovery_email_1_provider_accepted',
        metadata: { providerAccepted: true, stage },
      }).catch(() => {});
    }

    const summary = {
      applications: applications.length,
      attempted,
      providerAccepted,
      reconciledAcceptances,
      completed,
      failed,
      skipped,
      batchLimit: BATCH_LIMIT,
      stages: 2,
    };
    await finishOperationLease(lease, failed > 0 ? 'PARTIAL' : 'SUCCEEDED', summary);
    return NextResponse.json(
      { success: failed === 0, result: summary },
      { status: failed > 0 ? 502 : 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'MCA recovery processing failed.';
    await finishOperationLease(lease, 'FAILED', { error: message });
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
