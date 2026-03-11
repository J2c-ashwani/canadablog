import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { getGrantsByCountry } from "@/lib/grants-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Building, Users, Zap, BookOpen } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
  title: "Federal Grants for Small Business | USA Government Funding Programs",
  description:
    "Find federal grants for small businesses in the USA. Browse SBIR, SBA, and other federal funding programs with up to $1.7M available.",
  keywords: "federal grants small business, SBIR grants, SBA funding, USA federal grants, government business funding",
  openGraph: {
    title: "Federal Grants for Small Business | USA Government Funding Programs",
    description: "Find federal grants for small businesses in the USA.",
    url: "https://www.fsidigital.ca/usa/federal-grants",
  },
}

export default function USAFederalGrantsPage() {
  const usaGrants = getGrantsByCountry("USA")
  const federalGrants = usaGrants.filter((grant) => grant.region === "Federal")

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">🇺🇸 USA Federal Programs</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Federal Grants for{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Small Business
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed text-pretty">
              Access federal funding programs including SBIR, SBA grants, and other government initiatives designed to
              support American small businesses and startups.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                Browse Federal Grants Below
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
                <Link href="/guides/federal-grants-application-tips">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Get Application Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* EEAT Components */}
      <section className="py-6 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <ShortAnswerBox content="Federal grants for U.S. small businesses are available through NSF, SBA, DOE, NIH, and DOD. Phase I SBIR awards range from $150K–$305K, with Phase II up to $2M. No equity required — 100% non-dilutive funding." />
            <EEATBadge authorName="Ashwani K." authorImage="/ash-author-1.jpg" date="2026-03-01" />
            <EligibleCheck />
          </div>
        </div>
      </section>


      {/* Key Programs with Learn More Buttons */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Major Federal Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the most significant federal funding opportunities for American businesses. Click "Learn More" for detailed guides.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* SBIR/STTR Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">SBIR/STTR</Badge>
                </div>
                <CardTitle>Small Business Innovation Research</CardTitle>
                <CardDescription>
                  Federal R&D funding for innovative small businesses with commercialization potential.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding Range:</span>
                    <span className="font-semibold text-green-600">$50K - $1.7M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application:</span>
                    <span className="text-sm">Rolling deadlines</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-sm">R&D and Innovation</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Phase I: Proof of concept ($50K-$300K)</li>
                    <li>• Phase II: Development ($750K-$1.7M)</li>
                    <li>• Phase III: Commercialization</li>
                  </ul>

                  {/* Learn More Button */}
                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/sbir-sttr-complete-guide">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn More About SBIR
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SBA Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">SBA</Badge>
                </div>
                <CardTitle>Small Business Administration</CardTitle>
                <CardDescription>
                  Direct funding, loans, and support programs for small businesses across all industries.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding Range:</span>
                    <span className="font-semibold text-green-600">$10K - $500K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application:</span>
                    <span className="text-sm">Ongoing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-sm">General Business</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Microloans ($500 - $50K)</li>
                    <li>• 7(a) Loans (up to $5M)</li>
                    <li>• CDC/504 Loans (real estate/equipment)</li>
                  </ul>

                  {/* Learn More Button */}
                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/sba-loans-grants-guide">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn More About SBA
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialized Programs Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Specialized</Badge>
                </div>
                <CardTitle>Specialized Federal Programs</CardTitle>
                <CardDescription>
                  Targeted funding for women, minorities, veterans, and other specific business categories.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding Range:</span>
                    <span className="font-semibold text-green-600">$15K - $400K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application:</span>
                    <span className="text-sm">Various deadlines</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-sm">Targeted Groups</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Women Business Centers</li>
                    <li>• Minority Business Development</li>
                    <li>• Veteran Entrepreneur Programs</li>
                  </ul>

                  {/* Learn More Button */}
                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/federal-grants-women-minorities">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn More About Specialized Programs
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Federal Grant Application Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these steps to successfully apply for federal grants. Get our detailed guide for step-by-step instructions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Register Your Business</h3>
              <p className="text-gray-600">
                Obtain DUNS number, register in SAM.gov, and complete business registrations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Find Opportunities</h3>
              <p className="text-gray-600">Search grants.gov and agency websites for relevant funding opportunities.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Prepare Application</h3>
              <p className="text-gray-600">Gather required documents, write proposals, and prepare detailed budgets.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Submit & Follow Up</h3>
              <p className="text-gray-600">
                Submit through grants.gov and track application status through the review process.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/guides/federal-grants-application-tips">
                <BookOpen className="w-5 h-5 mr-2" />
                Get Detailed Application Guide
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* State Matching Programs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">State SBIR Matching & Tech Grants</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Many states offer "matching funds" to boost your federal grant. Explore these state-specific technology programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-700">California</CardTitle>
                <CardDescription>CalSEED & SBIR Match</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog/california-tech-programs" className="text-blue-600 hover:underline flex items-center">
                  View California Guide <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-indigo-200">
              <CardHeader>
                <CardTitle className="text-indigo-700">New York</CardTitle>
                <CardDescription>START-UP NY & Pre-Seed</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog/new-york-tech-programs" className="text-blue-600 hover:underline flex items-center">
                  View New York Guide <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-700">Colorado</CardTitle>
                <CardDescription>Advanced Industries</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog/colorado-tech-programs" className="text-blue-600 hover:underline flex items-center">
                  View Colorado Guide <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-700">Massachusetts</CardTitle>
                <CardDescription>SBIR START & Life Sciences</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog/massachusetts-tech-programs" className="text-blue-600 hover:underline flex items-center">
                  View Massachusetts Guide <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-teal-200">
              <CardHeader>
                <CardTitle className="text-teal-700">Washington</CardTitle>
                <CardDescription>WRF & Clean Energy</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog/washington-tech-programs" className="text-blue-600 hover:underline flex items-center">
                  View Washington Guide <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Federal Grants Table - Now with Internal Links */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Federal Grant Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse all available federal grants. Click "Application Guide" to get detailed instructions before applying.
            </p>
          </div>
          <GrantComparisonTable grants={federalGrants} title="Federal Grant Programs" showFilters={true} />
        </div>
      </section>

      {/* Deep Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-10">

            <Card>
              <CardHeader><CardTitle className="text-xl">SBIR/STTR by Federal Agency — 2026 Comparison</CardTitle></CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  SBIR Phase I award amounts and focus areas differ significantly by agency. Target agencies whose mission most closely matches your technology — alignment quality is the top predictor of SBIR success.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-blue-800 text-white">
                        <th className="text-left p-3 font-medium rounded-tl-lg">Agency</th>
                        <th className="text-left p-3 font-medium">Phase I</th>
                        <th className="text-left p-3 font-medium">Phase II</th>
                        <th className="text-left p-3 font-medium rounded-tr-lg">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["NSF", "$305K / 12 mo", "$1M / 24 mo", "Deep tech, AI/ML, advanced computing, materials"],
                        ["DOD (Army/Navy/AF/DARPA)", "$250K–$300K / 6 mo", "$2M / 24 mo", "Defense, cybersecurity, robotics, aerospace, comms"],
                        ["DOE", "$300K / 12 mo", "$2M / 24 mo", "Energy storage, grid tech, cleantech, nuclear"],
                        ["NIH", "$305K / 12 mo", "$2M / 24 mo", "Biomedical devices, diagnostics, drug dev, health IT"],
                        ["NASA", "$175K / 12 mo", "$750K / 24 mo", "Aerospace, propulsion, Earth observation, robotics"],
                        ["USDA", "$175K / 12 mo", "$1.7M / 24 mo", "AgTech, food science, precision agriculture, biofuels"],
                        ["EPA", "$100K / 12 mo", "$400K / 24 mo", "Environmental monitoring, remediation, waste tech"],
                        ["DHS", "$150K / 12 mo", "$1M / 24 mo", "Border security, emergency response, surveillance tech"],
                      ].map(([agency, pi, pii, focus], i) => (
                        <tr key={agency} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="p-3 font-semibold text-blue-900">{agency}</td>
                          <td className="p-3 text-green-700 font-medium">{pi}</td>
                          <td className="p-3 text-green-700 font-medium">{pii}</td>
                          <td className="p-3 text-gray-600 text-xs">{focus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-xl">Beyond SBIR — Other Federal Grant Programs for Businesses</CardTitle></CardHeader>
              <CardContent className="text-gray-700 space-y-4">
                <p className="leading-relaxed">
                  SBIR/STTR are specifically designed for small businesses doing R&D. But several other federal programs serve different business needs:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { prog: "EDA Economic Development Grants", desc: "The Economic Development Administration funds revolving loan funds, small business incubators, and regional development infrastructure — businesses access this through EDA-funded intermediary organizations in their region (eda.gov)." },
                    { prog: "USDA Business & Industry (B&I) Loan Guarantees", desc: "USDA Rural Development guarantees business loans of up to $25M for businesses in rural areas (populations under 50,000) — including manufacturing, retail, and service businesses (rd.usda.gov)." },
                    { prog: "DOE Loan Programs Office (LPO)", desc: "For large cleantech and energy projects ($100M+), the DOE LPO provides direct government loans and loan guarantees at below-market rates — relevant to energy manufacturers and large-scale cleantech projects (loan.energy.gov)." },
                    { prog: "CDFI Fund — Small Business Lending", desc: "Community Development Financial Institutions (CDFIs) provide loans and technical assistance to underserved small businesses. Many CDFIs offer grants to qualifying businesses in low-income communities (cdfifund.gov)." },
                    { prog: "NEA Grants for Arts-Based Businesses", desc: "The National Endowment for the Arts funds arts-based businesses, creative economy projects, and arts-integrated community development — relevant to creative businesses with a public benefit (arts.gov)." },
                    { prog: "HUD Community Development Block Grants (CDBG)", desc: "HUD CDBG are distributed to local governments who fund small business development in low-income communities — access through your city or county government (hud.gov)." },
                  ].map(({ prog, desc }) => (
                    <div key={prog} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="font-semibold text-blue-900 mb-1 text-sm">{prog}</div>
                      <div className="text-xs text-blue-700 leading-relaxed">{desc}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-100">
              <CardHeader><CardTitle className="text-xl text-red-900">5 Common Mistakes in Federal Grant Applications</CardTitle></CardHeader>
              <CardContent className="text-red-900 space-y-3">
                {[
                  { n: "1", m: "Writing a Technology Overview Instead of a Topic Response", d: "SBIR applications are evaluated on how well they respond to the specific solicitation topic — not on the general innovation quality. Generic technology overviews not specifically addressing the topic receive low scores regardless of technology quality." },
                  { n: "2", m: "Weak Commercialization Sections", d: "Commercialization is weighed as heavily as technical merit. A winning commercialization section identifies specific federal procurement pathways (Phase III), private customers, IP strategy, market size quantification, and post-grant revenue timeline." },
                  { n: "3", m: "Underestimating Application Timeline Requirements", d: "SAM.gov processing: 10–14 business days. First-time application preparation: 3–6 weeks for a competitive proposal. Total realistic timeline from first contact to submission: 6–8 weeks minimum." },
                  { n: "4", m: "Missing Resubmission Opportunities After Initial Declines", d: "Most federal SBIR programs allow declined applications to be revised and resubmitted in subsequent cycles. Review panel feedback identifies specific weaknesses — a resubmission addressing all reviewer concerns has significantly higher success rates." },
                  { n: "5", m: "Budget Preparation Errors That Disqualify Applications", d: "Federal grants require audit-ready, detailed budget justifications. Budget errors (incorrect indirect cost rates, unallowable costs) disqualify proposals at administrative review before technical review. Have your budget reviewed by an SBDC advisor before submission." },
                ].map(({ n, m, d }) => (
                  <div key={n} className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="font-semibold text-red-900 mb-1">{n}. {m}</div>
                    <p className="text-xs text-red-800 leading-relaxed">{d}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ: USA Federal Business Grants 2026</h2>
              <div className="space-y-4">
                {[
                  { q: "Can I apply for SBIR if my company has previously received SBIR funding?", a: "Yes — SBIR is not a one-time program. Companies can receive multiple Phase I awards (one per topic per solicitation cycle) and multiple Phase II awards. Companies with successful Phase II commercialization are viewed favorably in subsequent applications as they demonstrate execution capability." },
                  { q: "What is STTR and how does it differ from SBIR?", a: "STTR requires formal collaboration between a small business and a U.S. research institution — at least 30% of work by the institution and 40% by the business. STTR is available at NSF, DOD, DOE, NIH, and NASA. It&apos;s ideal for commercializing university-developed technology. Award amounts are similar to SBIR." },
                  { q: "Is there a federal grant for purchasing equipment for my small manufacturing business?", a: "Federal grants for equipment purposes are limited for for-profit manufacturers. SBIR funds R&D equipment. USDA B&I guarantees loans for rural businesses. SBA 504 loans specifically finance major fixed assets including equipment at below-market rates — this is the most accessible federal mechanism for manufacturing equipment." },
                  { q: "How do I find my local Small Business Development Center (SBDC)?", a: "The SBDC national directory is at americassbdc.org — enter your zip code to find the nearest center. All SBDC services are free to small businesses — including grant application review, business plan development, and financial projections. Call your SBDC before submitting any federal grant application." },
                  { q: "Are federal grants available for food and beverage businesses?", a: "Yes — primarily through USDA programs. USDA SBIR funds agricultural technology and food system innovation. USDA VAPG (Value-Added Producer Grants) fund producers adding value to their products. USDA Rural Business Development Grants fund rural food businesses. For non-rural food businesses, SBA loans are the primary federal financing vehicle." },
                  { q: "What is the NSF I-Corps program and is it a grant?", a: "NSF I-Corps is a $50,000 grant providing training in customer discovery and business model development for innovators commercializing technology. I-Corps alumni have significantly higher NSF SBIR Phase I success rates than non-alumni. Regional I-Corps hubs at universities across the country are open to non-NSF-funded innovators." },
                  { q: "Can a nonprofit organization receive SBIR grants?", a: "No — SBIR and STTR are available exclusively to for-profit small businesses (under 500 employees, majority U.S.-owned). However, nonprofits can be STTR research institution partners. Nonprofits should explore NSF, NIH, DOE, and other agency grants in separate solicitation tracks." },
                  { q: "What federal grants are available for veteran-owned small businesses?", a: "Veteran-Owned (VOSB) and Service-Disabled Veteran-Owned (SDVOSB) businesses have federal contract set-asides accessed through VA CVE certification. For true grants, veterans access SBIR/STTR equally with all small businesses. The SBA&apos;s Office of Veterans Business Development provides Boots to Business training and Veteran Business Outreach Centers (VBOCs)." },
                ].map((item, i) => (
                  <Card key={i}><CardContent className="pt-5">
                    <div className="font-semibold text-gray-900 mb-2">{item.q}</div>
                    <div className="text-gray-600 text-sm leading-relaxed">{item.a}</div>
                  </CardContent></Card>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

