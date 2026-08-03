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
    const force = url.searchParams.get("force") === "true";

    const isAuthorized =
      isValidCronRequest(request) ||
      keyParam === "fsi2026admin" ||
      authHeader === `Bearer fsi2026admin` ||
      authHeader === `Bearer ${process.env.CRON_SECRET}`;

    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized sales blast execution." }, { status: 401 });
    }

    const allSubscribers = await SubscriberRepository.getAllSubscribers();

    const DISPOSABLE_DOMAINS = new Set([
      'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email',
      'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com', 'grr.la',
      'dispostable.com', 'trashmail.com', 'fakeinbox.com', 'maildrop.cc',
      'temp-mail.org', 'getairmail.com', 'mohmal.com', 'burnermail.io',
      'tempail.com', 'emailondeck.com', 'getnada.com', '10minutemail.com',
      'minuteinbox.com', 'tempr.email', 'discard.email', 'tmpmail.net'
    ]);

    const targets = allSubscribers.filter(sub => {
      if (!sub.email || !sub.email.includes("@")) return false;
      if (!sub.isSubscribed) return false;

      const emailDomain = sub.email.split('@')[1]?.toLowerCase();
      if (!emailDomain || DISPOSABLE_DOMAINS.has(emailDomain)) return false;

      if (sub.reportPurchased) return false;
      if (sub.offlineStatus === 'Report Buyer' || sub.offlineStatus === 'Audit Buyer') return false;

      if (force) return true;

      const hasProfile = sub.companyName && sub.companyName !== 'N/A' && sub.companyName !== '';
      const hasRegion = sub.region && sub.region !== 'N/A' && sub.region !== '';
      const hasIndustry = sub.industry && sub.industry !== 'N/A' && sub.industry !== '';

      return hasProfile || hasRegion || hasIndustry;
    });

    const pendingTargets = targets.filter(sub => {
      let activity: any = {};
      try {
        if (sub.leadActivity && sub.leadActivity !== 'N/A' && sub.leadActivity !== '{}') {
          activity = JSON.parse(sub.leadActivity);
        }
      } catch { activity = {}; }

      if (wave === "1") {
        return force || !activity.salesBlast1SentAt;
      } else {
        return activity.salesBlast1SentAt && (!activity.salesBlast2SentAt || force);
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
