import { getFirstName, sendEmail } from '@/lib/emails/mailer';

type RecoveryInput = { to: string; name?: string; recoveryToken: string };

const MESSAGES = {
  1: {
    subject: 'Your optional MCA readiness report',
    opening: 'Your business-funding application was received successfully.',
    angle: 'If you want a structured preparation check, the self-serve report turns your declared application data into a readiness score and checklist.',
  },
  2: {
    subject: 'Compare your funding request with declared revenue',
    opening: 'A useful preparation step is comparing the requested amount with current monthly revenue.',
    angle: 'The self-serve report calculates that ratio, scores time in business and recorded document count, and explains each result.',
  },
  3: {
    subject: 'Your underwriting-preparation checklist',
    opening: 'Complete original PDFs and consistent business details can reduce avoidable follow-up questions during underwriting.',
    angle: 'The optional report gives you a practical checklist based on the information already declared in your application.',
  },
  4: {
    subject: 'Your MCA application remains active',
    opening: 'Your application remains active whether or not you purchase an information product.',
    angle: 'If the score and preparation checklist would be useful, your private self-serve report link remains available.',
  },
  5: {
    subject: 'Final reminder about your optional readiness report',
    opening: 'This is the last automated reminder in this sequence about the optional readiness report.',
    angle: 'There is no deadline or queue advantage. You can use the report if you want a structured review of declared data and preparation steps.',
  },
} as const;

async function sendRecovery(input: RecoveryInput, variant: keyof typeof MESSAGES) {
  const firstName = getFirstName(input.name);
  const message = MESSAGES[variant];
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca').replace(/\/$/, '');
  const checkoutUrl = `${origin}/priority-processing?t=${encodeURIComponent(input.recoveryToken)}`;
  const unsubscribeUrl = `${origin}/subscribe/unsubscribe`;
  const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#334155;line-height:1.6"><h2 style="color:#0f172a">FSI Digital</h2><p>Hi ${firstName},</p><p>${message.opening}</p><p>${message.angle}</p><div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px;margin:22px 0"><strong>MCA Funding Readiness Report — CAD $49 one time</strong><ul><li>0–100 score from declared monthly revenue, time in business, request amount, and recorded file count</li><li>Funding-request ratio</li><li>Underwriting preparation checklist</li><li>Instant private browser access after verified PayPal payment</li></ul></div><p><a href="${checkoutUrl}" style="display:inline-block;background:#2563eb;color:white;padding:13px 22px;text-decoration:none;border-radius:8px;font-weight:700">View my optional report →</a></p><p style="font-size:12px;color:#64748b">This automated report does not inspect bank-statement contents, make a credit decision, or guarantee funding. It does not accelerate or change your application’s place in any process.</p><p style="font-size:11px;color:#94a3b8"><a href="${unsubscribeUrl}" style="color:#64748b">Unsubscribe from these reminders</a></p></div>`;
  const text = `Hi ${firstName},\n\n${message.opening}\n\n${message.angle}\n\nMCA Funding Readiness Report — CAD $49 one time:\n- score from declared application data\n- funding-request ratio\n- recorded file-count check\n- preparation checklist\n\n${checkoutUrl}\n\nThe report does not inspect bank-statement contents, make a credit decision, guarantee funding, or accelerate the application.\n\nUnsubscribe: ${unsubscribeUrl}`;
  return sendEmail({ to: input.to, subject: message.subject, html, text, tagType: `mca-recovery-email${variant}` });
}

export function sendMCARecoveryEmail1(input: RecoveryInput) { return sendRecovery(input, 1); }
export function sendMCARecoveryEmail2(input: RecoveryInput) { return sendRecovery(input, 2); }
export function sendMCARecoveryEmail3(input: RecoveryInput) { return sendRecovery(input, 3); }
export function sendMCARecoveryEmail4(input: RecoveryInput) { return sendRecovery(input, 4); }
export function sendMCARecoveryEmail5(input: RecoveryInput) { return sendRecovery(input, 5); }
