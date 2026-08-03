export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function getFirstName(name?: string) {
  return name ? escapeHtml(name.split(' ')[0]) : 'Founder';
}

export function cleanCompanyName(companyName?: string): string {
  if (!companyName) return '';
  const cleaned = companyName.trim();
  const lower = cleaned.toLowerCase();
  const placeholders = [
    'not provided', 'n/a', 'not_provided', 'unknown', 'none', 'null', 'undefined',
    'not-provided', 'not provided.', 'n/a.', 'not_provided.', 'unknown.', 'none.'
  ];
  if (placeholders.includes(lower)) return '';
  return cleaned;
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
}): Promise<{ success: boolean; error?: string; skipped?: boolean }> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return { success: false, skipped: true };

  const fromEmail = process.env.BREVO_FROM_EMAIL || 'hello@fsidigital.ca';
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

    console.log(`✉️ Email successfully sent to ${to} via Brevo fallback [${tagType}]`);
    return { success: true };
  } catch (error) {
    console.warn(`Brevo email exception [${tagType}]: ${error}`);
    return { success: false, error: String(error) };
  }
}

async function sendViaSenderNet({
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
}): Promise<{ success: boolean; error?: string; skipped?: boolean }> {
  const senderApiKey = process.env.SENDER_API_KEY;
  if (!senderApiKey) return { success: false, skipped: true };

  const defaultEmail = process.env.SENDER_FROM_EMAIL || 'partners@fsidigital.ca';
  const defaultName = process.env.SENDER_FROM_NAME || 'FSI Digital';

  const parseAddress = (addr?: string) => {
    if (!addr) return { email: defaultEmail, name: defaultName };
    const match = addr.match(/^(?:"?([^"]*)"?\s)?<?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})>?$/);
    if (match) {
      return {
        name: match[1]?.trim() || defaultName,
        email: match[2]?.trim() || defaultEmail
      };
    }
    return { email: addr, name: defaultName };
  };

  const fromParsed = parseAddress(from);
  const toParsed = parseAddress(to);

  try {
    const response = await fetch('https://api.sender.net/v2/message/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${senderApiKey}`,
      },
      body: JSON.stringify({
        from: { email: fromParsed.email, name: fromParsed.name },
        to: { email: toParsed.email, name: toParsed.name },
        subject,
        html,
        text,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`Sender.net email failed [${tagType}]: ${errorText}`);
      return { success: false, error: errorText };
    }

    console.log(`✉️ Email successfully sent to ${toParsed.email} via Sender.net [${tagType}]`);
    return { success: true };
  } catch (error) {
    console.warn(`Sender.net email exception [${tagType}]: ${error}`);
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
}): Promise<{ success: boolean; error?: string; skipped?: boolean }> {
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
          { name: 'company', value: (companyName || 'Unknown').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 50) },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Resend email failed [${tagType}]:`, errorText);
      return { success: false, error: errorText };
    }

    console.log(`✉️ Email successfully sent to ${to} via Resend [${tagType}]`);
    return { success: true };
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
}): Promise<{ success: boolean; error?: string; skipped?: boolean }> {
  // Check for global mock (used to compile previews in Next.js ESM context)
  if (typeof global !== "undefined" && (global as any).mockSendEmailActive) {
    if ((global as any).mockSendEmailCallback) {
      try {
        (global as any).mockSendEmailCallback({ to, subject, html, text, tagType, companyName, from });
      } catch (e) {
        console.error("Error in mockSendEmailCallback:", e);
      }
    }
    return { success: true };
  }

  // 1. PRIMARY: Always try Resend first (Clean, unbranded, professional signature)
  const resendResult = await sendViaResend({ to, subject, html, text, tagType, companyName, from });
  if (resendResult.success) return resendResult;

  // 2. FALLBACK 1: If Resend fails or daily quota (100) is reached -> Failover to Brevo
  if (process.env.BREVO_API_KEY) {
    console.log(`🔄 Resend quota/error encountered. Failing over to Brevo for ${to}...`);
    const brevoResult = await sendViaBrevo({ to, subject, html, text, tagType, from });
    if (brevoResult.success) return brevoResult;
  }

  // 3. FALLBACK 2: Sender.net
  if (process.env.SENDER_API_KEY) {
    return sendViaSenderNet({ to, subject, html, text, tagType, from });
  }

  return resendResult;
}
