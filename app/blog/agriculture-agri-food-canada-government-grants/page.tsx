import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Leaf, PieChart, TrendingUp, HelpCircle, Sprout, Tractor } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { GrantSuccessTable } from "@/components/blog/GrantSuccessTable"
import { ExpertTipBox } from "@/components/blog/ExpertTipBox"

export const metadata: Metadata = {
  title: "Agriculture Canada Grants 2026 | Federal Funding Guide | AAFC",
  description: "Complete guide to the $3.5B Sustainable Canadian Agricultural Partnership. Access AgriInnovate, AgriScience, and AgriCompetitiveness funding.",
  keywords: "Agriculture Agri-Food Canada grants, AAFC federal funding, AgriInnovate applicant guide, Sustainable CAP funding, farm grants Canada",
  openGraph: {
    title: "Agriculture Canada Grants 2026 | Federal Funding Guide",
    description: "Expert guide to accessing federal millions for Agri-Food innovation. From Farm to Table, we cover the Sustainable CAP programs.",
    url: "https://www.fsidigital.ca/blog/agriculture-agri-food-canada-government-grants",
    images: ["/og-image.png"],
  },
}

export default function AgricultureAgriFoodGovernmentGrantsBlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌾 Federal Agri-Food Programs
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Agriculture & Agri-Food Canada (AAFC) Grants
              </h1>
              <p className="text-xl text-green-100 mb-8">
                The Sustainable Canadian Agricultural Partnership (Sustainable CAP) is a $3.5-billion, 5-year agreement.
                Whether you are a food processor or a tech company building ag-tech, this is your funding bedrock.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?program=agriculture">
                    Find Your AAFC Program
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

        {/* AAFC Metrics */}
        <section className="py-12 -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <GrantSuccessTable
              title="AAFC Funding Snapshot (2023-2028)"
              metrics={[
                {
                  label: "AgriInnovate",
                  value: "$5,000,000",
                  icon: <DollarSign className="w-6 h-6" />,
                  description: "Max grant per project",
                  color: "text-green-600"
                },
                {
                  label: "Total Pool",
                  value: "$3.5 Billion",
                  icon: <PieChart className="w-6 h-6" />,
                  description: "5-Year Sustainable CAP",
                  color: "text-blue-600"
                },
                {
                  label: "Funding %",
                  value: "50-75%",
                  icon: <Target className="w-6 h-6" />,
                  description: "Cost-sharing ratio",
                  color: "text-purple-600"
                },
                {
                  label: "AgriScience",
                  value: "$15M Cap",
                  icon: <TrendingUp className="w-6 h-6" />,
                  description: "For Research Clusters",
                  color: "text-orange-600"
                }
              ]}
              className="bg-white/95 backdrop-blur shadow-xl border-green-100"
            />
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">

                {/* Intro */}
                <div className="prose prose-lg max-w-none text-slate-700">
                  <h2 className="text-3xl font-bold text-slate-900">Beyond the Farm: Who AAFC Funds</h2>
                  <p>
                    A common misconception is that Agriculture Canada only funds farmers. In reality, AAFC is heavily focused on
                    <strong>Value-Added Processing</strong> and <strong>Ag-Tech Innovation</strong>. If you are developing a new
                    plant-based protein or an AI-driven irrigation system, you are actually a prime candidate for the
                    <em>AgriInnovate</em> program, often more so than traditional producers.
                  </p>
                </div>

                {/* Eligibility Quiz Section */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-8">
                  <div className="flex items-center mb-6">
                    <HelpCircle className="w-8 h-8 text-green-600 mr-3" />
                    <h3 className="text-2xl font-bold text-slate-900">Which AAFC Stream Fits You?</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-lg border border-slate-200 hover:border-green-300 transition-colors">
                      <div className="flex items-center mb-2">
                        <Sprout className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-bold text-slate-900">AgriInnovate</span>
                      </div>
                      <p className="text-sm text-slate-600">You have a proven technology and need capital to commercialize/scale it.</p>
                      <Badge variant="secondary" className="mt-2 text-xs">For Commercialization</Badge>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                      <div className="flex items-center mb-2">
                        <Users className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-bold text-slate-900">AgriScience</span>
                      </div>
                      <p className="text-sm text-slate-600">You are a university or industry group doing pre-commercial research.</p>
                      <Badge variant="secondary" className="mt-2 text-xs">For R&D</Badge>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-slate-200 hover:border-orange-300 transition-colors">
                      <div className="flex items-center mb-2">
                        <Tractor className="w-5 h-5 text-orange-600 mr-2" />
                        <span className="font-bold text-slate-900">AgriCompetitiveness</span>
                      </div>
                      <p className="text-sm text-slate-600">You are an association helping farmers share knowledge.</p>
                      <Badge variant="secondary" className="mt-2 text-xs">For Industry Groups</Badge>
                    </div>
                  </div>
                </div>

                <ExpertTipBox type="warning" title="Crucial Warning: 'Commercial Ready'">
                  <p>
                    <strong>AgriInnovate</strong> is NOT for R&D. They require you to be "commercial ready."
                    This means your technology works, and you have customers lined up. If you are still testing,
                    do not apply to AgriInnovate; apply to <strong>AgriScience</strong> or IRAP instead.
                    Applying to the wrong stream is the #1 reason for rejection.
                  </p>
                </ExpertTipBox>

                {/* Major AAFC Federal Programs */}
                <div className="space-y-8 mt-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Priority AAFC Programs</h2>

                  {/* AgriInnovate Program */}
                  <Card className="border-green-200 bg-green-50/10">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Leaf className="w-6 h-6 text-green-600 mr-3" />
                        <CardTitle className="text-green-700">AgriInnovate Program</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-gray-700">
                          The crown jewel for ag-tech companies. Offers repayable contributions up to $5M.
                          It functions like a 0% interest loan with a 10-year term.
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Automation & Robotics</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Energy Efficiency Upgrades</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Novel Food products</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Waste Reduction</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sustainable CAP Programs */}
                  <Card className="border-purple-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Award className="w-6 h-6 text-purple-600 mr-3" />
                        <CardTitle className="text-purple-700">Local Food Infrastructure Fund (LFIF)</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        Often overlooked, the LFIF provides grants ($25K - $500K) for projects that improve access to safe, healthy cultural food.
                        If you are a non-profit or Indigenous group building a community garden, greenhouse, or kitchen, this is your grant.
                      </p>
                      <ExpertTipBox type="success" title="Non-Repayable">
                        <p>Unlike AgriInnovate, LFIF funding is typically a <strong>non-repayable grant</strong>.</p>
                      </ExpertTipBox>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm">
                    <h4 className="font-bold text-green-900 mb-4">Key Federal Priorities</h4>
                    <div className="space-y-4">
                      <p className="text-sm text-green-800 mb-2">Your project MUST align with one of these:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Climate Change Mitigation</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Sector Resilience</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Market Development</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-600 p-6 rounded-lg shadow-lg text-white">
                    <h4 className="font-bold text-lg mb-2">Need AAFC Strategy?</h4>
                    <p className="text-blue-100 text-sm mb-6">
                      Applying for AgriInnovate requires a complex technical workplan. We can review your eligibility.
                    </p>
                    <Button variant="secondary" className="w-full text-blue-900 font-bold" asChild>
                      <Link href="/contact">Book AAFC Consult</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access AAFC Federal Agricultural Funding?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Get the complete AAFC federal application guide or work with our agricultural funding specialists.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                  <Link href="/guides/apply-agriculture-agri-food-canada">
                    <Download className="w-4 h-4 mr-2" />
                    Get AAFC Federal Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
