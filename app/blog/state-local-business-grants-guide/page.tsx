import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Clock, DollarSign, Target, CheckCircle, AlertCircle, MapPin, Users, Building2, BookOpen, HelpCircle, ChevronRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "State & Local Business Grants Guide 2026 | Regional Economic Development Funding",
  description: "Complete guide to state and local business grants. Find economic development incentives, job creation programs, and regional funding up to $500K.",
  keywords: "state business grants, local business grants, economic development grants, state funding programs, regional business incentives",
}

export default function StateLocalBusinessGrantsGuide() {
  return (
    <>
      <Header />
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
              <h2 className="text-3xl font-bold mb-6">Application Process</h2>
              <p className="text-gray-700 mb-6">State and local grant applications generally involve contacting your state economic development agency or local EDC first. Many programs require pre-approval before making location or investment decisions. Building relationships with program administrators significantly improves success rates.</p>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div><div><h3 className="font-bold">Contact State/Local EDC</h3><p className="text-gray-600 text-sm">Reach out to economic development staff before making decisions. Many programs require pre-approval.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div><div><h3 className="font-bold">Identify Applicable Programs</h3><p className="text-gray-600 text-sm">Work with staff to identify all programs you may qualify for. Programs can often be combined.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div><div><h3 className="font-bold">Submit Application Package</h3><p className="text-gray-600 text-sm">Complete applications with required documentation including business plan, financials, and job projections.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div><div><h3 className="font-bold">Negotiate Terms</h3><p className="text-gray-600 text-sm">Larger projects often involve negotiation. Emphasize your project&apos;s economic impact and job quality.</p></div></div>
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

        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />How do I find my state&apos;s programs?</h3><p className="text-gray-700 mt-2 ml-7">Search for &quot;[Your State] economic development&quot; or contact your state&apos;s Department of Commerce. Our state-by-state guides also list major programs.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />Can I combine state and federal programs?</h3><p className="text-gray-700 mt-2 ml-7">Yes! Most state programs can be combined with federal programs like SBA loans, SBIR grants, and tax credits. This is often the best approach for maximizing funding.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />What if I&apos;m a small business?</h3><p className="text-gray-700 mt-2 ml-7">Focus on local and municipal programs designed for small businesses. State programs often have high job creation thresholds that favor larger projects.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/usa" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>State-by-State Funding Guides</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/small-business-grants-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Small Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/sba-7a-loans-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>SBA 7(a) Loans</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/industry-specific-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Industry-Specific Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
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
