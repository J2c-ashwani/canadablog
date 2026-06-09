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
      ],
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Leads!A:BC",
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
    range: "Leads!A:BC",
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
      range: "Leads!A:BC",
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
    
    // Ensure array length covers BC (index 54)
    while (targetRow.length < 55) {
      targetRow.push("N/A")
    }
    
    // Update fields
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
    
    // Update the row
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Leads!A${sheetRowNumber}:BC${sheetRowNumber}`,
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

