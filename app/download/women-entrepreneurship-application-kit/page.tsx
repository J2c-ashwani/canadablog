import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "WES Women Entrepreneurship Application Toolkit | FSI Digital",
  description: "Get instant access to comprehensive Women Entrepreneurship Strategy application templates, federal gender equality compliance strategies, and ecosystem ...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/women-entrepreneurship-application-kit",
  },
}

export default function Page() {
  return <DownloadClient />
}
