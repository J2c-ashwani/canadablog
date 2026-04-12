import React from 'react';
import { Building2, ExternalLink } from 'lucide-react';

export default function KeyLocalInstitutions() {
  return (
    <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl mb-8">
      <h3 className="text-lg font-bold text-orange-900 flex items-center gap-2 m-0 mb-4">
        <Building2 className="w-5 h-5 text-orange-600" />
        Key Local Institutions (Free Resources)
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Before you pay for a consultant, use these free state-funded resources. Most founders don't know they exist:
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-lg border border-orange-100">
          <h4 className="font-bold text-sm text-gray-900 m-0 mb-1">SBDC (Small Business Dev Center)</h4>
          <p className="text-xs text-gray-600 mb-2">Free 1-on-1 advising, grant application review, financial projections. Federally funded, no strings attached.</p>
          <a href="https://www.sba.gov/local-assistance/find/?type=SBDC" target="_blank" rel="noopener noreferrer" className="text-orange-600 text-xs font-medium hover:underline inline-flex items-center gap-1">
            Find Your Local SBDC <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="bg-white p-4 rounded-lg border border-orange-100">
          <h4 className="font-bold text-sm text-gray-900 m-0 mb-1">SCORE Mentors</h4>
          <p className="text-xs text-gray-600 mb-2">Free mentor matching with retired executives who have direct experience navigating state grants and procurement.</p>
          <a href="https://www.score.org/find-mentor" target="_blank" rel="noopener noreferrer" className="text-orange-600 text-xs font-medium hover:underline inline-flex items-center gap-1">
            Find a Mentor <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="bg-white p-4 rounded-lg border border-orange-100">
          <h4 className="font-bold text-sm text-gray-900 m-0 mb-1">State Economic Dev Office</h4>
          <p className="text-xs text-gray-600">Every state has a dedicated office. They will literally tell you which programs you qualify for. Call them before applying.</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-orange-100">
          <h4 className="font-bold text-sm text-gray-900 m-0 mb-1">Local Incubator / Accelerator</h4>
          <p className="text-xs text-gray-600">University-linked incubators often have direct pipelines to SBIR/STTR grants and state R&D pools that aren't publicly listed.</p>
        </div>
      </div>
    </div>
  );
}
