import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Target, DollarSign, AlertTriangle, Download, Microscope, Pill, Stethoscope, Dna } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for Biotech Grants Canada 2025 | Medical Device & Clinical Trials Funding Guide",
  description: "Step-by-step guide to applying for life sciences grants in Canada. Learn IRAP biotech application, clinical trials funding process, medical device regulatory pathways for $720M+ in biotechnology grants.",
  keywords: "how to apply for biotech grants Canada, medical device funding application, clinical trials grants Canada, biomanufacturing funding guide, drug development grants, pharmaceutical funding Canada",
  openGraph: {
    title: "How to Apply for Biotech Grants Canada 2025 | Life Sciences Funding Guide",
    description: "Complete application guide for Canadian life sciences grants with IRAP, clinical trials, and medical device funding strategies.",
    url: "https://fsidigital.ca/guides/canada-life-sciences-funding-guide",
  },
}

export default function CanadaLifeSciencesFundingGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🧬 Life Sciences Funding Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for Biotech Grants in Canada 2025
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Complete step-by-step guide to applying for life sciences and biotechnology grants in Canada. 
                Learn IRAP biotech applications, clinical trials funding process, medical device regulatory pathways, 
                and how to secure up to $10M in drug development funding across 18+ pharmaceutical and health technology programs.
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
                  <div className="text-3xl font-bold text-teal-600 mb-2">$720M+</div>
                  <div className="text-gray-600">Life Sciences Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-600 mb-2">$10M</div>
                  <div className="text-gray-600">Max Clinical Trials Grant</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">60%</div>
                  <div className="text-gray-600">Average Cost Coverage</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">18+</div>
                  <div className="text-gray-600">Active Biotech Programs</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Life Sciences Overview */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Canada Life Sciences Grant Application Overview</h2>
                
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Microscope className="w-8 h-8 text-teal-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-teal-800 mb-2">Biotechnology & Health Innovation Focus</h4>
                      <p className="text-teal-700">
                        Canada provides $720M+ annually in life sciences funding through federal programs supporting 
                        drug development, medical devices, diagnostics, clinical trials, biomanufacturing, and health 
                        technology innovation from preclinical research to commercialization.
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
                      <h4 className="font-bold text-lg mb-3">Define Clinical Need</h4>
                      <p className="text-sm text-gray-600">
                        Identify unmet medical need and therapeutic area
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Regulatory Strategy</h4>
                      <p className="text-sm text-gray-600">
                        Plan Health Canada & FDA approval pathway
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Clinical Evidence</h4>
                      <p className="text-sm text-gray-600">
                        Gather preclinical and clinical trial data
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Apply & Commercialize</h4>
                      <p className="text-sm text-gray-600">
                        Submit applications and execute go-to-market
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* IRAP Biotech Application */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">IRAP Biotechnology Funding Application (Up to $500K)</h2>
                
                <Card className="border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-teal-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      IRAP Life Sciences & Biotech Innovation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Funding:</strong> Up to $500K</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Coverage:</strong> 60-80%</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Type:</strong> R&D Projects</span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-teal-700">Biotech Eligibility:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Canadian life sciences SME</li>
                          <li>• Novel therapeutic or diagnostic</li>
                          <li>• Technical feasibility demonstrated</li>
                          <li>• Qualified scientific team</li>
                          <li>• Clear regulatory pathway</li>
                          <li>• Commercialization potential</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-cyan-700">Application Components:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Technology description and innovation</li>
                          <li>• Preclinical or clinical data</li>
                          <li>• Regulatory strategy (Health Canada/FDA)</li>
                          <li>• IP protection and freedom-to-operate</li>
                          <li>• Market analysis and competition</li>
                          <li>• Go-to-market and partnerships</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Clinical Trials Funding Process */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Clinical Trials Funding Application Process</h2>
                
                <Card className="border-cyan-200">
                  <CardHeader>
                    <CardTitle className="text-cyan-700 flex items-center">
                      <Pill className="w-5 h-5 mr-2" />
                      CIHR & Provincial Clinical Trials Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Funding:</strong> Up to $10M</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Phase:</strong> I-IV Trials</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Coverage:</strong> Variable</span>
                      </div>
                    </div>
                    
                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-4">
                      <h4 className="font-bold mb-2 text-cyan-800">Clinical Trial Funding by Phase:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-cyan-700">
                        <div>
                          <p><strong>Early Phase (I-II):</strong></p>
                          <ul className="ml-4 space-y-1">
                            <li>• Safety and tolerability studies</li>
                            <li>• Dose-finding trials</li>
                            <li>• Small patient cohorts (20-100)</li>
                            <li>• $500K - $3M typical funding</li>
                          </ul>
                        </div>
                        <div>
                          <p><strong>Late Phase (III-IV):</strong></p>
                          <ul className="ml-4 space-y-1">
                            <li>• Efficacy confirmation trials</li>
                            <li>• Large patient populations (300+)</li>
                            <li>• Multi-center studies</li>
                            <li>• $3M - $10M typical funding</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-cyan-700">Application Requirements:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Clinical trial protocol (CTP)</li>
                          <li>• Investigator's brochure</li>
                          <li>• Health Canada CTA approval</li>
                          <li>• Ethics board approval (REB)</li>
                          <li>• Patient recruitment strategy</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Fundable Costs:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Patient recruitment and retention</li>
                          <li>• Clinical site management</li>
                          <li>• Data collection and monitoring</li>
                          <li>• Laboratory and imaging costs</li>
                          <li>• Statistical analysis</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Medical Device Regulatory */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Medical Device Funding & Regulatory Pathway</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Health Canada MDEL Process</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <div>
                            <strong>Class I (Low Risk)</strong>
                            <p className="text-sm text-gray-600">Self-declaration, basic requirements</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <div>
                            <strong>Class II (Moderate Risk)</strong>
                            <p className="text-sm text-gray-600">Conformity assessment required</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <div>
                            <strong>Class III (High Risk)</strong>
                            <p className="text-sm text-gray-600">Full regulatory review needed</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <div>
                            <strong>Class IV (Highest Risk)</strong>
                            <p className="text-sm text-gray-600">Comprehensive clinical evidence</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Device Development Funding</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Design & Prototyping</strong>
                            <p className="text-sm text-gray-600">IRAP funding up to $500K</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Preclinical Testing</strong>
                            <p className="text-sm text-gray-600">Bench and animal testing support</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Clinical Validation</strong>
                            <p className="text-sm text-gray-600">Human factors and clinical studies</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Regulatory Submission</strong>
                            <p className="text-sm text-gray-600">MDEL and FDA 510(k) preparation</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Program Selection Matrix */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Life Sciences Program Selection by Stage</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-teal-50">
                        <th className="border border-teal-200 p-3 text-left">Development Stage</th>
                        <th className="border border-teal-200 p-3 text-left">Recommended Programs</th>
                        <th className="border border-teal-200 p-3 text-left">Funding Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 p-3">
                          <strong>Discovery & Preclinical</strong>
                          <p className="text-sm text-gray-600">Target validation, lead optimization</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• IRAP Biotech Innovation</li>
                            <li>• SR&ED Tax Credits</li>
                            <li>• CIHR Project Grants</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$100K - $500K</strong>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3">
                          <strong>Clinical Trials (Phase I-II)</strong>
                          <p className="text-sm text-gray-600">Safety and early efficacy</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• CIHR Clinical Trials</li>
                            <li>• Provincial health research</li>
                            <li>• Industry partnerships</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$500K - $3M</strong>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-3">
                          <strong>Late-Stage Trials (Phase III)</strong>
                          <p className="text-sm text-gray-600">Efficacy confirmation, large cohorts</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• CIHR Major Clinical Trials</li>
                            <li>• Strategic pharma partnerships</li>
                            <li>• Regional development funds</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$3M - $10M</strong>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3">
                          <strong>Biomanufacturing Scale-Up</strong>
                          <p className="text-sm text-gray-600">GMP facilities, commercial production</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• Strategic Innovation Fund</li>
                            <li>• Provincial manufacturing grants</li>
                            <li>• Federal infrastructure programs</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$10M - $20M+</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Success Strategies */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Life Sciences Funding Success Strategies</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Best Practices</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Robust Clinical Data:</strong> Strong preclinical and clinical evidence demonstrating safety and efficacy</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Clear Regulatory Strategy:</strong> Well-defined Health Canada and FDA approval pathway with realistic timelines</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>IP Protection:</strong> Strong patent portfolio with freedom-to-operate analysis and competitive landscape</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Market Access Plan:</strong> Reimbursement strategy and clear commercialization partnerships</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Mistakes</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Insufficient Clinical Evidence:</strong> Weak preclinical data or poorly designed clinical trial protocols</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Unclear Regulatory Path:</strong> No clear strategy for Health Canada MDEL or FDA approval process</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>IP Vulnerabilities:</strong> Weak patent protection, prior art issues, or freedom-to-operate concerns</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>No Commercialization Strategy:</strong> Unclear path to market, reimbursement, or revenue generation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official Life Sciences Resources</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-teal-200">
                    <CardHeader>
                      <CardTitle className="text-teal-700">Government Programs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">IRAP Life Sciences</h5>
                          <p className="text-sm text-gray-600">Biotech innovation funding</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://nrc.canada.ca/irap" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">CIHR Clinical Trials</h5>
                          <p className="text-sm text-gray-600">Health research funding</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://cihr-irsc.gc.ca" target="_blank" rel="noopener noreferrer">
                            Apply <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Health Canada</h5>
                          <p className="text-sm text-gray-600">Regulatory guidance and MDEL</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.canada.ca/health" target="_blank" rel="noopener noreferrer">
                            Learn More <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-cyan-200">
                    <CardHeader>
                      <CardTitle className="text-cyan-700">Professional Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Biotech Assessment</h5>
                          <p className="text-sm text-gray-600">Free eligibility review</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=lifesciences-assessment">
                            Get Assessment
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Clinical Trial Planner</h5>
                          <p className="text-sm text-gray-600">Budget and timeline tools</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/tools/clinical-trial-planner">
                            Plan Trial
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Expert Help</h5>
                          <p className="text-sm text-gray-600">Life sciences funding specialists</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=lifesciences-expert-help">
                            Get Help
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Lead Magnet CTA */}
              <div className="bg-gradient-to-r from-teal-600 to-cyan-700 rounded-lg p-8 text-white text-center mb-8">
                <Download className="w-16 h-16 mx-auto mb-4 text-teal-100" />
                <h3 className="text-2xl font-bold mb-4">Get Your Free Life Sciences Funding Kit</h3>
                <p className="text-teal-100 mb-6 text-lg">
                  Download our comprehensive biotech funding guide with IRAP templates, clinical trials checklists, 
                  medical device regulatory tools, and successful application examples.
                </p>
                <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100" asChild>
                  <Link href="/download/canada-life-sciences-funding-guide">
                    <Download className="w-5 h-5 mr-2" />
                    Download Free Guide
                  </Link>
                </Button>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-cyan-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for Life Sciences Grants?</h3>
                <p className="text-cyan-100 mb-6 text-lg">
                  Our life sciences funding specialists understand IRAP biotech, clinical trials, and medical device programs. 
                  We've secured $95M+ in biotechnology funding with 76% success rate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-cyan-700 hover:bg-gray-100" asChild>
                    <Link href="/contact?service=lifesciences-expert-help">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white border-0" asChild>
                    <Link href="/contact?service=lifesciences-assessment">
                      Free Biotech Assessment
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
