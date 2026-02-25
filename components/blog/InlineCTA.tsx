import React from 'react';
import Link from 'next/link';

interface InlineCTAProps {
    title?: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
}

export default function InlineCTA({
    title = "Ready to Secure Your Funding?",
    description,
    buttonText = "Speak with an Expert",
    buttonLink = "/contact?service=grant-expert-help"
}: InlineCTAProps) {
    return (
        <div className="my-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 border border-green-200 dark:border-green-800/30 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="text-xl">💡</span>
                        {title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 m-0">
                        {description}
                    </p>
                </div>
                <div className="flex-shrink-0 w-full md:w-auto">
                    <Link
                        href={buttonLink}
                        className="inline-flex w-full items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        {buttonText}
                    </Link>
                </div>
            </div>
        </div>
    );
}
