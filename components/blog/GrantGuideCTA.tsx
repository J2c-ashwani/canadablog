"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Download, FileText, Mail, Phone } from 'lucide-react';
import { OTOUpsellCard } from '@/components/download/OTOUpsellCard';

export default function GrantGuideCTA() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Save lead to Google Sheets via existing API
            await fetch('/api/download-guide', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    phone,
                    guideName: 'Ultimate Grant Guide 2026',
                }),
            });

            // Store email in sessionStorage so the OTO card is prefilled
            if (typeof window !== 'undefined') {
                window.sessionStorage.setItem("fsi_cdp_profile", JSON.stringify({ email }));
            }
        } catch (error) {
            console.error('Failed to save lead:', error);
        }

        // Always trigger download (even if sheet save fails)
        setStatus('success');
        const link = document.createElement('a');
        link.href = '/lead-magnets/ultimate-grant-guide-2026.pdf';
        link.download = 'Ultimate-Canada-Grant-Guide-2026.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (status === 'success') {
        return (
            <div className="space-y-6">
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900 rounded-2xl p-6 text-left shadow-xs">
                    <div className="flex items-center gap-2.5 mb-3 text-emerald-850 dark:text-emerald-350">
                        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <h3 className="text-base font-black">Your guide is downloading.</h3>
                    </div>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                        While it downloads... most founders also purchase the Grant Toolkit because it includes:
                    </p>
                    
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 font-medium mb-4 pl-1">
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span>Application templates</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span>Eligibility checklists</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span>Submission timelines</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span>Reviewer tips</span>
                        </li>
                    </ul>
                    
                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-emerald-100 pt-3 text-[11px] text-slate-500">
                        <span>Special one-time price: <strong>$29</strong></span>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto text-[10px] h-8"
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = '/lead-magnets/ultimate-grant-guide-2026.pdf';
                                    link.download = 'Ultimate-Canada-Grant-Guide-2026.pdf';
                                    link.click();
                                }}
                            >
                                Download Again
                            </Button>
                            <Button
                                asChild
                                className="w-full sm:w-auto bg-indigo-650 hover:bg-indigo-700 text-white font-bold text-[10px] h-8"
                            >
                                <a href={`/calculator?email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&utm_source=grant_guide_cta_success`}>
                                    Check Eligibility (30s)
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>

                <OTOUpsellCard guideName="Ultimate Grant Guide 2026" />
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-blue-500/20 blur-xl"></div>

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <span className="inline-block px-3 py-1 bg-blue-500/30 rounded-full text-xs font-semibold mb-3 border border-blue-400/30">
                            FREE LEAD MAGNET
                        </span>
                        <h3 className="text-2xl font-bold mb-2">Ultimate Grant Guide 2026</h3>
                    </div>
                    <Download className="w-8 h-8 text-blue-300 opacity-80" />
                </div>

                <p className="text-blue-100 mb-6 text-sm">
                    Get the complete compilation of Canada's top 6 funding streams (Women, Green, Veteran, Atlantic, Alberta, Housing) in one PDF.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="email"
                            required
                            placeholder="Enter your work email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all font-medium"
                        />
                    </div>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="tel"
                            placeholder="Enter your phone number (optional)"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all font-medium"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 rounded-lg transition-all shadow-lg hover:shadow-blue-500/25"
                    >
                        {status === 'loading' ? 'Sending...' : 'Download Free Guide'}
                    </Button>
                </form>

                <p className="text-xs text-blue-300 mt-4 text-center opacity-80">
                    Join 25,000+ Canadian founders. Unsubscribe anytime.
                </p>
            </div>
        </div>
    );
}
