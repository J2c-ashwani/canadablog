'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface TrackingConsentGateProps {
  gaMeasurementId: string;
  clarityId?: string;
  metaPixelId?: string;
  googleAdsId?: string;
  linkedinInsightId?: string;
}

export function TrackingConsentGate({
  gaMeasurementId,
  clarityId,
  metaPixelId,
  googleAdsId,
  linkedinInsightId,
}: TrackingConsentGateProps) {
  const [consentGranted, setConsentGranted] = useState(false);

  useEffect(() => {
    // Check consent status on mount
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') {
      setConsentGranted(true);
    }

    // Listen for storage changes in case they accept mid-session
    const checkConsent = () => {
      if (localStorage.getItem('cookie-consent') === 'accepted') {
        setConsentGranted(true);
      } else {
        setConsentGranted(false);
      }
    };

    window.addEventListener('storage', checkConsent);
    // Custom event dispatch hook for immediate update
    window.addEventListener('cookie-consent-updated', checkConsent);

    return () => {
      window.removeEventListener('storage', checkConsent);
      window.removeEventListener('cookie-consent-updated', checkConsent);
    };
  }, []);

  if (!consentGranted) return null;

  return (
    <>
      {/* Google Analytics GA4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaMeasurementId}', { send_page_view: true });
        `}
      </Script>

      {/* Microsoft Clarity */}
      {clarityId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined' && (window.location.hostname === 'www.fsidigital.ca' || window.location.hostname === 'fsidigital.ca')) {
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","${clarityId}");
            }
          `}
        </Script>
      )}

      {/* Meta Pixel */}
      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* Google Ads Remarketing */}
      {googleAdsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads-remarketing" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAdsId}');
            `}
          </Script>
        </>
      )}

      {/* LinkedIn Insight Tag */}
      {linkedinInsightId && (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "${linkedinInsightId}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
      )}
    </>
  );
}
