import React from 'react';
import { Route, CheckCircle2 } from 'lucide-react';

interface Props {
  program1: string;
}

export default function BestEntryStrategy({ program1 }: Props) {
  // Freshness Hook Example
  const currentQtr = Math.floor((new Date().getMonth() + 3) / 3);

  return (
    <div className="bg-blue-50/50 border border-blue-200 p-8 rounded-xl mb-8 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2 m-0">
          <Route className="w-6 h-6 text-blue-600" />
          The Optimal Entry Strategy (Q{currentQtr} Update)
        </h3>
        
        <p className="text-gray-700 mb-6 text-sm leading-relaxed">
          The most common failure pattern we observe is startups applying directly for massive capital facility funds on day one. You need to build a "compliance track record" with the state first. Before submitting an exhaustive application for the <strong>{program1}</strong>, execute this 3-step sequence:
        </p>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="mt-1">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm m-0">1. Trigger a Micro-Grant (Training/Upskilling)</h4>
              <p className="text-sm text-gray-600 mt-1">First, apply for a standard workforce training grant (usually $1K-$3K per employee). These have near 90% approval rates and instantly get you into the state's procurement system as an approved vendor.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="mt-1">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm m-0">2. File for a Discretionary Local Match</h4>
              <p className="text-sm text-gray-600 mt-1">Simultaneously approach the local municipal economic council. Secure a small $10k-$25k property tax abatement. State-level funds heavily prioritize businesses that already have municipal "skin in the game."</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm m-0">3. Engage the State with the "Threat to Leave"</h4>
              <p className="text-sm text-gray-600 mt-1">Once you have local backing, approach the state for the major <strong>{program1}</strong>. Crucially, document that you are actively considering taking your expansion to a neighboring state if the numbers don't align.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
