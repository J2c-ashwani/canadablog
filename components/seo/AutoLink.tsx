'use client';

import React from 'react';

// We import the keyword map directly and run the linking logic client-side
// This is a lightweight React component that wraps any text block and auto-links keywords
import { getSortedKeywordMap } from '@/lib/seo/keywordMap';

interface AutoLinkProps {
  text: string;
  className?: string;
  tag?: 'p' | 'span' | 'div';
}

/**
 * AutoLink Component — The Wikipedia Strategy for Hardcoded Pages
 * 
 * Wrap any hardcoded text in <AutoLink text="..."> and it will automatically
 * find and link keywords to your pillar content.
 * 
 * Usage:
 *   <AutoLink text="Ontario businesses can access IRAP and SR&ED programs." className="text-gray-700" />
 * 
 * This renders the text with "IRAP" and "SR&ED" as blue contextual links.
 */
export default function AutoLink({ text, className = '', tag = 'p' }: AutoLinkProps) {
  const linkedHtml = React.useMemo(() => {
    if (!text) return '';

    const keywordMap = getSortedKeywordMap();
    const linkedUrls = new Set<string>();
    
    const escapedKeywords = keywordMap.map(k => k.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const keywordPattern = escapedKeywords.join('|');
    
    const masterRegex = new RegExp(
      `(<a[^>]*>.*?<\\/a>|<h[1-6][^>]*>.*?<\\/h[1-6]>|<button[^>]*>.*?<\\/button>)|\\b(${keywordPattern})\\b`,
      'gi'
    );

    return text.replace(masterRegex, (match, ignoreGroup, matchedKeyword) => {
      if (ignoreGroup) return match;

      const lowerMatch = matchedKeyword.toLowerCase();
      const keywordObj = keywordMap.find(k => k.keyword.toLowerCase() === lowerMatch);
      if (!keywordObj) return match;

      if (linkedUrls.has(keywordObj.url)) return match;

      linkedUrls.add(keywordObj.url);

      return `<a href="${keywordObj.url}" class="text-blue-600 hover:text-blue-800 underline decoration-blue-200 decoration-2 underline-offset-2 transition-colors font-medium">${matchedKeyword}</a>`;
    });
  }, [text]);

  const Tag = tag;
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: linkedHtml }} />;
}
