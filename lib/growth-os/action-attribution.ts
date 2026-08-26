import { createHmac, randomUUID, timingSafeEqual } from 'crypto';
import { appendOperationalRow, readOperationalRows } from '@/lib/growth-os/operations-store';

export type GrowthActionEventType =
  | 'provider_accepted'
  | 'click'
  | 'checkout_started'
  | 'purchase_verified'
  | 'subscription_verified'
  | 'membership_payment_verified';

export interface GrowthActionContext {
  actionId: string;
  channel: string;
  campaign: string;
  recipientId: string;
}

export interface GrowthActionEvent extends GrowthActionContext {
  eventId: string;
  eventType: GrowthActionEventType;
  occurredAt: string;
  provider: string;
  providerMessageId: string;
  productId: string;
  revenueUSD: number;
  revenueCAD: number;
  mrrUSD: number;
  referenceId: string;
  metadata: Record<string, unknown>;
}

type LinkPayload = GrowthActionContext & {
  version: 1;
  target: string;
  issuedAt: string;
};

const EVENT_HEADERS = [
  'Event ID', 'Action ID', 'Channel', 'Campaign', 'Recipient ID', 'Event Type',
  'Occurred At', 'Provider', 'Provider Message ID', 'Product ID', 'Revenue USD',
  'Revenue CAD', 'MRR USD', 'Reference ID', 'Metadata JSON',
];
let knownEventIds: Set<string> | null = null;

const COMMERCIAL_TAG_PREFIXES = [
  'alert-nurture',
  'authority_outreach',
  'b2b_day',
  'calc-recovery',
  'cart-recovery',
  'growth-os-alert',
  'growth-os-newsletter',
  'inactivity-recovery',
  'mca-abandonment',
  'mca-readiness',
  'mca-recovery',
  'newsletter-match',
  'newsletter-missing',
  'newsletter-new',
  'partner-block',
  'reactivation-',
  'report-not-viewed',
  'revenue-hunter-',
  'sales-blast',
  'screener-recovery',
  'trial-expiry',
  'weekly-alerts',
];

function attributionSecret() {
  return process.env.GROWTH_ATTRIBUTION_SECRET
    || process.env.CRON_SECRET
    || process.env.LEAD_DASHBOARD_SECRET
    || '';
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'unknown';
}

function isAllowedTarget(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && ['fsidigital.ca', 'www.fsidigital.ca'].includes(url.hostname.toLowerCase());
  } catch {
    return false;
  }
}

export function isCommercialDistributionTag(tagType: string) {
  const normalized = String(tagType || '').toLowerCase();
  return COMMERCIAL_TAG_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

export function buildEmailActionContext(tagType: string, recipientEmail: string, now = new Date()): GrowthActionContext {
  const secret = attributionSecret();
  const normalizedEmail = recipientEmail.trim().toLowerCase();
  const recipientId = secret
    ? createHmac('sha256', secret).update(normalizedEmail).digest('hex').slice(0, 24)
    : '';
  const campaign = slug(tagType);
  return {
    actionId: `act_email_${campaign}_${now.toISOString().slice(0, 10)}`,
    channel: 'email',
    campaign,
    recipientId,
  };
}

export function actionContextFromAttribution(value: unknown): GrowthActionContext | null {
  if (!value || typeof value !== 'object') return null;
  const source = value as Record<string, unknown>;
  const actionId = String(source.actionId || source.goActionId || '').trim().slice(0, 160);
  const channel = String(source.actionChannel || source.goChannel || '').trim().slice(0, 80);
  const campaign = String(source.actionCampaign || source.goCampaign || '').trim().slice(0, 120);
  const recipientId = String(source.actionRecipientId || source.goRecipientId || '').trim().slice(0, 80);
  if (!actionId || !channel || !campaign || !recipientId) return null;
  return { actionId, channel, campaign, recipientId };
}

export function createTrackedGrowthUrl(target: string, context: GrowthActionContext, issuedAt = new Date().toISOString()) {
  const secret = attributionSecret();
  const normalizedTarget = target.replace(/&amp;/g, '&');
  if (!secret || !isAllowedTarget(normalizedTarget) || /(?:\/unsubscribe|unsubscribe=)/i.test(normalizedTarget)) return target;
  const payload: LinkPayload = { version: 1, target: normalizedTarget, issuedAt, ...context };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', secret).update(encoded).digest('base64url');
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca').replace(/\/$/, '');
  return `${origin}/api/growth-os/click?t=${encodeURIComponent(`${encoded}.${signature}`)}`;
}

export function parseTrackedGrowthToken(token: string): LinkPayload | null {
  const secret = attributionSecret();
  const [encoded, signature, extra] = String(token || '').split('.');
  if (!secret || !encoded || !signature || extra) return null;
  const expected = createHmac('sha256', secret).update(encoded).digest('base64url');
  if (!safeEqual(signature, expected)) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as LinkPayload;
    const issuedAt = new Date(payload.issuedAt).getTime();
    if (payload.version !== 1 || !payload.actionId || !payload.recipientId || !isAllowedTarget(payload.target)) return null;
    if (!Number.isFinite(issuedAt) || issuedAt > Date.now() + 5 * 60 * 1000 || issuedAt < Date.now() - 120 * 24 * 60 * 60 * 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

export function instrumentCommercialEmail(input: {
  html: string;
  text: string;
  to: string;
  tagType: string;
}) {
  if (!isCommercialDistributionTag(input.tagType) || !attributionSecret()) {
    return { ...input, context: null as GrowthActionContext | null };
  }
  const context = buildEmailActionContext(input.tagType, input.to);
  const transform = (target: string) => createTrackedGrowthUrl(target, context);
  const html = input.html.replace(
    /(href\s*=\s*["'])(https:\/\/(?:www\.)?fsidigital\.ca[^"']*)(["'])/gi,
    (_match, prefix, target, suffix) => `${prefix}${transform(target)}${suffix}`
  );
  const text = input.text.replace(
    /https:\/\/(?:www\.)?fsidigital\.ca[^\s<>"']+/gi,
    (target) => {
      const punctuation = target.match(/[),.;!?]+$/)?.[0] || '';
      const cleanTarget = punctuation ? target.slice(0, -punctuation.length) : target;
      return `${transform(cleanTarget)}${punctuation}`;
    }
  );
  return { ...input, html, text, context };
}

function parseMetadata(value: string) {
  try { return JSON.parse(value || '{}') as Record<string, unknown>; } catch { return {}; }
}

function parseEvent(row: string[]): GrowthActionEvent {
  return {
    eventId: row[0] || '',
    actionId: row[1] || '',
    channel: row[2] || '',
    campaign: row[3] || '',
    recipientId: row[4] || '',
    eventType: (row[5] || 'click') as GrowthActionEventType,
    occurredAt: row[6] || '',
    provider: row[7] || '',
    providerMessageId: row[8] || '',
    productId: row[9] || '',
    revenueUSD: Number(row[10] || 0),
    revenueCAD: Number(row[11] || 0),
    mrrUSD: Number(row[12] || 0),
    referenceId: row[13] || '',
    metadata: parseMetadata(row[14] || '{}'),
  };
}

export async function recordGrowthActionEvent(input: Omit<GrowthActionEvent, 'eventId' | 'occurredAt'> & {
  eventId?: string;
  occurredAt?: string;
}) {
  if (!input.actionId) return null;
  const event: GrowthActionEvent = {
    ...input,
    eventId: input.eventId || randomUUID(),
    occurredAt: input.occurredAt || new Date().toISOString(),
  };
  if (!knownEventIds) {
    const rows = await readOperationalRows('Growth Action Events', EVENT_HEADERS);
    knownEventIds = new Set(rows.map((row) => row[0]).filter(Boolean));
    const existing = rows.find((row) => row[0] === event.eventId);
    if (existing) return parseEvent(existing);
  } else if (knownEventIds.has(event.eventId)) {
    return event;
  }
  await appendOperationalRow('Growth Action Events', EVENT_HEADERS, [
    event.eventId,
    event.actionId,
    event.channel,
    event.campaign,
    event.recipientId,
    event.eventType,
    event.occurredAt,
    event.provider,
    event.providerMessageId,
    event.productId,
    event.revenueUSD,
    event.revenueCAD,
    event.mrrUSD,
    event.referenceId,
    JSON.stringify(event.metadata || {}),
  ]);
  knownEventIds.add(event.eventId);
  return event;
}

export async function getGrowthActionEvents() {
  return (await readOperationalRows('Growth Action Events', EVENT_HEADERS)).map(parseEvent);
}
