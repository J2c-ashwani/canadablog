"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Download, Shield } from "lucide-react"
import Link from "next/link"

export function DownloadForm() {
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    contactNumber: '',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Success! Your CSBFP Kit is Ready
          </h3>
          <p className="text-gray-600 mb-6">
            Check your email for the download link. We've sent your complete CSBFP application kit to <strong>{formData.email}</strong>
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold mb-3">What's Next?</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>Download will start automatically in your email</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>Our experts will contact you within 24 hours</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>Free consultation to review your application strategy</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/guides/apply-csbfp-loans">
                View Application Guide
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact?service=csbfp-expert-help">
                Book Expert Consultation
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-gray-900">
          Download Your Free Kit
        </CardTitle>
        <p className="text-gray-600">
          Get instant access to all templates and guides
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
              placeholder="john@yourcompany.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="companyName" className="text-sm font-medium">
              Company Name *
            </Label>
            <Input
              id="companyName"
              name="companyName"
              type="text"
              required
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Your Company Inc."
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
              I agree to receive the CSBFP application kit and occasional emails about 
              Canadian business funding opportunities. I can unsubscribe at any time.
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
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Preparing Your Kit...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Get Free Application Kit
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
            <strong>Instant Download + Expert Review</strong>
          </p>
          <div className="flex items-center justify-center text-xs text-gray-500">
            <Shield className="w-3 h-3 mr-1" />
            <span>SSL Encrypted • PIPEDA Compliant</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
