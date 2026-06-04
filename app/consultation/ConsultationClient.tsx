'use client';

import { useState, useEffect } from 'react'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { 
  CheckCircle, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  Award, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  ChevronRight,
  FileCheck2,
  Users
} from 'lucide-react'

export default function ConsultationClient() {
  const [sdkReady, setSdkReady] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const paypalClientId = process.env.NEXT_PUBLIC_CONSULTATION_PAYPAL_CLIENT_ID
    || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    || "ATiNArUnyarxHv-FRUJ7pVi14uHjafO8fEGrRVGBSUBRIrS-Rpx-w8LNEcHyGsF5sExfJjT03aYo_0xq";

  useEffect(() => {
    if ((window as any).paypal) {
      setSdkReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(paypalClientId)}&currency=USD`;
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    script.onerror = () => {
      console.error("PayPal SDK failed to load.");
      setPaymentError("Could not load secure checkout. Please refresh the page.");
    };
    document.head.appendChild(script);
  }, [paypalClientId]);

  useEffect(() => {
    if (!sdkReady || !(window as any).paypal) return;

    const container = document.getElementById("paypal-button-container");
    if (container) {
      container.innerHTML = "";
    }

    (window as any).paypal.Buttons({
      style: {
        layout: 'vertical',
        color:  'gold',
        shape:  'rect',
        label:  'pay'
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '199.00',
              currency_code: 'USD'
            },
            description: '1-on-1 B2B Funding Strategy Consultation'
          }]
        });
      },
      onApprove: async (data: any, actions: any) => {
        const details = await actions.order.capture();
        console.log("Payment approved:", details);
        window.location.href = '/booking';
      },
      onError: (err: any) => {
        console.error("PayPal Smart Button Error:", err);
        setPaymentError("Payment failed. Please check your card/account details and try again.");
      }
    }).render('#paypal-button-container');
  }, [sdkReady]);
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* Force hide all Google AdSense auto-ads and placeholders on this page */
        .adsbygoogle,
        .google-auto-placed,
        ins.adsbygoogle,
        iframe[name^="google_ads_iframe"],
        iframe[id^="google_ads_iframe"],
        div[id^="google_ads_iframe"],
        google-rabs-container,
        .google-auto-placed {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          width: 0 !important;
          max-height: 0 !important;
          max-width: 0 !important;
          pointer-events: none !important;
        }
      `}} />
      <Header />
      <div className="min-h-screen bg-[#070716] text-[#c8cfe8] font-sans antialiased overflow-x-hidden selection:bg-blue-500 selection:text-white">
        
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        
        {/* Hero Section */}
        <div className="relative pt-24 pb-16 px-6 max-w-7xl mx-auto text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Limited Slots Available Next Week
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            Secure Up To <span className="text-blue-400">$100,000+</span> in <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Non-Dilutive Funding</span> For Your Business
          </h1>
          
          <p className="text-lg sm:text-xl text-[#8f9ac2] max-w-3xl mx-auto leading-relaxed mb-8">
            Stop guessing grant frameworks and tax guidelines. Get a bespoke, pre-researched <strong className="text-white font-semibold">B2B Funding Roadmap</strong> and a private 30-minute deep dive strategy session.
          </p>

          <div className="flex justify-center">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-blue-900/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              🚀 Secure Your Strategy Session Now
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Value Proposition Grid */}
        <div className="max-w-6xl mx-auto px-6 mb-24 grid md:grid-cols-3 gap-8 relative">
          
          {/* Item 1 */}
          <div className="relative group bg-[#0d0e2c]/50 rounded-2xl p-8 border border-blue-950 hover:border-blue-800/50 transition-all duration-300 backdrop-blur-sm shadow-xl">
            <div className="w-12 h-12 bg-blue-950 rounded-xl flex items-center justify-center border border-blue-900/50 mb-6 group-hover:scale-105 transition-transform">
              <Award className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">2 Hours Pre-Call Research</h3>
            <p className="text-[#8f9ac2] text-sm leading-relaxed">
              We don't take blind calls. Our analysts spend 2 hours researching your industry, region, and entity structure before we dial in.
            </p>
          </div>

          {/* Item 2 */}
          <div className="relative group bg-[#0d0e2c]/50 rounded-2xl p-8 border border-blue-950 hover:border-blue-800/50 transition-all duration-300 backdrop-blur-sm shadow-xl">
            <div className="w-12 h-12 bg-indigo-950/60 rounded-xl flex items-center justify-center border border-indigo-900/40 mb-6 group-hover:scale-105 transition-transform">
              <FileCheck2 className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Custom B2B Funding Roadmap</h3>
            <p className="text-[#8f9ac2] text-sm leading-relaxed">
              Receive a proprietary roadmap mapping your exact matches against federal, provincial/state grants, and tax credits.
            </p>
          </div>

          {/* Item 3 */}
          <div className="relative group bg-[#0d0e2c]/50 rounded-2xl p-8 border border-blue-950 hover:border-blue-800/50 transition-all duration-300 backdrop-blur-sm shadow-xl">
            <div className="w-12 h-12 bg-sky-950/60 rounded-xl flex items-center justify-center border border-sky-900/40 mb-6 group-hover:scale-105 transition-transform">
              <Calendar className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Private 1-on-1 Consultation</h3>
            <p className="text-[#8f9ac2] text-sm leading-relaxed">
              A 30-minute private Google Meet to coordinate application strategy, compliance requirements, and document-formatting tactics.
            </p>
          </div>
        </div>

        {/* Detailed Core Deliverables */}
        <div className="max-w-6xl mx-auto px-6 py-8 mb-24 border-y border-blue-950/40">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Core List */}
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-6">
                What You Receive During the Strategy Deep-Dive
              </h2>
              <p className="text-[#8f9ac2] mb-8 leading-relaxed">
                Standard online applications fail 90% of the time due to misalignment or documentation formatting issues. Our structured strategy covers all gaps:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5.5 h-5.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Top 3 High-Probability Matches:</strong> The exact top 3 grant, loan, or tax incentive programs you stand the highest chance of winning.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5.5 h-5.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Precision Eligibility Analysis:</strong> Cross-checked against region, head-count, technology scope, and past project categories.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5.5 h-5.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Documentation Blueprint:</strong> Complete layout of writing patterns, financial sheets, and partner validations required for your target programs.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5.5 h-5.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">AI Models Trial:</strong> Interactive showcase of custom data analysis AI models utilized by our parent organization.
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Column: Statistics / Trust Callout */}
            <div className="bg-gradient-to-b from-[#0d0e2c] to-[#08091a] rounded-3xl p-8 border border-blue-950 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-indigo-400" />
                <h4 className="font-extrabold text-white text-lg">Why Work With FSI Digital?</h4>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-blue-950/60">
                  <span className="text-[#8f9ac2] text-sm">Pre-Call Desk Research Time</span>
                  <span className="text-white font-extrabold">2 Full Hours</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-blue-950/60">
                  <span className="text-[#8f9ac2] text-sm">Programs Tracked in Database</span>
                  <span className="text-white font-extrabold">2,000+ US & Canadian Options</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-blue-950/60">
                  <span className="text-[#8f9ac2] text-sm">Google Meet Call Duration</span>
                  <span className="text-white font-extrabold">30 Private Minutes</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-[#8f9ac2] text-sm">Strategic Deliverables Bundle</span>
                  <span className="text-blue-400 font-extrabold">PDF Roadmap Included</span>
                </div>
              </div>

              <div className="mt-8 bg-blue-950/40 rounded-xl p-4 border border-blue-900/30 text-center">
                <p className="text-xs text-[#8f9ac2] leading-normal italic">
                  "Each session is individually pre-researched by our consulting team. Slots are strictly allocated based on payment timestamp."
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Pricing & Checkout Section */}
        <div id="pricing" className="max-w-6xl mx-auto px-6 mb-32 relative scroll-mt-24">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Secure Your Strategy Session</h2>
            <p className="text-[#8f9ac2] max-w-xl mx-auto">
              Secure checkout via PayPal or credit card (processed by PayPal Standard). After checkout, you will automatically redirect to our live Calendly dashboard to pick your slot.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            {/* Centered Premium USD Card */}
            <div className="relative rounded-3xl bg-[#0d0e2c] border-2 border-blue-500/80 p-8 flex flex-col justify-between shadow-2xl hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -top-4 left-6 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-black uppercase tracking-widest">
                ⭐️ Custom Strategy Package
              </div>
              
              <div>
                <h3 className="text-2xl font-black text-white mb-2">1-on-1 Funding Strategy Session</h3>
                <p className="text-[#8f9ac2] text-sm mb-6">
                  Get your pre-call custom desk research, personalized Funding Roadmap, and private 30-minute consultation slot.
                </p>
                
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-black text-white tracking-tight">$199</span>
                  <span className="text-lg font-bold text-blue-400">USD</span>
                  <span className="text-sm text-[#5a6a9a] ml-1">/ one-time setup fee</span>
                </div>

                <div className="space-y-4 mb-8 text-left">
                  <div className="flex items-center gap-2.5 text-sm text-gray-200">
                    <CheckCircle className="w-4.5 h-4.5 text-blue-400 flex-shrink-0" />
                    <span>2 Hours of Custom Pre-Call Desk Research</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-200">
                    <CheckCircle className="w-4.5 h-4.5 text-blue-400 flex-shrink-0" />
                    <span>Bespoke B2B Funding Roadmap PDF</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-200">
                    <CheckCircle className="w-4.5 h-4.5 text-blue-400 flex-shrink-0" />
                    <span>Top 3 High-Probability Grant/Loan Matches</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-200">
                    <CheckCircle className="w-4.5 h-4.5 text-blue-400 flex-shrink-0" />
                    <span>Private 30-Minute Google Meet Strategy Call</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-200">
                    <CheckCircle className="w-4.5 h-4.5 text-blue-400 flex-shrink-0" />
                    <span>Redirects instantly to Calendly scheduling dashboard</span>
                  </div>
                </div>
              </div>

              <div>
                {paymentError && (
                  <div className="mb-4 p-3 bg-red-950/50 border border-red-500/30 rounded-xl text-red-400 text-xs font-semibold text-center">
                    {paymentError}
                  </div>
                )}
                
                {!sdkReady && (
                  <div className="w-full py-4 flex flex-col items-center justify-center gap-2 border border-blue-900/20 rounded-2xl bg-blue-950/10">
                    <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-[#8f9ac2] text-xs font-bold animate-pulse">Initializing secure checkout...</span>
                  </div>
                )}

                <div id="paypal-button-container" className="w-full relative z-10 min-h-[150px]"></div>
                
                <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-[#5a6a9a]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5a6a9a]" />
                  <span>Secure 256-bit encrypted checkout</span>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Guarantee Badge */}
          <div className="max-w-xl mx-auto mt-16 bg-blue-950/20 border border-blue-900/30 rounded-2xl p-6 flex items-start gap-4 shadow-lg backdrop-blur-md">
            <Award className="w-8 h-8 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-extrabold text-white text-base mb-1">Our Upfront Value Commitment</h5>
              <p className="text-xs text-[#8f9ac2] leading-relaxed">
                If, after conducting our 2 hours of custom research, we discover your business is in an ineligible category and does not qualify for any government or private financing options, we will proactively cancel the session and issue a **full 100% refund** immediately. No questions asked.
              </p>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}
