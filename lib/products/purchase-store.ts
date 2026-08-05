import { randomUUID } from 'crypto';
import { getGoogleSheetsClient } from '@/lib/google-sheets';
import fs from 'fs';
import path from 'path';

const FAILED_LOG_PATH = path.join(process.cwd(), 'lib/data/failed-purchases.json');

function logFailedPurchase(record: any) {
  try {
    const logDir = path.dirname(FAILED_LOG_PATH);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    let logs: any[] = [];
    if (fs.existsSync(FAILED_LOG_PATH)) {
      try {
        const fileContent = fs.readFileSync(FAILED_LOG_PATH, 'utf8');
        logs = JSON.parse(fileContent);
      } catch (e) {
        console.error('Failed to parse existing failed-purchases.json, starting fresh:', e);
      }
    }

    logs.push(record);
    fs.writeFileSync(FAILED_LOG_PATH, JSON.stringify(logs, null, 2), 'utf8');
    console.log(`💾 Failed purchase backed up locally at ${FAILED_LOG_PATH}`);
  } catch (err) {
    console.error('❌ Failed to write backup log of failed purchase:', err);
  }
}

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
    range: `${SHEET_TITLE}!A1:T1`,
  });

  const header = headerResponse.data.values?.[0] || [];
  if (header.join('|') !== PURCHASE_HEADERS.join('|')) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_TITLE}!A1:T1`,
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
}): Promise<PurchaseRecord> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '1GAt0DTPzPAQXI9j4JwtlFLhLw4fTzf2XmMHttytu9To';

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
      ];
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${SHEET_TITLE}!A:T`,
        valueInputOption: 'RAW',
        requestBody: { values: [row] },
      });
      console.log(`✅ Product purchase recorded in Google Sheets: ${purchaseId} for ${data.email}`);
    }
  } catch (sheetErr: any) {
    console.error('⚠️ Google Sheets recording failed (non-blocking backup active):', sheetErr?.message || sheetErr);
    logFailedPurchase(record);
  }

  return record;
}

export async function getAllPurchases(): Promise<PurchaseRecord[]> {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

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
      results.push(parseRow(rows[i]));
    }

    return results;
  } catch (error) {
    console.error('❌ Error reading all purchases:', error);
    return [];
  }
}

export async function getPurchaseByToken(token: string): Promise<PurchaseRecord | null> {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID environment variable is missing');
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_TITLE}!A:T`,
    });

    const rows = response.data.values || [];

    // Skip header row (index 0), search remaining rows
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row[6] === token) {
        return parseRow(row);
      }
    }

    return null;
  } catch (error) {
    console.error('❌ Error reading purchase by token:', error);
    return null;
  }
}

export async function getPurchasesByEmail(email: string): Promise<PurchaseRecord[]> {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

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
  };
}
