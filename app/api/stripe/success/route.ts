import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/payments/stripe';
import { getProduct } from '@/lib/products/catalog';
import { recordPurchase, getAllPurchases } from '@/lib/products/purchase-store';
import { sendEmail } from '@/lib/emails/mailer';
import { buildPurchaseEmail } from '@/lib/emails/product-purchase';
import { ensureScopedSubscriberTokens, SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { recordTelemetryEvent } from '@/lib/telemetry/telemetry-store';
import { grantEntitlements } from '@/lib/products/entitlements';

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

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('session_id');

    if (!sessionId) {
      return new NextResponse(
        `<html><body style="font-family:sans-serif;text-align:center;padding:50px;background:#f8fafc;">
          <h2 style="color:#dc2626;">Invalid Session</h2>
          <p>Missing checkout session identifier.</p>
        </body></html>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Retrieve checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session || session.payment_status !== 'paid') {
      return new NextResponse(
        `<html><body style="font-family:sans-serif;text-align:center;padding:50px;background:#f8fafc;">
          <h2 style="color:#dc2626;">Payment Verification Pending</h2>
          <p>We are verifying your payment. Please refresh this page in a moment.</p>
        </body></html>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    const { productId, email, name, profileData: profileDataRaw, addons: addonsRaw, attribution: attributionRaw, expectedAmount, currency, baseAmount } = session.metadata || {};

    if (!productId || !email || !name || !profileDataRaw) {
      throw new Error('Required session metadata is missing');
    }

    const profileData = JSON.parse(profileDataRaw);
    const addons = JSON.parse(addonsRaw || '{}');
    const attribution = JSON.parse(attributionRaw || '{}');
    const serverAmount = Number(expectedAmount);
    if (!Number.isFinite(serverAmount) || session.amount_total !== Math.round(serverAmount * 100) || session.currency?.toUpperCase() !== String(currency || '').toUpperCase()) {
      throw new Error('Stripe session commercial terms did not match the server-owned checkout record');
    }

    // ── Check if already recorded to prevent duplication ──
    const allPurchases = await getAllPurchases();
    const existing = allPurchases.find((p) => p.paypalOrderId === sessionId);

    let accessToken = '';

    if (existing) {
      accessToken = existing.accessToken;
      console.log(`ℹ️ Purchase for Stripe session ${sessionId} already processed, skipping duplicate write.`);
    } else {
      const product = getProduct(productId);
      if (!product) throw new Error(`Product not found: ${productId}`);

      const expectedPrice = serverAmount;

      // 1. Record main purchase (map Stripe sessionId to paypalOrderId col)
      const purchase = await recordPurchase({
        email,
        name,
        productId,
        amount: String(baseAmount || product.priceUsd),
        paypalOrderId: sessionId,
        profileData,
        attribution,
      });
      await grantEntitlements({ purchaseId: purchase.purchaseId, email, productId, orderId: sessionId });

      accessToken = purchase.accessToken;

      // 2. Record Toolkit addon if purchased
      if (addons?.toolkit) {
        try {
          const addonPurchase = await recordPurchase({
            email,
            name,
            productId: 'funding-toolkit',
            amount: '29.00',
            paypalOrderId: sessionId,
            profileData,
            attribution,
          });
          await grantEntitlements({ purchaseId: addonPurchase.purchaseId, email, productId: 'funding-toolkit', orderId: sessionId });
        } catch (err) {
          console.error('⚠️ Failed to record Toolkit addon purchase:', err);
        }
      }

      // 3. Record Approval Library addon if purchased
      if (addons?.approvalLibrary) {
        try {
          const addonPurchase = await recordPurchase({
            email,
            name,
            productId: 'funding-approval-library',
            amount: '9.00',
            paypalOrderId: sessionId,
            profileData,
            attribution,
          });
          await grantEntitlements({ purchaseId: addonPurchase.purchaseId, email, productId: 'funding-approval-library', orderId: sessionId });
        } catch (err) {
          console.error('⚠️ Failed to record Approval Library addon purchase:', err);
        }
      }

      // 4. Log telemetry
      try {
        await recordTelemetryEvent({
          eventName: productId === 'strategy-audit' ? 'strategy_audit_purchased' : 'purchase_product',
          sessionId: 'sess_stripe_checkout',
          pagePath: attribution?.landingPage || '',
          referrer: attribution?.referrer || 'direct',
          productId,
          revenue: product.priceUsd.toFixed(2),
        });
      } catch (tErr) {
        console.error('⚠️ Failed to log main purchase telemetry event:', tErr);
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
        console.error('⚠️ CRM leads update failed for Stripe checkout:', crmErr);
      }

      // 6. Send confirmation email
      const emailContent = buildPurchaseEmail({
        name,
        email,
        accessToken,
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

      console.log(`✅ Stripe purchase success processed & registered: ${email}`);
    }

    // Redirect to the actual report delivery view page
    const credentials = await ensureScopedSubscriberTokens(email);
    if (!credentials) throw new Error('Secure subscriber credentials could not be issued');
    const deliveryUrl = productId === 'strategy-audit' || productId === 'strategy-vip'
      ? `/booking?token=${encodeURIComponent(credentials.loginToken)}`
      : `/products/report?token=${accessToken}`;

    const origin = new URL(request.url).origin;
    return NextResponse.redirect(`${origin}${deliveryUrl}`);
  } catch (error: any) {
    console.error('❌ Success redirect processing failed:', error);
    return new NextResponse(
      `<html><body style="font-family:sans-serif;text-align:center;padding:50px;background:#f8fafc;color:#1e293b;">
        <h2 style="color:#dc2626;font-size:24px;margin-bottom:10px;">Verification Error</h2>
        <p style="color:#64748b;font-size:16px;">We encountered an error loading your purchase. Please email hello@fsidigital.ca to restore access.</p>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}
