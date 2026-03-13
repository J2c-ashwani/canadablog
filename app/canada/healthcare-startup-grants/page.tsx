import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, CheckCircle, ArrowRight, Building, Lightbulb, FileText, AlertCircle, Star } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
    title: "Canada Healthcare Startup Grants 2026 | CIHR, IRAP Medtech & SR&ED Funding Guide",
    description: "Complete guide to Canada healthcare startup grants in 2026. CIHR grants, NRC IRAP for medtech ($50K–$2M), SR&ED tax credits (35% for SMEs), provincial medtech programs BC, Ontario, Quebec, and Health Canada regulatory funding streams for Canadian health innovation companies.",
    keywords: "Canada healthcare startup grants 2026, medtech grants Canada, CIHR grants, IRAP healthcare funding, SR&ED healthcare, Ontario medtech grants, BC health innovation grants, Canada digital health grants, Health Canada innovation funding",
    alternates: { canonical: "https://www.fsidigital.ca/canada/healthcare-startup-grants" },
    openGraph: { title: "Canada Healthcare Startup Grants 2026 | CIHR, IRAP, SR&ED Guide", description: "Discover Canadian healthcare and medtech startup grants — CIHR, IRAP, SR&ED, and provincial health innovation programs for 2026.", url: "https://www.fsidigital.ca/canada/healthcare-startup-grants" },
}

const healthcareGrants: Grant[] = [
    { id: "ca-cihr-industry", name: "CIHR Industry-Partnered Collaborative Research (IPCR)", fundingMin: 300000, fundingMax: 1000000, eligibility: ["Academic researchers with industry health company partners", "Canadian universities and research hospitals", "Healthcare companies funding 50% of collaboration cost"], deadline: "Bi-annual — check cihr-irsc.gc.ca for current funding opportunities", applicationLink: "https://cihr-irsc.gc.ca/e/3781.html", description: "CIHR grants for joint research between academic institutions and healthcare industry partners. Industry partner must contribute ≥50% matching funding. Covers clinical research, health technology, and biomedical R&D.", country: "Canada", region: "Federal", category: "Health Research", agency: "Canadian Institutes of Health Research", status: "Active", tags: ["Clinical Research", "Academic Partnership", "Biomedical"], requirements: ["Canadian academic institution lead", "Industry partner with ≥50% match", "Peer-reviewed research design", "Health research focus"], lastUpdated: "2026-01-01" },
    { id: "ca-irap-health", name: "NRC IRAP Healthcare & Medtech Stream", fundingMin: 50000, fundingMax: 2000000, eligibility: ["Canadian SMEs with fewer than 500 employees", "Healthcare technology, medtech, digital health, diagnostics companies", "Companies with defined R&D projects"], deadline: "Rolling — contact NRC ITA advisor in your region", applicationLink: "https://nrc.canada.ca/en/support-technology-innovation/nrc-industrial-research-assistance-program", description: "NRC IRAP R&D funding covering wages of technical employees and contractors working on healthcare product development — from diagnostic devices to digital health platforms to pharmaceutical formulations.", country: "Canada", region: "Federal", category: "R&D", agency: "National Research Council — IRAP", status: "Active", tags: ["IRAP", "Medtech", "Digital Health", "R&D Wages"], requirements: ["Canadian SME", "Technical R&D project", "NRC ITA relationship", "Commercial health product goal"], lastUpdated: "2026-01-01" },
    { id: "ca-sred-health", name: "SR&ED Tax Credit (Healthcare R&D)", fundingMin: 50000, fundingMax: 5000000, eligibility: ["All Canadian corporations conducting health-related R&D", "Pharma, biotech, medtech, digital health, diagnostics", "SMEs qualify for enhanced 35% refundable credit"], deadline: "Filed with annual corporate tax return (T2)", applicationLink: "https://www.canada.ca/en/revenue-agency/services/scientific-research-experimental-development-tax-incentive-program.html", description: "Canada's largest R&D incentive, covering 15–35% of qualifying health R&D expenditures. Healthcare is one of SRED's top categories — clinical trial costs, software development, device testing, and new formulation work all qualify.", country: "Canada", region: "Federal", category: "Tax Credit", agency: "Canada Revenue Agency", status: "Active", tags: ["SR&ED", "Tax Credit", "Clinical Research", "Biotech"], requirements: ["Canadian incorporation", "Qualifying scientific or technological uncertainty", "R&D primarily in Canada", "Annual CRA T661 form filing"], lastUpdated: "2026-01-01" },
    { id: "ca-ocre-health", name: "Ontario Centre for Innovation (OCI) Health Programs", fundingMin: 50000, fundingMax: 500000, eligibility: ["Ontario-based health tech SMEs", "Companies with university research partner", "Proof-of-concept or prototype stage"], deadline: "Rolling intake — oc-innovation.ca", applicationLink: "https://oc-innovation.ca/programs/", description: "OCI's Voucher for Innovation and Productivity (VIP) and Digital Health programs provide matching grants for Ontario health tech companies developing new medical devices, digital health platforms, and diagnostics.", country: "Canada", region: "Ontario", category: "Provincial", agency: "Ontario Centres for Innovation", status: "Active", tags: ["Ontario", "Digital Health", "Medtech", "Voucher"], requirements: ["Ontario-incorporated company", "University research collaboration", "Matching investment from company", "Health technology focus"], lastUpdated: "2026-01-01" },
    { id: "ca-sdtc-health", name: "SDTC — Health Environmental Cleantech Stream", fundingMin: 500000, fundingMax: 5000000, eligibility: ["Canadian health companies with environmental/clean tech angle", "Water-borne health technology, clean pharma, biosystems"], deadline: "Bi-annual SDTC intake — sdtc.ca", applicationLink: "https://www.sdtc.ca/en/apply/", description: "SDTC funds health technologies at the intersection of clean technology — water purification, bioremediation, clean pharmaceutical manufacturing, and environmental health monitoring.", country: "Canada", region: "Federal", category: "Health + Cleantech", agency: "SDTC", status: "Active", tags: ["Cleantech", "Health", "Environmental"], requirements: ["Environmental or clean tech component", "Demonstration project", "Consortium partners", "TRL 3–7"], lastUpdated: "2026-01-01" },
]

export default function HealthcareStartupGrantsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-rose-50">
            <Header />

            <section className="bg-gradient-to-br from-rose-700 via-pink-800 to-red-900 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Heart className="h-6 w-6 text-rose-300" />
                            <Badge className="bg-rose-500/30 text-rose-100 border-rose-400">Canada Healthcare Startup Funding 2026</Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Canada Healthcare Startup Grants 2026</h1>
            <div className="mt-8 mb-4 text-left">
              <ShortAnswerBox
                question="What government grants are available for healthcare startups in Canada?"
                content="Yes — Canadian healthcare startups have access to NRC IRAP ($50K–$2M for medtech R&D wages), SR&ED tax credits (35% refundable for SMEs on all qualifying health R&D), CIHR academic-industry collaboration grants ($300K–$1M), provincial health innovation programs in Ontario, BC, Quebec, and Alberta, plus SDTC for health-environment cross-over technologies. Strategic stacking of these programs can provide $2M–$5M non-dilutive through preclinical and early regulatory stages."
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
                        {["IRAP Medtech", "SR&ED Health", "CIHR Grants", "Provincial Programs", "How to Apply", "FAQ"].map((item) => (
                            <Badge key={item} variant="outline" className="cursor-pointer hover:bg-rose-50 px-3 py-1.5 text-sm">{item}</Badge>
                        ))}
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Canada Healthcare Startup Grants — Quick Comparison 2026</h2>
                        <p className="text-gray-600 mb-6">Compare key healthcare innovation programs by stage, funding range, and application approach. SR&ED is the broadest and most accessible — if you&apos;re doing any health technology R&D in Canada, SR&ED should be your first priority.</p>
                        <GrantComparisonTable grants={healthcareGrants} title="Canada Healthcare Startup Programs Comparison" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-10">

                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Building className="h-5 w-5 text-rose-600" />Canada&apos;s Healthcare Startup Funding Landscape — The Full Picture</CardTitle></CardHeader>
                                <CardContent className="text-gray-700 space-y-4">
                                    <p className="leading-relaxed">
                                        Canada is home to over 1,400 health technology companies and receives more than $1.5B annually in public funding
                                        for health R&D — not including the SR&ED tax credit (which alone distributes $3.5B+ annually across all sectors,
                                        with healthcare as one of the top three categories). The funding ecosystem spans four parallel tracks:
                                        <strong>federal grants</strong> (CIHR, IRAP), <strong>federal tax credits</strong> (SR&ED, most impactful),
                                        <strong>provincial innovation programs</strong> (Ontario OCI, BC Life Sciences, Quebec BIO, Alberta Innovates),
                                        and <strong>regulatory pathway support</strong> (Health Canada's pre-submission meetings, Medical Device Single
                                        Audit Program cost-sharing). Most healthcare startups access 2–3 of these tracks simultaneously.
                                    </p>
                                    <p className="leading-relaxed">
                                        The single most important program for any Canadian healthcare company conducting R&D — whether in drug formulation,
                                        medical device design, digital health software, or diagnostic assay development — is the <strong>SR&ED
                                            (Scientific Research and Experimental Development) tax credit</strong>. SR&ED provides a 35% refundable tax credit
                                        for Canadian-controlled private corporations (CCPCs) on qualifying R&D expenditures (salaries, contractor fees,
                                        materials consumed in experiments, and overhead based on a proxy formula). For a healthcare SME spending $1M
                                        on qualifying R&D, this is an automatic $350,000 CRA refund — requiring a single annual tax filing, no separate
                                        grant application, no ministry approval.
                                    </p>
                                    <p className="leading-relaxed">
                                        The second most important program is <strong>NRC IRAP</strong>, which complements SR&ED by funding the same
                                        expenses (R&D wages, sub-contractors) before they're incurred — providing working capital during the R&D year,
                                        while SR&ED provides a refund after the year-end. Combined, IRAP + SR&ED can cover 70–90% of your technical
                                        team's salary costs through the first phase of product development, leaving equity capital available for
                                        clinical trials and regulatory submissions rather than basic prototype development.
                                    </p>
                                    <p className="leading-relaxed">
                                        At a provincial level, <strong>Ontario Centres for Innovation (OCI)</strong> provides voucher-based matching grants
                                        for Ontario health tech companies partnering with university researchers — up to $500K to accelerate device or
                                        software development using academic engineering, clinical validation, or data science expertise. British Columbia's
                                        <strong>Genome BC</strong>, <strong>BC Tech Fund</strong>, and <strong>BC Centre for Disease Control</strong>
                                        innovation programs provide additional province-specific funding for genomics, infectious disease diagnostics,
                                        and health data technology companies in BC.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* SR&ED Deep Dive for Healthcare */}
                            <Card className="border-2 border-rose-200 bg-rose-50">
                                <CardHeader><CardTitle className="text-xl text-rose-900">SR&ED Tax Credit for Healthcare: What Qualifies and What Doesn&apos;t</CardTitle></CardHeader>
                                <CardContent className="text-rose-900">
                                    <p className="text-sm mb-5 leading-relaxed">
                                        SR&ED is the most misunderstood funding program in Canadian healthcare. Many companies over-claim (resulting in CRA
                                        audits) or under-claim (leaving hundreds of thousands in refunds uncollected). Here&apos;s a practical breakdown for
                                        healthcare companies:
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="bg-white rounded-lg p-4 border border-rose-200">
                                            <div className="font-bold text-green-800 mb-3 text-sm flex items-center gap-1.5"><CheckCircle className="h-4 w-4" /> Generally Qualifies for SR&ED</div>
                                            <ul className="text-xs space-y-1.5 text-gray-700">
                                                <li>• Novel drug formulation or delivery system development</li>
                                                <li>• Medical device prototype design and testing (if technological uncertainty exists)</li>
                                                <li>• New diagnostic assay or biomarker development</li>
                                                <li>• AI/ML algorithm development for clinical decision support (if novel)</li>
                                                <li>• Clinical software with new architecture or data integration methods</li>
                                                <li>• Bioprocessing optimization with genuine experimental work</li>
                                                <li>• Materials science work on implants or biosensors</li>
                                                <li>• Pre-clinical lab research on efficacy and safety (animal models, in vitro)</li>
                                            </ul>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 border border-rose-200">
                                            <div className="font-bold text-red-800 mb-3 text-sm flex items-center gap-1.5"><AlertCircle className="h-4 w-4" /> Generally Does NOT Qualify</div>
                                            <ul className="text-xs space-y-1.5 text-gray-700">
                                                <li>• Clinical trials themselves (patient-level testing) — in most cases</li>
                                                <li>• Market research or clinical needs assessment</li>
                                                <li>• Regulatory documentation writing without technical development</li>
                                                <li>• Routine software maintenance, bug fixes, or UI updates</li>
                                                <li>• Quality assurance testing of a product already developed</li>
                                                <li>• Standard data collection without new methodology development</li>
                                                <li>• Health economics analysis or health technology assessment</li>
                                                <li>• Off-the-shelf software customization without fundamental development</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-rose-200 mt-4">
                                        <div className="font-semibold text-rose-900 mb-2 text-sm">💡 SR&ED Credit Rates for Healthcare Companies</div>
                                        <div className="grid grid-cols-3 gap-4 text-center text-sm">
                                            <div><div className="font-bold text-rose-700 text-xl">35%</div><div className="text-xs text-gray-600">CCPC (small business) on first $3M</div></div>
                                            <div><div className="font-bold text-rose-700 text-xl">15%</div><div className="text-xs text-gray-600">Larger or non-CCPC companies</div></div>
                                            <div><div className="font-bold text-rose-700 text-xl">Refundable</div><div className="text-xs text-gray-600">CCPC portion — paid as cash even with no tax owing</div></div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Program Deep Dives */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Healthcare Grant Programs — Detailed Breakdown</h2>
                                <p className="text-gray-600 mb-6">In-depth analysis of each healthcare funding program — including the application mechanics, what documentation you need, key success factors, and how to combine programs for maximum impact.</p>
                                <div className="space-y-6">

                                    <Card className="border-l-4 border-l-rose-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">1. NRC IRAP Healthcare & Medtech Stream</CardTitle>
                                                <Badge className="bg-rose-100 text-rose-800 shrink-0 ml-2">$50K – $2M</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                NRC IRAP is the most accessible and fastest-disbursing federal funding program for Canadian healthcare SMEs.
                                                An ITA (Industrial Technology Advisor) — a regional NRC advisor with sector-specific technical expertise —
                                                becomes your ongoing funding partner, not just a grant reviewer. Once you establish an ITA relationship,
                                                they can provide advisory project support (free), help structure your IRAP applications over multiple years,
                                                and refer you to complementary programs (SDTC, CIHR partnerships, provincial programs) at appropriate stages.
                                            </p>
                                            <p>
                                                For healthcare companies, IRAP-eligible activities include: medical device prototype engineering and testing,
                                                diagnostic algorithm development, clinical software architecture and health data integration, pharmaceutical
                                                formulation R&D, regulatory-grade analytical method development, and bioprocessing scale-up requiring genuine
                                                scientific problem-solving. The key qualifying criterion is <em>technological uncertainty</em>: your project
                                                must involve a genuine scientific or engineering challenge where the outcome isn't predetermined by standard
                                                engineering practice.
                                            </p>
                                            <div className="grid sm:grid-cols-2 gap-4 mt-4">
                                                <div className="bg-rose-50 rounded-lg p-4">
                                                    <div className="font-semibold text-rose-900 mb-2 text-sm">Best for Healthcare When:</div>
                                                    <ul className="text-xs text-rose-700 space-y-1">
                                                        <li>• Device is at concept validation or prototype stage</li>
                                                        <li>• Software is building genuinely novel clinical algorithms</li>
                                                        <li>• Pre-clinical lab work is underway but not yet in human trials</li>
                                                        <li>• Your team is primarily engineers or scientists (salary-intensive)</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg p-4">
                                                    <div className="font-semibold text-gray-900 mb-2 text-sm">Less suitable when:</div>
                                                    <ul className="text-xs text-gray-600 space-y-1">
                                                        <li>• Primary activity is running clinical trials</li>
                                                        <li>• Work is regulatory consulting, not R&D</li>
                                                        <li>• Company is a healthcare service, not a product developer</li>
                                                        <li>• Company has over 500 employees</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-blue-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">2. CIHR Industry-Partnered Collaborative Research</CardTitle>
                                                <Badge className="bg-blue-100 text-blue-800 shrink-0 ml-2">$300K – $1M</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                CIHR's Industry-Partnered Collaborative Research (IPCR) program provides $300K–$1M over 3–5 years for
                                                joint research projects between Canadian academic institutions or research hospitals and industry partners.
                                                The program is explicitly designed to bridge the gap between academic health research and commercial health
                                                product development — funding the translational research phase where academic expertise needs industry
                                                investment and commercial context to reach products.
                                            </p>
                                            <p>
                                                The mechanics: your company commits to matching 50% or more of the total project cost (cash, in-kind, or
                                                a combination). CIHR then provides the remaining portion as a grant to the academic institution — which
                                                employs researchers, purchases equipment, and delivers agreed deliverables back to your company. Your
                                                company retains commercial rights to IP developed (negotiated in the Research Partnership Agreement),
                                                and the academic institution retains publication rights to underlying science (with a delay for patent
                                                filing if required).
                                            </p>
                                            <p>
                                                CIHR is particularly valuable for biotech, pharmaceutical, and diagnostic companies that need clinical
                                                validation, patient cohort data, access to biobanks, or specialized lab infrastructure that would cost
                                                $500K–$2M to replicate independently. By partnering with the university, your company accesses this
                                                infrastructure through the grant, while CIHR funds a significant portion of the operating costs.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-purple-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">3. Ontario Centres for Innovation (OCI) Health Programs</CardTitle>
                                                <Badge className="bg-purple-100 text-purple-800 shrink-0 ml-2">$50K – $500K</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                Ontario is the largest single hub for Canadian health technology — home to MaRS Health, the Toronto life
                                                sciences cluster, Communitech health programs (Waterloo), and the OCI (Ontario Centres for Innovation).
                                                OCI operates several health-relevant programs: the <strong>Voucher for Innovation and Productivity (VIP)</strong>
                                                which provides $50K–$100K matching grants for health tech companies accessing university research expertise;
                                                the <strong>Collaborative Research and Development grant</strong> ($100K–$500K) for Ontario health SMEs
                                                partnering with Ontario universities on applied research; and the <strong>Digital Health Spectrum pilot</strong>
                                                supporting digital health platform development with an Ontario clinical partner.
                                            </p>
                                            <p>
                                                OCI programs require an Ontario-based company and an Ontario university research partner. The application
                                                process is administered through oc-innovation.ca, with intake cycles typically running 2–3 times per year.
                                                For companies based at MaRS or one of the Ontario innovation hubs, OCI program managers often provide
                                                pre-application guidance and warm referrals through the hub relationship.
                                            </p>
                                        </CardContent>
                                    </Card>

                                </div>
                            </div>

                            {/* Provincial Table */}
                            <Card className="bg-purple-50 border-purple-200">
                                <CardHeader><CardTitle className="text-xl text-purple-900">Provincial Healthcare Startup Grants — By Province</CardTitle></CardHeader>
                                <CardContent className="text-purple-900">
                                    <div className="space-y-4 text-sm">
                                        {[
                                            { prov: "Ontario", programs: "OCI VIP ($50K–$100K), OCI CRD ($100K–$500K), Ontario Bioscience Innovation Organization (OBIO), MaRS Investment Accelerator", contact: "oc-innovation.ca, obiocanada.ca" },
                                            { prov: "British Columbia", programs: "Genome BC grants ($100K–$2M for genomics/biomarker companies), BC Tech Fund (health tech priority), BCCDC innovation programs for infectious disease diagnostics", contact: "genomebc.ca, bctechfund.ca" },
                                            { prov: "Quebec", programs: "BIO Québec innovation grants, FRQS (health research fund — primarily academic), Investissement Québec health startup bridge loans ($500K–$5M)", contact: "bioquebec.com, frqs.gouv.qc.ca" },
                                            { prov: "Alberta", programs: "Alberta Innovates Health Solutions program ($50K–$500K), Genome Alberta, Alberta Science and Research Authority health grants", contact: "albertainnovates.ca" },
                                        ].map(({ prov, programs, contact }) => (
                                            <div key={prov} className="bg-white rounded-lg p-4 border border-purple-200">
                                                <div className="font-bold text-purple-900 mb-1">{prov}</div>
                                                <div className="text-gray-700 mb-1"><strong>Programs:</strong> {programs}</div>
                                                <div className="text-gray-500 text-xs"><strong>Contact:</strong> {contact}</div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* How to Apply */}
                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><FileText className="h-5 w-5 text-rose-600" />How to Apply — Canada Healthcare Startup Grants Step by Step</CardTitle></CardHeader>
                                <CardContent className="text-gray-700">
                                    <div className="space-y-4">
                                        {[
                                            { step: "1", title: "Register SR&ED From Your Very First R&D Day", desc: "SR&ED is claimed retroactively through your annual T2 corporate tax return, but the qualifying activities must be documented as they occur — not reconstructed after the fact. From the first day you write a novel health algorithm, design a prototype device, or run a scientific experiment, begin contemporaneous documentation: lab notebooks, pull requests (for software), meeting minutes on technical decisions, and time tracking by employee for R&D vs non-R&D hours. Reconstructed SR&ED claims that lack contemporaneous documentation are rejected at significantly higher rates and attract CRA audits." },
                                            { step: "2", title: "Contact Your Regional NRC IRAP Industrial Technology Advisor (ITA)", desc: "Find your ITA at nrc.canada.ca/en/support-technology-innovation. Contact them before your next R&D phase begins — not mid-project. Your ITA will arrange an initial Advisory Assessment visit (free, no obligation), review your technical project, assess IRAP eligibility, and advise on the project structuring and budget that maximizes IRAP funding. Healthcare-focused ITAs are assigned based on your province and sector — ask specifically for an ITA with life sciences or medtech experience when contacting the regional NRC office." },
                                            { step: "3", title: "Identify Your University Research Partner for CIHR or OCI", desc: "CIHR and OCI both require an academic institution partner. Start by identifying 2–3 faculty members at Canadian research universities whose labs work in areas directly relevant to your product development need. The match is most valuable when the academic partner has capabilities (cohort access, biobank, specialized lab equipment, clinical trial infrastructure) that would cost your company $500K+ to replicate internally. Email the researcher directly with a one-page summary of your commercial need — most academic researchers receive external industry partnership inquiries favourably and can respond within a week." },
                                            { step: "4", title: "Apply to Provincial Programs for Your Jurisdiction", desc: "After filing your IRAP application, identify the provincial program for your province: OCI (Ontario), Genome BC (BC, if genomics/biomarker focused), Alberta Innovates (Alberta), or BIO Québec (Quebec). Provincial programs have different intake schedules — some quarterly, some biannual. Check the program websites for current call status and confirm whether a university partner is required (most provincial programs do require it)." },
                                            { step: "5", title: "Engage Health Canada Early for Regulatory Intelligence", desc: "Regulatory pathway clarity significantly strengthens your grant applications because it demonstrates market access viability. Health Canada's pre-submission meetings (for medical devices and drugs) are free and provide formal guidance on your regulatory strategy. Attending a pre-submission meeting before your IRAP or OCI application allows you to accurately describe your regulatory path, timeline, and the role of your R&D activities in achieving regulatory clearance — making your applications more credible to non-clinical reviewers." },
                                            { step: "6", title: "Layer SR&ED and IRAP as the Baseline Before Stacking Others", desc: "The optimal healthcare funding sequence: IRAP (wages funded during R&D) + SR&ED (35% refund after year-end) as the continuous baseline throughout product development → add CIHR or OCI for university-partnered validation phases → add provincial programs for jurisdiction-specific supplementation. Very few companies in Canada fully utilize all four tracks simultaneously — those that do commonly raise $2M–$5M non-dilutively through their first 3 years without any equity financing." },
                                        ].map((item) => (
                                            <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="h-8 w-8 rounded-full bg-rose-700 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                                                <div><div className="font-semibold text-gray-900 mb-1">{item.title}</div><div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div></div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Common Mistakes */}
                            <Card className="border-red-100 bg-red-50">
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-red-900"><AlertCircle className="h-5 w-5 text-red-600" />5 Costly Mistakes Healthcare Startups Make with Canadian Grants</CardTitle></CardHeader>
                                <CardContent className="text-red-900 space-y-4">
                                    {[
                                        { n: "1", m: "Not Filing SR&ED Because Clinical Trials 'Don't Qualify'", d: "Many healthcare founders assume SR&ED requires basic laboratory research and that clinical activities don't qualify. While human clinical trials themselves typically don't qualify, the vast majority of pre-clinical activities do: device prototyping, novel software development, assay design and validation, bioprocessing optimization, and regulatory-grade analytical method development all qualify. A healthcare SME spending $800K on pre-clinical R&D activities and not filing SR&ED is leaving $280,000 in refundable credits unclaimed annually." },
                                        { n: "2", m: "Weak SR&ED Documentation Leading to CRA Audit and Denial", d: "SR&ED is the highest-audited corporate tax program in Canada. CRA auditors specifically look for: contemporaneous lab notebooks/engineering records, time tracking showing which employees worked on qualifying activities, clear descriptions of the technological uncertainty and experimental approach, and evidence of iteration (trial and error, hypothesis testing). Healthcare companies that reconstruct their SR&ED documentation at year-end — instead of documenting in real time — face denial rates 5–10x higher than companies with contemporaneous records." },
                                        { n: "3", m: "Approaching CIHR Applications as Grant Proposals Rather Than Industry Contracts", d: "CIHR's IPCR program is peer-reviewed academic grant funding — but the industry partner component means your commercial objectives drive the project design. Many healthcare companies submit industry-led proposals that read too commercially (rejected by academic reviewers for insufficient scientific merit) or too academically (rejected by industry perspective reviewers for insufficient commercialization clarity). The winning CIHR-IPCR application is one that a clinical scientist would find scientifically rigorous AND that a product manager would find commercially valuable. Both halves matter equally." },
                                        { n: "4", m: "Missing IRAP Because 'We Only Have Small R&D Activities'", d: "IRAP has no minimum threshold — projects as small as $50K are funded. A single software engineer spending 60% of their time on novel algorithm development for a healthcare application is an IRAP-eligible project. Many health SMEs assume IRAP requires a dedicated R&D department or formal research infrastructure. They're wrong: IRAP funds the genuine technical work done by any employee or contractor, regardless of how it's organized internally. The key question is: is there technological uncertainty, and are Canadian people solving it?" },
                                        { n: "5", m: "Missing Provincial Programs by Not Monitoring Intake Cycles", d: "OCI (Ontario), Genome BC, Alberta Innovates, and BIO Québec all have fixed intake cycles. Missing a cycle can mean 6–12 months until the next opportunity. Many healthcare founders focus on continuous-intake federal programs (IRAP, SR&ED) and miss the large, periodic provincial grants that could provide $100K–$500K per cycle. Set calendar reminders for provincial program intake dates at the start of each year and assign responsibility to a specific team member to monitor and submit applications on time." },
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
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-amber-800"><Lightbulb className="h-5 w-5 text-amber-600" />Expert Strategy: Canadian Healthcare Startup Funding Stack</CardTitle></CardHeader>
                                <CardContent className="text-amber-900 space-y-4">
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 The Full Pre-Clinical Funding Stack: $2M+ Non-Dilutively</div>
                                        <p className="text-sm leading-relaxed">A Canadian medtech or biotech company spending $1.5M over 3 years on pre-clinical R&D can construct this non-dilutive stack: IRAP Year 1 ($300K for R&D wages) + SR&ED Year 1 ($175K refund on $500K qualifying spend) + CIHR IPCR Year 1-3 ($300K grant portion) + OCI VIP ($75K UI/clinical validation support) + provincial program ($150K). Total: ~$1M in non-dilutive funding over 3 years on a $1.5M R&D program — reducing the equity required by 66%. This is the standard approach used by founding teams at leading Canadian medtech companies.</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 Use IRAP to Fund the Same Expenses Before SR&ED Refunds Them After</div>
                                        <p className="text-sm leading-relaxed">IRAP and SR&ED together address the cash flow problem of R&D-intensive companies. IRAP provides funding during the fiscal year for engineering salaries and contractor fees — before you have revenue to pay them from. SR&ED then refunds 35% of those same salaries and fees after your fiscal year closes and you file your T2. The effective result: on $500K in qualifying R&D salaries, IRAP might cover $200K during the year + SR&ED refunds $175K afterward = $375K of $500K recovered. Your real cost of $500K in R&D talent becomes $125K — an extraordinary capital efficiency for building a healthcare product.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* FAQ */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">FAQ: Canada Healthcare Startup Grants 2026</h2>
                                <p className="text-gray-600 mb-6">Most common questions from Canadian medtech founders, digital health CTOs, and biotech CFOs navigating the federal and provincial funding landscape.</p>
                                <div className="space-y-4">
                                    {[
                                        { q: "Can a digital health company that doesn't make physical devices access SR&ED?", a: "Absolutely — and digital health software companies are some of SR&ED's most successful applicants. SR&ED qualifies activities involving scientific or technological uncertainty, and software development regularly meets this test when it involves: novel machine learning model architectures for clinical prediction, new approaches to health data integration (EHR interoperability, real-world data feeds), genuinely novel NLP methods for clinical text processing, or new computational biology methods for drug or biomarker discovery. Routine software maintenance, feature additions to established systems, and standard UI development do not qualify. The distinction is whether you faced genuine technical uncertainty requiring trial-and-error experimentation." },
                                        { q: "Do Phase 1 or Phase 2 clinical trials qualify for SR&ED or IRAP?", a: "Clinical trials as a category are complex under SR&ED. The actual conduct of clinical trials (patient recruitment, dosing, data collection from human subjects) generally does not qualify for SR&ED because it involves testing a hypothesis rather than advancing scientific knowledge in a technically uncertain environment. However, associated R&D activities during a clinical phase do often qualify: developing and validating new biomarker assays used in the trial, creating novel statistical analysis methods for the trial data, engineering a new data capture device used in the trial, or developing novel formulations tested in the trial. Under IRAP, clinical-adjacent device engineering and software development also qualify. Engage a specialized SR&ED consultant with pharma/biotech experience before writing off clinical-phase SR&ED entirely." },
                                        { q: "Can a healthcare company receive both IRAP and SR&ED for the same project?", a: "Yes — and this is the optimal arrangement. IRAP and SR&ED work together without conflict, but with an important accounting rule: if IRAP funded a specific salary expense (say, $60K of an engineer's $100K salary), your SR&ED claim on that salary is reduced by the IRAP grant received on it. The remaining $40K of that engineer's salary is still eligible for the 35% SR&ED credit ($14K refund). The effective result is IRAP covers upfront cash, and SR&ED refunds a portion of the remaining unsubsidized R&D expenses. Total recovery on $100K salary: $60K IRAP + $14K SR&ED = $74K recovered from two government sources." },
                                        { q: "Is there a specific Health Canada grant for regulatory path development?", a: "Health Canada itself doesn't provide grants for regulatory submission preparation. However, several programs help indirectly: IRAP can fund the development of analytical testing methods and validation studies required for regulatory submissions (these involve technological uncertainty and qualify as R&D). The Medical Device Single Audit Program (MDSAP) cost-sharing through Global Affairs Canada helps fund international regulatory harmonization for export-ready medical devices. For drug companies, CIHR's translational research programs fund the pre-IND research that generates the data package needed for Health Canada submissions. Engage Health Canada's pre-submission consultation service early — it's free and significantly reduces the cost of your regulatory development by clarifying exactly what evidence is required." },
                                        { q: "What is MaRS and how does it support Toronto healthcare startups?", a: "MaRS Discovery District in Toronto is Canada's largest urban innovation hub and the most important institutional support system for Toronto healthcare startups. MaRS provides: free access to sector experts in medtech, digital health, and life sciences; investment readiness programming (pitch prep, financial model review); connections to IRAP, OCI, CIHR, and provincial program officers; clinical partnership brokering with Toronto's major hospital networks (UHN, Sinai Health, SickKids, CAMH); and direct investment through the MaRS Investment Accelerator Fund for Ontario companies at seed stage. All healthcare startups in the Toronto/Golden Horseshoe region should be registered members of MaRS — membership is free and provides access to events and networks unavailable elsewhere." },
                                        { q: "Can a US-incorporated healthcare company apply for Canadian grants by opening a subsidiary?", a: "Yes — a Canadian subsidiary of a US healthcare company can apply for IRAP and most provincial programs, as long as genuine R&D activity (Canadian employees, Canadian R&D facilities, Canadian-based IP development) occurs in Canada. For SR&ED, the subsidiary must be a Canadian-Controlled Private Corporation (CCPC) to access the full 35% refundable rate — foreign-controlled subsidiaries qualify for a 15% non-refundable SR&ED credit instead. CIHR and SDTC require Canadian institution leads but can include industry partners who are foreign-controlled Canadian subsidiaries. For maximum SR&ED benefit, structure the Canadian entity to maintain CCPC status for as long as possible." },
                                        { q: "Are there healthcare-specific grants for Indigenous health technology companies in Canada?", a: "Yes — Indigenous health technology companies have access to both Indigenous-specific funding (AEP grants, NACCA AFI loans, Métis Capital Corporation programs) and mainstream healthcare innovation grants (IRAP, SR&ED, OCI, provincial programs). Additionally, CIHR has a dedicated Institute of Indigenous Peoples' Health that funds Indigenous health research — including technology projects addressing Indigenous health disparities. The First Nations Health Authority (BC), First Nations Information Governance Centre, and provincial Indigenous health authorities all have innovation program streams for technology addressing specific Indigenous health needs. The combination of Indigenous-specific business support and health sector innovation grants is a particularly powerful funding stack for companies working on Indigenous health technology." },
                                        { q: "What documentation do I need for an NRC IRAP healthcare application?", a: "IRAP applications for healthcare companies need: (1) Company profile — incorporation certificate, corporate structure, current team bios with technical credentials and relevant sector experience. (2) Technology description — a clear explanation of your healthcare product concept, the clinical need it addresses, and why your approach is scientifically novel. (3) Project plan — specific R&D activities, milestones, timeline, and deliverables for the IRAP-funded period (typically 6–18 months). (4) Budget breakdown — by employee name, role, percentage of time on qualifying R&D, salary, and fringe benefit costs, plus any contractor or materials costs. (5) Regulatory pathway summary — a brief overview of your Health Canada (or FDA, for export-focused products) regulatory strategy. Your ITA will help refine these documents once you've made initial contact." },
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
                            <Card className="bg-rose-700 text-white">
                                <CardContent className="pt-6">
                                    <Star className="h-8 w-8 text-yellow-300 mb-3" />
                                    <h3 className="font-bold text-lg mb-2">Free Healthcare Grant Matching</h3>
                                    <p className="text-rose-100 text-sm mb-4">Our healthcare grant specialists identify your full IRAP, SR&ED, CIHR, and provincial funding stack — free 30-minute consultation.</p>
                                    <Link href="/contact"><Button className="w-full bg-white text-rose-700 hover:bg-rose-50">Get Free Matching <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
                                </CardContent>
                            </Card>
                            <NewsletterSignup variant="sidebar" />
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Key Agency Contacts</CardTitle></CardHeader>
                                <CardContent className="text-sm space-y-3">
                                    <div><div className="font-semibold">NRC IRAP</div><div className="text-gray-500">nrc.canada.ca/irap</div></div>
                                    <div><div className="font-semibold">CIHR</div><div className="text-gray-500">cihr-irsc.gc.ca | (613) 954-1968</div></div>
                                    <div><div className="font-semibold">OCI (Ontario)</div><div className="text-gray-500">oc-innovation.ca</div></div>
                                    <div><div className="font-semibold">Genome BC</div><div className="text-gray-500">genomebc.ca</div></div>
                                    <div><div className="font-semibold">Alberta Innovates</div><div className="text-gray-500">albertainnovates.ca</div></div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Related Resources</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <Link href="/blog/sred-tax-credit-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> SR&ED Tax Credit Complete Guide</Link>
                                        <Link href="/blog/irap-nrc-canada-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> IRAP Complete Guide</Link>
                                        <Link href="/canada/government-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Federal Canadian Grants</Link>
                                        <Link href="/canada/innovation-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Canada Innovation Grants</Link>
                                        <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder Tool</Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mb-8">
                        <NewsletterSignup title="Canada Healthcare Grant Updates" description="Track CIHR intake openings, IRAP cleantech/health priority shifts, OCI program cycles, and provincial health innovation grant announcements." />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
