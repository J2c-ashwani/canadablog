import { type NextRequest, NextResponse } from 'next/server';
import { appendPartnerPaymentToSheet } from '@/lib/google-sheets';
import { getPartnerPackage } from '@/lib/partners/packages';

export const runtime = 'nodejs';

type PayPalClientCapture = {
  id?: string;
  status?: string;
  payer?: {
    email_address?: string;
    name?: {
      given_name?: string;
      surname?: string;
    };
  };
  purchase_units?: Array<{
    reference_id?: string;
    custom_id?: string;
    payments?: {
      captures?: Array<{
        id?: string;
        status?: string;
        amount?: {
          currency_code?: string;
          value?: string;
        };
      }>;
    };
  }>;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const capture = (body.capture || {}) as PayPalClientCapture;
    const purchaseUnit = capture.purchase_units?.[0];
    const captureDetails = purchaseUnit?.payments?.captures?.[0];
    const capturedPackageId = purchaseUnit?.reference_id || purchaseUnit?.custom_id || body.packageId;
    const partnerPackage = getPartnerPackage(capturedPackageId);
    const orderId = String(body.orderId || capture.id || '');

    if (!orderId) {
      return NextResponse.json({ error: 'PayPal order ID is required.' }, { status: 400 });
    }

    await appendPartnerPaymentToSheet({
      timestamp: new Date().toISOString(),
      orderId,
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
        paypalOrderId: orderId,
        captureStatus: capture.status,
        packageId: capturedPackageId,
      }),
    }).catch((error) => {
      console.error('Failed to log partner payment:', error);
    });

    return NextResponse.json({
      success: true,
      orderId,
      captureId: captureDetails?.id || null,
      status: captureDetails?.status || capture.status,
      packageId: partnerPackage?.id || capturedPackageId,
    });
  } catch (error) {
    console.error('PayPal partner payment record error:', error);
    return NextResponse.json({ error: 'Unable to record PayPal payment.' }, { status: 500 });
  }
}
