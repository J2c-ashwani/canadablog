/**
 * Growth OS — Central Kernel Orchestrator
 * Manages the end-to-end execution slice from Raw Scrape -> Signal -> Opportunity -> Safety -> Campaign -> Dispatch.
 */

import { globalEventBus } from "./event-bus"
import { SignalEngine, RawScrapeItem } from "../intelligence/signal-engine"
import { DecisionEngine } from "./decision-engine"
import { SafetyLayer } from "./safety-layer"
import { CampaignGenerator, CampaignBundle } from "../content/campaign-generator"
import { Publisher, DispatchReceipt } from "../execution/publisher"
import { RevenueOpportunity, BusinessImpactScore } from "../types"
import { DistributionIntelligenceEngine } from "../distribution/distribution-intelligence"
import { ContentFactory, MultiChannelAssetPackage } from "../distribution/content-factory"
import { MultiChannelPublisher, MultiChannelDispatchReceipt } from "../distribution/multi-channel-publisher"

export interface SliceExecutionResult {
  opportunity: RevenueOpportunity
  impactScore: BusinessImpactScore
  decisionReason: string
  bundle?: CampaignBundle
  receipt?: DispatchReceipt
  multiChannelReceipt?: MultiChannelDispatchReceipt
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

    // Step 5b: Multi-Channel Distribution
    console.log(`[GrowthOSKernel] Building 7-channel distribution package for ${opportunity.buyerSegment}...`)
    const distOpportunity = DistributionIntelligenceEngine.evaluateDistributionOpportunity(opportunity)
    const assetPackage = ContentFactory.buildAssetPackage(opportunity, distOpportunity)
    const multiChannelReceipt = await MultiChannelPublisher.dispatchAssetPackage(distOpportunity, assetPackage)
    
    if (multiChannelReceipt.dispatchedChannelsCount === 0) {
      console.error(`[GrowthOSKernel] ⚠️ ALL channels failed or queued for ${opportunity.id}. No content was published.`)
    } else {
      console.log(`[GrowthOSKernel] ✅ Published to ${multiChannelReceipt.dispatchedChannelsCount}/7 channels for ${opportunity.id}`)
    }
    
    await globalEventBus.publish("MultiChannelDistributed", multiChannelReceipt)

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
      multiChannelReceipt,
    }
  }

  /**
   * Daily Growth OS Orchestration Trigger (used by cron-jobs.org & external schedulers)
   */
  public static async executeDailyGrowthLoop(): Promise<SliceExecutionResult | null> {
    // Dynamic content rotation — cycles through high-value topics daily
    const topics: RawScrapeItem[] = [
      {
        title: "Alberta Technology Innovation Grants — Active Intake",
        rawText: "Alberta Innovates and the Government of Alberta have opened active intake for technology SMEs. Programs include the IRAP Alberta regional stream, Digital Economy Program grants, and R&D tax credit acceleration.",
        sourceUrl: "https://albertainnovates.ca/programs/",
        detectedProgram: "Alberta Innovates Technology Grant Intake",
        industry: "Technology",
        province: "Alberta",
      },
      {
        title: "Ontario Innovation & Scale-Up Grants — Q3 Funding Window",
        rawText: "Ontario Centre of Innovation has announced Q3 funding windows for high-tech startups and scale-ups. Programs include Ontario Innovation Tax Credit, OITC, and the Regional Development Program.",
        sourceUrl: "https://www.oc-innovation.ca/programs/",
        detectedProgram: "Ontario Centre of Innovation Q3 Grants",
        industry: "Technology",
        province: "Ontario",
      },
      {
        title: "Canada Digital Adoption Program — SME Stream Open",
        rawText: "Official Innovation, Science and Economic Development Canada (.gc.ca) update: Active intake opened for high-tech SMEs, clean tech, and digital adoption programs grant funding.",
        sourceUrl: "https://www.ic.gc.ca/eic/site/icnavigator.nsf/eng/h_00000.html",
        detectedProgram: "Canada Digital Adoption Program & IRAP Tech Grant Intake",
        industry: "Technology",
        province: "Federal / Canada Wide",
      },
      {
        title: "Women Entrepreneur Grants — Federal & Provincial Streams",
        rawText: "The Women Entrepreneurship Strategy (WES) has announced new funding streams for women-led businesses across Canada. Programs include WES Ecosystem Fund, BDC Women in Tech, and provincial matching grants.",
        sourceUrl: "https://ised-isde.canada.ca/site/women-entrepreneurship-strategy/en",
        detectedProgram: "Women Entrepreneurship Strategy Funding",
        industry: "General Business",
        province: "Federal / Canada Wide",
      },
      {
        title: "Clean Technology & Green Economy Funding — Active Programs",
        rawText: "Natural Resources Canada and the Strategic Innovation Fund have opened applications for cleantech companies. Eligible projects include decarbonization, circular economy, and sustainable manufacturing.",
        sourceUrl: "https://natural-resources.canada.ca/funding",
        detectedProgram: "NRCan & SIF Clean Technology Grants",
        industry: "Clean Tech & Energy",
        province: "Federal / Canada Wide",
      },
      {
        title: "R&D Tax Credits SR&ED — Updated Eligibility Guidelines",
        rawText: "Canada Revenue Agency has published updated guidelines for SR&ED tax credit eligibility. Key changes include expanded eligible expenditures for cloud computing and AI development costs.",
        sourceUrl: "https://www.canada.ca/en/revenue-agency/services/scientific-research-experimental-development-tax-incentive-program.html",
        detectedProgram: "SR&ED Tax Credit Program Update",
        industry: "Technology",
        province: "Federal / Canada Wide",
      },
      {
        title: "Export Development & CanExport Grants — New Markets Open",
        rawText: "Trade Commissioner Service and CanExport have opened new market expansion grants for Canadian businesses looking to export. Programs cover market research, trade shows, and international marketing.",
        sourceUrl: "https://www.tradecommissioner.gc.ca/funding-financement/canexport/index.aspx",
        detectedProgram: "CanExport SME & Innovation Programs",
        industry: "General Business",
        province: "Federal / Canada Wide",
      },
      {
        title: "British Columbia Innovation & Technology Grants",
        rawText: "BC Innovation Council and Innovate BC have active intake windows for tech startups. Programs include BC Fast Pilot, BC Tech Fund co-investment, and Ignite capital grants.",
        sourceUrl: "https://www.innovatebc.ca/programs/",
        detectedProgram: "Innovate BC Technology Programs",
        industry: "Technology",
        province: "British Columbia",
      },
      {
        title: "Manufacturing & Industrial Innovation Grants — Active Intake",
        rawText: "Federal Economic Development Agency for Southern Ontario (FedDev Ontario) and Western Economic Diversification have active manufacturing modernization and capital equipment grants.",
        sourceUrl: "https://feddev-ontario.canada.ca/en/funding-southern-ontario",
        detectedProgram: "FedDev Ontario Manufacturing Grants",
        industry: "Manufacturing",
        province: "Ontario",
      },
    ]

    // Rotate through topics based on day-of-year to ensure daily variety
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    const dailyScrape = topics[dayOfYear % topics.length]

    return await this.processRawSignal(dailyScrape)
  }
}
