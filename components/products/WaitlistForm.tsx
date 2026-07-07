'use client';

import React, { useState, FormEvent } from 'react';
import { Loader2, CheckCircle, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'Membership Waitlist',
          name: '',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setErrorMsg(data.error || 'Failed to join waitlist. Please try again.');
      }
    } catch (err) {
      console.error('Waitlist submission error:', err);
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-6 text-center space-y-2 animate-in fade-in duration-300 w-full max-w-md mx-auto">
        <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
        <h4 className="font-extrabold text-slate-100 text-sm">You're on the list!</h4>
        <p className="text-xs text-slate-400">
          Success! We've added <strong>{email}</strong> to the founding member waitlist. We'll alert you as soon as spots open up.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-md mx-auto text-left">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="email"
            placeholder="Enter your business email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-900 border-slate-800 text-white pl-10 h-12 text-sm w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            required
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-indigo-650 hover:bg-indigo-600 text-white font-extrabold text-xs h-12 px-6 sm:w-auto shrink-0 shadow-md shadow-indigo-950/20 rounded-lg flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin animate-infinite" />
              Joining...
            </>
          ) : (
            'Join Waitlist'
          )}
        </Button>
      </div>
      {errorMsg && (
        <p className="text-xs text-red-400 font-semibold text-center mt-1">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
