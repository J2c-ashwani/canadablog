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

async function main() {
  console.log('📡 Pulling ALL raw leads received from August 7th to August 11th across all databases...\n');

  const START_DATE = new Date('2026-08-07T00:00:00.000Z');

  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  // 1. Fetch Leads tab
  const leadsRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Leads!A2:BW',
  });
  const leadRows = leadsRes.data.values || [];

  // 2. Fetch MCA Applications tab
  let mcaRows = [];
  try {
    const mcaRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "'MCA Applications'!A2:AW",
    });
    mcaRows = mcaRes.data.values || [];
  } catch (e) {}

  // 3. Fetch Funnel Events (Telemetry)
  let telemetryRows = [];
  try {
    const telRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Funnel Events!A2:Q',
    });
    telemetryRows = telRes.data.values || [];
  } catch (e) {}

  console.log(`================================================================================`);
  console.log(`📊 RAW INGESTION AUDIT: AUGUST 7, 2026 TO AUGUST 11, 2026`);
  console.log(`================================================================================\n`);

  const aug7Leads = [];

  // Check Leads tab
  leadRows.forEach((row, idx) => {
    const ts = parseDate(row[0]);
    if (ts && ts >= START_DATE) {
      aug7Leads.push({
        sourceTab: 'Leads (Main Database)',
        timestamp: row[0],
        source: row[1] || 'N/A',
        email: row[2] || 'N/A',
        name: row[3] || 'N/A',
        country: row[4] || 'N/A',
        state: row[5] || 'N/A',
        industry: row[6] || 'N/A',
        fundingAmount: row[8] || 'N/A',
        phone: row[11] || 'N/A',
        score: row[13] || 'N/A',
        tier: row[14] || 'N/A',
        reportPurchased: row[48] || 'No',
        pagePath: row[22] || 'N/A',
        leadActivity: row[51] || '{}',
      });
    }
  });

  // Check MCA Applications tab
  mcaRows.forEach((row, idx) => {
    const ts = parseDate(row[0]);
    if (ts && ts >= START_DATE) {
      aug7Leads.push({
        sourceTab: 'MCA Applications',
        timestamp: row[0],
        source: 'MCA Application Intake',
        email: row[10] || 'N/A',
        name: row[9] || 'N/A',
        legalBusinessName: row[2] || 'N/A',
        country: 'Canada',
        state: row[7] || 'N/A',
        industry: row[13] || 'N/A',
        fundingAmount: row[17] || 'N/A',
        phone: row[11] || 'N/A',
        score: row[23] || 'N/A',
        tier: row[24] || 'N/A',
        priorityProcessing: row[26] || 'No',
        recoveryStage: row[47] || 'NONE',
      });
    }
  });

  console.log(`Total Raw Leads Received (Aug 7 – Aug 11): ${aug7Leads.length}\n`);

  if (aug7Leads.length === 0) {
    console.log(`❌ ZERO LEADS were submitted to the database between August 7th and August 11th.`);
  } else {
    aug7Leads.forEach((l, i) => {
      console.log(`[${i + 1}] Source Tab: ${l.sourceTab}`);
      console.log(`    Timestamp: ${l.timestamp}`);
      console.log(`    Name: ${l.name} | Email: ${l.email} | Phone: ${l.phone}`);
      console.log(`    Location: ${l.country}-${l.state} | Industry: ${l.industry} | Funding Amount: ${l.fundingAmount}`);
      console.log(`    Form Source: ${l.source} | Page: ${l.pagePath || 'N/A'}`);
      console.log(`    Score: ${l.score} (${l.tier}) | Activity: ${l.leadActivity || 'N/A'}`);
      console.log(`    ----------------------------------------------------------------------------`);
    });
  }

  // Check Most Recent 10 Leads in Leads tab for reference
  console.log(`\n\n================================================================================`);
  console.log(`📋 MOST RECENT 10 LEADS IN DATABASE (Regardless of Date):`);
  console.log(`================================================================================\n`);

  const recent10 = leadRows
    .map(row => ({
      timestamp: row[0] || '',
      email: row[2] || '',
      name: row[3] || '',
      source: row[1] || '',
      score: row[13] || '',
      tier: row[14] || '',
    }))
    .filter(l => l.timestamp && l.email)
    .sort((a, b) => {
      const dA = parseDate(a.timestamp);
      const dB = parseDate(b.timestamp);
      return (dB ? dB.getTime() : 0) - (dA ? dA.getTime() : 0);
    })
    .slice(0, 10);

  recent10.forEach((l, i) => {
    console.log(`[${i + 1}] Date: ${l.timestamp} | Email: ${l.email} | Name: ${l.name} | Source: ${l.source} | Score: ${l.score}`);
  });
}

main();
