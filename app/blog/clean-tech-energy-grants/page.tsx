import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Leaf, Zap, Wind, Shield, Award, HelpCircle, ExternalLink, ArrowRight, AlertTriangle, Lightbulb, Factory, Briefcase } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Clean Tech & Energy Grants Canada 2026 | 30% Tax Credits & Funding",
  description: "Complete 2026 guide to Canadian Clean Tech funding. Learn about the 30% Clean Tech Investment Tax Credit (ITC), SDTC grants, and NRCan energy efficiency programs.",
  keywords: "Canada clean tech grants, clean technology investment tax credit ITC, SDTC funding, NRCan grants, ZEVIP program, green business grants Canada",
}

export default function CleanTechEnergyGrantsGuide() {
  const faqData = [
    {
      question: "What is the Clean Tech Investment Tax Credit (ITC)?",
      answer: "The ITC is a refundable tax credit that covers 30% of the capital cost of eligible clean tech property (e.g., solar panels, wind turbines, energy storage). It is available now and is a massive incentive."
    },
    {
      question: "Is Sustainable Development Technology Canada (SDTC) accepting applications?",
      answer: "SDTC is the primary federl funder for clean tech pilots. While it faced governance reviews in 2024/2025, its core mandate remains. Check the official portal for the specific 'Seed', 'Start-up', or 'Scale-up' stream status."
    },
    {
      question: "Can I get funding for EV chargers?",
      answer: "Yes. The Zero Emission Vehicle Infrastructure Program (ZEVIP) funds up to 50% of the cost of installing EV chargers for fleets, workplaces, or public use."
    },
    {
      question: "What is the Clean Growth Hub?",
      answer: "The Clean Growth Hub is not a fund itself; it is a 'whole-of-government' concierge service. You fill out one form, and they tell you which of the 160+ federal clean programs fits your project."
    },
    {
      question: "Are there grants for energy efficiency retrofits?",
      answer: "Yes, but they are often regional. In BC, CleanBC offers rebates. Nationally, the 'Green and Inclusive Community Buildings' program funds larger retrofits. For SMEs, look for 'Energy Manager' programs."
    },
    {
      question: "Does this apply to Hydrogen projects?",
      answer: "Yes. Hydrogen has its own massive Investment Tax Credit (up to 40% depending on carbon intensity). It is a strategic priority for Canada."
    },
    {
      question: "Can I stack the ITC with grants?",
      answer: "Generally, yes, but the ITC amount will be calculated on the 'net' cost (Cost minus Grant). You cannot get Paid twice for the same dollar."
    },
    {
      question: "What about Agricultural Clean Tech?",
      answer: "Agriculture and Agri-Food Canada (AAFC) runs the 'Agricultural Clean Technology Program' specifically for farmers adopting dryers, solar, or precision ag tech."
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
        <section className="bg-gradient-to-br from-emerald-900 to-green-800 text-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-emerald-500/20 text-emerald-100 border-emerald-400/30 px-4 py-1.5 text-sm uppercase tracking-wide">
                🌱 Net-Zero Economy 2026
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Canada Clean Tech Funding: <span className="text-emerald-400">The 30% ITC Era</span>
              </h1>
              <p className="text-xl text-emerald-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                Canada is pouring billions into the green transition. The headline isn't just grants anymore; it's the <strong>refundable 30% Investment Tax Credit (ITC)</strong> that puts cash back in your pocket.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-emerald-900 font-bold text-lg px-10 py-6 shadow-xl" asChild>
                  <Link href="#itc-tax-credit">
                    The 30% ITC Explained
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-emerald-400/50 text-white hover:bg-emerald-900/50 font-semibold text-lg px-10 py-6" asChild>
                  <Link href="#sdtc-funding">
                    SDTC Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* The "Concierge" Alert */}
        <section className="py-12 bg-white -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start">
                  <Lightbulb className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">First Stop: The Clean Growth Hub</h3>
                    <p className="text-blue-800 mb-4">
                      Clean Tech is complex. 16 federal departments have funding. To avoid navigating 16 websites, go to the <strong>Clean Growth Hub</strong>.
                    </p>
                    <p className="text-blue-800">
                      They offer a free advisory service where you submit one project form, and they tell you exactly which grants (SDTC, NRCan, CIB) you qualify for.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: The ITC Masterclass */}
        <section id="itc-tax-credit" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">1. The Game Changer: Clean Tech ITC</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Forget competitive grant applications. This is a tax credit enshrined in law. If you buy eligible equipment, you get 30% back.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-1">
                  <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-2xl mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-emerald-900">Clean Technology ITC</h3>
                      <Badge className="bg-emerald-600 text-white text-lg px-4 py-1">30% Refundable</Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Eligible Equipment:</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-emerald-500 mr-2" /> Solar Panels</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-emerald-500 mr-2" /> Wind Turbines</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-emerald-500 mr-2" /> Energy Storage (Batteries)</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-emerald-500 mr-2" /> Electric Heating (Heat Pumps)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Key Details:</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center"><AlertTriangle className="w-4 h-4 text-emerald-500 mr-2" /> Available NOW (Retroactive to 2023)</li>
                          <li className="flex items-center"><AlertTriangle className="w-4 h-4 text-emerald-500 mr-2" /> Must meet Labour Conditions</li>
                          <li className="flex items-center"><AlertTriangle className="w-4 h-4 text-emerald-500 mr-2" /> Refundable (Check arrives even if no profit)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-2">The "Prevailing Wage" Catch</h4>
                    <p className="text-gray-600 text-sm">
                      To get the full 30%, you must pay "prevailing union wages" to the workers installing the equipment. If you don't, the credit drops to 20%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: SDTC Funding */}
        <section id="sdtc-funding" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Leaf className="w-10 h-10 text-emerald-600 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">2. SDTC (Sustainable Development Technology Canada)</h2>
                  <p className="text-gray-600">The premier funder for IP-rich Clean Tech</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <p className="text-gray-700 text-lg mb-8">
                  If you are <strong>Inventing</strong> new clean tech (not just buying solar panels), SDTC is your partner. They fund 33-50% of your pilot project costs.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-emerald-100 bg-emerald-50/50">
                    <CardHeader><CardTitle className="text-emerald-900">Seed Funding</CardTitle></CardHeader>
                    <CardContent>
                      <p className="font-bold text-lg mb-2">$50k - $100k</p>
                      <p className="text-xs text-gray-600 mb-4">Nomination based. Must be recommended by an accelerator (like MaRS, Foresight).</p>
                    </CardContent>
                  </Card>
                  <Card className="border-emerald-100 bg-emerald-50/50">
                    <CardHeader><CardTitle className="text-emerald-900">Start-up</CardTitle></CardHeader>
                    <CardContent>
                      <p className="font-bold text-lg mb-2">Ave. $3 Million</p>
                      <p className="text-xs text-gray-600 mb-4">For demonstrating your tech in a real-world setting (a pilot).</p>
                    </CardContent>
                  </Card>
                  <Card className="border-emerald-100 bg-emerald-50/50">
                    <CardHeader><CardTitle className="text-emerald-900">Scale-up</CardTitle></CardHeader>
                    <CardContent>
                      <p className="font-bold text-lg mb-2">$10 Million+</p>
                      <p className="text-xs text-gray-600 mb-4">For building the first commercial plant or massive rollout.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: NRCan ZEVIP */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Zap className="w-10 h-10 text-yellow-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">3. ZEVIP (EV Chargers)</h2>
              </div>
              <p className="text-lg text-gray-600 mb-10 max-w-3xl">
                The <strong>Zero Emission Vehicle Infrastructure Program (ZEVIP)</strong> is aggressive. Canada wants chargers everywhere.
              </p>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-bold text-xl mb-4">The Deal:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-1" />
                      <span className="text-gray-700"><strong>50% Funding</strong> for purchase and installation.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-1" />
                      <span className="text-gray-700">Up to <strong>$5,000 per connector</strong> (Level 2).</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-1" />
                      <span className="text-gray-700">Up to <strong>$50,000 per connector</strong> (Fast Charger).</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl">
                  <h3 className="font-bold text-xl mb-4">Who is it for?</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-white">Workplaces</Badge>
                    <Badge variant="outline" className="bg-white">Apartment Buildings</Badge>
                    <Badge variant="outline" className="bg-white">Retail Stores</Badge>
                    <Badge variant="outline" className="bg-white">Fleets</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    *Note: Deadlines are strict. Rounds open for short windows (e.g., 3 months).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cib-retrofits" className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">The Deep Pockets: Canada Infrastructure Bank (CIB)</h2>
              <p className="text-gray-700 mb-6">If your project is huge ($25M+), grants won't cut it. You need the CIB. Their <strong>Building Retrofits Initiative</strong> offers low-interest loans where repayment is tied to energy savings.</p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center"><Factory className="w-5 h-5 mr-2" /> Commercial Building Retrofits</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-700 mb-2"><strong>The Problem:</strong> Retrofitting an office tower costs $50M. Banks think it's risky.</p>
                    <p className="text-sm text-gray-700"><strong>The CIB Solution:</strong> They lend you up to 80% of the cost at <span className="text-green-600 font-bold">1% - 2% interest</span>.</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2"><strong>The Aggregator Model:</strong></p>
                    <p className="text-sm text-gray-700">Don't have $25M in retrofits? Aggregators (like SOFIAC) bundle 50 small projects together to hit the CIB minimum.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="clean-electricity-itc" className="py-16 bg-yellow-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start">
                <Zap className="w-10 h-10 text-yellow-600 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">Wait, there's another ITC? (Clean Electricity)</h2>
                  <p className="text-gray-700 mb-4">Don't confuse the <strong>Clean Technology ITC</strong> (30%) with the <strong>Clean Electricity ITC</strong> (15%).</p>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-yellow-100">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2">Feature</th>
                          <th className="py-2">Clean Tech ITC (30%)</th>
                          <th className="py-2">Clean Electricity ITC (15%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-bold">Who applies?</td>
                          <td className="py-2">Taxable Businesses</td>
                          <td className="py-2">Non-Taxable (Utilities, Indigenous)</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-bold">What it funds?</td>
                          <td className="py-2">Solar, Wind, Storage</td>
                          <td className="py-2">Power Generation & Transmission</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-bold">Refundable?</td>
                          <td className="py-2 text-green-600 font-bold">Yes</td>
                          <td className="py-2 text-green-600 font-bold">Yes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sreps" className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Smart Renewables (SREPs)</h2>
              <p className="text-gray-700 mb-6">The <strong>Smart Renewables and Electrification Pathways Program (SREPs)</strong> is NRCan's big grant bucket. It funds grid modernization.</p>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-green-100 bg-green-50/50">
                  <CardHeader><CardTitle className="text-green-900 text-lg">Capacity Building</CardTitle></CardHeader>
                  <CardContent><p className="text-xs text-gray-600">Funding for Indigenous communities to just <em>study</em> renewable options.</p></CardContent>
                </Card>
                <Card className="border-green-100 bg-green-50/50">
                  <CardHeader><CardTitle className="text-green-900 text-lg">Grid Modernization</CardTitle></CardHeader>
                  <CardContent><p className="text-xs text-gray-600">Funding for utilities to add sensors/batteries to handle more solar.</p></CardContent>
                </Card>
                <Card className="border-green-100 bg-green-50/50">
                  <CardHeader><CardTitle className="text-green-900 text-lg">Established Renewables</CardTitle></CardHeader>
                  <CardContent><p className="text-xs text-gray-600">Funding to deploy proven tech (Solar/Wind) in regions where it's not yet common.</p></CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="ccfd" className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">The "Carbon Guarantee" (CCFDs)</h2>
              <p className="text-gray-300 mb-8">What if a future government cancels the carbon tax? Your project fails. The <strong>Canada Growth Fund</strong> solves this with <strong>Carbon Contracts for Difference (CCFDs)</strong>.</p>

              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="font-bold text-white mb-4">How it works:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Shield className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                    <div>
                      <strong className="text-white">The Strike Price:</strong>
                      <p className="text-sm text-gray-400">The government guarantees you a carbon price of (e.g.) $100/tonne for 15 years.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                    <div>
                      <strong className="text-white">The Insurance:</strong>
                      <p className="text-sm text-gray-400">If the market price drops to $50/tonne (or is cancelled), the government pays you the difference ($50). If it rises to $150, you stick with the market price.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Text Content - SEO & Authority */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg prose-emerald text-gray-700">
              <h2>Mastering the 30% Clean Tech ITC</h2>
              <p>
                The <strong>Clean Technology Investment Tax Credit (ITC)</strong> is the single most significant policy shift in Canadian green energy history. It moves funding from "Permission-based" (Grants) to "Rights-based" (Tax Credits). If you follow the rules, the government <em>must</em> pay you.
              </p>

              <h3>1. The "Prevailing Wage" Trap</h3>
              <p>
                This is where most businesses will fail. To get the full 30% credit, you must pay "Prevailing Wages" to the workers (electricians, HVAC installers) who physically install the equipment.
              </p>
              <ul>
                <li><strong>The Rule:</strong> You must check the Union wage rate for that specific job in your postal code.</li>
                <li><strong>The Penalty:</strong> If you pay even $1 below this rate (or fail to document it), your tax credit drops to 20%.</li>
                <li><strong>The Solution:</strong> Add a clause to your specialized contractor's agreement: <em>"Contractor certifies that all labor is paid in accordance with the Prevailing Wage requirements of the Clean Tech ITC."</em></li>
              </ul>

              <h3>2. Stacking Rules</h3>
              <p>
                Can you get a grant AND the tax credit? Yes, but you can't double-dip.
              </p>
              <p>
                <strong>Example:</strong>
              </p>
              <ul>
                <li><strong>Project Cost:</strong> $1,000,000</li>
                <li><strong>Grant Received (e.g., Provincial):</strong> $200,000</li>
                <li><strong>Net Cost for ITC:</strong> $800,000 ($1M - $200k)</li>
                <li><strong>ITC Refund (30%):</strong> $240,000</li>
              </ul>
              <p>
                <strong>Total Funding:</strong> $200k (Grant) + $240k (ITC) = $440,000 (44% of project).
              </p>

              <h3>3. Carbon Credits (The Hidden Revenue)</h3>
              <p>
                Grants and Tax Credits pay for the <em>Capital Cost</em> (CAPEX). Carbon Credits pay for the <em>Operation</em> (OPEX).
              </p>
              <p>
                In Canada, large emitters rely on the <strong>Output-Based Pricing System (OBPS)</strong>. If your project generates "Offset Credits" (e.g., you capture methane or generate renewable power), you can sell those credits to heavy polluters.
              </p>
              <p>
                <strong>Price Floor:</strong> Carbon price is rising to $170/tonne by 2030. If your project offsets 10,000 tonnes per year, that is $1.7 Million in annual recurring revenue.
              </p>

              <h3>4. Navigating SDTC</h3>
              <p>
                The Sustainable Development Technology Canada (SDTC) fund is for "First-of-kind" deployments. They are looking for technology risk.
              </p>
              <ul>
                <li><strong>Do not apply</strong> if you are buying off-the-shelf solar panels (Use the ITC).</li>
                <li><strong>Do apply</strong> if you invented a new transparent solar glass that has never been tested on a skyscraper before.</li>
              </ul>
              <p>
                SDTC applications are rigorous (Phase 1: SOI, Phase 2: Full Proposal, Phase 3: Due Diligence). Expect a 6-9 month timeline.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed FAQ Section */}
        <section className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Accordion type="single" collapsible key={index}>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-medium text-emerald-700">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Provincial Clean Tech Programs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Link href="/canada/british-columbia" className="flex items-center p-4 bg-white rounded-lg border hover:border-emerald-500 transition-all"><Leaf className="w-5 h-5 text-emerald-600 mr-3" /><span>BC CleanBC Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/ontario" className="flex items-center p-4 bg-white rounded-lg border hover:border-emerald-500 transition-all"><Zap className="w-5 h-5 text-yellow-600 mr-3" /><span>Ontario Green Tech</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/alberta" className="flex items-center p-4 bg-white rounded-lg border hover:border-emerald-500 transition-all"><Wind className="w-5 h-5 text-blue-600 mr-3" /><span>Alberta Energy Transition</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/quebec" className="flex items-center p-4 bg-white rounded-lg border hover:border-emerald-500 transition-all"><Leaf className="w-5 h-5 text-green-600 mr-3" /><span>Quebec Hydro Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-emerald-500 transition-all"><Shield className="w-5 h-5 text-purple-600 mr-3" /><span>All Provincial Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Funding Guides</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/canada-innovation-research-development-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Lightbulb className="w-5 h-5 text-blue-600 mr-3" /><span>R&D Innovation Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/agriculture-agri-food-canada-government-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Factory className="w-5 h-5 text-orange-600 mr-3" /><span>Agricultural Clean Tech</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-emerald-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Connect with the Hub</h2>
              <p className="text-xl text-emerald-100 mb-10">
                Don't guess. Let the federal experts tell you what you qualify for.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="https://ised-isde.canada.ca/site/clean-growth-hub/en" target="_blank" rel="noopener noreferrer">
                    <Leaf className="w-5 h-5 mr-2" />
                    Visit Clean Growth Hub
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-emerald-400 text-emerald-100 hover:bg-emerald-800 hover:text-white font-semibold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/blog/canada-innovation-research-development-grants-guide">
                    Explore R&D Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}