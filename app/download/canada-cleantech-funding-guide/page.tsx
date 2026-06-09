import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Canada Clean Technology Funding Toolkit | FSI Digital",
  description: "Get instant access to comprehensive clean technology funding guide with SDTC application templates, Clean Tech ITC calculators, and expert strategies us...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/canada-cleantech-funding-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
