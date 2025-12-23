import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Heart } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Women Entrepreneurship Strategy Canada 2026 | WES Federal Funding Guide | $6B Investment",
  description: "Complete guide to Canada's Women Entrepreneurship Strategy (WES) federal funding programs. Access up to $6B through WES Ecosystem Fund, Women Entrepreneurship Loan Fund, and comprehensive business support programs.",
  keywords: "Women Entrepreneurship Strategy Canada, WES federal funding, women business grants Canada, WES Ecosystem Fund, Women Entrepreneurship Loan Fund, ISED women entrepreneurs funding",
  openGraph: {
    title: "Women Entrepreneurship Strategy Canada 2026 | WES Federal Funding Guide",
    description: "Comprehensive guide to WES federal funding programs offering up to $6B for women entrepreneurs through ecosystem support, loans, and business development.",
    url: "https://www.fsidigital.ca/blog/women-entrepreneurship-strategy-canada-government-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function WomenEntrepreneurshipStrategyGovernmentGrantsBlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-600 to-pink-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                👩‍💼 Federal Women Entrepreneurship Programs
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Women Entrepreneurship Strategy (WES) Federal Funding
              </h1>
              <p className="text-xl text-pink-100 mb-8">
                Canada's comprehensive $6B federal investment in women entrepreneurship through the Women Entrepreneurship Strategy. 
                Access financing, mentorship, networks, and business development support designed specifically for women-led businesses 
                across all stages of growth and development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-pink-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?program=wes">
                    Find Your WES Program
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/government-grants">
                    Back to Government Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Program Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-2">$6B</div>
                  <div className="text-gray-600">Total WES Investment</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$3M</div>
                  <div className="text-gray-600">Max WES Ecosystem Fund</div>
                </div>
                <div>
                  <div className="text-3xl font-bold orange-600 mb-2">290,000+</div>
                  <div className="text-gray-600">Women Entrepreneurs Reached</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">2x</div>
                  <div className="text-gray-600">Target Growth by 2026</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">WES as Federal Gender Equality Policy Tool</h2>
                <p className="text-lg text-gray-700 mb-6">
                  The Women Entrepreneurship Strategy represents Canada's first comprehensive federal strategy dedicated to 
                  advancing women's entrepreneurship. Launched by Innovation, Science & Economic Development Canada (ISED) 
                  as a $6 billion investment, WES addresses systemic barriers that prevent women from starting, growing, 
                  and scaling businesses. The strategy integrates financing, ecosystem support, and policy initiatives 
                  to double the number of women-owned businesses by 2026.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-pink-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-pink-800">Federal Policy Objectives</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Gender equality and women's economic empowerment</li>
                      <li>• Elimination of systemic barriers to women's entrepreneurship</li>
                      <li>• Doubling women-owned businesses by 2026</li>
                      <li>• Comprehensive ecosystem development and support</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Strategic Federal Integration</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Integration with federal innovation and economic strategies</li>
                      <li>• Coordination with other ISED business programs</li>
                      <li>• Alignment with gender-based analysis plus (GBA+)</li>
                      <li>• Connection to federal trade and export initiatives</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major WES Federal Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major WES Federal Programs</h2>
              
              <div className="space-y-8">
                {/* WES Ecosystem Fund */}
                <Card className="border-pink-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-pink-600 mr-3" />
                      <CardTitle className="text-pink-700">WES Ecosystem Fund</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $3M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>$165M Total</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Non-Profit Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Ecosystem Building</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal support for not-for-profit organizations to strengthen capacity within the women entrepreneurship 
                      ecosystem and close gaps in service for women entrepreneurs across Canada.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Organizations:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Business and entrepreneur support organizations</li>
                          <li>• Research and innovation hubs</li>
                          <li>• Post-secondary institutions and universities</li>
                          <li>• Business accelerators and incubators</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funded Activities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Mentoring and networking programs</li>
                          <li>• Capacity building and skills development</li>
                          <li>• Business development and deployment supports</li>
                          <li>• Inclusive networks and partnerships</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Federal Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Canadian not-for-profit organization</li>
                          <li>• Minimum 3 years of operation</li>
                          <li>• Women entrepreneurship mandate or programming</li>
                          <li>• Partnership requirements with other organizations</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Women Entrepreneurship Loan Fund */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Women Entrepreneurship Loan Fund</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $100K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Non-Repayable</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Women-Led</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Export Ready</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Direct federal funding to women-owned and women-led businesses to help them grow and reach 
                      export markets, supporting business expansion and international competitiveness.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Eligibility Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Women-owned (51% or more ownership by women)</li>
                          <li>• Existing business operations and revenue</li>
                          <li>• Growth and export market potential</li>
                          <li>• Canadian incorporation and operations</li>
                          <li>• Demonstrated market traction and viability</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Funded Activities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Business growth and expansion initiatives</li>
                          <li>• Export market development and penetration</li>
                          <li>• Technology adoption and digital transformation</li>
                          <li>• Marketing and brand development</li>
                          <li>• Product development and innovation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Inclusive Women Venture Capital Initiative */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Inclusive Women Venture Capital Initiative</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$15M Investment</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>VC Ecosystem</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Fund Managers</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Diversity Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal initiative to strengthen and build a more inclusive risk and growth capital ecosystem 
                      for women entrepreneurs by supporting diverse fund managers and investment strategies.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Investment Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Diverse fund manager development and support</li>
                          <li>• Women-led venture capital fund establishment</li>
                          <li>• Investment pipeline development for women entrepreneurs</li>
                          <li>• Gender lens investing capacity building</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Federal Ecosystem Impact:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Increased venture capital access for women entrepreneurs</li>
                          <li>• Diversified investment decision-making</li>
                          <li>• Enhanced risk capital ecosystem inclusivity</li>
                          <li>• Strengthened women entrepreneurship support network</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* WES Knowledge Hub */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <FileText className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Women Entrepreneurship Knowledge Hub</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$15M Investment</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Research Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Data & Insights</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Policy Support</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal research initiative providing data, insights, and evidence-based research to inform 
                      policy development and support the growth of women's entrepreneurship ecosystem in Canada.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Research Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Women entrepreneurship landscape analysis</li>
                          <li>• Barrier identification and solution research</li>
                          <li>• Best practices and success factor analysis</li>
                          <li>• Impact measurement and evaluation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Knowledge Products:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Annual State of Women's Entrepreneurship reports</li>
                          <li>• Policy briefings and recommendations</li>
                          <li>• Data dashboards and interactive tools</li>
                          <li>• Research publications and case studies</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Federal Policy Support:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Evidence-based policy development</li>
                          <li>• Program design and implementation guidance</li>
                          <li>• Impact assessment and measurement</li>
                          <li>• International best practice integration</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional WES Initiatives */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Heart className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">Additional WES Federal Initiatives</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-orange-700">Procurement & Supply Chain:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Supplier Diversity Certification:</strong> Supporting women-owned business certification</li>
                          <li>• <strong>Government Procurement Access:</strong> Enhanced access to federal contracts</li>
                          <li>• <strong>Corporate Supply Chain Integration:</strong> Private sector partnership development</li>
                          <li>• <strong>Procurement Readiness:</strong> Business development for government contracting</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Specialized Support Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Indigenous Women Entrepreneurs:</strong> Culturally appropriate business support</li>
                          <li>• <strong>Newcomer Women Entrepreneurs:</strong> Settlement and business integration</li>
                          <li>• <strong>Rural and Remote Support:</strong> Geographic barrier address initiatives</li>
                          <li>• <strong>Youth Women Entrepreneurs:</strong> Young women business leadership development</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Federal Policy Integration */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">WES Federal Policy Integration</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-pink-700">🏛️ Federal Gender Equality Integration:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Gender-Based Analysis Plus (GBA+):</strong> Systematic integration across all federal programs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Federal Feminist International Assistance:</strong> Global women entrepreneurship leadership</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Pay Equity and Childcare:</strong> Comprehensive women's economic empowerment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Federal Diversity and Inclusion:</strong> Intersectional approach to entrepreneurship support</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-blue-700">🔗 Federal Program Synergies:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>ISED Program Integration:</strong> Coordination with IRAP, SIF, and regional development agencies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Trade and Export Development:</strong> Global Affairs Canada partnership for international markets</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>BDC Collaboration:</strong> Enhanced financing and advisory services for women entrepreneurs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Innovation Superclusters:</strong> Women's leadership in innovation ecosystem development</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WES Application Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">WES Federal Application Process</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">1</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Women-Led Business Verification and Program Selection</h4>
                    <p className="text-gray-600">Confirm women ownership (51% or more) and select appropriate WES program stream based on business stage and support needs.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">2</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Business Assessment and Federal Alignment</h4>
                    <p className="text-gray-600">Evaluate business readiness, growth potential, and alignment with federal women entrepreneurship policy objectives.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">3</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Comprehensive Application Development and Submission</h4>
                    <p className="text-gray-600">Prepare detailed application with business plan, growth strategy, and demonstration of women entrepreneurship ecosystem contribution.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">4</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Federal Review and Gender Impact Assessment</h4>
                    <p className="text-gray-600">ISED evaluation including business merit assessment, women entrepreneurship impact, and federal policy alignment verification.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">5</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Federal Support Agreement and Ecosystem Integration</h4>
                    <p className="text-gray-600">Execute federal funding agreement with performance milestones and integration into broader WES ecosystem support network.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Tips */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">WES Federal Application Success Strategies</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">✅ Women Entrepreneurship Federal Success Factors:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Clear Women Leadership:</strong> Demonstrate genuine women ownership and leadership (51%+ ownership)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Federal Policy Alignment:</strong> Connect business goals to WES objectives and gender equality priorities</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Ecosystem Contribution:</strong> Show how success will benefit broader women entrepreneurship ecosystem</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Growth and Impact Potential:</strong> Present clear scaling strategy and measurable impact metrics</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common WES Federal Application Mistakes:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Insufficient Women Leadership Evidence:</strong>
                        <p className="text-sm text-gray-600">Not clearly documenting women ownership, control, and decision-making authority</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Weak Gender Impact Articulation:</strong>
                        <p className="text-sm text-gray-600">Failing to connect business success to broader women entrepreneurship ecosystem benefits</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Limited Growth Strategy:</strong>
                        <p className="text-sm text-gray-600">Insufficient demonstration of scaling potential and market expansion plans</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Poor Network Integration:</strong>
                        <p className="text-sm text-gray-600">Not leveraging WES ecosystem resources and partnership opportunities</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-16 bg-gradient-to-r from-pink-600 to-pink-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access WES Federal Women Entrepreneurship Support?
              </h2>
              <p className="text-xl text-pink-100 mb-8">
                Get the complete WES federal application guide or work with our women entrepreneurship specialists 
                who have secured $8M+ in WES approvals with deep understanding of federal gender equality priorities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {/* Get Application Guide CTA */}
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Women Entrepreneur Approach</h4>
                  <p className="text-pink-100 text-sm mb-4">
                    Get our comprehensive WES federal application guide with women entrepreneurship templates and ecosystem strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-pink-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/apply-women-entrepreneurship-strateg">
                      <Download className="w-4 h-4 mr-2" />
                      Get WES Federal Guide
                    </Link>
                  </Button>
                </div>

                {/* Get Expert Help CTA */}
                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Women Entrepreneurship Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with women entrepreneurship specialists who have secured $8M+ in WES approvals with 89% success rate and deep ecosystem expertise.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=women-entrepreneurship-expert-help">
                      Get WES Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-pink-200 text-sm mt-6">
                89% success rate for WES applications • Average funding secured: $185K • Women entrepreneurship ecosystem expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
