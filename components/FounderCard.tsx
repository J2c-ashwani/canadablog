import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Mail, Linkedin, ArrowRight } from 'lucide-react';

export function FounderCard() {
  return (
    <Card className="border border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden max-w-3xl mx-auto my-8">
      <CardContent className="p-6 sm:p-8 grid sm:grid-cols-4 gap-6 items-center">
        {/* Profile/Photo Placeholder */}
        <div className="sm:col-span-1 flex flex-col items-center text-center space-y-2">
          <div className="w-20 h-20 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center text-emerald-600 font-extrabold text-2xl shadow-sm">
            AK
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Ashwani Kumar</h4>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Founder, FSI Digital</p>
          </div>
          <div className="flex gap-2">
            <a
              href="https://www.linkedin.com/company/fsidigital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="mailto:ashwani@fsidigital.ca"
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Narrative & Framework Pitch */}
        <div className="sm:col-span-3 space-y-3.5">
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Advisory Framework Trust</span>
          </div>

          <h3 className="font-bold text-slate-900 text-lg leading-tight">
            Why FSI Digital Exists
          </h3>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            As a founder, I realized searching for government grants is a major time sink. You either navigate clunky outdated listings or pay massive 20% contingency retainers to traditional consulting agencies. 
          </p>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            We built FSI Digital to package that exact consulting intelligence into affordable, self-serve eligibility reports. Every assessment is **built using FSI Digital's funding research framework and analyst review process**, giving you clean, stacking strategies without high advisory markups.
          </p>

          <div className="flex items-center gap-4 pt-1">
            <Link
              href="/about-founder"
              className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              Our Story <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center gap-1 text-xs font-extrabold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Our Methodology <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
