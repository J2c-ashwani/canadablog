import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, Download, Heart, Pill, Microscope, Dna, Stethoscope, Syringe } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Life Sciences Grants 2026 | $720M+ Biotech & Medical Device Funding | Clinical Trials Support",
  description: "Complete guide to Canadian life sciences innovation grants. Access $720M+ funding through biomanufacturing programs, medical device pathways, clinical trials support, and 18+ biotechnology funding programs.",
  keywords: "Canada life sciences grants, biotechnology funding Canada, medical device grants, clinical trials funding Canada, biomanufacturing support, drug development grants, health technology funding, pharmaceutical grants Canada",
  openGraph: {
    title: "Canada Life Sciences Grants 2026 | $720M+ Biotech & Medical Device Funding",
    description: "Access $720M+ in life sciences funding. Complete guide to biotechnology grants, medical device funding, and clinical trials support.",
    url: "https://www.fsidigital.ca/blog/canada-life-sciences-innovation-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function CanadaLifeSciencesInnovationGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🧬 Life Sciences Innovation Grants
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Life Sciences Innovation Grants 2026
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Access $720M+ in life sciences and biotechnology funding through 18+ federal and provincial programs. 
                From biomanufacturing support to medical device pathways - accelerate your drug development, 
                clinical trials, health technology, and pharmaceutical innovation initiatives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    Explore Life Sciences Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/innovation-grants">
                    Back to Innovation Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Life Sciences Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">$720M+</div>
                  <div className="text-gray-600">Life Sciences Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-600 mb-2">18+</div>
                  <div className="text-gray-600">Active Biotech Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$10M</div>
                  <div className="text-gray-600">Max Clinical Trials Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">60%</div>
                  <div className="text-gray-600">Typical Cost Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Life Sciences Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Life Sciences & Biotechnology Programs</h2>
              
              <div className="space-y-8">
                {/* IRAP Life Sciences */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Microscope className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">IRAP Life Sciences & Biotechnology Innovation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $500K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Biotech R&D</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Non-Repayable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      IRAP funding specifically for life sciences SMEs developing innovative biotechnology solutions, 
                      medical devices, diagnostics, therapeutics, and health technology applications.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Life Sciences Projects:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Drug discovery and development</li>
                          <li>• Medical device prototypes</li>
                          <li>• Diagnostic technology development</li>
                          <li>• Biomanufacturing process innovation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Support:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 60-80% of eligible R&D costs</li>
                          <li>• Industrial Technology Advisor support</li>
                          <li>• Access to research networks</li>
                          <li>• Commercialization guidance</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Clinical Trials Funding */}
                <Card className="border-cyan-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Syringe className="w-6 h-6 text-cyan-600 mr-3" />
                      <CardTitle className="text-cyan-700">Clinical Trials & Health Research Funding</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $10M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Clinical Studies</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Phase I-IV</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Support for clinical trials through CIHR, provincial health research programs, and specialized 
                      funding for drug trials, medical device testing, and health technology validation studies.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Clinical Trial Types:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Phase I safety studies</li>
                          <li>• Phase II efficacy trials</li>
                          <li>• Phase III confirmatory trials</li>
                          <li>• Phase IV post-market surveillance</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Coverage:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Patient recruitment costs</li>
                          <li>• Clinical site management</li>
                          <li>• Data collection and analysis</li>
                          <li>• Regulatory submission support</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Medical Device Pathways */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Stethoscope className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Medical Device Development & Regulatory Pathways</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $3M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Device Innovation</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Class I-IV</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Specialized funding for medical device companies through design, prototyping, testing, 
                      regulatory approval (Health Canada), and commercialization stages.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Medical Device Categories:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Diagnostic imaging devices</li>
                          <li>• Surgical instruments and implants</li>
                          <li>• Monitoring and wearable devices</li>
                          <li>• Therapeutic medical equipment</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Regulatory Support:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Health Canada MDEL submission</li>
                          <li>• FDA regulatory pathway guidance</li>
                          <li>• CE marking for EU markets</li>
                          <li>• Quality management system (ISO 13485)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Biomanufacturing Support */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Dna className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Biomanufacturing & Scale-Up Funding</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $20M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Manufacturing</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>GMP Facilities</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Strategic support for biomanufacturing facilities, scale-up operations, GMP manufacturing, 
                      and pharmaceutical production capacity through federal and provincial programs.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Biomanufacturing Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Biologics production facilities</li>
                          <li>• Cell and gene therapy manufacturing</li>
                          <li>• Vaccine production capacity</li>
                          <li>• API (Active Pharmaceutical Ingredient)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Scale-Up Support:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• GMP facility construction/upgrade</li>
                          <li>• Manufacturing equipment acquisition</li>
                          <li>• Process validation and optimization</li>
                          <li>• Quality assurance systems</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Life Sciences by Sector */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Life Sciences Funding by Sector</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Pill className="w-8 h-8 text-teal-600" />,
                    title: "Drug Development",
                    funding: "$280M+",
                    programs: "8+ Programs",
                    features: ["Small molecule drugs", "Biologics & antibodies", "Drug repurposing"]
                  },
                  {
                    icon: <Microscope className="w-8 h-8 text-cyan-600" />,
                    title: "Diagnostics",
                    funding: "$150M+",
                    programs: "6+ Programs",
                    features: ["In vitro diagnostics", "Molecular diagnostics", "Point-of-care testing"]
                  },
                  {
                    icon: <Stethoscope className="w-8 h-8 text-blue-600" />,
                    title: "Medical Devices",
                    funding: "$190M+",
                    programs: "7+ Programs",
                    features: ["Surgical devices", "Imaging equipment", "Wearable health tech"]
                  },
                  {
                    icon: <Dna className="w-8 h-8 text-green-600" />,
                    title: "Cell & Gene Therapy",
                    funding: "$220M+",
                    programs: "5+ Programs",
                    features: ["CAR-T cell therapy", "Gene editing (CRISPR)", "Regenerative medicine"]
                  },
                  {
                    icon: <Heart className="w-8 h-8 text-red-600" />,
                    title: "Digital Health",
                    funding: "$130M+",
                    programs: "9+ Programs",
                    features: ["Telemedicine platforms", "Health AI & analytics", "Remote patient monitoring"]
                  },
                  {
                    icon: <Syringe className="w-8 h-8 text-purple-600" />,
                    title: "Vaccines & Immunotherapy",
                    funding: "$180M+",
                    programs: "6+ Programs",
                    features: ["Vaccine development", "Cancer immunotherapy", "mRNA technology"]
                  }
                ].map((sector, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all border-gray-200">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        {sector.icon}
                        <Badge variant="outline" className="text-xs">
                          {sector.programs}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{sector.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900 mb-2">{sector.funding}</div>
                      <div className="text-sm text-gray-500 mb-4">Available Funding</div>
                      <div className="space-y-2">
                        {sector.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Provincial Life Sciences Support */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Provincial Life Sciences Programs</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-teal-700">🍁 Leading Provincial Programs:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Ontario Life Sciences:</strong> $280M for biotech and medical device innovation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Quebec Biopharma Hub:</strong> $190M for drug development and manufacturing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>BC Life Sciences:</strong> $150M for health technology and diagnostics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Alberta Health Innovation:</strong> $95M for medical device and digital health</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-cyan-700">🎯 Priority Life Sciences Areas:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Precision Medicine:</strong> Personalized treatments and genomics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Oncology:</strong> Cancer therapeutics and diagnostics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Rare Diseases:</strong> Orphan drug development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Digital Therapeutics:</strong> Software-based medical interventions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Tips */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Life Sciences Funding Success Strategies</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Strong Clinical Evidence:</strong> Demonstrate safety, efficacy data, and regulatory pathway
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Regulatory Strategy:</strong> Clear Health Canada, FDA approval plan with timelines
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>IP Protection:</strong> Patent strategy and freedom-to-operate analysis
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Market Access:</strong> Reimbursement strategy and commercialization partnerships
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">❌ Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Weak Clinical Data:</strong> Insufficient preclinical or clinical trial evidence
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Unclear Regulatory Path:</strong> No clear strategy for Health Canada or FDA approval
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>IP Vulnerabilities:</strong> Weak patent protection or infringement risks
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>No Commercialization Plan:</strong> Unclear path to market or revenue generation
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA */}
        <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Life Sciences Funding?
              </h2>
              <p className="text-xl text-teal-100 mb-8">
                Get our complete life sciences funding guide or work with specialists who have secured 
                $95M+ in biotechnology grants across IRAP, clinical trials, and medical device programs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Complete Application Guide</h4>
                  <p className="text-teal-100 text-sm mb-4">
                    Get our step-by-step life sciences funding guide with clinical trials templates, medical device regulatory tools, and biomanufacturing strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-teal-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/canada-life-sciences-funding-guide">
                      <Download className="w-4 h-4 mr-2" />
                      View Application Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Biotech Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with life sciences funding specialists who have secured $95M+ with 76% success rate across biotech and medical device programs.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=lifesciences-expert-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-teal-200 text-sm mt-6">
                76% success rate • $95M+ secured • IRAP, Clinical Trials & Medical Device expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
