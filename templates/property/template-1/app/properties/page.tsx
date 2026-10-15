"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bed, Bath, Maximize, MapPin, Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SubpageHero from "@/components/ui/SubpageHero";
import ContactBanner from "@/components/sections/ContactBanner";
import BlueprintModal from "@/components/ui/BlueprintModal";
import Toast from "@/components/ui/Toast";
import { PROPERTIES_DATA, type PropertyItem } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function PropertiesPage() {
  const { lang } = useLanguage();
  const { isLight } = useTheme();
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem | null>(null);
  const [blueprintOpen, setBlueprintOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{
    isOpen: boolean;
    message: string;
    subMessage?: string;
  }>({
    isOpen: false,
    message: "",
    subMessage: "",
  });

  const cities = ["All", "Dubai", "Zurich", "Singapore", "Jakarta"];
  const types = [
    "All",
    "Villa",
    "Penthouse",
    "Contemporary Residence",
    "Waterfront Sanctuary",
    "Alpine Modernist",
  ];

  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((prop) => {
      // City filter
      const matchesCity = selectedCity === "All" || prop.city === selectedCity;

      // Type filter
      const matchesType =
        selectedType === "All" ||
        prop.type.toLowerCase().includes(selectedType.toLowerCase());

      // Search query
      const matchesSearch =
        searchQuery === "" ||
        prop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.type.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCity && matchesType && matchesSearch;
    });
  }, [selectedCity, selectedType, searchQuery]);

  const handleOpenBlueprint = (prop: PropertyItem) => {
    setSelectedProperty(prop);
    setBlueprintOpen(true);
  };

  const handleRequestDossier = () => {
    setBlueprintOpen(false);
    setToast({
      isOpen: true,
      message:
        lang === "en"
          ? "Architectural Dossier generated. Dispatched to your private portal."
          : "Dossier Arsitektur berhasil dibuat. Diteruskan ke portal privat Anda.",
      subMessage:
        lang === "en"
          ? "Confidential technical drawings & spatial specification dispatch confirmed."
          : "Dokumen teknis dan denah arsitektur rahasia telah dikirimkan.",
    });
  };

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 ${
        isLight ? "bg-architect-light text-neutral-900" : "bg-architect-dark text-white"
      }`}
    >
      <Navbar hideNav={blueprintOpen} />

      <main className="w-full">
        {/* Subpage Hero (Matching Landing Page Hero Form) */}
        <SubpageHero
          darkImage="/images/prop-3.webp"
          lightImage="/images/hero-light.webp"
          subheadEn="PRIVATE RESIDENTIAL PORTFOLIO • DENN HOUSE"
          subheadId="PORTOFOLIO RESIDENSI PRIVAT • DENN HOUSE"
          titlePrimary="DENN"
          titleSecondary="ESTATES"
          taglineEn="12 BESPOKE MONOLITHIC RESIDENCES ACROSS 4 CONTINENTS"
          taglineId="12 MAJELIS RESIDENSI MONOLITIK DI 4 BENUA"
          descriptionEn="A distinguished collection of twelve monumental monolithic residences, floating penthouses, and private coastal sanctuaries across Zurich, Dubai, Singapore, and Jakarta."
          descriptionId="Koleksi terpilih dua belas residensi monolitik monumental, penthouse angkasa, dan suaka pesisir privat di Zurich, Dubai, Singapura, dan Jakarta."
          metricNumber="12"
          metricLabelEn="monolithic residences currently available for private acquisition."
          metricLabelId="residensi monolitik tersedia untuk akuisisi dan inspeksi privat."
          ctaTextEn="BROWSE RESIDENCES"
          ctaTextId="TELUSURI RESIDENSI"
          ctaHref="#properties-catalog"
          breadcrumbs={[
            {
              labelEn: "Properties",
              labelId: "Properti",
            },
          ]}
        />

        {/* Filter Controls & Search */}
        <section
          id="properties-catalog"
          className={`py-12 border-b max-w-[1440px] mx-auto px-6 md:px-12 transition-colors duration-500 ${
            isLight ? "border-neutral-200" : "border-neutral-800"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* City Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              <span className={`text-[11px] font-mono uppercase mr-2 shrink-0 ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                {lang === "en" ? "HUB:" : "KOTA:"}
              </span>
              {cities.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCity(c)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer ${
                    selectedCity === c
                      ? isLight
                        ? "bg-black text-white font-bold shadow-lg"
                        : "bg-white text-black font-bold shadow-lg"
                      : isLight
                        ? "bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200 border border-neutral-200"
                        : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Search Input & Typology Dropdown */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === "en" ? "Search property or location..." : "Cari properti atau lokasi..."}
                  className={`w-full pl-10 pr-4 py-2 rounded-full text-xs placeholder-neutral-400 focus:outline-none focus:border-amber-400 transition-colors border ${
                    isLight
                      ? "bg-white border-neutral-300 text-neutral-900"
                      : "bg-neutral-900 border-neutral-800 text-white"
                  }`}
                />
              </div>

              {/* Typology Select */}
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className={`w-full sm:w-auto px-4 py-2 rounded-full text-xs font-mono uppercase focus:outline-none focus:border-amber-400 transition-colors cursor-pointer border ${
                    isLight
                      ? "bg-white border-neutral-300 text-neutral-800"
                      : "bg-neutral-900 border-neutral-800 text-neutral-300"
                  }`}
                >
                  {types.map((t) => (
                    <option
                      key={t}
                      value={t}
                      className={isLight ? "bg-white text-black" : "bg-neutral-900 text-white"}
                    >
                      {t === "All" ? (lang === "en" ? "ALL TYPOLOGIES" : "SEMUA TIPE") : t.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Properties Grid (12 Items) */}
        <section className="py-16 sm:py-24 max-w-[1440px] mx-auto px-6 md:px-12">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-neutral-500">
                <Search className="w-6 h-6" />
              </div>
              <h3 className={`text-xl font-bold uppercase ${isLight ? "text-neutral-900" : "text-white"}`}>
                {lang === "en" ? "No Properties Matched" : "Tidak Ada Properti yang Sesuai"}
              </h3>
              <p className={`text-xs max-w-sm mx-auto ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                {lang === "en"
                  ? "Try resetting your city or typology filters to browse the complete atelier collection."
                  : "Coba atur ulang filter kota atau tipologi untuk melihat seluruh portofolio atelier."}
              </p>
              <button
                onClick={() => {
                  setSelectedCity("All");
                  setSelectedType("All");
                  setSearchQuery("");
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-amber-400 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors cursor-pointer"
              >
                {lang === "en" ? "Reset Filters" : "Atur Ulang Filter"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {filteredProperties.map((prop) => (
                <article
                  key={prop.id}
                  className={`group rounded-3xl overflow-hidden border transition-all duration-500 flex flex-col justify-between shadow-xl ${
                    isLight
                      ? "bg-white border-neutral-200 hover:border-neutral-300"
                      : "bg-[#111111] border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-neutral-900">
                    <Image
                      src={prop.image}
                      alt={prop.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest uppercase text-white">
                        {prop.city}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase ${
                          prop.status === "Available"
                            ? "bg-amber-400 text-black font-bold"
                            : "bg-neutral-800 text-neutral-300 border border-white/10"
                        }`}
                      >
                        {lang === "en" ? prop.status : prop.statusId}
                      </span>
                    </div>

                    {/* Quick Blueprint Trigger */}
                    <button
                      onClick={() => handleOpenBlueprint(prop)}
                      className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                      title={lang === "en" ? "Inspect Blueprint" : "Lihat Denah"}
                    >
                      <Maximize className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      {/* Price & Location Tag */}
                      <div className="flex items-center justify-between">
                        <span className={`text-xl sm:text-2xl font-black font-mono ${isLight ? "text-neutral-900" : "text-white"}`}>
                          {prop.price}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400">
                          <MapPin className="w-3 h-3 text-amber-500" />
                          <span>{prop.location}</span>
                        </div>
                      </div>

                      {/* Property Name */}
                      <Link href={`/properties/${prop.slug}`}>
                        <h2
                          className={`text-xl sm:text-2xl font-black uppercase tracking-tight transition-colors pt-1 ${
                            isLight
                              ? "text-neutral-900 group-hover:text-amber-600"
                              : "text-white group-hover:text-amber-400"
                          }`}
                        >
                          {prop.name}
                        </h2>
                      </Link>

                      {/* Tagline / Subtitle */}
                      <p className={`text-xs line-clamp-2 leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        {lang === "en" ? prop.tagline : prop.taglineId}
                      </p>
                    </div>

                    {/* Specs Row */}
                    <div className={`pt-4 border-t flex items-center justify-between text-xs font-mono ${isLight ? "border-neutral-100 text-neutral-600" : "border-neutral-800 text-neutral-400"}`}>
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-amber-500" />
                        <span>{prop.beds} Beds</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-3.5 h-3.5 text-amber-500" />
                        <span>{prop.baths} Baths</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize className="w-3.5 h-3.5 text-amber-500" />
                        <span>{prop.area}</span>
                      </div>
                    </div>

                    {/* CTA Actions */}
                    <div className="pt-2 flex items-center gap-3">
                      <Link
                        href={`/properties/${prop.slug}`}
                        className={`flex-1 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-center transition-all active:scale-95 shadow-md ${
                          isLight
                            ? "bg-black text-white hover:bg-neutral-800"
                            : "bg-white text-black hover:bg-neutral-200"
                        }`}
                      >
                        {lang === "en" ? "VIEW RESIDENCE" : "LIHAT RESIDENSI"}
                      </Link>

                      <button
                        onClick={() => handleOpenBlueprint(prop)}
                        className={`px-4 py-3 rounded-full border text-xs font-mono font-bold uppercase tracking-wider transition-colors active:scale-95 cursor-pointer ${
                          isLight
                            ? "border-neutral-300 text-neutral-800 hover:bg-neutral-100"
                            : "border-neutral-700 text-neutral-300 hover:text-white hover:bg-white/5"
                        }`}
                        title={lang === "en" ? "View Blueprint" : "Lihat Denah"}
                      >
                        {lang === "en" ? "PLAN" : "DENAH"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Twilight Vision & Contact CTA Banner */}
        <ContactBanner />
      </main>

      {/* Interactive Blueprint Modal */}
      <BlueprintModal
        isOpen={blueprintOpen}
        onClose={() => setBlueprintOpen(false)}
        onRequestDossier={handleRequestDossier}
        property={selectedProperty}
        lang={lang}
      />

      {/* Confirmation Toast Feedback */}
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        subMessage={toast.subMessage}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />

      <Footer />
    </div>
  );
}
