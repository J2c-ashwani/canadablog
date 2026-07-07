'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Mail, Linkedin, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export function FounderCard() {
  return (
    <Card className="border border-slate-200 bg-white shadow-xs rounded-2xl overflow-hidden max-w-3xl mx-auto my-8">
      <CardContent className="p-6 sm:p-8 grid sm:grid-cols-4 gap-6 items-start">
        {/* Profile/Photo Column */}
        <div className="sm:col-span-1 flex flex-col items-center text-center space-y-3 shrink-0">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-50">
            {/* Real founder headshot from public/author-ashwani.jpg */}
            <img 
              src="/author-ashwani.jpg" 
              alt="Ashwani Kumar" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to stylized AK initials in case of image load error
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = "w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-600 font-extrabold text-2xl";
                  fallback.innerText = "AK";
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Ashwani Kumar</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Founder, FSI Digital</p>
          </div>
          <div className="flex gap-2.5 pt-1">
            <a
              href="https://www.linkedin.com/company/fsidigital"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="mailto:ashwani@fsidigital.ca"
              className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all"
              aria-label="Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Narrative & Credibility Pitch */}
        <div className="sm:col-span-3 space-y-4">
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-extrabold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>DIRECT FOUNDER TRUST GUARANTEE</span>
          </div>

          <h3 className="font-extrabold text-slate-900 text-xl leading-tight">
            Why We Founded FSI Digital
          </h3>

          <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
            As a founder, I was shocked by how broken government grant discovery is. You either lose weeks browsing confusing government websites, or pay contingency consultants <strong className="text-slate-900">15% to 20% of your grant money</strong> in commission.
          </p>
          <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
            We built FSI Digital to disrupt this. By automating the program screening pipeline, we identify every eligible grant matching your company profile instantly. We charge a tiny one-time fee—no ongoing contracts, no high agency markups, and no success commissions.
          </p>

          {/* Core Trust & Credibility Checklist */}
          <div className="grid sm:grid-cols-2 gap-3 border-y border-slate-100 py-3 mt-4 text-[11px] sm:text-xs text-slate-600">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Ontario Registered Corp</strong>
                <p className="text-[10px] text-slate-400">FSI Digital Inc. (No. 1000832049)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">&lt; 12h Response Guarantee</strong>
                <p className="text-[10px] text-slate-400">Every report inquiry answered by a lead analyst.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
            <Link
              href="/about-founder"
              className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Our Full Story <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center gap-1.5 text-xs font-black text-slate-500 hover:text-slate-700 transition-colors"
            >
              Our Matching Methodology <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
