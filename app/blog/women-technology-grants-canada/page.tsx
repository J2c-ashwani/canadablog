import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Send, Lightbulb, Heart, Sparkles, Zap, Rocket, Code, ExternalLink, MapPin, Briefcase, HelpCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Women in Technology Grants Canada 2026 | AI, Software & Digital Innovation Funding",
  description: "Complete guide to Canadian women technology grants with NRC IRAP, Innovate BC, Alberta Innovates, AI funding, software development support, and digital innovation programs.",
  keywords: "women technology grants Canada, women in tech funding, AI grants women, software development funding, digital innovation support",
  openGraph: {
    title: "Women in Technology Grants Canada 2026 | Tech Innovation Funding",
    description: "Comprehensive guide to technology grants for Canadian women entrepreneurs in software, AI, digital innovation, and tech startups.",
    url: "https://www.fsidigital.ca/blog/women-technology-grants-canada",
    images: ["/og-image.png"],
  },
}

export default function WomenTechnologyGrantsCanada() {
  const faqData = [
    {
      question: "Are there specific grants for women in tech?",
      answer: "Yes. Programs like the Women Entrepreneurship Strategy (WES) ecosystem fund and specialized streams within IRAP often target women-led technology firms."
    },
    {
      question: "Does IRAP fund software development?",
      answer: "Yes, but only if there is 'technical uncertainty'. Building a standard app isn't enough; you must be solving a difficult technical problem (e.g., new algorithm, complex integration)."
    },
    {
      question: "What is the 'Women in Technology' venture fund?",
      answer: "Applying via BDC, this is a venture capital fund (equity, not grant) specifically for Canadian women-led technology companies scaling up."
    },
    {
      question: "Can I stack multiple grants?",
      answer: "Yes. You can often combine federal grants (like IRAP) with provincial ones (like Innovate BC), provided they don't cover the same eligible cost twice."
    },
    {
      question: "Is SR&ED a grant?",
      answer: "No, it's a tax credit. However, it is a crucial source of non-dilutive funding for tech companies, refunding up to 35% of eligible R&D salaries."
    }
  ];

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-700 to-purple-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                💻 Tech Innovation Funding 2026
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Women in Technology Grants Canada
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Comprehensive guide to Canadian technology grants for women entrepreneurs in software development,
                AI and machine learning, digital innovation, clean tech, and tech startups. Access federal programs
                like NRC IRAP, provincial innovation funding through Innovate BC and Alberta Innovates, women-specific
                tech accelerators, and specialized support for women building technology companies across Canada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="#tech-programs">
                    View Tech Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/download/women-technology-grants-guide">
                    Get Tech Funding Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced 2026 Program Updates */}
        <section className="py-8 bg-green-50 border-b-2 border-green-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <TrendingUp className="w-6 h-6 text-green-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-green-800 mb-2">🚀 Women Tech Funding 2026 Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                        <div>
                          <strong>NRC IRAP:</strong> Up to $10M for industrial R&D and technology commercialization
                        </div>
                        <div>
                          <strong>Provincial Innovation:</strong> Innovate BC, Alberta Innovates, Ontario Creates programs
                        </div>
                        <div>
                          <strong>AI Funding:</strong> Specialized support for women in artificial intelligence and machine learning
                        </div>
                        <div>
                          <strong>Tech Accelerators:</strong> Women-focused startup programs in Vancouver, Toronto, Montreal
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
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Canada's Innovation Ecosystem for Women Tech Entrepreneurs</h2>
                <p className="text-lg text-gray-600">
                  Canadian women technology entrepreneurs have access to comprehensive funding across software development,
                  AI/ML research, digital innovation, clean tech, and hardware development. Federal programs like NRC IRAP
                  provide up to $10M for R&D, while provincial innovation agencies offer grants, loans, and acceleration
                  programs. Women-specific tech accelerators and diversity initiatives provide additional support pathways.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$10M</div>
                  <div className="text-gray-600">NRC IRAP Max</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">AI/ML</div>
                  <div className="text-gray-600">Specialized Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">Provincial</div>
                  <div className="text-gray-600">Innovation Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">Accelerators</div>
                  <div className="text-gray-600">Women Tech Programs</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Programs */}
        <section id="tech-programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Women Technology Funding Programs</h2>

              <div className="space-y-8">
                {/* NRC IRAP */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Code className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">NRC Industrial Research Assistance Program (IRAP)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-blue-800">Technology R&D Funding</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                            <span className="font-semibold">Funding Amount:</span>
                            <span className="text-blue-700 font-bold">Up to $10M</span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>• Non-repayable contributions for R&D projects</p>
                            <p>• Advisory services from technology experts</p>
                            <p>• Networking and partnership support</p>
                            <p>• Women-led tech startups eligible</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Ideal For</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Software Development:</strong> Innovative applications and platforms</p>
                          <p><strong>AI/ML Projects:</strong> Artificial intelligence and machine learning R&D</p>
                          <p><strong>Clean Tech:</strong> Environmental technology solutions</p>
                          <p><strong>Hardware:</strong> Advanced technology product development</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Innovate BC */}
                <Card className="border-emerald-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Zap className="w-6 h-6 text-emerald-600 mr-3" />
                      <CardTitle className="text-emerald-700">Innovate BC Women in Technology Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-emerald-800">BC Tech Innovation Funding</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-emerald-50 p-3 rounded-lg">
                            <span className="font-semibold">Program Type:</span>
                            <span className="text-emerald-700 font-bold">Grants & Acceleration</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• Women-led tech startup support</p>
                            <p>• Innovation vouchers and grants</p>
                            <p>• Acceleration and mentorship programs</p>
                            <p>• Commercialization support services</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">BC Tech Focus</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Vancouver Tech Hub:</strong> Software, AI, clean tech clusters</p>
                          <p><strong>Women Accelerators:</strong> BC-based tech acceleration programs</p>
                          <p><strong>Scale-Up Support:</strong> Growth-stage technology companies</p>
                          <p><strong>Export Assistance:</strong> International market expansion</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Alberta Innovates */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Rocket className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">Alberta Innovates Women Tech Innovation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-orange-800">Alberta Tech Funding</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg">
                            <span className="font-semibold">Focus:</span>
                            <span className="text-orange-700 font-bold">Innovation & Commercialization</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Provincial Crown corporation supporting women in AI, clean energy, agriculture technology,
                              health innovation, and digital transformation with grants, investments, and commercialization support.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Program Areas</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>AI & Digital:</strong> Machine learning and automation</p>
                          <p><strong>Clean Energy:</strong> Environmental technology solutions</p>
                          <p><strong>Health Tech:</strong> Medical devices and digital health</p>
                          <p><strong>Agri-Food:</strong> Agriculture technology innovation</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Ontario Creates */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Sparkles className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Ontario Creates - Digital Media & Interactive Content</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-purple-800">Interactive Digital Media Support</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                            <span className="font-semibold">Industry:</span>
                            <span className="text-purple-700 font-bold">Digital Media & Games</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• Interactive digital media production funding</p>
                            <p>• Video game development support</p>
                            <p>• Content creation and publishing</p>
                            <p>• Women creators and producers eligible</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Creative Tech Support</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Gaming:</strong> Video game development and publishing</p>
                          <p><strong>VR/AR:</strong> Immersive technology content</p>
                          <p><strong>Animation:</strong> Digital animation production</p>
                          <p><strong>Interactive:</strong> Web and mobile applications</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI & ML Specific Programs */}
                <Card className="border-indigo-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Lightbulb className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700">AI & Machine Learning Women Funding</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-indigo-800">Artificial Intelligence Support</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-indigo-50 p-3 rounded-lg">
                            <span className="font-semibold">Technology:</span>
                            <span className="text-indigo-700 font-bold">AI/ML Innovation</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Specialized funding for women entrepreneurs developing artificial intelligence, machine learning,
                              deep learning, natural language processing, and computer vision solutions through federal SR&ED tax
                              credits and provincial AI research programs.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">AI Funding Sources</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>SR&ED Tax Credits:</strong> Up to 35% refundable for R&D</p>
                          <p><strong>MITACS:</strong> Research partnerships and internships</p>
                          <p><strong>AI Institutes:</strong> Vector, Mila, Amii collaboration funding</p>
                          <p><strong>NRC IRAP:</strong> AI project development support</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Women Tech Accelerators */}
                <Card className="border-pink-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-pink-600 mr-3" />
                      <CardTitle className="text-pink-700">Women-Focused Tech Accelerators & Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-pink-800">Acceleration Programs</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-pink-50 p-3 rounded-lg">
                            <span className="font-semibold">Focus:</span>
                            <span className="text-pink-700 font-bold">Women Tech Startups</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• Funding + mentorship + network access</p>
                            <p>• Vancouver, Toronto, Montreal programs</p>
                            <p>• Sector-specific (AI, clean tech, software)</p>
                            <p>• Demo day and investor connections</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Leading Accelerators</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>L-SPARK:</strong> Ottawa SaaS and cloud technology women founders</p>
                          <p><strong>Alate Partners:</strong> BC women tech entrepreneurs</p>
                          <p><strong>MaRS Discovery:</strong> Toronto women innovation programs</p>
                          <p><strong>Highline Beta:</strong> Montreal women startup ventures</p>
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
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Tech Funding Success Strategies for Women</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Winning Tech Funding Strategies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Technical Innovation:</strong> Clearly articulate unique technology and competitive advantage
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Market Validation:</strong> Demonstrate product-market fit and customer traction
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>IP Strategy:</strong> Show intellectual property protection and defensibility
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Team Strength:</strong> Highlight technical expertise and advisory board
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">❌ Common Tech Funding Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Vague Technology:</strong> Not explaining what makes innovation unique or defensible
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>No MVP:</strong> Applying without minimum viable product or customer validation
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Weak Financials:</strong> Unclear path to revenue or unrealistic projections
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Solo Founder:</strong> Not building strong technical team or advisory board
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-start">
                      <HelpCircle className="w-5 h-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 pl-8">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore More Funding Options</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Link href="/canada/ontario" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><MapPin className="w-5 h-5 text-blue-600 mr-3" /><span>Ontario Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/british-columbia" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Target className="w-5 h-5 text-emerald-600 mr-3" /><span>BC Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/alberta" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Award className="w-5 h-5 text-orange-600 mr-3" /><span>Alberta Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/quebec" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Briefcase className="w-5 h-5 text-purple-600 mr-3" /><span>Quebec Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Shield className="w-5 h-5 text-red-600 mr-3" /><span>All Provincial Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Funding Guides</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/software-saas-startup-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Rocket className="w-5 h-5 text-blue-600 mr-3" /><span>SaaS & Startup Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/canada-innovation-research-development-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Lightbulb className="w-5 h-5 text-blue-600 mr-3" /><span>R&D & Innovation Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-700 to-purple-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Women Technology Funding in Canada?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get our complete women technology grants guide with program navigator and technical application strategies,
                or work with our tech funding specialists for expert support.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Free Tech Funding Guide</h4>
                  <p className="text-blue-100 text-sm mb-4">
                    Get our comprehensive women technology grants guide with NRC IRAP insights,
                    provincial innovation programs, and AI/ML funding strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-gray-100" asChild>
                    <Link href="/download/women-technology-grants-guide">
                      <Download className="w-4 h-4 mr-2" />
                      Get Tech Funding Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Tech Funding Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with tech funding specialists who understand Canadian innovation programs
                    and can help optimize your technology grant applications.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=women-technology-grants-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-blue-200 text-sm mt-6">
                Expert guidance • Tech innovation funding • AI/ML support • Women technology entrepreneur success
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
