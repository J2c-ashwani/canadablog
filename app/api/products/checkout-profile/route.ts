import { NextResponse, type NextRequest } from 'next/server';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { isLoginToken } from '@/lib/auth/subscriber-tokens';
import { applyRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Resolves an existing consented lead into checkout-prefill fields. */
export async function GET(request: NextRequest) {
  const limit = await applyRateLimit(request, 30, 60 * 60 * 1000);
  if (limit.isLimited) return limit.response;

  const token = request.nextUrl.searchParams.get('token') || '';
  if (!token) return NextResponse.json({ error: 'Token is required.' }, { status: 400 });

  const subscribers = await SubscriberRepository.getAllSubscribers(true);
  const subscriber = subscribers.find((candidate) => isLoginToken(token, candidate.loginToken));
  if (!subscriber) return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 404 });

  return NextResponse.json({
    success: true,
    profile: {
      email: subscriber.email,
      name: subscriber.name || '',
      province: subscriber.region || '',
      industry: subscriber.industry || '',
      revenue: subscriber.businessStage || '',
      goal: subscriber.fundingPurpose || '',
      company: subscriber.companyName || '',
    },
  }, {
    headers: { 'Cache-Control': 'private, no-store, max-age=0' },
  });
}
