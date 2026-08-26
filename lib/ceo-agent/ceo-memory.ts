import { appendOperationalRow, getLatestOperationalState, setOperationalState } from '@/lib/growth-os/operations-store';

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

const STATE_KEY = 'ceo_goal_state_v3';
const DECISION_HEADERS = [
  'Decision ID', 'Run ID', 'Trigger Source', 'Monthly Target USD', 'Verified MTD USD',
  'Primary Bottleneck', 'Estimated Leakage USD', 'Decision Basis JSON', 'Directives JSON',
  'Forbidden Actions JSON', 'Created At',
];

function configuredTarget(name: string, fallback: number) {
  const value = Number(process.env[name] || fallback);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function defaultState(): CEOGoalState {
  const monthlyTarget = configuredTarget('GROWTH_OS_MONTHLY_REVENUE_TARGET_USD', 10000);
  const recurringTarget = configuredTarget('GROWTH_OS_MRR_TARGET_USD', 10000);
  const now = new Date();
  const daysInMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)).getUTCDate();
  return {
    id: 'current',
    monthly_revenue_target_usd: monthlyTarget,
    recurring_mrr_target_usd: recurringTarget,
    daily_target_pace_usd: Number((monthlyTarget / daysInMonth).toFixed(2)),
    current_mtd_verified_revenue_usd: 0,
    current_mtd_mrr_usd: 0,
    revenue_recovered_by_ceo_usd: 0,
    revenue_influenced_by_ceo_usd: 0,
    primary_bottleneck: 'No provider-verified revenue evidence loaded yet',
    estimated_monthly_leakage_usd: 0,
    priority_focus: 'Acquire the first 10 provider-verified customers from the current product set',
    updated_at: now.toISOString(),
  };
}

let memoryState = defaultState();

function hasSheetsConfiguration() {
  return Boolean(process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID);
}

export class CEOMemory {
  public static async getGoalState(): Promise<CEOGoalState> {
    if (hasSheetsConfiguration()) {
      try {
        const persisted = await getLatestOperationalState<CEOGoalState>(STATE_KEY);
        if (persisted) memoryState = { ...defaultState(), ...persisted };
      } catch (error) {
        console.error('[CEOMemory] Durable state read failed:', error);
      }
    }

    const configured = defaultState();
    memoryState.monthly_revenue_target_usd = configured.monthly_revenue_target_usd;
    memoryState.recurring_mrr_target_usd = configured.recurring_mrr_target_usd;
    memoryState.daily_target_pace_usd = configured.daily_target_pace_usd;
    return memoryState;
  }

  public static async updateGoalState(updates: Partial<CEOGoalState>): Promise<CEOGoalState> {
    const current = await this.getGoalState();
    const configured = defaultState();
    const updated: CEOGoalState = {
      ...current,
      ...updates,
      id: 'current',
      monthly_revenue_target_usd: configured.monthly_revenue_target_usd,
      recurring_mrr_target_usd: configured.recurring_mrr_target_usd,
      daily_target_pace_usd: configured.daily_target_pace_usd,
      updated_at: new Date().toISOString(),
    };
    memoryState = updated;
    if (hasSheetsConfiguration()) await setOperationalState(STATE_KEY, updated);
    return updated;
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
    const record: CEODecisionRecord = {
      id: `dec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...params,
      created_at: new Date().toISOString(),
    };
    if (hasSheetsConfiguration()) {
      await appendOperationalRow('CEO Decisions', DECISION_HEADERS, [
        record.id,
        record.run_id,
        record.trigger_source,
        record.monthly_target_usd,
        record.verified_mtd_usd,
        record.primary_bottleneck,
        record.estimated_leakage_usd,
        JSON.stringify(record.decision_basis),
        JSON.stringify(record.directives),
        JSON.stringify(record.forbidden_actions),
        record.created_at,
      ]);
    }
    return record;
  }
}
