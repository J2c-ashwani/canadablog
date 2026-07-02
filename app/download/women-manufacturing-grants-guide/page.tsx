import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Women Manufacturing Equipment Grants Guide | FSI Digital",
  description: "Download our comprehensive women manufacturing grants toolkit covering equipment financing, automation funding, productivity improvement loans with NRC ...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/women-manufacturing-grants-canada",
  },
}

export default function Page() {
  return <DownloadClient />
}
