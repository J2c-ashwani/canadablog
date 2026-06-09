import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "SR&ED Tax Credit Application Toolkit | FSI Digital",
  description: "Get instant access to comprehensive SR&ED application templates, Form T661 guides, and expert strategies used by successful R&D companies to secure $45M...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/sred-application-kit",
  },
}

export default function Page() {
  return <DownloadClient />
}
