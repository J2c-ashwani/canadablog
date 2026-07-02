"use client"

import { SampleReportPreview } from "@/components/products/SampleReportPreview"
import {
  CheckCircle, ArrowRight, Star, Shield, Zap, Clock,
  BarChart3, FileText, TrendingUp, DollarSign, Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FundingMatchReportLanding() {
  return (
    <main className="min-h-screen bg-white">
      {/* ═══════ Hero ═══════ */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-sm font-medium rounded-full px-4 py-1.5 mb-6">
              <DollarSign className="w-4 h-4" />
              Over 4,000 Programs in Our Database
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">
              See Which Funding Programs{' '}
              <span className="text-emerald-400">Your Business May Qualify For</span>
            </h1>

            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Your personalized Funding Match Report identifies specific government grants, tax credits, and loans
              matched to your industry, location, and business stage — with estimated amounts, application difficulty,
              and recommended next steps.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/calculator">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg h-14 px-8 shadow-lg shadow-emerald-500/30">
                  <FileText className="w-5 h-5 mr-2" />
                  Get Your Report — $19
                </Button>
              </Link>
              <p className="text-sm text-slate-400">Takes about 60 seconds</p>
            </div>

            {/* Trust Row */}
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-emerald-400" /> Instant Delivery</span>
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-400" /> One-Time Purchase</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-400" /> No Subscription</span>
            </div>
            {/* Upgrade Credit Guarantee */}
            <div className="mt-6 inline-flex items-center gap-2 bg-emerald-900/30 border border-emerald-600/30 text-emerald-300 text-xs font-medium rounded-full px-5 py-2">
              <span className="text-base">↑</span>
              <span><strong>Upgrade with confidence.</strong> Every dollar spent is credited toward higher-tier products. You&apos;ll never pay twice.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ What's Included ═══════ */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">What&apos;s In Your Report</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Everything you need to understand your funding landscape — personalized to your exact business profile.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BarChart3,
                title: 'Matched Programs',
                desc: 'Specific grants, tax credits, and loans matched to your industry, region, and business stage.',
                color: 'emerald',
              },
              {
                icon: DollarSign,
                title: 'Estimated Funding Ranges',
                desc: 'Dollar-value estimates scaled to your revenue tier so you know what to expect.',
                color: 'blue',
              },
              {
                icon: Star,
                title: 'Priority Ranking',
                desc: 'Programs ranked by match strength — Strong Match, Good Match, or Potential Match.',
                color: 'amber',
              },
              {
                icon: FileText,
                title: 'Application Requirements',
                desc: 'Eligibility criteria, required documents, and step-by-step application instructions.',
                color: 'indigo',
              },
              {
                icon: TrendingUp,
                title: 'Readiness Score',
                desc: 'A 0-100 score showing how ready your business is to apply for matched programs.',
                color: 'violet',
              },
              {
                icon: CheckCircle,
                title: 'Recommended Next Steps',
                desc: 'Clear, actionable steps for each program so you know exactly what to do next.',
                color: 'teal',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                  item.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                  item.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  item.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                  item.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
                  item.color === 'violet' ? 'bg-violet-100 text-violet-600' :
                  'bg-teal-100 text-teal-600'
                }`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1.5">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Sample Preview ═══════ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Preview Your Report</h2>
            <p className="text-slate-500">Here&apos;s what a real Funding Match Report looks like:</p>
          </div>

          <SampleReportPreview />

          <div className="text-center mt-8">
            <Link href="/calculator">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white h-13 px-8 shadow-lg shadow-emerald-200">
                <FileText className="w-5 h-5 mr-2" />
                Get Your Personalized Report — $19
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ How It Works ═══════ */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">How It Works</h2>
          </div>

          <div className="grid sm:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Answer 4 Questions', desc: 'Location, industry, revenue, and funding goal.', icon: FileText },
              { step: '2', title: 'We Match Programs', desc: 'Instant analysis against 4,000+ active programs.', icon: BarChart3 },
              { step: '3', title: 'Pay $19', desc: 'One-time, no subscription. Secure PayPal checkout.', icon: DollarSign },
              { step: '4', title: 'Get Your Report', desc: 'Delivered instantly. Access anytime via your link.', icon: CheckCircle },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Social Proof / Stats ═══════ */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-emerald-600">4,000+</p>
              <p className="text-sm text-slate-500 mt-1">Active Programs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-600">$19</p>
              <p className="text-sm text-slate-500 mt-1">One-Time Price</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-600">60s</p>
              <p className="text-sm text-slate-500 mt-1">Time to Complete</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-600">Instant</p>
              <p className="text-sm text-slate-500 mt-1">Report Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>

          <div className="space-y-5">
            {[
              {
                q: 'What exactly do I get for $19?',
                a: 'A personalized report listing the specific government grants, tax credits, and loans your business may qualify for — with estimated funding ranges, application requirements, match strength ratings, and recommended next steps.',
              },
              {
                q: 'Is this a subscription?',
                a: 'No. It is a one-time purchase. You pay $19 once and get permanent access to your report via a secure link.',
              },
              {
                q: 'How is this different from free government program listings?',
                a: 'Free listings show every program to everyone. Your report matches programs specifically to your industry, region, revenue tier, and funding goal — and tells you which ones are strongest matches with estimated amounts scaled to your business.',
              },
              {
                q: 'Can I get help applying for programs in my report?',
                a: 'Yes. After your report, you can book a $199 Funding Eligibility Audit where our advisors help you prepare applications and maximize your eligibility. Your $19 report purchase is credited toward the audit.',
              },
              {
                q: 'How fast is delivery?',
                a: 'Instant. Your report is generated and displayed immediately after payment. You also receive an email with a permanent access link.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-800 mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Bottom CTA ═══════ */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Find Out What You May Qualify For
          </h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
            Answer 4 quick questions. Get your personalized Funding Match Report. Delivered instantly for $19.
          </p>
          <Link href="/calculator">
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-slate-100 text-lg h-14 px-10 shadow-xl font-semibold">
              Start Your Free Assessment <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-emerald-200">
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> Instant Delivery</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> One-Time Purchase</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> No Subscription</span>
          </div>
        </div>
      </section>
    </main>
  );
}
