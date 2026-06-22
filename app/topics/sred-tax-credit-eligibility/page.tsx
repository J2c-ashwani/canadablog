import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "SR&ED Tax Credit Eligibility Guide 2026 | FSI Digital",
  description: "Find out if your Canadian business qualifies for the Scientific Research and Experimental Development (SR&ED) tax credit. Read the definitive 2026 eligibility checklist, qualifying expenses, and stacking rules.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/sred-tax-credit-eligibility",
  },
  robots: { index: true, follow: true },
}

export default function SredEligibilityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/sred-tax-credit-eligibility#webpage",
        "url": "https://www.fsidigital.ca/topics/sred-tax-credit-eligibility",
        "name": "SR&ED Tax Credit Eligibility Guide 2026",
        "description": "Find out if your Canadian business qualifies for the Scientific Research and Experimental Development (SR&ED) tax credit.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "SR&ED Eligibility", "item": "https://www.fsidigital.ca/topics/sred-tax-credit-eligibility" }
          ]
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://www.fsidigital.ca/topics/sred-tax-credit-eligibility#howto",
        "name": "How to Prepare and Claim SR&ED Tax Credits",
        "description": "Step-by-step procedure to document, calculate, and submit a Scientific Research and Experimental Development (SR&ED) claim in Canada.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Identify Qualifying R&D Projects",
            "text": "Review your development activities to identify projects that attempted to resolve technological uncertainties and achieve technological advancements."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Gather Contemporaneous Documentation",
            "text": "Collect developer timesheets, Git commit logs, architectural drawings, test reports, and project meeting minutes to prove systematic investigation."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Isolate and Calculate Eligible Expenditures",
            "text": "Calculate qualified expenditures, including R&D salaries, materials consumed, overhead costs (using proxy or traditional method), and subcontractor invoices."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Draft Form T661 and File Schedule 31",
            "text": "Write the technical description outlining the uncertainty and advancement, complete Form T661, and submit it with your corporate T2 tax return within 18 months of fiscal year-end."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/sred-tax-credit-eligibility#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the SR&ED tax credit?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Scientific Research and Experimental Development (SR&ED) program is a federal tax incentive program designed to encourage Canadian businesses of all sizes and in all sectors to conduct research and development in Canada. It offers tax credits and cash refunds for qualified work."
            }
          },
          {
            "@type": "Question",
            "name": "How much money can I get back through SR&ED?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Canadian Controlled Private Corporations (CCPCs) can receive a refundable tax credit of up to 35% of their qualified expenditures, up to a limit of $3 million. Other Canadian corporations, individuals, and trusts can receive a non-refundable tax credit of 15%."
            }
          },
          {
            "@type": "Question",
            "name": "Who qualifies for the SR&ED tax credit?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Any Canadian-incorporated business that conducts research and development to resolve technological uncertainties and achieve technological advancements in Canada can qualify. This includes businesses in software, manufacturing, agriculture, biotech, and food science."
            }
          },
          {
            "@type": "Question",
            "name": "What types of work qualify for SR&ED?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Qualifying work includes experimental development, applied research, basic research, and support work. To qualify, the work must involve technological uncertainty, systematic investigation, and result in a technological advancement."
            }
          },
          {
            "@type": "Question",
            "name": "How do I apply for SR&ED?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You apply by filing Form T661 (Scientific Research and Experimental Development Expenditures Claim) along with Schedule T2SCH31 (Investment Tax Credit - Corporations) as part of your annual corporate tax return."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to receive the SR&ED refund?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Typically, claims filed with your regular tax return are processed within 60 to 120 days. If the claim is selected for review or audit, it can take anywhere from 6 to 12 months."
            }
          },
          {
            "@type": "Question",
            "name": "Can I claim SR&ED if I already received IRAP funding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can stack IRAP and SR&ED. However, you must deduct the amount of IRAP funding received from your eligible SR&ED expenditures to prevent double-dipping, as IRAP is considered government assistance."
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
      <section className="bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-500/10 border border-blue-400/20 text-blue-300 mb-6 uppercase tracking-wider">
              Canada's Largest R&D Tax Incentive
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              SR&ED Tax Credit Eligibility: The Definitive 2026 Guide
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Unlock cash refunds and tax offsets for your innovation. Canadian-controlled private corporations can claim up to a 35% refundable tax credit on qualifying salaries, materials, and contracts. Learn the exact requirements to secure your funding.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#eligibility-criteria"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-900/30 inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Check Eligibility Criteria <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-blue-400" /> Estimate Your Claim
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts / Stats Grid */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to 35%</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Refundable Federal Credit</span>
            </div>
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">$150K–$500K</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Average SME Claim Size</span>
            </div>
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">18 Months</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Strict Filing Deadline</span>
            </div>
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">26,000+</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Annual Claims Approved</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left Column - Detailed Content */}
            <article className="lg:col-span-8 space-y-12">
              
              {/* Introduction */}
              <section className="prose prose-slate max-w-none">
                <p className="text-lg leading-relaxed text-slate-700">
                  The <strong>Scientific Research and Experimental Development (SR&ED)</strong> program is the cornerstone of Canadian business innovation funding. Administered by the Canada Revenue Agency (CRA), the program injects more than <strong>$3.5 billion</strong> annually back into local companies. Because the funding is structured as a tax credit, qualifying businesses are legally entitled to it—provided they meet the eligibility criteria and file the necessary documentation. 
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  However, many Canadian small businesses and startups miss out on this capital. A common misconception is that SR&ED is reserved for white-lab-coat scientists working in high-tech research institutions. In reality, any company performing systematic engineering, developing proprietary software, resolving manufacturing challenges, or formulating new recipes can qualify for significant tax refunds.
                </p>
              </section>

              {/* The Three Pillars of SR&ED */}
              <section id="eligibility-criteria" className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
                  The Three Pillars of SR&ED Eligibility
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  To qualify for the SR&ED tax incentive, your project must meet three strict criteria defined by the CRA. You must structure your claims around proving these points:
                </p>

                <div className="space-y-6 mt-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center shrink-0 border border-blue-200">1</div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Technological Uncertainty</h3>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        There must be a technological obstacle or uncertainty that cannot be resolved using standard, publicly available knowledge or common practices. If a qualified software engineer or manufacturing specialist cannot determine how to build it without systematic experimentation, technological uncertainty exists.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center shrink-0 border border-blue-200">2</div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Systematic Investigation</h3>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        Your work must follow a structured, scientific approach. This means formulating a hypothesis, conducting experiments, testing alternatives, evaluating the outcomes, and recording the results. A simple trial-and-error approach without structured data collection does not qualify.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center shrink-0 border border-blue-200">3</div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Technological Advancement</h3>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        The investigation must yield an advancement in your technological capability or knowledge base. Crucially, the CRA measures advancement by the *knowledge generated*, not whether the project succeeded. A failed project that proved a certain methodology does not work is a valid technological advancement.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Who Qualifies? */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Who Can Claim SR&ED?</h2>
                <p className="text-slate-600 leading-relaxed">
                  Your corporate structure determines the type and rate of credit you receive:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-3 text-blue-900 font-extrabold text-base">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      CCPC (Refundable Cash)
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Canadian Controlled Private Corporations get the best benefits: a **35% refundable credit** on R&D expenditures up to $3 million per year. Even if you are pre-revenue or unprofitable, you receive a direct cash refund.
                    </p>
                  </div>
                  
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-3 text-slate-800 font-extrabold text-base">
                      <CheckCircle className="w-5 h-5 text-slate-400" />
                      Public / Foreign Corp (Non-Refundable)
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Other Canadian-incorporated companies (including foreign-owned subsidiaries or publicly traded entities) qualify for a **15% non-refundable credit**. This credit is used directly to offset federal corporate tax payable.
                    </p>
                  </div>
                </div>
              </section>

              {/* Eligible Industries */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Qualifying Sectors & Work Examples</h2>
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                  <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                    <div className="p-6 space-y-3">
                      <span className="font-extrabold text-slate-950 text-sm uppercase block tracking-wider text-blue-600">Software & AI</span>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        Building new database architectures, complex machine learning algorithms, solving integration limits, or designing high-performance processing systems.
                      </p>
                    </div>
                    <div className="p-6 space-y-3">
                      <span className="font-extrabold text-slate-950 text-sm uppercase block tracking-wider text-blue-600">Manufacturing</span>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        Developing automated assembly steps, reducing process cycle times, custom tool design, scaling output, or engineering advanced materials.
                      </p>
                    </div>
                    <div className="p-6 space-y-3">
                      <span className="font-extrabold text-slate-950 text-sm uppercase block tracking-wider text-blue-600">Agriculture & Food</span>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        Optimizing greenhouse yields, formulating sustainable feeds, increasing shelf life, testing new pathogen treatments, or refining crop resistance.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* What Expenditures Can You Claim? */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Eligible Expenditures Breakdown</h2>
                <p className="text-slate-600 leading-relaxed">
                  You can claim three main categories of costs related to your R&D projects:
                </p>

                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
                    <Users className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900">Salaries & Wages</h4>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        The direct labor cost of employees who are directly involved in executing, supervising, or supporting R&D activities in Canada. 
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
                    <FileText className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900">Subcontractors & Contractors</h4>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        Fees paid to third-party Canadian contractors performing R&D tasks. Note: qualifying contractor costs are typically capped at 80% for credit calculations.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900">Materials Consumed or Transformed</h4>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        Raw materials, prototypes, chemical inputs, or components that are consumed during R&D testing or transformed into other materials.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Common Pitfalls / Audit Risks */}
              <section className="bg-red-50/60 rounded-3xl p-8 border border-red-200/80 space-y-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-bold text-slate-950">Avoiding the SR&ED Audit: Critical Warning</h2>
                </div>
                <p className="text-red-900/90 text-sm leading-relaxed">
                  The Canada Revenue Agency (CRA) regularly reviews SR&ED claims to ensure accuracy and legitimacy. The absolute number one cause of claim rejection is **"Lack of Substantiation"**. You cannot legally recreate timesheets, R&D notes, and technical findings after the fiscal year ends.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-xs mt-2">
                  <div className="bg-white p-4 rounded-xl border border-red-100">
                    <span className="font-extrabold text-emerald-800 uppercase block mb-1">Do:</span>
                    <p className="text-slate-600 leading-relaxed">
                      Maintain commit logs, lab books, screenshots of test failures, detailed timesheets, and project planning files as the work happens.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-red-100">
                    <span className="font-extrabold text-red-800 uppercase block mb-1">Don't:</span>
                    <p className="text-slate-600 leading-relaxed">
                      Submit estimated time percentages (e.g., claiming 70% of employee time without weekly tracking records).
                    </p>
                  </div>
                </div>
              </section>

              {/* Stacking Rules */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">How SR&ED Interacts with IRAP (Stacking)</h2>
                <p className="text-slate-600 leading-relaxed">
                  A common question is whether you can stack SR&ED with the Industrial Research Assistance Program (IRAP). The answer is **yes**, but you must manage the accounting carefully. 
                </p>
                <p className="text-slate-600 leading-relaxed">
                  IRAP is classified as "government assistance" by the CRA. You must subtract the exact dollar amount of your IRAP funding from your total eligible expenditures before calculating your SR&ED credit. The remaining non-funded portion of your R&D expenses is still eligible for the full SR&ED tax credit.
                </p>
              </section>

              {/* FAQ Section */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the SR&ED tax credit?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The Scientific Research and Experimental Development (SR&ED) program is a federal tax incentive program designed to encourage Canadian businesses of all sizes and in all sectors to conduct research and development in Canada. It offers tax credits and cash refunds for qualified work.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How much money can I get back through SR&ED?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Canadian Controlled Private Corporations (CCPCs) can receive a refundable tax credit of up to 35% of their qualified expenditures, up to a limit of $3 million. Other Canadian corporations, individuals, and trusts can receive a non-refundable tax credit of 15%.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Who qualifies for the SR&ED tax credit?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Any Canadian-incorporated business that conducts research and development to resolve technological uncertainties and achieve technological advancements in Canada can qualify. This includes businesses in software, manufacturing, agriculture, biotech, and food science.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What types of work qualify for SR&ED?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Qualifying work includes experimental development, applied research, basic research, and support work. To qualify, the work must involve technological uncertainty, systematic investigation, and result in a technological advancement.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How do I apply for SR&ED?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      You apply by filing Form T661 (Scientific Research and Experimental Development Expenditures Claim) along with Schedule T2SCH31 (Investment Tax Credit - Corporations) as part of your annual corporate tax return.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How long does it take to receive the SR&ED refund?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Typically, claims filed with your regular tax return are processed within 60 to 120 days. If the claim is selected for review or audit, it can take anywhere from 6 to 12 months.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can I claim SR&ED if I already received IRAP funding?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes, you can stack IRAP and SR&ED. However, you must deduct the amount of IRAP funding received from your eligible SR&ED expenditures to prevent double-dipping, as IRAP is considered government assistance.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cross Links */}
              <div className="border-t border-slate-200 pt-8 mt-12">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">Related Funding Resources</span>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link href="/topics/irap-funding-eligibility" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 transition-colors">
                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 text-sm inline-flex items-center gap-1">
                      IRAP Funding Eligibility Guide <ArrowRight className="w-3.5 h-3.5" />
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">Learn how to secure non-repayable grant capital through IRAP prior to R&D spending.</p>
                  </Link>
                  <Link href="/guides/sred-application-guide" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 text-sm inline-flex items-center gap-1">
                      SR&ED Application Walkthrough <ArrowRight className="w-3.5 h-3.5" />
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">Detailed, step-by-step instructions on filling out your Form T661 and tax schedules.</p>
                  </Link>
                </div>
              </div>

            </article>

            {/* Right Column - Premium Sticky CTAs */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">
                
                {/* CTA 1: Calculator */}
                <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 border border-blue-800 shadow-md">
                  <Calculator className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Estimate Your R&D Return</h3>
                  <p className="text-blue-200 text-xs leading-relaxed mb-6">
                    Our free, interactive Canadian R&D calculator outputs real-time estimates of federal and provincial tax returns based on salary and material spend.
                  </p>
                  <Link
                    href="/calculator"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Launch Funding Calculator
                  </Link>
                </div>

                {/* CTA 2: AI Finder */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <Sparkles className="w-8 h-8 text-indigo-600 mb-4" />
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
                  <Download className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download R&D Claims Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Complete package including documentation templates, CRA guide outlines, and audit prep worksheets.
                  </p>
                  <Link
                    href="/download/sred-application-kit"
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
