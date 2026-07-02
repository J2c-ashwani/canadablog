import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "RDA Regional Application Toolkit | FSI Digital",
  description: "Get instant access to comprehensive RDA regional application templates, federal compliance strategies, and region-specific guides used by successful app...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/regional-development-agencies-government-grants",
  },
}

export default function Page() {
  return <DownloadClient />
}
