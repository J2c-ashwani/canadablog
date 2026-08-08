import { type NextRequest, NextResponse } from 'next/server';
import { isValidCronRequest } from '@/lib/admin/auth';
import {
  getAllPurchases,
  updatePurchaseDeliveryStatus,
} from '@/lib/products/purchase-store';
import { getProduct } from '@/lib/products/catalog';
import { grantEntitlements } from '@/lib/products/entitlements';
import { buildPurchaseEmail } from '@/lib/emails/product-purchase';
import { sendEmail } from '@/lib/emails/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Retries only provider-verified purchases whose confirmation was not accepted. */
export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized product-delivery recovery execution.' }, { status: 401 });
  }

  const limit = Math.min(Math.max(Number(request.nextUrl.searchParams.get('limit') || 10), 1), 20);
  const purchases = await getAllPurchases();
  const candidates = purchases
    .filter((purchase) =>
      ['provider_capture_verified', 'stripe_payment_verified'].includes(purchase.paymentStatus || '') &&
      purchase.deliveryStatus === 'retry_pending'
    )
    .slice(0, limit);

  const outcomes: Array<{ purchaseId: string; accepted: boolean; error?: string }> = [];
  for (const purchase of candidates) {
    try {
      const product = getProduct(purchase.productId);
      if (!product) throw new Error(`Unknown product ${purchase.productId}`);
      await grantEntitlements({
        purchaseId: purchase.purchaseId,
        email: purchase.email,
        productId: purchase.productId,
        orderId: purchase.paypalOrderId,
      });
      const content = buildPurchaseEmail({
        name: purchase.name,
        email: purchase.email,
        accessToken: purchase.accessToken,
        paypalOrderId: purchase.paypalOrderId,
        productName: product.name,
        amount: purchase.amount,
      });
      const result = await sendEmail({
        to: purchase.email,
        subject: content.subject,
        html: content.html,
        text: content.text,
        tagType: 'product-purchase-retry',
      });
      await updatePurchaseDeliveryStatus(
        purchase.purchaseId,
        result.success ? 'provider_accepted' : 'retry_pending',
        result.providerMessageId || ''
      );
      outcomes.push({ purchaseId: purchase.purchaseId, accepted: result.success, error: result.error });
    } catch (error: any) {
      outcomes.push({ purchaseId: purchase.purchaseId, accepted: false, error: error.message || String(error) });
    }
  }

  return NextResponse.json({
    candidates: candidates.length,
    providerAccepted: outcomes.filter((outcome) => outcome.accepted).length,
    outcomes,
  });
}
