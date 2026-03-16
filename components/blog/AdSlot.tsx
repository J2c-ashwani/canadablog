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
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-1200907614877581";
  
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

  // If no valid ad slot, render nothing — don't show empty boxes
  if (isPlaceholder) return null;

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
    } catch (err) {
      console.log('AdSense error:', err);
    }
  }, [publisherId, finalAdSlot, isPlaceholder]);

  return (
    <div 
      className={`bg-gray-50 dark:bg-neutral-900 border border-dashed border-gray-200 dark:border-neutral-800 rounded overflow-hidden ${className}`}
      style={containerStyle}
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
