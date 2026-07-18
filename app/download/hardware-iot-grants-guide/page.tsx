import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your CompleteHardware & IoT Grants Guide | FSI Digital",
  description: "Free application templates, strategies, and frameworks for NSF SBIR grants up to $1.25M, DOD electronics programs, and advanced manufacturing funding.",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/hardware-iot-grants-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
