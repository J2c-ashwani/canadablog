"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, CheckCircle2, Mail, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const token = searchParams.get("token")
  const isSuccess = searchParams.get("success") === "true"

  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState(isSuccess)

  useEffect(() => {
    // If a token is provided and we haven't already marked it successful, trigger the opt-out automatically
    if (token && !isSuccess && !successMsg) {
      const autoOptOut = async () => {
        setIsLoading(true);
        setErrorMsg("");
        try {
          const res = await fetch(`/api/subscribe/unsubscribe?token=${token}`);
          if (res.ok) {
            setSuccessMsg(true);
          } else {
            setErrorMsg("We couldn't process the automatic opt-out. Please enter your email manually below.");
          }
        } catch (err) {
          console.error("Auto unsubscribe failed:", err);
          setErrorMsg("We couldn't process the automatic opt-out. Please enter your email manually below.");
        } finally {
          setIsLoading(false);
        }
      };
      autoOptOut();
    }
  }, [token, isSuccess, successMsg]);

  const handleManualUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setErrorMsg("")

    try {
      // Send a scoped confirmation link; an email address alone never changes subscription state.
      const response = await fetch("/api/subscribe/unsubscribe/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      if (response.ok && data.success) {
        setSuccessMsg(true)
      } else {
        setErrorMsg(data.error || "We couldn't find that email address in our database.")
      }
    } catch (err) {
      console.error(err)
      setErrorMsg("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 py-16 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <Card className="border border-slate-800 bg-slate-950 text-white shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-950/20 to-slate-950 p-6 text-center border-b border-slate-900">
              <div className="mx-auto w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-4">
                <ShieldAlert className="h-6 w-6 text-red-500" />
              </div>
              <CardTitle className="text-xl font-bold">Manage Alert Subscription</CardTitle>
              <CardDescription className="text-slate-400 text-xs mt-1">
                FSI Funding Intelligence compliance & opt-out portal
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              {successMsg ? (
                <div className="text-center space-y-4 py-4">
                  <div className="mx-auto w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Unsubscribed Successfully</h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                    Your email address has been removed from our active <strong>Funding Intelligence Alerts</strong> distribution list. You will no longer receive weekly digests or deadline updates.
                  </p>
                  <div className="pt-4 border-t border-slate-900/60 flex flex-col gap-2">
                    <Link href="/database">
                      <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-5">
                        Back to Funding Database
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleManualUnsubscribe} className="space-y-4">
                  <p className="text-xs text-slate-400 leading-relaxed text-center">
                    Enter your work email address below to unsubscribe from all FSI Digital funding notifications.
                  </p>
                  
                  {errorMsg && (
                    <div className="p-3 bg-red-500/10 border border-red-500/25 rounded-lg text-red-400 text-xs font-medium text-center">
                      {errorMsg}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 bg-slate-900 border-slate-800 text-white placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isLoading || !email} 
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-6 text-sm flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing Opt-out...
                      </>
                    ) : (
                      "Confirm Unsubscribe"
                    )}
                  </Button>

                  <p className="text-[10px] text-slate-600 text-center leading-relaxed mt-4">
                    Opt-out requests are processed immediately. We respect your inbox privacy and comply fully with CAN-SPAM and CASL regulations.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  )
}
