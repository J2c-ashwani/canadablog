'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Send,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Building2,
  Target,
  FileText,
  Link2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

interface BriefFormProps {
  orderId: string;
  token: string;
  companyName: string;
  website: string;
  buyerName: string;
}

export function PostPurchaseBriefForm({
  orderId,
  token,
  companyName,
  website,
  buyerName,
}: BriefFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    // Section A
    legalCompanyName: companyName || '',
    brandName: companyName || '',
    companyOverview: '',
    targetCustomers: '',
    valueProposition: '',

    // Section B
    primaryGoal: 'thought_leadership',
    coreMessage: '',
    targetKeywords: '',
    referenceArticles: '',

    // Section C
    audienceSeniority: 'Founders & C-Suite Executives',
    suggestedHeadlines: '',
    keyPointsToInclude: '',
    voiceAndTone: 'authoritative',

    // Section D
    primaryUrl: website || '',
    primaryAnchorText: '',
    secondaryUrl: '',
    secondaryAnchorText: '',
    readerCtaText: 'Learn more on our website',

    // Section E
    agreesToEditorialPolicy: false,
    agreesToDisclosureRequirement: false,
    notesForEditorialTeam: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.agreesToEditorialPolicy || !formData.agreesToDisclosureRequirement) {
      setErrorMessage('Please confirm both agreement checkboxes in Section E before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/advertise/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          token,
          brief: formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit editorial brief.');
      }

      router.push(data.redirectUrl || `/advertise/order/${orderId}/status?token=${encodeURIComponent(token)}`);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {errorMessage && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs sm:text-sm text-rose-800 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div>{errorMessage}</div>
        </div>
      )}

      {/* Section A: Company & Brand Background */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Section A: Company &amp; Brand Background</h2>
            <p className="text-xs text-slate-500">Provide the core context of your business for our writing team.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Legal Company Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.legalCompanyName}
              onChange={(e) => setFormData({ ...formData, legalCompanyName: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Brand / Product Name to Reference <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.brandName}
              onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Company Overview (What does your company do?) <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={3}
            placeholder="e.g. Apex FinTech provides automated R&D grant intelligence and working-capital advances to post-seed software startups in North America."
            value={formData.companyOverview}
            onChange={(e) => setFormData({ ...formData, companyOverview: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Target Customers / Ideal Reader Profile <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Series A tech founders, CFOs, biotech directors"
              value={formData.targetCustomers}
              onChange={(e) => setFormData({ ...formData, targetCustomers: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Primary Value Proposition <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Accelerates non-dilutive grant approvals by 40% with zero equity dilution."
              value={formData.valueProposition}
              onChange={(e) => setFormData({ ...formData, valueProposition: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>
        </div>
      </section>

      {/* Section B: Goals & Core Message */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Section B: Content Goals &amp; Core Narrative</h2>
            <p className="text-xs text-slate-500">Define the editorial outcome and central thesis of the article.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Primary Content Objective <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.primaryGoal}
              onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 bg-white focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            >
              <option value="thought_leadership">Executive Thought Leadership &amp; Industry Authority</option>
              <option value="product_launch">Product / Platform Launch &amp; Feature Spotlight</option>
              <option value="case_study">Customer Case Study &amp; Practical Problem-Solving</option>
              <option value="brand_awareness">Brand Awareness &amp; Market Positioning</option>
              <option value="lead_generation">High-Intent Lead &amp; Demo Inquiries</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Target Search Keywords or Focus Areas <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. SR&ED financing, tech startup capital, non-dilutive funding"
              value={formData.targetKeywords}
              onChange={(e) => setFormData({ ...formData, targetKeywords: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            The One Core Message or Takeaway for Readers <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={2}
            placeholder="What should the reader believe or do after finishing this article?"
            value={formData.coreMessage}
            onChange={(e) => setFormData({ ...formData, coreMessage: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Reference Articles or Competitor Links (Optional)
          </label>
          <input
            type="text"
            placeholder="Links to existing articles or reports whose angle or quality you admire"
            value={formData.referenceArticles}
            onChange={(e) => setFormData({ ...formData, referenceArticles: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>
      </section>

      {/* Section C: Article Details & Specifications */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Section C: Article Specifications &amp; Tone</h2>
            <p className="text-xs text-slate-500">Fine-tune the voice and specific factual elements to include.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Reader Seniority / Niche
            </label>
            <input
              type="text"
              value={formData.audienceSeniority}
              onChange={(e) => setFormData({ ...formData, audienceSeniority: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Editorial Voice &amp; Tone
            </label>
            <select
              value={formData.voiceAndTone}
              onChange={(e) => setFormData({ ...formData, voiceAndTone: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 bg-white focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            >
              <option value="authoritative">Authoritative &amp; Strategic (HBR / McKinsey style)</option>
              <option value="practical_how_to">Practical &amp; Action-Oriented (Step-by-step implementation)</option>
              <option value="executive_analytical">Executive &amp; Analytical (Data and metrics focused)</option>
              <option value="conversational_expert">Conversational Expert (Accessible founder-to-founder)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Suggested Headline Ideas (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. 'Beyond Venture Debt: How 2026 Tech Founders Stack Non-Dilutive Capital'"
            value={formData.suggestedHeadlines}
            onChange={(e) => setFormData({ ...formData, suggestedHeadlines: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Must-Include Points, Data or Product Capabilities <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={3}
            placeholder="List 2-4 specific features, statistics, customer success metrics, or unique differentiators that must be woven into the article."
            value={formData.keyPointsToInclude}
            onChange={(e) => setFormData({ ...formData, keyPointsToInclude: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>
      </section>

      {/* Section D: Links & CTAs */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Link2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Section D: Destination Links &amp; Reader CTA</h2>
            <p className="text-xs text-slate-500">Up to 2 contextual outbound links marked rel=&quot;sponsored&quot;.</p>
          </div>
        </div>

        {/* Primary Link */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Primary Outbound Link (Required)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Target URL <span className="text-rose-500">*</span>
              </label>
              <input
                type="url"
                required
                placeholder="https://yourcompany.com/product"
                value={formData.primaryUrl}
                onChange={(e) => setFormData({ ...formData, primaryUrl: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Anchor Text <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Apex FinTech Platform or grant intelligence software"
                value={formData.primaryAnchorText}
                onChange={(e) => setFormData({ ...formData, primaryAnchorText: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Secondary Link */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Secondary Outbound Link (Optional)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Secondary Target URL
              </label>
              <input
                type="url"
                placeholder="https://yourcompany.com/case-studies"
                value={formData.secondaryUrl}
                onChange={(e) => setFormData({ ...formData, secondaryUrl: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Anchor Text
              </label>
              <input
                type="text"
                placeholder="e.g. customer case studies or free capital audit"
                value={formData.secondaryAnchorText}
                onChange={(e) => setFormData({ ...formData, secondaryAnchorText: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 bg-white"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Desired Reader Call to Action (CTA) at the Article Conclusion
          </label>
          <input
            type="text"
            placeholder="e.g. 'Explore how Apex automates grant matching for Canadian founders at apexfintech.com'"
            value={formData.readerCtaText}
            onChange={(e) => setFormData({ ...formData, readerCtaText: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>
      </section>

      {/* Section E: Agreement & Submission */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Section E: Editorial Agreement &amp; Submission</h2>
            <p className="text-xs text-slate-500">Confirm standards and dispatch your brief to the writing desk.</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Additional Instructions for the Writers (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="Any specific phrases to avoid, trademark notes, or founder quotes to include."
            value={formData.notesForEditorialTeam}
            onChange={(e) => setFormData({ ...formData, notesForEditorialTeam: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={formData.agreesToEditorialPolicy}
              onChange={(e) => setFormData({ ...formData, agreesToEditorialPolicy: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              I certify that our business does not promote prohibited niches (gambling, payday loans, adult content, unverified medical claims, cryptocurrency scams) and I agree to FSI Digital&apos;s editorial standards.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={formData.agreesToDisclosureRequirement}
              onChange={(e) => setFormData({ ...formData, agreesToDisclosureRequirement: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              I agree that all commercial outbound links will carry the <code>rel=&quot;sponsored&quot;</code> attribute, and I understand that initial draft turnaround is 3 to 5 business days, followed by 1 included revision round.
            </span>
          </label>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Dispatching Brief to Writing Desk...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Editorial Brief &amp; Begin Drafting
              </>
            )}
          </button>
          <p className="mt-2 text-center text-xs text-slate-500">
            Order Reference: <code>{orderId}</code> • Draft turnaround timer begins upon brief submission.
          </p>
        </div>
      </section>
    </form>
  );
}
