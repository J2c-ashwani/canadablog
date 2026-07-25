/**
 * Growth OS — Central Kernel Orchestrator (Vertical Slice #1)
 * Manages the end-to-end execution slice from Raw Scrape -> Signal -> Opportunity -> Safety -> Campaign -> Dispatch.
 */

import { globalEventBus } from "./event-bus"
import { SignalEngine, RawScrapeItem } from "../intelligence/signal-engine"
import { DecisionEngine } from "./decision-engine"
import { SafetyLayer } from "./safety-layer"
import { CampaignGenerator, CampaignBundle } from "../content/campaign-generator"
import { Publisher, DispatchReceipt } from "../execution/publisher"
import { RevenueOpportunity, BusinessImpactScore } from "../types"

export interface SliceExecutionResult {
  opportunity: RevenueOpportunity
  impactScore: BusinessImpactScore
  decisionReason: string
  bundle?: CampaignBundle
  receipt?: DispatchReceipt
}

export class GrowthOSKernel {
  public static async processRawSignal(scrape: RawScrapeItem): Promise<SliceExecutionResult | null> {
    console.log(`\n[GrowthOSKernel] Initiating Growth OS Processing for signal: '${scrape.title}'`)

    // Step 1: Signal Engine Noise Filter & Opportunity Mapping
    const opportunity = SignalEngine.processRawScrape(scrape)
    if (!opportunity) {
      return null
    }

    await globalEventBus.publish("OpportunityDiscovered", opportunity)

    // Step 2: Safety Layer Audit
    const safetyAudit = SafetyLayer.auditOpportunity(opportunity)
    opportunity.humanTrustScore = safetyAudit.trustScore
    
    if (!safetyAudit.passed) {
      opportunity.status = "ExceptionRaised"
      console.warn(`[GrowthOSKernel] Safety audit warning for ${opportunity.id}:`, safetyAudit.reasons)
    }

    // Step 3: Decision Engine Financial & ROI Evaluation
    const decision = DecisionEngine.evaluateOpportunity(opportunity)
    opportunity.status = decision.updatedStatus
    const impactScore = DecisionEngine.calculateImpactScore(opportunity)

    await globalEventBus.publish("OpportunityEvaluated", { opportunity, decision, impactScore })

    // Step 4: Handle "Do Nothing" (`ObservedAndWaiting`) or `ExceptionRaised`
    if (!decision.shouldExecute) {
      console.log(`[GrowthOSKernel] Action suppressed by Decision Engine for ${opportunity.id}. Status: ${opportunity.status}`)
      return {
        opportunity,
        impactScore,
        decisionReason: decision.decisionReason,
      }
    }

    // Step 5: Campaign Generation
    console.log(`[GrowthOSKernel] Generating situation-matched campaign bundle for ${opportunity.buyerSegment}...`)
    const bundle = await CampaignGenerator.generateBundle(opportunity)
    await globalEventBus.publish("CampaignGenerated", bundle)

    // Step 6: Dispatch Execution
    const receipt = await Publisher.dispatchCampaign(opportunity, bundle)
    opportunity.status = receipt.status === "SUCCESS" ? "Dispatched" : "ExceptionRaised"

    await globalEventBus.publish("DispatchCompleted", receipt)

    console.log(`[GrowthOSKernel] Processing Complete for ${opportunity.id}. Status: ${opportunity.status}\n`)

    return {
      opportunity,
      impactScore,
      decisionReason: decision.decisionReason,
      bundle,
      receipt,
    }
  }
}
