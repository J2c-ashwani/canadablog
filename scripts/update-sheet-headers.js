const { google } = require('googleapis');
require('dotenv').config({ path: '/Users/ashwanikumar/Downloads/canadablog/.env.local' });

async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return sheets;
}

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

    // Ensure array is padded up to index 64 (Column BM)
    while (row.length < 65) {
      row.push('');
    }

    // Set/Update headers for Columns AQ to BM (indices 42 to 64)
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
    row[55] = 'Last Alert Sent At';
    row[56] = 'Last Alert Opened At';
    row[57] = 'Last Alert Clicked At';
    row[58] = 'Last Login At';
    row[59] = 'Last Dashboard View At';
    row[60] = 'Last Portfolio View At';
    row[61] = 'Last Alert Click At';
    row[62] = 'Lead Tier';
    row[63] = 'Subscription Cancelled At';
    row[64] = 'Cancellation Reason';

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Leads!A1:BM1',
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
