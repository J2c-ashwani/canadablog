"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Search, 
  Filter, 
  ArrowRight, 
  MapPin, 
  Globe2, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Database, 
  HelpCircle, 
  Activity, 
  X,
  SlidersHorizontal
} from "lucide-react"
import Link from "next/link"
import { getAllPrograms } from "@/lib/data/programs"
import EEATBadge from "@/components/blog/EEATBadge"

export default function DatabaseClient() {
  const programs = useMemo(() => getAllPrograms(), [])

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("All")
  const [selectedRegion, setSelectedRegion] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [showFiltersMobile, setShowFiltersMobile] = useState(false)

  // Dynamic Regions List
  const uniqueRegions = useMemo(() => {
    const regions = new Set<string>()
    programs.forEach(p => {
      if (p.region && p.region !== "Federal") {
        regions.add(p.region)
      }
    })
    return Array.from(regions).sort()
  }, [programs])

  // Dynamic Funding Types List
  const uniqueTypes = useMemo(() => {
    const types = new Set<string>()
    programs.forEach(p => {
      if (p.fundingType) {
        types.add(p.fundingType)
      }
    })
    return Array.from(types).sort()
  }, [programs])

  // Filtered Programs
  const filteredPrograms = useMemo(() => {
    return programs.filter(prog => {
      // 1. Search Query Match
      const matchesSearch = searchQuery === "" || 
        prog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prog.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prog.description.toLowerCase().includes(searchQuery.toLowerCase())

      // 2. Country Match
      const matchesCountry = selectedCountry === "All" || prog.country === selectedCountry

      // 3. Region Match
      const matchesRegion = selectedRegion === "All" || prog.region === selectedRegion

      // 4. Funding Type Match
      const matchesType = selectedType === "All" || prog.fundingType === selectedType

      // 5. Difficulty Match
      const matchesDifficulty = selectedDifficulty === "All" || prog.fundingDifficulty === selectedDifficulty

      // 6. Status Match
      const matchesStatus = selectedStatus === "All" || prog.status === selectedStatus

      return matchesSearch && matchesCountry && matchesRegion && matchesType && matchesDifficulty && matchesStatus
    })
  }, [programs, searchQuery, selectedCountry, selectedRegion, selectedType, selectedDifficulty, selectedStatus])

  // Reset Filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCountry("All")
    setSelectedRegion("All")
    setSelectedType("All")
    setSelectedDifficulty("All")
    setSelectedStatus("All")
  }

  // Weight weights for sorting
  const statusWeight = {
    'Open': 0,
    'Upcoming': 1,
    'Paused': 2,
    'Closed': 3
  }

  const sortedPrograms = useMemo(() => {
    return [...filteredPrograms].sort((a, b) => {
      return (statusWeight[a.status] ?? 0) - (statusWeight[b.status] ?? 0)
    })
  }, [filteredPrograms])

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex p-3 bg-blue-500/10 border border-blue-500/25 rounded-2xl text-blue-400 mb-2">
              <Database className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Government Funding Database
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Search and filter through <span className="text-emerald-400 font-bold">{programs.length}+</span> government grants, loans, tax credits, and subsidies across Canada and the US.
            </p>

            <div className="flex justify-center pt-2">
              <EEATBadge authorName="Ashwani Kumar" authorImage="/author-ashwani.jpg" date="2026-06-09" />
            </div>
          </div>

          {/* Search & Filter bar */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 mb-8 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search input */}
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search grants, tax credits, agency names, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                className="md:hidden w-full border-slate-800 text-slate-300 bg-slate-900 hover:bg-slate-800"
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {showFiltersMobile ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>

            {/* Faceted Filters Grid (Desktop & Mobile Conditional) */}
            <div className={`mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 ${showFiltersMobile ? "block" : "hidden md:grid"}`}>
              {/* Country */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Country</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value)
                    setSelectedRegion("All") // Reset region when country changes
                  }}
                  className="w-full h-10 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Countries</option>
                  <option value="Canada">🍁 Canada</option>
                  <option value="USA">🇺🇸 USA</option>
                </select>
              </div>

              {/* Region */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">State / Province</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Regions</option>
                  <option value="Federal">Federal Programs</option>
                  {uniqueRegions
                    .filter(region => {
                      if (selectedCountry === "Canada") {
                        // Canadian provinces only
                        return ["Ontario", "British Columbia", "Alberta", "Quebec", "Manitoba", "Saskatchewan", "Nova Scotia", "New Brunswick", "Newfoundland and Labrador", "Prince Edward Island"].includes(region)
                      }
                      if (selectedCountry === "USA") {
                        // US states only
                        return !["Ontario", "British Columbia", "Alberta", "Quebec", "Manitoba", "Saskatchewan", "Nova Scotia", "New Brunswick", "Newfoundland and Labrador", "Prince Edward Island"].includes(region)
                      }
                      return true
                    })
                    .map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                </select>
              </div>

              {/* Funding Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Funding Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Types</option>
                  {uniqueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Levels</option>
                  <option value="Low">Low Difficulty</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Competitive">Highly Competitive</option>
                </select>
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Intake Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Paused">Paused</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Filter tags & Reset */}
            <div className="mt-6 pt-6 border-t border-slate-900/60 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Activity className="h-4 w-4 text-blue-400" />
                <span>Found <strong className="text-white">{filteredPrograms.length}</strong> matching programs</span>
              </div>

              {(searchQuery || selectedCountry !== "All" || selectedRegion !== "All" || selectedType !== "All" || selectedDifficulty !== "All" || selectedStatus !== "All") && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Reset Active Filters <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Programs Grid */}
          {sortedPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {sortedPrograms.map((prog) => {
                const isUS = prog.country === "USA"
                return (
                  <Card 
                    key={prog.id} 
                    className="border border-slate-800 bg-slate-950/60 hover:border-slate-700/80 hover:bg-slate-950/90 transition-all duration-200 flex flex-col justify-between rounded-2xl overflow-hidden group shadow-lg"
                  >
                    <div>
                      {/* Card Header badges */}
                      <CardHeader className="p-5 pb-2 space-y-0 flex flex-row justify-between items-start">
                        <div className="flex flex-wrap gap-1.5">
                          <Badge variant="outline" className="border-slate-800 bg-slate-900 text-slate-300 text-[9px] font-bold py-0.5 px-2">
                            {isUS ? "🇺🇸 USA" : "🍁 Canada"}
                          </Badge>
                          <Badge variant="outline" className="border-slate-800 bg-slate-900 text-slate-300 text-[9px] font-bold py-0.5 px-2">
                            {prog.region === "Federal" ? "Federal" : prog.region}
                          </Badge>
                        </div>
                        <Badge className={
                          prog.status === 'Open' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[9px] py-0.5 px-2' :
                          prog.status === 'Upcoming' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold text-[9px] py-0.5 px-2' :
                          prog.status === 'Paused' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold text-[9px] py-0.5 px-2' :
                          'bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold text-[9px] py-0.5 px-2'
                        }>
                          {prog.status}
                        </Badge>
                      </CardHeader>

                      {/* Card Main Info */}
                      <CardContent className="p-5 pt-2 space-y-3">
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                            {prog.agency}
                          </span>
                          <h2 className="text-lg font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">
                            {prog.name}
                          </h2>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                          {prog.description}
                        </p>

                        <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-400 border-t border-slate-900">
                          <div>
                            <span className="text-slate-500 font-semibold block text-[10px] uppercase">Difficulty</span>
                            <span className="font-semibold text-slate-200">{prog.fundingDifficulty}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 font-semibold block text-[10px] uppercase">Type</span>
                            <span className="font-semibold text-slate-200">{prog.fundingType}</span>
                          </div>
                        </div>
                      </CardContent>
                    </div>

                    {/* Card Footer Action */}
                    <CardFooter className="p-5 pt-0 border-t border-slate-900 mt-auto flex justify-between items-center bg-slate-950/40">
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Allocation</span>
                        <span className="text-sm font-extrabold text-white">{prog.fundingAmount}</span>
                      </div>
                      <Link 
                        href={`/programs/${prog.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Program Guide
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16 border border-slate-800 bg-slate-950/20 rounded-3xl mb-12">
              <HelpCircle className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white">No Programs Match Your Filters</h3>
              <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
                Try widening your filters or search keywords. You can also reset all active filters to start over.
              </p>
              <Button 
                onClick={resetFilters}
                className="mt-6 bg-slate-800 hover:bg-slate-700 text-white font-semibold"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Moat Building CTA Section */}
          <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 border border-blue-500/20 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden mb-12">
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <div className="inline-flex p-3 bg-blue-500/15 border border-blue-400/20 rounded-2xl text-blue-400">
                <Sparkles className="w-6 h-6 animate-pulse text-yellow-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Unlock Your Custom Funding Roadmap
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Take our 5-minute pre-qualification eligibility audit. Our vetted intelligence team will cross-reference your business profile with all federal and regional grants to build your custom timeline.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
                <Link href="/consultation" className="w-full sm:w-auto">
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-6 rounded-xl transition-all shadow-lg shadow-blue-600/20">
                    Book Strategy Session & Audit
                  </Button>
                </Link>
                <Link href="/grant-finder" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full border-slate-700 hover:border-slate-600 text-slate-300 bg-slate-900/40 hover:bg-slate-900 font-bold px-8 py-6 rounded-xl transition-all">
                    Run Free Grant Finder
                  </Button>
                </Link>
              </div>
              <p className="text-[11px] text-slate-500">
                * 100% risk-free. If our audit reveals zero eligibility, we refund your booking cost immediately.
              </p>
            </div>
          </div>

          {/* Affiliation Disclosure Box */}
          <div className="border border-slate-800 bg-slate-950/40 rounded-2xl p-6 text-slate-500 text-xs space-y-2.5 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-slate-400 font-semibold">
              <AlertTriangle className="h-4 w-4 text-amber-500/80 shrink-0" />
              <span>Government Non-Affiliation & Editorial Disclosure</span>
            </div>
            <p className="leading-relaxed">
              <strong>Government Non-Affiliation:</strong> FSI Digital (fsidigital.ca) is a private, independent media publication and technology service provider. We are <strong>not affiliated with, sponsored by, or endorsed by</strong> the Government of Canada, the National Research Council (NRC), the Canada Revenue Agency (CRA), the United States Small Business Administration (SBA), or any other municipal, regional, state, provincial, or federal government department, agency, or crown corporation.
            </p>
            <p className="leading-relaxed">
              <strong>Accuracy & Advice:</strong> While we work continuously to keep program summaries, rules, deadlines, and requirements updated, government policies change regularly. Program information displayed on this directory should not be considered official legal or financial advice. Always consult official ministry portals or a qualified funding specialist before submitting program filings.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
