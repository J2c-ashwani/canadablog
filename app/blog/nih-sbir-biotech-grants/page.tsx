import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Heart, Lightbulb, Sparkles, MapPin, Globe, Rocket, HelpCircle, Zap } from 'lucide-react'
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

export const metadata: Metadata = {
  title: "NIH SBIR Biotech Grants 2026-2027 | $285K Phase I, $2M Phase II Medical Device & Digital Health Funding",
  description: "NIH awards $1.2B/year in SBIR/STTR grants. Phase I: $285K, Phase II: $2M. Get the exact submission windows and review criteria for biotech startups.",
  keywords: "NIH SBIR grants 2026, biotech grants, medical device funding, digital health SBIR, therapeutics grants, diagnostics funding, NIH innovation grants",
  openGraph: {
    title: "NIH SBIR Grants 2026 | $285K-$2M Biotech Funding",
    description: "Complete guide to NIH SBIR/STTR grants for biotech and health tech startups.",
    url: "https://www.fsidigital.ca/blog/nih-sbir-biotech-grants",
    images: ["/og-image.png"],
  },
}

export default function NIHSBIRBiotechGrantsPage() {
  // EEAT Data from blogPosts.ts
  const postData = getBlogPostBySlug("nih-sbir-biotech-grants");
  const iconMap: Record<string, any> = { DollarSign, Target, TrendingUp, Users, Award, Shield, CheckCircle, Zap, MapPin, Rocket, FileText, Percent: Target, Flag: Target, Gift: Target };

  const faqData = [
    {
      question: "What is the NIH SBIR Phase I funding amount?",
      answer: "NIH SBIR Phase I awards generally range up to $305,480 (with waivers) for a 6-12 month period. This funding supports feasibility studies and proof-of-concept work."
    },
    {
      question: "What are 'Specific Aims'?",
      answer: "The 'Specific Aims' page is the most critical part of your application. It is a one-page summary of your project goals, expected outcomes, and impact. If reviewers don't like this page, the rest may not matter."
    },
    {
      question: "Does NIH offer a Direct-to-Phase II option?",
      answer: "Yes. If you have already performed Phase I-equivalent work (and have the data to prove it), you can bypass Phase I and apply directly for a Phase II award (up to $2M)."
    },
    {
      question: "What is the Fast-Track application?",
      answer: "Fast-Track allows you to submit both Phase I and Phase II proposals simultaneously. If approved, Phase II funding is triggered automatically after successful completion of Phase I milestones, eliminating the funding gap."
    },
    {
      question: "Who reviews NIH SBIR applications?",
      answer: "Applications are reviewed by Scientific Review Groups (Study Sections) composed of external scientists and industry experts, not NIH staff. They score based on Significance, Innovation, Approach, and Team."
    },
    {
      question: "What is the difference between SBIR and STTR for NIH?",
      answer: "SBIR allows the small business to do the majority of the work (67% in Phase I). STTR requires a formal partnership with a non-profit research institution (university/lab) which must perform at least 30% of the work."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-700 to-pink-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                💊 NIH SBIR/STTR Biotech Grants 2026-2027
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                NIH SBIR Grants: $285K Phase I, $2M Phase II Non-Dilutive Funding for Biotech, Medical Devices & Digital Health Innovation
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Comprehensive 2026-2027 guide to National Institutes of Health SBIR/STTR grants providing up to $2,000,000
                in non-dilutive funding for therapeutics, biologics, medical devices, diagnostics, and digital health
                platforms. Complete application strategies, eligibility requirements, success rates, and funding timelines
                for Phase I ($285,000) and Phase II ($2,000,000) awards supporting biotech startups across all 50 states.
                NIH SBIR takes no equity, requires no repayment, and funds transformative biomedical research and development
                advancing human health through innovative small business solutions bringing discoveries from bench to bedside[web:161][web:179][web:182].
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
                  <Link href="#nih-programs">
                    View NIH SBIR Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-purple-700" asChild>
                  <Link href="/download/nih-sbir-biotech-guide">
                    Get Application Guide
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


        {/* Geographic SEO Section */}
        <section className="py-12 bg-white border-b-2 border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">NIH SBIR Biotech Grants by Region and Life Sciences Hub (2026-2027 Funding Available)</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Boston/Cambridge Biotech
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Life Sciences Hub:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Cambridge biotech NIH SBIR</li>
                      <li>• Boston therapeutics grants</li>
                      <li>• Kendall Square drug discovery</li>
                      <li>• MIT Harvard spinouts funding</li>
                      <li>• Worcester medical devices</li>
                      <li>• Waltham diagnostics SBIR</li>
                      <li>• Lexington digital health</li>
                    </ul>
                    <p className="mt-3 text-purple-700 font-semibold">200+ NIH awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-pink-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-pink-700 flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      San Francisco Bay Area
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Biotech Innovation:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• SF biotech NIH funding</li>
                      <li>• South San Francisco biopharma</li>
                      <li>• Palo Alto digital health</li>
                      <li>• Stanford medical devices</li>
                      <li>• Berkeley therapeutics</li>
                      <li>• San Diego life sciences</li>
                      <li>• LA precision medicine</li>
                    </ul>
                    <p className="mt-3 text-pink-700 font-semibold">180+ NIH awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Mid-Atlantic Corridor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Health Innovation:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• NYC biotech NIH SBIR</li>
                      <li>• Philadelphia drug development</li>
                      <li>• Baltimore NIH proximity</li>
                      <li>• Research Triangle NC</li>
                      <li>• Pittsburgh medical devices</li>
                      <li>• DC digital health grants</li>
                      <li>• New Jersey biopharma</li>
                    </ul>
                    <p className="mt-3 text-indigo-700 font-semibold">150+ NIH awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Emerging Biotech Hubs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Growing Life Sciences:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Seattle biotech NIH funding</li>
                      <li>• Austin digital health SBIR</li>
                      <li>• Chicago medical devices</li>
                      <li>• Denver precision medicine</li>
                      <li>• Houston therapeutics</li>
                      <li>• Atlanta life sciences</li>
                      <li>• Phoenix health tech</li>
                    </ul>
                    <p className="mt-3 text-blue-700 font-semibold">100+ NIH awards annually</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-6">
                <h3 className="font-bold text-purple-900 mb-3 text-lg">🔥 High-Demand NIH SBIR Biotech Keywords 2026-2027:</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-purple-800">
                  <div>
                    <strong>Program Types:</strong> NIH SBIR Phase I $285K, NIH SBIR Phase II $2M, Fast-Track pilot, STTR research partnerships, non-dilutive biotech funding no equity
                  </div>
                  <div>
                    <strong>Tech Focus:</strong> Therapeutics biologics grants, medical device SBIR, diagnostics funding, digital health platforms, precision medicine, gene therapy, immunotherapy innovation
                  </div>
                  <div>
                    <strong>Application:</strong> NIH SBIR deadlines January April September, eligibility requirements, commercialization plan, clinical validation, FDA pathway strategy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced 2026 Program Updates */}
        <section className="py-8 bg-purple-50 border-b-2 border-purple-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <TrendingUp className="w-6 h-6 text-purple-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-purple-800 mb-2">💊 2026-2027 NIH SBIR Program Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-700">
                        <div>
                          <strong>Phase I Increase:</strong> Maximum Phase I awards $285,000 (highest across federal agencies) for 6-12 months proving biomedical feasibility[web:161][web:179]
                        </div>
                        <div>
                          <strong>Phase II Funding:</strong> Phase II awards up to $2,000,000 for 24 months commercialization development and clinical validation[web:182][web:185]
                        </div>
                        <div>
                          <strong>Total NIH Investment:</strong> $1.2B+ annually funding 500+ biotech startups across 27 NIH institutes targeting critical healthcare needs[web:182][web:186]
                        </div>
                        <div>
                          <strong>No Equity Required:</strong> Non-dilutive funding requiring no equity stake, no repayment supporting biomedical R&D commercialization bench to bedside[web:161][web:179]
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete NIH SBIR/STTR Funding Ecosystem for Biotech Startups</h2>
                <p className="text-lg text-gray-600 mb-4">
                  The National Institutes of Health SBIR/STTR program, also known as NIH Seed Fund, provides non-dilutive
                  grants for research and development of innovative biomedical technologies addressing unmet medical needs.
                  NIH seeks breakthrough innovations in therapeutics, diagnostics, medical devices, and digital health with
                  strong commercialization potential bringing discoveries from laboratories to patients[web:161][web:179][web:182].
                </p>
                <p className="text-lg text-gray-600">
                  Biotech startups can access Phase I funding (up to $285,000) to prove technical feasibility and clinical
                  relevance over 6-12 months, followed by Phase II awards (up to $2,000,000) for product development, clinical
                  validation, and regulatory pathway execution over 24 months. NIH evaluates proposals on scientific merit,
                  innovation, commercial viability, and potential for improving human health across 27 institutes including
                  NCI (cancer), NHLBI (heart/lung), NIAID (infectious disease), NINDS (neurological), NIDDK (diabetes)[web:161][web:185][web:186].
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-purple-600 mb-2">$285K</div>
                  <div className="text-gray-600 font-semibold">Phase I Maximum</div>
                  <div className="text-sm text-gray-500 mt-2">Highest federal SBIR Phase I</div>
                </div>
                <div className="bg-pink-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-pink-600 mb-2">$2M</div>
                  <div className="text-gray-600 font-semibold">Phase II Maximum</div>
                  <div className="text-sm text-gray-500 mt-2">Commercialization 24 months</div>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
                  <div className="text-gray-600 font-semibold">Annual Awards</div>
                  <div className="text-sm text-gray-500 mt-2">Biotech startups funded</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$1.2B</div>
                  <div className="text-gray-600 font-semibold">Annual Investment</div>
                  <div className="text-sm text-gray-500 mt-2">NIH biomedical innovation</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* NIH SBIR/STTR Program Details */}
        <section id="nih-programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">NIH SBIR and STTR Program Details 2026-2027</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Complete breakdown of Phase I, Phase II funding programs with biotech topic areas and application timelines
              </p>

              <div className="space-y-8">
                {/* Phase I Program */}
                <Card className="border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                    <div className="flex items-center mb-2">
                      <Heart className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700 text-2xl">NIH SBIR Phase I - Up to $285,000 Biomedical Technical Feasibility</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-purple-800">Phase I Program Overview</h4>
                        <div className="space-y-3">
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-purple-700 font-bold text-lg">$285,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Project Duration:</span>
                              <span className="text-pink-700 font-bold text-lg">6-12 months</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Success Rate:</span>
                              <span className="text-blue-700 font-bold">~15-20%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-700">Annual Deadlines:</span>
                              <span className="text-indigo-700 font-bold">Jan/Apr/Sep</span>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-2">Phase I Biotech Objectives:</p>
                            <p>• <strong>Scientific Feasibility:</strong> Prove biological mechanism, efficacy, safety at preclinical or early clinical stage</p>
                            <p>• <strong>Clinical Relevance:</strong> Demonstrate technology addresses unmet medical need with clear patient benefit</p>
                            <p>• <strong>Regulatory Pathway:</strong> Identify FDA approval pathway (510k, PMA, IND) and key regulatory milestones</p>
                            <p>• <strong>IP Protection:</strong> File provisional patents protecting innovation before public disclosure</p>
                            <p>• <strong>Market Validation:</strong> Engage physicians, KOLs, payers validating clinical need and reimbursement potential</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase I Success Stories - Biotech</h4>
                        <div className="space-y-4">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-bold text-blue-800 mb-2">💊 Cambridge Drug Discovery - $285K Phase I</p>
                            <p className="text-sm text-gray-700">Massachusetts biotech received NIH Phase I for novel small molecule targeting oncology validated through in vivo tumor regression studies. Partnered with 2 academic medical centers for Phase II clinical preparation.</p>
                            <p className="text-xs text-blue-700 mt-2"><strong>Location:</strong> Cambridge MA | <strong>Tech:</strong> Therapeutics | <strong>Phase II:</strong> Funded $2M</p>
                          </div>

                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="font-bold text-purple-800 mb-2">💊 SF Medical Device - $280K Phase I Grant</p>
                            <p className="text-sm text-gray-700">California medical device startup obtained NIH SBIR Phase I for minimally invasive surgical tool reducing complications 60% validated through cadaver studies. 510k pathway identified with FDA pre-submission meeting completed.</p>
                            <p className="text-xs text-purple-700 mt-2"><strong>Location:</strong> San Francisco CA | <strong>Tech:</strong> Medical Device | <strong>FDA:</strong> 510k pathway</p>
                          </div>

                          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                            <p className="font-bold text-pink-800 mb-2">💊 Boston Diagnostics - $285K Phase I Award</p>
                            <p className="text-sm text-gray-700">Massachusetts diagnostics company secured NIH Phase I for rapid infectious disease test achieving 98% sensitivity/specificity in 15 minutes vs 3-day culture. CLIA waiver pathway with 3 hospital pilot sites committed.</p>
                            <p className="text-xs text-pink-700 mt-2"><strong>Location:</strong> Boston MA | <strong>Tech:</strong> Diagnostics | <strong>Accuracy:</strong> 98% sensitivity</p>
                          </div>

                          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                            <p className="font-bold text-indigo-800 mb-2">💊 Seattle Digital Health - $275K Phase I Funding</p>
                            <p className="text-sm text-gray-700">Washington digital health platform received NIH SBIR for AI-powered remote patient monitoring reducing hospital readmissions 40% validated through 200-patient retrospective study. De novo FDA pathway with CE mark obtained.</p>
                            <p className="text-xs text-indigo-700 mt-2"><strong>Location:</strong> Seattle WA | <strong>Tech:</strong> Digital Health | <strong>Impact:</strong> -40% readmissions</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200 mt-6">
                      <h4 className="font-bold text-lg mb-4 text-purple-800">📍 NIH SBIR Phase I Application Deadlines 2026-2027</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Standard Deadlines:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• <strong>January 5, 2026</strong></li>
                            <li>• <strong>April 5, 2026</strong></li>
                            <li>• <strong>September 5, 2026</strong></li>
                            <li>• <strong>January 5, 2027</strong></li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Review Timeline:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Initial review: 2 months</li>
                            <li>• Council review: 4 months</li>
                            <li>• Award decision: 6-7 months</li>
                            <li>• Project start: Month 8</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Fast-Track Option:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Direct Phase II possible</li>
                            <li>• $50K+ investor commitment</li>
                            <li>• Combined $1.15M funding</li>
                            <li>• Accelerated timeline</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-4 text-center">Visit seed.nih.gov for exact submission dates across 27 NIH institutes[web:161][web:185]</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase II Program */}
                <Card className="border-pink-200">
                  <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100">
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-pink-600 mr-3" />
                      <CardTitle className="text-pink-700 text-2xl">NIH SBIR Phase II - Up to $2,000,000 Biotech Commercialization & Clinical Validation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-pink-800">Phase II Program Overview</h4>
                        <div className="space-y-3">
                          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-pink-700 font-bold text-lg">$2,000,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Typical Award:</span>
                              <span className="text-purple-700 font-bold text-lg">$1,500,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Project Duration:</span>
                              <span className="text-blue-700 font-bold">24 months</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-700">Eligibility:</span>
                              <span className="text-indigo-700 font-bold">Phase I awardees</span>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-2">Phase II Biotech Activities:</p>
                            <ul className="space-y-1 text-sm text-gray-700">
                              <li>• Clinical trials (Phase I/II human studies)</li>
                              <li>• FDA regulatory submissions (IND, IDE, 510k)</li>
                              <li>• Manufacturing scale-up and GMP validation</li>
                              <li>• Reimbursement strategy and health economics</li>
                              <li>• Commercial partnerships and licensing deals</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase II Success Stories</h4>
                        <div className="space-y-4 text-sm">
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="font-bold text-purple-800 mb-2">💎 Boston Therapeutics - $2M Phase II + Series A</p>
                            <p className="text-gray-700">Massachusetts drug company received $2M NIH Phase II for rare disease therapy completing Phase Ib clinical trial. Subsequently raised $15M Series A from top biotech VCs, advancing to Phase II pivotal trial. FDA orphan drug designation obtained.</p>
                            <p className="text-xs text-purple-700 mt-2"><strong>Location:</strong> Boston MA | <strong>Clinical:</strong> Phase II | <strong>Raise:</strong> $15M Series A</p>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-bold text-blue-800 mb-2">💎 SF Medical Device - $1.8M Phase II Award</p>
                            <p className="text-gray-700">California medical device startup obtained $1.8M NIH Phase II for cardiac intervention device completing 50-patient first-in-human study. FDA PMA pathway, CE mark approved, launched Europe generating $5M revenue. Acquired by medical device giant for $85M.</p>
                            <p className="text-xs text-blue-700 mt-2"><strong>Location:</strong> San Francisco CA | <strong>Exit:</strong> $85M acquisition | <strong>Revenue:</strong> $5M</p>
                          </div>

                          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                            <p className="font-bold text-pink-800 mb-2">💎 San Diego Diagnostics - $1.5M Phase II Funding</p>
                            <p className="text-gray-700">California diagnostics company secured $1.5M NIH Phase II for cancer liquid biopsy test achieving 95% sensitivity in 500-patient validation study. CLIA lab certified, serving 20 hospitals, pre-IPO stage with $25M revenue run-rate and Medicare reimbursement approved.</p>
                            <p className="text-xs text-pink-700 mt-2"><strong>Location:</strong> San Diego CA | <strong>Revenue:</strong> $25M ARR | <strong>Status:</strong> Pre-IPO</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* NIH Institutes */}
                <Card className="border-indigo-200">
                  <CardHeader className="bg-gradient-to-r from-indigo-100 to-blue-100">
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700 text-2xl">NIH SBIR Topic Areas Across 27 Institutes 2026-2027</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Major Institutes:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• <strong>NCI:</strong> Cancer therapeutics, diagnostics, immunotherapy</li>
                          <li>• <strong>NHLBI:</strong> Cardiovascular, pulmonary, blood disorders</li>
                          <li>• <strong>NIAID:</strong> Infectious disease, vaccines, immunology</li>
                          <li>• <strong>NINDS:</strong> Neurological disorders, brain health</li>
                          <li>• <strong>NIDDK:</strong> Diabetes, kidney, digestive diseases</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Medical Devices:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• <strong>NIBIB:</strong> Biomedical imaging, medical devices</li>
                          <li>• <strong>NICHD:</strong> Pediatric devices, maternal health</li>
                          <li>• <strong>NEI:</strong> Vision, ophthalmology devices</li>
                          <li>• <strong>NIDCD:</strong> Hearing, communication devices</li>
                          <li>• <strong>NIAMS:</strong> Orthopedic, musculoskeletal devices</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Digital Health:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Remote patient monitoring platforms</li>
                          <li>• AI-powered diagnostics and decision support</li>
                          <li>• Telemedicine and virtual care solutions</li>
                          <li>• Wearable sensors and health tracking</li>
                          <li>• Electronic health records and data analytics</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">NIH SBIR Application Success Strategies 2026-2027</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-purple-200">
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50">
                    <CardTitle className="text-purple-700 text-xl flex items-center">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      ✅ Winning NIH SBIR Application Strategies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Strong Clinical Significance and Unmet Need:</strong>
                          <p className="text-sm text-gray-600 mt-1">Clearly articulate serious health condition, patient population size, current treatment limitations, and how innovation improves outcomes with clinical evidence</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Compelling Preliminary Data:</strong>
                          <p className="text-sm text-gray-600 mt-1">Provide in vitro, in vivo, or clinical pilot data proving mechanism of action, efficacy, safety with statistical significance reducing reviewer skepticism</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Clear FDA Regulatory Strategy:</strong>
                          <p className="text-sm text-gray-600 mt-1">Identify specific FDA pathway (510k, PMA, IND), predicate devices, clinical trial design, endpoints, and timeline to market demonstrating regulatory understanding</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Clinical KOL Engagement and Letters of Support:</strong>
                          <p className="text-sm text-gray-600 mt-1">Include letters from key opinion leader physicians at academic medical centers expressing clinical need and willingness to participate in studies validating market pull</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader className="bg-gradient-to-br from-red-50 to-orange-50">
                    <CardTitle className="text-red-700 text-xl flex items-center">
                      <AlertCircle className="w-6 h-6 mr-3" />
                      ❌ Common NIH SBIR Application Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Weak Clinical Significance:</strong>
                          <p className="text-sm text-gray-600 mt-1">Technology solving minor inconvenience not serious medical condition. NIH funds innovations addressing significant unmet needs improving patient outcomes survival quality of life</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Insufficient Preliminary Data:</strong>
                          <p className="text-sm text-gray-600 mt-1">Purely computational or theoretical proposal without experimental validation. Reviewers need proof of concept data showing technology works before funding further development</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Vague Regulatory Strategy:</strong>
                          <p className="text-sm text-gray-600 mt-1">No FDA pathway identified or unrealistic regulatory assumptions. Must show understanding of device classification, clinical trial requirements, approval timeline specific to technology</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related SBIR Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Explore Other SBIR Programs</h2>
              <p className="text-gray-700 mb-6">NIH is one of 11 agencies offering SBIR/STTR funding. Explore sector-specific guides:</p>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/blog/sbir-sttr-complete-guide" className="p-4 bg-white rounded-lg border hover:border-purple-500 transition-all">
                  <h3 className="font-bold mb-1">SBIR/STTR Overview</h3>
                  <p className="text-sm text-gray-600">Full program guide →</p>
                </Link>
                <Link href="/blog/dod-sbir-defense-tech-grants" className="p-4 bg-white rounded-lg border hover:border-purple-500 transition-all">
                  <h3 className="font-bold mb-1">DoD SBIR</h3>
                  <p className="text-sm text-gray-600">Defense tech →</p>
                </Link>
                <Link href="/blog/doe-sbir-clean-energy-grants" className="p-4 bg-white rounded-lg border hover:border-purple-500 transition-all">
                  <h3 className="font-bold mb-1">DOE SBIR</h3>
                  <p className="text-sm text-gray-600">Clean energy →</p>
                </Link>
                <Link href="/blog/nasa-sbir-space-tech-grants" className="p-4 bg-white rounded-lg border hover:border-purple-500 transition-all">
                  <h3 className="font-bold mb-1">NASA SBIR</h3>
                  <p className="text-sm text-gray-600">Space technology →</p>
                </Link>
                <Link href="/blog/nsf-sbir-grants-technology-startups" className="p-4 bg-white rounded-lg border hover:border-purple-500 transition-all">
                  <h3 className="font-bold mb-1">NSF SBIR</h3>
                  <p className="text-sm text-gray-600">Deep tech →</p>
                </Link>
                <Link href="/blog/usda-sbir-agtech-grants" className="p-4 bg-white rounded-lg border hover:border-purple-500 transition-all">
                  <h3 className="font-bold mb-1">USDA SBIR</h3>
                  <p className="text-sm text-gray-600">AgTech &amp; food →</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">Common Questions About NIH SBIR Grants</h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                      <HelpCircle className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 ml-9">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-700 to-pink-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Access NIH SBIR Funding?
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Get our complete NIH SBIR application guide or work with biotech specialists for expert proposal support.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2 text-lg">📥 Free NIH SBIR Guide</h4>
                  <p className="text-purple-100 text-sm mb-4">
                    Download comprehensive guide with biotech templates and strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-purple-700 hover:bg-gray-100 font-semibold" asChild>
                    <Link href="/download/nih-sbir-biotech-guide">
                      <Download className="w-5 h-5 mr-2" />
                      Download Free Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 backdrop-blur border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2 text-lg">🎯 Expert Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with NIH SBIR specialists for winning biotech proposals.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=nih-sbir-proposal-help">
                      <Users className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      
            {/* CONTENT EXPANSION: Deep Modifier Sections for Ranking Lift */}
            <div className="mt-12 space-y-8 not-prose">
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">🎯 Who Qualifies?</h2>
                <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>US biotech/medtech small businesses</strong> under 500 employees</li><li>Must address an <strong>unmet medical need</strong> within NIH's mission areas</li><li><strong>PI qualifications:</strong> Must demonstrate relevant scientific expertise</li><li><strong>Pre-revenue companies welcome</strong> — but preliminary data is critical</li><li><strong>28 NIH Institutes</strong> fund SBIR — match your project to the right one</li></ul>` }} />
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4">📅 Key Deadlines & Application Windows</h2>
                <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Standard dates:</strong> January 5, April 5, September 5 (every year)</li><li><strong>AIDS-related:</strong> January 7, May 7, September 7</li><li><strong>Resubmissions:</strong> Same deadlines — can resubmit to next cycle with revisions</li><li><strong>Review timeline:</strong> ~5 months from submission to funding decision</li></ul>` }} />
              </div>
              <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4">📊 How Competitive Is This?</h2>
                <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: `<p class="text-gray-700 mb-3">NIH SBIR is the <strong>gold standard</strong> — and the most competitive:</p><ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Phase I success:</strong> ~20% (varies by Institute)</li><li><strong>NCI (cancer):</strong> ~18% — most competitive</li><li><strong>NIGMS:</strong> ~25% — slightly better odds</li><li><strong>Resubmissions score higher:</strong> Revised applications have ~35% success</li></ul><p class="text-gray-700 mt-3"><strong>Critical:</strong> Contact the relevant NIH Program Officer BEFORE submitting. They can redirect you to the right Institute and improve your scoring chances.</p>` }} />
              </div>
              <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">🏆 Recent Award Examples</h2>
                <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>NIH SBIR/STTR FY2025:</strong> $1.3B across 1,800+ awards</li><li><strong>Average Phase I:</strong> $275,000 for 6-12 months</li><li><strong>Average Phase II:</strong> $1.5M for 2 years</li><li><strong>Top disease areas funded:</strong> Oncology (24%), neurology (16%), infectious disease (14%), rare diseases (12%)</li></ul>` }} />
              </div>
            </div>
</div>
      <Footer />
    </>
  )
}
