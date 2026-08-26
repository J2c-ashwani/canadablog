import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import { verifyPayPalOrder } from '@/lib/payments/paypal';
import { recordPurchase, getAllPurchases, updatePurchaseDeliveryStatus } from '@/lib/products/purchase-store';
import { getProduct } from '@/lib/products/catalog';
import { sendEmail } from '@/lib/emails/mailer';
import { buildPurchaseEmail } from '@/lib/emails/product-purchase';
import { ensureScopedSubscriberTokens, SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { recordTelemetryEvent } from '@/lib/telemetry/telemetry-store';
import {
  getProductPaymentIntent,
  markProductPaymentIntentFulfilled,
  recordProductPaymentCapture,
} from '@/lib/payments/product-payment-intents';
import { grantEntitlements } from '@/lib/products/entitlements';
import { actionContextFromAttribution, recordGrowthActionEvent } from '@/lib/growth-os/action-attribution';

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

function stringValue(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

export async function POST(request: NextRequest) {
  let lockKey = '';
  try {
    const body = await request.json();
    const paymentIntentId = String(body.paymentIntentId || '');
    const paypalOrderId = String(body.paypalOrderId || '');

    // A paid entitlement can only originate from a server-created payment intent.
    // Historical exceptions belong in the reconciliation workflow, never this public route.
    if (body.adminKey) {
      return NextResponse.json({ error: 'Manual fulfilment is disabled on the public purchase endpoint.' }, { status: 403 });
    }

    if (!paypalOrderId) {
      return NextResponse.json(
        { error: 'A valid PayPal order ID is required.' },
        { status: 400 }
      );
    }

    // Lookup a server-created payment intent by its internal ID or provider order ID.
    const lookupId = paymentIntentId || paypalOrderId;
    const paymentIntent = await getProductPaymentIntent(lookupId);
    if (!paymentIntent) {
      return NextResponse.json({ error: 'Payment intent not found. Start checkout again.' }, { status: 409 });
    }
    if (!paymentIntent.paypalOrderId || paymentIntent.paypalOrderId !== paypalOrderId) {
      return NextResponse.json({ error: 'Payment order does not match the server-created intent.' }, { status: 409 });
    }

    const {
      productId,
      email,
      name,
      profileData,
      addons,
      attribution,
      sessionId,
    } = paymentIntent;
    const journeyId = '';
    const funnelId = '';
    const heuristicMetadata = '';
    const calculator_cta_variant = '';
    const normalizedProfileData = {
      province: stringValue(profileData.province, 'ON'),
      industry: stringValue(profileData.industry, 'other'),
      revenue: stringValue(profileData.revenue, 'pre-revenue'),
      goal: stringValue(profileData.goal, 'expansion'),
      company: stringValue(profileData.company),
      phone: stringValue(profileData.phone),
    };

    // ── Idempotency Check & Concurrency Wait Lock ──
    lockKey = paymentIntent.intentId;
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
        if (paymentIntent.status === 'captured' || paymentIntent.status === 'completed') {
          await grantEntitlements({
            purchaseId: existingPurchase.purchaseId,
            email,
            productId,
            orderId: paypalOrderId,
          });
          await markProductPaymentIntentFulfilled(
            paymentIntent.intentId,
            existingPurchase.purchaseId,
            existingPurchase.deliveryStatus || 'retry_pending'
          );
        }
        const credentials = await ensureScopedSubscriberTokens(email);
        const deliveryUrl = productId === 'strategy-audit' || productId === 'strategy-vip'
          ? credentials ? `/booking?token=${encodeURIComponent(credentials.loginToken)}` : ''
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
      landingPage: stringValue(attribution?.landingPage) || stringValue(telemetryFallback.landingPage) || existing?.pagePath || '',
      referrer: stringValue(attribution?.referrer) || stringValue(telemetryFallback.referrer) || existing?.referralSource || 'direct',
      utmSource: stringValue(attribution?.utmSource) || stringValue(telemetryFallback.utmSource) || existing?.utmSource || '',
      utmMedium: stringValue(attribution?.utmMedium) || stringValue(telemetryFallback.utmMedium) || existing?.utmMedium || '',
      utmCampaign: stringValue(attribution?.utmCampaign) || stringValue(telemetryFallback.utmCampaign) || existing?.utmCampaign || '',
      gaClientId: stringValue(attribution?.gaClientId) || existing?.gaClientId || '',
      lastTouchPage: stringValue(attribution?.lastTouchPage),
      lastTouchReferrer: stringValue(attribution?.lastTouchReferrer),
      device: stringValue(attribution?.device),
      browser: stringValue(attribution?.browser),
      country: stringValue(attribution?.country) || existing?.country || '',
      actionId: stringValue(attribution?.actionId),
      actionChannel: stringValue(attribution?.actionChannel),
      actionCampaign: stringValue(attribution?.actionCampaign),
      actionRecipientId: stringValue(attribution?.actionRecipientId),
    };

    // Prices, product IDs, customer, and add-ons come only from the stored intent.
    const expectedPrice = Number(paymentIntent.expectedAmount);
    if (!Number.isFinite(expectedPrice) || expectedPrice < 0.5) {
      return NextResponse.json({ error: 'Invalid server-side payment amount.' }, { status: 400 });
    }
    let addonTotal = 0;
    if (addons?.toolkit) addonTotal += 29;
    if (addons?.approvalLibrary) addonTotal += 9;
    if (addons?.strategySession) addonTotal += 180;
    const netProductPrice = expectedPrice - addonTotal;

    // ── Verify PayPal order ──
    // NOTE: payerEmail is intentionally NOT passed for verification because the PayPal
    // account email frequently differs from the email used on our site (e.g., a company
    // uses ajit@kolethe.com on PayPal but reach@sutrakatha.ca on our checkout form).
    // The payer email mismatch check was causing real payments to be rejected.
    const verification = await verifyPayPalOrder(
      paypalOrderId,
      expectedPrice.toFixed(2),
      {
        customId: paymentIntent.intentId,
        referenceId: productId,
        currency: paymentIntent.currency,
      }
    );

    if (!verification.verified) {
      console.error(
        `❌ PayPal verification failed for order ${paypalOrderId}:`,
        verification.error,
        `| Product: ${productId} | Email: ${email} | Amount: $${expectedPrice.toFixed(2)}`
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

      // ── MANUAL REVIEW QUEUE ──
      // Instead of silently rejecting, record a pending-review purchase so the customer
      // is not left without product after a real payment. Admin is alerted to investigate.
      try {
        const pendingPurchase = await recordPurchase({
          email,
          name,
          productId,
          amount: expectedPrice.toFixed(2),
          paypalOrderId,
          profileData: normalizedProfileData,
          attribution: resolvedAttribution,
          status: 'pending_review',
          currency: paymentIntent.currency,
          paymentStatus: 'verification_failed',
          deliveryStatus: 'not_triggered',
        });
        console.log(`📋 Order ${paypalOrderId} placed in MANUAL REVIEW queue. Purchase ID: ${pendingPurchase.purchaseId}`);

        // Alert owner with manual review instructions
        const adminEmail = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';
        await sendEmail({
          to: adminEmail,
          subject: '🔍 MANUAL REVIEW REQUIRED: PayPal Payment Needs Verification',
          html: `<p><strong>ACTION REQUIRED:</strong> A PayPal payment was received but automated verification failed. The order has been placed in the <strong>Manual Review Queue</strong>.</p>
                 <p><strong>Customer Email:</strong> ${email}</p>
                 <p><strong>Customer Name:</strong> ${name}</p>
                 <p><strong>Product:</strong> ${product.name} (ID: ${productId})</p>
                 <p><strong>Expected Price:</strong> $${expectedPrice.toFixed(2)}</p>
                 <p><strong>PayPal Order ID:</strong> ${paypalOrderId}</p>
                 <p><strong>Payment Intent ID:</strong> ${paymentIntentId}</p>
                 <p><strong>Verification Error:</strong> ${verification.error || 'Unknown'}</p>
                 <hr/>
                 <p><strong>Next Steps:</strong></p>
                 <ol>
                   <li>Check your PayPal dashboard for Order ID: ${paypalOrderId}</li>
                   <li>If payment is confirmed, mark the purchase as completed and send the product</li>
                   <li>If payment is NOT in PayPal, this may be a fraud attempt — take no action</li>
                 </ol>
                 <p>The customer has been told their order is being processed.</p>`,
          text: `MANUAL REVIEW: PayPal order ${paypalOrderId} from ${email} for ${product.name} ($${expectedPrice.toFixed(2)}). Verification error: ${verification.error}. Check PayPal dashboard and fulfill if confirmed.`,
          tagType: 'security-alert'
        }).catch(err => console.error('Failed to send manual review email:', err));

        // Return a non-error response so the customer knows their order was received
        return NextResponse.json(
          {
            error: 'Your payment has been received and is being processed. You will receive a confirmation email shortly. If you have questions, contact hello@fsidigital.ca',
            pendingReview: true,
          },
          { status: 202 }
        );
      } catch (queueErr) {
        console.error('❌ Failed to queue order for manual review:', queueErr);
        // Fall through to the original rejection if even the queue fails
      }

      // Absolute fallback: alert admin and reject
      const adminEmail = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';
      await sendEmail({
        to: adminEmail,
        subject: '⚠️ PAYMENT SECURITY ANOMALY: Purchase Verification Failed',
        html: `<p><strong>WARNING:</strong> A product checkout payment verification failed on <code>/api/products/purchase</code>.</p>
               <p><strong>Product:</strong> ${product.name} (ID: ${productId})</p>
               <p><strong>Customer:</strong> ${name} (${email})</p>
               <p><strong>Expected Price:</strong> $${expectedPrice.toFixed(2)}</p>
               <p><strong>PayPal Order ID:</strong> ${paypalOrderId}</p>
               <p><strong>Payment Intent ID:</strong> ${paymentIntentId}</p>
               <p><strong>Error Details:</strong> ${verification.error || 'Verification failed'}</p>
               <p>The transaction has been rejected. Check PayPal dashboard to verify if funds were received.</p>`,
        text: `WARNING: Purchase verification failed. Product: ${product.name}. Customer: ${email}. Order: ${paypalOrderId}. Error: ${verification.error || 'Verification failed'}`,
        tagType: 'security-alert'
      }).catch(err => console.error('Failed to send security warning email:', err));


      return NextResponse.json(
        { error: verification.error || 'Payment verification failed' },
        { status: 400 }
      );
    }

    const paypalCaptureId = 'captureId' in verification ? verification.captureId || '' : '';
    await recordProductPaymentCapture(paymentIntent.intentId, paypalCaptureId);
    const capturedAction = actionContextFromAttribution(resolvedAttribution);
    if (capturedAction) {
      await recordGrowthActionEvent({
        eventId: `purchase:paypal:${paypalCaptureId}`,
        ...capturedAction,
        eventType: 'purchase_verified',
        provider: 'paypal',
        providerMessageId: '',
        productId,
        revenueUSD: paymentIntent.currency.toUpperCase() === 'USD' ? expectedPrice : 0,
        revenueCAD: paymentIntent.currency.toUpperCase() === 'CAD' ? expectedPrice : 0,
        mrrUSD: 0,
        referenceId: paypalCaptureId,
        metadata: { orderId: paypalOrderId, currency: paymentIntent.currency },
      }).catch((error) => console.error('Verified PayPal purchase attribution write failed:', error));
    }

    // ── Record main purchase in Google Sheets ──
    const purchase = await recordPurchase({
      email,
      name,
      productId,
      amount: netProductPrice.toFixed(2),
      paypalOrderId,
      profileData: normalizedProfileData,
      attribution: resolvedAttribution,
      currency: paymentIntent.currency,
      paypalCaptureId,
      paymentStatus: 'provider_capture_verified',
      deliveryStatus: 'retry_pending',
    });
    await grantEntitlements({
      purchaseId: purchase.purchaseId,
      email,
      productId,
      orderId: paypalOrderId,
    });

    // ── Record Toolkit addon if purchased ──
    if (addons?.toolkit) {
      try {
        const addonPurchase = await recordPurchase({
          email,
          name,
          productId: 'funding-toolkit',
          amount: '29.00',
          paypalOrderId,
          profileData: normalizedProfileData,
          attribution: resolvedAttribution,
          currency: paymentIntent.currency,
          paypalCaptureId,
          paymentStatus: 'provider_capture_verified',
          deliveryStatus: 'retry_pending',
        });
        await grantEntitlements({
          purchaseId: addonPurchase.purchaseId,
          email,
          productId: 'funding-toolkit',
          orderId: paypalOrderId,
        });
      } catch (err) {
        console.error('⚠️ Failed to record Toolkit addon purchase:', err);
      }
    }

    // ── Record Approval Library addon if purchased ──
    if (addons?.approvalLibrary) {
      try {
        const addonPurchase = await recordPurchase({
          email,
          name,
          productId: 'funding-approval-library',
          amount: '9.00',
          paypalOrderId,
          profileData: normalizedProfileData,
          attribution: resolvedAttribution,
          currency: paymentIntent.currency,
          paypalCaptureId,
          paymentStatus: 'provider_capture_verified',
          deliveryStatus: 'retry_pending',
        });
        await grantEntitlements({
          purchaseId: addonPurchase.purchaseId,
          email,
          productId: 'funding-approval-library',
          orderId: paypalOrderId,
        });
      } catch (err) {
        console.error('⚠️ Failed to record Approval Library addon purchase:', err);
      }
    }

    // ── Record Strategy Session addon if purchased (Upgrade Credit applied) ──
    if (addons?.strategySession) {
      try {
        const addonPurchase = await recordPurchase({
          email,
          name,
          productId: 'strategy-session',
          amount: '180.00',
          paypalOrderId,
          profileData: normalizedProfileData,
          attribution: resolvedAttribution,
          currency: paymentIntent.currency,
          paypalCaptureId,
          paymentStatus: 'provider_capture_verified',
          deliveryStatus: 'retry_pending',
        });
        await grantEntitlements({
          purchaseId: addonPurchase.purchaseId,
          email,
          productId: 'strategy-session',
          orderId: paypalOrderId,
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
        region: normalizedProfileData.province,
        industry: normalizedProfileData.industry,
        businessStage: normalizedProfileData.revenue,
        fundingPurpose: normalizedProfileData.goal,
        phone: normalizedProfileData.phone || undefined,
      };

      // Set UTM parameters on subscriber updates
      if (resolvedAttribution.utmSource) updates.utmSource = resolvedAttribution.utmSource;
      if (resolvedAttribution.utmMedium) updates.utmMedium = resolvedAttribution.utmMedium;
      if (resolvedAttribution.utmCampaign) updates.utmCampaign = resolvedAttribution.utmCampaign;
      if (resolvedAttribution.gaClientId) updates.gaClientId = resolvedAttribution.gaClientId;

      if (productId === 'funding-match-report' || productId === 'portfolio-assessment') {
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
        console.log("✅ Main CRM lead updated as buyer");
      } else {
        await SubscriberRepository.saveSubscriber({
          email,
          name,
          phone: normalizedProfileData.phone,
          country: 'Canada', // Default fallback country
          region: normalizedProfileData.province,
          industry: normalizedProfileData.industry,
          companySize: '1-9',
          fundingInterests: ['Grants'],
          website: '',
          companyName: '',
          leadActivity: JSON.stringify(activity),
        });
        await SubscriberRepository.updateSubscriberPreferences(email, updates);
        console.log("✅ Main CRM lead created and marked as buyer");
      }
    } catch (crmErr) {
      console.error('⚠️ CRM Leads sheet update failed but purchase was completed:', crmErr);
    }

    let credentials: Awaited<ReturnType<typeof ensureScopedSubscriberTokens>> = null;
    try {
      credentials = await ensureScopedSubscriberTokens(email);
    } catch (credErr) {
      console.error('⚠️ ensureScopedSubscriberTokens failed (non-blocking, purchase already completed):', credErr);
    }
    // If credentials could not be issued, the purchase is still valid — the user can access via accessToken
    if (!credentials) {
      console.warn(`⚠️ Secure credentials could not be issued for ${email}. Purchase ${purchase.purchaseId} is valid but user will need manual token recovery.`);
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

    const emailResult = await sendEmail({
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
      tagType: 'product-purchase',
    });
    await updatePurchaseDeliveryStatus(
      purchase.purchaseId,
      emailResult.success ? 'provider_accepted' : 'retry_pending',
      emailResult.providerMessageId || ''
    ).catch((deliveryLedgerError) => {
      console.error('❌ Could not persist product delivery state:', deliveryLedgerError);
    });

    console.log(
      `✅ Product purchase completed: ${product.name} with addons for ${email} (order: ${paypalOrderId})`
    );

    await markProductPaymentIntentFulfilled(
      paymentIntent.intentId,
      purchase.purchaseId,
      emailResult.success ? 'provider_accepted' : 'retry_pending'
    );

    // ── Return success ──
    const deliveryUrl = (productId === 'strategy-audit' || productId === 'strategy-vip' || addons?.strategySession)
      ? (credentials ? `/booking?token=${encodeURIComponent(credentials.loginToken)}` : `/booking`)
      : `/products/report?token=${purchase.accessToken}`;

    return NextResponse.json({
      success: true,
      accessToken: purchase.accessToken,
      deliveryUrl,
      loginToken: credentials?.loginToken || null,
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
