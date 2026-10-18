import { type NextRequest, NextResponse } from 'next/server';
import { ChannelAdapters } from '@/lib/growth-os/execution/adapters/channel-adapters';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const text = body.text?.trim();
    const hashtags = Array.isArray(body.hashtags) ? body.hashtags : ['#BusinessGrants', '#GovernmentFunding', '#FSIDigital'];

    if (!text) {
      return NextResponse.json({ error: 'Post text is required.' }, { status: 400 });
    }

    const result = await ChannelAdapters.postLinkedIn(text, hashtags);

    const isAccepted = result.status === 'API_ACCEPTED' || result.status === 'LIVE_PUBLISHED';
    return NextResponse.json({
      success: isAccepted,
      result,
    }, { status: isAccepted ? 200 : 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'LinkedIn publish failed' }, { status: 500 });
  }
}
