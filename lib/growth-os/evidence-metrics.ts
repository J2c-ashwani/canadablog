import { SubscriberRepository, type SubscriberProfile } from '@/lib/leads/SubscriberRepository';
import { getAllPurchases, type PurchaseRecord } from '@/lib/products/purchase-store';
import {
  getAllProductPaymentIntents,
  type ProductPaymentIntent,
} from '@/lib/payments/product-payment-intents';
import { getTelemetryEvents, type TelemetryEvent } from '@/lib/telemetry/telemetry-store';
import { getOutreachProspectsFromSheet, type OutreachProspect } from '@/lib/google-sheets';
import { readOperationalRows } from '@/lib/growth-os/operations-store';
import {
  getLatestMembershipSubscriptions,
  getMembershipPayments,
  type MembershipPaymentRecord,
  type MembershipSubscriptionRecord,
} from '@/lib/membership/membership-store';

const EMAIL_EVENT_HEADERS = [
  'Event ID', 'Provider', 'Provider Message ID', 'Event Type', 'Recipient', 'Occurred At', 'Received At',
];
const B2B_OUTREACH_HEADERS = [
  'Sent Timestamp', 'Company Name', 'Domain', 'Recipient Email', 'Decision Maker', 'Intent Score',
  'Funding Confidence %', 'Outreach Stage', 'Subject', 'Recommended Guides', 'Status',
  'Provider', 'Provider Message ID', 'Provider Acceptance',
];

export interface GrowthOSEvidenceSnapshot {
  generatedAt: string;
  evidenceState: 'VERIFIED' | 'PARTIAL' | 'UNKNOWN';
  sourceErrors: string[];
  revenue: {
    allTimeVerifiedUSD: number;
    allTimeVerifiedCAD: number;
    mtdVerifiedUSD: number;
    mtdVerifiedCAD: number;
    mtdOneTimeRevenueUSD: number;
    mtdMembershipRevenueUSD: number;
    rolling30dVerifiedUSD: number;
    rolling30dVerifiedCAD: number;
    activeMemberships: number;
    verifiedMRRUSD: number;
    verifiedPurchaseRecords: number;
    uniqueProviderCaptures: number;
    unverifiedPurchaseRecords: number;
  };
  funnel: {
    totalLeads: number;
    newLeads24h: number;
    newLeads30d: number;
    uniqueSessions30d: number;
    checkoutStarts30d: number;
    providerVerifiedPurchases30d: number;
    checkoutToPaymentRate30d: number;
    openPaymentIntents: number;
    capturedUnfulfilledIntents: number;
  };
  outreach: {
    authorityProspects: number;
    authorityQueued: number;
    authorityProviderAccepted: number;
    authorityDelivered: number;
    authorityReplies: number;
    authorityCheckouts: number;
    authorityPayments: number;
    authorityRevenueUSD: number;
    b2bProviderAccepted: number;
    b2bLegacyUnverified: number;
    emailDelivered: number;
    emailBounced: number;
    emailComplained: number;
  };
  fulfillment: {
    verifiedPurchases: number;
    providerAccepted: number;
    delivered: number;
    pending: number;
    failed: number;
  };
}

function numberValue(value: unknown) {
  const parsed = Number.parseFloat(String(value || '').replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function dateValue(value: unknown) {
  const parsed = new Date(String(value || '')).getTime();
  return Number.isFinite(parsed) ? parsed : 0;
}

function isTestIdentity(email: string, name = '') {
  const normalized = `${email} ${name}`.toLowerCase();
  return normalized.includes('@example.com')
    || normalized.includes('@test.com')
    || normalized.includes('@fsidigital.ca')
    || normalized.includes('test purchase')
    || normalized.includes('audit test');
}

function isProviderVerifiedPurchase(purchase: PurchaseRecord) {
  const paymentStatus = String(purchase.paymentStatus || '').toLowerCase();
  const status = String(purchase.status || '').toLowerCase();
  return Boolean(purchase.paypalCaptureId)
    && ['provider_capture_verified', 'stripe_payment_verified', 'completed'].includes(paymentStatus)
    && !['refunded', 'revoked', 'failed', 'cancelled'].includes(status);
}

function activityOf(subscriber: SubscriberProfile): Record<string, any> {
  try {
    return JSON.parse(subscriber.leadActivity || '{}');
  } catch {
    return {};
  }
}

function isVerifiedActiveMember(subscriber: SubscriberProfile) {
  const activity = activityOf(subscriber);
  const status = String(subscriber.subscriptionStatus || '').toUpperCase();
  const subscriptionId = String(subscriber.subscriptionId || '');
  return status === 'ACTIVE'
    && subscriptionId.startsWith('I-')
    && Boolean(activity.membershipVerifiedAt || activity.paypalSubscriptionVerifiedAt);
}

async function settleSource<T>(
  name: string,
  work: () => Promise<T>,
  fallback: T,
  errors: string[]
): Promise<T> {
  try {
    return await work();
  } catch (error: any) {
    errors.push(`${name}: ${error?.message || String(error)}`);
    return fallback;
  }
}

async function buildGrowthOSEvidence(): Promise<GrowthOSEvidenceSnapshot> {
  const sourceErrors: string[] = [];
  const [subscribers, purchases, intents, telemetry, prospects, emailEvents, b2bOutreach, memberships, membershipPayments] = await Promise.all([
    settleSource('Leads', () => SubscriberRepository.getAllSubscribers(true, true), [], sourceErrors),
    settleSource('Product Purchases', () => getAllPurchases({ strict: true }), [], sourceErrors),
    settleSource('Payment Intents', getAllProductPaymentIntents, [], sourceErrors),
    settleSource('Funnel Events', () => getTelemetryEvents({ strict: true }), [], sourceErrors),
    settleSource('OutreachProspects', () => getOutreachProspectsFromSheet({ strict: true }), [], sourceErrors),
    settleSource('Email Events', () => readOperationalRows('Email Events', EMAIL_EVENT_HEADERS), [], sourceErrors),
    settleSource('Outreach Leads', () => readOperationalRows('Outreach Leads', B2B_OUTREACH_HEADERS), [], sourceErrors),
    settleSource('Membership Subscriptions', getLatestMembershipSubscriptions, [], sourceErrors),
    settleSource('Membership Payments', getMembershipPayments, [], sourceErrors),
  ] as const) as [
    SubscriberProfile[],
    PurchaseRecord[],
    ProductPaymentIntent[],
    TelemetryEvent[],
    OutreachProspect[],
    string[][],
    string[][],
    MembershipSubscriptionRecord[],
    MembershipPaymentRecord[],
  ];

  const now = new Date();
  const monthStart = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1);
  const thirtyDaysAgo = now.getTime() - 30 * 24 * 60 * 60 * 1000;
  const oneDayAgo = now.getTime() - 24 * 60 * 60 * 1000;
  const verifiedPurchases = purchases.filter((purchase) =>
    isProviderVerifiedPurchase(purchase) && !isTestIdentity(purchase.email, purchase.name)
  );
  const verifiedMtdPurchases = verifiedPurchases.filter((purchase) => dateValue(purchase.createdAt) >= monthStart);
  const verified30dPurchases = verifiedPurchases.filter((purchase) => dateValue(purchase.createdAt) >= thirtyDaysAgo);
  const verifiedMembershipPayments = membershipPayments.filter((payment) =>
    Boolean(payment.paymentId)
    && payment.currency.toUpperCase() === 'USD'
    && payment.status.toLowerCase() === 'completed'
    && !isTestIdentity(payment.email)
  );
  const verifiedMtdMembershipPayments = verifiedMembershipPayments.filter((payment) => dateValue(payment.occurredAt) >= monthStart);
  const verified30dMembershipPayments = verifiedMembershipPayments.filter((payment) => dateValue(payment.occurredAt) >= thirtyDaysAgo);
  const allTimeProductRevenueUSD = verifiedPurchases
    .filter((purchase) => String(purchase.currency || 'USD').toUpperCase() === 'USD')
    .reduce((sum, purchase) => sum + numberValue(purchase.amount), 0);
  const mtdProductRevenueUSD = verifiedMtdPurchases
    .filter((purchase) => String(purchase.currency || 'USD').toUpperCase() === 'USD')
    .reduce((sum, purchase) => sum + numberValue(purchase.amount), 0);
  const allTimeMembershipRevenueUSD = verifiedMembershipPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const mtdMembershipRevenueUSD = verifiedMtdMembershipPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const rolling30dProductRevenueUSD = verified30dPurchases
    .filter((purchase) => String(purchase.currency || 'USD').toUpperCase() === 'USD')
    .reduce((sum, purchase) => sum + numberValue(purchase.amount), 0);
  const allTimeProductRevenueCAD = verifiedPurchases
    .filter((purchase) => String(purchase.currency || '').toUpperCase() === 'CAD')
    .reduce((sum, purchase) => sum + numberValue(purchase.amount), 0);
  const mtdProductRevenueCAD = verifiedMtdPurchases
    .filter((purchase) => String(purchase.currency || '').toUpperCase() === 'CAD')
    .reduce((sum, purchase) => sum + numberValue(purchase.amount), 0);
  const rolling30dProductRevenueCAD = verified30dPurchases
    .filter((purchase) => String(purchase.currency || '').toUpperCase() === 'CAD')
    .reduce((sum, purchase) => sum + numberValue(purchase.amount), 0);
  const rolling30dMembershipRevenueUSD = verified30dMembershipPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const activeMembers = memberships.filter((membership) =>
    membership.status === 'ACTIVE'
    && Boolean(membership.providerVerifiedAt)
    && membership.subscriptionId.startsWith('I-')
    && !isTestIdentity(membership.email)
  );
  const telemetry30d = telemetry.filter((event) => dateValue(event.timestamp) >= thirtyDaysAgo);
  const checkoutNames = new Set(['checkout_started', 'standalone_checkout_started', 'begin_checkout']);
  const checkoutStarts30d = telemetry30d.filter((event) => checkoutNames.has(event.eventName)).length;
  const uniqueSessions30d = new Set(
    telemetry30d.map((event) => event.sessionId).filter((sessionId) => sessionId && sessionId !== 'sess_anonymous')
  ).size;

  const deliveredStatuses = new Set(['delivered', 'email.delivered']);
  const acceptedStatuses = new Set(['provider_accepted', 'accepted', 'api_accepted']);
  const failedStatuses = new Set(['failed', 'bounced', 'email.bounced', 'complained', 'email.complained']);
  const fulfillment = verifiedPurchases.reduce((summary, purchase) => {
    const status = String(purchase.deliveryStatus || '').toLowerCase();
    if (deliveredStatuses.has(status)) summary.delivered++;
    else if (acceptedStatuses.has(status)) summary.providerAccepted++;
    else if (failedStatuses.has(status)) summary.failed++;
    else summary.pending++;
    return summary;
  }, { verifiedPurchases: verifiedPurchases.length, providerAccepted: 0, delivered: 0, pending: 0, failed: 0 });

  const authorityProviderAccepted = prospects.filter((prospect) => Boolean(prospect.providerMessageId)).length;
  const authorityDelivered = prospects.filter((prospect) =>
    String(prospect.deliveryStatus || '').toLowerCase() === 'delivered' || Boolean(prospect.deliveredAt)
  ).length;
  const authorityReplies = prospects.filter((prospect) => prospect.replied || Boolean(prospect.repliedAt)).length;
  const authorityCheckouts = prospects.filter((prospect) => Boolean(prospect.checkoutAt)).length;
  const authorityPayments = prospects.filter((prospect) => Boolean(prospect.paymentId)).length;
  const emailEventTypes = emailEvents.map((row) => String(row[3] || '').toLowerCase());
  const b2bProviderAccepted = b2bOutreach.filter((row) => Boolean(row[12]) && row[13] === 'accepted').length;
  const b2bLegacyUnverified = b2bOutreach.filter((row) => !row[12] && String(row[10] || '').toLowerCase().includes('sent')).length;
  const openPaymentIntents = intents.filter((intent) => intent.status === 'created').length;
  const capturedUnfulfilledIntents = intents.filter((intent) => intent.status === 'captured').length;

  return {
    generatedAt: now.toISOString(),
    evidenceState: sourceErrors.length === 0 ? 'VERIFIED' : sourceErrors.length < 3 ? 'PARTIAL' : 'UNKNOWN',
    sourceErrors,
    revenue: {
      allTimeVerifiedUSD: Number((allTimeProductRevenueUSD + allTimeMembershipRevenueUSD).toFixed(2)),
      allTimeVerifiedCAD: Number(allTimeProductRevenueCAD.toFixed(2)),
      mtdVerifiedUSD: Number((mtdProductRevenueUSD + mtdMembershipRevenueUSD).toFixed(2)),
      mtdVerifiedCAD: Number(mtdProductRevenueCAD.toFixed(2)),
      mtdOneTimeRevenueUSD: Number(mtdProductRevenueUSD.toFixed(2)),
      mtdMembershipRevenueUSD: Number(mtdMembershipRevenueUSD.toFixed(2)),
      rolling30dVerifiedUSD: Number((rolling30dProductRevenueUSD + rolling30dMembershipRevenueUSD).toFixed(2)),
      rolling30dVerifiedCAD: Number(rolling30dProductRevenueCAD.toFixed(2)),
      activeMemberships: activeMembers.length,
      verifiedMRRUSD: Number(activeMembers.reduce((sum, membership) => sum + membership.amountUSD, 0).toFixed(2)),
      verifiedPurchaseRecords: verifiedPurchases.length,
      uniqueProviderCaptures: new Set(verifiedPurchases.map((purchase) => purchase.paypalCaptureId).filter(Boolean)).size,
      unverifiedPurchaseRecords: purchases.length - verifiedPurchases.length,
    },
    funnel: {
      totalLeads: subscribers.length,
      newLeads24h: subscribers.filter((subscriber) => dateValue(subscriber.timestamp) >= oneDayAgo).length,
      newLeads30d: subscribers.filter((subscriber) => dateValue(subscriber.timestamp) >= thirtyDaysAgo).length,
      uniqueSessions30d,
      checkoutStarts30d,
      providerVerifiedPurchases30d: verified30dPurchases.length,
      checkoutToPaymentRate30d: checkoutStarts30d > 0
        ? Number((verified30dPurchases.length / checkoutStarts30d).toFixed(4))
        : 0,
      openPaymentIntents,
      capturedUnfulfilledIntents,
    },
    outreach: {
      authorityProspects: prospects.length,
      authorityQueued: prospects.filter((prospect) => ['pending', 'qualified', 'queued'].includes(String(prospect.status || '').toLowerCase())).length,
      authorityProviderAccepted,
      authorityDelivered,
      authorityReplies,
      authorityCheckouts,
      authorityPayments,
      authorityRevenueUSD: Number(prospects.reduce((sum, prospect) => sum + numberValue(prospect.revenue), 0).toFixed(2)),
      b2bProviderAccepted,
      b2bLegacyUnverified,
      emailDelivered: emailEventTypes.filter((type) => type === 'email.delivered').length,
      emailBounced: emailEventTypes.filter((type) => type === 'email.bounced').length,
      emailComplained: emailEventTypes.filter((type) => type === 'email.complained').length,
    },
    fulfillment,
  };
}

let evidenceCache: { expiresAt: number; promise: Promise<GrowthOSEvidenceSnapshot> } | null = null;

/** Share one evidence read across all CEO specialists in the same invocation. */
export async function collectGrowthOSEvidence(options?: { forceRefresh?: boolean }): Promise<GrowthOSEvidenceSnapshot> {
  if (!options?.forceRefresh && evidenceCache && evidenceCache.expiresAt > Date.now()) {
    return evidenceCache.promise;
  }
  const promise = buildGrowthOSEvidence();
  evidenceCache = { expiresAt: Date.now() + 30_000, promise };
  try {
    return await promise;
  } catch (error) {
    evidenceCache = null;
    throw error;
  }
}

export { isProviderVerifiedPurchase, isVerifiedActiveMember };
