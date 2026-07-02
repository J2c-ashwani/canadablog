import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Canada AI Grants Application Toolkit | FSI Digital",
  description: "Get instant access to comprehensive artificial intelligence funding guide with Scale AI application templates, CDAP digital adoption resources, machine ...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/canada-digital-ai-innovation-grants",
  },
}

export default function Page() {
  return <DownloadClient />
}
