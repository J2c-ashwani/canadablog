import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Women Entrepreneurship Fund Application Guide | FSI Digital",
  description: "Download our comprehensive WEF grant application toolkit with funding category breakdown, business expansion templates, and proven strategies to secure ...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/women-entrepreneurship-fund-canada",
  },
}

export default function Page() {
  return <DownloadClient />
}
