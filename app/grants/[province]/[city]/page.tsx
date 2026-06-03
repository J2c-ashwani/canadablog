import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Building2, MapPin, Target } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import {
  getPseoCityPages,
  getPseoCitySummaries,
  getPseoCitySummary,
  getPseoProvinceSummaries,
  getPseoProvinceSummary,
} from '@/lib/pseo-data';

export const revalidate = 86400;

type CityPageProps = {
  params: Promise<{
    province: string;
    city: string;
  }>;
};

export function generateStaticParams() {
  return getPseoProvinceSummaries().flatMap((province) =>
    getPseoCitySummaries(province.provinceSlug).map((city) => ({
      province: province.provinceSlug,
      city: city.citySlug,
    }))
  );
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const city = getPseoCitySummary(resolvedParams.province, resolvedParams.city);

  if (!city) {
    return {
      title: 'City Grant Hub Not Found | FSI Digital',
      robots: { index: false, follow: false },
    };
  }

  const canonical = `https://www.fsidigital.ca/grants/${city.provinceSlug}/${city.citySlug}`;

  return {
    title: `${city.cityName} Business Grants by Industry (2026) | FSI Digital`,
    description: `Browse ${city.pageCount} local grant pages for ${city.cityName}, ${city.provinceName}. Compare industry-specific funding, eligibility, and application strategy.`,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${city.cityName} Business Grants by Industry`,
      description: `Find industry-specific grant opportunities for businesses in ${city.cityName}.`,
      url: canonical,
      type: 'website',
    },
  };
}

export default async function CityGrantHubPage({ params }: CityPageProps) {
  const resolvedParams = await params;
  const city = getPseoCitySummary(resolvedParams.province, resolvedParams.city);
  const province = getPseoProvinceSummary(resolvedParams.province);

  if (!city || !province) {
    notFound();
  }

  const industryPages = getPseoCityPages(resolvedParams.province, resolvedParams.city);
  const relatedCities = getPseoCitySummaries(resolvedParams.province)
    .filter((item) => item.citySlug !== resolvedParams.city)
    .slice(0, 12);

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
                <Link href={`/grants/${province.provinceSlug}`} className="hover:text-green-700">
                  {province.provinceName}
                </Link>
                <span>/</span>
                <span className="font-medium text-gray-900">{city.cityName}</span>
              </nav>

              <Badge className="mb-5 bg-blue-100 text-blue-800 hover:bg-blue-100">
                {city.pageCount} industry grant pages
              </Badge>
              <h1 className="max-w-4xl text-4xl font-bold tracking-normal text-gray-950 md:text-5xl">
                {city.cityName} Business Grants by Industry
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">
                Compare local funding paths for {city.cityName} businesses across technology, agriculture,
                manufacturing, healthcare, clean energy, women-owned companies, and other high-intent categories.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-200 bg-white py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
              <div className="rounded border border-gray-200 p-5">
                <MapPin className="mb-3 h-6 w-6 text-green-700" />
                <div className="text-2xl font-bold text-gray-950">{city.cityName}</div>
                <div className="text-sm text-gray-600">{city.provinceName} market</div>
              </div>
              <div className="rounded border border-gray-200 p-5">
                <Building2 className="mb-3 h-6 w-6 text-blue-700" />
                <div className="text-2xl font-bold text-gray-950">{city.industryCount}</div>
                <div className="text-sm text-gray-600">industries covered</div>
              </div>
              <div className="rounded border border-gray-200 p-5">
                <Target className="mb-3 h-6 w-6 text-amber-700" />
                <div className="text-2xl font-bold text-gray-950">{city.pageCount}</div>
                <div className="text-sm text-gray-600">canonical grant pages</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-950">Choose a {city.cityName} grant category</h2>
                <p className="mt-3 max-w-3xl text-gray-700">
                  Each page has its own canonical URL, eligibility guidance, funding ranges, and lead capture path.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {industryPages.map((page) => (
                  <Link
                    key={page.industrySlug}
                    href={`/grants/${page.provinceSlug}/${page.citySlug}/${page.industrySlug}`}
                    className="group rounded border border-gray-200 p-5 transition hover:border-green-300 hover:bg-green-50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-950 group-hover:text-green-800">
                          {page.industryName}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                          Funding guide for {city.cityName} businesses
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

        {relatedCities.length > 0 && (
          <section className="border-t border-gray-200 bg-gray-50 py-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-5xl">
                <h2 className="text-2xl font-bold text-gray-950">Related {province.provinceName} city grant hubs</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedCities.map((relatedCity) => (
                    <Link
                      key={relatedCity.citySlug}
                      href={`/grants/${relatedCity.provinceSlug}/${relatedCity.citySlug}`}
                      className="rounded border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-green-800 transition hover:border-green-300 hover:bg-green-50"
                    >
                      {relatedCity.cityName} grant pages
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
