"use client"

import { useState, useEffect } from "react"
import { type Grant } from "@/lib/grants-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Calendar, DollarSign, MapPin, Building, BookOpen } from "lucide-react"
import Link from "next/link"

function formatFundingRange(min?: number, max?: number): string {
  const safeMin = typeof min === "number" && !isNaN(min) ? min : undefined
  const safeMax = typeof max === "number" && !isNaN(max) ? max : undefined
  if (safeMin != null && safeMax != null) {
    return `$${safeMin.toLocaleString()} - $${safeMax.toLocaleString()}`
  }
  if (safeMin != null) return `$${safeMin.toLocaleString()}`
  if (safeMax != null) return `$${safeMax.toLocaleString()}`
  return "N/A"
}

// existing guide url logic as before
function generateGuideUrl(grantName: string) {
  const name = grantName?.toLowerCase() ?? ""
  if (name.includes("sbir")) return "/guides/sbir-research-grants-guide"
  if (name.includes("sba-growth-accelerator-fund") || name.includes("growth-accelerator-fund")) return "/guides/sba-growth-accelerator-fund-guide"
  if (name.includes("california-small-business-loan-guarantee") || name.includes("california-loan-guarantee")) return "/guides/california-loan-guarantee-guide"
  if (name.includes("sttr")) return "/guides/apply-sbir-grants"
  if (name.includes("sba")) return "/guides/apply-sba-loans"
  if (name.includes("women") || name.includes("minority") || name.includes("veteran")) return "/guides/apply-minority-grants"
  if (name.includes("energy")) return "/guides/apply-doe-clean-energy-grants"
  if (name.includes("innovation") || name.includes("research")) return "/guides/apply-federal-grants"
  return "/guides/apply-federal-grants"
}

interface GrantComparisonTableProps {
  grants: Grant[]
  title?: string
  showFilters?: boolean
}

export function GrantComparisonTable({
  grants,
  title = "Grant Comparison",
  showFilters = true,
}: GrantComparisonTableProps) {
  const [filteredGrants, setFilteredGrants] = useState(grants)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const categories = Array.from(new Set(grants.map((g) => g.category).filter(Boolean)))
  const regions = Array.from(new Set(grants.map((g) => g.region).filter(Boolean)))
  const statuses = Array.from(new Set(grants.map((g) => g.status).filter(Boolean)))

  useEffect(() => {
    let filtered = grants
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (g) =>
          (g.name ?? "").toLowerCase().includes(query) ||
          (g.description ?? "").toLowerCase().includes(query) ||
          (g.category ?? "").toLowerCase().includes(query) ||
          (g.agency ?? "").toLowerCase().includes(query)
      )
    }
    if (categoryFilter !== "all") filtered = filtered.filter((g) => g.category === categoryFilter)
    if (regionFilter !== "all") filtered = filtered.filter((g) => g.region === regionFilter)
    if (statusFilter !== "all") filtered = filtered.filter((g) => g.status === statusFilter)
    setFilteredGrants(filtered)
  }, [searchQuery, categoryFilter, regionFilter, statusFilter, grants])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Badge variant="secondary" className="text-sm">{filteredGrants.length} grants found</Badge>
      </div>
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filter Grants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search grants..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Region</label>
                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {regions.map(reg => <SelectItem key={reg} value={reg}>{reg}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Desktop Table */}
      <div className="hidden lg:block">
        <div className="grant-table">
          <table className="w-full">
            <thead>
            <tr>
              <th className="text-left">Grant Name</th>
              <th className="text-left">Agency</th>
              <th className="text-left">Funding Amount</th>
              <th className="text-left">Deadline</th>
              <th className="text-left">Status</th>
              <th className="text-left">Action</th>
            </tr>
            </thead>
            <tbody>
            {filteredGrants.map((g) => (
              <tr key={g.id ?? g.name}>
                <td>
                  <div>
                    <div className="font-semibold text-gray-900">{g.name ?? "N/A"}</div>
                    <div className="text-sm text-gray-600 mt-1">{g.description ?? "—"}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {g.region ?? "N/A"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Building className="w-3 h-3 mr-1" />
                        {g.category ?? "N/A"}
                      </Badge>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="text-sm text-gray-900">{g.agency ?? "N/A"}</div>
                </td>
                <td>
                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {formatFundingRange(g.fundingMin, g.fundingMax)}
                  </div>
                </td>
                <td>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                    {g.deadline ?? "—"}
                  </div>
                </td>
                <td>
                  <Badge
                    variant={
                      g.status === "Active"
                        ? "default"
                        : g.status === "Upcoming"
                          ? "secondary"
                          : "destructive"
                    }
                    className="text-xs"
                  >
                    {g.status ?? "Closed"}
                  </Badge>
                </td>
                <td>
                  <Button size="sm" asChild>
                    <Link href={generateGuideUrl(g.name ?? "")}>
                      Application Guide <BookOpen className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredGrants.map((g) => (
          <Card key={g.id ?? g.name} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{g.name ?? "N/A"}</h3>
                  <p className="text-sm text-gray-600 mt-1">{g.description ?? "—"}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    {g.region ?? "N/A"}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Building className="w-3 h-3 mr-1" />
                    {g.category ?? "N/A"}
                  </Badge>
                  <Badge
                    variant={
                      g.status === "Active" ? "default" : g.status === "Upcoming" ? "secondary" : "destructive"
                    }
                    className="text-xs"
                  >
                    {g.status ?? "Closed"}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Agency</div>
                    <div className="font-medium">{g.agency ?? "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Funding</div>
                    <div className="font-semibold text-green-600">{formatFundingRange(g.fundingMin, g.fundingMax)}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Deadline</div>
                    <div className="font-medium">{g.deadline ?? "—"}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Eligibility</div>
                    <div className="font-medium">{Array.isArray(g.eligibility) && g.eligibility[0] ? g.eligibility[0] : (typeof g.eligibility === "string" ? g.eligibility : "N/A")}</div>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href={generateGuideUrl(g.name ?? "")}>
                    View Application Guide <BookOpen className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filteredGrants.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No grants found matching your criteria.</div>
          <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  )
}
