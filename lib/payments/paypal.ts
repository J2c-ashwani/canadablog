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
