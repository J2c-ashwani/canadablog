import { CheckCircle2 } from 'lucide-react';
import { getPriorityResearchContent } from '@/lib/editorial/priorityResearchContent';
import { PROGRAM_BENCHMARKS, resolveBenchmarkBySlug } from '@/lib/editorial/eligibilityBenchmarks';
import { EligibilityBenchmarkWidget } from '@/components/seo/EligibilityBenchmarkWidget';

interface EditorialResearchContentProps {
  route: string;
}

function getScreenerFocus(route: string) {
  if (route.includes('nih-sbir')) return 'nih-sbir';
  if (route.includes('nsf-sbir')) return 'nsf-sbir';
  if (route.includes('california')) return 'california';
  if (route.includes('quebec')) return 'quebec';
  if (route.includes('technology-startup')) return 'tech-startup';
  return 'general';
}

export function EditorialResearchContent({ route }: EditorialResearchContentProps) {
  const sections = getPriorityResearchContent(route);

  return (
    <div className="space-y-12">
      {sections.map((section, index) => (
        <div key={section.heading} className="space-y-12">
          <section className="border-b border-slate-200 pb-10 last:border-b-0">
            <p className="mb-2 text-xs font-bold uppercase text-emerald-700">Research note {index + 1}</p>
            <h2 className="mb-4 text-2xl font-bold leading-tight text-slate-950 sm:text-3xl">{section.heading}</h2>
            <p className="mb-5 text-base leading-8 text-slate-700 sm:text-lg">{section.summary}</p>
            <ul className="grid gap-3 sm:grid-cols-3">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Inline Exit CTA after Research note 2 (index === 1) */}
          {index === 1 && (() => {
            const benchmark = resolveBenchmarkBySlug(route);
            if (benchmark) {
              return <EligibilityBenchmarkWidget benchmark={benchmark} />;
            }

            return (
              <div className="my-10 rounded-xl border border-indigo-100 bg-indigo-50/50 p-6 sm:p-8 text-center not-prose">
                <h3 className="text-xl font-bold text-slate-950 mb-2">
                  Many applicants discover eligibility issues only after beginning the application process.
                </h3>
                <p className="text-slate-600 mb-6 max-w-lg mx-auto text-sm sm:text-base">
                  Verify if your business meets the critical technical and commercial evaluation standards before submitting your application.
                </p>
                <a
                  href={`/portfolio?focus=${getScreenerFocus(route)}`}
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-500 shadow-sm transition-colors animate-pulse"
                >
                  See My Funding Match Score
                </a>
              </div>
            );
          })()}
        </div>
      ))}
    </div>
  );
}
