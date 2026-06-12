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

    return { success: true };
  } catch (error) {
    console.error(`Resend email exception [${tagType}]:`, error);
    return { success: false, error: String(error) };
  }
}
