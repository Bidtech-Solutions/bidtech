"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Camera,
  MapPin,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SubpageHero from "@/components/ui/SubpageHero";
import ContactBanner from "@/components/sections/ContactBanner";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

interface PhotoItem {
  id: string;
  titleEn: string;
  titleId: string;
  category: "all" | "exterior" | "interior" | "landscape" | "craft";
  location: string;
  image: string;
  cameraMeta: string;
}

const GALLERY_PHOTOS: PhotoItem[] = [
  {
    id: "photo-1",
    titleEn: "Sander House Cantilever",
    titleId: "Kantilever Sander House",
    category: "exterior",
    location: "Dubai Hills, UAE",
    image: "/images/prop-1.webp",
    cameraMeta: "Phase One IQ4 • 35mm Rodenstock",
  },
  {
    id: "photo-2",
    titleEn: "Azure Waterfront Reflection",
    titleId: "Refleksi Tepian Azure",
    category: "exterior",
    location: "Palm Jumeirah, Dubai",
    image: "/images/prop-2.webp",
    cameraMeta: "Hasselblad H6D-100c • 28mm",
  },
  {
    id: "photo-3",
    titleEn: "The Oasis Monolith Volume",
    titleId: "Volume Monolit The Oasis",
    category: "exterior",
    location: "Emirates Hills, Dubai",
    image: "/images/prop-3.webp",
    cameraMeta: "Leica S3 • Summarit-S 70mm",
  },
  {
    id: "photo-4",
    titleEn: "Luma Residence Twilight Facade",
    titleId: "Fasad Senja Luma Residence",
    category: "exterior",
    location: "Downtown Dubai",
    image: "/images/prop-4.webp",
    cameraMeta: "Sony A1 • 24-70mm GM II",
  },
  {
    id: "photo-5",
    titleEn: "Kairos Sanctuary Perimeter",
    titleId: "Keliling Suaka Kairos",
    category: "landscape",
    location: "Jumeirah Bay Island",
    image: "/images/prop-5.webp",
    cameraMeta: "Phase One XT • 32mm HR",
  },
  {
    id: "photo-6",
    titleEn: "Seraphina Alpine Elevation",
    titleId: "Elevasi Alpen Seraphina",
    category: "exterior",
    location: "Zurichberg Hills, Switzerland",
    image: "/images/prop-6.webp",
    cameraMeta: "Hasselblad X2D • 55mm XCD",
  },
  {
    id: "photo-7",
    titleEn: "Brutalist Stone Joinery",
    titleId: "Pertemuan Batu Brutalis",
    category: "craft",
    location: "Valser Quartzite Studio",
    image: "/images/craft-1.webp",
    cameraMeta: "Macro Leica 120mm",
  },
  {
    id: "photo-8",
    titleEn: "Burmese Teak Louver Assembly",
    titleId: "Rangka Kisi Kayu Jati",
    category: "craft",
    location: "Atelier Joinery Yard",
    image: "/images/craft-2.webp",
    cameraMeta: "Hasselblad X2D • 38mm",
  },
  {
    id: "photo-9",
    titleEn: "Acoustic Glazing & Titanium",
    titleId: "Kaca Akustik & Titanium",
    category: "craft",
    location: "Facade Workshop Zurich",
    image: "/images/craft-3.webp",
    cameraMeta: "Sony A7R V • 50mm GM",
  },
  {
    id: "photo-10",
    titleEn: "Hand-Chiseled Travertine Wall",
    titleId: "Dinding Travertine Pahat Tangan",
    category: "craft",
    location: "Tivoli Quarry Atelier",
    image: "/images/craft-4.webp",
    cameraMeta: "Phase One IQ4 • 45mm",
  },
  {
    id: "photo-11",
    titleEn: "Nexus Monolith Concrete Span",
    titleId: "Bentang Beton Nexus Monolith",
    category: "exterior",
    location: "Bahnhofstrasse, Zurich",
    image: "/images/prop-7.webp",
    cameraMeta: "Leica S3 • 35mm",
  },
  {
    id: "photo-12",
    titleEn: "Solaria Oceanfront Terrace",
    titleId: "Teras Tepi Samudra Solaria",
    category: "landscape",
    location: "Sentosa Cove, Singapore",
    image: "/images/prop-8.webp",
    cameraMeta: "Hasselblad H6D • 24mm",
  },
  {
    id: "photo-13",
    titleEn: "Orchard Sky Glass Gallery",
    titleId: "Galeri Kaca Langit Orchard",
    category: "interior",
    location: "Orchard Boulevard, Singapore",
    image: "/images/prop-9.webp",
    cameraMeta: "Sony A1 • 16-35mm GM II",
  },
  {
    id: "photo-14",
    titleEn: "Menteng Heritage Courtyard",
    titleId: "Halaman Asri Menteng",
    category: "landscape",
    location: "Menteng, Jakarta",
    image: "/images/prop-10.webp",
    cameraMeta: "Leica SL2-S • 35mm APO",
  },
  {
    id: "photo-15",
    titleEn: "SCBD Triplex Sky Horizon",
    titleId: "Cakrawala Langit SCBD",
    category: "interior",
    location: "SCBD District, Jakarta",
    image: "/images/prop-11.webp",
    cameraMeta: "Phase One IQ4 • 50mm",
  },
  {
    id: "photo-16",
    titleEn: "Nongsa Archipelagic Cantilever",
    titleId: "Kantilever Kepulauan Nongsa",
    category: "exterior",
    location: "Nongsa Coast, Batam",
    image: "/images/prop-12.webp",
    cameraMeta: "Hasselblad X2D • 21mm",
  },
  {
    id: "photo-17",
    titleEn: "Polished Travertine Hallway",
    titleId: "Lorong Travertine Poles",
    category: "interior",
    location: "Dubai Hills Atelier",
    image: "/images/prop-1.webp",
    cameraMeta: "Leica SL2 • 28mm Summicron",
  },
  {
    id: "photo-18",
    titleEn: "Alpine Obsidian Glass Pavilion",
    titleId: "Paviliun Kaca Obsidian Alpen",
    category: "exterior",
    location: "Lake Zurich, Switzerland",
    image: "/images/hero-dark.webp",
    cameraMeta: "Phase One XT • 70mm",
  },
  {
    id: "photo-19",
    titleEn: "Sunlit Architectural Atrium",
    titleId: "Atrium Arsitektur Berlimpah Cahaya",
    category: "interior",
    location: "Zurich Design Studio",
    image: "/images/hero-light.webp",
    cameraMeta: "Hasselblad H6D • 35mm",
  },
  {
    id: "photo-20",
    titleEn: "Subterranean Wine Cellar Vault",
    titleId: "Gudang Bawah Tanah Koleksi Anggur",
    category: "interior",
    location: "Emirates Hills, Dubai",
    image: "/images/prop-4.webp",
    cameraMeta: "Sony A7R V • 24mm GM",
  },
  {
    id: "photo-21",
    titleEn: "Infinity Edge Reflecting Pool",
    titleId: "Kolam Refleksi Tanpa Batas",
    category: "landscape",
    location: "Palm Jumeirah Coastline",
    image: "/images/prop-5.webp",
    cameraMeta: "Leica S3 • 45mm",
  },
  {
    id: "photo-22",
    titleEn: "Precision Titanium Mullion Facade",
    titleId: "Fasad Rangka Titanium Presisi",
    category: "craft",
    location: "Fabrication Laboratory Zurich",
    image: "/images/craft-3.webp",
    cameraMeta: "Sony A1 • 90mm Macro GM",
  },
];

type CategoryFilter = "all" | "exterior" | "interior" | "landscape" | "craft";

interface BentoSpan {
  col: string;
  row: string;
  type: "hero" | "wide" | "tall" | "compact" | "panorama";
}

function getBentoSpan(index: number, total: number): BentoSpan {
  // If only 4 items (e.g. Landscape category) -> Exactly 8 units = 2 rows x 4 cols
  if (total === 4) {
    if (index === 0) return { col: "sm:col-span-2 lg:col-span-2", row: "sm:row-span-2", type: "hero" };
    if (index === 1) return { col: "sm:col-span-1 lg:col-span-1", row: "sm:row-span-1", type: "compact" };
    if (index === 2) return { col: "sm:col-span-1 lg:col-span-1", row: "sm:row-span-1", type: "compact" };
    if (index === 3) return { col: "sm:col-span-2 lg:col-span-2", row: "sm:row-span-1", type: "wide" };
  }

  // If 5 items (e.g. Craft or Interior categories) -> Exactly 12 units = 3 rows x 4 cols
  if (total === 5) {
    if (index === 0) return { col: "sm:col-span-2 lg:col-span-2", row: "sm:row-span-2", type: "hero" };
    if (index === 1) return { col: "sm:col-span-1 lg:col-span-1", row: "sm:row-span-1", type: "compact" };
    if (index === 2) return { col: "sm:col-span-1 lg:col-span-1", row: "sm:row-span-1", type: "compact" };
    if (index === 3) return { col: "sm:col-span-2 lg:col-span-2", row: "sm:row-span-1", type: "wide" };
    if (index === 4) return { col: "sm:col-span-2 lg:col-span-4", row: "sm:row-span-1", type: "panorama" };
  }

  // If 8 items (e.g. Exterior category) -> Exactly 16 units = 4 rows x 4 cols
  if (total === 8) {
    if (index === 0) return { col: "sm:col-span-2 lg:col-span-2", row: "sm:row-span-2", type: "hero" };
    if (index === 1) return { col: "sm:col-span-1 lg:col-span-1", row: "sm:row-span-1", type: "compact" };
    if (index === 2) return { col: "sm:col-span-1 lg:col-span-1", row: "sm:row-span-1", type: "compact" };
    if (index === 3) return { col: "sm:col-span-2 lg:col-span-2", row: "sm:row-span-1", type: "wide" };
    if (index === 4) return { col: "sm:col-span-1 lg:col-span-1", row: "sm:row-span-1", type: "compact" };
    if (index === 5) return { col: "sm:col-span-1 lg:col-span-1", row: "sm:row-span-1", type: "compact" };
    if (index === 6) return { col: "sm:col-span-2 lg:col-span-2", row: "sm:row-span-1", type: "wide" };
    if (index === 7) return { col: "sm:col-span-2 lg:col-span-2", row: "sm:row-span-2", type: "hero" };
  }

  // Handle last elements of 22 to make total exactly 40 units (10 rows x 4 cols)
  if (total === 22) {
    if (index === 20) return { col: "sm:col-span-2 lg:col-span-2", row: "sm:row-span-1", type: "wide" };
    if (index === 21) return { col: "sm:col-span-2 lg:col-span-2", row: "sm:row-span-1", type: "wide" };
  }

  // General rhythmic cycle for asymmetric bento box
  const cycleIndex = index % 8;
  switch (cycleIndex) {
    case 0:
      return { col: "sm:col-span-2 lg:col-span-2", row: "sm:row-span-2", type: "hero" };
    case 1:
      return { col: "sm:col-span-1 lg:col-span-1", row: "sm:row-span-1", type: "compact" };
    case 2:
      return { col: "sm:col-span-1 lg:col-span-1", row: "sm:row-span-1", type: "compact" };
    case 3:
      return { col: "sm:col-span-2 lg:col-span-2", row: "sm:row-span-1", type: "wide" };
    case 4:
      return { col: "sm:col-span-1 lg:col-span-1", row: "sm:row-span-1", type: "compact" };
    case 5:
      return { col: "sm:col-span-1 lg:col-span-1", row: "sm:row-span-2", type: "tall" };
    case 6:
      return { col: "sm:col-span-2 lg:col-span-2", row: "sm:row-span-1", type: "wide" };
    case 7:
      return { col: "sm:col-span-1 lg:col-span-1", row: "sm:row-span-1", type: "compact" };
    default:
      return { col: "sm:col-span-1 lg:col-span-1", row: "sm:row-span-1", type: "compact" };
  }
}

export default function GalleryPage() {
  const { lang } = useLanguage();
  const { isLight } = useTheme();

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === "all"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === activeCategory);

  const selectedPhoto =
    selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  // Touch swipe support for mobile lightbox navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left -> next photo
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev + 1) % filteredPhotos.length : 0
        );
      } else {
        // Swiped right -> prev photo
        setSelectedPhotoIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length
            : 0
        );
      }
    }
    setTouchStartX(null);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === "Escape") {
        setSelectedPhotoIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev + 1) % filteredPhotos.length : 0
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length
            : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos.length]);

  // Lock background scroll when lightbox popup is open
  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPhotoIndex]);

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 ${
        isLight ? "bg-architect-light text-neutral-900" : "bg-architect-dark text-white"
      }`}
    >
      <Navbar hideNav={selectedPhotoIndex !== null} />

      <main className="w-full">
        {/* Hero Section (Matching Landing Page Hero structure) */}
      <SubpageHero
        darkImage="/images/prop-2.webp"
        lightImage="/images/hero-light.webp"
        subheadEn="ARCHITECTURAL PHOTOGRAPHY ARCHIVE"
        subheadId="ARSIP FOTOGRAFI ARSITEKTUR"
        titlePrimary="DENN"
        titleSecondary="GALLERY"
        taglineEn="PURE SPATIAL PHOTOGRAPHY & ARCHITECTURAL PLATES"
        taglineId="FOTOGRAFI SPASIAL MURNI & ARSIP ARSITEKTUR"
        descriptionEn="A visual exhibition capturing radical monolithic volumes, natural light interplay, and tactile Swiss craftsmanship across all 12 estates."
        descriptionId="Pameran visual yang mengabadikan volume monolitik, interaksi cahaya alami, dan keahlian pertukangan presisi Swiss di 12 mahakarya hunian."
        metricNumber={`${GALLERY_PHOTOS.length}+`}
        metricLabelEn="curated architectural photographic plates in medium-format definition."
        metricLabelId="pelat foto arsitektur definisi format medium beresolusi tinggi."
        ctaTextEn="VIEW PHOTOGRAPHY"
        ctaTextId="LIHAT FOTOGRAFI"
        ctaHref="#photo-gallery"
        breadcrumbs={[
          {
            labelEn: "Gallery",
            labelId: "Galeri",
          },
        ]}
      />

      {/* Main Photographic Gallery Section */}
      <section
        id="photo-gallery"
        className="relative z-10 py-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12"
      >
        {/* Category Filter Pills & Photo Counter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10 dark:border-white/10 border-neutral-200">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", labelEn: "All Plates", labelId: "Semua Foto" },
              { id: "exterior", labelEn: "Exteriors", labelId: "Eksterior" },
              { id: "interior", labelEn: "Interiors", labelId: "Interior" },
              { id: "landscape", labelEn: "Landscapes", labelId: "Lansekap" },
              { id: "craft", labelEn: "Materials & Craft", labelId: "Material & Detail" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id as CategoryFilter);
                  setSelectedPhotoIndex(null);
                }}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === tab.id
                    ? isLight
                      ? "bg-black text-white shadow-md font-bold"
                      : "bg-white text-black shadow-md font-bold"
                    : isLight
                      ? "bg-black/5 hover:bg-black/10 text-neutral-600 hover:text-black"
                      : "bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10"
                }`}
              >
                {lang === "en" ? tab.labelEn : tab.labelId}
              </button>
            ))}
          </div>

          {/* Photo Counter & Bento Grid Status */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-[10px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              <LayoutGrid className="w-3.5 h-3.5 text-amber-500" />
              <span>BENTO GRID</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <Camera className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {lang === "en"
                  ? `Showing ${filteredPhotos.length} of ${GALLERY_PHOTOS.length} Plates`
                  : `Menampilkan ${filteredPhotos.length} dari ${GALLERY_PHOTOS.length} Foto`}
              </span>
            </div>
          </div>
        </div>

        {/* Standard Clean Grid on Mobile, Asymmetric Bento Grid on Tablet/Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:auto-rows-[250px] lg:auto-rows-[280px] gap-5 sm:gap-5 lg:gap-6 sm:grid-flow-dense">
          {filteredPhotos.map((photo, idx) => {
            const span = getBentoSpan(idx, filteredPhotos.length);
            const isHero = span.type === "hero";
            const isWide = span.type === "wide" || span.type === "panorama";
            const isTall = span.type === "tall";

            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => setSelectedPhotoIndex(idx)}
                aria-label={`View photo ${lang === "en" ? photo.titleEn : photo.titleId}`}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] shadow-lg hover:shadow-2xl w-full aspect-[16/10] sm:aspect-auto text-left block p-0 border-0 outline-none select-none touch-manipulation ${span.col} ${span.row} ${
                  isLight
                    ? "bg-neutral-100 border border-neutral-200"
                    : "bg-neutral-900 border border-white/10"
                }`}
              >
                {/* High-Resolution Architectural Image */}
                <Image
                  src={photo.image}
                  alt={lang === "en" ? photo.titleEn : photo.titleId}
                  fill
                  priority={idx < 4}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                />

                {/* Hover Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 opacity-75 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />

                {/* Top Meta Tag Bar */}
                <div className="absolute top-3.5 left-3.5 right-3.5 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white font-bold tracking-widest shadow-sm">
                      {idx < 9 ? `0${idx + 1}` : idx + 1}
                    </span>
                    {isHero && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-black text-[9px] font-mono font-bold uppercase tracking-wider shadow-md">
                        <Sparkles className="w-2.5 h-2.5 text-black" />
                        <span>{lang === "en" ? "HERO PLATE" : "FOKUS UTAMA"}</span>
                      </span>
                    )}
                    {span.type === "panorama" && (
                      <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/25 text-[9px] font-mono uppercase tracking-wider">
                        {lang === "en" ? "PANORAMIC" : "PANORAMA"}
                      </span>
                    )}
                  </div>

                  <div className="w-8 h-8 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white transform transition-transform duration-300 z-10 pointer-events-none">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </div>
                  <h3
                    className={`font-black tracking-tight uppercase leading-snug line-clamp-1 text-base ${
                      isHero || isWide ? "sm:text-xl" : "sm:text-base"
                    }`}
                  >
                    {lang === "en" ? photo.titleEn : photo.titleId}
                  </h3>
                  <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-neutral-300">
                    <span className="truncate opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                      <Camera className="w-3 h-3 text-neutral-400 shrink-0" />
                      <span className="truncate">{photo.cameraMeta}</span>
                    </span>
                    {isTall && (
                      <span className="hidden lg:inline-block text-[9px] uppercase tracking-widest text-neutral-400 shrink-0 ml-2">
                        {lang === "en" ? "VERTICAL ELEVATION" : "ELEVASI VERTIKAL"}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Twilight Vision & Contact CTA Banner */}
      <ContactBanner />
      </main>

      <Footer />

      {/* Fullscreen Lightbox Modal for pure photo viewing */}
      {selectedPhoto && selectedPhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3.5 sm:p-8 touch-manipulation select-none"
          onClick={() => setSelectedPhotoIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar inside Lightbox */}
          <div
            className="flex items-center justify-between text-white border-b border-white/15 pb-3 sm:pb-4 max-w-7xl mx-auto w-full shrink-0 gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-amber-400 text-black text-[11px] sm:text-xs font-mono font-bold shrink-0">
                {selectedPhotoIndex + 1} / {filteredPhotos.length}
              </span>
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-bold uppercase tracking-wide truncate">
                  {lang === "en" ? selectedPhoto.titleEn : selectedPhoto.titleId}
                </h4>
                <p className="text-[11px] sm:text-xs font-mono text-neutral-400 truncate">
                  {selectedPhoto.location} • {selectedPhoto.cameraMeta}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedPhotoIndex(null)}
              className="w-10 h-10 shrink-0 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 touch-manipulation"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Photo View */}
          <div
            className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center min-h-0 my-auto py-2 sm:py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[58vh] xs:h-[64vh] sm:h-[75vh] max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center">
              <Image
                src={selectedPhoto.image}
                alt={lang === "en" ? selectedPhoto.titleEn : selectedPhoto.titleId}
                fill
                priority
                className="object-contain pointer-events-none select-none"
              />
            </div>

            {/* Left Nav Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhotoIndex(
                  (selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
                );
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-xl touch-manipulation"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Nav Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-xl touch-manipulation"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Bar inside Lightbox (Hidden on mobile devices) */}
          <div
            className="hidden sm:flex items-center justify-center text-xs font-mono text-neutral-400 gap-4 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <span>
              {lang === "en"
                ? "Use keyboard ← and → to navigate"
                : "Gunakan tombol panah ← dan → untuk navigasi"}
            </span>
            <span>•</span>
            <span>{lang === "en" ? "ESC to close" : "ESC untuk menutup"}</span>
          </div>
        </div>
      )}
    </div>
  );
}
