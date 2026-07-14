'use client';

import { useState } from 'react';
import { ArrowRight, HelpCircle, Check, X, ShieldAlert, Award, Mail, CheckCircle2 } from 'lucide-react';

interface Question {
  id: number;
  text: string;
}

const QUESTIONS: Question[] = [
  { id: 1, text: 'Are you incorporated in Canada or the United States as a for-profit entity?' },
  { id: 2, text: 'Do you have active developer payroll or plan to hire technical talent within 60 days?' },
  { id: 3, text: 'Is your project attempting to resolve a technical uncertainty (not just routine engineering)?' },
  { id: 4, text: 'Does the company own or have exclusive rights to the intellectual property (IP)?' },
  { id: 5, text: 'Can you cover at least 20-50% of the project costs using private capital or revenues?' }
];

export default function ChecklistDiagnostic() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnswer = (questionId: number, val: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: val }));
    if (step < QUESTIONS.length) {
      setStep(prev => prev + 1);
    }
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
    setSubmitted(false);
  };

  const getScore = () => {
    return Object.values(answers).filter(Boolean).length;
  };

  const score = getScore();
  const isFinished = step === QUESTIONS.length;

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !isFinished) return;
    setLoading(true);
    setError('');

    try {
      const band = score >= 4 ? 'High' : score >= 3 ? 'Medium' : 'Low';
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || 'Founder',
          companyName: companyName || 'Not provided',
          source: 'Checklist Screener',
          pagePath: typeof window !== 'undefined' ? window.location.pathname : '/guides/apply-irap-grants',
          category: 'Grant Calculator',
          industry: 'Technology',
          businessStage: 'Early Stage',
          fundingAmount: '$10,000 - $50,000',
          fundingPurpose: ['Research'],
          readinessScore: score,
          readinessBand: band,
          businessDescription: `Interactive Checklist Screener. Score: ${score}/5, band: ${band}`,
          additionalNotes: `Checklist screener completed. Score: ${score} out of 5. Questions matching: ${Object.keys(answers).filter(k => answers[Number(k)]).join(',')}`
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
            <HelpCircle className="w-3.5 h-3.5 animate-pulse" /> Interactive Diagnostics
          </span>
          <h3 className="text-2xl font-black tracking-tight">R&D and Grant Qualification Screener</h3>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Answer 5 quick diagnostic questions to instantly gauge your corporate eligibility for non-repayable federal and state R&D grants.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-500 h-full transition-all duration-300"
            style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
          />
        </div>

        {/* Question Flow */}
        {!isFinished ? (
          <div className="space-y-6 min-h-[160px] flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider">
                Question {QUESTIONS[step].id} of {QUESTIONS.length}
              </span>
              <h4 className="text-base font-bold text-white leading-relaxed">
                {QUESTIONS[step].text}
              </h4>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleAnswer(QUESTIONS[step].id, true)}
                className="flex-1 h-12 bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 text-slate-200 hover:text-emerald-400 text-sm"
              >
                <Check className="w-4 h-4" /> Yes
              </button>
              <button
                type="button"
                onClick={() => handleAnswer(QUESTIONS[step].id, false)}
                className="flex-1 h-12 bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 text-slate-200 hover:text-red-400 text-sm"
              >
                <X className="w-4 h-4" /> No
              </button>
            </div>
          </div>
        ) : (
          /* Finished State Outputs */
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {score >= 4 ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex gap-3 items-start">
                <Award className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-base">High Grant Eligibility Confirmed</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Your company matches the target profile for non-repayable R&D grants like NRC IRAP, NSF SBIR, and associated provincial or state matching programs.
                  </p>
                </div>
              </div>
            ) : score >= 3 ? (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3 items-start">
                <HelpCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-base">Partial Qualification Match</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    You meet several core criteria but may fail specific program parameters (e.g. lacking incorporation or R&D technical risk). Look at pre-seed tax matching.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-3 items-start">
                <ShieldAlert className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-base">Structural Adjustments Needed</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Corporate structural constraints (e.g. lack of in-house technical talent or R&D uncertainty) make early-stage grants unlikely. Evaluate regional microloans.
                  </p>
                </div>
              </div>
            )}

            {/* Lead Capture and Monetization */}
            {!submitted ? (
              <div className="mt-6 border-t border-white/10 pt-6 space-y-4">
                <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-4">
                  <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-indigo-400" /> Unlock your detailed qualification report
                  </h5>
                  <p className="text-xs text-slate-300 mt-1">
                    Enter your email to receive active program deadlines, custom application templates, and stacking limits matching this diagnostic result.
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
                      {loading ? 'Analyzing...' : 'Unlock Audit Report'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
                {error && <p className="text-[11px] text-red-400">{error}</p>}
                
                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={reset}
                    className="text-[11px] text-slate-400 hover:text-slate-200 underline cursor-pointer"
                  >
                    Retake Assessment
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 border-t border-white/10 pt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4">
                  <h5 className="text-sm font-bold text-emerald-450 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Qualification Confirmed for {email}
                  </h5>
                  <p className="text-xs text-slate-300 mt-1">
                    Check your inbox. We have sent the baseline qualification guidelines and IRAP/SBIR program calendar.
                  </p>
                </div>
                
                {/* Monetization Offer */}
                <div className="rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-white/10 p-5 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Recommended Product Upgrade</span>
                      <h6 className="font-bold text-white text-sm mt-2">Personalized Grant Matching Report</h6>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Secure a comprehensive professional audit matching your exact qualification parameters to all 12 federal agencies and provincial programs.
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs line-through text-slate-400">$49</span>
                      <span className="text-lg font-black text-emerald-400 block">$19</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <a
                      href={`/products/funding-match-report?email=${encodeURIComponent(email)}&focus=checklist`}
                      className="h-10 px-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
                    >
                      Upgrade to PDF Report ($19)
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={reset}
                    className="text-[11px] text-slate-400 hover:text-slate-200 underline cursor-pointer"
                  >
                    Retake Assessment
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
