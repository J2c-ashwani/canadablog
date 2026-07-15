import { NextRequest, NextResponse } from 'next/server';
import { verifyPayPalOrder } from '@/lib/payments/paypal';
import { recordPurchase, getPurchasesByEmail, getAllPurchases } from '@/lib/products/purchase-store';
import { getProduct } from '@/lib/products/catalog';
import { sendEmail } from '@/lib/emails/mailer';
import { buildPurchaseEmail } from '@/lib/emails/product-purchase';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { recordTelemetryEvent } from '@/lib/telemetry/telemetry-store';

// Global in-memory lock set to prevent concurrent purchase race conditions
const activeLocks = new Set<string>();

const STAGE_HIERARCHY = [
  'Lead',
  'Calculator Lead',
  'Report Buyer',
  'Audit Buyer',
  'Booked Audit',
  'Audit Attended',
  'Audit Completed',
  'Filing Prospect',
  'Filing Client Signed',
  'Filing Client',
  'Won'
];

function shouldUpdateStage(currentStage: string | undefined, newStage: string): boolean {
  if (!currentStage) return true;
  const normalizedCurrent = currentStage.trim();
  const normalizedNew = newStage.trim();
  const currentIndex = STAGE_HIERARCHY.indexOf(normalizedCurrent);
  const newIndex = STAGE_HIERARCHY.indexOf(normalizedNew);
  if (currentIndex === -1) return true;
  return newIndex > currentIndex;
}

export async function POST(request: NextRequest) {
  let lockKey = '';
  try {
    const body = await request.json();
    const { productId, email, name, paypalOrderId, profileData, addons, attribution, sessionId, journeyId, funnelId, heuristicMetadata, calculator_cta_variant } = body;

    // ── Validate required fields ──
    if (!productId || !email || !name || !paypalOrderId || !profileData) {
      return NextResponse.json(
        { error: 'Missing required fields: productId, email, name, paypalOrderId, profileData' },
        { status: 400 }
      );
    }

    // ── Idempotency Check & Concurrency Wait Lock ──
    lockKey = `${paypalOrderId}_${productId}`;
    if (activeLocks.has(lockKey)) {
      console.log(`⏳ Concurrent request lock hit for ${lockKey}. Waiting...`);
      let checks = 0;
      while (activeLocks.has(lockKey) && checks < 5) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        checks++;
      }
    }

    try {
      const allPurchases = await getAllPurchases();
      const existingPurchase = allPurchases.find(
        (p: any) => p.paypalOrderId === paypalOrderId && p.productId === productId
      );
      if (existingPurchase) {
        console.log(`ℹ️ Duplicate purchase request resolved. Order ID: ${paypalOrderId}. Returning existing token: ${existingPurchase.accessToken}`);
        const deliveryUrl = productId === 'strategy-audit'
          ? `/booking?email=${encodeURIComponent(email)}&order=${encodeURIComponent(paypalOrderId)}`
          : `/products/report?token=${existingPurchase.accessToken}`;
        return NextResponse.json({
          success: true,
          accessToken: existingPurchase.accessToken,
          deliveryUrl,
        });
      }
    } catch (sheetErr) {
      console.error('⚠️ Failed to check duplicate purchases from Sheets (non-blocking):', sheetErr);
    }

    activeLocks.add(lockKey);

    // ── Validate product exists ──
    const product = getProduct(productId);
    if (!product) {
      return NextResponse.json(
        { error: `Invalid product: ${productId}` },
        { status: 400 }
      );
    }

    // Load existing lead for database-level attribution fallback
    const existing = await SubscriberRepository.getSubscriberByEmail(email);

    // Dynamic session-level telemetry fallback if direct attribution is missing
    let telemetryFallback: any = {};
    if (sessionId && sessionId !== 'sess_anonymous') {
      try {
        const { getTelemetryEvents } = await import('@/lib/telemetry/telemetry-store');
        const allEvents = await getTelemetryEvents();
        // Find the earliest event for this sessionId to trace landing page & UTMs
        const sessionEvents = allEvents
          .filter(e => e.sessionId === sessionId)
          .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        
        if (sessionEvents.length > 0) {
          const firstEvent = sessionEvents[0];
          telemetryFallback = {
            landingPage: firstEvent.pagePath,
            referrer: firstEvent.referrer,
            utmSource: firstEvent.utmSource,
            utmMedium: firstEvent.utmMedium,
            utmCampaign: firstEvent.utmCampaign,
          };
        }
      } catch (telErr) {
        console.error('⚠️ Telemetry fallback resolution failed:', telErr);
      }
    }

    const resolvedAttribution = {
      landingPage: attribution?.landingPage || telemetryFallback.landingPage || existing?.pagePath || '',
      referrer: attribution?.referrer || telemetryFallback.referrer || existing?.referralSource || 'direct',
      utmSource: attribution?.utmSource || telemetryFallback.utmSource || existing?.utmSource || '',
      utmMedium: attribution?.utmMedium || telemetryFallback.utmMedium || existing?.utmMedium || '',
      utmCampaign: attribution?.utmCampaign || telemetryFallback.utmCampaign || existing?.utmCampaign || '',
      gaClientId: attribution?.gaClientId || existing?.gaClientId || '',
      lastTouchPage: attribution?.lastTouchPage || '',
      lastTouchReferrer: attribution?.lastTouchReferrer || '',
      device: attribution?.device || '',
      browser: attribution?.browser || '',
      country: attribution?.country || existing?.country || '',
    };

    // ── Check past purchases to calculate upgrade credit (Task 6 Repeat customer guard) ──
    const purchases = await getPurchasesByEmail(email);
    let totalCredit = 0;
    
    const hasAlreadyPurchasedStrategy = purchases.some(p => p.productId === 'strategy-session' || p.productId === 'strategy-audit');
    if ((productId === 'strategy-audit' || productId === 'strategy-session') && !hasAlreadyPurchasedStrategy) {
      const hasReport = purchases.some(p => p.productId === 'funding-match-report');
      if (hasReport) {
        totalCredit = 19; // Apply the $19 report credit exactly once
      }
    }

    // ── Calculate total expected price with addons ──
    let netProductPrice = product.priceUsd - totalCredit;
    if (netProductPrice < 0.50) {
      netProductPrice = 0.50; // Minimum floor matching Stripe/PayPal processing
    }

    let expectedPrice = netProductPrice;
    if (addons?.toolkit) expectedPrice += 29;
    if (addons?.approvalLibrary) expectedPrice += 9;
    if (addons?.strategySession) expectedPrice += 180;

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

      // Security telemetry tracking
      await recordTelemetryEvent({
        eventName: 'security_anomaly',
        sessionId: paypalOrderId,
        pagePath: '/api/products/purchase',
        referrer: 'paypal',
        trafficQualityClassification: 'PAYMENT_VERIFICATION_FAILED',
        utmSource: 'security',
        utmMedium: 'paypal_purchase_failed',
        utmCampaign: verification.error || 'unknown_error',
      }).catch(() => {});

      // Alert owner
      const adminEmail = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';
      await sendEmail({
        to: adminEmail,
        subject: '⚠️ PAYMENT SECURITY ANOMALY: Purchase Verification Failed',
        html: `<p><strong>WARNING:</strong> A product checkout payment verification failed on <code>/api/products/purchase</code>.</p>
               <p><strong>Product:</strong> ${product.name} (ID: ${productId})</p>
               <p><strong>Expected Price:</strong> $${expectedPrice.toFixed(2)}</p>
               <p><strong>PayPal Order ID:</strong> ${paypalOrderId}</p>
               <p><strong>Error Details:</strong> ${verification.error || 'Verification failed'}</p>
               <p>The transaction has been rejected.</p>`,
        text: `WARNING: Purchase verification failed. Product: ${product.name}. Order: ${paypalOrderId}. Error: ${verification.error || 'Verification failed'}`,
        tagType: 'security-alert'
      }).catch(err => console.error('Failed to send security warning email:', err));


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
      amount: netProductPrice.toFixed(2),
      paypalOrderId,
      profileData,
      attribution: resolvedAttribution,
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
          attribution: resolvedAttribution,
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
          attribution: resolvedAttribution,
        });
      } catch (err) {
        console.error('⚠️ Failed to record Approval Library addon purchase:', err);
      }
    }

    // ── Record Strategy Session addon if purchased (Upgrade Credit applied) ──
    if (addons?.strategySession) {
      try {
        await recordPurchase({
          email,
          name,
          productId: 'strategy-session',
          amount: '180.00',
          paypalOrderId,
          profileData,
          attribution: resolvedAttribution,
        });
      } catch (err) {
        console.error('⚠️ Failed to record Strategy Session addon purchase:', err);
      }
    }

    // ── Record telemetry event for main purchase ──
    try {
      await recordTelemetryEvent({
        eventName: productId === 'strategy-audit' ? 'strategy_audit_purchased' : 'purchase_product',
        sessionId: sessionId || 'sess_anonymous',
        pagePath: resolvedAttribution.landingPage || '',
        referrer: resolvedAttribution.referrer || 'direct',
        productId,
        revenue: product.priceUsd.toFixed(2),
        journeyId,
        funnelId,
        heuristicMetadata,
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
          pagePath: resolvedAttribution.landingPage || '',
          referrer: resolvedAttribution.referrer || 'direct',
          productId: 'funding-toolkit',
          revenue: '29.00',
          journeyId,
          funnelId,
          heuristicMetadata,
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
          pagePath: resolvedAttribution.landingPage || '',
          referrer: resolvedAttribution.referrer || 'direct',
          productId: 'funding-approval-library',
          revenue: '9.00',
          journeyId,
          funnelId,
          heuristicMetadata,
        });
      } catch (tErr) {
        console.error('⚠️ Failed to log Approval Library purchase telemetry event:', tErr);
      }
    }

    // ── Record telemetry event for Strategy Session addon if purchased ──
    if (addons?.strategySession) {
      try {
        await recordTelemetryEvent({
          eventName: 'strategy_audit_purchased',
          sessionId: sessionId || 'sess_anonymous',
          pagePath: resolvedAttribution.landingPage || '',
          referrer: resolvedAttribution.referrer || 'direct',
          productId: 'strategy-session',
          revenue: '180.00',
          journeyId,
          funnelId,
          heuristicMetadata,
        });
      } catch (tErr) {
        console.error('⚠️ Failed to log Strategy Session purchase telemetry event:', tErr);
      }
    }

    // ── Sync purchase status back to CRM Leads sheet ──
    try {
      const updates: any = {
        region: profileData.province || 'ON',
        industry: profileData.industry || 'other',
        businessStage: profileData.revenue || 'pre-revenue',
        fundingPurpose: profileData.goal || 'expansion',
        phone: profileData.phone || undefined,
      };

      // Set UTM parameters on subscriber updates
      if (resolvedAttribution.utmSource) updates.utmSource = resolvedAttribution.utmSource;
      if (resolvedAttribution.utmMedium) updates.utmMedium = resolvedAttribution.utmMedium;
      if (resolvedAttribution.utmCampaign) updates.utmCampaign = resolvedAttribution.utmCampaign;
      if (resolvedAttribution.gaClientId) updates.gaClientId = resolvedAttribution.gaClientId;

      if (productId === 'funding-match-report') {
        updates.reportPurchased = true;
        updates.reportTransactionId = paypalOrderId;
        updates.engagementScore = 120;
        if (shouldUpdateStage(existing?.offlineStatus, 'Report Buyer')) {
          updates.offlineStatus = 'Report Buyer';
        }
      } else if (productId === 'funding-roadmap') {
        updates.strategyReportPurchased = true;
        updates.strategyReportTransactionId = paypalOrderId;
        updates.engagementScore = 150;
        if (shouldUpdateStage(existing?.offlineStatus, 'Report Buyer')) {
          updates.offlineStatus = 'Report Buyer';
        }
      } else if (productId === 'funding-bundle') {
        updates.reportPurchased = true;
        updates.reportTransactionId = paypalOrderId;
        updates.strategyReportPurchased = true;
        updates.strategyReportTransactionId = paypalOrderId;
        updates.engagementScore = 150;
        if (shouldUpdateStage(existing?.offlineStatus, 'Report Buyer')) {
          updates.offlineStatus = 'Report Buyer';
        }
      } else if (productId === 'strategy-audit' || productId === 'strategy-session') {
        updates.strategyReportPurchased = true;
        updates.strategyReportTransactionId = paypalOrderId;
        updates.engagementScore = 200;
        if (shouldUpdateStage(existing?.offlineStatus, 'Audit Buyer')) {
          updates.offlineStatus = 'Audit Buyer';
        }
      }

      if (addons?.strategySession) {
        updates.strategyReportPurchased = true;
        updates.strategyReportTransactionId = paypalOrderId;
        updates.engagementScore = 200;
        if (shouldUpdateStage(existing?.offlineStatus, 'Audit Buyer')) {
          updates.offlineStatus = 'Audit Buyer';
        }
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
      if (journeyId) activity.journeyId = journeyId;
      if (funnelId) activity.funnelId = funnelId;
      if (calculator_cta_variant) activity.calculator_cta_variant = calculator_cta_variant;
      
      if (productId === 'strategy-audit') {
        activity.auditPurchasedAt = activity.paymentCompletedAt;
        activity.depositPaid = true;
        activity.depositPaidAt = activity.paymentCompletedAt;
      }

      if (addons) {
        if (!activity.addons) activity.addons = {};
        if (addons.toolkit) {
          activity.purchasedToolkit = true;
          activity.addons.toolkit = true;
        }
        if (addons.approvalLibrary) {
          activity.purchasedApprovalLibrary = true;
          activity.addons.approvalLibrary = true;
        }
        if (addons.strategySession) {
          activity.addons.strategySession = true;
        }
      }
      updates.leadActivity = JSON.stringify(activity);

      if (existing) {
        await SubscriberRepository.updateSubscriberPreferences(email, updates);
        console.log(`✅ Main CRM lead updated as buyer for: ${email}`);
      } else {
        await SubscriberRepository.saveSubscriber({
          email,
          name,
          phone: profileData.phone || '',
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
    const deliveryUrl = productId === 'strategy-audit'
      ? `/booking?email=${encodeURIComponent(email)}&order=${encodeURIComponent(paypalOrderId)}`
      : `/products/report?token=${purchase.accessToken}`;

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
  } finally {
    if (lockKey) {
      activeLocks.delete(lockKey);
    }
  }
}
