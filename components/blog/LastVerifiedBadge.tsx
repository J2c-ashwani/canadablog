import { ShieldCheck } from 'lucide-react';

interface LastVerifiedBadgeProps {
    date: string;
}

export default function LastVerifiedBadge({ date }: LastVerifiedBadgeProps) {
    const dateString = new Date(date.includes('T') ? date : `${date}T00:00:00Z`).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });

    return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-full text-xs font-medium text-green-700 dark:text-green-400 select-none">
            <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Last verified: {dateString}</span>
        </div>
    );
}
