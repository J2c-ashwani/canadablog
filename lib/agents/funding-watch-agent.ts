import { SubscriberRepository, ensureScopedSubscriberTokens } from '@/lib/leads/SubscriberRepository';
import { isLoginToken, isUnsubscribeToken } from '@/lib/auth/subscriber-tokens';
import { getAllPurchases } from '@/lib/products/purchase-store';
import { PRODUCTS } from '@/lib/products/catalog';
import { sendEmail, escapeHtml } from '@/lib/emails/mailer';
import {
  hasRecentCommercialProviderAcceptance,
  isTestOrInternalContact,
} from '@/lib/leads/commercial-eligibility';
import type { AgentActionItem, AgentRunResult, SharedAgentContext } from './types';

function parseActivity(raw?: string): Record<string, any> {
  try {
    return raw && raw !== 'N/A' && raw !== '{}' ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export class FundingWatchMRRAgent {
  static readonly AGENT_NAME = 'FundingWatchMRRAgent';

  static async run(ctx: SharedAgentContext, batchLimit = 10): Promise<AgentRunResult> {
    const [subscribers, purchases] = await Promise.all([
      SubscriberRepository.getAllSubscribers(false),
      getAllPurchases({ strict: false }),
    ]);

    const membership = PRODUCTS['funding-membership'];
    const buyerEmails = new Set(
      purchases
        .filter((p) => String(p.status || '').toLowerCase() === 'completed')
        .map((p) => String(p.email || '').toLowerCase().trim())
        .filter(Boolean)
    );

    const actions: AgentActionItem[] = [];
    const candidates: Array<{
      email: string;
      name: string;
      region: string;
      industry: string;
      companyName: string;
      isBuyer: boolean;
      score: number;
      loginToken: string;
      unsubscribeToken: string;
      leadActivity: string;
      consentText: string;
    }> = [];

    let skippedCount = 0;
    let blockedCount = 0;
    const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

    for (const sub of subscribers) {
      const email = (sub.email || '').toLowerCase().trim();
      if (!email || !sub.isSubscribed || isTestOrInternalContact(sub)) {
        skippedCount++;
        continue;
      }
      if (ctx.bouncedEmails.has(email) || ctx.sameDayClaimedEmails.has(email)) {
        blockedCount++;
        continue;
      }
      if (String(sub.subscriptionStatus || '').toLowerCase() === 'active') {
        skippedCount++; // Already an active subscriber
        continue;
      }
      if (hasRecentCommercialProviderAcceptance(sub)) {
        blockedCount++;
        continue;
      }

      const activity = parseActivity(sub.leadActivity);
      const lastInviteMs = new Date(activity.fundingWatchInviteSentAt || 0).getTime();
      if (Number.isFinite(lastInviteMs) && lastInviteMs > 0 && ctx.nowMs - lastInviteMs < FOURTEEN_DAYS_MS) {
        skippedCount++;
        continue;
      }
      const recentCrossAgentMs = Math.max(
        new Date(activity.upgradeOutreachSentAt || 0).getTime() || 0,
        new Date(activity.hunterOutreachSentAt || 0).getTime() || 0
      );
      if (recentCrossAgentMs > 0 && ctx.nowMs - recentCrossAgentMs < 48 * 60 * 60 * 1000) {
        blockedCount++;
        continue;
      }

      const isBuyer = buyerEmails.has(email) || Boolean(sub.reportPurchased);
      const hasProfile = Boolean(sub.fundingAmount && sub.fundingAmount !== 'N/A');
      let score = 0;
      if (isBuyer) score += 60;
      if (hasProfile) score += 20;
      if (activity.calculatorCompletedAt) score += 15;
      if (activity.lastNewsletterAcceptedAt) score += 5;
      if (score < 20) {
        skippedCount++;
        continue;
      }

      candidates.push({
        email,
        name: sub.name || 'Founder',
        region: sub.region || 'North America',
        industry: sub.industry || 'Business',
        companyName: sub.companyName && sub.companyName !== 'Not provided' && sub.companyName !== 'N/A' ? sub.companyName : '',
        isBuyer,
        score,
        loginToken: isLoginToken(sub.loginToken, sub.loginToken) ? sub.loginToken! : '',
        unsubscribeToken: isUnsubscribeToken(sub.unsubscribeToken, sub.unsubscribeToken) ? sub.unsubscribeToken! : '',
        leadActivity: sub.leadActivity || '{}',
        consentText: sub.isSubscribed ? 'Subscribed' : 'Unsubscribed',
      });
    }

    candidates.sort((a, b) => b.score - a.score);
    const batch = candidates.slice(0, Math.max(0, Math.min(batchLimit, ctx.remainingGlobalEmails)));

    let executedCount = 0;
    let failedCount = 0;
    let estimatedPipelineUSD = 0;

    for (const c of batch) {
      let loginToken = c.loginToken;
      let unsubscribeToken = c.unsubscribeToken;
      if (ctx.mode === 'live' && (!loginToken || !unsubscribeToken)) {
        const creds = await ensureScopedSubscriberTokens(c.email);
        if (creds) {
          loginToken = creds.loginToken;
          unsubscribeToken = creds.unsubscribeToken;
        }
      }

      const firstName = c.name.split(/\s+/)[0] || 'Founder';
      const membershipUrl = loginToken
        ? `https://www.fsidigital.ca/membership?token=${encodeURIComponent(loginToken)}&source=funding_watch_agent`
        : `https://www.fsidigital.ca/membership?source=funding_watch_agent`;
      const unsubUrl = unsubscribeToken
        ? `https://www.fsidigital.ca/api/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`
        : `https://www.fsidigital.ca/contact`;

      const subject = c.companyName
        ? `Funding Watch ($29/mo): Weekly open-grant radar for ${c.companyName}`
        : `Funding Watch ($29/mo): Track open ${c.region} grants before intake closes`;

      const html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
          <p>Hi ${escapeHtml(firstName)},</p>
          <p>${c.isBuyer ? 'Since you already unlocked your FSI Digital funding analysis, ' : 'Based on your recent funding profile, '}many ${escapeHtml(c.region)} grants open and exhaust budgets mid-quarter without notice.</p>
          <p><strong>${escapeHtml(membership.name)} ($${membership.priceUsd}/month USD)</strong> monitors 123 active open programs across Canada and all 50 US states and alerts you to intake openings, deadline extensions, and new matching windows—with zero consulting fees or phone calls required.</p>
          <ul>
            <li>Live radar for new &amp; reopened ${escapeHtml(c.industry)} and ${escapeHtml(c.region)} opportunities</li>
            <li>Monthly compliance &amp; stacking updates</li>
            <li>Self-serve activation, cancel in one click anytime</li>
          </ul>
          <p style="margin: 22px 0;">
            <a href="${membershipUrl}" style="background:#059669;color:#ffffff;padding:12px 22px;text-decoration:none;border-radius:8px;font-weight:700;display:inline-block;">Activate Funding Watch — $${membership.priceUsd}/mo &rarr;</a>
          </p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;"/>
          <p style="font-size:12px;color:#64748b;">FSI Digital Ltd. · 100 King Street West, Suite 5600, Toronto, ON · <a href="${unsubUrl}">Unsubscribe</a></p>
        </div>
      `;
      const text = `Hi ${firstName},\n\nActivate ${membership.name} ($${membership.priceUsd}/mo USD) to track open ${c.region} & federal grants for ${c.companyName || 'your business'} before budgets close:\n${membershipUrl}\n\nCancel anytime. Unsubscribe: ${unsubUrl}`;

      if (ctx.mode === 'dry-run') {
        ctx.sameDayClaimedEmails.add(c.email);
        ctx.remainingGlobalEmails--;
        executedCount++;
        estimatedPipelineUSD += membership.priceUsd;
        actions.push({
          agent: this.AGENT_NAME,
          recipientKey: c.email,
          recipientEmail: c.email,
          actionType: c.isBuyer ? 'BUYER_FUNDING_WATCH_INVITE' : 'FOUNDER_FUNDING_WATCH_INVITE',
          targetOffer: `${membership.name} ($${membership.priceUsd}/mo)`,
          expectedValueUSD: membership.priceUsd,
          status: 'PLANNED',
          subject,
          checkoutUrl: membershipUrl,
          consentProof: `${c.consentText} (score ${c.score}, cooldown-clear)`,
        });
        continue;
      }

      const sendRes = await sendEmail({
        to: c.email,
        subject,
        html,
        text,
        tagType: 'funding-watch-mrr-invite',
        companyName: c.companyName,
        preferProvider: 'brevo',
      });

      if (sendRes.success && sendRes.providerMessageId) {
        const latestActivity = parseActivity(c.leadActivity);
        latestActivity.fundingWatchInviteSentAt = new Date().toISOString();
        latestActivity.lastContactedAt = latestActivity.fundingWatchInviteSentAt;
        await SubscriberRepository.updateSubscriberPreferences(c.email, {
          leadActivity: JSON.stringify(latestActivity),
        });
        ctx.sameDayClaimedEmails.add(c.email);
        ctx.remainingGlobalEmails--;
        executedCount++;
        estimatedPipelineUSD += membership.priceUsd;
        actions.push({
          agent: this.AGENT_NAME,
          recipientKey: c.email,
          recipientEmail: c.email,
          actionType: c.isBuyer ? 'BUYER_FUNDING_WATCH_INVITE' : 'FOUNDER_FUNDING_WATCH_INVITE',
          targetOffer: `${membership.name} ($${membership.priceUsd}/mo)`,
          expectedValueUSD: membership.priceUsd,
          status: 'EXECUTED',
          provider: sendRes.provider,
          providerMessageId: sendRes.providerMessageId,
          subject,
          checkoutUrl: membershipUrl,
          consentProof: `${c.consentText} (score ${c.score})`,
        });
      } else {
        failedCount++;
        actions.push({
          agent: this.AGENT_NAME,
          recipientKey: c.email,
          recipientEmail: c.email,
          actionType: c.isBuyer ? 'BUYER_FUNDING_WATCH_INVITE' : 'FOUNDER_FUNDING_WATCH_INVITE',
          targetOffer: `${membership.name} ($${membership.priceUsd}/mo)`,
          expectedValueUSD: 0,
          status: 'FAILED',
          reason: sendRes.error || 'Provider rejected send',
        });
      }
    }

    return {
      agentName: this.AGENT_NAME,
      mode: ctx.mode,
      scannedCount: subscribers.length,
      eligibleCount: candidates.length,
      executedCount,
      skippedCount,
      blockedCount,
      failedCount,
      estimatedPipelineUSD,
      actions,
      notes: [
        `Evaluated ${subscribers.length} active subscribed leads; prioritized ${candidates.filter((x) => x.isBuyer).length} verified buyers first for $29/mo Funding Watch MRR.`,
      ],
    };
  }
}
