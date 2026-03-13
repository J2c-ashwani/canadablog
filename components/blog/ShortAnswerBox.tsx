import React from 'react';

interface ShortAnswerBoxProps {
    question?: string;   // Intent-based question people actually search (e.g. "How much grant money can a tech startup in Toronto get?")
    content: string | React.ReactNode;     // The specific, data-rich answer
    isH1?: boolean;      // If true, render the question as the page's primary <h1> tag for SEO
}

export default function ShortAnswerBox({ question, content, isH1 = false }: ShortAnswerBoxProps) {
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
        </div>
    );
}
