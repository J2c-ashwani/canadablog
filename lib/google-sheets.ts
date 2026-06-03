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
      ],
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Leads!A:Z",
      valueInputOption: "RAW",
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
  }

  const intelligence = calculateLeadIntelligence(base)

  return {
    ...base,
    score: Number(row[13]) || intelligence.score,
    tier: row[14] || intelligence.tier,
    estimatedValue: row[15] || intelligence.estimatedValue,
    buyerSegment: row[16] || intelligence.buyerSegment,
    routing: row[17] || intelligence.routing,
    consentStatus: row[18] || intelligence.consentStatus,
    consentToPartnerContact: base.consentToPartnerContact || intelligence.consentStatus === "partner-consent",
    qualificationNotes: row[25] || intelligence.qualificationNotes,
  }
}

export async function getLeadsFromSheet(limit = 500) {
  const sheets = await getGoogleSheetsClient()
  const spreadsheetId = process.env.GOOGLE_SHEET_ID

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Leads!A:Z",
  })

  const rows = response.data.values || []
  return rows
    .filter((row) => row[0] && row[2] && row[2] !== "Email")
    .map((row) => parseSheetLead(row as string[]))
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
export async function captureEmailLead(email: string, source: string, name?: string) {
  return appendLeadToSheet({
    source,
    timestamp: new Date().toISOString(),
    email,
    name,
  })
}
