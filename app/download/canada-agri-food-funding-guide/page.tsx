import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Canada Agriculture Grants Application Toolkit | FSI Digital",
  description: "Get instant access to comprehensive agriculture funding guide with AgriInnovate templates, CAP funding tools, precision agriculture strategies, and farm...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/canada-agri-food-funding-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
