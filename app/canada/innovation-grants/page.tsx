import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, CheckCircle, ArrowRight, Building, Lightbulb, FileText, AlertCircle, Star } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
  title: "Canada Innovation Grants 2026 | IRAP, SR&ED, SDTC & Technology Startup Funding",
  description: "Complete guide to Canada innovation grants 2026. NRC IRAP ($50K–$2M R&D funding), SR&ED tax credits (35% refundable), SDTC cleantech grants ($500K–$10M), Strategic Innovation Fund, NSERC research partnerships, and Digital Technology Supercluster programs for Canadian innovators.",
  keywords: "Canada innovation grants 2026, NRC IRAP grants, SR&ED tax credit, SDTC cleantech grants, Strategic Innovation Fund Canada, Canada technology startup grants, innovation funding Canada, Canada R&D grants, NSERC grants, Canadian innovation tax credits",
  alternates: { canonical: "https://www.fsidigital.ca/canada/innovation-grants" },
  openGraph: { title: "Canada Innovation Grants 2026 | IRAP, SR&ED, SDTC & Technology Funding Guide", description: "Discover Canadian innovation and technology grants — IRAP, SR&ED, SDTC, SIF, and NSERC programs for startups and R&D companies in 2026.", url: "https://www.fsidigital.ca/canada/innovation-grants" },
}

const innovationGrants: Grant[] = [
  { id: "ca-irap-core", name: "NRC IRAP — Core R&D Funding Program", fundingMin: 50000, fundingMax: 2000000, eligibility: ["Canadian SMEs with fewer than 500 employees", "Technology product or process development companies", "All innovation sectors"], deadline: "Rolling — contact regional NRC ITA advisor", applicationLink: "https://nrc.canada.ca/en/support-technology-innovation/nrc-industrial-research-assistance-program", description: "NRC IRAP is Canada's most accessible and fast-moving technology innovation grant — funding wages of employees and contractors doing qualifying R&D for Canadian SMEs from $50K to $2M per project.", country: "Canada", region: "Federal", category: "R&D Wage Funding", agency: "National Research Council", status: "Active", tags: ["IRAP", "R&D", "Technology", "SME"], requirements: ["Canadian SME", "<500 employees", "Technological uncertainty in project", "ITA relationship"], lastUpdated: "2026-01-01" },
  { id: "ca-sred-innovation", name: "SR&ED Tax Credit — Enhanced Rate for Innovation Companies", fundingMin: 5000, fundingMax: 10000000, eligibility: ["All Canadian corporations", "CCPCs get 35% refundable on first $3M R&D", "Non-CCPC: 15% non-refundable credit"], deadline: "Annual corporate T2 tax return filing", applicationLink: "https://www.canada.ca/en/revenue-agency/services/scientific-research-experimental-development-tax-incentive-program.html", description: "Canada's flagship R&D tax incentive — 35% refundable credit for small CCPCs on qualifying scientific research and experimental development. The broadest and most impactful innovation program in Canada.", country: "Canada", region: "Federal", category: "Tax Credit", agency: "Canada Revenue Agency", status: "Active", tags: ["SR&ED", "Tax Credit", "R&D", "Refundable"], requirements: ["Canadian corporation", "Qualifying SR&ED activities", "Contemporaneous documentation", "Annual CRA T661 claim form"], lastUpdated: "2026-01-01" },
  { id: "ca-sdtc", name: "Sustainable Development Technology Canada (SDTC)", fundingMin: 500000, fundingMax: 10000000, eligibility: ["Canadian cleantech and sustainable technology companies", "Projects at TRL 3–7 (demonstration stage)", "Consortium partnerships preferred"], deadline: "Bi-annual SDTC intakes — sdtc.ca for schedule", applicationLink: "https://www.sdtc.ca/en/apply/", description: "Non-repayable grants for Canadian cleantech, sustainable technology, and environmental innovation companies — from $500K to $10M per project for technology demonstrations with clear commercialization path.", country: "Canada", region: "Federal", category: "Cleantech Grant", agency: "Sustainable Development Technology Canada", status: "Active", tags: ["Cleantech", "SDTC", "Demonstration", "Environmental"], requirements: ["Canadian company", "Cleantech/sustainability technology", "TRL 3–7", "Consortium partner preferred", "Bi-annual intake"], lastUpdated: "2026-01-01" },
  { id: "ca-nserc-engage", name: "NSERC Engage / Alliance Grants", fundingMin: 25000, fundingMax: 1000000, eligibility: ["Canadian universities partnering with industry companies", "Industry partner must provide cash or in-kind matching", "Research must be collaborative — industry defines commercial objective"], deadline: "Quarterly for Engage ($25K); Alliance has two intakes per year ($1M)", applicationLink: "https://www.nserc-crsng.gc.ca/Professors-Professeurs/Grants-Subs/Alliance-Alliance_eng.asp", description: "NSERC Engage (quick $25K, 6-month collaborative project) and Alliance (up to $1M for complex multi-year industry-academic partnerships) fund Canadian companies accessing university engineering and science expertise.", country: "Canada", region: "Federal", category: "Industry-Academic", agency: "Natural Sciences and Engineering Research Council", status: "Active", tags: ["NSERC", "Academic Partnership", "Engineering", "Alliance"], requirements: ["Canadian company as industry partner", "University research partner", "Defined commercial objective", "NSERC-approved university PI"], lastUpdated: "2026-01-01" },
  { id: "ca-sif-sme", name: "Strategic Innovation Fund — SME Stream", fundingMin: 1000000, fundingMax: 50000000, eligibility: ["Canadian companies in priority innovation sectors", "Advanced manufacturing, cleantech, digital, agri-food, health/biotech", "Significant R&D, commercialization, or productivity investment"], deadline: "Continuous — ISED strategic pre-engagement required", applicationLink: "https://ised-isde.canada.ca/site/strategic-innovation-fund/en", description: "SIF's dedicated SME stream provides $1M–$50M for significant industrial R&D and commercialization investments by mid-size Canadian companies in priority innovation sectors.", country: "Canada", region: "Federal", category: "Major Investment", agency: "ISED Canada", status: "Active", tags: ["SIF", "Large Grant", "Innovation", "Commercialization"], requirements: ["Canadian company", "Priority innovation sector", "Significant economic benefit case", "Pre-engagement with ISED"], lastUpdated: "2026-01-01" },
]

export default function CanadaInnovationGrantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <section className="bg-gradient-to-br from-blue-700 via-indigo-800 to-violet-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Zap className="h-6 w-6 text-blue-300" />
              <Badge className="bg-blue-500/30 text-blue-100 border-blue-400">Canada Innovation Grants 2026</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Canada Innovation Grants 2026</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Canada&apos;s innovation funding ecosystem is one of the most comprehensive and most generous in the world —
              built on three pillars that complement each other precisely. The <strong>NRC IRAP</strong> program funds
              R&D wages for Canadian SMEs ($50K–$2M, rolling, for any sector). The <strong>SR&ED tax credit</strong>
              refunds 35% of qualifying R&D expenditures annually (the broadest and largest incentive, claimed by
              20,000+ companies per year). And <strong>SDTC</strong> funds cleantech and sustainable technology
              demonstrations ($500K–$10M for qualified consortium projects). On top of these core programs are
              NSERC academic partnerships (from $25K to $1M for industry-academic R&D collaborations), the
              Strategic Innovation Fund ($1M–$400M for major industrial investments), and Digital Superclusters
              for technology platform development. This guide explains each program, how they stack, and the
              expert strategies that maximize non-dilutive innovation funding for Canadian technology companies.
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">$3.5B+</div><div className="text-blue-200 text-sm mt-1">SR&ED distributes annually across all sectors</div></div>
              <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">$2M</div><div className="text-blue-200 text-sm mt-1">Max IRAP grant per SME project</div></div>
              <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">$10M</div><div className="text-blue-200 text-sm mt-1">Max SDTC cleantech project grant</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <ShortAnswerBox
                question="How can a Canadian tech startup get government funding for R&D in 2026?"
                content="Yes — Canadian technology and innovation companies can access three complementary core programs: NRC IRAP ($50K–$2M for R&D wages, rolling intake), SR&ED tax credits (35% refundable for CCPCs on all qualifying R&D), and SDTC ($500K–$10M for cleantech demonstrations). These are supplemented by NSERC academic partnerships ($25K–$1M), the Strategic Innovation Fund ($1M–$50M for major projects), and Regional Development Agency innovation grants. IRAP + SR&ED together can cover 70–90% of a Canadian tech SME's R&D costs."
              />
            <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-03-01" />
            <EligibleCheck />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-wrap gap-2 mb-10">
            {["IRAP", "SR&ED", "SDTC Cleantech", "NSERC Academic", "SIF", "FAQ"].map((item) => (
              <Badge key={item} variant="outline" className="cursor-pointer hover:bg-blue-50 px-3 py-1.5 text-sm">{item}</Badge>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Canada Innovation Programs — Quick Comparison 2026</h2>
            <p className="text-gray-600 mb-6">The core Canadian innovation programs work best in combination — IRAP and SR&ED should run simultaneously as the baseline for any R&D-doing company, with SDTC, NSERC, and SIF added for specific project types and stages.</p>
            <GrantComparisonTable grants={innovationGrants} title="Canada Innovation Grant Programs" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-10">

              <Card>
                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Building className="h-5 w-5 text-blue-600" />Canada&apos;s Innovation Funding Architecture — How the Programs Fit Together</CardTitle></CardHeader>
                <CardContent className="text-gray-700 space-y-4">
                  <p className="leading-relaxed">
                    Canada spends approximately $7B–$9B annually on business innovation support — including SR&ED tax
                    credits ($3.5B), IRAP (~$500M), SDTC (~$365M committed per 5-year cycle), SIF contributions
                    ($1B+), and NSERC industry partnerships (~$500M). This makes Canada one of the most innovation-
                    investment-intensive countries in the world on a per-GDP basis — and means that a well-navigated
                    Canadian tech startup can access dramatically more non-dilutive capital than comparable companies
                    in the US (which has no IRAP equivalent and whose SR&ED equivalent — R&D tax credit — is less
                    generous for small companies).
                  </p>
                  <p className="leading-relaxed">
                    The architecture of Canada&apos;s innovation funding system is designed with a specific logic:
                    <strong>SR&ED</strong> is the universal foundation — available to every company, any size, any
                    sector, any R&D type. <strong>IRAP</strong> is the working capital layer — providing wage funding
                    during the year before SR&ED refunds those costs at year-end. Together, IRAP + SR&ED create a
                    continuous cash flow cycle that funds R&D-intensive companies through development. <strong>SDTC</strong>,
                    <strong>NSERC</strong>, and <strong>SIF</strong> are specialized programs with intake cycles and
                    specific eligibility requirements — they are not for every company, but for companies that qualify,
                    they can provide $500K–$50M in additional non-dilutive capital beyond the IRAP/SR&ED base.
                  </p>
                  <p className="leading-relaxed">
                    The <strong>technology stage (TRL — Technology Readiness Level)</strong> is a key organizing
                    concept for Canadian innovation funding. Basic research (TRL 1–2) is funded by NSERC or CIHR
                    grants to universities. Applied R&D (TRL 2–4) is funded by IRAP + SR&ED. Technology demonstration
                    (TRL 5–7) is SDTC&apos;s specific focus. Commercialization (TRL 7–9) is where RDA grants, SIF, and
                    BDC/EDC financing take over. Most technology companies move through multiple TRL stages — and
                    should expect different programs to be most relevant at each stage.
                  </p>
                </CardContent>
              </Card>

              {/* TRL Stage Guide */}
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardHeader><CardTitle className="text-xl text-blue-900">Innovation Funding by Technology Stage (TRL)</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { trl: "TRL 1–3: Basic Research & Concept", programs: "NSERC Discovery / Alliance, CIHR, SR&ED limited applicability", color: "gray" },
                      { trl: "TRL 3–5: Applied R&D / Lab Prototype", programs: "IRAP ($50K–$2M) + SR&ED (35% refundable) — PRIMARY STAGE for these programs", color: "blue" },
                      { trl: "TRL 4–6: Proof of Concept / Pilot", programs: "IRAP + SR&ED (continued) + NSERC Engage/Alliance for academic input + early SDTC eligibility inquiry", color: "indigo" },
                      { trl: "TRL 5–7: Demonstration / Field Testing", programs: "SDTC ($500K–$10M for cleantech) + IRAP + SR&ED + RDA project contributions (first deployment)", color: "purple" },
                      { trl: "TRL 7–9: Commercialization / Scaling", programs: "SIF ($1M–$50M SME stream) + RDA grants + AgriInnovate (agri sector) + BDC + EDC international", color: "green" },
                    ].map(({ trl, programs, color }) => (
                      <div key={trl} className={`bg-${color}-50 rounded-lg p-4 border border-${color}-200`}>
                        <div className={`font-bold text-${color}-900 text-sm mb-1`}>{trl}</div>
                        <div className={`text-xs text-${color}-700`}>{programs}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Program Deep Dives */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Innovation Programs — Detailed Breakdown</h2>
                <div className="space-y-6">

                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">1. NRC IRAP — The Most Accessible Innovation Grant in Canada</CardTitle>
                        <Badge className="bg-blue-100 text-blue-800 shrink-0 ml-2">$50K – $2M</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        NRC IRAP (Industrial Research Assistance Program) has been Canada&apos;s primary SME innovation
                        funding program since 1962 — making it one of Canada&apos;s longest-running and most effective
                        technology development programs. The program operates through a national network of 260+
                        Industrial Technology Advisors (ITAs) — technically trained advisors with sector-specific
                        expertise who serve as both funding administrators and ongoing technical and business advisors.
                      </p>
                      <p>
                        IRAP funding covers wages of employees and contractors doing qualifying R&D work — the actual
                        technical development work, not project management, marketing, or administrative tasks. IRAP
                        also covers some subcontractor costs (universities, testing labs, specialized contractors doing
                        technical work on your project). The key eligibility criterion, applied through the ITA relationship,
                        is <em>technological uncertainty</em>: your project must involve a genuine scientific or engineering
                        challenge where the solution isn&apos;t predetermined by existing knowledge or practice.
                      </p>
                      <p>
                        The IRAP relationship begins with an initial Advisory Assessment — a free, no-obligation meeting
                        with your regional ITA who evaluates your company&apos;s technology development plans. If IRAP
                        funding is appropriate, the ITA helps you structure a project proposal, budget, and milestone plan.
                        Decisions typically come within 4–8 weeks. Disbursement begins within 1–2 months of approval.
                        This makes IRAP the fastest-access federal innovation funding in Canada — faster than SDTC,
                        NSERC Alliance, or SIF by months or years.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">2. SR&ED — Canada&apos;s Single Largest Business R&D Incentive</CardTitle>
                        <Badge className="bg-green-100 text-green-800 shrink-0 ml-2">35% refundable (CCPCs)</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        SR&ED is the crown jewel of Canada&apos;s innovation funding system — distributing more money
                        annually than IRAP, SDTC, and most sector-specific programs combined. Nearly 20,000 Canadian
                        companies claim SR&ED credits each year, receiving cash refunds (for CCPCs) or tax credits on
                        qualifying R&D expenditures. The 35% refundable rate for CCPCs on the first $3M of qualifying
                        R&D means a small company spending $500K on qualifying R&D receives $175K back from CRA —
                        regardless of whether the company is profitable.
                      </p>
                      <p>
                        Qualifying SR&ED activities for tech companies include: software development involving novel
                        algorithms or architectures, hardware design with genuine engineering uncertainty, materials
                        science experiments, computational modeling, bioprocess optimization, and any R&D where the
                        technical outcome wasn&apos;t predictable from existing knowledge. The claim process requires filing
                        CRA Form T661 with your annual T2 corporate return — accompanied by project-level documentation
                        covering the technological uncertainty, methodology, and results.
                      </p>
                      <div className="grid sm:grid-cols-3 gap-4 mt-4">
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                          <div className="font-bold text-green-900 text-2xl">35%</div>
                          <div className="text-xs text-green-700 mt-1">CCPC refundable rate (first $3M)</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                          <div className="font-bold text-green-900 text-2xl">15%</div>
                          <div className="text-xs text-green-700 mt-1">Non-CCPC (larger or foreign-owned)</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                          <div className="font-bold text-green-900 text-2xl">Cash</div>
                          <div className="text-xs text-green-700 mt-1">Refundable even with zero tax owing</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-teal-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">3. SDTC — Canada&apos;s Primary Cleantech Demonstration Grant</CardTitle>
                        <Badge className="bg-teal-100 text-teal-800 shrink-0 ml-2">$500K – $10M</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        Sustainable Development Technology Canada (SDTC) is Canada&apos;s dedicated clean technology grant
                        program — providing $500K to $10M per project for technology demonstrations by Canadian
                        cleantech companies. SDTC specifically targets the TRL 4–7 &quot;valley of death&quot; between lab-proven
                        concept (funded by IRAP + SR&ED) and commercial scale (funded by SIF and market revenues) — the
                        demonstration phase where technologies need real-world testing at meaningful scale but can&apos;t yet
                        attract sufficient commercial financing.
                      </p>
                      <p>
                        SDTC grants are non-repayable and awarded through competitive bi-annual review processes (typically
                        two intakes per year, with results announced 4–6 months after intake). Eligible sectors include
                        all aspects of clean technology: energy generation (solar, wind, biomass, hydrogen), energy efficiency
                        (building, industrial, transportation), agriculture and food system sustainability, water and waste
                        management, and climate adaptation technology. SDTC generally requires consortium participation
                        (your company plus at least one other Canadian organization), though solo company applications
                        have been considered.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-orange-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">4. NSERC Engage & Alliance — Industry-Academic R&D Partnerships</CardTitle>
                        <Badge className="bg-orange-100 text-orange-800 shrink-0 ml-2">$25K – $1M</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        NSERC (Natural Sciences and Engineering Research Council) funds industry-academic research partnerships
                        through two main programs: <strong>Engage</strong> ($25K over 6 months, quarterly intake, fast decisions)
                        is designed for companies exploring a new university research relationship — funding a proof-of-
                        concept collaboration to validate whether a deeper academic partnership is warranted.
                        <strong>Alliance</strong> ($150K–$1M over 1–5 years, two intakes per year) funds substantial
                        multi-year collaborative research projects between a Canadian company (or consortium) and a
                        university research group.
                      </p>
                      <p>
                        NSERC partnerships are most valuable for companies that need specialized academic capabilities —
                        access to unique lab equipment, deep theoretical expertise, graduate student research capacity,
                        or university data resources — that would cost far more to develop internally. The company defines
                        the commercial objective, the academic researcher designs the research approach, and NSERC funds
                        the academic component while the company provides matching (cash or in-kind). IP terms are negotiated
                        in the research partnership agreement — companies typically retain commercial rights, universities
                        retain publication rights with a delay for patent protection.
                      </p>
                    </CardContent>
                  </Card>

                </div>
              </div>

              {/* IRAP + SR&ED Cash Flow */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader><CardTitle className="text-xl text-green-900">The IRAP + SR&ED Cash Flow Cycle — How They Work Together</CardTitle></CardHeader>
                <CardContent className="text-green-900 space-y-3">
                  <p className="text-sm leading-relaxed">
                    IRAP and SR&ED are explicitly designed to complement each other — IRAP provides working capital
                    DURING the fiscal year; SR&ED provides a refund AFTER the year. On $500K in qualifying engineer
                    salaries:
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { phase: "During Year", title: "IRAP covers ~$200K of salary costs", desc: "Monthly IRAP disbursement reduces your engineering payroll cash outflow by 40%", color: "blue" },
                      { phase: "At Year-End", title: "SR&ED refunds 35% of remaining Qualifying Spend", desc: "On $300K (the non-IRAP portion), SR&ED refunds $105K in cash from CRA", color: "green" },
                      { phase: "Net Result", title: "Your real cost: $195K of $500K in engineering talent", desc: "61% recovery from two government sources on a core R&D team expense", color: "purple" },
                    ].map(({ phase, title, desc, color }) => (
                      <div key={phase} className={`bg-${color}-50 rounded-lg p-4 border border-${color}-200`}>
                        <div className={`text-xs font-bold text-${color}-700 mb-1`}>{phase}</div>
                        <div className={`font-semibold text-${color}-900 text-sm mb-1`}>{title}</div>
                        <div className={`text-xs text-${color}-700`}>{desc}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* How to Apply */}
              <Card>
                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><FileText className="h-5 w-5 text-blue-600" />How to Build a Canadian Innovation Funding Stack — Step by Step</CardTitle></CardHeader>
                <CardContent className="text-gray-700">
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Implement SR&ED Documentation From Your First Line of Code or Experiment", desc: "The first principle of Canadian innovation funding is: document SR&ED in real time, from the start. CRA auditors use contemporaneous documentation as the primary evidence that qualifying activities occurred — retroactively reconstructed records are heavily scrutinized and frequently denied. From day one, maintain: lab notebooks or engineering logs, code commit history with technical decision notes, time tracking showing which hours each employee spent on qualifying R&D, and meeting records on technical decisions. This takes 15–30 minutes per person per week and creates the documentation foundation that supports both SR&ED claims and IRAP audits." },
                      { step: "2", title: "Contact an NRC ITA Before Your Next R&D Project Begins", desc: "Reach your regional NRC ITA through nrc.canada.ca/irap. Contact them at the project planning stage — before you hire the engineers or commit to a development timeline. ITA involvement during planning ensures your project is structured to maximize IRAP eligibility: documenting the technological uncertainties, defining IRAP-eligible vs. non-eligible activities, setting the right milestone structure. An IRAP project that begins with ITA input is significantly better funded than one where IRAP is applied for mid-project." },
                      { step: "3", title: "For Cleantech Companies — Prepare for SDTC Bi-Annual Intake", desc: "SDTC has two intakes per year — register at sdtc.ca for intake notifications. SDTC applications require significant preparation: a technology description with clear TRL evidence (TRL 3–7 required), a detailed commercialization plan, consortium partner letters of intent, an environmental benefit quantification (GHG reduction, resource efficiency, etc.), and a financial model showing viability post-demonstration. Begin SDTC preparation 4–6 months before the intake deadline. Pre-screening your project with an SDTC program officer before formal submission is strongly recommended — it catches eligibility issues and frames the commercial narrative correctly." },
                      { step: "4", title: "For University-Partnered Projects — Contact NSERC Quarterly for Engage", desc: "NSERC Engage ($25K, 6-month) has quarterly intake — these roll so quickly that a relevant project can be funded within 3 months of IDP (industry-defined project) submission. Identify 2–3 faculty members at Canadian universities whose lab capabilities match a specific technical need in your product development. Email them with a one-page problem description — most faculty respond within days. Once you have an academic partner willing to collaborate, the Engage application takes approximately 2 weeks to prepare. NSERC Engage is one of Canada&apos;s most underutilized innovation programs — available quarterly, decision in 4–6 weeks, $25K of co-funded university expertise for $0 cost to your company." },
                      { step: "5", title: "Engage ISED for SIF Pre-Assessment When Your Project Reaches $1M+", desc: "The Strategic Innovation Fund becomes relevant when your single innovation project reaches $1M+ in total cost and falls into a priority sector (advanced manufacturing, cleantech, digital/ICT, agri-food, biotech). Contact ISED&apos;s SIF team for a preliminary assessment — they can confirm within 2–4 weeks whether your project fits the program, which SIF stream is applicable, and whether the economic benefit narrative (Canadian jobs, IP, supply chain) is compelling. Companies that engage ISED proactively before writing an SIF application consistently outperform those that apply cold." },
                      { step: "6", title: "Stack All Programs Using Clean Cost-Category Separation", desc: "The full Canadian innovation stack for a growing tech company: SR&ED (35% refund, all qualifying R&D, continuous) + IRAP (R&D wage funding, project basis) + NSERC Engage ($25K for university intelligence) + SDTC (if cleantech, bi-annual, $500K+ demonstrations) + RDA contributions (commercialization activities) + SIF SME stream (major investments, $1M+). The only accounting rule: no single cost can be claimed by two programs simultaneously. Maintain a program cost-assignment spreadsheet showing which program covers which cost category — reviewed quarterly with your accountant." },
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
                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-red-900"><AlertCircle className="h-5 w-5 text-red-600" />5 Costly Mistakes Canadian Innovators Make with R&D Grants</CardTitle></CardHeader>
                <CardContent className="text-red-900 space-y-4">
                  {[
                    { n: "1", m: "Not Filing SR&ED Because &apos;We Don&apos;t Have a Lab&apos;", d: "SR&ED does not require a physical laboratory, a research team, or formal R&D organization. It requires qualifying scientific or technological advancement conducted by any Canadian corporation. Software companies filing SR&ED routinely do so based on engineering work done in open offices or remotely. The test is whether the work addresses genuine technological uncertainty — not where it is done or who does it. Every Canadian tech company should have an annual SR&ED eligibility conversation with a qualified SR&ED advisor, regardless of whether they consider themselves an &apos;R&D company&apos;." },
                    { n: "2", m: "Approaching IRAP After the Project Has Already Started", d: "IRAP funding is prospective — it funds eligible activities that happen after the IRAP project is approved. Companies that contact IRAP mid-project (after engineers have already been hired and development has begun) lose the portion of the project completed before IRAP approval. Contact your regional NRC ITA during project planning — before you hire the development team, before you write the first line of code, and before you commit to a product timeline. An IRAP project that begins with ITA guidance typically receives 40–60% more funding than one that is applied for mid-project." },
                    { n: "3", m: "Treating SR&ED and IRAP as Either/Or Rather Than Both/And", d: "Many Canadian SMEs choose between IRAP and SR&ED, believing they must pick one or the other. This is incorrect — they are designed to work simultaneously. IRAP funds qualifying R&D wages during the year. SR&ED refunds a portion of the same wages (minus the IRAP amount) at year-end. The combined recovery on $500K in engineering salaries can reach $300K+ with both programs. There is no program-level conflict. There IS an accounting requirement — SR&ED claims must be reduced by IRAP amounts received on the same cost. But operating both simultaneously is standard practice for sophisticated Canadian tech companies." },
                    { n: "4", m: "Missing NSERC Engage Because &apos;We Don&apos;t Have a Research Partnership&apos;", d: "NSERC Engage is specifically designed to CREATE a research partnership — not to fund one that already exists. If you have a technical problem that a university lab could help solve, you can initiate and fund a new academic relationship in one NSERC Engage cycle (3 months from faculty contact to funded project). The academic relationship doesn&apos;t need to exist before the application — just a faculty member willing to submit a joint project proposal. Given that NSERC Engage provides $25K of co-funded university expertise for a 2-week application effort, every Canadian tech SME with any technical challenge should assess NSERC Engage annually." },
                    { n: "5", m: "Applying to SDTC Without Understanding the Consortium and TRL Requirements", d: "SDTC has two firm requirements that trip up first-time applicants: (1) The technology must be at TRL 3–7 — SDTC does not fund basic research (TRL 1–2) or commercial deployment (TRL 8–9). Companies that mischaracterize their technology readiness level are screened out early. (2) SDTC strongly prefers consortium applications — your company plus at least one other Canadian organization (customer, technology partner, university). Solo applications are reviewed less favourably. Before investing the substantial time required for an SDTC application, confirm your TRL level honestly and identify your consortium partner. An SDTC application without a consortium and a clear TRL assessment is unlikely to score competitively." },
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
                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-amber-800"><Lightbulb className="h-5 w-5 text-amber-600" />Expert Strategy: The Full Canadian Innovation Funding Stack</CardTitle></CardHeader>
                <CardContent className="text-amber-900 space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="font-semibold mb-2">💡 Year 1–4 Stack for a Canadian Deep Tech Company</div>
                    <p className="text-sm leading-relaxed">Year 1: IRAP ($300K) + SR&ED ($105K refund on $300K qualifying spend) + NSERC Engage ($25K for one academic collaboration). Year 2: IRAP ($500K) + SR&ED ($175K refund) + NSERC Alliance ($200K for deeper academic work). Year 3: IRAP ($700K) + SR&ED ($245K refund) + SDTC application (seek $1M–$3M for demonstration). Year 4: IRAP ongoing + SR&ED ongoing + SDTC grant received + RDA project grant ($150K commercialization). Total non-dilutive: $2.4M+ over 4 years. This level of non-dilutive funding is realistically achievable for any Canadian deep tech company with strong ITA relationships, strong SR&ED documentation, and a clean technology angle.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="font-semibold mb-2">💡 Why Canada Is the Best Country in the World for Deep Tech Startups</div>
                    <p className="text-sm leading-relaxed">A deep tech founder friends in the US or EU vs. Canada comparison: US R&D tax credit is 6–20% (non-refundable) vs. Canada SR&ED 35% (refundable). US has no IRAP equivalent (SBIR is competitive and project-specific). UK R&D tax credits (SME scheme) are approximately 33% but have been reduced in recent years. Canada&apos;s combination of 35% refundable SR&ED + $2M IRAP + $10M SDTC for cleantech + no capital gains tax on QSBC shares = the most favorable new technology development environment of any major economy. Deep tech founders who understand this choose Canada specifically for its innovation financing advantages.</p>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">FAQ: Canada Innovation Grants 2026</h2>
                <div className="space-y-4">
                  {[
                    { q: "Can a foreign-funded Canadian startup (with US angel investors) still access SR&ED and IRAP?", a: "Yes, with nuances. IRAP eligibility requires the Canadian entity to be an SME (under 500 employees) and does not restrict based on the nationality of investors. SR&ED eligibility at the 35% refundable rate requires the Canadian entity to be a Canadian-Controlled Private Corporation (CCPC). A company with US angel investors may lose CCPC status if the cumulative foreign ownership exceeds 50%. Check with your accountant whether your current cap table maintains CCPC status — this determines whether you receive the 35% refundable CCPC rate or the 15% non-refundable general rate. Maintaining CCPC status on the cap table through early stages is significant (the difference between a $175K refund and a $75K non-refundable credit on $500K qualifying spend)." },
                    { q: "What is the minimum R&D spend to make SR&ED worth filing?", a: "There is no minimum threshold for SR&ED claims — but practically, the minimum at which SR&ED claims are worth the filing complexity is approximately $20K–$30K in qualifying R&D expenditures (generating $7K–$10.5K in refundable credits). Below this level, the cost of SR&ED advisor fees (15–25% success-based) may approximately equal the credit value. Companies spending $50K–$100K+ on qualifying R&D annually should always file. Companies spending $10K–$50K should file if they have good internal documentation and can minimize the advisor fee, or if they plan to scale R&D spending in future years (establishing the claim history early). CRA processes SR&ED claims within 60–120 days for electronically filed T2s." },
                    { q: "How competitive is the SDTC grant program — what percentage of applicants receive funding?", a: "SDTC historically funds approximately 15–25% of eligible projects in each intake cycle. The program is competitive — not every cleantech company that applies receives funding. However, companies that pre-screen with SDTC program officers, submit complete and well-documented applications, have clear TRL evidence (with independent validation where possible), have identified a concrete consortium partner, and can quantify their environmental benefit in tonnes of CO2 equivalent or other measurable units have significantly better outcomes. SDTC's online resources include previous funding announcements showing funded company profiles — reviewing these gives insight into the type and stage of companies that successfully receive SDTC grants." },
                    { q: "What is NSERC's Alliance program and how does it differ from Engage?", a: "NSERC Engage and Alliance are both industry-academic partnership programs but at different scales and commitment levels. Engage is $25K over 6 months — quick proof-of-concept collaboration with one company and one academic partner, quarterly intake. Alliance is $150K–$1M over 1–5 years for substantial collaborative research, two intakes per year, more complex application process. Alliance requires more academic partner involvement (multiple professors, graduate students, substantial research infrastructure) and more company investment (cash or in-kind matching). Engage is the starting point — most successful Alliance partnerships began as Engage collaborations. Start with Engage to validate the academic relationship, then pursue Alliance for the sustained multi-year program." },
                    { q: "Are there IRAP grants specifically for AI and machine learning companies?", a: "Yes — IRAP has no sector exclusions and actively funds AI and machine learning companies whose work involves genuine technological uncertainty. Qualifying AI/ML innovation includes: developing novel neural network architectures, creating new training methodologies for specific domains with unpredictable outcomes, building genuinely new approaches to reinforcement learning, or developing new ML inference optimization methods. Routine application of existing ML frameworks (GPT API wrappers, standard object detection pipeline deployment, off-the-shelf model fine-tuning) typically does not qualify because there is no technological uncertainty — the outcome is predictable using known methods. The key question is always: &apos;Did you face genuine scientific or technical uncertainty that required experimental investigation to resolve?&apos;" },
                    { q: "Can SR&ED credits be claimed by a startup in its first year of operations with no employees?", a: "Yes — a startup in its first year with contractor-only R&D can file SR&ED. Arm&apos;s-length contractor costs are SR&ED-eligible at 80% (80 cents of every dollar paid to an arm&apos;s-length contractor counts as qualifying SR&ED expenditure). A single-founder company outsourcing $100K of software development to an arm&apos;s-length technical contractor can claim $80K of qualifying expenditures — generating a $28K refundable credit in the first year. The requirement for &apos;directly engaged&apos; employees doing SR&ED work applies to the labour pool component; contract fees have their own calculation. Even a pre-revenue startup with no employees can generate meaningful SR&ED cash refunds in year one." },
                    { q: "How does the Canada Digital Technology Supercluster fit into the innovation funding landscape?", a: "The Canada Digital Technology Supercluster (now Scale AI and other evolved programs) was part of the Innovation Superclusters Initiative launched in 2017 — a $950M federal investment in five sector-specific superclusters: Digital (Scale AI), Ocean (Montreal, now COVE), Protein Industries (Saskatchewan), NGen (Advanced Manufacturing), and BC (BCIC/Innovate BC digital economy). These superclusters provide project funding for companies participating in collaborative projects relevant to their sector, with the supercluster organization acting as intermediary. Check scaliai.ca (Quebec AI/supply chain), ngen.ca (manufacturing), and protein.ca (agri-food protein) for current calls. Superclusters are project-specific, collaborative, and best suited for companies solving problems relevant to their specific industry focus." },
                    { q: "Can I use a grant writer or consultant to apply for SDTC, and is it worth the cost?", a: "For SDTC specifically, engaging a consultant with direct SDTC grant experience is almost always worth the cost. SDTC applications require precise technical framing (TRL documentation, consortium structure, environmental quantification), adherence to specific SDTC scoring criteria, and a commercialization plan that satisfies both technical and business reviewers. A consultant who has successfully guided 3–5 previous SDTC applications knows exactly how to frame your technology story, quantify your environmental benefit, and structure the consortium. Given that SDTC grants range from $500K to $10M, a consulting fee of $20K–$50K is economically rational for any project with a realistic chance of SDTC funding. For IRAP and SR&ED, internal management with program officer guidance is usually sufficient at the SME level." },
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
              <Card className="bg-blue-800 text-white">
                <CardContent className="pt-6">
                  <Star className="h-8 w-8 text-yellow-300 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Free Innovation Grant Matching</h3>
                  <p className="text-blue-100 text-sm mb-4">Our specialists build your complete IRAP + SR&ED + SDTC + NSERC stack — identifying every program your tech company qualifies for. Free 30-min session.</p>
                  <Link href="/contact"><Button className="w-full bg-white text-blue-800 hover:bg-blue-50">Get Free Matching <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
                </CardContent>
              </Card>
              <NewsletterSignup variant="sidebar" />
              <Card>
                <CardHeader><CardTitle className="text-lg">Key Program Contacts</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-3">
                  <div><div className="font-semibold">NRC IRAP</div><div className="text-gray-500">nrc.canada.ca/irap</div></div>
                  <div><div className="font-semibold">SR&ED (CRA)</div><div className="text-gray-500">canada.ca/sred</div></div>
                  <div><div className="font-semibold">SDTC</div><div className="text-gray-500">sdtc.ca</div></div>
                  <div><div className="font-semibold">NSERC</div><div className="text-gray-500">nserc-crsng.gc.ca</div></div>
                  <div><div className="font-semibold">SIF (ISED)</div><div className="text-gray-500">ised-isde.canada.ca/sif</div></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Related Resources</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <Link href="/blog/sred-tax-credit-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> SR&ED Complete Guide</Link>
                    <Link href="/blog/irap-nrc-canada-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> IRAP Complete Guide</Link>
                    <Link href="/canada/government-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Federal Canadian Grants</Link>
                    <Link href="/canada/green-energy-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Canada Green Energy Grants</Link>
                    <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder Tool</Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-8">
            <NewsletterSignup title="Canada Innovation Grant Updates" description="Track SDTC intake cycles, IRAP priority sector shifts, SR&ED rate changes, and SIF program announcements — delivered to your inbox." />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
