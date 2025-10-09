// app/guides/[slug]/page.tsx
import { notFound } from "next/navigation";
import { guides } from "@/lib/data/guides";
import { grants } from "@/lib/data/grants";
import Link from "next/link";
import { Metadata } from "next";

export async function generateStaticParams() {
  const guideList = guides ?? [];
  return guideList.map((g) => ({ slug: g.slug }));
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = guides.find((g) => g.slug === params.slug);
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
    <main className="max-w-6xl mx-auto py-12 px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{guide.title}</h1>
        <p className="text-gray-700 mt-2">{guide.description}</p>
      </header>

      {/* CTA / Lead magnet */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 p-4 border rounded bg-white">
          <h2 className="text-xl font-semibold mb-2">This guide covers</h2>
          <ul className="list-disc pl-5 text-gray-700">
            {categories.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <aside className="p-4 border rounded bg-white flex flex-col justify-between">
          <div>
            <h3 className="font-semibold">Get the PDF checklist</h3>
            <p className="text-sm text-gray-600">Download: Top 50 USA & Canada Startup Grants 2025</p>
          </div>
          <form
            // Replace with your form handler (Firebase function or API route)
            action="/api/newsletter/subscribe"
            method="post"
            className="mt-4"
          >
            <input name="name" placeholder="Your name" className="w-full mb-2 p-2 border rounded" />
            <input name="email" type="email" placeholder="Email" className="w-full mb-2 p-2 border rounded" />
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Get the PDF</button>
          </form>
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
                            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
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
  );
}
