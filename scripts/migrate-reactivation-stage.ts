import { config } from 'dotenv';
config({ path: '.env.local' });

import { google } from 'googleapis';
import { getGoogleSheetsClient } from '../lib/google-sheets';

async function migrate() {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID is missing");

    console.log('📡 Fetching leads from Google Sheet...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Leads!A2:BO',
    });

    const rows = response.data.values || [];
    console.log(`📊 Total rows retrieved: ${rows.length}`);

    const emailIndex = 2; // Column C
    const leadActivityIndex = 51; // Column AZ (AZ is column index 51)

    let updateCount = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const email = row[emailIndex] || '';
      const leadActivityStr = row[leadActivityIndex] || '';
      const rowNum = i + 2;

      if (!email || !leadActivityStr || leadActivityStr === 'N/A' || leadActivityStr === '{}') continue;

      try {
        const activity = JSON.parse(leadActivityStr);
        // We look for leads sent in Batch 1 (June 17) which are in stage "day0" but have a recent reactivationSentAt
        if (
          activity.experimentTag === "historical_reactivation_batch_001" && 
          activity.reactivationStage === "day0" &&
          activity.reactivationSentAt !== "2026-06-17T00:00:00.000Z"
        ) {
          activity.reactivationSentAt = "2026-06-17T00:00:00.000Z";
          
          console.log(`🔄 [Row ${rowNum}] Setting ${email} reactivationSentAt to June 17, 2026...`);
          
          const range = `Leads!AZ${rowNum}`;
          await sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
              values: [[JSON.stringify(activity)]],
            },
          });

          updateCount++;
          // Safe rate-limit cooldown
          await new Promise(resolve => setTimeout(resolve, 800));
        }
      } catch (err) {
        console.error(`❌ Error parsing lead activity for row ${rowNum}:`, err);
      }
    }

    console.log(`✅ Migration complete. Updated ${updateCount} leads to "day0".`);
  } catch (err) {
    console.error('❌ Migration failed:', err);
  }
}

migrate();
