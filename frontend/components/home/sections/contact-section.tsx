"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";

import { Reveal } from "@/components/animations/reveal";
import { SplitText, SpotlightCard } from "@/components/react-bits";
import { useLanguage } from "@/lib/i18n";

export function ContactSection() {
  const { t, lang } = useLanguage();
  const isEn = lang === "en";
  const [activeOffice, setActiveOffice] = useState<"jakarta" | "batam">("jakarta");

  return (
    <section
      className="landing-panel cv-auto relative overflow-hidden py-10 sm:py-16 lg:py-24 bg-gradient-to-b from-white via-emerald-50/25 to-white"
      id="contact"
    >
      {/* Background: Wavy dashed green curve line matching mockup */}
      <svg
        className="pointer-events-none absolute inset-0 size-full z-0 overflow-visible opacity-40 select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M-80 620 C220 660, 480 610, 720 520 C960 430, 1150 370, 1480 320"
          stroke="#45a02e"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
      </svg>

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -bottom-24 right-0 size-96 bg-gradient-to-tl from-[#45a02e]/10 to-transparent blur-3xl -z-10 rounded-full" />
      <div className="pointer-events-none absolute top-12 left-0 size-80 bg-gradient-to-br from-[#5fc94a]/10 to-transparent blur-3xl -z-10 rounded-full" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 lg:mb-14">
          <SplitText
            as="h2"
            className="font-[family-name:var(--font-plus-jakarta),sans-serif] text-2xl sm:text-3xl lg:text-[40px] font-bold tracking-[-0.025em] text-slate-900 leading-tight"
            segments={[
              { text: isEn ? "Ready to Start Your " : "Siap Memulai Proyek " },
              {
                text: isEn ? "Project" : "Anda",
                className: "text-[#45a02e] font-bold",
              },
            ]}
          />
          <Reveal y={14} delay={100}>
            <p className="mt-2.5 sm:mt-3.5 text-xs sm:text-sm md:text-[15px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {isEn
                ? "Fill out the form below and our team will get back to you shortly for a free consultation and discuss your business system or website needs."
                : "Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda untuk konsultasi gratis dan mendiskusikan kebutuhan sistem atau website bisnis Anda."}
            </p>
          </Reveal>
        </div>

        {/* 2. MAIN LAYOUT: Left Column (Top Featured Card + 6 Bento Cards) & Right Column (2 Maps / Mobile Tabs) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
          {/* SISI KIRI (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4 text-left">
            {/* TOP CARD: Diskusi Langsung dengan Tim Ahli */}
            <Reveal y={18}>
              <SpotlightCard
                spotlightColor="rgba(69, 160, 46, 0.14)"
                className="group relative rounded-[20px] sm:rounded-[26px] border border-slate-200/90 bg-white p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#45a02e]/60 hover:shadow-[0_12px_32px_rgba(69,160,46,0.10)] transition-all duration-300"
              >
                {/* Content Row: Illustration (Left) + Text & Online Badge (Right) */}
                <div className="flex items-center gap-3.5 sm:gap-6">
                  {/* Left: Illustration */}
                  <div className="relative size-16 sm:size-24 shrink-0 overflow-hidden rounded-xl bg-emerald-50/50 flex items-center justify-center">
                    <Image
                      src="/images/contact/cs-consultant.webp"
                      alt="Konsultasi Tim Ahli BidTech"
                      width={100}
                      height={90}
                      priority
                      className="object-contain select-none"
                    />
                  </div>

                  {/* Right: Title, Badge, Description */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-[family-name:var(--font-plus-jakarta),sans-serif] text-xs sm:text-base lg:text-lg font-bold text-slate-900 leading-snug">
                        {isEn ? "Direct Discussion with Expert Team" : "Diskusi Langsung dengan Tim Ahli"}
                      </h3>
                      <span className="shrink-0 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] sm:text-[11px] font-medium border border-slate-200/60">
                        Online
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] sm:text-[13px] text-slate-500 leading-relaxed max-w-md line-clamp-2 sm:line-clamp-none">
                      {isEn
                        ? "Get technology solution recommendations & timeline estimates with zero upfront commitment."
                        : "Dapatkan rekomendasi solusi teknologi & estimasi timeline tanpa biaya komitmen awal."}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Full-Width WhatsApp CTA Button */}
                <a
                  href="https://wa.me/628217601455?text=Halo%20BidTech,%20saya%20ingin%20berdiskusi%20langsung%20dengan%20tim%20ahli%20mengenai%20proyek%20digital."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 sm:mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#45a02e] hover:bg-[#3d8f28] active:scale-[0.99] text-white px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold shadow-[0_2px_12px_rgba(69,160,46,0.25)] hover:shadow-[0_6px_20px_rgba(69,160,46,0.35)] transition-all cursor-pointer group"
                >
                  <FaWhatsapp className="size-4 sm:size-4.5" />
                  <span>{isEn ? "Contact WhatsApp Now" : "Hubungi WhatsApp Sekarang"}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </SpotlightCard>
            </Reveal>

            {/* Sub-label: SALURAN KOMUNIKASI RESMI */}
            <Reveal y={14} delay={50}>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500 mt-1 mb-0.5">
                {isEn
                  ? "OFFICIAL COMMUNICATION CHANNELS"
                  : "SALURAN KOMUNIKASI RESMI"}
              </p>
            </Reveal>

            {/* 6 BENTO CARDS: Grid 2 Kolom (Compact on Mobile & Desktop) */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3.5">
              {/* Bento 1: WhatsApp */}
              <Reveal y={16} delay={70}>
                <a
                  href="https://wa.me/628217601455?text=Halo%20BidTech,%20saya%20ingin%20berkonsultasi%20mengenai%20proyek%20digital."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <SpotlightCard
                    spotlightColor="rgba(34, 197, 94, 0.12)"
                    className="h-full rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-2.5 sm:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-[#45a02e]/50 hover:shadow-[0_8px_24px_rgba(69,160,46,0.08)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#eefbe6] text-[#16a34a]">
                        <FaWhatsapp className="size-4 sm:size-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[11px] sm:text-sm font-bold text-slate-900 leading-snug truncate">
                          WhatsApp
                        </h4>
                        <p className="mt-0.5 text-[10px] sm:text-xs text-slate-600 font-medium truncate">
                          0821-7601-455
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400 truncate hidden md:block">
                          {isEn ? "Sales & consultant standby" : "Tim Sales & Konsultan Siaga"}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </a>
              </Reveal>

              {/* Bento 2: LinkedIn */}
              <Reveal y={16} delay={100}>
                {/* Link LinkedIn dikosongkan sementara */}
                <a href="#" className="block group h-full">
                  <SpotlightCard
                    spotlightColor="rgba(2, 132, 199, 0.12)"
                    className="h-full rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-2.5 sm:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-sky-400/50 hover:shadow-[0_8px_24px_rgba(2,132,199,0.08)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#eff6ff] text-[#0284c7]">
                        <span className="flex size-4 sm:size-5 items-center justify-center rounded-[3px] sm:rounded-[4px] bg-[#0284c7] text-white">
                          <FaLinkedinIn className="size-2.5 sm:size-3" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[11px] sm:text-sm font-bold text-slate-900 leading-snug truncate">
                          LinkedIn
                        </h4>
                        <p className="mt-0.5 text-[10px] sm:text-xs text-slate-600 font-medium truncate">
                          bidtech.id
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400 truncate hidden md:block">
                          {isEn ? "Corporate networking" : "Networking Korporasi"}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </a>
              </Reveal>

              {/* Bento 3: Instagram */}
              <Reveal y={16} delay={130}>
                <a
                  href="https://www.instagram.com/bidtechsolutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <SpotlightCard
                    spotlightColor="rgba(225, 29, 72, 0.10)"
                    className="h-full rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-2.5 sm:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-pink-300 hover:shadow-[0_8px_24px_rgba(225,29,72,0.08)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#fdf2f8] text-[#e11d48]">
                        <FaInstagram className="size-3.5 sm:size-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[11px] sm:text-sm font-bold text-slate-900 leading-snug truncate">
                          Instagram
                        </h4>
                        <p className="mt-0.5 text-[10px] sm:text-xs text-slate-600 font-medium truncate">
                          @bidtechsolutions
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400 truncate hidden md:block">
                          {isEn ? "Activity & portfolio" : "Aktivitas & Portofolio"}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </a>
              </Reveal>

              {/* Bento 4: TikTok */}
              <Reveal y={16} delay={160}>
                <a
                  href="https://www.tiktok.com/@bidtechsolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <SpotlightCard
                    spotlightColor="rgba(15, 23, 42, 0.10)"
                    className="h-full rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-2.5 sm:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-slate-400 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-slate-100 text-slate-900">
                        <FaTiktok className="size-3.5 sm:size-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[11px] sm:text-sm font-bold text-slate-900 leading-snug truncate">
                          TikTok
                        </h4>
                        <p className="mt-0.5 text-[10px] sm:text-xs text-slate-600 font-medium truncate">
                          @bidtechsolutions
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400 truncate hidden md:block">
                          {isEn ? "Tech insights & demo" : "Tech Insights & Demo"}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </a>
              </Reveal>

              {/* Bento 5: Facebook */}
              <Reveal y={16} delay={190}>
                <a
                  href="https://www.facebook.com/profile.php?id=61592059225349"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <SpotlightCard
                    spotlightColor="rgba(24, 119, 242, 0.12)"
                    className="h-full rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-2.5 sm:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-blue-400/50 hover:shadow-[0_8px_24px_rgba(24,119,242,0.08)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#eff6ff] text-[#1877f2]">
                        <FaFacebookF className="size-3 sm:size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[11px] sm:text-sm font-bold text-slate-900 leading-snug truncate">
                          Facebook
                        </h4>
                        <p className="mt-0.5 text-[10px] sm:text-xs text-slate-600 font-medium truncate">
                          Bidtech Id
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400 truncate hidden md:block">
                          {isEn ? "Community & updates" : "Komunitas & Berita"}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </a>
              </Reveal>

              {/* Bento 6: Email Resmi */}
              <Reveal y={16} delay={220}>
                <a
                  href="mailto:bidtech@gmail.com"
                  className="block group h-full"
                >
                  <SpotlightCard
                    spotlightColor="rgba(69, 160, 46, 0.12)"
                    className="h-full rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-2.5 sm:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-[#45a02e]/50 hover:shadow-[0_8px_24px_rgba(69,160,46,0.08)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#eefbe6] text-[#16a34a]">
                        <Mail className="size-3.5 sm:size-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[11px] sm:text-sm font-bold text-slate-900 leading-snug truncate">
                          {isEn ? "Official Email" : "Email Resmi"}
                        </h4>
                        <p className="mt-0.5 text-[10px] sm:text-xs text-slate-600 font-medium truncate">
                          bidtech@gmail.com
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400 truncate hidden md:block">
                          {isEn ? "Corporate proposal & RFP" : "Proposal & RFP Korporat"}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </a>
              </Reveal>
            </div>
          </div>

          {/* SISI KANAN (lg:col-span-5): Maps dengan Segmented Tabs di Mobile & Vertikal di Desktop */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4 text-left">
            {/* Mobile Tab Switcher (Hanya muncul di mobile < lg untuk menghemat ruang vertikal) */}
            <div className="lg:hidden flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/80">
              <button
                type="button"
                onClick={() => setActiveOffice("jakarta")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeOffice === "jakarta"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {t.contact.cards.jakartaTitle}
              </button>
              <button
                type="button"
                onClick={() => setActiveOffice("batam")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeOffice === "batam"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {t.contact.cards.batamTitle}
              </button>
            </div>

            {/* Map Card 1: Kantor Jakarta (Tampil di desktop, atau di mobile jika activeOffice === 'jakarta') */}
            <div className={`${activeOffice === "jakarta" ? "block" : "hidden"} lg:block`}>
              <Reveal y={18} delay={80}>
                <div className="group rounded-[20px] sm:rounded-[22px] border border-slate-200/85 bg-white p-3.5 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#45a02e]/45 hover:shadow-[0_12px_32px_rgba(69,160,46,0.10)] transition-all duration-300">
                  <div className="flex items-start gap-3 sm:gap-3.5 mb-2.5 sm:mb-3.5">
                    <div className="flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#eefbe6] text-[#45a02e]">
                      <MapPin className="size-4 sm:size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {t.contact.cards.jakartaTitle}
                      </h3>
                      <p className="mt-0.5 text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {t.contact.cards.jakartaAddress}
                      </p>
                    </div>
                  </div>

                  {/* Satellite Map Preview with Red Location Pin Overlay */}
                  <div className="relative h-28 sm:h-36 lg:h-40 w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-100">
                    <Image
                      alt={t.contact.cards.jakartaTitle}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      sizes="(min-width: 1024px) 460px, 90vw"
                      src="/images/contact/map-jakarta.webp"
                    />

                    {/* Red Location Marker Pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none drop-shadow-md">
                      <div className="size-6 sm:size-7 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md border-2 border-white">
                        <MapPin className="size-3.5 sm:size-4 fill-white" />
                      </div>
                      <div className="size-1.5 sm:size-2 rounded-full bg-red-600/40 mt-0.5" />
                    </div>

                    {/* Buka Google Maps Button */}
                    <a
                      className="absolute right-2.5 bottom-2.5 z-10 inline-flex items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-slate-800 shadow-md hover:bg-white hover:text-[#45a02e] transition-all cursor-pointer border border-slate-100"
                      href="https://www.google.com/maps/search/?api=1&query=-6.207275%2C106.822519"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {t.contact.cards.openGoogleMaps}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Map Card 2: Kantor Batam HQ (Tampil di desktop, atau di mobile jika activeOffice === 'batam') */}
            <div className={`${activeOffice === "batam" ? "block" : "hidden"} lg:block`}>
              <Reveal y={18} delay={160}>
                <div className="group rounded-[20px] sm:rounded-[22px] border border-slate-200/85 bg-white p-3.5 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#45a02e]/45 hover:shadow-[0_12px_32px_rgba(69,160,46,0.10)] transition-all duration-300">
                  <div className="flex items-start gap-3 sm:gap-3.5 mb-2.5 sm:mb-3.5">
                    <div className="flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#eefbe6] text-[#45a02e]">
                      <MapPin className="size-4 sm:size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {t.contact.cards.batamTitle}
                      </h3>
                      <p className="mt-0.5 text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {t.contact.cards.batamAddress}
                      </p>
                    </div>
                  </div>

                  {/* Satellite Map Preview with Red Location Pin Overlay */}
                  <div className="relative h-28 sm:h-36 lg:h-40 w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-100">
                    <Image
                      alt={t.contact.cards.batamTitle}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      sizes="(min-width: 1024px) 460px, 90vw"
                      src="/images/contact/map-batam.webp"
                    />

                    {/* Red Location Marker Pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none drop-shadow-md">
                      <div className="size-6 sm:size-7 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md border-2 border-white">
                        <MapPin className="size-3.5 sm:size-4 fill-white" />
                      </div>
                      <div className="size-1.5 sm:size-2 rounded-full bg-red-600/40 mt-0.5" />
                    </div>

                    {/* Buka Google Maps Button */}
                    <a
                      className="absolute right-2.5 bottom-2.5 z-10 inline-flex items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-slate-800 shadow-md hover:bg-white hover:text-[#45a02e] transition-all cursor-pointer border border-slate-100"
                      href="https://www.google.com/maps/search/?api=1&query=1.1219%2C104.0536"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {t.contact.cards.openGoogleMaps}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
