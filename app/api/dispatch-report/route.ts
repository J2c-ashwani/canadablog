import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// This route formerly created completed purchases without provider verification.
// Historical support cases are handled through the reconciliation workflow only.
export async function GET() {
  return NextResponse.json(
    { error: 'Manual report dispatch is retired. Provider-verified checkout is required.' },
    { status: 410 }
  );
}
