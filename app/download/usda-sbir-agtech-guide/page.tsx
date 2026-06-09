import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free USDA SBIR AgTech Grants Application Guide & Proposal Templates | FSI Digital",
  description: "Download our comprehensive USDA SBIR/STTR AgTech grants toolkit covering Phase I ($125,000) and Phase II ($575,000) application strategies, technical pr...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/usda-sbir-agtech-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
