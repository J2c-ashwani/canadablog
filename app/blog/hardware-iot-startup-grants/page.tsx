import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Heart, Lightbulb, Sparkles, MapPin, Globe, Rocket, ArrowRight, Cpu, Zap, Radio, Layers, Wifi, Cog, HelpCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hardware & IoT Startup Grants 2026-2027 | $305K NSF SBIR, $1.25M Phase II, DOD Electronics Non-Dilutive Funding",
  description: "Complete 2026-2027 guide to hardware and IoT startup grants. NSF SBIR Phase I $305K, Phase II $1.25M, DOD electronics programs, advanced manufacturing funding supporting connected devices, sensors, robotics, semiconductors, edge computing with zero equity.",
  keywords: "hardware startup grants 2026, IoT grants NSF SBIR, electronics funding $305K, connected devices grants, sensor technology funding, robotics grants Phase II, semiconductor startup funding, edge computing grants, advanced manufacturing, DOD electronics programs",
  openGraph: {
    title: "Hardware & IoT Grants 2026 | $305K NSF SBIR + DOD Electronics",
    description: "Complete guide to hardware and IoT startup grants from NSF, DOD, and advanced manufacturing programs.",
    url: "https://www.fsidigital.ca/blog/hardware-iot-startup-grants",
    images: ["/og-image.png"],
  },
}

export default function HardwareIoTStartupGrantsPage() {
  const faqData = [
    {
      question: "Does NSF fund hardware prototypes?",
      answer: "Yes. NSF SBIR specifically encourages high-risk technical R&D. Phase I ($305K) is designed to fund the development and testing of a proof-of-concept prototype."
    },
    {
      question: "What is the '0% equity' requirement?",
      answer: "SBIR/STTR grants are non-dilutive government funding. The agency takes zero equity, zero board seats, and zero IP rights. You retain full ownership of your company."
    },
    {
      question: "Can I use grant money for manufacturing?",
      answer: "Yes, in Phase II. While Phase I is for R&D/prototyping, Phase II awards ($1.25M) can support manufacturing scale-up, Design for Manufacturing (DFM), and pilot production runs."
    },
    {
      question: "Is my IoT device eligible?",
      answer: "It depends. To qualify, your device must involve novel technical innovation (e.g., new sensor capabilities, unique mesh networking, edge AI) rather than just integrating off-the-shelf components."
    },
    {
      question: "How long does the review take?",
      answer: "NSF and DOD reviews typically take 4-6 months. It is a competitive process, but the payoff of non-dilutive capital is substantial for hardware startups."
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
        {/* Clean Hero Section - FIXED CONTRAST */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <Badge className="bg-orange-500 text-white border-orange-600 px-4 py-2 text-sm font-medium">
                  ⚡ Hardware & IoT Grants 2026-2027
                </Badge>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center leading-tight">
                Get Up to $1.555M in<br />Hardware Innovation Funding
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-gray-300 mb-8 text-center max-w-3xl mx-auto font-light">
                NSF SBIR grants for hardware and IoT startups. Zero equity required for connected devices, sensors, robotics, semiconductors, and edge computing innovations.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-10">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-orange-400">$305K</div>
                  <div className="text-sm md:text-base text-gray-400">Phase I Grants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-orange-400">$1.25M</div>
                  <div className="text-sm md:text-base text-gray-400">Phase II Grants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-orange-400">0%</div>
                  <div className="text-sm md:text-base text-gray-400">Equity Required</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-orange-500 text-white hover:bg-orange-600 font-semibold px-8 py-6 text-lg w-full sm:w-auto shadow-xl" asChild>
                  <Link href="#hardware-grants">
                    View Hardware Programs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-orange-500 bg-transparent text-orange-400 hover:bg-orange-500 hover:text-white font-semibold px-8 py-6 text-lg w-full sm:w-auto" asChild>
                  <Link href="/download/hardware-iot-grants-guide">
                    <Download className="mr-2 w-5 h-5" />
                    Free Hardware Guide
                  </Link>
                </Button>
              </div>

              {/* Trust Indicator */}
              <p className="text-center text-gray-400 mt-8 text-sm">
                ✓ IoT-focused funding • ✓ Manufacturing support • ✓ Non-dilutive capital
              </p>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-12 bg-gradient-to-r from-orange-50 to-amber-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About Hardware & IoT Grants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#iot-details" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-orange-500">
                  <h3 className="font-semibold text-orange-700">How much funding can hardware startups get?</h3>
                  <p className="text-sm text-gray-600">$305K Phase I, up to $1.25M Phase II from NSF SBIR</p>
                </a>
                <a href="#phase-2-details" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-amber-500">
                  <h3 className="font-semibold text-amber-700">Can I use grants for manufacturing?</h3>
                  <p className="text-sm text-gray-600">Yes, Phase II covers manufacturing scale-up and DFM</p>
                </a>
                <a href="#dod-details" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-blue-500">
                  <h3 className="font-semibold text-blue-700">Does DOD fund electronics startups?</h3>
                  <p className="text-sm text-gray-600">Yes, up to $1.8M for defense-related hardware</p>
                </a>
                <a href="#faq" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-green-500">
                  <h3 className="font-semibold text-green-700">Do I give up equity for hardware grants?</h3>
                  <p className="text-sm text-gray-600">No, NSF SBIR is 100% non-dilutive funding</p>
                </a>
                <a href="#hardware-grants" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-purple-500">
                  <h3 className="font-semibold text-purple-700">What IoT devices qualify for NSF funding?</h3>
                  <p className="text-sm text-gray-600">Novel sensors, edge computing, robotic</p>
                </a>
                <a href="#faq" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-indigo-500">
                  <h3 className="font-semibold text-indigo-700">How long does review take?</h3>
                  <p className="text-sm text-gray-600">NSF and DOD reviews typically take 4-6 months</p>
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* Quick Overview - Main Programs */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">What Hardware & IoT Grant Programs are Available?</h2>
              <p className="text-lg text-gray-600 text-center mb-10 max-w-3xl mx-auto">
                Federal funding for connected devices, electronics, sensors, robotics, and advanced manufacturing innovations.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {/* NSF SBIR IoT */}
                <Card className="border-2 border-orange-200 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-br from-orange-50 to-amber-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                        <Wifi className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-700">$305,000</div>
                        <div className="text-sm text-gray-600">NSF SBIR Phase I</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">IoT Innovation</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Connected devices & smart systems</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Sensors, actuators, communications</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Industrial IoT & smart cities</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>6-18 months proof-of-concept</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#iot-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* NSF Phase II */}
                <Card className="border-2 border-amber-200 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-br from-amber-50 to-yellow-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mr-3">
                        <Cpu className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-amber-700">$1.25M</div>
                        <div className="text-sm text-gray-600">NSF SBIR Phase II</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">Full Development</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>24 months hardware development</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Manufacturing scale-up support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Product certification assistance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Commercialization readiness</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#phase-2-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* DOD & Manufacturing */}
                <Card className="border-2 border-yellow-200 hover:shadow-xl transition-all hover:-translate-y-1 relative">
                  <div className="absolute -top-3 -right-3 bg-blue-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    DOD PRIORITY
                  </div>
                  <CardHeader className="bg-gradient-to-br from-yellow-50 to-orange-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mr-3">
                        <Cog className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-700">$1.8M</div>
                        <div className="text-sm text-gray-600">DOD Electronics</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">Defense & Manufacturing</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>DOD electronics & defense hardware</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Advanced manufacturing grants</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Semiconductor innovation funding</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>National security applications</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#dod-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Hardware Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Which Hardware Technologies Qualify for Funding?</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                NSF and DOD grants support a wide range of hardware and IoT innovations.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Wifi className="w-8 h-8 text-orange-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">IoT & Connected Devices</h3>
                    <p className="text-sm text-gray-600 mb-3">Smart objects, embedded sensors, wireless communications, edge computing, IoT platforms</p>
                    <p className="text-xs text-orange-700 font-semibold">NSF IoT subtopics</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Zap className="w-8 h-8 text-amber-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Sensors & Actuators</h3>
                    <p className="text-sm text-gray-600 mb-3">Environmental sensors, biosensors, MEMS, actuators, energy harvesting, low-power systems</p>
                    <p className="text-xs text-amber-700 font-semibold">$305K available</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Cpu className="w-8 h-8 text-yellow-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Electronics & Semiconductors</h3>
                    <p className="text-sm text-gray-600 mb-3">Integrated circuits, power electronics, RF systems, analog circuits, chip design</p>
                    <p className="text-xs text-yellow-700 font-semibold">DOD priority area</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Cog className="w-8 h-8 text-orange-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Robotics & Automation</h3>
                    <p className="text-sm text-gray-600 mb-3">Industrial robots, drones, autonomous systems, control systems, human-robot interaction</p>
                    <p className="text-xs text-orange-700 font-semibold">Manufacturing focus</p>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Categories Row */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Radio className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Wireless & Communications</h3>
                    <p className="text-sm text-gray-600 mb-3">5G/6G, mesh networks, LPWAN, satellite comms, wireless power transfer</p>
                    <p className="text-xs text-blue-700 font-semibold">IoT communications</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Layers className="w-8 h-8 text-indigo-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Advanced Materials</h3>
                    <p className="text-sm text-gray-600 mb-3">Smart materials, nanomaterials, flexible electronics, printed electronics, composites</p>
                    <p className="text-xs text-indigo-700 font-semibold">Manufacturing grants</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Shield className="w-8 h-8 text-purple-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Embedded Security</h3>
                    <p className="text-sm text-gray-600 mb-3">Hardware security, secure boot, encryption, trusted execution, supply chain security</p>
                    <p className="text-xs text-purple-700 font-semibold">DOD cybersecurity</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Smart Infrastructure</h3>
                    <p className="text-sm text-gray-600 mb-3">Smart cities, connected homes, industrial IoT, agriculture tech, energy management</p>
                    <p className="text-xs text-green-700 font-semibold">Market verticals</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 2026 Updates */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-8">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-orange-900 mb-2">What&apos;s New in Hardware Funding 2026-2027</h3>
                    <p className="text-gray-700">Recent NSF and DOD investments for hardware and IoT startups</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-5 border border-orange-100">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                      <h4 className="font-bold text-gray-900">Increased Phase Awards</h4>
                    </div>
                    <p className="text-sm text-gray-700">NSF SBIR Phase I now $305K (from $275K), Phase II $1.25M (from $1M). Combined ~$1.555M total non-dilutive funding available.</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-orange-100">
                    <div className="flex items-center mb-2">
                      <Wifi className="w-5 h-5 text-orange-600 mr-2" />
                      <h4 className="font-bold text-gray-900">IoT Topic Emphasis</h4>
                    </div>
                    <p className="text-sm text-gray-700">NSF actively funding IoT communications, integrated systems, sensors/actuators, networking. Success stories like goTenna ($230K mesh networking grant).</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-orange-100">
                    <div className="flex items-center mb-2">
                      <Cog className="w-5 h-5 text-blue-600 mr-2" />
                      <h4 className="font-bold text-gray-900">Manufacturing Support</h4>
                    </div>
                    <p className="text-sm text-gray-700">Advanced manufacturing programs supporting hardware scale-up, production readiness, supply chain optimization, and domestic manufacturing capabilities.</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-orange-100">
                    <div className="flex items-center mb-2">
                      <Shield className="w-5 h-5 text-purple-600 mr-2" />
                      <h4 className="font-bold text-gray-900">DOD Electronics Priority</h4>
                    </div>
                    <p className="text-sm text-gray-700">Department of Defense targeting electronics, semiconductors, secure hardware, resilient systems supporting national security missions with targeted funding topics.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Programs Section */}
        <section id="hardware-grants" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">What are the Specific Details of Hardware Grant Programs?</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Everything you need to know about NSF SBIR for hardware/IoT, DOD electronics programs, and manufacturing grants.
              </p>

              <div className="space-y-8">
                {/* NSF SBIR IoT */}
                <Card id="iot-details" className="border-2 border-orange-200">
                  <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                    <div className="flex items-center mb-2">
                      <Wifi className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700 text-2xl">NSF SBIR Internet of Things (IoT) - $305K Phase I Funding</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-orange-800">Program Overview</h4>
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Phase I Award:</span>
                              <span className="text-orange-700 font-bold text-xl">$305,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Duration:</span>
                              <span className="text-amber-700 font-bold">6-18 months</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Equity Required:</span>
                              <span className="text-green-700 font-bold">0% Non-dilutive</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Focus:</span>
                              <span className="text-blue-700 font-bold">Connected devices</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-800 mb-3">IoT Subtopics:</h5>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                              <Radio className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>IoT Communications:</strong> Wireless protocols, mesh networking, LPWAN, 5G/6G connectivity</span>
                            </li>
                            <li className="flex items-start">
                              <Layers className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Integrated Systems:</strong> Smart objects with embedded sensors, processing, communication capabilities</span>
                            </li>
                            <li className="flex items-start">
                              <Zap className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Sensors & Actuators:</strong> Energy-efficient sensors, advanced actuators, data collection systems</span>
                            </li>
                            <li className="flex items-start">
                              <Globe className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Market Verticals:</strong> Smart cities, transportation, agriculture, industrial IoT, retail IoT</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Hardware Success Stories</h4>
                        <div className="space-y-4">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-2">
                                <Wifi className="w-5 h-5 text-white" />
                              </div>
                              <p className="font-bold text-green-800">goTenna - Mesh Networking</p>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              Awarded $230K NSF SBIR grant with Wesleyan University for LPWAN mesh networking using their LIMA protocol. Developing next-generation IoT networks with improved connectivity, energy efficiency, and throughput.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Mesh IoT</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">LPWAN</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">$230K grant</span>
                            </div>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                                <Cpu className="w-5 h-5 text-white" />
                              </div>
                              <p className="font-bold text-blue-800">Red Balloon Security</p>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              NSF SBIR funded embedded device security provider. NYC-based startup founded 2011, providing fundamental security layer for smart connected infrastructure reducing IoT security risks.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">IoT Security</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Embedded systems</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">NYC startup</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                      <h4 className="font-bold text-lg mb-4 text-orange-800">Application Strategy for Hardware/IoT</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Building className="w-4 h-4 mr-2 text-orange-600" />
                            Eligibility
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• US small business &lt;500 employees</li>
                            <li>• 50%+ US citizen/resident owned</li>
                            <li>• Principal Investigator employed 20+ hrs/week</li>
                            <li>• All work performed in US</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Target className="w-4 h-4 mr-2 text-orange-600" />
                            Technical Focus
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Novel sensor/actuator technology</li>
                            <li>• Advanced IoT communications</li>
                            <li>• Edge computing innovations</li>
                            <li>• Smart system integration</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Lightbulb className="w-4 h-4 mr-2 text-orange-600" />
                            Success Factors
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Working prototype or proof-of-concept</li>
                            <li>• Clear market application</li>
                            <li>• Manufacturing feasibility plan</li>
                            <li>• IP protection strategy</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase II - Shortened for space */}
                <Card id="phase-2-details" className="border-2 border-amber-200">
                  <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100">
                    <div className="flex items-center mb-2">
                      <Cpu className="w-6 h-6 text-amber-600 mr-3" />
                      <CardTitle className="text-amber-700 text-2xl">NSF SBIR Phase II - $1.25M Hardware Development & Manufacturing</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-amber-800">Program Details</h4>
                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-amber-700 font-bold text-xl">$1,250,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Duration:</span>
                              <span className="text-yellow-700 font-bold">24 months</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Requirement:</span>
                              <span className="text-orange-700 font-bold">Successful Phase I</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
                          Phase II supports full hardware development, manufacturing scale-up, product certification (FCC, UL, CE), pilot production runs, and commercialization. Combined Phase I + II provides ~$1.555M total non-dilutive funding.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase II Objectives</h4>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="font-semibold text-gray-800 mb-3">Development Milestones:</p>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                              <Cog className="w-4 h-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Manufacturing:</strong> DFM optimization, supply chain setup, pilot production</span>
                            </li>
                            <li className="flex items-start">
                              <Shield className="w-4 h-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Certification:</strong> FCC, UL, CE, industry-specific compliance testing</span>
                            </li>
                            <li className="flex items-start">
                              <Users className="w-4 h-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Beta Testing:</strong> Customer pilots, field trials, feedback integration</span>
                            </li>
                            <li className="flex items-start">
                              <DollarSign className="w-4 h-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Commercialization:</strong> Sales channels, distribution, pricing strategy</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* DOD & Manufacturing */}
                <Card id="dod-details" className="border-2 border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700 text-2xl">DOD Electronics + Advanced Manufacturing Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-blue-800">DOD SBIR Electronics</h4>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                          <p className="font-semibold text-gray-800 mb-3">Defense Applications:</p>
                          <ul className="text-sm text-gray-700 space-y-2">
                            <li>• Secure electronics & anti-tamper hardware</li>
                            <li>• Radiation-hardened components for space/defense</li>
                            <li>• RF & microwave systems for communications</li>
                            <li>• Power electronics for military platforms</li>
                            <li>• Semiconductor innovations & domestic manufacturing</li>
                            <li>• Ruggedized sensors for harsh environments</li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Manufacturing Support</h4>
                        <div className="space-y-3 text-sm">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <p className="font-semibold text-green-800 mb-2">Advanced Manufacturing Programs</p>
                            <p className="text-gray-700">Federal and state programs supporting hardware scale-up, production equipment, workforce training, and supply chain development.</p>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="font-semibold text-purple-800 mb-2">State Hardware Initiatives</p>
                            <p className="text-gray-700">California, Massachusetts, Texas, Oregon offer manufacturing grants, tax incentives, and hardware incubator programs.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-orange-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
              <div className="grid gap-6">
                {faqData.map((faq, index) => (
                  <Card key={index} className="border-l-4 border-l-orange-500">
                    <CardHeader>
                      <CardTitle className="text-xl text-orange-800 flex items-start">
                        <div className="bg-orange-100 p-2 rounded-full mr-3 mt-0.5">
                          <HelpCircle className="w-5 h-5 text-orange-600" />
                        </div>
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">How to Win Hardware Grants?</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Proven tactics to increase your chances of winning NSF and DOD hardware funding.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-green-200">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardTitle className="text-green-700 text-xl flex items-center">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      What Works for Hardware
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Cpu className="w-5 h-5 text-green-600 mr-2" />
                          Show Working Prototype or POC
                        </h4>
                        <p className="text-sm text-gray-700">
                          Demonstrate technical feasibility with working hardware prototype, even if early stage. NSF reviewers want proof the physics/engineering works before funding scale-up.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Cog className="w-5 h-5 text-green-600 mr-2" />
                          Address Manufacturing Feasibility
                        </h4>
                        <p className="text-sm text-gray-700">
                          Include realistic manufacturing plan with cost targets, supply chain considerations, and path to volume production. Hardware scalability is critical evaluation factor.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Shield className="w-5 h-5 text-green-600 mr-2" />
                          Plan for Certification Requirements
                        </h4>
                        <p className="text-sm text-gray-700">
                          Identify needed certifications (FCC, UL, CE, industry-specific) and include timeline/budget. Shows commercialization readiness and regulatory awareness.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Target className="w-5 h-5 text-green-600 mr-2" />
                          Target Specific Market Vertical
                        </h4>
                        <p className="text-sm text-gray-700">
                          Focus on clear application (industrial IoT, smart cities, agriculture, etc.) rather than general-purpose hardware. Vertical-specific solutions have stronger market validation.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-red-200">
                  <CardHeader className="bg-gradient-to-br from-red-50 to-orange-50">
                    <CardTitle className="text-red-700 text-xl flex items-center">
                      <AlertCircle className="w-6 h-6 mr-3" />
                      Common Hardware Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Underestimating Manufacturing Complexity
                        </h4>
                        <p className="text-sm text-gray-700">
                          Assuming easy transition from prototype to production. Manufacturing hardware at scale requires DFM optimization, supplier qualification, quality systems - plan accordingly.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Ignoring Power & Thermal Constraints
                        </h4>
                        <p className="text-sm text-gray-700">
                          Not addressing power consumption, battery life, thermal management in design. Critical for IoT devices - show you&apos;ve considered real-world operating conditions.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Weak IP Protection Strategy
                        </h4>
                        <p className="text-sm text-gray-700">
                          Hardware is easier to reverse engineer than software. Demonstrate patent strategy, trade secret protection, or other defensible IP approaches.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          No Customer Validation
                        </h4>
                        <p className="text-sm text-gray-700">
                          Building hardware without customer input or letters of intent. Hardware has long development cycles - prove demand exists before requesting manufacturing funding.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">📚 Related Technology Grant Guides</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/sbir-sttr-complete-guide" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-blue-500">
                  <h3 className="font-semibold text-gray-900 mb-2">SBIR/STTR Complete Guide</h3>
                  <p className="text-sm text-gray-600">Everything about federal SBIR programs for startups</p>
                </Link>
                <Link href="/blog/ai-machine-learning-grants" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-purple-500">
                  <h3 className="font-semibold text-gray-900 mb-2">AI & Machine Learning Grants</h3>
                  <p className="text-sm text-gray-600">NSF funding for AI-powered hardware applications</p>
                </Link>
                <Link href="/blog/clean-tech-energy-grants" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">Clean Tech & Energy Grants</h3>
                  <p className="text-sm text-gray-600">DOE funding for energy hardware innovations</p>
                </Link>
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <Link href="/usa/california" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-900">California Hardware Grants →</h3>
                  <p className="text-sm text-gray-600">Silicon Valley hardware incubator programs</p>
                </Link>
                <Link href="/usa/texas" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-900">Texas Manufacturing Grants →</h3>
                  <p className="text-sm text-gray-600">State programs for electronics manufacturing</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA */}
        <section className="py-20 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Apply for Hardware Grants?
              </h2>
              <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
                Download our free hardware grants guide or get personalized help from specialists experienced in IoT and electronics funding.
              </p>

              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Card className="bg-white/10 backdrop-blur border-2 border-white/20 hover:bg-white/15 transition-all">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-white">Free Hardware Guide</h3>
                    <p className="text-orange-100 text-sm mb-6">
                      Comprehensive PDF with NSF SBIR IoT templates, DOD electronics info, manufacturing strategies, and winning examples.
                    </p>
                    <Button size="lg" className="w-full bg-white text-orange-700 hover:bg-orange-50 font-semibold" asChild>
                      <Link href="/download/hardware-iot-grants-guide">
                        Download Now (Free)
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-500/20 backdrop-blur border-2 border-yellow-400 hover:bg-yellow-500/25 transition-all">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-gray-900" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-white">Expert Hardware Support</h3>
                    <p className="text-yellow-100 text-sm mb-6">
                      Work with specialists who&apos;ve helped hardware startups win NSF grants, navigate manufacturing, and scale production.
                    </p>
                    <Button size="lg" className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold" asChild>
                      <Link href="/contact?service=hardware-grants-help">
                        Get Expert Help
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <p className="text-orange-200 mt-8 text-sm">
                ✓ IoT-focused funding • ✓ Manufacturing support • ✓ Zero equity required
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
