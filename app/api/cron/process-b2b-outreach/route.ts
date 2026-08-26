import { type NextRequest, NextResponse } from "next/server";
import { isValidCronRequest } from "@/lib/admin/auth";
import { B2BOutreachEngine } from "@/lib/leads/B2BOutreachEngine";
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized B2B outreach cron execution." }, { status: 401 });
  }

  try {
    let limit = 5; // Safe batch limit per execution run to respect Resend and Sheets quotas
    try {
      const limitParam = searchParams.get("limit");
      if (limitParam) {
        const parsedLimit = parseInt(limitParam, 10);
        if (!isNaN(parsedLimit) && parsedLimit > 0 && parsedLimit <= 20) {
          limit = parsedLimit;
        }
      }
    } catch (e) {
      // fallback to default
    }

    const force = searchParams.get("force") === "true";
    const dryRun = searchParams.get("dry") === "true";
    if (force && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ success: false, error: 'Force mode is disabled in production.' }, { status: 400 });
    }

    const lease = await acquireOperationLease(`b2b-outreach:${dryRun ? 'dry' : 'live'}`, 30 * 60 * 1000);
    if (!lease.acquired) return NextResponse.json({ success: true, skipped: true, reason: lease.reason });

    console.log(`🤖 [B2B Outreach Cron] Processing only consented CRM subscribers (limit: ${limit}, force: ${force}, dry: ${dryRun})...`);
    const result = await B2BOutreachEngine.processDailyBatch(limit, dryRun, force);
    const failed = result.errors.length > 0;
    await finishOperationLease(lease, failed ? 'PARTIAL' : 'SUCCEEDED', result);
    
    return NextResponse.json({
      success: !failed,
      timestamp: new Date().toISOString(),
      limit,
      result
    }, { status: failed ? 502 : 200 });
  } catch (err: any) {
    console.error("B2B outreach batch cron error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
