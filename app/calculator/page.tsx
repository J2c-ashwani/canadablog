import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GrantCalculator } from '@/components/calculator/GrantCalculator';
import { Shield, Users, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { OrganicProductLadderImpression } from '@/components/products/OrganicProductLadderImpression';

export const metadata: Metadata = {
    title: 'Canada Grant Eligibility Calculator | Estimate Your Funding',
    description: 'Use our free interactive grant calculator to instantly estimate how much government funding, grants, and loans your Canadian business qualifies for.',
    keywords: 'Canada grant eligibility calculator, estimate my funding, am I eligible for IRAP CDAP SR&ED, business grant calculator 2026, how much funding can I get, free grant eligibility checker Canada',
    alternates: {
        canonical: 'https://www.fsidigital.ca/calculator',
    },
    openGraph: {
        title: 'Canada Grant Eligibility Calculator | Estimate Your Funding',
        description: 'Use our free interactive grant calculator to instantly estimate how much government funding, grants, and loans your Canadian business qualifies for.',
        url: 'https://www.fsidigital.ca/calculator',
        siteName: 'FSI Digital',
        type: 'website',
    },
};

export default function CalculatorPage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Canada Grant Eligibility Calculator",
        "applicationCategory": "BusinessApplication",
        "description": "Estimate how much government funding, grants, and loans your Canadian business qualifies for instantly.",
        "operatingSystem": "Web",
        "url": "https://www.fsidigital.ca/calculator",
        "publisher": {
            "@type": "Organization",
            "name": "FSI Digital"
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <Header />
            <div className="bg-gray-50/50 py-12 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-6">
                        <Shield className="w-4 h-4" />
                        100% Free & Secure
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
                        Canada Grant Eligibility Calculator
                    </h1>
                    <p className="text-xl text-gray-600">
                        Over $3.2 Billion in government funding is available for Canadian businesses this year. Take our 60-second assessment to see how much you qualify for.
                    </p>
                </div>

                {/* Dynamic Calculator Component */}
                <div className="mb-20">
                    <GrantCalculator />
                </div>

                {/* Trust Badges */}
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center border-t border-gray-200 pt-16">
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h4 className="font-semibold text-lg">Instant Results</h4>
                        <p className="text-gray-500 text-sm">Get an immediate estimate based on live federal & provincial grant data.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
                            <Users className="w-6 h-6" />
                        </div>
                        <h4 className="font-semibold text-lg">Self-Serve Guidance</h4>
                        <p className="text-gray-500 text-sm">Choose an instant match report, action plan, blueprint, or automated funding radar without booking a call.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h4 className="font-semibold text-lg">Completely Private</h4>
                        <p className="text-gray-500 text-sm">We never share your business mechanics or financial data with third parties.</p>
                    </div>
                </div>

                {/* Self-serve revenue handoff */}
                <div className="mt-24 rounded-2xl border border-slate-200 bg-slate-950 px-6 py-8 text-center text-white shadow-xl sm:px-10">
                    <OrganicProductLadderImpression
                        surface="calculator-result"
                        context="calculator-page-exit"
                        offerId="match-report"
                    />
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400">Continue without a call</p>
                    <h2 className="mt-3 text-2xl font-extrabold">Turn the estimate into a practical next step</h2>
                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                        Get the one-time $19 Funding Match Report now, or use the $29/month Funding Watch for automated matching and deadline monitoring.
                    </p>
                    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                        <Button size="lg" asChild className="rounded-full bg-emerald-500 font-extrabold text-slate-950 hover:bg-emerald-400">
                            <Link href="/api/growth-os/onsite-click?surface=calculator-result&context=calculator-page-exit&offer=match-report&experiment=focused-v2">
                                Get the $19 Match Report <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild className="rounded-full border-slate-600 bg-transparent font-extrabold text-white hover:bg-slate-800 hover:text-white">
                            <Link href="/api/growth-os/onsite-click?surface=calculator-result&context=calculator-page-exit&offer=membership&experiment=focused-v2">
                                Start Funding Watch — $29/month <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                    <p className="mt-4 text-xs text-slate-400">Instant or automated digital delivery · no consultation or live session included</p>
                </div>

            </div>
            </div>
            <Footer />
        </div>
    );
}
