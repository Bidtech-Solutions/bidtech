"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Calendar,
  Layers,
  ShieldCheck,
  Download,
  Share2,
  CheckCircle2,
  Phone,
  MessageCircle,
  Car,
  Compass,
  FileText,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SubpageHero from "@/components/ui/SubpageHero";
import ContactBanner from "@/components/sections/ContactBanner";
import BlueprintModal from "@/components/ui/BlueprintModal";
import Toast from "@/components/ui/Toast";
import { getPropertyBySlug, PROPERTIES_DATA, type PropertyItem } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { lang, toggleLang } = useLanguage();
  const { isLight } = useTheme();

  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const [activeImage, setActiveImage] = useState<string>(property?.heroImage || property?.image || "");
  const [activeLevelIdx, setActiveLevelIdx] = useState<number>(0);
  const [blueprintOpen, setBlueprintOpen] = useState<boolean>(false);
  const [inquirySent, setInquirySent] = useState<boolean>(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    timeline: "Immediate",
    requestDossier: true,
    message: "",
  });

  const [toast, setToast] = useState<{
    isOpen: boolean;
    message: string;
    subMessage?: string;
  }>({
    isOpen: false,
    message: "",
    subMessage: "",
  });

  const activeLevel = property?.floorplanLevels?.[activeLevelIdx] || property?.floorplanLevels?.[0];
  const relatedProperties = property ? PROPERTIES_DATA.filter((p) => p.slug !== property.slug).slice(0, 3) : [];

  const nameWords = (property?.name || "DENN RESIDENCE").split(" ");
  const titlePrimary = nameWords[0] || "DENN";
  const titleSecondary = nameWords.slice(1).join(" ") || "RESIDENCE";

  const whatsappMessage = encodeURIComponent(
    lang === "en"
      ? `Hello Denn House Private Client Desk, I am inquiring about ${property?.name || "the property"} (${property?.location || "Batam"}) listed at ${property?.price || ""}. Could you please arrange a confidential briefing and dispatch the Architectural Dossier?`
      : `Halo Meja Klien Privat Denn House, saya tertarik dengan ${property?.name || "properti"} (${property?.location || "Batam"}) seharga ${property?.price || ""}. Mohon info jadwal konsultasi privat dan pengiriman Dossier Arsitektur resminya.`
  );

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email) return;

    setInquirySent(true);
    setToast({
      isOpen: true,
      message:
        lang === "en"
          ? `Inquiry received for ${property.name}.`
          : `Permintaan konsultasi untuk ${property.name} berhasil diajukan.`,
      subMessage:
        lang === "en"
          ? "Our Private Client Director will contact you confidentially within 2 hours."
          : "Direktur Klien Privat kami akan menghubungi Anda secara rahasia dalam waktu 2 jam.",
    });
  };

  const handleRequestDossier = () => {
    setBlueprintOpen(false);
    setToast({
      isOpen: true,
      message:
        lang === "en"
          ? `Architectural Dossier generated for ${property.name}.`
          : `Dossier Arsitektural untuk ${property.name} berhasil dibuat.`,
      subMessage:
        lang === "en"
          ? "Full CAD elevations & engineering specifications dispatched to your email."
          : "Gambar teknis CAD & spesifikasi struktur telah dikirimkan ke email Anda.",
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
        {/* Subpage Hero (Monumental Landing Page Hero Structure) */}
        <SubpageHero
          darkImage={property.image}
          lightImage="/images/hero-light.webp"
          subheadEn={`${property.id.toUpperCase()} • ${property.location.toUpperCase()}`}
          subheadId={`${property.id.toUpperCase()} • ${property.location.toUpperCase()}`}
          titlePrimary={titlePrimary}
          titleSecondary={titleSecondary}
          taglineEn={`${property.price} — ${property.type}`}
          taglineId={`${property.price} — ${property.typeId || property.type}`}
          descriptionEn={property.tagline}
          descriptionId={property.taglineId || property.tagline}
          metricNumber={property.area}
          metricLabelEn={`${property.beds} Bedrooms • ${property.baths} Bathrooms • ${property.floors} Levels`}
          metricLabelId={`${property.beds} Kamar • ${property.baths} Kamar Mandi • ${property.floors} Lantai`}
          ctaTextEn="INSPECT BLUEPRINT & SPECS"
          ctaTextId="LIHAT DENAH & SPESIFIKASI"
          ctaHref="#property-details"
          breadcrumbs={[
            { labelEn: "Properties", labelId: "Properti", href: "/properties" },
            { labelEn: property.name, labelId: property.name },
          ]}
        />

        {/* Property Key Details & Interactive Content */}
        <div id="property-details" className="pt-8">
          {/* Key Metric Specs Strip */}
          <div
            className={`max-w-[1440px] mx-auto px-6 md:px-12 py-8 border-b grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs font-mono transition-colors duration-500 ${
              isLight ? "border-neutral-200" : "border-neutral-800"
            }`}
          >
            <div className={`border-l pl-4 space-y-1 ${isLight ? "border-neutral-300" : "border-white/10"}`}>
              <div className={`uppercase text-[10px] ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                {lang === "en" ? "BEDROOMS" : "KAMAR TIDUR"}
              </div>
              <div className={`text-lg font-bold flex items-center gap-1.5 ${isLight ? "text-neutral-900" : "text-white"}`}>
                <Bed className="w-4 h-4 text-amber-500" />
                <span>{property.beds} Suites</span>
              </div>
            </div>

            <div className={`border-l pl-4 space-y-1 ${isLight ? "border-neutral-300" : "border-white/10"}`}>
              <div className={`uppercase text-[10px] ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                {lang === "en" ? "BATHROOMS" : "KAMAR MANDI"}
              </div>
              <div className={`text-lg font-bold flex items-center gap-1.5 ${isLight ? "text-neutral-900" : "text-white"}`}>
                <Bath className="w-4 h-4 text-amber-500" />
                <span>{property.baths} Baths</span>
              </div>
            </div>

            <div className={`border-l pl-4 space-y-1 ${isLight ? "border-neutral-300" : "border-white/10"}`}>
              <div className={`uppercase text-[10px] ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                {lang === "en" ? "BUILT AREA" : "LUAS BANGUNAN"}
              </div>
              <div className={`text-lg font-bold flex items-center gap-1.5 ${isLight ? "text-neutral-900" : "text-white"}`}>
                <Maximize className="w-4 h-4 text-amber-500" />
                <span>{property.area}</span>
              </div>
            </div>

            <div className={`border-l pl-4 space-y-1 ${isLight ? "border-neutral-300" : "border-white/10"}`}>
              <div className={`uppercase text-[10px] ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                {lang === "en" ? "PLOT AREA" : "LUAS TANAH"}
              </div>
              <div className={`text-lg font-bold flex items-center gap-1.5 ${isLight ? "text-neutral-900" : "text-white"}`}>
                <Layers className="w-4 h-4 text-amber-500" />
                <span>{property.plotArea}</span>
              </div>
            </div>

            <div className={`border-l pl-4 space-y-1 ${isLight ? "border-neutral-300" : "border-white/10"}`}>
              <div className={`uppercase text-[10px] ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                {lang === "en" ? "GARAGES" : "GARASI MOBIL"}
              </div>
              <div className={`text-lg font-bold flex items-center gap-1.5 ${isLight ? "text-neutral-900" : "text-white"}`}>
                <Car className="w-4 h-4 text-amber-500" />
                <span>{property.garages} Bays</span>
              </div>
            </div>

            <div className={`border-l pl-4 space-y-1 ${isLight ? "border-neutral-300" : "border-white/10"}`}>
              <div className={`uppercase text-[10px] ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                {lang === "en" ? "YEAR BUILT" : "TAHUN SELESAI"}
              </div>
              <div className={`text-lg font-bold flex items-center gap-1.5 ${isLight ? "text-neutral-900" : "text-white"}`}>
                <Calendar className="w-4 h-4 text-amber-500" />
                <span>{property.yearBuilt}</span>
              </div>
            </div>
          </div>

          {/* Interactive Cinematic Photo Gallery */}
          <section className="py-8 sm:py-12 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 space-y-3 sm:space-y-4">
            <div className="relative aspect-[4/3] xs:aspect-[16/11] sm:aspect-[21/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl">
              <Image
                src={activeImage}
                alt={property.name}
                fill
                priority
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="object-cover transition-all duration-700 ease-out"
              />
              {/* Gradient overlay only on desktop where text overlays inside the image */}
              <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Desktop Overlay Bar (Hidden on mobile) */}
              <div className="hidden sm:flex absolute bottom-6 left-6 right-6 items-center justify-between pointer-events-none">
                <div className="px-4 py-2 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs font-mono text-white pointer-events-auto">
                  {property.name} • {property.location}
                </div>

                <button
                  type="button"
                  onClick={() => setBlueprintOpen(true)}
                  className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 pointer-events-auto cursor-pointer shadow-lg transition-transform active:scale-95"
                >
                  <Maximize className="w-3.5 h-3.5" />
                  <span>{lang === "en" ? "View Blueprint" : "Lihat Denah"}</span>
                </button>
              </div>
            </div>

            {/* Mobile Info & Action Bar (Placed cleanly BELOW the photo so image is never obstructed) */}
            <div className="flex sm:hidden items-center justify-between gap-3 px-1 py-1">
              <div className="min-w-0 pr-2">
                <h3 className={`font-black text-sm uppercase tracking-tight truncate ${isLight ? "text-neutral-900" : "text-white"}`}>
                  {property.name}
                </h3>
                <p className="text-[11px] font-mono text-amber-500 dark:text-amber-400 flex items-center gap-1.5 truncate mt-0.5">
                  <MapPin className="w-3 h-3 shrink-0 text-amber-500" />
                  <span className="truncate">{property.location}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setBlueprintOpen(true)}
                className="px-3.5 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow-md transition-transform active:scale-95 cursor-pointer touch-manipulation"
              >
                <Maximize className="w-3.5 h-3.5" />
                <span>{lang === "en" ? "View Blueprint" : "Lihat Denah"}</span>
              </button>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
              {property.gallery.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  aria-label={`View angle ${i + 1}`}
                  className={`relative aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                    activeImage === img
                      ? "ring-2 ring-amber-400 border-transparent scale-[1.02]"
                      : "opacity-60 hover:opacity-100 border-neutral-800"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${property.name} angle ${i + 1}`}
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Architectural Discourse & Materiality Grid */}
          <section className="py-16 max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column: Narrative & Highlights */}
              <div className="lg:col-span-7 space-y-10">
                <div className="space-y-4">
                  <span className="text-[11px] font-mono tracking-widest text-amber-500 uppercase">
                    {lang === "en" ? "ARCHITECTURAL DISCOURSE" : "DISKURSUS ARSITEKTUR"}
                  </span>
                  <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                    {lang === "en" ? "THE SPATIAL MANIFESTO" : "MANIFESTO TATA RUANG"}
                  </h2>
                  <p className={`text-sm sm:text-base leading-relaxed ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                    {lang === "en" ? property.description.en : property.description.id}
                  </p>
                </div>

                {/* Key Architectural Highlights */}
                <div className="space-y-4">
                  <h3 className={`text-lg font-bold uppercase tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                    {lang === "en" ? "Curated Structural Highlights" : "Sorotan Struktur Utama"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(lang === "en" ? property.architecturalHighlights.en : property.architecturalHighlights.id).map((highlight, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border flex items-start gap-3 transition-colors ${
                          isLight
                            ? "bg-white border-neutral-200 shadow-sm"
                            : "bg-[#141414] border-neutral-800"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className={`text-xs font-mono leading-relaxed ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tactile Materiality Section */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono tracking-widest text-amber-500 uppercase">
                        {lang === "en" ? "AUTHENTIC SUBSTANCE" : "SUBSTANSI AUTENTIK"}
                      </span>
                      <h3 className={`text-lg font-bold uppercase tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                        {lang === "en" ? "Tactile Material Palette" : "Palet Material Autentik"}
                      </h3>
                    </div>
                    <Compass className="w-5 h-5 text-amber-500" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.materials.map((mat, i) => (
                      <div
                        key={i}
                        className={`p-5 rounded-2xl border space-y-2 transition-colors ${
                          isLight
                            ? "bg-white border-neutral-200 shadow-sm"
                            : "bg-[#141414] border-neutral-800"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className={`text-xs font-bold uppercase font-mono ${isLight ? "text-neutral-900" : "text-white"}`}>
                            {lang === "en" ? mat.name : mat.nameId}
                          </h4>
                          <span className={`text-[10px] font-mono ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                            {mat.origin}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Private Client Advisory Desk Card */}
              <div className="lg:col-span-5">
                <div
                  className={`sticky top-28 p-6 sm:p-8 rounded-3xl border space-y-6 shadow-2xl transition-colors duration-500 ${
                    isLight
                      ? "bg-white border-neutral-200 text-neutral-900"
                      : "bg-[#111111] border-neutral-800 text-white"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono tracking-widest text-amber-500 uppercase">
                      {lang === "en" ? "CONFIDENTIAL CLIENT DESK" : "MEJA KLIEN PRIVAT"}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                      {lang === "en" ? "Acquire This Residence" : "Akuisisi Residensi Ini"}
                    </h3>
                    <p className={`text-xs ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                      {lang === "en"
                        ? "Denn House operates under strict international discretion protocols."
                        : "Denn House mematuhi protokol diskresi & kerahasiaan internasional."}
                    </p>
                  </div>

                  {/* Pricing Overview */}
                  <div className={`p-4 rounded-2xl border ${isLight ? "bg-neutral-50 border-neutral-200" : "bg-neutral-900 border-white/5"}`}>
                    <div className="text-[10px] font-mono uppercase text-neutral-400">
                      {lang === "en" ? "ASKING PRICE" : "NILAI AKUISISI"}
                    </div>
                    <div className="text-2xl sm:text-3xl font-black font-mono text-amber-500 mt-1">
                      {property.price}
                    </div>
                    <div className={`text-[11px] font-mono mt-1 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                      {property.status === "Available"
                        ? lang === "en"
                          ? "Direct title conveyance available"
                          : "Hak kepemilikan langsung tersedia"
                        : lang === "en"
                        ? "Currently under discreet negotiation"
                        : "Dalam proses negosiasi privat"}
                    </div>
                  </div>

                  {/* Direct Contact Links */}
                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/628136764825?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 px-6 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-xl active:scale-[0.99]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{lang === "en" ? "Instant WhatsApp Briefing" : "Konsultasi WhatsApp Cepat"}</span>
                    </a>

                    <a
                      href="tel:+628136764825"
                      className={`w-full py-3.5 px-6 rounded-full border text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-colors ${
                        isLight
                          ? "border-neutral-300 hover:bg-neutral-100 text-neutral-800"
                          : "border-neutral-700 hover:bg-neutral-800 text-neutral-300"
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>+62 813-6764-825</span>
                    </a>
                  </div>

                  {/* Private Confidential Form */}
                  <div className={`pt-6 border-t ${isLight ? "border-neutral-200" : "border-neutral-800"}`}>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500 mb-3">
                      {lang === "en" ? "REQUEST ARCHITECTURAL DOSSIER" : "MINTA DOSSIER ARSITEKTUR LENGKAP"}
                    </h4>

                    {inquirySent ? (
                      <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{lang === "en" ? "Inquiry Transmitted" : "Permintaan Diterima"}</span>
                        </div>
                        <p className="text-[11px] text-neutral-300">
                          {lang === "en"
                            ? "Our partner in Zurich or Singapore will contact you today."
                            : "Mitra kami di Zurich atau Singapura akan segera menghubungi Anda."}
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleInquirySubmit} className="space-y-3">
                        <input
                          type="text"
                          required
                          placeholder={lang === "en" ? "Full Legal Name *" : "Nama Lengkap Sesuai Dokumen *"}
                          value={inquiryForm.name}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                          className={`w-full px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-amber-400 transition-colors border ${
                            isLight
                              ? "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400"
                              : "bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500"
                          }`}
                        />

                        <input
                          type="email"
                          required
                          placeholder={lang === "en" ? "Confidential Email Address *" : "Alamat Email Rahasia *"}
                          value={inquiryForm.email}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                          className={`w-full px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-amber-400 transition-colors border ${
                            isLight
                              ? "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400"
                              : "bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500"
                          }`}
                        />

                        <input
                          type="tel"
                          placeholder={lang === "en" ? "Direct Phone / WhatsApp" : "Nomor HP / WhatsApp"}
                          value={inquiryForm.phone}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                          className={`w-full px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-amber-400 transition-colors border ${
                            isLight
                              ? "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400"
                              : "bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500"
                          }`}
                        />

                        <button
                          type="submit"
                          className="w-full py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                        >
                          {lang === "en" ? "TRANSMIT REQUEST" : "KIRIM PERMINTAAN"}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Multi-Level Floorplan CAD Section */}
          <section className={`py-16 border-t ${isLight ? "border-neutral-200" : "border-neutral-900"}`}>
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono tracking-widest text-amber-500 uppercase">
                    {lang === "en" ? "TECHNICAL DRAWINGS" : "DENAH SPASIAL"}
                  </span>
                  <h3 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                    {lang === "en" ? "Interactive Multi-Level Blueprints" : "Denah Arsitektur Interaktif"}
                  </h3>
                </div>

                {/* Level Selectors */}
                <div className="flex items-center gap-2">
                  {property.floorplanLevels.map((lvl, idx) => (
                    <button
                      key={lvl.level}
                      onClick={() => setActiveLevelIdx(idx)}
                      className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        activeLevelIdx === idx
                          ? "bg-amber-400 text-black font-bold shadow-lg"
                          : isLight
                          ? "bg-white border border-neutral-200 text-neutral-700 hover:text-black"
                          : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {lvl.level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floorplan Drawing Area */}
              <div
                className={`p-6 sm:p-10 rounded-3xl border relative overflow-hidden transition-colors duration-500 ${
                  isLight
                    ? "bg-white border-neutral-200 shadow-xl"
                    : "bg-[#0E0E0E] border-neutral-800 shadow-2xl"
                }`}
              >
                <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-6 border-b border-neutral-800/60">
                  <div>
                    <h4 className={`text-xl font-bold uppercase ${isLight ? "text-neutral-900" : "text-white"}`}>
                      {activeLevel.name}
                    </h4>
                    <p className={`text-xs font-mono mt-1 ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                      {lang === "en" ? "Gross Internal Area:" : "Luas Bersih Spasial:"} {activeLevel.area}
                    </p>
                  </div>

                  <button
                    onClick={() => setBlueprintOpen(true)}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-500" />
                    <span>{lang === "en" ? "Download CAD Sheet" : "Unduh Berkas CAD"}</span>
                  </button>
                </div>

                {/* Blueprint Graphic */}
                <div className="py-12 flex items-center justify-center">
                  <svg
                    viewBox="0 0 800 450"
                    className="w-full max-w-3xl h-auto text-amber-500/80 stroke-current fill-none stroke-[1.5]"
                  >
                    <rect x="50" y="50" width="700" height="350" rx="4" strokeDasharray="6 6" />
                    <rect x="80" y="80" width="280" height="290" />
                    <rect x="400" y="80" width="320" height="180" />
                    <rect x="400" y="280" width="180" height="90" />
                    <rect x="600" y="280" width="120" height="90" />
                    <circle cx="220" cy="225" r="45" />
                    <line x1="80" y1="80" x2="360" y2="370" strokeDasharray="3 3" opacity="0.4" />
                    <text
                      x="180"
                      y="150"
                      className="fill-current stroke-none text-[11px] font-mono tracking-widest uppercase"
                    >
                      {activeLevel.name}
                    </text>
                    <text
                      x="430"
                      y="140"
                      className="fill-current stroke-none text-[10px] font-mono tracking-widest uppercase"
                    >
                      MASTER ATRIUM & POOL
                    </text>
                  </svg>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-neutral-800/60">
                  {(lang === "en" ? activeLevel.features : activeLevel.featuresId || activeLevel.features).map((room, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-amber-500 font-bold">0{i + 1}.</span>
                      <span className={isLight ? "text-neutral-700" : "text-neutral-300"}>{room}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Technical Engineering Specifications Table */}
          <section className={`py-16 max-w-[1440px] mx-auto px-6 md:px-12 border-t ${isLight ? "border-neutral-200" : "border-neutral-900"}`}>
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-mono tracking-widest text-amber-500 uppercase">
                  {lang === "en" ? "TECHNICAL METRICS" : "SPESIFIKASI TEKNIS"}
                </span>
                <h3 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                  {lang === "en" ? "Engineering Tolerances" : "Standar Rekayasa & Struktur"}
                </h3>
              </div>

              <div
                className={`rounded-3xl border overflow-hidden shadow-lg transition-colors duration-500 ${
                  isLight ? "bg-white border-neutral-200" : "bg-[#111111] border-neutral-800"
                }`}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className={`border-b text-[11px] uppercase tracking-wider ${isLight ? "border-neutral-200 bg-neutral-50 text-neutral-500" : "border-neutral-800 bg-neutral-900/50 text-neutral-400"}`}>
                      <tr>
                        <th className="py-4 px-6 font-bold">{lang === "en" ? "Engineering Domain" : "Komponen Struktur"}</th>
                        <th className="py-4 px-6 font-bold">{lang === "en" ? "Standard & Specification" : "Spesifikasi Teknis"}</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isLight ? "divide-neutral-200" : "divide-neutral-800"}`}>
                      {Object.entries(property.specifications).map(([key, value]) => (
                        <tr key={key} className={isLight ? "hover:bg-neutral-50/80" : "hover:bg-white/[0.02]"}>
                          <td className="py-4 px-6 text-amber-500 font-bold uppercase whitespace-nowrap">
                            {key.replace(/([A-Z])/g, " $1")}
                          </td>
                          <td className={`py-4 px-6 ${isLight ? "text-neutral-800" : "text-neutral-300"}`}>
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Related Residences Grid */}
          <section className={`py-16 max-w-[1440px] mx-auto px-6 md:px-12 border-t ${isLight ? "border-neutral-200" : "border-neutral-900"}`}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-amber-500 uppercase">
                  {lang === "en" ? "PORTFOLIO CONTINUATION" : "EKSPLORASI LANJUTAN"}
                </span>
                <h3 className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                  {lang === "en" ? "Related Monolithic Residences" : "Residensi Serupa"}
                </h3>
              </div>

              <Link
                href="/properties"
                className={`text-xs font-mono uppercase flex items-center gap-1.5 transition-colors ${
                  isLight ? "text-neutral-600 hover:text-black" : "text-neutral-400 hover:text-white"
                }`}
              >
                <span>{lang === "en" ? "View All 12" : "Lihat Semua 12"}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedProperties.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/properties/${rel.slug}`}
                  className={`group rounded-3xl overflow-hidden border transition-all duration-300 block shadow-lg ${
                    isLight
                      ? "bg-white border-neutral-200 hover:border-neutral-300"
                      : "bg-[#111111] border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <div className="relative aspect-[16/11] bg-neutral-900 overflow-hidden">
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white">
                      {rel.city}
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-amber-500 font-bold">{rel.price}</span>
                      <span className={`font-mono text-[11px] ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>{rel.area}</span>
                    </div>
                    <h4
                      className={`text-lg font-bold uppercase transition-colors ${
                        isLight ? "text-neutral-900 group-hover:text-amber-600" : "text-white group-hover:text-amber-400"
                      }`}
                    >
                      {rel.name}
                    </h4>
                    <p className={`text-xs line-clamp-1 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>{rel.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Twilight Vision & Contact CTA Banner */}
        <ContactBanner />
      </main>

      <Footer />

      {/* Blueprint Modal */}
      <BlueprintModal
        isOpen={blueprintOpen}
        property={property}
        onClose={() => setBlueprintOpen(false)}
        onRequestDossier={handleRequestDossier}
        lang={lang}
      />

      {/* Toast Feedback */}
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        subMessage={toast.subMessage}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
