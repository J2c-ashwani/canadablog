import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Software & SaaS Startup Grants Application Guide & Complete Funding Templates | FSI Digital",
  description: "Download our comprehensive software and SaaS technology startup grants toolkit covering NSF SBIR Phase I grants up to $305,000 increased from $275,000 e...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/software-saas-startup-grants",
  },
}

export default function Page() {
  return <DownloadClient />
}
