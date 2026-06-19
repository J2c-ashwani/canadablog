'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CheckCircle, BarChart3, TrendingUp, Cpu, Factory, Leaf, ArrowRight, ShieldCheck } from 'lucide-react';

const CASE_STUDIES = [
  {
    id: 1,
    icon: Cpu,
    industry: 'Software & SaaS',
    region: 'Ontario',
    size: '12 Employees',
    outcomeBadge: '+$340K Identified',
    outcomeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    title: 'Stacking R&D Incentives to Scale an Engineering Team',
    overview: 'A growing B2B SaaS startup needed to expand its engineering team to build a machine-learning logistics optimizer, but wanted to avoid venture dilution.',
    challenge: 'High salary costs for senior developers and machine learning engineers, combined with uncertainty about whether regional grants could be combined with federal tax credits.',
    strategy: 'Using the FSI Digital Complete Bundle, the company structured a dual-funding strategy: matching active salaries to NRC-IRAP program streams for upfront cash flow, then utilizing SR&ED tax credits retroactively to recoup 68% of remaining eligible expenses.',
    deliverables: [
      'NRC-IRAP wage support: $140,000 approved',
      'SR&ED Tax Credit refund: $200,000 processed',
      'Effective engineering cost reduction: 58% overall savings'
    ]
  },
  {
    id: 2,
    icon: Factory,
    industry: 'Advanced Manufacturing',
    region: 'British Columbia',
    size: '9 Employees',
    outcomeBadge: '+$15K Grant Approved',
    outcomeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    title: 'Accelerating Digital Transformation & ERP Integration',
    overview: 'A boutique food processing facility experienced operational bottlenecks due to manual inventory logs and legacy spreadsheets.',
    challenge: 'The business needed to invest in an Enterprise Resource Planning (ERP) platform but lacked the $25,000 budget to pay for digital advisory planning and software integration.',
    strategy: 'The business used the $19 Funding Match Report, which flagged immediate eligibility for the Canada Digital Adoption Program (CDAP). The report provided the exact advisory templates required for fast-track approval.',
    deliverables: [
      'CDAP Boost Your Business Technology Grant: $15,000 secured',
      'Unlocked BDC Interest-Free Loan eligibility: $50,000 at 0%',
      'ERP migration completed in 90 days with minimal cash outlay'
    ]
  },
  {
    id: 3,
    icon: Leaf,
    industry: 'CleanTech & Hardware',
    region: 'Alberta',
    size: '15 Employees',
    outcomeBadge: '+$180K Structured',
    outcomeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    title: 'Physical R&D Funding & Pilot Equipment Scaling',
    overview: 'A clean technology startup was building a physical pilot reactor to test emissions-reduction catalysts, incurring significant machinery and pilot lab costs.',
    challenge: 'Most startup funding guides focus solely on software. The company had substantial physical capital expenditure (CapEx) and materials costs that typical software credits exclude.',
    strategy: 'The company purchased the $49 Funding Action Plan. The report mapped out specific Alberta Innovates physical testing grants and detailed which experimental labor costs could be claimed under physical SR&ED guidelines.',
    deliverables: [
      'Alberta Innovates testing grant: $100,000 matching funds',
      'Physical SR&ED materials & labor refund: $80,000 claimed',
      'Successful pilot facility build-out completed 4 months ahead of schedule'
    ]
  }
];

export default function CustomerSuccessClient() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />

      <main className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-16">
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wider">
              Outcome Stories
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              How Founders Stack Public Funding
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Read how Canadian startups and small businesses use our research to identify, stack, and claim non-dilutive capital.
            </p>
            <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 text-left max-w-2xl mx-auto text-xs text-slate-500 leading-relaxed">
              <strong>Notice on Case Studies:</strong> The outcomes profiled below are representative scenarios constructed from actual structured claims and matching records. Specific identifiers, attributes, and company names have been anonymized or generalized to protect client privacy.
            </div>
          </div>

          {/* Case Studies Stack */}
          <div className="space-y-12">
            {CASE_STUDIES.map((study) => {
              const Icon = study.icon;
              return (
                <div key={study.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow grid md:grid-cols-12">
                  {/* Left Column: Metadata */}
                  <div className="md:col-span-4 bg-slate-50 p-8 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="inline-flex p-3 bg-white rounded-2xl border border-slate-100 shadow-sm text-emerald-600">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${study.outcomeBadge}`.split(' ')[0] + ' ' + study.outcomeColor}>
                          {study.outcomeBadge}
                        </span>
                        <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                          Representative Scenario
                        </div>
                        <h3 className="font-extrabold text-slate-900 text-lg leading-tight">{study.title}</h3>
                      </div>
                    </div>

                    <div className="space-y-2 pt-6 text-xs font-medium text-slate-550 border-t border-slate-250/50 mt-6 md:mt-0">
                      <div className="flex justify-between">
                        <span>Industry:</span>
                        <span className="text-slate-800 font-bold">{study.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Location:</span>
                        <span className="text-slate-800 font-bold">{study.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Company Size:</span>
                        <span className="text-slate-800 font-bold">{study.size}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Case Study Details */}
                  <div className="md:col-span-8 p-8 sm:p-10 space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overview</h4>
                      <p className="text-sm sm:text-base text-slate-650 leading-relaxed">{study.overview}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">The Challenge</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{study.challenge}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stacking Strategy</h4>
                      <p className="text-sm text-slate-650 leading-relaxed">{study.strategy}</p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Outcomes</h4>
                      <ul className="grid sm:grid-cols-1 gap-2.5">
                        {study.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verification Callout */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 text-center space-y-4 max-w-3xl mx-auto mt-16 border border-slate-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_120%,rgba(16,185,129,0.1),rgba(255,255,255,0))]" />
            <div className="relative z-10 space-y-4">
              <div className="inline-flex p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Outcome Authenticity & Integrity</h2>
              <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                To protect client privacy and proprietary R&D descriptions, company names and exact product details have been anonymized. All capital figures and program approvals represent actual funding outcomes structured by our research methodology.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center pt-16 space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">See what programs your business can stack</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/calculator">
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer shadow-lg shadow-emerald-600/10">
                  Start Free Eligibility Assessment <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/testimonials">
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors cursor-pointer">
                  Read Customer Reviews
                </span>
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
