import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck, Mail, Calendar } from 'lucide-react';

const VALID_CONSULTATIONS = new Set([
  "agriinnovate-consultation",
  "canada-irap-consultation",
  "canada-regional-development-consultation",
  "canexport-consultation",
  "canada-cleantech-consultation",
  "cdap-digital-consultation",
  "indigenous-business-consultation",
  "canada-supercluster-consultation",
  "canada-financing-consultation",
  "sred-tax-credit-consultation",
  "minority-business-grants-consultation",
  "rural-business-development-consultation",
  "women-business-grants-consultation",
  "healthcare-grants-consultation",
  "manufacturing-grants-consultation",
  "tech-startup-grants-consultation",
  "california-business-grants-consultation",
  "florida-business-grants-consultation",
  "illinois-business-grants-consultation",
  "michigan-manufacturing-consultation",
  "new-york-business-grants-consultation",
  "pennsylvania-innovation-consultation",
  "texas-business-grants-consultation",
  "grant-application-review",
  "free-grant-consultation",
  "doe-clean-energy-consultation",
  "environmental-justice-consultation",
  "cdbg-community-consultation",
  "nsf-sbir-masterclass",
  "rural-grant-consultation",
  "veteran-business-consultation",
  "24-hour-sprint",
  "opportunity-triage",
  "ai-grant-finder",
  "emergency-grant-support"
]);

export function generateStaticParams() {
  return Array.from(VALID_CONSULTATIONS).map((consultationSlug) => ({
    consultationSlug,
  }));
}

export async function generateMetadata({ params }: { params: { consultationSlug: string } }) {
  const { consultationSlug } = params;
  if (!VALID_CONSULTATIONS.has(consultationSlug)) return notFound();

  // Create highly optimized metadata based on slug
  const cleanTitle = consultationSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace('Consultation', 'Consultation')
    .replace('24 Hour', '24-Hour');

  return {
    title: `Book Your ${cleanTitle} | Expert Setup & Review`,
    description: `Schedule a dedicated strategy session for ${cleanTitle.toLowerCase()}. Get expert guidance on applications, eligibility, and funding strategy.`,
  };
}

export default function ConsultationPage({ params }: { params: { consultationSlug: string } }) {
  const { consultationSlug } = params;

  if (!VALID_CONSULTATIONS.has(consultationSlug)) {
    notFound();
  }

  const cleanTitle = consultationSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace('Consultation', '')
    .trim();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Grants
          </Link>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Header Area */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-8 sm:p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/30 backdrop-blur-sm border border-blue-400/50 mb-6">
                  <Calendar className="w-8 h-8 text-blue-100" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 pb-2">
                  {cleanTitle} Strategy Session
                </h1>
                <p className="text-blue-100 text-lg max-w-2xl mx-auto font-medium">
                  Connect with our grant experts to maximize your approval odds, navigate compliance, and secure your funding faster.
                </p>
              </div>
            </div>

            {/* Content & Form Area */}
            <div className="p-8 sm:p-12 grid md:grid-cols-5 gap-12">
              
              {/* Left Column: Benefits */}
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What to Expect</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0 mr-3" />
                      <span className="text-gray-700">Deep-dive assessment of your eligibility</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0 mr-3" />
                      <span className="text-gray-700">Actionable timeline and next steps</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0 mr-3" />
                      <span className="text-gray-700">Pitfalls to avoid in your application</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl">
                  <h4 className="font-semibold text-blue-900 flex items-center mb-2">
                    <ShieldCheck className="w-5 h-5 mr-2 text-blue-600" />
                    Trusted Process
                  </h4>
                  <p className="text-sm text-blue-800">
                    Our intake team reviews your submission instantly and routes you to the best-matched specialist for your specific sector.
                  </p>
                </div>
              </div>

              {/* Right Column: Lead Form Replacement (can wire to existing contact endpoint) */}
              <div className="md:col-span-3">
                <form className="space-y-5" action="/api/contact" method="POST">
                  
                  <input type="hidden" name="source" value={consultationSlug} />
                  <input type="hidden" name="type" value="consultation_request" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input type="text" id="firstName" name="firstName" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input type="text" id="lastName" name="lastName" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="email" id="email" name="email" required className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white" placeholder="you@company.com" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input type="text" id="company" name="company" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white" />
                  </div>

                  <div>
                    <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Briefly describe your project or needs</label>
                    <textarea id="details" name="details" rows={3} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white resize-none"></textarea>
                  </div>

                  <button type="submit" className="w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Request Strategy Session
                  </button>
                  
                  <p className="text-center text-xs text-gray-500 mt-4">
                    By submitting this form, you agree to our <Link href="/terms" className="text-blue-600 hover:underline">Terms</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                  </p>
                </form>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
