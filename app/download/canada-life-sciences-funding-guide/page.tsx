import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Canada Life Sciences Grants Application Toolkit | FSI Digital",
  description: "Get instant access to comprehensive biotechnology funding guide with IRAP biotech templates, clinical trials checklists, medical device regulatory tools...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/canada-life-sciences-funding-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
