import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Clock, DollarSign, Target, CheckCircle, AlertCircle, MapPin, Users, Building2, BookOpen, HelpCircle, ChevronRight, AlertTriangle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "State & Local Business Grants Guide 2026 | Regional Economic Development Funding",
  description: "Complete guide to state and local business grants. Find economic development incentives, job creation programs, and regional funding up to $500K.",
  keywords: "state business grants, local business grants, economic development grants, state funding programs, regional business incentives",
}

export default function StateLocalBusinessGrantsGuide() {
  const faqData = [
    {
      question: "What state business grants are available in 2026?",
      answer: "Every state offers economic development programs. Top programs include California CalCompetes (up to $20M tax credits), Texas Enterprise Fund ($5M+), New York Excelsior Jobs Program, and Florida Quick Action Closing Fund. Most states offer job creation credits, investment tax credits, and workforce training grants."
    },
    {
      question: "How do I apply for state economic development grants?",
      answer: "Contact your state's economic development agency or local EDC before making location decisions—many programs require pre-approval. Prepare a business plan with job projections and investment plans. Work with state staff to identify all applicable programs, as they can often be stacked."
    },
    {
      question: "How do I find my state's programs?",
      answer: "Search for '[Your State] economic development' or contact your state's Department of Commerce. Our state-by-state guides also list major programs and contacts."
    },
    {
      question: "Can I combine state and federal programs?",
      answer: "Yes! Most state programs can be combined with federal programs like SBA loans, SBIR grants, and tax credits. This 'stacking' is often the best approach for maximizing funding."
    },
    {
      question: "What if I'm a small local business?",
      answer: "Focus on local and municipal programs designed for small main street businesses. State programs often have high job creation thresholds (e.g., 50+ jobs) that favor larger projects."
    },
    {
      question: "Are state grants taxable?",
      answer: "Yes, generally. State grants are usually considered taxable income at the federal level, though some states may exempt them from state taxes. Tax credits, however, reduce your tax bill directly."
    },
    {
      question: "Do I have to pay back state grants?",
      answer: "No, grants do not need to be repaid as long as you meet the conditions (e.g., create the promised number of jobs). If you fail to meet the targets, 'clawback' provisions may require you to repay part or all of the funding."
    }
  ];

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
  };
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-orange-600 to-red-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30"><MapPin className="w-3 h-3 mr-1" /> State &amp; Local Programs</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">State &amp; Local Business Grants Guide 2026</h1>
              <p className="text-xl text-orange-100 mb-8">Access regional economic development funding, job creation incentives, and location-based programs to grow your business locally. Over $15 billion in annual state incentives available.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/usa">Browse State-by-State Guides</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. What Are State/Local Grants?</a></li>
                  <li><a href="#types" className="text-blue-700 hover:underline">2. Types of State Programs</a></li>
                  <li><a href="#local" className="text-blue-700 hover:underline">3. Local Municipal Programs</a></li>
                  <li><a href="#top-states" className="text-blue-700 hover:underline">4. Top State Programs</a></li>
                  <li><a href="#eligibility" className="text-blue-700 hover:underline">5. Eligibility Requirements</a></li>
                  <li><a href="#application" className="text-blue-700 hover:underline">6. Application Process</a></li>
                  <li><a href="#finding" className="text-blue-700 hover:underline">7. Finding Programs</a></li>
                  <li><a href="#incentives" className="text-blue-700 hover:underline">8. Tax Incentives</a></li>
                  <li><a href="#tif" className="text-blue-700 hover:underline">9. TIF Districts</a></li>
                  <li><a href="#mistakes" className="text-blue-700 hover:underline">10. Common Mistakes</a></li>
                  <li><a href="#success" className="text-blue-700 hover:underline">11. Success Strategies</a></li>
                  <li><a href="#faqs" className="text-blue-700 hover:underline">12. FAQs</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About State & Local Grants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#top-states" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-900">Which states have the best programs?</h3>
                  <p className="text-sm text-gray-600 mt-1">California, Texas, and New York offer the largest incentive packages.</p>
                </a>
                <a href="#finding" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-900">How do I find local programs?</h3>
                  <p className="text-sm text-gray-600 mt-1">Contact your local Economic Development Corporation or Chamber of Commerce.</p>
                </a>
                <a href="#eligibility" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-900">What are common requirements?</h3>
                  <p className="text-sm text-gray-600 mt-1">Job creation thresholds, capital investment, and business location.</p>
                </a>
                <a href="#application" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-900">Can I combine programs?</h3>
                  <p className="text-sm text-gray-600 mt-1">Yes, most state programs can be stacked with federal funding.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-8 text-center">
              <div><div className="text-3xl font-bold text-orange-600 mb-2">50</div><div className="text-gray-600">States with Programs</div></div>
              <div><div className="text-3xl font-bold text-red-600 mb-2">$500K</div><div className="text-gray-600">Maximum Grant Awards</div></div>
              <div><div className="text-3xl font-bold text-purple-600 mb-2">3000+</div><div className="text-gray-600">Local Programs</div></div>
              <div><div className="text-3xl font-bold text-blue-600 mb-2">$15B</div><div className="text-gray-600">Annual State Incentives</div></div>
            </div>
          </div>
        </section>

        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Are State &amp; Local Business Grants?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">State and local business grants are funding programs offered by state governments, counties, cities, and regional development organizations to promote economic growth, job creation, and business development in their communities. These programs often complement federal funding with location-specific benefits and more accessible application processes.</p>
              <p className="text-gray-700 leading-relaxed mb-6">Unlike federal programs that serve national priorities, state and local grants focus on regional economic development goals. They reward businesses for creating jobs locally, investing in distressed areas, and contributing to community revitalization. Programs vary significantly by location—some states like Texas and California offer billions in incentives while others have more modest programs.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-orange-200"><CardHeader><CardTitle className="text-orange-700">State-Level Programs</CardTitle></CardHeader><CardContent><ul className="text-sm text-gray-700 space-y-2"><li>• Economic development grants</li><li>• Job creation tax credits</li><li>• Industry-specific funding</li><li>• Export assistance programs</li><li>• Innovation and R&amp;D funds</li><li>• Rural development initiatives</li></ul></CardContent></Card>
                <Card className="border-red-200"><CardHeader><CardTitle className="text-red-700">Local Programs</CardTitle></CardHeader><CardContent><ul className="text-sm text-gray-700 space-y-2"><li>• Municipal business grants</li><li>• Downtown revitalization funds</li><li>• Small business loan programs</li><li>• Property tax abatements</li><li>• Facade improvement grants</li><li>• Microenterprise assistance</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="types" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Types of State Business Programs</h2>
              <p className="text-gray-700 mb-6">State economic development agencies offer diverse programs targeting different business needs. Understanding the types available helps you identify the best fit for your situation. Most states have multiple programs that can often be combined for maximum benefit.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-orange-50 rounded-lg"><h3 className="font-bold text-orange-700 mb-2">Direct Grants</h3><p className="text-sm text-gray-700">Cash awards for job creation, capital investment, or specific projects. Usually competitive with strict requirements.</p></div>
                <div className="p-4 bg-blue-50 rounded-lg"><h3 className="font-bold text-blue-700 mb-2">Tax Credits</h3><p className="text-sm text-gray-700">Dollar-for-dollar reductions in state tax liability. May be refundable or transferable.</p></div>
                <div className="p-4 bg-green-50 rounded-lg"><h3 className="font-bold text-green-700 mb-2">Low-Interest Loans</h3><p className="text-sm text-gray-700">Below-market financing for equipment, real estate, or working capital needs.</p></div>
                <div className="p-4 bg-purple-50 rounded-lg"><h3 className="font-bold text-purple-700 mb-2">Workforce Training</h3><p className="text-sm text-gray-700">Grants or reimbursements for employee training and skill development programs.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="local" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Local &amp; Municipal Business Programs</h2>
              <p className="text-gray-700 mb-6">Cities, counties, and regional development organizations offer their own incentive programs. These are often less competitive than state programs and may be easier to access for small businesses. Local programs focus on neighborhood revitalization, main street improvement, and community economic development.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div><h3 className="font-bold mb-3 text-orange-700">City-Level Programs</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><ChevronRight className="w-4 h-4 text-orange-500 mr-2 mt-0.5" /><span><strong>Small Business Grants:</strong> $1K-$50K for local businesses</span></li><li className="flex items-start"><ChevronRight className="w-4 h-4 text-orange-500 mr-2 mt-0.5" /><span><strong>Facade Improvement:</strong> $2K-$25K for storefront upgrades</span></li><li className="flex items-start"><ChevronRight className="w-4 h-4 text-orange-500 mr-2 mt-0.5" /><span><strong>Downtown Programs:</strong> $5K-$100K for core area businesses</span></li></ul></div>
                <div><h3 className="font-bold mb-3 text-green-700">County/Regional Programs</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span><strong>Rural Development:</strong> Programs for non-urban areas</span></li><li className="flex items-start"><ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span><strong>Enterprise Zones:</strong> Incentives for distressed areas</span></li><li className="flex items-start"><ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span><strong>EDC Financing:</strong> Regional development corporation loans</span></li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="top-states" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Top State Business Grant Programs</h2>
              <div className="space-y-6">
                <Card className="border-blue-200"><CardHeader><CardTitle className="flex items-center"><MapPin className="w-5 h-5 text-blue-600 mr-2" />California - CalCompetes Tax Credit</CardTitle></CardHeader><CardContent><div className="grid md:grid-cols-3 gap-4 mb-4"><div className="flex items-center"><DollarSign className="w-5 h-5 text-green-600 mr-2" /><span><strong>Up to $20M</strong></span></div><div className="flex items-center"><Users className="w-5 h-5 text-blue-600 mr-2" /><span><strong>Job Creation Focus</strong></span></div><div className="flex items-center"><Target className="w-5 h-5 text-purple-600 mr-2" /><span><strong>Tax Credit</strong></span></div></div><p className="text-sm text-gray-700">California&apos;s premier economic development program providing income tax credits to businesses that create jobs and make investments in the state. Highly competitive—focus on high-quality job creation.</p></CardContent></Card>
                <Card className="border-green-200"><CardHeader><CardTitle className="flex items-center"><Building2 className="w-5 h-5 text-green-600 mr-2" />Texas - Enterprise Fund</CardTitle></CardHeader><CardContent><div className="grid md:grid-cols-3 gap-4 mb-4"><div className="flex items-center"><DollarSign className="w-5 h-5 text-green-600 mr-2" /><span><strong>Up to $5M</strong></span></div><div className="flex items-center"><Users className="w-5 h-5 text-blue-600 mr-2" /><span><strong>Job Creation + Investment</strong></span></div><div className="flex items-center"><Target className="w-5 h-5 text-purple-600 mr-2" /><span><strong>Grant/Loan</strong></span></div></div><p className="text-sm text-gray-700">Texas &quot;deal closing&quot; fund for attracting large-scale business projects. Requires 75+ new jobs and $1M+ investment. Performance-based with clawback provisions.</p></CardContent></Card>
                <Card className="border-purple-200"><CardHeader><CardTitle className="flex items-center"><Target className="w-5 h-5 text-purple-600 mr-2" />New York - Excelsior Jobs Program</CardTitle></CardHeader><CardContent><div className="grid md:grid-cols-3 gap-4 mb-4"><div className="flex items-center"><DollarSign className="w-5 h-5 text-green-600 mr-2" /><span><strong>Up to 6.85% Credit</strong></span></div><div className="flex items-center"><Clock className="w-5 h-5 text-blue-600 mr-2" /><span><strong>10 Years</strong></span></div><div className="flex items-center"><Target className="w-5 h-5 text-purple-600 mr-2" /><span><strong>Multiple Credits</strong></span></div></div><p className="text-sm text-gray-700">New York&apos;s flagship tax incentive for targeted industries including manufacturing, software, and back office operations. Offers job creation, investment, R&amp;D, and property tax credits.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="eligibility" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Eligibility Requirements</h2>
              <p className="text-gray-700 mb-6">State and local grant eligibility varies significantly by program and location. Most programs focus on job creation, capital investment, and business location decisions. Common requirements include meeting minimum thresholds for jobs created or investment made.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="text-green-700 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Common Requirements</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>• Business location in target area</li><li>• Minimum job creation thresholds</li><li>• Capital investment requirements</li><li>• Wage minimums for new jobs</li><li>• Industry sector alignment</li><li>• Good standing with state agencies</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-red-700 flex items-center"><AlertCircle className="w-5 h-5 mr-2" />Common Restrictions</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>• Retail often excluded</li><li>• Certain industries restricted</li><li>• Compliance with labor laws</li><li>• Environmental requirements</li><li>• Multi-year commitments</li><li>• Clawback provisions apply</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="application" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Application Process: A "Main Street" Example</h2>
              <p className="text-gray-700 mb-8">To understand the local grant process, let&apos;s walk through a typical successful application for a "Downtown Facade Improvement Grant"—one of the most common local programs.</p>

              <div className="bg-orange-50 rounded-xl border border-orange-100 p-8 mb-12">
                <h3 className="text-xl font-bold text-orange-900 mb-4">Case Study: The "Coffee Corner" Renovation</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-gray-900">Pre-Application Meeting (Crucial Step)</h4>
                      <p className="text-sm text-gray-600">Owner Sarah didn&apos;t just apply. She met with the "Main Street Manager" <em>first</em>. She brought a rough sketch of her new sign and awning. The manager told her: "We prefer historical colors, not neon." Sarah adjusted her plan <em>before</em> applying.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-gray-900">The Quote Collection</h4>
                      <p className="text-sm text-gray-600">The grant required "two competitive bids." Sarah got three. One contractor was $5,000, another $8,000. She chose the $5,000 one, showing fiscal responsibility to the grant committee.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-gray-900">The "Before" Photos</h4>
                      <p className="text-sm text-gray-600">Sarah took high-resolution photos of her peeling paint. Grant committees love a dramatic "Before & After" story. She made sure the ugly parts were clearly visible.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">✓</div>
                    <div>
                      <h4 className="font-bold text-gray-900">Result: Approved</h4>
                      <p className="text-sm text-gray-600">She received a $2,500 reimbursement grant (50% match) because her project aligned perfectly with the town&apos;s goal of "Historic Revitalization," not just "Business Growth."</p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6">Decision Matrix: State vs. Local</h2>
              <p className="text-gray-700 mb-6">Should you spend time on State or Local programs? Use this matrix to decide where your highest probability of success lies.</p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-t-4 border-orange-500">
                  <CardHeader><CardTitle className="text-orange-700">Apply LOCALLY If...</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5" /> You are a retail, restaurant, or service business.</li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5" /> You are creating 1-5 jobs.</li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5" /> You need physical improvements (signage, paint).</li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5" /> You are located in a specific "downtown" district.</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-t-4 border-blue-500">
                  <CardHeader><CardTitle className="text-blue-700">Apply to STATE If...</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /> You are in manufacturing, tech, or export.</li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /> You are creating 10+ full-time jobs with benefits.</li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /> You are investing $1M+ in capital equipment.</li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /> You are considering moving to another state.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="finding" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Find State &amp; Local Programs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center"><div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-white font-bold text-xl">1</span></div><h4 className="font-bold text-lg mb-3">State Websites</h4><p className="text-sm text-gray-600">Check your state&apos;s economic development department website for program listings.</p></div>
                <div className="text-center"><div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-white font-bold text-xl">2</span></div><h4 className="font-bold text-lg mb-3">Local EDCs</h4><p className="text-sm text-gray-600">Contact your city or county Economic Development Corporation directly.</p></div>
                <div className="text-center"><div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-white font-bold text-xl">3</span></div><h4 className="font-bold text-lg mb-3">SBDCs</h4><p className="text-sm text-gray-600">Small Business Development Centers have local program knowledge.</p></div>
                <div className="text-center"><div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-white font-bold text-xl">4</span></div><h4 className="font-bold text-lg mb-3">Chambers</h4><p className="text-sm text-gray-600">Local Chambers of Commerce often know of available programs.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="incentives" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Tax Incentive Programs</h2>
              <p className="text-gray-700 mb-6">Beyond direct grants, most states offer significant tax incentives that can substantially reduce your tax burden. These programs often provide more value than grants and may be easier to qualify for. Common tax incentives include job creation credits, investment credits, and property tax abatements.</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg text-center"><DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" /><h3 className="font-bold">Job Creation Credits</h3><p className="text-sm text-gray-600">$1,000-$10,000 per new job</p></div>
                <div className="p-4 bg-blue-50 rounded-lg text-center"><Building2 className="w-8 h-8 text-blue-600 mx-auto mb-2" /><h3 className="font-bold">Investment Credits</h3><p className="text-sm text-gray-600">5-10% of capital investment</p></div>
                <div className="p-4 bg-purple-50 rounded-lg text-center"><Target className="w-8 h-8 text-purple-600 mx-auto mb-2" /><h3 className="font-bold">Property Tax Abatements</h3><p className="text-sm text-gray-600">5-15 years reduced taxes</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="tif" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Tax Increment Financing (TIF) Districts</h2>
              <p className="text-gray-700 mb-6">TIF districts are special zones where increased property tax revenue from new development is captured and reinvested in the district. Businesses locating in TIF districts may benefit from infrastructure improvements, property tax breaks, or direct incentives funded by TIF revenue. Check if your location is within a TIF district for additional benefits.</p>
              <div className="bg-orange-50 p-6 rounded-lg"><h3 className="font-bold mb-3">TIF Benefits for Businesses</h3><ul className="grid md:grid-cols-2 gap-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Infrastructure improvements at no cost</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Property tax reduction or freeze</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Development assistance grants</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Site preparation assistance</span></li></ul></div>
            </div>
          </div>
        </section>

        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Applying Too Late</h3><p className="text-sm text-gray-600">Many programs require pre-approval before making location or investment decisions. Apply early.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Not Negotiating</h3><p className="text-sm text-gray-600">For larger projects, incentive packages are negotiable. Don&apos;t accept first offers without discussion.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Missing Compliance</h3><p className="text-sm text-gray-600">Failing to meet job creation or investment commitments triggers clawbacks. Plan realistically.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Ignoring Local Programs</h3><p className="text-sm text-gray-600">Local grants may be smaller but are often less competitive and easier to obtain.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="micro-grants" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">City-Level Micro-Grants: The "Low Hanging Fruit"</h2>
              <p className="text-gray-700 mb-6">While everyone chases $50k state grants, thousands of cities offer smaller $2k-$10k grants with much higher approval rates. These are often for specific improvements like signage, digital marketing, or security.</p>

              <div className="overflow-x-auto rounded-xl border border-gray-200 mb-8">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-700 font-bold">
                    <tr>
                      <th className="p-3">Program Type</th>
                      <th className="p-3 text-green-700">Typical Amount</th>
                      <th className="p-3">Common Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white">
                      <td className="p-3 font-semibold">Facade Improvement</td>
                      <td className="p-3">$5,000 - $25,000</td>
                      <td className="p-3">New signs, painting, windows, awnings.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 font-semibold">Digital Adoption</td>
                      <td className="p-3">$1,000 - $5,000</td>
                      <td className="p-3">Website redesign, e-commerce setup.</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-semibold">Security Grant</td>
                      <td className="p-3">$500 - $2,500</td>
                      <td className="p-3">Installing cameras, better lighting.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 font-semibold">Outdoor Dining</td>
                      <td className="p-3">$2,000 - $10,000</td>
                      <td className="p-3">Patio furniture, heaters, barriers.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-sm text-yellow-900"><strong>Pro Tip:</strong> To find these, search Google for <code>"[Your City Name] economic development grants"</code> or call your City Hall&apos;s "Planning Department". They are often not advertised well.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="chambers" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Hidden Funds: Chambers of Commerce</h2>
              <p className="text-gray-700 mb-6">Local Chambers of Commerce don&apos;t just host mixers; they often administer grant programs funded by corporate donors (like FedEx, Verizon) or local governments.</p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-purple-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg text-purple-800 mb-2">Downtown Associations (BIA)</h3>
                    <p className="text-sm text-gray-700">Business Improvement Areas collect a tax levy from local businesses and reinvest it. They often fund:</p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>• Street festivals (bringing you customers)</li>
                      <li>• Area beautification</li>
                      <li>• Collective marketing campaigns</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg text-blue-800 mb-2">Corporate-Chamber Partnerships</h3>
                    <p className="text-sm text-gray-700">Large corporations often route their "Small Business Support" funds through the U.S. Chamber of Commerce Foundation to reach local businesses efficiently.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="seda-directory" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">State Economic Development Agency (SEDA) Directory</h2>
              <p className="text-gray-700 mb-8">Don&apos;t know who to call? Here is the "Big List" of the primary agency in major states that handles business grants. Bookmark their "Incentives" page.</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="p-3 border rounded hover:bg-gray-50"><strong className="block text-gray-900">California</strong><span className="text-gray-600">GO-Biz (Governor&apos;s Office)</span></div>
                <div className="p-3 border rounded hover:bg-gray-50"><strong className="block text-gray-900">Texas</strong><span className="text-gray-600">Texas Economic Development</span></div>
                <div className="p-3 border rounded hover:bg-gray-50"><strong className="block text-gray-900">New York</strong><span className="text-gray-600">Empire State Development</span></div>
                <div className="p-3 border rounded hover:bg-gray-50"><strong className="block text-gray-900">Florida</strong><span className="text-gray-600">Enterprise Florida</span></div>
                <div className="p-3 border rounded hover:bg-gray-50"><strong className="block text-gray-900">Illinois</strong><span className="text-gray-600">DCEO</span></div>
                <div className="p-3 border rounded hover:bg-gray-50"><strong className="block text-gray-900">Pennsylvania</strong><span className="text-gray-600">DCED</span></div>
                <div className="p-3 border rounded hover:bg-gray-50"><strong className="block text-gray-900">Ohio</strong><span className="text-gray-600">JobsOhio</span></div>
                <div className="p-3 border rounded hover:bg-gray-50"><strong className="block text-gray-900">Georgia</strong><span className="text-gray-600">Dept. of Economic Dev.</span></div>
                <div className="p-3 border rounded hover:bg-gray-50"><strong className="block text-gray-900">North Carolina</strong><span className="text-gray-600">EDPNC</span></div>
                <div className="p-3 border rounded hover:bg-gray-50"><strong className="block text-gray-900">Michigan</strong><span className="text-gray-600">MEDC</span></div>
                <div className="p-3 border rounded hover:bg-gray-50"><strong className="block text-gray-900">New Jersey</strong><span className="text-gray-600">NJEDA</span></div>
                <div className="p-3 border rounded hover:bg-gray-50"><strong className="block text-gray-900">Virginia</strong><span className="text-gray-600">VEDP</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="success" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Success Strategies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><h3 className="font-bold mb-3 text-green-700">✅ Best Practices</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Emphasize local economic impact and job quality</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Build relationships before you need funding</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Stack multiple programs when possible</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Consider multiple locations for leverage</span></li></ul></div>
                <div><h3 className="font-bold mb-3 text-purple-700">🎯 Pro Tips</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Some states compete for business—use it to your advantage</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Workforce training grants often overlooked</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Rural areas often have more generous programs</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Engage local elected officials for support</span></li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="scams" className="py-16 bg-red-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-red-900 flex items-center"><AlertTriangle className="w-8 h-8 mr-3" /> Warning: Local Grant Scams</h2>
              <p className="text-red-800 mb-6">Local businesses are prime targets for scammers pretending to be the "State Department of Grants".</p>
              <ul className="space-y-4">
                <li className="flex items-start bg-white p-4 rounded shadow-sm">
                  <span className="font-bold text-red-600 mr-2">RED FLAG 1:</span>
                  <span className="text-gray-700">They ask you to pay a "processing fee" to receive the grant. Real government grants <strong>never</strong> ask for money.</span>
                </li>
                <li className="flex items-start bg-white p-4 rounded shadow-sm">
                  <span className="font-bold text-red-600 mr-2">RED FLAG 2:</span>
                  <span className="text-gray-700">They contact you via social media (Instagram/Facebook) claiming you won a "COVID Relief Grant".</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Accordion type="single" collapsible key={index}>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-medium text-blue-900">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Official Resources Section */}
        <section className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Official Resources</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="https://www.sba.gov/local-assistance" target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-orange-50 rounded-lg border border-orange-100 hover:shadow-md transition-all">
                  <ExternalLink className="w-6 h-6 text-orange-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-orange-900 mb-2">SBA Local Assistance</h3>
                    <p className="text-orange-800 text-sm">Find local SBA offices, SBDCs, and SCORE mentors in your state.</p>
                  </div>
                </Link>
                <Link href="https://www.eda.gov/" target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md transition-all">
                  <ExternalLink className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">U.S. Economic Development Admin</h3>
                    <p className="text-blue-800 text-sm">Federal agency offering regional economic development grants and resources.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Top State Grant Programs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Link href="/usa/california" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><MapPin className="w-5 h-5 text-blue-600 mr-3" /><span>California Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/usa/texas" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><MapPin className="w-5 h-5 text-red-600 mr-3" /><span>Texas Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/usa/new-york" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><MapPin className="w-5 h-5 text-purple-600 mr-3" /><span>New York Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/usa/florida" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><MapPin className="w-5 h-5 text-orange-600 mr-3" /><span>Florida Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/usa/small-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><MapPin className="w-5 h-5 text-green-600 mr-3" /><span>All State Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
              <h3 className="text-xl font-bold mb-4">Related Funding Guides</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/usa-federal-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-green-600 mr-3" /><span>Federal Grants Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/sbir-small-business-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-green-600 mr-3" /><span>SBIR Small Business Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-orange-600 to-red-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Find Your State&apos;s Programs</h2>
              <p className="text-xl text-orange-100 mb-8">Browse our state-by-state guides with detailed program listings, eligibility requirements, and application instructions for all 50 states.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/usa">Browse All 50 States</Link></Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
