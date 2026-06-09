import { sendEmail, getFirstName } from "./mailer";

export interface AlertProgramDelta {
  name: string;
  fundingAmount: string;
  fundingType: string;
  deltaType: "NEW" | "UPDATED";
  changeDescription: string;
}

export async function sendWeeklyDeltaAlertEmail({
  to,
  name,
  loginToken,
  companyName,
  deltas
}: {
  to: string;
  name?: string;
  loginToken: string;
  companyName?: string;
  deltas: AlertProgramDelta[];
}) {
  const firstName = getFirstName(name);
  const dashboardUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=weekly_alert`;
  const subject = `New funding opportunities matched for your business`;

  const deltaRows = deltas.map(d => `
    <div style="margin-bottom:18px;padding:16px;background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;text-align:left;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;">
        <span style="font-size:10px;font-weight:900;text-transform:uppercase;padding:2px 6px;border-radius:4px;color:white;background-color:${d.deltaType === 'NEW' ? '#10b981' : '#3b82f6'};">
          ${d.deltaType}
        </span>
        <span style="font-size:11px;color:#64748b;font-weight:700;">${d.fundingType}</span>
      </div>
      <h4 style="font-size:14px;font-weight:800;color:#0f172a;margin:4px 0;">${d.name}</h4>
      <p style="font-size:12px;color:#475569;margin:4px 0;"><strong>Estimated Yield:</strong> ${d.fundingAmount}</p>
      ${d.changeDescription ? `<p style="font-size:11px;color:#4f46e5;font-style:italic;margin:6px 0 0 0;">${d.changeDescription}</p>` : ''}
    </div>
  `).join("");

  const html = `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <div style="padding-bottom:16px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;">FSI <span style="color:#059669;">Digital</span></span>
        </div>
        <p style="font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;margin:16px 0;">
          Our intelligence engine detected new or updated funding opportunities matching ${companyName ? `<strong>${companyName}</strong>` : 'your business'} this week.
        </p>
        
        <div style="margin:24px 0;">
          ${deltaRows}
        </div>

        <p style="font-size:15px;color:#334155;line-height:1.6;margin:16px 0;">
          Access your dashboard to check qualification criteria, review Stacking Guides, and prioritize these streams.
        </p>
        
        <div style="text-align:center;margin:28px 0;">
          <a href="${dashboardUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
            Access Matching Portfolio &rarr;
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

  const text = `Hi ${firstName},\n\nOur intelligence engine detected new or updated funding opportunities matching ${companyName || 'your business'} this week.\n\n${deltas.map(d => `[${d.deltaType}] ${d.name} (${d.fundingAmount})`).join("\n")}\n\nAccess dashboard to review matches:\n${dashboardUrl}\n\nBest regards,\nAshwani Kumar\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'weekly-alerts', companyName });
}
