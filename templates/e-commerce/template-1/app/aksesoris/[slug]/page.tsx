"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Tag, ShieldCheck, Truck, Clock, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTA from "@/app/cta";
import { allAccessories } from "@/lib/accessoriesData";
import { useLanguage } from "@/context/LanguageContext";

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price).replace("Rp", "Rp ");
};

export default function AccessoryDetail() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = (params?.slug as string) || "";
  const { t, language } = useLanguage();
  
  const contentRef = useRef<HTMLDivElement>(null);

  const product = allAccessories.find((p) => {
    if (!rawSlug) return false;
    try {
      return p.slug.toLowerCase() === decodeURIComponent(rawSlug).toLowerCase().trim();
    } catch {
      return p.slug.toLowerCase() === rawSlug.toLowerCase().trim();
    }
  });

  // Selalu reset scroll ke paling atas layar saat detail aksesoris dibuka
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ((window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }).__lenis) {
        (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }).__lenis?.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    }
  }, [rawSlug]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-ink-900">
        <Navbar />
        <main className="flex-grow pt-32 pb-20 flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-border shadow-soft">
            <div className="w-14 h-14 rounded-2xl bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto mb-4 text-gold-600">
              <Tag size={28} />
            </div>
            <h1 className="text-xl font-bold mb-2 text-ink-900">
              {language === "en" ? "Accessory Not Found" : "Aksesoris Tidak Ditemukan"}
            </h1>
            <p className="text-sm text-text-500 mb-6">
              {language === "en" ? "The accessory you are looking for might be out of stock or the link is invalid." : "Aksesoris yang Anda cari mungkin sudah habis atau tautan salah."}
            </p>
            <Link 
              href="/aksesoris"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-ink-900 font-bold text-sm shadow-sm transition-all"
            >
              {language === "en" ? "View All Accessories" : "Lihat Semua Aksesoris"}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedAccessories = allAccessories
    .filter((a) => a.category === product.category && a.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background text-ink-900">
      <Navbar />
      <main className="pt-24 lg:pt-32 pb-20 bg-background min-h-screen text-ink-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tombol Kembali / Navigasi Katalog */}
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-text-500 hover:text-ink-900 transition-colors mb-8 group font-medium"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {t.accessoryDetail.backToCatalog}
          </button>

          {/* Grid 2-Kolom Sesuai Desain Awal */}
          <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start mb-16 sm:mb-20">
            
            {/* Visual Box (Persis Seperti di Awal) */}
            <div className="bg-transparent rounded-2xl p-8 flex items-center justify-center relative aspect-square">
              {product.isPromo && product.badge && (
                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-ink-900 text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wider shadow-sm">
                    {product.badge}
                  </span>
                </div>
              )}
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full max-w-md object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Kolom Kanan: Informasi & Pemesanan */}
            <div className="flex flex-col">
              
              {/* Brand & Kategori Pills */}
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-bold tracking-widest uppercase text-gold-600">
                  {product.brand}
                </span>
                <span className="text-text-400 text-xs font-normal">•</span>
                <span className="text-xs font-medium tracking-widest uppercase text-text-400">
                  {product.category}
                </span>
              </div>

              {/* Judul Produk */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 text-ink-900 leading-tight">
                {product.name}
              </h1>

              {/* Status Stok */}
              <div className="flex items-center gap-4 mb-5">
                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                  product.stock === "tersedia" ? "bg-success-soft text-success" : "bg-gold-50 text-gold-700"
                }`}>
                  {t.accessoryDetail.stock}: {product.stock === "tersedia" ? t.accessoryDetail.stockAvailable : product.stock}
                </span>
              </div>

              {/* Harga Bersih (Tanpa Kotak) */}
              <div className="mb-6 pb-6 border-b border-border/60">
                <div className="flex items-baseline gap-3 mb-1.5 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-black text-gold-600 tracking-tight">
                    {formatPrice(product.price)}
                  </span>
                  {product.isPromo && product.originalPrice && (
                    <span className="text-base sm:text-lg text-text-400 line-through font-medium">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.isPromo && product.originalPrice && (
                    <span className="text-xs font-bold px-2.5 py-0.5 bg-error-soft text-error rounded-full">
                      Promo
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-500">{t.accessoryDetail.originalWarranty}</p>
              </div>

              {/* Deskripsi Produk */}
              <div className="mb-6">
                <h2 className="text-base sm:text-lg font-bold mb-2 text-ink-900">{t.accessoryDetail.productDescription}</h2>
                <p className="text-sm sm:text-base text-text-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Spesifikasi / Fitur Produk */}
              {product.specs && product.specs.length > 0 && (
                <div className="mb-6 p-5 rounded-2xl bg-white border border-border shadow-xs">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-400 mb-3">{t.accessoryDetail.keySpecs}</h3>
                  <ul className="space-y-2">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-text-600">
                        <Check className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 4 Trust Badges Layanan */}
              <div className="grid grid-cols-2 gap-3.5 mb-8">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-text-600">
                  <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-200/80 flex items-center justify-center text-gold-600 shrink-0 shadow-2xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span>{language === "en" ? "Official Warranty" : "Garansi Resmi"}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-text-600">
                  <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-200/80 flex items-center justify-center text-gold-600 shrink-0 shadow-2xs">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span>{language === "en" ? "Secure Delivery" : "Pengiriman Aman"}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-text-600">
                  <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-200/80 flex items-center justify-center text-gold-600 shrink-0 shadow-2xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span>{language === "en" ? "Quick Response" : "Respon Cepat"}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-text-600">
                  <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-200/80 flex items-center justify-center text-gold-600 shrink-0 shadow-2xs">
                    <Tag className="w-5 h-5" />
                  </div>
                  <span>{language === "en" ? "Original Product" : "Produk Original"}</span>
                </div>
              </div>

              {/* Tombol Utama Pesan WhatsApp (Gradasi Emas Sesuai Seluruh Halaman) */}
              <a 
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                  language === "en"
                    ? `Hello KONTERKU, I would like to order ${product.name} (${formatPrice(product.price)}). Is it ready stock?`
                    : product.waMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F4C87F] via-[#E8B45E] to-[#DC9F3C] hover:from-[#EAB75E] hover:to-[#D99A32] text-ink-900 text-base sm:text-lg font-extrabold shadow-md hover:shadow-xl active:scale-[0.98] transition-all duration-200 border border-gold-300/40"
              >
                <WhatsappIcon className="w-5 h-5 text-ink-900" />
                <span>{t.accessoryDetail.orderViaWa}</span>
              </a>

            </div>
          </div>

          {/* Rekomendasi Aksesoris Sejenis */}
          {relatedAccessories.length > 0 && (
            <div className="pt-12 border-t border-border">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">
                    {language === "en" ? "MORE OPTIONS" : "PILIHAN LAINNYA"}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900 mt-1">
                    {language === "en" ? `More ${product.category} Accessories` : `Aksesoris ${product.category} Lainnya`}
                  </h2>
                </div>
                <Link
                  href="/aksesoris"
                  className="text-sm font-bold text-gold-600 hover:text-gold-700 transition-colors"
                >
                  {language === "en" ? "View All →" : "Lihat Semua →"}
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {relatedAccessories.map((item) => (
                  <Link
                    key={item.id}
                    href={`/aksesoris/${item.slug}`}
                    prefetch={true}
                    scroll={true}
                    className="group bg-white rounded-2xl border border-border shadow-soft p-5 transition-all duration-300 hover:shadow-soft-hover hover:border-gold-300 hover:-translate-y-1 flex flex-col"
                  >
                    <div className="w-full aspect-square flex items-center justify-center p-2 mb-3 overflow-hidden rounded-xl bg-transparent">
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => (e.currentTarget.src = "/images/products/placeholder.webp")}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105 select-none"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider mb-1">
                      <span className="text-gold-600">{item.brand}</span>
                      <span className="text-text-400 font-normal">{item.category}</span>
                    </div>
                    <h3 className="text-sm font-bold text-ink-900 mb-2 line-clamp-1 group-hover:text-gold-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-base font-extrabold text-gold-600 mt-auto">
                      {formatPrice(item.price)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* CTA Section */}
      <CTA
        title={language === "en" ? `Get ${product.name} Accessories Today` : `Dapatkan Aksesoris ${product.name} Sekarang`}
        description={
          language === "en"
            ? "All accessories are guaranteed 100% genuine with official warranty. Reach out to our WhatsApp team for quick orders."
            : "Semua produk aksesoris dijamin 100% original dan bergaransi resmi. Hubungi tim kami via WhatsApp untuk pemesanan cepat."
        }
        primaryButtonText={t.accessoryDetail.ctaBtn}
        primaryButtonHref={`https://wa.me/6281234567890?text=${encodeURIComponent(
          language === "en"
            ? `Hello KONTERKU, I would like to order ${product.name}.`
            : `Halo KONTERKU, saya ingin memesan aksesoris ${product.name}.`
        )}`}
      />

      <Footer />
    </div>
  );
}
