import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || '').trim();
    const name = String(body.name || '').trim();
    const source = String(body.source || 'lead-form');

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'FSI Digital <hello@fsidigital.ca>';

    if (!apiKey) {
      console.warn('Strategy session follow-up skipped because RESEND_API_KEY is not set.');
      return NextResponse.json({ success: false, skipped: true });
    }

    const firstName = name.split(' ')[0] || 'there';
    const consultationUrl = 'https://www.fsidigital.ca/consultation?source=follow-up';
    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;max-width:620px">
        <p>Hi ${firstName},</p>
        <p>You recently submitted your business funding details on FSI Digital.</p>
        <p>If you want help choosing the strongest grant, loan, or tax-credit path, you can book a private 30-minute Funding Strategy Session here:</p>
        <p><a href="${consultationUrl}" style="display:inline-block;background:#111827;color:#ffffff;padding:12px 18px;border-radius:6px;text-decoration:none;font-weight:bold">Book Strategy Session - $199</a></p>
        <p>The session includes a practical review of your business profile, eligibility risks, strongest funding options, and next steps. We do not guarantee funding approval.</p>
        <p>Regards,<br/>Ashwani<br/>FSI Digital</p>
        <p style="font-size:12px;color:#6b7280">If this is not useful, reply "unsubscribe" and we will stop sending follow-ups.</p>
      </div>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject: 'Your funding strategy session link',
        html,
        text: `Hi ${firstName},

You recently submitted your business funding details on FSI Digital.

If you want help choosing the strongest grant, loan, or tax-credit path, you can book a private 30-minute Funding Strategy Session here:
${consultationUrl}

The session includes a practical review of your business profile, eligibility risks, strongest funding options, and next steps. We do not guarantee funding approval.

Regards,
Ashwani
FSI Digital

If this is not useful, reply "unsubscribe" and we will stop sending follow-ups.`,
        tags: [
          { name: 'source', value: source.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 50) },
          { name: 'type', value: 'strategy-session-follow-up' },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend strategy session follow-up failed:', errorText);
      return NextResponse.json({ success: false }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Strategy session follow-up error:', error);
    return NextResponse.json({ error: 'Unable to send follow-up.' }, { status: 500 });
  }
}
