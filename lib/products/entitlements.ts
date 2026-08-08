import { getGoogleSheetsClient } from '@/lib/google-sheets';
import type { ProductId } from '@/lib/products/catalog';
import { randomUUID } from 'crypto';

// ═══════════════════════════════════════════════════════════════════
// MACHINE-READABLE TIER CAPABILITY CONFIGURATION
// Single source of truth for all product decision capabilities.
// UI rendering logic MUST use getTierCapabilities() — never inline
// product ID string comparisons.
// ═══════════════════════════════════════════════════════════════════

export type { TierCapability } from './tier-capabilities';
export { getTierCapabilities } from './tier-capabilities';


export type EntitlementCapability =
  | 'report'
  | 'action-plan'
  | 'toolkit'
  | 'approval-library'
  | 'strategy-audit-booking'
  | 'membership';

export type EntitlementStatus = 'active' | 'revoked';

export interface EntitlementRecord {
  entitlementId: string;
  purchaseId: string;
  email: string;
  capability: EntitlementCapability;
  sourceProductId: string;
  orderId: string;
  status: EntitlementStatus;
  createdAt: string;
  revokedAt?: string;
  revokeReason?: string;
}

const SHEET_TITLE = 'Entitlements';
const HEADERS = [
  'Entitlement ID',
  'Purchase ID',
  'Email',
  'Capability',
  'Source Product ID',
  'Order ID',
  'Status',
  'Created At',
  'Revoked At',
  'Revoke Reason',
];

const PRODUCT_ENTITLEMENTS: Record<string, EntitlementCapability[]> = {
  'funding-match-report': ['report'],
  'funding-roadmap': ['report', 'action-plan'],
  'funding-bundle': ['report', 'action-plan', 'toolkit'],
  'funding-toolkit': ['toolkit'],
  'funding-approval-library': ['approval-library'],
  'guide-companion-kit': ['approval-library'],
  'strategy-audit': ['report', 'strategy-audit-booking'],
  'strategy-vip': ['report', 'action-plan', 'strategy-audit-booking'],
  'portfolio-assessment': ['report'],
  'strategy-session': ['strategy-audit-booking'],
  'funding-membership': ['membership'],
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function parseRow(row: string[]): EntitlementRecord {
  return {
    entitlementId: row[0] || '',
    purchaseId: row[1] || '',
    email: row[2] || '',
    capability: row[3] as EntitlementCapability,
    sourceProductId: row[4] || '',
    orderId: row[5] || '',
    status: (row[6] || 'revoked') as EntitlementStatus,
    createdAt: row[7] || '',
    revokedAt: row[8] || undefined,
    revokeReason: row[9] || undefined,
  };
}

async function getSheetContext() {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) throw new Error('GOOGLE_SHEET_ID environment variable is missing');
  return { sheets, spreadsheetId };
}

async function ensureSheet() {
  const { sheets, spreadsheetId } = await getSheetContext();
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: 'sheets.properties.title',
  });
  const exists = spreadsheet.data.sheets?.some((sheet: any) => sheet.properties?.title === SHEET_TITLE);
  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: SHEET_TITLE } } }] },
    });
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_TITLE}!A1:J1`,
    valueInputOption: 'RAW',
    requestBody: { values: [HEADERS] },
  });
  return { sheets, spreadsheetId };
}

export function capabilitiesForProduct(productId: string): EntitlementCapability[] {
  return PRODUCT_ENTITLEMENTS[productId] || [];
}

export async function grantEntitlements(input: {
  purchaseId: string;
  email: string;
  productId: ProductId | string;
  orderId: string;
}) {
  const capabilities = capabilitiesForProduct(input.productId);
  if (capabilities.length === 0) {
    throw new Error(`No entitlement mapping is defined for product ${input.productId}`);
  }

  const { sheets, spreadsheetId } = await ensureSheet();
  const createdAt = new Date().toISOString();
  const existingResponse = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_TITLE}!A2:J`,
  });
  const existingCapabilities = new Set(
    (existingResponse.data.values || [])
      .map((row) => parseRow(row))
      .filter((record) => record.purchaseId === input.purchaseId && record.status === 'active')
      .map((record) => record.capability)
  );
  const rows = capabilities
    .filter((capability) => !existingCapabilities.has(capability))
    .map((capability) => [
    randomUUID(),
    input.purchaseId,
    normalizeEmail(input.email),
    capability,
    input.productId,
    input.orderId,
    'active',
    createdAt,
    '',
    '',
  ]);

  if (rows.length === 0) return;
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_TITLE}!A:J`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: rows },
  });
}

export async function getEntitlementsForEmail(email: string): Promise<EntitlementRecord[]> {
  const { sheets, spreadsheetId } = await ensureSheet();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_TITLE}!A2:J`,
  });
  const targetEmail = normalizeEmail(email);
  return (response.data.values || [])
    .map((row) => parseRow(row))
    .filter((record) => normalizeEmail(record.email) === targetEmail);
}

export async function hasActiveEntitlement(email: string, capability: EntitlementCapability): Promise<boolean> {
  const entitlements = await getEntitlementsForEmail(email);
  if (entitlements.some((record) => record.capability === capability && record.status === 'active')) {
    return true;
  }

  return false;
}

/** Access checks must bind a token to its own purchase, not merely the email. */
export async function hasActiveEntitlementForPurchase(purchaseId: string, productId: string): Promise<boolean> {
  const capabilities = capabilitiesForProduct(productId);
  if (capabilities.length === 0) return false;
  const { sheets, spreadsheetId } = await ensureSheet();
  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_TITLE}!A2:J` });
  const activeCapabilities = new Set(
    (response.data.values || [])
      .map((row) => parseRow(row))
      .filter((record) => record.purchaseId === purchaseId && record.status === 'active')
      .map((record) => record.capability)
  );
  return capabilities.every((capability) => activeCapabilities.has(capability));
}

/**
 * Revocation is intentionally performed before a refund is sent. If this fails,
 * the caller must not issue the external refund.
 */
export async function revokeEntitlementsForOrder(orderId: string, reason: string) {
  const { sheets, spreadsheetId } = await ensureSheet();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_TITLE}!A2:J`,
  });
  const now = new Date().toISOString();
  const rows = response.data.values || [];
  let revoked = 0;

  for (let index = 0; index < rows.length; index++) {
    const record = parseRow(rows[index]);
    if (record.orderId !== orderId || record.status !== 'active') continue;
    const sheetRow = index + 2;
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_TITLE}!G${sheetRow}:J${sheetRow}`,
      valueInputOption: 'RAW',
      requestBody: { values: [['revoked', record.createdAt, now, reason.slice(0, 500)]] },
    });
    revoked++;
  }

  return revoked;
}
