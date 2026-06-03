import { type NextRequest, NextResponse } from 'next/server';
import { createPayPalOrder } from '@/lib/payments/paypal';
import { getPartnerPackage } from '@/lib/partners/packages';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const partnerPackage = getPartnerPackage(body.packageId);

    if (!partnerPackage) {
      return NextResponse.json({ error: 'Invalid partner package.' }, { status: 400 });
    }

    const order = await createPayPalOrder(partnerPackage);

    return NextResponse.json({
      id: order.id,
      status: order.status,
    });
  } catch (error) {
    console.error('PayPal create order error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to create PayPal order.' },
      { status: 500 },
    );
  }
}
