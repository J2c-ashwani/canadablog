import { type NextRequest, NextResponse } from 'next/server'
import { isValidCronRequest } from '@/lib/admin/auth'
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store'
import { RevenueHunterEngine } from '@/lib/revenue-hunter/hunter-engine'
import type { ProductOfferTier } from '@/lib/revenue-hunter/models/expected-revenue'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 180

/**
 * FSI Digital Autonomous Revenue Hunter Micro-Cohort Execution Route
 * Enforces:
 * 1. Header-only fail-closed cron authentication (RFC 6750 Bearer or x-cron-secret)
 * 2. Strict unit-economics qualification gate per lead
 * 3. Default batch size strictly 3 leads per CEO Directive
 * 4. Reputation circuit breaker protecting domain deliverability
 */
export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized revenue hunter execution.' }, { status: 401 })
  }

  const dryRun = request.nextUrl.searchParams.get('dry') === 'true'
  const limitValue = Number.parseInt(request.nextUrl.searchParams.get('limit') || '3', 10)
  // Strictly bounded to 3-5 leads per CEO directive
  const limit = Number.isFinite(limitValue) ? Math.max(1, Math.min(5, limitValue)) : 3
  const filterTier = (request.nextUrl.searchParams.get('tier') as ProductOfferTier) || undefined

  const lease = await acquireOperationLease(`revenue-hunter:${dryRun ? 'dry' : 'live'}`, 90 * 60 * 1000)
  if (!lease.acquired) {
    return NextResponse.json({ success: true, skipped: true, reason: lease.reason })
  }

  try {
    const result = await RevenueHunterEngine.executeCohortHunt(limit, filterTier, dryRun)
    const isCircuitBreakerTripped = Boolean(result.circuitBreakerStatus)
    const status = result.errors.length > 0 && !isCircuitBreakerTripped ? 'PARTIAL' : isCircuitBreakerTripped ? 'PAUSED' : 'SUCCEEDED'

    await finishOperationLease(lease, status as any, result)

    return NextResponse.json({
      success: result.errors.length === 0,
      dryRun,
      limit,
      cohortId: result.cohortId,
      dispatchedCount: result.dispatchedCount,
      receipts: result.receipts,
      circuitBreakerStatus: result.circuitBreakerStatus,
      errors: result.errors,
    }, { status: result.errors.length === 0 ? 200 : isCircuitBreakerTripped ? 200 : 502 })
  } catch (error: any) {
    await finishOperationLease(lease, 'FAILED', { error: error.message || String(error) })
    return NextResponse.json({ success: false, error: error.message || 'Revenue hunter execution failed.' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
