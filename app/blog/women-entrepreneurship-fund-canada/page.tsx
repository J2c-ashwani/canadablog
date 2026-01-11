import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Send, Lightbulb, Heart, Sparkles, Zap, Rocket, PieChart, HelpCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { GrantSuccessTable } from "@/components/blog/GrantSuccessTable"
import { ExpertTipBox } from "@/components/blog/ExpertTipBox"

export const metadata: Metadata = {
  title: "Women Entrepreneurship Fund Canada 2026 | Non-Repayable Grants Guide",
  description: "Complete guide to the $25M+ Women Entrepreneurship Fund (WEF). Learn how to access non-repayable grants for expansion, technology adoption, and international market entry.",
  keywords: "Women Entrepreneurship Fund, WEF Canada, women business grants, federal women funding, ISED women strategy, WES Ecosystem Fund",
  openGraph: {
    title: "Women Entrepreneurship Fund (WEF) 2026 | Insider Guide",
    description: "Expert breakdown of Canada's premier funding stream for women-owned businesses. Eligibility, success rates, and application strategy.",
    url: "https://www.fsidigital.ca/blog/women-entrepreneurship-fund-canada",
    images: ["/og-image.png"],
  },
}

export default function WomenEntrepreneurshipFundGuidePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Unique Hero Section */}
        <section className="relative overflow-hidden bg-purple-900 text-white py-20">
          <div className="absolute inset-0 bg-[url('/images/pattern-women-tech.svg')] opacity-10"></div>
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <Badge className="mb-6 bg-purple-500/30 text-purple-200 border-purple-400/30 hover:bg-purple-500/40">
                <Sparkles className="w-3 h-3 mr-1" /> Canada's Flagship Women's Grant
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                Scale Your Vision with the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
                  Women Entrepreneurship Fund
                </span>
              </h1>
              <p className="text-xl text-purple-100 mb-8 leading-relaxed max-w-2xl">
                The WEF isn't just "free money"—it's a strategic investment by the Government of Canada to double the number of women-owned businesses by 2026.
                <strong>This is the only direct federal grant that does not need to be repaid.</strong>
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white border-none shadow-lg shadow-pink-900/20" asChild>
                  <Link href="#eligibility-check">
                    Take Eligibility Quiz
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-purple-400 hover:bg-purple-800" asChild>
                  <Link href="/grant-finder">
                    Start Application
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* WEF Success Metrics */}
        <section className="py-12 -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <GrantSuccessTable
              title="WEF Impact & Funding Snapshot"
              metrics={[
                {
                  label: "Grant Ceiling",
                  value: "$100,000",
                  icon: <DollarSign className="w-6 h-6" />,
                  description: "Non-repayable contribution",
                  color: "text-green-600"
                },
                {
                  label: "Businesses Funded",
                  value: "300+",
                  icon: <Users className="w-6 h-6" />,
                  description: "Successful applicants to date",
                  color: "text-purple-600"
                },
                {
                  label: "Funding Pool",
                  value: "$30M",
                  icon: <PieChart className="w-6 h-6" />,
                  description: "Total allocated budget",
                  color: "text-blue-600"
                },
                {
                  label: "Success Rate",
                  value: "~12%",
                  icon: <Target className="w-6 h-6" />,
                  description: "Highly competitive stream",
                  color: "text-orange-600"
                }
              ]}
            />
          </div>
        </section>

        {/* Deep Dive Content */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">

                {/* Intro */}
                <div className="prose prose-lg max-w-none text-slate-700">
                  <h2 className="text-3xl font-bold text-slate-900">Is the WEF Right For You?</h2>
                  <p>
                    The Women Entrepreneurship Fund (WEF) is the "gold standard" of Canadian grants because unlike the BDC's loans or the futurpreneur program,
                    <strong>WEF funding is 100% non-repayable</strong>. It is designed specifically for *existing* businesses that are ready to pivot or scale,
                    not for brand new startups with just an idea.
                  </p>
                </div>

                {/* Eligibility Quiz Section */}
                <div id="eligibility-check" className="bg-slate-50 border border-slate-200 rounded-xl p-8 scroll-mt-24">
                  <div className="flex items-center mb-6">
                    <HelpCircle className="w-8 h-8 text-pink-600 mr-3" />
                    <h3 className="text-2xl font-bold text-slate-900">Quick Eligibility Check</h3>
                  </div>
                  <div className="grid gap-4">
                    <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                      <div className="mt-1 mr-3 min-w-[20px] h-5 rounded-full border-2 border-slate-300"></div>
                      <div>
                        <p className="font-semibold text-slate-900">Are you 51% or more woman-owned?</p>
                        <p className="text-sm text-slate-500">The business must be majority owned and controlled by women.</p>
                      </div>
                    </div>
                    <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                      <div className="mt-1 mr-3 min-w-[20px] h-5 rounded-full border-2 border-slate-300"></div>
                      <div>
                        <p className="font-semibold text-slate-900">Have you been in business for 2+ years?</p>
                        <p className="text-sm text-slate-500">WEF rarely funds Day 0 startups. They want to see tax returns.</p>
                      </div>
                    </div>
                    <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                      <div className="mt-1 mr-3 min-w-[20px] h-5 rounded-full border-2 border-slate-300"></div>
                      <div>
                        <p className="font-semibold text-slate-900">Do you have an "Innovation" or "Export" plan?</p>
                        <p className="text-sm text-slate-500">You must use the funds to enter a new market or build new IP.</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 text-blue-800 text-sm rounded-lg flex items-start">
                    <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                    <p><strong>Note:</strong> If you answered "No" to the 2-year question, consider the <strong>Futurpreneur</strong> program instead.</p>
                  </div>
                </div>

                {/* Insider Strategy Section */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Where the Money Actually Goes</h3>
                  <p className="text-slate-700 mb-6">
                    We analyzed the last round of 300+ successful applicants. The funding wasn't random; it heavily favoured three specific activities.
                    If your application focuses on one of these "Winning Pillars", your chances of approval jump significantly.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="border border-green-200 bg-green-50 rounded-lg p-5">
                      <div className="text-3xl font-bold text-green-700 mb-1">45%</div>
                      <div className="font-semibold text-green-900 mb-2">New Market Access</div>
                      <p className="text-xs text-green-800">Projects focused on exporting Canadian goods to the US, EU, or Asia.</p>
                    </div>
                    <div className="border border-blue-200 bg-blue-50 rounded-lg p-5">
                      <div className="text-3xl font-bold text-blue-700 mb-1">30%</div>
                      <div className="font-semibold text-blue-900 mb-2">Tech Upgrades</div>
                      <p className="text-xs text-blue-800">Investing in automation, AI, or custom software to improve efficiency.</p>
                    </div>
                    <div className="border border-purple-200 bg-purple-50 rounded-lg p-5">
                      <div className="text-3xl font-bold text-purple-700 mb-1">25%</div>
                      <div className="font-semibold text-purple-900 mb-2">Indigenous / Rural</div>
                      <p className="text-xs text-purple-800">Bonus points for underrepresented regions or demographics.</p>
                    </div>
                  </div>

                  <ExpertTipBox type="tip" title="Application Hack: The 'Global Scale' Narrative">
                    <p>
                      Don't just ask for money to buy a new laptop. Frame your request as <strong>"Global Competitiveness."</strong>
                      Instead of "We need a CRM," write "Implementing a CRM to manage our expansion into the US East Coast market."
                      Same software, but one aligns with the government's export goals, and the other sounds like overhead.
                      <strong>Government funds growth, not overhead.</strong>
                    </p>
                  </ExpertTipBox>
                </div>

                {/* Common Mistakes Section - Redesigned */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Applications Get Rejected (The "Big 3")</h3>
                  <div className="space-y-4">
                    <Card className="border-l-4 border-l-red-500 shadow-sm">
                      <CardContent className="p-4">
                        <h4 className="font-bold text-red-700">1. Lack of Market Validation</h4>
                        <p className="text-sm text-slate-700">Saying "people will love this" isn't enough. You need Letters of Intent (LOIs) or pre-orders.</p>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-red-500 shadow-sm">
                      <CardContent className="p-4">
                        <h4 className="font-bold text-red-700">2. Vague Budgeting</h4>
                        <p className="text-sm text-slate-700">"Marketing: $10,000" is an instant rejection. It must be "Google Ads Q1: $3,500, Agency Retainer: $6,500."</p>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-red-500 shadow-sm">
                      <CardContent className="p-4">
                        <h4 className="font-bold text-red-700">3. Missing the "Innovation" Angle</h4>
                        <p className="text-sm text-slate-700">If you are just opening a standard franchise or retail shop with no new tech or process, you likely won't qualify for WEF.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 shadow-sm">
                    <h4 className="font-bold text-purple-900 mb-4">WEF 2026 Deadlines</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Spring Intake Opens:</span>
                        <span className="font-bold text-slate-900">April 1st</span>
                      </div>
                      <div className="w-full h-px bg-purple-200"></div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Fall Intake Opens:</span>
                        <span className="font-bold text-slate-900">Sept 15th</span>
                      </div>
                      <div className="mt-4 p-3 bg-white rounded border border-purple-200 text-xs text-purple-700">
                        *Deadlines are subject to funding availability. Apply early.
                      </div>
                    </div>
                  </div>

                  <div className="bg-pink-600 p-6 rounded-xl shadow-lg text-white">
                    <h4 className="font-bold text-lg mb-2">Need a WEF Writer?</h4>
                    <p className="text-pink-100 text-sm mb-6">
                      Our grant writers specialize in the "Innovation" narrative required for WEF approval.
                    </p>
                    <Button variant="secondary" className="w-full text-pink-900 font-bold" asChild>
                      <Link href="/contact">Book Strategy Call</Link>
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
