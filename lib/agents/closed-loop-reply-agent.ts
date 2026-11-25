import {
  getOutreachProspectsFromSheet,
  getPartnerInquiriesFromSheet,
  updateOutreachProspectInSheet,
  updatePartnerInquiryStatusInSheet,
} from '@/lib/google-sheets';
import { getAllPurchases } from '@/lib/products/purchase-store';
import { getAllProductPaymentIntents, type ProductPaymentIntent } from '@/lib/payments/product-payment-intents';
import { PRODUCTS } from '@/lib/products/catalog';
import { SubscriberRepository, ensureScopedSubscriberTokens, type SubscriberProfile } from '@/lib/leads/SubscriberRepository';
import { isLoginToken, isUnsubscribeToken } from '@/lib/auth/subscriber-tokens';
import { getLatestOperationalState, readOperationalRows, setOperationalState } from '@/lib/growth-os/operations-store';
import { sendEmail, escapeHtml } from '@/lib/emails/mailer';
import {
  hasRecentCommercialProviderAcceptance,
  isTestOrInternalContact,
  parseCommercialActivity,
} from '@/lib/leads/commercial-eligibility';
import type { CampaignMonitorReport, EngagedRecipientSummary } from './campaign-monitor-agent';
import type { AgentActionItem, AgentExecutionMode, SharedAgentContext } from './types';

export interface ClosedLoopOpenerOptions {
  minOpenerWaitHours?: number;
  allowFreshReopenFollowUp?: boolean;
  minReopenSpacingHours?: number;
  maxFollowUpsIn7d?: number;
}

export interface ClosedLoopReviewReport {
  reviewedAt: string;
  mode: AgentExecutionMode;
  repliesDetected: number;
  repliesHandledCount: number;
  engagedOpenersEvaluated: number;
  adaptiveFollowUpsSent: number;
  unsubscribesProcessed: number;
  founderHotAlerts: string[];
  actions: AgentActionItem[];
  notes: string[];
}

export function classifyInboundText(
  text: string
): 'UNSUBSCRIBE' | 'COUNTER_OR_OBJECTION' | 'SPONSOR_INTEREST' | 'PARTNER_INTEREST' | 'CALL_OR_QUESTION' {
  const lower = text.toLowerCase();
  if (/(unsubscribe|remove me|stop emailing|take me off|opt out|not interested|do not contact)/i.test(lower)) {
    return 'UNSUBSCRIBE';
  }
  if (
    /(not happening|told you what i need|no thanks|not for us|too expensive|too much|can'?t afford|won'?t work|pass on this|pass for now|stop pushing|quit emailing)/i.test(lower) ||
    /\$\s*\d+(?:\.\d+)?\s*(?:usd|cad)?\s*(?:each|per\s*lead|\/lead|apiece)/i.test(lower) ||
    /\b\d+\b[^.\n]{0,50}(?:aged\s*leads|leads)\b[^.\n]{0,50}\$\s*\d+/i.test(lower) ||
    /\bi(?:'ll| will)\s+(?:buy|but|pay|take|do|offer)\b[^.\n]{0,60}\$\s*\d+/i.test(lower)
  ) {
    return 'COUNTER_OR_OBJECTION';
  }
  if (/(sponsor|advertise|article|guest post|editorial|resource insertion|media kit|backlink|placement)/i.test(lower)) {
    return 'SPONSOR_INTEREST';
  }
  if (/(partner|pilot|exclusiv|lead batch|leads|sample|lender|broker)/i.test(lower)) {
    return 'PARTNER_INTEREST';
  }
  return 'CALL_OR_QUESTION';
}

export class ClosedLoopReplyAgent {
  static readonly AGENT_NAME = 'ClosedLoopReplyAgent';

  /**
   * Closed-loop autonomous cycle:
   *   1. Review Replies (Resend inbound Receiving + OutreachProspects replied flags + new Publishing Inquiries)
   *   2. Review Engagement Results (recent opens/clicks on Brevo + Resend without conversion yet)
   *   3. Take Adaptive Next Action (opt-out immediately, send tailored booking/upgrade follow-up, queue 24h watch)
   */
  static async run(
    monitor: CampaignMonitorReport,
    ctx: SharedAgentContext,
    maxAdaptiveEmails = 5,
    allowProactiveOpenerFollowUps = true,
    openerOptions: ClosedLoopOpenerOptions = {}
  ): Promise<ClosedLoopReviewReport> {
    type HandledInboundLedgerEntry = {
      handledReplyIds: string[];
      lastReplyReceivedAt: string;
      lastHandledAt: string;
      lastOutcome: string;
    };

    const [prospects, partnerInquiries, allSubs, purchases, pubInquiries, paymentIntents, rawOpenerLedger, rawInboundLedger] = await Promise.all([
      getOutreachProspectsFromSheet({ strict: false }),
      getPartnerInquiriesFromSheet().catch(() => []),
      SubscriberRepository.getAllSubscribers(true),
      getAllPurchases({ strict: false }).catch(() => []),
      readOperationalRows('Publishing Inquiries', ['Inquiry ID']).catch(() => []),
      getAllProductPaymentIntents().catch(() => [] as ProductPaymentIntent[]),
      getLatestOperationalState<Record<string, { sentAt: string; recentTimestamps?: string[]; offer: string; subject: string; openedSubject?: string }>>('engaged_opener_followup_ledger').catch(() => null),
      getLatestOperationalState<Record<string, HandledInboundLedgerEntry>>('inbound_reply_handled_ledger').catch(() => null),
    ]);

    const openerLedger: Record<string, { sentAt: string; recentTimestamps?: string[]; offer: string; subject: string; openedSubject?: string }> =
      rawOpenerLedger && typeof rawOpenerLedger === 'object' ? { ...rawOpenerLedger } : {};
    const inboundReplyLedger: Record<string, HandledInboundLedgerEntry> =
      rawInboundLedger && typeof rawInboundLedger === 'object' ? { ...rawInboundLedger } : {};
    let inboundReplyLedgerChanged = false;

    // Merge duplicate Leads rows cleanly so companyName, stage, subscription status, and activity remain complete
    const subMap = new Map<string, SubscriberProfile>();
    for (const s of allSubs) {
      const em = String(s.email || '').toLowerCase().trim();
      if (!em) continue;
      const existing = subMap.get(em);
      if (!existing) {
        subMap.set(em, { ...s });
      } else {
        const mergedAct = {
          ...parseCommercialActivity(existing.leadActivity),
          ...parseCommercialActivity(s.leadActivity),
        };
        const cleanExistingName = existing.name && !/^(founder|n\/a|not provided)$/i.test(existing.name.trim()) ? existing.name : '';
        const cleanNewName = s.name && !/^(founder|n\/a|not provided)$/i.test(s.name.trim()) ? s.name : '';
        const cleanExistingCo = existing.companyName && !/^(n\/a|not provided|none)$/i.test(existing.companyName.trim()) ? existing.companyName : '';
        const cleanNewCo = s.companyName && !/^(n\/a|not provided|none)$/i.test(s.companyName.trim()) ? s.companyName : '';
        subMap.set(em, {
          ...existing,
          ...s,
          name: cleanNewName || cleanExistingName || existing.name || s.name,
          companyName: cleanNewCo || cleanExistingCo || existing.companyName,
          region: s.region && s.region !== 'N/A' ? s.region : existing.region,
          industry: s.industry && s.industry !== 'N/A' ? s.industry : existing.industry,
          businessStage: s.businessStage && s.businessStage !== 'N/A' ? s.businessStage : existing.businessStage,
          businessDescription: s.businessDescription && s.businessDescription !== 'N/A' ? s.businessDescription : existing.businessDescription,
          isSubscribed: existing.isSubscribed && s.isSubscribed,
          reportPurchased: Boolean(existing.reportPurchased || s.reportPurchased),
          loginToken: s.loginToken || existing.loginToken,
          unsubscribeToken: s.unsubscribeToken || existing.unsubscribeToken,
          leadActivity: JSON.stringify(mergedAct),
        });
      }
    }

    interface OpenerBuyerProfile {
      name: string;
      region: string;
      industry: string;
      companyName: string;
      ownsReport: boolean;
      ownsRoadmap: boolean;
      ownsBundle: boolean;
      ownsAudit: boolean;
    }

    const buyerProfileMap = new Map<string, OpenerBuyerProfile>();
    const completedBuyerEmails = new Set<string>();
    for (const p of purchases) {
      const em = String(p.email || '').toLowerCase().trim();
      const status = String(p.status || '').toLowerCase();
      const orderId = String(p.paypalOrderId || '').trim();
      if (!em || status !== 'completed') continue;
      if (orderId.startsWith('TEST-') || orderId.startsWith('ORDER_E2E_') || isTestOrInternalContact({ email: em, name: p.name })) {
        continue;
      }
      completedBuyerEmails.add(em);
      const pid = String(p.productId || '').toLowerCase();
      let profData: Record<string, any> = {};
      try {
        profData = typeof p.profileData === 'string' ? JSON.parse(p.profileData || '{}') : (p.profileData || {});
      } catch {}
      const cur = buyerProfileMap.get(em) || {
        name: p.name || 'Founder',
        region: String(profData.province || profData.state || '').trim(),
        industry: String(profData.industry || '').trim(),
        companyName: String(profData.company || '').trim(),
        ownsReport: false,
        ownsRoadmap: false,
        ownsBundle: false,
        ownsAudit: false,
      };
      if (pid.includes('report') || pid === 'report_19') cur.ownsReport = true;
      if (pid.includes('roadmap') || pid.includes('action')) cur.ownsRoadmap = true;
      if (pid.includes('bundle') || pid.includes('blueprint') || pid === 'premium_strategy_79') cur.ownsBundle = true;
      if (pid.includes('audit') || pid.includes('strategy-session')) cur.ownsAudit = true;
      buyerProfileMap.set(em, cur);
    }

    const intentsByEmail = new Map<
      string,
      { attempts: number; latest: ProductPaymentIntent; primaryPid: string; productCounts: Map<string, number> }
    >();
    for (const intent of paymentIntents) {
      const em = String(intent.email || '').toLowerCase().trim();
      if (!em || intent.status === 'completed' || isTestOrInternalContact({ email: em, name: intent.name })) continue;
      const pid = String(intent.productId || 'funding-match-report').toLowerCase().trim();
      const cur = intentsByEmail.get(em);
      if (!cur) {
        intentsByEmail.set(em, {
          attempts: 1,
          latest: intent,
          primaryPid: pid,
          productCounts: new Map([[pid, 1]]),
        });
      } else {
        cur.attempts++;
        cur.productCounts.set(pid, (cur.productCounts.get(pid) || 0) + 1);
        if (new Date(intent.createdAt || 0).getTime() > new Date(cur.latest.createdAt || 0).getTime()) {
          cur.latest = intent;
        }
        let maxCnt = 0;
        for (const [k, v] of cur.productCounts.entries()) {
          if (v > maxCnt) {
            maxCnt = v;
            cur.primaryPid = k;
          }
        }
      }
    }

    const prospectByEmail = new Map<string, (typeof prospects)[number]>();
    for (const pr of prospects) {
      const em = String(pr.email || '').toLowerCase().trim();
      if (em && !prospectByEmail.has(em)) prospectByEmail.set(em, pr);
    }

    const actions: AgentActionItem[] = [];
    const founderHotAlerts: string[] = [];
    const notes: string[] = [];

    let repliesHandledCount = 0;
    let adaptiveFollowUpsSent = 0;
    let unsubscribesProcessed = 0;

    // 1. Review Inbound Email Replies (from Resend Receiving API or Webhook-stamped OutreachProspects)
    const pendingReplyEmails = new Map<string, { id?: string; subject: string; snippet: string; receivedAt: string; source: string }>();

    const toEpochMs = (iso: string): number => {
      const ms = new Date(iso || 0).getTime();
      return Number.isFinite(ms) ? ms : 0;
    };

    for (const r of monitor.inboundReplies) {
      if (!r.fromEmail || isTestOrInternalContact({ email: r.fromEmail })) continue;
      const prev = pendingReplyEmails.get(r.fromEmail);
      if (!prev || toEpochMs(r.receivedAt) >= toEpochMs(prev.receivedAt)) {
        pendingReplyEmails.set(r.fromEmail, {
          id: r.id,
          subject: r.subject,
          snippet: r.snippet,
          receivedAt: r.receivedAt,
          source: 'resend_receiving_api',
        });
      }
    }

    for (const p of prospects) {
      const email = String(p.email || '').toLowerCase().trim();
      const dl = String(p.deliveryStatus || '').toLowerCase();
      if (!email || !p.replied || dl.includes('reply_handled') || dl.includes('reply_opted_out') || dl.includes('reply_escalated')) continue;
      if (!pendingReplyEmails.has(email)) {
        pendingReplyEmails.set(email, {
          subject: `Prospect Reply (${p.prospectName || email})`,
          snippet: p.personalizedHook || '',
          receivedAt: p.repliedAt || new Date().toISOString(),
          source: 'outreach_sheet_replied_flag',
        });
      }
    }

    for (const [email, reply] of pendingReplyEmails.entries()) {
      const matchedProspect = prospects.find((p) => p.email.toLowerCase().trim() === email);
      const matchedPartner = partnerInquiries.find((i) => i.email.toLowerCase().trim() === email);
      const matchedSub = subMap.get(email);
      const existingActivity = matchedSub ? parseCommercialActivity(matchedSub.leadActivity) : {};
      const replyId = reply.id || reply.receivedAt;
      const replyMs = toEpochMs(reply.receivedAt);
      const ledgerEntry = inboundReplyLedger[email];

      if (
        existingActivity.handledInboundReplyIds?.includes(reply.receivedAt) ||
        ledgerEntry?.handledReplyIds?.includes(replyId) ||
        ledgerEntry?.handledReplyIds?.includes(reply.receivedAt) ||
        (ledgerEntry?.lastReplyReceivedAt && toEpochMs(ledgerEntry.lastReplyReceivedAt) >= replyMs) ||
        (matchedPartner?.lastFollowup && toEpochMs(matchedPartner.lastFollowup) >= replyMs) ||
        (matchedProspect?.repliedAt &&
          toEpochMs(matchedProspect.repliedAt) >= replyMs &&
          /reply_(handled|opted_out|escalated)/i.test(String(matchedProspect.deliveryStatus || '')))
      ) {
        continue;
      }

      const recordHandledReply = async (outcome: string, customNotes?: string) => {
        const prevEntry = inboundReplyLedger[email];
        inboundReplyLedger[email] = {
          handledReplyIds: Array.from(new Set([...(prevEntry?.handledReplyIds || []), replyId, reply.receivedAt])).slice(-20),
          lastReplyReceivedAt:
            prevEntry?.lastReplyReceivedAt && toEpochMs(prevEntry.lastReplyReceivedAt) > replyMs
              ? prevEntry.lastReplyReceivedAt
              : reply.receivedAt,
          lastHandledAt: new Date().toISOString(),
          lastOutcome: outcome,
        };
        inboundReplyLedgerChanged = true;

        if (ctx.mode !== 'live') return;
        if (matchedSub) {
          const ids = Array.isArray(existingActivity.handledInboundReplyIds)
            ? existingActivity.handledInboundReplyIds
            : [];
          ids.push(reply.receivedAt);
          existingActivity.handledInboundReplyIds = ids.slice(-10);
          existingActivity.lastReplyHandledAt = new Date().toISOString();
          await SubscriberRepository.updateSubscriberPreferences(email, {
            leadActivity: JSON.stringify(existingActivity),
          }).catch(() => {});
        }
        if (matchedPartner) {
          await updatePartnerInquiryStatusInSheet(matchedPartner.sheetRow, {
            lastFollowup: new Date().toISOString(),
            notes: customNotes || `Handled inbound reply (${outcome}).`,
          }).catch(() => {});
        }
      };

      const bodyFirstText = reply.snippet?.trim() ? `${reply.snippet}\n${reply.subject}` : reply.subject;
      let intent = classifyInboundText(bodyFirstText);
      if (matchedPartner && intent === 'CALL_OR_QUESTION') intent = 'PARTNER_INTEREST';
      if (matchedProspect && intent === 'CALL_OR_QUESTION') intent = 'SPONSOR_INTEREST';

      if (intent === 'UNSUBSCRIBE') {
        unsubscribesProcessed++;
        if (ctx.mode === 'live') {
          if (matchedSub) {
            await SubscriberRepository.updateSubscriberPreferences(email, { isSubscribed: false }).catch(() => {});
          }
          if (matchedProspect) {
            await updateOutreachProspectInSheet(matchedProspect.rowIndex, {
              status: 'rejected',
              replied: true,
              deliveryStatus: 'reply_opted_out',
              repliedAt: reply.receivedAt,
            }).catch(() => {});
          }
        }
        await recordHandledReply('UNSUBSCRIBE', 'Opted out via inbound reply.');
        actions.push({
          agent: this.AGENT_NAME,
          recipientKey: email,
          recipientEmail: email,
          actionType: 'REPLY_OPT_OUT_SUPPRESSED',
          targetOffer: 'Suppression / Compliance',
          expectedValueUSD: 0,
          status: ctx.mode === 'live' ? 'EXECUTED' : 'PLANNED',
          consentProof: `Inbound reply requested removal (${reply.source})`,
        });
        repliesHandledCount++;
        continue;
      }

      if (intent === 'COUNTER_OR_OBJECTION') {
        const excerpt = (reply.snippet || reply.subject).slice(0, 140);
        founderHotAlerts.push(`Inbound counter-offer/objection from ${email} (paused auto-replies): "${excerpt}"`);
        await recordHandledReply('COUNTER_OR_OBJECTION', `ESCALATED TO FOUNDER: ${excerpt}`);
        if (ctx.mode === 'live' && matchedProspect) {
          await updateOutreachProspectInSheet(matchedProspect.rowIndex, {
            replied: true,
            repliedAt: reply.receivedAt,
            deliveryStatus: 'reply_escalated',
          }).catch(() => {});
        }
        actions.push({
          agent: this.AGENT_NAME,
          recipientKey: email,
          recipientEmail: email,
          actionType: 'REPLY_COUNTER_OR_OBJECTION_ESCALATED',
          targetOffer: 'Founder Manual Follow-Up (Auto-Reply Paused)',
          expectedValueUSD: 0,
          status: ctx.mode === 'live' ? 'EXECUTED' : 'PLANNED',
          consentProof: `Counter-offer/objection detected in inbound body: "${excerpt}"`,
        });
        repliesHandledCount++;
        continue;
      }

      if (ctx.sameDayClaimedEmails.has(email) || ctx.remainingGlobalEmails <= 0 || adaptiveFollowUpsSent >= maxAdaptiveEmails) {
        founderHotAlerts.push(`Reply awaiting follow-up from ${email}: "${reply.subject}"`);
        continue;
      }

      const bookUrl =
        intent === 'PARTNER_INTEREST'
          ? 'https://www.fsidigital.ca/partners/checkout?package=exclusive-pilot&utm_source=reply_agent'
          : intent === 'SPONSOR_INTEREST'
            ? 'https://www.fsidigital.ca/advertise/order/done-for-you?utm_source=reply_agent'
            : 'https://www.fsidigital.ca/products/bundle?source=reply-followup';

      const targetOffer =
        intent === 'PARTNER_INTEREST'
          ? 'Exclusive Lead Pilot ($750)'
          : intent === 'SPONSOR_INTEREST'
            ? 'Done-for-You Sponsored Article ($225)'
            : 'Complete Funding Blueprint ($79)';
      const valueUsd = intent === 'PARTNER_INTEREST' ? 750 : intent === 'SPONSOR_INTEREST' ? 225 : 79;
      const subject = `Re: ${reply.subject || 'FSI Digital Follow-Up'}`;
      const html = `
        <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; line-height: 1.6;">
          <p>Hi,</p>
          <p>Thank you for your reply. Here is the direct self-serve link to lock in your ${escapeHtml(targetOffer)} immediately:</p>
          <p style="margin: 20px 0;">
            <a href="${bookUrl}" style="background:#0f172a;color:#ffffff;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">
              Complete ${escapeHtml(targetOffer)} &rarr;
            </a>
          </p>
          <p>Reply anytime with specific questions or filters you'd like included.</p>
          <p>Best regards,<br/>Ashwani Kumar · FSI Digital</p>
        </div>`;
      const text = `Thank you for your reply. Complete your ${targetOffer} directly here: ${bookUrl}\n\nReply anytime if you need custom details.\n\nAshwani Kumar — FSI Digital`;

      if (ctx.mode === 'live') {
        const res = await sendEmail({
          to: email,
          subject,
          html,
          text,
          tagType: 'closed-loop-reply-response',
          forceResend: true,
        });
        if (res.success && res.providerMessageId) {
          repliesHandledCount++;
          adaptiveFollowUpsSent++;
          ctx.sameDayClaimedEmails.add(email);
          ctx.remainingGlobalEmails--;
          founderHotAlerts.push(`Handled inbound ${intent} reply from ${email} -> sent ${targetOffer}`);

          if (matchedProspect) {
            await updateOutreachProspectInSheet(matchedProspect.rowIndex, {
              replied: true,
              positiveConversation: true,
              repliedAt: reply.receivedAt,
              deliveryStatus: 'reply_handled',
            }).catch(() => {});
          }
          await recordHandledReply(intent, `Replied & auto-sent direct ${targetOffer} checkout.`);

          actions.push({
            agent: this.AGENT_NAME,
            recipientKey: email,
            recipientEmail: email,
            actionType: `REPLY_${intent}_RESPONSE`,
            targetOffer,
            expectedValueUSD: valueUsd,
            status: 'EXECUTED',
            provider: res.provider,
            providerMessageId: res.providerMessageId,
            checkoutUrl: bookUrl,
          });
        }
      } else {
        repliesHandledCount++;
        actions.push({
          agent: this.AGENT_NAME,
          recipientKey: email,
          recipientEmail: email,
          actionType: `REPLY_${intent}_RESPONSE`,
          targetOffer,
          expectedValueUSD: valueUsd,
          status: 'PLANNED',
          checkoutUrl: bookUrl,
          consentProof: `Classified reply (${reply.source})`,
        });
      }
    }

    // 1B. Monitor New Publishing Inquiries awaiting auto-checkout confirmation
    for (const row of pubInquiries) {
      const email = String(row[3] || '').toLowerCase().trim();
      const status = String(row[13] || '').toLowerCase();
      if (!email || status.includes('responded') || status.includes('paid')) continue;
      founderHotAlerts.push(`New Sponsor Inquiry awaiting checkout: ${row[4] || email} (${row[6] || 'package'})`);
    }

    // 2. Review Delivery/Open/Click Results -> Strictly Context-Matched Follow-Up for Engaged Openers/Clickers
    // (Only runs proactive outreach when allowProactiveOpenerFollowUps=true inside bounded scheduled waves)
    const recentBuyersOrClickers = monitor.recentEngagements;
    const minWaitHours = openerOptions.minOpenerWaitHours ?? 24;
    const allowFreshReopenFollowUp = openerOptions.allowFreshReopenFollowUp ?? false;
    const minReopenSpacingMs = (openerOptions.minReopenSpacingHours ?? 11) * 60 * 60 * 1000;
    const maxFollowUpsIn7d = openerOptions.maxFollowUpsIn7d ?? (allowFreshReopenFollowUp ? 2 : 1);
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    let ledgerChanged = false;

    if (allowProactiveOpenerFollowUps) {
      const eligibleOpeners: Array<{
        eng: EngagedRecipientSummary;
        sub?: SubscriberProfile;
        prospect?: (typeof prospects)[number];
        buyerProf?: OpenerBuyerProfile;
        intentSummary?: { attempts: number; latest: ProductPaymentIntent; primaryPid: string; productCounts: Map<string, number> };
        score: number;
      }> = [];

      for (const eng of recentBuyersOrClickers) {
        if (ctx.bouncedEmails.has(eng.email) || ctx.sameDayClaimedEmails.has(eng.email)) continue;

        const sub = subMap.get(eng.email);
        const prospect = prospectByEmail.get(eng.email);
        const buyerProf = buyerProfileMap.get(eng.email);
        const intentSummary = intentsByEmail.get(eng.email);

        if (isTestOrInternalContact({ email: eng.email, name: sub?.name || buyerProf?.name })) continue;
        if (sub && !sub.isSubscribed) continue;
        if (
          prospect &&
          (prospect.replied ||
            prospect.positiveConversation ||
            ['failed', 'rejected', 'unsubscribed'].includes(String(prospect.status || '').toLowerCase()))
        ) {
          continue;
        }
        // Require at least one valid CRM, Buyer, Intent, or Sponsor record (never email unknown strangers)
        if (!sub && !prospect && !buyerProf && !intentSummary) continue;
        if (sub && hasRecentCommercialProviderAcceptance(sub, 24)) continue;

        const engagedMs = new Date(eng.occurredAt || 0).getTime();
        if (!Number.isFinite(engagedMs) || ctx.nowMs - engagedMs < minWaitHours * 60 * 60 * 1000) {
          notes.push(
            `Monitoring active opener ${eng.email} (${eng.lastEventType} at ${eng.occurredAt}) — ${minWaitHours}h follow-up timer armed.`
          );
          continue;
        }

        const activity = sub ? parseCommercialActivity(sub.leadActivity) : {};
        const led = openerLedger[eng.email];
        const tsList = Array.from(
          new Set([
            ...(led?.recentTimestamps || []),
            ...(activity.engagedResultFollowupAt ? [String(activity.engagedResultFollowupAt)] : []),
            ...(led?.sentAt ? [String(led.sentAt)] : []),
          ])
        )
          .map((s) => new Date(s).getTime())
          .filter((ms) => Number.isFinite(ms) && ms > 0 && ctx.nowMs - ms < sevenDaysMs)
          .sort((a, b) => a - b);

        const lastFollowupMs = tsList.length > 0 ? tsList[tsList.length - 1] : 0;
        if (lastFollowupMs > 0) {
          if (!allowFreshReopenFollowUp) continue;
          if (tsList.length >= maxFollowUpsIn7d) continue;
          if (ctx.nowMs - lastFollowupMs < minReopenSpacingMs) {
            notes.push(`Spacing active for ${eng.email} (last follow-up ${((ctx.nowMs - lastFollowupMs) / 3600000).toFixed(1)}h ago).`);
            continue;
          }
          // Only follow up again if they opened/clicked AFTER (or right as) our prior follow-up landed
          if (engagedMs < lastFollowupMs - 60_000) continue;
        }

        const isFirstFollowup = lastFollowupMs === 0 ? 100 : 0;
        const multiOpenBoost = (eng.openCount || 1) >= 2 || eng.lastEventType === 'clicked' ? 25 : 0;
        const sponsorOrBuyerBoost = prospect || buyerProf ? 20 : intentSummary ? 15 : 5;

        eligibleOpeners.push({
          eng,
          sub,
          prospect,
          buyerProf,
          intentSummary,
          score: isFirstFollowup + multiOpenBoost + sponsorOrBuyerBoost,
        });
      }

      eligibleOpeners.sort((a, b) => b.score - a.score);

      for (const item of eligibleOpeners) {
        if (adaptiveFollowUpsSent >= maxAdaptiveEmails || ctx.remainingGlobalEmails <= 0) break;
        const { eng, sub, prospect, buyerProf, intentSummary } = item;

        let loginToken = sub && isLoginToken(sub.loginToken, sub.loginToken) ? sub.loginToken! : '';
        let unsubscribeToken = sub && isUnsubscribeToken(sub.unsubscribeToken, sub.unsubscribeToken) ? sub.unsubscribeToken! : '';
        if (ctx.mode === 'live' && sub && (!loginToken || !unsubscribeToken)) {
          const creds = await ensureScopedSubscriberTokens(eng.email).catch(() => null);
          if (creds) {
            loginToken = creds.loginToken;
            unsubscribeToken = creds.unsubscribeToken;
          }
        }

        const tokenOrEmail = loginToken
          ? `token=${encodeURIComponent(loginToken)}`
          : `email=${encodeURIComponent(eng.email)}`;
        const unsubFooterUrl = unsubscribeToken
          ? `https://www.fsidigital.ca/api/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`
          : '';

        const plan = buildContextualOpenerFollowUp({
          eng,
          sub,
          prospect,
          buyerProf,
          intentSummary,
          tokenOrEmail,
          unsubFooterUrl,
        });

        if (!plan) continue;

        if (ctx.mode === 'dry-run') {
          adaptiveFollowUpsSent++;
          ctx.sameDayClaimedEmails.add(eng.email);
          ctx.remainingGlobalEmails--;
          actions.push({
            agent: this.AGENT_NAME,
            recipientKey: eng.email,
            recipientEmail: eng.email,
            actionType: plan.actionType,
            targetOffer: plan.targetOffer,
            expectedValueUSD: plan.expectedValueUSD,
            status: 'PLANNED',
            subject: plan.subject,
            checkoutUrl: plan.checkoutUrl,
            consentProof: plan.reason,
          });
          continue;
        }

        const res = await sendEmail({
          to: eng.email,
          subject: plan.subject,
          html: plan.html,
          text: plan.text,
          tagType: plan.tagType,
          preferProvider: ctx.brevoConfigured ? 'brevo' : 'resend',
        });

        if (res.success && res.providerMessageId) {
          const nowIso = new Date().toISOString();
          adaptiveFollowUpsSent++;
          ctx.sameDayClaimedEmails.add(eng.email);
          ctx.remainingGlobalEmails--;

          const prevLed = openerLedger[eng.email];
          const recentTimestamps = [
            ...(prevLed?.recentTimestamps || []).filter((ts) => ctx.nowMs - new Date(ts).getTime() < sevenDaysMs),
            nowIso,
          ];
          openerLedger[eng.email] = {
            sentAt: nowIso,
            recentTimestamps,
            offer: plan.targetOffer,
            subject: plan.subject,
            openedSubject: eng.openedSubject,
          };
          ledgerChanged = true;

          if (sub) {
            const act = parseCommercialActivity(sub.leadActivity);
            act.engagedResultFollowupAt = nowIso;
            act.engagedResultFollowupOffer = plan.targetOffer;
            act.engagedResultFollowupSubject = plan.subject;
            act.lastContactedAt = nowIso;
            await SubscriberRepository.updateSubscriberPreferences(eng.email, {
              leadActivity: JSON.stringify(act),
            }).catch(() => {});
          }

          if (prospect && plan.actionType === 'ENGAGED_SPONSOR_FOLLOWUP') {
            await updateOutreachProspectInSheet(prospect.rowIndex, {
              deliveryStatus: 'media_touch_2',
              sentAt: nowIso,
              providerMessageId: res.providerMessageId,
            }).catch(() => {});
          }

          actions.push({
            agent: this.AGENT_NAME,
            recipientKey: eng.email,
            recipientEmail: emailOrSelf(eng.email),
            actionType: plan.actionType,
            targetOffer: plan.targetOffer,
            expectedValueUSD: plan.expectedValueUSD,
            status: 'EXECUTED',
            provider: res.provider,
            providerMessageId: res.providerMessageId,
            subject: plan.subject,
            checkoutUrl: plan.checkoutUrl,
            consentProof: plan.reason,
          });
        }
      }
    } else {
      notes.push(`Hourly reactive check: ${recentBuyersOrClickers.length} engaged contacts tracked; proactive opener follow-ups held cleanly for scheduled conversion windows.`);
    }

    const report: ClosedLoopReviewReport = {
      reviewedAt: new Date().toISOString(),
      mode: ctx.mode,
      repliesDetected: pendingReplyEmails.size,
      repliesHandledCount,
      engagedOpenersEvaluated: recentBuyersOrClickers.length,
      adaptiveFollowUpsSent,
      unsubscribesProcessed,
      founderHotAlerts,
      actions,
      notes,
    };

    if (ctx.mode === 'live') {
      if (ledgerChanged) {
        await setOperationalState('engaged_opener_followup_ledger', openerLedger).catch(() => {});
      }
      if (inboundReplyLedgerChanged) {
        await setOperationalState('inbound_reply_handled_ledger', inboundReplyLedger).catch(() => {});
      }
      await setOperationalState('ceo_closed_loop_latest', report).catch(() => {});
    }

    return report;
  }
}

interface ContextualFollowUpPlan {
  actionType: string;
  targetOffer: string;
  expectedValueUSD: number;
  subject: string;
  checkoutUrl: string;
  tagType: string;
  reason: string;
  html: string;
  text: string;
}

function buildContextualOpenerFollowUp(params: {
  eng: EngagedRecipientSummary;
  sub?: SubscriberProfile;
  prospect?: any;
  buyerProf?: {
    name: string;
    region: string;
    industry: string;
    companyName: string;
    ownsReport: boolean;
    ownsRoadmap: boolean;
    ownsBundle: boolean;
    ownsAudit: boolean;
  };
  intentSummary?: { attempts: number; latest: ProductPaymentIntent; primaryPid: string; productCounts: Map<string, number> };
  tokenOrEmail: string;
  unsubFooterUrl: string;
}): ContextualFollowUpPlan | null {
  const { eng, sub, prospect, buyerProf, intentSummary, tokenOrEmail, unsubFooterUrl } = params;
  const rawName = (sub?.name && !/^(founder|n\/a|not provided)$/i.test(sub.name.trim()) ? sub.name : '') || buyerProf?.name || intentSummary?.latest.name || prospect?.name || 'there';
  const firstName = rawName.split(/\s+/)[0] || 'there';
  const company =
    (sub?.companyName && !/^(n\/a|not provided|none)$/i.test(sub.companyName.trim()) ? sub.companyName.trim() : '') ||
    (buyerProf?.companyName && buyerProf.companyName !== 'Not provided' ? buyerProf.companyName.trim() : '') ||
    (prospect?.prospectName || '');
  const region =
    (sub?.region && sub.region !== 'N/A' ? sub.region.trim() : '') ||
    buyerProf?.region ||
    '';

  const openedSubject = (eng.openedSubject || '').trim();
  const cleanReSubject = openedSubject ? `Re: ${openedSubject.replace(/^Re:\s*/i, '')}` : '';
  const openedTag = (eng.openedTag || '').toLowerCase();
  const openedSubLower = openedSubject.toLowerCase();
  const openCountLabel = (eng.openCount || 1) >= 2 ? `opened ${eng.openCount}x` : `engaged (${eng.lastEventType})`;

  const footerHtml = unsubFooterUrl
    ? `<hr style="border:none;border-top:1px solid #e2e8f0;margin:22px 0;"/><p style="font-size:12px;color:#64748b;">FSI Digital · 100 King Street West, Suite 5600, Toronto, ON · <a href="${unsubFooterUrl}" style="color:#64748b;">Unsubscribe</a></p>`
    : `<hr style="border:none;border-top:1px solid #e2e8f0;margin:22px 0;"/><p style="font-size:12px;color:#64748b;">FSI Digital Media &amp; Advisory · Reply &ldquo;stop&rdquo; anytime to opt out.</p>`;

  // 1. B2B SPONSORED MEDIA THREAD (strictly relative to sponsor placement open)
  if (openedTag.includes('sponsored-media') || openedSubLower.includes('sponsored placement') || (prospect && String(prospect.deliveryStatus || '').includes('media_'))) {
    const sponsorName = company || prospect?.prospectName || 'your team';
    const doneForYouUrl = `https://www.fsidigital.ca/advertise/order/done-for-you?utm_source=opener_followup&company=${encodeURIComponent(sponsorName)}`;
    const resourceUrl = `https://www.fsidigital.ca/advertise/contact?package=resource-insertion&utm_source=opener_followup&company=${encodeURIComponent(sponsorName)}`;
    const subject = cleanReSubject || `Re: Sponsored placement on FSI Digital for ${sponsorName}`;
    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;line-height:1.6;">
        <p>Hi ${escapeHtml(firstName)},</p>
        <p>Following up quickly on our note about a Q4 sponsored placement for <strong>${escapeHtml(sponsorName)}</strong>.</p>
        <p>If you want fast turnaround before next week&apos;s editorial schedule locks, both self-serve booking options are live right here:</p>
        <ul>
          <li><strong>Done-for-You Sponsored Article ($225 USD):</strong> Our editorial team writes &amp; publishes a 1,200–1,500 word original feature with 2 contextual <code>rel=&quot;sponsored&quot;</code> links hosted 12+ months.</li>
          <li><strong>Client-Supplied Article ($125 USD)</strong> or <strong>Resource Guide Insertion ($100 USD)</strong> directly inside our US/Canada grant guides.</li>
        </ul>
        <p style="margin:22px 0;">
          <a href="${doneForYouUrl}" style="background:#0f172a;color:#ffffff;padding:12px 22px;text-decoration:none;border-radius:8px;font-weight:700;display:inline-block;">Book Done-for-You Placement ($225) &rarr;</a>
        </p>
        <p style="font-size:13px;color:#334155;">Prefer starting smaller? <a href="${resourceUrl}" style="color:#1d4ed8;font-weight:600;">Reserve a $100 Resource Insertion slot here &rarr;</a></p>
        <p>Best regards,<br/>Ashwani K.<br/>FSI Digital Media Partnerships</p>
        ${footerHtml}
      </div>`;
    const text = `Hi ${firstName},\n\nFollowing up quickly on our Q4 sponsored placement note for ${sponsorName}.\n\n- Done-for-You Sponsored Article ($225 USD): ${doneForYouUrl}\n- Resource Insertion inside US/Canada grant guides ($100 USD): ${resourceUrl}\n\nReply "stop" anytime to opt out.\nAshwani K., FSI Digital`;
    return {
      actionType: 'ENGAGED_SPONSOR_FOLLOWUP',
      targetOffer: 'Done-for-You Sponsored Article ($225) / Resource Insertion ($100)',
      expectedValueUSD: 225,
      subject,
      checkoutUrl: doneForYouUrl,
      tagType: 'closed-loop-sponsor-followup',
      reason: `Sponsor ${openCountLabel} "${openedSubject || 'Sponsored placement'}"`,
      html,
      text,
    };
  }

  // 2. PAID $19 BUYER UPGRADE THREAD ($60 NET BLUEPRINT, strictly when they opened Upgrade email OR aren't inside Funding Watch thread)
  const isBuyer = Boolean(buyerProf?.ownsReport || buyerProf?.ownsRoadmap || sub?.reportPurchased);
  const ownsBundle = Boolean(buyerProf?.ownsBundle);
  const openedWatchInvite = openedTag.includes('funding-watch-mrr') || openedSubLower.includes('funding watch ($29/mo)');
  const openedUpgradeEmail = openedTag.includes('customer-upgrade-agent') || openedSubLower.includes('automatic credit') || openedSubLower.includes('blueprint');

  if (isBuyer && !ownsBundle && (!openedWatchInvite || openedUpgradeEmail)) {
    const bundleUrl = `https://www.fsidigital.ca/products/bundle?${tokenOrEmail}&source=closed_loop_upgrade_opener`;
    const reportPrice = PRODUCTS['funding-match-report'].priceUsd;
    const bundlePrice = PRODUCTS['funding-bundle'].priceUsd;
    const netPrice = buyerProf?.ownsRoadmap ? bundlePrice - PRODUCTS['funding-roadmap'].priceUsd : bundlePrice - reportPrice;
    const subject = cleanReSubject || `Re: Your $${bundlePrice - netPrice} credit — Complete Blueprint ($${netPrice} net)`;
    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;line-height:1.6;">
        <p>Hi ${escapeHtml(firstName)},</p>
        <p>Quick follow-up on the upgrade note you opened earlier${company ? ` for <strong>${escapeHtml(company)}</strong>` : ''}: your full <strong>$${bundlePrice - netPrice} USD</strong> prior purchase credit is active right now.</p>
        <p>That brings the <strong>Complete Funding Blueprint</strong> (application templates, compliance checklists, deadline timeline, and 100% credit toward any future 1-on-1 strategy session) down to just <strong>$${netPrice} USD net</strong>.</p>
        <p style="margin:22px 0;">
          <a href="${bundleUrl}" style="background:#1d4ed8;color:#ffffff;padding:12px 22px;text-decoration:none;border-radius:8px;font-weight:700;display:inline-block;">Unlock Complete Blueprint ($${netPrice} net) &rarr;</a>
        </p>
        <p style="font-size:13px;color:#475569;">Direct debit/credit card and PayPal work seamlessly on both mobile and desktop — zero subscription required.</p>
        ${footerHtml}
      </div>`;
    const text = `Hi ${firstName},\n\nQuick follow-up on the Blueprint upgrade email you opened: your $${bundlePrice - netPrice} credit is active, making the Complete Funding Blueprint just $${netPrice} USD net.\n\nComplete checkout ($${netPrice} net): ${bundleUrl}\n\nNo subscription required.`;
    return {
      actionType: 'ENGAGED_BUYER_BLUEPRINT_FOLLOWUP',
      targetOffer: `Complete Funding Blueprint ($${netPrice} net w/ prior credit)`,
      expectedValueUSD: netPrice,
      subject,
      checkoutUrl: bundleUrl,
      tagType: 'closed-loop-upgrade-followup',
      reason: `Prior buyer ${openCountLabel} "${openedSubject || 'Upgrade offer'}"`,
      html,
      text,
    };
  }

  // 3. HISTORICAL MULTI-ATTEMPT $19/$49 NON-BUYER LEAD (e.g. pmorency01: May -> July -> Sept launch prep, 14 x $19 intents)
  // NEVER push monthly recurring ($29/mo) to leads whose verified checkout history is one-time $19 or $49!
  const hasOneTimeEntryIntent =
    !isBuyer &&
    intentSummary &&
    (intentSummary.primaryPid === 'funding-match-report' ||
      intentSummary.primaryPid === 'funding-roadmap' ||
      intentSummary.primaryPid === 'report_19' ||
      intentSummary.attempts >= 2);

  if (hasOneTimeEntryIntent && intentSummary) {
    const reportUrl = `https://www.fsidigital.ca/products/funding-match-report?${tokenOrEmail}&source=intent_matched_opener`;
    const actionPlanUrl = `https://www.fsidigital.ca/products/action-plan?${tokenOrEmail}&source=intent_matched_opener`;
    const wantsActionPlan = intentSummary.primaryPid === 'funding-roadmap';
    const priceUsd = wantsActionPlan ? PRODUCTS['funding-roadmap'].priceUsd : PRODUCTS['funding-match-report'].priceUsd;
    const primaryUrl = wantsActionPlan ? actionPlanUrl : reportUrl;
    const primaryName = wantsActionPlan ? 'Funding Strategy & Action Plan ($49 one-time)' : 'Funding Recommendation Report ($19 one-time)';
    const stageHints = `${sub?.businessStage || ''} ${sub?.businessDescription || ''}`.toLowerCase();
    const isPreLaunch = /(refin|launch|onboarding|pre_revenue|pre-revenue|startup)/i.test(stageHints);

    const subject = company
      ? `Following up on ${company} — $${priceUsd} one-time funding ${wantsActionPlan ? 'action plan' : 'report'} (no monthly fee)`
      : `Quick follow-up — your $${priceUsd} ${region ? `${region} ` : ''}funding ${wantsActionPlan ? 'action plan' : 'report'} (one-time checkout fixed)`;

    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;line-height:1.6;">
        <p>Hi ${escapeHtml(firstName)},</p>
        <p>Noticed you opened our earlier ${escapeHtml(region || '')} email — looking back at your file${company ? ` for <strong>${escapeHtml(company)}</strong>` : ''}${isPreLaunch ? ' as you move from early development toward launch' : ''}, you don&apos;t need a monthly recurring plan.</p>
        <p>Earlier, our mobile popup checkout blocked your <strong>$${priceUsd} USD one-time</strong> order (${intentSummary.attempts} logged attempt${intentSummary.attempts > 1 ? 's' : ''}). We&apos;ve fixed mobile Safari/iOS checkout to support direct card &amp; PayPal in one tap:</p>
        <p style="margin:22px 0;">
          <a href="${primaryUrl}" style="background:#1d4ed8;color:#ffffff;padding:12px 22px;text-decoration:none;border-radius:8px;font-weight:700;display:inline-block;">Get ${escapeHtml(primaryName)} &rarr;</a>
        </p>
        ${
          !wantsActionPlan
            ? `<p style="font-size:13px;color:#334155;">If you already want step-by-step launch timelines &amp; application templates instead, you can grab the <strong>$49 USD one-time Action Plan</strong> directly here: <a href="${actionPlanUrl}" style="color:#1d4ed8;font-weight:600;">Open $49 Action Plan &rarr;</a> (zero recurring subscription).</p>`
            : ''
        }
        <p>Best regards,<br/>Ashwani K.<br/>FSI Digital</p>
        ${footerHtml}
      </div>`;
    const text = `Hi ${firstName},\n\nThanks for opening our email earlier. Reviewing your history${company ? ` for ${company}` : ''}, a monthly subscription isn't the right fit — your prior ${intentSummary.attempts} checkout attempts were for the one-time $${priceUsd} ${primaryName} while mobile Safari popup blockers got in the way.\n\nDirect mobile card/PayPal checkout is now fixed with zero popups and NO recurring fee:\n- Get $${priceUsd} one-time: ${primaryUrl}\n${!wantsActionPlan ? `- Or launch-ready $49 Action Plan (one-time): ${actionPlanUrl}\n` : ''}\nBest,\nAshwani K., FSI Digital`;

    return {
      actionType: 'ENGAGED_INTENT_MATCHED_FOLLOWUP',
      targetOffer: wantsActionPlan ? 'Funding Strategy & Action Plan ($49 one-time)' : 'Funding Recommendation Report ($19 one-time) / Action Plan ($49)',
      expectedValueUSD: priceUsd,
      subject,
      checkoutUrl: primaryUrl,
      tagType: 'closed-loop-intent-matched',
      reason: `${openCountLabel} + ${intentSummary.attempts} historical $${priceUsd} intent(s) matched (no $29/mo push)`,
      html,
      text,
    };
  }

  // 4. THREAD-RELATIVE FOLLOW-UP FOR OPENERS OF FUNDING WATCH ($29/mo) OR FUNDING RADAR
  const openedRadarOrWatch =
    openedTag.includes('funding-watch-mrr') ||
    openedTag.includes('closed-loop-engaged-followup') ||
    openedSubLower.includes('funding radar') ||
    openedSubLower.includes('funding watch');

  if (openedRadarOrWatch) {
    const watchUrl = `https://www.fsidigital.ca/membership?${tokenOrEmail}&source=closed_loop_watch_opener`;
    const actionPlanUrl = `https://www.fsidigital.ca/products/action-plan?${tokenOrEmail}&source=closed_loop_watch_opener`;
    const reportUrl = `https://www.fsidigital.ca/products/funding-match-report?${tokenOrEmail}&source=closed_loop_watch_opener`;
    const subject = cleanReSubject || `Re: Weekly non-dilutive funding radar${region ? ` for ${region}` : ''} ($29/mo)`;
    const calcContext = Boolean(sub && ((sub.fundingAmount && sub.fundingAmount !== 'N/A') || (sub.leadActivity || '').includes('calculatorCompletedAt')));
    const oneTimeAltUrl = sub?.fundingAmount && /150|187|225|100k/i.test(sub.fundingAmount) ? actionPlanUrl : reportUrl;
    const oneTimeAltLabel = oneTimeAltUrl === actionPlanUrl ? '$49 one-time Funding Strategy & Action Plan' : '$19 one-time Funding Match Report';

    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;line-height:1.6;">
        <p>Hi ${escapeHtml(firstName)},</p>
        <p>Following up on the funding radar email you opened earlier${company ? ` for <strong>${escapeHtml(company)}</strong>` : ''}${region ? ` (${escapeHtml(region)})` : ''}.</p>
        <p>You can activate <strong>Funding Watch ($29/mo USD)</strong> in 30 seconds to receive every new &amp; reopened grant window automatically (cancel in one click anytime)${isBuyer ? '—building right on top of your existing report profile' : ''}:</p>
        <p style="margin:20px 0;">
          <a href="${watchUrl}" style="background:#059669;color:#ffffff;padding:12px 22px;text-decoration:none;border-radius:8px;font-weight:700;display:inline-block;">Activate Funding Watch ($29/mo) &rarr;</a>
        </p>
        ${
          calcContext && !isBuyer
            ? `<p style="font-size:13px;color:#334155;">Prefer a one-time roadmap instead of a monthly plan? <a href="${oneTimeAltUrl}" style="color:#1d4ed8;font-weight:600;">Unlock the ${oneTimeAltLabel} &rarr;</a></p>`
            : ''
        }
        ${footerHtml}
      </div>`;
    const text = `Hi ${firstName},\n\nFollowing up on the funding radar email you opened earlier${region ? ` for ${region}` : ''}:\n\nActivate Funding Watch ($29/mo, cancel in 1 click): ${watchUrl}\n${calcContext && !isBuyer ? `Or choose one-time ${oneTimeAltLabel}: ${oneTimeAltUrl}\n` : ''}`;

    return {
      actionType: 'ENGAGED_WATCH_THREAD_FOLLOWUP',
      targetOffer: 'Funding Watch ($29/mo)' + (calcContext && !isBuyer ? ` / ${oneTimeAltLabel}` : ''),
      expectedValueUSD: 29,
      subject,
      checkoutUrl: watchUrl,
      tagType: 'closed-loop-engaged-followup',
      reason: `Founder ${openCountLabel} "${openedSubject || 'Funding radar'}"`,
      html,
      text,
    };
  }

  // 5. DEFAULT WARM SELF-SERVE FOLLOW-UP (Checkout-fix / Blueprint / General Newsletter Opener)
  const wantsRoadmap = Boolean(
    sub?.fundingAmount && !/under-25k/i.test(sub.fundingAmount) && (sub.leadActivity || '').includes('calculatorCompletedAt')
  );
  const targetUrl = openedUpgradeEmail
    ? `https://www.fsidigital.ca/products/bundle?${tokenOrEmail}&source=closed_loop_blueprint_opener`
    : wantsRoadmap
      ? `https://www.fsidigital.ca/products/action-plan?${tokenOrEmail}&source=closed_loop_opener`
      : `https://www.fsidigital.ca/products/funding-match-report?${tokenOrEmail}&source=closed_loop_opener`;
  const offerPrice = openedUpgradeEmail ? 79 : wantsRoadmap ? 49 : 19;
  const offerName = openedUpgradeEmail
    ? 'Complete Funding Blueprint ($79)'
    : wantsRoadmap
      ? 'Funding Strategy & Action Plan ($49)'
      : 'Funding Recommendation Report ($19)';
  const subject = cleanReSubject || `Following up on your ${region ? `${region} ` : ''}funding eligibility report`;
  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;line-height:1.6;">
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Quick follow-up on the funding update you opened earlier${region ? ` for ${escapeHtml(region)}` : ''}.</p>
      <p>Your saved eligibility profile is ready — unlock your personalized <strong>${escapeHtml(offerName)}</strong> (ranked programs, deadlines, and direct application links, one-time payment) below:</p>
      <p style="margin:20px 0;">
        <a href="${targetUrl}" style="background:#1d4ed8;color:#ffffff;padding:12px 22px;text-decoration:none;border-radius:8px;font-weight:700;display:inline-block;">Get ${escapeHtml(offerName)} &rarr;</a>
      </p>
      ${footerHtml}
    </div>`;
  const text = `Hi ${firstName},\n\nFollowing up on your recent open: your ${offerName} is ready right here: ${targetUrl}`;

  return {
    actionType: 'ENGAGED_SELF_SERVE_FOLLOWUP',
    targetOffer: offerName,
    expectedValueUSD: offerPrice,
    subject,
    checkoutUrl: targetUrl,
    tagType: 'closed-loop-engaged-followup',
    reason: `Founder ${openCountLabel} "${openedSubject || 'Recent funding update'}"`,
    html,
    text,
  };
}

function emailOrSelf(email: string): string {
  return email;
}
