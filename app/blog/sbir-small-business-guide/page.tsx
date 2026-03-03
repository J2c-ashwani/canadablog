import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, AlertCircle, Building, Clock, Download, TrendingUp, HelpCircle, BookOpen, ExternalLink, Lightbulb, Zap, Award, Shield, Heart, AlertTriangle, Leaf } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SBIR Small Business Innovation Research 2026 | Complete Federal R&D Grant Guide",
  description: "SBIR awards $4B/year to small businesses — but you need the right strategy. Phase I ($275K) and Phase II ($1.7M) breakdown with agency-specific tips.",
  keywords: "SBIR grants, small business innovation research, federal R&D grants, SBIR Phase I Phase II, innovation funding, government grants for startups",
}

export default function SBIRSmallBusinessGuide() {
  const faqData = [
    {
      question: "What is the SBIR program and how much funding is available?",
      answer: "SBIR (Small Business Innovation Research) is America's largest source of early-stage technology funding with over $4.1 billion awarded annually through 11 federal agencies. Phase I awards range from $50K-$300K for feasibility studies, and Phase II awards provide $750K-$1.7M for full R&D development. The funding is non-dilutive, meaning no equity is required and no repayment is needed."
    },
    {
      question: "How do I apply for SBIR grants in 2026?",
      answer: "First, identify topics matching your technology from agency solicitations (SBIR.gov lists all opportunities). Contact topic authors for clarification, prepare your technical and commercialization proposal following agency-specific formats, and submit through agency portals before deadlines. Review processes take 2-6 months depending on the agency."
    },
    {
      question: "What is the difference between SBIR Phase I and Phase II?",
      answer: "Phase I ($50K-$300K, 6-12 months) establishes technical feasibility and commercial potential. Phase II ($750K-$1.7M, 24 months) provides full R&D funding for prototype development and commercialization preparation. You must complete Phase I successfully before applying for Phase II from the same agency."
    },
    {
      question: "Can startups with no employees win SBIR awards?",
      answer: "Yes, very small companies including those with only founders can win SBIR awards. The principal investigator employment requirement means founders must work for the company, but large employee counts are not required. Many SBIR winners are small teams or even individual founders."
    },
    {
      question: "How long does the SBIR application process take?",
      answer: "Timelines vary by agency from several months to over a year from proposal submission to award. Some agencies have rolling submissions with faster turnarounds while others have annual cycles with longer review periods. Defense SBIR topics often have sixty to ninety day award timelines."
    },
    {
      question: "Does venture capital funding affect SBIR eligibility?",
      answer: "Venture capital ownership can affect eligibility through affiliation rules if portfolio company connections aggregate employee counts. Some agencies have waiver provisions for majority VC-owned companies meeting specific criteria. Check current SBA affiliation guidance for your situation."
    },
    {
      question: "What are the success rates for SBIR applications?",
      answer: "Success rates vary by agency but typically range from 15-30% for Phase I applications. Phase I to Phase II transition rates exceed 40% for companies with strong Phase I outcomes. Defense agencies tend to have higher award numbers but also more competition. NIH and NSF have rigorous scientific peer review processes."
    }
  ]

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
  }

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30"><Zap className="w-3 h-3 mr-1" /> Federal Innovation Program</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">SBIR Small Business Innovation Research 2026</h1>
              <p className="text-xl text-blue-100 mb-8">Complete guide to America&apos;s largest source of early-stage technology funding. Learn how to secure non-dilutive federal research and development grants up to $1.7 million with no repayment required for breakthrough innovations.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/guides/apply-sbir-grants">Get SBIR Application Guide</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. SBIR Program Overview</a></li>
                  <li><a href="#phase1" className="text-blue-700 hover:underline">2. Phase I Feasibility</a></li>
                  <li><a href="#phase2" className="text-blue-700 hover:underline">3. Phase II Development</a></li>
                  <li><a href="#phase3" className="text-blue-700 hover:underline">4. Phase III Commercialization</a></li>
                  <li><a href="#agencies" className="text-blue-700 hover:underline">5. Participating Agencies</a></li>
                  <li><a href="#sttr" className="text-blue-700 hover:underline">6. SBIR vs STTR</a></li>
                  <li><a href="#eligibility" className="text-blue-700 hover:underline">7. Eligibility Requirements</a></li>
                  <li><a href="#application" className="text-blue-700 hover:underline">8. Application Process</a></li>
                  <li><a href="#proposal" className="text-blue-700 hover:underline">9. Proposal Writing</a></li>
                  <li><a href="#mistakes" className="text-blue-700 hover:underline">10. Common Mistakes</a></li>
                  <li><a href="#success" className="text-blue-700 hover:underline">11. Success Strategies</a></li>
                  <li><a href="#faqs" className="text-blue-700 hover:underline">12. FAQs</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-8 text-center">
              <div><div className="text-3xl font-bold text-blue-600 mb-2">$4.1B+</div><div className="text-gray-600">Annual SBIR Awards</div></div>
              <div><div className="text-3xl font-bold text-purple-600 mb-2">$1.7M</div><div className="text-gray-600">Max Phase II Award</div></div>
              <div><div className="text-3xl font-bold text-green-600 mb-2">11</div><div className="text-gray-600">Federal Agencies</div></div>
              <div><div className="text-3xl font-bold text-orange-600 mb-2">23%</div><div className="text-gray-600">Average Success Rate</div></div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About SBIR Grants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#overview" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-800">What is SBIR funding?</h3>
                  <p className="text-sm text-gray-600 mt-1">Non-dilutive federal R&D grants for small businesses.</p>
                </a>
                <a href="#phase1" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-800">How much is a Phase I grant?</h3>
                  <p className="text-sm text-gray-600 mt-1">Typically $50,000 to $275,000 for feasibility.</p>
                </a>
                <a href="#eligibility" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-800">Do I give up equity?</h3>
                  <p className="text-sm text-gray-600 mt-1">No, SBIR grants are 100% non-dilutive capital.</p>
                </a>
                <a href="#application" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-800">How long does it take?</h3>
                  <p className="text-sm text-gray-600 mt-1">Review process typically takes 3 to 6 months.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">SBIR Program Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-6">The Small Business Innovation Research program represents America&apos;s largest source of early-stage technology funding, providing over four billion dollars annually in non-dilutive grants to innovative small businesses. Unlike venture capital investment, SBIR funding requires no repayment and no equity sacrifice, allowing founders to retain complete ownership while advancing breakthrough technologies. The program was established in 1982 with the explicit mission of supporting small business research and development with commercial potential while meeting federal research and development needs.</p>
              <p className="text-gray-700 leading-relaxed mb-6">SBIR operates through eleven federal agencies that are required by law to allocate a percentage of their extramural research budgets to small business awards. The Department of Defense leads with the largest SBIR budget exceeding one point eight billion dollars annually, followed by the National Institutes of Health with approximately nine hundred million dollars. The National Science Foundation, Department of Energy, NASA, and USDA round out the major participating agencies, each bringing domain-specific focus areas and evaluation criteria to their SBIR programs.</p>
              <p className="text-gray-700 leading-relaxed mb-6">The program&apos;s three-phase structure guides technologies from proof of concept through commercialization. Phase I awards establish technical feasibility and commercial potential with smaller grants typically ranging from fifty thousand to three hundred thousand dollars over six to twelve months. Phase II awards provide larger funding up to one point seven million dollars over two years for full research and development, prototype development, and commercialization preparation. Phase III represents the commercialization stage where technologies transition to market through private investment, federal procurement contracts, or commercial sales without additional SBIR funding.</p>
              <p className="text-gray-700 leading-relaxed mb-6">SBIR provides benefits beyond direct funding that significantly impact company development trajectories. Federal validation through SBIR awards provides credibility that attracts private investment, strategic partners, and customers. Companies gain access to federal program managers, testing facilities, and procurement pathways that open government market opportunities. The intellectual property developed through SBIR projects remains with the small business, creating long-term asset value. Many of today&apos;s successful technology companies including Qualcomm, Symantec, and iRobot received foundational SBIR funding that launched their growth.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-blue-200"><CardHeader><CardTitle className="text-blue-700">SBIR Advantages</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Non-dilutive funding requiring no equity sacrifice or repayment</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Federal validation enhancing credibility with investors and customers</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Intellectual property rights retained by the performing small business</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Access to federal procurement pathways and testing resources</span></li></ul></CardContent></Card>
                <Card className="border-purple-200"><CardHeader><CardTitle className="text-purple-700">Program Requirements</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Small business with fewer than five hundred employees</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Majority ownership by United States citizens or permanent residents</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>For-profit business entity organized in the United States</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Principal investigator primarily employed by the company</span></li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="phase1" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Phase I: Feasibility and Proof of Concept</h2>
              <p className="text-gray-700 mb-6">Phase I SBIR awards provide funding to establish the technical feasibility of proposed innovations and assess their commercial potential. These initial grants typically range from fifty thousand to three hundred thousand dollars depending on the awarding agency, with project periods of six to twelve months. The primary objective is demonstrating that the proposed technical approach works and that a viable market opportunity exists for the resulting technology. Phase I represents the entry point for new SBIR applicants and serves as a proving ground for both the technology and the company&apos;s execution capability.</p>
              <p className="text-gray-700 mb-6">Successful Phase I projects accomplish specific technical milestones that prove concept feasibility while gathering market intelligence validating commercial potential. Technical work typically involves proof-of-concept experimentation, prototype development at laboratory scale, and preliminary testing demonstrating key performance parameters. Commercial work includes market research, customer discovery interviews, competitive analysis, and business model development. Reviewers evaluate Phase I proposals on both technical merit and commercial promise, requiring balanced attention to innovation and market viability.</p>
              <p className="text-gray-700 mb-6">Phase I completion positions companies for Phase II applications, which require demonstrated Phase I success as a prerequisite. The Phase I final report and commercialization plan become critical components of Phase II proposals, so companies should approach Phase I documentation with future applications in mind. Strong Phase I performance including milestone achievement, customer engagement, and intellectual property development significantly increases Phase II award probability. Many agencies have transition rates exceeding forty percent from Phase I to Phase II for companies with strong Phase I outcomes.</p>
              <p className="text-gray-700 mb-6">New applicants often underestimate the competitive intensity of Phase I solicitations. Success rates vary by agency but typically range from fifteen to thirty percent across the SBIR program. Each agency receives far more qualified applications than available funding can support. Standing out requires proposals that clearly articulate technological innovation, demonstrate deep domain expertise, and present compelling commercialization pathways. Prior SBIR track record is not required for Phase I applications, but demonstrated company capability to execute the proposed work is essential.</p>
              <div className="bg-green-50 p-6 rounded-lg border border-green-200"><h3 className="font-bold text-green-800 mb-3">Phase I Funding Details</h3><div className="grid md:grid-cols-3 gap-4 text-sm"><div><strong>Award Amount:</strong> $50K - $300K</div><div><strong>Duration:</strong> 6 - 12 months</div><div><strong>Focus:</strong> Technical feasibility and market validation</div></div></div>
            </div>
          </div>
        </section>

        <section id="phase2" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Phase II: Research and Development</h2>
              <p className="text-gray-700 mb-6">Phase II SBIR awards provide substantial funding for full research and development, prototype development, and commercialization preparation. Awards typically range from seven hundred fifty thousand to one point seven million dollars over two-year project periods, with some agencies offering larger awards for high-priority initiatives. Only companies that have successfully completed Phase I awards from the same agency are eligible for Phase II applications, ensuring that funded projects have demonstrated feasibility before receiving larger development investments.</p>
              <p className="text-gray-700 mb-6">Phase II project scope encompasses complete technology development from proof-of-concept validation through production-ready prototypes. Technical activities include detailed design, engineering development, integration testing, and regulatory pathway development where applicable. Commercial activities intensify with customer pilot programs, partnership development, manufacturing planning, and investment preparation. By Phase II completion, companies should have market-ready products or services with validated customer demand and clear paths to revenue generation.</p>
              <p className="text-gray-700 mb-6">Agencies evaluate Phase II proposals based on Phase I accomplishments, technical approach quality, team capability, and commercialization strength. The commercialization plan receives particular scrutiny because agencies want funded technologies to reach market impact rather than remaining laboratory curiosities. Strong Phase II proposals document customer commitments, partnership agreements, investment interest, and realistic financial projections. Merely completing technical milestones without advancing commercial readiness raises concerns about ultimate technology transition.</p>
              <p className="text-gray-700 mb-6">Sequential Phase II awards are possible for Phase I alumni who did not receive Phase II funding initially, providing second chances for strong technologies with improved commercial positioning. Some agencies offer Direct-to-Phase-II pathways for companies that have completed equivalent feasibility work outside the SBIR program, though these applications face higher scrutiny and lower success rates than traditional Phase I to Phase II transitions. Phase II bridge funding and supplemental awards can extend successful projects toward commercialization readiness.</p>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200"><h3 className="font-bold text-blue-800 mb-3">Phase II Funding Details</h3><div className="grid md:grid-cols-3 gap-4 text-sm"><div><strong>Award Amount:</strong> $750K - $1.7M</div><div><strong>Duration:</strong> 24 months typically</div><div><strong>Focus:</strong> Full development and commercialization preparation</div></div></div>
            </div>
          </div>
        </section>

        <section id="phase3" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Phase III: Commercialization</h2>
              <p className="text-gray-700 mb-6">Phase III represents the commercialization stage where SBIR-funded technologies transition to market through private investment, federal procurement contracts, or commercial sales. Importantly, no SBIR funding is provided for Phase III activities. Instead, the term describes revenue and investment activity that follows successful SBIR development. Phase III success is the ultimate measure of SBIR program effectiveness, demonstrating that supported technologies achieved market impact rather than remaining unfunded research.</p>
              <p className="text-gray-700 mb-6">Federal procurement represents a significant Phase III pathway, particularly for technologies developed under Department of Defense, NASA, or other agency SBIR programs. The federal government has policies encouraging procurement of SBIR-developed technologies, and program managers often become advocates for transitioning successful innovations into operational use. Companies should cultivate relationships with potential government customers throughout Phase I and Phase II work rather than waiting for development completion to pursue procurement opportunities.</p>
              <p className="text-gray-700 mb-6">Private investment and commercial sales provide alternative Phase III pathways for technologies with broader market applications. Venture capital investors view SBIR track records favorably as indicators of technology validation and team capability. Strategic corporate partners may acquire or license SBIR-developed technologies for incorporation into their product portfolios. Companies should pursue multiple Phase III pathways simultaneously because federal procurement, investment, and commercial sales cycles operate on different timelines with varying probability of success.</p>
              <p className="text-gray-700 mb-6">Successful Phase III outcomes often require business model evolution beyond initial SBIR project scope. Technologies developed for specific federal agency needs may require adaptation for commercial markets. Manufacturing scale-up, regulatory compliance, sales channel development, and customer support infrastructure require capabilities beyond research and development expertise. Companies approaching Phase III should honestly assess their organizational readiness for commercialization and consider partnerships or acquisitions that address capability gaps.</p>
            </div>
          </div>
        </section>

        <section id="agencies" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Deep Dive: The "Big 5" Agencies</h2>
              <p className="text-gray-700 mb-8 text-center max-w-3xl mx-auto">
                97% of SBIR funding comes from just five agencies. Each has a completely different culture, timeline, and review process. You cannot copy-paste a proposal from one to another.
              </p>

              <div className="space-y-8">
                {/* Department of Defense */}
                <Card className="border-l-4 border-l-blue-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-full mr-4"><Shield className="w-8 h-8 text-blue-800" /></div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Department of Defense (DoD)</h3>
                        <p className="text-sm text-gray-500 font-semibold">$1.8 Billion Annual Funding</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Focus Areas</h4>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                          <li>Artificial Intelligence & Autonomy</li>
                          <li>Advanced Materials & Manufacturing</li>
                          <li>Cybersecurity & Communications</li>
                          <li>Hypersonics & Space</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Insider Strategy</h4>
                        <p className="text-sm text-gray-600">The customer is the Warfighter. You MUST speak with the "TPOC" (Technical Point of Contact) during the pre-release period. If you don't, your chances of winning drop significantly. They want solutions they can buy <em>now</em>.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* NIH */}
                <Card className="border-l-4 border-l-blue-400">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-50 p-3 rounded-full mr-4"><Heart className="w-8 h-8 text-blue-500" /></div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">National Institutes of Health (NIH)</h3>
                        <p className="text-sm text-gray-500 font-semibold">$900 Million Annual Funding</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Focus Areas</h4>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                          <li>Cancer Therapeutics & Diagnostics</li>
                          <li>Aging & Alzheimer's Research</li>
                          <li>Mental Health & Addiction</li>
                          <li>Biomedical Engineering</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Insider Strategy</h4>
                        <p className="text-sm text-gray-600">This is academic peer review. Your "Specific Aims" page is everything. If you don't nail the scientific hypothesis here, the rest isn't read. Commercialization is less critical in Phase I but mandatory for Phase II.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* NSF */}
                <Card className="border-l-4 border-l-yellow-500">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-yellow-50 p-3 rounded-full mr-4"><Lightbulb className="w-8 h-8 text-yellow-600" /></div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">National Science Foundation (NSF)</h3>
                        <p className="text-sm text-gray-500 font-semibold">$200 Million Annual Funding</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Focus Areas</h4>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                          <li>Artificial Intelligence</li>
                          <li>Robotics & Advanced Manufacturing</li>
                          <li>Clean Energy & Environment</li>
                          <li>IoT & Semiconductors</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Insider Strategy</h4>
                        <p className="text-sm text-gray-600">NSF funds "high-risk, high-reward" technology. They do NOT buy anything. They want you to commercialize to the private sector. You must show how your innovation is a massive leap forward, not just an incremental improvement.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* DOE */}
                <Card className="border-l-4 border-l-green-600">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-50 p-3 rounded-full mr-4"><Zap className="w-8 h-8 text-green-600" /></div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Department of Energy (DOE)</h3>
                        <p className="text-sm text-gray-500 font-semibold">$350 Million Annual Funding</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Focus Areas</h4>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                          <li>Renewable Energy (Solar, Wind)</li>
                          <li>Grid Modernization</li>
                          <li>Nuclear Physics & Energy</li>
                          <li>Carbon Capture & Storage</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Insider Strategy</h4>
                        <p className="text-sm text-gray-600">Letter of Intent (LOI) is mandatory. If you miss the LOI deadline, you cannot apply. They are very focused on hard-tech prototype development and scalability.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* NASA */}
                <Card className="border-l-4 border-l-purple-600">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-50 p-3 rounded-full mr-4"><Target className="w-8 h-8 text-purple-600" /></div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">NASA</h3>
                        <p className="text-sm text-gray-500 font-semibold">$180 Million Annual Funding</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Focus Areas</h4>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                          <li>Life Support Systems</li>
                          <li>Propulsion & Aeronautics</li>
                          <li>Advanced Materials for Space</li>
                          <li>Robotic Systems</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Insider Strategy</h4>
                        <p className="text-sm text-gray-600">NASA wants technology they can use on a mission (" infusion"). Connect with a NASA center (like JPL or Langley) to find a champion who needs your tech for a future mission architecture.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>

        <section id="sttr" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">SBIR versus STTR Programs</h2>
              <p className="text-gray-700 mb-6">The Small Business Technology Transfer program, known as STTR, operates alongside SBIR with similar funding levels and phase structures but requires formal research institution partnerships. While SBIR requires the small business to perform the majority of Phase I and Phase II work, STTR mandates that a nonprofit research institution perform at least thirty percent of Phase I work and forty percent of Phase II work. This structure facilitates technology transfer from university and federal laboratory research into small business commercialization.</p>
              <p className="text-gray-700 mb-6">Companies should choose between SBIR and STTR based on their technology origins and partnership needs. STTR is appropriate when technology emerged from university or laboratory research and continued collaboration advances commercialization. SBIR is preferable when the small business has internal capability to perform required work without research institution partnership. Some companies maintain both SBIR and STTR relationships, using each program pathway for different technology development efforts based on where expertise resides.</p>
              <p className="text-gray-700 mb-6">STTR partnership negotiations require careful attention to intellectual property rights, publication policies, and work allocation. University technology transfer offices bring their own priorities and procedures that must align with commercial timelines and confidentiality needs. Successful STTR applicants establish clear agreements before proposal submission regarding intellectual property ownership, licensing terms, and researcher time commitments. Vague or contested partnership terms appear in proposal review and reduce award probability.</p>
            </div>
          </div>
        </section>

        <section id="eligibility" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Eligibility Requirements</h2>
              <p className="text-gray-700 mb-6">SBIR eligibility requirements ensure that program benefits flow to American small businesses while maintaining research quality and commercialization potential. The small business concern definition requires fewer than five hundred employees and majority ownership by United States citizens, permanent resident aliens, or other qualifying small business concerns. The principal investigator must be primarily employed by the small business during the project period, ensuring that research capability resides within the company rather than contracted externally.</p>
              <p className="text-gray-700 mb-6">Affiliation rules determine whether entities sharing common ownership, control, or financial ties aggregate for size determination purposes. Venture capital ownership can trigger affiliation with portfolio companies, potentially disqualifying otherwise small companies from SBIR eligibility. The Small Business Administration provides guidance on affiliation determination, but companies with complex ownership structures should confirm eligibility before investing in proposal preparation. Some agencies have waiver provisions for venture-backed companies meeting specific criteria.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="text-green-700 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Eligibility Requirements</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>For-profit small business with fewer than 500 employees</li><li>Majority ownership by US citizens or permanent residents</li><li>Principal investigator primarily employed by company</li><li>Primary place of performance in United States</li><li>Independence from large business affiliation</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-red-700 flex items-center"><AlertCircle className="w-5 h-5 mr-2" />Common Disqualifiers</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>Foreign majority ownership or control</li><li>Large company affiliation through ownership</li><li>PI employed primarily elsewhere during project</li><li>Previous fraud or debarment actions</li><li>Exceeding employee count thresholds</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="registration" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Before You Apply: The Registration Gauntlet</h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold text-red-800">Warning: Start 6 Weeks Early</h3>
                    <p className="text-sm text-red-700 mt-2">
                      You cannot submit an application if your registrations are incomplete. Getting a CAGE code or SAM.gov activation can take 4-6 weeks. Do not wait until the solicitation opens.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-black rounded-full text-white flex items-center justify-center font-bold mr-3">1</div>
                    <h3 className="font-bold text-lg">SAM.gov (Critical)</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">System for Award Management. Required to do business with the US government. This generates your UEI (Unique Entity ID).</p>
                  <ul className="text-xs text-gray-500 list-disc list-inside">
                    <li>Requires IRS EIN number</li>
                    <li>Takes 10-15 days for validation</li>
                    <li>Must be renewed annually</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold mr-3">2</div>
                    <h3 className="font-bold text-lg">SBA Company Registry</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Small Business Administration registry specifically for SBIR applicants.</p>
                  <ul className="text-xs text-gray-500 list-disc list-inside">
                    <li>Instant registration (PDF download)</li>
                    <li>Validates small business status</li>
                    <li>Links to your SAM profile</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-600 rounded-full text-white flex items-center justify-center font-bold mr-3">3</div>
                    <h3 className="font-bold text-lg">Grants.gov</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">The submission portal for most civilian agencies (NIH, DOE, USDA). You need an "AOR" (Authorized Organization Representative) account.</p>
                  <ul className="text-xs text-gray-500 list-disc list-inside">
                    <li>Use same email as SAM.gov</li>
                    <li>Requires password updates every 90 days</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-purple-600 rounded-full text-white flex items-center justify-center font-bold mr-3">4</div>
                    <h3 className="font-bold text-lg">Agency Portals</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Specific portals for other agencies. You must register here too.</p>
                  <ul className="text-xs text-gray-500 list-disc list-inside">
                    <li><strong>DSIP:</strong> Defense SBIR/STTR Innovation Portal (DoD)</li>
                    <li><strong>Research.gov:</strong> NSF Portal</li>
                    <li><strong>eRA Commons:</strong> NIH (complex setup)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="application" className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Application Process</h2>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div><div><h3 className="font-bold">Topic Identification</h3><p className="text-gray-600 text-sm">Research agency solicitations to identify topics matching your technology capabilities. Review topic descriptions, technical requirements, and evaluation criteria. Contact topic authors for clarification on scope and priorities before proposal development.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div><div><h3 className="font-bold">Proposal Development</h3><p className="text-gray-600 text-sm">Prepare technical and commercialization sections following agency-specific formats and page limits. Address all evaluation criteria explicitly. Include letters of support from potential customers, partners, and investors demonstrating market interest.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div><div><h3 className="font-bold">Submission and Review</h3><p className="text-gray-600 text-sm">Submit through agency portals before deadlines with all required forms and certifications. Review processes vary by agency from several weeks to months. Some agencies conduct presentations or interviews for finalist proposals.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div><div><h3 className="font-bold">Negotiation and Award</h3><p className="text-gray-600 text-sm">Selected proposals proceed to contract negotiation addressing budget, milestones, reporting requirements, and intellectual property terms. Award timelines range from weeks for some agencies to months for others depending on contracting processes.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section id="phase-comparison" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Snapshot: Phase I vs Phase II</h2>
              <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">Understanding the distinct goals of each phase is critical. Phase I is about <em>proving it works</em>. Phase II is about <em>making it market-ready</em>.</p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-4 border border-gray-200 text-left">Feature</th>
                      <th className="p-4 border border-gray-200 text-left text-blue-800">Phase I (Feasibility)</th>
                      <th className="p-4 border border-gray-200 text-left text-purple-800">Phase II (Development)</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="p-4 border border-gray-200 font-bold">Funding Amount</td>
                      <td className="p-4 border border-gray-200">$50,000 - $295,924</td>
                      <td className="p-4 border border-gray-200">$750,000 - $1,972,828</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 border border-gray-200 font-bold">Duration</td>
                      <td className="p-4 border border-gray-200">6 - 12 Months</td>
                      <td className="p-4 border border-gray-200">24 Months</td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-gray-200 font-bold">Primary Goal</td>
                      <td className="p-4 border border-gray-200">Scientific/Technical Merit & Feasibility</td>
                      <td className="p-4 border border-gray-200">Prototype & Commercial Potential</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 border border-gray-200 font-bold">Success Rate</td>
                      <td className="p-4 border border-gray-200">15% - 25%</td>
                      <td className="p-4 border border-gray-200">45% - 55% (from Phase I)</td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-gray-200 font-bold">Key Output</td>
                      <td className="p-4 border border-gray-200">Final Report + Feasibility Proof</td>
                      <td className="p-4 border border-gray-200">Commercial Prototype / Product</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="proposal" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Structuring Your Commercialization Plan</h2>
              <p className="text-gray-700 mb-8">For Phase II (and increasingly Phase I), the "Commercialization Plan" is where many technical founders fail. Agencies do not fund science projects; they fund products. Here is the structure winning proposals use.</p>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
                  <h3 className="text-lg font-bold mb-2">1. The Market Opportunity (Tam/Sam/Som)</h3>
                  <p className="text-sm text-gray-600">Define your Total Addressable Market (TAM), Serviceable Available Market (SAM), and Serviceable Obtainable Market (SOM). <strong>Do not say "everyone".</strong> Be specific (e.g., "The 4,500 acute care hospitals in the US").</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
                  <h3 className="text-lg font-bold mb-2">2. The Customer & Pain Point</h3>
                  <p className="text-sm text-gray-600">Who writes the check? Is it the Department of Defense? A hospital purchasing manager? A consumer? Clearly articulate <em>why</em> they are desperate for your solution.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
                  <h3 className="text-lg font-bold mb-2">3. The Competition (Be Honest)</h3>
                  <p className="text-sm text-gray-600">List competitors by name. Use a "feature matrix" to show where you win (e.g., "We are 50% cheaper," "We detect pathogens 2 hours faster"). <strong>Never say "we have no competitors".</strong></p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-600">
                  <h3 className="text-lg font-bold mb-2 flex items-center"><Award className="w-5 h-5 mr-2" /> 4. Letters of Support (The Secret Weapon)</h3>
                  <p className="text-sm text-gray-600"><strong>Crucial:</strong> Include actual letters from potential customers saying "If this innovation works as described, we would be interested in buying/testing it." This validates market pull better than any paragraph of text.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">Topic Mismatch</h3><p className="text-sm text-gray-600">Submitting proposals that address general technology areas rather than specific topic requirements. Reviewers evaluate responsiveness to topic scope, not general innovation merit.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">Weak Commercialization</h3><p className="text-sm text-gray-600">Focusing exclusively on technical innovation without compelling market evidence. Customer interest and realistic business models are essential for competitive proposals.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">Generic Team Descriptions</h3><p className="text-sm text-gray-600">Failing to demonstrate specific team qualifications for proposed work. Reviewers need confidence that named personnel have relevant expertise and availability.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">Ignoring Page Limits</h3><p className="text-sm text-gray-600">Submitting proposals that exceed format requirements or bury key information. Reviewers have limited time and may not find important content in poorly organized proposals.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="success-stories" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Real SBIR Success Stories</h2>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-blue-900 p-8 flex flex-col justify-center text-white">
                    <Zap className="w-12 h-12 mb-4 text-yellow-400" />
                    <h3 className="text-xl font-bold mb-2">Qualcomm</h3>
                    <p className="text-blue-200 text-sm">San Diego, CA</p>
                    <div className="mt-4 pt-4 border-t border-blue-700">
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">Impact</p>
                      <p className="text-lg font-bold">Industry Giant</p>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">From Small Grant to Global Standard</h4>
                    <p className="text-gray-600 mb-4">
                      Long before 5G, Qualcomm was a tiny startup with an idea for digital wireless communications (CDMA). They received $1.5 million in SBIR funding from the NSF and DoD in the late 1980s.
                    </p>
                    <p className="text-gray-600">
                      <strong>The SBIR Effect:</strong> The grants allowed them to hire key engineers and build the first prototypes without giving up equity to VCs too early. Today, Qualcomm is worth over $150 billion, and their technology is in almost every smartphone on Earth.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-green-900 p-8 flex flex-col justify-center text-white">
                    <Leaf className="w-12 h-12 mb-4 text-green-400" />
                    <h3 className="text-xl font-bold mb-2">Ecovative Design</h3>
                    <p className="text-green-200 text-sm">Green Island, NY</p>
                    <div className="mt-4 pt-4 border-t border-green-700">
                      <p className="text-xs font-semibold uppercase tracking-wider text-green-300">Impact</p>
                      <p className="text-lg font-bold">Sustainable Packaging</p>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Mushroom Roots Replacing Styrofoam</h4>
                    <p className="text-gray-600 mb-4">
                      Ecovative uses mycelium (mushroom roots) to grow 100% compostable packaging. They started with USDA and NSF SBIR grants to prove that their "grown" materials could match the performance of plastic.
                    </p>
                    <p className="text-gray-600">
                      <strong>The SBIR Effect:</strong> The funding helped them scale from a university lab bench to a pilot factory. They now partner with giants like IKEA and Dell to replace tons of plastic waste annually.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-500 italic">Your company could be next. But only if you apply.</p>
              </div>

            </div>
          </div>
        </section>
        <section id="strategies" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Success Strategies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><h3 className="font-bold mb-3 text-green-700">Winning Approaches</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Research agencies thoroughly to identify best technology-mission alignment</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Contact topic authors for clarification before proposal development</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Include letters of support from potential customers and partners</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Balance technical innovation with realistic commercialization planning</span></li></ul></div>
                <div><h3 className="font-bold mb-3 text-purple-700">Pro Tips</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Start with agencies best aligned to your technology domain</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Apply to multiple agencies and topics to increase success probability</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Resubmit unsuccessful proposals with reviewer feedback incorporated</span></li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Accordion type="single" collapsible key={index}>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-medium text-blue-800">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">State Business Grant Programs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Link href="/usa/california" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Building className="w-5 h-5 text-blue-600 mr-3" /><span>California Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/usa/texas" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Building className="w-5 h-5 text-red-600 mr-3" /><span>Texas Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/usa/new-york" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Building className="w-5 h-5 text-purple-600 mr-3" /><span>New York Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/usa/florida" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Building className="w-5 h-5 text-orange-600 mr-3" /><span>Florida Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/usa/small-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Building className="w-5 h-5 text-green-600 mr-3" /><span>All US Small Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
              <h3 className="text-xl font-bold mb-4">Related SBIR Guides</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/sbir-sttr-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-green-600 mr-3" /><span>SBIR/STTR Complete Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/nsf-sbir-grants-technology-startups" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-green-600 mr-3" /><span>NSF SBIR Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Ready to Apply for SBIR Grants?</h2>
              <p className="text-xl text-blue-100 mb-8">Get our comprehensive SBIR application guide with agency-specific tips, proposal templates, and winning strategies for innovative small businesses seeking federal research and development funding.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/guides/apply-sbir-grants"><Download className="w-4 h-4 mr-2" /> Get SBIR Guide</Link></Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild><Link href="/contact?program=sbir">Get Expert Help</Link></Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
