import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free WBDC Equity Match Grant Application Guide | FSI Digital",
  description: "Download our comprehensive WBDC Equity Match Grant toolkit with 1:1 match requirement calculator, quarterly deadline tracker, growth project planning te...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/wbdc-equity-match-grant-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
