import assert from 'node:assert/strict';
import {
  createServerPayPalProductCheckout,
  createServerPayPalProductOrder,
  finalizeServerPayPalProductOrder,
} from '../lib/payments/product-checkout-client';

// Fully mocked: never creates orders, captures money, or contacts production.
async function run() {
  const originalFetch = globalThis.fetch;
  const originalStorage = Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage');
  const storage = new Map<string, string>();
  Object.defineProperty(globalThis, 'sessionStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
    },
  });
  const input = { productId: 'funding-match-report', email: 'test@example.com', name: 'Test', profileData: {} };
  try {
    globalThis.fetch = async () => Response.json({
      orderId: 'TEST-ORDER', intentId: 'TEST-INTENT', approveUrl: 'https://www.paypal.com/checkoutnow?token=TEST-ORDER',
    });
    const sdkOrderId = await createServerPayPalProductOrder(input);
    assert.equal(sdkOrderId, 'TEST-ORDER');
    assert.equal(typeof sdkOrderId, 'string', 'Every existing SDK callback must receive a string');
    const redirect = await createServerPayPalProductCheckout(input);
    assert.equal(redirect.orderId, sdkOrderId);
    assert.equal(redirect.intentId, 'TEST-INTENT');
    assert.ok(redirect.approveUrl.startsWith('https://www.paypal.com/'));
    assert.equal(storage.get('fsi_product_payment_intent_TEST-ORDER'), 'TEST-INTENT');

    globalThis.fetch = async (url, options) => {
      assert.equal(url, '/api/products/purchase');
      assert.deepEqual(JSON.parse(String(options?.body)), { paymentIntentId: 'TEST-INTENT', paypalOrderId: 'TEST-ORDER' });
      return Response.json({ success: true, accessToken: 'TEST-ACCESS', deliveryUrl: '/products/report?token=TEST-ACCESS' });
    };
    const purchase = await finalizeServerPayPalProductOrder(sdkOrderId);
    assert.equal(purchase.success, true);
    assert.equal(storage.has('fsi_product_payment_intent_TEST-ORDER'), false);

    storage.set('fsi_product_payment_intent_TEST-ORDER', 'TEST-INTENT');
    globalThis.fetch = async () => Response.json({ error: 'Verification unavailable' }, { status: 503 });
    await assert.rejects(finalizeServerPayPalProductOrder(sdkOrderId), /Verification unavailable/);
    assert.equal(storage.get('fsi_product_payment_intent_TEST-ORDER'), 'TEST-INTENT', 'Failed verification preserves retry context');
    await assert.rejects(createServerPayPalProductOrder(input), /Verification unavailable/);
    globalThis.fetch = async () => Response.json({ orderId: 'INCOMPLETE' });
    await assert.rejects(createServerPayPalProductOrder(input), /Unable to start secure checkout/);
    console.log('PASS: SDK order-ID contract, redirect details, intent binding, finalization, and failure handling (mocked; no live payment proof).');
  } finally {
    globalThis.fetch = originalFetch;
    if (originalStorage) Object.defineProperty(globalThis, 'sessionStorage', originalStorage);
    else Reflect.deleteProperty(globalThis, 'sessionStorage');
  }
}
run().catch(error => { console.error(error); process.exitCode = 1; });
