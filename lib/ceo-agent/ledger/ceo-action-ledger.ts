import { appendOperationalRow, readOperationalRows } from '@/lib/growth-os/operations-store';

export interface CEOActionRecord {
  actionId: string
  experimentId: string
  timestamp: string
  leadEmail: string
  leadName: string
  company: string
  tier: 'TIER_1_FILING_2500' | 'TIER_2_STRATEGY_199' | 'TIER_3_REPORT_49'
  offer: string
  decisionReason: string
  executionStatus: 'PROVIDER_ACCEPTED' | 'DELIVERED' | 'QUEUED' | 'FAILED' | 'SKIPPED'
  provider: string
  providerMessageId?: string
  funnelState: {
    sent: boolean
    delivered: boolean
    opened: boolean
    clicked: boolean
    replied: boolean
    callBooked: boolean
    checkoutStarted: boolean
    paymentCaptured: boolean
    revenueAttributedUSD: number
  }
  attribution: string
}

export interface CEOActionLedgerSummary {
  totalActionsExecuted: number
  totalProviderAccepted: number
  totalDelivered: number
  totalOpened: number
  totalClicked: number
  totalReplied: number
  totalCallsBooked: number
  totalCheckouts: number
  totalPayments: number
  totalRevenueRecoveredUSD: number
  recentActions: CEOActionRecord[]
}

const ACTION_HEADERS = [
  'Action ID', 'Experiment ID', 'Timestamp', 'Lead Email', 'Lead Name', 'Company', 'Tier',
  'Offer', 'Decision Reason', 'Execution Status', 'Provider', 'Provider Message ID',
  'Funnel State JSON', 'Attribution',
];
const EMAIL_EVENT_HEADERS = [
  'Event ID', 'Provider', 'Provider Message ID', 'Event Type', 'Recipient', 'Occurred At', 'Received At',
];
let inMemoryLedger: CEOActionRecord[] = [];

function hasSheetsConfiguration() {
  return Boolean(process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID);
}

function parseAction(row: string[]): CEOActionRecord | null {
  try {
    return {
      actionId: row[0] || '',
      experimentId: row[1] || '',
      timestamp: row[2] || '',
      leadEmail: row[3] || '',
      leadName: row[4] || '',
      company: row[5] || '',
      tier: (row[6] || 'TIER_3_REPORT_49') as CEOActionRecord['tier'],
      offer: row[7] || '',
      decisionReason: row[8] || '',
      executionStatus: (row[9] || 'FAILED') as CEOActionRecord['executionStatus'],
      provider: row[10] || '',
      providerMessageId: row[11] || '',
      funnelState: JSON.parse(row[12] || '{}'),
      attribution: row[13] || '',
    };
  } catch {
    return null;
  }
}

export class CEOActionLedger {
  public static async recordAction(action: Omit<CEOActionRecord, 'actionId' | 'timestamp'>): Promise<CEOActionRecord> {
    const record: CEOActionRecord = {
      ...action,
      actionId: `ceo_act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
    };
    if (hasSheetsConfiguration()) {
      await appendOperationalRow('CEO Actions', ACTION_HEADERS, [
        record.actionId,
        record.experimentId,
        record.timestamp,
        record.leadEmail,
        record.leadName,
        record.company,
        record.tier,
        record.offer,
        record.decisionReason,
        record.executionStatus,
        record.provider,
        record.providerMessageId || '',
        JSON.stringify(record.funnelState),
        record.attribution,
      ]);
    } else {
      inMemoryLedger.unshift(record);
    }
    return record;
  }

  public static async getLedgerSummary(): Promise<CEOActionLedgerSummary> {
    let records = inMemoryLedger;
    let deliveryByMessage = new Map<string, string>();
    if (hasSheetsConfiguration()) {
      const [rows, emailEvents] = await Promise.all([
        readOperationalRows('CEO Actions', ACTION_HEADERS),
        readOperationalRows('Email Events', EMAIL_EVENT_HEADERS),
      ]);
      records = rows.map(parseAction).filter((record): record is CEOActionRecord => Boolean(record));
      deliveryByMessage = new Map(emailEvents.map((row) => [row[2] || '', String(row[3] || '').toLowerCase()]));
    }

    const reconciled = records.map((record) => {
      const providerEvent = record.providerMessageId ? deliveryByMessage.get(record.providerMessageId) : '';
      const funnelState = { ...record.funnelState };
      if (providerEvent === 'email.delivered') funnelState.delivered = true;
      if (providerEvent === 'email.opened') {
        funnelState.delivered = true;
        funnelState.opened = true;
      }
      if (providerEvent === 'email.clicked') {
        funnelState.delivered = true;
        funnelState.clicked = true;
      }
      return {
        ...record,
        executionStatus: (funnelState.delivered ? 'DELIVERED' : record.executionStatus) as CEOActionRecord['executionStatus'],
        funnelState,
      };
    });

    return {
      totalActionsExecuted: reconciled.length,
      totalProviderAccepted: reconciled.filter((record) => record.executionStatus === 'PROVIDER_ACCEPTED' || record.executionStatus === 'DELIVERED').length,
      totalDelivered: reconciled.filter((record) => record.funnelState.delivered).length,
      totalOpened: reconciled.filter((record) => record.funnelState.opened).length,
      totalClicked: reconciled.filter((record) => record.funnelState.clicked).length,
      totalReplied: reconciled.filter((record) => record.funnelState.replied).length,
      totalCallsBooked: reconciled.filter((record) => record.funnelState.callBooked).length,
      totalCheckouts: reconciled.filter((record) => record.funnelState.checkoutStarted).length,
      totalPayments: reconciled.filter((record) => record.funnelState.paymentCaptured).length,
      totalRevenueRecoveredUSD: Number(reconciled.reduce((sum, record) =>
        sum + (record.funnelState.paymentCaptured ? Number(record.funnelState.revenueAttributedUSD || 0) : 0), 0
      ).toFixed(2)),
      recentActions: reconciled.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10),
    };
  }
}
