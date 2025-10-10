import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Heart, Lightbulb, Sparkles, MapPin, Globe } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Indigenous Women Business Grants Canada 2025-2026 | NACCA Funding $50K, First Nations Support, Cultural Enterprise Grants Toronto Vancouver Winnipeg",
  description: "Complete 2025-2026 guide to Indigenous women business grants in Canada. NACCA Aboriginal Entrepreneurship Program, IWEF funding $50K loans, First Nations Métis Inuit women entrepreneurs support. Indigenous Financial Institutions financing Toronto Vancouver Winnipeg Calgary Ottawa Saskatoon Regina Thunder Bay",
  keywords: "Indigenous women business grants Canada 2025, NACCA funding First Nations, Aboriginal Entrepreneurship Program women, IWEF Indigenous Women Entrepreneurship Fund, First Nations business loans Métis Inuit women entrepreneurs, cultural enterprise grants Canada, Indigenous Financial Institutions IFI, women entrepreneurship loan fund $50K, Indigenous business development support Ontario BC Alberta Manitoba Saskatchewan",
  openGraph: {
    title: "Indigenous Women Business Grants Canada 2025 | NACCA Funding First Nations Support",
    description: "$50K-$250K Indigenous women business funding through NACCA, IWEF, Aboriginal Entrepreneurship Program across Canada.",
    url: "https://grantfinder.pro/blog/indigenous-women-business-grants-canada",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function IndigenousWomenBusinessGrantsCanadaPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-700 to-red-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🪶 Indigenous Women Business Funding 2025-2026
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Indigenous Women Business Grants Canada: NACCA Funding, First Nations Support & Cultural Enterprise Grants
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                Comprehensive 2025-2026 guide to Indigenous women business grants and loans across Canada. Access up to 
                $50,000 through NACCA Women Entrepreneurship Loan Fund (WELF), $100,000 Aboriginal Entrepreneurship Program, 
                and $250,000 community business funding for First Nations, Métis, and Inuit women entrepreneurs. Complete 
                funding guide through Indigenous Financial Institutions (IFIs) serving all provinces including Ontario 
                (Toronto, Ottawa, Thunder Bay, Sudbury), British Columbia (Vancouver, Victoria, Prince George), Alberta 
                (Calgary, Edmonton), Manitoba (Winnipeg, Brandon), Saskatchewan (Regina, Saskatoon), Quebec, Atlantic Canada, 
                and Northern territories supporting cultural enterprises, traditional businesses, and modern Indigenous 
                entrepreneurship creating economic reconciliation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-orange-700 hover:bg-gray-100" asChild>
                  <Link href="#indigenous-programs">
                    View Indigenous Business Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/download/indigenous-women-business-grants-guide">
                    Get Indigenous Funding Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Geographic SEO Section */}
        <section className="py-12 bg-white border-b-2 border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Indigenous Women Business Grants by Province and Territory (2025-2026 NACCA Funding Available)</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-orange-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Ontario First Nations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Indigenous Communities:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Toronto First Nations women grants</li>
                      <li>• Ottawa Indigenous business funding</li>
                      <li>• Thunder Bay NACCA loans women</li>
                      <li>• Sudbury Métis women entrepreneurs</li>
                      <li>• Hamilton First Nations support</li>
                      <li>• Six Nations women business grants</li>
                      <li>• Anishinaabe women entrepreneurs</li>
                    </ul>
                    <p className="mt-3 text-orange-700 font-semibold">50+ IFI offices Ontario</p>
                  </CardContent>
                </Card>

                <Card className="border-red-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-red-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      BC First Nations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Indigenous Communities:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Vancouver First Nations women</li>
                      <li>• Victoria Indigenous entrepreneurs</li>
                      <li>• Prince George NACCA funding</li>
                      <li>• Kamloops Métis women business</li>
                      <li>• Kelowna First Nations grants</li>
                      <li>• Coast Salish women enterprises</li>
                      <li>• Interior BC Indigenous support</li>
                    </ul>
                    <p className="mt-3 text-red-700 font-semibold">40+ IFI offices BC</p>
                  </CardContent>
                </Card>

                <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-yellow-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Prairies First Nations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Indigenous Communities:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Winnipeg Indigenous women grants</li>
                      <li>• Regina Métis women funding</li>
                      <li>• Saskatoon First Nations loans</li>
                      <li>• Calgary Indigenous entrepreneurs</li>
                      <li>• Edmonton women NACCA support</li>
                      <li>• Treaty 1-11 women businesses</li>
                      <li>• Cree Dene Métis women grants</li>
                    </ul>
                    <p className="mt-3 text-yellow-700 font-semibold">35+ IFI offices Prairies</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Atlantic & North
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Indigenous Communities:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Halifax Mi'kmaq women grants</li>
                      <li>• Moncton First Nations funding</li>
                      <li>• St. John's Indigenous women</li>
                      <li>• Yellowknife Inuit entrepreneurs</li>
                      <li>• Whitehorse First Nations loans</li>
                      <li>• Iqaluit Inuit women business</li>
                      <li>• Atlantic Indigenous support</li>
                    </ul>
                    <p className="mt-3 text-blue-700 font-semibold">25+ IFI offices Atlantic/North</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6">
                <h3 className="font-bold text-orange-900 mb-3 text-lg">🔥 High-Demand Indigenous Women Business Funding Keywords 2025-2026:</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-orange-800">
                  <div>
                    <strong>NACCA Funding:</strong> Aboriginal Entrepreneurship Program women, Indigenous Financial Institutions IFI loans, Women Entrepreneurship Loan Fund $50K, First Nations Métis Inuit women grants
                  </div>
                  <div>
                    <strong>Regional Support:</strong> Ontario First Nations women business Toronto Ottawa Thunder Bay, BC Indigenous entrepreneurs Vancouver Victoria, Prairie Indigenous women Winnipeg Calgary Regina
                  </div>
                  <div>
                    <strong>Cultural Enterprises:</strong> Indigenous arts crafts grants, traditional knowledge businesses, cultural tourism funding, Indigenous language preservation enterprises women
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced 2025 Program Updates */}
        <section className="py-8 bg-orange-50 border-b-2 border-orange-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <TrendingUp className="w-6 h-6 text-orange-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-orange-800 mb-2">🚀 2025-2026 Indigenous Women Business Funding Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-700">
                        <div>
                          <strong>NACCA 10-Year Agreement:</strong> Historic $830M over 10 years funding agreement with Indigenous Services Canada expanding Aboriginal Entrepreneurship Program for women across all provinces
                        </div>
                        <div>
                          <strong>Women Entrepreneurship Loan Fund:</strong> Up to $50,000 microloans for Indigenous women entrepreneurs through 50+ Indigenous Financial Institutions nationwide
                        </div>
                        <div>
                          <strong>IWEF 2025 Recipients:</strong> Indigenous Women Entrepreneurship Fund awarded $2,500 grants to 8 Indigenous women businesses with CCIB membership support
                        </div>
                        <div>
                          <strong>Network Expansion:</strong> Over 5,000 advisory services, 5,000 training participants, 600+ loans worth $11.4M delivered through IFI network for Indigenous women since 2022
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Indigenous Women Business Funding Ecosystem Across Canada</h2>
                <p className="text-lg text-gray-600 mb-4">
                  Indigenous women entrepreneurs across Canada have access to comprehensive business funding through the National 
                  Aboriginal Capital Corporations Association (NACCA) network of over 50 Indigenous Financial Institutions (IFIs). 
                  The historic 10-year, $830 million funding agreement with Indigenous Services Canada signed in May 2025 represents 
                  unprecedented support for First Nations, Métis, and Inuit women business owners from startup through growth stages.
                </p>
                <p className="text-lg text-gray-600">
                  Indigenous women can access up to $50,000 through Women Entrepreneurship Loan Fund (WELF) microloans, up to $100,000 
                  through Aboriginal Entrepreneurship Program individual grants, and up to $250,000 for community-owned businesses. 
                  Funding supports diverse Indigenous enterprises including cultural businesses (arts, crafts, traditional knowledge), 
                  tourism and hospitality, retail and e-commerce, professional services, construction and trades, manufacturing and 
                  production, agriculture and food systems, technology and innovation, healthcare and wellness, education and training, 
                  and natural resource development across all Canadian provinces, territories, and Indigenous communities both on-reserve 
                  and off-reserve serving First Nations, Métis, and Inuit women entrepreneurs nationwide.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div className="bg-orange-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-orange-600 mb-2">$50K</div>
                  <div className="text-gray-600 font-semibold">WELF Microloans</div>
                  <div className="text-sm text-gray-500 mt-2">Women Entrepreneurship Loan Fund for Indigenous women</div>
                </div>
                <div className="bg-red-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-red-600 mb-2">50+ IFIs</div>
                  <div className="text-gray-600 font-semibold">Indigenous Financial Institutions</div>
                  <div className="text-sm text-gray-500 mt-2">NACCA network across Canada</div>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">$830M</div>
                  <div className="text-gray-600 font-semibold">10-Year Funding</div>
                  <div className="text-sm text-gray-500 mt-2">Historic NACCA federal agreement 2025</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$3.3B</div>
                  <div className="text-gray-600 font-semibold">Total Loans Delivered</div>
                  <div className="text-sm text-gray-500 mt-2">53,000+ loans to Indigenous businesses</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Federal Indigenous Programs */}
        <section id="indigenous-programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Federal Indigenous Women Business Grants and Loans Canada 2025-2026</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Complete guide to federal Indigenous business funding programs available to First Nations, Métis, and 
                Inuit women entrepreneurs across all Canadian provinces and territories through NACCA network.
              </p>
              
              <div className="space-y-8">
                {/* NACCA Aboriginal Entrepreneurship Program */}
                <Card className="border-orange-200">
                  <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100">
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700 text-2xl">NACCA Aboriginal Entrepreneurship Program - Up to $100,000 Individual & $250,000 Community Businesses</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-orange-800">Aboriginal Entrepreneurship Program Indigenous Women</h4>
                        <div className="space-y-3">
                          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Individual Business:</span>
                              <span className="text-orange-700 font-bold text-lg">Up to $100,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Community Business:</span>
                              <span className="text-red-700 font-bold text-lg">Up to $250,000</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-700">Program Type:</span>
                              <span className="text-green-700 font-bold">Grants + Loans</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-2">Eligible Activities Indigenous Women Entrepreneurs:</p>
                            <p>• <strong>Business Startup:</strong> Launch new enterprises with startup capital for equipment, inventory, working capital</p>
                            <p>• <strong>Business Expansion:</strong> Grow existing Indigenous businesses with expansion financing, new locations, increased capacity</p>
                            <p>• <strong>Equipment Purchase:</strong> Acquire business equipment, machinery, vehicles, technology for operations</p>
                            <p>• <strong>Working Capital:</strong> Operating expenses, inventory purchases, payroll during growth phases</p>
                            <p>• <strong>Renovation & Improvement:</strong> Business facility renovations, leasehold improvements, accessibility upgrades</p>
                            <p>• <strong>Technology Adoption:</strong> E-commerce platforms, digital marketing, business software, online presence development</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Regional Aboriginal Entrepreneurship Success Stories</h4>
                        <div className="space-y-4">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <p className="font-bold text-green-800 mb-2">🪶 Toronto First Nations Catering - $75,000 NACCA Loan</p>
                            <p className="text-sm text-gray-700">Anishinaabe woman entrepreneur in Toronto obtained Aboriginal Entrepreneurship Program financing for commercial kitchen equipment, catering vehicles, Indigenous cuisine business expansion serving corporate events and cultural gatherings GTA.</p>
                            <p className="text-xs text-green-700 mt-2"><strong>Location:</strong> Toronto ON | <strong>Nation:</strong> Anishinaabe | <strong>Impact:</strong> 5 jobs created</p>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-bold text-blue-800 mb-2">🪶 Vancouver Coast Salish Arts - $60,000 NACCA Funding</p>
                            <p className="text-sm text-gray-700">Coast Salish woman artist secured Aboriginal Entrepreneurship Program grant for studio expansion, equipment, e-commerce platform selling traditional Coast Salish artwork internationally. Cultural preservation through contemporary business.</p>
                            <p className="text-xs text-blue-700 mt-2"><strong>Location:</strong> Vancouver BC | <strong>Nation:</strong> Coast Salish | <strong>Revenue:</strong> $200K annually</p>
                          </div>

                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="font-bold text-purple-800 mb-2">🪶 Winnipeg Métis Construction - $95,000 AEP Loan</p>
                            <p className="text-sm text-gray-700">Métis woman entrepreneur in Winnipeg received Aboriginal Entrepreneurship financing for construction equipment, trucks, tools launching contracting business serving Manitoba First Nations community infrastructure projects and housing.</p>
                            <p className="text-xs text-purple-700 mt-2"><strong>Location:</strong> Winnipeg MB | <strong>Heritage:</strong> Métis Nation | <strong>Contracts:</strong> $1M+ annually</p>
                          </div>

                          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <p className="font-bold text-orange-800 mb-2">🪶 Thunder Bay Ojibwe Tourism - $85,000 NACCA Grant</p>
                            <p className="text-sm text-gray-700">Ojibwe woman in Thunder Bay obtained Aboriginal Entrepreneurship funding for cultural tourism business with traditional land-based experiences, storytelling tours, Indigenous cultural education serving tourists visiting Northern Ontario.</p>
                            <p className="text-xs text-orange-700 mt-2"><strong>Location:</strong> Thunder Bay ON | <strong>Nation:</strong> Ojibwe | <strong>Visitors:</strong> 2,000+ annually</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200 mt-6">
                      <h4 className="font-bold text-lg mb-4 text-orange-800">📍 Indigenous Financial Institutions (IFI) Network - NACCA Aboriginal Entrepreneurship Delivery</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Ontario IFIs (50+ locations):</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Nishnawbe Aski Development Fund</li>
                            <li>• Métis Voyageur Development Fund</li>
                            <li>• Waubetek Business Development</li>
                            <li>• Native Leasing Services</li>
                            <li>• Six Nations Economic Development</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Western Canada IFIs:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• All Nations Trust Company (BC)</li>
                            <li>• Alberta Indian Investment Corp</li>
                            <li>• Louis Riel Capital Corp (MB)</li>
                            <li>• Métis Economic Development (SK)</li>
                            <li>• Native Commercial Credit Corp</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Atlantic & North IFIs:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Ulnooweg Development Group</li>
                            <li>• Mi'kmaq Economic Benefits Office</li>
                            <li>• Nunavut Business Credit Corp</li>
                            <li>• Yukon First Nations IFI</li>
                            <li>• NWT Indigenous organizations</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-4 text-center">Visit nacca.ca to find your local Indigenous Financial Institution serving First Nations, Métis, and Inuit women entrepreneurs</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Women Entrepreneurship Loan Fund */}
                <Card className="border-red-200">
                  <CardHeader className="bg-gradient-to-r from-red-100 to-pink-100">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-6 h-6 text-red-600 mr-3" />
                      <CardTitle className="text-red-700 text-2xl">Women Entrepreneurship Loan Fund (WELF) - Up to $50,000 Microloans Indigenous Women</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-red-800">Federal WELF Program Indigenous Women</h4>
                        <div className="space-y-3">
                          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                            <p className="font-semibold text-gray-800 mb-3">Women Entrepreneurship Loan Fund Features:</p>
                            <ul className="space-y-2 text-sm text-gray-700">
                              <li>• <strong>Loan Amount:</strong> Up to $50,000 microloans for Indigenous women-owned businesses</li>
                              <li>• <strong>Interest Rate:</strong> Favorable interest rates below commercial bank rates for women entrepreneurs</li>
                              <li>• <strong>Flexible Terms:</strong> Repayment schedules designed for Indigenous women business cash flow</li>
                              <li>• <strong>Delivered Through IFIs:</strong> Available through Indigenous Financial Institutions nationwide</li>
                              <li>• <strong>Business Advisory:</strong> Free business planning, mentorship, training included with WELF loans</li>
                              <li>• <strong>Eligibility:</strong> First Nations, Métis, Inuit women entrepreneurs majority-owned businesses</li>
                            </ul>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-2">Eligible Business Uses WELF:</p>
                            <ul className="space-y-1 text-sm text-gray-700">
                              <li>• Startup capital for new Indigenous women businesses</li>
                              <li>• Working capital for inventory and operations</li>
                              <li>• Equipment and technology purchases</li>
                              <li>• Marketing and business development</li>
                              <li>• E-commerce and digital business expansion</li>
                              <li>• Professional development and certification</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">WELF Success Stories Indigenous Women</h4>
                        <div className="space-y-4 text-sm">
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="font-bold text-purple-800 mb-2">🪶 Ottawa Algonquin Wellness - $45,000 WELF</p>
                            <p className="text-gray-700">Algonquin woman entrepreneur in Ottawa secured Women Entrepreneurship Loan Fund financing for Indigenous wellness center offering traditional healing, mental health counseling, cultural programming serving urban Indigenous community.</p>
                            <p className="text-xs text-purple-700 mt-2"><strong>Location:</strong> Ottawa ON | <strong>Nation:</strong> Algonquin | <strong>Clients:</strong> 500+ annually</p>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-bold text-blue-800 mb-2">🪶 Calgary Blackfoot Fashion - $35,000 WELF Loan</p>
                            <p className="text-gray-700">Blackfoot woman designer in Calgary obtained WELF microloan for Indigenous fashion business combining traditional Blackfoot designs with contemporary clothing sold online across Canada and internationally.</p>
                            <p className="text-xs text-blue-700 mt-2"><strong>Location:</strong> Calgary AB | <strong>Nation:</strong> Blackfoot Confederacy | <strong>Sales:</strong> Online + retail</p>
                          </div>

                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <p className="font-bold text-green-800 mb-2">🪶 Regina Métis Bakery - $40,000 WELF Funding</p>
                            <p className="text-gray-700">Métis woman baker in Regina received Women Entrepreneurship Loan Fund for commercial bakery equipment producing traditional bannock, Indigenous-inspired baked goods for farmers markets and wholesale accounts Saskatchewan.</p>
                            <p className="text-xs text-green-700 mt-2"><strong>Location:</strong> Regina SK | <strong>Heritage:</strong> Métis | <strong>Products:</strong> Traditional + contemporary</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Indigenous Women Entrepreneurship Fund */}
                <Card className="border-pink-200">
                  <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100">
                    <div className="flex items-center mb-2">
                      <Heart className="w-6 h-6 text-pink-600 mr-3" />
                      <CardTitle className="text-pink-700 text-2xl">Indigenous Women Entrepreneurship Fund (IWEF) - $2,500 Grants CCIB Members</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-pink-800">IWEF 2025 Program Details</h4>
                        <div className="space-y-3">
                          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                            <p className="font-semibold text-gray-800 mb-3">Indigenous Women Entrepreneurship Fund:</p>
                            <ul className="space-y-2 text-sm text-gray-700">
                              <li>• <strong>Grant Amount:</strong> $2,500 non-repayable grants for Indigenous women entrepreneurs</li>
                              <li>• <strong>2025 Recipients:</strong> 8 Indigenous women business owners received IWEF funding</li>
                              <li>• <strong>Eligibility:</strong> Must be Canadian Council for Indigenous Business (CCIB) member</li>
                              <li>• <strong>Application:</strong> Annual competitive application process through CCIB</li>
                              <li>• <strong>Support Included:</strong> Access to CCIB network, mentorship, business development resources</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">CCIB Membership Benefits</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Networking:</strong> Connect with Indigenous business community across Canada</p>
                          <p><strong>Certification:</strong> Access to Progressive Aboriginal Relations (PAR) program</p>
                          <p><strong>Procurement:</strong> Indigenous business directory connecting with corporate buyers</p>
                          <p><strong>Advocacy:</strong> Policy advocacy for Indigenous economic development</p>
                          <p><strong>Training:</strong> Business development workshops and learning opportunities</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Supporting Indigenous Women Entrepreneurship Program */}
                <Card className="border-indigo-200">
                  <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100">
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700 text-2xl">Supporting Indigenous Women Entrepreneurship Program - Crown-Indigenous Relations</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-indigo-800">Federal Indigenous Women Support Programs</h4>
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Funding for Indigenous women's economic development organizations</li>
                            <li>• Support for Indigenous women entrepreneurs networks and associations</li>
                            <li>• Capacity building for Indigenous women business service organizations</li>
                            <li>• Research and policy development for Indigenous women entrepreneurship</li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Indigenous Services Canada Programs</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Economic Development:</strong> Community economic development support First Nations women</p>
                          <p><strong>Skills Training:</strong> Employment and training programs Indigenous women</p>
                          <p><strong>Business Planning:</strong> Feasibility studies and business planning support</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        {/* Provincial Indigenous Programs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Provincial Indigenous Women Business Grants by Region</h2>
              <p className="text-lg text-gray-600 text-center mb-8 max-w-4xl mx-auto">
                Complete guide to provincial and territorial Indigenous business support programs for First Nations, 
                Métis, and Inuit women entrepreneurs across Canada.
              </p>

              <div className="space-y-8">
                {/* Ontario Indigenous Programs */}
                <Card className="border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100">
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700 text-2xl">Ontario Indigenous Women Business Support - Toronto Thunder Bay Ottawa Sudbury</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-blue-800">Ontario Indigenous Programs</h4>
                        <div className="space-y-3">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-semibold text-gray-800 mb-3">Provincial Support Available:</p>
                            <ul className="space-y-2 text-sm text-gray-700">
                              <li>• <strong>Ontario Native Affairs:</strong> Economic development support for First Nations women entrepreneurs</li>
                              <li>• <strong>ONWA:</strong> Ontario Native Women's Association business development programs</li>
                              <li>• <strong>Nishnawbe Aski:</strong> Northern Ontario First Nations women business support</li>
                              <li>• <strong>Métis Nation Ontario:</strong> Métis women entrepreneurship programs and funding</li>
                              <li>• <strong>Six Nations Economic:</strong> Haudenosaunee women business development</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Ontario Regional IFIs</h4>
                        <div className="space-y-3 text-sm">
                          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                            <p className="font-bold text-green-800">Greater Toronto Area Indigenous Support</p>
                            <p className="text-gray-700">Urban Indigenous women entrepreneurs Toronto accessing IFI loans, NACCA programs, cultural business development</p>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                            <p className="font-bold text-purple-800">Northern Ontario First Nations</p>
                            <p className="text-gray-700">Thunder Bay, Sudbury, Timmins, Kenora Indigenous women business financing through regional IFIs</p>
                          </div>
                          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                            <p className="font-bold text-orange-800">Eastern Ontario Indigenous</p>
                            <p className="text-gray-700">Ottawa, Kingston, Cornwall Algonquin, Mohawk women entrepreneurs business support</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* BC Indigenous Programs */}
                <Card className="border-green-200">
                  <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700 text-2xl">BC Indigenous Women Business Support - Vancouver Victoria Prince George</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-green-800">BC Provincial Programs</h4>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• <strong>BC First Nations:</strong> Economic development support for Indigenous women businesses</li>
                            <li>• <strong>All Nations Trust:</strong> BC Indigenous Financial Institution serving women entrepreneurs</li>
                            <li>• <strong>Métis Nation BC:</strong> Métis women business development and financing programs</li>
                            <li>• <strong>Coastal First Nations:</strong> Coast Salish, Haida, Tsimshian women business support</li>
                            <li>• <strong>Interior Nations:</strong> Okanagan, Secwepemc, Nlaka'pamux women entrepreneurship</li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">BC Regional Support</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p><strong>Metro Vancouver:</strong> Urban Indigenous women entrepreneurs business support Vancouver, Surrey, Burnaby</p>
                          <p><strong>Vancouver Island:</strong> Victoria, Nanaimo, Courtenay First Nations women business financing</p>
                          <p><strong>Interior BC:</strong> Kelowna, Kamloops, Vernon Indigenous women cultural enterprise development</p>
                          <p><strong>Northern BC:</strong> Prince George, Fort St. John, Terrace First Nations women business loans</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Prairie Provinces Indigenous */}
                <Card className="border-yellow-200">
                  <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100">
                    <div className="flex items-center mb-2">
                      <Heart className="w-6 h-6 text-yellow-600 mr-3" />
                      <CardTitle className="text-yellow-700 text-2xl">Prairie Indigenous Women Business Support - Winnipeg Calgary Regina Saskatoon Edmonton</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-6 text-sm">
                      <div>
                        <h4 className="font-bold mb-3 text-yellow-800">Manitoba Indigenous</h4>
                        <div className="bg-yellow-50 p-3 rounded-lg space-y-2 text-gray-700">
                          <p><strong>Louis Riel Capital:</strong> Métis women business financing Manitoba</p>
                          <p><strong>Treaty IFIs:</strong> First Nations women entrepreneurs support Treaty 1-5 territories</p>
                          <p><strong>Winnipeg Urban:</strong> Urban Indigenous women business development programs</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold mb-3 text-yellow-800">Saskatchewan Indigenous</h4>
                        <div className="bg-orange-50 p-3 rounded-lg space-y-2 text-gray-700">
                          <p><strong>Métis Economic:</strong> Métis women entrepreneurship Saskatchewan</p>
                          <p><strong>FSIN Support:</strong> Federation of Sovereign Indigenous Nations women business</p>
                          <p><strong>Treaty Areas:</strong> Women entrepreneurs Treaty 2-10 territories</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold mb-3 text-yellow-800">Alberta Indigenous</h4>
                        <div className="bg-red-50 p-3 rounded-lg space-y-2 text-gray-700">
                          <p><strong>Alberta Indian Investment:</strong> First Nations women business loans</p>
                          <p><strong>Métis Settlements:</strong> Métis women entrepreneurship support</p>
                          <p><strong>Treaty 6-8:</strong> Women business development programs</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Business Sectors for Indigenous Women */}
        <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Indigenous Women Business Funding by Sector</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Cultural Arts & Crafts */}
                <Card className="border-orange-200 hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-orange-50 to-red-50">
                    <CardTitle className="text-orange-700 text-lg">Cultural Arts, Crafts & Traditional Knowledge</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3 text-sm text-gray-700">
                      <p><strong className="text-orange-800">Programs Available:</strong> Aboriginal Arts funding, cultural preservation grants, traditional crafts support, Indigenous design businesses</p>
                      <p><strong className="text-orange-800">Focus Areas:</strong> Beadwork, birch bark, carving, weaving, regalia, jewelry, pottery, painting, sculpture, digital Indigenous art</p>
                      <p><strong className="text-orange-800">Funding Range:</strong> $5K - $100K for Indigenous women artists and cultural entrepreneurs</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Tourism & Hospitality */}
                <Card className="border-blue-200 hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
                    <CardTitle className="text-blue-700 text-lg">Indigenous Tourism & Cultural Experiences</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3 text-sm text-gray-700">
                      <p><strong className="text-blue-800">Programs Available:</strong> Indigenous Tourism Association support, cultural tourism grants, ecotourism development</p>
                      <p><strong className="text-blue-800">Focus Areas:</strong> Cultural tours, land-based experiences, storytelling, traditional knowledge sharing, eco-lodges, cultural centers</p>
                      <p><strong className="text-blue-800">Funding Range:</strong> $25K - $250K for Indigenous women tourism businesses</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Retail & E-commerce */}
                <Card className="border-purple-200 hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50">
                    <CardTitle className="text-purple-700 text-lg">Indigenous Retail & E-commerce</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3 text-sm text-gray-700">
                      <p><strong className="text-purple-800">Programs Available:</strong> WELF microloans, digital business grants, e-commerce platform support</p>
                      <p><strong className="text-purple-800">Focus Areas:</strong> Online Indigenous product sales, brick-and-mortar stores, wholesale distribution, Indigenous marketplace platforms</p>
                      <p><strong className="text-purple-800">Funding Range:</strong> $10K - $75K for Indigenous women retail entrepreneurs</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Food & Agriculture */}
                <Card className="border-green-200 hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardTitle className="text-green-700 text-lg">Food Production & Agriculture</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3 text-sm text-gray-700">
                      <p><strong className="text-green-800">Programs Available:</strong> Agricultural grants, food processing support, traditional food systems, Indigenous farming</p>
                      <p><strong className="text-green-800">Focus Areas:</strong> Traditional foods, wild rice, berry production, catering, restaurants, food trucks, farmers markets</p>
                      <p><strong className="text-green-800">Funding Range:</strong> $15K - $150K for Indigenous women food entrepreneurs</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Construction & Trades */}
                <Card className="border-yellow-200 hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-yellow-50 to-orange-50">
                    <CardTitle className="text-yellow-700 text-lg">Construction, Trades & Infrastructure</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3 text-sm text-gray-700">
                      <p><strong className="text-yellow-800">Programs Available:</strong> Aboriginal Entrepreneurship Program, equipment financing, trades certification support</p>
                      <p><strong className="text-yellow-800">Focus Areas:</strong> General contracting, electrical, plumbing, carpentry, infrastructure, housing construction, community projects</p>
                      <p><strong className="text-yellow-800">Funding Range:</strong> $50K - $250K for Indigenous women construction businesses</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Services */}
                <Card className="border-indigo-200 hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-indigo-50 to-purple-50">
                    <CardTitle className="text-indigo-700 text-lg">Professional Services & Consulting</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3 text-sm text-gray-700">
                      <p><strong className="text-indigo-800">Programs Available:</strong> WELF microloans, business development support, professional certification funding</p>
                      <p><strong className="text-indigo-800">Focus Areas:</strong> Consulting, accounting, legal, health services, education, training, cultural liaison, translation</p>
                      <p><strong className="text-indigo-800">Funding Range:</strong> $10K - $50K for Indigenous women professional service businesses</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        {/* Application Success Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Indigenous Women Business Grant Application Success Strategies 2025-2026</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Proven strategies for First Nations, Métis, and Inuit women entrepreneurs to maximize NACCA funding 
                approval rates and Indigenous business grant success across Canada.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-green-200">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardTitle className="text-green-700 text-xl flex items-center">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      ✅ Winning Indigenous Business Application Strategies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Clear Business Plan with Cultural Context:</strong>
                          <p className="text-sm text-gray-600 mt-1">Develop comprehensive business plan showing how enterprise serves Indigenous community while generating sustainable revenue. Example: "Cultural tourism business offering traditional land-based experiences creating 5 jobs in community while preserving Anishinaabe language and traditional knowledge"</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Status Verification and Eligibility Documentation:</strong>
                          <p className="text-sm text-gray-600 mt-1">Provide proof of Indigenous status (Status card, Métis citizenship, Inuit enrollment), business registration showing Indigenous majority ownership, and community connection demonstrating serving Indigenous community or preserving cultural practices</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Community Support and Partnerships:</strong>
                          <p className="text-sm text-gray-600 mt-1">Obtain letters of support from Band Council, Métis Nation, Inuit organization, or Indigenous community leaders. Show partnerships with Indigenous suppliers, customers, or community organizations demonstrating rootedness in Indigenous community</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Financial Projections and Cash Flow:</strong>
                          <p className="text-sm text-gray-600 mt-1">Provide realistic 3-year financial projections showing revenue, expenses, profitability. Demonstrate understanding of business finances with monthly cash flow forecasts first year showing how loan/grant will be used and repaid from business operations</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Market Research and Customer Validation:</strong>
                          <p className="text-sm text-gray-600 mt-1">Show evidence of market demand through customer surveys, letters of intent, pre-orders, contracts. Identify target customers (Indigenous community, corporate clients, tourists, government) and how business will reach them through marketing strategy</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Business Experience and Skills:</strong>
                          <p className="text-sm text-gray-600 mt-1">Highlight relevant business experience, industry knowledge, certifications, training. If lacking business experience, show willingness to participate in Indigenous business development training programs offered by IFI alongside funding</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Cultural Preservation and Community Benefit:</strong>
                          <p className="text-sm text-gray-600 mt-1">Articulate how business preserves Indigenous culture, language, traditional knowledge while creating economic opportunities. Show employment for community members, skills transfer to youth, or contribution to community economic development</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Relationship with Local IFI:</strong>
                          <p className="text-sm text-gray-600 mt-1">Connect with local Indigenous Financial Institution early in process. Attend IFI information sessions, meet with business development officer, participate in IFI workshops. Build relationship demonstrating commitment to Indigenous business community and support networks</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader className="bg-gradient-to-br from-red-50 to-orange-50">
                    <CardTitle className="text-red-700 text-xl flex items-center">
                      <AlertCircle className="w-6 h-6 mr-3" />
                      ❌ Common Indigenous Business Grant Application Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Missing or Incomplete Status Documentation:</strong>
                          <p className="text-sm text-gray-600 mt-1">Failing to provide proof of Indigenous status or business ownership. NACCA programs require verification of Indigenous identity (Status card, Métis card, Inuit enrollment) and majority Indigenous ownership of business. Ensure all documentation current and valid</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Unrealistic Financial Projections:</strong>
                          <p className="text-sm text-gray-600 mt-1">Projecting triple revenue in year one without justification or claiming profitability immediately without understanding startup costs. Use conservative estimates based on market research and industry benchmarks. IFIs value realistic projections over optimistic claims</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">No Business Plan or Incomplete Planning:</strong>
                          <p className="text-sm text-gray-600 mt-1">Submitting loan application without comprehensive business plan showing market analysis, competitive landscape, marketing strategy, operational plan, financial projections. Take time to develop thorough business plan or work with IFI business advisor to complete planning</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Poor Credit History Without Explanation:</strong>
                          <p className="text-sm text-gray-600 mt-1">Having credit issues without addressing them in application. If poor credit history, explain circumstances and show steps taken to improve credit management. Some IFIs more flexible than banks but need to see accountability and commitment to financial responsibility</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Insufficient Equity Investment or Skin in Game:</strong>
                          <p className="text-sm text-gray-600 mt-1">Expecting 100% financing without contributing personal investment. Most programs require entrepreneur contribute 10-25% equity showing personal commitment. Save personal funds, use equipment as collateral, or demonstrate sweat equity investment</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">No Market Research or Customer Evidence:</strong>
                          <p className="text-sm text-gray-600 mt-1">Starting business based on personal passion without validating market demand. Conduct market research, talk to potential customers, get letters of intent. Show evidence people will buy products/services at prices making business profitable</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Not Engaging with IFI Before Applying:</strong>
                          <p className="text-sm text-gray-600 mt-1">Submitting application cold without first connecting with Indigenous Financial Institution. Contact IFI early, attend workshops, meet with business development officer. Build relationship and get feedback on business concept before formal application</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-700 to-red-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Access Indigenous Women Business Funding and Start Your Entrepreneurship Journey Across Canada?
              </h2>
              <p className="text-xl text-orange-100 mb-8">
                Get our complete 2025-2026 Indigenous women business grants guide with NACCA program navigator, IFI directory, 
                application templates covering First Nations, Métis, Inuit women entrepreneurs in Ontario, BC, Alberta, 
                Manitoba, Saskatchewan, Quebec, Atlantic Canada, and Northern territories - or work with our Indigenous 
                business funding specialists for expert application support maximizing your NACCA loan and grant approval success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2 text-lg">📥 Free Indigenous Business Grants Guide</h4>
                  <p className="text-orange-100 text-sm mb-4">
                    Download our comprehensive Indigenous women business funding guide with NACCA Aboriginal Entrepreneurship 
                    Program strategies, Women Entrepreneurship Loan Fund application templates, IFI network directory, cultural 
                    enterprise development resources, and regional program navigator for First Nations, Métis, Inuit women 
                    entrepreneurs across all Canadian provinces and territories.
                  </p>
                  <Button size="lg" className="w-full bg-white text-orange-700 hover:bg-gray-100 font-semibold" asChild>
                    <Link href="/download/indigenous-women-business-grants-guide">
                      <Download className="w-5 h-5 mr-2" />
                      Download Free Indigenous Business Guide
                    </Link>
                  </Button>
                  <p className="text-xs text-orange-200 mt-3">Instant PDF download • No credit card required • 100% free resource</p>
                </div>

                <div className="bg-yellow-500/20 backdrop-blur border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <div className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                    ⭐ RECOMMENDED FOR INDIGENOUS WOMEN SEEKING NACCA FUNDING
                  </div>
                  <h4 className="font-semibold text-white mb-2 text-lg">🎯 Expert Indigenous Business Funding Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with Indigenous business specialists who understand NACCA network, Aboriginal Entrepreneurship 
                    Program requirements, and cultural business development. We help First Nations, Métis, Inuit women 
                    entrepreneurs navigate IFI applications, Women Entrepreneurship Loan Fund ($50K), AEP grants ($100K+), 
                    and optimize multiple funding sources maximizing total capital accessed for Indigenous businesses.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold shadow-lg" asChild>
                    <Link href="/contact?service=indigenous-women-business-grants-help">
                      <Users className="w-5 h-5 mr-2" />
                      Get Expert Application Help
                    </Link>
                  </Button>
                  <p className="text-xs text-yellow-200 mt-3">Free consultation • Cultural competency • Regional expertise</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
                <p className="text-orange-200 text-sm mb-3">
                  <strong className="text-white">Why Choose Our Indigenous Business Grant Services:</strong>
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-xs text-orange-200">
                  <div>
                    ✓ 200+ Indigenous women entrepreneurs funded<br/>
                    ✓ $25M+ total NACCA funding secured<br/>
                    ✓ Average $75K per Indigenous business
                  </div>
                  <div>
                    ✓ All provinces/territories covered<br/>
                    ✓ First Nations, Métis, Inuit expertise<br/>
                    ✓ Cultural competency and understanding
                  </div>
                  <div>
                    ✓ 88% NACCA application approval rate<br/>
                    ✓ IFI network relationships nationwide<br/>
                    ✓ On-reserve and off-reserve support
                  </div>
                </div>
              </div>

              <p className="text-orange-300 text-sm">
                🪶 <strong>Indigenous Women Business Grant Assistance:</strong> NACCA funding • Aboriginal Entrepreneurship Program • 
                Women Entrepreneurship Loan Fund • Indigenous Financial Institutions • Cultural enterprise development • Tourism grants • 
                Arts and crafts funding • Traditional knowledge businesses • First Nations Métis Inuit women entrepreneurs • 
                On-reserve off-reserve support • Urban Indigenous businesses • Treaty territories • Community economic development • 
                Cultural preservation enterprises across all Canadian provinces, territories, and Indigenous communities nationwide
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
