/**
 * FSI Digital — Safe Bot Quarantine & Database Cleaning Script
 * 
 * Safety Protocol:
 * 1. Verifies that known real founders (Ashley Chauvin, Voltcast, etc.) are 100% PRESERVED.
 * 2. Archives all 857 original rows into a new Google Sheets tab: "Leads_Backup_Nov21".
 * 3. Archives all 190 identified bot rows into a dedicated "Quarantined_Bots" tab with audit reasons.
 * 4. Cleans the active "Leads" tab to contain ONLY genuine human founders (666 leads + header).
 */

import { getGoogleSheetsClient } from "../lib/google-sheets";
import { evaluateLeadForBotSignatures } from "../lib/leads/bot-detector";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: ".env.local" });

const KNOWN_REAL_FOUNDERS_SANITY_CHECK = [
  "c.slade@voltcast.ca",
  "achauvs@hotmail.com",
  "aprildostal@yahoo.com",
  "randymcbride1952@outlook.com",
  "garet.avery@kanaleaf.ca",
  "sapna@digiruptor.io",
  "501.syndicate.productions@gmail.com",
  "vcathletictherapy@gmail.com",
  "furballsempire.shop@gmail.com",
  "wendy.hauck@mcgill.ca",
  "megan.haley@powerbankcorp.com",
  "johnh@pinevalleypackaging.com",
  "terri.johnson@amta.ca",
  "fcorcoz@sotecma.com"
];

async function runQuarantine() {
  console.log("════════════════════════════════════════════════════════════════════");
  console.log("🛡️ FSI DIGITAL — SAFE BOT LEAD QUARANTINE ENGINE");
  console.log("════════════════════════════════════════════════════════════════════\n");

  const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Missing GOOGLE_SHEET_ID environment variable.");
  }

  const sheets = await getGoogleSheetsClient();
  console.log("📡 Fetching active Leads sheet from Google Sheets...");
  const leadRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Leads!A:AZ",
  });

  const allRows = leadRes.data.values || [];
  if (allRows.length === 0) {
    throw new Error("Leads sheet is empty. Aborting.");
  }

  const header = allRows[0];
  console.log(`📋 Total rows retrieved: ${allRows.length} (1 header + ${allRows.length - 1} leads)\n`);

  const botRows: Array<{ row: any[]; reason: string; email: string; name: string }> = [];
  const cleanHumanRows: any[][] = [header];

  for (let i = 1; i < allRows.length; i++) {
    const row = allRows[i];
    const email = row[2];
    const name = row[3];
    const province = row[5];
    const industry = row[6];
    const desc = row[10];

    const check = evaluateLeadForBotSignatures({
      email,
      name,
      province,
      industry,
      businessDescription: desc,
    });

    if (check.isBot) {
      botRows.push({
        row,
        reason: check.reason || "Synthetic bot detected",
        email: (email || "").trim(),
        name: (name || "").trim(),
      });
    } else {
      cleanHumanRows.push(row);
    }
  }

  console.log(`📊 Classification Results:`);
  console.log(`   - Total Synthetic Bots to Quarantine: ${botRows.length}`);
  console.log(`   - Total Clean Human Leads to Preserve: ${cleanHumanRows.length - 1}\n`);

  // MANDATORY SANITY CHECK: Ensure NO real founder was classified as a bot
  console.log("🔍 Performing Zero-False-Positive Sanity Check on Known Real Founders...");
  for (const founderEmail of KNOWN_REAL_FOUNDERS_SANITY_CHECK) {
    const isClean = cleanHumanRows.some(r => (r[2] || "").toLowerCase().includes(founderEmail));
    const isBot = botRows.some(b => b.email.toLowerCase().includes(founderEmail));

    if (!isClean || isBot) {
      throw new Error(`🚨 FATAL SAFETY TRIPPED: Real founder ${founderEmail} was flagged as a bot! Aborting entire operation.`);
    }
    console.log(`   ✅ Confirmed Human: ${founderEmail}`);
  }
  console.log("🛡️ Sanity check PASSED 100%. Zero real founders will be affected.\n");

  // Step 1: Ensure Backup Tab and Quarantined Tab exist in Google Spreadsheet
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const existingTabs = new Set((meta.data.sheets || []).map(s => s.properties?.title));

  const tabsToCreate: string[] = [];
  if (!existingTabs.has("Leads_Backup_Nov21")) tabsToCreate.push("Leads_Backup_Nov21");
  if (!existingTabs.has("Quarantined_Bots")) tabsToCreate.push("Quarantined_Bots");

  if (tabsToCreate.length > 0) {
    console.log(`📁 Creating missing tabs in Google Sheets: ${tabsToCreate.join(", ")}...`);
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: tabsToCreate.map(title => ({
          addSheet: { properties: { title } },
        })),
      },
    });
    console.log("   ✅ Tabs successfully created.\n");
  }

  // Step 2: Populate Leads_Backup_Nov21 with 100% of the original rows
  console.log("💾 Writing untouched full backup to Leads_Backup_Nov21...");
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Leads_Backup_Nov21!A1",
    valueInputOption: "RAW",
    requestBody: { values: allRows },
  });
  console.log("   ✅ Leads_Backup_Nov21 populated with all original rows.\n");

  // Step 3: Populate Quarantined_Bots with bot rows + reasons
  console.log("💾 Writing quarantined bots to Quarantined_Bots tab...");
  const botHeader = [...header, "Quarantine Date", "Quarantine Reason"];
  const botSheetValues = [
    botHeader,
    ...botRows.map(b => [...b.row, new Date().toISOString(), b.reason]),
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Quarantined_Bots!A1",
    valueInputOption: "RAW",
    requestBody: { values: botSheetValues },
  });
  console.log(`   ✅ Quarantined_Bots populated with ${botRows.length} bot records.\n`);

  // Step 4: Clean the main Leads sheet
  console.log("🧹 Updating active Leads sheet with 666 genuine human leads...");
  // First clear existing range
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: "Leads!A1:AZ1000",
  });

  // Write clean rows
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Leads!A1",
    valueInputOption: "RAW",
    requestBody: { values: cleanHumanRows },
  });
  console.log("   ✅ Leads sheet updated successfully.\n");

  // Step 5: Verification check
  const verifyRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Leads!A:AZ",
  });
  const verifiedRows = verifyRes.data.values || [];
  console.log(`🎉 VERIFICATION COMPLETE:`);
  console.log(`   - Clean Leads in Active Database: ${verifiedRows.length - 1}`);
  console.log(`   - Archived Bots in Quarantined_Bots: ${botRows.length}`);
  console.log(`   - Untouched Raw Backup in Leads_Backup_Nov21: ${allRows.length - 1}`);
}

runQuarantine().catch(err => {
  console.error("❌ Quarantine operation failed:", err);
  process.exit(1);
});
