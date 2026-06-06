import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { PriorityResearchProfile } from '@/lib/editorial/priorityResearch';

interface IntentStrategyCTAProps {
  cta: PriorityResearchProfile['cta'];
}

export function IntentStrategyCTA({ cta }: IntentStrategyCTAProps) {
  return (
    <section className="my-10 rounded-lg border border-slate-300 bg-slate-950 p-6 text-white shadow-sm sm:p-8" aria-label={cta.title}>
      <div className="grid items-center gap-7 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="mb-2 text-xs font-bold uppercase text-emerald-300">{cta.eyebrow}</p>
          <h2 className="mb-3 text-2xl font-bold leading-tight">{cta.title}</h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-200 sm:text-base">{cta.description}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {cta.supportingPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-slate-100">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <Link
          href={cta.href}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-emerald-400 px-5 py-3 text-center text-sm font-bold text-slate-950 transition-colors hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-slate-950 lg:w-auto"
        >
          {cta.buttonText}
          <ArrowRight className="h-4 w-4 shrink-0" />
        </Link>
      </div>
    </section>
  );
}
