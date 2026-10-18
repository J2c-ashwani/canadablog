import { type NextRequest, NextResponse } from 'next/server';
import { getLinkedInStatusSummary } from '@/lib/growth-os/auth/linkedin-token';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || 'www.fsidigital.ca';
  const proto = host.includes('localhost') ? 'http' : 'https';
  const callbackUrl = `${proto}://${host}/api/admin/auth/linkedin/callback`;

  const status = await getLinkedInStatusSummary();

  return NextResponse.json({
    status,
    callbackUrl,
    clientId: process.env.LINKEDIN_CLIENT_ID?.trim() || '',
    orgUrn: process.env.LINKEDIN_ORG_URN?.trim() || '',
    authUrl: `/api/admin/auth/linkedin`,
  });
}
