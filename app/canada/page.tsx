import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, DollarSign, Users, Landmark, AlertCircle, FileText } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
  title: "Government Grants Canada 2026: 300+ Programs, $10B+ Available",
  description:
    "Browse 300+ government grants in Canada for small businesses and startups. Federal & provincial programs with $800M+ available. Free eligibility checker.",
  keywords:
    "government grants canada, canada business grants, government funding canada, federal grants Canada, provincial grants, startup funding Canada, small business funding canada",
  openGraph: {
    title: "Government Grants Canada 2026: 300+ Programs, $10B+ Available",
    description: "Browse 300+ government grants in Canada for small businesses and startups.",
    url: "https://www.fsidigital.ca/canada",
  },
}

export default function CanadaGrantsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              🇨🇦 Canadian Federal & Provincial Grants
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Canadian Government Grants for{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Business Growth
              </span>
            </h1>
            {/* EEAT Badge — inside hero */}
            <div className="mb-6 flex justify-center">
              <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-03-01" />
            </div>
            {/* Short Answer — question-first, data-rich, inside hero */}
            <div className="mb-8 text-left">
              <ShortAnswerBox
                question="Can Canadian businesses get non-repayable government grants in 2026?"
                content="Yes — and the most powerful programs are stackable. The SR&ED tax credit alone returns 35–70% of your R&D spend as a CRA cheque (no competition, no application — you just do the work and file). NRC-IRAP grants fund up to $10M for direct innovation projects. The CDAP Digital Adoption Grant provides $15,000 cash within 4–8 weeks. Stacking all three on a single $200K R&D project can yield over $120K in government contributions — without surrendering any equity."
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                Browse Federal Grants
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                View Provincial Programs
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* EligibleCheck below hero */}
      <section className="py-6 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <EligibleCheck />
          </div>
        </div>
      </section>



      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">$800M+</div>
              <div className="text-gray-600">Available Funding</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">300+</div>
              <div className="text-gray-600">Active Programs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">13</div>
              <div className="text-gray-600">Provinces & Territories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">15,000+</div>
              <div className="text-gray-600">Businesses Funded</div>
            </div>
          </div>
        </div>
      </section>

      {/* Federal Programs */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Federal Grant Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore major federal funding opportunities available to businesses across Canada.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-red-100 text-red-800">Federal</Badge>
                  <span className="text-sm text-gray-500">Rolling</span>
                </div>
                <CardTitle>Strategic Innovation Fund</CardTitle>
                <CardDescription>Large-scale transformative business projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding:</span>
                    <span className="font-semibold text-green-600">$10M+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Eligibility:</span>
                    <span className="text-sm">All business sizes</span>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link href="/canada/innovation-grants">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-red-100 text-red-800">ISED</Badge>
                  <span className="text-sm text-gray-500">Ongoing</span>
                </div>
                <CardTitle>Canada Small Business Financing</CardTitle>
                <CardDescription>Government-backed loans and grants for SMEs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding:</span>
                    <span className="font-semibold text-green-600">$25K - $1M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Eligibility:</span>
                    <span className="text-sm">Small businesses</span>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link href="/canada/small-business-grants">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-green-100 text-green-800">Clean Tech</Badge>
                  <span className="text-sm text-gray-500">Apr 15</span>
                </div>
                <CardTitle>Clean Growth Program</CardTitle>
                <CardDescription>Funding for clean technology innovation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding:</span>
                    <span className="font-semibold text-green-600">$100K - $5M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Eligibility:</span>
                    <span className="text-sm">Clean tech companies</span>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link href="/contact">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Provincial Programs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Provincial Grant Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover province-specific funding opportunities in your region.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { province: "Ontario", grants: 65, funding: "$200M", slug: "ontario" },
              { province: "Quebec", grants: 55, funding: "$150M", slug: "quebec" },
              { province: "Alberta", grants: 42, funding: "$120M", slug: "alberta" },
              { province: "British Columbia", grants: 48, funding: "$140M", slug: "british-columbia" },
              { province: "Manitoba", grants: 25, funding: "$60M", slug: "manitoba" },
              { province: "Saskatchewan", grants: 22, funding: "$50M", slug: "saskatchewan" },
              { province: "Nova Scotia", grants: 18, funding: "$40M", slug: "nova-scotia" },
              { province: "New Brunswick", grants: 15, funding: "$35M", slug: "new-brunswick" },
            ].map((province) => (
              <Card key={province.province} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-5 h-5 text-primary mr-2" />
                    <h3 className="font-semibold text-lg">{province.province}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Grants:</span>
                      <span className="font-semibold">{province.grants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-semibold text-green-600">{province.funding}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline" asChild>
                    <Link href={`/canada/${province.slug}`}>View Grants</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find grants tailored to your business type and industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Women-Owned Business",
                description: "Dedicated funding for women entrepreneurs",
                icon: Users,
                count: "45+ grants",
                href: "/canada/women-entrepreneurship-grants",
              },
              {
                title: "Indigenous Entrepreneurs",
                description: "Support for Indigenous business owners",
                icon: Users,
                count: "35+ grants",
                href: "/canada/indigenous-entrepreneur-grants",
              },
              {
                title: "Innovation Grants",
                description: "Funding for tech and innovation projects",
                icon: DollarSign,
                count: "85+ grants",
                href: "/canada/innovation-grants",
              },
              {
                title: "Green Energy",
                description: "Clean energy and sustainability funding",
                icon: DollarSign,
                count: "40+ grants",
                href: "/canada/green-energy-grants",
              },
              {
                title: "Agriculture",
                description: "Farming and agri-business funding",
                icon: DollarSign,
                count: "30+ grants",
                href: "/canada/agriculture-startup-funding",
              },
              {
                title: "Healthcare",
                description: "Medical and healthcare innovation grants",
                icon: DollarSign,
                count: "25+ grants",
                href: "/canada/healthcare-startup-grants",
              },
            ].map((category) => (
              <Card key={category.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mr-4">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {category.count}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <Link href={category.href}>
                      Explore Grants <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
      
      {/* Deep Content Sections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-10">

            <Card>
              <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Landmark className="h-5 w-5 text-red-600" />How the Canadian Federal Business Grant System Works</CardTitle></CardHeader>
              <CardContent className="text-gray-700 space-y-4">
                <p className="leading-relaxed">
                  The Canadian government distributes over $10 billion annually in business grants, contributions, and repayable advances. Unlike the U.S. system which relies heavily on the SBIR framework, Canada's funding landscape is centralized through <strong>Innovation, Science and Economic Development Canada (ISED)</strong> and executed through specialized Regional Development Agencies (RDAs) spanning from coast to coast.
                </p>
                <p className="leading-relaxed">
                  The most crucial strategic concept for Canadian businesses is <strong>"stacking."</strong> Federal rules generally allow you to stack multiple government funding sources (e.g., a provincial grant plus a federal tax credit) up to a maximum threshold—usually 75% of total project costs. Understanding the stacking rules prevents the most common mistake: applying for a program that inadvertently disqualifies you from a larger, more lucrative tax credit like SR&ED.
                </p>
                <p className="leading-relaxed">
                  Canadian business funding generally flows through three tiers. First, <strong>Federal Tax Credits</strong> (like SR&ED), which are entitlement programs—if you do the R&D, you are entitled to the refund regardless of competition. Second, <strong>Direct Federal Grants</strong> (like IRAP or the Strategic Innovation Fund), which are highly competitive and require deep technical alignment with federal priorities. Third, <strong>Regional Development block grants</strong>, managed by agencies like ACOA (Atlantic), CED (Quebec), FedDev (Ontario), and PacifiCan (BC), which focus primarily on local job creation and economic stimulation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 bg-red-50">
              <CardHeader><CardTitle className="text-xl text-red-900">NRC-IRAP and SR&ED — Canada's Twin Pillars of Funding</CardTitle></CardHeader>
              <CardContent className="text-red-900 space-y-4">
                <p className="text-sm leading-relaxed">
                  The National Research Council's Industrial Research Assistance Program (NRC-IRAP) and the Scientific Research and Experimental Development (SR&ED) tax incentive are the two largest sources of non-dilutive capital for innovative Canadian SMEs. Every Canadian technology company must understand how these two programs interact.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="font-bold text-red-900 mb-1 text-sm">NRC-IRAP (Direct Grant)</div>
                    <div className="text-xs font-semibold text-red-700 mb-2">Up to $10M for large projects</div>
                    <div className="text-xs text-red-600">Proactive, competitive funding applied for <em>before</em> the project begins. Highly discretionary, managed by an Industrial Technology Advisor (ITA). Covers up to 80% of internal R&D salary costs.</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="font-bold text-red-900 mb-1 text-sm">SR&ED (Tax Credit)</div>
                    <div className="text-xs font-semibold text-red-700 mb-2">Up to 35% Federal + 15-30% Provincial Refund</div>
                    <div className="text-xs text-red-600">Retroactive entitlement program claimed <em>after</em> the fiscal year ends. If your work meets the definition of scientific research or experimental development, you get the refund. It is not a competitive grant.</div>
                  </div>
                </div>
                <p className="text-sm border-t border-red-200 pt-3 mt-2">
                  <strong>The Stacking Strategy:</strong> IRAP grants are deducted from your SR&ED eligible expenditure pool. However, combining them is still the optimal strategy. Use IRAP to aggressively fund the project upfront (easing cash flow), then use SR&ED to claim the remaining un-subsidized portion of the R&D costs at year-end. 
                </p>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">Key Federal Agencies & Programs</CardTitle></CardHeader>
                <CardContent className="text-gray-700">
                  <div className="space-y-3 text-sm">
                    {[
                      ["Canada Digital Adoption Program (CDAP)", "$15K grant + $100K 0% interest loan", "Digital transformation, e-commerce, and software adoption."], 
                      ["Strategic Innovation Fund (SIF)", "$10M minimum project size", "Large-scale industrial, transformative, and collaborative tech projects."], 
                      ["CanExport SMEs", "Up to $50K (covers 50% of costs)", "International market expansion, trade shows, and IP protection abroad."], 
                      ["Agriculture and Agri-Food Canada (AAFC)", "$200K - $5M+", "AgriInnovate, AgriScience, and local food infrastructure."],
                      ["Sustainable Development Technology Canada (SDTC)", "Average $3M", "Pre-commercial demonstration of clean technology innovations."]
                    ].map(([agency, amount, focus]) => (
                      <div key={agency} className="bg-gray-50 rounded-lg p-3">
                        <div className="font-semibold text-gray-900">{agency}</div>
                        <div className="text-xs font-medium text-green-700 mt-0.5">{amount}</div>
                        <div className="text-xs text-gray-500 mt-1">{focus}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Regional Development Agencies (RDAs)</CardTitle></CardHeader>
                <CardContent className="text-gray-700 space-y-3 text-sm">
                  <p className="leading-relaxed">Canada operates 7 Regional Development Agencies. These federal bodies distribute billions in funding specifically tailored to the economic realities of their distinct regions. They focus on job creation, scaling up, and economic diversification.</p>
                  <div className="space-y-2">
                    {[
                      ["ACOA", "Atlantic Canada Opportunities Agency (NB, NS, PEI, NL)"], 
                      ["CED", "Canada Economic Development for Quebec Regions"], 
                      ["FedDev & FedNor", "Federal Economic Development for Southern and Northern Ontario"], 
                      ["PrairiesCan", "Prairies Economic Development Canada (AB, SK, MB)"], 
                      ["PacifiCan", "Pacific Economic Development Canada (British Columbia)"],
                      ["CanNor", "Canadian Northern Economic Development Agency (Territories)"]
                    ].map(([agency, desc]) => (
                      <div key={agency} className="bg-gray-50 rounded p-3">
                        <div className="font-semibold text-gray-900 text-xs">{agency}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* How to Apply */}
            <Card>
              <CardHeader><CardTitle className="text-xl flex items-center gap-2"><FileText className="h-5 w-5 text-red-600" />How to Apply for Canadian Grants — 5-Step Strategy</CardTitle></CardHeader>
              <CardContent className="text-gray-700">
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Build Your CRA My Business Account Properly", desc: "Unlike the US SAM.gov system, the Canadian grant system relies entirely on your CRA Business Number (BN9). Ensure your corporate taxes are filed and up to date. Applications to programs like CanExport or CDAP are instantly rejected if your CRA account shows outstanding balances or unfiled returns. Ensure your NAICS code matches the specific industry you are requesting grants for." },
                    { step: "2", title: "Do NOT Start the Project Before Signing the Agreement", desc: "This is the cardinal rule of Canadian government funding. Except for SR&ED (which is retroactive), almost every federal and provincial grant operates on a strict 'No Retroactive Funding' policy. If you sign a vendor contract, hire the employee, or purchase the equipment before the grant agreement is officially signed by the government minister, those costs immediately become entirely ineligible." },
                    { step: "3", title: "Secure Your Matching Funds First", desc: "Canadian grants almost never cover 100% of a project. They are usually reimbursement grants covering 25% to 75% of eligible costs. When you apply, you must prove you have the remaining cash (the 'industry contribution') sitting in a bank account, or available via an approved commercial loan. The government will not fund a project if you cannot prove you can cash-flow the matching requirement." },
                    { step: "4", title: "Befriend Your Local IRAP ITA or RDA Officer", desc: "Canadian funding is highly relationship-driven. Programs like NRC-IRAP are discretionary, meaning the individual Industrial Technology Advisor (ITA) assessing your company has massive sway over whether you receive $50K, $500K, or nothing. Before submitting any massive application, schedule an introductory call with your RDA or IRAP representative to pitch the concept. They will often tell you exactly what language to use in the application to ensure it gets approved by the higher committee." },
                    { step: "5", title: "Build a Funding 'Stacking' Roadmap", desc: "Map your projects 12 to 18 months in advance. Hire a student using the Student Work Placement Program (SWPP for 75% wage subsidy), use an IRAP grant to cover 80% of the R&D team's salaries for a 6-month dev sprint, use CanExport to cover 50% of the costs to launch the product in the US, and finally claim SR&ED at year-end on the remaining un-subsidized portions. Strategic execution of this stack is how Canadian startups stretch 12 months of runway into 24 months." },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-red-700 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                      <div><div className="font-semibold text-gray-900 mb-1">{item.title}</div><div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Common Mistakes */}
            <Card className="border-red-100 bg-red-50">
              <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-red-900"><AlertCircle className="h-5 w-5 text-red-600" />5 Costly Mistakes Canadian Businesses Make with Government Grants</CardTitle></CardHeader>
              <CardContent className="text-red-900 space-y-4">
                {[
                  { n: "1", m: "Applying for Programs You Don't Have the Cash Flow to Support", d: "Canadian grants are almost exclusively reimbursement-based. You must spend the money first, submit claims (usually quarterly), and wait 30-60 days for the government wire transfer. If you don't have the runway to cash-flow the initial $100K spend, winning a $50K reimbursement grant will bankrupt you before the government cheque ever arrives." },
                  { n: "2", m: "Violating the Stacking Limit", d: "Federal rules dictate that total government assistance (Federal + Provincial + Municipal) cannot exceed a certain percentage of total project costs—usually 75%. If you receive an IRAP grant, a provincial hiring subsidy, AND try to claim SR&ED on the exact same salary dollar, the CRA will claw back the excess during an audit. You must meticulously track which grant funded which specific activity." },
                  { n: "3", m: "Writing Technical Manuals Instead of Business Cases", d: "Founders often write 20 pages detailing the brilliance of their algorithm. The government reviewer reading the application is an economist, not a software engineer. Canadian grants are economic development tools. If you do not explicitly detail how the project creates high-paying Canadian jobs, generates export revenue, or reduces greenhouse gas emissions, your technical brilliance will be rejected." },
                  { n: "4", m: "Ignoring Provincial Programs in Favor of Federal Ones", d: "Everyone applies for federal SIF or IRAP because the numbers are massive. However, provincial programs (like Ontario's OINDF or Alberta Innovates) are often vastly less competitive, have faster turnaround times, and are administered by local officers who actively want to deploy capital in their specific city or region to hit their own quotas." },
                  { n: "5", m: "Failing to Maintain Meticulous Timesheets", d: "If you win a wage subsidy, IRAP, or SR&ED, your employees MUST track their time religiously. If the CRA audits your SR&ED claim or ISED audits your IRAP grant and you cannot produce contemporaneous daily timesheets proving exactly how many hours an engineer spent on the specific eligible project vs. general bug fixing, the government will demand every penny back, with interest." },
                ].map(({ n, m, d }) => (
                  <div key={n} className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="font-semibold mb-2 text-red-900">{n}. {m}</div>
                    <p className="text-sm text-red-800 leading-relaxed">{d}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">FAQ: Canadian Government Business Grants 2026</h2>
              <div className="space-y-4">
                {[
                  { q: "Do I have to pay back a Canadian government grant?", a: "It depends entirely on the program's legal structure. 'Non-repayable contributions' (true grants) like CanExport or IRAP do not need to be repaid. 'Repayable contributions' (essentially 0% interest loans) like many ACOA or FedDev scale-up programs must be repaid over a 3-to-5 year schedule. Always read the term sheet carefully; Canada relies heavily on conditionally repayable contributions where repayment is tied to gross revenue milestones." },
                  { q: "Is SR&ED considered a grant?", a: "No, SR&ED is a federal tax incentive program administered by the Canada Revenue Agency (CRA). However, for Canadian Controlled Private Corporations (CCPCs), the SR&ED credit is 'refundable.' This means if your tech startup owes exactly $0 in corporate tax because it's pre-revenue, the CRA will issue you a physical cheque for the credit amount (up to 35% of eligible salaries). In practice, it acts like a massive retroactive grant." },
                  { q: "Are Canadian grants taxable income?", a: "Yes. The CRA considers grant money to be taxable government assistance. You must claim the grant as income, or use it to reduce your deductible business expenses for the year. This effectively means you will pay corporate tax on the grant amount, reducing the 'true' value of the grant by your corporate tax rate. Always loop your CPA into your grant strategy." },
                  { q: "Can a sole proprietorship get government grants in Canada?", a: "It is extremely difficult. 95% of federal and provincial grants require the applicant to be an incorporated entity (Provincial or Federal Corporation) operating in Canada. Sole proprietorships are generally only eligible for small, local micro-grants or specific self-employment benefit programs through provincial employment ministries. If you want serious funding, incorporate." },
                  { q: "Are there grants for buying real estate or general business equipment?", a: "Almost never. The Canadian government does not provide grants for standard operational costs, buying buildings, standard vehicles, or basic inventory. Grants are designed to offset the 'risk' of activities that benefit Canada: creating new innovative IP, breaking into foreign export markets (CanExport), adopting advanced Industry 4.0 robotics (CDAP), or reducing carbon footprints." },
                  { q: "What is a 'stacking limit'?", a: "A stacking limit is the maximum percentage of a project's total cost that can be funded by combined government sources. Typical federal stacking limits are 75%. If your $100K project gets a $50K provincial grant and a $40K federal grant ($90K total), you have hit 90% funding, violating the 75% rule. The federal government will claw back $15,000 to bring you back down to the legal limit." },
                  { q: "How long does the application process take in Canada?", a: "Depending on the agency, it varies wildly. CDAP micro-grants take 2-4 weeks. CanExport takes up to 60 days. Major Regional Development Agency (RDA) scale-up grants take 4 to 6 months of negotiations and due diligence. The Strategic Innovation Fund (SIF) can take 12 to 18 months. Plan your corporate finances assuming the absolute longest government timeline." },
                  { q: "Will the government fund a business plan or idea?", a: "No. The Canadian government does not fund 'ideas.' To access major federal grants, you must have an established incorporated business, a minimally viable product (MVP), early traction, and the financial capacity to cover your portion of the project costs. If you are literally at the 'idea' stage, look into Futurpreneur Canada loans, BDC startup loans, or local university incubators." },
                ].map((item, i) => (
                  <Card key={i}><CardContent className="pt-5">
                    <div className="font-semibold text-gray-900 mb-2 text-base">{item.q}</div>
                    <div className="text-gray-600 text-sm leading-relaxed">{item.a}</div>
                  </CardContent></Card>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

        </div>
      </section>

      {/* Popular Guides Section */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Business Funding Guides</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In-depth guides to help you navigate Canadian business funding programs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/blog/ontario-government-business-grants" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">Ontario Government Business Grants</h3>
              <p className="text-gray-600 text-sm">Complete guide to Starter Company Plus, OCASE, and manufacturing grants in Ontario.</p>
            </Link>
            <Link href="/blog/alberta-business-grants-2026" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">Alberta Government Business Grants</h3>
              <p className="text-gray-600 text-sm">Alberta Innovates, cleantech grants, and energy sector funding programs.</p>
            </Link>
            <Link href="/blog/bc-business-grants-2026" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">BC Government Business Grants</h3>
              <p className="text-gray-600 text-sm">Innovate BC, CleanBC, Creative BC, and PacifiCan funding opportunities.</p>
            </Link>
            <Link href="/blog/csbfp-canada-small-business-financing-program" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">CSBFP Financing Guide</h3>
              <p className="text-gray-600 text-sm">How to secure up to $1.15M in government-guaranteed loans for your business.</p>
            </Link>
            <Link href="/blog/scotiabank-women-initiative" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">Scotiabank Women Initiative</h3>
              <p className="text-gray-600 text-sm">Access capital, advisory services, and education for women entrepreneurs.</p>
            </Link>
            <Link href="/blog/canada-agri-food-technology-innovation-grants" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">Agri-Food Innovation Grants</h3>
              <p className="text-gray-600 text-sm">AgriScience, AgriInnovate, and CAP framework funding for agriculture tech.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-Country & Category Internal Links */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Also Explore</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/usa" className="group block p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">🇺🇸 USA Business Grants 2026</h3>
              <p className="text-sm text-gray-600">Explore $2.5B+ in federal and state funding across all 50 US states.</p>
            </Link>
            <Link href="/canada/women-business-grants" className="group block p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">👩‍💼 Women Business Grants Canada</h3>
              <p className="text-sm text-gray-600">$6B+ available through WELF, BDC, and Women Entrepreneurship Strategy.</p>
            </Link>
            <Link href="/blog/sba-loans-grants-guide" className="group block p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">🏦 SBA Microloan Program Guide</h3>
              <p className="text-sm text-gray-600">Up to $50K through nonprofit intermediaries — requirements, terms, and how to apply.</p>
            </Link>
            <Link href="/usa/women-entrepreneurs-grants" className="group block p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">👩‍💼 Women Entrepreneurs USA</h3>
              <p className="text-sm text-gray-600">SBA microloans, federal funding up to $1M for women-owned businesses.</p>
            </Link>
            <Link href="/usa/federal-grants" className="group block p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">🏛 Federal Grants USA</h3>
              <p className="text-sm text-gray-600">SBIR/STTR, DOE, NIH, and NSF innovation grants for startups.</p>
            </Link>
            <Link href="/blog/canada-startup-funding-grants-guide" className="group block p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">📚 Canada Startup Funding Guide</h3>
              <p className="text-sm text-gray-600">35+ programs worth $1.2B+ for Canadian startups.</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
