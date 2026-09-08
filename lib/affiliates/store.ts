import { randomBytes, randomUUID, timingSafeEqual } from 'crypto';
import {
  acquireOperationLease,
  appendOperationalRow,
  finishOperationLease,
  readOperationalRows,
} from '@/lib/growth-os/operations-store';
import { getGrowthActionEvents } from '@/lib/growth-os/action-attribution';
import {
  AFFILIATE_ATTRIBUTION_DAYS,
  AFFILIATE_COMMISSION_PERCENT,
  AFFILIATE_COMMISSION_RATE,
  AFFILIATE_HOLD_DAYS,
  AFFILIATE_MEMBERSHIP_PAYMENT_LIMIT,
  AFFILIATE_PRODUCT_LINKS,
  AFFILIATE_TERMS_VERSION,
  isEligibleAffiliateMembershipPayment,
  isEligibleOneTimeAffiliatePurchase,
  normalizeAffiliateCode,
} from '@/lib/affiliates/config';
import {
  affiliateAttributionFromTrustedPaymentData,
  hashAffiliateIdentity,
  isAffiliateAttributionCurrent,
  isAffiliateSelfReferral,
  normalizeAffiliateEmail,
  type AffiliateAttribution,
} from '@/lib/affiliates/attribution';

export type AffiliatePartnerStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
export type AffiliateCommissionStatus = 'holding' | 'payable' | 'paid' | 'reversed' | 'clawback_due';
export type AffiliateCommissionSourceType = 'one_time' | 'membership_payment';

export interface AffiliatePartner {
  partnerId: string;
  referralCode: string;
  name: string;
  email: string;
  payoutEmail: string;
  company: string;
  website: string;
  audienceType: string;
  audienceSize: string;
  promotionPlan: string;
  country: string;
  status: AffiliatePartnerStatus;
  termsVersion: string;
  termsAcceptedAt: string;
  appliedAt: string;
  reviewedAt: string;
  reviewedBy: string;
  reviewNote: string;
  portalTokenHash: string;
  updatedAt: string;
}

export interface PublicAffiliatePartner extends Omit<AffiliatePartner, 'portalTokenHash'> {}

export interface AffiliateCommission {
  commissionId: string;
  sourceType: AffiliateCommissionSourceType;
  sourceId: string;
  provider: 'paypal' | 'stripe';
  providerReference: string;
  membershipSubscriptionId: string;
  membershipPaymentNumber: number;
  partnerId: string;
  referralCode: string;
  productId: string;
  buyerIdentityHash: string;
  grossAmountUSD: number;
  grossAmount: number;
  commissionPercent: number;
  commissionAmountUSD: number;
  commissionAmount: number;
  currency: 'USD';
  status: AffiliateCommissionStatus;
  attributedAt: string;
  providerVerifiedAt: string;
  holdUntil: string;
  createdAt: string;
  earnedAt: string;
  updatedAt: string;
  reviewedBy: string;
  payoutReference: string;
  reason: string;
}

export interface CreateAffiliateApplicationInput {
  name: string;
  email: string;
  payoutEmail?: string;
  company?: string;
  website?: string;
  audienceType?: string;
  audienceSize?: string;
  promotionPlan?: string;
  country?: string;
  termsAccepted?: boolean;
  acceptedTerms?: boolean;
  termsAcceptedAt?: string;
  termsVersion?: string;
}

export interface RecordAffiliateCommissionInput {
  sourceType: AffiliateCommissionSourceType;
  sourceId: string;
  provider: 'paypal' | 'stripe';
  providerReference?: string;
  productId: string;
  amount: number;
  currency: string;
  buyerEmail: string;
  providerVerified: true;
  providerVerifiedAt: string;
  attributionQualifiedAt?: string;
  attribution: unknown;
  membershipSubscriptionId?: string;
  membershipPaymentNumber?: number;
}

export interface AffiliateAttributionIntent {
  intentId: string;
  partnerId: string;
  referralCode: string;
  actionId: string;
  channel: 'affiliate';
  campaign: string;
  recipientId: string;
  attributedAt: string;
  createdAt: string;
  expiresAt: string;
  consumedAt: string;
  subscriptionId: string;
  status: 'active' | 'consumed';
  buyerIdentityHash: string;
}

const PARTNER_SHEET = 'Affiliate Partners';
const PARTNER_HEADERS = [
  'Event ID', 'Event Type', 'Occurred At', 'Partner ID', 'Referral Code', 'Name',
  'Email', 'Payout Email', 'Company', 'Website', 'Audience Type', 'Audience Size',
  'Promotion Plan', 'Country', 'Status', 'Terms Version', 'Terms Accepted At',
  'Applied At', 'Reviewed At', 'Reviewed By', 'Review Note', 'Portal Token Hash',
];

const COMMISSION_SHEET = 'Affiliate Commissions';
const COMMISSION_HEADERS = [
  'Event ID', 'Event Type', 'Occurred At', 'Commission ID', 'Source Type', 'Source ID',
  'Provider', 'Provider Reference', 'Membership Subscription ID', 'Membership Payment Number',
  'Partner ID', 'Referral Code', 'Product ID', 'Buyer Identity Hash', 'Gross Amount USD',
  'Commission Percent', 'Commission Amount USD', 'Currency', 'Status', 'Attributed At',
  'Provider Verified At', 'Hold Until', 'Created At', 'Reviewed By', 'Payout Reference', 'Reason',
];

const ATTRIBUTION_INTENT_SHEET = 'Affiliate Attribution Intents';
const ATTRIBUTION_INTENT_HEADERS = [
  'Event ID', 'Event Type', 'Occurred At', 'Intent ID', 'Partner ID', 'Referral Code',
  'Action ID', 'Channel', 'Campaign', 'Recipient ID', 'Attributed At', 'Created At',
  'Expires At', 'Consumed At', 'Subscription ID', 'Status',
  'Buyer Identity Hash',
];

function safeText(value: unknown, maxLength: number) {
  return String(value || '').trim().replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0, maxLength);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value) && value.length <= 254;
}

function safeUrl(value: unknown) {
  const raw = safeText(value, 300);
  if (!raw) return '';
  try {
    const parsed = new URL(raw.startsWith('http') ? raw : `https://${raw}`);
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.toString().slice(0, 300) : '';
  } catch {
    return '';
  }
}

function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function validDate(value: string, allowFuture = false) {
  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) && (allowFuture || timestamp <= Date.now() + 5 * 60 * 1000);
}

function publicPartner(partner: AffiliatePartner): PublicAffiliatePartner {
  const { portalTokenHash: _portalTokenHash, ...safe } = partner;
  return safe;
}

function partnerFromRow(row: string[]): AffiliatePartner {
  return {
    partnerId: row[3] || '', referralCode: row[4] || '', name: row[5] || '',
    email: row[6] || '', payoutEmail: row[7] || '', company: row[8] || '',
    website: row[9] || '', audienceType: row[10] || '', audienceSize: row[11] || '',
    promotionPlan: row[12] || '', country: row[13] || '',
    status: (row[14] || 'pending') as AffiliatePartnerStatus,
    termsVersion: row[15] || '', termsAcceptedAt: row[16] || '', appliedAt: row[17] || '',
    reviewedAt: row[18] || '', reviewedBy: row[19] || '', reviewNote: row[20] || '',
    portalTokenHash: row[21] || '', updatedAt: row[2] || '',
  };
}

function commissionFromRow(row: string[]): AffiliateCommission {
  return {
    commissionId: row[3] || '', sourceType: (row[4] || 'one_time') as AffiliateCommissionSourceType,
    sourceId: row[5] || '', provider: (row[6] || 'paypal') as 'paypal' | 'stripe',
    providerReference: row[7] || '', membershipSubscriptionId: row[8] || '',
    membershipPaymentNumber: Number(row[9] || 0), partnerId: row[10] || '',
    referralCode: row[11] || '', productId: row[12] || '', buyerIdentityHash: row[13] || '',
    grossAmountUSD: Number(row[14] || 0), grossAmount: Number(row[14] || 0),
    commissionPercent: Number(row[15] || 0),
    commissionAmountUSD: Number(row[16] || 0), commissionAmount: Number(row[16] || 0), currency: 'USD',
    status: (row[18] || 'holding') as AffiliateCommissionStatus,
    attributedAt: row[19] || '', providerVerifiedAt: row[20] || '', holdUntil: row[21] || '',
    createdAt: row[22] || '', earnedAt: row[20] || row[22] || '',
    updatedAt: row[2] || '', reviewedBy: row[23] || '',
    payoutReference: row[24] || '', reason: row[25] || '',
  };
}

function attributionIntentFromRow(row: string[]): AffiliateAttributionIntent {
  return {
    intentId: row[3] || '', partnerId: row[4] || '', referralCode: row[5] || '',
    actionId: row[6] || '', channel: 'affiliate', campaign: row[8] || '',
    recipientId: row[9] || '', attributedAt: row[10] || '', createdAt: row[11] || '',
    expiresAt: row[12] || '', consumedAt: row[13] || '', subscriptionId: row[14] || '',
    status: (row[15] || 'active') as 'active' | 'consumed',
    buyerIdentityHash: row[16] || '',
  };
}

async function appendPartnerEvent(eventType: string, partner: AffiliatePartner) {
  const occurredAt = new Date().toISOString();
  await appendOperationalRow(PARTNER_SHEET, PARTNER_HEADERS, [
    randomUUID(), eventType, occurredAt, partner.partnerId, partner.referralCode, partner.name,
    partner.email, partner.payoutEmail, partner.company, partner.website, partner.audienceType,
    partner.audienceSize, partner.promotionPlan, partner.country, partner.status,
    partner.termsVersion, partner.termsAcceptedAt, partner.appliedAt, partner.reviewedAt,
    partner.reviewedBy, partner.reviewNote, partner.portalTokenHash,
  ]);
  return { ...partner, updatedAt: occurredAt };
}

async function appendCommissionEvent(eventType: string, commission: AffiliateCommission) {
  const occurredAt = new Date().toISOString();
  await appendOperationalRow(COMMISSION_SHEET, COMMISSION_HEADERS, [
    randomUUID(), eventType, occurredAt, commission.commissionId, commission.sourceType,
    commission.sourceId, commission.provider, commission.providerReference,
    commission.membershipSubscriptionId, commission.membershipPaymentNumber,
    commission.partnerId, commission.referralCode, commission.productId,
    commission.buyerIdentityHash, commission.grossAmountUSD, commission.commissionPercent,
    commission.commissionAmountUSD, commission.currency, commission.status,
    commission.attributedAt, commission.providerVerifiedAt, commission.holdUntil,
    commission.createdAt, commission.reviewedBy, commission.payoutReference, commission.reason,
  ]);
  return { ...commission, updatedAt: occurredAt };
}

async function appendAttributionIntentEvent(eventType: string, intent: AffiliateAttributionIntent) {
  const occurredAt = new Date().toISOString();
  await appendOperationalRow(ATTRIBUTION_INTENT_SHEET, ATTRIBUTION_INTENT_HEADERS, [
    randomUUID(), eventType, occurredAt, intent.intentId, intent.partnerId, intent.referralCode,
    intent.actionId, intent.channel, intent.campaign, intent.recipientId, intent.attributedAt,
    intent.createdAt, intent.expiresAt, intent.consumedAt, intent.subscriptionId, intent.status,
    intent.buyerIdentityHash,
  ]);
  return intent;
}

export async function listAffiliatePartners() {
  const rows = await readOperationalRows(PARTNER_SHEET, PARTNER_HEADERS);
  const latest = new Map<string, AffiliatePartner>();
  for (const row of rows) {
    const partner = partnerFromRow(row);
    if (partner.partnerId) latest.set(partner.partnerId, partner);
  }
  return [...latest.values()].sort((left, right) => right.appliedAt.localeCompare(left.appliedAt));
}

export async function getAffiliatePartnerById(partnerId: string) {
  return (await listAffiliatePartners()).find((partner) => partner.partnerId === partnerId) || null;
}

export async function getAffiliatePartnerByCode(code: string) {
  const normalized = normalizeAffiliateCode(code);
  if (!normalized) return null;
  return (await listAffiliatePartners()).find((partner) => partner.referralCode === normalized) || null;
}

export async function createAffiliateApplication(input: CreateAffiliateApplicationInput) {
  const name = safeText(input.name, 120);
  const email = normalizeAffiliateEmail(input.email);
  const payoutEmail = normalizeAffiliateEmail(input.payoutEmail || input.email);
  const promotionPlan = safeText(input.promotionPlan, 1200);
  const termsAccepted = input.termsAccepted === true
    || input.acceptedTerms === true
    || Boolean(input.termsAcceptedAt && validDate(input.termsAcceptedAt));
  const termsVersion = safeText(input.termsVersion || AFFILIATE_TERMS_VERSION, 40);
  if (name.length < 2) throw new Error('A valid name is required.');
  if (!isEmail(email) || !isEmail(payoutEmail)) throw new Error('A valid email and PayPal payout email are required.');
  if (promotionPlan.length < 20) throw new Error('Please explain how you plan to promote FSI Digital.');
  if (!termsAccepted || termsVersion !== AFFILIATE_TERMS_VERSION) {
    throw new Error('The current affiliate terms must be accepted.');
  }
  const existing = (await listAffiliatePartners()).find((partner) => partner.email === email);
  if (existing) throw new Error('An affiliate application already exists for this email address.');

  const now = new Date().toISOString();
  const partnerId = `aff_${randomUUID()}`;
  const nameSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 24) || 'partner';
  const referralCode = normalizeAffiliateCode(`${nameSlug}-${randomBytes(3).toString('hex')}`);
  const portalToken = `afp_${randomBytes(32).toString('base64url')}`;
  const partner: AffiliatePartner = {
    partnerId, referralCode, name, email, payoutEmail,
    company: safeText(input.company, 160), website: safeUrl(input.website),
    audienceType: safeText(input.audienceType, 160), audienceSize: safeText(input.audienceSize, 80),
    promotionPlan, country: safeText(input.country, 100), status: 'pending',
    termsVersion, termsAcceptedAt: now, appliedAt: now, reviewedAt: '', reviewedBy: '',
    reviewNote: '', portalTokenHash: hashAffiliateIdentity(portalToken), updatedAt: now,
  };
  const saved = await appendPartnerEvent('application_submitted', partner);
  return { partner: publicPartner(saved), portalToken };
}

export async function reviewAffiliatePartner(input: {
  partnerId: string;
  status: 'approved' | 'rejected';
  reviewedBy: string;
  note?: string;
}) {
  const partner = await getAffiliatePartnerById(input.partnerId);
  if (!partner) throw new Error('Affiliate partner not found.');
  if (partner.status !== 'pending') throw new Error('Only a pending affiliate application can be reviewed.');
  const reviewedBy = safeText(input.reviewedBy, 160);
  if (!reviewedBy) throw new Error('Reviewer identity is required.');
  return appendPartnerEvent('partner_reviewed', {
    ...partner,
    status: input.status,
    reviewedAt: new Date().toISOString(),
    reviewedBy,
    reviewNote: safeText(input.note, 500),
  });
}

export async function suspendAffiliatePartner(input: { partnerId: string; reviewedBy: string; reason: string }) {
  const partner = await getAffiliatePartnerById(input.partnerId);
  if (!partner) throw new Error('Affiliate partner not found.');
  if (!safeText(input.reason, 500)) throw new Error('A suspension reason is required.');
  return appendPartnerEvent('partner_suspended', {
    ...partner, status: 'suspended', reviewedAt: new Date().toISOString(),
    reviewedBy: safeText(input.reviewedBy, 160), reviewNote: safeText(input.reason, 500),
  });
}

export async function listAffiliateCommissions() {
  const rows = await readOperationalRows(COMMISSION_SHEET, COMMISSION_HEADERS);
  const latest = new Map<string, AffiliateCommission>();
  for (const row of rows) {
    const commission = commissionFromRow(row);
    if (commission.commissionId) latest.set(commission.commissionId, commission);
  }
  return [...latest.values()].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export async function getAffiliateCommissionById(commissionId: string) {
  return (await listAffiliateCommissions()).find((item) => item.commissionId === commissionId) || null;
}

function deterministicCommissionId(input: Pick<RecordAffiliateCommissionInput, 'provider' | 'sourceType' | 'sourceId'>) {
  const digest = hashAffiliateIdentity(`${input.provider}:${input.sourceType}:${input.sourceId}`).slice(0, 32);
  return `ac_${digest}`;
}

export async function recordAffiliateCommission(input: RecordAffiliateCommissionInput) {
  if (input.providerVerified !== true || !safeText(input.sourceId, 200) || !safeText(input.providerReference || input.sourceId, 200)) {
    throw new Error('A provider-verified payment reference is required.');
  }
  if (!validDate(input.providerVerifiedAt)) throw new Error('A valid provider verification time is required.');
  const commissionId = deterministicCommissionId(input);
  const existing = await getAffiliateCommissionById(commissionId);
  if (existing) return existing;

  const attribution = affiliateAttributionFromTrustedPaymentData(input.attribution);
  const attributionQualifiedAt = input.attributionQualifiedAt || input.providerVerifiedAt;
  if (!validDate(attributionQualifiedAt) || !attribution || !isAffiliateAttributionCurrent(attribution.attributedAt, attributionQualifiedAt)) {
    throw new Error(`Affiliate attribution must be signed and no older than ${AFFILIATE_ATTRIBUTION_DAYS} days.`);
  }
  const partner = await getAffiliatePartnerById(attribution.partnerId);
  if (!partner || partner.status !== 'approved' || partner.referralCode !== attribution.referralCode) {
    throw new Error('Affiliate partner is not approved for this attribution.');
  }
  if (isAffiliateSelfReferral({
    buyerEmail: input.buyerEmail,
    affiliateEmail: partner.email,
    payoutEmail: partner.payoutEmail,
  })) throw new Error('Self-referrals are not commissionable.');

  const membershipPaymentNumber = Number(input.membershipPaymentNumber || 0);
  const eligible = input.sourceType === 'one_time'
    ? isEligibleOneTimeAffiliatePurchase({ productId: input.productId, amount: input.amount, currency: input.currency })
    : Boolean(input.membershipSubscriptionId) && isEligibleAffiliateMembershipPayment({
      productId: input.productId,
      amount: input.amount,
      currency: input.currency,
      paymentNumber: membershipPaymentNumber,
    });
  if (!eligible) throw new Error('This payment is not eligible for affiliate commission.');

  if (input.sourceType === 'membership_payment') {
    const existingForSubscription = (await listAffiliateCommissions()).filter((item) =>
      item.sourceType === 'membership_payment'
      && item.membershipSubscriptionId === input.membershipSubscriptionId
      && item.commissionId !== commissionId
    );
    if (existingForSubscription.some((item) => item.membershipPaymentNumber === membershipPaymentNumber)) {
      throw new Error('This membership payment number already has an affiliate commission.');
    }
    if (existingForSubscription.length >= AFFILIATE_MEMBERSHIP_PAYMENT_LIMIT) {
      throw new Error('The first three membership payments have already been commissioned.');
    }
  }

  const lease = await acquireOperationLease(
    `affiliate-commission:${input.provider}:${input.sourceType}:${safeText(input.sourceId, 200)}`,
    10 * 60 * 1000
  );
  if (!lease.acquired) {
    const concurrent = await getAffiliateCommissionById(commissionId);
    if (concurrent) return concurrent;
    throw new Error('Affiliate commission recording is already in progress.');
  }

  try {
    const afterLease = await getAffiliateCommissionById(commissionId);
    if (afterLease) {
      await finishOperationLease(lease, 'SUCCEEDED', { duplicate: true, commissionId });
      return afterLease;
    }
    const verifiedTime = new Date(input.providerVerifiedAt).getTime();
    const holdUntil = new Date(verifiedTime + AFFILIATE_HOLD_DAYS * 24 * 60 * 60 * 1000).toISOString();
    const createdAt = new Date().toISOString();
    const grossAmountUSD = roundMoney(input.amount);
    const commission: AffiliateCommission = {
      commissionId, sourceType: input.sourceType, sourceId: safeText(input.sourceId, 200),
      provider: input.provider, providerReference: safeText(input.providerReference || input.sourceId, 200),
      membershipSubscriptionId: safeText(input.membershipSubscriptionId, 200),
      membershipPaymentNumber: input.sourceType === 'membership_payment' ? membershipPaymentNumber : 0,
      partnerId: partner.partnerId, referralCode: partner.referralCode, productId: input.productId,
      buyerIdentityHash: hashAffiliateIdentity(normalizeAffiliateEmail(input.buyerEmail)),
      grossAmountUSD, grossAmount: grossAmountUSD, commissionPercent: AFFILIATE_COMMISSION_PERCENT,
      commissionAmountUSD: roundMoney(grossAmountUSD * AFFILIATE_COMMISSION_RATE),
      commissionAmount: roundMoney(grossAmountUSD * AFFILIATE_COMMISSION_RATE), currency: 'USD',
      status: 'holding', attributedAt: attribution.attributedAt,
      providerVerifiedAt: input.providerVerifiedAt, holdUntil, createdAt,
      earnedAt: input.providerVerifiedAt, updatedAt: createdAt,
      reviewedBy: '', payoutReference: '', reason: '',
    };
    const saved = await appendCommissionEvent('commission_created', commission);
    await finishOperationLease(lease, 'SUCCEEDED', { commissionId });
    return saved;
  } catch (error) {
    await finishOperationLease(lease, 'FAILED', { error: error instanceof Error ? error.message : String(error) }).catch(() => {});
    throw error;
  }
}

const INVALID_SOURCE_STATUSES = new Set([
  'refund_pending', 'refunded', 'reversal_pending', 'reversed',
  'disputed', 'chargeback', 'revoked', 'failed', 'cancelled',
]);

async function commissionSourceIsPayable(commission: AffiliateCommission) {
  if (commission.sourceType === 'membership_payment') {
    const { getMembershipPayments } = await import('@/lib/membership/membership-store');
    const payment = (await getMembershipPayments()).find((item) => item.paymentId === commission.sourceId);
    return Boolean(payment && payment.status.toLowerCase() === 'completed' && payment.currency.toUpperCase() === 'USD');
  }
  const { getAllPurchases } = await import('@/lib/products/purchase-store');
  const matches = (await getAllPurchases({ strict: true })).filter((purchase) =>
    purchase.paypalCaptureId === commission.sourceId
  );
  if (matches.length === 0 || matches.some((purchase) => INVALID_SOURCE_STATUSES.has(String(purchase.status || '').toLowerCase()))) return false;
  return matches.some((purchase) =>
    ['provider_capture_verified', 'stripe_payment_verified', 'completed'].includes(String(purchase.paymentStatus || '').toLowerCase())
  );
}

export async function recordAffiliateOneTimeCommission(
  input: Omit<RecordAffiliateCommissionInput, 'sourceType' | 'membershipSubscriptionId' | 'membershipPaymentNumber'>
) {
  return recordAffiliateCommission({ ...input, sourceType: 'one_time' });
}

export async function recordAffiliateMembershipCommission(
  input: Omit<RecordAffiliateCommissionInput, 'sourceType'> & {
    membershipSubscriptionId: string;
    membershipPaymentNumber: number;
  }
) {
  return recordAffiliateCommission({ ...input, sourceType: 'membership_payment' });
}

export async function reviewAffiliateCommission(input: {
  commissionId: string;
  action: 'approve_payable' | 'reverse' | 'mark_paid';
  payoutReference?: string;
  reviewedBy: string;
  reason?: string;
}) {
  const commission = await getAffiliateCommissionById(input.commissionId);
  if (!commission) throw new Error('Affiliate commission not found.');
  const reviewedBy = safeText(input.reviewedBy, 160);
  if (!reviewedBy) throw new Error('Reviewer identity is required.');
  if (input.action === 'approve_payable') {
    if (commission.status !== 'holding') throw new Error('Only a holding commission can become payable.');
    if (new Date(commission.holdUntil).getTime() > Date.now()) {
      throw new Error(`Commission remains on hold for ${AFFILIATE_HOLD_DAYS} days after payment.`);
    }
    const partner = await getAffiliatePartnerById(commission.partnerId);
    if (!partner || partner.status !== 'approved') throw new Error('Affiliate partner is not currently approved.');
    if (!await commissionSourceIsPayable(commission)) {
      throw new Error('The underlying provider-verified payment is missing, refunded, reversed, or disputed.');
    }
    return appendCommissionEvent('commission_approved_payable', {
      ...commission, status: 'payable', reviewedBy,
      reason: safeText(input.reason || 'Hold completed; source reviewed by administrator.', 500),
    });
  }
  if (input.action === 'mark_paid') {
    const payoutReference = safeText(input.payoutReference, 200);
    if (commission.status !== 'payable') throw new Error('Only a payable commission can be marked paid.');
    if (!payoutReference) throw new Error('A PayPal payout reference is required.');
    const partner = await getAffiliatePartnerById(commission.partnerId);
    if (!partner || partner.status !== 'approved' || !await commissionSourceIsPayable(commission)) {
      throw new Error('Payout recording requires an approved partner and a payment without refund, reversal, or dispute.');
    }
    return appendCommissionEvent('commission_marked_paid', {
      ...commission, status: 'paid', reviewedBy, payoutReference,
      reason: safeText(input.reason || 'Manual PayPal payout recorded.', 500),
    });
  }
  if (commission.status === 'reversed' || commission.status === 'clawback_due') return commission;
  const reason = safeText(input.reason, 500);
  if (!reason) throw new Error('A reversal reason is required.');
  const reversalStatus: AffiliateCommissionStatus = commission.status === 'paid' ? 'clawback_due' : 'reversed';
  return appendCommissionEvent(reversalStatus === 'clawback_due' ? 'commission_clawback_due' : 'commission_reversed', {
    ...commission, status: reversalStatus, reviewedBy, reason,
  });
}

export async function reverseAffiliateCommissionForSource(input: {
  provider: 'paypal' | 'stripe';
  sourceId: string;
  reviewedBy?: string;
  reason: string;
}) {
  const commissionId = deterministicCommissionId({
    provider: input.provider,
    sourceType: 'one_time',
    sourceId: input.sourceId,
  });
  const oneTime = await getAffiliateCommissionById(commissionId);
  const commission = oneTime || (await listAffiliateCommissions()).find((item) =>
    item.provider === input.provider && item.sourceId === input.sourceId
  );
  if (!commission || commission.status === 'reversed' || commission.status === 'clawback_due') return commission;
  return reviewAffiliateCommission({
    commissionId: commission.commissionId,
    action: 'reverse',
    reviewedBy: safeText(input.reviewedBy || 'provider_refund_webhook', 160),
    reason: input.reason,
  });
}

export async function listAffiliateAttributionIntents() {
  const rows = await readOperationalRows(ATTRIBUTION_INTENT_SHEET, ATTRIBUTION_INTENT_HEADERS);
  const latest = new Map<string, AffiliateAttributionIntent>();
  for (const row of rows) {
    const intent = attributionIntentFromRow(row);
    if (intent.intentId) latest.set(intent.intentId, intent);
  }
  return [...latest.values()];
}

/**
 * Creates a short, opaque server-side handle suitable for PayPal custom_id.
 * The caller must pass attribution parsed from the signed growth cookie; raw
 * browser fields without the server-added issued time are rejected.
 */
export async function createAffiliateAttributionIntent(input: { trustedAttribution: unknown; buyerEmail: string }) {
  const attribution = affiliateAttributionFromTrustedPaymentData(input.trustedAttribution);
  const createdAt = new Date().toISOString();
  if (!attribution || !isAffiliateAttributionCurrent(attribution.attributedAt, createdAt)) {
    throw new Error('Current signed affiliate attribution is required.');
  }
  const partner = await getAffiliatePartnerById(attribution.partnerId);
  if (!partner || partner.status !== 'approved' || partner.referralCode !== attribution.referralCode) {
    throw new Error('Affiliate partner is not approved.');
  }
  const buyerEmail = normalizeAffiliateEmail(input.buyerEmail);
  if (!isEmail(buyerEmail)) throw new Error('A valid membership email is required.');
  const intent: AffiliateAttributionIntent = {
    intentId: `afi_${randomBytes(18).toString('base64url')}`,
    partnerId: partner.partnerId,
    referralCode: partner.referralCode,
    actionId: attribution.action.actionId,
    channel: 'affiliate',
    campaign: attribution.action.campaign,
    recipientId: attribution.action.recipientId,
    attributedAt: attribution.attributedAt,
    createdAt,
    expiresAt: new Date(Date.now() + AFFILIATE_ATTRIBUTION_DAYS * 24 * 60 * 60 * 1000).toISOString(),
    consumedAt: '',
    subscriptionId: '',
    status: 'active',
    buyerIdentityHash: hashAffiliateIdentity(buyerEmail),
  };
  return appendAttributionIntentEvent('intent_created', intent);
}

export async function getAffiliateAttributionIntent(intentId: string) {
  const normalized = safeText(intentId, 80);
  if (!/^afi_[A-Za-z0-9_-]{20,60}$/.test(normalized)) return null;
  return (await listAffiliateAttributionIntents()).find((intent) => intent.intentId === normalized) || null;
}

export async function consumeAffiliateAttributionIntent(input: { intentId: string; subscriptionId: string; buyerEmail: string }) {
  const intent = await getAffiliateAttributionIntent(input.intentId);
  const subscriptionId = safeText(input.subscriptionId, 200);
  if (!subscriptionId) throw new Error('Verified subscription ID is required.');
  const buyerHash = hashAffiliateIdentity(normalizeAffiliateEmail(input.buyerEmail));
  if (!intent || !tokenHashesMatch(intent.buyerIdentityHash, buyerHash)) {
    throw new Error('Affiliate attribution intent is unavailable.');
  }
  if (intent.status === 'consumed' && intent.subscriptionId === subscriptionId) return intent;
  if (intent.status !== 'active' || intent.consumedAt) throw new Error('Affiliate attribution intent is unavailable.');
  if (new Date(intent.expiresAt).getTime() < Date.now()) throw new Error('Affiliate attribution intent has expired.');
  const partner = await getAffiliatePartnerById(intent.partnerId);
  if (!partner || partner.status !== 'approved' || partner.referralCode !== intent.referralCode) {
    throw new Error('Affiliate partner is no longer approved.');
  }
  return appendAttributionIntentEvent('intent_consumed', {
    ...intent,
    status: 'consumed',
    consumedAt: new Date().toISOString(),
    subscriptionId,
  });
}

export function attributionFromAffiliateIntent(intent: AffiliateAttributionIntent) {
  return {
    actionId: intent.actionId,
    actionChannel: intent.channel,
    actionCampaign: intent.campaign,
    actionRecipientId: intent.recipientId,
    affiliateAttributedAt: intent.attributedAt,
  };
}

function tokenHashesMatch(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function getAffiliatePortal(token: string) {
  const tokenHash = hashAffiliateIdentity(String(token || ''));
  const partners = await listAffiliatePartners();
  const partner = partners.find((candidate) => tokenHashesMatch(candidate.portalTokenHash, tokenHash));
  if (!partner) return null;
  const [allCommissions, actionEvents] = await Promise.all([
    listAffiliateCommissions(),
    getGrowthActionEvents(),
  ]);
  const commissions = allCommissions.filter((item) => item.partnerId === partner.partnerId);
  const valid = commissions.filter((item) => !['reversed', 'clawback_due'].includes(item.status));
  const sum = (items: AffiliateCommission[]) => roundMoney(items.reduce((total, item) => total + item.commissionAmountUSD, 0));
  const metrics = {
    clicks: actionEvents.filter((event) => event.actionId === `act_affiliate_${partner.partnerId}` && event.eventType === 'click').length,
    verifiedConversions: valid.length,
    verifiedPurchases: valid.length,
    grossRevenueUSD: roundMoney(valid.reduce((total, item) => total + item.grossAmountUSD, 0)),
    commissionEarnedUSD: sum(valid),
    holdingUSD: sum(commissions.filter((item) => item.status === 'holding')),
    payableUSD: sum(commissions.filter((item) => item.status === 'payable')),
    paidUSD: sum(commissions.filter((item) => item.status === 'paid')),
    reversedUSD: sum(commissions.filter((item) => item.status === 'reversed')),
    clawbackDueUSD: sum(commissions.filter((item) => item.status === 'clawback_due')),
    holdingCommission: sum(commissions.filter((item) => item.status === 'holding')),
    payableCommission: sum(commissions.filter((item) => item.status === 'payable')),
    paidCommission: sum(commissions.filter((item) => item.status === 'paid')),
  };
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca').replace(/\/$/, '');
  const links = Object.entries(AFFILIATE_PRODUCT_LINKS).map(([offerId, offer]) => ({
    offerId,
    productId: offer.productId,
    url: `${origin}/r/${encodeURIComponent(partner.referralCode)}?offer=${encodeURIComponent(offerId)}`,
  }));
  return { partner: publicPartner(partner), metrics, commissions, links };
}

export function parseAffiliateAttribution(value: unknown): AffiliateAttribution | null {
  return affiliateAttributionFromTrustedPaymentData(value);
}
