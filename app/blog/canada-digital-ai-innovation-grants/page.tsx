import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, Download, Brain, Code, Database, Sparkles, ExternalLink, ArrowRight } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Digital & AI Innovation Grants 2026 | $850M+ Funding | Scale AI & CDAP",
  description: "Complete guide to Canadian digital and AI innovation grants. Access $850M+ funding through Scale AI, CDAP, AI research initiatives, and 25+ digital transformation programs.",
  keywords: "Canada AI grants, digital transformation funding Canada, Scale AI supercluster, CDAP digital adoption, AI research funding, software innovation grants Canada",
  openGraph: {
    title: "Canada Digital & AI Innovation Grants 2026 | $850M+ AI Funding",
    description: "Access $850M+ in digital and AI funding. Complete guide to Scale AI, CDAP, and 25+ AI innovation grants.",
    url: "https://www.fsidigital.ca/blog/canada-digital-ai-innovation-grants",
    images: ["/og-image.png"],
  },
}

const faqData = [
  {
    question: "What is the Scale AI Supercluster funding?",
    answer: "Scale AI offers funding for industry-led projects that accelerate the adoption of AI in supply chains. It typically covers up to 50% of eligible project costs for consortiums that include startups, SMEs, and research institutions."
  },
  {
    question: "Is CDAP grant still available?",
    answer: "The CDAP 'Boost Your Business Technology' grant is currently fully subscribed, but the 'Grow Your Business Online' grant remains available for smaller businesses. Additionally, businesses may still access zero-interest loans through BDC for digital transformation."
  },
  {
    question: "Does IRAP fund AI startups?",
    answer: "Yes, IRAP heavily supports AI and machine learning R&D. They provide non-repayable contributions covering 60-80% of technical labor and subcontractor costs for innovative software development projects."
  },
  {
    question: "Are there grants for AI research in Canada?",
    answer: "Yes, through the Pan-Canadian AI Strategy, funding is available for AI research institutes (Mila, Vector, Amii) and collaborative projects between academia and industry. NSERC also offers Alliance grants for university-industry AI partnerships."
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

export default function CanadaDigitalAIInnovationGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🤖 Digital & AI Innovation Grants
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Digital & AI Innovation Grants 2026
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Access $850M+ in digital and AI innovation funding through 25+ federal and provincial programs.
                From Scale AI supercluster to CDAP digital adoption - accelerate your artificial intelligence,
                digital transformation, and software innovation initiatives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    Explore AI Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/innovation-grants">
                    Back to Innovation Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$850M+</div>
                  <div className="text-gray-600">AI Funding Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
                  <div className="text-gray-600">Active AI Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$230M</div>
                  <div className="text-gray-600">Scale AI Investment</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">$15K</div>
                  <div className="text-gray-600">CDAP Digital Grant</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major AI Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What are the Top Grants for AI and Digital Transformation?</h2>

              <div className="space-y-8">
                {/* Scale AI */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Brain className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Scale AI - AI-Powered Supply Chains Supercluster</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $5M+</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>AI Supply Chain</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Collaborative</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Canada's AI Supercluster providing funding for projects applying AI to supply chains, logistics,
                      manufacturing, and retail operations across industries.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">AI Applications:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Predictive analytics and forecasting</li>
                          <li>• Computer vision and quality control</li>
                          <li>• Natural language processing</li>
                          <li>• Autonomous systems and robotics</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Support:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Up to 50% of eligible project costs</li>
                          <li>• Consortium partnerships required</li>
                          <li>• Scale-up and commercialization focus</li>
                          <li>• Skills development included</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CDAP */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Code className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">CDAP - Canada Digital Adoption Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$15K + $100K Loan</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Digital Tools</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Quick Access</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Support for SMEs adopting digital technologies including AI tools, cloud platforms,
                      e-commerce systems, and digital marketing solutions.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Digital Solutions:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• AI-powered business tools</li>
                          <li>• Cloud computing platforms</li>
                          <li>• E-commerce and digital marketing</li>
                          <li>• CRM and business automation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Program Benefits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• $15K grant for digital adoption plan</li>
                          <li>• Up to $100K interest-free loan</li>
                          <li>• Digital advisor support included</li>
                          <li>• Youth talent hiring support</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* IRAP AI Projects */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Sparkles className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">IRAP AI & Machine Learning Projects</CardTitle>
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
                        <span><strong>AI R&D</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Non-Repayable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      IRAP funding for SMEs developing AI/ML solutions, algorithms, and intelligent systems
                      with commercial applications across industries.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">AI Development Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Machine learning algorithms</li>
                          <li>• Computer vision applications</li>
                          <li>• Natural language processing</li>
                          <li>• Predictive analytics systems</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Support Included:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 60-80% of eligible R&D costs</li>
                          <li>• Industrial Technology Advisor</li>
                          <li>• Technical expertise access</li>
                          <li>• Commercialization support</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pan-Canadian AI Strategy */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Database className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">Pan-Canadian AI Strategy Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$443M Investment</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>AI Research</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Academic-Industry</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal AI strategy supporting AI research institutes (Mila, Vector, Amii), talent development,
                      and commercialization through industry partnerships.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">AI Institutes:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Mila (Montreal) - Deep learning</li>
                          <li>• Vector (Toronto) - Machine learning</li>
                          <li>• Amii (Edmonton) - Reinforcement learning</li>
                          <li>• Industry partnership programs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Support Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• AI research collaborations</li>
                          <li>• Talent development programs</li>
                          <li>• Industry application projects</li>
                          <li>• Technology commercialization</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* AI by Application Area */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Which AI Sectors Qualify for Funding?</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Brain className="w-8 h-8 text-blue-600" />,
                    title: "Machine Learning",
                    funding: "$280M+",
                    programs: "12+ Programs",
                    features: ["Deep learning models", "Predictive analytics", "Pattern recognition"]
                  },
                  {
                    icon: <Code className="w-8 h-8 text-purple-600" />,
                    title: "Computer Vision",
                    funding: "$190M+",
                    programs: "8+ Programs",
                    features: ["Image recognition", "Object detection", "Quality inspection AI"]
                  },
                  {
                    icon: <Sparkles className="w-8 h-8 text-green-600" />,
                    title: "Natural Language Processing",
                    funding: "$150M+",
                    programs: "7+ Programs",
                    features: ["Text analysis", "Chatbots & conversational AI", "Sentiment analysis"]
                  },
                  {
                    icon: <Database className="w-8 h-8 text-orange-600" />,
                    title: "Big Data & Analytics",
                    funding: "$130M+",
                    programs: "9+ Programs",
                    features: ["Data infrastructure", "Business intelligence", "Real-time analytics"]
                  },
                  {
                    icon: <Building className="w-8 h-8 text-teal-600" />,
                    title: "AI in Healthcare",
                    funding: "$210M+",
                    programs: "6+ Programs",
                    features: ["Medical imaging AI", "Drug discovery", "Patient care optimization"]
                  },
                  {
                    icon: <Users className="w-8 h-8 text-pink-600" />,
                    title: "AI Skills & Training",
                    funding: "$95M+",
                    programs: "10+ Programs",
                    features: ["Workforce development", "AI education", "Talent programs"]
                  }
                ].map((tech, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all border-gray-200">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        {tech.icon}
                        <Badge variant="outline" className="text-xs">
                          {tech.programs}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{tech.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900 mb-2">{tech.funding}</div>
                      <div className="text-sm text-gray-500 mb-4">Available Funding</div>
                      <div className="space-y-2">
                        {tech.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Provincial AI Support */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Where can I Find Provincial AI Grants (Ontario, Quebec, BC)?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-blue-700">🍁 Leading Provincial Programs:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Ontario AI Strategy:</strong> $190M for AI research and commercialization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Quebec AI Hub:</strong> $185M for AI ecosystem development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>BC Tech Fund:</strong> $120M for digital innovation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Alberta Innovation Grants:</strong> $95M for AI and tech</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-purple-700">🎯 Priority AI Applications:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Healthcare AI:</strong> Medical imaging and diagnostics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>FinTech AI:</strong> Fraud detection and risk analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>AgriTech AI:</strong> Precision agriculture solutions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Smart Cities:</strong> Urban AI applications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Tips */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Secure Funding for AI Projects?</h2>

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
                          <strong>Clear AI Use Case:</strong> Define specific problem AI solves with measurable outcomes
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Data Strategy:</strong> Demonstrate access to quality training data
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Technical Team:</strong> Show AI/ML expertise and development capability
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Commercialization Path:</strong> Clear go-to-market and scaling strategy
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
                          <strong>Vague AI Application:</strong> Not clearly defining what AI does or solves
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Weak Data Foundation:</strong> Insufficient or poor quality training data
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Overpromising AI Capabilities:</strong> Unrealistic expectations about AI performance
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>No Business Model:</strong> Technology without clear revenue or impact model
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Questions About Digital & AI Grants</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Accordion type="single" collapsible key={index}>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-medium text-blue-700">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Official Resources Section */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Official AI & Digital Funding Resources</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-blue-600" />
                    Government & Agencies
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://www.scaleai.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                        Scale AI Supercluster <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                    <li>
                      <a href="https://ised-isde.canada.ca/site/canada-digital-adoption-program/en" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                        Canada Digital Adoption Program (CDAP) <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                    <li>
                      <a href="https://cifar.ca/ai/" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                        Pan-Canadian AI Strategy (CIFAR) <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-blue-600" />
                    Related Guides
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/blog/canada-federal-grants" className="flex items-center text-blue-600 hover:underline">
                        Canada Federal Grants Guide <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/sred-scientific-research-experimental-development" className="flex items-center text-blue-600 hover:underline">
                        SR&ED Tax Credit Guide <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/software-saas-startup-grants" className="flex items-center text-blue-600 hover:underline">
                        Software & SaaS Grants <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Digital & AI Funding?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get our complete digital and AI funding guide or work with specialists who have secured
                $85M+ in AI grants across Scale AI, CDAP, and research programs.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Complete Application Guide</h4>
                  <p className="text-blue-100 text-sm mb-4">
                    Get our step-by-step AI funding application guide with Scale AI templates, CDAP tools, and program selection strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/canada-digital-ai-funding-guide">
                      <Download className="w-4 h-4 mr-2" />
                      View Application Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert AI Funding Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with AI funding specialists who have secured $85M+ with 79% success rate across Scale AI and digital programs.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=ai-expert-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-blue-200 text-sm mt-6">
                79% success rate • $85M+ secured • Scale AI, CDAP & Research expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
