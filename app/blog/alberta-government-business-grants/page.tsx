import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Zap, TrendingUp, BarChart3, MapPin } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { GrantSuccessTable } from "@/components/blog/GrantSuccessTable"
import { ExpertTipBox } from "@/components/blog/ExpertTipBox"

export const metadata: Metadata = {
  title: "Alberta Government Business Grants 2026 | Provincial Energy & Innovation Funding Guide",
  description: "Detailed guide to Alberta's $15M+ business grants. Access Alberta Innovates, ERA emissions funding, and diversification programs. Strategies for Calgary & Edmonton startups.",
  keywords: "Alberta business grants, Alberta Innovates, ERA funding, Calgary startup grants, Edmonton business funding, Alberta diversification program",
  openGraph: {
    title: "Alberta Business Grants 2026 | Insider Funding Guide",
    description: "Expert analysis of Alberta's provincial funding landscape. How to secure Alberta Innovates and ERA grants.",
    url: "https://www.fsidigital.ca/blog/alberta-government-business-grants",
    images: ["/og-image.png"],
  },
}

export default function AlbertaGovernmentBusinessGrantsBlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Unique Hero Section - Breaking the 'Mad Lib' Template */}
        <section className="relative overflow-hidden bg-slate-900 text-white py-20">
          <div className="absolute inset-0 bg-[url('/images/alberta-pattern.svg')] opacity-10"></div>
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <Badge className="mb-6 bg-blue-500/20 text-blue-200 border-blue-400/30 hover:bg-blue-500/30">
                <MapPin className="w-3 h-3 mr-1" /> Alberta Provincial Funding
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                Funding the Future of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Alberta Business
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
                Alberta isn't just oil and gas anymore. The province is aggressively funding <strong>tech diversification, agricultural innovation, and clean energy transition</strong>.
                Learn how to tap into the $2.8B provincial innovation ecosystem.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-none shadow-lg shadow-blue-900/20" asChild>
                  <Link href="#alberta-innovates">
                    Explore Alberta Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-slate-600 hover:bg-slate-800" asChild>
                  <Link href="/grant-finder">
                    Check Your Eligibility
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: Grant Success Metrics Table */}
        <section className="py-12 -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <GrantSuccessTable
              title="Alberta Funding Ecosystem Snapshot (2025-2026)"
              metrics={[
                {
                  label: "Max Grant Amount",
                  value: "$15M",
                  icon: <DollarSign className="w-6 h-6" />,
                  description: "Via Emissions Reduction Alberta (ERA)",
                  color: "text-green-600"
                },
                {
                  label: "Provincial Budget",
                  value: "$2.8B",
                  icon: <BarChart3 className="w-6 h-6" />,
                  description: "Total annual innovation investment",
                  color: "text-blue-600"
                },
                {
                  label: "Active Programs",
                  value: "45+",
                  icon: <FileText className="w-6 h-6" />,
                  description: "Across Innovates, ERA, & CARES",
                  color: "text-purple-600"
                },
                {
                  label: "Approval Time",
                  value: "8-12 Wks",
                  icon: <Clock className="w-6 h-6" />,
                  description: "Average processing for major streams",
                  color: "text-orange-600"
                }
              ]}
            />
          </div>
        </section>

        {/* Content Section with Interleaved Expert Insights */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">

                {/* Introduction - Authentic Voice */}
                <div className="prose prose-lg max-w-none text-slate-700">
                  <h2 className="text-3xl font-bold text-slate-900">Why Alberta is Different</h2>
                  <p>
                    Unlike Ontario or BC where funding is broadly distributed across many sectors, Alberta's funding landscape is <strong>laser-focused on specific outcomes</strong>:
                    reducing carbon emissions, digitizing traditional industries, and diversifying the economy away from reliance on raw crude export.
                  </p>
                  <p>
                    If you are a startup in Calgary or Edmonton, you have a distinct advantage if you can position your business as a "diversification driver."
                    Even a standard software company can win major grants if its software helps the energy or agriculture sectors become more efficient.
                  </p>
                </div>

                {/* Alberta Innovates Deep Dive */}
                <div id="alberta-innovates" className="scroll-mt-24">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <Shield className="w-6 h-6 text-blue-600 mr-3" />
                    Alberta Innovates: The Crown Jewel
                  </h3>

                  <Card className="border-slate-200 shadow-sm mb-6">
                    <CardContent className="p-6">
                      <p className="mb-4 text-slate-700">
                        Alberta Innovates is the primary engine for provincial funding. It's not just one grant; it's a massive umbrella of programs.
                        The biggest mistake applicants make is applying to the wrong "stream" within the agency.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4 mt-6">
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                          <h4 className="font-bold text-slate-900 mb-2">The Voucher Program</h4>
                          <p className="text-sm text-slate-600 mb-2">Best for: Early-stage tech commercialization</p>
                          <span className="text-green-600 font-bold text-lg">Up to $100,000</span>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                          <h4 className="font-bold text-slate-900 mb-2">Digital Traction</h4>
                          <p className="text-sm text-slate-600 mb-2">Best for: SaaS companies scaling up</p>
                          <span className="text-green-600 font-bold text-lg">Up to $50,000</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <ExpertTipBox type="warning" title="Insider Tip: Validating Your Service Provider">
                    <p>
                      For the <strong>Alberta Innovates Voucher</strong> program, you can't just pay yourself or your co-founder.
                      The grant money <em>must</em> go to an eligible third-party service provider (like a dev shop or marketing agency).
                      Always get your service provider "pre-qualified" or ensure they have worked with AI grants before you apply.
                      If they aren't recognized, your application will stall.
                    </p>
                  </ExpertTipBox>
                </div>

                {/* ERA Section */}
                <div id="era" className="scroll-mt-24">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <Zap className="w-6 h-6 text-green-600 mr-3" />
                    Emissions Reduction Alberta (ERA)
                  </h3>
                  <p className="text-slate-700 mb-4">
                    If your business touches sustainability—even tangentially—ERA is where the "big money" lives.
                    These grants are project-based and often range into the millions.
                  </p>

                  <div className="bg-green-50/50 rounded-xl p-6 border border-green-100 mb-6">
                    <h4 className="font-bold text-green-900 mb-3">Is your business ERA-eligible?</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <span className="text-green-900">Does your tech reduce GHG emissions directly?</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <span className="text-green-900">Does it make an existing industrial process more efficient?</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <span className="text-green-900">Are you piloting a new clean technology in Alberta?</span>
                      </li>
                    </ul>
                  </div>

                  <ExpertTipBox type="success" title="Success Strategy: The 'GHG Quantification' Report">
                    <p>
                      ERA applications live and die by the math. You cannot just say "we are green."
                      You need a <strong>GHG Quantification Report</strong>—a calculation showing exactly how many tonnes of CO2e your project will offset.
                      We strongly recommend hiring a consultant specifically for this calculation before you even open the grant portal.
                    </p>
                  </ExpertTipBox>
                </div>

                {/* CARES & Regional Development */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <Building className="w-6 h-6 text-purple-600 mr-3" />
                    Regional & Rural Development (CARES)
                  </h3>
                  <p className="text-slate-700 mb-4">
                    The Community and Regional Economic Support (CARES) program is often overlooked by city-based businesses, but if you are operating out of
                    <strong>Red Deer, Lethbridge, or Grande Prairie</strong>, you have less competition here.
                  </p>
                </div>

              </div>

              {/* Sidebar - Sticky */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-4">Alberta Application Checklist</h4>
                    <ul className="space-y-4">
                      <li className="flex items-center text-sm text-slate-700">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3">1</div>
                        Incorporated in Alberta
                      </li>
                      <li className="flex items-center text-sm text-slate-700">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3">2</div>
                        2 Years Financial Statements
                      </li>
                      <li className="flex items-center text-sm text-slate-700">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3">3</div>
                        Valid T2 Corporate Returns
                      </li>
                      <li className="flex items-center text-sm text-slate-700">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3">4</div>
                        Project Quote from Vendor
                      </li>
                    </ul>
                    <Button className="w-full mt-6" asChild>
                      <Link href="/grant-finder">Verify Eligibility</Link>
                    </Button>
                  </div>

                  <div className="bg-blue-600 p-6 rounded-xl shadow-lg text-white">
                    <h4 className="font-bold text-lg mb-2">Need Alberta Strategy?</h4>
                    <p className="text-blue-100 text-sm mb-6">
                      Our team includes former Alberta Innovates advisors who know exactly what the review board looks for.
                    </p>
                    <Button variant="secondary" className="w-full text-blue-900 font-bold" asChild>
                      <Link href="/contact">Talk to an Expert</Link>
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
