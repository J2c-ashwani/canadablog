import {
  calculateEligibleOneTimeAffiliateSubtotalUSD,
  getEligibleOneTimePriceUSD,
} from '@/lib/affiliates/config';
import {
  parseAffiliateAttribution,
  recordAffiliateOneTimeCommission,
} from '@/lib/affiliates/store';

export async function recordAffiliateCommissionForVerifiedCheckout(input: {
  provider: 'paypal' | 'stripe';
  providerPaymentId: string;
  providerReference: string;
  productId: string;
  totalAmount: number;
  currency: string;
  addons?: Record<string, boolean>;
  buyerEmail: string;
  providerVerifiedAt: string;
  attribution: unknown;
}) {
  if (!parseAffiliateAttribution(input.attribution)) return { eligible: false, reason: 'no_affiliate_attribution' } as const;
  const providerPaymentId = String(input.providerPaymentId || '').trim();
  if (!providerPaymentId) return { eligible: false, reason: 'missing_provider_payment_id' } as const;
  const eligibleAmount = calculateEligibleOneTimeAffiliateSubtotalUSD({
    productId: input.productId,
    totalAmount: input.totalAmount,
    currency: input.currency,
    addons: input.addons,
  });
  if (eligibleAmount <= 0) return { eligible: false, reason: 'ineligible_product_or_currency' } as const;
  const commissionProductId = getEligibleOneTimePriceUSD(input.productId) !== null
    ? input.productId
    : 'funding-toolkit';
  const commission = await recordAffiliateOneTimeCommission({
    sourceId: providerPaymentId,
    provider: input.provider,
    providerReference: input.providerReference,
    productId: commissionProductId,
    amount: eligibleAmount,
    currency: input.currency,
    buyerEmail: input.buyerEmail,
    providerVerified: true,
    providerVerifiedAt: input.providerVerifiedAt,
    attribution: input.attribution,
  });
  return { eligible: true, commission } as const;
}
