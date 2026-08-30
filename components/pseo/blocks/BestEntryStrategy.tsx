import React from 'react';
import { Route, CheckCircle2 } from 'lucide-react';

interface Props {
  program1: string;
}

export default function BestEntryStrategy({ program1 }: Props) {
  return (
    <div className="bg-blue-50/50 border border-blue-200 p-8 rounded-xl mb-8 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2 m-0">
          <Route className="w-6 h-6 text-blue-600" />
          A Practical Entry Strategy
        </h3>
        
        <p className="text-gray-700 mb-6 text-sm leading-relaxed">
          Before preparing an application for <strong>{program1}</strong>, reduce wasted work with this three-step research sequence:
        </p>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="mt-1">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm m-0">1. Define the funded project</h4>
              <p className="text-sm text-gray-600 mt-1">Write the goal, eligible location, start date, milestones, itemized costs, matching funds, and measurable outcomes on one page.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="mt-1">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm m-0">2. Verify the controlling rules</h4>
              <p className="text-sm text-gray-600 mt-1">Confirm the intake, applicant test, supported costs, approval timing, contribution type, and official application channel.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm m-0">3. Build the evidence file</h4>
              <p className="text-sm text-gray-600 mt-1">Prepare incorporation and ownership records, financials, quotes, project capacity, customer or technical evidence, and any required partner commitments.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
