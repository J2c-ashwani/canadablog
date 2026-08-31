import { getGrowthActionEvents } from '@/lib/growth-os/action-attribution';
import { readOperationalRows } from '@/lib/growth-os/operations-store';
import { getAllPurchases, updatePurchaseDeliveryFromProviderEvent } from '@/lib/products/purchase-store';
import { persistDeliveryEvents, type DeliveryEvent } from '@/lib/emails/delivery-events';

const EMAIL_EVENT_HEADERS = [
  'Event ID', 'Provider', 'Provider Message ID', 'Event Type', 'Recipient', 'Occurred At', 'Received At',
];
const TERMINAL_EVENTS = new Set(['delivered', 'opened', 'clicked', 'bounced', 'complained']);

type ResendEmailSummary = {
  id?: string;
  to?: string[] | string;
  created_at?: string;
  last_event?: string;
};

type ResendListResponse = {
  data?: ResendEmailSummary[];
  has_more?: boolean;
  message?: string;
};

export function mapResendLastEvent(value: unknown) {
  const state = String(value || '').trim().toLowerCase();
  return TERMINAL_EVENTS.has(state) ? `email.${state}` : '';
}

async function listResendPage(apiKey: string, after = '') {
  const url = new URL('https://api.resend.com/emails');
  if (after) url.searchParams.set('after', after);
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
    cache: 'no-store',
  });
  const payload = await response.json().catch(() => ({})) as ResendListResponse;
  if (!response.ok) throw new Error(payload.message || `Resend reconciliation failed with HTTP ${response.status}.`);
  return payload;
}

/**
 * Fallback for installations where the signed Resend webhook is delayed or
 * absent. Only provider IDs already recorded by our own ledgers are eligible.
 */
export async function reconcileResendDeliveryEvents(options?: { maxPages?: number }) {
  const reconciliationKey = process.env.RESEND_RECONCILIATION_API_KEY?.trim();
  const apiKey = reconciliationKey || process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return {
    skipped: true,
    reason: 'RESEND_RECONCILIATION_API_KEY and RESEND_API_KEY are not configured',
    eligible: 0,
    matched: 0,
    persisted: 0,
    requiresReadAccess: true,
  };

  const [actionEvents, purchases, emailRows] = await Promise.all([
    getGrowthActionEvents(),
    getAllPurchases({ strict: true }),
    readOperationalRows('Email Events', EMAIL_EVENT_HEADERS),
  ]);
  const existingTerminalIds = new Set(emailRows
    .filter((row) => mapResendLastEvent(String(row[3] || '').replace(/^email\./, '')))
    .map((row) => String(row[2] || ''))
    .filter(Boolean));
  const purchaseMessageIds = new Set(purchases.map((purchase) => String(purchase.deliveryProviderMessageId || '')).filter(Boolean));
  const eligibleIds = new Set([
    ...actionEvents
      .filter((event) => event.eventType === 'provider_accepted' && event.provider.toLowerCase() === 'resend')
      .map((event) => event.providerMessageId),
    ...purchaseMessageIds,
  ].filter((messageId) => messageId && !existingTerminalIds.has(messageId)));
  if (eligibleIds.size === 0) return {
    skipped: false,
    eligible: 0,
    matched: 0,
    persisted: 0,
    requiresReadAccess: false,
    credentialSource: reconciliationKey ? 'dedicated_reconciliation_key' : 'send_key_with_read_access',
  };

  const matched = new Map<string, ResendEmailSummary>();
  let after = '';
  const maxPages = Math.min(Math.max(options?.maxPages || 10, 1), 20);
  for (let page = 0; page < maxPages && matched.size < eligibleIds.size; page++) {
    let response: ResendListResponse;
    try {
      response = await listResendPage(apiKey, after);
    } catch (error: any) {
      const reason = error?.message || String(error);
      if (/restricted to only send emails|permission|unauthorized|forbidden/i.test(reason)) {
        return {
          skipped: true,
          reason: 'Configure RESEND_RECONCILIATION_API_KEY with Resend read access, or configure the signed Resend webhook.',
          eligible: eligibleIds.size,
          matched: 0,
          persisted: 0,
          requiresReadAccess: true,
        };
      }
      throw error;
    }
    const emails = Array.isArray(response.data) ? response.data : [];
    for (const email of emails) {
      const id = String(email.id || '');
      if (eligibleIds.has(id) && mapResendLastEvent(email.last_event)) matched.set(id, email);
    }
    const lastId = String(emails.at(-1)?.id || '');
    if (!response.has_more || !lastId || lastId === after) break;
    after = lastId;
  }

  const observedAt = new Date().toISOString();
  const deliveryEvents: DeliveryEvent[] = Array.from(matched.values()).map((email) => {
    const providerMessageId = String(email.id || '');
    const eventType = mapResendLastEvent(email.last_event);
    const recipientValue = Array.isArray(email.to) ? email.to[0] : email.to;
    return {
      eventId: `resend-api:${providerMessageId}:${eventType}`,
      provider: 'resend',
      providerMessageId,
      eventType,
      recipient: String(recipientValue || '').trim().toLowerCase(),
      occurredAt: observedAt,
    };
  });
  const persisted = await persistDeliveryEvents(deliveryEvents);

  // Transactional delivery status is customer-critical; update those exact
  // purchase rows as well. Commercial scorecards read the batched event ledger.
  for (const event of deliveryEvents.filter((event) => purchaseMessageIds.has(event.providerMessageId))) {
    await updatePurchaseDeliveryFromProviderEvent(event.providerMessageId, event.eventType);
  }

  return {
    skipped: false,
    eligible: eligibleIds.size,
    matched: matched.size,
    persisted,
    requiresReadAccess: false,
    credentialSource: reconciliationKey ? 'dedicated_reconciliation_key' : 'send_key_with_read_access',
  };
}
