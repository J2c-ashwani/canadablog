import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight, Clock, ShieldAlert, CheckCircle2, PauseCircle, Compass } from "lucide-react"
import Link from "next/link"
import { getAllPrograms } from "@/lib/data/programs"
import EEATBadge from "@/components/blog/EEATBadge"

export const metadata: Metadata = {
  title: "Government Funding Intake Calendar (2026) | FSI Digital",
  description: "Real-time intake calendar tracking open, upcoming, paused, and closed government grants and business funding deadlines in Canada and the USA.",
  alternates: {
    canonical: "https://www.fsidigital.ca/calendar",
  },
  robots: { index: true, follow: true },
}

export default function IntakeCalendarPage() {
  const programs = getAllPrograms()

  // Sort programs: Open first, then Upcoming, then Paused, then Closed
  const statusWeight = {
    'Open': 0,
    'Upcoming': 1,
    'Paused': 2,
    'Closed': 3
  }

  const sortedPrograms = [...programs].sort((a, b) => {
    return statusWeight[a.status] - statusWeight[b.status]
  })

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />

      <main className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Header */}
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex p-3 bg-emerald-50 rounded-2xl text-emerald-700 mb-2">
              <Calendar className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Funding Intake Calendar
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real-time monitoring of open cycles, upcoming windows, and temporary program pauses across municipal, provincial, state, and federal bodies.
            </p>
          </div>

          {/* E-E-A-T Review Badge */}
          <div className="flex justify-center mb-10">
            <EEATBadge authorName="Ashwani Kumar" authorImage="/author-ashwani.jpg" date="2026-06-09" />
          </div>

          {/* Status Key */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Open:</strong> Active intakes accepting submissions</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <span><strong>Upcoming:</strong> Confirmed future intakes</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <PauseCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span><strong>Paused:</strong> Cap reached or in transition</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span><strong>Closed:</strong> Inactive for current period</span>
            </div>
          </div>

          {/* Programs List */}
          <div className="space-y-4">
            {sortedPrograms.map((prog) => {
              return (
                <Card key={prog.id} className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-2xl overflow-hidden">
                  <CardContent className="p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                    
                    {/* Main Details */}
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <Badge className={
                          prog.status === 'Open' ? 'bg-emerald-500 hover:bg-emerald-500 text-slate-950 border-none font-bold text-[10px]' :
                          prog.status === 'Upcoming' ? 'bg-blue-500 hover:bg-blue-500 text-white border-none font-bold text-[10px]' :
                          prog.status === 'Paused' ? 'bg-amber-500 hover:bg-amber-500 text-slate-950 border-none font-bold text-[10px]' :
                          'bg-rose-500 hover:bg-rose-500 text-white border-none font-bold text-[10px]'
                        }>
                          {prog.status}
                        </Badge>
                        <span className="text-xs text-slate-400 font-semibold uppercase">
                          {prog.region === 'Federal' ? `${prog.country} Federal` : `${prog.region} Provincial/State`}
                        </span>
                        <span className="text-xs text-slate-300">|</span>
                        <span className="text-xs text-slate-400 font-bold">
                          {prog.deadlineType}
                        </span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-bold text-slate-950">
                        {prog.name}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed truncate max-w-xl sm:max-w-2xl">
                        {prog.description}
                      </p>

                      {prog.recentChanges && prog.recentChanges.length > 0 && (
                        <p className="text-[11px] text-emerald-800 font-semibold bg-emerald-50/40 border border-emerald-100/40 rounded-lg px-2.5 py-1 inline-block">
                          Latest: {prog.recentChanges[0]}
                        </p>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="flex flex-col items-start sm:items-end gap-1 shrink-0 self-start md:self-center">
                      <span className="text-xs text-slate-400 font-semibold">Value Allocation</span>
                      <span className="text-sm font-extrabold text-slate-900 mb-2">{prog.fundingAmount}</span>
                      <Link 
                        href={`/programs/${prog.slug}`} 
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-slate-50 hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-200 px-4 py-2 rounded-xl transition-all"
                      >
                        Details <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </CardContent>
                </Card>
              )
            })}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
