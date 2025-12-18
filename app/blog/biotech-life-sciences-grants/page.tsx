import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Heart, Lightbulb, Sparkles, MapPin, Globe, Rocket, ArrowRight, Pill, Activity, Microscope, Dna, Stethoscope, Syringe } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Biotech & Life Sciences Grants 2026-2027 | $306K NIH SBIR, $2M Phase II, $1.2B Seed Fund, FDA Orphan Drug Grants Non-Dilutive",
  description: "Complete 2026-2027 guide to biotech and life sciences grants. NIH SBIR Phase I $306K, Phase II $2M, $1.2B Seed Fund, FDA Orphan Drug designation grants, state life sciences centers supporting therapeutics, medical devices, diagnostics, drug discovery with zero equity funding.",
  keywords: "biotech grants 2026, life sciences SBIR funding, NIH grants $306K, therapeutics development grants, medical device funding Phase II, diagnostics grants NIH, drug discovery SBIR $2M, FDA orphan drug grants, preclinical research funding, clinical trials grants, state life sciences centers",
  openGraph: {
    title: "Biotech & Life Sciences Grants 2026 | $306K NIH SBIR + $1.2B Seed Fund",
    description: "Complete guide to biotech and life sciences grants from NIH, FDA, and state programs.",
    url: "https://fsidigital.ca/blog/biotech-life-sciences-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function BiotechLifeSciencesGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Clean Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 text-white py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  🧬 Biotech & Life Sciences Grants 2026-2027
                </Badge>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center leading-tight">
                Get Up to $2M in<br />Biotech Research Funding
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-teal-100 mb-8 text-center max-w-3xl mx-auto font-light">
                NIH SBIR/STTR grants for biotech startups. $1.2B Seed Fund for therapeutics, medical devices, diagnostics, and drug discovery. Zero equity required.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-10">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">$1.2B</div>
                  <div className="text-sm md:text-base text-teal-200">NIH Seed Fund Total</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">$2M</div>
                  <div className="text-sm md:text-base text-teal-200">Phase II Maximum</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">80%</div>
                  <div className="text-sm md:text-base text-teal-200">Preclinical Funding</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50 font-semibold px-8 py-6 text-lg w-full sm:w-auto shadow-xl" asChild>
                  <Link href="#biotech-grants">
                    View Biotech Programs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white bg-transparent text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg w-full sm:w-auto" asChild>
                  <Link href="/download/biotech-grants-guide">
                    <Download className="mr-2 w-5 h-5" />
                    Free Biotech Guide
                  </Link>
                </Button>
              </div>

              {/* Trust Indicator */}
              <p className="text-center text-teal-200 mt-8 text-sm">
                ✓ 3 application deadlines yearly • ✓ Fast-Track available • ✓ Non-dilutive funding
              </p>
            </div>
          </div>
        </section>

        {/* Quick Overview - Main Programs */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Biotech & Life Sciences Grant Programs</h2>
              <p className="text-lg text-gray-600 text-center mb-10 max-w-3xl mx-auto">
                Federal and state funding for therapeutics, medical devices, diagnostics, drug discovery, and biomedical innovation.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {/* NIH SBIR/STTR */}
                <Card className="border-2 border-teal-200 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-br from-teal-50 to-cyan-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mr-3">
                        <Microscope className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-teal-700">$306,872</div>
                        <div className="text-sm text-gray-600">NIH SBIR Phase I</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">Biomedical Innovation</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Drug discovery & therapeutics development</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Medical devices & diagnostics platforms</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Preclinical research (80% of grants)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>3 deadlines: Jan 5, Apr 5, Sep 5</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#nih-sbir-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* NIH Phase II */}
                <Card className="border-2 border-cyan-200 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mr-3">
                        <Pill className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cyan-700">$2.04M</div>
                        <div className="text-sm text-gray-600">NIH SBIR Phase II</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">R&D Advancement</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>24 months development timeline</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Clinical trials & regulatory prep</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>IND/IDE filing support included</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Commercialization pathway focus</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#phase-2-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* FDA & State Programs */}
                <Card className="border-2 border-blue-200 hover:shadow-xl transition-all hover:-translate-y-1 relative">
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    ORPHAN DRUGS
                  </div>
                  <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-700">$400K+</div>
                        <div className="text-sm text-gray-600">FDA & State Programs</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">Additional Funding</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>FDA Orphan Drug grants available</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>State life sciences centers funding</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Rare disease research priority</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Tax credits & regulatory incentives</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#fda-state-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Biotech Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Biotech Technologies That Qualify</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                NIH SBIR/STTR and FDA grants support biomedical innovations across therapeutic areas.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-l-teal-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Pill className="w-8 h-8 text-teal-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Therapeutics</h3>
                    <p className="text-sm text-gray-600 mb-3">Small molecules, biologics, gene therapy, cell therapy, immunotherapy, antibodies</p>
                    <p className="text-xs text-teal-700 font-semibold">$295M infectious disease</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-cyan-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Activity className="w-8 h-8 text-cyan-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Medical Devices</h3>
                    <p className="text-sm text-gray-600 mb-3">Implantables, wearables, surgical tools, imaging systems, monitoring devices</p>
                    <p className="text-xs text-cyan-700 font-semibold">Class II/III priority</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Microscope className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Diagnostics</h3>
                    <p className="text-sm text-gray-600 mb-3">IVD, point-of-care, biomarkers, liquid biopsy, molecular diagnostics, companion diagnostics</p>
                    <p className="text-xs text-blue-700 font-semibold">Fast-Track eligible</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Dna className="w-8 h-8 text-indigo-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Drug Discovery</h3>
                    <p className="text-sm text-gray-600 mb-3">High-throughput screening, target discovery, lead optimization, ADME/Tox, formulation</p>
                    <p className="text-xs text-indigo-700 font-semibold">80% preclinical focus</p>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Categories Row */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Heart className="w-8 h-8 text-purple-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Rare Diseases</h3>
                    <p className="text-sm text-gray-600 mb-3">Orphan drugs, ultra-rare conditions, genetic disorders, FDA designation benefits</p>
                    <p className="text-xs text-purple-700 font-semibold">Tax credits available</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-pink-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Stethoscope className="w-8 h-8 text-pink-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Digital Health</h3>
                    <p className="text-sm text-gray-600 mb-3">Software as medical device, remote monitoring, digital therapeutics, clinical decision support</p>
                    <p className="text-xs text-pink-700 font-semibold">Growing NIH focus</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Syringe className="w-8 h-8 text-orange-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Vaccines & Biologics</h3>
                    <p className="text-sm text-gray-600 mb-3">mRNA platforms, viral vectors, adjuvants, immunization technologies, pandemic prep</p>
                    <p className="text-xs text-orange-700 font-semibold">NIH priority area</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Lightbulb className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Research Tools</h3>
                    <p className="text-sm text-gray-600 mb-3">Assay development, reagents, lab automation, CRISPR tools, sequencing technologies</p>
                    <p className="text-xs text-green-700 font-semibold">Enabling technologies</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 2026 Updates */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-2xl p-8">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-teal-900 mb-2">What's New in Biotech Funding 2026-2027</h3>
                    <p className="text-gray-700">Recent NIH investments and program updates for biotech entrepreneurs</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-5 border border-teal-100">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                      <h4 className="font-bold text-gray-900">$1.2B NIH Seed Fund Active</h4>
                    </div>
                    <p className="text-sm text-gray-700">NIH continues investing $1.2 billion annually through SBIR/STTR programs supporting early-stage biomedical R&D. Non-dilutive funding for small businesses nationwide.</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-teal-100">
                    <div className="flex items-center mb-2">
                      <Microscope className="w-5 h-5 text-teal-600 mr-2" />
                      <h4 className="font-bold text-gray-900">Preclinical Research Priority</h4>
                    </div>
                    <p className="text-sm text-gray-700">Over 80% of SBIR/STTR grants awarded for drugs at preclinical and discovery stages. $1.1B between 2020-2024 supporting early-stage biotech innovation.</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-teal-100">
                    <div className="flex items-center mb-2">
                      <Heart className="w-5 h-5 text-red-600 mr-2" />
                      <h4 className="font-bold text-gray-900">Infectious Disease Leadership</h4>
                    </div>
                    <p className="text-sm text-gray-700">Infectious disease remains top therapy area with $295M in preclinical/discovery grants (2020-2024). CNS follows with $241M. Strong therapeutic focus areas.</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-teal-100">
                    <div className="flex items-center mb-2">
                      <Rocket className="w-5 h-5 text-blue-600 mr-2" />
                      <h4 className="font-bold text-gray-900">Fast-Track Expedited Review</h4>
                    </div>
                    <p className="text-sm text-gray-700">NIH Fast-Track allows simultaneous Phase I and Phase II submission for scientifically meritorious projects with high commercialization potential. Faster funding decisions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Programs Section */}
        <section id="biotech-grants" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Complete Biotech Grant Program Details</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Everything you need to know about NIH SBIR/STTR, FDA Orphan Drug programs, and state life sciences funding.
              </p>

              <div className="space-y-8">
                {/* NIH SBIR Phase I */}
                <Card id="nih-sbir-details" className="border-2 border-teal-200">
                  <CardHeader className="bg-gradient-to-r from-teal-100 to-cyan-100">
                    <div className="flex items-center mb-2">
                      <Microscope className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700 text-2xl">NIH SBIR/STTR Phase I - $306,872 Feasibility Study</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-teal-800">Program Overview</h4>
                        <div className="bg-teal-50 p-4 rounded-lg border border-teal-200 mb-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-teal-700 font-bold text-xl">$306,872</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Duration:</span>
                              <span className="text-cyan-700 font-bold">6-12 months</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Equity Required:</span>
                              <span className="text-green-700 font-bold">0% Non-dilutive</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Deadlines:</span>
                              <span className="text-blue-700 font-bold">Jan 5, Apr 5, Sep 5</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-800 mb-3">Phase I Focus Areas:</h5>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                              <Pill className="w-4 h-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Drug Discovery:</strong> Target validation, lead optimization, preclinical studies</span>
                            </li>
                            <li className="flex items-start">
                              <Activity className="w-4 h-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Medical Devices:</strong> Proof-of-concept, prototype development, biocompatibility</span>
                            </li>
                            <li className="flex items-start">
                              <Microscope className="w-4 h-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Diagnostics:</strong> Assay development, clinical validation, sensitivity/specificity</span>
                            </li>
                            <li className="flex items-start">
                              <Dna className="w-4 h-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Biologics:</strong> Gene therapy vectors, cell therapy protocols, manufacturing</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Biotech Success Stories</h4>
                        <div className="space-y-4">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-2">
                                <Pill className="w-5 h-5 text-white" />
                              </div>
                              <p className="font-bold text-green-800">Gene Therapy Breakthrough</p>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              $306K Phase I → validated novel AAV vector for rare genetic disorder → demonstrated safety in animal models → $2M Phase II → advanced to Phase 1 clinical trial → partnered with major pharma for $50M upfront.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">$50M partnership</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Clinical trial</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Rare disease</span>
                            </div>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                                <Activity className="w-5 h-5 text-white" />
                              </div>
                              <p className="font-bold text-blue-800">Medical Device Innovation</p>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              $306K Phase I → developed implantable cardiac monitor → animal studies successful → $2M Phase II → completed pivotal trial → FDA 510(k) clearance → commercial launch → $100M+ annual revenue.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">FDA cleared</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">$100M revenue</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Commercial</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-teal-50 p-6 rounded-lg border-2 border-teal-200">
                      <h4 className="font-bold text-lg mb-4 text-teal-800">Application Strategy & Requirements</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Building className="w-4 h-4 mr-2 text-teal-600" />
                            Eligibility
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• US small business &lt;500 employees</li>
                            <li>• For-profit company (any structure)</li>
                            <li>• Principal Investigator commitment</li>
                            <li>• Biomedical R&D focus</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-teal-600" />
                            Application Process
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Review Program Descriptions</li>
                            <li>• Identify relevant NIH institute</li>
                            <li>• Contact Program Officer early</li>
                            <li>• Submit via grants.gov portal</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Target className="w-4 h-4 mr-2 text-teal-600" />
                            Success Factors
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Strong scientific rationale</li>
                            <li>• Preliminary data included</li>
                            <li>• Clear commercialization path</li>
                            <li>• Experienced team credentials</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* NIH SBIR Phase II */}
                <Card id="phase-2-details" className="border-2 border-cyan-200">
                  <CardHeader className="bg-gradient-to-r from-cyan-100 to-blue-100">
                    <div className="flex items-center mb-2">
                      <Pill className="w-6 h-6 text-cyan-600 mr-3" />
                      <CardTitle className="text-cyan-700 text-2xl">NIH SBIR/STTR Phase II - $2,045,816 R&D Continuation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-cyan-800">Program Details</h4>
                        <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200 mb-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-cyan-700 font-bold text-xl">$2,045,816</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Duration:</span>
                              <span className="text-blue-700 font-bold">24 months</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Requirement:</span>
                              <span className="text-indigo-700 font-bold">Successful Phase I</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Equity:</span>
                              <span className="text-green-700 font-bold">0% Non-dilutive</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
                          Phase II supports continued R&D for therapeutics, devices, and diagnostics moving toward clinical trials, regulatory submissions (IND/IDE), and commercialization. Combined Phase I + II provides ~$2.3M total non-dilutive funding.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase II Objectives</h4>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="font-semibold text-gray-800 mb-3">Development Milestones:</p>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                              <Rocket className="w-4 h-4 text-cyan-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Clinical Advancement:</strong> IND/IDE filing, Phase 1 trial initiation, safety data</span>
                            </li>
                            <li className="flex items-start">
                              <Shield className="w-4 h-4 text-cyan-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Regulatory Prep:</strong> FDA interactions, quality systems, manufacturing scale-up</span>
                            </li>
                            <li className="flex items-start">
                              <Users className="w-4 h-4 text-cyan-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Partnerships:</strong> Pharma collaborations, licensing deals, investor relations</span>
                            </li>
                            <li className="flex items-start">
                              <DollarSign className="w-4 h-4 text-cyan-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Commercialization:</strong> Business plan, reimbursement strategy, market access</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FDA & State Programs */}
                <Card id="fda-state-details" className="border-2 border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
                    <div className="flex items-center mb-2">
                      <Heart className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700 text-2xl">FDA Orphan Drug + State Life Sciences Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-blue-800">FDA Orphan Drug Program</h4>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                          <p className="font-semibold text-gray-800 mb-3">Orphan Drug Designation Benefits:</p>
                          <ul className="text-sm text-gray-700 space-y-2">
                            <li>• 7 years market exclusivity post-approval</li>
                            <li>• Tax credits for clinical trial costs (25%)</li>
                            <li>• Waived FDA user fees (~$3.2M savings)</li>
                            <li>• Regulatory assistance & protocol guidance</li>
                            <li>• Grant funding opportunities available</li>
                            <li>• Fast Track & priority review eligibility</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="font-semibold text-blue-800 mb-2">Eligibility:</p>
                          <p className="text-sm text-gray-700">Diseases affecting &lt;200,000 US patients or no reasonable expectation of cost recovery. Over 900 orphan drug approvals since 1983 program launch.</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">State Life Sciences Centers</h4>
                        <div className="space-y-3 text-sm">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <p className="font-semibold text-green-800 mb-2">Massachusetts Life Sciences Center</p>
                            <p className="text-gray-700">SBIR matching grants, capital equipment, internship programs, tax incentives. Over $1B invested in 600+ companies since 2008.</p>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="font-semibold text-purple-800 mb-2">California Life Sciences</p>
                            <p className="text-gray-700">CalSEED grants ($50K-$225K), CIRM stem cell funding, biotech incubators, UC partnership programs, R&D tax credits.</p>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <p className="font-semibold text-orange-800 mb-2">Pennsylvania & New York</p>
                            <p className="text-gray-700">Innovation grants, life sciences accelerators, hospital partnerships, commercialization support, early-stage capital access.</p>
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

        {/* Success Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Biotech Grant Application Success Strategies</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Proven tactics to increase your chances of winning NIH SBIR/STTR and FDA funding.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-green-200">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardTitle className="text-green-700 text-xl flex items-center">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      What Works for Biotech
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Microscope className="w-5 h-5 text-green-600 mr-2" />
                          Include Strong Preliminary Data
                        </h4>
                        <p className="text-sm text-gray-700">
                          Provide proof-of-concept data, in vitro results, animal studies, or clinical pilot data. NIH reviewers prioritize de-risked projects with demonstrated feasibility and clear path forward.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Users className="w-5 h-5 text-green-600 mr-2" />
                          Contact Program Officers Early
                        </h4>
                        <p className="text-sm text-gray-700">
                          Reach out to NIH institute Program Officers before submission. They provide valuable feedback on fit, identify relevant funding opportunities, and can strengthen your application approach.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Heart className="w-5 h-5 text-green-600 mr-2" />
                          Target High-Priority Therapy Areas
                        </h4>
                        <p className="text-sm text-gray-700">
                          Infectious disease ($295M), CNS ($241M), rare diseases, and cancer are top-funded areas. Align your innovation with NIH priorities and demonstrate unmet medical need clearly.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Rocket className="w-5 h-5 text-green-600 mr-2" />
                          Develop Clear Regulatory Strategy
                        </h4>
                        <p className="text-sm text-gray-700">
                          Outline FDA pathway (IND, IDE, 510(k), PMA), regulatory milestones, clinical trial plans. Show understanding of development timeline and realistic commercialization roadmap.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-red-200">
                  <CardHeader className="bg-gradient-to-br from-red-50 to-orange-50">
                    <CardTitle className="text-red-700 text-xl flex items-center">
                      <AlertCircle className="w-6 h-6 mr-3" />
                      Common Biotech Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Weak Commercialization Plan
                        </h4>
                        <p className="text-sm text-gray-700">
                          Vague market strategy without specific reimbursement pathway, competitive analysis, or revenue projections. NIH requires clear path to patient impact and financial sustainability.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Insufficient Scientific Rationale
                        </h4>
                        <p className="text-sm text-gray-700">
                          Missing mechanism of action, poor hypothesis, or weak scientific justification. Include strong scientific background, literature review, and explain how innovation advances field.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Unrealistic Timelines
                        </h4>
                        <p className="text-sm text-gray-700">
                          Overpromising deliverables in Phase I (6-12 months) or Phase II (24 months). Be realistic about development milestones, technical challenges, and regulatory timelines.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Ignoring Fast-Track Option
                        </h4>
                        <p className="text-sm text-gray-700">
                          Missing opportunity for simultaneous Phase I/II review if you have strong preliminary data and commercialization potential. Fast-Track accelerates funding timeline significantly.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA */}
        <section className="py-20 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Apply for Biotech Grants?
              </h2>
              <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
                Download our free biotech grants guide or get personalized help from specialists experienced in NIH SBIR/STTR applications.
              </p>

              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Card className="bg-white/10 backdrop-blur border-2 border-white/20 hover:bg-white/15 transition-all">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-white">Free Biotech Guide</h3>
                    <p className="text-teal-100 text-sm mb-6">
                      Comprehensive PDF with NIH SBIR/STTR templates, FDA Orphan Drug info, state programs, and winning strategies.
                    </p>
                    <Button size="lg" className="w-full bg-white text-teal-700 hover:bg-teal-50 font-semibold" asChild>
                      <Link href="/download/biotech-grants-guide">
                        Download Now (Free)
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-500/20 backdrop-blur border-2 border-yellow-400 hover:bg-yellow-500/25 transition-all">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-gray-900" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-white">Expert Biotech Support</h3>
                    <p className="text-yellow-100 text-sm mb-6">
                      Work with specialists who've helped biotech startups win NIH grants, FDA designations, and navigate regulatory pathways.
                    </p>
                    <Button size="lg" className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold" asChild>
                      <Link href="/contact?service=biotech-grants-help">
                        Get Expert Help
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <p className="text-teal-200 mt-8 text-sm">
                ✓ $1.2B NIH Seed Fund • ✓ 80% preclinical focus • ✓ Zero equity required
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
