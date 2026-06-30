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

export async function capturePayPalOrder(orderId: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const data = (await response.json()) as PayPalCaptureResponse;

  if (!response.ok) {
    throw new Error(data.message || 'Unable to capture PayPal order.');
  }

  return data;
}

/**
 * Verifies a PayPal order ID against the PayPal REST API to ensure it is approved/completed
 * and matches the expected transaction amount.
 * 
 * Falls back to warning bypass mode if environment variables are not configured.
 */
export async function verifyPayPalOrder(orderId: string, expectedAmount: string) {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.PAYPAL_ENV === 'live';

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

    // If order is APPROVED, capture it server-side to secure merchant funds and prevent client-side bypass
    if (status === "APPROVED") {
      console.log(`[PayPal Security Check] Order ${orderId} is APPROVED. Capturing server-side...`);
      try {
        const captureData = await capturePayPalOrder(orderId);
        orderData = captureData;
        status = captureData.status || "COMPLETED";
        console.log(`[PayPal Security Check] Order ${orderId} captured successfully. New status: ${status}`);
      } catch (captureError: any) {
        console.error(`[PayPal Security Check] Failed to capture APPROVED order ${orderId} server-side:`, captureError);
        return { verified: false, error: `Failed to capture order: ${captureError.message}` };
      }
    }

    if (status !== "COMPLETED") {
      return { verified: false, error: `Invalid order status: ${status}` };
    }

    // Amount could be in purchase_units directly or nested in payments.captures for capture responses
    const amountVal = orderData.purchase_units?.[0]?.amount?.value || 
                      orderData.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value;

    // Verify amount matches within a small delta (e.g. 0.01) to account for decimal formatting
    const parsedAmount = parseFloat(amountVal || "0");
    const parsedExpected = parseFloat(expectedAmount || "0");

    if (Math.abs(parsedAmount - parsedExpected) > 0.01) {
      return { 
        verified: false, 
        error: `Transaction amount mismatch: expected ${expectedAmount}, got ${amountVal}` 
      };
    }

    return { verified: true, bypass: false, orderData };
  } catch (error: any) {
    console.error(`[PayPal Security Check] Verification failed for order ${orderId}:`, error);
    return { verified: false, error: error.message || "Unknown validation error" };
  }
}

export async function verifyPayPalSubscription(subscriptionId: string) {
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

    // A subscription is valid if status is ACTIVE or APPROVED or SUSPENDED
    const isValid = ["ACTIVE", "APPROVED"].includes(status);
    if (!isValid) {
      return { verified: false, error: `Invalid subscription status: ${status}` };
    }

    return { verified: true, bypass: false, subscriptionData: subData };
  } catch (error: any) {
    console.error(`Verification failed for subscription ${subscriptionId}:`, error);
    return { verified: false, error: error.message || "Unknown subscription validation error" };
  }
}
