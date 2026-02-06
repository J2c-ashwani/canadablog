import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle, DollarSign, Target, AlertTriangle, FileText,
  Clock, ChevronRight, ExternalLink, BookOpen, HelpCircle, Briefcase,
  Building2, CreditCard, TrendingUp, ShieldCheck, Percent
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SBA Loans & Grants Complete Guide 2026 | 7(a), 504, Microloans Explained",
  description: "Complete guide to SBA loans and grants. Learn about 7(a) loans, CDC/504 loans, microloans, disaster loans, and SBA-backed grant programs. Access up to $5M in funding.",
  keywords: "SBA loans, SBA grants, 7(a) loans, 504 loans, microloans, SBA disaster loans, small business funding",
}

export default function SBALoansGrantsGuidePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-700 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                <Building2 className="w-3 h-3 mr-1" /> Official SBA Programs Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                SBA Loans &amp; Grants Complete Guide 2026
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Access $44.8 billion in annual SBA-backed funding. Complete guide to 7(a), 504,
                Microloans, Disaster Loans, and grant programs for American small businesses.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                <Link href="/contact?service=sba-loan-help">Get SBA Loan Application Help</Link>
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
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. What is the SBA?</a></li>
                  <li><a href="#loan-types" className="text-blue-700 hover:underline">2. SBA Loan Types Explained</a></li>
                  <li><a href="#7a-loans" className="text-blue-700 hover:underline">3. 7(a) Loans In-Depth</a></li>
                  <li><a href="#504-loans" className="text-blue-700 hover:underline">4. CDC/504 Loans</a></li>
                  <li><a href="#microloans" className="text-blue-700 hover:underline">5. SBA Microloans</a></li>
                  <li><a href="#disaster" className="text-blue-700 hover:underline">6. Disaster Loans</a></li>
                  <li><a href="#grants" className="text-blue-700 hover:underline">7. SBA Grant Programs</a></li>
                  <li><a href="#eligibility" className="text-blue-700 hover:underline">8. Eligibility Requirements</a></li>
                  <li><a href="#how-to-apply" className="text-blue-700 hover:underline">9. How to Apply</a></li>
                  <li><a href="#mistakes" className="text-blue-700 hover:underline">10. Common Mistakes</a></li>
                  <li><a href="#comparison" className="text-blue-700 hover:underline">11. SBA vs Conventional</a></li>
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
              <div><div className="text-3xl font-bold text-green-600 mb-2">$44.8B</div><div className="text-gray-600">Annual Approvals</div></div>
              <div><div className="text-3xl font-bold text-blue-600 mb-2">$5M</div><div className="text-gray-600">Max 7(a) Loan</div></div>
              <div><div className="text-3xl font-bold text-purple-600 mb-2">75-85%</div><div className="text-gray-600">SBA Guarantee</div></div>
              <div><div className="text-3xl font-bold text-emerald-600 mb-2">10%</div><div className="text-gray-600">Min Down Payment</div></div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What is the Small Business Administration (SBA)?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The SBA is a federal agency that supports small businesses through loan guarantees, training,
                contracting assistance, and advocacy. The SBA doesn&apos;t lend directly—instead, it guarantees
                loans made by approved lenders (banks, credit unions, CDFIs), reducing lender risk and making
                capital more accessible to small businesses.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-3 text-green-700">Why SBA Loans?</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Lower down payments (10-15% vs 20-30%)</span></li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Longer repayment terms (7-25 years)</span></li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Competitive interest rates</span></li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Flexible collateral requirements</span></li>
                  </ul>
                </CardContent></Card>
                <Card><CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-3 text-blue-700">SBA Services</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /><span>Loan guarantees (7(a), 504, Microloans)</span></li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /><span>Business counseling (SCORE, SBDC)</span></li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /><span>Government contracting assistance</span></li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /><span>Disaster assistance loans</span></li>
                  </ul>
                </CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        {/* Loan Types Comparison */}
        <section id="loan-types" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">SBA Loan Types Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Max Amount</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Terms</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border px-4 py-3 font-semibold">7(a) Standard</td><td className="border px-4 py-3 text-green-600">$5M</td><td className="border px-4 py-3">7-25 years</td><td className="border px-4 py-3">General business purposes</td></tr>
                    <tr className="bg-gray-50"><td className="border px-4 py-3 font-semibold">SBA Express</td><td className="border px-4 py-3 text-green-600">$500K</td><td className="border px-4 py-3">7-25 years</td><td className="border px-4 py-3">Fast approval (36 hours)</td></tr>
                    <tr><td className="border px-4 py-3 font-semibold">CDC/504</td><td className="border px-4 py-3 text-green-600">$5.5M</td><td className="border px-4 py-3">10-25 years</td><td className="border px-4 py-3">Real estate, equipment</td></tr>
                    <tr className="bg-gray-50"><td className="border px-4 py-3 font-semibold">Microloans</td><td className="border px-4 py-3 text-green-600">$50K</td><td className="border px-4 py-3">Up to 6 years</td><td className="border px-4 py-3">Startups, small needs</td></tr>
                    <tr><td className="border px-4 py-3 font-semibold">Disaster Loans</td><td className="border px-4 py-3 text-green-600">$2M</td><td className="border px-4 py-3">Up to 30 years</td><td className="border px-4 py-3">Disaster recovery</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 7(a) Loans */}
        <section id="7a-loans" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">SBA 7(a) Loans: The Most Popular Program</h2>
              <p className="text-gray-700 mb-6">The 7(a) program is the SBA&apos;s primary loan program, accounting for most SBA lending. It offers flexible terms for various business purposes including working capital, equipment, real estate, and debt refinancing.</p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border"><DollarSign className="w-6 h-6 text-green-600 mb-2" /><div className="font-bold">Up to $5M</div><div className="text-sm text-gray-600">Maximum loan amount</div></div>
                <div className="bg-white p-4 rounded-lg border"><Clock className="w-6 h-6 text-blue-600 mb-2" /><div className="font-bold">7-25 Years</div><div className="text-sm text-gray-600">Repayment terms</div></div>
                <div className="bg-white p-4 rounded-lg border"><Percent className="w-6 h-6 text-purple-600 mb-2" /><div className="font-bold">75-85%</div><div className="text-sm text-gray-600">SBA guarantee</div></div>
              </div>

              <h3 className="font-bold text-xl mb-4">7(a) Loan Subtypes</h3>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border flex items-start"><div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0"><span className="text-green-600 font-bold text-sm">S</span></div><div><strong>Standard 7(a)</strong> – Full documentation, up to $5M, most flexibility</div></div>
                <div className="p-4 bg-white rounded-lg border flex items-start"><div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0"><span className="text-blue-600 font-bold text-sm">E</span></div><div><strong>SBA Express</strong> – Up to $500K, 36-hour SBA turnaround, 50% guarantee</div></div>
                <div className="p-4 bg-white rounded-lg border flex items-start"><div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0"><span className="text-purple-600 font-bold text-sm">C</span></div><div><strong>CAPLines</strong> – Revolving credit lines for working capital needs</div></div>
                <div className="p-4 bg-white rounded-lg border flex items-start"><div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0"><span className="text-orange-600 font-bold text-sm">E</span></div><div><strong>Export Loans</strong> – Export Express and Export Working Capital programs</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* 504 Loans */}
        <section id="504-loans" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">CDC/504 Loans: Fixed-Rate Real Estate &amp; Equipment</h2>
              <p className="text-gray-700 mb-6">The 504 program provides long-term, fixed-rate financing for major fixed assets like real estate and heavy equipment. Structured as two loans: 50% from a bank, 40% from a Certified Development Company (CDC), and 10% down payment from the borrower.</p>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-lg mb-4">504 Loan Structure</h3>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-4 rounded"><div className="text-2xl font-bold text-blue-600">50%</div><div className="text-sm">Bank Loan (Variable)</div></div>
                  <div className="bg-white p-4 rounded"><div className="text-2xl font-bold text-green-600">40%</div><div className="text-sm">CDC/SBA (Fixed Rate)</div></div>
                  <div className="bg-white p-4 rounded"><div className="text-2xl font-bold text-purple-600">10%</div><div className="text-sm">Borrower Down Payment</div></div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div><h4 className="font-bold mb-3">✅ Eligible Uses</h4><ul className="space-y-2 text-sm"><li>• Purchase land and buildings</li><li>• Construct or renovate facilities</li><li>• Purchase heavy machinery/equipment</li><li>• Modernize facilities</li></ul></div>
                <div><h4 className="font-bold mb-3">❌ Not Eligible</h4><ul className="space-y-2 text-sm"><li>• Working capital</li><li>• Inventory purchases</li><li>• Refinancing existing debt</li><li>• Investment properties</li></ul></div>
              </div>
            </div>
          </div>
        </section>

        {/* Microloans */}
        <section id="microloans" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">SBA Microloans: Small Funding for Big Dreams</h2>
              <p className="text-gray-700 mb-6">Microloans up to $50,000 (average $13,000) for startups and small businesses. Delivered through nonprofit community lenders who also provide business training and technical assistance.</p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardContent className="pt-6">
                  <h3 className="font-bold mb-3">Program Details</h3>
                  <ul className="space-y-2 text-sm"><li>💰 Up to $50,000 (avg $13K)</li><li>⏱️ Up to 6-year terms</li><li>📊 Rates: 8-13%</li><li>📍 Through nonprofit intermediaries</li></ul>
                </CardContent></Card>
                <Card><CardContent className="pt-6">
                  <h3 className="font-bold mb-3">Eligible Uses</h3>
                  <ul className="space-y-2 text-sm"><li>✅ Working capital</li><li>✅ Inventory, supplies</li><li>✅ Furniture, fixtures</li><li>✅ Equipment (not real estate)</li></ul>
                </CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        {/* Disaster Loans */}
        <section id="disaster" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">SBA Disaster Loans</h2>
              <p className="text-gray-700 mb-6">Low-interest disaster loans for businesses, homeowners, and renters affected by declared disasters. Unlike other SBA programs, these are direct loans from the SBA.</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200"><h4 className="font-bold mb-2">Physical Disaster Loans</h4><p className="text-sm">Up to $2M for damaged property, equipment, inventory</p></div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200"><h4 className="font-bold mb-2">Economic Injury (EIDL)</h4><p className="text-sm">Up to $2M for working capital during recovery</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* Grant Programs */}
        <section id="grants" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">SBA Grant &amp; Support Programs</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                <p className="text-gray-700"><strong>Important:</strong> The SBA rarely offers direct grants to businesses. Most &quot;SBA grants&quot; are actually loans. However, SBA-funded programs provide free support.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-2">SCORE</h3><p className="text-sm text-gray-600">Free mentoring from experienced business professionals</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-2">SBDC</h3><p className="text-sm text-gray-600">Free business counseling at 900+ locations</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-2">Women&apos;s Business Centers</h3><p className="text-sm text-gray-600">Training for women entrepreneurs</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-2">Veterans Business Outreach</h3><p className="text-sm text-gray-600">Support for veteran-owned businesses</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Who is Eligible for SBA Loans?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="text-green-700 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Requirements</CardTitle></CardHeader><CardContent>
                  <ul className="space-y-2 text-sm"><li>• For-profit US business</li><li>• Meet SBA size standards</li><li>• Owner has equity invested</li><li>• Exhausted other financing options</li><li>• Good character (no recent bankruptcies)</li><li>• Able to repay the loan</li></ul>
                </CardContent></Card>
                <Card><CardHeader><CardTitle className="text-red-700 flex items-center"><AlertTriangle className="w-5 h-5 mr-2" />Ineligible</CardTitle></CardHeader><CardContent>
                  <ul className="space-y-2 text-sm"><li>• Lending/investment companies</li><li>• Gambling businesses</li><li>• Illegal activities</li><li>• Multi-level marketing</li><li>• Government-owned entities</li><li>• Passive income businesses</li></ul>
                </CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section id="how-to-apply" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Apply for SBA Loans</h2>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div><div><h3 className="font-bold">Prepare Your Business Plan</h3><p className="text-gray-600 text-sm">Include executive summary, market analysis, financial projections</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div><div><h3 className="font-bold">Gather Financial Documents</h3><p className="text-gray-600 text-sm">Tax returns (3 years), financial statements, bank statements</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div><div><h3 className="font-bold">Find an SBA-Approved Lender</h3><p className="text-gray-600 text-sm">Use SBA Lender Match or contact local banks</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div><div><h3 className="font-bold">Submit Application</h3><p className="text-gray-600 text-sm">Complete SBA Form 1919, provide all requested documentation</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">5</div><div><h3 className="font-bold">Await Approval &amp; Close</h3><p className="text-gray-600 text-sm">Review typically takes 30-90 days; close and receive funds</p></div></div>
              </div>
            </div>
          </div>
        </section>

        {/* Mistakes */}
        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common SBA Loan Application Mistakes</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Incomplete Documentation</h3><p className="text-sm text-gray-600">Missing tax returns, financial statements, or required forms delays processing significantly.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Poor Credit History</h3><p className="text-sm text-gray-600">Personal credit below 650 makes approval difficult. Check and improve credit before applying.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Unclear Loan Purpose</h3><p className="text-sm text-gray-600">Vague descriptions of how funds will be used raises red flags with lenders.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Insufficient Collateral</h3><p className="text-sm text-gray-600">While SBA loans are flexible, larger loans typically require collateral.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section id="comparison" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">SBA Loans vs Conventional Business Loans</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead><tr className="bg-blue-50"><th className="border px-4 py-3 text-left">Factor</th><th className="border px-4 py-3 text-left">SBA Loans</th><th className="border px-4 py-3 text-left">Conventional Loans</th></tr></thead>
                  <tbody>
                    <tr><td className="border px-4 py-3 font-semibold">Down Payment</td><td className="border px-4 py-3 text-green-600">10-15%</td><td className="border px-4 py-3">20-30%</td></tr>
                    <tr className="bg-gray-50"><td className="border px-4 py-3 font-semibold">Terms</td><td className="border px-4 py-3 text-green-600">7-25 years</td><td className="border px-4 py-3">3-10 years</td></tr>
                    <tr><td className="border px-4 py-3 font-semibold">Rates</td><td className="border px-4 py-3">Prime + 2.25-4.75%</td><td className="border px-4 py-3">Prime + 1-6%</td></tr>
                    <tr className="bg-gray-50"><td className="border px-4 py-3 font-semibold">Approval Time</td><td className="border px-4 py-3">30-90 days</td><td className="border px-4 py-3">14-30 days</td></tr>
                    <tr><td className="border px-4 py-3 font-semibold">Documentation</td><td className="border px-4 py-3">Extensive</td><td className="border px-4 py-3">Moderate</td></tr>
                  </tbody>
                </table>
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
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />How long does SBA loan approval take?</h3><p className="text-gray-700 mt-2 ml-7">Typically 30-90 days for standard 7(a) loans. SBA Express can be approved in 36 hours.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />What credit score do I need?</h3><p className="text-gray-700 mt-2 ml-7">Most lenders require 650+ personal credit score. Higher scores improve approval odds and rates.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />Can startups get SBA loans?</h3><p className="text-gray-700 mt-2 ml-7">Yes, though approval is harder without business history. Microloans are often better for startups.</p></CardContent></Card>
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
                <Link href="/blog/sba-7a-loans-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>SBA 7(a) Loans Deep Dive</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/sba-microloans-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>SBA Microloans Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/sbir-sttr-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>SBIR/STTR R&amp;D Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/small-business-grants-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Small Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-green-700 to-blue-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Ready to Apply for SBA Funding?</h2>
              <p className="text-xl text-green-100 mb-8">Our experts help businesses navigate SBA loan applications, improving approval rates and securing better terms.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                <Link href="/contact?service=sba-loan-help">Get Expert SBA Loan Help</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
