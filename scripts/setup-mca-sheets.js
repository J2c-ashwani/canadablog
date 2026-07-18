// scripts/setup-mca-sheets.js
// Utility script to automatically initialize the 6 new MCA tabs in the existing Google Sheet

const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
  console.error('❌ Error: Missing Google Sheets credentials in .env.local');
  process.exit(1);
}

const TABS = [
  {
    name: 'MCA Applications',
    headers: [
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
    ],
  },
  {
    name: 'MCA Priority Orders',
    headers: [
      'Timestamp',
      'Application ID',
      'Email',
      'PayPal Order ID',
      'Amount (CAD)',
      'Status',
      'Fulfilment Status',
      'Specialist Assigned',
      'Completed At',
    ],
  },
  {
    name: 'MCA Partner Submissions',
    headers: [
      'Timestamp',
      'Application ID',
      'Business Name',
      'Email',
      'Monthly Revenue',
      'Funding Requested',
      'Band',
      'Priority Flag',
      'File Storage URLs',
      'Submission Method',
      'Submitted By',
    ],
  },
  {
    name: 'MCA Partner Outcomes',
    headers: [
      'Timestamp',
      'Application ID',
      'Outcome',
      'Decline Reason',
      'Funded Amount (CAD)',
      'Referral Revenue (CAD)',
      'Notes',
    ],
  },
  {
    name: 'MCA Activity Log',
    headers: ['Timestamp', 'Application ID', 'Email', 'Event', 'Metadata'],
  },
  {
    name: 'MCA Dashboard',
    headers: ['Dashboard KPIs (Calculated via formulas)'],
  },
];

async function run() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  console.log(`Checking spreadsheet: ${SPREADSHEET_ID}`);

  try {
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const existingSheets = meta.data.sheets.map((s) => s.properties.title);

    for (const tab of TABS) {
      if (existingSheets.includes(tab.name)) {
        console.log(`ℹ️ Tab "${tab.name}" already exists. Skipping creation.`);
      } else {
        console.log(`➕ Creating tab "${tab.name}"...`);
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SPREADSHEET_ID,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: { title: tab.name },
                },
              },
            ],
          },
        });
      }

      // Add headers
      console.log(`📝 Writing headers to "${tab.name}"...`);
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${tab.name}!A1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [tab.headers],
        },
      });
    }

    console.log('✅ Google Sheets MCA tabs initialized successfully!');
  } catch (err) {
    console.error('❌ Error initializing Google Sheets tabs:', err);
  }
}

run();
