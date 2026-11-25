import {
  getOutreachProspectsFromSheet,
  seedOutreachProspects,
  updateOutreachProspectInSheet,
  type OutreachProspect,
} from '@/lib/google-sheets';
import { ADVERTISING_PACKAGES } from '@/lib/advertising/config';
import { SubscriberRepository, type SubscriberProfile } from '@/lib/leads/SubscriberRepository';
import { readOperationalRows } from '@/lib/growth-os/operations-store';
import { sendEmail, escapeHtml } from '@/lib/emails/mailer';
import { isTestOrInternalContact, hasRecentCommercialProviderAcceptance, parseCommercialActivity } from '@/lib/leads/commercial-eligibility';
import type { AgentActionItem, AgentRunResult, SharedAgentContext } from './types';

function extractDomain(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '');
}

function isValidEmailAddress(email: string): boolean {
  return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email.trim());
}

const EXCLUDED_DOMAINS = new Set([
  'linkedin.com',
  'ca.linkedin.com',
  'ycombinator.com',
  'startup.google.com',
  'twitter.com',
  'x.com',
  'facebook.com',
  'instagram.com',
  'youtube.com',
  'wikipedia.org',
  'canada.ca',
  'sba.gov',
]);

const FREEMAIL_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'icloud.com',
  'aol.com',
  'msn.com',
  'pm.me',
  'protonmail.com',
  'proton.me',
  'att.net',
  'rogers.com',
  'shaw.ca',
  'bell.net',
  'sympatico.ca',
]);

const SPONSOR_FIT_REGEX =
  /(grant|fund|capital|lender|credit|sred|sr&ed|tax|rsm|fintech|accelerat|incubat|innovat|venture|payroll|advis|accounting|bookkeep|localseo|marketing|saas)/i;

const DAY_MS = 24 * 60 * 60 * 1000;

export type SponsorTouchStage = 'SPONSOR_TOUCH_1' | 'SPONSOR_TOUCH_2' | 'SPONSOR_TOUCH_3';

interface SponsorCandidate {
  sourceType: 'outreach_sheet' | 'internal_crm_lead';
  prospect?: OutreachProspect;
  subscriber?: SubscriberProfile;
  email: string;
  companyName: string;
  domain: string;
  tier: 1 | 2 | 3;
  label: string;
  recommendedPkgKey: 'done-for-you' | 'client-supplied' | 'resource-insertion';
  touchStage: SponsorTouchStage;
  isEngaged: boolean;
}

export class SponsoredMediaAgent {
  static readonly AGENT_NAME = 'SponsoredMediaAgent';

  static classifyProspect(domainOrEmail: string, companyHint = ''): {
    tier: 1 | 2 | 3;
    label: string;
    recommendedPkgKey: 'done-for-you' | 'client-supplied' | 'resource-insertion';
  } {
    const joined = `${domainOrEmail} ${companyHint}`.toLowerCase();
    if (/(boast|fundica|pocketed|grantcompass|mentorworks|impactfundingsolutions|fundingcake|grant-x|rsmcanada|northernenergycapital|builder-capitals|sred|leyton|ayming|venn|float|ownr|fundthrough|clearco|\brbc\b|\bbdc\b)/i.test(joined)) {
      return { tier: 1, label: 'Tier-1 Fintech / SR&ED / Capital Sponsor', recommendedPkgKey: 'done-for-you' };
    }
    if (/(entrevestor|failory|vestbee|techstartsnow|thelogic|ascentvalley|launchranked|sesamers|localseodfy|agency|media)/i.test(joined)) {
      return { tier: 2, label: 'Tier-2 Startup Media / B2B Growth', recommendedPkgKey: 'client-supplied' };
    }
    return { tier: 3, label: 'Tier-3 Accelerator / Ecosystem', recommendedPkgKey: 'resource-insertion' };
  }

  /**
   * Automatically discovers B2B sponsorship prospects via Serper when pipeline inventory runs low.
   * Only retains verbatim publicly visible email addresses with explicit sourceUrl provenance.
   */
  static async discoverNewSponsorsViaSerper(
    existingDomains: Set<string>,
    bouncedEmails: Set<string>,
    maxToSeed = 10,
    dryRun = false
  ): Promise<{ queriesRun: number; foundCount: number; seededCount: number; preview: Array<{ email: string; domain: string; sourceUrl: string }> }> {
    const apiKey = process.env.SERPER_API_KEY?.trim();
    if (!apiKey) {
      return { queriesRun: 0, foundCount: 0, seededCount: 0, preview: [] };
    }

    const queries = [
      '("partnerships@" OR "marketing@" OR "info@") ("SR&ED" OR "business grants" OR "tax credit") (Canada OR software)',
      '("marketing@" OR "partners@" OR "advertise@") ("SBA loan" OR "small business funding" OR "R&D tax credit")',
    ];

    const discovered: Array<Omit<OutreachProspect, 'rowIndex'>> = [];
    const preview: Array<{ email: string; domain: string; sourceUrl: string }> = [];
    let queriesRun = 0;

    for (const q of queries) {
      if (discovered.length >= maxToSeed) break;
      try {
        queriesRun++;
        const resp = await fetch('https://google.serper.dev/search', {
          method: 'POST',
          headers: {
            'X-API-KEY': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ q, num: 10 }),
        });
        if (!resp.ok) continue;
        const json = await resp.json();
        const organic: Array<{ title?: string; link?: string; snippet?: string }> = json?.organic || [];

        for (const item of organic) {
          if (discovered.length >= maxToSeed) break;
          const link = String(item.link || '').trim();
          const domain = extractDomain(link);
          if (!domain || EXCLUDED_DOMAINS.has(domain) || existingDomains.has(domain) || /\.(edu|gov)$/i.test(domain)) {
            continue;
          }

          const matches = String(item.snippet || '').match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi) || [];
          const cleanEmail = matches
            .map((m) => m.toLowerCase().trim())
            .find((m) => {
              const emailDomain = extractDomain(m.split('@')[1] || '');
              return (
                isValidEmailAddress(m) &&
                !bouncedEmails.has(m) &&
                !FREEMAIL_DOMAINS.has(emailDomain) &&
                !EXCLUDED_DOMAINS.has(emailDomain) &&
                (emailDomain === domain || domain.includes(emailDomain) || emailDomain.includes(domain))
              );
            });

          if (!cleanEmail) continue;

          existingDomains.add(domain);
          const brandName = (item.title || domain).split(/[|\-–:]/)[0].trim().slice(0, 60) || domain;
          preview.push({ email: cleanEmail, domain, sourceUrl: link });
          discovered.push({
            website: domain,
            prospectName: brandName,
            email: cleanEmail,
            targetPage: '/advertise',
            name: `${brandName} Partnerships`,
            personalizedHook: 'Verified public B2B funding/advisory snippet match via Serper Sponsor Prospector.',
            status: 'pending',
            sentAt: null,
            deliveryStatus: '',
            replied: false,
            positiveConversation: false,
            backlinkEarned: false,
            campaignId: 'sponsored-media-2026-q4',
            source: 'serper-sponsor-prospect',
            sourceUrl: link,
          });
        }
      } catch (err: any) {
        console.warn('SponsoredMediaAgent Serper query failed:', err?.message || err);
      }
    }

    let seededCount = 0;
    if (!dryRun && discovered.length > 0) {
      const seedRes = await seedOutreachProspects(discovered);
      seededCount = (seedRes as any)?.inserted || 0;
    }

    return { queriesRun, foundCount: discovered.length, seededCount, preview };
  }

  private static resolveTouchStage(prospect: OutreachProspect, nowMs: number): SponsorTouchStage | 'COMPLETE' | 'WAIT' {
    const statusLower = String(prospect.status || '').toLowerCase().trim();
    const deliveryLower = String(prospect.deliveryStatus || '').toLowerCase().trim();
    const sentMs = prospect.sentAt ? new Date(prospect.sentAt).getTime() : 0;

    if (deliveryLower.includes('media_touch_3') || deliveryLower.includes('media_sequence_complete')) {
      return 'COMPLETE';
    }
    if (deliveryLower.includes('media_touch_2')) {
      if (!sentMs || nowMs - sentMs < 4 * DAY_MS) return 'WAIT';
      return 'SPONSOR_TOUCH_3';
    }
    if (deliveryLower.includes('media_touch_1') || deliveryLower.includes('media_pitch_sent')) {
      if (!sentMs || nowMs - sentMs < 3 * DAY_MS) return 'WAIT';
      return 'SPONSOR_TOUCH_2';
    }
    if (statusLower === 'sent') {
      return 'COMPLETE'; // Legacy non-media outreach already contacted outside this sequence
    }
    return 'SPONSOR_TOUCH_1';
  }

  private static buildCampaignCopy(c: SponsorCandidate) {
    const pkg = ADVERTISING_PACKAGES[c.recommendedPkgKey] || ADVERTISING_PACKAGES['done-for-you'];
    const priceUsd = pkg.priceUsd || 225;
    const recipientName =
      c.prospect?.name && c.prospect.name !== 'Team'
        ? c.prospect.name
        : c.subscriber?.name || `${c.companyName} Team`;
    const advertiseUrl = `https://www.fsidigital.ca/advertise?pkg=${pkg.id}&utm_source=sponsor_campaign&utm_campaign=${c.touchStage.toLowerCase()}`;
    const orderUrl = `https://www.fsidigital.ca/advertise/order?package=${pkg.id}&utm_source=sponsor_campaign`;

    if (c.touchStage === 'SPONSOR_TOUCH_2') {
      const subject = `Re: FSI Digital Q4 sponsor calendar for ${c.companyName} (Canada/US grant audience)`;
      const html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
          <p>Hi ${escapeHtml(recipientName)},</p>
          <p>Quick follow-up on our Q4 editorial slots at <strong>FSI Digital</strong> (<a href="https://www.fsidigital.ca/advertise">fsidigital.ca/advertise</a>).</p>
          <p>We currently track <strong>127 government funding programs across Canada &amp; all 50 US states</strong> across ~2,717 indexed pages where founders are actively checking SR&amp;ED, IRAP, SBIR, and SBA capital eligibility.</p>
          <p>For <strong>${escapeHtml(c.companyName)}</strong>, we can publish within 24–48 business hours under our transparent flat-rate packages:</p>
          <ul>
            <li><strong>${escapeHtml(pkg.name)} ($${priceUsd} USD):</strong> Full placement with contextual <code>rel="sponsored"</code> link hosted 12+ months.</li>
            <li><strong>Or Resource Insertion ($100 USD):</strong> Direct recommendation placement inside an existing high-intent regional/program guide.</li>
          </ul>
          <p style="margin: 22px 0;">
            <a href="${orderUrl}" style="background:#0f172a;color:#ffffff;padding:12px 22px;text-decoration:none;border-radius:8px;font-weight:700;display:inline-block;">Reserve Q4 Placement ($${priceUsd} USD) &rarr;</a>
          </p>
          <p style="font-size:13px;color:#475569;">Reply "stop" if you'd prefer no follow-up on sponsorships.</p>
          <p>Best regards,<br/>Ashwani K.<br/>FSI Digital Partnerships · Toronto, ON</p>
        </div>`;
      const text = `Hi ${recipientName},\n\nQuick follow-up on FSI Digital Q4 sponsor placements for ${c.companyName}. Founders actively use our 127-program database & calculators across Canada/US.\n\nDirect booking ($${priceUsd} USD ${pkg.name} or $100 Resource Insertion): ${orderUrl}\n\nReply "stop" anytime to opt out.\n\nAshwani K., FSI Digital`;
      return { subject, html, text, advertiseUrl, pkg, priceUsd };
    }

    if (c.touchStage === 'SPONSOR_TOUCH_3') {
      const resourcePkg = ADVERTISING_PACKAGES['resource-insertion'];
      const resourcePrice = resourcePkg.priceUsd || 100;
      const resourceUrl = `https://www.fsidigital.ca/advertise/order?package=resource-insertion&utm_source=sponsor_campaign_t3`;
      const subject = `Final Q4 check-in: $100 contextual guide slot for ${c.companyName}`;
      const html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
          <p>Hi ${escapeHtml(recipientName)},</p>
          <p>Last quick check-in before we lock next week's editorial updates — if a full sponsored article ($225) isn't on the roadmap this month, we also open <strong>$100 USD Resource Insertion</strong> links directly inside our Canadian &amp; US grant/lending guides.</p>
          <p style="margin: 20px 0;">
            <a href="${resourceUrl}" style="background:#1d4ed8;color:#ffffff;padding:10px 20px;text-decoration:none;border-radius:8px;font-weight:700;display:inline-block;">View $100 Resource Insertion Booking &rarr;</a>
          </p>
          <p>Either way, no further automated follow-ups after this note. Wishing the ${escapeHtml(c.companyName)} team a great quarter.</p>
          <p>Best regards,<br/>Ashwani K.<br/>FSI Digital</p>
        </div>`;
      const text = `Hi ${recipientName},\n\nFinal Q4 note — if a $225 sponsored feature isn't needed this month, we have $100 Resource Insertion placements inside our high-intent US/Canada grant guides: ${resourceUrl}\n\nNo more automated follow-ups after this.\n\nBest,\nAshwani K., FSI Digital`;
      return { subject, html, text, advertiseUrl: resourceUrl, pkg: resourcePkg, priceUsd: resourcePrice };
    }

    // SPONSOR_TOUCH_1 (Day 0)
    const internalNote =
      c.sourceType === 'internal_crm_lead'
        ? `<p>Since your team at <strong>${escapeHtml(c.companyName)}</strong> is active in the funding ecosystem and connected with FSI Digital alerts, we wanted to share our open Q4 sponsored editorial inventory starting at <strong>$100–$225 USD</strong>:</p>`
        : `<p>Because your work at <strong>${escapeHtml(c.companyName)}</strong> serves founders evaluating grants, tax credits, and non-dilutive capital on our calculators and regional guides, we have open Q4 sponsored editorial slots starting at <strong>$100–$225 USD</strong>:</p>`;

    const unsubFooter = c.subscriber?.unsubscribeToken
      ? `https://www.fsidigital.ca/api/unsubscribe?token=${encodeURIComponent(c.subscriber.unsubscribeToken)}`
      : '';

    const subject = `Sponsored placement on FSI Digital for ${c.companyName}`;
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
        <p>Hi ${escapeHtml(recipientName)},</p>
        <p>I'm reaching out from <strong>FSI Digital</strong> (<a href="https://www.fsidigital.ca">fsidigital.ca</a>), a commercial funding intelligence platform covering 127 tracked Canadian &amp; US grant, R&amp;D tax credit, and lending programs across ~2,717 indexed guides.</p>
        ${internalNote}
        <ul>
          <li><strong>Done-for-You Sponsored Article ($225 USD):</strong> 1,200–1,500 word original feature, 2 contextual <code>rel="sponsored"</code> links, hosted 12+ months.</li>
          <li><strong>Client-Supplied Sponsored Article ($125 USD):</strong> Rapid editorial review &amp; publishing within 24–48 business hours.</li>
          <li><strong>Sponsored Resource Insertion ($100 USD):</strong> Contextual placement inside high-intent US/Canada grant guides.</li>
        </ul>
        <p style="margin: 22px 0;">
          <a href="${advertiseUrl}" style="background:#0f172a;color:#ffffff;padding:12px 22px;text-decoration:none;border-radius:8px;font-weight:700;display:inline-block;">View Packages &amp; Direct Booking &rarr;</a>
        </p>
        <p style="font-size:13px;color:#475569;">${unsubFooter ? `<a href="${unsubFooter}" style="color:#475569;">Unsubscribe</a> or reply "stop" anytime.` : `Reply "unsubscribe" anytime to opt out of sponsorship updates.`}</p>
        <p>Best regards,<br/>Ashwani K.<br/>FSI Digital Media Partnerships<br/>100 King Street West, Suite 5600, Toronto, ON</p>
      </div>`;
    const text = `Hi ${recipientName},\n\nReaching out from FSI Digital (fsidigital.ca). We cover 127 Canadian & US funding programs across ~2,717 indexed pages and open Q4 sponsored editorial slots ($100-$225 USD):\n- Done-for-You Sponsored Article ($225 USD)\n- Client-Supplied Sponsored Article ($125 USD)\n- Sponsored Resource Insertion ($100 USD)\n\nView packages & direct booking: ${advertiseUrl}\n\n${unsubFooter ? `Unsubscribe: ${unsubFooter}` : 'Reply "unsubscribe" anytime to opt out.'}\n\nBest regards,\nAshwani K., FSI Digital`;

    return { subject, html, text, advertiseUrl, pkg, priceUsd };
  }

  static async run(ctx: SharedAgentContext, batchLimit = 10, discoverIfNeeded = true): Promise<AgentRunResult> {
    const [prospectsRaw, allSubs, pubInquiries, pubOrders] = await Promise.all([
      getOutreachProspectsFromSheet({ strict: true }),
      SubscriberRepository.getAllSubscribers(false),
      readOperationalRows('Publishing Inquiries', ['Inquiry ID']).catch(() => []),
      readOperationalRows('Publishing Orders', ['Order ID']).catch(() => []),
    ]);

    // Build stop-on-inquiry / stop-on-order sets
    const convertedEmailsAndDomains = new Set<string>();
    for (const row of pubInquiries) {
      const email = String(row[3] || '').toLowerCase().trim();
      const site = extractDomain(String(row[5] || ''));
      if (email) convertedEmailsAndDomains.add(email);
      if (site) convertedEmailsAndDomains.add(site);
    }
    for (const row of pubOrders) {
      const email = String(row[7] || '').toLowerCase().trim();
      const site = extractDomain(String(row[9] || ''));
      if (email) convertedEmailsAndDomains.add(email);
      if (site) convertedEmailsAndDomains.add(site);
    }

    let prospects = prospectsRaw;
    const knownDomains = new Set<string>(
      prospects
        .map((p) => extractDomain(p.website || p.email.split('@')[1] || ''))
        .filter(Boolean)
    );

    const untouchedCount = prospects.filter(
      (p) => (p.status === 'pending' || p.status === 'review_required') && !(p.deliveryStatus || '').includes('media_')
    ).length;

    const discoveryNotes: string[] = [];
    if (discoverIfNeeded && untouchedCount < 25 && process.env.SERPER_API_KEY) {
      const serperRes = await this.discoverNewSponsorsViaSerper(
        knownDomains,
        ctx.bouncedEmails,
        8,
        ctx.mode === 'dry-run'
      );
      discoveryNotes.push(
        `Serper Sponsor Prospector ran ${serperRes.queriesRun} queries -> found ${serperRes.foundCount} verified email domains (${ctx.mode === 'live' ? `seeded ${serperRes.seededCount}` : 'previewed in dry-run'}).`
      );
      if (ctx.mode === 'live' && serperRes.seededCount > 0) {
        prospects = await getOutreachProspectsFromSheet({ strict: true });
      }
    }

    const actions: AgentActionItem[] = [];
    const seenDomains = new Set<string>();
    const candidates: SponsorCandidate[] = [];

    let skippedCount = 0;
    let blockedCount = 0;

    // Source 1: OutreachProspects (Multi-Touch Follow-Ups + New Tiered Pitches)
    for (const prospect of prospects) {
      const email = (prospect.email || '').toLowerCase().trim();
      const domain = extractDomain(prospect.website || email.split('@')[1] || '');
      const statusLower = (prospect.status || '').toLowerCase().trim();

      if (!isValidEmailAddress(email) || !domain || EXCLUDED_DOMAINS.has(domain) || /\.(edu|gov)$/i.test(domain)) {
        skippedCount++;
        continue;
      }
      if (
        ctx.bouncedEmails.has(email) ||
        statusLower === 'failed' ||
        statusLower === 'rejected' ||
        prospect.replied ||
        prospect.positiveConversation ||
        convertedEmailsAndDomains.has(email) ||
        convertedEmailsAndDomains.has(domain)
      ) {
        blockedCount++;
        continue;
      }

      const touchStage = this.resolveTouchStage(prospect, ctx.nowMs);
      if (touchStage === 'WAIT' || touchStage === 'COMPLETE') {
        skippedCount++;
        continue;
      }

      if (seenDomains.has(domain)) {
        skippedCount++;
        continue;
      }
      seenDomains.add(domain);

      const classification = this.classifyProspect(domain, prospect.prospectName);
      candidates.push({
        sourceType: 'outreach_sheet',
        prospect,
        email,
        companyName: prospect.prospectName || domain,
        domain,
        tier: classification.tier,
        label: classification.label,
        recommendedPkgKey: classification.recommendedPkgKey,
        touchStage,
        isEngaged: Boolean(ctx.engagedEmails?.has(email)),
      });
    }

    // Source 2: Internal B2B Sponsor-Fit Corporate Leads in `Leads`
    let internalMatchedCount = 0;
    for (const sub of allSubs) {
      const email = String(sub.email || '').toLowerCase().trim();
      const rawSite = String(sub.website || '').trim();
      const cleanSite = rawSite && !/^(n\/a|none|null|not provided|-)$/i.test(rawSite) ? rawSite : '';
      const domain = extractDomain(cleanSite || email.split('@')[1] || '');
      if (!email || !isValidEmailAddress(email) || !domain || !domain.includes('.')) continue;
      if (FREEMAIL_DOMAINS.has(domain) || EXCLUDED_DOMAINS.has(domain) || /\.(edu|gov)$/i.test(domain)) continue;
      if (isTestOrInternalContact(sub)) continue;
      if (ctx.bouncedEmails.has(email) || convertedEmailsAndDomains.has(email) || convertedEmailsAndDomains.has(domain)) continue;
      if (seenDomains.has(domain)) continue;

      if (hasRecentCommercialProviderAcceptance(sub, 48)) {
        blockedCount++;
        continue;
      }
      const activity = parseCommercialActivity(sub.leadActivity);
      if (activity.sponsorOutreachSentAt) continue;
      const recentTouchMs = Math.max(
        new Date(activity.touch1SentAt || 0).getTime() || 0,
        new Date(activity.touch2SentAt || 0).getTime() || 0,
        new Date(activity.touch3SentAt || 0).getTime() || 0,
        new Date(activity.lastContactedAt || 0).getTime() || 0
      );
      if (recentTouchMs > 0 && ctx.nowMs - recentTouchMs < 48 * 60 * 60 * 1000) {
        blockedCount++;
        continue;
      }

      const fitTarget = `${domain} ${sub.companyName || ''} ${sub.website || ''}`;
      if (!SPONSOR_FIT_REGEX.test(fitTarget)) continue;

      seenDomains.add(domain);
      internalMatchedCount++;
      const companyName = sub.companyName && sub.companyName !== 'N/A' && sub.companyName !== 'Not provided'
        ? sub.companyName
        : domain;
      const classification = this.classifyProspect(domain, companyName);

      candidates.push({
        sourceType: 'internal_crm_lead',
        subscriber: sub,
        email,
        companyName,
        domain,
        tier: classification.tier,
        label: `${classification.label} (Internal CRM Match)`,
        recommendedPkgKey: classification.recommendedPkgKey,
        touchStage: 'SPONSOR_TOUCH_1',
        isEngaged: Boolean(ctx.engagedEmails?.has(email)),
      });
    }

    // Prioritize: Engaged (opened/clicked) -> Touch 2/3 warm follow-ups -> Tier 1 Fintech -> Tier 2 -> Tier 3
    const touchWeight = (s: SponsorTouchStage) => (s === 'SPONSOR_TOUCH_2' ? 0 : s === 'SPONSOR_TOUCH_3' ? 1 : 2);
    candidates.sort((a, b) => {
      if (a.isEngaged !== b.isEngaged) return a.isEngaged ? -1 : 1;
      if (a.tier !== b.tier) return a.tier - b.tier;
      return touchWeight(a.touchStage) - touchWeight(b.touchStage);
    });

    let executedCount = 0;
    let failedCount = 0;
    let estimatedPipelineUSD = 0;

    const batch = candidates.slice(0, Math.max(0, Math.min(batchLimit, ctx.remainingGlobalEmails)));

    for (const item of batch) {
      const email = item.email;
      if (ctx.sameDayClaimedEmails.has(email)) {
        skippedCount++;
        continue;
      }

      const copy = this.buildCampaignCopy(item);
      const consentTag = `${item.label} | ${item.touchStage}${item.isEngaged ? ' (engaged)' : ''}`;

      if (ctx.mode === 'dry-run') {
        ctx.sameDayClaimedEmails.add(email);
        ctx.remainingGlobalEmails--;
        executedCount++;
        estimatedPipelineUSD += copy.priceUsd;
        actions.push({
          agent: this.AGENT_NAME,
          recipientKey: item.domain,
          recipientEmail: email,
          actionType: item.touchStage,
          targetOffer: `${copy.pkg.name} ($${copy.priceUsd})`,
          expectedValueUSD: copy.priceUsd,
          status: 'PLANNED',
          subject: copy.subject,
          checkoutUrl: copy.advertiseUrl,
          consentProof: consentTag,
        });
        continue;
      }

      const sendRes = await sendEmail({
        to: email,
        subject: copy.subject,
        html: copy.html,
        text: copy.text,
        tagType: `sponsored-media-${item.touchStage.toLowerCase()}`,
        companyName: item.companyName,
        preferProvider: 'brevo',
      });

      if (sendRes.success && sendRes.providerMessageId) {
        const nowIso = new Date().toISOString();
        const deliveryStage =
          item.touchStage === 'SPONSOR_TOUCH_1'
            ? 'media_touch_1'
            : item.touchStage === 'SPONSOR_TOUCH_2'
              ? 'media_touch_2'
              : 'media_touch_3';

        if (item.sourceType === 'outreach_sheet' && item.prospect) {
          await updateOutreachProspectInSheet(item.prospect.rowIndex, {
            status: 'sent',
            sentAt: nowIso,
            deliveryStatus: deliveryStage,
            providerMessageId: sendRes.providerMessageId,
            campaignId: 'sponsored-media-2026-q4',
          });
        } else if (item.sourceType === 'internal_crm_lead' && item.subscriber) {
          await seedOutreachProspects([
            {
              website: item.domain,
              prospectName: item.companyName,
              email,
              targetPage: '/advertise',
              name: item.subscriber.name || `${item.companyName} Team`,
              personalizedHook: 'Internal CRM B2B Fintech/Advisor sponsor identification.',
              status: 'sent',
              sentAt: nowIso,
              deliveryStatus: deliveryStage,
              replied: false,
              positiveConversation: false,
              backlinkEarned: false,
              campaignId: 'sponsored-media-2026-q4',
              source: 'internal_crm_sponsor',
              sourceUrl: 'internal-crm:Leads',
              providerMessageId: sendRes.providerMessageId,
            },
          ]).catch(() => {});

          const act = parseCommercialActivity(item.subscriber.leadActivity);
          act.sponsorOutreachSentAt = nowIso;
          act.sponsorCampaignStage = deliveryStage;
          act.sponsorProviderMessageId = sendRes.providerMessageId;
          act.lastContactedAt = nowIso;
          await SubscriberRepository.updateSubscriberPreferences(email, {
            leadActivity: JSON.stringify(act),
          });
        }

        ctx.sameDayClaimedEmails.add(email);
        ctx.remainingGlobalEmails--;
        executedCount++;
        estimatedPipelineUSD += copy.priceUsd;
        actions.push({
          agent: this.AGENT_NAME,
          recipientKey: item.domain,
          recipientEmail: email,
          actionType: item.touchStage,
          targetOffer: `${copy.pkg.name} ($${copy.priceUsd})`,
          expectedValueUSD: copy.priceUsd,
          status: 'EXECUTED',
          provider: sendRes.provider,
          providerMessageId: sendRes.providerMessageId,
          subject: copy.subject,
          checkoutUrl: copy.advertiseUrl,
          consentProof: consentTag,
        });
      } else {
        failedCount++;
        actions.push({
          agent: this.AGENT_NAME,
          recipientKey: item.domain,
          recipientEmail: email,
          actionType: item.touchStage,
          targetOffer: `${copy.pkg.name} ($${copy.priceUsd})`,
          expectedValueUSD: 0,
          status: 'FAILED',
          reason: sendRes.error || 'Provider rejected send',
        });
      }
    }

    return {
      agentName: this.AGENT_NAME,
      mode: ctx.mode,
      scannedCount: prospects.length + allSubs.length,
      eligibleCount: candidates.length,
      executedCount,
      skippedCount,
      blockedCount,
      failedCount,
      estimatedPipelineUSD,
      actions,
      notes: [
        `Evaluated ${prospects.length} OutreachProspects + identified ${internalMatchedCount} B2B sponsor-fit corporate domains in Leads -> ${candidates.length} ready candidates across Touch 1/2/3.`,
        ...discoveryNotes,
      ],
    };
  }
}
