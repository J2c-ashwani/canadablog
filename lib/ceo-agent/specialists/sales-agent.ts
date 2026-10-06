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
      const subscribers = await SubscriberRepository.getAllSubscribers(false);
      const candidates = subscribers.filter((sub) => {
        const casl = validateCaslEligibility(sub, 'MARKETING_OFFER');
        return casl.isEligible && !hasRecentCommercialProviderAcceptance(sub);
      });

      // Sort by intent: leads with higher readiness scores and explicit funding amounts first
      candidates.sort((a, b) => {
        const scoreA = (a.readinessScore || 0) + (a.fundingAmount ? 30 : 0);
        const scoreB = (b.readinessScore || 0) + (b.fundingAmount ? 30 : 0);
        return scoreB - scoreA;
      });

      const batch = candidates.slice(0, maxLeads);

      for (const lead of batch) {
        const fundingStr = (lead.fundingAmount || '').toLowerCase();
        const isHighFunding = fundingStr.includes('100') || fundingStr.includes('250') || fundingStr.includes('500') || fundingStr.includes('1m');
        const isHighIntent = (lead.readinessScore || 0) >= 60 || isHighFunding;

        // 1. If Very High Intent, trigger immediate Founder Alert Email to CEO Ashwani
        if (isHighIntent) {
          const alertActionId = generateActionId('Sales');
          const founderEmail = process.env.CEO_REPORT_EMAIL || 'ashwani@fsidigital.ca';
          const alertSubject = `🚨 HIGH-INTENT FOUNDER ALERT: ${lead.name || 'Founder'} (${lead.companyName || 'Business'}) requested ${lead.fundingAmount || '$100k+'}`;
          const alertHtml = `
            <div style="font-family:Arial,sans-serif;padding:16px;border:1px solid #e2e8f0;border-radius:8px;max-width:600px;">
              <h2 style="color:#0f172a;margin-top:0;">🔥 High-Intent Prospect Intake</h2>
              <p>A Canadian founder with significant funding requirements just submitted an inquiry:</p>
              <table style="width:100%;border-collapse:collapse;margin:16px 0;">
                <tr><td style="padding:6px;font-weight:bold;color:#475569;">Name:</td><td>${lead.name || 'Founder'}</td></tr>
                <tr><td style="padding:6px;font-weight:bold;color:#475569;">Company:</td><td>${lead.companyName || 'N/A'}</td></tr>
                <tr><td style="padding:6px;font-weight:bold;color:#475569;">Email:</td><td><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
                <tr><td style="padding:6px;font-weight:bold;color:#475569;">Phone:</td><td>${lead.phone || 'Not provided'}</td></tr>
                <tr><td style="padding:6px;font-weight:bold;color:#475569;">Funding Goal:</td><td>${lead.fundingAmount || 'Unspecified'}</td></tr>
                <tr><td style="padding:6px;font-weight:bold;color:#475569;">Province / Stage:</td><td>${lead.region || 'Canada'} / ${lead.businessStage || 'Active'}</td></tr>
                <tr><td style="padding:6px;font-weight:bold;color:#475569;">Readiness Score:</td><td>${lead.readinessScore || 'N/A'}/100</td></tr>
              </table>
              <div style="background:#f8fafc;padding:12px;border-radius:6px;border-left:4px solid #2563eb;">
                <strong>Recommended Next Action:</strong> Offer the $79 Complete Capital Stacking Toolkit or schedule a $199 Strategy Session.
              </div>
              <p style="font-size:12px;color:#94a3b8;margin-top:16px;">Action ID: ${alertActionId} | Generated by FSI Sales Agent</p>
            </div>
          `;

          const alertResult = await sendEmail({
            to: founderEmail,
            subject: alertSubject,
            html: alertHtml,
            text: `High-Intent Founder Alert: ${lead.name || 'Founder'} (${lead.email}) requested ${lead.fundingAmount || 'funding'}.`,
            tagType: 'founder-high-intent-alert',
          });

          if (alertResult.success) {
            founderAlertsSent++;
            await CommercialActionTracker.recordAction({
              actionId: alertActionId,
              agent: 'Sales',
              trigger: `High-intent intake (${lead.fundingAmount || 'High-score'})`,
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

        // 2. Select Product Fit based on Intent
        const offerTier = isHighIntent
          ? { id: 'funding-bundle', name: '$79 Complete Funding Blueprint', price: 79, url: 'https://www.fsidigital.ca/products/bundle' }
          : lead.fundingInterests?.length
          ? { id: 'funding-roadmap', name: '$49 Funding Strategy & Action Plan', price: 49, url: 'https://www.fsidigital.ca/products/action-plan' }
          : { id: 'funding-match-report', name: '$19 Custom Funding Match Report', price: 19, url: 'https://www.fsidigital.ca/products/funding-match-report' };

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
