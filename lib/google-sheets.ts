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
      ],
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Leads!A:AG",
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
    gaClientId: row[30] || "N/A",
    offlineStatus: row[31] || "Lead",
    actualSignedValue: row[32] || "N/A",
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
    range: "Leads!A:AG",
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
  gaClientId?: string
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
  })
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

