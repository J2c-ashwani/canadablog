"use client"

import { useState, useEffect } from "react"
import { type Grant, formatFundingRange } from "@/lib/grants-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, Search, Filter, Calendar, DollarSign, MapPin, Building, BookOpen } from "lucide-react"
import Link from "next/link"

interface GrantComparisonTableProps {
  grants: Grant[]
  title?: string
  showFilters?: boolean
}

// Function to generate internal guide URLs based on grant names
function generateGuideUrl(grantName: string): string {
  const normalizedName = grantName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .trim()

  // ✅ UPDATED: Map specific small business grants to their individual guide pages
  if (normalizedName.includes('small-business-innovation-research') || 
      normalizedName.includes('sbir-research') ||
      (normalizedName.includes('sbir') && normalizedName.includes('small-business'))) {
    return '/guides/sbir-research-grants-guide'
  }
  
  if (normalizedName.includes('sba-growth-accelerator-fund') ||
      normalizedName.includes('growth-accelerator-fund')) {
    return '/guides/sba-growth-accelerator-fund-guide'
  }
  
  if (normalizedName.includes('california-small-business-loan-guarantee') ||
      normalizedName.includes('california-loan-guarantee')) {
    return '/guides/california-loan-guarantee-guide'
  }

  // ✅ EXISTING: General SBIR/STTR mapping
  if (normalizedName.includes('sbir') || normalizedName.includes('sttr')) {
    return '/guides/apply-sbir-grants'
  }
  
  // ✅ EXISTING: General SBA mapping
  if (normalizedName.includes('sba') || normalizedName.includes('small-business-administration')) {
    return '/guides/apply-sba-loans'
  }
  
  // ✅ EXISTING: Women/Minority/Veteran mapping
  if (normalizedName.includes('women') || normalizedName.includes('minority') || normalizedName.includes('veteran')) {
    return '/guides/apply-minority-grants'
  }
  
  // ✅ EXISTING: DOE Clean Energy specific mapping
  if (normalizedName.includes('department-of-energy') || 
      normalizedName.includes('clean-energy') || 
      normalizedName.includes('doe-clean') ||
      normalizedName.includes('energy-technologies') ||
      normalizedName.includes('renewable-energy')) {
    return '/guides/apply-doe-clean-energy-grants'
  }
  
  // ✅ EXISTING: Innovation/Research mapping
  if (normalizedName.includes('innovation') || normalizedName.includes('research')) {
    return '/guides/apply-federal-grants'
  }
  
  // Default guide page
  return '/guides/apply-federal-grants'
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

  // Get unique values for filters
  const categories = Array.from(new Set(grants.map((grant) => grant.category)))
  const regions = Array.from(new Set(grants.map((grant) => grant.region)))
  const statuses = Array.from(new Set(grants.map((grant) => grant.status)))

  // Apply filters
  const applyFilters = () => {
    let filtered = grants

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (grant) =>
          grant.name.toLowerCase().includes(query) ||
          grant.description.toLowerCase().includes(query) ||
          grant.category.toLowerCase().includes(query) ||
          grant.agency.toLowerCase().includes(query),
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((grant) => grant.category === categoryFilter)
    }

    if (regionFilter !== "all") {
      filtered = filtered.filter((grant) => grant.region === regionFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((grant) => grant.status === statusFilter)
    }

    setFilteredGrants(filtered)
  }

  // Apply filters when inputs change
  useEffect(() => {
    applyFilters()
  }, [searchQuery, categoryFilter, regionFilter, statusFilter])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Badge variant="secondary" className="text-sm">
          {filteredGrants.length} grants found
        </Badge>
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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search grants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
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
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
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
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
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
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Desktop Table View */}
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
              {filteredGrants.map((grant) => (
                <tr key={grant.id}>
                  <td>
                    <div>
                      <div className="font-semibold text-gray-900">{grant.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{grant.description}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          {grant.region}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Building className="w-3 h-3 mr-1" />
                          {grant.category}
                        </Badge>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm text-gray-900">{grant.agency}</div>
                  </td>
                  <td>
                    <div className="flex items-center text-green-600 font-semibold">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {formatFundingRange(grant.fundingMin, grant.fundingMax)}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      {grant.deadline}
                    </div>
                  </td>
                  <td>
                    <Badge
                      variant={
                        grant.status === "Active"
                          ? "default"
                          : grant.status === "Upcoming"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-xs"
                    >
                      {grant.status}
                    </Badge>
                  </td>
                  <td>
                    {/* ✅ UPDATED: Now routes to specific guide pages for small business grants */}
                    <Button size="sm" asChild>
                      <Link href={generateGuideUrl(grant.name)}>
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
        {filteredGrants.map((grant) => (
          <Card key={grant.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{grant.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{grant.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    {grant.region}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Building className="w-3 h-3 mr-1" />
                    {grant.category}
                  </Badge>
                  <Badge
                    variant={
                      grant.status === "Active" ? "default" : grant.status === "Upcoming" ? "secondary" : "destructive"
                    }
                    className="text-xs"
                  >
                    {grant.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Agency</div>
                    <div className="font-medium">{grant.agency}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Funding</div>
                    <div className="font-semibold text-green-600">
                      {formatFundingRange(grant.fundingMin, grant.fundingMax)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Deadline</div>
                    <div className="font-medium">{grant.deadline}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Eligibility</div>
                    <div className="font-medium">{grant.eligibility[0]}</div>
                  </div>
                </div>

                {/* ✅ UPDATED: Now routes to specific guide pages for small business grants */}
                <Button className="w-full" asChild>
                  <Link href={generateGuideUrl(grant.name)}>
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
