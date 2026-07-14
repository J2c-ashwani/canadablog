'use client';

/**
 * Generates a persistent journey ID for tracking commercial lifecycles.
 */
export function getOrCreateJourneyId(): string {
  if (typeof window === 'undefined') return '';
  
  let journeyId = sessionStorage.getItem('fsi_journey_id');
  if (!journeyId) {
    const timestamp = Date.now();
    const randomHex = Math.random().toString(16).slice(2, 10);
    journeyId = `fsi_j_${timestamp}_${randomHex}`;
    sessionStorage.setItem('fsi_journey_id', journeyId);
  }
  return journeyId;
}

/**
 * Gets or sets the funnel ID for the current user path context.
 */
export function getOrCreateFunnelId(defaultFunnel = 'general'): string {
  if (typeof window === 'undefined') return '';

  let funnelId = sessionStorage.getItem('fsi_funnel_id');
  if (!funnelId) {
    const timestamp = Date.now();
    const randomHex = Math.random().toString(16).slice(2, 10);
    funnelId = `fsi_fn_${defaultFunnel}_${timestamp}_${randomHex}`;
    sessionStorage.setItem('fsi_funnel_id', funnelId);
  }
  return funnelId;
}

/**
 * Decorates telemetry payloads with Journey and Funnel IDs.
 */
export function decorateTelemetryPayload(payload: Record<string, any>, defaultFunnel = 'general'): Record<string, any> {
  return {
    ...payload,
    journeyId: getOrCreateJourneyId(),
    funnelId: getOrCreateFunnelId(defaultFunnel),
  };
}
