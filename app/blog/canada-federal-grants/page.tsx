import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Leaf, PieChart, TrendingUp, HelpCircle, Lightbulb, Zap, Rocket, BookOpen, GraduationCap, Briefcase, Microscope, Gavel, Globe, Truck, Anchor, Code, Heart, Cpu, Wheat, Scale, Book, List, Map as MapIcon } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

import { ExpertTipBox } from "@/components/blog/ExpertTipBox"
import AdSlot from "@/components/blog/AdSlot"
import NewsletterBox from "@/components/blog/NewsletterBox"

export const metadata: Metadata = {
  title: "Canadian Government Grants (2026): The Complete Federal Funding Guide",
  description: "The ultimate guide to federal business grants in Canada. Master the SIF Streams, ISED, AAFC, and IRAP ecosystems. Learn how to secure funding for startups, R&D, and export growth.",
  keywords: "Canada federal grants 2026, Strategic Innovation Fund streams, SR&ED guide 2026, IRAP funding guide, Canadian government business grants, startup funding Canada",
  openGraph: {
    title: "Canadian Government Grants (2026): The Complete Federal Funding Guide",
    description: "Don't just apply—strategize. This comprehensive guide covers every major federal funding agency in Canada and how to win their grants.",
    url: "https://www.fsidigital.ca/blog/canada-federal-grants",
    images: ["/og-image.png"],
  },
}

export default function CanadaFederalGrantsPage() {
  const faqData = [
    {
      question: "Are federal grants taxable?",
      answer: "Yes. Government grants are considered taxable income in the year they are received. However, they are usually offset by the expenses they cover, which you can deduct from taxable income, creating a neutral tax effect in most situations."
    },
    {
      question: "Do I have to pay back the 'contribution'?",
      answer: "If it is a 'Non-Repayable Contribution', no. If it is a 'Repayable Contribution', yes, but usually on very favorable terms (0% interest, payments start 2-3 years later). Defaulting on a federal contribution is very serious."
    },
    {
      question: "How long does approval take?",
      answer: "Be realistic. Small micro-grants (CDAP) can take 2-4 weeks. Major ISED or RDA projects ($100k+) typically take 4-8 months from application to first cheque. Do not bank on this money to pay next month's payroll."
    },
    {
      question: "Can I apply for multiple grants?",
      answer: "Yes, this is called 'Stacking'. You can stack federal, provincial, and municipal grants up to a certain limit (usually 75% of total project costs). You cannot get 100% funding from a single source usually."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50 bg-slate-50 dark:bg-neutral-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-700 to-red-900 text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-1 text-sm rounded-full">
                🇨🇦 Federal Funding Masterclass 2026
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                Canadian Government Grants:<br />The Complete Federal Guide
              </h1>
              <p className="text-xl md:text-2xl text-red-100 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
                Navigating Ottawa's funding ecosystem can be overwhelming. From the massive <strong>Strategic Innovation Fund (SIF)</strong> to the agile <strong>NRC-IRAP</strong>, we decode the "Big Three" agencies and provide the strategic playbook you need to secure your capital.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Button size="lg" className="bg-white text-red-700 hover:bg-gray-100 font-bold shadow-xl text-lg px-8 h-14" asChild>
                  <Link href="#application-playbook">
                    View Application Playbook
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/5 font-medium text-lg px-8 h-14" asChild>
                  <Link href="/grant-finder">
                    Find Eligible Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-neutral-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16">

              {/* Main Content Column */}
              <div className="lg:col-span-8 space-y-16">

                {/* Introduction */}
                <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert">
                  <p className="lead text-2xl font-medium text-gray-900 dark:text-gray-100">
                    The Canadian federal government is one of the most generous investors in the world, actively deploying billions of dollars directly into the private sector. But there is a catch: <strong>Generic applications effectively have a 0% success rate.</strong>
                  </p>
                  <p>
                    In 2026, the funding landscape has shifted. The days of "free money" for general operations are largely over. Today, the Government of Canada invests in specific <em>outcomes</em>: Innovation (IP), Export Growth, Clean Technology, and Workforce Development.
                  </p>
                  <p>
                    To win, you must stop viewing yourself as a "needy business" and start positioning yourself as a "strategic partner" who can help the government achieve its policy goals. This guide is your map to that partnership, covering the nuances that the official government websites often omit.
                  </p>
                  <p>
                    The federal funding landscape operates through a complex ecosystem of agencies, each with distinct mandates, target beneficiaries, and evaluation criteria. Understanding this ecosystem is the difference between wasting months on applications destined for rejection and strategically targeting programs where your company aligns with government priorities. The most successful applicants research programs extensively before writing a single word, ensuring they understand not just the official eligibility criteria but the unofficial preferences, current budget availability, and political context shaping funding decisions.
                  </p>
                  <p>
                    Timing matters enormously in federal grant applications. Government fiscal years run April to March, with new budgets often allocated in the spring and spending pressure intensifying toward year-end. Many programs have continuous intake but process applications in batches. Others open specific windows that may last only weeks. Building relationships with program officers before windows open gives you advance notice and feedback that dramatically improves application quality. The most successful companies treat grant applications as an ongoing strategic function rather than one-off efforts.
                  </p>

                  <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 my-10">
                    <h3 className="mt-0 text-slate-900 dark:text-white">What are the 3 Types of Federal "Free Money"?</h3>
                    <p className="mb-4">Before diving into specific programs, it is critical to understand the three distinct instruments the government uses to deploy capital. Confusing these will kill your application.</p>
                    <ul className="space-y-4">
                      <li>
                        <strong>1. Non-Repayable Contributions (Grants):</strong>
                        <span className="block text-sm text-slate-600 dark:text-slate-400 mt-1">This is "Free Money". You do not pay it back. These are highly competitive and usually reserved for high-risk R&D (IRAP), equity-deserving groups (Women/Indigenous), or specific export activities (CanExport).</span>
                      </li>
                      <li>
                        <strong>2. Repayable Contributions (No-Interest Loans):</strong>
                        <span className="block text-sm text-slate-600 dark:text-slate-400 mt-1">The most common form of "grant" for established businesses ($1M - $10M range). You receive funding and pay it back over 5-10 years with 0% interest and no collateral. This is effectively "cheap capital" that beats any bank loan.</span>
                      </li>
                      <li>
                        <strong>3. Tax Credits (SR&ED):</strong>
                        <span className="block text-sm text-slate-600 dark:text-slate-400 mt-1">Retroactive refunds on money you have already spent. SR&ED is an entitlement program, meaning if you qualify and file correctly, the CRA <em>must</em> pay you.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <AdSlot adSlot="9876543210" adFormat="horizontal" className="my-10" />

                {/* Section 1: The Big Three Agencies */}
                <div id="big-three" className="scroll-mt-32">
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                    <Building className="w-10 h-10 text-red-600 mr-4" />
                    What are the "Big Three" Federal Agencies?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-xl">
                    90% of federal business funding flows through three primary channels. Understanding the mandate of each agency is the first step to successful funding.
                  </p>
                  <p className="text-gray-700 mb-6">Each of the three major federal funding agencies operates with distinct evaluation philosophies shaped by their institutional mandates. Innovation, Science and Economic Development Canada prioritizes large-scale investments that create substantial employment and position Canada competitively in global industries. The National Research Council's Industrial Research Assistance Program focuses on technical innovation and helping small and medium enterprises overcome technological challenges. Agriculture and Agri-Food Canada concentrates on food security, sustainability, and value-added processing. Successful applicants study these differences carefully and tailor their applications to emphasize outcomes each specific agency values most highly.</p>
                  <p className="text-gray-700 mb-10">The relationship between these agencies also matters strategically. Companies often progress through agencies as they grow, starting with IRAP support for early-stage technical development, graduating to regional development agency support for commercialization, and eventually accessing Strategic Innovation Fund investment for major facility expansions. Understanding this progression helps companies plan multi-year funding strategies rather than opportunistically chasing individual grants.</p>

                  <div className="space-y-10">
                    {/* ISED */}
                    <Card className="border-l-8 border-l-blue-600 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-400">1. ISED (Innovation, Science and Economic Development)</h3>
                            <p className="text-blue-600/80 font-medium mt-1">The Strategist</p>
                          </div>
                          <Badge variant="secondary" className="text-lg px-3 py-1">Scale-up</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="mb-6 text-lg">
                          To scale Canadian companies into global champions. ISED manages the massive <strong>Strategic Innovation Fund (SIF)</strong> and oversees the Regional Development Agencies (RDAs). They are looking for "Anchor Firms"—companies that will stay in Canada and employ hundreds of people.
                        </p>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-100 dark:border-blue-800 mb-6">
                          <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center"><Target className="w-5 h-5 mr-2" /> Deep Dive: The Strategic Innovation Fund (SIF)</h4>
                          <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">SIF is the crown jewel of Canadian funding. It is divided into 5 Streams. Knowing which Stream to apply to is half the battle:</p>
                          <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                            <li className="bg-white dark:bg-blue-950 p-3 rounded border border-blue-200"><strong>Stream 1: R&D</strong> <br />For researching new products.</li>
                            <li className="bg-white dark:bg-blue-950 p-3 rounded border border-blue-200"><strong>Stream 2: Growth</strong> <br />For expanding factories/capital.</li>
                            <li className="bg-white dark:bg-blue-950 p-3 rounded border border-blue-200"><strong>Stream 3: Attraction</strong> <br />For foreign companies investing in Canada.</li>
                            <li className="bg-white dark:bg-blue-950 p-3 rounded border border-blue-200"><strong>Stream 4: Collaboration</strong> <br />For academic-industry consortiums.</li>
                            <li className="bg-white dark:bg-blue-950 p-3 rounded border border-blue-200"><strong>Stream 5: National Eco</strong> <br />For huge national public interest projects.</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    {/* NRC-IRAP */}
                    <Card className="border-l-8 border-l-green-600 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-2xl font-bold text-green-800 dark:text-green-400">2. NRC-IRAP (Industrial Research Assistance Program)</h3>
                            <p className="text-green-600/80 font-medium mt-1">The Scientist</p>
                          </div>
                          <Badge variant="secondary" className="text-lg px-3 py-1">Innovation</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="mb-6 text-lg">
                          To de-risk technical innovation. IRAP is arguably the most founder-friendly program in Canada. They fund "Technical Uncertainty"—projects where you don't know if the technology will actually work.
                        </p>
                        <ExpertTipBox type="tip" title="The ITA Relationship">
                          <p>IRAP is unique because it isn't form-based; it's relationship-based. You are assigned an ITA (Industrial Technology Advisor). This person is usually an ex-engineer or ex-founder. If they like you and believe in your tech, they will fight for your funding internally. Your #1 Goal is to make the ITA's life easy.</p>
                        </ExpertTipBox>
                      </CardContent>
                    </Card>

                    {/* AAFC */}
                    <Card className="border-l-8 border-l-yellow-600 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-2xl font-bold text-yellow-800 dark:text-yellow-400">3. AAFC (Agriculture and Agri-Food Canada)</h3>
                            <p className="text-yellow-600/80 font-medium mt-1">The Producer</p>
                          </div>
                          <Badge variant="secondary" className="text-lg px-3 py-1">Food Tech</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="mb-6 text-lg">
                          To drive sustainability and output in the food sector. Through the "Sustainable CAP", AAFC funds everything from new tractors to plant-based protein research.
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-4 text-sm font-medium text-gray-700">
                          <li className="flex items-center"><Leaf className="w-4 h-4 mr-2 text-green-600" /> AgriInnovate (Commercialization)</li>
                          <li className="flex items-center"><Microscope className="w-4 h-4 mr-2 text-green-600" /> AgriScience (Research Clusters)</li>
                          <li className="flex items-center"><Target className="w-4 h-4 mr-2 text-green-600" /> AgriCompetitiveness (Industry)</li>
                          <li className="flex items-center"><Globe className="w-4 h-4 mr-2 text-green-600" /> AgriMarketing (Export)</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* SR&ED Deep Dive: The Scientific Backbone */}
                <div id="sred-deep-dive" className="scroll-mt-32 mt-20">
                  <div className="bg-gray-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-10 opacity-10 blur-xl"><Microscope className="w-64 h-64" /></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <Badge className="bg-blue-600 hover:bg-blue-500 text-white text-md px-4 py-1 mr-4">Tax Credit</Badge>
                        <h2 className="text-3xl font-bold text-white">What is SR&ED in Canadian Innovation?</h2>
                      </div>

                      <p className="text-gray-300 mb-8 text-lg max-w-3xl leading-relaxed">
                        The Scientific Research and Experimental Development (SR&ED) tax incentive is the largest federal program. Unlike grants, which are competitive, SR&ED is an <strong>entitlement</strong>. If you do the work, you get the money. It offers a <strong>35% refundable tax credit</strong> (federal) + provincial top-ups (up to 64% total refund) on eligible R&D salaries, materials, and subcontracts.
                      </p>

                      <div className="grid lg:grid-cols-2 gap-10 border-t border-gray-700 pt-8">
                        <div>
                          <h4 className="font-bold text-xl text-blue-400 mb-4 flex items-center"><HelpCircle className="mr-2" /> The "Why" vs "How" Test</h4>
                          <p className="text-gray-400 leading-relaxed mb-4">
                            This is where 90% of founders fail. SR&ED doesn't care that you built a cool app. It cares <em>how</em> you built it.
                          </p>
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <AlertCircle className="w-5 h-5 mr-3 text-red-400 shrink-0 mt-0.5" />
                              <span className="text-gray-400 text-sm"><strong>Rejection:</strong> "We built a CRM using React." (This is standard engineering).</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 mr-3 text-green-400 shrink-0 mt-0.5" />
                              <span className="text-gray-400 text-sm"><strong>Approval:</strong> "We attempted to render 10M data points in React but hit memory limits (Uncertainty). We developed a custom virtualization algorithm to bypass the V8 engine limits (Advancement)."</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-xl">
                          <h4 className="font-bold text-xl text-white mb-4">The T661 Form: 3 Mandatory Questions</h4>
                          <p className="text-sm text-gray-400 mb-4">Your entire claim rests on the "Project Description" (Form T661). You must answer these three questions perfectly:</p>
                          <ol className="list-decimal pl-5 space-y-3 text-gray-300 text-sm">
                            <li><strong>Scientific Uncertainty:</strong> What technical problem prevented you from achieving your goal? (If you could Google the answer, it's not uncertainty).</li>
                            <li><strong>Technological Advancement:</strong> What new knowledge did you generate? (Even if the project failed, the <em>knowledge</em> is the advancement).</li>
                            <li><strong>Systematic Investigation:</strong> Did you keep logs, git commits, and test records? (No documentation = No money).</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* New Section: The Hidden 4th Pillar - RDAs */}
                <div id="rdas" className="scroll-mt-32 mt-20">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <MapIcon className="w-8 h-8 text-red-600 mr-3" />
                    What are the Regional Development Agencies (RDAs)?
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Most businesses apply to the big national programs and get rejected due to volume. Smart businesses apply to their local <strong>Regional Development Agency (RDA)</strong>. These agencies have specific mandates to help businesses in <em>your specific postal code</em>.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 p-6 rounded-xl hover:bg-slate-50 transition">
                      <h4 className="font-bold text-xl text-blue-800 mb-2">ACOA (Atlantic Canada)</h4>
                      <p className="text-sm text-gray-600">Focuses heavily on Ocean Tech, Fisheries, and Tourism. If you are in Halifax or St. John's, ACOA is your best friend.</p>
                    </div>
                    <div className="border border-gray-200 p-6 rounded-xl hover:bg-slate-50 transition">
                      <h4 className="font-bold text-xl text-blue-800 mb-2">CED (Quebec)</h4>
                      <p className="text-sm text-gray-600">Canada Economic Development for Quebec Regions. Massive support for aerospace (Montreal) and manufacturing.</p>
                    </div>
                    <div className="border border-gray-200 p-6 rounded-xl hover:bg-slate-50 transition">
                      <h4 className="font-bold text-xl text-blue-800 mb-2">FedDev Ontario</h4>
                      <p className="text-sm text-gray-600">The heavyweight. Focuses on advanced manufacturing (Automotive/EVs) and Life Sciences in the Toronto-Waterloo corridor.</p>
                    </div>
                    <div className="border border-gray-200 p-6 rounded-xl hover:bg-slate-50 transition">
                      <h4 className="font-bold text-xl text-blue-800 mb-2">PrairiesCan</h4>
                      <p className="text-sm text-gray-600">Alberta, Saskatchewan, Manitoba. Huge focus on energy transition, ag-tech, and value-added agriculture.</p>
                    </div>
                    <div className="border border-gray-200 p-6 rounded-xl hover:bg-slate-50 transition">
                      <h4 className="font-bold text-xl text-blue-800 mb-2">PacifiCan (BC)</h4>
                      <p className="text-sm text-gray-600">British Columbia. Focuses on Clean Tech, Forestry innovation, and digital media.</p>
                    </div>
                    <div className="border border-gray-200 p-6 rounded-xl hover:bg-slate-50 transition">
                      <h4 className="font-bold text-xl text-blue-800 mb-2">FedNor (Northern Ontario)</h4>
                      <p className="text-sm text-gray-600">Specific RDA for Northern Ontario, separate from FedDev. Mining and forestry focus.</p>
                    </div>
                  </div>
                </div>

                {/* New Section: Industrial Technology Benefits (The ITB Policy) */}
                <div id="itb-policy" className="scroll-mt-32 mt-20">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Scale className="w-8 h-8 text-neutral-600 mr-3" />
                    What is the "Industrial Technology Benefits" (ITB) Policy?
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    This is the best kept secret in Canadian manufacturing. When Canada buys defense equipment (like F-35 jets or ships), the foreign contractor (e.g., Lockheed Martin) is <strong>legally required</strong> to invest an amount equal to the contract value back into the Canadian economy. This is called the ITB Value Proposition.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl mb-8">
                    <h4 className="text-yellow-800 font-bold text-lg mb-2">What this means for you:</h4>
                    <p className="text-yellow-900 text-sm">
                      You don't always need to apply to the government. You can pitch directly to these large defense contractors (Primes). They are desperate to find Canadian SMEs to invest in or buy from to satisfy their ITB obligations. If you have a dual-use technology (civilian + military), this is your fastest path to a contract.
                    </p>
                  </div>
                </div>

                {/* Section 2: Funding by Lifecycle */}
                <div id="lifecycle-funding" className="scroll-mt-32 mt-20">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <TrendingUp className="w-8 h-8 text-red-600 mr-3" />
                    How Does Funding Work by Business Lifecycle?
                  </h2>
                  <p className="text-gray-600 mb-8 text-lg">
                    The most common mistake is applying for the wrong stage. A pre-revenue startup applying for a "Scale-up" grant will be rejected immediately.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Startup Phase */}
                    <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-col">
                      <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 text-red-600">
                        <Rocket className="w-7 h-7" />
                      </div>
                      <h3 className="font-bold text-xl mb-3">1. Startup Phase</h3>
                      <p className="text-sm text-gray-600 mb-6 flex-grow">For pre-revenue companies or early traction ($0 - $500k rev). You need money to build the first product.</p>
                      <ul className="space-y-3 text-sm font-medium">
                        <li className="flex items-start text-green-700">
                          <CheckCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" /> <span><strong>Futurpreneur:</strong> Loans + Mentoring for youth.</span>
                        </li>
                        <li className="flex items-start text-green-700">
                          <CheckCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" /> <span><strong>Innovative Solutions Canada:</strong> Government buys your prototype.</span>
                        </li>
                        <li className="flex items-start text-green-700">
                          <CheckCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" /> <span><strong>Youth Employment Program:</strong> Pays 50% of junior hires.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Growth Phase */}
                    <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-col">
                      <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 text-blue-600">
                        <Briefcase className="w-7 h-7" />
                      </div>
                      <h3 className="font-bold text-xl mb-3">2. Growth Phase</h3>
                      <p className="text-sm text-gray-600 mb-6 flex-grow">For companies with &gt;$500k revenue looking to export or hire. You have a product that Works.</p>
                      <ul className="space-y-3 text-sm font-medium">
                        <li className="flex items-start text-green-700">
                          <CheckCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" /> <span><strong>CanExport:</strong> Get up to $50k to cover customized marketing and travel.</span>
                        </li>
                        <li className="flex items-start text-green-700">
                          <CheckCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" /> <span><strong>CDAP:</strong> Digital Adoption ($2,400 to $15,000).</span>
                        </li>
                        <li className="flex items-start text-green-700">
                          <CheckCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" /> <span><strong>RDA Business Scale-up:</strong> Interest-free loans for capital expansion.</span>
                        </li>
                      </ul>
                    </div>

                    {/* R&D Phase */}
                    <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-col">
                      <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 text-purple-600">
                        <Lightbulb className="w-7 h-7" />
                      </div>
                      <h3 className="font-bold text-xl mb-3">3. R&D Phase</h3>
                      <p className="text-sm text-gray-600 mb-6 flex-grow">For deep-tech companies developing novel IP. You are spending money on scientists/engineers.</p>
                      <ul className="space-y-3 text-sm font-medium">
                        <li className="flex items-start text-green-700">
                          <CheckCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" /> <span><strong>SR&ED:</strong> The ultimate tax credit. Recoup up to 64% of salaries.</span>
                        </li>
                        <li className="flex items-start text-green-700">
                          <CheckCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" /> <span><strong>NRC-IRAP:</strong> Payroll support for technical staff.</span>
                        </li>
                        <li className="flex items-start text-green-700">
                          <CheckCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" /> <span><strong>SDTC:</strong> Sustainable Tech funding for clean-tech.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="my-12">
                  <AdSlot adSlot="1122334455" adFormat="rectangle" style={{ minHeight: '300px' }} />
                </div>

                {/* Section 3: The Application Playbook */}
                <div id="application-playbook" className="scroll-mt-32 mt-20">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <FileText className="w-8 h-8 text-red-600 mr-3" />
                    What is the 2026 Application Playbook?
                  </h2>
                  <p className="text-gray-600 mb-8 text-lg">
                    Successful applications follow a pattern known as the <em>Treasury Board Standard</em>. This is how federal officers are trained to evaluate files. To win, you must write in their language.
                  </p>

                  <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg">
                    <div className="bg-gray-100 dark:bg-gray-900 p-5 border-b border-gray-200 dark:border-gray-800 font-bold flex justify-between items-center">
                      <span className="text-lg">The 4-Step Winning Sequence</span>
                      <Badge className="bg-red-600 text-white hover:bg-red-700">Confidential Strategy</Badge>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                      <div className="p-8">
                        <div className="flex items-start">
                          <div className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-6 shrink-0 text-lg shadow-md">1</div>
                          <div>
                            <h4 className="font-bold text-xl text-gray-900 mb-2">The "GCKey" & Registration</h4>
                            <p className="text-gray-600 leading-relaxed">Before you write a word, register on the specific portal (IRAP portal, RDA portal). Funding cycles open and close in 48 hours. If you aren't registered, you miss the window. <strong>Action Item:</strong> Do not wait for a grant to open. Register for a "My ISED Account" today.</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-8 bg-red-50/20">
                        <div className="flex items-start">
                          <div className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-6 shrink-0 text-lg shadow-md">2</div>
                          <div>
                            <h4 className="font-bold text-xl text-gray-900 mb-2">The Work Plan First, Budget Second</h4>
                            <p className="text-gray-600 leading-relaxed">Most founders start with the budget ("I need $100k"). This is wrong. Start with the Work Plan. List exactly what you will do (e.g., "Activity 1: Hire 2 engineers to code module X"). The budget is simply the cost of the Work Plan. A budget without a linked activity will be rejected.</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex items-start">
                          <div className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-6 shrink-0 text-lg shadow-md">3</div>
                          <div>
                            <h4 className="font-bold text-xl text-gray-900 mb-2">Benefit to Canada (The "Why")</h4>
                            <p className="text-gray-600 leading-relaxed">This is the most important section. Do not talk about your profits. Talk about: <strong>Jobs created, Export revenue generated, Supply chain benefits, or Environmental impact</strong>. You are asking for taxpayer money; explain the return on investment for the taxpayer. If you create 0 jobs, you get $0.</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex items-start">
                          <div className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-6 shrink-0 text-lg shadow-md">4</div>
                          <div>
                            <h4 className="font-bold text-xl text-gray-900 mb-2">Stacking Limits</h4>
                            <p className="text-gray-600 leading-relaxed">Federal rules usually limit "Government Assistance" to 75% of total project costs. You usually need to bring 25% of your own cash (equity or bank loan) to the table. This is called "Skin in the Game".</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Section 4: Sector-Specific Strategic Guides */}
                <div className="mt-20">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">What are the Sector-Specific Funding Strategies?</h2>
                  <p className="mb-8 text-lg text-gray-600">Funding is not generic. An Agri-Tech company applies to completely different pools than a FinTech startup. Find your sector below:</p>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* CleanTech */}
                    <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
                      <h3 className="font-bold text-xl text-teal-800 mb-3 flex items-center"><Leaf className="mr-2" /> CleanTech & Energy</h3>
                      <p className="text-sm text-gray-700 mb-4">
                        The government has a "Net-Zero 2050" mandate. Projects that reduce Greenhouse Gases (GHGs) are prioritized directly by the Prime Minister's office.
                      </p>
                      <div className="space-y-2 text-sm">
                        <p><strong>Top Strategy:</strong> Quantify your impact. Don't say "Eco-friendly". Say "Reduces Carbon emissions by 50 tonnes/year".</p>
                        <p><strong>Key Programs:</strong> SDTC (Sustainable Development Tech Canada), The Clean Growth Hub, Low Carbon Economy Fund.</p>
                      </div>
                    </div>

                    {/* AgriTech */}
                    <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                      <h3 className="font-bold text-xl text-yellow-800 mb-3 flex items-center"><Wheat className="mr-2" /> AgriTech & Food</h3>
                      <p className="text-sm text-gray-700 mb-4">
                        Food security is critical. AAFC manages the multi-billion dollar "Sustainable CAP" partnership with provinces.
                      </p>
                      <div className="space-y-2 text-sm">
                        <p><strong>Top Strategy:</strong> Focus on "Value-Added Processing". Turning raw potatoes into frozen fries creates jobs and is funded eagerly. Selling raw potatoes is not.</p>
                        <p><strong>Key Programs:</strong> AgriInnovate, AgriAssurance, Food Waste Reduction Challenge.</p>
                      </div>
                    </div>

                    {/* HealthTech */}
                    <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100">
                      <h3 className="font-bold text-xl text-pink-800 mb-3 flex items-center"><Heart className="mr-2" /> Health & Life Sciences</h3>
                      <p className="text-sm text-gray-700 mb-4">
                        Post-pandemic, Canada aims to rebuild domestic biomanufacturing. If you make PPE, vaccines, or medical devices, you are in high demand.
                      </p>
                      <div className="space-y-2 text-sm">
                        <p><strong>Top Strategy:</strong> Partner with a hospital or university. Regulatory pathways (Health Canada approval) are expensive, so look for "support for regulatory compliance" in grant guidelines.</p>
                        <p><strong>Key Programs:</strong> CIHR (Health Research), Biomanufacturing Fund.</p>
                      </div>
                    </div>

                    {/* Advanced Manufacturing */}
                    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                      <h3 className="font-bold text-xl text-indigo-800 mb-3 flex items-center"><Cpu className="mr-2" /> Advanced Manufacturing</h3>
                      <p className="text-sm text-gray-700 mb-4">
                        Canada wants to digitize its factories (Industry 4.0). Robotics, AI-driven supply chains, and EV battery components are the winners here.
                      </p>
                      <div className="space-y-2 text-sm">
                        <p><strong>Top Strategy:</strong> The buzzword is "Productivity". Show how your project makes your factory produce more widgets per hour, allowing you to export closer to the US border.</p>
                        <p><strong>Key Programs:</strong> NGen (Next Generation Manufacturing Canada), Yves Landry Foundation.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* New Section V4: The Federal Funding Glossary */}
                <div className="mt-20 border-t border-gray-200 pt-16">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                    <Book className="w-8 h-8 text-slate-600 mr-3" />
                    What is the Federal Funding Glossary (A-Z)?
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Government officers speak a different language. If you use the wrong terminology in your application, you will be flagged as an amateur. Here are the 20 terms you must know.
                  </p>
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                    <div>
                      <h4 className="font-bold text-gray-900">CA (Contribution Agreement)</h4>
                      <p className="text-sm text-gray-600 mb-4">The legal contract you sign after winning a grant. It dictates the payment schedule and reporting requirements. It is a binding document.</p>

                      <h4 className="font-bold text-gray-900">Eligible Costs</h4>
                      <p className="text-sm text-gray-600 mb-4">Expenses the grant will actually cover. Usually: Salaries, Consultant Fees, Materials. Usually NOT: Rent, Founder Salaries (unless specified), Alcohol/Entertainment.</p>

                      <h4 className="font-bold text-gray-900">Fiscal Year</h4>
                      <p className="text-sm text-gray-600 mb-4">The government year runs April 1st to March 31st. Funds must often be "spent" within the fiscal year. The "March Madness" rush is real.</p>

                      <h4 className="font-bold text-gray-900">Holdback</h4>
                      <p className="text-sm text-gray-600 mb-4">The government often holds back 10-15% of the total grant until the final project report is submitted and approved. Plan your cash flow accordingly.</p>

                      <h4 className="font-bold text-gray-900">In-Kind Contribution</h4>
                      <p className="text-sm text-gray-600 mb-4">Non-cash contributions you make to a project (e.g., using a machine you already own). Some grants count this towards your 25% share; most do not.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Stacking Limit</h4>
                      <p className="text-sm text-gray-600 mb-4">The maximum total government funding (Federal + Provincial + Municipal) allowed for one project. Usually capped at 75%.</p>

                      <h4 className="font-bold text-gray-900">GBA+ (Gender-based Analysis Plus)</h4>
                      <p className="text-sm text-gray-600 mb-4">A mandatory section in almost all applications now. You must explain how your project affects diverse groups (Women, Indigenous, Youth). Do not leave this blank.</p>

                      <h4 className="font-bold text-gray-900">TRL (Technology Readiness Level)</h4>
                      <p className="text-sm text-gray-600 mb-4">A scale from 1 (Concept) to 9 (Commercial). Grants usually target TRL 3-6 (Development). Loans usually target TRL 7-9 (Scale-up).</p>

                      <h4 className="font-bold text-gray-900">Milestone-Based Payment</h4>
                      <p className="text-sm text-gray-600 mb-4">You get paid <em>after</em> you complete a step. Grants are rarely upfront cash. You spend the money, prove it, and get reimbursed.</p>

                      <h4 className="font-bold text-gray-900">Claims Process</h4>
                      <p className="text-sm text-gray-600 mb-4">The bureaucratic process of submitting invoices and timesheets to get your money released. Can be tedious.</p>
                    </div>
                  </div>
                </div>

                {/* New Section V4: Top 10 Priority Industries */}
                <div className="mt-20 bg-slate-50 p-10 rounded-2xl border border-slate-200">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                    <List className="w-8 h-8 text-slate-600 mr-3" />
                    What is the Priority Industry Scored List?
                  </h2>
                  <p className="text-lg text-slate-600 mb-8">
                    The government favors some industries over others. Based on current mandates, here is the "Fundability Score" for 2026.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <span className="font-bold text-lg">1. Critical Minerals (Lithium/Cobalt)</span>
                      <Badge className="bg-green-600">Score: 10/10</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <span className="font-bold text-lg">2. Clean Tech / Carbon Capture</span>
                      <Badge className="bg-green-600">Score: 9.5/10</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <span className="font-bold text-lg">3. Biomanufacturing & Vaccines</span>
                      <Badge className="bg-green-600">Score: 9/10</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <span className="font-bold text-lg">4. Artificial Intelligence (AI Safety)</span>
                      <Badge className="bg-green-500">Score: 8.5/10</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <span className="font-bold text-lg">5. Affordable Housing Tech</span>
                      <Badge className="bg-green-500">Score: 8.5/10</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <span className="font-bold text-lg">6. Agri-Food Processing</span>
                      <Badge className="bg-yellow-500">Score: 7/10</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <span className="font-bold text-lg">7. Advanced Manufacturing</span>
                      <Badge className="bg-yellow-500">Score: 7/10</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <span className="font-bold text-lg">8. Tourism (Post-Covid Recovery)</span>
                      <Badge className="bg-yellow-600">Score: 6/10</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <span className="font-bold text-lg">9. General Retail / E-commerce</span>
                      <Badge className="bg-red-500">Score: 2/10</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <span className="font-bold text-lg">10. Consulting / Professional Services</span>
                      <Badge className="bg-red-500">Score: 1/10</Badge>
                    </div>
                  </div>
                </div>


                {/* FAQ Section */}
                <div className="mt-20 pt-10 border-t border-gray-200">
                  <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {faqData.map((faq, index) => (
                      <div key={index} className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                        <h4 className="font-bold text-xl text-gray-900 mb-2 flex items-start">
                          <HelpCircle className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" />
                          {faq.question}
                        </h4>
                        <p className="text-gray-600 ml-8">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-10">
                <Card className="bg-red-50 border-red-100 sticky top-28 shadow-lg">
                  <CardHeader className="bg-red-100/50 pb-4">
                    <CardTitle className="text-red-900 text-lg">Federal Cheat Sheet</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 text-sm pt-6">
                    <div className="flex justify-between items-center pb-3 border-b border-red-200/60">
                      <span className="text-red-700 font-medium flex items-center"><Clock className="w-4 h-4 mr-2" /> Wait Time</span>
                      <span className="font-bold text-gray-900">4 - 8 Months</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-red-200/60">
                      <span className="text-red-700 font-medium flex items-center"><Target className="w-4 h-4 mr-2" /> Success Rate</span>
                      <span className="font-bold text-gray-900">~15% (Generic)</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-red-200/60">
                      <span className="text-red-700 font-medium flex items-center"><DollarSign className="w-4 h-4 mr-2" /> Max Stacking</span>
                      <span className="font-bold text-gray-900">75% of Costs</span>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-red-100">
                      <p className="text-xs text-gray-500 mb-2 font-bold uppercase">Pro Tip</p>
                      <p className="text-gray-700 italic">"Always write your application in a Word doc first. Government portals time-out and crash constantly."</p>
                    </div>

                    <div className="pt-2">
                      <Button className="w-full bg-red-700 hover:bg-red-800 text-lg py-6 shadow-md" asChild>
                        <Link href="/contact">Book Strategy Session</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter Box */}
                <NewsletterBox />

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Trending Federal Programs</h3>
                  <ul className="space-y-4">
                    <li>
                      <Link href="/blog/canexport-guide" className="text-blue-600 hover:text-blue-800 hover:underline flex items-start group">
                        <Globe className="w-5 h-5 mr-3 shrink-0 mt-0.5 group-hover:scale-110 transition" />
                        <span><strong>CanExport SMEs</strong><br /><span className="text-xs text-gray-500 font-normal">Up to $50k for marketing</span></span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/cdap-guide" className="text-blue-600 hover:text-blue-800 hover:underline flex items-start group">
                        <Zap className="w-5 h-5 mr-3 shrink-0 mt-0.5 group-hover:scale-110 transition" />
                        <span><strong>CDAP (Digital Adoption)</strong><br /><span className="text-xs text-gray-500 font-normal">$2,400 micro-grants</span></span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/sred-guide" className="text-blue-600 hover:text-blue-800 hover:underline flex items-start group">
                        <PieChart className="w-5 h-5 mr-3 shrink-0 mt-0.5 group-hover:scale-110 transition" />
                        <span><strong>SR&ED Tax Credits</strong><br /><span className="text-xs text-gray-500 font-normal">Refundable R&D wages</span></span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <AdSlot adSlot="5544332211" adFormat="vertical" style={{ minHeight: '600px' }} />
              </aside>

            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">❓ What are Common Questions About Canadian Federal Grants?</h2>
              <p className="text-lg text-gray-600 text-center mb-8">Quick answers to the most frequently asked questions about federal business funding programs.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#irap" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-red-100">
                  <h3 className="font-semibold text-red-700">What is NRC-IRAP?</h3>
                  <p className="text-sm text-gray-600 mt-1">Canada's premier R&D funding program, covering up to 80% of eligible project costs</p>
                </a>
                <a href="#sred" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-red-100">
                  <h3 className="font-semibold text-red-700">How does SR&ED work?</h3>
                  <p className="text-sm text-gray-600 mt-1">Tax credits up to 65% on R&D wages, refundable for CCPCs</p>
                </a>
                <a href="#eligibility" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-red-100">
                  <h3 className="font-semibold text-red-700">Do I qualify for federal grants?</h3>
                  <p className="text-sm text-gray-600 mt-1">Most Canadian-incorporated businesses with innovation projects qualify</p>
                </a>
                <a href="#stacking" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-red-100">
                  <h3 className="font-semibold text-red-700">Can I stack federal with provincial programs?</h3>
                  <p className="text-sm text-gray-600 mt-1">Yes, up to 75% of project costs with proper program coordination</p>
                </a>
                <a href="#timeline" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-red-100">
                  <h3 className="font-semibold text-red-700">How long does approval take?</h3>
                  <p className="text-sm text-gray-600 mt-1">4-8 weeks for IRAP, 4-8 months for larger Strategic Innovation Fund projects</p>
                </a>
                <a href="#repayable" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-red-100">
                  <h3 className="font-semibold text-red-700">Are federal grants repayable?</h3>
                  <p className="text-sm text-gray-600 mt-1">Many are non-repayable, but larger programs may require partial repayment on success</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">📚 Related Guides</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/blog/ideation-research-funding-canada" className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Stage 1: Ideation & Research</h3>
                  <p className="text-sm text-gray-600">NSERC Discovery Grants and early-stage research funding</p>
                </Link>
                <Link href="/blog/development-proof-concept-funding-canada" className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Stage 2: Development & Proof-of-Concept</h3>
                  <p className="text-sm text-gray-600">IRAP, SR&ED, and prototype development funding</p>
                </Link>
                <Link href="/blog/demonstration-pilot-funding-canada" className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Stage 3: Demonstration & Pilot</h3>
                  <p className="text-sm text-gray-600">SDTC, Clean Growth, and pre-commercial demonstration</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 text-white py-24 border-t border-gray-800">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Stop Guessing. Start winning.</h2>
            <p className="text-gray-400 mb-10 text-xl max-w-2xl mx-auto">
              The difference between a rejection letter and a $100,000 cheque is often just one sentence in the "Benefits to Canada" section. Don't leave it to chance.
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-10 py-8 text-xl shadow-2xl hover:scale-105 transition-all" asChild>
              <Link href="/contact">Get Professional Application Support</Link>
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
