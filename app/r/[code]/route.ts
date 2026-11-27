import { type NextRequest, NextResponse } from 'next/server';
import { getAffiliateOffer } from '@/lib/affiliates/config';
import { buildAffiliateActionContext } from '@/lib/affiliates/attribution';
import { getAffiliatePartnerByCode } from '@/lib/affiliates/store';
import {
  createTrackedGrowthUrl,
  isLikelyAutomatedUserAgent,
} from '@/lib/growth-os/action-attribution';
import { resolvePublicOrigin } from '@/lib/http/public-origin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;
  const partner = await getAffiliatePartnerByCode(code).catch((error) => {
    console.error('Affiliate referral lookup failed closed:', error);
    return null;
  });
  const origin = resolvePublicOrigin(request);
  if (!partner || partner.status !== 'approved') {
    return NextResponse.redirect(new URL('/affiliates?ref=unavailable', origin));
  }

  const offer = getAffiliateOffer(request.nextUrl.searchParams.get('offer'));
  const destination = new URL(offer.path, origin);
  destination.searchParams.set('utm_source', 'affiliate');
  destination.searchParams.set('utm_medium', 'referral');
  destination.searchParams.set('utm_campaign', partner.referralCode);

  const userAgent = String(request.headers.get('user-agent') || '').slice(0, 240);
  if (isLikelyAutomatedUserAgent(userAgent)) {
    return NextResponse.redirect(destination);
  }

  const action = buildAffiliateActionContext({
    partnerId: partner.partnerId,
    referralCode: partner.referralCode,
  });
  if (!action) return NextResponse.redirect(destination);

  // The shared click endpoint records the human click and issues the signed,
  // HttpOnly 30-day last-click cookie. If the signing secret is unavailable,
  // createTrackedGrowthUrl returns the clean destination and attribution fails closed.
  return NextResponse.redirect(createTrackedGrowthUrl(destination.toString(), action));
}

