import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Strategic Innovation Fund Application Toolkit | FSI Digital",
  description: "Get instant access to comprehensive SIF application templates, checklists, and expert guidance used by successful applicants to secure $180M+ in Strateg...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/strategic-innovation-fund-canada-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
