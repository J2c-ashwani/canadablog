import { google } from "googleapis"

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
export async function appendLeadToSheet(data: {
  source: string // NEW: Track where the lead came from
  timestamp: string
  email: string
  name?: string
  companyName?: string
  country?: string
  state?: string
  industry?: string
  businessStage?: string
  fundingAmount?: string
  fundingPurpose?: string
  businessDescription?: string
  phone?: string
  additionalNotes?: string
}) {
  try {
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

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
      ],
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Leads!A:M",
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

// Quick function for simple email capture (newsletter, etc.)
export async function captureEmailLead(email: string, source: string, name?: string) {
  return appendLeadToSheet({
    source,
    timestamp: new Date().toISOString(),
    email,
    name,
  })
}
