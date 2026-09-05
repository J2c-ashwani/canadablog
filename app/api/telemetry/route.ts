import { NextRequest, NextResponse } from 'next/server';
import { recordTelemetryEvent } from '@/lib/telemetry/telemetry-store';
import {
  isLikelyAutomatedUserAgent,
  parseTrackedGrowthToken,
  recordGrowthActionEvent,
} from '@/lib/growth-os/action-attribution';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // Keep local/staging browser checks out of the production evidence ledger.
  // An isolated non-production telemetry sink may opt in explicitly.
  if (process.env.NODE_ENV !== 'production' && process.env.ALLOW_NON_PRODUCTION_TELEMETRY !== 'true') {
    return NextResponse.json({
      success: true,
      persisted: false,
      reason: 'non_production_telemetry_disabled',
    });
  }

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

    const allowedQualityClassifications = new Set([
      'High Confidence Human',
      'Medium Confidence',
      'Suspicious',
      'Likely Bot',
    ]);
    const requestUserAgent = request.headers.get('user-agent') || '';
    const verifiedQualityClassification = isLikelyAutomatedUserAgent(requestUserAgent)
      ? 'Likely Bot'
      : allowedQualityClassifications.has(String(trafficQualityClassification || ''))
        ? String(trafficQualityClassification)
        : 'Medium Confidence';

    // Suppress telemetry writes for automated crawlers and bots to prevent quota exhaustion
    if (verifiedQualityClassification === 'Likely Bot') {
      return NextResponse.json({ success: true, filtered: 'bot_ignored' });
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
      trafficQualityClassification: verifiedQualityClassification,
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
