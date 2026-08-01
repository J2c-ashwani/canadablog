import { sendEmail, getFirstName, cleanCompanyName, escapeHtml } from "./mailer";

export interface UpsellEmailParams {
  to: string;
  name?: string;
  loginToken: string;
  companyName?: string;
  province?: string;
  productPurchased?: string;
}

function wrapUpsellTemplate(contentHtml: string, loginToken: string, firstName: string) {
  const unsubscribeUrl = 'https://www.fsidigital.ca/subscribe/unsubscribe';

  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="padding-bottom:18px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;text-align:left;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">FSI <span style="color:#059669;">Digital</span></span>
        </div>

        <!-- Body Content -->
        <div style="font-size:15px;color:#334155;line-height:1.6;text-align:left;">
          <p style="font-weight:600;margin-top:0;margin-bottom:16px;">Hi ${firstName},</p>
          
          ${contentHtml}

        </div>

        <!-- Footer -->
        <div style="padding-top:24px;border-top:1px solid #f1f5f9;margin-top:32px;font-size:13px;color:#475569;text-align:left;line-height:1.5;">
          Best regards,<br/>
          <strong>Ashwani K</strong><br/>
          <span style="color:#64748b;font-size:12px;">Founder, FSI Digital</span>
          
          <div style="margin-top:24px;padding-top:16px;border-top:1px dashed #e2e8f0;font-size:11px;color:#94a3b8;text-align:center;">
            <a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline;margin-top:8px;display:inline-block;">Unsubscribe from these emails</a>
          </div>
        </div>

      </div>
    </div>
  `;
}

// ── UPSELL EMAIL 1 (Day 2) ──
export async function sendUpsellEmail1({
  to,
  name,
  loginToken,
  companyName
}: UpsellEmailParams) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);
  const bookingUrl = `https://www.fsidigital.ca/consultation`;

  const html = wrapUpsellTemplate(`
    <p style="margin: 0 0 16px 0;">
      Your funding report is ready, and it shows WHICH programs you match with. But to maximize your approval odds, you need to know HOW to apply.
    </p>
    <p style="margin: 0 0 16px 0;">
      Founders who book a strategy audit recover an average of 10x their investment. Let our experts guide you through the next steps and ensure you're on the right track.
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${bookingUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
        Book your Strategy Audit &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nYour funding report is ready, and it shows WHICH programs you match with. But to maximize your approval odds, you need to know HOW to apply.\n\nFounders who book a strategy audit recover an average of 10x their investment.\n\nBook your Strategy Audit: ${bookingUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject: `Your funding report is ready — here's what top founders do next`, html, text, tagType: 'upsell-email-1', companyName: cleanCompany });
}

// ── UPSELL EMAIL 2 (Day 5) ──
export async function sendUpsellEmail2({
  to,
  name,
  loginToken,
  companyName,
  province
}: UpsellEmailParams) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);
  const bookingUrl = `https://www.fsidigital.ca/consultation`;
  const displayProvince = province || 'your region';

  const html = wrapUpsellTemplate(`
    <p style="margin: 0 0 16px 0;">
      We recently helped a founder in ${escapeHtml(displayProvince)} stack multiple grants using insights from our funding report and a 1-on-1 strategy audit.
    </p>
    <p style="margin: 0 0 16px 0;">
      The report was just the beginning. Our strategy audit is the natural next step. A $199 audit can unlock a potential $50,000-$150,000 in non-repayable funding.
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${bookingUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
        Schedule your 1-on-1 Strategy Audit &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nWe recently helped a founder in ${displayProvince} stack multiple grants using insights from our funding report and a 1-on-1 strategy audit.\n\nThe report was just the beginning. Our strategy audit is the natural next step. A $199 audit can unlock a potential $50,000-$150,000 in non-repayable funding.\n\nSchedule your 1-on-1 Strategy Audit: ${bookingUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject: `[Case Study] How ${displayProvince} founders are stacking grants`, html, text, tagType: 'upsell-email-2', companyName: cleanCompany });
}

// ── UPSELL EMAIL 3 (Day 10) ──
export async function sendUpsellEmail3({
  to,
  name,
  loginToken,
  companyName
}: UpsellEmailParams) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);
  const bookingUrl = `https://www.fsidigital.ca/consultation`;

  const html = wrapUpsellTemplate(`
    <p style="margin: 0 0 16px 0;">
      Program deadlines are approaching for Q3/Q4, and we don't want you to miss out.
    </p>
    <p style="margin: 0 0 16px 0;">
      For this week only, we're offering a limited discount: get your Strategy Audit for just <strong>$149</strong> instead of $199. Use code <strong>REPORT50</strong>.
    </p>
    <p style="margin: 0 0 16px 0;">
      Don't leave funding on the table.
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${bookingUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
        Claim your $50 discount &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nProgram deadlines are approaching for Q3/Q4, and we don't want you to miss out.\n\nFor this week only, we're offering a limited discount: get your Strategy Audit for just $149 instead of $199. Use code REPORT50.\n\nDon't leave funding on the table.\n\nClaim your $50 discount: ${bookingUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject: `Limited: $50 off your Strategy Audit this week`, html, text, tagType: 'upsell-email-3', companyName: cleanCompany });
}

// ── CUSTOMER FEEDBACK & SATISFACTION EMAIL (Day 14) ──
export async function sendFeedbackEmail({
  to,
  name,
  loginToken,
  companyName
}: UpsellEmailParams) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);
  const feedbackUrl = `https://www.fsidigital.ca/contact?subject=Customer+Feedback`;

  const html = wrapUpsellTemplate(`
    <p style="margin: 0 0 16px 0;">
      It's been two weeks since you received your Funding Match Report. I'm reaching out directly to ask: <strong>How was your experience?</strong>
    </p>
    <p style="margin: 0 0 16px 0;">
      As the founder of FSI Digital, I personally review every piece of feedback to improve our reports, data accuracy, and tools.
    </p>
    <ul style="margin: 0 0 20px 0; padding-left: 20px;">
      <li>Did the report help you identify relevant funding options?</li>
      <li>Were there any specific features or grant programs you wish we covered?</li>
      <li>Did you encounter any issues with report delivery or data accuracy?</li>
    </ul>
    <p style="margin: 0 0 16px 0;">
      Simply reply directly to this email or click below to share your thoughts. Your feedback directly shapes our product roadmap.
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${feedbackUrl}" style="background-color:#0f172a;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
        Share 2-Minute Feedback &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nIt's been two weeks since you received your Funding Match Report. I'm reaching out directly to ask: How was your experience?\n\nAs the founder of FSI Digital, I personally review every piece of feedback to improve our reports, data accuracy, and tools.\n\nSimply reply directly to this email or share your thoughts here: ${feedbackUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject: `Quick question about your funding report (Founder check-in)`, html, text, tagType: 'customer-feedback', companyName: cleanCompany });
}
