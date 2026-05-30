'use client';

import { useState } from 'react'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { 
  CheckCircle, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  Award, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  ChevronRight,
  FileCheck2,
  Users
} from 'lucide-react'

export default function ConsultationClient() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#070716] text-[#c8cfe8] font-sans antialiased overflow-x-hidden selection:bg-blue-500 selection:text-white">
        
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        
        {/* Hero Section */}
        <div className="relative pt-24 pb-16 px-6 max-w-7xl mx-auto text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Limited Slots Available Next Week
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            Secure Up To <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Non-Dilutive Funding</span> For Your Business
          </h1>
          
          <p className="text-lg sm:text-xl text-[#8f9ac2] max-w-3xl mx-auto leading-relaxed">
            Stop guessing grant frameworks and tax guidelines. Get a bespoke, pre-researched <strong className="text-white font-semibold">B2B Funding Roadmap</strong> and a private 30-minute deep dive strategy session.
          </p>
        </div>

        {/* Value Proposition Grid */}
        <div className="max-w-6xl mx-auto px-6 mb-24 grid md:grid-cols-3 gap-8 relative">
          
          {/* Item 1 */}
          <div className="relative group bg-[#0d0e2c]/50 rounded-2xl p-8 border border-blue-950 hover:border-blue-800/50 transition-all duration-300 backdrop-blur-sm shadow-xl">
            <div className="w-12 h-12 bg-blue-950 rounded-xl flex items-center justify-center border border-blue-900/50 mb-6 group-hover:scale-105 transition-transform">
              <Award className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">2 Hours Pre-Call Research</h3>
            <p className="text-[#8f9ac2] text-sm leading-relaxed">
              We don't take blind calls. Our analysts spend 2 hours researching your industry, region, and entity structure before we dial in.
            </p>
          </div>

          {/* Item 2 */}
          <div className="relative group bg-[#0d0e2c]/50 rounded-2xl p-8 border border-blue-950 hover:border-blue-800/50 transition-all duration-300 backdrop-blur-sm shadow-xl">
            <div className="w-12 h-12 bg-indigo-950/60 rounded-xl flex items-center justify-center border border-indigo-900/40 mb-6 group-hover:scale-105 transition-transform">
              <FileCheck2 className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Custom B2B Funding Roadmap</h3>
            <p className="text-[#8f9ac2] text-sm leading-relaxed">
              Receive a proprietary roadmap mapping your exact matches against federal, provincial/state grants, and tax credits.
            </p>
          </div>

          {/* Item 3 */}
          <div className="relative group bg-[#0d0e2c]/50 rounded-2xl p-8 border border-blue-950 hover:border-blue-800/50 transition-all duration-300 backdrop-blur-sm shadow-xl">
            <div className="w-12 h-12 bg-sky-950/60 rounded-xl flex items-center justify-center border border-sky-900/40 mb-6 group-hover:scale-105 transition-transform">
              <Calendar className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Private 1-on-1 Consultation</h3>
            <p className="text-[#8f9ac2] text-sm leading-relaxed">
              A 30-minute private Google Meet to coordinate application strategy, compliance requirements, and document-formatting tactics.
            </p>
          </div>
        </div>

        {/* Detailed Core Deliverables */}
        <div className="max-w-6xl mx-auto px-6 py-8 mb-24 border-y border-blue-950/40">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Core List */}
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-6">
                What You Receive During the Strategy Deep-Dive
              </h2>
              <p className="text-[#8f9ac2] mb-8 leading-relaxed">
                Standard online applications fail 90% of the time due to misalignment or documentation formatting issues. Our structured strategy covers all gaps:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5.5 h-5.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Top 3 High-Probability Matches:</strong> The exact top 3 grant, loan, or tax incentive programs you stand the highest chance of winning.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5.5 h-5.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Precision Eligibility Analysis:</strong> Cross-checked against region, head-count, technology scope, and past project categories.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5.5 h-5.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Documentation Blueprint:</strong> Complete layout of writing patterns, financial sheets, and partner validations required for your target programs.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5.5 h-5.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">AI Models Trial:</strong> Interactive showcase of custom data analysis AI models utilized by our parent organization.
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Column: Statistics / Trust Callout */}
            <div className="bg-gradient-to-b from-[#0d0e2c] to-[#08091a] rounded-3xl p-8 border border-blue-950 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-indigo-400" />
                <h4 className="font-extrabold text-white text-lg">Why Work With FSI Digital?</h4>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-blue-950/60">
                  <span className="text-[#8f9ac2] text-sm">Pre-Call Desk Research Time</span>
                  <span className="text-white font-extrabold">2 Full Hours</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-blue-950/60">
                  <span className="text-[#8f9ac2] text-sm">Programs Tracked in Database</span>
                  <span className="text-white font-extrabold">2,000+ US & Canadian Options</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-blue-950/60">
                  <span className="text-[#8f9ac2] text-sm">Google Meet Call Duration</span>
                  <span className="text-white font-extrabold">30 Private Minutes</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-[#8f9ac2] text-sm">Strategic Deliverables Bundle</span>
                  <span className="text-blue-400 font-extrabold">PDF Roadmap Included</span>
                </div>
              </div>

              <div className="mt-8 bg-blue-950/40 rounded-xl p-4 border border-blue-900/30 text-center">
                <p className="text-xs text-[#8f9ac2] leading-normal italic">
                  "Each session is individually pre-researched by our consulting team. Slots are strictly allocated based on payment timestamp."
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Pricing & Checkout Section */}
        <div id="pricing" className="max-w-6xl mx-auto px-6 mb-32 relative scroll-mt-24">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Choose Your Payment Option</h2>
            <p className="text-[#8f9ac2] max-w-xl mx-auto">
              Select your currency below. Secure checkout via PayPal or credit card (processed by PayPal Standard). After checkout, you will automatically redirect to our live Calendly dashboard to pick your slot.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Card A: CAD (Recommended) */}
            <div className="relative rounded-3xl bg-[#0d0e2c] border-2 border-blue-500/80 p-8 flex flex-col justify-between shadow-2xl hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -top-4 left-6 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-black uppercase tracking-widest">
                🇨🇦 Recommended for Canadian Leads
              </div>
              
              <div>
                <h3 className="text-2xl font-black text-white mb-2">Canadian Businesses</h3>
                <p className="text-[#8f9ac2] text-sm mb-6">
                  Perfect for businesses matching with Federal & Provincial programs (SRED, IRAP, provincial grants).
                </p>
                
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-black text-white tracking-tight">$199</span>
                  <span className="text-lg font-bold text-blue-400">CAD</span>
                  <span className="text-sm text-[#5a6a9a] ml-1">/ one-time setup fee</span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-2.5 text-sm text-gray-200">
                    <CheckCircle className="w-4.5 h-4.5 text-blue-400 flex-shrink-0" />
                    <span>Secure local Canadian payment option</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-200">
                    <CheckCircle className="w-4.5 h-4.5 text-blue-400 flex-shrink-0" />
                    <span>No foreign currency exchange markups</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-200">
                    <CheckCircle className="w-4.5 h-4.5 text-blue-400 flex-shrink-0" />
                    <span>Redirects instantly to Calendly success page</span>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=ashwani@fsidigital.ca&currency_code=CAD&amount=199.00&item_name=1-on-1%20B2B%20Funding%20Strategy%20Consultation&return=https://fsidigital.ca/booking"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-extrabold text-base py-4 px-6 rounded-2xl shadow-xl shadow-blue-900/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Pay $199 CAD with PayPal / Card
                  <ArrowRight className="w-4.5 h-4.5" />
                </a>
                <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-[#5a6a9a]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5a6a9a]" />
                  <span>Secure 256-bit encrypted checkout</span>
                </div>
              </div>
            </div>

            {/* Card B: USD (International / US) */}
            <div className="relative rounded-3xl bg-[#0d0e2c]/60 border border-blue-950 p-8 flex flex-col justify-between shadow-2xl hover:scale-[1.02] transition-transform duration-300">
              
              <div>
                <h3 className="text-2xl font-black text-white mb-2">US & Cross-Border Startups</h3>
                <p className="text-[#8f9ac2] text-sm mb-6">
                  Perfect for startups seeking US federal, state grants, tax credits, or venture-backed alternative funding options.
                </p>
                
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-black text-white tracking-tight">$199</span>
                  <span className="text-lg font-bold text-indigo-400">USD</span>
                  <span className="text-sm text-[#5a6a9a] ml-1">/ one-time setup fee</span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-2.5 text-sm text-gray-200">
                    <CheckCircle className="w-4.5 h-4.5 text-indigo-400 flex-shrink-0" />
                    <span>Ideal for US and international credit cards</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-200">
                    <CheckCircle className="w-4.5 h-4.5 text-indigo-400 flex-shrink-0" />
                    <span>Matches US federal & state grants database</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-200">
                    <CheckCircle className="w-4.5 h-4.5 text-indigo-400 flex-shrink-0" />
                    <span>Redirects instantly to Calendly success page</span>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=ashwani@fsidigital.ca&currency_code=USD&amount=199.00&item_name=1-on-1%20B2B%20Funding%20Strategy%20Consultation&return=https://fsidigital.ca/booking"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1f2256] border border-blue-800/40 hover:bg-[#282b68] text-white font-extrabold text-base py-4 px-6 rounded-2xl shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Pay $199 USD with PayPal / Card
                  <ArrowRight className="w-4.5 h-4.5" />
                </a>
                <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-[#5a6a9a]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5a6a9a]" />
                  <span>Secure 256-bit encrypted checkout</span>
                </div>
              </div>
            </div>

          </div>

          {/* Refund Guarantee Badge */}
          <div className="max-w-xl mx-auto mt-16 bg-blue-950/20 border border-blue-900/30 rounded-2xl p-6 flex items-start gap-4 shadow-lg backdrop-blur-md">
            <Award className="w-8 h-8 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-extrabold text-white text-base mb-1">Our Upfront Value Commitment</h5>
              <p className="text-xs text-[#8f9ac2] leading-relaxed">
                If, after conducting our 2 hours of custom research, we discover your business is in an ineligible category and does not qualify for any government or private financing options, we will proactively cancel the session and issue a **full 100% refund** immediately. No questions asked.
              </p>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}
