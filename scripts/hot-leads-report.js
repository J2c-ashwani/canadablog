const fs = require('fs');
const path = require('path');
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

function parseDate(val) {
  if (!val || val === 'N/A' || val === '') return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
}

function localDateStamp() {
  const now = new Date();
  const local = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
  return local.toISOString().slice(0, 10);
}

async function runHotLeadsReport() {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID is missing in env');
    }

    console.log('📡 Fetching leads database...');
    const leadsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Leads!A2:BO',
    });

    const rows = leadsResponse.data.values || [];
    console.log(`📊 Retrieved ${rows.length} total lead rows.\n`);

    const hotLeads = [];

    rows.forEach((row, idx) => {
      const timestamp = row[0] || '';
      const source = row[1] || '';
      const email = row[2] || '';
      const name = row[3] || 'N/A';
      const province = row[5] || 'N/A';
      const industry = row[6] || 'N/A';
      const revenue = row[72] || 'N/A';
      const score = Number(row[13]) || 0;
      const tier = row[14] || 'D';
      const phone = row[11] || 'N/A';
      const waLink = row[26] || 'N/A';
      const reportPurchasedVal = row[48] || 'No';
      const strategyReportPurchasedVal = row[65] || 'No';
      const activityStr = row[51] || '';

      if (!email) return;

      const isBuyer = (reportPurchasedVal === 'Yes' || reportPurchasedVal === 'true' || strategyReportPurchasedVal === 'Yes' || strategyReportPurchasedVal === 'true');
      
      if (isBuyer) return; // Skip completed purchases

      // Parse telemetry activity
      let activity = {};
      if (activityStr && activityStr !== '{}' && activityStr !== 'N/A') {
        try {
          activity = JSON.parse(activityStr);
        } catch (e) {
          // Ignore parse errors
        }
      }

      // Check for checkout abandonment / high buying signals
      const packageSelected = activity.packageSelected || '';
      const checkoutStartedAt = activity.checkoutStartedAt || '';
      const paypalVisible = activity.paypalVisible || false;
      const calculatorCompletedAt = activity.calculatorCompletedAt || '';

      const isCalculatorUser = source.includes('Calculator') || source.includes('Contact Form - Grant Calculator') || calculatorCompletedAt;
      const isContactFormLead = source.includes('Contact Form');

      // Include calculator drop-offs OR High-value Tier A General Contact form leads
      if (isCalculatorUser || (isContactFormLead && tier === 'A')) {
        let signalStrength = 'Low';
        let actionTriggered = 'None';

        if (isCalculatorUser) {
          if (checkoutStartedAt || paypalVisible) {
            signalStrength = '🔥 HOT (Checkout Abandoned)';
            actionTriggered = 'Reached Payment Screen';
          } else if (packageSelected) {
            signalStrength = '⚡ WARM (Selected Package)';
            actionTriggered = `Selected $${packageSelected} Package`;
          } else {
            signalStrength = 'NURTURE (Calculator Completed)';
            actionTriggered = 'Estimated Eligibility';
          }
        } else {
          signalStrength = '🔥 HOT (Tier A Contact Form)';
          actionTriggered = 'Submitted Contact Inquiry';
        }

        const paywallViewed = activity.paywallViewedAt ? '✓' : '✗';
        const packageSel = activity.packageSelected ? `✓ ($${activity.packageSelected})` : '✗';
        const paypalVis = activity.paypalVisible ? '✓' : '✗';
        const checkoutStart = activity.checkoutStartedAt ? '✓' : '✗';
        
        const funnelChecklist = isCalculatorUser
          ? `PW: ${paywallViewed} | Pkg: ${packageSel} | PP: ${paypalVis} | Out: ${checkoutStart} | Paid: ✗`
          : `Tier A General B2B Lead | Revenue: ${revenue} | Source: ${source}`;

        hotLeads.push({
          rowNumber: idx + 2, // 1-indexed header offset
          timestamp,
          email,
          name,
          phone,
          waLink,
          province,
          industry,
          revenue,
          score,
          tier,
          signalStrength,
          actionTriggered,
          funnelChecklist,
          rawTimestamp: parseDate(timestamp) || new Date(0)
        });
      }
    });

    // Sort by signal strength (Hot first), then Score (descending), then Recency (descending)
    hotLeads.sort((a, b) => {
      const getSignalWeight = (sig) => {
        if (sig.includes('HOT')) return 3;
        if (sig.includes('WARM')) return 2;
        return 1;
      };
      const signalDiff = getSignalWeight(b.signalStrength) - getSignalWeight(a.signalStrength);
      if (signalDiff !== 0) return signalDiff;

      const scoreDiff = b.score - a.score;
      if (scoreDiff !== 0) return scoreDiff;

      return b.rawTimestamp.getTime() - a.rawTimestamp.getTime();
    });

    const formattedDate = localDateStamp();
    const reportPath = path.join(__dirname, '../reports', `hot-leads-report-${formattedDate}.md`);

    let reportMarkdown = `# FSI Digital - Hot Leads Recovery Queue (${formattedDate})\n\n`;
    reportMarkdown += `This report lists leads who completed the eligibility calculator but did not finish checkout. Reach out directly to 🔥 HOT and ⚡ WARM leads to assist them in obtaining their funding reports.\n\n`;
    
    reportMarkdown += `## Hot Leads Queue\n\n`;
    reportMarkdown += `Signal Strength | Name | Email | Phone | Location | Industry | Score | Funnel Progress | Date\n`;
    reportMarkdown += `--- | --- | --- | --- | --- | --- | --- | --- | ---\n`;

    hotLeads.forEach(lead => {
      const dateStr = lead.timestamp ? lead.timestamp.slice(0, 10) : 'N/A';
      const cleanPhone = lead.phone === 'N/A' ? 'N/A' : `[${lead.phone}](${lead.waLink})`;
      reportMarkdown += `${lead.signalStrength} | ${lead.name} | ${lead.email} | ${cleanPhone} | ${lead.province} | ${lead.industry} | ${lead.score} (${lead.tier}) | \`${lead.funnelChecklist}\` | ${dateStr}\n`;
    });

    fs.writeFileSync(reportPath, reportMarkdown);
    console.log(`\n✅ Hot Leads report generated at ${reportPath}`);

    // Print summary to console
    const hotCount = hotLeads.filter(l => l.signalStrength.includes('HOT')).length;
    const warmCount = hotLeads.filter(l => l.signalStrength.includes('WARM')).length;
    const nurtureCount = hotLeads.filter(l => l.signalStrength.includes('NURTURE')).length;

    console.log('\n=================================================');
    console.log('⚡ HOT LEADS SUMMARY');
    console.log('=================================================');
    console.log(`🔥 Checkout Abandoned (HOT):   ${hotCount}`);
    console.log(`⚡ Package Selected (WARM):   ${warmCount}`);
    console.log(`🌱 Calculator Complete (NURTURE): ${nurtureCount}`);
    console.log('=================================================\n');

    console.log('Top 15 Hot Prospect Details:');
    console.log(hotLeads.slice(0, 15).map(l => ({
      Name: l.name,
      Email: l.email,
      Signal: l.signalStrength,
      Funnel: l.funnelChecklist,
      Score: `${l.score} (${l.tier})`
    })));

  } catch (error) {
    console.error('❌ Error running Hot Leads report:', error);
  }
}

runHotLeadsReport();
