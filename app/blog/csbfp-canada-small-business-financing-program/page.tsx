import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, BookOpen, ExternalLink, HelpCircle, ChevronRight, Briefcase } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Small Business Financing Program (CSBFP) 2026 | Up to $1M Government-Guaranteed Loans",
  description: "Complete guide to Canada Small Business Financing Program (CSBFP). Learn eligibility, loan categories, interest rates, application process, and get up to $1M in government-guaranteed financing.",
  keywords: "CSBFP, Canada Small Business Financing Program, business loans Canada, government guaranteed loans, SME financing Canada, small business loans",
}

export default function CSBFPBlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30"><Building className="w-3 h-3 mr-1" /> CSBFP Complete Guide</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Canada Small Business Financing Program (CSBFP) 2026</h1>
              <p className="text-xl text-blue-100 mb-8">Everything you need to know about securing government-guaranteed loans up to $1,150,000 for your Canadian small business. Learn loan categories, eligibility, interest rates, and application process.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/grant-finder?program=csbfp">Check CSBFP Eligibility</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. What Is CSBFP?</a></li>
                  <li><a href="#benefits" className="text-blue-700 hover:underline">2. Program Benefits</a></li>
                  <li><a href="#equipment" className="text-blue-700 hover:underline">3. Equipment Financing</a></li>
                  <li><a href="#leasehold" className="text-blue-700 hover:underline">4. Leasehold Improvements</a></li>
                  <li><a href="#property" className="text-blue-700 hover:underline">5. Real Property Purchase</a></li>
                  <li><a href="#eligibility" className="text-blue-700 hover:underline">6. Eligibility Requirements</a></li>
                  <li><a href="#application" className="text-blue-700 hover:underline">7. Application Process</a></li>
                  <li><a href="#rates" className="text-blue-700 hover:underline">8. Interest Rates &amp; Fees</a></li>
                  <li><a href="#lenders" className="text-blue-700 hover:underline">9. Participating Lenders</a></li>
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
              <div><div className="text-3xl font-bold text-blue-600 mb-2">$1.15M</div><div className="text-gray-600">Maximum Loan</div></div>
              <div><div className="text-3xl font-bold text-green-600 mb-2">85%</div><div className="text-gray-600">Government Guarantee</div></div>
              <div><div className="text-3xl font-bold text-purple-600 mb-2">$50B+</div><div className="text-gray-600">Total Approved Since 1999</div></div>
              <div><div className="text-3xl font-bold text-orange-600 mb-2">1800+</div><div className="text-gray-600">Participating Lenders</div></div>
            </div>
          </div>
        </section>

        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Is the Canada Small Business Financing Program?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">The Canada Small Business Financing Program (CSBFP) is a federal loan loss-sharing program between the Government of Canada and participating financial institutions. It helps small businesses access term loans for purchasing or improving assets that would otherwise be difficult to finance through conventional means.</p>
              <p className="text-gray-700 leading-relaxed mb-6">The program reduces lender risk by providing a government guarantee on 85% of eligible loans. This makes it easier for new businesses, businesses with limited collateral, or businesses in higher-risk sectors to obtain financing. Since its inception, the CSBFP has helped over 65,000 businesses access more than $50 billion in financing.</p>
              <p className="text-gray-700 leading-relaxed mb-6">Unlike direct grants, CSBFP loans must be repaid with interest. However, the government guarantee enables access to financing that might not otherwise be available, and interest rates are regulated to ensure affordability. The program covers equipment purchases, leasehold improvements, and real property acquisition.</p>
            </div>
          </div>
        </section>

        <section id="benefits" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">CSBFP Program Benefits</h2>
              <p className="text-gray-700 mb-6">The CSBFP offers significant advantages over conventional business financing, particularly for new businesses and those with limited assets or credit history. Understanding these benefits helps you determine if CSBFP is right for your business.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-blue-200"><CardHeader><CardTitle className="text-blue-700">Access Benefits</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>85% government guarantee reduces lender risk</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Available to new and existing businesses</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Less stringent collateral requirements</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Over 1,800 participating lenders</span></li></ul></CardContent></Card>
                <Card className="border-green-200"><CardHeader><CardTitle className="text-green-700">Financial Benefits</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Competitive interest rates (Prime + 3% max)</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>No personal real estate collateral</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Up to 10-year repayment terms</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>No prepayment penalties</span></li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="equipment" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Equipment Financing (Up to $350,000)</h2>
              <p className="text-gray-700 mb-6">CSBFP equipment financing covers new or used equipment essential for business operations. The equipment serves as collateral for the loan, making this category accessible even for businesses with limited other assets. Maximum repayment term is aligned with the equipment&apos;s useful life, up to 10 years.</p>
              <Card className="border-blue-200"><CardContent className="pt-6"><div className="grid md:grid-cols-3 gap-4 mb-4"><div className="flex items-center"><DollarSign className="w-5 h-5 text-green-600 mr-2" /><span><strong>Up to $350K</strong></span></div><div className="flex items-center"><Clock className="w-5 h-5 text-blue-600 mr-2" /><span><strong>Max 10 years</strong></span></div><div className="flex items-center"><Target className="w-5 h-5 text-purple-600 mr-2" /><span><strong>New/Used OK</strong></span></div></div>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div><h3 className="font-bold mb-2">Eligible Equipment</h3><ul className="text-sm space-y-1"><li>• Manufacturing machinery and tools</li><li>• Computer hardware and software</li><li>• Vehicle for business use</li><li>• Office furniture and equipment</li><li>• Restaurant/retail equipment</li><li>• Healthcare/dental equipment</li></ul></div>
                  <div><h3 className="font-bold mb-2">Requirements</h3><ul className="text-sm space-y-1"><li>• Equipment used for business purposes</li><li>• Equipment serves as loan collateral</li><li>• Quote or invoice from vendor</li><li>• Equipment remains in Canada</li><li>• Business ownership of equipment</li><li>• Insurance on financed equipment</li></ul></div>
                </div></CardContent></Card>
            </div>
          </div>
        </section>

        <section id="leasehold" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Leasehold Improvements (Up to $350,000)</h2>
              <p className="text-gray-700 mb-6">CSBFP leasehold improvement financing covers renovations and upgrades to leased commercial spaces. This is particularly valuable for businesses that need to customize their space but don&apos;t own the property. Loan term must not exceed the remaining lease term.</p>
              <Card className="border-green-200"><CardContent className="pt-6"><div className="grid md:grid-cols-3 gap-4 mb-4"><div className="flex items-center"><DollarSign className="w-5 h-5 text-green-600 mr-2" /><span><strong>Up to $350K</strong></span></div><div className="flex items-center"><Clock className="w-5 h-5 text-blue-600 mr-2" /><span><strong>Lease-aligned</strong></span></div><div className="flex items-center"><Target className="w-5 h-5 text-purple-600 mr-2" /><span><strong>Leased Premises</strong></span></div></div>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div><h3 className="font-bold mb-2">Eligible Improvements</h3><ul className="text-sm space-y-1"><li>• Renovations and upgrades</li><li>• Electrical and plumbing work</li><li>• Flooring and interior design</li><li>• HVAC system improvements</li><li>• Accessibility modifications</li><li>• Building code compliance</li></ul></div>
                  <div><h3 className="font-bold mb-2">Requirements</h3><ul className="text-sm space-y-1"><li>• Valid lease agreement required</li><li>• Landlord consent may be needed</li><li>• Improvements must add value</li><li>• Permanent improvements preferred</li><li>• Contractor quotes required</li><li>• Term aligned with lease</li></ul></div>
                </div></CardContent></Card>
            </div>
          </div>
        </section>

        <section id="property" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Real Property Purchase (Up to $500,000)</h2>
              <p className="text-gray-700 mb-6">CSBFP real property financing helps small businesses purchase commercial real estate for their operations. This is the largest loan category and enables businesses to build equity through property ownership rather than paying rent. The property must be used primarily for business purposes.</p>
              <Card className="border-purple-200"><CardContent className="pt-6"><div className="grid md:grid-cols-3 gap-4 mb-4"><div className="flex items-center"><DollarSign className="w-5 h-5 text-green-600 mr-2" /><span><strong>Up to $500K</strong></span></div><div className="flex items-center"><Clock className="w-5 h-5 text-blue-600 mr-2" /><span><strong>Max 10 years</strong></span></div><div className="flex items-center"><Target className="w-5 h-5 text-purple-600 mr-2" /><span><strong>Business Use</strong></span></div></div>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div><h3 className="font-bold mb-2">Eligible Properties</h3><ul className="text-sm space-y-1"><li>• Office buildings</li><li>• Retail spaces</li><li>• Manufacturing facilities</li><li>• Warehouses and storage</li><li>• Commercial mixed-use buildings</li><li>• Restaurant locations</li></ul></div>
                  <div><h3 className="font-bold mb-2">Requirements</h3><ul className="text-sm space-y-1"><li>• Property for business use only</li><li>• Professional appraisal required</li><li>• Environmental assessment needed</li><li>• Title insurance mandatory</li><li>• Down payment required</li><li>• Property insurance required</li></ul></div>
                </div></CardContent></Card>
            </div>
          </div>
        </section>

        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">CSBFP Eligibility Requirements</h2>
              <p className="text-gray-700 mb-6">CSBFP eligibility is based on business size, structure, and sector. The program is designed for small businesses that might have difficulty accessing conventional financing. Understanding eligibility criteria helps you determine if CSBFP is right for your business.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="text-green-700 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Eligible Businesses</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li><strong>Small Business:</strong> Annual gross revenues of $10M or less</li><li><strong>For-Profit:</strong> Must be operated for profit</li><li><strong>Canadian Operations:</strong> Operating in Canada</li><li><strong>Most Industries:</strong> Wide sector coverage</li><li><strong>New or Existing:</strong> Both qualify</li><li><strong>Any Legal Structure:</strong> Sole prop, partnership, corporation</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-red-700 flex items-center"><AlertCircle className="w-5 h-5 mr-2" />Ineligible Businesses</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li><strong>Farming &amp; Agriculture:</strong> Primary agriculture operations</li><li><strong>Charitable Organizations:</strong> Non-profit entities</li><li><strong>Religious Organizations:</strong> Faith-based organizations</li><li><strong>Financial Services:</strong> Banks, insurance companies</li><li><strong>Government Entities:</strong> Crown corporations</li><li><strong>$10M+ Revenue:</strong> Larger businesses</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="application" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">CSBFP Application Process</h2>
              <p className="text-gray-700 mb-6">CSBFP applications are submitted through participating financial institutions, not directly to the government. The lender evaluates your application using their standard credit criteria plus CSBFP requirements. Processing time typically ranges from 2-4 weeks.</p>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div><div><h3 className="font-bold">Choose Your Lender</h3><p className="text-gray-600 text-sm">Select from over 1,800 participating financial institutions including major banks, credit unions, and alternative lenders. Consider their industry expertise and CSBFP experience.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div><div><h3 className="font-bold">Prepare Required Documents</h3><p className="text-gray-600 text-sm">Gather business financials, business plan, equipment quotes or property appraisals, personal information for guarantors, and proof of business registration.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div><div><h3 className="font-bold">Submit Loan Application</h3><p className="text-gray-600 text-sm">Complete the lender&apos;s application forms and CSBFP-specific documentation. Be prepared to explain your business plan and how funds will be used.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div><div><h3 className="font-bold">Lender Review &amp; Approval</h3><p className="text-gray-600 text-sm">Lender reviews application using standard credit criteria and CSBFP guidelines. Decision typically within 2-4 weeks. May require additional documentation.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">5</div><div><h3 className="font-bold">Loan Closing &amp; Funding</h3><p className="text-gray-600 text-sm">Complete loan documentation, pay registration fee (2% of loan amount), and receive funding. Equipment must be purchased within reasonable timeframe.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section id="rates" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Interest Rates &amp; Fees</h2>
              <p className="text-gray-700 mb-6">CSBFP interest rates are regulated to ensure affordability. Lenders cannot charge more than the maximum rates, though they may offer better rates to qualified borrowers. Understanding the fee structure helps you calculate total borrowing costs.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-blue-800 mb-4">CSBFP Interest Rate Structure</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><h4 className="font-bold mb-2">Floating Rate Loans</h4><ul className="text-sm space-y-1"><li><strong>Maximum Rate:</strong> Prime + 3%</li><li>Rate adjusts with prime rate changes</li><li>Most common option for borrowers</li></ul></div>
                  <div><h4 className="font-bold mb-2">Fixed Rate Loans</h4><ul className="text-sm space-y-1"><li><strong>Maximum Rate:</strong> Prime + 3% (at approval)</li><li>Rate locked for entire term</li><li>Provides payment certainty</li></ul></div>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <Card><CardContent className="pt-6 text-center"><div className="text-2xl font-bold text-blue-600 mb-2">Up to 10 Years</div><p className="text-sm text-gray-600">Maximum Repayment Term</p></CardContent></Card>
                <Card><CardContent className="pt-6 text-center"><div className="text-2xl font-bold text-green-600 mb-2">2% + HST</div><p className="text-sm text-gray-600">Registration Fee</p></CardContent></Card>
                <Card><CardContent className="pt-6 text-center"><div className="text-2xl font-bold text-purple-600 mb-2">No Penalty</div><p className="text-sm text-gray-600">Early Prepayment</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="lenders" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Participating Lenders</h2>
              <p className="text-gray-700 mb-6">Over 1,800 financial institutions participate in the CSBFP program, giving you many options for finding the right lender. Major banks, credit unions, and alternative lenders all participate. Consider lender experience in your industry when making your choice.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-white rounded-lg border"><h3 className="font-bold mb-2 text-blue-700">Major Banks</h3><p className="text-sm text-gray-600">TD, RBC, BMO, Scotiabank, CIBC, National Bank, HSBC, and other chartered banks.</p></div>
                <div className="p-4 bg-white rounded-lg border"><h3 className="font-bold mb-2 text-green-700">Credit Unions</h3><p className="text-sm text-gray-600">Local and regional credit unions often have competitive rates and personalized service.</p></div>
                <div className="p-4 bg-white rounded-lg border"><h3 className="font-bold mb-2 text-purple-700">Caisses Populaires</h3><p className="text-sm text-gray-600">Desjardins and other Caisses Populaires in Quebec and other provinces.</p></div>
                <div className="p-4 bg-white rounded-lg border"><h3 className="font-bold mb-2 text-orange-700">Alternative Lenders</h3><p className="text-sm text-gray-600">BDC, Community Futures, and other specialized business lenders.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Incomplete Applications</h3><p className="text-sm text-gray-600">Missing required documentation delays processing. Prepare all documents before applying.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Unrealistic Projections</h3><p className="text-sm text-gray-600">Overly optimistic financial forecasts hurt credibility. Use conservative, realistic numbers.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Poor Cash Flow Planning</h3><p className="text-sm text-gray-600">Not demonstrating how you&apos;ll repay the loan. Show clear cash flow to cover payments.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Wrong Lender Choice</h3><p className="text-sm text-gray-600">Some lenders specialize in certain industries. Find one experienced in your sector.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="success" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Success Strategies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><h3 className="font-bold mb-3 text-green-700">✅ Increase Approval Odds</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Prepare detailed business plan with financials</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Maintain good personal and business credit</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Demonstrate relevant industry experience</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Show adequate owner equity contribution</span></li></ul></div>
                <div><h3 className="font-bold mb-3 text-purple-700">🎯 Pro Tips</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Shop multiple lenders for best terms</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Consider credit unions for personalized service</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Prepare for lender questions in advance</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Consider combining with other programs</span></li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />What&apos;s the difference between CSBFP and BDC loans?</h3><p className="text-gray-700 mt-2 ml-7">CSBFP is a government guarantee program offered through private lenders, while BDC is a Crown corporation that lends directly. BDC may approve riskier applications but often at higher rates.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />Can startups apply for CSBFP?</h3><p className="text-gray-700 mt-2 ml-7">Yes! CSBFP is popular with startups because the government guarantee makes lenders more willing to finance new businesses. Strong business plan and owner equity are important.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />Do I need collateral for CSBFP?</h3><p className="text-gray-700 mt-2 ml-7">The financed asset (equipment or property) serves as primary collateral. You cannot be required to pledge personal real estate, but personal guarantees are required.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/canada/small-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Canadian SME Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/irap-industrial-research-assistance-program" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>IRAP Program Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/women-entrepreneurship-fund-canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Women Entrepreneurship Fund</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>All Canadian Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Ready to Apply for CSBFP?</h2>
              <p className="text-xl text-blue-100 mb-8">Get expert help with your CSBFP application. Our team has helped Canadian businesses secure over $50M in CSBFP financing with a 95% approval rate.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/guides/apply-csbfp-loans"><Download className="w-4 h-4 mr-2" /> Get Application Guide</Link></Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild><Link href="/contact?service=csbfp-expert-help">Get Expert Help</Link></Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
