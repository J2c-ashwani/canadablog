import { SubscriberRepository, ensureScopedSubscriberTokens, type SubscriberProfile } from '@/lib/leads/SubscriberRepository';
import { isLoginToken, isUnsubscribeToken } from '@/lib/auth/subscriber-tokens';
import { getAllPurchases, type PurchaseRecord } from '@/lib/products/purchase-store';
import { getAllProductPaymentIntents, type ProductPaymentIntent } from '@/lib/payments/product-payment-intents';
import { getStrategyRecoveryRecords } from '@/lib/strategy-session/recovery-store';
import { getGoogleSheetsClient } from '@/lib/google-sheets';
import { getLatestOperationalState, setOperationalState } from '@/lib/growth-os/operations-store';
import { PRODUCTS } from '@/lib/products/catalog';
import { sendEmail, escapeHtml } from '@/lib/emails/mailer';
import {
  hasRecentCommercialProviderAcceptance,
  isTestOrInternalContact,
  parseCommercialActivity,
} from '@/lib/leads/commercial-eligibility';
import type { AgentActionItem, AgentRunResult, SharedAgentContext } from './types';

const SITE_URL = 'https://www.fsidigital.ca';

interface BuyerSummary {
  email: string;
  name: string;
  region: string;
  industry: string;
  companyName: string;
  ownsReport: boolean;
  ownsRoadmap: boolean;
  ownsBundle: boolean;
  ownsAudit: boolean;
  latestPurchaseMs: number;
}

interface UpgradeCandidate {
  email: string;
  name: string;
  region: string;
  industry: string;
  companyName: string;
  track: 'CONDITION_B_AUDIT_UPGRADE' | 'REPORT_TO_BLUEPRINT' | 'WARM_INQUIRY_SELF_SERVE' | 'HISTORICAL_MOBILE_ABANDONER';
  priority: number;
  targetOffer: string;
  expectedValueUSD: number;
  creditAppliedUSD: number;
  subject: string;
  checkoutUrl: string;
  consentProof: string;
  subscriber?: SubscriberProfile;
  htmlBuilder: (unsubscribeUrl: string) => string;
  textBuilder: (unsubscribeUrl: string) => string;
}

function isValidRealPurchase(p: PurchaseRecord): boolean {
  const status = String(p.status || '').toLowerCase();
  const orderId = String(p.paypalOrderId || '').trim();
  const purchaseId = String(p.purchaseId || '').trim();
  if (status !== 'completed') return false;
  if (orderId.startsWith('TEST-') || orderId.startsWith('ORDER_E2E_') || purchaseId.startsWith('TEST_')) {
    return false;
  }
  return !isTestOrInternalContact({ email: p.email, name: p.name });
}

function hasRecentUpgradeOrWatchTouch(activity: Record<string, any>, nowMs: number): boolean {
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000;

  const upgradeMs = new Date(String(activity.upgradeOutreachSentAt || 0)).getTime();
  if (Number.isFinite(upgradeMs) && upgradeMs > 0 && nowMs - upgradeMs < SEVEN_DAYS_MS) {
    return true;
  }

  const watchMs = new Date(String(activity.fundingWatchInviteSentAt || 0)).getTime();
  if (Number.isFinite(watchMs) && watchMs > 0 && nowMs - watchMs < FORTY_EIGHT_HOURS_MS) {
    return true;
  }

  const hunterMs = new Date(String(activity.hunterOutreachSentAt || 0)).getTime();
  if (Number.isFinite(hunterMs) && hunterMs > 0 && nowMs - hunterMs < FORTY_EIGHT_HOURS_MS) {
    return true;
  }

  return false;
}

function formatFirstName(name?: string): string {
  const cleaned = String(name || '').trim();
  if (!cleaned) return 'there';
  return cleaned.split(/\s+/)[0] || 'there';
}

export class CustomerUpgradeAgent {
  static readonly AGENT_NAME = 'CustomerUpgradeAgent';

  static async run(ctx: SharedAgentContext, maxActions = 8): Promise<AgentRunResult> {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const [allSubscribers, allPurchases, paymentIntents, strategyRecoveries, upgradeLedgerRaw, emailEventsRes] = await Promise.all([
      SubscriberRepository.getAllSubscribers(true),
      getAllPurchases({ strict: false }),
      getAllProductPaymentIntents(),
      getStrategyRecoveryRecords().catch(() => []),
      getLatestOperationalState<Record<string, string>>('upgrade_outreach_sent_ledger').catch(() => null),
      spreadsheetId
        ? getGoogleSheetsClient()
            .then((sheets) =>
              sheets.spreadsheets.values.get({
                spreadsheetId,
                range: "'Email Events'!A2:G",
              })
            )
            .catch(() => null)
        : Promise.resolve(null),
    ]);

    const upgradeLedger: Record<string, string> =
      upgradeLedgerRaw && typeof upgradeLedgerRaw === 'object' ? { ...upgradeLedgerRaw } : {};

    // Also include recent 7d Email Events (Resend + Brevo synced) so direct buyers without a Leads row
    // (such as historical Stripe/PayPal customers) still have an airtight 7-day cooldown.
    const recentEmailEventMs = new Map<string, number>();
    for (const row of emailEventsRes?.data?.values || []) {
      const evType = String(row[3] || '').toLowerCase();
      const addr = String(row[4] || '').toLowerCase().trim();
      const ts = new Date(String(row[5] || row[6] || '')).getTime();
      if (!addr || !Number.isFinite(ts)) continue;
      if (evType.includes('deliver') || evType.includes('open') || evType.includes('click')) {
        const prev = recentEmailEventMs.get(addr) || 0;
        if (ts > prev) recentEmailEventMs.set(addr, ts);
      }
    }

    const resolveTokensReadSafe = async (email: string, sub?: SubscriberProfile) => {
      const existingLogin = isLoginToken(sub?.loginToken, sub?.loginToken) ? sub!.loginToken! : '';
      const existingUnsub = isUnsubscribeToken(sub?.unsubscribeToken, sub?.unsubscribeToken) ? sub!.unsubscribeToken! : '';
      if (existingLogin && existingUnsub) {
        return { loginToken: existingLogin, unsubscribeToken: existingUnsub };
      }
      if (ctx.mode === 'live' && sub) {
        return ensureScopedSubscriberTokens(email).catch(() => null);
      }
      return existingLogin || existingUnsub ? { loginToken: existingLogin, unsubscribeToken: existingUnsub } : null;
    };

    const subscriberMap = new Map<string, SubscriberProfile>();
    const unsubscribedEmails = new Set<string>();
    for (const sub of allSubscribers) {
      const email = String(sub.email || '').toLowerCase().trim();
      if (!email) continue;
      if (!sub.isSubscribed) {
        unsubscribedEmails.add(email);
      }
      if (!subscriberMap.has(email)) {
        subscriberMap.set(email, sub);
      }
    }

    // Deduplicate purchases sharing an identical PayPal order ID (keep earliest real buyer record)
    const realPurchasesRaw = allPurchases
      .filter(isValidRealPurchase)
      .sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());

    const seenOrderIds = new Set<string>();
    const buyersByEmail = new Map<string, BuyerSummary>();

    for (const p of realPurchasesRaw) {
      const email = String(p.email || '').toLowerCase().trim();
      if (!email) continue;
      const orderId = String(p.paypalOrderId || '').trim();
      if (orderId) {
        if (seenOrderIds.has(orderId)) continue;
        seenOrderIds.add(orderId);
      }

      const sub = subscriberMap.get(email);
      let existing = buyersByEmail.get(email);
      if (!existing) {
        existing = {
          email,
          name: p.name || sub?.name || 'Founder',
          region: sub?.region || 'North America',
          industry: sub?.industry || 'your sector',
          companyName: sub?.companyName || 'your company',
          ownsReport: false,
          ownsRoadmap: false,
          ownsBundle: false,
          ownsAudit: false,
          latestPurchaseMs: 0,
        };
        buyersByEmail.set(email, existing);
      }

      const productId = String(p.productId || '').toLowerCase();
      if (productId === 'funding-match-report') existing.ownsReport = true;
      if (productId === 'funding-roadmap') existing.ownsRoadmap = true;
      if (productId === 'funding-bundle') existing.ownsBundle = true;
      if (['strategy-audit', 'strategy-vip', 'strategy-session', 'portfolio-assessment'].includes(productId)) {
        existing.ownsAudit = true;
      }

      const ts = new Date(p.createdAt || 0).getTime();
      if (Number.isFinite(ts) && ts > existing.latestPurchaseMs) {
        existing.latestPurchaseMs = ts;
      }
    }

    const candidates: UpgradeCandidate[] = [];
    const seenCandidateEmails = new Set<string>();
    let skippedCount = 0;
    let blockedCount = 0;

    const isEligibleContact = (email: string, sub?: SubscriberProfile): { ok: boolean; blocked?: boolean } => {
      if (!email || isTestOrInternalContact({ email, name: sub?.name })) return { ok: false };
      if (unsubscribedEmails.has(email)) return { ok: false, blocked: true };
      if (ctx.bouncedEmails.has(email) || ctx.sameDayClaimedEmails.has(email)) return { ok: false, blocked: true };

      const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
      const ledgerMs = upgradeLedger[email] ? new Date(upgradeLedger[email]).getTime() : 0;
      if (Number.isFinite(ledgerMs) && ledgerMs > 0 && ctx.nowMs - ledgerMs < SEVEN_DAYS_MS) {
        return { ok: false };
      }
      const eventMs = recentEmailEventMs.get(email) || 0;
      if (eventMs > 0 && ctx.nowMs - eventMs < SEVEN_DAYS_MS && !sub) {
        // Non-Leads buyers recently touched in Email Events respect the full 7-day cooldown
        return { ok: false };
      }

      if (sub) {
        if (hasRecentCommercialProviderAcceptance(sub, 48)) return { ok: false, blocked: true };
        const activity = parseCommercialActivity(sub.leadActivity);
        if (hasRecentUpgradeOrWatchTouch(activity, ctx.nowMs)) return { ok: false };
      }
      return { ok: true };
    };

    const bundleProduct = PRODUCTS['funding-bundle'];
    const auditProduct = PRODUCTS['strategy-audit'];

    // Track 1 & Track 2: Verified Past Buyers (Condition B Strategy Audit OR $19 -> $79 Self-Serve Upgrade)
    for (const buyer of buyersByEmail.values()) {
      const sub = subscriberMap.get(buyer.email);
      const check = isEligibleContact(buyer.email, sub);
      if (!check.ok) {
        if (check.blocked) blockedCount++;
        else skippedCount++;
        continue;
      }

      if (buyer.ownsAudit) {
        skippedCount++;
        continue;
      }

      const firstName = formatFirstName(buyer.name);
      const regionNote = buyer.region && buyer.region !== 'N/A' ? buyer.region : 'your jurisdiction';

      if (buyer.ownsBundle || buyer.ownsRoadmap) {
        // Condition B: Eligible for $199 Strategy Audit with 100% prior spend credit
        let credit = 0;
        let priorLabel = '';
        if (buyer.ownsReport && buyer.ownsBundle) {
          credit = 98;
          priorLabel = '$19 Recommendation Report + $79 Complete Blueprint ($98 total)';
        } else if (buyer.ownsBundle) {
          credit = 79;
          priorLabel = '$79 Complete Funding Blueprint';
        } else {
          credit = 49;
          priorLabel = '$49 Funding Strategy & Action Plan';
        }

        const netPrice = Math.max(0.5, auditProduct.priceUsd - credit);
        const auditUrl = `${SITE_URL}/audit?email=${encodeURIComponent(buyer.email)}&credit=${credit}&name=${encodeURIComponent(buyer.name)}&source=buyer-upgrade-agent`;
        const subject = `Your $${credit} FSI credit is active ($${netPrice} net for 1-on-1 Funding Strategy Audit)`;

        seenCandidateEmails.add(buyer.email);
        candidates.push({
          email: buyer.email,
          name: buyer.name,
          region: buyer.region,
          industry: buyer.industry,
          companyName: buyer.companyName,
          track: 'CONDITION_B_AUDIT_UPGRADE',
          priority: 100 + credit,
          targetOffer: `${auditProduct.name} ($${netPrice} net after $${credit} credit)`,
          expectedValueUSD: netPrice,
          creditAppliedUSD: credit,
          subject,
          checkoutUrl: auditUrl,
          consentProof: `Condition B verified paid buyer (${priorLabel})`,
          subscriber: sub,
          htmlBuilder: (unsubUrl) => `
            <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; line-height: 1.6;">
              <p>Hi ${escapeHtml(firstName)},</p>
              <p>Thank you for picking up your <strong>${escapeHtml(priorLabel)}</strong> with FSI Digital.</p>
              <p>Because you are an existing paid client, <strong>100% of your $${credit} purchase is automatically credited</strong> toward a 1-on-1 <strong>Funding Strategy Audit &amp; Custom Eligibility Review</strong> (normally $${auditProduct.priceUsd} USD — your balance is <strong>$${netPrice} USD</strong>).</p>
              <p>Before we meet for 30 minutes, we pre-screen your ${escapeHtml(buyer.industry)} profile across ${escapeHtml(regionNote)} and federal funding stacks, rank your top 3 highest-probability programs, and build an application filing timeline. And if you later move into full-service grant preparation, your full fee is credited 100% toward that engagement as well.</p>
              <p style="margin: 24px 0;">
                <a href="${auditUrl}" style="background-color: #0f766e; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  Apply $${credit} Credit &amp; Book Audit ($${netPrice} USD)
                </a>
              </p>
              <p>Or simply reply to this email with two dates/times that suit you if you have a quick question first.</p>
              <p>Best regards,<br/>Ashwani Kumar<br/>FSI Digital</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="font-size: 11px; color: #64748b;">
                FSI Digital · <a href="${unsubUrl}" style="color: #64748b;">Unsubscribe</a>
              </p>
            </div>`,
          textBuilder: (unsubUrl) =>
            `Hi ${firstName},\n\nThank you for purchasing your ${priorLabel} with FSI Digital.\n\nAs an existing paid client, 100% of your $${credit} purchase is credited toward a 1-on-1 Funding Strategy Audit ($${auditProduct.priceUsd} USD -> $${netPrice} USD net).\n\nApply your $${credit} credit here: ${auditUrl}\n\nReply anytime if you have questions.\n\nBest,\nAshwani Kumar — FSI Digital\nUnsubscribe: ${unsubUrl}`,
        });
        continue;
      }

      if (buyer.ownsReport) {
        // Paid $19 Report Owner -> Upgrade to $79 Complete Funding Blueprint ($60 net w/ automatic $19 credit)
        const credit = 19;
        const netPrice = bundleProduct.priceUsd - credit; // $60
        const tokens = await resolveTokensReadSafe(buyer.email, sub);
        const bundleUrl = tokens?.loginToken
          ? `${SITE_URL}/products/bundle?token=${encodeURIComponent(tokens.loginToken)}&source=report-upgrade`
          : `${SITE_URL}/products/bundle?email=${encodeURIComponent(buyer.email)}&source=report-upgrade`;
        const subject = `Upgrade your Funding Report with $${credit} automatic credit ($${netPrice} net Blueprint)`;

        seenCandidateEmails.add(buyer.email);
        candidates.push({
          email: buyer.email,
          name: buyer.name,
          region: buyer.region,
          industry: buyer.industry,
          companyName: buyer.companyName,
          track: 'REPORT_TO_BLUEPRINT',
          priority: 90,
          targetOffer: `${bundleProduct.name} ($${netPrice} net after $${credit} credit)`,
          expectedValueUSD: netPrice,
          creditAppliedUSD: credit,
          subject,
          checkoutUrl: bundleUrl,
          consentProof: `Paid $19 Report buyer eligible for automatic $${credit} Blueprint credit`,
          subscriber: sub,
          htmlBuilder: (unsubUrl) => `
            <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; line-height: 1.6;">
              <p>Hi ${escapeHtml(firstName)},</p>
              <p>Thanks again for unlocking your FSI Digital Funding Recommendation Report for ${escapeHtml(regionNote)}.</p>
              <p>If you want the complete milestone execution roadmap, document checklists, and multi-year grant stacking sequence, you can upgrade to our <strong>${escapeHtml(bundleProduct.name)}</strong> with <strong>100% of your $${credit} report fee automatically credited</strong> — reducing checkout from $${bundleProduct.priceUsd} to <strong>$${netPrice} USD</strong>.</p>
              <p style="margin: 24px 0;">
                <a href="${bundleUrl}" style="background-color: #1d4ed8; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  Upgrade to Complete Blueprint ($${netPrice} USD w/ $${credit} Credit)
                </a>
              </p>
              <p>Your credit is verified automatically server-side for ${escapeHtml(buyer.email)}.</p>
              <p>Best regards,<br/>FSI Digital Funding Intelligence</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="font-size: 11px; color: #64748b;">
                FSI Digital · <a href="${unsubUrl}" style="color: #64748b;">Unsubscribe</a>
              </p>
            </div>`,
          textBuilder: (unsubUrl) =>
            `Hi ${firstName},\n\nThanks for unlocking your FSI Digital Funding Recommendation Report.\n\nUpgrade to the Complete Funding Blueprint (multi-year grant stacking + milestone roadmap + checklists) with your $19 report automatically credited ($${bundleProduct.priceUsd} -> $${netPrice} USD): ${bundleUrl}\n\nBest,\nFSI Digital\nUnsubscribe: ${unsubUrl}`,
        });
      }
    }

    // Track 3: Warm Unpaid Consultation/Inquiry Leads -> Email-first $79 Complete Funding Blueprint (NO cold $199 push)
    const warmInquiryEmails = new Set<string>();
    for (const rec of strategyRecoveries) {
      const email = String(rec.email || '').toLowerCase().trim();
      if (!email || buyersByEmail.has(email) || seenCandidateEmails.has(email)) continue;
      if (['shown', 'abandoned'].includes(rec.status)) {
        warmInquiryEmails.add(email);
      }
    }

    for (const email of warmInquiryEmails) {
      const sub = subscriberMap.get(email);
      const check = isEligibleContact(email, sub);
      if (!check.ok || !sub?.isSubscribed) {
        if (check.blocked) blockedCount++;
        continue;
      }
      const tokens = await resolveTokensReadSafe(email, sub);
      const bundleUrl = tokens?.loginToken
        ? `${SITE_URL}/products/bundle?token=${encodeURIComponent(tokens.loginToken)}&source=warm-inquiry-self-serve`
        : `${SITE_URL}/products/bundle?email=${encodeURIComponent(email)}&source=warm-inquiry-self-serve`;
      const firstName = formatFirstName(sub.name);
      const subject = `Your personalized ${sub.region || ''} Funding Blueprint ($79 self-serve) — ready whenever you are`.replace(/\s+/g, ' ');

      seenCandidateEmails.add(email);
      candidates.push({
        email,
        name: sub.name || 'Founder',
        region: sub.region || 'North America',
        industry: sub.industry || 'your business',
        companyName: sub.companyName || 'your company',
        track: 'WARM_INQUIRY_SELF_SERVE',
        priority: 85,
        targetOffer: `${bundleProduct.name} ($79 self-serve, 100% creditable)`,
        expectedValueUSD: bundleProduct.priceUsd,
        creditAppliedUSD: 0,
        subject,
        checkoutUrl: bundleUrl,
        consentProof: `Subscribed lead with consultation/audit inquiry (self-serve $79 first per policy)`,
        subscriber: sub,
        htmlBuilder: (unsubUrl) => `
          <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; line-height: 1.6;">
            <p>Hi ${escapeHtml(firstName)},</p>
            <p>Following up on your recent funding review with FSI Digital — before scheduling any paid consulting time, we built a complete self-serve way for you to get immediate clarity today.</p>
            <p>The <strong>Complete Funding Blueprint ($79 USD)</strong> compiles your ranked ${escapeHtml(sub.region || 'federal/provincial')} grants, tax credits, application timelines, and multi-year stacking sequence into one instant web dashboard and downloadable PDF.</p>
            <p>If you later decide you want a 1-on-1 advisor review, <strong>100% of your $79 is credited</strong> dollar-for-dollar toward a strategy session.</p>
            <p style="margin: 24px 0;">
              <a href="${bundleUrl}" style="background-color: #1d4ed8; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Access Your Complete Funding Blueprint ($79 USD)
              </a>
            </p>
            <p>Have a quick question about eligibility before ordering? Just reply directly to this email.</p>
            <p>Best regards,<br/>FSI Digital</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="font-size: 11px; color: #64748b;">
              FSI Digital · <a href="${unsubUrl}" style="color: #64748b;">Unsubscribe</a>
            </p>
          </div>`,
        textBuilder: (unsubUrl) =>
          `Hi ${firstName},\n\nFollowing up on your recent funding check — if you want immediate funding clarity without scheduling a call first, your Complete Funding Blueprint ($79 USD) compiles ranked ${sub.region || ''} grants, tax credits, milestones, and document checklists.\n\n100% of the $79 fee also credits toward any future 1-on-1 strategy session if you choose to book one later: ${bundleUrl}\n\nReply anytime with questions.\n\nBest,\nFSI Digital\nUnsubscribe: ${unsubUrl}`,
      });
    }

    // Track 4: Historical (>30d) Unpaid Payment Intents -> Intent-Matched Self-Serve Checkout Fix Recovery
    // Note: <30d abandoners are intentionally left to CartRecoveryService so there is zero overlap.
    // Crucially: match the exact tier attempted ($19 Report or $49 Action Plan) for pre-launch / multi-attempt
    // leads instead of forcing $79 Blueprint or recurring plans.
    const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
    const ONE_EIGHTY_DAYS_MS = 180 * 24 * 60 * 60 * 1000;
    const intentsByEmail = new Map<
      string,
      { intent: ProductPaymentIntent; attempts: number; productCounts: Map<string, number> }
    >();

    for (const intent of paymentIntents) {
      const email = String(intent.email || '').toLowerCase().trim();
      if (!email || buyersByEmail.has(email) || seenCandidateEmails.has(email)) continue;
      if (intent.status === 'completed' || isTestOrInternalContact({ email, name: intent.name })) continue;
      const createdMs = new Date(intent.createdAt || 0).getTime();
      if (!Number.isFinite(createdMs)) continue;
      const ageMs = ctx.nowMs - createdMs;
      if (ageMs < THIRTY_DAYS_MS || ageMs > ONE_EIGHTY_DAYS_MS) continue;

      const pid = String(intent.productId || 'funding-match-report').toLowerCase().trim();
      const prev = intentsByEmail.get(email);
      if (!prev) {
        const productCounts = new Map<string, number>([[pid, 1]]);
        intentsByEmail.set(email, { intent, attempts: 1, productCounts });
      } else {
        prev.attempts++;
        prev.productCounts.set(pid, (prev.productCounts.get(pid) || 0) + 1);
        if (new Date(prev.intent.createdAt || 0).getTime() < createdMs) {
          prev.intent = intent;
        }
      }
    }

    const reportProduct = PRODUCTS['funding-match-report'];
    const roadmapProduct = PRODUCTS['funding-roadmap'];

    for (const [email, { intent, attempts, productCounts }] of intentsByEmail.entries()) {
      const sub = subscriberMap.get(email);
      // Respect CASL/subscribe flags strictly for >30d historical intents
      if (!sub || !sub.isSubscribed) {
        skippedCount++;
        continue;
      }
      const check = isEligibleContact(email, sub);
      if (!check.ok) {
        if (check.blocked) blockedCount++;
        else skippedCount++;
        continue;
      }

      const tokens = await resolveTokensReadSafe(email, sub);
      const tokenParam = tokens?.loginToken
        ? `token=${encodeURIComponent(tokens.loginToken)}`
        : `email=${encodeURIComponent(email)}`;
      const firstName = formatFirstName(sub.name || intent.name);
      const regionLabel = String(sub.region || '').trim();
      const companyLabel =
        sub.companyName && !/^(n\/a|not provided|none)$/i.test(sub.companyName.trim())
          ? sub.companyName.trim()
          : '';

      // Determine exact intended product (do not force $79 Blueprint onto $19/$49 multi-attempt founders)
      let primaryPid = String(intent.productId || 'funding-match-report').toLowerCase().trim();
      let topCount = 0;
      for (const [pid, cnt] of productCounts.entries()) {
        if (cnt > topCount) {
          topCount = cnt;
          primaryPid = pid;
        }
      }

      const wantsEntryReport = primaryPid === 'funding-match-report' || primaryPid === 'report_19';
      const wantsRoadmap = primaryPid === 'funding-roadmap';
      const chosenProduct = wantsEntryReport
        ? reportProduct
        : wantsRoadmap
          ? roadmapProduct
          : bundleProduct;
      const productPath = wantsEntryReport
        ? '/products/funding-match-report'
        : wantsRoadmap
          ? '/products/action-plan'
          : '/products/bundle';

      const primaryUrl = `${SITE_URL}${productPath}?${tokenParam}&source=checkout-fix-recovery`;
      const actionPlanAltUrl = `${SITE_URL}/products/action-plan?${tokenParam}&source=checkout-fix-recovery`;

      const stageHints = `${sub.businessStage || ''} ${sub.businessDescription || ''}`.toLowerCase();
      const isLaunchingSoon = /(refin|launch|onboarding|pre_revenue|pre-revenue|startup|early)/i.test(stageHints);

      const subject = wantsEntryReport
        ? `Direct card/PayPal checkout fixed — your $${chosenProduct.priceUsd} ${regionLabel ? `${regionLabel} ` : ''}Funding Report`.replace(/\s+/g, ' ')
        : wantsRoadmap
          ? `Checkout fixed — your $${chosenProduct.priceUsd} ${regionLabel ? `${regionLabel} ` : ''}Funding Action Plan`.replace(/\s+/g, ' ')
          : `Checkout fixed (no popups) — your ${regionLabel} Funding Blueprint link`.replace(/\s+/g, ' ');

      seenCandidateEmails.add(email);
      candidates.push({
        email,
        name: sub.name || intent.name || 'Founder',
        region: sub.region || 'North America',
        industry: sub.industry || 'your business',
        companyName: companyLabel || 'your company',
        track: 'HISTORICAL_MOBILE_ABANDONER',
        priority: 70 + Math.min(attempts, 20),
        targetOffer: `${chosenProduct.name} ($${chosenProduct.priceUsd} one-time, exact historical intent)`,
        expectedValueUSD: chosenProduct.priceUsd,
        creditAppliedUSD: 0,
        subject,
        checkoutUrl: primaryUrl,
        consentProof: `Active subscribed lead w/ ${attempts} incomplete ${primaryPid} checkout attempt(s) (>30d)`,
        subscriber: sub,
        htmlBuilder: (unsubUrl) => `
          <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; line-height: 1.6;">
            <p>Hi ${escapeHtml(firstName)},</p>
            <p>A quick note on ${companyLabel ? `<strong>${escapeHtml(companyLabel)}</strong>` : 'your funding profile'}: our logs showed ${attempts >= 3 ? `${attempts} earlier attempts` : 'an earlier attempt'} for the <strong>${escapeHtml(chosenProduct.name)} ($${chosenProduct.priceUsd} USD one-time)</strong> stopped at mobile checkout before PayPal/card captured.</p>
            <p>We&apos;ve upgraded checkout so direct debit/credit card &amp; PayPal redirect smoothly on iPhone Safari and mobile browsers — zero popups and <strong>no monthly subscription</strong>.</p>
            ${
              wantsEntryReport && isLaunchingSoon
                ? `<p>Since you&apos;ve progressed from early planning toward launch, you can unlock your matched program report right now for <strong>$${reportProduct.priceUsd} one-time</strong> — or jump straight to the <strong>$${roadmapProduct.priceUsd} Funding Strategy &amp; Action Plan</strong> with step-by-step timelines &amp; templates.</p>`
                : ''
            }
            <p style="margin: 22px 0;">
              <a href="${primaryUrl}" style="background-color: #1d4ed8; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Complete ${escapeHtml(chosenProduct.name)} ($${chosenProduct.priceUsd} one-time)
              </a>
            </p>
            ${
              wantsEntryReport
                ? `<p style="font-size: 13px; color: #334155;">Want launch timelines &amp; submission checklists too? <a href="${actionPlanAltUrl}" style="color: #1d4ed8; font-weight: 600;">Get the $${roadmapProduct.priceUsd} Action Plan directly &rarr;</a> (your prior $${reportProduct.priceUsd} always credits if you start there first).</p>`
                : ''
            }
            <p>Best regards,<br/>FSI Digital</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="font-size: 11px; color: #64748b;">
              FSI Digital · <a href="${unsubUrl}" style="color: #64748b;">Unsubscribe</a>
            </p>
          </div>`,
        textBuilder: (unsubUrl) =>
          `Hi ${firstName},\n\nOur logs showed ${attempts} earlier mobile checkout attempt(s) for your ${chosenProduct.name} ($${chosenProduct.priceUsd} USD one-time) stalled cleanly on popup/mobile redirect.\n\nWe fixed direct card & PayPal checkout with zero popups and NO monthly subscription:\nComplete ${chosenProduct.name} ($${chosenProduct.priceUsd}): ${primaryUrl}\n${wantsEntryReport ? `Or launch-ready $${roadmapProduct.priceUsd} Action Plan: ${actionPlanAltUrl}\n` : ''}\nBest,\nFSI Digital\nUnsubscribe: ${unsubUrl}`,
      });
    }

    candidates.sort((a, b) => b.priority - a.priority);
    const selected = candidates.slice(0, Math.max(0, Math.min(maxActions, ctx.remainingGlobalEmails)));

    const actions: AgentActionItem[] = [];
    let executedCount = 0;
    let failedCount = 0;
    let estimatedPipelineUSD = 0;

    for (const c of selected) {
      if (ctx.remainingGlobalEmails <= 0 || ctx.sameDayClaimedEmails.has(c.email)) {
        blockedCount++;
        actions.push({
          agent: this.AGENT_NAME,
          recipientKey: c.email,
          recipientEmail: c.email,
          actionType: c.track,
          targetOffer: c.targetOffer,
          expectedValueUSD: 0,
          status: 'BLOCKED',
          reason: 'Global daily email cap or same-day duplicate guard reached.',
        });
        continue;
      }

      const unsubUrl = c.subscriber?.unsubscribeToken
        ? `${SITE_URL}/api/unsubscribe?token=${encodeURIComponent(c.subscriber.unsubscribeToken)}`
        : `${SITE_URL}/unsubscribe`;

      if (ctx.mode === 'dry-run') {
        ctx.sameDayClaimedEmails.add(c.email);
        ctx.remainingGlobalEmails--;
        executedCount++;
        estimatedPipelineUSD += c.expectedValueUSD;
        actions.push({
          agent: this.AGENT_NAME,
          recipientKey: c.email,
          recipientEmail: c.email,
          actionType: c.track,
          targetOffer: c.targetOffer,
          expectedValueUSD: c.expectedValueUSD,
          status: 'PLANNED',
          subject: c.subject,
          checkoutUrl: c.checkoutUrl,
          consentProof: c.consentProof,
        });
        continue;
      }

      const sendRes = await sendEmail({
        to: c.email,
        subject: c.subject,
        html: c.htmlBuilder(unsubUrl),
        text: c.textBuilder(unsubUrl),
        tagType: 'customer-upgrade-agent',
        companyName: c.companyName,
        preferProvider: ctx.brevoConfigured ? 'brevo' : 'resend',
      });

      if (sendRes.success && sendRes.providerMessageId) {
        const nowIso = new Date().toISOString();
        upgradeLedger[c.email] = nowIso;
        await setOperationalState('upgrade_outreach_sent_ledger', upgradeLedger).catch(() => {});

        if (c.subscriber) {
          const latestActivity = parseCommercialActivity(c.subscriber.leadActivity);
          latestActivity.upgradeOutreachSentAt = nowIso;
          latestActivity.upgradeOutreachProviderMessageId = sendRes.providerMessageId;
          latestActivity.upgradeTrack = c.track;
          latestActivity.upgradeTargetOffer = c.targetOffer;
          latestActivity.lastContactedAt = nowIso;
          await SubscriberRepository.updateSubscriberPreferences(c.email, {
            leadActivity: JSON.stringify(latestActivity),
          });
        }

        ctx.sameDayClaimedEmails.add(c.email);
        ctx.remainingGlobalEmails--;
        executedCount++;
        estimatedPipelineUSD += c.expectedValueUSD;
        actions.push({
          agent: this.AGENT_NAME,
          recipientKey: c.email,
          recipientEmail: c.email,
          actionType: c.track,
          targetOffer: c.targetOffer,
          expectedValueUSD: c.expectedValueUSD,
          status: 'EXECUTED',
          provider: sendRes.provider,
          providerMessageId: sendRes.providerMessageId,
          subject: c.subject,
          checkoutUrl: c.checkoutUrl,
          consentProof: c.consentProof,
        });
      } else {
        failedCount++;
        actions.push({
          agent: this.AGENT_NAME,
          recipientKey: c.email,
          recipientEmail: c.email,
          actionType: c.track,
          targetOffer: c.targetOffer,
          expectedValueUSD: 0,
          status: 'FAILED',
          reason: sendRes.error || 'Provider rejected send',
        });
      }
    }

    return {
      agentName: this.AGENT_NAME,
      mode: ctx.mode,
      scannedCount: buyersByEmail.size + warmInquiryEmails.size + intentsByEmail.size,
      eligibleCount: candidates.length,
      executedCount,
      skippedCount,
      blockedCount,
      failedCount,
      estimatedPipelineUSD,
      actions,
      notes: [
        `Evaluated ${buyersByEmail.size} real verified buyer profiles, ${warmInquiryEmails.size} warm inquiry leads, and ${intentsByEmail.size} >30d historical incomplete checkouts.`,
      ],
    };
  }
}
