import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertTriangle, Download, Shield, Globe, TrendingUp, Zap, Award, Rocket } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for EDC Women in Trade Export Financing 2025 | Complete Application Guide",
  description: "Step-by-step guide to applying for EDC Women in Trade export financing and equity capital. Learn eligibility, application process, and winning strategies for international markets.",
  keywords: "EDC Women in Trade application guide, export financing application, equity capital women exporters, international trade financing guide",
  openGraph: {
    title: "How to Apply for EDC Women in Trade Export Financing 2025",
    description: "Complete guide to EDC export financing applications with step-by-step process and international market strategies.",
    url: "https://grantfinder.pro/guides/edc-women-trade-export-financing-guide",
  },
}

export default function EDCWomenInTradeApplicationGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌍 EDC Export Financing Application Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for EDC Women in Trade Export Financing
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Complete step-by-step guide to applying for EDC Women in Trade export financing and equity capital. 
                Learn the application process, export readiness strategies, and how to secure international market 
                financing and equity investments from Export Development Canada.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
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
                  <div className="text-3xl font-bold text-purple-600 mb-2">Global</div>
                  <div className="text-gray-600">Market Access</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* EDC Application Overview */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">EDC Women in Trade Application Process</h2>
                
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Globe className="w-8 h-8 text-teal-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-teal-800 mb-2">Export Finance Partner</h4>
                      <p className="text-teal-700">
                        EDC Women in Trade addresses the critical gap in export financing for women entrepreneurs. 
                        With only 11% of women-owned SMEs active in international markets, EDC provides equity capital, 
                        export financing, and comprehensive market development support to help women go global.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Export Readiness</h4>
                      <p className="text-sm text-gray-600">
                        Assess international market potential and export capability
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Connect with EDC</h4>
                      <p className="text-sm text-gray-600">
                        Contact EDC Women in Trade team for consultation
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Submit Application</h4>
                      <p className="text-sm text-gray-600">
                        Apply for export financing or equity investment
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Receive Support</h4>
                      <p className="text-sm text-gray-600">
                        Financing approval and market development assistance
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eligibility Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">EDC Women in Trade Eligibility Requirements</h2>
                
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Business Owner & Export Eligibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Fund:</strong> $50M Equity</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Focus:</strong> Export Markets</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-teal-600 mr-2" />
                        <span><strong>Type:</strong> Equity Capital</span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Business Requirements:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Women-owned or women-led business</li>
                          <li>• Canadian incorporated company</li>
                          <li>• Export-ready or actively exporting</li>
                          <li>• Significant export growth potential</li>
                          <li>• Strong commercial viability</li>
                          <li>• Competitive in global markets</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Priority Groups:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Diverse women entrepreneurs</li>
                          <li>• Commercialization-stage businesses</li>
                          <li>• Growth-stage export companies</li>
                          <li>• New export market entrants</li>
                          <li>• Women-led innovative exporters</li>
                          <li>• International expansion focus</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* EDC Financing Programs */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">EDC Women in Trade Financing Programs</h2>
                
                <div className="space-y-6">
                  {[
                    {
                      title: "Inclusive Trade Investments Program",
                      icon: <Globe className="w-6 h-6 text-teal-600" />,
                      color: "teal",
                      description: "$50M equity fund for women-owned export businesses with direct investments and VC fund participation",
                      features: ["Direct equity investments", "$50M total allocation", "VC fund investments", "Export-ready companies"]
                    },
                    {
                      title: "Export Financing Solutions",
                      icon: <Rocket className="w-6 h-6 text-green-600" />,
                      color: "green",
                      description: "Comprehensive export working capital, trade credit insurance, and international payment solutions",
                      features: ["Export working capital", "Trade credit insurance", "Foreign exchange management", "Supply chain financing"]
                    },
                    {
                      title: "Export Market Development",
                      icon: <Target className="w-6 h-6 text-blue-600" />,
                      color: "blue",
                      description: "International market research, buyer connections, trade missions, and export strategy support",
                      features: ["Market research", "Buyer matching", "Trade missions", "Export strategy"]
                    },
                    {
                      title: "BWIT Network Resources",
                      icon: <Users className="w-6 h-6 text-purple-600" />,
                      color: "purple",
                      description: "Business Women in International Trade network providing training, missions, and CanExport funding access",
                      features: ["Women trade missions", "CanExport funding", "Export training", "Global networks"]
                    }
                  ].map((program, index) => (
                    <Card key={index} className={`border-${program.color}-200`}>
                      <CardHeader>
                        <CardTitle className={`text-${program.color}-700 flex items-center`}>
                          {program.icon}
                          <span className="ml-2">{program.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{program.description}</p>
                        <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                          {program.features.map((feature, i) => (
                            <div key={i} className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Export Readiness Assessment */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Export Readiness Assessment</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-teal-200">
                    <CardHeader>
                      <CardTitle className="text-teal-700">Export Readiness Factors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-teal-50 rounded">
                          <div>
                            <strong>Product/Service Fit</strong>
                            <p className="text-sm text-gray-600">Competitive in international markets</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-teal-50 rounded">
                          <div>
                            <strong>Market Research</strong>
                            <p className="text-sm text-gray-600">Target market analysis and validation</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-teal-50 rounded">
                          <div>
                            <strong>Export Capacity</strong>
                            <p className="text-sm text-gray-600">Ability to fulfill international orders</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-teal-50 rounded">
                          <div>
                            <strong>Financial Readiness</strong>
                            <p className="text-sm text-gray-600">Cash flow and working capital capacity</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Export Strategy Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Target Markets</strong>
                            <p className="text-sm text-gray-600">Focus on specific countries with demand validation</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Distribution Strategy</strong>
                            <p className="text-sm text-gray-600">Clear plan for international sales channels</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Risk Mitigation</strong>
                            <p className="text-sm text-gray-600">Understanding of trade and payment risks</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Growth Plan</strong>
                            <p className="text-sm text-gray-600">Scalable model for international expansion</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Application Components */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">EDC Application Components</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-teal-200">
                    <CardHeader>
                      <CardTitle className="text-teal-700">📊 Export Business Components</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-teal-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Export Strategy</strong>
                            <p className="text-sm text-gray-600">Target markets and entry approach</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-teal-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Market Analysis</strong>
                            <p className="text-sm text-gray-600">International demand and competition research</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-teal-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Export Financials</strong>
                            <p className="text-sm text-gray-600">Export revenue projections and cash flow</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-teal-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Risk Assessment</strong>
                            <p className="text-sm text-gray-600">Trade risks and mitigation strategies</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">📋 Company Components</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Company Profile</strong>
                            <p className="text-sm text-gray-600">Business history, capabilities, and track record</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Financial Statements</strong>
                            <p className="text-sm text-gray-600">Historical financials and current position</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Management Team</strong>
                            <p className="text-sm text-gray-600">Leadership experience and export expertise</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Export Contracts</strong>
                            <p className="text-sm text-gray-600">International agreements and buyer commitments</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Success Strategies */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">EDC Application Success Strategies</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Winning Strategies</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Strong export strategy with validated international market demand</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Demonstrated export readiness and capability to compete globally</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Detailed market research with country-specific analysis and entry plans</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Clear growth potential with scalable international business model</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Pitfalls</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Weak export plan without sufficient international market research</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Limited export experience with no track record or readiness demonstration</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Unrealistic export projections without market validation or buyer commitments</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Poor risk assessment without understanding international trade complexities</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official EDC Resources</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-teal-200">
                    <CardHeader>
                      <CardTitle className="text-teal-700">EDC Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">EDC Women in Trade</h5>
                          <p className="text-sm text-gray-600">Official program website</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.edc.ca/en/campaign/women-in-trade.html" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">BWIT Network</h5>
                          <p className="text-sm text-gray-600">Business Women in International Trade</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.tradecommissioner.gc.ca/en/our-solutions/exporters-diverse-backgrounds.html" target="_blank" rel="noopener noreferrer">
                            Learn More <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Contact EDC</h5>
                          <p className="text-sm text-gray-600">Connect with EDC team</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.edc.ca/en/contact-us.html" target="_blank" rel="noopener noreferrer">
                            Contact <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Professional Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">EDC Assessment</h5>
                          <p className="text-sm text-gray-600">Free export readiness review</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=edc-assessment">
                            Get Assessment <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Export Strategy</h5>
                          <p className="text-sm text-gray-600">International market entry planning</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=export-strategy-help">
                            Get Help <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Application Support</h5>
                          <p className="text-sm text-gray-600">Professional EDC application help</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=edc-women-trade-export-financing-help">
                            Get Support <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Lead Magnet CTA */}
              <div className="bg-gradient-to-r from-teal-600 to-green-800 rounded-lg p-8 text-white text-center mb-8">
                <Download className="w-16 h-16 mx-auto mb-4 text-teal-100" />
                <h3 className="text-2xl font-bold mb-4">Get Your Free EDC Export Financing Kit</h3>
                <p className="text-teal-100 mb-6 text-lg">
                  Download our comprehensive EDC Women in Trade guide with export market entry templates, 
                  financing comparison, and international expansion strategies.
                </p>
                <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=edc-women-trade-export-financing-help">
                    <Download className="w-5 h-5 mr-2" />
                    Request Export Guide
                  </Link>
                </Button>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-green-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for EDC Export Financing?</h3>
                <p className="text-green-100 mb-6 text-lg">
                  Our export financing specialists understand EDC Women in Trade and can help assess 
                  export readiness, develop international strategies, and optimize financing applications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 font-semibold shadow-lg" asChild>
                    <Link href="/contact?service=edc-women-trade-export-financing-help">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" className="bg-green-700 text-white hover:bg-green-800 font-semibold shadow-lg border-2 border-white" asChild>
                    <Link href="/contact?service=edc-assessment">
                      Free Export Assessment
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
