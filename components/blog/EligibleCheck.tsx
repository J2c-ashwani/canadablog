"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Question {
    id: string;
    text: string;
}

interface EligibleCheckProps {
    questions?: Question[];
    title?: string;
    description?: string;
    jurisdiction?: 'US' | 'CA';
    fallbackText?: string;
}

const DEFAULT_CA_QUESTIONS: Question[] = [
    { id: 'q1', text: 'Are you incorporated in Canada?' },
    { id: 'q2', text: 'Does your business generate over $500k in annual revenue?' },
];

const DEFAULT_US_QUESTIONS: Question[] = [
    { id: 'q1', text: 'Is your business registered or planning to operate in the United States?' },
    { id: 'q2', text: 'Are you seeking non-dilutive federal or state grants and awards?' },
];

export default function EligibleCheck({ 
    questions,
    title = '"Am I Eligible?" Micro-Quiz',
    description = 'Take 10 seconds to answer these questions and instantly see if you meet the baseline criteria for this funding.',
    jurisdiction,
    fallbackText
}: EligibleCheckProps) {
    const pathname = usePathname();
    const isUS = jurisdiction === 'US' || (jurisdiction !== 'CA' && (pathname ? (pathname.startsWith('/usa') || pathname.includes('sbir') || pathname.includes('sba')) : false));

    const defaultQuestions = isUS ? DEFAULT_US_QUESTIONS : DEFAULT_CA_QUESTIONS;
    const activeQuestions = questions && questions.length > 0 ? questions : defaultQuestions;
    const resolvedFallbackText = fallbackText || (isUS 
        ? 'However, there are numerous federal and state funding programs across the United States. A grant specialist can help identify other programs you qualify for.'
        : 'However, there are over 4,500 grant programs in Canada. A grant specialist can help identify other programs you qualify for.');

    const [answers, setAnswers] = useState<Record<string, boolean>>({});
    const [leadEmail, setLeadEmail] = useState('');
    const [leadPhone, setLeadPhone] = useState('');
    const [savingLead, setSavingLead] = useState(false);
    const [leadSaved, setLeadSaved] = useState(false);

    const handleAnswer = (id: string, answer: boolean) => {
        setAnswers(prev => ({ ...prev, [id]: answer }));
    };

    const isComplete = activeQuestions.every(q => answers[q.id] !== undefined);
    const isEligible = activeQuestions.every(q => answers[q.id] === true);

    const handleQuizLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const email = leadEmail.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
        setSavingLead(true);
        try {
            localStorage.setItem('fsi:lead_email', email);
            localStorage.setItem('fsi:lead_saved_at', String(Date.now()));
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    phone: leadPhone.trim() || undefined,
                    category: 'Grant Eligibility Quiz',
                    source: isEligible ? 'EligibleCheck Quiz - Qualified' : 'EligibleCheck Quiz - Alternative',
                    country: isUS ? 'USA' : 'Canada',
                    state: 'national',
                    pagePath: pathname || '/',
                    consentToPartnerContact: true,
                    isSubscribed: true,
                    wantsAdvisorContact: Boolean(leadPhone.trim()),
                    doNotCall: !leadPhone.trim(),
                }),
            });
            setLeadSaved(true);
        } catch {
            // Leave retry enabled on transient failure
        } finally {
            setSavingLead(false);
        }
    };

    return (
        <div className="my-8 bg-white dark:bg-neutral-900 border border-indigo-100 dark:border-indigo-900/30 rounded-xl p-6 shadow-sm relative overflow-hidden">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>

            <div className="pl-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </span>
                    {title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    {description}
                </p>

                <div className="space-y-3">
                    {activeQuestions.map((q) => (
                        <div key={q.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-neutral-800/50 rounded-lg border border-gray-100 dark:border-neutral-800">
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{q.text}</span>
                            <div className="flex gap-2 shrink-0">
                                <button
                                    onClick={() => handleAnswer(q.id, true)}
                                    className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${answers[q.id] === true
                                        ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                                        : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700'
                                        }`}
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => handleAnswer(q.id, false)}
                                    className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${answers[q.id] === false
                                        ? 'bg-gray-800 text-white shadow-md transform scale-105'
                                        : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700'
                                        }`}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {isComplete && (
                    <div className={`mt-6 p-5 rounded-lg border transform transition-all duration-500 translate-y-0 opacity-100 ${isEligible
                        ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/30'
                        : 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/30'
                        }`}>
                        {isEligible ? (
                            <div>
                                <p className="text-green-800 dark:text-green-300 font-bold flex items-center gap-2 mb-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Great news! You appear to meet the baseline criteria.
                                </p>
                                <p className="text-sm text-green-700 dark:text-green-400 mb-4">
                                    Based on your answers, you should strongly consider applying. Enter your email below for matched programs &amp; deadlines, or run the full eligibility calculator.
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-amber-800 dark:text-amber-300 font-bold mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    You might not meet the standard criteria for this specific program.
                                </p>
                                <p className="text-sm text-amber-700 dark:text-amber-400 mb-4">
                                    {resolvedFallbackText}
                                </p>
                            </div>
                        )}
                        <div className="mt-4 pt-4 border-t border-black/10">
                            {leadSaved ? (
                                <div className="space-y-3">
                                    <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                                        ✓ Sent! Check your inbox for your matched funding list, or run the 60-second calculator for your exact funding estimate:
                                    </p>
                                    <Link
                                        href={`/calculator?email=${encodeURIComponent(leadEmail.trim())}&utm_source=eligible_check_quiz`}
                                        className="inline-flex px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-sm transition-colors shadow-sm"
                                    >
                                        See Full Matched Program Breakdown →
                                    </Link>
                                </div>
                            ) : (
                                <form onSubmit={handleQuizLeadSubmit} className="space-y-2.5">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                                        Get Your Free Matched Grants &amp; Deadlines List by Email:
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                            type="email"
                                            required
                                            placeholder="founder@company.com"
                                            value={leadEmail}
                                            onChange={(e) => setLeadEmail(e.target.value)}
                                            className="flex-1 h-10 px-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone (Optional — SMS alerts)"
                                            value={leadPhone}
                                            onChange={(e) => setLeadPhone(e.target.value)}
                                            className="sm:w-44 h-10 px-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white"
                                        />
                                        <button
                                            type="submit"
                                            disabled={savingLead}
                                            className="px-4 h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-sm whitespace-nowrap transition-colors disabled:opacity-60"
                                        >
                                            {savingLead ? 'Sending...' : 'Send Matches →'}
                                        </button>
                                    </div>
                                    <div>
                                        <Link href="/calculator" className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 hover:underline">
                                            Or run the 60-second Funding Calculator directly →
                                        </Link>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
