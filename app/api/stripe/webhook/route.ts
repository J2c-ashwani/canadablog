import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/payments/stripe';
import { getProduct } from '@/lib/products/catalog';
import { recordPurchase, getAllPurchases } from '@/lib/products/purchase-store';
import { sendEmail } from '@/lib/emails/mailer';
import { buildPurchaseEmail } from '@/lib/emails/product-purchase';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { recordTelemetryEvent } from '@/lib/telemetry/telemetry-store';

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
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  let event: any;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const isProduction = process.env.NODE_ENV === 'production';

    if (isProduction && !webhookSecret) {
      const errorMsg = 'Critical security error: STRIPE_WEBHOOK_SECRET is missing in production!';
      console.error(`❌ ${errorMsg}`);
      
      await recordTelemetryEvent({
        eventName: 'security_anomaly',
        sessionId: 'stripe_webhook',
        pagePath: '/api/stripe/webhook',
        referrer: 'stripe',
        trafficQualityClassification: 'CRITICAL_SECURITY',
        utmSource: 'security',
        utmMedium: 'stripe_signature_bypass',
        utmCampaign: 'missing_webhook_secret',
      }).catch(() => {});

      const adminEmail = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';
      await sendEmail({
        to: adminEmail,
        subject: '⚠️ CRITICAL SECURITY WARNING: Stripe Webhook Vulnerability',
        html: `<p><strong>CRITICAL WARNING:</strong> The Stripe Webhook endpoint was triggered in production, but <code>STRIPE_WEBHOOK_SECRET</code> is missing in your environment variables.</p>
               <p>The request has been rejected for safety to prevent payment bypass exploits.</p>
               <p><strong>Action required:</strong> Configure <code>STRIPE_WEBHOOK_SECRET</code> on your server immediately.</p>`,
        text: 'CRITICAL WARNING: Stripe Webhook triggered but STRIPE_WEBHOOK_SECRET is missing. Configure it immediately.',
        tagType: 'security-alert'
      }).catch(err => console.error('Failed to send security warning email:', err));


      return NextResponse.json({ error: 'Internal configuration error' }, { status: 500 });
    }

    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } else {
      // Dev mode or unconfigured fallback
      event = JSON.parse(payload);
    }
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed:`, err.message);

    await recordTelemetryEvent({
      eventName: 'security_anomaly',
      sessionId: 'stripe_webhook',
      pagePath: '/api/stripe/webhook',
      referrer: 'stripe',
      trafficQualityClassification: 'INVALID_SIGNATURE',
      utmSource: 'security',
      utmMedium: 'stripe_signature_failed',
      utmCampaign: err.message,
    }).catch(() => {});

    const adminEmail = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';
    await sendEmail({
      to: adminEmail,
      subject: '⚠️ SECURITY ANOMALY: Stripe Webhook Signature Failed',
      html: `<p><strong>WARNING:</strong> A Stripe Webhook payload failed signature verification.</p>
             <p><strong>Error Message:</strong> ${err.message}</p>
             <p>The request was rejected with a 400 Bad Request status.</p>`,
      text: `WARNING: Stripe Webhook signature verification failed. Error: ${err.message}`,
      tagType: 'security-alert'
    }).catch(err => console.error('Failed to send security warning email:', err));


    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Handle checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const sessionId = session.id;

    console.log(`🔔 Webhook received for Stripe session: ${sessionId}`);

    try {
      const { productId, email, name, profileData: profileDataRaw, addons: addonsRaw, attribution: attributionRaw } = session.metadata || {};

      if (!productId || !email || !name || !profileDataRaw) {
        console.warn('⚠️ Webhook session is missing metadata, skipping processing');
        return NextResponse.json({ received: true });
      }

      const profileData = JSON.parse(profileDataRaw);
      const addons = JSON.parse(addonsRaw || '{}');
      const attribution = JSON.parse(attributionRaw || '{}');

      // Double-lock write check
      const allPurchases = await getAllPurchases();
      const existing = allPurchases.find((p) => p.paypalOrderId === sessionId);

      if (existing) {
        console.log(`ℹ️ Webhook: Purchase for session ${sessionId} already processed, skipping duplicate.`);
        return NextResponse.json({ received: true });
      }

      const product = getProduct(productId);
      if (!product) throw new Error(`Product not found: ${productId}`);

      let expectedPrice = product.priceUsd;
      if (addons?.toolkit) expectedPrice += 29;
      if (addons?.approvalLibrary) expectedPrice += 9;

      // 1. Record main purchase
      const purchase = await recordPurchase({
        email,
        name,
        productId,
        amount: product.priceUsd.toFixed(2),
        paypalOrderId: sessionId,
        profileData,
        attribution,
      });

      // 2. Record Toolkit addon
      if (addons?.toolkit) {
        try {
          await recordPurchase({
            email,
            name,
            productId: 'funding-toolkit',
            amount: '29.00',
            paypalOrderId: sessionId,
            profileData,
            attribution,
          });
        } catch (err) {
          console.error('⚠️ Webhook: Failed to record Toolkit addon:', err);
        }
      }

      // 3. Record Approval Library addon
      if (addons?.approvalLibrary) {
        try {
          await recordPurchase({
            email,
            name,
            productId: 'funding-approval-library',
            amount: '9.00',
            paypalOrderId: sessionId,
            profileData,
            attribution,
          });
        } catch (err) {
          console.error('⚠️ Webhook: Failed to record Approval Library addon:', err);
        }
      }

      // 4. Log telemetry
      try {
        await recordTelemetryEvent({
          eventName: productId === 'strategy-audit' ? 'strategy_audit_purchased' : 'purchase_product',
          sessionId: 'sess_stripe_webhook',
          pagePath: attribution?.landingPage || '',
          referrer: attribution?.referrer || 'direct',
          productId,
          revenue: product.priceUsd.toFixed(2),
        });
      } catch (tErr) {
        console.error('⚠️ Webhook telemetry log failed:', tErr);
      }

      // 5. CRM Leads Sync
      try {
        const lead = await SubscriberRepository.getSubscriberByEmail(email);
        const updates: any = {
          region: profileData.province || 'ON',
          industry: profileData.industry || 'other',
          businessStage: profileData.revenue || 'pre-revenue',
          fundingPurpose: profileData.goal || 'expansion',
          phone: profileData.phone || undefined,
        };

        if (attribution?.utmSource) updates.utmSource = attribution.utmSource;
        if (attribution?.utmMedium) updates.utmMedium = attribution.utmMedium;
        if (attribution?.utmCampaign) updates.utmCampaign = attribution.utmCampaign;
        if (attribution?.gaClientId) updates.gaClientId = attribution.gaClientId;

        if (productId === 'funding-match-report') {
          updates.reportPurchased = true;
          updates.reportTransactionId = sessionId;
          updates.engagementScore = 120;
          if (shouldUpdateStage(lead?.offlineStatus, 'Report Buyer')) {
            updates.offlineStatus = 'Report Buyer';
          }
        } else if (productId === 'funding-roadmap') {
          updates.strategyReportPurchased = true;
          updates.strategyReportTransactionId = sessionId;
          updates.engagementScore = 150;
          if (shouldUpdateStage(lead?.offlineStatus, 'Report Buyer')) {
            updates.offlineStatus = 'Report Buyer';
          }
        } else if (productId === 'funding-bundle') {
          updates.reportPurchased = true;
          updates.reportTransactionId = sessionId;
          updates.strategyReportPurchased = true;
          updates.strategyReportTransactionId = sessionId;
          updates.engagementScore = 150;
          if (shouldUpdateStage(lead?.offlineStatus, 'Report Buyer')) {
            updates.offlineStatus = 'Report Buyer';
          }
        } else if (productId === 'strategy-audit') {
          updates.strategyReportPurchased = true;
          updates.strategyReportTransactionId = sessionId;
          updates.engagementScore = 200;
          if (shouldUpdateStage(lead?.offlineStatus, 'Audit Buyer')) {
            updates.offlineStatus = 'Audit Buyer';
          }
        }

        let activity: any = {};
        if (lead && lead.leadActivity && lead.leadActivity !== 'N/A' && lead.leadActivity !== '{}') {
          try {
            activity = JSON.parse(lead.leadActivity);
          } catch (e) {
            console.error("Failed to parse leadActivity:", e);
          }
        }
        activity.paymentCompletedAt = new Date().toISOString();
        activity.purchasedProductId = productId;
        activity.stripeSessionId = sessionId;
        if (addons?.toolkit) activity.purchasedToolkit = true;
        if (addons?.approvalLibrary) activity.purchasedApprovalLibrary = true;
        updates.leadActivity = JSON.stringify(activity);

        if (lead) {
          await SubscriberRepository.updateSubscriberPreferences(email, updates);
        } else {
          await SubscriberRepository.saveSubscriber({
            email,
            name,
            phone: profileData.phone || '',
            country: 'Canada',
            region: profileData.province || 'ON',
            industry: profileData.industry || 'other',
            companySize: '1-9',
            fundingInterests: ['Grants'],
            website: '',
            companyName: '',
            leadActivity: JSON.stringify(activity),
          });
          await SubscriberRepository.updateSubscriberPreferences(email, updates);
        }
      } catch (crmErr) {
        console.error('⚠️ Webhook CRM leads sync failed:', crmErr);
      }

      // 6. Send confirmation email
      const emailContent = buildPurchaseEmail({
        name,
        email,
        accessToken: purchase.accessToken,
        paypalOrderId: sessionId,
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

      console.log(`✅ Stripe webhook processed successfully: ${email}`);

    } catch (procErr) {
      console.error('❌ Webhook handler execution failed:', procErr);
      return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
