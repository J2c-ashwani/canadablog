import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "AAFC Agricultural Application Toolkit | FSI Digital",
  description: "Get instant access to comprehensive Agriculture & Agri-Food Canada application templates, federal compliance strategies, and sector-specific guides used...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/agriculture-agri-food-canada-government-grants",
  },
}

export default function Page() {
  return <DownloadClient />
}
