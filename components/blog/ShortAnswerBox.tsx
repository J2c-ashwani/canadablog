import React from 'react';

interface ShortAnswerBoxProps {
    content: string;
}

export default function ShortAnswerBox({ content }: ShortAnswerBoxProps) {
    return (
        <div className="relative mb-10">
            {/* Decorative gradient border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl blur opacity-30 dark:opacity-20 pointer-events-none"></div>

            <div className="relative bg-white dark:bg-neutral-900 border border-green-100 dark:border-green-900/30 rounded-xl p-6 shadow-sm overflow-hidden">
                {/* Accent strip */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-green-500 to-blue-500"></div>

                <div className="pl-2">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </span>
                        The Short Answer
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
}
