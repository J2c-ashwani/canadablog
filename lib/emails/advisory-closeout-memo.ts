/**
 * FSI Digital — "The Senior Advisory Closeout Memo" (Touch 3 Direct-Response Asset)
 * 
 * Styled as a personal, high-level advisory closeout memorandum from Founder Ashwani K.
 * Creates clean, respectful finality and loss aversion before archiving the file.
 * 
 * Strict CEO Directives:
 * - ZERO references to "AI", "algorithm", or "automated engine".
 * - Human advisory consultation tone.
 * - Dynamic product pricing ($19, $49, or $79) matching lead score.
 * - Outbound from funding.fsidigital.ca with direct reply to ashwani@fsidigital.ca.
 */

import { sendEmail, getFirstName, cleanRegionName, cleanIndustryName, cleanCompanyName, escapeHtml } from './mailer';
import { ProductOfferRecommendation, resolveRecommendedProduct } from './funding-leak-receipt';

export interface AdvisoryCloseoutMemoInput {
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

export function renderAdvisoryCloseoutMemoHtml({
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
  const cleanCompany = cleanCompanyName(companyName) || 'Your Company';
  const cleanProv = cleanRegionName(province);
  const cleanInd = cleanIndustryName(industry);
  const offer = productOffer || {
    productId: 'funding-match-report' as const,
    productName: 'Funding Match Report',
    price: '$19',
    priceAmount: 19,
    ctaText: 'Access Your Verified Audit ($19) →',
  };

  return `
    <div style="background-color: #f8fafc; padding: 40px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0;">
      <div style="max-width: 540px; margin: 0 auto; background-color: #ffffff; border-radius: 6px; padding: 36px 32px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <!-- Memo Header -->
        <div style="border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px;">
          <div style="font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 11px; font-weight: 700; color: #64748b; letter-spacing: 1px; text-transform: uppercase;">
            MEMORANDUM · INTAKE CLOSEOUT ADVISORY
          </div>
          <div style="font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 4px;">
            FSI Digital Senior Advisory Desk
          </div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px; font-family: ui-monospace, Menlo, Consolas, monospace;">
            FILE REF: AUD-${escapeHtml(referenceId)} · ${escapeHtml(dateFormatted)}
          </div>
        </div>

        <!-- Memo Content -->
        <div style="font-size: 14px; line-height: 1.6; color: #334155;">
          
          <p style="margin: 0 0 16px 0;">
            Hi ${escapeHtml(firstName)},
          </p>

          <p style="margin: 0 0 16px 0;">
            I am personally reviewing our senior advisory team's open file queue before our weekly intake cycle closes.
          </p>

          <p style="margin: 0 0 16px 0;">
            Earlier, our senior grant advisory team audited <strong>${escapeHtml(cleanCompany)}</strong>'s profile against active federal and provincial funding streams in <strong>${escapeHtml(cleanProv)}</strong>. We verified active programs matching your operational profile.
          </p>

          <p style="margin: 0 0 16px 0;">
            We have held your company's evaluation file active under temporary custody over the past week. However, because our advisory team can only support a limited volume of active applications each intake cycle, we are required to close out unreserved applicant files.
          </p>

          <p style="margin: 0 0 20px 0; font-weight: 700; color: #0f172a;">
            Your verified ${escapeHtml(offer.productName)} is currently prepared and locked under your profile for ${escapeHtml(offer.price)}.
          </p>

          <!-- Action Box -->
          <div style="background-color: #f1f5f9; border-left: 4px solid #0f172a; padding: 18px 20px; margin: 24px 0; border-radius: 4px;">
            <div style="font-weight: 700; font-size: 14px; color: #0f172a; margin-bottom: 6px;">
              Final Claim Window
            </div>
            <div style="font-size: 13px; color: #475569; margin-bottom: 14px;">
              Access your complete roadmap, eligible expense breakdowns, and government submission schedules before this file is archived:
            </div>
            <div>
              <a href="${escapeHtml(checkoutUrl)}"
                 style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 12px 22px; font-weight: 700; font-size: 13px; text-decoration: none; border-radius: 4px;">
                ${escapeHtml(offer.ctaText)}
              </a>
            </div>
          </div>

          <p style="margin: 0 0 16px 0; font-size: 13px; color: #64748b;">
            If you have decided not to pursue non-dilutive government capital this quarter, no action is needed—our team will quietly archive your record at the end of the week.
          </p>

          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 13px;">
            <div style="font-weight: 700; color: #0f172a;">Ashwani K</div>
            <div style="color: #64748b;">Founder & Senior Grant Advisor</div>
            <div style="color: #94a3b8; font-size: 12px;">FSI Digital · Toronto, Ontario</div>
            <div style="margin-top: 8px; font-size: 12px; color: #64748b;">
              Direct questions: <a href="mailto:ashwani@fsidigital.ca" style="color: #0f172a; text-decoration: underline;">ashwani@fsidigital.ca</a>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div style="margin-top: 32px; text-align: center; font-size: 11px; color: #94a3b8; line-height: 1.5;">
          FSI Digital · 250 Yonge St, Suite 2201, Toronto, ON M5B 2L7, Canada<br>
          <a href="${escapeHtml(unsubscribeUrl)}" style="color: #64748b; text-decoration: underline;">Unsubscribe from funding notifications</a>
        </div>

      </div>
    </div>
  `;
}

export function renderAdvisoryCloseoutMemoText({
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
  const cleanCompany = cleanCompanyName(companyName) || 'Your Company';
  const cleanProv = cleanRegionName(province);
  const offer = productOffer || {
    productId: 'funding-match-report' as const,
    productName: 'Funding Match Report',
    price: '$19',
    priceAmount: 19,
    ctaText: 'Access Your Verified Audit ($19) →',
  };

  return `MEMORANDUM · INTAKE CLOSEOUT ADVISORY
FSI Digital Senior Advisory Desk
FILE REF: AUD-${referenceId} · ${dateFormatted}
---------------------------------------------------------------

Hi ${firstName},

I am personally reviewing our senior advisory team's open file queue before our weekly intake cycle closes.

Earlier, our senior grant advisory team audited ${cleanCompany}'s profile against active federal and provincial funding streams in ${cleanProv}. We verified active programs matching your operational profile.

We have held your company's evaluation file active under temporary custody over the past week. However, because our advisory team can only support a limited volume of active applications each intake cycle, we are required to close out unreserved applicant files.

Your verified ${offer.productName} is currently prepared and locked under your profile for ${offer.price}.

Access your complete roadmap before this file is archived:
${checkoutUrl}

If you have decided not to pursue non-dilutive government capital this quarter, no action is needed—our team will quietly archive your record at the end of the week.

Ashwani K
Founder & Senior Grant Advisor
FSI Digital · Toronto, Ontario
Direct questions: ashwani@fsidigital.ca
`;
}

/**
 * Dispatches Touch 3: "The Senior Advisory Closeout Memo"
 */
export async function sendAdvisoryCloseoutMemoEmail({
  to,
  name,
  companyName,
  province,
  industry,
  verifiedMatchCount,
  loginToken,
  checkoutUrl,
  sourceCampaign = 'advisory_closeout_memo_touch3',
  productOffer,
  leadProfile,
}: AdvisoryCloseoutMemoInput) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);
  const tokenParam = loginToken && loginToken !== 'N/A' ? `token=${loginToken}&` : '';

  const resolvedOffer = productOffer || (leadProfile ? resolveRecommendedProduct(leadProfile) : {
    productId: 'funding-match-report' as const,
    productName: 'Funding Match Report',
    price: '$19',
    priceAmount: 19,
    ctaText: 'Access Your Verified Audit ($19) →',
  });

  const packageParam = resolvedOffer.productId === 'funding-bundle'
    ? 'package=complete-bundle&'
    : resolvedOffer.productId === 'funding-roadmap'
      ? 'package=action-plan&'
      : '';

  const finalCheckoutUrl = checkoutUrl ||
    `https://www.fsidigital.ca/calculator?${tokenParam}${packageParam}step=6&email=${encodeURIComponent(to)}&utm_source=email&utm_medium=closeout_memo&utm_campaign=${encodeURIComponent(sourceCampaign)}`;

  const unsubscribeUrl = loginToken && loginToken !== 'N/A'
    ? `https://www.fsidigital.ca/subscribe/unsubscribe?token=${encodeURIComponent(loginToken)}`
    : 'https://www.fsidigital.ca/subscribe/unsubscribe';

  // Deterministic short reference ID
  const emailHash = Math.abs(
    to.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
  ).toString(36).toUpperCase().padStart(6, '0').slice(0, 6);
  const referenceId = `AUD-${emailHash}`;

  const dateFormatted = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();

  const subject = cleanCompany
    ? `Final notice: closing ${cleanCompany}'s funding audit file`
    : `Final notice: closing your funding audit file`;

  const html = renderAdvisoryCloseoutMemoHtml({
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

  const text = renderAdvisoryCloseoutMemoText({
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
    tagType: 'advisory-closeout-memo',
    companyName: cleanCompany,
  });
}
