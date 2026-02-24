import Link from 'next/link';

interface RelatedLink {
    href: string;
    title: string;
    description: string;
}

interface RelatedPageLinksProps {
    title?: string;
    links: RelatedLink[];
    variant?: 'grid' | 'inline';
}

export function RelatedPageLinks({ title = "Related Funding Resources", links, variant = 'grid' }: RelatedPageLinksProps) {
    if (!links || links.length === 0) return null;

    if (variant === 'inline') {
        return (
            <nav aria-label="Related pages" className="my-8 p-6 bg-gray-50 dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
                <ul className="space-y-2">
                    {links.map((link) => (
                        <li key={link.href} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">→</span>
                            <Link
                                href={link.href}
                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                            >
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }

    return (
        <nav aria-label="Related pages" className="my-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="group block p-5 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 hover:border-green-500 dark:hover:border-green-500 hover:shadow-md transition-all duration-200"
                    >
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 transition-colors mb-2">
                            {link.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {link.description}
                        </p>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
