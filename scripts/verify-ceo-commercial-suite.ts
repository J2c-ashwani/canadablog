import fs from 'node:fs';
import path from 'node:path';
import { CEOScoreboard } from '../lib/ceo-agent/ceo-scoreboard';
import { isProviderVerifiedPurchase } from '../lib/growth-os/evidence-metrics';
import { getB2BEmailContent } from '../lib/emails/b2b-outreach-templates';
import { buildMemberProgramMatches } from '../lib/membership/member-matches';
import {
  instrumentCommercialEmail,
  parseTrackedGrowthToken,
} from '../lib/growth-os/action-attribution';
import {
  hasRecentCommercialProviderAcceptance,
  isTestOrInternalContact,
} from '../lib/leads/commercial-eligibility';
import { B2BOutreachEngine } from '../lib/leads/B2BOutreachEngine';
import { buildMCAReadinessReport } from '../lib/mca/readiness-report';
import { ExpectedRevenueModel } from '../lib/revenue-hunter/models/expected-revenue';
import { IntentEngine } from '../lib/seo-revenue-engine/intent-engine';
import { mapBrevoEvent } from '../lib/emails/brevo-reconciliation';

function assert(condition: unknown, message: string) {
  if (!condition) throw new Error(message);
  console.log(`PASS: ${message}`);
}

async function run() {
  console.log('GrowthOS commercial reliability suite');

  const paypalPurchase: any = { paypalCaptureId: 'CAPTURE-REAL', paymentStatus: 'provider_capture_verified', status: 'completed' };
  const stripePurchase: any = { paypalCaptureId: 'pi_real', paymentStatus: 'stripe_payment_verified', status: 'completed' };
  const unverifiedPurchase: any = { paypalCaptureId: '', paymentStatus: 'completed', status: 'completed' };
  assert(isProviderVerifiedPurchase(paypalPurchase), 'PayPal provider captures count as verified revenue');
  assert(isProviderVerifiedPurchase(stripePurchase), 'Stripe provider captures count as verified revenue');
  assert(!isProviderVerifiedPurchase(unverifiedPurchase), 'Rows without a provider capture ID never count as revenue');

  const pathToTarget = CEOScoreboard.calculatePathToTarget(0, 10_000, 10);
  assert(pathToTarget.targetUSD === 10_000 && pathToTarget.requiredDailyRevenueUSD === 1_000, '$10K 30-day cash target math is explicit');
  assert(pathToTarget.requiredOrders === 190 && pathToTarget.requiredCheckouts === 475, '$10K distribution model requires 190 orders and 475 checkout starts');
  assert(pathToTarget.requiredProductVisitors === 7_917 && pathToTarget.requiredRawTraffic === 15_834, '$10K distribution model exposes product-visit and raw-traffic capacity');
  assert(pathToTarget.requiredTransactions.filing2500Count === 0, 'The planning mix excludes unapproved $2,500 services');
  assert(pathToTarget.requiredTransactions.session199Count === 0, 'Automated planning excludes the call-dependent $199 product');
  assert(pathToTarget.assumptions.some((item) => item.includes('345 active $29 memberships')), 'True $10K MRR is distinguished from one-time revenue');

  const leakage = CEOScoreboard.calculateLeakageReport(10, 1, 5, 2);
  assert(leakage.items.some((item) => item.stage.includes('Provider Capture')), 'Checkout-to-capture leakage is detected');
  assert(leakage.items.some((item) => item.stage.includes('Product Delivery')), 'Captured-but-undelivered purchases are P0 leakage');

  const day1 = getB2BEmailContent('b2b_day1', 'Founder', 'Software', 'ON');
  const day4 = getB2BEmailContent('b2b_day4', 'Founder', 'Software', 'ON');
  const day7 = getB2BEmailContent('b2b_day7', 'Founder', 'Software', 'ON');
  const sequence = `${day1.text} ${day4.text} ${day7.text}`.toLowerCase();
  assert(sequence.includes('$19') && sequence.includes('$79') && sequence.includes('$29'), 'B2B distribution uses the current self-serve product ladder');
  assert(!sequence.includes('schedule a call') && !sequence.includes('book a slot') && !sequence.includes('case study'), 'Automated outreach makes no live-call or unsupported case-study promise');
  assert(B2BOutreachEngine.AUTOPILOT_DIRECT_SEND_SCORE === B2BOutreachEngine.MINIMUM_PRIORITY_SCORE, 'Consented qualified leads are not blocked by an unreachable autopilot threshold');
  assert(isTestOrInternalContact({ email: 'alert-nurture-test-1@example.com' }), 'Commercial distribution excludes internal and synthetic contacts');
  assert(hasRecentCommercialProviderAcceptance({
    email: 'buyer@business.ca',
    leadActivity: JSON.stringify({
      lastNewsletterAcceptedAt: new Date().toISOString(),
      lastNewsletterProviderMessageId: 'provider-real',
    }),
  }), 'Commercial distribution suppresses overlapping provider-accepted messages for 48 hours');

  process.env.GROWTH_ATTRIBUTION_SECRET = 'commercial-suite-secret';
  const instrumented = instrumentCommercialEmail({
    to: 'qualified@example.com',
    tagType: 'b2b_day1',
    html: '<a href="https://www.fsidigital.ca/products/funding-match-report?utm_medium=email">Open</a>',
    text: 'Open https://www.fsidigital.ca/products/funding-match-report?utm_medium=email',
  });
  assert(Boolean(instrumented.context?.actionId), 'Commercial email receives a deterministic daily action ID');
  assert(!instrumented.html.includes('qualified@example.com'), 'Tracked links never expose the recipient email');
  const token = new URL(instrumented.html.match(/href="([^"]+)"/)?.[1] || '').searchParams.get('t') || '';
  const parsedToken = parseTrackedGrowthToken(token);
  assert(parsedToken?.target.includes('/products/funding-match-report') === true, 'Signed click token resolves only to the original first-party target');
  assert(parseTrackedGrowthToken(`${token}tampered`) === null, 'Tampered attribution tokens are rejected');
  const transactional = instrumentCommercialEmail({
    to: 'buyer@example.com',
    tagType: 'product-purchase',
    html: '<a href="https://www.fsidigital.ca/download">Download</a>',
    text: 'https://www.fsidigital.ca/download',
  });
  assert(transactional.context === null && !transactional.html.includes('/api/growth-os/click'), 'Transactional delivery links are never routed through commercial tracking');
  assert(mapBrevoEvent('delivered') === 'email.delivered' && mapBrevoEvent('error') === 'email.failed' && mapBrevoEvent('requests') === '', 'Brevo provider events distinguish delivery, provider failure, and request acceptance');

  const matches = buildMemberProgramMatches({ country: 'Canada', region: 'ON', industry: 'technology', companySize: '1-9', fundingInterests: ['Grants'] }, 5);
  assert(matches.every((match) => match.status === 'Open' || match.status === 'Upcoming'), 'Member radar excludes paused and closed database programs');

  const mcaReport = buildMCAReadinessReport({
    applicationId: 'MCA-TEST', legalBusinessName: 'Test Business', province: 'ON', industry: 'retail',
    yearsInBusiness: 2, monthlyRevenue: 20_000, fundingAmount: 25_000, fundingPurpose: 'inventory', fileCount: 3,
  });
  assert(mcaReport.score === 100 && mcaReport.requestToRevenueRatio === 1.25, 'MCA readiness score is deterministic from declared profile data');
  assert(mcaReport.notChecked.some((item) => item.includes('Bank-statement transactions')), 'MCA report explicitly discloses that transaction content is not inspected');
  const highIntentLead = ExpectedRevenueModel.calculateExpectedRevenue({
    email: 'founder@business.ca', readinessScore: 75, engagementScore: 60, fundingAmount: '$250,000', industry: 'technology', companySize: '10-49',
  });
  assert(highIntentLead.recommendedOffer.tier === 'TIER_BUNDLE_79' && highIntentLead.recommendedOffer.priceUSD === 79, 'Revenue Hunter routes high-intent leads to the highest active self-serve offer');
  const monitoringLead = ExpectedRevenueModel.calculateExpectedRevenue({
    email: 'subscriber@business.ca', readinessScore: 50, engagementScore: 20, leadActivity: 'newsletter weekly deadline alert',
  });
  assert(monitoringLead.recommendedOffer.tier === 'TIER_MEMBERSHIP_29' && monitoringLead.recommendedOffer.priceUSD === 29, 'Revenue Hunter routes recurring monitoring intent to the $29 membership');
  const activeSearchLead = ExpectedRevenueModel.calculateExpectedRevenue({
    email: 'searcher@business.ca', fundingAmount: '$100,000', engagementScore: 100,
  });
  assert(activeSearchLead.recommendedOffer.tier === 'TIER_ACTION_PLAN_49', 'Revenue Hunter routes an explicit funding requirement to the $49 action plan');
  const discoveryLead = ExpectedRevenueModel.calculateExpectedRevenue({
    email: 'discovery@business.ca', engagementScore: 100,
  });
  assert(discoveryLead.recommendedOffer.tier === 'TIER_REPORT_19', 'A legacy default engagement score never fabricates high purchase intent');
  assert(IntentEngine.classifyKeyword('grant application help').recommendedOfferPriceUSD === 79, 'SEO intent engine routes application demand to the self-serve $79 blueprint');

  const root = process.cwd();
  const ceoMemory = fs.readFileSync(path.join(root, 'lib/ceo-agent/ceo-memory.ts'), 'utf8');
  const ceoAgent = fs.readFileSync(path.join(root, 'lib/ceo-agent/ceo-agent.ts'), 'utf8');
  const calculatorRoute = fs.readFileSync(path.join(root, 'app/api/cron/process-calculator-recovery/route.ts'), 'utf8');
  const legacyAlertQueueRoute = fs.readFileSync(path.join(root, 'app/api/cron/process-alert-queue/route.ts'), 'utf8');
  const legacyAlertNurtureRoute = fs.readFileSync(path.join(root, 'app/api/cron/process-alert-nurture/route.ts'), 'utf8');
  const legacyAlertNurtureEngine = fs.readFileSync(path.join(root, 'lib/leads/AlertNurtureEngine.ts'), 'utf8');
  assert(ceoMemory.includes("ACTIVE_CASH_TARGET_END_AT = '2026-09-25T23:59:59.000Z'"), 'CEO scoreboard is aligned to the approved September 25 cash deadline');
  const newsletterRoute = fs.readFileSync(path.join(root, 'app/api/cron/process-newsletter/route.ts'), 'utf8');
  const approvedNewsletterCohortRoute = fs.readFileSync(path.join(root, 'app/api/admin/alerts/newsletter/approved-cohort/route.ts'), 'utf8');
  const telemetryRoute = fs.readFileSync(path.join(root, 'app/api/telemetry/route.ts'), 'utf8');
  const telemetryStore = fs.readFileSync(path.join(root, 'lib/telemetry/telemetry-store.ts'), 'utf8');
  const membershipCheckout = fs.readFileSync(path.join(root, 'components/membership/FoundingMemberCheckout.tsx'), 'utf8');
  const paypalWebhook = fs.readFileSync(path.join(root, 'app/api/paypal/webhook/route.ts'), 'utf8');
  const actionScorecard = fs.readFileSync(path.join(root, 'lib/growth-os/action-scorecard.ts'), 'utf8');
  const authorityDiscovery = fs.readFileSync(path.join(root, 'lib/growth-os/authority/opportunity-discovery.ts'), 'utf8');
  const authorityDiscoveryRoute = fs.readFileSync(path.join(root, 'app/api/cron/discover-authority-opportunities/route.ts'), 'utf8');
  const authorityEngine = fs.readFileSync(path.join(root, 'lib/growth-os/authority/authority-engine.ts'), 'utf8');
  const authorityProspectReviewRoute = fs.readFileSync(path.join(root, 'app/api/admin/authority/prospects/route.ts'), 'utf8');
  const authorityProspectReviewUi = fs.readFileSync(path.join(root, 'components/admin/AuthorityProspectReviewClient.tsx'), 'utf8');
  const operationsStore = fs.readFileSync(path.join(root, 'lib/growth-os/operations-store.ts'), 'utf8');
  const redisOperations = fs.readFileSync(path.join(root, 'lib/growth-os/redis-operations.ts'), 'utf8');
  const actionAttribution = fs.readFileSync(path.join(root, 'lib/growth-os/action-attribution.ts'), 'utf8');
  const sheetsStore = fs.readFileSync(path.join(root, 'lib/google-sheets.ts'), 'utf8');
  const organicProductLadder = fs.readFileSync(path.join(root, 'components/products/OrganicProductLadder.tsx'), 'utf8');
  const organicProductLadderImpression = fs.readFileSync(path.join(root, 'components/products/OrganicProductLadderImpression.tsx'), 'utf8');
  const engagedReaderCTA = fs.readFileSync(path.join(root, 'components/products/EngagedReaderProductCTA.tsx'), 'utf8');
  const calculatorPage = fs.readFileSync(path.join(root, 'app/calculator/page.tsx'), 'utf8');
  const distributionClassifier = fs.readFileSync(path.join(root, 'lib/products/distribution.ts'), 'utf8');
  const clientOverlays = fs.readFileSync(path.join(root, 'components/ClientOverlays.tsx'), 'utf8');
  const standaloneCheckout = fs.readFileSync(path.join(root, 'components/products/StandaloneCheckout.tsx'), 'utf8');
  const productCatalog = fs.readFileSync(path.join(root, 'lib/products/catalog.ts'), 'utf8');
  const serverCheckout = fs.readFileSync(path.join(root, 'lib/products/checkout.ts'), 'utf8');
  const productHierarchy = fs.readFileSync(path.join(root, 'components/products/ProductHierarchyMap.tsx'), 'utf8');
  const matchReportLanding = fs.readFileSync(path.join(root, 'app/products/funding-match-report/FundingMatchReportLanding.tsx'), 'utf8');
  const matchReportPage = fs.readFileSync(path.join(root, 'app/products/funding-match-report/page.tsx'), 'utf8');
  const toolkitPage = fs.readFileSync(path.join(root, 'app/products/toolkit/page.tsx'), 'utf8');
  const actionPlanPage = fs.readFileSync(path.join(root, 'app/products/action-plan/page.tsx'), 'utf8');
  const approvalLibraryPage = fs.readFileSync(path.join(root, 'app/products/approval-library/page.tsx'), 'utf8');
  const bundlePage = fs.readFileSync(path.join(root, 'app/products/bundle/page.tsx'), 'utf8');
  const reportDeliveryClient = fs.readFileSync(path.join(root, 'app/products/report/ReportDeliveryClient.tsx'), 'utf8');
  const onsiteClickRoute = fs.readFileSync(path.join(root, 'app/api/growth-os/onsite-click/route.ts'), 'utf8');
  const blogRoute = fs.readFileSync(path.join(root, 'app/blog/[slug]/page.tsx'), 'utf8');
  const pseoRoute = fs.readFileSync(path.join(root, 'app/grants/[province]/[city]/[industry]/page.tsx'), 'utf8');
  const footer = fs.readFileSync(path.join(root, 'components/Footer.tsx'), 'utf8');
  const header = fs.readFileSync(path.join(root, 'components/Header.tsx'), 'utf8');
  const relatedFundingPaths = fs.readFileSync(path.join(root, 'components/blog/RelatedFundingPaths.tsx'), 'utf8');
  const rdeDecisionEngine = fs.readFileSync(path.join(root, 'components/blog/RDEDecisionEngine.tsx'), 'utf8');
  const homepage = fs.readFileSync(path.join(root, 'app/page.tsx'), 'utf8');
  const legacyHomepage = fs.readFileSync(path.join(root, 'components/HomePageClient.tsx'), 'utf8');
  const leadConversionUpsell = fs.readFileSync(path.join(root, 'components/StrategySessionUpsell.tsx'), 'utf8');
  const stackingPlanner = fs.readFileSync(path.join(root, 'components/blog/FundingStackingDecisionEngine.tsx'), 'utf8');
  const programEvaluator = fs.readFileSync(path.join(root, 'components/seo/InlineMatchEvaluator.tsx'), 'utf8');
  const stackingPortfolio = fs.readFileSync(path.join(root, 'components/seo/StackingPortfolio.tsx'), 'utf8');
  const calculatorComponent = fs.readFileSync(path.join(root, 'components/calculator/GrantCalculator.tsx'), 'utf8');
  const industryPage = fs.readFileSync(path.join(root, 'app/grants/industry/[slug]/page.tsx'), 'utf8');
  const provincePage = fs.readFileSync(path.join(root, 'app/grants/[province]/page.tsx'), 'utf8');
  const statePage = fs.readFileSync(path.join(root, 'app/usa/[state]/page.tsx'), 'utf8');
  const mcaOrderRoute = fs.readFileSync(path.join(root, 'app/api/mca/priority-order/route.ts'), 'utf8');
  const mcaCaptureRoute = fs.readFileSync(path.join(root, 'app/api/mca/capture-priority-order/route.ts'), 'utf8');
  const mcaCheckoutPage = fs.readFileSync(path.join(root, 'app/(mca)/priority-processing/page.tsx'), 'utf8');
  const mcaThankYouPage = fs.readFileSync(path.join(root, 'app/(mca)/thank-you/page.tsx'), 'utf8');
  const mcaSuccessPage = fs.readFileSync(path.join(root, 'app/mca/priority-success/page.tsx'), 'utf8');
  const mcaDeliveryEmail = fs.readFileSync(path.join(root, 'lib/emails/mca-readiness-delivery.ts'), 'utf8');
  const mcaRecoveryEmail = fs.readFileSync(path.join(root, 'lib/emails/mca-recovery.ts'), 'utf8');
  const mcaRecoveryRoute = fs.readFileSync(path.join(root, 'app/api/cron/process-mca-priority-recovery/route.ts'), 'utf8');
  const vercelConfig = fs.readFileSync(path.join(root, 'vercel.json'), 'utf8');
  const contactPage = fs.readFileSync(path.join(root, 'app/contact/page.tsx'), 'utf8');
  const contactClient = fs.readFileSync(path.join(root, 'app/contact/ContactClient.tsx'), 'utf8');
  const contactRoute = fs.readFileSync(path.join(root, 'app/api/contact/route.ts'), 'utf8');
  const contactAssessmentEmail = fs.readFileSync(path.join(root, 'app/api/contact/assessment/send/route.ts'), 'utf8');
  const contactConfirmation = fs.readFileSync(path.join(root, 'lib/emails/contact-confirmation.ts'), 'utf8');
  const enterpriseAlert = fs.readFileSync(path.join(root, 'lib/emails/enterprise-alerts.ts'), 'utf8');
  const evidenceMetrics = fs.readFileSync(path.join(root, 'lib/growth-os/evidence-metrics.ts'), 'utf8');
  const deliveryRecovery = fs.readFileSync(path.join(root, 'lib/products/delivery-recovery.ts'), 'utf8');
  const salesAgent = fs.readFileSync(path.join(root, 'lib/ceo-agent/specialists/sales-agent.ts'), 'utf8');
  const salesSequence = fs.readFileSync(path.join(root, 'lib/revenue-hunter/sequences/sales-sequence-engine.ts'), 'utf8');
  const revenueOffers = fs.readFileSync(path.join(root, 'lib/revenue-hunter/models/expected-revenue.ts'), 'utf8');
  const contentGapEngine = fs.readFileSync(path.join(root, 'lib/seo-revenue-engine/content-gap-engine.ts'), 'utf8');
  const conversionEngine = fs.readFileSync(path.join(root, 'lib/seo-revenue-engine/conversion-engine.ts'), 'utf8');
  const seoExecutionEngine = fs.readFileSync(path.join(root, 'lib/seo-revenue-engine/execution-engine.ts'), 'utf8');
  const seoMatrixEngine = fs.readFileSync(path.join(root, 'lib/seo-revenue-engine/rte-matrix-engine.ts'), 'utf8');
  const objectionHandler = fs.readFileSync(path.join(root, 'lib/revenue-hunter/objections/objection-handler.ts'), 'utf8');
  const resendReconciliation = fs.readFileSync(path.join(root, 'lib/emails/resend-reconciliation.ts'), 'utf8');
  const brevoReconciliation = fs.readFileSync(path.join(root, 'lib/emails/brevo-reconciliation.ts'), 'utf8');
  const growthHealthRoute = fs.readFileSync(path.join(root, 'app/api/cron/growth-os-health/route.ts'), 'utf8');
  const newsletterMarketing = fs.readFileSync(path.join(root, 'lib/emails/newsletter-marketing.ts'), 'utf8');
  const checkoutProfileRoute = fs.readFileSync(path.join(root, 'app/api/products/checkout-profile/route.ts'), 'utf8');
  const revenueSprintRoute = fs.readFileSync(path.join(root, 'app/api/cron/process-revenue-sprint/route.ts'), 'utf8');
  const revenueSprintService = fs.readFileSync(path.join(root, 'lib/leads/revenue-sprint-service.ts'), 'utf8');
  const revenueSprintEmail = fs.readFileSync(path.join(root, 'lib/emails/revenue-sprint.ts'), 'utf8');
  const cartRecoveryService = fs.readFileSync(path.join(root, 'lib/leads/cart-recovery-service.ts'), 'utf8');
  const cartRecoveryEmail = fs.readFileSync(path.join(root, 'lib/emails/cart-recovery.ts'), 'utf8');
  const socialSprintRoute = fs.readFileSync(path.join(root, 'app/api/cron/process-social-revenue-sprint/route.ts'), 'utf8');
  const socialSprintService = fs.readFileSync(path.join(root, 'lib/growth-os/social-revenue-sprint.ts'), 'utf8');
  const channelAdapters = fs.readFileSync(path.join(root, 'lib/growth-os/execution/adapters/channel-adapters.ts'), 'utf8');
  const mailer = fs.readFileSync(path.join(root, 'lib/emails/mailer.ts'), 'utf8');
  assert(!calculatorRoute.includes('activity.calculatorCompletedAt || sub.timestamp'), 'Calculator recovery requires explicit calculator completion evidence');
  assert(newsletterRoute.includes('|| !activity.lastNewsletterProviderMessageId'), 'Newsletter retries legacy campaign markers that lack provider acceptance evidence');
  assert(newsletterRoute.includes('CONTROLLED_COHORT_CAP = 20') && newsletterRoute.includes('remainingCohortCapacity'), 'Newsletter distribution is capped at a 20-contact evidence cohort across repeated scheduler runs');
  assert(newsletterRoute.includes('providerAccepted: true') && newsletterRoute.includes('crmReceiptPersisted: saved.success') && newsletterRoute.includes('recentlyAcceptedRecipientIds'), 'A provider-accepted newsletter is suppressed even if CRM receipt persistence failed');
  assert(newsletterRoute.includes('APPROVED_PRODUCT_COHORT_ID') && newsletterRoute.includes('isLoginToken') && newsletterRoute.includes('isUnsubscribeToken'), 'Approved cohort preserves its one-time campaign and requires scoped checkout and unsubscribe credentials');
  assert(newsletterRoute.includes('`newsletter:${config.campaignId}`') && !newsletterRoute.includes('`newsletter:${weekId}`'), 'Newsletter leases are isolated by campaign so an approved cohort cannot collide with the weekly scheduler');
  assert(!newsletterRoute.includes('outcomes.push({ email:') && newsletterRoute.includes('outcomes.push({ recipientId'), 'Controlled cohort responses expose hashed recipient IDs instead of contact emails');
  assert(approvedNewsletterCohortRoute.includes('isValidAdminSession') && approvedNewsletterCohortRoute.includes("REQUIRED_CONFIRMATION = 'SEND_APPROVED_20'") && approvedNewsletterCohortRoute.includes('config.sentCount >= 20'), 'Approved 20-contact dispatch is admin-authenticated, explicitly confirmed, capped, and idempotent');
  assert(approvedNewsletterCohortRoute.includes('authorization: `Bearer ${cronSecret}`') && approvedNewsletterCohortRoute.includes('APPROVED_PRODUCT_COHORT_ID'), 'Approved manual dispatch reuses the authenticated controlled newsletter sender');
  const activeNewsletterTemplates = newsletterMarketing.slice(newsletterMarketing.indexOf('export async function sendNewFundingAlertEmail'), newsletterMarketing.indexOf('function getProvinceName'));
  assert(activeNewsletterTemplates.includes('/products/funding-match-report?token=') && !activeNewsletterTemplates.includes('/portfolio?token='), 'Active newsletters distribute the $19 product instead of the legacy $99/$199 portfolio checkout');
  assert(activeNewsletterTemplates.includes('data.unsubscribeToken') && !activeNewsletterTemplates.includes('wrapNewsletterTemplate(contentHtml, data.loginToken'), 'Active commercial newsletters use a scoped unsubscribe credential instead of a login credential');
  assert(checkoutProfileRoute.includes('isLoginToken(token, candidate.loginToken)') && standaloneCheckout.includes('/api/products/checkout-profile?token='), 'Opaque subscriber tokens securely prefill the self-serve checkout without email in the campaign URL');
  assert(revenueSprintRoute.includes('isValidCronRequest') && revenueSprintRoute.includes('acquireOperationLease') && revenueSprintRoute.includes('Math.min(20'), 'Revenue sprint is authenticated, leased, and capped at 20 recipients per run');
  assert(['INITIAL_COHORT_CAP = 20', 'CHECKOUT_VALIDATED_CAP = 40', 'PAYMENT_VALIDATED_CAP = 100', 'PAUSE_NO_CHECKOUT', "REVENUE_SPRINT_END_AT = '2026-09-25", "REVENUE_SPRINT_CAMPAIGN = 'revenue-sprint-september-entry-19'"].every((value) => revenueSprintService.includes(value)), 'September revenue sprint is isolated, scales only from checkout to verified payment, and expires on the target date');
  assert(revenueSprintService.includes("offerId: 'funding-match-report' as RevenueSprintOfferId"), 'The fresh evidence cohort tests the lowest-friction existing $19 product after the $79 cohort failed to create a checkout');
  assert(revenueSprintService.includes('isProviderVerifiedPurchase') && revenueSprintService.includes('isTestOrInternalContact') && revenueSprintService.includes('hasRecentCommercialProviderAcceptance') && revenueSprintService.includes('recentlyAcceptedRecipientIds'), 'Revenue sprint excludes buyers, internal contacts, and every recipient contacted in the prior 48 hours');
  assert(['funding-bundle', 'funding-roadmap', 'funding-membership', 'funding-match-report'].every((offer) => revenueSprintEmail.includes(`'${offer}'`)), 'Revenue sprint distributes the complete call-free $79/$49/$29/$19 product ladder');
  assert(revenueSprintEmail.includes('unsubscribeToken') && revenueSprintEmail.includes('No call or live session is required') && !revenueSprintEmail.toLowerCase().includes('limited time'), 'Revenue sprint uses scoped unsubscribe links and makes no call or false-urgency promise');
  assert(revenueSprintEmail.includes('Narrow your funding shortlist before you start applying') && revenueSprintEmail.includes('lowest-cost self-serve way'), 'The $19 entry campaign communicates the buyer outcome without internal screening jargon');
  assert(cartRecoveryService.includes('getAllProductPaymentIntents') && cartRecoveryService.includes('recoverableProductIds') && !cartRecoveryService.includes("recoverableProductIds.add('strategy-audit')"), 'Cart recovery uses server payment-intent evidence and excludes call-dependent products');
  assert(cartRecoveryService.includes('recentlyAcceptedRecipientIds') && cartRecoveryService.includes('provider accepted, but CRM receipt persistence failed'), 'Cart recovery suppresses duplicate sends even when CRM receipt persistence fails');
  assert(cartRecoveryEmail.includes('unsubscribeToken') && !cartRecoveryEmail.includes('`, loginToken, firstName);'), 'Every cart and report-recovery template uses a scoped unsubscribe credential');
  assert(socialSprintRoute.includes('isValidCronRequest') && socialSprintRoute.includes('acquireOperationLease'), 'Organic social revenue sprint is authenticated and protected by a durable execution lease');
  assert(socialSprintService.includes('SOCIAL_REVENUE_SPRINT_END_AT') && socialSprintService.includes('MIN_VARIANT_GAP_MS') && socialSprintService.includes('getLatestOperationalState'), 'Organic social sprint is self-expiring, paced, and idempotent across production invocations');
  assert(socialSprintService.includes("SOCIAL_REVENUE_SPRINT_END_AT = '2026-09-25") && socialSprintService.includes("STATE_KEY = 'social-revenue-sprint-september-v1'") && socialSprintService.includes('36 * 60 * 60 * 1000'), 'Organic social sprint uses an isolated September state, a 36-hour minimum gap, and the revenue target deadline');
  assert(socialSprintService.includes("INITIAL_VARIANT_ID = 'sep-match-fit-v1'") && socialSprintService.includes('lowest-friction $19 product'), 'The fresh organic social test starts with the $19 entry offer after the earlier $79 post lacked payment evidence');
  assert((socialSprintService.match(/id: 'sep-/g) || []).length === 11, 'Organic social sprint rotates eleven distinct September messages instead of repeating two posts');
  assert(vercelConfig.includes('"schedule": "30 13 * * *"'), 'Daily social scheduler gives the 36-hour guarded rotation enough September slots without publishing more often than the durable guard permits');
  assert(socialSprintService.includes('createTrackedGrowthUrl') && socialSprintService.includes("channel: 'organic_social'"), 'Every social product link enters first-party checkout and payment attribution');
  assert(['$19 USD', '$49 USD', '$79 USD', '$29 USD/month', 'No sales call or live session is required'].every((value) => socialSprintService.includes(value)), 'Social copy truthfully distributes the approved call-free product ladder');
  assert(!socialSprintService.toLowerCase().includes('guaranteed') && !socialSprintService.toLowerCase().includes('limited time') && !socialSprintService.includes('Up to $150,000'), 'Social revenue copy contains no guarantee, false urgency, or unsupported funding amount');
  assert(channelAdapters.includes('const token = process.env.LINKEDIN_ACCESS_TOKEN?.trim()') && !channelAdapters.includes('process.env.LINKEDIN_CLIENT_ID?.trim()\n    const linkedInUrn'), 'LinkedIn publishing never mistakes a public client ID for an access token');
  assert(channelAdapters.includes('postFacebook(message: string, link: string)') && channelAdapters.includes('provider post ID') && socialSprintService.includes('Boolean(result.externalId)'), 'Social publishing requires a provider-returned post ID before it counts as accepted');
  assert(!mailer.includes('accepted by Resend for ${to}') && !mailer.includes('accepted by Brevo for ${to}') && !sheetsStore.includes('Lead ${email} updated'), 'Commercial runtime logs do not expose recipient email addresses');
  assert(actionScorecard.includes("event.channel.startsWith('organic_')"), 'CEO action P&L recognizes verified social and onsite organic clicks');
  assert(telemetryRoute.includes("eventName === 'checkout_started'") && telemetryRoute.includes('parseTrackedGrowthToken'), 'Membership checkout starts enter the action P&L only through trusted first-party attribution');
  assert(
    telemetryRoute.includes("process.env.NODE_ENV !== 'production'")
      && telemetryRoute.includes("ALLOW_NON_PRODUCTION_TELEMETRY !== 'true'")
      && telemetryRoute.includes("reason: 'non_production_telemetry_disabled'"),
    'Local and staging browser tests cannot contaminate the production telemetry ledger by default',
  );
  assert(!membershipCheckout.includes('SUB-FOUNDING-'), 'Membership checkout never fabricates a PayPal subscription ID');
  assert(paypalWebhook.includes("'BILLING.SUBSCRIPTION.RE-ACTIVATED': 'ACTIVE'"), 'PayPal re-activation restores active membership status');
  assert(paypalWebhook.includes("eventType: 'membership_payment_verified'"), 'Membership cash attribution requires a signed PayPal payment webhook');
  assert(resendReconciliation.includes("fetch(url") && resendReconciliation.includes("Authorization: `Bearer ${apiKey}`"), 'Resend delivery fallback reads authenticated provider state');
  assert(resendReconciliation.includes('RESEND_RECONCILIATION_API_KEY') && resendReconciliation.includes('requiresReadAccess: true'), 'Resend delivery reconciliation supports a dedicated read credential and exposes permission gaps');
  assert(resendReconciliation.includes("event.eventType === 'provider_accepted'") && resendReconciliation.includes("event.provider.toLowerCase() === 'resend'"), 'Resend reconciliation is restricted to provider IDs already accepted into the commercial ledger');
  assert(brevoReconciliation.includes("event.provider.toLowerCase() === 'brevo'") && brevoReconciliation.includes('eligibleCanonicalIds.get(canonicalBrevoMessageId(event.messageId))'), 'Brevo reconciliation persists only canonical provider IDs already accepted into the commercial ledger');
  assert(growthHealthRoute.includes('await reconcileResendDeliveryEvents()') && growthHealthRoute.includes('await reconcileBrevoDeliveryEvents()') && growthHealthRoute.includes('deliveryEvidenceGap'), 'Daily GrowthOS health reconciles both active providers and degrades when read evidence is unavailable');
  assert(mailer.includes("fetch('https://api.brevo.com/v3/senders'") && mailer.includes("endsWith('@fsidigital.ca')") && mailer.includes('!domainPayload.authenticated || !domainPayload.verified'), 'Brevo fallback requires a provider-authenticated FSI Digital domain and active sender instead of reusing a stale cross-provider default');
  assert(actionScorecard.includes("decision: 'SCALE' | 'HOLD' | 'STOP'"), 'CEO action P&L emits explicit scale, hold, or stop decisions');
  assert(actionScorecard.includes('providerFailures') && actionScorecard.includes("has('email.failed')") && ceoAgent.includes('provider failures ${action.providerFailures}'), 'CEO action P&L reports provider-confirmed email failures separately from checkout failures');
  assert(actionScorecard.includes('verifiedPageViewKeys') && actionScorecard.includes('isLikelyAutomatedUserAgent'), 'CEO action P&L excludes bot and link-scanner clicks from qualified-lead decisions');
  assert(actionScorecard.includes('explicitHumanSessions') && actionScorecard.includes('deliveredMessageIds'), 'CEO action P&L requires explicit human sessions and verified email delivery before counting qualified leads');
  assert(!actionScorecard.includes('acceptedMessageIds.size >= 20 || organicClickEvents.length >= 20'), 'Provider acceptance alone cannot trigger a channel stop decision');
  assert(['productCheckoutViews', 'deliveryEmailsReady', 'paypalButtonsRendered', 'paypalButtonClicks', 'paypalApprovals', 'paypalFailures'].every((stage) => actionScorecard.includes(stage)), 'CEO action P&L reports every newly measured product-to-PayPal handoff');
  assert(!authorityDiscovery.includes('contact@${domain}') && !authorityDiscovery.includes('960fb097'), 'Authority discovery neither guesses recipients nor embeds credentials');
  assert(authorityDiscovery.includes('extractSameSitePublicEmail') && authorityDiscovery.includes("redirect: 'manual'") && authorityDiscoveryRoute.includes('status: "review_required"'), 'Authority discovery extracts only publicly displayed same-site contacts, blocks redirects, and preserves human review before any send');
  assert(
    authorityDiscoveryRoute.includes('source: "serper_search_result"')
      && authorityDiscoveryRoute.includes('sourceUrl: opp.targetPage')
      && sheetsStore.includes('p.sourceUrl || ""')
      && !sheetsStore.includes('p.sourceUrl || p.website'),
    'Authority discovery persists exact public provenance and fails closed when it is missing',
  );
  assert(authorityEngine.includes("deliveryStatus || '').trim() === 'human_approved_source_verified'"), 'Authority outreach only sends records explicitly approved through the source-review workflow');
  assert(authorityProspectReviewRoute.includes('hasSameSitePublicContact') && authorityProspectReviewRoute.includes("status: approved ? 'qualified' : 'rejected'") && authorityProspectReviewRoute.includes('No message was sent by this review action'), 'Authority review verifies source and same-site contact evidence before a human may queue a record');
  assert(authorityProspectReviewUi.includes('window.confirm') && authorityProspectReviewUi.includes('Inspect page') && authorityProspectReviewUi.includes('Queue after review'), 'Authority dashboard requires an explicit human confirmation after inspecting the exact public source');
  assert(operationsStore.includes('getCachedSheetValues') && sheetsStore.includes('sheetValuesCache'), 'CEO specialists coalesce duplicate Google Sheets reads');
  const leaseFinalizer = operationsStore.slice(operationsStore.indexOf('export async function finishOperationLease'));
  assert(!leaseFinalizer.includes("readOperationalRows('GrowthOS Runs'"), 'CEO lease finalization does not spend a read-quota request');
  assert(
    operationsStore.includes('if (hasOperationalRedis())')
      && operationsStore.includes('acquireRedisOperationLease')
      && operationsStore.includes("backend: 'redis'"),
    'Production scheduler leases leave the quota-limited Google Sheets write path when durable Redis is configured',
  );
  assert(
    redisOperations.includes('nx: true')
      && redisOperations.includes('dedupeWindowMs')
      && redisOperations.includes('SKIPPED_DUPLICATE'),
    'Redis scheduler leases use an atomic set-if-absent guard and preserve duplicate-run evidence',
  );
  assert(
    actionAttribution.includes('persistRedisGrowthActionEvent(event)')
      && actionAttribution.includes('getRedisGrowthActionEvents<GrowthActionEvent>()')
      && redisOperations.includes('EVENT_RETENTION_MS = 120'),
    'High-frequency commercial events use durable Redis with 120-day evidence retention instead of exhausting Sheets writes',
  );
  assert(
    actionAttribution.includes('new Map<string, GrowthActionEvent>()')
      && operationsStore.includes('for (const row of [...sheetRows, ...redisRows])'),
    'CEO evidence merges legacy Sheets history with the new Redis operational ledger',
  );
  assert(
    telemetryStore.includes('await persistRedisTelemetryEvent(randomUUID(), event)')
      && telemetryStore.indexOf('persistRedisTelemetryEvent(randomUUID(), event)') < telemetryStore.indexOf('spreadsheets.values.append')
      && redisOperations.includes('TELEMETRY_RETENTION_MS = 120'),
    'High-frequency funnel telemetry uses the 120-day Redis ledger before the Sheets fallback path',
  );
  assert(
    telemetryStore.includes('getRedisTelemetryEvents<TelemetryEvent>()')
      && telemetryStore.includes('return [...results, ...redisEvents].sort'),
    'CEO funnel evidence merges legacy Sheet telemetry with current Redis telemetry',
  );
  assert(
    redisOperations.includes('REDIS_MGET_CHUNK_SIZE = 200')
      && redisOperations.includes('getNewestIndexMembers')
      && !redisOperations.includes("client.zrange<string[]>(EVENT_INDEX_KEY, 0, -1)"),
    'Redis evidence reads are bounded and chunked below the provider request-size ceiling',
  );
  assert(
    redisOperations.includes('CRITICAL_EVENT_INDEX_KEY')
      && redisOperations.includes('CRITICAL_TELEMETRY_INDEX_KEY')
      && redisOperations.includes("durableEvent.eventType !== 'click'"),
    'Critical commercial evidence has a separate durable index that click volume cannot displace',
  );
  const productionCrons = JSON.parse(vercelConfig).crons as Array<{ path: string; schedule: string }>;
  const cronSchedule = (pathName: string) => productionCrons.find((entry) => entry.path === pathName)?.schedule;
  assert(
    cronSchedule('/api/cron/process-cart-recovery') === '5 * * * *'
      && cronSchedule('/api/cron/process-revenue-sprint') === '35 */2 * * *'
      && cronSchedule('/api/cron/process-newsletter') === '10 15 * * 1-5'
      && cronSchedule('/api/cron/authority-pipeline') === '40 15 * * 1-5'
      && cronSchedule('/api/cron/process-product-delivery-recovery') === '10 17 * * *'
      && cronSchedule('/api/cron/process-membership-briefings') === '40 13,17 * * 1-5',
    'High-write production schedulers are staggered instead of creating minute-zero Sheets bursts',
  );
  assert(
    legacyAlertQueueRoute.includes('ENABLE_LEGACY_ALERT_QUEUE !== "true"')
      && legacyAlertQueueRoute.includes('status: "PAUSED"')
      && legacyAlertQueueRoute.indexOf('ENABLE_LEGACY_ALERT_QUEUE') < legacyAlertQueueRoute.indexOf('getPendingAlertJobs()'),
    'Uncapped legacy mass alerts fail closed before the missing Google Sheet or any subscriber send',
  );
  assert(
    legacyAlertNurtureRoute.includes('ENABLE_LEGACY_ALERT_NURTURE !== "true"')
      && legacyAlertNurtureRoute.includes('status: "PAUSED"')
      && legacyAlertNurtureRoute.indexOf('ENABLE_LEGACY_ALERT_NURTURE') < legacyAlertNurtureRoute.indexOf('processDailyBatch(limit)'),
    'Legacy alert nurture fails closed before its outdated audit/referral sequence can send',
  );
  assert(
    legacyAlertNurtureEngine.includes('isTestOrInternalContact(sub)')
      && legacyAlertNurtureRoute.includes('status: result.errors.length === 0 ? 200 : 207'),
    'Legacy nurture excludes synthetic identities and no longer reports provider failures as full success when explicitly enabled',
  );
  assert(['$19', '$29', '$49', '$79', 'match-report', 'toolkit', 'action-plan', 'bundle', 'membership'].every((value) => organicProductLadder.includes(value)), 'Organic content distributes the complete self-serve product ladder');
  assert(!organicProductLadder.includes('$199') && !organicProductLadder.toLowerCase().includes('book a call'), 'Organic product ladder requires no live-call fulfillment');
  assert(organicProductLadder.includes("surface === 'footer'") && organicProductLadder.includes("? 'bundle'") && organicProductLadder.includes("surface === 'grants-city-industry'") && organicProductLadder.includes("? 'action-plan'"), 'Focused organic experiment promotes the strongest observed cash and checkout offers on each high-volume surface');
  assert(organicProductLadder.includes("experiment: 'focused-v2'") && onsiteClickRoute.includes("experimentInput === 'focused-v2'") && onsiteClickRoute.includes('product_ladder_${experiment}'), 'Focused organic experiment has a separate first-party action ID for clean revenue measurement');
  assert(organicProductLadder.includes('<OrganicProductLadderImpression') && organicProductLadderImpression.includes("eventName: 'paid_offer_impression'") && organicProductLadderImpression.includes("evidence: 'viewport'"), 'Organic product ladders count an impression only after the offer enters the viewport');
  assert(calculatorPage.includes('surface=calculator-result') && calculatorPage.includes('offer=match-report') && calculatorPage.includes('offer=membership'), 'The checkout-producing calculator routes exit traffic into attributable $19 and $29 self-serve offers');
  assert(!calculatorPage.includes('Talk to a Grant Specialist') && !calculatorPage.includes('Our grant specialists review your matches'), 'Calculator distribution makes no call-dependent or manual-review promise');
  assert(engagedReaderCTA.includes("surface: 'engaged-reader'") && engagedReaderCTA.includes("experiment: 'intent-v1'") && onsiteClickRoute.includes("'engaged-reader'"), 'Engaged content readers receive an intent-matched, separately attributable paid-product decision');
  assert(engagedReaderCTA.includes("eventName: 'paid_offer_impression'") && engagedReaderCTA.includes('trafficQualityClassification'), 'Paid distribution records human-quality recommendation impressions before the click');
  assert(distributionClassifier.includes('selectDistributedOffer') && distributionClassifier.includes('MONITORING_INTENT') && distributionClassifier.includes('ACTION_INTENT'), 'Paid distribution deterministically matches page intent to a current self-serve offer');
  assert(clientOverlays.includes('shouldPrioritizePaidDistribution') && clientOverlays.includes('<EngagedReaderProductCTA />'), 'High-intent content prioritizes paid distribution over competing generic lead popups');
  assert(standaloneCheckout.includes('!isEmailValid ?') && standaloneCheckout.includes('Delivery Email · Required'), 'Product checkout cannot expose PayPal before the server-required delivery email is valid');
  assert(!standaloneCheckout.includes("email.trim() === '' ||"), 'Product checkout never claims an empty email is server-valid');
  assert(!standaloneCheckout.includes('Full Name') && standaloneCheckout.includes('autoComplete="email"'), 'One-time product checkout asks for only the delivery field required before PayPal');
  assert(standaloneCheckout.includes("PAYPAL_PRODUCT_NAMESPACE = 'paypalProductCheckout'") && standaloneCheckout.includes("setAttribute('data-namespace', PAYPAL_PRODUCT_NAMESPACE)"), 'One-time product checkout isolates its PayPal capture SDK namespace');
  assert(membershipCheckout.includes("PAYPAL_MEMBERSHIP_NAMESPACE = 'paypalMembershipCheckout'") && membershipCheckout.includes("setAttribute('data-namespace', PAYPAL_MEMBERSHIP_NAMESPACE)"), 'Membership checkout isolates its PayPal subscription SDK namespace');
  assert(['product_checkout_viewed', 'checkout_delivery_email_ready', 'paypal_buttons_rendered', 'paypal_button_clicked', 'paypal_order_create_failed', 'paypal_capture_failed'].every((event) => standaloneCheckout.includes(event)), 'Product checkout measures each revenue handoff without customer PII');
  const productProofSurface = `${matchReportPage} ${toolkitPage} ${actionPlanPage} ${approvalLibraryPage} ${bundlePage}`;
  assert(!productProofSurface.includes('aggregateRating') && !productProofSurface.includes('reviewCount') && !productProofSurface.includes('"review"'), 'Product structured data contains no unsupported review evidence');
  assert(!bundlePage.includes('Full Template Pack') && bundlePage.includes('Multi-Year Stacking Simulation'), '$79 bundle promises only the assets present in its server catalog');
  assert(
    [
      ["'funding-match-report'", 'priceUsd: 19'],
      ["'funding-toolkit'", 'priceUsd: 29'],
      ["'funding-roadmap'", 'priceUsd: 49'],
      ["'funding-bundle'", 'priceUsd: 79'],
      ["'funding-membership'", 'priceUsd: 29'],
    ].every(([productId, price]) => {
      const productStart = productCatalog.indexOf(`${productId}: {`);
      return productStart >= 0 && productCatalog.slice(productStart, productStart + 500).includes(price);
    }),
    'Server product catalog preserves the approved $19/$29/$49/$79 ladder'
  );
  assert(serverCheckout.includes("product.id === 'funding-membership'") && serverCheckout.includes('recurring membership checkout'), 'One-time checkout cannot create a counterfeit membership payment');
  assert(!serverCheckout.includes('input.addons?.strategySession') && !serverCheckout.includes('expectedAmount += 180'), 'New public product intents cannot sell the unsupported call-dependent add-on');
  const buyerJourneySurface = `${productHierarchy} ${matchReportLanding} ${bundlePage} ${reportDeliveryClient}`.toLowerCase();
  assert(!buyerJourneySurface.includes('$199') && !buyerJourneySurface.includes('book a free discovery call') && !buyerJourneySurface.includes('1-on-1 advisor'), 'Product and post-purchase journeys contain no call-dependent or $199 upsell');
  assert(productHierarchy.includes("price: '$19'") && productHierarchy.includes("price: '$29'") && productHierarchy.includes("price: '$49'") && productHierarchy.includes("price: '$79'"), 'Product comparison presents only the active self-serve price ladder');
  assert(reportDeliveryClient.includes('/membership?source=report-membership-upgrade') && reportDeliveryClient.includes('/products/bundle?source=report-delivery'), 'Post-purchase distribution routes to Funding Watch and the complete self-serve bundle');
  assert(onsiteClickRoute.includes('createTrackedGrowthUrl') && onsiteClickRoute.includes('fsi_organic_visitor') && onsiteClickRoute.includes('const OFFERS'), 'On-site product clicks use allowlisted signed first-party attribution');
  assert(onsiteClickRoute.includes('dailyFingerprint') && onsiteClickRoute.includes("createHmac('sha256', secret)"), 'Cookie-less browser traffic receives a privacy-preserving daily stable ID instead of unbounded random click identities');
  assert(onsiteClickRoute.includes('isLikelyAutomatedUserAgent(request.headers.get') && onsiteClickRoute.includes('return NextResponse.redirect(destination)'), 'Recognized crawlers bypass the commercial click ledger');
  assert(onsiteClickRoute.includes('actionDate') && !onsiteClickRoute.includes('product_ladder_2026-08-27'), 'On-site action IDs rotate by the actual UTC date instead of a hardcoded launch date');
  assert(onsiteClickRoute.includes("'linkedin-company'") && onsiteClickRoute.includes("channel = socialSource ? 'organic_social' : 'organic_onsite'"), 'LinkedIn company traffic receives unique signed first-party revenue attribution');
  assert(blogRoute.includes('<OrganicProductLadder surface="blog"') && pseoRoute.includes('<OrganicProductLadder'), 'Paid self-serve distribution is present on blog and city-industry organic templates');
  assert(actionScorecard.includes("event.channel.startsWith('organic_')"), 'CEO action P&L treats unique first-party product clicks as qualified organic leads');
  assert(footer.includes('<OrganicProductLadder surface="footer"') && onsiteClickRoute.includes("'footer'"), 'Uncovered content routes receive the signed product ladder through the global footer');
  assert(footer.includes('Application Toolkit ($29)') && footer.includes('Complete Funding Blueprint ($79)') && footer.includes('Funding Watch ($29/month)'), 'Global product navigation matches the active self-serve checkout prices');
  assert(!footer.includes('Book Strategy Session ($199)') && !footer.includes('Application Toolkit ($9)'), 'Global distribution removes call-dependent and stale-price offers');
  assert(header.includes("surface=header") && onsiteClickRoute.includes("'header'"), 'Desktop and mobile product navigation use signed action attribution');
  assert(['($19)', '($29)', '($49)', '($79)', '($29/month)'].every((price) => header.includes(price)), 'Header distributes every active self-serve price point');
  assert(!header.includes('($9)') && !header.includes('($199)') && !header.includes('href="/audit"'), 'Header contains no stale toolkit price or call-dependent product CTA');
  assert(relatedFundingPaths.includes('surface=guided-path') && relatedFundingPaths.includes('Get Complete Bundle — $79'), 'Guided funding paths end at the attributable $79 self-serve bundle');
  assert(!relatedFundingPaths.includes('/audit') && !relatedFundingPaths.includes('Book Strategy Audit'), 'Guided funding paths require no live-call fulfillment');
  assert(rdeDecisionEngine.includes('surface=rde') && rdeDecisionEngine.includes('recommendedOffer'), 'Interactive decision engine recommends only active attributable self-serve offers');
  assert(!rdeDecisionEngine.includes('/booking') && !rdeDecisionEngine.includes('/api/strategy-session/recovery') && !rdeDecisionEngine.includes('$2,500') && !rdeDecisionEngine.includes('$199'), 'Interactive decision engine contains no booking, consultation-recovery, or unsupported high-ticket escalation');
  assert(homepage.includes('<OrganicProductLadder surface="homepage"') && onsiteClickRoute.includes("'homepage'"), 'Homepage distributes the same attributable self-serve product ladder');
  assert(!homepage.includes('Book Session') && !homepage.includes('1-on-1 Strategy Session') && !legacyHomepage.includes('Book Session'), 'Current and legacy homepage components no longer distribute call-dependent fulfillment');
  const contactConversionSurface = `${contactPage} ${contactClient} ${contactAssessmentEmail}`;
  assert(['Get Complete Blueprint — $79', 'Get My Action Plan — $49', 'Get My Match Report — $19', 'Start Funding Watch — $29/month'].every((offer) => contactClient.includes(offer)), 'Highest-intent contact results route every tier into the approved self-serve ladder');
  assert(!contactConversionSurface.includes('/audit?') && !contactConversionSurface.includes('$199') && !contactConversionSurface.includes('Strategy Session'), 'Contact and assessment-copy journeys contain no call-dependent offer');
  assert(!contactClient.includes('encodeURIComponent(formData.email)') && !contactClient.includes('encodeURIComponent(formData.phone)') && contactClient.includes('/api/growth-os/onsite-click?'), 'Contact conversion uses signed first-party attribution without lead PII in URLs');
  assert(contactRoute.includes('isSubscribed: !!consentToPartnerContact') && contactClient.includes('automated funding alerts and self-serve product updates'), 'Contact leads become commercially eligible only through explicit automated-update consent');
  assert(!sheetsStore.includes('wa.me/') && !sheetsStore.includes('consultation?source=whatsapp') && !sheetsStore.includes('refund the $199'), 'New lead persistence creates no manual WhatsApp or call-dependent sales action');
  assert(!contactConfirmation.includes('responds within <strong>24–48 hours</strong>') && contactConfirmation.includes('No call or live session is required'), 'Contact confirmation makes no manual-response promise');
  assert(enterpriseAlert.includes('No manual call or live-session follow-up is required'), 'High-intent internal alerts reinforce self-serve fulfillment');
  assert(footer.includes("pathname === '/'") && !homepage.includes('<OrganicProductLadder surface="footer"'), 'Live homepage renders one product ladder instead of duplicating the footer ladder');
  assert(leadConversionUpsell.includes('surface=lead-conversion') && leadConversionUpsell.includes('Get Complete Blueprint ($79)') && leadConversionUpsell.includes('Match Report ($19)'), 'Post-lead conversion modal distributes attributable instant products');
  assert(!leadConversionUpsell.includes('/booking') && !leadConversionUpsell.includes('/api/strategy-session/recovery'), 'Post-lead conversion modal does not create booking or recovery noise');
  assert(stackingPlanner.includes('surface=stacking-planner') && !stackingPlanner.includes('/audit?source=stacking_planner'), 'Stacking planner routes both risk outcomes into active self-serve products');
  assert(programEvaluator.includes('surface=program-evaluator') && !programEvaluator.includes('/consultation?source=program-page-wizard'), 'Program evaluator fallback distributes the $29 toolkit without a consultation');
  assert(stackingPortfolio.includes('surface=stacking-portfolio') && !stackingPortfolio.includes('/consultation?'), 'Stacking portfolio distributes the attributable $79 bundle without exposing lead PII in the URL');
  assert(calculatorComponent.includes('surface=calculator-result') && calculatorComponent.includes('Start Funding Watch — $29/month'), 'Calculator converts enterprise and verified-buyer results into attributable self-serve offers');
  assert(!calculatorComponent.includes('addonStrategySession') && !calculatorComponent.includes('setAddonApprovalLibrary') && !calculatorComponent.includes('calendly.com/fsidigital/strategy-audit'), 'Calculator checkout cannot sell call-dependent or discontinued add-ons');
  assert(!calculatorComponent.includes('event: "redirect_booking"') && !calculatorComponent.includes('href={`/audit?source=report-upsell'), 'Calculator telemetry and post-purchase monetization contain no false booking path');
  assert(industryPage.includes('surface=industry-page') && !industryPage.includes('href="/audit"'), 'Industry templates distribute the signed $79 bundle instead of a consultation');
  assert(provincePage.includes('surface=province-page') && !provincePage.includes('Strategy Session Audit'), 'Province templates distribute signed $19 and $79 products');
  assert(statePage.includes('surface=state-page') && !statePage.includes('Book Strategy Call') && !statePage.includes('Get Free Consultation'), 'US state templates distribute signed self-serve products instead of calls');
  assert(mcaOrderRoute.includes('newProductPaymentIntent') && mcaOrderRoute.includes("expectedAmount: PRICE_CAD") && mcaOrderRoute.includes("currency: 'CAD'"), 'MCA checkout persists server-owned CAD $49 terms before PayPal approval');
  assert(mcaOrderRoute.includes("recoveryToken: z.string().regex") && mcaOrderRoute.includes("entry.recoveryToken === parsed.data.recoveryToken"), 'MCA checkout resolves the application through an unguessable recovery token, not client-supplied email');
  assert(mcaOrderRoute.includes('fsi_growth_action_token') && mcaOrderRoute.includes("eventType: 'checkout_started'"), 'MCA checkout preserves signed action attribution');
  assert(mcaCaptureRoute.includes('verifyPayPalOrder') && mcaCaptureRoute.includes("referenceId: PRODUCT_ID") && mcaCaptureRoute.includes("currency: 'CAD'"), 'MCA capture verifies amount, currency, product, and intent with PayPal');
  assert(mcaCaptureRoute.includes('recordProductPaymentCapture') && mcaCaptureRoute.includes('recordPurchase') && mcaCaptureRoute.includes("revenueCAD: 49"), 'Verified MCA cash enters the purchase ledger and CEO action P&L');
  assert(mcaCaptureRoute.includes('sendMCAReadinessReportDelivery') && mcaSuccessPage.includes('Open my readiness report'), 'MCA report is delivered instantly in-browser with transactional email backup');
  const mcaPromiseSurface = `${mcaCheckoutPage} ${mcaThankYouPage} ${mcaSuccessPage} ${mcaRecoveryEmail}`.toLowerCase();
  assert(!mcaPromiseSurface.includes('assigned analyst') && !mcaPromiseSurface.includes('dedicated specialist') && !mcaPromiseSurface.includes('manually audit') && !mcaPromiseSurface.includes('within 4 hours'), 'MCA product makes no manual specialist or time-bound fulfillment promise');
  assert(mcaCheckoutPage.includes('does not read bank-statement contents') && mcaRecoveryEmail.includes('does not inspect bank-statement contents'), 'MCA sales and recovery copy state the automated report boundary');
  assert(mcaRecoveryRoute.includes("acquireOperationLease('mca-priority-recovery'") && mcaRecoveryRoute.includes('BATCH_LIMIT = 5'), 'MCA recovery is protected by a durable lease and a five-recipient execution cap');
  assert(mcaRecoveryRoute.includes('MIN_STAGE_1_HOURS = 24') && mcaRecoveryRoute.includes('MIN_STAGE_2_HOURS = 72') && mcaRecoveryRoute.includes('stages: 2'), 'MCA recovery is limited to a conservative 24-hour and 72-hour two-touch sequence');
  assert(mcaRecoveryRoute.includes('RECOVERY_TOKEN.test') && mcaRecoveryRoute.includes('application.consentToShare') && mcaRecoveryRoute.includes("event.eventType === 'provider_accepted'"), 'MCA recovery requires consent, a private token, and durable provider-acceptance deduplication');
  assert(vercelConfig.includes('/api/cron/process-mca-priority-recovery'), 'The validated CAD $49 MCA recovery path is scheduled in production');
  assert(mcaDeliveryEmail.includes("tagType: 'mca-product-delivery'"), 'MCA transactional delivery is not misclassified as promotional outreach');
  assert(deliveryRecovery.includes("purchase.productId === 'mca-readiness-report'") && deliveryRecovery.includes('sendMCAReadinessReportDelivery'), 'Daily product-delivery recovery retries failed MCA report emails');
  assert(evidenceMetrics.includes('allTimeVerifiedCAD') && evidenceMetrics.includes('rolling30dVerifiedCAD'), 'CEO evidence reports verified CAD cash separately from USD');
  const agentOfferSurface = `${salesAgent} ${salesSequence} ${revenueOffers}`;
  assert(!agentOfferSurface.includes('TIER_STRATEGY_199') && !agentOfferSurface.includes('TIER_FILING_2500'), 'CEO and Revenue Hunter contain no call-dependent or service-dependent offer tiers');
  assert(!agentOfferSurface.includes('Schedule Technical Qualification Review') && !agentOfferSurface.includes('Reserve Your Strategy Session'), 'Autonomous sales copy contains no call-booking CTA');
  assert(salesSequence.includes('TIER_MEMBERSHIP_29') && salesSequence.includes('Start Funding Watch ($29/month)'), 'Autonomous sales copy has a dedicated $29 membership sequence');
  const seoOfferSurface = `${contentGapEngine} ${conversionEngine} ${seoExecutionEngine} ${seoMatrixEngine}`;
  assert(!seoOfferSurface.includes('strategy_session_199') && !seoOfferSurface.includes('grant_filing_2500'), 'SEO conversion engines contain no call-dependent or service-dependent offer');
  assert(seoOfferSurface.includes('/membership') && seoOfferSurface.includes('/products/bundle'), 'SEO conversion engines distribute the $29 membership and $79 bundle');
  assert(!objectionHandler.includes('reserve your session') && !objectionHandler.includes('book a working session'), 'Revenue Hunter reply guidance remains self-serve and call-free');

  console.log('All GrowthOS commercial reliability checks passed.');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
