'use client';

import { useEffect } from 'react';

function getOrSetSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sessId = sessionStorage.getItem('fsi_session_id');
  if (!sessId) {
    sessId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
    sessionStorage.setItem('fsi_session_id', sessId);
  }
  return sessId;
}

export function FunnelTelemetryTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if session has already been logged in this browser session tab
    if (sessionStorage.getItem('fsi_session_logged') === 'true') return;

    const sessionId = getOrSetSessionId();
    const pagePath = window.location.pathname;
    const referrer = document.referrer || 'direct';

    // Parse UTMs
    const params = new URLSearchParams(window.location.search);
    let utmSource = params.get('utm_source') || undefined;
    let utmMedium = params.get('utm_medium') || undefined;
    let utmCampaign = params.get('utm_campaign') || undefined;

    const source = params.get('source');
    if (source && !utmSource) {
      if (source.startsWith('alert_nurture_')) {
        utmSource = 'alert_nurture';
        utmMedium = 'email';
        utmCampaign = source;
      } else if (source === 'inactivity_alert') {
        utmSource = 'reactivation';
        utmMedium = 'email';
        utmCampaign = 'inactivity_alert';
      } else if (source.startsWith('reactivation_')) {
        utmSource = 'reactivation';
        utmMedium = 'email';
        utmCampaign = source;
      } else if (source === 'weekly_alert') {
        utmSource = 'alert_nurture';
        utmMedium = 'email';
        utmCampaign = 'weekly_alert';
      } else if (source === 'instant_alert') {
        utmSource = 'alert_nurture';
        utmMedium = 'email';
        utmCampaign = 'instant_alert';
      } else {
        utmSource = source;
      }
    }

    // Log the landing session
    fetch('/api/telemetry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName: 'session_start',
        sessionId,
        pagePath,
        referrer,
        utmSource,
        utmMedium,
        utmCampaign,
      }),
    })
      .then((res) => {
        if (res.ok) {
          sessionStorage.setItem('fsi_session_logged', 'true');
        }
      })
      .catch((err) => console.error('Failed to log telemetry session:', err));

    // Log email click telemetry
    const isEmail =
      utmMedium === 'email' ||
      utmSource === 'email' ||
      ['calculator_recovery', 'cart_recovery', 'alert_nurture', 'reactivation'].includes(utmSource || '');
      
    if (isEmail) {
      fetch('/api/telemetry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName: 'emailClicked',
          sessionId,
          pagePath,
          referrer,
          utmSource,
          utmMedium,
          utmCampaign,
        }),
      }).catch((err) => console.error('Failed to log telemetry emailClicked:', err));
    }
  }, []);

  return null;
}
