import { NextResponse } from 'next/server'
import { CEOAgent } from '@/lib/ceo-agent/ceo-agent'
import { validateCronAuth } from '@/lib/auth/cron-auth'

export async function handleCEORun(req: Request) {
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

    const result = await CEOAgent.runCEOLoop(triggerSource)

    return NextResponse.json({
      success: true,
      runId: result.runId,
      triggerSource: result.triggerSource,
      authMethod: authResult.authMethod,
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
