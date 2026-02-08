import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Target, DollarSign, AlertTriangle, Download, Sprout, Tractor, Wheat, Leaf, HelpCircle, ArrowRight, Factory } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agri-Food & AgriTech Grants Canada 2025 | Processing & Innovation Funding",
  description: "Guide to federal funding for food processing and agritech. Apply for AgriInnovate, AgriProcessing, and food automation grants.",
  keywords: "agri-food grants Canada, food processing funding, agritech grants, AgriInnovate application, food automation grants, sustainable food production funding",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/canada-agri-food-funding-guide",
  },
  openGraph: {
    title: "Agri-Food & AgriTech Grants Canada 2025 | Funding Guide",
    description: "Step-by-step guide to securing grants for food processing, agritech innovation, and value-added agriculture.",
    url: "https://www.fsidigital.ca/guides/canada-agri-food-funding-guide",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What funding is available for food processors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Food processors can access the AgriInnovate Program (for new technology adoption), the Strategic Innovation Fund (for large scale expansions), and various regional programs like the Supply Management Processing Investment Fund."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get funding for automation equipment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Many programs, including the Agricultural Clean Technology Program and regional initiatives, fund the purchase and installation of robotic and automated processing equipment to improve productivity."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Supply Management Processing Investment Fund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The SMPIF offers non-repayable contributions (grants) to processors of supply-managed commodities (dairy, poultry, eggs) to invest in new equipment and technology."
      }
    },
    {
      "@type": "Question",
      "name": "Is Agri-Food funding taxable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, government grants are generally taxable income. However, they offset the expenses you incur, neutralizing the immediate tax impact. Repayable contributions (loans) are not taxable income."
      }
    }
  ]
}

export default function CanadaAgriFoodFundingGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-800 to-green-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-emerald-500/20 text-emerald-100 border-emerald-400/30 backdrop-blur-sm">
                🏭 Food Processing & AgriTech
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                Agri-Food & AgriTech Funding Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-emerald-100 leading-relaxed text-pretty">
                The comprehensive guide for food processors and agritech innovators.
                Secure funding for automation, facility expansion, and new product development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-900/50" asChild>
                  <Link href="#programs">
                    View Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-emerald-800/50 border-emerald-400/30 text-emerald-100 hover:bg-emerald-800/80 backdrop-blur-sm" asChild>
                  <Link href="/blog/agri-food-processing-grants-canada">
                    Processing Insights
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-emerald-100 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-emerald-900 gap-4">
              <span className="font-semibold text-emerald-900 flex items-center shrink-0">
                <Factory className="w-4 h-4 mr-2 text-emerald-600" />
                Sector Focus:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#programs" className="hover:text-emerald-700 transition-colors flex items-center gap-1"><Target className="w-3 h-3" /> Top Grants</Link>
                <Link href="#processing" className="hover:text-emerald-700 transition-colors flex items-center gap-1"><Factory className="w-3 h-3" /> Processing</Link>
                <Link href="#tech" className="hover:text-emerald-700 transition-colors flex items-center gap-1"><Sprout className="w-3 h-3" /> AgriTech</Link>
                <Link href="#mistakes" className="hover:text-red-600 transition-colors flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Common Risks</Link>
                <Link href="#faq" className="hover:text-emerald-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b border-emerald-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-emerald-50">
                <div className="p-4">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">$10M</div>
                  <div className="text-emerald-800 text-sm font-medium uppercase tracking-wide">Max Funding Deal</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">50%</div>
                  <div className="text-emerald-800 text-sm font-medium uppercase tracking-wide">Capital Coverage</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-teal-600 mb-2">Auto</div>
                  <div className="text-emerald-800 text-sm font-medium uppercase tracking-wide">Robotics Focus</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-emerald-700 mb-2">32+</div>
                  <div className="text-emerald-800 text-sm font-medium uppercase tracking-wide">Active Streams</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Programs Section */}
        <section id="programs" className="py-20 bg-emerald-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Top Agri-Food Funding Streams</h2>

              <div className="space-y-8">
                {/* AgriInnovate */}
                <Card className="border-l-4 border-l-emerald-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Sprout className="w-8 h-8 text-emerald-600" />
                        <CardTitle className="text-xl">AgriInnovate Program</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-emerald-300 text-emerald-700">Commercialization</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      For companies adopting or demonstrating <strong>new-to-sector</strong> or <strong>new-to-Canada</strong> technologies.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 bg-white border border-emerald-100 p-4 rounded-lg text-sm">
                      <div>
                        <strong className="block text-emerald-900 mb-2">The Offer:</strong>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Up to $10 Million</li>
                          <li>Repayable Contribution (0% interest)</li>
                          <li>10-year repayment term</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="block text-emerald-900 mb-2">Ideal For:</strong>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Scale-up of innovative processing</li>
                          <li>First-in-kind automation lines</li>
                          <li>Global export expansion</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SMPIF */}
                <Card className="border-l-4 border-l-blue-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Factory className="w-8 h-8 text-blue-600" />
                        <CardTitle className="text-xl">Supply Management Processing Fund</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-blue-300 text-blue-700">Sector Specific</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Dedicated funding for <strong>Dairy, Poultry, and Egg</strong> processors to improve productivity and competitiveness.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 bg-white border border-blue-100 p-4 rounded-lg text-sm">
                      <div>
                        <strong className="block text-blue-900 mb-2">The Offer:</strong>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Up to $5 Million</li>
                          <li><strong>Non-Repayable</strong> (Grant)</li>
                          <li>Up to 50% project costs</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="block text-blue-900 mb-2">Eligible Projects:</strong>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Automation equipment</li>
                          <li>Robotic packaging lines</li>
                          <li>ERP/Production software</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Agricultural Clean Tech */}
                <Card className="border-l-4 border-l-teal-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Leaf className="w-8 h-8 text-teal-600" />
                        <CardTitle className="text-xl">Ag Clean Tech Program</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-teal-300 text-teal-700">Sustainability</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Funding for equipping farms and processors with technologies that reduce Greenhouse Gas (GHG) emissions.
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-teal-50 text-teal-700 hover:bg-teal-100">Bio-economy</Badge>
                      <Badge className="bg-teal-50 text-teal-700 hover:bg-teal-100">Energy Efficiency</Badge>
                      <Badge className="bg-teal-50 text-teal-700 hover:bg-teal-100">$50K - $2M</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Processing vs Tech Strategy */}
        <section id="processing" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Strategic Focus Areas</h2>

              <div className="grid md:grid-cols-2 gap-8">

                {/* Food Processing */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Factory className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Food Processing</h3>
                  </div>
                  <p className="text-slate-600 text-sm">
                    For manufacturers transforming raw commodities into value-added goods.
                  </p>
                  <Card className="border-blue-100 bg-blue-50/50">
                    <CardContent className="pt-6">
                      <h4 className="font-bold text-blue-900 mb-2">Top Winning Themes:</h4>
                      <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /> Increasing shelf-life for export</li>
                        <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /> Waste reduction (upcycling)</li>
                        <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /> Labour shortage mitigation (robotics)</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* AgriTech */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Sprout className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">AgriTech Innovation</h3>
                  </div>
                  <p className="text-slate-600 text-sm">
                    For developers of hardware/software for the agriculture sector.
                  </p>
                  <Card className="border-emerald-100 bg-emerald-50/50">
                    <CardContent className="pt-6">
                      <h4 className="font-bold text-emerald-900 mb-2">Top Winning Themes:</h4>
                      <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex items-start"><CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5" /> Precision agriculture (AI/Sensors)</li>
                        <li className="flex items-start"><CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5" /> Controlled Environment Agriculture (Vertical Farming)</li>
                        <li className="flex items-start"><CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5" /> Livestock health monitoring</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section id="mistakes" className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Application Pitfalls</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700 flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Eligibility Blocks:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 mr-2 shrink-0"></div>
                      <div>
                        <strong>"Routine" Equipment:</strong>
                        <p className="text-sm text-slate-600">Replacing an old freezer with a new one? Rejected. It must be an <em>upgrade</em> that changes your process capabilities.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 mr-2 shrink-0"></div>
                      <div>
                        <strong>Revenue Caps:</strong>
                        <p className="text-sm text-slate-600">Some small regional grants cap out if you make &gt;$2M revenue. Check the specific program guide.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-amber-700 flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Financial Errors:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 mr-2 shrink-0"></div>
                      <div>
                        <strong>Debt Service Coverage:</strong>
                        <p className="text-sm text-slate-600">For repayable contributions (AgriInnovate), you must prove you have cash flow to service the debt.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 mr-2 shrink-0"></div>
                      <div>
                        <strong>Stacking Limits:</strong>
                        <p className="text-sm text-slate-600">You can't get 100% government funding. Usually, you must put in at least 25% of your own equity.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 text-emerald-600 mr-2" />
                Agri-Food Funding FAQs
              </h2>
              <div className="divide-y divide-emerald-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can startups apply for AgriInnovate?</h3>
                  <p className="text-slate-600 text-sm">It's tough. AgriInnovate focuses on "commercialization," meaning you usually need established revenue and production to prove you can scale. Startups might prefer IRAP or AgriScience.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Does software count?</h3>
                  <p className="text-slate-600 text-sm">Yes, if it's applied to agriculture (e.g., ERP for traceability, AI for harvest prediction). However, general business software (QuickBooks) is excluded.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">What about cannabis?</h3>
                  <p className="text-slate-600 text-sm">Most federal agriculture programs <strong>exclude</strong> cannabis production and processing. You may need to look at general business Innovation programs instead.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About Agri-Food Funding</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. Is this for primary farming?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Generally, no. Programs like <a href="https://agriculture.canada.ca/en/programs/agriinnovate" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">AgriInnovate</a> target <strong>processors and manufacturers</strong> who are adding value to agricultural products (e.g., turning berries into jam, or automating a meat plant). Primary farming has different grant streams (like CAP).
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. Can I buy standard equipment?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    AgriInnovate requires the technology to be <strong>innovative</strong> (new to Canada or the sector). If you are just buying a standard oven that your competitors already use, you won't qualify. However, SMPIF (Supply Management Processing Investment Fund) is more flexible for automation upgrades.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. What is the funding limit?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    AgriInnovate offers up to <strong>$10 million</strong> per project, repayable over 10 years at 0% interest. SMPIF offers up to $5 million as a non-repayable grant (contribution) for supply-managed sectors (dairy, poultry, eggs).
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">4. Can I use it for building construction?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    It depends. Expansion of a facility to install new line equipment is often eligible, but general real estate purchases are not.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">5. Do I need to pay it back?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    AgriInnovate is a <strong>repayable contribution</strong> (0% loan). SMPIF is a <strong>non-repayable grant</strong>. Always check if the program says "repayable" or "non-repayable".
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">6. What is the deadline?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    AgriInnovate accepts applications on a continuous basis until funding runs out. SMPIF has specific intake windows, so check the AAFC website for the next opening.
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
              <h3 className="text-xl font-bold text-slate-900 mb-6">Explore Related Funding</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/apply-agriculture-agri-food-canada" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Primary Ag</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">Agriculture Grants</h4>
                    <p className="text-sm text-slate-500 flex-grow">Broader guide for primary producers and farm operations.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-regional-development-agencies" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Regional</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">RDA Funding</h4>
                    <p className="text-sm text-slate-500 flex-grow">Regional agencies (ACOA, FedDev) rely heavily on food processing.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-small-business-grants" className="group block h-full">
                  <div className="bg-white border hover:border-emerald-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-emerald-600 font-semibold mb-2">Growth</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 mb-2">Small Biz Grants</h4>
                    <p className="text-sm text-slate-500 flex-grow">Hiring and digital adoption grants for growing food companies.</p>
                    <div className="mt-3 text-xs text-emerald-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-emerald-900 to-green-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Scale Your Processing Plant</h2>
            <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
              We know the difference between CFIA compliance and BRC certification. Our experts are food industry veterans.
            </p>
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-900/50" asChild>
              <Link href="/contact?service=food-processing-expert-help">
                Get Processing Funding
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
