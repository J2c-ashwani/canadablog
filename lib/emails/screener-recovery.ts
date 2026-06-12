import { sendEmail, getFirstName } from "./mailer";

export async function sendScreenerRecoveryEmail({
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
  const url = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=screener_recovery`;
  const subject = `Your funding readiness assessment is waiting`;

  const html = `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <div style="padding-bottom:16px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;">FSI <span style="color:#059669;">Digital</span></span>
        </div>
        <p style="font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;margin:16px 0;">
          You started building your <strong>Funding Readiness Assessment</strong> for ${companyName ? `<strong>${companyName}</strong>` : 'your business'} yesterday but did not finish.
        </p>
        <p style="font-size:15px;color:#334155;line-height:1.6;margin:16px 0;">
          Our system has matched your profile to active non-dilutive programs (grants, tax credits, and wage subsidies), but we need you to complete the strategic profile to unlock your full stacking roadmap.
        </p>
        <div style="text-align:center;margin:28px 0;">
          <a href="${url}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
            Resume My Assessment &rarr;
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

  const text = `Hi ${firstName},\n\nYou started building your Funding Readiness Assessment for ${companyName || 'your business'} yesterday but did not finish.\n\nResume here to unlock matching programs:\n${url}\n\nBest regards,\nAshwani Kumar\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'screener-recovery', companyName });
}
