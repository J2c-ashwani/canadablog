import { NextResponse, type NextRequest } from 'next/server';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { applyRateLimit } from '@/lib/rate-limit';
import { getReactivationPriceForEmail } from '@/lib/leads/pricing-test';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Rate Limiting (10 requests/hour)
  const limitRes = await applyRateLimit(request, 10, 60 * 60 * 1000);
  if (limitRes.isLimited) return limitRes.response;

  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token is required.' }, { status: 400 });
    }

    if (!token.startsWith('v2_')) {
      return NextResponse.json({ error: 'Legacy token version is deprecated. Please request a new link.' }, { status: 400 });
    }

    const all = await SubscriberRepository.getAllSubscribers(true);
    // Search strictly by loginToken
    const found = all.find((sub) => sub.loginToken === token);

    if (!found) {
      return NextResponse.json({ error: 'Invalid or expired login token.' }, { status: 404 });
    }

    // Resolve or assign pricing group and price
    let activity: any = {};
    try {
      if (found.leadActivity && found.leadActivity !== 'N/A' && found.leadActivity !== '{}') {
        activity = JSON.parse(found.leadActivity);
      }
    } catch (e) {
      console.error('Failed to parse activity JSON in auth subscriber API:', e);
    }

    let reactivationPrice = activity.reactivationPrice;
    let pricingGroup = activity.pricingGroup;

    if (!reactivationPrice || !pricingGroup) {
      const pricing = getReactivationPriceForEmail(found.email);
      reactivationPrice = pricing.price;
      pricingGroup = pricing.group;

      activity.reactivationPrice = reactivationPrice;
      activity.pricingGroup = pricingGroup;

      // Persist the pricing assignment in Google Sheets
      await SubscriberRepository.updateSubscriberPreferences(found.email, {
        leadActivity: JSON.stringify(activity)
      });
    }

    return NextResponse.json({
      success: true,
      subscriber: {
        email: found.email,
        name: found.name,
        country: found.country,
        region: found.region,
        industry: found.industry,
        companySize: found.companySize,
        isSubscribed: found.isSubscribed,
        loginToken: found.loginToken,
        subscriptionStatus: found.subscriptionStatus || 'inactive',
        subscriptionId: found.subscriptionId || '',
        trialStartedAt: found.trialStartedAt || '',
        website: found.website || '',
        companyName: found.companyName || '',
        reportPurchased: found.reportPurchased || false,
        reportTransactionId: found.reportTransactionId || '',
        readinessScore: found.readinessScore || 70,
        readinessBand: found.readinessBand || 'Good Candidate',
        fundingInterests: found.fundingInterests || [],
        phone: found.phone || '',
        businessStage: found.businessStage || '',
        fundingPurpose: found.fundingPurpose || '',
        leadActivity: JSON.stringify(activity),
        reactivationPrice,
        pricingGroup
      }
    });
  } catch (err: any) {
    console.error('Auth subscriber endpoint error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
