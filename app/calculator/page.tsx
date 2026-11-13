import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GrantCalculator } from '@/components/calculator/GrantCalculator';
import { Shield, Users, Clock } from 'lucide-react';

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
            <div className="bg-gray-50/50 py-8 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                        <Shield className="w-4 h-4 text-emerald-600" />
                        Free Assessment · Private & Secure
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 sm:mb-6">
                        Canada Grant Eligibility Calculator
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Over $3.2 Billion in government funding is available for Canadian businesses this year. Take our 60-second assessment to see how much you qualify for.
                    </p>
                </div>


                {/* Dynamic Calculator Component */}
                <div id="calculator" className="mb-16">
                    <GrantCalculator />
                </div>

                {/* Substantiated Factual Trust Badges */}
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center border-t border-gray-200 pt-12 sm:pt-16">
                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h4 className="font-semibold text-base sm:text-lg text-slate-900">Instant Results</h4>
                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">Get an immediate preliminary estimate based on active federal and provincial program criteria.</p>
                    </div>
                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
                            <Users className="w-6 h-6" />
                        </div>
                        <h4 className="font-semibold text-base sm:text-lg text-slate-900">Self-Serve Funding Guidance</h4>
                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">Access self-serve match reports, action plans, and application blueprints without mandatory sales calls.</p>
                    </div>
                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h4 className="font-semibold text-base sm:text-lg text-slate-900">Private Information Handling</h4>
                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">We do not sell, rent, or share your business data or questionnaire responses with third parties.</p>
                    </div>
                </div>

            </div>
            </div>
            <Footer />
        </div>
    );
}
