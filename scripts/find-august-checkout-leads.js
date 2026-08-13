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

async function runAudit(startDateStr, titleLabel) {
  const START_DATE = new Date(startDateStr);

  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  // 1. Fetch Leads tab
  const leadsRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Leads!A2:BW',
  });
  const leadRows = leadsRes.data.values || [];

  // 2. Fetch Funnel Events (Telemetry) tab
  let telemetryRows = [];
  try {
    const telRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Funnel Events!A2:Q',
    });
    telemetryRows = telRes.data.values || [];
  } catch (e) {}

  // 3. Fetch MCA Applications tab
  let mcaRows = [];
  try {
    const mcaRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "'MCA Applications'!A2:AW",
    });
    mcaRows = mcaRes.data.values || [];
  } catch (e) {}

  // Map telemetry by email
  const telemetryByEmail = new Map();
  telemetryRows.forEach(row => {
    const ts = parseDate(row[0]);
    if (!ts || ts < START_DATE) return;

    const eventName = row[1] || '';
    const sessionId = (row[2] || '').toLowerCase().trim();
    const pagePath = row[3] || '';

    let email = sessionId.includes('@') ? sessionId : '';
    if (!email && pagePath.includes('email=')) {
      const match = pagePath.match(/email=([^&]+)/);
      if (match && match[1]) {
        email = decodeURIComponent(match[1]).toLowerCase().trim();
      }
    }

    if (email && email.includes('@')) {
      if (!telemetryByEmail.has(email)) {
        telemetryByEmail.set(email, []);
      }
      telemetryByEmail.get(email).push({
        timestamp: ts,
        eventName,
        pagePath,
        productId: row[8] || '',
        heuristic: row[16] || '',
      });
    }
  });

  const candidates = new Map();

  // Process Leads sheet
  leadRows.forEach((row, idx) => {
    const ts = parseDate(row[0]);
    if (!ts || ts < START_DATE) return;

    const source = row[1] || '';
    const email = (row[2] || '').toLowerCase().trim();
    const name = row[3] || 'Founder';
    const country = row[4] || 'CA';
    const province = row[5] || 'ON';
    const industry = row[6] || 'General';
    const phone = row[11] || 'N/A';
    const score = Number(row[13]) || 50;
    const tier = row[14] || 'B';
    const waLink = row[26] || 'N/A';
    const reportPurchased = (row[48] || 'No').toLowerCase() === 'yes';
    const activityStr = row[51] || '';
    const strategyReportPurchased = (row[65] || 'No').toLowerCase() === 'yes';

    if (!email || !email.includes('@')) return;

    const isBuyer = reportPurchased || strategyReportPurchased || (row[32] && row[32] !== 'N/A' && row[32] !== '');
    if (isBuyer) return;

    let activity = {};
    if (activityStr && activityStr !== '{}' && activityStr !== 'N/A') {
      try {
        activity = JSON.parse(activityStr);
      } catch (e) {}
    }

    const packageSelected = activity.packageSelected || '';
    const paypalVisible = activity.paypalVisible || false;
    const checkoutStartedAt = activity.checkoutStartedAt || '';
    const isCalculator = source.includes('Calculator');
    const isProductPage = (row[22] || '').includes('/products') || (row[22] || '').includes('/audit') || (row[22] || '').includes('/consultation');

    const userTel = telemetryByEmail.get(email) || [];
    const telCheckoutEvents = userTel.filter(t => {
      const n = t.eventName.toLowerCase();
      return n.includes('checkout') || n.includes('paypal') || n.includes('step6') || n.includes('paywall') || n.includes('order_created');
    });

    const reachedCheckout = packageSelected || paypalVisible || checkoutStartedAt || isProductPage || telCheckoutEvents.length > 0 || source.includes('Checkout');

    if (reachedCheckout) {
      let checkoutAttempts = 0;
      const eventNames = [];

      if (packageSelected) { checkoutAttempts++; eventNames.push(`Package $${packageSelected}`); }
      if (paypalVisible) { checkoutAttempts++; eventNames.push('PayPal Container Rendered'); }
      if (checkoutStartedAt) { checkoutAttempts++; eventNames.push('Checkout Initiated'); }

      telCheckoutEvents.forEach(t => {
        checkoutAttempts++;
        eventNames.push(t.eventName);
      });

      if (checkoutAttempts === 0) checkoutAttempts = 1;

      candidates.set(email, {
        email,
        name,
        phone,
        waLink,
        location: `${country}-${province}`,
        industry,
        source,
        score,
        tier,
        checkoutAttempts,
        events: [...new Set(eventNames)],
        firstTs: ts,
        lastTs: ts,
        productInterest: packageSelected ? `Package $${packageSelected}` : 'Funding Report / Audit',
        channel: 'Canada Grants'
      });
    }
  });

  // Process Telemetry
  for (const [email, events] of telemetryByEmail.entries()) {
    const checkoutEvents = events.filter(t => {
      const n = t.eventName.toLowerCase();
      return n.includes('checkout') || n.includes('paypal') || n.includes('step6') || n.includes('paywall') || n.includes('order_created');
    });

    if (checkoutEvents.length > 0) {
      if (!candidates.has(email)) {
        const timestamps = events.map(e => e.timestamp.getTime());
        candidates.set(email, {
          email,
          name: 'Founder',
          phone: 'N/A',
          waLink: 'N/A',
          location: 'Canada',
          industry: 'General',
          source: 'Interactive Telemetry',
          score: 65,
          tier: 'B',
          checkoutAttempts: checkoutEvents.length,
          events: [...new Set(checkoutEvents.map(e => e.eventName))],
          firstTs: new Date(Math.min(...timestamps)),
          lastTs: new Date(Math.max(...timestamps)),
          productInterest: checkoutEvents[0]?.productId || 'Report',
          channel: 'Canada Grants (Telemetry)'
        });
      } else {
        const c = candidates.get(email);
        c.checkoutAttempts = Math.max(c.checkoutAttempts, checkoutEvents.length);
        checkoutEvents.forEach(e => c.events.push(e.eventName));
        c.events = [...new Set(c.events)];
      }
    }
  }

  // Process MCA Applications
  mcaRows.forEach(row => {
    const ts = parseDate(row[0]);
    if (!ts || ts < START_DATE) return;

    const email = (row[10] || '').toLowerCase().trim();
    const ownerName = row[9] || 'Business Owner';
    const phone = row[11] || 'N/A';
    const province = row[7] || 'CA';
    const industry = row[13] || 'General';
    const priorityProcessing = row[26] === 'Yes';
    const recoveryPurchased = row[48] === 'Yes';
    const status = row[39] || 'NONE';
    const stage = row[47] || 'NONE';
    const recoveryClicked = row[45] === 'Yes';

    if (!email || !email.includes('@')) return;
    if (priorityProcessing || recoveryPurchased) return;

    const reachedCheckout = (status === 'ACTIVE' || status === 'CHECKOUT_STARTED' || status === 'EMAIL_1_SENT' || stage === 'CHECKOUT_STARTED' || stage === 'EMAIL_1' || recoveryClicked);

    if (reachedCheckout) {
      let attempts = 1;
      if (recoveryClicked) attempts += 1;

      if (candidates.has(email)) {
        const c = candidates.get(email);
        c.checkoutAttempts += attempts;
        c.events.push(`MCA Priority Checkout (${stage})`);
        c.events = [...new Set(c.events)];
      } else {
        candidates.set(email, {
          email,
          name: ownerName,
          phone,
          waLink: 'N/A',
          location: `CA-${province}`,
          industry,
          source: 'MCA Application Priority Checkout',
          score: Number(row[23]) || 70,
          tier: row[24] || 'High',
          checkoutAttempts: attempts,
          events: [`MCA Priority Processing ($49 CAD) - ${stage}`],
          firstTs: ts,
          lastTs: ts,
          productInterest: 'MCA Priority Processing ($49 CAD)',
          channel: 'Merchant Cash Advance (MCA)'
        });
      }
    }
  });

  const leadList = Array.from(candidates.values());

  leadList.sort((a, b) => {
    if (b.checkoutAttempts !== a.checkoutAttempts) {
      return b.checkoutAttempts - a.checkoutAttempts;
    }
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.lastTs.getTime() - a.lastTs.getTime();
  });

  return { titleLabel, leadList };
}

async function main() {
  try {
    const resAug7 = await runAudit('2026-08-07T00:00:00.000Z', 'August 7th to August 11th');
    const resAugMonth = await runAudit('2026-08-01T00:00:00.000Z', 'August 1st to August 11th (Month to Date)');

    console.log(`================================================================================`);
    console.log(`📊 CHECKOUT ABANDONMENT AUDIT: ${resAug7.titleLabel}`);
    console.log(`   Total Leads Reached Checkout: ${resAug7.leadList.length}`);
    console.log(`   🔥 Repeated Attempts: ${resAug7.leadList.filter(l => l.checkoutAttempts > 1).length}`);
    console.log(`   ⚡ Single Attempts: ${resAug7.leadList.filter(l => l.checkoutAttempts === 1).length}`);
    console.log(`================================================================================\n`);

    resAug7.leadList.forEach((l, i) => {
      console.log(`[${i + 1}] ${l.checkoutAttempts > 1 ? '⭐ REPEAT CHECKOUT ATTEMPTS: ' + l.checkoutAttempts + ' TIMES' : 'SINGLE CHECKOUT ATTEMPT'}`);
      console.log(`    Name: ${l.name} | Email: ${l.email} | Phone: ${l.phone}`);
      console.log(`    Location: ${l.location} | Industry: ${l.industry} | Channel: ${l.channel}`);
      console.log(`    Product Interest: ${l.productInterest} | Score: ${l.score} (${l.tier})`);
      console.log(`    Events: ${l.events.join(', ')}`);
      console.log(`    Timestamp: ${l.lastTs.toISOString().slice(0, 16).replace('T', ' ')} UTC`);
      console.log(`    ----------------------------------------------------------------------------`);
    });

    console.log(`\n\n================================================================================`);
    console.log(`📊 FULL MONTH AUDIT: ${resAugMonth.titleLabel}`);
    console.log(`   Total Leads Reached Checkout: ${resAugMonth.leadList.length}`);
    console.log(`   🔥 Repeated Attempts: ${resAugMonth.leadList.filter(l => l.checkoutAttempts > 1).length}`);
    console.log(`================================================================================\n`);

    resAugMonth.leadList.forEach((l, i) => {
      console.log(`[${i + 1}] ${l.checkoutAttempts > 1 ? '⭐ REPEAT CHECKOUT ATTEMPTS: ' + l.checkoutAttempts + ' TIMES' : 'SINGLE CHECKOUT ATTEMPT'}`);
      console.log(`    Name: ${l.name} | Email: ${l.email} | Phone: ${l.phone}`);
      console.log(`    Location: ${l.location} | Industry: ${l.industry} | Channel: ${l.channel}`);
      console.log(`    Product Interest: ${l.productInterest} | Score: ${l.score} (${l.tier})`);
      console.log(`    Events: ${l.events.join(', ')}`);
      console.log(`    Timestamp: ${l.lastTs.toISOString().slice(0, 16).replace('T', ' ')} UTC`);
      console.log(`    ----------------------------------------------------------------------------`);
    });

  } catch (err) {
    console.error('❌ Audit error:', err);
  }
}

main();
