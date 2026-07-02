import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, ArrowRight, Scale, ShieldCheck, TrendingUp, HelpCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { programsDatabase, type ProgramDetails } from "@/lib/data/programs"

interface ComparisonDetails {
  slug: string;
  title: string;
  description: string;
  program1Slug: string;
  program2Slug: string;
  stackingRule: string;
  pros1: string[];
  cons1: string[];
  pros2: string[];
  cons2: string[];
  verdict: string;
}

const comparisons: ComparisonDetails[] = [
  {
    slug: "sred-vs-irap",
    title: "SR&ED vs. IRAP: Which Canadian R&D Program is Best for Your Startup?",
    description: "Compare SR&ED tax credits and IRAP grants side-by-side. Learn the eligibility rules, funding amounts, stacking limits, and application processes.",
    program1Slug: "sred-tax-credit",
    program2Slug: "irap-grant",
    stackingRule: "Yes, you can stack them. IRAP funds R&D salaries upfront (50–80%), and SR&ED refunds up to 35–64% of the remaining salary and overhead expenditures. However, any government grant received (including IRAP) reduces the pool of eligible expenditures for your SR&ED calculation. Stacking both is highly recommended but requires precise bookkeeping.",
    pros1: [
      "Non-competitive: if you do qualifying work, you get paid by law.",
      "Covers salaries, contracts, materials, and overhead.",
      "Retroactive claim up to 18 months post-fiscal year end."
    ],
    cons1: [
      "Paid after the work is completed and tax year is filed.",
      "High compliance documentation and technical audit risks.",
      "Routine software development without technical uncertainty is often audited."
    ],
    pros2: [
      "Paid upfront during project execution (monthly reimbursements).",
      "Builds a valuable relationship with an NRC ITA advisor.",
      "Excellent credibility stamp for early-stage tech companies."
    ],
    cons2: [
      "Highly competitive: ITAs select only high-commercial-potential projects.",
      "Must build relationship first (no cold proposal applications).",
      "No retroactive funding for already completed work."
    ],
    verdict: "For early-stage technology startups with active payroll, IRAP is the optimal upfront choice to cover immediate dev wages, while SR&ED should be filed annually to recover tax credits on the non-subsidized portions of your development spend."
  },
  {
    slug: "cdap-vs-sred",
    title: "CDAP vs. SR&ED: Stacking Digital Main Street and R&D Tax Credits",
    description: "Understand the differences between Canada Digital Adoption Program (CDAP) and SR&ED R&D Tax Credits. Choose the right program for your technology adoption.",
    program1Slug: "cdap",
    program2Slug: "sred-tax-credit",
    stackingRule: "Yes. CDAP focuses on adopting commercial technologies (e.g. installing CRM, ERP, or cloud commerce infrastructure), whereas SR&ED is for developing custom technology. You can claim CDAP for adoption tooling and SR&ED for core custom software development without any overlapping conflict.",
    pros1: [
      "Fast approvals (typically 4-8 weeks).",
      "Up to $15,000 cash grant plus $100,000 interest-free BDC loan.",
      "Standardized application criteria based on revenue and headcount."
    ],
    cons1: [
      "Only for established companies ($500K+ historical revenue).",
      "Limited to technology adoption (no R&D or custom IP creation).",
      "One-time program (not recurring year-over-year)."
    ],
    pros2: [
      "Non-competitive: if you do qualifying work, you get paid by law.",
      "Covers salaries, contracts, materials, and overhead.",
      "Retroactive claim up to 18 months post-fiscal year end."
    ],
    cons2: [
      "Paid after the work is completed and tax year is filed.",
      "High compliance documentation and technical audit risks.",
      "Routine software development without technical uncertainty is often audited."
    ],
    verdict: "If you are an established business upgrading your internal systems or digitizing operations, apply for CDAP immediately. If you are writing custom software or engineering custom products, file for SR&ED."
  },
  {
    slug: "sba-7a-vs-state-grants",
    title: "SBA 7(a) Loans vs. State Grants: US Business Funding Options Compared",
    description: "Compare SBA 7(a) government-backed loans and US State Grants. Learn about funding amounts, eligibility parameters, interest rates, and application timelines.",
    program1Slug: "sba-7a-loans",
    program2Slug: "sba-7a-loans", // Fallback to comparison context
    stackingRule: "Yes. SBA loans are debt-based financing used for working capital and real estate acquisitions. State grants are usually non-repayable incentives for hiring, training, or localized expansion. Stacking them allows you to cover capital outlays (via SBA) while offsetting wage and upskilling costs (via state grants).",
    pros1: [
      "Large capital limits (up to $5 million).",
      "Government-guaranteed: lower interest rates and longer repayment terms.",
      "Flexible capital usage (refinancing, real estate, acquisitions)."
    ],
    cons1: [
      "Debt-based: requires monthly repayment and personal guarantees.",
      "Slow approval cycles (typically 45-90 days via bank partners).",
      "High documentation requirements and asset collateral reviews."
    ],
    pros2: [
      "Non-repayable: zero equity or debt repayment required.",
      "Directly reduces regional operating and training costs.",
      "Excellent for building local economic development relationships."
    ],
    cons2: [
      "Smaller funding amounts ($5K-$100K average).",
      "Highly restricted usage (e.g. only for training or local equipment).",
      "Requires strict post-project compliance reports and receipts."
    ],
    verdict: "Use SBA 7(a) loans for heavy asset acquisition or working capital requirements that exceed $100,000, and stack local State Grants to offset training and wage costs as you scale your team."
  }
];

export async function generateStaticParams() {
  return comparisons.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const comp = comparisons.find(c => c.slug === resolvedParams.slug);
  if (!comp) return { title: "Comparison Not Found" };

  return {
    title: `${comp.title} | FSI Digital`,
    description: comp.description,
    alternates: {
      canonical: `https://www.fsidigital.ca/blog/versus/${comp.slug}`
    }
  };
}

export default async function VersusPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const comp = comparisons.find(c => c.slug === resolvedParams.slug);
  if (!comp) notFound();

  const prog1 = programsDatabase.find(p => p.slug === comp.program1Slug);
  const prog2 = programsDatabase.find(p => p.slug === comp.program2Slug);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 bg-indigo-500 text-white hover:bg-indigo-600">
              ⚔️ Stacking & Comparison Hub
            </Badge>
            <h1 className="text-3xl md:text-5xl font-black max-w-4xl mx-auto leading-tight mb-4">
              {comp.title}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Compare eligibility parameters, funding scopes, and approval speed side-by-side to optimize your capital stack.
            </p>
          </div>
        </section>

        {/* Side-by-Side Comparison Matrix */}
        <section className="container mx-auto px-4 -mt-10">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-900 text-white text-center font-bold text-sm tracking-wide uppercase py-4 border-b border-slate-800">
              <div className="text-left px-6 py-2">Parameter</div>
              <div className="px-6 py-2 truncate">{prog1?.name || "Program A"}</div>
              <div className="px-6 py-2 truncate">{prog2?.name || "Program B"}</div>
            </div>
            
            <div className="divide-y divide-slate-200 text-slate-700 text-sm">
              <div className="grid grid-cols-3 py-4 hover:bg-slate-50/50">
                <div className="font-bold text-slate-900 px-6">Agency</div>
                <div className="px-6 text-center font-medium">{prog1?.agency || "Government Department"}</div>
                <div className="px-6 text-center font-medium">{comp.slug === "sba-7a-vs-state-grants" ? "State / Local Development Agencies" : (prog2?.agency || "Government Department")}</div>
              </div>

              <div className="grid grid-cols-3 py-4 hover:bg-slate-50/50">
                <div className="font-bold text-slate-900 px-6">Funding Scope</div>
                <div className="px-6 text-center font-bold text-slate-900">{prog1?.fundingAmount}</div>
                <div className="px-6 text-center font-bold text-slate-900">{comp.slug === "sba-7a-vs-state-grants" ? "$5,000 to $100,000+" : (prog2?.fundingAmount)}</div>
              </div>

              <div className="grid grid-cols-3 py-4 hover:bg-slate-50/50">
                <div className="font-bold text-slate-900 px-6">Funding Type</div>
                <div className="px-6 text-center">
                  <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">{prog1?.fundingType}</Badge>
                </div>
                <div className="px-6 text-center">
                  <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">{comp.slug === "sba-7a-vs-state-grants" ? "Non-Repayable Grant" : (prog2?.fundingType)}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 py-4 hover:bg-slate-50/50">
                <div className="font-bold text-slate-900 px-6">Difficulty</div>
                <div className="px-6 text-center font-semibold text-orange-700">{prog1?.fundingDifficulty}</div>
                <div className="px-6 text-center font-semibold text-orange-700">{comp.slug === "sba-7a-vs-state-grants" ? "Moderate" : (prog2?.fundingDifficulty)}</div>
              </div>

              <div className="grid grid-cols-3 py-4 hover:bg-slate-50/50">
                <div className="font-bold text-slate-900 px-6">Intake Status</div>
                <div className="px-6 text-center">{prog1?.deadlineType}</div>
                <div className="px-6 text-center">{comp.slug === "sba-7a-vs-state-grants" ? "Varies (Rolling / Windows)" : (prog2?.deadlineType)}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Pros & Cons Section */}
        <section className="container mx-auto px-4 mt-16 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Program 1 Pros/Cons */}
            <Card className="border border-slate-200">
              <CardHeader className="bg-slate-50 border-b border-slate-100">
                <CardTitle className="text-xl font-bold text-slate-900 truncate">
                  {prog1?.name || "Program A"} Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h4 className="font-bold text-green-700 text-sm uppercase tracking-wide mb-3 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Advantages
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {comp.pros1.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-700 text-sm uppercase tracking-wide mb-3 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> Limitations
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {comp.cons1.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Program 2 Pros/Cons */}
            <Card className="border border-slate-200">
              <CardHeader className="bg-slate-50 border-b border-slate-100">
                <CardTitle className="text-xl font-bold text-slate-900 truncate">
                  {comp.slug === "sba-7a-vs-state-grants" ? "State / Local Development Grants" : (prog2?.name || "Program B")} Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h4 className="font-bold text-green-700 text-sm uppercase tracking-wide mb-3 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Advantages
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {comp.pros2.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-700 text-sm uppercase tracking-wide mb-3 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> Limitations
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {comp.cons2.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stacking Rule & Verdict */}
        <section className="container mx-auto px-4 mt-12 max-w-5xl">
          <div className="bg-indigo-950 text-white rounded-2xl p-8 border border-indigo-900 shadow-xl space-y-6">
            <div className="flex items-start gap-4">
              <Scale className="w-8 h-8 text-indigo-300 shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-black tracking-tight mb-2">Can You Stack Them?</h3>
                <p className="text-indigo-200 text-sm leading-relaxed">{comp.stackingRule}</p>
              </div>
            </div>

            <div className="border-t border-indigo-900 pt-6 flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-black tracking-tight text-emerald-300 mb-2">The Expert Verdict</h3>
                <p className="text-indigo-100 text-sm leading-relaxed">{comp.verdict}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Action CTA */}
        <section className="container mx-auto px-4 mt-16 max-w-5xl">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-md">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Maximize Your Stacking Potential</h3>
            <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6">
              Our free Funding Calculator automatically checks your business parameters against both programs to determine eligibility and stacking bounds in seconds.
            </p>
            <Button size="lg" className="bg-indigo-650 hover:bg-indigo-755 text-white" asChild>
              <Link href="/grant-finder">
                Calculate Stacking Eligibility <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
