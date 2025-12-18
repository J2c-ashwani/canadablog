import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Target, DollarSign, AlertTriangle, Download, Brain, Code, Database, Sparkles } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for AI Grants Canada 2025 | Scale AI Application Guide | $850M+ Funding",
  description: "Step-by-step guide to applying for artificial intelligence grants in Canada. Learn Scale AI application process, CDAP digital adoption, machine learning funding strategies for $850M+ in AI innovation grants.",
  keywords: "how to apply for AI grants Canada, Scale AI application guide, artificial intelligence funding Canada, machine learning grants, deep learning research funding, AI startup grants Canada, computer vision funding",
  openGraph: {
    title: "How to Apply for AI Grants Canada 2025 | Scale AI & Machine Learning Funding",
    description: "Complete application guide for Canadian AI grants with Scale AI, CDAP, and research funding strategies.",
    url: "https://fsidigital.ca/guides/canada-digital-ai-funding-guide",
  },
}

export default function CanadaDigitalAIFundingGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🤖 AI Funding Application Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for AI Grants in Canada 2025
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Complete step-by-step guide to applying for artificial intelligence and machine learning grants in Canada. 
                Learn the Scale AI application process, CDAP digital adoption strategies, and how to secure up to $5M+ in AI 
                innovation funding across 25+ programs for deep learning, computer vision, and NLP projects.
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
                  <div className="text-3xl font-bold text-blue-600 mb-2">$850M+</div>
                  <div className="text-gray-600">AI Grants Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$5M+</div>
                  <div className="text-gray-600">Maximum Scale AI Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">79%</div>
                  <div className="text-gray-600">AI Application Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">25+</div>
                  <div className="text-gray-600">Active AI Programs</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* AI Funding Overview */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Canada AI Grant Application Overview</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Brain className="w-8 h-8 text-blue-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-blue-800 mb-2">Artificial Intelligence Funding Focus</h4>
                      <p className="text-blue-700">
                        Canada provides $850M+ annually in AI and machine learning funding through federal programs supporting 
                        deep learning research, computer vision applications, natural language processing, predictive analytics, 
                        and AI-powered business solutions across all industries.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Define AI Use Case</h4>
                      <p className="text-sm text-gray-600">
                        Identify specific business problem AI solves with measurable KPIs
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Select AI Programs</h4>
                      <p className="text-sm text-gray-600">
                        Match AI project stage with appropriate funding programs
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Build Data Strategy</h4>
                      <p className="text-sm text-gray-600">
                        Demonstrate access to quality training datasets
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Apply & Deploy AI</h4>
                      <p className="text-sm text-gray-600">
                        Submit applications and implement machine learning models
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scale AI Application */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Scale AI Grant Application Process (Up to $5M+)</h2>
                
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Scale AI - AI-Powered Supply Chains Supercluster
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Funding:</strong> Up to $5M+</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Coverage:</strong> Up to 50%</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Type:</strong> AI Supply Chain</span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-blue-700">Scale AI Eligibility:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Canadian company with AI capability</li>
                          <li>• Supply chain or logistics application</li>
                          <li>• Consortium of 2+ partners required</li>
                          <li>• Demonstrated AI/ML technical expertise</li>
                          <li>• Clear commercialization pathway</li>
                          <li>• Industry adoption potential</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-purple-700">Application Components:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• AI solution description and innovation</li>
                          <li>• Supply chain impact quantification</li>
                          <li>• Machine learning model architecture</li>
                          <li>• Data strategy and training datasets</li>
                          <li>• Commercialization and adoption plan</li>
                          <li>• AI talent and team capabilities</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CDAP AI Tools */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">CDAP AI Tools & Digital Adoption Funding</h2>
                
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center">
                      <Code className="w-5 h-5 mr-2" />
                      Canada Digital Adoption Program for AI
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Grant:</strong> $15K + $100K Loan</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Type:</strong> Digital Tools</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Focus:</strong> AI Adoption</span>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                      <h4 className="font-bold mb-2 text-purple-800">AI Tools Eligible for CDAP Funding:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-700">
                        <div>
                          <p><strong>AI-Powered Business Tools:</strong></p>
                          <ul className="ml-4 space-y-1">
                            <li>• AI chatbots and customer service automation</li>
                            <li>• Predictive analytics platforms</li>
                            <li>• AI-powered CRM systems</li>
                            <li>• Computer vision quality control</li>
                          </ul>
                        </div>
                        <div>
                          <p><strong>Machine Learning Platforms:</strong></p>
                          <ul className="ml-4 space-y-1">
                            <li>• Cloud-based ML development tools</li>
                            <li>• AI model deployment platforms</li>
                            <li>• Natural language processing APIs</li>
                            <li>• Recommendation engine systems</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-purple-700">CDAP Application Steps:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Apply online through CDAP portal</li>
                          <li>• Work with approved digital advisor</li>
                          <li>• Develop digital adoption plan ($15K)</li>
                          <li>• Apply for implementation loan ($100K)</li>
                          <li>• Deploy AI tools and track ROI</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">AI Adoption Benefits:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Fast application approval (2-4 weeks)</li>
                          <li>• Interest-free loan for AI tools</li>
                          <li>• Expert digital advisor support</li>
                          <li>• Youth talent hiring funding available</li>
                          <li>• No equity dilution required</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* IRAP AI Projects */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">IRAP Machine Learning & AI Development Funding</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">AI R&D Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                          <div>
                            <strong>Funding Amount</strong>
                            <p className="text-sm text-gray-600">Up to $500K non-repayable</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                          <div>
                            <strong>Coverage Rate</strong>
                            <p className="text-sm text-gray-600">60-80% of AI development costs</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                          <div>
                            <strong>Project Types</strong>
                            <p className="text-sm text-gray-600">Deep learning, NLP, computer vision</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                          <div>
                            <strong>Advisor Support</strong>
                            <p className="text-sm text-gray-600">Industrial Technology Advisor included</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Eligible AI Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Machine Learning Algorithms</strong>
                            <p className="text-sm text-gray-600">Custom ML model development</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Computer Vision Systems</strong>
                            <p className="text-sm text-gray-600">Image recognition and object detection</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Natural Language Processing</strong>
                            <p className="text-sm text-gray-600">Text analysis and conversational AI</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Predictive Analytics</strong>
                            <p className="text-sm text-gray-600">Forecasting and optimization models</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Program Selection Matrix */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">AI Funding Program Selection by Project Stage</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="border border-blue-200 p-3 text-left">AI Project Stage</th>
                        <th className="border border-blue-200 p-3 text-left">Recommended Programs</th>
                        <th className="border border-blue-200 p-3 text-left">Funding Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 p-3">
                          <strong>AI Research & Development</strong>
                          <p className="text-sm text-gray-600">Algorithm development, proof-of-concept</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• IRAP AI Innovation</li>
                            <li>• Mitacs AI partnerships</li>
                            <li>• SR&ED Tax Credits</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$50K - $500K</strong>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3">
                          <strong>AI Tool Adoption</strong>
                          <p className="text-sm text-gray-600">Implementing existing AI platforms</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• CDAP Digital Adoption ($15K + $100K)</li>
                            <li>• Provincial digital grants</li>
                            <li>• Industry-specific AI programs</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$15K - $115K</strong>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-3">
                          <strong>AI Commercialization</strong>
                          <p className="text-sm text-gray-600">Pilot projects and market deployment</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• Scale AI collaborative projects</li>
                            <li>• AI institute partnerships (Mila, Vector, Amii)</li>
                            <li>• Regional AI development funds</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$500K - $5M</strong>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3">
                          <strong>Large-Scale AI Deployment</strong>
                          <p className="text-sm text-gray-600">Enterprise AI transformation</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• Scale AI major initiatives</li>
                            <li>• Strategic Innovation Fund</li>
                            <li>• Provincial AI strategy programs</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$5M - $20M+</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Success Strategies */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Grant Application Success Strategies</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Best Practices</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Clear AI Use Case:</strong> Define specific problem AI solves with quantifiable business impact and ROI metrics</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Robust Data Strategy:</strong> Demonstrate access to quality training data, data governance, and ethical AI practices</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Technical AI Expertise:</strong> Show team has machine learning capabilities, ML engineers, and data scientists</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Commercialization Plan:</strong> Clear path to market with AI product-market fit and scaling strategy</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Mistakes</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Vague AI Application:</strong> Not clearly defining what AI technology does or specific problem it solves</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Poor Data Foundation:</strong> Insufficient training data quality, volume, or lack of data access strategy</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Overpromising AI Capabilities:</strong> Unrealistic expectations about AI performance or timeline</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>No Business Model:</strong> AI technology without clear revenue model or customer acquisition strategy</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official AI Funding Resources</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Government AI Programs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Scale AI</h5>
                          <p className="text-sm text-gray-600">AI-Powered Supply Chains Supercluster</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.scaleai.ca" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">CDAP</h5>
                          <p className="text-sm text-gray-600">Canada Digital Adoption Program</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.ic.gc.ca/cdap" target="_blank" rel="noopener noreferrer">
                            Apply <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">CIFAR Pan-Canadian AI</h5>
                          <p className="text-sm text-gray-600">National AI research strategy</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.cifar.ca/ai" target="_blank" rel="noopener noreferrer">
                            Learn More <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700">Professional AI Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">AI Project Assessment</h5>
                          <p className="text-sm text-gray-600">Free eligibility and program review</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=ai-assessment">
                            Get Assessment
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">AI ROI Calculator</h5>
                          <p className="text-sm text-gray-600">Calculate machine learning ROI</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/tools/ai-roi-calculator">
                            Calculate ROI
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Expert AI Help</h5>
                          <p className="text-sm text-gray-600">Professional AI funding support</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=ai-expert-help">
                            Get Help
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Lead Magnet CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-8 text-white text-center mb-8">
                <Download className="w-16 h-16 mx-auto mb-4 text-blue-100" />
                <h3 className="text-2xl font-bold mb-4">Get Your Free AI Funding Application Kit</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Download our comprehensive AI grants guide with Scale AI templates, CDAP tools, machine learning 
                  project frameworks, and successful AI application examples.
                </p>
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="/download/canada-digital-ai-funding-guide">
                    <Download className="w-5 h-5 mr-2" />
                    Download Free AI Guide
                  </Link>
                </Button>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-purple-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for AI Grants?</h3>
                <p className="text-purple-100 mb-6 text-lg">
                  Our AI funding specialists understand Scale AI, CDAP, and machine learning programs. 
                  We've secured $85M+ in artificial intelligence funding with 79% success rate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
                    <Link href="/contact?service=ai-expert-help">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Expert AI Help
                    </Link>
                  </Button>
                  <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white border-0" asChild>
                    <Link href="/contact?service=ai-assessment">
                      Free AI Project Assessment
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
