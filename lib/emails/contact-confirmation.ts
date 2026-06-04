type ContactConfirmationInput = {
  to: string;
  name: string;
  category: string;
  messageSnippet: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getFirstName(name: string) {
  return escapeHtml(name.split(' ')[0] || 'there');
}

function truncateMessage(message: string, maxLength = 200) {
  const clean = message.replace(/\n+/g, ' ').trim();
  if (clean.length <= maxLength) return escapeHtml(clean);
  return escapeHtml(clean.slice(0, maxLength).trim()) + '…';
}

function buildHtml({
  firstName,
  category,
  messageSnippet,
  replyToEmail,
}: {
  firstName: string;
  category: string;
  messageSnippet: string;
  replyToEmail: string;
}) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.7;color:#111827;max-width:620px">
      <div style="display:none;max-height:0;overflow:hidden;color:transparent">We received your funding question — here's a copy for your records.</div>

      <p>Hi ${firstName},</p>

      <p>Thank you for reaching out to FSI Digital. We have received your message and a member of our team will review it.</p>

      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 18px 20px; margin: 20px 0;">
        <p style="margin: 0 0 8px 0; font-size: 11px; color: #047857; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Your Request</p>
        <p style="margin: 0 0 8px 0; font-size: 15px; color: #064e3b;">
          <strong>Category:</strong> ${escapeHtml(category)}
        </p>
        <div style="font-size: 14px; color: #047857; font-style: italic; background-color: #ffffff; border-left: 3px solid #10b981; padding: 8px 12px; margin: 8px 0 0 0; border-radius: 4px; line-height: 1.5;">
          "${messageSnippet}"
        </div>
      </div>

      <p><strong>What happens next:</strong></p>
      <ul style="padding-left:20px;color:#334155">
        <li>Our team typically responds within <strong>24–48 hours</strong>.</li>
        <li>If you need to add any details, simply reply to this email.</li>
      </ul>

      <p>Best regards,<br/>Ashwani<br/>FSI Digital<br/><a href="mailto:${replyToEmail}" style="color:#2563eb">${replyToEmail}</a></p>
    </div>
  `;
}

function buildText({
  firstName,
  category,
  messageSnippet,
  replyToEmail,
}: {
  firstName: string;
  category: string;
  messageSnippet: string;
  replyToEmail: string;
}) {
  return `Hi ${firstName},

Thank you for reaching out to FSI Digital. We have received your message and a member of our team will review it.

Your request:
Category: ${category}
"${messageSnippet}"

What happens next:
- Our team typically responds within 24–48 hours.
- If you need to add any details, simply reply to this email.

Best regards,
Ashwani
FSI Digital
${replyToEmail}`;
}

export async function sendContactConfirmation({
  to,
  name,
  category,
  messageSnippet,
}: ContactConfirmationInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'FSI Digital <hello@fsidigital.ca>';
  const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';

  if (!apiKey) {
    console.warn('Contact confirmation email skipped — RESEND_API_KEY is not set.');
    return { success: false, skipped: true };
  }

  const firstName = getFirstName(name);
  const snippet = truncateMessage(messageSnippet);

  const html = buildHtml({ firstName, category, messageSnippet: snippet, replyToEmail });
  const text = buildText({ firstName, category, messageSnippet: snippet, replyToEmail });

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
        subject: `We received your message, ${firstName}`,
        html,
        text,
        tags: [
          { name: 'type', value: 'contact-confirmation' },
          { name: 'category', value: category.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 50) },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Contact confirmation email failed:', errorText);
      return { success: false, error: errorText };
    }

    return { success: true };
  } catch (error) {
    console.error('Contact confirmation email error:', error);
    return { success: false, error: String(error) };
  }
}
