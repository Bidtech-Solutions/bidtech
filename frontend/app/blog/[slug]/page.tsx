import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Sparkles,
  User,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Bookmark,
} from "lucide-react";
import { fetchPublicArticleBySlug, fetchPublicArticles } from "@/lib/api/article-api";
import { BlockRenderer, extractHeadings } from "@/components/blog/block-renderer";
import { ReadingProgressBar } from "@/components/blog/reading-progress";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ArticleShareBar } from "@/components/blog/share-bar";
import { ArticleCoverImage } from "@/components/blog/article-cover-image";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const { articles } = await fetchPublicArticles({ perPage: 20 });
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchPublicArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan | Bidtech Blog",
    };
  }

  const coverImage = article.cover_display_url || "https://media.bidtech.co.id/bidtech/blog/placeholder.webp";
  const canonicalUrl = `https://bidtech.co.id/blog/${article.slug}`;

  return {
    title: `${article.title} | Bidtech Blog`,
    description: article.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${article.title} | Bidtech Blog`,
      description: article.meta_description,
      type: "article",
      url: canonicalUrl,
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: [article.author.name],
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: article.cover_alt_text || article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Bidtech Blog`,
      description: article.meta_description,
      images: [coverImage],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const article = await fetchPublicArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Ambil daftar artikel publik untuk related articles & prev/next
  const { articles: allArticles } = await fetchPublicArticles({ perPage: 8 });
  const relatedArticles = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const currentIndex = allArticles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Ekstraksi heading untuk Table of Contents
  const headings = extractHeadings(article.content || []);

  const formattedDate = new Date(article.published_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const fullUrl = `https://bidtech.co.id/blog/${article.slug}`;

  // Schema JSON-LD BlogPosting & BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.meta_description,
        "image": article.cover_display_url,
        "datePublished": article.published_at,
        "dateModified": article.updated_at,
        "author": {
          "@type": "Person",
          "name": article.author.name,
          ...(article.author.photo_url ? { "image": article.author.photo_url } : {}),
        },
        "publisher": {
          "@type": "Organization",
          "name": "Bidtech Solutions",
          "logo": {
            "@type": "ImageObject",
            "url": "https://bidtech.co.id/icon.png",
          },
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": fullUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beranda",
            "item": "https://bidtech.co.id",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://bidtech.co.id/blog",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.title,
            "item": fullUrl,
          },
        ],
      },
    ],
  };

  return (
    <article className="min-h-screen bg-white">
      {/* Reading Progress Bar di bagian paling atas */}
      <ReadingProgressBar />

      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============================================================== */}
      {/* 1. HERO & HEADER ARTIKEL                                      */}
      {/* ============================================================== */}
      <section className="relative pt-10 sm:pt-14 pb-8 sm:pb-12 bg-slate-50/70 border-b border-slate-100 overflow-hidden">
        {/* Glow Background */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[380px] w-full max-w-5xl rounded-full bg-[radial-gradient(ellipse_at_top,rgba(69,160,46,0.14)_0%,rgba(187,247,208,0.06)_45%,transparent_70%)] filter blur-3xl -z-10"
        />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigasi */}
          <div className="flex items-center justify-between gap-4 mb-6 text-xs sm:text-sm text-slate-500">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-bold text-[#45a02e] hover:text-[#388324] transition-colors"
            >
              <ArrowLeft className="size-4" />
              <span>Kembali ke Blog</span>
            </Link>

            <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-xs">
              <Link href="/" className="hover:text-slate-800 transition-colors">Beranda</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-slate-800 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold truncate max-w-[240px]">{article.title}</span>
            </nav>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="rounded-full bg-[#f0faee] border border-[#d4f2c5] px-3.5 py-1 text-xs font-bold text-[#45a02e]">
              Wawasan &amp; Edukasi
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              <Sparkles className="size-3 text-[#45a02e]" />
              {article.reading_minutes} Menit Baca
            </span>
          </div>

          {/* Judul Artikel H1 */}
          <h1 className="font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {article.title}
          </h1>

          {/* Author Byline & Social Share Bar */}
          <div className="mt-7 pt-5 border-t border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-5">
            {/* Author Info */}
            <div className="flex items-center gap-3.5">
              {article.author.photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={article.author.photo_url}
                  alt={article.author.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs ring-1 ring-slate-200"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-[#e8f7e4] text-[#45a02e] flex items-center justify-center font-bold">
                  <User className="size-5" />
                </div>
              )}
              <div>
                <p className="font-bold text-slate-900 text-sm sm:text-base leading-none">
                  {article.author.name}
                </p>
                <div className="flex items-center gap-3 text-[11px] sm:text-xs text-slate-500 mt-1.5">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="size-3 text-slate-400" />
                    {formattedDate}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3 text-slate-400" />
                    {article.reading_minutes} min baca
                  </span>
                </div>
              </div>
            </div>

            {/* Top Share Bar */}
            <ArticleShareBar title={article.title} url={fullUrl} />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. BODY ARTIKEL & SIDEBAR (LAYOUT 2 KOLOM)                     */}
      {/* ============================================================== */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Cover Image Utama */}
          <div className="mb-10 overflow-hidden rounded-2xl border border-slate-200/90 max-h-[480px] shadow-xs">
            <ArticleCoverImage
              src={article.cover_display_url || article.cover_image_url}
              alt={article.cover_alt_text || article.title}
              title={article.title}
              priority
              aspectRatio="aspect-[16/9] max-h-[480px]"
            />
          </div>

          {/* Lead / Excerpt Callout */}
          {article.meta_description && (
            <div className="rounded-2xl bg-[#f8fcf7] border-l-4 border-[#45a02e] p-5 sm:p-6 mb-10 text-slate-700 font-medium text-sm sm:text-base leading-relaxed shadow-2xs">
              <p className="text-slate-800 italic">{article.meta_description}</p>
            </div>
          )}

          {/* Main Grid: Content (8 cols) + Sticky Sidebar (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Kolom Kiri: Isi Artikel Utama */}
            <div className="lg:col-span-8 min-w-0">
              {/* Table of Contents versi Mobile (Collapsible) */}
              <TableOfContents headings={headings} variant="mobile" />

              {/* Render BlockNote Blocks */}
              <div className="article-body-content">
                <BlockRenderer blocks={article.content} />
              </div>

              {/* Key Takeaways Callout Box */}
              <div className="mt-12 rounded-2xl border border-[#d6f2c9] bg-[#f8fdf6] p-6 sm:p-7 shadow-2xs">
                <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2 mb-3">
                  <CheckCircle2 className="size-5 text-[#45a02e] shrink-0" />
                  <span>Poin Kunci untuk Kemajuan Bisnis Anda</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#45a02e] font-bold text-base leading-none">•</span>
                    <span>Pilihlah arsitektur website modern yang cepat, ramah mobile, dan terindeks optimal di mesin pencari Google sejak hari pertama.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#45a02e] font-bold text-base leading-none">•</span>
                    <span>Pastikan kecepatan Core Web Vitals terjaga agar calon pelanggan tidak beralih ke kompetitor karena loading lambat.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#45a02e] font-bold text-base leading-none">•</span>
                    <span>Konsultasikan kebutuhan spesifik website Anda dengan tim teknis Bidtech untuk mendapatkan estimasi dan solusi paling efisien.</span>
                  </li>
                </ul>
              </div>

              {/* Share Bar Bagian Bawah */}
              <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs font-semibold text-slate-600">
                  Merasa artikel ini bermanfaat? Bagikan wawasan ini kepada tim atau rekan Anda:
                </p>
                <ArticleShareBar title={article.title} url={fullUrl} />
              </div>

              {/* Author Bio Card */}
              <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-2xs">
                {article.author.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={article.author.photo_url}
                    alt={article.author.name}
                    className="size-16 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200 shrink-0"
                  />
                ) : (
                  <div className="size-16 rounded-full bg-[#e8f7e4] text-[#45a02e] flex items-center justify-center font-bold text-xl shrink-0">
                    <User className="size-8" />
                  </div>
                )}
                <div className="text-center sm:text-left space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h4 className="font-bold text-slate-900 text-base">{article.author.name}</h4>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <ShieldCheck className="size-3 text-emerald-600" />
                      Penulis Terverifikasi
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#45a02e]">Tim Media &amp; Konten Digital Bidtech</p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    Berfokus menyajikan wawasan teknologi, panduan digitalisasi bisnis, serta strategi pengembangan website modern untuk UMKM dan perusahaan berkembang di Indonesia.
                  </p>
                </div>
              </div>

              {/* Navigasi Artikel Sebelumnya & Selanjutnya */}
              {(prevArticle || nextArticle) && (
                <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {prevArticle ? (
                    <Link
                      href={`/blog/${prevArticle.slug}`}
                      className="group rounded-2xl border border-slate-200 p-4 hover:border-[#45a02e]/50 hover:bg-[#f8fdf6]/40 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-[#45a02e] mb-2">
                        <ChevronLeft className="size-3.5" />
                        <span>ARTIKEL SEBELUMNYA</span>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#388324] line-clamp-2 transition-colors">
                        {prevArticle.title}
                      </p>
                    </Link>
                  ) : <div />}

                  {nextArticle && (
                    <Link
                      href={`/blog/${nextArticle.slug}`}
                      className="group rounded-2xl border border-slate-200 p-4 hover:border-[#45a02e]/50 hover:bg-[#f8fdf6]/40 transition-all flex flex-col justify-between text-right sm:text-right"
                    >
                      <div className="flex items-center justify-end gap-1 text-[11px] font-bold text-slate-400 group-hover:text-[#45a02e] mb-2">
                        <span>ARTIKEL SELANJUTNYA</span>
                        <ChevronRight className="size-3.5" />
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#388324] line-clamp-2 transition-colors">
                        {nextArticle.title}
                      </p>
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Kolom Kanan: Sticky Sidebar (Desktop) */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Sticky Table of Contents */}
              <TableOfContents headings={headings} variant="desktop" />

              {/* Sidebar Widget: Konsultasi Website Bidtech */}
              <div className="rounded-2xl border border-[#d6f2c9] bg-gradient-to-br from-[#f8fcf7] to-white p-5 sm:p-6 shadow-xs">
                <div className="size-10 rounded-xl bg-[#eaf7e7] text-[#45a02e] flex items-center justify-center mb-3.5">
                  <MessageCircle className="size-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  Butuh Website Cepat untuk Bisnis Anda?
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Dapatkan website profesional siap pakai mulai dari ratusan ribu rupiah, lengkap dengan domain, hosting, dan dukungan teknis penuh.
                </p>
                <div className="mt-4 space-y-2">
                  <Link
                    href="/template-website"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#45a02e] hover:bg-[#388324] text-white py-2.5 px-4 text-xs font-bold transition-all shadow-xs"
                  >
                    <span>Pilih Template Website</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                  <a
                    href="https://wa.me/6288989289097?text=Halo%20Tim%20Bidtech,%20saya%20tertarik%20konsultasi%20pembuatan%20website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 py-2.5 px-4 text-xs font-semibold transition-all"
                  >
                    <span>Tanya Tim via WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Sidebar Widget: Artikel Terkait Ringkas */}
              {relatedArticles.length > 0 && (
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
                  <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                    <Bookmark className="size-4 text-[#45a02e]" />
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Bacaan Pilihan</h4>
                  </div>
                  <div className="space-y-3.5">
                    {relatedArticles.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/blog/${rel.slug}`}
                        className="group block"
                      >
                        <p className="text-xs font-bold text-slate-800 group-hover:text-[#45a02e] line-clamp-2 transition-colors leading-snug">
                          {rel.title}
                        </p>
                        <span className="text-[11px] text-slate-400 mt-1 inline-block">
                          {rel.reading_minutes} menit baca
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. REKOMENDASI ARTIKEL LAINNYA (3-CARDS GRID)                 */}
      {/* ============================================================== */}
      {relatedArticles.length > 0 && (
        <section className="py-12 sm:py-16 bg-slate-50/80 border-t border-slate-200/80">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
              <div>
                <span className="text-xs font-bold text-[#45a02e] uppercase tracking-wider">Artikel Terkait</span>
                <h3 className="font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  Eksplorasi Wawasan Lainnya
                </h3>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#45a02e] hover:text-[#388324] transition-colors"
              >
                <span>Lihat Semua Artikel</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-[#45a02e]/60 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-full overflow-hidden bg-slate-100">
                    <ArticleCoverImage
                      src={rel.cover_display_url || rel.cover_image_url}
                      alt={rel.cover_alt_text || rel.title}
                      title={rel.title}
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <span className="text-[11px] font-semibold text-[#45a02e] mb-1.5">
                      {rel.reading_minutes} Menit Baca
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#45a02e] line-clamp-2 transition-colors leading-snug flex-1">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-medium truncate max-w-[140px]">{rel.author.name}</span>
                      <span className="text-[#45a02e] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Baca <ArrowRight className="size-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* 4. BANNER CTA BESAR                                            */}
      {/* ============================================================== */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-[#d6f2c9] bg-gradient-to-br from-[#f2faf0] via-white to-[#edf8eb] p-6 sm:p-10 text-center shadow-[0_12px_36px_rgba(69,160,46,0.08)]">
            <h2 className="font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-xl sm:text-2xl font-bold text-slate-900">
              Ingin Memiliki Website Profesional yang Cepat &amp; Siap Pakai?
            </h2>
            <p className="mt-2.5 mx-auto max-w-xl text-xs sm:text-sm text-slate-600 leading-relaxed">
              Jelajahi ratusan template website siap online dari Bidtech atau konsultasikan pengembangan custom bersama tim developer kami.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/template-website"
                className="inline-flex items-center gap-2 rounded-full bg-[#45a02e] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#388324] transition-all"
              >
                <span>Lihat Katalog Template</span>
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://wa.me/6288989289097?text=Halo%20Tim%20Bidtech,%20saya%20ingin%20konsultasi%20website"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900 transition-all"
              >
                <span>Konsultasi Gratis</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
