import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertTriangle, Download, Calculator, Shield } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for SR&ED Tax Credits 2025 | Scientific Research & Experimental Development Guide",
  description: "Step-by-step guide to applying for SR&ED tax credits. Learn the application process, eligibility requirements, and winning strategies for up to 65% refundable credits.",
  keywords: "SR&ED application guide, SRED tax credits, scientific research experimental development application, SR&ED form T661",
  openGraph: {
    title: "How to Apply for SR&ED Tax Credits 2025",
    description: "Complete guide to SR&ED tax credit applications with step-by-step process and winning strategies.",
    url: "https://fsidigital.ca/guides/sred-application-guide",
  },
}

export default function SREDApplicationGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                💰 SR&ED Tax Credit Application Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for SR&ED Tax Credits
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Complete step-by-step guide to applying for Scientific Research & Experimental Development tax credits. 
                Learn the application process, requirements, and strategies to secure up to 65% refundable tax credits on R&D activities.
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
                  <div className="text-3xl font-bold text-green-600 mb-2">65%</div>
                  <div className="text-gray-600">Maximum Combined Rate (Quebec)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">18</div>
                  <div className="text-gray-600">Months Filing Deadline</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$4.5M</div>
                  <div className="text-gray-600">Enhanced Rate Limit (2025)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">96%</div>
                  <div className="text-gray-600">Expert Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* SR&ED Application Overview */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SR&ED Tax Credit Application Process</h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Shield className="w-8 h-8 text-green-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-green-800 mb-2">Enhanced 2025 Changes</h4>
                      <p className="text-green-700">
                        New enhanced rates with $4.5M expenditure limit (up from $3M), expanded eligibility for Canadian public corporations, 
                        and restored capital expenditure ITCs effective December 16, 2024.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Track R&D Activities</h4>
                      <p className="text-sm text-gray-600">
                        Document all eligible research and experimental development throughout the year
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Prepare Documentation</h4>
                      <p className="text-sm text-gray-600">
                        Compile technical and financial records supporting your SR&ED claim
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">File Form T661</h4>
                      <p className="text-sm text-gray-600">
                        Submit SR&ED claim with corporate tax return within 18 months
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Receive Credits</h4>
                      <p className="text-sm text-gray-600">
                        CRA processes claim and issues refundable tax credits
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eligibility Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SR&ED Eligibility Requirements</h2>
                
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Eligible Activities & Expenses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Rate:</strong> Up to 65% Total</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Deadline:</strong> 18 months</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Limit:</strong> $4.5M enhanced rate</span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Eligible SR&ED Activities:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Experimental development of new products/processes</li>
                          <li>• Applied research for specific applications</li>
                          <li>• Basic research advancing scientific knowledge</li>
                          <li>• Support work (engineering, design, testing)</li>
                          <li>• Systematic investigation for technological advancement</li>
                          <li>• Work to overcome technical challenges</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Eligible Expenses (2025):</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Salaries & wages of R&D personnel</li>
                          <li>• Materials consumed in R&D</li>
                          <li>• Third-party R&D contracts (80%)</li>
                          <li>• Overhead (65% traditional, 55% proxy)</li>
                          <li>• Capital equipment (restored 2025)</li>
                          <li>• Lease payments for R&D equipment</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tax Credit Rates by Entity Type */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">2025 SR&ED Tax Credit Rates</h2>
                
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <Calculator className="w-5 h-5 mr-2" />
                      Enhanced Rates by Corporation Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>CCPC:</strong> 35% Federal</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>ECPC:</strong> 35% Federal (NEW)</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Other:</strong> 15% Federal</span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <h4 className="font-bold mb-2 text-blue-800">Combined Federal + Provincial Rates:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                        <div>
                          <p><strong>Quebec (CCPC):</strong> 35% + 30% = 65% Total</p>
                          <p><strong>Ontario (CCPC):</strong> 35% + 10% = 45% Total</p>
                          <p><strong>BC (CCPC):</strong> 35% + 10% = 45% Total</p>
                        </div>
                        <div>
                          <p><strong>Alberta (CCPC):</strong> 35% + 10% = 45% Total</p>
                          <p><strong>Saskatchewan:</strong> 35% + 10% = 45% Total</p>
                          <p><strong>Atlantic Canada:</strong> 35% + 15% = 50% Total</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-blue-700">CCPC Requirements:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Canadian-controlled private corporation</li>
                          <li>• Taxable capital under $15M (phase-out starts)</li>
                          <li>• Active business income qualification</li>
                          <li>• 35% refundable on first $4.5M</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-blue-700">ECPC Changes (2025):</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Eligible Canadian public corporations</li>
                          <li>• Now qualify for 35% enhanced rate</li>
                          <li>• Gross revenue phase-out $15M-$75M</li>
                          <li>• Major expansion of eligibility</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Form T661 Filing Guide */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Form T661 Filing Requirements</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Required Form T661 Sections</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                          <div>
                            <strong>Part 1: Claimant Information</strong>
                            <p className="text-sm text-gray-600">Corporation details and contact info</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                          <div>
                            <strong>Part 2: Business Information</strong>
                            <p className="text-sm text-gray-600">Industry codes and business activities</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                          <div>
                            <strong>Part 3: Project Information</strong>
                            <p className="text-sm text-gray-600">SR&ED projects and expenditures</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                          <div>
                            <strong>Part 4: Expenditure Summary</strong>
                            <p className="text-sm text-gray-600">Total eligible expenses by category</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Supporting Documentation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Technical Content</strong>
                            <p className="text-sm text-gray-600">Detailed R&D project descriptions</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Financial Records</strong>
                            <p className="text-sm text-gray-600">Expense tracking and supporting invoices</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Time Tracking</strong>
                            <p className="text-sm text-gray-600">Employee time allocation to SR&ED</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Progress Records</strong>
                            <p className="text-sm text-gray-600">Lab notes, test results, iterations</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Required Documentation */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documentation & Records</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">📊 Technical Documentation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Project Descriptions</strong>
                            <p className="text-sm text-gray-600">Detailed technical objectives and hypotheses</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Work Performed</strong>
                            <p className="text-sm text-gray-600">Systematic investigation methods and results</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Technical Challenges</strong>
                            <p className="text-sm text-gray-600">Technological uncertainties and solutions</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Advancement Achieved</strong>
                            <p className="text-sm text-gray-600">Knowledge gained and technological progress</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">📋 Financial Documentation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Salary & Wage Records</strong>
                            <p className="text-sm text-gray-600">Employee time tracking and payroll records</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Material Expenses</strong>
                            <p className="text-sm text-gray-600">Invoices for materials consumed in R&D</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Contract Payments</strong>
                            <p className="text-sm text-gray-600">Third-party R&D service agreements</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Overhead Allocation</strong>
                            <p className="text-sm text-gray-600">Traditional or proxy method calculations</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Success Strategies */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">SR&ED Application Success Strategies</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Best Practices</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Maintain contemporaneous records throughout the year</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Focus on technical uncertainty and systematic investigation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Document failed experiments and iterations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Stack federal and provincial credits for maximum benefit</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Mistakes</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Including routine engineering or quality control</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Inadequate documentation of technical challenges</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Missing the 18-month filing deadline</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Poor expense allocation and tracking</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official SR&ED Resources</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">CRA Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SR&ED Program</h5>
                          <p className="text-sm text-gray-600">Official CRA SR&ED information</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.canada.ca/en/revenue-agency/services/scientific-research-experimental-development-tax-incentive-program.html" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Form T661</h5>
                          <p className="text-sm text-gray-600">SR&ED expenditures claim form</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/t661.html" target="_blank" rel="noopener noreferrer">
                            Download <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SR&ED Guidelines</h5>
                          <p className="text-sm text-gray-600">Eligibility criteria and guidelines</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.canada.ca/en/revenue-agency/services/scientific-research-experimental-development-tax-incentive-program/sred-claim.html" target="_blank" rel="noopener noreferrer">
                            View <ExternalLink className="w-3 h-3 ml-1" />
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
                          <h5 className="font-semibold">SR&ED Calculator</h5>
                          <p className="text-sm text-gray-600">Estimate your potential credits</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/blog/sred-scientific-research-experimental-development#calculator">
                            Calculate <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Free Assessment</h5>
                          <p className="text-sm text-gray-600">Professional SR&ED eligibility review</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=sred-assessment">
                            Get Assessment <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Expert Support</h5>
                          <p className="text-sm text-gray-600">Professional SR&ED application help</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=sred-expert-help">
                            Get Help <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Lead Magnet CTA */}
              <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-8 text-white text-center mb-8">
                <Download className="w-16 h-16 mx-auto mb-4 text-green-100" />
                <h3 className="text-2xl font-bold mb-4">Get Your Free SR&ED Application Kit</h3>
                <p className="text-green-100 mb-6 text-lg">
                  Download our comprehensive SR&ED application guide with Form T661 instructions, 
                  eligibility checklist, documentation templates, and CRA audit defense strategies.
                </p>
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=sred-expert-help">
                    <Download className="w-5 h-5 mr-2" />
                    Request Application Guide
                  </Link>
                </Button>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-blue-100" />
                <h3 className="text-2xl font-bold mb-4">Need Expert SR&ED Help?</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Our SR&ED specialists have secured over $45M in tax credits with 96% success rate. 
                  Get professional guidance to maximize your credits and ensure CRA compliance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold shadow-lg" asChild>
                    <Link href="/contact?service=sred-expert-help">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" className="bg-blue-700 text-white hover:bg-blue-800 font-semibold shadow-lg border-2 border-white" asChild>
                    <Link href="/contact?service=sred-assessment">
                      Free SR&ED Assessment
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
