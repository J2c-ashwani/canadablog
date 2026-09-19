import assert from 'assert'
import { validateCronAuth } from '../lib/auth/cron-auth'
import { RevenueHunterEngine } from '../lib/revenue-hunter/hunter-engine'
import { CEOActionLedger } from '../lib/ceo-agent/ledger/ceo-action-ledger'
import { ProspectIntelligenceEngine } from '../lib/revenue-hunter/intelligence/prospect-graph'

console.log('🚀 Running Master Commercial Recovery E2E Test (CEO Directive #13)...')

async function runMasterE2ETest() {
  const TEST_SECRET = 'e2e_master_cron_secret_tok_998877'
  process.env.CRON_SECRET = TEST_SECRET

  // ── Stage 1: Authenticated Cron Contract ──
  console.log('Stage 1: Testing canonical header authentication...')
  const reqAuth = new Request('https://www.fsidigital.ca/api/cron/process-revenue-hunter', {
    headers: { 'Authorization': `Bearer ${TEST_SECRET}` }
  })
  const authResult = validateCronAuth(reqAuth)
  assert(authResult.authorized === true, 'Header-authenticated cron request must be authorized')
  console.log('✅ Stage 1 Passed: Header authentication verified')

  // ── Stage 2: Revenue Hunter Dry Run & Unit Economics ──
  console.log('Stage 2: Executing Revenue Hunter diagnostic dry run...')
  const huntResult = await RevenueHunterEngine.executeCohortHunt(3, undefined, true)
  assert(huntResult.cohortId.startsWith('HUNTER-'), 'Cohort ID generated with correct prefix')
  assert(huntResult.dispatchedCount === 0, 'Dry run must dispatch zero real emails')
  assert(Array.isArray(huntResult.receipts), 'Receipts array returned')
  console.log(`✅ Stage 2 Passed: Revenue Hunter dry run executed (${huntResult.receipts.length} candidate evaluations)`)

  // ── Stage 3: Canonical Consent & Hygiene Filter ──
  console.log('Stage 3: Verifying canonical consent filtering in prospect graph...')
  const { summary, rankedProspects } = await ProspectIntelligenceEngine.buildCommercialGraph()
  for (const prospect of rankedProspects) {
    assert(prospect.leadEmail.includes('@'), 'Prospect email must be valid')
    assert(!prospect.leadEmail.includes('@example.com'), 'Test emails excluded from commercial graph')
    assert(!prospect.leadEmail.includes('@fsidigital.ca'), 'Internal emails excluded from commercial graph')
  }
  console.log(`✅ Stage 3 Passed: Commercial graph validated (${summary.totalLeadsAudited} audited leads, $${summary.totalPipelineExpectedValueUSD} total $EV)`)

  // ── Stage 4: Synthetic Provider Payment Event (First Capture) ──
  console.log('Stage 4: Recording verified provider payment capture (+$49.00 USD)...')
  const initialSummary = await CEOActionLedger.getLedgerSummary()
  const initialNetRevenue = initialSummary.totalNetRecognizedRevenueUSD

  const testPaymentId = `e2e_capture_${Date.now()}`
  const testEventId = `evt_stripe_${Date.now()}`

  const captureResult1 = await CEOActionLedger.recordPaymentAttribution({
    provider: 'stripe',
    providerPaymentId: testPaymentId,
    providerEventId: testEventId,
    buyerEmail: 'verified-founder@growthclient.ca',
    buyerName: 'Jane Founder',
    company: 'NextGen BioTech Inc',
    amountUSD: 49.00,
    productId: 'funding-roadmap',
    attribution: 'E2E Automated Master Test'
  })

  assert(captureResult1.success === true, 'First payment attribution must succeed')
  assert(captureResult1.duplicate === false, 'First payment must not be flagged as duplicate')

  const postCapture1Summary = await CEOActionLedger.getLedgerSummary()
  assert(
    postCapture1Summary.totalNetRecognizedRevenueUSD === Number((initialNetRevenue + 49.00).toFixed(2)),
    `Net revenue must increase by exactly $49.00 (was: ${initialNetRevenue}, now: ${postCapture1Summary.totalNetRecognizedRevenueUSD})`
  )
  console.log(`✅ Stage 4 Passed: Provider payment captured (+$49.00). Net recognized: $${postCapture1Summary.totalNetRecognizedRevenueUSD}`)

  // ── Stage 5: Idempotency Replay Guard (Zero Double-Counting) ──
  console.log('Stage 5: Simulating duplicate webhook delivery of the exact same payment event...')
  const captureResult2 = await CEOActionLedger.recordPaymentAttribution({
    provider: 'stripe',
    providerPaymentId: testPaymentId,
    providerEventId: testEventId,
    buyerEmail: 'verified-founder@growthclient.ca',
    buyerName: 'Jane Founder',
    company: 'NextGen BioTech Inc',
    amountUSD: 49.00,
    productId: 'funding-roadmap',
    attribution: 'E2E Duplicate Webhook Retry'
  })

  assert(captureResult2.success === true, 'Duplicate call must gracefully succeed')
  assert(captureResult2.duplicate === true, 'Duplicate provider payment must be flagged DUPLICATE')

  const postCapture2Summary = await CEOActionLedger.getLedgerSummary()
  assert(
    postCapture2Summary.totalNetRecognizedRevenueUSD === postCapture1Summary.totalNetRecognizedRevenueUSD,
    'Revenue must NOT increase upon replaying the duplicate payment event (Zero Double-Counting)'
  )
  assert(
    postCapture2Summary.totalGrossRevenueCapturedUSD === postCapture1Summary.totalGrossRevenueCapturedUSD,
    'Gross captured revenue must remain strictly identical'
  )
  console.log(`✅ Stage 5 Passed: Idempotency enforced! Duplicate payment event rejected with +$0 revenue`)

  // ── Stage 6: Refund & Chargeback Reversal Accounting ──
  console.log('Stage 6: Simulating verified provider refund event (-$49.00 USD)...')
  const reversalResult = await CEOActionLedger.recordPaymentReversal({
    provider: 'stripe',
    providerPaymentId: testPaymentId,
    providerEventId: `reversal_evt_${Date.now()}`,
    buyerEmail: 'verified-founder@growthclient.ca',
    amountUSD: 49.00,
    type: 'refund',
    reason: 'Customer requested refund within policy'
  })

  assert(reversalResult.success === true, 'Payment reversal must be recorded')
  assert(reversalResult.duplicate === false, 'First reversal must not be duplicate')

  const postReversalSummary = await CEOActionLedger.getLedgerSummary()
  assert(
    postReversalSummary.totalRefundsUSD >= 49.00,
    'Total refunds must include the $49.00 refund'
  )
  assert(
    postReversalSummary.totalNetRecognizedRevenueUSD === initialNetRevenue,
    `Net recognized revenue must decrement back to initial baseline ($${initialNetRevenue}) after refund`
  )
  console.log(`✅ Stage 6 Passed: Refund lifecycle accounting verified! Net recognized revenue accurately decremented to $${postReversalSummary.totalNetRecognizedRevenueUSD}`)

  console.log('\n🏆 ALL 6 STAGES OF THE MASTER COMMERCIAL RECOVERY E2E TEST PASSED!')
}

runMasterE2ETest().catch((err) => {
  console.error('❌ Master E2E Test failed:', err)
  process.exit(1)
})
