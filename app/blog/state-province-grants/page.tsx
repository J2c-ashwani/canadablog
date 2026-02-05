import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, MapPin, TrendingUp, Sun, ShoppingCart, Zap, Anchor, Truck, Home, Briefcase, GraduationCap, Gavel, Globe, Landmark, Flag, Star, Key, Navigation, Map , Microscope, Wheat, BookOpen, HelpCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { GrantSuccessTable } from "@/components/blog/GrantSuccessTable"
import { ExpertTipBox } from "@/components/blog/ExpertTipBox"
import AdSlot from "@/components/blog/AdSlot"
import NewsletterBox from "@/components/blog/NewsletterBox"

export const metadata: Metadata = {
  title: "State & Province Business Grants (2026): Local Funding Guide",
  description: "Federal grants are competitive. Local grants are winnable. We rank the Top 10 States and Provinces for business incentives, tax credits, and relocation funds.",
  keywords: "State business grants 2026, Provincial funding Canada, Texas Enterprise Fund, Ontario business grants, NYS CFA, Florida business incentives, California business grants",
  openGraph: {
    title: "State & Province Business Grants (2026): Local Funding Guide",
    description: "The definitive guide to local economic development. Find out which US States and Canadian Provinces are paying businesses to relocate.",
    url: "https://www.fsidigital.ca/blog/state-province-grants",
    images: ["/og-image-state.png"],
  },
}

export default function StateProvinceGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-10"></div>
          <div className="absolute inset-0 bg-emerald-600/10 mix-blend-overlay"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <Badge className="mb-6 bg-emerald-500/20 text-emerald-100 border-emerald-400/30 backdrop-blur-sm px-4 py-1 text-sm rounded-full">
                📍 Local Funding 2026
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                State & Provincial Grants:<br />The "Hidden" Funding Layer
              </h1>
              <p className="text-xl md:text-2xl text-emerald-100 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
                Everyone applies to the federal government. But the smartest founders look closer to home. We analyze the aggressive incentive packages from <strong>Texas, Ontario, Florida, New York</strong>, and beyond to help you find the best jurisdiction for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Button size="lg" className="bg-emerald-500 text-white hover:bg-emerald-600 font-bold shadow-xl border-0 text-lg px-8 h-14" asChild>
                  <Link href="#top-10-states">
                    View Top 10 Incentives
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/5 font-medium text-lg px-8 h-14" asChild>
                  <Link href="/grant-finder">
                    Search by Location
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
                    While federal grants focus on "Innovation," state and provincial grants focus on "Jobs."
                  </p>
                  <p>
                    Economic Development Organizations (EDOs) are in a bidding war for your business. They want your tax revenue and your employment numbers. If you are willing to move your HQ, build a new factory, or hire 50 people, these agencies will roll out the red carpet with cash, tax abatements, and free land.
                  </p>

                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-2xl border-l-8 border-emerald-600 my-10 shadow-sm">
                    <h4 className="text-emerald-900 dark:text-emerald-100 font-bold text-2xl mb-4">The "2-Hour Rule"</h4>
                    <p className="mb-0 text-emerald-800 dark:text-emerald-200 text-lg">
                      Apply for grants within a 2-hour drive of your HQ. Local reviewers prefer to fund businesses they can visit. Success rates for local grants (40%+) are double those of federal grants (~15-20%).
                    </p>
                  </div>
                </div>

                <div id="why-local" className="scroll-mt-32">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Why "Boring" Grants Are Better</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <Card className="hover:shadow-lg transition border-emerald-100 bg-emerald-50/50">
                      <CardHeader><CardTitle className="text-emerald-800">Less Competition</CardTitle></CardHeader>
                      <CardContent>
                        <p className="text-gray-700">A federal grant might get 5,000 applications. A grant from the "Iowa Economic Development Authority" might get 50. Your odds are mathematically superior.</p>
                      </CardContent>
                    </Card>
                    <Card className="hover:shadow-lg transition border-blue-100 bg-blue-50/50">
                      <CardHeader><CardTitle className="text-blue-800">Broader Eligibility</CardTitle></CardHeader>
                      <CardContent>
                        <p className="text-gray-700">Federal grants demand "New-to-World Innovation." State grants often fund "Operational Expansion." Buying a standard CNC machine? Federal says no. State often says yes.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <AdSlot adSlot="1122334455" adFormat="horizontal" className="my-10" />

                {/* New Section V4: Top 10 Investment States Deep Dive */}
                <div id="top-10-states" className="scroll-mt-32 mt-20">
                  <div className="flex items-center mb-8">
                    <Star className="w-10 h-10 text-yellow-500 mr-4 fill-yellow-500" />
                    <h2 className="text-4xl font-bold text-gray-900">Top 10 States/Provinces for Incentives</h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-10">We analyzed 60 jurisdictions based on Cash Grants, Tax Credits, and Cost of Doing Business. These are the winners for 2026.</p>

                  <div className="space-y-12">
                    {/* 1. Texas */}
                    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-red-900 text-white p-6 flex justify-between items-center">
                        <h3 className="text-2xl font-bold flex items-center"><MapPin className="mr-2" /> 1. Texas (USA)</h3>
                        <Badge className="bg-white text-red-900">#1 for Relocation</Badge>
                      </div>
                      <div className="p-8 bg-white">
                        <p className="mb-4 text-gray-700 font-medium">The "Texas Enterprise Fund (TEF)" is the largest deal-closing fund in the nation. If you create 75+ jobs, they will write you a check to move there.</p>
                        <ul className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> No Corporate Income Tax</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> R&D Tax Credit (Sales Tax Exemption)</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Governor's University Research Initiative</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Skills Development Fund (Training cash)</li>
                        </ul>
                      </div>
                    </div>

                    {/* 2. Ontario */}
                    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-blue-800 text-white p-6 flex justify-between items-center">
                        <h3 className="text-2xl font-bold flex items-center"><MapPin className="mr-2" /> 2. Ontario (Canada)</h3>
                        <Badge className="bg-white text-blue-800">#1 for R&D</Badge>
                      </div>
                      <div className="p-8 bg-white">
                        <p className="mb-4 text-gray-700 font-medium">Home to the Toronto-Waterloo corridor. Ontario stacks provincial R&D credits (OITC) on top of federal ones, offering the lowest net cost for R&D in North America.</p>
                        <ul className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> SWODF (Southwestern Ontario Fund)</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> EODF (Eastern Ontario Fund)</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> OCI (Ontario Centre of Innovation) Vouchers</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Next Generation Manufacturing (NGen)</li>
                        </ul>
                      </div>
                    </div>

                    {/* 3. New York */}
                    <div className="space-y-16">
                      {/* 1. Texas */}
                      <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-xl">
                        <div className="bg-gradient-to-r from-red-900 to-red-800 text-white p-10">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-4xl font-bold flex items-center mb-2"><MapPin className="mr-3 w-8 h-8" /> 1. Texas (USA)</h3>
                              <p className="text-red-100 text-xl">The "Low Tax, High Freedom" Model</p>
                            </div>
                            <Badge className="bg-white text-red-900 px-4 py-2 text-lg">#1 for Relocation</Badge>
                          </div>
                        </div>
                        <div className="p-10 bg-white">
                          <div className="prose prose-lg text-gray-600 mb-8">
                            <p>Texas has successfully positioned itself as the "Anti-California." With zero corporate income tax and zero personal income tax, it is the default destination for companies fleeing high-cost coastal cities. The state government runs it like a business, treating the "Texas Enterprise Fund" as a venture capital fund to close deals.</p>
                          </div>
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 p-6 rounded-xl">
                              <h4 className="font-bold text-slate-900 mb-4 text-lg">Key Incentives</h4>
                              <ul className="space-y-3">
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>Texas Enterprise Fund (TEF):</strong> A cash-grant "deal closing" fund used when Texas is competing against another state. Must create 75+ jobs.</li>
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>Skills Development Fund:</strong> Texas pays for the community college to train your workers directly.</li>
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>Chapter 313 (Legacy):</strong> Massive property tax abatements for large manufacturing.</li>
                              </ul>
                            </div>
                            <div className="bg-red-50 p-6 rounded-xl">
                              <h4 className="font-bold text-red-900 mb-4 text-lg">Target Sectors</h4>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="border-red-200 text-red-800">Semiconductors</Badge>
                                <Badge variant="outline" className="border-red-200 text-red-800">Energy / Oil & Gas</Badge>
                                <Badge variant="outline" className="border-red-200 text-red-800">Aerospace</Badge>
                                <Badge variant="outline" className="border-red-200 text-red-800">Headquarters</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 2. Ontario */}
                      <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-xl">
                        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-10">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-4xl font-bold flex items-center mb-2"><MapPin className="mr-3 w-8 h-8" /> 2. Ontario (Canada)</h3>
                              <p className="text-blue-100 text-xl">The Manufacturing & Tech Dynamo</p>
                            </div>
                            <Badge className="bg-white text-blue-900 px-4 py-2 text-lg">#1 for R&D Costs</Badge>
                          </div>
                        </div>
                        <div className="p-10 bg-white">
                          <div className="prose prose-lg text-gray-600 mb-8">
                            <p>Ontario sits in the heart of the North American manufacturing belt, just hours from Detroit and Buffalo. It offers a "sweet spot": extremely highly skilled talent (Waterloo engineers) at 70% of the cost of US engineers, combined with aggressive government co-investment.</p>
                          </div>
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 p-6 rounded-xl">
                              <h4 className="font-bold text-slate-900 mb-4 text-lg">Key Incentives</h4>
                              <ul className="space-y-3">
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>SWODF / EODF:</strong> Grants of up to 15% of project costs for expanding factories in Southern/Eastern Ontario.</li>
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>OITC (Ontario Innovation Tax Credit):</strong> An 8% refundable credit that stacks ON TOP of the federal SR&ED credit.</li>
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>NextGen Manufacturing (NGen):</strong> Massive grants for advanced robotics and AI supply chains.</li>
                              </ul>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-xl">
                              <h4 className="font-bold text-blue-900 mb-4 text-lg">Target Sectors</h4>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="border-blue-200 text-blue-800">Automotive / EV Battery</Badge>
                                <Badge variant="outline" className="border-blue-200 text-blue-800">Life Sciences</Badge>
                                <Badge variant="outline" className="border-blue-200 text-blue-800">FinTech</Badge>
                                <Badge variant="outline" className="border-blue-200 text-blue-800">Food Processing</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 3. New York */}
                      <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-xl">
                        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-10">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-4xl font-bold flex items-center mb-2"><MapPin className="mr-3 w-8 h-8" /> 3. New York (USA)</h3>
                              <p className="text-indigo-100 text-xl">The "Startup NY" Tax-Free Zone</p>
                            </div>
                            <Badge className="bg-white text-indigo-900 px-4 py-2 text-lg">Tax-Free for 10 Years</Badge>
                          </div>
                        </div>
                        <div className="p-10 bg-white">
                          <div className="prose prose-lg text-gray-600 mb-8">
                            <p>New York is famously high-tax, but it created "Startup NY" to counter that image. This program creates tax-free zones around SUNY university campuses. If your business locates there and partners with the school, employees pay NO state income tax for 10 years.</p>
                          </div>
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 p-6 rounded-xl">
                              <h4 className="font-bold text-slate-900 mb-4 text-lg">Key Incentives</h4>
                              <ul className="space-y-3">
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>Excelsior Jobs Program:</strong> Refundable tax credits (6.85%) on wages for net new jobs.</li>
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>NY Ventures:</strong> The state operates its own VC fund to invest equity into high-growth startups.</li>
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>43North:</strong> The world's richest business competition (Buffalo), handing out $5M in prizes annually.</li>
                              </ul>
                            </div>
                            <div className="bg-indigo-50 p-6 rounded-xl">
                              <h4 className="font-bold text-indigo-900 mb-4 text-lg">Target Sectors</h4>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="border-indigo-200 text-indigo-800">Semiconductors (Micron)</Badge>
                                <Badge variant="outline" className="border-indigo-200 text-indigo-800">Clean Tech</Badge>
                                <Badge variant="outline" className="border-indigo-200 text-indigo-800">Optics/Photonics (Rochester)</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 4. Florida */}
                      <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-xl">
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-10">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-4xl font-bold flex items-center mb-2"><MapPin className="mr-3 w-8 h-8" /> 4. Florida (USA)</h3>
                              <p className="text-orange-100 text-xl">The Space Coast & Crypto Hub</p>
                            </div>
                            <Badge className="bg-white text-orange-600 px-4 py-2 text-lg">0% Personal Income Tax</Badge>
                          </div>
                        </div>
                        <div className="p-10 bg-white">
                          <div className="prose prose-lg text-gray-600 mb-8">
                            <p>Florida is aggressive. With no personal income tax, it attracts talent easily. The "Space Coast" (Cape Canaveral) is the global center for aerospace. "Enterprise Florida" creates custom packages involving infrastructure grants to build roads specifically for your new facility.</p>
                          </div>
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 p-6 rounded-xl">
                              <h4 className="font-bold text-slate-900 mb-4 text-lg">Key Incentives</h4>
                              <ul className="space-y-3">
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>Capital Investment Tax Credit (CITC):</strong> Covers up to 100% of the project's capital cost via tax offsets for 20 years.</li>
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>Quick Response Training (QRT):</strong> Cash grants to reimburse training costs for new hires.</li>
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>Space Florida:</strong> Specialized financing for aerospace infrastructure.</li>
                              </ul>
                            </div>
                            <div className="bg-orange-50 p-6 rounded-xl">
                              <h4 className="font-bold text-orange-900 mb-4 text-lg">Target Sectors</h4>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="border-orange-200 text-orange-800">Aerospace</Badge>
                                <Badge variant="outline" className="border-orange-200 text-orange-800">Defense</Badge>
                                <Badge variant="outline" className="border-orange-200 text-orange-800">Simulations</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 5. Quebec */}
                      <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-xl">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-10">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-4xl font-bold flex items-center mb-2"><MapPin className="mr-3 w-8 h-8" /> 5. Quebec (Canada)</h3>
                              <p className="text-blue-100 text-xl">The AI & Gaming Superpower</p>
                            </div>
                            <Badge className="bg-white text-blue-600 px-4 py-2 text-lg">Low Cost Energy</Badge>
                          </div>
                        </div>
                        <div className="p-10 bg-white">
                          <div className="prose prose-lg text-gray-600 mb-8">
                            <p>Montreal is the world capital for video games and AI research (Mila Institute). The government subsidizes wages. Literally. They will pay up to 30% of the salary for your developers, year after year. Combined with cheap Hydro-Québec electricity, the opex savings are massive.</p>
                          </div>
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 p-6 rounded-xl">
                              <h4 className="font-bold text-slate-900 mb-4 text-lg">Key Incentives</h4>
                              <ul className="space-y-3">
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>E-Business Tax Credit (CDAE):</strong> Refundable tax credit covering 30% of eligible IT salaries (up to $25k per employee).</li>
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>Multimedia Production Credit:</strong> Specifically for game studios.</li>
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>ESSOR:</strong> Investment support for high-risk projects.</li>
                              </ul>
                            </div>
                            <div className="bg-cyan-50 p-6 rounded-xl">
                              <h4 className="font-bold text-cyan-900 mb-4 text-lg">Target Sectors</h4>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="border-cyan-200 text-cyan-800">Artificial Intelligence</Badge>
                                <Badge variant="outline" className="border-cyan-200 text-cyan-800">Video Games / VFX</Badge>
                                <Badge variant="outline" className="border-cyan-200 text-cyan-800">Aerospace (Bombardier)</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 6. Alberta */}
                      <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-xl">
                        <div className="bg-gradient-to-r from-stone-800 to-stone-900 text-white p-10">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-4xl font-bold flex items-center mb-2"><MapPin className="mr-3 w-8 h-8" /> 6. Alberta (Canada)</h3>
                              <p className="text-stone-300 text-xl">The Energy Transition Giant</p>
                            </div>
                            <Badge className="bg-white text-stone-900 px-4 py-2 text-lg">Lowest Corporate Tax</Badge>
                          </div>
                        </div>
                        <div className="p-10 bg-white">
                          <div className="prose prose-lg text-gray-600 mb-8">
                            <p>Alberta has the lowest general corporate tax rate in Canada (8%). It is aggressively pivoting from Oil & Gas to "Tech" and "Renewables." It recently broke records for Venture Capital attraction.</p>
                          </div>
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 p-6 rounded-xl">
                              <h4 className="font-bold text-slate-900 mb-4 text-lg">Key Incentives</h4>
                              <ul className="space-y-3">
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>Alberta Innovation Employment Grant:</strong> Up to 20% refundable tax credit for R&D.</li>
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>Alberta Enterprise Corp:</strong> The province acts as a VC LP to stimulate local investment.</li>
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>TIER Fund:</strong> Funding for emissions reduction technologies.</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 7. California */}
                      <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-xl">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-10">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-4xl font-bold flex items-center mb-2"><MapPin className="mr-3 w-8 h-8" /> 7. California (USA)</h3>
                              <p className="text-white text-xl">The Venture Capital Capital</p>
                            </div>
                            <Badge className="bg-white text-orange-500 px-4 py-2 text-lg">Note: High Cost</Badge>
                          </div>
                        </div>
                        <div className="p-10 bg-white">
                          <div className="prose prose-lg text-gray-600 mb-8">
                            <p>California is expensive. Taxes are high. Regulations are strict. So why is it on this list? <strong>Capital.</strong> The "California Competes" tax credit is massive (negotiated on a case-by-case basis), and the sheer density of VCs means you are paying for access to money. </p>
                          </div>
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 p-6 rounded-xl">
                              <h4 className="font-bold text-slate-900 mb-4 text-lg">Key Incentives</h4>
                              <ul className="space-y-3">
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>California Competes Tax Credit (CCTC):</strong> Income tax credit available to businesses that want to stay and grow.</li>
                                <li className="flex items-start text-sm"><CheckCircle className="w-5 h-5 mr-2 text-green-600 shrink-0" /> <strong>Employment Training Panel (ETP):</strong> Cash reimbursements for training staff.</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Regional Clusters Deep Dive (New V3 Content) */}
                <div id="regional-clusters" className="scroll-mt-32 mt-20">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Map className="w-8 h-8 text-purple-600 mr-3" />
                    Regional Innovation Clusters: Where to Move?
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Smart founders don't just look for money; they look for ecosystems. Governments spend billions building "Superclusters" where supply chains are concentrated. Moving here unlocks specific pots of money.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                      <h4 className="font-bold text-xl text-slate-800 mb-2 flex items-center"><Truck className="mr-2" /> Automotive & EV Battery Belt</h4>
                      <p className="text-sm font-bold text-purple-600 mb-2">Location: Michigan, Ohio, Ontario, Kentucky</p>
                      <p className="text-sm text-gray-600">If you make anything related to EVs (batteries, sensors, metals), this is the only place to be. Grants available for "re-tooling" traditional auto plants.</p>
                      <Link href="/blog/manufacturing-grants" className="text-blue-600 text-xs mt-2 block hover:underline">View MFG Grants</Link>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                      <h4 className="font-bold text-xl text-slate-800 mb-2 flex items-center"><Anchor className="mr-2" /> The Blue Economy (Ocean)</h4>
                      <p className="text-sm font-bold text-purple-600 mb-2">Location: Halifax (NS), St. John's (NL), Boston (MA)</p>
                      <p className="text-sm text-gray-600">For underwater robotics, sensors, and sustainable fisheries. The "Ocean Supercluster" (Canada) is a massive funder here.</p>
                      <Link href="/blog/ocean-tech-grants" className="text-blue-600 text-xs mt-2 block hover:underline">View Ocean Grants</Link>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                      <h4 className="font-bold text-xl text-slate-800 mb-2 flex items-center"><Zap className="mr-2" /> Clean Energy Transition</h4>
                      <p className="text-sm font-bold text-purple-600 mb-2">Location: Alberta, Texas, Saskatchewan</p>
                      <p className="text-sm text-gray-600">The "Oil Patch" is pivoting to Hydrogen and Carbon Capture. Massive funding available for energy transition technologies.</p>
                      <Link href="/blog/clean-tech-energy-grants" className="text-blue-600 text-xs mt-2 block hover:underline">View Energy Grants</Link>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                      <h4 className="font-bold text-xl text-slate-800 mb-2 flex items-center"><Microscope className="mr-2" /> Life Sciences Corridor</h4>
                      <p className="text-sm font-bold text-purple-600 mb-2">Location: Boston, Toronto, Montreal, San Diego</p>
                      <p className="text-sm text-gray-600">Highest concentration of venture capital and lab space. Grants focus on clinical trials and FDA/Health Canada approvals.</p>
                      <Link href="/blog/health-tech-grants" className="text-blue-600 text-xs mt-2 block hover:underline">View Health Grants</Link>
                    </div>
                  </div>
                </div>

                {/* New Section: Rural Economic Development */}
                <div id="rural-grants" className="scroll-mt-32 mt-20">
                  <div className="bg-green-50 border border-green-200 rounded-3xl p-8">
                    <div className="flex items-center mb-6">
                      <Users className="w-10 h-10 text-green-700 mr-4" />
                      <h2 className="text-3xl font-bold text-green-900">The "Small Town" Advantage (Rural Grants)</h2>
                    </div>
                    <p className="text-green-800 text-lg mb-6">
                      Major cities (Toronto, NYC, SF) don't need you. They have too many businesses. Small towns <em>need</em> you. Rural grants are easier to get and often cover higher percentages of costs.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h4 className="font-bold text-green-800 mb-3 text-lg">In Canada: Community Futures</h4>
                        <p className="text-gray-600 text-sm mb-3">Community Futures Development Corporations (CFDCs) are hyper-local offices found in almost every rural town. They offer business loans up to $150k with flexible terms that big banks would never touch.</p>
                        <Badge variant="outline" className="text-green-700 border-green-200">267 Offices Nationwide</Badge>
                      </div>
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h4 className="font-bold text-green-800 mb-3 text-lg">In USA: USDA Rural Development</h4>
                        <p className="text-gray-600 text-sm mb-3">The USDA REAP program (Rural Energy for America Program) pays for 50% of solar panels/energy upgrades for rural small businesses. Value Added Producer Grants (VAPG) are also massive.</p>
                        <Badge variant="outline" className="text-green-700 border-green-200">REAP Grants</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* The "Site Selection" Game */}
                <div className="mt-20">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <Flag className="mr-3 w-8 h-8 text-neutral-600" /> How to Play the "Site Selection" Game
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">For major projects ($5M+), do not just "apply". You should negotiate. It is called Site Selection.</p>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 shrink-0 mt-1">1</div>
                      <div>
                        <h4 className="font-bold text-lg">Create Competition</h4>
                        <p className="text-gray-600">Never tell a city they are your only choice. Tell them you are deciding between "City A" and "City B" and ask for their best offer.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 shrink-0 mt-1">2</div>
                      <div>
                        <h4 className="font-bold text-lg">Ask for "Non-Cash" Incentives</h4>
                        <p className="text-gray-600">Cash grants are rare. Ask for: Fast-track permitting (worth gold), Property tax abatements (PILOTs), or Custom training programs at the local college.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 shrink-0 mt-1">3</div>
                      <div>
                        <h4 className="font-bold text-lg">Hire a Site Selector</h4>
                        <p className="text-gray-600">If you are building a factory, hire a professional Site Selection consultant. They know which states have hidden "closing funds" that aren't advertised.</p>
                      </div>
                    </div>
                  </div>
                </div>


                {/* FAQ Section */}
                <div className="mt-20 pt-10 border-t border-gray-200">
                  <h2 className="text-3xl font-bold mb-8">FAQ: Local Grants</h2>
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 mb-2">Can I apply if I haven't incorporated yet?</h4>
                      <p className="text-gray-600">For most state/provincial grants: <strong>No.</strong> They want to see a registered business with a bank account. For "Startups" funds (like Futurpreneur or SBDC competitions), sole proprietorships might be eligible.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 mb-2">Do these grants apply to remote companies?</h4>
                      <p className="text-gray-600">It's harder. Local governments fund <em>local impact</em>. If your employees work from home in 5 different states, no single state wants to fund you. You usually need a "Physical Presence" (Lease) to unlock state funds.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 mb-2">What is a "Clawback"?</h4>
                      <p className="text-gray-600">If you receive a grant to create 50 jobs, and 2 years later you fire everyone, the government will demand the money back. This is a Clawback provision. Read your contract.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-10">
                <Card className="bg-emerald-50 border-emerald-100 sticky top-28 shadow-lg">
                  <CardHeader className="bg-emerald-100/50 pb-4">
                    <CardTitle className="text-emerald-900 text-lg">Local Success Checklist</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 text-sm pt-6">
                    <div className="flex justify-between items-center pb-3 border-b border-emerald-200/60">
                      <span className="text-emerald-700 font-medium">Competition</span>
                      <span className="font-bold text-gray-900 text-green-600">Low</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-emerald-200/60">
                      <span className="text-emerald-700 font-medium">Best For</span>
                      <span className="font-bold text-gray-900">Capital Exp / Hiring</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-emerald-200/60">
                      <span className="text-emerald-700 font-medium">Contact</span>
                      <span className="font-bold text-gray-900">Local EDO</span>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-emerald-100">
                      <p className="text-xs text-emerald-600 mb-2 font-bold uppercase">Pro Tip</p>
                      <p className="text-gray-700 italic">"Call the Economic Development Officer (EDO) for your city. Take them for coffee. They are the gatekeepers."</p>
                    </div>

                    <div className="pt-2">
                      <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-lg py-6 shadow-md" asChild>
                        <Link href="/contact">Find Your Local EDO</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter Box */}
                <NewsletterBox />

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Regional Guides</h3>
                  <ul className="space-y-4">
                    <li>
                      <Link href="/blog/ontario-business-grants" className="text-blue-600 hover:text-blue-800 hover:underline flex items-start group">
                        <MapPin className="w-5 h-5 mr-3 shrink-0 mt-0.5 group-hover:scale-110 transition" />
                        <span><strong>Ontario Grants</strong><br /><span className="text-xs text-gray-500 font-normal">FedDev & Provincial funds</span></span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/texas-business-incentives" className="text-blue-600 hover:text-blue-800 hover:underline flex items-start group">
                        <Sun className="w-5 h-5 mr-3 shrink-0 mt-0.5 group-hover:scale-110 transition" />
                        <span><strong>Texas Incentives</strong><br /><span className="text-xs text-gray-500 font-normal">Enterprise Fund details</span></span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/rural-funding-guide" className="text-blue-600 hover:text-blue-800 hover:underline flex items-start group">
                        <Wheat className="w-5 h-5 mr-3 shrink-0 mt-0.5 group-hover:scale-110 transition" />
                        <span><strong>Rural Business Guide</strong><br /><span className="text-xs text-gray-500 font-normal">USDA & Community Futures</span></span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <AdSlot adSlot="5566778899" adFormat="vertical" style={{ minHeight: '600px' }} />
              </aside>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-emerald-900 text-white py-24 border-t border-emerald-800">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Not sure where to set up shop?</h2>
            <p className="text-emerald-100 mb-10 text-xl max-w-2xl mx-auto">
              Choosing the wrong location can cost you millions in lost incentives. We help you analyze the "incentive packages" of different cities before you sign a lease.
            </p>
            <Button size="lg" className="bg-white text-emerald-900 hover:bg-gray-100 px-10 py-8 text-xl shadow-2xl hover:scale-105 transition-all" asChild>
              <Link href="/contact">Book Site Selection Consult</Link>
            </Button>
          </div>
        </section>
        {/* New Section: Economic Development Glossary (Round 6 Expansion) */}
        <div id="econ-glossary" className="scroll-mt-32 mt-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <BookOpen className="w-8 h-8 text-green-600 mr-3" />
            Economic Development Glossary: Speak the Language
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
            <p className="text-lg text-gray-600 mb-8">
              When negotiating with state or provincial officials, you are talking to "Economic Developers" (EDOs). They use specific jargon. If you understand these terms, you can negotiate a better deal.
            </p>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              <div>
                <h4 className="font-bold text-green-900">Abatement</h4>
                <p className="text-sm text-gray-600">A temporary reduction or elimination of taxes (usually property taxes) for a specific period. E.g., "10-year property tax abatement."</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Brownfield</h4>
                <p className="text-sm text-gray-600">A former industrial site that may have environmental contamination. Governments offer massive grants to "remediate" (clean up) these sites.</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Clawback</h4>
                <p className="text-sm text-gray-600">A provision in the contract that forces you to pay back the grant if you fail to meet your promises (e.g., if you promised 50 jobs but only created 10).</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Foreign Direct Investment (FDI)</h4>
                <p className="text-sm text-gray-600">Investment made by a firm or individual in one country into business interests located in another country. Governments fight hard for FDI.</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Greenfield</h4>
                <p className="text-sm text-gray-600">A project built on previously undeveloped land (e.g., a farm). These are easier to build but may require more infrastructure (sewer/water) spending.</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Incentive Package</h4>
                <p className="text-sm text-gray-600">The total collection of grants, tax credits, loans, and free land offered to a company to entice them to move.</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Industrial Park</h4>
                <p className="text-sm text-gray-600">A zoned area planned for the purpose of industrial development. Often comes with pre-approved permits ("Shovel Ready").</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Job Creation Tax Credit (JCTC)</h4>
                <p className="text-sm text-gray-600">A tax credit given for every net new job created. Usually based on a percentage of the state income tax withholding.</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Landing Pad</h4>
                <p className="text-sm text-gray-600">A program providing free office space and mentorship for foreign companies entering a new market for the first time.</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Mega-Site</h4>
                <p className="text-sm text-gray-600">A very large industrial site (1000+ acres) with massive power/water capacity, designed for car factories or chip fabs.</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Opportunity Zone</h4>
                <p className="text-sm text-gray-600">A federally designated distressed community where new investments, under certain conditions, may be eligible for preferential tax treatment (USA).</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Payment in Lieu of Taxes (PILOT)</h4>
                <p className="text-sm text-gray-600">An arrangement where the company pays a negotiated fee to the local government instead of standard property taxes (usually much lower).</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Request for Information (RFI)</h4>
                <p className="text-sm text-gray-600">The first stage of site selection. A company sends an RFI to multiple states asking "What can you offer us?"</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Retention Grant</h4>
                <p className="text-sm text-gray-600">Money given to a company threatening to leave, to convince them to stay. (Use with caution: threatening to leave can damage relationships).</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Shovel-Ready</h4>
                <p className="text-sm text-gray-600">A site that has all permits, zoning, and utility connections completed. You can start digging immediately.</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Site Selector</h4>
                <p className="text-sm text-gray-600">A professional consultant hired by companies to find the best location for a new facility. They negotiate anonymously on your behalf.</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Tax Increment Financing (TIF)</h4>
                <p className="text-sm text-gray-600">A method of financing public improvements (roads, sewers) by using the future tax revenue generated by the project to pay for the initial construction.</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Workforce Training Grant</h4>
                <p className="text-sm text-gray-600">Cash given to a company to reimburse the cost of training new employees. Often administered by local community colleges.</p>
              </div>
            </div>
          </div>
        </div>

        {/* New Section: FAQ (Round 6 Expansion) */}
        <div id="state-faq" className="scroll-mt-32 mt-20 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <HelpCircle className="w-8 h-8 text-green-600 mr-3" />
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-slate-900 mb-2">Q: Do I have to move my whole company?</h4>
              <p className="text-gray-700">Not necessarily. Most state grants require you to have a "nexus" or physical presence in that state. This could be a subsidiary, a branch office, or an R&D lab. You don't always have to move your HQ, but the employees associated with the grant must work in that state.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-slate-900 mb-2">Q: Can I negotiate tax incentives?</h4>
              <p className="text-gray-700">Absolutely. Unlike federal grants, which are usually fixed competitions, state incentives are often negotiated deals. Everything is on the table: property tax rates, free land, utility rates, and training cash. The more jobs you create (and the higher the salaries), the more leverage you have.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-slate-900 mb-2">Q: What is the "But-For" Clause?</h4>
              <p className="text-gray-700">Many states require you to sign an affidavit stating that "But for this incentive, the project would not occur in this state." This is critical. If you announce you are moving to Texas <em>before</em> you sign the incentive deal, you lose all leverage. They won't pay you for something you were going to do anyway. Negotiate first, announce later.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-slate-900 mb-2">Q: Are Canadian or US grants better?</h4>
              <p className="text-gray-700">It depends. <strong>US Grants</strong> (SBIR) are generally larger amounts of non-dilutive cash upfront for R&D. <strong>Canadian Grants</strong> (SR&ED, IRAP) are more reliable and easier to get, focusing on tax credits and wage subsidies. Canada is often cheaper for engineering talent (due to currency and lower salaries), while the US offers access to a massive market and higher venture capital valuations.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-slate-900 mb-2">Q: How do I find a "Site Selector"?</h4>
              <p className="text-gray-700">Major commercial real estate firms (CBRE, JLL, Cushman & Wakefield) have specialized Site Selection divisions. There are also boutique firms like The Boyd Company or Hickey & Associates. If your project involves 50+ jobs or $10M+ capex, hiring one is highly recommended to maximize your incentive package.</p>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}
