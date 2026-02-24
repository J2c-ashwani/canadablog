'use client';

import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download } from "lucide-react"

export function HeroEmailForm() {
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0">
            <div className="flex flex-col gap-3 w-full max-w-md sm:max-w-lg">
                <Input
                    type="email"
                    placeholder="Enter your email for free PDF guide"
                    className="bg-white text-gray-900 border-0 h-12 sm:h-14 text-base w-full rounded-lg"
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
                    {isLoading ? 'Sending...' : 'Get Free PDF Guide'}
                </Button>
            </div>
        </form>
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
