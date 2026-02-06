import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, AlertTriangle, FileText, Clock, ChevronRight, ExternalLink, BookOpen, HelpCircle, Shield, Home, AlertCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SBA Disaster Relief Loans Guide 2026 | Emergency Business Funding Up to $2M",
  description: "Complete guide to SBA disaster relief loans. Learn about physical damage loans, economic injury loans (EIDL), and how to get up to $2M in emergency business funding.",
  keywords: "SBA disaster loans, disaster relief loans, economic injury disaster loans, EIDL, emergency business funding, SBA disaster assistance",
}

export default function SBADisasterReliefLoansGuidePage() {
  const faqData = [
    {
      question: "Do I need insurance to apply?",
      answer: "No, but insurance proceeds reduce your loan amount. Apply before insurance settles—SBA will adjust the loan when your claim is resolved."
    },
    {
      question: "What if my credit is poor?",
      answer: "The SBA considers credit history but has more flexibility than commercial lenders. Explain any credit issues in your application. The SBA wants to help you recover."
    },
    {
      question: "Can I get both Physical and EIDL?",
      answer: "Yes, but the combined maximum is $2M. Physical covers property damage while EIDL covers working capital—they serve different purposes."
    },
    {
      question: "How quickly are funds disbursed?",
      answer: "Initial disbursement ($25,000) can happen within 5 days of loan closing. The remaining funds are disbursed in installments as you complete repairs and submit receipts."
    },
    {
      question: "Is there a prepayment penalty?",
      answer: "No. There are no prepayment penalties for SBA disaster loans. You can pay off the loan early at any time without extra cost."
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
        <section className="bg-gradient-to-br from-red-700 to-orange-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30"><Shield className="w-3 h-3 mr-1" /> Emergency Recovery</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">SBA Disaster Relief Loans Guide 2026</h1>
              <p className="text-xl text-red-100 mb-8">Access up to $2M in low-interest emergency funding. Complete guide to physical damage loans, EIDL, and the disaster recovery application process.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/contact?service=disaster-loan-help">Get Disaster Loan Help</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. What Are SBA Disaster Loans?</a></li>
                  <li><a href="#types" className="text-blue-700 hover:underline">2. Types of Disaster Loans</a></li>
                  <li><a href="#physical" className="text-blue-700 hover:underline">3. Physical Damage Loans</a></li>
                  <li><a href="#eidl" className="text-blue-700 hover:underline">4. Economic Injury Loans (EIDL)</a></li>
                  <li><a href="#eligibility" className="text-blue-700 hover:underline">5. Eligibility Requirements</a></li>
                  <li><a href="#application" className="text-blue-700 hover:underline">6. Application Process</a></li>
                  <li><a href="#documents" className="text-blue-700 hover:underline">7. Required Documents</a></li>
                  <li><a href="#timeline" className="text-blue-700 hover:underline">8. Timeline &amp; Deadlines</a></li>
                  <li><a href="#terms" className="text-blue-700 hover:underline">9. Loan Terms &amp; Rates</a></li>
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
              <div><div className="text-3xl font-bold text-red-600 mb-2">$2M</div><div className="text-gray-600">Max Loan Amount</div></div>
              <div><div className="text-3xl font-bold text-orange-600 mb-2">4%</div><div className="text-gray-600">Interest Rate (as low as)</div></div>
              <div><div className="text-3xl font-bold text-blue-600 mb-2">30 yrs</div><div className="text-gray-600">Max Repayment Term</div></div>
              <div><div className="text-3xl font-bold text-green-600 mb-2">60 days</div><div className="text-gray-600">Application Deadline</div></div>
            </div>
          </div>
        </section>

        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Are SBA Disaster Loans?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">SBA disaster loans are low-interest loans designed to help businesses, homeowners, and renters recover from declared disasters. The SBA is the largest source of federal disaster recovery funds for businesses, providing crucial funding to repair damage, replace destroyed property, and cover economic losses during recovery periods. These loans offer terms not available from commercial lenders including 30-year repayment and below-market interest rates.</p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6"><p className="text-gray-700"><strong>Time-Sensitive:</strong> Disaster loan applications must be submitted within 60 days (physical damage) or 9 months (economic injury) of the disaster declaration. Apply immediately—don&apos;t wait for insurance settlements.</p></div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-red-200"><CardContent className="pt-6"><h3 className="font-bold mb-3 text-red-700">Qualifying Disasters</h3><ul className="space-y-1 text-sm"><li>• Hurricanes, tornadoes, floods</li><li>• Earthquakes, wildfires</li><li>• Severe storms, winter storms</li><li>• Droughts, volcanic activity</li><li>• Civil unrest, terrorism</li><li>• Pandemic-related economic injury</li></ul></CardContent></Card>
                <Card className="border-green-200"><CardContent className="pt-6"><h3 className="font-bold mb-3 text-green-700">Key Benefits</h3><ul className="space-y-1 text-sm"><li>• Low interest rates (as low as 4%)</li><li>• Long terms (up to 30 years)</li><li>• No prepayment penalties</li><li>• Covers uninsured losses</li><li>• Available to all business sizes</li><li>• Refinancing options available</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="types" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Types of SBA Disaster Loans</h2>
              <p className="text-gray-700 mb-6">The SBA offers three main disaster loan programs. Physical Damage Loans cover repair and replacement of damaged property. Economic Injury Disaster Loans (EIDL) provide working capital to cover operating expenses. Military Reservist Loans help businesses when essential employees are called to active duty.</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-lg text-center"><Home className="w-8 h-8 text-red-600 mx-auto mb-2" /><h3 className="font-bold">Physical Damage</h3><p className="text-sm text-gray-600">Up to $2M for property repair</p></div>
                <div className="p-4 bg-orange-50 rounded-lg text-center"><DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" /><h3 className="font-bold">EIDL</h3><p className="text-sm text-gray-600">Up to $2M for working capital</p></div>
                <div className="p-4 bg-blue-50 rounded-lg text-center"><Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" /><h3 className="font-bold">Military Reservist</h3><p className="text-sm text-gray-600">For essential employee deployment</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="physical" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Physical Damage Loans</h2>
              <p className="text-gray-700 mb-6">Physical Damage Loans help businesses repair or replace disaster-damaged property including real estate, inventories, supplies, machinery, and equipment. Loans can cover building repairs, equipment replacement, inventory restoration, and code-required improvements. Maximum loan amount is $2 million with terms up to 30 years based on ability to repay.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border"><h3 className="font-bold mb-3 text-red-700">What&apos;s Covered</h3><ul className="space-y-1 text-sm"><li>• Building repairs and reconstruction</li><li>• Equipment replacement</li><li>• Inventory and supplies</li><li>• Machinery and fixtures</li><li>• Improvements to meet current codes</li><li>• Mitigation improvements (20% of loan)</li></ul></div>
                <div className="p-6 bg-white rounded-lg border"><h3 className="font-bold mb-3 text-blue-700">Requirements</h3><ul className="space-y-1 text-sm"><li>• Located in declared disaster area</li><li>• Suffered uninsured disaster losses</li><li>• Operating before the disaster</li><li>• Cannot obtain credit elsewhere</li><li>• Personal guarantee required</li><li>• Collateral for loans over $25K</li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="eidl" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Economic Injury Disaster Loans (EIDL)</h2>
              <p className="text-gray-700 mb-6">EIDL provides working capital loans to help businesses meet financial obligations and operating expenses that could have been met had the disaster not occurred. Unlike Physical Damage Loans, EIDL doesn&apos;t require property damage—it&apos;s based on economic impact from the disaster. This makes EIDL accessible to businesses throughout the affected region, not just those with physical damage.</p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card><CardHeader><CardTitle className="text-orange-700">EIDL Covers</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>• Working capital shortfall</li><li>• Lost revenue replacement</li><li>• Operating expenses</li><li>• Accounts payable</li><li>• Fixed debts and obligations</li><li>• Payroll and rent</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-green-700">EIDL Features</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>• No physical damage required</li><li>• Based on economic impact</li><li>• Available to nonprofits</li><li>• Cannot duplicate insurance</li><li>• Must show substantial injury</li><li>• Up to $2M maximum</li></ul></CardContent></Card>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg"><h3 className="font-bold mb-3">EIDL vs Physical Damage Loans</h3><p className="text-sm text-gray-700">Many businesses qualify for both. Physical Damage covers property repair while EIDL covers cash flow during recovery. Combined, you can access up to $2M total (the programs share this maximum).</p></div>
            </div>
          </div>
        </section>

        <section id="eligibility" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Eligibility Requirements</h2>
              <p className="text-gray-700 mb-6">Most small businesses in declared disaster areas are eligible for disaster loans. The SBA uses size standards based on industry and requires that businesses cannot obtain credit elsewhere on reasonable terms. Both for-profit businesses and nonprofits can apply.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="text-green-700 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Requirements</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>• Located in declared disaster area</li><li>• Meet SBA size standards</li><li>• Cannot get credit elsewhere</li><li>• Operating before the disaster</li><li>• Legal status and good standing</li><li>• No delinquent federal debt</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-red-700 flex items-center"><AlertTriangle className="w-5 h-5 mr-2" />Restrictions</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>• Cannot duplicate other assistance</li><li>• Insurance proceeds deducted</li><li>• Collateral required over $25K</li><li>• Personal guarantee required</li><li>• Credit history considered</li><li>• Some industries restricted</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="application" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Application Process</h2>
              <p className="text-gray-700 mb-6">The disaster loan application process is designed to be accessible during crisis situations. Apply online through disasterloanassistance.sba.gov or at local disaster recovery centers. The SBA streamlines processing for urgent needs but thorough documentation speeds approval.</p>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div><div><h3 className="font-bold">Verify Disaster Declaration</h3><p className="text-gray-600 text-sm">Check disasterloanassistance.sba.gov to confirm your area is in a declared disaster zone.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div><div><h3 className="font-bold">Document All Losses</h3><p className="text-gray-600 text-sm">Photograph damage, list damaged items, get repair estimates, and document lost revenue.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div><div><h3 className="font-bold">Apply Online</h3><p className="text-gray-600 text-sm">Submit application through SBA portal. Include all requested financial information and damage documentation.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div><div><h3 className="font-bold">Property Inspection</h3><p className="text-gray-600 text-sm">SBA inspector verifies damage (for physical damage loans). Cooperate fully with inspection.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section id="documents" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Required Documents</h2>
              <p className="text-gray-700 mb-6">Having complete documentation ready speeds processing significantly. The SBA needs financial information to assess repayment ability and damage documentation to verify losses. Gather these documents before applying.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border"><h3 className="font-bold mb-3 flex items-center"><FileText className="w-5 h-5 text-blue-600 mr-2" />Financial Documents</h3><ul className="space-y-1 text-sm"><li>• Business and personal tax returns (3 years)</li><li>• Profit and loss statements</li><li>• Balance sheet</li><li>• Cash flow projections</li><li>• Bank statements (6 months)</li><li>• Accounts receivable/payable</li></ul></div>
                <div className="p-6 bg-white rounded-lg border"><h3 className="font-bold mb-3 flex items-center"><FileText className="w-5 h-5 text-green-600 mr-2" />Damage Documentation</h3><ul className="space-y-1 text-sm"><li>• Photos of damaged property</li><li>• Repair estimates from contractors</li><li>• Insurance claim documentation</li><li>• Inventory of damaged items</li><li>• Equipment appraisals</li><li>• Legal business documents</li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="timeline" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Timeline &amp; Deadlines</h2>
              <p className="text-gray-700 mb-6">Disaster loan applications have strict deadlines that cannot be extended without good cause. Apply as soon as possible after the disaster declaration—don&apos;t wait for insurance settlements. The SBA can fund approved amounts and adjust later when insurance settles.</p>
              <div className="overflow-x-auto"><table className="w-full border-collapse border border-gray-200"><thead><tr className="bg-red-50"><th className="border px-4 py-3 text-left">Stage</th><th className="border px-4 py-3 text-left">Timeline</th></tr></thead><tbody>
                <tr><td className="border px-4 py-3 font-semibold">Physical Damage Application</td><td className="border px-4 py-3">60 days from disaster declaration</td></tr>
                <tr className="bg-gray-50"><td className="border px-4 py-3 font-semibold">EIDL Application</td><td className="border px-4 py-3">9 months from disaster declaration</td></tr>
                <tr><td className="border px-4 py-3 font-semibold">Initial Processing</td><td className="border px-4 py-3">2-3 weeks (if complete)</td></tr>
                <tr className="bg-gray-50"><td className="border px-4 py-3 font-semibold">Loan Closing</td><td className="border px-4 py-3">1-2 weeks after approval</td></tr>
                <tr><td className="border px-4 py-3 font-semibold">First Disbursement</td><td className="border px-4 py-3">5 days after closing</td></tr>
              </tbody></table></div>
            </div>
          </div>
        </section>

        <section id="terms" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Loan Terms &amp; Rates</h2>
              <p className="text-gray-700 mb-6">SBA disaster loans offer better terms than commercial loans, making recovery more affordable. Interest rates are set by law and are typically 4% or lower for businesses. Repayment terms can extend to 30 years based on your ability to repay. There are no prepayment penalties.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border"><h3 className="font-bold mb-3 text-green-700">Standard Terms</h3><ul className="space-y-1 text-sm"><li>• Maximum loan: $2M</li><li>• Interest rate: Up to 4% (businesses)</li><li>• Term: Up to 30 years</li><li>• Collateral: Required over $25K</li><li>• Personal guarantee: Required</li><li>• No prepayment penalties</li></ul></div>
                <div className="p-6 bg-white rounded-lg border"><h3 className="font-bold mb-3 text-blue-700">Credit Elsewhere Rate</h3><ul className="space-y-1 text-sm"><li>• Higher rate if you can get credit</li><li>• Typically around 8%</li><li>• Still better than most commercial</li><li>• Same 30-year terms available</li><li>• Same collateral requirements</li><li>• Faster processing possible</li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Missing Deadlines</h3><p className="text-sm text-gray-600">Apply immediately. The 60-day deadline for physical damage is strictly enforced.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Waiting for Insurance</h3><p className="text-sm text-gray-600">Don&apos;t wait for insurance settlement. Apply now—SBA adjusts loan after insurance pays.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Incomplete Documentation</h3><p className="text-sm text-gray-600">Missing tax returns or damage photos delay processing. Get everything ready before applying.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Underestimating Losses</h3><p className="text-sm text-gray-600">Include all damages and economic impact. You can&apos;t increase loan amount easily later.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="success" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Success Strategies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><h3 className="font-bold mb-3 text-green-700">✅ Best Practices</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Apply within days of declaration—don&apos;t wait</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Document everything with photos and receipts</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Apply for both physical and EIDL if applicable</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Respond immediately to SBA requests</span></li></ul></div>
                <div><h3 className="font-bold mb-3 text-purple-700">🎯 Pro Tips</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Visit local disaster recovery center for help</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Include mitigation improvements (up to 20%)</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Keep detailed records of lost business</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Request maximum amount—you can turn down excess</span></li></ul></div>
              </div>
            </div>
          </div>
        </section>

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
                <Link href="https://www.sba.gov/funding-programs/disaster-assistance" target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-red-50 rounded-lg border border-red-100 hover:shadow-md transition-all">
                  <ExternalLink className="w-6 h-6 text-red-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-red-900 mb-2">SBA Disaster Assistance</h3>
                    <p className="text-red-800 text-sm">Apply specifically for disaster loans, check declaration status, and manage applications.</p>
                  </div>
                </Link>
                <Link href="https://www.fema.gov/disaster" target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md transition-all">
                  <ExternalLink className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">FEMA Disaster Declarations</h3>
                    <p className="text-blue-800 text-sm">Check strictly for declared disasters in your area eligible for federal assistance.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/sba-7a-loans-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>SBA 7(a) Loans</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/sba-microloans-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>SBA Microloans</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/small-business-grants-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Small Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/usa" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>State-by-State Guides</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-red-700 to-orange-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Need Disaster Loan Help?</h2>
              <p className="text-xl text-red-100 mb-8">Our team helps businesses navigate disaster loan applications, document losses properly, and maximize recovery funding.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/contact?service=disaster-loan-help">Get Expert Help</Link></Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
