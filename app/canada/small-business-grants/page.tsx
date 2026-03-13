import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, CheckCircle, ArrowRight, Building, Lightbulb, FileText, AlertCircle, Star } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
  title: "Canada Small Business Grants 2026 | CSBFP, IRAP, SR&ED & Provincial SME Funding",
  description: "Complete guide to Canada small business grants 2026. Canada Small Business Financing Program (CSBFP), NRC IRAP, SR&ED tax credits, BDC loans, Regional Development Agency grants, and provincial small business programs for Canadian SMEs in every industry.",
  keywords: "Canada small business grants 2026, CSBFP Canada, small business funding Canada, SME grants Canada, BDC small business loans, Canada small business tax credits, SR&ED small business, IRAP small business, provincial business grants Canada",
  alternates: { canonical: "https://www.fsidigital.ca/canada/small-business-grants" },
  openGraph: { title: "Canada Small Business Grants 2026 | CSBFP, SR&ED & SME Funding Guide", description: "Get the complete guide to Canadian small business grants — CSBFP, IRAP, SR&ED, BDC, and provincial programs for SMEs in 2026.", url: "https://www.fsidigital.ca/canada/small-business-grants" },
}

const smGrants: Grant[] = [
  { id: "ca-csbfp", name: "Canada Small Business Financing Program (CSBFP)", fundingMin: 10000, fundingMax: 1500000, eligibility: ["Canadian businesses with annual revenue under $10M", "For-profit businesses of any age", "All industries except farming and religious organizations"], deadline: "Continuous — through any participating Canadian chartered bank or credit union", applicationLink: "https://www.canada.ca/en/innovation-science-economic-development/programs/small-business-financing.html", description: "Government-backed loan guarantee enabling small businesses to borrow up to $1.5M for equipment, leasehold improvements, and commercial real property — at regular bank rates with 85% government guarantee reducing bank risk.", country: "Canada", region: "Federal", category: "Loan Guarantee", agency: "Innovation, Science and Economic Development Canada", status: "Active", tags: ["Loan", "Equipment", "Real Estate", "Leasehold"], requirements: ["Annual revenue under $10M", "For-profit Canadian business", "Loan for eligible asset classes", "Regular bank application process"], lastUpdated: "2026-01-01" },
  { id: "ca-irap-sme", name: "NRC IRAP — SME R&D Funding", fundingMin: 50000, fundingMax: 2000000, eligibility: ["Canadian SMEs under 500 employees doing technology R&D", "All tech and innovation sectors", "Must have technological uncertainty in project"], deadline: "Rolling — contact regional NRC ITA advisor", applicationLink: "https://nrc.canada.ca/en/support-technology-innovation/nrc-industrial-research-assistance-program", description: "NRC IRAP provides non-repayable R&D funding to Canadian SMEs for technical product and process development — covering wages of employees and contractors doing qualifying R&D.", country: "Canada", region: "Federal", category: "R&D Grant", agency: "National Research Council", status: "Active", tags: ["IRAP", "SME", "R&D", "Technology"], requirements: ["B Canadian SME", "Fewer than 500 employees", "Qualifying R&D activities", "ITA relationship"], lastUpdated: "2026-01-01" },
  { id: "ca-sred-sme", name: "SR&ED Tax Credit (Small Business Enhanced Rate)", fundingMin: 5000, fundingMax: 5000000, eligibility: ["All Canadian corporations doing qualifying R&D", "CCPCs (Canadian-Controlled Private Corporations) get enhanced 35% rate", "Any industry — manufacturing, software, agriculture, life sciences, etc."], deadline: "Filed annually with corporate T2 tax return", applicationLink: "https://www.canada.ca/en/revenue-agency/services/scientific-research-experimental-development-tax-incentive-program.html", description: "Canada's largest R&D incentive — 35% refundable credit for CCPCs on first $3M of qualifying R&D expenditures. The most impactful program for any R&D-doing Canadian small business.", country: "Canada", region: "Federal", category: "Tax Credit", agency: "Canada Revenue Agency", status: "Active", tags: ["SR&ED", "Tax Credit", "R&D", "Refundable"], requirements: ["Canadian corporation", "Qualifying R&D activities", "Contemporaneous documentation", "Annual T661 form with T2"], lastUpdated: "2026-01-01" },
  { id: "ca-cdap", name: "Canada Digital Adoption Program (CDAP)", fundingMin: 2400, fundingMax: 100000, eligibility: ["Canadian SMEs with 1–499 employees and minimum $500K annual revenue", "Businesses at all digital maturity levels", "All industries"], deadline: "Rolling until program funds exhausted — ised-isde.canada.ca/cdap", applicationLink: "https://ised-isde.canada.ca/site/canada-digital-adoption-program/en", description: "Grants and interest-free BDC loans for Canadian SMEs adopting digital technology — $2,400 micro-grants for e-commerce and up to $100,000 advisory grants through the Boost Your Business Technology stream.", country: "Canada", region: "Federal", category: "Digital Adoption", agency: "ISED Canada", status: "Active", tags: ["Digital", "E-commerce", "Technology Adoption", "SME"], requirements: ["Canadian SME 1–499 employees", "$500K+ annual revenue (Boost stream)", "Canadian business registration", "Not recently issued CDAP grant"], lastUpdated: "2026-01-01" },
  { id: "ca-futurpreneur", name: "Futurpreneur Canada — Young Entrepreneur Grants & Mentorship", fundingMin: 10000, fundingMax: 20000, eligibility: ["Entrepreneurs aged 18–39 starting or growing a business", "Canadian residents", "Business at early stage or pre-revenue"], deadline: "Rolling — futurpreneur.ca", applicationLink: "https://www.futurpreneur.ca/en/get-financing/", description: "Low-interest business loans ($10K–$20K) with 2-year mentorship for young Canadian entrepreneurs. BDC co-lending adds another $40K–$60K for a total of up to $60K for qualifying young entrepreneurs.", country: "Canada", region: "Federal / National", category: "Youth Entrepreneur", agency: "Futurpreneur Canada / BDC", status: "Active", tags: ["Youth", "Mentorship", "Startup Loan", "18-39"], requirements: ["Age 18–39", "Business plan required", "Canadian resident", "Within first 60 months of business"], lastUpdated: "2026-01-01" },
]

export default function CanadaSmallBusinessGrantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <Header />

      <section className="bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Briefcase className="h-6 w-6 text-indigo-300" />
              <Badge className="bg-indigo-500/30 text-indigo-100 border-indigo-400">Canada Small Business Grants 2026</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Canada Small Business Grants 2026</h1>
            <div className="mt-8 mb-4 text-left">
              <ShortAnswerBox
                question="What grants are available for small businesses in Canada in 2026?"
                content="Yes — Canadian small businesses can access CSBFP government-backed loans (up to $1.5M through your bank), SR&ED tax credits (35% refundable for CCPCs on qualifying R&D), NRC IRAP for technology SMEs ($50K–$2M), CDAP digital adoption grants ($2,400–$100K), Regional Development Agency contributions by province, and Futurpreneur loans ($20K–$60K) for entrepreneurs aged 18–39. Most Canadian SMEs qualify for 2–3 programs simultaneously."
              />
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
            {["CSBFP Loans", "SR&ED Credits", "IRAP R&D", "CDAP Digital", "Provincial Programs", "FAQ"].map((item) => (
              <Badge key={item} variant="outline" className="cursor-pointer hover:bg-indigo-50 px-3 py-1.5 text-sm">{item}</Badge>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Canada Small Business Programs — Quick Comparison 2026</h2>
            <p className="text-gray-600 mb-6">Compare the primary national small business programs. Note: provincial programs are additional layers on top of these federal ones — check your province&apos;s small business ministry or RDA for province-specific programs.</p>
            <GrantComparisonTable grants={smGrants} title="Canada Small Business Grant Programs" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-10">

              <Card>
                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Building className="h-5 w-5 text-indigo-600" />Canada Small Business Funding — The Complete Landscape</CardTitle></CardHeader>
                <CardContent className="text-gray-700 space-y-4">
                  <p className="leading-relaxed">
                    Canadian small businesses are better supported by government programs than businesses in most comparable
                    countries — and most owners significantly under-use the programs available to them. A 2024 CFIB study
                    found that nearly 60% of Canadian SME owners who qualified for SR&ED didn&apos;t file; over 50% of CDAP-eligible
                    businesses hadn&apos;t applied; and the majority of businesses eligible for CSBFP loans didn&apos;t know the program
                    existed. The funding gap is an awareness and navigation gap, not a lack of programs.
                  </p>
                  <p className="leading-relaxed">
                    Canada small business funding divides into four distinct categories: <strong>loan programs</strong> (CSBFP,
                    Futurpreneur, BDC) that provide financed capital repayable over time; <strong>tax credit programs</strong>
                    (SR&ED, provincial R&D credits) that reduce your tax bill or provide cash refunds; <strong>non-repayable
                      grants</strong> (IRAP, CDAP, RDA contributions, provincial grants) that provide direct funding with no
                    repayment; and <strong>advisory and ecosystem programs</strong> (BDC advisory, TCS export support,
                    regional accelerators, Futurpreneur mentorship) that provide expertise and market access worth real
                    dollar value. Sophisticated Canadian small businesses access programs in all four categories simultaneously.
                  </p>
                  <p className="leading-relaxed">
                    The most important concept for a Canadian small business navigating this landscape is the
                    <strong> funding stack</strong> — structuring multiple programs to fund different cost categories
                    of the same business plan or project. CSBFP funds equipment; SR&ED refunds R&D costs; IRAP funds
                    R&D wages; CDAP funds digital transformation; and an RDA grant funds market development activities.
                    None of these programs conflict — they target different cost categories, and together they can fund
                    60–80% of a small business&apos;s total capital needs in its first 3–5 years, dramatically reducing the
                    equity capital required from personal savings, friends-and-family, or angel investors.
                  </p>
                </CardContent>
              </Card>

              {/* CSBFP Detail */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Key Programs — Detailed Breakdown</h2>
                <p className="text-gray-600 mb-6">Complete analysis of each program — eligibility, what the money funds, how to apply, and common traps to avoid.</p>
                <div className="space-y-6">

                  <Card className="border-l-4 border-l-indigo-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">1. Canada Small Business Financing Program (CSBFP)</CardTitle>
                        <Badge className="bg-indigo-100 text-indigo-800 shrink-0 ml-2">Up to $1.5M</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        CSBFP is Canada&apos;s most widely accessible small business loan program — available to any Canadian
                        for-profit business with annual revenue under $10M, through any participating chartered bank,
                        credit union, or caisse populaire. The program works by having the federal government guarantee
                        85% of the loan — dramatically reducing the bank&apos;s risk and enabling them to lend to businesses
                        that might not otherwise qualify for conventional financing.
                      </p>
                      <p>
                        CSBFP funds three specific asset classes: equipment (up to $1M), leasehold improvements (up to
                        $500K), and commercial real property (up to $1M) — recently expanded to also include intellectual
                        property and start-up costs (up to $150K combined). The interest rate is regulated: no more than
                        3% above the lender&apos;s prime or base rate. The loan fee is 2% of the loan amount paid to the
                        government once at start.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4 mt-4">
                        <div className="bg-indigo-50 rounded-lg p-4">
                          <div className="font-semibold text-indigo-900 mb-2 text-sm">CSBFP Funds:</div>
                          <ul className="text-xs text-indigo-700 space-y-1">
                            <li>• Business equipment and machinery</li>
                            <li>• Leasehold improvements (fit out)</li>
                            <li>• Commercial real property purchase</li>
                            <li>• Intellectual property (up to $150K)</li>
                            <li>• Working capital/startup costs (up to $150K)</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="font-semibold text-gray-900 mb-2 text-sm">CSBFP Does NOT Fund:</div>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• Purchase of another business (business acquisitions)</li>
                            <li>• Non-tangible general working capital (payroll, rent)</li>
                            <li>• Farming primary agricultural production</li>
                            <li>• Charitable or religious organizations</li>
                            <li>• Businesses with revenue over $10M</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">2. SR&ED Tax Credit — The Most Important Program You&apos;re Probably Not Using</CardTitle>
                        <Badge className="bg-green-100 text-green-800 shrink-0 ml-2">35% refundable (CCPCs)</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        SR&ED (Scientific Research and Experimental Development) is Canada&apos;s largest R&D incentive and the
                        most impactful program for technology-doing and product-developing Canadian small businesses that
                        most founders don&apos;t utilize. If your business does ANY qualifying R&D — software development with
                        genuine technical innovation, manufacturing process development, new product formulation, novel
                        agricultural techniques — you are eligible for a 35% refundable tax credit on those expenditures
                        as a Canadian-Controlled Private Corporation (CCPC).
                      </p>
                      <p>
                        The &quot;refundable&quot; aspect is critical: even if your company has zero tax payable (because you&apos;re
                        in a loss position — which is common for early-stage companies heavily investing in development),
                        CRA sends you a cash cheque for your SR&ED credit. A small business spending $200K on qualifying
                        software R&D gets a $70,000 cash refund from CRA regardless of whether the company is profitable.
                      </p>
                      <p>
                        The most common mistake: thinking that only formal R&D labs or pharmaceutical companies qualify.
                        Software companies, manufacturers, food producers, agtech companies, medtech companies,
                        cleantech companies, and many service businesses with proprietary systems or methods all
                        potentially qualify. The test is whether you faced genuine <em>technological uncertainty</em>
                        — a technical problem where the solution wasn&apos;t obvious from existing knowledge.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-orange-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">3. Canada Digital Adoption Program (CDAP)</CardTitle>
                        <Badge className="bg-orange-100 text-orange-800 shrink-0 ml-2">$2,400 – $100K</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        CDAP has two streams serving different digital adoption needs. The <strong>Grow Your Business Online</strong>
                        micro-grant ($2,400) is a quick, easy-to-access grant for small businesses adopting e-commerce
                        — covering website development, digital payment setup, online marketing, and digital selling tools.
                        Application is online, decision within 2–4 weeks, and payment is fast. Eligibility: any Canadian
                        for-profit business with under 149 employees and at least $30K annual revenue.
                      </p>
                      <p>
                        The <strong>Boost Your Business Technology</strong> stream ($15K advisory grant + up to $100K
                        interest-free BDC loan) provides more substantial support: a digital skills advisor assesses
                        your business&apos;s digital maturity, creates a digital adoption plan, and provides implementation
                        support. The $100K BDC loan (0% interest, available to qualifying CDAP-Boost recipients) can
                        fund the technology investments recommended in the digital adoption plan. Eligibility: Canadian
                        for-profit business with at least 1 employee and $500K annual revenue.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">4. Provincial Small Business Programs — By Province</CardTitle>
                        <Badge className="bg-purple-100 text-purple-800 shrink-0 ml-2">Varies by province</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        Every province operates its own small business grant and financing programs in addition to federal
                        programs. Provincial programs typically focus on job creation, sector development priorities,
                        and regional economic concerns specific to their jurisdiction. Below are the key provincial
                        programs for each region:
                      </p>
                      <div className="space-y-3 mt-4">
                        {[
                          { prov: "Ontario", programs: "Ontario Small Business Support Grant (during pandemic era — check for active replacements), OMAFRA Rural Economic Development Program, MaRS Investment Accelerator Fund, OCI voucher programs, Northern Ontario Heritage Fund (NOHFC) for northern Ontario businesses" },
                          { prov: "British Columbia", programs: "BC Employer Training Grant ($10K–$300K for training costs), BC Technology Fund (BCV), Innovate BC Ignite grants, BC Rural Business Program, Community Futures loan programs for rural BC" },
                          { prov: "Alberta", programs: "Alberta Innovates Business Voucher Program ($10K–$100K), ATB Financial Entrepreneur&apos;s Edge programs, Rural Connectivity and Economic Development grants, Alberta tourism and hospitality SME programs" },
                          { prov: "Quebec", programs: "PME Montreal support programs, Investissement Québec SME financing, CDPQ startup investment programs, regional SADC (Community Futures equivalent) loan programs" },
                          { prov: "Atlantic (NS/NB/PEI/NL)", programs: "ACOA Business Development Program ($10K–$1M), provincial R&D tax credits (Nova Scotia, New Brunswick), PEI Island Investment Development Inc., NewfoundLand Labrador Regional Economic Development programs" },
                        ].map(({ prov, programs }) => (
                          <div key={prov} className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                            <div className="font-bold text-purple-900 text-sm mb-1">{prov}</div>
                            <div className="text-xs text-purple-700">{programs}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                </div>
              </div>

              {/* How to Apply */}
              <Card>
                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><FileText className="h-5 w-5 text-indigo-600" />How to Apply for Canada Small Business Grants — Step by Step</CardTitle></CardHeader>
                <CardContent className="text-gray-700">
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Use Innovation Canada&apos;s Business Benefits Finder First", desc: "innovation.canada.ca houses a business benefits finder that surveys your business type, size, location, and industry and returns a curated list of matching federal programs. It doesn&apos;t cover all provincial programs, but it is the best single starting point for identifying federal programs relevant to your situation. Spend 20 minutes on this tool before contacting any program directly — it creates the prioritized program list that your outreach strategy should follow." },
                      { step: "2", title: "Register for SR&ED Documentation From Day One of Any R&D", desc: "If your business does any R&D — even part-time, even informal — start SR&ED documentation immediately. SR&ED claims are only as strong as their contemporaneous documentation: lab notebooks, code commits (for software), engineering decision logs, time tracking records showing which activities were R&D vs. operational. You cannot reconstruct this documentation after the fact without dramatically increasing your CRA audit risk. Assign one person in your organization the specific responsibility of SR&ED documentation from the first day of any technical development activity." },
                      { step: "3", title: "Apply for CDAP Grow Your Business Online if You&apos;re Not Yet on E-Commerce", desc: "CDAP&apos;s $2,400 micro-grant is one of the easiest federal grants to access — online application, minimal documentation, fast decision, cash to your designated advisor. Even if digital transformation is not your primary focus, $2,400 toward website improvements, online payment setup, or Google Ads launch is free capital. Apply first, then focus on larger programs. Eligibility: Canadian for-profit business, 1–149 employees, over $30K revenue." },
                      { step: "4", title: "Apply for CSBFP at Your Bank for Any Equipment or Leasehold Needs", desc: "If you are purchasing equipment, fitting out a commercial space, or acquiring commercial real property, apply for CSBFP at your existing bank before exploring alternative financing. CSBFP loans cost only slightly more than regular commercial loans (the 2% registration fee is the primary added cost) but have dramatically easier qualification criteria — your bank takes far less risk with the 85% government guarantee. Ask your bank branch specifically about CSBFP when discussing any equipment or leasehold financing needs." },
                      { step: "5", title: "Contact Your Regional Development Agency for Project-Based Grants", desc: "If your business has a defined project — entering a new market, developing a new product, setting up a new production line, expanding digital capacity — your Regional Development Agency may fund 33–50% of that project cost. Contact FedDev (Ontario), PacifiCan (BC), WD Canada (Prairies), ACOA (Atlantic), or CED (Quebec) with a brief description of your project scale, sector, and expected economic impact (jobs, revenue, exports). RDA program officers will tell you within one call whether there is a suitable program and how to apply." },
                      { step: "6", title: "Layer Your Programs and Maintain Clean Project-Level Accounting", desc: "The final step is to maintain clean, audited accounting that separates costs by program. Federal programs require you to repay funding if their money was also claimed through another program for the same cost. This is easily avoided by maintaining a simple program-cost tracking spreadsheet: each cost line shows which program it is claimed under, and no single cost is claimed twice. Your accountant can set up this tracking — it is standard practice for Canadian businesses receiving multiple government grants." },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-indigo-700 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                        <div><div className="font-semibold text-gray-900 mb-1">{item.title}</div><div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Common Mistakes */}
              <Card className="border-red-100 bg-red-50">
                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-red-900"><AlertCircle className="h-5 w-5 text-red-600" />5 Mistakes Canadian Small Business Owners Make with Grants</CardTitle></CardHeader>
                <CardContent className="text-red-900 space-y-4">
                  {[
                    { n: "1", m: "Not Filing SR&ED Because &apos;Our Development Isn&apos;t Formal Research&apos;", d: "This is Canada&apos;s most expensive misconception. SR&ED doesn&apos;t require a formal R&D department, a PhD researcher, or a laboratory. It requires technological uncertainty — a technical problem where the solution wasn&apos;t obvious from existing engineering or scientific knowledge. A small software company debugging a novel distributed computing approach, a manufacturer testing a new forming process, a food company developing a new clean-label preservative — all potentially qualify. An SR&ED advisor consultations costs $0–$500; the potential claim value for even a small tech SME is $30K–$200K per year. There is no excuse not to investigate your eligibility." },
                    { n: "2", m: "Paying Full Commercial Rates for Equipment Loans Without Using CSBFP", d: "CSBFP-backed bank loans are available through every major Canadian bank and credit union, require no extra application beyond the normal bank process, and cost only 2% more than a regular loan in registration fees (paid once). Yet the majority of small Canadian businesses buying equipment or fitting out commercial spaces finance through regular commercial loans or leases — at higher rates and with more restrictive terms. Always ask your bank &apos;Can this be done under CSBFP?&apos; before signing any equipment or leasehold financing agreement." },
                    { n: "3", m: "Waiting Until Business Is Established to Apply for Futurpreneur", d: "Futurpreneur Canada provides $20K–$60K in low-interest loans with 2 years of mentorship for entrepreneurs aged 18–39. Unlike most small business programs, Futurpreneur is specifically designed for pre-revenue and early-stage businesses — you do not need operating history or existing revenue to qualify. Many young entrepreneurs wait until they&apos;re established before looking at Futurpreneur, by which time they&apos;re outside the intended early-stage window. Apply at startup — Futurpreneur&apos;s mentorship value alone is worth the application process." },
                    { n: "4", m: "Missing CDAP Because the $2,400 &apos;Seems Small&apos;", d: "The CDAP Grow Your Business Online micro-grant ($2,400) takes approximately 2–3 hours to apply for and is approved within weeks. Many business owners skip it because $2,400 &apos;isn&apos;t enough to matter&apos;. But $2,400 toward a small business website, Google Analytics setup, or social media advertising is a meaningful investment at the startup stage — and there is zero reason not to claim it if you qualify. Additionally, the CDAP Boost stream ($15K advisory + $100K interest-free BDC loan) is substantially larger and available to qualifying businesses. At minimum, check your CDAP Grow eligibility — it takes 15 minutes." },
                    { n: "5", m: "Not Engaging the Trade Commissioner Service (TCS) for Export Markets", d: "Canada&apos;s Trade Commissioner Service (tradecommissioner.gc.ca) is one of the most valuable free business development resources available to any Canadian company with international ambitions — and one of the least used by small businesses. TCS has trade commissioners in 160+ countries providing free introductions to qualified foreign buyers, market intelligence, and export readiness support. For a small Canadian business spending $20K–$50K on international travel and market development, TCS can provide the same market access value for zero cost. Register and contact the TCS before booking any international market development trip." },
                  ].map(({ n, m, d }) => (
                    <div key={n} className="bg-white rounded-lg p-4 border border-red-200">
                      <div className="font-semibold mb-2 text-red-900">{n}. {m}</div>
                      <p className="text-sm text-red-800 leading-relaxed">{d}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Expert Tip */}
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-amber-800"><Lightbulb className="h-5 w-5 text-amber-600" />Expert Strategy: The Canadian Small Business Funding Stack</CardTitle></CardHeader>
                <CardContent className="text-amber-900 space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="font-semibold mb-2">💡 Typical Funding Stack for a Canadian Tech SME (Year 1–3)</div>
                    <p className="text-sm leading-relaxed">Year 1: CSBFP ($150K for equipment) + CDAP Grow ($2,400 e-commerce) + SR&ED ($50K refund on $143K qualifying R&D) + Futurpreneur ($20K startup loan, if founder 18–39). Year 2: IRAP approved ($200K for engineering wages) + SR&ED Year 2 ($105K refund on $300K qualifying R&D) + CDAP Boost ($15K advisory + $100K BDC loan interest-free). Year 3: FedDev/RDA project grant ($150K for commercialization project) + SR&ED Year 3 ($140K refund). Total non-dilutive capital over 3 years: ~$1M on $600K in company R&D investment. This is the actual funding trajectory used by successful Canadian tech SMEs — it is achievable with deliberate program navigation.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="font-semibold mb-2">💡 Non-Tech Small Business Stack (Retail / Hospitality / Food Services)</div>
                    <p className="text-sm leading-relaxed">Non-tech small businesses have fewer options but still access meaningful funding. CSBFP covers equipment and fit-out (lease improvements). CDAP Grow covers e-commerce and digital marketing. Provincial programs (depending on province) may cover training costs (BC Employer Training Grant, Ontario training credits) and rural business development. ACOA BDP covers Atlantic hospitality and food service businesses. The stack is smaller — typically $30K–$150K vs. the $500K–$1M available to tech companies — but still meaningful for reducing the equity needed to open or expand a location.</p>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">FAQ: Canada Small Business Grants 2026</h2>
                <p className="text-gray-600 mb-6">Common questions from Canadian small business owners, freelancers-turned-entrepreneurs, and first-time founders navigating the funding landscape.</p>
                <div className="space-y-4">
                  {[
                    { q: "Does my business need to be incorporated to access Canadian small business grants?", a: "Most federal grants and loan programs require incorporation. CSBFP requires a for-profit business entity but can accommodate sole proprietors in some cases — contact your bank to confirm. SR&ED requires a corporate tax return (T2) and therefore requires incorporation; sole proprietors file a T1 and cannot claim SR&ED. CDAP accepts sole proprietors for the Grow micro-grant ($2,400) but the Boost stream typically requires incorporation. IRAP requires an incorporated Canadian company. The bottom line: if you are serious about accessing Canada&apos;s most valuable small business programs (SR&ED, IRAP, CSBFP Boost), incorporate your business first." },
                    { q: "Can a startup that has been operating for only a few months access CSBFP?", a: "Yes — CSBFP has no minimum operating history requirement. New businesses can access CSBFP immediately after incorporation and registration. The loan is assessed based on the business plan, personal credit (for smaller loans), and the viability of the business concept — not on operating history or existing revenue. Many franchise startups use CSBFP for their initial fit-out and equipment before opening their first location. However, very new businesses (under 60 days of incorporation) may face extra scrutiny from bank lenders assessing business plan viability — a well-prepared business plan and financial projections significantly improve approval outcomes." },
                    { q: "What is the Community Futures program and how does it serve small businesses in rural Canada?", a: "Community Futures (CF) is a national network of 267 Community Futures Development Corporations (CFDCs) in rural Canada — federally funded and community-operated organizations providing loans, business advisory, and economic development support to rural small businesses. Community Futures fills a critical rural financing gap: most federal programs and banks underserve rural businesses, but CFDCs have mandates to specifically serve rural and remote communities. Community Futures provides business loans typically of $10K–$150K for rural businesses in communities where conventional bank access is limited. Find your CFDC at communityfuturescanada.ca. Most rural Canadians starting or expanding businesses should contact Community Futures as their first funding call." },
                    { q: "Are there Canadian small business grants specifically for the restaurant and food service industry?", a: "The restaurant and food service industry has limited access to pure non-repayable grants compared to technology or manufacturing sectors — but several programs are relevant. CSBFP is heavily used by restaurants for equipment and leasehold financing. CDAP Grow covers online ordering platform setup and digital marketing for restaurants. The Canadian Agricultural Partnership (CAP) has food processing streams relevant to food businesses above primary production. ACOA BDP supports Atlantic hospitality and food businesses. Some provincial programs (BC Employer Training Grant, Ontario hospitality programs) cover training costs. Indigenous-owned restaurants have access to Indigenous business programs in addition to the above. For restaurants specifically, CSBFP + CDAP Grow + provincial training credits is the most typical funding stack." },
                    { q: "My business is profitable but I don&apos;t do formal R&D. Can I still access federal grants?", a: "Yes — multiple federal programs serve profitable, non-R&D businesses. CSBFP funds equipment and leasehold improvements for any business under $10M revenue. CDAP funds digital adoption. RDA grants (FedDev, ACOA, etc.) fund market development, export activities, and productivity investments for any business with a qualifying project in their region. The Canada Jobs Grant and provincial training programs fund employee training costs. EDC supports export-market business development. The misconception is that only tech or R&D-doing companies can access government support — non-tech profitable businesses have meaningful grant access, though it skews more toward loan programs (CSBFP, BDC) and contribution programs (RDA) than tax credit programs (SR&ED)." },
                    { q: "Can I use a grant consultant to apply for Canadian small business grants, and is it worth it?", a: "For SR&ED specifically, using a specialized SR&ED consultant is strongly recommended — particularly for first-time filers. SR&ED consultants prepare your claim on a success-fee basis (typically 15–25% of the credit amount), so there is no upfront cost and they only earn when you receive the refund. The risk of a poorly prepared SR&ED claim is CRA audit and credit denial — the cost of which dramatically exceeds any consultant fee. For other grant programs (IRAP, RDA grants), in-house staff with guidance from program officers is usually sufficient. For large SIF applications ($5M+), engaging a consulting firm with specific SIF experience is often justified given the application complexity and stakes." },
                    { q: "Is the Futurpreneur loan a grant or does it have to be repaid?", a: "Futurpreneur provides a low-interest loan — it must be repaid over 5 years at a below-market interest rate. Up to $20K comes directly from Futurpreneur; a matching BDC co-loan of $20K–$40K takes the total to $60K. The combined repayment schedule is typically structured around the business&apos;s cash flow. While it is a loan rather than a non-repayable grant, Futurpreneur&apos;s primary benefit is the mandatory 2-year mentorship — matched with an experienced business mentor who provides guidance, introductions, and accountability available nowhere else at this price. For young entrepreneurs (18–39) starting a business, the mentorship alone justifies Futurpreneur even for founders who could access alternative financing at similar rates." },
                    { q: "How do I know if the CDAP Boost stream&apos;s $100K BDC loan is interest-free for the duration of the loan?", a: "The CDAP Boost BDC loan has been offered on an interest-free basis for qualifying recipients — the 0% interest applies for the loan&apos;s repayment term (typically 3–5 years). However, program terms have evolved since CDAP launched in 2021 — as with any government program, current terms should be confirmed at the time of application. Check ised-isde.canada.ca/cdap and bdc.ca for the current loan terms applicable to new CDAP Boost applicants. The CDAP program overall has a fixed total funding allocation — when the allocation is exhausted, the program closes or is redesigned. Apply while the program is active rather than waiting for a hypothetical window." },
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
              <Card className="bg-indigo-800 text-white">
                <CardContent className="pt-6">
                  <Star className="h-8 w-8 text-yellow-300 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Free Small Business Grant Matching</h3>
                  <p className="text-indigo-100 text-sm mb-4">Our advisors identify the full CSBFP, SR&ED, IRAP, CDAP, and provincial grant stack for your Canadian small business — free 30-min session.</p>
                  <Link href="/contact"><Button className="w-full bg-white text-indigo-800 hover:bg-indigo-50">Get Free Matching <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
                </CardContent>
              </Card>
              <NewsletterSignup variant="sidebar" />
              <Card>
                <CardHeader><CardTitle className="text-lg">Key Resources</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-3">
                  <div><div className="font-semibold">Innovation Canada Benefits Finder</div><div className="text-gray-500">innovation.canada.ca</div></div>
                  <div><div className="font-semibold">CSBFP (through your bank)</div><div className="text-gray-500">Ask your Canadian bank for CSBFP</div></div>
                  <div><div className="font-semibold">CDAP</div><div className="text-gray-500">ised-isde.canada.ca/cdap</div></div>
                  <div><div className="font-semibold">Futurpreneur</div><div className="text-gray-500">futurpreneur.ca (ages 18–39)</div></div>
                  <div><div className="font-semibold">Community Futures (rural)</div><div className="text-gray-500">communityfuturescanada.ca</div></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Related Resources</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <Link href="/canada/government-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Federal Canadian Grants</Link>
                    <Link href="/canada/innovation-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Canada Innovation Grants</Link>
                    <Link href="/blog/sred-tax-credit-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> SR&ED Tax Credit Guide</Link>
                    <Link href="/canada/women-business-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Canada Women Business Grants</Link>
                    <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder Tool</Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-8">
            <NewsletterSignup title="Canada Small Business Grant Updates" description="Track CDAP program status, CSBFP limit changes, new RDA program launches, and SR&ED rate updates for 2026 — delivered to your inbox." />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
