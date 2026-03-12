import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers } from "lucide-react"

export interface ComparisonRow {
    program: string;
    amount: string;
    equity: string;
    bestFor: string;
    timeline?: string;
}

interface GrantComparisonTableProps {
    title?: string;
    description?: string;
    programs: ComparisonRow[];
    className?: string;
}

export function GrantComparisonTable({ 
    title = "Top Programs Compared", 
    description = "Quickly compare the highest-value funding options available.",
    programs,
    className = "" 
}: GrantComparisonTableProps) {
    if (!programs || programs.length === 0) return null;

    return (
        <Card className={`border-2 border-indigo-100 bg-white ${className}`}>
            <CardHeader className="pb-4 border-b border-indigo-50 bg-indigo-50/30">
                <CardTitle className="text-xl font-bold text-indigo-950 flex items-center">
                    <Layers className="w-5 h-5 mr-2 text-indigo-600" />
                    {title}
                </CardTitle>
                {description && (
                    <p className="text-sm text-gray-600 mt-1">{description}</p>
                )}
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-200">
                                <th className="p-4 font-semibold text-gray-900 w-1/3">Program Name</th>
                                <th className="p-4 font-semibold text-gray-700 w-1/6">Max Amount</th>
                                <th className="p-4 font-semibold text-gray-700 w-1/6">Equity Req.</th>
                                <th className="p-4 font-semibold text-gray-700 w-1/4">Best For</th>
                                {programs[0].timeline && <th className="p-4 font-semibold text-gray-700 w-1/6">Timeline</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {programs.map((prog, i) => (
                                <tr key={i} className="hover:bg-indigo-50/30 transition-colors">
                                    <td className="p-4">
                                        <span className="font-bold text-indigo-700">{prog.program}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {prog.amount}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${prog.equity.toLowerCase() === '0%' || prog.equity.toLowerCase().includes('none') ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                                            {prog.equity}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-700 font-medium">
                                        {prog.bestFor}
                                    </td>
                                    {prog.timeline && (
                                        <td className="p-4 text-xs text-gray-600 whitespace-nowrap">
                                            {prog.timeline}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
