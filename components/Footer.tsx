'use client';

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, FormEvent } from 'react';
import { RelatedTopics } from "@/components/RelatedTopics";

export function Footer() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFooterSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: '',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Success! Check your email for the free grant guide.');
        setEmail('');
      } else {
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Failed to subscribe. Please try again.');
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <RelatedTopics />
      <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="FSI Digital"
                width={120}
                height={32}
                className="h-8 w-auto object-contain bg-white rounded px-1"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted source for government grants and funding opportunities for startups and small businesses in
              USA and Canada.
            </p>

            {/* Resources Links */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-300">Resources</h4>
              <div className="flex flex-col space-y-1">
                <Link href="/sample-report" className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm">
                  Sample Report
                </Link>
                <Link href="/testimonials" className="text-gray-400 hover:text-white text-sm">
                  Success Stories
                </Link>
                <Link href="/customer-success" className="text-gray-400 hover:text-white text-sm">
                  Customer Case Studies
                </Link>
                <Link href="/about-founder" className="text-gray-400 hover:text-white text-sm">
                  About the Founder
                </Link>
                <Link href="/program-updates" className="text-gray-400 hover:text-white text-sm">
                  Program Updates Log
                </Link>
                <Link href="/blog" className="text-gray-400 hover:text-white text-sm">
                  Expert Insights
                </Link>
                <Link href="/download" className="text-emerald-400 hover:text-emerald-300 font-semibold text-sm">
                  Free Download Center
                </Link>
                <Link href="/contact" data-google-vignette="false" className="text-gray-400 hover:text-white text-sm">
                  Contact
                </Link>
                <Link href="/guides" className="text-gray-400 hover:text-white text-sm">
                  Grant Guides
                </Link>
                <Link href="/resources" className="text-gray-400 hover:text-white text-sm">
                  Business Tools
                </Link>
                <Link href="/partners" data-google-vignette="false" className="text-gray-400 hover:text-white text-sm">
                  Funding Partners
                </Link>
                <Link href="/methodology" className="text-gray-400 hover:text-white text-sm">
                  Research Methodology
                </Link>
              </div>
            </div>

            {/* Popular Guides (SEO Internal Links) */}
            <div className="space-y-2 mt-4">
              <h4 className="font-semibold text-sm text-gray-300">High-Intent Guides</h4>
              <div className="flex flex-col space-y-1">
                <Link href="/blog/quebec-small-business-grants-guide" className="text-gray-400 hover:text-white text-sm">
                  Quebec Small Business Grants
                </Link>
                <Link href="/blog/nih-sbir-biotech-grants" className="text-gray-400 hover:text-white text-sm">
                  NIH SBIR Biotech Grants
                </Link>
                <Link href="/blog/nasa-sbir-space-tech-grants" className="text-gray-400 hover:text-white text-sm">
                  NASA SBIR Space Tech
                </Link>
                <Link href="/blog/dod-sbir-defense-tech-grants" className="text-gray-400 hover:text-white text-sm">
                  DoD SBIR Defense Tech
                </Link>
                <Link href="/blog/sba-microloans-complete-guide" className="text-gray-400 hover:text-white text-sm">
                  SBA Microloans Guide
                </Link>
              </div>
            </div>
          </div>

          {/* USA Grants */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">USA Grants</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/usa/federal-grants" className="text-gray-400 hover:text-white text-sm">
                  Federal Grants
                </Link>
              </li>
              <li>
                <Link href="/usa/small-business-grants" className="text-gray-400 hover:text-white text-sm">
                  Small Business Grants
                </Link>
              </li>
              <li>
                <Link href="/usa/women-entrepreneurs-grants" className="text-gray-400 hover:text-white text-sm">
                  Women Entrepreneurs
                </Link>
              </li>
              <li>
                <Link href="/usa/california" className="text-gray-400 hover:text-white text-sm">
                  California Grants
                </Link>
              </li>
              <li>
                <Link href="/usa/technology-startup-grants" className="text-gray-400 hover:text-white text-sm">
                  Technology Startups
                </Link>
              </li>
              <li>
                <Link href="/usa/new-york" className="text-gray-400 hover:text-white text-sm">
                  New York Grants
                </Link>
              </li>
              <li>
                <Link href="/usa/ohio" className="text-gray-400 hover:text-white text-sm">
                  Ohio Grants & Incentives
                </Link>
              </li>
            </ul>
          </div>

          {/* Canada Grants */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Canada Grants</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/canada/government-grants" className="text-gray-400 hover:text-white text-sm">
                  Government Grants
                </Link>
              </li>
              <li>
                <Link href="/canada/small-business-grants" className="text-gray-400 hover:text-white text-sm">
                  Small Business Grants
                </Link>
              </li>
              <li>
                <Link href="/canada/women-business-grants" className="text-gray-400 hover:text-white text-sm">
                  Women-Owned Business
                </Link>
              </li>
              <li>
                <Link href="/canada/indigenous-entrepreneur-grants" className="text-gray-400 hover:text-white text-sm">
                  Indigenous Entrepreneurs
                </Link>
              </li>
              <li>
                <Link href="/canada/innovation-grants" className="text-gray-400 hover:text-white text-sm">
                  Innovation Grants
                </Link>
              </li>
              <li>
                <Link href="/canada/green-energy-grants" className="text-gray-400 hover:text-white text-sm">
                  Green Energy
                </Link>
              </li>
              <li>
                <Link href="/blog/canada-startup-funding-grants-guide" className="text-gray-400 hover:text-white text-sm">
                  Canada Startup Funding
                </Link>
              </li>
              <li>
                <Link href="/blog/canada-irap-grants-2026" className="text-gray-400 hover:text-white text-sm">
                  Canada IRAP Grants
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Funding Resources (New Column) */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Funding Resources</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 font-bold text-[10px] uppercase tracking-wider mt-3 mb-1">Top Programs</li>
              <li>
                <Link href="/programs/irap-grant" className="text-gray-400 hover:text-white text-sm">
                  IRAP Grant Guide
                </Link>
              </li>
              <li>
                <Link href="/programs/sred-tax-credit" className="text-gray-400 hover:text-white text-sm">
                  SR&ED Tax Credit
                </Link>
              </li>
              <li>
                <Link href="/programs/canexport" className="text-gray-400 hover:text-white text-sm">
                  CanExport SMEs
                </Link>
              </li>
              
              <li className="text-gray-300 font-bold text-[10px] uppercase tracking-wider mt-3 mb-1">Paid Products</li>
              <li>
                <Link href="/products/funding-match-report" className="text-gray-400 hover:text-white text-sm">
                  Funding Match Report
                </Link>
              </li>
              <li>
                <Link href="/products/action-plan" className="text-gray-400 hover:text-white text-sm">
                  Funding Action Plan
                </Link>
              </li>
              <li>
                <Link href="/products/toolkit" className="text-gray-400 hover:text-white text-sm">
                  Application Toolkit
                </Link>
              </li>
              <li>
                <Link href="/products/approval-library" className="text-gray-400 hover:text-white text-sm">
                  Case Approval Library
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-gray-400 hover:text-white text-sm">
                  Founding Membership
                </Link>
              </li>
              
              <li className="text-gray-300 font-bold text-[10px] uppercase tracking-wider mt-3 mb-1">Industries</li>
              <li>
                <Link href="/grants/industry/saas-companies" className="text-gray-400 hover:text-white text-sm">
                  SaaS Companies
                </Link>
              </li>
              <li>
                <Link href="/grants/industry/manufacturers" className="text-gray-400 hover:text-white text-sm">
                  Manufacturers
                </Link>
              </li>
              <li>
                <Link href="/grants/industry/agriculture" className="text-gray-400 hover:text-white text-sm">
                  Agri-Food Sector
                </Link>
              </li>

              <li className="text-gray-300 font-bold text-[10px] uppercase tracking-wider mt-3 mb-1">Locations</li>
              <li>
                <Link href="/grants/location/ontario" className="text-gray-400 hover:text-white text-sm">
                  Ontario Grants
                </Link>
              </li>
              <li>
                <Link href="/grants/location/british-columbia" className="text-gray-400 hover:text-white text-sm">
                  British Columbia
                </Link>
              </li>
              <li>
                <Link href="/grants/location/california" className="text-gray-400 hover:text-white text-sm">
                  California
                </Link>
              </li>

              <li className="text-gray-300 font-bold text-[10px] uppercase tracking-wider mt-3 mb-1">Case Studies</li>
              <li>
                <Link href="/case-studies" className="text-gray-400 hover:text-white text-sm">
                  Funding Scenarios
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Legal & Editorial</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="text-gray-400 hover:text-white text-sm">
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link href="/about/author" className="text-gray-400 hover:text-white text-sm">
                  Editor Profile
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-400 hover:text-white text-sm">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-gray-400 hover:text-white text-sm">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter - Working Form */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Grant Alerts</h3>
            <p className="text-gray-400 text-sm">Stay informed about new funding opportunities and application deadlines.</p>
            <form onSubmit={handleFooterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Get Free Grant Guide'}
              </Button>
            </form>
            <p className="text-gray-500 text-xs">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-gray-500 text-xs mb-6 max-w-4xl leading-relaxed">
            Disclaimer: FSI Digital is an independent private consultancy. We are not affiliated with, endorsed by, or associated with the Government of Canada, the Government of the United States, or any official federal, provincial, or state funding agency.
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">© 2026 FSI Digital. All rights reserved.</p>
              <p className="text-gray-500 text-xs mt-1">
                🔒 Secure payments via PayPal | SSL encrypted website | Privacy-first data handling
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
              <p className="text-gray-400 text-sm">
                Last reviewed: June 2026
              </p>
              <div className="flex items-center space-x-4">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-xs">
                  Privacy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-xs">
                  Terms
                </Link>
                <Link href="/contact" data-google-vignette="false" className="text-gray-400 hover:text-white text-xs">
                  Contact
                </Link>
                <Link href="/partners" data-google-vignette="false" className="text-gray-400 hover:text-white text-xs">
                  Partners
                </Link>
                <a href="https://www.linkedin.com/company/fsidigital" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Follow FSI Digital on LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}
