import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Mountain, Users, Zap, Shield, Award, HelpCircle, ExternalLink, ArrowRight, AlertTriangle, Lightbulb, Trees, Leaf, Briefcase } from "lucide-react"
{/* Section 2: Regional Trusts */ }
<section id="regional-trusts" className="py-20 bg-gray-50 border-t border-gray-200">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-8">
        <Trees className="w-10 h-10 text-emerald-600 mr-4" />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">2. The "Regional Trusts"</h2>
          <p className="text-gray-600">The Secret Weapon for Rural BC</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <p className="text-gray-700 text-lg mb-8">
          Decades ago, BC created massive trusts to help regions transition from forestry. These trusts are cash-rich and actively looking for projects.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Northern Development Initiative Trust (NDIT)</h3>
            <p className="text-sm text-gray-600 mb-4">Serving: Prince George, Terrace, Fort St. John, etc.</p>

            <div className="bg-emerald-50 p-4 rounded border border-emerald-100">
              <h4 className="font-bold text-emerald-900 text-sm mb-2">Top Program: Competitiveness Consulting Rebate</h4>
              <p className="text-xs text-gray-700 mb-2">
                NDIT pays <strong>50% of the cost</strong> (up to $30,000) for you to hire a consultant to improve your productivity (e.g., Marketing Plan, Lean Manufacturing audit).
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Island Coastal Economic Trust (ICET)</h3>
            <p className="text-sm text-gray-600 mb-4">Serving: Vancouver Island (excluding Victoria core) and Sunshine Coast.</p>

            <div className="bg-blue-50 p-4 rounded border border-blue-100">
              <h4 className="font-bold text-blue-900 text-sm mb-2">Top Focus: Tourism & Tech</h4>
              <p className="text-xs text-gray-700 mb-2">
                Often funds projects that bring visitors or build tech infrastructure.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Southern Interior & Kootenays</h3>
          <p className="text-sm text-gray-600">
            Operated via <strong>ETSI-BC</strong> (Economic Trust of the Southern Interior). Look for their "Rural Business & Community Recovery" streams.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Deep Dive Text Content - SEO & Authority */ }
<section className="py-20 bg-white border-t border-gray-200">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto prose prose-lg prose-emerald text-gray-700">
      <h2>The BC Advantage: How to Win</h2>
      <p>
        British Columbia's funding landscape is highly "Sector" and "Region" specific. A generic application that works in Toronto will fail in Prince George.
      </p>

      <h3>1. The "Alacrity" Factor (Digital Adoption)</h3>
      <p>
        While the rest of Canada waits for federal updates on CDAP, BC has <strong>Alacrity Canada</strong>. They are the delivery partner for the "Grow Your Business Online" grant.
      </p>
      <p>
        <strong>Why this matters:</strong> Alacrity often runs cohorts that include extra value (e.g., free digital marketing bootcamps) on top of the $2,400 grant. When applying for digital funding in BC, always check Alacrity's "Bootcamp" schedule first.
      </p>

      <h3>2. New Ventures BC: The Unofficial "Grant"</h3>
      <p>
        If you have a tech startup, you must enter the <strong>New Ventures BC Competition</strong>. It is not just for the $250,000 top prize.
      </p>
      <ul>
        <li><strong>The Top 25:</strong> Making the "Top 25" list allows you to put the NVBC badge on your site. This effectively "Pre-Qualifies" you for other funding. Investors see it as a stamp of due diligence.</li>
        <li><strong>Mentorship:</strong> You get paired with heavy-hitter mentors who often sit on the boards of the grant committees you will apply to later.</li>
      </ul>

      <h3>3. Rural Dividend & The "Transition" Story</h3>
      <p>
        If you are outside the Lower Mainland, your grant application must tell a "Transition" story.
      </p>
      <p>
        <strong>The Narrative:</strong> "My business is helping this community move away from pure resource extraction (Logging/Mining) toward a diversified economy (Tourism/Tech)."
        <br />
        <em>Example:</em> A craft brewery in Smithers isn't just selling beer; it is "Creating a Tourism Destination that diversifies the local economy." This framing unlocks Rural Dividend funds.
      </p>

      <h3>4. Buy BC: The Marketing Grant</h3>
      <p>
        Do you make a physical product in BC? (Food, Beverage, Apparel).
      </p>
      <p>
        The <strong>Buy BC Partnership Program</strong> offers up to 50% cost-shared funding for marketing. This includes:
      </p>
      <ul>
        <li><strong>Packaging Redesign:</strong> Adding the "Buy BC" logo to your label.</li>
        <li><strong>Ads:</strong> Running Facebook/Instagram ads targeting local buyers.</li>
        <li><strong>Trade Shows:</strong> Booth fees for local markets.</li>
      </ul>
    </div>
  </div>
</section>
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BC Small Business Grants 2026 | Rebates & Innovate BC Funding",
  description: "Complete 2026 guide to British Columbia business grants. Get funding from Innovate BC, Northern Development Initiative Trust, and CleanBC energy rebates.",
  keywords: "BC small business grants, Innovate BC funding, Northern Development Initiative Trust, CleanBC business rebates, BC employer training grant, startup grants Vancouver",
}

export default function BCSmallBusinessGrantsGuide() {
  const faqData = [
    {
      question: "Is there a general start-up grant for BC businesses?",
      answer: "No universal 'free money' grant exists. However, if you are outside Vancouver/Victoria, regional trusts (like Northern Development) offer significant rebates ($30k+) for consulting or capital upgrades."
    },
    {
      question: "What is the BC Employer Training Grant (ETG)?",
      answer: "The ETG covers 60-100% of employee training costs, up to $10,000 per employee. It is BC's version of the Canada Job Grant and helps upskill your workforce."
    },
    {
      question: "Can I get funding for a green business?",
      answer: "Yes, BC leads Canada in green funding. 'CleanBC' offers huge rebates for switching to heat pumps, electric fleets (Go Electric), and energy-saving retrofits."
    },
    {
      question: "How does the Venture Acceleration Program work?",
      answer: "Run by Innovate BC partners (like New Ventures BC or VIATEC), this is a mentorship-first program. While not a direct cash grant, it prepares you for investment and connects you to federal IRAP funding."
    },
    {
      question: "What is the Northern Development Initiative Trust?",
      answer: "A massive fund ($250M+) specifically for Northern/Central BC. They offer 'Competitiveness Consulting Rebates' (paying 50% of expert advice) and 'Façade Improvement' grants."
    },
    {
      question: "Are there grants for hiring students in BC?",
      answer: "Yes. In addition to federal SWPP, BC runs 'Innovator Skills Initiative' (ISI) giving up to $10,000 to hire a student for a tech/innovation role."
    },
    {
      question: "Is there funding for tourism operators?",
      answer: "Yes. Destination BC often runs 'Co-op Marketing' programs where they match your ad spend to attract tourists to your region."
    },
    {
      question: "What is the 'Launch Online' grant?",
      answer: "The COVID-era 'Launch Online' endowment has largely wound down, but standard CDAP (Grow Your Business Online) $2,400 grants are still available via Alacrity Canada (the BC delivery partner)."
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
        <section className="bg-gradient-to-br from-emerald-900 to-green-900 text-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-emerald-500/20 text-emerald-100 border-emerald-400/30 px-4 py-1.5 text-sm uppercase tracking-wide">
                🏔️ BC Innovation Economy
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                BC Small Business Grants 2026: <span className="text-emerald-400">Green, Tech & Rural</span>
              </h1>
              <p className="text-xl text-emerald-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                British Columbia funds what it values: <strong>Clean Energy</strong>, <strong>Technology</strong>, and <strong>Regional Development</strong>. If you are fitting heat pumps or building apps in Prince George, the money is waiting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-emerald-900 font-bold text-lg px-10 py-6 shadow-xl" asChild>
                  <Link href="#innovate-bc">
                    Innovate BC Grants
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-emerald-400/50 text-white hover:bg-emerald-900/50 font-semibold text-lg px-10 py-6" asChild>
                  <Link href="#regional-trusts">
                    Rural/Northern Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Alert */}
        <section className="py-12 bg-white -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start">
                  <Mountain className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">The "Vancouver vs. Rest of BC" Divide</h3>
                    <p className="text-blue-800 mb-4">
                      <strong>Vancouver/Victoria:</strong> Funding is focused on Tech (Innovate BC) and Green retrofits.
                    </p>
                    <p className="text-blue-800">
                      <strong>Rural/Northern BC:</strong> Enormous "Regional Trusts" exist to stimulate the economy. If you are in Terrace, Nelson, or Nanaimo, you have access to grants that Vancouverites do NOT.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Common Questions Section */}
        <section className="py-12 bg-emerald-50 border-b border-emerald-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About BC Grants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#innovate-bc" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-emerald-100">
                  <h3 className="font-semibold text-emerald-700">What funding is available for tech startups?</h3>
                  <p className="text-sm text-gray-600 mt-1">Innovate BC programs for hiring and digital skills.</p>
                </a>
                <a href="#regional-trusts" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-emerald-100">
                  <h3 className="font-semibold text-emerald-700">Can I get grants in Rural BC?</h3>
                  <p className="text-sm text-gray-600 mt-1">Guide to Northern Development and Island Coastal Trusts.</p>
                </a>
                <a href="#innovate-bc" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-emerald-100">
                  <h3 className="font-semibold text-emerald-700">Is there a grant for hiring students?</h3>
                  <p className="text-sm text-gray-600 mt-1">Innovator Skills Initiative and youth employment funding.</p>
                </a>
                <a href="#stacking-strategy" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-emerald-100">
                  <h3 className="font-semibold text-emerald-700">How do I stack CleanBC rebates?</h3>
                  <p className="text-sm text-gray-600 mt-1">Maximize funding for energy efficiency upgrades.</p>
                </a>
                <a href="#common-mistakes" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-emerald-100">
                  <h3 className="font-semibold text-emerald-700">Why do applications get rejected?</h3>
                  <p className="text-sm text-gray-600 mt-1">Avoid common mistakes like retroactive spending.</p>
                </a>
                <a href="#regional-trusts" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-emerald-100">
                  <h3 className="font-semibold text-emerald-700">What is the "Buy BC" program?</h3>
                  <p className="text-sm text-gray-600 mt-1">Funding for marketing and packaging for local products.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Innovate BC */}
        <section id="innovate-bc" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Innovate BC (Tech & Hiring)</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  The provincial crown agency for tech. They don't just fund "Apps"; they fund any business *adopting* tech.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-indigo-100 bg-indigo-50/50">
                  <CardHeader><CardTitle className="text-indigo-900">Innovator Skills Initiative (ISI)</CardTitle></CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-indigo-700 mb-2">Up to $10,000</div>
                    <p className="text-sm text-gray-600 mb-4">To hire a student for a tech or business role.</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 text-indigo-600 mr-2" /> Must be under-represented group</li>
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 text-indigo-600 mr-2" /> "Tech" role broadly defined</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-indigo-100 bg-indigo-50/50">
                  <CardHeader><CardTitle className="text-indigo-900">Digital Skills for Youth (DS4Y)</CardTitle></CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-indigo-700 mb-2">Up to $15,000</div>
                    <p className="text-sm text-gray-600 mb-4">Hire a recent grad (under 30) for digital work.</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 text-indigo-600 mr-2" /> Internships 6-12 months</li>
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 text-indigo-600 mr-2" /> Includes $4k training budget</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Regional Trusts */}
        <section id="regional-trusts" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Trees className="w-10 h-10 text-emerald-600 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">2. The "Regional Trusts"</h2>
                  <p className="text-gray-600">The Secret Weapon for Rural BC</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <p className="text-gray-700 text-lg mb-8">
                  Decades ago, BC created massive trusts to help regions transition from forestry. These trusts are cash-rich and actively looking for projects.
                </p>

                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <img src="/placeholder-map.png" alt="Map of BC Regions" className="w-full h-48 bg-gray-200 rounded-lg object-cover mb-4 hidden" /> {/* Placeholder for mental map */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Northern Development Initiative Trust (NDIT)</h3>
                    <p className="text-sm text-gray-600 mb-4">Serving: Prince George, Terrace, Fort St. John, etc.</p>

                    <div className="bg-emerald-50 p-4 rounded border border-emerald-100">
                      <h4 className="font-bold text-emerald-900 text-sm mb-2">Top Program: Competitiveness Consulting Rebate</h4>
                      <p className="text-xs text-gray-700 mb-2">
                        NDIT pays <strong>50% of the cost</strong> (up to $30,000) for you to hire a consultant to improve your productivity (e.g., Marketing Plan, Lean Manufacturing audit).
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Island Coastal Economic Trust (ICET)</h3>
                    <p className="text-sm text-gray-600 mb-4">Serving: Vancouver Island (excluding Victoria core) and Sunshine Coast.</p>

                    <div className="bg-blue-50 p-4 rounded border border-blue-100">
                      <h4 className="font-bold text-blue-900 text-sm mb-2">Top Focus: Tourism & Tech</h4>
                      <p className="text-xs text-gray-700 mb-2">
                        Often funds projects that bring visitors or build tech infrastructure.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Southern Interior & Kootenays</h3>
                  <p className="text-sm text-gray-600">
                    Operated via <strong>ETSI-BC</strong> (Economic Trust of the Southern Interior). Look for their "Rural Business & Community Recovery" streams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: CleanBC */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Leaf className="w-10 h-10 text-green-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">3. CleanBC: Getting Paid to Go Green</h2>
              </div>
              <p className="text-lg text-gray-600 mb-10 max-w-3xl">
                BC allows you to stack rebates. If you upgrade your building or fleet, you can get massive cash back.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader><CardTitle className="text-lg">Commercial Vehicles</CardTitle></CardHeader>
                  <CardContent>
                    <p className="font-bold text-green-700 text-2xl mb-2">Up to $100k</p>
                    <p className="text-sm text-gray-600">Rebates for buying electric delivery vans, cargo bikes, or installing charging stations.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">Better Buildings</CardTitle></CardHeader>
                  <CardContent>
                    <p className="font-bold text-green-700 text-2xl mb-2">Custom Incentives</p>
                    <p className="text-sm text-gray-600">Funding for insulation, HVAC upgrades (Heat Pumps), and LED lighting in commercial spaces.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">CleanBC Industry</CardTitle></CardHeader>
                  <CardContent>
                    <p className="font-bold text-green-700 text-2xl mb-2">Study Grants</p>
                    <p className="text-sm text-gray-600">50% funding for "Energy Studies" to figure out how to lower emissions at your plant.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="stacking-strategy" className="py-16 bg-blue-50 border-t border-blue-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-blue-900">The "BC Stack": How to Get $50k+</h2>
              <p className="text-blue-800 mb-6">
                In Ontario, you usually get one big grant. In BC, you win by "Stacking" 3-4 smaller ones. Here is the perfect playbook for a manufacturing or tourism business.
              </p>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200 flex items-start">
                  <div className="bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Hire a Student ($10k)</h4>
                    <p className="text-sm text-gray-600">Use <strong>Innovator Skills Initiative</strong> to hire a marketing intern. They will write your grant applications for step 2.</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200 flex items-start">
                  <div className="bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Get the Plan ($15k)</h4>
                    <p className="text-sm text-gray-600">Apply to <strong>Buy BC</strong> to pay for 50% of a marketing plan, OR apply to <strong>NDIT Competitiveness Rebate</strong> for an operational audit.</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200 flex items-start">
                  <div className="bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Buy the Gear ($50k+)</h4>
                    <p className="text-sm text-gray-600">Use the audit from step 2 to justify a <strong>CleanBC</strong> rebate for new efficient equipment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="common-mistakes" className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-red-900">Why BC Grant Applications Fail</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-red-100 shadow-sm">
                  <h3 className="font-bold text-red-800 mb-2">1. The "Vancouver" Bias</h3>
                  <p className="text-sm text-gray-700">If you are in Vancouver, do NOT apply for Regional Trusts (NDIT, ICET). You will be rejected immediately. Focus on Innovate BC and Federal grants.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-red-100 shadow-sm">
                  <h3 className="font-bold text-red-800 mb-2">2. Missing the Quarterly Intake</h3>
                  <p className="text-sm text-gray-700">NDIT and ICET operate on quarterly intakes (e.g., Feb, May, Aug, Nov). If you apply in June, you wait 3 months. Check the calendar.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-red-100 shadow-sm">
                  <h3 className="font-bold text-red-800 mb-2">3. "Retroactive" Spending</h3>
                  <p className="text-sm text-gray-700">BC grants are strict. You cannot spend a dime until you get the "Approval Letter". If you buy the machine today and apply tomorrow, you get $0.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-red-100 shadow-sm">
                  <h3 className="font-bold text-red-800 mb-2">4. Ignoring Indigenous Partnership</h3>
                  <p className="text-sm text-gray-700">For resource/land projects, having a letter of support from the local First Nation is often the "Golden Ticket" that pushes your application to the top of the pile.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed FAQ Section */}
        <section className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-start">
                      <HelpCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 pl-8">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Provincial Business Grants</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Link href="/canada/ontario" className="flex items-center p-4 bg-white rounded-lg border hover:border-emerald-500 transition-all"><Users className="w-5 h-5 text-blue-600 mr-3" /><span>Ontario Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/alberta" className="flex items-center p-4 bg-white rounded-lg border hover:border-emerald-500 transition-all"><Award className="w-5 h-5 text-orange-600 mr-3" /><span>Alberta Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/quebec" className="flex items-center p-4 bg-white rounded-lg border hover:border-emerald-500 transition-all"><Briefcase className="w-5 h-5 text-purple-600 mr-3" /><span>Quebec Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/british-columbia" className="flex items-center p-4 bg-white rounded-lg border hover:border-emerald-500 transition-all"><Mountain className="w-5 h-5 text-emerald-600 mr-3" /><span>All BC Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-emerald-500 transition-all"><Shield className="w-5 h-5 text-red-600 mr-3" /><span>All Provincial Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Funding Guides</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/bc-women-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Lightbulb className="w-5 h-5 text-pink-600 mr-3" /><span>BC Women Entrepreneurs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/clean-tech-energy-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Leaf className="w-5 h-5 text-green-600 mr-3" /><span>CleanBC Energy Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">BC Success Stories</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">The Prince George Brewery</h4>
                  <p className="text-sm text-gray-600 mb-2"><strong>Challenge:</strong> Wanted to expand but bank loan rates were too high.</p>
                  <p className="text-sm text-gray-600"><strong>Solution:</strong> Used <strong>NDIT Competitiveness Rebate</strong> to pay for a marketing plan, then used that plan to get a BDC loan. Result: 20% growth.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">The Victoria Tech Startup</h4>
                  <p className="text-sm text-gray-600 mb-2"><strong>Challenge:</strong> Needed to hire a developer but had no revenue.</p>
                  <p className="text-sm text-gray-600"><strong>Solution:</strong> Used <strong>Innovator Skills Initiative (ISI)</strong> to get $10k subsidy for a student hire. The student built the MVP.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-emerald-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Explore the Trusts</h2>
              <p className="text-xl text-emerald-100 mb-10">
                If you are outside the Lower Mainland, your first call should be to NDIT, ICET, or ETSI.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="https://www.northerndevelopment.bc.ca/" target="_blank" rel="noopener noreferrer">
                    <Mountain className="w-5 h-5 mr-2" />
                    Visit Northern Trust
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-emerald-400 text-emerald-100 hover:bg-emerald-800 hover:text-white font-semibold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/blog/bc-women-business-grants">
                    See BC Women's Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div >
    </>
  )
}
