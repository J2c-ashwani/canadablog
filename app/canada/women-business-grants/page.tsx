import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users2, CheckCircle, ArrowRight, Building, Lightbulb, FileText, AlertCircle, Star } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
  title: "Canada Women Business Grants 2026 | WES, BDC Women, EDC & Provincial Programs",
  description: "Complete guide to Canada women business grants 2026. Women Entrepreneurship Strategy (WES) grants, BDC Women in Technology, EDC Women Exporters, Cartier Women's Initiative, and provincial programs for women entrepreneurs in BC, Ontario, Alberta, and Quebec.",
  keywords: "Canada women business grants 2026, Women Entrepreneurship Strategy Canada, WES grants, BDC women entrepreneurs, EDC women exporters, women owned business grants Canada, women entrepreneur funding Canada, women in tech grants Canada, provincial women business grants",
  alternates: { canonical: "https://www.fsidigital.ca/canada/women-business-grants" },
  openGraph: { title: "Canada Women Business Grants 2026 | WES, BDC, EDC & Provincial Guide", description: "Discover Canadian women business grants — WES funding, BDC Women programs, EDC trade support, and provincial women entrepreneur programs for 2026.", url: "https://www.fsidigital.ca/canada/women-business-grants" },
}

const womenGrants: Grant[] = [
  { id: "ca-wes-fund", name: "Women Entrepreneurship Fund (WES Fund)", fundingMin: 10000, fundingMax: 100000, eligibility: ["Majority women-owned and led Canadian businesses (51%+)", "Companies with 1–250 employees", "Growth-stage businesses with revenue or MVPP"], deadline: "Through WES Ecosystem partners — rolling regional intakes", applicationLink: "https://ised-isde.canada.ca/site/women-entrepreneurship-strategy/en/women-entrepreneurship-fund", description: "Non-repayable grants of $10K–$100K for Canadian women entrepreneurs looking to scale their businesses, access new markets, hire staff, or invest in productivity. Delivered through regional WES Ecosystem partners.", country: "Canada", region: "Federal", category: "Women Business Grant", agency: "ISED Canada — Women Entrepreneurship Strategy", status: "Active", tags: ["Women Business", "Scale-up", "Non-repayable", "WES"], requirements: ["51%+ women ownership and leadership", "1–250 employees", "Business plan and growth strategy", "Through regional WES partner"], lastUpdated: "2026-01-01" },
  { id: "ca-bdc-women", name: "BDC Women in Technology Venture Fund", fundingMin: 500000, fundingMax: 10000000, eligibility: ["Women-led Canadian technology companies", "Majority women-founded or women-led leadership teams", "Series A or growth-stage technology companies"], deadline: "Rolling — bdc.ca/women or BDC Capital", applicationLink: "https://www.bdc.ca/en/bdc-capital/venture-capital/funds/women-technology-fund", description: "Dedicated venture capital fund investing in women-led Canadian tech companies — $500K to $10M equity investment in promising high-growth technology businesses with women in leadership.", country: "Canada", region: "Federal", category: "Venture Capital", agency: "BDC Capital", status: "Active", tags: ["Women Tech", "Venture Capital", "Technology", "Equity"], requirements: ["Women-led Canadian tech company", "Growth-stage with revenue or strong traction", "Technology sector", "Equity investment (dilutive)"], lastUpdated: "2026-01-01" },
  { id: "ca-edc-women", name: "EDC Women Exporter Program", fundingMin: 0, fundingMax: 0, eligibility: ["Canadian women-owned businesses (51%+) with export activity or ambitions", "All industries and export stages", "Connects with trade financing and market development support"], deadline: "Continuous — edc.ca/women", applicationLink: "https://www.edc.ca/en/solutions-for/women-owned-businesses.html", description: "Export Development Canada&apos;s dedicated program for women exporters — providing trade financing, export credit insurance, networking, and market access support specifically for women-owned businesses expanding globally.", country: "Canada", region: "Federal", category: "Export Support", agency: "Export Development Canada", status: "Active", tags: ["Export", "Women Business", "Trade Finance", "Insurance"], requirements: ["51%+ women ownership", "Canadian business", "Export or export market development activity"], lastUpdated: "2026-01-01" },
  { id: "ca-wbc", name: "Women&apos;s Enterprise Centres (WBC) — Loan Programs", fundingMin: 5000, fundingMax: 150000, eligibility: ["Women entrepreneurs in BC, Alberta, Saskatchewan, Manitoba", "All industries, startup through growth stage", "Business plan required"], deadline: "Rolling — through provincial Women's Business Centres", applicationLink: "https://www.wbc.org/financing/", description: "Women's Business Centres across Western Canada provide below-market-rate business loans ($5K–$150K) specifically for women entrepreneurs, with business advisory and mentorship services.", country: "Canada", region: "Western Canada", category: "Women Business Loans", agency: "Women&apos;s Business Centres (WBC Network)", status: "Active", tags: ["Women Business", "Loan", "Advisory", "Western Canada"], requirements: ["Women entrepreneur", "Business plan", "Western Canada province", "Minimum viable business concept"], lastUpdated: "2026-01-01" },
  { id: "ca-wes-ecosystem", name: "WES Ecosystem Partners — Training & Mentorship", fundingMin: 0, fundingMax: 25000, eligibility: ["Women entrepreneurs across Canada — any stage", "All industries", "Typically free or subsidized programming"], deadline: "Continuous — through local WES ecosystem partners (accelerators, incubators)", applicationLink: "https://ised-isde.canada.ca/site/women-entrepreneurship-strategy/en/women-entrepreneurship-ecosystem-fund", description: "WES Ecosystem fund finances organizations (accelerators, incubators, non-profits) providing programming, training, mentorship, and peer networks to women entrepreneurs. Access through your regional women's entrepreneurship hub.", country: "Canada", region: "Federal", category: "Training & Mentorship", agency: "ISED — WES Ecosystem Partners", status: "Active", tags: ["WES", "Mentorship", "Training", "Accelerator"], requirements: ["Women entrepreneur", "Participation in WES partner program", "Canada-wide"], lastUpdated: "2026-01-01" },
]

export default function CanadaWomenBusinessGrantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <Header />

      <section className="bg-gradient-to-br from-purple-700 via-fuchsia-800 to-pink-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Users2 className="h-6 w-6 text-purple-300" />
              <Badge className="bg-purple-500/30 text-purple-100 border-purple-400">Canada Women Business Grants 2026</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Canada Women Business Grants 2026</h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Canada has made women&apos;s entrepreneurship a federal priority through the $2.3B Women Entrepreneurship
              Strategy (WES) — the largest single federal investment in women&apos;s entrepreneurship in Canadian history.
              The program delivers funding, training, and mentorship through three channels: the Women Entrepreneurship
              Fund ($10K–$100K non-repayable grants for scaling women-led businesses), the WES Ecosystem Fund
              (financing accelerators and incubators that serve women entrepreneurs), and WES Knowledge Hub
              (research and resources). In addition to WES, women entrepreneurs access BDC&apos;s Women in Technology
              venture fund ($500K–$10M), EDC&apos;s dedicated women exporter program, Women&apos;s Business Centres
              in Western Canada (loans $5K–$150K), and all mainstream Canadian programs (SR&ED, IRAP, CSBFP,
              CDAP) on an equal basis. This guide covers each program in depth with eligibility details, application
              strategies, and provincial-level resources.
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">$2.3B</div><div className="text-purple-200 text-sm mt-1">WES federal investment in women entrepreneurship</div></div>
              <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">$100K</div><div className="text-purple-200 text-sm mt-1">Max Women Entrepreneurship Fund grant</div></div>
              <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">$10M</div><div className="text-purple-200 text-sm mt-1">Max BDC Women in Technology investment</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <ShortAnswerBox content="Yes — Canadian women entrepreneurs have access to: WES Women Entrepreneurship Fund ($10K–$100K non-repayable grants), BDC Women in Technology Venture Fund ($500K–$10M equity for women-led tech), EDC Women Exporter financing and insurance, Women's Business Centres (loans $5K–$150K in Western Canada), WES Ecosystem accelerator and incubator programming, and all mainstream programs (SR&ED, IRAP, CSBFP, CDAP) equally. Both WES-specific and mainstream programs should be pursued simultaneously." />
            <EEATBadge authorName="Ashwani K." authorImage="/ash-author-1.jpg" date="2026-03-01" />
            <EligibleCheck />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-wrap gap-2 mb-10">
            {["WES Fund", "BDC Women in Tech", "EDC Export", "Women's Business Centres", "Provincial Programs", "FAQ"].map((item) => (
              <Badge key={item} variant="outline" className="cursor-pointer hover:bg-purple-50 px-3 py-1.5 text-sm">{item}</Badge>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Canada Women Business Programs — Quick Comparison 2026</h2>
            <p className="text-gray-600 mb-6">Compare the core women-specific funding programs. These are in addition to all mainstream Canadian programs that women entrepreneurs equally qualify for (SR&ED, IRAP, CSBFP, CDAP, etc.).</p>
            <GrantComparisonTable grants={womenGrants} title="Canada Women Entrepreneur Programs" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-10">

              <Card>
                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Building className="h-5 w-5 text-purple-600" />Canada&apos;s Women Entrepreneurship Ecosystem — The Full Picture</CardTitle></CardHeader>
                <CardContent className="text-gray-700 space-y-4">
                  <p className="leading-relaxed">
                    Canada&apos;s Women Entrepreneurship Strategy (WES), launched in 2018 with $2.3B in federal commitment
                    over 5 years, represents the most comprehensive national policy investment in women&apos;s entrepreneurship
                    in Canadian history. WES operates through three funding streams, each addressing a different part of
                    the women&apos;s entrepreneurship ecosystem: the <strong>Women Entrepreneurship Fund</strong> (direct grants
                    to women-led businesses for scaling), the <strong>WES Ecosystem Fund</strong> (grants to organizations
                    providing programming to women entrepreneurs — accelerators, incubators, NPOs), and the
                    <strong>Women Entrepreneurship Knowledge Hub</strong> (research and data to improve policy and programming).
                  </p>
                  <p className="leading-relaxed">
                    Federal women&apos;s entrepreneurship programs extend beyond WES. The <strong>Business Development Bank
                      of Canada (BDC)</strong> has a dedicated Women in Technology venture fund investing equity in women-led
                    Canadian tech companies, plus specific advisory and financing products for women entrepreneurs.
                    <strong>Export Development Canada (EDC)</strong> operates a Women Exporter program with tailored trade
                    financing, credit insurance, and networking for women-owned businesses expanding internationally.
                    The <strong>Trade Commissioner Service (TCS)</strong> has designated women entrepreneur trade advisors
                    in key markets. And the <strong>Women&apos;s Business Centres (WBCs)</strong>, a national network funded
                    partially by WES, provide loans and advisory services to women entrepreneurs in every province.
                  </p>
                  <p className="leading-relaxed">
                    The critical strategic insight: women entrepreneurs should pursue <strong>both</strong> WES-specific programs
                    <strong> and</strong> mainstream Canadian programs simultaneously. SR&ED, IRAP, CSBFP, CDAP, BDC, and
                    RDA grants are all equally accessible to women entrepreneurs. The strongest-funded women-led businesses
                    layer WES grants on top of mainstream programs — using WES for market development and scaling activities
                    while using SR&ED and IRAP for R&D costs, CSBFP for equipment, and BDC for growth capital. The two
                    program tracks are complementary, not mutually exclusive.
                  </p>
                </CardContent>
              </Card>

              {/* WES Fund Deep Dive */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Women Entrepreneur Programs — Detailed Breakdown</h2>
                <div className="space-y-6">

                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">1. Women Entrepreneurship Fund (WES Fund) — The Primary Grant</CardTitle>
                        <Badge className="bg-purple-100 text-purple-800 shrink-0 ml-2">$10K – $100K</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        The Women Entrepreneurship Fund provides non-repayable grants of $10,000 to $100,000 to majority
                        women-owned and led Canadian businesses for scaling activities. The fund is delivered through
                        regional WES Ecosystem partners — organizations designated by ISED to administer funding in their
                        region. This means you don&apos;t apply to ISED directly; you apply through your regional WES partner
                        organization (a women&apos;s business centre, regional accelerator, or industry organization with a WES
                        delivery mandate).
                      </p>
                      <p>
                        WES Fund grants cover: market development and export activities, hiring staff to support scaling,
                        technology investments for business growth, professional development and training, and productivity
                        investments. They do NOT cover basic operating expenses, debt repayment, or founder compensation.
                        The grant is tied to a specific scaling plan — you must describe the growth activities the grant
                        will fund and demonstrate how those activities advance your business&apos;s revenue and market position.
                      </p>
                      <p>
                        Eligibility requires: (1) majority women ownership AND leadership — passive women ownership without
                        women in active leadership roles does not qualify; (2) 1–250 employees; (3) a growth-stage business
                        with an established concept (pure pre-revenue startups are typically better served by WES Ecosystem
                        programming than WES Fund grants). Find your regional WES partner at ised-isde.canada.ca/wes.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-pink-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">2. Women&apos;s Business Centres (WBC) — Loans and Advisory Nationwide</CardTitle>
                        <Badge className="bg-pink-100 text-pink-800 shrink-0 ml-2">$5K – $150K loans</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        Women&apos;s Business Centres (WBCs) are regionally distributed organizations providing loans,
                        advisory services, and business training specifically for women entrepreneurs. In Western Canada,
                        the WBC Network (wbc.org) operates Women&apos;s Enterprise Centres in BC, Alberta, Saskatchewan, and
                        Manitoba with a direct loan program ($5K–$150K). In Ontario, the Women&apos;s Enterprise Skills Training
                        of Windsor and similar organizations serve their regions. In Quebec, the Réseau des Femmes
                        d&apos;affaires du Québec connects women entrepreneurs to financing and mentorship.
                      </p>
                      <p>
                        WBC loans in Western Canada are specifically designed for women entrepreneurs who may not qualify
                        for conventional bank financing — due to limited credit history, unconventional collateral, or
                        business models that traditional underwriters don&apos;t assess well. The WBC approach includes
                        business advisory throughout the loan period — similar to Community Futures for rural businesses
                        and AFIs for Indigenous entrepreneurs. The holistic support model (loan + advisory) produces better
                        business outcomes than pure financing.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">3. Provincial Women Entrepreneur Programs — By Province</CardTitle>
                        <Badge className="bg-blue-100 text-blue-800 shrink-0 ml-2">Province-specific</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        In addition to federal WES programs, every province has provincial-level women entrepreneur
                        support — either through Women&apos;s Business Centres, provincial development agencies, or
                        economic development programs with women entrepreneur priority streams:
                      </p>
                      <div className="space-y-3 mt-4">
                        {[
                          { prov: "British Columbia", programs: "WBC BC (Women&apos;s Enterprise Centre) — loans $5K–$150K, advisory, mentorship networks; Innovate BC has women-in-tech accelerator programs; BC Tech Fund gender-lens investing" },
                          { prov: "Ontario", programs: "MaRS Women&apos;s Health Innovation program; FedDev Ontario has women entrepreneur priority in many programs; Ryerson DMZ Women&apos;s Entrepreneurship programs; WEtech Alliance (Windsor/Essex)" },
                          { prov: "Alberta", programs: "WBC Alberta — loans and advisory; ATB Financial Women&apos;s Entrepreneur programs; Alberta Women Entrepreneurs (AWE) — business advisory, $10K–$500K loan programs" },
                          { prov: "Quebec", programs: "Réseau des Femmes d&apos;affaires du Québec; Investissement Québec women entrepreneur financing; Fondation Montréal inc. women SME support" },
                          { prov: "Atlantic Canada", programs: "ACOA women entrepreneur priority in BDP grants; Atlantic Women&apos;s Business Network; provincial Women&apos;s Innovation Challenge programs (Nova Scotia, New Brunswick)" },
                        ].map(({ prov, programs }) => (
                          <div key={prov} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <div className="font-bold text-blue-900 text-sm mb-1">{prov}</div>
                            <div className="text-xs text-blue-700">{programs}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                </div>
              </div>

              {/* WES vs Mainstream Stack */}
              <Card className="bg-purple-50 border-purple-200">
                <CardHeader><CardTitle className="text-xl text-purple-900">WES-Specific vs. Mainstream Programs — What to Pursue in Parallel</CardTitle></CardHeader>
                <CardContent className="text-purple-900">
                  <p className="text-sm mb-4 leading-relaxed">Women entrepreneurs should pursue programs in both columns simultaneously — WES grants are additive to mainstream Canada programs, not alternatives. The strongest-funded women-led businesses use both tracks.</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="font-bold text-purple-900 mb-3 text-sm">🎯 Women-Specific Programs</div>
                      <ul className="text-xs text-purple-700 space-y-1.5">
                        <li><CheckCircle className="h-3 w-3 inline mr-1 text-purple-500" />WES Women Entrepreneurship Fund — for scaling activities</li>
                        <li><CheckCircle className="h-3 w-3 inline mr-1 text-purple-500" />WBC loans ($5K–$150K) — for working capital</li>
                        <li><CheckCircle className="h-3 w-3 inline mr-1 text-purple-500" />BDC Women in Tech VC — for tech equity investment</li>
                        <li><CheckCircle className="h-3 w-3 inline mr-1 text-purple-500" />EDC Women Exporter — for trade financing</li>
                        <li><CheckCircle className="h-3 w-3 inline mr-1 text-purple-500" />WES Ecosystem accelerator programming — training</li>
                        <li><CheckCircle className="h-3 w-3 inline mr-1 text-purple-500" />Provincial women programs (AWE, WEC, etc.)</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="font-bold text-purple-900 mb-3 text-sm">🌐 Mainstream Programs (Equal Access)</div>
                      <ul className="text-xs text-purple-700 space-y-1.5">
                        <li><CheckCircle className="h-3 w-3 inline mr-1 text-blue-500" />SR&ED — 35% refund on all qualifying R&D</li>
                        <li><CheckCircle className="h-3 w-3 inline mr-1 text-blue-500" />IRAP — R&D wage funding for SMEs</li>
                        <li><CheckCircle className="h-3 w-3 inline mr-1 text-blue-500" />CSBFP — government-backed equipment/fit-out loans</li>
                        <li><CheckCircle className="h-3 w-3 inline mr-1 text-blue-500" />CDAP — digital adoption grants ($2.4K–$100K)</li>
                        <li><CheckCircle className="h-3 w-3 inline mr-1 text-blue-500" />RDA grants (FedDev, ACOA, PacifiCan, WD)</li>
                        <li><CheckCircle className="h-3 w-3 inline mr-1 text-blue-500" />BDC term loans, advisory, and growth equity</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* How to Apply */}
              <Card>
                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><FileText className="h-5 w-5 text-purple-600" />How to Apply — Canada Women Business Grants Step by Step</CardTitle></CardHeader>
                <CardContent className="text-gray-700">
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Find Your Regional WES Ecosystem Partner First", desc: "WES Fund grants are not applied for directly through ISED — they are delivered through designated regional WES Ecosystem partner organizations. Go to ised-isde.canada.ca/wes and search for your province's WES partners. Contact 2–3 of your regional partners to understand which one best serves businesses in your industry and stage. Most WES partners also provide free programming, mentorship, and business advisory in addition to grant delivery — connect with them before you need a grant to build the relationship." },
                      { step: "2", title: "Connect with Your Provincial Women's Business Centre or AWE", desc: "In Western Canada, the Women's Enterprise Centre (BC), Alberta Women Entrepreneurs (AWE), and WBC Saskatchewan/Manitoba all provide loans AND advisory AND business programming. In Ontario, Women's Enterprise Skills Training organizations and regional women's accelerators fill a similar role. In Quebec, Réseau des Femmes d'affaires du Québec and Investissement Québec women programs. These organizations are best contacted for both loan needs and programming — their advisory services improve the quality of your WES Fund grant applications." },
                      { step: "3", title: "Register with EDC if You Have or Plan International Sales", desc: "Export Development Canada's Women Exporter program is free to access and provides trade financing (export credit insurance, accounts receivable guarantees, buyer financing) that conventional banks won't provide for international transactions. If your business has any international revenue or export aspirations, register at edc.ca/women and request a meeting with an EDC trade finance specialist. EDC financing also provides valuable credibility when applying for other export-focused grants (CanExport, RDA market development contributions)." },
                      { step: "4", title: "Apply to Mainstream Programs Simultaneously (SR&ED, IRAP, CSBFP, CDAP)", desc: "While pursuing WES-specific programs, don't neglect mainstream programs. File SR&ED if you do any R&D. Apply for IRAP if you're an SME developing technology. Use CSBFP for equipment and leasehold. Apply for CDAP for digital adoption. Apply for your RDA's relevant program for any defined growth project. These programs don't care about gender — they care about Canadian business activity creating economic benefit. Apply to all programs you qualify for, women-specific and general, in parallel." },
                      { step: "5", title: "For Tech Companies — Contact BDC Capital Women in Technology Fund", desc: "If you lead a women-founded or women-led Canadian technology company with strong growth trajectory (post-product, showing market traction), contact BDC Capital's Women in Technology Venture Fund at bdc.ca/capital. BDC Capital's women's fund invests $500K–$10M in equity, with a patient investment philosophy aligned with scaling rather than quick exits. BDC Capital investments are often the anchor that attracts co-investors from the private VC sector — a BDC Capital term sheet significantly de-risks the investment for other VCs in the round." },
                      { step: "6", title: "Engage in the WES Ecosystem for Peer Networks and Mentorship", desc: "Beyond grants and loans, the WES Ecosystem includes accelerators, incubators, and networking organizations providing peer mentorship, market access connections, and expert programming for women entrepreneurs at every stage. Organizations like MaRS Health, Springboard Enterprises Canada, Women in Capital Markets, and regional women's business networks (funded through WES Ecosystem grants) provide curated peer communities and expert mentors that many women founders rate as more valuable than any single grant. Register for programming with 2–3 WES Ecosystem partners in your region, even before you have a specific funding need." },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-purple-700 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                        <div><div className="font-semibold text-gray-900 mb-1">{item.title}</div><div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Common Mistakes */}
              <Card className="border-red-100 bg-red-50">
                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-red-900"><AlertCircle className="h-5 w-5 text-red-600" />5 Mistakes Women Entrepreneurs Make When Seeking Canadian Funding</CardTitle></CardHeader>
                <CardContent className="text-red-900 space-y-4">
                  {[
                    { n: "1", m: "Applying ONLY to Women-Specific Programs and Missing Mainstream Grants", d: "The most limiting mistake women entrepreneurs make in Canadian grant applications is treating women-specific programs (WES Fund, WBC loans) as alternatives to mainstream programs rather than additions. A women-led tech company that applies for the WES Fund but doesn't file SR&ED, doesn't apply for IRAP, and doesn't use CSBFP is leaving 70–80% of its total available non-dilutive funding unclaimed. Mainstream programs don't have gender criteria — women entrepreneurs qualify on equal footing. Maximize both tracks simultaneously." },
                    { n: "2", m: "Not Preparing a Clear Women-Led Management Case", d: "WES Fund eligibility requires majority women ownership AND leadership — passive ownership is not enough. Applications that vaguely describe 'women-involved' governance without clearly articulating the specific decision-making roles that women hold (CEO, COO, CTO, Board Chair, etc.) regularly fail the leadership test during review. Be explicit in your WES application: name the women leaders, their titles, their specific responsibilities, and the percentage ownership distribution. If your business has male co-founders or partners, clearly demonstrate that women hold majority decision-making authority." },
                    { n: "3", m: "Not Registering with EDC Early Enough to Use Trade Financing Before International Revenue Is Lost", d: "Many women entrepreneurs with international customers lose revenue because they can't extend credit terms to foreign buyers (a competitive disadvantage in international markets). EDC export credit insurance covers 90% of the receivable value for foreign buyer non-payment — enabling you to offer 30/60/90 day payment terms to international customers without taking uninsured credit risk. Most women exporters discover EDC after a bad debt experience, not before. Register at edc.ca/women before signing your first international contract — not after your first bad foreign debt." },
                    { n: "4", m: "Approaching Women's Business Centres Only When in Financial Distress", d: "Women's Business Centres provide maximum value when you engage them during business planning and early growth — not when you're struggling financially. WBC advisors help you structure your business, identify the right mix of grants and financing, and prepare stronger applications for WES Fund, CSBFP, and provincial programs. A business owner who comes to the WBC at a financial stress point has far fewer options than one who builds the relationship proactively at startup. Treat your WBC as a strategic advisory resource, not a lender of last resort." },
                    { n: "5", m: "Missing BDC Capital's Women in Technology Fund for Tech Companies", d: "BDC Capital's Women in Technology venture fund is one of the most important equity capital sources for women-led Canadian technology companies — but many founders don't know it exists or assume they're 'not ready for VC.' BDC Capital takes a patient approach, invests in companies at earlier stages than most private VCs, and explicitly targets women-led teams. Unlike private VCs whose fund return timelines pressure rapid scaling, BDC Capital can take a longer-term perspective on your growth. Any women-led Canadian tech company with product-market fit should contact BDC Capital for an exploratory conversation regardless of perceived stage." },
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
                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-amber-800"><Lightbulb className="h-5 w-5 text-amber-600" />Expert Strategy: Maximizing the Women Entrepreneur Funding Stack</CardTitle></CardHeader>
                <CardContent className="text-amber-900 space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="font-semibold mb-2">💡 The Optimal Stack for a Women-Led Tech SME</div>
                    <p className="text-sm leading-relaxed">Year 1: IRAP ($200K R&D wages) + SR&ED ($70K refund) + CDAP Grow ($2.4K) + WBC loan ($50K working capital) + WES Ecosystem accelerator membership (free). Year 2: IRAP ($300K) + SR&ED ($105K) + WES Fund ($50K–$100K market development grant) + CDAP Boost ($15K advisory + $100K BDC interest-free loan). Year 3: IRAP ($400K) + SR&ED ($140K) + FedDev/RDA project grant ($150K) + BDC Capital conversations. Total non-dilutive capital over 3 years: $1.2M–$1.5M on a $600K R&D investment. This is achievable for any women-led tech SME with deliberate program navigation.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="font-semibold mb-2">💡 WES Is a Network, Not Just a Grant — Use the Entire Ecosystem</div>
                    <p className="text-sm leading-relaxed">WES&apos;s most durable value is not the $10K–$100K grant — it&apos;s the peer network of women entrepreneurs at your stage, the experienced mentors with sector-specific expertise, and the warm introductions to customers, partners, and investors that WES Ecosystem partners facilitate. Women who engage deeply with WES programming — attending events, connecting with mentors, building peer relationships — consistently report business outcomes that exceed those generated by the grant funding alone. Treat WES as a community to invest in over years, not a grant portal to visit once.</p>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">FAQ: Canada Women Business Grants 2026</h2>
                <div className="space-y-4">
                  {[
                    { q: "Can a business with a male co-founder receive WES funding if a woman is the majority owner and CEO?", a: "Yes — WES Fund eligibility requires majority women OWNERSHIP (51%+) AND majority women LEADERSHIP (women in active management and decision-making roles). A business where a woman holds 51%+ equity and serves as CEO or Managing Director qualifies even if there are male co-founders holding the remaining equity. The key is that the WES application must clearly articulate the ownership structure (percentages, names) and the leadership structure (who holds what title, who makes what decisions). Vague descriptions of 'women-involved' governance don't satisfy the leadership requirement — clear organizational charts and role descriptions do." },
                    { q: "Is the Women Entrepreneurship Fund available to non-profit or social enterprise organizations?", a: "The Women Entrepreneurship Fund (WES Fund) specifically targets for-profit women-led businesses in most delivery streams. Social enterprises with revenue models (hybrid for-profit/mission structures) may qualify depending on their structure and the WES partner delivering in their region. Non-profit organizations themselves can apply for WES Ecosystem Fund grants (to provide programming to women entrepreneurs) but not WES Fund business grants. Check with your regional WES partner to understand whether your specific organizational structure qualifies in your jurisdiction." },
                    { q: "What is the difference between WES Ecosystem Fund and the Women Entrepreneurship Fund?", a: "These are two distinct WES program streams. The Women Entrepreneurship Fund (WES Fund) provides grants directly to women-owned and led businesses for scaling activities — this is the $10K–$100K grant that individual business owners apply for. The WES Ecosystem Fund provides grants to ORGANIZATIONS (accelerators, incubators, women's business associations, sector associations) that deliver programming, training, mentorship, and business support TO women entrepreneurs. The Ecosystem Fund is what finances the programming you participate in when you attend a women's entrepreneur accelerator or business centre — you benefit from it indirectly as a participant, not as a direct recipient." },
                    { q: "Does self-employment count as a 'business' for WES Fund purposes?", a: "WES Fund targets women entrepreneurs with incorporated businesses and growth ambitions. Self-employed sole proprietors providing services as a single person (consultants, freelancers, sole-practitioner professionals) are generally not the primary target of the WES Fund, which is designed for businesses with employees and scaling potential. However, some WES partners deliver programming specifically for self-employed women through the WES Ecosystem streams — mentorship, peer networks, and advisory services available to any self-employed woman entrepreneur. Contact your regional WES partner to understand what they offer for self-employed professionals vs. business owners with employees." },
                    { q: "Are there women-specific grants for businesses outside of Canada's major cities?", a: "Yes — rural and small-town women entrepreneurs have access to WES Fund and WES Ecosystem programming throughout Canada, and may have access to additional rural-specific supports. Community Futures Development Corporations (CFDCs) in rural Canada specifically serve women entrepreneurs alongside all rural businesses. WBC serves smaller cities and rural areas in Western Canada, not just major centres. WES Ecosystem partners in many provinces specifically focus on non-metropolitan women entrepreneurs. Additionally, ACOA's Business Development Program and CanNor (for territories) serve rural and remote women entrepreneurs in their regions with broader programs that aren't exclusively WES-branded." },
                    { q: "Can a woman entrepreneur in Canada access both WES and Indigenous entrepreneur programs if she is Indigenous?", a: "Yes — Indigenous women entrepreneurs can and should access programs from both the WES ecosystem and the Indigenous entrepreneur funding ecosystem (AEP, NACCA AFI loans, Métis Capital programs). Many WES providers have specific Indigenous women entrepreneur programming streams as part of their WES Ecosystem mandate. Indigenous Services Canada and ISED coordinate to ensure Indigenous women entrepreneurs aren't excluded from either program track. Additionally, the federal Women Entrepreneurship Strategy includes Indigenous women as a priority population throughout its programs. Accessing BOTH the WES ecosystem and Indigenous-specific programs simultaneously is not only permitted but represents the optimal approach for Indigenous women entrepreneurs." },
                    { q: "What organizations provide mentorship to women entrepreneurs in Canada as part of WES?", a: "The WES Ecosystem includes 40+ designated partner organizations across Canada providing mentorship and programming. Some prominent ones include: Futurpreneur Canada (national, youth entrepreneur mentorship with WES components), MaRS Discovery District (Ontario, health and tech), Innovate BC (British Columbia tech and innovation), Springboard Enterprises Canada (growth-stage women-led companies), Women in Capital Markets (finance-sector women), the Alberta Women Entrepreneurs network, and numerous regional women's business associations and accelerators co-funded through WES Ecosystem grants. The best way to find current WES mentorship programs is to search for WES partners at ised-isde.canada.ca/wes and contact 2–3 in your province for their current programming schedule." },
                    { q: "Are there age-specific women entrepreneur programs in Canada (for young or older entrepreneurs)?", a: "Several programs address age-specific needs for women entrepreneurs. For younger women (18–39): Futurpreneur Canada provides loans ($20K–$60K) and 2-year mentorship explicitly designed for young entrepreneurs of any gender, with WES partnership for additional women-specific support. For older women entrepreneurs (50+): some provincial Women's Business Centres and WES ecosystem partners deliver specific programming for women entrepreneurs in career transition (returning to work, post-corporate entrepreneurship, encore entrepreneurship after 50). The federal First Work program, while not women-specific, also helps mature workers including those starting businesses. Most WES Fund grants have no age restriction — the focus is business stage and growth potential, not founder age." },
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
              <Card className="bg-purple-800 text-white">
                <CardContent className="pt-6">
                  <Star className="h-8 w-8 text-yellow-300 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Free Women Entrepreneur Grant Matching</h3>
                  <p className="text-purple-100 text-sm mb-4">Our specialists identify the full WES, WBC, BDC, RDA, and mainstream program stack for your women-led business — free 30-minute session.</p>
                  <Link href="/contact"><Button className="w-full bg-white text-purple-800 hover:bg-purple-50">Get Free Matching <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
                </CardContent>
              </Card>
              <NewsletterSignup variant="sidebar" />
              <Card>
                <CardHeader><CardTitle className="text-lg">Key Program Contacts</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-3">
                  <div><div className="font-semibold">WES Partners Finder</div><div className="text-gray-500">ised-isde.canada.ca/wes</div></div>
                  <div><div className="font-semibold">WBC (Western Canada)</div><div className="text-gray-500">wbc.org</div></div>
                  <div><div className="font-semibold">Alberta Women Entrepreneurs</div><div className="text-gray-500">awebusiness.com</div></div>
                  <div><div className="font-semibold">BDC Women in Tech Fund</div><div className="text-gray-500">bdc.ca/capital/women</div></div>
                  <div><div className="font-semibold">EDC Women Exporters</div><div className="text-gray-500">edc.ca/women</div></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Related Resources</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <Link href="/canada/small-business-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Canada Small Business Grants</Link>
                    <Link href="/canada/indigenous-entrepreneur-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Indigenous Entrepreneur Grants</Link>
                    <Link href="/blog/sred-tax-credit-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> SR&ED Tax Credit Guide</Link>
                    <Link href="/canada/government-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Federal Canadian Grants</Link>
                    <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder Tool</Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-8">
            <NewsletterSignup title="Canada Women Entrepreneur Grant Updates" description="Track WES Fund intake cycles, WBC program changes, new women-focused accelerator programs, and BDC Capital announcements — delivered to your inbox." />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
