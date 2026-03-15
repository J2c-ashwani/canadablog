'use client';

import { useEffect, useRef } from 'react';

interface AdSlotProps {
  adSlot: string;
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
    if (adPushed.current || !publisherId) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      adPushed.current = true;
    } catch (err) {
      console.log('AdSense error:', err);
    }
  }, [publisherId]);

  return (
    <div 
      className={`bg-gray-50 dark:bg-neutral-900 border border-dashed border-gray-200 dark:border-neutral-800 rounded overflow-hidden ${className}`}
      style={containerStyle}
    >
      {publisherId ? (
        <ins
          className="adsbygoogle w-full h-full block"
          data-ad-client={publisherId}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
        />
      ) : (
        <span className="text-gray-400 text-sm">Ad Space Reserved</span>
      )}
    </div>
  );
}
