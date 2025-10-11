import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, Sparkles, Users, MapPin, DollarSign, Target } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Download Free California Tech Grants Guide | $50K CalSEED, $50K SBIR Match, Tax Credits Application Toolkit",
  description: "Get instant access to our California technology startup grants guide with CalSEED application templates, SBIR State Match strategies, California Competes Tax Credit frameworks, and GO-Biz program resources.",
  keywords: "California tech grants guide, CalSEED application templates, SBIR state match California, tax credit application guide",
}

export default function CaliforniaTechGuideDownloadPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                  🌟 Free California Technology Startup Grants Complete Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free California Tech Startup Grants Application Guide & Complete Funding Templates
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive California technology startup grants toolkit covering CalSEED clean energy grants 
                  ($50,000 non-dilutive), SBIR State Match Program ($50,000 federal enhancement), California Competes Tax Credit 
                  (up to 25% income tax reduction), GO-Biz innovation incentives, and Accelerate CA Hub network. Complete application 
                  strategies, proposal templates for Silicon Valley, Bay Area, Los Angeles, San Diego, Sacramento regional programs, 
                  eligibility requirements, submission timelines, and success strategies for cleantech, agtech, biotech, software, 
                  hardware, and AI/ML startups pursuing non-dilutive California state funding complementing federal SBIR/STTR grants, 
                  venture capital, and angel investment supporting California innovation ecosystem leadership, economic competitiveness, 
                  and job creation advancing California technology startup growth statewide.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-blue-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-blue-700 text-2xl">
                      📦 What's Included in Your Free California Tech Grants Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">CalSEED Clean Energy Grant Application Templates</strong>
                          <p className="text-sm text-gray-600">Complete $50,000 CalSEED proposal template, technology description, commercial potential, 10-week program application for cleantech startups</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">SBIR State Match Program Strategy Guide</strong>
                          <p className="text-sm text-gray-600">Step-by-step guide to $50,000 SBIR State Match application for California startups with federal Phase I SBIR/STTR awards NSF DOE NIH DOD NASA USDA</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">California Competes Tax Credit Application Framework</strong>
                          <p className="text-sm text-gray-600">Complete tax credit proposal template demonstrating job creation, capital investment, competitive site selection for technology startups choosing California</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">GO-Biz Innovation Programs Navigation Guide</strong>
                          <p className="text-sm text-gray-600">Comprehensive guide to Governor's Office Business Economic Development programs, permits, incentives coordinating California state support</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Accelerate CA Hub Network Regional Strategy</strong>
                          <p className="text-sm text-gray-600">Framework for engaging Accelerate CA Innovation Hubs across Silicon Valley, Bay Area, Los Angeles, San Diego, Sacramento accessing regional resources</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">California Presence Demonstration Templates</strong>
                          <p className="text-sm text-gray-600">Templates for proving California operations, headquarters, R&D facilities, California employees strengthening grant applications tax credit proposals</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Market Validation and Commercialization Strategy</strong>
                          <p className="text-sm text-gray-600">Framework for demonstrating California customer traction, partnerships, revenue, market validation required for CalSEED, SBIR Match, tax credits</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Technology Sector-Specific Guidance</strong>
                          <p className="text-sm text-gray-600">Specialized strategies for cleantech, agtech, biotech, software, hardware, AI/ML startups with California sector examples and ecosystem partners</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-blue-600 mr-2" />
                        <strong className="text-blue-800">Bonus California Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• California business registration requirements and CalOSBA small business certification process</li>
                        <li>• UC system university partnerships and national laboratory collaboration opportunities Berkeley Lawrence Livermore</li>
                        <li>• Silicon Valley Bay Area ecosystem connections: accelerators, incubators, investor networks, corporate partners</li>
                        <li>• Regional California innovation hub resources: Los Angeles cleantech, San Diego biotech, Sacramento Central Valley agtech</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-gray-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-blue-700 to-purple-900 text-white rounded-t-lg">
                      <CardTitle className="text-2xl flex items-center">
                        <Download className="w-6 h-6 mr-2" />
                        Download Your Free Guide Now
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <form action="/download/california-tech-guide/thank-you" method="GET" className="space-y-4">
                        
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Full Name *
                          </label>
                          <input 
                            type="text" 
                            name="name"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Business Email *
                          </label>
                          <input 
                            type="email" 
                            name="email"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="your.email@startup.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Company Name
                          </label>
                          <input 
                            type="text"
                            name="company"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your California Tech Startup"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            California Location
                          </label>
                          <select 
                            name="location"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select your California region</option>
                            <option value="san-francisco">San Francisco</option>
                            <option value="silicon-valley">Silicon Valley (Palo Alto, San Jose, Sunnyvale)</option>
                            <option value="east-bay">East Bay (Oakland, Berkeley)</option>
                            <option value="peninsula">Peninsula (San Mateo, Menlo Park)</option>
                            <option value="los-angeles">Los Angeles</option>
                            <option value="orange-county">Orange County (Irvine, Santa Ana)</option>
                            <option value="san-diego">San Diego</option>
                            <option value="sacramento">Sacramento</option>
                            <option value="central-valley">Central Valley (Fresno, Bakersfield)</option>
                            <option value="other-ca">Other California Region</option>
                            <option value="planning-ca">Planning to relocate to California</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Technology Sector
                          </label>
                          <select 
                            name="sector"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select primary sector</option>
                            <option value="cleantech">Clean Energy & Cleantech</option>
                            <option value="agtech">Agriculture Technology & AgTech</option>
                            <option value="biotech">Biotechnology & Life Sciences</option>
                            <option value="software">Software & SaaS</option>
                            <option value="hardware">Hardware & Electronics</option>
                            <option value="ai-ml">AI & Machine Learning</option>
                            <option value="fintech">Financial Technology</option>
                            <option value="healthtech">Healthcare Technology</option>
                            <option value="other">Other Technology Sector</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Grant Application Stage
                          </label>
                          <select 
                            name="stage"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select your stage</option>
                            <option value="researching">Researching California Grant Programs</option>
                            <option value="preparing-calseed">Preparing CalSEED Application</option>
                            <option value="sbir-match">Have Federal SBIR - Need State Match</option>
                            <option value="tax-credit">Exploring California Competes Tax Credit</option>
                            <option value="multiple">Applying to Multiple Programs</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Funding Interest
                          </label>
                          <select 
                            name="funding"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select primary interest</option>
                            <option value="calseed">CalSEED Clean Energy Grants ($50K)</option>
                            <option value="sbir-match">SBIR State Match ($50K)</option>
                            <option value="tax-credit">California Competes Tax Credit</option>
                            <option value="go-biz">GO-Biz Innovation Programs</option>
                            <option value="all">All California Programs</option>
                          </select>
                        </div>

                        <div className="flex items-start pt-2">
                          <input 
                            type="checkbox" 
                            id="consent"
                            name="consent"
                            required 
                            className="mt-1 mr-3"
                          />
                          <label htmlFor="consent" className="text-xs text-gray-600">
                            I agree to receive the California tech grants guide and occasional California state funding opportunities 
                            and innovation programs. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-blue-700 to-purple-900 hover:from-blue-800 hover:to-purple-950 text-white font-semibold py-4 text-lg"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Get Instant Access to California Tech Guide
                        </Button>

                        <p className="text-xs text-center text-gray-500 mt-4">
                          🔒 Your information is 100% secure. We never share your details.
                        </p>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Trust Indicators */}
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">$50K</div>
                      <div className="text-xs text-gray-600">CalSEED Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">$50K</div>
                      <div className="text-xs text-gray-600">SBIR Match</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">25%</div>
                      <div className="text-xs text-gray-600">Tax Credit</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why California Technology Startups Choose Our Grant Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete California Coverage</h4>
                    <p className="text-sm text-gray-600">
                      From Silicon Valley to San Diego with strategies for all California regions and innovation hubs statewide
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Regional Ecosystem Expertise</h4>
                    <p className="text-sm text-gray-600">
                      Understand Bay Area cleantech, LA entertainment tech, San Diego biotech, Central Valley agtech ecosystems
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Multi-Program Strategy</h4>
                    <p className="text-sm text-gray-600">
                      Learn how to stack CalSEED, SBIR Match, tax credits maximizing total California funding for startups
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about California tech grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/california-tech-programs">
                      Read Complete California Tech Guide
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/usa/technology-startup-grants">
                      Explore All Tech Startup Grants
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
