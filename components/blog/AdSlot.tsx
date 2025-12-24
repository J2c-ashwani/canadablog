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
  style = { display: 'block' },
  className = ''
}: AdSlotProps) {
  const adPushed = useRef(false);

  useEffect(() => {
    // Prevent double execution in Strict Mode or if ID is missing
    if (adPushed.current || !process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID) return;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      adPushed.current = true;
    } catch (err) {
      console.log('AdSense error:', err);
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID) {
    return (
      <div className={`bg-gray-100 p-4 text-center text-gray-500 ${className}`} style={style}>
        <p>Advertisement Space</p>
        <p className="text-xs">Configure NEXT_PUBLIC_ADSENSE_PUBLISHER_ID</p>
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
}
