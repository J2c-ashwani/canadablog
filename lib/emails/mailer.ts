export function escapeHtml(value: string) {
  if (!value) return '';
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function extractEmailAddress(value?: string): string {
  if (!value) return '';
  const angleBracketMatch = value.match(/<\s*([^<>\s]+@[^<>\s]+)\s*>/);
  const candidate = (angleBracketMatch?.[1] || value).trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate) ? candidate : '';
}

const PLACEHOLDERS = new Set([
  'n/a', 'n/a.', 'not provided', 'not_provided', 'not-provided',
  'unknown', 'none', 'null', 'undefined', 'n/a province', 'na',
  'other', 'blank', 'not_specified', 'not specified'
]);

export function getFirstName(name?: string): string {
  if (!name) return 'Founder';
  const cleaned = name.trim();
  const lower = cleaned.toLowerCase();
  if (PLACEHOLDERS.has(lower) || lower.startsWith('n/a') || lower.startsWith('not ')) {
    return 'Founder';
  }
  const firstWord = cleaned.split(/\s+/)[0];
  if (PLACEHOLDERS.has(firstWord.toLowerCase())) {
    return 'Founder';
  }
  return escapeHtml(firstWord);
}

export function cleanCompanyName(companyName?: string): string {
  if (!companyName) return '';
  const cleaned = companyName.trim();
  const lower = cleaned.toLowerCase();
  if (PLACEHOLDERS.has(lower) || lower.startsWith('n/a') || lower.startsWith('not ')) {
    return '';
  }
  return escapeHtml(cleaned);
}

export function cleanRegionName(region?: string): string {
  if (!region) return 'Canada';
  const cleaned = region.trim();
  const lower = cleaned.toLowerCase();
  if (PLACEHOLDERS.has(lower) || lower.startsWith('n/a') || lower.startsWith('not ')) {
    return 'Canada';
  }

  const provinceMap: Record<string, string> = {
    'on': 'Ontario',
    'ontario': 'Ontario',
    'ab': 'Alberta',
    'alberta': 'Alberta',
    'bc': 'British Columbia',
    'british columbia': 'British Columbia',
    'qc': 'Quebec',
    'quebec': 'Quebec',
    'mb': 'Manitoba',
    'manitoba': 'Manitoba',
    'sk': 'Saskatchewan',
    'saskatchewan': 'Saskatchewan',
    'ns': 'Nova Scotia',
    'nova scotia': 'Nova Scotia',
    'nb': 'New Brunswick',
    'new brunswick': 'New Brunswick',
    'nl': 'Newfoundland and Labrador',
    'newfoundland': 'Newfoundland and Labrador',
    'pe': 'Prince Edward Island',
    'prince edward island': 'Prince Edward Island',
    'yt': 'Yukon',
    'nt': 'Northwest Territories',
    'nu': 'Nunavut',
    'ca': 'Canada',
    'canada': 'Canada',
    'us': 'US',
    'usa': 'US'
  };

  return provinceMap[lower] || escapeHtml(cleaned);
}

export function cleanIndustryName(industry?: string): string {
  if (!industry) return 'business';
  const cleaned = industry.trim();
  const lower = cleaned.toLowerCase();
  if (PLACEHOLDERS.has(lower) || lower.startsWith('n/a') || lower.startsWith('not ')) {
    return 'business';
  }
  return escapeHtml(cleaned);
}

async function sendViaBrevo({
  to,
  subject,
  html,
  text,
  tagType,
  from
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
  tagType: string;
  from?: string;
}): Promise<{ success: boolean; error?: string; skipped?: boolean; provider?: string; providerMessageId?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return { success: false, skipped: true };

  const fromEmail = extractEmailAddress(
    process.env.BREVO_FROM_EMAIL || from || process.env.RESEND_FROM_EMAIL
  );
  if (!fromEmail) {
    return { success: false, skipped: true, error: 'No configured sender address is available for Brevo.' };
  }
  const fromName = process.env.BREVO_FROM_NAME || 'FSI Digital';
  const replyToEmail = process.env.BREVO_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: fromName, email: fromEmail },
        to: [{ email: to }],
        replyTo: { email: replyToEmail, name: fromName },
        subject,
        htmlContent: html,
        textContent: text,
        tags: [tagType],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`Brevo email failed [${tagType}]: ${errorText}`);
      return { success: false, error: errorText };
    }

    const payload = await response.json().catch(() => ({})) as { messageId?: string };
    if (!payload.messageId) return { success: false, error: 'Brevo accepted the request without a message ID.' };
    console.log(`✉️ Email accepted by Brevo for ${to} [${tagType}]`);
    return { success: true, provider: 'brevo', providerMessageId: payload.messageId };
  } catch (error) {
    console.warn(`Brevo email exception [${tagType}]: ${error}`);
    return { success: false, error: String(error) };
  }
}

async function sendViaResend({
  to,
  subject,
  html,
  text,
  tagType,
  companyName,
  from
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
  tagType: string;
  companyName?: string;
  from?: string;
}): Promise<{ success: boolean; error?: string; skipped?: boolean; provider?: string; providerMessageId?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = from || process.env.RESEND_FROM_EMAIL || 'FSI Digital <hello@fsidigital.ca>';
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
          { name: 'company', value: (cleanCompanyName(companyName) || 'Unknown').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 50) },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Resend email failed [${tagType}]:`, errorText);
      return { success: false, error: errorText };
    }

    const payload = await response.json().catch(() => ({})) as { id?: string };
    if (!payload.id) return { success: false, error: 'Resend accepted the request without a message ID.' };
    console.log(`✉️ Email accepted by Resend for ${to} [${tagType}]`);
    return { success: true, provider: 'resend', providerMessageId: payload.id };
  } catch (error) {
    console.error(`Resend email exception [${tagType}]:`, error);
    return { success: false, error: String(error) };
  }
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
  tagType,
  companyName,
  from,
  forceResend = false
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
  tagType: string;
  companyName?: string;
  from?: string;
  forceResend?: boolean;
}): Promise<{ success: boolean; error?: string; skipped?: boolean; provider?: string; providerMessageId?: string }> {
  // Check for global mock (used to compile previews in Next.js ESM context)
  if (typeof global !== "undefined" && (global as any).mockSendEmailActive) {
    if ((global as any).mockSendEmailCallback) {
      try {
        (global as any).mockSendEmailCallback({ to, subject, html, text, tagType, companyName, from });
      } catch (e) {
        console.error("Error in mockSendEmailCallback:", e);
      }
    }
    return { success: true, provider: 'mock' };
  }

  // 1. PRIMARY: Always try Resend first (Clean, unbranded, professional signature)
  const resendResult = await sendViaResend({ to, subject, html, text, tagType, companyName, from });
  if (resendResult.success) return resendResult;

  // 2. FALLBACK 1: If Resend fails, skipped, or daily quota (100) is reached -> Failover to Brevo
  if (process.env.BREVO_API_KEY) {
    console.log(`🔄 Resend skipped/error encountered. Failing over to Brevo for ${to}...`);
    const brevoResult = await sendViaBrevo({ to, subject, html, text, tagType, from });
    if (brevoResult.success) return brevoResult;
  }

  // Resend and Brevo are the only active production providers. Do not turn an
  // inactive third-party credential into a false delivery attempt.
  return {
    success: false,
    error: resendResult.error || 'Resend and Brevo could not accept the message.',
  };
}
