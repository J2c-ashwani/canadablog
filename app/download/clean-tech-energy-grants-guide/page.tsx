import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your CompleteClean Energy Grants Guide | FSI Digital",
  description: "Free application templates, strategies, and frameworks for DOE SBIR grants up to $1.6M, EPA environmental programs, and state clean energy funding.",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/clean-tech-energy-grants",
  },
}

export default function Page() {
  return <DownloadClient />
}
