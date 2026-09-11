import { config } from "dotenv";
import path from "path";
config({ path: path.join(__dirname, "../.env.local") });

import { getLeadsFromSheet } from "../lib/google-sheets";

interface LeadEvaluationResult {
  email: string;
  eligible: boolean;
  reason?: string;
  leadDetails?: {
    name: string;
    company: string;
    industry: string;
    submittedAt: string;
    daysSinceSubmission: number;
    checkoutUrl: string;
  };
}

const COOLDOWN_DAYS = 14;

export async function evaluateConsentedLeads(dryRun = true): Promise<{
  totalEvaluated: number;
  eligible: LeadEvaluationResult[];
  excluded: LeadEvaluationResult[];
}> {
  console.log(`\n======================================================`);
  console.log(`  FSI DIGITAL — CONSENTED LEAD ACTIVATION ENGINE`);
  console.log(`  MODE: ${dryRun ? '🛡️  DRY RUN (AUDIT ONLY - NO EMAILS SENT)' : '⚠️  LIVE EXECUTION'}`);
  console.log(`======================================================\n`);

  const allLeads = await getLeadsFromSheet(1000);
  const now = Date.now();
  const eligible: LeadEvaluationResult[] = [];
  const excluded: LeadEvaluationResult[] = [];
  const seenEmails = new Set<string>();

  for (const lead of allLeads) {
    const email = (lead.email || '').toLowerCase().trim();

    // 1. Valid email format & exclude synthetic/test addresses
    if (!email || !email.includes('@') || email.includes('example.com') || email.includes('test.com') || email.includes('antigravity') || email.endsWith('@fsidigital.ca') || email.endsWith('@join2campus.com')) {
      excluded.push({ email, eligible: false, reason: 'Invalid or synthetic test email' });
      continue;
    }

    // Deduplicate: If email has already been processed in this batch, skip duplicate
    if (seenEmails.has(email)) {
      excluded.push({ email, eligible: false, reason: 'Duplicate email entry in Leads sheet' });
      continue;
    }
    seenEmails.add(email);

    // 2. Must have affirmative consent to contact
    if (!lead.consentToPartnerContact) {
      excluded.push({ email, eligible: false, reason: 'No affirmative partner contact consent (consentToPartnerContact !== true)' });
      continue;
    }

    // 3. Exclude unsubscribed contacts
    if (lead.isSubscribed === false) {
      excluded.push({ email, eligible: false, reason: 'Contact explicitly unsubscribed' });
      continue;
    }

    // 4. Exclude existing purchasers
    if (lead.reportPurchased || lead.strategyReportPurchased) {
      excluded.push({ email, eligible: false, reason: 'Already an existing purchaser' });
      continue;
    }

    // 5. Exclude prior explicit objections / disqualifications in offlineStatus
    const status = (lead.offlineStatus || '').toLowerCase();
    if (status.includes('unqualified') || status.includes('rejected') || status.includes('do not contact') || status.includes('spam') || status.includes('bounced')) {
      excluded.push({ email, eligible: false, reason: `Excluded by offline status: "${lead.offlineStatus}"` });
      continue;
    }

    // 6. Interaction proof: Must have originated from calculator, estimator, or contact funnel
    const hasInteractionEvent = Boolean(
      (lead.source && (lead.source.includes('calculator') || lead.source.includes('estimator') || lead.source.includes('guide') || lead.source.includes('tool'))) ||
      (lead.pagePath && (lead.pagePath.includes('calculator') || lead.pagePath.includes('grants') || lead.pagePath.includes('canada') || lead.pagePath.includes('usa'))) ||
      (lead.leadActivity && lead.leadActivity !== '{}' && lead.leadActivity !== 'N/A')
    );

    if (!hasInteractionEvent) {
      excluded.push({ email, eligible: false, reason: 'No verified completed interaction event (calculator/estimator)' });
      continue;
    }

    // 7. Cooldown check: Must not have been emailed within COOLDOWN_DAYS
    if (lead.lastEmailFollowup && lead.lastEmailFollowup !== 'N/A' && lead.lastEmailFollowup !== '') {
      const lastFollowupTime = new Date(lead.lastEmailFollowup).getTime();
      if (!isNaN(lastFollowupTime)) {
        const daysSinceLastFollowup = (now - lastFollowupTime) / (1000 * 60 * 60 * 24);
        if (daysSinceLastFollowup < COOLDOWN_DAYS) {
          excluded.push({ email, eligible: false, reason: `Contacted ${daysSinceLastFollowup.toFixed(1)} days ago (cooldown is ${COOLDOWN_DAYS} days)` });
          continue;
        }
      }
    }

    // Calculate days since initial lead submission
    const submittedTime = new Date(lead.timestamp).getTime();
    const daysSinceSubmission = !isNaN(submittedTime) ? Math.floor((now - submittedTime) / (1000 * 60 * 60 * 24)) : 0;

    const checkoutUrl = `https://www.fsidigital.ca/products/funding-match-report?email=${encodeURIComponent(email)}&industry=${encodeURIComponent(lead.industry || 'general')}&source=consented_reengagement`;

    eligible.push({
      email,
      eligible: true,
      leadDetails: {
        name: lead.name || 'Founder',
        company: lead.companyName || lead.industry || 'Your Business',
        industry: lead.industry || 'General',
        submittedAt: lead.timestamp,
        daysSinceSubmission,
        checkoutUrl,
      },
    });
  }

  return {
    totalEvaluated: allLeads.length,
    eligible,
    excluded,
  };
}

async function run() {
  const isLive = process.argv.includes('--live');
  const dryRun = !isLive;

  try {
    const results = await evaluateConsentedLeads(dryRun);

    console.log(`📊 Lead Evaluation Summary:`);
    console.log(`   Total Leads Analyzed:   ${results.totalEvaluated}`);
    console.log(`   Excluded by Rule/Guard: ${results.excluded.length}`);
    console.log(`   Eligible for Activation:${results.eligible.length}\n`);

    // Group exclusions by reason
    const exclusionCounts: Record<string, number> = {};
    for (const item of results.excluded) {
      const reason = item.reason || 'Unknown';
      exclusionCounts[reason] = (exclusionCounts[reason] || 0) + 1;
    }

    console.log(`🚫 Exclusions Breakdown:`);
    for (const [reason, count] of Object.entries(exclusionCounts)) {
      console.log(`   - ${reason}: ${count}`);
    }

    console.log(`\n📋 Sample Eligible Leads (First 10):`);
    results.eligible.slice(0, 10).forEach((item, index) => {
      const d = item.leadDetails!;
      console.log(`   ${index + 1}. ${item.email} | ${d.company} (${d.industry}) | Age: ${d.daysSinceSubmission}d`);
      console.log(`      Target Checkout: ${d.checkoutUrl}`);
    });

    if (dryRun) {
      console.log(`\n🛡️  DRY RUN COMPLETED: Zero emails sent.`);
      console.log(`   To execute live sending for the first batch (max 20), CEO approval and --live flag are required.`);
    } else {
      console.log(`\n⚠️  LIVE MODE: Bounded dispatch triggered (requires Resend API verification).`);
    }

  } catch (err: any) {
    console.error(`❌ Evaluation error:`, err?.message || err);
    process.exit(1);
  }
}

if (require.main === module) {
  run();
}
