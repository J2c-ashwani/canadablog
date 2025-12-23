import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Download, Lightbulb, BookOpen, FlaskConical, GraduationCap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Stage 1: Ideation & Research Funding Canada 2026 | NSERC Discovery Grants | Up to $1M Early-Stage R&D",
  description: "Complete guide to Canadian ideation and research funding for early-stage innovation. Access up to $1M through NSERC Discovery Grants, university research programs, and basic R&D support for concept development.",
  keywords: "ideation funding Canada, research grants Canada, NSERC Discovery Grants, early stage research funding, concept development grants, university research funding, basic R&D grants Canada, proof of concept funding",
  openGraph: {
    title: "Stage 1: Ideation & Research Funding Canada 2026 | NSERC Discovery Grants",
    description: "Access up to $1M in early-stage research funding. Complete guide to NSERC Discovery Grants and concept development programs.",
    url: "https://www.fsidigital.ca/blog/ideation-research-funding-canada",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function IdeationResearchFundingCanadaPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                💡 Stage 1: Ideation & Research Funding
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Stage 1: Ideation & Research Funding Canada 2026
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Access up to $1M in early-stage research and concept development funding through NSERC Discovery Grants, 
                university research programs, and basic R&D support. Fund your innovative ideas from initial concept 
                through proof-of-concept validation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    Explore Research Programs
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

        {/* Stage 1 Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$1M</div>
                  <div className="text-gray-600">Maximum Funding Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">15+</div>
                  <div className="text-gray-600">Early-Stage Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                  <div className="text-gray-600">Non-Repayable Grants</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-violet-600 mb-2">TRL 1-3</div>
                  <div className="text-gray-600">Technology Readiness Level</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Stage 1 Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Stage 1: Ideation & Research Programs</h2>
              
              <div className="space-y-8">
                {/* NSERC Discovery Grants */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <FlaskConical className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">NSERC Discovery Grants Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $1M/5 years</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Basic Research</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Multi-Year</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Natural Sciences and Engineering Research Council's flagship program supporting ongoing basic research 
                      programs with long-term goals, fostering innovation and discovery in natural sciences and engineering.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Research Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Natural sciences and engineering</li>
                          <li>• Fundamental research programs</li>
                          <li>• Long-term research objectives</li>
                          <li>• Novel concepts and methodologies</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Program Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 5-year funding cycles</li>
                          <li>• Research independence and flexibility</li>
                          <li>• Student training support</li>
                          <li>• Equipment and infrastructure funding</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SSHRC Insight Grants */}
                <Card className="border-indigo-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <BookOpen className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700">SSHRC Insight Grants - Social Sciences Research</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $400K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Social Research</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>2-5 Years</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Social Sciences and Humanities Research Council support for research excellence in social sciences, 
                      humanities, and arts, enabling researchers to pursue original investigations.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Research Disciplines:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Social sciences and humanities</li>
                          <li>• Arts and creative research</li>
                          <li>• Policy and governance studies</li>
                          <li>• Cultural and societal research</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Support Included:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Research assistant funding</li>
                          <li>• Travel and fieldwork support</li>
                          <li>• Knowledge mobilization</li>
                          <li>• Dissemination activities</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mitacs Accelerate */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Mitacs Accelerate - University-Industry Research</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$15K per internship</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Collaborative</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>4-12 months</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Research internship program connecting companies with graduate students and postdoctoral fellows 
                      to work on innovation projects at early research stages.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Research Projects:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Applied research problems</li>
                          <li>• Technology exploration</li>
                          <li>• Feasibility studies</li>
                          <li>• Market research and analysis</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Program Benefits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Cost-share model (50/50)</li>
                          <li>• Access to university talent</li>
                          <li>• Flexible project duration</li>
                          <li>• Multiple internships possible</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CIHR Project Grants */}
                <Card className="border-rose-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Lightbulb className="w-6 h-6 text-rose-600 mr-3" />
                      <CardTitle className="text-rose-700">CIHR Project Grants - Health Research</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $750K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Health Research</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>1-5 Years</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Canadian Institutes of Health Research funding for health-related research projects spanning 
                      biomedical, clinical, and health systems research at early stages.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Research Categories:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Biomedical research</li>
                          <li>• Clinical research</li>
                          <li>• Health services research</li>
                          <li>• Population health studies</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Flexible project duration</li>
                          <li>• Open competition format</li>
                          <li>• Peer review process</li>
                          <li>• Knowledge translation support</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What Stage 1 Covers */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Stage 1: Ideation & Research Covers</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">✅ Eligible Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Fundamental Research:</strong> Basic scientific investigations and exploratory studies
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Concept Development:</strong> Initial ideation, hypothesis formulation, and theoretical frameworks
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Literature Review:</strong> Comprehensive review of existing research and state-of-the-art
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Preliminary Testing:</strong> Early lab experiments and feasibility assessments
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Student Training:</strong> Graduate student and postdoctoral fellow support
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700">🎯 Stage 1 Outcomes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Research Publications:</strong> Peer-reviewed journal articles and conference papers
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Proof of Concept:</strong> Validated theoretical concepts and preliminary data
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>IP Foundation:</strong> Patent applications and intellectual property establishment
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Research Network:</strong> Collaboration opportunities and academic partnerships
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Next Stage Readiness:</strong> Foundation for applied research and development (Stage 2)
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Stage 1 Research Funding Success Strategies</h2>
              
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
                          <strong>Novel Research Question:</strong> Demonstrate originality and significance of research
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Strong Methodology:</strong> Clear experimental design and rigorous approach
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Publication Track Record:</strong> Demonstrate research excellence and credibility
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Collaboration Strategy:</strong> Build partnerships with other researchers and institutions
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
                          <strong>Incremental Research:</strong> Lack of novelty or significant contribution to field
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Weak Literature Review:</strong> Insufficient understanding of existing research
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Unclear Methodology:</strong> Vague experimental design or research approach
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Poor Budget Justification:</strong> Inadequate explanation of funding requirements
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
        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Fund Your Early-Stage Research?
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Get expert help navigating Stage 1 ideation and research funding programs. Our specialists have secured 
                $42M+ in NSERC Discovery Grants and early-stage research funding.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=ideation-research-funding-canada-expert-help">
                    Get Expert Help
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/innovation-grants">
                    View All Innovation Stages
                  </Link>
                </Button>
              </div>
              
              <p className="text-purple-200 text-sm mt-6">
                78% success rate • $42M+ secured in NSERC and research grants • Expert guidance for all stages
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
