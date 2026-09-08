'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

type ApplicationResult = {
  statusUrl: string;
  emailAccepted?: boolean;
};

const initialForm = {
  name: '',
  email: '',
  payoutEmail: '',
  company: '',
  website: '',
  country: '',
  audienceType: '',
  audienceSize: '',
  promotionPlan: '',
  website_hp: '',
  acceptedTerms: false,
};

export function AffiliateApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ApplicationResult | null>(null);

  const update = (field: keyof typeof initialForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/affiliates/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || 'Your application could not be submitted.');
      setResult({ statusUrl: body.statusUrl, emailAccepted: body.emailAccepted });
    } catch (caught: any) {
      setError(caught?.message || 'Your application could not be submitted.');
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8" role="status">
        <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        <h2 className="mt-4 text-2xl font-bold text-gray-950">Application received</h2>
        <p className="mt-2 leading-7 text-gray-700">
          Your application is pending a manual review. You cannot earn commission until FSI Digital approves the account.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Save the private status link below. {result.emailAccepted
            ? 'A copy was accepted by our email provider.'
            : 'Email confirmation could not be verified, so save this link now.'}
        </p>
        <a
          href={result.statusUrl}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-gray-950 px-5 py-3 font-semibold text-white hover:bg-gray-800"
        >
          Open private status page <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-800">Full name *</span>
          <input required maxLength={100} value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100" autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-800">Country *</span>
          <select required value={form.country} onChange={(e) => update('country', e.target.value)} className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100">
            <option value="">Select one</option>
            <option value="Canada">Canada</option>
            <option value="United States">United States</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-800">Contact email *</span>
          <input required type="email" maxLength={254} value={form.email} onChange={(e) => update('email', e.target.value)} className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100" autoComplete="email" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-800">PayPal payout email *</span>
          <input required type="email" maxLength={254} value={form.payoutEmail} onChange={(e) => update('payoutEmail', e.target.value)} className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100" autoComplete="email" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-800">Company or publication</span>
          <input maxLength={120} value={form.company} onChange={(e) => update('company', e.target.value)} className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100" autoComplete="organization" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-800">Website or public profile</span>
          <input type="url" maxLength={500} value={form.website} onChange={(e) => update('website', e.target.value)} placeholder="https://" className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-800">Primary audience *</span>
          <select required value={form.audienceType} onChange={(e) => update('audienceType', e.target.value)} className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100">
            <option value="">Select one</option>
            <option value="newsletter">Newsletter</option>
            <option value="community">Founder or business community</option>
            <option value="website">Website or publication</option>
            <option value="social">Social audience</option>
            <option value="professional-network">Professional network</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-800">Approximate audience size *</span>
          <select required value={form.audienceSize} onChange={(e) => update('audienceSize', e.target.value)} className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100">
            <option value="">Select one</option>
            <option value="under-500">Under 500</option>
            <option value="500-2499">500–2,499</option>
            <option value="2500-9999">2,500–9,999</option>
            <option value="10000-plus">10,000+</option>
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-gray-800">How will you promote FSI Digital? *</span>
        <textarea required minLength={30} maxLength={1500} rows={5} value={form.promotionPlan} onChange={(e) => update('promotionPlan', e.target.value)} className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100" placeholder="Describe the audience, channel, and the truthful context in which you would share a referral link." />
      </label>

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>Website confirmation<input tabIndex={-1} autoComplete="off" value={form.website_hp} onChange={(e) => update('website_hp', e.target.value)} /></label>
      </div>

      <label className="mt-5 flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <input required type="checkbox" checked={form.acceptedTerms} onChange={(e) => update('acceptedTerms', e.target.checked)} className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600" />
        <span className="text-sm leading-6 text-gray-700">
          I accept the program terms below. I will disclose compensated links, use only permission-based promotion, and will not make funding guarantees, claim government affiliation, spam people, self-refer, cookie-stuff, impersonate FSI Digital, or use deceptive claims.
        </span>
      </label>

      {error && <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">{error}</div>}

      <button disabled={submitting} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60">
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        {submitting ? 'Submitting securely…' : 'Apply for manual review'}
      </button>
      <p className="mt-3 text-center text-xs text-gray-500">Applying does not guarantee acceptance. There is no fee to apply.</p>
    </form>
  );
}
