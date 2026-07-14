import { type NextRequest, NextResponse } from "next/server";
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository";
import {
  sendCalculatorRecoveryEmail1,
  sendCalculatorRecoveryEmail2,
  sendCalculatorRecoveryEmail3,
  sendCalculatorRecoveryEmail4,
  sendCustomerSuccessFollowup
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
    let recovery4Count = 0;
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
      if ((recovery1Count + recovery2Count + recovery3Count + recovery4Count) >= BATCH_LIMIT) {
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

      // Handle LTV Customer Success Trigger for report buyers (Task 5)
      if (sub.reportPurchased) {
        const purchaseTimeStr = sub.assessmentPurchasedAt || activity.paymentCompletedAt || sub.timestamp;
        if (purchaseTimeStr) {
          const purchaseTimeMs = new Date(purchaseTimeStr).getTime();
          if (!Number.isNaN(purchaseTimeMs)) {
            const elapsedPurchaseMs = now - purchaseTimeMs;
            // 7 days = 604,800,000 ms
            if (elapsedPurchaseMs >= 7 * 24 * 60 * 60 * 1000 && !activity.successFollowupEmailSentAt) {
              console.log(`⏱️ Triggering Customer Success Followup (7d) for: ${sub.email}`);
              const res = await sendCustomerSuccessFollowup({
                to: sub.email,
                name: sub.name,
                loginToken: sub.loginToken || ""
              });
              if (res.success || res.skipped) {
                activity.successFollowupEmailSentAt = new Date().toISOString();
                await SubscriberRepository.updateSubscriberPreferences(sub.email, {
                  leadActivity: JSON.stringify(activity)
                });
              }
            }
          }
        }
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

      // Email #1 (4 hours = 14,400,000 ms)
      if (elapsedMs >= 4 * 60 * 60 * 1000 && !activity.calcRecoveryEmail1SentAt) {
        console.log(`⏱️ Triggering Calculator Recovery #1 (4h) for: ${sub.email}`);
        
        const res = await sendCalculatorRecoveryEmail1({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || ""
        });
        if (res.success || res.skipped) {
          activity.calcRecoveryEmail1SentAt = new Date().toISOString();
          emailSent = true;
          recovery1Count++;
        }
      }
      // Email #2 (24 hours = 86,400,000 ms)
      else if (elapsedMs >= 24 * 60 * 60 * 1000 && activity.calcRecoveryEmail1SentAt && !activity.calcRecoveryEmail2SentAt) {
        console.log(`⏱️ Triggering Calculator Recovery #2 (24h) for: ${sub.email}`);
        
        // Generate report summary data dynamically for Email 2
        const report = generateFundingMatchReport({
          province: sub.region || 'on',
          industry: sub.industry || 'technology',
          revenue: sub.businessStage || 'pre-revenue',
          goal: sub.fundingPurpose || 'hiring'
        });

        const res = await sendCalculatorRecoveryEmail2({
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
          activity.calcRecoveryEmail2SentAt = new Date().toISOString();
          emailSent = true;
          recovery2Count++;
        }
      }
      // Email #3 (72 hours = 259,200,000 ms)
      else if (elapsedMs >= 72 * 60 * 60 * 1000 && activity.calcRecoveryEmail2SentAt && !activity.calcRecoveryEmail3SentAt) {
        console.log(`⏱️ Triggering Calculator Recovery #3 (72h) for: ${sub.email}`);
        
        // Fetch top program details dynamically
        const report = generateFundingMatchReport({
          province: sub.region || "on",
          industry: sub.industry || "technology",
          revenue: sub.businessStage || "pre-revenue",
          goal: sub.fundingPurpose || "hiring"
        });

        const res = await sendCalculatorRecoveryEmail3({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          provinceCode: sub.region || "on",
          industryCode: sub.industry || "technology",
          revenueCode: sub.businessStage || "pre-revenue",
          goalCode: sub.fundingPurpose || "hiring"
        });
        if (res.success || res.skipped) {
          activity.calcRecoveryEmail3SentAt = new Date().toISOString();
          emailSent = true;
          recovery3Count++;
        }
      }
      // Email #4 (168 hours = 7 days = 604,800,000 ms)
      else if (elapsedMs >= 168 * 60 * 60 * 1000 && activity.calcRecoveryEmail3SentAt && !activity.calcRecoveryEmail4SentAt) {
        console.log(`⏱️ Triggering Calculator Recovery #4 (7d) for: ${sub.email}`);
        
        const res = await sendCalculatorRecoveryEmail4({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          provinceCode: sub.region || "on",
          industryCode: sub.industry || "technology",
          revenueCode: sub.businessStage || "pre-revenue",
          goalCode: sub.fundingPurpose || "hiring"
        });
        if (res.success || res.skipped) {
          activity.calcRecoveryEmail4SentAt = new Date().toISOString();
          emailSent = true;
          recovery4Count++;
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
        calcRecovery3: recovery3Count,
        calcRecovery4: recovery4Count
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
