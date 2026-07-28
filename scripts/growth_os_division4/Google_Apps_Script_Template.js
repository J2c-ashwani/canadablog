// ====================================================================
// Google Apps Script for Growth OS Division 4 — 24x7 Google Sheets Sync
// Paste this code into Extensions -> Apps Script inside your Google Sheet
// ====================================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // If headers don't exist, create them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Sent Timestamp",
        "Company Name",
        "Domain",
        "Recipient Email",
        "Intent Score",
        "Funding Confidence %",
        "Subject",
        "Recommended Guide",
        "Status"
      ]);
    }

    // Append sent outreach record
    sheet.appendRow([
      data.sent_at || new Date(),
      data.company_name || "",
      data.domain || "",
      data.email || "",
      data.intent_score || 0,
      data.funding_confidence_pct || 0,
      data.subject || "",
      data.recommended_guide || "",
      data.status || "SENT (VERCEL 24x7)"
    ]);

    return ContentService.createTextOutput(JSON.stringify({"result": "success"}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({"result": "error", "message": err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
