import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight, Newspaper } from "lucide-react"
import Link from "next/link"
import { getAllNews } from "@/lib/data/news"
import EEATBadge from "@/components/blog/EEATBadge"

export const metadata: Metadata = {
  title: "Government Funding News & Intake Updates | FSI Digital",
  description: "Get real-time updates on small business government grants, tax credit reallocations, program lifecycle states, and deadlines in Canada and the US.",
  alternates: {
    canonical: "https://www.fsidigital.ca/news",
  },
  robots: { index: true, follow: true },
}

export default function NewsPage() {
  const articles = getAllNews()

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />

      <main className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Header Section */}
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex p-3 bg-emerald-50 rounded-2xl text-emerald-700 mb-2">
              <Newspaper className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Funding News Hub
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Track policy updates, program openings, reallocations, and guidelines straight from official government announcements.
            </p>
          </div>

          {/* E-E-A-T Review Badge */}
          <div className="flex justify-center mb-10">
            <EEATBadge authorName="Ashwani Kumar" authorImage="/author-ashwani.jpg" date="2026-06-09" />
          </div>

          {/* News Cards Grid */}
          <div className="grid gap-6">
            {articles.map((article) => {
              const formattedDate = new Date(article.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });

              return (
                <Card key={article.id} className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-2xl overflow-hidden">
                  <CardContent className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 justify-between items-start">
                    <div className="space-y-3 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge className="bg-emerald-600 hover:bg-emerald-600 border-none font-bold text-xs uppercase px-2 py-0.5">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {formattedDate}
                        </span>
                      </div>
                      
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-950 hover:text-emerald-700 transition-colors">
                        <Link href={`/news/${article.slug}`}>{article.title}</Link>
                      </h2>
                      
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <Link 
                      href={`/news/${article.slug}`} 
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 border border-slate-100 hover:border-emerald-200 bg-slate-50 hover:bg-emerald-50/50 px-4 py-2.5 rounded-xl shrink-0 self-start md:self-center transition-all"
                    >
                      Read full update <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
