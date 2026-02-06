import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle, DollarSign, Target, AlertTriangle, FileText,
  Clock, ChevronRight, ExternalLink, BookOpen, HelpCircle,
  Heart, Users, MapPin, TrendingUp, Building2
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SBA Microloans 2026: Get Up to $50K + Free Mentoring | Complete Guide",
  description: "Complete guide to SBA microloans. Get up to $50K with faster approval (2-4 weeks), 8-13% rates, and FREE business mentoring. Step-by-step application process.",
  keywords: "SBA microloans, small business microloans, SBA microloan program, startup funding, small business loans, CDFI loans",
}

export default function SBAMicroloansGuidePage() {
  const faqData = [
    {
      question: "Can startups get microloans?",
      answer: "Yes! Microloans are specifically designed for startups. Many intermediaries specialize in helping new businesses with little to no revenue history."
    },
    {
      question: "What credit score do I need?",
      answer: "Typically 550-620+, though requirements vary by intermediary. Lower scores may require additional training or smaller initial loan amounts. This is much more flexible than bank financing."
    },
    {
      question: "Is collateral required?",
      answer: "Some intermediaries require collateral; others don't. Personal guarantees are typically required from all owners with >20% stake."
    },
    {
      question: "How does the training requirement work?",
      answer: "Most intermediaries require you to attend a business planning workshop or meet with a mentor before your application is considered. This ensures you are ready to manage the funds."
    },
    {
      question: "Can I get a second microloan?",
      answer: "Yes. Once you repay your first loan successfully, you can apply for another. The total outstanding balance across all SBA microloans cannot exceed $50,000."
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
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-700 to-pink-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                <Heart className="w-3 h-3 mr-1" /> Best for Startups &amp; Small Needs
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                SBA Microloans Complete Guide 2026
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Get up to $50,000 with easier approval than traditional SBA loans—plus FREE
                business mentoring. Perfect for startups and small businesses.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                <Link href="/contact?service=sba-microloan-help">Get Microloan Application Help</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* TOC */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. What are SBA Microloans?</a></li>
                  <li><a href="#eligibility" className="text-blue-700 hover:underline">2. Who is Eligible?</a></li>
                  <li><a href="#funding" className="text-blue-700 hover:underline">3. How Much Can You Get?</a></li>
                  <li><a href="#uses" className="text-blue-700 hover:underline">4. What Can Microloans Fund?</a></li>
                  <li><a href="#intermediaries" className="text-blue-700 hover:underline">5. Finding Microloan Lenders</a></li>
                  <li><a href="#mentoring" className="text-blue-700 hover:underline">6. Free Mentoring Benefit</a></li>
                  <li><a href="#how-to-apply" className="text-blue-700 hover:underline">7. How to Apply</a></li>
                  <li><a href="#documents" className="text-blue-700 hover:underline">8. Required Documents</a></li>
                  <li><a href="#timeline" className="text-blue-700 hover:underline">9. Approval Timeline</a></li>
                  <li><a href="#comparison" className="text-blue-700 hover:underline">10. Microloans vs 7(a) Loans</a></li>
                  <li><a href="#alternatives" className="text-blue-700 hover:underline">11. Alternative Programs</a></li>
                  <li><a href="#faqs" className="text-blue-700 hover:underline">12. FAQs</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-8 text-center">
              <div><div className="text-3xl font-bold text-purple-600 mb-2">$50K</div><div className="text-gray-600">Max Loan Amount</div></div>
              <div><div className="text-3xl font-bold text-pink-600 mb-2">$13K</div><div className="text-gray-600">Average Loan</div></div>
              <div><div className="text-3xl font-bold text-blue-600 mb-2">6 Years</div><div className="text-gray-600">Max Term</div></div>
              <div><div className="text-3xl font-bold text-green-600 mb-2">180+</div><div className="text-gray-600">Lenders Nationwide</div></div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What are SBA Microloans?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                SBA Microloans are small, short-term loans of up to $50,000 provided through nonprofit
                community-based organizations called &quot;intermediary lenders.&quot; Unlike traditional SBA 7(a)
                loans, microloans feature simplified applications, faster approval, and mandatory business
                mentoring—making them ideal for startups and underserved entrepreneurs.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                The average microloan is approximately $13,000, though amounts range from as little as
                $500 to the maximum $50,000. Many microloan intermediaries focus on serving women,
                minorities, veterans, and rural entrepreneurs who might not qualify for traditional financing.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-purple-200"><CardContent className="pt-6">
                  <h3 className="font-bold mb-3 text-purple-700">Why Choose Microloans?</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Easier approval than 7(a) loans</span></li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Faster processing (2-4 weeks)</span></li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Lower documentation requirements</span></li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>FREE business mentoring included</span></li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Builds credit for future larger loans</span></li>
                  </ul>
                </CardContent></Card>

                <Card className="border-pink-200"><CardContent className="pt-6">
                  <h3 className="font-bold mb-3 text-pink-700">Ideal Candidates</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-pink-500 mr-2 mt-0.5" /><span>Startup businesses (less than 1 year)</span></li>
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-pink-500 mr-2 mt-0.5" /><span>Home-based and sole proprietors</span></li>
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-pink-500 mr-2 mt-0.5" /><span>Women and minority entrepreneurs</span></li>
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-pink-500 mr-2 mt-0.5" /><span>Veteran-owned businesses</span></li>
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-pink-500 mr-2 mt-0.5" /><span>Rural and underserved communities</span></li>
                  </ul>
                </CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Who is Eligible for SBA Microloans?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="text-green-700 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Requirements</CardTitle></CardHeader><CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• For-profit small business or startup</li>
                    <li>• Meet SBA size standards for your industry</li>
                    <li>• Located in intermediary&apos;s service area</li>
                    <li>• Demonstrate ability to repay</li>
                    <li>• Complete required training/counseling</li>
                    <li>• No major criminal history</li>
                  </ul>
                </CardContent></Card>
                <Card><CardHeader><CardTitle className="text-red-700 flex items-center"><AlertTriangle className="w-5 h-5 mr-2" />Restrictions</CardTitle></CardHeader><CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Cannot use for real estate purchase</li>
                    <li>• Cannot refinance existing debt</li>
                    <li>• Gambling/adult businesses excluded</li>
                    <li>• Pyramid/MLM schemes excluded</li>
                    <li>• Must not be delinquent on federal debt</li>
                    <li>• Passive investment activities excluded</li>
                  </ul>
                </CardContent></Card>
              </div>

              <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4">
                <p className="text-gray-700"><strong>Credit Flexibility:</strong> Microloan intermediaries often accept borrowers with lower credit scores (550-620) who might not qualify for 7(a) loans. Requirements vary by intermediary.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Funding */}
        <section id="funding" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How Much Funding Can You Get?</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead><tr className="bg-purple-50"><th className="border px-4 py-3 text-left">Loan Amount</th><th className="border px-4 py-3 text-left">Terms</th><th className="border px-4 py-3 text-left">Interest Rate</th></tr></thead>
                  <tbody>
                    <tr><td className="border px-4 py-3 font-semibold">Maximum</td><td className="border px-4 py-3 text-green-600">$50,000</td><td className="border px-4 py-3">8-13%</td></tr>
                    <tr className="bg-gray-50"><td className="border px-4 py-3 font-semibold">Average</td><td className="border px-4 py-3 text-green-600">$13,000</td><td className="border px-4 py-3">8-13%</td></tr>
                    <tr><td className="border px-4 py-3 font-semibold">Minimum</td><td className="border px-4 py-3 text-green-600">$500</td><td className="border px-4 py-3">8-13%</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border"><Clock className="w-6 h-6 text-blue-600 mb-2" /><div className="font-bold">Max 6 Years</div><div className="text-sm text-gray-600">Repayment term</div></div>
                <div className="bg-white p-4 rounded-lg border"><DollarSign className="w-6 h-6 text-green-600 mb-2" /><div className="font-bold">No Prepayment Penalty</div><div className="text-sm text-gray-600">Pay off early if you want</div></div>
                <div className="bg-white p-4 rounded-lg border"><TrendingUp className="w-6 h-6 text-purple-600 mb-2" /><div className="font-bold">Fixed Rates</div><div className="text-sm text-gray-600">Predictable payments</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* Uses */}
        <section id="uses" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Can Microloans Fund?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-green-50 rounded-lg"><h3 className="font-bold text-lg mb-3 text-green-700">✅ Eligible Uses</h3>
                  <ul className="space-y-2 text-sm"><li>• Working capital</li><li>• Inventory and supplies</li><li>• Equipment and machinery</li><li>• Furniture and fixtures</li><li>• Startup costs</li><li>• Marketing and advertising</li></ul>
                </div>
                <div className="p-6 bg-red-50 rounded-lg"><h3 className="font-bold text-lg mb-3 text-red-700">❌ Not Eligible</h3>
                  <ul className="space-y-2 text-sm"><li>• Real estate purchases</li><li>• Refinancing existing debt</li><li>• Personal expenses</li><li>• Owner draws/salaries</li><li>• Investment activities</li><li>• Gambling/adult businesses</li></ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intermediaries */}
        <section id="intermediaries" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Finding Microloan Lenders (Intermediaries)</h2>
              <p className="text-gray-700 mb-6">SBA microloans are provided through 180+ nonprofit community-based intermediary lenders. Each intermediary has its own service area, lending criteria, and focus areas.</p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardContent className="pt-6">
                  <h3 className="font-bold mb-3 flex items-center"><Building2 className="w-5 h-5 text-blue-600 mr-2" />Types of Intermediaries</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Community Development Financial Institutions (CDFIs)</li>
                    <li>• Women&apos;s Business Centers (WBCs)</li>
                    <li>• Minority Business Development Agencies</li>
                    <li>• Veterans Business Outreach Centers</li>
                    <li>• Rural development organizations</li>
                  </ul>
                </CardContent></Card>

                <Card><CardContent className="pt-6">
                  <h3 className="font-bold mb-3 flex items-center"><MapPin className="w-5 h-5 text-purple-600 mr-2" />How to Find One</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Visit SBA.gov Lender Match tool</li>
                    <li>• Contact your local SBA district office</li>
                    <li>• Search CDFI Fund directory</li>
                    <li>• Check with local SCORE chapter</li>
                    <li>• Ask at your local SBDC</li>
                  </ul>
                </CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        {/* Mentoring */}
        <section id="mentoring" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Free Business Mentoring: A Major Benefit</h2>
              <div className="bg-pink-50 border-l-4 border-pink-500 p-6 mb-6">
                <div className="flex items-start"><Users className="w-6 h-6 text-pink-600 mr-3 flex-shrink-0" /><p className="text-gray-700"><strong>Unique Advantage:</strong> Unlike 7(a) loans, microloan borrowers must participate in business training and receive ongoing mentoring support—completely free.</p></div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-3">Pre-Loan Training</h3><ul className="space-y-1 text-sm"><li>• Business plan development</li><li>• Financial projections</li><li>• Market research assistance</li><li>• Loan application prep</li></ul></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-3">Post-Loan Support</h3><ul className="space-y-1 text-sm"><li>• Ongoing mentoring (1-2 years)</li><li>• Financial management coaching</li><li>• Marketing guidance</li><li>• Growth planning</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section id="how-to-apply" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Apply for SBA Microloans</h2>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div><div><h3 className="font-bold">Find a Local Intermediary</h3><p className="text-gray-600 text-sm">Use SBA Lender Match or contact your local SBA district office</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div><div><h3 className="font-bold">Complete Training Requirement</h3><p className="text-gray-600 text-sm">Attend mandatory business training or counseling sessions</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div><div><h3 className="font-bold">Submit Application</h3><p className="text-gray-600 text-sm">Complete simplified application with business docs and plan</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div><div><h3 className="font-bold">Approval &amp; Closing</h3><p className="text-gray-600 text-sm">Receive decision in 2-4 weeks; close and receive funds</p></div></div>
              </div>
            </div>
          </div>
        </section>

        {/* Documents */}
        <section id="documents" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Documents Are Required?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border"><h3 className="font-bold mb-3 flex items-center"><FileText className="w-5 h-5 text-blue-600 mr-2" />Personal Documents</h3><ul className="space-y-1 text-sm"><li>• Personal tax returns (1-2 years)</li><li>• Government-issued ID</li><li>• Personal financial statement</li><li>• Resume or bio</li></ul></div>
                <div className="p-6 bg-white rounded-lg border"><h3 className="font-bold mb-3 flex items-center"><FileText className="w-5 h-5 text-green-600 mr-2" />Business Documents</h3><ul className="space-y-1 text-sm"><li>• Business plan (simple is OK)</li><li>• Business bank statements (3-6 mo)</li><li>• Business tax returns (if existing)</li><li>• Proof of business registration</li></ul></div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How Long Does Microloan Approval Take?</h2>
              <div className="overflow-x-auto"><table className="w-full border-collapse border border-gray-200"><thead><tr className="bg-purple-50"><th className="border px-4 py-3 text-left">Phase</th><th className="border px-4 py-3 text-left">Timeline</th></tr></thead><tbody><tr><td className="border px-4 py-3">Training requirement</td><td className="border px-4 py-3">1-2 weeks</td></tr><tr className="bg-gray-50"><td className="border px-4 py-3">Application processing</td><td className="border px-4 py-3">2-4 weeks</td></tr><tr><td className="border px-4 py-3">Closing/funding</td><td className="border px-4 py-3">1-2 weeks</td></tr><tr className="bg-gray-50 font-bold"><td className="border px-4 py-3">Total</td><td className="border px-4 py-3 text-green-600">4-8 weeks</td></tr></tbody></table></div>
              <p className="text-gray-600 text-sm mt-4">Much faster than 7(a) loans which take 30-90 days.</p>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section id="comparison" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Microloans vs SBA 7(a) Loans</h2>
              <div className="overflow-x-auto"><table className="w-full border-collapse border border-gray-200"><thead><tr className="bg-blue-50"><th className="border px-4 py-3 text-left">Factor</th><th className="border px-4 py-3 text-left">Microloans</th><th className="border px-4 py-3 text-left">7(a) Loans</th></tr></thead><tbody><tr><td className="border px-4 py-3 font-semibold">Max Amount</td><td className="border px-4 py-3">$50,000</td><td className="border px-4 py-3">$5,000,000</td></tr><tr className="bg-gray-50"><td className="border px-4 py-3 font-semibold">Approval Time</td><td className="border px-4 py-3 text-green-600">2-4 weeks</td><td className="border px-4 py-3">30-90 days</td></tr><tr><td className="border px-4 py-3 font-semibold">Documentation</td><td className="border px-4 py-3 text-green-600">Simple</td><td className="border px-4 py-3">Extensive</td></tr><tr className="bg-gray-50"><td className="border px-4 py-3 font-semibold">Mentoring</td><td className="border px-4 py-3 text-green-600">Included</td><td className="border px-4 py-3">Not included</td></tr><tr><td className="border px-4 py-3 font-semibold">Real Estate</td><td className="border px-4 py-3">Not allowed</td><td className="border px-4 py-3">Allowed</td></tr></tbody></table></div>
            </div>
          </div>
        </section>

        {/* Alternatives */}
        <section id="alternatives" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Alternative Funding Programs</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-2">Kiva Microloans</h3><p className="text-sm text-gray-600">0% interest crowdfunded microloans up to $15K</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-2">Community Advantage</h3><p className="text-sm text-gray-600">SBA 7(a) loans up to $350K for underserved</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-2">Accion Loans</h3><p className="text-sm text-gray-600">CDFI loans from $5K to $100K</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-2">SBA Express</h3><p className="text-sm text-gray-600">Faster 7(a) loans up to $500K</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="font-bold flex items-start">
                        <HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
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

        {/* Official Resources Section */}
        <section className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Official Resources</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="https://www.sba.gov/funding-programs/loans/microloans" target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md transition-all">
                  <ExternalLink className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">SBA Microloan Program</h3>
                    <p className="text-blue-800 text-sm">Official program details, eligibility, and intermediary lender information.</p>
                  </div>
                </Link>
                <Link href="https://www.sba.gov/local-assistance" target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-purple-50 rounded-lg border border-purple-100 hover:shadow-md transition-all">
                  <ExternalLink className="w-6 h-6 text-purple-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-purple-900 mb-2">Find Local Assistance</h3>
                    <p className="text-purple-800 text-sm">Locate SBA District Offices, Women&#39;s Business Centers, and SCORE chapters near you.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/sba-loans-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>SBA Loans Overview</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/sba-7a-loans-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>SBA 7(a) Loans Deep Dive</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/small-business-grants-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Small Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/women-business-centers-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Women&apos;s Business Centers</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-purple-700 to-pink-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Ready to Get Your Microloan?</h2>
              <p className="text-xl text-purple-100 mb-8">Our team helps startups and small businesses navigate the microloan application process, find the right intermediary, and prepare winning applications.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                <Link href="/contact?service=sba-microloan-help">Get Microloan Application Help</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
