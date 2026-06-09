import { config } from 'dotenv';
config({ path: '/Users/ashwanikumar/Downloads/canadablog/.env.local' });
import { getGoogleSheetsClient } from '../lib/google-sheets';

async function updateHeaders() {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID is missing');
    }

    // Read current first row to preserve existing headers
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Leads!1:1',
    });

    const row = response.data.values?.[0] || [];

    // Ensure array is padded up to index 54 (Column BC)
    while (row.length < 55) {
      row.push('');
    }

    // Set/Update headers for Columns AQ to BC (indices 42 to 54)
    row[42] = 'Login Token';
    row[43] = 'Subscription Status';
    row[44] = 'Subscription ID';
    row[45] = 'Trial Started At';
    row[46] = 'Website';
    row[47] = 'Company Name';
    row[48] = 'Report Purchased';
    row[49] = 'Report Transaction ID';
    row[50] = 'Last Email Followup';
    row[51] = 'Lead Activity';
    row[52] = 'Last Attribution Source';
    row[53] = 'First Report Viewed At';
    row[54] = 'Assessment Purchased At';

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Leads!A1:BC1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });
    console.log('✅ Google Sheets database headers updated successfully.');
  } catch (err) {
    console.error('Error updating headers:', err);
  }
}

updateHeaders();
