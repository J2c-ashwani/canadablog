export type PermissionLevel = 'level_1' | 'level_2' | 'level_3' | 'level_4' | 'forbidden'

export interface ToolPermission {
  level: PermissionLevel
  needsApproval: boolean
  description: string
}

export const TOOL_PERMISSIONS: Record<string, ToolPermission> = {
  // Level 1: Observe (Read-only)
  get_revenue_ledger: { level: 'level_1', needsApproval: false, description: 'Queries verified PayPal/Stripe revenue captures' },
  get_funnel_health: { level: 'level_1', needsApproval: false, description: 'Audits 10-stage commercial funnel stats' },
  get_growth_os_status: { level: 'level_1', needsApproval: false, description: 'Audits Growth OS queues and email delivery health' },
  get_revenue_path_to_target: { level: 'level_1', needsApproval: false, description: 'Calculates the acquisition capacity required for the active $10K cash target' },
  get_revenue_leakage_report: { level: 'level_1', needsApproval: false, description: 'Quantifies estimated dollar leakage per funnel bottleneck' },

  // Level 2: Recommend
  generate_strategy_recommendation: { level: 'level_2', needsApproval: false, description: 'Generates strategic advice and funnel optimization plan' },

  // Level 3: Execute Low-Risk
  retry_failed_delivery: { level: 'level_3', needsApproval: false, description: 'Retries PDF compilation and email dispatch for verified purchase' },
  create_followup_task: { level: 'level_3', needsApproval: false, description: 'Logs internal action ticket in CEO task queue' },
  update_lead_qualification: { level: 'level_3', needsApproval: false, description: 'Updates lead qualification status in CRM ledger' },

  // Level 4: Human Approval Required
  pause_campaign: { level: 'level_4', needsApproval: true, description: 'Pauses active marketing or distribution campaign' },
  send_mass_email: { level: 'level_4', needsApproval: true, description: 'Initiates mass outbound campaign to >100 prospects' },
  change_product_pricing: { level: 'level_4', needsApproval: true, description: 'Modifies pricing on digital reports or services' },
  issue_refund: { level: 'level_4', needsApproval: true, description: 'Issues financial refund via payment provider' },

  // Forbidden
  delete_customer_data: { level: 'forbidden', needsApproval: true, description: 'Deletes customer records or transaction logs' },
  modify_recommendation_engine: { level: 'forbidden', needsApproval: true, description: 'Mutates frozen scoring or recommendation engine rules' }
}

export class CEOPolicies {
  public static evaluateToolPermission(toolName: string, params?: any): {
    allowed: boolean
    level: PermissionLevel
    needsHumanApproval: boolean
    reason: string
  } {
    const config = TOOL_PERMISSIONS[toolName]
    if (!config) {
      return {
        allowed: false,
        level: 'forbidden',
        needsHumanApproval: true,
        reason: `Tool '${toolName}' is not registered in CEO permission matrix.`
      }
    }

    if (config.level === 'forbidden') {
      return {
        allowed: false,
        level: 'forbidden',
        needsHumanApproval: true,
        reason: `FORBIDDEN: Action '${toolName}' violates platform safety policies and can never be executed autonomously.`
      }
    }

    if (config.level === 'level_4' || config.needsApproval) {
      return {
        allowed: false, // requires explicit human approval sign-off
        level: config.level,
        needsHumanApproval: true,
        reason: `LEVEL 4 GUARD: Tool '${toolName}' requires explicit human approval before execution.`
      }
    }

    return {
      allowed: true,
      level: config.level,
      needsHumanApproval: false,
      reason: `AUTO-APPROVED: Tool '${toolName}' operates within ${config.level} permissions.`
    }
  }
}
