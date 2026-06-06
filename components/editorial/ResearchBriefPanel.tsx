import { CheckCircle2, ExternalLink, FileCheck2, ShieldCheck } from 'lucide-react';
import type { PriorityResearchProfile } from '@/lib/editorial/priorityResearch';

interface ResearchBriefPanelProps {
  profile: PriorityResearchProfile;
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function ResearchBriefPanel({ profile }: ResearchBriefPanelProps) {
  return (
    <section className="mb-10 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm" aria-labelledby="research-brief-title">
      <div className="border-b border-slate-200 bg-slate-950 px-5 py-5 text-white sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-emerald-300">FSI Digital Research Brief</p>
            <h2 id="research-brief-title" className="text-xl font-bold sm:text-2xl">Verified funding decision brief</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            {profile.programStatus}
          </div>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6 p-5 sm:p-7">
          <div>
            <h3 className="mb-2 text-sm font-bold uppercase text-slate-500">Decision summary</h3>
            <p className="text-base leading-7 text-slate-800">{profile.decisionSummary}</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">What we verified</h3>
            <ul className="space-y-3">
              {profile.verificationNotes.map((note) => (
                <li key={note} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="border-l-2 border-amber-400 pl-4 text-sm leading-6 text-slate-600">
            {profile.statusSummary}
          </p>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 p-5 sm:p-7 lg:border-l lg:border-t-0">
          <div className="mb-6 flex items-start gap-3">
            <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
            <div>
              <p className="font-semibold text-slate-900">Reviewed by {profile.reviewedBy}</p>
              <p className="text-sm text-slate-600">{profile.reviewerRole}</p>
              <p className="mt-1 text-xs text-slate-500">Last verified {formatDate(profile.lastVerified)}</p>
            </div>
          </div>

          <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">Official sources</h3>
          <ul className="space-y-3">
            {profile.officialSources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-md border border-slate-200 bg-white p-3 transition-colors hover:border-emerald-600"
                >
                  <span className="flex items-start justify-between gap-2 font-semibold text-slate-900 group-hover:text-emerald-800">
                    {source.name}
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" />
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-600">{source.description}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
