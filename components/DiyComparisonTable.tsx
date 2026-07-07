import { ShieldCheck, XCircle, CheckCircle } from 'lucide-react';

export function DiyComparisonTable() {
  const comparisonData = [
    {
      category: "Program Discovery",
      diy: "Manual searching through clunky, outdated database websites",
      fsi: "Automated matching against 1,200+ active curated B2B programs",
    },
    {
      category: "Eligibility Validation",
      diy: "Guessing fit based on vague criteria",
      fsi: "Quantified scoring across 6 profile dimensions",
    },
    {
      category: "Stacking Strategy",
      diy: "Applying to isolated programs",
      fsi: "Optimized stacking sequences (e.g. IRAP + SR&ED)",
    },
    {
      category: "Application Roadmap",
      diy: "No timeline structure",
      fsi: "Action-ready month-by-month milestone plan",
    },
    {
      category: "Deadline Monitoring",
      diy: "Missed intakes due to lack of reminders",
      fsi: "Alerts for upcoming window closures",
    }
  ];

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
      <div className="bg-slate-50 px-4 py-3.5 flex items-center gap-2 border-b border-slate-200">
        <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
        <span className="font-extrabold text-slate-800 text-xs sm:text-sm uppercase tracking-wider">DIY Approach vs. FSI Digital Analysis</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold text-slate-700">Category</th>
              <th scope="col" className="px-4 py-3 font-semibold text-slate-500">DIY Approach</th>
              <th scope="col" className="px-4 py-3 font-semibold text-emerald-800 bg-emerald-50/50">FSI Digital</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {comparisonData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3.5 font-bold text-slate-800 align-top">{row.category}</td>
                <td className="px-4 py-3.5 text-slate-600 align-top">
                  <div className="flex items-start gap-1.5">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{row.diy}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-slate-900 bg-emerald-50/20 font-medium align-top">
                  <div className="flex items-start gap-1.5 text-emerald-950">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{row.fsi}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
