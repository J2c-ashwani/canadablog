import { getProduct } from '@/lib/products/catalog';
import { getPurchasesByEmail } from '@/lib/products/purchase-store';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';

export interface ProductCheckoutRequest {
  productId: string;
  email: string;
  name: string;
  profileData: Record<string, unknown>;
  addons?: Record<string, unknown>;
  attribution?: Record<string, unknown>;
  sessionId?: string;
}

export interface ServerCheckoutDetails {
  productId: string;
  productName: string;
  email: string;
  name: string;
  profileData: Record<string, unknown>;
  attribution: Record<string, unknown>;
  sessionId: string;
  addons: Record<string, boolean>;
  baseAmount: number;
  expectedAmount: number;
  currency: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function buildServerCheckout(input: ProductCheckoutRequest): Promise<ServerCheckoutDetails> {
  const email = String(input.email || '').trim().toLowerCase();
  const name = String(input.name || '').trim().slice(0, 160);
  const product = getProduct(String(input.productId || ''));
  if (!product || !EMAIL.test(email) || !name || !input.profileData || typeof input.profileData !== 'object') {
    throw new Error('Invalid checkout details');
  }

  const addons = {
    toolkit: input.addons?.toolkit === true,
    approvalLibrary: input.addons?.approvalLibrary === true,
    strategySession: input.addons?.strategySession === true,
  };

  // A report buyer may apply exactly one $19 credit to an approved upgrade.
  const priorPurchases = await getPurchasesByEmail(email);
  const hasActiveReport = priorPurchases.some((purchase) =>
    purchase.productId === 'funding-match-report' &&
    ['completed', 'processing'].includes(String(purchase.status || '').toLowerCase())
  );
  const canApplyReportCredit = hasActiveReport && ['funding-roadmap', 'strategy-audit'].includes(product.id);
  const subscriber = product.id === 'portfolio-assessment'
    ? await SubscriberRepository.getSubscriberByEmail(email)
    : null;
  const portfolioDiscount = subscriber && ['active', 'trial'].includes(String(subscriber.subscriptionStatus).toLowerCase())
    ? 100
    : 0;
  const baseAmount = Math.max(0.5, product.priceUsd - (canApplyReportCredit ? 19 : 0) - portfolioDiscount);

  let expectedAmount = baseAmount;
  if (addons.toolkit) expectedAmount += 29;
  if (addons.approvalLibrary) expectedAmount += 9;
  if (addons.strategySession) expectedAmount += 180;

  return {
    productId: product.id,
    productName: product.name,
    email,
    name,
    profileData: input.profileData,
    attribution: input.attribution && typeof input.attribution === 'object' ? input.attribution : {},
    sessionId: String(input.sessionId || 'sess_anonymous').slice(0, 200),
    addons,
    baseAmount,
    expectedAmount,
    currency: process.env.PAYPAL_CURRENCY || process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || 'USD',
  };
}
