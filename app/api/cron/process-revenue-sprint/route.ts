import { type NextRequest, NextResponse } from 'next/server'
import { isValidCronRequest } from '@/lib/admin/auth'
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store'
import { RevenueSprintService } from '@/lib/leads/revenue-sprint-service'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 180

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized revenue sprint execution.' }, { status: 401 })
  }
  const dryRun = request.nextUrl.searchParams.get('dry') === 'true'
  const limitValue = Number.parseInt(request.nextUrl.searchParams.get('limit') || '20', 10)
  const limit = Number.isFinite(limitValue) ? Math.max(1, Math.min(20, limitValue)) : 20
  const lease = await acquireOperationLease(`revenue-sprint:${dryRun ? 'dry' : 'live'}`, 90 * 60 * 1000)
  if (!lease.acquired) {
    return NextResponse.json({ success: true, skipped: true, reason: lease.reason })
  }

  try {
    const result = await RevenueSprintService.processBatch(limit, dryRun)
    const status = result.failed > 0 ? 'PARTIAL' : 'SUCCEEDED'
    await finishOperationLease(lease, status, result)
    return NextResponse.json({ success: result.failed === 0, result }, { status: result.failed > 0 ? 502 : 200 })
  } catch (error: any) {
    await finishOperationLease(lease, 'FAILED', { error: error.message || String(error) })
    return NextResponse.json({ success: false, error: error.message || 'Revenue sprint failed.' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
