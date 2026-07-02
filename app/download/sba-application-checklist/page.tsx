import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "SBA Application Checklist & Toolkit | FSI Digital",
  description: "Get instant access to comprehensive SBA application templates, document checklists, and step-by-step guides used by successful applicants to secure $50M...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/sba-loans-grants-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
