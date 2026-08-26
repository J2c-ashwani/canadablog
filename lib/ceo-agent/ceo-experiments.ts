import { appendOperationalRow, readOperationalRows } from '@/lib/growth-os/operations-store';

export interface CEOExperiment {
  id: string
  hypothesis: string
  funnel_stage: number
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

const HEADERS = [
  'Experiment ID', 'Hypothesis', 'Funnel Stage', 'Baseline Metric', 'Target Metric',
  'Action Taken', 'Observation Window Hours', 'Actual Result Metric', 'Revenue Recovered USD',
  'Attribution Confidence', 'Verdict', 'Created At', 'Completed At',
];
let inMemoryExperiments: CEOExperiment[] = [];

function hasSheetsConfiguration() {
  return Boolean(process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID);
}

function parseExperiment(row: string[]): CEOExperiment {
  return {
    id: row[0] || '',
    hypothesis: row[1] || '',
    funnel_stage: Number(row[2] || 0),
    baseline_metric: Number(row[3] || 0),
    target_metric: Number(row[4] || 0),
    action_taken: row[5] || '',
    observation_window_hours: Number(row[6] || 72),
    actual_result_metric: row[7] === '' || row[7] === undefined ? null : Number(row[7]),
    revenue_recovered_usd: Number(row[8] || 0),
    attribution_confidence: (row[9] || 'LOW') as CEOExperiment['attribution_confidence'],
    verdict: (row[10] || 'IN_PROGRESS') as CEOExperiment['verdict'],
    created_at: row[11] || '',
    completed_at: row[12] || null,
  };
}

async function persist(experiment: CEOExperiment) {
  if (!hasSheetsConfiguration()) {
    const index = inMemoryExperiments.findIndex((item) => item.id === experiment.id);
    if (index >= 0) inMemoryExperiments[index] = experiment;
    else inMemoryExperiments.unshift(experiment);
    return;
  }
  await appendOperationalRow('CEO Experiments', HEADERS, [
    experiment.id,
    experiment.hypothesis,
    experiment.funnel_stage,
    experiment.baseline_metric,
    experiment.target_metric,
    experiment.action_taken,
    experiment.observation_window_hours,
    experiment.actual_result_metric ?? '',
    experiment.revenue_recovered_usd,
    experiment.attribution_confidence,
    experiment.verdict,
    experiment.created_at,
    experiment.completed_at || '',
  ]);
}

async function getAll(): Promise<CEOExperiment[]> {
  if (!hasSheetsConfiguration()) return inMemoryExperiments;
  const rows = await readOperationalRows('CEO Experiments', HEADERS);
  const latestById = new Map<string, CEOExperiment>();
  rows.map(parseExperiment).forEach((experiment) => latestById.set(experiment.id, experiment));
  return Array.from(latestById.values()).sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
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
    const experiment: CEOExperiment = {
      id: `exp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      hypothesis: params.hypothesis,
      funnel_stage: params.funnel_stage,
      baseline_metric: params.baseline_metric,
      target_metric: params.target_metric,
      action_taken: params.action_taken,
      observation_window_hours: params.observation_window_hours || 72,
      actual_result_metric: null,
      revenue_recovered_usd: 0,
      attribution_confidence: 'LOW',
      verdict: 'IN_PROGRESS',
      created_at: new Date().toISOString(),
      completed_at: null,
    };
    await persist(experiment);
    return experiment;
  }

  public static async evaluateExperimentOutcome(
    experimentId: string,
    actualResultMetric: number,
    revenueRecoveredUsd: number
  ): Promise<CEOExperiment | null> {
    const experiment = (await getAll()).find((item) => item.id === experimentId);
    if (!experiment) return null;
    const updated: CEOExperiment = {
      ...experiment,
      actual_result_metric: actualResultMetric,
      revenue_recovered_usd: revenueRecoveredUsd,
      completed_at: new Date().toISOString(),
      verdict: actualResultMetric >= experiment.target_metric
        ? 'SCALE'
        : actualResultMetric > experiment.baseline_metric ? 'ITERATE' : 'ABANDON',
      attribution_confidence: revenueRecoveredUsd > 0 ? 'HIGH' : 'MEDIUM',
    };
    await persist(updated);
    return updated;
  }

  public static async getActiveExperiments(): Promise<CEOExperiment[]> {
    const now = Date.now();
    return (await getAll()).filter((experiment) => {
      if (experiment.verdict !== 'IN_PROGRESS') return false;
      const createdAt = new Date(experiment.created_at).getTime();
      return Number.isFinite(createdAt)
        && now - createdAt <= experiment.observation_window_hours * 60 * 60 * 1000;
    });
  }

  public static async getExperimentsAwaitingEvaluation(): Promise<CEOExperiment[]> {
    return (await getAll()).filter((experiment) => experiment.verdict === 'IN_PROGRESS');
  }
}
