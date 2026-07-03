import { type NextRequest, NextResponse } from 'next/server';
import { appendPartnerPaymentToSheet } from '@/lib/google-sheets';
import { verifyPayPalOrder } from '@/lib/payments/paypal';
import { getPartnerPackage } from '@/lib/partners/packages';
import { recordTelemetryEvent } from '@/lib/telemetry/telemetry-store';
import { sendEmail } from '@/lib/emails/mailer';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const orderId = String(body.orderId || '');
    const packageId = body.packageId || body.package_id;

    if (!orderId) {
      return NextResponse.json({ error: 'PayPal order ID is required.' }, { status: 400 });
    }

    const partnerPackage = getPartnerPackage(packageId);
    if (!partnerPackage) {
      return NextResponse.json({ error: 'Invalid or missing partner package reference.' }, { status: 400 });
    }

    const expectedAmount = partnerPackage.priceUsd.toFixed(2);
    const verification = await verifyPayPalOrder(orderId, expectedAmount);

    if (!verification.verified) {
      const errorMsg = verification.error || 'Payment verification failed.';
      console.error(`❌ PayPal payment verification failed: ${errorMsg}`);

      // Security event logging & Telemetry reporting
      await recordTelemetryEvent({
        eventName: 'security_anomaly',
        sessionId: orderId,
        pagePath: '/api/paypal/capture-order',
        referrer: 'paypal',
        trafficQualityClassification: 'PAYMENT_VERIFICATION_FAILED',
        utmSource: 'security',
        utmMedium: 'paypal_capture_failed',
        utmCampaign: errorMsg,
      }).catch(() => {});

      // Alert owner
      const adminEmail = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';
      await sendEmail({
        to: adminEmail,
        subject: '⚠️ PAYMENT SECURITY ANOMALY: PayPal Capture Verification Failed',
        html: `<p><strong>WARNING:</strong> A PayPal payment capture verification failed on <code>/api/paypal/capture-order</code>.</p>
               <p><strong>Package:</strong> ${partnerPackage.name} (ID: ${partnerPackage.id})</p>
               <p><strong>Expected Price:</strong> $${partnerPackage.priceUsd.toFixed(2)}</p>
               <p><strong>PayPal Order ID:</strong> ${orderId}</p>
               <p><strong>Error Details:</strong> ${errorMsg}</p>
               <p>The transaction has been rejected.</p>`
      }).catch(err => console.error('Failed to send security warning email:', err));

      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const capture = verification.orderData || {};
    const purchaseUnit = capture.purchase_units?.[0];
    const captureDetails = purchaseUnit?.payments?.captures?.[0];

    await appendPartnerPaymentToSheet({
      timestamp: new Date().toISOString(),
      orderId: capture.id || orderId,
      captureId: captureDetails?.id || 'N/A',
      status: captureDetails?.status || capture.status || 'N/A',
      packageId: partnerPackage.id,
      packageName: partnerPackage.name,
      amount: captureDetails?.amount?.value || partnerPackage.priceUsd.toFixed(2),
      currency: captureDetails?.amount?.currency_code || process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || 'USD',
      buyerName: body.buyerName || 'N/A',
      buyerEmail: body.buyerEmail || 'N/A',
      company: body.company || 'N/A',
      website: body.website || 'N/A',
      targetMarket: body.targetMarket || 'N/A',
      notes: body.notes || 'N/A',
      payerEmail: capture.payer?.email_address || 'N/A',
      payerName: `${capture.payer?.name?.given_name || ''} ${capture.payer?.name?.surname || ''}`.trim() || 'N/A',
      rawSummary: JSON.stringify({
        paypalOrderId: capture.id,
        captureStatus: capture.status,
        packageId: partnerPackage.id,
      }),
    }).catch((error) => {
      console.error('Failed to log partner payment:', error);
    });

    return NextResponse.json({
      success: true,
      orderId: capture.id || orderId,
      captureId: captureDetails?.id || null,
      status: captureDetails?.status || capture.status,
      packageId: partnerPackage.id,
    });
  } catch (error) {
    console.error('PayPal capture order error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to capture PayPal order.' },
      { status: 500 },
    );
  }
}
