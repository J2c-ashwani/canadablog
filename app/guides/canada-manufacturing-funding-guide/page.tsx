import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Target, DollarSign, AlertTriangle, Download, Factory, Cog, Cpu, TrendingUp, HelpCircle, ArrowRight, CircuitBoard } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manufacturing Grants Canada 2025 | NGen & Industry 4.0 Funding",
  description: "Complete guide to advanced manufacturing funding. Apply for NGen supercluster projects, IRAP manufacturing grants, and CDAP digital adoption loans.",
  keywords: "manufacturing grants Canada, NGen funding, advanced manufacturing, Industry 4.0 grants, robotics funding, automation grants Canada",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/canada-manufacturing-funding-guide",
  },
  openGraph: {
    title: "Manufacturing Grants Canada 2025 | NGen & Automation",
    description: "Step-by-step guide to securing up to $10M for factory modernization and Industry 4.0 adoption.",
    url: "https://www.fsidigital.ca/guides/canada-manufacturing-funding-guide",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What qualifies as 'Advanced Manufacturing' for NGen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Projects must involve the development or adoption of cutting-edge technologies like IoT, AI, robotics, or additive manufacturing that significantly improve productivity or create new products."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use IRAP for buying new machinery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Generally, no. IRAP funds the technical labor to *integrate* or *develop* new systems, but not the capital asset (machine) itself. For equipment, look to regional development agencies (FedDev, PrairiesCan) or CDAP loans."
      }
    },
    {
      "@type": "Question",
      "name": "Is there funding for green manufacturing retrofit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Programs like the Strategic Innovation Fund - Net Zero Accelerator and various Clean Technology Investment Tax Credits cover costs for reducing carbon footprint in factories."
      }
    },
    {
      "@type": "Question",
      "name": "What is the minimum project size for NGen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NGen projects typically range from $500k to $20M. Smaller projects are often redirected to different streams or cluster readiness programs."
      }
    }
  ]
}

export default function CanadaManufacturingFundingGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-800 to-gray-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-slate-500/20 text-slate-100 border-slate-400/30 backdrop-blur-sm">
                🏭 Advanced Manufacturing
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                Canada Manufacturing Funding
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-slate-100 leading-relaxed text-pretty">
                The comprehensive handbook for Industry 4.0.
                Secure NGen collaborative grants, IRAP automation support, and CDAP digital loans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-slate-500 hover:bg-slate-600 text-white font-semibold shadow-lg shadow-slate-900/50" asChild>
                  <Link href="#programs">
                    View Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-slate-800/50 border-slate-400/30 text-slate-100 hover:bg-slate-800/80 backdrop-blur-sm" asChild>
                  <Link href="/guides/canada-manufacturing-funding-guide">
                    Modernization Strategy
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-900 gap-4">
              <span className="font-semibold text-gray-900 flex items-center shrink-0">
                <Factory className="w-4 h-4 mr-2 text-gray-600" />
                Topic:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#programs" className="hover:text-blue-700 transition-colors flex items-center gap-1"><Target className="w-3 h-3" /> Top Grants</Link>
                <Link href="#ngen" className="hover:text-blue-700 transition-colors flex items-center gap-1"><Cpu className="w-3 h-3" /> NGen</Link>
                <Link href="#automation" className="hover:text-blue-700 transition-colors flex items-center gap-1"><Cog className="w-3 h-3" /> Automation</Link>
                <Link href="#process" className="hover:text-blue-700 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" /> Timeline</Link>
                <Link href="#faq" className="hover:text-blue-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b border-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-gray-50">
                <div className="p-4">
                  <div className="text-3xl font-bold text-slate-700 mb-2">$3.1B+</div>
                  <div className="text-slate-800 text-sm font-medium uppercase tracking-wide">Total Funding</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$10M</div>
                  <div className="text-slate-800 text-sm font-medium uppercase tracking-wide">Max Grant (NGen)</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">50%</div>
                  <div className="text-slate-800 text-sm font-medium uppercase tracking-wide">Cost Shared</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-700 mb-2">38+</div>
                  <div className="text-slate-800 text-sm font-medium uppercase tracking-wide">Active Programs</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Programs Section */}
        <section id="programs" className="py-20 bg-gray-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Top Manufacturing Funding Programs</h2>

              <div className="space-y-8">
                {/* NGen */}
                <Card id="ngen" className="border-l-4 border-l-red-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Cpu className="w-8 h-8 text-red-600" />
                        <CardTitle className="text-xl">NGen: Next Gen Manufacturing</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-red-300 text-red-700">Collaborative</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Canada's Advanced Manufacturing Supercluster. Funds transformative projects involving at least 2 partners (e.g., Manufacturer + Tech Provider).
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 bg-white border border-gray-100 p-4 rounded-lg text-sm">
                      <div>
                        <strong className="block text-slate-900 mb-2">The Offer:</strong>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Reimburse 44% of eligible project costs</li>
                          <li>Projects typically $1M - $20M</li>
                          <li>Focus on scaling manufacturing capabilities</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="block text-slate-900 mb-2">Requirements:</strong>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Must be NGen member</li>
                          <li>Must start within 6 months</li>
                          <li>Must create IP or commercial advantage</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* IRAP */}
                <Card id="automation" className="border-l-4 border-l-orange-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Cog className="w-8 h-8 text-orange-600" />
                        <CardTitle className="text-xl">NRC IRAP (Process Innovation)</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-orange-300 text-orange-700">R&D & Improvement</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      For SMEs solving technical challenges on the factory floor. E.g., integrating a custom robotic arm that doesn't exist off-the-shelf.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-orange-100 text-orange-800">Support for Salaries</Badge>
                      <Badge className="bg-orange-100 text-orange-800">Technical Advisory</Badge>
                      <Badge className="bg-orange-100 text-orange-800">Internal R&D</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* CDAP */}
                <Card className="border-l-4 border-l-blue-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CircuitBoard className="w-8 h-8 text-blue-600" />
                        <CardTitle className="text-xl">CDAP Digital Adoption</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-blue-300 text-blue-700">Digitization</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Crucial for manufacturers moving from paper/excel to ERP/MES systems.
                    </p>
                    <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                      <li><strong>$15,000 Grant:</strong> Hire an expert to plan your ERP/MRP implementation.</li>
                      <li><strong>$100,000 Loan:</strong> Interest-free loan to buy the software and hardware.</li>
                      <li><strong>$7,300 Subsidy:</strong> Hire a student to help with data entry/setup.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturing Maturity Roadmap */}
        <section id="process" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Manufacturing Modernization Roadmap</h2>

              <div className="relative border-l-2 border-slate-200 pl-8 space-y-12 ml-4 md:ml-0">

                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-slate-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Assessment & Planning</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    <strong>Funding Sources:</strong> CDAP ($15k), Regional Assessments.
                    <br />Identify bottlenecks. Are you implementing an ERP? Do you need a new robotic cell?
                  </p>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-slate-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Prototype & Pilot</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    <strong>Funding Sources:</strong> IRAP, NGen (Feasibility).
                    <br />Test the new process on a small scale. Solve integration issues (e.g., getting the legacy CNC to talk to the new cloud dashboard).
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-slate-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Capital Expenditure (CAPEX)</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    <strong>Funding Sources:</strong> Regional Agencies (FedDev), BDC, CDAP Loan.
                    <br />Purchase the full fleet of equipment. Note: Grants rarely cover 100% of equipment; usually they cover 15-50%.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Training & Upskilling</h3>
                  <p className="text-slate-600 text-sm">
                    <strong>Funding Sources:</strong> Canada Job Grant, Yves Landry Foundation.
                    <br />Train staff on the new systems. This is often a separate grant application but crucial for success.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Industry 4.0 Winning Strategies</h2>
              <div className="grid md:grid-cols-2 gap-8">

                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-6 h-6 text-slate-600" />
                      <CardTitle className="text-lg">Productivity Metrics</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">
                      Vague promises don't win grants. State specific goals: "Reduce cycle time by 15%", "Decrease scrap rate by 8%", "Reduce energy consumption by 20%."
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-slate-600" />
                      <CardTitle className="text-lg">The Consortium Approach</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">
                      Collaborative applications (NGen) perform better. Bring in a university for testing or a local startup for the software layer to strengthen your bid.
                    </p>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 text-slate-600 mr-2" />
                Manufacturing FAQs
              </h2>
              <div className="divide-y divide-gray-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I stack grants?</h3>
                  <p className="text-slate-600 text-sm">Yes, typically up to 75% of total project costs. Common stack: IRAP (Labor) + Regional Fund (Equipment) + Job Grant (Training).</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Does SR&ED apply to manufacturing?</h3>
                  <p className="text-slate-600 text-sm">Absolutely. "Shop floor R&D" is very common. If you have to stop the line to run a trial, the wasted materials, labor, and overhead are often claimable.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">How long does NGen approval take?</h3>
                  <p className="text-slate-600 text-sm">NGen has specific intake rounds. From submission to approval can take 3-5 months. It is a competitive process.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About Manufacturing Grants</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. Can I stack NGen with SR&ED?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Yes. NGen reimbursements reduce your "cost base" for SR&ED, but you can claim the tax credit on the <em>remaining</em> portion of your expenses. This "stacking" effect can cover up to 75% of total project costs.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. Does CDAP cover software subscriptions?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    The <a href="https://ised-isde.canada.ca/site/canada-digital-adoption-program/en" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CDAP (Canada Digital Adoption Program)</a> loan can be used to pay for the first 12 months of a software subscription (like an ERP) as part of the implementation cost.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. What if I just need a new CNC machine?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    If there is no innovation/R&D involved, you likely won't get IRAP or NGen. Instead, look at Regional Development Agencies (like FedDev Ontario or PacifiCan) which often have interest-free loans for "productivity scaling" capable of funding standard equipment.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">4. Is there funding for green retrofits?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Yes. The "Clean Technology Investment Tax Credit" (30% refundable) applies to new machinery that generates clean energy or significantly reduces emissions.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">5. How does NGen collaboration work?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    You must partner with at least one other company (e.g., a tech vendor or another manufacturer). Check the <a href="https://www.ngen.ca/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NGen Project Guide</a> for specific partnership rules. Collaborative projects score much higher.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">6. What is the typical grant size?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    For equipment/adoption, usually $50k-$100k. For large-scale NGen innovation projects, grants often range from $1M to $5M.
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
              <h3 className="text-xl font-bold text-slate-900 mb-6">Related Funding Pathways</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/sred-application-guide" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Tax Credits</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">SR&ED Guide</h4>
                    <p className="text-sm text-slate-500 flex-grow">Recover costs for shop-floor experiments.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/canada-digital-ai-funding-guide" className="group block h-full">
                  <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Digital</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-purple-700 mb-2">AI Funding Guide</h4>
                    <p className="text-sm text-slate-500 flex-grow">For AI-driven quality control funding.</p>
                    <div className="mt-3 text-xs text-purple-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/canada-cleantech-funding-guide" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Net Zero</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">CleanTech Guide</h4>
                    <p className="text-sm text-slate-500 flex-grow">Funding for energy efficiency retrofits.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-slate-900 to-gray-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Modernize Your Factory</h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Don't leave money on the table. Our experts help you identify and apply for the right mix of equipment and innovation grants.
            </p>
            <Button size="lg" className="bg-slate-500 hover:bg-slate-600 text-white font-semibold shadow-lg shadow-slate-900/50" asChild>
              <Link href="/contact?service=manufacturing-expert-help">
                Get Manufacturing Funding Help
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
