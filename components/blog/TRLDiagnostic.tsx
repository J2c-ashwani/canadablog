'use client';

import { useState } from 'react';
import { ArrowRight, Cpu, DollarSign, Calendar, Mail, CheckCircle2 } from 'lucide-react';

interface TRLOption {
  level: string;
  title: string;
  description: string;
  agency: string;
  cap: string;
  timeline: string;
  ctaText: string;
  ctaHref: string;
}

const TRL_DATA: TRLOption[] = [
  {
    level: 'TRL 1-2',
    title: 'Basic Principles & Concept Formulation',
    description: 'Scientific research and initial translation into basic principles. Focuses on feasibility studies.',
    agency: 'NSF (National Science Foundation) or NIH (Phase I)',
    cap: '$225,000 to $275,000 (Non-dilutive)',
    timeline: '6 to 12 months duration',
    ctaText: 'Check NSF SBIR Eligibility',
    ctaHref: '/portfolio?focus=tech-startup'
  },
  {
    level: 'TRL 3-4',
    title: 'Proof of Concept & Laboratory Validation',
    description: 'Active research and development is initiated. Analytical and laboratory studies to validate predictions.',
    agency: 'DoD, DOE, or NASA (Phase I / Early Phase II)',
    cap: '$200,000 to $1,150,000',
    timeline: '6 to 24 months duration',
    ctaText: 'Screen DOE/DoD Subtopics',
    ctaHref: '/portfolio?focus=tech-startup'
  },
  {
    level: 'TRL 5-6',
    title: 'Component Validation & Prototype Demonstration',
    description: 'System/component validation in a relevant environment. Prototyping and initial pilot testing.',
    agency: 'DoD (Phase II) or SIF (Strategic Innovation Fund - Canada)',
    cap: '$1,000,000 to $1,800,000+',
    timeline: '24 months average duration',
    ctaText: 'Start Prototype Funding Check',
    ctaHref: '/portfolio?focus=tech-startup'
  },
  {
    level: 'TRL 7-8',
    title: 'System Prototype & Operational Demonstration',
    description: 'System prototype demonstration in an operational environment. Flight testing or manufacturing trial run.',
    agency: 'DoD Phase III / SIF Stream 1-3 / Commercial Contracts',
    cap: '$5,000,000 to $20,000,000+',
    timeline: 'Multi-year integration cycle',
    ctaText: 'SIF Stream Eligibility Check',
    ctaHref: '/portfolio?focus=canada'
  },
  {
    level: 'TRL 9',
    title: 'Actual System Proven & Commercial Launch',
    description: 'Actual system completed and qualified through successful mission operations. Commercial scale-up.',
    agency: 'Commercial Debt, Non-dilutive Debt, or Venture Capital',
    cap: 'Uncapped (Financing and Scaling Capital)',
    timeline: 'Ongoing commercial lifecycle',
    ctaText: 'Analyze Working Capital Debt Options',
    ctaHref: '/portfolio?focus=canada'
  }
];

export default function TRLDiagnostic() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || selectedIdx === null) return;
    setLoading(true);
    setError('');

    try {
      const selected = TRL_DATA[selectedIdx];
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || 'Founder',
          companyName: companyName || 'Not provided',
          source: 'TRL Selector',
          pagePath: typeof window !== 'undefined' ? window.location.pathname : '/usa/technology-startup-grants',
          category: 'Grant Calculator',
          industry: 'Technology',
          businessStage: 'Early Stage',
          fundingAmount: '$10,000 - $50,000',
          fundingPurpose: ['Research'],
          businessDescription: `Interactive TRL Selector submission. Level: ${selected.level}, title: ${selected.title}`,
          additionalNotes: `TRL Level: ${selected.level}. Recommended: ${selected.agency}. Cap: ${selected.cap}.`
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

  return (
    <div className="my-10 overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/70 p-6 text-white shadow-xl transition-all duration-300 hover:border-indigo-500/30 sm:p-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 animate-pulse" /> Interactive Diagnostics
          </span>
          <h3 className="text-2xl font-black tracking-tight">Federal R&D Agency Selector</h3>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Select your project\'s Technology Readiness Level (TRL) to view the recommended agency track, funding caps, and solicitation timeline.
          </p>
        </div>

        {/* TRL Buttons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {TRL_DATA.map((opt, idx) => (
            <button
              key={opt.level}
              type="button"
              onClick={() => {
                setSelectedIdx(idx);
                setSubmitted(false);
              }}
              className={`p-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                selectedIdx === idx
                  ? 'bg-indigo-600 border-indigo-400 shadow-md shadow-indigo-500/20 text-white font-bold'
                  : 'bg-slate-900/60 border-white/10 hover:border-white/20 text-slate-300'
              }`}
            >
              <div className="text-xs uppercase tracking-wider text-indigo-400 font-black">{opt.level}</div>
              <div className="text-xs mt-1 truncate">{opt.title}</div>
            </button>
          ))}
        </div>

        {/* Diagnostic Output Area */}
        {selectedIdx !== null && (
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-md space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <h4 className="font-black text-white text-base leading-tight">
                {TRL_DATA[selectedIdx].level}: {TRL_DATA[selectedIdx].title}
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{TRL_DATA[selectedIdx].description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-4">
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recommended Agency</div>
                <div className="text-sm font-semibold text-indigo-300 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" /> {TRL_DATA[selectedIdx].agency}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Max Funding Cap</div>
                <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" /> {TRL_DATA[selectedIdx].cap}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estimated Timeline</div>
                <div className="text-sm font-semibold text-amber-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {TRL_DATA[selectedIdx].timeline}
                </div>
              </div>
            </div>

            {/* Lead Capture Form */}
            {!submitted ? (
              <div className="mt-6 border-t border-white/10 pt-6 space-y-4">
                <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-4">
                  <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-indigo-450" /> Save this result & get your custom Funding Roadmap
                  </h5>
                  <p className="text-xs text-slate-300 mt-1">
                    Lock in your recommended SBIR subtopics, timelines, and legal stacking strategies. We will send it directly to your inbox.
                  </p>
                </div>
                <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">First Name (Optional)</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane"
                        className="w-full h-11 px-4 bg-slate-900 border border-white/10 text-white rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company Name (Optional)</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Acme Corp"
                        className="w-full h-11 px-4 bg-slate-900 border border-white/10 text-white rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 space-y-1 text-left">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Business Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@yourbusiness.com"
                        className="w-full h-11 px-4 bg-slate-900 border border-white/10 text-white rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="h-11 px-6 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer disabled:opacity-50 sm:self-end mt-4 sm:mt-0"
                    >
                      {loading ? 'Generating...' : 'Get Funding Roadmap'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
                {error && <p className="text-[11px] text-red-400">{error}</p>}
              </div>
            ) : (
              <div className="mt-6 border-t border-white/10 pt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4">
                  <h5 className="text-sm font-bold text-emerald-450 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Roadmap Queued for {email}
                  </h5>
                  <p className="text-xs text-slate-300 mt-1">
                    Your profile has been saved. We are preparing your custom SBIR/STTR agency subtopic report.
                  </p>
                </div>
                
                {/* Monetization Offer */}
                <div className="rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-white/10 p-5 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Recommended Product Upgrade</span>
                      <h6 className="font-bold text-white text-sm mt-2">Technology Startup Funding Match Report</h6>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Skip the manual research. Get a comprehensive B2B audit report matching your TRL profile to all 12 federal agencies and provincial programs. De-risked with our 100% money-back guarantee.
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs line-through text-slate-400">$49</span>
                      <span className="text-lg font-black text-emerald-400 block">$19</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <a
                      href={`/products/funding-match-report?email=${encodeURIComponent(email)}&focus=tech-startup`}
                      className="h-10 px-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
                    >
                      Upgrade to PDF Report ($19)
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedIdx === null && (
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-slate-400 text-xs">
            Select a TRL level above to generate a personalized funding roadmap.
          </div>
        )}
      </div>
    </div>
  );
}
