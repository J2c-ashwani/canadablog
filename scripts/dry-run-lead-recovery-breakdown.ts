import { getLeadsFromSheet } from '../lib/google-sheets';
import { getAllPurchases } from '../lib/products/purchase-store';
import { isProviderVerifiedPurchase } from '../lib/growth-os/evidence-metrics';
import { getAllProductPaymentIntents } from '../lib/payments/product-payment-intents';
import {
  hasRecentCommercialProviderAcceptance,
  isTestOrInternalContact,
} from '../lib/leads/commercial-eligibility';
import { B2BOutreachEngine } from '../lib/leads/B2BOutreachEngine';

function parseActivity(value?: string) {
  try {
    return JSON.parse(value && value !== 'N/A' ? value : '{}');
  } catch {
    return {};
  }
}

async function main() {
  const now = Date.now();
  const intentCutoff = now - 30 * 24 * 60 * 60 * 1000;
  const recentAcceptanceCutoff = now - 48 * 60 * 60 * 1000;

  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(' FSI Digital — CEO Dry-Run Recovery Audit for Tier A/B Leads Pool');
  console.log(` Executed at: ${new Date().toISOString()}`);
  console.log('═══════════════════════════════════════════════════════════════════\n');

  const [leads, purchases, paymentIntents] = await Promise.all([
    getLeadsFromSheet(1000),
    getAllPurchases({ strict: true }),
    getAllProductPaymentIntents(),
  ]);

  const verifiedBuyerEmails = new Set(
    purchases
      .filter(isProviderVerifiedPurchase)
      .map((p) => p.email.toLowerCase().trim())
  );

  // Identify the candidate pool: Tier A or Tier B or Score >= 70
  const candidatePool = leads.filter((l) => {
    const tier = String(l.leadTier || '').toUpperCase();
    const score = Number(l.qualificationScore || 0);
    return tier === 'A' || tier === 'B' || tier === 'TIER A' || tier === 'TIER B' || score >= 70;
  });

  console.log(`📊 Initial Candidate Universe: ${candidatePool.length} leads matching Tier A/B criteria\n`);

  // Funnel exclusion counters
  const exclusions = {
    missingEmail: 0,
    unsubscribed: 0,
    testOrInternal: 0,
    alreadyPurchased: 0,
    recentlyContacted48h: 0,
    duplicateInPool: 0,
  };

  const seenEmails = new Set<string>();
  const qualifiedCohort: Array<{
    lead: typeof leads[0];
    activity: Record<string, any>;
    priorityScore: number;
    hasOpenIntent: boolean;
    hasCalculatorCompleted: boolean;
    channelRecommendation: string;
  }> = [];

  for (const lead of candidatePool) {
    const email = String(lead.email || '').toLowerCase().trim();
    if (!email || !email.includes('@')) {
      exclusions.missingEmail++;
      continue;
    }
    if (seenEmails.has(email)) {
      exclusions.duplicateInPool++;
      continue;
    }
    seenEmails.add(email);

    if (lead.isSubscribed !== true) {
      exclusions.unsubscribed++;
      continue;
    }
    if (isTestOrInternalContact(lead)) {
      exclusions.testOrInternal++;
      continue;
    }
    if (verifiedBuyerEmails.has(email)) {
      exclusions.alreadyPurchased++;
      continue;
    }
    if (hasRecentCommercialProviderAcceptance(lead)) {
      exclusions.recentlyContacted48h++;
      continue;
    }

    const activity = parseActivity(lead.leadActivity);

    // Check open payment intents
    const userIntents = paymentIntents.filter(
      (pi) => pi.email.toLowerCase().trim() === email && pi.status === 'created' && Boolean(pi.paypalOrderId)
    );
    const hasOpenIntent = userIntents.length > 0;

    // Check calculator completion
    const hasCalculatorCompleted = Boolean(
      activity.calculatorCompletedAt &&
      (now - new Date(activity.calculatorCompletedAt).getTime() <= intentCutoff)
    );

    // Calculate priority score using B2BOutreachEngine
    const { score: priorityScore } = B2BOutreachEngine.calculatePriorityScore(lead as any);

    let channelRecommendation = 'Nurture Cohort';
    if (hasOpenIntent) {
      channelRecommendation = 'Cart Recovery ($19-$79 report/bundle)';
    } else if (hasCalculatorCompleted) {
      channelRecommendation = 'Calculator Recovery ($19 match report)';
    } else if (priorityScore >= 65) {
      channelRecommendation = 'B2B Priority Outreach';
    }

    qualifiedCohort.push({
      lead,
      activity,
      priorityScore,
      hasOpenIntent,
      hasCalculatorCompleted,
      channelRecommendation,
    });
  }

  // Sort qualified cohort by priority score descending
  qualifiedCohort.sort((a, b) => b.priorityScore - a.priorityScore);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(' FUNNEL FILTERING BREAKDOWN');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Initial Tier A/B candidates:       ${candidatePool.length}`);
  console.log(`[-] Missing or invalid email:      ${exclusions.missingEmail}`);
  console.log(`[-] Deduplicated duplicate rows:   ${exclusions.duplicateInPool}`);
  console.log(`[-] Unsubscribed / no consent:     ${exclusions.unsubscribed}`);
  console.log(`[-] Internal / test addresses:     ${exclusions.testOrInternal}`);
  console.log(`[-] Verified buyers (already paid): ${exclusions.alreadyPurchased}`);
  console.log(`[-] Contacted in last 48h:         ${exclusions.recentlyContacted48h}`);
  console.log('───────────────────────────────────────────────────────────────────');
  console.log(`🎯 TOTAL SENDABLE COHORT:          ${qualifiedCohort.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Breakdown by recovery channel
  const byChannel: Record<string, number> = {};
  for (const q of qualifiedCohort) {
    byChannel[q.channelRecommendation] = (byChannel[q.channelRecommendation] || 0) + 1;
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(' RECOVERY CHANNEL ASSIGNMENT');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  for (const [channel, count] of Object.entries(byChannel)) {
    console.log(`  • ${channel.padEnd(38)} : ${count} leads`);
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Top 10 Highest-Intent Sendable Candidates
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(' TOP 10 HIGHEST-INTENT SENDABLE LEADS (Ranked by Intent & Score)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  qualifiedCohort.slice(0, 10).forEach((item, index) => {
    const l = item.lead;
    console.log(
      `[#${index + 1}] Score: ${item.priorityScore}/100 | ${l.name || 'Founder'} | ${l.company || 'N/A'}`
    );
    console.log(`     Email: ${l.email}`);
    console.log(`     Channel: ${item.channelRecommendation}`);
    console.log(`     Region: ${l.region || 'N/A'} | Industry: ${l.industry || 'N/A'}`);
    console.log(`     Funding Need: ${l.fundingAmount || 'N/A'}`);
    console.log('');
  });

  // Recommended Small Pilot Cohort (First 3-5 leads)
  const pilotCohort = qualifiedCohort.slice(0, 5);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(' RECOMMENDED STAGE 3 PILOT COHORT (First 5 for CEO approval)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  pilotCohort.forEach((item, index) => {
    console.log(
      `  ${index + 1}. ${item.lead.name || 'Founder'} (${item.lead.email}) — ${item.lead.company || 'N/A'} | Score: ${item.priorityScore} | Route: ${item.channelRecommendation}`
    );
  });
  console.log('\n═══════════════════════════════════════════════════════════════════\n');
}

main().catch(console.error);
