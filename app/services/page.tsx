
import type { Metadata } from "next"
import ServicesClient from "./ServicesClient"

export const metadata: Metadata = {
    title: "Our Services | FSI Digital Grant Finder",
    description: "Explore our suite of services including the Grant Finder engine, comprehensive application guides, and funding deadline alerts for USA and Canada.",
    alternates: {
        canonical: "https://www.fsidigital.ca/services",
    },
}

export default function Services() {
    return <ServicesClient />
}
