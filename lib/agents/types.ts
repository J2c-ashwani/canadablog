export type AgentExecutionMode = 'dry-run' | 'live';

export interface AgentActionItem {
  agent: string;
  recipientKey: string;
  recipientEmail: string;
  actionType: string;
  targetOffer: string;
  expectedValueUSD: number;
  status: 'PLANNED' | 'EXECUTED' | 'SKIPPED' | 'BLOCKED' | 'FAILED';
  reason?: string;
  provider?: string;
  providerMessageId?: string;
  subject?: string;
  checkoutUrl?: string;
  consentProof?: string;
}

export interface AgentRunResult {
  agentName: string;
  mode: AgentExecutionMode;
  scannedCount: number;
  eligibleCount: number;
  executedCount: number;
  skippedCount: number;
  blockedCount: number;
  failedCount: number;
  estimatedPipelineUSD: number;
  actions: AgentActionItem[];
  notes: string[];
}

export interface SharedAgentContext {
  mode: AgentExecutionMode;
  nowMs: number;
  bouncedEmails: Set<string>;
  engagedEmails?: Set<string>;
  sameDayClaimedEmails: Set<string>;
  remainingGlobalEmails: number;
  redisStatus: 'OK' | 'FIXED_LIMIT_EXCEEDED' | 'DISABLED' | 'UNCONFIGURED';
  brevoConfigured: boolean;
  resendConfigured: boolean;
}
