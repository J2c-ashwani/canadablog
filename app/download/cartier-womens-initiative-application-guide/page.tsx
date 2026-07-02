import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Cartier Women's Initiative Application Guide | FSI Digital",
  description: "Download our comprehensive Cartier Women's Initiative application toolkit with UN Sustainable Development Goals alignment framework, impact demonstratio...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/cartier-womens-initiative-canada",
  },
}

export default function Page() {
  return <DownloadClient />
}
