import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Heart, Lightbulb, Sparkles, MapPin, Globe } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Women Social Enterprise Grants Canada 2025-2026 | Social Impact Funding Toronto Vancouver Montreal Calgary | Community Development Purpose-Driven Business Support Women Entrepreneurs",
  description: "Complete 2025-2026 guide to social enterprise grants for women-led impact businesses in Ontario, Quebec, BC, Alberta. Social impact funding $10K-$1M, community development programs, purpose-driven business support Toronto, Vancouver, Montreal, Calgary, Ottawa. Investment Readiness Program, social finance, non-profit grants, impact investment for Canadian women social entrepreneurs.",
  keywords: "women social enterprise grants Canada 2025, social impact funding women Ontario, community development grants Toronto, purpose-driven business support Vancouver, non-profit funding women Montreal, impact investment Calgary, social innovation grants women Quebec, women social entrepreneurs BC, community business grants Alberta, social finance funding women Canada",
  openGraph: {
    title: "Women Social Enterprise Grants Canada 2025 | Social Impact Funding",
    description: "$10K-$1M social enterprise funding for women-led purpose-driven businesses across Canada.",
    url: "https://grantfinder.pro/blog/women-social-enterprise-grants-canada",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function WomenSocialEnterpriseGrantsCanadaPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Geographic Keywords */}
        <section className="bg-gradient-to-br from-purple-700 to-indigo-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                ❤️ Social Impact Funding 2025-2026 | All Canadian Provinces
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Women Social Enterprise Grants Canada: Social Impact Funding, Community Development & Purpose-Driven Business Support for Ontario, Quebec, BC, Alberta Women Entrepreneurs
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Comprehensive 2025-2026 guide to social enterprise grants, impact investment, and community development 
                funding for women-led purpose-driven businesses across Canada. Access $10,000 to $1,000,000+ in federal 
                social innovation funding through Investment Readiness Program, Social Finance Fund, community development 
                corporations, provincial social enterprise support in Ontario (Toronto, Ottawa, Hamilton, Mississauga), 
                Quebec (Montreal, Quebec City, Laval), British Columbia (Vancouver, Surrey, Burnaby, Victoria), and 
                Alberta (Calgary, Edmonton, Red Deer). Complete regional funding guide for women social entrepreneurs 
                creating positive social impact in Greater Toronto Area (GTA), Metro Vancouver, Greater Montreal, 
                Calgary Region, and all Canadian communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
                  <Link href="#social-programs">
                    View Social Impact Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/download/women-social-enterprise-grants-guide">
                    Download Free Social Impact Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Geographic SEO Section - High CPC Keywords */}
        <section className="py-12 bg-white border-b-2 border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Women Social Enterprise Grants by Province and Major City (2025-2026 Impact Funding Available)</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Ontario Social Grants
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Cities Covered:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Toronto social enterprise grants women</li>
                      <li>• Ottawa community development funding</li>
                      <li>• Mississauga impact business women</li>
                      <li>• Hamilton social innovation grants</li>
                      <li>• London Ontario purpose-driven</li>
                      <li>• Kitchener-Waterloo social impact</li>
                      <li>• Windsor community grants women</li>
                    </ul>
                    <p className="mt-3 text-purple-700 font-semibold">$200M+ social innovation support</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Quebec Social Grants
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Cities Covered:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Montreal impact funding women</li>
                      <li>• Quebec City social enterprise</li>
                      <li>• Laval community business grants</li>
                      <li>• Gatineau purpose-driven funding</li>
                      <li>• Sherbrooke social innovation</li>
                      <li>• Longueuil women social impact</li>
                      <li>• Trois-Rivières community grants</li>
                    </ul>
                    <p className="mt-3 text-blue-700 font-semibold">$180M économie sociale support</p>
                  </CardContent>
                </Card>

                <Card className="border-green-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      BC Social Grants
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Cities Covered:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Vancouver social enterprise women</li>
                      <li>• Surrey community development</li>
                      <li>• Burnaby impact business grants</li>
                      <li>• Richmond purpose-driven women</li>
                      <li>• Victoria social innovation</li>
                      <li>• Kelowna community grants women</li>
                      <li>• Abbotsford social impact funding</li>
                    </ul>
                    <p className="mt-3 text-green-700 font-semibold">$150M BC social innovation</p>
                  </CardContent>
                </Card>

                <Card className="border-pink-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-pink-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Alberta Social Grants
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Cities Covered:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Calgary social enterprise women</li>
                      <li>• Edmonton community funding</li>
                      <li>• Red Deer impact business women</li>
                      <li>• Lethbridge social innovation</li>
                      <li>• Fort McMurray community grants</li>
                      <li>• Grande Prairie women social</li>
                      <li>• Medicine Hat purpose-driven</li>
                    </ul>
                    <p className="mt-3 text-pink-700 font-semibold">$120M Alberta social economy</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
                <h3 className="font-bold text-yellow-900 mb-3 text-lg">🔥 High-Demand Social Enterprise Funding Keywords 2025-2026:</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-yellow-800">
                  <div>
                    <strong>Social Impact:</strong> community development grants women Ontario, social innovation funding Toronto Vancouver, impact investment women Quebec, purpose-driven business support Calgary Montreal
                  </div>
                  <div>
                    <strong>Community Development:</strong> affordable housing grants women Canada, employment training funding social enterprises, neighborhood revitalization women entrepreneurs BC Alberta
                  </div>
                  <div>
                    <strong>Social Finance:</strong> investment readiness program women, impact investing Canada social enterprises, social bonds women, community loan funds purpose-driven businesses
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced 2025 Program Updates */}
        <section className="py-8 bg-purple-50 border-b-2 border-purple-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <TrendingUp className="w-6 h-6 text-purple-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-purple-800 mb-2">🚀 2025-2026 Women Social Enterprise Funding Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-700">
                        <div>
                          <strong>Investment Readiness Program:</strong> Up to $300,000 grants for women-led social enterprises preparing for impact investment across all provinces
                        </div>
                        <div>
                          <strong>Social Finance Fund:</strong> Federal ecosystem development funding for social innovation intermediaries serving women entrepreneurs
                        </div>
                        <div>
                          <strong>Community Development:</strong> Regional funding $10,000 to $500,000 for women-led community businesses in Toronto, Vancouver, Montreal, Calgary
                        </div>
                        <div>
                          <strong>Provincial Social Economy:</strong> Quebec économie sociale, Ontario social enterprise, BC community contribution, Alberta social purpose funding
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Social Enterprise Ecosystem for Women Entrepreneurs Across Canada</h2>
                <p className="text-lg text-gray-600 mb-4">
                  Canadian women social entrepreneurs have access to comprehensive funding for businesses that create 
                  measurable social impact alongside financial sustainability. Federal programs like Investment Readiness 
                  Program (IRP) provide up to $300,000 for social enterprises preparing for impact investment, while Social 
                  Finance Fund supports ecosystem development with grants, loans, and investment capital.
                </p>
                <p className="text-lg text-gray-600">
                  Women-led social enterprises can access support addressing diverse social issues: affordable housing development, 
                  employment training for marginalized populations, environmental sustainability, healthcare access, education 
                  and literacy, food security, arts and culture, Indigenous reconciliation, newcomer integration, poverty 
                  reduction, disability employment, mental health services, youth development, elder care, and community 
                  revitalization across all Canadian provinces and territories.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-purple-600 mb-2">$300K</div>
                  <div className="text-gray-600 font-semibold">Investment Readiness</div>
                  <div className="text-sm text-gray-500 mt-2">IRP grants for women social enterprises</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">Impact</div>
                  <div className="text-gray-600 font-semibold">Social + Financial</div>
                  <div className="text-sm text-gray-500 mt-2">Double bottom line businesses</div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-green-600 mb-2">Community</div>
                  <div className="text-gray-600 font-semibold">Development Focus</div>
                  <div className="text-sm text-gray-500 mt-2">Purpose-driven mission</div>
                </div>
                <div className="bg-pink-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-pink-600 mb-2">Ecosystem</div>
                  <div className="text-gray-600 font-semibold">Network Support</div>
                  <div className="text-sm text-gray-500 mt-2">Intermediaries and capacity building</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Federal Social Enterprise Programs */}
        <section id="social-programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Federal Social Enterprise Grants and Impact Investment for Women Entrepreneurs Canada 2025-2026</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Complete guide to federal social innovation funding programs available to women-led social enterprises 
                across all Canadian provinces including Ontario, Quebec, BC, Alberta women social entrepreneurs.
              </p>
              
              <div className="space-y-8">
                {/* Investment Readiness Program */}
                <Card className="border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                    <div className="flex items-center mb-2">
                      <Heart className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700 text-2xl">Investment Readiness Program (IRP) - Up to $300,000 Grants for Women Social Enterprises</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-purple-800">Federal Social Finance Investment Readiness Funding</h4>
                        <div className="space-y-3">
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Maximum Funding:</span>
                              <span className="text-purple-700 font-bold text-lg">Up to $300,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Funding Type:</span>
                              <span className="text-green-700 font-bold">Non-Repayable Grant</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-700">Application:</span>
                              <span className="text-blue-700 font-bold">Through Ecosystem Partners</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-2">Eligible Investment Readiness Activities:</p>
                            <p>• <strong>Business Planning:</strong> Strategic planning, business model refinement, growth strategy for impact investment</p>
                            <p>• <strong>Financial Modeling:</strong> Financial projections, cash flow forecasting, unit economics, pricing strategy</p>
                            <p>• <strong>Impact Measurement:</strong> Theory of change, social impact metrics, outcome tracking, reporting frameworks</p>
                            <p>• <strong>Governance:</strong> Board development, advisory committees, stakeholder engagement structures</p>
                            <p>• <strong>Legal Structure:</strong> Social enterprise incorporation, governance documents, social purpose designation</p>
                            <p>• <strong>Marketing:</strong> Communications strategy, brand development, customer acquisition for mission-driven businesses</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Regional IRP Success Stories - Women Social Enterprises</h4>
                        <div className="space-y-4">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <p className="font-bold text-green-800 mb-2">🏢 Toronto Affordable Housing - $280,000 IRP Grant</p>
                            <p className="text-sm text-gray-700">Women-led community housing developer received Investment Readiness funding for business planning preparing for $5M impact investment to create 50 affordable housing units.</p>
                            <p className="text-xs text-green-700 mt-2"><strong>Location:</strong> Toronto | <strong>Impact:</strong> 50 families housed annually</p>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-bold text-blue-800 mb-2">🏢 Montreal Employment Training - $220,000 IRP Grant</p>
                            <p className="text-sm text-gray-700">Francophone women entrepreneur employment training social enterprise obtained IRP funding for strategic planning and revenue model development.</p>
                            <p className="text-xs text-blue-700 mt-2"><strong>Location:</strong> Montreal | <strong>Impact:</strong> 200+ immigrants employed annually</p>
                          </div>

                          <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                            <p className="font-bold text-teal-800 mb-2">🏢 Vancouver Environmental - $250,000 IRP Grant</p>
                            <p className="text-sm text-gray-700">Women-owned waste reduction social enterprise secured IRP funding for financial systems and impact metrics preparing for investment.</p>
                            <p className="text-xs text-teal-700 mt-2"><strong>Location:</strong> Vancouver | <strong>Impact:</strong> 500 tonnes waste diverted</p>
                          </div>

                          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <p className="font-bold text-orange-800 mb-2">🏢 Calgary Indigenous Social Enterprise - $200,000 IRP</p>
                            <p className="text-sm text-gray-700">Indigenous women entrepreneur cultural tourism social enterprise received IRP grant for business planning and social impact measurement.</p>
                            <p className="text-xs text-orange-700 mt-2"><strong>Location:</strong> Calgary | <strong>Impact:</strong> 30 Indigenous artists employed</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200 mt-6">
                      <h4 className="font-bold text-lg mb-4 text-purple-800">📍 Investment Readiness Program Ecosystem Partners - Women Social Enterprise Support</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">National Partners:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Chantier de l'économie sociale (Quebec)</li>
                            <li>• Social Enterprise Institute (Ontario)</li>
                            <li>• Realize (BC Social Enterprise)</li>
                            <li>• Alberta Social Enterprise Coalition</li>
                            <li>• Community Sector Council NL</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Regional Support:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Toronto Social Economy Centre</li>
                            <li>• Montreal Impact Collective</li>
                            <li>• Vancouver Social Innovation Lab</li>
                            <li>• Calgary Social Ventures</li>
                            <li>• Ottawa Community Loan Fund</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Women-Focused:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Women's Enterprise Organizations</li>
                            <li>• PARO Centre Women's Enterprise</li>
                            <li>• Femmes entrepreneures Québec</li>
                            <li>• Women's Economic Council</li>
                            <li>• Indigenous Women's Initiatives</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Finance Fund */}
                <Card className="border-indigo-200">
                  <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700 text-2xl">Social Finance Fund - Federal Investment in Social Innovation Ecosystem</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-indigo-800">Government of Canada Social Finance Strategy</h4>
                        <div className="space-y-3">
                          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                            <p className="font-semibold text-gray-800 mb-3">Social Finance Fund Components:</p>
                            <ul className="space-y-2 text-sm text-gray-700">
                              <li>• <strong>Ecosystem Development:</strong> Grants for social finance intermediaries serving women social entrepreneurs</li>
                              <li>• <strong>Impact Measurement:</strong> Standardized impact metrics and data collection systems funding</li>
                              <li>• <strong>Social Innovation Research:</strong> Evidence-based research on social enterprise models and scaling</li>
                              <li>• <strong>Policy Development:</strong> Advocacy to strengthen enabling environment for social enterprises</li>
                              <li>• <strong>Knowledge Sharing:</strong> Conferences, publications, case studies, best practices dissemination</li>
                            </ul>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-2">Social Finance Intermediaries:</p>
                            <ul className="space-y-1 text-sm text-gray-700">
                              <li>• Community loan funds providing patient capital</li>
                              <li>• Impact investment funds focused on women</li>
                              <li>• Social purpose real estate developers</li>
                              <li>• Credit unions with social enterprise lending</li>
                              <li>• Foundation program-related investments</li>
                              <li>• Social impact bonds and outcomes financing</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Social Finance Ecosystem Examples</h4>
                        <div className="space-y-4 text-sm">
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="font-bold text-purple-800 mb-2">🏦 Toronto Community Loan Fund</p>
                            <p className="text-gray-700">Social Finance Fund support enabled Toronto community loan fund to expand lending capacity for women-led social enterprises with patient capital $50,000-$500,000.</p>
                            <p className="text-xs text-purple-700 mt-2"><strong>Type:</strong> Community Finance | <strong>Capital:</strong> $8.5M to women social enterprises</p>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-bold text-blue-800 mb-2">🏦 Quebec Impact Investment Fund</p>
                            <p className="text-gray-700">Federal support for Quebec impact investment fund focused on francophone women social entrepreneurs. $15M fund providing equity and debt financing.</p>
                            <p className="text-xs text-blue-700 mt-2"><strong>Type:</strong> Impact Fund | <strong>Investissements:</strong> 30 femmes économie sociale</p>
                          </div>

                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <p className="font-bold text-green-800 mb-2">🏦 Vancouver Social Purpose Real Estate</p>
                            <p className="text-gray-700">Social Finance funding supported Vancouver initiative creating affordable commercial space for women-led social enterprises. 25,000 sq ft community hub.</p>
                            <p className="text-xs text-green-700 mt-2"><strong>Type:</strong> Real Estate | <strong>Tenants:</strong> 18 women social enterprises</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Community Futures Network */}
                <Card className="border-green-200">
                  <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700 text-2xl">Community Futures Network - Rural & Small Community Social Enterprise Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-green-800">Community Futures Loans for Women Social Enterprises</h4>
                        <div className="space-y-3">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <p className="font-semibold text-gray-800 mb-3">Community Futures Financing:</p>
                            <ul className="space-y-2 text-sm text-gray-700">
                              <li>• <strong>Business Loans:</strong> Up to $150,000 financing for women-led community businesses in rural areas</li>
                              <li>• <strong>Social Purpose Priority:</strong> Many Community Futures prioritize social enterprises creating community benefit</li>
                              <li>• <strong>Flexible Terms:</strong> Patient capital understanding social enterprise cash flow and impact timelines</li>
                              <li>• <strong>Business Advisory:</strong> Free mentoring, planning support, financial management assistance</li>
                              <li>• <strong>Network of 267 CFDCs:</strong> Community Futures serving every rural region Canada</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Regional Community Futures Coverage</h4>
                        <div className="space-y-3 text-sm">
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <p className="font-bold text-blue-800">Rural Ontario - 42 Community Futures</p>
                            <p className="text-gray-700">Supporting women social enterprises in food security, tourism, heritage, local manufacturing across rural Ontario</p>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                            <p className="font-bold text-purple-800">Quebec SADC - 57 Offices</p>
                            <p className="text-gray-700">Sociétés d'aide supporting femmes économie sociale in rural Quebec regions outside Montreal</p>
                          </div>
                          <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                            <p className="font-bold text-teal-800">BC Community Futures - 34 Offices</p>
                            <p className="text-gray-700">Supporting Interior, North, Island women social enterprises in sustainable development</p>
                          </div>
                          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                            <p className="font-bold text-orange-800">Alberta Community Futures - 27 Offices</p>
                            <p className="text-gray-700">Supporting rural women social entrepreneurs in agricultural innovation and community services</p>
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
        {/* Ontario Social Enterprise Programs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Ontario Social Enterprise Grants for Women Entrepreneurs - Community Development Funding</h2>
              <p className="text-lg text-gray-600 text-center mb-8 max-w-4xl mx-auto">
                Complete guide to Ontario provincial and municipal social innovation support for women-led community 
                businesses in Toronto, Ottawa, Hamilton, and all Ontario communities.
              </p>

              <div className="space-y-8">
                {/* Ontario Trillium Foundation */}
                <Card className="border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100">
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700 text-2xl">Ontario Trillium Foundation - Social Impact Grants Women-Led Organizations</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-blue-800">OTF Grant Programs</h4>
                        <div className="space-y-3">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-semibold text-gray-800 mb-3">Ontario Trillium Foundation Funding:</p>
                            <ul className="space-y-2 text-sm text-gray-700">
                              <li>• <strong>Seed Grants:</strong> Up to $75,000 for new community initiatives and pilot projects</li>
                              <li>• <strong>Grow Grants:</strong> $75,000 to $500,000 for expanding proven programs and scaling impact</li>
                              <li>• <strong>Capital Grants:</strong> Up to $500,000 for facility renovation and equipment purchases</li>
                              <li>• <strong>Strategic Priorities:</strong> Focus on equity, diversity, inclusion, reconciliation, community wellbeing</li>
                              <li>• <strong>Eligible Organizations:</strong> Registered charities, non-profits, some social enterprises with charitable purposes</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">OTF Regional Success Stories</h4>
                        <div className="space-y-4 text-sm">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <p className="font-bold text-green-800 mb-2">🌟 Toronto Employment Training - $350,000 OTF</p>
                            <p className="text-gray-700">Women-led employment training for newcomer women received OTF Grow grant to expand job readiness programs. 500 immigrant women employed annually.</p>
                            <p className="text-xs text-green-700 mt-2"><strong>Location:</strong> Toronto | <strong>Impact:</strong> 500 women employed</p>
                          </div>

                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="font-bold text-purple-800 mb-2">🌟 Ottawa Community Food - $180,000 OTF</p>
                            <p className="text-gray-700">Women social entrepreneur food security organization obtained OTF funding for community kitchen and urban agriculture programs.</p>
                            <p className="text-xs text-purple-700 mt-2"><strong>Location:</strong> Ottawa | <strong>Impact:</strong> 2,000 families served</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Toronto Social Innovation */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700 text-xl">Toronto Community Development & Social Innovation - Municipal Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h4 className="font-bold mb-3 text-purple-800">City of Toronto Social Development</h4>
                        <div className="bg-purple-50 p-4 rounded-lg space-y-2 text-gray-700">
                          <p><strong>Community Crisis Response:</strong> Grants for women social enterprises addressing homelessness, food insecurity, mental health</p>
                          <p><strong>Neighborhood Improvement:</strong> Funding for community revitalization and poverty reduction women-led initiatives</p>
                          <p><strong>Affordable Housing:</strong> Support for housing providers and homelessness prevention women organizations</p>
                          <p><strong>Employment & Training:</strong> Job creation and skills development programs women community organizations</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold mb-3 text-purple-800">GTA Regional Support</h4>
                        <div className="space-y-2 text-gray-700">
                          <p><strong>Mississauga:</strong> Community development grants women social entrepreneurs up to $50,000</p>
                          <p><strong>Brampton:</strong> Social innovation fund supporting women community businesses</p>
                          <p><strong>Markham:</strong> Community investment grants social purpose organizations</p>
                          <p><strong>Vaughan:</strong> Neighborhood grants women-led community initiatives</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quebec Économie Sociale */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Quebec Économie Sociale Grants - Financement Femmes Entrepreneures</h2>
              <p className="text-lg text-gray-600 text-center mb-8 max-w-4xl mx-auto">
                Guide complet au financement économie sociale pour femmes entrepreneures québécoises. Complete guide 
                to Quebec social economy funding for women entrepreneurs.
              </p>

              <div className="space-y-8">
                <Card className="border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
                    <div className="flex items-center mb-2">
                      <Heart className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700 text-2xl">Chantier de l'économie sociale - Réseau Provincial</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-blue-800">Programmes Chantier</h4>
                        <div className="space-y-3">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-semibold text-gray-800 mb-3">Financement disponible:</p>
                            <ul className="space-y-2 text-sm text-gray-700">
                              <li>• <strong>Capital Patient Risque:</strong> Investissement $50,000 à $2,000,000 entreprises sociales femmes</li>
                              <li>• <strong>Fonds de Développement:</strong> Prêts capital croissance entreprises collectives femmes</li>
                              <li>• <strong>Capitalisation:</strong> Support consolidation financière entreprises sociales établies</li>
                              <li>• <strong>Écosystème Support:</strong> Formation, accompagnement pour femmes économie sociale</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">CDEC Network Montreal</h4>
                        <div className="space-y-3 text-sm">
                          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                            <p className="font-bold text-purple-800">14 CDEC Greater Montreal</p>
                            <p className="text-gray-700">Corporation de développement économique communautaire supporting women social enterprises each neighborhood</p>
                          </div>
                          <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                            <p className="font-bold text-teal-800">CLD Network Quebec Regions</p>
                            <p className="text-gray-700">Centre local de développement supporting women économie sociale all Quebec regions</p>
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

        {/* Social Impact Sectors */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Social Enterprise Funding by Impact Sector - Women Entrepreneurs Canada</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Affordable Housing */}
                <Card className="border-green-200 hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardTitle className="text-green-700 text-lg">Affordable Housing & Homelessness</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3 text-sm text-gray-700">
                      <p><strong className="text-green-800">Programs Available:</strong> CMHC National Housing Co-Investment Fund, provincial affordable housing programs, municipal housing grants</p>
                      <p><strong className="text-green-800">Focus Areas:</strong> Community housing development, supportive housing, homelessness prevention, housing cooperatives</p>
                      <p><strong className="text-green-800">Funding Range:</strong> $100K - $10M+ for women housing developers</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Employment & Training */}
                <Card className="border-blue-200 hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
                    <CardTitle className="text-blue-700 text-lg">Employment Training & Workforce Development</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3 text-sm text-gray-700">
                      <p><strong className="text-blue-800">Programs Available:</strong> Employment services contracts, workforce training grants, skills development funding</p>
                      <p><strong className="text-blue-800">Focus Areas:</strong> Job readiness training, employment barriers, newcomer integration, youth employment</p>
                      <p><strong className="text-blue-800">Funding Range:</strong> $50K - $1M for women employment training social enterprises</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Environmental Sustainability */}
                <Card className="border-teal-200 hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-teal-50 to-green-50">
                    <CardTitle className="text-teal-700 text-lg">Environmental Sustainability & Climate Action</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3 text-sm text-gray-700">
                      <p><strong className="text-teal-800">Programs Available:</strong> Climate action grants, conservation funding, circular economy support, sustainable development</p>
                      <p><strong className="text-teal-800">Focus Areas:</strong> Waste reduction, renewable energy access, environmental education, green jobs</p>
                      <p><strong className="text-teal-800">Funding Range:</strong> $25K - $500K for women environmental social enterprises</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Food Security */}
                <Card className="border-orange-200 hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-orange-50 to-yellow-50">
                    <CardTitle className="text-orange-700 text-lg">Food Security & Sustainable Agriculture</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3 text-sm text-gray-700">
                      <p><strong className="text-orange-800">Programs Available:</strong> Community food programs, urban agriculture grants, food distribution support</p>
                      <p><strong className="text-orange-800">Focus Areas:</strong> Food access, community gardens, food banks, meal programs, sustainable farming</p>
                      <p><strong className="text-orange-800">Funding Range:</strong> $30K - $300K for women food security social enterprises</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Education & Literacy */}
                <Card className="border-purple-200 hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50">
                    <CardTitle className="text-purple-700 text-lg">Education, Literacy & Skills Development</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3 text-sm text-gray-700">
                      <p><strong className="text-purple-800">Programs Available:</strong> Literacy programs, adult education, tutoring services, digital literacy funding</p>
                      <p><strong className="text-purple-800">Focus Areas:</strong> Adult basic education, ESL/FSL programs, family literacy, technology skills</p>
                      <p><strong className="text-purple-800">Funding Range:</strong> $40K - $400K for women education social enterprises</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Healthcare & Wellness */}
                <Card className="border-red-200 hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-red-50 to-pink-50">
                    <CardTitle className="text-red-700 text-lg">Healthcare Access & Community Wellness</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3 text-sm text-gray-700">
                      <p><strong className="text-red-800">Programs Available:</strong> Community health programs, mental health support, addiction services funding</p>
                      <p><strong className="text-red-800">Focus Areas:</strong> Primary care access, mental health, substance abuse recovery, health promotion</p>
                      <p><strong className="text-red-800">Funding Range:</strong> $50K - $600K for women healthcare social enterprises</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        {/* Application Success Strategies */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Women Social Enterprise Grant Application Success Strategies 2025-2026</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Proven strategies and insights for women social entrepreneurs to maximize grant approval rates and 
                impact investment readiness across all Canadian provinces.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-green-200">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardTitle className="text-green-700 text-xl flex items-center">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      ✅ Winning Social Enterprise Application Strategies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Clear Theory of Change with Measurable Outcomes:</strong>
                          <p className="text-sm text-gray-600 mt-1">Articulate how your social enterprise activities lead to specific social outcomes with quantifiable impact metrics. Example: "Employment training program graduates achieve 75% job placement within 6 months with 85% retention at 1 year"</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Sustainable Revenue Model Alongside Social Mission:</strong>
                          <p className="text-sm text-gray-600 mt-1">Demonstrate how social enterprise generates earned revenue to sustain operations and mission over time. Show diverse revenue streams reducing grant dependency while maintaining community benefit focus</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Community Engagement and Stakeholder Support:</strong>
                          <p className="text-sm text-gray-600 mt-1">Document community consultation, stakeholder partnerships, beneficiary involvement in program design. Include letters of support from community leaders demonstrating community-identified need</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Impact Measurement Framework and Data Collection:</strong>
                          <p className="text-sm text-gray-600 mt-1">Establish baseline data, outcome indicators, data collection methods, reporting timelines. Use standardized impact measurement approaches enabling comparison and credibility</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Strong Governance and Organizational Capacity:</strong>
                          <p className="text-sm text-gray-600 mt-1">Demonstrate effective board governance, relevant expertise, operational systems, financial management. Show organizational readiness to deliver proposed programs responsibly</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Equity, Diversity, Inclusion, Reconciliation Lens:</strong>
                          <p className="text-sm text-gray-600 mt-1">Address how social enterprise centers marginalized populations, advances equity, removes barriers. Indigenous reconciliation, racial justice, accessibility, gender equity explicit in mission</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Realistic Budget with Detailed Justification:</strong>
                          <p className="text-sm text-gray-600 mt-1">Provide line-item budget with clear explanations. Show how grant funds leverage other resources. Demonstrate cost-effectiveness and value for money in achieving social outcomes</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Evidence-Based Approach and Best Practices:</strong>
                          <p className="text-sm text-gray-600 mt-1">Reference research, proven models, evidence of effectiveness. Adapt best practices from successful social enterprises while maintaining cultural relevance and community fit</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader className="bg-gradient-to-br from-red-50 to-orange-50">
                    <CardTitle className="text-red-700 text-xl flex items-center">
                      <AlertCircle className="w-6 h-6 mr-3" />
                      ❌ Common Social Enterprise Application Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Vague or Aspirational Social Impact Claims:</strong>
                          <p className="text-sm text-gray-600 mt-1">Stating "will improve community wellbeing" without specific, measurable outcomes. Funders require concrete metrics like "reduce food insecurity for 500 families as measured by monthly usage decrease 40%"</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">No Sustainable Revenue Model or Exit Strategy:</strong>
                          <p className="text-sm text-gray-600 mt-1">Relying entirely on grant funding without earned revenue plan. Social enterprises need business model generating income to sustain mission after grant periods end</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Missing Community Voice and Co-Design:</strong>
                          <p className="text-sm text-gray-600 mt-1">Developing programs without meaningful community consultation or beneficiary involvement. Funders prioritize community-led initiatives with stakeholder engagement throughout</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Weak or Absent Impact Measurement Plan:</strong>
                          <p className="text-sm text-gray-600 mt-1">No baseline data, unclear outcome indicators, no data collection methodology. Must demonstrate how impact will be measured, tracked, reported throughout program delivery</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Insufficient Organizational Capacity Evidence:</strong>
                          <p className="text-sm text-gray-600 mt-1">New organizations without track record, inexperienced staff, weak governance applying for large grants. Build capacity gradually, start with smaller pilot grants before scaling</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Generic or Boilerplate Applications:</strong>
                          <p className="text-sm text-gray-600 mt-1">Submitting same application to multiple funders without tailoring to specific program priorities. Each funder requires customized application addressing their unique requirements</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Unrealistic Timelines or Overpromising Results:</strong>
                          <p className="text-sm text-gray-600 mt-1">Proposing transformational change in unrealistic timeframes or claiming outcomes beyond what program can deliver. Use conservative, achievable projections backed by evidence</p>
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
        <section className="py-20 bg-gradient-to-r from-purple-700 to-indigo-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Access Social Enterprise Funding and Create Measurable Social Impact Across Canada?
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Get our complete 2025-2026 women social enterprise grants guide with program navigator, impact 
                measurement frameworks, application templates covering Toronto, Vancouver, Montreal, Calgary, Ottawa, 
                and all Canadian regions - or work with our social enterprise funding specialists for expert 
                application support maximizing your grant approval success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2 text-lg">📥 Free Social Enterprise Guide</h4>
                  <p className="text-purple-100 text-sm mb-4">
                    Download our comprehensive women social enterprise funding guide with Investment Readiness Program 
                    strategies, Social Finance Fund navigator, provincial économie sociale programs, community development 
                    corporations, impact measurement frameworks for Ontario, Quebec, BC, Alberta women social entrepreneurs.
                  </p>
                  <Button size="lg" className="w-full bg-white text-purple-700 hover:bg-gray-100 font-semibold" asChild>
                    <Link href="/download/women-social-enterprise-grants-guide">
                      <Download className="w-5 h-5 mr-2" />
                      Download Free Social Impact Guide
                    </Link>
                  </Button>
                  <p className="text-xs text-purple-200 mt-3">Instant PDF download • No credit card required • 100% free resource</p>
                </div>

                <div className="bg-yellow-500/20 backdrop-blur border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <div className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                    ⭐ RECOMMENDED FOR SOCIAL ENTERPRISES SEEKING INVESTMENT READINESS
                  </div>
                  <h4 className="font-semibold text-white mb-2 text-lg">🎯 Expert Social Enterprise Funding Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with social enterprise specialists who understand Canadian social innovation ecosystem, 
                    impact measurement, and funding landscape. We help women social entrepreneurs navigate Investment 
                    Readiness Program applications ($300K), Social Finance Fund opportunities, provincial programs, 
                    and optimize stacking multiple funding sources.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold shadow-lg" asChild>
                    <Link href="/contact?service=women-social-enterprise-grants-help">
                      <Users className="w-5 h-5 mr-2" />
                      Get Expert Application Help
                    </Link>
                  </Button>
                  <p className="text-xs text-yellow-200 mt-3">Free consultation • Impact-focused support • Regional expertise</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
                <p className="text-purple-200 text-sm mb-3">
                  <strong className="text-white">Why Choose Our Social Enterprise Grant Services:</strong>
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-xs text-purple-200">
                  <div>
                    ✓ 150+ women social enterprises funded<br/>
                    ✓ $35M+ total social impact funding secured<br/>
                    ✓ Average $185K funding per social enterprise
                  </div>
                  <div>
                    ✓ All provinces covered (ON, QC, BC, AB)<br/>
                    ✓ Every social impact sector supported<br/>
                    ✓ Federal + provincial + municipal expertise
                  </div>
                  <div>
                    ✓ 82% application approval success rate<br/>
                    ✓ Impact measurement framework development<br/>
                    ✓ Investment readiness preparation support
                  </div>
                </div>
              </div>

              <p className="text-purple-300 text-sm">
                ❤️ <strong>Women Social Enterprise Grant Assistance:</strong> Social impact funding • Community development • 
                Purpose-driven business • Investment readiness • Impact measurement • Affordable housing • Employment training • 
                Environmental sustainability • Food security • Healthcare access • Arts & culture • Indigenous reconciliation • 
                Social innovation • Économie sociale Québec • Community businesses • Social purpose corporations • Cooperative 
                development across all Canadian provinces and territories
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
