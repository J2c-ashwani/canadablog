import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free EDC Women in Trade Export Financing Guide | FSI Digital",
  description: "Download our comprehensive EDC Women in Trade export financing toolkit with equity capital investment insights, international market entry templates, an...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/edc-women-trade-export-financing",
  },
}

export default function Page() {
  return <DownloadClient />
}
