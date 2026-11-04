"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ShieldCheck,
  CheckCircle2,
  Check,
  ArrowRight,
  PackageX,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTA from "@/app/cta";
import { useLanguage } from "@/context/LanguageContext";
import {
  findSmartphoneBySlug,
  getSmartphonesByBrand,
  allSmartphones,
} from "@/lib/smartphonesData";

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
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

export default function ProductDetailPage() {
  const { t, language } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const rawSlug = (params?.slug as string) || "";

  const product = findSmartphoneBySlug(rawSlug);

  const initialColor = product ? product.colors[0] : null;
  const initialStorage = product ? product.storageVariants[0] : null;

  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedStorage, setSelectedStorage] = useState(initialStorage);
  const [activeImage, setActiveImage] = useState<string>(
    product?.colors[0]?.image || product?.image || ""
  );

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedStorage(product.storageVariants[0]);
      setActiveImage(product.colors[0]?.image || product.image);
    }
  }, [product]);

  // Selalu reset scroll ke paling atas layar saat detail produk dibuka
  useEffect(() => {
    if (typeof window !== "undefined") {
      const w = window as unknown as { __lenis?: { scrollTo: (n: number, o?: { immediate?: boolean }) => void } };
      if (w.__lenis) {
        w.__lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    }
  }, [rawSlug]);

  // Rekomendasi smartphone MURNI dengan merek yang sama (tidak nyampur)
  const recommendedSameBrand = useMemo(() => {
    if (!product) return [];
    return getSmartphonesByBrand(product.brand, product.id);
  }, [product]);

  if (!product || !selectedColor || !selectedStorage) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-ink-900">
        <Navbar />
        <main className="flex-grow pt-32 pb-20 flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-gray-200 shadow-soft">
            <div className="w-14 h-14 rounded-2xl bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto mb-4 text-gold-600">
              <PackageX size={28} />
            </div>
            <h1 className="text-2xl font-bold text-ink-900 mb-2">
              {language === "en" ? "Product Not Found" : "Produk Tidak Ditemukan"}
            </h1>
            <p className="text-text-500 text-sm mb-6">
              {language === "en"
                ? "The product you are looking for might be out of stock or the link is invalid."
                : "Produk yang kamu cari mungkin sudah habis atau alamat tautan tidak valid."}
            </p>
            <Link
              href="/produk"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-ink-900 font-bold rounded-lg shadow-soft transition-all"
            >
              {language === "en" ? "View All Products" : "Lihat Semua Produk"}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Pesan WhatsApp otomatis dinamis
  const whatsappOrderMessage = encodeURIComponent(
    language === "en"
      ? `Hello KONTERKU, I am interested in *${product.name}* (Color: ${selectedColor.name}, Storage: ${selectedStorage.label}) priced at ${formatPrice(selectedStorage.price)}. Is it ready in store?`
      : `Halo KONTERKU, saya tertarik dengan unit *${product.name}* (Warna: ${selectedColor.name}, Varian: ${selectedStorage.label}) seharga ${formatPrice(selectedStorage.price)}. Apakah unit ini ready di toko?`
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-ink-900">
      <header className="flex-shrink-0 w-full z-50">
        <Navbar />
      </header>

      <main className="flex-grow pt-24 sm:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Bar: Tombol Kembali & Breadcrumb */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              href="/produk"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm font-bold text-ink-900 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-2xs group"
            >
              <ChevronLeft size={18} className="text-gold-600 group-hover:-translate-x-1 transition-transform" />
              <span>{language === "en" ? "Back to All Products" : "Kembali ke Semua Produk"}</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 text-xs text-text-400 font-medium">
              <Link href="/" className="hover:text-ink-900 transition-colors">{t.nav.home}</Link>
              <span>/</span>
              <Link href="/produk" className="hover:text-ink-900 transition-colors">{t.nav.products}</Link>
              <span>/</span>
              <span className="text-gold-600 font-semibold">{product.brand}</span>
              <span>/</span>
              <span className="text-ink-900 font-semibold truncate max-w-[200px]">{product.name}</span>
            </div>
          </div>

          {/* MAIN PRODUCT SHOWCASE (Clean, modern 2-column e-commerce) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
            
            {/* LEFT: Clean Image Canvas */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200/90 p-8 sm:p-12 aspect-square flex items-center justify-center relative overflow-hidden shadow-xs">
                
                {/* Subtle Ambient Color Glow */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-colors duration-700 ease-out opacity-20"
                  style={{
                    background: `radial-gradient(circle at center, ${selectedColor.hex} 0%, transparent 72%)`
                  }}
                />

                {/* Badges */}
                <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                  <span className="bg-ink-900 text-white text-[11px] font-bold px-2.5 py-1 rounded tracking-wide shadow-xs">
                    {product.condition}
                  </span>
                  {product.badge && (
                    <span className="bg-gold-500 text-ink-900 text-[11px] font-extrabold px-2.5 py-1 rounded shadow-xs">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Product Photo (Dynamic Color Switcher) */}
                <img
                  src={activeImage}
                  alt={`${product.name} - ${selectedColor.name}`}
                  decoding="async"
                  fetchPriority="high"
                  className="max-h-[88%] max-w-[88%] object-contain select-none mix-blend-multiply transition-all duration-300 ease-out hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = product.image || "/images/products/placeholder.webp";
                  }}
                />
              </div>

              {/* Clean Jaminan / Trust Points (tanpa kotak tebal) */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-y-2 text-xs text-text-500 font-medium border-b border-gray-100 pb-4">
                <span className="flex items-center gap-1.5 text-ink-900">
                  <CheckCircle2 size={14} className="text-gold-600" /> {language === "en" ? "100% Genuine & Registered IMEI" : "100% Original & IMEI Terdaftar"}
                </span>
                <span className="flex items-center gap-1.5 text-ink-900">
                  <ShieldCheck size={14} className="text-gold-600" /> {language === "en" ? "Store Warranty & 7-Day Replacement" : "Garansi Toko & Tukar Baru 7 Hari"}
                </span>
                <span className="flex items-center gap-1.5 text-ink-900">
                  <Check size={14} className="text-gold-600" /> {language === "en" ? "Free In-Store Data Transfer" : "Gratis Pindah Data di Toko"}
                </span>
              </div>
            </div>

            {/* RIGHT: Product Details & Clean Options */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              
              {/* Brand & Name */}
              <div className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-1">
                {product.brand}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-900 mb-2 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-text-500 mb-5 leading-relaxed">
                {product.tagline}
              </p>

              {/* Price (Natural Typography, Clean without heavy container) */}
              <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-gold-600 tracking-tight">
                    {formatPrice(selectedStorage.price)}
                  </span>
                  {selectedStorage.originalPrice && (
                    <span className="text-base text-text-400 line-through">
                      {formatPrice(selectedStorage.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className="text-success font-semibold flex items-center gap-1">
                    <CheckCircle2 size={13} /> {language === "en" ? `In Stock (${product.stockCount} units available)` : `Stok Tersedia (${product.stockCount} unit ready)`}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="text-text-500">{product.warranty}</span>
                </div>
              </div>

              {/* PILIHAN WARNA (Minimalist Swatches seperti Apple / Official Store) */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-text-500 uppercase tracking-wider">
                    {language === "en" ? "Color:" : "Warna:"} <span className="text-ink-900 font-bold inline-flex items-center gap-1.5 ml-1">
                      <span className="w-2.5 h-2.5 rounded-full inline-block border border-black/15 shadow-2xs" style={{ backgroundColor: selectedColor.hex }} />
                      {selectedColor.name}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => {
                          setSelectedColor(color);
                          if (color.image) {
                            setActiveImage(color.image);
                          }
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? "ring-2 ring-gold-500 ring-offset-2 scale-105 shadow-sm"
                            : "hover:scale-105 opacity-80 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={color.name}
                      >
                        {isSelected && (
                          <Check size={14} className="text-white drop-shadow-sm" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PILIHAN RAM & MEMORI (Clean Minimalist Chips) */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-text-500 uppercase tracking-wider">
                    {language === "en" ? "Storage:" : "Kapasitas:"} <span className="text-ink-900 font-bold">{selectedStorage.label}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.storageVariants.map((variant) => {
                    const isSelected = selectedStorage.label === variant.label;
                    return (
                      <button
                        key={variant.label}
                        type="button"
                        onClick={() => setSelectedStorage(variant)}
                        className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                          isSelected
                            ? "bg-ink-900 text-white shadow-sm"
                            : "bg-surface-soft text-ink-900 hover:bg-gold-50 border border-border"
                        }`}
                      >
                        {variant.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SINGLE PRIMARY WHATSAPP ACTION BUTTON */}
              <div className="space-y-3 mb-6">
                <a
                  href={`https://wa.me/6281234567890?text=${whatsappOrderMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F4C87F] via-[#E8B45E] to-[#DC9F3C] hover:from-[#EAB75E] hover:to-[#D99A32] text-ink-900 text-base sm:text-lg font-extrabold shadow-md hover:shadow-xl active:scale-[0.98] transition-all duration-200 border border-gold-300/40"
                >
                  <WhatsappIcon className="w-5 h-5 text-ink-900" />
                  <span>{language === "en" ? "Order via WhatsApp Now" : "Pesan via WhatsApp Sekarang"}</span>
                </a>
              </div>

              <p className="text-[11px] text-text-400">
                {language === "en"
                  ? "Devices can be picked up directly at our Batam Center physical store or delivered via instant courier in Batam & nationwide expedition."
                  : "Unit dapat diambil langsung di toko fisik Batam Center atau dikirim dengan kurir instan se-Kota Batam & ekspedisi seluruh Indonesia."}
              </p>

            </div>
          </div>

          {/* SPECIFICATIONS & PRODUCT OVERVIEW (Clean Table Style, bukan kartu bertumpuk) */}
          <div className="border-t border-border pt-12 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              
              {/* Kolom Kiri: Ringkasan & Fitur Utama */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-ink-900 mb-3">
                    {t.productDetail.aboutProduct} {product.name}
                  </h2>
                  <p className="text-text-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Fitur Utama */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-400 mb-3">
                    {t.productDetail.keyFeatures}
                  </h3>
                  <ul className="space-y-2">
                    {product.specs.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-text-600">
                        <Check size={16} className="text-gold-600 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Isi Dalam Kotak */}
                <div className="pt-4 border-t border-border">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-400 mb-2">
                    {t.productDetail.inTheBox}
                  </h3>
                  <p className="text-sm text-text-600 leading-relaxed">
                    {product.inTheBox.join(", ")}
                  </p>
                </div>
              </div>

              {/* Kolom Kanan: Tabel Spesifikasi Teknis */}
              <div className="lg:col-span-7">
                <h2 className="text-xl font-bold text-ink-900 mb-4">
                  {t.productDetail.technicalSpecs}
                </h2>
                <div className="divide-y divide-border text-sm border-t border-border">
                  <div className="py-3.5 grid grid-cols-3 gap-4">
                    <span className="text-text-400 font-medium">{t.productDetail.specsLabels.screen}</span>
                    <span className="col-span-2 text-ink-900 font-semibold">{product.specs.screen}</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-3 gap-4">
                    <span className="text-text-400 font-medium">{t.productDetail.specsLabels.chipset}</span>
                    <span className="col-span-2 text-ink-900 font-semibold">{product.specs.chipset}</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-3 gap-4">
                    <span className="text-text-400 font-medium">{t.productDetail.specsLabels.camera}</span>
                    <span className="col-span-2 text-ink-900 font-semibold">{product.specs.camera}</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-3 gap-4">
                    <span className="text-text-400 font-medium">{t.productDetail.specsLabels.battery}</span>
                    <span className="col-span-2 text-ink-900 font-semibold">{product.specs.battery}</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-3 gap-4">
                    <span className="text-text-400 font-medium">{t.productDetail.specsLabels.network}</span>
                    <span className="col-span-2 text-ink-900 font-semibold">{product.specs.network}</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-3 gap-4">
                    <span className="text-text-400 font-medium">{t.productDetail.specsLabels.os}</span>
                    <span className="col-span-2 text-ink-900 font-semibold">{product.specs.os}</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-3 gap-4">
                    <span className="text-text-400 font-medium">{t.productDetail.specsLabels.warranty}</span>
                    <span className="col-span-2 text-ink-900 font-semibold">{product.warranty}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* REKOMENDASI HP LAINNYA (Clean E-Commerce Shelf - MURNI SESUAI BRAND) */}
          {recommendedSameBrand.length > 0 && (
            <section className="border-t border-border pt-12 mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-1">
                  SERI {product.brand.toUpperCase()} {t.productDetail.otherSeries}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
                  {t.productDetail.recommendedTitle} {product.brand}
                </h2>
              </div>
              <Link
                href="/produk"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-gold-600 hover:text-gold-700 transition-colors"
              >
                <span>{t.productDetail.viewAll}</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Shelf Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {recommendedSameBrand.map((item) => (
                <Link
                  key={item.id}
                  href={`/produk/${item.slug}`} prefetch={true} scroll={true}
                  className="group flex flex-col bg-white rounded-xl border border-border p-5 transition-[box-shadow,border-color,transform] duration-200 ease-out shadow-soft hover:shadow-soft-hover hover:border-gold-300 hover:-translate-y-1"
                >
                  {/* Gambar Produk */}
                  <div className="w-full aspect-square flex items-center justify-center p-2 mb-3 overflow-hidden rounded-lg bg-transparent">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 ease-out group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/products/placeholder.webp";
                      }}
                    />
                  </div>

                  {/* Brand */}
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gold-600 mb-1">
                    {item.brand}
                  </div>

                  {/* Nama */}
                  <h3 className="text-base font-bold text-ink-900 mb-1 line-clamp-1 group-hover:text-gold-600 transition-colors">
                    {item.name}
                  </h3>

                  {/* Spek Ringkas */}
                  <p className="text-xs text-text-500 mb-3 line-clamp-1">
                    {item.summarySpecs}
                  </p>

                  {/* Harga */}
                  <div className="mt-auto pt-2">
                    {item.originalPrice && (
                      <p className="text-xs text-text-400 line-through mb-0.5">
                        {formatPrice(item.originalPrice)}
                      </p>
                    )}
                    <p className="text-base font-extrabold text-gold-600">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            </section>
          )}

        </div>
      </main>

      {/* STICKY BOTTOM ACTION BAR (MOBILE ONLY) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border py-3 px-4 sm:hidden flex items-center justify-between shadow-lg">
        <div>
          <p className="text-[11px] text-text-400 line-clamp-1 leading-tight">{product.name} ({selectedStorage.label})</p>
          <p className="text-base font-black text-gold-600 leading-tight">{formatPrice(selectedStorage.price)}</p>
        </div>
        <a
          href={`https://wa.me/6281234567890?text=${whatsappOrderMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 py-2.5 px-4 bg-gradient-to-r from-[#F4C87F] via-[#E8B45E] to-[#DC9F3C] text-ink-900 text-xs font-extrabold rounded-xl shadow-sm border border-gold-300/40 active:scale-95 transition-all"
        >
          <WhatsappIcon className="w-4 h-4 text-ink-900" />
          {language === "en" ? "Order via WA" : "Pesan via WA"}
        </a>
      </div>

      <CTA
        title={language === "en" ? `Interested in Taking Home the ${product.name}?` : `Tertarik Membawa Pulang ${product.name}?`}
        description={
          language === "en"
            ? `Get the best price quote for ${product.name} (${selectedStorage.label}). Check unit availability directly on WhatsApp.`
            : `Dapatkan penawaran harga terbaik untuk ${product.name} varian ${selectedStorage.label}. Konsultasikan ketersediaan unit langsung via WhatsApp.`
        }
        primaryButtonText={t.productDetail.ctaBtn}
        primaryButtonHref={`https://wa.me/6281234567890?text=${whatsappOrderMessage}`}
      />

      <footer className="flex-shrink-0">
        <Footer />
      </footer>
    </div>
  );
}
