import fs from 'fs'
import path from 'path'
import { query } from '../db/postgres'

export interface CEOExperiment {
  id: string
  hypothesis: string
  funnel_stage: number // 1 to 10
  baseline_metric: number
  target_metric: number
  action_taken: string
  observation_window_hours: number
  actual_result_metric: number | null
  revenue_recovered_usd: number
  attribution_confidence: 'HIGH' | 'MEDIUM' | 'LOW'
  verdict: 'SCALE' | 'ABANDON' | 'ITERATE' | 'IN_PROGRESS'
  created_at: string
  completed_at: string | null
}

const FALLBACK_EXP_PATH = path.join(process.cwd(), 'reports', 'ceo-experiments-fallback.json')

function loadFallbackExperiments(): CEOExperiment[] {
  if (!fs.existsSync(FALLBACK_EXP_PATH)) {
    return []
  }
  try {
    const data = fs.readFileSync(FALLBACK_EXP_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    return []
  }
}

function saveFallbackExperiments(experiments: CEOExperiment[]) {
  const dir = path.dirname(FALLBACK_EXP_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(FALLBACK_EXP_PATH, JSON.stringify(experiments, null, 2))
}

export class CEOExperimentEngine {
  public static async registerExperiment(params: {
    hypothesis: string
    funnel_stage: number
    baseline_metric: number
    target_metric: number
    action_taken: string
    observation_window_hours?: number
  }): Promise<CEOExperiment> {
    const id = `exp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    const experiment: CEOExperiment = {
      id,
      hypothesis: params.hypothesis,
      funnel_stage: params.funnel_stage,
      baseline_metric: params.baseline_metric,
      target_metric: params.target_metric,
      action_taken: params.action_taken,
      observation_window_hours: params.observation_window_hours || 72,
      actual_result_metric: null,
      revenue_recovered_usd: 0,
      attribution_confidence: 'MEDIUM',
      verdict: 'IN_PROGRESS',
      created_at: new Date().toISOString(),
      completed_at: null
    }

    if (process.env.DATABASE_URL) {
      try {
        await query(
          `INSERT INTO ceo_experiments (
            id, hypothesis, funnel_stage, baseline_metric, target_metric, action_taken,
            observation_window_hours, verdict, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
          [
            experiment.id,
            experiment.hypothesis,
            experiment.funnel_stage,
            experiment.baseline_metric,
            experiment.target_metric,
            experiment.action_taken,
            experiment.observation_window_hours,
            experiment.verdict
          ]
        )
      } catch (err) {
        console.warn('[CEOExperimentEngine] DB insert failed, using fallback:', err)
      }
    }

    const experiments = loadFallbackExperiments()
    experiments.unshift(experiment)
    saveFallbackExperiments(experiments)

    console.log(`[CEOExperimentEngine] 🧪 Registered Experiment ${experiment.id}: "${experiment.hypothesis}"`)
    return experiment
  }

  public static async evaluateExperimentOutcome(
    experimentId: string,
    actualResultMetric: number,
    revenueRecoveredUSD: number,
    attributionConfidence: 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM'
  ): Promise<CEOExperiment | null> {
    const experiments = loadFallbackExperiments()
    const exp = experiments.find((e) => e.id === experimentId)
    if (!exp) {
      console.warn(`[CEOExperimentEngine] Experiment ${experimentId} not found`)
      return null
    }

    exp.actual_result_metric = actualResultMetric
    exp.revenue_recovered_usd = revenueRecoveredUSD
    exp.attribution_confidence = attributionConfidence
    exp.completed_at = new Date().toISOString()

    // Determine verdict
    const metricImprovement = actualResultMetric - exp.baseline_metric
    const targetImprovement = exp.target_metric - exp.baseline_metric

    if (metricImprovement >= targetImprovement * 0.8) {
      exp.verdict = 'SCALE'
    } else if (metricImprovement > 0) {
      exp.verdict = 'ITERATE'
    } else {
      exp.verdict = 'ABANDON'
    }

    if (process.env.DATABASE_URL) {
      try {
        await query(
          `UPDATE ceo_experiments SET
            actual_result_metric = $1,
            revenue_recovered_usd = $2,
            attribution_confidence = $3,
            verdict = $4,
            completed_at = NOW()
          WHERE id = $5`,
          [exp.actual_result_metric, exp.revenue_recovered_usd, exp.attribution_confidence, exp.verdict, exp.id]
        )
      } catch (err) {
        console.warn('[CEOExperimentEngine] DB update failed:', err)
      }
    }

    saveFallbackExperiments(experiments)
    console.log(`[CEOExperimentEngine] 📊 Evaluated ${exp.id}: Verdict=${exp.verdict}, Recovered=$${exp.revenue_recovered_usd}`)
    return exp
  }

  public static async getActiveExperiments(): Promise<CEOExperiment[]> {
    const experiments = loadFallbackExperiments()
    return experiments.filter((e) => e.verdict === 'IN_PROGRESS')
  }
}
