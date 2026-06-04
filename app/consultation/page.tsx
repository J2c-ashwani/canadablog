import type { Metadata } from "next"
import ConsultationClient from "./ConsultationClient"

export const metadata: Metadata = {
  title: "1-on-1 Business Funding Strategy Consultation | FSI Digital",
  description: "Schedule a private, deep-dive consultation with our Lead Funding Strategist. Receive a custom, pre-researched Business Funding Roadmap for government grants and tax credits.",
  alternates: {
    canonical: "https://www.fsidigital.ca/consultation",
  },
}

export default function ConsultationPage() {
  return <ConsultationClient />
}
