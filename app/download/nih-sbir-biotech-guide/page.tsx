import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, Heart, Users, MapPin, DollarSign, Target } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Download Free NIH SBIR Biotech Guide | Phase I $285K, Phase II $2M Application Toolkit",
  description: "Get instant access to our NIH SBIR/STTR biotech grants guide with Phase I/II proposal templates, clinical validation strategies, FDA regulatory frameworks, and application resources.",
  keywords: "NIH SBIR guide, biotech grants guide, medical device SBIR templates, NIH application resources",
}

export default function NIHSBIRBiotechDownloadPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
                  💊 Free NIH SBIR/STTR Biotech Grants Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free NIH SBIR Biotech Grants Application Guide & Proposal Templates
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive NIH SBIR/STTR biotech grants toolkit covering Phase I ($285,000) and Phase II 
                  ($2,000,000) application strategies, technical proposal templates for therapeutics, medical devices, 
                  diagnostics, and digital health, clinical validation frameworks, FDA regulatory pathway planning, NIH 
                  institute-specific strategies, eligibility requirements, submission timelines, and success strategies for 
                  life sciences startups pursuing non-dilutive federal biomedical innovation funding across all 27 NIH 
                  institutes including NCI, NHLBI, NIAID, NINDS, and NIDDK supporting breakthrough healthcare solutions 
                  improving patient outcomes.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-purple-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-purple-700 text-2xl">
                      📦 What's Included in Your Free NIH SBIR Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Phase I & Phase II Biotech Proposal Templates</strong>
                          <p className="text-sm text-gray-600">Complete scientific proposal template, clinical significance section, commercialization plan, budget justification for $285K Phase I and $2M Phase II</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">NIH Institute-Specific Strategy Guide</strong>
                          <p className="text-sm text-gray-600">Detailed analysis of 27 NIH institutes with winning proposal strategies for NCI, NHLBI, NIAID, NINDS, NIDDK and disease-specific priorities</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Clinical Significance Framework</strong>
                          <p className="text-sm text-gray-600">Step-by-step framework for articulating unmet medical need, patient population, clinical impact with health economics and outcomes data</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">FDA Regulatory Pathway Planning</strong>
                          <p className="text-sm text-gray-600">Complete guide to 510k, PMA, IND, IDE pathways with clinical trial design, endpoints, regulatory milestones and approval timelines</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Clinical KOL Engagement Templates</strong>
                          <p className="text-sm text-gray-600">Templates for obtaining letters of support from physician key opinion leaders at academic medical centers demonstrating clinical validation</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Preliminary Data Strategy & Presentation</strong>
                          <p className="text-sm text-gray-600">Framework for presenting in vitro, in vivo, clinical pilot data proving proof of concept, efficacy, safety with statistical analysis</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Biotech Sector-Specific Guidance</strong>
                          <p className="text-sm text-gray-600">Specialized strategies for therapeutics, medical devices, diagnostics, digital health with sector examples and success stories</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Budget Development for Life Sciences Projects</strong>
                          <p className="text-sm text-gray-600">Line-by-line budget templates for Phase I $285K and Phase II $2M with allowable costs for biomedical R&D, clinical studies, regulatory</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-purple-600 mr-2" />
                        <strong className="text-purple-800">Bonus Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Fast-Track pilot application guide for investor-backed biotech startups</li>
                        <li>• STTR university partnership strategies for academic collaborations</li>
                        <li>• Reimbursement strategy templates and payer engagement frameworks</li>
                        <li>• Phase I to Phase II transition optimization with clinical milestone planning</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-gray-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-purple-700 to-pink-900 text-white rounded-t-lg">
                      <CardTitle className="text-2xl flex items-center">
                        <Download className="w-6 h-6 mr-2" />
                        Download Your Free Guide Now
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <form action="/download/nih-sbir-biotech-guide/thank-you" method="GET" className="space-y-4">
                        
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Full Name *
                          </label>
                          <input 
                            type="text" 
                            name="name"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="your.email@biotech.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Company Name
                          </label>
                          <input 
                            type="text"
                            name="company"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Your Biotech Startup"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            State/Location
                          </label>
                          <select 
                            name="state"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          >
                            <option value="">Select your state</option>
                            <option value="massachusetts">Massachusetts (Boston, Cambridge)</option>
                            <option value="california">California (SF Bay Area, San Diego, LA)</option>
                            <option value="new-york">New York (NYC)</option>
                            <option value="pennsylvania">Pennsylvania (Philadelphia)</option>
                            <option value="maryland">Maryland (Baltimore)</option>
                            <option value="north-carolina">North Carolina (Research Triangle)</option>
                            <option value="washington">Washington (Seattle)</option>
                            <option value="texas">Texas (Austin, Houston)</option>
                            <option value="other">Other State</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Biotech Sector
                          </label>
                          <select 
                            name="sector"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          >
                            <option value="">Select primary sector</option>
                            <option value="therapeutics">Therapeutics & Drug Discovery</option>
                            <option value="biologics">Biologics & Antibodies</option>
                            <option value="medical-devices">Medical Devices</option>
                            <option value="diagnostics">Diagnostics & Imaging</option>
                            <option value="digital-health">Digital Health Platforms</option>
                            <option value="gene-therapy">Gene & Cell Therapy</option>
                            <option value="immunotherapy">Immunotherapy & Vaccines</option>
                            <option value="precision-medicine">Precision Medicine</option>
                            <option value="other">Other Life Sciences</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            NIH SBIR Application Stage
                          </label>
                          <select 
                            name="stage"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          >
                            <option value="">Select your stage</option>
                            <option value="researching">Researching NIH SBIR Program</option>
                            <option value="preparing">Preparing Phase I Application</option>
                            <option value="phase-i-awarded">Phase I Awarded - Planning Phase II</option>
                            <option value="fast-track">Considering Fast-Track Pilot</option>
                            <option value="resubmitting">Resubmitting After Decline</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Funding Interest
                          </label>
                          <select 
                            name="funding"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          >
                            <option value="">Select primary interest</option>
                            <option value="phase-i">NIH SBIR Phase I ($285K)</option>
                            <option value="phase-ii">NIH SBIR Phase II ($2M)</option>
                            <option value="fast-track">Fast-Track Pilot (Direct Phase II)</option>
                            <option value="sttr">NIH STTR (University Partnership)</option>
                            <option value="all">All NIH SBIR/STTR Programs</option>
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
                            I agree to receive the NIH SBIR biotech grants guide and occasional federal biomedical funding 
                            opportunities. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-purple-700 to-pink-900 hover:from-purple-800 hover:to-pink-950 text-white font-semibold py-4 text-lg"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Get Instant Access to NIH SBIR Guide
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
                      <div className="text-2xl font-bold text-purple-600">$285K</div>
                      <div className="text-xs text-gray-600">Phase I Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-pink-600">$2M</div>
                      <div className="text-xs text-gray-600">Phase II Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">500+</div>
                      <div className="text-xs text-gray-600">Annual Awards</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Biotech Startups Choose Our NIH SBIR Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete NIH Institute Coverage</h4>
                    <p className="text-sm text-gray-600">
                      From cancer to cardiovascular with strategies for all 27 NIH institutes and disease priorities
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-pink-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">FDA Regulatory Expertise</h4>
                    <p className="text-sm text-gray-600">
                      Understand 510k, PMA, IND pathways with clinical trial design and regulatory milestone planning
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Clinical Validation Framework</h4>
                    <p className="text-sm text-gray-600">
                      Learn how to engage KOLs and academic medical centers for market validation and clinical studies
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about NIH SBIR grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/nih-sbir-biotech-grants">
                      Read Complete NIH SBIR Guide
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
