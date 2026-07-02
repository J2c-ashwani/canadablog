import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "BC Business Grants Application Toolkit | FSI Digital",
  description: "Get instant access to comprehensive British Columbia provincial business grants application templates, innovation compliance strategies, and CleanBC sus...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/bc-small-business-grants-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
