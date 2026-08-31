import { getGrowthActionEvents } from '@/lib/growth-os/action-attribution';
import { readOperationalRows } from '@/lib/growth-os/operations-store';
import { getAllPurchases, updatePurchaseDeliveryFromProviderEvent } from '@/lib/products/purchase-store';
import { persistDeliveryEvents, type DeliveryEvent } from '@/lib/emails/delivery-events';

const EMAIL_EVENT_HEADERS = [
  'Event ID', 'Provider', 'Provider Message ID', 'Event Type', 'Recipient', 'Occurred At', 'Received At',
];

type BrevoProviderEvent = {
  event?: string;
  messageId?: string;
  email?: string;
  date?: string;
};

export function mapBrevoEvent(value: unknown) {
  const state = String(value || '').trim().toLowerCase();
  if (state === 'delivered') return 'email.delivered';
  if (state === 'opened' || state === 'uniqueopened') return 'email.opened';
  if (state === 'clicks' || state === 'unique clicks') return 'email.clicked';
  if (state === 'hardbounces' || state === 'softbounces' || state === 'blocked' || state === 'invalid') return 'email.bounced';
  if (state === 'spam') return 'email.complained';
  if (state === 'error') return 'email.failed';
  if (state === 'unsubscribed') return 'email.unsubscribed';
  return '';
}

function canonicalBrevoMessageId(value: unknown) {
  return String(value || '').trim().replace(/^<|>$/g, '').toLowerCase();
}

async function listRecentBrevoEvents(apiKey: string, limit: number) {
  const url = new URL('https://api.brevo.com/v3/smtp/statistics/events');
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('sort', 'desc');
  const response = await fetch(url, {
    headers: { 'api-key': apiKey, Accept: 'application/json' },
    cache: 'no-store',
  });
  const payload = await response.json().catch(() => ({})) as { events?: BrevoProviderEvent[]; message?: string };
  if (!response.ok) throw new Error(payload.message || `Brevo reconciliation failed with HTTP ${response.status}.`);
  return Array.isArray(payload.events) ? payload.events : [];
}

/** Reconciles only Brevo message IDs already accepted into FSI Digital's own ledgers. */
export async function reconcileBrevoDeliveryEvents(options?: { maxEvents?: number }) {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  if (!apiKey) return {
    skipped: true,
    reason: 'BREVO_API_KEY is not configured',
    eligible: 0,
    matched: 0,
    persisted: 0,
    failed: 0,
    requiresReadAccess: true,
  };

  const [actionEvents, purchases, emailRows] = await Promise.all([
    getGrowthActionEvents(),
    getAllPurchases({ strict: true }),
    readOperationalRows('Email Events', EMAIL_EVENT_HEADERS),
  ]);
  const existingEventKeys = new Set(emailRows
    .filter((row) => String(row[1] || '').toLowerCase() === 'brevo')
    .map((row) => `${String(row[2] || '')}:${String(row[3] || '').toLowerCase()}`));
  const purchaseMessageIds = new Set(purchases
    .map((purchase) => String(purchase.deliveryProviderMessageId || ''))
    .filter((messageId) => canonicalBrevoMessageId(messageId).includes('@')));
  const eligibleIds = new Set([
    ...actionEvents
      .filter((event) => event.eventType === 'provider_accepted' && event.provider.toLowerCase() === 'brevo')
      .map((event) => event.providerMessageId),
    ...purchaseMessageIds,
  ].filter(Boolean));
  if (eligibleIds.size === 0) return {
    skipped: false,
    eligible: 0,
    matched: 0,
    persisted: 0,
    failed: 0,
    requiresReadAccess: false,
  };

  const eligibleCanonicalIds = new Map(Array.from(eligibleIds)
    .map((messageId) => [canonicalBrevoMessageId(messageId), messageId] as const)
    .filter(([canonical]) => Boolean(canonical)));
  const maxEvents = Math.min(Math.max(options?.maxEvents || 1000, 100), 5000);
  const providerEvents = await listRecentBrevoEvents(apiKey, maxEvents);

  const deliveryEvents: DeliveryEvent[] = providerEvents.flatMap((event) => {
    const providerMessageId = eligibleCanonicalIds.get(canonicalBrevoMessageId(event.messageId)) || '';
    const eventType = mapBrevoEvent(event.event);
    if (!providerMessageId || !eventType) return [];
    const occurredAt = String(event.date || new Date().toISOString());
    return [{
      eventId: `brevo-api:${providerMessageId}:${eventType}:${occurredAt}`,
      provider: 'brevo' as const,
      providerMessageId,
      eventType,
      recipient: String(event.email || '').trim().toLowerCase(),
      occurredAt,
    }];
  });
  const uniqueEvents = Array.from(new Map(deliveryEvents.map((event) => [event.eventId, event])).values());
  const persisted = await persistDeliveryEvents(uniqueEvents);
  for (const event of uniqueEvents.filter((event) => purchaseMessageIds.has(event.providerMessageId))) {
    await updatePurchaseDeliveryFromProviderEvent(event.providerMessageId, event.eventType);
  }

  return {
    skipped: false,
    eligible: eligibleIds.size,
    matched: new Set(uniqueEvents.map((event) => event.providerMessageId)).size,
    persisted,
    failed: new Set(uniqueEvents
      .filter((event) => event.eventType === 'email.failed')
      .map((event) => event.providerMessageId)).size,
    requiresReadAccess: false,
  };
}
