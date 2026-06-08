'use client';

import { useEffect } from 'react';
import { trackGAEvent } from '@/components/LeadConversionUpsellWatcher';

export function PartnerPurchaseTracker({
  packageId,
  packageName,
  price,
  orderId,
}: {
  packageId: string;
  packageName: string;
  price: number;
  orderId: string;
}) {
  useEffect(() => {
    if (!orderId) return;

    const storageKey = `purchase_tracked_partner_${orderId}`;
    if (window.sessionStorage.getItem(storageKey)) return;

    trackGAEvent('purchase', {
      transaction_id: orderId,
      value: price,
      currency: 'USD',
      items: [
        {
          item_id: packageId,
          item_name: packageName,
          price: price,
          quantity: 1,
        }
      ],
      utm_source: window.sessionStorage.getItem('fsi:utm_source') || 'N/A',
      utm_medium: window.sessionStorage.getItem('fsi:utm_medium') || 'N/A',
      utm_campaign: window.sessionStorage.getItem('fsi:utm_campaign') || 'N/A',
    });

    window.sessionStorage.setItem(storageKey, 'true');
  }, [packageId, packageName, price, orderId]);

  return null;
}
