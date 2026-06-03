'use client';

import { useState, useEffect } from 'react'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { CheckCircle, Clock, ShieldCheck, Mail, Calendar } from 'lucide-react'

export default function BookingClient() {
  const [loading, setLoading] = useState(true)

  // Replace this placeholder with your actual Calendly path (e.g., "ashwani-jha-g/30min")
  const CALENDLY_PATH = "ashwani-fsidigital/1-on-1-funding-consultation"; 
  const calendlyUrl = `https://calendly.com/${CALENDLY_PATH}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=070716&text_color=ffffff&primary_color=38bdf8`;

  useEffect(() => {
    // Simulate slight delay to show loading state while iframe initializes
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

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
      <div className="min-h-screen bg-[#070716] text-[#c8cfe8] font-sans antialiased overflow-x-hidden">
        
        {/* Confetti-style blue blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
          
          <div className="w-16 h-16 bg-blue-950/80 rounded-2xl border border-blue-500/30 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/10">
            <CheckCircle className="w-9 h-9 text-blue-400" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Payment Completed Successfully!
          </h1>
          
          <p className="text-base sm:text-lg text-[#8f9ac2] max-w-2xl mx-auto leading-relaxed mb-8">
            Thank you! Your transaction is complete. Our research team has already begun their <strong className="text-white">2-hour custom funding analysis</strong> for your business. Please select a time below to schedule your 30-minute private call.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12 text-left">
            <div className="bg-[#0d0e2c]/60 border border-blue-950 rounded-xl p-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-[#5a6a9a] uppercase font-bold tracking-wider">Duration</div>
                <div className="text-xs font-bold text-white">30 Minutes</div>
              </div>
            </div>
            <div className="bg-[#0d0e2c]/60 border border-blue-950 rounded-xl p-4 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-[#5a6a9a] uppercase font-bold tracking-wider">Platform</div>
                <div className="text-xs font-bold text-white">Google Meet</div>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 bg-[#0d0e2c]/60 border border-blue-950 rounded-xl p-4 flex items-center gap-3">
              <Mail className="w-5 h-5 text-sky-400 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-[#5a6a9a] uppercase font-bold tracking-wider">Calendar Invite</div>
                <div className="text-xs font-bold text-white">Sent Instantly</div>
              </div>
            </div>
          </div>

          {/* Embedded Calendly Scheduling Widget */}
          <div className="relative bg-[#0d0e2c] border border-blue-950 rounded-3xl overflow-hidden shadow-2xl p-2 md:p-4 min-h-[700px] mb-12">
            
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070716] z-10">
                <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
                <p className="text-sm text-[#8f9ac2] animate-pulse">Initializing scheduling dashboard...</p>
              </div>
            )}

            <iframe 
              src={calendlyUrl}
              width="100%" 
              height="700px" 
              frameBorder="0"
              className="rounded-2xl"
              style={{ background: '#070716' }}
            />
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-[#5a6a9a] max-w-md mx-auto leading-relaxed border-t border-blue-950/50 pt-8">
            <ShieldCheck className="w-4 h-4 text-[#5a6a9a] flex-shrink-0" />
            <span>
              If you have any issues scheduling or need to reschedule, please contact support at <a href="mailto:ashwani@fsidigital.ca" className="text-blue-400 hover:underline">ashwani@fsidigital.ca</a>.
            </span>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}
