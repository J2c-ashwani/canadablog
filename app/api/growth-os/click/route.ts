import { type NextRequest, NextResponse } from 'next/server';
import { parseTrackedGrowthToken, recordGrowthActionEvent } from '@/lib/growth-os/action-attribution';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const payload = parseTrackedGrowthToken(request.nextUrl.searchParams.get('t') || '');
  if (!payload) return NextResponse.redirect(new URL('/', request.url));

  const destination = new URL(payload.target);
  destination.searchParams.set('go_action', payload.actionId);
  destination.searchParams.set('go_channel', payload.channel);
  destination.searchParams.set('go_campaign', payload.campaign);
  destination.searchParams.set('go_recipient', payload.recipientId);
  if (!destination.searchParams.has('utm_medium')) destination.searchParams.set('utm_medium', payload.channel);
  if (!destination.searchParams.has('utm_campaign')) destination.searchParams.set('utm_campaign', payload.campaign);

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
    metadata: {
      targetPath: destination.pathname,
      userAgent: String(request.headers.get('user-agent') || '').slice(0, 240),
    },
  }).catch((error) => console.error('Growth action click could not be persisted:', error));

  const response = NextResponse.redirect(destination);
  response.cookies.set('fsi_growth_action', JSON.stringify({
    actionId: payload.actionId,
    channel: payload.channel,
    campaign: payload.campaign,
    recipientId: payload.recipientId,
  }), {
    httpOnly: false,
    sameSite: 'lax',
    secure: true,
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
  response.cookies.set('fsi_growth_action_token', request.nextUrl.searchParams.get('t') || '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
  return response;
}
