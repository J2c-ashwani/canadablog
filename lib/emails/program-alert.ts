import { sendEmail, getFirstName } from "./mailer";

export async function sendInstantProgramAlertEmail({
  to,
  name,
  loginToken,
  companyName,
  programName,
  fundingAmount,
  fundingType,
  description,
  severity
}: {
  to: string;
  name?: string;
  loginToken: string;
  companyName?: string;
  programName: string;
  fundingAmount: string;
  fundingType: string;
  description: string;
  severity: "major" | "critical";
}) {
  const firstName = getFirstName(name);
  const dashboardUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=instant_alert`;
  const subject = `[High Priority] New funding matched: ${programName}`;

  const html = `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <div style="padding-bottom:16px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;">FSI <span style="color:#059669;">Digital</span></span>
        </div>
        <p style="font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;margin:16px 0;">
          A <strong>${severity.toUpperCase()}</strong> update has occurred in a program matching ${companyName ? `<strong>${companyName}</strong>` : 'your business'}.
        </p>

        <div style="margin:24px 0;padding:20px;background-color:#fffbeb;border:1px solid #fef3c7;border-left:4px solid #d97706;border-radius:8px;text-align:left;">
          <h3 style="font-size:16px;font-weight:800;color:#78350f;margin:0 0 8px 0;">${programName}</h3>
          <p style="font-size:13px;color:#92400e;margin:4px 0;"><strong>Funding Type:</strong> ${fundingType}</p>
          <p style="font-size:13px;color:#92400e;margin:4px 0;"><strong>Typical Yield:</strong> ${fundingAmount}</p>
          <p style="font-size:13px;color:#451a03;line-height:1.5;margin:12px 0 0 0;">${description}</p>
        </div>

        <p style="font-size:15px;color:#334155;line-height:1.6;margin:16px 0;">
          Review the pre-qualification guidelines and stacking options on your portfolio dashboard.
        </p>
        
        <div style="text-align:center;margin:28px 0;">
          <a href="${dashboardUrl}" style="background-color:#d97706;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
            View Funding Details &rarr;
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

  const text = `Hi ${firstName},\n\nA ${severity.toUpperCase()} update has occurred in a program matching your business: ${programName}.\n\nFunding Type: ${fundingType}\nTypical Yield: ${fundingAmount}\n\nReview details on dashboard:\n${dashboardUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: `instant-alert-${severity}`, companyName });
}
