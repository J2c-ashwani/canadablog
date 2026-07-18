// scripts/migrate-mca-sheets-recovery.js
// Migration script to append 11 recovery column headers to the MCA Applications sheet in Google Sheets.

const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
  console.error('❌ Error: Missing Google Sheets credentials in .env.local');
  process.exit(1);
}

const NEW_HEADERS = [
  'Timestamp',
  'Application ID',
  'Legal Business Name',
  'Trade Name',
  'Business Registration Number',
  'Business Address',
  'City',
  'Province',
  'Postal Code',
  'Owner Name',
  'Email',
  'Phone',
  'Website',
  'Industry',
  'Years in Business',
  'Employees',
  'Monthly Revenue',
  'Funding Amount',
  'Funding Purpose',
  'File Count',
  'File Storage URLs',
  'Terms Consent',
  'Sharing Consent',
  'Priority Score',
  'Priority Band',
  'Application Status',
  'Priority Processing',
  'Priority Payment ID',
  'Partner Status',
  'Partner Outcome',
  'Revenue (CAD)',
  'Notes',
  'UTM Source',
  'UTM Medium',
  'UTM Campaign',
  'GA4 Client ID',
  'Landing Page',
  'Referrer',
  'Recovery Token',
  'Priority Recovery Status',
  'Recovery Email 1 Sent',
  'Recovery Email 2 Sent',
  'Recovery Email 3 Sent',
  'Recovery Email 4 Sent',
  'Recovery Email 5 Sent',
  'Recovery Clicked',
  'Last Recovery Email',
  'Recovery Stage',
  'Recovery Purchased',
];

async function run() {
  console.log('🏁 Starting MCA spreadsheet schema migration...');

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  try {
    // 1. Update MCA Applications headers
    console.log(`Writing complete header row to "MCA Applications" tab...`);
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'MCA Applications!A1:AW1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [NEW_HEADERS],
      },
    });
    console.log('✅ MCA Applications headers updated successfully.');

    // 2. Ensure MCA Configuration sheet exists or create it
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const existingSheets = meta.data.sheets.map((s) => s.properties.title);

    if (!existingSheets.includes('MCA Configuration')) {
      console.log('➕ Creating "MCA Configuration" sheet...');
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: { title: 'MCA Configuration' },
              },
            },
          ],
        },
      });

      console.log('📝 Writing default configuration values...');
      const defaultConfig = [
        ['Configuration Key', 'Value', 'Description'],
        ['Recovery Stage 1 Delay (Hours)', '1', 'Delay before sending Email 1'],
        ['Recovery Stage 2 Delay (Hours)', '6', 'Delay before sending Email 2'],
        ['Recovery Stage 3 Delay (Hours)', '24', 'Delay before sending Email 3'],
        ['Recovery Stage 4 Delay (Hours)', '72', 'Delay before sending Email 4 (3 days)'],
        ['Recovery Stage 5 Delay (Hours)', '168', 'Delay before sending Email 5 (7 days)'],
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'MCA Configuration!A1:C6',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: defaultConfig,
        },
      });
      console.log('✅ MCA Configuration sheet initialized.');
    } else {
      console.log('ℹ️ MCA Configuration sheet already exists. Skipping initialization.');
    }

    console.log('\n🎉 Migration completed successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  }
}

run();
