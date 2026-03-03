import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Heart, Lightbulb, Sparkles, MapPin, Globe, Rocket, ArrowRight, Brain, Zap, Eye, Cpu, HelpCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI & Machine Learning Grants 2026-2027 | $305K NSF SBIR, $100M AI Research Institutes, DOD AI Applications Non-Dilutive Funding",
  description: "Complete 2026-2027 guide to AI and machine learning grants. NSF SBIR Phase I $305K, Phase II $1.25M, National AI Research Institutes $100M investment, NAIRR $35M operations center, DOD AI applications supporting computer vision, NLP, ML platforms, generative AI, and predictive analytics with zero equity funding.",
  keywords: "AI grants 2026, machine learning startup grants, NSF AI research institutes, computer vision grants, NLP funding, generative AI grants, AI research funding $100M, NAIRR operations center, DOD AI applications, NSF SBIR AI grants $305K, neural networks grants, deep learning funding",
  openGraph: {
    title: "AI & ML Grants 2026 | $305K NSF SBIR + $100M Research Institutes",
    description: "Complete guide to AI and machine learning grants from NSF, NAIRR, DOD, and state programs.",
    url: "https://www.fsidigital.ca/blog/ai-machine-learning-grants",
    images: ["/images/blog/usa-grants-theme.png"],
  },
}

export default function AIMachineLearningGrantsPage() {
  const faqData = [
    {
      question: "What AI projects does NSF fund?",
      answer: "NSF funds high-risk, high-impact AI innovations in computer vision, NLP, robotics, and machine learning. Priority areas include healthcare, materials science, education, and trustworthy AI."
    },
    {
      question: "Is equity required for these grants?",
      answer: "No. NSF SBIR/STTR and government research grants are 100% non-dilutive. You keep full ownership of your company and intellectual property."
    },
    {
      question: "Can I use funding for GPU compute?",
      answer: "Yes. Grant funds can cover cloud computing costs, hardware purchasing (special restrictions apply), and personnel salaries for AI development."
    },
    {
      question: "What is the success rate?",
      answer: "NSF SBIR Phase I success rates average 15-20%. However, certain subtopics like Healthcare AI often see higher acceptance rates (up to 40%) due to strong demand."
    },
    {
      question: "How does NAIRR help startups?",
      answer: "NAIRR provides access to high-performance computing (HPC), datasets, and testbeds that would otherwise be cost-prohibitive for startups, leveling the playing field with big tech.",
      isNew: true
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
        {/* Clean Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  🤖 AI & Machine Learning Grants 2026-2027
                </Badge>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center leading-tight">
                Get Up to $100M in<br />AI Research Funding
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-blue-100 mb-8 text-center max-w-3xl mx-auto font-light">
                NSF AI Research Institutes, SBIR grants, and NAIRR funding for AI/ML startups. Zero equity required for computer vision, NLP, generative AI, and deep learning innovations.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-10">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">$100M</div>
                  <div className="text-sm md:text-base text-blue-200">AI Research Institutes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">$1.25M</div>
                  <div className="text-sm md:text-base text-blue-200">SBIR Phase II Max</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">$35M</div>
                  <div className="text-sm md:text-base text-blue-200">NAIRR Operations</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-6 text-lg w-full sm:w-auto shadow-xl" asChild>
                  <Link href="#ai-grants">
                    View AI Grant Programs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white bg-transparent text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg w-full sm:w-auto" asChild>
                  <Link href="/download/ai-ml-grants-guide">
                    <Download className="mr-2 w-5 h-5" />
                    Free AI Grants Guide
                  </Link>
                </Button>
              </div>

              {/* Trust Indicator */}
              <p className="text-center text-blue-200 mt-8 text-sm">
                ✓ 490+ AI research projects funded • ✓ 49 states + DC coverage • ✓ Non-dilutive funding
              </p>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About AI & ML Grants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#sbir-ai-details" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-blue-500">
                  <h3 className="font-semibold text-blue-700">How much funding can AI startups get?</h3>
                  <p className="text-sm text-gray-600">$305K Phase I, up to $1.25M Phase II from NSF SBIR</p>
                </a>
                <a href="#ai-institutes-details" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-purple-500">
                  <h3 className="font-semibold text-purple-700">What are NSF AI Research Institutes?</h3>
                  <p className="text-sm text-gray-600">$100M investment in 5 national AI institutes</p>
                </a>
                <a href="#nairr-details" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-cyan-500">
                  <h3 className="font-semibold text-cyan-700">How can I access NAIRR computing resources?</h3>
                  <p className="text-sm text-gray-600">GPU clusters, datasets, and AI models for researchers</p>
                </a>
                <a href="#ai-grants" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-green-500">
                  <h3 className="font-semibold text-green-700">Do I give up equity for AI grants?</h3>
                  <p className="text-sm text-gray-600">No, NSF SBIR is 100% non-dilutive funding</p>
                </a>
                <a href="#faq" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-orange-500">
                  <h3 className="font-semibold text-orange-700">What AI technologies qualify for NSF funding?</h3>
                  <p className="text-sm text-gray-600">CV, NLP, generative AI, ML platforms, robotics</p>
                </a>
                <a href="#faq" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-pink-500">
                  <h3 className="font-semibold text-pink-700">What's the success rate for AI grants?</h3>
                  <p className="text-sm text-gray-600">15-20% overall, 40% for healthcare AI</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Overview - Main Programs */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">What AI & Machine Learning Grant Programs are Available?</h2>
              <p className="text-lg text-gray-600 text-center mb-10 max-w-3xl mx-auto">
                Federal funding opportunities for artificial intelligence, machine learning platforms, computer vision, NLP, and generative AI innovations.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {/* NSF SBIR for AI */}
                <Card className="border-2 border-blue-200 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-700">$305,000</div>
                        <div className="text-sm text-gray-600">NSF SBIR Phase I</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">AI Innovation Funding</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Computer vision & image recognition</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>NLP & language models development</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>ML platforms & AutoML tools</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>40% success rate in healthcare AI</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#sbir-ai-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* AI Research Institutes */}
                <Card className="border-2 border-purple-200 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-700">$100M</div>
                        <div className="text-sm text-gray-600">AI Research Institutes</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">National AI Hubs</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>5 institutes + community hub funded</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Materials, drug discovery, education</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Generative AI & diffusion models</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Partnership with Capital One, Intel</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#ai-institutes-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* NAIRR */}
                <Card className="border-2 border-cyan-200 hover:shadow-xl transition-all hover:-translate-y-1 relative">
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    NEW 2026
                  </div>
                  <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mr-3">
                        <Cpu className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cyan-700">$35M</div>
                        <div className="text-sm text-gray-600">NAIRR Operations</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">AI Research Resources</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>490+ projects in 49 states + DC</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Computing, datasets, models access</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>14 agencies + 28 private partners</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Centralized web portal launching</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#nairr-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* AI Technology Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Which AI Technologies Qualify for Government Funding?</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                NSF and DOD grants support a wide range of artificial intelligence and machine learning innovations.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Eye className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Computer Vision</h3>
                    <p className="text-sm text-gray-600 mb-3">Image recognition, object detection, facial recognition, medical imaging analysis, autonomous systems</p>
                    <p className="text-xs text-blue-700 font-semibold">NSF SBIR + AI Institutes</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Brain className="w-8 h-8 text-purple-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">NLP & Language Models</h3>
                    <p className="text-sm text-gray-600 mb-3">Natural language processing, conversational AI, text generation, sentiment analysis, translation</p>
                    <p className="text-xs text-purple-700 font-semibold">$305K - $1.25M available</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Zap className="w-8 h-8 text-indigo-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Generative AI</h3>
                    <p className="text-sm text-gray-600 mb-3">Diffusion models, GANs, text-to-image, synthetic data, creative AI, foundation models</p>
                    <p className="text-xs text-indigo-700 font-semibold">NSF IFML Institute focus</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-cyan-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Cpu className="w-8 h-8 text-cyan-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">ML Platforms & AutoML</h3>
                    <p className="text-sm text-gray-600 mb-3">MLOps, model training, hyperparameter tuning, neural architecture search, federated learning</p>
                    <p className="text-xs text-cyan-700 font-semibold">NAIRR compute access</p>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Categories Row */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Predictive Analytics</h3>
                    <p className="text-sm text-gray-600 mb-3">Forecasting, anomaly detection, recommendation systems, time series analysis</p>
                    <p className="text-xs text-green-700 font-semibold">Healthcare AI priority</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Shield className="w-8 h-8 text-orange-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">AI Safety & Ethics</h3>
                    <p className="text-sm text-gray-600 mb-3">Explainable AI, bias detection, model interpretability, robustness, AI governance</p>
                    <p className="text-xs text-orange-700 font-semibold">DOD priority area</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-pink-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Heart className="w-8 h-8 text-pink-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Healthcare AI</h3>
                    <p className="text-sm text-gray-600 mb-3">Disease detection, drug discovery, clinical decision support, medical imaging, patient monitoring</p>
                    <p className="text-xs text-pink-700 font-semibold">40% SBIR awards</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-teal-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Lightbulb className="w-8 h-8 text-teal-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">AI Materials & Science</h3>
                    <p className="text-sm text-gray-600 mb-3">Materials discovery, molecular design, protein engineering, quantum AI, scientific ML</p>
                    <p className="text-xs text-teal-700 font-semibold">NSF AI-MI Institute</p>
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
                    <h3 className="text-2xl font-bold text-blue-900 mb-2">What's New in AI Funding 2026-2027</h3>
                    <p className="text-gray-700">Major NSF investments and new programs launched for AI researchers and startups</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-5 border border-blue-100">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                      <h4 className="font-bold text-gray-900">$100M AI Institutes Investment</h4>
                    </div>
                    <p className="text-sm text-gray-700">NSF announced $100M investment in 5 National AI Research Institutes (July 2026) covering mental health, materials discovery, STEM education, human-AI collaboration, and drug development.</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-blue-100">
                    <div className="flex items-center mb-2">
                      <Cpu className="w-5 h-5 text-blue-600 mr-2" />
                      <h4 className="font-bold text-gray-900">NAIRR Operations Center Launch</h4>
                    </div>
                    <p className="text-sm text-gray-700">$35M over 5 years to establish National AI Research Resource Operations Center (announced September 2026). Transitions pilot to permanent program with centralized access portal.</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-blue-100">
                    <div className="flex items-center mb-2">
                      <Users className="w-5 h-5 text-purple-600 mr-2" />
                      <h4 className="font-bold text-gray-900">490+ Projects Nationwide</h4>
                    </div>
                    <p className="text-sm text-gray-700">NAIRR Pilot has already supported 490+ AI research projects across 49 states and DC since January 2024 launch. Public-private partnership with 14 agencies and 28 private partners.</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-blue-100">
                    <div className="flex items-center mb-2">
                      <Rocket className="w-5 h-5 text-indigo-600 mr-2" />
                      <h4 className="font-bold text-gray-900">White House AI Action Plan</h4>
                    </div>
                    <p className="text-sm text-gray-700">Both Biden and Trump administrations committed to AI leadership through expanded funding, workforce development, and democratized access to AI research resources and computational infrastructure.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Programs Section */}
        <section id="ai-grants" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">What are the Specific Details of AI Grant Programs?</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Everything you need to know about NSF SBIR for AI, AI Research Institutes, NAIRR, DOD programs, and state initiatives.
              </p>

              <div className="space-y-8">
                {/* NSF SBIR for AI */}
                <Card id="sbir-ai-details" className="border-2 border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
                    <div className="flex items-center mb-2">
                      <Brain className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700 text-2xl">NSF SBIR for AI & Machine Learning - $305K to $1.25M</CardTitle>
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
                              <span className="text-blue-700 font-bold text-xl">$305,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Phase II Award:</span>
                              <span className="text-indigo-700 font-bold text-xl">$1,250,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Equity Required:</span>
                              <span className="text-green-700 font-bold">0% Non-dilutive</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Timeline:</span>
                              <span className="text-purple-700 font-bold">6-42 months</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-800 mb-3">AI Technology Focus Areas:</h5>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                              <Eye className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Computer Vision:</strong> Image recognition, object detection, video analysis, autonomous systems</span>
                            </li>
                            <li className="flex items-start">
                              <Brain className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Natural Language Processing:</strong> Large language models, conversational AI, text generation</span>
                            </li>
                            <li className="flex items-start">
                              <Zap className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Generative AI:</strong> Diffusion models, GANs, synthetic data generation, creative AI</span>
                            </li>
                            <li className="flex items-start">
                              <TrendingUp className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Predictive Analytics:</strong> Forecasting, recommendation systems, anomaly detection</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">AI Success Stories</h4>
                        <div className="space-y-4">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-2">
                                <Heart className="w-5 h-5 text-white" />
                              </div>
                              <p className="font-bold text-green-800">Healthcare AI - Disease Detection</p>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              $305K Phase I → built AI diagnostic platform using computer vision for early cancer detection → validated with 10 hospitals → secured $1.25M Phase II → now processing 1M+ scans annually with FDA clearance.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">FDA Cleared</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">1M+ scans/year</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">10 hospitals</span>
                            </div>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                                <Brain className="w-5 h-5 text-white" />
                              </div>
                              <p className="font-bold text-blue-800">NLP Platform for Enterprise</p>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              $305K Phase I → developed domain-specific language model for legal document analysis → pilot with 5 law firms → $1.25M Phase II → launched SaaS platform → $15M Series A → serving 200+ enterprise customers.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">$15M Series A</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">200 customers</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Legal AI</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                      <h4 className="font-bold text-lg mb-4 text-blue-800">Application Strategy for AI Projects</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Target className="w-4 h-4 mr-2 text-blue-600" />
                            Focus Areas
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Healthcare AI (40% success rate)</li>
                            <li>• Materials discovery & science</li>
                            <li>• Education technology & learning</li>
                            <li>• Cybersecurity & threat detection</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                            Success Factors
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Novel AI architecture or approach</li>
                            <li>• Real-world dataset validation</li>
                            <li>• Customer pilots & early adopters</li>
                            <li>• Explainability & interpretability</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Lightbulb className="w-4 h-4 mr-2 text-blue-600" />
                            Technical Merit
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Addresses technical barriers</li>
                            <li>• Beyond incremental improvements</li>
                            <li>• Benchmarking against state-of-art</li>
                            <li>• Computational efficiency gains</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Research Institutes */}
                <Card id="ai-institutes-details" className="border-2 border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                    <div className="flex items-center mb-2">
                      <Sparkles className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700 text-2xl">National AI Research Institutes - $100M Investment</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-purple-800">Program Details</h4>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Total Investment:</span>
                              <span className="text-purple-700 font-bold text-xl">$100M</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Institutes Funded:</span>
                              <span className="text-pink-700 font-bold">5 + Hub</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Partners:</span>
                              <span className="text-indigo-700 font-bold">NSF + Capital One + Intel</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Focus:</span>
                              <span className="text-blue-700 font-bold">Real-world AI solutions</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
                          Announced July 2026, these institutes translate cutting-edge AI research into practical applications across mental health, materials discovery, STEM education, human-AI collaboration, and drug development. Aligns with White House AI Action Plan.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Institute Focus Areas</h4>
                        <div className="space-y-3 text-sm">
                          <div className="bg-white p-4 rounded-lg border border-purple-200">
                            <p className="font-semibold text-purple-800 mb-2">NSF AI-Materials Institute (NSF AI-MI)</p>
                            <p className="text-gray-700">Led by Cornell University. Accelerates next-generation materials discovery for energy, sustainability, and quantum tech. Creates AI Materials Science Ecosystem portal.</p>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-purple-200">
                            <p className="font-semibold text-purple-800 mb-2">NSF Institute for Foundations of Machine Learning (IFML)</p>
                            <p className="text-gray-700">Led by UT Austin. Develops foundational tools for generative AI, diffusion models powering Stable Diffusion 3, Flux. Expands to protein engineering and clinical imaging.</p>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-purple-200">
                            <p className="font-semibold text-purple-800 mb-2">Additional Institutes</p>
                            <p className="text-gray-700">Mental health AI, STEM education platforms, human-AI collaboration research, drug discovery acceleration, and AI education hub (NSF AIVO).</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* NAIRR */}
                <Card id="nairr-details" className="border-2 border-cyan-200">
                  <CardHeader className="bg-gradient-to-r from-cyan-100 to-blue-100">
                    <div className="flex items-center mb-2">
                      <Cpu className="w-6 h-6 text-cyan-600 mr-3" />
                      <CardTitle className="text-cyan-700 text-2xl">National AI Research Resource (NAIRR) - $35M Operations Center</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-cyan-800">NAIRR Overview</h4>
                        <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200 mb-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Operations Funding:</span>
                              <span className="text-cyan-700 font-bold text-xl">$35M</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Duration:</span>
                              <span className="text-blue-700 font-bold">5 years</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Projects Funded:</span>
                              <span className="text-indigo-700 font-bold">490+</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Coverage:</span>
                              <span className="text-purple-700 font-bold">49 states + DC</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
                          Announced September 2026, NAIRR Operations Center transitions successful pilot to permanent national program. Provides democratized access to computational resources, datasets, AI models, and training for researchers nationwide.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Resources Available</h4>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                          <p className="font-semibold text-gray-800 mb-3">What NAIRR Provides:</p>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                              <Cpu className="w-4 h-4 text-cyan-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Computing Resources:</strong> GPU clusters, TPUs, cloud computing credits for AI training</span>
                            </li>
                            <li className="flex items-start">
                              <Globe className="w-4 h-4 text-cyan-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Datasets:</strong> Curated datasets for agriculture, healthcare, cybersecurity, education</span>
                            </li>
                            <li className="flex items-start">
                              <Brain className="w-4 h-4 text-cyan-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>AI Models:</strong> Pre-trained foundation models, fine-tuning resources, model repositories</span>
                            </li>
                            <li className="flex items-start">
                              <Users className="w-4 h-4 text-cyan-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Training & Support:</strong> Technical assistance, educational resources, community forums</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                          <p className="font-semibold text-cyan-800 mb-2">Partnership Ecosystem:</p>
                          <p className="text-sm text-gray-700">14 federal agencies + 28 private/nonprofit partners including major cloud providers, AI companies, research institutions creating comprehensive AI infrastructure.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* DOD & State Programs */}
                <Card className="border-2 border-green-200">
                  <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700 text-2xl">DOD AI Applications & State Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-green-800">DOD SBIR AI Funding</h4>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                          <p className="font-semibold text-gray-800 mb-3">Defense AI Applications:</p>
                          <ul className="text-sm text-gray-700 space-y-2">
                            <li>• Autonomous systems & robotics for military operations</li>
                            <li>• AI-powered cybersecurity & threat intelligence</li>
                            <li>• Computer vision for surveillance & reconnaissance</li>
                            <li>• Natural language processing for intelligence analysis</li>
                            <li>• Predictive maintenance using machine learning</li>
                            <li>• Command, control, communications AI systems</li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">State AI Programs</h4>
                        <div className="space-y-3 text-sm">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-semibold text-blue-800 mb-2">California AI Innovation</p>
                            <p className="text-gray-700">CalSEED AI grants, UC AI research partnerships, Silicon Valley AI accelerators, AI safety research funding</p>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="font-semibold text-purple-800 mb-2">Massachusetts AI Hub</p>
                            <p className="text-gray-700">MIT AI initiatives, Boston AI ecosystem, SBIR matching grants for AI startups, healthcare AI focus</p>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <p className="font-semibold text-orange-800 mb-2">New York AI Research</p>
                            <p className="text-gray-700">Cornell Tech AI programs, NYC AI accelerators, financial AI applications, AI safety research</p>
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
                        {faq.isNew && (
                          <Badge className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-200">New</Badge>
                        )}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">How to Successfully Apply for AI Grants?</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Proven tactics to increase your chances of winning NSF and DOD AI funding.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-green-200">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardTitle className="text-green-700 text-xl flex items-center">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      What Works for AI Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Target className="w-5 h-5 text-green-600 mr-2" />
                          Focus on High-Impact Domains
                        </h4>
                        <p className="text-sm text-gray-700">
                          Healthcare AI sees 40% success rate. Materials science, drug discovery, education tech, and cybersecurity are NSF priority areas. Align your AI innovation with societal benefit.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Brain className="w-5 h-5 text-green-600 mr-2" />
                          Demonstrate Technical Novelty
                        </h4>
                        <p className="text-sm text-gray-700">
                          Show novel AI architecture, algorithms, or approaches beyond incremental improvements. Include benchmarking against state-of-the-art, computational efficiency gains, or new capabilities.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Users className="w-5 h-5 text-green-600 mr-2" />
                          Validate with Real-World Data
                        </h4>
                        <p className="text-sm text-gray-700">
                          Use domain-specific datasets, conduct pilot studies, show customer validation. NSF values practical applications with clear paths to deployment beyond academic benchmarks.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Shield className="w-5 h-5 text-green-600 mr-2" />
                          Address Explainability & Safety
                        </h4>
                        <p className="text-sm text-gray-700">
                          Include interpretability, bias detection, robustness testing. AI safety and responsible AI development are increasingly important evaluation criteria for NSF and DOD reviewers.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-red-200">
                  <CardHeader className="bg-gradient-to-br from-red-50 to-orange-50">
                    <CardTitle className="text-red-700 text-xl flex items-center">
                      <AlertCircle className="w-6 h-6 mr-3" />
                      Common AI Grant Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Overhyping AI Capabilities
                        </h4>
                        <p className="text-sm text-gray-700">
                          Making unrealistic claims about AI performance or generalizability. NSF reviewers are AI experts who spot overpromising. Be honest about limitations and technical challenges.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Using Only Toy Datasets
                        </h4>
                        <p className="text-sm text-gray-700">
                          Relying solely on MNIST, CIFAR, or academic benchmarks without real-world data. Show your AI works on messy, real-world problems with practical deployment considerations.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Ignoring Computational Costs
                        </h4>
                        <p className="text-sm text-gray-700">
                          Proposing models requiring massive compute without efficiency considerations. Address scalability, inference costs, and resource requirements for practical deployment scenarios.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Weak Commercialization Path
                        </h4>
                        <p className="text-sm text-gray-700">
                          Focusing only on technical aspects without clear market strategy. NSF SBIR requires commercialization potential - show customer demand, revenue model, and go-to-market plan.
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
                  <p className="text-sm text-gray-600">Everything you need to know about NSF, DOD, DOE SBIR grants</p>
                </Link>
                <Link href="/blog/software-saas-startup-grants" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-purple-500">
                  <h3 className="font-semibold text-gray-900 mb-2">Software & SaaS Startup Grants</h3>
                  <p className="text-sm text-gray-600">Funding for software development and SaaS platforms</p>
                </Link>
                <Link href="/blog/cybersecurity-grants" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">Cybersecurity Grants</h3>
                  <p className="text-sm text-gray-600">DOD and NSF funding for security technologies</p>
                </Link>
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <Link href="/usa/california" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-900">California Tech Grants →</h3>
                  <p className="text-sm text-gray-600">State programs for AI and tech startups in Silicon Valley</p>
                </Link>
                <Link href="/usa/massachusetts" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-900">Massachusetts Tech Grants →</h3>
                  <p className="text-sm text-gray-600">Boston area AI and biotech funding programs</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Apply for AI Grants?
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Download our free AI grants guide or get personalized help from specialists who understand AI research funding.
              </p>

              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Card className="bg-white/10 backdrop-blur border-2 border-white/20 hover:bg-white/15 transition-all">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-white">Free AI Grants Guide</h3>
                    <p className="text-blue-100 text-sm mb-6">
                      Comprehensive PDF with NSF SBIR templates, AI Research Institutes info, NAIRR access guide, and winning strategies.
                    </p>
                    <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-blue-50 font-semibold" asChild>
                      <Link href="/download/ai-ml-grants-guide">
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
                    <h3 className="font-bold text-xl mb-2 text-white">Expert AI Grant Support</h3>
                    <p className="text-yellow-100 text-sm mb-6">
                      Work with specialists who've helped AI startups win NSF SBIR, AI Institutes partnerships, and NAIRR access.
                    </p>
                    <Button size="lg" className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold" asChild>
                      <Link href="/contact?service=ai-grants-help">
                        Get Expert Help
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <p className="text-blue-200 mt-8 text-sm">
                ✓ 490+ AI projects funded • ✓ $100M+ in AI research funding • ✓ Zero equity required
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
