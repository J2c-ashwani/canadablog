import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_SESSION_COOKIE, createAdminSessionToken, isValidAdminKey } from '@/lib/admin/auth';
import { applyRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  // 1. Rate Limiting (20 requests/minute)
  const limitRes = applyRateLimit(request, 20, 60 * 1000);
  if (limitRes.isLimited) return limitRes.response;

  try {
    const adminSecret = process.env.LEAD_DASHBOARD_SECRET;

    if (!adminSecret) {
      return NextResponse.json({ error: 'Private dashboard access is not ready yet.' }, { status: 500 });
    }

    const body = await request.json();
    const key = String(body.key || '');

    if (!isValidAdminKey(key, adminSecret)) {
      return NextResponse.json({ error: 'Incorrect access code.' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: createAdminSessionToken(adminSecret),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 12,
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Unable to login.' }, { status: 500 });
  }
}
