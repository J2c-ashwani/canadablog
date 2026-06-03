'use client';

import { useEffect, useRef } from 'react';

interface AdSlotProps {
  adSlot?: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  className?: string;
}

export default function AdSlot({
  adSlot,
  adFormat = 'auto',
  style = {},
  className = ''
}: AdSlotProps) {
  const adPushed = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewableTracked = useRef(false);
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-1200907614877581";
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-DZ55NMNLYM";
  
  // Use provided adSlot or fall back to environment variables based on format
  let finalAdSlot = adSlot || (
    adFormat === 'horizontal' ? process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_HORIZONTAL :
    adFormat === 'vertical' ? process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR :
    adFormat === 'rectangle' ? process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_RECTANGLE :
    process.env.NEXT_PUBLIC_ADSENSE_HEADER_AD
  );

  // SANITIZATION: Users frequently save "ca-pub-1234567890-098765432" in their .env
  // AdSense explicitly requires data-ad-slot to be ONLY the numeric suffix "098765432"
  if (finalAdSlot && finalAdSlot.includes('-')) {
    finalAdSlot = finalAdSlot.split('-').pop() || finalAdSlot;
  }

  // Check if this is a placeholder ad slot (contains placeholder patterns)
  const isPlaceholder = !finalAdSlot ||
                       finalAdSlot?.includes('XXXXXXXXXX') || 
                       finalAdSlot?.includes('YYYYYYYYYY') || 
                       finalAdSlot?.includes('ZZZZZZZZZZ') ||
                       finalAdSlot?.includes('AAAAAAAAAA') ||
                       finalAdSlot?.includes('BBBBBBBBBB') ||
                       finalAdSlot?.includes('CCCCCCCCCC');

  // If no valid ad slot in production, render nothing
  if (isPlaceholder && process.env.NODE_ENV === 'production') return null;

  // Render a visible placeholder box for development, or if missing in dev
  if (isPlaceholder || process.env.NODE_ENV === 'development') {
    const minHeightVal = style.minHeight || (adFormat === 'horizontal' ? '90px' : adFormat === 'vertical' ? '600px' : '250px');
    return (
      <div 
        className={`bg-stone-100 flex items-center justify-center text-stone-400 text-sm border border-stone-200 border-dashed rounded-md ${className}`}
        style={{ width: '100%', minHeight: minHeightVal, ...style }}
        suppressHydrationWarning
      >
        <span suppressHydrationWarning>Ad Space ({adFormat})</span>
      </div>
    );
  }

  // Enforce a minimum height to prevent layout shift during loading
  const minHeightVal = style.minHeight || (adFormat === 'horizontal' ? '90px' : adFormat === 'vertical' ? '600px' : '250px');
  
  const containerStyle = {
    ...style,
    minHeight: minHeightVal,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  };

  useEffect(() => {
    if (adPushed.current || !publisherId || !finalAdSlot || isPlaceholder) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      adPushed.current = true;
      window.gtag?.('event', 'adsense_slot_requested', {
        ad_slot: finalAdSlot,
        ad_format: adFormat,
        page_path: window.location.pathname,
        non_interaction: true,
        send_to: measurementId,
      });
    } catch (err) {
      console.log('AdSense error:', err);
    }
  }, [publisherId, finalAdSlot, isPlaceholder, adFormat, measurementId]);

  useEffect(() => {
    if (isPlaceholder || !containerRef.current || viewableTracked.current) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry?.isIntersecting || entry.intersectionRatio < 0.5 || viewableTracked.current) return;

      viewableTracked.current = true;
      window.gtag?.('event', 'adsense_slot_viewable', {
        ad_slot: finalAdSlot,
        ad_format: adFormat,
        page_path: window.location.pathname,
        non_interaction: true,
        send_to: measurementId,
      });
      observer.disconnect();
    }, { threshold: [0.5] });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [adFormat, finalAdSlot, isPlaceholder, measurementId]);

  return (
    <div 
      ref={containerRef}
      className={`bg-white dark:bg-neutral-950 rounded overflow-hidden ${className}`}
      style={containerStyle}
      data-ad-format={adFormat}
      data-ad-slot={finalAdSlot}
    >
      <ins
        className="adsbygoogle w-full h-full block"
        data-ad-client={publisherId}
        data-ad-slot={finalAdSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
