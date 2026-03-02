import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, Shield, Star, ArrowRight, Leaf, DollarSign, Globe, Users, Cpu, Award, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Free Grant Application Kits & Guides | Download Center",
    description: "Download free grant application kits, templates, checklists, and step-by-step guides for Canadian and US government funding programs. Trusted by 10,000+ businesses.",
    keywords: "free grant templates, grant application kit, CSBFP templates, IRAP application guide, SR&ED checklist, SBA loan guide",
}

const downloadCategories = [
    {
        title: "🇨🇦 Canada — Federal Programs",
        icon: Globe,
        items: [
            { name: "CSBFP Application Kit", slug: "csbfp-application-kit", desc: "Pre-filled templates & 95% approval checklist" },
            { name: "CSBFP Government Financing Kit", slug: "csbfp-government-financing-kit", desc: "Complete government financing guide" },
            { name: "IRAP Application Kit", slug: "irap-application-kit", desc: "Innovation research program templates" },
            { name: "IRAP Government Application Kit", slug: "irap-government-application-kit", desc: "Government IRAP submission package" },
            { name: "IRAP Innovation Application Guide", slug: "irap-innovation-application-guide", desc: "Step-by-step innovation funding guide" },
            { name: "SR&ED Application Kit", slug: "sred-application-kit", desc: "Tax credit claim templates & guides" },
            { name: "Strategic Innovation Fund Kit", slug: "sif-application-kit", desc: "SIF application package" },
            { name: "RDA Regional Application Kit", slug: "rda-regional-application-kit", desc: "Regional development agency templates" },
            { name: "Indigenous & Rural Funding Kit", slug: "indigenous-rural-funding-kit", desc: "Funding for Indigenous & rural businesses" },
            { name: "NSERC Research Grants Guide", slug: "nserc-research-grants-guide", desc: "Academic research funding guide" },
            { name: "Agriculture & Agri-Food Kit", slug: "agriculture-agri-food-application-kit", desc: "Agricultural innovation funding" },
        ],
    },
    {
        title: "🇨🇦 Canada — Province-Specific",
        icon: DollarSign,
        items: [
            { name: "Alberta Business Grants Kit", slug: "alberta-business-grants-kit", desc: "Alberta-specific funding templates" },
            { name: "British Columbia Grants Kit", slug: "british-columbia-grants-kit", desc: "BC business funding package" },
            { name: "Ontario Business Grants Kit", slug: "ontario-business-grants-kit", desc: "Ontario program application guides" },
            { name: "Quebec Business Grants Kit", slug: "quebec-business-grants-kit", desc: "Quebec funding & subsidy guides" },
        ],
    },
    {
        title: "👩‍💼 Women Entrepreneurs",
        icon: Users,
        items: [
            { name: "Women Entrepreneurship Fund Guide", slug: "women-entrepreneurship-fund-guide", desc: "WES funding application guide" },
            { name: "Women Entrepreneurship Loan Fund", slug: "women-entrepreneurship-loan-fund-guide", desc: "Loan fund application templates" },
            { name: "EDC Women Trade & Export Guide", slug: "edc-women-trade-export-financing-guide", desc: "Export financing for women-led businesses" },
            { name: "BDC Women Entrepreneurs Guide", slug: "bdc-women-entrepreneurs-financing-guide", desc: "BDC financing program guide" },
            { name: "Alberta Women Business Grants", slug: "alberta-women-business-grants-guide", desc: "Alberta women-specific funding" },
            { name: "BC Women Business Grants", slug: "bc-women-business-grants-guide", desc: "BC women entrepreneur grants" },
            { name: "Ontario Women Business Grants", slug: "ontario-women-business-grants-guide", desc: "Ontario women-focused programs" },
            { name: "Quebec Women Business Grants", slug: "quebec-women-business-grants-guide", desc: "Quebec women entrepreneur funding" },
            { name: "Indigenous Women Business Grants", slug: "indigenous-women-business-grants-guide", desc: "Indigenous women entrepreneur funding" },
            { name: "BMO Celebrating Women Grant", slug: "bmo-celebrating-women-grant-guide", desc: "BMO grant application guide" },
            { name: "Scotiabank Women Initiative", slug: "scotiabank-women-initiative-guide", desc: "Scotiabank program guide" },
            { name: "RBC Women Entrepreneur Awards", slug: "rbc-women-entrepreneur-awards-guide", desc: "RBC awards application guide" },
            { name: "Amber Grant for Women", slug: "amber-grant-women-application-guide", desc: "Amber grant application tips" },
            { name: "Cartier Women's Initiative", slug: "cartier-womens-initiative-application-guide", desc: "International initiative guide" },
            { name: "Women in Manufacturing Grants", slug: "women-manufacturing-grants-guide", desc: "Manufacturing sector grants" },
            { name: "Women Clean Technology Grants", slug: "women-clean-technology-grants-guide", desc: "Clean tech grants for women" },
            { name: "Women Social Enterprise Grants", slug: "women-social-enterprise-grants-guide", desc: "Social enterprise funding" },
            { name: "Women Technology Grants", slug: "women-technology-grants-guide", desc: "Tech sector grants for women" },
        ],
    },
    {
        title: "🇺🇸 USA — Federal Programs",
        icon: Award,
        items: [
            { name: "SBA Application Checklist", slug: "sba-application-checklist", desc: "Small Business Administration guide" },
            { name: "NSF SBIR Grants Guide", slug: "nsf-sbir-grants-guide", desc: "National Science Foundation SBIR" },
            { name: "NIH SBIR Biotech Guide", slug: "nih-sbir-biotech-guide", desc: "Biotech research funding guide" },
            { name: "DOE SBIR Clean Energy Guide", slug: "doe-sbir-clean-energy-guide", desc: "Clean energy innovation funding" },
            { name: "DOD SBIR Defense Tech Guide", slug: "dod-sbir-defense-tech-guide", desc: "Defense technology grants" },
            { name: "NASA SBIR Space Tech Guide", slug: "nasa-sbir-space-tech-guide", desc: "Space technology innovation" },
            { name: "USDA SBIR AgTech Guide", slug: "usda-sbir-agtech-guide", desc: "Agricultural technology grants" },
        ],
    },
    {
        title: "🇺🇸 USA — State Programs",
        icon: Zap,
        items: [
            { name: "California Tech Guide", slug: "california-tech-guide", desc: "California tech program guide" },
            { name: "Colorado Tech Guide", slug: "colorado-tech-guide", desc: "Colorado innovation programs" },
            { name: "Massachusetts Tech Guide", slug: "massachusetts-tech-guide", desc: "Massachusetts funding programs" },
            { name: "New York Tech Guide", slug: "new-york-tech-guide", desc: "New York business grants" },
            { name: "Youth Entrepreneurship Kit", slug: "youth-entrepreneurship-kit", desc: "Funding for young entrepreneurs" },
        ],
    },
    {
        title: "🔬 Industry-Specific",
        icon: Cpu,
        items: [
            { name: "AI & ML Grants Guide", slug: "ai-ml-grants-guide", desc: "Artificial intelligence funding" },
            { name: "Biotech & Life Sciences Guide", slug: "biotech-grants-guide", desc: "Biotech & pharma grants" },
            { name: "Clean Tech & Energy Guide", slug: "clean-tech-energy-grants-guide", desc: "Green energy innovation grants" },
            { name: "Cybersecurity Grants Guide", slug: "cybersecurity-grants-guide", desc: "Cybersecurity sector funding" },
            { name: "Hardware & IoT Grants Guide", slug: "hardware-iot-grants-guide", desc: "Hardware innovation funding" },
            { name: "Software & SaaS Grants Guide", slug: "software-saas-grants-guide", desc: "Software industry grants" },
            { name: "Canada Aerospace & Defence", slug: "canada-aerospace-defence-funding-guide", desc: "Aerospace sector funding" },
            { name: "Canada Agri-Food Funding", slug: "canada-agri-food-funding-guide", desc: "Agri-food innovation grants" },
            { name: "Canada CleanTech Funding", slug: "canada-cleantech-funding-guide", desc: "Canadian clean technology" },
            { name: "Canada Digital & AI Funding", slug: "canada-digital-ai-funding-guide", desc: "Digital transformation grants" },
            { name: "Canada Life Sciences Funding", slug: "canada-life-sciences-funding-guide", desc: "Life sciences innovation" },
            { name: "Canada Manufacturing Funding", slug: "canada-manufacturing-funding-guide", desc: "Manufacturing sector grants" },
        ],
    },
]

export default function DownloadCenter() {
    const totalGuides = downloadCategories.reduce((sum, cat) => sum + cat.items.length, 0)

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 text-white py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <Badge className="mb-4 bg-white/20 text-white border-white/30">
                                📥 Free Download Center
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                {totalGuides}+ Free Grant Application Kits & Guides
                            </h1>
                            <p className="text-xl text-emerald-100 mb-8">
                                Expert-crafted templates, checklists, and step-by-step guides for every major
                                Canadian and US government funding program. Trusted by 10,000+ businesses.
                            </p>
                            <div className="flex items-center justify-center flex-wrap gap-6 text-sm">
                                <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-400 mr-2" />
                                    <span>4.9/5 Average Rating</span>
                                </div>
                                <div className="flex items-center">
                                    <Download className="w-4 h-4 text-emerald-200 mr-2" />
                                    <span>10,000+ Downloads</span>
                                </div>
                                <div className="flex items-center">
                                    <Shield className="w-4 h-4 text-green-400 mr-2" />
                                    <span>100% Free, No CC Required</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Download Categories */}
                <section className="py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-6xl mx-auto space-y-16">
                            {downloadCategories.map((category) => {
                                const IconComp = category.icon
                                return (
                                    <div key={category.title}>
                                        <div className="flex items-center gap-3 mb-6">
                                            <IconComp className="w-6 h-6 text-emerald-700" />
                                            <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                                            <Badge variant="outline" className="ml-2">{category.items.length} guides</Badge>
                                        </div>
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {category.items.map((item) => (
                                                <Link key={item.slug} href={`/download/${item.slug}`}>
                                                    <Card className="h-full hover:shadow-lg hover:border-emerald-300 transition-all duration-200 cursor-pointer group">
                                                        <CardContent className="p-5">
                                                            <div className="flex items-start gap-3">
                                                                <FileText className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                                                                <div className="min-w-0">
                                                                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors text-sm leading-tight mb-1">
                                                                        {item.name}
                                                                    </h3>
                                                                    <p className="text-xs text-gray-500 leading-snug">{item.desc}</p>
                                                                </div>
                                                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors shrink-0 mt-0.5" />
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Not Sure Which Guide You Need?
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Use our free Grant Finder tool to match your business with the best funding programs,
                                then download the right guide to maximize your chances.
                            </p>
                            <div className="flex justify-center gap-4 flex-wrap">
                                <Button asChild size="lg" className="bg-emerald-700 hover:bg-emerald-800">
                                    <Link href="/grant-finder">
                                        <Leaf className="w-5 h-5 mr-2" />
                                        Try Grant Finder
                                    </Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href="/guides">
                                        Browse All Guides
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
