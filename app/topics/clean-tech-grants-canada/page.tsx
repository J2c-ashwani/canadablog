import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Clean Tech Grants Canada Guide 2026 | Sustainability Funding",
  description: "Navigate government grants for clean technology and sustainability in Canada. Learn about SDTC, Net Zero Accelerator, and provincial offsets.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/clean-tech-grants-canada",
  },
  robots: { index: true, follow: true },
}

export default function CleanTechGrantsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/clean-tech-grants-canada#webpage",
        "url": "https://www.fsidigital.ca/topics/clean-tech-grants-canada",
        "name": "Clean Tech Grants Canada Guide 2026 | Sustainability Funding",
        "description": "Navigate government grants for clean technology and sustainability in Canada. Learn about SDTC, Net Zero Accelerator, and provincial offsets.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "Clean Tech Grants", "item": "https://www.fsidigital.ca/topics/clean-tech-grants-canada" }
          ]
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://www.fsidigital.ca/topics/clean-tech-grants-canada#howto",
        "name": "How to Apply for Clean Tech Funding in Canada",
        "description": "Step-by-step process to apply for and secure federal and provincial clean technology and sustainability grants.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Formulate Environmental Performance Baseline",
            "text": "Calculate your project's projected environmental benefits, specifically quantifying greenhouse gas (GHG) reductions (in CO2 equivalents), water savings, or waste diversion."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Conduct Technical Feasibility Assessment",
            "text": "Produce a robust technical brief demonstrating that your technology is beyond the basic conceptual phase (usually Technology Readiness Level 4 to 8) and is ready for demonstration or scaling."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Secure Co-Funding Matching Balance",
            "text": "Confirm the availability of required matching funds (typically 50% to 67% of eligible costs) from private equity, institutional debt, or internal cash flow."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Submit Expression of Interest (EOI)",
            "text": "Complete the initial screening portal or Expression of Interest form with the target federal delivery agency (e.g. ISED or regional development agency) or provincial funding body."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/clean-tech-grants-canada#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What grants are available for clean technology in Canada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Canada offers several key clean tech programs, including federal support through Innovation, Science and Economic Development (ISED) clean growth streams, the Net Zero Accelerator, the Smart Renewables and Electrification Pathways (SREPs) program, and provincial bodies like Emissions Reduction Alberta (ERA) and CleanBC."
            }
          },
          {
            "@type": "Question",
            "name": "What is SDTC and does it still fund projects?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sustainable Development Technology Canada (SDTC) was the primary federal vehicle for pre-commercial clean tech funding. While it is undergoing structural integration into the National Research Council (NRC), its clean technology development funding streams continue to operate under federal oversight to support early-stage innovation."
            }
          },
          {
            "@type": "Question",
            "name": "How much funding can a clean tech project receive?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Funding ranges from $100,000 for early-stage development to over $10 million for large-scale industrial decarbonization and net-zero technology deployments. Federal matching typically covers between 33% and 50% of eligible project costs."
            }
          },
          {
            "@type": "Question",
            "name": "Do clean tech grants support machinery installation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, many programs support capital expenditures (CapEx) associated with purchasing and installing green energy equipment, waste reduction machinery, and energy-efficient building systems, provided they deliver measurable environmental offsets."
            }
          },
          {
            "@type": "Question",
            "name": "What are the primary criteria for clean tech grant approval?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Projects are evaluated on three primary pillars: technical feasibility (TRL rating), commercial potential (market size and adoption path), and quantified environmental benefits (GHG emissions reduction, resource conservation)."
            }
          },
          {
            "@type": "Question",
            "name": "Can agricultural businesses apply for sustainability grants?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Programs like the Agricultural Clean Technology (ACT) Program provide non-repayable contributions to help Canadian farmers and agri-businesses adopt clean technologies, focus on precision agriculture, and implement energy efficiency upgrades."
            }
          },
          {
            "@type": "Question",
            "name": "Can clean tech grants be stacked with SR&ED tax credits?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, clean tech grants can be stacked with the SR&ED tax credit program. However, any government grants received must be deducted from your SR&ED eligible expenditure base, reducing the size of the tax credit claim."
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
      <section className="bg-gradient-to-b from-emerald-950 via-slate-950 to-emerald-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.1),transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 mb-6 uppercase tracking-wider">
              Green Technology & Decarbonization Funding
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Clean Tech Grants & Sustainability Funding
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Accelerate your sustainability roadmap. Access federal green innovation funds, agricultural clean tech grants, and provincial emissions reduction programs to offset your energy transformation capital.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#clean-tech-grants"
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Explore Green Grants <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="bg-slate-900/80 hover:bg-slate-900 text-slate-200 border border-slate-700/60 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
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
              <span className="block text-3xl font-extrabold text-slate-900">Up to 33%–50%</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Federal Co-Funding Offset</span>
            </div>
            <div className="border-l-4 border-emerald-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">$100K–$10M+</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Typical Program Value</span>
            </div>
            <div className="border-l-4 border-emerald-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">GHG Offset</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Core Approval Metric</span>
            </div>
            <div className="border-l-4 border-emerald-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">ACT Program</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Agri-Business Incentives</span>
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
                  Clean technology is at the forefront of Canada's economic and environmental policy. As businesses face pressure to decarbonize operations, reduce waste, and transition to renewable energy sources, federal and provincial governments have responded with **billions of dollars in non-dilutive grants, tax incentives, and low-interest credit support**.
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  These incentives are designed to support every phase of the sustainability lifecycle—from early-stage laboratory R&D and pre-commercial pilot projects to full-scale commercial deployment of green hardware. Programs target several high-impact areas, including smart grids, renewable energy generation, precision agriculture, and waste heat recovery.
                </p>
              </section>

              {/* Core Programs */}
              <section id="clean-tech-grants" className="space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Active Canadian Clean Tech Funding Programs</h2>
                
                <div className="space-y-6">
                  {/* Clean Growth Program / Successors */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Federal Clean Technology Funding Streams</h3>
                      <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-bold shrink-0">Up to 50% Co-Funding</span>
                    </div>
                    <p className="text-slate-655 text-xs sm:text-sm leading-relaxed">
                      Federal programs delivered by Innovation, Science and Economic Development (ISED) and the National Research Council (NRC) support development and validation of clean technologies. These grants provide non-repayable matching funds to cover up to 50% of salaries, equipment testing, and certification costs for systems that demonstrate clear environmental offsets.
                    </p>
                  </div>

                  {/* ACT Program */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Agricultural Clean Technology (ACT) Program</h3>
                      <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-bold shrink-0">Up to $2M Grant</span>
                    </div>
                    <p className="text-slate-655 text-xs sm:text-sm leading-relaxed">
                      A dedicated federal initiative supporting Canadian farmers and agricultural processors. It provides non-repayable grants (up to $2 million per project) for adopting commercialized clean technologies. Key focus areas include energy efficiency (such as grain dryer upgrades), clean energy adoption, and precision agriculture equipment that reduces fertilizer and pesticide runoffs.
                    </p>
                  </div>

                  {/* Net Zero Accelerator */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Net Zero Accelerator (SIF Stream 5)</h3>
                      <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-750 text-xs font-bold shrink-0">Industrial Scale-Up</span>
                    </div>
                    <p className="text-slate-655 text-xs sm:text-sm leading-relaxed">
                      Part of the Strategic Innovation Fund, this stream provides massive financing (loans and grants) to help Canada's largest industrial emitters decarbonize their operations, transition to green energy, and scale domestic clean tech manufacturing. It typically supports large projects with capital expenditures in excess of $10 million.
                    </p>
                  </div>
                </div>
              </section>

              {/* Step-by-Step Guide */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">How to Apply for Clean Tech Grants</h2>
                <div className="relative border-l-2 border-emerald-200 pl-6 ml-3 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-emerald-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">1. Quantify Your Environmental Benefits</h3>
                    <p className="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                      Draft a metrics baseline. You must calculate the projected GHG reductions (in metric tons of CO2 equivalent per year), energy offsets, or water conservation targets. These figures must be backed by engineering assumptions.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-emerald-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">2. Determine Technology Readiness Level (TRL)</h3>
                    <p className="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                      Map your technology to the standard 1-9 TRL scale. Early-stage R&D (TRL 1-4) is best suited for NRC IRAP or SR&ED, while demonstration projects (TRL 5-7) and commercial scale-up (TRL 8-9) match capital expenditure grant programs.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-emerald-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">3. Secure Matching Funds and Submit Proposal</h3>
                    <p className="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                      Confirm that your corporation possesses the matching balance (often 50% or more) through private capital or bank financing. Submit your proposal or Expression of Interest through the relevant agency portal, and prepare for a 3-to-6 month review process.
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What grants are available for clean technology in Canada?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Canada offers several key clean tech programs, including federal support through Innovation, Science and Economic Development (ISED) clean growth streams, the Net Zero Accelerator, the Smart Renewables and Electrification Pathways (SREPs) program, and provincial bodies like Emissions Reduction Alberta (ERA) and CleanBC.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is SDTC and does it still fund projects?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Sustainable Development Technology Canada (SDTC) was the primary federal vehicle for pre-commercial clean tech funding. While it is undergoing structural integration into the National Research Council (NRC), its clean technology development funding streams continue to operate under federal oversight to support early-stage innovation.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How much funding can a clean tech project receive?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Funding ranges from $100,000 for early-stage development to over $10 million for large-scale industrial decarbonization and net-zero technology deployments. Federal matching typically covers between 33% and 50% of eligible project costs.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Do clean tech grants support machinery installation?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Yes, many programs support capital expenditures (CapEx) associated with purchasing and installing green energy equipment, waste reduction machinery, and energy-efficient building systems, provided they deliver measurable environmental offsets.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What are the primary criteria for clean tech grant approval?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Projects are evaluated on three primary pillars: technical feasibility (TRL rating), commercial potential (market size and adoption path), and quantified environmental benefits (GHG emissions reduction, resource conservation).
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can agricultural businesses apply for sustainability grants?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Yes. Programs like the Agricultural Clean Technology (ACT) Program provide non-repayable contributions to help Canadian farmers and agri-businesses adopt clean technologies, focus on precision agriculture, and implement energy efficiency upgrades.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can clean tech grants be stacked with SR&ED tax credits?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Yes, clean tech grants can be stacked with the SR&ED tax credit program. However, any government grants received must be deducted from your SR&ED eligible expenditure base, reducing the size of the tax credit claim.
                    </p>
                  </div>
                </div>
              </section>

              {/* Related Programs & Topics (Mesh) */}
              <div className="border-t border-slate-200 pt-8 mt-12 space-y-6">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Related Programs</span>
                  <div className="flex flex-wrap gap-2.5">
                    <Link href="/programs/act-agri-clean-tech" className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-slate-800">ACT AgTech Grant</Link>
                    <Link href="/programs/sred-tax-credit" className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-slate-800">SR&ED tax credit</Link>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Related Topics</span>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Link href="/topics/government-grants-for-manufacturing-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-355 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 text-sm inline-flex items-center gap-1">Manufacturing Grants <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Explore funding offsets for industrial automation and machinery upgrades.</p>
                    </Link>
                    <Link href="/topics/federal-grants-small-business-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-355 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 text-sm inline-flex items-center gap-1">Federal Grants Canada <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Review the complete national non-dilutive funding matrix for Canadian SMEs.</p>
                    </Link>
                  </div>
                </div>
              </div>

            </article>

            {/* Right Column - Premium Sticky CTAs */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">
                
                {/* CTA 1: Calculator */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-md">
                  <Calculator className="w-8 h-8 text-slate-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Estimate Your Green Return</h3>
                  <p className="text-slate-200 text-xs leading-relaxed mb-6">
                    Our funding calculator helps estimate your eligible SR&ED offsets and green technology project reimbursements instantly.
                  </p>
                  <Link
                    href="/calculator"
                    className="w-full bg-emerald-750 hover:bg-emerald-750/90 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Launch Funding Calculator
                  </Link>
                </div>

                {/* CTA 2: AI Finder */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <Sparkles className="w-8 h-8 text-slate-600 mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-2">Find 800+ Green Grants</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Connect with our proprietary AI Funding Finder to match your clean tech project against active municipal, provincial, and national programs.
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
                  <Download className="w-8 h-8 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download Clean Tech Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Get our comprehensive clean tech and energy grants application guide. Detailed checklists for sustainable funding success.
                  </p>
                  <Link
                    href="/download/clean-tech-energy-grants-guide"
                    className="w-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Download Clean Tech Guide (PDF)
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
