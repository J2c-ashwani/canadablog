import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Mountain, Leaf, MapPin, HelpCircle, ArrowRight, MessageCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Indigenous & Rural Business Funding Guide 2025 | Grants & Loans",
  description: "Complete guide to Aboriginal Entrepreneurship Program (AEP), NACCA loans, and rural business grants. Get templates and strategies for approval.",
  keywords: "Indigenous business grants, Aboriginal Entrepreneurship Program, NACCA loans, rural business funding Canada, First Nations business loans, Metis entrepreneur funding",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-indigenous-rural-business-funding",
  },
  openGraph: {
    title: "Indigenous & Rural Business Funding Guide 2025",
    description: "Unlock funding for Indigenous and rural businesses. Step-by-step guide to NACCA, AEP, and Community Futures.",
    url: "https://www.fsidigital.ca/guides/apply-indigenous-rural-business-funding",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is eligible for Indigenous business funding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typically, you must be of First Nations, Métis, or Inuit heritage and hold at least 51% ownership and control of the business. You will need to provide proof of heritage (Status Card, Métis Card, or Inuit Beneficiary Card)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Aboriginal Entrepreneurship Program (AEP)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The AEP provides equity capital (non-repayable contributions) to Indigenous entrepreneurs. It is usually administered through a network of Aboriginal Financial Institutions (AFIs)."
      }
    },
    {
      "@type": "Question",
      "name": "Are there grants for rural businesses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Community Futures Program (CFP) specifically targets rural communities, offering loans and some advisory grants. Regional Development Agencies (like FedNor or PrairiesCan) also have rural-specific streams."
      }
    },
    {
      "@type": "Question",
      "name": "Can I apply if I live off-reserve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Most programs, including NACCA and AEP, support Indigenous entrepreneurs regardless of whether they live on-reserve, off-reserve, or in urban centers."
      }
    }
  ]
}

export default function IndigenousRuralBusinessFundingGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-700 to-amber-800 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-orange-500/20 text-orange-100 border-orange-400/30 backdrop-blur-sm">
                🦅 Indigenous & Rural Commerce
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                Indigenous & Rural <br className="hidden md:block" /> Business Funding
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-orange-100 leading-relaxed text-pretty">
                Empowering communities with capital. <br className="hidden md:block" /> Guide to <strong>NACCA</strong>, <strong>AEP</strong>, and <strong>Community Futures</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-orange-900 hover:bg-orange-50 font-bold shadow-lg" asChild>
                  <Link href="#programs">
                    View Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-orange-800/50 border-orange-400/30 text-orange-100 hover:bg-orange-800/80 backdrop-blur-sm" asChild>
                  <Link href="/blog/indigenous-business-plan-template">
                    Download Template
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-orange-100 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-orange-900 gap-4">
              <span className="font-semibold text-orange-900 flex items-center shrink-0">
                <Mountain className="w-4 h-4 mr-2 text-orange-600" />
                Topic:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#programs" className="hover:text-orange-700 transition-colors flex items-center gap-1"><DollarSign className="w-3 h-3" /> Funding Programs</Link>
                <Link href="#process" className="hover:text-orange-700 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" /> Process</Link>
                <Link href="#eligibility" className="hover:text-orange-700 transition-colors flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Eligibility</Link>
                <Link href="#faq" className="hover:text-orange-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b border-orange-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-orange-50">
                <div className="p-4">
                  <div className="text-3xl font-bold text-orange-600 mb-2">$99K</div>
                  <div className="text-orange-900 text-sm font-medium uppercase tracking-wide">AEP Grant Max</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-amber-600 mb-2">59</div>
                  <div className="text-orange-900 text-sm font-medium uppercase tracking-wide">AFI Locations</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">51%</div>
                  <div className="text-orange-900 text-sm font-medium uppercase tracking-wide">Ownership Required</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">260+</div>
                  <div className="text-orange-900 text-sm font-medium uppercase tracking-wide">Community Futures</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section id="programs" className="py-16 bg-orange-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Core Funding Programs</h2>

              <div className="space-y-8">
                {/* AEP */}
                <Card className="border-l-4 border-l-orange-600 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Target className="w-8 h-8 text-orange-600" />
                        <CardTitle className="text-xl">Aboriginal Entrepreneurship Program (AEP)</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">Most Popular</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Provides non-repayable equity contributions (grants) of up to $99,999 for individuals and community-owned businesses. Note: You usually must combine this with a loan.
                    </p>
                    <div className="bg-white border border-orange-100 p-4 rounded-lg">
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
                        <div className="font-semibold text-center bg-orange-50 p-2 rounded">Uses: Capital, Marketing, Equipment</div>
                        <div className="font-semibold text-center bg-orange-50 p-2 rounded">Applied via local AFI</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Community Futures */}
                <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Leaf className="w-8 h-8 text-green-500" />
                        <CardTitle className="text-xl">Community Futures (Rural)</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      For rural businesses (Indigenous or non-Indigenous). They offer flexible loans up to $150,000 when traditional banks say no. They look at "character" and community impact, not just credit scores.
                    </p>
                  </CardContent>
                </Card>

                {/* NACCA */}
                <Card className="border-l-4 border-l-blue-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building className="w-8 h-8 text-blue-600" />
                        <CardTitle className="text-xl">NACCA & AFIs</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">Network</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      The National Aboriginal Capital Corporations Association (NACCA) supports a network of 59 Aboriginal Financial Institutions (AFIs). These are the actual places you go to get money.
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
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Indigenous Funding Path</h2>

              <div className="relative border-l-2 border-orange-200 pl-8 space-y-12 ml-4 md:ml-0">

                <div className="relative">
                  <div className="absolute -left-[41px] bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Verify Heritage & Ownership</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Ensure you have your Status Card, Métis citizenship, or Beneficiary card ready. Business must be 51% Indigenous-controlled.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Find Your AFI</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Do not apply to "Ottawa." Locate your nearest Aboriginal Financial Institution (AFI). They are autonomous and make the decisions locally.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">The "Three-Box" Plan</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Your funding will likely look like this: Box 1 (Your 10% cash equity) + Box 2 (AEP Grant up to 40%) + Box 3 (AFI Loan for the rest).
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Community Impact</h3>
                  <p className="text-slate-600 text-sm">
                    Unlike standard banks, AFIs want to see how your business helps the community (jobs, services, youth training). Highlight this.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About Indigenous Funding</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. Is the funding tax-free?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    It depends. If your business is located on a reserve and you are a Status Indian, income (including some grants) <em>may</em> be tax-exempt under Section 87 of the Indian Act. However, for most off-reserve businesses, grants are considered taxable income. Always consult an accountant familiar with Indigenous taxation.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. Can I apply if I have a non-Indigenous partner?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Yes, as long as the business is majority-owned (51%+) and controlled by Indigenous individuals. This is common in "Joint Ventures" for major construction or resource projects.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. Where do I find my local AFI?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    You can use the <a href="https://nacca.ca/afi-directory/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">NACCA AFI Directory</a>. There are over 50 institutions across Canada, and you generally must apply to the one serving your specific region or nation.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">4. Does Community Futures only help farmers?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    No! <a href="https://communityfutures.ca/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Community Futures</a> helps *any* rural business, from tech startups to retail stores. Their main criterion is that you add economic value to a rural community.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">5. Can I get a grant for a truck?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Maybe. Unlike general banks, AFIs and AEP often allow capital costs (equipment, vehicles) to be covered if they are essential to the business operations (e.g., a logging truck or delivery van).
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">6. What if I don't have a Status Card?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    You need proof of heritage. If you are Métis, a card from your provincial Métis council is accepted. In some cases, a letter from your Band/Community leadership confirming your membership may suffice for specific AFIs.
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
                <Link href="/guides/apply-women-entrepreneurship-strategy" className="group block h-full">
                  <div className="bg-white border hover:border-pink-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-pink-600 font-semibold mb-2">Women</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-pink-700 mb-2">Women Entrepreneurship</h4>
                    <p className="text-sm text-slate-500 flex-grow">Specific resources for women.</p>
                    <div className="mt-3 text-xs text-pink-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-regional-development-agencies" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Regional</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">Regional Agencies</h4>
                    <p className="text-sm text-slate-500 flex-grow">FedNor, PrairiesCan, etc.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-small-business-grants" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">General</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">Small Business Grants</h4>
                    <p className="text-sm text-slate-500 flex-grow">General funding options.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
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
                <HelpCircle className="w-6 h-6 text-orange-600 mr-2" />
                Funding FAQs
              </h2>
              <div className="divide-y divide-orange-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Do I need good credit for an AEP grant?</h3>
                  <p className="text-slate-600 text-sm">The grant itself is non-repayable, but because it is usually paired with a loan from an AFI, the AFI will check your credit. However, AFIs are more flexible than big banks.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I apply for AEP if I am a startup?</h3>
                  <p className="text-slate-600 text-sm">Yes, AEP supports startups, acquisitions, and expansions. You will need a solid business plan.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">How long does approval take?</h3>
                  <p className="text-slate-600 text-sm">It varies by AFI, but typically 6-12 weeks. Community Futures can sometimes be faster, around 4-8 weeks.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-orange-900 to-amber-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Build Your Community</h2>
            <p className="text-lg text-orange-200 mb-8 max-w-2xl mx-auto">
              We help you draft a business plan that speaks the language of AFIs—balancing profit with community impact.
            </p>
            <Button size="lg" className="bg-white text-orange-900 hover:bg-orange-50 font-semibold shadow-lg" asChild>
              <Link href="/contact?service=indigenous-funding">
                Get Funding Help
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
