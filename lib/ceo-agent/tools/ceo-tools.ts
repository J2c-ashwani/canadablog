import { CEOPolicies } from '../guards/ceo-policies'
import { RevenueTools } from './revenue-tools'
import { GrowthTools } from './growth-tools'
import { ActionTools } from './action-tools'

export interface CEOToolDefinition {
  name: string
  description: string
  parameters: Record<string, any>
  needsApproval: boolean
}

export const CEO_TOOL_DEFINITIONS: CEOToolDefinition[] = [
  {
    name: 'get_revenue_ledger',
    description: 'Queries verified PayPal/Stripe revenue capture records and purchase ledgers.',
    parameters: { type: 'object', properties: {} },
    needsApproval: false
  },
  {
    name: 'get_revenue_path_to_target',
    description: 'Calculates mathematical acquisition equation (orders, checkouts, leads, traffic needed) to reach $15,000 monthly revenue target.',
    parameters: {
      type: 'object',
      properties: {
        targetUSD: { type: 'number', description: 'Monthly target in USD' },
        daysRemaining: { type: 'number', description: 'Days remaining in current month' }
      }
    },
    needsApproval: false
  },
  {
    name: 'get_revenue_leakage_report',
    description: 'Quantifies estimated dollar revenue leakage per funnel bottleneck, ranking issues by economic value.',
    parameters: { type: 'object', properties: {} },
    needsApproval: false
  },
  {
    name: 'get_growth_os_status',
    description: 'Audits Growth OS signal discovery, lead qualification, email dispatch queues, and orphan pipeline stages.',
    parameters: { type: 'object', properties: {} },
    needsApproval: false
  },
  {
    name: 'retry_failed_delivery',
    description: 'Level 3 Action: Re-triggers PDF compilation and email report dispatch for a verified order.',
    parameters: {
      type: 'object',
      properties: {
        orderId: { type: 'string', description: 'Payment provider order ID' }
      },
      required: ['orderId']
    },
    needsApproval: false
  },
  {
    name: 'create_followup_task',
    description: 'Level 3 Action: Logs an internal priority task item in the CEO action ledger.',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Task title' },
        priority: { type: 'string', enum: ['P0', 'P1', 'P2'], description: 'Task priority' },
        details: { type: 'string', description: 'Task details and context' }
      },
      required: ['title', 'priority', 'details']
    },
    needsApproval: false
  },
  {
    name: 'pause_campaign',
    description: 'Level 4 Action: Pauses an active distribution or outreach campaign. REQUIRES HUMAN APPROVAL.',
    parameters: {
      type: 'object',
      properties: {
        campaignId: { type: 'string', description: 'Campaign identifier' },
        reason: { type: 'string', description: 'Reason for pausing campaign' }
      },
      required: ['campaignId', 'reason']
    },
    needsApproval: true
  }
]

export class CEOToolRunner {
  public static async executeTool(toolName: string, args: any): Promise<any> {
    const permission = CEOPolicies.evaluateToolPermission(toolName, args)

    if (!permission.allowed) {
      console.warn(`[CEOToolRunner] ⛔ Tool '${toolName}' execution blocked: ${permission.reason}`)
      return {
        success: false,
        error: 'PERMISSION_DENIED',
        reason: permission.reason,
        needsHumanApproval: permission.needsHumanApproval
      }
    }

    try {
      switch (toolName) {
        case 'get_revenue_ledger':
          return { success: true, data: await RevenueTools.getRevenueLedger() }
        case 'get_revenue_path_to_target':
          return { success: true, data: await RevenueTools.getRevenuePathToTarget(args) }
        case 'get_revenue_leakage_report':
          return { success: true, data: await RevenueTools.getRevenueLeakageReport() }
        case 'get_growth_os_status':
          return { success: true, data: await GrowthTools.getGrowthOSStatus() }
        case 'retry_failed_delivery':
          return { success: true, data: await ActionTools.retryFailedDelivery(args.orderId) }
        case 'create_followup_task':
          return { success: true, data: await ActionTools.createFollowupTask(args.title, args.priority, args.details) }
        default:
          return { success: false, error: 'UNKNOWN_TOOL', reason: `Tool ${toolName} has no execution handler.` }
      }
    } catch (err: any) {
      console.error(`[CEOToolRunner] Error executing ${toolName}:`, err)
      return { success: false, error: 'EXECUTION_ERROR', reason: err.message }
    }
  }
}
