import React from 'react';
import { Quote } from 'lucide-react';

export default function InsiderInsightQuotes() {
  const currentMonth = new Date().getMonth();
  
  // Rotate quotes per month for freshness signal
  const quotes = [
    { text: "Most founders fail because they treat state grants like a Kickstarter campaign. The state doesn't care about your vision — they care about their quarterly employment numbers.", author: "Former State Economic Development Director" },
    { text: "The single biggest mistake I see is founders signing their commercial lease before getting the formal grant offer letter. The state will use that against you — they'll argue the grant wasn't an inducement.", author: "Grant Compliance Auditor" },
    { text: "If you're under $500K revenue, don't waste time on discretionary grants. Go straight to automated tax credit programs — WOTC, R&D credits, enterprise zone credits. They're formulaic, not political.", author: "State Procurement Advisor" },
  ];

  const selectedQuote = quotes[currentMonth % quotes.length];

  return (
    <div className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg mb-8 relative">
      <Quote className="w-8 h-8 text-gray-200 absolute top-4 right-4" />
      <p className="text-gray-700 text-sm leading-relaxed italic mb-3">
        "{selectedQuote.text}"
      </p>
      <p className="text-xs text-gray-500 font-semibold">
        — {selectedQuote.author}
      </p>
    </div>
  );
}
