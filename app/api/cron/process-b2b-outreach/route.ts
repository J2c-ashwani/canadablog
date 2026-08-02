import { type NextRequest, NextResponse } from "next/server";
import { isValidCronRequest } from "@/lib/admin/auth";
import { B2BOutreachEngine } from "@/lib/leads/B2BOutreachEngine";
import { SERPERProspector } from "@/lib/leads/SERPERProspector";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const searchParams = request.nextUrl.searchParams;
  const keyParam = searchParams.get("key");

  // Allow cron-jobs.org via ?key=fsi2026admin OR Authorization: Bearer fsi2026admin OR Vercel CRON_SECRET
  const isAuthorized =
    isValidCronRequest(request) ||
    keyParam === "fsi2026admin" ||
    authHeader === `Bearer fsi2026admin` ||
    authHeader === `Bearer ${process.env.CRON_SECRET}`;

  if (!isAuthorized) {
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

    console.log(`🤖 [B2B Outreach Cron] Step 1: Running live SERPER Google Search outbound discovery...`);
    const discoveryResult = await SERPERProspector.discoverNewProspects(5).catch(err => {
      console.error("SERPER prospect discovery failed (non-blocking):", err);
      return { discoveredCount: 0, savedCount: 0, prospects: [] };
    });

    console.log(`🤖 [B2B Outreach Cron] Step 2: Triggering priority outreach batch (limit: ${limit}, force: ${force}, dry: ${dryRun})...`);
    const result = await B2BOutreachEngine.processDailyBatch(limit, dryRun, force);
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      limit,
      discovery: discoveryResult,
      result
    });
  } catch (err: any) {
    console.error("B2B outreach batch cron error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
