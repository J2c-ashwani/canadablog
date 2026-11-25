import { NextResponse } from 'next/server';
import { validateCronAuth } from '@/lib/auth/cron-auth';
import { normalizeBrevoEvent, persistDeliveryEvent } from '@/lib/emails/delivery-events';
import { updateOutreachProspectFromDeliveryEvent, updateOutreachSentLeadFromDeliveryEvent } from '@/lib/google-sheets';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { globalEventBus } from '@/lib/growth-os/core/event-bus';
import { AUTHORITY_EVENTS } from '@/lib/growth-os/authority/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isAuthorizedBrevoWebhook(request: Request): boolean {
  const secret = process.env.BREVO_WEBHOOK_SECRET?.trim();
  if (secret) {
    const url = new URL(request.url);
    const headerToken = request.headers.get('x-brevo-secret') || request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    const queryToken = url.searchParams.get('secret') || url.searchParams.get('token');
    if (headerToken === secret || queryToken === secret) return true;
  }
  return validateCronAuth(request).authorized;
}

export async function POST(request: Request) {
  if (!isAuthorizedBrevoWebhook(request)) {
    return NextResponse.json({ error: 'Unauthorized Brevo webhook request.' }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const events = Array.isArray(payload) ? payload : [payload];
    let persistedCount = 0;

    for (const item of events) {
      const event = normalizeBrevoEvent(item);
      if (!event) continue;
      await persistDeliveryEvent(event);
      persistedCount++;

      if (event.providerMessageId) {
        await updateOutreachProspectFromDeliveryEvent(
          event.providerMessageId,
          event.eventType,
          event.occurredAt
        ).catch(() => {});
        await updateOutreachSentLeadFromDeliveryEvent(event.providerMessageId, event.eventType).catch(() => {});
      }

      if (event.eventType === 'email.unsubscribed' || event.eventType === 'email.complained') {
        await SubscriberRepository.updateSubscriberPreferences(event.recipient, {
          isSubscribed: false,
        }).catch(() => {});
        await globalEventBus.publish(AUTHORITY_EVENTS.KILL_SWITCH_TRIGGERED, {
          reason: `Brevo ${event.eventType}`,
          event,
        });
      } else if (event.eventType === 'email.bounced') {
        await globalEventBus.publish(AUTHORITY_EVENTS.KILL_SWITCH_TRIGGERED, {
          reason: 'Brevo bounce received',
          event,
        });
      }
    }

    return NextResponse.json({ received: true, persistedCount });
  } catch (error) {
    console.error('Brevo webhook processing error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
