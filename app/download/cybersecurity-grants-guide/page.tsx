import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your CompleteCybersecurity Grants Guide | FSI Digital",
  description: "Free application templates, strategies, and frameworks for DOD SBIR grants up to $1.8M, DHS cybersecurity programs, and NSA research partnerships.",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/cybersecurity-grants",
  },
}

export default function Page() {
  return <DownloadClient />
}
