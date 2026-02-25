import React from 'react';
import Image from 'next/image';

interface EEATBadgeProps {
    authorName: string;
    authorImage: string;
    date: string;
}

export default function EEATBadge({ authorName, authorImage, date }: EEATBadgeProps) {
    // Format the date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="flex items-center gap-4 py-4 mb-8 border-y border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900/50 rounded-xl px-4">
            <div className="flex-shrink-0 relative w-12 h-12 overflow-hidden rounded-full border-2 border-white shadow-sm">
                {/* We use standard img to avoid Next.js Image configuration issues for external/local rapid dev */}
                <img
                    src={authorImage}
                    alt={`Reviewed by ${authorName}`}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Expert Review: {authorName}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                    </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Updated: {formattedDate} • Based on official government guidelines
                </span>
            </div>
        </div>
    );
}
