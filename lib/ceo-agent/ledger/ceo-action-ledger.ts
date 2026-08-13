import fs from 'fs'
import path from 'path'

export interface CEOActionRecord {
  actionId: string
  timestamp: string
  leadEmail: string
  leadName: string
  company: string
  tier: 'TIER_1_FILING_2500' | 'TIER_2_STRATEGY_199' | 'TIER_3_REPORT_49'
  offer: string
  decisionReason: string
  executionStatus: 'EXECUTED_DELIVERED' | 'QUEUED' | 'FAILED'
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

const LEDGER_FILE_PATH = path.join(process.cwd(), 'reports', 'ceo-action-ledger.json')

let inMemoryLedger: CEOActionRecord[] = []

function loadLedger(): CEOActionRecord[] {
  try {
    if (fs.existsSync(LEDGER_FILE_PATH)) {
      const content = fs.readFileSync(LEDGER_FILE_PATH, 'utf-8')
      inMemoryLedger = JSON.parse(content)
    }
  } catch (err) {
    // Graceful fallback for serverless
  }
  return inMemoryLedger
}

function persistLedger(records: CEOActionRecord[]) {
  inMemoryLedger = records
  try {
    const dir = path.dirname(LEDGER_FILE_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(LEDGER_FILE_PATH, JSON.stringify(records, null, 2))
  } catch (err) {
    // Read-only filesystem on Vercel
  }
}

export class CEOActionLedger {
  public static async recordAction(action: Omit<CEOActionRecord, 'actionId' | 'timestamp'>): Promise<CEOActionRecord> {
    const records = loadLedger()
    const newRecord: CEOActionRecord = {
      ...action,
      actionId: `ceo_act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString()
    }

    records.unshift(newRecord)
    // Keep max 500 actions
    if (records.length > 500) records.length = 500

    persistLedger(records)
    console.log(`[CEOActionLedger] 📋 Recorded action ${newRecord.actionId} for ${newRecord.leadEmail} (${newRecord.executionStatus})`)
    return newRecord
  }

  public static async getLedgerSummary(): Promise<CEOActionLedgerSummary> {
    const records = loadLedger()

    let totalDelivered = 0
    let totalOpened = 0
    let totalClicked = 0
    let totalReplied = 0
    let totalCallsBooked = 0
    let totalCheckouts = 0
    let totalPayments = 0
    let totalRevenueRecoveredUSD = 0

    for (const r of records) {
      if (r.funnelState.delivered) totalDelivered++
      if (r.funnelState.opened) totalOpened++
      if (r.funnelState.clicked) totalClicked++
      if (r.funnelState.replied) totalReplied++
      if (r.funnelState.callBooked) totalCallsBooked++
      if (r.funnelState.checkoutStarted) totalCheckouts++
      if (r.funnelState.paymentCaptured) {
        totalPayments++
        totalRevenueRecoveredUSD += r.funnelState.revenueAttributedUSD
      }
    }

    return {
      totalActionsExecuted: records.length,
      totalDelivered,
      totalOpened,
      totalClicked,
      totalReplied,
      totalCallsBooked,
      totalCheckouts,
      totalPayments,
      totalRevenueRecoveredUSD,
      recentActions: records.slice(0, 10)
    }
  }
}
