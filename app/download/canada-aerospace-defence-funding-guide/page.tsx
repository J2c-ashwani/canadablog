import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Canada Aerospace Grants Application Toolkit | FSI Digital",
  description: "Get instant access to comprehensive aerospace funding guide with Canadian Space Agency templates, IDEaS defence innovation tools, aviation grant strateg...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/canada-aerospace-defence-funding-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
