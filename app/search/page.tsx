'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight, Filter, DollarSign } from 'lucide-react';
import Link from 'next/link';

import { grantsDatabase, searchGrants, formatFundingRange } from '@/lib/grants-data';
import type { Grant } from '@/lib/grants-data';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [filteredGrants, setFilteredGrants] = useState<Grant[]>(grantsDatabase || []);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = useMemo(() => {
    if (!grantsDatabase || !Array.isArray(grantsDatabase)) return [];
    return Array.from(new Set(grantsDatabase.map(g => g.category)));
  }, []);

  // Only run performSearch when search query or filters ACTUALLY change
  useEffect(() => {
    if (searchQuery || selectedCountry !== 'all' || selectedCategory !== 'all') {
      performSearch(searchQuery);
    }
  }, [searchQuery, selectedCountry, selectedCategory]);

  const performSearch = (query: string) => {
    if (!grantsDatabase || !Array.isArray(grantsDatabase)) {
      return;
    }

    let results = query.trim() ? searchGrants(query) : grantsDatabase;
    
    // Filter by country
    if (selectedCountry !== 'all') {
      results = results.filter(grant => grant.country === selectedCountry);
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      results = results.filter(grant => grant.category === selectedCategory);
    }

    setFilteredGrants(results);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  if (!grantsDatabase || !Array.isArray(grantsDatabase)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <Search className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading grants database...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Search Government Grants
          </h1>
          {query && (
            <p className="text-xl text-gray-600">
              Results for "<span className="font-semibold">{query}</span>"
            </p>
          )}
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, category, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
            <Button type="submit" className="h-12 px-8 bg-primary hover:bg-primary/90">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </form>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          {/* Country Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 py-2">Country:</span>
            <Button
              variant={selectedCountry === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCountry('all')}
            >
              All Countries
            </Button>
            <Button
              variant={selectedCountry === 'USA' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCountry('USA')}
            >
              🇺🇸 USA
            </Button>
            <Button
              variant={selectedCountry === 'Canada' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCountry('Canada')}
            >
              🇨🇦 Canada
            </Button>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 py-2">Category:</span>
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All Categories
              </Button>
              {categories.slice(0, 5).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Found <span className="font-semibold text-primary">{filteredGrants.length}</span> grant{filteredGrants.length !== 1 ? 's' : ''}
          </p>
          {(selectedCountry !== 'all' || selectedCategory !== 'all' || searchQuery) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedCountry('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              Clear all filters
            </Button>
          )}
        </div>

        {/* Search Results */}
        {filteredGrants.length > 0 ? (
          <div className="grid gap-6">
            {filteredGrants.map((grant) => (
              <Card key={grant.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge className={grant.country === 'USA' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}>
                      {grant.country === 'USA' ? '🇺🇸 USA' : '🇨🇦 Canada'}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {grant.region}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {grant.category}
                    </Badge>
                    <Badge 
                      className={
                        grant.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : grant.status === 'Upcoming'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {grant.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl hover:text-primary">
                    {grant.name}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {grant.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Funding Range:</span>
                      <span className="font-bold text-green-700 flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {formatFundingRange(grant.fundingMin, grant.fundingMax)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Agency:</span>
                        <p className="font-medium text-gray-900">{grant.agency}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Deadline:</span>
                        <p className="font-medium text-gray-900">{grant.deadline}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {grant.tags.slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button className="flex-1" asChild>
                        <a href={grant.applicationLink} target="_blank" rel="noopener noreferrer">
                          Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href={`/grants/${grant.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No grants found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters
              </p>
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-500">Popular searches:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery('Small Business')}
                  >
                    Small Business
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery('Women')}
                  >
                    Women Entrepreneurs
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery('Technology')}
                  >
                    Technology
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="mt-12">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-green-50">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Can't find what you're looking for?
              </h3>
              <p className="text-gray-600 mb-6">
                Browse all grants or use our AI-powered Grant Finder
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/usa">Browse USA Grants</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/canada">Browse Canada Grants</Link>
                </Button>
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary" asChild>
                  <Link href="/grant-finder">Try AI Grant Finder</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Search className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading search results...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
