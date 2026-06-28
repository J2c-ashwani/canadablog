import { type NextRequest, NextResponse } from 'next/server';
import {
  type StrategyRecoveryEvent,
  upsertStrategyRecoveryEvent,
} from '@/lib/strategy-session/recovery-store';
import { verifyPayPalOrder } from '@/lib/payments/paypal';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { recordTelemetryEvent } from '@/lib/telemetry/telemetry-store';

export const runtime = 'nodejs';

const VALID_EVENTS: StrategyRecoveryEvent[] = ['shown', 'abandoned', 'paid'];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clean(value: unknown, fallback = '') {
  return String(value || fallback).trim().slice(0, 2000);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const event = clean(body.event) as StrategyRecoveryEvent;
    const recoveryId = clean(body.recoveryId, body.sessionId || body.id);
    let email = clean(body.email).toLowerCase();
    let name = clean(body.name);
    const calendlyEventUri = clean(body.calendlyEventUri);
    const calendlyInviteeUri = clean(body.calendlyInviteeUri);

    let attendeeCount = 1;

    // Resolve details from Calendly if invitee URI is available
    if (calendlyInviteeUri) {
      const apiKey = process.env.CALENDLY_API_TOKEN || process.env.CALENDY_API_TOKEN;
      if (apiKey) {
        try {
          console.log(`[Recovery API] Fetching details from Calendly: ${calendlyInviteeUri}`);
          const response = await fetch(calendlyInviteeUri, {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            if (data?.resource) {
              if (!email) email = clean(data.resource.email).toLowerCase();
              if (!name) name = clean(data.resource.name || `${data.resource.first_name || ''} ${data.resource.last_name || ''}`);
              
              // Count attendees: 1 main invitee + guests array
              const guestsCount = Array.isArray(data.resource.guests) ? data.resource.guests.length : 0;
              attendeeCount = 1 + guestsCount;
              console.log(`[Recovery API] Resolved Calendly details:`, { email, name, attendeeCount });
            }
          } else {
            console.error(`[Recovery API] Failed to fetch invitee from Calendly. Status: ${response.status}`);
          }
        } catch (err) {
          console.error(`[Recovery API] Error fetching invitee from Calendly:`, err);
        }
      } else {
        console.warn(`[Recovery API] CALENDLY_API_TOKEN is not configured, cannot query invitee metadata.`);
      }
    }

    if (!VALID_EVENTS.includes(event)) {
      return NextResponse.json({ error: 'Valid recovery event is required.' }, { status: 400 });
    }

    if (!recoveryId) {
      return NextResponse.json({ error: 'Recovery ID is required.' }, { status: 400 });
    }

    if (email && !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    // Secure server-side PayPal order validation
    if (event === 'paid') {
      const paypalOrderId = clean(body.paypalOrderId);
      let expectedAmount = "199.00"; // default
      try {
        const summary = JSON.parse(body.rawSummary);
        if (summary.amount) {
          expectedAmount = String(summary.amount);
        } else if (summary.tier === 'vip') {
          expectedAmount = "499.00";
        }
      } catch (e) {}

      const verification = await verifyPayPalOrder(paypalOrderId, expectedAmount);
      if (!verification.verified) {
        return NextResponse.json({ error: `Payment verification failed: ${verification.error}` }, { status: 400 });
      }

      // Log purchase_product telemetry event
      try {
        const sessId = clean(body.sessionId, 'sess_anonymous');
        const prodId = expectedAmount === "499.00" ? "strategy-vip" : "strategy-audit";
        await recordTelemetryEvent({
          eventName: 'purchase_product',
          sessionId: sessId,
          pagePath: clean(body.pagePath),
          referrer: 'direct',
          productId: prodId,
          revenue: expectedAmount
        });
      } catch (tErr) {
        console.error('Failed to log strategy recovery telemetry:', tErr);
      }
    }

    const result = await upsertStrategyRecoveryEvent({
      event,
      recoveryId,
      email,
      name,
      source: clean(body.source, 'strategy-session'),
      reason: clean(body.reason),
      pagePath: clean(body.pagePath),
      userAgent: request.headers.get('user-agent') || '',
      paypalOrderId: clean(body.paypalOrderId),
      rawSummary: clean(body.rawSummary),
      calendlyEventUri,
      calendlyInviteeUri,
      gaClientId: clean(body.gaClientId),
    });

    // Sync booking & payment status back to the main subscriber sheet's leadActivity JSON
    let subscriber: any = null;
    if (email && isValidEmail(email)) {
      try {
        subscriber = await SubscriberRepository.getSubscriberByEmail(email);
        if (subscriber) {
          let activity: any = {};
          try {
            if (subscriber.leadActivity && subscriber.leadActivity !== "N/A" && subscriber.leadActivity !== "{}") {
              activity = JSON.parse(subscriber.leadActivity);
            }
          } catch (e) {
            console.error("Failed to parse leadActivity JSON:", e);
          }

          // Update MD telemetry fields
          const hasCalendlyBooking = !!calendlyEventUri || !!calendlyInviteeUri;
          if (hasCalendlyBooking) {
            activity.bookedAudit = true;
            activity.attendeeCount = attendeeCount;
            activity.auditBookedAt = activity.auditBookedAt || new Date().toISOString();
          }

          activity.depositPaid = (event === 'paid' || result.record.status === 'paid');

          if (activity.depositPaid) {
            activity.depositPaidAt = activity.depositPaidAt || new Date().toISOString();
          }

          const updates: any = {
            leadActivity: JSON.stringify(activity)
          };

          const STAGE_HIERARCHY = [
            'Lead',
            'Calculator Lead',
            'Report Buyer',
            'Audit Buyer',
            'Booked Audit',
            'Audit Attended',
            'Audit Completed',
            'Filing Prospect',
            'Filing Client Signed',
            'Filing Client',
            'Won'
          ];
          const shouldUpdateStage = (current: string | undefined, target: string) => {
            if (!current) return true;
            const currentIdx = STAGE_HIERARCHY.indexOf(current.trim());
            const targetIdx = STAGE_HIERARCHY.indexOf(target.trim());
            if (currentIdx === -1) return true;
            return targetIdx > currentIdx;
          };

          if (activity.depositPaid && shouldUpdateStage(subscriber.offlineStatus, 'Booked Audit')) {
            updates.offlineStatus = 'Booked Audit';
          }

          await SubscriberRepository.updateSubscriberPreferences(email, updates);
          console.log(`[Recovery API] Synced telemetry attributes back to leadActivity:`, activity);
        }
      } catch (err) {
        console.error("[Recovery API] Failed to sync telemetry to subscriber sheet:", err);
      }
    }

    return NextResponse.json({
      success: true,
      status: result.record.status,
      paid: result.record.status === 'paid',
      email: result.record.email,
      name: result.record.name,
      // Lead details for personalized report preview
      industry: subscriber?.industry || '',
      country: subscriber?.country || '',
      region: subscriber?.region || '',
      companySize: subscriber?.companySize || '',
      companyName: subscriber?.companyName || '',
      businessStage: subscriber?.businessStage || '',
      businessDescription: subscriber?.businessDescription || '',
      fundingAmount: subscriber?.fundingAmount || '',
      readinessScore: subscriber?.readinessScore || 0,
      leadActivity: subscriber?.leadActivity || '{}',
    });
  } catch (error) {
    console.error('Strategy session recovery tracking error:', error);
    return NextResponse.json({ error: 'Unable to track strategy session recovery.' }, { status: 500 });
  }
}
