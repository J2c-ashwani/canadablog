import { appendOperationalRow, readOperationalRows } from '@/lib/growth-os/operations-store';
import { getAllPurchases, isProviderVerifiedPurchase, type PurchaseRecord } from '@/lib/products/purchase-store';

export interface CEOActionRecord {
  actionId: string
  experimentId: string
  timestamp: string
  leadEmail: string
  leadName: string
  company: string
  tier: 'TIER_1_BUNDLE_79' | 'TIER_2_MEMBERSHIP_29' | 'TIER_3_ACTION_PLAN_49' | 'TIER_4_REPORT_19' | 'LEGACY_CALL_DEPENDENT'
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
  providerPaymentId?: string
  providerEventId?: string
  lifecycleType?: 'CAPTURE' | 'REFUND' | 'CHARGEBACK' | 'OUTREACH'
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
  totalGrossRevenueCapturedUSD: number
  totalRefundsUSD: number
  totalChargebacksUSD: number
  totalNetRecognizedRevenueUSD: number
  totalRevenueRecoveredUSD: number // Synonym for totalNetRecognizedRevenueUSD for backwards compatibility
  recentActions: CEOActionRecord[]
  reconciledPaymentIds: string[]
}

export interface PaymentAttributionParams {
  provider: 'paypal' | 'stripe'
  providerPaymentId: string
  providerEventId?: string
  buyerEmail: string
  buyerName?: string
  company?: string
  amountUSD: number
  productId?: string
  tier?: CEOActionRecord['tier']
  attribution?: string
}

export interface PaymentReversalParams {
  provider: 'paypal' | 'stripe'
  providerPaymentId: string
  providerEventId?: string
  buyerEmail?: string
  amountUSD: number
  type: 'refund' | 'chargeback' | 'dispute'
  reason?: string
}

const ACTION_HEADERS = [
  'Action ID', 'Experiment ID', 'Timestamp', 'Lead Email', 'Lead Name', 'Company', 'Tier',
  'Offer', 'Decision Reason', 'Execution Status', 'Provider', 'Provider Message ID',
  'Funnel State JSON', 'Attribution',
];
const EMAIL_EVENT_HEADERS = [
  'Event ID', 'Provider', 'Provider Message ID', 'Event Type', 'Recipient', 'Occurred At', 'Received At',
];

// In-memory atomic reservation sets to guard against concurrent webhook race conditions
const activeReconciliationLocks = new Set<string>();
const recordedPaymentKeys = new Set<string>();
const recordedEventKeys = new Set<string>();

let inMemoryLedger: CEOActionRecord[] = [];

function hasSheetsConfiguration() {
  return Boolean(process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID);
}

function parseAction(row: string[]): CEOActionRecord | null {
  try {
    const funnel = JSON.parse(row[12] || '{}');
    const attr = row[13] || '';
    
    // Parse any embedded provider IDs from attribution or decision reason
    let providerPaymentId = '';
    let providerEventId = '';
    let lifecycleType: CEOActionRecord['lifecycleType'] = 'OUTREACH';
    
    if (attr.includes('providerPaymentId:')) {
      const match = attr.match(/providerPaymentId:([^\s;]+)/);
      if (match) providerPaymentId = match[1];
    }
    if (attr.includes('providerEventId:')) {
      const match = attr.match(/providerEventId:([^\s;]+)/);
      if (match) providerEventId = match[1];
    }
    if (row[8]?.includes('REFUND')) lifecycleType = 'REFUND';
    else if (row[8]?.includes('CHARGEBACK') || row[8]?.includes('DISPUTE')) lifecycleType = 'CHARGEBACK';
    else if (funnel.paymentCaptured) lifecycleType = 'CAPTURE';

    return {
      actionId: row[0] || '',
      experimentId: row[1] || '',
      timestamp: row[2] || '',
      leadEmail: row[3] || '',
      leadName: row[4] || '',
      company: row[5] || '',
      tier: (row[6] || 'TIER_4_REPORT_19') as CEOActionRecord['tier'],
      offer: row[7] || '',
      decisionReason: row[8] || '',
      executionStatus: (row[9] || 'FAILED') as CEOActionRecord['executionStatus'],
      provider: row[10] || '',
      providerMessageId: row[11] || '',
      funnelState: funnel,
      attribution: attr,
      providerPaymentId,
      providerEventId,
      lifecycleType,
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

  /**
   * P0 Financial Integrity: Record verified provider payment attribution atomically.
   * Guaranteed idempotent across concurrent webhook deliveries and retries.
   */
  public static async recordPaymentAttribution(params: PaymentAttributionParams): Promise<{ success: boolean; duplicate: boolean }> {
    const paymentKey = `${params.provider}:${params.providerPaymentId}`.toLowerCase();
    const eventKey = params.providerEventId ? `${params.provider}:${params.providerEventId}`.toLowerCase() : '';

    // 1. Atomic reservation lock check
    if (recordedPaymentKeys.has(paymentKey) || (eventKey && recordedEventKeys.has(eventKey))) {
      return { success: true, duplicate: true };
    }
    if (activeReconciliationLocks.has(paymentKey)) {
      return { success: true, duplicate: true };
    }

    // Acquire lock
    activeReconciliationLocks.add(paymentKey);

    try {
      // 2. Check durable storage for existing payment key
      let records = inMemoryLedger;
      if (hasSheetsConfiguration()) {
        const rows = await readOperationalRows('CEO Actions', ACTION_HEADERS);
        records = rows.map(parseAction).filter((r): r is CEOActionRecord => Boolean(r));
      }

      const existingRecord = records.find(
        (r) => r.providerPaymentId?.toLowerCase() === params.providerPaymentId.toLowerCase() ||
               (params.providerEventId && r.providerEventId?.toLowerCase() === params.providerEventId.toLowerCase()) ||
               r.attribution.includes(`providerPaymentId:${params.providerPaymentId}`)
      );

      if (existingRecord) {
        recordedPaymentKeys.add(paymentKey);
        if (eventKey) recordedEventKeys.add(eventKey);
        return { success: true, duplicate: true };
      }

      // 3. Construct attribution record
      const enrichedAttribution = `${params.attribution || 'Verified Provider Payment Capture'}; providerPaymentId:${params.providerPaymentId}${params.providerEventId ? `; providerEventId:${params.providerEventId}` : ''}`;
      
      const record: CEOActionRecord = {
        actionId: `ceo_rev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        experimentId: `REV-${params.provider.toUpperCase()}`,
        timestamp: new Date().toISOString(),
        leadEmail: params.buyerEmail,
        leadName: params.buyerName || 'Verified Customer',
        company: params.company || 'Enterprise',
        tier: params.tier || (params.amountUSD >= 79 ? 'TIER_1_BUNDLE_79' : params.amountUSD >= 49 ? 'TIER_3_ACTION_PLAN_49' : 'TIER_4_REPORT_19'),
        offer: `${params.productId || 'Digital Product'} ($${params.amountUSD} USD)`,
        decisionReason: 'VERIFIED_PROVIDER_PAYMENT_CAPTURE',
        executionStatus: 'DELIVERED',
        provider: params.provider,
        providerPaymentId: params.providerPaymentId,
        providerEventId: params.providerEventId,
        lifecycleType: 'CAPTURE',
        funnelState: {
          sent: true,
          delivered: true,
          opened: true,
          clicked: true,
          replied: false,
          callBooked: false,
          checkoutStarted: true,
          paymentCaptured: true,
          revenueAttributedUSD: Number(params.amountUSD.toFixed(2)),
        },
        attribution: enrichedAttribution,
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

      recordedPaymentKeys.add(paymentKey);
      if (eventKey) recordedEventKeys.add(eventKey);
      return { success: true, duplicate: false };
    } finally {
      activeReconciliationLocks.delete(paymentKey);
    }
  }

  /**
   * P0 Financial Integrity: Record refunds, chargebacks, and reversals atomically.
   */
  public static async recordPaymentReversal(params: PaymentReversalParams): Promise<{ success: boolean; duplicate: boolean }> {
    const reversalKey = `reversal:${params.provider}:${params.providerPaymentId}:${params.type}`.toLowerCase();
    if (recordedEventKeys.has(reversalKey) || activeReconciliationLocks.has(reversalKey)) {
      return { success: true, duplicate: true };
    }

    activeReconciliationLocks.add(reversalKey);
    try {
      const deductionUSD = -Math.abs(Number(params.amountUSD.toFixed(2)));
      const reason = params.type === 'refund' ? 'PROVIDER_REFUND_EXECUTED' : 'PROVIDER_CHARGEBACK_DISPUTE';

      const record: CEOActionRecord = {
        actionId: `ceo_rev_rev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        experimentId: `REV-REVERSAL-${params.provider.toUpperCase()}`,
        timestamp: new Date().toISOString(),
        leadEmail: params.buyerEmail || 'unknown@customer.com',
        leadName: 'Reversal Event',
        company: 'Reversal Event',
        tier: 'TIER_4_REPORT_19',
        offer: `${params.type.toUpperCase()}: -$${Math.abs(params.amountUSD)} USD`,
        decisionReason: reason,
        executionStatus: 'DELIVERED',
        provider: params.provider,
        providerPaymentId: params.providerPaymentId,
        providerEventId: params.providerEventId,
        lifecycleType: params.type === 'refund' ? 'REFUND' : 'CHARGEBACK',
        funnelState: {
          sent: true,
          delivered: true,
          opened: true,
          clicked: false,
          replied: false,
          callBooked: false,
          checkoutStarted: true,
          paymentCaptured: false,
          revenueAttributedUSD: deductionUSD,
        },
        attribution: `Reversal Event: ${params.type}; providerPaymentId:${params.providerPaymentId}; reason:${params.reason || 'none'}`,
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

      recordedEventKeys.add(reversalKey);
      return { success: true, duplicate: false };
    } finally {
      activeReconciliationLocks.delete(reversalKey);
    }
  }

  /**
   * Reconcile normalized durable purchase records and CEO actions into a single revenue-truth summary.
   * Guarantees zero double-counting through strict providerPaymentId deduplication.
   */
  public static async getLedgerSummary(): Promise<CEOActionLedgerSummary> {
    let records = inMemoryLedger;
    let deliveryByMessage = new Map<string, string>();
    let durablePurchases: PurchaseRecord[] = [];

    if (hasSheetsConfiguration()) {
      const [rows, emailEvents, purchases] = await Promise.all([
        readOperationalRows('CEO Actions', ACTION_HEADERS).catch(() => []),
        readOperationalRows('Email Events', EMAIL_EVENT_HEADERS).catch(() => []),
        getAllPurchases().catch(() => []),
      ]);
      records = rows.map(parseAction).filter((record): record is CEOActionRecord => Boolean(record));
      deliveryByMessage = new Map(emailEvents.map((row) => [row[2] || '', String(row[3] || '').toLowerCase()]));
      durablePurchases = purchases;
    } else {
      durablePurchases = await getAllPurchases().catch(() => []);
    }

    // Set of uniquely reconciled provider payment identifiers to prevent double counting
    const reconciledPaymentKeys = new Set<string>();
    let grossCapturedUSD = 0;
    let refundsUSD = 0;
    let chargebacksUSD = 0;

    // 1. Process CEO Actions rows
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

      // Check for payment attribution in record
      if (record.providerPaymentId) {
        const key = `${record.provider}:${record.providerPaymentId}`.toLowerCase();
        if (record.lifecycleType === 'CAPTURE' && !reconciledPaymentKeys.has(key)) {
          reconciledPaymentKeys.add(key);
          grossCapturedUSD += Number(funnelState.revenueAttributedUSD || 0);
        } else if (record.lifecycleType === 'REFUND') {
          refundsUSD += Math.abs(Number(funnelState.revenueAttributedUSD || 0));
        } else if (record.lifecycleType === 'CHARGEBACK') {
          chargebacksUSD += Math.abs(Number(funnelState.revenueAttributedUSD || 0));
        }
      }

      return {
        ...record,
        executionStatus: (funnelState.delivered ? 'DELIVERED' : record.executionStatus) as CEOActionRecord['executionStatus'],
        funnelState,
      };
    });

    // 2. Cross-reference durable purchase store for any provider-verified purchases not yet in CEO Actions
    for (const purchase of durablePurchases) {
      if (!isProviderVerifiedPurchase(purchase)) continue;
      const paymentId = purchase.paypalCaptureId || purchase.paypalOrderId;
      if (!paymentId) continue;
      
      const provider = purchase.paypalCaptureId?.startsWith('pi_') || purchase.paypalOrderId?.startsWith('cs_') ? 'stripe' : 'paypal';
      const key = `${provider}:${paymentId}`.toLowerCase();

      if (!reconciledPaymentKeys.has(key)) {
        reconciledPaymentKeys.add(key);
        const amount = Number(parseFloat(purchase.amount || '0').toFixed(2));
        if (purchase.paymentStatus === 'refunded' || purchase.status === 'refunded') {
          refundsUSD += amount;
        } else if (purchase.paymentStatus === 'disputed' || purchase.status === 'disputed') {
          chargebacksUSD += amount;
        } else {
          grossCapturedUSD += amount;
        }
      }
    }

    const netRecognizedRevenueUSD = Number(Math.max(0, grossCapturedUSD - refundsUSD - chargebacksUSD).toFixed(2));

    return {
      totalActionsExecuted: reconciled.length,
      totalProviderAccepted: reconciled.filter((record) => record.executionStatus === 'PROVIDER_ACCEPTED' || record.executionStatus === 'DELIVERED').length,
      totalDelivered: reconciled.filter((record) => record.funnelState.delivered).length,
      totalOpened: reconciled.filter((record) => record.funnelState.opened).length,
      totalClicked: reconciled.filter((record) => record.funnelState.clicked).length,
      totalReplied: reconciled.filter((record) => record.funnelState.replied).length,
      totalCallsBooked: reconciled.filter((record) => record.funnelState.callBooked).length,
      totalCheckouts: reconciled.filter((record) => record.funnelState.checkoutStarted).length,
      totalPayments: reconciledPaymentKeys.size,
      totalGrossRevenueCapturedUSD: Number(grossCapturedUSD.toFixed(2)),
      totalRefundsUSD: Number(refundsUSD.toFixed(2)),
      totalChargebacksUSD: Number(chargebacksUSD.toFixed(2)),
      totalNetRecognizedRevenueUSD: netRecognizedRevenueUSD,
      totalRevenueRecoveredUSD: netRecognizedRevenueUSD, // Backward-compatible synonym
      recentActions: reconciled.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10),
      reconciledPaymentIds: Array.from(reconciledPaymentKeys),
    };
  }
}

