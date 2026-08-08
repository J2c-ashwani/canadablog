import { NextResponse } from 'next/server'
import { CEOAgent } from '@/lib/ceo-agent/ceo-agent'

export async function handleCEORun(req: Request) {
  try {
    const url = new URL(req.url)
    const triggerParam = url.searchParams.get('trigger') || 'cron'
    const secretParam = url.searchParams.get('secret')
    const authHeader = req.headers.get('authorization')

    // Validate CRON_SECRET if configured (supports HTTP Authorization header OR ?secret= query parameter for cron-job.org)
    if (process.env.CRON_SECRET) {
      const isHeaderValid = authHeader === `Bearer ${process.env.CRON_SECRET}`
      const isSecretParamValid = secretParam === process.env.CRON_SECRET

      if (!isHeaderValid && !isSecretParamValid) {
        return NextResponse.json({ error: 'Unauthorized: Invalid CRON_SECRET' }, { status: 401 })
      }
    }

    const triggerSource = ['cron', 'event', 'on_demand', 'verification'].includes(triggerParam)
      ? (triggerParam as 'cron' | 'event' | 'on_demand' | 'verification')
      : 'cron'

    const result = await CEOAgent.runCEOLoop(triggerSource)

    return NextResponse.json({
      success: true,
      runId: result.runId,
      triggerSource: result.triggerSource,
      timestamp: result.timestamp,
      scoreboard: result.scoreboard,
      pathToTarget: result.pathToTarget,
      leakageReport: result.leakageReport,
      brief: result.briefText,
      decisionBasis: result.decisionBasis,
      executedActions: result.executedActions
    })
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
