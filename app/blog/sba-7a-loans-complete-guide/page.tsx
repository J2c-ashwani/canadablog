import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle, DollarSign, Target, AlertTriangle, Users, FileText,
  Clock, ChevronRight, ExternalLink, BookOpen, HelpCircle, Briefcase,
  TrendingUp, Building, CreditCard, Percent, Shield
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SBA 7(a) Loans Complete Guide 2026 | Up to $5M Small Business Financing",
  description: "Complete guide to SBA 7(a) loans. Learn eligibility requirements, application process, terms, and how to secure up to $5M in government-backed financing for your small business.",
  keywords: "SBA 7a loans, SBA loan application, small business loans, SBA 7a requirements, SBA funding guide, small business administration loans",
}

export default function SBA7aLoansGuidePage() {
  const faqData = [
    {
      question: "Is collateral required for SBA 7(a) loans?",
      answer: "For loans over $25,000, lenders must take available collateral (like equipment or real estate). For loans over $350,000, lenders must collateralize the loan to the maximum extent possible, which may include a lien on personal real estate if business assets are insufficient."
    },
    {
      question: "Can I use 7(a) funds to buy a business?",
      answer: "Yes, business acquisition is a common use. You typically need to provide 10% equity injection designated for the purchase, and the business must be evaluated by a qualified appraiser."
    },
    {
      question: "What is the Personal Guarantee requirement?",
      answer: "Any individual owning 20% or more of the business must provide an unlimited personal guarantee. This means you are personally liable for repayment if the business defaults."
    },
    {
      question: "How does the interest rate work?",
      answer: "SBA sets a maximum spread lenders can charge over the Base Rate (Wall Street Journal Prime or SBA Peg Rate). Most loans are variable rate, meaning your payment can change if the Prime rate changes."
    },
    {
      question: "Can I refinance existing debt?",
      answer: "Yes, but there are strict rules. The debt must be on unreasonable terms (e.g., high interest, short balloon payment) and the refinancing must provide a substantial benefit (at least 10% reduction in payments) to the business."
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
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-700 to-green-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                <Building className="w-3 h-3 mr-1" /> Most Popular SBA Loan Program
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                SBA 7(a) Loans Complete Guide 2026
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Access up to $5 million in flexible, government-backed financing with
                lower down payments and longer repayment terms than conventional loans.
                Complete guide to eligibility, application process, and approval strategies.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=sba-7a-loan-help">
                  Get Expert Help with SBA 7(a) Applications
                </Link>
              </Button>
              <p className="text-blue-200 text-sm mt-4">
                Free consultation • Pre-qualification assessment • Lender matching
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
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. SBA 7(a) Program Overview</a></li>
                  <li><a href="#eligibility" className="text-blue-700 hover:underline">2. Who is Eligible?</a></li>
                  <li><a href="#loan-amounts" className="text-blue-700 hover:underline">3. Loan Amounts &amp; Terms</a></li>
                  <li><a href="#eligible-uses" className="text-blue-700 hover:underline">4. Eligible Uses of Funds</a></li>
                  <li><a href="#loan-types" className="text-blue-700 hover:underline">5. Types of 7(a) Loans</a></li>
                  <li><a href="#how-to-apply" className="text-blue-700 hover:underline">6. How to Apply Step by Step</a></li>
                  <li><a href="#documents" className="text-blue-700 hover:underline">7. Required Documents</a></li>
                  <li><a href="#timeline" className="text-blue-700 hover:underline">8. Approval Timeline</a></li>
                  <li><a href="#mistakes" className="text-blue-700 hover:underline">9. Common Mistakes</a></li>
                  <li><a href="#sba-vs-conventional" className="text-blue-700 hover:underline">10. SBA vs Conventional Loans</a></li>
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
                  <div className="text-3xl font-bold text-blue-600 mb-2">$5M</div>
                  <div className="text-gray-600">Maximum Loan</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                  <div className="text-gray-600">SBA Guarantee</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">25 Years</div>
                  <div className="text-gray-600">Maximum Term</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">10-15%</div>
                  <div className="text-gray-600">Down Payment</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What is the SBA 7(a) Loan Program?</h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  The SBA 7(a) loan program is the Small Business Administration&apos;s
                  primary and most flexible loan program. It provides government-backed
                  financing to small businesses that might not qualify for conventional
                  loans, offering more favorable terms and lower barriers to entry.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  The &quot;7(a)&quot; refers to Section 7(a) of the Small Business Act,
                  which authorizes the SBA to guarantee loans made by participating
                  lenders. The SBA doesn&apos;t lend money directly—instead, it guarantees
                  75-85% of the loan, reducing risk for banks and enabling them to
                  offer better terms to borrowers.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                  <p className="text-gray-700">
                    <strong>Key Advantage:</strong> SBA 7(a) loans typically require only
                    10-15% down payment compared to 20-30% for conventional loans, and
                    offer repayment terms up to 25 years vs 5-10 years conventionally.
                    This dramatically improves cash flow for growing businesses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Who is Eligible for SBA 7(a) Loans?</h2>

              <p className="text-gray-700 mb-6">
                SBA 7(a) eligibility is based on business size, operational history,
                creditworthiness, and intended use of funds. Most for-profit small
                businesses operating in the United States qualify.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Basic Eligibility Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span><strong>For-profit business</strong> – operating legally in the US</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span><strong>Meets SBA size standards</strong> – industry-specific</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span><strong>Owner equity injected</strong> – personal investment</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span><strong>Exhausted other options</strong> – conventional credit unavailable</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span><strong>Good character</strong> – no defaulted government debt</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-700">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Ineligible Businesses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Gambling establishments and casinos</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Lending or investment businesses</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Real estate investment (passive)</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Non-profit organizations</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Businesses primarily engaged in speculation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-gray-700">
                  <strong>Credit Requirements:</strong> While there&apos;s no official
                  minimum credit score, most lenders prefer 680+ for 7(a) loans. Some
                  SBA Express lenders may work with scores as low as 620.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Loan Amounts Section */}
        <section id="loan-amounts" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">SBA 7(a) Loan Amounts &amp; Terms</h2>

              <p className="text-gray-700 mb-6">
                SBA 7(a) loans offer flexible terms based on the intended use of funds.
                The combination of high loan amounts, long terms, and competitive rates
                makes this one of the most attractive small business financing options.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Loan Use</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Maximum Term</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Interest Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Real Estate</td>
                      <td className="border border-gray-200 px-4 py-3">25 years</td>
                      <td className="border border-gray-200 px-4 py-3">Prime + 2.25-2.75%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Equipment</td>
                      <td className="border border-gray-200 px-4 py-3">10 years (or useful life)</td>
                      <td className="border border-gray-200 px-4 py-3">Prime + 2.25-2.75%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Working Capital</td>
                      <td className="border border-gray-200 px-4 py-3">10 years</td>
                      <td className="border border-gray-200 px-4 py-3">Prime + 2.25-4.75%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Business Acquisition</td>
                      <td className="border border-gray-200 px-4 py-3">10 years</td>
                      <td className="border border-gray-200 px-4 py-3">Prime + 2.25-2.75%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Maximum Amount</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600 font-bold" colSpan={2}>$5,000,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-bold mb-2 text-green-800">SBA Guarantee Rates</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Loans up to $150,000: 85% guarantee</li>
                    <li>• Loans over $150,000: 75% guarantee</li>
                    <li>• SBA Express: 50% guarantee</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-bold mb-2 text-blue-800">Down Payment</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Standard: 10-20%</li>
                    <li>• Business acquisition: 10-15%</li>
                    <li>• Start-ups: May require 20-30%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Eligible Uses Section */}
        <section id="eligible-uses" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Can SBA 7(a) Loans Be Used For?</h2>

              <p className="text-gray-700 mb-6">
                SBA 7(a) loans are highly flexible—most legitimate business purposes
                qualify. This versatility is one of the program&apos;s biggest advantages.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-bold text-lg mb-4 flex items-center text-green-800">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Eligible Uses
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Working capital and operational expenses</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Equipment purchases and leasehold improvements</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Real estate acquisition or construction</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Business expansion or new location</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Inventory and supplies</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Debt refinancing (some restrictions)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Business acquisition or partner buyout</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-bold text-lg mb-4 flex items-center text-red-800">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Ineligible Uses
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Repaying delinquent taxes</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Reimbursing owners for prior investments</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Speculative investments</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Political or lobbying activities</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Pyramid sales or multi-level marketing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loan Types Section */}
        <section id="loan-types" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Types of SBA 7(a) Loans</h2>

              <div className="space-y-6">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-700">
                      <CreditCard className="w-6 h-6 mr-2" />
                      Standard 7(a) Loan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="font-bold text-blue-700">Up to $5M</div>
                        <div className="text-xs text-gray-600">Maximum</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded">
                        <div className="font-bold text-green-700">75-85%</div>
                        <div className="text-xs text-gray-600">Guarantee</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <div className="font-bold text-purple-700">5-10 days</div>
                        <div className="text-xs text-gray-600">SBA Response</div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      The flagship 7(a) program for larger financing needs. Full SBA
                      review required, but most flexible terms available.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700">
                      <Percent className="w-6 h-6 mr-2" />
                      SBA Express
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="font-bold text-blue-700">Up to $500K</div>
                        <div className="text-xs text-gray-600">Maximum</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded">
                        <div className="font-bold text-green-700">50%</div>
                        <div className="text-xs text-gray-600">Guarantee</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <div className="font-bold text-purple-700">36 hours</div>
                        <div className="text-xs text-gray-600">SBA Response</div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Fastest SBA loan option. Lenders use their own credit analysis,
                      resulting in quicker decisions. Great for working capital needs.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-700">
                      <Shield className="w-6 h-6 mr-2" />
                      CAPLines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="font-bold text-blue-700">Up to $5M</div>
                        <div className="text-xs text-gray-600">Maximum</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded">
                        <div className="font-bold text-green-700">75-85%</div>
                        <div className="text-xs text-gray-600">Guarantee</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <div className="font-bold text-purple-700">Revolving</div>
                        <div className="text-xs text-gray-600">Structure</div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Revolving lines of credit for seasonal or cyclical working
                      capital needs. Draw and repay as needed within the credit limit.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section id="how-to-apply" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Apply for an SBA 7(a) Loan</h2>

              <div className="space-y-6">
                <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <div>
                    <h3 className="font-bold text-lg">Prepare Your Financials (2-4 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Gather personal and business financial statements, tax returns,
                      and create financial projections. Strong documentation is
                      essential for approval.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <div>
                    <h3 className="font-bold text-lg">Find an SBA Lender</h3>
                    <p className="text-gray-600 mt-1">
                      Look for SBA Preferred Lenders (PLP) in your area—they have
                      delegated authority to approve loans faster. Use the SBA Lender
                      Match tool to find options.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <div>
                    <h3 className="font-bold text-lg">Submit Application Package</h3>
                    <p className="text-gray-600 mt-1">
                      Complete SBA Form 1919 and lender-specific application. Include
                      business plan, purpose of loan, and detailed financial
                      documentation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                  <div>
                    <h3 className="font-bold text-lg">Lender Review &amp; SBA Approval (2-8 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      The lender evaluates your application first. If approved, they
                      submit to SBA for guarantee authorization (unless PLP lender,
                      who can approve themselves).
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">5</div>
                  <div>
                    <h3 className="font-bold text-lg">Closing &amp; Funding</h3>
                    <p className="text-gray-600 mt-1">
                      Sign loan documents, provide any required collateral, and receive
                      funds. The entire process typically takes 30-90 days from
                      application to funding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Required Documents Section */}
        <section id="documents" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Documents Are Required for SBA 7(a)?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-2" />
                    Financial Documents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Business tax returns (3 years)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Personal tax returns (3 years)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Year-to-date financial statements</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Personal financial statement (SBA Form 413)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Bank statements (3 months)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 text-green-600 mr-2" />
                    Business Documents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Business plan with projections</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Business licenses and permits</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Articles of incorporation/organization</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Lease agreements</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Accounts receivable/payable aging</span>
                    </li>
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
              <h2 className="text-3xl font-bold mb-6">How Long Does SBA 7(a) Approval Take?</h2>

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
                      <td className="border border-gray-200 px-4 py-3">Document Preparation</td>
                      <td className="border border-gray-200 px-4 py-3">2-4 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">Before application</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Lender Review</td>
                      <td className="border border-gray-200 px-4 py-3">2-4 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">Credit analysis</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">SBA Authorization</td>
                      <td className="border border-gray-200 px-4 py-3">5-10 business days</td>
                      <td className="border border-gray-200 px-4 py-3">For non-PLP lenders</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Closing</td>
                      <td className="border border-gray-200 px-4 py-3">1-2 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">Documentation</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-bold">Total Process</td>
                      <td className="border border-gray-200 px-4 py-3 font-bold">30-90 days</td>
                      <td className="border border-gray-200 px-4 py-3">Typical range</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-gray-700">
                  <strong>Pro Tip:</strong> SBA Express loans can close in as little as
                  2-3 weeks. If speed is critical, consider Express for amounts under
                  $500,000.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section id="mistakes" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes That Delay or Deny SBA Loans</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Incomplete Financial Documentation</h3>
                        <p className="text-gray-600 mt-1">
                          Missing tax returns, outdated financials, or inconsistencies
                          between documents are the #1 cause of delays. Prepare complete
                          packages before applying.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Weak Cash Flow Projections</h3>
                        <p className="text-gray-600 mt-1">
                          Lenders need to see that your business can service the debt.
                          Projections must be realistic, well-supported, and demonstrate
                          adequate cash flow coverage.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Personal Credit Issues</h3>
                        <p className="text-gray-600 mt-1">
                          Outstanding tax liens, recent bankruptcies, or undisclosed
                          credit problems sink applications. Address credit issues
                          before applying.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Insufficient Owner Equity</h3>
                        <p className="text-gray-600 mt-1">
                          SBA requires owners to have &quot;skin in the game.&quot; Inadequate
                          owner investment or asking for 100% financing is rejected.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* SBA vs Conventional Section */}
        <section id="sba-vs-conventional" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">SBA 7(a) vs Conventional Business Loans</h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Factor</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">SBA 7(a)</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Conventional</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Down Payment</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600">10-20%</td>
                      <td className="border border-gray-200 px-4 py-3">20-30%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Maximum Term</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600">10-25 years</td>
                      <td className="border border-gray-200 px-4 py-3">5-10 years</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Prepayment Penalty</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600">None (after 3 years)</td>
                      <td className="border border-gray-200 px-4 py-3">Often yes</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Collateral Required</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600">Flexible</td>
                      <td className="border border-gray-200 px-4 py-3">Typically 100%+</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Approval Speed</td>
                      <td className="border border-gray-200 px-4 py-3">30-90 days</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600">1-4 weeks</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-gray-700">
                  <strong>Bottom Line:</strong> SBA 7(a) loans are almost always
                  better if you qualify—lower down payment, longer terms, and more
                  flexibility. The tradeoff is a longer approval process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Alternatives Section */}
        <section id="alternatives" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Alternative SBA Loan Programs</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">SBA 504 Loans</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Fixed-rate financing for major fixed assets like real estate and
                    heavy equipment. Lower down payments (10%).
                  </p>
                  <Link href="/blog/sba-504-loans-guide" className="text-blue-700 hover:underline text-sm">
                    SBA 504 Guide →
                  </Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">SBA Microloans</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Small loans up to $50,000 for startups and small businesses.
                    Easier qualification than 7(a).
                  </p>
                  <Link href="/blog/sba-microloans-complete-guide" className="text-blue-700 hover:underline text-sm">
                    Microloan Guide →
                  </Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">SBA Disaster Loans</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Low-interest loans for businesses affected by declared disasters.
                    Direct SBA lending.
                  </p>
                  <Link href="/blog/sba-disaster-relief-loans-guide" className="text-blue-700 hover:underline text-sm">
                    Disaster Loans Guide →
                  </Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">SBIR/STTR Grants</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Non-repayable R&amp;D grants for tech companies. No repayment
                    required—true grant funding.
                  </p>
                  <Link href="/blog/sbir-sttr-complete-guide" className="text-blue-700 hover:underline text-sm">
                    SBIR/STTR Guide →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {/* FAQ Section */}
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
                <Link href="https://www.sba.gov/funding-programs/loans/7a" target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md transition-all">
                  <ExternalLink className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">SBA 7(a) Loans Official Page</h3>
                    <p className="text-blue-800 text-sm">Official details, terms, and application forms directly from the U.S. Small Business Administration.</p>
                  </div>
                </Link>
                <Link href="https://www.sba.gov/funding-programs/loans/lender-match" target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-green-50 rounded-lg border border-green-100 hover:shadow-md transition-all">
                  <ExternalLink className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-green-900 mb-2">SBA Lender Match</h3>
                    <p className="text-green-800 text-sm">Free online tool to connect with potential SBA lenders in your area.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Resources</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/sba-loans-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-blue-600">Complete SBA Loans &amp; Grants Guide</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/small-business-grants-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-blue-600">Small Business Grants Guide</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/federal-grants-women-minorities" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-blue-600">Federal Grants for Women &amp; Minorities</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/guides" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-blue-600">All Grant Application Guides</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Strong CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-700 to-green-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Secure SBA 7(a) Financing?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Our SBA loan specialists help you navigate the application process,
                match you with the right lenders, and prepare documentation that
                gets approved.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our SBA Loan Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Free pre-qualification assessment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Lender matching service</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Business plan development</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Document preparation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Application support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>92% approval rate</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=sba-7a-loan-help">
                  Get Expert Help with SBA 7(a) Loans
                </Link>
              </Button>
              <p className="text-blue-200 text-sm mt-4">
                Free consultation • No upfront fees • Average funding: $425K
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
