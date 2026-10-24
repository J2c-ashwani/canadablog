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
  // Funding Watch is a recurring PayPal subscription and must never be sold
  // through the one-time product-order endpoint.
  if (product.id === 'funding-membership') {
    throw new Error('Funding Watch must be purchased through the recurring membership checkout.');
  }

  const addons = {
    toolkit: input.addons?.toolkit === true,
    approvalLibrary: input.addons?.approvalLibrary === true,
  };

  // Calculate verified customer prior purchase credit toward upgrades
  const [priorPurchases, subscriber] = await Promise.all([
    getPurchasesByEmail(email).catch(() => []),
    SubscriberRepository.getSubscriberByEmail(email).catch(() => null),
  ]);

  let priorCredit = 0;

  // Check direct purchases under this email
  const completedPurchases = priorPurchases.filter((p) =>
    ['completed', 'processing'].includes(String(p.status || '').toLowerCase())
  );
  const hasReportPurchase = completedPurchases.some((p) => p.productId === 'funding-match-report');
  const hasBundlePurchase = completedPurchases.some((p) =>
    ['funding-bundle', 'funding-toolkit'].includes(p.productId)
  );
  const hasRoadmapPurchase = completedPurchases.some((p) =>
    ['funding-roadmap', 'funding-action-plan'].includes(p.productId)
  );

  // Cross-reference subscriber repository flags (handles linked PayPal emails)
  const hasReportSub = subscriber?.reportPurchased === true;
  const hasBundleSub = subscriber?.strategyReportPurchased === true;

  const ownsReport = hasReportPurchase || hasReportSub;
  const ownsBundle = hasBundlePurchase || hasBundleSub;
  const ownsRoadmap = hasRoadmapPurchase;

  if (['strategy-audit', 'strategy-session'].includes(product.id)) {
    // 100% Fee Credit policy for Strategy Audit ($199)
    if (ownsReport && ownsBundle) {
      priorCredit = 98; // $19 Report + $79 Bundle = $98 credited (Net: $101)
    } else if (ownsBundle) {
      priorCredit = 79; // $79 Bundle credited (Net: $120)
    } else if (ownsRoadmap) {
      priorCredit = 49; // $49 Action plan credited (Net: $150)
    } else if (ownsReport) {
      priorCredit = 19; // $19 Report credited (Net: $180)
    }

    // Allow explicitly requested credit from client if verified by prior investment
    const requestedCredit = Number(input.profileData?.credit || input.attribution?.credit) || 0;
    if (requestedCredit > 0 && requestedCredit <= 98 && (ownsReport || ownsBundle || ownsRoadmap)) {
      priorCredit = Math.max(priorCredit, requestedCredit);
    }
  } else if (['funding-roadmap', 'funding-bundle'].includes(product.id)) {
    if (ownsReport) {
      priorCredit = 19; // $19 Report credited toward bundle or roadmap
    }
  }

  const portfolioDiscount = product.id === 'portfolio-assessment' &&
    subscriber && ['active', 'trial'].includes(String(subscriber.subscriptionStatus).toLowerCase())
    ? 100
    : 0;

  const baseAmount = Math.max(0.5, product.priceUsd - priorCredit - portfolioDiscount);

  let expectedAmount = baseAmount;
  if (addons.toolkit) expectedAmount += 29;
  if (addons.approvalLibrary) expectedAmount += 9;

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
