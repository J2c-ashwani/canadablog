import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, CheckCircle, ArrowRight, Lightbulb, FileText, Star, Heart } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
    title: "Healthcare Startup Grants Canada 2026 | $1.2B+ in Health Innovation Funding",
    description:
        "Complete guide to healthcare startup grants in Canada 2026. CIHR SBIR-equivalent funding, IRAP for medical devices, CQDM, MaRS Health, Ontario MOHLTC grants, and SR&ED credits covering 35–65% of health research expenses.",
    keywords:
        "healthcare startup grants Canada 2026, Canada health innovation funding, CIHR grants, IRAP medical device funding, health tech grants Canada, medtech funding Canada, digital health grants, medical device R&D grants Canada",
    openGraph: {
        title: "Healthcare Startup Grants Canada 2026 | $1.2B+ Health Innovation Funding",
        description: "Find Canada's best healthcare startup grants — CIHR, IRAP, CQDM, MaRS Health, and provincial medtech programs.",
        url: "https://www.fsidigital.ca/canada/healthcare-startup-grants",
    },
}

const healthcareGrants: Grant[] = [
    {
        id: "health-cihr",
        name: "CIHR Health Research Operating Grants",
        fundingMin: 100000,
        fundingMax: 1000000,
        eligibility: ["Canadian health researchers", "Academic-industry partnerships", "Clinical stage companies with university collaboration"],
        deadline: "Bi-annual — check researchnet-recherchenet.ca",
        applicationLink: "https://cihr-irsc.gc.ca/e/37788.html",
        description: "Canada's premier health research funding body provides $1.2B annually. Project Grants cover clinical research, digital health innovation, medical device development, and precision medicine.",
        country: "Canada",
        region: "Federal",
        category: "Health Research",
        agency: "Canadian Institutes of Health Research (CIHR)",
        status: "Active",
        tags: ["Research", "Clinical", "Academic Partnership"],
        requirements: ["Principal investigator with academic affiliation", "Peer-reviewed application", "Ethics board approval for human subjects", "Canadian research content"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "health-irap",
        name: "IRAP for Medical Device & Health Tech R&D",
        fundingMin: 50000,
        fundingMax: 500000,
        eligibility: ["Canadian medtech SMEs", "Health tech software companies", "Biotech firms at product development stage"],
        deadline: "Rolling — contact NRC-IRAP advisor",
        applicationLink: "https://nrc.canada.ca/en/support-technology-innovation/nrc-irap",
        description: "NRC's Industrial Research Assistance Program funds R&D wages and contractors for health technology companies developing medical devices, diagnostics, digital health platforms, and therapeutic innovations.",
        country: "Canada",
        region: "Federal",
        category: "R&D Funding",
        agency: "National Research Council of Canada",
        status: "Active",
        tags: ["Medical Device", "Health Tech", "R&D Wages"],
        requirements: ["Canadian-incorporated SME", "Under 500 employees", "TRL 4–7 stage", "Assigns NRC-IRAP advisor"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "health-cqdm",
        name: "CQDM — Biopharmaceutical Consortium Grants",
        fundingMin: 500000,
        fundingMax: 5000000,
        eligibility: ["Pre-competitive biopharmaceutical R&D teams", "Academic-industry consortiums", "Drug discovery innovation"],
        deadline: "Annual — check cqdm.ca",
        applicationLink: "https://www.cqdm.org/en/apply/",
        description: "CQDM funds pre-competitive research in drug discovery — tests, biomarkers, research tools — that enables pharma companies to accelerate pipeline development. Unique consortium model.",
        country: "Canada",
        region: "Federal/Quebec",
        category: "Biopharmaceutical",
        agency: "CQDM (Consortium québécois sur la découverte du médicament)",
        status: "Active",
        tags: ["Drug Discovery", "Biomarkers", "Pharma"],
        requirements: ["Consortium of ≥2 industry + 1 academic", "Pre-competitive scope", "Quebec or national scope project"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "health-sred",
        name: "SR&ED for Healthcare R&D",
        fundingMin: 10000,
        fundingMax: 10000000,
        eligibility: ["Any Canadian company conducting health R&D", "Clinical trials with technological uncertainty", "Medical device development labs"],
        deadline: "File with CRA annually, 18-month deadline from fiscal year end",
        applicationLink: "https://www.canada.ca/en/revenue-agency/services/scientific-research-experimental-development-tax-incentive-program.html",
        description: "SR&ED tax credits are the most accessible healthcare R&D funding in Canada — 35% refundable for CCPCs, covering clinical trial costs, medical device R&D wages, and experimental development.",
        country: "Canada",
        region: "Federal",
        category: "Tax Credit",
        agency: "Canada Revenue Agency",
        status: "Active",
        tags: ["Tax Credit", "R&D", "Clinical Trials", "Refundable"],
        requirements: ["Canadian-taxable entity", "Qualifying R&D expenditures", "Technological advancement", "Systematic investigation"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "health-mars",
        name: "MaRS Health EXCITE Platform",
        fundingMin: 50000,
        fundingMax: 500000,
        eligibility: ["Ontario health technology companies", "Digital health startups", "Medical devices seeking clinical evaluation"],
        deadline: "Rolling intakes",
        applicationLink: "https://www.marsdd.com/services/health/",
        description: "MaRS EXCITE provides funding and access to Ontario Health partner hospitals for clinical evaluation, real-world evidence generation, and health system pilot studies.",
        country: "Canada",
        region: "Ontario",
        category: "Health Tech",
        agency: "MaRS Discovery District",
        status: "Active",
        tags: ["Digital Health", "Clinical Evaluation", "Ontario"],
        requirements: ["Ontario-based company", "Validated technology", "Hospital partnership interest", "Patient population impact"],
        lastUpdated: "2026-01-01"
    },
]

export default function HealthcareStartupGrantsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
            <Header />

            {/* Hero */}
            <section className="bg-gradient-to-br from-rose-700 via-red-800 to-pink-900 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Heart className="h-6 w-6 text-rose-300" />
                            <Badge className="bg-rose-500/30 text-rose-100 border-rose-400">Canada Health Innovation Funding 2026</Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Healthcare Startup Grants Canada 2026</h1>
                        <p className="text-xl text-rose-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Canada invests $1.2B+ annually in health research and innovation. From CIHR research grants and IRAP medical device funding
                            to SR&ED tax credits covering 35–65% of clinical R&D expenses, Canadian healthcare startups have access to one of the
                            world's most generous medtech funding ecosystems.
                        </p>
                        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                            <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">$1.2B+</div><div className="text-rose-200 text-sm mt-1">CIHR annual funding</div></div>
                            <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">65%</div><div className="text-rose-200 text-sm mt-1">Max SR&ED refund rate</div></div>
                            <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">$500K</div><div className="text-rose-200 text-sm mt-1">Max IRAP medtech award</div></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* EEAT */}
            <section className="py-6 bg-emerald-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto space-y-4">
                        <ShortAnswerBox content="Yes — Canadian healthcare startups can access CIHR research grants ($100K–$1M), IRAP for medical device R&D (up to $500K), SR&ED tax credits (35–65% of eligible health R&D expenses), CQDM biopharmaceutical consortium grants, and MaRS EXCITE for Ontario digital health companies. Combined, these programs can fund 60–80% of early-stage medtech development costs." />
                        <EEATBadge authorName="Ashwani K." authorImage="/ash-author-1.jpg" date="2026-03-01" />
                        <EligibleCheck />
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    <div className="flex flex-wrap gap-2 mb-10">
                        {["CIHR Grants", "IRAP MedTech", "SR&ED Credits", "Digital Health", "How to Apply", "FAQ"].map((item) => (
                            <Badge key={item} variant="outline" className="cursor-pointer hover:bg-red-50 px-3 py-1.5 text-sm">{item}</Badge>
                        ))}
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Canada Healthcare Startup Grant Programs 2026</h2>
                        <GrantComparisonTable grants={healthcareGrants} title="Healthcare Startup Grants Comparison" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-10">

                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Heart className="h-5 w-5 text-red-500" />Canada's Health Innovation Funding Ecosystem</CardTitle></CardHeader>
                                <CardContent className="text-gray-700 prose max-w-none">
                                    <p className="leading-relaxed mb-4">
                                        Canada's health innovation funding operates through several parallel streams: federal research councils (CIHR, NSERC, SSHRC),
                                        the National Research Council's IRAP program, the SR&ED tax incentive system, and increasingly, provincial health system
                                        innovation programs that pay companies for real-world clinical evidence generation.
                                    </p>
                                    <p className="leading-relaxed mb-4">
                                        What makes Canada unique for healthcare startups is the <strong>academic-industry bridge</strong>: most major programs
                                        (CIHR, CQDM, NSERC Alliance) are designed specifically for companies partnering with universities for research. If you
                                        have or can form a university partnership, you unlock significantly more funding than going alone.
                                    </p>
                                    <p className="leading-relaxed">
                                        For medical device companies, the combination of <strong>IRAP (non-dilutive R&D wages) + SR&ED (35% refund on remaining
                                            expenses) + Health Canada Pre-Submission meetings (free regulatory pathway support)</strong> creates a powerful
                                        cost-reduction toolkit for getting to regulatory submission without burning investor capital.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Program Deep Dives */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Healthcare Grant Programs Explained</h2>
                                <div className="space-y-6">

                                    <Card className="border-l-4 border-l-red-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">1. SR&ED — The Foundation of Healthcare R&D Funding</CardTitle>
                                                <Badge className="bg-red-100 text-red-800 shrink-0 ml-2">35–65% Refundable</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>SR&ED is the most accessible and valuable starting point for any healthcare company. You don't apply for it — you claim it on your corporate tax return within 18 months of your fiscal year end.</p>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="bg-red-50 rounded-lg p-3 text-sm">
                                                    <div className="font-semibold text-red-900 mb-1">CCPC Rate (Most Startups)</div>
                                                    <div className="text-red-700">35% refundable on first $3M of eligible expenditures — that's $1.05M in cash from CRA</div>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg p-3 text-sm">
                                                    <div className="font-semibold text-gray-900 mb-1">Qualifying Health R&D Activities</div>
                                                    <div className="text-gray-700">Clinical trials with technical uncertainty, medical device prototyping, drug formulation, algorithm development, diagnostic tool R&D</div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-blue-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">2. IRAP for Medical Devices & Health Tech</CardTitle>
                                                <Badge className="bg-blue-100 text-blue-800 shrink-0 ml-2">Up to $500K</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>IRAP is particularly well-suited for medical device and digital health companies developing products at TRL 4–7. It funds <strong>R&D salaries and contractor costs directly</strong> — not just a tax credit after the fact.</p>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" /><span>Funds 50–80% of eligible R&D salary costs (engineers, researchers, clinical staff)</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" /><span>Can pay for clinical validation studies with hospital partners</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" /><span>Stacks with SR&ED (non-overlapping expenses)</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" /><span>IRAP advisor provides free technical and business mentoring</span></li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-purple-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">3. CIHR — For Academic-Industry Health Research</CardTitle>
                                                <Badge className="bg-purple-100 text-purple-800 shrink-0 ml-2">$100K–$1M</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>CIHR's industry-partnership programs (particularly the CIHR/Industry Proof of Principle and Partnership Grants) provide large grants for companies conducting health research with academic co-investigators.</p>
                                            <p className="text-sm text-amber-700 bg-amber-50 rounded-lg p-3">
                                                <strong>💡 Key Insight:</strong> CIHR scores industry-partnership grants on both scientific merit AND commercial potential. Having a strong industry partner with a clear market application significantly improves scores over purely academic proposals.
                                            </p>
                                        </CardContent>
                                    </Card>

                                </div>
                            </div>

                            {/* How to Apply */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-red-600" />
                                        How to Access Canada Healthcare Startup Funding
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    <div className="space-y-4">
                                        {[
                                            { step: "1", title: "Set Up SR&ED Tracking Now", desc: "Even if you're pre-revenue, start tracking all R&D expenses with proper documentation today. SR&ED requires contemporary records (not reconstructed after the fact). Use time tracking software and document each technical challenge you're trying to overcome." },
                                            { step: "2", title: "Contact an NRC-IRAP Advisor", desc: "NRC-IRAP advisors are assigned to your company free of charge. They assess your project, help scope an eligible R&D plan, and submit on your behalf. Find your local IRAP office at nrc.canada.ca/irap-contact." },
                                            { step: "3", title: "Identify a University Research Partner", desc: "For CIHR, NSERC Alliance, and CQDM grants, having a university co-investigator is essential. Contact your nearest university's industry liaison office — they actively look for industry partners and can propose faculty collaborators." },
                                            { step: "4", title: "Apply for Health Canada's Pre-Submission Meetings", desc: "If you're developing a medical device or drug, book a Pre-Submission Meeting with Health Canada's Medical Devices Bureau early. This free consultation clarifies your regulatory pathway, which directly improves CIHR and IRAP application scores." },
                                            { step: "5", title: "Stack Programs Strategically", desc: "The optimal stack for a health tech company: IRAP (R&D wages) → SR&ED (remaining eligible expenses) → CIHR Partnership Grant (larger-scale clinical research) → provincial health innovation fund (pilot study). Properly documented, this covers 50–75% of development costs non-dilutively." },
                                        ].map((item) => (
                                            <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="h-8 w-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                                                <div><div className="font-semibold text-gray-900 mb-1">{item.title}</div><div className="text-sm text-gray-600">{item.desc}</div></div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Expert Tips */}
                            <Card className="border-amber-200 bg-amber-50">
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-amber-800"><Lightbulb className="h-5 w-5 text-amber-600" />Expert Strategy: Canada Healthcare Funding</CardTitle></CardHeader>
                                <CardContent className="text-amber-900 space-y-4">
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 Your Clinical Trial Can Qualify for SR&ED</div>
                                        <p className="text-sm">Many health companies don&apos;t realize their Phase I/II clinical trials qualify for SR&ED if there&apos;s genuine technological uncertainty in the methodology. Clinical protocol development, novel endpoint measurement, and adaptive trial design all qualify. A well-scoped SR&ED claim on a $2M clinical trial can recover $700K in cash from CRA.</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 Use MaRS EXCITE for Ontario Health System Pilots</div>
                                        <p className="text-sm">MaRS EXCITE is dramatically underutilized. It connects Ontario digital health and medtech companies directly to Ontario Health partner hospitals for funded pilot studies. The pilot data generated is not just grant value — it&apos;s the clinical evidence that unlocks Health Canada approval and US FDA clearance. Apply early; pilot slots fill quickly.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* FAQ */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ: Canada Healthcare Startup Grants</h2>
                                <div className="space-y-4">
                                    {[
                                        { q: "Can a pre-revenue healthcare startup access Canadian grants?", a: "Yes — IRAP specifically targets early-stage companies (pre-revenue to $50M revenue). SR&ED is available as long as you're conducting qualifying R&D, regardless of revenue stage. CIHR industry grants require a commercial partner but don't require you to be revenue-generating. The Pre-Seed and early-stage provincial programs also explicitly target pre-revenue companies." },
                                        { q: "Do I need Health Canada approval before accessing healthcare grants?", a: "No — most research grants (CIHR, IRAP, SR&ED) are specifically designed to fund the development process that leads to regulatory approval. You don't need a medical device license or drug approval to apply. However, for clinical evaluation programs (like MaRS EXCITE), you may need a minimum prototype and pre-submission meeting with Health Canada to demonstrate regulatory pathway clarity." },
                                        { q: "What is the difference between CIHR and NSERC for health tech?", a: "CIHR funds health-focused research (clinical trials, drug development, disease treatment, health system innovation). NSERC funds engineering and natural science research — relevant for medical devices, diagnostic hardware, health AI/ML algorithms, and biomedical engineering. If your health technology involves significant engineering innovation, NSERC (especially NSERC Alliance grants with an industry partner) is often more fundable than CIHR." },
                                        { q: "How do provincial health grants work alongside federal programs?", a: "Provincial health innovation programs typically target later-stage pilots and real-world evidence generation. Ontario's MOHLTC and OHT innovation funds, BC's HIBC innovation programs, and Quebec's MSSS programs pay companies to conduct fully funded pilots in provincial health systems. These stack with federal R&D grants (IRAP, CIHR) and don't require you to repay — they're structured as procurement contracts, not grants." },
                                        { q: "Can AI-powered healthcare tools qualify for Canadian grants?", a: "Absolutely — digital health AI is a priority for CIHR, IRAP, and most provincial health innovation funds. Key qualifying areas: clinical decision support AI, diagnostic imaging AI (radiograph analysis, pathology), natural language processing for clinical notes, remote patient monitoring, and predictive analytics for hospital operations. SR&ED covers the algorithm development costs; CIHR and IRAP fund the clinical validation phases." },
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
                            <Card className="bg-red-700 text-white">
                                <CardContent className="pt-6">
                                    <Star className="h-8 w-8 text-yellow-300 mb-3" />
                                    <h3 className="font-bold text-lg mb-2">Free Health Grant Matching</h3>
                                    <p className="text-red-100 text-sm mb-4">Our health innovation specialists find the right CIHR, IRAP, and provincial programs for your medtech or digital health company.</p>
                                    <Link href="/contact"><Button className="w-full bg-white text-red-700 hover:bg-red-50">Get Free Matching <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
                                </CardContent>
                            </Card>
                            <NewsletterSignup variant="sidebar" />
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Related Programs</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <Link href="/blog/irap-nrc-canada-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> IRAP Complete Guide</Link>
                                        <Link href="/canada/innovation-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Canada Innovation Grants</Link>
                                        <Link href="/blog/sred-scientific-research-experimental-development" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> SR&ED Tax Credit Guide</Link>
                                        <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder</Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mb-8">
                        <NewsletterSignup title="Get Canada Health Grant Updates" description="Track CIHR intakes, IRAP advisor availability, MaRS EXCITE cohorts, and provincial health innovation program openings." />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
