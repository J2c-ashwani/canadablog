import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
{/* <GrantComparisonTable temporarily disabled for deployment */} 
<div className="mb-12 p-8 bg-gray-50 rounded-lg text-center"> 
  <h3 className="text-xl font-semibold mb-2">Grant Comparison</h3> 
  <p className="text-gray-600">Grant comparison table temporarily unavailable.</p> 
</div>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" /> -->
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Ontario Provincial Funding
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ontario Business Grants 2025</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover comprehensive Ontario provincial funding programs, business grants, and government incentives
              available to entrepreneurs and companies across Ontario.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Available Funding</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" /> -->
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">$400M+</div>
                <p className="text-xs text-muted-foreground">Annual provincial programs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" /> -->
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">30+</div>
                <p className="text-xs text-muted-foreground">Provincial grant programs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" /> -->
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">40%</div>
                <p className="text-xs text-muted-foreground">Average approval rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Grant Comparison Table */}
          <div className="mb-12">
{/* <GrantComparisonTable temporarily disabled for deployment */} 
<div className="mb-12 p-8 bg-gray-50 rounded-lg text-center"> 
  <h3 className="text-xl font-semibold mb-2">Grant Comparison</h3> 
  <p className="text-gray-600">Grant comparison table temporarily unavailable.</p> 
</div>          </div>

          {/* Content Sections */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Ontario Business Grant Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    Ontario provides extensive business grant programs to support innovation, growth, and economic
                    development across the province. With over $400 million in annual funding, Ontario maintains its
                    position as Canada's economic engine.
                  </p>

                  <h3>Key Ontario Grant Programs</h3>
                  <ul>
                    <li>
                      <strong>Ontario Together Fund</strong> - Up to $2.5M for business adaptation
                    </li>
                    <li>
                      <strong>Ontario Innovation Tax Credit</strong> - 10% tax credit for R&D
                    </li>
                    <li>
                      <strong>Ontario Scale-Up Vouchers</strong> - $25K for advisory services
                    </li>
                    <li>
                      <strong>Ontario Centres of Excellence</strong> - Up to $500K for tech commercialization
                    </li>
                  </ul>

                  <h3>Eligibility Requirements</h3>
                  <p>
                    Ontario business grants typically require companies to be incorporated in Ontario, demonstrate
                    growth potential, and contribute to the province's economic objectives:
                  </p>
                  <ul>
                    <li>Ontario business registration and operations</li>
                    <li>Demonstration of innovation or growth potential</li>
                    <li>Job creation or retention commitments</li>
                    <li>Alignment with provincial priorities</li>
                  </ul>

                  <h3>Application Process</h3>
                  <p>
                    Ontario grant applications require detailed business plans, financial projections, and clear
                    demonstration of economic impact. The province emphasizes innovation, competitiveness, and
                    sustainable growth in its evaluation criteria.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <NewsletterSignup variant="sidebar" /> -->

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <a href="/canada/quebec" className="block text-primary hover:underline">
                      Quebec Small Business Grants
                    </a>
                    <a href="/canada/government-grants" className="block text-primary hover:underline">
                      Federal Canadian Grants
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
              title="Get Ontario Grant Updates"
              description="Stay informed about new Ontario business grants and funding opportunities"
            /> -->
          </div>
        </div>
      </main>

      <Footer /> -->
    </div>
  )
}
