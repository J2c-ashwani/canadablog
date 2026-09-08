import { createHash, randomBytes } from 'crypto';
import {
  actionContextFromAttribution,
  type GrowthActionContext,
} from '@/lib/growth-os/action-attribution';
import { AFFILIATE_ATTRIBUTION_DAYS, normalizeAffiliateCode } from '@/lib/affiliates/config';

const ACTION_PREFIX = 'act_affiliate_';

export interface AffiliateAttribution {
  partnerId: string;
  referralCode: string;
  attributedAt: string;
  action: GrowthActionContext;
}

export function normalizeAffiliateEmail(value: unknown) {
  return String(value || '').trim().toLowerCase();
}

export function hashAffiliateIdentity(value: string) {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

export function buildAffiliateActionContext(input: {
  partnerId: string;
  referralCode: string;
  recipientId?: string;
}): GrowthActionContext | null {
  const partnerId = String(input.partnerId || '').trim();
  const referralCode = normalizeAffiliateCode(input.referralCode);
  if (!/^aff_[a-f0-9-]{16,64}$/i.test(partnerId) || !referralCode) return null;
  return {
    actionId: `${ACTION_PREFIX}${partnerId}`,
    channel: 'affiliate',
    campaign: referralCode,
    recipientId: input.recipientId || randomBytes(12).toString('hex'),
  };
}

export function affiliatePartnerIdFromActionId(actionId: unknown) {
  const value = String(actionId || '').trim();
  if (!value.startsWith(ACTION_PREFIX)) return '';
  const partnerId = value.slice(ACTION_PREFIX.length);
  return /^aff_[a-f0-9-]{16,64}$/i.test(partnerId) ? partnerId : '';
}

export function affiliateAttributionFromTrustedPaymentData(value: unknown): AffiliateAttribution | null {
  const action = actionContextFromAttribution(value);
  if (!action || action.channel !== 'affiliate') return null;
  const source = value as Record<string, unknown>;
  const partnerId = affiliatePartnerIdFromActionId(action.actionId);
  const referralCode = normalizeAffiliateCode(action.campaign);
  const attributedAt = String(
    source.affiliateAttributedAt
      || source.actionIssuedAt
      || source.goIssuedAt
      || ''
  ).trim();
  if (!partnerId || !referralCode || !attributedAt) return null;
  return { partnerId, referralCode, attributedAt, action };
}

export function isAffiliateAttributionCurrent(
  attributedAt: string,
  conversionAt: string,
  maxAgeDays = AFFILIATE_ATTRIBUTION_DAYS
) {
  const attributed = new Date(attributedAt).getTime();
  const converted = new Date(conversionAt).getTime();
  if (!Number.isFinite(attributed) || !Number.isFinite(converted)) return false;
  const age = converted - attributed;
  return age >= 0 && age <= maxAgeDays * 24 * 60 * 60 * 1000;
}

export function isAffiliateSelfReferral(input: {
  buyerEmail: string;
  affiliateEmail: string;
  payoutEmail?: string;
}) {
  const buyer = normalizeAffiliateEmail(input.buyerEmail);
  if (!buyer) return true;
  const identities = [input.affiliateEmail, input.payoutEmail]
    .map(normalizeAffiliateEmail)
    .filter(Boolean);
  return identities.includes(buyer);
}

