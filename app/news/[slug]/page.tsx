import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowLeft, ArrowRight, Link as LinkIcon, Newspaper } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getNewsBySlug, getAllNews } from "@/lib/data/news"
import { getProgramBySlug } from "@/lib/data/programs"
import EEATBadge from "@/components/blog/EEATBadge"

type NewsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllNews().map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getNewsBySlug(resolvedParams.slug)

  if (!article) {
    return {
      title: "Article Not Found | FSI Digital",
      robots: { index: false, follow: false },
    }
  }

  const canonical = `https://www.fsidigital.ca/news/${article.slug}`
  const title = `${article.title} | FSI Funding News`

  return {
    title,
    description: article.summary,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description: article.summary,
      url: canonical,
      type: "article",
    },
  }
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const resolvedParams = await params;
  const article = getNewsBySlug(resolvedParams.slug)

  if (!article) {
    notFound()
  }

  const relatedProgram = article.relatedProgramId 
    ? getProgramBySlug(article.relatedProgramId) 
    : undefined

  const formattedDate = new Date(article.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />

      <main className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Breadcrumb & Navigation Back */}
          <div className="mb-6">
            <Link 
              href="/news" 
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to news updates
            </Link>
          </div>

          <Card className="border border-slate-200 bg-white shadow-xl rounded-3xl overflow-hidden">
            <div className="p-8 sm:p-12 space-y-6">
              
              {/* Category & Date */}
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-emerald-600 hover:bg-emerald-600 border-none font-bold text-xs uppercase px-2 py-0.5">
                  {article.category}
                </Badge>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Published {formattedDate}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 leading-tight">
                {article.title}
              </h1>

              {/* Trust Review */}
              <div className="flex items-center">
                <EEATBadge authorName="Ashwani Kumar" authorImage="/author-ashwani.jpg" date={article.publishDate} />
              </div>

              <hr className="border-slate-100" />

              {/* Related Program Promo Box (Internal link injection) */}
              {relatedProgram && (
                <div className="p-5 border border-emerald-100 rounded-2xl bg-emerald-50/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                      <LinkIcon className="w-3 h-3" /> Related Program Guide
                    </p>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">{relatedProgram.name}</h3>
                    <p className="text-xs text-slate-500">View official parameters, limits ({relatedProgram.fundingAmount}), and application details.</p>
                  </div>
                  <Link 
                    href={`/programs/${relatedProgram.slug}`} 
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline shrink-0"
                  >
                    View Program Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* Article Content */}
              <div 
                className="prose text-slate-700 leading-relaxed max-w-none text-base space-y-6 pt-4
                  prose-headings:font-bold prose-headings:text-slate-900 prose-headings:mt-6 prose-headings:mb-3
                  prose-h3:text-lg sm:prose-h3:text-xl
                  prose-p:text-slate-600 prose-p:leading-relaxed
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
