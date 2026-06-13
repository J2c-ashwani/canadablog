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
    const limit = 70;
    console.log(`🤖 [Reactivation Cron] Starting daily historical reactivation batch (limit: ${limit})...`)
    const result = await HistoricalReactivationEngine.processDailyBatch(limit)
    
    return NextResponse.json({
      success: true,
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
