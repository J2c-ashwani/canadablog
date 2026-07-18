// lib/mca/sheets.ts
// MCA Google Sheets Repository
// Writes to dedicated MCA tabs — never touches the existing Leads tab.

import { google } from 'googleapis';
import crypto from 'crypto';
import { MCAApplication, MCAPriorityOrder, MCAActivityLog, DuplicateCheckResult } from './types';

// Tab names — must match exactly what is created in the Google Sheet
const TABS = {
  APPLICATIONS: 'MCA Applications',
  PRIORITY_ORDERS: 'MCA Priority Orders',
  PARTNER_SUBMISSIONS: 'MCA Partner Submissions',
  PARTNER_OUTCOMES: 'MCA Partner Outcomes',
  ACTIVITY_LOG: 'MCA Activity Log',
  CONFIG: 'MCA Configuration',
} as const;

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return google.sheets({ version: 'v4', auth });
}

function getSpreadsheetId(): string {
  const id = process.env.GOOGLE_SHEET_ID;
  if (!id) throw new Error('GOOGLE_SHEET_ID environment variable is missing');
  return id;
}

// ─── Application Tab ─────────────────────────────────────────────────────────

export async function appendMCAApplication(app: MCAApplication): Promise<void> {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  const recToken = app.recoveryToken || `mca_rec_${crypto.randomBytes(16).toString('hex')}`;

  const row = [
    app.timestamp,
    app.applicationId,
    app.legalBusinessName,
    app.tradeName ?? '',
    app.businessRegistrationNumber ?? '',
    app.businessAddress,
    app.city,
    app.province,
    app.postalCode,
    app.ownerName,
    app.email,
    app.phone,
    app.website ?? '',
    app.industry,
    app.yearsInBusiness,
    app.employees ?? '',
    app.monthlyRevenue,
    app.fundingAmount,
    app.fundingPurpose,
    app.fileCount,
    app.storageFileUrls.join(', '),
    app.consent ? 'Yes' : 'No',
    app.consentToShare ? 'Yes' : 'No',
    app.priorityScore,
    app.priorityBand,
    app.applicationStatus,
    app.priorityProcessing ? 'Yes' : 'No',
    app.priorityPaymentId ?? '',
    '', // Partner Status (updated later)
    '', // Partner Outcome (updated later)
    0,  // Revenue (updated on Priority purchase)
    '', // Notes
    app.utmSource ?? '',
    app.utmMedium ?? '',
    app.utmCampaign ?? '',
    app.ga4ClientId ?? '',
    app.landingPage,
    app.referrer ?? '',
    recToken,
    app.priorityRecoveryStatus ?? 'ACTIVE',
    app.recoveryEmail1Sent ?? '',
    app.recoveryEmail2Sent ?? '',
    app.recoveryEmail3Sent ?? '',
    app.recoveryEmail4Sent ?? '',
    app.recoveryEmail5Sent ?? '',
    app.recoveryClicked ? 'Yes' : 'No',
    app.lastRecoveryEmail ?? '',
    app.recoveryStage ?? 'NONE',
    app.recoveryPurchased ? 'Yes' : 'No',
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${TABS.APPLICATIONS}!A:AW`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

// ─── Duplicate Detection ─────────────────────────────────────────────────────

export async function checkDuplicateApplication(
  email: string,
  phone: string,
  legalBusinessName: string
): Promise<DuplicateCheckResult> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${TABS.APPLICATIONS}!A:L`, // Timestamp through Phone
    });

    const rows = response.data.values ?? [];
    if (rows.length <= 1) return { isDuplicate: false }; // header only

    const emailNorm = email.toLowerCase().trim();
    const phoneNorm = phone.replace(/[^0-9]/g, '');
    const nameNorm = legalBusinessName.toLowerCase().trim();

    for (const row of rows.slice(1)) {
      const rowEmail = (row[10] ?? '').toLowerCase().trim();      // col K
      const rowPhone = (row[11] ?? '').replace(/[^0-9]/g, '');   // col L
      const rowName = (row[2] ?? '').toLowerCase().trim();        // col C
      const rowAppId = row[1] ?? '';                              // col B

      if (rowEmail === emailNorm) {
        return { isDuplicate: true, matchType: 'email', existingApplicationId: rowAppId };
      }
      if (phoneNorm.length >= 10 && rowPhone === phoneNorm) {
        return { isDuplicate: true, matchType: 'phone', existingApplicationId: rowAppId };
      }
      if (rowName === nameNorm) {
        return { isDuplicate: true, matchType: 'businessName', existingApplicationId: rowAppId };
      }
    }

    return { isDuplicate: false };
  } catch {
    // On error, allow submission (don't block applicants due to lookup failure)
    return { isDuplicate: false };
  }
}

// ─── Priority Orders Tab ──────────────────────────────────────────────────────

export async function appendMCAPriorityOrder(order: MCAPriorityOrder): Promise<void> {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  const row = [
    order.timestamp,
    order.applicationId,
    order.email,
    order.paypalOrderId,
    order.amountCAD,
    order.status,
    order.fulfilmentStatus,
    order.specialistAssigned ?? '',
    order.completedAt ?? '',
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${TABS.PRIORITY_ORDERS}!A:I`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

// ─── Partner Submissions Tab ──────────────────────────────────────────────────

export async function appendMCAPartnerSubmission(data: {
  applicationId: string;
  businessName: string;
  email: string;
  monthlyRevenue: number;
  fundingRequested: number;
  band: string;
  priorityFlag: boolean;
  fileStorageUrls: string;
  submissionMethod: string;
  submittedBy: string;
}): Promise<void> {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  const row = [
    new Date().toISOString(),
    data.applicationId,
    data.businessName,
    data.email,
    data.monthlyRevenue,
    data.fundingRequested,
    data.band,
    data.priorityFlag ? 'Yes' : 'No',
    data.fileStorageUrls,
    data.submissionMethod,
    data.submittedBy,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${TABS.PARTNER_SUBMISSIONS}!A:K`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

// ─── Activity Log Tab ─────────────────────────────────────────────────────────

export async function appendMCAActivityLog(entry: MCAActivityLog): Promise<void> {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  const row = [
    entry.timestamp,
    entry.applicationId,
    entry.email,
    entry.event,
    entry.metadata ? JSON.stringify(entry.metadata) : '',
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${TABS.ACTIVITY_LOG}!A:E`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

// ─── Update Application Payment ──────────────────────────────────────────────

export async function updateMCAApplicationPayment(
  applicationId: string,
  paypalOrderId: string
): Promise<boolean> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${TABS.APPLICATIONS}!A:AK`,
    });

    const rows = response.data.values ?? [];
    if (rows.length <= 1) return false;

    let rowIndex = -1;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][1] === applicationId) {
        rowIndex = i;
        break;
      }
    }

    if (rowIndex === -1) {
      console.warn(`MCA App not found for payment update: ${applicationId}`);
      return false;
    }

    const rowNumber = rowIndex + 1;
    
    // Update Application Status, Priority Processing, PayPal Order ID, and Revenue
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${TABS.APPLICATIONS}!Z${rowNumber}:AE${rowNumber}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            'Documents Received', // Z (25) - Application Status
            'Yes',                // AA (26) - Priority Processing
            paypalOrderId,        // AB (27) - Priority Payment ID
            '',                   // AC (28) - Partner Status (keep empty)
            '',                   // AD (29) - Partner Outcome (keep empty)
            49,                   // AE (30) - Revenue (CAD)
          ],
        ],
      },
    });

    // Update Recovery Columns (AM through AW) to halt recovery flow
    try {
      const currentValuesRes = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${TABS.APPLICATIONS}!AM${rowNumber}:AW${rowNumber}`,
      });
      const currentValues = currentValuesRes.data.values?.[0] ?? [];
      const recoveryToken = currentValues[0] ?? '';
      
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${TABS.APPLICATIONS}!AM${rowNumber}:AW${rowNumber}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [
              recoveryToken,
              'COMPLETED', // Priority Recovery Status
              currentValues[2] ?? '', // Recovery Email 1 Sent
              currentValues[3] ?? '', // Recovery Email 2 Sent
              currentValues[4] ?? '', // Recovery Email 3 Sent
              currentValues[5] ?? '', // Recovery Email 4 Sent
              currentValues[6] ?? '', // Recovery Email 5 Sent
              currentValues[7] ?? 'No', // Recovery Clicked
              currentValues[8] ?? '', // Last Recovery Email
              'PURCHASED', // Recovery Stage
              'Yes', // Recovery Purchased
            ],
          ],
        },
      });
    } catch (e) {
      console.warn('Non-blocking: Failed to update recovery status in sheet:', e);
    }

    return true;
  } catch (err) {
    console.error('Error updating MCA application payment:', err);
    return false;
  }
}

// ─── Update Priority Order Status ───────────────────────────────────────────

export async function updateMCAPriorityOrderStatus(
  paypalOrderId: string,
  status: 'Captured' | 'Refunded'
): Promise<boolean> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${TABS.PRIORITY_ORDERS}!A:I`,
    });

    const rows = response.data.values ?? [];
    if (rows.length <= 1) return false;

    let rowIndex = -1;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][3] === paypalOrderId) {
        rowIndex = i;
        break;
      }
    }

    if (rowIndex === -1) {
      console.warn(`MCA Priority Order not found: ${paypalOrderId}`);
      return false;
    }

    const rowNumber = rowIndex + 1;

    // Update Status (Col F / 6th column / Index 5) to 'Captured'
    // Update Fulfilment Status (Col G / 7th column / Index 6) to 'Queued' if Captured
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${TABS.PRIORITY_ORDERS}!F${rowNumber}:G${rowNumber}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            status,
            status === 'Captured' ? 'Queued' : 'In Review',
          ],
        ],
      },
    });

    return true;
  } catch (err) {
    console.error('Error updating Priority Order status:', err);
    return false;
  }
}

// ─── Application ID Generator ─────────────────────────────────────────────────

export function generateApplicationId(): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MCA-${y}${m}${d}-${rand}`;
}

export async function getMCAApplications(limit: number = 2000): Promise<any[]> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${TABS.APPLICATIONS}!A2:AW${limit + 1}`,
    });
    const rows = response.data.values ?? [];
    return rows.map((row) => ({
      timestamp: row[0] ?? '',
      applicationId: row[1] ?? '',
      legalBusinessName: row[2] ?? '',
      tradeName: row[3] ?? '',
      businessRegistrationNumber: row[4] ?? '',
      businessAddress: row[5] ?? '',
      city: row[6] ?? '',
      province: row[7] ?? '',
      postalCode: row[8] ?? '',
      ownerName: row[9] ?? '',
      email: row[10] ?? '',
      phone: row[11] ?? '',
      website: row[12] ?? '',
      industry: row[13] ?? '',
      yearsInBusiness: row[14] ?? '',
      employees: row[15] ?? '',
      monthlyRevenue: parseFloat(row[16] ?? '0') || 0,
      fundingAmount: parseFloat(row[17] ?? '0') || 0,
      fundingPurpose: row[18] ?? '',
      fileCount: parseInt(row[19] ?? '0') || 0,
      storageFileUrls: row[20] ? row[20].split(', ') : [],
      consent: row[21] === 'Yes',
      consentToShare: row[22] === 'Yes',
      priorityScore: parseInt(row[23] ?? '0') || 0,
      priorityBand: row[24] ?? '',
      applicationStatus: row[25] ?? '',
      priorityProcessing: row[26] === 'Yes',
      priorityPaymentId: row[27] ?? '',
      partnerStatus: row[28] ?? '',
      partnerOutcome: row[29] ?? '',
      revenue: parseFloat(row[30] ?? '0') || 0,
      notes: row[31] ?? '',
      utmSource: row[32] ?? '',
      utmMedium: row[33] ?? '',
      utmCampaign: row[34] ?? '',
      ga4ClientId: row[35] ?? '',
      landingPage: row[36] ?? '',
      referrer: row[37] ?? '',
      recoveryToken: row[38] ?? '',
      priorityRecoveryStatus: row[39] ?? 'NONE',
      recoveryEmail1Sent: row[40] ?? '',
      recoveryEmail2Sent: row[41] ?? '',
      recoveryEmail3Sent: row[42] ?? '',
      recoveryEmail4Sent: row[43] ?? '',
      recoveryEmail5Sent: row[44] ?? '',
      recoveryClicked: row[45] === 'Yes',
      lastRecoveryEmail: row[46] ?? '',
      recoveryStage: row[47] ?? 'NONE',
      recoveryPurchased: row[48] === 'Yes',
    }));
  } catch (err) {
    console.error('Error fetching MCA applications:', err);
    return [];
  }
}

export async function getMCAPriorityOrders(limit: number = 2000): Promise<any[]> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${TABS.PRIORITY_ORDERS}!A2:I${limit + 1}`,
    });
    const rows = response.data.values ?? [];
    return rows.map((row) => ({
      timestamp: row[0] ?? '',
      applicationId: row[1] ?? '',
      email: row[2] ?? '',
      paypalOrderId: row[3] ?? '',
      amountCAD: parseFloat(row[4] ?? '0') || 0,
      status: row[5] ?? '',
      fulfilmentStatus: row[6] ?? '',
      specialistAssigned: row[7] ?? '',
      completedAt: row[8] ?? '',
    }));
  } catch (err) {
    console.error('Error fetching MCA priority orders:', err);
    return [];
  }
}

export async function getMCAPartnerSubmissions(limit: number = 2000): Promise<any[]> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${TABS.PARTNER_SUBMISSIONS}!A2:K${limit + 1}`,
    });
    const rows = response.data.values ?? [];
    return rows.map((row) => ({
      timestamp: row[0] ?? '',
      applicationId: row[1] ?? '',
      businessName: row[2] ?? '',
      email: row[3] ?? '',
      monthlyRevenue: parseFloat(row[4] ?? '0') || 0,
      fundingRequested: parseFloat(row[5] ?? '0') || 0,
      band: row[6] ?? '',
      priorityFlag: row[7] === 'Yes',
      fileStorageUrls: row[8] ?? '',
      submissionMethod: row[9] ?? '',
      submittedBy: row[10] ?? '',
    }));
  } catch (err) {
    console.error('Error fetching MCA partner submissions:', err);
    return [];
  }
}

export async function getMCAPartnerOutcomes(limit: number = 2000): Promise<any[]> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${TABS.PARTNER_OUTCOMES}!A2:G${limit + 1}`,
    });
    const rows = response.data.values ?? [];
    return rows.map((row) => ({
      timestamp: row[0] ?? '',
      applicationId: row[1] ?? '',
      outcome: row[2] ?? '',
      declineReason: row[3] ?? '',
      fundedAmount: parseFloat(row[4] ?? '0') || 0,
      referralRevenue: parseFloat(row[5] ?? '0') || 0,
      notes: row[6] ?? '',
    }));
  } catch (err) {
    console.error('Error fetching MCA partner outcomes:', err);
    return [];
  }
}

export async function updateMCAApplicationRecovery(
  applicationId: string,
  updates: {
    priorityRecoveryStatus?: string;
    recoveryEmail1Sent?: string;
    recoveryEmail2Sent?: string;
    recoveryEmail3Sent?: string;
    recoveryEmail4Sent?: string;
    recoveryEmail5Sent?: string;
    recoveryClicked?: boolean;
    lastRecoveryEmail?: string;
    recoveryStage?: string;
    recoveryPurchased?: boolean;
  }
): Promise<boolean> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${TABS.APPLICATIONS}!A:B`,
    });

    const rows = response.data.values ?? [];
    if (rows.length <= 1) return false;

    let rowIndex = -1;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][1] === applicationId) {
        rowIndex = i;
        break;
      }
    }

    if (rowIndex === -1) {
      console.warn(`MCA App not found for recovery update: ${applicationId}`);
      return false;
    }

    const rowNumber = rowIndex + 1;

    const currentValuesRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${TABS.APPLICATIONS}!AM${rowNumber}:AW${rowNumber}`,
    });

    const currentValues = currentValuesRes.data.values?.[0] ?? [];
    
    const recoveryToken = currentValues[0] ?? '';
    const priorityRecoveryStatus = updates.priorityRecoveryStatus ?? currentValues[1] ?? 'ACTIVE';
    const recoveryEmail1Sent = updates.recoveryEmail1Sent ?? currentValues[2] ?? '';
    const recoveryEmail2Sent = updates.recoveryEmail2Sent ?? currentValues[3] ?? '';
    const recoveryEmail3Sent = updates.recoveryEmail3Sent ?? currentValues[4] ?? '';
    const recoveryEmail4Sent = updates.recoveryEmail4Sent ?? currentValues[5] ?? '';
    const recoveryEmail5Sent = updates.recoveryEmail5Sent ?? currentValues[6] ?? '';
    const recoveryClicked = updates.recoveryClicked !== undefined ? (updates.recoveryClicked ? 'Yes' : 'No') : currentValues[7] ?? 'No';
    const lastRecoveryEmail = updates.lastRecoveryEmail ?? currentValues[8] ?? '';
    const recoveryStage = updates.recoveryStage ?? currentValues[9] ?? 'NONE';
    const recoveryPurchased = updates.recoveryPurchased !== undefined ? (updates.recoveryPurchased ? 'Yes' : 'No') : currentValues[10] ?? 'No';

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${TABS.APPLICATIONS}!AM${rowNumber}:AW${rowNumber}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            recoveryToken,
            priorityRecoveryStatus,
            recoveryEmail1Sent,
            recoveryEmail2Sent,
            recoveryEmail3Sent,
            recoveryEmail4Sent,
            recoveryEmail5Sent,
            recoveryClicked,
            lastRecoveryEmail,
            recoveryStage,
            recoveryPurchased,
          ],
        ],
      },
    });

    return true;
  } catch (err) {
    console.error('Error updating MCA application recovery:', err);
    return false;
  }
}

export async function getMCAConfig(): Promise<Record<string, string>> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'MCA Configuration!A2:B10',
    });
    
    const rows = response.data.values ?? [];
    const config: Record<string, string> = {};
    for (const row of rows) {
      const key = row[0];
      const value = row[1];
      if (key && value) {
        config[key.trim()] = value.trim();
      }
    }
    return config;
  } catch (err) {
    console.warn('Error reading MCA Configuration tab, returning default config values:', err);
    return {};
  }
}


