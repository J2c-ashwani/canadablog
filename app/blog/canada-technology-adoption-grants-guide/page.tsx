import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Monitor, Smartphone, Database, Cloud, Cpu, Globe, Shield, Bot } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Technology Adoption Grants 2026 | $950M+ Digital Transformation Across 22+ Programs",
  description: "Complete guide to Canadian technology adoption grants. Access all 22+ digital transformation programs including CDAP, provincial tech grants, AI adoption funding, and cybersecurity support.",
  keywords: "Canada technology adoption grants, CDAP program, digital transformation funding, technology integration grants, AI adoption support, cybersecurity funding, automation grants Canada",
}

export default function CanadaTechnologyAdoptionGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cyan-600 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                💻 Canadian Technology Adoption Funding
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Canada Technology Adoption Grants 2026
              </h1>
              <p className="text-xl text-cyan-100 mb-8">
                Access $950M+ in Canadian digital transformation funding across 22+ specialized programs. From CDAP to AI adoption grants - 
                complete guide to modernizing your business technology infrastructure.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=technology-adoption-grants-expert-help">
                  Get Expert Help with Technology Grants
                </Link>
              </Button>
              <p className="text-cyan-200 text-sm mt-4">
                Free consultation • 92% tech adoption success rate • Average funding: $58K
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
                  <div className="text-3xl font-bold text-cyan-600 mb-2">$950M+</div>
                  <div className="text-gray-600">Technology Adoption Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">22+</div>
                  <div className="text-gray-600">Active Tech Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
                  <div className="text-gray-600">Expert Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$58K</div>
                  <div className="text-gray-600">Average Technology Funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Federal Technology Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Major Federal Technology Adoption Programs</h2>
              <p className="text-center text-gray-600 mb-12">
                Government of Canada flagship programs designed to accelerate digital transformation and technology integration.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* Canada Digital Adoption Program (CDAP) */}
                <Card className="border-2 border-cyan-200">
                  <CardHeader>
                    <CardTitle className="text-cyan-700">Canada Digital Adoption Program (CDAP)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$15K + $100K loan</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Monitor className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Digital Transform</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Flagship digital adoption program with grants for digital planning and 0% interest loans for technology implementation.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Grow Your Business Online:</strong> $2,400 micro-grant</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Boost Your Business Technology:</strong> $15K plan + $100K loan</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>E-commerce, CRM, ERP implementation</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Digital advisor support included</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* AI for Good Technology Program */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">AI for Good Technology Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $1M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Bot className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>AI Integration</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Funding for businesses adopting artificial intelligence and machine learning technologies for social good.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>AI/ML implementation projects</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Automation and efficiency improvements</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Data analytics and insights platforms</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Social impact technology solutions</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Cybersecure Canada */}
                <Card className="border-2 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">Cybersecure Canada Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $25K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-red-600 mr-2" />
                        <span><strong>Cybersecurity</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Support for small businesses to adopt cybersecurity technologies and best practices.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Cybersecurity assessment and planning</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Security software implementation</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Employee cybersecurity training</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Data protection and backup systems</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Clean Technology Adoption Program */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Clean Technology Adoption Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Cloud className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Clean Tech</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Funding for businesses adopting clean technologies and environmental monitoring systems.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Environmental monitoring technology</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Energy efficiency systems</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Waste reduction technology</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Carbon tracking and reporting tools</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Provincial Technology Adoption Programs */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Provincial Digital Transformation Programs</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Ontario Tech Programs */}
                <Card className="border-2 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700 text-lg">Ontario Digital Transformation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Ontario Digital Main Street</strong> - $2,400</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Manufacturing Modernization</strong> - Up to $1M</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>AI Innovation Program</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Cybersecurity Support Program</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Automation Incentive Program</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Quebec Tech Programs */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 text-lg">Quebec Technology Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Programme Transformation Numérique</strong> - $500K</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>AI Quebec Innovation Fund</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Industry 4.0 Program</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Digital Manufacturing Support</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>E-commerce Development Grant</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* BC Tech Programs */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 text-lg">BC Technology Innovation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>BC Tech Fund</strong> - Up to $300K</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Digital Supercluster Initiative</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Clean Tech Innovation Program</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Indigenous Digital Initiative</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Rural Connectivity Program</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Provincial Programs */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-yellow-700">Prairie Provinces Technology</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Alberta:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Alberta Digital Infrastructure Program</li>
                          <li>• Innovation Employment Grant - Tech focus</li>
                          <li>• AI/ML Adoption Incentive</li>
                          <li>• Cybersecurity Enhancement Fund</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Saskatchewan:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Digital Transformation Fund</li>
                          <li>• AgTech Innovation Program</li>
                          <li>• Manufacturing Technology Upgrade</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Manitoba:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Digital Innovation Program</li>
                          <li>• Technology Commercialization</li>
                          <li>• E-commerce Development Support</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700">Atlantic & Territories Technology</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Atlantic Canada:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Ocean Supercluster Technology</li>
                          <li>• Nova Scotia Digital Innovation</li>
                          <li>• New Brunswick Tech Accelerator</li>
                          <li>• PEI Digital Growth Program</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Territories:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• NWT Digital Infrastructure</li>
                          <li>• Yukon Technology Adoption</li>
                          <li>• Nunavut Connectivity Program</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Technology Categories */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Specialized Technology Adoption Categories</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <Database className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">ERP & Business Systems</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Enterprise resource planning and integrated business management systems.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• ERP implementation funding</li>
                      <li>• CRM system integration</li>
                      <li>• Inventory management systems</li>
                      <li>• Business intelligence platforms</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <Globe className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">E-commerce & Digital Marketing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Online sales platforms and digital marketing technology adoption.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• E-commerce platform development</li>
                      <li>• Digital marketing automation</li>
                      <li>• Social media management tools</li>
                      <li>• SEO and analytics platforms</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <Cpu className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Automation & IoT</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Industrial automation and Internet of Things technology implementation.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Manufacturing automation</li>
                      <li>• IoT sensor networks</li>
                      <li>• Robotic process automation</li>
                      <li>• Predictive maintenance systems</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Industry-Specific Technology Programs */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Industry-Specific Technology Programs</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">Manufacturing & Industry 4.0</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Smart Manufacturing Initiative</strong> - Up to $2M</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Advanced Manufacturing Technology</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Digital Twin Development</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Supply Chain Digitization</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-teal-700">Healthcare & Life Sciences Tech</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Digital Health Innovation</strong> - Up to $500K</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Telemedicine Platform Support</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Medical Device Integration</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Health Data Analytics</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Strong Single CTA Section */}
        <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Accelerate Your Digital Transformation with Expert Navigation of 22+ Tech Programs
              </h2>
              <p className="text-xl text-cyan-100 mb-8">
                Canada's technology adoption ecosystem spans CDAP flagship programs, provincial digital initiatives, AI adoption funding, 
                and industry-specific tech grants. Our technology specialists have helped 350+ Canadian businesses secure over $20M 
                in technology funding with a 92% success rate.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Complete Technology Adoption Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>All 22+ program eligibility assessment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>CDAP application and digital plan development</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Provincial tech program coordination</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>AI and automation funding strategy</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>92% success rate for technology funding</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Average $58K technology funding secured</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=technology-adoption-grants-expert-help">
                  Get Expert Help with All Technology Programs
                </Link>
              </Button>
              <p className="text-cyan-200 text-sm mt-4">
                Free consultation • Digital transformation specialists • Multi-program expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
