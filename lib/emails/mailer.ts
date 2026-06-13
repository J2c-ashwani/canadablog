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

export async function sendEmail({
  // Trigger redeploy to load newly approved Vercel env variables
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
}) {
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

  const senderApiKey = process.env.SENDER_API_KEY;

  if (senderApiKey) {
    const defaultEmail = process.env.SENDER_FROM_EMAIL || 'partners@fsidigital.ca';
    const defaultName = process.env.SENDER_FROM_NAME || 'FSI Digital';

    const parseAddress = (addr?: string, defaultAddrEmail = defaultEmail, defaultAddrName = defaultName) => {
      if (!addr) return { email: defaultAddrEmail, name: defaultAddrName };
      const match = addr.match(/^(?:"?([^"]*)"?\s)?<?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})>?$/);
      if (match) {
        return {
          name: match[1]?.trim() || defaultAddrName,
          email: match[2]?.trim() || defaultAddrEmail
        };
      }
      return { email: addr, name: defaultAddrName };
    };

    const fromParsed = parseAddress(from);
    const toParsed = parseAddress(to, to, 'Founder');

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
        console.error(`Sender.net email failed [${tagType}]:`, errorText);
        return { success: false, error: errorText };
      }

      console.log(`✉️ Email successfully sent to ${toParsed.email} via Sender.net [${tagType}]`);
      return { success: true };
    } catch (error) {
      console.error(`Sender.net email exception [${tagType}]:`, error);
      return { success: false, error: String(error) };
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = from || process.env.RESEND_FROM_EMAIL || 'FSI Digital <hello@fsidigital.ca>';
  const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL || 'advisors@fsidigital.ca';

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

    return { success: true };
  } catch (error) {
    console.error(`Resend email exception [${tagType}]:`, error);
    return { success: false, error: String(error) };
  }
}
