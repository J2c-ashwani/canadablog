import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Send, Lightbulb, Heart, Sparkles, Zap, Rocket, Globe, TrendingUp as Growth } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "EDC Women in Trade Export Financing 2025 | Equity Capital & Export Support for Women Exporters",
  description: "Complete guide to EDC Women in Trade with export financing, equity capital investments, and international market support from Export Development Canada for women-owned businesses.",
  keywords: "EDC Women in Trade, export financing women, equity capital women exporters, international trade financing, EDC Inclusive Trade Investments",
  openGraph: {
    title: "EDC Women in Trade Export Financing 2025 | Equity Capital for Women Exporters",
    description: "Comprehensive export financing and equity capital for women-owned businesses targeting international markets through Export Development Canada.",
    url: "https://grantfinder.pro/blog/edc-women-trade-export-financing",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function EDCWomenInTradeGuidePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌍 EDC Women in Trade 2025
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                EDC Women in Trade Export Financing
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Export financing and equity capital investments for women-owned businesses targeting 
                international markets and global expansion. Access the Inclusive Trade Investments Program, 
                export market development support, and equity funding from Export Development Canada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100" asChild>
                  <Link href="#eligibility">
                    Check EDC Eligibility
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/download/edc-women-trade-export-financing-guide">
                    Get Free EDC Export Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced 2025 Program Updates */}
        <section className="py-8 bg-green-50 border-b-2 border-green-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <TrendingUp className="w-6 h-6 text-green-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-green-800 mb-2">🚀 EDC Women in Trade 2025 Program Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                        <div>
                          <strong>$50M Equity Fund:</strong> Direct investments in women-owned export businesses
                        </div>
                        <div>
                          <strong>Export Financing:</strong> Comprehensive financing for international market entry
                        </div>
                        <div>
                          <strong>Equity Capital:</strong> Patient capital for diverse women-led export ventures
                        </div>
                        <div>
                          <strong>Market Support:</strong> Export development and international expansion assistance
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* EDC Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Canada's Export Finance Partner for Women Entrepreneurs</h2>
                <p className="text-lg text-gray-600">
                  EDC Women in Trade addresses the critical gap in export financing for women-owned businesses. 
                  With only 11% of women-owned SMEs active in international markets, EDC provides equity capital, 
                  export financing, and market development support to help women entrepreneurs go global.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">$50M</div>
                  <div className="text-gray-600">Equity Capital Fund</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">Export</div>
                  <div className="text-gray-600">International Focus</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Equity</div>
                  <div className="text-gray-600">Capital Investments</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">Global</div>
                  <div className="text-gray-600">Market Access</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EDC Financing Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">EDC Women in Trade Financing Solutions</h2>
              
              <div className="space-y-8">
                {/* Inclusive Trade Investments Program */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Globe className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">Inclusive Trade Investments Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-teal-800">$50M Women in Trade Fund</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-teal-50 p-3 rounded-lg">
                            <span className="font-semibold">Investment Type:</span>
                            <span className="text-teal-700 font-bold">Direct Equity Capital</span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>• Direct equity investments in women-owned export businesses</p>
                            <p>• Investments in VC funds committed to gender diversity</p>
                            <p>• Focus on export-ready and exporting companies</p>
                            <p>• Patient capital for commercialization stage</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Investment Focus</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Target Companies:</strong> Women-owned businesses with export potential</p>
                          <p><strong>Investment Stage:</strong> Commercialization and growth phases</p>
                          <p><strong>Export Readiness:</strong> Companies ready for international markets</p>
                          <p><strong>Diversity Focus:</strong> Diverse women entrepreneurs prioritized</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-teal-50 rounded-lg">
                      <h5 className="font-semibold mb-2">📋 Investment Coverage:</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Direct Investments:</strong> Equity in export-focused businesses</li>
                            <li>• <strong>VC Fund Investments:</strong> Gender-diverse fund managers</li>
                            <li>• <strong>Export Development:</strong> Market entry and expansion</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Commercialization:</strong> Product-to-market funding</li>
                            <li>• <strong>Scale-Up Capital:</strong> Growth-stage financing</li>
                            <li>• <strong>International Expansion:</strong> Global market access</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Export Financing Solutions */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Rocket className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Export Financing Solutions</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-green-800">Export Working Capital</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                            <span className="font-semibold">Financing Type:</span>
                            <span className="text-green-700 font-bold">Export Loans & Credit</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• Working capital for export contracts</p>
                            <p>• Pre-shipment and post-shipment financing</p>
                            <p>• Export credit insurance and guarantees</p>
                            <p>• Foreign exchange risk management</p>
                            <p>• Supply chain financing solutions</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Export Support Services</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Risk Management:</strong> Political and credit risk protection</p>
                          <p><strong>Market Intel:</strong> International market research and insights</p>
                          <p><strong>Trade Connections:</strong> Global buyer and partner network</p>
                          <p><strong>Export Training:</strong> International business development support</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Market Development Support */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Target className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Export Market Development Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-blue-800">International Market Entry</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                            <span className="font-semibold">Support Type:</span>
                            <span className="text-blue-700 font-bold">Market Development</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Comprehensive support for women entrepreneurs entering international markets, 
                            including market research, trade missions, buyer connections, and export strategy development.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Market Development Services</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Trade Missions:</strong> Women-focused international delegations</p>
                          <p><strong>Market Research:</strong> Country and sector-specific insights</p>
                          <p><strong>Buyer Matching:</strong> International customer connections</p>
                          <p><strong>Export Strategy:</strong> Market entry planning and execution</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* BWIT Partnership */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Business Women in International Trade (BWIT)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-purple-800">BWIT Network & Resources</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                            <span className="font-semibold">Network Type:</span>
                            <span className="text-purple-700 font-bold">Women Exporters</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Part of Trade Commissioner Service providing women-focused trade missions, 
                            CanExport funding access, export training, and international business networks.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">BWIT Benefits</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Trade Missions:</strong> Women-only international delegations</p>
                          <p><strong>CanExport Funding:</strong> Export development financial support</p>
                          <p><strong>Export Training:</strong> Step-by-step export guidance</p>
                          <p><strong>Global Networks:</strong> Women business associations worldwide</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Requirements */}
        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">EDC Women in Trade Eligibility</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Business Eligibility */}
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Business Owner Eligibility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">✅ Essential Requirements</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Women-owned or women-led business</li>
                          <li>• Canadian incorporated company</li>
                          <li>• Export-ready or actively exporting</li>
                          <li>• Significant export growth potential</li>
                          <li>• Strong commercial viability</li>
                          <li>• Competitive product/service in global markets</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-2">🎯 Priority Groups</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Diverse women entrepreneurs</li>
                          <li>• Commercialization-stage businesses</li>
                          <li>• Growth-stage export companies</li>
                          <li>• Businesses entering new export markets</li>
                          <li>• Women-led innovative exporters</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Export Use Cases */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Export Financing Uses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-2">✅ Eligible Uses</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Export working capital and cash flow</li>
                          <li>• International market entry and expansion</li>
                          <li>• Export contract fulfillment</li>
                          <li>• Foreign buyer credit support</li>
                          <li>• Supply chain and logistics financing</li>
                          <li>• Export product development</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-purple-700 mb-2">💡 Strategic Priorities</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Commercialization-stage equity needs</li>
                          <li>• International market diversification</li>
                          <li>• Export capacity building</li>
                          <li>• Global competitiveness enhancement</li>
                          <li>• Trade risk mitigation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">EDC Application Process</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Export Readiness",
                      description: "Assess export readiness and international market potential",
                      icon: <Target className="w-6 h-6" />,
                      color: "teal"
                    },
                    {
                      step: "2", 
                      title: "Connect with EDC",
                      description: "Contact EDC Women in Trade team for consultation",
                      icon: <Users className="w-6 h-6" />,
                      color: "green"
                    },
                    {
                      step: "3",
                      title: "Application Submission",
                      description: "Submit financing or equity investment application",
                      icon: <Send className="w-6 h-6" />,
                      color: "blue"
                    },
                    {
                      step: "4",
                      title: "Approval & Support",
                      description: "Financing approval and export market development",
                      icon: <Globe className="w-6 h-6" />,
                      color: "purple"
                    }
                  ].map((item, index) => {
                    const colors = {
                      teal: "bg-teal-500 text-white",
                      green: "bg-green-500 text-white", 
                      blue: "bg-blue-500 text-white",
                      purple: "bg-purple-500 text-white"
                    }
                    
                    return (
                      <Card key={index} className="text-center">
                        <CardHeader>
                          <div className={`w-12 h-12 rounded-full ${colors[item.color as keyof typeof colors]} flex items-center justify-center mx-auto mb-3`}>
                            {item.icon}
                          </div>
                          <CardTitle className="text-lg">Step {item.step}: {item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <Card className="border-teal-200 bg-teal-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <AlertCircle className="w-6 h-6 text-teal-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-bold text-teal-800 mb-2">📅 EDC Application Timeline</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-teal-700">
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>Initial Consultation:</strong> 1-2 weeks EDC contact</li>
                              <li>• <strong>Application Prep:</strong> 2-4 weeks documentation</li>
                              <li>• <strong>Review Process:</strong> 4-8 weeks for decision</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>Funding/Investment:</strong> 2-4 weeks after approval</li>
                              <li>• <strong>Export Support:</strong> Ongoing market development</li>
                              <li>• <strong>BWIT Access:</strong> Immediate trade mission opportunities</li>
                            </ul>
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
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">EDC Application Success Strategies</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Best Practices for EDC Success</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Strong Export Strategy:</strong> Clear international market focus and expansion plan
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Export Readiness:</strong> Demonstrated capability to compete in global markets
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Market Research:</strong> Detailed analysis of target international markets
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Growth Potential:</strong> Scalable business model with export revenue projections
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">❌ Common EDC Application Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Weak Export Plan:</strong> Insufficient international market research or strategy
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Limited Export Experience:</strong> No export track record or readiness demonstration
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Unrealistic Projections:</strong> Overly optimistic export revenue without market validation
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Poor Risk Assessment:</strong> Inadequate understanding of international trade risks
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
        <section className="py-20 bg-gradient-to-r from-teal-600 to-green-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access EDC Women in Trade Financing?
              </h2>
              <p className="text-xl text-teal-100 mb-8">
                Get our complete EDC export financing guide with market entry strategies and equity investment frameworks, 
                or work with our export financing specialists for expert application support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Free EDC Export Guide</h4>
                  <p className="text-teal-100 text-sm mb-4">
                    Get our comprehensive EDC Women in Trade guide with export financing options, 
                    market entry templates, and equity investment insights.
                  </p>
                  <Button size="lg" className="w-full bg-white text-teal-700 hover:bg-gray-100" asChild>
                    <Link href="/download/edc-women-trade-export-financing-guide">
                      <Download className="w-4 h-4 mr-2" />
                      Get EDC Export Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert EDC Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with export financing specialists who understand EDC and can help optimize 
                    your export strategy and financing applications.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=edc-women-trade-export-financing-help">
                      Get EDC Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-teal-200 text-sm mt-6">
                Expert guidance • Export strategy • International market access • Equity capital success
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
