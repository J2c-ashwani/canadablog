import { google } from "googleapis"
import {
  calculateLeadIntelligence,
  LEAD_CONSENT_TEXT,
  LEAD_CONSENT_VERSION,
  type LeadCaptureData,
} from "@/lib/leads/scoring"

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

export async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  })

  const sheets = google.sheets({ version: "v4", auth })
  return sheets
}

// Unified lead capture with source tracking
export async function appendLeadToSheet(data: LeadCaptureData) {
  try {
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    const consentVersion = data.consentVersion || LEAD_CONSENT_VERSION
    const consentText = data.consentText || LEAD_CONSENT_TEXT
    const intelligence = calculateLeadIntelligence({
      ...data,
      consentVersion,
      consentText,
    })

    const cleanPhone = (data.phone || "").replace(/[^0-9]/g, "")
    const firstName = (data.name || "").split(" ")[0] || "there"
    
    // Dynamically adjust country adjective for B2B relevance
    const countryLower = (data.country || "").toLowerCase()
    let countryPhrase = "active grants & loans"
    if (countryLower.includes("united states") || countryLower.includes("us")) {
      countryPhrase = "active US grants & loans"
    } else if (countryLower.includes("canada")) {
      countryPhrase = "active Canadian grants & loans"
    }

    const waMessage = `Hi ${firstName}, Ashwani here from FSI Digital. I reviewed your business funding inquiry. Based on your profile, we can prepare a custom Funding Roadmap matching you to ${countryPhrase}.\n\nYou can lock in your 2-hour research audit and secure your Strategy Session slot here: https://www.fsidigital.ca/consultation?source=whatsapp\n\nIf our research shows you don't qualify for any active programs, we refund the $199 immediately (100% risk-free). Let me know if you have any questions!`
    const waLink = cleanPhone 
      ? `=HYPERLINK("https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}", "WhatsApp Chat")` 
      : "N/A"

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
        data.fundingPurpose || "N/A",
        data.businessDescription || "N/A",
        data.phone || "N/A",
        data.additionalNotes || "N/A",
        intelligence.score,
        intelligence.tier,
        intelligence.estimatedValue,
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
        data.isSubscribed !== false ? "Yes" : "No",
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

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Leads!A:BW",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    })


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
    isSubscribed: row[33] ? String(row[33]).toLowerCase() !== "no" : true,
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
  }


  const intelligence = calculateLeadIntelligence(base)

  return {
    ...base,
    score: intelligence.score,
    tier: intelligence.tier,
    estimatedValue: intelligence.estimatedValue,
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
  const sheets = await getGoogleSheetsClient()
  const spreadsheetId = process.env.GOOGLE_SHEET_ID

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Leads!A:BO",
  })


  const rows = response.data.values || []
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
      range: "Leads!A:BU",
    })
    
    const rows = response.data.values || []
    const emailColIndex = 2 // Leads!C is Column 3 (0-indexed 2)
    
    const rowIndex = rows.findIndex((row) => row[emailColIndex] === email)
    if (rowIndex === -1) {
      console.warn(`⚠️ Lead with email ${email} not found in sheet.`)
      return { success: false, error: "Not found" }
    }
    
    const sheetRowNumber = rowIndex + 1
    const targetRow = rows[rowIndex]
    
    // Ensure array length covers BV (index 73)
    while (targetRow.length < 74) {
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
      targetRow[9] = updates.fundingPurpose
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
    
    // Update the row
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Leads!A${sheetRowNumber}:BV${sheetRowNumber}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [targetRow],
      },
    })
    
    console.log(`✅ Lead ${email} updated at row ${sheetRowNumber}`)
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
      range: "Partner Payments!A:Q",
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
      range: "Partner Payments!A:Q",
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
      range: "Partner Inquiries!A:Z",
      valueInputOption: "USER_ENTERED",
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
      range: "Match Logs!A:I",
      valueInputOption: "USER_ENTERED",
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
        valueInputOption: "USER_ENTERED",
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
      valueInputOption: "USER_ENTERED",
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
      valueInputOption: "USER_ENTERED",
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
      range: "Alerts Leads!A:E",
      valueInputOption: "USER_ENTERED",
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

