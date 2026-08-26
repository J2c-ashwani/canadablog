import { type NextRequest, NextResponse } from 'next/server';
import { isValidCronRequest } from '@/lib/admin/auth';
import { recoverProductDeliveries } from '@/lib/products/delivery-recovery';
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Retries only provider-verified purchases whose confirmation was not accepted. */
export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized product-delivery recovery execution.' }, { status: 401 });
  }

  const limit = Math.min(Math.max(Number(request.nextUrl.searchParams.get('limit') || 10), 1), 20);
  const lease = await acquireOperationLease('product-delivery-recovery', 10 * 60 * 1000);
  if (!lease.acquired) {
    return NextResponse.json({ success: true, skipped: true, reason: lease.reason });
  }
  try {
    const result = await recoverProductDeliveries({ limit });
    const providerAccepted = result.outcomes.filter((outcome) => outcome.providerAccepted).length;
    const failed = result.outcomes.length - providerAccepted;
    await finishOperationLease(lease, failed > 0 ? 'PARTIAL' : 'SUCCEEDED', { ...result, providerAccepted });
    return NextResponse.json({ success: failed === 0, ...result, providerAccepted }, { status: failed > 0 ? 502 : 200 });
  } catch (error: any) {
    await finishOperationLease(lease, 'FAILED', { error: error.message || String(error) });
    return NextResponse.json({ success: false, error: error.message || 'Delivery recovery failed.' }, { status: 500 });
  }
}
