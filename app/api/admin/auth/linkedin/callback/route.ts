import { type NextRequest, NextResponse } from 'next/server';
import { saveLinkedInOAuthTokens } from '@/lib/growth-os/auth/linkedin-token';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  const host = request.headers.get('host') || 'www.fsidigital.ca';
  const proto = host.includes('localhost') ? 'http' : 'https';
  const redirectUri = `${proto}://${host}/api/admin/auth/linkedin/callback`;

  if (error) {
    return new NextResponse(
      renderHtmlResponse({
        success: false,
        title: 'LinkedIn Authorization Failed',
        message: errorDescription || error,
        details: [
          `Error Code: ${error}`,
          'Please ensure that your LinkedIn application has the required products enabled (e.g., Share on LinkedIn, Sign In with LinkedIn) and that the redirect URI is registered in the LinkedIn Developer Portal.',
        ],
        redirectUri,
      }),
      { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  if (!code) {
    return new NextResponse(
      renderHtmlResponse({
        success: false,
        title: 'Missing Authorization Code',
        message: 'LinkedIn did not return an authorization code.',
        details: ['Check that the redirect was initiated from a valid LinkedIn OAuth consent URL.'],
        redirectUri,
      }),
      { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  const clientId = process.env.LINKEDIN_CLIENT_ID?.trim();
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    return new NextResponse(
      renderHtmlResponse({
        success: false,
        title: 'Missing App Credentials',
        message: 'LINKEDIN_CLIENT_ID or LINKEDIN_CLIENT_SECRET is missing from server environment.',
        details: ['Configure these variables in your .env.local and Vercel dashboard.'],
        redirectUri,
      }),
      { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  try {
    // Exchange authorization code for access token
    const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }).toString(),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.access_token) {
      return new NextResponse(
        renderHtmlResponse({
          success: false,
          title: 'Token Exchange Failed',
          message: tokenData.error_description || tokenData.error || 'LinkedIn rejected the authorization code exchange.',
          details: [
            `HTTP Status: ${tokenRes.status}`,
            `Error: ${tokenData.error || 'unknown'}`,
            `Redirect URI Used: ${redirectUri}`,
          ],
          redirectUri,
        }),
        { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    // Save tokens and resolve member identity
    const savedState = await saveLinkedInOAuthTokens({
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresIn: Number(tokenData.expires_in) || 5184000,
      refreshTokenExpiresIn: tokenData.refresh_token_expires_in ? Number(tokenData.refresh_token_expires_in) : undefined,
      scope: tokenData.scope,
    });

    const expiryDays = Math.round((savedState.expiresAt - Date.now()) / (24 * 60 * 60 * 1000));
    const hasRefresh = Boolean(savedState.refreshToken);

    return new NextResponse(
      renderHtmlResponse({
        success: true,
        title: 'LinkedIn Connected Successfully!',
        message: 'Your LinkedIn account has been authenticated and linked to Growth OS.',
        details: [
          savedState.name ? `Account Name: ${savedState.name}` : '',
          savedState.email ? `Email: ${savedState.email}` : '',
          savedState.personUrn ? `Person URN: ${savedState.personUrn}` : '',
          `Access Token Validity: ~${expiryDays} days`,
          hasRefresh
            ? '✅ Refresh Token Active: Automatic 365-day renewal enabled'
            : '⚠️ 60-Day Token: Re-authorization will be needed in 60 days (offline_access was not granted by your LinkedIn app tier)',
        ].filter(Boolean),
        redirectUri,
        testUrl: '/api/admin/auth/linkedin/test',
      }),
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  } catch (err: any) {
    return new NextResponse(
      renderHtmlResponse({
        success: false,
        title: 'Unexpected Server Error',
        message: err.message || String(err),
        details: ['An error occurred while processing the OAuth callback.'],
        redirectUri,
      }),
      { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
}

function renderHtmlResponse(options: {
  success: boolean;
  title: string;
  message: string;
  details: string[];
  redirectUri: string;
  testUrl?: string;
}): string {
  const icon = options.success ? '✅' : '❌';
  const badgeClass = options.success
    ? 'background: #e6f4ea; color: #137333; border: 1px solid #ceead6;'
    : 'background: #fce8e6; color: #c5221f; border: 1px solid #fad2cf;';

  const detailsList = options.details
    .map((item) => `<li style="margin: 8px 0; font-family: monospace; font-size: 13px; color: #374151;">${item}</li>`)
    .join('');

  const testButton = options.testUrl
    ? `<a href="${options.testUrl}" style="display: inline-block; margin-top: 16px; margin-right: 12px; background: #0077b5; color: #ffffff; padding: 10px 20px; border-radius: 6px; font-weight: 600; text-decoration: none;">🚀 Test LinkedIn Live Post</a>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${options.title} — FSI Digital</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f9fafb; margin: 0; padding: 40px 20px; color: #111827; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); padding: 32px; }
    .badge { display: inline-block; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-bottom: 16px; }
    h1 { font-size: 24px; font-weight: 700; margin: 0 0 12px 0; color: #111827; }
    p { font-size: 15px; line-height: 1.5; color: #4b5563; margin: 0 0 16px 0; }
    .details { background: #f3f4f6; border-radius: 8px; padding: 16px 20px; margin: 20px 0; }
    ul { margin: 0; padding-left: 20px; }
    .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; }
    .secondary-btn { display: inline-block; margin-top: 16px; background: #f3f4f6; color: #374151; padding: 10px 20px; border-radius: 6px; font-weight: 600; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge" style="${badgeClass}">${icon} ${options.success ? 'OAuth Connected' : 'OAuth Error'}</div>
    <h1>${options.title}</h1>
    <p>${options.message}</p>
    <div class="details">
      <ul>${detailsList}</ul>
    </div>
    <div>
      ${testButton}
      <a href="/admin/linkedin" class="secondary-btn">Go to LinkedIn Admin</a>
    </div>
    <div class="footer">
      Registered Callback URI: <code>${options.redirectUri}</code><br/>
      FSI Digital Growth OS LinkedIn OAuth Gateway
    </div>
  </div>
</body>
</html>`;
}
