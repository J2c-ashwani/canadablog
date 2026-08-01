import { sendEmail, getFirstName, cleanCompanyName } from "./mailer";

export interface MCAAbandonmentParams {
  to: string;
  name?: string;
  companyName?: string;
  province?: string;
}

// ── Email #1: Immediate (Within 1 Hour) ──
export async function sendMCAAbandonmentEmail({
  to,
  name,
  companyName,
}: MCAAbandonmentParams) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);
  const resumeUrl = `https://www.fsidigital.ca/apply?email=${encodeURIComponent(to)}&step=3`;

  const html = `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="padding-bottom:18px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;text-align:left;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">FSI <span style="color:#0284c7;">Digital</span></span>
        </div>

        <!-- Body Content -->
        <div style="font-size:15px;color:#334155;line-height:1.6;text-align:left;">
          <p style="font-weight:600;margin-top:0;margin-bottom:16px;">Hi ${firstName},</p>
          
          <p style="margin: 0 0 16px 0;">
            We noticed you started your business funding application for <strong>${cleanCompany}</strong> but didn't complete the final step.
          </p>

          <div style="background-color:#f0f9ff;border-left:4px solid #0284c7;padding:16px;margin:20px 0;border-radius:4px;font-size:14px;color:#0369a1;">
            <strong>Good news:</strong> You do <em>not</em> need to upload bank statements to submit your application. You can complete your profile in under 60 seconds.
          </div>

          <p style="margin: 0 0 16px 0;">
            Our Canadian funding partners review active applications within 24 hours. Don't leave your working capital decision on hold.
          </p>

          <div style="text-align:center;margin:28px 0;">
            <a href="${resumeUrl}" style="background-color:#0284c7;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(2,132,199,0.2);">
              Resume Application &rarr;
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding-top:24px;border-top:1px solid #f1f5f9;margin-top:32px;font-size:13px;color:#475569;text-align:left;line-height:1.5;">
          Best regards,<br/>
          <strong>Funding Intelligence Team</strong><br/>
          <span style="color:#64748b;font-size:12px;">FSI Digital Canada</span>
        </div>

      </div>
    </div>
  `;

  const text = `Hi ${firstName},\n\nWe noticed you started your business funding application for ${cleanCompany} but didn't complete the final step.\n\nGood news: You do NOT need to upload bank statements to submit your application. You can complete your profile in under 60 seconds.\n\nResume Application: ${resumeUrl}\n\nBest regards,\nFunding Intelligence Team\nFSI Digital Canada`;

  return sendEmail({
    to,
    subject: `Finish your funding application for ${cleanCompany} (60 seconds left)`,
    html,
    text,
    tagType: 'mca-abandonment-1',
    companyName: cleanCompany
  });
}

// ── Email #2: Day 1 (24 Hours) ──
export async function sendMCAAbandonmentEmail2({
  to,
  name,
  companyName,
}: MCAAbandonmentParams) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);
  const resumeUrl = `https://www.fsidigital.ca/apply?email=${encodeURIComponent(to)}&step=3`;

  const html = `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <div style="padding-bottom:18px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;text-align:left;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">FSI <span style="color:#0284c7;">Digital</span></span>
        </div>

        <div style="font-size:15px;color:#334155;line-height:1.6;text-align:left;">
          <p style="font-weight:600;margin-top:0;margin-bottom:16px;">Hi ${firstName},</p>
          
          <p style="margin: 0 0 16px 0;">
            Your funding application for <strong>${cleanCompany}</strong> is still pending.
          </p>

          <p style="margin: 0 0 16px 0;">
            Canadian alternative lenders update their working capital allocation windows weekly. By completing your profile now, your business remains in line for priority review before this week's underwriting cut-off.
          </p>

          <div style="text-align:center;margin:28px 0;">
            <a href="${resumeUrl}" style="background-color:#0284c7;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(2,132,199,0.2);">
              Submit Profile in 60 Seconds &rarr;
            </a>
          </div>
        </div>

        <div style="padding-top:24px;border-top:1px solid #f1f5f9;margin-top:32px;font-size:13px;color:#475569;text-align:left;line-height:1.5;">
          Best regards,<br/>
          <strong>Funding Intelligence Team</strong><br/>
          <span style="color:#64748b;font-size:12px;">FSI Digital Canada</span>
        </div>

      </div>
    </div>
  `;

  const text = `Hi ${firstName},\n\nYour funding application for ${cleanCompany} is still pending.\n\nCanadian alternative lenders update their working capital allocation windows weekly. By completing your profile now, your business remains in line for priority review before this week's underwriting cut-off.\n\nSubmit Profile: ${resumeUrl}\n\nBest regards,\nFunding Intelligence Team\nFSI Digital Canada`;

  return sendEmail({
    to,
    subject: `Funding application pending for ${cleanCompany} — priority review open`,
    html,
    text,
    tagType: 'mca-abandonment-2',
    companyName: cleanCompany
  });
}

// ── Email #3: Day 3 (72 Hours) ──
export async function sendMCAAbandonmentEmail3({
  to,
  name,
  companyName,
}: MCAAbandonmentParams) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);
  const resumeUrl = `https://www.fsidigital.ca/apply?email=${encodeURIComponent(to)}&step=3`;

  const html = `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <div style="padding-bottom:18px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;text-align:left;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">FSI <span style="color:#0284c7;">Digital</span></span>
        </div>

        <div style="font-size:15px;color:#334155;line-height:1.6;text-align:left;">
          <p style="font-weight:600;margin-top:0;margin-bottom:16px;">Hi ${firstName},</p>
          
          <p style="margin: 0 0 16px 0;">
            This is a final courtesy reminder regarding your funding request for <strong>${cleanCompany}</strong>.
          </p>

          <p style="margin: 0 0 16px 0;">
            Unfinished application profiles are automatically archived after 72 hours. If you still require non-dilutive working capital or expansion funding this month, take 1 minute to finalize your submission.
          </p>

          <div style="text-align:center;margin:28px 0;">
            <a href="${resumeUrl}" style="background-color:#0f172a;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
              Finalize Application Before Archiving &rarr;
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

  const text = `Hi ${firstName},\n\nThis is a final courtesy reminder regarding your funding request for ${cleanCompany}.\n\nUnfinished application profiles are automatically archived after 72 hours. If you still require working capital this month, take 1 minute to finalize your submission.\n\nFinalize Application: ${resumeUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({
    to,
    subject: `Final Notice: Unfinished funding profile for ${cleanCompany} archiving soon`,
    html,
    text,
    tagType: 'mca-abandonment-3',
    companyName: cleanCompany
  });
}
