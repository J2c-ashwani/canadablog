import { sendEmail, getFirstName, cleanCompanyName } from "./mailer";

export interface SalesBlastParams {
  to: string;
  name?: string;
  companyName?: string;
  region?: string;
  industry?: string;
  loginToken?: string;
}

// ── Wave 1: Monday — Personal Founder Follow-up (Plain Text Style) ──
export async function sendSalesBlast1({
  to,
  name,
  companyName,
  region,
  industry,
  loginToken
}: SalesBlastParams) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);
  const regionLabel = region && region !== 'N/A' && region.toLowerCase() !== 'n/a' ? region : '';
  const industryLabel = industry && industry !== 'N/A' && industry.toLowerCase() !== 'other' && industry.toLowerCase() !== 'n/a' ? industry : '';

  const reportUrl = `https://www.fsidigital.ca/products/funding-match-report?email=${encodeURIComponent(to)}&source=august_blast`;
  const calculatorUrl = `https://www.fsidigital.ca/calculator?email=${encodeURIComponent(to)}&source=august_blast`;
  const dashboardUrl = loginToken
    ? `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=august_blast`
    : calculatorUrl;

  // Build the regional/industry context line
  let contextLine = '';
  if (regionLabel && industryLabel) {
    contextLine = `, along with estimated funding opportunities for ${industryLabel} businesses in ${regionLabel}`;
  } else if (regionLabel) {
    contextLine = `, along with estimated funding opportunities in ${regionLabel}`;
  } else if (industryLabel) {
    contextLine = `, along with estimated funding opportunities for ${industryLabel} businesses`;
  } else {
    contextLine = `, along with estimated funding opportunities`;
  }

  // Plain-text founder email style — looks like a personal Gmail message
  const html = `
    <div style="background-color:#ffffff;padding:32px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;max-width:580px;margin:0 auto;">
      
      <div style="font-size:15px;color:#1a1a1a;line-height:1.7;text-align:left;">
        <p style="margin:0 0 16px 0;">Hi ${firstName},</p>
        
        <p style="margin:0 0 16px 0;">
          I noticed you completed our funding eligibility check recently but didn't have a chance to access your personalized report.
        </p>

        <p style="margin:0 0 16px 0;">
          I just wanted to let you know it's still available if you're continuing your funding search.
        </p>

        <p style="margin:0 0 16px 0;">
          Most founders who use our eligibility checker are trying to answer one simple question: <em>"Which funding programs are actually relevant for my business?"</em>
        </p>

        <p style="margin:0 0 16px 0;">
          That's exactly what your personalized report is designed to help with. It summarizes the programs that may be relevant based on the information you entered${contextLine}, and suggested next steps.
        </p>

        <p style="margin:0 0 6px 0;font-weight:600;color:#1a1a1a;">Your report includes:</p>
        <p style="margin:0 0 4px 0;color:#1a1a1a;">✅ Programs matched to your business</p>
        <p style="margin:0 0 4px 0;color:#1a1a1a;">✅ Estimated funding opportunities</p>
        <p style="margin:0 0 4px 0;color:#1a1a1a;">✅ Application requirements</p>
        <p style="margin:0 0 16px 0;color:#1a1a1a;">✅ Suggested next steps</p>

        <div style="text-align:center;margin:28px 0;">
          <a href="${reportUrl}" style="background-color:#059669;color:white;padding:13px 26px;text-decoration:none;border-radius:6px;font-weight:600;display:inline-block;font-size:14px;">
            Access Your Report ($19) &rarr;
          </a>
        </div>

        <p style="margin:16px 0 16px 0;font-size:13px;color:#6b7280;">
          Already purchased by Canadian founders looking for technology funding, manufacturing expansion, clean technology, and R&D programs.
        </p>

        <p style="margin:0 0 16px 0;">
          If you've decided not to pursue funding right now, no worries at all.
        </p>

        <p style="margin:0 0 16px 0;">
          If you have any questions, simply reply to this email.
        </p>

        <p style="margin:0 0 4px 0;">Thanks,</p>
        <p style="margin:0 0 2px 0;font-weight:600;">Ashwani K</p>
        <p style="margin:0;font-size:13px;color:#6b7280;">Founder<br/>FSI Digital</p>
      </div>

    </div>
  `;

  const text = `Hi ${firstName},\n\nI noticed you completed our funding eligibility check recently but didn't have a chance to access your personalized report.\n\nI just wanted to let you know it's still available if you're continuing your funding search.\n\nMost founders who use our eligibility checker are trying to answer one simple question: "Which funding programs are actually relevant for my business?"\n\nThat's exactly what your personalized report is designed to help with. It summarizes the programs that may be relevant based on the information you entered${contextLine}, and suggested next steps.\n\nYour report includes:\n✅ Programs matched to your business\n✅ Estimated funding opportunities\n✅ Application requirements\n✅ Suggested next steps\n\nAccess Your Report ($19): ${reportUrl}\n\nAlready purchased by Canadian founders looking for technology funding, manufacturing expansion, clean technology, and R&D programs.\n\nIf you've decided not to pursue funding right now, no worries at all.\n\nIf you have any questions, simply reply to this email.\n\nThanks,\nAshwani K\nFounder\nFSI Digital`;

  return sendEmail({
    to,
    subject: `${firstName}, I noticed you never downloaded your funding matches`,
    html,
    text,
    tagType: 'sales-blast-august-1',
    companyName: cleanCompany
  });
}

// ── Wave 2: Wednesday Follow-up (Non-openers) ──
export async function sendSalesBlast2({
  to,
  name,
  companyName,
  region,
  industry,
  loginToken
}: SalesBlastParams) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);

  const reportUrl = `https://www.fsidigital.ca/products/funding-match-report?email=${encodeURIComponent(to)}&source=august_blast_2`;
  const bundleUrl = `https://www.fsidigital.ca/products/action-plan?email=${encodeURIComponent(to)}&source=august_blast_2`;

  const html = `
    <div style="background-color:#ffffff;padding:32px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;max-width:580px;margin:0 auto;">
      
      <div style="font-size:15px;color:#1a1a1a;line-height:1.7;text-align:left;">
        <p style="margin:0 0 16px 0;">Hi ${firstName},</p>
        
        <p style="margin:0 0 16px 0;">
          Quick follow-up — I sent you a note on Monday about your funding eligibility results${cleanCompany !== 'your business' ? ` for <strong>${cleanCompany}</strong>` : ''}. Just wanted to make sure it didn't get buried.
        </p>

        <p style="margin:0 0 16px 0;">
          If you're still exploring funding options, your personalized report is ready to access. It takes about 2 minutes to review and shows you exactly which programs may be relevant for your business.
        </p>

        <div style="text-align:center;margin:28px 0;">
          <a href="${reportUrl}" style="background-color:#059669;color:white;padding:13px 26px;text-decoration:none;border-radius:6px;font-weight:600;display:inline-block;font-size:14px;">
            Access Your Report ($19) &rarr;
          </a>
        </div>

        <p style="margin:16px 0 16px 0;font-size:13px;color:#6b7280;">
          If you'd also like a step-by-step application timeline showing which programs to apply for first, the <a href="${bundleUrl}" style="color:#059669;">Funding Action Plan ($49)</a> includes your match report plus a prioritized Month 1–4 roadmap.
        </p>

        <p style="margin:0 0 16px 0;">
          Either way, no pressure. If you have questions, just reply.
        </p>

        <p style="margin:0 0 4px 0;">Thanks,</p>
        <p style="margin:0 0 2px 0;font-weight:600;">Ashwani K</p>
        <p style="margin:0;font-size:13px;color:#6b7280;">Founder<br/>FSI Digital</p>
      </div>

    </div>
  `;

  const text = `Hi ${firstName},\n\nQuick follow-up — I sent you a note on Monday about your funding eligibility results${cleanCompany !== 'your business' ? ` for ${cleanCompany}` : ''}. Just wanted to make sure it didn't get buried.\n\nIf you're still exploring funding options, your personalized report is ready to access. It takes about 2 minutes to review and shows you exactly which programs may be relevant for your business.\n\nAccess Your Report ($19): ${reportUrl}\n\nIf you'd also like a step-by-step application timeline, the Funding Action Plan ($49) includes your match report plus a prioritized Month 1-4 roadmap: ${bundleUrl}\n\nEither way, no pressure. If you have questions, just reply.\n\nThanks,\nAshwani K\nFounder\nFSI Digital`;

  return sendEmail({
    to,
    subject: `Quick follow-up about your funding search`,
    html,
    text,
    tagType: 'sales-blast-august-2',
    companyName: cleanCompany
  });
}
