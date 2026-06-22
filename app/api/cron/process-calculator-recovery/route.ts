import { type NextRequest, NextResponse } from "next/server";
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository";
import {
  sendCalculatorRecoveryEmail1,
  sendCalculatorRecoveryEmail2,
  sendCalculatorRecoveryEmail3
} from "@/lib/emails/calculator-recovery";
import { generateFundingMatchReport } from "@/lib/products/report-generator";
import { isValidCronRequest } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    if (!isValidCronRequest(request)) {
      return NextResponse.json({ error: "Unauthorized calculator recovery cron execution." }, { status: 401 });
    }

    const subscribers = await SubscriberRepository.getAllSubscribers();
    const now = Date.now();

    let recovery1Count = 0;
    let recovery2Count = 0;
    let recovery3Count = 0;
    let skippedCount = 0;

    const BATCH_LIMIT = 5;
    const MAX_RECOVERY_AGE_MS = 10 * 24 * 60 * 60 * 1000; // 10 days

    for (const sub of subscribers) {
      if (!sub.email || !sub.email.includes("@")) {
        skippedCount++;
        continue;
      }
      if (!sub.isSubscribed) {
        skippedCount++;
        continue;
      }

      // Check batch limit to prevent timeout
      if ((recovery1Count + recovery2Count + recovery3Count) >= BATCH_LIMIT) {
        skippedCount++;
        continue;
      }

      // Parse activity JSON safely
      let activity: any = {};
      try {
        if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
          activity = JSON.parse(sub.leadActivity);
        }
      } catch (e) {
        // ignore
      }

      // Skip if already purchased report
      if (sub.reportPurchased) {
        skippedCount++;
        continue;
      }

      // Skip if they started checkout (they are in the Cart Recovery sequence instead)
      if (activity.checkoutStartedAt) {
        skippedCount++;
        continue;
      }

      // Determine calculator completion timestamp
      const compTimeStr = activity.calculatorCompletedAt || sub.timestamp;
      if (!compTimeStr) {
        skippedCount++;
        continue;
      }

      const compTimeMs = new Date(compTimeStr).getTime();
      if (Number.isNaN(compTimeMs)) {
        skippedCount++;
        continue;
      }

      const elapsedMs = now - compTimeMs;

      // Skip very old leads to prevent spamming historical data and avoid timeouts
      if (elapsedMs > MAX_RECOVERY_AGE_MS) {
        skippedCount++;
        continue;
      }

      let emailSent = false;

      // Email #1 (24 hours = 86,400,000 ms)
      if (elapsedMs >= 24 * 60 * 60 * 1000 && !activity.calcRecoveryEmail1SentAt) {
        console.log(`⏱️ Triggering Calculator Recovery #1 for: ${sub.email}`);
        
        // Generate report summary data dynamically for Email 1
        const report = generateFundingMatchReport({
          province: sub.region || 'on',
          industry: sub.industry || 'technology',
          revenue: sub.businessStage || 'pre-revenue',
          goal: sub.fundingPurpose || 'hiring'
        });

        const res = await sendCalculatorRecoveryEmail1({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          province: report.profile.provinceName,
          industry: report.profile.industryName,
          revenue: report.profile.revenueName,
          goal: report.profile.goalName,
          estimatedMin: report.summary.estimatedTotalMin,
          estimatedMax: report.summary.estimatedTotalMax
        });
        if (res.success || res.skipped) {
          activity.calcRecoveryEmail1SentAt = new Date().toISOString();
          emailSent = true;
          recovery1Count++;
        }
      }
      // Email #2 (72 hours = 259,200,000 ms)
      else if (elapsedMs >= 72 * 60 * 60 * 1000 && activity.calcRecoveryEmail1SentAt && !activity.calcRecoveryEmail2SentAt) {
        console.log(`⏱️ Triggering Calculator Recovery #2 for: ${sub.email}`);
        const res = await sendCalculatorRecoveryEmail2({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          provinceCode: sub.region || "on",
          industryCode: sub.industry || "technology",
          revenueCode: sub.businessStage || "pre-revenue",
          goalCode: sub.fundingPurpose || "hiring"
        });
        if (res.success || res.skipped) {
          activity.calcRecoveryEmail2SentAt = new Date().toISOString();
          emailSent = true;
          recovery2Count++;
        }
      }
      // Email #3 (120 hours = 432,000,000 ms)
      else if (elapsedMs >= 120 * 60 * 60 * 1000 && activity.calcRecoveryEmail2SentAt && !activity.calcRecoveryEmail3SentAt) {
        console.log(`⏱️ Triggering Calculator Recovery #3 for: ${sub.email}`);
        const res = await sendCalculatorRecoveryEmail3({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || ""
        });
        if (res.success || res.skipped) {
          activity.calcRecoveryEmail3SentAt = new Date().toISOString();
          emailSent = true;
          recovery3Count++;
        }
      }

      if (emailSent) {
        await SubscriberRepository.updateSubscriberPreferences(sub.email, {
          leadActivity: JSON.stringify(activity)
        });
      } else {
        skippedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      processed: subscribers.length,
      sent: {
        calcRecovery1: recovery1Count,
        calcRecovery2: recovery2Count,
        calcRecovery3: recovery3Count
      },
      skipped: skippedCount
    });
  } catch (error: any) {
    console.error("Calculator recovery cron execution error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
