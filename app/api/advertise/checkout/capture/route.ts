import { NextRequest, NextResponse } from 'next/server';
import { verifyPayPalOrder } from '@/lib/payments/paypal';
import {
  PUBLISHING_STANDARDS,
  PublishingOrder,
  generateOrderAccessToken,
} from '@/lib/advertising/config';
import { savePublishingOrder } from '@/lib/advertising/store';
import {
  sendPublishingOrderConfirmation,
  sendPublishingOrderAdminAlert,
} from '@/lib/advertising/emails';
import { validateEmail } from '@/lib/email-validator';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, buyerName, buyerEmail, companyName, website } = body;

    if (!orderId || typeof orderId !== 'string') {
      return NextResponse.json({ error: 'Valid PayPal order ID is required.' }, { status: 400 });
    }

    if (!buyerName || !buyerName.trim()) {
      return NextResponse.json({ error: 'Buyer name is required.' }, { status: 400 });
    }

    if (!buyerEmail || !buyerEmail.trim()) {
      return NextResponse.json({ error: 'Buyer email is required.' }, { status: 400 });
    }

    const emailCheck = validateEmail(buyerEmail.trim());
    if (!emailCheck.isValid) {
      return NextResponse.json({ error: emailCheck.error || 'Valid email required.' }, { status: 400 });
    }

    if (!companyName || !companyName.trim()) {
      return NextResponse.json({ error: 'Company or brand name is required.' }, { status: 400 });
    }

    if (!website || !website.trim()) {
      return NextResponse.json({ error: 'Website URL is required.' }, { status: 400 });
    }

    // Server-side cryptographic payment verification against PayPal REST API
    const verification = await verifyPayPalOrder(orderId, PUBLISHING_STANDARDS.dfyAmountUsd, {
      currency: PUBLISHING_STANDARDS.billingCurrency,
    });

    if (!verification.verified) {
      console.error(`❌ Advertising order verification failed for ${orderId}:`, verification.error);
      return NextResponse.json(
        { error: verification.error || 'Payment verification failed with PayPal.' },
        { status: 400 }
      );
    }

    const cleanEmail = buyerEmail.trim().toLowerCase();
    const token = generateOrderAccessToken(orderId, cleanEmail);

    const orderRecord: PublishingOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'paid',
      packageId: 'done-for-you',
      packageName: 'Done-for-You Sponsored Article',
      amountUsd: PUBLISHING_STANDARDS.dfyAmountUsd,
      currency: 'USD',
      buyerName: buyerName.trim(),
      buyerEmail: cleanEmail,
      companyName: companyName.trim(),
      website: website.trim(),
      token,
    };

    // Save order
    await savePublishingOrder(orderRecord);

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca').replace(/\/$/, '');
    const briefUrl = `${siteUrl}/advertise/order/${orderId}/brief?token=${encodeURIComponent(token)}`;

    // Dispatch confirmation and admin alert
    await Promise.allSettled([
      sendPublishingOrderConfirmation(orderRecord, briefUrl),
      sendPublishingOrderAdminAlert(orderRecord),
    ]);

    return NextResponse.json({
      success: true,
      orderId,
      token,
      redirectUrl: `/advertise/order/${orderId}/brief?token=${encodeURIComponent(token)}`,
    });
  } catch (error) {
    console.error('Failed to capture advertising order:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during payment verification. Please contact support at ashwani@fsidigital.ca.' },
      { status: 500 }
    );
  }
}
