import { NextRequest, NextResponse } from 'next/server';
import { buildServerCheckout } from '@/lib/products/checkout';
import {
  attachPayPalOrderToIntent,
  newProductPaymentIntent,
  saveProductPaymentIntent,
} from '@/lib/payments/product-payment-intents';
import { createProductPayPalOrder } from '@/lib/payments/paypal';
import { actionContextFromAttribution, parseTrackedGrowthToken, recordGrowthActionEvent } from '@/lib/growth-os/action-attribution';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const input = await request.json();
    const trustedAction = parseTrackedGrowthToken(request.cookies.get('fsi_growth_action_token')?.value || '');
    const attribution = input.attribution && typeof input.attribution === 'object' ? { ...input.attribution } : {};
    delete attribution.actionId;
    delete attribution.actionChannel;
    delete attribution.actionCampaign;
    delete attribution.actionRecipientId;
    input.attribution = attribution;
    if (trustedAction) input.attribution = {
      ...attribution,
      actionId: trustedAction.actionId,
      actionChannel: trustedAction.channel,
      actionCampaign: trustedAction.campaign,
      actionRecipientId: trustedAction.recipientId,
    };
    const details = await buildServerCheckout(input);
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
    const action = actionContextFromAttribution(details.attribution);
    if (action) {
      await recordGrowthActionEvent({
        eventId: `checkout:paypal:${order.id}`,
        ...action,
        eventType: 'checkout_started',
        provider: 'paypal',
        providerMessageId: '',
        productId: details.productId,
        revenueUSD: 0,
        revenueCAD: 0,
        mrrUSD: 0,
        referenceId: order.id!,
        metadata: { expectedAmount: intent.expectedAmount, currency: details.currency },
      }).catch((error) => console.error('PayPal checkout attribution write failed:', error));
    }

    return NextResponse.json({ intentId: intent.intentId, orderId: order.id });
  } catch (error: any) {
    console.error('Product PayPal order creation failed:', error);
    return NextResponse.json({ error: error.message || 'Unable to start secure checkout.' }, { status: 400 });
  }
}
