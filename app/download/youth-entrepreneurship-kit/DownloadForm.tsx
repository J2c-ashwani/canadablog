"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Download, Shield, Zap, Users, TrendingUp, Loader2 } from "lucide-react"
import Link from "next/link"

export function DownloadForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    age: '',
    contactNumber: '',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

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
          name: formData.companyName, // Using company name as name field
          company: formData.companyName,
          guideName: "Youth Entrepreneurship Funding Kit (CYBF)",
          industry: "Youth Entrepreneurship",
          country: "Canada",
          additionalNotes: `Age Range: ${formData.age || "N/A"}, Contact: ${formData.contactNumber}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/youth-entrepreneurship-funding-kit/thank-you")
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
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-gray-900">
          Download Your Free Youth Funding Kit
        </CardTitle>
        <p className="text-gray-600">
          Get instant access to all CYBF templates and strategies
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="alex@youngstartup.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="companyName" className="text-sm font-medium">
              Business Name (or Idea) *
            </Label>
            <Input
              id="companyName"
              name="companyName"
              type="text"
              required
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Your Young Business Idea"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="age" className="text-sm font-medium">
              Your Age *
            </Label>
            <select
              id="age"
              name="age"
              required
              value={formData.age}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select your age range</option>
              <option value="18-22">18-22 years (Student/Recent Graduate)</option>
              <option value="23-27">23-27 years (Early Career)</option>
              <option value="28-32">28-32 years (Young Professional)</option>
              <option value="33-39">33-39 years (Experienced Young Entrepreneur)</option>
            </select>
          </div>

          <div>
            <Label htmlFor="contactNumber" className="text-sm font-medium">
              Phone Number *
            </Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              required
              value={formData.contactNumber}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              className="mt-1"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="flex items-start">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              checked={formData.consent}
              onChange={handleInputChange}
              className="mt-1 mr-3"
            />
            <Label htmlFor="consent" className="text-xs text-gray-600 leading-tight">
              I agree to receive the youth entrepreneurship kit and occasional emails about 
              Canadian young entrepreneur funding opportunities. I can unsubscribe at any time.
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Preparing Your Youth Kit...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Get Free Youth Funding Kit
              </>
            )}
          </Button>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              🔒 Your information is secure and never shared
            </p>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t">
          <p className="text-center text-sm text-gray-600 mb-4">
            <strong>Instant Download + Youth Business Expert Review</strong>
          </p>
          <div className="flex items-center justify-center text-xs text-gray-500">
            <Shield className="w-3 h-3 mr-1" />
            <span>SSL Encrypted • PIPEDA Compliant</span>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="text-center text-xs text-blue-700">
            <strong>Special Bonus:</strong> Connect with young entrepreneur mentors and CYBF alumni networks
          </div>
        </div>

        <div className="mt-4 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-3">
          <div className="text-center text-xs">
            <strong className="text-indigo-700">🎓 Youth-Focused:</strong> 
            <span className="text-gray-600"> Specialized support for Canadian entrepreneurs aged 18-35</span>
          </div>
        </div>

        <div className="mt-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3">
          <div className="text-center text-xs">
            <strong className="text-green-700">🚀 Perfect For:</strong> 
            <span className="text-gray-600"> Students, recent grads, and first-time entrepreneurs</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
