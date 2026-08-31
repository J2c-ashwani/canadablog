import { google } from "googleapis"
import { randomUUID } from "crypto"
import {
  calculateLeadIntelligence,
  LEAD_CONSENT_TEXT,
  LEAD_CONSENT_VERSION,
  type LeadCaptureData,
} from "@/lib/leads/scoring"

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
let cachedSheetsClient: ReturnType<typeof google.sheets> | null = null

export async function getGoogleSheetsClient() {
  if (cachedSheetsClient) return cachedSheetsClient
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  })

  const sheets = google.sheets({ version: "v4", auth })
  cachedSheetsClient = sheets
  return sheets
}

type CachedSheetValues = {
  expiresAt: number
  promise: Promise<string[][]>
}

const sheetValuesCache = new Map<string, CachedSheetValues>()

/**
 * Short-lived, in-flight-aware cache for read-heavy executive/reporting paths.
 * A single CEO run asks several specialists for the same ledgers in parallel;
 * coalescing those reads keeps the run below Google Sheets' per-user quota
 * without weakening payment or delivery verification.
 */
export async function getCachedSheetValues(range: string, ttlMs = 30_000): Promise<string[][]> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID environment variable is missing")

  const key = `${spreadsheetId}:${range}`
  const existing = sheetValuesCache.get(key)
  if (existing && existing.expiresAt > Date.now()) {
    return (await existing.promise).map((row) => [...row])
  }

  const promise = (async () => {
    const sheets = await getGoogleSheetsClient()
    const response = await sheets.spreadsheets.values.get({ spreadsheetId, range })
    return (response.data.values || []) as string[][]
  })()
  sheetValuesCache.set(key, { expiresAt: Date.now() + ttlMs, promise })

  try {
    return (await promise).map((row) => [...row])
  } catch (error) {
    sheetValuesCache.delete(key)
    throw error
  }
}

export function invalidateCachedSheetValues(sheetTitle?: string) {
  if (!sheetTitle) {
    sheetValuesCache.clear()
    return
  }
  const marker = `:${sheetTitle.replace(/^'+|'+$/g, '')}!`
  for (const key of sheetValuesCache.keys()) {
    if (key.includes(marker) || key.includes(`:'${sheetTitle.replace(/^'+|'+$/g, '')}'!`)) {
      sheetValuesCache.delete(key)
    }
  }
}

// Unified lead capture with source tracking
export async function appendLeadToSheet(data: LeadCaptureData) {
  try {
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    const hasExplicitConsent = data.consentToPartnerContact === true || data.isSubscribed === true
    const consentVersion = hasExplicitConsent ? (data.consentVersion || LEAD_CONSENT_VERSION) : ''
    const consentText = hasExplicitConsent ? (data.consentText || LEAD_CONSENT_TEXT) : ''
    const intelligence = calculateLeadIntelligence({
      ...data,
      consentVersion,
      consentText,
    })

    // Manual call/WhatsApp fulfilment is outside the self-serve operating model.
    // Keep the legacy sheet column stable without generating a contact action.
    const waLink = "N/A"

    const values = [
      [
        data.timestamp,
        data.source, // Lead source tracking
        data.email,
        data.name || data.companyName || "N/A",
        data.country || "N/A",
        data.state || "N/A",
        data.industry || "N/A",
        data.businessStage || "N/A",
        data.fundingAmount || "N/A",
        Array.isArray(data.fundingPurpose) ? data.fundingPurpose.join(", ") : (data.fundingPurpose || "N/A"),
        data.businessDescription || "N/A",
        data.phone || "N/A",
        data.additionalNotes || "N/A",
        intelligence.score,
        intelligence.tier,
        intelligence.estimatedOpportunityValue || intelligence.estimatedValue,
        intelligence.buyerSegment,
        intelligence.routing,
        intelligence.consentStatus,
        data.consentToPartnerContact ? "Yes" : "No",
        consentVersion,
        consentText,
        data.pagePath || "N/A",
        data.ipAddress || "N/A",
        data.userAgent || "N/A",
        intelligence.qualificationNotes,
        waLink,
        data.utmSource || "N/A",
        data.utmMedium || "N/A",
        data.utmCampaign || "N/A",
        data.gaClientId || "N/A",
        data.offlineStatus || "Lead",
        data.actualSignedValue || "N/A",
        data.isSubscribed === true ? "Yes" : "No",
        data.unsubscribeToken || "",
        data.engagementScore !== undefined ? String(data.engagementScore) : "100",
        data.lastOpenedAt || "N/A",
        data.lastClickedAt || "N/A",
        data.companySize || "N/A",
        data.fundingInterests ? data.fundingInterests.join(",") : "N/A",
        data.readinessScore !== undefined ? String(data.readinessScore) : "N/A",
        data.readinessBand || "N/A",
        data.loginToken || "",
        data.subscriptionStatus || "inactive",
        data.subscriptionId || "N/A",
        data.trialStartedAt || "N/A",
        data.website || "N/A",
        data.companyName || "N/A",
        data.reportPurchased ? "Yes" : "No",
        data.reportTransactionId || "N/A",
        data.lastEmailFollowup || "N/A",
        data.leadActivity || "{}",
        data.lastAttributionSource || "N/A",
        data.firstReportViewedAt || "N/A",
        data.assessmentPurchasedAt || "N/A",
        data.lastAlertSentAt || "N/A",
        data.lastAlertOpenedAt || "N/A",
        data.lastAlertClickedAt || "N/A",
        data.lastLoginAt || "N/A",
        data.lastDashboardViewAt || "N/A",
        data.lastPortfolioViewAt || "N/A",
        data.lastAlertClickAt || "N/A",
        data.leadTier || "N/A",
        data.subscriptionCancelledAt || "N/A",
        data.cancellationReason || "N/A",
        data.strategyReportPurchased ? "Yes" : "No",
        data.strategyReportTransactionId || "N/A",
        data.city || "N/A",
        data.timeline || "N/A",
        data.requestType || "N/A",
        data.emailVerified || "No",
        data.auditCandidate || "No",
        data.annualRevenue || "N/A",
        data.referralSource || "N/A",
        data.potentialFundingRange || "N/A",
      ],
    ]

    // Atomic append to avoid race conditions and concurrent lead overwrite
    const appendResult = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Leads!A1",
      // Customer fields are data, never spreadsheet expressions.
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    });

    // Also route MCA leads directly to the dedicated "MCA Applications" sheet tab
    const isMcaLead = (
      data.category === 'MCA Funding Calculator' ||
      data.category === 'MCA Application' ||
      (data.source || '').toLowerCase().includes('mca') ||
      (data.pagePath || '').includes('/mca')
    );

    if (isMcaLead) {
      try {
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: "'MCA Applications'!A1",
          valueInputOption: "RAW",
          insertDataOption: "INSERT_ROWS",
          requestBody: {
            values,
          },
        });
        console.log(`✅ MCA Lead appended to "MCA Applications" tab for ${data.email}`);
      } catch (mcaErr: any) {
        console.warn("⚠️ Failed to append lead to MCA Applications tab:", mcaErr?.message || mcaErr);
      }
    }

    // This is the only formula written by this workflow. It is generated on the
    // server into its dedicated WhatsApp column after the raw lead row exists.
    const updatedRange = appendResult.data.updates?.updatedRange || '';
    const rowMatch = updatedRange.match(/!A(\d+):/);
    if (rowMatch && waLink !== 'N/A') {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Leads!AA${rowMatch[1]}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [[waLink]] },
      });
    }

    invalidateCachedSheetValues("Leads")
    console.log(`✅ Lead saved from source: ${data.source}`)
    return { success: true }
  } catch (error) {
    console.error("❌ Error saving to Google Sheets:", error)
    return { success: false, error }
  }
}

export type SheetLead = LeadCaptureData & {
  score: number
  tier: string
  estimatedValue: string
  buyerSegment: string
  routing: string
  consentStatus: string
  consentToPartnerContact: boolean
  qualificationNotes: string
  rowIndex: number
  actualSignedValue?: string
}



function parseSheetLead(row: string[]): SheetLead {
  const base: LeadCaptureData = {
    timestamp: row[0] || "",
    source: row[1] || "",
    email: row[2] || "",
    name: row[3] || "",
    country: row[4] || "",
    state: row[5] || "",
    industry: row[6] || "",
    businessStage: row[7] || "",
    fundingAmount: row[8] || "",
    fundingPurpose: row[9] || "",
    businessDescription: row[10] || "",
    phone: row[11] || "",
    additionalNotes: row[12] || "",
    consentToPartnerContact: String(row[19] || "").toLowerCase() === "yes",
    consentVersion: row[20] || "",
    consentText: row[21] || "",
    pagePath: row[22] || "",
    ipAddress: row[23] || "",
    userAgent: row[24] || "",
    utmSource: row[27] || "N/A",
    utmMedium: row[28] || "N/A",
    utmCampaign: row[29] || "N/A",
    offlineStatus: row[31] || "Lead",
    actualSignedValue: row[32] || "N/A",
    isSubscribed: String(row[33] || "").toLowerCase() === "yes",
    unsubscribeToken: row[34] || "",
    engagementScore: row[35] ? Number(row[35]) : 100,
    lastOpenedAt: row[36] || "",
    lastClickedAt: row[37] || "",
    companySize: row[38] || "",
    fundingInterests: row[39] && row[39] !== "N/A" ? row[39].split(",") : [],
    readinessScore: row[40] && row[40] !== "N/A" ? Number(row[40]) : undefined,
    readinessBand: row[41] || "N/A",
    loginToken: row[42] || "",
    subscriptionStatus: row[43] || "inactive",
    subscriptionId: row[44] || "N/A",
    trialStartedAt: row[45] || "N/A",
    website: row[46] || "N/A",
    companyName: row[47] || "N/A",
    reportPurchased: String(row[48] || "").toLowerCase() === "yes",
    reportTransactionId: row[49] || "N/A",
    lastEmailFollowup: row[50] || "N/A",
    leadActivity: row[51] || "{}",
    lastAttributionSource: row[52] || "N/A",
    firstReportViewedAt: row[53] || "N/A",
    assessmentPurchasedAt: row[54] || "N/A",
    lastAlertSentAt: row[55] || "N/A",
    lastAlertOpenedAt: row[56] || "N/A",
    lastAlertClickedAt: row[57] || "N/A",
    lastLoginAt: row[58] || "N/A",
    lastDashboardViewAt: row[59] || "N/A",
    lastPortfolioViewAt: row[60] || "N/A",
    lastAlertClickAt: row[61] || "N/A",
    leadTier: row[62] || "N/A",
    subscriptionCancelledAt: row[63] || "N/A",
    cancellationReason: row[64] || "N/A",
    strategyReportPurchased: String(row[65] || "").toLowerCase() === "yes",
    strategyReportTransactionId: row[66] || "N/A",
    city: row[67] || "N/A",
    timeline: row[68] || "N/A",
    requestType: row[69] || "N/A",
    emailVerified: row[70] || "No",
    auditCandidate: row[71] || "No",
    annualRevenue: row[72] || "N/A",
    referralSource: row[73] || "N/A",
    potentialFundingRange: row[74] || "N/A",
  }


  const intelligence = calculateLeadIntelligence(base)

  return {
    ...base,
    score: intelligence.score,
    tier: intelligence.tier,
    estimatedValue: intelligence.estimatedOpportunityValue || intelligence.estimatedValue,
    buyerSegment: intelligence.buyerSegment,
    routing: intelligence.routing,
    consentStatus: row[18] || intelligence.consentStatus,
    consentToPartnerContact: base.consentToPartnerContact || intelligence.consentStatus === "partner-consent",
    qualificationNotes: row[25] || intelligence.qualificationNotes,
    rowIndex: 0,
    actualSignedValue: base.actualSignedValue,
  }
}



export async function getLeadsFromSheet(limit = 500) {
  const rows = await getCachedSheetValues("Leads!A:BW")
  return rows
    .map((row, index) => ({ row, rowIndex: index + 1 }))
    .filter(({ row }) => row[0] && row[2] && row[2] !== "Email")
    .map(({ row, rowIndex }) => {
      const parsed = parseSheetLead(row as string[]);
      return {
        ...parsed,
        rowIndex,
      };
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
}

export async function updateLeadInSheet(email: string, updates: Partial<LeadCaptureData>) {
  try {
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    
    // Fetch all rows to locate index
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Leads!A:BW",
    })
    
    const rows = response.data.values || []
    const emailColIndex = 2 // Leads!C is Column 3 (0-indexed 2)
    
    const normalizedEmail = email.toLowerCase().trim()
    const rowIndices: number[] = []
    
    rows.forEach((row, index) => {
      if (row[emailColIndex] && row[emailColIndex].toLowerCase().trim() === normalizedEmail) {
        rowIndices.push(index)
      }
    })
    
    if (rowIndices.length === 0) {
      console.warn(`⚠️ Lead with email ${email} not found in sheet.`)
      return { success: false, error: "Not found" }
    }
    
    for (const rowIndex of rowIndices) {
      const sheetRowNumber = rowIndex + 1
      const targetRow = [...rows[rowIndex]]
      
      // Ensure array length covers BW (index 74)
      while (targetRow.length < 75) {
        targetRow.push("N/A")
      }
      
      // Update fields
      if (updates.source !== undefined) {
        targetRow[1] = updates.source
      }
      if (updates.name !== undefined) {
        targetRow[3] = updates.name
      }
      if (updates.country !== undefined) {
        targetRow[4] = updates.country
      }
      if (updates.state !== undefined) {
        targetRow[5] = updates.state
      }
      if (updates.industry !== undefined) {
        targetRow[6] = updates.industry
      }
      if (updates.businessStage !== undefined) {
        targetRow[7] = updates.businessStage
      }
      if (updates.fundingAmount !== undefined) {
        targetRow[8] = updates.fundingAmount
      }
      if (updates.fundingPurpose !== undefined) {
        targetRow[9] = Array.isArray(updates.fundingPurpose) ? updates.fundingPurpose.join(", ") : String(updates.fundingPurpose)
      }
      if (updates.businessDescription !== undefined) {
        targetRow[10] = updates.businessDescription
      }
      if (updates.phone !== undefined) {
        targetRow[11] = updates.phone
      }
      if (updates.additionalNotes !== undefined) {
        targetRow[12] = updates.additionalNotes
      }
      if (updates.consentToPartnerContact !== undefined) {
        targetRow[19] = updates.consentToPartnerContact ? "Yes" : "No"
      }
      if (updates.pagePath !== undefined) {
        targetRow[22] = updates.pagePath
      }
      if (updates.ipAddress !== undefined) {
        targetRow[23] = updates.ipAddress
      }
      if (updates.userAgent !== undefined) {
        targetRow[24] = updates.userAgent
      }
      if (updates.utmSource !== undefined) {
        targetRow[27] = updates.utmSource
      }
      if (updates.utmMedium !== undefined) {
        targetRow[28] = updates.utmMedium
      }
      if (updates.utmCampaign !== undefined) {
        targetRow[29] = updates.utmCampaign
      }
      if (updates.gaClientId !== undefined) {
        targetRow[30] = updates.gaClientId
      }
      if (updates.offlineStatus !== undefined) {
        targetRow[31] = updates.offlineStatus
      }
      if (updates.isSubscribed !== undefined) {
        targetRow[33] = updates.isSubscribed ? "Yes" : "No"
      }
      if (updates.unsubscribeToken !== undefined) {
        targetRow[34] = updates.unsubscribeToken
      }
      if (updates.engagementScore !== undefined) {
        targetRow[35] = String(updates.engagementScore)
      }
      if (updates.lastOpenedAt !== undefined) {
        targetRow[36] = updates.lastOpenedAt
      }
      if (updates.lastClickedAt !== undefined) {
        targetRow[37] = updates.lastClickedAt
      }
      if (updates.companySize !== undefined) {
        targetRow[38] = updates.companySize
      }
      if (updates.fundingInterests !== undefined) {
        targetRow[39] = updates.fundingInterests.join(",")
      }
      if (updates.readinessScore !== undefined) {
        targetRow[40] = String(updates.readinessScore)
      }
      if (updates.readinessBand !== undefined) {
        targetRow[41] = updates.readinessBand
      }
      if (updates.loginToken !== undefined) {
        targetRow[42] = updates.loginToken
      }
      if (updates.subscriptionStatus !== undefined) {
        targetRow[43] = updates.subscriptionStatus
      }
      if (updates.subscriptionId !== undefined) {
        targetRow[44] = updates.subscriptionId
      }
      if (updates.trialStartedAt !== undefined) {
        targetRow[45] = updates.trialStartedAt
      }
      if (updates.website !== undefined) {
        targetRow[46] = updates.website
      }
      if (updates.companyName !== undefined) {
        targetRow[47] = updates.companyName
      }
      if (updates.reportPurchased !== undefined) {
        targetRow[48] = updates.reportPurchased ? "Yes" : "No"
      }
      if (updates.reportTransactionId !== undefined) {
        targetRow[49] = updates.reportTransactionId
      }
      if (updates.lastEmailFollowup !== undefined) {
        targetRow[50] = updates.lastEmailFollowup
      }
      if (updates.leadActivity !== undefined) {
        targetRow[51] = updates.leadActivity
      }
      if (updates.lastAttributionSource !== undefined) {
        targetRow[52] = updates.lastAttributionSource
      }
      if (updates.firstReportViewedAt !== undefined) {
        targetRow[53] = updates.firstReportViewedAt
      }
      if (updates.assessmentPurchasedAt !== undefined) {
        targetRow[54] = updates.assessmentPurchasedAt
      }
      if (updates.lastAlertSentAt !== undefined) {
        targetRow[55] = updates.lastAlertSentAt
      }
      if (updates.lastAlertOpenedAt !== undefined) {
        targetRow[56] = updates.lastAlertOpenedAt
      }
      if (updates.lastAlertClickedAt !== undefined) {
        targetRow[57] = updates.lastAlertClickedAt
      }
      if (updates.lastLoginAt !== undefined) {
        targetRow[58] = updates.lastLoginAt
      }
      if (updates.lastDashboardViewAt !== undefined) {
        targetRow[59] = updates.lastDashboardViewAt
      }
      if (updates.lastPortfolioViewAt !== undefined) {
        targetRow[60] = updates.lastPortfolioViewAt
      }
      if (updates.lastAlertClickAt !== undefined) {
        targetRow[61] = updates.lastAlertClickAt
      }
      if (updates.leadTier !== undefined) {
        targetRow[62] = updates.leadTier
      }
      if (updates.subscriptionCancelledAt !== undefined) {
        targetRow[63] = updates.subscriptionCancelledAt
      }
      if (updates.cancellationReason !== undefined) {
        targetRow[64] = updates.cancellationReason
      }
      if (updates.strategyReportPurchased !== undefined) {
        targetRow[65] = updates.strategyReportPurchased ? "Yes" : "No"
      }
      if (updates.strategyReportTransactionId !== undefined) {
        targetRow[66] = updates.strategyReportTransactionId
      }
      if (updates.city !== undefined) {
        targetRow[67] = updates.city
      }
      if (updates.timeline !== undefined) {
        targetRow[68] = updates.timeline
      }
      if (updates.requestType !== undefined) {
        targetRow[69] = updates.requestType
      }
      if (updates.emailVerified !== undefined) {
        targetRow[70] = updates.emailVerified
      }
      if (updates.auditCandidate !== undefined) {
        targetRow[71] = updates.auditCandidate
      }
      if (updates.annualRevenue !== undefined) {
        targetRow[72] = updates.annualRevenue
      }
      if (updates.referralSource !== undefined) {
        targetRow[73] = updates.referralSource
      }
      if (updates.potentialFundingRange !== undefined) {
        targetRow[74] = updates.potentialFundingRange
      }

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Leads!A${sheetRowNumber}:BW${sheetRowNumber}`,
        valueInputOption: "RAW",
        requestBody: {
          values: [targetRow],
        },
      })

      // Restore the single server-generated WhatsApp formula. No user-controlled
      // field is ever submitted with USER_ENTERED semantics.
      const waLink = targetRow[26]
      if (typeof waLink === 'string' && waLink.startsWith('=HYPERLINK(')) {
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `Leads!AA${sheetRowNumber}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [[waLink]] },
        })
      }
      console.log(`✅ Lead record updated at row ${sheetRowNumber}`)
    }
    invalidateCachedSheetValues("Leads")
    return { success: true }
  } catch (error) {
    console.error("❌ Error updating lead in Google Sheets:", error)
    return { success: false, error }
  }
}


export type PartnerPaymentData = {
  timestamp: string
  orderId: string
  captureId: string
  status: string
  packageId: string
  packageName: string
  amount: string
  currency: string
  buyerName: string
  buyerEmail: string
  company: string
  website: string
  targetMarket: string
  notes: string
  payerEmail: string
  payerName: string
  rawSummary: string
}

export async function appendPartnerPaymentToSheet(data: PartnerPaymentData) {
  try {
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "'Product Purchases'!A:Q",
      valueInputOption: "RAW",
      requestBody: {
        values: [[
          data.timestamp,
          data.orderId,
          data.captureId,
          data.status,
          data.packageId,
          data.packageName,
          data.amount,
          data.currency,
          data.buyerName,
          data.buyerEmail,
          data.company,
          data.website,
          data.targetMarket,
          data.notes,
          data.payerEmail,
          data.payerName,
          data.rawSummary,
        ]],
      },
    })

    console.log(`✅ Partner payment logged: ${data.orderId}`)
    return { success: true }
  } catch (error) {
    console.error("❌ Error saving partner payment to Google Sheets:", error)
    return { success: false, error }
  }
}

// Quick function for simple email capture (newsletter, etc.)
export async function captureEmailLead(
  email: string,
  source: string,
  name?: string,
  utmSource?: string,
  utmMedium?: string,
  utmCampaign?: string,
  gaClientId?: string,
  state?: string,
  industry?: string,
  country?: string
) {
  return appendLeadToSheet({
    source,
    timestamp: new Date().toISOString(),
    email,
    name,
    utmSource,
    utmMedium,
    utmCampaign,
    gaClientId,
    state,
    industry,
    country,
  })
}

export async function getPartnerPaymentsFromSheet() {
  try {
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "'Partner Payments'!A:Q",
    })
    return response.data.values || []
  } catch (error) {
    console.error("❌ Error reading partner payments:", error)
    return []
  }
}

export type PartnerInquirySheetData = {
  timestamp: string
  name: string
  email: string
  phone: string
  companyName: string
  website: string
  leadType: string
  geography: string
  existingVolume: string
  budget: string
  purchaseModel: string
  decisionMakerRole: string
  preferences: string
  ipAddress?: string
  userAgent?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  gaClientId?: string
}


const PARTNER_INQUIRY_HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Phone",
  "Company Name",
  "Website",
  "Lead Type",
  "Geography",
  "Existing Volume",
  "Monthly Budget",
  "Purchase Model",
  "Decision Maker Role",
  "ICP Preferences",
  "Lead Buyer Score",
  "Status",
  "Assigned Manager",
  "Last Follow-up Date",
  "Notes",
  "Receipt Sent",
  "Approval Sent",
  "IP Address",
  "User Agent",
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
  "GA Client ID"
]


export async function ensurePartnerInquirySheet(sheets: any, spreadsheetId: string) {
  const SHEET_TITLE = "Partner Inquiries"
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  })

  const exists = spreadsheet.data.sheets?.some((sheet: any) => sheet.properties?.title === SHEET_TITLE)

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
    })
  }

  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_TITLE}!A1:Z1`,
  })

  const header = headerResponse.data.values?.[0] || []
  if (header.join("|") !== PARTNER_INQUIRY_HEADERS.join("|")) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_TITLE}!A1:Z1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [PARTNER_INQUIRY_HEADERS],
      },
    })
  }

}

export async function appendPartnerInquiryToSheet(data: PartnerInquirySheetData, score: number) {
  try {
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    if (!spreadsheetId) {
      throw new Error("GOOGLE_SHEET_ID environment variable is missing")
    }

    await ensurePartnerInquirySheet(sheets, spreadsheetId)

    const values = [
      [
        data.timestamp,
        data.name || "N/A",
        data.email,
        data.phone || "N/A",
        data.companyName || "N/A",
        data.website || "N/A",
        data.leadType || "N/A",
        data.geography || "N/A",
        data.existingVolume || "N/A",
        data.budget || "N/A",
        data.purchaseModel || "N/A",
        data.decisionMakerRole || "N/A",
        data.preferences || "N/A",
        score,
        "New", // CRM Status default
        "Unassigned", // CRM Assigned Manager default
        "N/A", // CRM Last Follow-up default
        "N/A", // CRM Notes default
        "Yes", // Receipt Sent
        "No", // Approval Sent
        data.ipAddress || "N/A",
        data.userAgent || "N/A",
        data.utmSource || "N/A",
        data.utmMedium || "N/A",
        data.utmCampaign || "N/A",
        data.gaClientId || "N/A"
      ]
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "'Partner Inquiries'!A:Z",
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    })


    console.log(`✅ Partner inquiry logged: ${data.email} with score: ${score}`)
    return { success: true }
  } catch (error) {
    console.error("❌ Error saving partner inquiry to Google Sheets:", error)
    return { success: false, error }
  }
}

export interface MatchEvaluationLog {
  timestamp: string
  email: string
  region: string
  industry: string
  companySize: string
  programSlug: string
  fitBand: string
  confidence: string
  difficulty: string
}

const MATCH_LOG_HEADERS = [
  "Timestamp",
  "Email",
  "Region",
  "Industry",
  "Company Size",
  "Program Slug",
  "Fit Band",
  "Confidence",
  "Difficulty"
]

export async function ensureMatchLogsSheet(sheets: any, spreadsheetId: string) {
  const SHEET_TITLE = "Match Logs"
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  })

  const exists = spreadsheet.data.sheets?.some((sheet: any) => sheet.properties?.title === SHEET_TITLE)

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
    })
  }

  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_TITLE}!A1:I1`,
  })

  const header = headerResponse.data.values?.[0] || []
  if (header.join("|") !== MATCH_LOG_HEADERS.join("|")) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_TITLE}!A1:I1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [MATCH_LOG_HEADERS],
      },
    })
  }
}

export async function appendMatchEvaluationToSheet(data: MatchEvaluationLog) {
  try {
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    if (!spreadsheetId) {
      throw new Error("GOOGLE_SHEET_ID environment variable is missing")
    }

    await ensureMatchLogsSheet(sheets, spreadsheetId)

    const values = [
      [
        data.timestamp,
        data.email,
        data.region,
        data.industry,
        data.companySize,
        data.programSlug,
        data.fitBand,
        data.confidence,
        data.difficulty
      ]
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "'Match Logs'!A:I",
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    })

    console.log(`✅ Match evaluation logged for: ${data.email} | Program: ${data.programSlug} | Fit: ${data.fitBand}`)
    return { success: true }
  } catch (error) {
    console.error("❌ Error saving match evaluation to Google Sheets:", error)
    return { success: false, error }
  }
}

export interface AlertJob {
  rowIndex: number;
  timestamp: string;
  programSlug: string;
  severity: "minor" | "major" | "critical";
  status: string;
  processedCount: number;
}

export async function queueAlertJob(programSlug: string, severity: "minor" | "major" | "critical") {
  try {
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID missing")

    const meta = await sheets.spreadsheets.get({ spreadsheetId })
    const sheetExists = meta.data.sheets?.some(s => s.properties?.title === "AlertJobsQueue")

    if (!sheetExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: "AlertJobsQueue"
                }
              }
            }
          ]
        }
      })
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: "AlertJobsQueue!A1:E1",
        valueInputOption: "RAW",
        requestBody: {
          values: [["Timestamp", "Program Slug", "Severity", "Status", "Processed Count"]]
        }
      })
    }

    const values = [[
      new Date().toISOString(),
      programSlug,
      severity,
      "pending",
      "0"
    ]]

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "AlertJobsQueue!A:E",
      valueInputOption: "RAW",
      requestBody: {
        values
      }
    })
    console.log(`✅ Queued alert job for program ${programSlug} with severity ${severity}`)
    return { success: true }
  } catch (error) {
    console.error("❌ Failed to queue alert job:", error)
    return { success: false, error }
  }
}

export async function getPendingAlertJobs(): Promise<AlertJob[]> {
  try {
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID missing")

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "AlertJobsQueue!A:E"
    })

    const rows = response.data.values || []
    const pendingJobs: AlertJob[] = []

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      if (row[3] === "pending") {
        pendingJobs.push({
          rowIndex: i,
          timestamp: row[0] || "",
          programSlug: row[1] || "",
          severity: (row[2] || "major") as any,
          status: row[3] || "",
          processedCount: Number(row[4] || 0)
        })
      }
    }

    return pendingJobs
  } catch (error) {
    console.error("❌ Failed to fetch pending alert jobs:", error)
    return []
  }
}

export async function updateAlertJobStatus(rowIndex: number, status: string, processedCount: number) {
  try {
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID missing")
    const sheetRowNumber = rowIndex + 1

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `AlertJobsQueue!D${sheetRowNumber}:E${sheetRowNumber}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[status, String(processedCount)]]
      }
    })
    return { success: true }
  } catch (error) {
    console.error(`❌ Failed to update alert job status at row ${rowIndex}:`, error)
    return { success: false, error }
  }
}

export interface AlertLeadData {
  timestamp: string
  email: string
  province: string
  industry: string
  source: string
}

const ALERTS_LEADS_HEADERS = ["Timestamp", "Email", "Province", "Industry", "Source"]

export async function ensureAlertsLeadsSheet(sheets: any, spreadsheetId: string) {
  const SHEET_TITLE = "Alerts Leads"
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  })

  const exists = spreadsheet.data.sheets?.some((sheet: any) => sheet.properties?.title === SHEET_TITLE)

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
    })
  }

  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_TITLE}!A1:E1`,
  })

  const header = headerResponse.data.values?.[0] || []
  if (header.join("|") !== ALERTS_LEADS_HEADERS.join("|")) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_TITLE}!A1:E1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [ALERTS_LEADS_HEADERS],
      },
    })
  }
}

export async function appendAlertLeadToSheet(data: Omit<AlertLeadData, 'timestamp'>) {
  try {
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    if (!spreadsheetId) {
      throw new Error("GOOGLE_SHEET_ID environment variable is missing")
    }

    await ensureAlertsLeadsSheet(sheets, spreadsheetId)

    const values = [
      [
        new Date().toISOString(),
        data.email,
        data.province,
        data.industry,
        data.source
      ]
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "'Alerts Leads'!A:E",
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    })

    console.log(`✅ Alert lead saved: ${data.email} (${data.industry}/${data.province})`)
    return { success: true }
  } catch (error) {
    console.error("❌ Error saving alert lead to Google Sheets:", error)
    return { success: false, error }
  }
}

export interface OutreachSentLeadData {
  timestamp: string
  companyName: string
  domain: string
  email: string
  decisionMaker?: string
  intentScore: number
  fundingConfidencePct: number
  outreachStage: string
  subject: string
  recommendedGuides: string
  status: string
  provider?: string
  providerMessageId?: string
  providerAcceptance?: string
}

const OUTREACH_SENT_LEADS_HEADERS = [
  "Sent Timestamp",
  "Company Name",
  "Domain",
  "Recipient Email",
  "Decision Maker",
  "Intent Score",
  "Funding Confidence %",
  "Outreach Stage",
  "Subject",
  "Recommended Guides",
  "Status",
  "Provider",
  "Provider Message ID",
  "Provider Acceptance"
]

export async function ensureOutreachSentLeadsSheet(sheets: any, spreadsheetId: string) {
  const SHEET_TITLE = "Outreach Leads"
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  })

  const exists = spreadsheet.data.sheets?.some((sheet: any) => sheet.properties?.title === SHEET_TITLE)

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
    })
  }

  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_TITLE}!A1:N1`,
  })

  const header = headerResponse.data.values?.[0] || []
  if (header.join("|") !== OUTREACH_SENT_LEADS_HEADERS.join("|")) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_TITLE}!A1:N1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [OUTREACH_SENT_LEADS_HEADERS],
      },
    })
  }
}

export async function appendOutreachSentLeadToSheet(data: OutreachSentLeadData) {
  try {
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    if (!spreadsheetId) {
      throw new Error("GOOGLE_SHEET_ID environment variable is missing")
    }

    await ensureOutreachSentLeadsSheet(sheets, spreadsheetId)

    const values = [
      [
        data.timestamp,
        data.companyName || "N/A",
        data.domain || "N/A",
        data.email,
        data.decisionMaker || "N/A",
        data.intentScore || 0,
        data.fundingConfidencePct || 0,
        data.outreachStage || "b2b_day1",
        data.subject || "N/A",
        data.recommendedGuides || "N/A",
        data.status || "SENT (24x7 VERCEL AUTOPILOT)",
        data.provider || "",
        data.providerMessageId || "",
        data.providerAcceptance || "",
      ]
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "'Outreach Leads'!A:N",
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    })

    console.log(`✅ Outreach Lead appended to "Outreach Leads" tab for ${data.email}`)
    return { success: true }
  } catch (error) {
    console.error("❌ Error appending outreach lead to Google Sheets:", error)
    return { success: false, error }
  }
}

export async function updateOutreachSentLeadFromDeliveryEvent(
  providerMessageId: string,
  eventType: string
) {
  if (!providerMessageId) return { updated: false }
  const sheets = await getGoogleSheetsClient()
  const spreadsheetId = process.env.GOOGLE_SHEET_ID
  if (!spreadsheetId) throw new Error('GOOGLE_SHEET_ID environment variable is missing')
  await ensureOutreachSentLeadsSheet(sheets, spreadsheetId)
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'Outreach Leads'!A2:N",
  })
  const rows = response.data.values || []
  const index = rows.findIndex((row) => row[12] === providerMessageId)
  if (index < 0) return { updated: false }
  const statusByEvent: Record<string, string> = {
    'email.delivered': 'DELIVERED',
    'email.opened': 'OPENED',
    'email.clicked': 'CLICKED',
    'email.bounced': 'BOUNCED',
    'email.complained': 'COMPLAINED',
  }
  const status = statusByEvent[eventType]
  if (!status) return { updated: false }
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'Outreach Leads'!K${index + 2}`,
    valueInputOption: 'RAW',
    requestBody: { values: [[status]] },
  })
  return { updated: true }
}

// ── Outreach Prospects Database Tab for Backlinks Campaign ──

export interface OutreachProspect {
  rowIndex: number;
  website: string;
  prospectName: string;
  email: string;
  targetPage: string;
  name: string;
  personalizedHook: string;
  status: string;
  sentAt: string | null;
  deliveryStatus: string | null;
  replied: boolean;
  positiveConversation: boolean;
  backlinkEarned: boolean;
  prospectId?: string;
  campaignId?: string;
  source?: string;
  sourceUrl?: string;
  createdAt?: string;
  providerMessageId?: string;
  deliveredAt?: string;
  repliedAt?: string;
  checkoutAt?: string;
  paymentId?: string;
  revenue?: string;
}

const OUTREACH_PROSPECTS_HEADERS = [
  "Website",
  "Prospect Name",
  "Email",
  "Target Page",
  "Name",
  "Personalized Hook",
  "Status",
  "Sent At",
  "Delivery Status",
  "Replied",
  "Positive Conversation",
  "Backlink Earned",
  "Prospect ID",
  "Campaign ID",
  "Source",
  "Source URL",
  "Created At",
  "Provider Message ID",
  "Delivered At",
  "Replied At",
  "Checkout At",
  "Payment ID",
  "Revenue"
];

export async function ensureOutreachProspectsSheet(sheets: any, spreadsheetId: string) {
  const SHEET_TITLE = "OutreachProspects";
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  });

  const exists = spreadsheet.data.sheets?.some((sheet: any) => sheet.properties?.title === SHEET_TITLE);

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
    range: `${SHEET_TITLE}!A1:W1`,
  });

  const header = headerResponse.data.values?.[0] || [];
  if (header.join("|") !== OUTREACH_PROSPECTS_HEADERS.join("|")) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_TITLE}!A1:W1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [OUTREACH_PROSPECTS_HEADERS],
      },
    });
  }
}

export async function getOutreachProspectsFromSheet(options?: { strict?: boolean }): Promise<OutreachProspect[]> {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID missing");

    await ensureOutreachProspectsSheet(sheets, spreadsheetId);

    const rows = await getCachedSheetValues("OutreachProspects!A:W");
    const prospects: OutreachProspect[] = [];

    // Skip header row
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      prospects.push({
        rowIndex: i - 1, // 0-based data index (maps to sheet row i + 1)
        website: row[0] || "",
        prospectName: row[1] || "",
        email: row[2] || "",
        targetPage: row[3] || "",
        name: row[4] || "",
        personalizedHook: row[5] || "",
        status: row[6] || "pending",
        sentAt: row[7] || null,
        deliveryStatus: row[8] || null,
        replied: row[9] === "TRUE" || row[9] === "true",
        positiveConversation: row[10] === "TRUE" || row[10] === "true",
        backlinkEarned: row[11] === "TRUE" || row[11] === "true",
        prospectId: row[12] || "",
        campaignId: row[13] || "",
        source: row[14] || "",
        sourceUrl: row[15] || "",
        createdAt: row[16] || "",
        providerMessageId: row[17] || "",
        deliveredAt: row[18] || "",
        repliedAt: row[19] || "",
        checkoutAt: row[20] || "",
        paymentId: row[21] || "",
        revenue: row[22] || "",
      });
    }

    return prospects;
  } catch (error) {
    console.error("❌ Failed to fetch outreach prospects from Google Sheets:", error);
    if (options?.strict) throw error;
    return [];
  }
}

export async function updateOutreachProspectInSheet(
  rowIndex: number,
  updates: Partial<Omit<OutreachProspect, "rowIndex">>
) {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID missing");

    // Row index is 0-based data row. Sheet row = data index + 2 (account for 1-based index and header row).
    const sheetRowNumber = rowIndex + 2;

    // Get the current row values to patch
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `OutreachProspects!A${sheetRowNumber}:W${sheetRowNumber}`,
    });

    const currentRow = response.data.values?.[0] || [];

    const website = updates.website !== undefined ? updates.website : (currentRow[0] || "");
    const prospectName = updates.prospectName !== undefined ? updates.prospectName : (currentRow[1] || "");
    const email = updates.email !== undefined ? updates.email : (currentRow[2] || "");
    const targetPage = updates.targetPage !== undefined ? updates.targetPage : (currentRow[3] || "");
    const name = updates.name !== undefined ? updates.name : (currentRow[4] || "");
    const personalizedHook = updates.personalizedHook !== undefined ? updates.personalizedHook : (currentRow[5] || "");
    const status = updates.status !== undefined ? updates.status : (currentRow[6] || "pending");
    const sentAt = updates.sentAt !== undefined ? updates.sentAt : (currentRow[7] || "");
    const deliveryStatus = updates.deliveryStatus !== undefined ? updates.deliveryStatus : (currentRow[8] || "");
    const replied = updates.replied !== undefined ? String(updates.replied).toUpperCase() : (currentRow[9] || "FALSE");
    const positiveConversation = updates.positiveConversation !== undefined ? String(updates.positiveConversation).toUpperCase() : (currentRow[10] || "FALSE");
    const backlinkEarned = updates.backlinkEarned !== undefined ? String(updates.backlinkEarned).toUpperCase() : (currentRow[11] || "FALSE");
    const prospectId = updates.prospectId !== undefined ? updates.prospectId : (currentRow[12] || "");
    const campaignId = updates.campaignId !== undefined ? updates.campaignId : (currentRow[13] || "");
    const source = updates.source !== undefined ? updates.source : (currentRow[14] || "");
    const sourceUrl = updates.sourceUrl !== undefined ? updates.sourceUrl : (currentRow[15] || "");
    const createdAt = updates.createdAt !== undefined ? updates.createdAt : (currentRow[16] || "");
    const providerMessageId = updates.providerMessageId !== undefined ? updates.providerMessageId : (currentRow[17] || "");
    const deliveredAt = updates.deliveredAt !== undefined ? updates.deliveredAt : (currentRow[18] || "");
    const repliedAt = updates.repliedAt !== undefined ? updates.repliedAt : (currentRow[19] || "");
    const checkoutAt = updates.checkoutAt !== undefined ? updates.checkoutAt : (currentRow[20] || "");
    const paymentId = updates.paymentId !== undefined ? updates.paymentId : (currentRow[21] || "");
    const revenue = updates.revenue !== undefined ? updates.revenue : (currentRow[22] || "");

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `OutreachProspects!A${sheetRowNumber}:W${sheetRowNumber}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[
          website,
          prospectName,
          email,
          targetPage,
          name,
          personalizedHook,
          status,
          sentAt,
          deliveryStatus,
          replied,
          positiveConversation,
          backlinkEarned,
          prospectId,
          campaignId,
          source,
          sourceUrl,
          createdAt,
          providerMessageId,
          deliveredAt,
          repliedAt,
          checkoutAt,
          paymentId,
          revenue
        ]],
      },
    });

    return { success: true };
  } catch (error) {
    console.error(`❌ Failed to update outreach prospect at row index ${rowIndex}:`, error);
    return { success: false, error };
  }
}

export async function seedOutreachProspects(prospects: Omit<OutreachProspect, "rowIndex">[]) {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID missing");

    await ensureOutreachProspectsSheet(sheets, spreadsheetId);

    const existingResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "OutreachProspects!A2:C",
    });
    const existingKeys = new Set(
      (existingResponse.data.values || []).map((row) => `${String(row[0] || '').toLowerCase()}|${String(row[2] || '').toLowerCase()}`)
    );
    const now = new Date().toISOString();
    const uniqueProspects = prospects.filter((p) => {
      const key = `${p.website.toLowerCase()}|${p.email.toLowerCase()}`;
      if (existingKeys.has(key)) return false;
      existingKeys.add(key);
      return true;
    });
    const values = uniqueProspects.map((p) => [
      p.website,
      p.prospectName,
      p.email,
      p.targetPage,
      p.name,
      p.personalizedHook,
      p.status,
      p.sentAt || "",
      p.deliveryStatus || "",
      String(p.replied).toUpperCase(),
      String(p.positiveConversation).toUpperCase(),
      String(p.backlinkEarned).toUpperCase(),
      p.prospectId || randomUUID(),
      p.campaignId || "authority_discovery_v1",
      p.source || "authority_discovery",
      p.sourceUrl || p.website,
      p.createdAt || now,
      p.providerMessageId || "",
      p.deliveredAt || "",
      p.repliedAt || "",
      p.checkoutAt || "",
      p.paymentId || "",
      p.revenue || "",
    ]);

    if (values.length === 0) {
      return { success: true, inserted: 0, duplicateCount: prospects.length };
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "OutreachProspects!A:W",
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    console.log(`✅ Seeded ${values.length} prospects into "OutreachProspects" tab.`);
    return { success: true, inserted: values.length, duplicateCount: prospects.length - values.length };
  } catch (error) {
    console.error("❌ Failed to seed outreach prospects:", error);
    return { success: false, error };
  }
}

/** Applies a signed provider event to the exact outbound message that produced it. */
export async function updateOutreachProspectFromDeliveryEvent(
  providerMessageId: string,
  eventType: string,
  occurredAt: string
) {
  if (!providerMessageId) return { updated: false };
  const prospects = await getOutreachProspectsFromSheet();
  const prospect = prospects.find((item) => item.providerMessageId === providerMessageId);
  if (!prospect) return { updated: false };

  if (eventType === 'email.delivered') {
    return updateOutreachProspectInSheet(prospect.rowIndex, {
      status: 'delivered',
      deliveryStatus: 'delivered',
      deliveredAt: occurredAt,
    });
  }
  if (eventType === 'email.bounced' || eventType === 'email.complained') {
    return updateOutreachProspectInSheet(prospect.rowIndex, {
      status: eventType === 'email.bounced' ? 'bounced' : 'complained',
      deliveryStatus: eventType,
    });
  }
  return { updated: false };
}

// ═══════════════════════════════════════════════════════════════════════════════
// AUTHORITY ENGINE — Google Sheets Integration (Phase 3)
// ═══════════════════════════════════════════════════════════════════════════════

export interface AuthorityExceptionRecord {
  id: string
  prospectEmail: string
  prospectName: string
  website: string
  draftSubject: string
  failedChecks: string
  status: string
  ceoNotes: string
  createdAt: string
  resolvedAt: string
}

const AUTHORITY_EXCEPTIONS_HEADERS = [
  "ID",
  "Prospect Email",
  "Prospect Name",
  "Website",
  "Draft Subject",
  "Failed Checks",
  "Status",
  "CEO Notes",
  "Created At",
  "Resolved At"
];

export async function ensureAuthorityExceptionsSheet(sheets: any, spreadsheetId: string) {
  const SHEET_TITLE = "AuthorityExceptions";
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  });

  const exists = spreadsheet.data.sheets?.some((sheet: any) => sheet.properties?.title === SHEET_TITLE);

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: SHEET_TITLE } } }],
      },
    });
  }

  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_TITLE}!A1:J1`,
  });

  const header = headerResponse.data.values?.[0] || [];
  if (header.join("|") !== AUTHORITY_EXCEPTIONS_HEADERS.join("|")) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_TITLE}!A1:J1`,
      valueInputOption: "RAW",
      requestBody: { values: [AUTHORITY_EXCEPTIONS_HEADERS] },
    });
  }
}

export async function appendAuthorityException(data: AuthorityExceptionRecord): Promise<{ success: boolean; error?: any }> {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID missing");

    await ensureAuthorityExceptionsSheet(sheets, spreadsheetId);

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "AuthorityExceptions!A:J",
      valueInputOption: "RAW",
      requestBody: {
        values: [[
          data.id,
          data.prospectEmail,
          data.prospectName,
          data.website,
          data.draftSubject,
          data.failedChecks,
          data.status,
          data.ceoNotes,
          data.createdAt,
          data.resolvedAt
        ]],
      },
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Failed to append authority exception:", error);
    return { success: false, error };
  }
}

export async function getAuthorityExceptions(): Promise<AuthorityExceptionRecord[]> {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID missing");

    await ensureAuthorityExceptionsSheet(sheets, spreadsheetId);

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "AuthorityExceptions!A:J",
    });

    const rows = response.data.values || [];
    const records: AuthorityExceptionRecord[] = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      records.push({
        id: row[0] || "",
        prospectEmail: row[1] || "",
        prospectName: row[2] || "",
        website: row[3] || "",
        draftSubject: row[4] || "",
        failedChecks: row[5] || "",
        status: row[6] || "pending",
        ceoNotes: row[7] || "",
        createdAt: row[8] || "",
        resolvedAt: row[9] || ""
      });
    }

    return records;
  } catch (error) {
    console.error("❌ Failed to fetch authority exceptions:", error);
    return [];
  }
}

export async function updateAuthorityException(
  exceptionId: string,
  updates: { status?: string; ceoNotes?: string; resolvedAt?: string }
): Promise<{ success: boolean; error?: any }> {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID missing");

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "AuthorityExceptions!A:J",
    });

    const rows = response.data.values || [];
    let targetRowIndex = -1;

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === exceptionId) {
        targetRowIndex = i;
        break;
      }
    }

    if (targetRowIndex === -1) {
      return { success: false, error: `Exception ${exceptionId} not found` };
    }

    const currentRow = rows[targetRowIndex];
    const sheetRowNumber = targetRowIndex + 1;

    const updatedRow = [
      currentRow[0] || "",
      currentRow[1] || "",
      currentRow[2] || "",
      currentRow[3] || "",
      currentRow[4] || "",
      currentRow[5] || "",
      updates.status !== undefined ? updates.status : (currentRow[6] || "pending"),
      updates.ceoNotes !== undefined ? updates.ceoNotes : (currentRow[7] || ""),
      currentRow[8] || "",
      updates.resolvedAt !== undefined ? updates.resolvedAt : (currentRow[9] || "")
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `AuthorityExceptions!A${sheetRowNumber}:J${sheetRowNumber}`,
      valueInputOption: "RAW",
      requestBody: { values: [updatedRow] },
    });

    return { success: true };
  } catch (error) {
    console.error(`❌ Failed to update authority exception ${exceptionId}:`, error);
    return { success: false, error };
  }
}
