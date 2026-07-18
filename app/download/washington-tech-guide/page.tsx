import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Washington Tech Startup Grants Application Guide & Complete Funding Templates | FSI Digital",
  description: "Download our comprehensive Washington technology startup grants toolkit covering WRF Technology Commercialization Grants comprehensive phased funding pr...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/washington-tech-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
