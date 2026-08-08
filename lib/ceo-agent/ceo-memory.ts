import fs from 'fs'
import path from 'path'
import { query } from '../db/postgres'

export interface CEOGoalState {
  id: string
  monthly_revenue_target_usd: number
  recurring_mrr_target_usd: number
  daily_target_pace_usd: number
  current_mtd_verified_revenue_usd: number
  current_mtd_mrr_usd: number
  revenue_recovered_by_ceo_usd: number
  revenue_influenced_by_ceo_usd: number
  primary_bottleneck: string
  estimated_monthly_leakage_usd: number
  priority_focus: string
  updated_at: string
}

export interface CEODecisionBasis {
  primary_bottleneck: string
  evidence_refs: string[]
  observed_conversion_rate: number
  baseline_rate: number
  estimated_monthly_leakage_usd: number
  hypothesis: string
  decision: string
  expected_revenue_impact_usd: number
  attribution_confidence: 'HIGH' | 'MEDIUM' | 'LOW'
}

export interface CEODecisionRecord {
  id: string
  run_id: string
  trigger_source: 'cron' | 'event' | 'on_demand' | 'verification'
  monthly_target_usd: number
  verified_mtd_usd: number
  primary_bottleneck: string
  estimated_leakage_usd: number
  decision_basis: CEODecisionBasis
  directives: string[]
  forbidden_actions: string[]
  created_at: string
}

const FALLBACK_FILE_PATH = path.join(process.cwd(), 'reports', 'ceo-db-fallback.json')

let memoryStore: { goalState: CEOGoalState; decisions: CEODecisionRecord[] } = {
  goalState: {
    id: 'current',
    monthly_revenue_target_usd: 15000,
    recurring_mrr_target_usd: 0,
    daily_target_pace_usd: 500,
    current_mtd_verified_revenue_usd: 106,
    current_mtd_mrr_usd: 0,
    revenue_recovered_by_ceo_usd: 0,
    revenue_influenced_by_ceo_usd: 0,
    primary_bottleneck: 'Checkout -> Payment Conversion',
    estimated_monthly_leakage_usd: 2054,
    priority_focus: 'P0 — Repair broken payment validation and report delivery',
    updated_at: new Date().toISOString()
  },
  decisions: []
}

function loadFallbackData(): { goalState: CEOGoalState; decisions: CEODecisionRecord[] } {
  try {
    if (fs.existsSync(FALLBACK_FILE_PATH)) {
      const content = fs.readFileSync(FALLBACK_FILE_PATH, 'utf-8')
      memoryStore = JSON.parse(content)
    }
  } catch (err) {
    // Ignore read errors on serverless environments
  }
  return memoryStore
}

function saveFallbackData(data: { goalState: CEOGoalState; decisions: CEODecisionRecord[] }) {
  memoryStore = data
  try {
    const dir = path.dirname(FALLBACK_FILE_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(data, null, 2))
  } catch (err) {
    // Read-only filesystem on Vercel production serverless
  }
}

export class CEOMemory {
  public static async getGoalState(): Promise<CEOGoalState> {
    if (process.env.DATABASE_URL) {
      try {
        const res = await query('SELECT * FROM ceo_goal_state WHERE id = $1 LIMIT 1', ['current'])
        if (res.rows && res.rows.length > 0) {
          const row = res.rows[0]
          return {
            id: row.id,
            monthly_revenue_target_usd: Number(row.monthly_revenue_target_usd),
            recurring_mrr_target_usd: Number(row.recurring_mrr_target_usd),
            daily_target_pace_usd: Number(row.daily_target_pace_usd),
            current_mtd_verified_revenue_usd: Number(row.current_mtd_verified_revenue_usd),
            current_mtd_mrr_usd: Number(row.current_mtd_mrr_usd),
            revenue_recovered_by_ceo_usd: Number(row.revenue_recovered_by_ceo_usd),
            revenue_influenced_by_ceo_usd: Number(row.revenue_influenced_by_ceo_usd),
            primary_bottleneck: row.primary_bottleneck || '',
            estimated_monthly_leakage_usd: Number(row.estimated_monthly_leakage_usd || 0),
            priority_focus: row.priority_focus || '',
            updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString()
          }
        }
      } catch (err) {
        console.warn('[CEOMemory] Postgres query failed, falling back to in-memory store:', err)
      }
    }
    const fallback = loadFallbackData()
    return fallback.goalState
  }

  public static async updateGoalState(updates: Partial<CEOGoalState>): Promise<CEOGoalState> {
    const current = await this.getGoalState()
    const updated: CEOGoalState = {
      ...current,
      ...updates,
      updated_at: new Date().toISOString()
    }

    if (process.env.DATABASE_URL) {
      try {
        await query(
          `INSERT INTO ceo_goal_state (
            id, monthly_revenue_target_usd, recurring_mrr_target_usd, daily_target_pace_usd,
            current_mtd_verified_revenue_usd, current_mtd_mrr_usd, revenue_recovered_by_ceo_usd,
            revenue_influenced_by_ceo_usd, primary_bottleneck, estimated_monthly_leakage_usd, priority_focus, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
          ON CONFLICT (id) DO UPDATE SET
            monthly_revenue_target_usd = EXCLUDED.monthly_revenue_target_usd,
            recurring_mrr_target_usd = EXCLUDED.recurring_mrr_target_usd,
            daily_target_pace_usd = EXCLUDED.daily_target_pace_usd,
            current_mtd_verified_revenue_usd = EXCLUDED.current_mtd_verified_revenue_usd,
            current_mtd_mrr_usd = EXCLUDED.current_mtd_mrr_usd,
            revenue_recovered_by_ceo_usd = EXCLUDED.revenue_recovered_by_ceo_usd,
            revenue_influenced_by_ceo_usd = EXCLUDED.revenue_influenced_by_ceo_usd,
            primary_bottleneck = EXCLUDED.primary_bottleneck,
            estimated_monthly_leakage_usd = EXCLUDED.estimated_monthly_leakage_usd,
            priority_focus = EXCLUDED.priority_focus,
            updated_at = NOW()`,
          [
            'current',
            updated.monthly_revenue_target_usd,
            updated.recurring_mrr_target_usd,
            updated.daily_target_pace_usd,
            updated.current_mtd_verified_revenue_usd,
            updated.current_mtd_mrr_usd,
            updated.revenue_recovered_by_ceo_usd,
            updated.revenue_influenced_by_ceo_usd,
            updated.primary_bottleneck,
            updated.estimated_monthly_leakage_usd,
            updated.priority_focus
          ]
        )
      } catch (err) {
        console.warn('[CEOMemory] DB update failed, saving to in-memory fallback:', err)
      }
    }

    const fallback = loadFallbackData()
    fallback.goalState = updated
    saveFallbackData(fallback)
    return updated
  }

  public static async recordDecision(params: {
    run_id: string
    trigger_source: 'cron' | 'event' | 'on_demand' | 'verification'
    monthly_target_usd: number
    verified_mtd_usd: number
    primary_bottleneck: string
    estimated_leakage_usd: number
    decision_basis: CEODecisionBasis
    directives: string[]
    forbidden_actions: string[]
  }): Promise<CEODecisionRecord> {
    const id = `dec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    const record: CEODecisionRecord = {
      id,
      run_id: params.run_id,
      trigger_source: params.trigger_source,
      monthly_target_usd: params.monthly_target_usd,
      verified_mtd_usd: params.verified_mtd_usd,
      primary_bottleneck: params.primary_bottleneck,
      estimated_leakage_usd: params.estimated_leakage_usd,
      decision_basis: params.decision_basis,
      directives: params.directives,
      forbidden_actions: params.forbidden_actions,
      created_at: new Date().toISOString()
    }

    if (process.env.DATABASE_URL) {
      try {
        await query(
          `INSERT INTO ceo_decisions (
            id, run_id, trigger_source, monthly_target_usd, verified_mtd_usd,
            primary_bottleneck, estimated_leakage_usd, decision_basis, directives, forbidden_actions, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())`,
          [
            record.id,
            record.run_id,
            record.trigger_source,
            record.monthly_target_usd,
            record.verified_mtd_usd,
            record.primary_bottleneck,
            record.estimated_leakage_usd,
            JSON.stringify(record.decision_basis),
            JSON.stringify(record.directives),
            JSON.stringify(record.forbidden_actions)
          ]
        )
      } catch (err) {
        console.warn('[CEOMemory] DB recordDecision failed, using fallback:', err)
      }
    }

    const fallback = loadFallbackData()
    fallback.decisions.unshift(record)
    saveFallbackData(fallback)
    return record
  }
}
