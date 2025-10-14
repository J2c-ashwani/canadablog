"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Search } from "lucide-react"
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
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Redirect to a search results page or filter grants
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <>
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

            {/* Search Button - Opens Dialog */}
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
