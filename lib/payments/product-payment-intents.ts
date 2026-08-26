import crypto from 'crypto';
import { getGoogleSheetsClient } from '@/lib/google-sheets';

export type PaymentIntentStatus = 'created' | 'captured' | 'completed' | 'refunded' | 'failed';

export interface ProductPaymentIntent {
  intentId: string;
  paypalOrderId: string;
  email: string;
  name: string;
  productId: string;
  addons: Record<string, boolean>;
  expectedAmount: string;
  currency: string;
  profileData: Record<string, unknown>;
  attribution: Record<string, unknown>;
  sessionId: string;
  status: PaymentIntentStatus;
  createdAt: string;
  completedAt?: string;
  captureId?: string;
  captureStatus?: string;
  captureVerifiedAt?: string;
  purchaseId?: string;
  entitlementStatus?: string;
  deliveryStatus?: string;
}

const SHEET_TITLE = 'Payment Intents';
const HEADERS = [
  'Intent ID', 'PayPal Order ID', 'Email', 'Name', 'Product ID', 'Addons',
  'Expected Amount', 'Currency', 'Profile Data', 'Attribution', 'Session ID',
  'Status', 'Created At', 'Completed At', 'PayPal Capture ID', 'Capture Status',
  'Capture Verified At', 'Purchase ID', 'Entitlement Status', 'Delivery Status',
];

function parseJson(value: string | undefined) {
  try { return JSON.parse(value || '{}'); } catch { return {}; }
}

function parseRow(row: string[]): ProductPaymentIntent {
  return {
    intentId: row[0] || '',
    paypalOrderId: row[1] || '',
    email: row[2] || '',
    name: row[3] || '',
    productId: row[4] || '',
    addons: parseJson(row[5]),
    expectedAmount: row[6] || '',
    currency: row[7] || 'USD',
    profileData: parseJson(row[8]),
    attribution: parseJson(row[9]),
    sessionId: row[10] || 'sess_anonymous',
    status: (row[11] || 'failed') as PaymentIntentStatus,
    createdAt: row[12] || '',
    completedAt: row[13] || undefined,
    captureId: row[14] || undefined,
    captureStatus: row[15] || undefined,
    captureVerifiedAt: row[16] || undefined,
    purchaseId: row[17] || undefined,
    entitlementStatus: row[18] || undefined,
    deliveryStatus: row[19] || undefined,
  };
}

async function getSheetContext() {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) throw new Error('GOOGLE_SHEET_ID environment variable is missing');
  return { sheets, spreadsheetId };
}

async function ensureSheet() {
  const { sheets, spreadsheetId } = await getSheetContext();
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId, fields: 'sheets.properties.title' });
  const exists = spreadsheet.data.sheets?.some((sheet: any) => sheet.properties?.title === SHEET_TITLE);
  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: SHEET_TITLE } } }] },
    });
  }
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_TITLE}!A1:T1`,
    valueInputOption: 'RAW',
    requestBody: { values: [HEADERS] },
  });
  return { sheets, spreadsheetId };
}

export function newProductPaymentIntent(input: Omit<ProductPaymentIntent, 'intentId' | 'paypalOrderId' | 'status' | 'createdAt'>) {
  return {
    ...input,
    intentId: crypto.randomUUID(),
    paypalOrderId: '',
    status: 'created' as const,
    createdAt: new Date().toISOString(),
  };
}

export async function saveProductPaymentIntent(intent: ProductPaymentIntent) {
  const { sheets, spreadsheetId } = await ensureSheet();
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_TITLE}!A:T`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [[
      intent.intentId, intent.paypalOrderId, intent.email.trim().toLowerCase(), intent.name,
      intent.productId, JSON.stringify(intent.addons), intent.expectedAmount, intent.currency,
      JSON.stringify(intent.profileData), JSON.stringify(intent.attribution), intent.sessionId,
      intent.status, intent.createdAt, intent.completedAt || '', intent.captureId || '',
      intent.captureStatus || '', intent.captureVerifiedAt || '', intent.purchaseId || '',
      intent.entitlementStatus || '', intent.deliveryStatus || '',
    ]] },
  });
}

async function findIntent(intentIdOrOrderId: string) {
  const { sheets, spreadsheetId } = await ensureSheet();
  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_TITLE}!A2:T` });
  const rows = response.data.values || [];
  // Match by Intent ID (column A / index 0) or PayPal Order ID (column B / index 1)
  const rowIndex = rows.findIndex((row) => row[0] === intentIdOrOrderId || row[1] === intentIdOrOrderId);
  if (rowIndex < 0) return null;
  return { intent: parseRow(rows[rowIndex]), row: rowIndex + 2, sheets, spreadsheetId };
}

export async function getProductPaymentIntent(intentIdOrOrderId: string) {
  const found = await findIntent(intentIdOrOrderId);
  return found?.intent || null;
}

export async function getAllProductPaymentIntents(): Promise<ProductPaymentIntent[]> {
  const { sheets, spreadsheetId } = await ensureSheet();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_TITLE}!A2:T`,
  });
  return (response.data.values || []).map((row) => parseRow(row as string[]));
}

export async function attachPayPalOrderToIntent(intentId: string, paypalOrderId: string) {
  const found = await findIntent(intentId);
  if (!found) throw new Error('Payment intent not found');
  if (found.intent.status !== 'created' || found.intent.paypalOrderId) throw new Error('Payment intent is not available');
  await found.sheets.spreadsheets.values.update({
    spreadsheetId: found.spreadsheetId,
    range: `${SHEET_TITLE}!B${found.row}`,
    valueInputOption: 'RAW',
    requestBody: { values: [[paypalOrderId]] },
  });
}

export async function markProductPaymentIntentCompleted(intentId: string) {
  const found = await findIntent(intentId);
  if (!found) throw new Error('Payment intent not found');
  if (found.intent.status === 'completed') return found.intent;
  if (found.intent.status !== 'created') throw new Error(`Payment intent is ${found.intent.status}`);
  const completedAt = new Date().toISOString();
  await found.sheets.spreadsheets.values.update({
    spreadsheetId: found.spreadsheetId,
    range: `${SHEET_TITLE}!L${found.row}:N${found.row}`,
    valueInputOption: 'RAW',
    requestBody: { values: [['completed', found.intent.createdAt, completedAt]] },
  });
  return { ...found.intent, status: 'completed' as const, completedAt };
}

/** Persist an independently verified provider capture before any entitlement is created. */
export async function recordProductPaymentCapture(intentId: string, captureId: string) {
  const found = await findIntent(intentId);
  if (!found) throw new Error('Payment intent not found');
  if (found.intent.status === 'completed') return found.intent;
  if (found.intent.status !== 'created' && found.intent.status !== 'captured') {
    throw new Error(`Payment intent is ${found.intent.status}`);
  }

  const verifiedAt = new Date().toISOString();
  await found.sheets.spreadsheets.values.update({
    spreadsheetId: found.spreadsheetId,
    range: `${SHEET_TITLE}!L${found.row}:T${found.row}`,
    valueInputOption: 'RAW',
    requestBody: { values: [[
      'captured', found.intent.createdAt, '', captureId, 'COMPLETED', verifiedAt,
      found.intent.purchaseId || '', found.intent.entitlementStatus || '', 'pending',
    ]] },
  });
  return { ...found.intent, status: 'captured' as const, captureId, captureStatus: 'COMPLETED', captureVerifiedAt: verifiedAt, deliveryStatus: 'pending' };
}

/** Mark fulfilment only after the ledger row and entitlement have both been written. */
export async function markProductPaymentIntentFulfilled(
  intentId: string,
  purchaseId: string,
  deliveryStatus: string
) {
  const found = await findIntent(intentId);
  if (!found) throw new Error('Payment intent not found');
  if (found.intent.status !== 'captured' && found.intent.status !== 'completed') {
    throw new Error(`Payment intent is ${found.intent.status}; provider capture is required before fulfilment.`);
  }
  const completedAt = new Date().toISOString();
  await found.sheets.spreadsheets.values.update({
    spreadsheetId: found.spreadsheetId,
    range: `${SHEET_TITLE}!L${found.row}:T${found.row}`,
    valueInputOption: 'RAW',
    requestBody: { values: [[
      'completed', found.intent.createdAt, completedAt, found.intent.captureId || '',
      found.intent.captureStatus || 'COMPLETED', found.intent.captureVerifiedAt || completedAt,
      purchaseId, 'created', deliveryStatus,
    ]] },
  });
  return { ...found.intent, status: 'completed' as const, completedAt, purchaseId, entitlementStatus: 'created', deliveryStatus };
}

export async function markProductPaymentIntentRefunded(intentId: string) {
  const found = await findIntent(intentId);
  if (!found) throw new Error('Payment intent not found');
  await found.sheets.spreadsheets.values.update({
    spreadsheetId: found.spreadsheetId,
    range: `${SHEET_TITLE}!L${found.row}`,
    valueInputOption: 'RAW',
    requestBody: { values: [['refunded']] },
  });
}
