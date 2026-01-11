import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Mountain, PieChart, TrendingUp, HelpCircle, Lightbulb, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { GrantSuccessTable } from "@/components/blog/GrantSuccessTable"
import { ExpertTipBox } from "@/components/blog/ExpertTipBox"

export const metadata: Metadata = {
  title: "British Columbia Government Business Grants 2026 | BC Funding Guide",
  description: "Complete guide to British Columbia's $1.8B funding ecosystem. Access Innovate BC, CleanBC, and PacifiCan grants for tech, clean energy, and export businesses.",
  keywords: "British Columbia business grants, BC provincial funding, Innovate BC grants, CleanBC funding, Creative BC support, PacifiCan regional funding, BC tech grants",
  openGraph: {
    title: "British Columbia Government Business Grants 2026 | BC Provincial Funding Guide",
    description: "Expert guide to BC's unique mix of Clean Tech, Innovation, and Creative Industry grants. Strategies for successful applications.",
    url: "https://www.fsidigital.ca/blog/british-columbia-government-business-grants",
    images: ["/og-image.png"],
  },
}

export default function BritishColumbiaGovernmentBusinessGrantsBlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏔️ Pacific Province Business Support
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                British Columbia Government Business Grants
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                BC is unique: it combines provincial funding from Innovate BC with federal "PacifiCan" dollars.
                Whether you are a Vancouver tech startup or a forestry company in Prince George, there is a specific stream for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?program=bc">
                    Find Your BC Program
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/government-grants">
                    Back to Government Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* BC Success Metrics */}
        <section className="py-12 -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <GrantSuccessTable
              title="BC Funding Ecosystem Snapshot"
              metrics={[
                {
                  label: "Max Tech Grant",
                  value: "$300,000",
                  icon: <DollarSign className="w-6 h-6" />,
                  description: "Via Ignite Program",
                  color: "text-blue-600"
                },
                {
                  label: "CleanBC Fund",
                  value: "$280M+",
                  icon: <Mountain className="w-6 h-6" />,
                  description: "For emission reduction",
                  color: "text-green-600"
                },
                {
                  label: "Tax Credits",
                  value: "30-50%",
                  icon: <PieChart className="w-6 h-6" />,
                  description: "For R&D and Media",
                  color: "text-purple-600"
                },
                {
                  label: "PacifiCan",
                  value: "$5M Cap",
                  icon: <Target className="w-6 h-6" />,
                  description: "Federal top-up for BC",
                  color: "text-teal-600"
                }
              ]}
              className="bg-white/95 backdrop-blur shadow-xl border-blue-100"
            />
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">

                {/* Intro */}
                <div className="prose prose-lg max-w-none text-slate-700">
                  <h2 className="text-3xl font-bold text-slate-900">The "Green & Tech" Focus</h2>
                  <p>
                    Unlike Alberta (Energy) or Ontario (Manufacturing), British Columbia's funding landscape is
                    dominated by two themes: <strong>Clean Technology</strong> and <strong>Digital Innovation</strong>.
                    If your business reduces greenhouse gases or exports software, you have a much stronger alignment
                    with provincial priorities compared to other sectors.
                  </p>
                </div>

                {/* Eligibility Quiz Section */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-8">
                  <div className="flex items-center mb-6">
                    <HelpCircle className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-slate-900">Which BC Agency is for You?</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                      <div className="flex items-center mb-2">
                        <Zap className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-bold text-slate-900">Innovate BC</span>
                      </div>
                      <p className="text-sm text-slate-600">For Tech Startups, R&D, and SaaS companies building IP.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-slate-200 hover:border-green-300 transition-colors">
                      <div className="flex items-center mb-2">
                        <Mountain className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-bold text-slate-900">CleanBC</span>
                      </div>
                      <p className="text-sm text-slate-600">For Industrial businesses reducing emissions or adopting electric fleets.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-slate-200 hover:border-purple-300 transition-colors">
                      <div className="flex items-center mb-2">
                        <Award className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="font-bold text-slate-900">Creative BC</span>
                      </div>
                      <p className="text-sm text-slate-600">For Film, Music, Books, and Interactive Media creators.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-slate-200 hover:border-teal-300 transition-colors">
                      <div className="flex items-center mb-2">
                        <Users className="w-5 h-5 text-teal-600 mr-2" />
                        <span className="font-bold text-slate-900">PacifiCan</span>
                      </div>
                      <p className="text-sm text-slate-600">For established businesses expanding operations or exports.</p>
                    </div>
                  </div>
                </div>

                <ExpertTipBox type="tip" title="BC Exclusive: The 'IP' Advantage">
                  <p>
                    British Columbia runs the unique "Intellectual Property (IP) Strategy."
                    If you apply for Innovate BC programs, showing that you own your IP (patents, trademarks) can be a
                    significant ranking factor. They want to fund companies that keep wealth in BC, not just those that import tech.
                  </p>
                </ExpertTipBox>

                {/* Major BC Provincial Programs */}
                <div className="space-y-8 mt-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Top 3 BC Grant Programs</h2>

                  {/* Innovate BC */}
                  <Card className="border-blue-200 bg-blue-50/10">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Shield className="w-6 h-6 text-blue-600 mr-3" />
                        <CardTitle className="text-blue-700">Innovate BC: Ignite & Hiring</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-gray-700">
                          The central hub for tech funding. Their "Ignite" program offers up to $300,000 for R&D projects giving you a massive runway.
                          Unlike loans, this is non-repayable, provided you can match a portion of the funds (often 1:3).
                        </p>
                        <div className="bg-white p-4 rounded-lg border border-blue-100">
                          <h5 className="font-bold text-blue-900 text-sm mb-2">Also: The Digital Skills Youth Internship</h5>
                          <p className="text-sm text-slate-600">
                            Need a developer? Innovate BC often covers up to 100% of a student's salary for 4 months.
                            This is the easiest "first grant" for many startups.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* CleanBC Programs */}
                  <Card className="border-green-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Mountain className="w-6 h-6 text-green-600 mr-3" />
                        <CardTitle className="text-green-700">CleanBC: The 'Go Electric' Rebates</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        If your business has vehicles (delivery vans, trucks), CleanBC is practically giving away money.
                        They offer substantial rebates for switching to EV fleets and installing chargers.
                      </p>
                      <ExpertTipBox type="success" title="Stacking Opportunity">
                        <p>
                          You can often stack CleanBC rebates with federal iZEV incentives.
                          This can reduce the cost of a commercial electric van by up to $15,000+ combined.
                        </p>
                      </ExpertTipBox>
                    </CardContent>
                  </Card>

                  {/* PacifiCan */}
                  <Card className="border-teal-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Target className="w-6 h-6 text-teal-600 mr-3" />
                        <CardTitle className="text-teal-700">PacifiCan: The Scale-Up Engine</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        Formerly part of Western Economic Diversification, PacifiCan is now BC-specific.
                        Their "Business Scale-Up and Productivity" (BSP) stream offers <strong>interest-free loans</strong> up to $5M.
                        Yes, it's a loan, but 0% interest with no payments for the first year is incredible leverage.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
                    <h4 className="font-bold text-blue-900 mb-4">Regional BC Focus</h4>
                    <div className="space-y-4">
                      <p className="text-sm text-blue-800 mb-2">Extra points if you are in:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-blue-500" /> The Kootenays</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-blue-500" /> Northern BC</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-blue-500" /> Vancouver Island (North)</li>
                      </ul>
                      <div className="mt-2 text-xs text-slate-500">
                        Metro Vancouver applicants face higher competition.
                      </div>
                    </div>
                  </div>

                  <div className="bg-teal-600 p-6 rounded-xl shadow-lg text-white">
                    <h4 className="font-bold text-lg mb-2">BC Grant Strategy</h4>
                    <p className="text-teal-100 text-sm mb-6">
                      Need to choose between Innovate BC vs PacifiCan? We can help map your funding roadmap.
                    </p>
                    <Button variant="secondary" className="w-full text-teal-900 font-bold" asChild>
                      <Link href="/contact">Get Expert Advice</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
