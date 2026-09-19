import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config()

import { SubscriberRepository, type SubscriberProfile } from '../lib/leads/SubscriberRepository'
import { ExpectedRevenueModel } from '../lib/revenue-hunter/models/expected-revenue'
import { isTestOrInternalLead } from '../lib/revenue-hunter/intelligence/prospect-graph'
import { RevenueHunterEngine } from '../lib/revenue-hunter/hunter-engine'
import { SalesSequenceEngine } from '../lib/revenue-hunter/sequences/sales-sequence-engine'

async function diagnoseRevenueHunter() {
  console.log('===============================================================')
  console.log('🔍 REVENUE HUNTER CANDIDATE SELECTION & UNIT ECONOMICS AUDIT')
  console.log('===============================================================\n')

  let subscribers: SubscriberProfile[] = []
  try {
    subscribers = await SubscriberRepository.getAllSubscribers(false)
  } catch (err: any) {
    console.error('❌ Failed to fetch subscribers from Google Sheets:', err.message)
    return
  }

  console.log(`📊 1. Total Raw Leads in Database: ${subscribers.length}`)

  let internalTestCount = 0
  let unsubscribedCount = 0
  let noConsentCount = 0
  let validCandidates: SubscriberProfile[] = []

  for (const sub of subscribers) {
    if (!sub.email || !sub.email.includes('@')) continue

    if (isTestOrInternalLead(sub.email, sub.name)) {
      internalTestCount++
      continue
    }

    if (sub.isSubscribed === false || (sub.subscriptionCancelledAt && sub.subscriptionCancelledAt !== 'N/A')) {
      unsubscribedCount++
      continue
    }

    let parsedActivity: Record<string, any> = {}
    if (sub.leadActivity && sub.leadActivity !== 'N/A') {
      try { parsedActivity = JSON.parse(sub.leadActivity) } catch {}
    }

    const hasExplicitConsent = 
      sub.consentToPartnerContact === true || 
      parsedActivity.consentToPartnerContact === true || 
      parsedActivity.commercialConsent === true ||
      parsedActivity.explicitOutboundConsent === true

    if (!hasExplicitConsent) {
      noConsentCount++
      continue
    }

    validCandidates.push(sub)
  }

  console.log(`   ├── Test/Internal Excluded: ${internalTestCount}`)
  console.log(`   ├── Unsubscribed/Suppressed Excluded: ${unsubscribedCount}`)
  console.log(`   ├── Lacking Explicit Outbound Consent: ${noConsentCount}`)
  console.log(`   └── ✅ Consent-Qualified Commercial Candidates: ${validCandidates.length}\n`)

  if (validCandidates.length === 0) {
    console.log('⚠️ No leads currently meet the explicit outbound consent criteria.')
    return
  }

  console.log('📐 2. Unit Economics Evaluation per Candidate:')
  console.log('---------------------------------------------------------------')

  const FULFILLMENT_COST: Record<string, number> = {
    TIER_REPORT_19: 1.00,
    TIER_MEMBERSHIP_29: 1.50,
    TIER_ACTION_PLAN_49: 2.50,
    TIER_BUNDLE_79: 4.00,
  }
  const OUTREACH_COST = 0.01
  const RISK_RESERVE = 0.50
  const MIN_CONFIDENCE = 0.35
  const MIN_NET_EV = 0.50

  const qualifiedForDispatch: any[] = []
  const disqualified: any[] = []

  for (const sub of validCandidates) {
    const calc = ExpectedRevenueModel.calculateExpectedRevenue({
      email: sub.email,
      name: sub.name,
      companyName: sub.companyName,
      industry: sub.industry,
      region: sub.region,
      fundingAmount: sub.fundingAmount,
      readinessScore: sub.readinessScore,
      engagementScore: sub.engagementScore,
      leadActivity: sub.leadActivity,
      timestamp: sub.timestamp,
      companySize: sub.companySize
    })

    const offerTier = calc.recommendedOffer.tier
    const price = calc.recommendedOffer.priceUSD
    const pConversion = Number((calc.pDelivery * calc.pOpen * calc.pClick * calc.pCheckout * calc.pPayment).toFixed(4))
    const fulfillment = FULFILLMENT_COST[offerTier] || 1.00
    const expectedFulfillment = Number((pConversion * fulfillment).toFixed(4))
    const expectedRiskReserve = Number((pConversion * RISK_RESERVE).toFixed(4))
    const netEV = Number((calc.expectedValueUSD - OUTREACH_COST - expectedFulfillment - expectedRiskReserve).toFixed(2))

    const isQualified = calc.confidenceScore >= MIN_CONFIDENCE && netEV >= MIN_NET_EV

    const record = {
      email: sub.email,
      name: sub.name || 'Founder',
      company: sub.companyName || 'Enterprise',
      industry: sub.industry || 'General',
      offerTier,
      price,
      pConversion,
      expectedRevenueUSD: calc.expectedValueUSD,
      outreachCost: OUTREACH_COST,
      fulfillmentCost: fulfillment,
      riskReserve: RISK_RESERVE,
      netEV,
      confidenceScore: calc.confidenceScore,
      priorityRankScore: calc.priorityRankScore,
      calc
    }

    if (isQualified) {
      qualifiedForDispatch.push(record)
    } else {
      disqualified.push({
        email: sub.email,
        reason: `netEV ($${netEV}) < $${MIN_NET_EV} or confidence (${calc.confidenceScore}) < ${MIN_CONFIDENCE}`
      })
    }
  }

  console.log(`   ├── Economic-Qualified: ${qualifiedForDispatch.length}`)
  console.log(`   └── Disqualified by Economics/Confidence: ${disqualified.length}`)
  if (disqualified.length > 0) {
    disqualified.slice(0, 3).forEach(d => console.log(`       - ${d.email.slice(0, 3)}***: ${d.reason}`))
  }

  // Sort strictly by priorityRankScore descending
  qualifiedForDispatch.sort((a, b) => b.priorityRankScore - a.priorityRankScore || b.netEV - a.netEV)

  const selectedCohort = qualifiedForDispatch.slice(0, 3)

  console.log('\n🎯 3. Selected Top 3 Micro-Cohort for Initial Live Outreach:')
  console.log('===============================================================')

  selectedCohort.forEach((c, idx) => {
    console.log(`Candidate #${idx + 1}:`)
    console.log(`  • Email: ${c.email.slice(0, 3)}***@${c.email.split('@')[1] || ''}`)
    console.log(`  • Company: ${c.company} | Industry: ${c.industry}`)
    console.log(`  • Recommended Product: ${c.offerTier} ($${c.price} USD)`)
    console.log(`  • Conversion Probability: ${(c.pConversion * 100).toFixed(2)}% | Confidence: ${c.confidenceScore}`)
    console.log(`  • Expected Revenue: $${c.expectedRevenueUSD} USD`)
    console.log(`  • Costs: Outreach ($0.01) + Fulfillment ($${c.fulfillmentCost}) + Risk ($0.50)`)
    console.log(`  • Net Expected Value: $${c.netEV} USD`)
    console.log(`  • Priority Rank Score: ${c.priorityRankScore}`)
    
    const msg = SalesSequenceEngine.generateMessageForProspect(c.calc)
    console.log(`  • Personalized Subject: "${msg.subject}"`)
    console.log('---------------------------------------------------------------')
  })

  console.log('\n✅ Revenue Hunter candidate-level diagnostic complete. Zero live emails dispatched.')
}

diagnoseRevenueHunter().catch(console.error)
