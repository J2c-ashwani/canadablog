import { sendEmail, getFirstName } from "./mailer";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function wrapCartRecoveryTemplate(contentHtml: string, loginToken: string, firstName: string) {
  const unsubscribeUrl = `https://www.fsidigital.ca/subscribe/unsubscribe?token=${loginToken}`;

  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="padding-bottom:18px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;text-align:left;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">FSI <span style="color:#059669;">Digital</span></span>
          <span style="float:right;font-size:11px;font-weight:700;color:#059669;text-transform:uppercase;padding:2px 8px;background-color:#ecfdf5;border-radius:4px;margin-top:2px;">
            Secure Checkout
          </span>
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
            This email was sent because you started checkout for our funding analysis products.<br>
            <a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline;margin-top:8px;display:inline-block;">Unsubscribe from these emails</a>
          </div>
        </div>

      </div>
    </div>
  `;
}

// ── CART RECOVERY EMAIL 1 (45 minutes) ──
export async function sendCartRecoveryEmail1({
  to,
  name,
  loginToken,
  companyName,
  priceShown
}: {
  to: string;
  name?: string;
  loginToken: string;
  companyName?: string;
  priceShown?: string;
}) {
  const firstName = getFirstName(name);
  const checkoutUrl = `https://www.fsidigital.ca/calculator?token=${loginToken}&utm_source=cart_recovery&utm_medium=email&utm_campaign=cart_day1`;
  const isBundle = priceShown === '79' || priceShown === '108';
  const productName = isBundle ? 'Complete Funding Bundle' : 'Funding Match Report';
  const priceText = isBundle ? '$79' : '$19';

  const html = wrapCartRecoveryTemplate(`
    <p style="margin: 0 0 16px 0;">
      I noticed you started checking out for your <strong>${productName}</strong> ${companyName ? `for <strong>${escapeHtml(companyName)}</strong>` : ''} but didn't finish.
    </p>
    <p style="margin: 0 0 16px 0;">
      Our database matches your specific profile against qualified federal and provincial programs. To lock in your matches and compile your custom delivery dashboard, please complete your checkout.
    </p>
    <p style="margin: 0 0 20px 0;background-color:#f0fdf4;padding:12px;border-left:4px solid #10b981;border-radius:4px;font-size:14px;color:#15803d;">
      <strong>100% Risk-Free Guarantee:</strong> If our system identifies fewer than 2 active funding opportunities for your business, we will refund your ${priceText} immediately.
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
        Complete My Checkout (${priceText}) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nI noticed you started checking out for your ${productName} but didn't finish.\n\nTo finalize your analysis and compile your custom roadmap, please complete your checkout:\n${checkoutUrl}\n\n100% Risk-Free Guarantee: If our system identifies fewer than 2 active funding opportunities, we will refund your purchase immediately.\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject: `You were one step away from unlocking your matches`, html, text, tagType: 'cart-recovery-1', companyName });
}

// ── CART RECOVERY EMAIL 2 (24 hours) ──
export async function sendCartRecoveryEmail2({
  to,
  name,
  loginToken,
  companyName,
  priceShown
}: {
  to: string;
  name?: string;
  loginToken: string;
  companyName?: string;
  priceShown?: string;
}) {
  const firstName = getFirstName(name);
  const checkoutUrl = `https://www.fsidigital.ca/calculator?token=${loginToken}&utm_source=cart_recovery&utm_medium=email&utm_campaign=cart_day3`;
  const isBundle = priceShown === '79' || priceShown === '108';
  const productName = isBundle ? 'Complete Funding Bundle' : 'Funding Match Report';
  const priceText = isBundle ? '$79' : '$19';

  const html = wrapCartRecoveryTemplate(`
    <p style="margin: 0 0 16px 0;">
      Your matched funding opportunities ${companyName ? `for <strong>${escapeHtml(companyName)}</strong>` : ''} are currently locked and waiting in checkout.
    </p>
    <p style="margin: 0 0 20px 0;">
      Your report is delivered instantly. Don't let active government intakes and grant application deadlines pass you by. Resume your secure checkout to unlock access:
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
        Unlock My Match Report (${priceText}) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nYour matched funding opportunities are currently locked. Your report is delivered instantly. Don't let active government intakes pass you by.\n\nResume your secure checkout to unlock access:\n${checkoutUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject: `Your matches are still waiting`, html, text, tagType: 'cart-recovery-2', companyName });
}

// ── CART RECOVERY EMAIL 3 (72 hours) ──
export async function sendCartRecoveryEmail3({
  to,
  name,
  loginToken,
  companyName,
  priceShown
}: {
  to: string;
  name?: string;
  loginToken: string;
  companyName?: string;
  priceShown?: string;
}) {
  const firstName = getFirstName(name);
  const checkoutUrl = `https://www.fsidigital.ca/calculator?token=${loginToken}&utm_source=cart_recovery&utm_medium=email&utm_campaign=cart_day5`;
  const isBundle = priceShown === '79' || priceShown === '108';
  const productName = isBundle ? 'Complete Funding Bundle' : 'Funding Match Report';
  const priceText = isBundle ? '$79' : '$19';

  const html = wrapCartRecoveryTemplate(`
    <p style="margin: 0 0 16px 0;">
      I am closing out pending reports this week and wanted to check if you still wanted to unlock your matched programs ${companyName ? `for <strong>${escapeHtml(companyName)}</strong>` : ''}.
    </p>
    <p style="margin: 0 0 20px 0;">
      If you are still actively looking for non-dilutive capital (grants, tax credits, and subsidies) to fund hiring, exporting, or product development, you can resume your checkout below:
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
        Complete Checkout &amp; Access Dashboard &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nI am closing out pending reports this week. If you are still looking for non-dilutive capital, you can resume checkout and access your dashboard here:\n${checkoutUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject: `Still interested in funding opportunities?`, html, text, tagType: 'cart-recovery-3', companyName });
}

// ── REPORT NOT VIEWED RECOVERY EMAIL (24 hours after purchase) ──
export async function sendReportNotOpenedEmail({
  to,
  name,
  loginToken,
  companyName
}: {
  to: string;
  name?: string;
  loginToken: string;
  companyName?: string;
}) {
  const firstName = getFirstName(name);
  const reportUrl = `https://www.fsidigital.ca/calculator?token=${loginToken}&utm_source=alert_nurture&utm_medium=email&utm_campaign=report_not_viewed`;
  const subject = `Your Funding Opportunity Assessment is Ready`;

  const html = wrapCartRecoveryTemplate(`
    <p style="margin: 0 0 16px 0;">
      Thank you again for purchasing your assessment report.
    </p>
    <p style="margin: 0 0 20px 0;">
      We noticed you haven't opened your <strong>Executive Funding Assessment</strong> report yet. It is fully compiled and ready to view, print, or save as a PDF inside your private portal:
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${reportUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
        View My Assessment Report &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nThank you again for purchasing your assessment report.\n\nWe noticed you haven't opened your report yet. It is ready to view, print, or download in your portal:\n${reportUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'report-not-viewed-recovery', companyName });
}
