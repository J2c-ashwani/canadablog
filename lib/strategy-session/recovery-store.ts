import { getGoogleSheetsClient } from '@/lib/google-sheets';

export type StrategyRecoveryStatus = 'shown' | 'abandoned' | 'paid' | 'unsubscribed';
export type StrategyRecoveryEvent = 'shown' | 'abandoned' | 'paid';
export type StrategyRecoveryEmailStage = 'initial' | 'value_24h' | 'objection_3d' | 'final_7d';

export type StrategyRecoveryRecord = {
  rowNumber: number;
  recoveryId: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  source: string;
  status: StrategyRecoveryStatus;
  reason: string;
  initialEmailSentAt: string;
  followUp24hSentAt: string;
  objection3dSentAt: string;
  final7dSentAt: string;
  paidAt: string;
  paypalOrderId: string;
  lastEmailStage: string;
  pagePath: string;
  userAgent: string;
  rawSummary: string;
};

type RecoveryEventInput = {
  event: StrategyRecoveryEvent;
  recoveryId: string;
  email?: string;
  name?: string;
  source?: string;
  reason?: string;
  pagePath?: string;
  userAgent?: string;
  paypalOrderId?: string;
  rawSummary?: string;
};

const SHEET_TITLE = 'Strategy Session Recovery';
const HEADERS = [
  'Recovery ID',
  'Created At',
  'Updated At',
  'Email',
  'Name',
  'Source',
  'Status',
  'Reason',
  'Initial Email Sent At',
  'Follow Up 24h Sent At',
  'Objection 3d Sent At',
  'Final 7d Sent At',
  'Paid At',
  'PayPal Order ID',
  'Last Email Stage',
  'Page Path',
  'User Agent',
  'Raw Summary',
];

function sheetRange(range: string) {
  return `'${SHEET_TITLE}'!${range}`;
}

function nowIso() {
  return new Date().toISOString();
}

function recordToRow(record: Omit<StrategyRecoveryRecord, 'rowNumber'>) {
  return [
    record.recoveryId,
    record.createdAt,
    record.updatedAt,
    record.email,
    record.name,
    record.source,
    record.status,
    record.reason,
    record.initialEmailSentAt,
    record.followUp24hSentAt,
    record.objection3dSentAt,
    record.final7dSentAt,
    record.paidAt,
    record.paypalOrderId,
    record.lastEmailStage,
    record.pagePath,
    record.userAgent,
    record.rawSummary,
  ];
}

function rowToRecord(row: string[], index: number): StrategyRecoveryRecord {
  return {
    rowNumber: index + 1,
    recoveryId: row[0] || '',
    createdAt: row[1] || '',
    updatedAt: row[2] || '',
    email: row[3] || '',
    name: row[4] || '',
    source: row[5] || '',
    status: ((row[6] || 'shown') as StrategyRecoveryStatus),
    reason: row[7] || '',
    initialEmailSentAt: row[8] || '',
    followUp24hSentAt: row[9] || '',
    objection3dSentAt: row[10] || '',
    final7dSentAt: row[11] || '',
    paidAt: row[12] || '',
    paypalOrderId: row[13] || '',
    lastEmailStage: row[14] || '',
    pagePath: row[15] || '',
    userAgent: row[16] || '',
    rawSummary: row[17] || '',
  };
}

async function ensureRecoverySheet() {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: 'sheets.properties.title',
  });

  const exists = spreadsheet.data.sheets?.some((sheet) => sheet.properties?.title === SHEET_TITLE);

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
    range: sheetRange('A1:R1'),
  });

  const header = headerResponse.data.values?.[0] || [];
  if (header.join('|') !== HEADERS.join('|')) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: sheetRange('A1:R1'),
      valueInputOption: 'RAW',
      requestBody: {
        values: [HEADERS],
      },
    });
  }

  return { sheets, spreadsheetId };
}

export async function getStrategyRecoveryRecords() {
  const { sheets, spreadsheetId } = await ensureRecoverySheet();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: sheetRange('A:R'),
  });

  const rows = response.data.values || [];
  return rows
    .slice(1)
    .map((row, index) => rowToRecord(row as string[], index + 1))
    .filter((record) => record.recoveryId);
}

export async function upsertStrategyRecoveryEvent(input: RecoveryEventInput) {
  const recoveryId = input.recoveryId.trim();
  if (!recoveryId) {
    throw new Error('Recovery ID is required.');
  }

  const { sheets, spreadsheetId } = await ensureRecoverySheet();
  const records = await getStrategyRecoveryRecords();
  const existing = records.find((record) => record.recoveryId === recoveryId);
  const now = nowIso();

  const base = existing || {
    recoveryId,
    createdAt: now,
    updatedAt: now,
    email: '',
    name: '',
    source: '',
    status: 'shown' as StrategyRecoveryStatus,
    reason: '',
    initialEmailSentAt: '',
    followUp24hSentAt: '',
    objection3dSentAt: '',
    final7dSentAt: '',
    paidAt: '',
    paypalOrderId: '',
    lastEmailStage: '',
    pagePath: '',
    userAgent: '',
    rawSummary: '',
  };

  const next: Omit<StrategyRecoveryRecord, 'rowNumber'> = {
    ...base,
    updatedAt: now,
    email: input.email || base.email,
    name: input.name || base.name,
    source: input.source || base.source,
    reason: input.reason || base.reason,
    pagePath: input.pagePath || base.pagePath,
    userAgent: input.userAgent || base.userAgent,
    rawSummary: input.rawSummary || base.rawSummary,
  };

  if (input.event === 'abandoned' && base.status !== 'paid') {
    next.status = 'abandoned';
  }

  if (input.event === 'paid') {
    next.status = 'paid';
    next.paidAt = base.paidAt || now;
    next.paypalOrderId = input.paypalOrderId || base.paypalOrderId;
  }

  if (existing) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: sheetRange(`A${existing.rowNumber}:R${existing.rowNumber}`),
      valueInputOption: 'RAW',
      requestBody: {
        values: [recordToRow(next)],
      },
    });

    return { success: true, record: { ...next, rowNumber: existing.rowNumber } };
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: sheetRange('A:R'),
    valueInputOption: 'RAW',
    requestBody: {
      values: [recordToRow(next)],
    },
  });

  return { success: true, record: { ...next, rowNumber: 0 } };
}

export async function markStrategyRecoveryEmailSent(record: StrategyRecoveryRecord, stage: StrategyRecoveryEmailStage) {
  const { sheets, spreadsheetId } = await ensureRecoverySheet();
  const now = nowIso();
  const next: Omit<StrategyRecoveryRecord, 'rowNumber'> = {
    ...record,
    updatedAt: now,
    lastEmailStage: stage,
    initialEmailSentAt: stage === 'initial' ? now : record.initialEmailSentAt,
    followUp24hSentAt: stage === 'value_24h' ? now : record.followUp24hSentAt,
    objection3dSentAt: stage === 'objection_3d' ? now : record.objection3dSentAt,
    final7dSentAt: stage === 'final_7d' ? now : record.final7dSentAt,
  };

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: sheetRange(`A${record.rowNumber}:R${record.rowNumber}`),
    valueInputOption: 'RAW',
    requestBody: {
      values: [recordToRow(next)],
    },
  });

  return { success: true, record: { ...next, rowNumber: record.rowNumber } };
}
