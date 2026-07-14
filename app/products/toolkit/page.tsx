import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Check, Sparkles, HelpCircle, ArrowRight, Shield, Download, FileSpreadsheet, FileText, CheckSquare, Clock, Users } from 'lucide-react';
import { StandaloneCheckout } from '@/components/products/StandaloneCheckout';
import { ProductHierarchyMap } from '@/components/products/ProductHierarchyMap';

export const metadata: Metadata = {
  title: 'Funding Application Toolkit — Premium Grant Templates & Models',
  description: 'Download 6 expert-written grant application templates, budget builders, and wage subsidy planners to write high-converting Canadian grant proposals.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/products/toolkit',
  },
  openGraph: {
    title: 'Funding Application Toolkit — Premium Grant Templates & Models',
    description: 'Download 6 expert-written grant application templates, budget builders, and wage subsidy planners to write high-converting Canadian grant proposals.',
    type: 'website',
  },
};

export default function ToolkitPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Funding Application Toolkit",
    "image": "https://www.fsidigital.ca/product-toolkit-thumbnail.jpg",
    "description": "Download 6 expert-written grant application templates, budget builders, and wage subsidy planners.",
    "sku": "FSI-TOOLKIT-001",
    "offers": {
      "@type": "Offer",
      "url": "https://www.fsidigital.ca/products/toolkit",
      "priceCurrency": "CAD",
      "price": "29.00",
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_50%)]"></div>
        <div className="max-w-6xl mx-auto px-4 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Pitch */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> outcome-based toolkit
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-slate-100">
              Submit Stronger Funding Applications in Less Time.
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl font-medium">
              Secure the exact pre-formatted grant budget spreadsheets, wage templates, and project frameworks FSI Digital uses to land federal and provincial co-funding. Save over 40 hours of preparation.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 border-y border-slate-800 py-4 max-w-lg">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-450 shrink-0" />
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-tight">
                  Edited By<br/>
                  <span className="text-slate-205 text-[11px] font-black lowercase">ashwani k</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-450 shrink-0" />
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-tight">
                  Delivery Time<br/>
                  <span className="text-slate-205 text-[11px] font-black">instant download (&lt;60s)</span>
                </div>
              </div>
            </div>

            {/* Checklist of what's inside */}
            <div className="space-y-3 pt-2">
              {[
                { title: 'Excel Grant Budget Builder', desc: 'Pre-formatted formulas for cost calculations, contractor splits, and overhead stacking.' },
                { title: '12-Week Hiring & Training Planner', desc: 'Exact framework required by Youth Employment Programs and provincial training grants.' },
                { title: 'Pre-Submission Audit Checklist', desc: '18 validation tests to run before clicking submit to avoid early reject filters.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
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
              productId="funding-toolkit"
              price={29}
              productName="Funding Application Toolkit"
            />
          </div>

        </div>
      </section>

      {/* Grid of Templates */}
      <section className="py-16 sm:py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100">6 Core Templates Included</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every document is ready to fill in. Formatted as Microsoft Office formats (.xlsx, .docx) and PDFs for maximum compatibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: FileSpreadsheet, color: 'text-emerald-400', name: 'Grant Budget Builder', desc: 'Formulas to align provincial and federal cost sharing tiers.' },
              { icon: FileSpreadsheet, color: 'text-emerald-400', name: 'Cash Flow Forecast Model', desc: '12-month projection matrix proving runway stability to ITAs.' },
              { icon: FileText, color: 'text-indigo-400', name: 'Hiring Wage Subsidy Plan', desc: 'Curriculum layout for new hire upskilling and salaries.' },
              { icon: FileText, color: 'text-indigo-400', name: 'Project Proposal Outline', desc: 'Fenced narrative structure for R&D/Commercialization proposals.' },
              { icon: CheckSquare, color: 'text-teal-400', name: 'Pre-Submission Checklist', desc: 'Criteria and validation rules to verify eligibility status.' },
              { icon: FileSpreadsheet, color: 'text-emerald-400', name: 'Application Progress Sheet', desc: 'Track intake dates, files, and follow-up sequences.' }
            ].map((t, idx) => {
              const Icon = t.icon;
              return (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors text-left space-y-3">
                  <div className={`p-2 w-fit rounded-lg bg-slate-800 border border-slate-700 ${t.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-200">{t.name}</h3>
                  <p className="text-xs text-slate-405 leading-relaxed">{t.desc}</p>
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

      {/* Trust & Guarantee Section */}
      <section className="py-16 sm:py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-100">30-Day Refund &amp; Satisfaction Guarantee</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
            At FSI Digital, we build templates to help you succeed. If you aren't completely satisfied with your download files, email us at <a href="mailto:hello@fsidigital.ca" className="text-emerald-450 hover:underline">hello@fsidigital.ca</a> within 30 days of purchase for a 100% refund.
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
                q: 'What format are the files provided in?',
                a: 'The templates are downloadable as standard Microsoft Excel (.xlsx), Word (.docx), and PDF formats. You can open and edit them directly in Excel, Word, Google Sheets, Google Docs, or Apple Numbers/Pages.',
              },
              {
                q: 'How do I access my files after purchasing?',
                a: 'Once your payment completes, you will be instantly redirected to your personal FSI Digital Download Center. A backup secure access link is also emailed to your invoice email address.',
              },
              {
                q: 'Are these templates updated for 2026 guidelines?',
                a: 'Yes. All budgets and planning guidelines reflect current 2026 parameters used in programs like NRC IRAP, CanExport, CME SMART, and provincial wage subsidies.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-5">
                <h3 className="font-bold text-xs sm:text-sm text-slate-200 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" /> {faq.q}
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
