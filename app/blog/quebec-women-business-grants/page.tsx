import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Send, Lightbulb, Heart, Sparkles, Zap, Rocket, MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quebec Women Business Grants 2026 | $720M Francophone Entrepreneur Support Programs",
  description: "Complete guide to Quebec women entrepreneurship support with Réseau des Femmes d'Affaires, Investissement Québec, J. Armand Bombardier grants, and francophone women business funding.",
  keywords: "Quebec women business grants, RFAQ grants, Investissement Quebec women, francophone women entrepreneurs, Quebec women leadership, women business loans Montreal, female entrepreneur grants Quebec City, subventions femmes entrepreneures Québec, financement entreprises féminines",
  openGraph: {
    title: "Quebec Women Business Grants 2026 | $720M Francophone Support",
    description: "Comprehensive guide to Quebec women business support with provincial grants, microfinancing, and francophone entrepreneur programs.",
    url: "https://www.fsidigital.ca/blog/quebec-women-business-grants",
    images: ["/og-image.png"],
  },
}

const faqData = [
  {
    question: "Do I need to be a member of RFAQ to access funding?",
    answer: "While membership in RFAQ (Réseau des Femmes d'Affaires du Québec) is not mandatory for all government grants, it highly recommended. RFAQ opens doors to specific networking opportunities, mentorship, and helps navigate the Quebec funding ecosystem effectively."
  },
  {
    question: "What is the J. Armand Bombardier Excellence Grant?",
    answer: "This is a prestigious specific grant generally valued at $10,000 offered to Quebec women entrepreneurs active in manufacturing, technological innovation, or cultural sectors. It is designed to recognize and support excellence in business management."
  },
  {
    question: "Are there grants for English-speaking women entrepreneurs in Quebec?",
    answer: "Yes. While RFAQ and government services operate primarily in French, organizations like YES Employment + Entrepreneurship offer specific support, workshops, and grant guidance for the English-speaking business community in Quebec."
  },
  {
    question: "Does Investissement Québec offer loans for small women-owned businesses?",
    answer: "Yes, Investissement Québec has specific measures for women entrepreneurs, including easier access to loan guarantees and financing for working capital, often with more flexible conditions than traditional banks."
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

export default function QuebecWomenBusinessGrantsGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🇨🇦 Quebec Women Business Support 2026
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Quebec Women Business Grants & Entrepreneur Support
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Access $720M in Quebec women entrepreneurship support including Réseau des Femmes d'Affaires
                du Québec (RFAQ), Investissement Québec for Women, J. Armand Bombardier Excellence Grants,
                and comprehensive francophone women business programs across the province.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    View Quebec Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/download/quebec-women-business-grants-guide">
                    Get Free Quebec Guide
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
                      <h3 className="text-lg font-bold text-green-800 mb-2">🚀 Quebec Women Entrepreneurship 2026 Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                        <div>
                          <strong>$720M Provincial Support:</strong> Comprehensive francophone women business ecosystem
                        </div>
                        <div>
                          <strong>RFAQ Network:</strong> Provincial women business network and support
                        </div>
                        <div>
                          <strong>Bombardier Grants:</strong> $10,000 excellence grants for women entrepreneurs
                        </div>
                        <div>
                          <strong>Investissement Québec:</strong> Women-focused financing and advisory services
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quebec Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Leading Francophone Women Business Support Ecosystem</h2>
                <p className="text-lg text-gray-600">
                  Quebec provides comprehensive bilingual women entrepreneurship support with $720M in provincial
                  funding, federal grants, francophone business networks, and specialized programs designed to help
                  women entrepreneurs start, grow, and lead businesses across all Quebec regions.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$720M</div>
                  <div className="text-gray-600">Provincial Support</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$10K</div>
                  <div className="text-gray-600">Bombardier Grants</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">RFAQ</div>
                  <div className="text-gray-600">Business Network</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">Bilingual</div>
                  <div className="text-gray-600">French/English</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quebec Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Quebec Women Business Support Programs</h2>

              <div className="space-y-8">
                {/* J. Armand Bombardier Excellence Grants */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">J. Armand Bombardier Excellence Grants</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-blue-800">Excellence Grants for Women Entrepreneurs</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                            <span className="font-semibold">Grant Amount:</span>
                            <span className="text-blue-700 font-bold">$10,000</span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>• Annual recognition for Quebec women entrepreneurs</p>
                            <p>• Three categories: Cultural/Creative, Manufacturing, Technology</p>
                            <p>• Businesses 1-5 years old eligible</p>
                            <p>• 50%+ women ownership required</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Grant Categories</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Janine Bombardier Grant:</strong> Cultural and creative field</p>
                          <p><strong>Claire B. Beaudoin Grant:</strong> Processing and manufacturing</p>
                          <p><strong>Huguette B. Fontaine Grant:</strong> Technological innovation</p>
                          <p><strong>Quebec Focus:</strong> Head office and activities in Quebec</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-semibold mb-2">📋 Application Requirements:</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>CV:</strong> Entrepreneur curriculum vitae</li>
                            <li>• <strong>Organizational Chart:</strong> Company structure</li>
                            <li>• <strong>Financials:</strong> 2 years audited statements</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Projections:</strong> 2-year financial forecasts</li>
                            <li>• <strong>Roadmap:</strong> 18-month action plan</li>
                            <li>• <strong>Video:</strong> 4-minute business presentation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Réseau des Femmes d'Affaires du Québec (RFAQ) */}
                <Card className="border-indigo-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700">Réseau des Femmes d'Affaires du Québec (RFAQ)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-indigo-800">Quebec Business Women's Network</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-indigo-50 p-3 rounded-lg">
                            <span className="font-semibold">Network Type:</span>
                            <span className="text-indigo-700 font-bold">Provincial Women Network</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• Largest francophone women business network</p>
                            <p>• Business development and networking</p>
                            <p>• Leadership development programs</p>
                            <p>• Advocacy for women entrepreneurs</p>
                            <p>• Provincial events and conferences</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">RFAQ Services</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Networking:</strong> Provincial women business connections</p>
                          <p><strong>Training:</strong> Business skills development programs</p>
                          <p><strong>Mentorship:</strong> Experienced entrepreneur guidance</p>
                          <p><strong>Advocacy:</strong> Policy development and representation</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Investissement Québec for Women */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Investissement Québec - Women Entrepreneurs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-green-800">Provincial Financing & Advisory</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                            <span className="font-semibold">Service Type:</span>
                            <span className="text-green-700 font-bold">Financing & Support</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Provincial Crown corporation providing financing solutions, business advisory services,
                              and market development support specifically for Quebec women-owned businesses across all sectors.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">IQ Women Services</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Financing:</strong> Loans and equity investments</p>
                          <p><strong>Advisory:</strong> Business strategy and growth planning</p>
                          <p><strong>Market Development:</strong> Export and expansion support</p>
                          <p><strong>Partnerships:</strong> Strategic business connections</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CDEC de Québec - Inclusive Entrepreneurship */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Heart className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">CDEC de Québec - Inclusive Entrepreneurship Ecosystem</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-purple-800">Federal Funding Initiative</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                            <span className="font-semibold">Funding Amount:</span>
                            <span className="text-purple-700 font-bold">$533,029</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Federal funding for CDEC de Québec to transform the entrepreneurial ecosystem,
                              addressing systemic barriers for women entrepreneurs through awareness, training,
                              and policy development across Quebec.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Program Focus</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Awareness:</strong> Challenges women entrepreneurs face</p>
                          <p><strong>Tools:</strong> Support organization resources</p>
                          <p><strong>Training:</strong> Employee and management development</p>
                          <p><strong>Policy:</strong> Inclusive ecosystem transformation</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Indigenous Women Entrepreneurship Support */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Sparkles className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">Indigenous Women Entrepreneurship Support Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-orange-800">First Nations Women Support</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg">
                            <span className="font-semibold">Grant Amount:</span>
                            <span className="text-orange-700 font-bold">Up to $5,000</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• 75% of professional fees covered</p>
                            <p>• First Nations women in Quebec</p>
                            <p>• Existing or startup business projects</p>
                            <p>• FNQLEDC support services access</p>
                            <p>• $4,000 website development component</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Program Components</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Component 1:</strong> Professional fees up to $5,000/year</p>
                          <p><strong>Component 2:</strong> Website development up to $4,000</p>
                          <p><strong>Eligibility:</strong> Female First Nations members in Quebec</p>
                          <p><strong>Support:</strong> Complementary to existing programs</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Women in Leadership Programs */}
                <Card className="border-pink-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Rocket className="w-6 h-6 text-pink-600 mr-3" />
                      <CardTitle className="text-pink-700">Women in Leadership Development Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-pink-800">Leadership & Governance</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-pink-50 p-3 rounded-lg">
                            <span className="font-semibold">Focus:</span>
                            <span className="text-pink-700 font-bold">Leadership Skills</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Comprehensive programs for women entrepreneurs to develop leadership capabilities,
                              governance expertise, and strategic management skills through training, mentorship,
                              and board placement opportunities.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Leadership Services</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Training:</strong> Executive leadership development</p>
                          <p><strong>Governance:</strong> Board readiness programs</p>
                          <p><strong>Mentorship:</strong> Senior leader connections</p>
                          <p><strong>Networking:</strong> Executive women networks</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Quebec Women Business Support Success Strategies</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Best Practices for Quebec Success</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Leverage RFAQ Network:</strong> Connect with francophone women business community
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Multiple Funding Sources:</strong> Combine Bombardier grants with IQ financing
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Bilingual Applications:</strong> Prepare materials in French and English as needed
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Leadership Development:</strong> Engage with women in leadership programs
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">❌ Common Quebec Application Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Language Barriers:</strong> Not providing French language documentation when required
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Missing Quebec Presence:</strong> Head office not located in Quebec
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Limited Networking:</strong> Not engaging with RFAQ or provincial networks
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Incomplete Video:</strong> Poor quality or missing video presentations for grants
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Official Resources Section */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <ExternalLink className="w-8 h-8 text-blue-700" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Official Quebec Resources</h2>
                  <p className="text-gray-600">Direct links to government and partner verification sources</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-blue-100 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700">Program Applications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Link href="https://www.rfaq.ca/" target="_blank" className="flex items-center text-gray-700 hover:text-blue-600 group">
                      <ExternalLink className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue-500" />
                      Réseau des Femmes d'Affaires du Québec (RFAQ)
                    </Link>
                    <Link href="https://www.investquebec.com/quebec/en/financial-products.html" target="_blank" className="flex items-center text-gray-700 hover:text-blue-600 group">
                      <ExternalLink className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue-500" />
                      Investissement Québec
                    </Link>
                    <Link href="https://www.fondationbombardier.ca/" target="_blank" className="flex items-center text-gray-700 hover:text-blue-600 group">
                      <ExternalLink className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue-500" />
                      Fondation J. Armand Bombardier
                    </Link>
                  </CardContent>
                </Card>
                <Card className="border-blue-100 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700">Support Networks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Link href="https://evolut.ca/" target="_blank" className="flex items-center text-gray-700 hover:text-blue-600 group">
                      <ExternalLink className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue-500" />
                      Evol (Women Entrepreneur Financing)
                    </Link>
                    <Link href="https://www.quebec.ca/entreprises-et-travailleurs-autonomes" target="_blank" className="flex items-center text-gray-700 hover:text-blue-600 group">
                      <ExternalLink className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue-500" />
                      Quebec Government Business Services
                    </Link>
                    <Link href="https://yesmontreal.ca/" target="_blank" className="flex items-center text-gray-700 hover:text-blue-600 group">
                      <ExternalLink className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue-500" />
                      YES Employment + Entrepreneurship
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Quebec Women Business Support?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get our complete Quebec women business support guide with program comparison and bilingual application templates,
                or work with our Quebec funding specialists for expert francophone application support.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Free Quebec Support Guide</h4>
                  <p className="text-blue-100 text-sm mb-4">
                    Get our comprehensive Quebec women business support guide with RFAQ insights,
                    Bombardier grant templates, and Investissement Québec strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-gray-100" asChild>
                    <Link href="/download/quebec-women-business-grants-guide">
                      <Download className="w-4 h-4 mr-2" />
                      Get Quebec Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Quebec Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with bilingual Quebec funding specialists who understand francophone programs
                    and can help optimize your applications for provincial success.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=quebec-women-business-grants-help">
                      Get Quebec Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-blue-200 text-sm mt-6">
                Expert guidance • Bilingual support • Provincial programs • Quebec women entrepreneur success
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
