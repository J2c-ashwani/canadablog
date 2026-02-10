"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Download, FileText, Mail, Phone } from 'lucide-react';

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
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">Success!</h3>
                <p className="text-green-700 dark:text-green-400 mb-4">Your guide is downloading...</p>
                <Button
                    variant="outline"
                    className="w-full border-green-200 hover:bg-green-100 dark:border-green-800 dark:hover:bg-green-900"
                    onClick={() => {
                        const link = document.createElement('a');
                        link.href = '/lead-magnets/ultimate-grant-guide-2026.pdf';
                        link.download = 'Ultimate-Canada-Grant-Guide-2026.pdf';
                        link.click();
                    }}
                >
                    Download Again
                </Button>
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
