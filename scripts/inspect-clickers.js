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

  return google.sheets({ version: "v4", auth });
}

function isValidValue(val) {
  if (!val) return false;
  const s = String(val).trim().toLowerCase();
  return s !== '' && s !== 'n/a' && s !== 'undefined' && s !== 'null';
}

async function inspectClickers() {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID is missing in env');
    }

    console.log('📡 Fetching leads from Google Sheet...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Leads!A2:BO',
    });

    const rows = response.data.values || [];
    console.log(`📊 Total rows retrieved from spreadsheet: ${rows.length}`);

    const clickers = [];

    rows.forEach((row, idx) => {
      const email = row[2] || '';
      const lastClickedAt = row[37] || '';
      const lastAlertClickedAt = row[57] || '';
      const lastAlertClickAt = row[61] || '';
      const leadActivityStr = row[51] || '{}';
      
      const hasClicked = isValidValue(lastClickedAt) || 
                         isValidValue(lastAlertClickedAt) || 
                         isValidValue(lastAlertClickAt);

      if (hasClicked) {
        clickers.push({
          rowNum: idx + 2,
          email,
          company: row[47] || 'N/A',
          name: row[3] || 'N/A',
          lastClickedAt,
          lastAlertClickedAt,
          lastAlertClickAt,
          loginToken: row[42] || '',
          unsubscribeToken: row[34] || '',
          leadActivity: leadActivityStr,
          reportPurchased: row[48] || 'No',
          strategyReportPurchased: row[65] || 'No',
          assessmentPurchasedAt: row[54] || 'N/A'
        });
      }
    });

    console.log(`\n🔍 Found ${clickers.length} leads with valid click timestamps:\n`);
    clickers.forEach((c) => {
      console.log(`--------------------------------------------------------------------------------`);
      console.log(`[Row ${c.rowNum}] Email: ${c.email} | Company: ${c.company} | Name: ${c.name}`);
      console.log(`  Login Token: ${c.loginToken || '<empty>'}`);
      console.log(`  Unsubscribe Token: ${c.unsubscribeToken || '<empty>'}`);
      console.log(`  Last Clicked At: ${c.lastClickedAt || 'N/A'}`);
      console.log(`  Last Alert Clicked At: ${c.lastAlertClickedAt || 'N/A'}`);
      console.log(`  Last Alert Click At: ${c.lastAlertClickAt || 'N/A'}`);
      console.log(`  Report Purchased: ${c.reportPurchased} | Strategy Report Purchased: ${c.strategyReportPurchased}`);
      console.log(`  Assessment Purchased At: ${c.assessmentPurchasedAt}`);
      console.log(`  Lead Activity: ${c.leadActivity}`);
    });
    console.log(`--------------------------------------------------------------------------------`);

  } catch (err) {
    console.error('❌ Error inspecting clickers:', err);
  }
}

inspectClickers();
