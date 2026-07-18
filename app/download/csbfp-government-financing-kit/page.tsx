import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "CSBFP Government Financing Toolkit | FSI Digital",
  description: "Get instant access to comprehensive CSBFP government financing templates, federal compliance checklists, and lender selection guides used by successful ...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/csbfp-government-financing-kit",
  },
}

export default function Page() {
  return <DownloadClient />
}
