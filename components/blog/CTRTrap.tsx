'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, CalendarDays, ArrowDownCircle } from 'lucide-react';
import Link from 'next/link';

export function CTRTrap() {
    return (
        <div className="bg-green-50/80 border border-green-200 rounded-xl p-5 mb-8 shadow-sm">
            <div className="flex items-center text-green-800 font-bold mb-3">
                <ShieldCheck className="w-5 h-5 mr-2" />
                All grants listed below are verified with official application links.
            </div>
            
            <ul className="space-y-2 mb-5">
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    No repayment required (Zero Equity)
                </li>
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    Direct application links (No middlemen)
                </li>
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                    <CalendarDays className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    Updated for March 2026 Deadlines
                </li>
            </ul>

            <Link 
                href="#programs" 
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                View All Grants
                <ArrowDownCircle className="w-4 h-4 ml-2" />
            </Link>
        </div>
    );
}
