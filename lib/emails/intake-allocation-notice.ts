/**
 * FSI Digital — "Pre-Fiscal Intake Allocation Notice" (Touch 2 Direct-Response Asset)
 * 
 * Styled as an Official Treasury Courier Slip / Custody Allocation Record.
 * Creates credible urgency around government fiscal intake windows, expenditure caps,
 * and expiring temporary custody holds.
 * 
 * Strict CEO Directives:
 * - ZERO references to "AI", "algorithm", or "automated engine".
 * - All reviews attributed to "our senior grant advisory team".
 * - Dynamic product pricing ($19, $49, or $79) matching lead score.
 * - Outbound from funding.fsidigital.ca with direct reply to ashwani@fsidigital.ca.
 */

import { sendEmail, getFirstName, cleanRegionName, cleanIndustryName, cleanCompanyName, escapeHtml } from './mailer';
import { ProductOfferRecommendation, resolveRecommendedProduct } from './funding-leak-receipt';

export interface IntakeAllocationNoticeInput {
  to: string;
  name?: string;
  companyName?: string;
  province?: string;
  industry?: string;
  verifiedMatchCount?: number | null;
  loginToken?: string;
  checkoutUrl?: string;
  sourceCampaign?: string;
  productOffer?: ProductOfferRecommendation;
  leadProfile?: {
    score?: number;
    readinessScore?: number;
    fundingAmount?: string;
    annualRevenue?: string;
    industry?: string;
    tier?: string;
  };
}

export function renderIntakeAllocationNoticeHtml({
  firstName,
  companyName,
  province,
  industry,
  verifiedMatchCount,
  checkoutUrl,
  unsubscribeUrl,
  referenceId,
  dateFormatted,
  productOffer,
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
  productOffer?: ProductOfferRecommendation;
}): string {
  const cleanFirst = getFirstName(firstName);
  const cleanCompany = cleanCompanyName(companyName) || 'Your Enterprise';
  const cleanProv = cleanRegionName(province);
  const cleanInd = cleanIndustryName(industry);
  const displayContact = cleanFirst && cleanFirst !== 'Founder' ? cleanFirst : 'Executive Leadership';
  const greeting = cleanFirst && cleanFirst !== 'Founder'
    ? `To ${escapeHtml(cleanFirst)} and the Executive Team at ${escapeHtml(cleanCompany)}:`
    : `To the Executive Leadership Team at ${escapeHtml(cleanCompany)}:`;
  const offer = productOffer || {
    productId: 'funding-match-report' as const,
    productName: 'Funding Match Report',
    price: '$19',
    priceAmount: 19,
    ctaText: 'Claim Your Allocation Roadmap ($19) →',
  };

  const hasGenuineMatches = typeof verifiedMatchCount === 'number' && verifiedMatchCount > 0;
  const matchRowHtml = hasGenuineMatches ? `
    <tr style="border-bottom: 1px dashed #cbd5e1;">
      <td style="padding: 10px 0; color: #475569; font-weight: 600;">ACTIVE INTAKE MATCHES</td>
      <td style="padding: 10px 0; text-align: right; color: #0284c7; font-weight: 700;">${verifiedMatchCount} Verified Programs</td>
    </tr>
  ` : '';

  return `
    <div style="background-color: #0b1120; padding: 40px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0;">
      <div style="max-width: 550px; margin: 0 auto;">
        
        <!-- Official Treasury Courier Slip Artifact -->
        <div style="background-color: #ffffff; border-radius: 4px; padding: 32px 28px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); border-top: 5px solid #0284c7; border-bottom: 3px solid #cbd5e1;">
          
          <div style="font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'Courier New', monospace; color: #0f172a; font-size: 13px; line-height: 1.5;">
            
            <!-- Slip Header -->
            <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #0f172a; padding-bottom: 14px;">
              <div style="font-weight: 900; font-size: 14px; letter-spacing: 1px; color: #0f172a;">
                GOVERNMENT CAPITAL ALLOCATION DESK
              </div>
              <div style="font-size: 11px; font-weight: 700; color: #0369a1; margin-top: 3px; letter-spacing: 0.5px;">
                FSI DIGITAL SENIOR GRANT ADVISORY SERVICE
              </div>
              <div style="font-size: 11px; color: #64748b; margin-top: 4px;">
                PRE-FISCAL INTAKE ALLOCATION NOTICE · DOCKET: ALLOC-${escapeHtml(referenceId)}
              </div>
            </div>

            <!-- Custody Status Badge -->
            <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-left: 4px solid #0284c7; padding: 10px 14px; margin-bottom: 20px; border-radius: 2px;">
              <div style="font-size: 10px; font-weight: 700; color: #0369a1; letter-spacing: 0.5px;">
                STATUS: TEMPORARY CUSTODY HOLD — PENDING CLAIM
              </div>
              <div style="font-size: 11px; color: #334155; margin-top: 2px;">
                Intake Allocation Window: Active through ${escapeHtml(dateFormatted)}
              </div>
            </div>

            <!-- Enterprise Metadata Table -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px;">
              <tr style="border-bottom: 1px dashed #cbd5e1;">
                <td style="padding: 8px 0; color: #64748b; text-transform: uppercase;">RECIPIENT ENTERPRISE</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #0f172a;">${escapeHtml(cleanCompany)}</td>
              </tr>
              <tr style="border-bottom: 1px dashed #cbd5e1;">
                <td style="padding: 8px 0; color: #64748b; text-transform: uppercase;">DESIGNATED CONTACT</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #0f172a;">${escapeHtml(displayContact)}</td>
              </tr>
              <tr style="border-bottom: 1px dashed #cbd5e1;">
                <td style="padding: 8px 0; color: #64748b; text-transform: uppercase;">JURISDICTION</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #0f172a;">${escapeHtml(cleanProv)}</td>
              </tr>
              <tr style="border-bottom: 1px dashed #cbd5e1;">
                <td style="padding: 8px 0; color: #64748b; text-transform: uppercase;">INDUSTRY CLASSIFICATION</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #0f172a;">${escapeHtml(cleanInd)}</td>
              </tr>
              ${matchRowHtml}
              <tr style="border-bottom: 2px solid #0f172a;">
                <td style="padding: 10px 0; color: #0f172a; font-weight: 700;">VERIFIED ADVISORY PRODUCT</td>
                <td style="padding: 10px 0; text-align: right; font-weight: 900; color: #0f172a;">${escapeHtml(offer.productName)} (${escapeHtml(offer.price)})</td>
              </tr>
            </table>

          </div>

          <!-- Official Advisory Notice Body -->
          <div style="font-size: 13px; line-height: 1.6; color: #334155; margin-top: 16px;">
            <p style="margin: 0 0 14px 0; font-weight: 600; color: #0f172a;">
              ${greeting}
            </p>
            <p style="margin: 0 0 14px 0;">
              Our senior grant advisory team personally audited your company's profile against active federal and provincial capital pools to establish your application roadmap and eligible expenditure baseline.
            </p>
            <p style="margin: 0 0 14px 0;">
              Because government non-dilutive programs enforce strict fiscal intake caps and finite budget allocations, eligible capital cannot be reserved indefinitely. Your company's verified application roadmap remains held under temporary custody.
            </p>
            <p style="margin: 0 0 20px 0; font-weight: 700; color: #0f172a;">
              Your verified ${escapeHtml(offer.productName)} is prepared and locked under your company profile for ${escapeHtml(offer.price)}.
            </p>

            <!-- Call to Action Button -->
            <div style="text-align: left; margin: 24px 0;">
              <a href="${escapeHtml(checkoutUrl)}"
                 style="display: inline-block; background-color: #0284c7; color: #ffffff; padding: 13px 24px; font-weight: 700; font-size: 13px; text-decoration: none; border-radius: 4px; letter-spacing: 0.3px;">
                ${escapeHtml(offer.ctaText)}
              </a>
            </div>

            <!-- Cautionary Note on Allocation Release -->
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 14px; border-radius: 4px; font-size: 11px; color: #64748b; margin-top: 24px; line-height: 1.5;">
              <strong style="color: #475569;">NOTICE OF CUSTODY TIMELINE:</strong>
              If this file remains unclaimed within 72 hours of this notice, your temporary allocation hold will be released back to the regional candidate pool and your company record will be flagged for archival.
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
              <div style="font-weight: 700; color: #0f172a;">Ashwani K</div>
              <div>Senior Grant Advisory Team · FSI Digital</div>
              <div style="margin-top: 4px; font-size: 11px; color: #94a3b8;">
                Direct questions or inquiries to: <a href="mailto:ashwani@fsidigital.ca" style="color: #0284c7; text-decoration: none;">ashwani@fsidigital.ca</a>
              </div>
            </div>

          </div>

        </div>

        <!-- Footer / CASL Compliance -->
        <div style="text-align: center; margin-top: 24px; font-size: 11px; color: #64748b; line-height: 1.5;">
          FSI Digital · 250 Yonge St, Suite 2201, Toronto, ON M5B 2L7, Canada<br>
          You received this allocation notice because an evaluation was initiated for ${escapeHtml(cleanCompany)}.<br>
          <a href="${escapeHtml(unsubscribeUrl)}" style="color: #94a3b8; text-decoration: underline;">Unsubscribe from capital allocation alerts</a>
        </div>

      </div>
    </div>
  `;
}

export function renderIntakeAllocationNoticeText({
  firstName,
  companyName,
  province,
  industry,
  verifiedMatchCount,
  checkoutUrl,
  referenceId,
  dateFormatted,
  productOffer,
}: {
  firstName: string;
  companyName?: string;
  province?: string;
  industry?: string;
  verifiedMatchCount?: number | null;
  checkoutUrl: string;
  referenceId: string;
  dateFormatted: string;
  productOffer?: ProductOfferRecommendation;
}): string {
  const cleanFirst = getFirstName(firstName);
  const cleanCompany = cleanCompanyName(companyName) || 'Your Enterprise';
  const cleanProv = cleanRegionName(province);
  const cleanInd = cleanIndustryName(industry);
  const displayContact = cleanFirst && cleanFirst !== 'Founder' ? cleanFirst : 'Executive Leadership';
  const greeting = cleanFirst && cleanFirst !== 'Founder'
    ? `To ${cleanFirst} and the Executive Team at ${cleanCompany}:`
    : `To the Executive Leadership Team at ${cleanCompany}:`;
  const offer = productOffer || {
    productId: 'funding-match-report' as const,
    productName: 'Funding Match Report',
    price: '$19',
    priceAmount: 19,
    ctaText: 'Claim Your Allocation Roadmap ($19) →',
  };

  return `GOVERNMENT CAPITAL ALLOCATION DESK · FSI DIGITAL
PRE-FISCAL INTAKE ALLOCATION NOTICE · DOCKET: ALLOC-${referenceId}
STATUS: TEMPORARY CUSTODY HOLD — PENDING CLAIM
DATE: ${dateFormatted}
---------------------------------------------------------------
RECIPIENT ENTERPRISE:    ${cleanCompany}
DESIGNATED CONTACT:      ${displayContact}
JURISDICTION:            ${cleanProv}
INDUSTRY CLASSIFICATION: ${cleanInd}
${verifiedMatchCount ? `ACTIVE INTAKE MATCHES:   ${verifiedMatchCount} Verified Programs\n` : ''}VERIFIED ADVISORY PRODUCT: ${offer.productName} (${offer.price})
---------------------------------------------------------------

${greeting}

Our senior grant advisory team personally audited your company's profile against active federal and provincial capital pools to establish your application roadmap and eligible expenditure baseline.

Because government non-dilutive programs enforce strict fiscal intake caps and finite budget allocations, eligible capital cannot be reserved indefinitely. Your company's verified application roadmap remains held under temporary custody.

Your verified ${offer.productName} is prepared and locked under your company profile for ${offer.price}.

Claim your allocation roadmap here:
${checkoutUrl}

NOTICE OF CUSTODY TIMELINE:
If this file remains unclaimed within 72 hours of this notice, your temporary allocation hold will be released back to the regional candidate pool and your company record will be flagged for archival.

Ashwani K
Senior Grant Advisory Team · FSI Digital
Direct inquiries to: ashwani@fsidigital.ca
`;
}

/**
 * Dispatches Touch 2: "Pre-Fiscal Intake Allocation Notice"
 */
export async function sendIntakeAllocationNoticeEmail({
  to,
  name,
  companyName,
  province,
  industry,
  verifiedMatchCount,
  loginToken,
  checkoutUrl,
  sourceCampaign = 'intake_allocation_notice_touch2',
  productOffer,
  leadProfile,
}: IntakeAllocationNoticeInput) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);
  const tokenParam = loginToken && loginToken !== 'N/A' ? `token=${loginToken}&` : '';

  const resolvedOffer = productOffer || (leadProfile ? resolveRecommendedProduct(leadProfile) : {
    productId: 'funding-match-report' as const,
    productName: 'Funding Match Report',
    price: '$19',
    priceAmount: 19,
    ctaText: 'Claim Your Allocation Roadmap ($19) →',
  });

  const packageParam = resolvedOffer.productId === 'funding-bundle'
    ? 'package=complete-bundle&'
    : resolvedOffer.productId === 'funding-roadmap'
      ? 'package=action-plan&'
      : '';

  const finalCheckoutUrl = checkoutUrl ||
    `https://www.fsidigital.ca/calculator?${tokenParam}${packageParam}step=6&email=${encodeURIComponent(to)}&utm_source=email&utm_medium=courier_slip&utm_campaign=${encodeURIComponent(sourceCampaign)}`;

  const unsubscribeUrl = loginToken && loginToken !== 'N/A'
    ? `https://www.fsidigital.ca/subscribe/unsubscribe?token=${encodeURIComponent(loginToken)}`
    : 'https://www.fsidigital.ca/subscribe/unsubscribe';

  // Deterministic short reference ID
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
    ? `ALLOCATION NOTICE: Preliminary capital lock for ${cleanCompany} [File Ref: ${referenceId}]`
    : `ALLOCATION NOTICE: Preliminary capital lock [File Ref: ${referenceId}]`;

  const html = renderIntakeAllocationNoticeHtml({
    firstName,
    companyName: cleanCompany,
    province,
    industry,
    verifiedMatchCount,
    checkoutUrl: finalCheckoutUrl,
    unsubscribeUrl,
    referenceId,
    dateFormatted,
    productOffer: resolvedOffer,
  });

  const text = renderIntakeAllocationNoticeText({
    firstName,
    companyName: cleanCompany,
    province,
    industry,
    verifiedMatchCount,
    checkoutUrl: finalCheckoutUrl,
    referenceId,
    dateFormatted,
    productOffer: resolvedOffer,
  });

  return sendEmail({
    to,
    subject,
    html,
    text,
    tagType: 'intake-allocation-notice',
    companyName: cleanCompany,
  });
}
