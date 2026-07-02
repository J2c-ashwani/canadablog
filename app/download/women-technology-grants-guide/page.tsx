import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Women Technology Grants Guide | FSI Digital",
  description: "Download our comprehensive women technology grants toolkit covering software development, AI/ML, digital innovation funding with NRC IRAP application st...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/women-technology-grants-canada",
  },
}

export default function Page() {
  return <DownloadClient />
}
