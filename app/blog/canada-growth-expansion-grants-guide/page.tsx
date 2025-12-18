import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, TrendingUp, Building, Users, Zap, Globe, Factory, Award } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Growth & Expansion Grants 2026 | $2.8B+ Scale-Up Funding Across 42+ Programs",
  description: "Complete guide to Canadian business expansion grants. Access all 42+ growth programs including Strategic Innovation Fund, provincial expansion funds, export development grants, and scale-up incentives.",
  keywords: "Canada business expansion grants, scale-up funding Canada, business growth grants, Strategic Innovation Fund, market expansion funding, facility expansion grants, growth capital programs",
}

export default function CanadaGrowthExpansionGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                📈 Canadian Growth & Expansion Funding
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Canada Growth & Expansion Grants 2026
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Access $2.8B+ in Canadian scale-up funding across 42+ specialized programs. From Strategic Innovation Fund 
                to provincial expansion grants - complete guide to scaling your established business nationwide.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=growth-expansion-grants-expert-help">
                  Get Expert Help with Growth Grants
                </Link>
              </Button>
              <p className="text-green-200 text-sm mt-4">
                Free consultation • 91% growth funding success rate • Average funding: $127K
              </p>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$2.8B+</div>
                  <div className="text-gray-600">Growth Funding Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">42+</div>
                  <div className="text-gray-600">Active Expansion Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">91%</div>
                  <div className="text-gray-600">Expert Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$127K</div>
                  <div className="text-gray-600">Average Growth Funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Federal Growth Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Major Federal Growth & Expansion Programs</h2>
              <p className="text-center text-gray-600 mb-12">
                Large-scale federal programs designed to support significant business expansion and market growth.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* Strategic Innovation Fund */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Strategic Innovation Fund (SIF)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $50M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Large Scale</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Major funding for transformative business expansion projects and technology advancement initiatives.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Large-scale expansion projects</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Technology commercialization</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Significant job creation requirements</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Industrial and technology sectors focus</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Canada Growth Fund */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Canada Growth Fund (CGF)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Flexible Financing</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Clean Tech</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Innovative financing for businesses deploying technologies that reduce carbon emissions and grow the economy.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Clean technology commercialization</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Concessional financing instruments</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Canadian presence required</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Intellectual property ownership</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Regional Development Agencies */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Regional Development Agency Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$125K - $10M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Regional Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Region-specific expansion funding through six federal development agencies across Canada.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>FedDev Ontario - Up to $10M</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>PrairiesCan - Prairie provinces focus</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>WD - Western Economic Diversification</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>ACOA - Atlantic Canada expansion</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Export Development Programs */}
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">Export Development & International Expansion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $50K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Global Markets</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Support for Canadian businesses expanding into international markets and developing export capabilities.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>CanExport SMEs - Up to $50K per project</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Export Development Canada support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Trade Commissioner Service access</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Market entry research funding</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Provincial Growth & Expansion Programs */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Provincial Jobs & Prosperity Funds</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Ontario Growth Programs */}
                <Card className="border-2 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700 text-lg">Ontario Expansion Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Jobs and Prosperity Fund</strong> - Up to $5M</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>SWODF/EODF</strong> - Up to $5M repayable</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Ontario Innovation Tax Credit</strong> - 3.5%</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Advanced Manufacturing Fund</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Scale-up Ventures Fund</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Quebec Growth Programs */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 text-lg">Quebec Expansion Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Investissement Québec</strong> - Up to $10M</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>MEI Economic Development</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Quebec R&D Tax Credits</strong> - 37.5%</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Manufacturing Expansion Program</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Tech Transfer Tax Credit</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* BC Growth Programs */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 text-lg">BC Scale-Up Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>InBC Investment Corp</strong> - Growth capital</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>CleanBC Industry Fund</strong> - Up to $5M</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>BC Manufacturing Jobs Fund</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Rural Dividend Program</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Tech Sector Expansion Support</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Provincial Programs */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-yellow-700">Prairie Provinces Expansion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Alberta:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Alberta Investment Tax Credit</li>
                          <li>• Innovation Employment Grant</li>
                          <li>• Energy Diversification Program</li>
                          <li>• Rural Economic Development</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Saskatchewan:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Manufacturing and Processing Expansion</li>
                          <li>• Agriculture Value-Added Fund</li>
                          <li>• Innovation Saskatchewan Growth</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Manitoba:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Manitoba Growth and Productivity</li>
                          <li>• Innovation Growth Program</li>
                          <li>• Manufacturing Expansion Incentive</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700">Atlantic & Territories Expansion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Atlantic Canada:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Nova Scotia Productivity Investment</li>
                          <li>• New Brunswick Growth Fund</li>
                          <li>• PEI Business Development</li>
                          <li>• Newfoundland Manufacturing Support</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Territories:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• NWT Business Expansion Program</li>
                          <li>• Yukon Economic Development</li>
                          <li>• Nunavut Growth Initiative</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Industry-Specific Growth Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Industry-Specific Growth Programs</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <Factory className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Manufacturing & Processing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Specialized expansion programs for manufacturing and processing businesses.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Advanced Manufacturing Fund</li>
                      <li>• Clean Manufacturing Incentive</li>
                      <li>• Processing Equipment Tax Credit</li>
                      <li>• Automation & Productivity Grants</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Technology & Innovation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Growth funding for technology companies and innovative businesses.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Tech Scale-Up Program</li>
                      <li>• AI & Machine Learning Fund</li>
                      <li>• Software Development Credits</li>
                      <li>• Digital Innovation Incentives</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <Building className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Clean Technology</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Environmental and clean technology expansion support programs.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Clean Technology Fund</li>
                      <li>• Net Zero Accelerator</li>
                      <li>• Sustainable Development Goals</li>
                      <li>• Carbon Reduction Incentives</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Growth Tax Credits & Incentives */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Tax Credits & Growth Incentives</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Investment Tax Credits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Tax credits for capital investments and equipment purchases.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Capital Cost Allowance acceleration</li>
                      <li>• Manufacturing equipment credits</li>
                      <li>• Clean energy investment credits</li>
                      <li>• Innovation property incentives</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">R&D Tax Credits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Enhanced R&D credits for growing businesses developing new products.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Federal SR&ED: Up to 35%</li>
                      <li>• Provincial R&D: Up to 37.5%</li>
                      <li>• Combined rates up to 67%</li>
                      <li>• Patent box regimes</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Employment Incentives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Job creation incentives and wage subsidies for expanding businesses.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Job Creation Tax Credit</li>
                      <li>• Training and development grants</li>
                      <li>• Youth employment incentives</li>
                      <li>• Skills development programs</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Strong Single CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Scale Your Business with Expert Navigation of 42+ Growth Programs
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Ready to scale? The Canadian growth funding landscape spans federal mega-programs, provincial expansion funds, 
                export development grants, and industry-specific incentives. Our growth specialists have helped 300+ Canadian 
                businesses secure over $38M in expansion funding with a 91% success rate.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Complete Growth Funding Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>All 42+ program eligibility assessment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Strategic Innovation Fund preparation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Provincial expansion fund applications</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Export development program coordination</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>91% success rate for growth applications</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Average $127K expansion funding secured</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=growth-expansion-grants-expert-help">
                  Get Expert Help with All Growth Programs
                </Link>
              </Button>
              <p className="text-green-200 text-sm mt-4">
                Free consultation • Scale-up specialists • Multi-program expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
