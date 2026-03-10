import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, CheckCircle, ArrowRight, Lightbulb, FileText, Star, Users } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
    title: "Indigenous Entrepreneur Grants Canada 2026 | NACCA, INABC & Federal Funding Guide",
    description:
        "Complete guide to Indigenous entrepreneur grants and business funding in Canada 2026. NACCA Indigenous Growth Fund, Aboriginal Entrepreneurship Program ($99.9K), INABC microloans, Métis-specific programs, and federal procurement set-asides for Indigenous businesses.",
    keywords:
        "Indigenous entrepreneur grants Canada 2026, Aboriginal business grants Canada, NACCA grants, Aboriginal Entrepreneurship Program, Indigenous business funding Canada, First Nations business grants, Métis entrepreneur funding, Inuit business grants Canada",
    openGraph: {
        title: "Indigenous Entrepreneur Grants Canada 2026 | NACCA, Federal & Provincial Funding",
        description: "Complete guide to Indigenous business grants in Canada — NACCA, Aboriginal Entrepreneurship Program, microloans, and procurement set-asides.",
        url: "https://www.fsidigital.ca/canada/indigenous-entrepreneur-grants",
    },
}

const indigenousGrants: Grant[] = [
    {
        id: "indig-aep",
        name: "Aboriginal Entrepreneurship Program (AEP) — Business Capital",
        fundingMin: 5000,
        fundingMax: 99999,
        eligibility: ["Status and Non-Status First Nations", "Métis entrepreneurs", "Inuit business owners", "50%+ Indigenous ownership"],
        deadline: "Rolling — apply through nearest CFDC or NADF",
        applicationLink: "https://www.sac-isc.gc.ca/eng/1375201178602/1610797705181",
        description: "Non-repayable grants and repayable business loans up to $99,999 for Indigenous entrepreneurs establishing or expanding a business. Delivered through Indigenous financial institutions.",
        country: "Canada",
        region: "Federal",
        category: "Business Capital",
        agency: "Indigenous Services Canada (ISC)",
        status: "Active",
        tags: ["Non-Repayable Grant", "Startup Capital", "First Nations", "Métis", "Inuit"],
        requirements: ["At least 50% Indigenous ownership", "Canadian citizen or PR", "Viable business plan", "Demonstrated Indigenous identity"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "indig-nacca",
        name: "NACCA Indigenous Growth Fund",
        fundingMin: 50000,
        fundingMax: 500000,
        eligibility: ["Indigenous entrepreneurs and businesses across Canada", "Businesses at growth stage", "Companies seeking patient capital"],
        deadline: "Rolling — contact nearest Aboriginal Financial Institution (AFI)",
        applicationLink: "https://nacca.ca/",
        description: "NACCA (National Aboriginal Capital Corporations Association) provides flexible business loans through 59 Aboriginal Financial Institutions across Canada — with lower barriers and culturally responsive service than conventional banks.",
        country: "Canada",
        region: "Federal",
        category: "Business Lending",
        agency: "National Aboriginal Capital Corporations Association (NACCA)",
        status: "Active",
        tags: ["Growth Capital", "Patient Lending", "Pan-Canadian"],
        requirements: ["Indigenous ownership (50%+)", "Business plan", "Apply through local AFI", "Community economic development focus preferred"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "indig-inabc",
        name: "Indigenous Loan Guarantee Program",
        fundingMin: 25000,
        fundingMax: 5000000,
        eligibility: ["Indigenous-owned businesses in British Columbia", "Community-owned enterprises", "Resource sector Indigenous companies"],
        deadline: "Rolling — BC government program",
        applicationLink: "https://www2.gov.bc.ca/gov/content/employment-business/business/bc-indigenous-business",
        description: "BC's Indigenous Loan Guarantee Program and business supports for Indigenous entrepreneurs in British Columbia, providing loan guarantees and advisory services.",
        country: "Canada",
        region: "British Columbia",
        category: "Loan Guarantee",
        agency: "BC Ministry of Indigenous Relations",
        status: "Active",
        tags: ["Loan Guarantee", "BC", "Resource Sector"],
        requirements: ["BC-based Indigenous business", "50%+ Indigenous ownership", "Viable business plan", "BC residency"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "indig-procurement",
        name: "Indigenous Procurement Set-Asides (PSPC)",
        fundingMin: 10000,
        fundingMax: 50000000,
        eligibility: ["CID-certified Indigenous businesses", "Status/Non-Status First Nations", "Métis and Inuit businesses"],
        deadline: "Ongoing — government procurement cycles",
        applicationLink: "https://www.tpsgc-pwgsc.gc.ca/app-acq/pni-ib/index-eng.html",
        description: "Federal government procurement set-asides where contracts of nearly all sizes are reserved for Indigenous businesses — often the single largest funding opportunity for established companies.",
        country: "Canada",
        region: "Federal",
        category: "Procurement",
        agency: "Public Services and Procurement Canada",
        status: "Active",
        tags: ["Government Contracts", "Procurement", "Set-Asides"],
        requirements: ["CID (Canadian Indigenous Directory) registration", "51%+ Indigenous ownership", "Business in good standing", "Relevant sector capability"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "indig-metis",
        name: "Métis Capital Corporation Business Programs",
        fundingMin: 5000,
        fundingMax: 150000,
        eligibility: ["Registered Métis citizens", "Métis-owned businesses in western Canada", "Alberta, BC, Saskatchewan, Manitoba"],
        deadline: "Rolling — regional Métis Capital Corporations",
        applicationLink: "https://www.metiscc.ca/",
        description: "Métis-specific business loans, grants, and entrepreneur development programs delivered through Métis Capital Corporations in western Canada.",
        country: "Canada",
        region: "Western Canada",
        category: "Métis Business",
        agency: "Métis Capital Corporations",
        status: "Active",
        tags: ["Métis", "Business Loans", "Western Canada"],
        requirements: ["Registered Métis citizenship", "Western Canada operations", "Business plan", "Apply through regional Métis Capital Corp"],
        lastUpdated: "2026-01-01"
    },
]

export default function IndigenousEntrepreneurGrantsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
            <Header />

            <section className="bg-gradient-to-br from-orange-800 via-amber-900 to-yellow-900 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Users className="h-6 w-6 text-orange-300" />
                            <Badge className="bg-orange-500/30 text-orange-100 border-orange-400">Indigenous Business Funding Canada 2026</Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Indigenous Entrepreneur Grants Canada 2026
                        </h1>
                        <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Indigenous entrepreneurs in Canada have access to a unique ecosystem of dedicated grants, culturally
                            responsive financing, and government procurement set-asides — from the Aboriginal Entrepreneurship Program
                            ($99.9K non-repayable) to NACCA's 59 Aboriginal Financial Institutions and federal procurement contracts
                            reserved exclusively for Indigenous-owned businesses.
                        </p>
                        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                            <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">$99.9K</div><div className="text-orange-200 text-sm mt-1">Max AEP non-repayable grant</div></div>
                            <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">59</div><div className="text-orange-200 text-sm mt-1">Aboriginal Financial Institutions</div></div>
                            <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">$50M+</div><div className="text-orange-200 text-sm mt-1">Federal procurement set-asides</div></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-6 bg-emerald-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto space-y-4">
                        <ShortAnswerBox content="Yes — Indigenous entrepreneurs in Canada can access the Aboriginal Entrepreneurship Program (up to $99,999 non-repayable), NACCA Growth Fund financing through 59 Aboriginal Financial Institutions, Métis Capital Corporation programs, federal procurement set-asides (contracts reserved for Indigenous businesses), and provincial Indigenous business programs in BC, Alberta, Ontario, and Quebec. Indigenous-owned businesses with 51%+ Indigenous ownership have the broadest access." />
                        <EEATBadge authorName="Ashwani K." authorImage="/ash-author-1.jpg" date="2026-03-01" />
                        <EligibleCheck />
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    <div className="flex flex-wrap gap-2 mb-10">
                        {["AEP Grant", "NACCA Financing", "Métis Programs", "Procurement", "How to Apply", "FAQ"].map((item) => (
                            <Badge key={item} variant="outline" className="cursor-pointer hover:bg-orange-50 px-3 py-1.5 text-sm">{item}</Badge>
                        ))}
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Indigenous Business Grants & Programs Canada 2026</h2>
                        <GrantComparisonTable grants={indigenousGrants} title="Indigenous Entrepreneur Programs Comparison" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-10">

                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Users className="h-5 w-5 text-orange-600" />The Indigenous Business Funding Ecosystem in Canada</CardTitle></CardHeader>
                                <CardContent className="text-gray-700 prose max-w-none">
                                    <p className="leading-relaxed mb-4">
                                        Canada's Indigenous business funding ecosystem is built on two parallel tracks: <strong>dedicated Indigenous-specific programs</strong>
                                        (AEP, NACCA AFIs, Métis Capital Corporations) and <strong>mainstream programs with enhanced Indigenous access</strong>
                                        (federal procurement set-asides, Indigenous-priority streams in AAFC, BDC, EDC programs).
                                    </p>
                                    <p className="leading-relaxed mb-4">
                                        The <strong>Aboriginal Financial Institutions (AFIs)</strong> network — 59 organizations across Canada, supported by NACCA —
                                        is the most important starting point for any Indigenous entrepreneur. AFIs provide loans, business advisory services,
                                        financial counselling, and grant navigation support with deep cultural understanding. Many Indigenous entrepreneurs
                                        access significantly more capital through AFIs than through mainstream banks, because AFIs use alternative credit models
                                        that recognize traditional economic participation, community guarantees, and land-based revenue.
                                    </p>
                                    <p className="leading-relaxed">
                                        For established Indigenous businesses, <strong>federal procurement set-asides represent the largest single funding
                                            opportunity</strong>. The federal government has committed to directing 5% of all federal contracts to Indigenous
                                        businesses — on a $40B+ annual procurement budget, that's $2B+ annually in contracts available exclusively to
                                        CID-registered Indigenous businesses.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Program Deep Dives */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Indigenous Funding Programs Explained</h2>
                                <div className="space-y-6">

                                    <Card className="border-l-4 border-l-orange-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">1. Aboriginal Entrepreneurship Program (AEP)</CardTitle>
                                                <Badge className="bg-orange-100 text-orange-800 shrink-0 ml-2">Up to $99,999</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>
                                                The AEP Business Capital component provides non-repayable contributions (true grants) up to $99,999
                                                to Indigenous entrepreneurs starting or expanding a business. This is the most accessible direct
                                                grant program in Canada specifically for Indigenous business owners.
                                            </p>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="bg-orange-50 rounded-lg p-3 text-sm">
                                                    <div className="font-semibold text-orange-900 mb-1">Who Qualifies</div>
                                                    <div className="text-orange-700">Status and Non-Status First Nations, Métis, and Inuit entrepreneurs in Canada with 50%+ Indigenous ownership in the business</div>
                                                </div>
                                                <div className="bg-green-50 rounded-lg p-3 text-sm">
                                                    <div className="font-semibold text-green-900 mb-1">How to Access</div>
                                                    <div className="text-green-700">Apply through your nearest Indigenous Financial Institution (AFI), Community Futures Development Corporation (CFDC), or Native Development Finance Corporation (NADF)</div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-amber-700 bg-amber-50 rounded-lg p-3">
                                                <strong>💡 Key Insight:</strong> AEP $99,999 grants are delivered through local AFIs — the process is more accessible and faster than federal direct applications. Find your nearest AFI at nacca.ca.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-blue-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">2. NACCA & Aboriginal Financial Institutions</CardTitle>
                                                <Badge className="bg-blue-100 text-blue-800 shrink-0 ml-2">$50K–$500K+</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>
                                                NACCA's network of 59 AFIs across Canada provides business loans with flexible underwriting
                                                criteria designed for Indigenous businesses. AFIs consider community relationships,
                                                traditional land-based revenue, and non-traditional collateral that conventional banks reject.
                                            </p>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" /><span>Business loans $50K–$500K at competitive rates</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" /><span>Free business planning and financial literacy support</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" /><span>Alternative credit assessment — community guarantees accepted</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" /><span>Grant navigation and stacking support included</span></li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-purple-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">3. Federal Procurement Set-Asides</CardTitle>
                                                <Badge className="bg-purple-100 text-purple-800 shrink-0 ml-2">$10K – $50M+</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>
                                                The federal government's Indigenous procurement commitment (5% of all federal contracts reserved for
                                                Indigenous businesses) is one of the most valuable — and underutilized — pathways available to
                                                established Indigenous companies.
                                            </p>
                                            <div className="bg-purple-50 rounded-lg p-4 mt-2">
                                                <div className="font-semibold text-purple-900 mb-2 text-sm">To Access Set-Asides, You Need:</div>
                                                <ul className="space-y-1 text-sm text-purple-800">
                                                    <li>1. Register in the Canadian Indigenous Directory (CID) at buyandsell.gc.ca</li>
                                                    <li>2. Verify 51%+ Indigenous ownership and control</li>
                                                    <li>3. Monitor buyandsell.gc.ca for Indigenous-set-aside tenders</li>
                                                    <li>4. Review DND, PSPC, and CRA tender volumes (largest set-aside buyers)</li>
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Card>

                                </div>
                            </div>

                            {/* Nation-Specific Programs */}
                            <Card className="bg-orange-50 border-orange-200">
                                <CardHeader><CardTitle className="text-xl text-orange-900">Programs by Indigenous Identity</CardTitle></CardHeader>
                                <CardContent className="text-orange-900">
                                    <div className="grid sm:grid-cols-3 gap-4 text-sm">
                                        <div className="bg-white rounded-lg p-4 border border-orange-200">
                                            <div className="font-bold text-orange-800 mb-2">First Nations</div>
                                            <ul className="space-y-1 text-xs text-gray-700">
                                                <li>• AEP Business Capital ($99.9K)</li>
                                                <li>• ISC on-reserve business programs</li>
                                                <li>• Band-operated enterprise programs</li>
                                                <li>• AFI network financing</li>
                                                <li>• First Nations Land Management Act programs</li>
                                            </ul>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 border border-orange-200">
                                            <div className="font-bold text-orange-800 mb-2">Métis</div>
                                            <ul className="space-y-1 text-xs text-gray-700">
                                                <li>• Métis Capital Corporations (western)</li>
                                                <li>• Métis Nation business programs</li>
                                                <li>• AEP eligibility (Métis-verified)</li>
                                                <li>• Ontario Métis Business Registry</li>
                                                <li>• NACCA AFI network</li>
                                            </ul>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 border border-orange-200">
                                            <div className="font-bold text-orange-800 mb-2">Inuit</div>
                                            <ul className="space-y-1 text-xs text-gray-700">
                                                <li>• NAN / Nunavut Business Credit Corp</li>
                                                <li>• Makivik Corporation programs (QuébecNord)</li>
                                                <li>• AEP Business Capital (Inuit-eligible)</li>
                                                <li>• ITK economic development programs</li>
                                                <li>• Nunavut Development Corporation</li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* How to Apply */}
                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><FileText className="h-5 w-5 text-orange-600" />How to Access Indigenous Business Funding</CardTitle></CardHeader>
                                <CardContent className="text-gray-700">
                                    <div className="space-y-4">
                                        {[
                                            { step: "1", title: "Register Your Indigenous Business Identity", desc: "Ensure your business is registered as Indigenous-owned: register in the Canadian Indigenous Directory (CID) at buyandsell.gc.ca for federal programs, and verify your provincial/national Indigenous organization membership. This is the foundation for nearly all Indigenous-specific programs." },
                                            { step: "2", title: "Contact Your Nearest Aboriginal Financial Institution (AFI)", desc: "The AFI network (59 organizations, find yours at nacca.ca) is your first and most important stop. AFI advisors assess your full program eligibility, help you prepare your business plan, and often have knowledge of local provincial programs not well-publicized nationally." },
                                            { step: "3", title: "Apply for AEP Through Your AFI or CFDC", desc: "AEP Business Capital grants ($99.9K) are applied for through your nearest Indigenous Financial Institution or Community Futures Development Corporation — not directly through the federal government. The local intermediary reviews your business plan and forwards qualified applications." },
                                            { step: "4", title: "Register for Federal Procurement Set-Asides", desc: "Complete CID registration at buyandsell.gc.ca and monitor for Indigenous-set-aside tender opportunities. Set Google Alerts for 'Indigenous set-aside' or use the CanadaBuys notification system for relevant NAICS codes matching your business sector." },
                                            { step: "5", title: "Stack Indigenous + Mainstream Programs", desc: "AEP, NACCA loans, and procurement revenue don't preclude access to mainstream programs (IRAP, SR&ED, BDC). Indigenous entrepreneurs can access both streams simultaneously — many successfully combine AEP ($99.9K grant) + IRAP ($200K in R&D wages) + SR&ED (35% R&D credit) for a complete non-dilutive funding stack." },
                                        ].map((item) => (
                                            <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="h-8 w-8 rounded-full bg-orange-700 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                                                <div><div className="font-semibold text-gray-900 mb-1">{item.title}</div><div className="text-sm text-gray-600">{item.desc}</div></div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Expert Tips */}
                            <Card className="border-amber-200 bg-amber-50">
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-amber-800"><Lightbulb className="h-5 w-5 text-amber-600" />Expert Strategy: Indigenous Business Funding</CardTitle></CardHeader>
                                <CardContent className="text-amber-900 space-y-4">
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 Federal Procurement Is the Biggest Opportunity Most Miss</div>
                                        <p className="text-sm">The 5% Indigenous procurement policy means $2B+ annual contract value is reserved for CID-registered businesses. Many Indigenous entrepreneurs focus exclusively on grants and overlook this far larger revenue stream. A single federal contract can be worth $500K–$5M. Register in CID now, even before your first contract bid.</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 Use AFIs Even if They Can&apos;t Fund You Fully</div>
                                        <p className="text-sm">Aboriginal Financial Institutions have deep relationships with local, provincial, and federal programs. Even if your business needs $2M and the AFI can only lend $200K, they can often arrange syndicated financing with BDC, EDC, or provincial development corporations. AFI advisors function as holistic funding navigators, not just lenders.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* FAQ */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ: Indigenous Entrepreneur Grants Canada</h2>
                                <div className="space-y-4">
                                    {[
                                        { q: "Do I need to be status First Nations to access Indigenous business grants?", a: "No — most Indigenous business programs are available to Status and Non-Status First Nations, Métis, and Inuit Canadians. The key typically is demonstrating Indigenous identity and 50–51% Indigenous ownership of the business. Non-status First Nations and Métis entrepreneurs are eligible for AEP, NACCA AFI financing, and the federal CID procurement registry. Some programs (like Métis Capital Corporations) are specifically for Métis citizens registered with their provincial Métis nation." },
                                        { q: "Can an Indigenous-owned business access mainstream programs like IRAP or SR&ED simultaneously?", a: "Yes — absolutely. Indigenous-specific programs (AEP, NACCA, Métis programs) and mainstream federal programs (IRAP, SR&ED, BDC) are entirely compatible. Many Indigenous entrepreneurs successfully combine AEP start-up capital + IRAP R&D funding + SR&ED tax credits. The only restriction is that you cannot claim the same expenses in two different grants — but you can have multiple programs funding different expense categories of the same project." },
                                        { q: "How does the federal Indigenous procurement commitment work in practice?", a: "Under the Mandatory Procurement Strategy for Indigenous Business (PSIB), all federal contracts valued over $10K in 16 designated NAICS sectors must be set aside for Indigenous businesses when 'there is reason to believe' an Indigenous firm can deliver. Outside those 16 sectors, all federal departments have individual targets to direct 5% of their spending to Indigenous suppliers. Register in the CID and contact the Indigenous Procurement team at PSPC to understand which contracts in your sector are set aside." },
                                        { q: "Are there Indigenous grants specific to technology startups?", a: "Yes — several: NACCA's Inclusion through Innovation Fund specifically targets Indigenous tech startups; ISC has the Digital Connectivity program for Indigenous tech companies serving remote communities; and several provincial tech hubs (Invest Alberta's Indigenous Tech Fund, Ontario's Indigenous Business Precinct programs) target Indigenous tech entrepreneurs. Indigenous-owned tech companies can also access IRAP, SR&ED, and the federal Superclusters program with Indigenous priority consideration." },
                                        { q: "What is the Indigenous entrepreneurs' biggest mistake when applying for grants?", a: "The single most common mistake is applying to federal programs directly without engaging the AFI network first. The AFI relationship unlocks: (1) accurate eligibility assessment before wasting time on unsuitable programs, (2) free business plan development support that dramatically improves application quality, (3) knowledge of local grants and programs not advertised nationally, and (4) warm referrals to provincial and federal program officers who take AFI-endorsed applications more seriously. Always start with your AFI." },
                                    ].map((item, i) => (
                                        <Card key={i}><CardContent className="pt-4">
                                            <div className="font-semibold text-gray-900 mb-2">{item.q}</div>
                                            <div className="text-gray-600 text-sm leading-relaxed">{item.a}</div>
                                        </CardContent></Card>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <Card className="bg-orange-800 text-white">
                                <CardContent className="pt-6">
                                    <Star className="h-8 w-8 text-yellow-300 mb-3" />
                                    <h3 className="font-bold text-lg mb-2">Free Indigenous Grant Matching</h3>
                                    <p className="text-orange-100 text-sm mb-4">Our specialists identify the right combination of Indigenous-specific and mainstream programs for your business — free consultation.</p>
                                    <Link href="/contact"><Button className="w-full bg-white text-orange-800 hover:bg-orange-50">Get Free Matching <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
                                </CardContent>
                            </Card>
                            <NewsletterSignup variant="sidebar" />
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Key Resources</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <Link href="/canada/government-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Federal Canadian Grants</Link>
                                        <Link href="/canada/small-business-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Canada Small Business Grants</Link>
                                        <Link href="/canada/agriculture-startup-funding" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Agriculture Startup Funding</Link>
                                        <Link href="/blog/irap-nrc-canada-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> IRAP Complete Guide</Link>
                                        <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder</Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mb-8">
                        <NewsletterSignup title="Get Indigenous Business Grant Updates" description="Track AEP intakes, federal procurement opportunities, NACCA program updates, and provincial Indigenous business grant cycles." />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
