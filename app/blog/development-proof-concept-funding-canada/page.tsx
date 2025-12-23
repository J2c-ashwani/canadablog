import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Download, Beaker, Cog, TestTube, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Stage 2: Development & Proof-of-Concept Funding Canada 2026 | IRAP & SR&ED | Up to $5M Technology Development",
  description: "Complete guide to Canadian development and proof-of-concept funding. Access up to $5M through IRAP Technology Development, SR&ED Tax Credits, NSERC CRD, and applied research programs for TRL 4-6 projects.",
  keywords: "proof of concept funding Canada, technology development grants, IRAP funding Canada, SR&ED tax credits, applied research funding, prototype development grants, NSERC CRD funding, TRL 4-6 funding Canada",
  openGraph: {
    title: "Stage 2: Development & Proof-of-Concept Funding Canada 2026 | IRAP & SR&ED",
    description: "Access up to $5M in technology development funding. Complete guide to IRAP, SR&ED, and proof-of-concept programs.",
    url: "https://www.fsidigital.ca/blog/development-proof-concept-funding-canada",
    images: ["/og-image.png"],
  },
}

export default function DevelopmentProofConceptFundingCanadaPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-cyan-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🔬 Stage 2: Development & Proof-of-Concept Funding
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Stage 2: Development & Proof-of-Concept Funding Canada 2026
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Access up to $5M in technology development and proof-of-concept funding through IRAP Technology Development,
                SR&ED Tax Credits, NSERC CRD, and applied research programs. Validate your innovation from prototype
                development through technical feasibility demonstration (TRL 4-6).
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    Explore Development Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/innovation-grants">
                    View All Innovation Stages
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stage 2 Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$5M</div>
                  <div className="text-gray-600">Maximum Funding Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-600 mb-2">20+</div>
                  <div className="text-gray-600">Development Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">60-80%</div>
                  <div className="text-gray-600">Cost Coverage (IRAP)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">TRL 4-6</div>
                  <div className="text-gray-600">Technology Readiness Level</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Stage 2 Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Stage 2: Development & Proof-of-Concept Programs</h2>

              <div className="space-y-8">
                {/* IRAP Technology Development */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Beaker className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">IRAP - Industrial Research Assistance Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $500K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Technology Development</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Non-Repayable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      NRC's flagship program supporting Canadian SMEs developing innovative technology projects with strong
                      commercialization potential. Provides funding and advisory services for technology validation and prototype development.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Development Activities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Prototype development and testing</li>
                          <li>• Technical feasibility validation</li>
                          <li>• Product design and engineering</li>
                          <li>• Process development and optimization</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Program Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 60-80% of eligible project costs</li>
                          <li>• Industrial Technology Advisor support</li>
                          <li>• Youth employment programs</li>
                          <li>• Access to research networks</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SR&ED Tax Credits */}
                <Card className="border-cyan-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <TestTube className="w-6 h-6 text-cyan-600 mr-3" />
                      <CardTitle className="text-cyan-700">SR&ED Tax Credits - Scientific Research & Experimental Development</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>35-65% Tax Credits</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>R&D Activities</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Refundable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Canada's largest federal innovation support program providing tax incentives for companies conducting
                      eligible R&D activities, including prototype development and technical uncertainty resolution.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible SR&ED Work:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Experimental development activities</li>
                          <li>• Applied research projects</li>
                          <li>• Technical problem solving</li>
                          <li>• Prototype iteration and testing</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Credit Benefits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Up to 65% for CCPCs (first $3M)</li>
                          <li>• 35% for larger corporations</li>
                          <li>• Fully refundable for eligible CCPCs</li>
                          <li>• Unlimited eligible expenditures</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* NSERC CRD */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Cog className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">NSERC Collaborative Research and Development (CRD)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $500K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Collaborative R&D</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>3-5 Years</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      NSERC program supporting university-industry collaborative research projects that combine academic
                      research excellence with practical industry applications and technology development.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Project Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• University-industry partnership</li>
                          <li>• Applied research objectives</li>
                          <li>• Industry co-funding required</li>
                          <li>• Technology transfer potential</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Support Included:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Research personnel funding</li>
                          <li>• Equipment and materials</li>
                          <li>• Knowledge transfer support</li>
                          <li>• Student training opportunities</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* OCE Programs */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Zap className="w-6 h-6 text-amber-600 mr-3" />
                      <CardTitle className="text-amber-700">Provincial Applied Research Programs (OCE, Alberta Innovates)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$50K - $250K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Applied Research</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>6-18 Months</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Provincial innovation agencies providing funding for applied research projects, technology validation,
                      and proof-of-concept development through industry-academic collaborations.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Program Examples:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• OCE Voucher for Innovation & Productivity</li>
                          <li>• Alberta Innovates Applied Research</li>
                          <li>• Québec CRITM programs</li>
                          <li>• BC InnovateBC programs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Cost-share models (typically 50/50)</li>
                          <li>• Access to research facilities</li>
                          <li>• Technical expertise support</li>
                          <li>• Rapid application process</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What Stage 2 Covers */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Stage 2: Development & Proof-of-Concept Covers</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">✅ Eligible Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Prototype Development:</strong> Building functional prototypes and proof-of-concept models
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Technical Validation:</strong> Testing, iteration, and performance verification
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Applied Research:</strong> Solving technical uncertainties and engineering challenges
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Process Development:</strong> Manufacturing process design and optimization
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Material Testing:</strong> Component testing and materials evaluation
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-cyan-200">
                  <CardHeader>
                    <CardTitle className="text-cyan-700">🎯 Stage 2 Outcomes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Working Prototype:</strong> Functional demonstration of technology in relevant environment
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Technical Feasibility:</strong> Proven concept with validated performance metrics
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>IP Protection:</strong> Patent applications and intellectual property portfolio
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Market Validation:</strong> Customer feedback and early market interest
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Scale-Up Readiness:</strong> Foundation for pilot production and commercialization (Stage 3)
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Success Tips */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Stage 2 Development Funding Success Strategies</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Clear Technical Milestones:</strong> Define measurable objectives and success criteria
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Strong Technical Team:</strong> Demonstrate relevant expertise and capabilities
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Market Alignment:</strong> Show clear customer need and commercialization path
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Rigorous Documentation:</strong> Maintain detailed technical records for SR&ED claims
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">❌ Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Vague Technical Approach:</strong> Unclear methodology or development plan
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>No Market Validation:</strong> Insufficient customer feedback or market research
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Poor SR&ED Documentation:</strong> Inadequate records of R&D activities
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Weak IP Strategy:</strong> No plan for intellectual property protection
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Next Stage CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Fund Your Technology Development?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get expert help navigating Stage 2 development and proof-of-concept funding programs. Our specialists have secured
                $156M+ in IRAP, SR&ED, and technology development funding.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=development-proof-concept-funding-canada-expert-help">
                    Get Expert Help
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/innovation-grants">
                    View All Innovation Stages
                  </Link>
                </Button>
              </div>

              <p className="text-blue-200 text-sm mt-6">
                82% success rate • $156M+ secured in IRAP and SR&ED • Expert guidance for all stages
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
