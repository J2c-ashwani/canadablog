// app/guides/[slug]/page.tsx
import { notFound } from "next/navigation";
import { guidesDatabase as guides } from "@/lib/data/guides";
import { grants } from "@/lib/data/grants";
import Link from "next/link";
import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, MessageCircle, DollarSign, Target, PieChart, TrendingUp, Users, Award, Shield, CheckCircle, Leaf, Zap, Mountain, RefreshCw, Clock, Globe, MapPin, Gift, CreditCard, Smile, Anchor, Handshake, ThumbsUp, Rocket, User, Cpu, FileText, BookOpen, AlertTriangle, Factory, Building, Lightbulb, Flag, Home, Settings, Search, List, Layers, Map, BarChart, Unlock, FastForward, Heart, Calendar, Grid, Percent, AlertCircle } from "lucide-react";
import { GrantSuccessTable } from "@/components/blog/GrantSuccessTable";
import { ExpertTipBox } from "@/components/blog/ExpertTipBox";

// Icon mapping for dynamic rendering from data
const iconMap: Record<string, any> = {
  DollarSign, Target, PieChart, TrendingUp, Users, Award, Shield, CheckCircle, Leaf, Zap, Mountain, RefreshCw, Clock, Globe, MapPin, Gift, CreditCard, Smile, Anchor, Handshake, ThumbsUp, Rocket, User, Cpu, FileText, BookOpen, AlertTriangle, Factory, Building, Lightbulb, Flag, Home, Settings, Search, List, Layers, Map, BarChart, Unlock, FastForward, Heart, Calendar, Grid, Percent, AlertCircle
};

export async function generateStaticParams() {
  const guideList = guides ?? [];
  return guideList.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return { title: 'Guide Not Found' };

  // Site-Wide Enrichment Logic:
  // If the guide has been "Enriched" (has metrics or tips), we INDEX it.
  // Otherwise, we keep it noindex to prevent Low Value Content penalties.
  const isEnriched = !!(guide.metrics || guide.expertTip);

  return {
    title: guide.title,
    description: guide.description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return notFound();

  // Select grants by region (guide.region) or all if Both
  const regionFilter = guide.region === "Both" ? () => true : (gr: any) => gr.region === guide.region;
  const relatedGrants = grants.filter(regionFilter);

  // If guide defines categories, use them; else derive categories from grants
  const categories = guide.categories && guide.categories.length > 0
    ? guide.categories
    : Array.from(new Set(relatedGrants.map((g) => g.category)));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.description,
  };

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto py-12 px-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <header className="mb-8">
          <h1 className="text-3xl font-bold">{guide.title}</h1>
          <p className="text-gray-700 mt-2">{guide.description}</p>
        </header>

        {/* DYNAMIC ENRICHMENT: Success Metrics Table */}
        {guide.metrics && (
          <section className="mb-10">
            <GrantSuccessTable
              title="Funding Snapshot"
              metrics={guide.metrics.map(m => {
                const IconComponent = (m.iconName && iconMap[m.iconName]) ? iconMap[m.iconName] : Target;
                return {
                  ...m,
                  icon: <IconComponent className="w-6 h-6" />
                };
              })}
            />
          </section>
        )}

        {/* DYNAMIC ENRICHMENT: Expert Tip */}
        {guide.expertTip && (
          <section className="mb-10">
            <ExpertTipBox
              type={guide.expertTip.type}
              title={guide.expertTip.title}
            >
              <div dangerouslySetInnerHTML={{ __html: guide.expertTip.content }} />
            </ExpertTipBox>
          </section>
        )}

        {/* CTA - NO FORM */}
        <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 p-4 border rounded bg-white">
            <h2 className="text-xl font-semibold mb-2">This guide covers</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {categories.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          <aside className="p-6 border rounded bg-gradient-to-br from-green-50 to-blue-50 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-2">Get Expert Help</h3>
              <p className="text-sm text-gray-600 mb-4">
                Professional grant application support with Top 50 USA & Canada Startup Grants 2025 guide
              </p>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white" asChild>
              <Link href="/contact?service=grant-expert-help">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Expert
              </Link>
            </Button>
          </aside>
        </section>

        {/* Grant categories and lists */}
        {categories.map((cat) => {
          const grantsForCat = relatedGrants.filter((g) => (g.category ?? "").toLowerCase() === cat.toLowerCase());
          return (
            <section key={cat} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">{cat}</h2>

              {grantsForCat.length === 0 ? (
                <p className="text-gray-600">No direct grants found for this category yet.</p>
              ) : (
                <div className="grid gap-4">
                  {grantsForCat.map((grant) => (
                    <article key={grant.id} className="p-4 border rounded bg-white shadow-sm">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div>
                          <h3 className="text-lg font-bold">{grant.name}</h3>
                          <p className="text-gray-700">{grant.description}</p>
                          <p className="mt-2 text-sm text-gray-600">
                            Region: {grant.stateOrProvince ?? grant.region}
                          </p>
                        </div>

                        <div className="text-right space-y-2">
                          <div className="font-semibold text-green-700">
                            {grant.amountMin != null || grant.amountMax != null ? (
                              <>
                                {grant.amountMin ? `$${grant.amountMin.toLocaleString()}` : "N/A"}
                                {grant.amountMax ? ` - $${grant.amountMax.toLocaleString()}` : ""}
                              </>
                            ) : (
                              "Amount: Varies"
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            Deadline: {grant.deadline ? new Date(grant.deadline).toLocaleDateString() : "Open"}
                          </div>

                          <div className="mt-3 flex flex-row gap-2 justify-end">
                            {/* View details on your site (internal) */}
                            <Link href={`/grants/${grant.id}`} className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                              View Details
                            </Link>

                            {/* External official site opens in new tab */}
                            <a
                              href={grant.link ?? "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                              Apply (Official)
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {/* Lead Magnet CTA */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-8 text-white text-center mb-8">
          <Download className="w-16 h-16 mx-auto mb-4 text-green-100" />
          <h3 className="text-2xl font-bold mb-4">Get Your Free Grant Application Guide</h3>
          <p className="text-green-100 mb-6 text-lg">
            Download our comprehensive grant application guide with templates, strategies,
            and Top 50 USA & Canada Startup Grants 2025.
          </p>
          <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
            <Link href="/contact?service=grant-expert-help">
              <Download className="w-5 h-5 mr-2" />
              Request Application Guide
            </Link>
          </Button>
        </section>

        {/* Back and related guides */}
        <footer className="mt-12">
          <div className="flex items-center justify-between">
            <Link href="/guides" className="text-primary hover:underline">← Back to all Guides</Link>

            <div>
              <h4 className="text-sm font-semibold">Related Guides</h4>
              <ul className="text-sm text-gray-700">
                {guides.filter((g) => g.slug !== guide.slug).slice(0, 3).map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="hover:underline">{g.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </footer>
      </main>
      <Footer />
    </>
  );
}
