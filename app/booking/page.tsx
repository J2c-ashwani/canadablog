import type { Metadata } from "next"
import BookingClient from "./BookingClient"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"

export const metadata: Metadata = {
  title: "Schedule Your Strategy Session | FSI Digital",
  description: "Schedule your pre-paid 1-on-1 Business Funding Strategy Consultation. Select a date and time for your private Google Meet.",
  robots: "noindex, nofollow", // Keep this success page private so only paid leads can access it
  alternates: {
    canonical: "https://www.fsidigital.ca/booking",
  },
}

interface PageProps {
  searchParams: Promise<{
    token?: string
    success?: string
    email?: string
    name?: string
    rid?: string
    source?: string
    order?: string
    tier?: string
    price?: string
  }>
}

export default async function BookingPage({ searchParams }: PageProps) {
  const params = await searchParams
  const token = params.token

  let prefilledEmail = ""
  let prefilledName = ""

  if (token) {
    try {
      const all = await SubscriberRepository.getAllSubscribers()
      const found = all.find((sub) => sub.loginToken === token)
      if (found) {
        prefilledEmail = found.email
        prefilledName = found.name || ""
      }
    } catch (e) {
      console.error("Failed to resolve booking token server-side:", e)
    }
  }

  return (
    <BookingClient 
      prefilledEmail={prefilledEmail} 
      prefilledName={prefilledName} 
    />
  )
}
