import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, MapPin, PieChart, HelpCircle, TrendingUp, Lightbulb } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { GrantSuccessTable } from "@/components/blog/GrantSuccessTable"
import { ExpertTipBox } from "@/components/blog/ExpertTipBox"

export const metadata: Metadata = {
  title: "Ontario Government Business Grants 2026 | Provincial Funding Programs Guide | OCED Support",
  description: "Complete guide to Ontario government business grants and provincial funding programs. Access Ontario Creates, OCED programs, Starter Company Plus, and innovation funding for businesses in Ontario.",
  keywords: "Ontario government business grants, Ontario provincial funding, OCED grants, Starter Company Plus Ontario, Ontario Creates funding, Ontario business support programs 2026",
  openGraph: {
    title: "Ontario Government Business Grants 2026 | Provincial Funding Programs Guide",
    description: "Comprehensive guide to Ontario provincial business grants offering funding for startups, innovation, and business growth across all sectors.",
    url: "https://www.fsidigital.ca/blog/ontario-government-business-grants",
    images: ["/og-image.png"],
  },
}

export default function OntarioGovernmentBusinessGrantsBlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🍁 Provincial Business Support Programs
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Ontario Government Business Grants & Provincial Funding
              </h1>
              <p className="text-xl text-red-100 mb-8">
                Ontario's comprehensive provincial business support ecosystem offering grants, loans, and incentives
                from $5,000 to $10M+ through Ontario Creates, OCED programs, Starter Company Plus, and innovation
                initiatives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-red-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?program=ontario">
                    Find Your Ontario Program
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

        {/* Program Statistics - REPLACED with GrantSuccessTable */}
        <section className="py-12 -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <GrantSuccessTable
              title="Ontario Funding Landscape Snapshot"
              metrics={[
                {
                  label: "Max Funding",
                  value: "$5,000,000",
                  icon: <DollarSign className="w-6 h-6" />,
                  description: "Via Ontario Innovation Fund",
                  color: "text-red-600"
                },
                {
                  label: "Total Budget",
                  value: "$2.5B",
                  icon: <PieChart className="w-6 h-6" />,
                  description: "Annual provincial investment",
                  color: "text-blue-600"
                },
                {
                  label: "Programs",
                  value: "50+",
                  icon: <Target className="w-6 h-6" />,
                  description: "Active grant streams",
                  color: "text-green-600"
                },
                {
                  label: "Competition",
                  value: "Variable",
                  icon: <TrendingUp className="w-6 h-6" />,
                  description: "High for general grants",
                  color: "text-purple-600"
                }
              ]}
              className="bg-white/95 backdrop-blur shadow-xl border-red-100"
            />
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">

                {/* Intro */}
                <div className="prose prose-lg max-w-none text-slate-700">
                  <h2 className="text-3xl font-bold text-slate-900">Ontario's "Hidden" Funding Ecosystem</h2>
                  <p>
                    While most businesses know about federal grants, the Government of Ontario actually manages
                    Canada's most diverse portfolio of direct business funding. The key is understanding that
                    Ontario funding is tailored by <strong>Regional Development Agencies</strong>.
                    A manufacturer in Windsor has access to completely different pots of money than a tech startup in Waterloo.
                  </p>
                </div>

                {/* Eligibility Quiz Section */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-8">
                  <div className="flex items-center mb-6">
                    <HelpCircle className="w-8 h-8 text-red-600 mr-3" />
                    <h3 className="text-2xl font-bold text-slate-900">Which Ontario Stream Fits You?</h3>
                  </div>
                  <div className="grid gap-4">
                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                      <p className="font-bold text-slate-900">1. Starter Company Plus</p>
                      <p className="text-sm text-slate-600">Best for: New businesses (0-5 years) needing training + small grant ($5k).</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                      <p className="font-bold text-slate-900">2. Ontario Creates</p>
                      <p className="text-sm text-slate-600">Best for: Film, Music, Books, and Interactive Digital Media studios.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                      <p className="font-bold text-slate-900">3. SWODF / EODF (Regional Funds)</p>
                      <p className="text-sm text-slate-600">Best for: Manufacturers expanding in Southwest or Eastern Ontario (creating 10+ jobs).</p>
                    </div>
                  </div>
                </div>

                <ExpertTipBox type="warning" title="Crucial Warning: The 'Job Creation' Requirement">
                  <p>
                    Unlike federal grants which often focus on R&D, <strong>Ontario provincial grants are obsessed with job creation.</strong>
                    If you are applying to SWODF or EODF, you almost always need to commit to creating 5-10 new full-time permanent jobs.
                    Contractors do not count. If you don't plan to hire, stick to federal training grants.
                  </p>
                </ExpertTipBox>

                {/* Major Ontario Provincial Programs */}
                <div className="space-y-8 mt-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Major Ontario Grant Programs</h2>

                  {/* Starter Company Plus */}
                  <Card className="border-red-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Building className="w-6 h-6 text-red-600 mr-3" />
                        <CardTitle className="text-red-700">Starter Company Plus</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Up to $50K</strong></span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Mentorship</strong></span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>New Biz</strong></span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-5 h-5 text-orange-600 mr-2" />
                          <span><strong>Training</strong></span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Ontario's flagship entrepreneurship program. It's not just a check; it's a "mini-MBA" combined with funding.
                        You must complete a training program to unlock the grant.
                      </p>
                      <ExpertTipBox type="tip" title="Insider Tip: Use Your Local Small Business Centre">
                        <p>
                          Starter Company Plus is administered locally. Visit your local "Small Business Enterprise Centre" (SBEC).
                          The approval decisions are made by local committees, not a faceless bureaucrat in Toronto. Build a relationship with your local SBEC advisor first.
                        </p>
                      </ExpertTipBox>
                    </CardContent>
                  </Card>

                  {/* Ontario Creates */}
                  <Card className="border-blue-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Award className="w-6 h-6 text-blue-600 mr-3" />
                        <CardTitle className="text-blue-700">Ontario Creates (Digital & Creative)</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        If you are a YouTuber, Game Dev, or Publisher, this is your goldmine. Ontario Creates offers tax credits (up to 45%) and direct funding.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-2 text-blue-700">Tax Credits (The Big Value)</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• OIDMTC (Interactive Digital Media): 35-40% back on labour</li>
                            <li>• OPSTC (Production Services): 21.5% refundable</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2 text-green-700">Direct Funding</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• IDM Fund: Concept definition & Production</li>
                            <li>• Music Investment Fund: Marketing & Tour support</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  <div className="bg-red-50 p-6 rounded-xl border border-red-100 shadow-sm">
                    <h4 className="font-bold text-red-900 mb-4">Ontario Regional Funds</h4>
                    <div className="space-y-4">
                      <p className="text-sm text-red-800 mb-2">Select your region to find specific development funds:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-red-500" /> Northern Ontario (NOHFC)</li>
                        <li className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-red-500" /> Eastern Ontario (EODF)</li>
                        <li className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-red-500" /> Southwestern Ontario (SWODF)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-600 p-6 rounded-xl shadow-lg text-white">
                    <h4 className="font-bold text-lg mb-2">Ontario Application Help</h4>
                    <p className="text-blue-100 text-sm mb-6">
                      Navigating OIDMTC credits or SWODF job requirements can be complex.
                    </p>
                    <Button variant="secondary" className="w-full text-blue-900 font-bold" asChild>
                      <Link href="/contact">Book Consultant</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Continue with CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Ontario Provincial Business Funding?
              </h2>
              <p className="text-xl text-red-100 mb-8">
                Get the complete Ontario provincial application guide or work with our Ontario business funding specialists.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-red-700 hover:bg-gray-100" asChild>
                  <Link href="/guides/apply-ontario-business-grants">
                    <Download className="w-4 h-4 mr-2" />
                    Get Ontario Guide
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
