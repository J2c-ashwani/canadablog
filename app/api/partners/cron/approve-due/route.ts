import { type NextRequest, NextResponse } from "next/server"
import { getGoogleSheetsClient } from "@/lib/google-sheets"
import { sendPartnerApprovalEmailAndAlert } from "@/lib/emails/partner-inquiry"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const DELAY_MS = 15 * 60 * 1000 // 15-minute simulated compliance review delay
const MAX_SENDS_PER_RUN = 10

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET

  if (!secret && process.env.NODE_ENV !== "production") {
    return true
  }

  if (!secret) {
    return false
  }

  const authHeader = request.headers.get("authorization") || ""
  const headerSecret = request.headers.get("x-cron-secret") || ""
  const querySecret = request.nextUrl.searchParams.get("secret") || ""

  return authHeader === `Bearer ${secret}` || headerSecret === secret || querySecret === secret
}

export async function GET(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized cron run." }, { status: 401 })
    }

    const force = request.nextUrl.searchParams.get("force") === "true"
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    if (!spreadsheetId) {
      return NextResponse.json({ error: "GOOGLE_SHEET_ID is missing" }, { status: 500 })
    }

    // Fetch B2B partner inquiries
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Partner Inquiries!A:V",
    })

    const rows = response.data.values || []
    if (rows.length <= 1) {
      return NextResponse.json({ success: true, message: "No B2B partner records found." })
    }

    const now = Date.now()
    const processed: Array<{ email: string; companyName: string }> = []
    const failed: Array<{ email: string; error: string }> = []

    // Loop rows (skipping header at index 0)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      const timestampStr = row[0] || ""
      const email = row[2] || ""
      const approvalSent = row[19] || "No"

      if (!email || approvalSent === "Yes") {
        continue
      }

      // Check simulated delay
      const createdAt = new Date(timestampStr).getTime()
      if (!force && Number.isFinite(createdAt) && now - createdAt < DELAY_MS) {
        continue
      }

      // Hit cap of sends per cron run to avoid rate-limits
      if (processed.length >= MAX_SENDS_PER_RUN) {
        break
      }

      // Send Delayed Approval email + Internal notification alert
      const mailResult = await sendPartnerApprovalEmailAndAlert({
        to: email.trim().toLowerCase(),
        name: row[1] || "Partner",
        companyName: row[4] || "N/A",
        leadType: row[6] || "All / Mixed Funding Leads",
        geography: row[7] || "Canada & United States",
        score: Number(row[13]) || 0,
        phone: row[3] || "N/A",
        website: row[5] || "N/A",
        existingVolume: row[8] || "None (Just starting)",
        budget: row[9] || "$1,000-$5,000",
        purchaseModel: row[10] || "Cost Per Lead (CPL) - Shared Leads",
        decisionMakerRole: row[11] || "Other",
        preferences: row[12] || "N/A",
      })

      if (mailResult.success) {
        // Update the 'Approval Sent' cell in the sheet (Column T, row is 1-indexed, i.e., i + 1)
        const rowNumber = i + 1
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `Partner Inquiries!T${rowNumber}`,
          valueInputOption: "RAW",
          requestBody: {
            values: [["Yes"]],
          },
        })
        processed.push({ email, companyName: row[4] || "N/A" })
      } else {
        failed.push({ email, error: mailResult.error || "Mail transmission failed." })
      }
    }

    return NextResponse.json({
      success: true,
      processedCount: processed.length,
      failedCount: failed.length,
      processed,
      failed,
    })
  } catch (error) {
    console.error("❌ B2B partner approval cron error:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
