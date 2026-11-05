"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { useLanguage } from "@/lib/i18n";

export function ContactSection() {
  const { t } = useLanguage();
  const [activeOffice, setActiveOffice] = useState<"jakarta" | "batam">("jakarta");

  const currentOffice =
    activeOffice === "jakarta"
      ? {
          title: t.contact.cards.jakartaTitle,
          address: t.contact.cards.jakartaAddress,
          mapSrc: "/images/map-jakarta.jpg",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=-6.207275%2C106.822519",
        }
      : {
          title: t.contact.cards.batamTitle,
          address: t.contact.cards.batamAddress,
          mapSrc: "/images/map-batam.jpg",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=1.1058157731502605%2C104.07543166924557",
        };

  return (
    <section
      className="landing-panel relative overflow-hidden py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#45a02e]/[0.05] via-white to-transparent"
      id="contact"
    >
      {/* BACKGROUND WAVE CANVAS: Menyambung harmonis dari Mitra Section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
      >
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          preserveAspectRatio="none"
          className="hidden sm:block absolute inset-0 h-full w-full"
        >
          {/* Garis Putus-Putus dengan Node Marker Circle persis seperti referensi */}
          <path
            d="M -40 260 C 380 320, 780 190, 1180 230 C 1320 240, 1420 220, 1500 210"
            stroke="#84cc16"
            strokeOpacity="0.32"
            strokeWidth="1.2"
            strokeDasharray="6 8"
          />
          <circle cx="180" cy="275" r="5" fill="#84cc16" fillOpacity="0.75" />

          {/* Garis Utuh Tipis Bergelombang */}
          <path
            d="M -40 360 C 420 410, 840 280, 1220 340 C 1360 360, 1440 330, 1500 320"
            stroke="#45a02e"
            strokeOpacity="0.22"
            strokeWidth="1.0"
          />
        </svg>

        {/* Ambient Connected Glow River */}
        <div className="absolute left-1/2 top-10 -translate-x-1/2 h-80 w-full max-w-4xl rounded-full bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(95,201,74,0.12),transparent_70%)] filter blur-3xl" />
        <div className="absolute -left-24 top-1/3 w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(69,160,46,0.08)_0%,transparent_70%)] filter blur-3xl" />
        <div className="absolute -right-24 bottom-1/4 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(163,230,53,0.10)_0%,transparent_70%)] filter blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. SECTION HEADER (Centered & Clean, Matching Image Reference) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          <Reveal y={16}>
            <h2 className="font-[family-name:var(--font-sora),var(--font-plus-jakarta),sans-serif] text-2xl sm:text-3xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 leading-tight">
              {t.contact.titlePrefix}{" "}
              <span className="text-[#45a02e]">{t.contact.titleHighlight}</span>
            </h2>
            <p className="mt-3.5 text-xs sm:text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </Reveal>
        </div>

        {/* 2. SHOWCASE: Illustration (Left) & Office Map Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Consultation Illustration */}
          <Reveal className="lg:col-span-6 flex justify-center lg:justify-end" y={20}>
            <div className="relative w-full max-w-[440px] sm:max-w-[480px] aspect-[484/413]">
              <Image
                src="/images/assets/contact-illustration.png"
                alt="Konsultasi Proyek BidTech"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                className="object-contain select-none drop-shadow-[0_12px_28px_rgba(69,160,46,0.12)] transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </Reveal>

          {/* Right: Office Location Card with Satellite Map Preview */}
          <Reveal className="lg:col-span-6" delay={120} y={20}>
            <div className="group rounded-[24px] sm:rounded-[28px] border border-slate-200/80 bg-white p-5 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(69,160,46,0.12)] hover:border-[#45a02e]/40 transition-all duration-300">
              {/* Office Selector Tabs */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/80 border border-slate-200/60">
                  <button
                    type="button"
                    onClick={() => setActiveOffice("jakarta")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeOffice === "jakarta"
                        ? "bg-white text-[#45a02e] shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Kantor Jakarta
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveOffice("batam")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeOffice === "batam"
                        ? "bg-white text-[#45a02e] shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Kantor Batam
                  </button>
                </div>
              </div>

              {/* Office Header Info */}
              <div className="flex items-start gap-3.5 mb-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#f0f9ea] border border-[#d6f2c9] text-[#45a02e]">
                  <MapPin className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-[family-name:var(--font-sora)] text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {currentOffice.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    {currentOffice.address}
                  </p>
                </div>
              </div>

              {/* Satellite Map Preview with Red Pin & Floating Button */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-[18px] border border-slate-100 bg-slate-100">
                <Image
                  alt={currentOffice.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                  sizes="(min-width: 1024px) 520px, 90vw"
                  src={currentOffice.mapSrc}
                />
                <a
                  className="absolute right-3 bottom-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200/90 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-md hover:bg-white hover:border-[#45a02e] hover:text-[#45a02e] transition-all cursor-pointer"
                  href={currentOffice.mapsUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <MapPin className="size-3.5 text-red-500" />
                  <span>{t.contact.cards.openGoogleMaps}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
