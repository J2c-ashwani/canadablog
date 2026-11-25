import { NextResponse } from 'next/server'
import { CEOAgent } from '@/lib/ceo-agent/ceo-agent'
import { CEOActionRunner } from '@/lib/agents/ceo-action-runner'
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store'
import { validateCronAuth } from '@/lib/auth/cron-auth'

export const maxDuration = 120

// FSI Digital CEO OS Production Executive Route Handler (v2.1)
async function handleCEORun(req: Request) {
  try {
    const authResult = validateCronAuth(req)
    if (!authResult.authorized && authResult.response) {
      return authResult.response
    }

    const url = new URL(req.url)
    const triggerParam = url.searchParams.get('trigger') || 'cron'
    const triggerSource = ['cron', 'event', 'on_demand', 'verification'].includes(triggerParam)
      ? (triggerParam as 'cron' | 'event' | 'on_demand' | 'verification')
      : 'cron'

    // Cloud safety guarantee: if Vercel /api/ceo/run fires at 13:35 UTC (7:05 PM IST)
    // while GitHub Actions or local daemon missed Window A, execute Window A first
    // so tonight's dispatches land on time and appear inside the 7:05 PM IST brief.
    const now = new Date()
    if (triggerSource === 'cron' && now.getUTCHours() >= 13 && (now.getUTCHours() > 13 || now.getUTCMinutes() >= 30)) {
      const morningOpKey = `ceo-na-morning-push:${now.toISOString().slice(0, 10)}`
      const lease = await acquireOperationLease(morningOpKey, 20 * 60 * 60 * 1000).catch(() => null)
      if (lease?.acquired) {
        try {
          const waveReport = await CEOActionRunner.runDailyOperatingPlan({
            mode: 'live',
            maxTotalEmails: 25,
            closedLoopCap: 15,
            includeCartRecovery: true,
            cartRecoveryMax: 5,
            closedLoopOptions: {
              minOpenerWaitHours: 4,
              allowFreshReopenFollowUp: true,
              minReopenSpacingHours: 11,
              maxFollowUpsIn7d: 2,
            },
          })
          await finishOperationLease(lease, 'SUCCEEDED', waveReport.totals)
        } catch (waveErr: any) {
          await finishOperationLease(lease, 'FAILED', { error: waveErr?.message || String(waveErr) }).catch(() => {})
        }
      }
    }

    const result = await CEOAgent.runCEOLoop(triggerSource)

    const evidenceUnknown = result.scoreboard?.evidenceState === 'UNKNOWN'
    const actionFailed = result.executedActions.some((action: any) => action.status === 'FAILED')
    const success = Boolean(result.skipped || (!evidenceUnknown && !actionFailed))
    return NextResponse.json({
      success,
      runId: result.runId,
      triggerSource: result.triggerSource,
      authMethod: authResult.authMethod,
      timestamp: result.timestamp,
      scoreboard: result.scoreboard,
      pathToTarget: result.pathToTarget,
      leakageReport: result.leakageReport,
      brief: result.briefText,
      decisionBasis: result.decisionBasis,
      executedActions: result.executedActions,
      specialistReports: result.specialistReports,
      skipped: result.skipped || false,
      skipReason: result.skipReason || '',
    }, { status: success ? 200 : evidenceUnknown ? 503 : 502 })
  } catch (error: any) {
    console.error('[API /api/ceo/run] Execution error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  return handleCEORun(req)
}

export async function GET(req: Request) {
  return handleCEORun(req)
}
