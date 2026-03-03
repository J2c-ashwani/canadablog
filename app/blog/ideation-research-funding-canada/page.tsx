import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Download, Lightbulb, BookOpen, FlaskConical, GraduationCap, ExternalLink, HelpCircle } from "lucide-react"
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
    images: ["/og-image.png"],
  },
}

const faqData = [
  {
    question: "Can I apply for NSERC if I am a pre-revenue startup?",
    answer: "No, NSERC Discovery Grants are primarily for academic researchers at eligible Canadian universities. However, startups can partner with these researchers through NSERC Alliance or Mitacs Accelerate to access this expertise and funding indirectly."
  },
  {
    question: "Does 'Ideation' funding cover my salary?",
    answer: "Most Stage 1 grants (like NSERC or Mitacs) cover student stipends, research materials, and university overhead. They typically do not cover the founder's salary. For salary support, look into wage subsidies or specific entrepreneurship fellowships."
  },
  {
    question: "How long does the NSERC Discovery application process take?",
    answer: "It is a long cycle. Notices of Intent are usually due in August, full applications in November, and results are announced the following April. It requires long-term planning."
  },
  {
    question: "What is TRL 1-3 funding used for?",
    answer: "TRL 1-3 funding is used for basic research, proof of concept, and validating scientific principles. It covers costs like lab equipment, graduate student researchers, and preliminary feasibility studies."
  }
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}

export default function IdeationResearchFundingCanadaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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

        {/* TRL Breakdown Section */}
        <section className="py-12 bg-purple-50 border-y border-purple-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">What are Technology Readiness Levels (TRL 1-3)?</h2>
              <p className="text-gray-700 text-center mb-10 max-w-2xl mx-auto">
                Government grants are strictly categorized by TRL. Stage 1 focus is exclusively on the "Discovery" phase. Applying for the wrong stage is the #1 reason for rejection.
              </p>

              <div className="space-y-6">
                <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xl mr-4">1</div>
                  <div>
                    <h3 className="font-bold text-lg text-purple-900">TRL 1: Basic Principles Observed</h3>
                    <p className="text-sm text-gray-600 mb-2">Scientific research begins to be translated into applied research and development. Examples include basic properties of materials or algorithms.</p>
                    <Badge variant="outline" className="text-purple-600 bg-purple-50 border-purple-200">NSERC Discovery Eligible</Badge>
                  </div>
                </div>

                <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border-l-4 border-indigo-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl mr-4">2</div>
                  <div>
                    <h3 className="font-bold text-lg text-indigo-900">TRL 2: Technology Concept Formulated</h3>
                    <p className="text-sm text-gray-600 mb-2">Practical applications can be invented. The application is speculative, and there may be no proof or detailed analysis to support the assumptions.</p>
                    <Badge variant="outline" className="text-indigo-600 bg-indigo-50 border-indigo-200">Mitacs Accelerate Eligible</Badge>
                  </div>
                </div>

                <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl mr-4">3</div>
                  <div>
                    <h3 className="font-bold text-lg text-blue-900">TRL 3: Analytical & Experimental Critical Function Proof</h3>
                    <p className="text-sm text-gray-600 mb-2">Active R&D is initiated. This includes analytical studies and laboratory studies to physically validate the analytical predictions of separate elements of the technology.</p>
                    <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200">NRC IRAP Eligible</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Stage 1 Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Programs Support Early-Stage Ideation?</h2>

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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Activities are Eligible for Stage 1 Funding?</h2>

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

        {/* Idea to Prototype Roadmap */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How Do You Move from Idea to Prototype?</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 relative">
                  <div className="absolute -top-4 left-6 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <h3 className="font-bold text-purple-900 mt-2 mb-2">Literature Review</h3>
                  <p className="text-sm text-gray-600">Deep dive into existing patents and papers.
                    <br /><span className="text-purple-600 font-semibold text-xs">Goal: Confirm Novelty</span></p>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 relative">
                  <div className="absolute -top-4 left-6 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <h3 className="font-bold text-indigo-900 mt-2 mb-2">Hypothesis</h3>
                  <p className="text-sm text-gray-600">Formulate clear research questions and methodology.
                    <br /><span className="text-indigo-600 font-semibold text-xs">Goal: Experimental Design</span></p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 relative">
                  <div className="absolute -top-4 left-6 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <h3 className="font-bold text-blue-900 mt-2 mb-2">Lab Testing</h3>
                  <p className="text-sm text-gray-600">Conduct initial experiments to validate core concepts.
                    <br /><span className="text-blue-600 font-semibold text-xs">Goal: Proof of Concept</span></p>
                </div>
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 relative">
                  <div className="absolute -top-4 left-6 w-8 h-8 bg-slate-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <h3 className="font-bold text-slate-900 mt-2 mb-2">IP Protection</h3>
                  <p className="text-sm text-gray-600">File provisional patent before public disclosure.
                    <br /><span className="text-slate-600 font-semibold text-xs">Goal: Secure Rights</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real World Case Study */}
        <section className="py-16 bg-slate-50 border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Case Study: How Does Early-Stage Funding Work in Practice?</h2>
              <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                    B
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">BioPolymer Solutions (Hypothetical)</h3>
                    <p className="text-slate-600">University spin-out developing biodegradable plastics from algae.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                      <div className="h-full w-0.5 bg-gray-200 my-2"></div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-slate-900">Month 1-6 (TRL 1)</span>
                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">NSERC Discovery</Badge>
                      </div>
                      <p className="text-sm text-slate-600">Professor secured $40,000 NSERC grant to theorize algae strain modification formula.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                      <div className="h-full w-0.5 bg-gray-200 my-2"></div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-slate-900">Month 7-12 (TRL 2)</span>
                        <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">Mitacs Accelerate</Badge>
                      </div>
                      <p className="text-sm text-slate-600">Partnered with local manufacturing firm to fund a PhD student internship ($30k) for formulation testing.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-slate-900">Month 13-18 (TRL 3)</span>
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">NRC IRAP</Badge>
                      </div>
                      <p className="text-sm text-slate-600">IRAP provided $50,000 to validate the degradation rate in a controlled lab environment. IP filed.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Tips */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How Can You Win Stage 1 Research Grants?</h2>

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

        {/* Official Resources */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Official Government Resources</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <a href="https://www.nserc-crsng.gc.ca/professors-professeurs/grants-subs/discovery-decouverte_eng.asp" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                  <ExternalLink className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">NSERC Discovery Grants</div>
                    <div className="text-sm text-gray-600">Official program guidelines</div>
                  </div>
                </a>
                <a href="https://www.mitacs.ca/en/programs/accelerate" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                  <ExternalLink className="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Mitacs Accelerate</div>
                    <div className="text-sm text-gray-600">Internship program details</div>
                  </div>
                </a>
                <a href="https://nrc.canada.ca/en/support-technology-innovation/nrc-irap" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                  <ExternalLink className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">NRC IRAP</div>
                    <div className="text-sm text-gray-600">Industrial Research Assistance Program</div>
                  </div>
                </a>
                <a href="https://www.sshrc-crsh.gc.ca/funding-financement/programs-programmes/insight_grants-subventions_savoir-eng.aspx" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                  <ExternalLink className="w-6 h-6 text-rose-600 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">SSHRC Insight Grants</div>
                    <div className="text-sm text-gray-600">Social sciences funding</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold text-gray-900">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">What are Common Questions About Ideation & Research Funding?</h2>
              <p className="text-lg text-gray-600 text-center mb-8">Quick answers to the most frequently asked questions about early-stage research funding in Canada.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#nserc" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-purple-100">
                  <h3 className="font-semibold text-purple-700">Who can apply for NSERC Discovery Grants?</h3>
                  <p className="text-sm text-gray-600 mt-1">Researchers at eligible Canadian universities conducting fundamental research</p>
                </a>
                <a href="#trl" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-purple-100">
                  <h3 className="font-semibold text-purple-700">What does TRL 1-3 mean?</h3>
                  <p className="text-sm text-gray-600 mt-1">Early discovery phase: basic research, concept formulation, and proof-of-principle</p>
                </a>
                <a href="#mitacs" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-purple-100">
                  <h3 className="font-semibold text-purple-700">How does Mitacs Accelerate work?</h3>
                  <p className="text-sm text-gray-600 mt-1">Cost-shared internships connecting businesses with graduate researchers</p>
                </a>
                <a href="#funding" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-purple-100">
                  <h3 className="font-semibold text-purple-700">How much funding is available?</h3>
                  <p className="text-sm text-gray-600 mt-1">Up to $1M through NSERC Discovery, $400K through SSHRC, $750K through CIHR</p>
                </a>
                <a href="#timeline" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-purple-100">
                  <h3 className="font-semibold text-purple-700">How long is the NSERC application process?</h3>
                  <p className="text-sm text-gray-600 mt-1">6-8 months from Notice of Intent to approval (August to April cycle)</p>
                </a>
                <a href="#outcomes" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-purple-100">
                  <h3 className="font-semibold text-purple-700">What are acceptable Stage 1 outcomes?</h3>
                  <p className="text-sm text-gray-600 mt-1">Publications, proof-of-concept, IP foundations, and Stage 2 readiness</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">📚 Related Guides</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/blog/development-proof-concept-funding-canada" className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Stage 2: Development & Proof-of-Concept</h3>
                  <p className="text-sm text-gray-600">Move from research to prototype with IRAP and SR&ED funding</p>
                </Link>
                <Link href="/blog/demonstration-pilot-funding-canada" className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Stage 3: Demonstration & Pilot</h3>
                  <p className="text-sm text-gray-600">Scale to pre-commercial demonstration with SDTC and Clean Growth</p>
                </Link>
                <Link href="/blog/nserc-research-grants-canada" className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">NSERC Research Grants</h3>
                  <p className="text-sm text-gray-600">Complete guide to Natural Sciences and Engineering Research Council programs</p>
                </Link>
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
