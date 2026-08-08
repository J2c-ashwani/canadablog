import { type NextRequest, NextResponse } from "next/server";
import { isValidCronRequest } from "@/lib/admin/auth";
import { HistoricalReactivationEngine } from "@/lib/leads/HistoricalReactivationEngine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    if (!isValidCronRequest(request)) {
      return NextResponse.json({ error: "Unauthorized reactivation cron execution." }, { status: 401 });
    }

    let limit = 10;
    try {
      const limitParam = searchParams.get("limit");
      if (limitParam) {
        const parsedLimit = parseInt(limitParam, 10);
        if (!isNaN(parsedLimit) && parsedLimit > 0 && parsedLimit <= 70) {
          limit = parsedLimit;
        }
      }
    } catch (e) {
      // Fallback
    }

    console.log(`🤖 [Reactivation Cron] Starting historical reactivation batch (limit: ${limit})...`);
    const result = await HistoricalReactivationEngine.processDailyBatch(limit);
    
    return NextResponse.json({
      success: true,
      limit,
      result
    });
  } catch (err: any) {
    console.error("Historical reactivation batch cron error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
