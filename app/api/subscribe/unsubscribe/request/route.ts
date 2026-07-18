import { type NextRequest, NextResponse } from 'next/server';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { sendEmail } from '@/lib/emails/mailer';
import { isUnsubscribeToken } from '@/lib/auth/subscriber-tokens';
import { applyRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const limit = await applyRateLimit(request, 3, 15 * 60 * 1000);
  if (limit.isLimited) return limit.response;

  try {
    const { email } = await request.json();
    const normalizedEmail = String(email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    const subscriber = await SubscriberRepository.getSubscriberByEmail(normalizedEmail);
    if (subscriber && isUnsubscribeToken(subscriber.unsubscribeToken, subscriber.unsubscribeToken)) {
      const url = `https://www.fsidigital.ca/subscribe/unsubscribe?token=${encodeURIComponent(subscriber.unsubscribeToken)}`;
      await sendEmail({
        to: normalizedEmail,
        subject: 'Confirm your FSI Digital unsubscribe request',
        html: `<p>We received a request to unsubscribe this email address from FSI Digital alerts.</p><p><a href="${url}">Confirm unsubscribe</a></p><p>If you did not request this, you can ignore this email.</p>`,
        text: `Confirm your unsubscribe request: ${url}`,
        tagType: 'unsubscribe-confirmation',
      });
    }

    // Do not disclose whether the address is subscribed.
    return NextResponse.json({ success: true, message: 'If this address is subscribed, a confirmation link has been sent.' });
  } catch (error) {
    console.error('Unsubscribe request error:', error);
    return NextResponse.json({ error: 'Unable to process this request.' }, { status: 500 });
  }
}
