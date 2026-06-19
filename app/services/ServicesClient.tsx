'use client';

import React, { useState } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from 'next/link';
import { 
  FileText, 
  Layers, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  ShieldCheck, 
  DollarSign, 
  PenTool, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  Briefcase
} from 'lucide-react';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Funding Audit & Strategy',
    description: 'We run a deep eligibility assessment across 800+ programs. You receive a structured Priority Report matching your roadmap to active funding streams.',
    cost: '$199 (Credited 100% toward filing)'
  },
  {
    step: '02',
    title: 'Program Selection',
    description: 'We align on the top-priority programs with the highest probability of approval and maximum financial impact (e.g., stacking IRAP + SR&ED).',
    cost: 'Included in engagement'
  },
  {
    step: '03',
    title: 'Application Strategy',
    description: 'We map out submission deadlines, cash-match requirements, document checklists, and project milestones to ensure full eligibility compliance.',
    cost: 'Included in engagement'
  },
  {
    step: '04',
    title: 'Application Writing',
    description: 'Our technical writers draft your proposals, project plans, and financial schedules. We translate your technology into language funding portals expect.',
    cost: 'Core service fee'
  },
  {
    step: '05',
    title: 'Submission Management',
    description: 'We handle the administrative work, coordinate portal uploads, review supporting evidence, and submit the final packages directly to the administering agency.',
    cost: 'Core service fee'
  },
  {
    step: '06',
    title: 'Post-Submission Support',
    description: 'We assist with reviewer inquiries, CRA/departmental audits, progress reporting, and milestone claims to guarantee smooth disbursement.',
    cost: 'Included in success fee'
  }
];

const DELIVERABLES = [
  { feature: 'Custom Funding Report', selfServe: '✅ Included', fullService: '✅ Included' },
  { feature: 'Month-by-Month Stacking Playbook', selfServe: '✅ Included', fullService: '✅ Included' },
  { feature: 'Dedicated Technical Writer', selfServe: '❌ No', fullService: '✅ Yes (Advisory & Writing)' },
  { feature: 'Technical Proposal Drafting', selfServe: '❌ No', fullService: '✅ Complete Drafts & Revisions' },
  { feature: 'Portal Upload & Submission', selfServe: '❌ No', fullService: '✅ End-to-End Coordination' },
  { feature: 'Audit Defence & Inquiry Support', selfServe: '❌ No', fullService: '✅ Yes (CRA/NRC Liaison)' },
  { feature: 'Initial Pricing', selfServe: '$19 – $79 one-off', fullService: '$199 Audit → $2.5K+ Engagement' }
];

const FAQS = [
  {
    q: 'Do you guarantee funding approval?',
    a: 'No. Funding agencies (such as the NRC for IRAP or the CRA for SR&ED) retain absolute, final authority. Any service that guarantees approval is misrepresenting the process. However, our methodology focuses on checking every eligibility constraint beforehand, which historically yields high success rates.'
  },
  {
    q: 'What if our application is not approved?',
    a: 'If a program application is rejected due to a drafting error on our part, we will work with you to revise and resubmit the application during the next intake window at zero additional cost. For programs with success fees, you only pay the performance fee if funding is successfully disbursed.'
  },
  {
    q: 'How is the success fee calculated and when is it paid?',
    a: 'For major programs exceeding $100,000 in funding (such as large-scale R&D grants or substantial SR&ED claims), we charge a success fee of 5% to 10% of the approved amount. This fee is only invoiced after you receive the official approval notice or cash refund from the government agency.'
  },
  {
    q: 'What documents do we need to provide?',
    a: 'Typically, we require your corporate registration documents, past 2 years of financial statements, active payroll records (for wage subsidies), and technical project briefs or developer commit logs (for R&D programs like SR&ED).'
  },
  {
    q: 'Can we stack SR&ED and IRAP at the same time?',
    a: 'Yes. Stacking is one of the most lucrative cash flow levers for Canadian technology companies. However, you must carefully track and deduct any IRAP wage subsidies received from your SR&ED eligible labor costs to prevent double-dipping. We handle this calculations and documentation directly.'
  },
  {
    q: 'What is the typical timeline for an engagement?',
    a: 'A standard grant filing takes 6 to 10 weeks from the initial audit to submission. Retroactive tax claims (like SR&ED) are prepared alongside your fiscal year-end and are typically processed by the CRA within 60 days of filing.'
  },
  {
    q: 'Is the $199 audit deposit fully credited?',
    a: 'Yes. When you purchase a $199 Funding Audit and later engage us for a full application writing service ($2,500+), the $199 you already paid is deducted from your first engagement invoice.'
  },
  {
    q: 'Do you work with non-technical businesses?',
    a: 'Absolutely. While we write many software and biotech proposals, we also write applications for manufacturing upgrades, agricultural export grants, local hiring incentives, and clean technology pilots.'
  }
];

export default function ServicesClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50/50">
        
        {/* Premium Dark Hero Section */}
        <section className="bg-slate-950 text-white py-20 sm:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.18),rgba(255,255,255,0))]" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center space-y-6">
            <span className="inline-flex px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
              Filing & Writing Services
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl max-w-4xl mx-auto leading-tight">
              We Find The Grants.<br /> We Write The Applications.
            </h1>
            <p className="text-lg sm:text-xl text-slate-350 max-w-2xl mx-auto leading-relaxed">
              End-to-end public funding acquisition for high-growth businesses spending $200K–$5M/yr in payroll, physical R&D, or capital upgrades.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/audit">
                <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer shadow-lg shadow-emerald-950/30">
                  Book Funding Audit — $199 <ArrowRight className="w-4.5 h-4.5" />
                </span>
              </Link>
              <Link href="/customer-success">
                <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors cursor-pointer">
                  See Case Outcomes
                </span>
              </Link>
            </div>
            <p className="text-xs text-slate-500">
              *Your $199 audit fee is credited 100% toward any filing engagement.
            </p>
          </div>
        </section>

        {/* Value Prop Columns */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-20">
            
            {/* Core Capability Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border border-slate-250/60 rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">End-to-End Handling</h3>
                <p className="text-sm text-slate-550 leading-relaxed">
                  We don&apos;t just send you links. We handle technical proposal drafting, portal configurations, supporting budget templates, and submission checks.
                </p>
              </div>

              <div className="bg-white border border-slate-250/60 rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Maximized Stacking</h3>
                <p className="text-sm text-slate-550 leading-relaxed">
                  We structure your expenses so you can stack federal tax credits with provincial hiring grants, maximizing your non-dilutive return per employee.
                </p>
              </div>

              <div className="bg-white border border-slate-250/60 rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Audit-Ready Filings</h3>
                <p className="text-sm text-slate-550 leading-relaxed">
                  We verify all time-tracking, activity logs, and technical claims against historical CRA/agency audit guidelines to minimize review friction.
                </p>
              </div>
            </div>

            {/* The 6-Step Timeline */}
            <div className="space-y-12">
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-extrabold text-slate-950">Our 6-Step Engagement Process</h2>
                <p className="text-slate-600 max-w-xl mx-auto">From diagnostic audit to final agency disbursement—we write and coordinate every detail.</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {PROCESS_STEPS.map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 relative space-y-4 hover:border-slate-300 transition-colors">
                    <span className="absolute top-4 right-6 text-3xl font-black text-slate-100 font-mono tracking-tighter select-none">
                      {item.step}
                    </span>
                    <h3 className="font-bold text-slate-950 pr-8">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">{item.description}</p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold">
                      <span className="text-slate-400">Step Pricing:</span>
                      <span className="text-emerald-700 font-bold">{item.cost}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Deliverables Table */}
            <div className="space-y-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Self-Serve Reports vs. Full Filing Service</h2>
                <p className="text-sm text-slate-500">Pick the level of advisory support your team requires.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead>
                    <tr className="text-slate-700 font-semibold text-left">
                      <th className="px-4 py-3">Service Deliverable</th>
                      <th className="px-4 py-3 text-center">Self-Serve Reports</th>
                      <th className="px-4 py-3 text-center">Full Filing Service</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 text-slate-650">
                    {DELIVERABLES.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-900">{item.feature}</td>
                        <td className="px-4 py-3 text-center font-mono text-xs">{item.selfServe}</td>
                        <td className="px-4 py-3 text-center font-mono text-xs font-semibold text-slate-950">{item.fullService}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_0%,rgba(16,185,129,0.12),rgba(255,255,255,0))]" />
              <div className="relative z-10 space-y-6">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                  PRICING STRUCTURE
                </span>
                <h2 className="text-3xl font-extrabold">Transparent, Alignment-Driven Pricing</h2>
                <p className="text-slate-350 leading-relaxed text-sm sm:text-base">
                  We don&apos;t lock you into expensive multi-month retainers. We credit your audit deposit 100% and align our incentives with your success using performance-based success fees for major projects.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> No Retainers</span>
                  <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Credit Back Deposit</span>
                  <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Audit Protection</span>
                </div>
              </div>

              <div className="relative z-10 space-y-4">
                <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">01. Diagnostic Audit</span>
                    <span className="text-emerald-400 font-mono font-bold">$199</span>
                  </div>
                  <p className="text-xs text-slate-300">Detailed program eligibility matrix and priority timeline. Paid upfront, fully credited toward full filings.</p>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">02. Application Writing</span>
                    <span className="text-emerald-400 font-mono font-bold">$2,500 – $7,500</span>
                  </div>
                  <p className="text-xs text-slate-300">Core proposal engineering, document checklists, and submission management. Price scales based on program complexity.</p>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">03. Success Fee</span>
                    <span className="text-emerald-400 font-mono font-bold">5% – 10%</span>
                  </div>
                  <p className="text-xs text-slate-300">Performance-based fee for approved funding programs exceeding $100K (e.g. large-scale grants or SR&ED claims).</p>
                </div>
              </div>
            </div>

            {/* Accordion FAQ */}
            <div className="space-y-8 max-w-3xl mx-auto">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
                <p className="text-slate-550 text-sm">Everything you need to know about our filing process, success rates, and engagement options.</p>
              </div>

              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-colors">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-slate-50/50"
                    >
                      <span className="font-bold text-slate-900 text-sm sm:text-base">{faq.q}</span>
                      {openFaq === idx ? (
                        <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                      )}
                    </button>
                    {openFaq === idx && (
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Call to action */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 sm:p-12 text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-3xl font-extrabold text-slate-950">Start With A Funding Audit</h2>
              <p className="text-sm sm:text-base text-slate-650 max-w-xl mx-auto leading-relaxed">
                Before entering a filing engagement, we verify every constraint during a diagnostic audit. If the audit shows zero matching programs, you receive a full refund.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Link href="/audit">
                  <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer shadow-md">
                    Start Funding Audit ($199) <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors cursor-pointer">
                    Ask a Question
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
