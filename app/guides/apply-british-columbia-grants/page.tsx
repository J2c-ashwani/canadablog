import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Shield, Award, TrendingUp, Mountain, MessageCircle, HelpCircle, ExternalLink, Lightbulb, ArrowRight, Zap, Globe, Leaf } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BC Business Grants 2025: Complete Application Guide | Innovate BC, CleanBC, Creative BC",
  description: "Complete step-by-step guide to applying for British Columbia business grants and provincial funding. Get BC application templates, provincial strategies, and frameworks for Innovate BC, CleanBC, and Creative BC programs.",
  keywords: "British Columbia business grants, BC provincial funding, Innovate BC application, CleanBC funding, Creative BC grants, how to apply BC government grants",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-british-columbia-grants",
  },
  openGraph: {
    title: "British Columbia Business Grants Application Guide 2025",
    description: "Step-by-step guide with templates and strategies for successful BC provincial funding applications.",
    url: "https://www.fsidigital.ca/guides/apply-british-columbia-grants",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Innovate BC and who is eligible?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Innovate BC is the provincial agency supporting technology commercialization. Eligible applicants include BC-based tech companies at various stages, from early-stage to scale-ups. Programs cover accelerators, market entry, and collaborative R&D initiatives."
      }
    },
    {
      "@type": "Question",
      "name": "How does CleanBC funding work for businesses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CleanBC offers various incentives for businesses adopting clean technologies or reducing emissions. This includes rebates for electric vehicles, building retrofits, and industrial emission reduction projects. Funding varies by project type and emission reduction potential."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the BC grant application process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The timeline varies: Innovate BC accelerator programs take 8-12 weeks; CleanBC rebates can be processed in 4-8 weeks; and larger Creative BC or Manufacturing Jobs Fund applications typically take 10-16 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "What is the BC Manufacturing Jobs Fund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The BC Manufacturing Jobs Fund supports capital investments in manufacturing facilities, equipment modernization, and productivity improvements. It provides grants covering up to 25% of eligible project costs, with maximum funding of $5 million per project."
      }
    },
    {
      "@type": "Question",
      "name": "Can I combine BC provincial grants with federal funding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! BC businesses frequently stack provincial funding with federal programs like IRAP, SR&ED, and PacifiCan (the federal regional development agency for BC). This is encouraged and can significantly increase total funding."
      }
    },
    {
      "@type": "Question",
      "name": "What is Creative BC and what sectors does it support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Creative BC supports film, TV, music, publishing, and interactive digital media. They administer tax credits and provide development funding for production companies, game developers, and other creative industry businesses operating in British Columbia."
      }
    }
  ]
}

export default function BritishColumbiaBusinessGrantsGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🏔️ Pacific Province Business Funding Guide 2025
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                How to Apply for British Columbia Business Grants
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed text-pretty">
                Step-by-step guide to successfully applying for BC provincial business grants and funding.
                Complete with program-specific templates, provincial compliance strategies, and proven application frameworks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="#programs">
                    View Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-blue-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="#timeline">
                    See Timeline
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm/50">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
              <span className="font-semibold text-gray-900 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
                Common Questions:
              </span>
              <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link href="#innovate-bc" className="hover:text-blue-600 transition-colors">Innovate BC?</Link>
                <Link href="#cleanbc" className="hover:text-blue-600 transition-colors">CleanBC Funding?</Link>
                <Link href="#timeline" className="hover:text-blue-600 transition-colors">How Long?</Link>
                <Link href="#eligibility" className="hover:text-blue-600 transition-colors">Who Qualifies?</Link>
                <Link href="#faq" className="hover:text-blue-600 transition-colors">FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">6-14 Weeks</div>
                  <div className="text-gray-600">Average Application Process</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">40+ Programs</div>
                  <div className="text-gray-600">BC Provincial Streams</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$5M Max</div>
                  <div className="text-gray-600">Manufacturing Jobs Fund</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">Asia-Pacific</div>
                  <div className="text-gray-600">Gateway Advantage</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

              {/* Understanding BC's Funding Ecosystem */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How does the BC funding ecosystem work?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  British Columbia operates a distinctive funding ecosystem shaped by its position as Canada's Pacific Gateway
                  and its strong commitment to clean technology and sustainability. Unlike Ontario's fragmented system or Quebec's
                  centralized model, BC combines sector-focused agencies with cross-cutting sustainability requirements.
                </p>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Mountain className="w-8 h-8 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">The BC Advantage: CleanBC + Asia-Pacific</h4>
                      <p className="text-blue-800 leading-relaxed">
                        BC offers unique advantages: generous CleanBC incentives for sustainable business practices, and
                        strong support for Asia-Pacific market expansion. Companies that align with both priorities often
                        access multiple funding streams simultaneously.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Funding Agencies in British Columbia</h3>

                <div className="space-y-4">
                  <div id="innovate-bc" className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Innovate BC</h4>
                      <Badge variant="secondary">Tech/Innovation</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Technology commercialization hub offering accelerators, market entry support, and collaborative R&D funding for BC tech companies.</p>
                  </div>
                  <div id="cleanbc" className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">CleanBC Programs</h4>
                      <Badge variant="secondary">Sustainability</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Cross-ministry initiative offering rebates, incentives, and funding for emission reduction, clean technology adoption, and energy efficiency.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Creative BC</h4>
                      <Badge variant="secondary">Creative Industries</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Supports film, TV, music, publishing, and interactive digital media with tax credits and project funding.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">BC Manufacturing Jobs Fund</h4>
                      <Badge variant="secondary">Manufacturing</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Capital investment support for manufacturing facilities, equipment modernization, and productivity improvements.</p>
                  </div>
                </div>
              </div>

              {/* Top BC Programs */}
              <div id="programs" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What are the top BC grant programs?</h2>

                <div className="space-y-6">
                  {/* Innovate BC Programs */}
                  <div className="border border-blue-200 rounded-lg p-6 bg-blue-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-blue-700 flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Innovate BC Programs
                      </h3>
                      <Badge className="bg-blue-100 text-blue-800">Tech Focus</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      BC's primary technology commercialization agency. Offers accelerator programs, market entry support,
                      and collaborative R&D funding for tech companies at various growth stages.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Program Streams:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-blue-500" /> Ignite (Tech Accelerator)</li>
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-blue-500" /> New Ventures BC Competition</li>
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-blue-500" /> BC Tech Market Entry</li>
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-blue-500" /> Venture Acceleration (BCIC)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Ideal Candidates:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li className="flex items-start"><CheckCircle className="w-3 h-3 mr-2 mt-1 text-green-500" /> Tech startups with proven MVP</li>
                          <li className="flex items-start"><CheckCircle className="w-3 h-3 mr-2 mt-1 text-green-500" /> Companies ready to scale</li>
                          <li className="flex items-start"><CheckCircle className="w-3 h-3 mr-2 mt-1 text-green-500" /> R&D-intensive businesses</li>
                          <li className="flex items-start"><CheckCircle className="w-3 h-3 mr-2 mt-1 text-green-500" /> Asia-Pacific market focus</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* CleanBC Programs */}
                  <div className="border border-green-200 rounded-lg p-6 bg-green-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-green-700 flex items-center">
                        <Leaf className="w-5 h-5 mr-2" />
                        CleanBC Business Programs
                      </h3>
                      <Badge className="bg-green-100 text-green-800">Sustainability</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      BC's flagship climate action initiative offers substantial funding for businesses adopting clean
                      technologies, reducing emissions, and improving energy efficiency. Covers EVs, building retrofits,
                      and industrial upgrades.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Key CleanBC Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• CleanBC Go Electric (EV incentives up to $4,000)</li>
                          <li>• Better Buildings (commercial retrofits)</li>
                          <li>• Industrial Electrification</li>
                          <li>• CleanBC Industry Fund</li>
                          <li>• Clean Growth Infrastructure Royalty</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Eligible Activities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Fleet electrification</li>
                          <li>• Building energy efficiency upgrades</li>
                          <li>• Industrial emission reduction</li>
                          <li>• Clean technology adoption</li>
                          <li>• Renewable energy integration</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-green-100 text-sm">
                      <strong className="text-green-800">Pro Tip:</strong> CleanBC incentives can often be combined with
                      federal programs like the Canada Greener Homes Grant. Stack for maximum benefit.
                    </div>
                  </div>

                  {/* Creative BC */}
                  <div className="border border-purple-200 rounded-lg p-6 bg-purple-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-purple-700 flex items-center">
                        <Award className="w-5 h-5 mr-2" />
                        Creative BC
                      </h3>
                      <Badge className="bg-purple-100 text-purple-800">$5K-$500K+</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Provincial agency supporting BC's creative industries including film, TV, music, book publishing,
                      and interactive digital media. Administers tax credits and provides development funding.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Supported Sectors:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Film & Television Production</li>
                          <li>• Music Industry Development</li>
                          <li>• Book Publishing Support</li>
                          <li>• Interactive Digital Media (Games)</li>
                          <li>• Animation & VFX</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Tax Credits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• BC Film Tax Credit (35%)</li>
                          <li>• PSTC (Production Services TC)</li>
                          <li>• DAVE (Digital Animation/VFX)</li>
                          <li>• IDMTC (Interactive Digital Media)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* BC Manufacturing Jobs Fund */}
                  <div className="border border-orange-200 rounded-lg p-6 bg-orange-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-orange-700 flex items-center">
                        <Building className="w-5 h-5 mr-2" />
                        BC Manufacturing Jobs Fund
                      </h3>
                      <Badge className="bg-orange-100 text-orange-800">Up to $5M</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Supports capital investments in manufacturing expansion, equipment modernization, and productivity
                      improvements. Provides grants covering up to 25% of eligible project costs.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-1 text-sm">Eligible Projects</h5>
                        <p className="text-xs text-gray-600">New facilities, equipment upgrades, automation investments</p>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-1 text-sm">Funding Level</h5>
                        <p className="text-xs text-gray-600">Up to 25% of eligible costs, max $5 million</p>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-1 text-sm">Key Requirement</h5>
                        <p className="text-xs text-gray-600">Must create or retain BC manufacturing jobs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Timeline */}
              <div id="timeline" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How long does the BC application process take?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Timeline varies by program type. CleanBC rebates process quickly, while larger Innovate BC or
                  Manufacturing Jobs Fund applications require more extensive due diligence.
                </p>

                <div className="relative border-l-2 border-blue-100 pl-8 ml-4 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">1</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Program Selection & Eligibility</h4>
                    <p className="text-gray-600 mb-2">Week 1-2</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Contact Innovate BC, CleanBC, or sector agency</li>
                      <li>• Complete eligibility pre-screening</li>
                      <li>• Identify best-fit program stream</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">2</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Business Case Development</h4>
                    <p className="text-gray-600 mb-2">Week 2-6</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Prepare BC-focused business plan</li>
                      <li>• Develop CleanBC/sustainability alignment</li>
                      <li>• Document innovation and market potential</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">3</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Application Submission</h4>
                    <p className="text-gray-600 mb-2">Week 6-10</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Complete all application forms</li>
                      <li>• Submit supporting documentation</li>
                      <li>• Respond to clarification requests</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-green-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">4</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Review & Funding Decision</h4>
                    <p className="text-gray-600 mb-2">Week 10-14</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Program staff assessment</li>
                      <li>• Panel/committee review (larger projects)</li>
                      <li>• Funding agreement execution</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left font-semibold text-gray-900">Program</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-900">Typical Timeline</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-900">Key Factor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 px-4 text-gray-700">CleanBC Rebates</td>
                        <td className="py-3 px-4 text-gray-600">4-8 weeks</td>
                        <td className="py-3 px-4 text-gray-500">Documentation completeness</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="py-3 px-4 text-gray-700">Innovate BC Programs</td>
                        <td className="py-3 px-4 text-gray-600">8-12 weeks</td>
                        <td className="py-3 px-4 text-gray-500">Program intake cycles</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-700">Creative BC Tax Credits</td>
                        <td className="py-3 px-4 text-gray-600">6-10 weeks</td>
                        <td className="py-3 px-4 text-gray-500">Production documentation</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="py-3 px-4 text-gray-700">Manufacturing Jobs Fund</td>
                        <td className="py-3 px-4 text-gray-600">10-16 weeks</td>
                        <td className="py-3 px-4 text-gray-500">Project size & complexity</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Eligibility Section */}
              <div id="eligibility" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Who is eligible for BC business grants?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Eligibility varies by program, but most BC grants share common baseline requirements around provincial
                  presence and alignment with BC economic priorities.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-bold text-green-800 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Generally Eligible
                    </h4>
                    <ul className="text-green-700 space-y-2 text-sm">
                      <li>✓ BC-incorporated or federally incorporated with BC operations</li>
                      <li>✓ For-profit businesses (most programs)</li>
                      <li>✓ Businesses with job creation/retention potential</li>
                      <li>✓ Good standing with provincial taxes</li>
                      <li>✓ Alignment with CleanBC or innovation priorities</li>
                      <li>✓ Export potential (for many tech programs)</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 className="font-bold text-red-800 mb-4 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Generally Ineligible
                    </h4>
                    <ul className="text-red-700 space-y-2 text-sm">
                      <li>✗ Businesses with no BC operations</li>
                      <li>✗ Retail-only businesses (some programs)</li>
                      <li>✗ Real estate or passive investment</li>
                      <li>✗ Businesses in arrears with government</li>
                      <li>✗ Projects already started (most capital programs)</li>
                      <li>✗ Non-compliant with environmental regulations</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What are common BC application mistakes?</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Application Killers
                    </h4>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                        <div>
                          <strong>Ignoring CleanBC Alignment</strong>
                          <p className="text-sm text-gray-600">Not addressing sustainability in applications where it's relevant</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                        <div>
                          <strong>Weak Innovation Case</strong>
                          <p className="text-sm text-gray-600">Not demonstrating clear technology differentiation</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                        <div>
                          <strong>Missing Export Potential</strong>
                          <p className="text-sm text-gray-600">Not highlighting Asia-Pacific market opportunity</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-orange-700 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Process Errors
                    </h4>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                        <div>
                          <strong>Starting Projects Early</strong>
                          <p className="text-sm text-gray-600">Beginning work before funding approval</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                        <div>
                          <strong>Wrong Program Selection</strong>
                          <p className="text-sm text-gray-600">Applying to mismatched programs</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                        <div>
                          <strong>Skipping PacifiCan</strong>
                          <p className="text-sm text-gray-600">Not exploring federal/provincial stacking</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQ Block */}
              <div id="faq" className="bg-gray-50 rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">1. What makes BC funding different from other provinces?</h3>
                    <p className="text-gray-600 text-sm">BC uniquely emphasizes CleanBC alignment (sustainability), Asia-Pacific market access, and technology innovation. These three themes appear across most program requirements.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">2. Can I apply to multiple BC programs simultaneously?</h3>
                    <p className="text-gray-600 text-sm">Yes, but you cannot fund the same expenses twice. Different programs can fund different project components. Always disclose all funding sources in applications.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">3. What is PacifiCan and how does it relate to BC programs?</h3>
                    <p className="text-gray-600 text-sm">PacifiCan is the federal regional development agency for BC. Their programs can be stacked with provincial funding for larger total packages. They focus on innovation, clean growth, and community economic development.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">4. Are BC grants taxable income?</h3>
                    <p className="text-gray-600 text-sm">Yes, business grants are generally taxable. Consult with an accountant to understand tax implications and plan accordingly.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">5. How important is Asia-Pacific market potential?</h3>
                    <p className="text-gray-600 text-sm">Very important for many Innovate BC programs. BC positions itself as the Pacific Gateway, so demonstrating export potential to Asian markets strengthens applications significantly.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">6. Does BC support digital adoption?</h3>
                    <p className="text-gray-600 text-sm">Yes. In addition to the federal CDAP, BC organizations like Innovate BC often have specific streams or partnerships to support digital transformation and technology adoption for traditional industries.</p>
                  </div>
                </div>
              </div>

              {/* Neural Network: Related Guides */}
              <div className="border-t border-gray-200 pt-12 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Related Funding Opportunities</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Link href="/guides/apply-ontario-business-grants" className="group block">
                    <div className="bg-white border hover:border-red-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-red-600 font-semibold mb-2">Provincial Peer</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-red-700 mb-2">Ontario Business Grants</h4>
                      <p className="text-sm text-gray-500">Compare BC with Ontario's diverse program ecosystem.</p>
                    </div>
                  </Link>
                  <Link href="/guides/irap-innovation-application-guide" className="group block">
                    <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-purple-600 font-semibold mb-2">Federal Stacking</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">IRAP Grant Guide</h4>
                      <p className="text-sm text-gray-500">Stack BC funding with federal IRAP for R&D projects.</p>
                    </div>
                  </Link>
                  <Link href="/guides/sred-application-guide" className="group block">
                    <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-green-600 font-semibold mb-2">Tax Credits</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-green-700 mb-2">SR&ED Guide</h4>
                      <p className="text-sm text-gray-500">Recover R&D costs with federal and BC tax credits.</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official BC Resources</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-blue-800 text-lg flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Innovate BC
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">Technology commercialization programs, accelerators, and innovation funding.</p>
                      <Button size="sm" variant="outline" className="w-full justify-between" asChild>
                        <Link href="https://www.innovatebc.ca/" target="_blank" rel="noopener noreferrer">
                          Visit Innovate BC <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-green-800 text-lg flex items-center">
                        <Leaf className="w-5 h-5 mr-2" />
                        CleanBC
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">Sustainability incentives, clean technology rebates, and emission reduction funding.</p>
                      <Button size="sm" className="w-full justify-between bg-green-600 hover:bg-green-700 text-white" asChild>
                        <Link href="https://cleanbc.gov.bc.ca/" target="_blank" rel="noopener noreferrer">
                          Visit CleanBC <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Need Help with Your BC Application?</h3>
                <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                  Our BC funding specialists have helped secure over $8M in provincial funding.
                  Get expert guidance through Innovate BC, CleanBC, and Creative BC applications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50 font-semibold" asChild>
                    <Link href="/contact?service=bc-business-expert-help">
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                    <Link href="/grant-finder">
                      Browse All Programs
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
