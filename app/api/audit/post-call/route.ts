import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from '@/lib/admin/auth';
import { sendPostCallSummaryEmail } from '@/lib/emails/post-call-emails';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const adminSecret = process.env.LEAD_DASHBOARD_SECRET;
    if (!adminSecret) {
      return NextResponse.json({ error: 'Private dashboard access is not ready yet.' }, { status: 500 });
    }

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

    if (!isValidAdminSession(sessionCookie, adminSecret)) {
      return NextResponse.json({ error: 'Unauthorized session.' }, { status: 401 });
    }

    const body = await request.json();
    const { email, name, companyName } = body;

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required.' }, { status: 400 });
    }

    const res = await sendPostCallSummaryEmail({
      to: email,
      name,
      companyName: companyName || 'Your Company'
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Post-call summary email triggered successfully.', 
      skipped: !!res.skipped 
    });
  } catch (error: any) {
    console.error('[Post-Call API] Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error.' }, { status: 500 });
  }
}
