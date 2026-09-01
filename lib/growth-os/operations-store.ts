import { randomUUID } from 'crypto';
import {
  getCachedSheetValues,
  getGoogleSheetsClient,
  invalidateCachedSheetValues,
} from '@/lib/google-sheets';
import {
  acquireRedisOperationLease,
  finishRedisOperationLease,
  getRedisOperationRunRows,
  hasOperationalRedis,
} from '@/lib/growth-os/redis-operations';

type SheetContext = {
  sheets: Awaited<ReturnType<typeof getGoogleSheetsClient>>;
  spreadsheetId: string;
};

export interface OperationLease {
  acquired: boolean;
  operation: string;
  attemptId: string;
  startedAt: string;
  rowNumber?: number;
  backend?: 'redis' | 'sheets';
  reason?: string;
}

const ensuredSheets = new Set<string>();
const ensurePromises = new Map<string, Promise<void>>();
const sheetTitlePromises = new Map<string, { expiresAt: number; promise: Promise<Set<string>> }>();

function quoteSheetTitle(title: string) {
  return `'${title.replace(/'/g, "''")}'`;
}

async function getContext(): Promise<SheetContext> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) throw new Error('GOOGLE_SHEET_ID environment variable is missing');
  return { sheets: await getGoogleSheetsClient(), spreadsheetId };
}

async function getKnownSheetTitles(context: SheetContext): Promise<Set<string>> {
  const cached = sheetTitlePromises.get(context.spreadsheetId);
  if (cached && cached.expiresAt > Date.now()) return cached.promise;
  const promise = context.sheets.spreadsheets.get({
    spreadsheetId: context.spreadsheetId,
    fields: 'sheets.properties.title',
  }).then((spreadsheet) => new Set(
    (spreadsheet.data.sheets || [])
      .map((sheet: any) => String(sheet.properties?.title || ''))
      .filter(Boolean)
  ));
  sheetTitlePromises.set(context.spreadsheetId, { expiresAt: Date.now() + 60_000, promise });
  try {
    return await promise;
  } catch (error) {
    sheetTitlePromises.delete(context.spreadsheetId);
    throw error;
  }
}

export async function ensureOperationalSheet(title: string, headers: string[]): Promise<SheetContext> {
  const context = await getContext();
  const cacheKey = `${context.spreadsheetId}:${title}:${headers.join('|')}`;
  if (ensuredSheets.has(cacheKey)) return context;
  let pending = ensurePromises.get(cacheKey);
  if (!pending) {
    pending = (async () => {
      const knownTitles = await getKnownSheetTitles(context);
      if (!knownTitles.has(title)) {
        await context.sheets.spreadsheets.batchUpdate({
          spreadsheetId: context.spreadsheetId,
          requestBody: { requests: [{ addSheet: { properties: { title } } }] },
        });
        knownTitles.add(title);
      }

      const rangeTitle = quoteSheetTitle(title);
      const current = await context.sheets.spreadsheets.values.get({
        spreadsheetId: context.spreadsheetId,
        range: `${rangeTitle}!1:1`,
      });
      if ((current.data.values?.[0] || []).join('|') !== headers.join('|')) {
        await context.sheets.spreadsheets.values.update({
          spreadsheetId: context.spreadsheetId,
          range: `${rangeTitle}!A1`,
          valueInputOption: 'RAW',
          requestBody: { values: [headers] },
        });
      }
      ensuredSheets.add(cacheKey);
    })();
    ensurePromises.set(cacheKey, pending);
  }
  try {
    await pending;
  } finally {
    ensurePromises.delete(cacheKey);
  }
  return context;
}

export async function appendOperationalRow(title: string, headers: string[], values: unknown[]) {
  const context = await ensureOperationalSheet(title, headers);
  const result = await context.sheets.spreadsheets.values.append({
    spreadsheetId: context.spreadsheetId,
    range: `${quoteSheetTitle(title)}!A:${columnName(headers.length)}`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [values.map((value) => value ?? '')] },
  });
  if ((result.data.updates?.updatedRows || 0) !== 1) {
    throw new Error(`Durable write to ${title} was not confirmed.`);
  }
  invalidateCachedSheetValues(title);
  const updatedRange = result.data.updates?.updatedRange || '';
  const rowNumber = Number(updatedRange.match(/![A-Z]+(\d+):/)?.[1] || 0);
  return { rowNumber, updatedRange };
}

export async function readOperationalRows(title: string, headers: string[]): Promise<string[][]> {
  await ensureOperationalSheet(title, headers);
  const sheetRows = await getCachedSheetValues(`${quoteSheetTitle(title)}!A2:${columnName(headers.length)}`);
  if (title !== 'GrowthOS Runs' || !hasOperationalRedis()) return sheetRows;
  const redisRows = await getRedisOperationRunRows();
  const merged = new Map<string, string[]>();
  for (const row of [...sheetRows, ...redisRows]) {
    if (row[0]) merged.set(row[0], row);
  }
  return [...merged.values()].sort((left, right) =>
    new Date(left[2] || '').getTime() - new Date(right[2] || '').getTime()
  );
}

export async function updateOperationalRow(
  title: string,
  headers: string[],
  rowNumber: number,
  values: unknown[]
) {
  if (rowNumber < 2) throw new Error(`Invalid ${title} row number.`);
  const context = await ensureOperationalSheet(title, headers);
  await context.sheets.spreadsheets.values.update({
    spreadsheetId: context.spreadsheetId,
    range: `${quoteSheetTitle(title)}!A${rowNumber}:${columnName(headers.length)}${rowNumber}`,
    valueInputOption: 'RAW',
    requestBody: { values: [values.map((value) => value ?? '')] },
  });
  invalidateCachedSheetValues(title);
}

const STATE_HEADERS = ['Key', 'JSON Value', 'Updated At'];

export async function getLatestOperationalState<T>(key: string): Promise<T | null> {
  const rows = await readOperationalRows('GrowthOS State', STATE_HEADERS);
  for (let index = rows.length - 1; index >= 0; index--) {
    if (rows[index][0] !== key) continue;
    try {
      return JSON.parse(rows[index][1] || 'null') as T;
    } catch {
      return null;
    }
  }
  return null;
}

export async function setOperationalState(key: string, value: unknown) {
  return appendOperationalRow('GrowthOS State', STATE_HEADERS, [
    key,
    JSON.stringify(value),
    new Date().toISOString(),
  ]);
}

const RUN_HEADERS = [
  'Attempt ID',
  'Operation',
  'Started At',
  'Status',
  'Completed At',
  'Summary',
];

/**
 * Google Sheets is the durable coordination point in production. Every caller
 * appends an attempt first, then the earliest attempt in the dedupe window owns
 * the lease. This prevents Vercel Cron and a legacy external scheduler from
 * executing the same commercial workflow seconds apart.
 */
export async function acquireOperationLease(
  operation: string,
  dedupeWindowMs = 10 * 60 * 1000
): Promise<OperationLease> {
  const attemptId = randomUUID();
  const startedAt = new Date().toISOString();
  if (hasOperationalRedis()) {
    const result = await acquireRedisOperationLease({
      attemptId,
      operation,
      startedAt,
      dedupeWindowMs,
    });
    return {
      acquired: result.acquired,
      operation,
      attemptId,
      startedAt,
      backend: 'redis',
      reason: result.acquired ? undefined : 'A recent execution already owns this operation lease.',
    };
  }
  const append = await appendOperationalRow('GrowthOS Runs', RUN_HEADERS, [
    attemptId,
    operation,
    startedAt,
    'STARTING',
    '',
    '',
  ]);
  const rows = await readOperationalRows('GrowthOS Runs', RUN_HEADERS);
  const cutoff = Date.now() - dedupeWindowMs;
  const contenders = rows
    .map((row, index) => ({ row, rowNumber: index + 2 }))
    .filter(({ row }) => {
      const started = new Date(row[2] || '').getTime();
      return row[1] === operation && Number.isFinite(started) && started >= cutoff && row[3] !== 'FAILED';
    })
    .sort((left, right) => {
      const timeDiff = new Date(left.row[2]).getTime() - new Date(right.row[2]).getTime();
      return timeDiff || left.rowNumber - right.rowNumber;
    });

  const owner = contenders[0];
  const acquired = owner?.row?.[0] === attemptId;
  await updateOperationalRow('GrowthOS Runs', RUN_HEADERS, append.rowNumber, [
    attemptId,
    operation,
    startedAt,
    acquired ? 'RUNNING' : 'SKIPPED_DUPLICATE',
    acquired ? '' : new Date().toISOString(),
    acquired ? '' : `Lease already owned by ${owner?.row?.[0] || 'another attempt'}`,
  ]);

  return {
    acquired,
    operation,
    attemptId,
    startedAt,
    rowNumber: append.rowNumber,
    backend: 'sheets',
    reason: acquired ? undefined : 'A recent execution already owns this operation lease.',
  };
}

export async function finishOperationLease(
  lease: OperationLease,
  status: 'SUCCEEDED' | 'PARTIAL' | 'FAILED',
  summary: unknown
) {
  const serializedSummary = typeof summary === 'string' ? summary : JSON.stringify(summary);
  if (lease.backend === 'redis') {
    await finishRedisOperationLease({
      attemptId: lease.attemptId,
      operation: lease.operation,
      startedAt: lease.startedAt,
      status,
      summary: serializedSummary,
    });
    return;
  }
  if (!lease.rowNumber) return;
  await updateOperationalRow('GrowthOS Runs', RUN_HEADERS, lease.rowNumber, [
    lease.attemptId,
    lease.operation,
    lease.startedAt,
    status,
    new Date().toISOString(),
    serializedSummary,
  ]);
}

function columnName(count: number) {
  let result = '';
  let value = Math.max(1, count);
  while (value > 0) {
    value--;
    result = String.fromCharCode(65 + (value % 26)) + result;
    value = Math.floor(value / 26);
  }
  return result;
}
