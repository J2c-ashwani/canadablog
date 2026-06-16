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
    // Extended range to BO to capture strategyReportPurchased (BN) and strategyReportTransactionId (BO)
    const leadsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Leads!A2:BO',
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

    // Set up periods
    const now = new Date();
    // Start of today in local time
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfLast7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const startOfLast30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    function parseDate(val) {
      if (!val || val === 'N/A' || val === '') return null;
      const d = new Date(val);
      return isNaN(d.getTime()) ? null : d;
    }

    function addToStats(statsObj, date, incrementFn) {
      if (!date) return;
      
      // All-time/Overall
      incrementFn(statsObj.overall);

      const t = date.getTime();
      if (t >= startOfToday.getTime()) {
        incrementFn(statsObj.today);
      }
      if (t >= startOfLast7Days.getTime()) {
        incrementFn(statsObj.last7);
      }
      if (t >= startOfLast30Days.getTime()) {
        incrementFn(statsObj.last30);
      }
    }

    const stats = {
      today: {
        completions: 0,
        paywallViews: 0,
        packageSelections: 0,
        p19Selected: 0,
        p69Selected: 0,
        checkoutStarts: 0,
        paymentApprovals: 0,
        paymentCompletions: 0,
        reportViews: 0,
        actionPlanViews: 0,
        pdfDownloads: 0,
        auditCtaClicks: 0,
        p19: 0,
        p49: 0,
        p69: 0,
        p29: 0,
        p9: 0,
        audits: 0,
        revenue: 0,
        digitalRevenue: 0,
        digitalOrders: new Set()
      },
      last7: {
        completions: 0,
        paywallViews: 0,
        packageSelections: 0,
        p19Selected: 0,
        p69Selected: 0,
        checkoutStarts: 0,
        paymentApprovals: 0,
        paymentCompletions: 0,
        reportViews: 0,
        actionPlanViews: 0,
        pdfDownloads: 0,
        auditCtaClicks: 0,
        p19: 0,
        p49: 0,
        p69: 0,
        p29: 0,
        p9: 0,
        audits: 0,
        revenue: 0,
        digitalRevenue: 0,
        digitalOrders: new Set()
      },
      last30: {
        completions: 0,
        paywallViews: 0,
        packageSelections: 0,
        p19Selected: 0,
        p69Selected: 0,
        checkoutStarts: 0,
        paymentApprovals: 0,
        paymentCompletions: 0,
        reportViews: 0,
        actionPlanViews: 0,
        pdfDownloads: 0,
        auditCtaClicks: 0,
        p19: 0,
        p49: 0,
        p69: 0,
        p29: 0,
        p9: 0,
        audits: 0,
        revenue: 0,
        digitalRevenue: 0,
        digitalOrders: new Set()
      },
      overall: {
        completions: 0,
        paywallViews: 0,
        packageSelections: 0,
        p19Selected: 0,
        p69Selected: 0,
        checkoutStarts: 0,
        paymentApprovals: 0,
        paymentCompletions: 0,
        reportViews: 0,
        actionPlanViews: 0,
        pdfDownloads: 0,
        auditCtaClicks: 0,
        p19: 0,
        p49: 0,
        p69: 0,
        p29: 0,
        p9: 0,
        audits: 0,
        revenue: 0,
        digitalRevenue: 0,
        digitalOrders: new Set()
      }
    };

    const surveyStats = {};

    // 1. Process Leads & Audit Bookings & Lead Activity Telemetry
    rows.forEach((row) => {
      const timestampStr = row[0] || '';
      const source = row[1] || '';
      const email = row[2] || '';
      const reportPurchasedVal = row[48] || 'No';
      const assessmentPurchasedAtStr = row[54] || ''; 
      const strategyReportPurchasedVal = row[65] || 'No'; 

      if (!email) return;

      const leadDate = parseDate(timestampStr);

      // Calculator completions
      if (source.includes('Calculator') || source.includes('Contact Form - Grant Calculator')) {
        addToStats(stats, leadDate, (s) => s.completions++);
      }

      // Audit purchases
      if (assessmentPurchasedAtStr && assessmentPurchasedAtStr !== 'N/A' && assessmentPurchasedAtStr !== '') {
        const auditDate = parseDate(assessmentPurchasedAtStr);
        if (auditDate) {
          addToStats(stats, auditDate, (s) => {
            s.audits++;
            // Calculate coupon adjustment
            const hasStrategy = (strategyReportPurchasedVal === 'Yes' || strategyReportPurchasedVal === 'true');
            const hasReport = (reportPurchasedVal === 'Yes' || reportPurchasedVal === 'true');
            
            if (hasStrategy) {
              s.revenue += 150; // $199 - $49 credit
            } else if (hasReport) {
              s.revenue += 180; // $199 - $19 credit
            } else {
              s.revenue += 199; // Full price
            }
          });
        }
      }

      // Parse activity telemetry from AZ column (index 51)
      let activity = {};
      const activityStr = row[51] || '';
      if (activityStr && activityStr !== '{}' && activityStr !== 'N/A') {
        try {
          activity = JSON.parse(activityStr);
        } catch (e) {
          // Ignore parse errors
        }
      }

      // 1. Paywall Views
      if (activity.paywallViewedAt) {
        const d = parseDate(activity.paywallViewedAt);
        if (d) addToStats(stats, d, (s) => s.paywallViews++);
      }

      // 2. Package Selections
      if (activity.packageSelectedAt) {
        const d = parseDate(activity.packageSelectedAt);
        if (d) {
          addToStats(stats, d, (s) => {
            s.packageSelections++;
            if (activity.packageSelected === '19' || activity.packageSelected === 'funding-match-report') {
              s.p19Selected++;
            } else if (activity.packageSelected === '69' || activity.packageSelected === 'funding-bundle') {
              s.p69Selected++;
            }
          });
        }
      }

      // 3. Checkout Starts
      if (activity.checkoutStartedAt) {
        const d = parseDate(activity.checkoutStartedAt);
        if (d) addToStats(stats, d, (s) => s.checkoutStarts++);
      }

      // 4. Payment Approvals
      if (activity.paymentApprovedAt) {
        const d = parseDate(activity.paymentApprovedAt);
        if (d) addToStats(stats, d, (s) => s.paymentApprovals++);
      }

      // 5. Payment Completions
      if (activity.paymentCompletedAt) {
        const d = parseDate(activity.paymentCompletedAt);
        if (d) addToStats(stats, d, (s) => s.paymentCompletions++);
      } else if (String(reportPurchasedVal).toLowerCase() === 'yes') {
        const d = parseDate(timestampStr);
        if (d) addToStats(stats, d, (s) => s.paymentCompletions++);
      }

      // 5b. Post-Purchase Consumption
      if (activity.reportViewedAt) {
        const d = parseDate(activity.reportViewedAt);
        if (d) addToStats(stats, d, (s) => s.reportViews++);
      }
      if (activity.actionPlanViewedAt) {
        const d = parseDate(activity.actionPlanViewedAt);
        if (d) addToStats(stats, d, (s) => s.actionPlanViews++);
      }
      if (activity.pdfDownloadedAt) {
        const d = parseDate(activity.pdfDownloadedAt);
        if (d) addToStats(stats, d, (s) => s.pdfDownloads++);
      }
      if (activity.auditCtaClickedAt) {
        const d = parseDate(activity.auditCtaClickedAt);
        if (d) addToStats(stats, d, (s) => s.auditCtaClicks++);
      }

      // 6. Aggregate Surveys
      if (activity.surveys && Array.isArray(activity.surveys)) {
        activity.surveys.forEach(survey => {
          const type = survey.type || '';
          const response = survey.response || '';
          if (!response) return;

          let category = '';
          if (type === 'buyer' || type === 'buyer-delivery') {
            category = 'Buyer Purchase Motivation';
          } else if (type === 'non-buyer-free-fallback') {
            category = 'Free Fallback Rejections (Non-Buyer)';
          } else if (type === 'non-buyer-action-plan' || type === 'non-buyer-delivery') {
            category = 'Action Plan Upgrade Rejections (Non-Buyer)';
          } else {
            category = `Other Surveys (${type})`;
          }

          if (!surveyStats[category]) {
            surveyStats[category] = {};
          }
          surveyStats[category][response] = (surveyStats[category][response] || 0) + 1;
        });
      }
    });

    // 2. Process Product Purchases ($19, $49, $69) from Google Sheets purchases tab
    purchaseRows.forEach((pRow) => {
      const productId = pRow[3] || '';
      const amount = parseFloat(pRow[4] || '0.00');
      const createdAtStr = pRow[8] || '';
      const status = pRow[9] || 'completed';

      if (status !== 'completed') return;

      const purchaseDate = parseDate(createdAtStr);
      if (!purchaseDate) return;

      const paypalOrderId = pRow[5] || '';
      addToStats(stats, purchaseDate, (s) => {
        s.revenue += amount;
        s.digitalRevenue += amount;
        if (paypalOrderId) {
          s.digitalOrders.add(paypalOrderId);
        }
        if (productId === 'funding-match-report') {
          s.p19++;
        } else if (productId === 'funding-roadmap') {
          s.p49++;
        } else if (productId === 'funding-bundle') {
          s.p69++;
        } else if (productId === 'funding-toolkit') {
          s.p29++;
        } else if (productId === 'funding-approval-library') {
          s.p9++;
        }
      });
    });

    // Display Helper
    function printRow(label, today, last7, last30, overall) {
      console.log(
        `${label.padEnd(35)} | ${String(today).padStart(8)} | ${String(last7).padStart(12)} | ${String(last30).padStart(13)} | ${String(overall).padStart(10)}`
      );
    }

    console.log('========================================================================================');
    console.log('📈 FSI DIGITAL REVENUE FUNNEL DIAGNOSTICS');
    console.log('========================================================================================');
    console.log('Metric                              |    Today |  Last 7 Days |  Last 30 Days |    Overall');
    console.log('----------------------------------------------------------------------------------------');
    printRow('Calculator Completions (Leads)', stats.today.completions, stats.last7.completions, stats.last30.completions, stats.overall.completions);
    printRow('Paywall Views', stats.today.paywallViews, stats.last7.paywallViews, stats.last30.paywallViews, stats.overall.paywallViews);
    printRow('Package Selections (Clicks)', stats.today.packageSelections, stats.last7.packageSelections, stats.last30.packageSelections, stats.overall.packageSelections);
    printRow('  - Selected $19 Report', stats.today.p19Selected, stats.last7.p19Selected, stats.last30.p19Selected, stats.overall.p19Selected);
    printRow('  - Selected $79 Bundle', stats.today.p69Selected, stats.last7.p69Selected, stats.last30.p69Selected, stats.overall.p69Selected);
    printRow('Checkout Started (PayPal clicks)', stats.today.checkoutStarts, stats.last7.checkoutStarts, stats.last30.checkoutStarts, stats.overall.checkoutStarts);
    printRow('Payment Approved (PayPal Captures)', stats.today.paymentApprovals, stats.last7.paymentApprovals, stats.last30.paymentApprovals, stats.overall.paymentApprovals);
    printRow('Payment Completed (Sheets Record)', stats.today.paymentCompletions, stats.last7.paymentCompletions, stats.last30.paymentCompletions, stats.overall.paymentCompletions);
    console.log('----------------------------------------------------------------------------------------');
    printRow('Report Views (Post-purchase)', stats.today.reportViews, stats.last7.reportViews, stats.last30.reportViews, stats.overall.reportViews);
    printRow('Action Plan Views (Post-purchase)', stats.today.actionPlanViews, stats.last7.actionPlanViews, stats.last30.actionPlanViews, stats.overall.actionPlanViews);
    printRow('PDF Downloads', stats.today.pdfDownloads, stats.last7.pdfDownloads, stats.last30.pdfDownloads, stats.overall.pdfDownloads);
    printRow('Audit CTA Clicks', stats.today.auditCtaClicks, stats.last7.auditCtaClicks, stats.last30.auditCtaClicks, stats.overall.auditCtaClicks);
    console.log('----------------------------------------------------------------------------------------');
    printRow('$19 Match Report Sales', stats.today.p19, stats.last7.p19, stats.last30.p19, stats.overall.p19);
    printRow('$49 Action Plan Upgrades', stats.today.p49, stats.last7.p49, stats.last30.p49, stats.overall.p49);
    printRow('$79 Complete Bundle Sales', stats.today.p69, stats.last7.p69, stats.last30.p69, stats.overall.p69);
    printRow('$29 Toolkit Add-ons', stats.today.p29, stats.last7.p29, stats.last30.p29, stats.overall.p29);
    printRow('$9 Library Add-ons', stats.today.p9, stats.last7.p9, stats.last30.p9, stats.overall.p9);
    printRow('$199 Audit Bookings', stats.today.audits, stats.last7.audits, stats.last30.audits, stats.overall.audits);
    console.log('----------------------------------------------------------------------------------------');
    printRow(
      'Total Closed Revenue',
      `$${stats.today.revenue.toFixed(2)}`,
      `$${stats.last7.revenue.toFixed(2)}`,
      `$${stats.last30.revenue.toFixed(2)}`,
      `$${stats.overall.revenue.toFixed(2)}`
    );
    function getAOV(revenue, ordersSet) {
      if (ordersSet.size === 0) return '$0.00';
      return `$${(revenue / ordersSet.size).toFixed(2)}`;
    }
    printRow(
      'Average Order Value (AOV)',
      getAOV(stats.today.digitalRevenue, stats.today.digitalOrders),
      getAOV(stats.last7.digitalRevenue, stats.last7.digitalOrders),
      getAOV(stats.last30.digitalRevenue, stats.last30.digitalOrders),
      getAOV(stats.overall.digitalRevenue, stats.overall.digitalOrders)
    );
    console.log('========================================================================================\n');

    // Conversion rates
    function getCVR(numerator, denominator) {
      if (denominator === 0) return '0.00%';
      return `${((numerator / denominator) * 100).toFixed(2)}%`;
    }

    console.log('📊 FUNNEL CONVERSION RATES & ATTACHMENTS:');
    console.log('----------------------------------------------------------------------------------------');
    console.log(`Paywall View Rate (Completions -> Paywall View):`);
    console.log(`  - Today:         ${getCVR(stats.today.paywallViews, stats.today.completions)}`);
    console.log(`  - Last 7 Days:   ${getCVR(stats.last7.paywallViews, stats.last7.completions)}`);
    console.log(`  - Overall:       ${getCVR(stats.overall.paywallViews, stats.overall.completions)}`);
    console.log('----------------------------------------------------------------------------------------');
    console.log(`Package Click Rate (Paywall Views -> Click Package):`);
    console.log(`  - Today:         ${getCVR(stats.today.packageSelections, stats.today.paywallViews)}`);
    console.log(`  - Last 7 Days:   ${getCVR(stats.last7.packageSelections, stats.last7.paywallViews)}`);
    console.log(`  - Overall:       ${getCVR(stats.overall.packageSelections, stats.overall.paywallViews)}`);
    console.log('----------------------------------------------------------------------------------------');
    console.log(`Checkout Start Rate (Package Selected -> PayPal Auth):`);
    console.log(`  - Today:         ${getCVR(stats.today.checkoutStarts, stats.today.packageSelections)}`);
    console.log(`  - Last 7 Days:   ${getCVR(stats.last7.checkoutStarts, stats.last7.packageSelections)}`);
    console.log(`  - Overall:       ${getCVR(stats.overall.checkoutStarts, stats.overall.packageSelections)}`);
    console.log('----------------------------------------------------------------------------------------');
    console.log(`Payment CVR (Checkout Starts -> Payment Capture):`);
    console.log(`  - Today:         ${getCVR(stats.today.paymentCompletions, stats.today.checkoutStarts)}`);
    console.log(`  - Last 7 Days:   ${getCVR(stats.last7.paymentCompletions, stats.last7.checkoutStarts)}`);
    console.log(`  - Overall:       ${getCVR(stats.overall.paymentCompletions, stats.overall.checkoutStarts)}`);
    console.log('----------------------------------------------------------------------------------------');
    console.log(`$49 Action Plan Attachment Rate ($19 Buyers -> $49 Upgrade):`);
    console.log(`  - Today:         ${getCVR(stats.today.p49, stats.today.p19)}`);
    console.log(`  - Last 7 Days:   ${getCVR(stats.last7.p49, stats.last7.p19)}`);
    console.log(`  - Overall:       ${getCVR(stats.overall.p49, stats.overall.p19)}`);
    console.log('----------------------------------------------------------------------------------------');
    console.log(`Report Consumption Rate (Payments -> Report Views):`);
    console.log(`  - Overall:       ${getCVR(stats.overall.reportViews, stats.overall.paymentCompletions)}`);
    console.log('----------------------------------------------------------------------------------------');
    console.log(`Action Plan Consumption Rate (Action Plan Sales -> Action Plan Views):`);
    console.log(`  - Overall:       ${getCVR(stats.overall.actionPlanViews, stats.overall.p49 + stats.overall.p69)}`);
    console.log('----------------------------------------------------------------------------------------');
    console.log(`PDF Download Rate (Report Views -> PDF Downloaded):`);
    console.log(`  - Overall:       ${getCVR(stats.overall.pdfDownloads, stats.overall.reportViews)}`);
    console.log('----------------------------------------------------------------------------------------');
    console.log(`Audit CTA Conversion Rate (Report Views -> Clicked booking CTA):`);
    console.log(`  - Overall:       ${getCVR(stats.overall.auditCtaClicks, stats.overall.reportViews)}`);
    console.log('----------------------------------------------------------------------------------------');
    console.log(`Total Sales Count: ${stats.overall.p19 + stats.overall.p49 + stats.overall.p69 + stats.overall.audits} (Goal: 25 Sales, 10 Bundles)`);
    console.log(`  - $19 Report:    ${stats.overall.p19}`);
    console.log(`  - $79 Bundle:    ${stats.overall.p69} / 10 Bundle Sales`);
    console.log(`  - $49 Upgrade:   ${stats.overall.p49}`);
    console.log(`  - $199 Audit:    ${stats.overall.audits}`);
    console.log('========================================================================================\n');

    console.log('💡 EXIT & FUNNEL SURVEY FEEDBACK HIGHLIGHTS');
    console.log('========================================================================================');
    const categories = Object.keys(surveyStats);
    if (categories.length === 0) {
      console.log('No survey feedback responses collected yet.');
    } else {
      categories.forEach(cat => {
        console.log(`\n📋 [Category]: ${cat}`);
        console.log('----------------------------------------------------------------------------------------');
        console.log('Response Option                                         | Count | Percentage');
        console.log('----------------------------------------------------------------------------------------');
        const responses = surveyStats[cat];
        const totalCatCount = Object.values(responses).reduce((a, b) => a + b, 0);
        
        Object.entries(responses)
          .sort((a, b) => b[1] - a[1]) // Sort highest count first
          .forEach(([option, count]) => {
            const pctStr = `${((count / totalCatCount) * 100).toFixed(1)}%`;
            console.log(`${option.padEnd(55)} | ${String(count).padStart(5)} | ${pctStr.padStart(10)}`);
          });
        console.log('----------------------------------------------------------------------------------------');
      });
    }
    console.log('========================================================================================\n');

  } catch (err) {
    console.error('❌ Diagnostic error:', err);
  }
}

runDiagnostics();
