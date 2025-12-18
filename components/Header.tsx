"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Search, ChevronDown } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [usaDropdownOpen, setUsaDropdownOpen] = useState(false)
  const [canadaDropdownOpen, setCanadaDropdownOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  // Close dropdowns when clicking outside
  const closeDropdowns = () => {
    setUsaDropdownOpen(false)
    setCanadaDropdownOpen(false)
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">FD</span>
              </div>
              <span className="font-bold text-base lg:text-lg xl:text-xl text-gray-900 whitespace-nowrap">
                FSI Digital
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-6 flex-1 justify-center">
              <Link href="/" className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base whitespace-nowrap">
                Home
              </Link>

              {/* USA Grants Dropdown - Desktop */}
              <div
                className="relative"
                onMouseLeave={() => setUsaDropdownOpen(false)}
              >
                <button
                  className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base whitespace-nowrap flex items-center gap-1 py-2"
                  onClick={() => {
                    setUsaDropdownOpen(!usaDropdownOpen)
                    setCanadaDropdownOpen(false)
                  }}
                  onMouseEnter={() => setUsaDropdownOpen(true)}
                >
                  USA Grants
                  <ChevronDown className={`w-4 h-4 transition-transform ${usaDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {usaDropdownOpen && (
                  <div className="absolute top-full left-0 pt-1 w-48 z-50">
                    <div className="bg-white rounded-lg shadow-lg border">
                      <Link
                        href="/usa/federal-grants"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                        onClick={closeDropdowns}
                      >
                        Federal Grants
                      </Link>
                      <Link
                        href="/usa/small-business-grants"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={closeDropdowns}
                      >
                        Small Business
                      </Link>
                      <Link
                        href="/usa/women-entrepreneurs-grants"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={closeDropdowns}
                      >
                        Women Entrepreneurs
                      </Link>
                      <Link
                        href="/usa/technology-startup-grants"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
                        onClick={closeDropdowns}
                      >
                        Tech Startups
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Canada Grants Dropdown - Desktop */}
              <div
                className="relative"
                onMouseLeave={() => setCanadaDropdownOpen(false)}
              >
                <button
                  className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base whitespace-nowrap flex items-center gap-1 py-2"
                  onClick={() => {
                    setCanadaDropdownOpen(!canadaDropdownOpen)
                    setUsaDropdownOpen(false)
                  }}
                  onMouseEnter={() => setCanadaDropdownOpen(true)}
                >
                  Canada Grants
                  <ChevronDown className={`w-4 h-4 transition-transform ${canadaDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {canadaDropdownOpen && (
                  <div className="absolute top-full left-0 pt-1 w-48 z-50">
                    <div className="bg-white rounded-lg shadow-lg border">
                      <Link
                        href="/canada/government-grants"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                        onClick={closeDropdowns}
                      >
                        Government Grants
                      </Link>
                      <Link
                        href="/canada/small-business-grants"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={closeDropdowns}
                      >
                        Small Business
                      </Link>
                      <Link
                        href="/canada/innovation-grants"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={closeDropdowns}
                      >
                        Innovation Grants
                      </Link>
                      <Link
                        href="/canada/women-business-grants"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
                        onClick={closeDropdowns}
                      >
                        Women-Owned Business
                      </Link>
                    </div>
                  </div>
                )}
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

            {/* Search Button */}
            <div className="hidden md:flex items-center flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-4 h-4 mr-2" />
                Search Grants
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 -mr-2 flex-shrink-0" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu - FIXED WITH SUBMENUS */}
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

                {/* USA Grants Mobile Submenu */}
                <div className="px-4">
                  <button
                    className="w-full text-left text-gray-700 hover:text-primary hover:bg-gray-50 font-medium py-3 rounded-lg transition-colors flex items-center justify-between"
                    onClick={() => setUsaDropdownOpen(!usaDropdownOpen)}
                  >
                    USA Grants
                    <ChevronDown className={`w-4 h-4 transition-transform ${usaDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {usaDropdownOpen && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-3">
                      <Link
                        href="/usa/federal-grants"
                        className="block text-sm text-gray-600 hover:text-primary py-2"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setUsaDropdownOpen(false)
                        }}
                      >
                        Federal Grants
                      </Link>
                      <Link
                        href="/usa/small-business-grants"
                        className="block text-sm text-gray-600 hover:text-primary py-2"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setUsaDropdownOpen(false)
                        }}
                      >
                        Small Business
                      </Link>
                      <Link
                        href="/usa/women-entrepreneurs-grants"
                        className="block text-sm text-gray-600 hover:text-primary py-2"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setUsaDropdownOpen(false)
                        }}
                      >
                        Women Entrepreneurs
                      </Link>
                      <Link
                        href="/usa/technology-startup-grants"
                        className="block text-sm text-gray-600 hover:text-primary py-2"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setUsaDropdownOpen(false)
                        }}
                      >
                        Tech Startups
                      </Link>
                    </div>
                  )}
                </div>

                {/* Canada Grants Mobile Submenu */}
                <div className="px-4">
                  <button
                    className="w-full text-left text-gray-700 hover:text-primary hover:bg-gray-50 font-medium py-3 rounded-lg transition-colors flex items-center justify-between"
                    onClick={() => setCanadaDropdownOpen(!canadaDropdownOpen)}
                  >
                    Canada Grants
                    <ChevronDown className={`w-4 h-4 transition-transform ${canadaDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {canadaDropdownOpen && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-3">
                      <Link
                        href="/canada/government-grants"
                        className="block text-sm text-gray-600 hover:text-primary py-2"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setCanadaDropdownOpen(false)
                        }}
                      >
                        Government Grants
                      </Link>
                      <Link
                        href="/canada/small-business-grants"
                        className="block text-sm text-gray-600 hover:text-primary py-2"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setCanadaDropdownOpen(false)
                        }}
                      >
                        Small Business
                      </Link>
                      <Link
                        href="/canada/innovation-grants"
                        className="block text-sm text-gray-600 hover:text-primary py-2"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setCanadaDropdownOpen(false)
                        }}
                      >
                        Innovation Grants
                      </Link>
                      <Link
                        href="/canada/women-business-grants"
                        className="block text-sm text-gray-600 hover:text-primary py-2"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setCanadaDropdownOpen(false)
                        }}
                      >
                        Women-Owned Business
                      </Link>
                    </div>
                  )}
                </div>

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
                  <Button
                    variant="outline"
                    className="w-full bg-transparent h-12"
                    onClick={() => {
                      setIsSearchOpen(true)
                      setIsMenuOpen(false)
                    }}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search Grants
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary h-12" asChild>
                    <Link href="/contact">Get Free Guide</Link>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Search Government Grants</DialogTitle>
            <DialogDescription>
              Search through 1,200+ grants by name, category, or funding amount
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSearch} className="space-y-4 mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="e.g., Small Business Innovation, Women Entrepreneurs, Technology Grants"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
                autoFocus
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1 h-12 bg-primary hover:bg-primary/90">
                <Search className="w-4 h-4 mr-2" />
                Search Grants
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12"
                onClick={() => setIsSearchOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600 mb-2">Popular Searches:</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("Small Business Grants")
                  handleSearch(new Event('submit') as any)
                }}
              >
                Small Business Grants
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("Women Entrepreneurs")
                  handleSearch(new Event('submit') as any)
                }}
              >
                Women Entrepreneurs
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("Technology Startups")
                  handleSearch(new Event('submit') as any)
                }}
              >
                Technology Startups
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
