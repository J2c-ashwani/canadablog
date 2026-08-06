// app/api/analytics/telemetry/route.ts

import { NextRequest, NextResponse } from 'next/server';

export type JourneyEventType =
  | 'REPORT_GENERATED'
  | 'REPORT_OPENED'
  | 'REPORT_READ_TIME'
  | 'UPGRADE_CLICK'
  | 'UPGRADE_PURCHASE'
  | 'STRATEGY_VIEWED'
  | 'CONSULTATION_BOOKED'
  | 'GRANT_FILED'
  | 'FUNDING_WON'
  | 'REPEAT_APPLICATION';

export interface TelemetryPayload {
  eventType: JourneyEventType;
  userEmail?: string;
  reportToken?: string;
  productId?: string;
  programId?: string;
  metadata?: Record<string, any>;
  timestamp?: string;
}

/**
  Sub-Phase 3C: Decoupled Customer Journey Telemetry API Endpoint
  Tracks full Customer LTV funnel progression without altering recommendation engine scores.
 */
export async function POST(req: NextRequest) {
  try {
    const body: TelemetryPayload = await req.json();

    if (!body.eventType) {
      return NextResponse.json({ success: false, error: 'eventType is required' }, { status: 400 });
    }

    const eventRecord = {
      eventType: body.eventType,
      userEmail: body.userEmail || 'anonymous',
      reportToken: body.reportToken || '',
      productId: body.productId || '',
      programId: body.programId || '',
      metadata: body.metadata || {},
      timestamp: body.timestamp || new Date().toISOString(),
      receivedAt: new Date().toISOString(),
    };

    // Log event record to server console (and sync to DB/Sheets pipeline if available)
    console.log('[TELEMETRY_JOURNEY_EVENT]', JSON.stringify(eventRecord));

    return NextResponse.json({
      success: true,
      loggedEvent: eventRecord.eventType,
      timestamp: eventRecord.timestamp,
    });
  } catch (error: any) {
    console.error('Telemetry logging error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal telemetry logging error' },
      { status: 500 }
    );
  }
}
