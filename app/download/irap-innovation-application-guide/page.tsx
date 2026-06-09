import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "IRAP Innovation Application Toolkit | FSI Digital",
  description: "Get instant access to comprehensive IRAP innovation application templates, ITA engagement strategies, and expert guidance used by successful SMEs to sec...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/irap-innovation-application-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
