// app/api/mca/priority-order/route.ts
// Creates a PayPal order for Priority Funding Processing (CAD $49)
// Uses the existing PayPal infrastructure already in the project.

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { appendMCAPriorityOrder } from '@/lib/mca/sheets';
import { appendMCAActivityLog } from '@/lib/mca/sheets';

const PRIORITY_PRICE_CAD = '49.00';
const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE ?? 'https://api-m.paypal.com';

const schema = z.object({
  applicationId: z.string().min(5),
  email: z.string().email(),
});

async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error('PayPal credentials not configured');

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) throw new Error('Failed to get PayPal access token');
  const data = await res.json();
  return data.access_token;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    const { applicationId, email } = parsed.data;

    const accessToken = await getPayPalAccessToken();

    // Create PayPal order
    const orderRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          reference_id: applicationId,
          description: 'Priority Funding Processing — FSI Digital',
          custom_id: applicationId,
          amount: {
            currency_code: 'CAD',
            value: PRIORITY_PRICE_CAD,
          },
        }],
        application_context: {
          brand_name: 'FSI Digital',
          landing_page: 'NO_PREFERENCE',
          return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/mca/priority-success?id=${applicationId}&email=${encodeURIComponent(email)}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/thank-you?id=${applicationId}&email=${encodeURIComponent(email)}&cancelled=true`,
          user_action: 'PAY_NOW',
        },
      }),
    });

    if (!orderRes.ok) {
      const err = await orderRes.text();
      console.error('PayPal order creation failed:', err);
      return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 });
    }

    const order = await orderRes.json();
    const approveLink = order.links?.find((l: { rel: string; href: string }) => l.rel === 'approve')?.href;

    if (!approveLink) {
      return NextResponse.json({ error: 'No approval URL from PayPal' }, { status: 500 });
    }

    // Record pending order in Sheets
    await appendMCAPriorityOrder({
      timestamp: new Date().toISOString(),
      applicationId,
      email,
      paypalOrderId: order.id,
      amountCAD: 49,
      status: 'Pending',
      fulfilmentStatus: 'Queued',
    }).catch(() => {}); // non-blocking

    // Activity log
    await appendMCAActivityLog({
      timestamp: new Date().toISOString(),
      applicationId,
      email,
      event: 'priority_order_created',
      metadata: { paypalOrderId: order.id, amount: PRIORITY_PRICE_CAD },
    }).catch(() => {}); // non-blocking

    return NextResponse.json({ orderId: order.id, approveUrl: approveLink }, { status: 200 });
  } catch (error) {
    console.error('MCA Priority Order error:', error);
    return NextResponse.json({ error: 'Payment system error. Please try again.' }, { status: 500 });
  }
}
