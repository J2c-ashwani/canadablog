import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/payments/stripe';
import { getProduct } from '@/lib/products/catalog';
import { getPurchasesByEmail } from '@/lib/products/purchase-store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, email, name, profileData, addons, attribution } = body;

    if (!productId || !email || !name || !profileData) {
      return NextResponse.json(
        { error: 'Missing required fields: productId, email, name, profileData' },
        { status: 400 }
      );
    }

    const product = getProduct(productId);
    if (!product) {
      return NextResponse.json(
        { error: `Invalid product: ${productId}` },
        { status: 400 }
      );
    }

    // ── Check past purchases to calculate upgrade credit ──
    const purchases = await getPurchasesByEmail(email);
    let totalCredit = 0;
    for (const p of purchases) {
      const amountVal = parseFloat(p.amount) || 0;
      if (amountVal > 0) {
        totalCredit += amountVal;
      }
    }

    // ── Calculate total price ──
    let netProductPrice = product.priceUsd - totalCredit;
    if (netProductPrice < 0.50) {
      netProductPrice = 0.50; // Stripe minimum charge is $0.50 USD
    }

    let expectedPrice = netProductPrice;
    const lineItems: any[] = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: totalCredit > 0 ? `${product.name} (Prorated Upgrade)` : product.name,
            description: totalCredit > 0 
              ? `${product.tagline} (Applied prior purchase credit: $${totalCredit.toFixed(2)})`
              : product.tagline,
          },
          unit_amount: Math.round(netProductPrice * 100), // in cents
        },
        quantity: 1,
      },
    ];

    if (addons?.toolkit) {
      expectedPrice += 29;
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Funding Application Toolkit Addon',
            description: '6 premium templates and calculators to save 40+ hours.',
          },
          unit_amount: 2900,
        },
        quantity: 1,
      });
    }

    if (addons?.approvalLibrary) {
      expectedPrice += 9;
      lineItems.push({
        price_data: {
          currency: 'usd',
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
      customer_email: email,
      line_items: lineItems,
      mode: 'payment',
      // Pass purchase details in metadata for webhook & success page recovery
      metadata: {
        productId,
        email,
        name,
        profileData: JSON.stringify(profileData),
        addons: JSON.stringify({
          toolkit: !!addons?.toolkit,
          approvalLibrary: !!addons?.approvalLibrary,
        }),
        attribution: JSON.stringify(attribution || {}),
      },
      success_url: `${origin}/api/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/calculator`,
    });

    console.log(`✅ Stripe Checkout Session created for ${email}: ${session.id}`);

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
