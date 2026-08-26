import { NextRequest, NextResponse } from 'next/server';
import { recordTelemetryEvent } from '@/lib/telemetry/telemetry-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      eventName,
      sessionId,
      pagePath,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      productId,
      revenue,
      trafficQualityScore,
      trafficQualityClassification,
      timezone,
      language,
      journeyId,
      funnelId,
      heuristicMetadata,
      actionId,
      actionChannel,
      actionCampaign,
      actionRecipientId,
    } = body;

    if (!eventName || !sessionId) {
      return NextResponse.json(
        { error: 'Missing eventName or sessionId' },
        { status: 400 }
      );
    }

    await recordTelemetryEvent({
      eventName,
      sessionId,
      pagePath,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      productId,
      revenue: revenue ? String(revenue) : undefined,
      trafficQualityScore,
      trafficQualityClassification,
      timezone,
      language,
      journeyId,
      funnelId,
      heuristicMetadata: heuristicMetadata ? String(heuristicMetadata) : undefined,
      actionId: actionId ? String(actionId) : undefined,
      actionChannel: actionChannel ? String(actionChannel) : undefined,
      actionCampaign: actionCampaign ? String(actionCampaign) : undefined,
      actionRecipientId: actionRecipientId ? String(actionRecipientId) : undefined,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Telemetry route error:', err);
    return NextResponse.json(
      { error: err.message || 'Telemetry is temporarily unavailable. Retry this event.' },
      { status: 503, headers: { 'Retry-After': '60' } }
    );
  }
}
