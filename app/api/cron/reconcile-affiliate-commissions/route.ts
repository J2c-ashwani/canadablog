import { NextResponse, type NextRequest } from 'next/server';
import { isValidCronRequest } from '@/lib/admin/auth';
import { reconcileAffiliateCommissions } from '@/lib/affiliates/reconciliation';
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) return NextResponse.json({ error: 'Unauthorized affiliate reconciliation.' }, { status: 401 });
  const lease = await acquireOperationLease('affiliate-commission-reconciliation', 30 * 60 * 1000);
  if (!lease.acquired) return NextResponse.json({ success: true, skipped: true, reason: lease.reason });
  try {
    const summary = await reconcileAffiliateCommissions(100);
    await finishOperationLease(lease, summary.errors.length ? 'PARTIAL' : 'SUCCEEDED', summary);
    return NextResponse.json({ success: summary.errors.length === 0, summary });
  } catch (error: any) {
    await finishOperationLease(lease, 'FAILED', { error: error?.message || 'reconciliation_failed' }).catch(() => {});
    return NextResponse.json({ success: false, error: error?.message || 'Affiliate reconciliation failed.' }, { status: 500 });
  }
}
