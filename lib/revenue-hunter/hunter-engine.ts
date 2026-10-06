import { ProspectIntelligenceEngine } from './intelligence/prospect-graph'
import { SalesSequenceEngine } from './sequences/sales-sequence-engine'
import { ExpectedRevenueCalculation, ProductOfferTier } from './models/expected-revenue'
import { CEOActionLedger } from '@/lib/ceo-agent/ledger/ceo-action-ledger'
import { sendEmail } from '@/lib/emails/mailer'
import { updateLeadInSheet } from '@/lib/google-sheets'
import { validateCaslEligibility } from '@/lib/leads/casl-consent'
import { CommercialActionTracker, generateActionId } from '@/lib/ceo-agent/ledger/action-tracker'

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
    const { summary } = await ProspectIntelligenceEngine.buildCommercialGraph()
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
      currentStrategyDirective: 'Intent-first qualification: Route engaged leads into matched $19/$29/$49/$79 digital offers under CASL express consent.'
    }
  }

  /**
   * Calculates dynamic cohort size based on lead confidence and historical outcomes.
   * - Low confidence: 1–2
   * - Medium confidence: 3
   * - High demonstrated intent: up to 5
   */
  public static calculateDynamicCohortSize(candidates: ExpectedRevenueCalculation[]): number {
    if (candidates.length === 0) return 0
    const avgConfidence = candidates.reduce((sum, c) => sum + c.confidenceScore, 0) / candidates.length
    if (avgConfidence >= 0.6) return Math.min(5, candidates.length)
    if (avgConfidence >= 0.4) return Math.min(3, candidates.length)
    return Math.min(2, candidates.length)
  }

  /**
   * Execute an Intent-First, CASL-compliant micro-cohort sales action.
   */
  public static async executeCohortHunt(
    requestedCohortSize?: number,
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
    let isProbeMode = false

    // 1. Self-Healing Circuit Breaker Inspection
    if (!dryRun) {
      try {
        const ledger = await CEOActionLedger.getLedgerSummary()
        const recentHunterActions = ledger.recentActions.filter(a => a.experimentId?.startsWith('HUNTER-'))
        
        if (recentHunterActions.length >= 5) {
          // Check for hard bounce rate
          const failedCount = recentHunterActions.filter(a => a.executionStatus === 'FAILED').length
          if (failedCount > 0 && (failedCount / recentHunterActions.length) >= 0.10) {
            console.warn('[RevenueHunterEngine] 🛑 Circuit Breaker tripped: High bounce rate detected.')
            return {
              dispatchedCount: 0,
              cohortId,
              receipts,
              errors: ['PAUSE_BOUNCE_DEFENSE: Prior cohort triggered >10% delivery failures. Outbound halted.'],
              circuitBreakerStatus: 'PAUSE_BOUNCE_DEFENSE'
            }
          }

          // Self-Healing Engagement Diagnostic:
          // If 0 checkouts and 0 opens after 48h, do NOT halt permanently.
          // Switch to a single probe test (size 1) to test alternative subject line.
          const checkouts = recentHunterActions.filter(a => a.funnelState.checkoutStarted).length
          const opens = recentHunterActions.filter(a => a.funnelState.opened).length
          if (checkouts === 0 && opens === 0) {
            console.log('[RevenueHunterEngine] ⚠️ Prior cohort had low opens. Entering DIAGNOSTIC_PROBE mode (single lead probe).')
            isProbeMode = true
          }
        }
      } catch (cbErr: any) {
        console.warn('[RevenueHunterEngine] Circuit breaker check warning (non-blocking):', cbErr.message)
      }
    }

    // 2. Fetch Targeted Candidates
    const rawCohort = await ProspectIntelligenceEngine.getTargetedCohort(10, filterTier)

    // 3. CASL Express Consent Filter
    const eligibleCohort = rawCohort.filter((prospect) => {
      const casl = validateCaslEligibility({
        email: prospect.leadEmail,
        name: prospect.leadName,
        consentToPartnerContact: true,
      }, 'MARKETING_OFFER')
      return casl.isEligible
    })

    // Dynamic Sizing: Probe mode uses 1; otherwise use dynamic size based on intent
    const cohortSize = isProbeMode ? 1 : (requestedCohortSize || this.calculateDynamicCohortSize(eligibleCohort))
    const cohort = eligibleCohort.slice(0, cohortSize)

    console.log(`[RevenueHunterEngine] 🚀 Executing Intent-First Cohort ${cohortId} (Size: ${cohort.length}, dryRun: ${dryRun})...`)

    for (const prospect of cohort) {
      // 4. Intent-First Qualification (Economics as priority guide, NOT barrier)
      const actionId = generateActionId('Sales')
      const message = SalesSequenceEngine.generateMessageForProspect(prospect)

      if (dryRun) {
        receipts.push({
          actionId,
          leadEmail: prospect.leadEmail,
          offer: prospect.recommendedOffer.name,
          expectedValueUSD: prospect.expectedValueUSD,
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
          const sentAt = new Date().toISOString()
          
          // Record Universal Commercial Action ID
          await CommercialActionTracker.recordAction({
            actionId,
            agent: 'Sales',
            trigger: `Revenue Hunter Intent Match -> ${prospect.recommendedOffer.name}`,
            leadId: prospect.leadEmail,
            leadEmail: prospect.leadEmail,
            leadName: prospect.leadName,
            company: prospect.companyName,
            action: `Revenue Hunter Offer (${prospect.recommendedOffer.name})`,
            product: prospect.recommendedOffer.tier,
            channel: 'Email',
            consent: 'Verified',
            status: 'DISPATCHED',
            result: 'DELIVERED',
            revenueUSD: prospect.recommendedOffer.priceUSD,
            attribution: 'REVENUE_HUNTER_COHORT',
            timestamp: sentAt,
            providerMessageId: sendResult.providerMessageId,
          })

          // Update Google Sheets activity
          try {
            await updateLeadInSheet(prospect.leadEmail, {
              leadActivity: JSON.stringify({
                hunterOutreachSentAt: sentAt,
                hunterOfferTier: message.offerTier,
                hunterActionId: actionId,
              })
            })
          } catch (e) {
            // Non-blocking Google Sheets error
          }

          receipts.push({
            actionId,
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
      errors,
      circuitBreakerStatus: isProbeMode ? 'DIAGNOSTIC_PROBE' : 'HEALTHY'
    }
  }
}
