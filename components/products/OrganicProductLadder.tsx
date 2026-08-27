import { ArrowRight, BellRing, FileCheck2, FileSearch, Layers3 } from 'lucide-react';

type Surface = 'blog' | 'grants-city-industry' | 'footer';

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
    primary: true,
  },
  {
    id: 'action-plan',
    name: 'Funding Action Plan',
    price: '$49',
    cadence: 'one time',
    description: 'Turn your funding research into a sequenced application and document plan.',
    action: 'View action plan',
    icon: FileCheck2,
    primary: false,
  },
  {
    id: 'bundle',
    name: 'Complete Funding Blueprint',
    price: '$79',
    cadence: 'one time',
    description: 'Get the complete self-serve report, roadmap, and preparation toolkit.',
    action: 'View complete bundle',
    icon: Layers3,
    primary: false,
  },
  {
    id: 'membership',
    name: 'Funding Watch',
    price: '$29',
    cadence: 'per month',
    description: 'Receive an automated weekly radar based on your saved business profile.',
    action: 'Start Funding Watch',
    icon: BellRing,
    primary: false,
  },
] as const;

function trackedHref(surface: Surface, context: string, offer: string) {
  const params = new URLSearchParams({ surface, context, offer });
  return `/api/growth-os/onsite-click?${params.toString()}`;
}

export function OrganicProductLadder({ surface, context }: OrganicProductLadderProps) {
  return (
    <section
      aria-label="Self-serve funding products"
      className="not-prose my-12 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 text-white shadow-xl"
    >
      <div className="border-b border-slate-800 bg-gradient-to-r from-slate-950 via-indigo-950/60 to-slate-950 px-5 py-6 sm:px-7">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Choose your self-serve next step</p>
        <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">Move from grant research to a usable funding plan</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
          Instant digital delivery. No sales call, live session, or consultation is required.
        </p>
      </div>

      <div className="grid gap-px bg-slate-800 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((offer) => {
          const Icon = offer.icon;
          return (
            <article key={offer.id} className={`flex flex-col bg-slate-950 p-5 ${offer.primary ? 'ring-1 ring-inset ring-emerald-500/60' : ''}`}>
              <div className="flex items-start justify-between gap-3">
                <div className={`rounded-lg p-2 ${offer.primary ? 'bg-emerald-500/15 text-emerald-400' : 'bg-indigo-500/15 text-indigo-300'}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                {offer.primary && <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-300">Start here</span>}
              </div>
              <h3 className="mt-4 text-sm font-extrabold text-white">{offer.name}</h3>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-white">{offer.price}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">USD · {offer.cadence}</span>
              </div>
              <p className="mt-3 flex-1 text-xs leading-relaxed text-slate-400">{offer.description}</p>
              <a
                href={trackedHref(surface, context, offer.id)}
                data-organic-offer={offer.id}
                className={`mt-5 inline-flex items-center justify-center rounded-lg px-3 py-2.5 text-xs font-extrabold transition-colors ${
                  offer.primary
                    ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                {offer.action} <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </article>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 border-t border-slate-800 bg-slate-900/80 px-5 py-3 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <span>Need application templates only?</span>
        <a
          href={trackedHref(surface, context, 'toolkit')}
          data-organic-offer="toolkit"
          className="font-bold text-indigo-300 hover:text-indigo-200"
        >
          Funding Application Toolkit — $29 USD one time →
        </a>
      </div>
    </section>
  );
}
