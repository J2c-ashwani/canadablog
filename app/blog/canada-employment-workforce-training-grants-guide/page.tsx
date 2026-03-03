import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, GraduationCap, UserCheck, BrainCircuit, MapPin, Briefcase, HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Employment & Workforce Training Grants 2026 | $1.9B+ Skills Development Funding Programs Guide",
  description: "Complete guide to Canada's employment and workforce training grants. Access Canada Job Grant, Skills Development programs, and 28+ programs offering $1.9B+ for workforce excellence.",
  keywords: "Canada employment grants, workforce training funding, Canada Job Grant, skills development programs, employee training grants Canada 2026",
  openGraph: {
    title: "Canada Employment & Workforce Training Grants 2026 | $1.9B+ Skills Development Funding Guide",
    description: "Comprehensive guide to Canada's employment and workforce training funding ecosystem with 28+ programs offering $1.9B+ for skills development and job creation.",
    url: "https://www.fsidigital.ca/blog/canada-employment-workforce-training-grants-guide",
    images: ["/og-image.png"],
  },
}

const faqData = [
  {
    question: "What is the Canada Job Grant (CJG)?",
    answer: "The CJG is a federal-provincial program that covers 50-100% of training costs for eligible employees. Employers contribute a portion of the cost, and the government reimburses the rest. It's available in most provinces and territories."
  },
  {
    question: "How much funding can I get for hiring a student?",
    answer: "Programs like Canada Summer Jobs (CSJ) and the Student Work Placement Program (SWPP) offer wage subsidies ranging from 50% to 100% of the minimum hourly wage, often up to $5,000-$7,500 per placement."
  },
  {
    question: "Are there grants for hiring apprentices?",
    answer: "Yes, the Apprenticeship Service provides up to $5,000 for hiring a first-year Red Seal apprentice, and up to $10,000 if the apprentice is from an equity-deserving group."
  },
  {
    question: "Can I get funding to train my existing employees?",
    answer: "Yes, the Canada Job Grant and various provincial training programs are specifically designed to upskill existing employees. Training must usually be provided by an eligible third-party trainer."
  }
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}

export default function CanadaEmploymentWorkforceTrainingGrantsGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                👥 Employment & Workforce Excellence Funding
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Employment & Workforce Training Grants Guide
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Access Canada's comprehensive employment and workforce training funding ecosystem with $1.9B+ available annually through 28+ federal and provincial programs. From Canada Job Grant's $194M allocation to provincial skills development initiatives - build workforce capacity, enhance productivity, and drive economic competitiveness across all sectors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?category=employment-training">
                    Find Your Training Program
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/government-grants">
                    Back to All Programs
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Employment Funding Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$1.9B+</div>
                  <div className="text-gray-600">Annual Training Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">28+</div>
                  <div className="text-gray-600">Active Training Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$100K</div>
                  <div className="text-gray-600">Maximum Employer Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">75%</div>
                  <div className="text-gray-600">Maximum Funding Rate</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Canada as Workforce Development Leader</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Canada's workforce development ecosystem represents one of the world's most comprehensive approaches to skills training and employment support, with over $1.9 billion invested annually through 28+ specialized programs. From the Canada Job Grant's $194M national allocation to provincial future skills initiatives, Canada provides unparalleled support for workforce capacity building, skills development, and economic competitiveness across all sectors and regions.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-purple-800">Workforce Policy Priorities</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Skills development and productivity enhancement</li>
                      <li>• Digital transformation and technology adoption</li>
                      <li>• Indigenous employment and inclusive growth</li>
                      <li>• Youth employment and career development</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Strategic Workforce Integration</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Federal-provincial workforce development coordination</li>
                      <li>• Industry-led skills training and certification</li>
                      <li>• Post-secondary education partnership programs</li>
                      <li>• Labour market information and planning integration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Employment Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Employment & Workforce Training Programs</h2>

              <div className="space-y-8">
                {/* Canada Job Grant */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Canada Job Grant (CJG)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$194M Annual</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Skills Training</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>50-100% Funding</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>All Employers</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Canada's flagship workforce development program allocating $194M annually to reduce costs of third-party skills training for new and existing employees through provincial streams across all provinces except Quebec.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Active Provincial Streams:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Canada-Ontario Job Grant (COJG):</strong> Up to $10K per trainee</li>
                          <li>• <strong>Canada-Alberta Job Grant (CAJG):</strong> Up to $10K per trainee</li>
                          <li>• <strong>BC Employer Training Grant:</strong> Up to $5K per trainee</li>
                          <li>• <strong>Saskatchewan, Manitoba, Atlantic:</strong> Various funding levels</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Structure:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Existing employees: 50% employer contribution required</li>
                          <li>• New hires (unemployed): Up to 75-100% funding</li>
                          <li>• Maximum $100K per employer annually</li>
                          <li>• Third-party training provider required</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Training:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Job-relevant skills development</li>
                          <li>• Technical and digital competencies</li>
                          <li>• Industry certifications and credentials</li>
                          <li>• Productivity and business operations</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* StrongerBC Future Skills Grant */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <GraduationCap className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">StrongerBC Future Skills Grant</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $3,500</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Short-Term</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>BC Residents</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>10,000+ Served</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      British Columbia's comprehensive skills development program providing up to $3,500 for short-term training aligned with provincial labour market priorities, serving over 10,000 residents since launch.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">2026/26 Priority Sectors:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Healthcare:</strong> Patient care, medical administration</li>
                          <li>• <strong>Clean Energy:</strong> Renewable energy systems, efficiency</li>
                          <li>• <strong>Construction:</strong> Trades, project management, safety</li>
                          <li>• <strong>Mining:</strong> Operations, safety, environmental stewardship</li>
                          <li>• <strong>Marine Transportation:</strong> Logistics, port operations</li>
                          <li>• <strong>Inclusive Economy:</strong> Accessibility, diversity leadership</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Program Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 300+ programs available across 24 institutions</li>
                          <li>• No financial circumstances requirements</li>
                          <li>• BC Services Card Account required</li>
                          <li>• Early registration encouraged (limited spaces)</li>
                          <li>• Fall 2026 semester programs opening</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Canada-Alberta Productivity Grant */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <UserCheck className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">Canada-Alberta Productivity Grant (CAPG)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$5K - $10K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Productivity</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>50-75% Funding</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Alberta Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Alberta's employer-driven productivity enhancement program providing 50-75% funding (up to $5K-$10K per trainee, $100K per employer annually) for skills training that enhances workforce competitiveness.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Productivity Training Categories:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Business Process & Operations:</strong> Process optimization</li>
                          <li>• <strong>Technical Skills:</strong> Specialized expertise and efficiency</li>
                          <li>• <strong>Digital & Technology:</strong> Digital tools and integration</li>
                          <li>• Training must be job-relevant and instructional</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Structure:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Existing employees: 50% employer, 50% government</li>
                          <li>• Unemployed Albertans: Up to 75% government funding</li>
                          <li>• Maximum $100K per employer per fiscal year</li>
                          <li>• Direct training costs only (no wages)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Employers:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Private sector businesses and partnerships</li>
                          <li>• Non-profit sector organizations</li>
                          <li>• First Nations and Métis Settlements</li>
                          <li>• Must have employees needing training</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Canada Summer Jobs Program */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Canada Summer Jobs Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$343M Budget</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Summer Work</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Youth Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>70,000+ Jobs</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal program providing wage subsidies to help employers create quality summer work experiences for youth aged 15-30, with $343M creating over 70,000 jobs annually.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Program Priorities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Barrier-Facing Youth:</strong> Indigenous, persons with disabilities</li>
                          <li>• <strong>Official Language Minorities:</strong> French/English communities</li>
                          <li>• <strong>Rural and Remote:</strong> Geographic priority areas</li>
                          <li>• <strong>Green Jobs:</strong> Environmental and sustainability focus</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Funding Structure:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 100% of provincial/territorial minimum wage</li>
                          <li>• 6-16 week placements (30+ hours/week)</li>
                          <li>• Not-for-profit and public sector employers</li>
                          <li>• Some private sector in priority communities</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills Development Programs */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <BrainCircuit className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">Sectoral Skills Development Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Multi-Program</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Sector-Specific</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Skills Gap</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Industry-Led</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive suite of sector-specific skills development programs addressing critical labour shortages and skills gaps across Canada's priority economic sectors.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Healthcare Workforce:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Personal Support Worker training programs</li>
                          <li>• Healthcare aide certification</li>
                          <li>• Long-term care specialization</li>
                          <li>• Mental health and addiction services</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Skilled Trades:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Construction and building trades</li>
                          <li>• Electrical and mechanical systems</li>
                          <li>• Welding and fabrication</li>
                          <li>• Apprenticeship support programs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Digital Economy:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Information technology and cybersecurity</li>
                          <li>• Data analytics and artificial intelligence</li>
                          <li>• Digital marketing and e-commerce</li>
                          <li>• Software development and programming</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Indigenous Employment Programs */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-amber-600 mr-3" />
                      <CardTitle className="text-amber-700">Indigenous Employment & Training Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$408M Annual</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Indigenous Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Comprehensive</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Community-Led</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive Indigenous employment and training ecosystem with $408M annually supporting First Nations, Inuit, and Métis communities through culturally appropriate skills development and employment programs.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-amber-700">Major Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Indigenous Skills and Employment Training (ISET):</strong> Community-controlled delivery</li>
                          <li>• <strong>First Nations Job Fund:</strong> Economic development partnerships</li>
                          <li>• <strong>Skills and Partnership Fund:</strong> Large-scale training initiatives</li>
                          <li>• <strong>Aboriginal Skills and Employment Training Strategy:</strong> Regional programs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Program Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Cultural competency and traditional knowledge</li>
                          <li>• Community economic development</li>
                          <li>• Major project workforce development</li>
                          <li>• Youth employment and education pathways</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Employment Application Strategy Framework */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Employment Funding Strategy Framework</h2>

              <div className="space-y-6">
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Workforce Excellence Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Multi-Program Employment Approach:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Combine federal and provincial training programs</li>
                          <li>• Stack employer and individual funding streams</li>
                          <li>• Leverage sector-specific initiatives</li>
                          <li>• Access regional and community-based supports</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Skills Development Priorities:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Digital literacy and technology adoption</li>
                          <li>• Industry-specific technical competencies</li>
                          <li>• Productivity and operational excellence</li>
                          <li>• Leadership and professional development</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Employment Success Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Skills Gap Analysis:</strong> Demonstrate clear identification of workforce needs and how training addresses productivity and competitiveness gaps
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Industry Alignment:</strong> Show how training aligns with labour market demands and economic development priorities
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Quality Training Providers:</strong> Partner with certified, reputable training institutions and program providers
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Measurable Outcomes:</strong> Define clear employment, retention, and productivity improvement metrics
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Accordion type="single" collapsible key={index}>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-medium text-blue-700">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Related Government Grant Guides</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blog/canada-hiring-training-grants-guide" className="block group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    <Users className="w-8 h-8 text-blue-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Hiring & Training Grants</h3>
                      <p className="text-sm text-gray-500">Subsidies for new hires</p>
                    </div>
                  </div>
                </Link>
                <Link href="/blog/canada-startup-funding-grants-guide" className="block group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    <Briefcase className="w-8 h-8 text-purple-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Startup Funding</h3>
                      <p className="text-sm text-gray-500">Capital for new businesses</p>
                    </div>
                  </div>
                </Link>
                <Link href="/blog/small-business-grants-complete-guide" className="block group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    <MapPin className="w-8 h-8 text-green-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Small Business Grants</h3>
                      <p className="text-sm text-gray-500">Comprehensive funding guide</p>
                    </div>
                  </div>
                </Link>
                <Link href="/blog/ontario-business-grants-guide" className="block group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    <MapPin className="w-8 h-8 text-red-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Ontario Business Grants</h3>
                      <p className="text-sm text-gray-500">Regional funding opportunities</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Related Government Grant Guides</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blog/canada-hiring-training-grants-guide" className="block group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    <Users className="w-8 h-8 text-blue-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Hiring & Training Grants</h3>
                      <p className="text-sm text-gray-500">Subsidies for new hires</p>
                    </div>
                  </div>
                </Link>
                <Link href="/blog/canada-startup-funding-grants-guide" className="block group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    <Briefcase className="w-8 h-8 text-purple-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Startup Funding</h3>
                      <p className="text-sm text-gray-500">Capital for new businesses</p>
                    </div>
                  </div>
                </Link>
                <Link href="/blog/small-business-grants-complete-guide" className="block group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    <MapPin className="w-8 h-8 text-green-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Small Business Grants</h3>
                      <p className="text-sm text-gray-500">Comprehensive funding guide</p>
                    </div>
                  </div>
                </Link>
                <Link href="/blog/ontario-business-grants-guide" className="block group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    <MapPin className="w-8 h-8 text-red-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Ontario Business Grants</h3>
                      <p className="text-sm text-gray-500">Regional funding opportunities</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Canada's $1.9B+ Employment Training Ecosystem?
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Get our complete employment funding strategy guide or work with our workforce development specialists who have secured over $8M in training grants with 94% success rate across all major programs.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Training Approach</h4>
                  <p className="text-purple-100 text-sm mb-4">
                    Get our comprehensive employment funding guide with program-specific templates and strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-purple-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/apply-federal-grants">
                      <Download className="w-4 h-4 mr-2" />
                      Get Training Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Training Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with workforce specialists who have secured $8M+ with 94% success rate across Canada Job Grant and provincial programs.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=employment-training-expert-help">
                      Get Training Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-purple-200 text-sm mt-6">
                94% success rate for training applications • Average funding secured: $28K • Multi-program expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
