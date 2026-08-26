import { NextResponse } from 'next/server';
import { globalEventBus } from '@/lib/growth-os/core/event-bus';
import { AUTHORITY_EVENTS } from '@/lib/growth-os/authority/types';
import {
  normalizeResendDeliveryEvent,
  persistDeliveryEvent,
  verifyResendWebhook,
} from '@/lib/emails/delivery-events';
import { updateOutreachProspectFromDeliveryEvent, updateOutreachSentLeadFromDeliveryEvent } from '@/lib/google-sheets';
import { updatePurchaseDeliveryFromProviderEvent } from '@/lib/products/purchase-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Resend delivery events are accepted only after signature verification and a
 * confirmed durable write. Provider acceptance and inbox delivery stay distinct.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  if (!verifyResendWebhook(request.headers, rawBody)) {
    console.error('Resend webhook signature verification failed or is not configured.');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = JSON.parse(rawBody);
    const event = normalizeResendDeliveryEvent(payload);
    if (!event) return NextResponse.json({ error: 'Unsupported event payload' }, { status: 400 });

    await persistDeliveryEvent(event);
    await updateOutreachProspectFromDeliveryEvent(
      event.providerMessageId,
      event.eventType,
      event.occurredAt
    );
    await updateOutreachSentLeadFromDeliveryEvent(event.providerMessageId, event.eventType);
    await updatePurchaseDeliveryFromProviderEvent(event.providerMessageId, event.eventType);

    if (event.eventType === 'email.bounced') {
      await globalEventBus.publish(AUTHORITY_EVENTS.KILL_SWITCH_TRIGGERED, {
        reason: 'Email bounce received', event,
      });
    } else if (event.eventType === 'email.opened') {
      await globalEventBus.publish(AUTHORITY_EVENTS.OUTREACH_OPENED, { event });
    } else if (event.eventType === 'email.clicked') {
      await globalEventBus.publish(AUTHORITY_EVENTS.OUTREACH_CLICKED, { event });
    } else if (event.eventType === 'email.complained') {
      await globalEventBus.publish(AUTHORITY_EVENTS.KILL_SWITCH_TRIGGERED, {
        reason: 'Spam complaint received', event,
      });
    }

    return NextResponse.json({ received: true, persisted: true });
  } catch (error) {
    console.error('Resend webhook processing error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
