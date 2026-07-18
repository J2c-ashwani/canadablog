import { NextRequest, NextResponse } from 'next/server';
import { buildServerCheckout } from '@/lib/products/checkout';
import {
  attachPayPalOrderToIntent,
  newProductPaymentIntent,
  saveProductPaymentIntent,
} from '@/lib/payments/product-payment-intents';
import { createProductPayPalOrder } from '@/lib/payments/paypal';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const details = await buildServerCheckout(await request.json());
    const intent = newProductPaymentIntent({
      email: details.email,
      name: details.name,
      productId: details.productId,
      addons: details.addons,
      expectedAmount: details.expectedAmount.toFixed(2),
      currency: details.currency,
      profileData: details.profileData,
      attribution: details.attribution,
      sessionId: details.sessionId,
    });

    // Persist the immutable commercial terms before exposing any PayPal order to the browser.
    await saveProductPaymentIntent(intent);
    const order = await createProductPayPalOrder({
      intentId: intent.intentId,
      productId: details.productId,
      productName: details.productName,
      amount: intent.expectedAmount,
      currency: details.currency,
    });
    await attachPayPalOrderToIntent(intent.intentId, order.id!);

    return NextResponse.json({ intentId: intent.intentId, orderId: order.id });
  } catch (error: any) {
    console.error('Product PayPal order creation failed:', error);
    return NextResponse.json({ error: error.message || 'Unable to start secure checkout.' }, { status: 400 });
  }
}
