"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Download, FileText, Calculator, Microscope, Pill, Stethoscope, Dna, Loader2 } from "lucide-react"
import Link from "next/link"

export default function CanadaLifeSciencesFundingDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    lifeSciencesSector: "",
    therapeuticArea: "",
    developmentStage: "",
    fundingNeeds: "",
    challenges: "",
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
          name: `${formData.firstName} ${formData.lastName}`,
          company: formData.company,
          guideName: "Canada Life Sciences Funding Guide",
          industry: formData.lifeSciencesSector || "Life Sciences/Biotech",
          country: "Canada",
          additionalNotes: `Role: ${formData.role}, Therapeutic Area: ${formData.therapeuticArea}, Stage: ${formData.developmentStage}, Funding: ${formData.fundingNeeds}, Challenges: ${formData.challenges || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/canada-life-sciences-funding-guide/thank-you")
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
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🧬 Free Life Sciences Download
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Life Sciences Grants Application Toolkit
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Get instant access to comprehensive biotechnology funding guide with IRAP biotech templates, 
                clinical trials checklists, medical device regulatory tools, and biomanufacturing frameworks used by life sciences 
                companies to secure $95M+ across 18+ drug development and health technology programs.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left - What's Included */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included in Your Life Sciences Toolkit</h2>
                  
                  <div className="space-y-6">
                    <Card className="border-teal-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Microscope className="w-6 h-6 text-teal-600 mr-3" />
                          <CardTitle className="text-teal-700">IRAP Biotech Application Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Complete IRAP life sciences project template (up to $500K)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Drug development technical feasibility framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Biotech IP protection and FTO analysis templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Therapeutic target validation documentation</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-cyan-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Pill className="w-6 h-6 text-cyan-600 mr-3" />
                          <CardTitle className="text-cyan-700">Clinical Trials Application Kit</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>CIHR clinical trials grant application template</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Clinical trial protocol (CTP) framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Patient recruitment and retention strategies</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Health Canada CTA submission checklist</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Stethoscope className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-blue-700">Medical Device Regulatory Tools</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Health Canada MDEL submission templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Medical device classification guide (Class I-IV)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>FDA 510(k) regulatory pathway comparison</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>ISO 13485 QMS implementation checklist</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Dna className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-green-700">Biomanufacturing & Scale-Up Tools</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>GMP facility funding application templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Biomanufacturing cost analysis calculator</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Cell and gene therapy manufacturing guidelines</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Multi-program funding stacking strategies</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 bg-teal-50 border border-teal-200 p-6 rounded-lg">
                    <h4 className="font-bold text-teal-800 mb-2">Bonus: Expert Life Sciences Consultation</h4>
                    <p className="text-teal-700 text-sm">
                      Download includes a complimentary 30-minute life sciences funding strategy consultation 
                      with our biotech specialists who have secured $95M+ in drug development and medical device grants with 76% success rate.
                    </p>
                  </div>
                </div>

                {/* Right - Lead Capture Form */}
                <div>
                  <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg sticky top-8">
                    <div className="text-center mb-6">
                      <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="w-8 h-8 text-teal-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Your Free Life Sciences Toolkit</h3>
                      <p className="text-gray-600">Join 2,200+ biotech innovators who've accessed our life sciences funding resources</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            required 
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="Your first name"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName" 
                            required 
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="Your last name"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Business Email *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          required 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@company.com"
                          className="mt-1"
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
                        <Label htmlFor="company">Company/Organization *</Label>
                        <Input 
                          id="company" 
                          required 
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Your company name"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="role">Your Role *</Label>
                        <Select 
                          required
                          value={formData.role}
                          onValueChange={(value) => setFormData({ ...formData, role: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ceo">CEO/Founder</SelectItem>
                            <SelectItem value="cso">CSO/Chief Scientific Officer</SelectItem>
                            <SelectItem value="cmo">CMO/Chief Medical Officer</SelectItem>
                            <SelectItem value="rd-director">R&D Director</SelectItem>
                            <SelectItem value="clinical">Clinical Development</SelectItem>
                            <SelectItem value="regulatory">Regulatory Affairs</SelectItem>
                            <SelectItem value="business-dev">Business Development</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="lifeSciencesSector">Life Sciences Sector</Label>
                        <Select 
                          value={formData.lifeSciencesSector}
                          onValueChange={(value) => setFormData({ ...formData, lifeSciencesSector: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="drug-development">Drug Development / Pharmaceuticals</SelectItem>
                            <SelectItem value="medical-devices">Medical Devices</SelectItem>
                            <SelectItem value="diagnostics">Diagnostics / In Vitro Diagnostics</SelectItem>
                            <SelectItem value="cell-gene-therapy">Cell & Gene Therapy</SelectItem>
                            <SelectItem value="digital-health">Digital Health / HealthTech</SelectItem>
                            <SelectItem value="vaccines">Vaccines / Immunotherapy</SelectItem>
                            <SelectItem value="biomanufacturing">Biomanufacturing</SelectItem>
                            <SelectItem value="other">Other Life Sciences</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="therapeuticArea">Primary Therapeutic Area</Label>
                        <Select 
                          value={formData.therapeuticArea}
                          onValueChange={(value) => setFormData({ ...formData, therapeuticArea: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select therapeutic area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="oncology">Oncology / Cancer</SelectItem>
                            <SelectItem value="cardiology">Cardiology</SelectItem>
                            <SelectItem value="neurology">Neurology / CNS</SelectItem>
                            <SelectItem value="immunology">Immunology / Autoimmune</SelectItem>
                            <SelectItem value="infectious">Infectious Diseases</SelectItem>
                            <SelectItem value="rare-diseases">Rare Diseases / Orphan Drugs</SelectItem>
                            <SelectItem value="diabetes">Diabetes / Metabolic</SelectItem>
                            <SelectItem value="other">Other Therapeutic Area</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="developmentStage">Development Stage</Label>
                        <Select 
                          value={formData.developmentStage}
                          onValueChange={(value) => setFormData({ ...formData, developmentStage: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select development stage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="discovery">Discovery / Target Validation</SelectItem>
                            <SelectItem value="preclinical">Preclinical Development</SelectItem>
                            <SelectItem value="phase1">Phase I Clinical Trials</SelectItem>
                            <SelectItem value="phase2">Phase II Clinical Trials</SelectItem>
                            <SelectItem value="phase3">Phase III Clinical Trials</SelectItem>
                            <SelectItem value="regulatory">Regulatory Submission</SelectItem>
                            <SelectItem value="commercialization">Commercialization</SelectItem>
                            <SelectItem value="planning">Early Planning Stage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="fundingNeeds">Estimated Funding Needs</Label>
                        <Select 
                          value={formData.fundingNeeds}
                          onValueChange={(value) => setFormData({ ...formData, fundingNeeds: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select funding range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-250k">Under $250K</SelectItem>
                            <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                            <SelectItem value="1m-3m">$1M - $3M</SelectItem>
                            <SelectItem value="3m-10m">$3M - $10M</SelectItem>
                            <SelectItem value="over-10m">Over $10M</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="challenges">Biggest Life Sciences Funding Challenge (Optional)</Label>
                        <Textarea 
                          id="challenges" 
                          value={formData.challenges}
                          onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                          placeholder="What's your biggest challenge with biotech grant applications, clinical trials funding, or medical device regulatory pathways?"
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <p className="text-red-800 text-sm">{error}</p>
                        </div>
                      )}

                      <div className="text-xs text-gray-500">
                        <label className="flex items-start space-x-2">
                          <input type="checkbox" className="mt-1" required />
                          <span>
                            I agree to receive email communications about life sciences funding opportunities, 
                            biotech grants, clinical trials funding, and related health innovation programs. You can unsubscribe at any time.
                          </span>
                        </label>
                      </div>

                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5 mr-2" />
                            Download Free Life Sciences Toolkit Now
                          </>
                        )}
                      </Button>
                    </form>

                    <div className="mt-6 text-center">
                      <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                        <span>🔒 100% Secure</span>
                        <span>📧 No Spam</span>
                        <span>🎯 Instant Access</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="mt-8 text-center">
                    <h4 className="font-semibold text-gray-800 mb-4">Trusted by Life Sciences Leaders</h4>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-teal-600">$95M+</div>
                        <div>Biotech Grants Secured</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-teal-600">76%</div>
                        <div>Success Rate</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-teal-600">2,200+</div>
                        <div>Downloads</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                What Life Sciences Innovators Say
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The IRAP biotech templates and clinical trial checklist helped us secure $420K 
                    for our rare disease drug development. The regulatory guidance was spot-on."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                      <Microscope className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Dr. Rachel Chen</div>
                      <div className="text-sm text-gray-500">CSO, GeneTheraPharma</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The medical device regulatory tools and MDEL templates saved us months. 
                    We navigated Health Canada approval smoothly for our Class III device."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                      <Stethoscope className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Michael Rodriguez</div>
                      <div className="text-sm text-gray-500">CEO, MedDevice Solutions</div>
                    </div>
                  </div>
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
