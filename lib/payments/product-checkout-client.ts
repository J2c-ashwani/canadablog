'use client';

export interface ProductCheckoutInput {
  productId: string;
  email: string;
  name: string;
  profileData: Record<string, unknown>;
  addons?: Record<string, boolean>;
  attribution?: Record<string, unknown>;
  sessionId?: string;
}

export interface ProductCheckoutResult {
  orderId: string;
  intentId: string;
  /** Full-page PayPal approval URL for redirect flow (iOS Safari, in-app browsers). */
  approveUrl: string;
}

const intentKey = (orderId: string) => `fsi_product_payment_intent_${orderId}`;

/**
 * Creates a server-side PayPal order and returns the order ID, intent ID,
 * and a full-page approval URL for the redirect flow.
 *
 * The caller decides how to proceed:
 *  - Desktop (popup flow): return result.orderId to the PayPal SDK `createOrder` callback.
 *  - Mobile/iOS (redirect flow): navigate to result.approveUrl via window.location.href.
 */
export async function createServerPayPalProductCheckout(input: ProductCheckoutInput): Promise<ProductCheckoutResult> {
  const response = await fetch('/api/products/create-paypal-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = await response.json();
  if (!response.ok || !data.orderId || !data.intentId) {
    throw new Error(data.error || 'Unable to start secure checkout.');
  }
  sessionStorage.setItem(intentKey(data.orderId), data.intentId);
  return {
    orderId: data.orderId as string,
    intentId: data.intentId as string,
    approveUrl: (data.approveUrl || '') as string,
  };
}

/** PayPal SDK createOrder callbacks require the order ID, not a checkout object. */
export async function createServerPayPalProductOrder(input: ProductCheckoutInput): Promise<string> {
  const checkout = await createServerPayPalProductCheckout(input);
  return checkout.orderId;
}

export async function finalizeServerPayPalProductOrder(orderId: string) {
  const paymentIntentId = sessionStorage.getItem(intentKey(orderId)) || '';

  const response = await fetch('/api/products/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentIntentId, paypalOrderId: orderId }),
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.error || 'Payment verification failed.');
  sessionStorage.removeItem(intentKey(orderId));
  return data as { success: true; accessToken: string; deliveryUrl: string; loginToken?: string };
}
