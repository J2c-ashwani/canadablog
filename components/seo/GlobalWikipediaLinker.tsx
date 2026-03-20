'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getSortedKeywordMap } from '@/lib/seo/keywordMap';

export default function GlobalWikipediaLinker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only run on content pages
    if (!pathname?.startsWith('/blog') && !pathname?.startsWith('/guides') && !pathname?.startsWith('/usa')) return;

    // Wait for React to finish hydrating the page to prevent hydration mismatch errors
    const timer = setTimeout(() => {
      const keywordMap = getSortedKeywordMap();
      const linkedUrls = new Set<string>();
      
      const escapedKeywords = keywordMap.map(k => k.keyword.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'));
      const keywordPattern = escapedKeywords.join('|');
      const regex = new RegExp(`\\\\b(${keywordPattern})\\\\b`, 'gi');

      // Target main reading paragraphs to avoid linking menus or sidebars
      const paragraphs = document.querySelectorAll('main p, article p, section p, .prose p');
      
      paragraphs.forEach((p) => {
        // Skip if already processed or inside an interactive element
        if (p.hasAttribute('data-autolinked') || p.closest('a') || p.closest('button') || p.closest('.no-autolink')) return;
        
        // Use TreeWalker to strictly target text nodes, preserving React DOM wrappers
        const walk = document.createTreeWalker(p, NodeFilter.SHOW_TEXT, null);
        let node;
        const nodesToReplace = [];

        while ((node = walk.nextNode())) {
          // Skip empty nodes, or nodes that are already inside a link
          if (!node.nodeValue?.trim() || node.parentElement?.closest('a')) continue;
          nodesToReplace.push(node);
        }

        nodesToReplace.forEach(textNode => {
          const originalText = textNode.nodeValue || '';
          
          let hasMutations = false;
          const newHtml = originalText.replace(regex, (match, matchedKeyword) => {
            const lowerMatch = matchedKeyword.toLowerCase();
            const keywordObj = keywordMap.find(k => k.keyword.toLowerCase() === lowerMatch);
            
            // Only link if we found the keyword and haven't linked to this URL yet
            if (!keywordObj || linkedUrls.has(keywordObj.url)) return match;
            
            linkedUrls.add(keywordObj.url);
            hasMutations = true;
            return `<a href="${keywordObj.url}" class="text-blue-600 hover:text-blue-800 underline decoration-blue-200 decoration-2 underline-offset-2 transition-colors font-semibold shadow-sm" data-autolink="true">${matchedKeyword}</a>`;
          });

          // Only replace if a link was actually injected
          if (hasMutations) {
            const span = document.createElement('span');
            span.innerHTML = newHtml;
            textNode.parentNode?.replaceChild(span, textNode);
          }
        });
        
        p.setAttribute('data-autolinked', 'true');
      });
      
    }, 1200); // 1.2s delay ensures all animations and lazy components finish loading

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
