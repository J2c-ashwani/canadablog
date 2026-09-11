import { type NextRequest, NextResponse } from "next/server"
import { isValidCronRequest } from "@/lib/admin/auth"
import { CartRecoveryService } from '@/lib/leads/cart-recovery-service'
import { acquireOperationLease, finishOperationLease, type OperationLease } from '@/lib/growth-os/operations-store'

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

export async function GET(request: NextRequest) {
  let lease: OperationLease | undefined
  try {
    if (!isValidCronRequest(request)) {
      return NextResponse.json({ error: "Unauthorized cart recovery cron execution." }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const force = searchParams.get("force") === "true"
    if (force && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ success: false, error: 'Force mode is disabled in production.' }, { status: 400 })
    }
    lease = await acquireOperationLease('cart-recovery', 10 * 60 * 1000)
    if (!lease.acquired) return NextResponse.json({ success: true, skipped: true, reason: lease.reason })
    const result = await CartRecoveryService.processCartRecoveryBatch(5, force)
    const status = result.errors.length > 0 ? 'PARTIAL' : 'SUCCEEDED'
    await finishOperationLease(lease, status, result)
    return NextResponse.json({ success: result.errors.length === 0, mode: force ? 'manual_force' : 'standard', result }, {
      status: result.errors.length > 0 ? 207 : 200,
    })
  } catch (error: any) {
    if (lease?.acquired) {
      await finishOperationLease(lease, 'FAILED', { error: error.message || 'Cart recovery failed.' })
        .catch((leaseError) => console.error('Cart recovery lease finalization failed:', leaseError))
    }
    console.error("Cart recovery cron execution error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 503, headers: { 'Retry-After': '300' } }
    )
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
