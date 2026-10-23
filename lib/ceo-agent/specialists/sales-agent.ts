import { SubscriberRepository, type SubscriberProfile } from '@/lib/leads/SubscriberRepository'
import { collectGrowthOSEvidence } from '@/lib/growth-os/evidence-metrics'
import { ProspectIntelligenceEngine } from '@/lib/revenue-hunter/intelligence/prospect-graph'
import { RevenueHunterEngine, type RevenueHunterStatus } from '@/lib/revenue-hunter/hunter-engine'
import { validateCaslEligibility } from '@/lib/leads/casl-consent'
import { CommercialActionTracker, generateActionId } from '@/lib/ceo-agent/ledger/action-tracker'
import { sendEmail, getFirstName, cleanCompanyName, cleanRegionName, cleanIndustryName } from '@/lib/emails/mailer'
import { hasRecentCommercialProviderAcceptance } from '@/lib/leads/commercial-eligibility'
import { updateLeadInSheet } from '@/lib/google-sheets'
import { getAllPurchases, type PurchaseRecord } from '@/lib/products/purchase-store'

export interface CustomerPurchaseProfile {
  isPaidCustomer: boolean;
  totalSpentUSD: number;
  purchasedProductIds: Set<string>;
  hasBundleOrToolkit: boolean;
  hasReport: boolean;
  hasStrategySession: boolean;
  latestToken?: string;
  purchases: PurchaseRecord[];
}

export function buildCustomerPurchaseIndex(
  purchases: PurchaseRecord[],
  subscribers: SubscriberProfile[]
): Map<string, CustomerPurchaseProfile> {
  const index = new Map<string, CustomerPurchaseProfile>();

  const getOrCreate = (email: string): CustomerPurchaseProfile => {
    const key = email.toLowerCase().trim();
    let profile = index.get(key);
    if (!profile) {
      profile = {
        isPaidCustomer: false,
        totalSpentUSD: 0,
        purchasedProductIds: new Set<string>(),
        hasBundleOrToolkit: false,
        hasReport: false,
        hasStrategySession: false,
        purchases: [],
      };
      index.set(key, profile);
    }
    return profile;
  };

  const phoneToEmails = new Map<string, Set<string>>();
  const recipientIdToEmails = new Map<string, Set<string>>();

  // 1. Ingest Product Purchases
  for (const p of purchases) {
    if (!p.email) continue;
    const cleanEmail = p.email.toLowerCase().trim();
    const prof = getOrCreate(cleanEmail);
    prof.isPaidCustomer = true;
    prof.purchases.push(p);

    const prodId = (p.productId || '').toLowerCase().trim();
    if (prodId) {
      prof.purchasedProductIds.add(prodId);
      if (['funding-bundle', 'funding-toolkit', 'bundle', 'toolkit', 'funding-action-plan', 'funding-roadmap', 'action-plan'].includes(prodId)) {
        prof.hasBundleOrToolkit = true;
        // Prioritize bundle token for full access
        if (p.accessToken) prof.latestToken = p.accessToken;
      }
      if (['funding-match-report', 'report'].includes(prodId)) {
        prof.hasReport = true;
        if (p.accessToken && !prof.latestToken) prof.latestToken = p.accessToken;
      }
      if (['strategy-session', 'strategy-audit', 'strategy-vip'].includes(prodId)) {
        prof.hasStrategySession = true;
      }
    }
    if (p.accessToken && !prof.latestToken) {
      prof.latestToken = p.accessToken;
    }

    const amt = parseFloat(p.amount) || 0;
    prof.totalSpentUSD += amt;

    if (p.actionRecipientId) {
      const rid = p.actionRecipientId.trim();
      if (!recipientIdToEmails.has(rid)) recipientIdToEmails.set(rid, new Set());
      recipientIdToEmails.get(rid)!.add(cleanEmail);
    }

    // Secondary email or phone in profileData
    try {
      if (p.profileData && p.profileData !== '{}') {
        const parsed = JSON.parse(p.profileData);
        if (parsed.email && typeof parsed.email === 'string' && parsed.email.includes('@')) {
          const linkedEmail = parsed.email.toLowerCase().trim();
          if (linkedEmail !== cleanEmail) {
            const linkedProf = getOrCreate(linkedEmail);
            linkedProf.isPaidCustomer = true;
            linkedProf.purchases.push(p);
            if (p.accessToken && !linkedProf.latestToken) linkedProf.latestToken = p.accessToken;
            linkedProf.totalSpentUSD += amt;
            if (prodId) linkedProf.purchasedProductIds.add(prodId);
            if (prof.hasBundleOrToolkit) linkedProf.hasBundleOrToolkit = true;
            if (prof.hasReport) linkedProf.hasReport = true;
            if (prof.hasStrategySession) linkedProf.hasStrategySession = true;
          }
        }
        if (parsed.phone && typeof parsed.phone === 'string' && parsed.phone.length > 5) {
          const cleanPhone = parsed.phone.replace(/\D/g, '');
          if (cleanPhone.length >= 7) {
            if (!phoneToEmails.has(cleanPhone)) phoneToEmails.set(cleanPhone, new Set());
            phoneToEmails.get(cleanPhone)!.add(cleanEmail);
          }
        }
      }
    } catch {}
  }

  // 2. Ingest Subscriber Profile Flags
  for (const sub of subscribers) {
    if (!sub.email) continue;
    const cleanEmail = sub.email.toLowerCase().trim();
    const prof = getOrCreate(cleanEmail);

    if (sub.reportPurchased === true) {
      prof.isPaidCustomer = true;
      prof.hasReport = true;
      prof.purchasedProductIds.add('funding-match-report');
      if (prof.totalSpentUSD === 0) prof.totalSpentUSD += 19;
    }
    if (sub.strategyReportPurchased === true) {
      prof.isPaidCustomer = true;
      prof.hasBundleOrToolkit = true;
      prof.purchasedProductIds.add('funding-bundle');
      if (prof.totalSpentUSD < 79) prof.totalSpentUSD += 79;
    }
    const offline = String(sub.offlineStatus || '').toLowerCase();
    if (offline.includes('buyer') || offline.includes('paid')) {
      prof.isPaidCustomer = true;
    }

    if (sub.phone && typeof sub.phone === 'string') {
      const cleanPhone = sub.phone.replace(/\D/g, '');
      if (cleanPhone.length >= 7) {
        if (!phoneToEmails.has(cleanPhone)) phoneToEmails.set(cleanPhone, new Set());
        phoneToEmails.get(cleanPhone)!.add(cleanEmail);
      }
    }

    try {
      if (sub.leadActivity && sub.leadActivity !== 'N/A') {
        const act = JSON.parse(sub.leadActivity);
        if (act.purchasedProductId) {
          prof.isPaidCustomer = true;
          const pid = String(act.purchasedProductId).toLowerCase().trim();
          prof.purchasedProductIds.add(pid);
          if (['funding-bundle', 'funding-toolkit'].includes(pid)) prof.hasBundleOrToolkit = true;
          if (['funding-match-report'].includes(pid)) prof.hasReport = true;
        }
      }
    } catch {}
  }

  // 3. Link profiles across shared phone or actionRecipientId
  const mergeEmailSet = (emailSet: Set<string>) => {
    const emails = Array.from(emailSet);
    let anyPaid = false;
    let maxSpent = 0;
    let hasBundle = false;
    let hasRep = false;
    let hasStrat = false;
    let token: string | undefined = undefined;
    const allProductIds = new Set<string>();
    const allPurchases: PurchaseRecord[] = [];

    for (const email of emails) {
      const prof = index.get(email);
      if (!prof) continue;
      if (prof.isPaidCustomer) anyPaid = true;
      maxSpent = Math.max(maxSpent, prof.totalSpentUSD);
      if (prof.hasBundleOrToolkit) hasBundle = true;
      if (prof.hasReport) hasRep = true;
      if (prof.hasStrategySession) hasStrat = true;
      // Prioritize bundle or toolkit token for full unlocked dashboard
      const bundlePurchase = prof.purchases.find(p => ['funding-bundle', 'funding-toolkit', 'bundle', 'toolkit', 'funding-roadmap', 'action-plan'].includes((p.productId || '').toLowerCase().trim()) && p.accessToken);
      if (bundlePurchase?.accessToken) {
        token = bundlePurchase.accessToken;
      } else if (prof.latestToken && !token) {
        token = prof.latestToken;
      }
      prof.purchasedProductIds.forEach((id) => allProductIds.add(id));
      prof.purchases.forEach((p) => allPurchases.push(p));
    }

    if (anyPaid) {
      for (const email of emails) {
        const prof = index.get(email);
        if (prof) {
          prof.isPaidCustomer = true;
          prof.hasBundleOrToolkit = hasBundle;
          prof.hasReport = hasRep;
          prof.hasStrategySession = hasStrat;
          prof.totalSpentUSD = Math.max(prof.totalSpentUSD, maxSpent);
          if (token) prof.latestToken = token;
          allProductIds.forEach((id) => prof.purchasedProductIds.add(id));
          prof.purchases = allPurchases;
        }
      }
    }
  };

  for (const [_, eSet] of phoneToEmails.entries()) {
    if (eSet.size > 1) mergeEmailSet(eSet);
  }
  for (const [_, eSet] of recipientIdToEmails.entries()) {
    if (eSet.size > 1) mergeEmailSet(eSet);
  }

  return index;
}

export interface RankedLeadOpportunity {
  email: string
  name: string
  company: string
  tier: 'TIER_1_BUNDLE_79' | 'TIER_2_MEMBERSHIP_29' | 'TIER_3_ACTION_PLAN_49' | 'TIER_4_REPORT_19'
  estimatedDealValueUSD: number
  expectedValueUSD: number
  industry: string
  region: string
  readinessScore: number
  source: string
  actionableReason: string
}

export interface PipelineStageMetrics {
  totalIntakeLeads: number
  consentedLeads: number
  newLeads24h: number
  uniqueSessions30d: number
  paidOfferImpressions30d: number
  productVisitors30d: number
  unprogressedLeads: number
  membershipCandidatesCount: number
  tier1BundleCount: number
  tier2MembershipCount: number
  tier3ActionPlanCount: number
  tier4ReportCount: number
  totalPipelineExpectedValueUSD: number
  contactedCount: number
  deliveredCount: number
  repliedCount: number
  callsBookedCount: number
  checkoutStartsCount: number
  completedPurchasesCount: number
  topActionableLeads: RankedLeadOpportunity[]
  acquisitionSources: Record<string, number>
}

export interface SalesAgentAudit {
  leadIntakeCount: number
  consentedLeadCount: number
  uncontactedHighIntentLeads: number
  checkoutAbandonmentRate: number
  pipeline: PipelineStageMetrics
  hunterStatus: RevenueHunterStatus
  primaryBottleneck: string
  recommendation: string
}

function sourceOf(subscriber: SubscriberProfile) {
  const source = `${subscriber.utmSource || ''} ${subscriber.referralSource || ''} ${subscriber.source || ''} ${subscriber.pagePath || ''}`.toLowerCase()
  if (source.includes('google')) return 'Google organic/search'
  if (source.includes('chatgpt') || source.includes('copilot')) return 'AI referral'
  if (source.includes('calculator')) return 'Calculator'
  if (source.includes('newsletter')) return 'Newsletter'
  if (source.includes('gmail')) return 'Email return visit'
  return 'Direct / unattributed'
}

export function isInternalOrTestLead(email?: string): boolean {
  if (!email) return true
  const lower = email.toLowerCase().trim()
  return (
    lower.includes('ashwani') ||
    lower.includes('join2campus') ||
    lower.includes('fsidigital') ||
    lower.startsWith('test@') ||
    lower.includes('@example.com')
  )
}

export class SalesAgent {
  /**
   * Level 1: Read-only pipeline and commercial lead audit.
   */
  public static async auditSales(): Promise<SalesAgentAudit> {
    const [{ rankedProspects, summary }, hunterStatus, allSubscribers, consentedSubscribers, evidence] = await Promise.all([
      ProspectIntelligenceEngine.buildCommercialGraph(),
      RevenueHunterEngine.getHunterStatus(),
      SubscriberRepository.getAllSubscribers(true),
      SubscriberRepository.getAllSubscribers(false),
      collectGrowthOSEvidence(),
    ])
    const acquisitionSources: Record<string, number> = {}
    allSubscribers.forEach((subscriber) => {
      const source = sourceOf(subscriber)
      acquisitionSources[source] = (acquisitionSources[source] || 0) + 1
    })
    const rankedLeads: RankedLeadOpportunity[] = rankedProspects.slice(0, 10).map((prospect) => ({
      email: prospect.leadEmail,
      name: prospect.leadName,
      company: prospect.companyName,
      tier: prospect.recommendedOffer.tier === 'TIER_BUNDLE_79'
        ? 'TIER_1_BUNDLE_79'
        : prospect.recommendedOffer.tier === 'TIER_MEMBERSHIP_29'
          ? 'TIER_2_MEMBERSHIP_29'
          : prospect.recommendedOffer.tier === 'TIER_ACTION_PLAN_49'
            ? 'TIER_3_ACTION_PLAN_49'
            : 'TIER_4_REPORT_19',
      estimatedDealValueUSD: prospect.recommendedOffer.priceUSD,
      expectedValueUSD: prospect.expectedValueUSD,
      industry: prospect.industry,
      region: prospect.province,
      readinessScore: Math.round(prospect.confidenceScore * 100),
      source: prospect.primaryIntentDriver,
      actionableReason: `${prospect.primaryIntentDriver} (modelled EV: $${prospect.expectedValueUSD})`,
    }))
    const contacted = evidence.outreach.b2bProviderAccepted + evidence.outreach.authorityProviderAccepted
    const completedPurchases = evidence.funnel.providerVerifiedPurchases30d
    const checkoutStarts = evidence.funnel.checkoutStarts30d
    const unprogressed = Math.max(0, consentedSubscribers.length - contacted - completedPurchases)
    const pipeline: PipelineStageMetrics = {
      totalIntakeLeads: allSubscribers.length,
      consentedLeads: consentedSubscribers.length,
      newLeads24h: evidence.funnel.newLeads24h,
      uniqueSessions30d: evidence.funnel.uniqueSessions30d,
      paidOfferImpressions30d: evidence.funnel.paidOfferImpressions30d,
      productVisitors30d: evidence.funnel.productVisitors30d,
      unprogressedLeads: unprogressed,
      membershipCandidatesCount: consentedSubscribers.filter((subscriber) => String(subscriber.subscriptionStatus || '').toUpperCase() !== 'ACTIVE').length,
      tier1BundleCount: summary.tierBreakdown.tierBundle79Count,
      tier2MembershipCount: summary.tierBreakdown.tierMembership29Count,
      tier3ActionPlanCount: summary.tierBreakdown.tierActionPlan49Count,
      tier4ReportCount: summary.tierBreakdown.tierReport19Count,
      totalPipelineExpectedValueUSD: summary.totalPipelineExpectedValueUSD,
      contactedCount: contacted,
      deliveredCount: evidence.outreach.emailDelivered,
      repliedCount: evidence.outreach.authorityReplies,
      callsBookedCount: 0,
      checkoutStartsCount: checkoutStarts,
      completedPurchasesCount: completedPurchases,
      topActionableLeads: rankedLeads,
      acquisitionSources,
    }
    return {
      leadIntakeCount: allSubscribers.length,
      consentedLeadCount: consentedSubscribers.length,
      uncontactedHighIntentLeads: unprogressed,
      checkoutAbandonmentRate: checkoutStarts > 0 ? Number(((checkoutStarts - completedPurchases) / checkoutStarts).toFixed(4)) : 0,
      pipeline,
      hunterStatus,
      primaryBottleneck: evidence.revenue.activeMemberships === 0
        ? 'Zero provider-verified membership activations'
        : `${unprogressed} consented leads have no verified commercial progression.`,
      recommendation: 'Execute intent-classified personalized outreach to consented high-intent leads.',
    }
  }

  /**
   * Multi-variable qualification score (0-100) combining:
   * 1. Incorporation status (25%)
   * 2. Canadian province jurisdiction (15%)
   * 3. Business stage (20%)
   * 4. Funding amount requested (15%)
   * 5. Industry / sector grant alignment (15%)
   * 6. Readiness score (10%)
   */
  public static calculateMultiVariableQualificationScore(
    lead: SubscriberProfile,
    purchaseProfile?: CustomerPurchaseProfile
  ): {
    totalScore: number;
    breakdown: {
      incorporationScore: number;
      jurisdictionScore: number;
      stageScore: number;
      fundingScore: number;
      sectorScore: number;
      readinessScore: number;
      behavioralScore: number;
    };
    isHighIntent: boolean;
    recommendedOffer: {
      id: string;
      name: string;
      price: number;
      url: string;
      netPrice?: number;
      creditAppliedUSD?: number;
    };
    summaryReason: string;
  } {
    // 1. Incorporation Status (25 pts max)
    const stageStr = (lead.businessStage || '').toLowerCase();
    const hasCorpSize = lead.companySize && ['10-49', '50-99', '100-499', '500+'].includes(lead.companySize);
    const isExplicitlyCorp = /incorporated|operating|scale|series|established/i.test(stageStr) || hasCorpSize;
    const hasCompany = Boolean(lead.companyName && lead.companyName.trim().length > 1 && !/^(n\/a|none|idea|concept|tbd)$/i.test(lead.companyName));
    const isIdea = /idea|concept|pre-incorporation|unincorporated/i.test(stageStr);

    let incorporationScore = 12;
    if (isExplicitlyCorp) {
      incorporationScore = 25;
    } else if (isIdea) {
      incorporationScore = 5;
    } else if (hasCompany) {
      incorporationScore = 18;
    }

    // 2. Canadian Province Jurisdiction (15 pts max)
    const canadianProvinces = new Set([
      'on', 'ontario', 'bc', 'british columbia', 'ab', 'alberta', 'qc', 'quebec',
      'sk', 'saskatchewan', 'mb', 'manitoba', 'ns', 'nova scotia', 'nb', 'new brunswick',
      'nl', 'newfoundland', 'pe', 'prince edward island', 'yt', 'nt', 'nu'
    ]);
    const region = (lead.region || '').toLowerCase().trim();
    const country = (lead.country || '').toLowerCase().trim();

    let jurisdictionScore = 8;
    if (canadianProvinces.has(region)) {
      jurisdictionScore = 15;
    } else if (country === 'canada') {
      jurisdictionScore = 12;
    } else if (country === 'usa') {
      jurisdictionScore = 5;
    }

    // 3. Business Stage (20 pts max)
    let stageScore = 10;
    if (/operating|scaling|commercial|growth|established|active/i.test(stageStr)) {
      stageScore = 20;
    } else if (/revenue|post-launch|market-ready/i.test(stageStr)) {
      stageScore = 17;
    } else if (/mvp|prototype|seed|beta|development/i.test(stageStr)) {
      stageScore = 12;
    } else if (/pre-revenue|early/i.test(stageStr)) {
      stageScore = 8;
    } else if (isIdea) {
      stageScore = 4;
    }

    // 4. Funding Amount Requested / Capital Appetite (15 pts max)
    const fundingStr = (lead.fundingAmount || '').toLowerCase();
    let fundingScore = 5;
    if (/50k|100k|150k|200k|250k|300k|400k|500k/i.test(fundingStr)) {
      fundingScore = 15; // Optimal sweet spot for Canadian non-dilutive programs (IRAP, CanExport, SDTC)
    } else if (/750k|1m|2m|multi-million/i.test(fundingStr)) {
      fundingScore = 12; // High appetite, requires established financial track record
    } else if (/10k|20k|25k|30k|40k/i.test(fundingStr)) {
      fundingScore = 10;
    } else if (fundingStr.length > 0) {
      fundingScore = 8;
    }

    // 5. Industry / Sector Grant Alignment (15 pts max)
    const indStr = (lead.industry || '').toLowerCase();
    let sectorScore = 6;
    if (/tech|software|ai|clean|green|energy|agri|farm|food|bio|health|medical|manufactur|aerospace|robot/i.test(indStr)) {
      sectorScore = 15; // Highest priority sectors under Canadian federal and provincial initiatives
    } else if (/service|consult|retail|construc|media|educat/i.test(indStr)) {
      sectorScore = 10;
    } else if (indStr.length > 0) {
      sectorScore = 8;
    }

    // 6. Readiness Score (10 pts max)
    const readinessScore = typeof lead.readinessScore === 'number' && lead.readinessScore > 0
      ? Math.min(10, Math.round((lead.readinessScore / 100) * 10))
      : 5;

    // 7. Behavioral Intent Modifier (up to +15 pts)
    let behavioralScore = 0;
    try {
      const activity = typeof lead.leadActivity === 'string'
        ? JSON.parse(lead.leadActivity && lead.leadActivity !== 'N/A' ? lead.leadActivity : '{}')
        : (lead.leadActivity || {});
      if (activity.checkoutStartedAt || activity.cartRecoveryEvidenceId) {
        behavioralScore = 15;
      } else if (activity.firstReportViewedAt || (lead.engagementScore && lead.engagementScore > 60)) {
        behavioralScore = 8;
      }
    } catch {}

    const totalScore = Math.min(100, Math.max(0,
      incorporationScore + jurisdictionScore + stageScore + fundingScore + sectorScore + readinessScore + behavioralScore
    ));

    // Handle existing VIP Paid Customer who already owns the complete Blueprint
    if (purchaseProfile?.hasBundleOrToolkit) {
      const credit = Math.min(199, Math.max(79, purchaseProfile.totalSpentUSD));
      const netPrice = Math.max(0, 199 - credit);
      return {
        totalScore,
        breakdown: {
          incorporationScore,
          jurisdictionScore,
          stageScore,
          fundingScore,
          sectorScore,
          readinessScore,
          behavioralScore,
        },
        isHighIntent: true,
        recommendedOffer: {
          id: 'strategy-session',
          name: `$199 1-on-1 Strategy Session ($${netPrice} with $${credit} Credit)`,
          price: 199,
          netPrice,
          creditAppliedUSD: credit,
          url: 'https://www.fsidigital.ca/audit',
        },
        summaryReason: `VIP Buyer ($${purchaseProfile.totalSpentUSD} invested, owns Blueprint) -> High-Ticket 1-on-1 Strategy Session ($${netPrice} net) / Full-Service Filing`,
      };
    }

    // Handle existing Report Buyer who only owns the $19 report
    if (purchaseProfile?.hasReport && !purchaseProfile?.hasBundleOrToolkit) {
      const credit = Math.min(79, Math.max(19, purchaseProfile.totalSpentUSD));
      const netPrice = Math.max(0, 79 - credit);
      return {
        totalScore,
        breakdown: {
          incorporationScore,
          jurisdictionScore,
          stageScore,
          fundingScore,
          sectorScore,
          readinessScore,
          behavioralScore,
        },
        isHighIntent: totalScore >= 60,
        recommendedOffer: {
          id: 'funding-bundle',
          name: `$79 Complete Funding Blueprint ($${netPrice} with $${credit} Credit)`,
          price: 79,
          netPrice,
          creditAppliedUSD: credit,
          url: 'https://www.fsidigital.ca/products/bundle',
        },
        summaryReason: `Report Buyer ($${purchaseProfile.totalSpentUSD} invested) -> Blueprint Upgrade ($${netPrice} net)`,
      };
    }

    // Default for fresh (unpaid) prospects
    const isHighIntent = totalScore >= 70;
    let recommendedOffer = {
      id: 'funding-match-report',
      name: '$19 Custom Funding Match Report',
      price: 19,
      netPrice: 19,
      creditAppliedUSD: 0,
      url: 'https://www.fsidigital.ca/products/funding-match-report',
    };

    if (totalScore >= 70) {
      recommendedOffer = {
        id: 'funding-bundle',
        name: '$79 Complete Funding Blueprint',
        price: 79,
        netPrice: 79,
        creditAppliedUSD: 0,
        url: 'https://www.fsidigital.ca/products/bundle',
      };
    } else if (totalScore >= 45) {
      recommendedOffer = {
        id: 'funding-roadmap',
        name: '$49 Funding Strategy & Action Plan',
        price: 49,
        netPrice: 49,
        creditAppliedUSD: 0,
        url: 'https://www.fsidigital.ca/products/action-plan',
      };
    }

    return {
      totalScore,
      breakdown: {
        incorporationScore,
        jurisdictionScore,
        stageScore,
        fundingScore,
        sectorScore,
        readinessScore,
        behavioralScore,
      },
      isHighIntent,
      recommendedOffer,
      summaryReason: `Multi-variable score: ${totalScore}/100 (Corp: ${incorporationScore}/25, Region: ${jurisdictionScore}/15, Stage: ${stageScore}/20, Funding: ${fundingScore}/15, Sector: ${sectorScore}/15, Readiness: ${readinessScore}/10, Behavioral: ${behavioralScore}/15)`,
    };
  }

  /**
   * Level 3: Intent-Driven Commercial Sales Action Machine
   * Turns qualified leads into actual personalized commercial actions under CASL express consent.
   * Protects existing customers by never pitching products they already own, and routing
   * paid buyers to high-ticket advisory (1-on-1 strategy audits & full-service filing).
   */
  public static async executeSalesActions(maxLeads = 3): Promise<{
    dispatchedCount: number;
    actions: any[];
    founderAlertsSent: number;
    errors: string[];
  }> {
    const errors: string[] = [];
    const actions: any[] = [];
    let dispatchedCount = 0;
    let founderAlertsSent = 0;

    try {
      const [allSubscribers, rawPurchases] = await Promise.all([
        SubscriberRepository.getAllSubscribers(true),
        getAllPurchases().catch(() => []),
      ]);

      const purchaseIndex = buildCustomerPurchaseIndex(rawPurchases, allSubscribers);

      const canadianProvincesSet = new Set([
        'on', 'ontario', 'bc', 'british columbia', 'ab', 'alberta', 'qc', 'quebec',
        'sk', 'saskatchewan', 'mb', 'manitoba', 'ns', 'nova scotia', 'nb', 'new brunswick',
        'nl', 'newfoundland', 'pe', 'prince edward island', 'yt', 'nt', 'nu'
      ]);

      // Calculate 7-layer funnel breakdown across lead database
      let noConsentCount = 0;
      let outsideGeographyCount = 0;
      let insufficientReadinessCount = 0;
      let duplicateOrRecentCount = 0;
      let lowCommercialFitCount = 0;
      let commerciallyEligibleCount = 0;

      for (const sub of allSubscribers) {
        if (isInternalOrTestLead(sub.email)) continue;
        const casl = validateCaslEligibility(sub, 'MARKETING_OFFER');
        if (!casl.isEligible) {
          noConsentCount++;
          continue;
        }
        const reg = (sub.region || '').toLowerCase().trim();
        const country = (sub.country || '').toLowerCase().trim();
        if (country !== 'canada' && !canadianProvincesSet.has(reg)) {
          outsideGeographyCount++;
          continue;
        }
        if ((sub.readinessScore || 0) < 30 || /idea|concept/i.test(sub.businessStage || '')) {
          insufficientReadinessCount++;
          continue;
        }
        if (hasRecentCommercialProviderAcceptance(sub)) {
          duplicateOrRecentCount++;
          continue;
        }

        const purchaseProf = purchaseIndex.get(sub.email.toLowerCase().trim());
        // For paid customers, enforce 14-day contact cooldown to protect relationships
        if (purchaseProf?.isPaidCustomer) {
          let activity: any = {};
          try { activity = JSON.parse(sub.leadActivity && sub.leadActivity !== 'N/A' ? sub.leadActivity : '{}'); } catch {}
          const lastContacted = activity.lastContactedAt ? new Date(activity.lastContactedAt).getTime() : 0;
          const lastVipFollowup = activity.lastVipFollowupSentAt ? new Date(activity.lastVipFollowupSentAt).getTime() : 0;
          const mostRecentContact = Math.max(lastContacted, lastVipFollowup);
          const fourteenDaysMs = 14 * 24 * 60 * 60 * 1000;
          if (Date.now() - mostRecentContact < fourteenDaysMs) {
            duplicateOrRecentCount++;
            continue;
          }
          // If customer purchased only report within last 14 days, defer to post-purchase sequence
          if (purchaseProf.hasReport && !purchaseProf.hasBundleOrToolkit) {
            const paymentCompletedAt = activity.paymentCompletedAt ? new Date(activity.paymentCompletedAt).getTime() : 0;
            if (Date.now() - paymentCompletedAt < fourteenDaysMs) {
              duplicateOrRecentCount++;
              continue;
            }
          }
        }

        const qual = this.calculateMultiVariableQualificationScore(sub, purchaseProf);
        if (qual.totalScore < 40 && !purchaseProf?.isPaidCustomer) {
          lowCommercialFitCount++;
          continue;
        }
        commerciallyEligibleCount++;
      }

      CommercialActionTracker.recordEvaluationBreakdown({
        totalLeads: allSubscribers.length,
        noConsent: noConsentCount,
        outsideGeography: outsideGeographyCount,
        insufficientReadiness: insufficientReadinessCount,
        duplicateOrRecent: duplicateOrRecentCount,
        lowCommercialFit: lowCommercialFitCount,
        commerciallyEligible: commerciallyEligibleCount,
      });

      const consentedSubscribers = allSubscribers.filter((sub) => {
        if (isInternalOrTestLead(sub.email)) return false;
        const casl = validateCaslEligibility(sub, 'MARKETING_OFFER');
        if (!casl.isEligible || hasRecentCommercialProviderAcceptance(sub)) return false;

        const purchaseProf = purchaseIndex.get(sub.email.toLowerCase().trim());
        if (purchaseProf?.isPaidCustomer) {
          let activity: any = {};
          try { activity = JSON.parse(sub.leadActivity && sub.leadActivity !== 'N/A' ? sub.leadActivity : '{}'); } catch {}
          const lastContacted = activity.lastContactedAt ? new Date(activity.lastContactedAt).getTime() : 0;
          const lastVipFollowup = activity.lastVipFollowupSentAt ? new Date(activity.lastVipFollowupSentAt).getTime() : 0;
          const mostRecentContact = Math.max(lastContacted, lastVipFollowup);
          const fourteenDaysMs = 14 * 24 * 60 * 60 * 1000;
          if (Date.now() - mostRecentContact < fourteenDaysMs) return false;

          if (purchaseProf.hasReport && !purchaseProf.hasBundleOrToolkit) {
            const paymentCompletedAt = activity.paymentCompletedAt ? new Date(activity.paymentCompletedAt).getTime() : 0;
            if (Date.now() - paymentCompletedAt < fourteenDaysMs) return false;
          }
        }
        return true;
      });

      // Rank by multi-variable commercial qualification score
      const scoredCandidates = consentedSubscribers.map((lead) => {
        const purchaseProfile = purchaseIndex.get(lead.email.toLowerCase().trim()) || {
          isPaidCustomer: false,
          totalSpentUSD: 0,
          purchasedProductIds: new Set<string>(),
          hasBundleOrToolkit: false,
          hasReport: false,
          hasStrategySession: false,
          purchases: [],
        };
        return {
          lead,
          purchaseProfile,
          qualification: this.calculateMultiVariableQualificationScore(lead, purchaseProfile),
        };
      });

      scoredCandidates.sort((a, b) => b.qualification.totalScore - a.qualification.totalScore);

      const batch = scoredCandidates.slice(0, maxLeads);
      const deferredCandidates = scoredCandidates.slice(maxLeads);

      // Record pacing deferrals so CEO report accounts for every approved lead
      for (const deferred of deferredCandidates) {
        CommercialActionTracker.recordBlockedAction('Sales', 'BATCH_CAP_PACING', deferred.lead.email, 'Batch cap pacing (queued for subsequent cycle)');
      }

      for (const item of batch) {
        const { lead, purchaseProfile, qualification } = item;
        const offerTier = qualification.recommendedOffer;
        const isVipCustomer = purchaseProfile.hasBundleOrToolkit;
        const isReportBuyer = purchaseProfile.hasReport && !purchaseProfile.hasBundleOrToolkit;

        // Hard production idempotency lock
        // For existing buyers, lock monthly to avoid recurring pitches
        const idempotencyKey = isVipCustomer
          ? `SALES_VIP:${lead.email}:${new Date().toISOString().slice(0, 7)}`
          : isReportBuyer
            ? `SALES_UPGRADE:${lead.email}:${new Date().toISOString().slice(0, 7)}`
            : `SALES:${lead.email}:${offerTier.id}:${new Date().toISOString().slice(0, 10)}`;

        if (!CommercialActionTracker.acquireIdempotencyLock(idempotencyKey)) {
          CommercialActionTracker.recordBlockedAction('Sales', 'DUPLICATE', lead.email, `Idempotency lock active for ${offerTier.id}`);
          continue;
        }

        const firstName = getFirstName(lead.name);
        const cleanedCompany = cleanCompanyName(lead.companyName);
        const companyLabel = cleanedCompany ? `for <strong>${cleanedCompany}</strong>` : 'for your business';
        const companySubject = cleanedCompany || 'Your Business';
        const rawFunding = (lead.fundingAmount || '').trim();
        const fundingGoal = (rawFunding && !/^(n\/a|not provided|none|null|undefined)$/i.test(rawFunding)) ? rawFunding : '$25,000 - $100,000+';
        const sectorLabel = cleanIndustryName(lead.industry);
        const regionLabel = cleanRegionName(lead.region);
        const tokenParam = purchaseProfile.latestToken ? `?token=${encodeURIComponent(purchaseProfile.latestToken)}` : '';
        const dashboardUrl = `https://www.fsidigital.ca/products/report${tokenParam}`;

        // 1. Trigger Founder Alert Email to CEO Ashwani
        if (qualification.isHighIntent) {
          const alertActionId = generateActionId('Sales');
          const founderEmail = process.env.CEO_REPORT_EMAIL || 'ashwani@fsidigital.ca';

          let alertSubject = `🚨 HIGH-INTENT FOUNDER ALERT [Score: ${qualification.totalScore}/100]: ${lead.name || 'Founder'} (${companySubject}) requested ${fundingGoal}`;
          let alertHtml = '';

          if (isVipCustomer) {
            alertSubject = `💎 VIP PAID CUSTOMER ALERT [$${purchaseProfile.totalSpentUSD} Invested]: ${lead.name || 'Founder'} (${companySubject}) - High-Ticket Closing Opportunity`;
            alertHtml = `
              <div style="font-family:Arial,sans-serif;padding:16px;border:1px solid #e2e8f0;border-radius:8px;max-width:600px;">
                <h2 style="color:#0f172a;margin-top:0;">💎 VIP Paid Customer Follow-up</h2>
                <p>A Canadian founder who already invested <strong>$${purchaseProfile.totalSpentUSD} USD</strong> in our platform is active and ready for high-ticket closing:</p>
                <table style="width:100%;border-collapse:collapse;margin:16px 0;">
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Customer Status:</td><td><strong style="color:#059669;">ACTIVE PAID BUYER ($${purchaseProfile.totalSpentUSD} USD Invested)</strong></td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Products Owned:</td><td>Complete Funding Blueprint & Stacking Toolkit</td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Name:</td><td>${lead.name || 'Founder'}</td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Company:</td><td>${companySubject}</td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Email:</td><td><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Phone:</td><td><strong>${lead.phone || 'Not provided'}</strong></td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Funding Goal:</td><td>${fundingGoal}</td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Province / Stage:</td><td>${regionLabel} / ${lead.businessStage || 'Active'}</td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Sector:</td><td>${sectorLabel}</td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Active Blueprint:</td><td><a href="${dashboardUrl}">Open Customer Blueprint</a></td></tr>
                </table>
                <div style="background:#eff6ff;padding:12px;border-radius:6px;border-left:4px solid #2563eb;margin-bottom:12px;">
                  <strong>Recommended Advisory Next Step:</strong> Connect with founder to invite them to a private <strong>1-on-1 Strategy Video Session</strong> (net $${offerTier.netPrice ?? 101} with 100% credit) or <strong>Full-Service Grant Preparation</strong>.
                </div>
                <p style="font-size:12px;color:#94a3b8;margin-top:16px;">Action ID: ${alertActionId} | Generated by FSI Sales Agent (VIP Routing)</p>
              </div>
            `;
          } else if (isReportBuyer) {
            alertSubject = `💎 REPORT BUYER ALERT [$${purchaseProfile.totalSpentUSD} Invested]: ${lead.name || 'Founder'} (${companySubject}) - Blueprint Upgrade Opportunity`;
            alertHtml = `
              <div style="font-family:Arial,sans-serif;padding:16px;border:1px solid #e2e8f0;border-radius:8px;max-width:600px;">
                <h2 style="color:#0f172a;margin-top:0;">💎 Report Buyer Upgrade Opportunity</h2>
                <p>An existing customer ($${purchaseProfile.totalSpentUSD} spent) qualifies to upgrade to the Complete Funding Blueprint:</p>
                <table style="width:100%;border-collapse:collapse;margin:16px 0;">
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Customer Status:</td><td><strong>Report Buyer ($${purchaseProfile.totalSpentUSD} USD Invested)</strong></td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Name:</td><td>${lead.name || 'Founder'}</td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Company:</td><td>${companySubject}</td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Email:</td><td><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Phone:</td><td>${lead.phone || 'Not provided'}</td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Funding Goal:</td><td>${fundingGoal}</td></tr>
                </table>
                <div style="background:#eff6ff;padding:12px;border-radius:6px;border-left:4px solid #2563eb;">
                  <strong>Recommended Next Action:</strong> Offer the $79 Complete Blueprint with 100% of their $19 credited (net $60 balance).
                </div>
                <p style="font-size:12px;color:#94a3b8;margin-top:16px;">Action ID: ${alertActionId} | Generated by FSI Sales Agent</p>
              </div>
            `;
          } else {
            alertHtml = `
              <div style="font-family:Arial,sans-serif;padding:16px;border:1px solid #e2e8f0;border-radius:8px;max-width:600px;">
                <h2 style="color:#0f172a;margin-top:0;">🔥 High-Intent Prospect Intake</h2>
                <p>A Canadian founder with verified business maturity submitted a high-value funding inquiry:</p>
                <table style="width:100%;border-collapse:collapse;margin:16px 0;">
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Qualification Score:</td><td><strong>${qualification.totalScore}/100</strong> (High Intent)</td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Customer Status:</td><td>Free Assessment Lead (Unpaid)</td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Name:</td><td>${lead.name || 'Founder'}</td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Company:</td><td>${companySubject}</td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Email:</td><td><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Phone:</td><td>${lead.phone || 'Not provided'}</td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Funding Goal:</td><td>${fundingGoal}</td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Province / Stage:</td><td>${regionLabel} / ${lead.businessStage || 'Active'}</td></tr>
                  <tr><td style="padding:6px;font-weight:bold;color:#475569;">Sector / Readiness:</td><td>${sectorLabel} / ${lead.readinessScore || 'N/A'}/100</td></tr>
                </table>
                <div style="background:#f8fafc;padding:12px;border-radius:6px;border-left:4px solid #2563eb;margin-bottom:12px;">
                  <strong>Score Breakdown:</strong> Corp: ${qualification.breakdown.incorporationScore}/25 | Region: ${qualification.breakdown.jurisdictionScore}/15 | Stage: ${qualification.breakdown.stageScore}/20 | Funding: ${qualification.breakdown.fundingScore}/15 | Sector: ${qualification.breakdown.sectorScore}/15 | Readiness: ${qualification.breakdown.readinessScore}/10
                </div>
                <div style="background:#eff6ff;padding:12px;border-radius:6px;border-left:4px solid #3b82f6;">
                  <strong>Recommended Next Action:</strong> Offer the $79 Complete Capital Stacking Toolkit or schedule a $199 Strategy Session.
                </div>
                <p style="font-size:12px;color:#94a3b8;margin-top:16px;">Action ID: ${alertActionId} | Generated by FSI Sales Agent</p>
              </div>
            `;
          }

          const alertResult = await sendEmail({
            to: founderEmail,
            subject: alertSubject,
            html: alertHtml,
            text: `Sales Alert: ${lead.name || 'Founder'} (${lead.email}) requested ${fundingGoal}. Status: ${isVipCustomer ? 'PAID VIP' : 'UNPAID'}.`,
            tagType: isVipCustomer ? 'founder-vip-customer-alert' : 'founder-high-intent-alert',
          });

          if (alertResult.success) {
            founderAlertsSent++;
            await CommercialActionTracker.recordAction({
              actionId: alertActionId,
              agent: 'Sales',
              trigger: isVipCustomer ? 'VIP Customer Intelligence' : `Multi-variable qualification (${qualification.totalScore}/100)`,
              leadId: lead.email,
              leadEmail: lead.email,
              leadName: lead.name,
              company: lead.companyName,
              action: isVipCustomer ? 'Internal VIP Customer Alert' : 'Internal Founder Hot Lead Alert',
              product: isVipCustomer ? 'Strategy Advisory (VIP)' : 'Strategy Advisory ($199 / $79 Bundle)',
              channel: 'Internal Alert',
              consent: 'Transactional',
              status: 'DISPATCHED',
              result: 'DELIVERED',
              revenueUSD: offerTier.price,
              attribution: isVipCustomer ? 'VIP_CUSTOMER_ALERT' : 'HIGH_INTENT_SALES_ALERT',
              timestamp: new Date().toISOString(),
              providerMessageId: alertResult.providerMessageId,
            });
          }
        }

        // 2. Dispatch Customer Email
        const emailActionId = generateActionId('Sales');
        const token = lead.unsubscribeToken || `unsub_${Buffer.from(lead.email).toString('hex').substring(0, 16)}`;
        const unsubUrl = `https://www.fsidigital.ca/api/subscribe/unsubscribe?email=${encodeURIComponent(lead.email)}&token=${encodeURIComponent(token)}`;

        let emailSubject = '';
        let emailHtml = '';
        let plainText = '';

        if (isVipCustomer) {
          // VIP Client Follow-up: 100% credited high-ticket advisory
          const creditAmount = offerTier.creditAppliedUSD ?? 79;
          const netStrategyPrice = offerTier.netPrice ?? 101;
          const bookingUrl = `https://www.fsidigital.ca/audit?email=${encodeURIComponent(lead.email)}&utm_source=fsi_sales_agent&utm_medium=vip_client_advisory`;

          emailSubject = `Application Strategy & 1-on-1 Advisory for ${companySubject} (${fundingGoal})`;
          emailHtml = `
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;line-height:1.6;max-width:600px;margin:0 auto;padding:24px 20px;">
              <p style="font-size:16px;margin:0 0 16px 0;">Hi ${firstName},</p>
              <p style="font-size:15px;margin:0 0 16px 0;">
                I'm checking in on your <strong>Complete Funding Blueprint</strong> ${companyLabel} targeting <strong>${fundingGoal}</strong> in ${regionLabel}.
              </p>
              <p style="font-size:15px;margin:0 0 16px 0;">
                Based on your profile in ${sectorLabel}, your highest-probability non-dilutive programs are currently open for intake. Most Canadian tech and scaling businesses leave substantial grant capital uncollected simply due to application timing or improper program stacking.
              </p>
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #10b981;padding:20px;margin:24px 0;border-radius:6px;">
                <h3 style="margin:0 0 8px 0;color:#0f172a;font-size:17px;">Your Active Blueprint & Stacking Roadmap</h3>
                <p style="margin:0 0 12px 0;color:#475569;font-size:14px;line-height:1.5;">
                  You can access your personalized roadmap, program timelines, and pre-submission checklists at any time:
                </p>
                <div style="text-align:center;margin:16px 0;">
                  <a href="${dashboardUrl}" style="background:#0f172a;color:#ffffff;padding:11px 24px;text-decoration:none;border-radius:6px;font-weight:600;display:inline-block;font-size:14px;">
                    Open Your Funding Blueprint &rarr;
                  </a>
                </div>
              </div>
              <div style="background:#eff6ff;border:1px solid #bfdbfe;border-left:4px solid #2563eb;padding:20px;margin:24px 0;border-radius:6px;">
                <h3 style="margin:0 0 8px 0;color:#1e3a8a;font-size:17px;">Next Stage: 100% Fee Credit Applied ($${creditAmount} USD)</h3>
                <p style="margin:0 0 12px 0;color:#334155;font-size:14px;line-height:1.5;">
                  As an active blueprint owner, your entire prior investment of <strong>$${creditAmount} USD</strong> is credited 100% toward our high-touch advisory services:
                </p>
                <ul style="margin:0 0 16px 0;padding-left:20px;font-size:14px;color:#334155;line-height:1.6;">
                  <li><strong>1-on-1 Grant Strategy Session ($199 &rarr; only $${netStrategyPrice} with credit):</strong> A private 45-minute working session where we review your project narrative, confirm your federal/provincial stacking structure (IRAP + SR&ED + provincial grants), and build your exact 90-day submission calendar.</li>
                  <li><strong>Turnkey Full-Service Grant Preparation ($2,500+ with credit):</strong> If you want our senior grant writing team to prepare, structure, and file your applications end-to-end.</li>
                </ul>
                <div style="text-align:center;margin-top:16px;">
                  <a href="${bookingUrl}" style="background:#2563eb;color:#ffffff;padding:12px 28px;text-decoration:none;border-radius:6px;font-weight:600;display:inline-block;font-size:15px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                    Schedule Your Strategy Session &rarr;
                  </a>
                </div>
              </div>
              <p style="font-size:14px;color:#475569;margin:0 0 16px 0;">
                How is your application preparation progressing? If you have questions about specific program requirements or need guidance, reply directly to this email—I personally review every response.
              </p>
              <p style="font-size:14px;margin:0 0 4px 0;">Best regards,</p>
              <p style="font-size:15px;font-weight:600;margin:0 0 2px 0;color:#0f172a;">Ashwani K.</p>
              <p style="font-size:13px;color:#64748b;margin:0;">Founder & CEO &bull; FSI Digital</p>
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0;" />
              <p style="font-size:12px;color:#94a3b8;line-height:1.5;margin:0;">
                FSI Digital Ltd. &bull; 100 King Street West, Suite 5600, Toronto, ON M5X 1C9, Canada<br />
                You received this priority update because you are a verified client. <a href="${unsubUrl}" style="color:#64748b;text-decoration:underline;">Unsubscribe anytime</a>.
              </p>
            </div>
          `;

          plainText = `Hi ${firstName},\n\nI'm following up on your Complete Funding Blueprint for ${companySubject} targeting ${fundingGoal} in ${regionLabel}.\n\nBased on your profile in ${sectorLabel}, your highest-probability programs are actively open for intake.\n\nOpen your Blueprint dashboard here: ${dashboardUrl}\n\n100% Fee Credit Applied ($${creditAmount} USD):\nYour entire prior investment is credited 100% toward:\n1. 1-on-1 Grant Strategy Session ($199 -> only $${netStrategyPrice} with credit applied): We review your narrative, stacking structure, and 90-day filing calendar.\n2. Turnkey Full-Service Grant Preparation ($2,500+ with credit): Our grant writing team handles your applications end-to-end.\n\nBook your session here: ${bookingUrl}\n\nIf you have any questions, just reply directly to this email.\n\nBest regards,\nAshwani K.\nFounder & CEO, FSI Digital`;
        } else if (isReportBuyer) {
          // Report Buyer Upgrade Offer
          const creditAmount = offerTier.creditAppliedUSD ?? 19;
          const netPrice = offerTier.netPrice ?? 60;

          emailSubject = `Next Steps & Capital Stacking for ${companySubject} (${fundingGoal})`;
          emailHtml = `
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;line-height:1.6;max-width:600px;margin:0 auto;padding:24px 20px;">
              <p style="font-size:16px;margin:0 0 16px 0;">Hi ${firstName},</p>
              <p style="font-size:15px;margin:0 0 16px 0;">
                I'm checking in on your <strong>Funding Match Report</strong> ${companyLabel} targeting <strong>${fundingGoal}</strong> in ${regionLabel}.
              </p>
              <p style="font-size:15px;margin:0 0 16px 0;">
                Your report identifies WHICH programs match your stage. The next critical step is knowing HOW to legally combine them without triggering government stacking violations.
              </p>
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #2563eb;padding:20px;margin:24px 0;border-radius:6px;">
                <h3 style="margin:0 0 8px 0;color:#0f172a;font-size:18px;">Upgrade to the Complete Funding Blueprint</h3>
                <p style="margin:0 0 14px 0;color:#475569;font-size:14px;line-height:1.5;">
                  Your $19 report fee is <strong>100% credited</strong> toward the complete blueprint (pay only the remaining <strong>$${netPrice} USD</strong>):
                </p>
                <ul style="margin:0 0 16px 0;padding-left:20px;font-size:14px;color:#334155;line-height:1.6;">
                  <li><strong>Capital Stacking Roadmap:</strong> Formulas to combine wage subsidies, R&D credits, and equipment funding.</li>
                  <li><strong>Pre-Submission Rubrics:</strong> Avoid the top compliance traps that delay 70% of self-filed proposals.</li>
                  <li><strong>100% Fee Credit:</strong> The entire amount is credited 100% toward full-service filing or strategy sessions.</li>
                </ul>
                <div style="text-align:center;margin-top:18px;">
                  <a href="${offerTier.url}?email=${encodeURIComponent(lead.email)}&utm_source=fsi_sales_agent&utm_medium=report_buyer_upgrade" style="background:#2563eb;color:#ffffff;padding:12px 28px;text-decoration:none;border-radius:6px;font-weight:600;display:inline-block;font-size:15px;">
                    Upgrade with $${creditAmount} Credit Applied &rarr;
                  </a>
                </div>
              </div>
              <p style="font-size:14px;color:#475569;margin:0 0 16px 0;">
                Have questions about program deadlines? Reply directly to this email—I personally review every response.
              </p>
              <p style="font-size:14px;margin:0 0 4px 0;">Best regards,</p>
              <p style="font-size:15px;font-weight:600;margin:0 0 2px 0;color:#0f172a;">Ashwani K.</p>
              <p style="font-size:13px;color:#64748b;margin:0;">Founder & CEO &bull; FSI Digital</p>
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0;" />
              <p style="font-size:12px;color:#94a3b8;line-height:1.5;margin:0;">
                FSI Digital Ltd. &bull; 100 King Street West, Suite 5600, Toronto, ON M5X 1C9, Canada<br />
                <a href="${unsubUrl}" style="color:#64748b;text-decoration:underline;">Unsubscribe anytime</a>.
              </p>
            </div>
          `;

          plainText = `Hi ${firstName},\n\nI reviewed your Canadian funding assessment for ${companySubject} targeting ${fundingGoal} in ${regionLabel}.\n\nYour $${creditAmount} report fee is 100% credited toward the Complete Funding Blueprint ($${netPrice} balance):\n${offerTier.url}?email=${encodeURIComponent(lead.email)}&utm_source=fsi_sales_agent&utm_medium=report_buyer_upgrade\n\nBest regards,\nAshwani K.\nFounder & CEO, FSI Digital`;
        } else {
          // Standard Fresh Lead Cold Intent Offer
          emailSubject = `Funding Eligibility & Roadmap for ${companySubject} (${fundingGoal})`;
          emailHtml = `
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;line-height:1.6;max-width:600px;margin:0 auto;padding:24px 20px;">
              <p style="font-size:16px;margin:0 0 16px 0;">Hi ${firstName},</p>
              <p style="font-size:15px;margin:0 0 16px 0;">
                I personally reviewed the Canadian funding assessment you submitted ${companyLabel} targeting <strong>${fundingGoal}</strong> in ${regionLabel}.
              </p>
              <p style="font-size:15px;margin:0 0 16px 0;">
                Based on your profile in ${sectorLabel}, your project qualifies for active non-dilutive government funding programs. Most Canadian founders leave $30k–$80k on the table simply because they don't know how to legally stack federal grants with provincial tax credits.
              </p>
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #2563eb;padding:20px;margin:24px 0;border-radius:6px;">
                <h3 style="margin:0 0 8px 0;color:#0f172a;font-size:18px;">${offerTier.name}</h3>
                <p style="margin:0 0 14px 0;color:#475569;font-size:14px;line-height:1.5;">
                  Get immediate access to your tailored Canadian funding roadmap:
                </p>
                <ul style="margin:0 0 16px 0;padding-left:20px;font-size:14px;color:#334155;line-height:1.6;">
                  <li><strong>Verified Program Alignment:</strong> Prioritized matching federal & provincial programs for your exact stage.</li>
                  <li><strong>Capital Stacking Roadmap:</strong> The formula to combine wage subsidies, R&D credits, and equipment funding without breaching federal caps.</li>
                  <li><strong>Submission Checklists & Rubrics:</strong> Avoid the top compliance mistakes that get 70% of self-filed grant applications delayed or rejected.</li>
                  <li><strong>100% Fee Credit:</strong> The entire $${offerTier.price} is credited 100% toward our full-service grant writing if you ever want our team to prepare your proposals.</li>
                </ul>
                <div style="text-align:center;margin-top:18px;">
                  <a href="${offerTier.url}?email=${encodeURIComponent(lead.email)}&utm_source=fsi_sales_agent&utm_medium=intent_outreach" style="background:#2563eb;color:#ffffff;padding:12px 28px;text-decoration:none;border-radius:6px;font-weight:600;display:inline-block;font-size:15px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                    Access Your Funding Blueprint &rarr;
                  </a>
                </div>
              </div>
              <p style="font-size:14px;color:#475569;margin:0 0 16px 0;">
                Have a question about program deadlines or your company's eligibility? You can reply directly to this email—I personally review every response.
              </p>
              <p style="font-size:14px;margin:0 0 4px 0;">Best regards,</p>
              <p style="font-size:15px;font-weight:600;margin:0 0 2px 0;color:#0f172a;">Ashwani K.</p>
              <p style="font-size:13px;color:#64748b;margin:0;">Founder & CEO &bull; FSI Digital</p>
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0;" />
              <p style="font-size:12px;color:#94a3b8;line-height:1.5;margin:0;">
                FSI Digital Ltd. &bull; 100 King Street West, Suite 5600, Toronto, ON M5X 1C9, Canada<br />
                You received this because you initiated a Canadian business funding assessment. <a href="${unsubUrl}" style="color:#64748b;text-decoration:underline;">Unsubscribe anytime</a>.
              </p>
            </div>
          `;

          plainText = `Hi ${firstName},\n\nI reviewed your Canadian funding assessment for ${companyLabel} targeting ${fundingGoal} in ${regionLabel}.\n\nBased on your profile in ${sectorLabel}, your project qualifies for active non-dilutive government funding programs. Most Canadian founders leave $30k–$80k on the table simply because they don't know how to legally stack federal grants with provincial tax credits.\n\nYour ${offerTier.name} ($${offerTier.price} USD) includes:\n- Verified matching federal & provincial programs for your exact stage\n- Capital Stacking formula (combining wage subsidies, R&D credits, and equipment funding without breaching federal caps)\n- Pre-submission checklists and rubrics to prevent delays\n- 100% Fee Credit: The entire $${offerTier.price} is credited 100% toward our full-service grant writing if you ever want our team to prepare your proposals.\n\nAccess your blueprint here: ${offerTier.url}?email=${encodeURIComponent(lead.email)}&utm_source=fsi_sales_agent&utm_medium=intent_outreach\n\nIf you have any questions, just reply directly to this email.\n\nBest regards,\nAshwani K.\nFounder & CEO, FSI Digital`;
        }

        const tagType = isVipCustomer
          ? 'sales-agent-vip-advisory'
          : isReportBuyer
            ? 'sales-agent-blueprint-upgrade'
            : `sales-agent-${offerTier.id}`;

        const dispatchResult = await sendEmail({
          to: lead.email,
          subject: emailSubject,
          html: emailHtml,
          text: plainText,
          tagType,
        });

        if (dispatchResult.success && dispatchResult.providerMessageId) {
          dispatchedCount++;
          const sentAt = new Date().toISOString();

          await CommercialActionTracker.recordAction({
            actionId: emailActionId,
            agent: 'Sales',
            trigger: isVipCustomer ? 'VIP Client High-Ticket Route' : `Intent qualification -> ${offerTier.name}`,
            leadId: lead.email,
            leadEmail: lead.email,
            leadName: lead.name,
            company: lead.companyName,
            action: isVipCustomer ? 'VIP Application Strategy Advisory' : `Intent Offer Email (${offerTier.name})`,
            product: offerTier.id,
            channel: 'Email',
            consent: 'Verified',
            status: 'DISPATCHED',
            result: 'DELIVERED',
            revenueUSD: offerTier.netPrice ?? offerTier.price,
            attribution: isVipCustomer ? 'VIP_HIGH_TICKET_CLOSING' : 'SALES_INTENT_OUTREACH',
            timestamp: sentAt,
            providerMessageId: dispatchResult.providerMessageId,
          });

          // Mark last contact in CRM
          let activity: Record<string, any> = {};
          try { activity = JSON.parse(lead.leadActivity || '{}'); } catch {}
          activity.lastContactedAt = sentAt;
          activity.lastSalesOfferTier = offerTier.id;
          activity.lastSalesActionId = emailActionId;
          if (isVipCustomer) {
            activity.lastVipFollowupSentAt = sentAt;
          }
          await updateLeadInSheet(lead.email, { leadActivity: JSON.stringify(activity) }).catch(() => {});

          actions.push({
            actionId: emailActionId,
            lead: lead.email,
            offer: offerTier.name,
            price: offerTier.netPrice ?? offerTier.price,
            isVip: isVipCustomer,
            providerMessageId: dispatchResult.providerMessageId,
          });
        } else {
          errors.push(`${lead.email}: ${dispatchResult.error || 'Provider rejected email'}`);
        }
      }
    } catch (err: any) {
      console.error('[SalesAgent] Execution error:', err);
      errors.push(err.message || String(err));
    }

    return {
      dispatchedCount,
      actions,
      founderAlertsSent,
      errors,
    };
  }
}
