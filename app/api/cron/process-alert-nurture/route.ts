import { type NextRequest, NextResponse } from "next/server"
import { isValidCronRequest } from "@/lib/admin/auth"
import { AlertNurtureEngine } from "@/lib/leads/AlertNurtureEngine"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized alert nurture cron execution." }, { status: 401 })
  }

  if (process.env.ENABLE_LEGACY_ALERT_NURTURE !== "true") {
    return NextResponse.json({
      success: true,
      status: "PAUSED",
      message: "Legacy alert nurture is disabled; use the current capped self-serve distribution cohorts."
    })
  }

  try {
    let limit = 5; // Safe default for Vercel Hobby timeouts
    try {
      const parsedUrl = new URL(request.url)
      const limitParam = parsedUrl.searchParams.get("limit")
      if (limitParam) {
        const parsedLimit = parseInt(limitParam, 10)
        if (!isNaN(parsedLimit) && parsedLimit > 0 && parsedLimit <= 50) {
          limit = parsedLimit
        }
      }
    } catch (e) {
      // Fallback
    }

    console.log(`🤖 [Alert Nurture Cron] Starting alert nurture batch (limit: ${limit})...`)
    const result = await AlertNurtureEngine.processDailyBatch(limit)
    
    return NextResponse.json({
      success: result.errors.length === 0,
      limit,
      result
    }, { status: result.errors.length === 0 ? 200 : 207 })
  } catch (err: any) {
    console.error("Alert nurture batch cron error:", err)
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
