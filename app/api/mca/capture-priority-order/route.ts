// app/api/mca/capture-priority-order/route.ts
// Captures the PayPal payment for Priority Funding Processing and updates Google Sheets

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { capturePayPalOrder } from '@/lib/payments/paypal';
import { updateMCAApplicationPayment, updateMCAPriorityOrderStatus, appendMCAActivityLog } from '@/lib/mca/sheets';

const schema = z.object({
  token: z.string().min(5), // PayPal Order ID
  applicationId: z.string().min(5),
  email: z.string().email(),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid capture parameters' }, { status: 400 });
    }

    const { token, applicationId, email } = parsed.data;

    // Capture the PayPal order
    const captureDetails = await capturePayPalOrder(token);

    if (captureDetails.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'PayPal payment was not approved or completed' }, { status: 400 });
    }

    // Update application in Google Sheets (priorityProcessing = true, status = Documents Received, revenue = 49)
    const appUpdated = await updateMCAApplicationPayment(applicationId, token);
    
    // Update order status in Google Sheets (status = Captured)
    const orderUpdated = await updateMCAPriorityOrderStatus(token, 'Captured');

    // Log the successful capture activity
    await appendMCAActivityLog({
      timestamp: new Date().toISOString(),
      applicationId,
      email,
      event: 'priority_payment_captured',
      metadata: { paypalOrderId: token, appUpdated, orderUpdated },
    }).catch(() => {});

    return NextResponse.json({ success: true, status: 'COMPLETED' }, { status: 200 });
  } catch (error) {
    console.error('MCA Capture Priority Order error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to capture priority order payment.' },
      { status: 500 }
    );
  }
}
