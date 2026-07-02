import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Quebec Business Grants Application Toolkit | FSI Digital",
  description: "Get instant access to comprehensive Quebec provincial business grants application templates, R&D tax credit optimization strategies, and aide aux entrep...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/quebec-business-grants-2026",
  },
}

export default function Page() {
  return <DownloadClient />
}
