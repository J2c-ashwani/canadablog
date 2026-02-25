'use client';

import React, { useEffect, useState } from 'react';

export interface JumpLink {
    title: string;
    id: string;
}

interface StickyTOCProps {
    links: JumpLink[];
}

export default function StickyTOC({ links }: StickyTOCProps) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -60% 0px' }
        );

        links.forEach((link) => {
            const element = document.getElementById(link.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [links]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            // Smooth scroll to element, accounting for fixed header
            const y = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    if (!links || links.length === 0) return null;

    return (
        <div className="sticky top-[72px] z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800 py-3 mb-10 overflow-x-auto no-scrollbar scroll-smooth">
            <nav className="flex items-center gap-2 md:gap-4 min-w-max px-2">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap hidden sm:inline-block mr-2">
                    On this page:
                </span>
                {links.map((link) => (
                    <a
                        key={link.id}
                        href={`#${link.id}`}
                        onClick={(e) => handleClick(e, link.id)}
                        className={`
              inline-flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              ${activeId === link.id
                                ? 'bg-green-600 text-white shadow-sm'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'}
            `}
                    >
                        {link.title}
                    </a>
                ))}
            </nav>
        </div>
    );
}
