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
    delete attribution.actionIssuedAt;
    delete attribution.goActionId;
    delete attribution.goChannel;
    delete attribution.goCampaign;
    delete attribution.goRecipientId;
    delete attribution.goIssuedAt;
    delete attribution.affiliatePartnerId;
    delete attribution.affiliateCode;
    delete attribution.affiliateAttributedAt;
    delete attribution.partnerId;
    delete attribution.referralCode;
    delete attribution.commissionRate;
    input.attribution = attribution;
    if (trustedAction) input.attribution = {
      ...attribution,
      actionId: trustedAction.actionId,
      actionChannel: trustedAction.channel,
      actionCampaign: trustedAction.campaign,
      actionRecipientId: trustedAction.recipientId,
      actionIssuedAt: trustedAction.issuedAt,
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

    // Build return/cancel URLs for the full-page redirect flow (iOS Safari, in-app browsers).
    // Follows the proven pattern in app/api/mca/priority-order/route.ts.
    const origin = (
      request.headers.get('origin') ||
      request.headers.get('referer')?.replace(/\/[^/]*$/, '') ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://www.fsidigital.ca'
    ).replace(/\/$/, '');
    const returnUrl = `${origin}/products/checkout-return?intent=${encodeURIComponent(intent.intentId)}`;
    const cancelUrl = `${origin}/products/${details.productId === 'funding-match-report' ? 'funding-match-report' : details.productId === 'funding-roadmap' ? 'action-plan' : details.productId === 'funding-bundle' ? 'bundle' : details.productId === 'funding-toolkit' ? 'toolkit' : 'funding-match-report'}?cancelled=true`;

    const order = await createProductPayPalOrder({
      intentId: intent.intentId,
      productId: details.productId,
      productName: details.productName,
      amount: intent.expectedAmount,
      currency: details.currency,
      returnUrl,
      cancelUrl,
    });
    await attachPayPalOrderToIntent(intent.intentId, order.id!);

    // Extract the full-page approval URL from PayPal's HATEOAS links.
    const approveUrl = order.links?.find((link) => link.rel === 'approve')?.href || '';

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

    return NextResponse.json({ intentId: intent.intentId, orderId: order.id, approveUrl });
  } catch (error: any) {
    console.error('Product PayPal order creation failed:', error);
    return NextResponse.json({ error: error.message || 'Unable to start secure checkout.' }, { status: 400 });
  }
}
