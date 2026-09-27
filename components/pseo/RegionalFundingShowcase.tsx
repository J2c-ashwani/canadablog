import React from 'react';
import { Building2, DollarSign, CheckCircle2, Clock, ShieldCheck, Award, FileText } from 'lucide-react';
import type { StateDetailedGrant } from '@/lib/data/stateDetails';
import { getAllPrograms, type ProgramDetails } from '@/lib/data/programs';

interface RegionalFundingShowcaseProps {
  cityName: string;
  provinceName: string;
  provinceSlug: string;
  industryName: string;
  isCanada: boolean;
  stateDetail?: StateDetailedGrant;
}

interface StandardizedRegionalProgram {
  name: string;
  agency: string;
  fundingAmount: string;
  fundingType: string;
  deadline: string;
  description: string;
  eligibility: string[];
}

export default function RegionalFundingShowcase({
  cityName,
  provinceName,
  provinceSlug,
  industryName,
  isCanada,
  stateDetail,
}: RegionalFundingShowcaseProps) {
  // Resolve regional programs based on whether this is US or Canada
  const regionalPrograms: StandardizedRegionalProgram[] = React.useMemo(() => {
    if (isCanada) {
      // Pull from Canadian provincial programs in programsDatabase
      const all = getAllPrograms();
      const matched = all.filter((p: ProgramDetails) => 
        p.region?.toLowerCase() === provinceName.toLowerCase() ||
        p.region?.toLowerCase().includes(provinceName.toLowerCase())
      );

      if (matched.length > 0) {
        return matched.slice(0, 4).map((p) => ({
          name: p.name,
          agency: `${provinceName} Ministry / Regional Development Agency`,
          fundingAmount: p.fundingAmount,
          fundingType: p.category || 'Grant',
          deadline: p.deadlineType || 'Quarterly review cycles',
          description: p.description || `Provincial support dedicated to ${provinceName}-based enterprises.`,
          eligibility: [
            `Must be an active, registered business operating in ${provinceName}`,
            `Eligible for ${industryName.toLowerCase()} and commercial expansion projects`,
            `Demonstrated operational presence in ${cityName} or surrounding region`,
          ],
        }));
      }
    } else if (stateDetail?.topPrograms && stateDetail.topPrograms.length > 0) {
      // Pull from US stateDetails topPrograms
      return stateDetail.topPrograms.slice(0, 4).map((p) => ({
        name: p.name,
        agency: p.agency,
        fundingAmount: p.fundingAmount,
        fundingType: p.fundingType,
        deadline: p.deadline,
        description: p.description,
        eligibility: p.eligibility?.slice(0, 3) || [
          `Commercial operations in ${stateDetail.name}`,
          `Projects located within ${cityName} jurisdiction`,
        ],
      }));
    }

    return [];
  }, [isCanada, provinceName, cityName, industryName, stateDetail]);

  if (regionalPrograms.length === 0) {
    return null;
  }

  return (
    <div id="regional-funding-showcase" className="mt-14 mb-10">
      <div className="flex items-center gap-3 mb-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          Verified Local Directives
        </span>
        <span className="text-xs text-slate-500 font-medium">Updated for 2026 Fiscal Year</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
        {provinceName} State & Provincial Programs for {cityName} {industryName}
      </h2>
      <p className="text-base text-slate-600 mb-8 max-w-3xl leading-relaxed">
        Beyond broad federal opportunities, businesses located in <strong>{cityName}</strong> can qualify for targeted {provinceName} programs. These specific funding streams are governed by provincial/state economic authorities and do not require giving up equity:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regionalPrograms.map((program, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {program.agency}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                  {program.fundingType}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2">
                {program.name}
              </h3>

              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-extrabold text-sm border border-emerald-200/60">
                  <DollarSign className="w-4 h-4 text-emerald-600 -mr-1" />
                  {program.fundingAmount}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {program.deadline}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {program.description}
              </p>

              <div className="border-t border-slate-100 pt-3 mb-4">
                <h4 className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  Key Eligibility Criteria
                </h4>
                <ul className="space-y-1.5">
                  {program.eligibility.map((crit, cIdx) => (
                    <li key={cIdx} className="text-xs text-slate-600 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
              <span>Local Application Advice ({cityName}):</span>
              <a
                href="#assessment"
                className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                Check Eligibility &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
