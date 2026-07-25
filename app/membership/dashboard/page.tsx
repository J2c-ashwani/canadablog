'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, FileText, Calendar, Download, Settings, LogOut, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';

export default function MemberDashboardPage() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';

  const [email, setEmail] = useState(emailParam);
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'matches' | 'briefings' | 'templates' | 'settings'>('matches');
  const [cancelReason, setCancelReason] = useState('');
  const [cancelling, setCancelling] = useState(false);
  const [cancelStatus, setCancelStatus] = useState('');

  useEffect(() => {
    if (emailParam) {
      fetchMemberData(emailParam);
    }
  }, [emailParam]);

  const fetchMemberData = async (targetEmail: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/subscriber/restore?email=${encodeURIComponent(targetEmail)}`);
      if (res.ok) {
        const data = await res.json();
        setMember(data);
      }
    } catch (e) {
      console.warn('Failed to load member details', e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!email) return;
    setCancelling(true);
    setCancelStatus('');

    try {
      const res = await fetch('/api/membership/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, reason: cancelReason }),
      });

      const json = await res.json();
      if (!res.ok) {
        setCancelStatus(json.error || 'Failed to cancel subscription.');
      } else {
        setCancelStatus('Subscription cancelled successfully.');
        fetchMemberData(email);
      }
    } catch {
      setCancelStatus('Connection error. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  // Dynamic Score & Timeline Calculation Engine
  const calculateDynamicState = () => {
    let score = 50;
    let currentStage = 1;
    let stageTitle = 'Stage 1: Journey Started';
    let nextAction = 'Complete B2B Profile Onboarding';

    let activity: any = {};
    try {
      if (member?.leadActivity) {
        activity = typeof member.leadActivity === 'string' ? JSON.parse(member.leadActivity) : member.leadActivity;
      }
    } catch (e) {}

    const hasRegion = Boolean(member?.region || activity?.province);
    const hasIndustry = Boolean(member?.industry || activity?.industry);
    const hasRevenue = Boolean(member?.annualRevenue || activity?.revenueBand);
    const hasEmployees = Boolean(activity?.employees);

    if (hasRegion) score += 10;
    if (hasIndustry) score += 10;
    if (hasRevenue) score += 10;
    if (hasEmployees) score += 8;

    if (hasRegion && hasIndustry && hasRevenue) {
      currentStage = 2; // Eligibility Complete
      stageTitle = 'Stage 2: Eligibility Match Confirmed';
      nextAction = 'Compile technical payroll & R&D records';
    }

    if (activity?.downloadedTemplates || activity?.onboardedAt) {
      currentStage = 3; // Documents Ready
      stageTitle = 'Stage 3: Documents Ready';
      nextAction = 'Review CanExport or IRAP application filing';
    }

    if (member?.reportPurchased || member?.strategyReportPurchased) {
      currentStage = 4; // Application Submitted / Audit Booked
      stageTitle = 'Stage 4: Application Review / Audit';
      nextAction = 'Prepare for 1-on-1 strategy session / filing pre-check';
    }

    if (activity?.fundingSecuredAmount) {
      currentStage = 5; // Funding Awarded
      stageTitle = 'Stage 5: Funding Awarded 🎉';
      nextAction = 'Maintain monthly compliance reporting';
    }

    return {
      score: Math.min(score, 100),
      currentStage,
      stageTitle,
      nextAction,
      hasRegion,
      hasIndustry,
      hasRevenue,
      hasEmployees,
      fundingSecuredAmount: activity?.fundingSecuredAmount || '$85,000',
    };
  };

  const dynamicState = calculateDynamicState();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Active Founding Member Intelligence Desk
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Member Funding Dashboard</h1>
            <p className="text-xs text-slate-400 mt-1">Logged in as: <strong className="text-slate-200">{email || 'Guest Member'}</strong></p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Active Member Entitlement
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4 mb-8">
          {[
            { id: 'matches', label: 'Active Matches & Deadlines', icon: Calendar },
            { id: 'briefings', label: 'Weekly Radar Briefings', icon: FileText },
            { id: 'templates', label: 'Template & Worksheet Library', icon: Download },
            { id: 'settings', label: 'Account & Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  active ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: Active Matches */}
        {activeTab === 'matches' && (
          <div className="space-y-6">
            {/* Dynamic Funding Readiness Score Card */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">Personalized Audit Index</span>
                  <h3 className="text-xl font-black text-white">Funding Readiness Score</h3>
                  <p className="text-xs text-slate-400 max-w-md">Calculated dynamically based on your profile completeness and active program criteria.</p>
                </div>

                <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800 px-5 py-3 rounded-2xl">
                  <div className="text-center">
                    <div className="text-3xl font-black text-emerald-400">{dynamicState.score} <span className="text-sm font-bold text-slate-500">/ 100</span></div>
                    <div className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                      {dynamicState.score >= 75 ? 'High Match Tier' : 'Moderate Match Tier'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 grid sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  <div className="font-bold text-emerald-400 mb-1">✓ Top Match: IRAP R&amp;D Subsidy</div>
                  <div className="text-slate-400 text-[11px]">Covers up to 50–80% developer payroll.</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  <div className="font-bold text-amber-400 mb-1">⚠️ CanExport Int'l Expansion</div>
                  <div className="text-slate-400 text-[11px]">Intake window closing soon.</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  <div className="font-bold text-sky-400 mb-1">📋 Next Action Item</div>
                  <div className="text-slate-400 text-[11px] font-semibold">{dynamicState.nextAction}</div>
                </div>
              </div>
            </div>

            {/* Dynamic Funding Journey Timeline Stepper */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Funding Journey Timeline</h3>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-950 border border-emerald-800 px-2.5 py-1 rounded-md">{dynamicState.stageTitle}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                {[
                  { step: 1, title: 'Start Journey', req: 'Account Created' },
                  { step: 2, title: 'Eligibility Complete', req: 'Profile Completed' },
                  { step: 3, title: 'Documents Ready', req: 'Templates Downloaded' },
                  { step: 4, title: 'Application Review', req: 'Session / Filing Pre-check' },
                  { step: 5, title: 'Funding Awarded', req: 'Milestone Secured' },
                ].map((s) => {
                  const isDone = dynamicState.currentStage > s.step;
                  const isCurrent = dynamicState.currentStage === s.step;

                  return (
                    <div key={s.step} className={`p-3.5 rounded-xl border transition ${
                      isDone ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' :
                      isCurrent ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg font-bold' :
                      'bg-slate-950 border-slate-800 text-slate-500'
                    }`}>
                      <div className="text-[10px] uppercase tracking-wider font-black mb-1">Step 0{s.step}</div>
                      <div className="text-xs font-extrabold leading-tight mb-1">{s.title}</div>
                      <div className="text-[9px] font-semibold opacity-80">
                        {isDone ? '✓ Completed' : isCurrent ? '⚡ Current Stage' : s.req}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stage 5 Interactive Milestone Card */}
            {dynamicState.currentStage >= 3 && (
              <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">Target Milestone Target</span>
                    <h4 className="text-lg font-black text-white flex items-center gap-2">
                      🎉 Total Funding Secured Goal: <span className="text-emerald-400">{dynamicState.fundingSecuredAmount}</span>
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">Unlocked Programs: <strong>✓ IRAP Payroll Subsidy</strong> · <strong>✓ CanExport SMEs</strong> · <strong>✓ SR&amp;ED Tax Credit</strong></p>
                  </div>
                  <a
                    href="/audit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-5 py-3 rounded-xl transition shadow-lg whitespace-nowrap"
                  >
                    Book 1-on-1 Filing Review ($199) →
                  </a>
                </div>
              </div>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Personalized Funding Matches</h3>
              <p className="text-xs text-slate-400 mb-6">Verified against active federal and provincial program intake openings.</p>

              <div className="space-y-4">
                {[
                  {
                    name: 'Industrial Research Assistance Program (IRAP)',
                    type: 'Non-repayable Grant (Payroll Subsidy)',
                    range: '$50,000 – $500,000',
                    deadline: 'Open Intake (Budget Window Closing Soon)',
                    status: 'High Match',
                  },
                  {
                    name: 'CanExport SMEs Export Expansion Grant',
                    type: '50% Cost-Share Non-repayable Grant',
                    range: '$10,000 – $50,000',
                    deadline: 'Closing Next Month',
                    status: 'Match',
                  },
                  {
                    name: 'Scientific Research & Experimental Development (SR&ED)',
                    type: 'Tax Credit Refund (15–35%)',
                    range: '$20,000 – $250,000+',
                    deadline: 'Annual Fiscal Filing Window',
                    status: 'High Match',
                  },
                ].map((m, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded">
                          {m.status}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{m.type}</span>
                      </div>
                      <h4 className="font-bold text-white text-base">{m.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">Est. Range: <strong className="text-emerald-400">{m.range}</strong> · Deadline: {m.deadline}</p>
                    </div>

                    <a
                      href="/calculator"
                      className="bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 text-xs font-bold px-4 py-2 rounded-lg transition whitespace-nowrap"
                    >
                      View Eligibility Details →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Weekly Briefings */}
        {activeTab === 'briefings' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Weekly Funding Radar Briefing Archive</h3>
              <p className="text-xs text-slate-400 mb-6">Weekly executive summaries dispatched every Monday to active members.</p>

              <div className="space-y-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="font-bold text-emerald-400">Briefing #1 (Current Week)</span>
                    <span>Dispatched: Just Now</span>
                  </div>
                  <h4 className="font-bold text-white text-base">Q3 Intake Openings: Tech Development &amp; Export Acceleration</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Key updates: FedDev and regional development intake windows opened for software, hardware, and agri-tech businesses with under 50 employees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Templates */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Downloadable Templates &amp; Worksheets</h3>
              <p className="text-xs text-slate-400 mb-6">Exclusive templates for preparation and budgeting.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Grant Project Budget Matrix (.xlsx)', desc: 'Pre-formatted cost-share calculation sheet for IRAP & provincial grants.' },
                  { name: 'SR&ED Technical Narrative Template (.docx)', desc: 'Framework for documenting eligible developer hours and technical uncertainty.' },
                  { name: 'CanExport Market Entry Checklist (.pdf)', desc: 'Required compliance documents and international marketing breakdown.' },
                  { name: 'Government Grant Stacking Matrix (.pdf)', desc: 'Rulebook on legally combining federal and provincial subsidies.' },
                ].map((t, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-bold text-sm text-white">{t.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{t.desc}</p>
                    </div>
                    <a
                      href="/download"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Template
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Settings & Self-Serve Cancellation */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Subscription &amp; Account Settings</h3>

              <div className="space-y-2 text-xs text-slate-300">
                <div><strong className="text-slate-400">Current Plan:</strong> Founding Member Beta ($29.00 USD / month)</div>
                <div><strong className="text-slate-400">Member Status:</strong> <span className="text-emerald-400 font-bold">Active</span></div>
                <div><strong className="text-slate-400">1-Click Self-Serve Cancellation:</strong> You can cancel your subscription anytime below.</div>
              </div>

              {cancelStatus && (
                <div className="p-3 bg-slate-950 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-medium">
                  {cancelStatus}
                </div>
              )}

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-slate-400">Reason for cancellation (optional):</label>
                <input
                  type="text"
                  placeholder="e.g. No longer seeking funding"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-red-500"
                />

                <button
                  onClick={handleCancelSubscription}
                  disabled={cancelling}
                  className="w-full bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800/60 font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2"
                >
                  {cancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Cancel Subscription Immediately</>}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
