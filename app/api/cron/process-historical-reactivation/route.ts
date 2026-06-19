import { type NextRequest, NextResponse } from "next/server"
import { isValidCronRequest } from "@/lib/admin/auth"
import { HistoricalReactivationEngine } from "@/lib/leads/HistoricalReactivationEngine"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized reactivation cron execution." }, { status: 401 })
  }

  try {
    let limit = 5; // Safe default for Vercel Hobby (10s) and cron-job.org (30s) timeouts
    try {
      const parsedUrl = new URL(request.url)
      const limitParam = parsedUrl.searchParams.get("limit")
      if (limitParam) {
        const parsedLimit = parseInt(limitParam, 10)
        if (!isNaN(parsedLimit) && parsedLimit > 0 && parsedLimit <= 70) {
          limit = parsedLimit
        }
      }
    } catch (e) {
      // Fallback to default limit
    }

    console.log(`🤖 [Reactivation Cron] Starting historical reactivation batch (limit: ${limit})...`)
    const result = await HistoricalReactivationEngine.processDailyBatch(limit)
    
    return NextResponse.json({
      success: true,
      limit,
      result
    })
  } catch (err: any) {
    console.error("Historical reactivation batch cron error:", err)
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
