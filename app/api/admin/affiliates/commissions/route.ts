import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_SESSION_COOKIE, isValidAdminRequest, isValidAdminSession } from '@/lib/admin/auth';
import { reviewAffiliateCommission } from '@/lib/affiliates/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function isAuthorized(request: NextRequest) {
  if (isValidAdminRequest(request)) return true;
  const secret = process.env.LEAD_DASHBOARD_SECRET;
  const session = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  return Boolean(secret && session && isValidAdminSession(session, secret));
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const commissionId = String(body?.commissionId || '').trim();
    const action = String(body?.action || '').trim();
    const payoutReference = String(body?.payoutReference || '').trim().slice(0, 200);
    const reason = String(body?.reason || '').trim().slice(0, 500);
    if (!commissionId || !['approve_payable', 'reverse', 'mark_paid'].includes(action)) {
      return NextResponse.json({ error: 'A commission ID and valid controlled action are required.' }, { status: 400 });
    }
    if (action === 'mark_paid' && payoutReference.length < 4) {
      return NextResponse.json({ error: 'A PayPal transaction or payout reference is required before marking paid.' }, { status: 400 });
    }
    if (action === 'reverse' && reason.length < 8) {
      return NextResponse.json({ error: 'Record the refund, dispute, duplicate, or policy evidence before reversing.' }, { status: 400 });
    }

    const commission = await reviewAffiliateCommission({
      commissionId,
      action: action as 'approve_payable' | 'reverse' | 'mark_paid',
      payoutReference: payoutReference || undefined,
      reviewedBy: 'authenticated-admin',
      reason: reason || undefined,
    });

    const messages = {
      approve_payable: 'Commission approved as payable after server-side hold and source-payment checks. No money was sent.',
      reverse: 'Commission reversed in the ledger.',
      mark_paid: 'Manual PayPal payout recorded with its reference. No transfer was initiated by FSI Digital.',
    } as const;
    return NextResponse.json({ success: true, commissionId: commission.commissionId, status: commission.status, message: messages[action as keyof typeof messages] });
  } catch (error: any) {
    console.error('[Affiliate admin] Commission review failed:', error);
    const message = String(error?.message || 'The commission action could not be saved.');
    const status = /not found/i.test(message) ? 404 : /hold|state|status|payment|refund|dispute|invalid/i.test(message) ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
