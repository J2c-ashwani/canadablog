"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ExternalLink, Download } from "lucide-react"

interface GrantDeadline {
  id: string
  name: string
  agency: string
  deadline: string
  amount: string
  category: string
  link: string
  daysUntil: number
}

const upcomingDeadlines: GrantDeadline[] = [
  {
    id: "1",
    name: "SBIR Phase I",
    agency: "NSF",
    deadline: "2025-02-15",
    amount: "$275K",
    category: "Technology",
    link: "https://www.nsf.gov/funding/programs/sbir/",
    daysUntil: 45,
  },
  {
    id: "2",
    name: "Rural Business Development Grant",
    agency: "USDA",
    deadline: "2025-03-01",
    amount: "$500K",
    category: "Rural Development",
    link: "https://www.rd.usda.gov/programs-services/business-programs/rural-business-development-grants",
    daysUntil: 59,
  },
  {
    id: "3",
    name: "Minority Business Enterprise",
    agency: "SBA",
    deadline: "2025-03-15",
    amount: "$150K",
    category: "Minority Business",
    link: "https://www.sba.gov/funding-programs/grants",
    daysUntil: 73,
  },
  {
    id: "4",
    name: "Clean Energy Innovation",
    agency: "DOE",
    deadline: "2025-04-01",
    amount: "$1M",
    category: "Clean Energy",
    link: "https://www.energy.gov/funding-opportunities",
    daysUntil: 90,
  },
]

export function GrantDeadlineCalendar() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", "Technology", "Rural Development", "Minority Business", "Clean Energy"]

  const filteredDeadlines =
    selectedCategory === "all"
      ? upcomingDeadlines
      : upcomingDeadlines.filter((grant) => grant.category === selectedCategory)

  const generateICSFile = (grant: GrantDeadline) => {
    const startDate = new Date(grant.deadline)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // 1 hour duration

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    }

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Grant Finder Pro//Grant Deadline//EN
BEGIN:VEVENT
UID:${grant.id}@grantfinder.pro
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${grant.name} Grant Deadline
DESCRIPTION:Grant: ${grant.name}\\nAgency: ${grant.agency}\\nAmount: ${grant.amount}\\nMore info: ${grant.link}
LOCATION:Online Application
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${grant.name.replace(/\s+/g, "-")}-deadline.ics`
    link.click()
    URL.revokeObjectURL(url)
  }

  const getUrgencyColor = (daysUntil: number) => {
    if (daysUntil <= 30) return "bg-red-100 text-red-800"
    if (daysUntil <= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-green-100 text-green-800"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle>Grant Deadline Calendar</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Generate ICS file for all deadlines
              const allICS = upcomingDeadlines.map((grant) => generateICSFile(grant))
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === "all" ? "All Categories" : category}
            </Button>
          ))}
        </div>

        {/* Deadline List */}
        <div className="space-y-4">
          {filteredDeadlines.map((grant) => (
            <div
              key={grant.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold">{grant.name}</h3>
                  <Badge variant="secondary" className={getUrgencyColor(grant.daysUntil)}>
                    <Clock className="mr-1 h-3 w-3" />
                    {grant.daysUntil} days
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>
                    Agency: {grant.agency} • Amount: {grant.amount}
                  </div>
                  <div>Deadline: {new Date(grant.deadline).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => generateICSFile(grant)}>
                  <Download className="mr-2 h-4 w-4" />
                  Add to Calendar
                </Button>
                <Button variant="default" size="sm" onClick={() => window.open(grant.link, "_blank")}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Apply
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredDeadlines.length === 0 && (
          <div className="text-center py-8 text-gray-500">No deadlines found for the selected category.</div>
        )}
      </CardContent>
    </Card>
  )
}
