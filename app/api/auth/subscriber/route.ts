import { NextResponse, type NextRequest } from 'next/server';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { applyRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Rate Limiting (10 requests/hour)
  const limitRes = applyRateLimit(request, 10, 60 * 60 * 1000);
  if (limitRes.isLimited) return limitRes.response;

  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token is required.' }, { status: 400 });
    }

    const all = await SubscriberRepository.getAllSubscribers();
    // Search strictly by loginToken
    const found = all.find((sub) => sub.loginToken === token);

    if (!found) {
      return NextResponse.json({ error: 'Invalid or expired login token.' }, { status: 404 });
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
      }
    });
  } catch (err: any) {
    console.error('Auth subscriber endpoint error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
