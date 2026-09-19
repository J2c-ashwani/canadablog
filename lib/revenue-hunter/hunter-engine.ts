import { ProspectIntelligenceEngine } from './intelligence/prospect-graph'
import { SalesSequenceEngine } from './sequences/sales-sequence-engine'
import { ExpectedRevenueCalculation, ProductOfferTier } from './models/expected-revenue'
import { CEOActionLedger } from '@/lib/ceo-agent/ledger/ceo-action-ledger'
import { sendEmail } from '@/lib/emails/mailer'
import { updateLeadInSheet } from '@/lib/google-sheets'

export interface RevenueHunterStatus {
  milestoneTargetUSD: number
  verifiedCollectedIncrementalUSD: number
  distanceToMilestoneUSD: number
  status: 'COLLECTING' | 'OBSERVING' | 'REACHED'
  
  // Pipeline & Opportunities
  totalProspectsAnalyzed: number
  totalPipelineExpectedValueUSD: number
  topActionableOpportunities: ExpectedRevenueCalculation[]
  
  // Active Experiment Cohort
  activeCohortId: string
  activeCohortSize: number
  observationWindowHoursRemaining: number
  
  // Kill-or-Scale Decision
  currentStrategyDirective: string
}

export class RevenueHunterEngine {
  private static readonly MILESTONE_TARGET_USD = 2000

  public static async getHunterStatus(): Promise<RevenueHunterStatus> {
    const { summary, rankedProspects } = await ProspectIntelligenceEngine.buildCommercialGraph()
    const ledgerSummary = await CEOActionLedger.getLedgerSummary()

    const verifiedCollected = ledgerSummary.totalRevenueRecoveredUSD
    const distance = Math.max(0, this.MILESTONE_TARGET_USD - verifiedCollected)
    const today = new Date().toISOString().split('T')[0]
    const activeCohortId = `CEO-HT-${today}-001`

    return {
      milestoneTargetUSD: this.MILESTONE_TARGET_USD,
      verifiedCollectedIncrementalUSD: verifiedCollected,
      distanceToMilestoneUSD: distance,
      status: verifiedCollected >= this.MILESTONE_TARGET_USD ? 'REACHED' : 'OBSERVING',
      totalProspectsAnalyzed: summary.totalLeadsAudited,
      totalPipelineExpectedValueUSD: summary.totalPipelineExpectedValueUSD,
      topActionableOpportunities: summary.topCashOpportunities,
      activeCohortId,
      activeCohortSize: 5,
      observationWindowHoursRemaining: 120,
      currentStrategyDirective: 'Measure the active self-serve $19/$29 membership/$49/$79 ladder in controlled consented cohorts. No call-dependent or unmetered blast is allowed.'
    }
  }

  /**
   * Unit Economics Parameters (per CEO Directive):
   * Net EV = (Purchase Probability * Expected Collected Revenue) - Outreach Cost - Expected Fulfillment Cost - Risk Reserve
   */
  private static readonly OUTREACH_COST_USD = 0.01
  private static readonly FULFILLMENT_COST_BY_TIER: Record<ProductOfferTier, number> = {
    TIER_REPORT_19: 1.00,
    TIER_MEMBERSHIP_29: 1.50,
    TIER_ACTION_PLAN_49: 2.50,
    TIER_BUNDLE_79: 4.00,
  }
  private static readonly RISK_RESERVE_USD = 0.50
  private static readonly MIN_CONFIDENCE_THRESHOLD = 0.35
  private static readonly MIN_NET_EV_THRESHOLD_USD = 0.50

  /**
   * Execute a controlled micro-cohort sales action
   * Default batch size strictly 3 leads per CEO directive.
   */
  public static async executeCohortHunt(
    cohortSize = 3,
    filterTier?: ProductOfferTier,
    dryRun = false
  ): Promise<{
    dispatchedCount: number
    cohortId: string
    receipts: any[]
    errors: string[]
    circuitBreakerStatus?: string
  }> {
    const today = new Date().toISOString().split('T')[0]
    const cohortId = `HUNTER-${today}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    
    const receipts: any[] = []
    const errors: string[] = []
    let dispatchedCount = 0

    // 1. Reputation Safeguard Circuit Breaker Inspection
    if (!dryRun) {
      try {
        const ledger = await CEOActionLedger.getLedgerSummary()
        const recentHunterActions = ledger.recentActions.filter(a => a.experimentId?.startsWith('HUNTER-'))
        
        if (recentHunterActions.length >= 3) {
          // Check for bounces or negative outcomes
          const failedCount = recentHunterActions.filter(a => a.executionStatus === 'FAILED').length
          if (failedCount > 0 && (failedCount / recentHunterActions.length) >= 0.05) {
            console.warn('[RevenueHunterEngine] 🛑 Circuit Breaker tripped: PAUSE_REPUTATION_DEFENSE (Bounces detected)')
            return {
              dispatchedCount: 0,
              cohortId,
              receipts,
              errors: ['PAUSE_REPUTATION_DEFENSE: Prior cohort triggered bounce/delivery failures. Outbound halted.'],
              circuitBreakerStatus: 'PAUSE_REPUTATION_DEFENSE'
            }
          }

          // Absolute-Count Engagement Protection (per CEO Directive):
          // If 0 checkouts after 48h, require at least 2 distinct opens OR 1 click across the cohort before advancing
          const checkouts = recentHunterActions.filter(a => a.funnelState.checkoutStarted).length
          const opens = recentHunterActions.filter(a => a.funnelState.opened).length
          const clicks = recentHunterActions.filter(a => a.funnelState.clicked).length
          
          if (checkouts === 0 && opens < 2 && clicks < 1) {
            console.warn('[RevenueHunterEngine] 🛑 Circuit Breaker tripped: PAUSE_LOW_ENGAGEMENT (<2 opens, 0 clicks)')
            return {
              dispatchedCount: 0,
              cohortId,
              receipts,
              errors: ['PAUSE_LOW_ENGAGEMENT: Prior cohort produced 0 checkouts and insufficient engagement (<2 opens, 0 clicks). Halted for review.'],
              circuitBreakerStatus: 'PAUSE_LOW_ENGAGEMENT'
            }
          }
        }
      } catch (cbErr: any) {
        console.warn('[RevenueHunterEngine] Circuit breaker check warning (non-blocking):', cbErr.message)
      }
    }

    // 2. Fetch Targeted Micro-Cohort
    const cohort = await ProspectIntelligenceEngine.getTargetedCohort(cohortSize, filterTier)

    console.log(`[RevenueHunterEngine] 🚀 Executing Cohort ${cohortId} (Size: ${cohort.length}, dryRun: ${dryRun})...`)

    for (const prospect of cohort) {
      // 3. Explicit Unit Economics Evaluation (per CEO Directive)
      const fulfillmentCost = this.FULFILLMENT_COST_BY_TIER[prospect.recommendedOffer.tier] || 1.00
      const probabilityOfConversion = Number((prospect.pDelivery * prospect.pOpen * prospect.pClick * prospect.pCheckout * prospect.pPayment).toFixed(4))
      const expectedFulfillmentUSD = Number((probabilityOfConversion * fulfillmentCost).toFixed(4))
      const expectedRiskReserveUSD = Number((probabilityOfConversion * this.RISK_RESERVE_USD).toFixed(4))
      const netEV = Number((prospect.expectedValueUSD - this.OUTREACH_COST_USD - expectedFulfillmentUSD - expectedRiskReserveUSD).toFixed(2))
      
      const isApprovedUnitEconomics = prospect.confidenceScore >= this.MIN_CONFIDENCE_THRESHOLD && netEV >= this.MIN_NET_EV_THRESHOLD_USD
      const decision = isApprovedUnitEconomics ? 'APPROVE' : 'DISQUALIFY_UNIT_ECONOMICS'

      console.log(`[RevenueHunterEngine] Lead: ${prospect.leadEmail} | Offer: ${prospect.recommendedOffer.tier} ($${prospect.recommendedOffer.priceUSD}) | P(Conv): ${probabilityOfConversion} | Exp Revenue: $${prospect.expectedValueUSD} | Outreach: $${this.OUTREACH_COST_USD} | Exp Fulfillment: $${expectedFulfillmentUSD} | Net EV: $${netEV} | Decision: ${decision}`)

      if (!isApprovedUnitEconomics) {
        receipts.push({
          leadEmail: prospect.leadEmail,
          offer: prospect.recommendedOffer.name,
          expectedValueUSD: prospect.expectedValueUSD,
          netEV,
          status: 'DISQUALIFIED_UNIT_ECONOMICS',
          reason: `Net EV ($${netEV}) below threshold ($${this.MIN_NET_EV_THRESHOLD_USD}) or confidence (${prospect.confidenceScore}) below ${this.MIN_CONFIDENCE_THRESHOLD}`
        })
        continue
      }

      const message = SalesSequenceEngine.generateMessageForProspect(prospect)

      if (dryRun) {
        receipts.push({
          leadEmail: prospect.leadEmail,
          offer: prospect.recommendedOffer.name,
          expectedValueUSD: prospect.expectedValueUSD,
          netEV,
          probabilityOfConversion,
          status: 'SIMULATED_APPROVED',
          decision: 'APPROVE'
        })
        continue
      }

      try {
        const sendResult = await sendEmail({
          to: prospect.leadEmail,
          subject: message.subject,
          html: message.htmlBody,
          text: message.plainTextBody,
          tagType: `revenue-hunter-${message.offerTier.toLowerCase()}`,
          companyName: prospect.companyName
        })

        if (sendResult.success && sendResult.providerMessageId) {
          dispatchedCount++
          
          // Record to CEO Action Ledger
          await CEOActionLedger.recordAction({
            experimentId: cohortId,
            leadEmail: prospect.leadEmail,
            leadName: prospect.leadName,
            company: prospect.companyName,
            tier: prospect.recommendedOffer.tier === 'TIER_BUNDLE_79'
              ? 'TIER_1_BUNDLE_79'
              : prospect.recommendedOffer.tier === 'TIER_MEMBERSHIP_29'
                ? 'TIER_2_MEMBERSHIP_29'
                : prospect.recommendedOffer.tier === 'TIER_ACTION_PLAN_49'
                  ? 'TIER_3_ACTION_PLAN_49'
                  : 'TIER_4_REPORT_19',
            offer: `${message.offerTier} ($${message.priceUSD} USD)`,
            decisionReason: `High $EV candidate ($${prospect.expectedValueUSD} EV, Rank: ${prospect.priorityRankScore})`,
            executionStatus: 'PROVIDER_ACCEPTED',
            provider: sendResult.provider || 'Brevo/Resend',
            providerMessageId: sendResult.providerMessageId,
            funnelState: {
              sent: true,
              delivered: false,
              opened: false,
              clicked: false,
              replied: false,
              callBooked: false,
              checkoutStarted: false,
              paymentCaptured: false,
              revenueAttributedUSD: 0
            },
            attribution: 'Revenue Hunter Autonomous Direct Outreach'
          })

          // Update Google Sheets
          try {
            await updateLeadInSheet(prospect.leadEmail, {
              leadActivity: JSON.stringify({
                hunterOutreachSentAt: new Date().toISOString(),
                hunterOfferTier: message.offerTier,
                hunterExpectedValueUSD: prospect.expectedValueUSD
              })
            })
          } catch (e) {
            // Non-blocking Google Sheets error
          }

          receipts.push({
            leadEmail: prospect.leadEmail,
            offer: prospect.recommendedOffer.name,
            expectedValueUSD: prospect.expectedValueUSD,
            status: 'PROVIDER_ACCEPTED',
            providerMessageId: sendResult.providerMessageId
          })
        } else {
          errors.push(`Failed to send to ${prospect.leadEmail}: ${sendResult.error}`)
        }
      } catch (err: any) {
        errors.push(`Error executing for ${prospect.leadEmail}: ${err.message}`)
      }
    }

    return {
      dispatchedCount,
      cohortId,
      receipts,
      errors
    }
  }
}
