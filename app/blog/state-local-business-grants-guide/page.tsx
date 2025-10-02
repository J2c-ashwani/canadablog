import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Clock, DollarSign, Target, CheckCircle, AlertCircle, MapPin, Users, Building2 } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "State & Local Business Grants Guide 2025 | Regional Economic Development Funding",
  description: "Complete guide to state and local business grants. Find economic development incentives, job creation programs, and regional funding up to $500K.",
  keywords: "state business grants, local business grants, economic development grants, state funding programs, regional business incentives",
  openGraph: {
    title: "State & Local Business Grants Guide 2025",
    description: "Complete guide to state and local business grants with regional funding opportunities.",
    url: "https://grantfinder.pro/blog/state-local-business-grants-guide",
  },
}

export default function StateLocalBusinessGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-600 to-red-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                📍 State & Local Programs
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                State & Local Business Grants Guide
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                Complete guide to state and local business grants. Access regional economic development funding, 
                job creation incentives, and location-based programs to grow your business locally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-orange-700 hover:bg-gray-100">
                  Start Reading Guide
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/guides/apply-federal-grants">
                    Get State Grant Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">50</div>
                <div className="text-gray-600">States with Programs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">$500K</div>
                <div className="text-gray-600">Maximum Grant Awards</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">3000+</div>
                <div className="text-gray-600">Local Development Programs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">$15B</div>
                <div className="text-gray-600">Annual State Business Incentives</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* What are State & Local Grants */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What are State & Local Business Grants?</h2>
                
                <p className="text-lg text-gray-700 mb-6">
                  State and local business grants are funding programs offered by state governments, counties, cities, 
                  and regional development organizations to promote economic growth, job creation, and business development 
                  in their communities. These programs often complement federal funding with location-specific benefits.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card className="border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-orange-700">State-Level Programs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Economic development incentives</li>
                        <li>• Job creation tax credits</li>
                        <li>• Industry-specific grants</li>
                        <li>• Export assistance programs</li>
                        <li>• Innovation & technology funds</li>
                        <li>• Rural development initiatives</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-700">Local Programs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Municipal business grants</li>
                        <li>• Downtown revitalization funds</li>
                        <li>• Small business loan programs</li>
                        <li>• Property tax abatements</li>
                        <li>• Facade improvement grants</li>
                        <li>• Microenterprise assistance</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Top State Business Grant Programs */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Top State Business Grant Programs</h2>
                
                <div className="space-y-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                        <CardTitle className="text-blue-700">California - CalCompetes Tax Credit</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Award:</strong> Up to $20M</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Focus:</strong> Job Creation</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Type:</strong> Tax Credit</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        California's premier economic development program providing tax credits to businesses 
                        that create jobs and make investments in the state.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">Eligible Activities:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Business expansion</li>
                            <li>• Facility relocation to California</li>
                            <li>• Staying in California vs. moving</li>
                            <li>• New job creation</li>
                            <li>• Capital investment</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">Requirements:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Create net new jobs</li>
                            <li>• Make capital investment</li>
                            <li>• Multi-year commitment</li>
                            <li>• Competitive application process</li>
                            <li>• Performance-based awards</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Building2 className="w-6 h-6 text-green-600 mr-3" />
                        <CardTitle className="text-green-700">Texas - Enterprise Fund</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Award:</strong> Up to $5M</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Focus:</strong> Job Creation & Investment</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Type:</strong> Grant/Loan</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        Texas' "deal closing" fund designed to attract and retain large-scale business 
                        projects that create significant economic impact.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">Project Types:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Large-scale expansions</li>
                            <li>• Business relocations to Texas</li>
                            <li>• Manufacturing facilities</li>
                            <li>• Corporate headquarters</li>
                            <li>• Research & development centers</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">Minimum Requirements:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• 75+ new permanent jobs</li>
                            <li>• $1M+ capital investment</li>
                            <li>• Wages above regional average</li>
                            <li>• 5-year commitment</li>
                            <li>• Economic impact analysis</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Target className="w-6 h-6 text-purple-600 mr-3" />
                        <CardTitle className="text-purple-700">New York - Excelsior Jobs Program</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Credit:</strong> Up to 6.85%</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Duration:</strong> 10 years</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Type:</strong> Tax Credit</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        New York's flagship tax incentive program for businesses creating jobs and making 
                        investments in targeted industries.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">Targeted Industries:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Manufacturing</li>
                            <li>• Software development</li>
                            <li>• Back office operations</li>
                            <li>• Financial services</li>
                            <li>• Distribution centers</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">Benefits:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Job creation tax credit</li>
                            <li>• Investment tax credit</li>
                            <li>• Research & development credit</li>
                            <li>• Real property tax credit</li>
                            <li>• Sales tax exemptions</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Local & Municipal Programs */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Local & Municipal Business Programs</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-orange-700">City-Level Programs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-orange-50 rounded">
                          <strong>Small Business Grants</strong>
                          <p className="text-sm text-gray-600">Direct grants for local business development</p>
                          <span className="text-sm font-medium text-orange-600">$1K - $50K</span>
                        </div>
                        
                        <div className="p-3 bg-red-50 rounded">
                          <strong>Facade Improvement Programs</strong>
                          <p className="text-sm text-gray-600">Grants for storefront and building improvements</p>
                          <span className="text-sm font-medium text-red-600">$2K - $25K</span>
                        </div>
                        
                        <div className="p-3 bg-purple-50 rounded">
                          <strong>Downtown Revitalization</strong>
                          <p className="text-sm text-gray-600">Programs to revive downtown business districts</p>
                          <span className="text-sm font-medium text-purple-600">$5K - $100K</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Economic Development Incentives</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-green-50 rounded">
                          <strong>Tax Increment Financing (TIF)</strong>
                          <p className="text-sm text-gray-600">Property tax incentives for development</p>
                          <span className="text-sm font-medium text-green-600">Varies</span>
                        </div>
                        
                        <div className="p-3 bg-blue-50 rounded">
                          <strong>Property Tax Abatements</strong>
                          <p className="text-sm text-gray-600">Reduced property taxes for qualifying businesses</p>
                          <span className="text-sm font-medium text-blue-600">5-10 years</span>
                        </div>
                        
                        <div className="p-3 bg-teal-50 rounded">
                          <strong>Infrastructure Improvements</strong>
                          <p className="text-sm text-gray-600">Public investment in business-supporting infrastructure</p>
                          <span className="text-sm font-medium text-teal-600">In-kind</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* How to Find State & Local Programs */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Find State & Local Programs</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">State Websites</h4>
                    <p className="text-sm text-gray-600">
                      Check your state's economic development department website
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Local EDCs</h4>
                    <p className="text-sm text-gray-600">
                      Contact local Economic Development Corporations
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">SBDCs</h4>
                    <p className="text-sm text-gray-600">
                      Work with Small Business Development Centers
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">4</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Chambers</h4>
                    <p className="text-sm text-gray-600">
                      Connect with local Chambers of Commerce
                    </p>
                  </div>
                </div>
              </div>

              {/* Application Tips */}
              <div className="bg-blue-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">State & Local Grant Application Tips</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Success Strategies</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Emphasize local economic impact</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Highlight job creation and retention</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Show community involvement</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Build relationships with local officials</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-orange-700">🎯 Key Considerations</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                        <span>Understand local priorities and initiatives</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                        <span>Align with economic development goals</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                        <span>Consider combining multiple programs</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                        <span>Plan for long-term community presence</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* State Resources Directory */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">State Economic Development Resources</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">Major State Programs:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• California: CalCompetes, Innovation Hub Program</li>
                      <li>• Texas: Enterprise Fund, Skills Development Fund</li>
                      <li>• New York: Excelsior, START-UP NY</li>
                      <li>• Florida: Quick Action Closing Fund</li>
                      <li>• Ohio: JobsOhio, R&D Investment Tax Credit</li>
                      <li>• Illinois: EDGE Tax Credit, Manufacturing Machinery</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">Regional Organizations:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Appalachian Regional Commission</li>
                      <li>• Delta Regional Authority</li>
                      <li>• Northern Border Regional Commission</li>
                      <li>• Southeast Crescent Regional Commission</li>
                      <li>• Southwest Border Regional Commission</li>
                      <li>• State Rural Development Councils</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-orange-600 to-red-700 rounded-lg p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Find State & Local Grants?</h3>
                <p className="text-orange-100 mb-6 text-lg">
                  Get our comprehensive guide to state and local business grants with program directory, 
                  application strategies, and local resource contacts.
                </p>
                <Button size="lg" className="bg-white text-orange-700 hover:bg-gray-100" asChild>
                  <Link href="/guides/apply-federal-grants">
                    Get State Grant Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
