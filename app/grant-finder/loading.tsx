import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Loader2, Sparkles } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="shadow-xl max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Finding Your Perfect Grants</h3>
          <p className="text-gray-600">Our AI is analyzing hundreds of grants to find the best matches for you...</p>
          <div className="mt-4 space-y-2">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse w-3/4"></div>
            </div>
            <p className="text-sm text-gray-500">This usually takes 3-5 seconds</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
