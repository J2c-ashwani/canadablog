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

  const matches = buildMemberProgramMatches({ country: 'Canada', region: 'ON', industry: 'technology', companySize: '1-9', fundingInterests: ['Grants'] }, 5);
  assert(matches.every((match) => match.status === 'Open' || match.status === 'Upcoming'), 'Member radar excludes paused and closed database programs');

  const mcaReport = buildMCAReadinessReport({
    applicationId: 'MCA-TEST', legalBusinessName: 'Test Business', province: 'ON', industry: 'retail',
    yearsInBusiness: 2, monthlyRevenue: 20_000, fundingAmount: 25_000, fundingPurpose: 'inventory', fileCount: 3,
  });
  assert(mcaReport.score === 100 && mcaReport.requestToRevenueRatio === 1.25, 'MCA readiness score is deterministic from declared profile data');
  assert(mcaReport.notChecked.some((item) => item.includes('Bank-statement transactions')), 'MCA report explicitly discloses that transaction content is not inspected');

  const root = process.cwd();
  const calculatorRoute = fs.readFileSync(path.join(root, 'app/api/cron/process-calculator-recovery/route.ts'), 'utf8');
  const newsletterRoute = fs.readFileSync(path.join(root, 'app/api/cron/process-newsletter/route.ts'), 'utf8');
  const membershipCheckout = fs.readFileSync(path.join(root, 'components/membership/FoundingMemberCheckout.tsx'), 'utf8');
  const paypalWebhook = fs.readFileSync(path.join(root, 'app/api/paypal/webhook/route.ts'), 'utf8');
  const actionScorecard = fs.readFileSync(path.join(root, 'lib/growth-os/action-scorecard.ts'), 'utf8');
  const authorityDiscovery = fs.readFileSync(path.join(root, 'lib/growth-os/authority/opportunity-discovery.ts'), 'utf8');
  const operationsStore = fs.readFileSync(path.join(root, 'lib/growth-os/operations-store.ts'), 'utf8');
  const sheetsStore = fs.readFileSync(path.join(root, 'lib/google-sheets.ts'), 'utf8');
  const organicProductLadder = fs.readFileSync(path.join(root, 'components/products/OrganicProductLadder.tsx'), 'utf8');
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
  const evidenceMetrics = fs.readFileSync(path.join(root, 'lib/growth-os/evidence-metrics.ts'), 'utf8');
  const deliveryRecovery = fs.readFileSync(path.join(root, 'lib/products/delivery-recovery.ts'), 'utf8');
  assert(!calculatorRoute.includes('activity.calculatorCompletedAt || sub.timestamp'), 'Calculator recovery requires explicit calculator completion evidence');
  assert(newsletterRoute.includes('|| !activity.lastNewsletterProviderMessageId'), 'Newsletter retries legacy campaign markers that lack provider acceptance evidence');
  assert(!membershipCheckout.includes('SUB-FOUNDING-'), 'Membership checkout never fabricates a PayPal subscription ID');
  assert(paypalWebhook.includes("'BILLING.SUBSCRIPTION.RE-ACTIVATED': 'ACTIVE'"), 'PayPal re-activation restores active membership status');
  assert(paypalWebhook.includes("eventType: 'membership_payment_verified'"), 'Membership cash attribution requires a signed PayPal payment webhook');
  assert(actionScorecard.includes("decision: 'SCALE' | 'HOLD' | 'STOP'"), 'CEO action P&L emits explicit scale, hold, or stop decisions');
  assert(!authorityDiscovery.includes('contact@${domain}') && !authorityDiscovery.includes('960fb097'), 'Authority discovery neither guesses recipients nor embeds credentials');
  assert(operationsStore.includes('getCachedSheetValues') && sheetsStore.includes('sheetValuesCache'), 'CEO specialists coalesce duplicate Google Sheets reads');
  const leaseFinalizer = operationsStore.slice(operationsStore.indexOf('export async function finishOperationLease'));
  assert(!leaseFinalizer.includes("readOperationalRows('GrowthOS Runs'"), 'CEO lease finalization does not spend a read-quota request');
  assert(['$19', '$29', '$49', '$79', 'match-report', 'toolkit', 'action-plan', 'bundle', 'membership'].every((value) => organicProductLadder.includes(value)), 'Organic content distributes the complete self-serve product ladder');
  assert(!organicProductLadder.includes('$199') && !organicProductLadder.toLowerCase().includes('book a call'), 'Organic product ladder requires no live-call fulfillment');
  assert(onsiteClickRoute.includes('createTrackedGrowthUrl') && onsiteClickRoute.includes('fsi_organic_visitor') && onsiteClickRoute.includes('const OFFERS'), 'On-site product clicks use allowlisted signed first-party attribution');
  assert(blogRoute.includes('<OrganicProductLadder surface="blog"') && pseoRoute.includes('<OrganicProductLadder'), 'Paid self-serve distribution is present on blog and city-industry organic templates');
  assert(actionScorecard.includes("event.channel === 'organic_onsite'"), 'CEO action P&L treats unique first-party product clicks as qualified organic leads');
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
  assert(mcaDeliveryEmail.includes("tagType: 'mca-product-delivery'"), 'MCA transactional delivery is not misclassified as promotional outreach');
  assert(deliveryRecovery.includes("purchase.productId === 'mca-readiness-report'") && deliveryRecovery.includes('sendMCAReadinessReportDelivery'), 'Daily product-delivery recovery retries failed MCA report emails');
  assert(evidenceMetrics.includes('allTimeVerifiedCAD') && evidenceMetrics.includes('rolling30dVerifiedCAD'), 'CEO evidence reports verified CAD cash separately from USD');

  console.log('All GrowthOS commercial reliability checks passed.');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
