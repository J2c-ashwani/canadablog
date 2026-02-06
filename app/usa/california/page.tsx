import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"

export const metadata: Metadata = {
  title: "California Small Business Grants 2025 | State Funding Programs",
  description:
    "Find California small business grants and state funding programs. Comprehensive guide to CA government grants, eligibility requirements, and application deadlines.",
  keywords:
    "California small business grants, CA state funding, California government grants, small business funding California",
  alternates: {
    canonical: "https://www.fsidigital.ca/usa/california",
  },
}

const californiaGrants: Grant[] = [
  {
    id: "ca-loan-guarantee",
    name: "California Small Business Loan Guarantee Program",
    fundingMin: 50000,
    fundingMax: 2500000,
    eligibility: ["Small businesses with <500 employees", "CA-based operations", "Non-profits"],
    deadline: "Rolling basis",
    applicationLink: "https://www.ibank.ca.gov/small-business/loan-guarantee-program/",
    description: "Loan guarantees to help small businesses access capital for startup costs, inventory, and expansion.",
    country: "USA",
    region: "California",
    category: "Small Business",
    agency: "IBank",
    status: "Active",
    tags: ["Loan Guarantee", "Capital Access", "Small Business"],
    requirements: ["Lender pre-qualification", "Business plan", "Financial statements"],
    lastUpdated: "2025-01-20"
  },
  {
    id: "ca-competes",
    name: "California Competes Tax Credit",
    fundingMin: 20000,
    fundingMax: 10000000,
    eligibility: ["Businesses creating jobs in CA", "All industries", "Startups and established firms"],
    deadline: "Multiple rounds yearly",
    applicationLink: "https://www.business.ca.gov/advantages/california-competes/",
    description: "Income tax credits for businesses that want to locate in California or stay and grow in the state.",
    country: "USA",
    region: "California",
    category: "Tax Credit",
    agency: "GO-Biz",
    status: "Active",
    tags: ["Tax Credit", "Job Creation", "Economic Development"],
    requirements: ["Online application", "5-year growth plan", "Job creation milestones"],
    lastUpdated: "2025-01-20"
  },
  {
    id: "ca-calseed",
    name: "CalSEED Program",
    fundingMin: 150000,
    fundingMax: 600000,
    eligibility: ["Clean energy startups", "California-based innovators", "Early-stage technology"],
    deadline: "Annual",
    applicationLink: "https://www.calseed.fund/",
    description: "Early-stage funding for clean energy concepts and prototypes helping California meet climate goals.",
    country: "USA",
    region: "California",
    category: "Green Energy",
    agency: "California Energy Commission",
    status: "Upcoming",
    tags: ["Clean Energy", "Innovation", "Startup"],
    requirements: ["Concept proposal", "Technical merit review", "Equity-free requirement"],
    lastUpdated: "2025-01-20"
  },
  {
    id: "ca-calcap",
    name: "California Capital Access Program",
    fundingMin: 5000,
    fundingMax: 5000000,
    eligibility: ["Small businesses", "Manufacturers", "Service providers"],
    deadline: "Rolling",
    applicationLink: "https://www.treasurer.ca.gov/cpcfa/calcap/",
    description: "A loan loss reserve program that may provide up to 100% coverage on losses as a result of certain loan defaults.",
    country: "USA",
    region: "California",
    category: "Small Business",
    agency: "State Treasurer's Office",
    status: "Active",
    tags: ["Loans", "Capital Access", "Collateral Support"],
    requirements: ["Participating lender application", "Business license", "Credit check"],
    lastUpdated: "2025-01-20"
  },
]

export default function CaliforniaGrantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                California State Funding
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">California Small Business Grants 2025</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover comprehensive California state funding programs, small business grants, and government incentives
              available to entrepreneurs and growing businesses in the Golden State.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Available Funding</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">$500M+</div>
                <p className="text-xs text-muted-foreground">Annual state funding programs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">25+</div>
                <p className="text-xs text-muted-foreground">State grant programs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">35%</div>
                <p className="text-xs text-muted-foreground">Average approval rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Grant Comparison Table */}
          <div className="mb-12">
            <GrantComparisonTable
              grants={californiaGrants}
              title="California Small Business Grants Comparison"
            />
          </div>

          {/* Content Sections */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>California Small Business Grant Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    California offers extensive small business grant programs designed to support entrepreneurs,
                    startups, and growing businesses across diverse industries. The state's commitment to economic
                    development has resulted in over $500 million in annual funding opportunities.
                  </p>

                  <h3>Key California Grant Programs</h3>
                  <ul>
                    <li>
                      <strong>California Small Business Loan Guarantee Program</strong> - Provides loan guarantees up to
                      $2.5M
                    </li>
                    <li>
                      <strong>California Competes Tax Credit</strong> - $180M annually in tax incentives
                    </li>
                    <li>
                      <strong>CalSEED Program</strong> - Clean energy startup funding up to $150K
                    </li>
                    <li>
                      <strong>California Capital Access Program</strong> - Loan loss reserves for small business lending
                    </li>
                  </ul>

                  <h3>Eligibility Requirements</h3>
                  <p>
                    Most California small business grants require businesses to be located in California, demonstrate
                    job creation potential, and meet specific industry or demographic criteria. Common requirements
                    include:
                  </p>
                  <ul>
                    <li>California business registration and operations</li>
                    <li>Fewer than 500 employees (SBA definition)</li>
                    <li>Annual revenue under $14 million</li>
                    <li>Commitment to job creation or retention</li>
                  </ul>

                  <h3>Application Process</h3>
                  <p>
                    California grant applications typically require comprehensive business plans, financial statements,
                    and detailed project descriptions. The state emphasizes economic impact, innovation, and community
                    benefit in its evaluation criteria.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Industry-Specific California Grants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Technology & Innovation</h4>
                      <ul className="text-sm space-y-1">
                        <li>• CalSEED Clean Energy Program</li>
                        <li>• <Link href="/blog/california-tech-programs" className="text-primary hover:underline">California Innovation Hub & Tech Grants (Guide)</Link></li>
                        <li>• Tech Startup Tax Credits</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Manufacturing</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Manufacturing Tax Credit</li>
                        <li>• Export Development Program</li>
                        <li>• Advanced Manufacturing Grants</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Agriculture</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Sustainable Agriculture Grants</li>
                        <li>• Farm Innovation Program</li>
                        <li>• Agricultural Processing Grants</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Healthcare</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Healthcare Innovation Awards</li>
                        <li>• Medical Device Grants</li>
                        <li>• Biotech Startup Funding</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <NewsletterSignup variant="sidebar" />

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <a href="/usa/federal-grants" className="block text-primary hover:underline">
                      Federal Small Business Grants
                    </a>
                    <a href="/grant-finder" className="block text-primary hover:underline">
                      AI Grant Finder Tool
                    </a>
                    <a href="/guides" className="block text-primary hover:underline">
                      Grant Application Guides
                    </a>
                    <a href="/usa/texas" className="block text-primary hover:underline">
                      Texas Business Funding
                    </a>
                    <a href="/contact" className="block text-primary hover:underline">
                      New York State Grants
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mb-8">
            <NewsletterSignup
              title="Get California Grant Updates"
              description="Stay informed about new California small business grants and funding opportunities"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
