import crypto from 'crypto';
import { getGoogleSheetsClient } from '@/lib/google-sheets';

export type PaymentIntentStatus = 'created' | 'completed' | 'refunded' | 'failed';

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
}

const SHEET_TITLE = 'Payment Intents';
const HEADERS = [
  'Intent ID', 'PayPal Order ID', 'Email', 'Name', 'Product ID', 'Addons',
  'Expected Amount', 'Currency', 'Profile Data', 'Attribution', 'Session ID',
  'Status', 'Created At', 'Completed At',
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
    range: `${SHEET_TITLE}!A1:N1`,
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
    range: `${SHEET_TITLE}!A:N`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [[
      intent.intentId, intent.paypalOrderId, intent.email.trim().toLowerCase(), intent.name,
      intent.productId, JSON.stringify(intent.addons), intent.expectedAmount, intent.currency,
      JSON.stringify(intent.profileData), JSON.stringify(intent.attribution), intent.sessionId,
      intent.status, intent.createdAt, intent.completedAt || '',
    ]] },
  });
}

async function findIntent(intentId: string) {
  const { sheets, spreadsheetId } = await ensureSheet();
  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_TITLE}!A2:N` });
  const rows = response.data.values || [];
  const rowIndex = rows.findIndex((row) => row[0] === intentId);
  if (rowIndex < 0) return null;
  return { intent: parseRow(rows[rowIndex]), row: rowIndex + 2, sheets, spreadsheetId };
}

export async function getProductPaymentIntent(intentId: string) {
  const found = await findIntent(intentId);
  return found?.intent || null;
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
