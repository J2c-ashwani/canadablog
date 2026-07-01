'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ShieldCheck, HelpCircle, Landmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function InlineGrantChecker() {
  const router = useRouter()
  const [province, setProvince] = useState<string>('')
  const [goal, setGoal] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!province || !goal) return

    setLoading(true)
    // Redirect to the calculator with pre-populated params
    router.push(`/calculator?province=${province}&goal=${goal}`)
  }

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/70 p-6 text-white shadow-xl transition-all duration-300 hover:border-emerald-500/40 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Left column: Text & Trust info */}
        <div className="space-y-4 lg:max-w-md">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 tracking-wider uppercase border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Instant Eligibility Check
          </div>
          <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Could your business get funded?
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Take the first step. Tell us where your business is located and what you need funding for to see matching federal and provincial grants.
          </p>
          <div className="flex items-center gap-4 pt-1 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Landmark className="w-3 h-3 text-emerald-400" />
              1,200+ Active Programs
            </span>
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-emerald-400" />
              60-Second Process
            </span>
          </div>
        </div>

        {/* Right column: Quick assessment form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4 rounded-2xl bg-white/5 p-5 backdrop-blur-md border border-white/10 lg:max-w-sm">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
              Business Location
            </label>
            <Select value={province} onValueChange={setProvince}>
              <SelectTrigger className="h-11 bg-slate-900/60 border-white/10 text-white rounded-xl focus:ring-emerald-500">
                <SelectValue placeholder="Select province/region..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white">
                <SelectItem value="on">Ontario</SelectItem>
                <SelectItem value="bc">British Columbia</SelectItem>
                <SelectItem value="ab">Alberta</SelectItem>
                <SelectItem value="qc">Quebec</SelectItem>
                <SelectItem value="ns">Nova Scotia</SelectItem>
                <SelectItem value="mb">Manitoba</SelectItem>
                <SelectItem value="sk">Saskatchewan</SelectItem>
                <SelectItem value="nb">New Brunswick</SelectItem>
                <SelectItem value="nl">Newfoundland & Labrador</SelectItem>
                <SelectItem value="pe">Prince Edward Island</SelectItem>
                <SelectItem value="territories">Territories</SelectItem>
                <SelectItem value="national">Federal / Nationwide</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
              Primary Funding Goal
            </label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger className="h-11 bg-slate-900/60 border-white/10 text-white rounded-xl focus:ring-emerald-500">
                <SelectValue placeholder="Select funding goal..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white">
                <SelectItem value="expansion">General Business Growth & Expansion</SelectItem>
                <SelectItem value="hiring">Hiring & Workforce Training</SelectItem>
                <SelectItem value="expansion_equipment">Equipment & Facility Upgrades</SelectItem>
                <SelectItem value="research">R&D and Innovation (e.g. SR&ED / IRAP)</SelectItem>
                <SelectItem value="just researching">Just Researching / Information</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={!province || !goal || loading}
            className="w-full h-12 mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-55 disabled:cursor-not-allowed shadow-md shadow-emerald-500/20"
          >
            {loading ? 'Processing...' : 'Calculate My Funding'}
            {!loading && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
          </Button>
        </form>

      </div>
    </div>
  )
}
