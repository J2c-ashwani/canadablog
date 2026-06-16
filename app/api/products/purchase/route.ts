import { NextRequest, NextResponse } from 'next/server';
import { verifyPayPalOrder } from '@/lib/payments/paypal';
import { recordPurchase } from '@/lib/products/purchase-store';
import { getProduct } from '@/lib/products/catalog';
import { sendEmail } from '@/lib/emails/mailer';
import { buildPurchaseEmail } from '@/lib/emails/product-purchase';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { recordTelemetryEvent } from '@/lib/telemetry/telemetry-store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, email, name, paypalOrderId, profileData, addons, attribution, sessionId } = body;

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

    // ── Calculate total expected price with addons ──
    let expectedPrice = product.priceUsd;
    if (addons?.toolkit) expectedPrice += 29;
    if (addons?.approvalLibrary) expectedPrice += 9;

    // ── Verify PayPal order ──
    const verification = await verifyPayPalOrder(
      paypalOrderId,
      expectedPrice.toFixed(2)
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

    // ── Record main purchase in Google Sheets ──
    const purchase = await recordPurchase({
      email,
      name,
      productId,
      amount: product.priceUsd.toFixed(2),
      paypalOrderId,
      profileData,
      attribution,
    });

    // ── Record Toolkit addon if purchased ──
    if (addons?.toolkit) {
      try {
        await recordPurchase({
          email,
          name,
          productId: 'funding-toolkit',
          amount: '29.00',
          paypalOrderId,
          profileData,
          attribution,
        });
      } catch (err) {
        console.error('⚠️ Failed to record Toolkit addon purchase:', err);
      }
    }

    // ── Record Approval Library addon if purchased ──
    if (addons?.approvalLibrary) {
      try {
        await recordPurchase({
          email,
          name,
          productId: 'funding-approval-library',
          amount: '9.00',
          paypalOrderId,
          profileData,
          attribution,
        });
      } catch (err) {
        console.error('⚠️ Failed to record Approval Library addon purchase:', err);
      }
    }

    // ── Record telemetry event for main purchase ──
    try {
      await recordTelemetryEvent({
        eventName: 'purchase_product',
        sessionId: sessionId || 'sess_anonymous',
        pagePath: attribution?.landingPage || '',
        referrer: attribution?.referrer || 'direct',
        productId,
        revenue: product.priceUsd.toFixed(2),
      });
    } catch (tErr) {
      console.error('⚠️ Failed to log main purchase telemetry event:', tErr);
    }

    // ── Record telemetry event for Toolkit addon if purchased ──
    if (addons?.toolkit) {
      try {
        await recordTelemetryEvent({
          eventName: 'purchase_product',
          sessionId: sessionId || 'sess_anonymous',
          pagePath: attribution?.landingPage || '',
          referrer: attribution?.referrer || 'direct',
          productId: 'funding-toolkit',
          revenue: '29.00',
        });
      } catch (tErr) {
        console.error('⚠️ Failed to log Toolkit purchase telemetry event:', tErr);
      }
    }

    // ── Record telemetry event for Approval Library addon if purchased ──
    if (addons?.approvalLibrary) {
      try {
        await recordTelemetryEvent({
          eventName: 'purchase_product',
          sessionId: sessionId || 'sess_anonymous',
          pagePath: attribution?.landingPage || '',
          referrer: attribution?.referrer || 'direct',
          productId: 'funding-approval-library',
          revenue: '9.00',
        });
      } catch (tErr) {
        console.error('⚠️ Failed to log Approval Library purchase telemetry event:', tErr);
      }
    }

    // ── Sync purchase status back to CRM Leads sheet ──
    try {
      const existing = await SubscriberRepository.getSubscriberByEmail(email);
      const updates: any = {
        region: profileData.province || 'ON',
        industry: profileData.industry || 'other',
        businessStage: profileData.revenue || 'pre-revenue',
        fundingPurpose: profileData.goal || 'expansion',
      };

      if (productId === 'funding-match-report') {
        updates.reportPurchased = true;
        updates.reportTransactionId = paypalOrderId;
        updates.engagementScore = 120;
      } else if (productId === 'funding-roadmap') {
        updates.strategyReportPurchased = true;
        updates.strategyReportTransactionId = paypalOrderId;
        updates.engagementScore = 150;
      } else if (productId === 'funding-bundle') {
        updates.reportPurchased = true;
        updates.reportTransactionId = paypalOrderId;
        updates.strategyReportPurchased = true;
        updates.strategyReportTransactionId = paypalOrderId;
        updates.engagementScore = 150;
      }

      // Parse existing leadActivity or create new
      let activity: any = {};
      if (existing && existing.leadActivity && existing.leadActivity !== 'N/A' && existing.leadActivity !== '{}') {
        try {
          activity = JSON.parse(existing.leadActivity);
        } catch (e) {
          console.error("Failed to parse existing leadActivity JSON:", e);
        }
      }
      activity.paymentCompletedAt = new Date().toISOString();
      activity.purchasedProductId = productId;
      if (addons?.toolkit) activity.purchasedToolkit = true;
      if (addons?.approvalLibrary) activity.purchasedApprovalLibrary = true;
      updates.leadActivity = JSON.stringify(activity);

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
          leadActivity: JSON.stringify(activity),
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
      productName: product.name + (addons?.toolkit ? ' + Toolkit' : '') + (addons?.approvalLibrary ? ' + Approval Library' : ''),
      amount: expectedPrice.toFixed(2),
    });

    await sendEmail({
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
      tagType: 'product-purchase',
    });

    console.log(
      `✅ Product purchase completed: ${product.name} with addons for ${email} (order: ${paypalOrderId})`
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
