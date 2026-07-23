import { type NextRequest, NextResponse } from "next/server";
import { isValidCronRequest } from "@/lib/admin/auth";
import { B2BOutreachEngine } from "@/lib/leads/B2BOutreachEngine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized B2B outreach cron execution." }, { status: 401 });
  }

  try {
    let limit = 5; // Safe batch limit per execution run to respect Resend and Sheets quotas
    try {
      const parsedUrl = new URL(request.url);
      const limitParam = parsedUrl.searchParams.get("limit");
      if (limitParam) {
        const parsedLimit = parseInt(limitParam, 10);
        if (!isNaN(parsedLimit) && parsedLimit > 0 && parsedLimit <= 20) {
          limit = parsedLimit;
        }
      }
    } catch (e) {
      // fallback to default
    }

    console.log(`🤖 [B2B Outreach Cron] Triggering priority outreach batch (limit: ${limit})...`);
    const result = await B2BOutreachEngine.processDailyBatch(limit);
    
    return NextResponse.json({
      success: true,
      limit,
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
