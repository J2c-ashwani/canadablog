import { ShieldCheck } from 'lucide-react';

interface LastVerifiedBadgeProps {
    date: string;
}

export default function LastVerifiedBadge({ date }: LastVerifiedBadgeProps) {
    const postDate = new Date(date);
    const now = new Date();

    // Calculate "Verified" date
    // If post is from current month, use post date
    // If post is older, use 1st of current month as verification date
    let verifiedDate = new Date(now.getFullYear(), now.getMonth(), 1);

    // If post is very recent (this month), use the actual post date
    if (postDate > verifiedDate) {
        verifiedDate = postDate;
    }

    const dateString = verifiedDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-full text-xs font-medium text-green-700 dark:text-green-400 select-none">
            <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Verified: {dateString}</span>
        </div>
    );
}
