'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

function FormInner() {
  const searchParams = useSearchParams();
  const preselectedPackage = searchParams.get('package');

  let defaultPackage = 'Done-for-You Sponsored Article ($225 USD)';
  if (preselectedPackage === 'client-supplied') {
    defaultPackage = 'Client-Supplied Sponsored Article (Starting at $125 USD)';
  } else if (preselectedPackage === 'resource-insertion') {
    defaultPackage = 'Resource Insertion / Article Sponsorship ($100–$150 USD)';
  } else if (preselectedPackage === 'agency-bulk') {
    defaultPackage = 'Agency & Multi-Article Publishing (Custom Quote)';
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    website: '',
    packageInterest: defaultPackage,
    targetAudience: '',
    topicAngle: '',
    destinationUrl: '',
    timeline: 'Within 2-3 weeks',
    budget: '',
    notes: '',
    website_hp: '', // Honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/advertise/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      setSubmittedInquiryId(data.inquiryId || 'INQ-SUCCESS');
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedInquiryId) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-white p-8 sm:p-12 shadow-sm text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
          Publishing Proposal Received
        </h2>
        <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-6">
          Thank you for reaching out to FSI Digital. We have sent a confirmation email to{' '}
          <strong className="text-slate-900">{formData.email}</strong>. Our editorial team will evaluate your topic angle and respond within <strong>1 business day</strong>.
        </p>

        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 max-w-md mx-auto text-left text-xs text-slate-600 space-y-1.5 mb-8">
          <div><strong>Reference ID:</strong> <code>{submittedInquiryId}</code></div>
          <div><strong>Company:</strong> {formData.companyName}</div>
          <div><strong>Package Selected:</strong> {formData.packageInterest}</div>
          <div><strong>Estimated Response:</strong> Within 24 business hours</div>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/advertise"
            className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
          >
            &larr; Back to Publishing Portal
          </Link>
          <span className="hidden sm:inline text-slate-300">•</span>
          <Link
            href="/advertise/order/done-for-you"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 inline-flex items-center gap-1"
          >
            Prefer instant checkout? Order Done-for-You ($225) <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-6">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="website_hp"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website_hp}
          onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
        />
      </div>

      {errorMessage && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-xs sm:text-sm text-rose-800 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div>{errorMessage}</div>
        </div>
      )}

      {/* Row 1: Contact info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Your Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Sarah Jenkins"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Work Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="sarah@yourcompany.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
          <p className="mt-1 text-[11px] text-slate-500">Corporate business email preferred.</p>
        </div>
      </div>

      {/* Row 2: Company details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Company / Brand Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Apex FinTech Solutions"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Website URL <span className="text-rose-500">*</span>
          </label>
          <input
            type="url"
            required
            placeholder="https://www.yourcompany.com"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>
      </div>

      {/* Row 3: Package & Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Package of Interest <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.packageInterest}
            onChange={(e) => setFormData({ ...formData, packageInterest: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 bg-white focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          >
            <option value="Done-for-You Sponsored Article ($225 USD)">
              Done-for-You Sponsored Article ($225 USD)
            </option>
            <option value="Client-Supplied Sponsored Article (Starting at $125 USD)">
              Client-Supplied Sponsored Article (Starting at $125 USD)
            </option>
            <option value="Resource Insertion / Article Sponsorship ($100–$150 USD)">
              Resource Insertion / Article Sponsorship ($100–$150 USD)
            </option>
            <option value="Agency & Multi-Article Publishing (Custom Quote)">
              Agency &amp; Multi-Article Publishing (Custom Quote)
            </option>
            <option value="Bespoke Content Campaign / Other">
              Bespoke Content Campaign / Other
            </option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Desired Timeline
          </label>
          <select
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 bg-white focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          >
            <option value="ASAP (Within 1 week)">ASAP (Within 1 week)</option>
            <option value="Within 2-3 weeks">Within 2-3 weeks</option>
            <option value="Next month">Next month</option>
            <option value="Flexible / Planning ahead">Flexible / Planning ahead</option>
          </select>
        </div>
      </div>

      {/* Row 4: Topic & Destination Link */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Proposed Article Topic or Editorial Angle <span className="text-rose-500">*</span>
        </label>
        <textarea
          required
          rows={3}
          placeholder="Briefly describe the topic, problem, or narrative angle you wish to explore (e.g. 'How Early-Stage SaaS Companies Bridge the Pre-Seed to Series A Gap via Government Grant Stacking')."
          value={formData.topicAngle}
          onChange={(e) => setFormData({ ...formData, topicAngle: e.target.value })}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Destination URL(s) to Feature
          </label>
          <input
            type="url"
            placeholder="https://yourcompany.com/product"
            value={formData.destinationUrl}
            onChange={(e) => setFormData({ ...formData, destinationUrl: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
          <p className="mt-1 text-[11px] text-slate-500">Max 2 links allowed. Tagged rel=&quot;sponsored&quot;.</p>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Estimated Monthly Placements / Budget
          </label>
          <input
            type="text"
            placeholder="e.g. Single article or $500–$2,000/mo"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>
      </div>

      {/* Row 5: Notes */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Additional Context or Target Audience Notes (Optional)
        </label>
        <textarea
          rows={2}
          placeholder="Any specific instructions, competitor references, or key messaging points."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
        />
      </div>

      {/* Disclosure Agreement Notice */}
      <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-xs text-slate-600 leading-relaxed">
        <p>
          By submitting this proposal, you confirm that your company does not operate within prohibited categories (gambling, payday loans, adult, unverified health claims) and that you agree to transparent sponsorship disclosures (<code>rel=&quot;sponsored&quot;</code>). Review our{" "}
          <Link href="/advertise/editorial-guidelines" className="text-indigo-600 underline" target="_blank">
            Editorial Guidelines
          </Link>.
        </p>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting Proposal...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Publishing Proposal
            </>
          )}
        </button>
        <p className="mt-2 text-center text-xs text-slate-500">
          No upfront payment required for inquiries. An editor will reply within 1 business day.
        </p>
      </div>
    </form>
  );
}

export function PublishingInquiryForm() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading inquiry form...</div>}>
      <FormInner />
    </Suspense>
  );
}
