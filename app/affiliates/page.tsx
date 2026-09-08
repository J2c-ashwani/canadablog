import type { Metadata } from 'next';
import { BadgeCheck, CalendarClock, CircleDollarSign, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AffiliateApplicationForm } from '@/components/affiliates/AffiliateApplicationForm';
import {
  AFFILIATE_ATTRIBUTION_DAYS,
  AFFILIATE_COMMISSION_PERCENT,
  AFFILIATE_MEMBERSHIP_PAYMENT_LIMIT,
} from '@/lib/affiliates/config';

export const metadata: Metadata = {
  title: 'Affiliate Program | FSI Digital',
  description: 'Apply to the FSI Digital affiliate program and earn commission on eligible, provider-verified purchases from your audience.',
  alternates: { canonical: 'https://www.fsidigital.ca/affiliates' },
  robots: { index: true, follow: true },
};

const rules = [
  'Clearly disclose that you may earn a commission from your link.',
  'Use only audiences and contacts who chose to hear from you. No unsolicited bulk email or guessed addresses.',
  'Describe FSI Digital accurately as a private business. Never imply government affiliation or guaranteed funding.',
  'No self-referrals, cookie stuffing, misleading redirects, impersonation, false urgency, or deceptive claims.',
  'No paid search bidding on FSI Digital brand terms unless written permission is provided.',
];

export default function AffiliateProgramPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <section className="bg-gray-950 py-20 text-white">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-300">Performance-based partner program</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">Help business owners find practical funding research—and earn only when they buy.</h1>
              <p className="mt-6 text-lg leading-8 text-gray-200">
                Approved affiliates receive tracked links to eligible FSI Digital funding products. There is no signup fee and no promise of earnings.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-white/15 bg-white/5 p-4"><CircleDollarSign className="h-5 w-5 text-emerald-300" /><strong className="mt-3 block text-xl">{AFFILIATE_COMMISSION_PERCENT}%</strong><span className="text-sm text-gray-300">on eligible verified purchases</span></div>
                <div className="rounded-lg border border-white/15 bg-white/5 p-4"><CalendarClock className="h-5 w-5 text-emerald-300" /><strong className="mt-3 block text-xl">{AFFILIATE_ATTRIBUTION_DAYS} days</strong><span className="text-sm text-gray-300">last-click attribution window</span></div>
                <div className="rounded-lg border border-white/15 bg-white/5 p-4"><BadgeCheck className="h-5 w-5 text-emerald-300" /><strong className="mt-3 block text-xl">Manual review</strong><span className="text-sm text-gray-300">before links become eligible</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-950">Commercial terms</h2>
            <div className="mt-6 space-y-4 text-gray-700">
              <div className="rounded-lg border border-gray-200 bg-white p-5"><strong className="text-gray-950">One-time products:</strong> {AFFILIATE_COMMISSION_PERCENT}% of the eligible net purchase amount after provider verification.</div>
              <div className="rounded-lg border border-gray-200 bg-white p-5"><strong className="text-gray-950">Funding Watch:</strong> {AFFILIATE_COMMISSION_PERCENT}% of each of the first {AFFILIATE_MEMBERSHIP_PAYMENT_LIMIT} provider-verified subscription payments.</div>
              <div className="rounded-lg border border-gray-200 bg-white p-5"><strong className="text-gray-950">Holding period:</strong> earned commissions remain on hold for 30 days and are reviewed before payout.</div>
              <div className="rounded-lg border border-gray-200 bg-white p-5"><strong className="text-gray-950">Payout:</strong> approved payable balances are paid manually to the affiliate&apos;s PayPal email and recorded with a payout reference.</div>
              <div className="rounded-lg border border-gray-200 bg-white p-5"><strong className="text-gray-950">Reversals:</strong> refunds, disputes, chargebacks, unverified payments, duplicate transactions, and prohibited promotion do not earn commission and may reverse a recorded commission.</div>
            </div>

            <h2 className="mt-10 text-2xl font-bold text-gray-950">Promotion rules</h2>
            <ul className="mt-5 space-y-3">
              {rules.map((rule) => <li key={rule} className="flex gap-3 text-sm leading-6 text-gray-700"><ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />{rule}</li>)}
            </ul>

            <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
              <strong>Required disclosure:</strong> FSI Digital is a private business and is not affiliated with any government agency. Its products provide research and educational information; they do not guarantee eligibility, approval, funding, or business outcomes.
            </div>
          </div>

          <div id="apply" className="scroll-mt-24">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Affiliate application</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-950">Tell us how you reach business owners.</h2>
            <p className="mt-3 text-gray-600">Applications are reviewed individually. Approved partners receive private reporting and offer-specific referral links.</p>
            <div className="mt-6"><AffiliateApplicationForm /></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
