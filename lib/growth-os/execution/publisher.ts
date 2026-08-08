/**
 * Growth OS — Publisher & Dispatch Executor
 * Executes campaign dispatches for consented lead segments and logs telemetry.
 */

import { CampaignBundle } from "../content/campaign-generator"
import { RevenueOpportunity } from "../types"

export interface DispatchReceipt {
  opportunityId: string
  campaignName: string
  dispatchedTimestamp: string
  emailsSentCount: number
  status: "SUCCESS" | "QUEUED_FOR_HUMAN_APPROVAL" | "NOT_DISPATCHED" | "FAILED"
  receiptMessage: string
}

export class Publisher {
  public static async dispatchCampaign(
    opportunity: RevenueOpportunity,
    bundle: CampaignBundle
  ): Promise<DispatchReceipt> {
    
    // Tier B Routing: If trust score < 85 or status is ExceptionRaised -> Queue for human
    if (opportunity.status === "ExceptionRaised" || opportunity.humanTrustScore < 85) {
      console.log(`[Publisher] Opportunity ${opportunity.id} routed to Founder Exception Queue.`)
      return {
        opportunityId: opportunity.id,
        campaignName: bundle.campaignName,
        dispatchedTimestamp: new Date().toISOString(),
        emailsSentCount: 0,
        status: "QUEUED_FOR_HUMAN_APPROVAL",
        receiptMessage: `Routed to Founder Exception Queue: Trust Score (${opportunity.humanTrustScore}) or Status (${opportunity.status}).`,
      }
    }

    // This component has no recipient query or provider dispatch. Returning a
    // fabricated count would corrupt commercial reporting.
    console.warn(`[Publisher] Campaign '${bundle.campaignName}' was generated but not dispatched; no recipient selection is implemented.`)

    return {
      opportunityId: opportunity.id,
      campaignName: bundle.campaignName,
      dispatchedTimestamp: new Date().toISOString(),
      emailsSentCount: 0,
      status: "NOT_DISPATCHED",
      receiptMessage: `Campaign '${bundle.emailSubject}' was generated but not dispatched. No recipient or provider evidence exists.`,
    }
  }
}
