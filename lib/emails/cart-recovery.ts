function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getFirstName(name?: string) {
  return name ? escapeHtml(name.split(' ')[0]) : 'Founder';
}

async function sendEmail({
  to,
  subject,
  html,
  text,
  tagType,
  companyName
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
  tagType: string;
  companyName?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'FSI Digital <hello@fsidigital.ca>';
  const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';

  if (!apiKey) {
    console.warn(`Resend email skipped [${tagType}] — RESEND_API_KEY is not set.`);
    return { success: false, skipped: true };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        reply_to: replyToEmail,
        subject,
        html,
        text,
        tags: [
          { name: 'type', value: tagType },
          { name: 'company', value: (companyName || 'Unknown').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 50) },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Resend email failed [${tagType}]:`, errorText);
      return { success: false, error: errorText };
    }

    return { success: true };
  } catch (error) {
    console.error(`Resend email exception [${tagType}]:`, error);
    return { success: false, error: String(error) };
  }
}

// ── CART RECOVERY EMAIL 1 (45 minutes) ──
export async function sendCartRecoveryEmail1({
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
  const checkoutUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&checkout=true&source=recovery_email_1`;
  const subject = `You were one step away from unlocking your assessment`;

  const html = `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <div style="padding-bottom:16px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;">FSI <span style="color:#059669;">Digital</span></span>
        </div>
        <p style="font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;margin:16px 0;">
          I noticed you started checking out for your <strong>Funding Opportunity Assessment</strong> for ${companyName ? `<strong>${escapeHtml(companyName)}</strong>` : 'your company'} but didn't finish.
        </p>
        <p style="font-size:15px;color:#334155;line-height:1.6;margin:16px 0;">
          Our database matches your profile to qualified federal, provincial, and regional programs. To finalize your analysis and compile your custom roadmap, please complete your checkout.
        </p>
        <p style="font-size:15px;color:#334155;line-height:1.6;margin:16px 0;background-color:#f0fdf4;padding:12px;border-left:4px solid #10b981;border-radius:4px;">
          <strong>100% Risk-Free Guarantee:</strong> If our system identifies fewer than 2 active funding opportunities for your business, we will refund your $199 immediately.
        </p>
        <div style="text-align:center;margin:28px 0;">
          <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
            Complete Your Assessment Checkout &rarr;
          </a>
        </div>
        <div style="padding-top:20px;border-top:1px solid #f1f5f9;margin-top:28px;font-size:14px;color:#475569;">
          Best regards,<br/>
          <strong>Ashwani Kumar</strong><br/>
          <span style="color:#64748b;font-size:13px;">Founder, FSI Digital</span>
        </div>
      </div>
    </div>
  `;

  const text = `Hi ${firstName},\n\nI noticed you started checking out for your Funding Opportunity Assessment for ${companyName || 'your company'} but didn't finish.\n\nTo finalize your analysis and compile your custom roadmap, please complete your checkout:\n${checkoutUrl}\n\n100% Risk-Free Guarantee: If our system identifies fewer than 2 active funding opportunities, we will refund your $199 immediately.\n\nBest regards,\nAshwani Kumar\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'cart-recovery-1', companyName });
}

// ── CART RECOVERY EMAIL 2 (24 hours) ──
export async function sendCartRecoveryEmail2({
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
  const checkoutUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&checkout=true&source=recovery_email_2`;
  const subject = `Your assessment is still waiting`;

  const html = `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <div style="padding-bottom:16px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;">FSI <span style="color:#059669;">Digital</span></span>
        </div>
        <p style="font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;margin:16px 0;">
          Your matched funding opportunities for ${companyName ? `<strong>${escapeHtml(companyName)}</strong>` : 'your company'} are currently locked.
        </p>
        <p style="font-size:15px;color:#334155;line-height:1.6;margin:16px 0;">
          The report takes under 10 minutes to deliver after checkout. Don't let active government intakes and grant application deadlines pass you by.
        </p>
        <div style="text-align:center;margin:28px 0;">
          <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
            Unlock My Assessment Report &rarr;
          </a>
        </div>
        <div style="padding-top:20px;border-top:1px solid #f1f5f9;margin-top:28px;font-size:14px;color:#475569;">
          Best regards,<br/>
          <strong>Ashwani Kumar</strong><br/>
          <span style="color:#64748b;font-size:13px;">Founder, FSI Digital</span>
        </div>
      </div>
    </div>
  `;

  const text = `Hi ${firstName},\n\nYour matched funding opportunities for ${companyName || 'your company'} are currently locked.\n\nThe report takes under 10 minutes to deliver after checkout. Don't let active government intakes pass you by.\n\nUnlock here:\n${checkoutUrl}\n\nBest regards,\nAshwani Kumar\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'cart-recovery-2', companyName });
}

// ── CART RECOVERY EMAIL 3 (72 hours) ──
export async function sendCartRecoveryEmail3({
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
  const checkoutUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&checkout=true&source=recovery_email_3`;
  const subject = `Still interested in funding opportunities?`;

  const html = `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <div style="padding-bottom:16px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;">FSI <span style="color:#059669;">Digital</span></span>
        </div>
        <p style="font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;margin:16px 0;">
          I am closing out pending reports this week. I wanted to check if you still wanted to unlock the matched programs for ${companyName ? `<strong>${escapeHtml(companyName)}</strong>` : 'your business'}.
        </p>
        <p style="font-size:15px;color:#334155;line-height:1.6;margin:16px 0;">
          If you are still actively looking for non-dilutive capital (grants, tax credits, and subsidies) to fund hiring, exporting, or product development, you can generate your assessment below:
        </p>
        <div style="text-align:center;margin:28px 0;">
          <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
            Access My Custom Roadmap &rarr;
          </a>
        </div>
        <div style="padding-top:20px;border-top:1px solid #f1f5f9;margin-top:28px;font-size:14px;color:#475569;">
          Best regards,<br/>
          <strong>Ashwani Kumar</strong><br/>
          <span style="color:#64748b;font-size:13px;">Founder, FSI Digital</span>
        </div>
      </div>
    </div>
  `;

  const text = `Hi ${firstName},\n\nI am closing out pending reports this week. I wanted to check if you still wanted to unlock the matched programs for ${companyName || 'your business'}.\n\nIf you are looking for non-dilutive capital to fund growth, you can generate your assessment here:\n${checkoutUrl}\n\nBest regards,\nAshwani Kumar\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'cart-recovery-3', companyName });
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
  const reportUrl = `https://www.fsidigital.ca/portfolio/report?token=${loginToken}&source=not_viewed_recovery`;
  const subject = `Your Funding Opportunity Assessment is Ready`;

  const html = `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <div style="padding-bottom:16px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;">FSI <span style="color:#059669;">Digital</span></span>
        </div>
        <p style="font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;margin:16px 0;">
          Thank you again for purchasing your assessment report.
        </p>
        <p style="font-size:15px;color:#334155;line-height:1.6;margin:16px 0;">
          We noticed you haven't opened your <strong>Executive Funding Assessment</strong> report yet. It is fully compiled and ready to view, print, or save as a PDF inside your private portal:
        </p>
        <div style="text-align:center;margin:28px 0;">
          <a href="${reportUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
            View My Assessment Report &rarr;
          </a>
        </div>
        <div style="padding-top:20px;border-top:1px solid #f1f5f9;margin-top:28px;font-size:14px;color:#475569;">
          Best regards,<br/>
          <strong>Ashwani Kumar</strong><br/>
          <span style="color:#64748b;font-size:13px;">Founder, FSI Digital</span>
        </div>
      </div>
    </div>
  `;

  const text = `Hi ${firstName},\n\nThank you again for purchasing your assessment report.\n\nWe noticed you haven't opened your report yet. It is ready to view, print, or download in your portal:\n${reportUrl}\n\nBest regards,\nAshwani Kumar\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'report-not-viewed-recovery', companyName });
}
