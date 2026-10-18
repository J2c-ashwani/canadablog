import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const clientId = process.env.LINKEDIN_CLIENT_ID?.trim();
  if (!clientId) {
    return NextResponse.json({
      error: 'LINKEDIN_CLIENT_ID is not configured in environment variables.',
    }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const host = request.headers.get('host') || 'www.fsidigital.ca';
  const proto = host.includes('localhost') ? 'http' : 'https';
  const defaultRedirect = `${proto}://${host}/api/admin/auth/linkedin/callback`;
  const redirectUri = searchParams.get('redirect_uri') || defaultRedirect;

  // Scopes: OpenID for identity + w_member_social for personal posting + optional w_organization_social
  const requestedScope = searchParams.get('scope') || 'openid profile email w_member_social w_organization_social';

  // State nonce to prevent CSRF and carry redirect target
  const statePayload = {
    nonce: Math.random().toString(36).substring(2),
    ts: Date.now(),
    returnTo: searchParams.get('return_to') || '/admin/linkedin',
  };
  const state = Buffer.from(JSON.stringify(statePayload)).toString('base64url');

  const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('scope', requestedScope);

  // If user passed ?format=json, return the URL instead of redirecting
  if (searchParams.get('format') === 'json') {
    return NextResponse.json({
      authUrl: authUrl.toString(),
      redirectUri,
      clientId,
      scope: requestedScope,
    });
  }

  return NextResponse.redirect(authUrl.toString());
}
