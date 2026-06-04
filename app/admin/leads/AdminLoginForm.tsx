'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2, LockKeyhole } from 'lucide-react';

export function AdminLoginForm() {
  const router = useRouter();
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Incorrect access code.');
        return;
      }

      router.replace('/admin/leads');
      router.refresh();
    } catch (err) {
      console.error('Admin login failed:', err);
      setError('Unable to unlock the dashboard. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-gray-700">Private access code</span>
        <input
          type="password"
          value={key}
          onChange={(event) => setKey(event.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-3 text-base focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          placeholder="Enter your access code"
          autoComplete="current-password"
          required
        />
      </label>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-800">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gray-950 px-5 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
        {isSubmitting ? 'Unlocking...' : 'Unlock Dashboard'}
      </button>
    </form>
  );
}
