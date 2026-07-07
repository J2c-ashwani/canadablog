import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Check, Zap, Sparkles, HelpCircle, Users, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WaitlistForm } from '@/components/products/WaitlistForm';

export const metadata: Metadata = {
  title: 'FSI Digital Founding Membership — Custom Government Funding Monitoring',
  description: 'Secure active government funding alerts, application templates, and priority analyst support for your business for $29/mo.',
};

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-indigo-500 selection:text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pb-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.15),transparent_50%)]"></div>
        <div className="max-w-5xl mx-auto px-4 relative text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> Limited Founding Member Launch
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-slate-100 max-w-3xl mx-auto">
            Never Miss a Government Grant.<br/>
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Get Custom Stacking Monitoring.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Intake windows open and close in days. We monitor 1,200+ active programs against your B2B profile and alert you instantly before deadlines pass.
          </p>
          <div className="pt-4 max-w-md mx-auto">
            <WaitlistForm />
          </div>
          <div className="flex items-center justify-center gap-6 text-[11px] text-slate-500 pt-3 font-medium">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Cancel Anytime</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-emerald-500" /> Real-time Alerts</span>
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-emerald-500" /> Analyst Consultation Included</span>
          </div>
        </div>
      </section>

      {/* Benefits Stacking Grid */}
      <section className="py-16 sm:py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100">Everything Included in Your Membership</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              For less than the price of a single billable consulting hour, secure continuous access to active funding pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Real-Time Intake Alerts',
                desc: 'Get notified via SMS and email the hour a matching program opens. Never miss a window or hit a capping limit.',
                details: 'Covers FedDev, IRAP, SR&ED, CAP, and provincial credits.',
              },
              {
                title: 'Priority Analyst Support',
                desc: 'Have a quick question about an application requirement? Email our analyst team and receive a response within 12 hours.',
                details: 'Includes document pre-checks and stacking validations.',
              },
              {
                title: 'Unlimited Report Re-runs',
                desc: 'As your business hires staff, launches new R&D, or grows revenue, re-evaluate your matches with updated numbers.',
                details: 'Generate unlimited fresh report and action plan copies.',
              },
            ].map((b, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors space-y-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-extrabold text-sm text-slate-200">{b.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
                <div className="text-[10px] text-slate-500 font-semibold border-t border-slate-800 pt-2">{b.details}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-16 sm:py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100">Simple, Transparent Pricing</h2>
            <p className="text-xs sm:text-sm text-slate-400">Cancel or pause your monitoring from your dashboard in one click.</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-md mx-auto text-left relative overflow-hidden shadow-xl shadow-indigo-950/10">
            <div className="absolute top-0 right-0 bg-indigo-650 text-white text-[8px] font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg">
              Founding Tier
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-indigo-455">Custom Stacking Monitoring</h3>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-slate-100">$29</span>
                  <span className="text-xs text-slate-500">/ month</span>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4 font-semibold">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Real-time SMS &amp; email intake alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Priority analyst support (12hr response)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Unlimited Match Report re-runs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Full access to Grant Template Library ($29 value)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>10% discount on 1-on-1 Strategy Audits</span>
                </li>
              </ul>

              <div className="pt-4 text-center">
                <p className="text-xs text-slate-400 font-bold bg-slate-900 border border-slate-800 rounded-lg p-3">
                  Founding tier waitlist is active. Enter your email above to lock in founding rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-4 space-y-8">
          <h2 className="text-2xl font-black text-slate-100 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 text-left">
            {[
              {
                q: 'How does the monitoring alert system work?',
                a: 'Our analysts track updates from the Canadian government, regional agencies, and municipal chambers weekly. When a program opens that matches your region, industry, and size, our system parses your profile and alerts you instantly.',
              },
              {
                q: 'Can I cancel my membership at any time?',
                a: 'Yes. You can cancel or pause your subscription in one click from your dashboard, or by emailing hello@fsidigital.ca. There are no contract terms, setup fees, or cancellation penalties.',
              },
              {
                q: 'What is the priority analyst support?',
                a: 'As a member, you get direct access to our analyst desk. You can submit questions about program requirements, have us check draft project descriptions, or ask about double-dipping rules. We respond within 12 business hours.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
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
