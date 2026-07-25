import { NextResponse } from 'next/server';
import { cancelPayPalSubscription, verifyPayPalSubscription } from '@/lib/payments/paypal';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, reason } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const subscriber = await SubscriberRepository.getSubscriberByEmail(cleanEmail);

    if (!subscriber) {
      return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 });
    }

    if (subscriber.subscriptionId) {
      try {
        await cancelPayPalSubscription(subscriber.subscriptionId, reason || 'Cancelled by member from dashboard');
      } catch (err: any) {
        console.warn('⚠️ PayPal subscription cancellation API warning:', err.message);
      }
    }

    // Update DB
    await SubscriberRepository.updateSubscriberPreferences(cleanEmail, {
      subscriptionStatus: 'CANCELLED',
      cancellationReason: reason || 'Cancelled by member from dashboard',
      subscriptionCancelledAt: new Date().toISOString(),
    });

    console.log(`🛑 Membership cancelled for ${cleanEmail}`);

    return NextResponse.json({
      success: true,
      message: 'Subscription cancelled successfully.',
    });
  } catch (error: any) {
    console.error('❌ Failed to cancel membership:', error);
    return NextResponse.json({ error: error.message || 'Failed to process cancellation' }, { status: 500 });
  }
}
