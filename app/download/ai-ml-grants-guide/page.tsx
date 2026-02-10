"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, Sparkles, Users, MapPin, DollarSign, Target, Loader2 } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AIMachineLearningGrantsGuideDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    category: "",
    stage: "",
    funding: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          name: formData.name,
          company: formData.company,
          guideName: "AI & Machine Learning Grants Guide",
          industry: formData.category || "AI/ML Technology",
          country: "USA",
          additionalNotes: `Stage: ${formData.stage || "N/A"}, Funding Interest: ${formData.funding || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/ai-machine-learning-grants-guide/thank-you")
      } else {
        setError(data.error || "Failed to process download")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-fuchsia-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-violet-100 text-violet-800 border-violet-200">
                  🤖 Free AI & Machine Learning Technology Startup Grants Complete Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free AI & Machine Learning Startup Grants Application Guide & Complete Funding Templates
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive AI and machine learning technology startup grants toolkit covering NSF AI
                  Research Institutes $100 million funding establishing collaborative AI research hubs nationwide advancing
                  transformative AI innovations, NSF SBIR Phase I grants up to $305,000 AI/ML proof concept technical
                  feasibility, Phase II grants up to $1.25 million full AI development commercialization, Fast-Track Pilot
                  Program $1.555M combined funding NSF lineage companies, DOD SBIR AI applications defense autonomous systems
                  military intelligence cybersecurity, NIST AI Technology frameworks standards measurement trustworthy AI,
                  state programs California Massachusetts New York supporting regional AI innovation ecosystems. Complete
                  application strategies, proposal templates for natural language processing NLP conversational AI, computer
                  vision image recognition video analytics, machine learning platforms MLOps model deployment, deep learning
                  neural networks generative AI, predictive analytics forecasting recommendation systems, autonomous systems
                  robotics intelligent agents, AI-powered automation intelligent process automation, explainable AI XAI
                  trustworthy AI safety, eligibility requirements, submission timelines, success strategies for AI ML startups
                  pursuing 100% non-dilutive federal funding requiring zero equity supporting full ownership intellectual
                  property control commercialization revenue generation business growth advancing American AI leadership.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">

                {/* What's Included Section */}
                <Card className="border-violet-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-violet-700 text-2xl">
                      📦 What's Included in Your Free AI & ML Grants Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-violet-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">NSF AI Research Institutes $100M Application Frameworks</strong>
                          <p className="text-sm text-gray-600">Complete frameworks for National AI Research Institutes collaborative research hubs nationwide transformative AI innovations</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-violet-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">NSF SBIR AI/ML Phase I $305K Grant Templates</strong>
                          <p className="text-sm text-gray-600">Step-by-step Phase I AI proof concept technical feasibility templates with machine learning model validation strategies</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-violet-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">NSF SBIR Phase II $1.25M AI Development Strategies</strong>
                          <p className="text-sm text-gray-600">Comprehensive Phase II full AI platform development commercialization funding 24 months with customer acquisition deployment</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-violet-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">DOD SBIR AI Applications Defense Systems Templates</strong>
                          <p className="text-sm text-gray-600">Templates for DOD AI applications autonomous systems military intelligence cybersecurity command control targeted topics</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-violet-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">NIST AI Technology Standards Frameworks</strong>
                          <p className="text-sm text-gray-600">Framework for NIST AI technology standards measurement trustworthy AI safety explainability fairness supporting responsible innovation</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-violet-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">AI Technology Category-Specific Application Strategies</strong>
                          <p className="text-sm text-gray-600">Specialized strategies for NLP computer vision ML platforms deep learning predictive analytics autonomous systems with examples</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-violet-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">AI Model Validation Commercial Demonstration Framework</strong>
                          <p className="text-sm text-gray-600">Templates for proving AI model performance accuracy reliability through validation testing customer pilots enterprise deployments</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-violet-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Fast-Track Pilot Program $1.555M Combined Funding Guide</strong>
                          <p className="text-sm text-gray-600">Complete guide to Fast-Track single combined Phase I + Phase II proposal NSF lineage companies streamlining AI commercialization</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-violet-50 border border-violet-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-violet-600 mr-2" />
                        <strong className="text-violet-800">Bonus AI & Machine Learning Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-violet-700 space-y-1">
                        <li>• State AI innovation programs California Massachusetts New York supporting additional regional AI ecosystem funding</li>
                        <li>• Responsible AI ethical AI frameworks addressing bias fairness transparency explainability supporting trustworthy systems</li>
                        <li>• AI intellectual property protection strategies patents trade secrets supporting defensible competitive advantages</li>
                        <li>• AI venture capital ecosystem connections specialized AI investors Series A preparation supporting follow-on capital</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-gray-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-violet-700 to-fuchsia-900 text-white rounded-t-lg">
                      <CardTitle className="text-2xl flex items-center">
                        <Download className="w-6 h-6 mr-2" />
                        Download Your Free Guide Now
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                            placeholder="Your Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Business Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                            placeholder="your.email@startup.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 000-0000"
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                            placeholder="Your AI/ML Startup"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            AI Technology Category
                          </label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                          >
                            <option value="">Select primary AI category</option>
                            <option value="nlp">Natural Language Processing & Conversational AI</option>
                            <option value="computer-vision">Computer Vision & Image Recognition</option>
                            <option value="ml-platforms">Machine Learning Platforms & MLOps</option>
                            <option value="deep-learning">Deep Learning & Neural Networks</option>
                            <option value="predictive">Predictive Analytics & Forecasting</option>
                            <option value="autonomous">Autonomous Systems & Robotics</option>
                            <option value="generative">Generative AI & Large Language Models</option>
                            <option value="other">Other AI/ML Category</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Grant Application Stage
                          </label>
                          <select
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                          >
                            <option value="">Select your stage</option>
                            <option value="researching">Researching AI Grant Programs</option>
                            <option value="ai-institutes">Exploring NSF AI Research Institutes</option>
                            <option value="phase-1">Preparing SBIR Phase I $305K AI</option>
                            <option value="phase-2">Transitioning to Phase II $1.25M</option>
                            <option value="dod-ai">Exploring DOD AI Applications</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Funding Interest
                          </label>
                          <select
                            value={formData.funding}
                            onChange={(e) => setFormData({ ...formData, funding: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                          >
                            <option value="">Select primary interest</option>
                            <option value="ai-institutes">NSF AI Research Institutes ($100M)</option>
                            <option value="phase-1">NSF SBIR Phase I AI ($305K)</option>
                            <option value="phase-2">NSF SBIR Phase II AI ($1.25M)</option>
                            <option value="dod-ai">DOD SBIR AI Applications</option>
                            <option value="all">All AI/ML Grant Programs</option>
                          </select>
                        </div>

                        {error && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-800 text-sm">{error}</p>
                          </div>
                        )}

                        <div className="flex items-start pt-2">
                          <input
                            type="checkbox"
                            id="consent"
                            required
                            className="mt-1 mr-3"
                          />
                          <label htmlFor="consent" className="text-xs text-gray-600">
                            I agree to receive the AI/ML grants guide and occasional federal state funding opportunities
                            and innovation programs. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-violet-700 to-fuchsia-900 hover:from-violet-800 hover:to-fuchsia-950 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-2" />
                              Get Instant Access to AI/ML Grants Guide
                            </>
                          )}
                        </Button>

                        <p className="text-xs text-center text-gray-500 mt-4">
                          🔒 Your information is 100% secure. We never share your details.
                        </p>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Trust Indicators */}
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-violet-600">$100M</div>
                      <div className="text-xs text-gray-600">AI Institutes</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-fuchsia-600">$1.25M</div>
                      <div className="text-xs text-gray-600">Phase II Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">0%</div>
                      <div className="text-xs text-gray-600">Zero Equity</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why AI & Machine Learning Startups Choose Our Grant Guide
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-violet-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete AI Funding Coverage</h4>
                    <p className="text-sm text-gray-600">
                      From NSF AI Research Institutes to SBIR Phase I/II with DOD AI applications strategies
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-fuchsia-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-fuchsia-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Responsible AI Framework</h4>
                    <p className="text-sm text-gray-600">
                      Understand trustworthy AI safety explainability fairness addressing ethical considerations
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Technology-Specific Strategy</h4>
                    <p className="text-sm text-gray-600">
                      Learn category-specific approaches for NLP, computer vision, ML platforms, deep learning
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about AI/ML grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/ai-machine-learning-grants">
                      Read Complete AI & ML Guide
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/usa/technology-startup-grants">
                      Explore All Tech Startup Grants
                    </Link>
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
