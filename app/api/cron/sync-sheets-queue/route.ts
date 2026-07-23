import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db/postgres";
import { appendLeadToSheet, updateLeadInSheet } from "@/lib/google-sheets";
import { createUnsubscribeToken, createLoginToken } from "@/lib/auth/subscriber-tokens";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Validate authorization
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "No DATABASE_URL configured, skipping queue sync." }, { status: 200 });
  }

  try {
    // Fetch up to 20 unsynced subscribers to avoid Sheets API rate limit (60 req/min)
    const res = await query(
      "SELECT * FROM subscribers WHERE synced_to_sheets = false OR synced_to_sheets IS NULL LIMIT 20"
    );

    const unsynced = res.rows;
    if (unsynced.length === 0) {
      return NextResponse.json({ message: "Queue is empty. 0 leads to sync." });
    }

    let successCount = 0;
    const errors: any[] = [];

    for (const sub of unsynced) {
      try {
        let leadActivityStr = "{}";
        if (sub.lead_activity) {
          leadActivityStr = typeof sub.lead_activity === 'string' 
            ? sub.lead_activity 
            : JSON.stringify(sub.lead_activity);
        }

        const data = {
          source: "Funding Intelligence Alerts Registration",
          timestamp: sub.created_at ? new Date(sub.created_at).toISOString() : new Date().toISOString(),
          email: sub.email,
          name: sub.name || "",
          country: (sub.country === "USA" || sub.country === "US") ? "USA" : "Canada",
          state: sub.region || "ON",
          industry: sub.industry || "other",
          companySize: "1-9",
          fundingInterests: [],
          isSubscribed: sub.is_subscribed !== false,
          unsubscribeToken: createUnsubscribeToken(),
          loginToken: createLoginToken(),
          subscriptionStatus: "inactive",
          subscriptionId: "N/A",
          trialStartedAt: "N/A",
          website: "N/A",
          companyName: "N/A",
          reportPurchased: false,
          reportTransactionId: "N/A",
          strategyReportPurchased: false,
          strategyReportTransactionId: "N/A",
          lastEmailFollowup: "N/A",
          leadActivity: leadActivityStr,
          lastAttributionSource: "N/A",
          firstReportViewedAt: "N/A",
          assessmentPurchasedAt: "N/A",
          lastAlertSentAt: "N/A",
          lastAlertOpenedAt: "N/A",
          lastAlertClickedAt: "N/A",
          lastLoginAt: "N/A",
          lastDashboardViewAt: "N/A",
          lastPortfolioViewAt: "N/A",
          lastAlertClickAt: "N/A",
          leadTier: "N/A",
          subscriptionCancelledAt: "N/A",
          cancellationReason: "N/A",
          engagementScore: 100,
          lastOpenedAt: "N/A",
          lastClickedAt: "N/A",
        };

        // Try updating first. If email not found in sheet, append a new row
        let syncResult = await updateLeadInSheet(sub.email, data);
        if (!syncResult.success && syncResult.error === "Not found") {
          await appendLeadToSheet(data);
          syncResult = { success: true };
        }

        if (syncResult.success) {
          await query("UPDATE subscribers SET synced_to_sheets = true WHERE email = $1", [sub.email]);
          successCount++;
        } else {
          errors.push({ email: sub.email, error: syncResult.error });
        }
      } catch (err: any) {
        console.error(`Failed to sync lead ${sub.email} during cron task:`, err);
        errors.push({ email: sub.email, error: err.message || err });
      }
    }

    return NextResponse.json({
      message: `Successfully synchronized ${successCount} of ${unsynced.length} queue items.`,
      successCount,
      totalProcessed: unsynced.length,
      errors
    });
  } catch (err: any) {
    console.error("Critical error in sync-sheets-queue cron route:", err);
    return NextResponse.json({ error: err.message || err }, { status: 500 });
  }
}
