import { appendOperationalRow } from '@/lib/growth-os/operations-store'
import { B2BOutreachEngine } from '@/lib/leads/B2BOutreachEngine'
import { CartRecoveryService } from '@/lib/leads/cart-recovery-service'
import { recoverProductDeliveries } from '@/lib/products/delivery-recovery'
import { CEOActionLedger } from '../ledger/ceo-action-ledger'

export interface ActionExecutionReceipt {
  actionId: string
  toolName: string
  status: 'SUCCESS' | 'FAILED' | 'BLOCKED'
  message: string
  timestamp: string
  details?: any
}

const TASK_HEADERS = ['Task ID', 'Title', 'Priority', 'Details', 'Status', 'Created At']

export class ActionTools {
  public static async triggerCartRecovery(maxBatch = 5, force = false): Promise<ActionExecutionReceipt> {
    try {
      if (force && process.env.NODE_ENV === 'production') {
        return {
          actionId: `act_cart_recovery_${Date.now()}`,
          toolName: 'trigger_cart_recovery',
          status: 'BLOCKED',
          message: 'Force mode is disabled in production; recovery requires a real checkout timestamp and elapsed window.',
          timestamp: new Date().toISOString(),
        }
      }
      const result = await CartRecoveryService.processCartRecoveryBatch(maxBatch, force)
      const failed = result.errors.length > 0
      return {
        actionId: `act_cart_recovery_${Date.now()}`,
        toolName: 'trigger_cart_recovery',
        status: failed ? 'FAILED' : 'SUCCESS',
        message: failed
          ? `Cart recovery completed with ${result.errors.length} provider or persistence errors.`
          : `${result.processedCount} eligible checkout-recovery messages were provider-accepted.`,
        timestamp: new Date().toISOString(),
        details: result,
      }
    } catch (error: any) {
      return {
        actionId: `act_cart_recovery_${Date.now()}`,
        toolName: 'trigger_cart_recovery',
        status: 'FAILED',
        message: `Cart recovery failed: ${error.message || String(error)}`,
        timestamp: new Date().toISOString(),
        details: { error: error.message || String(error) },
      }
    }
  }

  /** Kept under the legacy tool name for API compatibility; it now distributes only the current product set. */
  public static async triggerHighTicketOutreach(limit = 5, force = false): Promise<ActionExecutionReceipt> {
    const today = new Date().toISOString().split('T')[0]
    const experimentId = `CEO-PRODUCT-${today}`
    try {
      const result = await B2BOutreachEngine.processDailyBatch(limit, false, force)
      for (const receipt of result.receipts) {
        await CEOActionLedger.recordAction({
          experimentId,
          leadEmail: receipt.email,
          leadName: 'Consented funding lead',
          company: 'CRM product cohort',
          tier: 'TIER_3_REPORT_49',
          offer: 'Current $19/$29/$49/$79/$199 funding product ladder',
          decisionReason: 'Controlled product-matched outreach to an explicitly subscribed lead',
          executionStatus: 'PROVIDER_ACCEPTED',
          provider: receipt.provider,
          providerMessageId: receipt.providerMessageId,
          funnelState: {
            sent: true,
            delivered: false,
            opened: false,
            clicked: false,
            replied: false,
            callBooked: false,
            checkoutStarted: false,
            paymentCaptured: false,
            revenueAttributedUSD: 0,
          },
          attribution: 'CEO controlled current-product distribution cohort',
        })
      }
      if (result.skippedReason) {
        return {
          actionId: `act_outreach_${Date.now()}`,
          toolName: 'trigger_current_product_outreach',
          status: 'BLOCKED',
          message: result.skippedReason,
          timestamp: new Date().toISOString(),
          details: { experimentId, ...result },
        }
      }
      return {
        actionId: `act_outreach_${Date.now()}`,
        toolName: 'trigger_current_product_outreach',
        status: result.errors.length > 0 ? 'FAILED' : 'SUCCESS',
        message: `${result.receipts.length} messages were provider-accepted; delivery remains unverified until signed webhook events arrive.`,
        timestamp: new Date().toISOString(),
        details: { experimentId, ...result },
      }
    } catch (error: any) {
      return {
        actionId: `act_outreach_${Date.now()}`,
        toolName: 'trigger_current_product_outreach',
        status: 'FAILED',
        message: `Product outreach failed: ${error.message || String(error)}`,
        timestamp: new Date().toISOString(),
        details: { error: error.message || String(error) },
      }
    }
  }

  public static async retryFailedDelivery(orderId: string): Promise<ActionExecutionReceipt> {
    const result = await recoverProductDeliveries({ limit: 10, orderId })
    if (result.candidates === 0) {
      return {
        actionId: `act_retry_${Date.now()}`,
        toolName: 'fulfillment_integrity_retry',
        status: 'BLOCKED',
        message: `No provider-verified pending purchase matched ${orderId}; no retry was attempted.`,
        timestamp: new Date().toISOString(),
        details: result,
      }
    }
    const failures = result.outcomes.filter((outcome) => !outcome.providerAccepted)
    return {
      actionId: `act_retry_${Date.now()}`,
      toolName: 'fulfillment_integrity_retry',
      status: failures.length > 0 ? 'FAILED' : 'SUCCESS',
      message: failures.length > 0
        ? `${failures.length} fulfilment retries were rejected or could not be durably recorded.`
        : `${result.outcomes.length} fulfilment messages were provider-accepted; delivery awaits webhook verification.`,
      timestamp: new Date().toISOString(),
      details: result,
    }
  }

  public static async createFollowupTask(title: string, priority: 'P0' | 'P1' | 'P2', details: string): Promise<ActionExecutionReceipt> {
    const task = {
      id: `task_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      title,
      priority,
      details,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
    }
    if (process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      await appendOperationalRow('CEO Tasks', TASK_HEADERS, [
        task.id, task.title, task.priority, task.details, task.status, task.createdAt,
      ])
    }
    return {
      actionId: task.id,
      toolName: 'create_followup_task',
      status: 'SUCCESS',
      message: `Created durable ${priority} action item: "${title}".`,
      timestamp: task.createdAt,
      details: task,
    }
  }
}
