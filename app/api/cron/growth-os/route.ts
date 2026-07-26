import { type NextRequest, NextResponse } from "next/server"
import { GrowthOSKernel } from "@/lib/growth-os/core/growth-kernel"
import { isValidCronRequest } from "@/lib/admin/auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const searchParams = request.nextUrl.searchParams
    const keyParam = searchParams.get("key")

    // Allow cron-jobs.org via ?key=fsi2026admin OR Authorization: Bearer fsi2026admin OR Vercel CRON_SECRET
    const isAuthorized =
      isValidCronRequest(request) ||
      keyParam === "fsi2026admin" ||
      authHeader === `Bearer fsi2026admin` ||
      authHeader === `Bearer ${process.env.CRON_SECRET}`

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized Growth OS Cron execution. Access denied." },
        { status: 401 }
      )
    }

    console.log(`[GrowthOSCron] Executing master growth loop via cron-jobs.org trigger...`)
    
    // Execute Growth OS Daily Loop
    const kernelResult = await GrowthOSKernel.executeDailyGrowthLoop()

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: "Growth OS Master Cron Loop executed successfully across all 7 channels.",
      kernelResult,
    })
  } catch (error: any) {
    console.error("[GrowthOSCron] Error executing master growth loop:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to execute Growth OS Cron" },
      { status: 500 }
    )
  }
}
