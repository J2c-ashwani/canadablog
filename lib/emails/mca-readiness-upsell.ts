import { sendEmail, getFirstName, cleanCompanyName } from "./mailer";

export interface MCAReadinessParams {
  to: string;
  name?: string;
  companyName?: string;
  province?: string;
  applicationId?: string;
}

// ── Email #1: Immediate Post-Submission (Confidence & Value) ──
export async function sendMCAReadinessEmail1({
  to,
  name,
  companyName,
  applicationId
}: MCAReadinessParams) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);
  const reviewUrl = `https://www.fsidigital.ca/priority-processing?id=${encodeURIComponent(applicationId || '')}&email=${encodeURIComponent(to)}`;

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
            We have received your business funding application for <strong>${cleanCompany}</strong>.
          </p>

          <p style="margin: 0 0 16px 0;">
            Many funding delays and lender requests for additional information arise from incomplete documentation, missing pages, or deposit formatting inconsistencies.
          </p>

          <div style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;margin:24px 0;">
            <h4 style="margin:0 0 12px 0;color:#166534;font-size:15px;font-weight:700;">Funding Readiness Review™ ($49 CAD)</h4>
            <p style="margin:0 0 12px 0;font-size:13px;color:#15803d;line-height:1.5;">
              Have an application specialist audit your file before it is sent to Canadian lenders. We verify:
            </p>
            <ul style="margin:0;padding-left:18px;font-size:13px;color:#166534;line-height:1.6;">
              <li>Missing bank statement pages & formatting</li>
              <li>NSF & overdraft risk patterns</li>
              <li>Monthly deposit consistency & seasonal trends</li>
              <li>Business registration & entity information accuracy</li>
            </ul>
          </div>

          <div style="text-align:center;margin:28px 0;">
            <a href="${reviewUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
              Request Funding Readiness Review™ ($49 CAD) &rarr;
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

  const text = `Hi ${firstName},\n\nWe have received your business funding application for ${cleanCompany}.\n\nMany funding delays and lender requests for additional information arise from incomplete documentation, missing pages, or deposit formatting inconsistencies.\n\nFunding Readiness Review™ ($49 CAD):\n- Missing bank statement pages check\n- NSF & overdraft risk pattern check\n- Monthly deposit consistency check\n- Business info accuracy check\n\nRequest Funding Readiness Review™: ${reviewUrl}\n\nBest regards,\nFunding Intelligence Team\nFSI Digital Canada`;

  return sendEmail({
    to,
    subject: `Application Received: Would you like an expert to review ${cleanCompany}'s file before lender submission?`,
    html,
    text,
    tagType: 'mca-readiness-1',
    companyName: cleanCompany
  });
}

// ── Email #2: 12 Hours Post-Submission (Educational Value) ──
export async function sendMCAReadinessEmail2({
  to,
  name,
  companyName,
  applicationId
}: MCAReadinessParams) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);
  const reviewUrl = `https://www.fsidigital.ca/priority-processing?id=${encodeURIComponent(applicationId || '')}&email=${encodeURIComponent(to)}`;

  const html = `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <div style="padding-bottom:18px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;text-align:left;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">FSI <span style="color:#0284c7;">Digital</span></span>
        </div>

        <div style="font-size:15px;color:#334155;line-height:1.6;text-align:left;">
          <p style="font-weight:600;margin-top:0;margin-bottom:16px;">Hi ${firstName},</p>
          
          <p style="margin: 0 0 16px 0;">
            Before your application for <strong>${cleanCompany}</strong> is reviewed by Canadian funding partners, here are 3 common areas underwriters check:
          </p>

          <ol style="margin:0 0 20px 0;padding-left:20px;line-height:1.6;font-size:14px;color:#334155;">
            <li style="margin-bottom:8px;"><strong>Complete PDF Pages:</strong> Underwriters review all bank statement pages for missing summary tables.</li>
            <li style="margin-bottom:8px;"><strong>NSF & Overdraft Patterns:</strong> Recent transaction flags trigger additional lender inquiries.</li>
            <li style="margin-bottom:8px;"><strong>Deposit Frequency:</strong> Regular deposit volume helps maintain calculated funding brackets.</li>
          </ol>

          <p style="margin: 0 0 16px 0;">
            Our optional <strong>Funding Readiness Review™ ($49 CAD)</strong> audits your financial files against these parameters before lender submission.
          </p>

          <div style="text-align:center;margin:28px 0;">
            <a href="${reviewUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
              Audit Your File for $49 CAD &rarr;
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

  const text = `Hi ${firstName},\n\nBefore your application for ${cleanCompany} is reviewed by Canadian funding partners, here are 3 common areas underwriters check:\n1. Complete PDF Pages\n2. NSF & Overdraft Patterns\n3. Deposit Frequency\n\nOur optional Funding Readiness Review™ ($49 CAD) audits your financial files against these parameters before lender submission.\n\nAudit Your File: ${reviewUrl}\n\nBest regards,\nFunding Intelligence Team\nFSI Digital Canada`;

  return sendEmail({
    to,
    subject: `Underwriting checklist for ${cleanCompany}`,
    html,
    text,
    tagType: 'mca-readiness-2',
    companyName: cleanCompany
  });
}

// ── Email #3: 72 Hours Post-Submission (Final Notice) ──
export async function sendMCAReadinessEmail3({
  to,
  name,
  companyName,
  applicationId
}: MCAReadinessParams) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);
  const reviewUrl = `https://www.fsidigital.ca/priority-processing?id=${encodeURIComponent(applicationId || '')}&email=${encodeURIComponent(to)}`;

  const html = `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <div style="padding-bottom:18px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;text-align:left;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">FSI <span style="color:#0284c7;">Digital</span></span>
        </div>

        <div style="font-size:15px;color:#334155;line-height:1.6;text-align:left;">
          <p style="font-weight:600;margin-top:0;margin-bottom:16px;">Hi ${firstName},</p>
          
          <p style="margin: 0 0 16px 0;">
            This is a final courtesy notice regarding the pre-submission review window for <strong>${cleanCompany}</strong>.
          </p>

          <p style="margin: 0 0 16px 0;">
            If you would like a funding specialist to personally review your business financial files for completeness before partner forwarding, your pre-submission audit window remains open today.
          </p>

          <div style="text-align:center;margin:28px 0;">
            <a href="${reviewUrl}" style="background-color:#0f172a;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
              Request Pre-Submission Review ($49 CAD) &rarr;
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

  const text = `Hi ${firstName},\n\nThis is a final courtesy notice regarding the pre-submission review window for ${cleanCompany}.\n\nIf you would like a funding specialist to personally review your business financial files for completeness before partner forwarding, your pre-submission audit window remains open today.\n\nRequest Pre-Submission Review: ${reviewUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({
    to,
    subject: `Final Call: Pre-submission file review for ${cleanCompany}`,
    html,
    text,
    tagType: 'mca-readiness-3',
    companyName: cleanCompany
  });
}
