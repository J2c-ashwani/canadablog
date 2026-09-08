export const AFFILIATE_TERMS_VERSION = '2026-09-07';
export const AFFILIATE_COMMISSION_PERCENT = 30;
export const AFFILIATE_COMMISSION_RATE = AFFILIATE_COMMISSION_PERCENT / 100;
export const AFFILIATE_ATTRIBUTION_DAYS = 30;
export const AFFILIATE_HOLD_DAYS = 30;
export const AFFILIATE_MEMBERSHIP_PAYMENT_LIMIT = 3;

export const AFFILIATE_PRODUCT_LINKS = {
  'match-report': {
    productId: 'funding-match-report',
    path: '/products/funding-match-report',
    priceUSD: 19,
    recurring: false,
  },
  toolkit: {
    productId: 'funding-toolkit',
    path: '/products/toolkit',
    priceUSD: 29,
    recurring: false,
  },
  'action-plan': {
    productId: 'funding-roadmap',
    path: '/products/action-plan',
    priceUSD: 49,
    recurring: false,
  },
  blueprint: {
    productId: 'funding-bundle',
    path: '/products/bundle',
    priceUSD: 79,
    recurring: false,
  },
  membership: {
    productId: 'funding-membership',
    path: '/membership',
    priceUSD: 29,
    recurring: true,
  },
} as const;

export type AffiliateOfferId = keyof typeof AFFILIATE_PRODUCT_LINKS;
export type AffiliateEligibleProductId = (typeof AFFILIATE_PRODUCT_LINKS)[AffiliateOfferId]['productId'];

const ONE_TIME_PRODUCTS = new Map<string, number>(
  Object.values(AFFILIATE_PRODUCT_LINKS)
    .filter((offer) => !offer.recurring)
    .map((offer) => [offer.productId, offer.priceUSD])
);

export function normalizeAffiliateCode(value: unknown) {
  const normalized = String(value || '').trim().toLowerCase();
  return /^[a-z0-9][a-z0-9_-]{2,47}$/.test(normalized) ? normalized : '';
}

export function isAffiliateOfferId(value: unknown): value is AffiliateOfferId {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(AFFILIATE_PRODUCT_LINKS, value);
}

export function getAffiliateOffer(value: unknown) {
  const offerId: AffiliateOfferId = isAffiliateOfferId(value) ? value : 'match-report';
  return { offerId, ...AFFILIATE_PRODUCT_LINKS[offerId] };
}

export function getEligibleOneTimePriceUSD(productId: string) {
  return ONE_TIME_PRODUCTS.get(productId) ?? null;
}

export function isEligibleOneTimeAffiliatePurchase(input: {
  productId: string;
  amount: number;
  currency: string;
}) {
  const expected = getEligibleOneTimePriceUSD(input.productId);
  return expected !== null
    && input.currency.toUpperCase() === 'USD'
    && Number.isFinite(input.amount)
    && input.amount >= 1
    && input.amount <= expected + AFFILIATE_PRODUCT_LINKS.toolkit.priceUSD + 0.001;
}

/**
 * Computes commissionable value from provider-verified checkout terms. Ineligible
 * add-ons are removed; a Toolkit add-on remains eligible even when the primary
 * product is not.
 */
export function calculateEligibleOneTimeAffiliateSubtotalUSD(input: {
  productId: string;
  totalAmount: number;
  currency: string;
  addons?: Record<string, boolean>;
}) {
  if (input.currency.toUpperCase() !== 'USD' || !Number.isFinite(input.totalAmount) || input.totalAmount <= 0) return 0;
  const addons = input.addons || {};
  const primaryEligible = getEligibleOneTimePriceUSD(input.productId) !== null;
  let eligibleAmount = primaryEligible ? input.totalAmount : 0;
  if (primaryEligible && addons.approvalLibrary) eligibleAmount -= 9;
  if (primaryEligible && addons.strategySession) eligibleAmount -= 180;
  if (!primaryEligible && addons.toolkit) eligibleAmount += AFFILIATE_PRODUCT_LINKS.toolkit.priceUSD;
  return Math.max(0, Math.min(input.totalAmount, Math.round((eligibleAmount + Number.EPSILON) * 100) / 100));
}

export function isEligibleAffiliateMembershipPayment(input: {
  productId: string;
  amount: number;
  currency: string;
  paymentNumber: number;
}) {
  const membership = AFFILIATE_PRODUCT_LINKS.membership;
  return input.productId === membership.productId
    && input.currency.toUpperCase() === 'USD'
    && Number.isFinite(input.amount)
    && Math.abs(input.amount - membership.priceUSD) < 0.001
    && Number.isInteger(input.paymentNumber)
    && input.paymentNumber >= 1
    && input.paymentNumber <= AFFILIATE_MEMBERSHIP_PAYMENT_LIMIT;
}
