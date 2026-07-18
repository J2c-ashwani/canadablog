import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/payments/stripe';
import { buildServerCheckout } from '@/lib/products/checkout';

export async function POST(request: NextRequest) {
  try {
    const details = await buildServerCheckout(await request.json());
    const stripeCurrency = details.currency.toLowerCase();
    let expectedPrice = details.baseAmount;
    const lineItems: any[] = [
      {
        price_data: {
          currency: stripeCurrency,
          product_data: {
            name: details.productName,
            description: 'FSI Digital secure checkout',
          },
          unit_amount: Math.round(details.baseAmount * 100),
        },
        quantity: 1,
      },
    ];

    if (details.addons.toolkit) {
      expectedPrice += 29;
      lineItems.push({
        price_data: {
          currency: stripeCurrency,
          product_data: {
            name: 'Funding Application Toolkit Addon',
            description: '6 premium templates and calculators to save 40+ hours.',
          },
          unit_amount: 2900,
        },
        quantity: 1,
      });
    }

    if (details.addons.approvalLibrary) {
      expectedPrice += 9;
      lineItems.push({
        price_data: {
          currency: stripeCurrency,
          product_data: {
            name: 'Funding Approval Library Addon',
            description: 'Winning grant proposals, project descriptions and budgets.',
          },
          unit_amount: 900,
        },
        quantity: 1,
      });
    }

    const origin = request.headers.get('origin') || 'https://www.fsidigital.ca';

    // ── Create Stripe checkout session ──
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: details.email,
      line_items: lineItems,
      mode: 'payment',
      // Pass purchase details in metadata for webhook & success page recovery
      metadata: {
        productId: details.productId,
        email: details.email,
        name: details.name,
        expectedAmount: expectedPrice.toFixed(2),
        currency: details.currency,
        baseAmount: details.baseAmount.toFixed(2),
        profileData: JSON.stringify(details.profileData),
        addons: JSON.stringify({
          toolkit: details.addons.toolkit,
          approvalLibrary: details.addons.approvalLibrary,
        }),
        attribution: JSON.stringify(details.attribution),
      },
      success_url: `${origin}/api/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/calculator`,
    });

    console.log(`✅ Stripe Checkout Session created for ${details.email}: ${session.id}`);

    return NextResponse.json({
      sessionId: session.id,
      checkoutUrl: session.url,
    });
  } catch (error: any) {
    console.error('❌ Error creating Stripe checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Unable to create Stripe checkout session' },
      { status: 500 }
    );
  }
}
