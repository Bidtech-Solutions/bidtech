import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { fetchPublicArticles } from "@/lib/api/article-api";
import { BlogListClient } from "@/components/blog/blog-list-client";
import { UniversalCta } from "@/components/shared/universal-cta";

export const metadata: Metadata = {
  title: "Blog & Wawasan Teknologi Bisnis | Bidtech",
  description:
    "Kumpulan artikel, tips pengembangan web & aplikasi, serta strategi digitalisasi terbaik untuk mempercepat pertumbuhan bisnis Anda.",
  openGraph: {
    title: "Blog & Wawasan Teknologi Bisnis | Bidtech",
    description:
      "Kumpulan artikel, tips pengembangan web & aplikasi, serta strategi digitalisasi terbaik.",
    type: "website",
    url: "https://bidtech.co.id/blog",
  },
};
};

export default async function BlogPage() {
  const { articles } = await fetchPublicArticles();
export default async function BlogPage() {
  const { articles } = await fetchPublicArticles();

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO HEADER */}
      <section className="relative pt-12 sm:pt-16 pb-10 sm:pb-14 overflow-hidden border-b border-slate-100">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[420px] w-full max-w-4xl rounded-full bg-[radial-gradient(ellipse_at_top,rgba(163,230,53,0.18)_0%,rgba(187,247,208,0.1)_45%,transparent_70%)] filter blur-3xl -z-10"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal y={16}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4f2c5] bg-[#f0faee] px-4 py-1.5 text-xs font-bold text-[#45a02e]">
              <Sparkles className="size-3.5" />
              <span>Wawasan &amp; Edukasi Digital</span>
            </div>
            <h1 className="mt-4 font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-slate-900 leading-tight">
              Blog &amp; Inspirasi <span className="text-[#45a02e]">Teknologi Bisnis</span>
            </h1>
            <p className="mt-3.5 mx-auto max-w-2xl text-xs sm:text-sm sm:text-base text-slate-600 leading-relaxed">
              Kumpulan artikel, tips pengembangan web &amp; aplikasi, serta strategi digitalisasi terbaik untuk mempercepat pertumbuhan bisnis Anda.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. ARTICLES GRID */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlogListClient initialArticles={articles} />

          {/* BOTTOM CTA BANNER (Universal CTA) */}
          <UniversalCta className="mt-14 sm:mt-20 px-0" />
        </div>
      </section>
    </div>
  );
}
