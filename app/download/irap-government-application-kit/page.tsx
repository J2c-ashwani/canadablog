import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "IRAP Government Application Toolkit | FSI Digital",
  description: "Get instant access to comprehensive IRAP government application templates, federal compliance checklists, and expert guidance used by successful applica...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/irap-government-application-kit",
  },
}

export default function Page() {
  return <DownloadClient />
}
