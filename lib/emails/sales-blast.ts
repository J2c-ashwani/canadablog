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
          If you're still exploring funding opportunities for your business, your report is still available whenever you're ready.
        </p>

        <p style="margin:0 0 16px 0;">
          Most founders use our eligibility checker because they're trying to answer one question: <em><strong>"Which funding programs are actually relevant for my business?"</strong></em>
        </p>

        <p style="margin:0 0 16px 0;">
          Based on the information you entered, your report highlights funding programs that may be relevant to your business, outlines the application requirements, and suggests practical next steps to help you move forward.
        </p>

        <p style="margin:0 0 6px 0;font-weight:600;color:#1a1a1a;">Your report includes:</p>
        <p style="margin:0 0 4px 0;color:#1a1a1a;">✅ Programs matched to your business</p>
        <p style="margin:0 0 4px 0;color:#1a1a1a;">✅ Estimated funding opportunities</p>
        <p style="margin:0 0 4px 0;color:#1a1a1a;">✅ Application requirements</p>
        <p style="margin:0 0 16px 0;color:#1a1a1a;">✅ Suggested next steps</p>

        <p style="margin:0 0 16px 0;">
          There's no rush—your report will be available whenever you're ready.
        </p>

        <div style="text-align:center;margin:28px 0;">
          <a href="${reportUrl}" style="background-color:#059669;color:white;padding:13px 26px;text-decoration:none;border-radius:6px;font-weight:600;display:inline-block;font-size:14px;">
            View My Funding Match Report ($19)
          </a>
        </div>

        <p style="margin:0 0 16px 0;">
          If you have any questions, just reply to this email. I'll be happy to help.
        </p>

        <p style="margin:0 0 4px 0;">Thanks,</p>
        <p style="margin:0 0 2px 0;font-weight:600;">Ashwani K</p>
        <p style="margin:0;font-size:13px;color:#6b7280;">Founder<br/>FSI Digital</p>
      </div>

    </div>
  `;

  const text = `Hi ${firstName},\n\nI noticed you completed our funding eligibility check recently but didn't have a chance to access your personalized report.\n\nIf you're still exploring funding opportunities for your business, your report is still available whenever you're ready.\n\nMost founders use our eligibility checker because they're trying to answer one question: "Which funding programs are actually relevant for my business?"\n\nBased on the information you entered, your report highlights funding programs that may be relevant to your business, outlines the application requirements, and suggests practical next steps to help you move forward.\n\nYour report includes:\n✅ Programs matched to your business\n✅ Estimated funding opportunities\n✅ Application requirements\n✅ Suggested next steps\n\nThere's no rush—your report will be available whenever you're ready.\n\nView My Funding Match Report ($19): ${reportUrl}\n\nIf you have any questions, just reply to this email. I'll be happy to help.\n\nThanks,\nAshwani K\nFounder\nFSI Digital`;


  return sendEmail({
    to,
    subject: `${firstName}, I noticed you never downloaded your funding matches`,
    html,
    text,
    tagType: 'sales-blast-august-1',
    companyName: cleanCompany
  });
}

// ── Wave 2: Wednesday Follow-up (Non-buyers) ──
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
          Quick follow-up—I sent a note on Monday regarding your funding eligibility check${cleanCompany !== 'your business' ? ` for <strong>${cleanCompany}</strong>` : ''}. I just wanted to make sure it didn't get buried in your inbox.
        </p>

        <p style="margin:0 0 16px 0;">
          If you're still exploring funding options, your personalized report is ready whenever you are. It takes about 2 minutes to review and highlights the programs that may be relevant to your business.
        </p>

        <div style="text-align:center;margin:28px 0;">
          <a href="${reportUrl}" style="background-color:#059669;color:white;padding:13px 26px;text-decoration:none;border-radius:6px;font-weight:600;display:inline-block;font-size:14px;">
            View My Funding Match Report ($19)
          </a>
        </div>

        <p style="margin:16px 0 16px 0;font-size:13px;color:#6b7280;line-height:1.6;">
          <em>Note: If you also need a step-by-step application timeline showing which programs to apply for first, the <a href="${bundleUrl}" style="color:#059669;font-weight:600;">Funding Action Plan ($49)</a> includes your match report plus a prioritized Month 1–4 roadmap.</em>
        </p>

        <p style="margin:0 0 16px 0;">
          Either way, no rush or pressure. If you have any questions, just reply to this email and I'll be happy to help.
        </p>

        <p style="margin:0 0 4px 0;">Thanks,</p>
        <p style="margin:0 0 2px 0;font-weight:600;">Ashwani K</p>
        <p style="margin:0;font-size:13px;color:#6b7280;">Founder<br/>FSI Digital</p>
      </div>

    </div>
  `;

  const text = `Hi ${firstName},\n\nQuick follow-up—I sent a note on Monday regarding your funding eligibility check${cleanCompany !== 'your business' ? ` for ${cleanCompany}` : ''}. I just wanted to make sure it didn't get buried in your inbox.\n\nIf you're still exploring funding options, your personalized report is ready whenever you are. It takes about 2 minutes to review and highlights the programs that may be relevant to your business.\n\nView My Funding Match Report ($19): ${reportUrl}\n\nNote: If you also need a step-by-step application timeline, the Funding Action Plan ($49) includes your match report plus a prioritized Month 1-4 roadmap: ${bundleUrl}\n\nEither way, no rush or pressure. If you have any questions, just reply to this email and I'll be happy to help.\n\nThanks,\nAshwani K\nFounder\nFSI Digital`;

  return sendEmail({
    to,
    subject: `Quick follow-up about your funding search`,
    html,
    text,
    tagType: 'sales-blast-august-2',
    companyName: cleanCompany
  });
}
