import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Ontario Business Grants Application Toolkit | FSI Digital",
  description: "Get instant access to comprehensive Ontario provincial business grants application templates, program compliance strategies, and regional development gu...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/ontario-business-grants-kit",
  },
}

export default function Page() {
  return <DownloadClient />
}
