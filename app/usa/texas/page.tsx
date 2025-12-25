import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Users, TrendingUp } from "lucide-react"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"

export const metadata: Metadata = {
  title: "Texas Business Funding Programs 2025 | State Grants & Incentives",
  description:
    "Discover Texas business funding programs, state grants, and economic incentives. Complete guide to Texas government funding for startups and small businesses.",
  keywords:
    "Texas business funding programs, Texas state grants, Texas government funding, small business grants Texas",
  alternates: {
    canonical: "https://www.fsidigital.ca/usa/texas",
  },
}

const texasGrants: Grant[] = [
  {
    id: "tx-enterprise-fund",
    name: "Texas Enterprise Fund",
    fundingMin: 100000,
    fundingMax: 10000000,
    eligibility: ["Projects creating >75 jobs (urban) or >25 (rural)", "Regional HQ or primary employers"],
    deadline: "Rolling basis",
    applicationLink: "https://gov.texas.gov/business/page/texas-enterprise-fund",
    description: "A 'deal-closing' grant fund for projects that are considering Texas and at least one other out-of-state site.",
    country: "USA",
    region: "Texas",
    category: "Business Growth",
    agency: "Office of the Governor",
    status: "Active",
    tags: ["Job Creation", "Relocation", "Incentive"],
    requirements: ["Competitive site selection", "City/County support", "High average wages"],
    lastUpdated: "2025-01-20"
  },
  {
    id: "tx-capital-fund",
    name: "Texas Capital Fund",
    fundingMin: 50000,
    fundingMax: 1500000,
    eligibility: ["Non-entitlted communities", "County governments", "Public infrastructure support"],
    deadline: "Quarterly",
    applicationLink: "https://www.texasagriculture.gov/Grants-Services/",
    description: "Provides financial resources to non-entitlement communities ensuring that businesses have infrastructure needed to grow.",
    country: "USA",
    region: "Texas",
    category: "Infrastructure",
    agency: "Texas Department of Agriculture",
    status: "Active",
    tags: ["Infrastructure", "Rural Development", "Community"],
    requirements: ["Community sponsorship", "infrastructure improvement plan", "Job creation"],
    lastUpdated: "2025-01-20"
  },
  {
    id: "tx-skills-dev",
    name: "Skills Development Fund",
    fundingMin: 100000,
    fundingMax: 500000,
    eligibility: ["Texas employers", "Community colleges", "Technical colleges"],
    deadline: "Annual",
    applicationLink: "https://www.twc.texas.gov/programs/skills-development-fund",
    description: "Texas' premier job-training program providing customized training opportunities for Texas businesses and workers.",
    country: "USA",
    region: "Texas",
    category: "Workforce",
    agency: "Texas Workforce Commission",
    status: "Active",
    tags: ["Training", "Workforce", "Skills"],
    requirements: ["Partnership with college", "Curriculum development", "Full-time employees"],
    lastUpdated: "2025-01-20"
  },
  {
    id: "tx-product-dev",
    name: "Product Development & Small Business Incubator Fund",
    fundingMin: 1000000,
    fundingMax: 5000000,
    eligibility: ["Small businesses", "Non-profits", "Incubators"],
    deadline: "Rolling",
    applicationLink: "https://gov.texas.gov/business/page/product-development-and-small-business-incubator-fund",
    description: "Revolving loan program aiding in the development, production and commercialization of new or improved products.",
    country: "USA",
    region: "Texas",
    category: "Innovation",
    agency: "Texas Economic Development Bank",
    status: "Active",
    tags: ["Product Development", "Incubator", "Commercialization"],
    requirements: ["Product viability", "Primary place of business in Texas", "Creditworthiness"],
    lastUpdated: "2025-01-20"
  },
]

export default function TexasGrantsPage() {
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
                Texas State Funding
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Texas Business Funding Programs 2025</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore comprehensive Texas state funding programs, business incentives, and government grants available
              to entrepreneurs and companies in the Lone Star State.
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
                <div className="text-2xl font-bold text-primary">$300M+</div>
                <p className="text-xs text-muted-foreground">Annual state incentive programs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">20+</div>
                <p className="text-xs text-muted-foreground">State funding programs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jobs Created</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">50K+</div>
                <p className="text-xs text-muted-foreground">Annual job creation</p>
              </CardContent>
            </Card>
          </div>

          {/* Grant Comparison Table */}
          <div className="mb-12">
            <GrantComparisonTable
              grants={texasGrants}
              title="Texas Business Funding Programs Comparison"
            />
          </div>

          {/* Content Sections */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Texas Business Funding Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    Texas offers robust business funding programs designed to attract companies, create jobs, and drive
                    economic growth. With over $300 million in annual incentive programs, Texas maintains its position
                    as a business-friendly state.
                  </p>

                  <h3>Major Texas Funding Programs</h3>
                  <ul>
                    <li>
                      <strong>Texas Enterprise Fund</strong> - Up to $10M+ for major job-creating projects
                    </li>
                    <li>
                      <strong>Texas Capital Fund</strong> - Infrastructure grants up to $5M
                    </li>
                    <li>
                      <strong>Skills Development Fund</strong> - Job training grants up to $500K
                    </li>
                    <li>
                      <strong>Texas Research Incentive Program</strong> - R&D funding up to $2M
                    </li>
                  </ul>

                  <h3>Eligibility and Requirements</h3>
                  <p>
                    Texas business funding programs typically focus on job creation, economic impact, and strategic
                    industry development. Key requirements include:
                  </p>
                  <ul>
                    <li>Commitment to create or retain jobs in Texas</li>
                    <li>Demonstration of economic impact</li>
                    <li>Competitive selection process</li>
                    <li>Performance-based incentives</li>
                  </ul>

                  <h3>Application Strategy</h3>
                  <p>
                    Successful Texas funding applications emphasize job creation, economic impact, and alignment with
                    state economic development priorities. The state values projects that enhance Texas's competitive
                    position in key industries.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <NewsletterSignup variant="sidebar" />

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <a href="/usa/california" className="block text-primary hover:underline">
                      California Small Business Grants
                    </a>
                    <a href="/usa/federal-grants" className="block text-primary hover:underline">
                      Federal Business Grants
                    </a>
                    <a href="/grant-finder" className="block text-primary hover:underline">
                      AI Grant Finder Tool
                    </a>
                    <a href="/guides" className="block text-primary hover:underline">
                      Application Guides
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mb-8">
            <NewsletterSignup
              title="Get Texas Funding Updates"
              description="Stay informed about new Texas business funding programs and opportunities"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
