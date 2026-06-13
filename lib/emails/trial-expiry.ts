import { sendEmail, getFirstName } from "./mailer";

export async function sendTrialExpiryEmail({
  to,
  name,
  loginToken,
  companyName,
  day
}: {
  to: string;
  name?: string;
  loginToken: string;
  companyName?: string;
  day: 5 | 7 | 10;
}) {
  const firstName = getFirstName(name);
  const upgradeUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}#upgrade-section`;
  
  let subject = "";
  let bodyCopy = "";
  let ctaText = "";

  if (day === 5) {
    subject = "Your Founding Member trial ends in 2 days";
    bodyCopy = "We hope you are finding valuable matches! Your 7-day free trial ends in 2 days. Upgrade now to lock in the introductory $29/mo rate forever.";
    ctaText = "Lock In My Discounted Rate";
  } else if (day === 7) {
    subject = "Your free trial ends today";
    bodyCopy = "Your trial ends today. Lock in your Founding Member pass now to maintain unrestricted access to stacking guides, deadlines, and checklists.";
    ctaText = "Keep Unrestricted Access";
  } else {
    subject = "Your free trial has expired";
    bodyCopy = "Your free trial has expired and your dashboard access is now restricted. Re-activate your Founding Member pass today to continue stacking your programs.";
    ctaText = "Re-Activate Membership";
  }

  const html = `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <div style="padding-bottom:16px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;">FSI <span style="color:#059669;">Digital</span></span>
        </div>
        <p style="font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;margin:16px 0;">
          ${bodyCopy}
        </p>
        <div style="text-align:center;margin:28px 0;">
          <a href="${upgradeUrl}" style="background-color:#4f46e5;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
            ${ctaText} &rarr;
          </a>
        </div>
        <div style="padding-top:20px;border-top:1px solid #f1f5f9;margin-top:28px;font-size:14px;color:#475569;">
          Best regards,<br/>
          <strong>Ashwani K</strong><br/>
          <span style="color:#64748b;font-size:13px;">Founder, FSI Digital</span>
        </div>
      </div>
    </div>
  `;

  const text = `Hi ${firstName},\n\n${bodyCopy}\n\nUpgrade here:\n${upgradeUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: `trial-expiry-${day}`, companyName });
}
