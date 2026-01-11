import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Clock } from "lucide-react"

interface Metric {
    label: string
    value: string
    icon: React.ReactNode
    description?: string
    color?: string
}

interface GrantSuccessTableProps {
    title?: string
    metrics: Metric[]
    className?: string
}

export function GrantSuccessTable({
    title = "Program Success Metrics",
    metrics,
    className = ""
}: GrantSuccessTableProps) {
    return (
        <Card className={`border-2 border-blue-100 bg-blue-50/50 ${className}`}>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-blue-900 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {metrics.map((metric, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                            <div className={`mb-2 ${metric.color || "text-blue-600"}`}>
                                {metric.icon}
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mb-1 leading-none">
                                {metric.value}
                            </div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                {metric.label}
                            </div>
                            {metric.description && (
                                <div className="text-[10px] text-gray-400 mt-2 leading-tight">
                                    {metric.description}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
