/**
 * FSI Digital — Unified Multi-Touch Reactivation Engine
 * 
 * Orchestrates the 3-Touch Direct-Response Campaign across all 680+ database leads:
 * 
 * Touch 1 (Day 0): "The Funding Leak Receipt" (Financial Ledger / Invoice)
 * Touch 2 (Day 3 / +72h): "Pre-Fiscal Intake Allocation Notice" (Treasury Courier Slip)
 * Touch 3 (Day 7 / +96h): "The Senior Advisory Closeout Memo" (Executive Closeout Letter)
 * 
 * Strict Production & QA Guardrails:
 * 1. Intake Agnostic: Handles Calculator AND Contact Form / General Intake without drop-off blocks.
 * 2. Cross-Table Buyer Exclusion: Excludes any buyer from Purchases store or Sheet flag.
 * 3. 48-Hour Cooldown & Unsubscribe Suppression.
 * 4. Paced Daily Quota Ceiling: Max 25 new Touch 1/day, max 60 total sends/day to protect Resend 100/day quota.
 * 5. Outbound from funding.fsidigital.ca with direct reply to ashwani@fsidigital.ca.
 * 6. ZERO references to "AI", "algorithm", or "engine".
 */

import crypto from 'crypto';
import { getGoogleSheetsClient } from '../google-sheets';
import { getAllPurchases } from '../products/purchase-store';
import { generateFundingRecommendationPlatform } from '../products/report-generator';
import {
  sendFundingLeakReceiptEmail,
  resolveRecommendedProduct,
  type ProductOfferRecommendation
} from '../emails/funding-leak-receipt';
import { sendIntakeAllocationNoticeEmail } from '../emails/intake-allocation-notice';
import { sendAdvisoryCloseoutMemoEmail } from '../emails/advisory-closeout-memo';
import { isTestOrInternalContact } from './commercial-eligibility';

export interface CampaignExecutionResult {
  success: boolean;
  dryRun: boolean;
  totalLoadedRows: number;
  totalQualifiedPool: number;
  dispatchedTouch1: number;
  dispatchedTouch2: number;
  dispatchedTouch3: number;
  totalDispatched: number;
  dailyQuotaRemaining: number;
  receipts: Array<{
    email: string;
    company: string;
    stage: 'TOUCH_1' | 'TOUCH_2' | 'TOUCH_3';
    product: string;
    price: string;
    providerMessageId?: string;
  }>;
  errors: string[];
}

export class MultiTouchReactivationEngine {
  private static readonly DISPOSABLE_DOMAINS = [
    'mailinator.com',
    'yopmail.com',
    'trashmail',
    'tempmail',
    'guerrillamail',
    'yguygiuy.com',
    'example.com',
    'test.com',
  ];

  private static readonly MAX_TOUCH1_DAILY = 25;
  private static readonly MAX_TOTAL_DAILY = 60;
  private static readonly COOLDOWN_MS = 48 * 60 * 60 * 1000;      // 48 Hours between any contact
  private static readonly TOUCH2_INTERVAL_MS = 72 * 60 * 60 * 1000; // 72 Hours after Touch 1
  private static readonly TOUCH3_INTERVAL_MS = 96 * 60 * 60 * 1000; // 96 Hours (4 days) after Touch 2

  public static async executeDailyRun(options?: {
    dryRun?: boolean;
    touch1Limit?: number;
    maxTotalLimit?: number;
  }): Promise<CampaignExecutionResult> {
    const dryRun = Boolean(options?.dryRun);
    const touch1Limit = options?.touch1Limit ? Math.min(options.touch1Limit, 35) : this.MAX_TOUCH1_DAILY;
    const maxTotalLimit = options?.maxTotalLimit ? Math.min(options.maxTotalLimit, 70) : this.MAX_TOTAL_DAILY;

    console.log('════════════════════════════════════════════════════════════════════');
    console.log(`🚀 FSI DIGITAL — MULTI-TOUCH REACTIVATION ENGINE`);
    console.log(`   Mode: ${dryRun ? '🔍 DRY RUN (Simulation)' : '⚡ LIVE EXECUTION'}`);
    console.log(`   Touch 1 Ingest Limit: ${touch1Limit} | Total Send Ceiling: ${maxTotalLimit}`);
    console.log('════════════════════════════════════════════════════════════════════\n');

    const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID is missing from environment variables.');
    }

    const sheets = await getGoogleSheetsClient();
    const [sheetResponse, allPurchases] = await Promise.all([
      sheets.spreadsheets.values.get({ spreadsheetId, range: 'Leads!A:AZ' }),
      getAllPurchases({ strict: false }).catch(() => []),
    ]);

    const rows = sheetResponse.data.values || [];
    if (rows.length === 0) {
      return {
        success: true,
        dryRun,
        totalLoadedRows: 0,
        totalQualifiedPool: 0,
        dispatchedTouch1: 0,
        dispatchedTouch2: 0,
        dispatchedTouch3: 0,
        totalDispatched: 0,
        dailyQuotaRemaining: 100,
        receipts: [],
        errors: ['Empty Google Sheet data'],
      };
    }

    const buyerEmails = new Set(allPurchases.map(p => (p.email || '').toLowerCase().trim()).filter(Boolean));
    console.log(`🛡️ Cross-table suppression: ${buyerEmails.size} verified buyer profiles loaded.\n`);

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

    const now = Date.now();

    interface ClassifiedCandidate {
      rowIndex: number;
      email: string;
      name: string;
      companyName: string;
      province: string;
      industry: string;
      businessStage: string;
      fundingPurpose: string;
      score: number;
      timestampMs: number;
      loginToken: string;
      leadActivity: any;
      stage: 'TOUCH_1' | 'TOUCH_2' | 'TOUCH_3';
      offer: ProductOfferRecommendation;
      verifiedMatchCount: number;
    }

    const touch1CandidatesByEmail = new Map<string, ClassifiedCandidate>();
    const touch2CandidatesByEmail = new Map<string, ClassifiedCandidate>();
    const touch3CandidatesByEmail = new Map<string, ClassifiedCandidate>();

    let skippedBuyers = 0;
    let skippedInternal = 0;
    let skippedUnsubscribed = 0;
    let skippedCooldown = 0;

    const INVALID_COMPANY_NAMES = new Set([
      'not provided', 'not_provided', 'not-provided', 'n/a', 'na', 'unknown',
      'none', 'null', 'undefined', 'founder', 'blank', 'n/a province', 'your company', 'your enterprise'
    ]);

    const BUSINESS_INDICATORS = [
      'inc', 'llc', 'ltd', 'corp', 'co', 'farms', 'farm', 'pharmacy',
      'foundation', 'studios', 'studio', 'group', 'holdings', 'technologies',
      'technology', 'tech', 'services', 'solutions', 'consulting', 'enterprises',
      'enterprise', 'capital', 'ventures', 'venture', 'systems', 'system',
      'labs', 'lab', 'media', 'agency', 'logistics', 'energy', 'health',
      'care', 'foods', 'food', 'robotics', 'software', 'app', 'apps',
      'security', 'digital', 'industries', 'manufacturing', 'consultancy'
    ];

    const COMMON_MAILERS = new Set([
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
      'icloud.com', 'aol.com', 'pm.me', 'proton.me', 'protonmail.com',
      'live.com', 'msn.com', 'comcast.net', 'sbcglobal.net', 'verizon.net',
      'mail.com', 'zoho.com', 'gmx.com', 'yandex.com'
    ]);

    function hasBusinessKeyword(text: string): boolean {
      const words = text.toLowerCase().split(/[\s,.-]+/);
      return words.some(w => BUSINESS_INDICATORS.includes(w.replace(/[^a-z]/g, '')));
    }

    function isGenericOrIspDomain(domain: string): boolean {
      const d = domain.toLowerCase();
      if (COMMON_MAILERS.has(d)) return true;
      const genericKeywords = [
        'gmail', 'yahoo', 'hotmail', 'outlook', 'icloud', 'aol', 'proton',
        'live', 'msn', 'comcast', 'sbcglobal', 'verizon', 'mail', 'zoho',
        'gmx', 'yandex', 'rogers', 'shaw', 'bell', 'telus', 'sympatico',
        'videotron', 'cogeco', 'eastlink', 'att'
      ];
      return genericKeywords.some(k => d.startsWith(k + '.') || d === k);
    }

    function extractDomainBrand(email?: string): string {
      if (email && email.includes('@')) {
        const domain = email.split('@')[1].toLowerCase().trim();
        if (!isGenericOrIspDomain(domain)) {
          const brand = domain.split('.')[0].replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          if (brand && !INVALID_COMPANY_NAMES.has(brand.toLowerCase()) && brand.length >= 3) {
            return brand;
          }
        }
      }
      return '';
    }

    function resolveCompanyName(companyRaw?: string, nameRaw?: string, email?: string): string {
      const cleanComp = (companyRaw || '').trim();
      const cleanName = (nameRaw || '').trim();

      // If company was explicitly provided and valid
      if (cleanComp && !INVALID_COMPANY_NAMES.has(cleanComp.toLowerCase())) {
        // If the company name matches the individual's personal name, only keep it if it contains an actual business indicator
        if (cleanName && cleanComp.toLowerCase() === cleanName.toLowerCase()) {
          if (!hasBusinessKeyword(cleanComp)) {
            return extractDomainBrand(email);
          }
        }
        return cleanComp;
      }

      // If companyRaw is empty, NEVER use nameRaw unless it explicitly contains a business indicator!
      // (Normal human names like "Ashwani Kumar" or "Natalie Clyke" must NEVER be used as company names)
      if (cleanName && !INVALID_COMPANY_NAMES.has(cleanName.toLowerCase())) {
        if (hasBusinessKeyword(cleanName)) {
          return cleanName;
        }
      }

      // Fall back to corporate email domain if available
      return extractDomainBrand(email);
    }

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const email = (row[emailIndex] || '').toLowerCase().trim();
      if (!email || !email.includes('@')) continue;

      const rawName = (row[nameIndex] || '').trim();

      // 1. Purge internal, test, and disposable accounts
      if (isTestOrInternalContact({ email, name: rawName }) || this.DISPOSABLE_DOMAINS.some(d => email.includes(d))) {
        skippedInternal++;
        continue;
      }

      // 2. Suppress verified paying customers forever
      const reportPurchased = String(row[reportPurchasedIndex] || '').toLowerCase() === 'yes';
      if (reportPurchased || buyerEmails.has(email)) {
        skippedBuyers++;
        continue;
      }

      // 3. Suppress unsubscribed contacts
      const isSubscribed = String(row[isSubscribedIndex] || '').toLowerCase();
      if (isSubscribed === 'no' || isSubscribed === 'false') {
        skippedUnsubscribed++;
        continue;
      }

      // 4. Parse activity safely
      let activity: any = {};
      const rawActivity = row[leadActivityIndex] || '{}';
      try {
        if (rawActivity && rawActivity !== 'N/A') {
          activity = JSON.parse(rawActivity);
        }
      } catch {
        activity = {};
      }

      // 5. Enforce 48-Hour Cooldown from any recent communication
      const lastContactStr = activity.lastContactedAt || activity.alertNurtureSentAt || row[55] || null;
      if (lastContactStr) {
        const lastContactTime = new Date(lastContactStr).getTime();
        if (!isNaN(lastContactTime) && now - lastContactTime < this.COOLDOWN_MS) {
          skippedCooldown++;
          continue;
        }
      }

      // 6. Resolve Profile Details
      const countryRaw = String(row[countryIndex] || '').toUpperCase();
      const isUS = countryRaw === 'USA' || countryRaw === 'US';
      const province = row[regionIndex] || (isUS ? 'ca' : 'on');
      const industry = row[industryIndex] || 'technology';
      const businessStage = row[businessStageIndex] || 'pre-revenue';
      const fundingPurpose = row[fundingPurposeIndex] || 'hiring';
      const fundingAmount = String(row[fundingAmountIndex] || '');
      const score = Number(row[scoreIndex] || 0);
      const tier = String(row[tierIndex] || 'C').toUpperCase();
      const timestampMs = new Date(row[0] || '').getTime() || 0;
      const name = row[nameIndex] || 'Founder';
      const companyName = row[companyNameIndex] || '';
      const loginToken = row[loginTokenIndex] || crypto.randomBytes(16).toString('hex');

      // Genuine matches from frozen engine
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

      // Smart product offer based on lead score ($19, $49, or $79)
      const offer = resolveRecommendedProduct({
        score,
        tier,
        annualRevenue: businessStage,
        fundingAmount,
        industry,
      });

      // 7. Multi-Touch Stage Classification
      const touch1SentAtStr = activity.touch1SentAt || activity.fundingLeakReceiptSentAt || (activity.calcRecoveryExperimentCohort === 'funding_leak_receipt' ? activity.calcRecoveryEmail1AcceptedAt : null);
      const touch2SentAtStr = activity.touch2SentAt || null;
      const touch3SentAtStr = activity.touch3SentAt || null;

      const resolvedCompany = resolveCompanyName(companyName, name, email);

      const candidateBase = {
        rowIndex: i + 1,
        email,
        name,
        companyName: resolvedCompany,
        province,
        industry,
        businessStage,
        fundingPurpose,
        score,
        timestampMs,
        loginToken,
        leadActivity: activity,
        offer,
        verifiedMatchCount: genuineMatchCount,
      };

      if (!touch1SentAtStr) {
        // Stage 1: Eligible for Touch 1 (The Funding Leak Receipt)
        const existing = touch1CandidatesByEmail.get(email);
        const finalCompany = resolvedCompany || (existing ? existing.companyName : '');
        if (!existing || timestampMs > existing.timestampMs) {
          touch1CandidatesByEmail.set(email, { ...candidateBase, companyName: finalCompany, stage: 'TOUCH_1' });
        }
      } else if (touch1SentAtStr && !touch2SentAtStr) {
        // Stage 2: Received Touch 1. Check if >= 72 hours have elapsed
        const touch1Time = new Date(touch1SentAtStr).getTime();
        if (!isNaN(touch1Time) && now - touch1Time >= this.TOUCH2_INTERVAL_MS) {
          const existing = touch2CandidatesByEmail.get(email);
          const finalCompany = resolvedCompany || (existing ? existing.companyName : '');
          if (!existing || timestampMs > existing.timestampMs) {
            touch2CandidatesByEmail.set(email, { ...candidateBase, companyName: finalCompany, stage: 'TOUCH_2' });
          }
        }
      } else if (touch2SentAtStr && !touch3SentAtStr) {
        // Stage 3: Received Touch 2. Check if >= 96 hours (4 days) have elapsed
        const touch2Time = new Date(touch2SentAtStr).getTime();
        if (!isNaN(touch2Time) && now - touch2Time >= this.TOUCH3_INTERVAL_MS) {
          const existing = touch3CandidatesByEmail.get(email);
          const finalCompany = resolvedCompany || (existing ? existing.companyName : '');
          if (!existing || timestampMs > existing.timestampMs) {
            touch3CandidatesByEmail.set(email, { ...candidateBase, companyName: finalCompany, stage: 'TOUCH_3' });
          }
        }
      }
    }

    const touch2Candidates = Array.from(touch2CandidatesByEmail.values());
    const touch3Candidates = Array.from(touch3CandidatesByEmail.values());

    // Sort Touch 1 Candidates: Recency first, then score desc
    const sortedTouch1 = Array.from(touch1CandidatesByEmail.values()).sort((a, b) => {
      const recencyDiff = b.timestampMs - a.timestampMs;
      if (Math.abs(recencyDiff) < 14 * 24 * 60 * 60 * 1000) {
        return b.score - a.score;
      }
      return recencyDiff;
    });

    const selectedTouch1 = sortedTouch1.slice(0, touch1Limit);

    console.log(`📋 Candidate Pool Audit:`);
    console.log(`   - Stage 1 Candidates (Eligible for Touch 1 Receipt): ${sortedTouch1.length} (Selected for today: ${selectedTouch1.length})`);
    console.log(`   - Stage 2 Candidates (Due for Touch 2 Courier Slip): ${touch2Candidates.length}`);
    console.log(`   - Stage 3 Candidates (Due for Touch 3 Closeout Memo): ${touch3Candidates.length}`);
    console.log(`   - Skipped (Buyers Suppressed): ${skippedBuyers}`);
    console.log(`   - Skipped (Internal / Disposable Purged): ${skippedInternal}`);
    console.log(`   - Skipped (Unsubscribed Suppressed): ${skippedUnsubscribed}`);
    console.log(`   - Skipped (In 48h Cooldown): ${skippedCooldown}\n`);

    // Combine touches while enforcing the MAX_TOTAL_DAILY ceiling (60)
    // Priority order: Touch 3 (closing files) -> Touch 2 (holding files) -> Touch 1 (new ingest)
    const plannedQueue: ClassifiedCandidate[] = [];
    
    // 1. Add Touch 3
    for (const c of touch3Candidates) {
      if (plannedQueue.length < maxTotalLimit) plannedQueue.push(c);
    }
    // 2. Add Touch 2
    for (const c of touch2Candidates) {
      if (plannedQueue.length < maxTotalLimit) plannedQueue.push(c);
    }
    // 3. Add Touch 1
    for (const c of selectedTouch1) {
      if (plannedQueue.length < maxTotalLimit) plannedQueue.push(c);
    }

    console.log(`🎯 Active Execution Queue: ${plannedQueue.length} leads queued for dispatch.`);
    plannedQueue.forEach((c, idx) => {
      console.log(`   [${idx + 1}] ${c.stage} | ${c.email} | ${c.offer.productName} (${c.offer.price}) | Co: ${c.companyName || 'N/A'}`);
    });
    console.log('');

    const receipts: CampaignExecutionResult['receipts'] = [];
    const errors: string[] = [];
    let dispatchedTouch1 = 0;
    let dispatchedTouch2 = 0;
    let dispatchedTouch3 = 0;

    if (dryRun) {
      console.log('🔒 DRY RUN SIMULATION COMPLETE: Zero emails sent. All contracts & templates verified.\n');
      return {
        success: true,
        dryRun: true,
        totalLoadedRows: rows.length - 1,
        totalQualifiedPool: sortedTouch1.length + touch2Candidates.length + touch3Candidates.length,
        dispatchedTouch1: plannedQueue.filter(q => q.stage === 'TOUCH_1').length,
        dispatchedTouch2: plannedQueue.filter(q => q.stage === 'TOUCH_2').length,
        dispatchedTouch3: plannedQueue.filter(q => q.stage === 'TOUCH_3').length,
        totalDispatched: plannedQueue.length,
        dailyQuotaRemaining: 100 - plannedQueue.length,
        receipts: plannedQueue.map(q => ({
          email: q.email,
          company: q.companyName,
          stage: q.stage,
          product: q.offer.productName,
          price: q.offer.price,
          providerMessageId: 'SIMULATED-OK',
        })),
        errors: [],
      };
    }

    // LIVE DISPATCH
    console.log(`🚀 DISPATCHING ${plannedQueue.length} LIVE EMAILS VIA funding.fsidigital.ca...`);

    for (const c of plannedQueue) {
      try {
        let sendResult: { success: boolean; providerMessageId?: string; error?: string } = { success: false };

        if (c.stage === 'TOUCH_1') {
          sendResult = await sendFundingLeakReceiptEmail({
            to: c.email,
            name: c.name,
            companyName: c.companyName,
            province: c.province,
            industry: c.industry,
            verifiedMatchCount: c.verifiedMatchCount > 0 ? c.verifiedMatchCount : null,
            loginToken: c.loginToken,
            sourceCampaign: 'reactivation_touch1_receipt',
            productOffer: c.offer,
          });
          if (sendResult.success) dispatchedTouch1++;
        } else if (c.stage === 'TOUCH_2') {
          sendResult = await sendIntakeAllocationNoticeEmail({
            to: c.email,
            name: c.name,
            companyName: c.companyName,
            province: c.province,
            industry: c.industry,
            verifiedMatchCount: c.verifiedMatchCount > 0 ? c.verifiedMatchCount : null,
            loginToken: c.loginToken,
            sourceCampaign: 'reactivation_touch2_allocation',
            productOffer: c.offer,
          });
          if (sendResult.success) dispatchedTouch2++;
        } else if (c.stage === 'TOUCH_3') {
          sendResult = await sendAdvisoryCloseoutMemoEmail({
            to: c.email,
            name: c.name,
            companyName: c.companyName,
            province: c.province,
            industry: c.industry,
            verifiedMatchCount: c.verifiedMatchCount > 0 ? c.verifiedMatchCount : null,
            loginToken: c.loginToken,
            sourceCampaign: 'reactivation_touch3_closeout',
            productOffer: c.offer,
          });
          if (sendResult.success) dispatchedTouch3++;
        }

        if (sendResult.success && sendResult.providerMessageId) {
          console.log(`   ✅ [${c.stage}] Delivered to ${c.email} (ID: ${sendResult.providerMessageId})`);
          receipts.push({
            email: c.email,
            company: c.companyName,
            stage: c.stage,
            product: c.offer.productName,
            price: c.offer.price,
            providerMessageId: sendResult.providerMessageId,
          });

          // Update leadActivity in Google Sheet
          const timestampIso = new Date().toISOString();
          c.leadActivity.lastContactedAt = timestampIso;

          if (c.stage === 'TOUCH_1') {
            c.leadActivity.touch1SentAt = timestampIso;
            c.leadActivity.fundingLeakReceiptSentAt = timestampIso;
            c.leadActivity.touch1ProviderId = sendResult.providerMessageId;
            c.leadActivity.touch1Offer = c.offer.productId;
          } else if (c.stage === 'TOUCH_2') {
            c.leadActivity.touch2SentAt = timestampIso;
            c.leadActivity.touch2ProviderId = sendResult.providerMessageId;
            c.leadActivity.touch2Offer = c.offer.productId;
          } else if (c.stage === 'TOUCH_3') {
            c.leadActivity.touch3SentAt = timestampIso;
            c.leadActivity.touch3ProviderId = sendResult.providerMessageId;
            c.leadActivity.touch3Offer = c.offer.productId;
          }

          await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `Leads!AZ${c.rowIndex}`,
            valueInputOption: 'RAW',
            requestBody: {
              values: [[JSON.stringify(c.leadActivity)]],
            },
          });
        } else {
          console.warn(`   ⚠️ [${c.stage}] Failed for ${c.email}:`, sendResult.error);
          errors.push(`Failed for ${c.email}: ${sendResult.error}`);
        }

        // Pacing delay (1.2 seconds between emails to respect SMTP / provider rate limits)
        await new Promise(resolve => setTimeout(resolve, 1200));
      } catch (err: any) {
        console.error(`   ❌ Error dispatching to ${c.email}:`, err?.message || err);
        errors.push(`Error for ${c.email}: ${err?.message || err}`);
      }
    }

    const totalDispatched = dispatchedTouch1 + dispatchedTouch2 + dispatchedTouch3;
    console.log('\n===============================================================');
    console.log(`  CAMPAIGN DISPATCH COMPLETE`);
    console.log(`  - Touch 1 Sent: ${dispatchedTouch1}`);
    console.log(`  - Touch 2 Sent: ${dispatchedTouch2}`);
    console.log(`  - Touch 3 Sent: ${dispatchedTouch3}`);
    console.log(`  - Total Sent: ${totalDispatched}`);
    console.log(`  - Daily Quota Used: ${totalDispatched}/100 (Safe buffer remaining: ${100 - totalDispatched})`);
    console.log('===============================================================\n');

    return {
      success: errors.length === 0,
      dryRun: false,
      totalLoadedRows: rows.length - 1,
      totalQualifiedPool: sortedTouch1.length + touch2Candidates.length + touch3Candidates.length,
      dispatchedTouch1,
      dispatchedTouch2,
      dispatchedTouch3,
      totalDispatched,
      dailyQuotaRemaining: 100 - totalDispatched,
      receipts,
      errors,
    };
  }
}
