import { type NextRequest, NextResponse } from 'next/server'
import { isValidCronRequest } from '@/lib/admin/auth'
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store'
import { SocialRevenueSprintService } from '@/lib/growth-os/social-revenue-sprint'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 90

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized social revenue sprint.' }, { status: 401 })
  }
  const lease = await acquireOperationLease('social-revenue-sprint', 60 * 60 * 1000)
  if (!lease.acquired) return NextResponse.json({ success: true, skipped: true, reason: lease.reason })
  try {
    const result = await SocialRevenueSprintService.run()
    const failed = result.decision === 'PROVIDER_REJECTED'
    await finishOperationLease(lease, failed ? 'FAILED' : 'SUCCEEDED', result)
    return NextResponse.json({ success: !failed, result }, { status: failed ? 502 : 200 })
  } catch (error: any) {
    await finishOperationLease(lease, 'FAILED', { error: error.message || String(error) })
    return NextResponse.json({ success: false, error: error.message || 'Social revenue sprint failed.' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
