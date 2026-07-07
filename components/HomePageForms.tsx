'use client';

import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download } from "lucide-react"
import Link from 'next/link';

export function HeroEmailForm() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showGuideForm, setShowGuideForm] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email) { alert('Please enter your email address'); return; }
        setIsLoading(true);
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name: '', source: 'Homepage PDF Guide' }),
            });
            const data = await response.json();
            if (response.ok) { 
                setIsSuccess(true); 
                setEmail(''); 
            }
            else { alert(data.error || 'Something went wrong. Please try again.'); }
        } catch { alert('Failed to subscribe. Please try again.'); }
        finally { setIsLoading(false); }
    };

    return (
        <div className="flex flex-col gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0 w-full max-w-md mx-auto">
            <div className="w-full flex flex-col items-center gap-4">
                {/* Primary Eligibility CTA */}
                <Button
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-lg h-14 px-8 w-full shadow-lg shadow-emerald-500/20"
                    asChild
                >
                    <Link href="/calculator">
                        Check My Eligibility →
                    </Link>
                </Button>

                {/* Secondary lead capture trigger */}
                {!showGuideForm && !isSuccess && (
                    <button
                        type="button"
                        onClick={() => setShowGuideForm(true)}
                        className="text-sm text-slate-350 hover:text-white underline font-semibold transition-all mt-1"
                    >
                        Or, download our Free Grant Guide instead
                    </button>
                )}
            </div>

            {/* Email form toggled by the secondary link */}
            {showGuideForm && !isSuccess && (
                <form onSubmit={handleSubmit} className="w-full mt-4 p-4 bg-slate-800/60 border border-slate-700/50 rounded-xl space-y-3 animate-in fade-in duration-300">
                    <p className="text-xs text-slate-350 font-semibold text-center">
                        Enter your email to receive our free Canadian Grant Application PDF Guide:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-white text-gray-900 border-0 h-11 text-sm w-full rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            size="sm"
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold h-11 px-5 shrink-0"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Get Guide'}
                        </Button>
                    </div>
                </form>
            )}

            {isSuccess && (
                <div className="w-full mt-4 p-4 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-center space-y-1 animate-in fade-in duration-300">
                    <p className="text-sm font-bold text-emerald-400">Success!</p>
                    <p className="text-xs text-slate-300">Check your email. We&apos;ve sent the PDF guide to your inbox.</p>
                </div>
            )}
        </div>
    );
}

export function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email) { alert('Please enter your email address'); return; }
        setIsLoading(true);
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name: '' }),
            });
            const data = await response.json();
            if (response.ok) { alert('Success! Check your email for the PDF guide.'); setEmail(''); }
            else { alert(data.error || 'Something went wrong. Please try again.'); }
        } catch { alert('Failed to subscribe. Please try again.'); }
        finally { setIsLoading(false); }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4 justify-center items-center max-w-sm sm:max-w-md mx-auto px-4 sm:px-0">
            <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white text-gray-900 border-0 h-12 sm:h-14 text-base w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Button
                type="submit"
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold h-12 sm:h-14 px-6 sm:px-8 w-full"
                disabled={isLoading}
            >
                <Download className="w-5 h-5 mr-2" />
                {isLoading ? 'Sending...' : 'Download Free'}
            </Button>
        </form>
    );
}
