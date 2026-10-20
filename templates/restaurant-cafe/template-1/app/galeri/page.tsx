'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/context/LanguageContext';

const GALLERY_IMAGES = [
  { id: 1, src: '/assets/gallery/burger-closeup.webp', altId: 'Burger Spesial', altEn: 'Special Gourmet Burger' },
  { id: 2, src: '/assets/gallery/taco-table.webp', altId: 'Taco Tiga Rasa', altEn: 'Taco Fiesta Platter' },
  { id: 3, src: '/assets/gallery/wrap-board.webp', altId: 'Wrap Gandum Panggang', altEn: 'Grilled Artisan Wrap' },
  { id: 4, src: '/assets/gallery/sandwich-platter.webp', altId: 'Sandwich Platter', altEn: 'Sandwich Platter with Greens' },
  { id: 5, src: '/assets/gallery/events-seasonal-menu.webp', altId: 'Menu Musiman', altEn: 'Seasonal Tasting Course' },
  { id: 6, src: '/assets/gallery/interior-bar-counter.webp', altId: 'Meja Bar', altEn: 'Intimate Bar Counter' },
  { id: 7, src: '/assets/gallery/interior-corner-table.webp', altId: 'Sudut Tenang', altEn: 'Quiet Dining Corner' },
  { id: 8, src: '/assets/gallery/interior-main-dining.webp', altId: 'Ruang Makan Utama', altEn: 'Main Dining Hall' },
  { id: 9, src: '/assets/gallery/interior-open-kitchen.webp', altId: 'Dapur Terbuka', altEn: 'Open Kitchen Station' },
  { id: 10, src: '/assets/gallery/events-catering-table.webp', altId: 'Meja Katering', altEn: 'Celebration Catering Table' },
  { id: 11, src: '/assets/gallery/events-private-dinner.webp', altId: 'Makan Malam Pribadi', altEn: 'Private Dining Gathering' },
  { id: 12, src: '/assets/gallery/events-shared-table.webp', altId: 'Meja Bersama', altEn: 'Family Feast Banquet Table' },
  { id: 13, src: '/assets/gallery/staff-head-chef.webp', altId: 'Kepala Koki', altEn: 'Head Chef Plating' },
  { id: 14, src: '/assets/gallery/staff-line-cook.webp', altId: 'Koki Utama', altEn: 'Line Cook at Station' },
  { id: 15, src: '/assets/gallery/staff-prep-station.webp', altId: 'Persiapan Bahan', altEn: 'Prep Station Preparation' },
  { id: 16, src: '/assets/gallery/staff-service-team.webp', altId: 'Tim Pelayanan', altEn: 'Hospitality Service Team' },
];

export default function GaleriPage() {
  const { t, isEn } = useLanguage();
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(GALLERY_IMAGES.length / itemsPerPage);

  const displayImages = GALLERY_IMAGES.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);

  useEffect(() => {
    if (galleryRef.current) {
      const rect = galleryRef.current.getBoundingClientRect();
      scrollPosRef.current = rect.top + window.scrollY;
    }
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    requestAnimationFrame(() => {
      if (scrollPosRef.current) {
        window.scrollTo({ top: scrollPosRef.current, behavior: 'smooth' });
      }
    });
  };

  return (
    <>
      <Header />
      <main className="bg-white text-cocoa min-h-screen">
        <section className="section pt-36 md:pt-44 pb-12 bg-white">
          <div className="shell text-center max-w-3xl">
            <Reveal>
              <p className="eyebrow mb-3 text-ember font-bold tracking-widest text-xs uppercase">
                {t.galeriPage.heroEyebrow}
              </p>
              <h1 className="heading text-4xl sm:text-5xl md:text-6xl mb-6 text-ink font-extrabold">
                {t.galeriPage.heroTitle}
              </h1>
              <p className="text-base md:text-lg text-cocoa/80 max-w-xl mx-auto leading-relaxed font-light">
                {t.galeriPage.heroDesc}
              </p>
            </Reveal>
          </div>
        </section>

        <section ref={galleryRef} className="pb-24 bg-white">
          <div className="shell max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {displayImages.map((img) => {
                const altText = isEn ? img.altEn : img.altId;
                return (
                  <div
                    key={img.id}
                    className="group relative aspect-square rounded-2xl overflow-hidden bg-cream border border-cocoa/10 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <Image
                      src={img.src}
                      alt={altText}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white text-xs font-semibold">{altText}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                  className="px-4 py-2 rounded-full border border-cocoa/15 text-xs font-semibold text-ink disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cocoa/5 transition-colors cursor-pointer"
                >
                  ← {t.galeriPage.prev}
                </button>

                <span className="text-xs text-cocoa/70 font-mono">
                  {t.galeriPage.paginationPage} {page} {t.galeriPage.paginationFrom} {totalPages}
                </span>

                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                  className="px-4 py-2 rounded-full border border-cocoa/15 text-xs font-semibold text-ink disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cocoa/5 transition-colors cursor-pointer"
                >
                  {t.galeriPage.next} →
                </button>
              </div>
            )}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
