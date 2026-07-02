import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Canada Advanced Manufacturing Funding Toolkit | FSI Digital",
  description: "Get instant access to comprehensive manufacturing funding guide with NGen application templates, IRAP project tools, CDAP digital adoption resources, an...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/manufacturing-grants-2026",
  },
}

export default function Page() {
  return <DownloadClient />
}
