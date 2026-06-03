import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Building, MapPin, Search } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import {
  getPseoCitySummaries,
  getPseoProvincePages,
  getPseoProvinceSummaries,
  getPseoProvinceSummary,
} from '@/lib/pseo-data';

export const revalidate = 86400;

type ProvincePageProps = {
  params: Promise<{
    province: string;
  }>;
};

export function generateStaticParams() {
  return getPseoProvinceSummaries().map((province) => ({
    province: province.provinceSlug,
  }));
}

export async function generateMetadata({ params }: ProvincePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const province = getPseoProvinceSummary(resolvedParams.province);

  if (!province) {
    return {
      title: 'Grant Hub Not Found | FSI Digital',
      robots: { index: false, follow: false },
    };
  }

  const canonical = `https://www.fsidigital.ca/grants/${province.provinceSlug}`;

  return {
    title: `${province.provinceName} Business Grants by City & Industry (2026) | FSI Digital`,
    description: `Browse ${province.pageCount} local business grant pages for ${province.provinceName}. Compare funding opportunities by city, industry, eligibility, and application strategy.`,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${province.provinceName} Business Grants by City & Industry`,
      description: `Find city and industry specific grant pages across ${province.provinceName}.`,
      url: canonical,
      type: 'website',
    },
  };
}

export default async function ProvinceGrantHubPage({ params }: ProvincePageProps) {
  const resolvedParams = await params;
  const province = getPseoProvinceSummary(resolvedParams.province);

  if (!province) {
    notFound();
  }

  const cities = getPseoCitySummaries(resolvedParams.province);
  const samplePages = getPseoProvincePages(resolvedParams.province).slice(0, 12);
  const topCityNames = cities.slice(0, 4).map((city) => city.cityName).join(', ');

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="border-b border-gray-200 bg-slate-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-green-700">Home</Link>
                <span>/</span>
                <Link href="/grants" className="hover:text-green-700">Grant Database</Link>
                <span>/</span>
                <span className="font-medium text-gray-900">{province.provinceName}</span>
              </nav>

              <Badge className="mb-5 bg-green-100 text-green-800 hover:bg-green-100">
                {province.cityCount} cities and {province.pageCount} grant pages
              </Badge>
              <h1 className="max-w-4xl text-4xl font-bold tracking-normal text-gray-950 md:text-5xl">
                {province.provinceName} Business Grants by City and Industry
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">
                Explore local grant pages for {province.provinceName} businesses, including funding paths for technology,
                agriculture, manufacturing, healthcare, clean energy, women-owned companies, and more.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-200 bg-white py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
              <div className="rounded border border-gray-200 p-5">
                <MapPin className="mb-3 h-6 w-6 text-green-700" />
                <div className="text-2xl font-bold text-gray-950">{province.cityCount}</div>
                <div className="text-sm text-gray-600">covered cities</div>
              </div>
              <div className="rounded border border-gray-200 p-5">
                <Building className="mb-3 h-6 w-6 text-blue-700" />
                <div className="text-2xl font-bold text-gray-950">{province.industryCount}</div>
                <div className="text-sm text-gray-600">industry categories</div>
              </div>
              <div className="rounded border border-gray-200 p-5">
                <Search className="mb-3 h-6 w-6 text-amber-700" />
                <div className="text-2xl font-bold text-gray-950">{province.pageCount}</div>
                <div className="text-sm text-gray-600">canonical grant pages</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-950">Browse {province.provinceName} grant pages by city</h2>
                <p className="mt-3 max-w-3xl text-gray-700">
                  Start with major local markets such as {topCityNames}, then choose the industry page that matches your business.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cities.map((city) => (
                  <Link
                    key={city.citySlug}
                    href={`/grants/${city.provinceSlug}/${city.citySlug}`}
                    className="group rounded border border-gray-200 p-5 transition hover:border-green-300 hover:bg-green-50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-950 group-hover:text-green-800">
                          {city.cityName}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                          {city.pageCount} city-industry grant pages
                        </p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gray-400 group-hover:text-green-700" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-gray-50 py-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-2xl font-bold text-gray-950">Popular {province.provinceName} industry grant pages</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {samplePages.map((page) => (
                  <Link
                    key={`${page.citySlug}-${page.industrySlug}`}
                    href={`/grants/${page.provinceSlug}/${page.citySlug}/${page.industrySlug}`}
                    className="rounded border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-green-800 transition hover:border-green-300 hover:bg-green-50"
                  >
                    {page.industryName} in {page.cityName}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
