import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GF</span>
              </div>
              <span className="font-bold text-xl">Grant Finder Pro</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted source for government grants and funding opportunities for startups and small businesses in
              USA and Canada.
            </p>
            
            {/* Resources Links - ABOUT US REMOVED */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-300">Resources</h4>
              <div className="flex flex-col space-y-1">
                <Link href="/blog" className="text-gray-400 hover:text-white text-sm">
                  Expert Insights
                </Link>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                  Contact
                </Link>
                <Link href="/guides" className="text-gray-400 hover:text-white text-sm">
                  Grant Guides
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
                <Link href="/usa/women-entrepreneur-grants" className="text-gray-400 hover:text-white text-sm">
                  Women Entrepreneurs
                </Link>
              </li>
              <li>
                <Link href="/usa/minority-business-grants" className="text-gray-400 hover:text-white text-sm">
                  Minority-Owned Business
                </Link>
              </li>
              <li>
                <Link href="/usa/technology-startup-grants" className="text-gray-400 hover:text-white text-sm">
                  Technology Startups
                </Link>
              </li>
              <li>
                <Link href="/usa/renewable-energy-grants" className="text-gray-400 hover:text-white text-sm">
                  Green Energy
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
            </ul>
          </div>

          {/* Legal Pages */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Legal</h3>
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

          {/* Newsletter - SOFT LEAD GENERATION */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Grant Alerts</h3>
            <p className="text-gray-400 text-sm">Stay informed about new funding opportunities and application deadlines.</p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                Get Free Grant Guide
              </Button>
            </div>
            <p className="text-gray-500 text-xs">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 Grant Finder Pro. All rights reserved.</p>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
              <p className="text-gray-400 text-sm">
                Last updated: January 2025
              </p>
              <div className="flex space-x-4">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-xs">
                  Privacy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-xs">
                  Terms
                </Link>
                <Link href="/contact" className="text-gray-400 hover:text-white text-xs">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
