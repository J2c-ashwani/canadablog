-- FSI Digital CEO OS Persistent Database Schema (v2.1)

CREATE TABLE IF NOT EXISTS ceo_goal_state (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'current',
  monthly_revenue_target_usd NUMERIC(12,2) NOT NULL DEFAULT 10000.00,
  recurring_mrr_target_usd NUMERIC(12,2) NOT NULL DEFAULT 10000.00,
  daily_target_pace_usd NUMERIC(12,2) NOT NULL DEFAULT 333.33,
  current_mtd_verified_revenue_usd NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  current_mtd_mrr_usd NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  revenue_recovered_by_ceo_usd NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  revenue_influenced_by_ceo_usd NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  primary_bottleneck TEXT,
  estimated_monthly_leakage_usd NUMERIC(12,2) DEFAULT 0.00,
  priority_focus TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ceo_daily_snapshots (
  snapshot_date DATE PRIMARY KEY,
  verified_revenue_usd NUMERIC(12,2) NOT NULL,
  verified_mrr_usd NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  revenue_recovered_usd NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  checkout_starts INT NOT NULL,
  payments_captured INT NOT NULL,
  qualified_leads INT NOT NULL,
  emails_dispatched INT NOT NULL,
  emails_delivered INT NOT NULL,
  reports_delivered INT NOT NULL,
  evidence_state VARCHAR(20) NOT NULL CHECK (evidence_state IN ('VERIFIED', 'DERIVED', 'UNKNOWN')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ceo_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id VARCHAR(100) NOT NULL,
  trigger_source VARCHAR(30) NOT NULL, -- 'cron', 'event', 'on_demand', 'verification'
  monthly_target_usd NUMERIC(12,2) NOT NULL,
  verified_mtd_usd NUMERIC(12,2) NOT NULL,
  primary_bottleneck TEXT NOT NULL,
  estimated_leakage_usd NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  decision_basis JSONB NOT NULL, -- Structured evidence, metrics, hypothesis & confidence
  directives JSONB NOT NULL,
  forbidden_actions JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ceo_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  decision_id UUID REFERENCES ceo_decisions(id),
  tool_name VARCHAR(100) NOT NULL,
  parameters JSONB NOT NULL,
  permission_level VARCHAR(20) NOT NULL, -- 'level_1', 'level_2', 'level_3', 'level_4'
  approval_status VARCHAR(20) NOT NULL, -- 'auto_approved', 'pending_human', 'rejected'
  execution_status VARCHAR(20) NOT NULL, -- 'success', 'failed', 'blocked'
  execution_result JSONB,
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ceo_experiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hypothesis TEXT NOT NULL,
  funnel_stage INT NOT NULL CHECK (funnel_stage BETWEEN 1 AND 10),
  baseline_metric NUMERIC(8,4) NOT NULL,
  target_metric NUMERIC(8,4) NOT NULL,
  action_taken TEXT NOT NULL,
  observation_window_hours INT NOT NULL DEFAULT 72,
  actual_result_metric NUMERIC(8,4),
  revenue_recovered_usd NUMERIC(12,2) DEFAULT 0.00,
  attribution_confidence VARCHAR(10) DEFAULT 'MEDIUM' CHECK (attribution_confidence IN ('HIGH', 'MEDIUM', 'LOW')),
  verdict VARCHAR(20) DEFAULT 'IN_PROGRESS', -- 'SCALE', 'ABANDON', 'ITERATE', 'IN_PROGRESS'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE
);
