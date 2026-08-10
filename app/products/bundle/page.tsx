import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Check, Sparkles, HelpCircle, ArrowRight, Shield, Clock, Users, Layers, Award, FileText, Download, CheckCircle2 } from 'lucide-react';
import { StandaloneCheckout } from '@/components/products/StandaloneCheckout';
import { ProductHierarchyMap } from '@/components/products/ProductHierarchyMap';

export const metadata: Metadata = {
  title: 'Complete Funding Blueprint ($79) — Full Grant Strategy & Stacking Package',
  description: 'Download the complete $79 Funding Blueprint: Includes Funding Recommendation Report, 4-Month Action Plan Roadmap, Multi-Year Stacking Simulation, and Full Template Pack.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/products/bundle',
  },
  openGraph: {
    title: 'Complete Funding Blueprint ($79) — Full Grant Strategy & Stacking Package',
    description: 'Download the complete $79 Funding Blueprint: Includes Funding Recommendation Report, 4-Month Action Plan Roadmap, Multi-Year Stacking Simulation, and Full Template Pack.',
    type: 'website',
  },
};

export default function BundlePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Complete Funding Blueprint ($79)",
    "image": "https://www.fsidigital.ca/product-blueprint-thumbnail.jpg",
    "description": "Complete Funding Blueprint: Includes Funding Recommendation Report, 4-Month Action Plan Roadmap, Multi-Year Stacking Simulation, and Full Template Pack.",
    "sku": "FSI-BUNDLE-001",
    "mpn": "FSI-BUNDLE-001",
    "brand": {
      "@type": "Brand",
      "name": "FSI Digital"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "64"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.fsidigital.ca/products/bundle",
      "priceCurrency": "USD",
      "price": "79.00",
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.15),transparent_50%)]"></div>
        <div className="max-w-6xl mx-auto px-4 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Pitch */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Complete All-in-One Executive Package
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-slate-100">
              Complete Funding Blueprint ($79)
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl font-medium">
              Get our highest-tier complete funding dossier: Personalized Match Report, 4-Month Action Plan Roadmap, Multi-Year Grant Stacking Simulation, and Full Application Template Pack.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 border-y border-slate-800 py-4 max-w-lg">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400 shrink-0" />
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-tight">
                  Verification Audit<br/>
                  <span className="text-slate-200 text-[11px] font-black lowercase">ashwani k</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-tight">
                  Instant Access<br/>
                  <span className="text-slate-200 text-[11px] font-black lowercase">online & pdf</span>
                </div>
              </div>
            </div>

            {/* Feature Bullet Points */}
            <div className="space-y-3 pt-2">
              {[
                'Everything in the $19 Funding Match Report',
                'Everything in the $49 Strategy & Action Plan',
                'Multi-Year Grant Stacking & Combination Matrix',
                'Full Application Template Pack & Budget Builders',
                '100% Fee Credit Eligibility toward 1-on-1 Strategy Sessions'
              ].map((feat, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-indigo-500/20 text-indigo-400 p-0.5 rounded-full shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-slate-300">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Widget Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                ★ Best Value Package ($79)
              </div>

              <div className="mb-6 border-b border-slate-800 pb-4 text-left">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Instant Digital Unlock</div>
                <div className="text-2xl font-black text-slate-100">Complete Funding Blueprint</div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-black text-slate-100">$79</span>
                  <span className="text-sm text-slate-400 line-through font-medium">$199 USD</span>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Save 60%</span>
                </div>
              </div>

              <StandaloneCheckout
                productId="funding-bundle"
                price={79}
                productName="Complete Funding Blueprint ($79)"
              />

              <div className="mt-4 pt-4 border-t border-slate-800/80 text-center">
                <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  30-Day Guarantee • Instant PDF & Dashboard Access
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Product Hierarchy Map */}
      <ProductHierarchyMap currentProductId="funding-bundle" />

      {/* What's Inside Blueprint Section */}
      <section className="py-16 bg-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 mb-4">
            Everything Included in the $79 Complete Blueprint
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mb-12 max-w-2xl mx-auto">
            The ultimate funding resource designed for business owners seeking maximum non-dilutive capital without missing filing windows.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
              <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-lg flex items-center justify-center font-bold">1</div>
              <h3 className="font-bold text-slate-100 text-lg">Funding Match Report</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Identifies top-priority government grants, tax credits, and loans tailored to your industry, stage, and location.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
              <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center font-bold">2</div>
              <h3 className="font-bold text-slate-100 text-lg">4-Month Action Plan</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ranks matching programs, maps your application milestone sequence, and flags program compliance risk factors.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
              <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center font-bold">3</div>
              <h3 className="font-bold text-slate-100 text-lg">Multi-Year Stacking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Simulates legal grant stacking combinations to maximize total non-dilutive capital while remaining compliant.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
