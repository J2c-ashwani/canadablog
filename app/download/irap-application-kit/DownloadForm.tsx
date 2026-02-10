"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, Loader2, Shield } from "lucide-react"

export function DownloadForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    contactNumber: "",
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
          company: formData.companyName,
          guideName: "IRAP Application Kit",
          industry: "Technology/R&D",
          country: "Canada",
          additionalNotes: `Phone: ${formData.contactNumber || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/irap-application-kit/thank-you")
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
    <Card className="shadow-lg border-emerald-200">
      <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl">
          Download Your Free R&D Kit
        </CardTitle>
        <p className="text-sm text-emerald-100 mt-2">
          Get instant access to all templates and frameworks
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Business Email Address *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@techcompany.com"
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
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="Your Tech Company Inc."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="contactNumber">Contact Number *</Label>
            <Input
              id="contactNumber"
              type="tel"
              required
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className="mt-1"
            />
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
              I agree to receive the IRAP application kit and occasional emails about 
              Canadian R&D funding opportunities. I can unsubscribe at any time.
            </label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Get Free R&D Application Kit
              </>
            )}
          </Button>

          <p className="text-xs text-center text-gray-500 mt-3">
            🔒 Your information is secure and never shared
          </p>
        </form>

        <div className="mt-6 pt-6 border-t">
          <p className="text-center text-sm text-gray-600 mb-2">
            <strong>Instant Download + R&D Expert Review</strong>
          </p>
          <div className="flex items-center justify-center text-xs text-gray-500">
            <Shield className="w-3 h-3 mr-1" />
            <span>SSL Encrypted • PIPEDA Compliant</span>
          </div>
        </div>

        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          <div className="text-center text-xs text-emerald-700">
            <strong>Bonus:</strong> Get matched with the right ITA for your project
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
