import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Award, Shield, Heart, Target, AlertTriangle, HelpCircle, ArrowRight, Bookmark } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Minority & Women Business Grants 2025 | Certification Guide",
  description: "Get certified for set-aside federal contracts. Comprehensive guide to 8(a), WOSB, and SDVOSB certifications and minority business grants.",
  keywords: "minority business grants, women owned business grants, 8a certification requirements, WOSB certification, SDVOSB grants, minority contracting",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-minority-grants",
  },
  openGraph: {
    title: "Minority & Women Business Funding Guide 2025",
    description: "The federal government awards 23% of contracts to small businesses. Learn how to get your share through 8(a) and WOSB certification.",
    url: "https://www.fsidigital.ca/guides/apply-minority-grants",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the 8(a) Program?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 8(a) Business Development Program is a 9-year program for firms owned by socially and economically disadvantaged individuals. It allows them to compete for 'sole-source' government contracts."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a grant for being a woman-owned business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Technically, no. The federal government does not give 'free money' just for ownership status. However, the WOSB certification allows you to bid on exclusive contracts that non-certified businesses cannot touch."
      }
    },
    {
      "@type": "Question",
      "name": "How long does certification take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Self-certification (for some programs) is fast. However, formal SBA certification for 8(a) or WOSB typically takes 90-120 days after submission."
      }
    },
    {
      "@type": "Question",
      "name": "What is the net worth limit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For 8(a) and EDWOSB (Economically Disadvantaged Women-Owned Small Business), your personal net worth must be less than $850,000 (excluding your primary home and business equity)."
      }
    }
  ]
}

export default function ApplyMinorityGrantsGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-900 to-purple-800 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-purple-500/20 text-purple-100 border-purple-400/30 backdrop-blur-sm">
                🎓 Certification Masterclass
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                Minority & Women <br className="hidden md:block" /> Business Funding
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-purple-100 leading-relaxed text-pretty">
                Unlock billions in set-aside contracts. <br className="hidden md:block" /> The complete guide to <strong>8(a)</strong>, <strong>WOSB</strong>, and <strong>SDVOSB</strong> certification.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50 font-bold shadow-lg" asChild>
                  <Link href="#certifications">
                    View Certifications
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-purple-800/50 border-purple-400/30 text-purple-100 hover:bg-purple-800/80 backdrop-blur-sm" asChild>
                  <Link href="/blog/minority-certification-checklist">
                    Download Checklist
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-purple-100 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-purple-900 gap-4">
              <span className="font-semibold text-purple-900 flex items-center shrink-0">
                <Award className="w-4 h-4 mr-2 text-purple-600" />
                Topic:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#certifications" className="hover:text-purple-700 transition-colors flex items-center gap-1"><Shield className="w-3 h-3" /> Types of Certs</Link>
                <Link href="#process" className="hover:text-purple-700 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" /> Process</Link>
                <Link href="#eligibility" className="hover:text-purple-700 transition-colors flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Eligibility</Link>
                <Link href="#faq" className="hover:text-purple-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b border-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-purple-50">
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">23%</div>
                  <div className="text-purple-900 text-sm font-medium uppercase tracking-wide">Federal Goal</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-pink-600 mb-2">5%</div>
                  <div className="text-purple-900 text-sm font-medium uppercase tracking-wide">Women Owned Goal</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">3%</div>
                  <div className="text-purple-900 text-sm font-medium uppercase tracking-wide">Veteran Goal</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-orange-600 mb-2">$4M</div>
                  <div className="text-purple-900 text-sm font-medium uppercase tracking-wide">Sole Source Limit</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section id="certifications" className="py-16 bg-purple-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Which Certification is Right for You?</h2>

              <div className="space-y-8">
                {/* 8(a) */}
                <Card className="border-l-4 border-l-purple-600 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Target className="w-8 h-8 text-purple-600" />
                        <CardTitle className="text-xl">8(a) Business Development</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">Most Powerful</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      For socially <strong>AND</strong> economically disadvantaged individuals. This is the "Crown Jewel" of certifications because it allows for no-bid (sole-source) contracts.
                    </p>
                    <div className="bg-white border border-purple-100 p-4 rounded-lg">
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
                        <div className="font-semibold text-center bg-purple-50 p-2 rounded">9-Year Program Term</div>
                        <div className="font-semibold text-center bg-purple-50 p-2 rounded">Mentorship Included</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* WOSB */}
                <Card className="border-l-4 border-l-pink-500 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Heart className="w-8 h-8 text-pink-500" />
                        <CardTitle className="text-xl">Women-Owned (WOSB)</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      To level the playing field for women entrepreneurs in underrepresented industries. Includes a sub-category: <strong>EDWOSB (Economically Disadvantaged)</strong>.
                    </p>
                  </CardContent>
                </Card>

                {/* SDVOSB */}
                <Card className="border-l-4 border-l-blue-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="w-8 h-8 text-blue-600" />
                        <CardTitle className="text-xl">Service-Disabled Veteran (SDVOSB)</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      For veterans with a service-connected disability. The VA gives massive preference to these businesses for their own contracts.
                    </p>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">The Certification Journey</h2>

              <div className="relative border-l-2 border-purple-200 pl-8 space-y-12 ml-4 md:ml-0">

                <div className="relative">
                  <div className="absolute -left-[41px] bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Register in SAM.gov</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    You cannot do anything without a UEI (Unique Entity ID) from SAM.gov. Do this first. It is free.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Gather "The Binder"</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Certification requires intense paperwork: 3 years of taxes, bylaws, meeting minutes, and proof of stock ownership. Organize this digitally.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Submit at certify.sba.gov</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    This is the central portal for all SBA certifications. Upload your documents and wait for the analyst review (90+ days).
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Market Your Status</h3>
                  <p className="text-slate-600 text-sm">
                    Certification is just a "hunting license." You must now network with Agency OSDBUs (Office of Small and Disadvantaged Business Utilization) to find opportunities.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Neural Network: Related Guides */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Explore More Funding</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/women-entrepreneurship-fund-guide" className="group block h-full">
                  <div className="bg-white border hover:border-pink-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-pink-600 font-semibold mb-2">Canada</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-pink-700 mb-2">Women Entrepreneurship</h4>
                    <p className="text-sm text-slate-500 flex-grow">Canadian women's funding.</p>
                    <div className="mt-3 text-xs text-pink-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-sba-loans" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Capital</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">SBA Loans (7a)</h4>
                    <p className="text-sm text-slate-500 flex-grow">Loans for all small biz.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/sba-growth-accelerator-fund-guide" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Ecosystem</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">Accelerator Fund</h4>
                    <p className="text-sm text-slate-500 flex-grow">Grants for incubators.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 text-purple-600 mr-2" />
                Certification FAQs
              </h2>
              <div className="divide-y divide-purple-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I certify if I have a male partner?</h3>
                  <p className="text-slate-600 text-sm">Yes, BUT the woman (or minority individual) must own at least 51% AND typically hold the highest officer position (CEO/President) with full control.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Does certification expire?</h3>
                  <p className="text-slate-600 text-sm">Yes. Most require annual attestation to prove you are still eligible, and a full recertification every 3 years.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Is it worth the paperwork?</h3>
                  <p className="text-slate-600 text-sm">If you plan to sell to the government, absolutely. It removes competition. If you only sell B2C (to consumers), it is less useful.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Certified, Get Funded.</h2>
            <p className="text-lg text-purple-200 mb-8 max-w-2xl mx-auto">
              The paperwork is daunting. We help you package your application to avoid the dreaded "Request for Evidence" delays.
            </p>
            <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50 font-semibold shadow-lg" asChild>
              <Link href="/contact?service=certification-help">
                Start Certification
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
