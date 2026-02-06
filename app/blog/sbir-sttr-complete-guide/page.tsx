import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle, DollarSign, Target, AlertTriangle, Users, FileText,
  Clock, ChevronRight, ExternalLink, BookOpen, HelpCircle, Briefcase,
  TrendingUp, Building, Beaker, Shield, Zap
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SBIR & STTR Grants Complete Guide 2026 | Up to $1.7M Federal R&D Funding",
  description: "Complete guide to SBIR and STTR grants. Learn eligibility, application process, Phase I/II funding, and strategies to win up to $1.7M in non-dilutive federal R&D grants.",
  keywords: "SBIR grants, STTR grants, small business innovation research, federal R&D funding, Phase I Phase II grants, non-dilutive funding",
}

export default function SBIRSTTRGuidePage() {
  const faqData = [
    {
      question: "Do I need to repay SBIR/STTR funding?",
      answer: "No. SBIR/STTR awards are grants, not loans. They are 100% non-dilutive—no repayment and no equity required."
    },
    {
      question: "Can I apply to multiple agencies at once?",
      answer: "Yes, but not with the same proposal. Each proposal must be tailored to the specific agency's topic. Identical proposals are rejected."
    },
    {
      question: "What's the success rate?",
      answer: "Phase I success rates range from 15-25% depending on agency. Phase II rates are higher (35-50%) since the pool is smaller."
    },
    {
      question: "Who owns the IP?",
      answer: "You do. SBIR/STTR awardees retain IP rights to their innovations. The government gets only limited use rights for government purposes."
    }
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-700 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                <Beaker className="w-3 h-3 mr-1" /> America&apos;s Largest R&amp;D Grant Program
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                SBIR &amp; STTR Grants Complete Guide 2026
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Access up to $1.7 million in non-dilutive federal R&amp;D funding through
                America&apos;s premier innovation grant programs. Complete guide to eligibility,
                11 participating agencies, and proven winning strategies.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=sbir-sttr-application-help">
                  Get Expert Help with SBIR/STTR Applications
                </Link>
              </Button>
              <p className="text-blue-200 text-sm mt-4">
                Free consultation • 35% win rate • $50M+ secured for clients
              </p>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. SBIR vs STTR Overview</a></li>
                  <li><a href="#eligibility" className="text-blue-700 hover:underline">2. Who is Eligible?</a></li>
                  <li><a href="#funding" className="text-blue-700 hover:underline">3. How Much Funding?</a></li>
                  <li><a href="#phases" className="text-blue-700 hover:underline">4. Three-Phase Structure</a></li>
                  <li><a href="#agencies" className="text-blue-700 hover:underline">5. 11 Participating Agencies</a></li>
                  <li><a href="#how-to-apply" className="text-blue-700 hover:underline">6. How to Apply Step by Step</a></li>
                  <li><a href="#documents" className="text-blue-700 hover:underline">7. Required Documents</a></li>
                  <li><a href="#timeline" className="text-blue-700 hover:underline">8. Approval Timeline</a></li>
                  <li><a href="#mistakes" className="text-blue-700 hover:underline">9. Common Mistakes</a></li>
                  <li><a href="#winning-strategies" className="text-blue-700 hover:underline">10. Winning Strategies</a></li>
                  <li><a href="#alternatives" className="text-blue-700 hover:underline">11. Alternative Programs</a></li>
                  <li><a href="#faqs" className="text-blue-700 hover:underline">12. FAQs</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$4.1B+</div>
                  <div className="text-gray-600">Annual Awards</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">11</div>
                  <div className="text-gray-600">Federal Agencies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$1.7M</div>
                  <div className="text-gray-600">Max Phase II</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">23%</div>
                  <div className="text-gray-600">Avg Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What are SBIR and STTR Grants?</h2>

              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                  SBIR (Small Business Innovation Research) and STTR (Small Business Technology
                  Transfer) are America&apos;s largest sources of early-stage R&amp;D funding for
                  small businesses. Established by Congress, these programs require federal
                  agencies with large R&amp;D budgets to set aside a portion for small business innovation.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  The key difference: <strong>SBIR</strong> focuses on independent small business
                  innovation, while <strong>STTR</strong> requires formal collaboration with a
                  research institution (university or federal lab). Both provide 100% non-dilutive
                  funding—no equity required.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">SBIR (Small Business Innovation Research)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Small business must perform 67% of work (Phase I)</span></li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>PI must be primarily employed by the company</span></li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>No required research institution partner</span></li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>3.2% set-aside from agency R&amp;D budgets</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">STTR (Small Business Technology Transfer)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Small business performs 40%+ of work</span></li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Research institution performs 30%+ of work</span></li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>PI can be employed by either party</span></li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>0.45% set-aside from agency R&amp;D budgets</span></li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Who is Eligible for SBIR/STTR?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader><CardTitle className="flex items-center text-green-700"><CheckCircle className="w-5 h-5 mr-2" />Eligibility Requirements</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" /><span><strong>Small business</strong> – 500 or fewer employees</span></li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" /><span><strong>US-owned</strong> – 51%+ owned/controlled by US citizens or permanent residents</span></li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" /><span><strong>For-profit</strong> – operating in the United States</span></li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" /><span><strong>PI employment</strong> – Principal Investigator primarily employed by the company (SBIR)</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="flex items-center text-red-700"><AlertTriangle className="w-5 h-5 mr-2" />Disqualifying Factors</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start"><AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" /><span>Majority owned by large corporations or VCs</span></li>
                      <li className="flex items-start"><AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" /><span>Majority foreign ownership or control</span></li>
                      <li className="flex items-start"><AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" /><span>Non-profit organizations</span></li>
                      <li className="flex items-start"><AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" /><span>Federal debarment or outstanding debts</span></li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-gray-700"><strong>VC-Backed Companies:</strong> Since 2012, VC-backed companies can qualify for SBIR/STTR if the small business concern maintains control and is 51%+ US-owned through its chain of ownership.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Funding Section */}
        <section id="funding" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How Much Funding Can You Get?</h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Phase</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Funding Range</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Duration</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Phase I</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600 font-bold">$50K – $300K</td>
                      <td className="border border-gray-200 px-4 py-3">6-12 months</td>
                      <td className="border border-gray-200 px-4 py-3">Proof of concept, feasibility</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Phase II</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600 font-bold">$750K – $1.7M</td>
                      <td className="border border-gray-200 px-4 py-3">24 months</td>
                      <td className="border border-gray-200 px-4 py-3">Full R&amp;D, prototype development</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Phase III</td>
                      <td className="border border-gray-200 px-4 py-3">No SBIR funds</td>
                      <td className="border border-gray-200 px-4 py-3">Ongoing</td>
                      <td className="border border-gray-200 px-4 py-3">Commercialization (private/contract)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="text-gray-700"><strong>Key Advantage:</strong> SBIR/STTR funding is 100% non-dilutive—you keep full ownership of your company. No equity, no repayment required.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Phases Section */}
        <section id="phases" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">The Three-Phase Structure</h2>

              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50 rounded-r-lg">
                  <h3 className="text-xl font-bold mb-2">Phase I: Feasibility</h3>
                  <p className="text-gray-700 mb-3">Establish technical merit and feasibility of the proposed innovation. Demonstrate that the concept is scientifically sound and has commercial potential.</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white px-3 py-1 rounded border">💰 $50K-$300K</span>
                    <span className="bg-white px-3 py-1 rounded border">⏱️ 6-12 months</span>
                    <span className="bg-white px-3 py-1 rounded border">✅ Open to all eligible</span>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                  <h3 className="text-xl font-bold mb-2">Phase II: Development</h3>
                  <p className="text-gray-700 mb-3">Continue R&amp;D, build prototypes, and prepare for commercialization. Only Phase I recipients can apply—demonstrate Phase I success and commercial path.</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white px-3 py-1 rounded border">💰 $750K-$1.7M</span>
                    <span className="bg-white px-3 py-1 rounded border">⏱️ 24 months</span>
                    <span className="bg-white px-3 py-1 rounded border">🔒 Phase I winners only</span>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-lg">
                  <h3 className="text-xl font-bold mb-2">Phase III: Commercialization</h3>
                  <p className="text-gray-700 mb-3">No SBIR/STTR funds provided. Pursue commercialization through private investment, federal contracts, or partnership arrangements.</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white px-3 py-1 rounded border">💰 Private/Contract</span>
                    <span className="bg-white px-3 py-1 rounded border">⏱️ Ongoing</span>
                    <span className="bg-white px-3 py-1 rounded border">🚀 Market entry</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Agencies Section */}
        <section id="agencies" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">11 Participating Federal Agencies</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-4">Major Agencies (85% of funding)</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><DollarSign className="w-4 h-4 text-green-500 mr-2" /><span><strong>DoD:</strong> $1.8B annually (defense tech)</span></li>
                    <li className="flex items-center"><DollarSign className="w-4 h-4 text-green-500 mr-2" /><span><strong>NIH:</strong> $1.2B+ annually (biotech/health)</span></li>
                    <li className="flex items-center"><DollarSign className="w-4 h-4 text-green-500 mr-2" /><span><strong>DOE:</strong> $400M annually (energy tech)</span></li>
                    <li className="flex items-center"><DollarSign className="w-4 h-4 text-green-500 mr-2" /><span><strong>NSF:</strong> $250M annually (deep tech)</span></li>
                    <li className="flex items-center"><DollarSign className="w-4 h-4 text-green-500 mr-2" /><span><strong>NASA:</strong> $200M annually (space tech)</span></li>
                  </ul>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-4">Other Agencies</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" /><span><strong>USDA:</strong> Agriculture technology</span></li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" /><span><strong>DHS:</strong> Homeland security tech</span></li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" /><span><strong>DOT:</strong> Transportation tech</span></li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" /><span><strong>EPA:</strong> Environmental tech</span></li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" /><span><strong>ED:</strong> Education tech</span></li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" /><span><strong>NOAA:</strong> Atmospheric/ocean tech</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section id="how-to-apply" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Apply for SBIR/STTR</h2>

              <div className="space-y-4">
                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <div>
                    <h3 className="font-bold text-lg">Find Open Solicitations</h3>
                    <p className="text-gray-600 mt-1">Search SBIR.gov for open topics matching your technology. Each agency posts specific research areas they want to fund.</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <div>
                    <h3 className="font-bold text-lg">Register in Required Systems</h3>
                    <p className="text-gray-600 mt-1">Register in SAM.gov, obtain DUNS/UEI number, register with specific agency portals. Allow 4-6 weeks for registrations.</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <div>
                    <h3 className="font-bold text-lg">Prepare Your Proposal</h3>
                    <p className="text-gray-600 mt-1">Write technical proposal addressing the agency&apos;s requirements. Include technical approach, team qualifications, commercialization plan, and budget.</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                  <div>
                    <h3 className="font-bold text-lg">Submit Before Deadline</h3>
                    <p className="text-gray-600 mt-1">Submit through the agency&apos;s designated portal. Most deadlines are firm—late submissions are rejected.</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">5</div>
                  <div>
                    <h3 className="font-bold text-lg">Award and Negotiation</h3>
                    <p className="text-gray-600 mt-1">If selected, negotiate contract terms and begin work. Awards typically announced 4-6 months after deadline.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Documents Section */}
        <section id="documents" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Documents Are Required?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-4 flex items-center"><FileText className="w-5 h-5 text-blue-600 mr-2" />Technical Proposal</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /><span>Technical objectives and approach</span></li>
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /><span>Work plan and milestones</span></li>
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /><span>Key personnel qualifications</span></li>
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /><span>Facilities and equipment</span></li>
                  </ul>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-4 flex items-center"><Briefcase className="w-5 h-5 text-green-600 mr-2" />Administrative Documents</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Commercialization plan</span></li>
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Detailed budget and justification</span></li>
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Company information and certifications</span></li>
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Subcontractor agreements (if applicable)</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How Long Does SBIR/STTR Approval Take?</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Phase</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Timeline</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Registration</td>
                      <td className="border border-gray-200 px-4 py-3">4-6 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">SAM.gov, agency portals</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Proposal Writing</td>
                      <td className="border border-gray-200 px-4 py-3">4-8 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">First-time: longer</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Review Period</td>
                      <td className="border border-gray-200 px-4 py-3">3-6 months</td>
                      <td className="border border-gray-200 px-4 py-3">Agency-dependent</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Contract Negotiation</td>
                      <td className="border border-gray-200 px-4 py-3">2-8 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">If selected</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-bold">Total (Application to Award)</td>
                      <td className="border border-gray-200 px-4 py-3 font-bold">5-9 months</td>
                      <td className="border border-gray-200 px-4 py-3">Typical range</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section id="mistakes" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes That Get Proposals Rejected</h2>

              <div className="space-y-4">
                <Card><CardContent className="pt-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0"><span className="text-red-600 font-bold">1</span></div>
                    <div>
                      <h3 className="font-bold text-lg">Not Addressing the Topic</h3>
                      <p className="text-gray-600 mt-1">Proposals must directly address the agency&apos;s stated research topic, not just be &quot;in the same field.&quot; Read solicitations carefully.</p>
                    </div>
                  </div>
                </CardContent></Card>

                <Card><CardContent className="pt-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0"><span className="text-red-600 font-bold">2</span></div>
                    <div>
                      <h3 className="font-bold text-lg">Weak Commercialization Plan</h3>
                      <p className="text-gray-600 mt-1">Agencies want to see a path to market. Vague statements like &quot;we&apos;ll license it&quot; without customer validation are rejected.</p>
                    </div>
                  </div>
                </CardContent></Card>

                <Card><CardContent className="pt-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0"><span className="text-red-600 font-bold">3</span></div>
                    <div>
                      <h3 className="font-bold text-lg">Insufficient Innovation</h3>
                      <p className="text-gray-600 mt-1">Proposals must demonstrate genuine technical innovation—incremental improvements to existing solutions don&apos;t qualify.</p>
                    </div>
                  </div>
                </CardContent></Card>

                <Card><CardContent className="pt-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0"><span className="text-red-600 font-bold">4</span></div>
                    <div>
                      <h3 className="font-bold text-lg">Late or Incomplete Submissions</h3>
                      <p className="text-gray-600 mt-1">Missing required forms, exceeding page limits, or submitting after the deadline. Technical compliance is critical.</p>
                    </div>
                  </div>
                </CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        {/* Winning Strategies Section */}
        <section id="winning-strategies" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Winning Strategies for SBIR/STTR</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-bold text-lg mb-3 flex items-center"><Zap className="w-5 h-5 text-green-600 mr-2" />Pre-Application</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Contact program managers before applying</li>
                    <li>• Attend agency-specific SBIR conferences</li>
                    <li>• Review previously funded proposals</li>
                    <li>• Build relationships with research institutions</li>
                  </ul>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-lg mb-3 flex items-center"><Target className="w-5 h-5 text-blue-600 mr-2" />Proposal Writing</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Lead with the problem, not your solution</li>
                    <li>• Use clear metrics and milestones</li>
                    <li>• Include letters of intent from customers</li>
                    <li>• Highlight team&apos;s relevant prior work</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alternatives Section */}
        <section id="alternatives" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Alternative Federal R&amp;D Programs</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">NSF I-Corps</h3>
                  <p className="text-gray-600 text-sm mb-3">Customer discovery training with $50K grant. Great pre-SBIR validation.</p>
                  <Link href="/blog/nsf-sbir-grants-technology-startups" className="text-blue-700 hover:underline text-sm">NSF Programs Guide →</Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">ARPA Programs</h3>
                  <p className="text-gray-600 text-sm mb-3">DARPA, ARPA-E, ARPA-H for breakthrough technology development.</p>
                  <Link href="/blog/dod-sbir-defense-tech-grants" className="text-blue-700 hover:underline text-sm">Defense Tech Grants →</Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">SBA 7(a) Loans</h3>
                  <p className="text-gray-600 text-sm mb-3">Government-backed business loans up to $5M for growth capital.</p>
                  <Link href="/blog/sba-7a-loans-complete-guide" className="text-blue-700 hover:underline text-sm">SBA 7(a) Guide →</Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">State R&amp;D Programs</h3>
                  <p className="text-gray-600 text-sm mb-3">Many states offer matching funds for SBIR winners.</p>
                  <Link href="/blog/state-local-business-grants-guide" className="text-blue-700 hover:underline text-sm">State Grants Guide →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg flex items-start">
                        <HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                        {faq.question}
                      </h3>
                      <p className="text-gray-700 mt-2 ml-7">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Resources</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/nsf-sbir-grants-technology-startups" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-blue-600">NSF SBIR Deep Dive</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/nih-sbir-biotech-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-blue-600">NIH SBIR for Biotech</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/dod-sbir-defense-tech-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-blue-600">DoD SBIR Defense Tech</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/guides" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-blue-600">All Grant Guides</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-700 to-purple-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Ready to Win SBIR/STTR Funding?</h2>
              <p className="text-xl text-blue-100 mb-8">Our SBIR specialists have helped companies secure over $50M in federal R&amp;D grants. From topic selection to proposal writing to Phase II transitions—we know what wins.</p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our SBIR Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /><span>Topic selection strategy</span></div>
                  <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /><span>Proposal writing and review</span></div>
                  <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /><span>Commercialization plan</span></div>
                  <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /><span>Budget development</span></div>
                  <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /><span>Compliance review</span></div>
                  <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /><span>35% win rate</span></div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=sbir-sttr-application-help">Get Expert Help with SBIR/STTR</Link>
              </Button>
              <p className="text-blue-200 text-sm mt-4">Free consultation • Avg Phase I: $215K • Phase II: $1.1M</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
