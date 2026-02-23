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
import { CheckCircle, Download, FileText, Calculator, Users, Building, Shield, Loader2 } from "lucide-react"
import Link from "next/link"

export default function SREDDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    rdBudget: "",
    sredExperience: "",
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
          guideName: "SR&ED Application Kit",
          industry: "R&D/Technology",
          country: "Canada",
          additionalNotes: `Role: ${formData.role}, R&D Budget: ${formData.rdBudget}, SR&ED Experience: ${formData.sredExperience}, Challenges: ${formData.challenges || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/sred-application-kit/thank-you")
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
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                💰 Free Download
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SR&ED Tax Credit Application Toolkit
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Get instant access to comprehensive SR&ED application templates, Form T661 guides, and expert strategies 
                used by successful R&D companies to secure $45M+ in tax credits with 96% success rate.
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included in Your SR&ED Toolkit</h2>
                  
                  <div className="space-y-6">
                    <Card className="border-green-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-green-700">Application Templates & Forms</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Form T661 Line-by-Line Guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Project Description Templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Technical Content Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Work Performed Documentation Template</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Calculator className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-blue-700">Financial Tools & Calculators</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>SR&ED Credit Calculator (Excel)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Expense Tracking Spreadsheet</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Provincial Stacking Calculator</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Time Allocation Worksheet</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Shield className="w-6 h-6 text-purple-600 mr-3" />
                          <CardTitle className="text-purple-700">2026 Enhanced Rates Guide</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>$4.5M Enhanced Rate Limit Guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>ECPC Eligibility Checklist (NEW)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Capital Equipment Credits (Restored)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Provincial Credits Optimization</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Users className="w-6 h-6 text-orange-600 mr-3" />
                          <CardTitle className="text-orange-700">Expert Strategies & CRA Defense</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>CRA Audit Defense Checklist</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Documentation Best Practices</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Success Tips from $45M+ in Credits</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Common Rejection Avoidance Guide</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 bg-green-50 border border-green-200 p-6 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Bonus: Expert Consultation Offer</h4>
                    <p className="text-green-700 text-sm">
                      Download includes a complimentary 30-minute SR&ED strategy consultation with our specialists 
                      who have secured $45M+ in tax credits with 96% success rate.
                    </p>
                  </div>
                </div>

                {/* Right - Lead Capture Form */}
                <div>
                  <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg sticky top-8">
                    <div className="text-center mb-6">
                      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Your Free SR&ED Toolkit</h3>
                      <p className="text-gray-600">Join 3,200+ R&D leaders who've accessed our SR&ED resources</p>
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
                        <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })} required>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ceo">CEO/President</SelectItem>
                            <SelectItem value="cto">CTO/VP Technology</SelectItem>
                            <SelectItem value="cfo">CFO/Finance Director</SelectItem>
                            <SelectItem value="rd">R&D Manager/Director</SelectItem>
                            <SelectItem value="tax">Tax Manager/Accountant</SelectItem>
                            <SelectItem value="consultant">Consultant</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="rdBudget">Annual R&D Budget</Label>
                        <Select value={formData.rdBudget} onValueChange={(value) => setFormData({ ...formData, rdBudget: value })}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select R&D budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-100k">Under $100K</SelectItem>
                            <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                            <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                            <SelectItem value="5m-plus">$5M+</SelectItem>
                            <SelectItem value="planning">Planning R&D activities</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="sredExperience">SR&ED Experience</Label>
                        <Select value={formData.sredExperience} onValueChange={(value) => setFormData({ ...formData, sredExperience: value })}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your SR&ED experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="first-time">First time applying</SelectItem>
                            <SelectItem value="some-experience">Filed 1-3 claims</SelectItem>
                            <SelectItem value="experienced">Filed 4+ claims</SelectItem>
                            <SelectItem value="annual">File annually</SelectItem>
                            <SelectItem value="consultant">File for clients</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="challenges">Biggest SR&ED Challenge (Optional)</Label>
                        <Textarea 
                          id="challenges"
                          value={formData.challenges}
                          onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                          placeholder="What's your biggest concern about the SR&ED application process?"
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
                            I agree to receive email communications about SR&ED tax credits and 
                            related R&D funding opportunities. You can unsubscribe at any time.
                          </span>
                        </label>
                      </div>

                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-600 hover:bg-green-700 text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5 mr-2" />
                            Download Free SR&ED Toolkit Now
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
                    <h4 className="font-semibold text-gray-800 mb-4">Trusted by R&D Leaders</h4>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-green-600">$45M+</div>
                        <div>Credits Secured</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-green-600">96%</div>
                        <div>Success Rate</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-green-600">3,200+</div>
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
                What R&D Leaders Say
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The SR&ED toolkit saved us weeks of preparation time. The Form T661 guide was 
                    incredibly detailed and helped us secure $320K in our first claim."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Building className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Jennifer Park</div>
                      <div className="text-sm text-gray-500">CTO, TechInnovate Solutions</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The provincial stacking calculator helped us identify an additional $85K in 
                    tax credits we would have missed. Excellent resource!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Building className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold">David Thompson</div>
                      <div className="text-sm text-gray-500">CFO, MedTech Innovations</div>
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
