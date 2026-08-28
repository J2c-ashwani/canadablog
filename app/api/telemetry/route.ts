import { NextRequest, NextResponse } from 'next/server';
import { recordTelemetryEvent } from '@/lib/telemetry/telemetry-store';
import { parseTrackedGrowthToken, recordGrowthActionEvent } from '@/lib/growth-os/action-attribution';

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
    } = body;

    if (!eventName || !sessionId) {
      return NextResponse.json(
        { error: 'Missing eventName or sessionId' },
        { status: 400 }
      );
    }

    const trustedAction = parseTrackedGrowthToken(request.cookies.get('fsi_growth_action_token')?.value || '');

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
      actionId: trustedAction?.actionId,
      actionChannel: trustedAction?.channel,
      actionCampaign: trustedAction?.campaign,
      actionRecipientId: trustedAction?.recipientId,
    });

    if (eventName === 'checkout_started' && trustedAction) {
      await recordGrowthActionEvent({
        eventId: `checkout:telemetry:${trustedAction.actionId}:${trustedAction.recipientId}:${String(productId || 'unknown')}`,
        actionId: trustedAction.actionId,
        channel: trustedAction.channel,
        campaign: trustedAction.campaign,
        recipientId: trustedAction.recipientId,
        eventType: 'checkout_started',
        provider: 'first_party_telemetry',
        providerMessageId: '',
        productId: String(productId || ''),
        revenueUSD: 0,
        revenueCAD: 0,
        mrrUSD: 0,
        referenceId: String(sessionId),
        metadata: { expectedRevenue: revenue ? String(revenue) : '' },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Telemetry route error:', err);
    return NextResponse.json(
      { error: err.message || 'Telemetry is temporarily unavailable. Retry this event.' },
      { status: 503, headers: { 'Retry-After': '60' } }
    );
  }
}
