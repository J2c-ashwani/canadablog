import { type NextRequest, NextResponse } from 'next/server';
import {
  isLikelyAutomatedUserAgent,
  parseTrackedGrowthToken,
  recordGrowthActionEvent,
} from '@/lib/growth-os/action-attribution';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestedToken = request.nextUrl.searchParams.get('t') || '';
  const payload = parseTrackedGrowthToken(requestedToken);
  if (!payload) return NextResponse.redirect(new URL('/', request.url));
  const existingToken = request.cookies.get('fsi_growth_action_token')?.value || '';
  const existingPayload = parseTrackedGrowthToken(existingToken);
  // Internal navigation and house campaigns must not steal a still-current
  // affiliate referral. A later affiliate click remains free to replace it.
  const preserveAffiliate = existingPayload?.channel === 'affiliate' && payload.channel !== 'affiliate';
  const cookiePayload = preserveAffiliate ? existingPayload : payload;
  const cookieToken = preserveAffiliate ? existingToken : requestedToken;

  const destination = new URL(payload.target);
  destination.searchParams.set('go_action', payload.actionId);
  destination.searchParams.set('go_channel', payload.channel);
  destination.searchParams.set('go_campaign', payload.campaign);
  destination.searchParams.set('go_recipient', payload.recipientId);
  if (!destination.searchParams.has('utm_medium')) destination.searchParams.set('utm_medium', payload.channel);
  if (!destination.searchParams.has('utm_campaign')) destination.searchParams.set('utm_campaign', payload.campaign);

  const userAgent = String(request.headers.get('user-agent') || '').slice(0, 240);
  if (!isLikelyAutomatedUserAgent(userAgent)) {
    await recordGrowthActionEvent({
      eventId: `click:${payload.actionId}:${payload.recipientId}`,
      actionId: payload.actionId,
      channel: payload.channel,
      campaign: payload.campaign,
      recipientId: payload.recipientId,
      eventType: 'click',
      provider: 'first_party_redirect',
      providerMessageId: '',
      productId: '',
      revenueUSD: 0,
      revenueCAD: 0,
      mrrUSD: 0,
      referenceId: '',
      metadata: { targetPath: destination.pathname, userAgent },
    }).catch((error) => console.error('Growth action click could not be persisted:', error));
  }

  const response = NextResponse.redirect(destination);
  response.cookies.set('fsi_growth_action', JSON.stringify({
    actionId: cookiePayload.actionId,
    channel: cookiePayload.channel,
    campaign: cookiePayload.campaign,
    recipientId: cookiePayload.recipientId,
  }), {
    httpOnly: false,
    sameSite: 'lax',
    secure: true,
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
  response.cookies.set('fsi_growth_action_token', cookieToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
  return response;
}
