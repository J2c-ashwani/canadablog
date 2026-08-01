import { sendEmail, getFirstName, cleanCompanyName } from "./mailer";

export interface SalesBlastParams {
  to: string;
  name?: string;
  companyName?: string;
  region?: string;
  industry?: string;
  loginToken?: string;
}

// ── Sales Blast #1: Monday Morning — "Your funding matches are expiring" ──
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
  const regionLabel = region && region !== 'N/A' ? region : 'Canada';
  const industryLabel = industry && industry !== 'N/A' && industry !== 'Other' ? industry : 'your sector';

  const reportUrl = `https://www.fsidigital.ca/products/funding-match-report?email=${encodeURIComponent(to)}&source=august_blast`;
  const calculatorUrl = `https://www.fsidigital.ca/calculator?email=${encodeURIComponent(to)}&source=august_blast`;
  const dashboardUrl = loginToken
    ? `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=august_blast`
    : calculatorUrl;

  const html = `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <div style="padding-bottom:18px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;text-align:left;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">FSI <span style="color:#059669;">Digital</span></span>
          <span style="float:right;font-size:11px;font-weight:700;color:#dc2626;text-transform:uppercase;padding:2px 8px;background-color:#fef2f2;border-radius:4px;margin-top:2px;">
            August Update
          </span>
        </div>

        <div style="font-size:15px;color:#334155;line-height:1.6;text-align:left;">
          <p style="font-weight:600;margin-top:0;margin-bottom:16px;">Hi ${firstName},</p>
          
          <p style="margin: 0 0 16px 0;">
            You checked your funding eligibility with us recently${cleanCompany !== 'your business' ? ` for <strong>${cleanCompany}</strong>` : ''}, but you never downloaded your personalized Funding Match Report.
          </p>

          <p style="margin: 0 0 16px 0;">
            Since then, several ${regionLabel} funding programs for ${industryLabel} businesses have updated their August 2026 intake windows. Some programs in our database are accepting applications now but close intake by September.
          </p>

          <div style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin:20px 0;">
            <h4 style="margin:0 0 8px 0;color:#166534;font-size:14px;font-weight:700;">Your Personalized Funding Match Report ($19)</h4>
            <ul style="margin:0;padding-left:18px;font-size:13px;color:#15803d;line-height:1.7;">
              <li>Programs you may qualify for based on your profile</li>
              <li>Estimated funding ranges per program</li>
              <li>Required documents & application steps</li>
              <li>Funding readiness score & priority ranking</li>
            </ul>
          </div>

          <div style="text-align:center;margin:28px 0;">
            <a href="${reportUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
              Get Your Funding Match Report ($19) &rarr;
            </a>
          </div>

          <p style="margin: 16px 0 0 0;font-size:13px;color:#64748b;text-align:center;">
            Or <a href="${dashboardUrl}" style="color:#059669;text-decoration:underline;">re-run your eligibility check for free</a>
          </p>
        </div>

        <div style="padding-top:24px;border-top:1px solid #f1f5f9;margin-top:32px;font-size:13px;color:#475569;text-align:left;line-height:1.5;">
          Best regards,<br/>
          <strong>Ashwani K</strong><br/>
          <span style="color:#64748b;font-size:12px;">Founder, FSI Digital</span>
        </div>

      </div>
    </div>
  `;

  const text = `Hi ${firstName},\n\nYou checked your funding eligibility with us recently${cleanCompany !== 'your business' ? ` for ${cleanCompany}` : ''}, but you never downloaded your personalized Funding Match Report.\n\nSeveral ${regionLabel} funding programs have updated their August 2026 intake windows.\n\nYour Personalized Funding Match Report ($19):\n- Programs you may qualify for\n- Estimated funding ranges\n- Required documents & steps\n- Funding readiness score\n\nGet Your Report: ${reportUrl}\n\nOr re-run your eligibility check for free: ${dashboardUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({
    to,
    subject: `${firstName}, your ${regionLabel} funding matches are ready — August intake windows open`,
    html,
    text,
    tagType: 'sales-blast-august-1',
    companyName: cleanCompany
  });
}

// ── Sales Blast #2: Wednesday Follow-up (Non-openers) — "3 programs closing intake" ──
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
  const regionLabel = region && region !== 'N/A' ? region : 'Canada';

  const reportUrl = `https://www.fsidigital.ca/products/funding-match-report?email=${encodeURIComponent(to)}&source=august_blast_2`;
  const bundleUrl = `https://www.fsidigital.ca/products/action-plan?email=${encodeURIComponent(to)}&source=august_blast_2`;

  const html = `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <div style="padding-bottom:18px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;text-align:left;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">FSI <span style="color:#059669;">Digital</span></span>
        </div>

        <div style="font-size:15px;color:#334155;line-height:1.6;text-align:left;">
          <p style="font-weight:600;margin-top:0;margin-bottom:16px;">Hi ${firstName},</p>
          
          <p style="margin: 0 0 16px 0;">
            Quick follow-up — I wanted to make sure you saw my note on Monday about your ${regionLabel} funding eligibility results${cleanCompany !== 'your business' ? ` for <strong>${cleanCompany}</strong>` : ''}.
          </p>

          <p style="margin: 0 0 16px 0;">
            If you're serious about applying for government funding this quarter, the Funding Match Report gives you the specific programs, documents, and steps — so you don't waste time on programs you don't qualify for.
          </p>

          <div style="background-color:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:20px 0;font-size:13px;color:#1e40af;">
            <strong>Most popular option:</strong> The <a href="${bundleUrl}" style="color:#1e40af;font-weight:bold;">Funding Action Plan ($49)</a> includes your match report PLUS a prioritized Month 1–4 application timeline so you know exactly what to do first.
          </div>

          <div style="text-align:center;margin:28px 0;">
            <a href="${reportUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
              Get Started with the $19 Report &rarr;
            </a>
          </div>
        </div>

        <div style="padding-top:24px;border-top:1px solid #f1f5f9;margin-top:32px;font-size:13px;color:#475569;text-align:left;line-height:1.5;">
          Best regards,<br/>
          <strong>Ashwani K</strong><br/>
          <span style="color:#64748b;font-size:12px;">Founder, FSI Digital</span>
        </div>

      </div>
    </div>
  `;

  const text = `Hi ${firstName},\n\nQuick follow-up — I wanted to make sure you saw my note on Monday about your ${regionLabel} funding eligibility results${cleanCompany !== 'your business' ? ` for ${cleanCompany}` : ''}.\n\nIf you're serious about applying for government funding this quarter, the Funding Match Report gives you the specific programs, documents, and steps.\n\nMost popular option: The Funding Action Plan ($49) includes your match report PLUS a prioritized Month 1-4 application timeline.\n\nGet Started: ${reportUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({
    to,
    subject: `Re: Your ${regionLabel} funding matches — did you see this?`,
    html,
    text,
    tagType: 'sales-blast-august-2',
    companyName: cleanCompany
  });
}
