import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Check, Sparkles, HelpCircle, ArrowRight, Shield, BookOpen, Layers, Target, Clock, Users } from 'lucide-react';
import { StandaloneCheckout } from '@/components/products/StandaloneCheckout';
import { ProductHierarchyMap } from '@/components/products/ProductHierarchyMap';

export const metadata: Metadata = {
  title: 'Funding Approval Library — Real Winning Grant Proposals',
  description: "Unlock FSI Digital's private archive of approved Canadian grant applications, project narratives, and budgets for $9.",
  alternates: {
    canonical: 'https://www.fsidigital.ca/products/approval-library',
  },
  openGraph: {
    title: 'Funding Approval Library — Real Winning Grant Proposals',
    description: "Unlock FSI Digital's private archive of approved Canadian grant applications, project narratives, and budgets for $9.",
    type: 'website',
  },
};

export default function ApprovalLibraryPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Funding Case Study Approval Library",
    "image": "https://www.fsidigital.ca/product-library-thumbnail.jpg",
    "description": "Unlock FSI Digital's private archive of approved Canadian grant applications, project narratives, and budgets.",
    "sku": "FSI-LIBRARY-001",
    "offers": {
      "@type": "Offer",
      "url": "https://www.fsidigital.ca/products/approval-library",
      "priceCurrency": "CAD",
      "price": "9.00",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "FSI Digital"
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-indigo-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      
      {/* Hero / Sales Section */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pb-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.12),transparent_50%)]"></div>
        <div className="max-w-6xl mx-auto px-4 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Pitch */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> outcome-based library
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-slate-100">
              Learn How Successful Canadian Funding Applications Are Structured.
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl font-medium">
              Get direct access to real, approved project descriptions, budgets, and R&D narratives that successfully won non-repayable government funding. Stop guessing what review officers want to read.
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

            {/* Checklist of what's inside */}
            <div className="space-y-3 pt-2">
              {[
                { title: 'Approved R&D Narrative (SR&ED/IRAP)', desc: 'Exact wording describing technological uncertainty and scientific research steps that CRA reviewed and approved.' },
                { title: 'Approved Hiring Plan Justification', desc: 'Real project descriptions used to secure wage subsidies for software, marketing, and admin interns.' },
                { title: 'Approved Equipment Funding Budgets', desc: 'Real spreadsheets showing how companies structured equipment quotes to win 50% provincial cost-share grants.' }
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
              productId="funding-approval-library"
              price={9}
              productName="Funding Approval Library"
            />
          </div>

        </div>
      </section>

      {/* Breakdown Section */}
      <section className="py-16 sm:py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100">Why Successful Case Studies Matter</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Analyzing successful proposals helps you structure your text correctly, use the right government buzzwords, and avoid red flags that trigger manual audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'SR&ED R&D Outlines',
                desc: 'See how software developers frame routine development as scientific advancement, and how manufacturers describe operational testing uncertainty.'
              },
              {
                icon: Target,
                title: 'Wage Subsidy Pitch Guides',
                desc: 'Review approved training plan formats showing the specific tasks interns performed, and how training curricula were framed.'
              },
              {
                icon: Layers,
                title: 'Cost Stacking Models',
                desc: 'Examine real approved budget sheets that successfully combined IRAP wage funding with SR&ED tax credits without double-dipping.'
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
        <ProductHierarchyMap currentTier="starter" />
      </section>

      {/* Guarantee Section */}
      <section className="py-16 sm:py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-455 rounded-full">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-100">30-Day Refund &amp; Satisfaction Guarantee</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
            At FSI Digital, we write templates to help you succeed. If you find the Case Library doesn't provide clear examples of approved grant text to help your application prep, email us at <a href="mailto:hello@fsidigital.ca" className="text-indigo-450 hover:underline">hello@fsidigital.ca</a> within 30 days of purchase for a 100% refund.
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
                q: 'What is inside the Case Library Guide?',
                a: 'The Library is a comprehensive PDF guide containing annotated winning application extracts, budget screenshots, and step-by-step instructions showing you how to adapt the text for your business.',
              },
              {
                q: 'Is it safe to copy the text directly?',
                a: 'No. You should use the examples to guide your framing, hierarchy, and structure. Government agencies crosscheck text and will reject duplicate copy. Use these as guides to structure your unique business case.',
              },
              {
                q: 'Is there a money-back guarantee?',
                a: "Yes. If you find the Case Library doesn't provide clear examples of approved grant text to help your application prep, email hello@fsidigital.ca within 30 days for a full refund.",
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
