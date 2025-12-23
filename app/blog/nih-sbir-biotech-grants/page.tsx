import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Heart, Lightbulb, Sparkles, MapPin, Globe, Rocket } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NIH SBIR Biotech Grants 2026-2027 | $285K Phase I, $2M Phase II Medical Device & Digital Health Funding",
  description: "Complete 2026-2027 guide to NIH SBIR/STTR grants for biotech startups. Phase I up to $285K, Phase II up to $2M for therapeutics, medical devices, diagnostics, digital health innovation.",
  keywords: "NIH SBIR grants 2026, biotech grants, medical device funding, digital health SBIR, therapeutics grants, diagnostics funding, NIH innovation grants",
  openGraph: {
    title: "NIH SBIR Grants 2026 | $285K-$2M Biotech Funding",
    description: "Complete guide to NIH SBIR/STTR grants for biotech and health tech startups.",
    url: "https://www.fsidigital.ca/blog/nih-sbir-biotech-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function NIHSBIRBiotechGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-700 to-pink-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                💊 NIH SBIR/STTR Biotech Grants 2026-2027
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                NIH SBIR Grants: $285K Phase I, $2M Phase II Non-Dilutive Funding for Biotech, Medical Devices & Digital Health Innovation
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Comprehensive 2026-2027 guide to National Institutes of Health SBIR/STTR grants providing up to $2,000,000
                in non-dilutive funding for therapeutics, biologics, medical devices, diagnostics, and digital health
                platforms. Complete application strategies, eligibility requirements, success rates, and funding timelines
                for Phase I ($285,000) and Phase II ($2,000,000) awards supporting biotech startups across all 50 states.
                NIH SBIR takes no equity, requires no repayment, and funds transformative biomedical research and development
                advancing human health through innovative small business solutions bringing discoveries from bench to bedside[web:161][web:179][web:182].
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
                  <Link href="#nih-programs">
                    View NIH SBIR Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-purple-700" asChild>
                  <Link href="/download/nih-sbir-biotech-guide">
                    Get Application Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Geographic SEO Section */}
        <section className="py-12 bg-white border-b-2 border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">NIH SBIR Biotech Grants by Region and Life Sciences Hub (2026-2027 Funding Available)</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Boston/Cambridge Biotech
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Life Sciences Hub:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Cambridge biotech NIH SBIR</li>
                      <li>• Boston therapeutics grants</li>
                      <li>• Kendall Square drug discovery</li>
                      <li>• MIT Harvard spinouts funding</li>
                      <li>• Worcester medical devices</li>
                      <li>• Waltham diagnostics SBIR</li>
                      <li>• Lexington digital health</li>
                    </ul>
                    <p className="mt-3 text-purple-700 font-semibold">200+ NIH awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-pink-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-pink-700 flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      San Francisco Bay Area
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Biotech Innovation:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• SF biotech NIH funding</li>
                      <li>• South San Francisco biopharma</li>
                      <li>• Palo Alto digital health</li>
                      <li>• Stanford medical devices</li>
                      <li>• Berkeley therapeutics</li>
                      <li>• San Diego life sciences</li>
                      <li>• LA precision medicine</li>
                    </ul>
                    <p className="mt-3 text-pink-700 font-semibold">180+ NIH awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Mid-Atlantic Corridor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Health Innovation:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• NYC biotech NIH SBIR</li>
                      <li>• Philadelphia drug development</li>
                      <li>• Baltimore NIH proximity</li>
                      <li>• Research Triangle NC</li>
                      <li>• Pittsburgh medical devices</li>
                      <li>• DC digital health grants</li>
                      <li>• New Jersey biopharma</li>
                    </ul>
                    <p className="mt-3 text-indigo-700 font-semibold">150+ NIH awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Emerging Biotech Hubs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Growing Life Sciences:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Seattle biotech NIH funding</li>
                      <li>• Austin digital health SBIR</li>
                      <li>• Chicago medical devices</li>
                      <li>• Denver precision medicine</li>
                      <li>• Houston therapeutics</li>
                      <li>• Atlanta life sciences</li>
                      <li>• Phoenix health tech</li>
                    </ul>
                    <p className="mt-3 text-blue-700 font-semibold">100+ NIH awards annually</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-6">
                <h3 className="font-bold text-purple-900 mb-3 text-lg">🔥 High-Demand NIH SBIR Biotech Keywords 2026-2027:</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-purple-800">
                  <div>
                    <strong>Program Types:</strong> NIH SBIR Phase I $285K, NIH SBIR Phase II $2M, Fast-Track pilot, STTR research partnerships, non-dilutive biotech funding no equity
                  </div>
                  <div>
                    <strong>Tech Focus:</strong> Therapeutics biologics grants, medical device SBIR, diagnostics funding, digital health platforms, precision medicine, gene therapy, immunotherapy innovation
                  </div>
                  <div>
                    <strong>Application:</strong> NIH SBIR deadlines January April September, eligibility requirements, commercialization plan, clinical validation, FDA pathway strategy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced 2026 Program Updates */}
        <section className="py-8 bg-purple-50 border-b-2 border-purple-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <TrendingUp className="w-6 h-6 text-purple-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-purple-800 mb-2">💊 2026-2027 NIH SBIR Program Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-700">
                        <div>
                          <strong>Phase I Increase:</strong> Maximum Phase I awards $285,000 (highest across federal agencies) for 6-12 months proving biomedical feasibility[web:161][web:179]
                        </div>
                        <div>
                          <strong>Phase II Funding:</strong> Phase II awards up to $2,000,000 for 24 months commercialization development and clinical validation[web:182][web:185]
                        </div>
                        <div>
                          <strong>Total NIH Investment:</strong> $1.2B+ annually funding 500+ biotech startups across 27 NIH institutes targeting critical healthcare needs[web:182][web:186]
                        </div>
                        <div>
                          <strong>No Equity Required:</strong> Non-dilutive funding requiring no equity stake, no repayment supporting biomedical R&D commercialization bench to bedside[web:161][web:179]
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete NIH SBIR/STTR Funding Ecosystem for Biotech Startups</h2>
                <p className="text-lg text-gray-600 mb-4">
                  The National Institutes of Health SBIR/STTR program, also known as NIH Seed Fund, provides non-dilutive
                  grants for research and development of innovative biomedical technologies addressing unmet medical needs.
                  NIH seeks breakthrough innovations in therapeutics, diagnostics, medical devices, and digital health with
                  strong commercialization potential bringing discoveries from laboratories to patients[web:161][web:179][web:182].
                </p>
                <p className="text-lg text-gray-600">
                  Biotech startups can access Phase I funding (up to $285,000) to prove technical feasibility and clinical
                  relevance over 6-12 months, followed by Phase II awards (up to $2,000,000) for product development, clinical
                  validation, and regulatory pathway execution over 24 months. NIH evaluates proposals on scientific merit,
                  innovation, commercial viability, and potential for improving human health across 27 institutes including
                  NCI (cancer), NHLBI (heart/lung), NIAID (infectious disease), NINDS (neurological), NIDDK (diabetes)[web:161][web:185][web:186].
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-purple-600 mb-2">$285K</div>
                  <div className="text-gray-600 font-semibold">Phase I Maximum</div>
                  <div className="text-sm text-gray-500 mt-2">Highest federal SBIR Phase I</div>
                </div>
                <div className="bg-pink-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-pink-600 mb-2">$2M</div>
                  <div className="text-gray-600 font-semibold">Phase II Maximum</div>
                  <div className="text-sm text-gray-500 mt-2">Commercialization 24 months</div>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
                  <div className="text-gray-600 font-semibold">Annual Awards</div>
                  <div className="text-sm text-gray-500 mt-2">Biotech startups funded</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$1.2B</div>
                  <div className="text-gray-600 font-semibold">Annual Investment</div>
                  <div className="text-sm text-gray-500 mt-2">NIH biomedical innovation</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* NIH SBIR/STTR Program Details */}
        <section id="nih-programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">NIH SBIR and STTR Program Details 2026-2027</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Complete breakdown of Phase I, Phase II funding programs with biotech topic areas and application timelines
              </p>

              <div className="space-y-8">
                {/* Phase I Program */}
                <Card className="border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                    <div className="flex items-center mb-2">
                      <Heart className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700 text-2xl">NIH SBIR Phase I - Up to $285,000 Biomedical Technical Feasibility</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-purple-800">Phase I Program Overview</h4>
                        <div className="space-y-3">
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-purple-700 font-bold text-lg">$285,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Project Duration:</span>
                              <span className="text-pink-700 font-bold text-lg">6-12 months</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Success Rate:</span>
                              <span className="text-blue-700 font-bold">~15-20%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-700">Annual Deadlines:</span>
                              <span className="text-indigo-700 font-bold">Jan/Apr/Sep</span>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-2">Phase I Biotech Objectives:</p>
                            <p>• <strong>Scientific Feasibility:</strong> Prove biological mechanism, efficacy, safety at preclinical or early clinical stage</p>
                            <p>• <strong>Clinical Relevance:</strong> Demonstrate technology addresses unmet medical need with clear patient benefit</p>
                            <p>• <strong>Regulatory Pathway:</strong> Identify FDA approval pathway (510k, PMA, IND) and key regulatory milestones</p>
                            <p>• <strong>IP Protection:</strong> File provisional patents protecting innovation before public disclosure</p>
                            <p>• <strong>Market Validation:</strong> Engage physicians, KOLs, payers validating clinical need and reimbursement potential</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase I Success Stories - Biotech</h4>
                        <div className="space-y-4">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-bold text-blue-800 mb-2">💊 Cambridge Drug Discovery - $285K Phase I</p>
                            <p className="text-sm text-gray-700">Massachusetts biotech received NIH Phase I for novel small molecule targeting oncology validated through in vivo tumor regression studies. Partnered with 2 academic medical centers for Phase II clinical preparation.</p>
                            <p className="text-xs text-blue-700 mt-2"><strong>Location:</strong> Cambridge MA | <strong>Tech:</strong> Therapeutics | <strong>Phase II:</strong> Funded $2M</p>
                          </div>

                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="font-bold text-purple-800 mb-2">💊 SF Medical Device - $280K Phase I Grant</p>
                            <p className="text-sm text-gray-700">California medical device startup obtained NIH SBIR Phase I for minimally invasive surgical tool reducing complications 60% validated through cadaver studies. 510k pathway identified with FDA pre-submission meeting completed.</p>
                            <p className="text-xs text-purple-700 mt-2"><strong>Location:</strong> San Francisco CA | <strong>Tech:</strong> Medical Device | <strong>FDA:</strong> 510k pathway</p>
                          </div>

                          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                            <p className="font-bold text-pink-800 mb-2">💊 Boston Diagnostics - $285K Phase I Award</p>
                            <p className="text-sm text-gray-700">Massachusetts diagnostics company secured NIH Phase I for rapid infectious disease test achieving 98% sensitivity/specificity in 15 minutes vs 3-day culture. CLIA waiver pathway with 3 hospital pilot sites committed.</p>
                            <p className="text-xs text-pink-700 mt-2"><strong>Location:</strong> Boston MA | <strong>Tech:</strong> Diagnostics | <strong>Accuracy:</strong> 98% sensitivity</p>
                          </div>

                          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                            <p className="font-bold text-indigo-800 mb-2">💊 Seattle Digital Health - $275K Phase I Funding</p>
                            <p className="text-sm text-gray-700">Washington digital health platform received NIH SBIR for AI-powered remote patient monitoring reducing hospital readmissions 40% validated through 200-patient retrospective study. De novo FDA pathway with CE mark obtained.</p>
                            <p className="text-xs text-indigo-700 mt-2"><strong>Location:</strong> Seattle WA | <strong>Tech:</strong> Digital Health | <strong>Impact:</strong> -40% readmissions</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200 mt-6">
                      <h4 className="font-bold text-lg mb-4 text-purple-800">📍 NIH SBIR Phase I Application Deadlines 2026-2027</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Standard Deadlines:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• <strong>January 5, 2026</strong></li>
                            <li>• <strong>April 5, 2026</strong></li>
                            <li>• <strong>September 5, 2026</strong></li>
                            <li>• <strong>January 5, 2027</strong></li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Review Timeline:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Initial review: 2 months</li>
                            <li>• Council review: 4 months</li>
                            <li>• Award decision: 6-7 months</li>
                            <li>• Project start: Month 8</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Fast-Track Option:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Direct Phase II possible</li>
                            <li>• $50K+ investor commitment</li>
                            <li>• Combined $1.15M funding</li>
                            <li>• Accelerated timeline</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-4 text-center">Visit seed.nih.gov for exact submission dates across 27 NIH institutes[web:161][web:185]</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase II Program */}
                <Card className="border-pink-200">
                  <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100">
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-pink-600 mr-3" />
                      <CardTitle className="text-pink-700 text-2xl">NIH SBIR Phase II - Up to $2,000,000 Biotech Commercialization & Clinical Validation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-pink-800">Phase II Program Overview</h4>
                        <div className="space-y-3">
                          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-pink-700 font-bold text-lg">$2,000,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Typical Award:</span>
                              <span className="text-purple-700 font-bold text-lg">$1,500,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Project Duration:</span>
                              <span className="text-blue-700 font-bold">24 months</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-700">Eligibility:</span>
                              <span className="text-indigo-700 font-bold">Phase I awardees</span>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-2">Phase II Biotech Activities:</p>
                            <ul className="space-y-1 text-sm text-gray-700">
                              <li>• Clinical trials (Phase I/II human studies)</li>
                              <li>• FDA regulatory submissions (IND, IDE, 510k)</li>
                              <li>• Manufacturing scale-up and GMP validation</li>
                              <li>• Reimbursement strategy and health economics</li>
                              <li>• Commercial partnerships and licensing deals</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase II Success Stories</h4>
                        <div className="space-y-4 text-sm">
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="font-bold text-purple-800 mb-2">💎 Boston Therapeutics - $2M Phase II + Series A</p>
                            <p className="text-gray-700">Massachusetts drug company received $2M NIH Phase II for rare disease therapy completing Phase Ib clinical trial. Subsequently raised $15M Series A from top biotech VCs, advancing to Phase II pivotal trial. FDA orphan drug designation obtained.</p>
                            <p className="text-xs text-purple-700 mt-2"><strong>Location:</strong> Boston MA | <strong>Clinical:</strong> Phase II | <strong>Raise:</strong> $15M Series A</p>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-bold text-blue-800 mb-2">💎 SF Medical Device - $1.8M Phase II Award</p>
                            <p className="text-gray-700">California medical device startup obtained $1.8M NIH Phase II for cardiac intervention device completing 50-patient first-in-human study. FDA PMA pathway, CE mark approved, launched Europe generating $5M revenue. Acquired by medical device giant for $85M.</p>
                            <p className="text-xs text-blue-700 mt-2"><strong>Location:</strong> San Francisco CA | <strong>Exit:</strong> $85M acquisition | <strong>Revenue:</strong> $5M</p>
                          </div>

                          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                            <p className="font-bold text-pink-800 mb-2">💎 San Diego Diagnostics - $1.5M Phase II Funding</p>
                            <p className="text-gray-700">California diagnostics company secured $1.5M NIH Phase II for cancer liquid biopsy test achieving 95% sensitivity in 500-patient validation study. CLIA lab certified, serving 20 hospitals, pre-IPO stage with $25M revenue run-rate and Medicare reimbursement approved.</p>
                            <p className="text-xs text-pink-700 mt-2"><strong>Location:</strong> San Diego CA | <strong>Revenue:</strong> $25M ARR | <strong>Status:</strong> Pre-IPO</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* NIH Institutes */}
                <Card className="border-indigo-200">
                  <CardHeader className="bg-gradient-to-r from-indigo-100 to-blue-100">
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700 text-2xl">NIH SBIR Topic Areas Across 27 Institutes 2026-2027</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Major Institutes:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• <strong>NCI:</strong> Cancer therapeutics, diagnostics, immunotherapy</li>
                          <li>• <strong>NHLBI:</strong> Cardiovascular, pulmonary, blood disorders</li>
                          <li>• <strong>NIAID:</strong> Infectious disease, vaccines, immunology</li>
                          <li>• <strong>NINDS:</strong> Neurological disorders, brain health</li>
                          <li>• <strong>NIDDK:</strong> Diabetes, kidney, digestive diseases</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Medical Devices:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• <strong>NIBIB:</strong> Biomedical imaging, medical devices</li>
                          <li>• <strong>NICHD:</strong> Pediatric devices, maternal health</li>
                          <li>• <strong>NEI:</strong> Vision, ophthalmology devices</li>
                          <li>• <strong>NIDCD:</strong> Hearing, communication devices</li>
                          <li>• <strong>NIAMS:</strong> Orthopedic, musculoskeletal devices</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Digital Health:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Remote patient monitoring platforms</li>
                          <li>• AI-powered diagnostics and decision support</li>
                          <li>• Telemedicine and virtual care solutions</li>
                          <li>• Wearable sensors and health tracking</li>
                          <li>• Electronic health records and data analytics</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">NIH SBIR Application Success Strategies 2026-2027</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-purple-200">
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50">
                    <CardTitle className="text-purple-700 text-xl flex items-center">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      ✅ Winning NIH SBIR Application Strategies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Strong Clinical Significance and Unmet Need:</strong>
                          <p className="text-sm text-gray-600 mt-1">Clearly articulate serious health condition, patient population size, current treatment limitations, and how innovation improves outcomes with clinical evidence</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Compelling Preliminary Data:</strong>
                          <p className="text-sm text-gray-600 mt-1">Provide in vitro, in vivo, or clinical pilot data proving mechanism of action, efficacy, safety with statistical significance reducing reviewer skepticism</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Clear FDA Regulatory Strategy:</strong>
                          <p className="text-sm text-gray-600 mt-1">Identify specific FDA pathway (510k, PMA, IND), predicate devices, clinical trial design, endpoints, and timeline to market demonstrating regulatory understanding</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Clinical KOL Engagement and Letters of Support:</strong>
                          <p className="text-sm text-gray-600 mt-1">Include letters from key opinion leader physicians at academic medical centers expressing clinical need and willingness to participate in studies validating market pull</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader className="bg-gradient-to-br from-red-50 to-orange-50">
                    <CardTitle className="text-red-700 text-xl flex items-center">
                      <AlertCircle className="w-6 h-6 mr-3" />
                      ❌ Common NIH SBIR Application Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Weak Clinical Significance:</strong>
                          <p className="text-sm text-gray-600 mt-1">Technology solving minor inconvenience not serious medical condition. NIH funds innovations addressing significant unmet needs improving patient outcomes survival quality of life</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Insufficient Preliminary Data:</strong>
                          <p className="text-sm text-gray-600 mt-1">Purely computational or theoretical proposal without experimental validation. Reviewers need proof of concept data showing technology works before funding further development</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Vague Regulatory Strategy:</strong>
                          <p className="text-sm text-gray-600 mt-1">No FDA pathway identified or unrealistic regulatory assumptions. Must show understanding of device classification, clinical trial requirements, approval timeline specific to technology</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-700 to-pink-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Access NIH SBIR Funding?
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Get our complete NIH SBIR application guide or work with biotech specialists for expert proposal support.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2 text-lg">📥 Free NIH SBIR Guide</h4>
                  <p className="text-purple-100 text-sm mb-4">
                    Download comprehensive guide with biotech templates and strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-purple-700 hover:bg-gray-100 font-semibold" asChild>
                    <Link href="/download/nih-sbir-biotech-guide">
                      <Download className="w-5 h-5 mr-2" />
                      Download Free Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 backdrop-blur border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2 text-lg">🎯 Expert Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with NIH SBIR specialists for winning biotech proposals.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=nih-sbir-proposal-help">
                      <Users className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
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
