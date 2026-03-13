import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, CheckCircle, ArrowRight, Building, Lightbulb, FileText, AlertCircle, Star, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
  title: "Texas Business Grants 2026 | TX State Funding, SBIR & Incentives Complete Guide",
  description: "Complete guide to Texas business grants and state funding in 2026. Texas Enterprise Fund up to $10M, Emerging Technology Fund, $300M+ annual SBIR awards, SBIR state matching, and Skills Development Fund. Expert strategies for maximizing Texas business incentives.",
  keywords: "Texas business grants 2026, Texas state funding, startup grants Texas, Texas Enterprise Fund, Texas Emerging Technology Fund, TX SBIR grants, Texas small business funding, Texas no income tax, Texas startup incentives, CPRIT Texas",
  alternates: { canonical: "https://www.fsidigital.ca/usa/texas" },
  openGraph: { title: "Texas Business Grants 2026 | Complete TX Funding Guide", description: "Discover Texas business grants, SBIR advantages, zero income tax value, and state incentives for startups and SMBs in 2026.", url: "https://www.fsidigital.ca/usa/texas" },
}

const texasGrants: Grant[] = [
  { id: "tx-enterprise-fund", name: "Texas Enterprise Fund (TEF)", fundingMin: 500000, fundingMax: 10000000, eligibility: ["Companies relocating HQ to Texas", "Businesses undergoing significant expansion", "Competing with another state or country for the project"], deadline: "Applications reviewed on rolling basis by Governor's office", applicationLink: "https://gov.texas.gov/business/page/texas-enterprise-fund", description: "Governor-administered deal-closing fund providing direct grants to businesses choosing to relocate or expand in Texas over competing states or countries.", country: "USA", region: "Texas", category: "Relocation/Expansion", agency: "Office of the Governor", status: "Active", tags: ["Relocation", "Expansion", "Job Creation"], requirements: ["Competing location (another state/country)", "Minimum job commitment", "Average salary above state average", "Multi-year commitment"], lastUpdated: "2025-01-20" },
  { id: "tx-etf", name: "Texas Emerging Technology Fund (ETF)", fundingMin: 250000, fundingMax: 3000000, eligibility: ["Texas-based tech companies and startups", "Companies with federal grant matching", "University research commercialization"], deadline: "Rolling through regional centers", applicationLink: "https://gov.texas.gov/business/page/emerging-technology-fund", description: "Invests in Texas companies developing commercializable technology, with priority for companies leveraging federal SBIR/STTR awards and university partnerships.", country: "USA", region: "Texas", category: "Technology", agency: "Office of the Governor", status: "Active", tags: ["Technology", "R&D", "SBIR Match"], requirements: ["Texas-based company", "Commercial technology development", "University or federal grant connection preferred"], lastUpdated: "2025-01-20" },
  { id: "tx-skills", name: "Texas Skills Development Fund", fundingMin: 5000, fundingMax: 500000, eligibility: ["Texas for-profit businesses", "Workforce training for current and new employees", "All industry sectors"], deadline: "Rolling through local community colleges", applicationLink: "https://gov.texas.gov/business/page/skills-development-fund", description: "Reimburses businesses for customized job training delivered through Texas community colleges. Covers training design, delivery, and assessment costs.", country: "USA", region: "Texas", category: "Workforce", agency: "Texas Workforce Commission", status: "Active", tags: ["Workforce Training", "Community College", "Skills"], requirements: ["TX for-profit company", "Community college partner", "Minimum trainee count", "Documented training outcomes"], lastUpdated: "2025-01-20" },
  { id: "tx-sbir-matching", name: "Texas SBIR/STTR State Matching Program", fundingMin: 50000, fundingMax: 250000, eligibility: ["Texas companies that have won federal SBIR or STTR award", "Phase I and Phase II awardees"], deadline: "Rolling – within 90 days of federal award", applicationLink: "https://gov.texas.gov/uploads/files/business/SBIR-STTR-Matching-Program.pdf", description: "State co-investment matching federal SBIR/STTR grants for Texas-based companies, providing an additional 50% in non-dilutive state matching funds.", country: "USA", region: "Texas", category: "SBIR Match", agency: "Texas Economic Development Corporation", status: "Active", tags: ["SBIR", "STTR", "Federal Match"], requirements: ["Active federal SBIR or STTR award", "Texas-based company", "Application within 90 days of award"], lastUpdated: "2025-01-20" },
  { id: "tx-cap", name: "Texas Capital Access Program (CAP)", fundingMin: 25000, fundingMax: 750000, eligibility: ["Texas small businesses", "Companies unable to secure conventional bank financing", "Businesses in underserved markets"], deadline: "Through participating lenders (rolling)", applicationLink: "https://gov.texas.gov/business/page/capital-access-program", description: "Loan loss reserve program encouraging Texas banks to make loans to small businesses that face barriers to conventional financing.", country: "USA", region: "Texas", category: "Capital Access", agency: "Texas Treasury Safekeeping Trust Company", status: "Active", tags: ["Loan Guarantee", "Small Business", "Capital Access"], requirements: ["Texas small business", "Through participating lender", "Demonstrated financing barrier"], lastUpdated: "2025-01-20" },
]

export default function TexasGrantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      <Header />

      <section className="bg-gradient-to-br from-red-700 via-red-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <MapPin className="h-6 w-6 text-red-300" />
              <Badge className="bg-red-500/30 text-red-100 border-red-400">Texas State Funding Guide 2026</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Texas Business Grants & Incentives 2026</h1>
            <div className="mt-8 mb-4 text-left">
              <ShortAnswerBox content="Yes — Texas businesses benefit from zero state income tax (a permanent annual advantage saving $50K–$2M+ per year for profitable companies), Texas Enterprise Fund grants (up to $10M for relocations/expansions), Emerging Technology Fund co-investment ($250K–$3M for tech startups), SBIR state matching funds (50% state co-match on federal awards), and the Skills Development Fund (up to $500K for workforce training). Texas ranks #3 nationally for federal SBIR/STTR awards." />
            </div>
            <div className="flex justify-center mb-4">
              <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-03-01" />
            </div>
            
            
          </div>
        </div>
      </section>

      <section className="py-6 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            
            
            <EligibleCheck />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-wrap gap-2 mb-10">
            {["Top Programs", "No-Tax Advantage", "SBIR in Texas", "How to Apply", "Common Mistakes", "FAQ"].map((item) => (
              <Badge key={item} variant="outline" className="cursor-pointer hover:bg-red-50 px-3 py-1.5 text-sm">{item}</Badge>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Texas Business Grant Programs — Quick Comparison 2026</h2>
            <p className="text-gray-600 mb-6">Every major Texas state incentive in one table. Note that TEF and SBIR matching require pre-engagement with the Governor's Office before finalizing your business location or investment decisions.</p>
            <GrantComparisonTable grants={texasGrants} title="Texas Business Grants Comparison" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-10">

              {/* Overview */}
              <Card>
                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Building className="h-5 w-5 text-red-600" />Texas Business Funding Ecosystem — The Full Picture</CardTitle></CardHeader>
                <CardContent className="text-gray-700 space-y-4">
                  <p className="leading-relaxed">
                    Texas's approach to business incentives is fundamentally different from most US states. Rather than offering broad
                    tax credits and grant programs with complex eligibility matrices, Texas deploys its incentives like a venture capital
                    firm — concentrating large, high-impact investments on specific high-value opportunities (TEF for major relocations),
                    providing quiet, fast-moving dealmaking through the Governor's office, and relying on a single structural advantage
                    — zero state income tax — to create compounding value for every business and founder in the state, year after year,
                    without any application required.
                  </p>
                  <p className="leading-relaxed">
                    The Texas Enterprise Fund is the most powerful single-business incentive in any US state — a direct grant of up to
                    $10M paid to a specific company by the Governor's office when that company chooses Texas over another state or country
                    for a major relocation or expansion. Notable recipients include Apple ($21M), Samsung ($27M), Toyota ($40M), and
                    Hewlett Packard Enterprise ($20M). But TEF is not only for Fortune 500 companies. Companies creating as few as 75
                    high-wage Texas jobs have received TEF grants of $500K–$2M when competing against competing business climates in
                    Tennessee, Nevada, or Florida.
                  </p>
                  <p className="leading-relaxed">
                    For the technology startup and growth company market, the <strong>Emerging Technology Fund (ETF)</strong> and
                    <strong>SBIR state matching program</strong> are more relevant than TEF. ETF co-invests $250K–$3M alongside federal
                    SBIR/STTR grants and university collaborations — providing matching capital specifically for companies at the
                    research-to-commercialization transition. Texas's SBIR matching program (50% state co-match on federal awards) is
                    one of only 5 such programs nationally and makes Texas uniquely attractive for any federally-funded technology company
                    at the Phase I or Phase II stage.
                  </p>
                  <p className="leading-relaxed">
                    The <strong>Skills Development Fund</strong> is Texas's most frequently used program by small and mid-size businesses.
                    Administered through the Texas Workforce Commission and delivered via community colleges, it reimburses businesses
                    for customized workforce training costs — from technical certifications to leadership development to ERP implementation
                    training. In FY2024, it distributed over $73M to Texas businesses of all sizes, with average awards of $40,000–$150,000.
                    Unlike many training programs, the Texas Skills Development Fund allows company-specific proprietary training content,
                    not just off-the-shelf courses.
                  </p>
                </CardContent>
              </Card>

              {/* No-Tax Advantage */}
              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader><CardTitle className="text-xl text-green-900 flex items-center gap-2"><Zap className="h-5 w-5 text-green-600" />The Zero-Tax Advantage: What It's Actually Worth for Your Business</CardTitle></CardHeader>
                <CardContent className="text-green-900">
                  <p className="text-sm mb-5 leading-relaxed">
                    Texas has no state income tax, no corporate income tax (only a franchise tax of 0.75% for companies above $2.47M
                    revenue), and no personal income tax on wages or capital gains. For a profitable technology company or its founders,
                    this is not a minor perk — it is a structural, permanent operating advantage that compounds every single year.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mb-5">
                    <div className="bg-white rounded-lg p-4 text-center border border-green-200">
                      <div className="text-2xl font-bold text-green-700">$0</div>
                      <div className="text-xs text-green-800 mt-1">State income tax on $500K profit</div>
                      <div className="text-xs text-gray-500 mt-1">vs. $59K in CA, $35K in NY, $21K in MA</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center border border-green-200">
                      <div className="text-2xl font-bold text-green-700">$0</div>
                      <div className="text-xs text-green-800 mt-1">Personal income tax on $1M salary</div>
                      <div className="text-xs text-gray-500 mt-1">vs. $130K CA, $109K NY, $51K FL</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center border border-green-200">
                      <div className="text-2xl font-bold text-green-700">$0</div>
                      <div className="text-xs text-green-800 mt-1">Capital gains tax on $5M acquisition</div>
                      <div className="text-xs text-gray-500 mt-1">vs. $650K CA state tax, $545K NY state</div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed">
                    Over 10 years, a 30-person technology company with $5M annual revenue in Texas retains approximately <strong>$1.2M–$1.8M more</strong>
                    than an identical company in California or New York, purely from the absence of state taxes on profits and employee
                    income. This isn't money that requires any application, approval, or milestone — it's automatic, permanent, and
                    available to every Texas business from day one of operations.
                  </p>
                </CardContent>
              </Card>

              {/* Program Deep Dives */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Texas Business Grant Programs — Detailed Breakdown</h2>
                <p className="text-gray-600 mb-6">Complete analysis of each major Texas incentive program, including how decisions are made, what documentation is required, and the real dollar value for different company sizes.</p>
                <div className="space-y-6">

                  <Card className="border-l-4 border-l-red-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">1. Texas Enterprise Fund (TEF) — The Deal Closer</CardTitle>
                        <Badge className="bg-red-100 text-red-800 shrink-0 ml-2">Up to $10M</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        The Texas Enterprise Fund is administered directly from the Governor's office — not through the Texas Workforce
                        Commission, Economic Development Corporation, or any other agency. This means TEF decisions happen faster, involve
                        fewer stakeholders, and can be structured more flexibly than any other state incentive program in Texas. The
                        Governor's Economic Development team has authority to approve TEF grants in as little as 30 days when a competitive
                        situation demands it.
                      </p>
                      <p>
                        TEF is specifically designed as a "deal closer" — for use when a company is genuinely deciding between Texas and
                        another state or country. The program is not available for expanding businesses that have already committed to
                        staying in Texas, or for companies opening small satellite offices. To qualify, your company must be making a
                        genuine location decision, with a credible alternative (another state's incentive package, another country's offer)
                        that Texas is competing against.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4 my-4">
                        <div className="bg-red-50 rounded-lg p-4">
                          <div className="font-semibold text-red-900 mb-2">What TEF Funds</div>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• Direct cash grants (not tax credits)</li>
                            <li>• No equity involved</li>
                            <li>• Paid against job creation milestones</li>
                            <li>• Clawback if jobs not maintained</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="font-semibold text-gray-900 mb-2">Typical Deal Structure</div>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• 75+ TX jobs: $500K–$2M TEF</li>
                            <li>• 200+ TX jobs: $2M–$5M TEF</li>
                            <li>• 1,000+ TX jobs: $5M–$10M TEF</li>
                            <li>• Wages must exceed TX county average</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-sm text-amber-700 bg-amber-50 rounded-lg p-3">
                        <strong>⚠️ Timing is Everything:</strong> T EF must be engaged before your location decision is public or finalized.
                        Call the Governor's Economic Development team at (512) 463-9870 the moment you're considering Texas as a location —
                        even before you've toured real estate. Post-announcement applications are categorically rejected.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">2. Texas Emerging Technology Fund (ETF)</CardTitle>
                        <Badge className="bg-blue-100 text-blue-800 shrink-0 ml-2">$250K – $3M</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        The Emerging Technology Fund targets Texas tech companies in the commercial development phase — specifically
                        companies that have won federal SBIR/STTR grants, are licensing university intellectual property, or have
                        developed a technology with clear commercialization potential. ETF co-invests alongside these other sources,
                        providing a 25–50% additional layer of non-dilutive capital that accelerates commercialization without
                        requiring equity dilution at the critical early-commercial stage.
                      </p>
                      <p>
                        ETF's priority criteria are: (1) Texas-based company, (2) federal SBIR/STTR award (preferred but not required),
                        (3) university research partnership (UT, A&amp;M, Rice, UH, or other TX universities), (4) clear path to
                        commercialization with defined revenue milestones. The most competitive ETF applications combine all four —
                        an SBIR Phase I win, a UT co-PI on the research, and a commercial pilot customer already identified.
                        Applications with all four criteria are approved at a significantly higher rate than those without.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">3. Texas Skills Development Fund</CardTitle>
                        <Badge className="bg-purple-100 text-purple-800 shrink-0 ml-2">Up to $500K</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        The Skills Development Fund is Texas's most widely accessed business incentive — used by small manufacturers,
                        healthcare companies, tech firms, and retailers alike. It's administered through the Texas Workforce Commission
                        but delivered operationally through Texas's 50 community college districts, which apply on behalf of participating
                        businesses and manage the training delivery and documentation requirements.
                      </p>
                      <p>
                        Unlike traditional training reimbursement programs, the Skills Development Fund pays for: customized training
                        program design (writing a curriculum specific to your company's processes), instructor salaries, training materials
                        and equipment, online platform licenses specifically configured for your training program, and certification exam
                        fees for industry credentials (AWS, CompTIA, OSHA, PMP, etc.). The community college administers all financial
                        flows — your company simply co-designs the curriculum, provides subject matter experts, and tracks employee
                        training completion against the agreed outcomes.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4 my-4">
                        <div className="bg-purple-50 rounded-lg p-4">
                          <div className="font-semibold text-purple-900 mb-2">Award Range</div>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• Small business (10–49 employees): $5K–$75K</li>
                            <li>• Mid-size (50–249 employees): $75K–$200K</li>
                            <li>• Large (250+ employees): $200K–$500K</li>
                            <li>• Multi-company consortiums: Up to $500K</li>
                          </ul>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <div className="font-semibold text-purple-900 mb-2">How to Apply</div>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• Contact your local community college first</li>
                            <li>• Lone Star, Austin CC, DCCCD, SAISD, etc.</li>
                            <li>• CC writes the application on your behalf</li>
                            <li>• TWC approves and funds the CC</li>
                            <li>• Training delivered by approved providers</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-teal-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">4. Texas SBIR/STTR State Matching Program</CardTitle>
                        <Badge className="bg-teal-100 text-teal-800 shrink-0 ml-2">Up to $250K state match</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        Texas is one of only five US states with a dedicated SBIR/STTR state matching fund — a fact that makes Texas
                        uniquely attractive for federally-funded technology companies. The program provides a 50% state co-match on
                        federal SBIR Phase I (maximum $50,000 state match on $100,000 Phase I) and Phase II awards (maximum $250,000
                        state match). Applications must be submitted within 90 days of receiving your federal SBIR/STTR notification of
                        award, and the company must be Texas-based and conducting Texas-situated research.
                      </p>
                      <p>
                        The math is compelling: an NSF SBIR Phase I awardee in Texas receives $305,000 from NSF → applies immediately
                        for the TX SBIR match → receives $50,000 additional from the state → total Phase I funding: $355,000 from two
                        non-dilutive sources. For Phase II, the federal award is $2,000,000. Texas state match adds up to $250,000,
                        bringing total non-dilutive Phase II capital to $2,250,000. No equity dilution, no investor approval required
                        for the additional $250K. This program is dramatically underutilized — many Texas SBIR winners don't know it exists.
                      </p>
                    </CardContent>
                  </Card>

                </div>
              </div>

              {/* SBIR in Texas */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader><CardTitle className="text-xl text-blue-900 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-blue-700" />Texas as America&apos;s #3 SBIR State: City-by-City Breakdown</CardTitle></CardHeader>
                <CardContent className="text-blue-900">
                  <p className="text-sm mb-5 leading-relaxed">
                    Texas companies receive over $300M annually in federal SBIR/STTR awards, ranking 3rd nationally behind California
                    and Massachusetts. Each major Texas metro has a distinct SBIR strength area driven by the research universities,
                    federal agencies, and industry clusters present in that region:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    {[
                      { city: "Austin", strength: "Software, AI/ML, semiconductors", agencies: "DARPA, NSF, IARPA", schools: "UT Austin" },
                      { city: "Houston", strength: "Energy tech, life sciences, space", agencies: "DOE, NIH, NASA JSC", schools: "Rice, UH, UT Health" },
                      { city: "San Antonio", strength: "Cybersecurity, defense IT, telehealth", agencies: "DOD, DHS, VA", schools: "UTSA, UTHSA" },
                      { city: "DFW (Dallas / Ft. Worth)", strength: "Aerospace, logistics, financial tech", agencies: "NASA, FAA, DOD", schools: "UT Dallas, UNT, TCU" },
                    ].map(({ city, strength, agencies, schools }) => (
                      <div key={city} className="bg-white rounded-lg p-4 border border-blue-200">
                        <div className="font-bold text-blue-900 mb-1">{city}</div>
                        <div className="text-xs text-blue-700 mb-1"><strong>Strength:</strong> {strength}</div>
                        <div className="text-xs text-gray-600 mb-1"><strong>Lead agencies:</strong> {agencies}</div>
                        <div className="text-xs text-gray-600"><strong>University support:</strong> {schools}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm mt-4 leading-relaxed">
                    Every major Texas research university (UT, Texas A&amp;M, Rice, UH, UTSA, TCU) has a dedicated SBIR support office
                    offering free proposal review, industry partnership brokering, and co-investigator matching services for SBIR applicants.
                    Using these university resources — at no cost — historically increases SBIR approval rates by 20–35% compared to
                    companies that apply independently.
                  </p>
                </CardContent>
              </Card>

              {/* CPRIT Box */}
              <Card className="border-pink-200 bg-pink-50">
                <CardHeader><CardTitle className="text-xl text-pink-900">CPRIT: Texas&apos;s $3B Cancer Research Fund (Unique Nationally)</CardTitle></CardHeader>
                <CardContent className="text-pink-900 space-y-3">
                  <p className="text-sm leading-relaxed">
                    The Cancer Prevention and Research Institute of Texas (CPRIT) is a $3 billion state-funded cancer research
                    endowment that is unique in the United States — no other state has created a comparable dedicated cancer funding
                    institution. CPRIT provides grants from $100K to $20M+ for Texas organizations conducting cancer prevention,
                    early detection, treatment, or commercialization research.
                  </p>
                  <p className="text-sm leading-relaxed">
                    For life sciences startups, CPRIT's <strong>Company Formation and Early Growth (CFEG) program</strong> provides
                    $1.5M–$15M in grants to Texas-based companies developing cancer-related diagnostics, therapeutics, or medical
                    devices. Unlike NIH SBIR, CPRIT can fund companies before they have any regulatory submissions and accepts
                    less preliminary data. The review timeline is 4–6 months vs. 12+ months for NIH, making it far more
                    startup-friendly. Any Houston-area, Austin, or DFW life sciences company working in oncology, cancer immunology,
                    or precision medicine should apply to CPRIT before or alongside NIH applications.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 text-center border border-pink-200">
                      <div className="font-bold text-pink-700 text-lg">$3B</div>
                      <div className="text-xs text-pink-600">Total CPRIT endowment</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center border border-pink-200">
                      <div className="font-bold text-pink-700 text-lg">$20M</div>
                      <div className="text-xs text-pink-600">Max research grant</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center border border-pink-200">
                      <div className="font-bold text-pink-700 text-lg">4–6 mo</div>
                      <div className="text-xs text-pink-600">Review timeline</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* How to Apply */}
              <Card>
                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><FileText className="h-5 w-5 text-red-600" />How to Apply for Texas Business Incentives — Step by Step</CardTitle></CardHeader>
                <CardContent className="text-gray-700">
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Decide Which Program Fits Your Stage and Situation", desc: "Texas incentives are situational: TEF is for relocation/expansion decisions where Texas is competing with another state. ETF is for tech companies with SBIR wins or university IP. Skills Development is for any for-profit TX business training 10+ employees. SBIR matching is exclusively for companies that have just won a federal SBIR/STTR award. CPRIT is for cancer-related life sciences. Mapping your situation to the right program first saves 3–6 months of misdirected applications." },
                      { step: "2", title: "For TEF — Call the Governor's Office Before Any Public Announcement", desc: "The Texas Enterprise Fund team at the Governor's Office of Economic Development can be reached at (512) 463-9870. This first call should happen the moment Texas emerges as a serious relocation or expansion candidate — before board approval, before press releases, before real estate negotiations are finalized. The TEF team can provide a preliminary assessment of your deal's competitiveness and advise on the documentation needed for a formal proposal within 48 hours of your first call." },
                      { step: "3", title: "For ETF — Engage Your Regional University SBIR Office First", desc: "Before applying to the Emerging Technology Fund, contact the SBIR/commercialization office at the nearest major Texas research university (UT at research.utexas.edu, Texas A&M at innovation.tamu.edu, Rice at innovation.rice.edu). They can facilitate a co-PI relationship, access university lab resources, and often co-develop your ETF application with you at no charge. ETF applications submitted with university co-investigators are significantly more competitive than solo company applications." },
                      { step: "4", title: "For Skills Development — Contact Your Local Community College", desc: "Every region of Texas has a community college district that administers Skills Development Fund applications: Lone Star College (Houston area), Austin Community College (Central Texas), Dallas County Community College District (DFW), Alamo Colleges (San Antonio), and others. Contact your local institution's Workforce Development office — they send representatives to meet with your team, understand your training needs, develop the curriculum, write the application, and submit it to TWC on your behalf. Your company provides the subject matter expertise; the college handles the administrative requirements." },
                      { step: "5", title: "For TX SBIR Match — Apply Within 90 Days of Award Notification", desc: "This is the most time-sensitive requirement in the Texas incentive ecosystem. The SBIR state matching program requires application within 90 days of your federal SBIR/STTR award notification date. Missing this window means the opportunity is permanently forfeited — there are no exceptions for companies that miss the deadline. Set a calendar reminder specifically for this requirement from the moment you apply for federal SBIR, even before you know whether you'll win." },
                      { step: "6", title: "Stack Texas State Programs with Federal SBIR and Document Everything", desc: "Texas incentives are designed to layer: ETF co-investment + federal SBIR + TX SBIR match can all fund different aspects of the same technology project simultaneously. The key is maintaining clear budget separation: each funding source should fund distinct, non-overlapping budget line items. Document this from day one using project-level accounting (separate cost centers per funding source). Auditors from TWC, ETF, and federal SBIR programs all want to see clear delineation of how each grant dollar was spent." },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                        <div><div className="font-semibold text-gray-900 mb-1">{item.title}</div><div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Common Mistakes */}
              <Card className="border-red-100 bg-red-50">
                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-red-900"><AlertCircle className="h-5 w-5 text-red-600" />5 Costly Mistakes Texas Businesses Make with State Incentives</CardTitle></CardHeader>
                <CardContent className="text-red-900 space-y-4">
                  {[
                    { n: "1", m: "Announcing TEF-Eligible Expansions Without Engaging the Governor's Office First", d: "The Texas Enterprise Fund requires that your expansion decision be genuinely in-progress and competitive (Texas vs. another location) at the time of application. Companies that announce a Texas expansion and then approach the Governor's office for TEF are rejected — the incentive exists to win the deal, not reward decisions already made. The missed opportunity can be $500K–$5M in direct grants permanently unavailable after announcement." },
                    { n: "2", m: "Missing the 90-Day TX SBIR Match Application Window", d: "Texas's SBIR state matching program is time-gated at 90 days from federal award notification. This is an absolute deadline with zero exceptions documented in program history. Companies that receive a $305,000 NSF SBIR Phase I award and miss the 90-day mark forfeit $50,000 in state matching money permanently. The solution: mark day 90 in your calendar the moment you submit your federal SBIR application, even before knowing if you'll win." },
                    { n: "3", m: "Not Using Community Colleges as Skills Development Fund Application Partners", d: "Some Texas businesses try to apply for Skills Development Fund grants directly through the TWC — this is not how the program works. Texas Skills Development Fund applications are written and submitted by community colleges, not by businesses directly. Companies that submit materials to TWC without a community college co-sponsor get routed back to the college process. Contact your local community college's workforce development office first — every major Texas CC has staff specifically trained to develop Skills Development Fund proposals for local businesses." },
                    { n: "4", m: "Overlooking CPRIT for Houston Life Sciences Companies", d: "Among Houston biotech and medtech founders, CPRIT remains dramatically underutilized relative to its scale ($3B endowment, $20M+ possible grants). FDA drug approval applications are cited as the most common barrier — in reality, CPRIT funds research companies at pre-IND stages. Many Houston oncology, diagnostic, and precision medicine companies that assume they need FDA clearance before applying find out too late that CPRIT explicitly funds pre-regulatory commercialization work. The review cycle is 4–6 months — appropriate for startup timelines." },
                    { n: "5", m: "Treating Texas Incentives as an Alternative to Federal SBIR Rather Than a Stack", d: "Texas programs — ETF, SBIR matching, Skills Development — are designed to add value on top of federal funding, not instead of it. The optimal Texas funding stack is: federal SBIR Phase I ($305K) + TX SBIR match ($50K) + ETF if commercializing ($500K–$1M) + Skills Development for team training ($50K–$200K). Total: $905K–$1.5M in non-dilutive funding for a technology company in its first 2–3 years. Each of these is a separate program that can legally co-fund different components of your business development. Very few companies execute all four simultaneously." },
                  ].map(({ n, m, d }) => (
                    <div key={n} className="bg-white rounded-lg p-4 border border-red-200">
                      <div className="font-semibold mb-2 text-red-900">{n}. {m}</div>
                      <p className="text-sm text-red-800 leading-relaxed">{d}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Expert Tips */}
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-amber-800"><Lightbulb className="h-5 w-5 text-amber-600" />Expert Strategy: Maximizing Texas Business Funding</CardTitle></CardHeader>
                <CardContent className="text-amber-900 space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="font-semibold mb-2">💡 Use TEF as a Location Negotiating Tool, Not a Last Resort</div>
                    <p className="text-sm leading-relaxed">TEF is most powerful when you&apos;re genuinely evaluating Texas against another state or country and engaging the Governor&apos;s team at the very start of your process. Texas can sometimes out-bid incentive packages from Tennessee, Nevada, or Florida — but only if you engage while still in active decision mode. If you arrive at the Governor&apos;s door after board approval, the incentive calculation changes entirely. Treat TEF as a competitive negotiating tool and start the conversation the same week you start having location discussions internally.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="font-semibold mb-2">💡 The Federal + Texas SBIR Stack Is the Best Non-Dilutive Package in the US</div>
                    <p className="text-sm leading-relaxed">Texas is one of only 5 states with an SBIR matching program. When you win an NSF SBIR Phase I ($305,000) → apply within 90 days for TX SBIR match ($50,000) → license UT or A&amp;M IP → apply for ETF ($500K–$1M) → win SBIR Phase II ($2M) → apply for TX match again ($250,000). Total cumulative non-dilutive capital from this sequence: $3.1M on a single technology, at zero equity cost. This is the single most capital-efficient startup strategy available in any US state for a technology company.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="font-semibold mb-2">💡 Skills Development + New Employee Onboarding Is a Hidden Multiplier</div>
                    <p className="text-sm leading-relaxed">When you hire from any Texas company expansion — whether funded through TEF or independently — layer Skills Development Fund applications for your new team&apos;s onboarding training immediately after hire. For a 30-person hiring class with $3,000 per employee in training costs, that&apos;s $90,000 in eligible Skills Development costs. At a 60% reimbursement rate, that&apos;s $54,000 recovered. Most Texas HR teams don&apos;t integrate Skills Development Fund planning into their hiring processes — building this in from day one is a free operational efficiency improvement.</p>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions: Texas Business Grants 2026</h2>
                <p className="text-gray-600 mb-6">Common questions from Texas founders, CFOs, and operators about state incentives, federal grants, and building an optimal funding stack in Texas.</p>
                <div className="space-y-4">
                  {[
                    { q: "Does Texas have direct cash grants for small businesses, or only large enterprises?", a: "Both — though the programs serve different scales. The Texas Enterprise Fund (up to $10M) primarily serves large relocations. But the Skills Development Fund ($5K–$500K) is accessible to any Texas for-profit business with 10+ employees. The SBIR state matching program serves tech companies of any size that win federal awards. Texas Capital Access Program serves small businesses of any type through bank loan guarantees. CPRIT serves life sciences companies from startups to mid-size. Small businesses most commonly access Skills Development Fund and CAP, while growth companies layer SBIR + ETF." },
                    { q: "What makes Texas better than California or New York for business funding?", a: "Three structural advantages: (1) Zero state income tax, permanently. A profitable $10M-revenue Texas company retains $750K–$1M more annually than an identical California company, and this compounds every year. (2) TEF provides a direct, large-scale cash grant for relocation/expansion decisions — no comparable program exists in California or New York. (3) SBIR state co-matching (50% additional state funding on top of federal awards) is available in Texas but not California or New York. The combination of structural tax savings + TEF + SBIR matching can provide $2M–$5M more in value over 5 years compared to equivalent funding in those states." },
                    { q: "Can a California company relocating to Texas access the TEF?", a: "Yes — California-to-Texas relocations are among the most actively funded TEF deals. Apple, Oracle, Tesla, Hewlett Packard Enterprise, and many others used TEF in their Texas relocation decisions. The key is to engage the Governor's office before your relocation is announced to your team, board, or real estate agents. You must bring: a credible California or other-state alternative with specific cost data, a job creation commitment (typically 75–500 Texas jobs initially), wage data showing positions above the county average, and a multi-year business plan confirming the operation will remain in Texas for the incentive clawback period." },
                    { q: "Is CPRIT only for researchers, or can commercial biotech startups access it?", a: "CPRIT explicitly funds commercial biotech and medtech startups. The Company Formation and Early Growth (CFEG) program within CPRIT provides $1.5M–$15M specifically to Texas companies developing cancer-related products at any stage — pre-regulatory, pre-revenue, and pre-clinical stages are all fundable. Companies don't need FDA submissions, clinical trial data, or even revenue to apply. Eligibility requires: Texas incorporation, a cancer-related product or diagnostic, a management team with commercialization experience, and a clear Texas development and hiring plan. Application: cprit.texas.gov/grants/company-formation." },
                    { q: "How do Texas Skills Development Fund awards compare to similar programs in other states?", a: "Texas Skills Development Fund is one of the largest and most flexible state workforce training programs in the United States. At $500K maximum per award and $73M+ annually distributed, it exceeds comparable programs in California (ETP, $50M+ but with more restrictions), Florida (IWT, $200M annual cap), and New York (WDI, more limited eligibility). Texas's fund is distinct in allowing fully customized, company-specific curriculum development — many states restrict training reimbursement to accredited coursework only. The community college delivery model also means your company receives institutional instructional design expertise at no additional cost." },
                    { q: "Can an early-stage Texas startup that hasn't won an SBIR yet access tech funding?", a: "Yes — through two pathways. First, Texas universities' SBIR support offices (UT, A&M, Rice) provide free pre-application support to Texas companies applying for federal SBIR — improving award rates significantly. Second, the Texas Emerging Technology Fund is accessible to pre-SBIR companies commercializing university IP. Third, CPRIT is available to pre-regulatory life sciences companies. Fourth, the Texas Capital Access Program provides loan guarantees for early-stage companies that can't get conventional bank financing. The pre-SBIR strategy most recommended: apply for federal SBIR with university support → win Phase I → immediately apply for ETF and TX state SBIR match → build from there." },
                    { q: "Are there Texas grants for women-owned or minority-owned businesses?", a: "Texas has the Texas Historically Underutilized Business (HUB) certification program, which provides state contract set-asides and bid weight preferences for certified women-owned, minority-owned, and service-disabled veteran-owned businesses. For direct grants, the SBA 8(a) program (national) provides federal contract set-asides. The Texas Women's Business Center network (12+ locations statewide) offers free grant navigation, business plan development, and application assistance for women entrepreneurs applying to any Texas or federal program. Texas also has the Minority Business and Workforce Development initiative administered through TPEA for entrepreneurship training." },
                    { q: "What documentation do I need to apply for Texas Enterprise Fund?", a: "TEF applications are assembled by the Governor's Economic Development team, not filled out independently. When you contact the Governor's office, they guide you through the information gathering process. You'll need to provide: a detailed business description and the nature of the expansion or relocation, your current employee count and the number of Texas-specific jobs you plan to create, average salary levels for those roles by job title, capital investment plans (real estate, equipment, infrastructure), a timeline for when hiring and investment will occur, and — critically — specific evidence of the competing location(s) you're seriously considering. The competing offer doesn't need to be a formal incentive package; it can be a comparative cost analysis." },
                  ].map((item, i) => (
                    <Card key={i}><CardContent className="pt-5">
                      <div className="font-semibold text-gray-900 mb-2 text-base">{item.q}</div>
                      <div className="text-gray-600 text-sm leading-relaxed">{item.a}</div>
                    </CardContent></Card>
                  ))}
                </div>
              </div>

            </div>

            <div className="space-y-6">
              <Card className="bg-red-700 text-white">
                <CardContent className="pt-6">
                  <Star className="h-8 w-8 text-yellow-300 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Free Texas Grant Matching</h3>
                  <p className="text-red-100 text-sm mb-4">Our specialists identify which Texas programs fit your business — including TEF eligibility assessment, ETF application support, and SBIR state match timing.</p>
                  <Link href="/contact"><Button className="w-full bg-white text-red-700 hover:bg-red-50">Get Free Matching <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
                </CardContent>
              </Card>
              <NewsletterSignup variant="sidebar" />
              <Card>
                <CardHeader><CardTitle className="text-lg">Key Texas Agency Contacts</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-3">
                  <div><div className="font-semibold">Governor&apos;s Economic Development</div><div className="text-gray-500">(512) 463-9870 | gov.texas.gov</div></div>
                  <div><div className="font-semibold">Texas Workforce Commission</div><div className="text-gray-500">twc.texas.gov/skills-development</div></div>
                  <div><div className="font-semibold">CPRIT (Cancer Research)</div><div className="text-gray-500">cprit.texas.gov</div></div>
                  <div><div className="font-semibold">Texas Economic Dev. Corp.</div><div className="text-gray-500">texaswideopenforbusiness.com</div></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Related Resources</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <Link href="/usa/federal-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Federal Grants for TX Businesses</Link>
                    <Link href="/blog/dod-sbir-defense-tech-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> DOD SBIR Defense Grants</Link>
                    <Link href="/usa/florida" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Florida Business Grants</Link>
                    <Link href="/usa/new-york" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> New York Business Grants</Link>
                    <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder Tool</Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-8">
            <NewsletterSignup title="Get Texas Business Grant Updates" description="Track TEF application windows, ETF cycles, Skills Development Fund quarterly intakes, CPRIT deadlines, and TX SBIR match eligibility updates." />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
