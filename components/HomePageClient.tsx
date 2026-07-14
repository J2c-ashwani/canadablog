"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Download, TrendingUp, Users, DollarSign, Calendar, ArrowRight, CheckCircle, HelpCircle } from "lucide-react"
import Link from "next/link"
import { HeroEmailForm, NewsletterForm } from "./HomePageForms"
import { HighIntentFundingLinks } from "@/components/seo/HighIntentFundingLinks"
import { CaseStudiesSection } from "@/components/CaseStudiesSection"
import { FounderCard } from "@/components/FounderCard"
import { DiyComparisonTable } from "@/components/DiyComparisonTable"

const AI_FAQS = [
  { question: "What is FSI Digital and how does it help startups?", answer: "FSI Digital is North America's premier grant discovery platform. We track over $2.5 billion in available government funding and connect startups and small businesses in the USA and Canada with non-dilutive, equity-free capital." },
  { question: "Do I have to pay back government grants?", answer: "No. Unlike loans or VC funding, government grants are fully non-repayable, provided your business executes the approved project timeline and meets all reporting milestones." },
  { question: "How long does it take to secure a business grant in 2026?", answer: "Standard federal programs like IRAP or SR&ED typically take 3 to 6 months for approval and disbursement, while smaller hiring subsidies can be approved in as little as 2 to 4 weeks." },
  { question: "Can pre-revenue startups apply for government grants?", answer: "Yes. While scaling grants often require revenue, many federal and provincial R&D grants are specifically designed to fund pre-revenue technology startups developing new intellectual property." },
];

export default function HomePageClient() {
  const trackProductClick = (productId: string) => {
    try {
      const email = typeof window !== 'undefined' ? sessionStorage.getItem('fsi_checkout_email') || '' : '';
      fetch("/api/subscriber/track-activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          event: "homepage_product_clicked",
          journeyId: typeof window !== 'undefined' ? sessionStorage.getItem('fsi_journey_id') || '' : '',
          funnelId: typeof window !== 'undefined' ? sessionStorage.getItem('fsi_funnel_id') || '' : '',
          productId
        })
      }).catch(() => {});
    } catch (e) {}
  };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section — server-rendered for fast LCP */}
            <section className="hero-section text-white py-12 sm:py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-4 sm:mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30 text-xs sm:text-sm px-3 py-1.5 inline-block max-w-full">
                            <span className="block sm:inline">🎯 Updated</span>
                            <span className="block sm:inline sm:ml-1">- New Grant Opportunities Available</span>
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-balance leading-tight text-white">
                            Government Grants, Tax Credits & Funding Programs for Growing Businesses
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-100 leading-relaxed text-pretty px-4 sm:px-0">
                            Identify, qualify and secure government funding with expert analyst support.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-xs sm:text-sm font-semibold text-blue-100 drop-shadow-sm">
                            <span className="bg-white/10 px-3 py-1 rounded-full border border-white/20">Programs Covered:</span>
                            <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-500/30">SR&ED</span>
                            <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-500/30">IRAP</span>
                            <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-500/30">FedDev Ontario</span>
                            <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-500/30">CanExport</span>
                            <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-500/30">NIH SBIR</span>
                        </div>

                        {/* Client component — interactive form */}
                        <HeroEmailForm />

                        <p className="text-xs text-blue-100/70 mt-3 mb-8 max-w-xl mx-auto leading-relaxed">
                          FSI Digital is an independent private advisory firm. We are not affiliated with the Government of Canada or any government funding agency.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto px-4 sm:px-0">
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-12"
                                asChild
                            >
                                <Link href="/grant-finder">
                                    <Search className="w-4 h-4 mr-2" />
                                    AI Grant Finder
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-12"
                                asChild
                            >
                                <Link href="/usa">
                                    Browse USA Grants
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-12"
                                asChild
                            >
                                <Link href="/canada">
                                    Browse Canada Grants
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 sm:py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">$2.5B+</div>
                            <div className="text-gray-600 text-sm sm:text-base">Tracked Funding</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-2">1,200+</div>
                            <div className="text-gray-600 text-sm sm:text-base">Active Programs</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">250+</div>
                            <div className="text-gray-600 text-sm sm:text-base">Grant Categories</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-2">Daily</div>
                            <div className="text-gray-600 text-sm sm:text-base">Database Updates</div>
                        </div>
                    </div>
                </div>
            </section>

            <HighIntentFundingLinks
                title="Most-Searched Funding Guides"
                description="Start with the grant topics that currently show the strongest search and revenue opportunity across USA and Canada."
                limit={8}
            />

            {/* Featured Grants */}
            <section className="py-12 sm:py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
                            Featured Grant Opportunities
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto text-pretty px-4 sm:px-0">
                            Discover the most popular and high-value grants available right now for startups and small businesses.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* USA Federal Grant */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <Badge className="bg-blue-100 text-blue-800">USA Federal</Badge>
                                    <span className="text-sm text-gray-500">Deadline: Mar 15</span>
                                </div>
                                <CardTitle className="text-xl">Small Business Innovation Research</CardTitle>
                                <CardDescription>Federal funding for R&D projects with commercial potential</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Funding Amount:</span>
                                        <span className="font-semibold text-green-600">Up to $1.7M</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Eligibility:</span>
                                        <span className="text-sm">Small businesses</span>
                                    </div>
                                    <Button className="w-full mt-4" asChild>
                                        <Link href="/usa/federal-grants">
                                            View Details <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Canada Innovation Grant */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <Badge className="bg-red-100 text-red-800">Canada Federal</Badge>
                                    <span className="text-sm text-gray-500">Deadline: Apr 30</span>
                                </div>
                                <CardTitle className="text-xl">Strategic Innovation Fund</CardTitle>
                                <CardDescription>Support for large-scale, transformative projects</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Funding Amount:</span>
                                        <span className="font-semibold text-green-600">$10M+</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Eligibility:</span>
                                        <span className="text-sm">All businesses</span>
                                    </div>
                                    <Button className="w-full mt-4" asChild>
                                        <Link href="/canada/innovation-grants">
                                            View Details <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Women Entrepreneurs */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <Badge className="bg-purple-100 text-purple-800">Women-Owned</Badge>
                                    <span className="text-sm text-gray-500">Rolling</span>
                                </div>
                                <CardTitle className="text-xl">Women Entrepreneur Grants</CardTitle>
                                <CardDescription>Dedicated funding for women-owned businesses</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Funding Amount:</span>
                                        <span className="font-semibold text-green-600">$10K - $500K</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Eligibility:</span>
                                        <span className="text-sm">Women entrepreneurs</span>
                                    </div>
                                    <Button className="w-full mt-4" asChild>
                                        <Link href="/usa/women-entrepreneurs-grants">
                                            View Details <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="text-center mt-8 sm:mt-12">
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/grants">
                                View All 1,200+ Grants <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <CaseStudiesSection limit={2} />

            {/* Non-Dilutive Funding Solutions — Pricing Ladder */}
            <section className="py-16 sm:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <Badge className="mb-3 bg-emerald-105 text-emerald-800 hover:bg-emerald-100 text-xs px-3 py-1 uppercase tracking-wider font-bold">
                          Non-Dilutive Funding Solutions
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 text-balance">
                            Select Your Funding Solution
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Choose the right report, plan, or expert strategy session matching your company's stage.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 items-stretch max-w-[1400px] mx-auto">
                        
                        {/* 1. Free Calculator */}
                        <div className="border border-gray-200 rounded-2xl p-6 bg-white flex flex-col justify-between hover:shadow-md transition-shadow relative">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex text-yellow-400">
                                        {"★".repeat(5)}
                                    </div>
                                    <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100 text-[10px]">Free Entry</Badge>
                                </div>
                                <h3 className="text-lg font-bold text-gray-950 mb-1">Eligibility Calculator</h3>
                                <p className="text-xs text-gray-600 mb-4">Instant matching to active government grants in 3 minutes.</p>
                                <div className="text-3xl font-black text-gray-950 mb-6">$0</div>
                            </div>
                            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs" asChild onClick={() => trackProductClick('free-calculator')}>
                                <Link href="/calculator">Start Free Check</Link>
                            </Button>
                        </div>

                        {/* 2. Match Report ($19) */}
                        <div className="border border-gray-200 rounded-2xl p-6 bg-white flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex text-yellow-400">
                                        {"★".repeat(3)}{"☆".repeat(2)}
                                    </div>
                                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 text-[10px]">Match Report</Badge>
                                </div>
                                <h3 className="text-lg font-bold text-gray-950 mb-1">Funding Match Report</h3>
                                <p className="text-xs text-gray-600 mb-4">Personalized list matching your business to government grants.</p>
                                <div className="text-3xl font-black text-gray-950 mb-6">$19</div>
                            </div>
                            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs" asChild onClick={() => trackProductClick('funding-match-report')}>
                                <Link href="/products/funding-match-report">Get Report</Link>
                            </Button>
                        </div>

                        {/* 3. Action Plan ($49) */}
                        <div className="border border-gray-200 rounded-2xl p-6 bg-white flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex text-yellow-400">
                                        {"★".repeat(3)}{"☆".repeat(2)}
                                    </div>
                                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 text-[10px]">Action Plan</Badge>
                                </div>
                                <h3 className="text-lg font-bold text-gray-950 mb-1">Funding Action Plan</h3>
                                <p className="text-xs text-gray-600 mb-4">Detailed budgets, timelines, and checklists for matching grants.</p>
                                <div className="text-3xl font-black text-gray-950 mb-6">$49</div>
                            </div>
                            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs" asChild onClick={() => trackProductClick('funding-action-plan')}>
                                <Link href="/products/action-plan">Get Action Plan</Link>
                            </Button>
                        </div>

                        {/* 4. Complete Bundle ($79) — MOST POPULAR */}
                        <div className="border-2 border-emerald-500 rounded-2xl p-6 bg-gradient-to-b from-emerald-50 to-white flex flex-col justify-between hover:shadow-lg transition-shadow relative shadow-sm scale-105 z-10">
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                                Best Value
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex text-yellow-400">
                                        {"★".repeat(5)}
                                    </div>
                                    <Badge className="bg-emerald-600 text-white hover:bg-emerald-700 text-[10px]">Most Popular</Badge>
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-1">Complete Funding Bundle</h3>
                                <p className="text-xs text-slate-700 mb-4 font-medium">Match Report + Action Plan + Excel budget templates and checklists.</p>
                                <div className="text-3xl font-black text-emerald-600 mb-6">$79</div>
                            </div>
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs" asChild onClick={() => trackProductClick('funding-bundle')}>
                                <Link href="/products/report">Buy Bundle Now</Link>
                            </Button>
                        </div>

                        {/* 5. 1-on-1 Strategy Session ($199) */}
                        <div className="border-2 border-blue-500 rounded-2xl p-6 bg-gradient-to-b from-blue-50 to-white flex flex-col justify-between hover:shadow-md transition-shadow relative">
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                                Enterprise
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex text-yellow-400">
                                        {"★".repeat(5)}
                                    </div>
                                    <Badge className="bg-blue-600 text-white hover:bg-blue-700 text-[10px]">High Ticket</Badge>
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-1">1-on-1 Strategy Session</h3>
                                <p className="text-xs text-slate-700 mb-4 font-medium">Private 60-min session with senior analyst + detailed diagnostic audit report.</p>
                                <div className="text-3xl font-black text-blue-600 mb-6">$199</div>
                            </div>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs" asChild onClick={() => trackProductClick('strategy-audit')}>
                                <Link href="/audit">Book Session</Link>
                            </Button>
                        </div>

                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
                            Everything You Need to Find Funding
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto text-pretty px-4 sm:px-0">
                            Our comprehensive platform provides all the tools and resources you need to discover and apply for
                            government grants.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
                        <div className="text-center px-4 sm:px-0">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <Search className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">AI-Powered Grant Finder</h3>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                Answer a few questions about your business and get personalized grant recommendations powered by AI.
                            </p>
                        </div>

                        <div className="text-center px-4 sm:px-0">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <Download className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Free PDF Guides</h3>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                Download our comprehensive guides including &quot;Top 50 USA &amp; Canada Startup Grants 2026&quot; absolutely free.
                            </p>
                        </div>

                        <div className="text-center px-4 sm:px-0">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Grant Deadline Calendar</h3>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                Never miss a deadline with our interactive calendar showing all upcoming grant application deadlines.
                            </p>
                        </div>

                        <div className="text-center px-4 sm:px-0">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Grant Comparison Tables</h3>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                Compare grants side-by-side with detailed information on funding amounts, eligibility, and deadlines.
                            </p>
                        </div>

                        <div className="text-center px-4 sm:px-0">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Expert Application Guides</h3>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                Step-by-step guides and templates to help you write winning grant applications and proposals.
                            </p>
                        </div>

                        <div className="text-center px-4 sm:px-0">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <DollarSign className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Grant Alerts</h3>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                Get notified about new grant opportunities and upcoming deadlines via email and push notifications.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-6 space-y-8">
                <FounderCard />
                <DiyComparisonTable />
            </div>

            {/* AI Answer / FAQ Section */}
            <section className="py-12 sm:py-16 md:py-20 border-t border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="text-center mb-10 sm:mb-12" id="ai-summary">
                        <Badge className="mb-3 bg-blue-100 text-blue-800">AI Quick Answers</Badge>
                        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 mb-4 text-balance">
                            Frequently Asked Questions
                        </h2>
                    </div>
                    
                    <div className="space-y-4">
                        {AI_FAQS.map((faq, idx) => (
                            <Card key={idx} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-start text-gray-900">
                                        <HelpCircle className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                                        {faq.question}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 ml-8 leading-relaxed">{faq.answer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-12 sm:py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="newsletter-form max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-balance">
                            Get the Top 50 Startup Grants Guide
                        </h2>
                        <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-blue-100 text-pretty px-4 sm:px-0">
                            Download our comprehensive PDF guide featuring the best government grants for startups and small
                            businesses in USA and Canada.
                        </p>

                        {/* Client component — interactive form */}
                        <NewsletterForm />

                        <div className="flex flex-col sm:flex-row items-center justify-center mt-4 sm:mt-6 space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-blue-100">
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Instant Download
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                No Spam
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Updated Monthly
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
