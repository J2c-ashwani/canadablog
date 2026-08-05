import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getGoogleSheetsClient } from "@/lib/google-sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FAILED_LOG_PATH = path.join(process.cwd(), "lib/data/failed-purchases.json");
const SHEET_TITLE = "Product Purchases";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== "fsi2026admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!fs.existsSync(FAILED_LOG_PATH)) {
    return NextResponse.json({ message: "No local failed purchases log file exists. All records are synced." });
  }

  let failedRecords: any[] = [];
  try {
    const fileContent = fs.readFileSync(FAILED_LOG_PATH, "utf8");
    failedRecords = JSON.parse(fileContent);
  } catch (e: any) {
    return NextResponse.json({ error: `Failed to parse backup log: ${e.message}` }, { status: 500 });
  }

  if (!Array.isArray(failedRecords) || failedRecords.length === 0) {
    return NextResponse.json({ message: "No pending un-synced purchases found in backup log." });
  }

  const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID || "1GAt0DTPzPAQXI9j4JwtlFLhLw4fTzf2XmMHttytu9To";

  const syncedIds: string[] = [];
  const remainingRecords: any[] = [];

  try {
    const sheets = await getGoogleSheetsClient();

    for (const record of failedRecords) {
      try {
        const row = [
          record.purchaseId || "",
          record.email || "",
          record.name || "",
          record.productId || "",
          record.amount || "",
          record.paypalOrderId || "",
          record.accessToken || "",
          typeof record.profileData === "string" ? record.profileData : JSON.stringify(record.profileData || {}),
          record.createdAt || new Date().toISOString(),
          record.status || "completed",
          record.landingPage || "",
          record.referrer || "",
          record.utmSource || "",
          record.utmMedium || "",
          record.utmCampaign || "",
          record.lastTouchPage || "",
          record.lastTouchReferrer || "",
          record.device || "",
          record.browser || "",
          record.country || "",
        ];

        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: `${SHEET_TITLE}!A:T`,
          valueInputOption: "RAW",
          requestBody: { values: [row] },
        });

        syncedIds.push(record.purchaseId || record.paypalOrderId);
        console.log(`✅ Replayed and synced purchase record to Google Sheets: ${record.purchaseId}`);
      } catch (err: any) {
        console.error(`⚠️ Failed to replay purchase ${record.purchaseId}:`, err?.message || err);
        remainingRecords.push(record);
      }
    }

    // Write back any remaining failed records (rotation)
    fs.writeFileSync(FAILED_LOG_PATH, JSON.stringify(remainingRecords, null, 2), "utf8");

    return NextResponse.json({
      success: true,
      replayedCount: syncedIds.length,
      remainingCount: remainingRecords.length,
      syncedIds,
      message: `Replayed ${syncedIds.length} purchase records to Google Sheets database.`,
    });
  } catch (sheetErr: any) {
    console.error("❌ Replay cron failed to connect to Google Sheets:", sheetErr);
    return NextResponse.json({ error: sheetErr.message || String(sheetErr) }, { status: 500 });
  }
}
