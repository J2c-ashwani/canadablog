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
      currentStrategyDirective: 'Active Business Day Cohort Observation (Aug 14–19 factoring in weekend): Measuring response rates for top Tier-1 & Tier-2 prospects. No unmetered blast allowed.'
    }
  }

  /**
   * Execute a controlled micro-cohort sales action
   */
  public static async executeCohortHunt(
    cohortSize = 5,
    filterTier?: ProductOfferTier,
    dryRun = false
  ): Promise<{
    dispatchedCount: number
    cohortId: string
    receipts: any[]
    errors: string[]
  }> {
    const today = new Date().toISOString().split('T')[0]
    const cohortId = `HUNTER-${today}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    const cohort = await ProspectIntelligenceEngine.getTargetedCohort(cohortSize, filterTier)

    const receipts: any[] = []
    const errors: string[] = []
    let dispatchedCount = 0

    console.log(`[RevenueHunterEngine] 🚀 Executing Cohort ${cohortId} (Size: ${cohort.length}, dryRun: ${dryRun})...`)

    for (const prospect of cohort) {
      const message = SalesSequenceEngine.generateMessageForProspect(prospect)

      if (dryRun) {
        receipts.push({
          leadEmail: prospect.leadEmail,
          offer: prospect.recommendedOffer.name,
          expectedValueUSD: prospect.expectedValueUSD,
          status: 'SIMULATED'
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

        if (sendResult.success) {
          dispatchedCount++
          
          // Record to CEO Action Ledger
          await CEOActionLedger.recordAction({
            experimentId: cohortId,
            leadEmail: prospect.leadEmail,
            leadName: prospect.leadName,
            company: prospect.companyName,
            tier: prospect.recommendedOffer.tier === 'TIER_FILING_2500' ? 'TIER_1_FILING_2500' : (prospect.recommendedOffer.tier === 'TIER_STRATEGY_199' ? 'TIER_2_STRATEGY_199' : 'TIER_3_REPORT_49'),
            offer: `${message.offerTier} ($${message.priceUSD} USD)`,
            decisionReason: `High $EV candidate ($${prospect.expectedValueUSD} EV, Rank: ${prospect.priorityRankScore})`,
            executionStatus: 'EXECUTED_DELIVERED',
            provider: sendResult.provider || 'Brevo/Resend',
            providerMessageId: sendResult.providerMessageId || `msg_${Date.now()}`,
            funnelState: {
              sent: true,
              delivered: true,
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
            status: 'DELIVERED',
            providerMessageId: sendResult.providerMessageId || `msg_${Date.now()}`
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
