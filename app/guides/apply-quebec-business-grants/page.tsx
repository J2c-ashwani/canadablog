import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Shield, Award, TrendingUp, Globe, MessageCircle, HelpCircle, Lightbulb, ArrowRight, BarChart3, Zap, BookOpen, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quebec Business Grants 2025: Complete Application Guide | Investissement Québec, ESSOR, R&D Credits",
  description: "Complete 2025 guide to Quebec provincial funding. Step-by-step process for Investissement Québec loans, ESSOR grants up to $15M, and 30% R&D tax credits. Bilingual support available.",
  keywords: "Quebec business grants, Investissement Québec, ESSOR program, aide aux entreprises, R&D tax credits quebec, subvention quebec, CDAE tax credit, Impulsion PME",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-quebec-business-grants",
  },
  openGraph: {
    title: "Quebec Business Grants 2025: Complete Application Guide",
    description: "Unlock up to $15M in Quebec provincial funding. Learn the step-by-step process for ESSOR, IQ loans, and R&D credits.",
    url: "https://www.fsidigital.ca/guides/apply-quebec-business-grants",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the main business grant agency in Quebec?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Investissement Québec (IQ) is the primary agency. Unlike other provinces, IQ consolidates loans, equity investments, and grants into a single entry point for businesses. They manage over $3.2 billion in annual provincial investment."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to operate in French to get Quebec government funding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Generally, yes. With Bill 96 strengthening the Charter of the French Language, official documentation and agreements with the Quebec government usually require French. You can often inquire in English initially, but formal submissions need to be in French."
      }
    },
    {
      "@type": "Question",
      "name": "Is the ESSOR program a grant or a loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ESSOR is typically a mix of both. It often provides interest-free loans or 'non-repayable contributions' (grants) for specific project phases like feasibility studies (up to $50K) or environmental upgrades. Large capital projects may receive loans up to $15M."
      }
    },
    {
      "@type": "Question",
      "name": "How much can Quebec R&D tax credits cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quebec offers some of the highest R&D rates in North America. The provincial credit alone can reach up to 30% for eligible SMEs. When stacked with federal SR&ED credits, businesses can recover 60-75% of eligible R&D salaries."
      }
    },
    {
      "@type": "Question",
      "name": "What is the CDAE tax credit in Quebec?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CDAE (Crédit d'impôt pour le développement des affaires électroniques) is a refundable tax credit for e-business activities. It covers up to 24% of eligible salaries for software development, IT services, and digital solutions development in Quebec."
      }
    },
    {
      "@type": "Question",
      "name": "Can startups apply for Investissement Québec funding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! The Impulsion PME program specifically targets young innovative companies with high growth potential. It provides loans and equity investments, though it typically requires matching private investment from angel investors or VCs."
      }
    }
  ]
}

export default function QuebecBusinessGrantsGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-800 to-indigo-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/10 text-blue-100 border-blue-200/20 backdrop-blur-sm px-4 py-1.5 text-sm">
                ⚜️ Guide Complet / Complete Guide 2025
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                How to Apply for <br className="hidden md:block" />Quebec Business Grants
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Unlock funding from <strong>Investissement Québec</strong>, ESSOR, and R&D programs.
                The essential guide for Quebec entrepreneurs navigating Canada's most sophisticated provincial funding ecosystem.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-bold" asChild>
                  <Link href="#process">See Application Process</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                  <Link href="#top-programs">Explore Programs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 1. QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm/50">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
              <span className="font-semibold text-gray-900 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
                Common Questions:
              </span>
              <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link href="#language" className="hover:text-blue-600 transition-colors">Language Rules?</Link>
                <Link href="#essor" className="hover:text-blue-600 transition-colors">What is ESSOR?</Link>
                <Link href="#iq" className="hover:text-blue-600 transition-colors">Investissement Québec?</Link>
                <Link href="#rd" className="hover:text-blue-600 transition-colors">R&D Credits?</Link>
                <Link href="#timeline" className="hover:text-blue-600 transition-colors">How Long?</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Overview Stats */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">$15M</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Max ESSOR Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">30%</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">R&D Tax Credit</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-1">$3.2B</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Annual Investment</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-1">60+</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Program Streams</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

              {/* Understanding Quebec's Unique Ecosystem */}
              <div id="process" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How does the Quebec funding ecosystem work?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Quebec operates a fundamentally different funding model than the rest of Canada. While provinces like Ontario and British Columbia
                  scatter their business support across dozens of independent agencies, Quebec centralizes almost everything under one powerful institution:
                  <strong> Investissement Québec (IQ)</strong>. Understanding this structure is the first step to successfully accessing provincial funding.
                </p>

                <div id="iq" className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
                  <div className="flex items-start">
                    <Globe className="w-8 h-8 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">The "Investissement Québec" Advantage</h4>
                      <p className="text-blue-800 leading-relaxed mb-4">
                        Investissement Québec isn't just a grant agency—it's a full-service state financing corporation. They act as your
                        banker, equity investor, and grant administrator all in one. This "one-stop-shop" model means you can potentially
                        assemble a complete financing package (grants + loans + equity) with a single relationship.
                      </p>
                      <ul className="text-blue-700 space-y-2 text-sm">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-blue-500" /> Over $3.2 billion in annual provincial investment</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-blue-500" /> 22,000+ businesses supported annually</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-blue-500" /> Regional offices across all Quebec administrative regions</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-blue-500" /> Dedicated sector specialists for key industries</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">The Quebec Application Process: Step-by-Step</h3>

                <div className="relative border-l-2 border-blue-100 pl-8 ml-4 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">1</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Regional Bureau Contact</h4>
                    <p className="text-gray-600 mb-3">
                      Your journey typically starts by contacting your local IQ regional office. Quebec emphasizes relationship-based funding—
                      your assigned account manager (conseiller) becomes your guide through the system. They'll assess your needs and direct
                      you to appropriate programs.
                    </p>
                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                      <strong>Pro Tip:</strong> Request a "diagnostic stratégique" (strategic diagnostic) meeting. This free consultation helps
                      identify all programs you may be eligible for, not just the one you initially inquired about.
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">2</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Innovation Diagnosis (ADRIQ-RCTi)</h4>
                    <p className="text-gray-600 mb-3">
                      For technology and innovation projects, you may need an assessment from ADRIQ (Association pour le développement de la
                      recherche et de l'innovation du Québec) or the RCTi network. This validates your technical plan and innovation claims
                      before the funding application proceeds.
                    </p>
                    <div className="bg-yellow-50 p-3 rounded text-sm text-yellow-800 border border-yellow-100">
                      <strong>Important:</strong> The diagnosis isn't optional for R&D-focused applications. Budget 4-6 weeks for this step.
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">3</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">The Financial Package (Montage Financier)</h4>
                    <p className="text-gray-600 mb-3">
                      Quebec rarely provides 100% grant funding. Instead, they structure "financial packages" that combine multiple instruments.
                      A typical package might include:
                    </p>
                    <ul className="text-gray-600 space-y-2 ml-4 mb-3">
                      <li>• 25% non-repayable contribution (grant)</li>
                      <li>• 50% interest-free or low-interest loan</li>
                      <li>• 25% equity investment (for high-growth ventures)</li>
                    </ul>
                    <p className="text-gray-600">
                      This blended approach means Quebec can support larger projects than pure-grant provinces, but requires more sophisticated
                      financial planning from applicants.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-green-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">4</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Due Diligence & Approval</h4>
                    <p className="text-gray-600">
                      IQ conducts thorough due diligence including financial audits, management team assessment, market analysis, and technical
                      feasibility review. Larger projects may require approval from IQ's investment committee. Timeline varies from 6-12 weeks
                      for smaller initiatives to 4-6 months for major investments.
                    </p>
                  </div>
                </div>
              </div>

              {/* Top Quebec Programs Section */}
              <div id="top-programs" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What are the top Quebec grant programs?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Quebec offers over 60 distinct funding streams, but these flagship programs represent the most significant opportunities
                  for growing businesses. Each targets specific business needs and growth stages.
                </p>

                <div className="space-y-6">
                  {/* ESSOR Program */}
                  <div id="essor" className="border border-blue-200 rounded-lg p-6 bg-blue-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-blue-700 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        ESSOR Program
                      </h3>
                      <Badge className="bg-blue-100 text-blue-800">Up to $15M</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      The flagship productivity and competitiveness program for manufacturers, distributors, and wholesalers. ESSOR
                      (Entreprises souples, sécuritaires, ouvertes et responsables) supports capital investments, digital transformation,
                      and international expansion.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Program Components:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-blue-500" /> <strong>Component 1A:</strong> Feasibility studies (grants up to $50K)</li>
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-blue-500" /> <strong>Component 1B:</strong> Capital projects (loans up to $15M)</li>
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-blue-500" /> <strong>Component 2:</strong> Environmental impact reduction</li>
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-blue-500" /> <strong>Component 3:</strong> Internationalization strategies</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Eligible Sectors:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Manufacturing and industrial production</li>
                          <li>• Wholesale trade and distribution</li>
                          <li>• Transportation and warehousing</li>
                          <li>• Selected professional services</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-blue-100 text-sm">
                      <strong className="text-blue-800">Success Factor:</strong> ESSOR heavily weights productivity metrics. Come prepared with
                      baseline KPIs and projected improvements (e.g., units per labor hour, defect rates, cycle times).
                    </div>
                  </div>

                  {/* Impulsion PME */}
                  <div className="border border-green-200 rounded-lg p-6 bg-green-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-green-700 flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Impulsion PME
                      </h3>
                      <Badge className="bg-green-100 text-green-800">Startups & Scale-ups</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Quebec's program for young innovative companies with high growth potential. Impulsion PME provides financing
                      (typically loans or quasi-equity) to help startups reach commercial viability and scale. It's specifically
                      designed to complement private investment.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Key Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Loans from $50K to $500K+</li>
                          <li>• Flexible repayment terms (often deferred)</li>
                          <li>• Requires matching private investment</li>
                          <li>• Technology and innovation focus</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Ideal Candidates:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Post-seed, pre-Series A companies</li>
                          <li>• Tech startups with proven MVP</li>
                          <li>• Companies with angel or VC backing</li>
                          <li>• High-growth potential businesses</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* R&D Tax Credits */}
                  <div id="rd" className="border border-purple-200 rounded-lg p-6 bg-purple-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-purple-700 flex items-center">
                        <Award className="w-5 h-5 mr-2" />
                        Quebec R&D Tax Credits (Provincial + CDAE)
                      </h3>
                      <Badge className="bg-purple-100 text-purple-800">Up to 30% Refund</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Quebec offers some of the most generous R&D tax incentives in North America. The provincial R&D credit provides
                      up to 30% for eligible SMEs, and when stacked with federal SR&ED, total recovery can reach 60-75% of eligible
                      R&D salaries. The CDAE (e-business) credit adds another layer for software development.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-semibold text-purple-900 mb-2">Provincial R&D Credits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Basic Credit:</strong> 14% refundable for all qualifying activities</li>
                          <li>• <strong>Enhanced Credit:</strong> Up to 30% for eligible SMEs</li>
                          <li>• <strong>University Partnership:</strong> Additional 14% for collaboration</li>
                          <li>• <strong>Consortium Credit:</strong> 35% for pre-competitive research</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-purple-900 mb-2">CDAE E-Business Credit:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Covers software development activities</li>
                          <li>• Up to 24% of eligible salaries</li>
                          <li>• Applicable to IT consulting and services</li>
                          <li>• Can be combined with R&D credits</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-purple-100 text-sm">
                      <strong className="text-purple-800">Expert Tip:</strong> Many Quebec companies leave money on the table by not
                      stacking credits properly. Engage an SR&ED consultant who understands both federal and Quebec systems.
                    </div>
                  </div>

                  {/* PSCE Program */}
                  <div className="border border-orange-200 rounded-lg p-6 bg-orange-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-orange-700 flex items-center">
                        <Globe className="w-5 h-5 mr-2" />
                        PSCE (Commercialization & Export)
                      </h3>
                      <Badge className="bg-orange-100 text-orange-800">Up to $250K</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      The Programme de soutien à la commercialisation et à l'exportation helps Quebec businesses expand into new
                      markets—both domestically and internationally. It funds market research, trade missions, marketing campaigns,
                      and sales force development.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-orange-500" /> Component 1: Market development and commercialization ($25K-$250K)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-orange-500" /> Component 2: International market expansion and export</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-orange-500" /> Component 3: Marketing strategy development (up to $100K)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Language Requirements Section */}
              <div id="language" className="bg-yellow-50 rounded-xl p-8 mb-8 border border-yellow-100">
                <h2 className="text-2xl font-bold text-yellow-900 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2" />
                  The Language Requirement (Bill 96)
                </h2>
                <p className="text-yellow-800 mb-4 leading-relaxed">
                  <strong>Critical Consideration:</strong> Quebec's language laws significantly impact business funding. Bill 96 (2022)
                  strengthened the Charter of the French Language, meaning that to receive contracts or funding from the Quebec government,
                  your business must generally comply with francisation requirements.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">What This Means:</h4>
                    <ul className="list-disc list-inside text-yellow-800 space-y-2 text-sm">
                      <li>All contracts with the Quebec government will be in French</li>
                      <li>Official documentation must be submitted in French</li>
                      <li>Communication with officials is expected to be in French</li>
                      <li>Businesses with 25+ employees need a "Francisation" certificate</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Practical Steps:</h4>
                    <ul className="list-disc list-inside text-yellow-800 space-y-2 text-sm">
                      <li>Engage a bilingual consultant or translator</li>
                      <li>Have French-speaking team members handle government relations</li>
                      <li>Budget for professional translation of application materials</li>
                      <li>Consider French language training for key personnel</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white p-4 rounded border border-yellow-200">
                  <p className="text-sm text-yellow-900">
                    <strong>Silver Lining:</strong> While the language requirements add complexity, they also reduce competition.
                    Many out-of-province companies skip Quebec programs entirely, leaving more funding available for those willing
                    to navigate the bilingual requirements.
                  </p>
                </div>
              </div>

              {/* Timeline Section */}
              <div id="timeline" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How long does the Quebec application process take?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Quebec's centralized system can be faster than other provinces for straightforward applications, but complex
                  projects requiring investment committee approval take longer. Plan your timeline accordingly.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left font-semibold text-gray-900">Program Type</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-900">Typical Timeline</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-900">Key Variable</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 px-4 text-gray-700">R&D Tax Credits (CDAE/Provincial)</td>
                        <td className="py-3 px-4 text-gray-600">6-12 months (filed with tax return)</td>
                        <td className="py-3 px-4 text-gray-500 text-sm">CRA/Revenu Québec processing</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="py-3 px-4 text-gray-700">ESSOR Feasibility Studies (&lt;$50K)</td>
                        <td className="py-3 px-4 text-gray-600">6-10 weeks</td>
                        <td className="py-3 px-4 text-gray-500 text-sm">Completeness of application</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-700">ESSOR Capital Projects ($500K+)</td>
                        <td className="py-3 px-4 text-gray-600">3-6 months</td>
                        <td className="py-3 px-4 text-gray-500 text-sm">Investment committee schedule</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="py-3 px-4 text-gray-700">Impulsion PME</td>
                        <td className="py-3 px-4 text-gray-600">8-14 weeks</td>
                        <td className="py-3 px-4 text-gray-500 text-sm">Private co-investor readiness</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-700">Large Strategic Projects ($5M+)</td>
                        <td className="py-3 px-4 text-gray-600">4-9 months</td>
                        <td className="py-3 px-4 text-gray-500 text-sm">Due diligence depth</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3. FAQ ANCHOR: Dedicated Block */}
              <div id="faq" className="bg-gray-50 rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">1. Are Quebec government grants taxable?</h3>
                    <p className="text-gray-600 text-sm">Yes. Unless specifically exempted (rare), government grants are considered taxable income at both federal and provincial levels. Consult <Link href="https://www.revenuquebec.ca/en/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Revenu Québec</Link> for details.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">2. Can I apply in English initially?</h3>
                    <p className="text-gray-600 text-sm">You can often find English information online and may speak with bilingual advisors initially. However, per <Link href="https://www.quebec.ca/en/government/policies-orientations/french-language" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Bill 96</Link>, your formal application submission and all official documentation will need to be in French.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">3. What if I'm not incorporated in Quebec?</h3>
                    <p className="text-gray-600 text-sm">Most programs require Quebec-based operations. An extra-provincial registration with significant Quebec operations may qualify if you can demonstrate substantial economic benefits for the province.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">4. Can I stack Quebec and federal programs?</h3>
                    <p className="text-gray-600 text-sm">Absolutely. Quebec explicitly encourages stacking. For example, R&D tax credits and <Link href="https://ced.canada.ca/en" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">CED-Quebec</Link> grants can often be combined with IQ financing for a comprehensive package.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">5. Is the Montreal AI ecosystem relevant?</h3>
                    <p className="text-gray-600 text-sm">Yes. Montreal is a global AI hub. <Link href="https://mila.quebec/en/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Mila</Link> and <Link href="https://www.scaleai.ca/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Scale AI</Link> offer specialized support beyond standard IQ programs.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">6. How does Investissement Québec (IQ) differ from banks?</h3>
                    <p className="text-gray-600 text-sm">IQ is risk-tolerant and policy-driven. While sustainable, they will often finance projects that commercial banks view as too risky, provided there is strong economic development potential for Quebec.</p>
                  </div>
                </div>
              </div>

              {/* 4. NEURAL NETWORK: Related Guides */}
              <div className="border-t border-gray-200 pt-12 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Related Funding Opportunities</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Link href="/blog/ontario-business-grants" className="group block">
                    <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-blue-600 font-semibold mb-2">Provincial Peer</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">Ontario Business Grants</h4>
                      <p className="text-sm text-gray-500">Compare with Canada's largest provincial economy.</p>
                    </div>
                  </Link>
                  <Link href="/guides/sred-application-guide" className="group block">
                    <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-purple-600 font-semibold mb-2">Federal Stacking</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">SR&ED Guide</h4>
                      <p className="text-sm text-gray-500">Stack Quebec R&D credits with Federal SR&ED for 60%+ recovery.</p>
                    </div>
                  </Link>
                  <Link href="/guides/irap-innovation-application-guide" className="group block">
                    <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-green-600 font-semibold mb-2">Innovation</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-green-700 mb-2">IRAP Grant Guide</h4>
                      <p className="text-sm text-gray-500">Federal R&D funding that complements Quebec programs.</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Official Resources */}
              <div id="official-resources" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official Quebec Resources</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-blue-800 text-lg flex items-center">
                        <Building className="w-5 h-5 mr-2" />
                        Investissement Québec
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">The first and most important stop for any business financing in Quebec.
                        They manage everything from startup loans to major industrial investments.</p>

                      <Button size="sm" variant="outline" className="w-full justify-between" asChild>
                        <Link href="https://www.investquebec.com/quebec/en" target="_blank" rel="noopener noreferrer">
                          Visit IQ Website <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-green-800 text-lg flex items-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        MEIE (Ministry)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">Ministry of Economy, Innovation and Energy. Oversees provincial economic
                        policy and many strategic programs including ESSOR.</p>
                      <Button size="sm" className="w-full justify-between bg-green-600 hover:bg-green-700 text-white" asChild>
                        <Link href="https://www.economie.gouv.qc.ca/" target="_blank" rel="noopener noreferrer">
                          Visit MEIE <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Need Help Navigating Quebec Funding?</h3>
                <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                  Our Quebec funding specialists have secured over $14M in provincial funding with an 88% success rate.
                  Get expert guidance through IQ applications, R&D credits, and ESSOR programs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50 font-semibold" asChild>
                    <Link href="/contact?service=quebec-business-expert-help">
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                    <Link href="/grant-finder">
                      Browse All Programs
                    </Link>
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
