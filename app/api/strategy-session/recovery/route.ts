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
    const email = clean(body.email).toLowerCase();

    if (!VALID_EVENTS.includes(event)) {
      return NextResponse.json({ error: 'Valid recovery event is required.' }, { status: 400 });
    }

    if (!recoveryId) {
      return NextResponse.json({ error: 'Recovery ID is required.' }, { status: 400 });
    }

    if (email && !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    if (event !== 'paid' && !email) {
      return NextResponse.json({ error: 'Email is required for recovery tracking.' }, { status: 400 });
    }

    const result = await upsertStrategyRecoveryEvent({
      event,
      recoveryId,
      email,
      name: clean(body.name),
      source: clean(body.source, 'strategy-session'),
      reason: clean(body.reason),
      pagePath: clean(body.pagePath),
      userAgent: request.headers.get('user-agent') || '',
      paypalOrderId: clean(body.paypalOrderId),
      rawSummary: clean(body.rawSummary),
    });

    return NextResponse.json({
      success: true,
      status: result.record.status,
      paid: result.record.status === 'paid',
    });
  } catch (error) {
    console.error('Strategy session recovery tracking error:', error);
    return NextResponse.json({ error: 'Unable to track strategy session recovery.' }, { status: 500 });
  }
}
