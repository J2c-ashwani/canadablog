import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  appendMCAPriorityOrder,
  appendMCAActivityLog,
  getMCAApplications,
  updateMCAApplicationRecovery,
} from '@/lib/mca/sheets';
import {
  attachPayPalOrderToIntent,
  newProductPaymentIntent,
  saveProductPaymentIntent,
} from '@/lib/payments/product-payment-intents';
import { createProductPayPalOrder } from '@/lib/payments/paypal';
import {
  actionContextFromAttribution,
  parseTrackedGrowthToken,
  recordGrowthActionEvent,
} from '@/lib/growth-os/action-attribution';
import { applyRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PRODUCT_ID = 'mca-readiness-report';
const PRODUCT_NAME = 'MCA Funding Readiness Report';
const PRICE_CAD = '49.00';

const schema = z.object({ recoveryToken: z.string().regex(/^mca_rec_[a-f0-9]{32}$/) });

function stringValue(value: unknown) {
  return typeof value === 'string' ? value : '';
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (process.env.NODE_ENV !== 'development') {
    const limit = await applyRateLimit(request, 10, 60 * 60 * 1000);
    if (limit.isLimited) return limit.response as NextResponse;
  }
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Invalid application.' }, { status: 400 });

    const applications = await getMCAApplications(2000);
    const application = applications.find((entry) => entry.recoveryToken === parsed.data.recoveryToken);
    if (!application) return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
    if (application.priorityProcessing || application.recoveryPurchased) {
      return NextResponse.json({ error: 'This application already has a completed readiness-report purchase.' }, { status: 409 });
    }

    const trustedAction = parseTrackedGrowthToken(request.cookies.get('fsi_growth_action_token')?.value || '');
    const attribution: Record<string, unknown> = {
      landingPage: stringValue(application.landingPage) || '/priority-processing',
      referrer: stringValue(application.referrer),
      utmSource: stringValue(application.utmSource),
      utmMedium: stringValue(application.utmMedium),
      utmCampaign: stringValue(application.utmCampaign),
    };
    if (trustedAction) Object.assign(attribution, {
      actionId: trustedAction.actionId,
      actionChannel: trustedAction.channel,
      actionCampaign: trustedAction.campaign,
      actionRecipientId: trustedAction.recipientId,
    });

    const intent = newProductPaymentIntent({
      email: stringValue(application.email).trim().toLowerCase(),
      name: stringValue(application.ownerName) || stringValue(application.legalBusinessName),
      productId: PRODUCT_ID,
      addons: {},
      expectedAmount: PRICE_CAD,
      currency: 'CAD',
      profileData: {
        applicationId: application.applicationId,
        legalBusinessName: application.legalBusinessName,
        province: application.province,
        industry: application.industry,
        yearsInBusiness: Number(application.yearsInBusiness || 0),
        monthlyRevenue: Number(application.monthlyRevenue || 0),
        fundingAmount: Number(application.fundingAmount || 0),
        fundingPurpose: application.fundingPurpose,
        fileCount: Number(application.fileCount || 0),
      },
      attribution,
      sessionId: stringValue(application.ga4ClientId) || `mca_${application.applicationId}`,
    });
    await saveProductPaymentIntent(intent);

    const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca').replace(/\/$/, '');
    const order = await createProductPayPalOrder({
      intentId: intent.intentId,
      productId: PRODUCT_ID,
      productName: PRODUCT_NAME,
      amount: PRICE_CAD,
      currency: 'CAD',
      returnUrl: `${origin}/mca/priority-success?intent=${encodeURIComponent(intent.intentId)}`,
      cancelUrl: `${origin}/thank-you?id=${encodeURIComponent(application.applicationId)}&t=${encodeURIComponent(application.recoveryToken)}&cancelled=true`,
    });
    if (!order.id) throw new Error('PayPal did not return an order ID.');
    const approveUrl = order.links?.find((link) => link.rel === 'approve')?.href;
    if (!approveUrl) throw new Error('PayPal did not return a checkout URL.');
    await attachPayPalOrderToIntent(intent.intentId, order.id);

    await appendMCAPriorityOrder({
      timestamp: new Date().toISOString(),
      applicationId: application.applicationId,
      email: application.email,
      paypalOrderId: order.id,
      amountCAD: 49,
      status: 'Pending',
      fulfilmentStatus: 'Queued',
    }).catch((error) => console.error('MCA pending-order mirror failed:', error));
    await updateMCAApplicationRecovery(application.applicationId, {
      priorityRecoveryStatus: 'ACTIVE',
    }).catch((error) => console.error('MCA recovery stage update failed:', error));
    await appendMCAActivityLog({
      timestamp: new Date().toISOString(),
      applicationId: application.applicationId,
      email: application.email,
      event: 'mca_readiness_checkout_started',
      metadata: { paypalOrderId: order.id, intentId: intent.intentId, amount: PRICE_CAD, currency: 'CAD' },
    }).catch((error) => console.error('MCA checkout activity log failed:', error));

    const action = actionContextFromAttribution(attribution);
    if (action) await recordGrowthActionEvent({
      eventId: `checkout:paypal:${order.id}`,
      ...action,
      eventType: 'checkout_started',
      provider: 'paypal',
      providerMessageId: '',
      productId: PRODUCT_ID,
      revenueUSD: 0,
      revenueCAD: 0,
      mrrUSD: 0,
      referenceId: order.id,
      metadata: { expectedAmount: PRICE_CAD, currency: 'CAD', applicationId: application.applicationId },
    }).catch((error) => console.error('MCA checkout attribution write failed:', error));

    return NextResponse.json({ orderId: order.id, intentId: intent.intentId, approveUrl });
  } catch (error) {
    console.error('MCA readiness order error:', error);
    return NextResponse.json({ error: 'Unable to start secure PayPal checkout. Please try again.' }, { status: 500 });
  }
}
