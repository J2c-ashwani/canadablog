import { cleanCompanyName, getFirstName, sendEmail } from '@/lib/emails/mailer';

export interface MCAReadinessParams {
  to: string;
  name?: string;
  companyName?: string;
  province?: string;
  recoveryToken: string;
}

function buildMessage(input: MCAReadinessParams, variant: 1 | 2 | 3) {
  const firstName = getFirstName(input.name);
  const company = cleanCompanyName(input.companyName) || 'your business';
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca').replace(/\/$/, '');
  const url = `${origin}/priority-processing?t=${encodeURIComponent(input.recoveryToken)}`;
  const subjects = {
    1: `Application received — optional readiness report for ${company}`,
    2: `A practical underwriting-preparation checklist for ${company}`,
    3: `Your optional MCA readiness report remains available`,
  };
  const introductions = {
    1: `We received the business-funding application for <strong>${company}</strong>.`,
    2: `Before underwriting, it helps to confirm that the requested amount is proportionate to current revenue and that the document pack is complete.`,
    3: `Your application remains active. If useful, the optional self-serve readiness report is still available from your private application link.`,
  };
  const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#334155;line-height:1.6"><h2 style="color:#0f172a">FSI Digital</h2><p>Hi ${firstName},</p><p>${introductions[variant]}</p><div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:18px;margin:22px 0"><strong>MCA Funding Readiness Report — CAD $49 one time</strong><ul><li>0–100 score from declared application data</li><li>Funding-request-to-monthly-revenue ratio</li><li>Recorded document-count check</li><li>Underwriting preparation checklist</li></ul></div><p><a href="${url}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:13px 22px;border-radius:8px;font-weight:700">View the optional report →</a></p><p style="font-size:12px;color:#64748b">Transparent scope: this automated report does not inspect bank-statement contents, make a credit decision, or guarantee funding. Your application remains active whether or not you purchase it.</p></div>`;
  const text = `Hi ${firstName},\n\n${variant === 1 ? `We received the business-funding application for ${company}.` : variant === 2 ? 'Before underwriting, it helps to check the requested amount against current revenue and confirm the document pack is complete.' : 'Your application remains active, and the optional readiness report is still available.'}\n\nMCA Funding Readiness Report — CAD $49 one time:\n- 0–100 score from declared application data\n- Funding-request ratio\n- Recorded document-count check\n- Preparation checklist\n\n${url}\n\nThis automated report does not inspect bank-statement contents, make a credit decision, or guarantee funding.`;
  return { subject: subjects[variant], html, text, company };
}

async function sendVariant(input: MCAReadinessParams, variant: 1 | 2 | 3) {
  const message = buildMessage(input, variant);
  return sendEmail({
    to: input.to,
    subject: message.subject,
    html: message.html,
    text: message.text,
    tagType: `mca-readiness-${variant}`,
    companyName: message.company,
  });
}

export function sendMCAReadinessEmail1(input: MCAReadinessParams) { return sendVariant(input, 1); }
export function sendMCAReadinessEmail2(input: MCAReadinessParams) { return sendVariant(input, 2); }
export function sendMCAReadinessEmail3(input: MCAReadinessParams) { return sendVariant(input, 3); }
