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
    const leadsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Leads!A2:BM',
    });

    const rows = leadsResponse.data.values || [];
    console.log(`📊 Total raw leads rows retrieved: ${rows.length}`);

    // Fetch Product Purchases
    let purchaseRows = [];
    try {
      const purchasesResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Product Purchases!A2:J',
      });
      purchaseRows = purchasesResponse.data.values || [];
      console.log(`💳 Total purchase records retrieved: ${purchaseRows.length}\n`);
    } catch (purchaseErr) {
      console.log('⚠️ Could not fetch Product Purchases sheet (may not have any purchases recorded yet).\n');
    }

    let totalLeads = 0;
    let tierA = 0;
    let tierB = 0;
    let tierC = 0;
    let reportPurchasedCount = 0;
    let activeSubscriptions = 0;
    let trialSubscriptions = 0;
    let unsubscribedCount = 0;
    let calculatorCompletions = 0;
    let auditPurchasedCount = 0;

    const hotProspects = [];

    rows.forEach((row, idx) => {
      const rowIndex = idx + 2;
      const timestamp = row[0] || 'N/A';
      const source = row[1] || '';
      const email = row[2] || '';
      const name = row[3] || 'N/A';
      const phone = row[11] || '';
      const tierVal = row[14] || row[62] || 'Tier C';
      const reportPurchasedVal = row[48] || 'No';
      const subStatusVal = row[43] || 'inactive';
      const isSubscribedVal = row[33] || 'Yes';
      const waLink = row[26] || '';
      const assessmentPurchasedAt = row[54] || 'N/A';

      if (!email) return;

      totalLeads++;

      // Calculator completions
      if (source.includes('Calculator') || source.includes('Contact Form - Grant Calculator')) {
        calculatorCompletions++;
      }

      // Tiers
      if (tierVal === 'A' || tierVal.includes('Tier A')) tierA++;
      else if (tierVal === 'B' || tierVal.includes('Tier B')) tierB++;
      else tierC++;

      // Report purchases count in Leads
      if (reportPurchasedVal === 'Yes' || reportPurchasedVal === 'true' || reportPurchasedVal === true) {
        reportPurchasedCount++;
      }

      // Audit purchases count in Leads
      if (assessmentPurchasedAt && assessmentPurchasedAt !== 'N/A' && assessmentPurchasedAt !== '') {
        auditPurchasedCount++;
      }

      // Subscriptions
      if (subStatusVal === 'active') activeSubscriptions++;
      else if (subStatusVal === 'trial') trialSubscriptions++;

      // Subscribed
      if (isSubscribedVal === 'No') unsubscribedCount++;

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

    // Calculate Purchase metrics from Product Purchases sheet
    let completedPurchasesCount = 0;
    let totalReportRevenue = 0.0;
    purchaseRows.forEach((pRow) => {
      const amount = parseFloat(pRow[4] || '0.00');
      const status = pRow[9] || 'completed';
      if (status === 'completed') {
        completedPurchasesCount++;
        totalReportRevenue += amount;
      }
    });

    // Conversion Calculations
    const reportPurchaseRate = calculatorCompletions > 0 
      ? ((completedPurchasesCount / calculatorCompletions) * 100).toFixed(2) 
      : '0.00';
    const auditPurchaseRate = completedPurchasesCount > 0 
      ? ((auditPurchasedCount / completedPurchasesCount) * 100).toFixed(2) 
      : '0.00';

    console.log('=========================================');
    console.log('📈 FSI DIGITAL CORE FUNNEL METRICS');
    console.log('=========================================');
    console.log(`1. Calculator Completions (Visitors):   ${calculatorCompletions}`);
    console.log(`2. Report Purchase Rate (CVR):          ${reportPurchaseRate}% (${completedPurchasesCount} purchases)`);
    console.log(`3. Total Report Revenue:                $${totalReportRevenue.toFixed(2)} USD`);
    console.log(`4. Audit Bookings (Sales):               ${auditPurchasedCount}`);
    console.log(`5. Audit Purchase Rate (Upsell CVR):    ${auditPurchaseRate}%`);
    console.log('=========================================');
    console.log(`Total Leads Database Size:              ${totalLeads}`);
    console.log(`Tier A (High Value Leads):              ${tierA}`);
    console.log(`Tier B (Medium Value Leads):            ${tierB}`);
    console.log(`Tier C (Low Value Leads):               ${tierC}`);
    console.log(`Active Paid Newsletter Members:         ${activeSubscriptions}`);
    console.log(`Active Trial Newsletter Members:        ${trialSubscriptions}`);
    console.log(`Unsubscribed Leads:                     ${unsubscribedCount}`);
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
