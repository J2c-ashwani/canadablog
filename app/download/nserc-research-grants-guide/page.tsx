import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "NSERC Research Grants Application Toolkit | FSI Digital",
  description: "Get instant access to comprehensive NSERC research application templates, I2I grant guides, and university-industry partnership strategies used by succe...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/nserc-research-grants-canada",
  },
}

export default function Page() {
  return <DownloadClient />
}
