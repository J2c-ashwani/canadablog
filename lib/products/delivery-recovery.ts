import { getAllPurchases, updatePurchaseDeliveryStatus } from '@/lib/products/purchase-store';
import { getProduct } from '@/lib/products/catalog';
import { grantEntitlements } from '@/lib/products/entitlements';
import { buildPurchaseEmail } from '@/lib/emails/product-purchase';
import { sendEmail } from '@/lib/emails/mailer';
import { isProviderVerifiedPurchase } from '@/lib/growth-os/evidence-metrics';
import { sendMCAReadinessReportDelivery } from '@/lib/emails/mca-readiness-delivery';

export interface DeliveryRecoveryOutcome {
  purchaseId: string;
  orderId: string;
  providerAccepted: boolean;
  provider?: string;
  providerMessageId?: string;
  error?: string;
}

export async function recoverProductDeliveries(options?: { limit?: number; orderId?: string }) {
  const limit = Math.min(Math.max(options?.limit || 10, 1), 20);
  const purchases = await getAllPurchases();
  const candidates = purchases.filter((purchase) => {
    if (!isProviderVerifiedPurchase(purchase)) return false;
    if (options?.orderId && purchase.paypalOrderId !== options.orderId && purchase.purchaseId !== options.orderId) return false;
    return ['retry_pending', 'failed', 'pending', ''].includes(String(purchase.deliveryStatus || '').toLowerCase());
  }).slice(0, limit);

  const outcomes: DeliveryRecoveryOutcome[] = [];
  for (const purchase of candidates) {
    try {
      if (purchase.productId === 'mca-readiness-report') {
        let profile: Record<string, unknown> = {};
        try { profile = JSON.parse(purchase.profileData || '{}'); } catch { profile = {}; }
        const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca').replace(/\/$/, '');
        const result = await sendMCAReadinessReportDelivery({
          to: purchase.email,
          name: purchase.name,
          companyName: String(profile.legalBusinessName || profile.company || ''),
          reportUrl: `${origin}/mca/readiness-report?token=${encodeURIComponent(purchase.accessToken)}`,
          applicationId: String(profile.applicationId || ''),
        });
        const accepted = Boolean(result.success && result.providerMessageId);
        await updatePurchaseDeliveryStatus(
          purchase.purchaseId,
          accepted ? 'provider_accepted' : 'retry_pending',
          accepted ? result.providerMessageId : ''
        );
        outcomes.push({
          purchaseId: purchase.purchaseId,
          orderId: purchase.paypalOrderId,
          providerAccepted: accepted,
          provider: result.provider,
          providerMessageId: result.providerMessageId,
          error: accepted ? undefined : result.error || 'Provider message ID was not returned.',
        });
        continue;
      }
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
      const accepted = Boolean(result.success && result.providerMessageId);
      await updatePurchaseDeliveryStatus(
        purchase.purchaseId,
        accepted ? 'provider_accepted' : 'retry_pending',
        accepted ? result.providerMessageId : ''
      );
      outcomes.push({
        purchaseId: purchase.purchaseId,
        orderId: purchase.paypalOrderId,
        providerAccepted: accepted,
        provider: result.provider,
        providerMessageId: result.providerMessageId,
        error: accepted ? undefined : result.error || 'Provider message ID was not returned.',
      });
    } catch (error: any) {
      outcomes.push({
        purchaseId: purchase.purchaseId,
        orderId: purchase.paypalOrderId,
        providerAccepted: false,
        error: error?.message || String(error),
      });
    }
  }
  return { candidates: candidates.length, outcomes };
}
