'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  CheckCircle,
  ArrowRight,
  FileText,
  Zap,
  Star,
  Lock,
  ChevronRight,
} from 'lucide-react';

/* ─── Blur bar helper ──────────────────────────────────────────────────────── */
function BlurBar({ w = 'w-full', h = 'h-3' }: { w?: string; h?: string }) {
  return (
    <div
      className={`${w} ${h} bg-slate-200 rounded select-none`}
      style={{ filter: 'blur(4px)' }}
    />
  );
}

/* ─── Lock overlay badge ───────────────────────────────────────────────────── */
function LockedRow({ label = 'Upgrade to unlock' }: { label?: string }) {
  return (
    <div className="relative flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 overflow-hidden">
      <div className="absolute inset-0" style={{ backdropFilter: 'blur(3px)', background: 'rgba(248,250,252,0.85)' }} />
      <Lock className="relative z-10 h-3.5 w-3.5 text-slate-400 shrink-0" />
      <span className="relative z-10 text-xs font-semibold text-slate-400 italic">{label}</span>
    </div>
  );
}

/* ─── $19 Report Mock ──────────────────────────────────────────────────────── */
function ReportMock19() {
  const programs = [
    { name: 'SR&ED Tax Credit', badge: 'EXCELLENT MATCH', badgeColor: 'bg-emerald-100 text-emerald-700', funding: '$150K–$500K', deadline: 'Rolling Intake', locked: false },
    { name: 'IRAP (NRC)', badge: 'STRONG MATCH', badgeColor: 'bg-blue-100 text-blue-700', funding: '$50K–$250K', deadline: 'Q3 2026', locked: false },
    { name: '████████████████', badge: '', badgeColor: '', funding: '', deadline: '', locked: true },
  ];

  return (
    <div className="font-mono text-xs rounded-xl border-2 border-slate-200 bg-white overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-900 text-white px-5 py-3">
        <div>
          <div className="font-bold text-sm tracking-wide">FSI Digital</div>
          <div className="text-slate-400 text-[10px]">FUNDING MATCH REPORT</div>
        </div>
        <div className="text-right">
          <div className="text-slate-300 text-[11px]">June 2026</div>
          <div className="text-slate-400 text-[10px]">Ontario · SaaS</div>
        </div>
      </div>

      {/* Match Score */}
      <div className="flex items-center gap-4 bg-indigo-50 border-b border-indigo-100 px-5 py-3">
        <div>
          <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">Match Score</div>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full" style={{ width: '78%' }} />
            </div>
            <span className="text-indigo-700 font-black text-base">78%</span>
          </div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-slate-500 text-[10px]">Programs Found</div>
          <div className="text-slate-900 font-black text-2xl leading-none">3</div>
        </div>
      </div>

      {/* Programs */}
      <div className="divide-y divide-slate-100">
        {programs.map((p, i) =>
          p.locked ? (
            <div key={i} className="px-5 py-4 relative">
              <div className="absolute inset-0 bg-slate-50/90 flex items-center justify-center z-10" style={{ backdropFilter: 'blur(4px)' }}>
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow text-[11px] font-semibold text-slate-500">
                  <Lock className="h-3 w-3" /> Upgrade to $49 to unlock Program 3
                </div>
              </div>
              <div className="flex justify-between mb-2 opacity-30">
                <BlurBar w="w-40" h="h-3.5" />
                <BlurBar w="w-20" h="h-3.5" />
              </div>
              <div className="flex gap-4 opacity-30">
                <BlurBar w="w-24" h="h-2.5" />
                <BlurBar w="w-24" h="h-2.5" />
              </div>
              <div className="mt-2 opacity-30">
                <BlurBar w="w-full" h="h-2.5" />
              </div>
            </div>
          ) : (
            <div key={i} className="px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-slate-800 text-sm">{p.name}</div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.badgeColor}`}>{p.badge}</span>
              </div>
              <div className="flex gap-6 text-[11px] text-slate-500 mb-2">
                <span><span className="font-semibold text-slate-700">Funding:</span> {p.funding}</span>
                <span><span className="font-semibold text-slate-700">Deadline:</span> {p.deadline}</span>
              </div>
              <div className="space-y-1 mt-1">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Eligibility Overview</div>
                <BlurBar w="w-full" h="h-2" />
                <BlurBar w="w-4/5" h="h-2" />
              </div>
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <div className="bg-slate-50 border-t border-slate-200 px-5 py-2.5 flex items-center justify-between">
        <span className="text-[10px] text-slate-400">FSI Digital · Confidential</span>
        <span className="text-[10px] text-slate-400">PDF delivered to inbox</span>
      </div>
    </div>
  );
}

/* ─── $49 Action Plan Mock ─────────────────────────────────────────────────── */
function ReportMock49() {
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const highlighted = [2, 5]; // Mar, Jun

  return (
    <div className="font-mono text-xs rounded-xl border-2 border-slate-200 bg-white overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between bg-indigo-900 text-white px-5 py-3">
        <div>
          <div className="font-bold text-sm tracking-wide">FSI Digital</div>
          <div className="text-indigo-300 text-[10px]">FUNDING ACTION PLAN</div>
        </div>
        <div className="text-right">
          <div className="text-indigo-200 text-[11px]">June 2026</div>
          <div className="text-indigo-400 text-[10px]">Ontario · SaaS</div>
        </div>
      </div>

      {/* Priority Table */}
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Priority Ranking Table</div>
        <div className="grid grid-cols-3 gap-1 text-[10px] font-bold text-slate-500 border-b border-slate-100 pb-1 mb-1">
          <span>Program</span><span>Priority Score</span><span>Action Month</span>
        </div>
        <div className="grid grid-cols-3 gap-1 text-[11px] py-1.5 border-b border-slate-50">
          <span className="font-semibold text-slate-800">SR&amp;ED</span>
          <span className="text-indigo-700 font-bold">94 / 100</span>
          <span className="text-emerald-700 font-semibold">Q1 2026</span>
        </div>
        <div className="grid grid-cols-3 gap-1 text-[11px] py-1.5 border-b border-slate-50">
          <span className="font-semibold text-slate-800">IRAP</span>
          <span className="text-indigo-700 font-bold">81 / 100</span>
          <span className="text-emerald-700 font-semibold">Q2 2026</span>
        </div>
        <div className="relative py-1.5">
          <div className="grid grid-cols-3 gap-1 text-[11px] opacity-20">
            <BlurBar w="w-20" h="h-3" />
            <BlurBar w="w-16" h="h-3" />
            <BlurBar w="w-16" h="h-3" />
          </div>
          <div className="absolute inset-0 flex items-center justify-start pl-1" style={{ backdropFilter: 'blur(3px)' }}>
            <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1.5 italic">
              <Lock className="h-3 w-3" /> Upgrade to $79 to unlock
            </span>
          </div>
        </div>
      </div>

      {/* Funding Calendar */}
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Funding Calendar</div>
        <div className="flex gap-1">
          {MONTHS.map((m, i) => {
            const isHighlighted = highlighted.includes(i);
            const isBlurred = i > 7;
            return (
              <div
                key={m}
                className={`flex-1 text-center rounded py-1.5 text-[9px] font-bold transition-all ${
                  isHighlighted
                    ? 'bg-indigo-600 text-white'
                    : isBlurred
                    ? 'bg-slate-100 text-slate-200'
                    : 'bg-slate-100 text-slate-400'
                }`}
                style={isBlurred ? { filter: 'blur(2px)' } : undefined}
              >
                {m}
              </div>
            );
          })}
        </div>
        <div className="flex gap-3 mt-1.5 text-[9px] text-slate-400">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-indigo-600 inline-block" /> Application window</span>
        </div>
      </div>

      {/* Checklist */}
      <div className="px-5 py-4">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Document Checklist — SR&amp;ED</div>
        {['T661 Technical Narrative', 'T2SCH31 Form (Corporate)', 'Project Time Logs (12 months)'].map((item) => (
          <div key={item} className="flex items-center gap-2 py-1">
            <CheckCircle className="h-3 w-3 text-emerald-500 shrink-0" />
            <span className="text-[11px] text-slate-700">{item}</span>
          </div>
        ))}
        <div className="relative mt-1">
          <div className="opacity-10">
            {['Item 4', 'Item 5', 'Item 6'].map((x) => (
              <div key={x} className="flex items-center gap-2 py-1">
                <BlurBar w="w-3" h="h-3" />
                <BlurBar w="w-full" h="h-2.5" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center" style={{ backdropFilter: 'blur(3px)' }}>
            <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1.5 italic">
              <Lock className="h-3 w-3" /> 4 more items hidden
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── $79 Complete Bundle Mock ─────────────────────────────────────────────── */
function ReportMock79() {
  return (
    <div className="font-mono text-xs rounded-xl border-2 border-slate-200 bg-white overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-slate-900 to-indigo-900 text-white px-5 py-3">
        <div>
          <div className="font-bold text-sm tracking-wide">FSI Digital</div>
          <div className="text-indigo-300 text-[10px]">COMPLETE FUNDING BUNDLE</div>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 rounded-full px-2.5 py-1">
          <Star className="h-3 w-3 text-amber-400" />
          <span className="text-amber-300 text-[10px] font-bold">COMPLETE</span>
        </div>
      </div>

      {/* Priority Table (first 2 visible) */}
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Priority Ranking</div>
        <div className="grid grid-cols-3 gap-1 text-[10px] font-bold text-slate-500 border-b border-slate-100 pb-1 mb-1">
          <span>Program</span><span>Score</span><span>Month</span>
        </div>
        <div className="grid grid-cols-3 gap-1 text-[11px] py-1 border-b border-slate-50">
          <span className="font-semibold text-slate-800">SR&amp;ED</span>
          <span className="text-indigo-700 font-bold">94</span>
          <span className="text-emerald-700 font-semibold">Q1</span>
        </div>
        <div className="grid grid-cols-3 gap-1 text-[11px] py-1">
          <span className="font-semibold text-slate-800">IRAP</span>
          <span className="text-indigo-700 font-bold">81</span>
          <span className="text-emerald-700 font-semibold">Q2</span>
        </div>
      </div>

      {/* Stacking Playbook */}
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Stacking Playbook</div>
        <div className="flex items-center gap-1">
          {[
            { name: 'SR&ED', amount: '$150K+', color: 'bg-indigo-600' },
            null,
            { name: 'IRAP', amount: '$50K+', color: 'bg-emerald-600' },
            null,
            { name: '████', amount: '$██K', color: 'bg-slate-300', locked: true },
          ].map((node, i) =>
            node === null ? (
              <div key={i} className="flex-shrink-0 flex items-center">
                <div className="w-4 h-px bg-slate-300" />
                <div className="w-0 h-0 border-t-[4px] border-b-[4px] border-l-[5px] border-transparent border-l-slate-300" />
              </div>
            ) : (
              <div
                key={i}
                className={`flex-1 ${node.color} rounded-lg px-2 py-2 text-center text-white relative overflow-hidden`}
                style={(node as any).locked ? { filter: 'blur(3px)' } : undefined}
              >
                <div className="text-[10px] font-black">{node.name}</div>
                <div className="text-[9px] opacity-80">{node.amount}</div>
              </div>
            )
          )}
        </div>
        <div className="mt-2 text-center text-[9px] text-slate-400">Combined potential: <span className="font-bold text-slate-600">$200K–$750K+</span></div>
      </div>

      {/* Application Toolkit */}
      <div className="px-5 py-4">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Application Toolkit</div>
        {['SR&ED T661 Narrative Template', 'IRAP Application Letter Template', 'Technical Uncertainty Brief (Example)'].map((tpl) => (
          <div key={tpl} className="flex items-center gap-2 py-1">
            <FileText className="h-3 w-3 text-indigo-400 shrink-0" />
            <span className="text-[11px] text-slate-700">{tpl}</span>
          </div>
        ))}
        <div className="relative mt-1">
          <div className="opacity-10 space-y-1">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-2 py-0.5">
                <BlurBar w="w-3" h="h-3" />
                <BlurBar w="w-full" h="h-2.5" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center" style={{ backdropFilter: 'blur(3px)' }}>
            <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1.5 italic">
              <Lock className="h-3 w-3" /> 6 more templates included
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Feature list ─────────────────────────────────────────────────────────── */
function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="space-y-2 mt-4">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
          <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
          {f}
        </li>
      ))}
    </ul>
  );
}

/* ─── Testimonials data ────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: 'We purchased the $49 Action Plan. The report identified 3 programs we hadn\'t considered. Worth the cost for the prioritization alone.',
    author: 'Ontario SaaS company, 12 employees',
    tier: 'Funding Action Plan',
  },
  {
    quote: 'The SR&ED section alone saved us from a claim we would have filed incorrectly. $19 was the best research investment we made this quarter.',
    author: 'BC technology startup, 6 employees',
    tier: 'Funding Match Report',
  },
  {
    quote: 'We matched to IRAP through the calculator. The Complete Bundle gave us the stacking strategy — we had no idea IRAP and SR&ED could be combined.',
    author: 'Alberta manufacturer, 34 employees',
    tier: 'Complete Bundle',
  },
];

/* ─── Main component ───────────────────────────────────────────────────────── */
export default function SampleReportClient() {
  return (
    <>
      <Header />

      <main className="min-h-screen text-slate-700 antialiased">

        {/* ── Hero ── */}
        <section className="relative bg-slate-950 pt-16 pb-16 px-5 sm:px-6 overflow-hidden">
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          {/* Glow blobs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5" />
              Sample Preview
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              See Exactly What You&apos;re Getting{' '}
              <span className="text-indigo-400">Before You Buy</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
              Preview the real structure and format of each report tier. Purchase with complete confidence.
            </p>

            {/* Anchor jump links */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { label: 'Match Report — $19', href: '#preview-19', color: 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200' },
                { label: 'Action Plan — $49', href: '#preview-49', color: 'bg-indigo-600/20 hover:bg-indigo-600/40 border-indigo-500/40 text-indigo-300' },
                { label: 'Complete Bundle — $79', href: '#preview-79', color: 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-300' },
              ].map(({ label, href, color }) => (
                <a
                  key={href}
                  href={href}
                  className={`inline-flex items-center gap-2 ${color} border px-5 py-2.5 rounded-full text-sm font-semibold transition-all`}
                >
                  <ChevronRight className="h-4 w-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Report Preview Sections ── */}
        <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50">

          {/* ── $19 ── */}
          <section id="preview-19" className="max-w-5xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
            {/* Section heading */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-black">1</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Funding Match Report</h2>
              </div>
              <span className="sm:ml-2 inline-flex items-center gap-1.5 bg-slate-900 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                $19
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Mock */}
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-4 h-px bg-slate-300 inline-block" /> Report Preview
                </div>
                <ReportMock19 />
              </div>

              {/* Features */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-lg mb-1">What&apos;s Inside</h3>
                  <p className="text-sm text-slate-500 mb-1">Your personalized Funding Match Report includes:</p>
                  <FeatureList features={[
                    'Programs matched to your province and industry',
                    'Match strength rating (Excellent / Strong / Moderate)',
                    'Funding range and deadline type per program',
                    'Eligibility overview per program',
                    'PDF delivered to your inbox instantly',
                  ]} />
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 text-white">
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    Instantly know which federal and provincial programs your business qualifies for — without spending hours on government websites.
                  </p>
                  <Link
                    href="/calculator"
                    id="cta-19-get-report"
                    className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    Get My $19 Report <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="max-w-5xl mx-auto px-5 sm:px-6">
            <div className="border-t border-slate-200" />
          </div>

          {/* ── $49 ── */}
          <section id="preview-49" className="max-w-5xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-black">2</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Funding Action Plan</h2>
              </div>
              <span className="sm:ml-2 inline-flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                $49
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Mock */}
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-4 h-px bg-slate-300 inline-block" /> Report Preview
                </div>
                <ReportMock49 />
              </div>

              {/* Features */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-lg mb-1">What&apos;s Inside</h3>
                  <p className="text-sm text-slate-500 mb-1">Everything in the Match Report, plus:</p>
                  <FeatureList features={[
                    'Everything in the Match Report',
                    'Priority program ranking by ROI and difficulty',
                    'Month-by-month application schedule',
                    'Document checklist per program',
                    'Risk warning flags (common rejection reasons)',
                  ]} />
                </div>

                <div className="bg-indigo-700 rounded-2xl p-6 text-white">
                  <p className="text-sm text-indigo-100 leading-relaxed mb-4">
                    Don&apos;t just know what programs exist — know exactly when to apply, in what order, and with which documents ready.
                  </p>
                  <Link
                    href="/calculator"
                    id="cta-49-get-report"
                    className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors"
                  >
                    Get My $49 Action Plan <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="max-w-5xl mx-auto px-5 sm:px-6">
            <div className="border-t border-slate-200" />
          </div>

          {/* ── $79 ── */}
          <section id="preview-79" className="max-w-5xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-white text-xs font-black">3</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Complete Funding Bundle</h2>
              </div>
              <span className="sm:ml-2 inline-flex items-center gap-1.5 bg-amber-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                $79
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
                ★ Most Popular
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Mock */}
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-4 h-px bg-slate-300 inline-block" /> Report Preview
                </div>
                <ReportMock79 />
              </div>

              {/* Features */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border-2 border-amber-200 p-6 shadow-sm shadow-amber-50">
                  <h3 className="font-bold text-slate-900 text-lg mb-1">What&apos;s Inside</h3>
                  <p className="text-sm text-slate-500 mb-1">Everything in the Action Plan, plus:</p>
                  <FeatureList features={[
                    'Everything in the Action Plan',
                    'Funding Stacking Playbook (which programs stack together)',
                    'Application Toolkit (templates and winning examples)',
                    'Funding Approval Library (real approved application excerpts)',
                    'Priority support access',
                  ]} />
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl p-6 text-white">
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    The complete intelligence package. Know which programs to stack, have the exact templates ready, and see what winning applications look like.
                  </p>
                  <Link
                    href="/calculator"
                    id="cta-79-get-bundle"
                    className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-amber-300 transition-colors"
                  >
                    Get My $79 Complete Bundle <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── Testimonials ── */}
        <section className="bg-slate-100 py-16 px-5 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">What Customers Say</div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Real results, real businesses</h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.author}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4"
                >
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">— {t.author}</p>
                    <p className="text-xs text-indigo-600 font-medium mt-0.5">{t.tier}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="bg-slate-950 py-16 sm:py-20 px-5 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready to see your actual results?
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed">
              Run the free eligibility assessment — takes 3 minutes. Your personalized report is generated instantly.
            </p>

            <Link
              href="/calculator"
              id="cta-bottom-assessment"
              className="inline-flex items-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-lg shadow-indigo-900/40 transition-all hover:scale-[1.02] active:scale-100"
            >
              Start Free Assessment <ArrowRight className="h-5 w-5" />
            </Link>

            <p className="mt-6 text-slate-500 text-sm">
              Questions?{' '}
              <a
                href="mailto:ashwani@fsidigital.ca"
                className="text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-2"
              >
                ashwani@fsidigital.ca
              </a>
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
