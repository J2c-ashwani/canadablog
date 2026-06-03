import { type NextRequest, NextResponse } from 'next/server';
import { appendPartnerPaymentToSheet } from '@/lib/google-sheets';
import { capturePayPalOrder } from '@/lib/payments/paypal';
import { getPartnerPackage } from '@/lib/partners/packages';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const orderId = String(body.orderId || '');

    if (!orderId) {
      return NextResponse.json({ error: 'PayPal order ID is required.' }, { status: 400 });
    }

    const capture = await capturePayPalOrder(orderId);
    const purchaseUnit = capture.purchase_units?.[0];
    const capturedPackageId = purchaseUnit?.reference_id || purchaseUnit?.custom_id || body.packageId;
    const partnerPackage = getPartnerPackage(capturedPackageId);
    const captureDetails = purchaseUnit?.payments?.captures?.[0];

    await appendPartnerPaymentToSheet({
      timestamp: new Date().toISOString(),
      orderId: capture.id || orderId,
      captureId: captureDetails?.id || 'N/A',
      status: captureDetails?.status || capture.status || 'N/A',
      packageId: partnerPackage?.id || String(capturedPackageId || 'N/A'),
      packageName: partnerPackage?.name || 'N/A',
      amount: captureDetails?.amount?.value || (partnerPackage ? partnerPackage.priceUsd.toFixed(2) : 'N/A'),
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
        packageId: capturedPackageId,
      }),
    }).catch((error) => {
      console.error('Failed to log partner payment:', error);
    });

    return NextResponse.json({
      success: true,
      orderId: capture.id || orderId,
      captureId: captureDetails?.id || null,
      status: captureDetails?.status || capture.status,
      packageId: partnerPackage?.id || capturedPackageId,
    });
  } catch (error) {
    console.error('PayPal capture order error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to capture PayPal order.' },
      { status: 500 },
    );
  }
}
