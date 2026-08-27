import type { Metadata } from 'next';
import { getPurchaseByToken } from '@/lib/products/purchase-store';
import { buildMCAReadinessReport, type MCAReadinessProfile } from '@/lib/mca/readiness-report';
import { PrintReportButton } from './PrintReportButton';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Private MCA Funding Readiness Report | FSI Digital',
  robots: { index: false, follow: false },
};

function numberValue(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function money(value: number) {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(value);
}

export default async function MCAReadinessReportPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = '' } = await searchParams;
  const purchase = token ? await getPurchaseByToken(token) : null;
  if (!purchase
    || purchase.productId !== 'mca-readiness-report'
    || purchase.currency?.toUpperCase() !== 'CAD'
    || !purchase.paypalCaptureId
    || purchase.paymentStatus !== 'provider_capture_verified'
    || ['refunded', 'revoked', 'failed', 'cancelled'].includes(purchase.status.toLowerCase())) {
    return <main className="min-h-[70vh] bg-slate-50 px-4 py-20"><div className="mx-auto max-w-lg rounded-2xl border border-amber-200 bg-white p-8 text-center"><h1 className="text-2xl font-black text-slate-950">Private report unavailable</h1><p className="mt-3 text-sm text-slate-600">This access link is invalid, revoked, or not attached to a provider-verified MCA report purchase.</p></div></main>;
  }

  let data: Record<string, unknown> = {};
  try { data = JSON.parse(purchase.profileData || '{}'); } catch { data = {}; }
  const profile: MCAReadinessProfile = {
    applicationId: String(data.applicationId || ''),
    legalBusinessName: String(data.legalBusinessName || data.company || 'Business'),
    province: String(data.province || 'Canada'),
    industry: String(data.industry || 'Business'),
    yearsInBusiness: numberValue(data.yearsInBusiness),
    monthlyRevenue: numberValue(data.monthlyRevenue || data.revenue),
    fundingAmount: numberValue(data.fundingAmount),
    fundingPurpose: String(data.fundingPurpose || data.goal || 'Working capital'),
    fileCount: numberValue(data.fileCount),
  };
  const report = buildMCAReadinessReport(profile);
  const scoreColor = report.score >= 75 ? 'text-emerald-700' : report.score >= 45 ? 'text-amber-700' : 'text-red-700';

  return <main className="bg-slate-100 px-4 py-10 print:bg-white print:p-0">
    <article className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl print:max-w-none print:border-0 print:shadow-none">
      <header className="bg-slate-950 px-6 py-8 text-white sm:px-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div><div className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">FSI Digital Canada</div><h1 className="mt-2 text-3xl font-black">MCA Funding Readiness Report</h1><p className="mt-2 text-sm text-slate-300">Automated assessment based on the application data declared at submission.</p></div>
          <PrintReportButton />
        </div>
      </header>

      <div className="p-6 sm:p-10">
        <section className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">
          <div><div className="text-xs font-bold uppercase tracking-wider text-slate-500">Business</div><div className="mt-1 font-black text-slate-950">{profile.legalBusinessName}</div></div>
          <div><div className="text-xs font-bold uppercase tracking-wider text-slate-500">Application</div><div className="mt-1 font-black text-slate-950">{profile.applicationId}</div></div>
          <div><div className="text-xs font-bold uppercase tracking-wider text-slate-500">Declared monthly revenue</div><div className="mt-1 font-black text-slate-950">{money(profile.monthlyRevenue)}</div></div>
          <div><div className="text-xs font-bold uppercase tracking-wider text-slate-500">Requested amount</div><div className="mt-1 font-black text-slate-950">{money(profile.fundingAmount)}</div></div>
        </section>

        <section className="mt-8 flex flex-col gap-6 rounded-2xl border border-slate-200 p-6 sm:flex-row sm:items-center">
          <div className={`text-6xl font-black ${scoreColor}`}>{report.score}<span className="text-2xl text-slate-400">/100</span></div>
          <div><div className={`text-xl font-black ${scoreColor}`}>{report.band}</div><p className="mt-2 text-sm leading-6 text-slate-600">This is a preparation score—not an approval probability, credit decision, offer, or guarantee.</p></div>
        </section>

        <section className="mt-10"><h2 className="text-xl font-black text-slate-950">Score breakdown</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">{report.findings.map((finding) => <div key={finding.label} className="rounded-xl border border-slate-200 p-5"><div className="flex justify-between gap-3"><h3 className="font-black text-slate-900">{finding.label}</h3><strong className="whitespace-nowrap text-blue-700">{finding.points}/{finding.maximum}</strong></div><p className="mt-2 text-sm leading-6 text-slate-600">{finding.detail}</p></div>)}</div></section>

        <section className="mt-10 rounded-xl bg-blue-50 p-6"><h2 className="text-xl font-black text-slate-950">Preparation checklist</h2><ol className="mt-4 space-y-3">{report.preparationChecklist.map((item, index) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-black text-white">{index + 1}</span><span>{item}</span></li>)}</ol></section>

        <section className="mt-10 grid gap-5 sm:grid-cols-2"><div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5"><h2 className="font-black text-emerald-950">What the software checked</h2><ul className="mt-3 space-y-2 text-sm text-emerald-900">{report.checked.map((item) => <li key={item}>✓ {item}</li>)}</ul></div><div className="rounded-xl border border-amber-200 bg-amber-50 p-5"><h2 className="font-black text-amber-950">What it did not check</h2><ul className="mt-3 space-y-2 text-sm text-amber-900">{report.notChecked.map((item) => <li key={item}>— {item}</li>)}</ul></div></section>

        <footer className="mt-10 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">FSI Digital does not make lending or credit decisions. This automated information product uses declared application fields and uploaded-file count only. Funding partners apply their own underwriting rules and may request additional information.</footer>
      </div>
    </article>
  </main>;
}
