import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles, Layers, Shield, FileText, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getAllCaseStudies } from '@/lib/data/case-studies';
import EEATBadge from '@/components/blog/EEATBadge';

export const metadata: Metadata = {
  title: 'Illustrative Business Funding Case Studies & Scenarios | FSI Digital',
  description: 'Explore illustrative funding scenarios and case studies demonstrating how businesses stack grants, wage subsidies, and tax credits to optimize non-dilutive capital.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/case-studies',
  },
  robots: { index: true, follow: true },
};

export default function CaseStudiesIndexPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <div className="min-h-screen bg-slate-50/30">
      <Header />

      <main className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800 shrink-0">Case Studies</span>
          </nav>

          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none font-bold">
              Funding Analysis Models
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Illustrative Funding Scenarios
            </h1>
            <p className="text-slate-600 text-base sm:text-lg">
              Analyze representative models showing how software startups, manufacturers, and agri-tech farms stack federal, provincial, and state incentives to secure non-dilutive capital.
            </p>

            <div className="flex justify-center mt-4">
              <EEATBadge authorName="Ashwani" authorImage="/author-ashwani.jpg" date="2026-06-09" />
            </div>
          </div>

          {/* Legal Compliance Disclaimer Banner */}
          <div className="max-w-5xl mx-auto mb-10 p-5 border border-amber-200 bg-amber-50/40 rounded-2xl flex items-start gap-4 shadow-xs">
            <Shield className="h-6 w-6 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 space-y-1">
              <p className="font-bold">Important Trust & Compliance Notice</p>
              <p className="leading-relaxed">
                The case studies displayed below are **illustrative funding analyses** representing typical program stacks, eligibility structures, and typical matching thresholds. They do not represent specific past client outcomes. Every business profile is unique, and all funding approvals are subject to official government program validation.
              </p>
            </div>
          </div>

          {/* Case Studies Grid */}
          <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2">
            {caseStudies.map((study) => (
              <Card key={study.id} className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-2xl overflow-hidden flex flex-col justify-between">
                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-3">
                      <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-none font-extrabold">
                        {study.label}
                      </Badge>
                      <span className="text-xs text-slate-400 font-bold">{study.region}, {study.country}</span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 leading-snug hover:text-emerald-700 transition-colors">
                      <Link href={`/case-studies/${study.slug}`}>{study.title}</Link>
                    </h2>
                    
                    <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 font-semibold block uppercase">Estimated Stack Value</span>
                      <span className="text-lg font-black text-emerald-600">{study.totalFundingMatch}</span>
                    </div>
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-800"
                    >
                      Read Analysis <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
