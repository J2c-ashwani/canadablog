import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Send, HelpCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SR&ED Tax Credits Canada 2026 | Scientific Research & Experimental Development Guide - 65% Refundable",
  description: "Complete guide to SR&ED tax credits in Canada. Enhanced 2026 rates with 35% federal refundable + provincial credits up to 65% total. $4.5M expenditure limit.",
  keywords: "SR&ED tax credits Canada, scientific research experimental development, R&D tax credits 2026, 35% refundable tax credit, CCPC tax incentives",
  openGraph: {
    title: "SR&ED Tax Credits Canada 2026 | 65% Refundable R&D Tax Incentives Guide",
    description: "Complete guide to Canada's SR&ED program with enhanced 2026 rates. 35% federal + provincial credits up to 65% total on $4.5M expenditure limit.",
    url: "https://www.fsidigital.ca/blog/sred-scientific-research-experimental-development",
    images: ["/og-image.png"],
  },
}

export default function SREDTaxCreditsGuidePage() {
  const faqData = [
    {
      question: "What is the filing deadline for SR&ED?",
      answer: "For corporations, the deadline is 18 months after your tax year-end. If you miss this date, you lose the credits for that year forever. There are no extensions."
    },
    {
      question: "Can I claim founder salaries?",
      answer: "Yes, but only if you are paid T4 income. You cannot claim SR&ED on dividends. If you pay yourself $100k in dividends, your SR&ED eligible salary is $0. This is a common mistake."
    },
    {
      question: "What happens if I get audited (Review)?",
      answer: "The CRA selects claims for review randomly or based on risk. They will send a technical reviewer to interview your team. You must show 'contemporaneous documentation' (dated logs, git commits, emails) to prove the work happened."
    },
    {
      question: "Is the SR&ED refund taxable?",
      answer: "It's complicated. The federal ITC reduces your 'pool' of deductible expenses for the next year (so you have less to deduct). Provincial credits are often considered taxable income in the year received. Always check with a CPA."
    },
    {
      question: "Can I finance my SR&ED claim?",
      answer: "Yes. Many specialized lenders will lend you up to 75% of your accrued SR&ED refund before you even file. This is useful for cash flow while waiting for the CRA processing delay (60-180 days)."
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
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                💰 SR&ED Tax Credits 2026
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Scientific Research & Experimental Development (SR&ED) Tax Credits
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Canada's largest R&D tax incentive program providing up to 65% refundable tax credits for eligible research and experimental development activities. Enhanced 2026 rates with $4.5M expenditure limit and expanded eligibility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                  <Link href="#calculator">
                    Calculate Your SR&ED Credits
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/guides/sred-application-guide">
                    Get Free SR&ED Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced 2026 Changes Alert */}
        <section className="py-8 bg-blue-50 border-b-2 border-blue-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <TrendingUp className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-blue-800 mb-2">🚀 Enhanced SR&ED 2026 Changes (Effective December 16, 2024)</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                        <div>
                          <strong>Increased Expenditure Limit:</strong> $4.5M (from $3M) = Up to $1.575M refundable credits
                        </div>
                        <div>
                          <strong>Higher Capital Thresholds:</strong> Phase-out now $15M-$75M (from $10M-$50M)
                        </div>
                        <div>
                          <strong>Eligible Canadian Public Corps:</strong> Now qualify for 35% refundable rate
                        </div>
                        <div>
                          <strong>Capital Expenditures:</strong> SR&ED ITCs on equipment purchases restored
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SR&ED Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is the SR&ED Tax Incentive Program?</h2>
                <p className="text-lg text-gray-600">
                  The SR&ED program provides tax incentives to Canadian businesses that conduct research and development in Canada,
                  supporting innovation across all industries with up to 65% combined federal and provincial tax credits.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$6.5B</div>
                  <div className="text-gray-600">Annual Tax Credits Issued</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">35%</div>
                  <div className="text-gray-600">Enhanced Federal Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$4.5M</div>
                  <div className="text-gray-600">Enhanced Rate Limit (2026)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">65%</div>
                  <div className="text-gray-600">Maximum Combined Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tax Credit Rates & Eligibility */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What are the 2026 SR&ED Tax Credit Rates & Eligibility?</h2>

              <div className="space-y-8">
                {/* Canadian-Controlled Private Corporations */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Canadian-Controlled Private Corporations (CCPCs)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-green-800">Enhanced Rate (First $4.5M)</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                            <span className="font-semibold">Federal Rate:</span>
                            <span className="text-green-700 font-bold">35% Refundable</span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-700">
                            <div className="flex justify-between">
                              <span>Ontario (OITC):</span>
                              <span>+10% = 45% Total</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Quebec (CRIC):</span>
                              <span>+30% = 65% Total</span>
                            </div>
                            <div className="flex justify-between">
                              <span>British Columbia:</span>
                              <span>+10% = 45% Total</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Alberta (AIITC):</span>
                              <span>+10% = 45% Total</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-blue-800">Basic Rate (Over $4.5M)</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                            <span className="font-semibold">Federal Rate:</span>
                            <span className="text-blue-700 font-bold">15% (40% Refundable)</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Qualifying corporations can receive 40% refund on the 15% credit earned over the $4.5M limit.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h5 className="font-semibold mb-2">📋 CCPC Eligibility Requirements:</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li>• Canadian-resident corporation</li>
                            <li>• Private corporation (not public)</li>
                            <li>• Controlled by Canadian residents</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li>• Taxable capital under phase-out thresholds</li>
                            <li>• Qualifying income limits met</li>
                            <li>• Active business operations in Canada</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Eligible Canadian Public Corporations (NEW 2026) */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Eligible Canadian Public Corporations (ECPCs) - NEW 2026</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-purple-800">Enhanced Rate (First $4.5M)</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                            <span className="font-semibold">Federal Rate:</span>
                            <span className="text-purple-700 font-bold">35% Refundable</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Major enhancement for 2026 - public corporations now eligible for enhanced refundable rate (previously only CCPCs).</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Phase-out Rules</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Gross Revenue Phase-out:</strong> Enhanced rate reduced when average gross revenue over 3 years is between $15M-$75M</p>
                          <p><strong>Complete Phase-out:</strong> Enhanced rate eliminated at $75M average gross revenue</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                      <h5 className="font-semibold mb-2">📋 ECPC Eligibility Requirements (2026):</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li>• Canadian-resident public corporation</li>
                            <li>• All or substantially all shares owned by eligible entities</li>
                            <li>• Meets gross revenue thresholds</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li>• Active business operations throughout tax year</li>
                            <li>• Canadian operations and control</li>
                            <li>• Qualifying R&D expenditures in Canada</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Other Entities */}
                <Card className="border-gray-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-gray-600 mr-3" />
                      <CardTitle className="text-gray-700">Other Corporations, Individuals & Partnerships</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-bold mb-3">Other Corporations</h4>
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span>Federal Rate:</span>
                            <span className="font-semibold">15%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Refundability:</span>
                            <span className="text-red-600">Non-refundable</span>
                          </div>
                          <p className="text-gray-600">Credits reduce tax payable but no cash refund available.</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold mb-3">Individuals & Trusts</h4>
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span>Federal Rate:</span>
                            <span className="font-semibold">15%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Refundability:</span>
                            <span className="text-green-600">40%</span>
                          </div>
                          <p className="text-gray-600">40% of unused credits refundable after applying to tax payable.</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold mb-3">Partnerships</h4>
                        <div className="text-sm space-y-2">
                          <p>Partnerships cannot directly claim ITCs.</p>
                          <p className="text-gray-600">Credits calculated at partnership level and allocated to eligible partners based on their entity type.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Eligible Activities & Expenses */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Qualifies for SR&ED Tax Credits?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Eligible Activities */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Eligible SR&ED Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">✅ Experimental Development</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Systematic investigation to achieve technological advancement</li>
                          <li>• Creating new materials, products, devices, or processes</li>
                          <li>• Improving existing technology beyond current capabilities</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">✅ Applied Research</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Investigation to advance scientific knowledge with specific application</li>
                          <li>• Research directed toward practical problems</li>
                          <li>• Studies to understand phenomena for technological advancement</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">✅ Basic Research</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Investigation to advance scientific knowledge without specific application</li>
                          <li>• Original investigation to understand underlying phenomena</li>
                          <li>• Research contributing to general knowledge base</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">✅ Support Work</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Engineering, design, operations research</li>
                          <li>• Mathematical analysis, computer programming</li>
                          <li>• Data collection, testing, psychological research</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Eligible Expenses */}
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Eligible SR&ED Expenses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-2">💰 Current Expenditures</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Salaries & Wages:</strong> Employees directly engaged in SR&ED</li>
                          <li>• <strong>Materials:</strong> Consumed/transformed in SR&ED activities</li>
                          <li>• <strong>Third-Party Payments:</strong> 80% of arm's length contracts</li>
                          <li>• <strong>Overhead:</strong> Specified percentage of salaries (65% traditional, 55% proxy)</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-700 mb-2">🔧 Capital Expenditures (Restored 2026)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Equipment and machinery used primarily for SR&ED</li>
                          <li>• Property acquired on/after December 16, 2024</li>
                          <li>• 40% refundable rate for qualifying CCPCs</li>
                          <li>• Must be new to the taxpayer (not previously used)</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-purple-700 mb-2">🏢 Lease Expenses (Restored 2026)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Lease payments for SR&ED equipment</li>
                          <li>• First payable on/after December 16, 2024</li>
                          <li>• Equipment used primarily for SR&ED activities</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">❌ Non-Eligible Expenses</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• General business expenses</li>
                          <li>• Market research and sales promotion</li>
                          <li>• Quality control and routine testing</li>
                          <li>• Commercial production activities</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* SR&ED Calculator Section */}
        <section id="calculator" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Calculate Your SR&ED Tax Credits?</h2>
                <p className="text-lg text-gray-600">
                  Estimate your potential SR&ED tax credits based on 2026 enhanced rates and expenditure limits.
                </p>
              </div>

              <Card className="border-blue-200">
                <CardHeader>
                  <div className="flex items-center">
                    <Calculator className="w-6 h-6 text-blue-600 mr-3" />
                    <CardTitle className="text-blue-700">Quick SR&ED Credit Estimate</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Corporation Type</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                          <option>Canadian-Controlled Private Corporation (CCPC)</option>
                          <option>Eligible Canadian Public Corporation (ECPC)</option>
                          <option>Other Corporation</option>
                          <option>Individual/Trust</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Province</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                          <option>Ontario (+10% OITC)</option>
                          <option>Quebec (+30% CRIC)</option>
                          <option>British Columbia (+10%)</option>
                          <option>Alberta (+10% AIITC)</option>
                          <option>Other Province</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Annual SR&ED Expenditures</label>
                        <input
                          type="number"
                          placeholder="$500,000"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Taxable Capital (Previous Year)</label>
                        <input
                          type="number"
                          placeholder="$5,000,000"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-bold text-lg mb-4 text-green-800">Estimated Tax Credits</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Federal Credits (35%):</span>
                          <span className="font-bold text-green-700">$175,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Provincial Credits (10%):</span>
                          <span className="font-bold text-green-700">$50,000</span>
                        </div>
                        <div className="border-t border-green-200 pt-3">
                          <div className="flex justify-between items-center">
                            <span className="font-bold">Total Credits:</span>
                            <span className="font-bold text-green-800 text-xl">$225,000</span>
                          </div>
                        </div>
                        <div className="text-sm text-green-600">
                          Effective Rate: 45% of eligible expenditures
                        </div>
                      </div>

                      <Button className="w-full mt-6 bg-green-600 hover:bg-green-700" asChild>
                        <Link href="/contact?service=sred-assessment">
                          Get Professional SR&ED Assessment
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What is the SR&ED Application Process & Timeline?</h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Documentation",
                      description: "Maintain detailed R&D records throughout the year",
                      icon: <FileText className="w-6 h-6" />,
                      color: "blue"
                    },
                    {
                      step: "2",
                      title: "Preparation",
                      description: "Prepare technical and financial documentation",
                      icon: <Building className="w-6 h-6" />,
                      color: "green"
                    },
                    {
                      step: "3",
                      title: "Filing",
                      description: "Submit Form T661 with corporate tax return",
                      icon: <Send className="w-6 h-6" />,
                      color: "purple"
                    },
                    {
                      step: "4",
                      title: "Processing",
                      description: "CRA review and potential audit (60-180 days)",
                      icon: <Clock className="w-6 h-6" />,
                      color: "orange"
                    }
                  ].map((item, index) => {
                    const colors = {
                      blue: "bg-blue-500 text-white",
                      green: "bg-green-500 text-white",
                      purple: "bg-purple-500 text-white",
                      orange: "bg-orange-500 text-white"
                    }

                    return (
                      <Card key={index} className="text-center">
                        <CardHeader>
                          <div className={`w-12 h-12 rounded-full ${colors[item.color as keyof typeof colors]} flex items-center justify-center mx-auto mb-3`}>
                            {item.icon}
                          </div>
                          <CardTitle className="text-lg">Step {item.step}: {item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-bold text-yellow-800 mb-2">📅 Important SR&ED Deadlines & Timeline</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>Filing Deadline:</strong> 18 months after tax year-end</li>
                              <li>• <strong>Processing Time:</strong> 60 days (no review), 180 days (with review)</li>
                              <li>• <strong>Documentation:</strong> Maintain for 6 years</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>Carry Forward:</strong> Up to 20 years for unused credits</li>
                              <li>• <strong>Carry Back:</strong> Up to 3 years for current year credits</li>
                              <li>• <strong>Refund Timing:</strong> 120 days from acceptance</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes & Best Practices */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What are Key SR&ED Success Strategies?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Best Practices for SR&ED Success</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Systematic Documentation:</strong> Maintain detailed contemporaneous records of hypotheses, experiments, and results
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Technical Uncertainty Focus:</strong> Clearly identify technological challenges and advancement sought
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Systematic Investigation:</strong> Document methodical approach and systematic progression
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Professional Guidance:</strong> Work with qualified SR&ED consultants for complex claims
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">❌ Common SR&ED Mistakes to Avoid</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Poor Documentation:</strong> Inadequate records of R&D activities and technical challenges
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Routine Work Claims:</strong> Including quality control, maintenance, or standard engineering
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Ineligible Expenses:</strong> Including non-qualifying costs or incorrect expense allocation
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Late Filing:</strong> Missing the 18-month deadline or inadequate supporting documentation
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Provincial SR&ED Credits */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Which Provinces Offer SR&ED Tax Credits?</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    province: "Quebec",
                    credit: "30%",
                    program: "CRIC (Crédit d'impôt pour la recherche et développement)",
                    total: "65%",
                    color: "blue",
                    details: ["30% refundable on eligible expenses", "Highest provincial rate in Canada", "Can be combined with federal 35%"]
                  },
                  {
                    province: "Ontario",
                    credit: "10%",
                    program: "Ontario Innovation Tax Credit (OITC)",
                    total: "45%",
                    color: "red",
                    details: ["10% refundable credit", "Qualifying corporations only", "Combined with federal credits"]
                  },
                  {
                    province: "British Columbia",
                    credit: "10%",
                    program: "BC Scientific Research and Experimental Development Tax Credit",
                    total: "45%",
                    color: "green",
                    details: ["10% refundable credit", "Qualifying small business", "Enhanced for clean technology"]
                  },
                  {
                    province: "Alberta",
                    credit: "10%",
                    program: "Alberta Investor Tax Credit (AITC)",
                    total: "45%",
                    color: "orange",
                    details: ["10% refundable credit", "Focus on innovation", "Research and development eligible"]
                  },
                  {
                    province: "Saskatchewan",
                    credit: "10%",
                    program: "Saskatchewan R&D Tax Credit",
                    total: "45%",
                    color: "yellow",
                    details: ["10% non-refundable credit", "Small business focus", "Manufacturing and processing"]
                  },
                  {
                    province: "Atlantic Canada",
                    credit: "15%",
                    program: "Atlantic Investment Tax Credit",
                    total: "50%",
                    color: "teal",
                    details: ["15% regional credit", "Equipment and buildings", "Manufacturing and processing"]
                  }
                ].map((region, index) => {
                  const colorClasses = {
                    blue: "border-blue-200 bg-blue-50",
                    red: "border-red-200 bg-red-50",
                    green: "border-green-200 bg-green-50",
                    orange: "border-orange-200 bg-orange-50",
                    yellow: "border-yellow-200 bg-yellow-50",
                    teal: "border-teal-200 bg-teal-50"
                  }

                  return (
                    <Card key={index} className={colorClasses[region.color as keyof typeof colorClasses]}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{region.province}</CardTitle>
                          <Badge className={`bg-${region.color}-600 text-white`}>
                            {region.credit}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-gray-700">{region.program}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-gray-900 mb-2">
                          Up to {region.total} Total
                        </div>
                        <div className="space-y-1">
                          {region.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8 mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">SR&ED Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                  <HelpCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Questions About SR&ED Tax Credits</h2>
              <div className="space-y-4">
                <a href="#overview" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-green-700">What is SR&ED and how does it work?</span>
                </a>
                <a href="#eligibility" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-green-700">Who qualifies for SR&ED tax credits?</span>
                </a>
                <a href="#calculator" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-green-700">How much SR&ED funding can I receive?</span>
                </a>
                <a href="#eligible-activities" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-green-700">What activities qualify for SR&ED?</span>
                </a>
                <a href="#application" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-green-700">How do I apply for SR&ED tax credits?</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Government Funding Guides</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blog/irap-industrial-research-assistance-program" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all group">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-700 mb-2">IRAP Funding Guide</h3>
                  <p className="text-gray-600 text-sm">Up to $1M in non-repayable R&D grants from NRC-IRAP</p>
                </Link>
                <Link href="/blog/canada-innovation-research-development-grants-guide" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all group">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-700 mb-2">Canada R&D Grants Guide</h3>
                  <p className="text-gray-600 text-sm">Complete overview of Canadian innovation funding programs</p>
                </Link>
                <Link href="/blog/ideation-research-funding-canada" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all group">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-700 mb-2">Ideation & Research Funding</h3>
                  <p className="text-gray-600 text-sm">Early-stage research and ideation grants in Canada</p>
                </Link>
                <Link href="/blog/development-proof-concept-funding-canada" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all group">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-700 mb-2">Proof of Concept Funding</h3>
                  <p className="text-gray-600 text-sm">Development and prototype funding programs</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-green-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Maximize Your SR&ED Tax Credits?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Get our complete SR&ED application guide or work with our R&D tax specialists who have secured over $45M in SR&ED credits with 96% success rate.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Free SR&ED Guide</h4>
                  <p className="text-green-100 text-sm mb-4">
                    Get our comprehensive SR&ED application guide with eligibility checklist, documentation templates, and filing strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-green-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/sred-application-guide">
                      <Download className="w-4 h-4 mr-2" />
                      Get SR&ED Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert SR&ED Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with SR&ED specialists who have secured $45M+ with 96% success rate. Maximize your credits with professional guidance.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=sred-expert-help">
                      Get SR&ED Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-green-200 text-sm mt-6">
                96% success rate • Average credits secured: $285K • Expert CRA audit support
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
