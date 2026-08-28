import { type NextRequest, NextResponse } from 'next/server'
import { isValidCronRequest } from '@/lib/admin/auth'
import { collectGrowthOSEvidence } from '@/lib/growth-os/evidence-metrics'
import { GrowthTools } from '@/lib/ceo-agent/tools/growth-tools'
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store'
import { sendEmail } from '@/lib/emails/mailer'
import { reconcileResendDeliveryEvents } from '@/lib/emails/resend-reconciliation'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 120

function escapeHtml(value: unknown) {
  return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized Growth OS health execution.' }, { status: 401 })
  }
  const lease = await acquireOperationLease('growth-os-health', 30 * 60 * 1000)
  if (!lease.acquired) return NextResponse.json({ success: true, skipped: true, reason: lease.reason })

  try {
    let resendReconciliation: Awaited<ReturnType<typeof reconcileResendDeliveryEvents>> | { skipped: true; reason: string; eligible: number; matched: number; persisted: number }
    try {
      resendReconciliation = await reconcileResendDeliveryEvents()
    } catch (error: any) {
      console.error('Resend delivery reconciliation failed without blocking GrowthOS health:', error)
      resendReconciliation = {
        skipped: true,
        reason: error?.message || 'Resend delivery reconciliation failed',
        eligible: 0,
        matched: 0,
        persisted: 0,
      }
    }
    const [evidence, pipeline] = await Promise.all([collectGrowthOSEvidence(), GrowthTools.getGrowthOSStatus()])
    const critical = pipeline.orphanedStagesDetected.filter((item) => item.severity === 'P0')
    const status = evidence.evidenceState === 'UNKNOWN' || critical.length > 0
      ? 'FAILED'
      : pipeline.orphanedStagesDetected.length > 0 || evidence.evidenceState === 'PARTIAL' ? 'DEGRADED' : 'HEALTHY'
    const issues = pipeline.orphanedStagesDetected.map((item) =>
      `<li><strong>${escapeHtml(item.severity)} · ${escapeHtml(item.stage)}:</strong> ${escapeHtml(item.issue)}</li>`
    ).join('') || '<li>No evidence-backed pipeline failures detected.</li>'
    const html = `
      <div style="font-family:Arial,sans-serif;background:#0f172a;color:#e2e8f0;padding:24px;line-height:1.55">
        <h2>GrowthOS evidence health — ${escapeHtml(new Date().toISOString().slice(0, 10))}</h2>
        <p><strong>Status:</strong> ${escapeHtml(status)} · Evidence: ${escapeHtml(evidence.evidenceState)}</p>
        <h3>Revenue truth</h3>
        <ul>
          <li>Verified MTD revenue: $${evidence.revenue.mtdVerifiedUSD.toFixed(2)} USD + $${evidence.revenue.mtdVerifiedCAD.toFixed(2)} CAD (reported separately)</li>
          <li>Verified MRR: $${evidence.revenue.verifiedMRRUSD.toFixed(2)} USD (${evidence.revenue.activeMemberships} active memberships)</li>
          <li>Provider-verified purchase records: ${evidence.revenue.verifiedPurchaseRecords}</li>
        </ul>
        <h3>30-day funnel</h3>
        <ul>
          <li>Leads: ${evidence.funnel.newLeads30d}; unique measured sessions: ${evidence.funnel.uniqueSessions30d}</li>
          <li>Checkout starts: ${evidence.funnel.checkoutStarts30d}; verified purchases: ${evidence.funnel.providerVerifiedPurchases30d}</li>
          <li>Provider-accepted outreach: ${pipeline.dispatchedEmailsCount}; verified deliveries: ${pipeline.deliveredEmailsCount}; replies: ${pipeline.repliesCount}</li>
        </ul>
        <h3>Failures and evidence gaps</h3><ul>${issues}</ul>
      </div>`
    const report = await sendEmail({
      to: process.env.GROWTH_OS_REPORT_EMAIL || 'ashwani@fsidigital.ca',
      subject: `GrowthOS ${status} — verified MRR $${evidence.revenue.verifiedMRRUSD.toFixed(2)}`,
      html,
      text: `GrowthOS ${status}. Evidence ${evidence.evidenceState}. MTD revenue $${evidence.revenue.mtdVerifiedUSD} USD + $${evidence.revenue.mtdVerifiedCAD} CAD. MRR $${evidence.revenue.verifiedMRRUSD} USD.`,
      tagType: 'growth-os-health',
    })
    const reportAccepted = Boolean(report.success && report.providerMessageId)
    const finalStatus = status === 'HEALTHY' && reportAccepted ? 'SUCCEEDED' : status === 'FAILED' ? 'FAILED' : 'PARTIAL'
    await finishOperationLease(lease, finalStatus, { status, evidence, resendReconciliation, reportAccepted, reportProviderMessageId: report.providerMessageId || '' })
    const success = status !== 'FAILED' && reportAccepted
    return NextResponse.json({ success, status, evidence, pipeline, resendReconciliation, reportAccepted }, { status: success ? 200 : 502 })
  } catch (error: any) {
    await finishOperationLease(lease, 'FAILED', { error: error.message || String(error) })
    return NextResponse.json({ success: false, error: error.message || 'Growth OS health failed.' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) { return GET(request) }
