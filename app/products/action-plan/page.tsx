import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Check, Sparkles, HelpCircle, ArrowRight, Shield, Calendar, AlertTriangle, ListChecks, Clock, Users } from 'lucide-react';
import { StandaloneCheckout } from '@/components/products/StandaloneCheckout';
import { ProductHierarchyMap } from '@/components/products/ProductHierarchyMap';

export const metadata: Metadata = {
  title: 'Funding Action Plan — Step-by-Step Grant Roadmaps',
  description: 'Map out your prioritized 4-month government grant application timeline, avoid filing risks, and download compliance check sheets for $49.',
};

export default function ActionPlanPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-indigo-500 selection:text-white">
      <Header />
      
      {/* Hero / Sales Section */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pb-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.12),transparent_50%)]"></div>
        <div className="max-w-6xl mx-auto px-4 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Pitch */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> outcome-based roadmap
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-slate-100">
              Know Exactly What To Apply For Next — and In What Order.
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl font-medium">
              Secure your prioritized 4-month government grant application timeline, avoid double-dipping clawbacks, and download full compliance pre-flight checks.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 border-y border-slate-800 py-4 max-w-lg">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400 shrink-0" />
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-tight">
                  Edited By<br/>
                  <span className="text-slate-205 text-[11px] font-black lowercase">ashwani k</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-tight">
                  Delivery Time<br/>
                  <span className="text-slate-205 text-[11px] font-black">instant download (&lt;60s)</span>
                </div>
              </div>
            </div>
            {/* Upgrade Credit Guarantee */}
            <div className="flex items-center gap-3 bg-emerald-900/20 border border-emerald-700/30 rounded-xl px-4 py-3 max-w-lg">
              <span className="text-emerald-400 text-xl shrink-0">↑</span>
              <p className="text-[11px] text-emerald-200/80 leading-snug font-medium">
                <span className="font-extrabold text-emerald-300">Upgrade with confidence.</span> Every dollar you spend today is credited toward higher-tier products. <span className="font-extrabold text-emerald-300">You&apos;ll never pay twice.</span>
              </p>
            </div>

            {/* Checklist of what's inside */}
            <div className="space-y-3 pt-2">
              {[
                { title: 'Prioritized Month 1-4 Roadmap', desc: 'Schedules applications based on deadline proximity, approval speeds, and funding tiers.' },
                { title: 'Anti-Double-Dipping Stacking Rules', desc: 'Identifies which provincial grants can stack with federal IRAP co-funding, and which will cancel each other out.' },
                { title: 'Compliance Document List', desc: 'A checklist of exact tax reports, incorporation papers, and bank statements required for each program.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-5 h-5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-200">{item.title}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-450 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Card */}
          <div className="lg:col-span-5">
            <StandaloneCheckout
              productId="funding-roadmap"
              price={49}
              productName="Funding Action Plan"
            />
          </div>

        </div>
      </section>

      {/* Grid Features */}
      <section className="py-16 sm:py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100">Step-by-Step Strategic Framework</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every Action Plan ensures you target matching government programs in the exact order required to ensure high approval rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Calendar,
                title: 'Application Scheduling',
                desc: 'Map out your workload. Learn which programs require 3 weeks of prep and which can be submitted in 2 hours.'
              },
              {
                icon: AlertTriangle,
                title: 'Stacking Risk Auditing',
                desc: 'Prevent funding clawbacks. Understand regional stacking limits (e.g. FedDev and municipal grants) and compliance steps.'
              },
              {
                icon: ListChecks,
                title: 'Filing Preflight Lists',
                desc: 'Ensure no missing elements. Verify your financial statements, corporate summaries, and payroll filings match program guidelines.'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors text-left space-y-3">
                  <div className="p-2 w-fit rounded-lg bg-slate-800 border border-slate-700 text-indigo-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-200">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ascension Ladder */}
      <section className="py-16 sm:py-20 bg-slate-900 border-t border-slate-800">
        <ProductHierarchyMap currentTier="roadmap" />
      </section>

      {/* Guarantee Section */}
      <section className="py-16 sm:py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-455 rounded-full">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-100">30-Day Refund &amp; Satisfaction Guarantee</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
            At FSI Digital, we build roadmaps to help you succeed. If you find the Action Plan doesn't provide clear next-step execution clarity to help your applications, email us at <a href="mailto:hello@fsidigital.ca" className="text-indigo-450 hover:underline">hello@fsidigital.ca</a> within 30 days of purchase for a 100% refund.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-4 space-y-8">
          <h2 className="text-2xl font-black text-slate-100 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 text-left">
            {[
              {
                q: 'What is the benefit of the Action Plan over the Match Report?',
                a: 'The Match Report tells you *what* programs you qualify for. The Action Plan tells you *how* and *when* to apply, mapping out your next 4 months of applications, preventing double-dipping, and outlining compliance checklist guidelines.',
              },
              {
                q: 'Can I link this to my calculator results later?',
                a: 'Yes. If you purchase the Action Plan standalone now, you can run the free calculator at any time from your dashboard to dynamically populate the timeline with your custom company data.',
              },
              {
                q: 'Is there support if I get stuck?',
                a: 'Yes. Every purchase includes priority email support. You can reach out to hello@fsidigital.ca and our grant analysts will clarify timeline stacking rules or document requirements.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-5">
                <h3 className="font-bold text-xs sm:text-sm text-slate-200 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" /> {faq.q}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
