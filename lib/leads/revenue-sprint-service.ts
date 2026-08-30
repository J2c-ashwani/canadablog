import { isLoginToken, isUnsubscribeToken } from '@/lib/auth/subscriber-tokens'
import { buildEmailActionContext, getGrowthActionEvents } from '@/lib/growth-os/action-attribution'
import { isProviderVerifiedPurchase } from '@/lib/growth-os/evidence-metrics'
import {
  hasRecentCommercialProviderAcceptance,
  isTestOrInternalContact,
  parseCommercialActivity,
} from '@/lib/leads/commercial-eligibility'
import {
  ensureScopedSubscriberTokens,
  SubscriberRepository,
  type SubscriberProfile,
} from '@/lib/leads/SubscriberRepository'
import { getLatestMembershipSubscriptions } from '@/lib/membership/membership-store'
import { getAllPurchases } from '@/lib/products/purchase-store'
import {
  getRevenueSprintOffer,
  sendRevenueSprintOffer,
  type RevenueSprintOfferId,
} from '@/lib/emails/revenue-sprint'

export const REVENUE_SPRINT_START_AT = '2026-08-30T00:00:00.000Z'
export const REVENUE_SPRINT_END_AT = '2026-08-31T18:29:59.000Z'
const INITIAL_COHORT_CAP = 20
const CHECKOUT_VALIDATED_CAP = 40
const PAYMENT_VALIDATED_CAP = 100

type Candidate = {
  subscriber: SubscriberProfile
  offerId: RevenueSprintOfferId
  priority: number
}

export interface RevenueSprintRunSummary {
  active: boolean
  dryRun: boolean
  decision: 'INITIAL_COHORT' | 'SCALE_CHECKOUT' | 'SCALE_PAYMENT' | 'PAUSE_NO_CHECKOUT' | 'CAP_REACHED' | 'EXPIRED'
  reason: string
  cohortCap: number
  previouslyProviderAccepted: number
  observedClicks: number
  observedCheckouts: number
  observedPurchases: number
  observedRevenueUSD: number
  availableCandidates: number
  attempted: number
  providerAccepted: number
  failed: number
  offerMix: Record<RevenueSprintOfferId, number>
  receipts: Array<{
    recipientId: string
    offerId: RevenueSprintOfferId
    provider: string
    providerMessageId: string
  }>
  errors: string[]
  generatedAt: string
}

function amountSignal(value?: string) {
  const normalized = String(value || '').toLowerCase().replace(/,/g, '')
  if (normalized.includes('million') || /\b[1-9](?:\.\d+)?m\b/.test(normalized)) return 1_000_000
  const numbers = normalized.match(/\d+(?:\.\d+)?/g)?.map(Number) || []
  const largest = Math.max(0, ...numbers)
  return normalized.includes('k') ? largest * 1000 : largest
}

function chooseOffer(subscriber: SubscriberProfile): { offerId: RevenueSprintOfferId; priority: number } {
  const activity = parseCommercialActivity(subscriber.leadActivity)
  const checkoutProductId = String(activity.checkoutProductId || '')
  const priceShown = Number(String(activity.priceShown || '').replace(/[^0-9.]/g, ''))
  const checkoutStartedAt = new Date(activity.checkoutStartedAt || '').getTime()
  const hasRecentCheckout = Number.isFinite(checkoutStartedAt)
    && checkoutStartedAt >= Date.now() - 30 * 24 * 60 * 60 * 1000

  if (hasRecentCheckout) {
    if (checkoutProductId === 'funding-bundle' || priceShown >= 79) return { offerId: 'funding-bundle', priority: 1200 }
    if (checkoutProductId === 'funding-roadmap' || priceShown >= 49) return { offerId: 'funding-roadmap', priority: 1150 }
    if (checkoutProductId === 'funding-membership') return { offerId: 'funding-membership', priority: 1100 }
    return { offerId: 'funding-match-report', priority: 1050 }
  }

  const readiness = Number.isFinite(Number(subscriber.readinessScore)) ? Number(subscriber.readinessScore) : 0
  const companySize = String(subscriber.companySize || '')
  const fundingAmount = amountSignal(subscriber.fundingAmount)
  const industry = String(subscriber.industry || '').toLowerCase()
  const source = `${subscriber.source || ''} ${subscriber.pagePath || ''}`.toLowerCase()
  const highFitIndustry = ['tech', 'software', 'manufactur', 'clean', 'agri', 'health', 'biotech', 'life science', 'ai']
    .some((signal) => industry.includes(signal))
  const multiPersonCompany = !['', '1-9', 'n/a'].includes(companySize.toLowerCase())
  const highIntentSignals = [readiness >= 65, fundingAmount >= 100_000, highFitIndustry && multiPersonCompany]
    .filter(Boolean).length

  if (highIntentSignals >= 2 || readiness >= 75 || (fundingAmount >= 100_000 && highFitIndustry)) {
    return { offerId: 'funding-bundle', priority: 800 + readiness }
  }
  if (highIntentSignals >= 1 || readiness >= 45 || fundingAmount >= 50_000) {
    return { offerId: 'funding-roadmap', priority: 600 + readiness }
  }
  if (source.includes('alert') || source.includes('newsletter') || source.includes('monitor')) {
    return { offerId: 'funding-membership', priority: 400 + Number(subscriber.engagementScore || 0) / 10 }
  }
  return { offerId: 'funding-match-report', priority: 200 + Number(subscriber.engagementScore || 0) / 10 }
}

function blankMix(): Record<RevenueSprintOfferId, number> {
  return {
    'funding-bundle': 0,
    'funding-roadmap': 0,
    'funding-membership': 0,
    'funding-match-report': 0,
  }
}

export class RevenueSprintService {
  public static async processBatch(limit = 20, dryRun = false): Promise<RevenueSprintRunSummary> {
    const generatedAt = new Date().toISOString()
    const now = Date.now()
    const events = await getGrowthActionEvents()
    const sprintEvents = events.filter((event) =>
      event.campaign.startsWith('revenue-sprint-')
      && new Date(event.occurredAt).getTime() >= new Date(REVENUE_SPRINT_START_AT).getTime()
    )
    const acceptedMessageIds = new Set(sprintEvents
      .filter((event) => event.eventType === 'provider_accepted')
      .map((event) => event.providerMessageId)
      .filter(Boolean))
    const recentAcceptanceCutoff = now - 48 * 60 * 60 * 1000
    const recentlyAcceptedRecipientIds = new Set(events
      .filter((event) => event.eventType === 'provider_accepted')
      .filter((event) => new Date(event.occurredAt).getTime() >= recentAcceptanceCutoff)
      .map((event) => event.recipientId)
      .filter(Boolean))
    const clicks = new Set(sprintEvents
      .filter((event) => event.eventType === 'click')
      .map((event) => `${event.actionId}:${event.recipientId}`))
    const checkouts = new Set(sprintEvents
      .filter((event) => event.eventType === 'checkout_started')
      .map((event) => event.referenceId || `${event.actionId}:${event.recipientId}`))
    const purchaseEvents = sprintEvents.filter((event) =>
      event.eventType === 'purchase_verified'
      || event.eventType === 'subscription_verified'
      || event.eventType === 'membership_payment_verified'
    )
    const purchases = new Set(purchaseEvents.map((event) => event.referenceId || event.eventId))
    const observedRevenueUSD = Number(purchaseEvents.reduce((sum, event) => sum + Number(event.revenueUSD || 0), 0).toFixed(2))

    let decision: RevenueSprintRunSummary['decision'] = 'INITIAL_COHORT'
    let cohortCap = INITIAL_COHORT_CAP
    let reason = 'Run the first evidence cohort and require checkout evidence before expanding.'
    if (now > new Date(REVENUE_SPRINT_END_AT).getTime()) {
      decision = 'EXPIRED'
      cohortCap = acceptedMessageIds.size
      reason = 'The time-bounded August revenue sprint has ended; no additional recipients will be contacted.'
    } else if (purchases.size > 0) {
      decision = 'SCALE_PAYMENT'
      cohortCap = PAYMENT_VALIDATED_CAP
      reason = 'At least one provider-verified payment is attributed to this sprint; scale within the consented inventory.'
    } else if (checkouts.size > 0) {
      decision = 'SCALE_CHECKOUT'
      cohortCap = CHECKOUT_VALIDATED_CAP
      reason = 'At least one server-verified checkout is attributed to this sprint; expand once while awaiting payment evidence.'
    } else if (acceptedMessageIds.size >= INITIAL_COHORT_CAP) {
      decision = 'PAUSE_NO_CHECKOUT'
      cohortCap = INITIAL_COHORT_CAP
      reason = 'Twenty provider-accepted messages produced no checkout evidence; distribution is paused to protect deliverability.'
    }

    const summary: RevenueSprintRunSummary = {
      active: decision !== 'EXPIRED',
      dryRun,
      decision,
      reason,
      cohortCap,
      previouslyProviderAccepted: acceptedMessageIds.size,
      observedClicks: clicks.size,
      observedCheckouts: checkouts.size,
      observedPurchases: purchases.size,
      observedRevenueUSD,
      availableCandidates: 0,
      attempted: 0,
      providerAccepted: 0,
      failed: 0,
      offerMix: blankMix(),
      receipts: [],
      errors: [],
      generatedAt,
    }
    const remainingCapacity = Math.max(0, cohortCap - acceptedMessageIds.size)
    if (decision === 'EXPIRED' || decision === 'PAUSE_NO_CHECKOUT' || remainingCapacity === 0) {
      if (remainingCapacity === 0 && !['EXPIRED', 'PAUSE_NO_CHECKOUT'].includes(decision)) {
        summary.decision = 'CAP_REACHED'
        summary.reason = 'The current evidence-gated cohort cap has been reached.'
      }
      return summary
    }

    const [subscribers, verifiedPurchases, memberships] = await Promise.all([
      SubscriberRepository.getAllSubscribers(false, true),
      getAllPurchases({ strict: true }),
      getLatestMembershipSubscriptions(),
    ])
    const verifiedBuyerEmails = new Set(verifiedPurchases
      .filter(isProviderVerifiedPurchase)
      .map((purchase) => purchase.email.toLowerCase().trim()))
    const activeMemberEmails = new Set(memberships
      .filter((membership) => membership.status === 'ACTIVE' && Boolean(membership.providerVerifiedAt))
      .map((membership) => membership.email.toLowerCase().trim()))

    const candidates: Candidate[] = subscribers
      .filter((subscriber) => subscriber.isSubscribed && Boolean(subscriber.email))
      .filter((subscriber) => !isTestOrInternalContact(subscriber))
      .filter((subscriber) => !verifiedBuyerEmails.has(subscriber.email.toLowerCase().trim()))
      .filter((subscriber) => !activeMemberEmails.has(subscriber.email.toLowerCase().trim()))
      .filter((subscriber) => !hasRecentCommercialProviderAcceptance(subscriber))
      .filter((subscriber) => !recentlyAcceptedRecipientIds.has(
        buildEmailActionContext('revenue-sprint-report-19', subscriber.email).recipientId
      ))
      .filter((subscriber) => !parseCommercialActivity(subscriber.leadActivity).revenueSprintProviderMessageId)
      .map((subscriber) => ({ subscriber, ...chooseOffer(subscriber) }))
      .sort((left, right) => right.priority - left.priority)
    summary.availableCandidates = candidates.length

    const batch = candidates.slice(0, Math.min(limit, remainingCapacity))
    for (const candidate of batch) {
      const subscriber = candidate.subscriber
      const offer = getRevenueSprintOffer(candidate.offerId)
      let loginToken = subscriber.loginToken || ''
      let unsubscribeToken = subscriber.unsubscribeToken || ''
      summary.attempted++
      summary.offerMix[candidate.offerId]++
      if (dryRun) continue
      if (!isLoginToken(loginToken, loginToken) || !isUnsubscribeToken(unsubscribeToken, unsubscribeToken)) {
        const credentials = await ensureScopedSubscriberTokens(subscriber.email)
        if (!credentials) {
          summary.failed++
          summary.errors.push(`${buildEmailActionContext(offer.tagType, subscriber.email).recipientId}: secure credentials could not be issued`)
          continue
        }
        loginToken = credentials.loginToken
        unsubscribeToken = credentials.unsubscribeToken
      }

      const result = await sendRevenueSprintOffer({
        to: subscriber.email,
        name: subscriber.name,
        companyName: subscriber.companyName,
        industry: subscriber.industry,
        region: subscriber.region,
        loginToken,
        unsubscribeToken,
        offerId: candidate.offerId,
      })
      const recipientId = buildEmailActionContext(offer.tagType, subscriber.email).recipientId
      if (!result.success || !result.providerMessageId) {
        summary.failed++
        summary.errors.push(`${recipientId}: ${result.error || 'provider message ID missing'}`)
        continue
      }

      const activity = parseCommercialActivity(subscriber.leadActivity)
      activity.revenueSprintAcceptedAt = new Date().toISOString()
      activity.revenueSprintProvider = result.provider || ''
      activity.revenueSprintProviderMessageId = result.providerMessageId
      activity.revenueSprintOfferId = candidate.offerId
      activity.revenueSprintPriceUSD = offer.price
      const saved = await SubscriberRepository.updateSubscriberPreferences(subscriber.email, {
        leadActivity: JSON.stringify(activity),
      })
      if (!saved.success) {
        summary.failed++
        summary.errors.push(`${recipientId}: provider accepted, but the CRM receipt was not persisted`)
      }
      summary.providerAccepted++
      summary.receipts.push({
        recipientId,
        offerId: candidate.offerId,
        provider: result.provider || '',
        providerMessageId: result.providerMessageId,
      })
    }

    return summary
  }
}
