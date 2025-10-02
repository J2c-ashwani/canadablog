"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Search } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">GF</span>
            </div>
            <span className="font-bold text-lg sm:text-xl text-gray-900">Grant Finder Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium">
              Home
            </Link>

            <div className="relative group">
              <button className="text-gray-700 hover:text-primary font-medium">USA Grants</button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/usa/federal-grants" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Federal Grants
                </Link>
                <Link
                  href="/usa/small-business-grants"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Small Business
                </Link>
                <Link
                  href="/usa/women-entrepreneurs-grants"  // ✅ FIXED - Added "s"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Women Entrepreneurs
                </Link>
                <Link
                  href="/usa/technology-startup-grants"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Tech Startups
                </Link>
              </div>
            </div>

            <div className="relative group">
              <button className="text-gray-700 hover:text-primary font-medium">Canada Grants</button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  href="/canada/government-grants"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Government Grants
                </Link>
                <Link
                  href="/canada/small-business-grants"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Small Business
                </Link>
                <Link
                  href="/canada/innovation-grants"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Innovation Grants
                </Link>
                <Link
                  href="/canada/women-business-grants"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Women-Owned Business
                </Link>
              </div>
            </div>

            <Link href="/grant-finder" className="text-gray-700 hover:text-primary font-medium">
              AI Grant Finder
            </Link>

            <Link href="/guides" className="text-gray-700 hover:text-primary font-medium">
              Guides
            </Link>

            <Link href="/blog" className="text-gray-700 hover:text-primary font-medium">
              Expert Insights
            </Link>

            <Link href="/about" className="text-gray-700 hover:text-primary font-medium">
              About
            </Link>

            <Link href="/contact" className="text-gray-700 hover:text-primary font-medium">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Search Grants
            </Button>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
              Get Free Guide
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 -mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/usa"
                className="text-gray-700 hover:text-primary hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                USA Grants
              </Link>
              <Link
                href="/canada"
                className="text-gray-700 hover:text-primary hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Canada Grants
              </Link>
              <Link
                href="/grant-finder"
                className="text-gray-700 hover:text-primary hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Grant Finder
              </Link>
              <Link
                href="/guides"
                className="text-gray-700 hover:text-primary hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Guides
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-primary hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Expert Insights
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 px-4 space-y-3">
                <Button variant="outline" className="w-full bg-transparent h-12">
                  <Search className="w-4 h-4 mr-2" />
                  Search Grants
                </Button>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary h-12">Get Free Guide</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
