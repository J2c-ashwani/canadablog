import { type NextRequest, NextResponse } from "next/server"
import { isValidCronRequest } from "@/lib/admin/auth"
import { CartRecoveryService } from '@/lib/leads/cart-recovery-service'
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store'

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

export async function GET(request: NextRequest) {
  try {
    if (!isValidCronRequest(request)) {
      return NextResponse.json({ error: "Unauthorized cart recovery cron execution." }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const force = searchParams.get("force") === "true"
    if (force && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ success: false, error: 'Force mode is disabled in production.' }, { status: 400 })
    }
    const lease = await acquireOperationLease('cart-recovery', 10 * 60 * 1000)
    if (!lease.acquired) return NextResponse.json({ success: true, skipped: true, reason: lease.reason })
    const result = await CartRecoveryService.processCartRecoveryBatch(5, force)
    const status = result.errors.length > 0 ? 'PARTIAL' : 'SUCCEEDED'
    await finishOperationLease(lease, status, result)
    return NextResponse.json({ success: result.errors.length === 0, mode: force ? 'manual_force' : 'standard', result }, {
      status: result.errors.length > 0 ? 502 : 200,
    })
  } catch (error: any) {
    console.error("Cart recovery cron execution error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
