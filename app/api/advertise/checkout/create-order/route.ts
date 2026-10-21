import { NextRequest, NextResponse } from 'next/server';
import { createProductPayPalOrder } from '@/lib/payments/paypal';
import { PUBLISHING_STANDARDS } from '@/lib/advertising/config';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const packageId = body.packageId || 'done-for-you';

    if (packageId !== 'done-for-you') {
      return NextResponse.json(
        { error: 'Only the Done-for-You Sponsored Article is available for instant checkout. Please submit an inquiry for custom packages.' },
        { status: 400 }
      );
    }

    const intentId = `adv_dfy_${Date.now()}`;
    const amount = PUBLISHING_STANDARDS.dfyAmountUsd; // '225.00'
    const currency = PUBLISHING_STANDARDS.billingCurrency; // 'USD'

    const order = await createProductPayPalOrder({
      intentId,
      productId: 'done-for-you',
      productName: 'Done-for-You Sponsored Article - FSI Digital',
      amount,
      currency,
    });

    return NextResponse.json({
      id: order.id,
      status: order.status,
    });
  } catch (error) {
    console.error('Failed to create PayPal order for advertising:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to create payment order.' },
      { status: 500 }
    );
  }
}
