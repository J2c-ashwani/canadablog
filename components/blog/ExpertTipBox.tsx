import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, AlertTriangle, CheckCircle, Info } from "lucide-react"

type TipType = 'tip' | 'warning' | 'success' | 'note';

interface ExpertTipBoxProps {
    type?: TipType
    title: string
    children: React.ReactNode
    author?: string
    className?: string
}

export function ExpertTipBox({
    type = 'tip',
    title,
    children,
    author = "FSI Grant Specialist",
    className = ""
}: ExpertTipBoxProps) {

    const styles = {
        tip: {
            bg: "bg-amber-50",
            border: "border-amber-200",
            iconColor: "text-amber-600",
            textColor: "text-amber-900",
            titleColor: "text-amber-800",
            icon: <Lightbulb className="w-6 h-6" />
        },
        warning: {
            bg: "bg-red-50",
            border: "border-red-200",
            iconColor: "text-red-600",
            textColor: "text-red-900",
            titleColor: "text-red-800",
            icon: <AlertTriangle className="w-6 h-6" />
        },
        success: {
            bg: "bg-green-50",
            border: "border-green-200",
            iconColor: "text-green-600",
            textColor: "text-green-900",
            titleColor: "text-green-800",
            icon: <CheckCircle className="w-6 h-6" />
        },
        note: {
            bg: "bg-blue-50",
            border: "border-blue-200",
            iconColor: "text-blue-600",
            textColor: "text-blue-900",
            titleColor: "text-blue-800",
            icon: <Info className="w-6 h-6" />
        }
    };

    const currentStyle = styles[type];

    return (
        <Card className={`border-l-4 ${currentStyle.border} ${currentStyle.bg} ${className} overflow-hidden`}>
            <CardContent className="p-5">
                <div className="flex items-start gap-4">
                    <div className={`mt-1 bg-white p-2 rounded-full shadow-sm ${currentStyle.iconColor}`}>
                        {currentStyle.icon}
                    </div>
                    <div className="flex-1">
                        <h4 className={`font-bold text-lg mb-2 ${currentStyle.titleColor}`}>
                            {title}
                        </h4>
                        <div className={`prose prose-sm max-w-none ${currentStyle.textColor}`}>
                            {children}
                        </div>
                        {author && (
                            <div className="mt-4 flex items-center text-xs font-medium uppercase tracking-wider opacity-70">
                                <div className="w-6 h-[1px] bg-current mr-2"></div>
                                Insider Insight from {author}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
