import type { StrategyRecoveryEmailStage } from '@/lib/strategy-session/recovery-store';

type StrategyRecoveryEmailInput = {
  to: string;
  name?: string;
  source?: string;
  stage: StrategyRecoveryEmailStage;
  recoveryId?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getFirstName(name?: string) {
  return escapeHtml((name || '').split(' ')[0] || 'there');
}

function baseHtml({ firstName, body, cta, replyToEmail }: { firstName: string; body: string; cta: string; replyToEmail: string }) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;max-width:620px">
      <div style="display:none;max-height:0;overflow:hidden;color:transparent">Your FSI Digital funding strategy session follow-up.</div>
      <p>Hi ${firstName},</p>
      ${body}
      <p><a href="${cta}" style="display:inline-block;background:#111827;color:#ffffff;padding:12px 18px;border-radius:6px;text-decoration:none;font-weight:bold">Book Strategy Session - $199</a></p>
      <p>Best regards,<br/>Ashwani<br/>FSI Digital<br/><a href="mailto:${replyToEmail}" style="color:#2563eb">${replyToEmail}</a></p>
      <p style="font-size:12px;color:#6b7280">If this is not useful, reply "unsubscribe" and we will stop sending follow-ups.</p>
    </div>
  `;
}

function getEmailContent(stage: StrategyRecoveryEmailStage, firstName: string, consultationUrl: string, replyToEmail: string) {
  if (stage === 'value_24h') {
    return {
      subject: 'Your funding roadmap is still available',
      html: baseHtml({
        firstName,
        cta: consultationUrl,
        replyToEmail,
        body: `
          <p>Your funding profile is still waiting for review.</p>
          <p>The $199 Strategy Session is designed to turn your submitted details into a practical funding action plan:</p>
          <ul>
            <li>2 hours of pre-call desk research on your business, industry, and region.</li>
            <li>A personalized Business Funding Roadmap across grants, loans, and tax credits.</li>
            <li>Your top eligible program matches ranked by fit and next action.</li>
            <li>A private Google Meet call to decide what to pursue first.</li>
          </ul>
          <p>You can secure your session here:</p>
        `,
      }),
      text: `Hi ${firstName},

Your funding profile is still waiting for review.

The $199 Strategy Session is designed to turn your submitted details into a practical funding action plan:
- 2 hours of pre-call desk research on your business, industry, and region.
- A personalized Business Funding Roadmap across grants, loans, and tax credits.
- Your top eligible program matches ranked by fit and next action.
- A private Google Meet call to decide what to pursue first.

You can secure your session here:
${consultationUrl}

Best regards,
Ashwani
FSI Digital
${replyToEmail}

If this is not useful, reply "unsubscribe" and we will stop sending follow-ups.`,
    };
  }

  if (stage === 'objection_3d') {
    return {
      subject: 'What if your business does not qualify?',
      html: baseHtml({
        firstName,
        cta: consultationUrl,
        replyToEmail,
        body: `
          <p>A common question before booking is: "What if my business does not qualify?"</p>
          <p>That is exactly why we do the pre-call research first. Before your private call, we review your industry, region, entity type, and funding goals against active grant, loan, and tax-credit options.</p>
          <p>If our research shows your business is not a fit for any active funding options, we refund the $199 session fee immediately. No pressure and no funding approval guarantee.</p>
          <p>If you want us to complete that review, you can book here:</p>
        `,
      }),
      text: `Hi ${firstName},

A common question before booking is: "What if my business does not qualify?"

That is exactly why we do the pre-call research first. Before your private call, we review your industry, region, entity type, and funding goals against active grant, loan, and tax-credit options.

If our research shows your business is not a fit for any active funding options, we refund the $199 session fee immediately. No pressure and no funding approval guarantee.

If you want us to complete that review, you can book here:
${consultationUrl}

Best regards,
Ashwani
FSI Digital
${replyToEmail}

If this is not useful, reply "unsubscribe" and we will stop sending follow-ups.`,
    };
  }

  if (stage === 'final_7d') {
    return {
      subject: 'Should I close your funding review file?',
      html: baseHtml({
        firstName,
        cta: consultationUrl,
        replyToEmail,
        body: `
          <p>I did not want to keep following up if this is not a priority right now.</p>
          <p>If you still want a private funding roadmap, you can book the Strategy Session and we will prepare the research before your call.</p>
          <p>If now is not the right time, no problem. You can reply with any question, or reply "unsubscribe" and we will close the follow-up.</p>
          <p>Booking link:</p>
        `,
      }),
      text: `Hi ${firstName},

I did not want to keep following up if this is not a priority right now.

If you still want a private funding roadmap, you can book the Strategy Session and we will prepare the research before your call.

If now is not the right time, no problem. You can reply with any question, or reply "unsubscribe" and we will close the follow-up.

Booking link:
${consultationUrl}

Best regards,
Ashwani
FSI Digital
${replyToEmail}

If this is not useful, reply "unsubscribe" and we will stop sending follow-ups.`,
    };
  }

  return {
    subject: 'Quick question about your funding inquiry',
    html: baseHtml({
      firstName,
      cta: consultationUrl,
      replyToEmail,
      body: `
        <p>I saw that you submitted your business funding details on FSI Digital, but did not finish booking your private strategy session.</p>
        <p>Did the checkout page give you any trouble, or did you have a quick question about eligibility before booking?</p>
        <p>If you are ready, you can secure your 30-minute Funding Strategy Session here:</p>
        <p>The session includes 2 hours of pre-call desk research, a personalized Business Funding Roadmap, your top eligible program matches, and a private Google Meet call to plan next steps.</p>
        <p>If our pre-call research shows your business is not a fit for any active grant, loan, or tax-credit options, we refund the $199 session fee immediately. We do not guarantee funding approval.</p>
      `,
    }),
    text: `Hi ${firstName},

I saw that you submitted your business funding details on FSI Digital, but did not finish booking your private strategy session.

Did the checkout page give you any trouble, or did you have a quick question about eligibility before booking?

If you are ready, you can secure your 30-minute Funding Strategy Session here:
${consultationUrl}

The session includes 2 hours of pre-call desk research, a personalized Business Funding Roadmap, your top eligible program matches, and a private Google Meet call to plan next steps.

If our pre-call research shows your business is not a fit for any active grant, loan, or tax-credit options, we refund the $199 session fee immediately. We do not guarantee funding approval.

Best regards,
Ashwani
FSI Digital
${replyToEmail}

If this is not useful, reply "unsubscribe" and we will stop sending follow-ups.`,
  };
}

export async function sendStrategyRecoveryEmail({
  to,
  name,
  source = 'strategy-session-recovery',
  stage,
  recoveryId,
}: StrategyRecoveryEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'FSI Digital <hello@fsidigital.ca>';
  const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';

  if (!apiKey) {
    console.warn('Strategy session recovery email skipped because RESEND_API_KEY is not set.');
    return { success: false, skipped: true };
  }

  const consultationParams = new URLSearchParams({ source: stage });
  if (recoveryId) {
    consultationParams.set('rid', recoveryId);
  }
  const consultationUrl = `https://www.fsidigital.ca/consultation?${consultationParams.toString()}`;
  const firstName = getFirstName(name);
  const content = getEmailContent(stage, firstName, consultationUrl, replyToEmail);

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
      subject: content.subject,
      html: content.html,
      text: content.text,
      tags: [
        { name: 'source', value: source.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 50) },
        { name: 'type', value: 'strategy-session-recovery' },
        { name: 'stage', value: stage },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Resend strategy session recovery email failed:', errorText);
    return { success: false, error: errorText };
  }

  return { success: true };
}
