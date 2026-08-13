import { type NextRequest, NextResponse } from "next/server"
import { getLeadsFromSheet, updateLeadInSheet } from "@/lib/google-sheets"
import {
  sendCartRecoveryEmail1,
  sendCartRecoveryEmail2,
  sendCartRecoveryEmail3,
} from "@/lib/emails/cart-recovery"
import { isValidCronRequest } from "@/lib/admin/auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    if (!isValidCronRequest(request)) {
      return NextResponse.json({ error: "Unauthorized cart recovery cron execution." }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const force = searchParams.get("force") === "true"

    // Asynchronous non-blocking background processing to prevent cron-job.org 30s timeout
    const { CartRecoveryService } = await import("@/lib/leads/cart-recovery-service")
    CartRecoveryService.processCartRecoveryBatch(5, force).catch((err) => console.error("Async cart recovery background error:", err))

    return NextResponse.json({
      success: true,
      message: "Cart recovery processing initiated asynchronously via CartRecoveryService.",
      mode: force ? "lifetime_force" : "standard",
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error("Cart recovery cron execution error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
