'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, Cpu, DollarSign, Calendar, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { RDE_CONFIGS } from '@/lib/data/rdeConfigs';

interface RDEDecisionEngineProps {
  configId: string;
}

export default function RDEDecisionEngine({ configId }: RDEDecisionEngineProps) {
  const config = RDE_CONFIGS[configId];

  // If configuration doesn't exist, render a fallback warning (helps debugging)
  if (!config) {
    return (
      <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 flex items-center gap-2 text-xs">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>RDE Configuration &apos;{configId}&apos; not found. Verify lib/data/rdeConfigs.ts definitions.</span>
      </div>
    );
  }

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const questions = config.questions;
  const isQuestionsFinished = currentQuestionIdx >= questions.length;
  const activeQuestion = !isQuestionsFinished ? questions[currentQuestionIdx] : null;

  // Handle single question selection/input
  const handleAnswerSelect = (val: string) => {
    const activeQ = questions[currentQuestionIdx];
    const newAnswers = { ...answers, [activeQ.id]: val };
    setAnswers(newAnswers);

    // Auto-advance to the next step
    setCurrentQuestionIdx((prev) => prev + 1);
  };

  const resetDiagnostic = () => {
    setAnswers({});
    setCurrentQuestionIdx(0);
    setEmail('');
    setName('');
    setSubmitted(false);
    setError('');
  };

  // Run evaluation on completed answers
  const evaluation = isQuestionsFinished ? config.evaluate(answers) : null;

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !evaluation) return;
    setLoading(true);
    setError('');

    // Prepare UTM parameters
    let utmSource = 'organic';
    let utmMedium = 'blog';
    let utmCampaign = 'wave3_rde';

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      utmSource = urlParams.get('utm_source') || utmSource;
      utmMedium = urlParams.get('utm_medium') || utmMedium;
      utmCampaign = urlParams.get('utm_campaign') || utmCampaign;
    }

    try {
      // Post full lead data to sheets database
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || 'Founder',
          province: answers.province || 'on',
          industry: answers.industry || 'Technology',
          companyRevenue: answers.revenue || 'under_100k',
          employees: answers.employees || '1_4',
          diagnosticType: config.title,
          qualificationScore: evaluation.probability,
          fundingEstimate: evaluation.eligibilityEstimate,
          matchedPrograms: evaluation.matchedPrograms,
          productRecommended: evaluation.escalate ? '1-on-1 Strategy Session ($199)' : evaluation.productName,
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : `/blog/${configId}`,
          utmSource,
          utmMedium,
          utmCampaign,
          timestamp: new Date().toISOString()
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to sync lead profile.');
      }

      // Track purchase checkout conversion events in sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('lead_email', email);
        sessionStorage.setItem('lead_name', name);
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error saving lead. Please verify connection and retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10 overflow-hidden rounded-3xl border border-indigo-550/20 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/80 p-6 text-white shadow-xl transition-all duration-300 hover:border-indigo-500/35 sm:p-8">
      <div className="space-y-6">
        {/* Header Block */}
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-black bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5 animate-pulse" /> Interactive Decision Tool
          </span>
          <h3 className="text-2xl font-black tracking-tight text-white">{config.title}</h3>
          <p className="text-xs text-slate-350 max-w-2xl leading-relaxed">{config.description}</p>
        </div>

        {/* Question Form Active State */}
        {!isQuestionsFinished && activeQuestion && (
          <div className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-md space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
              <span>Question {currentQuestionIdx + 1} of {questions.length}</span>
              <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-300" 
                  style={{ width: `${((currentQuestionIdx) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h4 className="text-base font-bold text-white leading-snug">{activeQuestion.text}</h4>

            {/* Yes/No Option Buttons */}
            {activeQuestion.type === 'yesno' && (
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleAnswerSelect('yes')}
                  className="flex-1 py-3 px-5 rounded-xl border border-white/15 bg-white/5 font-bold text-sm text-center hover:bg-white/10 hover:border-white/30 transition-all duration-200 cursor-pointer"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleAnswerSelect('no')}
                  className="flex-1 py-3 px-5 rounded-xl border border-white/15 bg-white/5 font-bold text-sm text-center hover:bg-white/10 hover:border-white/30 transition-all duration-200 cursor-pointer"
                >
                  No
                </button>
              </div>
            )}

            {/* Select Options Grid */}
            {activeQuestion.type === 'select' && activeQuestion.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {activeQuestion.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleAnswerSelect(opt.value)}
                    className="p-3 text-left rounded-xl border border-white/10 bg-slate-900/50 hover:bg-slate-900/90 hover:border-indigo-500/40 text-xs transition-all duration-200 cursor-pointer text-slate-200"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Personalized Result Output State */}
        {isQuestionsFinished && evaluation && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-md space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <h4 className="font-black text-white text-base">Your Assessment Result</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Based on matching eligibility algorithms</p>
                </div>
                <button
                  type="button"
                  onClick={resetDiagnostic}
                  className="p-1.5 rounded-lg border border-white/10 bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 transition-all duration-200 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Retry
                </button>
              </div>

              {/* Outcome Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estimated Eligibility</div>
                  <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" /> {evaluation.eligibilityEstimate || 'Calculating...'}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Readiness Probability</div>
                  <div className={`text-sm font-semibold flex items-center gap-1.5 ${
                    evaluation.probability === 'High' ? 'text-green-400' : 'text-amber-400'
                  }`}>
                    <Sparkles className="w-3.5 h-3.5" /> {evaluation.probability}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Matched Programs</div>
                  <div className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                    {evaluation.matchedPrograms.length} Opportunities
                  </div>
                </div>
              </div>

              {/* Matches List */}
              <div className="pt-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Identified Funding Programs</div>
                <div className="space-y-1.5">
                  {evaluation.matchedPrograms.map((prog, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span>{prog}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead Capture Form */}
              {!submitted ? (
                <div className="mt-6 border-t border-white/10 pt-6 space-y-4">
                  <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-4">
                    <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-indigo-400" /> Save your Roadmap & Get Free Action Plan Summary
                    </h5>
                    <p className="text-[11px] text-slate-350 mt-1">
                      Lock in your assessment. We will email you the full checklist, combination stacking rules, and deadline reminders.
                    </p>
                  </div>
                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="Your Name (Optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 h-11 px-4 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Business Email (Required)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 h-11 px-4 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="h-11 px-6 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : 'Get My Roadmap'}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                  {error && <p className="text-[11px] text-red-400">{error}</p>}
                </div>
              ) : (
                <div className="mt-6 border-t border-white/10 pt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4">
                    <h5 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Action Plan Queued for {email}
                    </h5>
                    <p className="text-xs text-slate-350 mt-1">
                      Check your inbox. We have sent the diagnostic summary and roadmap checklist.
                    </p>
                  </div>
                  
                  {/* Dynamic Monetization Block / Enterprise Escalation */}
                  {answers.revenue === 'above_3m' && answers.employees === '100_plus' ? (
                    // 1. Enterprise Done-For-You Filing Service ($2,500+)
                    <div className="rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 border-2 border-indigo-500/50 p-5 space-y-4 shadow-2xl animate-in fade-in duration-300">
                      <div>
                        <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Done-For-You Filing Service</span>
                        <h6 className="font-bold text-white text-base mt-2">Done-For-You Government Grant & Tax Credit Filing</h6>
                        <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                          Your enterprise profile qualifies for our success-based preparation and filing track. Our senior advisors manage your entire application pipeline, technical studies, and government submissions.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2 border-t border-white/5">
                        <div className="text-left">
                          <span className="text-[10px] text-slate-400 block">Service Model</span>
                          <span className="text-lg font-black text-indigo-400">$2,500+ Success Fee</span>
                        </div>
                        <a
                          href={`/contact?email=${encodeURIComponent(email)}&service=done-for-you-filing`}
                          className="h-10 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
                        >
                          Request Filing Consultation
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ) : (answers.revenue === 'above_3m' || answers.employees === '26_99' || answers.employees === '100_plus' || evaluation.escalate) ? (
                    // 2. High-Value Strategy Session ($199)
                    <div className="rounded-xl bg-gradient-to-br from-indigo-950 to-slate-950 border border-indigo-500/30 p-5 space-y-4 animate-in fade-in duration-300">
                      <div>
                        <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Enterprise Strategy Track</span>
                        <h6 className="font-bold text-white text-base mt-2">1-on-1 Government Funding Strategy Session</h6>
                        <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                          Your business qualifies for regional matching grants and multi-program stacking. Schedule an audit session directly with our senior consultant to structure your application pipeline.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2 border-t border-white/5">
                        <div className="text-left">
                          <span className="text-[10px] text-slate-400 block">Session Fee</span>
                          <span className="text-lg font-black text-amber-400">$199.00</span>
                        </div>
                        <a
                          href={`/products/strategy-session?email=${encodeURIComponent(email)}`}
                          className="h-10 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
                        >
                          Book Strategy Session ($199)
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    // 3. Standard Low-Ticket Product Upgrade ($19 - $49)
                    <div className="rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-white/10 p-5 space-y-3 animate-in fade-in duration-300">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Recommended Product Upgrade</span>
                          <h6 className="font-bold text-white text-sm mt-2">{evaluation.productName}</h6>
                          <p className="text-xs text-slate-350 mt-1 leading-relaxed">
                            Unlock full program requirements, step-by-step templates, month-by-month timelines, and advisor contacts. 100% money-back guarantee.
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs line-through text-slate-400">$49</span>
                          <span className="text-lg font-black text-emerald-400 block">${evaluation.productPrice}</span>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-2">
                        <a
                          href={`${evaluation.productPath}?email=${encodeURIComponent(email)}`}
                          className="h-10 px-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
                        >
                          Upgrade to PDF Report (${evaluation.productPrice})
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Start Diagnostic Area */}
        {!isQuestionsFinished && currentQuestionIdx === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-slate-400 text-xs">
            Begin the assessment above to estimate your funding limits and match stack.
          </div>
        )}
      </div>
    </div>
  );
}
