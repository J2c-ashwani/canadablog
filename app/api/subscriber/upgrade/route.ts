import { NextResponse, type NextRequest } from 'next/server';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, action, subscriptionId } = body;

    if (!email || !action) {
      return NextResponse.json({ error: 'Email and action are required.' }, { status: 400 });
    }

    if (action !== 'trial' && action !== 'active') {
      return NextResponse.json({ error: 'Invalid upgrade action.' }, { status: 400 });
    }

    const subscriber = await SubscriberRepository.getSubscriberByEmail(email);
    if (!subscriber) {
      return NextResponse.json({ error: 'Subscriber not found.' }, { status: 404 });
    }

    const updates: any = {};
    if (action === 'trial') {
      updates.subscriptionStatus = 'trial';
      updates.trialStartedAt = new Date().toISOString();
    } else {
      updates.subscriptionStatus = 'active';
      updates.subscriptionId = subscriptionId || 'N/A';
    }

    const res = await SubscriberRepository.updateSubscriberPreferences(email, updates);
    if (!res.success) {
      return NextResponse.json({ error: res.error || 'Failed to update database.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      subscriptionStatus: updates.subscriptionStatus,
      subscriptionId: updates.subscriptionId || subscriber.subscriptionId || '',
      trialStartedAt: updates.trialStartedAt || subscriber.trialStartedAt || '',
    });
  } catch (err: any) {
    console.error('Upgrade subscriber endpoint error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
