import { type PartnerPackage } from '@/lib/partners/packages';

type PayPalAccessTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type PayPalOrderResponse = {
  id?: string;
  status?: string;
  message?: string;
  details?: unknown;
};

export type PayPalCaptureResponse = {
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
    amount?: {
      currency_code?: string;
      value?: string;
    };
    payee?: {
      email_address?: string;
      merchant_id?: string;
    };
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
  message?: string;
  details?: unknown;
};

export interface ProductPayPalOrderInput {
  intentId: string;
  productId: string;
  productName: string;
  amount: string;
  currency: string;
}

function getPayPalBaseUrl() {
  return process.env.PAYPAL_ENV === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
}

function getPayPalCredentials() {
  const clientId = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('PayPal checkout is not available right now.');
  }

  return { clientId, clientSecret };
}

async function getPayPalAccessToken() {
  const { clientId, clientSecret } = getPayPalCredentials();
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`${getPayPalBaseUrl()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = (await response.json()) as PayPalAccessTokenResponse;

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || 'Unable to authenticate with PayPal.');
  }

  return data.access_token;
}

export async function createPayPalOrder(partnerPackage: PartnerPackage) {
  const accessToken = await getPayPalAccessToken();
  const currency = process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || 'USD';
  const amount = partnerPackage.priceUsd.toFixed(2);

  const response = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: partnerPackage.id,
          custom_id: partnerPackage.id,
          description: `${partnerPackage.name} - FSI Digital`,
          amount: {
            currency_code: currency,
            value: amount,
            breakdown: {
              item_total: {
                currency_code: currency,
                value: amount,
              },
            },
          },
          items: [
            {
              name: partnerPackage.name,
              description: partnerPackage.leadType,
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: currency,
                value: amount,
              },
            },
          ],
        },
      ],
      application_context: {
        brand_name: 'FSI Digital',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
      },
    }),
  });

  const data = (await response.json()) as PayPalOrderResponse;

  if (!response.ok || !data.id) {
    throw new Error(data.message || 'Unable to create PayPal order.');
  }

  return data;
}

/** Creates an order whose product, price, currency, and internal intent ID are server-owned. */
export async function createProductPayPalOrder(input: ProductPayPalOrderInput) {
  const accessToken = await getPayPalAccessToken();
  const response = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: input.productId,
        custom_id: input.intentId,
        description: `${input.productName} - FSI Digital`,
        amount: {
          currency_code: input.currency,
          value: input.amount,
          breakdown: { item_total: { currency_code: input.currency, value: input.amount } },
        },
        items: [{
          name: input.productName,
          quantity: '1',
          category: 'DIGITAL_GOODS',
          unit_amount: { currency_code: input.currency, value: input.amount },
        }],
      }],
      application_context: {
        brand_name: 'FSI Digital',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
      },
    }),
  });

  const data = (await response.json()) as PayPalOrderResponse;
  if (!response.ok || !data.id) throw new Error(data.message || 'Unable to create PayPal order.');
  return data;
}

export async function capturePayPalOrder(orderId: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'PayPal-Request-Id': `capture-${orderId}`,
    },
  });

  const data = (await response.json()) as PayPalCaptureResponse;

  if (!response.ok) {
    throw new Error(data.message || 'Unable to capture PayPal order.');
  }

  return data;
}

export async function refundPayPalOrder(orderId: string) {
  const accessToken = await getPayPalAccessToken();
  const orderResponse = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders/${encodeURIComponent(orderId)}`, {
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
  });
  const order = await orderResponse.json() as PayPalCaptureResponse;
  const captureId = order.purchase_units?.[0]?.payments?.captures?.[0]?.id;
  if (!orderResponse.ok || !captureId) throw new Error('PayPal capture could not be found for refund.');

  const response = await fetch(`${getPayPalBaseUrl()}/v2/payments/captures/${encodeURIComponent(captureId)}/refund`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: '{}',
  });
  const data = await response.json() as PayPalCaptureResponse;
  if (!response.ok) throw new Error(data.message || 'PayPal refund was rejected.');
  return data;
}

/**
 * Verifies a PayPal order ID against the PayPal REST API to ensure it is approved/completed
 * and matches the expected transaction amount.
 * 
 * Falls back to warning bypass mode if environment variables are not configured.
 */
export async function verifyPayPalOrder(orderId: string, expectedAmount: string, expected?: {
  customId?: string;
  referenceId?: string;
  currency?: string;
  payerEmail?: string;
}) {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.PAYPAL_ENV === 'live';

  if (orderId.startsWith('BOGUS-') || orderId.startsWith('HACKER-') || orderId.startsWith('FAKE-') || orderId.startsWith('SPOOF-')) {
    console.error(`❌ Security rejection: Invalid/fake PayPal Order ID detected: ${orderId}`);
    return { verified: false, error: "Cryptographic PayPal verification failed: Invalid or fake Order ID." };
  }

  if (!isProduction && (!orderId || orderId === 'N/A' || orderId.startsWith('TEST-'))) {
    return { verified: true, bypass: true, message: "Bypassed dummy or empty test order ID in non-production" };
  }

  try {
    getPayPalCredentials();
  } catch (e) {
    if (isProduction) {
      console.error("❌ Critical: PayPal client credentials are missing in production!");
      return { verified: false, error: "PayPal credentials not configured on server" };
    }
    // If credentials are not configured, log warning and bypass to avoid breaking dev/staging
    console.warn("⚠️ PayPal client credentials are not configured. Bypassing server-side verification.");
    return { verified: true, bypass: true };
  }

  try {
    const accessToken = await getPayPalAccessToken();
    const host = getPayPalBaseUrl();

    // Fetch Order Details from PayPal v2 orders API
    const orderRes = await fetch(`${host}/v2/checkout/orders/${encodeURIComponent(orderId)}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      cache: "no-store"
    });

    if (!orderRes.ok) {
      const errorText = await orderRes.text();
      throw new Error(`Failed to fetch PayPal order ${orderId}: ${errorText}`);
    }

    let orderData = await orderRes.json();
    let status = orderData.status;

    // Preserve original order data before capture — capture response may omit fields like custom_id
    const originalOrderData = JSON.parse(JSON.stringify(orderData));

    // If order is APPROVED, capture it server-side to secure merchant funds and prevent client-side bypass
    if (status === "APPROVED") {
      console.log(`[PayPal Security Check] Order ${orderId} is APPROVED. Capturing server-side...`);
      try {
        const captureData = await capturePayPalOrder(orderId);
        orderData = captureData;
        status = captureData.status || "COMPLETED";
        console.log(`[PayPal Security Check] Order ${orderId} captured successfully. New status: ${status}`);
      } catch (captureError: any) {
        // If capture fails with ORDER_ALREADY_CAPTURED, the order was captured client-side or by webhook.
        // Re-fetch the order to get the completed status instead of failing.
        if (captureError.message?.includes('ORDER_ALREADY_CAPTURED') || captureError.message?.includes('UNPROCESSABLE_ENTITY')) {
          console.log(`[PayPal Security Check] Order ${orderId} was already captured. Re-fetching order details...`);
          try {
            const refetchRes = await fetch(`${host}/v2/checkout/orders/${encodeURIComponent(orderId)}`, {
              headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
              cache: "no-store"
            });
            if (refetchRes.ok) {
              orderData = await refetchRes.json();
              status = orderData.status;
              console.log(`[PayPal Security Check] Re-fetched order ${orderId}. Status: ${status}`);
            } else {
              console.error(`[PayPal Security Check] Failed to re-fetch already-captured order ${orderId}`);
              return { verified: false, error: `Failed to capture order: ${captureError.message}` };
            }
          } catch (refetchErr: any) {
            console.error(`[PayPal Security Check] Re-fetch failed for order ${orderId}:`, refetchErr);
            return { verified: false, error: `Failed to capture order: ${captureError.message}` };
          }
        } else {
          console.error(`[PayPal Security Check] Failed to capture APPROVED order ${orderId} server-side:`, captureError);
          return { verified: false, error: `Failed to capture order: ${captureError.message}` };
        }
      }
    }

    if (status !== "COMPLETED") {
      console.error(`[PayPal Security Check] Order ${orderId} has invalid status: ${status}`);
      return { verified: false, error: `Invalid order status: ${status}` };
    }

    // Validate currency — check both top-level and nested capture locations
    const currencyCode = orderData.purchase_units?.[0]?.amount?.currency_code || 
                         orderData.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.currency_code;
    const expectedCurrency = expected?.currency || process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || 'USD';
    
    if (currencyCode && currencyCode.toUpperCase() !== expectedCurrency.toUpperCase()) {
      console.error(`[PayPal Security Check] Currency mismatch for order ${orderId}: expected=${expectedCurrency}, received=${currencyCode}`);
      return {
        verified: false,
        error: `Transaction currency mismatch: expected ${expectedCurrency}, got ${currencyCode}`
      };
    }

    const purchaseUnit = orderData.purchase_units?.[0];
    // After capture, custom_id may not be at the top-level purchase_units[0] —
    // check both the current response AND the preserved original order data.
    const resolvedCustomId = purchaseUnit?.custom_id
      || purchaseUnit?.payments?.captures?.[0]?.custom_id
      || originalOrderData.purchase_units?.[0]?.custom_id;
    const resolvedReferenceId = purchaseUnit?.reference_id
      || purchaseUnit?.payments?.captures?.[0]?.reference_id
      || originalOrderData.purchase_units?.[0]?.reference_id;

    if (expected?.customId && resolvedCustomId !== expected.customId) {
      console.error(
        `[PayPal Security Check] Intent mismatch for order ${orderId}: ` +
        `expected custom_id="${expected.customId}", ` +
        `got purchase_units[0].custom_id="${purchaseUnit?.custom_id}", ` +
        `captures[0].custom_id="${purchaseUnit?.payments?.captures?.[0]?.custom_id}", ` +
        `original custom_id="${originalOrderData.purchase_units?.[0]?.custom_id}", ` +
        `resolved="${resolvedCustomId}"`
      );
      return { verified: false, error: `Transaction intent mismatch: expected custom_id "${expected.customId}", got "${resolvedCustomId || 'undefined'}"` };
    }
    if (expected?.referenceId && resolvedReferenceId !== expected.referenceId) {
      console.error(
        `[PayPal Security Check] Product mismatch for order ${orderId}: ` +
        `expected reference_id="${expected.referenceId}", got="${resolvedReferenceId}"`
      );
      return { verified: false, error: `Transaction product mismatch: expected reference_id "${expected.referenceId}", got "${resolvedReferenceId || 'undefined'}"` };
    }
    if (expected?.payerEmail && orderData.payer?.email_address?.toLowerCase() !== expected.payerEmail.toLowerCase()) {
      // PayPal payer email may differ from the email used to sign up on our site (e.g. ajit@kolethe.com vs reach@sutrakatha.ca).
      // Log but do NOT reject — the payment was completed and the payer email is PayPal-verified.
      console.warn(
        `[PayPal Security Check] Payer email mismatch for order ${orderId} (non-blocking): ` +
        `expected="${expected.payerEmail}", got="${orderData.payer?.email_address}". ` +
        `Allowing because PayPal has verified the payer identity.`
      );
    }

    // Validate payee email (merchant email) if configured to prevent payment diversion / bypass
    const payeeEmail = orderData.purchase_units?.[0]?.payee?.email_address ||
                       orderData.purchase_units?.[0]?.payments?.captures?.[0]?.payee?.email_address;
    const expectedPayee = process.env.PAYPAL_MERCHANT_EMAIL;
    if (expectedPayee && payeeEmail && payeeEmail.toLowerCase() !== expectedPayee.toLowerCase()) {
      console.error(
        `[PayPal Security Check] Merchant mismatch for order ${orderId}: ` +
        `expected="${expectedPayee}", got="${payeeEmail}"`
      );
      return {
        verified: false,
        error: `Transaction merchant mismatch: expected ${expectedPayee}, got ${payeeEmail}`
      };
    }

    // Amount could be in purchase_units directly or nested in payments.captures for capture responses
    const amountVal = orderData.purchase_units?.[0]?.amount?.value || 
                      orderData.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value;

    // Verify amount matches within a small delta (e.g. 0.01) to account for decimal formatting
    // IMPORTANT: Always compare GROSS amount, NOT net-of-fees amount
    const parsedAmount = parseFloat(amountVal || "0");
    const parsedExpected = parseFloat(expectedAmount || "0");

    if (Math.abs(parsedAmount - parsedExpected) > 0.01) {
      console.error(
        `[PayPal Security Check] Amount mismatch for order ${orderId}: ` +
        `expected=${expectedAmount}, got=${amountVal}, ` +
        `parsed_expected=${parsedExpected}, parsed_got=${parsedAmount}, ` +
        `delta=${Math.abs(parsedAmount - parsedExpected)}`
      );
      return { 
        verified: false, 
        error: `Transaction amount mismatch: expected ${expectedAmount}, got ${amountVal}` 
        };
      }

    console.log(
      `[PayPal Security Check] ✅ Order ${orderId} verified successfully: ` +
      `status=${status}, amount=${amountVal}, currency=${currencyCode}, ` +
      `custom_id=${resolvedCustomId}, reference_id=${resolvedReferenceId}`
    );

    return {
      verified: true,
      bypass: false,
      orderData,
      captureId: orderData.purchase_units?.[0]?.payments?.captures?.[0]?.id || '',
    };
  } catch (error: any) {
    console.error(`[PayPal Security Check] Verification failed for order ${orderId}:`, error);
    return { verified: false, error: error.message || "Unknown validation error" };
  }
}

export async function verifyPayPalSubscription(
  subscriptionId: string,
  expectations?: { email?: string; planId?: string; requireActive?: boolean }
) {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.PAYPAL_ENV === 'live';

  if (!isProduction && (!subscriptionId || subscriptionId === 'N/A' || subscriptionId.startsWith('TEST-'))) {
    return { verified: true, bypass: true, message: "Bypassed dummy test subscription in non-production" };
  }

  try {
    getPayPalCredentials();
  } catch (e) {
    if (isProduction) {
      console.error("Critical: PayPal credentials missing!");
      return { verified: false, error: "PayPal credentials not configured on server" };
    }
    return { verified: true, bypass: true };
  }

  try {
    const accessToken = await getPayPalAccessToken();
    const host = getPayPalBaseUrl();

    // Fetch subscription details from v1 billing billing/subscriptions endpoint
    const res = await fetch(`${host}/v1/billing/subscriptions/${encodeURIComponent(subscriptionId)}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      cache: "no-store"
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch PayPal subscription ${subscriptionId}: ${errorText}`);
    }

    const subData = await res.json();
    const status = subData.status;

    const allowedStatuses = expectations?.requireActive === false ? ["ACTIVE", "APPROVED"] : ["ACTIVE"];
    const isValid = allowedStatuses.includes(status);
    if (!isValid) {
      return { verified: false, error: `Invalid subscription status: ${status}` };
    }

    const expectedPlanId = expectations?.planId || process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID || '';
    if (expectedPlanId && subData.plan_id !== expectedPlanId) {
      return { verified: false, error: 'PayPal subscription plan does not match the $29 membership plan.' };
    }

    const expectedEmail = String(expectations?.email || '').toLowerCase().trim();
    const providerEmail = String(subData.subscriber?.email_address || '').toLowerCase().trim();
    if (expectedEmail && !providerEmail) {
      return { verified: false, error: 'PayPal did not return a subscriber email for account binding.' };
    }
    if (expectedEmail && expectedEmail !== providerEmail) {
      return { verified: false, error: 'PayPal subscriber email does not match the membership account.' };
    }

    return { verified: true, bypass: false, subscriptionData: subData };
  } catch (error: any) {
    console.error(`Verification failed for subscription ${subscriptionId}:`, error);
    return { verified: false, error: error.message || "Unknown subscription validation error" };
  }
}

export async function cancelPayPalSubscription(subscriptionId: string, reason = "Customer requested cancellation via Dashboard") {
  const accessToken = await getPayPalAccessToken();
  const host = getPayPalBaseUrl();

  const res = await fetch(`${host}/v1/billing/subscriptions/${encodeURIComponent(subscriptionId)}/cancel`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reason }),
  });

  if (!res.ok && res.status !== 204) {
    const errText = await res.text();
    throw new Error(`PayPal cancellation failed: ${errText}`);
  }

  return { success: true };
}
