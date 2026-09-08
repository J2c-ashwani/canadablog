import { type NextRequest, NextResponse } from 'next/server';
import { createAffiliateAttributionIntent } from '@/lib/affiliates/store';
import { parseTrackedGrowthToken } from '@/lib/growth-os/action-attribution';
import { applyRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const limit = await applyRateLimit(request, 10, 60 * 60 * 1000);
  if (limit.isLimited) return limit.response;
  try {
    const body = await request.json();
    const buyerEmail = String(body?.email || '').toLowerCase().trim();
    if (!buyerEmail.includes('@') || buyerEmail.length > 254) {
      return NextResponse.json({ error: 'A valid membership email is required.' }, { status: 400 });
    }
    const trusted = parseTrackedGrowthToken(request.cookies.get('fsi_growth_action_token')?.value || '');
    if (!trusted || trusted.channel !== 'affiliate') {
      return NextResponse.json({ customId: '' }, { headers: { 'Cache-Control': 'no-store' } });
    }
    const intent = await createAffiliateAttributionIntent({
      buyerEmail,
      trustedAttribution: {
        actionId: trusted.actionId,
        actionChannel: trusted.channel,
        actionCampaign: trusted.campaign,
        actionRecipientId: trusted.recipientId,
        actionIssuedAt: trusted.issuedAt,
      },
    });
    return NextResponse.json({ customId: intent.intentId }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    // Attribution must fail closed without blocking a legitimate membership checkout.
    console.error('[Affiliate membership intent] Attribution was not attached:', error);
    return NextResponse.json({ customId: '' }, { headers: { 'Cache-Control': 'no-store' } });
  }
}
