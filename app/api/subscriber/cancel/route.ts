import { NextResponse, type NextRequest } from 'next/server';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { isLoginToken } from '@/lib/auth/subscriber-tokens';

export const runtime = 'nodejs';

const CANCELLATION_REASONS = [
  "Too expensive",
  "Didn't find enough opportunities",
  "Only needed one report",
  "Using another consultant",
  "Business paused",
  "Other"
] as const;

type CancellationReasonType = typeof CANCELLATION_REASONS[number];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, reason, comment, token } = body;

    if (!email || !reason || !token) {
      return NextResponse.json({ error: 'Email, reason, and token are required.' }, { status: 400 });
    }

    // Validate that the reason is one of the structured options
    if (!CANCELLATION_REASONS.includes(reason as any)) {
      return NextResponse.json({ 
        error: `Invalid cancellation reason. Must be one of: ${CANCELLATION_REASONS.join(', ')}` 
      }, { status: 400 });
    }

    const subscriber = await SubscriberRepository.getSubscriberByEmail(email);
    if (!subscriber) {
      return NextResponse.json({ error: 'Subscriber not found.' }, { status: 404 });
    }

    if (!isLoginToken(token, subscriber.loginToken)) {
      return NextResponse.json({ error: 'Unauthorized. Invalid token.' }, { status: 401 });
    }

    // Parse existing activity JSON
    let activity: any = {};
    try {
      activity = JSON.parse(subscriber.leadActivity || '{}');
    } catch (e) {
      activity = {};
    }

    // Save optional comment inside leadActivity to keep cancellationReason column clean and structured
    if (comment !== undefined) {
      activity.cancellationComment = String(comment).trim();
    }

    const updates = {
      subscriptionStatus: 'inactive',
      subscriptionCancelledAt: new Date().toISOString(),
      cancellationReason: reason,
      leadActivity: JSON.stringify(activity),
    };

    const res = await SubscriberRepository.updateSubscriberPreferences(email, updates);
    if (!res.success) {
      return NextResponse.json({ error: res.error || 'Failed to update database.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      subscriptionCancelledAt: updates.subscriptionCancelledAt,
      cancellationReason: updates.cancellationReason,
      cancellationComment: activity.cancellationComment || '',
    });
  } catch (err: any) {
    console.error('Cancel subscription endpoint error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
