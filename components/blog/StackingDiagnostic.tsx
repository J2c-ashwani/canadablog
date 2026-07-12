'use client';

import { useState } from 'react';
import { ArrowRight, Layers, Landmark, Info, CheckCircle, Mail, CheckCircle2 } from 'lucide-react';

interface StackResult {
  title: string;
  combination: string[];
  maxStackRate: string;
  rules: string[];
  ctaText: string;
  ctaHref: string;
}

export default function StackingDiagnostic() {
  const [province, setProvince] = useState<string>('');
  const [grantType, setGrantType] = useState<string>('');
  const [employees, setEmployees] = useState<string>('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getResult = (): StackResult | null => {
    if (!province || !grantType || !employees) return null;

    if (province === 'qc') {
      if (grantType === 'digital') {
        return {
          title: 'Quebec Digital Integration Stack',
          combination: ['CDAP Grow Your Business Online ($2.4K)', 'Investissement Québec ESSOR Stream 1 (30-50% subsidy)', 'CDAE Tax Credit (if software-related)'],
          maxStackRate: 'Max 75% of total eligible expenses stacked across provincial and federal sources.',
          rules: [
            'Language Compliance (Bill 96) is mandatory; application must be in French.',
            'Requires a detailed digital action plan certified by an approved advisor.',
            'BDC interest-free tech scaling loans (up to $100K) can stack on top.'
          ],
          ctaText: 'Calculate Quebec Stack Limits',
          ctaHref: '/portfolio?focus=quebec'
        };
      }
      return {
        title: 'Quebec Industrial Innovation Stack',
        combination: ['Investissement Québec ESSOR Stream 2 (R&D)', 'Federal Scientific Research & Experimental Development (SR&ED)', 'MFOR Workforce Training Grants'],
        maxStackRate: 'Combined stacking rate can reach up to 80% through refundable provincial tax credits.',
        rules: [
          'Pre-approval from MEIE required for major capital asset expenditures.',
          'MFOR training subsidies must cover local hiring upskilling programs.',
          'Language validation remains an audit prerequisite.'
        ],
        ctaText: 'Access Quebec Stacking Matrix',
        ctaHref: '/portfolio?focus=quebec'
      };
    }

    if (province === 'on') {
      if (grantType === 'digital') {
        return {
          title: 'Ontario Tech Adoption Stack',
          combination: ['Digital Main Street Growth Grant ($2.5K)', 'CDAP Online Stream ($2.4K)', 'OJT (Ontario Job Creation) Subsidies'],
          maxStackRate: 'Max 50-60% stacking limit on salary-based wage subsidies.',
          rules: [
            'Digital Main Street requires local municipal business tax registration.',
            'Wage support must be approved before hiring the candidate.',
            'Standard corporate tax filing must be active in Ontario.'
          ],
          ctaText: 'Evaluate Ontario Stack Fit',
          ctaHref: '/portfolio?focus=canada'
        };
      }
      return {
        title: 'Ontario Advanced Manufacturing & Scaling Stack',
        combination: ['Ontario Regional Development Program (RDP)', 'Federal Scientific Research (SR&ED)', 'FedDev Ontario Scale-up Loan'],
        maxStackRate: 'Up to 50% matching for regional investments, plus 35% SR&ED tax returns.',
        rules: [
          'RDP requires a minimum $500,000 project spend and 5 new local jobs created.',
          'FedDev loan is zero-interest but fully repayable.',
          'Cannot claim the same developer hours for both provincial training and federal R&D.'
        ],
        ctaText: 'Calculate FedDev & RDP Stacking Limits',
        ctaHref: '/portfolio?focus=canada'
      };
    }

    // Default Fallback / National Stacking
    return {
      title: 'Canada Federal & Regional Co-Funding Stack',
      combination: ['NRC IRAP Salary Subsidy (60-80% developer wages)', 'Scientific Research & Experimental Development (SR&ED) Tax Credits', 'Futurpreneur / BDC Scaling Loans'],
      maxStackRate: 'Theoretical stacking up to 90% of R&D developer labor costs.',
      rules: [
        'CRA proxy tax rules reduce eligible SR&ED expenditures by the amount of IRAP funding received.',
        'You must account for the IRAP reduction on Form T661 to prevent double-dipping.',
        'Separate cost centers must track development sprints versus commercial marketing.'
      ],
      ctaText: 'Start Stacking Assessment',
      ctaHref: '/portfolio?focus=canada'
    };
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !province || !grantType || !employees) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: 'Founder',
          companyName: 'Not provided',
          source: 'Stacking Checker',
          pagePath: typeof window !== 'undefined' ? window.location.pathname : '/canada/government-grants',
          category: 'Grant Calculator',
          industry: 'Technology',
          businessStage: 'Early Stage',
          fundingAmount: '$10,000 - $50,000',
          fundingPurpose: [grantType],
          companySize: employees,
          state: province,
          businessDescription: `Interactive Stacking Checker submission. Province: ${province}, Focus: ${grantType}, Size: ${employees}`,
          additionalNotes: `Selected Province: ${province}. Selected Focus: ${grantType}. Company Size: ${employees}.`
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to submit lead.');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const result = getResult();

  return (
    <div className="my-10 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/70 p-6 text-white shadow-xl transition-all duration-300 hover:border-emerald-500/30 sm:p-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 animate-pulse" /> Interactive Diagnostics
          </span>
          <h3 className="text-2xl font-black tracking-tight">Regional Stacking & Co-Funding Checker</h3>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Configure your province, funding focus, and company size to calculate your legal co-funding stacking limits and recommended program combinations.
          </p>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Province / Region</label>
            <select
              value={province}
              onChange={(e) => {
                setProvince(e.target.value);
                setSubmitted(false);
              }}
              className="w-full h-11 px-3 bg-slate-900 border border-white/10 text-white rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Select province...</option>
              <option value="on">Ontario</option>
              <option value="qc">Quebec</option>
              <option value="bc">British Columbia</option>
              <option value="ab">Alberta</option>
              <option value="national">Other / National Only</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Funding Focus</label>
            <select
              value={grantType}
              onChange={(e) => {
                setGrantType(e.target.value);
                setSubmitted(false);
              }}
              className="w-full h-11 px-3 bg-slate-900 border border-white/10 text-white rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Select focus...</option>
              <option value="digital">Digital Transformation & Tech Adoption</option>
              <option value="innovation">Novel R&D & Product Scaling</option>
              <option value="hiring">Hiring & Student Wage Support</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company Size</label>
            <select
              value={employees}
              onChange={(e) => {
                setEmployees(e.target.value);
                setSubmitted(false);
              }}
              className="w-full h-11 px-3 bg-slate-900 border border-white/10 text-white rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Select size...</option>
              <option value="micro">1 to 10 employees</option>
              <option value="small">11 to 50 employees</option>
              <option value="medium">51 to 500 employees</option>
              <option value="large">500+ employees</option>
            </select>
          </div>
        </div>

        {/* Results output */}
        {result && (
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-md space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <h4 className="font-black text-white text-base leading-tight flex items-center gap-2">
                <Landmark className="w-4 h-4 text-emerald-400" /> {result.title}
              </h4>
              <div className="text-[11px] text-emerald-400 font-bold mt-1 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> {result.maxStackRate}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/10 pt-4">
              <div className="space-y-2">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recommended Funding Stack</h5>
                <ul className="space-y-1.5">
                  {result.combination.map((prog, i) => (
                    <li key={i} className="text-xs text-slate-200 flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{prog}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Compliance Rules</h5>
                <ul className="space-y-1.5">
                  {result.rules.map((rule, i) => (
                    <li key={i} className="text-xs text-slate-300 list-disc list-inside leading-relaxed">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Lead Capture Form */}
            {!submitted ? (
              <div className="mt-6 border-t border-white/10 pt-6 space-y-4">
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4">
                  <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-emerald-400" /> Save this stacking plan & get your custom checklist
                  </h5>
                  <p className="text-xs text-slate-300 mt-1">
                    Secure your calculated co-funding stacking limits, active program matrices, and local compliance checklists.
                  </p>
                </div>
                <form onSubmit={handleLeadSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your business email..."
                    className="flex-1 h-11 px-4 bg-slate-900 border border-white/10 text-white rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="h-11 px-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Generating...' : 'Get Stacking Plan'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
                {error && <p className="text-[11px] text-red-400">{error}</p>}
              </div>
            ) : (
              <div className="mt-6 border-t border-white/10 pt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4">
                  <h5 className="text-sm font-bold text-emerald-450 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Stacking Plan Saved for {email}
                  </h5>
                  <p className="text-xs text-slate-300 mt-1">
                    Your parameters are stored. We are generating your custom regional co-funding matrix and tax credit rules.
                  </p>
                </div>
                
                {/* Monetization Offer */}
                <div className="rounded-xl bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-white/10 p-5 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Recommended Product Upgrade</span>
                      <h6 className="font-bold text-white text-sm mt-2">Government Funding Action Plan & Toolkit</h6>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Immediately secure active templates, co-funding compliance checklists, and program intake forms. Recommended for companies matching this stacking profile.
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs line-through text-slate-400">$99</span>
                      <span className="text-lg font-black text-emerald-400 block">$29</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <a
                      href={`/products/toolkit?email=${encodeURIComponent(email)}&focus=stacking`}
                      className="h-10 px-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
                    >
                      Upgrade to Funding Toolkit ($29)
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {result === null && (
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-slate-400 text-xs">
            Select province, focus, and company size above to calculate stack options.
          </div>
        )}
      </div>
    </div>
  );
}
