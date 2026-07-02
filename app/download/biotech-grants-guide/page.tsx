import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your CompleteBiotech Grants Guide | FSI Digital",
  description: "Free application templates, strategies, and frameworks for NIH SBIR grants up to $2M, FDA Orphan Drug programs, and state life sciences funding.",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/biotech-life-sciences-grants",
  },
}

export default function Page() {
  return <DownloadClient />
}
