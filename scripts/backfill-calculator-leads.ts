/**
 * One-time backfill: stamp calculatorCompletedAt on historical calculator leads.
 *
 * 78 leads have source containing "Calculator" but no calculatorCompletedAt in
 * their leadActivity JSON (column AZ / index 51). This script reads the sheet,
 * identifies those rows, and updates each one with a 1.5-second delay to stay
 * well under Google Sheets' 60 writes/min quota.
 *
 * Usage: npx tsx scripts/backfill-calculator-leads.ts [--dry-run]
 */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });
dotenv.config({ path: path.resolve(__dirname, '..', '.env.production.local') });

import { getGoogleSheetsClient } from '../lib/google-sheets';

const ACTIVITY_COL_INDEX = 51; // Column AZ (0-indexed)
const ACTIVITY_COL_LETTER = 'AZ';
const DRY_RUN = process.argv.includes('--dry-run');

async function main() {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) throw new Error('GOOGLE_SHEET_ID not set');

  console.log(`\n=== Calculator Lead Backfill ${DRY_RUN ? '(DRY RUN)' : '(LIVE)'} ===\n`);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'Leads'!A1:BW`,
  });
  const rows = response.data.values || [];
  console.log(`Total rows in sheet: ${rows.length - 1}`);

  const candidates: Array<{ rowNumber: number; email: string; source: string; timestamp: string; existingActivity: string }> = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const source = row[1] || '';
    const email = row[2] || '';
    const timestamp = row[0] || '';
    const activityRaw = row[ACTIVITY_COL_INDEX] || '{}';

    if (!source.toLowerCase().includes('calculator')) continue;
    if (activityRaw.includes('calculatorCompletedAt')) continue;

    candidates.push({ rowNumber: i + 1, email, source, timestamp, existingActivity: activityRaw });
  }

  console.log(`Calculator leads needing backfill: ${candidates.length}\n`);

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const candidate of candidates) {
    let activity: Record<string, any> = {};
    try {
      const raw = candidate.existingActivity;
      if (raw && raw !== '{}' && raw !== 'N/A') {
        activity = JSON.parse(raw);
      }
    } catch {
      activity = {};
    }

    activity.calculatorCompletedAt = candidate.timestamp;
    if (!activity.source) {
      activity.source = 'Grant Calculator Intake';
    }

    const newActivityJson = JSON.stringify(activity);

    console.log(`[Row ${candidate.rowNumber}] ${candidate.email} | source="${candidate.source}" | stampedAt=${candidate.timestamp}`);

    if (DRY_RUN) {
      skipped++;
      continue;
    }

    try {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `'Leads'!${ACTIVITY_COL_LETTER}${candidate.rowNumber}`,
        valueInputOption: 'RAW',
        requestBody: { values: [[newActivityJson]] },
      });
      updated++;
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (err: any) {
      console.error(`  ❌ Failed to update row ${candidate.rowNumber}: ${err.message}`);
      errors++;
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  console.log(`\n=== Backfill Complete ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped (dry-run): ${skipped}`);
  console.log(`Errors: ${errors}`);
}

main().catch(console.error);
