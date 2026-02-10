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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function SoftwareSaaSGrantsGuideDownloadPage() {
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
          guideName: "Software & SaaS Grants Guide",
          industry: formData.category || "Software/SaaS",
          country: "USA",
          additionalNotes: `Stage: ${formData.stage || "N/A"}, Funding Interest: ${formData.funding || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/software-saas-grants-guide/thank-you")
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-indigo-100 text-indigo-800 border-indigo-200">
                  💻 Free Software & SaaS Technology Startup Grants Complete Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free Software & SaaS Startup Grants Application Guide & Complete Funding Templates
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive software and SaaS technology startup grants toolkit covering NSF SBIR Phase I 
                  grants up to $305,000 increased from $275,000 establishing technical feasibility proof concept 6-18 months, 
                  Phase II grants up to $1.25 million increased from $1 million supporting full development prototyping 
                  commercialization readiness 24 months, Fast-Track Pilot Program enabling NSF lineage companies submit 
                  single combined Phase I + Phase II proposal potentially securing up to $1.555 million total non-dilutive 
                  funding zero equity retention streamlining transition concept commercialization, DOD SBIR software 
                  modernization defense applications military systems cybersecurity grants, state technology accelerator 
                  programs California Massachusetts New York Washington Colorado SBIR matching grants tax incentives.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-indigo-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-indigo-700 text-2xl">
                      📦 What's Included in Your Free Software & SaaS Grants Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">NSF SBIR Phase I $305,000 Grant Application Templates</strong>
                          <p className="text-sm text-gray-600">Complete Phase I proof concept technical feasibility templates with 15-page proposal format budget justification commercialization plans</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">NSF SBIR Phase II $1.25 Million Development Strategies</strong>
                          <p className="text-sm text-gray-600">Step-by-step guide to Phase II full development prototyping commercialization funding 24 months with customer acquisition go-to-market strategies</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Fast-Track Pilot Program $1.555M Combined Funding Framework</strong>
                          <p className="text-sm text-gray-600">Comprehensive framework for NSF lineage companies Fast-Track single combined Phase I + Phase II proposal streamlining commercialization timeline</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Project Pitch Three-Page Fast Feedback Process Templates</strong>
                          <p className="text-sm text-gray-600">Templates for three-page Project Pitch receiving feedback within three weeks determining project fit before full proposal investment</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">NSF Program Director Relationship Building Strategies</strong>
                          <p className="text-sm text-gray-600">Framework for connecting NSF Program Directors discussing project fit receiving guidance improving proposals strengthening applications</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">DOD SBIR Software Modernization Application Resources</strong>
                          <p className="text-sm text-gray-600">Complete guide to DOD SBIR software modernization defense applications military systems cybersecurity targeted topics</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Market Pull Commercial Validation Demonstration Framework</strong>
                          <p className="text-sm text-gray-600">Templates for proving market demand customer needs commercial viability through discovery interviews pilots early revenue</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Software Technology Category-Specific Strategies</strong>
                          <p className="text-sm text-gray-600">Specialized strategies for enterprise software, cloud platforms, developer tools, AI/ML, cybersecurity, automation with success examples</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-indigo-600 mr-2" />
                        <strong className="text-indigo-800">Bonus Software & SaaS Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• State SBIR matching programs California Massachusetts New York Washington Colorado supporting additional funding</li>
                        <li>• Healthcare medtech software focus 40% NSF SBIR awards digital health medical software success strategies</li>
                        <li>• Intellectual property protection strategies patents trade secrets supporting defensible competitive advantages</li>
                        <li>• Follow-on capital preparation Series A venture capital investor introductions pitch development resources</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-gray-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-indigo-700 to-purple-900 text-white rounded-t-lg">
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Your Software Startup"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Software Technology Category
                          </label>
                          <select 
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select primary category</option>
                            <option value="enterprise-saas">Enterprise Software & B2B SaaS</option>
                            <option value="cloud-platforms">Cloud Computing & Developer Tools</option>
                            <option value="ai-ml">AI/ML & Intelligent Automation</option>
                            <option value="cybersecurity">Cybersecurity & Information Security</option>
                            <option value="devops">DevOps & Software Testing</option>
                            <option value="data-analytics">Data Analytics & Business Intelligence</option>
                            <option value="workflow">Workflow Automation & Productivity</option>
                            <option value="other">Other Software Category</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Grant Application Stage
                          </label>
                          <select 
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select your stage</option>
                            <option value="researching">Researching NSF SBIR Programs</option>
                            <option value="project-pitch">Preparing Project Pitch Submission</option>
                            <option value="phase-1">Applying Phase I $305K</option>
                            <option value="phase-2">Transitioning to Phase II $1.25M</option>
                            <option value="fast-track">Exploring Fast-Track $1.555M</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Funding Interest
                          </label>
                          <select 
                            value={formData.funding}
                            onChange={(e) => setFormData({ ...formData, funding: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select primary interest</option>
                            <option value="phase-1">NSF SBIR Phase I ($305K)</option>
                            <option value="phase-2">NSF SBIR Phase II ($1.25M)</option>
                            <option value="fast-track">Fast-Track Pilot ($1.555M)</option>
                            <option value="dod">DOD SBIR Software Modernization</option>
                            <option value="all">All Software Grant Programs</option>
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
                            I agree to receive the software grants guide and occasional federal state funding opportunities 
                            and innovation programs. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-indigo-700 to-purple-900 hover:from-indigo-800 hover:to-purple-950 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-2" />
                              Get Instant Access to Software Grants Guide
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
                      <div className="text-2xl font-bold text-indigo-600">$305K</div>
                      <div className="text-xs text-gray-600">Phase I Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">$1.25M</div>
                      <div className="text-xs text-gray-600">Phase II Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">0%</div>
                      <div className="text-xs text-gray-600">Zero Equity</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Software & SaaS Startups Choose Our Grant Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete NSF SBIR Coverage</h4>
                    <p className="text-sm text-gray-600">
                      From Phase I proof concept to Phase II commercialization with Fast-Track strategies
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Program Director Insights</h4>
                    <p className="text-sm text-gray-600">
                      Understand NSF Program Director relationship building for significantly improved success rates
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Technology-Specific Strategy</h4>
                    <p className="text-sm text-gray-600">
                      Learn category-specific approaches for enterprise SaaS, cloud, AI/ML, cybersecurity, automation
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about software grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/software-saas-startup-grants">
                      Read Complete Software & SaaS Guide
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
