import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Colorado Tech Startup Grants Application Guide & Complete Funding Templates | FSI Digital",
  description: "Download our comprehensive Colorado technology startup grants toolkit covering Advanced Industries Accelerator Program Early-Stage Capital and Retention...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/colorado-tech-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
