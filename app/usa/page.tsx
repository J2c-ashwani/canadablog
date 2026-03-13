import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, DollarSign, Building2, Users, Lightbulb, TrendingUp, Landmark, MapPin, AlertCircle, FileText } from "lucide-react"
import { NewsletterSignup } from "@/components/newsletter-signup"
import Link from "next/link"
import type { Metadata } from "next"
import { getAllStateDetails } from "@/lib/data/stateDetails"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"


export const metadata: Metadata = {
  title: "USA Government Grants 2026: Federal & State Funding [50 States]",
  description:
    "Find USA government grants for small businesses and startups. Explore federal funding, state programs, SBIR/STTR grants, and opportunities for women and minorities.",
  keywords:
    "USA government grants, federal business grants, state business grants, small business funding, SBIR grants, startup grants USA",
  openGraph: {
    title: "USA Government Grants 2026: Federal & State Funding [50 States]",
    description: "Find USA government grants for small businesses and startups. Explore federal funding and state programs.",
    url: "https://www.fsidigital.ca/usa",
  },
}

export default function USAGrantsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              🇺🇸 USA Federal & State Programs
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Government Grants for{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                USA Businesses
              </span>
            </h1>
            {/* EEAT Badge — inside hero */}
            <div className="mb-6 flex justify-center">
              <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-03-01" />
            </div>
            {/* Short Answer — question-first, data-rich, inside hero */}
            <div className="mb-8 text-left">
              <ShortAnswerBox
                question="Can U.S. businesses get government grants in 2026?"
                content="Yes — and the amounts are substantial. The SBIR program alone distributes $4B+ per year in non-repayable R&D grants exclusively to U.S. small businesses, with Phase I awards up to $305K (NSF) and Phase II up to $2M (DOD, NIH, DOE). Beyond SBIR, SBA microloans ($5K–$50K), state economic development grants, and 26+ federal agency programs add billions more. Unlike loans, these funds are non-repayable and require no equity surrender — the primary barrier is finding the right program and submitting a technically strong application."
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                Browse Federal Grants
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                View State Programs
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* EligibleCheck below hero */}
      <section className="py-6 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <EligibleCheck />
          </div>
        </div>
      </section>


      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">$2.5B+</div>
              <div className="text-gray-600">Annual Funding</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">26+</div>
              <div className="text-gray-600">Federal Agencies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50</div>
              <div className="text-gray-600">States Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">5,000+</div>
              <div className="text-gray-600">Active Opportunities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Funding Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the right funding program based on your business profile and industry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Federal Grants */}
            <Card className="hover:shadow-lg transition-shadow border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Landmark className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Federal Grants</CardTitle>
                <CardDescription>Major funding programs from federal agencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-green-600">$50K - $2M+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-gray-900">Innovation & R&D</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/usa/federal-grants">View Federal Grants</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Small Business */}
            <Card className="hover:shadow-lg transition-shadow border-green-200">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <StoreIcon className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Small Business Grants</CardTitle>
                <CardDescription>Support for growth and operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-green-600">$10K - $100K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-gray-900">Growth & Hiring</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/usa/small-business-grants">View Opportunities</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Women Entrepreneurs - Linking to the specific page we found earlier */}
            <Card className="hover:shadow-lg transition-shadow border-pink-200">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle>Women Entrepreneurs</CardTitle>
                <CardDescription>Dedicated funding for women-owned businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-green-600">$5K - $500K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-gray-900">Equity & Inclusion</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/usa/women-entrepreneurs-grants">View Women's Grants</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Innovation & Tech */}
            <Card className="hover:shadow-lg transition-shadow border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Tech & Innovation</CardTitle>
                <CardDescription>SBIR/STTR and technology funding</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-green-600">Up to $1.7M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-gray-900">R&D & Commercialization</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/usa/technology-startup-grants">View Tech Grants</Link>
                </Button>
              </CardContent>
            </Card>

            {/* State Programs */}
            <Card className="hover:shadow-lg transition-shadow border-orange-200">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>State Programs</CardTitle>
                <CardDescription>Local funding in your state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-green-600">Varies</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-gray-900">Economic Development</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/usa/california">California</Link>
                    </Button>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/usa/texas">Texas</Link>
                    </Button>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/usa/new-york">New York</Link>
                    </Button>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/usa/florida">Florida</Link>
                    </Button>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Startup Funding */}
            <Card className="hover:shadow-lg transition-shadow border-cyan-200">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-cyan-600" />
                </div>
                <CardTitle>Startup Funding</CardTitle>
                <CardDescription>Seed funding and early-stage capitl</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-green-600">$10K - $250K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-gray-900">Launch & Scale</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/grant-finder">Find Startup Grants</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Deep Content Sections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-10">

            <Card>
              <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Landmark className="h-5 w-5 text-blue-600" />How the U.S. Federal Business Grant System Works</CardTitle></CardHeader>
              <CardContent className="text-gray-700 space-y-4">
                <p className="leading-relaxed">
                  The United States federal government distributes over $700 billion in grants annually — the vast majority to state governments, universities, hospitals, and non-profits. The share available to for-profit businesses is smaller but substantial: approximately $4–6 billion per year flows through SBIR (Small Business Innovation Research) and STTR (Small Business Technology Transfer) alone, plus billions more through sector-specific agency programs (Department of Energy, Department of Defense, USDA, EPA, and others), SBA programs, Economic Development Administration (EDA) grants, and state-level funding amplified by federal block grants.
                </p>
                <p className="leading-relaxed">
                  Understanding the architecture prevents the most common mistake: thinking "federal grants" means a single program to search for on grants.gov. In reality, U.S. business funding flows through three distinct channels. First, <strong>SBIR/STTR programs</strong> at 11 federal agencies (NSF, DOD, DOE, NIH, NASA, USDA, DHS, EPA, DOC, ED, and HHS) — the primary source of technology R&D grants for small businesses, ranging from $305K (Phase I) to $2M (Phase II). Second, <strong>sector-specific agency grant programs</strong> — the Department of Energy funds cleantech and energy innovation, USDA funds agriculture and rural business, NOAA funds ocean and atmospheric innovation, NEA funds arts-based businesses, and each major federal agency maintains programs aligned with its mission. Third, <strong>state economic development programs</strong> — every state operates its own business grant and incentive programs, funded partly by federal Community Development Block Grants (CDBG) and partly by state appropriations.
                </p>
                <p className="leading-relaxed">
                  The most important strategic principle for U.S. businesses seeking grants: <strong>align with federal agency mission priorities</strong>. Federal agencies are not general business development organizations — they fund research and business activities that advance their specific mandates. DOD funds defense-relevant technology. DOE funds energy innovation. NIH funds health and biomedical research. USDA funds agriculture and rural development. The closer your business&apos;s work aligns with a specific federal agency&apos;s current mission priorities, the higher your probability of receiving funding — and the higher the funding amounts available to you.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader><CardTitle className="text-xl text-blue-900">SBIR/STTR — America&apos;s Primary Business Grant Program Explained</CardTitle></CardHeader>
              <CardContent className="text-blue-900 space-y-4">
                <p className="text-sm leading-relaxed">
                  SBIR (Small Business Innovation Research) and STTR (Small Business Technology Transfer) together represent the largest dedicated business grant program in U.S. history — and the most significant source of non-dilutive capital for technology-developing American small businesses. All federal agencies with extramural R&D budgets exceeding $100M are required to allocate 3.2% (SBIR) and 0.45% (STTR) to small business grants — collectively generating $4B+ in annual funding across 11 agencies.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[["Phase I", "$305K typical (NSF: $275K)", "6–12 month feasibility study — proving the concept is technically viable"], ["Phase II", "Up to $2M (NSF: $1M)", "2-year full R&D and prototype development toward commercialization"], ["Phase III", "No SBIR funds — private or federal procurement", "Commercialization, federal contracts, private investment; SBIR has created the path"]].map(([phase, amount, desc]) => (
                    <div key={phase} className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="font-bold text-blue-900 mb-1 text-sm">{phase}</div>
                      <div className="text-xs font-semibold text-blue-700 mb-2">{amount}</div>
                      <div className="text-xs text-blue-600">{desc}</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm leading-relaxed">
                  SBIR solicitations are published by each agency on their respective websites and on sbir.gov — each with specific technical topics that define the research areas the agency wants to fund. The competitive process: applicants submit a technical proposal responding to a specific topic; agency technical panel reviews and scores; top-scoring proposals receive Phase I awards. Phase I recipients are then eligible to apply for Phase II. Success rates vary: NSF SBIR Phase I typically 20–25%; DOD varies by topic from 5–30%; NIH SBIR 15–20%. The most successful SBIR applicants target agencies and topics with the strongest alignment to their existing technology and apply to 3–5 relevant topics simultaneously.
                </p>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">Key Federal Agencies for Business Grants</CardTitle></CardHeader>
                <CardContent className="text-gray-700">
                  <div className="space-y-3 text-sm">
                    {[["NSF SBIR", "Technology, computing, AI/ML, biotech, cleantech", "$305K (Ph.I) / $1M (Ph.II)"], ["DOE SBIR", "Energy, cleantech, materials, climate", "$300K (Ph.I) / $2M (Ph.II)"], ["NIH SBIR", "Biomedical, health tech, diagnostics, therapeutics", "$305K (Ph.I) / $2M (Ph.II)"], ["DOD SBIR", "Defense tech, cybersecurity, aerospace, advanced materials", "$250K–$300K (Ph.I) / $2M (Ph.II)"], ["USDA SBIR", "Agriculture, food systems, rural technology, bioeconomy", "$175K (Ph.I) / $1.7M (Ph.II)"], ["SBA", "Small business loans, WOSB/8(a) programs, advisory", "Microloans $5K–$50K; 7(a) $50K–$5M"]].map(([agency, focus, amount]) => (
                      <div key={agency} className="bg-gray-50 rounded-lg p-3">
                        <div className="font-semibold text-gray-900">{agency}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{focus}</div>
                        <div className="text-xs font-medium text-green-700 mt-1">{amount}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">State-Level Programs — Layered on Federal</CardTitle></CardHeader>
                <CardContent className="text-gray-700 space-y-3 text-sm">
                  <p className="leading-relaxed">Every state operates business grant, incentive, and loan programs — funded partly by federal CDBG grants and partly by state appropriations. State programs are generally more accessible than federal programs (smaller grant amounts, simpler applications, faster decisions) and complement federal SBIR/agency grants rather than competing with them.</p>
                  <div className="space-y-2">
                    {[["California", "CALFIRED cleantech, GO-Biz grants, IBank loan programs, Cal Competes"], ["Texas", "TEF tech fund, CPRIT cancer research, ETF incentives, regional SBDC grants"], ["New York", "Empire State Development, NYC SBS programs, NY Green Bank, NYSCA grants"], ["Florida", "FSBDC programs, Florida SBIR matching, QTI Qualified Target Industry"], ["Illinois/Midwest", "DCEO grants, Invest Illinois, IMSA Innovation Fund"]].map(([state, programs]) => (
                      <div key={state} className="bg-gray-50 rounded p-3">
                        <div className="font-semibold text-gray-900 text-xs">{state}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{programs}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* How to Apply */}
            <Card>
              <CardHeader><CardTitle className="text-xl flex items-center gap-2"><FileText className="h-5 w-5 text-blue-600" />How to Apply for U.S. Business Grants — 6-Step Strategy</CardTitle></CardHeader>
              <CardContent className="text-gray-700">
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Register Your Business on SAM.gov", desc: "SAM.gov (System for Award Management) is the federal government's contractor and grantee registration system — required for all federal grant and contract applications. Registration is free and takes 10–14 business days for processing. Complete SAM registration before applying for any federal grant. You'll need your EIN (Employer Identification Number), CAGE code, NAICS code, and D-U-N-S number. SAM registration must be renewed annually — set a calendar reminder to renew 30 days before expiration or your pending grant applications will be ineligible." },
                    { step: "2", title: "Identify Your Target Federal Agency and Solicitation Topics", desc: "Visit sbir.gov for SBIR/STTR solicitation searches. For non-SBIR grants, visit grants.gov and filter by agency and category. Review the current fiscal year's solicitation topics for 2–3 federal agencies whose mission aligns with your technology. Subscribe to agency SBIR/grant newsletters (NSF Innovation Corps, DOE SBIR newsletter, NIH funding alerts) to receive notice of new solicitations. Target agencies where your technology has the strongest mission alignment — don't apply to agencies where your work is a stretch." },
                    { step: "3", title: "Engage Your Local SBDC or SCORE Mentor Before Applying", desc: "America's Small Business Development Center (SBDC) network — with 1,000+ centers across all 50 states — provides free business advisory services including grant application review, business plan development, and financial modeling. SCORE provides free mentorship from retired executives. Contact your local SBDC at americassbdc.org before submitting your first federal or state grant application — their advisors can identify the most relevant programs, review your application narrative, and introduce you to regional resources that significantly improve your success rate." },
                    { step: "4", title: "For SBIR — Attend Agency Q&A webinars and Contact Technical Points of Contact (TPOCs)", desc: "Each SBIR solicitation topic has a federal Technical Point of Contact (TPOC) — a staff member at the funding agency responsible for that research topic. Before submitting your Phase I application, email or call the TPOC to confirm your technology fits the topic scope and to gauge interest. This 15-minute conversation can prevent submitting to a misaligned topic (wasting 40+ application hours) and can provide insight into what the review panel is specifically looking for. Most federal SBIR programs also hold pre-solicitation Q&A webinars — attend these for every topic you plan to target." },
                    { step: "5", title: "Apply for State Economic Development Programs in Parallel", desc: "State programs are generally less competitive and faster than federal programs — approval in weeks vs. months for federal grants. Your state's Department of Commerce or Economic Development agency administers most state business grant and incentive programs. Start your state search by visiting your state government's business development website and searching for 'business grant' or 'small business incentive.' Apply for state programs while your federal applications are pending — there is no conflict between receiving state and federal grants for different project activities." },
                    { step: "6", title: "Build a Multi-Year Grant Strategy, Not a One-Off Application", desc: "The most successful U.S. grant-funded companies treat grant funding as a strategic capability, not a one-time event. Build a grant calendar tracking all relevant agency solicitation deadlines throughout the year. Hire or designate a grant writer/manager internally (for companies receiving $500K+ in annual grant funding, this role pays for itself). Apply to SBIR Phase I at every relevant solicitation annually — SBIR success rates reward persistence, prior experience, and iterative improvement. Track your applications, win rates, review feedback, and apply lessons from each review to the next submission." },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                      <div><div className="font-semibold text-gray-900 mb-1">{item.title}</div><div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Common Mistakes */}
            <Card className="border-red-100 bg-red-50">
              <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-red-900"><AlertCircle className="h-5 w-5 text-red-600" />5 Costly Mistakes U.S. Businesses Make When Applying for Grants</CardTitle></CardHeader>
              <CardContent className="text-red-900 space-y-4">
                {[
                  { n: "1", m: "Not Registering on SAM.gov Before Applying for Any Federal Grant", d: "SAM.gov registration takes 10–14 business days for government processing — you cannot submit federal grant applications without an active SAM registration, and you cannot expedite the processing timeline. Businesses that discover this after finding a relevant solicitation miss the deadline waiting for SAM registration to complete. Complete SAM.gov registration immediately — before you identify a specific grant to apply for — so it is ready when you need it." },
                  { n: "2", m: "Applying to SBIR Without Understanding the Specific Technical Topic", d: "SBIR applications are evaluated based on how well they respond to the specific technical topic in the solicitation — not the technical merit of the innovation in general. Companies that submit their standard technology overview without carefully addressing the topic's specific requirements and evaluation criteria consistently score poorly regardless of technology quality. Read the topic description 5+ times. Contact the TPOC. Map every section of your proposal to the evaluation criteria. The proposal must answer the question the agency is asking — not the question you wish they'd asked." },
                  { n: "3", m: "Ignoring State and Local Programs While Waiting for Federal Results", d: "Federal grant decisions take 3–12 months. State grants take weeks to months. Businesses that apply for federal grants and then wait for results without pursuing state programs simultaneously lose access to meaningful state-level capital. Apply for state programs concurrently with federal applications — they fund different activities and are not exclusionary. Your state SBDC, economic development agency, and local chamber of commerce can identify active state and local funding opportunities that don't appear on grants.gov." },
                  { n: "4", m: "Treating Grants.gov as the Only Source of Grant Opportunities", d: "Grants.gov lists federally-administered competitive grants, but NOT the majority of business-relevant funding: SBIR solicitations are on sbir.gov and individual agency websites (NSF, DOE, etc.); SBA programs are on sba.gov; Economic Development Administration grants are on eda.gov; state programs are on state government websites; CDFI and community development funding is on cdfi.fund.treas.gov; and private foundation grants (for mission-aligned businesses) don't appear on grants.gov at all. Build a comprehensive funding database that goes beyond grants.gov." },
                  { n: "5", m: "Not Having SAM.gov Registration or Required Business Certifications Ready", d: "Federal grants often provide additional scoring advantages to businesses with specific certifications: HUBZone businesses (operating in historically underutilized business zones), 8(a) businesses (disadvantaged), Women-Owned Small Businesses (WOSB), Service-Disabled Veteran-Owned Small Businesses (SDVOSB). These certifications provide sole-source contract eligibility AND grant scoring advantages — but they require SBA approval which takes 3–6 months. Apply for all certifications your business qualifies for now, not when you identify a specific grant that provides preference." },
                ].map(({ n, m, d }) => (
                  <div key={n} className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="font-semibold mb-2 text-red-900">{n}. {m}</div>
                    <p className="text-sm text-red-800 leading-relaxed">{d}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">FAQ: USA Government Business Grants 2026</h2>
              <div className="space-y-4">
                {[
                  { q: "Can a for-profit business receive U.S. government grants?", a: "Yes — for-profit small businesses are specifically targeted by the largest dedicated business grant programs: SBIR and STTR, which together distribute $4B+ annually exclusively to small businesses (defined as under 500 employees, majority U.S.-owned). DOD, DOE, NIH, NSF, USDA, and other agencies all have SBIR programs open to for-profit small businesses. Additionally, some sector-specific agency programs (DOE energy grants, USDA rural business grants, EDA economic development grants) are available to for-profit companies directly. For-profit companies are not eligible for certain grant categories (basic academic research grants) but have ample purpose-built programs available to them." },
                  { q: "How do I find legitimate U.S. government grants for my business?", a: "The authoritative sources for U.S. business grant opportunities are: sbir.gov (all SBIR/STTR solicitations from all agencies), grants.gov (federal competitive grants), sba.gov (SBA programs and resources), eda.gov (EDA economic development grants), your state's Department of Commerce or Economic Development website (state programs), and individual agency websites (NSF, DOE, NIH, USDA, etc.). Legitimate government grants never require an upfront fee — any site charging to 'apply' for government grants is typically a scam. All legitimate federal grant programs are free to apply for through official government websites." },
                  { q: "What is the difference between a grant and an SBA loan?", a: "SBA loans (7(a) loans, 504 loans, microloans) are government-guaranteed loans through private banks — they must be repaid with interest but have more favorable terms than conventional business loans due to the government guarantee. SBA grants (awarded through specific SBA programs) are non-repayable but available only in specific contexts: WOSB programs, some SBA accelerator programs, and disaster relief grants. SBIR/STTR grants are non-repayable R&D grants from federal agencies — not SBA programs. The general rule: if you're looking for non-repayable capital for R&D or technology development, SBIR is the primary vehicle. If you need working capital or equipment financing, SBA loans are more accessible than grants." },
                  { q: "How long does it take to receive a U.S. federal grant after applying?", a: "Timeline varies significantly by program. SBIR Phase I: 4–6 months from solicitation deadline to award announcement; payment within 30 days of award. NSF I-Corps: 3–4 months. DOE SBIR: 5–8 months. SBA microloan: 2–4 weeks from complete application to funding. State economic development grants: 4–12 weeks. EDA grants: 6–12 months. Plan your cash flow with realistic timelines — most businesses need bridge financing to maintain operations while waiting for federal grant disbursements. Engaging SBDC or BDC for interim bridge capital is common practice during the federal award processing period." },
                  { q: "Can a startup that has been incorporated for less than 1 year apply for SBIR?", a: "Yes — there is no minimum operating history requirement for SBIR eligibility. SBIR eligibility requires: for-profit U.S. entity (LLC, C-Corp, S-Corp), under 500 employees at time of application, majority U.S.-owned and operated, and the principal research must be performed in the U.S. A company incorporated and registered on SAM.gov one week ago technically qualifies for SBIR if it meets these criteria. However, agency reviewers consider likelihood of successful completion — a startup proposing an ambitious 12-month Phase I project with a single founder and no track record faces a higher bar in the commercialization section of the review than an established team with proof of concept." },
                  { q: "What is a HUBZONE and how does it help a business access more grants?", a: "HUBZone (Historically Underutilized Business Zone) is an SBA certification for businesses located in economically distressed areas or on Indian Reservations. HUBZone-certified businesses receive: set-aside contract eligibility (some federal contracts are reserved exclusively for HUBZone companies), a 10% price evaluation preference in competitive contracts, and scoring advantages in some grant programs. HUBZone certification requires: principal office in a HUBZone, at least 35% of employees residing in HUBZones, and being a small business by SBA standards. Check your business location's HUBZone eligibility at the SBA HUBZone map at sba.gov/hubzone-map. The certification, if you qualify, is one of the most valuable federal contracting advantages available." },
                  { q: "Are there specific federal grants for minority-owned businesses?", a: "Several federal programs specifically support minority-owned businesses. The SBA 8(a) Business Development Program provides 9 years of support including access to sole-source contracts (without competition) for disadvantaged small businesses. The SBA is the primary federal minority business development program but many agency-specific grant programs also provide scoring priority or set-asides for minority-owned businesses. Additionally, the Minority Business Development Agency (MBDA) — a federal agency specifically for Minority Business Enterprises (MBEs) — operates business centers nationwide providing free technical assistance, financing navigation, and contract access support. State minority business programs and community development financial institutions (CDFIs) provide additional grant and loan access for minority-owned businesses." },
                  { q: "What is the EDA (Economic Development Administration) and what grants does it offer businesses?", a: "The Economic Development Administration (EDA), part of the Department of Commerce, is the federal agency responsible for regional economic development. EDA grants primarily target organizations and infrastructure projects (revolving loan funds, business incubators, technical assistance programs, infrastructure supporting economic development) rather than individual businesses directly. However, EDA grants to intermediary organizations (chambers of commerce, regional planning organizations, business development centers) create programs and services that individual businesses access. The EDA is the source of much of the federal funding that flows into small business revolving loan funds and economic development centers in your region — finding your local EDA-funded organization can unlock capital that doesn't appear on grants.gov." },
                ].map((item, i) => (
                  <Card key={i}><CardContent className="pt-5">
                    <div className="font-semibold text-gray-900 mb-2 text-base">{item.q}</div>
                    <div className="text-gray-600 text-sm leading-relaxed">{item.a}</div>
                  </CardContent></Card>
                ))}
              </div>
            </div>

            <NewsletterSignup title="USA Business Grant Updates" description="Track new SBIR solicitation cycles, federal agency grant announcements, state program launches, and SBA program changes — delivered bi-weekly." />

          </div>
        </div>
      </section>

      {/* All 50 States Section - Internal Linking for SEO */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">Complete Coverage</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Business Grants by State
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore comprehensive funding guides for all 50 US states. Find state-specific grants, tax credits, and business incentives in your area.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {getAllStateDetails().map((state) => (
              <Link
                key={state.slug}
                href={`/usa/${state.slug}`}
                className="flex items-center p-3 bg-white rounded-lg border hover:border-green-500 hover:shadow-md transition-all group"
              >
                <MapPin className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700 group-hover:text-green-600 truncate">
                  {state.abbreviation} - {state.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Can&apos;t find your state? Our grant database covers all 50 states with over 5,000+ funding opportunities.
            </p>
            <Button asChild>
              <Link href="/grant-finder">
                Use Our Grant Finder Tool <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Guides Section */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Business Funding Guides</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In-depth guides to help you navigate US government funding programs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/blog/usa-federal-grants" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">USA Federal Grants Guide</h3>
              <p className="text-gray-600 text-sm">Complete guide to SBIR/STTR, SBA programs, and agency-specific federal funding.</p>
            </Link>
            <Link href="/blog/sbir-small-business-guide" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">SBIR Small Business Guide</h3>
              <p className="text-gray-600 text-sm">How to win SBIR Phase I and II grants across 11 federal agencies.</p>
            </Link>
            <Link href="/blog/state-local-business-grants-guide" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">State & Local Grants Guide</h3>
              <p className="text-gray-600 text-sm">Regional economic development funding, tax credits, and job creation incentives.</p>
            </Link>
            <Link href="/blog/industry-specific-business-grants-guide" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">Industry-Specific Grants</h3>
              <p className="text-gray-600 text-sm">Targeted funding for manufacturing, healthcare, cleantech, and more industries.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-Country & Category Internal Links */}
      <section className="py-16 bg-gray-50 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Also Explore</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/canada" className="group block p-5 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">🇨🇦 Government Grants Canada 2026</h3>
              <p className="text-sm text-gray-600">300+ federal and provincial programs with $10B+ available for Canadian businesses.</p>
            </Link>
            <Link href="/usa/women-entrepreneurs-grants" className="group block p-5 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">👩‍💼 Women Entrepreneurs Grants USA</h3>
              <p className="text-sm text-gray-600">SBA microloans, federal funding up to $1M for women-owned small businesses.</p>
            </Link>
            <Link href="/blog/sba-loans-grants-guide" className="group block p-5 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">🏦 SBA Microloan Program Guide</h3>
              <p className="text-sm text-gray-600">Up to $50K through nonprofit intermediaries — requirements, max amount, and how to apply.</p>
            </Link>
            <Link href="/canada/women-business-grants" className="group block p-5 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">👩‍💼 Women Business Grants Canada</h3>
              <p className="text-sm text-gray-600">$6B+ through WELF microloans, BDC financing, and Women Entrepreneurship Strategy.</p>
            </Link>
            <Link href="/usa/technology-startup-grants" className="group block p-5 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">💡 Tech Startup Grants USA</h3>
              <p className="text-sm text-gray-600">SBIR/STTR, NSF, and DOE grants for technology and innovation startups.</p>
            </Link>
            <Link href="/blog/canada-startup-funding-grants-guide" className="group block p-5 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">📚 Canada Startup Funding Guide</h3>
              <p className="text-sm text-gray-600">35+ programs worth $1.2B+ — IRAP, BDC, and provincial accelerators.</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function StoreIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
    </svg>
  )
}
