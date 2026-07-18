import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free BDC Women Entrepreneurs Financing Guide | FSI Digital",
  description: "Download our comprehensive BDC financing application toolkit with program comparison, flexible loan strategies, advisor engagement guide, and proven str...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/bdc-women-entrepreneurs-financing-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
