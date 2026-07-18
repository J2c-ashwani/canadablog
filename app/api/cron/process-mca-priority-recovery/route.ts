// app/api/cron/process-mca-priority-recovery/route.ts
// Polling engine that manages the timed Priority Recovery email sequences.
// Run periodically (e.g. every hour) to scan applications, verify elapsed thresholds against sheets,
// send Resend alerts, and update the sheets CRM.

import { type NextRequest, NextResponse } from "next/server";
import {
  getMCAApplications,
  getMCAConfig,
  updateMCAApplicationRecovery,
  appendMCAActivityLog,
} from "@/lib/mca/sheets";
import {
  sendMCARecoveryEmail1,
  sendMCARecoveryEmail2,
  sendMCARecoveryEmail3,
  sendMCARecoveryEmail4,
  sendMCARecoveryEmail5,
} from "@/lib/emails/mca-recovery";
import { isValidCronRequest } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // 1. Authorization check
    if (!isValidCronRequest(request)) {
      return NextResponse.json({ error: "Unauthorized MCA recovery cron execution." }, { status: 401 });
    }

    console.log("🏁 Starting MCA Priority Processing Recovery Cron Job...");

    // 2. Fetch Config & Timing Delays
    const config = await getMCAConfig();
    const delay1 = parseFloat(config['Recovery Stage 1 Delay (Hours)'] || '1') * 60 * 60 * 1000;
    const delay2 = parseFloat(config['Recovery Stage 2 Delay (Hours)'] || '6') * 60 * 60 * 1000;
    const delay3 = parseFloat(config['Recovery Stage 3 Delay (Hours)'] || '24') * 60 * 60 * 1000;
    const delay4 = parseFloat(config['Recovery Stage 4 Delay (Hours)'] || '72') * 60 * 60 * 1000;
    const delay5 = parseFloat(config['Recovery Stage 5 Delay (Hours)'] || '168') * 60 * 60 * 1000;

    // 3. Load Applications
    const applications = await getMCAApplications(2000);
    const now = Date.now();
    const BATCH_LIMIT = 5;
    let sentCount = 0;
    let skippedCount = 0;

    for (const app of applications) {
      // Skip if they already purchased Priority Processing
      if (app.priorityProcessing || app.recoveryPurchased) {
        skippedCount++;
        continue;
      }

      // Check if sequence is finished or cancelled
      if (app.priorityRecoveryStatus === 'COMPLETED' || app.priorityRecoveryStatus === 'CANCELLED') {
        skippedCount++;
        continue;
      }

      if (sentCount >= BATCH_LIMIT) {
        skippedCount++;
        continue;
      }

      const elapsed = now - new Date(app.timestamp).getTime();
      const lastSentTime = app.lastRecoveryEmail ? new Date(app.lastRecoveryEmail).getTime() : 0;
      const elapsedSinceLastEmail = now - lastSentTime;

      let emailSent = false;
      const status = app.priorityRecoveryStatus ?? 'ACTIVE';

      // --- Stage 1 (1 hour delay) ---
      if ((status === 'ACTIVE' || status === 'NONE') && elapsed >= delay1) {
        console.log(`✉️ Triggering MCA Recovery Email 1 (1h) for application ${app.applicationId}`);
        const res = await sendMCARecoveryEmail1({
          to: app.email,
          name: app.ownerName,
          recoveryToken: app.recoveryToken,
        });

        if (res.success || res.skipped) {
          const sentTime = new Date().toISOString();
          await updateMCAApplicationRecovery(app.applicationId, {
            priorityRecoveryStatus: 'EMAIL_1_SENT',
            recoveryStage: 'EMAIL_1',
            recoveryEmail1Sent: sentTime,
            lastRecoveryEmail: sentTime,
          });
          
          await appendMCAActivityLog({
            timestamp: sentTime,
            applicationId: app.applicationId,
            email: app.email,
            event: 'mca_recovery_email_1_sent',
          }).catch(() => {});

          emailSent = true;
        }
      }

      // --- Stage 2 (6 hours delay) ---
      else if (status === 'EMAIL_1_SENT' && elapsed >= delay2 && elapsedSinceLastEmail >= 2 * 60 * 60 * 1000) {
        console.log(`✉️ Triggering MCA Recovery Email 2 (6h) for application ${app.applicationId}`);
        const res = await sendMCARecoveryEmail2({
          to: app.email,
          name: app.ownerName,
          recoveryToken: app.recoveryToken,
        });

        if (res.success || res.skipped) {
          const sentTime = new Date().toISOString();
          await updateMCAApplicationRecovery(app.applicationId, {
            priorityRecoveryStatus: 'EMAIL_2_SENT',
            recoveryStage: 'EMAIL_2',
            recoveryEmail2Sent: sentTime,
            lastRecoveryEmail: sentTime,
          });

          await appendMCAActivityLog({
            timestamp: sentTime,
            applicationId: app.applicationId,
            email: app.email,
            event: 'mca_recovery_email_2_sent',
          }).catch(() => {});

          emailSent = true;
        }
      }

      // --- Stage 3 (24 hours delay) ---
      else if (status === 'EMAIL_2_SENT' && elapsed >= delay3 && elapsedSinceLastEmail >= 12 * 60 * 60 * 1000) {
        console.log(`✉️ Triggering MCA Recovery Email 3 (24h) for application ${app.applicationId}`);
        const res = await sendMCARecoveryEmail3({
          to: app.email,
          name: app.ownerName,
          recoveryToken: app.recoveryToken,
        });

        if (res.success || res.skipped) {
          const sentTime = new Date().toISOString();
          await updateMCAApplicationRecovery(app.applicationId, {
            priorityRecoveryStatus: 'EMAIL_3_SENT',
            recoveryStage: 'EMAIL_3',
            recoveryEmail3Sent: sentTime,
            lastRecoveryEmail: sentTime,
          });

          await appendMCAActivityLog({
            timestamp: sentTime,
            applicationId: app.applicationId,
            email: app.email,
            event: 'mca_recovery_email_3_sent',
          }).catch(() => {});

          emailSent = true;
        }
      }

      // --- Stage 4 (3 days delay) ---
      else if (status === 'EMAIL_3_SENT' && elapsed >= delay4 && elapsedSinceLastEmail >= 24 * 60 * 60 * 1000) {
        console.log(`✉️ Triggering MCA Recovery Email 4 (3d) for application ${app.applicationId}`);
        const res = await sendMCARecoveryEmail4({
          to: app.email,
          name: app.ownerName,
          recoveryToken: app.recoveryToken,
        });

        if (res.success || res.skipped) {
          const sentTime = new Date().toISOString();
          await updateMCAApplicationRecovery(app.applicationId, {
            priorityRecoveryStatus: 'EMAIL_4_SENT',
            recoveryStage: 'EMAIL_4',
            recoveryEmail4Sent: sentTime,
            lastRecoveryEmail: sentTime,
          });

          await appendMCAActivityLog({
            timestamp: sentTime,
            applicationId: app.applicationId,
            email: app.email,
            event: 'mca_recovery_email_4_sent',
          }).catch(() => {});

          emailSent = true;
        }
      }

      // --- Stage 5 (7 days delay - Final notice) ---
      else if (status === 'EMAIL_4_SENT' && elapsed >= delay5 && elapsedSinceLastEmail >= 24 * 60 * 60 * 1000) {
        console.log(`✉️ Triggering MCA Recovery Email 5 (7d) for application ${app.applicationId}`);
        const res = await sendMCARecoveryEmail5({
          to: app.email,
          name: app.ownerName,
          recoveryToken: app.recoveryToken,
        });

        if (res.success || res.skipped) {
          const sentTime = new Date().toISOString();
          await updateMCAApplicationRecovery(app.applicationId, {
            priorityRecoveryStatus: 'COMPLETED', // Complete active recovery polling
            recoveryStage: 'COMPLETED',
            recoveryEmail5Sent: sentTime,
            lastRecoveryEmail: sentTime,
          });

          await appendMCAActivityLog({
            timestamp: sentTime,
            applicationId: app.applicationId,
            email: app.email,
            event: 'mca_recovery_email_5_sent_sequence_completed',
          }).catch(() => {});

          emailSent = true;
        }
      }

      if (emailSent) {
        sentCount++;
      } else {
        skippedCount++;
      }
    }

    console.log(`🏁 MCA Recovery Cron complete. Sent: ${sentCount}, Skipped/Active: ${skippedCount}`);
    return NextResponse.json({ success: true, processed: sentCount, skipped: skippedCount }, { status: 200 });

  } catch (error) {
    console.error("MCA Priority Recovery Cron error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Cron processing aborted." }, { status: 500 });
  }
}
