import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { getGoogleSheetsClient } from '../lib/google-sheets';

async function main() {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) throw new Error('Missing GOOGLE_SHEET_ID in environment');

  const sheets = await getGoogleSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Leads!A1:AH300',
  });

  const rows = res.data.values || [];
  console.log(`📊 Fetched ${rows.length} rows from Leads sheet.`);

  if (rows.length <= 1) {
    console.log('No data rows to update.');
    return;
  }

  // Row 1 is header. Data starts at row index 1 (Sheet row 2).
  const updates: string[][] = [];
  let updatedCount = 0;
  let skippedNo = 0;
  let alreadyYes = 0;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const email = (row[2] || '').trim();
    const currentColAH = (row[33] || '').trim();

    if (currentColAH.toLowerCase() === 'no') {
      updates.push(['No']);
      skippedNo++;
    } else if (currentColAH.toLowerCase() === 'yes') {
      updates.push(['Yes']);
      alreadyYes++;
    } else if (email && email.includes('@')) {
      // Historical lead without explicit opt-out
      updates.push(['Yes']);
      updatedCount++;
    } else {
      updates.push(['N/A']);
    }
  }

  const endRow = 1 + updates.length;
  console.log(`\nReady to write ${updates.length} rows to Leads!AH2:AH${endRow}`);
  console.log(`  Updating from empty to "Yes": ${updatedCount}`);
  console.log(`  Keeping explicit "No": ${skippedNo}`);
  console.log(`  Already "Yes": ${alreadyYes}`);

  if (updatedCount > 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Leads!AH2:AH${endRow}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: updates,
      },
    });
    console.log(`\n✅ Successfully updated ${updatedCount} leads to isSubscribed = "Yes" in Google Sheets!`);
  } else {
    console.log('\nNo updates needed.');
  }
}

main().catch(err => {
  console.error('❌ Error executing batch update:', err);
  process.exit(1);
});
