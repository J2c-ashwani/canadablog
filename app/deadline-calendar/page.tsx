import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantDeadlineCalendar } from "@/components/grant-deadline-calendar"
import { PushNotificationSetup } from "@/components/push-notification-setup"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Bell } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Grant Deadlines Calendar 2026: Never Miss a Deadline [Free]",
  description:
    "Track USA grant deadlines with our interactive calendar. Get deadline alerts, export to Google Calendar, and never miss a funding opportunity.",
  keywords:
    "USA grant deadlines 2025, grant calendar, funding deadlines, grant deadline alerts, government grant calendar",
  alternates: {
    canonical: "https://www.fsidigital.ca/deadline-calendar",
  },
}

export default function DeadlineCalendarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calendar className="h-6 w-6 text-primary" />
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Interactive Calendar
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">USA Grant Deadlines 2026</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Stay on top of grant deadlines with our interactive calendar. Track upcoming opportunities, set reminders,
              and export deadlines to your calendar.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Interactive Calendar</CardTitle>
                <CardDescription>View all grant deadlines in an easy-to-use calendar format</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>• Filter by category and agency</li>
                  <li>• Color-coded urgency levels</li>
                  <li>• Detailed grant information</li>
                  <li>• Direct application links</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Deadline Alerts</CardTitle>
                <CardDescription>Never miss a deadline with automated reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>• Push notifications</li>
                  <li>• Email reminders</li>
                  <li>• Customizable alert timing</li>
                  <li>• Mobile-friendly alerts</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Bell className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Calendar Export</CardTitle>
                <CardDescription>Export deadlines to Google Calendar, Outlook, or Apple Calendar</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>• ICS file format</li>
                  <li>• Automatic updates</li>
                  <li>• Sync across devices</li>
                  <li>• Bulk export options</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Calendar */}
          <div className="mb-12">
            <GrantDeadlineCalendar />
          </div>

          {/* Sidebar Content */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>How to Use the Grant Deadline Calendar</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <h3>Stay Organized with Grant Deadlines</h3>
                  <p>
                    Our interactive grant deadline calendar helps you track all important funding opportunities in one
                    place. Use the filtering options to focus on grants relevant to your business or industry.
                  </p>

                  <h3>Color-Coded Urgency System</h3>
                  <ul>
                    <li>
                      <strong>Red badges</strong> - Deadlines within 30 days (urgent action required)
                    </li>
                    <li>
                      <strong>Yellow badges</strong> - Deadlines within 60 days (start preparing)
                    </li>
                    <li>
                      <strong>Green badges</strong> - Deadlines beyond 60 days (plan ahead)
                    </li>
                  </ul>

                  <h3>Export to Your Calendar</h3>
                  <p>
                    Click "Add to Calendar" for any grant to download an ICS file that works with Google Calendar,
                    Outlook, Apple Calendar, and other calendar applications. This ensures you never miss a deadline.
                  </p>

                  <h3>Set Up Notifications</h3>
                  <p>
                    Enable push notifications to receive alerts about upcoming deadlines and new grant opportunities.
                    You can customize when you receive these alerts based on your preferences.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <PushNotificationSetup />
              <NewsletterSignup variant="sidebar" />
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mb-8">
            <NewsletterSignup
              title="Get Deadline Reminders"
              description="Receive weekly deadline alerts and never miss a grant opportunity"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
