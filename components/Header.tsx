"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Search } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">GF</span>
            </div>
            <span className="font-bold text-base lg:text-lg xl:text-xl text-gray-900 whitespace-nowrap">
              Grant Finder Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-6 flex-1 justify-center">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base whitespace-nowrap">
              Home
            </Link>

            <div className="relative group">
              <button className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base whitespace-nowrap">
                USA Grants
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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
                  href="/usa/women-entrepreneurs-grants"
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
              <button className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base whitespace-nowrap">
                Canada Grants
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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

            <Link href="/grant-finder" className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base whitespace-nowrap">
              AI Grant Finder
            </Link>

            <Link href="/guides" className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base whitespace-nowrap">
              Guides
            </Link>

            <Link href="/blog" className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base whitespace-nowrap">
              Expert Insights
            </Link>

            <Link href="/about" className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base whitespace-nowrap">
              About
            </Link>

            <Link href="/contact" className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base whitespace-nowrap">
              Contact
            </Link>
          </nav>

          {/* Search Button Only */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              <Search className="w-4 h-4 mr-2" />
              Search Grants
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 -mr-2 flex-shrink-0" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
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
