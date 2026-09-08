import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  AFFILIATE_ATTRIBUTION_DAYS,
  AFFILIATE_COMMISSION_PERCENT,
  AFFILIATE_HOLD_DAYS,
  AFFILIATE_MEMBERSHIP_PAYMENT_LIMIT,
  AFFILIATE_PRODUCT_LINKS,
  calculateEligibleOneTimeAffiliateSubtotalUSD,
  isEligibleAffiliateMembershipPayment,
} from '../lib/affiliates/config';
import {
  affiliateAttributionFromTrustedPaymentData,
  buildAffiliateActionContext,
  isAffiliateAttributionCurrent,
  isAffiliateSelfReferral,
} from '../lib/affiliates/attribution';

const root = resolve(__dirname, '..');
const source = (path: string) => readFileSync(resolve(root, path), 'utf8');
const requires = (path: string, pattern: RegExp, explanation: string) => {
  assert.match(source(path), pattern, `${path}: ${explanation}`);
};

assert.equal(AFFILIATE_COMMISSION_PERCENT, 30);
assert.equal(AFFILIATE_ATTRIBUTION_DAYS, 30);
assert.equal(AFFILIATE_HOLD_DAYS, 30);
assert.equal(AFFILIATE_MEMBERSHIP_PAYMENT_LIMIT, 3);
assert.deepEqual(
  Object.fromEntries(Object.entries(AFFILIATE_PRODUCT_LINKS).map(([key, offer]) => [key, offer.priceUSD])),
  { 'match-report': 19, toolkit: 29, 'action-plan': 49, blueprint: 79, membership: 29 }
);

const action = buildAffiliateActionContext({
  partnerId: 'aff_12345678-1234-1234-1234-123456789abc',
  referralCode: 'trusted-partner',
  recipientId: 'browser-123',
});
assert.ok(action);
const attributedAt = '2026-09-01T12:00:00.000Z';
const parsed = affiliateAttributionFromTrustedPaymentData({
  actionId: action.actionId,
  actionChannel: action.channel,
  actionCampaign: action.campaign,
  actionRecipientId: action.recipientId,
  actionIssuedAt: attributedAt,
});
assert.equal(parsed?.partnerId, 'aff_12345678-1234-1234-1234-123456789abc');
assert.equal(parsed?.referralCode, 'trusted-partner');
assert.equal(parsed?.attributedAt, attributedAt);
assert.equal(isAffiliateAttributionCurrent(attributedAt, '2026-10-01T12:00:00.000Z'), true);
assert.equal(isAffiliateAttributionCurrent(attributedAt, '2026-10-01T12:00:00.001Z'), false);
assert.equal(isAffiliateAttributionCurrent(attributedAt, '2026-08-31T12:00:00.000Z'), false);
assert.equal(isAffiliateSelfReferral({ buyerEmail: 'owner@example.com', affiliateEmail: 'OWNER@example.com' }), true);
assert.equal(isAffiliateSelfReferral({ buyerEmail: 'buyer@example.com', affiliateEmail: 'partner@example.com', payoutEmail: 'buyer@example.com' }), true);
assert.equal(isAffiliateSelfReferral({ buyerEmail: 'buyer@example.com', affiliateEmail: 'partner@example.com' }), false);

const eligibleSubtotal = (productId: string, totalAmount: number, addons: Record<string, boolean> = {}) =>
  calculateEligibleOneTimeAffiliateSubtotalUSD({ productId, totalAmount, currency: 'USD', addons });
assert.equal(eligibleSubtotal('funding-match-report', 19), 19);
assert.equal(eligibleSubtotal('funding-bundle', 108, { toolkit: true }), 108);
assert.equal(eligibleSubtotal('funding-bundle', 88, { approvalLibrary: true }), 79);
assert.equal(eligibleSubtotal('funding-match-report', 199, { strategySession: true }), 19);
assert.equal(eligibleSubtotal('strategy-session', 209, { toolkit: true, strategySession: true }), 29);
assert.equal(eligibleSubtotal('strategy-session', 199, { strategySession: true }), 0);
assert.equal(calculateEligibleOneTimeAffiliateSubtotalUSD({ productId: 'funding-bundle', totalAmount: 79, currency: 'CAD' }), 0);

const membership = (paymentNumber: number, amount = 29, currency = 'USD') =>
  isEligibleAffiliateMembershipPayment({ productId: 'funding-membership', amount, currency, paymentNumber });
assert.equal(membership(1), true);
assert.equal(membership(3), true);
assert.equal(membership(4), false);
assert.equal(membership(1, 28), false);
assert.equal(membership(1, 29, 'CAD'), false);

for (const checkoutRoute of [
  'app/api/products/create-paypal-order/route.ts',
  'app/api/stripe/create-checkout-session/route.ts',
]) {
  requires(checkoutRoute, /delete\s+attribution\.actionId/, 'must discard browser-supplied action attribution');
  for (const alias of ['goActionId', 'goChannel', 'goCampaign', 'goRecipientId', 'goIssuedAt']) {
    requires(checkoutRoute, new RegExp(`delete\\s+attribution\\.${alias}`), 'must discard legacy browser attribution aliases');
  }
  requires(checkoutRoute, /actionIssuedAt/, 'must persist the server-verified cookie issue time');
}

for (const verifiedPaymentHandler of [
  'app/api/products/purchase/route.ts',
  'app/api/paypal/webhook/route.ts',
  'app/api/stripe/success/route.ts',
  'app/api/stripe/webhook/route.ts',
]) {
  requires(verifiedPaymentHandler, /recordAffiliateCommissionForVerifiedCheckout/, 'must record eligible commission from provider-verified payment');
}

requires('app/api/stripe/webhook/route.ts', /payment_status\s*!==\s*'paid'/, 'must reject an unpaid completed Checkout Session');
requires('app/api/stripe/webhook/route.ts', /charge\.refunded/, 'must process Stripe refunds');
requires('app/api/stripe/webhook/route.ts', /charge\.dispute\.created/, 'must process Stripe disputes');
requires('app/api/paypal/webhook/route.ts', /PAYMENT\.CAPTURE\.REFUNDED/, 'must process PayPal capture refunds');
requires('app/api/paypal/webhook/route.ts', /CUSTOMER\.DISPUTE\.CREATED/, 'must process PayPal disputes');
requires('app/api/admin/products/refund/route.ts', /reverseAffiliateCommissionForSource/, 'manual refunds must reverse affiliate commissions');

requires('components/membership/FoundingMemberCheckout.tsx', /affiliate-intent/, 'membership checkout must create a durable attribution intent');
requires('components/membership/FoundingMemberCheckout.tsx', /subscription\.custom_id\s*=\s*membershipAttributionId/, 'PayPal subscription must carry only the opaque intent handle');
requires('app/api/paypal/webhook/route.ts', /consumeAffiliateAttributionIntent/, 'membership activation webhook must recover durable attribution');
requires('app/api/paypal/webhook/route.ts', /recordAffiliateMembershipCommission/, 'signed membership payments must create eligible commissions');

requires('app/api/growth-os/click/route.ts', /existingPayload\?\.channel\s*===\s*'affiliate'/, 'internal clicks must preserve a current affiliate attribution');
requires('lib/affiliates/store.ts', /acquireOperationLease/, 'commission writes must use a cross-instance operation lease');
requires('lib/affiliates/store.ts', /deterministicCommissionId/, 'commission IDs must be deterministic for provider-source deduplication');
requires('lib/affiliates/store.ts', /clawback_due/, 'paid commissions must become clawbacks after a reversal');
requires('lib/affiliates/store.ts', /A PayPal payout reference is required/, 'manual payouts must retain provider evidence');
requires('lib/affiliates/store.ts', /commissionSourceIsPayable/, 'payout approval must revalidate the underlying payment ledger');

requires('app/api/cron/reconcile-affiliate-commissions/route.ts', /isValidCronRequest/, 'reconciliation cron must require authorization');
requires('app/api/cron/reconcile-affiliate-commissions/route.ts', /acquireOperationLease/, 'reconciliation cron must be singleton-safe');
requires('vercel.json', /reconcile-affiliate-commissions/, 'production must schedule affiliate reconciliation');
requires('app/affiliates/status/page.tsx', /index: false/, 'private partner portal must not be indexed');
requires('app/affiliates/status/page.tsx', /no-referrer/, 'private portal tokens must not leak via referrers');
requires('app/sitemap.ts', /if \(route === '\/affiliates\/status'\) return false/, 'private affiliate status portal must be excluded from the sitemap');
requires('app/affiliates/page.tsx', /not affiliated with any government/, 'public program must disclose private-company status');
requires('app/affiliates/page.tsx', /do not guarantee eligibility, approval, funding/, 'public program must prohibit funding guarantees');

console.log('Affiliate distribution verification passed: commercial terms, attribution, provider evidence, reversals, membership recovery, payout controls, and public compliance.');
