import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, Sparkles, Users, MapPin, DollarSign, Target } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Download Free USDA SBIR AgTech Guide | Phase I $125K, Phase II $575K Application Toolkit",
  description: "Get instant access to our USDA SBIR/STTR AgTech grants guide with Phase I/II proposal templates, farmer benefit strategies, on-farm testing frameworks, and application resources.",
  keywords: "USDA SBIR guide, AgTech grants guide, precision farming SBIR templates, USDA application resources",
}

export default function USDASBIRAgTechDownloadPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
                  🌾 Free USDA SBIR/STTR AgTech Grants Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free USDA SBIR AgTech Grants Application Guide & Proposal Templates
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive USDA SBIR/STTR AgTech grants toolkit covering Phase I ($125,000) and Phase II 
                  ($575,000) application strategies, technical proposal templates for precision farming, food safety, 
                  sustainable agriculture, and rural innovation, farmer benefit demonstration frameworks, on-farm testing 
                  validation, distribution partnership strategies, eligibility requirements, submission timelines, and success 
                  strategies for AgTech startups pursuing non-dilutive federal agricultural innovation funding through USDA 
                  National Institute of Food and Agriculture (NIFA) supporting American farmers, ranchers, rural communities 
                  enhancing productivity, profitability, sustainability, and food security advancing agriculture technology 
                  benefiting farm operations nationwide.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-green-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-green-700 text-2xl">
                      📦 What's Included in Your Free USDA SBIR Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Phase I & Phase II AgTech Proposal Templates</strong>
                          <p className="text-sm text-gray-600">Complete technical proposal template, farmer benefit section, commercialization plan, budget justification for $125K Phase I and $575K Phase II</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">USDA Priority Areas Strategy Guide</strong>
                          <p className="text-sm text-gray-600">Detailed analysis of 12 USDA priority topic areas with winning proposal strategies for precision farming, food safety, sustainable agriculture</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Farmer Benefit Demonstration Framework</strong>
                          <p className="text-sm text-gray-600">Step-by-step framework for articulating farmer productivity, profitability, sustainability benefits with quantified metrics yield cost labor savings</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">On-Farm Testing Validation Strategy</strong>
                          <p className="text-sm text-gray-600">Framework for conducting field trials with farmer cooperators proving agricultural technology performance with testimonial templates</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Distribution Partnership Templates</strong>
                          <p className="text-sm text-gray-600">Templates for obtaining letters of support from farm equipment dealers, cooperatives, ag retailers demonstrating farmer market access</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">NIFA Submission Portal Guide</strong>
                          <p className="text-sm text-gray-600">Step-by-step guide to NIFA ProSAMS system, grants.gov registration, SAM.gov verification, DUNS number requirements</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">AgTech Sector-Specific Guidance</strong>
                          <p className="text-sm text-gray-600">Specialized strategies for precision farming, food safety, livestock monitoring, sustainable agriculture with sector examples and farmer adoption</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Budget Development for AgTech Projects</strong>
                          <p className="text-sm text-gray-600">Line-by-line budget templates for Phase I $125K and Phase II $575K with allowable costs for agricultural R&D, field testing, manufacturing</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-green-600 mr-2" />
                        <strong className="text-green-800">Bonus Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Farmer cooperator recruitment strategies and partnership development frameworks</li>
                        <li>• EPA USDA regulatory compliance guidance for agricultural technology certification</li>
                        <li>• Rural broadband connectivity solutions addressing digital divide for farm technology adoption</li>
                        <li>• Phase I to Phase II transition optimization with large-scale field trial planning</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-gray-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-green-700 to-emerald-900 text-white rounded-t-lg">
                      <CardTitle className="text-2xl flex items-center">
                        <Download className="w-6 h-6 mr-2" />
                        Download Your Free Guide Now
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <form action="/download/usda-sbir-agtech-guide/thank-you" method="GET" className="space-y-4">
                        
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Full Name *
                          </label>
                          <input 
                            type="text" 
                            name="name"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="your.email@agtech.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Company Name
                          </label>
                          <input 
                            type="text"
                            name="company"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Your AgTech Startup"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            State/Location
                          </label>
                          <select 
                            name="state"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="">Select your state</option>
                            <option value="iowa">Iowa (Des Moines, Ames)</option>
                            <option value="california">California (Central Valley, Salinas, Fresno)</option>
                            <option value="illinois">Illinois (Champaign, Springfield)</option>
                            <option value="texas">Texas (Austin, Dallas, Houston)</option>
                            <option value="minnesota">Minnesota (Minneapolis, St. Paul)</option>
                            <option value="indiana">Indiana (Indianapolis)</option>
                            <option value="nebraska">Nebraska (Lincoln, Omaha)</option>
                            <option value="north-carolina">North Carolina (Raleigh, Research Triangle)</option>
                            <option value="other">Other State</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            AgTech Sector
                          </label>
                          <select 
                            name="sector"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="">Select primary sector</option>
                            <option value="precision-farming">Precision Farming & Crop Sensors</option>
                            <option value="food-safety">Food Safety & Traceability</option>
                            <option value="sustainable-ag">Sustainable Agriculture</option>
                            <option value="livestock">Livestock Monitoring & Health</option>
                            <option value="irrigation">Irrigation & Water Management</option>
                            <option value="farm-automation">Farm Automation & Robotics</option>
                            <option value="soil-health">Soil Health & Carbon Sequestration</option>
                            <option value="food-processing">Food Processing Technology</option>
                            <option value="other">Other Agricultural Technology</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            USDA SBIR Application Stage
                          </label>
                          <select 
                            name="stage"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="">Select your stage</option>
                            <option value="researching">Researching USDA SBIR Program</option>
                            <option value="preparing">Preparing Phase I Application</option>
                            <option value="phase-i-awarded">Phase I Awarded - Planning Phase II</option>
                            <option value="field-trials">Conducting On-Farm Testing</option>
                            <option value="resubmitting">Resubmitting After Decline</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Funding Interest
                          </label>
                          <select 
                            name="funding"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="">Select primary interest</option>
                            <option value="phase-i">USDA SBIR Phase I ($125K)</option>
                            <option value="phase-ii">USDA SBIR Phase II ($575K)</option>
                            <option value="sttr">USDA STTR (University Partnership)</option>
                            <option value="all">All USDA SBIR/STTR Programs</option>
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
                            I agree to receive the USDA SBIR AgTech grants guide and occasional federal agriculture funding 
                            opportunities. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-green-700 to-emerald-900 hover:from-green-800 hover:to-emerald-950 text-white font-semibold py-4 text-lg"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Get Instant Access to USDA SBIR Guide
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
                      <div className="text-2xl font-bold text-green-600">$125K</div>
                      <div className="text-xs text-gray-600">Phase I Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">$575K</div>
                      <div className="text-xs text-gray-600">Phase II Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-lime-600">130+</div>
                      <div className="text-xs text-gray-600">Annual Awards</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why AgTech Startups Choose Our USDA SBIR Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete USDA Topic Coverage</h4>
                    <p className="text-sm text-gray-600">
                      From precision farming to food safety with strategies for all 12 USDA priority areas and farmer needs
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">On-Farm Testing Expertise</h4>
                    <p className="text-sm text-gray-600">
                      Understand field trial requirements and farmer cooperator recruitment for agricultural validation
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-lime-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Distribution Strategy Framework</h4>
                    <p className="text-sm text-gray-600">
                      Learn how to partner with farm equipment dealers and cooperatives for farmer market access
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about USDA SBIR grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/usda-sbir-agtech-grants">
                      Read Complete USDA SBIR Guide
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
