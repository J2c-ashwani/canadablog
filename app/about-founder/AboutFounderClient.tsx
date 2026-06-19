'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Mail, Linkedin, ShieldCheck, Compass, CheckCircle, FileText, ArrowRight } from 'lucide-react';

export default function AboutFounderClient() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-slate-950 text-white py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
            <div className="grid md:grid-cols-3 gap-12 items-center">
              {/* Profile Photo Mock/Badge */}
              <div className="md:col-span-1 flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                  <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 w-64">
                    <div className="w-28 h-28 bg-emerald-500/10 border-2 border-emerald-400/50 rounded-2xl mx-auto flex items-center justify-center text-emerald-400 font-extrabold text-4xl shadow-inner">
                      AK
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg tracking-tight text-white">Ashwani Kumar</h3>
                      <p className="text-xs text-slate-400 font-medium mt-1">Founder, FSI Digital</p>
                    </div>
                    <div className="flex justify-center gap-3 pt-2">
                      <a
                        href="https://www.linkedin.com/in/ashwani-kumar-fsi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-slate-850 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href="mailto:ashwani@fsidigital.ca"
                        className="p-2 bg-slate-850 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors"
                        title="Email Address"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Short Bio */}
              <div className="md:col-span-2 space-y-6 text-center md:text-left">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ABOUT THE FOUNDER
                </span>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                  Hi, I&apos;m Ashwani.
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                  I built FSI Digital to help Canadian and American startup founders navigate the complex, opaque landscape of public funding, grants, and SR&ED tax credits without the heavy corporate advisory fees.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <Link href="/calculator">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer shadow-lg shadow-emerald-950/20">
                      Check Your Eligibility <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                  <Link href="/audit">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer">
                      Book a Funding Audit
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Narrative & Mission */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-12">
            
            {/* The Problem & The Mission */}
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
                <Compass className="w-8 h-8 text-emerald-600 shrink-0" /> Why FSI Digital Exists
              </h2>
              <div className="prose prose-slate text-slate-650 leading-relaxed max-w-none text-base space-y-4">
                <p>
                  As small business owners and startup founders, we are constantly told that there is billions of dollars in non-dilutive capital available. But in reality, searching for programs is a massive time sink.
                </p>
                <p>
                  The industry is plagued by two extremes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>The Outdated Directories:</strong> Clunky, free government tools that catalog hundreds of expired programs with broken links.</li>
                  <li><strong>The High-Priced Consultants:</strong> Agency groups that take a 20% to 30% contingency fee just to fill out basic forms, or charge thousands for simple alignment checks.</li>
                </ul>
                <p>
                  FSI Digital bridges this gap. We combine programmatic data collection with expert, manual curation. Our self-serve reports give you the exact details of what you qualify for, how to stack programs, and the exact templates to use—for the price of a dinner.
                </p>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* My Background */}
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-600 shrink-0" /> Professional Background
              </h2>
              <div className="prose prose-slate text-slate-650 leading-relaxed max-w-none text-base space-y-4">
                <p>
                  Over the past several years, I have worked directly with tech companies, manufacturers, and agricultural startups to structure their R&D claims and apply for government incentives.
                </p>
                <p>
                  Through this advisory work, I realized that 80% of the value in the funding process comes down to **program selection and prioritization**. Stacking the right programs in the right sequence (for example, combining IRAP with SR&ED) makes or breaks a company&apos;s cash flow.
                </p>
                <p>
                  FSI Digital is the product of that realization. We package that exact consulting intelligence into automated, affordable, and actionable PDF match reports.
                </p>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Core Commitments */}
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" /> Core Commitments
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h3 className="font-bold text-slate-900 text-sm">Defensible Statistics</h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We do not inflate numbers. Every statistic we claim regarding database coverage, success rates, or guidelines is fully verified and defensible against government portal audits.
                  </p>
                </div>

                <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h3 className="font-bold text-slate-900 text-sm">Primary Sources Only</h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We cross-reference every program directly with primary government databases and official bulletins, never relying on secondary press releases or outdated third-party summaries.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-emerald-50 rounded-3xl p-6 sm:p-8 border border-emerald-100 flex flex-col sm:flex-row justify-between items-center gap-6 mt-8">
              <div className="space-y-1.5 text-center sm:text-left">
                <h3 className="font-bold text-slate-900 text-lg">Have a specific question about a program?</h3>
                <p className="text-sm text-slate-600">Get in touch directly via email. I respond personally to all founders.</p>
              </div>
              <a
                href="mailto:ashwani@fsidigital.ca"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors shadow-md"
              >
                <Mail className="w-4 h-4" /> ashwani@fsidigital.ca
              </a>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
