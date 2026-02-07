import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertTriangle, Download, Shield, HelpCircle, Phone } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IRAP Funding Guide 2025: Application, Eligibility & ITA Contact",
  description: "Complete guide to the Industrial Research Assistance Program (IRAP). How to get up to $500K in non-repayable R&D funding and connect with an ITA.",
  keywords: "IRAP grants, Industrial Research Assistance Program, NRC IRAP, R&D funding canada, technology grants, ITA contact",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/irap-innovation-application-guide",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is IRAP funding a loan or a grant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IRAP provides non-repayable financial contributions, which function like grants. You do not need to pay the money back if you adhere to the contribution agreement."
      }
    },
    {
      "@type": "Question",
      "name": "How do I apply for IRAP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There is no online application form. You must first contact the NRC to be assigned an Industrial Technology Advisor (ITA). The ITA will assess your business and, if eligible, invite you to submit a proposal."
      }
    },
    {
      "@type": "Question",
      "name": "What expenses does IRAP cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IRAP generally covers up to 80% of internal technical salaries and up to 50% of contractor costs directly related to the R&D project. It does not typically cover overhead or capital equipment."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the approval process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process can take anywhere from 1 to 4 months, depending on the complexity of the project and the availability of funds. Small projects often have a faster approval timeline."
      }
    }
  ]
}

export default function IRAPInnovationApplicationGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/10 text-blue-100 border-blue-200/20 backdrop-blur-sm px-4 py-1.5 text-sm">
                🔬 Top R&D Funding Program
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                How to Apply for <br className="hidden md:block" />IRAP Innovation Funding
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Secure up to <strong>$500,000 in non-repayable R&D funding</strong>. Step-by-step guide to connecting with an ITA and getting approved.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-bold" asChild>
                  <Link href="#process">See Process</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                  <Link href="#official-resources">Find Your ITA</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 1. QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm/50">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
              <span className="font-semibold text-gray-900 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
                Common Questions:
              </span>
              <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link href="#repayable" className="hover:text-blue-600 transition-colors">Is it a grant?</Link>
                <Link href="#process" className="hover:text-blue-600 transition-colors">How to apply?</Link>
                <Link href="#coverage" className="hover:text-blue-600 transition-colors">What is covered?</Link>
                <Link href="#ita" className="hover:text-blue-600 transition-colors">What is an ITA?</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Overview */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">80%</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Salary Coverage</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">Non-Repayable</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Funding Type</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-1">ITA</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Expert Advisor</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-1">$50k - $500k</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Typical Range</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

              {/* 2. STRUCTURE SCAN: Question-based Headings */}
              <div id="process" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How does the IRAP Application Process work?</h2>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
                  <div className="flex items-start">
                    <Lightbulb className="w-8 h-8 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">It Starts with a Call</h4>
                      <p className="text-blue-800 leading-relaxed">
                        Unlike other grants, you cannot just fill out a form online. IRAP is a relationship-based program.
                        <strong> You must call 1-877-994-4727</strong> to register and get assigned an Industrial Technology Advisor (ITA).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative border-l-2 border-blue-100 pl-8 ml-4 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-sm"></div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">1. The "Gatekeeper" Call</h4>
                    <p className="text-gray-600">Call the toll-free number. They will ask basic questions about your business (revenue, employees, technology) to see if you qualify for an ITA.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-sm"></div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">2. ITA Meeting</h4>
                    <p className="text-gray-600">If registered, an ITA will visit you (or meet virtually). They are assessing your technology, your finances, and YOU. This is the pitch.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-sm"></div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">3. Invite to Apply</h4>
                    <p className="text-gray-600">If the ITA likes your project, they will "invite" you to submit a formal proposal. You will work with them to draft it.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-sm"></div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">4. Contribution Agreement</h4>
                    <p className="text-gray-600">Once approved, you sign a contract. You then submit monthly claims for reimbursement.</p>
                  </div>
                </div>
              </div>

              <div id="eligibility" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Who is eligible for IRAP Funding?</h2>

                <p className="text-gray-600 mb-6 text-lg">
                  IRAP supports small and medium-sized businesses (SMEs) in Canada that want to develop and commercialize technologies.
                </p>

                <Card className="border-green-200 bg-green-50/50 mb-8">
                  <CardHeader>
                    <CardTitle className="text-green-800 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Core Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center text-gray-800">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span><strong>Incorporated:</strong> Must be a for-profit corporation in Canada.</span>
                      </li>
                      <li className="flex items-center text-gray-800">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span><strong>Size:</strong> Less than 500 employees (usually 1-50 range).</span>
                      </li>
                      <li className="flex items-center text-gray-800">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span><strong>Innovation:</strong> You must be developing new technology, not just buying it.</span>
                      </li>
                      <li className="flex items-center text-gray-800">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span><strong>Financials:</strong> Must have revenue or funding to pay your 20% share.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div id="coverage" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What costs does IRAP cover?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-green-100 rounded-lg p-5 hover:border-green-300 transition-colors">
                    <div className="flex items-center mb-3 text-green-700">
                      <Users className="w-5 h-5 mr-2" />
                      <h3 className="font-bold">Project Salaries (80%)</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Covers 80% of wages for internal technical staff working on the project.</p>
                  </div>
                  <div className="border border-blue-100 rounded-lg p-5 hover:border-blue-300 transition-colors">
                    <div className="flex items-center mb-3 text-blue-700">
                      <FileText className="w-5 h-5 mr-2" />
                      <h3 className="font-bold">Contractor Fees (50%)</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Covers 50% of Canadian sub-contractors for specialized tasks.</p>
                  </div>
                </div>
                <div className="mt-6 bg-orange-50 p-4 rounded-lg border border-orange-100 text-orange-900 text-sm">
                  <strong>Note:</strong> IRAP rarely covers equipment, rent, marketing, or founder salaries (unless T4).
                </div>
              </div>

              <div id="ita" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">The Secret Weapon: Your ITA</h2>

                <p className="text-gray-600 mb-6">
                  Your Industrial Technology Advisor (ITA) is more than just a gatekeeper. They are your champion.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">They Coach You</h4>
                      <p className="text-sm text-gray-600">They help you write the proposal so it passes internal review.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">They Connect You</h4>
                      <p className="text-sm text-gray-600">They introduce you to potential partners, customers, and other funding sources.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. FAQ ANCHOR: Dedicated Block */}
              <div id="faq" className="bg-gray-50 rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">Is IRAP funding tax-free?</h3>
                    <p id="repayable" className="text-gray-600">No. IRAP contributions are considered taxable income or reduce your SR&ED expenditure pool. Consult your accountant.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">Can I stack IRAP with SR&ED?</h3>
                    <p className="text-gray-600">Yes! But you cannot "double dip." You must subtract the IRAP coverage from your SR&ED claim for those specific costs. Most companies use both.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">Do I have to pay it back?</h3>
                    <p className="text-gray-600">No. IRAP is a non-repayable contribution. It is not a loan.</p>
                  </div>
                </div>
              </div>

              {/* 4. NEURAL NETWORK: Related Guides */}
              <div className="border-t border-gray-200 pt-12 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Related Funding</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Link href="/guides/sred-application-guide" className="group block">
                    <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-purple-600 font-semibold mb-2">Tax Credits</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">SR&ED Guide</h4>
                      <p className="text-sm text-gray-500">The companion program to IRAP. Claim back ~35% of your costs.</p>
                    </div>
                  </Link>
                  <Link href="/blog/canada-startup-funding-grants-guide" className="group block">
                    <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-blue-600 font-semibold mb-2">Hub</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">Startup Grants Hub</h4>
                      <p className="text-sm text-gray-500">See all 50+ grants available in Canada.</p>
                    </div>
                  </Link>
                  <Link href="/usa/technology-startup-grants" className="group block">
                    <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-green-600 font-semibold mb-2">Industry</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-green-700 mb-2">Tech Startup Grants</h4>
                      <p className="text-sm text-gray-500">Other funding options for technology companies.</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Official Resources */}
              <div id="official-resources" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official IRAP Resources</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-blue-800 text-lg">Contact NRC IRAP</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">The official number to start your application.</p>

                      <div className="flex items-center justify-center p-3 bg-blue-50 text-blue-700 font-bold rounded">
                        <Phone className="w-4 h-4 mr-2" /> 1-877-994-4727
                      </div>

                      <Button size="sm" variant="outline" className="w-full justify-between" asChild>
                        <Link href="https://nrc.canada.ca/en/support-technology-innovation" target="_blank" rel="noopener noreferrer">
                          Visit NRC Website <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-green-800 text-lg">IRAP Assessment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">Get a professional review of your technology project eligibility.</p>
                      <Button size="sm" className="w-full justify-between bg-green-600 hover:bg-green-700 text-white" asChild>
                        <Link href="/contact?service=irap-innovation-assessment">
                          Get Free Assessment <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
