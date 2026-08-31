import { AlertTriangle, CheckCircle2, ExternalLink, FileCheck2, MapPin } from 'lucide-react';
import { SEARCH_DISTRIBUTION_ROLLOUT_ID } from '@/lib/seo/searchDistributionRollout';

interface CohortProps {
  cityName: string;
  provinceName: string;
  industryName: string;
  regionType: 'state' | 'province';
  isCanada: boolean;
  researchRouteCount?: number;
}

export function CohortResourceHub({
  cityName,
  provinceName,
  industryName,
  regionType,
  isCanada,
  researchRouteCount = 0,
}: CohortProps) {
  const officialDirectory = isCanada
    ? 'https://innovation.canada.ca/'
    : 'https://www.usa.gov/state-economic-development';
  const regionLabel = regionType === 'province' ? 'provincial' : 'state';

  return (
    <section
      data-search-distribution-cohort={SEARCH_DISTRIBUTION_ROLLOUT_ID}
      className="my-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left shadow-sm sm:p-8"
    >
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-indigo-700">Controlled search cohort</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Verify {cityName} funding before applying</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Directory presence is a research lead—not proof of an open intake, eligibility, or award.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Database routes</span>
          <span className="mt-1 block text-xl font-black text-emerald-700">{researchRouteCount} to verify</span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="flex items-center gap-2 font-extrabold text-slate-900">
            <MapPin className="h-5 w-5 text-indigo-600" /> Official starting point
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Start with the official {regionLabel} or federal directory, then open the administering agency’s current guide for the exact program.
          </p>
          <a href={officialDirectory} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-indigo-700 hover:text-indigo-900">
            Open official directory <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="flex items-center gap-2 font-extrabold text-slate-900">
            <FileCheck2 className="h-5 w-5 text-emerald-600" /> Project evidence
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            For a {industryName} business in {cityName}, prepare the project scope, location, start date, itemized budget, matching funds, and measurable outcome before comparing programs.
          </p>
        </div>
      </div>
    </section>
  );
}

export function CohortTrustBlocks({ cityName, provinceName, industryName, regionType }: CohortProps) {
  const regionLabel = regionType === 'province' ? 'provincial' : 'state';
  const checks = [
    'Is the intake open or upcoming on the official administering-agency page?',
    'Does the legal entity, ownership, location, company stage, and sector satisfy the applicant test?',
    'Are the proposed costs, project dates, and measurable outcomes supported?',
    'Is the support a grant, contribution, rebate, tax credit, loan, equity investment, or advisory service?',
  ];

  return (
    <section data-search-distribution-cohort={SEARCH_DISTRIBUTION_ROLLOUT_ID} className="my-10 space-y-6">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="flex items-center gap-2 text-xl font-black text-amber-950">
          <AlertTriangle className="h-5 w-5 text-amber-700" /> Funding reality check
        </h2>
        <p className="mt-3 text-sm leading-7 text-amber-900">
          Funding for {industryName} businesses in {cityName}, {provinceName} is program-specific. Do not rely on an estimated award, approval rate, or timeline unless the current official guide publishes it.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-black text-slate-950">Four checks before you spend</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {checks.map((check) => (
            <li key={check} className="flex items-start gap-2 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
              <span>{check}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          Many—but not all—programs restrict costs committed before application, approval, or a signed agreement. Confirm the exact federal or {regionLabel} rule in writing.
        </p>
      </div>
    </section>
  );
}

export function CohortApplicationPlaybook({ cityName, provinceName, industryName }: CohortProps) {
  const steps = [
    ['Define one project', 'Write the business objective, location, dates, milestones, costs, and measurable outcome.'],
    ['Match the correct instrument', 'Separate grants and contributions from loans, equity, tax credits, rebates, and advisory support.'],
    ['Build the evidence file', 'Prepare incorporation and ownership records, financials, quotes, project capacity, and required partner evidence.'],
    ['Protect timing and cash flow', 'Confirm when costs may begin, how payment works, and whether other public funding may be combined.'],
  ];

  return (
    <section data-search-distribution-cohort={SEARCH_DISTRIBUTION_ROLLOUT_ID} className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-indigo-700">Verification-first playbook</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">Preparing a {industryName} funding application in {provinceName}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600">
        This framework organizes the research; the current official program guide determines eligibility and award terms for a {cityName} applicant.
      </p>
      <ol className="mt-7 grid gap-4 sm:grid-cols-2">
        {steps.map(([title, detail], index) => (
          <li key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <span className="text-xs font-black text-indigo-700">STEP {index + 1}</span>
            <h3 className="mt-1 font-extrabold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
