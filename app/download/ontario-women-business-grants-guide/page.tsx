import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Ontario Women Business Grants Guide | FSI Digital",
  description: "Download our comprehensive Ontario women business grants toolkit with program navigator covering $800M+ in provincial support including Women Entreprene...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/ontario-women-business-grants-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
