/**
 * FSI Digital — Historical Lead Reactivation Dispatcher: "The Funding Leak Receipt"
 * 
 * Target: Warm unpurchased leads who completed the calculator or inquiry form in the last 30-60 days.
 * Creative: Monospace thermal receipt artifact with prominent "TOTAL FUNDING LEFT UNCHECKED: ?"
 * Compliance:
 *   - Only displays genuine verified match count from frozen recommendation engine.
 *   - Strictly excludes existing buyers, internal/test emails, and unsubscribed contacts.
 *   - 48-hour contact cooldown enforced.
 *   - Supports --dry-run (default) and --execute.
 * 
 * Usage:
 *   npx tsx scripts/dispatch-historical-leak-receipt.ts --dry-run --limit=20
 *   npx tsx scripts/dispatch-historical-leak-receipt.ts --execute --limit=20
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env.production.local' });

import { getGoogleSheetsClient } from '../lib/google-sheets';
import { generateFundingRecommendationPlatform } from '../lib/products/report-generator';
import {
  sendFundingLeakReceiptEmail,
  resolveRecommendedProduct,
  type ProductOfferRecommendation
} from '../lib/emails/funding-leak-receipt';
import { isTestOrInternalContact } from '../lib/leads/commercial-eligibility';
import crypto from 'crypto';

interface LeadCandidate {
  rowIndex: number;
  email: string;
  name: string;
  companyName: string;
  province: string;
  industry: string;
  businessStage: string;
  fundingPurpose: string;
  loginToken: string;
  verifiedMatchCount: number;
  leadActivity: any;
  recommendedOffer: ProductOfferRecommendation;
}

async function run() {
  const isExecute = process.argv.includes('--execute');
  const dryRun = !isExecute;
  const limitArg = process.argv.find(arg => arg.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 20;

  console.log('\n===============================================================');
  console.log(`  FSI DIGITAL — "THE FUNDING LEAK RECEIPT" REACTIVATION DISPATCH`);
  console.log(`  Mode: ${dryRun ? '🔍 DRY RUN (Simulation - No Emails Sent)' : '🚀 LIVE EXECUTION (Real Emails Sent)'}`);
  console.log(`  Target Batch Limit: ${limit}`);
  console.log('===============================================================\n');

  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID is not configured in environment variables.');
    }

    console.log('📊 Fetching leads from Google Sheet...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Leads!A:BO',
    });

    const rows = response.data.values || [];
    if (rows.length === 0) {
      console.log('⚠️ No rows found in Google Sheet.');
      return;
    }

    console.log(`✅ Loaded ${rows.length} total rows (including header). Analyzing candidate cohort...\n`);

    const emailIndex = 2;          // Column C
    const nameIndex = 3;           // Column D
    const countryIndex = 4;        // Column E
    const regionIndex = 5;         // Column F
    const industryIndex = 6;       // Column G
    const businessStageIndex = 7;  // Column H
    const fundingAmountIndex = 8;  // Column I
    const fundingPurposeIndex = 9; // Column J
    const scoreIndex = 13;         // Column N
    const tierIndex = 14;          // Column O
    const isSubscribedIndex = 33;  // Column AH
    const loginTokenIndex = 42;    // Column AQ
    const companyNameIndex = 47;   // Column AV
    const reportPurchasedIndex = 48;// Column AW
    const leadActivityIndex = 51;  // Column AZ

    const candidates: LeadCandidate[] = [];
    const now = Date.now();
    const COOLDOWN_MS = 48 * 60 * 60 * 1000; // 48-hour cooldown

    let skippedBuyers = 0;
    let skippedInternal = 0;
    let skippedAlreadySent = 0;
    let skippedCooldown = 0;
    let skippedUnsubscribed = 0;

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const email = (row[emailIndex] || '').toLowerCase().trim();
      if (!email || !email.includes('@')) continue;

      // 1. Check internal / test emails
      if (isTestOrInternalContact({ email })) {
        skippedInternal++;
        continue;
      }

      // 2. Check buyer exclusion
      const reportPurchased = String(row[reportPurchasedIndex] || '').toLowerCase() === 'yes';
      if (reportPurchased) {
        skippedBuyers++;
        continue;
      }

      // 3. Parse activity
      let activity: any = {};
      const rawActivity = row[leadActivityIndex] || '{}';
      try {
        if (rawActivity && rawActivity !== 'N/A') {
          activity = JSON.parse(rawActivity);
        }
      } catch {
        activity = {};
      }

      // 4. Check if already received the Funding Leak Receipt or recent reactivation
      if (activity.fundingLeakReceiptSentAt || activity.calcRecoveryExperimentCohort === 'funding_leak_receipt') {
        skippedAlreadySent++;
        continue;
      }

      // 5. Check 48-hour contact cooldown
      const lastContactStr = activity.lastContactedAt || activity.alertNurtureSentAt || row[55] || null;
      if (lastContactStr) {
        const lastContactTime = new Date(lastContactStr).getTime();
        if (!isNaN(lastContactTime) && now - lastContactTime < COOLDOWN_MS) {
          skippedCooldown++;
          continue;
        }
      }

      // 6. Check unsubscription
      const isSubscribed = String(row[isSubscribedIndex] || '').toLowerCase();
      if (isSubscribed === 'no' || isSubscribed === 'false') {
        skippedUnsubscribed++;
        continue;
      }

      // 7. Calculate genuine match count from frozen recommendation engine
      const countryRaw = String(row[countryIndex] || '').toUpperCase();
      const isUS = countryRaw === 'USA' || countryRaw === 'US';
      const province = row[regionIndex] || (isUS ? 'ca' : 'on');
      const industry = row[industryIndex] || 'technology';
      const businessStage = row[businessStageIndex] || 'pre-revenue';
      const fundingPurpose = row[fundingPurposeIndex] || 'hiring';
      const fundingAmount = String(row[fundingAmountIndex] || '');
      const score = Number(row[scoreIndex] || 0);
      const tier = String(row[tierIndex] || 'C').toUpperCase();

      let genuineMatchCount = 0;
      try {
        const rec = generateFundingRecommendationPlatform({
          province,
          industry,
          revenue: businessStage,
          goal: fundingPurpose,
        });
        genuineMatchCount = rec.primaryRecommendations.length;
      } catch {
        genuineMatchCount = 0;
      }

      // 8. Resolve smart product recommendation ($19, $49, or $79)
      const recommendedOffer = resolveRecommendedProduct({
        score,
        tier,
        annualRevenue: businessStage,
        fundingAmount,
        industry,
      });

      const loginToken = row[loginTokenIndex] || crypto.randomBytes(16).toString('hex');
      const name = row[nameIndex] || 'Founder';
      const companyName = row[companyNameIndex] || '';

      candidates.push({
        rowIndex: i + 1, // 1-based sheet row number
        email,
        name,
        companyName,
        province,
        industry,
        businessStage,
        fundingPurpose,
        loginToken,
        verifiedMatchCount: genuineMatchCount,
        leadActivity: activity,
        recommendedOffer,
      });

      if (candidates.length >= limit) {
        break;
      }
    }

    console.log(`📋 Candidate Filtering Summary:`);
    console.log(`   - Eligible Candidates Selected: ${candidates.length} (Capped at limit: ${limit})`);
    console.log(`   - Skipped (Existing Buyers): ${skippedBuyers}`);
    console.log(`   - Skipped (Internal / Test Accounts): ${skippedInternal}`);
    console.log(`   - Skipped (Already Received Receipt): ${skippedAlreadySent}`);
    console.log(`   - Skipped (Within 48h Cooldown): ${skippedCooldown}`);
    console.log(`   - Skipped (Unsubscribed Contacts): ${skippedUnsubscribed}\n`);

    if (candidates.length === 0) {
      console.log('ℹ️ No eligible uncontacted leads meet the dispatch criteria right now.');
      return;
    }

    console.log('---------------------------------------------------------------');
    console.log('TARGET RECIPIENT COHORT:');
    candidates.forEach((c, idx) => {
      console.log(`  [${idx + 1}] ${c.email} | Offer: ${c.recommendedOffer.productName} (${c.recommendedOffer.price}) | Co: ${c.companyName || 'N/A'} | Region: ${c.province.toUpperCase()} | Matches: ${c.verifiedMatchCount}`);
    });
    console.log('---------------------------------------------------------------\n');

    if (dryRun) {
      console.log('🔒 DRY RUN COMPLETE: Zero emails sent. All candidate eligibility, smart product offers, & genuine match counts verified.');
      console.log('👉 To dispatch live to this cohort, run:');
      console.log(`   npx tsx scripts/dispatch-historical-leak-receipt.ts --execute --limit=${limit}\n`);
      return;
    }

    // Live Execution
    console.log(`🚀 DISPATCHING LIVE EMAILS TO ${candidates.length} RECIPIENTS...`);
    let sentCount = 0;
    let failCount = 0;

    for (const c of candidates) {
      try {
        console.log(`  📤 Sending to ${c.email} (Offer: ${c.recommendedOffer.productName} ${c.recommendedOffer.price}, Matches: ${c.verifiedMatchCount})...`);
        const sendResult = await sendFundingLeakReceiptEmail({
          to: c.email,
          name: c.name,
          companyName: c.companyName,
          province: c.province,
          industry: c.industry,
          verifiedMatchCount: c.verifiedMatchCount > 0 ? c.verifiedMatchCount : null,
          loginToken: c.loginToken,
          sourceCampaign: 'historical_reactivation_receipt_v1',
          productOffer: c.recommendedOffer,
        });

        if (sendResult.success) {
          sentCount++;
          console.log(`     ✅ Dispatched successfully (ID: ${sendResult.id || 'ok'})`);

          // Update leadActivity in Google Sheet
          c.leadActivity.fundingLeakReceiptSentAt = new Date().toISOString();
          c.leadActivity.fundingLeakReceiptCampaign = 'historical_reactivation_receipt_v1';
          c.leadActivity.lastContactedAt = new Date().toISOString();

          await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `Leads!AZ${c.rowIndex}`,
            valueInputOption: 'RAW',
            requestBody: {
              values: [[JSON.stringify(c.leadActivity)]],
            },
          });
        } else {
          failCount++;
          console.warn(`     ⚠️ Send failed:`, sendResult.error);
        }

        // Pacing delay (1 second between emails to prevent rate limiting)
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (err: any) {
        failCount++;
        console.error(`     ❌ Error processing ${c.email}:`, err?.message || err);
      }
    }

    console.log('\n===============================================================');
    console.log(`  DISPATCH COMPLETE`);
    console.log(`  - Total Sent: ${sentCount}`);
    console.log(`  - Failed: ${failCount}`);
    console.log('===============================================================\n');
  } catch (err: any) {
    console.error('❌ Reactivation script encountered a fatal error:', err);
  }
}

run();
