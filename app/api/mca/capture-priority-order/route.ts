import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyPayPalOrder } from '@/lib/payments/paypal';
import {
  getProductPaymentIntent,
  markProductPaymentIntentFulfilled,
  recordProductPaymentCapture,
} from '@/lib/payments/product-payment-intents';
import {
  getAllPurchases,
  recordPurchase,
  updatePurchaseDeliveryStatus,
} from '@/lib/products/purchase-store';
import {
  appendMCAActivityLog,
  updateMCAApplicationPayment,
  updateMCAPriorityOrderStatus,
} from '@/lib/mca/sheets';
import { actionContextFromAttribution, recordGrowthActionEvent } from '@/lib/growth-os/action-attribution';
import { sendMCAReadinessReportDelivery } from '@/lib/emails/mca-readiness-delivery';
import { applyRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PRODUCT_ID = 'mca-readiness-report';
const PRICE_CAD = '49.00';
const schema = z.object({
  token: z.string().min(5).max(160),
  intentId: z.string().uuid(),
});

function stringValue(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function reportUrl(accessToken: string) {
  return `/mca/readiness-report?token=${encodeURIComponent(accessToken)}`;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (process.env.NODE_ENV !== 'development') {
    const limit = await applyRateLimit(request, 10, 60 * 60 * 1000);
    if (limit.isLimited) return limit.response as NextResponse;
  }
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Invalid payment verification parameters.' }, { status: 400 });
    const { token, intentId } = parsed.data;
    const intent = await getProductPaymentIntent(intentId);
    if (!intent || intent.productId !== PRODUCT_ID) {
      return NextResponse.json({ error: 'Readiness-report payment intent not found.' }, { status: 409 });
    }
    if (intent.paypalOrderId !== token || intent.expectedAmount !== PRICE_CAD || intent.currency.toUpperCase() !== 'CAD') {
      return NextResponse.json({ error: 'PayPal order does not match the server-owned commercial terms.' }, { status: 409 });
    }

    const existing = (await getAllPurchases({ strict: true })).find((purchase) =>
      purchase.paypalOrderId === token && purchase.productId === PRODUCT_ID
    );
    if (existing) {
      if (intent.status === 'captured' || intent.status === 'completed') {
        await markProductPaymentIntentFulfilled(intent.intentId, existing.purchaseId, existing.deliveryStatus || 'retry_pending');
      }
      return NextResponse.json({
        success: true,
        status: 'COMPLETED',
        reportUrl: reportUrl(existing.accessToken),
        deliveryAccepted: ['provider_accepted', 'delivered'].includes(String(existing.deliveryStatus || '').toLowerCase()),
      });
    }

    const verification = await verifyPayPalOrder(token, PRICE_CAD, {
      customId: intent.intentId,
      referenceId: PRODUCT_ID,
      currency: 'CAD',
    });
    if (!verification.verified || verification.bypass) {
      return NextResponse.json({ error: verification.error || 'PayPal capture could not be independently verified.' }, { status: 400 });
    }
    const captureId = 'captureId' in verification ? stringValue(verification.captureId) : '';
    if (!captureId) return NextResponse.json({ error: 'PayPal did not return a verified provider capture ID.' }, { status: 409 });
    await recordProductPaymentCapture(intent.intentId, captureId);

    const attribution = intent.attribution || {};
    const action = actionContextFromAttribution(attribution);
    if (action) await recordGrowthActionEvent({
      eventId: `purchase:paypal:${captureId}`,
      ...action,
      eventType: 'purchase_verified',
      provider: 'paypal',
      providerMessageId: '',
      productId: PRODUCT_ID,
      revenueUSD: 0,
      revenueCAD: 49,
      mrrUSD: 0,
      referenceId: captureId,
      metadata: { orderId: token, currency: 'CAD', applicationId: intent.profileData.applicationId },
    }).catch((error) => console.error('MCA verified-purchase attribution failed:', error));

    const profile = intent.profileData || {};
    const purchase = await recordPurchase({
      email: intent.email,
      name: intent.name,
      productId: PRODUCT_ID,
      amount: PRICE_CAD,
      paypalOrderId: token,
      profileData: {
        province: stringValue(profile.province, 'Canada'),
        industry: stringValue(profile.industry, 'business'),
        revenue: String(profile.monthlyRevenue || '0'),
        goal: stringValue(profile.fundingPurpose, 'working capital'),
        company: stringValue(profile.legalBusinessName),
        applicationId: stringValue(profile.applicationId),
        legalBusinessName: stringValue(profile.legalBusinessName),
        yearsInBusiness: Number(profile.yearsInBusiness || 0),
        monthlyRevenue: Number(profile.monthlyRevenue || 0),
        fundingAmount: Number(profile.fundingAmount || 0),
        fundingPurpose: stringValue(profile.fundingPurpose),
        fileCount: Number(profile.fileCount || 0),
      },
      attribution: {
        landingPage: stringValue(attribution.landingPage),
        referrer: stringValue(attribution.referrer),
        utmSource: stringValue(attribution.utmSource),
        utmMedium: stringValue(attribution.utmMedium),
        utmCampaign: stringValue(attribution.utmCampaign),
        actionId: stringValue(attribution.actionId),
        actionChannel: stringValue(attribution.actionChannel),
        actionCampaign: stringValue(attribution.actionCampaign),
        actionRecipientId: stringValue(attribution.actionRecipientId),
      },
      currency: 'CAD',
      paypalCaptureId: captureId,
      paymentStatus: 'provider_capture_verified',
      deliveryStatus: 'retry_pending',
    });

    const applicationId = stringValue(profile.applicationId);
    const appUpdated = await updateMCAApplicationPayment(applicationId, token);
    const orderUpdated = await updateMCAPriorityOrderStatus(token, 'Captured');
    await appendMCAActivityLog({
      timestamp: new Date().toISOString(),
      applicationId,
      email: intent.email,
      event: 'mca_readiness_payment_verified',
      metadata: { paypalOrderId: token, captureId, purchaseId: purchase.purchaseId, appUpdated, orderUpdated },
    }).catch((error) => console.error('MCA capture activity log failed:', error));

    const relativeReportUrl = reportUrl(purchase.accessToken);
    const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca').replace(/\/$/, '');
    let deliveryStatus = 'retry_pending';
    let deliveryAccepted = false;
    try {
      const delivery = await sendMCAReadinessReportDelivery({
        to: intent.email,
        name: intent.name,
        companyName: stringValue(profile.legalBusinessName),
        reportUrl: `${origin}${relativeReportUrl}`,
        applicationId,
      });
      if (delivery.success && delivery.providerMessageId) {
        deliveryStatus = 'provider_accepted';
        deliveryAccepted = true;
        await updatePurchaseDeliveryStatus(purchase.purchaseId, deliveryStatus, delivery.providerMessageId);
      }
    } catch (error) {
      console.error('MCA readiness report email delivery failed; browser access remains available:', error);
    }
    await markProductPaymentIntentFulfilled(intent.intentId, purchase.purchaseId, deliveryStatus);

    return NextResponse.json({
      success: true,
      status: 'COMPLETED',
      reportUrl: relativeReportUrl,
      deliveryAccepted,
    });
  } catch (error) {
    console.error('MCA readiness capture error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to verify PayPal payment.' }, { status: 500 });
  }
}
