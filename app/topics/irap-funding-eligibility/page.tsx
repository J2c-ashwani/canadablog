import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "IRAP Funding Eligibility & Application Guide 2026 | FSI Digital",
  description: "Find out if your Canadian SME qualifies for the Industrial Research Assistance Program (IRAP) grant. Read our expert 2026 eligibility checklist, ITA tips, and stacking rules.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/irap-funding-eligibility",
  },
  robots: { index: true, follow: true },
}

export default function IrapEligibilityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/irap-funding-eligibility#webpage",
        "url": "https://www.fsidigital.ca/topics/irap-funding-eligibility",
        "name": "IRAP Funding Eligibility & Application Guide 2026",
        "description": "Find out if your Canadian SME qualifies for the Industrial Research Assistance Program (IRAP) grant.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "IRAP Eligibility", "item": "https://www.fsidigital.ca/topics/irap-funding-eligibility" }
          ]
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://www.fsidigital.ca/topics/irap-funding-eligibility#howto",
        "name": "How to Apply for NRC IRAP Funding",
        "description": "Step-by-step process for Canadian SMEs to contact an advisor, draft a proposal, and secure NRC IRAP non-repayable contributions.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Initiate Contact with NRC IRAP",
            "text": "Call the National Research Council toll-free line or fill out their online inquiry form to request a consultation. The NRC will assign a regional Industrial Technology Advisor (ITA)."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Present Business Case to Your ITA",
            "text": "Meet with your ITA to present your business coordinates, financial viability, innovation scope, and commercial market potential."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Draft Project Proposal and Milestones",
            "text": "If the ITA invites you to apply, draft a detailed project proposal. Outline key technical milestones, estimated timelines, salary costs, and subcontractor fees."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Receive Approval and Submit Claims",
            "text": "Upon proposal approval, sign the Contribution Agreement. Submit monthly progress reports and payroll records to receive direct deposit salary reimbursements."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/irap-funding-eligibility#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is IRAP?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Industrial Research Assistance Program (IRAP) is a flagship federal funding program administered by the National Research Council of Canada (NRC). It provides financial support and advisory services to help Canadian small and medium-sized enterprises (SMEs) develop and commercialize innovative technologies."
            }
          },
          {
            "@type": "Question",
            "name": "How much funding can I receive through IRAP?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While IRAP can fund large projects up to $10 million, typical SME grants range between $50,000 and $500,000. The grant is non-repayable and generally covers 50% to 80% of direct internal R&D salary costs and some subcontractor fees."
            }
          },
          {
            "@type": "Question",
            "name": "Do I have to repay IRAP funding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. IRAP funding is structured as a non-repayable contribution (a grant), not a loan or equity investment. You do not have to pay back the funds, provided you complete the project milestones and spend the budget on eligible salaries."
            }
          },
          {
            "@type": "Question",
            "name": "How long does the IRAP application process take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The duration varies depending on your relationship with your Industrial Technology Advisor (ITA) and project complexity. Typically, once a formal proposal is submitted, a decision takes between 4 to 8 weeks."
            }
          },
          {
            "@type": "Question",
            "name": "Can I combine IRAP with SR&ED?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can stack IRAP and SR&ED. You must subtract the amount of IRAP funding received from your eligible SR&ED expenditures, as you cannot claim tax credits on costs that have already been paid for by a government grant."
            }
          },
          {
            "@type": "Question",
            "name": "What industries does IRAP support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "IRAP is sector-agnostic. It supports software developers, hardware builders, biotechnology, advanced manufacturing, clean technology, and agriculture. The critical requirement is that the project is innovative and has strong commercial potential."
            }
          },
          {
            "@type": "Question",
            "name": "How do I find my local ITA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can contact the NRC IRAP office directly through their national toll-free number or online portal. They will assign an Industrial Technology Advisor (ITA) to evaluate your business location, size, and sector."
            }
          }
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.1),transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 mb-6 uppercase tracking-wider">
              Non-Repayable Federal Grant Funding
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              IRAP Funding Eligibility: Maximize Your Tech Grants
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Accelerate your product development. The Industrial Research Assistance Program (IRAP) provides non-repayable grants covering up to 80% of internal technical salaries. Learn how to connect with an advisor, prove your innovation, and qualify for funding.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#eligibility-checklist"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-emerald-900/30 inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Check Eligibility Checklist <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-emerald-400" /> Estimate Your Claim
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l-4 border-emerald-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">50%–80%</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Salary Cost Coverage</span>
            </div>
            <div className="border-l-4 border-emerald-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">$50K–$500K</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Typical SME Grant Size</span>
            </div>
            <div className="border-l-4 border-emerald-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Non-Repayable</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Direct Cash Contribution</span>
            </div>
            <div className="border-l-4 border-emerald-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">7,500+</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Companies Funded Yearly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Detailed Content */}
            <article className="lg:col-span-8 space-y-12">
              
              <section className="prose prose-slate max-w-none">
                <p className="text-lg leading-relaxed text-slate-700">
                  The <strong>Industrial Research Assistance Program (IRAP)</strong>, managed by the National Research Council of Canada (NRC), is widely recognized as one of the most effective innovation grants in the world. Unlike tax credits (such as SR&ED), which are claimed retroactively after the work has been completed and paid for, IRAP provides <strong>upfront, non-repayable cash flow</strong> to support your active R&D projects.
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  IRAP works by co-funding the salaries of your internal technical employees and, in some cases, the fees of qualified external contractors. Because it is a competitive program with a fixed annual budget, eligibility relies heavily on building a relationship with a regional representative, proving technical uncertainty, and demonstrating high commercial growth potential.
                </p>
              </section>

              {/* Eligibility Checklist */}
              <section id="eligibility-checklist" className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
                  IRAP Eligibility Checklist
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  To qualify for IRAP financial assistance, your business must meet the following baseline requirements at the time of your application:
                </p>

                <div className="space-y-4 mt-4">
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-950 text-sm sm:text-base">Incorporated in Canada</h3>
                      <p className="text-slate-600 text-xs sm:text-sm mt-0.5">Your business must be a registered, Canadian-incorporated entity. Both provincial and federal corporations qualify.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-950 text-sm sm:text-base">Under 500 Employees</h3>
                      <p className="text-slate-600 text-xs sm:text-sm mt-0.5">IRAP is restricted to Small and Medium-sized Enterprises (SMEs) with fewer than 500 full-time equivalent employees.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-950 text-sm sm:text-base">Operating for Profit</h3>
                      <p className="text-slate-600 text-xs sm:text-sm mt-0.5">Nonprofits and charitable organizations are generally not eligible for IRAP's core financial assistance streams. You must demonstrate a profit-driven model.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-950 text-sm sm:text-base">Commercial Potential</h3>
                      <p className="text-slate-600 text-xs sm:text-sm mt-0.5">You must have a clear business plan showing how the resulting technology will be commercialized, generate revenue, and create jobs in Canada.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* The ITA Relationship */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">The Key to IRAP: The ITA Relationship</h2>
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-6 md:p-8 space-y-4">
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                    Unlike standard government portals where you fill out an online form and await a generic response, IRAP operates on a gatekeeper model. That gatekeeper is your assigned <strong>Industrial Technology Advisor (ITA)</strong>.
                  </p>
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                    ITAs are experienced industry professionals, engineers, and scientists. They review your technology, audit your development plans, evaluate your financial health, and ultimately decide whether to advocate for your funding request. Without an ITA's recommendation, you cannot receive IRAP funding.
                  </p>
                  <div className="bg-white p-4 rounded-xl border border-emerald-200/50 text-xs text-slate-600 leading-relaxed">
                    <span className="font-bold text-slate-950 block mb-1">Pro-Tip for ITA Meetings:</span>
                    Do not pitch your business like you're speaking to a venture capitalist. Focus on the technological barriers you need to overcome, the innovation you are introducing to the market, and the technical risks of the project.
                  </div>
                </div>
              </section>

              {/* Application Process Step-by-Step */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">How to Apply for IRAP</h2>
                <div className="relative border-l-2 border-slate-200 pl-6 ml-3 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-emerald-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">1. Initial Inquiry & Screening</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Contact the national NRC IRAP portal to register your interest. They will run a basic corporate check to ensure you meet the size, incorporation, and sector boundaries before matching you with a regional ITA.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-emerald-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">2. ITA Consultation Meetings</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Meet with your ITA to explain your business structure, product roadmap, and project objectives. They will assess your team's capability to execute the technical tasks.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-emerald-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">3. Proposal Draft & Submission</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      If the ITA supports the project, you will receive an invitation to draft a formal proposal. This document defines project stages, milestones, eligible employee salaries, and commercialization strategies.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-emerald-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">4. Evaluation & Approval</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      The ITA submits your proposal to the regional directors with their funding recommendation. Decisions typically take 4 to 8 weeks, after which you sign a Contribution Agreement.
                    </p>
                  </div>
                </div>
              </section>

              {/* Common Pitfalls */}
              <section className="bg-red-50/60 rounded-3xl p-8 border border-red-200/80 space-y-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-bold text-slate-950">Common IRAP Application Pitfalls</h2>
                </div>
                <p className="text-red-900/90 text-sm leading-relaxed">
                  Avoid these frequent mistakes to ensure your application gets approved:
                </p>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="bg-white p-4 rounded-xl border border-red-100">
                    <span className="font-extrabold text-red-800 block mb-1">Applying for Retroactive Work:</span>
                    <p className="text-slate-600 leading-relaxed">
                      IRAP will not fund any expenses incurred before your Contribution Agreement is formally signed. Do not start the project milestones early expecting retroactive coverage.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-red-100">
                    <span className="font-extrabold text-red-800 block mb-1">Exaggerating Technical Capacity:</span>
                    <p className="text-slate-600 leading-relaxed">
                      If your team lacks the technical skills to build the core technology, the ITA will reject the application. You must show you have the necessary developers or engineers on staff or contracted.
                    </p>
                  </div>
                </div>
              </section>

              {/* Stacking Rules */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Managing the IRAP & SR&ED Stacking Tax Trap</h2>
                <p className="text-slate-600 leading-relaxed">
                  While you can leverage both IRAP and SR&ED for the same project, you cannot double-dip on the same expenditures. The CRA treats IRAP as government assistance. 
                </p>
                <p className="text-slate-600 leading-relaxed">
                  For example, if you spend $100,000 on an engineer's salary, and IRAP funds $50,000 of it, you can only claim the remaining $50,000 on your SR&ED application. Correctly tracking this allocation in your books is critical to surviving a CRA audit.
                </p>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is IRAP?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The Industrial Research Assistance Program (IRAP) is a flagship federal funding program administered by the National Research Council of Canada (NRC). It provides financial support and advisory services to help Canadian small and medium-sized enterprises (SMEs) develop and commercialize innovative technologies.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How much funding can I receive through IRAP?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      While IRAP can fund large projects up to $10 million, typical SME grants range between $50,000 and $500,000. The grant is non-repayable and generally covers 50% to 80% of direct internal R&D salary costs and some subcontractor fees.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Do I have to repay IRAP funding?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      No. IRAP funding is structured as a non-repayable contribution (a grant), not a loan or equity investment. You do not have to pay back the funds, provided you complete the project milestones and spend the budget on eligible salaries.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How long does the IRAP application process take?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The duration varies depending on your relationship with your Industrial Technology Advisor (ITA) and project complexity. Typically, once a formal proposal is submitted, a decision takes between 4 to 8 weeks.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can I combine IRAP with SR&ED?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes, you can stack IRAP and SR&ED. You must subtract the amount of IRAP funding received from your eligible SR&ED expenditures, as you cannot claim tax credits on costs that have already been paid for by a government grant.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What industries does IRAP support?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      IRAP is sector-agnostic. It supports software developers, hardware builders, biotechnology, advanced manufacturing, clean technology, and agriculture. The critical requirement is that the project is innovative and has strong commercial potential.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How do I find my local ITA?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      You can contact the NRC IRAP office directly through their national toll-free number or online portal. They will assign an Industrial Technology Advisor (ITA) to evaluate your business location, size, and sector.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cross Links */}
              <div className="border-t border-slate-200 pt-8 mt-12">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">Related Funding Resources</span>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link href="/topics/sred-tax-credit-eligibility" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 text-sm inline-flex items-center gap-1">
                      SR&ED Eligibility Guide <ArrowRight className="w-3.5 h-3.5" />
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">Review the criteria for claiming Canada's largest scientific R&D tax refund program.</p>
                  </Link>
                  <Link href="/guides/apply-irap-grants" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 transition-colors">
                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 text-sm inline-flex items-center gap-1">
                      IRAP Application Walkthrough <ArrowRight className="w-3.5 h-3.5" />
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">Step-by-step guidance on writing your IRAP proposal and establishing your ITA connection.</p>
                  </Link>
                </div>
              </div>

            </article>

            {/* Right Column - Premium Sticky CTAs */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">
                
                {/* CTA 1: Calculator */}
                <div className="bg-gradient-to-br from-emerald-900 to-slate-950 text-white rounded-3xl p-6 border border-emerald-800 shadow-md">
                  <Calculator className="w-8 h-8 text-emerald-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Estimate Your Grant Size</h3>
                  <p className="text-emerald-200 text-xs leading-relaxed mb-6">
                    Our free, interactive Canadian R&D calculator outputs real-time estimates of IRAP wage subsidies and matching corporate tax returns in minutes.
                  </p>
                  <Link
                    href="/calculator"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Launch Funding Calculator
                  </Link>
                </div>

                {/* CTA 2: AI Finder */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <Sparkles className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-2">Match 800+ Grants</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Connect with our proprietary AI Funding Finder. Match your business coordinates to active regional, provincial, and national grant programs in seconds.
                  </p>
                  <Link
                    href="/grant-finder"
                    className="w-full bg-slate-950 hover:bg-slate-900 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Find Additional Grants
                  </Link>
                </div>

                {/* CTA 3: PDF Download */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/60 text-center">
                  <Download className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download IRAP Claims Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Complete package including documentation templates, ITA interview guides, and proposal worksheets.
                  </p>
                  <Link
                    href="/download/irap-application-kit"
                    className="w-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Download Claims Kit (PDF)
                  </Link>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
