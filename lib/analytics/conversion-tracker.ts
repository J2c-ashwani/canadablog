'use client';

export interface PurchaseEventParams {
  transactionId: string;
  value: number;
  currency?: string;
  productId: string;
  productName: string;
  email?: string;
}

/**
 * Universal Client-Side Conversion Tracking.
 * 
 * Fires verified e-commerce purchase events across:
 *  1. Google Analytics 4 (standard GA4 'purchase' event schema)
 *  2. Google Ads Conversion (gtag 'conversion' with send_to label)
 *  3. Meta Pixel (fbq 'Purchase' if pixel is loaded)
 * 
 * Features:
 *  - Session-level and local idempotency guard to prevent duplicate firing on re-render / reload.
 *  - Defensive dataLayer initialization to ensure events are never lost if GA4 is still hydrating.
 */
export function trackPurchaseConversion(params: PurchaseEventParams): boolean {
  if (typeof window === 'undefined') return false;

  const txId = (params.transactionId || '').trim();
  if (!txId) {
    console.warn('⚠️ trackPurchaseConversion called without transactionId; skipping.');
    return false;
  }

  // Idempotency: prevent double firing the same transaction_id
  const sessionKey = `fsi_purchase_tracked_${txId}`;
  try {
    if (sessionStorage.getItem(sessionKey)) {
      return false;
    }
    sessionStorage.setItem(sessionKey, 'true');
  } catch {
    // SessionStorage quota / blocked, continue tracking
  }

  const currency = params.currency || 'USD';
  const price = typeof params.value === 'number' && !isNaN(params.value) ? params.value : 19;
  const productId = params.productId || 'funding-report';
  const productName = params.productName || 'Funding Match Report';

  // Defensive gtag stubbing: queue events to window.dataLayer even if tag hasn't loaded yet
  const win = window as any;
  win.dataLayer = win.dataLayer || [];
  if (typeof win.gtag !== 'function') {
    win.gtag = function gtagFallback() {
      win.dataLayer.push(arguments);
    };
  }

  // 1. Google Analytics 4: standard e-commerce purchase event
  try {
    win.gtag('event', 'purchase', {
      transaction_id: txId,
      value: price,
      currency,
      items: [
        {
          item_id: productId,
          item_name: productName,
          price,
          quantity: 1,
        },
      ],
    });
  } catch (err) {
    console.error('GA4 purchase tracking error:', err);
  }

  // 2. Google Ads: purchase conversion tag
  try {
    const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
    const purchaseLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL;
    if (googleAdsId && purchaseLabel) {
      win.gtag('event', 'conversion', {
        send_to: `${googleAdsId}/${purchaseLabel}`,
        value: price,
        currency,
        transaction_id: txId,
      });
    }
  } catch (err) {
    console.error('Google Ads purchase tracking error:', err);
  }

  // 3. Meta Pixel: purchase event (if active)
  try {
    if (typeof win.fbq === 'function') {
      win.fbq('track', 'Purchase', {
        value: price,
        currency,
        content_ids: [productId],
        content_name: productName,
        content_type: 'product',
      });
    }
  } catch (err) {
    console.error('Meta Pixel purchase tracking error:', err);
  }

  return true;
}
