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

  const root = process.cwd();
  const calculatorRoute = fs.readFileSync(path.join(root, 'app/api/cron/process-calculator-recovery/route.ts'), 'utf8');
  const membershipCheckout = fs.readFileSync(path.join(root, 'components/membership/FoundingMemberCheckout.tsx'), 'utf8');
  const paypalWebhook = fs.readFileSync(path.join(root, 'app/api/paypal/webhook/route.ts'), 'utf8');
  const actionScorecard = fs.readFileSync(path.join(root, 'lib/growth-os/action-scorecard.ts'), 'utf8');
  const authorityDiscovery = fs.readFileSync(path.join(root, 'lib/growth-os/authority/opportunity-discovery.ts'), 'utf8');
  const operationsStore = fs.readFileSync(path.join(root, 'lib/growth-os/operations-store.ts'), 'utf8');
  const sheetsStore = fs.readFileSync(path.join(root, 'lib/google-sheets.ts'), 'utf8');
  assert(!calculatorRoute.includes('activity.calculatorCompletedAt || sub.timestamp'), 'Calculator recovery requires explicit calculator completion evidence');
  assert(!membershipCheckout.includes('SUB-FOUNDING-'), 'Membership checkout never fabricates a PayPal subscription ID');
  assert(paypalWebhook.includes("'BILLING.SUBSCRIPTION.RE-ACTIVATED': 'ACTIVE'"), 'PayPal re-activation restores active membership status');
  assert(paypalWebhook.includes("eventType: 'membership_payment_verified'"), 'Membership cash attribution requires a signed PayPal payment webhook');
  assert(actionScorecard.includes("decision: 'SCALE' | 'HOLD' | 'STOP'"), 'CEO action P&L emits explicit scale, hold, or stop decisions');
  assert(!authorityDiscovery.includes('contact@${domain}') && !authorityDiscovery.includes('960fb097'), 'Authority discovery neither guesses recipients nor embeds credentials');
  assert(operationsStore.includes('getCachedSheetValues') && sheetsStore.includes('sheetValuesCache'), 'CEO specialists coalesce duplicate Google Sheets reads');
  const leaseFinalizer = operationsStore.slice(operationsStore.indexOf('export async function finishOperationLease'));
  assert(!leaseFinalizer.includes("readOperationalRows('GrowthOS Runs'"), 'CEO lease finalization does not spend a read-quota request');

  console.log('All GrowthOS commercial reliability checks passed.');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
