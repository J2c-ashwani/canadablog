import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GrantCalculator } from '@/components/calculator/GrantCalculator';
import { Shield, Users, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Canada Grant Eligibility Calculator | Estimate Your Funding',
    description: 'Use our free interactive grant calculator to instantly estimate how much government funding, grants, and loans your Canadian business qualifies for.',
    openGraph: {
        title: 'Canada Grant Eligibility Calculator | Estimate Your Funding',
        description: 'Use our free interactive grant calculator to instantly estimate how much government funding, grants, and loans your Canadian business qualifies for.',
        url: 'https://fsidigital.ca/calculator',
        siteName: 'FSI Digital',
        type: 'website',
    },
};

export default function CalculatorPage() {
    return (
        <div className="min-h-screen bg-white">
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
                        Discover Your True Funding Potential
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
                        <h4 className="font-semibold text-lg">Expert Support</h4>
                        <p className="text-gray-500 text-sm">Our grant specialists review your matches and guide you through applications.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h4 className="font-semibold text-lg">Completely Private</h4>
                        <p className="text-gray-500 text-sm">We never share your business mechanics or financial data with third parties.</p>
                    </div>
                </div>

                {/* Call to action */}
                <div className="mt-24 text-center">
                    <p className="text-gray-600 mb-4">Want to speak with someone right away?</p>
                    <Button variant="outline" size="lg" asChild className="rounded-full">
                        <Link href="/contact">
                            Talk to a Grant Specialist <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </div>

            </div>
            </div>
            <Footer />
        </div>
    );
}
