import { CheckCircle2 } from 'lucide-react';
import { getPriorityResearchContent } from '@/lib/editorial/priorityResearchContent';

interface EditorialResearchContentProps {
  route: string;
}

export function EditorialResearchContent({ route }: EditorialResearchContentProps) {
  const sections = getPriorityResearchContent(route);

  return (
    <div className="space-y-12">
      {sections.map((section, index) => (
        <section key={section.heading} className="border-b border-slate-200 pb-10 last:border-b-0">
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
      ))}
    </div>
  );
}
