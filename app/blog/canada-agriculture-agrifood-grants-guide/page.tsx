import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Wheat, Leaf, Sprout, HelpCircle, TrendingUp, Zap, MapPin, Rocket } from 'lucide-react'
import Link from "next/link"
import type { Metadata } from "next"
import { getBlogPostBySlug } from '@/lib/data/blogPosts'
import EEATBadge from '@/components/blog/EEATBadge'
import LastVerifiedBadge from '@/components/blog/LastVerifiedBadge'
import { GrantSuccessTable } from '@/components/blog/GrantSuccessTable'
import { ExpertTipBox } from '@/components/blog/ExpertTipBox'
import EligibleCheck from '@/components/blog/EligibleCheck'
import ShortAnswerBox from '@/components/blog/ShortAnswerBox'
import InlineCTA from '@/components/blog/InlineCTA'
import AdSlot from '@/components/blog/AdSlot';

export const metadata: Metadata = {
  title: "Canada Agriculture & Agri-Food Grants 2026 | $2.3B+ Agricultural Innovation Funding Programs Guide",
  description: "Complete guide to Canada's agriculture and agri-food grants. Access AgriInnovate, SCAP, Clean Technology programs, and 32+ programs offering $2.3B+ for agricultural excellence.",
  keywords: "Canada agriculture grants, agri-food funding, AgriInnovate program, agricultural clean technology, farm grants Canada 2026",
  openGraph: {
    title: "Canada Agriculture & Agri-Food Grants 2026 | $2.3B+ Agricultural Innovation Funding Guide",
    description: "Complete guide to Canada's agriculture and agri-food grants. Access AgriInnovate, SCAP, Clean Technology programs, and 32+ programs offering $2.3B+ for agricultural excellence.",
    url: "https://grants.finance/blog/canada-agriculture-agrifood-grants-guide",
    siteName: "Grants Finance",
    locale: "en_CA",
    type: "article",
    images: ["/og-image.png"],
  },
}

const faqData = [
  {
    question: "Who is eligible for Canadian agriculture grants?",
    answer: "Eligibility varies by program but generally includes primary producers (farmers, ranchers), food processors, agri-businesses, and agricultural organizations. Most federal programs like AgriInnovate require applicants to be incorporated for-profit organizations in Canada."
  },
  {
    question: "Can I get government funding for farm equipment?",
    answer: "Yes, but usually not for standard replacement. Programs like the Agricultural Clean Technology Program fund equipment that reduces greenhouse gas emissions (e.g., grain dryers, precision agriculture tech). SCAP programs often fund technology adoption that improves productivity."
  },
  {
    question: "What is the Sustainable Canadian Agricultural Partnership (SCAP)?",
    answer: "SCAP is a $3.5 billion, 5-year agreement (2023-2028) between federal, provincial, and territorial governments. It funds programs focused on climate change, sector growth, and public trust. You typically apply through your provincial ministry of agriculture."
  },
  {
    question: "How much funding can getting for agricultural innovation?",
    answer: "AgriInnovate offers repayable contributions up to $10 million per project (max 50% of costs). Smaller provincial SCAP programs might offer non-repayable grants from $5,000 to $100,000 for specific technology adoption or sustainability projects."
  },
  {
    question: "Are there specific grants for young or new farmers?",
    answer: "Yes. Farm Credit Canada (FCC) offers special loans and software. The AgriDiversity Program helps underrepresented groups. Many provincial SCAP programs also offer higher cost-sharing ratios (e.g., 60% vs 50%) for young farmers (under 40)."
  },
  {
    question: "How long does it take to get approved for agriculture grants?",
    answer: "Timelines vary. Provincial SCAP rebates can be quick (4-8 weeks), while major federal programs like AgriInnovate or AgriScience Clusters can take 4-8 months for due diligence and approval. Always apply well before you incur project costs."
  }
]

export default function CanadaAgricultureAgrifoodGrantsGuidePage() {
  // EEAT Data from blogPosts.ts
  const postData = getBlogPostBySlug("canada-agriculture-agrifood-grants-guide");
  const iconMap: Record<string, any> = { DollarSign, Target, TrendingUp, Users, Award, Shield, CheckCircle, Zap, MapPin, Rocket, FileText, Percent: Target, Flag: Target, Gift: Target };

  return (
    <>
      <Header />
      {/* Header Ad */}
      <div className="container mx-auto px-4 py-4">
        <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_HEADER_AD!} adFormat="horizontal" className="mb-6" style={{ minHeight: '90px' }} />
      </div>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌾 Agriculture & Agri-Food Excellence Funding
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Agriculture & Agri-Food Grants Guide
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Access Canada's comprehensive agriculture and agri-food funding ecosystem with $2.3B+ available annually through 32+ federal and provincial programs. From AgriInnovate commercialization to Sustainable CAP initiatives - advance innovation, sustainability, and competitiveness across Canada's $150B agricultural sector.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?category=agriculture-agrifood">
                    Find Your Agriculture Program
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

        {/* EEAT ENRICHMENT COMPONENTS */}
        {postData?.shortAnswer && (
          <section className="py-6 bg-emerald-50 dark:bg-emerald-950/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-emerald-200">
                <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
                  <span className="font-bold text-emerald-700">The Short Answer: </span>
                  {postData.shortAnswer}
                </p>
              </div>
            </div>
          </section>
        )}

        {postData?.eligibleCheck && (
          <section className="py-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <EligibleCheck />
              </div>
            </div>
          </section>
        )}

        {postData?.metrics && (
          <section className="py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <GrantSuccessTable
                  title="Quick Funding Facts"
                  metrics={postData.metrics.map((m: any) => {
                    const IconComponent = (m.iconName && iconMap[m.iconName]) ? iconMap[m.iconName] : Target;
                    return { ...m, icon: <IconComponent className="w-6 h-6" /> };
                  })}
                />
              </div>
            </div>
          </section>
        )}

        {postData?.expertTip && (
          <section className="py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <ExpertTipBox type={postData.expertTip.type} title={postData.expertTip.title}>
                  <div dangerouslySetInnerHTML={{ __html: postData.expertTip.content }} />
                </ExpertTipBox>
              </div>
            </div>
          </section>
        )}

        <section className="py-2">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date={postData?.date || "2025-12-01"} />
            </div>
          </div>
        </section>

        {/* In-Content Horizontal Ad */}
        <div className="container mx-auto px-4 py-4">
          <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_HORIZONTAL!} adFormat="horizontal" style={{ minHeight: '120px', width: '100%' }} />
        </div>



        {/* Common Questions Section */}
        <section className="py-12 bg-green-50 border-b border-green-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About Agriculture Grants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-green-700">Who is eligible for agriculture grants?</h3>
                  <p className="text-sm text-gray-600 mt-1">Farmers, processors, and agri-businesses.</p>
                </a>
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-green-700">What is the SCAP program?</h3>
                  <p className="text-sm text-gray-600 mt-1">$3.5B partnership for industry growth.</p>
                </a>
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-green-700">How do I apply for AgriInnovate?</h3>
                  <p className="text-sm text-gray-600 mt-1">Funding for commercialization & adoption.</p>
                </a>
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-green-700">Are there grants for clean farming?</h3>
                  <p className="text-sm text-gray-600 mt-1">Support for low-carbon technologies.</p>
                </a>
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-green-700">How much funding can I get?</h3>
                  <p className="text-sm text-gray-600 mt-1">Up to $5M for major innovation projects.</p>
                </a>
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-green-700">Is there funding for new farmers?</h3>
                  <p className="text-sm text-gray-600 mt-1">Programs for youth and startups available.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Agriculture Funding Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$2.3B+</div>
                  <div className="text-gray-600">Annual Agriculture Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">32+</div>
                  <div className="text-gray-600">Active Agriculture Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$5M</div>
                  <div className="text-gray-600">Maximum Project Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">7%</div>
                  <div className="text-gray-600">of Canada's GDP</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Canada as Agricultural Innovation Leader</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Canada's agriculture and agri-food industry generates approximately $150 billion annually, representing 7% of the country's GDP and employing over 2.1 million Canadians. With over $2.3 billion available through 32+ specialized programs, Canada provides comprehensive support for agricultural innovation, sustainability, food processing, and market development. From the $3.5B Sustainable Canadian Agricultural Partnership to AgriInnovate's $5M commercialization support, Canada leads global agricultural excellence.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-green-800">Agricultural Policy Priorities</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Agricultural innovation and technology commercialization</li>
                      <li>• Sustainable farming practices and climate resilience</li>
                      <li>• Food processing and value-added product development</li>
                      <li>• Export market development and international competitiveness</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Strategic Agricultural Integration</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Federal-provincial agricultural partnership coordination</li>
                      <li>• Research institution and industry collaboration</li>
                      <li>• Sustainable food system development initiatives</li>
                      <li>• Indigenous agricultural development and food sovereignty</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Agriculture Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Agriculture & Agri-Food Programs</h2>

              <div className="space-y-8">
                {/* Sustainable Canadian Agricultural Partnership */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Sustainable Canadian Agricultural Partnership (SCAP)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$3.5B Framework</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>2023-2028</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Comprehensive</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>All Sectors</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Canada's flagship agricultural policy framework providing $3.5 billion over five years (2023-2028) to strengthen competitiveness, innovation, and resiliency across agriculture, agri-food, and agri-based product sectors.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Program Pillars:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Strengthening competitiveness:</strong> Market development and productivity</li>
                          <li>• <strong>Building resilience:</strong> Risk management and adaptation</li>
                          <li>• <strong>Delivering sustainability:</strong> Environmental stewardship</li>
                          <li>• <strong>Supporting growth:</strong> Innovation and diversification</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">2026 Applications Open:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Federal programming through AAFC</li>
                          <li>• Provincial cost-shared programs</li>
                          <li>• Business risk management programs</li>
                          <li>• Multi-year strategic initiatives</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Recipients:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Primary agricultural producers</li>
                          <li>• Agri-food processors and manufacturers</li>
                          <li>• Agricultural organizations and cooperatives</li>
                          <li>• Research institutions and universities</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AgriInnovate Program */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Wheat className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">AgriInnovate Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Commercialization</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>50% Funding</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>For-Profit</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal program driving innovation in agricultural and agri-food sectors through repayable contributions up to $5M (50% project costs) for commercialization, demonstration, and adoption of ready-to-market technologies.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Program Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Commercialization:</strong> Market-ready innovation deployment</li>
                          <li>• <strong>Demonstration:</strong> Pilot projects and validation studies</li>
                          <li>• <strong>Adoption:</strong> Technology transfer and implementation</li>
                          <li>• <strong>Scale-up:</strong> Production capacity expansion</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Eligible Activities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Agricultural technology commercialization</li>
                          <li>• Food processing innovation and equipment</li>
                          <li>• Sustainable production system development</li>
                          <li>• Value-added product development and marketing</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Agricultural Clean Technology Program */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Leaf className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">Agricultural Clean Technology Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $2M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Clean Tech</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Low-Carbon</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>All Entities</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal program supporting transition to low-carbon economy with up to $2M for research, development, demonstration, and commercialization of clean technology solutions in agriculture and agri-food sectors.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Technology Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Precision agriculture and smart farming</li>
                          <li>• Renewable energy systems for farms</li>
                          <li>• Greenhouse gas reduction technologies</li>
                          <li>• Soil health and carbon sequestration</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Structure:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>R&D:</strong> Non-repayable contributions</li>
                          <li>• <strong>Commercialization:</strong> Repayable contributions</li>
                          <li>• <strong>Scale-up:</strong> Mixed funding approaches</li>
                          <li>• <strong>Timeline:</strong> Multi-year project support</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Recipients:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• For-profit organizations and processors</li>
                          <li>• Not-for-profit organizations and co-ops</li>
                          <li>• Indigenous groups and communities</li>
                          <li>• Research institutions and universities</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Supply Management Processing Investment Fund */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Supply Management Processing Investment Fund (SMPIF)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $10M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Processing</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>50% Funding</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Supply Managed</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Specialized program addressing international trade agreement impacts on dairy, poultry, and egg processing sectors with up to $10M (dairy) or $5M (poultry/egg) for automated equipment and technology investments.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-purple-700">Funding Tiers:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Dairy Processors:</strong> Up to $10M per application</li>
                          <li>• <strong>Poultry Primary:</strong> Up to $5M per application</li>
                          <li>• <strong>Poultry Further Processing:</strong> Up to $5M per application</li>
                          <li>• <strong>Hatcheries & Egg Processors:</strong> Up to $5M per application</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Program Objectives:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Productivity and efficiency improvements</li>
                          <li>• Product quality enhancement</li>
                          <li>• Labour cost reduction and shortage mitigation</li>
                          <li>• Automation adoption acceleration</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AgriScience Program */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Sprout className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">AgriScience Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Research</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>50% Funding</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Pre-Commercial</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Non-repayable funding up to $5M (50% project costs) supporting pre-commercial scientific research and innovation activities advancing Canada's agriculture and agri-food sector competitiveness and sustainability.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Research Priorities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Climate change adaptation and mitigation</li>
                          <li>• Sustainable production systems</li>
                          <li>• Food safety and security innovations</li>
                          <li>• Value-added processing technologies</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Organizations:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Universities and research institutions</li>
                          <li>• For-profit organizations</li>
                          <li>• Not-for-profit organizations</li>
                          <li>• Provincial research organizations</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Application Process:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Rolling intake with competitive evaluation</li>
                          <li>• Peer review and expert assessment</li>
                          <li>• Federal-provincial information sharing</li>
                          <li>• Multi-year project timelines supported</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Local Food Infrastructure Fund */}
                <Card className="border-pink-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-pink-600 mr-3" />
                      <CardTitle className="text-pink-700">Local Food Infrastructure Fund (LFIF)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$25K - $500K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Food Security</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Community</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Equity Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Program supporting community food security through infrastructure and equipment purchases ($42.7M total) with priority for equity-deserving groups, particularly Indigenous and Black communities.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-pink-700">Program Components:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Small Scale:</strong> $25K-$100K single community projects</li>
                          <li>• <strong>Large Scale:</strong> $150K-$500K multi-partnership projects</li>
                          <li>• <strong>Production Element:</strong> Required for all projects</li>
                          <li>• <strong>Timeline:</strong> Program ends March 31, 2027</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Priority Communities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Indigenous communities and organizations</li>
                          <li>• Black communities and organizations</li>
                          <li>• Other equity-deserving groups</li>
                          <li>• Rural and remote communities</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CAAIN Innovation Programs */}
                <Card className="border-indigo-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700">CAAIN Innovation Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$2M - $3M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Innovation</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Max $600K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Sector Specific</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Canadian Agri-Food Automation and Intelligence Network offering four 2026 funding competitions across specialized agricultural sectors with total funding up to $9M.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-indigo-700">2026 Funding Competitions:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Broadacre Farming:</strong> $3M total, max $600K per project</li>
                          <li>• <strong>Small Acre Farming:</strong> $2M total, max $500K per project</li>
                          <li>• <strong>Primary Processing:</strong> $2M total, max $500K per project</li>
                          <li>• <strong>Livestock Innovation:</strong> $2M total, max $500K per project</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Controlled environment agriculture</li>
                          <li>• Automation and robotics applications</li>
                          <li>• Data analytics and artificial intelligence</li>
                          <li>• Precision agriculture technologies</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Agriculture Application Strategy Framework */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Agriculture Funding Strategy Framework</h2>

              <div className="space-y-6">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Agricultural Excellence Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Multi-Program Agricultural Approach:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Combine SCAP framework with specialized programs</li>
                          <li>• Stack innovation and sustainability funding</li>
                          <li>• Leverage provincial agricultural supports</li>
                          <li>• Access sector-specific initiatives (dairy, livestock, crops)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Innovation Priority Areas:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Sustainable production and climate adaptation</li>
                          <li>• Technology adoption and precision agriculture</li>
                          <li>• Value-added processing and product development</li>
                          <li>• Export market development and competitiveness</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Agricultural Competitiveness Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Innovation Impact Demonstration:</strong> Show clear advancement in productivity, sustainability, food security, or market competitiveness
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Sustainability Integration:</strong> Demonstrate environmental stewardship, climate adaptation, and sustainable practice adoption
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Knowledge Transfer and Collaboration:</strong> Partner with research institutions, industry associations, and supply chain partners
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Market Development Strategy:</strong> Show how investments enable growth, value creation, and export market expansion
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Canada's $2.3B+ Agriculture Funding Ecosystem?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Get our complete agriculture funding strategy guide or work with our agri-food specialists who have secured over $12M in agricultural grants with 92% success rate across all major programs.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Agriculture Approach</h4>
                  <p className="text-green-100 text-sm mb-4">
                    Get our comprehensive agriculture funding guide with program-specific templates and strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-green-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/canada-agri-food-funding-guide">
                      <Download className="w-4 h-4 mr-2" />
                      Get Agriculture Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Agriculture Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with agri-food specialists who have secured $12M+ with 92% success rate across SCAP, AgriInnovate, and provincial programs.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=agriculture-expert-help">
                      Get Agriculture Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-green-200 text-sm mt-6">
                92% success rate for agriculture applications • Average funding secured: $385K • Multi-program expertise
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                      <HelpCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 ml-9">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Agriculture & Business Guides</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-left">
                    <h4 className="font-bold text-lg mb-2 flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-2" />
                      Manufacturing Grants
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Explore funding for food processing and manufacturing innovation.
                    </p>
                    <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50" asChild>
                      <Link href="/blog/canada-manufacturing-industry-grants-guide">Read Guide</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-left">
                    <h4 className="font-bold text-lg mb-2 flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-2" />
                      Clean Tech Funding
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Grants for sustainable farming practices and clean technology adoption.
                    </p>
                    <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50" asChild>
                      <Link href="/blog/clean-tech-energy-grants">Read Guide</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div >
      {/* Bottom Ad */}
      <div className="container mx-auto px-4 py-4">
        <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_RECTANGLE!} adFormat="rectangle" style={{ minHeight: '250px' }} />
      </div>
      <Footer />

      {/* FAQ Schema for Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          })
        }}
      />

    </>
  )
}
