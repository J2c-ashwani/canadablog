import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Do not allow an administrator to create revenue or entitlements outside a
// provider-verified payment record.
export async function GET() {
  return NextResponse.json(
    { error: 'Manual report dispatch is retired. Use the payment reconciliation workflow.' },
    { status: 410 }
  );
}
