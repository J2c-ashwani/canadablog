import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, CheckCircle, ArrowRight, Building, Lightbulb, FileText, AlertCircle, Star } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import AutoLink from "@/components/seo/AutoLink"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
    title: "Indigenous Entrepreneur Grants Canada 2026 | AEP, NACCA & First Nations Business Funding",
    description: "Complete guide to Indigenous entrepreneur grants in Canada 2026. Aboriginal Entrepreneurship Program (AEP), NACCA Aboriginal Financial Institutions network, Métis Capital Corporation, federal procurement set-asides, and provincial Indigenous business programs for First Nations, Métis, and Inuit founders.",
    keywords: "Indigenous entrepreneur grants Canada 2026, Aboriginal Entrepreneurship Program, NACCA grants, First Nations business grants, Métis entrepreneur funding, Inuit entrepreneur grants, Indigenous Small Business Financing, AEP Canada, Indigenous procurement Canada",
    alternates: { canonical: "https://www.fsidigital.ca/canada/indigenous-entrepreneur-grants" },
    openGraph: { title: "Indigenous Entrepreneur Grants Canada 2026 | AEP, NACCA & First Nations Business Funding", description: "Discover Canadian Indigenous entrepreneur grants — AEP, NACCA AFI network, Métis Capital, and federal procurement set-asides for First Nations, Métis, and Inuit businesses in 2026.", url: "https://www.fsidigital.ca/canada/indigenous-entrepreneur-grants" },
}

const indigenousGrants: Grant[] = [
    { id: "ca-aep", name: "Aboriginal Entrepreneurship Program (AEP)", fundingMin: 5000, fundingMax: 99999, eligibility: ["First Nations, Métis, and Inuit entrepreneurs", "Starting or expanding a business", "Business located in Canada"], deadline: "Rolling through Aboriginal Financial Institutions (AFIs)", applicationLink: "https://www.sac-isc.gc.ca/eng/1375201178602/1610797594523", description: "Non-repayable business support grants and repayable micro-loans for Indigenous entrepreneurs, delivered through the national network of Aboriginal Financial Institutions (AFIs). Provides up to $99,999 per project.", country: "Canada", region: "Federal", category: "Business Support Grant", agency: "Indigenous Services Canada / NACCA AFI Network", status: "Active", tags: ["Indigenous Business", "Grant", "Micro-loan", "AFI"], requirements: ["Self-identified First Nations, Métis, or Inuit", "Canadian business project", "Business plan required", "Application through regional AFI"], lastUpdated: "2026-01-01" },
    { id: "ca-nacca-afi", name: "NACCA Aboriginal Financial Institution (AFI) Loans", fundingMin: 10000, fundingMax: 1000000, eligibility: ["Indigenous entrepreneurs across Canada", "All industries and business stages", "First Nations, Métis, and Inuit applicants"], deadline: "Rolling — through 59 AFIs across Canada", applicationLink: "https://www.nacca.ca/member-afis/", description: "NACCA's 59 regional Aboriginal Financial Institutions provide business loans ($10K–$1M) with Indigenous-sensitive underwriting, culturally appropriate business advisory, and below-market rates for Indigenous entrepreneurs who may not qualify for conventional bank financing.", country: "Canada", region: "Federal / AFI Network", category: "Business Loans", agency: "National Aboriginal Capital Corporations Association (NACCA)", status: "Active", tags: ["Loan", "Indigenous Business", "AFI", "Capital"], requirements: ["Indigenous identity (First Nations, Métis, or Inuit)", "Canadian business", "Business plan and financial projections", "Application through regional AFI"], lastUpdated: "2026-01-01" },
    { id: "ca-metis-capital", name: "Métis Capital Corporation Programs", fundingMin: 10000, fundingMax: 500000, eligibility: ["Métis entrepreneurs and businesspeople", "Métis Nation registered members preferred", "All provinces with Métis Capital Corporations"], deadline: "Rolling through provincial Métis Capital Corporations", applicationLink: "https://www.metisnation.ca/government/programs-services/", description: "Provincial Métis Capital Corporations provide equity financing, business loans, and grants specifically for Métis entrepreneurs — with programs in BC, Alberta, Saskatchewan, Manitoba, and Ontario.", country: "Canada", region: "Federal/Provincial", category: "Métis Business Financing", agency: "Métis Capital Corporations / Métis Nation", status: "Active", tags: ["Métis", "Capital", "Loan", "Business Support"], requirements: ["Métis identity / registration", "Province-specific — varies by Métis Capital Corp", "Business plan required"], lastUpdated: "2026-01-01" },
    { id: "ca-indigenous-procurement", name: "Procurement Strategy for Indigenous Business (PSIB)", fundingMin: 0, fundingMax: 0, eligibility: ["Indigenous-owned businesses (51%+ Indigenous ownership)", "Registered on Indigenous Business Directory", "Federal government procurement opportunities"], deadline: "Continuous — federal procurement cycles", applicationLink: "https://www.canada.ca/en/public-services-procurement/services/acquisition/aboriginal.html", description: "Federal procurement set-aside program requiring departments to award government contracts to Indigenous businesses. Over $1B in annual set-aside contracts available to businesses registered in the Indigenous Business Directory.", country: "Canada", region: "Federal", category: "Procurement", agency: "Indigenous Services Canada / PSPC", status: "Active", tags: ["Procurement", "Federal Contract", "Set-Aside", "Revenue"], requirements: ["51%+ Indigenous ownership", "Indigenous Business Directory registration", "GST/HST registration", "Relevant business capability"], lastUpdated: "2026-01-01" },
    { id: "ca-wedi", name: "Women Entrepreneurship Strategy — Indigenous Stream", fundingMin: 25000, fundingMax: 100000, eligibility: ["Indigenous women entrepreneurs", "Businesses at early growth or scale-up stage", "All sectors"], deadline: "Through regional Women's Enterprise Centres and AFIs — rolling", applicationLink: "https://ised-isde.canada.ca/site/women-entrepreneurship-strategy/en", description: "Federal Women Entrepreneurship Strategy includes dedicated support for Indigenous women entrepreneurs through ecosystem partners — funding, mentorship, business training, and market access support.", country: "Canada", region: "Federal", category: "Women Entrepreneurs", agency: "ISED Canada — Women Entrepreneurship Strategy", status: "Active", tags: ["Indigenous Women", "WES", "Mentorship", "Funding"], requirements: ["Indigenous identity", "Self-identified gender", "Business registration", "Through WES ecosystem partner"], lastUpdated: "2026-01-01" },
]

export default function IndigenousEntrepreneurGrantsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
            <Header />

            <section className="bg-gradient-to-br from-orange-700 via-amber-800 to-red-900 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Users className="h-6 w-6 text-orange-300" />
                            <Badge className="bg-orange-500/30 text-orange-100 border-orange-400">Indigenous Entrepreneur Funding Canada 2026</Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Indigenous Entrepreneur Grants Canada 2026</h1>
            <div className="mt-8 mb-4 text-left">
              <ShortAnswerBox
                question="What government funding is available for Indigenous entrepreneurs in Canada?"
                content="Yes — Indigenous entrepreneurs in Canada have access to the Aboriginal Entrepreneurship Program (up to $99,999 non-repayable), 59 regional Aboriginal Financial Institutions (AFIs) providing flexible loans of $10K–$1M, Métis Capital Corporations in BC, Alberta, Saskatchewan, Manitoba, and Ontario, $1B+ in annual federal procurement set-asides through PSIB, and all mainstream business programs (BDC, EDC, IRAP, SR&ED) for which Indigenous businesses fully qualify."
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
                        {["AEP Program", "NACCA AFI Network", "Métis Programs", "Federal Procurement", "First Nations vs Métis vs Inuit", "FAQ"].map((item) => (
                            <Badge key={item} variant="outline" className="cursor-pointer hover:bg-orange-50 px-3 py-1.5 text-sm">{item}</Badge>
                        ))}
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Indigenous Entrepreneur Programs — Quick Comparison 2026</h2>
                        <p className="text-gray-600 mb-6">Compare the primary Indigenous business programs available in Canada. Note that most programs are delivered regionally by AFIs rather than directly by the federal government — find your regional AFI at nacca.ca/member-afis first.</p>
                        <GrantComparisonTable grants={indigenousGrants} title="Canada Indigenous Entrepreneur Programs" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-10">

                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Building className="h-5 w-5 text-orange-600" />Canada&apos;s Indigenous Business Funding Ecosystem — Overview</CardTitle></CardHeader>
                                <CardContent className="text-gray-700 space-y-4">
                                    <p className="leading-relaxed">
                                        Canada's Indigenous business funding ecosystem is organized around a national network of <strong>Aboriginal
                                            Financial Institutions (AFIs)</strong> — 59 Indigenous-controlled financial institutions spread across every
                                        province and territory, administered nationally through NACCA (National Aboriginal Capital Corporations Association)
                                        but operated by Indigenous communities and organizations. The AFI network is the primary delivery channel for most
                                        federal Indigenous business funding programs: if you want to access the Aboriginal Entrepreneurship Program,
                                        an NACCA loan, or most Indigenous-specific business advice, you will work with your regional AFI rather than
                                        directly with Indigenous Services Canada or any other federal department.
                                    </p>
                                    <p className="leading-relaxed">
                                        The AFI model is deliberately designed to be culturally competent in ways that conventional banks are not.
                                        AFIs understand land-based revenue, community-based business structures, on-reserve applications, collective
                                        ownership models, and the particular challenges of businesses on or near reserves. They underwrite Indigenous
                                        business loans using criteria that recognize forms of collateral and business viability that conventional lenders
                                        typically can't assess — including traditional land use rights, band council support, and community economic
                                        development context.
                                    </p>
                                    <p className="leading-relaxed">
                                        Federal funding flows through three primary channels for Indigenous entrepreneurs: (1) <strong>AFI-delivered
                                            grants and loans</strong> (AEP, NACCA loans) for business establishment and growth; (2) <strong>Federal procurement
                                                set-asides</strong> (PSIB) providing direct government contract revenue to Indigenous businesses without any grant
                                        application; and (3) <strong>Mainstream innovation programs</strong> (BDC, IRAP, SR&ED, SDTC) which Indigenous
                                        businesses can and should access on an equal footing with all other Canadian businesses — these programs have
                                        no Indigenous-exclusion criteria.
                                    </p>
                                    <p className="leading-relaxed">
                                        Additionally, five provinces have <strong>Métis Capital Corporations</strong> providing Métis-specific business
                                        financing in BC, Alberta, Saskatchewan, Manitoba, and Ontario. Métis entrepreneurs who are registered members
                                        of provincial Métis nations have access to these specialized financing vehicles in addition to all other programs.
                                        The Métis financing ecosystem is separate from the AFI network — it is organized around provincial Métis governance
                                        structures rather than the federal NACCA framework.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Program by Nation Type */}
                            <Card className="border-2 border-orange-200 bg-orange-50">
                                <CardHeader><CardTitle className="text-xl text-orange-900">Programs by Indigenous Identity: First Nations, Métis, and Inuit</CardTitle></CardHeader>
                                <CardContent className="text-orange-900">
                                    <p className="text-sm mb-5 leading-relaxed">
                                        Indigenous programs in Canada are available across all three main groups — First Nations (Status and Non-Status),
                                        Métis, and Inuit — but program coverage, regional availability, and specific eligibility criteria differ.
                                        Here&apos;s a breakdown by identity group:
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            {
                                                group: "First Nations (Status & Non-Status)",
                                                badge: "Most AFI Coverage",
                                                color: "blue",
                                                programs: [
                                                    "AEP grants — fully available (Indigenous Services Canada delivery through AFIs)",
                                                    "NACCA AFI loans — available through 59 AFIs nationally, including on-reserve",
                                                    "PSIB procurement set-asides — available for 51%+ First Nations-owned businesses",
                                                    "FNBO (First Nations Bank of Canada) — banking and business loans",
                                                    "Band / First Nation Economic Development Funds — community-level capital (varies by nation)",
                                                    "Federal Business Development Programs on Reserve — special provisions for on-reserve businesses",
                                                ],
                                            },
                                            {
                                                group: "Métis Entrepreneurs",
                                                badge: "Province-Specific Programs",
                                                color: "purple",
                                                programs: [
                                                    "Métis Capital Corporations (BC, AB, SK, MB, ON) — business loans and equity financing",
                                                    "NACCA AFI loans — some AFIs serve Métis communities alongside First Nations",
                                                    "AEP grants — Métis entrepreneurs fully eligible",
                                                    "PSIB procurement set-asides — Métis-owned businesses (51%+) fully eligible",
                                                    "WES Indigenous Women stream — Métis women entrepreneurs fully eligible",
                                                    "Mainstream programs — BDC, IRAP, SR&ED all available on equal basis",
                                                ],
                                            },
                                            {
                                                group: "Inuit Entrepreneurs",
                                                badge: "Inuit Tapiriit Kanatami & Regional Programs",
                                                color: "teal",
                                                programs: [
                                                    "AEP grants — fully available to Inuit business owners",
                                                    "NACCA AFI network — Inuit-serving AFIs in Nunavut, NWT, Nunavik, Nunatsiavut",
                                                    "PSIB procurement — Inuit-owned businesses fully eligible",
                                                    "Nunavut Business Credit Corporation — territory-specific business financing",
                                                    "Inuit Tapiriit Kanatami economic development programs",
                                                    "Makivik Corporation (Nunavik) and Inuvialuit Regional Corporation programs",
                                                ],
                                            },
                                        ].map(({ group, badge, color, programs }) => (
                                            <div key={group} className={`bg-${color}-50 rounded-lg p-4 border border-${color}-200`}>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className={`font-bold text-${color}-900`}>{group}</div>
                                                    <Badge className={`bg-${color}-100 text-${color}-800 text-xs`}>{badge}</Badge>
                                                </div>
                                                <ul className="space-y-1">
                                                    {programs.map(p => (
                                                        <li key={p} className={`text-xs text-${color}-800 flex items-start gap-1.5`}>
                                                            <CheckCircle className={`h-3 w-3 text-${color}-600 mt-0.5 shrink-0`} />
                                                            {p}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Program Deep Dives */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Indigenous Business Programs — Detailed Breakdown</h2>
                                <p className="text-gray-600 mb-6">In-depth analysis of each program, how it works, what it funds, the application process, and what makes a strong application.</p>
                                <div className="space-y-6">

                                    <Card className="border-l-4 border-l-orange-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">1. Aboriginal Entrepreneurship Program (AEP)</CardTitle>
                                                <Badge className="bg-orange-100 text-orange-800 shrink-0 ml-2">Up to $99,999</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                The Aboriginal Entrepreneurship Program (AEP) is administered by Indigenous Services Canada and delivered
                                                through the national AFI network. It provides two types of support: non-repayable <strong>contribution
                                                    grants</strong> (typically $5K–$20K for business planning, training, mentorship costs, and startup expenses)
                                                and <strong>repayable business loans</strong> (up to $99,999) for Indigenous entrepreneurs starting or
                                                expanding a business in Canada. The repayable loan component is typically provided through your regional
                                                AFI with government backstop funding, allowing more flexible underwriting than conventional banks.
                                            </p>
                                            <p>
                                                AEP is designed to address the documented barriers to financing facing Indigenous entrepreneurs: lack of
                                                collateral on reserve land (which cannot be mortgaged under the Indian Act), limited credit history in
                                                the formal banking system, remote location, and cultural distance from conventional banking institutions.
                                                AFI loan officers are trained to assess Indigenous business viability using Indigenous-appropriate criteria
                                                and to provide ongoing mentorship and advisory support throughout the loan period.
                                            </p>
                                            <div className="grid sm:grid-cols-2 gap-4 mt-4">
                                                <div className="bg-orange-50 rounded-lg p-4">
                                                    <div className="font-semibold text-orange-900 mb-2 text-sm">What AEP Funds</div>
                                                    <ul className="text-xs text-orange-700 space-y-1">
                                                        <li>• Business planning and development</li>
                                                        <li>• Equipment and inventory purchase</li>
                                                        <li>• Working capital for business operations</li>
                                                        <li>• Small renovation or facility costs</li>
                                                        <li>• Marketing and market access</li>
                                                        <li>• Training and skills development</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg p-4">
                                                    <div className="font-semibold text-gray-900 mb-2 text-sm">How to Apply</div>
                                                    <ul className="text-xs text-gray-600 space-y-1">
                                                        <li>• Find your regional AFI at nacca.ca/member-afis</li>
                                                        <li>• Contact AFI directly (not ISC or federal agencies)</li>
                                                        <li>• Submit: business plan, financial statements, Indigenous identity documentation</li>
                                                        <li>• Decision in 2–8 weeks depending on AFI</li>
                                                        <li>• Ongoing business advisory from AFI post-approval</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-green-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">2. Federal Procurement Set-Asides (PSIB) — The $1B+ Opportunity</CardTitle>
                                                <Badge className="bg-green-100 text-green-800 shrink-0 ml-2">$1B+ annually in gov&apos;t contracts</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                The Procurement Strategy for Indigenous Business (PSIB) is one of the most underutilized and most valuable
                                                programs available to Indigenous-owned businesses in Canada. The federal government has committed to awarding
                                                5% of federal contracts — worth approximately $1B annually — to Indigenous businesses. Federal departments
                                                and agencies are required to set aside contracts for Indigenous businesses when the contract value exceeds
                                                $10,000 and an Indigenous supplier can fulfil the requirement.
                                            </p>
                                            <p>
                                                To be eligible for PSIB set-aside contracts, an Indigenous business must: (1) be at least 51% Indigenous
                                                owned and controlled, (2) register in the Indigenous Business Directory (IBD) at sac-isc.gc.ca, (3) have
                                                relevant capabilities to fulfill the contract, and (4) be registered for GST/HST. The Indigenous Business
                                                Directory registration is free, self-declared, and can be completed in a few hours. Without IBD registration,
                                                your business is invisible to federal procurement officers seeking to fulfill PSIB set-asides.
                                            </p>
                                            <p>
                                                PSIB set-asides span a wide range of industries: professional services (consulting, IT, legal), construction
                                                and maintenance, catering and event services, security services, environmental services, translation,
                                                transportation, and more. Indigenous businesses in any of these sectors should register on the IBD as a
                                                first priority — before applying for any grant — because PSIB revenue is immediate, consistent, and provides
                                                the business foundation that other programs (NACCA loans, BDC financing) look for when assessing business viability.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-purple-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">3. Métis Capital Corporations — Province-by-Province</CardTitle>
                                                <Badge className="bg-purple-100 text-purple-800 shrink-0 ml-2">$10K – $500K</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                Métis Capital Corporations are province-specific financial institutions created by provincial Métis
                                                governance organizations to provide Métis-specific business financing in addition to the NACCA AFI network.
                                                Each Métis Capital Corporation has its own board, programs, and priorities — but all provide business loans,
                                                equity financing, and advisory services specifically for Métis entrepreneurs registered with their provincial
                                                Métis organization.
                                            </p>
                                            <div className="space-y-3 mt-4">
                                                {[
                                                    { prov: "British Columbia", org: "Métis Nation British Columbia (MNBC) Capital Corporation", programs: "Business loans ($10K–$250K), equity financing, business advisory. mnbc.ca" },
                                                    { prov: "Alberta", org: "Métis Capital Corporation of Alberta", programs: "Business development loans ($10K–$350K), business planning support. Alberta Métis Nation. albertametis.com" },
                                                    { prov: "Saskatchewan", org: "Métis Nation of Saskatchewan Capital Corporation", programs: "Business loans ($10K–$300K), entrepreneurship training. mns.ca" },
                                                    { prov: "Manitoba", org: "Métis Economic Development Fund (MMF)", programs: "Business loans, equity participation ($10K–$500K), startup grants. mmf.mb.ca" },
                                                    { prov: "Ontario", org: "Métis Nation of Ontario Business Support", programs: "Business advisory, loan referrals, AEP delivery. metisnation.org" },
                                                ].map(({ prov, org, programs }) => (
                                                    <div key={prov} className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                                                        <div className="font-bold text-purple-900 mb-1 text-sm">{prov} — {org}</div>
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
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><FileText className="h-5 w-5 text-orange-600" />How to Access Indigenous Entrepreneur Funding — Step by Step</CardTitle></CardHeader>
                                <CardContent className="text-gray-700">
                                    <div className="space-y-4">
                                        {[
                                            { step: "1", title: "Register in the Indigenous Business Directory (IBD) — Do This First", desc: "Before applying for any grant or loan, register your business in the Indigenous Business Directory at sac-isc.gc.ca. IBD registration makes you visible to federal departments fulfilling PSIB set-aside procurement requirements — unlocking over $1B in annual government contract opportunities with no grant application required. Registration is free, self-declared (you verify your Indigenous ownership), and can be completed in a few hours. This is the highest-ROI first step for any Indigenous business with government service potential." },
                                            { step: "2", title: "Find and Contact Your Regional Aboriginal Financial Institution (AFI)", desc: "Your regional AFI is your most important strategic partner in the Indigenous business funding ecosystem. Find yours at nacca.ca/member-afis. Most AFIs serve a specific province, territory, or community — when you contact your AFI, you're speaking with Indigenous business advisors who understand your community context and can advise on AEP eligibility, loan structuring, business plan development, and connections to other regional funding programs. Many AFIs offer free business advisory services in addition to lending — use these services even if you're not yet ready to apply for a loan." },
                                            { step: "3", title: "If Métis — Contact Your Provincial Métis Nation and Capital Corporation", desc: "In addition to NACCA AFIs, Métis-registered entrepreneurs should contact their provincial Métis organization: MNBC (British Columbia), MNA (Alberta), MNS (Saskatchewan), MMF (Manitoba), or MNO (Ontario). Request information specifically on their Capital Corporation's current loan and equity programs. Métis financing can be stacked with NACCA AFI programs — some Métis entrepreneurs access both simultaneously to reach larger capital amounts that neither program covers alone." },
                                            { step: "4", title: "Prepare a Business Plan Before Any Application", desc: "Every AEP, NACCA, and Métis Capital program requires a business plan. A strong Indigenous business plan includes: executive summary, business description (including community context where relevant), market analysis, operational plan, management team biographies, financial projections (3 years minimum), and funding requirements with specific use of funds described. AFIs typically provide free business plan development assistance — take advantage of this before submitting any application. A business plan written with AFI guidance is more likely to match the format and criteria that your specific AFI uses for assessment." },
                                            { step: "5", title: "Apply to Mainstream Programs That You Also Fully Qualify For", desc: "Indigenous businesses fully qualify for all mainstream Canadian business programs and should apply to them alongside Indigenous-specific programs. BDC (Business Development Bank of Canada) provides business loans and advisory services with no Indigenous-exclusion criteria. IRAP funds Indigenous-owned tech SMEs. SR&ED applies to any Canadian business doing R&D. EDC provides export financing to Indigenous businesses selling internationally. Women entrepreneurs (Indigenous or otherwise) qualify for Women Entrepreneurship Strategy programs. Do not limit your applications to Indigenous-specific programs only — the mainstream programs provide access to larger, unrestricted capital." },
                                            { step: "6", title: "Build Your Credit History to Access Larger Financing Over Time", desc: "The AFI and Métis Capital loan programs are explicitly designed as a credit history builder — their culturally sensitive underwriting accepts applicants at whom conventional banks turn away, with the expectation that a successfully repaid AFI loan creates the credit history needed to eventually access larger BDC and commercial bank financing. Treat your first AFI loan as a strategic stepping stone: repay diligently, maintain the business advisory relationship with your AFI, and return 2–3 years later with an operating history for a larger loan or equity investment." },
                                        ].map((item) => (
                                            <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="h-8 w-8 rounded-full bg-orange-700 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                                                <div><div className="font-semibold text-gray-900 mb-1">{item.title}</div><div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div></div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Common Mistakes */}
                            <Card className="border-red-100 bg-red-50">
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-red-900"><AlertCircle className="h-5 w-5 text-red-600" />5 Mistakes Indigenous Entrepreneurs Make When Seeking Funding</CardTitle></CardHeader>
                                <CardContent className="text-red-900 space-y-4">
                                    {[
                                        { n: "1", m: "Not Registering in the Indigenous Business Directory Before Applying for Grants", d: "The Indigenous Business Directory (IBD) is the gateway to over $1B in annual federal procurement set-asides. Many Indigenous entrepreneurs spend months applying for grants while overlooking the immediate revenue opportunity that PSIB federal contracts represent for businesses with relevant capabilities. IBD registration costs nothing and can be completed in hours. Federal departments must check the IBD when procuring goods and services — businesses not registered are literally invisible to $1B+ in annual contract opportunities. Register first, before anything else." },
                                        { n: "2", m: "Going to a Commercial Bank First Instead of Their Regional AFI", d: "Commercial bank rejection is a deflating experience for many Indigenous entrepreneurs — and unnecessary. Commercial banks use underwriting criteria that systematically disadvantage on-reserve businesses (land can't be collateralized), entrepreneurs without conventional employment history, and businesses with community-embedded revenue models. Your regional AFI exists precisely to address this gap. AFIs have Indigenous-designed loan assessment processes, understand your community context, and have government-backed funding that allows more flexible terms. Always start with your AFI, not a bank." },
                                        { n: "3", m: "Assuming All Programs Require Status Card or Band Membership", d: "Many Indigenous entrepreneurs — especially Métis and Non-Status First Nations — incorrectly assume they don't qualify for Indigenous business programs because they don't have a Status Card. This is wrong for most programs: AEP is available to self-identified First Nations (Status and Non-Status), Métis, and Inuit entrepreneurs. NACCA AFI loans are available to self-identified Indigenous people. PSIB requires self-declaration. Métis Capital Corporations serve registered Métis members, but registration is through provincial Métis nations — not the federal Status Card system. Verify your eligibility with the specific program before assuming you don't qualify." },
                                        { n: "4", m: "Not Stacking Indigenous Programs with Mainstream Business Programs", d: "AEP, NACCA loans, and Métis Capital programs all have caps ($99,999 for AEP, $1M for some NACCA AFIs) that may be insufficient for growing businesses. The solution is to stack Indigenous-specific programs with mainstream programs: use an AFI loan for initial capital → use BDC for growth financing → use IRAP for technology development → use SR&ED for R&D cost recovery. Many Indigenous tech founders don't know they can access IRAP, SR&ED, and SDTC on the same basis as any other Canadian SME. Use every program you qualify for — Indigenous and mainstream." },
                                        { n: "5", m: "Missing the Women Entrepreneurship Strategy Programs for Indigenous Women", d: "Indigenous women entrepreneurs face compounding barriers — the challenges of Indigenous entrepreneurship plus the documented challenges facing women business owners. The federal Women Entrepreneurship Strategy (WES) has targeted funding streams specifically for Indigenous women entrepreneurs, delivered through Women's Enterprise Centres in each province and through Indigenous AFIs with WES partnerships. Many Indigenous women entrepreneurs apply only to Indigenous-specific programs and overlook WES — which provides an additional layer of grants, mentorship, and ecosystem support specifically designed for their situation." },
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
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-amber-800"><Lightbulb className="h-5 w-5 text-amber-600" />Expert Strategy: Building an Indigenous Business Funding Stack</CardTitle></CardHeader>
                                <CardContent className="text-amber-900 space-y-4">
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 The Indigenous Tech Startup Funding Stack</div>
                                        <p className="text-sm leading-relaxed">An Indigenous-owned tech startup can access: AEP grant ($20K for business planning/setup) + NACCA AFI loan ($150K working capital) + NRC IRAP ($200K–$500K for R&D wages) + SR&ED (35% refund on qualifying R&D) + WES if women-owned (mentorship and ecosystem support). Total non-dilutive startup capital: $370K+ before needing external equity — providing a 12–18 month development runway. This is a more capital-efficient start than most non-Indigenous tech startups who don&apos;t have access to Indigenous-specific programs as an additional layer.</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 PSIB Contracts + AFI Loan + BDC: The Indigenous Business Growth Pathway</div>
                                        <p className="text-sm leading-relaxed">The most reliable Indigenous business growth sequence: Register on IBD at startup → Win first federal PSIB contract (revenue) → Use contract revenue as evidence of business viability for AFI loan → Use AFI loan to hire staff and scale capacity → Win larger PSIB contracts with improved delivery capacity → Approach BDC with operating history for growth financing → Scale nationally. This sequence starts with revenue generation (not grant searching), which creates the business history that unlocks all subsequent financing. Many Indigenous businesses that struggle with grant applications thrive on this contract-first pathway.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* FAQ */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">FAQ: Indigenous Entrepreneur Grants Canada 2026</h2>
                                <p className="text-gray-600 mb-6">Most common questions from First Nations, Métis, and Inuit entrepreneurs navigating Canada&apos;s Indigenous business funding ecosystem.</p>
                                <div className="space-y-4">
                                    {[
                                        { q: "Do I need to live on-reserve to access Indigenous business funding in Canada?", a: "No — Indigenous business funding in Canada is available to First Nations, Métis, and Inuit entrepreneurs regardless of where they live in Canada. AEP, NACCA AFI loans, Métis Capital programs, PSIB, and WES Indigenous streams are all available to Indigenous entrepreneurs living on-reserve, living off-reserve in urban settings, and living in rural non-reserve communities. The NFN (Native Friendship Centres) in urban areas often have specific programs for urban Indigenous entrepreneurs. Some programs have geographic restrictions (e.g., Nunavut-specific programs for Inuit entrepreneurs in Nunavut), but the core federal programs are available nationally." },
                                        { q: "What documentation is needed to prove Indigenous identity for business programs?", a: "Documentation requirements vary by program. AEP and most AFI programs accept self-identification — you declare your Indigenous identity in the application, sometimes with a supporting document. This may include: Status Card (for Status First Nations), Métis Nation provincial registry card, a letter from your band council or First Nation, Inuit land claims organization membership documentation, or a statutory declaration of Indigenous identity. Programs cannot require DNA testing or blood quantum documentation — this is prohibited under Canadian human rights law and Indigenous self-determination principles. If a program asks for documentation you don't have, contact the AFI or program officer to discuss acceptable alternatives." },
                                        { q: "Can a non-Indigenous business partner with an Indigenous entrepreneur to access PSIB contracts?", a: "Yes — federal procurement allows joint ventures and partnerships for PSIB set-asides, but the Indigenous ownership requirement must be met: the business (or the joint venture) must be at least 51% Indigenous-owned and controlled. Many businesses form genuine business partnerships where an Indigenous entrepreneur holds 51%+ ownership and non-Indigenous partners contribute complementary business skills, capital, or operational capacity. These structures are legitimate when the Indigenous owner exercises genuine control. However, 'fronting' arrangements — where Indigenous identity is used on paper but the business is actually controlled by non-Indigenous partners — violate PSIB rules and constitute procurement fraud. Genuine partnership that builds Indigenous business ownership and capacity is the intended model." },
                                        { q: "What is the difference between a NACCA AFI loan and an AEP grant?", a: "AEP (Aboriginal Entrepreneurship Program) has two components: contribution grants (non-repayable, typically $5K–$20K for business development costs like planning, training, and market access) and loan components (repayable, up to $99,999). NACCA AFI loans are the lending programs of the 59 Aboriginal Financial Institutions — they can provide larger amounts (up to $1M at some AFIs) and are structured as conventional business loans (repayable with interest, though at below-market terms with flexible collateral requirements). In practice, an Indigenous entrepreneur often accesses AEP grants first for startup costs, then an NACCA AFI loan for working capital and equipment. Both are administered by regional AFIs — contact your AFI to understand which programs you qualify for simultaneously." },
                                        { q: "Are there Indigenous grants specifically for technology or digital businesses?", a: "Yes — Indigenous tech founders can access all IRAP, SR&ED, and SDTC programs on an equal basis with other Canadian tech companies, plus Indigenous-specific programs. Additionally: Women in Tech Indigenous programs (through Digital Supercluster, NRC, and WES) provide targeted support for Indigenous women in technology. The Indigenous Innovation Initiative provides support for Indigenous entrepreneurs building technology solutions for Indigenous communities. Some regional AFIs have digital economy-specific programs or tech entrepreneur mentorship networks. The First People's Cultural Council (BC) and similar provincial organizations have digital language and cultural technology programs for Indigenous entrepreneurs working in cultural technology. The optimal approach is IRAP + SR&ED as a baseline, stacked with Indigenous-specific programs and AFI loans." },
                                        { q: "How do I find an Aboriginal Financial Institution (AFI) in my region?", a: "The complete list of all 59 NACCA member AFIs is available at nacca.ca/member-afis. Search by province or territory to find the AFIs serving your region. Most provinces have multiple AFIs serving different communities, nations, or geographic areas — when in doubt, contact multiple AFIs in your province to determine which one serves your community or geographic area. In urban centres without a specific community-linked AFI, contact the Native Friendship Centre in your city — they typically maintain connections to relevant AFIs and Indigenous business support organizations. Alternatively, Indigenous Services Canada's regional offices (sac-isc.gc.ca) can refer you to appropriate regional AFIs." },
                                        { q: "Can a Métis entrepreneur in a province without a Métis Capital Corporation still access Indigenous business funding?", a: "Yes — Métis entrepreneurs in provinces without a dedicated Métis Capital Corporation (primarily Atlantic provinces, Quebec, and territories) can still access: AEP grants and loans through NACCA AFIs in their region (some AFIs serve all Indigenous groups including Métis), PSIB federal procurement set-asides, WES Indigenous women's streams, BDC Indigenous programs, and all mainstream Canadian business programs. Additionally, the Métis Nation governs in BC, Alberta, Saskatchewan, Manitoba, and Ontario — Métis entrepreneurs in other provinces may have connections to national Métis organizations that can provide referrals. In Quebec, the Communauté métisse du Domaine-du-Roy et de la Région-de-l'Abitibi-Témiscamingue and other Métis collectives have some economic development programming." },
                                        { q: "Is there Indigenous funding available for agricultural businesses on reserve?", a: "Yes — Indigenous entrepreneurs running agricultural businesses on or near reserves have access to a combination of Indigenous-specific and mainstream agriculture funding. AAFC's Indigenous agriculture programs include dedicated streams within CAP for First Nations agricultural operations. Band-based and First Nation Economic Development Corporations often have agricultural support programs specific to their nation and land base. NACCA AFIs have funded agriculture businesses on reserve — including crop production, livestock, market gardens, and value-added food processing. The Agricultural Clean Technology Program is available to Indigenous farmers and agricultural businesses. Farm Credit Canada has Indigenous-specific business service representatives who understand on-reserve agricultural lending and can navigate the Indian Act land provisions that complicate conventional agricultural financing." },
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
                            <Card className="bg-orange-800 text-white">
                                <CardContent className="pt-6">
                                    <Star className="h-8 w-8 text-yellow-300 mb-3" />
                                    <h3 className="font-bold text-lg mb-2">Free Indigenous Grant Matching</h3>
                                    <p className="text-orange-100 text-sm mb-4">Our specialists identify the full stack of AFI, AEP, PSIB, Métis Capital, and mainstream programs available to your specific Indigenous business — free consultation.</p>
                                    <Link href="/contact"><Button className="w-full bg-white text-orange-800 hover:bg-orange-50">Get Free Matching <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
                                </CardContent>
                            </Card>
                            <NewsletterSignup variant="sidebar" />
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Key Resource Contacts</CardTitle></CardHeader>
                                <CardContent className="text-sm space-y-3">
                                    <div><div className="font-semibold">NACCA AFI Locator</div><div className="text-gray-500">nacca.ca/member-afis</div></div>
                                    <div><div className="font-semibold">Indigenous Business Directory (IBD)</div><div className="text-gray-500">sac-isc.gc.ca (PSIB registration)</div></div>
                                    <div><div className="font-semibold">Women Entrepreneurship Strategy</div><div className="text-gray-500">ised-isde.canada.ca/wes</div></div>
                                    <div><div className="font-semibold">Métis Nation Canada</div><div className="text-gray-500">metisnation.ca</div></div>
                                    <div><div className="font-semibold">BDC Indigenous Programs</div><div className="text-gray-500">bdc.ca/indigenous</div></div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Related Resources</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <Link href="/canada/women-business-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Canada Women Business Grants</Link>
                                        <Link href="/canada/small-business-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Canada Small Business Grants</Link>
                                        <Link href="/canada/government-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Federal Canadian Grants</Link>
                                        <Link href="/blog/irap-industrial-research-assistance-program" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> IRAP Complete Guide</Link>
                                        <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder Tool</Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mb-8">
                        <NewsletterSignup title="Indigenous Business Funding Updates" description="Track AEP program updates, new AFI loan programs, PSIB set-aside category changes, and Métis Capital program launches — delivered to your inbox." />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
