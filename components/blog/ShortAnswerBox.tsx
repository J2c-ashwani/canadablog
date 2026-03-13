import React from 'react';

interface ShortAnswerBoxProps {
    question?: string;   // Intent-based question people actually search (e.g. "How much grant money can a tech startup in Toronto get?")
    content: string;     // The specific, data-rich answer
}

export default function ShortAnswerBox({ question, content }: ShortAnswerBoxProps) {
    return (
        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 rounded-r-xl p-5 mb-6 shadow-sm">
            {question && (
                <p className="text-gray-900 dark:text-gray-100 text-xl md:text-2xl font-bold mb-3 leading-snug">
                    {question}
                </p>
            )}
            <p className="text-gray-800 dark:text-gray-200 text-[1.05rem] md:text-lg leading-relaxed">
                <strong className="font-bold text-green-800 dark:text-green-400">The Short Answer: </strong>
                {content}
            </p>
        </div>
    );
}
