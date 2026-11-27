'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ArrowRight, ShieldCheck, HelpCircle, Landmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function InlineGrantChecker() {
  const router = useRouter()
  const pathname = usePathname() || ''
  const defaultUS = pathname.startsWith('/usa') || pathname.includes('sbir') || pathname.includes('sba') || pathname.includes('california') || pathname.includes('texas') || pathname.includes('florida') || pathname.includes('new-york')
  const [province, setProvince] = useState<string>(defaultUS ? 'usa' : '')
  const [goal, setGoal] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!province || !goal) return

    setLoading(true)
    const trimmedEmail = email.trim()
    const trimmedPhone = phone.trim()
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    const isUSSelection = province === 'usa' || province.startsWith('us-')
    const resolvedState = province.startsWith('us-') ? province.replace('us-', '') : province

    if (isValidEmail) {
      try {
        localStorage.setItem('fsi:lead_email', trimmedEmail)
        localStorage.setItem('fsi:lead_region', resolvedState)
        localStorage.setItem('fsi:lead_saved_at', String(Date.now()))
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          body: JSON.stringify({
            email: trimmedEmail,
            phone: trimmedPhone || undefined,
            category: 'Grant Calculator',
            source: 'Blog Inline Eligibility Checker',
            country: isUSSelection ? 'USA' : 'Canada',
            state: resolvedState === 'usa' ? 'national' : resolvedState,
            fundingPurpose: goal,
            pagePath: pathname,
            consentToPartnerContact: true,
            isSubscribed: true,
            wantsAdvisorContact: Boolean(trimmedPhone),
            doNotCall: !trimmedPhone,
          }),
        })
      } catch {
        // Proceed to calculator even if background lead save fails
      }
    }

    const params = new URLSearchParams({ province: resolvedState, goal })
    if (isUSSelection) params.set('country', 'USA')
    if (isValidEmail) params.set('email', trimmedEmail)
    if (trimmedPhone) params.set('phone', trimmedPhone)
    router.push(`/calculator?${params.toString()}`)
  }

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/70 p-6 text-white shadow-xl transition-all duration-300 hover:border-emerald-500/40 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Left column: Text & Trust info */}
        <div className="space-y-4 lg:max-w-md">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 tracking-wider uppercase border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Free Eligibility Check
          </div>
          <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Could your business get funded?
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Tell us where your business is located and what you need funding for to get matched US &amp; Canadian federal and state/provincial grants.
          </p>
          <div className="flex items-center gap-4 pt-1 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Landmark className="w-3 h-3 text-emerald-400" />
              1,200+ Active Programs
            </span>
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-emerald-400" />
              60-Second Match
            </span>
          </div>
        </div>

        {/* Right column: Quick assessment + instant lead capture form */}
        <form onSubmit={handleSubmit} className="w-full space-y-3 rounded-2xl bg-white/5 p-5 backdrop-blur-md border border-white/10 lg:max-w-sm">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
              Business Location *
            </label>
            <Select value={province} onValueChange={setProvince}>
              <SelectTrigger className="h-10 bg-slate-900/60 border-white/10 text-white rounded-xl focus:ring-emerald-500">
                <SelectValue placeholder="Select country / province..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white">
                <SelectItem value="usa">United States (All 50 States)</SelectItem>
                <SelectItem value="on">Canada — Ontario</SelectItem>
                <SelectItem value="bc">Canada — British Columbia</SelectItem>
                <SelectItem value="ab">Canada — Alberta</SelectItem>
                <SelectItem value="qc">Canada — Quebec</SelectItem>
                <SelectItem value="ns">Canada — Nova Scotia</SelectItem>
                <SelectItem value="mb">Canada — Manitoba</SelectItem>
                <SelectItem value="sk">Canada — Saskatchewan</SelectItem>
                <SelectItem value="nb">Canada — New Brunswick</SelectItem>
                <SelectItem value="nl">Canada — Newfoundland &amp; Labrador</SelectItem>
                <SelectItem value="pe">Canada — Prince Edward Island</SelectItem>
                <SelectItem value="national">Canada — Federal / Nationwide</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
              Primary Funding Goal *
            </label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger className="h-10 bg-slate-900/60 border-white/10 text-white rounded-xl focus:ring-emerald-500">
                <SelectValue placeholder="Select funding goal..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white">
                <SelectItem value="expansion">General Business Growth & Expansion</SelectItem>
                <SelectItem value="hiring">Hiring & Workforce Training</SelectItem>
                <SelectItem value="expansion_equipment">Equipment & Facility Upgrades</SelectItem>
                <SelectItem value="research">R&amp;D and Innovation (SR&amp;ED / SBIR / IRAP)</SelectItem>
                <SelectItem value="just researching">Just Researching / Information</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
              Work Email (For Free Match Summary) *
            </label>
            <Input
              type="email"
              required
              placeholder="founder@yourcompany.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 bg-slate-900/60 border-white/10 text-white placeholder:text-slate-400 rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
              Phone (Optional — Priority Grant/Funding Alerts)
            </label>
            <Input
              type="tel"
              placeholder="(e.g. 416-555-0199)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-10 bg-slate-900/60 border-white/10 text-white placeholder:text-slate-400 rounded-xl"
            />
          </div>

          <Button
            type="submit"
            disabled={!province || !goal || !email.trim() || loading}
            className="w-full h-11 mt-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-55 disabled:cursor-not-allowed shadow-md shadow-emerald-500/20"
          >
            {loading ? 'Matching Programs...' : 'See My Matched Grants'}
            {!loading && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
          </Button>
        </form>

      </div>
    </div>
  )
}
