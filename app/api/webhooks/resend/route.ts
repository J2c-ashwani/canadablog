import { NextResponse } from 'next/server';
import { globalEventBus } from '@/lib/growth-os/core/event-bus';
import { AUTHORITY_EVENTS } from '@/lib/growth-os/authority/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// In-memory state for tracking consecutive bounces.
let consecutiveBounces = 0;

/**
 * Resend Webhook API route for real-time delivery event tracking.
 * Tracks bounces, complaints, clicks, and opens.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const eventType = payload?.type;

    if (!eventType) {
      return NextResponse.json({ error: 'Missing event type' }, { status: 400 });
    }

    switch (eventType) {
      case 'email.bounced':
        consecutiveBounces++;
        if (consecutiveBounces > 10) {
          globalEventBus.publish(AUTHORITY_EVENTS.KILL_SWITCH_TRIGGERED, {
            reason: 'Excessive consecutive bounces detected',
            count: consecutiveBounces,
            timestamp: new Date().toISOString()
          });
        }
        break;

      case 'email.opened':
        consecutiveBounces = 0; // Reset counter on successful open
        globalEventBus.publish(AUTHORITY_EVENTS.OUTREACH_OPENED, {
          payload,
          timestamp: new Date().toISOString()
        });
        break;

      case 'email.clicked':
        consecutiveBounces = 0; // Reset counter on successful click
        globalEventBus.publish(AUTHORITY_EVENTS.OUTREACH_OPENED, {
          payload,
          timestamp: new Date().toISOString()
        });
        break;
        
      case 'email.complained':
        globalEventBus.publish(AUTHORITY_EVENTS.KILL_SWITCH_TRIGGERED, {
          reason: 'Spam complaint registered',
          payload,
          timestamp: new Date().toISOString()
        });
        break;

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Resend Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
