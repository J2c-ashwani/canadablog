import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_SESSION_COOKIE, isValidAdminRequest, isValidAdminSession } from '@/lib/admin/auth';
import { reconcileAffiliateCommissions } from '@/lib/affiliates/reconciliation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function isAuthorized(request: NextRequest) {
  if (isValidAdminRequest(request)) return true;
  const secret = process.env.LEAD_DASHBOARD_SECRET;
  const session = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  return Boolean(secret && session && isValidAdminSession(session, secret));
}

export async function POST(request: NextRequest) {
  if (!await isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const summary = await reconcileAffiliateCommissions(100);
    return NextResponse.json({ success: summary.errors.length === 0, summary, message: `Reconciliation processed ${summary.processed}, found ${summary.alreadyRecorded} existing, and reversed ${summary.reversed}.` });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Affiliate reconciliation failed.' }, { status: 500 });
  }
}
