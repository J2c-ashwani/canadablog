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

async function runDiagnostics() {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID is missing in env');
    }

    console.log('📡 Fetching leads from Google Sheet database...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Leads!A2:BM',
    });

    const rows = response.data.values || [];
    if (rows.length === 0) {
      console.log('⚠️ No lead records found in the sheet.');
      return;
    }

    console.log(`📊 Total raw rows retrieved: ${rows.length}\n`);

    let totalLeads = 0;
    let tierA = 0;
    let tierB = 0;
    let tierC = 0;
    let reportPurchasedCount = 0;
    let activeSubscriptions = 0;
    let trialSubscriptions = 0;
    let unsubscribedCount = 0;

    const hotProspects = [];

    rows.forEach((row, idx) => {
      const rowIndex = idx + 2; // Rows in sheets are 1-indexed and we skipped header A1
      const timestamp = row[0] || 'N/A';
      const email = row[2] || '';
      const name = row[3] || 'N/A';
      const phone = row[11] || '';
      const tierVal = row[14] || row[62] || 'Tier C'; // Index 14 or 62
      const reportPurchasedVal = row[48] || 'No';
      const subStatusVal = row[43] || 'inactive';
      const isSubscribedVal = row[33] || 'Yes';
      const waLink = row[26] || '';

      if (!email) return; // Skip empty rows

      totalLeads++;

      // Tiers
      if (tierVal === 'A' || tierVal.includes('Tier A')) tierA++;
      else if (tierVal === 'B' || tierVal.includes('Tier B')) tierB++;
      else tierC++;

      // Audits
      if (reportPurchasedVal === 'Yes' || reportPurchasedVal === 'true' || reportPurchasedVal === true) {
        reportPurchasedCount++;
      }

      // Subscriptions
      if (subStatusVal === 'active') activeSubscriptions++;
      else if (subStatusVal === 'trial') trialSubscriptions++;

      // Subscribed
      if (isSubscribedVal === 'No') unsubscribedCount++;

      // Identify Hot Prospects (Tier A or B, has phone number, has not purchased report/audit yet)
      const hasPurchased = (reportPurchasedVal === 'Yes' || reportPurchasedVal === 'true');
      const isOutreachTarget = !hasPurchased && subStatusVal !== 'active';

      if (isOutreachTarget && (tierVal === 'A' || tierVal === 'B' || tierVal.includes('Tier A') || tierVal.includes('Tier B'))) {
        hotProspects.push({
          rowIndex,
          timestamp,
          name,
          email,
          phone,
          tier: tierVal,
          waLink,
        });
      }
    });

    console.log('=========================================');
    console.log('📈 FSI DIGITAL SALES FUNNEL SUMMARY');
    console.log('=========================================');
    console.log(`Total Leads:             ${totalLeads}`);
    console.log(`Tier A (High Value):     ${tierA}`);
    console.log(`Tier B (Medium Value):   ${tierB}`);
    console.log(`Tier C (Low Value):      ${tierC}`);
    console.log(`Audits/Reports Paid:     ${reportPurchasedCount}`);
    console.log(`Active Paid Members:     ${activeSubscriptions}`);
    console.log(`Active Trial Members:    ${trialSubscriptions}`);
    console.log(`Unsubscribed Leads:      ${unsubscribedCount}`);
    console.log('=========================================\n');

    console.log(`🔥 TOP ${Math.min(hotProspects.length, 10)} HOT PROSPECTS FOR IMMEDIATE SALES OUTREACH:`);
    console.log('These leads qualify as Tier A/B and have not purchased the Audit yet.\n');

    const topProspects = hotProspects.slice(0, 10);
    topProspects.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} (${p.email})`);
      console.log(`   Row in Sheet:   ${p.rowIndex}`);
      console.log(`   Created At:     ${p.timestamp}`);
      console.log(`   Lead Tier:      ${p.tier}`);
      console.log(`   Phone Number:   ${p.phone || 'No Phone'}`);
      if (p.phone && p.waLink) {
        // Extract plain URL from formula if formatted as =HYPERLINK("url", "label")
        let url = p.waLink;
        if (p.waLink.startsWith('=')) {
          const match = p.waLink.match(/"([^"]+)"/);
          if (match) url = match[1];
        }
        console.log(`   💬 WhatsApp:    ${url}`);
      }
      console.log('-----------------------------------------');
    });

  } catch (err) {
    console.error('❌ Diagnostic error:', err);
  }
}

runDiagnostics();
