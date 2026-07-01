import { getGoogleSheetsClient } from '@/lib/google-sheets';

export interface TelemetryEvent {
  timestamp: string;
  eventName: string;
  sessionId: string;
  pagePath: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  productId: string;
  revenue: string;
  trafficQualityScore?: string;
  trafficQualityClassification?: string;
  timezone?: string;
  language?: string;
}

const SHEET_TITLE = 'Funnel Events';

const TELEMETRY_HEADERS = [
  'Timestamp',
  'Event Name',
  'Session ID',
  'Page Path',
  'Referrer',
  'UTM Source',
  'UTM Medium',
  'UTM Campaign',
  'Product ID',
  'Revenue',
  'Traffic Quality Score',
  'Traffic Quality Classification',
  'Timezone',
  'Language',
];

async function ensureTelemetrySheet(
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
    range: `${SHEET_TITLE}!A1:N1`,
  });

  const header = headerResponse.data.values?.[0] || [];
  if (header.join('|') !== TELEMETRY_HEADERS.join('|')) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_TITLE}!A1:N1`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [TELEMETRY_HEADERS],
      },
    });
  }
}

export async function recordTelemetryEvent(data: {
  eventName: string;
  sessionId: string;
  pagePath: string;
  referrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  productId?: string;
  revenue?: string;
  trafficQualityScore?: string | number;
  trafficQualityClassification?: string;
  timezone?: string;
  language?: string;
}): Promise<void> {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID environment variable is missing');
  }

  await ensureTelemetrySheet(sheets, spreadsheetId);

  const timestamp = new Date().toISOString();
  const row = [
    timestamp,
    data.eventName,
    data.sessionId,
    data.pagePath || '',
    data.referrer || '',
    data.utmSource || '',
    data.utmMedium || '',
    data.utmCampaign || '',
    data.productId || '',
    data.revenue || '',
    data.trafficQualityScore !== undefined ? String(data.trafficQualityScore) : '',
    data.trafficQualityClassification || '',
    data.timezone || '',
    data.language || '',
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_TITLE}!A:N`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [row],
    },
  });

  console.log(`📊 Telemetry logged: ${data.eventName} (session: ${data.sessionId}, quality: ${data.trafficQualityClassification})`);
}

export async function getTelemetryEvents(): Promise<TelemetryEvent[]> {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID environment variable is missing');
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_TITLE}!A:N`,
    });

    const rows = response.data.values || [];
    const results: TelemetryEvent[] = [];

    // Skip header row
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      results.push({
        timestamp: row[0] || '',
        eventName: row[1] || '',
        sessionId: row[2] || '',
        pagePath: row[3] || '',
        referrer: row[4] || '',
        utmSource: row[5] || '',
        utmMedium: row[6] || '',
        utmCampaign: row[7] || '',
        productId: row[8] || '',
        revenue: row[9] || '',
        trafficQualityScore: row[10] || '',
        trafficQualityClassification: row[11] || '',
        timezone: row[12] || '',
        language: row[13] || '',
      });
    }

    return results;
  } catch (error) {
    console.error('❌ Error reading telemetry events:', error);
    return [];
  }
}
