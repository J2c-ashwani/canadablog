import {
  getGoogleSheetsClient,
  getPartnerInquiriesFromSheet,
  updatePartnerInquiryStatusInSheet,
  type PartnerInquiryRecord,
} from '@/lib/google-sheets';
import { PARTNER_PACKAGES } from '@/lib/partners/packages';
import { sendEmail, escapeHtml } from '@/lib/emails/mailer';
import { isTestOrInternalContact } from '@/lib/leads/commercial-eligibility';
import type { AgentActionItem, AgentRunResult, SharedAgentContext } from './types';

interface ConsentedPoolRecord {
  id: string;
  geo: 'CA' | 'US' | 'Unspecified';
  province: string;
  industry: string;
  fundingGoal: string;
  purpose: string;
  hasPhone: boolean;
  consentVersion: string;
  date: string;
}

const US_STATES = new Set([
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC','COLORADO','ARKANSAS','NEW YORK','VIRGINIA','NEW JERSEY',
]);

const CA_PROVS = new Set([
  'AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT',
  'ONTARIO','QUEBEC','ALBERTA','BRITISH COLUMBIA','MANITOBA','SASKATCHEWAN',
  'NOVA SCOTIA','NEW BRUNSWICK','PRINCE EDWARD ISLAND','NEWFOUNDLAND',
  'BRITISH-COLUMBIA','PRINCE-EDWARD-ISLAND',
]);

export class PartnerBrokerAgent {
  static readonly AGENT_NAME = 'PartnerBrokerAgent';

  static async loadVerifiedConsentedPool(): Promise<ConsentedPoolRecord[]> {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    if (!spreadsheetId) return [];
    const sheets = await getGoogleSheetsClient();

    const [leadsRes, mcaRes] = await Promise.all([
      sheets.spreadsheets.values.get({ spreadsheetId, range: 'Leads!A:BW' }),
      sheets.spreadsheets.values.get({ spreadsheetId, range: "'MCA Applications'!A:Z" }),
    ]);

    const leadsRows = leadsRes.data.values || [];
    const mcaRows = mcaRes.data.values || [];

    const seenEmails = new Set<string>();
    const pool: ConsentedPoolRecord[] = [];

    // Newest first scan across Leads for explicit v2 partner-specialist consent
    for (let r = leadsRows.length - 1; r >= 1; r--) {
      const row = leadsRows[r];
      const email = String(row[2] || '').toLowerCase().trim();
      const name = String(row[3] || '');
      if (!email || !email.includes('@') || seenEmails.has(email)) continue;
      if (isTestOrInternalContact({ email, name }) || email.includes('join2campus.com')) continue;

      const isSubscribed = String(row[33] || 'Yes').toLowerCase() !== 'no';
      const colT = String(row[19] || '').trim();
      const consentVersion = String(row[20] || '').trim();
      const consentText = String(row[21] || '').trim();
      if (!isSubscribed || !/^(yes|true|1)$/i.test(colT)) continue;
      if (!/funding-specialist-contact-v2/i.test(consentVersion) && !/vetted funding specialists/i.test(consentText)) {
        continue; // Never include v3-2026-08-28 self-serve-only contacts
      }

      seenEmails.add(email);
      const countryStr = String(row[4] || '').toLowerCase();
      const provStr = String(row[5] || '').toUpperCase().trim();
      const geo: ConsentedPoolRecord['geo'] =
        countryStr.includes('canada') || CA_PROVS.has(provStr)
          ? 'CA'
          : countryStr.includes('united states') || countryStr.includes('usa') || US_STATES.has(provStr)
            ? 'US'
            : 'Unspecified';

      pool.push({
        id: `LEAD-${r + 1}`,
        geo,
        province: String(row[5] || 'N/A'),
        industry: String(row[6] || 'N/A'),
        fundingGoal: String(row[8] || 'N/A'),
        purpose: String(row[9] || 'N/A'),
        hasPhone: String(row[11] || '').replace(/\D/g, '').length >= 10,
        consentVersion,
        date: String(row[0] || '').slice(0, 10),
      });
    }

    // Also include explicit MCA partner-sharing applications
    for (let i = 1; i < mcaRows.length; i++) {
      const row = mcaRows[i];
      const email = String(row[10] || '').toLowerCase().trim();
      if (!email || seenEmails.has(email)) continue;
      if (isTestOrInternalContact({ email, name: String(row[9] || '') })) continue;
      if (String(row[22] || '').toLowerCase() !== 'yes') continue;

      seenEmails.add(email);
      pool.push({
        id: String(row[1] || `MCA-${i + 1}`),
        geo: 'CA',
        province: String(row[7] || 'ON'),
        industry: String(row[13] || 'N/A'),
        fundingGoal: `$${row[17] || 'N/A'}`,
        purpose: String(row[18] || 'Working Capital'),
        hasPhone: String(row[11] || '').replace(/\D/g, '').length >= 10,
        consentVersion: 'mca-apply-consentToShare-v1',
        date: String(row[0] || '').slice(0, 10),
      });
    }

    return pool;
  }

  private static selectPilotPackage(inquiry: PartnerInquiryRecord) {
    const model = `${inquiry.purchaseModel} ${inquiry.preferences} ${inquiry.budget}`.toLowerCase();
    if (model.includes('exclusive') || model.includes('5k') || model.includes('20k')) {
      return PARTNER_PACKAGES.find((p) => p.id === 'exclusive-pilot') || PARTNER_PACKAGES[1];
    }
    return PARTNER_PACKAGES.find((p) => p.id === 'shared-pilot') || PARTNER_PACKAGES[0];
  }

  static async run(ctx: SharedAgentContext, maxActions = 4): Promise<AgentRunResult> {
    const [inquiries, pool] = await Promise.all([
      getPartnerInquiriesFromSheet(),
      this.loadVerifiedConsentedPool(),
    ]);

    const actions: AgentActionItem[] = [];
    const notes: string[] = [
      `Verified external partner-consented inventory: ${pool.length} records (CA: ${pool.filter((p) => p.geo === 'CA').length}, US: ${pool.filter((p) => p.geo === 'US').length}, Unspecified: ${pool.filter((p) => p.geo === 'Unspecified').length}).`,
      `Excluded all fsi-automated-funding-updates-v3-2026-08-28 leads from partner sharing.`,
    ];

    let executedCount = 0;
    let skippedCount = 0;
    let blockedCount = 0;
    let failedCount = 0;
    let estimatedPipelineUSD = 0;
    let eligibleCount = 0;

    const FOUR_DAYS_MS = 4 * 24 * 60 * 60 * 1000;

    for (const inquiry of inquiries) {
      const email = inquiry.email.toLowerCase().trim();
      if (!email || isTestOrInternalContact({ email, name: inquiry.name })) {
        skippedCount++;
        continue;
      }

      if (ctx.bouncedEmails.has(email) || ctx.sameDayClaimedEmails.has(email)) {
        blockedCount++;
        actions.push({
          agent: this.AGENT_NAME,
          recipientKey: `row-${inquiry.sheetRow}`,
          recipientEmail: email,
          actionType: 'PARTNER_PILOT_PROPOSAL',
          targetOffer: 'Shared/Exclusive Lead Pilot',
          expectedValueUSD: 0,
          status: 'BLOCKED',
          reason: ctx.bouncedEmails.has(email) ? 'Suppressed bounce email' : 'Same-day recipient limit',
        });
        continue;
      }

      const statusLower = inquiry.status.toLowerCase();
      if (
        statusLower.includes('closed') ||
        statusLower.includes('active partner') ||
        statusLower.includes('won') ||
        statusLower.includes('sequence complete') ||
        statusLower.includes('touch 3')
      ) {
        skippedCount++;
        continue;
      }

      const lastFollowupMs = inquiry.lastFollowup && inquiry.lastFollowup !== 'N/A'
        ? new Date(inquiry.lastFollowup).getTime()
        : 0;
      if (lastFollowupMs > 0 && ctx.nowMs - lastFollowupMs < FOUR_DAYS_MS) {
        skippedCount++;
        continue;
      }

      const touchStage =
        statusLower.includes('touch 2') || statusLower.includes('follow-up 1')
          ? 'PARTNER_PILOT_TOUCH_3'
          : statusLower.includes('proposed') || statusLower.includes('touch 1')
            ? 'PARTNER_PILOT_TOUCH_2'
            : 'PARTNER_PILOT_TOUCH_1';

      const wantsUS = /us|usa|united states|both/i.test(inquiry.geography);
      const wantsCA = /ca|canada|both/i.test(inquiry.geography) || !wantsUS;
      const matchingPool = pool.filter((rec) =>
        (wantsCA && rec.geo === 'CA') || (wantsUS && rec.geo === 'US')
      );

      eligibleCount++;
      const pkg = this.selectPilotPackage(inquiry);
      const checkoutUrl = `https://www.fsidigital.ca/partners/checkout?package=${pkg.id}`;
      const sampleRows = matchingPool.slice(0, 5);
      const firstName = inquiry.name.split(/\s+/)[0] || 'Team';

      const sampleHtmlRows = sampleRows
        .map(
          (r) =>
            `<tr><td style="padding:6px 10px;border-bottom:1px solid #e2e8f0;">${escapeHtml(r.id)}</td><td style="padding:6px 10px;border-bottom:1px solid #e2e8f0;">${escapeHtml(r.geo)} (${escapeHtml(r.province)})</td><td style="padding:6px 10px;border-bottom:1px solid #e2e8f0;">${escapeHtml(r.industry)}</td><td style="padding:6px 10px;border-bottom:1px solid #e2e8f0;">${escapeHtml(r.fundingGoal)}</td><td style="padding:6px 10px;border-bottom:1px solid #e2e8f0;">${r.hasPhone ? 'Phone Verified' : 'Email Only'}</td></tr>`
        )
        .join('');

      const subject =
        touchStage === 'PARTNER_PILOT_TOUCH_2'
          ? `Follow-up: ${matchingPool.length} verified leads ready for ${inquiry.companyName || 'Partner'}`
          : touchStage === 'PARTNER_PILOT_TOUCH_3'
            ? `Final check-in: 5-lead validation or starter pilot for ${inquiry.companyName || 'Partner'}`
            : `${inquiry.companyName || 'Partner'} x FSI Digital — Verified ${wantsUS && wantsCA ? 'CA/US' : wantsUS ? 'US' : 'Canadian'} Starter Pilot (${pkg.name})`;
      const introLine =
        touchStage === 'PARTNER_PILOT_TOUCH_2'
          ? `<p>Following up on our earlier pilot proposal for <strong>${escapeHtml(inquiry.companyName || 'your firm')}</strong> — we still hold <strong>${matchingPool.length} consent-verified founder records</strong> matching your territory ready for allocation.</p>`
          : touchStage === 'PARTNER_PILOT_TOUCH_3'
            ? `<p>Final follow-up regarding <strong>${escapeHtml(inquiry.companyName || 'your firm')}</strong>'s partner lead inquiry: if a full 10-lead pilot feels too large right now, reply directly to arrange a 5-lead sample verification batch ($250), or reserve your ${escapeHtml(pkg.name)} anytime via the checkout link below.</p>`
            : `<p>Thank you for registering <strong>${escapeHtml(inquiry.companyName || 'your firm')}</strong> with FSI Digital's Partner Program (${escapeHtml(inquiry.geography || 'North America')} · ${escapeHtml(inquiry.purchaseModel || pkg.name)}).</p>
          <p>Rather than overpromising volume before your team validates lead quality, we recommend starting with a controlled, consent-verified starter pilot strictly backed by explicit specialist-contact disclosures:</p>`;
      const html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
          <p>Hi ${escapeHtml(firstName)},</p>
          ${introLine}
          <ul>
            <li><strong>Recommended Starter Package:</strong> ${escapeHtml(pkg.name)} — <strong>$${pkg.priceUsd} USD</strong> (${escapeHtml(pkg.leadCount)}, ${escapeHtml(pkg.leadType)})</li>
            <li><strong>Current Consent-Verified Inventory Match:</strong> <strong>${matchingPool.length}</strong> active partner-consented business founders matching your territory (${pool.filter((p) => p.hasPhone).length} total with verified phone numbers across ${pool.length} compliant records).</li>
            <li><strong>Privacy &amp; Compliance Boundary:</strong> Zero unconsented leads are ever shared; private founder contact records release only upon pilot confirmation and partner approval.</li>
          </ul>
          <p><strong>Redacted Preview From Verified Inventory (Zero PII):</strong></p>
          <table style="width:100%;border-collapse:collapse;font-size:12px;border:1px solid #e2e8f0;">
            <thead><tr style="background:#f8fafc;text-align:left;"><th style="padding:6px 10px;">Ref ID</th><th style="padding:6px 10px;">Region</th><th style="padding:6px 10px;">Industry</th><th style="padding:6px 10px;">Funding Goal</th><th style="padding:6px 10px;">Contactability</th></tr></thead>
            <tbody>${sampleHtmlRows}</tbody>
          </table>
          <p style="margin:24px 0;">
            <a href="${checkoutUrl}" style="background:#0f172a;color:#ffffff;padding:12px 22px;text-decoration:none;border-radius:8px;font-weight:700;display:inline-block;">Reserve ${escapeHtml(pkg.name)} ($${pkg.priceUsd} USD) &rarr;</a>
          </p>
          <p>Reply directly to this email if you prefer a smaller 5-lead validation test or custom delivery schedule.</p>
          <p>Best regards,<br/>Ashwani K.<br/>FSI Digital Partnerships</p>
        </div>
      `;
      const text = `Hi ${firstName},\n\nThank you for your partner inquiry for ${inquiry.companyName}.\n\nWe currently hold ${matchingPool.length} consent-verified partner-shareable records matching ${inquiry.geography || 'your territory'} (strictly filtered to explicit partner-contact consent). We recommend starting with our ${pkg.name} ($${pkg.priceUsd} USD for ${pkg.leadCount}).\n\nReserve pilot checkout: ${checkoutUrl}\n\nReply directly if you'd like to confirm filters or delivery cadence over email.\n\nBest regards,\nAshwani K.\nFSI Digital Partnerships`;

      if (actions.filter((a) => a.status === 'EXECUTED' || a.status === 'PLANNED').length >= maxActions || ctx.remainingGlobalEmails <= 0) {
        skippedCount++;
        continue;
      }

      if (ctx.mode === 'dry-run') {
        ctx.sameDayClaimedEmails.add(email);
        ctx.remainingGlobalEmails--;
        executedCount++;
        estimatedPipelineUSD += pkg.priceUsd;
        actions.push({
          agent: this.AGENT_NAME,
          recipientKey: `row-${inquiry.sheetRow}`,
          recipientEmail: email,
          actionType: touchStage,
          targetOffer: `${pkg.name} ($${pkg.priceUsd})`,
          expectedValueUSD: pkg.priceUsd,
          status: 'PLANNED',
          subject,
          checkoutUrl,
          consentProof: `${matchingPool.length} verified v2+MCA records matched`,
        });
        continue;
      }

      const sendRes = await sendEmail({
        to: email,
        subject,
        html,
        text,
        tagType: 'b2b-partner-pilot-proposal',
        companyName: inquiry.companyName,
        forceResend: true,
      });

      if (sendRes.success && sendRes.providerMessageId) {
        const nowIso = new Date().toISOString();
        const nextStatus =
          touchStage === 'PARTNER_PILOT_TOUCH_3'
            ? 'Pilot Sequence Complete (Touch 3)'
            : touchStage === 'PARTNER_PILOT_TOUCH_2'
              ? 'Pilot Follow-Up 1 (Touch 2)'
              : 'Pilot Proposed (Touch 1)';
        await updatePartnerInquiryStatusInSheet(inquiry.sheetRow, {
          status: nextStatus,
          assignedManager: 'PartnerBrokerAgent',
          lastFollowup: nowIso,
          notes: `${nextStatus} (${pkg.name} $${pkg.priceUsd}); matched ${matchingPool.length} verified v2/MCA consented records.`,
          approvalSent: 'Yes',
        });
        ctx.sameDayClaimedEmails.add(email);
        ctx.remainingGlobalEmails--;
        executedCount++;
        estimatedPipelineUSD += pkg.priceUsd;
        actions.push({
          agent: this.AGENT_NAME,
          recipientKey: `row-${inquiry.sheetRow}`,
          recipientEmail: email,
          actionType: touchStage,
          targetOffer: `${pkg.name} ($${pkg.priceUsd})`,
          expectedValueUSD: pkg.priceUsd,
          status: 'EXECUTED',
          provider: sendRes.provider,
          providerMessageId: sendRes.providerMessageId,
          subject,
          checkoutUrl,
          consentProof: `${matchingPool.length} verified v2+MCA records matched`,
        });
      } else {
        failedCount++;
        actions.push({
          agent: this.AGENT_NAME,
          recipientKey: `row-${inquiry.sheetRow}`,
          recipientEmail: email,
          actionType: 'PARTNER_PILOT_PROPOSAL',
          targetOffer: `${pkg.name} ($${pkg.priceUsd})`,
          expectedValueUSD: 0,
          status: 'FAILED',
          reason: sendRes.error || 'Provider rejected send',
        });
      }
    }

    return {
      agentName: this.AGENT_NAME,
      mode: ctx.mode,
      scannedCount: inquiries.length,
      eligibleCount,
      executedCount,
      skippedCount,
      blockedCount,
      failedCount,
      estimatedPipelineUSD,
      actions,
      notes,
    };
  }
}
