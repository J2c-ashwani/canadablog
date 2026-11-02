import { type NextRequest, NextResponse } from "next/server";
import { isValidCronRequest } from "@/lib/admin/auth";
import { MultiTouchReactivationEngine } from "@/lib/leads/MultiTouchReactivationEngine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 minutes max timeout for paced batching

export async function GET(request: NextRequest) {
  try {
    if (!isValidCronRequest(request)) {
      return NextResponse.json({ error: "Unauthorized reactivation cron execution." }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const dryRun = searchParams.get("dry") === "true" || searchParams.get("dryRun") === "true";
    const touch1Limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : undefined;
    const maxTotalLimit = searchParams.get("max") ? parseInt(searchParams.get("max")!, 10) : undefined;

    console.log(`🤖 [Reactivation Campaign Cron] Triggering multi-touch campaign run (dryRun: ${dryRun})...`);
    const result = await MultiTouchReactivationEngine.executeDailyRun({
      dryRun,
      touch1Limit,
      maxTotalLimit,
    });

    return NextResponse.json({
      success: result.success,
      result,
    }, { status: result.success ? 200 : 207 });
  } catch (err: any) {
    console.error("Reactivation campaign cron execution error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
