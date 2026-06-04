'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2, Loader2, Mail } from 'lucide-react';

type ConsultationRequestFormProps = {
  consultationSlug: string;
  cleanTitle: string;
};

export function ConsultationRequestForm({ consultationSlug, cleanTitle }: ConsultationRequestFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    details: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const name = `${formData.firstName} ${formData.lastName}`.trim();
    const message = `${formData.details}

Consultation page: ${consultationSlug}
Requested session: ${cleanTitle}`;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: formData.email,
          category: 'Consultation Request',
          message,
          companyName: formData.company,
          businessDescription: message,
          fundingPurpose: cleanTitle,
          pagePath: window.location.pathname,
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to save consultation request.');
      }

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        details: '',
      });
    } catch (error) {
      console.error('Consultation request error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {submitStatus === 'success' && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800">
          <CheckCircle2 className="mr-2 inline h-4 w-4" />
          Request received. You can book the paid strategy session from the secure popup.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
          Please try again. Your request could not be saved.
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="firstName"
            required
            value={formData.firstName}
            onChange={(event) => updateField('firstName', event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            required
            value={formData.lastName}
            onChange={(event) => updateField('lastName', event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Work Email</label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pl-10 transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="mb-1 block text-sm font-medium text-gray-700">Company Name</label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={(event) => updateField('company', event.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="details" className="mb-1 block text-sm font-medium text-gray-700">Briefly describe your project or needs</label>
        <textarea
          id="details"
          rows={3}
          required
          value={formData.details}
          onChange={(event) => updateField('details', event.target.value)}
          className="w-full resize-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Saving Request...
          </>
        ) : (
          'Request Strategy Session'
        )}
      </button>

      <p className="mt-4 text-center text-xs text-gray-500">
        By submitting this form, you agree to our{' '}
        <a href="/terms" className="text-blue-600 hover:underline">Terms</a>
        {' '}and{' '}
        <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
      </p>
    </form>
  );
}
