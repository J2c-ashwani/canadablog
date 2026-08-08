import { NextResponse, type NextRequest } from "next/server";
import { getOutreachProspectsFromSheet, updateOutreachProspectInSheet } from "@/lib/google-sheets";
import { sendEmail } from "@/lib/emails/mailer";
import { isValidCronRequest } from "@/lib/admin/auth";
import { AuthorityEngine } from "@/lib/growth-os/authority/authority-engine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Helper to escape HTML characters
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Check if current time is within North Star business hours (9:00 AM - 5:00 PM Eastern Time, Mon-Fri)
function isNorthStarBusinessHours(): { isHours: boolean; reason: string } {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      hour12: false,
      weekday: "short"
    });
    const parts = formatter.formatToParts(new Date());
    
    let hourStr = "";
    let weekdayStr = "";
    for (const part of parts) {
      if (part.type === "hour") hourStr = part.value;
      if (part.type === "weekday") weekdayStr = part.value;
    }
    
    const hour = parseInt(hourStr, 10);
    const isWeekend = weekdayStr === "Sat" || weekdayStr === "Sun";
    const isHours = hour >= 9 && hour < 17 && !isWeekend;
    
    return {
      isHours,
      reason: `Eastern Time: ${weekdayStr} ${hour}:00 (Target: Mon-Fri 9:00-17:00)`
    };
  } catch (e) {
    return { isHours: true, reason: "Intl check failed, default to true" };
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized cron execution." }, { status: 401 });
  }

  try {
    const force = searchParams.get("force") === "true";
    const dryRun = searchParams.get("dryRun") === "true";
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 1;

    // Use Authority Engine pipeline for dispatching with full guardrails and dynamic scheduling
    console.log(`[Outreach Cron] Delegating execution to Authority Engine (limit: ${limit}, force: ${force}, dryRun: ${dryRun})...`);

    const result = await AuthorityEngine.executePipeline({
      dryRun,
      forceOutsideHours: force,
      maxSends: limit,
      discoveryEnabled: true
    });

    return NextResponse.json({
      success: true,
      engine: "Authority Engine (Phase 3)",
      result
    });

  } catch (error: any) {
    console.error("❌ Error in outreach cron endpoint:", error);
    return NextResponse.json({ error: "Internal Server Error", details: String(error) }, { status: 500 });
  }
}
