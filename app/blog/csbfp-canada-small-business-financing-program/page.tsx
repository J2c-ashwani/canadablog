import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, BookOpen, ExternalLink, HelpCircle, ChevronRight, Briefcase } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Small Business Financing Program (CSBFP) 2026 | Up to $1M Government-Guaranteed Loans",
  description: "Complete guide to Canada Small Business Financing Program (CSBFP). Learn eligibility, loan categories, interest rates, application process, and get up to $1M in government-guaranteed financing.",
  keywords: "CSBFP, Canada Small Business Financing Program, business loans Canada, government guaranteed loans, SME financing Canada, small business loans",
}

export default function CSBFPBlogPage() {
  const faqData = [
    {
      question: "What is the maximum CSBFP loan amount in 2026?",
      answer: "The maximum CSBFP loan is $1,150,000 combined across all categories: up to $350K for equipment, up to $350K for leasehold improvements, and up to $500K for real property. You can combine categories up to the total maximum."
    },
    {
      question: "How do I apply for a CSBFP loan?",
      answer: "Apply through any of the 1,800+ participating lenders (banks, credit unions, Caisses Populaires). Prepare your business plan, financial projections, quotes for equipment/property, and personal information. Processing typically takes 2-4 weeks."
    },
    {
      question: "What's the difference between CSBFP and BDC loans?",
      answer: "CSBFP is a government guarantee program offered through private lenders (banks/credit unions), while BDC is a Crown corporation that lends directly. BDC may approve riskier applications but often at higher rates. CSBFP rates are capped at Prime + 3%."
    },
    {
      question: "Can startups apply for CSBFP?",
      answer: "Yes! CSBFP is popular with startups because the government guarantee makes lenders more willing to finance new businesses. Strong business plan and owner equity are important."
    },
    {
      question: "Do I need collateral for CSBFP?",
      answer: "The financed asset (equipment or property) serves as primary collateral. You cannot be required to pledge personal real estate, but personal guarantees are required (usually 25% of the loan amount)."
    },
    {
      question: "What are the CSBFP interest rates?",
      answer: "The maximum interest rate is Prime + 3% (floating) or Prime + 3% (fixed) at the time of loan registration. Lenders cannot charge more than this cap."
    },
    {
      question: "Can I use CSBFP to buy a franchise?",
      answer: "Yes. Franchise fees are not eligible, but the costs to fit up the location, buy equipment, and leasehold improvements are eligible. It is very common for franchise financing."
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

        <section id="costs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Eligible vs. Ineligible Costs: The Fine Print</h2>
              <p className="text-gray-700 mb-8">The most common reason for CSBFP rejection is applying for the wrong <em>type</em> of cost. This program is asset-based, not for working capital.</p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-500">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center"><CheckCircle className="w-5 h-5 mr-2" /> YES (Eligible)</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start"><span className="text-green-500 mr-2">•</span> <strong>Commercial Vehicles:</strong> Delivery vans, food trucks, work trucks.</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">•</span> <strong>Equipment:</strong> Kitchen ovens, manufacturing robots, POS systems, shelving.</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">•</span> <strong>Leasehold Improvements:</strong> Renovating a rented space (walls, lighting, HVAC).</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">•</span> <strong>Real Property:</strong> Buying the building your business operates in.</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">•</span> <strong>Registration Fees:</strong> The 2% government registration fee can be financed.</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center"><AlertCircle className="w-5 h-5 mr-2" /> NO (Ineligible)</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start"><span className="text-red-500 mr-2">•</span> <strong>Working Capital:</strong> Payroll, inventory, rent, advertising.</li>
                    <li className="flex items-start"><span className="text-red-500 mr-2">•</span> <strong>Goodwill:</strong> The "brand value" portion of a business purchase.</li>
                    <li className="flex items-start"><span className="text-red-500 mr-2">•</span> <strong>Share Purchase:</strong> Buying shares of a corporation (must be an asset purchase).</li>
                    <li className="flex items-start"><span className="text-red-500 mr-2">•</span> <strong>Permits/Licenses:</strong> Operating licenses or franchise fees.</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6">Real Numbers: Loan Cost Example</h2>
              <div className="bg-blue-900 text-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Scenario: $150,000 Kitchen Renovation</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="p-4 bg-blue-800 rounded-lg">
                    <div className="text-sm text-blue-200 uppercase tracking-wide">Total Project</div>
                    <div className="text-2xl font-bold mt-1">$150,000</div>
                  </div>
                  <div className="p-4 bg-blue-800 rounded-lg">
                    <div className="text-sm text-blue-200 uppercase tracking-wide">Bank Finances (90%)</div>
                    <div className="text-2xl font-bold mt-1">$135,000</div>
                  </div>
                  <div className="p-4 bg-blue-800 rounded-lg">
                    <div className="text-sm text-blue-200 uppercase tracking-wide">Your Down Payment (10%)</div>
                    <div className="text-2xl font-bold mt-1">$15,000</div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-blue-700">
                  <h4 className="font-bold mb-4">Estimated Monthly Cost (5-Year Term, 7% Interest)*</h4>
                  <div className="flex items-center justify-between bg-blue-950 p-4 rounded-lg">
                    <span>Monthly Payment</span>
                    <span className="text-2xl font-bold text-green-400">~$2,673</span>
                  </div>
                  <p className="text-xs text-blue-300 mt-2">*Estimate only. Actual rates vary by lender (Prime + 3% max).</p>
                </div>
              </div>
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
              <h2 className="text-3xl font-bold mb-6">The "Bank Meeting" Survival Guide</h2>
              <p className="text-gray-700 mb-8">
                Bankers love the CSBFP because it reduces their risk. But they hate paperwork. If you walk in organized, your chances of approval skyrocket.
              </p>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
                <div className="bg-blue-900 text-white p-6">
                  <h3 className="text-xl font-bold flex items-center"><Briefcase className="w-6 h-6 mr-3" /> Mandatory Document Checklist</h3>
                  <p className="text-blue-100 mt-2">Bring physical copies of these to your first meeting. Do not make the banker chase you.</p>
                </div>
                <div className="p-6 grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4 border-b pb-2">1. The Asset Documents</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> <strong>Equipment:</strong> Formal vendor quotes (not just email screenshots) with model numbers and prices.</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> <strong>Leasehold:</strong> Contractor estimates on letterhead + copy of your signed lease.</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> <strong>Property:</strong> Offer to Purchase (conditional on financing) + MLS listing.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4 border-b pb-2">2. The Business Documents</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" /> <strong>Business Plan:</strong> Executive summary focusing on <em>repayment capability</em>.</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" /> <strong>Cash Flow Forecast:</strong> Month-by-month projection for Year 1.</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" /> <strong>Articles of Incorporation:</strong> Proof you are a legal entity.</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" /> <strong>Personal Net Worth Statement:</strong> For all guarantors.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Step-by-Step Approval Path</h3>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div><div><h3 className="font-bold">Choose Your Lender</h3><p className="text-gray-600 text-sm">Select from over 1,800 participating financial institutions. <strong>Pro Tip:</strong> Use the bank where you already have your business account (chequing). They have your history.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div><div><h3 className="font-bold">The "Pre-Flight" Check</h3><p className="text-gray-600 text-sm">Call the Small Business Specialist at the branch. Ask specifically: "Do you process CSBFP loans at this branch, or should I go to the Commercial Banking Centre?" Save yourself a wasted trip.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div><div><h3 className="font-bold">Submit & Wait</h3><p className="text-gray-600 text-sm">Submit the checklist items. Processing involves two approvals: the Bank's internal credit team AND the government validation. This takes 2-4 weeks. Do not sign a lease starting tomorrow.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div><div><h3 className="font-bold">Funding & Registration</h3><p className="text-gray-600 text-sm">Once approved, you sign the loan. The bank deducts the 2% registration fee automatically from the loan proceeds. You start buying your equipment.</p></div></div>
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

        <section id="success-stories" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">CSBFP In Action</h2>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-orange-900 p-8 flex flex-col justify-center text-white">
                    <Building className="w-12 h-12 mb-4 text-orange-300" />
                    <h3 className="text-xl font-bold mb-2">The First-Time Franchisee</h3>
                    <p className="text-orange-200 text-sm">Fast Food | Toronto, ON</p>
                    <div className="mt-4 pt-4 border-t border-orange-700">
                      <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Loan Amount</p>
                      <p className="text-lg font-bold">$350,000</p>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Breaking the "New Business" Barrier</h4>
                    <p className="text-gray-600 mb-4">
                      Sarah wanted to open a popular coffee franchise. Total cost was $500,000. She had $150,000 saved but no bank would lend a new business $350,000 without 3 years of financials.
                    </p>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                      <p className="text-sm text-gray-800">
                        <strong>The CSBFP Fix:</strong> Because franchise equipment and leaseholds have value, the bank used the CSBFP to finance 90% of the fit-up costs. Sarah kept her savings for working capital (inventory, staff), which the loan couldn't cover.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-blue-900 p-8 flex flex-col justify-center text-white">
                    <Target className="w-12 h-12 mb-4 text-blue-300" />
                    <h3 className="text-xl font-bold mb-2">The Manufacturer</h3>
                    <p className="text-blue-200 text-sm">Machining | Edmonton, AB</p>
                    <div className="mt-4 pt-4 border-t border-blue-700">
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">Loan Amount</p>
                      <p className="text-lg font-bold">$115,000</p>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Upgrading to Stay Competitive</h4>
                    <p className="text-gray-600 mb-4">
                      Mike's machine shop was losing contracts because his 20-year-old CNC machine was too slow. A new 5-axis unit cost $130,000. He didn't want to drain his cash reserves.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <p className="text-sm text-gray-800">
                        <strong>The CSBFP Fix:</strong> The bank financed the machine over 10 years using CSBFP equipment financing. The monthly payment was lower than the profit from just <em>one</em> new contract the machine enabled.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section id="glossary" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Glossary: Speak Like a Banker</h2>
              <p className="text-gray-700 mb-8">
                Bankers use a specific language. Understanding these terms will help you negotiate better terms and avoid confusion during the application process.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border p-5 rounded-lg">
                  <h3 className="font-bold text-blue-900 mb-2">Amortization vs. Term</h3>
                  <p className="text-sm text-gray-600">
                    <strong>Amortization</strong> is how long it takes to pay off the loan (e.g., 10 years). The <strong>Term</strong> is how long your rate is locked for (e.g., 5 years). At the end of the term, you renew the rate, but the amortization continues.
                  </p>
                </div>
                <div className="border p-5 rounded-lg">
                  <h3 className="font-bold text-blue-900 mb-2">DSCR (Debt Service Coverage Ratio)</h3>
                  <p className="text-sm text-gray-600">
                    A key metric bankers use. It's (Net Operating Income / Total Debt Payments). They want to see a ratio of <strong>1.25x or higher</strong>. It means you have $1.25 in profit for every $1.00 of debt payment.
                  </p>
                </div>
                <div className="border p-5 rounded-lg">
                  <h3 className="font-bold text-blue-900 mb-2">Personal Guarantee</h3>
                  <p className="text-sm text-gray-600">
                    A legal promise to repay the loan personally if the business fails. For CSBFP, this is usually limited to 25% of the original loan amount, unlike standard bank loans which are often 100%.
                  </p>
                </div>
                <div className="border p-5 rounded-lg">
                  <h3 className="font-bold text-blue-900 mb-2">General Security Agreement (GSA)</h3>
                  <p className="text-sm text-gray-600">
                    A blanket lien on all your business assets (inventory, accounts receivable, equipment). Most banks require this in addition to the specific CSBFP registration.
                  </p>
                </div>
                <div className="border p-5 rounded-lg">
                  <h3 className="font-bold text-blue-900 mb-2">Prime Rate</h3>
                  <p className="text-sm text-gray-600">
                    The variable interest rate banks charge their best customers. CSBFP loans are capped at Prime + 3%. If Prime is 7%, your maximum rate is 10%.
                  </p>
                </div>
                <div className="border p-5 rounded-lg">
                  <h3 className="font-bold text-blue-900 mb-2">Covenant</h3>
                  <p className="text-sm text-gray-600">
                    A rule in your loan agreement (e.g., "Maintain a Debt-to-Equity ratio of 2:1"). Breaking a covenant can put your loan in default, even if you are making payments on time.
                  </p>
                </div>
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
                {faqData.map((faq, index) => (
                  <Accordion type="single" collapsible key={index}>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-medium text-blue-700">{faq.question}</span>
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

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Provincial Business Grant Programs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Link href="/blog/ontario-government-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Building className="w-5 h-5 text-red-600 mr-3" /><span>Ontario Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/british-columbia-government-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Building className="w-5 h-5 text-blue-600 mr-3" /><span>BC Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/alberta-government-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Building className="w-5 h-5 text-blue-500 mr-3" /><span>Alberta Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/quebec-government-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Building className="w-5 h-5 text-purple-600 mr-3" /><span>Quebec Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/small-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Building className="w-5 h-5 text-green-600 mr-3" /><span>All Canadian Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
              <h3 className="text-xl font-bold mb-4">Related Funding Guides</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/irap-industrial-research-assistance-program" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-green-600 mr-3" /><span>IRAP Program Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/canada-federal-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-green-600 mr-3" /><span>Federal Grants Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
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
