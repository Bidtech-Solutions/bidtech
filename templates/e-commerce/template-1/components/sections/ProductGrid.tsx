"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

interface ShowcaseProduct {
  id: string;
  name: string;
  specs: string;
  price: string;
  image: string;
  waMessage: string;
}

const showcaseProducts: ShowcaseProduct[] = [
  {
    id: "iphone-15-pm",
    name: "iPhone 15 Pro Max",
    specs: "256GB - Natural Titanium",
    price: "Rp 19.999.000",
    image: "/images/products/iphone-15-pro-max.webp",
    waMessage: "Halo, saya tertarik dengan iPhone 15 Pro Max 256GB Natural Titanium.",
  },
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    specs: "12/256GB - Titanium Gray",
    price: "Rp 17.499.000",
    image: "/images/products/samsung-s24-ultra.webp",
    waMessage: "Halo, saya tertarik dengan Samsung Galaxy S24 Ultra 12/256GB Titanium Gray.",
  },
  {
    id: "xiaomi-14",
    name: "Xiaomi 14",
    specs: "12/256GB - Jade Green",
    price: "Rp 9.999.000",
    image: "/images/products/xiaomi-14.webp",
    waMessage: "Halo, saya tertarik dengan Xiaomi 14 12/256GB Jade Green.",
  },
  {
    id: "iphone-13-pro",
    name: "iPhone 13 Pro",
    specs: "128GB - Sierra Blue",
    price: "Rp 11.499.000",
    image: "/images/products/iphone-13-pro.webp",
    waMessage: "Halo, saya tertarik dengan iPhone 13 Pro 128GB Sierra Blue.",
  },
];

export default function ProductGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const { t, language } = useLanguage();

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const scrollMobile = (direction: "next" | "prev") => {
    if (!gridRef.current) return;
    const card = gridRef.current.children[0] as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    const newIndex = direction === "next" 
      ? Math.min(showcaseProducts.length - 1, activeProductIndex + 1)
      : Math.max(0, activeProductIndex - 1);
    
    setActiveProductIndex(newIndex);
    gsap.to(gridRef.current, {
      scrollLeft: newIndex * cardWidth,
      duration: 0.45,
      ease: "power2.out",
    });
  };

  const handleScroll = () => {
    if (!gridRef.current) return;
    const card = gridRef.current.children[0] as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    const scrollLeft = gridRef.current.scrollLeft;
    const index = Math.round(scrollLeft / cardWidth);
    if (index !== activeProductIndex && index >= 0 && index < showcaseProducts.length) {
      setActiveProductIndex(index);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (!gridRef.current) return;
      const cards = gridRef.current.children;
      
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="produk" className="py-20 sm:py-24 bg-[#FAFAF8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Eyebrow, Title, Subtitle, and Top Right Action */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 sm:mb-12">
          <div>
            <span className="text-[13px] font-bold text-gold-500 uppercase tracking-[0.08em] mb-2 block">
              {t.productGrid.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-ink-900 tracking-[-0.03em] leading-tight mb-2">
              {t.productGrid.title}
            </h2>
            <p className="text-txt-600 text-sm sm:text-base max-w-xl">
              {t.productGrid.desc}
            </p>
          </div>

          {/* Desktop Link & Mobile Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Mobile Navigation Arrows (GSAP Animated) */}
            <div className="flex items-center gap-2 sm:hidden">
              <button
                onClick={() => scrollMobile("prev")}
                disabled={activeProductIndex === 0}
                className="w-9 h-9 rounded-full bg-white border border-border/80 text-ink-900 shadow-xs flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollMobile("next")}
                disabled={activeProductIndex === showcaseProducts.length - 1}
                className="w-9 h-9 rounded-full bg-white border border-border/80 text-ink-900 shadow-xs flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              href="/produk"
              prefetch={true}
              scroll={true}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-ink-900 shadow-sm border border-border hover:bg-surface-soft hover:border-border-strong active:scale-[0.98] transition-all duration-200 flex-shrink-0"
            >
              {t.productGrid.viewAll} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Product Container: 1 Full-Width Card at a time on Mobile with GSAP, 4-Col Grid on Desktop */}
        <div 
          ref={gridRef}
          onScroll={handleScroll}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory sm:snap-none no-scrollbar scroll-smooth w-full"
        >
          {showcaseProducts.map((product) => (
            <div 
              key={product.id}
              className="w-full min-w-full sm:min-w-0 sm:w-auto flex-shrink-0 sm:flex-shrink snap-center group relative flex flex-col bg-white rounded-[20px] border border-border/80 p-5 hover:border-gold-300/80 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Wishlist / Heart Button at Top Right */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-txt-400 hover:text-red-500 transition-colors"
                aria-label="Tambah ke Favorit"
              >
                <Heart 
                  className={`w-5 h-5 transition-all ${
                    favorites[product.id] 
                      ? "text-red-500 fill-red-500 scale-110" 
                      : "text-txt-400 hover:scale-110"
                  }`} 
                />
              </button>

              {/* Product Image Container */}
              <div className="relative aspect-square w-full flex items-center justify-center p-2 mb-4 overflow-hidden rounded-xl bg-transparent">
                <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain select-none mix-blend-multiply"
                  />
                </div>
              </div>

              {/* Product Meta */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-base sm:text-[17px] font-bold text-ink-900 leading-snug mb-1">
                  {product.name}
                </h3>
                
                <p className="text-xs sm:text-[13px] text-txt-500 mb-3">
                  {product.specs}
                </p>

                {/* Price in Gold */}
                <div className="text-lg sm:text-[19px] font-extrabold text-gold-600 mb-5">
                  {product.price}
                </div>

                {/* Tanya via WhatsApp Button */}
                <a
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                    language === "en"
                      ? `Hello KONTERKU, I am interested in ${product.name} (${product.specs}).`
                      : product.waMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full inline-flex items-center justify-center rounded-xl bg-white border border-gold-300 hover:bg-gold-50/60 active:scale-[0.98] py-2.5 px-4 text-xs sm:text-[13px] font-bold text-ink-900 shadow-sm transition-all duration-200"
                >
                  <WhatsappIcon className="w-4 h-4 text-ink-900 mr-2 flex-shrink-0" />
                  {t.productGrid.orderWa}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Indicator Dots */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 mt-4">
          {showcaseProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveProductIndex(index);
                if (gridRef.current) {
                  const card = gridRef.current.children[0] as HTMLElement;
                  if (card) {
                    const cardWidth = card.offsetWidth + 16;
                    gsap.to(gridRef.current, {
                      scrollLeft: index * cardWidth,
                      duration: 0.45,
                      ease: "power2.out",
                    });
                  }
                }
              }}
              className={`transition-all duration-300 rounded-full ${
                activeProductIndex === index
                  ? "w-6 h-2 bg-gold-500"
                  : "w-2 h-2 bg-txt-300"
              }`}
              aria-label={`Ke Produk ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
