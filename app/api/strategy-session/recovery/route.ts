import { type NextRequest, NextResponse } from 'next/server';
import {
  type StrategyRecoveryEvent,
  upsertStrategyRecoveryEvent,
} from '@/lib/strategy-session/recovery-store';

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

    // Resolve email/name from Calendly if missing but invitee URI is available
    if (!email && calendlyInviteeUri) {
      const apiKey = process.env.CALENDLY_API_TOKEN;
      if (apiKey) {
        try {
          console.log(`[Recovery API] Fetching invitee details from Calendly: ${calendlyInviteeUri}`);
          const response = await fetch(calendlyInviteeUri, {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            if (data?.resource) {
              email = clean(data.resource.email).toLowerCase();
              name = clean(data.resource.name || `${data.resource.first_name || ''} ${data.resource.last_name || ''}`);
              console.log(`[Recovery API] Successfully retrieved invitee:`, { email, name });
            }
          } else {
            console.error(`[Recovery API] Failed to fetch invitee from Calendly. Status: ${response.status}`);
          }
        } catch (err) {
          console.error(`[Recovery API] Error fetching invitee from Calendly:`, err);
        }
      } else {
        console.warn(`[Recovery API] CALENDLY_API_TOKEN is not configured, cannot resolve missing email from invitee URI.`);
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

    return NextResponse.json({
      success: true,
      status: result.record.status,
      paid: result.record.status === 'paid',
      email: result.record.email,
      name: result.record.name,
    });
  } catch (error) {
    console.error('Strategy session recovery tracking error:', error);
    return NextResponse.json({ error: 'Unable to track strategy session recovery.' }, { status: 500 });
  }
}
