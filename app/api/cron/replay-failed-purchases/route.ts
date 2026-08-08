import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Serverless filesystem logs are not a durable payment ledger and must never be
// replayed into production revenue accounting.
export async function GET() {
  return NextResponse.json(
    { error: 'Local failed-purchase replay is retired. Reconcile provider captures against the durable ledger.' },
    { status: 410 }
  );
}
