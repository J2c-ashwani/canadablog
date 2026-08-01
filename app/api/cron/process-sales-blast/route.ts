import { type NextRequest, NextResponse } from "next/server";
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository";
import { sendSalesBlast1, sendSalesBlast2 } from "@/lib/emails/sales-blast";
import { isValidCronRequest } from "@/lib/admin/auth";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const keyParam = url.searchParams.get("key");
    const authHeader = request.headers.get("authorization");
    const wave = url.searchParams.get("wave") || "1"; // "1" = Monday blast, "2" = Wednesday follow-up
    const limit = parseInt(url.searchParams.get("limit") || "50", 10);
    const dryRun = url.searchParams.get("dry") === "true";

    const isAuthorized =
      isValidCronRequest(request) ||
      keyParam === "fsi2026admin" ||
      authHeader === `Bearer fsi2026admin` ||
      authHeader === `Bearer ${process.env.CRON_SECRET}`;

    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized sales blast execution." }, { status: 401 });
    }

    const allSubscribers = await SubscriberRepository.getAllSubscribers();

    // Filter: subscribed, has email, has used calculator or tools, has NOT purchased a report
    const targets = allSubscribers.filter(sub => {
      if (!sub.email || !sub.email.includes("@")) return false;
      if (!sub.isSubscribed) return false;

      // Skip if already purchased a report
      if (sub.reportPurchased) return false;
      if (sub.offlineStatus === 'Report Buyer' || sub.offlineStatus === 'Audit Buyer') return false;

      // Must have some profile data (used calculator/tool)
      const hasProfile = sub.companyName && sub.companyName !== 'N/A' && sub.companyName !== '';
      const hasRegion = sub.region && sub.region !== 'N/A' && sub.region !== '';
      const hasIndustry = sub.industry && sub.industry !== 'N/A' && sub.industry !== '';

      return hasProfile || hasRegion || hasIndustry;
    });

    // Check activity for blast tracking
    const pendingTargets = targets.filter(sub => {
      let activity: any = {};
      try {
        if (sub.leadActivity && sub.leadActivity !== 'N/A' && sub.leadActivity !== '{}') {
          activity = JSON.parse(sub.leadActivity);
        }
      } catch { activity = {}; }

      if (wave === "1") {
        return !activity.salesBlast1SentAt;
      } else {
        // Wave 2: Only send to people who received wave 1 but haven't been sent wave 2
        return activity.salesBlast1SentAt && !activity.salesBlast2SentAt;
      }
    });

    const batch = pendingTargets.slice(0, limit);

    if (dryRun) {
      return NextResponse.json({
        success: true,
        dryRun: true,
        wave,
        totalSubscribers: allSubscribers.length,
        qualifiedTargets: targets.length,
        pendingTargets: pendingTargets.length,
        batchSize: batch.length,
        sampleEmails: batch.slice(0, 10).map(s => ({
          email: s.email,
          name: s.name,
          company: s.companyName,
          region: s.region,
          industry: s.industry
        }))
      });
    }

    let sentCount = 0;
    let errorCount = 0;

    for (const sub of batch) {
      try {
        const params = {
          to: sub.email,
          name: sub.name,
          companyName: sub.companyName,
          region: sub.region,
          industry: sub.industry,
          loginToken: sub.loginToken
        };

        const result = wave === "1"
          ? await sendSalesBlast1(params)
          : await sendSalesBlast2(params);

        if (result.success || result.skipped) {
          // Update activity tracking
          let activity: any = {};
          try {
            if (sub.leadActivity && sub.leadActivity !== 'N/A' && sub.leadActivity !== '{}') {
              activity = JSON.parse(sub.leadActivity);
            }
          } catch { activity = {}; }

          if (wave === "1") {
            activity.salesBlast1SentAt = new Date().toISOString();
          } else {
            activity.salesBlast2SentAt = new Date().toISOString();
          }

          await SubscriberRepository.updateSubscriberPreferences(sub.email, {
            leadActivity: JSON.stringify(activity)
          });

          sentCount++;
        }
      } catch (err) {
        console.error(`❌ Sales blast wave ${wave} failed for ${sub.email}:`, err);
        errorCount++;
      }

      // Rate limit: 200ms between emails to avoid throttling
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    return NextResponse.json({
      success: true,
      wave,
      totalSubscribers: allSubscribers.length,
      qualifiedTargets: targets.length,
      pendingTargets: pendingTargets.length,
      sent: sentCount,
      errors: errorCount,
      remaining: pendingTargets.length - batch.length
    });
  } catch (error: any) {
    console.error("Sales blast execution error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
