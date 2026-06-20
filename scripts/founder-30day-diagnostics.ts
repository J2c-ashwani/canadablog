import { getLeadsFromSheet } from '../lib/google-sheets';
import { google } from 'googleapis';
import * as dotenv from 'dotenv';
dotenv.config({ path: '/Users/ashwanikumar/Downloads/canadablog/.env.local' });

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

async function runFounderReport() {
  try {
    console.log('📡 Fetching and dynamically parsing B2B leads from Google Sheets...');
    const leads = await getLeadsFromSheet(1000);
    console.log(`📊 Total parsed CRM leads: ${leads.length}`);

    // Fetch Product Purchases for verification
    let purchaseRows: any[] = [];
    try {
      const sheets = await getGoogleSheetsClient();
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;
      const purchasesResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Product Purchases!A2:O',
      });
      purchaseRows = purchasesResponse.data.values || [];
      console.log(`💳 Total purchase records retrieved: ${purchaseRows.length}\n`);
    } catch (e) {
      console.log('⚠️ Product Purchases sheet could not be fetched or is empty.\n');
    }

    const now = new Date();
    const startOf30DaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Diagnostics counters
    let totalLeads30d = 0;
    let tierALeads30d = 0;
    let tierBLeads30d = 0;
    let tierCLeads30d = 0;

    let contactFormLeads30d = 0;
    let contactFormTierA30d = 0;
    let calculatorLeads30d = 0;
    let calculatorTierA30d = 0;

    let auditPageViews30d = 0;
    let auditPurchased30d = 0;
    let auditBooked30d = 0;
    let filingClients30d = 0;

    let previewViewed30d = 0;
    let previewCheckoutStarted30d = 0;
    let previewPurchased30d = 0;

    // All-time counters
    let totalLeadsAll = 0;
    let tierALeadsAll = 0;
    let tierBLeadsAll = 0;
    let tierCLeadsAll = 0;

    let contactFormLeadsAll = 0;
    let contactFormTierAAll = 0;
    let calculatorLeadsAll = 0;
    let calculatorTierAAll = 0;

    let auditPageViewsAll = 0;
    let auditPurchasedAll = 0;
    let auditBookedAll = 0;
    let filingClientsAll = 0;

    let previewViewedAll = 0;
    let previewCheckoutStartedAll = 0;
    let previewPurchasedAll = 0;

    // Lists
    const tierAEmails30d: any[] = [];
    const tierAEmailsAll: any[] = [];
    const buyers30d: string[] = [];
    const buyersAll: string[] = [];
    const booked30d: string[] = [];
    const bookedAll: string[] = [];
    const filing30d: string[] = [];
    const filingAll: string[] = [];

    leads.forEach((lead) => {
      const email = lead.email;
      const source = lead.source || '';
      const offlineStatus = lead.offlineStatus || 'Lead';
      const pagePath = lead.pagePath || '';
      const score = lead.score;
      const tier = lead.tier;
      const isTierA = tier === 'A';
      const isContactForm = source.includes('Contact Form');

      const leadDate = new Date(lead.timestamp);
      const isWithin30d = !isNaN(leadDate.getTime()) && leadDate >= startOf30DaysAgo;

      // Parse activity
      let activity: any = {};
      if (lead.leadActivity && lead.leadActivity !== 'N/A' && lead.leadActivity !== '{}') {
        try {
          activity = JSON.parse(lead.leadActivity);
        } catch (e) {}
      }

      const viewedAuditPage = 
        pagePath.includes('/audit') || 
        pagePath.includes('/consultation') ||
        activity.auditCtaClickedAt ||
        activity.paywallViewedAt;

      const hasPurchasedAudit = 
        activity.depositPaid === true ||
        activity.depositPaidAt ||
        activity.auditQuestionnaireSubmittedAt ||
        lead.reportPurchased === true ||
        lead.strategyReportPurchased === true;

      const hasBooked = 
        activity.bookedAudit === true ||
        activity.auditBookedAt;

      const isFilingClient = 
        offlineStatus.toLowerCase().includes('filing') || 
        offlineStatus.toLowerCase().includes('client') ||
        offlineStatus.toLowerCase().includes('won');

      const hasViewedPreview = 
        activity.previewViewed === true ||
        activity.previewViewedAt;

      const hasStartedCheckout = 
        activity.checkoutStartedAt || 
        activity.previewCtaClicked === true ||
        activity.previewCtaClickedAt;

      const hasCompletedPayment = 
        activity.paymentApprovedAt ||
        activity.paymentCompletedAt ||
        lead.reportPurchased === true ||
        lead.strategyReportPurchased === true;

      // --- All Time ---
      totalLeadsAll++;
      if (isTierA) {
        tierALeadsAll++;
        tierAEmailsAll.push({ email, source, date: lead.timestamp, score });
      } else if (tier === 'B') {
        tierBLeadsAll++;
      } else {
        tierCLeadsAll++;
      }

      if (isContactForm) {
        contactFormLeadsAll++;
        if (isTierA) contactFormTierAAll++;
      } else {
        calculatorLeadsAll++;
        if (isTierA) calculatorTierAAll++;
      }

      if (viewedAuditPage) auditPageViewsAll++;
      if (hasPurchasedAudit) {
        auditPurchasedAll++;
        buyersAll.push(email);
      }
      if (hasBooked) {
        auditBookedAll++;
        bookedAll.push(email);
      }
      if (isFilingClient) {
        filingClientsAll++;
        filingAll.push(email);
      }

      if (hasViewedPreview) previewViewedAll++;
      if (hasStartedCheckout) previewCheckoutStartedAll++;
      if (hasCompletedPayment) previewPurchasedAll++;

      // --- Last 30 Days ---
      if (isWithin30d) {
        totalLeads30d++;
        if (isTierA) {
          tierALeads30d++;
          tierAEmails30d.push({ email, source, date: lead.timestamp, score });
        } else if (tier === 'B') {
          tierBLeads30d++;
        } else {
          tierCLeads30d++;
        }

        if (isContactForm) {
          contactFormLeads30d++;
          if (isTierA) contactFormTierA30d++;
        } else {
          calculatorLeads30d++;
          if (isTierA) calculatorTierA30d++;
        }

        if (viewedAuditPage) auditPageViews30d++;
        if (hasPurchasedAudit) {
          auditPurchased30d++;
          buyers30d.push(email);
        }
        if (hasBooked) {
          auditBooked30d++;
          booked30d.push(email);
        }
        if (isFilingClient) {
          filingClients30d++;
          filing30d.push(email);
        }

        if (hasViewedPreview) previewViewed30d++;
        if (hasStartedCheckout) previewCheckoutStarted30d++;
        if (hasCompletedPayment) previewPurchased30d++;
      }
    });

    // Check Product Purchases sheet
    purchaseRows.forEach((pRow) => {
      const email = pRow[1] || '';
      const productId = pRow[3] || '';
      const createdAtStr = pRow[8] || '';
      const status = pRow[9] || 'completed';

      if (status !== 'completed' || !email) return;

      const purchaseDate = new Date(createdAtStr);
      const isWithin30d = !isNaN(purchaseDate.getTime()) && purchaseDate >= startOf30DaysAgo;

      if (productId === 'strategy-audit' || productId === 'strategy-vip' || productId === 'funding-roadmap') {
        if (!buyersAll.includes(email)) {
          buyersAll.push(email);
          auditPurchasedAll++;
        }
        if (isWithin30d && !buyers30d.includes(email)) {
          buyers30d.push(email);
          auditPurchased30d++;
        }
      }
    });

    console.log('========================================================================================');
    console.log('📊 FOUNDER REVENUE FUNNEL DIAGNOSTICS');
    console.log('========================================================================================');
    console.log('Metric                              | Last 30 Days |       All-Time');
    console.log('----------------------------------------------------------------------------------------');
    console.log(`Total Leads                         | ${String(totalLeads30d).padStart(12)} | ${String(totalLeadsAll).padStart(14)}`);
    console.log(`Tier A Leads Generated              | ${String(tierALeads30d).padStart(12)} | ${String(tierALeadsAll).padStart(14)}`);
    console.log(`  - From Calculator                 | ${String(calculatorTierA30d).padStart(12)} | ${String(calculatorTierAAll).padStart(14)}`);
    console.log(`  - From Contact Form               | ${String(contactFormTierA30d).padStart(12)} | ${String(contactFormTierAAll).padStart(14)}`);
    console.log(`Viewed /audit (estimated)           | ${String(auditPageViews30d).padStart(12)} | ${String(auditPageViewsAll).padStart(14)}`);
    console.log(`Purchased the Audit                 | ${String(auditPurchased30d).padStart(12)} | ${String(auditPurchasedAll).padStart(14)}`);
    console.log(`Booked via Calendly                 | ${String(auditBooked30d).padStart(12)} | ${String(auditBookedAll).padStart(14)}`);
    console.log(`Became Filing Clients               | ${String(filingClients30d).padStart(12)} | ${String(filingClientsAll).padStart(14)}`);
    console.log('----------------------------------------------------------------------------------------');
    console.log('Personalized Outcome Preview Funnel (Revenue Sprint):');
    console.log(`  - Viewed Preview                  | ${String(previewViewed30d).padStart(12)} | ${String(previewViewedAll).padStart(14)}`);
    console.log(`  - Started Checkout (CTA Click)    | ${String(previewCheckoutStarted30d).padStart(12)} | ${String(previewCheckoutStartedAll).padStart(14)}`);
    console.log(`  - Completed Payment               | ${String(previewPurchased30d).padStart(12)} | ${String(previewPurchasedAll).padStart(14)}`);
    console.log('========================================================================================');
    
    // Output Top 10 Scoring Leads to inspect why they are/aren't Tier A
    console.log('\n🏆 TOP 10 HIGHEST-SCORING LEADS IN DATABASE:');
    console.log('----------------------------------------------------------------------------------------');
    console.log('Rank | Email                                      | Score | Tier | Source');
    console.log('----------------------------------------------------------------------------------------');
    const sortedLeads = [...leads].sort((a, b) => b.score - a.score).slice(0, 10);
    sortedLeads.forEach((l, i) => {
      console.log(`${String(i + 1).padEnd(4)} | ${l.email.padEnd(42)} | ${String(l.score).padStart(5)} | ${l.tier.padEnd(4)} | ${l.source.slice(0, 20)}`);
    });
    console.log('----------------------------------------------------------------------------------------');

    if (tierAEmailsAll.length > 0) {
      console.log('\n🔍 Recent Tier A Leads (All-Time):');
      tierAEmailsAll.slice(-5).forEach(lead => {
        console.log(` - [${lead.date.slice(0,10)}] ${lead.email} (Score: ${lead.score}, Source: ${lead.source})`);
      });
    }

    if (buyersAll.length > 0) {
      console.log(`\n💳 Audit Buyers (All-Time, ${buyersAll.length}):`);
      buyersAll.forEach(email => console.log(` - ${email}`));
    }

    if (bookedAll.length > 0) {
      console.log(`\n📅 Booked Calendly Sessions (All-Time, ${bookedAll.length}):`);
      bookedAll.forEach(email => console.log(` - ${email}`));
    }

    if (filingAll.length > 0) {
      console.log(`\n💼 Filing Clients (All-Time, ${filingAll.length}):`);
      filingAll.forEach(email => console.log(` - ${email}`));
    }
    console.log('========================================================================================\n');

  } catch (err) {
    console.error('❌ Failed to run founder funnel report:', err);
  }
}

runFounderReport();
