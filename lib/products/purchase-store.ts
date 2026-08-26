import { randomUUID } from 'crypto';
import { getGoogleSheetsClient } from '@/lib/google-sheets';

export interface PurchaseRecord {
  purchaseId: string;
  email: string;
  name: string;
  productId: string;
  amount: string;
  paypalOrderId: string;
  accessToken: string;
  profileData: string; // JSON string of { province, industry, revenue, goal }
  createdAt: string;
  status: string;
  landingPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  lastTouchPage?: string;
  lastTouchReferrer?: string;
  device?: string;
  browser?: string;
  country?: string;
  currency?: string;
  paypalCaptureId?: string;
  paymentStatus?: string;
  deliveryStatus?: string;
  deliveryProviderMessageId?: string;
}

const SHEET_TITLE = 'Product Purchases';

const PURCHASE_HEADERS = [
  'Purchase ID',
  'Email',
  'Name',
  'Product ID',
  'Amount',
  'PayPal Order ID',
  'Access Token',
  'Profile Data',
  'Created At',
  'Status',
  'Landing Page',
  'Referrer',
  'UTM Source',
  'UTM Medium',
  'UTM Campaign',
  'Last Touch Page',
  'Last Touch Referrer',
  'Device',
  'Browser',
  'Country',
  'Currency',
  'Provider Capture ID',
  'Payment Status',
  'Delivery Status',
  'Delivery Provider Message ID',
];

async function ensurePurchaseSheet(
  sheets: Awaited<ReturnType<typeof getGoogleSheetsClient>>,
  spreadsheetId: string
) {
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: 'sheets.properties.title',
  });

  const exists = spreadsheet.data.sheets?.some(
    (sheet: any) => sheet.properties?.title === SHEET_TITLE
  );

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: SHEET_TITLE,
              },
            },
          },
        ],
      },
    });
  }

  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_TITLE}!A1:Y1`,
  });

  const header = headerResponse.data.values?.[0] || [];
  if (header.join('|') !== PURCHASE_HEADERS.join('|')) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_TITLE}!A1:Y1`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [PURCHASE_HEADERS],
      },
    });
  }
}

export async function recordPurchase(data: {
  email: string;
  name: string;
  productId: string;
  amount: string;
  paypalOrderId: string;
  profileData: { province: string; industry: string; revenue: string; goal: string; company?: string; phone?: string };
  attribution?: {
    landingPage?: string;
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    lastTouchPage?: string;
    lastTouchReferrer?: string;
    device?: string;
    browser?: string;
    country?: string;
  };
  status?: string;
  currency?: string;
  paypalCaptureId?: string;
  paymentStatus?: string;
  deliveryStatus?: string;
  deliveryProviderMessageId?: string;
}): Promise<PurchaseRecord> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) throw new Error('GOOGLE_SHEET_ID environment variable is missing');

  const purchaseId = randomUUID();
  const accessToken = randomUUID();
  const createdAt = new Date().toISOString();
  const profileDataJson = JSON.stringify(data.profileData);
  const status = data.status || 'completed';

  const record: PurchaseRecord = {
    purchaseId,
    email: data.email,
    name: data.name,
    productId: data.productId,
    amount: data.amount,
    paypalOrderId: data.paypalOrderId,
    accessToken,
    profileData: profileDataJson,
    createdAt,
    status,
    landingPage: data.attribution?.landingPage || '',
    referrer: data.attribution?.referrer || '',
    utmSource: data.attribution?.utmSource || '',
    utmMedium: data.attribution?.utmMedium || '',
    utmCampaign: data.attribution?.utmCampaign || '',
    lastTouchPage: data.attribution?.lastTouchPage || '',
    lastTouchReferrer: data.attribution?.lastTouchReferrer || '',
    device: data.attribution?.device || '',
    browser: data.attribution?.browser || '',
    country: data.attribution?.country || '',
    currency: data.currency || 'USD',
    paypalCaptureId: data.paypalCaptureId || '',
    paymentStatus: data.paymentStatus || 'unverified',
    deliveryStatus: data.deliveryStatus || 'pending',
    deliveryProviderMessageId: data.deliveryProviderMessageId || '',
  };

  try {
    const sheets = await getGoogleSheetsClient();
    if (spreadsheetId) {
      await ensurePurchaseSheet(sheets, spreadsheetId);
      const row = [
        purchaseId,
        data.email,
        data.name,
        data.productId,
        data.amount,
        data.paypalOrderId,
        accessToken,
        profileDataJson,
        createdAt,
        status,
        data.attribution?.landingPage || '',
        data.attribution?.referrer || '',
        data.attribution?.utmSource || '',
        data.attribution?.utmMedium || '',
        data.attribution?.utmCampaign || '',
        data.attribution?.lastTouchPage || '',
        data.attribution?.lastTouchReferrer || '',
        data.attribution?.device || '',
        data.attribution?.browser || '',
        data.attribution?.country || '',
        data.currency || 'USD',
        data.paypalCaptureId || '',
        data.paymentStatus || 'unverified',
        data.deliveryStatus || 'pending',
        data.deliveryProviderMessageId || '',
      ];
      const appendResult = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${SHEET_TITLE}!A:Y`,
        valueInputOption: 'RAW',
        requestBody: { values: [row] },
      });
      if ((appendResult.data.updates?.updatedRows || 0) !== 1) {
        throw new Error('Purchase ledger write was not confirmed by Google Sheets.');
      }
      console.log(`✅ Product purchase recorded in Google Sheets: ${purchaseId} for ${data.email}`);
    }
  } catch (sheetErr: any) {
    console.error('❌ Google Sheets purchase-ledger write failed:', sheetErr?.message || sheetErr);
    throw new Error('Purchase could not be durably recorded. Fulfilment was not started.');
  }

  return record;
}

export async function getAllPurchases(options?: { strict?: boolean }): Promise<PurchaseRecord[]> {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID environment variable is missing');
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_TITLE}!A:Y`,
    });

    const rows = response.data.values || [];
    const results: PurchaseRecord[] = [];

    // Skip header row (index 0)
    for (let i = 1; i < rows.length; i++) {
      results.push(parseRow(rows[i]));
    }

    return results;
  } catch (error) {
    console.error('❌ Error reading all purchases:', error);
    if (options?.strict) throw error;
    return [];
  }
}

/** Records provider acceptance separately from actual email delivery. */
export async function updatePurchaseDeliveryStatus(
  purchaseId: string,
  deliveryStatus: string,
  providerMessageId = ''
): Promise<void> {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) throw new Error('GOOGLE_SHEET_ID environment variable is missing');

  await ensurePurchaseSheet(sheets, spreadsheetId);
  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_TITLE}!A2:Y` });
  const rows = response.data.values || [];
  const dataIndex = rows.findIndex((row) => row[0] === purchaseId);
  if (dataIndex < 0) throw new Error(`Purchase ${purchaseId} was not found in the ledger.`);

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_TITLE}!X${dataIndex + 2}:Y${dataIndex + 2}`,
    valueInputOption: 'RAW',
    requestBody: { values: [[deliveryStatus, providerMessageId]] },
  });
}

export async function updatePurchaseDeliveryFromProviderEvent(
  providerMessageId: string,
  eventType: string
) {
  if (!providerMessageId) return { updated: false };
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) throw new Error('GOOGLE_SHEET_ID environment variable is missing');
  await ensurePurchaseSheet(sheets, spreadsheetId);
  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_TITLE}!A2:Y` });
  const rows = response.data.values || [];
  const index = rows.findIndex((row) => row[24] === providerMessageId);
  if (index < 0) return { updated: false };
  const statusByEvent: Record<string, string> = {
    'email.delivered': 'delivered',
    'email.bounced': 'bounced',
    'email.complained': 'complained',
  };
  const status = statusByEvent[eventType];
  if (!status) return { updated: false };
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_TITLE}!X${index + 2}`,
    valueInputOption: 'RAW',
    requestBody: { values: [[status]] },
  });
  return { updated: true };
}

export async function getPurchaseByToken(token: string): Promise<PurchaseRecord | null> {
  const normalizedToken = String(token || '').trim().toLowerCase();

  // 1. Check Google Sheets 'Product Purchases' table
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (spreadsheetId) {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${SHEET_TITLE}!A:Y`,
      });

      const rows = response.data.values || [];
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (String(row[6] || '').trim().toLowerCase() === normalizedToken) {
          return parseRow(row);
        }
      }
    }
  } catch (error) {
    console.error('❌ Error reading purchase by token from Sheets:', error);
  }

  return null;
}

export async function getPurchasesByEmail(email: string): Promise<PurchaseRecord[]> {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID environment variable is missing');
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_TITLE}!A:T`,
    });

    const rows = response.data.values || [];
    const results: PurchaseRecord[] = [];

    // Skip header row (index 0)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row[1]?.toLowerCase() === email.toLowerCase()) {
        results.push(parseRow(row));
      }
    }

    return results;
  } catch (error) {
    console.error('❌ Error reading purchases by email:', error);
    return [];
  }
}

/** Revokes product access before an external refund is initiated. */
export async function updatePurchaseStatusByOrder(orderId: string, status: string) {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) throw new Error('GOOGLE_SHEET_ID environment variable is missing');

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_TITLE}!A2:T`,
  });
  const rows = response.data.values || [];
  const matches: PurchaseRecord[] = [];
  for (let index = 0; index < rows.length; index++) {
    if (rows[index][5] !== orderId) continue;
    rows[index][9] = status;
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_TITLE}!J${index + 2}`,
      valueInputOption: 'RAW',
      requestBody: { values: [[status]] },
    });
    matches.push(parseRow(rows[index]));
  }
  return matches;
}

function parseRow(row: string[]): PurchaseRecord {
  return {
    purchaseId: row[0] || '',
    email: row[1] || '',
    name: row[2] || '',
    productId: row[3] || '',
    amount: row[4] || '',
    paypalOrderId: row[5] || '',
    accessToken: row[6] || '',
    profileData: row[7] || '{}',
    createdAt: row[8] || '',
    status: row[9] || '',
    landingPage: row[10] || '',
    referrer: row[11] || '',
    utmSource: row[12] || '',
    utmMedium: row[13] || '',
    utmCampaign: row[14] || '',
    lastTouchPage: row[15] || '',
    lastTouchReferrer: row[16] || '',
    device: row[17] || '',
    browser: row[18] || '',
    country: row[19] || '',
    currency: row[20] || '',
    paypalCaptureId: row[21] || '',
    paymentStatus: row[22] || '',
    deliveryStatus: row[23] || '',
    deliveryProviderMessageId: row[24] || '',
  };
}
