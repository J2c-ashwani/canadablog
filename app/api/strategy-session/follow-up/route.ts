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
    const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';

    if (!apiKey) {
      console.warn('Strategy session follow-up skipped because RESEND_API_KEY is not set.');
      return NextResponse.json({ success: false, skipped: true });
    }

    const firstName = name.split(' ')[0] || 'there';
    const consultationUrl = 'https://www.fsidigital.ca/consultation?source=follow-up';
    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;max-width:620px">
        <div style="display:none;max-height:0;overflow:hidden;color:transparent">I saw your funding inquiry and wanted to check whether you had a question before booking.</div>
        <p>Hi ${firstName},</p>
        <p>I saw that you submitted your business funding details on FSI Digital, but did not finish booking your private strategy session.</p>
        <p>Did the checkout page give you any trouble, or did you have a quick question about eligibility before booking?</p>
        <p>If you are ready, you can secure your 30-minute Funding Strategy Session here:</p>
        <p><a href="${consultationUrl}" style="display:inline-block;background:#111827;color:#ffffff;padding:12px 18px;border-radius:6px;text-decoration:none;font-weight:bold">Book Strategy Session - $199</a></p>
        <p>The session includes 2 hours of pre-call desk research, a personalized Business Funding Roadmap, your top eligible program matches, and a private Google Meet call to plan next steps.</p>
        <p>If our pre-call research shows your business is not a fit for any active grant, loan, or tax-credit options, we refund the $199 session fee immediately. We do not guarantee funding approval.</p>
        <p>Best,<br/>Ashwani<br/>FSI Digital<br/><a href="mailto:${replyToEmail}" style="color:#2563eb">${replyToEmail}</a></p>
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
        reply_to: replyToEmail,
        subject: 'Quick question about your funding inquiry',
        html,
        text: `Hi ${firstName},

I saw that you submitted your business funding details on FSI Digital, but did not finish booking your private strategy session.

Did the checkout page give you any trouble, or did you have a quick question about eligibility before booking?

If you are ready, you can secure your 30-minute Funding Strategy Session here:
${consultationUrl}

The session includes 2 hours of pre-call desk research, a personalized Business Funding Roadmap, your top eligible program matches, and a private Google Meet call to plan next steps.

If our pre-call research shows your business is not a fit for any active grant, loan, or tax-credit options, we refund the $199 session fee immediately. We do not guarantee funding approval.

Best,
Ashwani
FSI Digital
${replyToEmail}

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
