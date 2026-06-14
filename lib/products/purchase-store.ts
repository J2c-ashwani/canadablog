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
    range: `${SHEET_TITLE}!A1:J1`,
  });

  const header = headerResponse.data.values?.[0] || [];
  if (header.join('|') !== PURCHASE_HEADERS.join('|')) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_TITLE}!A1:J1`,
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
  profileData: { province: string; industry: string; revenue: string; goal: string };
}): Promise<PurchaseRecord> {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID environment variable is missing');
  }

  await ensurePurchaseSheet(sheets, spreadsheetId);

  const purchaseId = randomUUID();
  const accessToken = randomUUID();
  const createdAt = new Date().toISOString();
  const profileDataJson = JSON.stringify(data.profileData);
  const status = 'completed';

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
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_TITLE}!A:J`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [row],
    },
  });

  console.log(`✅ Product purchase recorded: ${purchaseId} for ${data.email}`);

  return {
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
  };
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
      range: `${SHEET_TITLE}!A:J`,
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
      range: `${SHEET_TITLE}!A:J`,
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
  };
}
