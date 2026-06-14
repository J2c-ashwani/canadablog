import { NextRequest, NextResponse } from 'next/server';
import { verifyPayPalOrder } from '@/lib/payments/paypal';
import { recordPurchase } from '@/lib/products/purchase-store';
import { getProduct } from '@/lib/products/catalog';
import { sendEmail } from '@/lib/emails/mailer';
import { buildPurchaseEmail } from '@/lib/emails/product-purchase';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, email, name, paypalOrderId, profileData } = body;

    // ── Validate required fields ──
    if (!productId || !email || !name || !paypalOrderId || !profileData) {
      return NextResponse.json(
        { error: 'Missing required fields: productId, email, name, paypalOrderId, profileData' },
        { status: 400 }
      );
    }

    // ── Validate product exists ──
    const product = getProduct(productId);
    if (!product) {
      return NextResponse.json(
        { error: `Invalid product: ${productId}` },
        { status: 400 }
      );
    }

    // ── Verify PayPal order ──
    const verification = await verifyPayPalOrder(
      paypalOrderId,
      product.priceUsd.toFixed(2)
    );

    if (!verification.verified) {
      console.error(
        `❌ PayPal verification failed for order ${paypalOrderId}:`,
        verification.error
      );
      return NextResponse.json(
        { error: verification.error || 'Payment verification failed' },
        { status: 400 }
      );
    }

    // ── Record purchase in Google Sheets ──
    const purchase = await recordPurchase({
      email,
      name,
      productId,
      amount: product.priceUsd.toFixed(2),
      paypalOrderId,
      profileData,
    });

    // ── Sync purchase status back to CRM Leads sheet ──
    try {
      const existing = await SubscriberRepository.getSubscriberByEmail(email);
      const updates: any = {
        reportPurchased: true,
        reportTransactionId: paypalOrderId,
        region: profileData.province || 'ON',
        industry: profileData.industry || 'other',
        businessStage: profileData.revenue || 'pre-revenue',
        fundingPurpose: profileData.goal || 'expansion',
        engagementScore: 120,
      };

      if (existing) {
        await SubscriberRepository.updateSubscriberPreferences(email, updates);
        console.log(`✅ Main CRM lead updated as buyer for: ${email}`);
      } else {
        await SubscriberRepository.saveSubscriber({
          email,
          name,
          country: 'Canada', // Default fallback country
          region: profileData.province || 'ON',
          industry: profileData.industry || 'other',
          companySize: '1-9',
          fundingInterests: ['Grants'],
          website: '',
          companyName: '',
        });
        await SubscriberRepository.updateSubscriberPreferences(email, updates);
        console.log(`✅ Main CRM lead created and marked as buyer for: ${email}`);
      }
    } catch (crmErr) {
      console.error('⚠️ CRM Leads sheet update failed but purchase was completed:', crmErr);
    }

    // ── Send confirmation email ──
    const emailContent = buildPurchaseEmail({
      name,
      email,
      accessToken: purchase.accessToken,
      paypalOrderId,
      productName: product.name,
      amount: product.priceUsd.toFixed(2),
    });

    await sendEmail({
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
      tagType: 'product-purchase',
    });

    console.log(
      `✅ Product purchase completed: ${product.name} for ${email} (order: ${paypalOrderId})`
    );

    // ── Return success ──
    const deliveryUrl = `/products/report?token=${purchase.accessToken}`;

    return NextResponse.json({
      success: true,
      accessToken: purchase.accessToken,
      deliveryUrl,
    });
  } catch (error: any) {
    console.error('❌ Product purchase error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
