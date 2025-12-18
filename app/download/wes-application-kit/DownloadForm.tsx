"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Download, Shield, Heart, Users, Award, Loader2 } from "lucide-react"
import Link from "next/link"

export function DownloadForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    contactNumber: '',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
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
          guideName: "Women's Entrepreneurship Strategy (WES) Kit",
          industry: "Women-Owned Business",
          country: "Canada",
          additionalNotes: `Contact Number: ${formData.contactNumber}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to success page or show success state
        router.push("/download/wes-funding-kit/thank-you")
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
          Download Your Free Women's Funding Kit
        </CardTitle>
        <p className="text-gray-600">
          Get instant access to all WES templates and strategies
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Business Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="sarah@womenbusiness.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="companyName" className="text-sm font-medium">
              Women-Owned Business Name *
            </Label>
            <Input
              id="companyName"
              name="companyName"
              type="text"
              required
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Your Women-Owned Business Inc."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="contactNumber" className="text-sm font-medium">
              Contact Number *
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
              I agree to receive the WES application kit and occasional emails about 
              Canadian women entrepreneurship funding opportunities. I can unsubscribe at any time.
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-rose-600 hover:bg-rose-700" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Preparing Your Women's Kit...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Get Free Women's Funding Kit
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
            <strong>Instant Download + Women Business Expert Review</strong>
          </p>
          <div className="flex items-center justify-center text-xs text-gray-500">
            <Shield className="w-3 h-3 mr-1" />
            <span>SSL Encrypted • PIPEDA Compliant</span>
          </div>
        </div>

        <div className="mt-4 bg-rose-50 border border-rose-200 rounded-lg p-3">
          <div className="text-center text-xs text-rose-700">
            <strong>Special Bonus:</strong> Connect with women entrepreneur mentors and female business networks
          </div>
        </div>

        <div className="mt-4 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-3">
          <div className="text-center text-xs">
            <strong className="text-pink-700">👩‍💼 Women-Focused:</strong> 
            <span className="text-gray-600"> Specialized support for female entrepreneurs across Canada</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
