/**
 * FSI Digital — Commercial Action Tracking System (Universal Action ID)
 *
 * Every commercial action executed by ANY agent receives a deterministic, traceable ACTION_ID:
 * E.g.: REV-20261006-00017, SALES-20261006-00004
 *
 * Enables the CEO to answer: "What did my AI agents actually DO today that could produce revenue?"
 */

import { CEOActionLedger, type CEOActionRecord } from './ceo-action-ledger';

export type AgentRole = 'Revenue' | 'Sales' | 'Growth' | 'Product' | 'CEO';

export interface CommercialActionEntry {
  actionId: string;
  agent: AgentRole;
  trigger: string;
  leadId: string;
  leadEmail: string;
  leadName?: string;
  company?: string;
  action: string;
  product: string;
  channel: 'Email' | 'Internal Alert' | 'Web' | 'Social';
  consent: 'Verified' | 'Transactional' | 'Exempt_Internal' | 'Unverified';
  status: 'DISPATCHED' | 'BLOCKED' | 'REQUIRES_APPROVAL' | 'FAILED' | 'SKIPPED';
  result: 'PENDING' | 'DELIVERED' | 'OPENED' | 'CLICKED' | 'CHECKOUT_STARTED' | 'PURCHASED' | 'FAILED';
  revenueUSD: number;
  attribution: string;
  timestamp: string;
  providerMessageId?: string;
  details?: Record<string, unknown>;
}

// In-memory daily counter to produce clean sequential IDs like REV-20261006-00017
let dailySequence = 1;

export function generateActionId(agent: AgentRole): string {
  const now = new Date();
  const yyyymmdd = now.toISOString().slice(0, 10).replace(/-/g, '');
  const prefixMap: Record<AgentRole, string> = {
    Revenue: 'REV',
    Sales: 'SALES',
    Growth: 'GROWTH',
    Product: 'PROD',
    CEO: 'CEO',
  };
  const prefix = prefixMap[agent] || 'ACT';
  const seqStr = String(dailySequence++).padStart(5, '0');
  const rand = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${yyyymmdd}-${seqStr}-${rand}`;
}

export class CommercialActionTracker {
  private static recentActions: CommercialActionEntry[] = [];

  /**
   * Records a commercial action into both the high-level tracker and the underlying CEOActionLedger.
   */
  public static async recordAction(entry: CommercialActionEntry): Promise<void> {
    this.recentActions.unshift(entry);
    if (this.recentActions.length > 500) {
      this.recentActions = this.recentActions.slice(0, 500);
    }

    // Map to CEOActionLedger for permanent financial attribution & spreadsheet sync
    const tierMap: Record<string, CEOActionRecord['tier']> = {
      'funding-bundle': 'TIER_1_BUNDLE_79',
      'bundle': 'TIER_1_BUNDLE_79',
      'funding-membership': 'TIER_2_MEMBERSHIP_29',
      'membership': 'TIER_2_MEMBERSHIP_29',
      'funding-roadmap': 'TIER_3_ACTION_PLAN_49',
      'action-plan': 'TIER_3_ACTION_PLAN_49',
      'funding-match-report': 'TIER_4_REPORT_19',
      'report': 'TIER_4_REPORT_19',
    };

    const tier = tierMap[entry.product.toLowerCase()] || 'TIER_4_REPORT_19';

    await CEOActionLedger.recordAction({
      actionId: entry.actionId,
      experimentId: `EXP-${entry.agent.toUpperCase()}-${new Date().toISOString().slice(0, 10)}`,
      timestamp: entry.timestamp,
      leadEmail: entry.leadEmail,
      leadName: entry.leadName || 'Founder',
      company: entry.company || 'Canadian Business',
      tier,
      offer: entry.product,
      decisionReason: `${entry.agent} Agent: ${entry.trigger} -> ${entry.action}`,
      executionStatus:
        entry.status === 'DISPATCHED'
          ? 'PROVIDER_ACCEPTED'
          : entry.status === 'FAILED'
          ? 'FAILED'
          : 'SKIPPED',
      provider: entry.channel === 'Email' ? 'Resend' : 'System',
      providerMessageId: entry.providerMessageId || '',
      funnelState: {
        sent: entry.status === 'DISPATCHED',
        delivered: entry.result !== 'FAILED' && entry.status === 'DISPATCHED',
        opened: entry.result === 'OPENED' || entry.result === 'CLICKED' || entry.result === 'CHECKOUT_STARTED' || entry.result === 'PURCHASED',
        clicked: entry.result === 'CLICKED' || entry.result === 'CHECKOUT_STARTED' || entry.result === 'PURCHASED',
        replied: false,
        callBooked: false,
        checkoutStarted: entry.result === 'CHECKOUT_STARTED' || entry.result === 'PURCHASED',
        paymentCaptured: entry.result === 'PURCHASED',
        revenueAttributedUSD: entry.revenueUSD,
      },
      attribution: `${entry.attribution}; consent:${entry.consent}; actionId:${entry.actionId}`,
    }).catch((err) => {
      console.warn('[ActionTracker] CEOActionLedger sync non-blocking error:', err);
    });
  }

  /**
   * Retrieves today's commercial action metrics for the CEO Morning Briefing.
   */
  public static getTodayMetrics(): {
    totalExecuted: number;
    recoveryEmailsSent: number;
    recoveryClicks: number;
    checkoutRestarts: number;
    purchases: number;
    revenueRecoveredUSD: number;
    revenueGeneratedUSD: number;
    actionsBlocked: number;
    humanApprovalsRequired: number;
    recentActions: CommercialActionEntry[];
  } {
    const today = new Date().toISOString().slice(0, 10);
    const todays = this.recentActions.filter((a) => a.timestamp.startsWith(today));

    const totalExecuted = todays.filter((a) => a.status === 'DISPATCHED').length;
    const recoveryEmailsSent = todays.filter((a) => a.agent === 'Revenue' && a.status === 'DISPATCHED').length;
    const recoveryClicks = todays.filter((a) => a.result === 'CLICKED' || a.result === 'CHECKOUT_STARTED' || a.result === 'PURCHASED').length;
    const checkoutRestarts = todays.filter((a) => a.result === 'CHECKOUT_STARTED' || a.result === 'PURCHASED').length;
    const purchases = todays.filter((a) => a.result === 'PURCHASED').length;
    const revenueRecoveredUSD = todays
      .filter((a) => a.agent === 'Revenue' && a.result === 'PURCHASED')
      .reduce((sum, a) => sum + a.revenueUSD, 0);
    const revenueGeneratedUSD = todays
      .filter((a) => a.result === 'PURCHASED')
      .reduce((sum, a) => sum + a.revenueUSD, 0);
    const actionsBlocked = todays.filter((a) => a.status === 'BLOCKED').length;
    const humanApprovalsRequired = todays.filter((a) => a.status === 'REQUIRES_APPROVAL').length;

    return {
      totalExecuted,
      recoveryEmailsSent,
      recoveryClicks,
      checkoutRestarts,
      purchases,
      revenueRecoveredUSD,
      revenueGeneratedUSD,
      actionsBlocked,
      humanApprovalsRequired,
      recentActions: todays.slice(0, 20),
    };
  }
}
