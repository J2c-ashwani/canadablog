/**
 * FSI Digital — "The Funding Leak Receipt" Direct-Response Creative Engine
 * 
 * Turns an invisible financial problem into a tangible object: a deliberately designed
 * receipt artifact with the sales pitch stripped away.
 * 
 * Critical Implementation Rule (per CEO Directives):
 * {{verifiedMatchCount}} MUST be populated from genuine program-matching data.
 * If data is not available or unverified, the row is strictly removed.
 */

import { sendEmail, getFirstName, cleanRegionName, cleanIndustryName, cleanCompanyName, escapeHtml } from './mailer';

export interface FundingLeakReceiptInput {
  to: string;
  name?: string;
  companyName?: string;
  province?: string;
  industry?: string;
  verifiedMatchCount?: number | null;
  loginToken?: string;
  checkoutUrl?: string;
  sourceCampaign?: string;
}

export function renderFundingLeakReceiptHtml({
  firstName,
  companyName,
  province,
  industry,
  verifiedMatchCount,
  checkoutUrl,
  unsubscribeUrl,
  referenceId,
  dateFormatted,
}: {
  firstName: string;
  companyName?: string;
  province?: string;
  industry?: string;
  verifiedMatchCount?: number | null;
  checkoutUrl: string;
  unsubscribeUrl: string;
  referenceId: string;
  dateFormatted: string;
}): string {
  const cleanCompany = cleanCompanyName(companyName) || 'Your Company';
  const cleanProv = cleanRegionName(province);
  const cleanInd = cleanIndustryName(industry);

  // Strict Rule: verifiedMatchCount MUST come from genuine matching data.
  // If not provided or <= 0, the row is completely removed.
  const hasGenuineMatches = typeof verifiedMatchCount === 'number' && verifiedMatchCount > 0;
  const matchRowHtml = hasGenuineMatches ? `
    <tr style="border-bottom: 1px dashed #e2e8f0;">
      <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">Potential funding programs</td>
      <td style="padding: 8px 0; text-align: right; color: #059669; font-weight: 700;">${verifiedMatchCount} to investigate</td>
    </tr>
  ` : '';

  return `
    <div style="background-color: #0f172a; padding: 40px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0;">
      <div style="max-width: 540px; margin: 0 auto;">
        
        <!-- The Physical Receipt Artifact -->
        <div style="background-color: #ffffff; border-radius: 6px; padding: 32px 28px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.4), 0 8px 10px -6px rgba(0,0,0,0.3); border-top: 4px solid #10b981;">
          
          <div style="font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'Courier New', monospace; color: #0f172a; font-size: 13px; line-height: 1.5;">
            
            <!-- Receipt Header -->
            <div style="text-align: center; margin-bottom: 16px;">
              <div style="font-weight: 900; font-size: 15px; letter-spacing: 0.5px; color: #0f172a;">
                FSI DIGITAL — THE FUNDING LEAK RECEIPT
              </div>
              <div style="font-size: 11px; color: #64748b; margin-top: 4px;">
                CAPITAL INTELLIGENCE AUDIT · REF: ${escapeHtml(referenceId)}
              </div>
              <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">
                DATE: ${escapeHtml(dateFormatted)}
              </div>
            </div>

            <!-- Receipt Divider -->
            <div style="border-top: 1px dashed #cbd5e1; margin: 16px 0;"></div>

            <!-- Receipt Metadata -->
            <table style="width: 100%; font-family: inherit; font-size: 12.5px; border-collapse: collapse; margin-bottom: 8px;">
              <tr>
                <td style="color: #64748b; padding: 3px 0; width: 35%;">BUSINESS:</td>
                <td style="text-align: right; font-weight: 700; color: #0f172a; padding: 3px 0;">${escapeHtml(cleanCompany)}</td>
              </tr>
              <tr>
                <td style="color: #64748b; padding: 3px 0;">INDUSTRY:</td>
                <td style="text-align: right; font-weight: 700; color: #0f172a; padding: 3px 0;">${escapeHtml(cleanInd)}</td>
              </tr>
              <tr>
                <td style="color: #64748b; padding: 3px 0;">REGION:</td>
                <td style="text-align: right; font-weight: 700; color: #0f172a; padding: 3px 0;">${escapeHtml(cleanProv)}</td>
              </tr>
            </table>

            <!-- Receipt Divider -->
            <div style="border-top: 1px dashed #cbd5e1; margin: 14px 0 10px 0;"></div>

            <!-- Receipt Line Items Table -->
            <table style="width: 100%; font-family: inherit; font-size: 12.5px; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 1px solid #0f172a;">
                  <th style="text-align: left; padding: 6px 0; font-weight: 800; color: #0f172a; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px;">THE LINE ITEM</th>
                  <th style="text-align: right; padding: 6px 0; font-weight: 800; color: #0f172a; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px;">THE STATUS</th>
                </tr>
              </thead>
              <tbody>
                ${matchRowHtml}
                <tr style="border-bottom: 1px dashed #f1f5f9;">
                  <td style="padding: 8px 0; color: #334155;">Eligible expenses</td>
                  <td style="padding: 8px 0; text-align: right; color: #64748b;">Depends on each program</td>
                </tr>
                <tr style="border-bottom: 1px dashed #f1f5f9;">
                  <td style="padding: 8px 0; color: #334155;">Application deadlines</td>
                  <td style="padding: 8px 0; text-align: right; color: #64748b;">Check program-specific dates</td>
                </tr>
                <tr style="border-bottom: 1px dashed #f1f5f9;">
                  <td style="padding: 8px 0; color: #334155;">Funding approved</td>
                  <td style="padding: 8px 0; text-align: right; color: #e11d48; font-weight: 700;">Not established</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #334155;">Money lost by not applying</td>
                  <td style="padding: 8px 0; text-align: right; color: #e11d48; font-weight: 700;">UNKNOWN</td>
                </tr>
              </tbody>
            </table>

            <!-- Heavy Ruled Total Block with Prominent Question Mark -->
            <div style="border-top: 2px solid #0f172a; border-bottom: 2px solid #0f172a; padding: 12px 0; margin: 18px 0 8px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: middle; font-size: 13px; font-weight: 900; color: #0f172a; letter-spacing: 0.5px;">
                    TOTAL FUNDING LEFT UNCHECKED:
                  </td>
                  <td style="vertical-align: middle; text-align: right; font-size: 26px; font-weight: 900; color: #0f172a;">
                    ?
                  </td>
                </tr>
              </table>
            </div>

            <div style="text-align: center; font-size: 10px; color: #94a3b8; letter-spacing: 2px; margin-top: 14px;">
              * * * END OF RECEIPT * * *
            </div>

          </div>

          <!-- Narrative Copy (Stripped-Down Direct Response) -->
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.65; color: #1e293b; margin-top: 28px; border-top: 1px solid #f1f5f9; padding-top: 24px;">
            <p style="margin: 0 0 16px 0; font-size: 17px; font-weight: 800; color: #0f172a;">
              That question mark is the entire point.
            </p>
            <p style="margin: 0 0 16px 0;">
              We could put a big dollar figure here. It would probably look impressive.
            </p>
            <p style="margin: 0 0 16px 0;">
              But a program's maximum award isn't the amount your company will receive. And a potential match isn't an approval.
            </p>
            <p style="margin: 0 0 16px 0;">
              So we leave the number blank until there's evidence worth investigating.
            </p>
            <p style="margin: 0 0 16px 0;">
              FSI Digital helps businesses identify potentially relevant funding programs, understand their requirements and find the next application steps.
            </p>
            <p style="margin: 0 0 20px 0; font-size: 16px; font-weight: 700; color: #0f172a;">
              Your Funding Match Report is $19.
            </p>

            <div style="text-align: left; margin: 24px 0;">
              <a href="${checkoutUrl}" style="background-color: #059669; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; display: inline-block; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(5,150,105,0.25);">
                See the Funding Match Report &rarr;
              </a>
            </div>

            <!-- Signoff -->
            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9; font-size: 14px; color: #475569; line-height: 1.5;">
              <strong style="color: #0f172a;">Ashwani K</strong><br/>
              <span style="color: #64748b; font-size: 13px;">Founder, FSI Digital</span>
            </div>

          </div>

        </div>

        <!-- Footer / Unsubscribe -->
        <div style="margin-top: 24px; text-align: center; font-size: 11px; color: #64748b; line-height: 1.5;">
          This audit memorandum was sent to your registered founder profile.<br>
          <a href="${unsubscribeUrl}" style="color: #94a3b8; text-decoration: underline; margin-top: 6px; display: inline-block;">Unsubscribe from funding alerts</a>
        </div>

      </div>
    </div>
  `;
}

export function renderFundingLeakReceiptText({
  companyName,
  province,
  industry,
  verifiedMatchCount,
  checkoutUrl,
}: {
  companyName?: string;
  province?: string;
  industry?: string;
  verifiedMatchCount?: number | null;
  checkoutUrl: string;
}): string {
  const cleanCompany = cleanCompanyName(companyName) || 'Your Company';
  const cleanProv = cleanRegionName(province);
  const cleanInd = cleanIndustryName(industry);

  const hasGenuineMatches = typeof verifiedMatchCount === 'number' && verifiedMatchCount > 0;
  const matchRowText = hasGenuineMatches
    ? `Potential funding programs        ${verifiedMatchCount} to investigate\n`
    : '';

  return `FSI DIGITAL — THE FUNDING LEAK RECEIPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUSINESS: ${cleanCompany}
INDUSTRY: ${cleanInd}
REGION:   ${cleanProv}

THE LINE ITEM                     THE STATUS
────────────────────────────────────────
${matchRowText}Eligible expenses                 Depends on each program
Application deadlines             Check program-specific dates
Funding approved                  Not established
Money lost by not applying        UNKNOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL FUNDING LEFT UNCHECKED: ?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

That question mark is the entire point.

We could put a big dollar figure here. It would probably look impressive.
But a program's maximum award isn't the amount your company will receive. And a potential match isn't an approval.

So we leave the number blank until there's evidence worth investigating.

FSI Digital helps businesses identify potentially relevant funding programs, understand their requirements and find the next application steps.

Your Funding Match Report is $19.

See the Funding Match Report →
${checkoutUrl}

Ashwani K
Founder, FSI Digital`;
}

/**
 * Dispatches "The Funding Leak Receipt" email
 */
export async function sendFundingLeakReceiptEmail({
  to,
  name,
  companyName,
  province,
  industry,
  verifiedMatchCount,
  loginToken,
  checkoutUrl,
  sourceCampaign = 'funding_leak_receipt',
}: FundingLeakReceiptInput) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);
  const tokenParam = loginToken && loginToken !== 'N/A' ? `token=${loginToken}&` : '';

  const finalCheckoutUrl = checkoutUrl ||
    `https://www.fsidigital.ca/calculator?${tokenParam}step=6&email=${encodeURIComponent(to)}&utm_source=email&utm_medium=receipt&utm_campaign=${encodeURIComponent(sourceCampaign)}`;

  const unsubscribeUrl = loginToken && loginToken !== 'N/A'
    ? `https://www.fsidigital.ca/subscribe/unsubscribe?token=${encodeURIComponent(loginToken)}`
    : 'https://www.fsidigital.ca/subscribe/unsubscribe';

  // Deterministic short reference ID for the receipt
  const emailHash = Math.abs(
    to.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
  ).toString(36).toUpperCase().padStart(6, '0').slice(0, 6);
  const referenceId = `FLR-${emailHash}`;

  const dateFormatted = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();

  const subject = cleanCompany
    ? `The Funding Leak Receipt for ${cleanCompany}`
    : `The Funding Leak Receipt`;

  const html = renderFundingLeakReceiptHtml({
    firstName,
    companyName: cleanCompany,
    province,
    industry,
    verifiedMatchCount,
    checkoutUrl: finalCheckoutUrl,
    unsubscribeUrl,
    referenceId,
    dateFormatted,
  });

  const text = renderFundingLeakReceiptText({
    companyName: cleanCompany,
    province,
    industry,
    verifiedMatchCount,
    checkoutUrl: finalCheckoutUrl,
  });

  return sendEmail({
    to,
    subject,
    html,
    text,
    tagType: 'funding-leak-receipt',
    companyName: cleanCompany
  });
}
