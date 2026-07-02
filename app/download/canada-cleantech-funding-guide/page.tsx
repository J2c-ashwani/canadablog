import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Canada Clean Technology Funding Toolkit | FSI Digital",
  description: "Get instant access to comprehensive clean technology funding guide with SDTC application templates, Clean Tech ITC calculators, and expert strategies us...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/canada-clean-technology-innovation-grants",
  },
}

export default function Page() {
  return <DownloadClient />
}
