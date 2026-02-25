"use client";

import { useState } from 'react';
import Link from 'next/link';

interface Question {
    id: string;
    text: string;
}

interface EligibleCheckProps {
    questions?: Question[];
}

const DEFAULT_QUESTIONS: Question[] = [
    { id: 'q1', text: 'Are you incorporated in Canada?' },
    { id: 'q2', text: 'Does your business generate over $500k in annual revenue?' },
];

export default function EligibleCheck({ questions = DEFAULT_QUESTIONS }: EligibleCheckProps) {
    const [answers, setAnswers] = useState<Record<string, boolean>>({});
    const activeQuestions = questions && questions.length > 0 ? questions : DEFAULT_QUESTIONS;

    const handleAnswer = (id: string, answer: boolean) => {
        setAnswers(prev => ({ ...prev, [id]: answer }));
    };

    const isComplete = activeQuestions.every(q => answers[q.id] !== undefined);
    const isEligible = activeQuestions.every(q => answers[q.id] === true);

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
                    "Am I Eligible?" Micro-Quiz
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Take 10 seconds to answer these questions and instantly see if you meet the baseline criteria for this funding.
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
                                    Based on your answers, you should strongly consider applying. Speak with a grant expert to confirm your eligibility and maximize your funding potential.
                                </p>
                                <Link href="/contact?service=grant-calculator" className="inline-flex px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    Speak with an Expert
                                </Link>
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
                                    However, there are over 4,500 grant programs in Canada. A grant specialist can help identify other programs you qualify for.
                                </p>
                                <Link href="/contact?service=grant-calculator" className="inline-flex px-5 py-2.5 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white font-medium rounded-lg text-sm transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                                    Explore Alternative Grants
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
