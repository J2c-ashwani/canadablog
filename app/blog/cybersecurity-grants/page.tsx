import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Heart, Lightbulb, Sparkles, MapPin, Globe, Rocket, ArrowRight, Lock, Eye, Server, Database, Zap, AlertTriangle, HelpCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { getBlogPostBySlug } from '@/lib/data/blogPosts'
import EEATBadge from '@/components/blog/EEATBadge'
import LastVerifiedBadge from '@/components/blog/LastVerifiedBadge'
import { GrantSuccessTable } from '@/components/blog/GrantSuccessTable'
import { ExpertTipBox } from '@/components/blog/ExpertTipBox'
import EligibleCheck from '@/components/blog/EligibleCheck'
import ShortAnswerBox from '@/components/blog/ShortAnswerBox'
import InlineCTA from '@/components/blog/InlineCTA'
import AdSlot from '@/components/blog/AdSlot';

export const metadata: Metadata = {
  title: "Cybersecurity Grants 2026-2027 | $1.8M DOD SBIR, DHS Cyber Funding, NSA Research Programs Non-Dilutive",
  description: "Complete 2026-2027 guide to cybersecurity grants. DOD SBIR Phase I $200K-$400K, Phase II $1.8M, DHS cybersecurity funding, NSA research programs supporting security software, encryption, threat detection, zero-trust, cloud security with zero equity.",
  keywords: "cybersecurity grants 2026, security software funding DOD SBIR, encryption grants DHS, threat detection funding Phase II, zero-trust architecture grants, cloud security funding NSA, penetration testing grants, incident response funding",
  openGraph: {
    title: "Cybersecurity Grants 2026 | $1.8M DOD SBIR + DHS Cyber Funding",
    description: "Complete guide to cybersecurity grants from DOD, DHS, NSA, and defense programs.",
    url: "https://www.fsidigital.ca/blog/cybersecurity-grants",
    images: ["/og-image.png"],
  },
}

export default function CybersecurityGrantsPage() {
  // EEAT Data from blogPosts.ts
  const postData = getBlogPostBySlug("cybersecurity-grants");
  const iconMap: Record<string, any> = { DollarSign, Target, TrendingUp, Users, Award, Shield, CheckCircle, Zap, MapPin, Rocket, FileText, Percent: Target, Flag: Target, Gift: Target };

  const faqData = [
    {
      question: "What cybersecurity topics does DOD fund?",
      answer: "DOD funds high-priority defense areas including zero-trust architecture, automated threat detection, quantum-resistant cryptography, and secure 5G/NextG communications."
    },
    {
      question: "How much funding can I get?",
      answer: "Phase I awards are typically $200K-$400K for 6-12 months. Successful projects can compete for Phase II awards up to $1.8M, with potential for $30M+ in Phase III contracts."
    },
    {
      question: "Is a security clearance required?",
      answer: "Not usually for Phase I. However, you must be a US-owned small business. Phase II or III work involving classified data will require appropriate facility and personnel clearances."
    },
    {
      question: "Can I use funding for CMMC compliance?",
      answer: "Yes. SBIR/STTR funds can often be used for TABA (Technical and Business Assistance) to cover costs related to cybersecurity compliance like CMMC and FedRAMP readiness."
    },
    {
      question: "Does DHS fund commercial startups?",
      answer: "Yes. DHS S&T SBIR seeks 'dual-use' technologies—innovations that serve homeland security needs (like airport security or disaster response) but also have viable commercial markets."
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
      {/* Header Ad */}
      <div className="container mx-auto px-4 py-4">
        <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_HEADER_AD!} adFormat="horizontal" className="mb-6" style={{ minHeight: '90px' }} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Clean Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <Badge className="bg-blue-500 text-white border-blue-600 px-4 py-2 text-sm font-medium">
                  🔒 Cybersecurity Grants 2026-2027
                </Badge>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center leading-tight">
                Get Up to $1.8M in<br />Cybersecurity Funding
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-blue-100 mb-8 text-center max-w-3xl mx-auto font-light">
                DOD and DHS SBIR grants for cybersecurity startups. Zero equity required for security software, encryption, threat detection, zero-trust, and cloud security innovations.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-10">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-blue-400">$400K</div>
                  <div className="text-sm md:text-base text-gray-300">Phase I Maximum</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-blue-400">$1.8M</div>
                  <div className="text-sm md:text-base text-gray-300">Phase II Maximum</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-blue-400">106</div>
                  <div className="text-sm md:text-base text-gray-300">DOD Topics 2026</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-blue-500 text-white hover:bg-blue-600 font-semibold px-8 py-6 text-lg w-full sm:w-auto shadow-xl" asChild>
                  <Link href="#cybersecurity-grants">
                    View Cyber Programs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-blue-500 bg-transparent text-blue-300 hover:bg-blue-500 hover:text-white font-semibold px-8 py-6 text-lg w-full sm:w-auto" asChild>
                  <Link href="/download/cybersecurity-grants-guide">
                    <Download className="mr-2 w-5 h-5" />
                    Free Cyber Guide
                  </Link>
                </Button>
              </div>

              {/* Trust Indicator */}
              <p className="text-center text-gray-300 mt-8 text-sm">
                ✓ National security priority • ✓ Fast-track opportunities • ✓ Non-dilutive capital
              </p>
            </div>
          </div>
        </section>

        {/* EEAT ENRICHMENT COMPONENTS */}
        {postData?.shortAnswer && (
          <section className="py-6 bg-emerald-50 dark:bg-emerald-950/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-emerald-200">
                <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
                  <span className="font-bold text-emerald-700">The Short Answer: </span>
                  {postData.shortAnswer}
                </p>
              </div>
            </div>
          </section>
        )}

        {postData?.eligibleCheck && (
          <section className="py-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <EligibleCheck />
              </div>
            </div>
          </section>
        )}

        {postData?.metrics && (
          <section className="py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <GrantSuccessTable
                  title="Quick Funding Facts"
                  metrics={postData.metrics.map((m: any) => {
                    const IconComponent = (m.iconName && iconMap[m.iconName]) ? iconMap[m.iconName] : Target;
                    return { ...m, icon: <IconComponent className="w-6 h-6" /> };
                  })}
                />
              </div>
            </div>
          </section>
        )}

        {postData?.expertTip && (
          <section className="py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <ExpertTipBox type={postData.expertTip.type} title={postData.expertTip.title}>
                  <div dangerouslySetInnerHTML={{ __html: postData.expertTip.content }} />
                </ExpertTipBox>
              </div>
            </div>
          </section>
        )}

        <section className="py-2">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date={postData?.date || "2025-12-01"} />
            </div>
          </div>
        </section>

        {/* In-Content Horizontal Ad */}
        <div className="container mx-auto px-4 py-4">
          <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_HORIZONTAL!} adFormat="horizontal" style={{ minHeight: '120px', width: '100%' }} />
        </div>



        {/* Common Questions Section */}
        <section className="py-12 bg-gradient-to-r from-slate-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About Cybersecurity Grants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#dod-cyber-details" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-blue-500">
                  <h3 className="font-semibold text-blue-700">How much funding can cybersecurity startups get?</h3>
                  <p className="text-sm text-gray-600">$400K Phase I, up to $1.8M Phase II from DOD SBIR</p>
                </a>
                <a href="#phase-2-details" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-indigo-500">
                  <h3 className="font-semibold text-indigo-700">What are DOD Phase III contracts worth?</h3>
                  <p className="text-sm text-gray-600">Up to $30M for defense deployment after Phase II success</p>
                </a>
                <a href="#dhs-nsa-details" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-purple-500">
                  <h3 className="font-semibold text-purple-700">Does DHS fund cybersecurity startups?</h3>
                  <p className="text-sm text-gray-600">Yes, DHS SBIR focuses on critical infrastructure protection</p>
                </a>
                <a href="#faq" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-green-500">
                  <h3 className="font-semibold text-green-700">Do I need a security clearance?</h3>
                  <p className="text-sm text-gray-600">Not usually for Phase I, may be required for Phase II/III</p>
                </a>
                <a href="#cybersecurity-grants" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-orange-500">
                  <h3 className="font-semibold text-orange-700">What cybersecurity topics qualify?</h3>
                  <p className="text-sm text-gray-600">Zero-trust, threat detection, encryption, cloud security</p>
                </a>
                <a href="#faq" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-red-500">
                  <h3 className="font-semibold text-red-700">Can grants cover CMMC compliance?</h3>
                  <p className="text-sm text-gray-600">Yes, through TABA assistance for compliance preparation</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Overview - Main Programs */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">What Cybersecurity Grant Programs are Available?</h2>
              <p className="text-lg text-gray-600 text-center mb-10 max-w-3xl mx-auto">
                Federal funding for security software, encryption, threat detection, zero-trust architecture, and defense cyber innovations.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {/* DOD SBIR Cyber */}
                <Card className="border-2 border-blue-200 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-700">$400,000</div>
                        <div className="text-sm text-gray-600">DOD SBIR Phase I</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">Defense Cyber Security</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Zero-trust architecture & identity</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Threat detection & incident response</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Encryption & secure communications</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>106 topics DOD 25.2 solicitation</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#dod-cyber-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* DOD Phase II */}
                <Card className="border-2 border-indigo-200 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-br from-indigo-50 to-purple-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-indigo-700">$1.8M</div>
                        <div className="text-sm text-gray-600">DOD SBIR Phase II</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">Full Development</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>24 months security solution development</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Authority to Operate (ATO) support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>FedRAMP & CMMC preparation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Phase III transition to $30M</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#phase-2-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* DHS & NSA */}
                <Card className="border-2 border-purple-200 hover:shadow-xl transition-all hover:-translate-y-1 relative">
                  <div className="absolute -top-3 -right-3 bg-red-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    CRITICAL INFRA
                  </div>
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-700">$200K+</div>
                        <div className="text-sm text-gray-600">DHS & NSA Programs</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">Homeland Security</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>DHS SBIR cybersecurity topics</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Critical infrastructure protection</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>NSA research partnerships available</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>CISA coordination opportunities</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#dhs-nsa-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Cybersecurity Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Which Cybersecurity Technologies Qualify for Funding?</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                DOD, DHS, and NSA grants support a wide range of security and encryption innovations.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Shield className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Zero-Trust Architecture</h3>
                    <p className="text-sm text-gray-600 mb-3">Identity & access management, microsegmentation, policy enforcement, ZTNA, continuous verification</p>
                    <p className="text-xs text-blue-700 font-semibold">DOD priority area</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Eye className="w-8 h-8 text-indigo-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Threat Detection & Response</h3>
                    <p className="text-sm text-gray-600 mb-3">SIEM, XDR, EDR, threat intelligence, anomaly detection, incident response automation</p>
                    <p className="text-xs text-indigo-700 font-semibold">$400K available</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Lock className="w-8 h-8 text-purple-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Encryption & Cryptography</h3>
                    <p className="text-sm text-gray-600 mb-3">Post-quantum crypto, homomorphic encryption, secure multiparty computation, key management</p>
                    <p className="text-xs text-purple-700 font-semibold">NSA research focus</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-pink-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Server className="w-8 h-8 text-pink-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Cloud & Network Security</h3>
                    <p className="text-sm text-gray-600 mb-3">CASB, SASE, SD-WAN security, cloud workload protection, container security, API security</p>
                    <p className="text-xs text-pink-700 font-semibold">FedRAMP eligible</p>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Categories Row */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <Card className="border-l-4 border-l-cyan-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Database className="w-8 h-8 text-cyan-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Data Security & Privacy</h3>
                    <p className="text-sm text-gray-600 mb-3">DLP, data classification, tokenization, privacy-enhancing tech, secure data sharing</p>
                    <p className="text-xs text-cyan-700 font-semibold">CMMC compliance</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <AlertTriangle className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Vulnerability Management</h3>
                    <p className="text-sm text-gray-600 mb-3">Pen testing automation, vulnerability scanning, patch management, security orchestration</p>
                    <p className="text-xs text-green-700 font-semibold">Continuous monitoring</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Zap className="w-8 h-8 text-orange-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Application Security</h3>
                    <p className="text-sm text-gray-600 mb-3">SAST, DAST, SCA, runtime protection, DevSecOps tools, software supply chain security</p>
                    <p className="text-xs text-orange-700 font-semibold">CI/CD integration</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Building className="w-8 h-8 text-red-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">OT & IoT Security</h3>
                    <p className="text-sm text-gray-600 mb-3">Industrial control systems, SCADA security, IoT device security, critical infrastructure protection</p>
                    <p className="text-xs text-red-700 font-semibold">DHS priority</p>
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
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-2">What&apos;s New in Cybersecurity Funding 2026-2027</h3>
                    <p className="text-gray-700">Recent DOD and DHS investments for cybersecurity entrepreneurs</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-5 border border-blue-100">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                      <h4 className="font-bold text-gray-900">DOD 25.2: 106 Topics Released</h4>
                    </div>
                    <p className="text-sm text-gray-700">Department of Defense pre-released 106 new SBIR topics (May 21, 2026 deadline) with up to $2M combined Phase I+II funding for cybersecurity across Air Force, Army, Navy, DARPA.</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-blue-100">
                    <div className="flex items-center mb-2">
                      <Shield className="w-5 h-5 text-blue-600 mr-2" />
                      <h4 className="font-bold text-gray-900">Phase III Expansion to $30M</h4>
                    </div>
                    <p className="text-sm text-gray-700">INNOVATE Act proposes formal Phase III awards at DOD (up to $30M + private match) helping SBIR Phase II cybersecurity awardees transition into defense market with acquisition strategy.</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-blue-100">
                    <div className="flex items-center mb-2">
                      <Eye className="w-5 h-5 text-purple-600 mr-2" />
                      <h4 className="font-bold text-gray-900">DHS FY25 Cyber Topics</h4>
                    </div>
                    <p className="text-sm text-gray-700">DHS SBIR FY25 solicitation includes cybersecurity topics supporting CISA, TSA, Coast Guard, CBP. Focus on critical infrastructure protection, threat detection, secure systems for homeland security.</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-blue-100">
                    <div className="flex items-center mb-2">
                      <Rocket className="w-5 h-5 text-indigo-600 mr-2" />
                      <h4 className="font-bold text-gray-900">Zero-Trust Mandate Priority</h4>
                    </div>
                    <p className="text-sm text-gray-700">Federal zero-trust architecture mandate drives demand for identity management, microsegmentation, continuous monitoring, and ZTNA solutions. DOD and civilian agencies actively funding innovations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Programs Section */}
        <section id="cybersecurity-grants" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">What are the Specific Details of Cybersecurity Grants?</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Everything you need to know about DOD SBIR cyber programs, DHS homeland security funding, and NSA research partnerships.
              </p>

              <div className="space-y-8">
                {/* DOD SBIR Cyber */}
                <Card id="dod-cyber-details" className="border-2 border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700 text-2xl">DOD SBIR Cybersecurity - $400K Phase I, $1.8M Phase II</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-blue-800">Program Overview</h4>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Phase I Award:</span>
                              <span className="text-blue-700 font-bold text-xl">Up to $400K</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Phase II Award:</span>
                              <span className="text-indigo-700 font-bold text-xl">Up to $1.8M</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Phase III:</span>
                              <span className="text-purple-700 font-bold">Up to $30M</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">2026 Topics:</span>
                              <span className="text-green-700 font-bold">106 available</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-800 mb-3">DOD Cyber Focus Areas:</h5>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                              <Shield className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Zero-Trust:</strong> Identity management, ZTNA, microsegmentation, continuous verification</span>
                            </li>
                            <li className="flex items-start">
                              <Eye className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Threat Detection:</strong> AI/ML for anomaly detection, APT hunting, insider threat prevention</span>
                            </li>
                            <li className="flex items-start">
                              <Lock className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Encryption:</strong> Post-quantum cryptography, secure communications, key management</span>
                            </li>
                            <li className="flex items-start">
                              <Server className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Cloud Security:</strong> Multi-cloud security, container protection, serverless security</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Cyber Success Stories</h4>
                        <div className="space-y-4">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-2">
                                <Shield className="w-5 h-5 text-white" />
                              </div>
                              <p className="font-bold text-green-800">Zero-Trust Platform</p>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              $400K Phase I → developed AI-powered microsegmentation platform → validated with DOD pilot → $1.8M Phase II for production deployment → Phase III contract $15M → now securing 50+ federal agencies.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">$15M Phase III</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">50 agencies</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">FedRAMP High</span>
                            </div>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                                <Eye className="w-5 h-5 text-white" />
                              </div>
                              <p className="font-bold text-blue-800">Threat Intelligence AI</p>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              $350K Phase I → built ML-based threat detection for critical infrastructure → Navy pilot program success → $1.6M Phase II development → commercial launch → $40M Series B → protecting critical infrastructure nationwide.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">$40M Series B</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Navy contract</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Critical infra</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                      <h4 className="font-bold text-lg mb-4 text-blue-800">Application Strategy for Cybersecurity</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Building className="w-4 h-4 mr-2 text-blue-600" />
                            Eligibility
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• US small business &lt;500 employees</li>
                            <li>• Security clearance helpful but not required</li>
                            <li>• CMMC compliance for DOD work</li>
                            <li>• US-based development required</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Target className="w-4 h-4 mr-2 text-blue-600" />
                            Technical Focus
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Novel threat detection algorithms</li>
                            <li>• Zero-trust architecture innovations</li>
                            <li>• Post-quantum cryptography</li>
                            <li>• AI/ML security applications</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Lightbulb className="w-4 h-4 mr-2 text-blue-600" />
                            Success Factors
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Proof-of-concept demo or pilot</li>
                            <li>• Clear defense application</li>
                            <li>• FedRAMP or ATO pathway</li>
                            <li>• Dual-use commercial potential</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase II */}
                <Card id="phase-2-details" className="border-2 border-indigo-200">
                  <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100">
                    <div className="flex items-center mb-2">
                      <Lock className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700 text-2xl">DOD SBIR Phase II - $1.8M Security Solution Development</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-indigo-800">Program Details</h4>
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 mb-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-indigo-700 font-bold text-xl">$1,800,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Duration:</span>
                              <span className="text-purple-700 font-bold">24 months</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Requirement:</span>
                              <span className="text-blue-700 font-bold">Successful Phase I</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
                          Phase II supports full cybersecurity solution development, penetration testing, ATO preparation, FedRAMP certification, and defense deployment. Phase III transition can reach $30M for operational deployment across DOD.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase II Objectives</h4>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="font-semibold text-gray-800 mb-3">Development Milestones:</p>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                              <Shield className="w-4 h-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Security Testing:</strong> Penetration testing, red team exercises, vulnerability assessments</span>
                            </li>
                            <li className="flex items-start">
                              <FileText className="w-4 h-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Compliance:</strong> FedRAMP, CMMC, ATO documentation, NIST controls implementation</span>
                            </li>
                            <li className="flex items-start">
                              <Users className="w-4 h-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Pilot Deployment:</strong> DOD agency pilots, operational validation, user feedback</span>
                            </li>
                            <li className="flex items-start">
                              <Rocket className="w-4 h-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Phase III Prep:</strong> Acquisition strategy, production readiness, scaling plans</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* DHS & NSA */}
                <Card id="dhs-nsa-details" className="border-2 border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                    <div className="flex items-center mb-2">
                      <Eye className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700 text-2xl">DHS Cybersecurity + NSA Research Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-purple-800">DHS SBIR Cybersecurity</h4>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                          <p className="font-semibold text-gray-800 mb-3">DHS Cyber Focus Areas:</p>
                          <ul className="text-sm text-gray-700 space-y-2">
                            <li>• Critical infrastructure protection (CISA coordination)</li>
                            <li>• Border security & immigration systems cybersecurity</li>
                            <li>• Transportation security (TSA, aviation, maritime)</li>
                            <li>• Emergency response communication security</li>
                            <li>• Cyber threat intelligence & information sharing</li>
                            <li>• Industrial control system (ICS/SCADA) security</li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">NSA Research Programs</h4>
                        <div className="space-y-3 text-sm">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-semibold text-blue-800 mb-2">NSA Research Directorate</p>
                            <p className="text-gray-700">Post-quantum cryptography, quantum key distribution, secure communications, cryptanalysis, side-channel analysis research partnerships available.</p>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <p className="font-semibold text-green-800 mb-2">Commercial Solutions for Classified (CSfC)</p>
                            <p className="text-gray-700">Program enabling commercial security products for classified use. Layered security approach using NSA-approved components for national security systems.</p>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <p className="font-semibold text-orange-800 mb-2">Academic & Industry Partnerships</p>
                            <p className="text-gray-700">NSA collaborations with universities and private sector on advanced cryptography, AI security, hardware security, and emerging threats research.</p>
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
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
              <div className="grid gap-6">
                {faqData.map((faq, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-600">
                    <CardHeader>
                      <CardTitle className="text-xl text-blue-800 flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full mr-3 mt-0.5">
                          <HelpCircle className="w-5 h-5 text-blue-600" />
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">How to Win Cybersecurity Grants?</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Proven tactics to increase your chances of winning DOD and DHS cybersecurity funding.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-green-200">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardTitle className="text-green-700 text-xl flex items-center">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      What Works for Cybersecurity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Shield className="w-5 h-5 text-green-600 mr-2" />
                          Demonstrate POC with Defense Relevance
                        </h4>
                        <p className="text-sm text-gray-700">
                          Show working prototype or pilot deployment addressing specific DOD/DHS operational challenge. Use defense terminology and cite relevant directives (e.g., DOD Zero Trust Strategy).
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Lock className="w-5 h-5 text-green-600 mr-2" />
                          Plan Compliance Pathway Early
                        </h4>
                        <p className="text-sm text-gray-700">
                          Address FedRAMP, CMMC, ATO requirements in proposal. Show understanding of NIST controls, security documentation needs, and timeline for achieving required certifications.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Eye className="w-5 h-5 text-green-600 mr-2" />
                          Highlight Dual-Use Potential
                        </h4>
                        <p className="text-sm text-gray-700">
                          Demonstrate both government and commercial applicability. Dual-use technologies have stronger commercialization potential and broaden market opportunity beyond defense contracts.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Users className="w-5 h-5 text-green-600 mr-2" />
                          Build Government Customer Relationships
                        </h4>
                        <p className="text-sm text-gray-700">
                          Engage with DOD/DHS program offices early. Attend SBIR matchmaking events, present at defense conferences, and establish relationships with potential government customers.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-red-200">
                  <CardHeader className="bg-gradient-to-br from-red-50 to-orange-50">
                    <CardTitle className="text-red-700 text-xl flex items-center">
                      <AlertCircle className="w-6 h-6 mr-3" />
                      Common Cybersecurity Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Ignoring Compliance Complexity
                        </h4>
                        <p className="text-sm text-gray-700">
                          Underestimating time/cost for FedRAMP, ATO, CMMC certification. Security compliance for government is lengthy - budget 12-24 months and significant resources for authorization process.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Vague Threat Modeling
                        </h4>
                        <p className="text-sm text-gray-700">
                          Not specifying attack vectors, threat actors, or defensive mechanisms clearly. Use MITRE ATT&CK framework, identify specific threats, and explain detection/prevention approach with technical depth.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          No Clear Government Customer
                        </h4>
                        <p className="text-sm text-gray-700">
                          Proposing generic security tool without identifying specific DOD/DHS agency need. Name target customer, cite operational requirement, and show understanding of their environment.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Overlooking ITAR/Export Control
                        </h4>
                        <p className="text-sm text-gray-700">
                          Not considering ITAR, EAR, or export control implications for defense cybersecurity tech. Address controlled information handling, foreign national restrictions, and compliance plans.
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
                <Link href="/blog/dod-sbir-defense-tech-grants" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-blue-500">
                  <h3 className="font-semibold text-gray-900 mb-2">DOD SBIR Defense Tech Grants</h3>
                  <p className="text-sm text-gray-600">Complete guide to DOD SBIR across all defense branches</p>
                </Link>
                <Link href="/blog/ai-machine-learning-grants" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-purple-500">
                  <h3 className="font-semibold text-gray-900 mb-2">AI & Machine Learning Grants</h3>
                  <p className="text-sm text-gray-600">NSF and DOD funding for AI security applications</p>
                </Link>
                <Link href="/guides/sbir-sttr-complete-guide" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">SBIR/STTR Complete Guide</h3>
                  <p className="text-sm text-gray-600">Everything about federal SBIR programs for startups</p>
                </Link>
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <Link href="/usa/virginia" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-900">Virginia Defense Contractor Grants →</h3>
                  <p className="text-sm text-gray-600">State programs near DOD headquarters and contractors</p>
                </Link>
                <Link href="/usa/maryland" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-900">Maryland Cybersecurity Grants →</h3>
                  <p className="text-sm text-gray-600">NSA and Fort Meade area funding opportunities</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA */}
        <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Apply for Cybersecurity Grants?
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Download our free cybersecurity grants guide or get personalized help from specialists experienced in DOD and DHS cyber funding.
              </p>

              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Card className="bg-white/10 backdrop-blur border-2 border-white/20 hover:bg-white/15 transition-all">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-white">Free Cyber Guide</h3>
                    <p className="text-blue-100 text-sm mb-6">
                      Comprehensive PDF with DOD SBIR templates, DHS programs, NSA partnerships, FedRAMP strategies, and winning examples.
                    </p>
                    <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-blue-50 font-semibold" asChild>
                      <Link href="/download/cybersecurity-grants-guide">
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
                    <h3 className="font-bold text-xl mb-2 text-white">Expert Cyber Support</h3>
                    <p className="text-yellow-100 text-sm mb-6">
                      Work with specialists who&apos;ve helped cybersecurity startups win DOD grants, achieve FedRAMP, and secure defense contracts.
                    </p>
                    <Button size="lg" className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold" asChild>
                      <Link href="/contact?service=cybersecurity-grants-help">
                        Get Expert Help
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <p className="text-blue-200 mt-8 text-sm">
                ✓ 106 DOD topics • ✓ National security priority • ✓ Zero equity required
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* Bottom Ad */}
      <div className="container mx-auto px-4 py-4">
        <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_RECTANGLE!} adFormat="rectangle" style={{ minHeight: '250px' }} />
      </div>
      <Footer />
    </>
  )
}
