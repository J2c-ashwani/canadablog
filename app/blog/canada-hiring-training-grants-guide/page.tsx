import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Users, GraduationCap, Briefcase, TrendingUp, Award, UserCheck, BookOpen } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Hiring & Training Grants 2025 | $1.9B+ Workforce Development Across 28+ Programs",
  description: "Complete guide to Canadian hiring and training grants. Access all 28+ workforce development programs including job creation incentives, skills training, wage subsidies, and employee development funding.",
  keywords: "Canada hiring grants, training grants Canada, workforce development funding, job creation incentives, wage subsidies, employee training programs, skills development grants",
}

export default function CanadaHiringTrainingGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                👥 Canadian Hiring & Training Funding
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Canada Hiring & Training Grants 2025
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Access $1.9B+ in Canadian workforce development funding across 28+ specialized programs. From wage subsidies 
                to skills training grants - complete guide to building and training your Canadian workforce.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=hiring-training-grants-expert-help">
                  Get Expert Help with Hiring & Training Grants
                </Link>
              </Button>
              <p className="text-purple-200 text-sm mt-4">
                Free consultation • 88% workforce funding success rate • Average funding: $38K per employee
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
                  <div className="text-3xl font-bold text-purple-600 mb-2">$1.9B+</div>
                  <div className="text-gray-600">Workforce Development Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">28+</div>
                  <div className="text-gray-600">Active Hiring & Training Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">88%</div>
                  <div className="text-gray-600">Expert Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$38K</div>
                  <div className="text-gray-600">Average Per Employee Funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Federal Workforce Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Major Federal Hiring & Training Programs</h2>
              <p className="text-center text-gray-600 mb-12">
                Federal government programs designed to support workforce development, job creation, and employee skills enhancement.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* Canada Job Grant */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Canada Job Grant Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $15K per trainee</strong></span>
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Skills Training</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal-provincial cost-shared program providing funding for employer-sponsored skills training.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Up to 2/3 training costs covered</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Third-party training provider required</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Existing and new employee eligible</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Skills-based and job-specific training</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Youth Employment Strategy */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Youth Employment Strategy (YES)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to 100% wages</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Ages 15-30</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive youth hiring and training support including wage subsidies and skills development.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Youth Employment and Skills Strategy</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Student Work Placement Program</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Career Focus Program</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Green Jobs Program for youth</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Sustainable Jobs Training Fund */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Sustainable Jobs Training Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $8M per project</strong></span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Clean Energy</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Major funding for training workers in sustainable and low-carbon industries and technologies.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Low-carbon workforce development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Clean energy sector training</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Indigenous communities focus</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Remote and northern training delivery</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Canada Retraining and Opportunities Initiative */}
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">Canada Retraining and Opportunities Initiative</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$30M over 2 years</strong></span>
                      </div>
                      <div className="flex items-center">
                        <UserCheck className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Mass Layoffs</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Emergency workforce planning and skills training for communities significantly impacted by mass layoffs.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Community-based retraining projects</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Skills transition support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Economic recovery workforce planning</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Continuous intake application process</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Provincial Workforce Development Programs */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Provincial Hiring & Training Programs</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Ontario Workforce Programs */}
                <Card className="border-2 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700 text-lg">Ontario Workforce Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Canada-Ontario Job Grant</strong> - Up to $15K</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Skills Development Fund</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Ontario Youth Job Program</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Apprenticeship Training Tax Credit</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Second Career Program</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Quebec Workforce Programs */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 text-lg">Quebec Workforce Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Formation en entreprise</strong> - Training grants</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Subvention salariale</strong> - Wage subsidies</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>PARAF</strong> - Foreign credentials recognition</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Programme d'apprentissage</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Mesures de formation</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* BC Workforce Programs */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 text-lg">BC Skills & Training</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Canada-BC Job Grant</strong> - Up to $10K</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>StrongerBC Future Skills Grant</strong> - $3,500</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Indigenous Skills Training</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Sectoral Training Programs</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>CleanBC Workforce Training</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Provincial Programs */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-yellow-700">Prairie Provinces Workforce</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Alberta:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Canada-Alberta Productivity Grant - $10K</li>
                          <li>• Apprenticeship and Industry Training</li>
                          <li>• Skills for Jobs Task Force</li>
                          <li>• Indigenous Skills and Employment</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Saskatchewan:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Canada-Saskatchewan Job Grant</li>
                          <li>• Skills Training Benefit</li>
                          <li>• Apprenticeship Job Creation Incentive</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Manitoba:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Canada-Manitoba Job Grant</li>
                          <li>• Skills Training Incentive Grant</li>
                          <li>• Workplace Education Manitoba</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700">Atlantic & Territories Workforce</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Atlantic Canada:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Nova Scotia Skills Development Program</li>
                          <li>• New Brunswick Training Programs</li>
                          <li>• PEI Workforce Development</li>
                          <li>• Newfoundland Skills Training</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Territories:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• NWT Skills 4 Success Program</li>
                          <li>• Yukon Training Allowance</li>
                          <li>• Nunavut Training Programs</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Industry-Specific Training Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Industry-Specific Training Programs</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Technology & Digital Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Specialized training programs for digital transformation and technology skills development.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Career Ready Work Placement - Up to $7K</li>
                      <li>• Digital Skills Training Programs</li>
                      <li>• Coding Bootcamp Funding</li>
                      <li>• AI & Machine Learning Training</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <GraduationCap className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Healthcare & Life Sciences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Training funding for healthcare workers and life sciences professionals.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Healthcare Skills Training Fund</li>
                      <li>• Personal Support Worker Programs</li>
                      <li>• Medical Technology Training</li>
                      <li>• Health System Capacity Building</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <Briefcase className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Skilled Trades & Manufacturing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Apprenticeship and skilled trades training support programs.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Apprenticeship Training Tax Credits</li>
                      <li>• Red River College Partnership</li>
                      <li>• Pre-Apprenticeship Training</li>
                      <li>• Manufacturing Skills Development</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Wage Subsidies & Employment Incentives */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Wage Subsidies & Employment Incentives</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Youth Employment Subsidies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Wage subsidies for hiring young workers and new graduates.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Up to 100% wage subsidies</li>
                      <li>• 6-12 month placement periods</li>
                      <li>• Student Work Placement Program</li>
                      <li>• Co-op and internship support</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Indigenous Employment Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Specialized hiring incentives for Indigenous workers and communities.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Indigenous Skills and Employment</li>
                      <li>• Cultural competency training</li>
                      <li>• Remote community placement</li>
                      <li>• Traditional knowledge integration</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Persons with Disabilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Employment support and accommodations funding for inclusive hiring.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Workplace accommodation funding</li>
                      <li>• Assistive technology support</li>
                      <li>• Job coaching and support</li>
                      <li>• Inclusive employment programs</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Strong Single CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Build Your Workforce with Expert Navigation of 28+ Training Programs
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Canada's workforce development ecosystem spans federal job grants, provincial training programs, industry-specific 
                skills funding, and specialized employment incentives. Our workforce specialists have helped 400+ Canadian businesses 
                secure over $15M in hiring and training funding with an 88% success rate.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Complete Workforce Development Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>All 28+ program eligibility assessment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Canada Job Grant application optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Multi-provincial program coordination</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Industry-specific training program access</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>88% success rate for workforce funding</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Average $38K per employee funding secured</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=hiring-training-grants-expert-help">
                  Get Expert Help with All Workforce Programs
                </Link>
              </Button>
              <p className="text-purple-200 text-sm mt-4">
                Free consultation • Workforce development specialists • Multi-program expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
