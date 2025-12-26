
import type { Metadata } from "next"
import ContactClient from "./ContactClient"

export const metadata: Metadata = {
  title: "Contact Us | FSI Digital",
  description: "Contact FSI Digital for questions about government grants, funding opportunities, and application guides.",
  alternates: {
    canonical: "https://www.fsidigital.ca/contact",
  },
}

export default function Contact() {
  return <ContactClient />
}
