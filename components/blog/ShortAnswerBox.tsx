import React from 'react';

interface ShortAnswerBoxProps {
    question?: string;   // Intent-based question people actually search (e.g. "How much grant money can a tech startup in Toronto get?")
    content: string | React.ReactNode;     // The specific, data-rich answer
    isH1?: boolean;      // If true, render the question as the page's primary <h1> tag for SEO
    ctaText?: string;    // Intent-specific CTA (e.g. "Check whether your business fits healthcare grants")
    ctaHref?: string;    // Link to calculator, screener, or match report
    ctaContext?: string; // Optional context identifier
}

export default function ShortAnswerBox({ question, content, isH1 = false, ctaText, ctaHref, ctaContext }: ShortAnswerBoxProps) {
    return (
        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 rounded-r-xl p-5 mb-6 shadow-sm">
            {question && (
                isH1 ? (
                    <h1 className="text-gray-900 dark:text-gray-100 text-xl md:text-2xl font-bold mb-3 leading-snug">
                        {question}
                    </h1>
                ) : (
                    <p className="text-gray-900 dark:text-gray-100 text-xl md:text-2xl font-bold mb-3 leading-snug">
                        {question}
                    </p>
                )
            )}
            <p className="text-gray-800 dark:text-gray-200 text-[1.05rem] md:text-lg leading-relaxed">
                <strong className="font-bold text-green-800 dark:text-green-400">The Short Answer: </strong>
                {content}
            </p>
            {ctaHref && ctaText && (
                <div 
                    data-short-answer-bridge={ctaContext || "pilot"}
                    className="mt-4 pt-3 border-t border-green-200/80 dark:border-green-800/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 not-prose"
                >
                    <span className="text-xs font-semibold text-green-900 dark:text-green-300 flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                        Verify before applying:
                    </span>
                    <a
                        href={ctaHref}
                        className="inline-flex items-center justify-center gap-1 text-xs font-bold bg-green-700 hover:bg-green-800 text-white px-3.5 py-1.5 rounded-lg transition-colors shadow-2xs"
                    >
                        {ctaText} →
                    </a>
                </div>
            )}
        </div>
    );
}
