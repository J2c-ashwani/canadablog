import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ADMIN_SESSION_COOKIE, isValidAdminKey, isValidAdminSession } from '@/lib/admin/auth'
import { AdminLoginForm } from '../leads/AdminLoginForm'
import { Lock, KeyRound } from 'lucide-react'
import AlertsDashboardClient from "./AlertsDashboardClient"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Funding Intelligence Alerts Dashboard | Admin",
  robots: { index: false, follow: false },
}

function LockedState({ hasSecret }: { hasSecret: boolean }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-950">
      <Header />
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-5 inline-flex rounded-md bg-amber-50 p-3 text-amber-700">
            {hasSecret ? <Lock className="h-6 w-6" /> : <KeyRound className="h-6 w-6" />}
          </div>
          <h1 className="text-3xl font-bold text-gray-950">Alerts Dashboard Locked</h1>
          <p className="mt-3 text-gray-700">
            {hasSecret
              ? 'Enter your private access code to view the notification dashboard.'
              : 'Private dashboard access is not ready yet.'}
          </p>
          {hasSecret ? (
            <AdminLoginForm />
          ) : (
            <div className="mt-6 rounded-md bg-gray-50 p-4 text-sm font-semibold text-gray-700">
              Ask the site owner to enable private dashboard access.
            </div>
          )}
          <p className="mt-4 text-sm text-gray-500">
            This page is private and does not show dashboard data unless the access code is correct.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default async function AdminAlertsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const resolvedParams = await searchParams
  const adminSecret = process.env.LEAD_DASHBOARD_SECRET
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  const hasUrlAccess = !!adminSecret && isValidAdminKey(resolvedParams.key, adminSecret)
  const hasCookieAccess = !!adminSecret && isValidAdminSession(sessionCookie, adminSecret)

  if (!adminSecret || (!hasUrlAccess && !hasCookieAccess)) {
    return <LockedState hasSecret={!!adminSecret} />
  }

  return <AlertsDashboardClient />
}
