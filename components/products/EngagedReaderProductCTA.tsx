'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, ShieldCheck, X } from 'lucide-react';
import {
  isPaidDistributionContentRoute,
  selectDistributedOffer,
} from '@/lib/products/distribution';
import { calculateTrafficQuality } from '@/lib/telemetry/traffic-quality';

const DISMISS_KEY = 'fsi:paid-distribution:dismissed';
const CLICK_KEY = 'fsi:paid-distribution:clicked';

export function EngagedReaderProductCTA() {
  const pathname = usePathname() || '/';
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const offer = useMemo(() => selectDistributedOffer(pathname, 'bundle'), [pathname]);
  const eligible = isPaidDistributionContentRoute(pathname);

  useEffect(() => {
    if (!eligible) {
      setVisible(false);
      setDismissed(true);
      return;
    }

    const alreadyHandled = sessionStorage.getItem(DISMISS_KEY) === '1'
      || sessionStorage.getItem(CLICK_KEY) === '1';
    setDismissed(alreadyHandled);
    if (alreadyHandled) return;

    let timerTriggered = false;
    let scrollTriggered = false;
    const reveal = () => {
      if (timerTriggered || scrollTriggered) setVisible(true);
    };
    const timer = window.setTimeout(() => {
      timerTriggered = true;
      reveal();
    }, 15_000);
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= 0.22) {
        scrollTriggered = true;
        reveal();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [eligible, pathname]);

  useEffect(() => {
    if (!visible || dismissed || !eligible) return;
    const impressionKey = `fsi:paid-distribution:impression:${pathname}:${offer.id}`;
    if (sessionStorage.getItem(impressionKey) === '1') return;
    sessionStorage.setItem(impressionKey, '1');

    let sessionId = sessionStorage.getItem('fsi_session_id');
    if (!sessionId) {
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      sessionStorage.setItem('fsi_session_id', sessionId);
    }
    const quality = calculateTrafficQuality();
    fetch('/api/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        eventName: 'paid_offer_impression',
        sessionId,
        pagePath: pathname,
        referrer: document.referrer || 'direct',
        productId: offer.id,
        trafficQualityScore: quality.score,
        trafficQualityClassification: quality.classification,
        timezone: quality.timezone,
        language: quality.language,
        heuristicMetadata: JSON.stringify({ surface: 'engaged-reader', experiment: 'intent-v1' }),
      }),
    }).catch(() => {});
  }, [dismissed, eligible, offer.id, pathname, visible]);

  if (!eligible || dismissed || !visible) return null;

  const params = new URLSearchParams({
    surface: 'engaged-reader',
    context: pathname,
    offer: offer.id,
    experiment: 'intent-v1',
  });

  return (
    <aside
      aria-label="Recommended self-serve funding product"
      className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-emerald-400/50 bg-slate-950 p-4 text-white shadow-2xl md:inset-x-auto md:bottom-6 md:right-6 md:w-[370px] md:p-5"
    >
      <button
        type="button"
        aria-label="Dismiss product recommendation"
        onClick={() => {
          sessionStorage.setItem(DISMISS_KEY, '1');
          setDismissed(true);
          setVisible(false);
        }}
        className="absolute right-2 top-2 rounded-full p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="pr-7">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-400">Recommended from this guide</p>
        <h2 className="mt-1.5 text-lg font-black">{offer.name}</h2>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{offer.description}</p>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <a
          href={`/api/growth-os/onsite-click?${params.toString()}`}
          data-organic-offer={offer.id}
          onClick={() => sessionStorage.setItem(CLICK_KEY, '1')}
          className="inline-flex flex-1 items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-center text-xs font-black text-slate-950 transition hover:bg-emerald-400"
        >
          {offer.action} — {offer.priceLabel} <ArrowRight className="ml-1.5 h-4 w-4" />
        </a>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Instant digital access · no sales call required
      </p>
    </aside>
  );
}
