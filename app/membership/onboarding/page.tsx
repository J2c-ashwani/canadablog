'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, CheckCircle2, ArrowRight, Loader2, Sparkles } from 'lucide-react';

export default function MembershipOnboardingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const emailParam = searchParams.get('email') || '';
  const subParam = searchParams.get('sub') || '';

  const [form, setForm] = useState({
    email: emailParam,
    name: '',
    companyName: '',
    province: 'ON',
    industry: 'Software / SaaS',
    stage: 'Early Revenue ($10k-$50k/mo)',
    revenueBand: '$100k - $500k',
    employees: '1-5',
    preference: 'Grants Only',
    growthObjective: 'Hiring & Technical R&D',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (emailParam) {
      setForm((prev) => ({ ...prev, email: emailParam }));
    }
  }, [emailParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email) {
      setError('Please provide your business email.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/membership/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, subscriptionId: subParam }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Failed to submit onboarding profile.');
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        router.push(`/membership/dashboard?email=${encodeURIComponent(form.email)}`);
      }, 2000);
    } catch {
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-16">
        {/* Header Badge */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> Founding Member Onboarding Step 2 of 2
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Set Up Your Custom Funding Radar Profile
          </h1>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            We use these 7 parameters to match your business against 1,200+ government grants and tax credits.
          </p>
        </div>

        {submitted ? (
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-10 text-center space-y-4 shadow-2xl">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h2 className="text-2xl font-bold text-white">Onboarding Complete!</h2>
            <p className="text-sm text-slate-300">
              Your first custom Funding Radar briefing has been dispatched to <strong>{form.email}</strong>.
            </p>
            <p className="text-xs text-slate-500">Redirecting to your Member Dashboard...</p>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl">
            {error && (
              <div className="mb-6 p-4 bg-red-900/40 border border-red-500/50 rounded-xl text-red-200 text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Founder Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Jenkins"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Company / Organization Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Tech Inc."
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Province / Region *</label>
                  <select
                    value={form.province}
                    onChange={(e) => setForm({ ...form, province: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none"
                  >
                    <option value="ON">Ontario (ON)</option>
                    <option value="BC">British Columbia (BC)</option>
                    <option value="AB">Alberta (AB)</option>
                    <option value="QC">Quebec (QC)</option>
                    <option value="MB">Manitoba (MB)</option>
                    <option value="SK">Saskatchewan (SK)</option>
                    <option value="NS">Nova Scotia (NS)</option>
                    <option value="USA">United States (USA)</option>
                    <option value="OTHER">Other Region</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Industry Sector *</label>
                  <select
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none"
                  >
                    <option value="Software / SaaS">Software / SaaS / AI</option>
                    <option value="Manufacturing & Hardware">Manufacturing & Hardware</option>
                    <option value="Agri-Food & BioTech">Agri-Food & BioTech</option>
                    <option value="CleanTech & Energy">CleanTech & Energy</option>
                    <option value="Professional Services">Professional Services</option>
                    <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                    <option value="Transportation & Logistics">Transportation & Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Annual Revenue Band *</label>
                  <select
                    value={form.revenueBand}
                    onChange={(e) => setForm({ ...form, revenueBand: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none"
                  >
                    <option value="Pre-revenue">Pre-revenue (&lt; $50k)</option>
                    <option value="$100k - $500k">$100k – $500k / year</option>
                    <option value="$500k - $2M">$500k – $2M / year</option>
                    <option value="$2M+">$2M+ / year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Number of Employees *</label>
                  <select
                    value={form.employees}
                    onChange={(e) => setForm({ ...form, employees: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none"
                  >
                    <option value="1-5">1 – 5 Employees</option>
                    <option value="6-20">6 – 20 Employees</option>
                    <option value="21-50">21 – 50 Employees</option>
                    <option value="50+">50+ Employees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Funding Preference *</label>
                  <select
                    value={form.preference}
                    onChange={(e) => setForm({ ...form, preference: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none"
                  >
                    <option value="Grants Only">Non-repayable Grants & Tax Credits Only</option>
                    <option value="Fast Financing Only">Fast Working Capital Financing Only</option>
                    <option value="Both Grants & Financing">Both Grants & Business Financing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Primary Growth Objective *</label>
                <select
                  value={form.growthObjective}
                  onChange={(e) => setForm({ ...form, growthObjective: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none"
                >
                  <option value="Hiring & Technical R&D">Hiring Developers / Engineers / R&D</option>
                  <option value="Export & Market Expansion">Export & Market Expansion (CanExport)</option>
                  <option value="Equipment & Clean Tech Adoption">Equipment Purchase & Clean Tech Adoption</option>
                  <option value="Working Capital & Inventory">Short-term Working Capital & Inventory</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 px-6 rounded-xl transition flex items-center justify-center gap-2 text-base shadow-xl"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Complete Setup & Dispatch First Briefing →</>}
              </button>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
