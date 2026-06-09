"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { SheetLead } from "@/lib/google-sheets"

interface CsvExporterProps {
  leads: SheetLead[]
}

export function CsvExporter({ leads }: CsvExporterProps) {
  const handleExport = () => {
    if (!leads || leads.length === 0) return

    // 1. Define headers
    const headers = [
      "Timestamp",
      "Name",
      "Email",
      "Phone",
      "Country",
      "State",
      "Industry",
      "Business Stage",
      "Funding Amount",
      "Funding Purpose",
      "Company Size",
      "Score",
      "Tier",
      "Offline Status",
      "Actual Signed Value",
      "Readiness Score",
      "Readiness Band"
    ]

    // 2. Map row content
    const csvRows = [
      headers.join(","), // Header row
      ...leads.map(lead => {
        const row = [
          lead.timestamp || "",
          lead.name || lead.companyName || "N/A",
          lead.email || "",
          lead.phone || "N/A",
          lead.country || "N/A",
          lead.state || "N/A",
          lead.industry || "N/A",
          lead.businessStage || "N/A",
          lead.fundingAmount || "N/A",
          lead.fundingPurpose || "N/A",
          lead.companySize || "N/A",
          lead.score || 0,
          lead.tier || "D",
          lead.offlineStatus || "Lead",
          lead.actualSignedValue || "N/A",
          lead.readinessScore !== undefined ? lead.readinessScore : "N/A",
          lead.readinessBand || "N/A"
        ]

        // Sanitize values to escape commas or quotes in CSV
        return row
          .map(val => {
            const str = String(val).replace(/"/g, '""')
            return str.includes(",") || str.includes("\n") || str.includes('"') ? `"${str}"` : str
          })
          .join(",")
      })
    ]

    // 3. Trigger download
    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `FSI_Digital_Leads_Export_${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button 
      onClick={handleExport}
      className="bg-slate-900 border border-slate-800 text-white font-bold hover:bg-slate-800 flex items-center gap-1.5 py-2 px-4 text-xs rounded-xl"
    >
      <Download className="w-3.5 h-3.5" />
      Export Filtered to CSV
    </Button>
  )
}
