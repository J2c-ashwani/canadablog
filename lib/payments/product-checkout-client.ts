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

const intentKey = (orderId: string) => `fsi_product_payment_intent_${orderId}`;

export async function createServerPayPalProductOrder(input: ProductCheckoutInput) {
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
  return data.orderId as string;
}

export async function finalizeServerPayPalProductOrder(orderId: string) {
  const paymentIntentId = sessionStorage.getItem(intentKey(orderId));
  if (!paymentIntentId) throw new Error('Secure checkout session expired. Please start again.');

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
