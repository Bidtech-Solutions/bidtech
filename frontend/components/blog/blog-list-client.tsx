"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock, Search } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { PublicArticleSummary } from "@/lib/api/article-api";
import { ArticleCoverImage } from "@/components/blog/article-cover-image";

interface BlogListClientProps {
  initialArticles: PublicArticleSummary[];
}

export function BlogListClient({ initialArticles }: BlogListClientProps) {
  const [search, setSearch] = useState("");

  const filteredArticles = initialArticles.filter((article) => {
    if (!search.trim()) return true;
    const query = search.toLowerCase();
    return (
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari artikel inspirasi teknologi..."
            className="w-full pl-11 pr-4 py-2.5 text-sm rounded-full border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#45a02e]/20 focus:border-[#45a02e] shadow-xs transition"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article, idx) => {
            const formattedDate = new Date(article.published_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            return (
              <Reveal key={article.slug} y={16} delay={idx * 50}>
                <div className="group flex h-full flex-col justify-between rounded-[24px] border border-slate-200/90 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#45a02e]/40 hover:shadow-[0_12px_32px_rgba(69,160,46,0.08)] transition-all duration-300">
                  <div>
                    <div className="mb-4 overflow-hidden rounded-xl border border-slate-100">
                      <ArticleCoverImage
                        src={article.cover_display_url || article.cover_image_url}
                        alt={article.cover_alt_text || article.title}
                        title={article.title}
                        aspectRatio="aspect-[16/9]"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3">
                      <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                        Wawasan Digital
                      </span>
                      <span className="inline-flex items-center gap-1 font-medium text-[#45a02e]">
                        <BookOpen className="size-3.5" />
                        Artikel
                      </span>
                    </div>

                    <h3 className="font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#45a02e] transition-colors leading-snug">
                      <Link href={`/blog/${article.slug}`} className="hover:underline">
                        {article.title}
                      </Link>
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3.5" />
                        {formattedDate}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {article.reading_minutes} menit baca
                      </span>
                    </div>

                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1 font-bold text-[#45a02e] hover:translate-x-0.5 transition-transform"
                    >
                      <span>Baca</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <BookOpen className="size-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Tidak ada artikel yang cocok</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Coba kata kunci pencarian yang lain.</p>
        </div>
      )}
    </div>
  );
}
