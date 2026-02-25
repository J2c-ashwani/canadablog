import React from 'react';

interface ShortAnswerBoxProps {
    content: string;
}

export default function ShortAnswerBox({ content }: ShortAnswerBoxProps) {
    // Strip repeating title/question prefix if it exists (e.g., "How to Apply... — The actual answer")
    // Use a strict regex to ensure we only strip actual titles and not valid sentences containing em-dashes
    let cleanContent = content;
    const dashMatch = content.match(/^([A-Za-z0-9\s\?&\/]{10,80})\s*[—-]\s+(.*)$/);
    if (dashMatch) {
        // If the part before the dash matches the strict title pattern it's likely a repeating title.
        cleanContent = dashMatch[2].charAt(0).toUpperCase() + dashMatch[2].slice(1);
    }

    return (
        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 rounded-r-xl p-5 mb-6 shadow-sm">
            <p className="text-gray-900 dark:text-gray-100 text-[1.05rem] md:text-lg leading-relaxed">
                <strong className="font-bold text-green-800 dark:text-green-400">The Short Answer: </strong>
                {cleanContent}
            </p>
        </div>
    );
}

