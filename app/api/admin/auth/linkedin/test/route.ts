import { type NextRequest, NextResponse } from 'next/server';
import { ChannelAdapters } from '@/lib/growth-os/execution/adapters/channel-adapters';
import { getLinkedInStatusSummary } from '@/lib/growth-os/auth/linkedin-token';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const status = await getLinkedInStatusSummary();

  const testText = `FSI Digital — Funding Intelligence Platform test dispatch.\n\nAutomated multi-channel social distribution test.\n\n🔗 https://www.fsidigital.ca/calculator`;
  const hashtags = ['#BusinessGrants', '#GovernmentFunding', '#FSIDigital', '#SmallBusiness'];

  const result = await ChannelAdapters.postLinkedIn(testText, hashtags);

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    status,
    result,
  }, { status: result.status === 'API_ACCEPTED' || result.status === 'LIVE_PUBLISHED' ? 200 : 400 });
}

export async function POST(request: NextRequest) {
  return GET(request);
}
