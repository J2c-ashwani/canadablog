import { CheckCircle, XCircle, AlertCircle, BarChart3 } from 'lucide-react';
import { ProgramBenchmark } from '@/lib/editorial/eligibilityBenchmarks';

export function EligibilityBenchmarkWidget({ benchmark }: { benchmark: ProgramBenchmark }) {
  return (
    <div className="my-10 rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8 not-prose shadow-sm max-w-4xl mx-auto text-left">
      <div className="flex items-center gap-3 border-b border-slate-200/60 pb-4 mb-6">
        <BarChart3 className="w-5 h-5 text-indigo-600" />
        <h4 className="text-lg font-black text-slate-900">
          Typical Applicant Profile: {benchmark.programName}
        </h4>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200/60 rounded-xl p-3 text-center">
          <span className="block text-[10px] uppercase font-bold text-slate-400">Est. Funding</span>
          <span className="block text-sm font-black text-slate-900 mt-0.5">{benchmark.avgFunding}</span>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-xl p-3 text-center">
          <span className="block text-[10px] uppercase font-bold text-slate-400">Avg Revenue</span>
          <span className="block text-sm font-black text-slate-900 mt-0.5">{benchmark.avgRevenue}</span>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-xl p-3 text-center">
          <span className="block text-[10px] uppercase font-bold text-slate-400">Min. Team Size</span>
          <span className="block text-sm font-black text-slate-900 mt-0.5">{benchmark.avgEmployees}</span>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-xl p-3 text-center">
          <span className="block text-[10px] uppercase font-bold text-slate-400">Target Stage</span>
          <span className="block text-sm font-black text-slate-900 mt-0.5">{benchmark.stage}</span>
        </div>
      </div>

      {/* Qualify vs Struggle */}
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-3">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Key Qualifiers
          </h5>
          <ul className="space-y-2 text-xs text-slate-600">
            {benchmark.qualifiers.map(q => (
              <li key={q} className="flex items-start gap-1.5">
                <span className="text-emerald-600">•</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-red-800 flex items-center gap-1.5 mb-3">
            <XCircle className="w-4 h-4 text-red-500" /> Rejection Risk Factors
          </h5>
          <ul className="space-y-2 text-xs text-slate-600">
            {benchmark.struggles.map(s => (
              <li key={s} className="flex items-start gap-1.5">
                <span className="text-red-500">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Product-Oriented Score CTA */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h6 className="font-extrabold text-indigo-950 text-sm">How Does Your Business Compare?</h6>
            <p className="text-[11px] text-indigo-700 leading-relaxed mt-0.5">
              {benchmark.complianceNote} Estimate your <strong>Funding Match Score</strong> (e.g. 82/100) based on your team, location, and development activities.
            </p>
          </div>
        </div>
        <a
          href={`/portfolio?focus=${benchmark.screenerFocus}`}
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 text-xs font-bold text-white transition-colors shadow-sm whitespace-nowrap"
        >
          See My Funding Match Score
        </a>
      </div>
    </div>
  );
}
