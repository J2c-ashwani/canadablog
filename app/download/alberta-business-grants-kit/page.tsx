import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Alberta Business Grants Application Toolkit | FSI Digital",
  description: "Get instant access to comprehensive Alberta provincial business grants application templates, energy innovation strategies, and clean technology develop...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/alberta-business-grants-kit",
  },
}

export default function Page() {
  return <DownloadClient />
}
