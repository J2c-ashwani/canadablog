import { SubscriberRepository, type SubscriberProfile } from '@/lib/leads/SubscriberRepository'
import { collectGrowthOSEvidence } from '@/lib/growth-os/evidence-metrics'
import { ProspectIntelligenceEngine } from '@/lib/revenue-hunter/intelligence/prospect-graph'
import { RevenueHunterEngine, type RevenueHunterStatus } from '@/lib/revenue-hunter/hunter-engine'
import { validateCaslEligibility } from '@/lib/leads/casl-consent'
import { CommercialActionTracker, generateActionId } from '@/lib/ceo-agent/ledger/action-tracker'
import { sendEmail } from '@/lib/emails/mailer'
import { hasRecentCommercialProviderAcceptance } from '@/lib/leads/commercial-eligibility'
import { updateLeadInSheet } from '@/lib/google-sheets'

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
  public static calculateMultiVariableQualificationScore(lead: SubscriberProfile): {
    totalScore: number;
    breakdown: {
      incorporationScore: number;
      jurisdictionScore: number;
      stageScore: number;
      fundingScore: number;
      sectorScore: number;
      readinessScore: number;
    };
    isHighIntent: boolean;
    recommendedOffer: {
      id: string;
      name: string;
      price: number;
      url: string;
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
    // Measures active commercial urgency (abandoned checkout, report viewed, high engagement)
    let behavioralScore = 0;
    try {
      const activity = typeof lead.leadActivity === 'string'
        ? JSON.parse(lead.leadActivity && lead.leadActivity !== 'N/A' ? lead.leadActivity : '{}')
        : (lead.leadActivity || {});
      if (activity.checkoutStartedAt || activity.cartRecoveryEvidenceId) {
        behavioralScore = 15; // Abandoned checkout = highest commercial purchase intent
      } else if (activity.firstReportViewedAt || (lead.engagementScore && lead.engagementScore > 60)) {
        behavioralScore = 8;
      }
    } catch {}

    const totalScore = Math.min(100, Math.max(0,
      incorporationScore + jurisdictionScore + stageScore + fundingScore + sectorScore + readinessScore + behavioralScore
    ));

    const isHighIntent = totalScore >= 70;
    let recommendedOffer = {
      id: 'funding-match-report',
      name: '$19 Custom Funding Match Report',
      price: 19,
      url: 'https://www.fsidigital.ca/products/funding-match-report',
    };

    if (totalScore >= 70) {
      recommendedOffer = {
        id: 'funding-bundle',
        name: '$79 Complete Funding Blueprint',
        price: 79,
        url: 'https://www.fsidigital.ca/products/bundle',
      };
    } else if (totalScore >= 45) {
      recommendedOffer = {
        id: 'funding-roadmap',
        name: '$49 Funding Strategy & Action Plan',
        price: 49,
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
      const allSubscribers = await SubscriberRepository.getAllSubscribers(true);
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
        const qual = this.calculateMultiVariableQualificationScore(sub);
        if (qual.totalScore < 40) {
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
        const casl = validateCaslEligibility(sub, 'MARKETING_OFFER');
        return casl.isEligible && !hasRecentCommercialProviderAcceptance(sub);
      });

      // Rank by multi-variable commercial qualification score
      const scoredCandidates = consentedSubscribers.map((lead) => ({
        lead,
        qualification: this.calculateMultiVariableQualificationScore(lead),
      }));

      scoredCandidates.sort((a, b) => b.qualification.totalScore - a.qualification.totalScore);

      const batch = scoredCandidates.slice(0, maxLeads);
      const deferredCandidates = scoredCandidates.slice(maxLeads);

      // Record pacing deferrals so CEO report accounts for every approved lead
      for (const deferred of deferredCandidates) {
        CommercialActionTracker.recordBlockedAction('Sales', 'BATCH_CAP_PACING', deferred.lead.email, 'Batch cap pacing (queued for subsequent cycle)');
      }

      for (const item of batch) {
        const { lead, qualification } = item;
        const offerTier = qualification.recommendedOffer;

        // Hard production idempotency lock
        const idempotencyKey = `SALES:${lead.email}:${offerTier.id}:${new Date().toISOString().slice(0, 10)}`;
        if (!CommercialActionTracker.acquireIdempotencyLock(idempotencyKey)) {
          CommercialActionTracker.recordBlockedAction('Sales', 'DUPLICATE', lead.email, `Idempotency lock active for ${offerTier.id}`);
          continue;
        }

        // 1. If Multi-Variable Score >= 70, trigger immediate Founder Alert Email to CEO Ashwani
        if (qualification.isHighIntent) {
          const alertActionId = generateActionId('Sales');
          const founderEmail = process.env.CEO_REPORT_EMAIL || 'ashwani@fsidigital.ca';
          const alertSubject = `🚨 HIGH-INTENT FOUNDER ALERT [Score: ${qualification.totalScore}/100]: ${lead.name || 'Founder'} (${lead.companyName || 'Business'}) requested ${lead.fundingAmount || '$100k+'}`;
          const alertHtml = `
            <div style="font-family:Arial,sans-serif;padding:16px;border:1px solid #e2e8f0;border-radius:8px;max-width:600px;">
              <h2 style="color:#0f172a;margin-top:0;">🔥 High-Intent Prospect Intake</h2>
              <p>A Canadian founder with verified business maturity submitted a high-value funding inquiry:</p>
              <table style="width:100%;border-collapse:collapse;margin:16px 0;">
                <tr><td style="padding:6px;font-weight:bold;color:#475569;">Qualification Score:</td><td><strong>${qualification.totalScore}/100</strong> (High Intent)</td></tr>
                <tr><td style="padding:6px;font-weight:bold;color:#475569;">Name:</td><td>${lead.name || 'Founder'}</td></tr>
                <tr><td style="padding:6px;font-weight:bold;color:#475569;">Company:</td><td>${lead.companyName || 'N/A'}</td></tr>
                <tr><td style="padding:6px;font-weight:bold;color:#475569;">Email:</td><td><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
                <tr><td style="padding:6px;font-weight:bold;color:#475569;">Phone:</td><td>${lead.phone || 'Not provided'}</td></tr>
                <tr><td style="padding:6px;font-weight:bold;color:#475569;">Funding Goal:</td><td>${lead.fundingAmount || 'Unspecified'}</td></tr>
                <tr><td style="padding:6px;font-weight:bold;color:#475569;">Province / Stage:</td><td>${lead.region || 'Canada'} / ${lead.businessStage || 'Active'}</td></tr>
                <tr><td style="padding:6px;font-weight:bold;color:#475569;">Sector / Readiness:</td><td>${lead.industry || 'Tech'} / ${lead.readinessScore || 'N/A'}/100</td></tr>
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

          const alertResult = await sendEmail({
            to: founderEmail,
            subject: alertSubject,
            html: alertHtml,
            text: `High-Intent Founder Alert [Score: ${qualification.totalScore}/100]: ${lead.name || 'Founder'} (${lead.email}) requested ${lead.fundingAmount || 'funding'}.`,
            tagType: 'founder-high-intent-alert',
          });

          if (alertResult.success) {
            founderAlertsSent++;
            await CommercialActionTracker.recordAction({
              actionId: alertActionId,
              agent: 'Sales',
              trigger: `Multi-variable qualification (${qualification.totalScore}/100)`,
              leadId: lead.email,
              leadEmail: lead.email,
              leadName: lead.name,
              company: lead.companyName,
              action: 'Internal Founder Hot Lead Alert',
              product: 'Strategy Advisory ($199 / $79 Bundle)',
              channel: 'Internal Alert',
              consent: 'Transactional',
              status: 'DISPATCHED',
              result: 'DELIVERED',
              revenueUSD: 79,
              attribution: 'HIGH_INTENT_SALES_ALERT',
              timestamp: new Date().toISOString(),
              providerMessageId: alertResult.providerMessageId,
            });
          }
        }

        // 2. Send Intent-Matched Self-Serve Offer Email
        const emailActionId = generateActionId('Sales');
        const token = lead.unsubscribeToken || `unsub_${Buffer.from(lead.email).toString('hex').substring(0, 16)}`;
        const unsubUrl = `https://www.fsidigital.ca/api/subscribe/unsubscribe?email=${encodeURIComponent(lead.email)}&token=${encodeURIComponent(token)}`;

        const emailSubject = `Recommended Funding Roadmap for ${lead.companyName || lead.name || 'Your Business'}`;
        const emailHtml = `
          <div style="font-family:Arial,sans-serif;color:#1e293b;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;">
            <p>Hi ${lead.name || 'there'},</p>
            <p>Based on your recent assessment on FSI Digital, our funding database identified eligible non-dilutive programs matching your business profile.</p>
            <div style="background:#f1f5f9;border-left:4px solid #2563eb;padding:16px;margin:20px 0;border-radius:4px;">
              <h3 style="margin-top:0;color:#0f172a;">${offerTier.name}</h3>
              <p style="margin-bottom:12px;">Get a personalized breakdown of current deadlines, stacking eligibility, and document requirements without booking a consultation.</p>
              <a href="${offerTier.url}?email=${encodeURIComponent(lead.email)}" style="background:#2563eb;color:#ffffff;padding:10px 20px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">Access Your Roadmap &rarr;</a>
            </div>
            <p style="font-size:13px;color:#64748b;">Programs and rules change regularly. Final eligibility is determined by the official funding bodies.</p>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
            <p style="font-size:12px;color:#94a3b8;">
              FSI Digital Ltd. &bull; 100 King Street West, Suite 5600, Toronto, ON M5X 1C9, Canada<br />
              You are receiving this because you requested funding research updates. <a href="${unsubUrl}" style="color:#64748b;">Unsubscribe anytime</a>.
            </p>
          </div>
        `;

        const dispatchResult = await sendEmail({
          to: lead.email,
          subject: emailSubject,
          html: emailHtml,
          text: `Hi ${lead.name || 'there'}, view your funding roadmap at: ${offerTier.url}`,
          tagType: `sales-agent-${offerTier.id}`,
        });

        if (dispatchResult.success && dispatchResult.providerMessageId) {
          dispatchedCount++;
          const sentAt = new Date().toISOString();

          await CommercialActionTracker.recordAction({
            actionId: emailActionId,
            agent: 'Sales',
            trigger: `Intent qualification -> ${offerTier.name}`,
            leadId: lead.email,
            leadEmail: lead.email,
            leadName: lead.name,
            company: lead.companyName,
            action: `Intent Offer Email (${offerTier.name})`,
            product: offerTier.id,
            channel: 'Email',
            consent: 'Verified',
            status: 'DISPATCHED',
            result: 'DELIVERED',
            revenueUSD: offerTier.price,
            attribution: 'SALES_INTENT_OUTREACH',
            timestamp: sentAt,
            providerMessageId: dispatchResult.providerMessageId,
          });

          // Mark last contact in CRM
          let activity: Record<string, any> = {};
          try { activity = JSON.parse(lead.leadActivity || '{}'); } catch {}
          activity.lastContactedAt = sentAt;
          activity.lastSalesOfferTier = offerTier.id;
          activity.lastSalesActionId = emailActionId;
          await updateLeadInSheet(lead.email, { leadActivity: JSON.stringify(activity) }).catch(() => {});

          actions.push({
            actionId: emailActionId,
            lead: lead.email,
            offer: offerTier.name,
            price: offerTier.price,
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
