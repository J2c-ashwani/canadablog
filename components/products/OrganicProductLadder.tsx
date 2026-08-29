import { ArrowRight, BellRing, FileCheck2, FileSearch, Layers3 } from 'lucide-react';
import { selectDistributedOffer } from '@/lib/products/distribution';

type Surface = 'blog' | 'grants-city-industry' | 'footer' | 'homepage';

interface OrganicProductLadderProps {
  surface: Surface;
  context: string;
}

const offers = [
  {
    id: 'match-report',
    name: 'Funding Match Report',
    price: '$19',
    cadence: 'one time',
    description: 'See matched programs, estimated ranges, requirements, and priority order.',
    action: 'Get my report',
    icon: FileSearch,
  },
  {
    id: 'toolkit',
    name: 'Funding Application Toolkit',
    price: '$29',
    cadence: 'one time',
    description: 'Use the application budgets, worksheets, checklists, and preparation templates.',
    action: 'Get the toolkit',
    icon: FileCheck2,
  },
  {
    id: 'action-plan',
    name: 'Funding Action Plan',
    price: '$49',
    cadence: 'one time',
    description: 'Turn your funding research into a sequenced application and document plan.',
    action: 'View action plan',
    icon: FileCheck2,
  },
  {
    id: 'bundle',
    name: 'Complete Funding Blueprint',
    price: '$79',
    cadence: 'one time',
    description: 'Get the complete self-serve report, roadmap, and multi-year stacking simulation.',
    action: 'View complete bundle',
    icon: Layers3,
  },
  {
    id: 'membership',
    name: 'Funding Watch',
    price: '$29',
    cadence: 'per month',
    description: 'Receive an automated weekly radar based on your saved business profile.',
    action: 'Start Funding Watch',
    icon: BellRing,
  },
] as const;

function trackedHref(surface: Surface, context: string, offer: string) {
  const params = new URLSearchParams({ surface, context, offer, experiment: 'focused-v2' });
  return `/api/growth-os/onsite-click?${params.toString()}`;
}

export function OrganicProductLadder({ surface, context }: OrganicProductLadderProps) {
  const fallbackId = surface === 'footer'
    ? 'bundle'
    : surface === 'grants-city-industry'
      ? 'action-plan'
      : 'match-report';
  const recommendedId = selectDistributedOffer(context, fallbackId).id;
  const recommended = offers.find((offer) => offer.id === recommendedId) || offers[0];
  const alternatives = offers.filter((offer) => offer.id !== recommended.id);
  const RecommendedIcon = recommended.icon;

  return (
    <section
      aria-label="Self-serve funding products"
      className="not-prose my-12 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 text-white shadow-xl"
    >
      <div className="border-b border-slate-800 bg-gradient-to-r from-slate-950 via-indigo-950/60 to-slate-950 px-5 py-6 sm:px-7">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Recommended self-serve next step</p>
        <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">Move from grant research to one useful outcome</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
          Instant digital delivery. No sales call, live session, or consultation is required.
        </p>
      </div>

      <div className="bg-slate-950 p-5 sm:p-7">
        <article className="grid items-center gap-5 rounded-xl border border-emerald-500/50 bg-emerald-500/5 p-5 sm:grid-cols-[auto_1fr_auto]">
          <div className="w-fit rounded-xl bg-emerald-500/15 p-3 text-emerald-400">
            <RecommendedIcon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-extrabold text-white">{recommended.name}</h3>
              <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-300">Recommended here</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{recommended.description}</p>
          </div>
          <div className="sm:min-w-44">
            <div className="mb-2 flex items-baseline justify-center gap-1.5">
              <span className="text-2xl font-black text-white">{recommended.price}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">USD · {recommended.cadence}</span>
            </div>
            <a
              href={trackedHref(surface, context, recommended.id)}
              data-organic-offer={recommended.id}
              className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-3 text-xs font-extrabold text-slate-950 transition-colors hover:bg-emerald-400"
            >
              {recommended.action} <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>

      <div className="border-t border-slate-800 bg-slate-900/80 px-5 py-4 sm:px-7">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Other self-serve options</span>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-[11px]">
          {alternatives.map((offer) => (
            <a
              key={offer.id}
              href={trackedHref(surface, context, offer.id)}
              data-organic-offer={offer.id}
              className="font-bold text-indigo-300 hover:text-indigo-200"
            >
              {offer.name} — {offer.price}{offer.cadence === 'per month' ? '/month' : ''} →
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
