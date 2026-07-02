import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Women Clean Technology Grants & Environmental Innovation Funding Guide | FSI Digital",
  description: "Download our comprehensive women clean technology grants toolkit covering Sustainable Development Technology Canada (SDTC) funding up to $10M, Natural R...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/women-clean-technology-grants-canada",
  },
}

export default function Page() {
  return <DownloadClient />
}
