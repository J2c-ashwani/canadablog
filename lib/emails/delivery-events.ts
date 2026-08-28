import { createHmac, timingSafeEqual } from 'crypto';
import { getGoogleSheetsClient } from '@/lib/google-sheets';

const SHEET_TITLE = 'Email Events';
const HEADERS = [
  'Event ID',
  'Provider',
  'Provider Message ID',
  'Event Type',
  'Recipient',
  'Occurred At',
  'Received At',
];

export type DeliveryEvent = {
  eventId: string;
  provider: 'resend';
  providerMessageId: string;
  eventType: string;
  recipient: string;
  occurredAt: string;
};

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

/** Verifies the standard Svix signature used by Resend webhooks. */
export function verifyResendWebhook(headers: Headers, rawBody: string): boolean {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return false;

  const id = headers.get('svix-id') || '';
  const timestamp = headers.get('svix-timestamp') || '';
  const signatureHeader = headers.get('svix-signature') || '';
  if (!id || !timestamp || !signatureHeader) return false;
  const timestampSeconds = Number(timestamp);
  if (!Number.isFinite(timestampSeconds) || Math.abs(Date.now() / 1000 - timestampSeconds) > 5 * 60) return false;

  const encodedSecret = secret.startsWith('whsec_') ? secret.slice('whsec_'.length) : secret;
  let signingKey: Buffer;
  try {
    signingKey = Buffer.from(encodedSecret, 'base64');
  } catch {
    return false;
  }
  const expected = createHmac('sha256', signingKey)
    .update(`${id}.${timestamp}.${rawBody}`)
    .digest('base64');

  return signatureHeader.split(' ').some((part) => {
    const [, signature] = part.split(',');
    return Boolean(signature) && safeEqual(signature, expected);
  });
}

export function normalizeResendDeliveryEvent(payload: any): DeliveryEvent | null {
  const data = payload?.data || {};
  const eventType = String(payload?.type || '');
  const eventId = String(payload?.created_at || data?.id || `${eventType}:${data?.email_id || ''}`);
  const recipientValue = Array.isArray(data?.to) ? data.to[0] : data?.to;
  const recipient = typeof recipientValue === 'string' ? recipientValue.toLowerCase() : '';
  const providerMessageId = String(data?.email_id || data?.id || '');
  if (!eventType || !providerMessageId) return null;

  return {
    eventId,
    provider: 'resend',
    providerMessageId,
    eventType,
    recipient,
    occurredAt: String(data?.created_at || payload?.created_at || new Date().toISOString()),
  };
}

async function ensureEmailEventsSheet(sheets: Awaited<ReturnType<typeof getGoogleSheetsClient>>, spreadsheetId: string) {
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId, fields: 'sheets.properties.title' });
  const exists = spreadsheet.data.sheets?.some((sheet: any) => sheet.properties?.title === SHEET_TITLE);
  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: SHEET_TITLE } } }] },
    });
  }
  const current = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_TITLE}!A1:G1` });
  if ((current.data.values?.[0] || []).join('|') !== HEADERS.join('|')) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_TITLE}!A1:G1`,
      valueInputOption: 'RAW',
      requestBody: { values: [HEADERS] },
    });
  }
}

/** Appends an external provider event; a successful HTTP webhook is not enough. */
export async function persistDeliveryEvent(event: DeliveryEvent): Promise<void> {
  await persistDeliveryEvents([event]);
}

/** Persists a provider-authenticated batch with one dedupe read and one append. */
export async function persistDeliveryEvents(events: DeliveryEvent[]): Promise<number> {
  if (events.length === 0) return 0;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) throw new Error('GOOGLE_SHEET_ID environment variable is missing');
  const sheets = await getGoogleSheetsClient();
  await ensureEmailEventsSheet(sheets, spreadsheetId);

  const existing = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_TITLE}!A2:A` });
  const existingIds = new Set((existing.data.values || []).map((row) => String(row[0] || '')).filter(Boolean));
  const pending = Array.from(new Map(events
    .filter((event) => event.eventId && !existingIds.has(event.eventId))
    .map((event) => [event.eventId, event])).values());
  if (pending.length === 0) return 0;

  const result = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_TITLE}!A:G`,
    valueInputOption: 'RAW',
    requestBody: { values: pending.map((event) => [
      event.eventId,
      event.provider,
      event.providerMessageId,
      event.eventType,
      event.recipient,
      event.occurredAt,
      new Date().toISOString(),
    ]) },
  });
  if ((result.data.updates?.updatedRows || 0) !== pending.length) {
    throw new Error('Email-event write was not confirmed by Google Sheets.');
  }
  return pending.length;
}
