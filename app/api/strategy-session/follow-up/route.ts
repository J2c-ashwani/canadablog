import { type NextRequest, NextResponse } from 'next/server';
import { sendStrategyRecoveryEmail } from '@/lib/strategy-session/recovery-emails';

export const runtime = 'nodejs';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || '').trim();
    const name = String(body.name || '').trim();
    const source = String(body.source || 'lead-form');

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const response = await sendStrategyRecoveryEmail({
      to: email,
      name,
      source,
      stage: 'initial',
    });

    if (!response.success && !response.skipped) {
      return NextResponse.json({ success: false }, { status: 502 });
    }

    return NextResponse.json({ success: response.success, skipped: response.skipped || false });
  } catch (error) {
    console.error('Strategy session follow-up error:', error);
    return NextResponse.json({ error: 'Unable to send follow-up.' }, { status: 500 });
  }
}
