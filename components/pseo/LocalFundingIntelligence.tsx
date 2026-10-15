import React from 'react';
import { 
  Building2, 
  DollarSign, 
  CheckCircle2, 
  MapPin, 
  ExternalLink, 
  ShieldCheck, 
  HelpCircle, 
  Layers, 
  Briefcase,
  AlertCircle,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import type { LocalRevivalProfile } from '@/lib/pseo-engine/unindexedRevivalCohort';

interface LocalFundingIntelligenceProps {
  profile: LocalRevivalProfile;
}

export default function LocalFundingIntelligence({ profile }: LocalFundingIntelligenceProps) {
  return (
    <section 
      id="local-funding-intelligence" 
      className="my-12 rounded-3xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50/50 p-6 md:p-10 shadow-sm"
      aria-label={`Verified Local Funding Intelligence for ${profile.cityName}`}
    >
      {/* 1. Header & Regional Economic Context */}
      <div className="border-b border-emerald-100 pb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black uppercase tracking-wider shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Regional Intelligence
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            Administering Agency: {profile.regionalAgency}
          </span>
          <span className="text-xs text-slate-500 font-medium ml-auto hidden sm:inline">
            2026 Directives Active
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {profile.cityName} {profile.industryName}: Verified Regional Funding Directives
        </h2>
        
        <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed max-w-4xl">
          {profile.economicContext}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-900">Regional Authority:</span>
          <a 
            href={profile.regionalAgencyUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold underline decoration-emerald-300 underline-offset-2"
          >
            {profile.regionalAgencyFullName} ({profile.regionalAgency})
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 2. Verified Local Program Matrix */}
      <div className="mt-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-emerald-600" />
              Verified Local & Provincial Program Matrix
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Active non-dilutive programs accessible to {profile.industryName.toLowerCase()} operating within {profile.cityName}.
            </p>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full shrink-0">
            {profile.programs.length} Verified Programs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.programs.map((prog, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {prog.agency}
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {prog.type}
                  </span>
                </div>

                <h4 className="text-lg font-black text-slate-900 leading-snug mt-2 mb-2">
                  {prog.name}
                </h4>

                <div className="flex flex-wrap items-center gap-3 my-3">
                  <div className="bg-emerald-50/80 text-emerald-900 font-black text-sm px-3 py-1 rounded-xl border border-emerald-200/80">
                    {prog.maxAmount}
                  </div>
                  <div className="text-xs font-semibold text-slate-600">
                    Coverage: <span className="text-slate-900">{prog.coverage}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  <span className="font-bold text-slate-800">Local Applicability:</span> {prog.localRelevance}
                </p>

                <div className="border-t border-slate-100 pt-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Eligible Cost Categories
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {prog.eligibleCosts.map((cost, cIdx) => (
                      <span 
                        key={cIdx}
                        className="text-[11px] font-medium bg-slate-50 text-slate-700 border border-slate-200/60 px-2 py-0.5 rounded-md"
                      >
                        {cost}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">
                  Status: <span className="text-emerald-700 font-bold">{prog.intakeStatus}</span>
                </span>
                <a 
                  href="#calculator" 
                  className="font-extrabold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 group"
                >
                  Check Qualification <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Hyper-Local Stacking Roadmap */}
      <div className="mt-12 bg-white rounded-2xl border border-indigo-100 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <span className="text-[10px] font-black uppercase tracking-[0.16em] text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-md">
            Capital Architecture
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 mb-2 flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-600" />
            The {profile.cityName} 3-Tier Capital Stacking Architecture
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Canadian public funding rules strictly regulate capital stacking limits (typically 75% to 85% of total eligible expenses). For businesses in <strong>{profile.cityName}</strong>, this standard three-layer stack maximizes non-dilutive capital without triggering federal clawbacks:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">Tier 1: Federal Foundation</div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">NRC-IRAP & SR&ED</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Covers technical R&D payroll (35–64% refundable cash) or direct technical innovation grants up to $500,000.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-200/60 text-[11px] font-bold text-indigo-700">
              Stack Cap: 35%–50% base
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-indigo-600 mb-1">Tier 2: Regional Agency</div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">{profile.regionalAgency} & Provincial Funds</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Delivers capital expansion, commercialization, and productivity grants specifically earmarked for {profile.provinceName} operators.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-200/60 text-[11px] font-bold text-indigo-700">
              Stack Cap: Up to 75% combined
            </div>
          </div>

          <div className="bg-emerald-50/60 rounded-xl p-5 border border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-emerald-700 mb-1">Tier 3: Municipal & Workforce</div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">{profile.cityName} Local Support</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct municipal hiring subsidies, training vouchers, and local development commission incentives to bridge remaining overhead.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-emerald-200 text-[11px] font-bold text-emerald-800">
              Final Stack: 75%–85% Net Funded
            </div>
          </div>
        </div>
      </div>

      {/* 4. Verified Physical Economic Contacts */}
      <div className="mt-10 bg-slate-100/70 rounded-2xl p-6 sm:p-8 border border-slate-200">
        <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-600" />
          Verified Local Intake & Support Contacts ({profile.cityName})
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          Official regional business centers and economic development delivery points serving {profile.cityName}:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profile.localContacts.map((contact, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
              <h4 className="font-black text-slate-900 text-sm mb-1">{contact.name}</h4>
              <p className="text-xs font-semibold text-emerald-700 mb-2">{contact.role}</p>
              <p className="text-xs text-slate-500 mb-3">{contact.addressOrRegion}</p>
              <a 
                href={contact.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-extrabold text-indigo-600 hover:text-indigo-800"
              >
                Official Site <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Hyper-Local FAQ Section */}
      <div className="mt-12">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-indigo-600" />
          Local Funding Decision FAQs ({profile.cityName}, {profile.provinceName})
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          Answers to critical regulatory and capital-allocation questions for {profile.industryName.toLowerCase()} in {profile.cityName}.
        </p>

        <div className="space-y-4">
          {profile.faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
              <h4 className="text-base font-bold text-slate-900 mb-2 flex items-start gap-2">
                <span className="text-emerald-600 font-black">Q{idx + 1}:</span>
                <span>{faq.question}</span>
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed pl-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. High-Conversion Decision CTA */}
      <div className="mt-12 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="max-w-xl text-left">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full mb-2">
            Personalized Decision Engine
          </span>
          <h4 className="text-lg sm:text-xl font-black text-white">
            Calculate Your {profile.cityName} Funding Match & Score
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Run your numbers through our diagnostic screener to see your exact capital stack across {profile.programs.length} verified regional programs.
          </p>
        </div>
        <div className="shrink-0 w-full sm:w-auto">
          <a
            href="#calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm px-6 py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Launch Free Diagnostic &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
