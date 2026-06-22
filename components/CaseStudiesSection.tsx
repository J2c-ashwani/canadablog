import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, BookOpen } from 'lucide-react';
import { caseStudiesDatabase } from '@/lib/data/case-studies';

export function CaseStudiesSection({ limit }: { limit?: number }) {
  const studies = limit ? caseStudiesDatabase.slice(0, limit) : caseStudiesDatabase;

  return (
    <section className="py-12 sm:py-16 bg-slate-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Canadian Business Funding Scenarios
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            See how Canadian businesses in manufacturing, technology, agriculture, and professional services identify and stack government funding programs to access non-dilutive capital.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {studies.map((study) => (
            <Card key={study.id} className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden flex flex-col justify-between">
              <CardContent className="p-6 space-y-4">
                {/* Consultant Metadata Table */}
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 border-b border-slate-100 pb-4">
                  <div className="flex justify-between py-1">
                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Industry:</span>
                    <span className="font-semibold text-slate-800">{study.industry}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Location:</span>
                    <span className="font-semibold text-slate-800">{study.region}, {study.country}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Programs Identified:</span>
                    <span className="font-semibold text-slate-800 text-right max-w-[250px] truncate" title={study.programsStacked.join(', ')}>
                      {study.programsStacked.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Estimated Funding:</span>
                    <span className="font-extrabold text-emerald-600">{study.totalFundingMatch}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Business Challenge:</span>
                    <span className="font-semibold text-slate-800 text-right max-w-[250px] truncate" title={study.challenge}>
                      {study.challenge}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Outcome:</span>
                    <span className="font-semibold text-slate-800 text-right max-w-[250px] truncate" title={study.solution}>
                      {study.solution}
                    </span>
                  </div>
                </div>

                {/* Card footer redirect */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Funding Scenario</span>
                  </div>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    Read Full Roadmap <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Browse All Funding Scenarios <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
