import { type NextRequest, NextResponse } from 'next/server'
import { GrowthOSKernel } from '@/lib/growth-os/core/growth-kernel'
import { isValidCronRequest } from '@/lib/admin/auth'
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 120

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) return NextResponse.json({ error: 'Unauthorized Growth OS execution.' }, { status: 401 })
  if (process.env.GROWTH_OS_MULTICHANNEL_ENABLED !== 'true') {
    return NextResponse.json({
      success: false,
      disabled: true,
      error: 'Legacy seven-channel publishing is disabled until every configured provider passes authentication and delivery checks. Use /api/cron/growth-os-health for the evidence health loop.',
    }, { status: 503 })
  }
  const lease = await acquireOperationLease('growth-os-multichannel', 60 * 60 * 1000)
  if (!lease.acquired) return NextResponse.json({ success: true, skipped: true, reason: lease.reason })
  try {
    const kernelResult = await GrowthOSKernel.executeDailyGrowthLoop()
    const statuses = Object.values(kernelResult?.multiChannelReceipt?.channelStatusSummary || {})
    const accepted = statuses.filter((status) => status === 'LIVE_PUBLISHED' || status === 'API_ACCEPTED').length
    const failed = statuses.filter((status) => status === 'FAILED').length
    const success = Boolean(kernelResult && statuses.length > 0 && failed === 0 && accepted > 0)
    await finishOperationLease(lease, success ? 'SUCCEEDED' : 'FAILED', { statuses, accepted, failed })
    return NextResponse.json({ success, kernelResult, statuses, accepted, failed }, { status: success ? 200 : 502 })
  } catch (error: any) {
    await finishOperationLease(lease, 'FAILED', { error: error.message || String(error) })
    return NextResponse.json({ success: false, error: error.message || 'Growth OS multichannel execution failed.' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) { return GET(request) }
