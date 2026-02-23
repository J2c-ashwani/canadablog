import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertTriangle, Download, Shield, Rocket, Zap, HelpCircle, ArrowRight, Heart } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Women Entrepreneurship Fund 2026 | $100K Business Grants",
  description: "Complete guide to the Women Entrepreneurship Fund (WEF). Learn how to secure $100K in non-repayable grant funding for your business expansion.",
  keywords: "Women Entrepreneurship Fund, WEF grant, women business grants canada, women entrepreneurship strategy, non-repayable funding",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/women-entrepreneurship-fund-guide",
  },
  openGraph: {
    title: "Women Entrepreneurship Fund 2026 | $100K Grants",
    description: "Step-by-step guide to securing $100k in non-repayable funding for women-owned businesses.",
    url: "https://www.fsidigital.ca/guides/women-entrepreneurship-fund-guide",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is the Women Entrepreneurship Fund really non-repayable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, but it is currently closed for new direct intake. However, the $100M WES Ecosystem Fund distributes non-repayable services and training through partner organizations."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to be 100% women-owned to apply?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, you do not need 100% ownership. To be eligible for WES initiatives, the business must be at least 51% women-owned, managed, and controlled."
      }
    },
    {
      "@type": "Question",
      "name": "What can WEF funding be used for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eligible costs typically include international marketing, supply chain integration, business advisory services, and technology upgrades. It generally does not cover operational costs like rent."
      }
    },
    {
      "@type": "Question",
      "name": "What is the deadline for the Women Entrepreneurship Fund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The direct $100k grant form ISED has periodic calls for proposals. Currently, you should apply for the Women Entrepreneurship Loan Fund (up to $50k) which is open year-round."
      }
    }
  ]
}

export default function WomenEntrepreneurshipFundApplicationGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-800 to-indigo-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-purple-500/20 text-purple-100 border-purple-400/30 backdrop-blur-sm">
                🚀 Priority Funding Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                Women Entrepreneurship <br className="hidden md:block" />Fund (WEF)
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-purple-100 leading-relaxed text-pretty">
                Secure up to <strong>$100,000 in funding</strong> to scale your business.
                A complete breakdown of the Ecosystem Fund and Loan Fund eligibility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white font-semibold shadow-lg shadow-purple-900/50" asChild>
                  <Link href="#eligibility">
                    Check Eligibility
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-purple-800/50 border-purple-400/30 text-purple-100 hover:bg-purple-800/80 backdrop-blur-sm" asChild>
                  <Link href="/guides/women-entrepreneurship-fund-guide">
                    Strategy Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-purple-100 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-purple-900 gap-4">
              <span className="font-semibold text-purple-900 flex items-center shrink-0">
                <Heart className="w-4 h-4 mr-2 text-purple-600" />
                Quick Links:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#eligibility" className="hover:text-purple-700 transition-colors flex items-center gap-1"><Target className="w-3 h-3" /> Eligibility</Link>
                <Link href="#funding" className="hover:text-purple-700 transition-colors flex items-center gap-1"><DollarSign className="w-3 h-3" /> Expenses</Link>
                <Link href="#process" className="hover:text-purple-700 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" /> Timeline</Link>
                <Link href="#repayable" className="hover:text-purple-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> Is it Repayable?</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b border-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-purple-50">
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">$100K</div>
                  <div className="text-purple-800 text-sm font-medium uppercase tracking-wide">Max Funding</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">Grant</div>
                  <div className="text-purple-800 text-sm font-medium uppercase tracking-wide">Funding Type</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">51%+</div>
                  <div className="text-purple-800 text-sm font-medium uppercase tracking-wide">Women Owned</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-orange-600 mb-2">Scale</div>
                  <div className="text-purple-800 text-sm font-medium uppercase tracking-wide">Stage Focus</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* Process Section */}
              <div id="process" className="bg-white rounded-xl shadow-sm border border-purple-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">How does the WEF Application Process work?</h2>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
                  <div className="flex items-start">
                    <Rocket className="w-8 h-8 text-purple-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-purple-900 mb-2">Growth & Scale Focus</h4>
                      <p className="text-purple-800 leading-relaxed">
                        The Woman Entrepreneurship Fund (WEF) is specifically designed to help women-owned businesses
                        <strong> scale up</strong> to international markets. It is not for starting a business, but for expanding an existing one.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="relative border-l-2 border-purple-200 pl-8 ml-4 space-y-8">
                    <div className="relative">
                      <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-purple-600 border-4 border-white shadow-sm font-bold text-xs text-center text-white flex items-center justify-center">1</div>
                      <h4 className="font-bold text-lg text-slate-900 mb-2">Assessment</h4>
                      <p className="text-slate-600">Determine if your growth project aligns with ISED priorities (innovation, export, job creation).</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-purple-600 border-4 border-white shadow-sm font-bold text-xs text-center text-white flex items-center justify-center">2</div>
                      <h4 className="font-bold text-lg text-slate-900 mb-2">Develop Proposal</h4>
                      <p className="text-slate-600">Prepare your business plan, financial statements (2 years), and growth projections.</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-purple-600 border-4 border-white shadow-sm font-bold text-xs text-center text-white flex items-center justify-center">3</div>
                      <h4 className="font-bold text-lg text-slate-900 mb-2">Submit & Review</h4>
                      <p className="text-slate-600">Applications are reviewed on a rolling basis or during specific intake windows. Processing takes 4-6 months.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eligibility Section */}
              <div id="eligibility" className="bg-white rounded-xl shadow-sm border border-purple-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Who is eligible for the Women Entrepreneurship Fund?</h2>

                <p className="text-slate-600 mb-6 text-lg">
                  Eligibility is strict. This fund is for established businesses with revenue.
                </p>

                <Card className="border-green-200 bg-green-50/50 mb-8">
                  <CardHeader>
                    <CardTitle className="text-green-800 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Core Eligibility Criteria
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center text-slate-800">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span><strong>51% Women Ownership:</strong> Must be women-owned AND women-led.</span>
                      </li>
                      <li className="flex items-center text-slate-800">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span><strong>For-Profit:</strong> Non-profits are generally not eligible for this specific stream.</span>
                      </li>
                      <li className="flex items-center text-slate-800">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span><strong>Incorporated:</strong> Must be a Canadian incorporated entity.</span>
                      </li>
                      <li className="flex items-center text-slate-800">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span><strong>Revenue Generating:</strong> Must show 2 years of financial history.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Funding Usage */}
              <div id="funding" className="bg-white rounded-xl shadow-sm border border-purple-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">What costs are covered by the grant?</h2>
                <p className="text-slate-600 mb-8">
                  The WEF covers costs directly related to the <strong>expansion project</strong>. It does not cover general operating expenses.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-green-100 rounded-lg p-5 hover:border-green-300 transition-colors">
                    <div className="flex items-center mb-3 text-green-700">
                      <Globe className="w-5 h-5 mr-2" />
                      <h3 className="font-bold">Market Access & Export</h3>
                    </div>
                    <p className="text-slate-600 text-sm">Trade show travel, international marketing, localization of products.</p>
                  </div>
                  <div className="border border-blue-100 rounded-lg p-5 hover:border-blue-300 transition-colors">
                    <div className="flex items-center mb-3 text-blue-700">
                      <Zap className="w-5 h-5 mr-2" />
                      <h3 className="font-bold">Technology Upgrades</h3>
                    </div>
                    <p className="text-slate-600 text-sm">Software implementation, automation equipment, digital transformation.</p>
                  </div>
                  <div className="border border-purple-100 rounded-lg p-5 hover:border-purple-300 transition-colors">
                    <div className="flex items-center mb-3 text-purple-700">
                      <Rocket className="w-5 h-5 mr-2" />
                      <h3 className="font-bold">Scale-Up Costs</h3>
                    </div>
                    <p className="text-slate-600 text-sm">Factory expansion, new production lines, facility improvements.</p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              {/* Common Questions Section */}
              <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About WEF</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">1. Is the grant taxable?</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Yes. In Canada, almost all government grants for business are considered taxable income. You must report it in the tax year you receive it. Plan ahead so you aren't surprised by the tax bill.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">2. Can I stack this with a BDC loan?</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Yes! Financing a project often involves a "Capital Stack": 20% your cash, 30% grant (WEF), and 50% loan (BDC). This is a very standard and effective way to fund large expansions.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">3. What if I get denied?</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Don't give up. Ask for a debrief. Often, applications are rejected because they didn't clearly align with the "Priority Areas" (like export or clean tech). You can fix this and re-apply or apply to a Regional Development Agency instead.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">4. Does it cover my own salary?</h3>
                    <p className="text-slate-600 leading-relaxed">
                      No. The <a href="https://ised-isde.canada.ca/site/women-entrepreneurship-strategy/en/women-entrepreneurship-fund" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Women Entrepreneurship Fund</a> is strictly for project costs (equipment, marketing, renovations). It is not for paying the founder's existing salary.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">5. Is there an age limit?</h3>
                    <p className="text-slate-600 leading-relaxed">
                      No. Whether you are 18 or 80, if you own and control the business, you are eligible. There are separate "Youth" programs for those under 29, but WEF is open to all ages.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">6. How helps me write the grant?</h3>
                    <p className="text-slate-600 leading-relaxed">
                      You can hire a grant writer, but many successful applicants write it themselves. The key is to be specific: "We will buy Machine X to increase production by 20%," rather than "We want to grow."
                    </p>
                  </div>
                </div>
              </div>

              <div id="faq" className="bg-gray-50 rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <HelpCircle className="w-6 h-6 text-purple-600 mr-2" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-2">Is the funding repayable?</h3>
                    <p id="repayable" className="text-slate-600">No. The Women Entrepreneurship Fund issues non-repayable contributions (grants). However, you must meet the performance objectives outlined in your contribution agreement.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-2">What if I am a sole proprietor?</h3>
                    <p className="text-slate-600">Typically, the WEF requires businesses to be incorporated given the scale of funding ($100k). Sole proprietors should look into the <Link href="/guides/women-entrepreneurship-loan-fund-guide" className="text-purple-600 font-medium hover:underline">Women Entrepreneurship Loan Fund</Link> instead.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-2">Can I use it for salary?</h3>
                    <p className="text-slate-600">Generally, no. It does not cover existing salaries. However, it may cover <em>incremental</em> labour costs directly tied to the new project (e.g., hiring a new export manager).</p>
                  </div>
                </div>
              </div>

              {/* Common Questions Section */}
              <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About WEF</h2>

                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">1. Is the grant taxable?</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Yes. In Canada, almost all government grants for business are considered taxable income. You must report it in the tax year you receive it. Plan ahead so you aren't surprised by the tax bill.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">2. Can I stack this with a BDC loan?</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Yes! Financing a project often involves a "Capital Stack": 20% your cash, 30% grant (WEF), and 50% loan (BDC). This is a very standard and effective way to fund large expansions.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">3. What if I get denied?</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Don't give up. Ask for a debrief. Often, applications are rejected because they didn't clearly align with the "Priority Areas" (like export or clean tech). You can fix this and re-apply or apply to a Regional Development Agency instead.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">4. Does it cover my own salary?</h3>
                        <p className="text-slate-600 leading-relaxed">
                          No. The <a href="https://ised-isde.canada.ca/site/women-entrepreneurship-strategy/en/women-entrepreneurship-fund" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Women Entrepreneurship Fund</a> is strictly for project costs (equipment, marketing, renovations). It is not for paying the founder's existing salary.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">5. Is there an age limit?</h3>
                        <p className="text-slate-600 leading-relaxed">
                          No. Whether you are 18 or 80, if you own and control the business, you are eligible. There are separate "Youth" programs for those under 29, but WEF is open to all ages.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">6. How helps me write the grant?</h3>
                        <p className="text-slate-600 leading-relaxed">
                          You can hire a grant writer, but many successful applicants write it themselves. The key is to be specific: "We will buy Machine X to increase production by 20%," rather than "We want to grow."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Neural Network: Related Guides */}
              <section className="py-16 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Explore Related Funding</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <Link href="/guides/apply-women-entrepreneurship-strategy" className="group block h-full">
                        <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                          <div className="text-sm text-purple-600 font-semibold mb-2">Strategy</div>
                          <h4 className="font-bold text-slate-900 group-hover:text-purple-700 mb-2">WES Strategy Guide</h4>
                          <p className="text-sm text-slate-500 flex-grow">Overview of the entire $6B strategy.</p>
                          <div className="mt-3 text-xs text-purple-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                        </div>
                      </Link>
                      <Link href="/guides/women-entrepreneurship-loan-fund-guide" className="group block h-full">
                        <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                          <div className="text-sm text-blue-600 font-semibold mb-2">Loans</div>
                          <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">Women Loan Fund</h4>
                          <p className="text-sm text-slate-500 flex-grow">Microloans up to $50k.</p>
                          <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                        </div>
                      </Link>
                      <Link href="/guides/apply-small-business-grants" className="group block h-full">
                        <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                          <div className="text-sm text-green-600 font-semibold mb-2">General</div>
                          <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">All Business Grants</h4>
                          <p className="text-sm text-slate-500 flex-grow">Broader funding opportunities.</p>
                          <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

              {/* Official Resources */}
              <div id="official-resources" className="bg-white rounded-xl shadow-sm border border-purple-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Official WEF Resources</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-purple-200 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-purple-800 text-lg">Government Portal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-slate-600">Direct link to Innovation, Science and Economic Development Canada (ISED).</p>
                      <Button size="sm" variant="outline" className="w-full justify-between" asChild>
                        <Link href="https://ised-isde.canada.ca/site/ised/en/programs-and-initiatives/women-entrepreneurship-strategy" target="_blank" rel="noopener noreferrer">
                          Visit ISED Website <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-green-800 text-lg">Grant Assessment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-slate-600">Get a professional review of your eligibility before applying.</p>
                      <Button size="sm" className="w-full justify-between bg-green-600 hover:bg-green-700 text-white" asChild>
                        <Link href="/contact?service=wef-assessment">
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

function Globe(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}
