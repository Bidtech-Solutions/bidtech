"use client";

import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";

import { Reveal } from "@/components/animations/reveal";
import { SplitText } from "@/components/react-bits";
import { useLanguage } from "@/lib/i18n";

// Multi-color Google Maps Pin SVG matching official Google design
function GoogleMapsIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 92.3 132.3" className={className} aria-hidden="true">
      <path
        fill="#1a73e8"
        d="M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z"
      />
      <path
        fill="#ea4335"
        d="M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.3-21.8-18.3z"
      />
      <path
        fill="#4285f4"
        d="M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-32.7-5.6-10.8-15.3-19-27-22.7L32.6 34.8c3.3-3.8 8.1-6.3 13.6-6.3"
      />
      <path
        fill="#fbbc04"
        d="M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3l-28 33.3c4.8 10.6 12.8 19.2 21 29.9l34.1-40.5c-3.3 3.9-8.1 6.3-13.5 6.3"
      />
      <path
        fill="#34a853"
        d="M59.1 109.2c15.4-24.1 33.3-35 33.3-63 0-7.7-1.9-14.9-5.2-21.3L25.6 98c2.6 3.4 5.3 7.3 7.9 11.3 9.4 14.5 6.8 23.1 12.8 23.1s3.4-8.7 12.8-23.2"
      />
    </svg>
  );
}

// Multi-color Official Gmail Logo SVG
function GmailIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M158 391v-142l-82-63V361q0 30 30 30z" />
      <path fill="#EA4335" d="M154 248l102 77l102-77v-98l-102 77l-102-77z" />
      <path fill="#34A853" d="M354 391v-142l82-63V361q0 30-30 30z" />
      <path fill="#C5221F" d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26z" />
      <path fill="#FBBC04" d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26z" />
    </svg>
  );
}

export function ContactSection() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <section
      className="landing-panel cv-auto relative overflow-hidden py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white via-emerald-50/20 to-white"
      id="contact"
    >
      {/* Background Decorative Dashed Green Curves matching mockup */}
      <svg
        className="pointer-events-none absolute inset-0 size-full z-0 overflow-visible opacity-60 select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M-100 700 C150 740, 380 720, 600 640 C850 550, 1100 480, 1500 350"
          stroke="#5fc94a"
          strokeWidth="1.8"
          strokeDasharray="7 7"
        />
        <path
          d="M1000 750 C1200 680, 1380 580, 1600 520"
          stroke="#5fc94a"
          strokeWidth="1.8"
          strokeDasharray="7 7"
        />
      </svg>

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-12 -left-12 size-96 bg-gradient-to-br from-[#5fc94a]/15 via-emerald-300/10 to-transparent blur-3xl -z-10 rounded-full" />
      <div className="pointer-events-none absolute -bottom-20 right-0 size-96 bg-gradient-to-tl from-[#5fc94a]/12 to-transparent blur-3xl -z-10 rounded-full" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. SECTION HEADER: Siap Memulai Proyek Anda */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-14">
          <SplitText
            as="h2"
            className="font-[family-name:var(--font-plus-jakarta),sans-serif] text-2xl sm:text-3xl lg:text-[40px] font-bold tracking-[-0.025em] text-slate-900 leading-tight"
            segments={[
              { text: isEn ? "Ready to Start Your " : "Siap Memulai Proyek " },
              {
                text: isEn ? "Project" : "Anda",
                className: "text-[#5fc94a] font-bold",
              },
            ]}
          />
          <Reveal y={14} delay={100}>
            <p className="mt-3 text-xs sm:text-sm md:text-[15px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {isEn
                ? "Fill out the form below and our team will get back to you shortly for a free consultation and discuss your business system or website needs."
                : "Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda untuk konsultasi gratis dan mendiskusikan kebutuhan sistem atau website bisnis Anda."}
            </p>
          </Reveal>
        </div>

        {/* 2. MAIN LAYOUT: Left Column (Top Featured Card + 6 Bento Cards) & Right Column (2 Office Maps) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ================= SISI KIRI (lg:col-span-7) ================= */}
          <div className="lg:col-span-7 flex flex-col gap-4 text-left">
            {/* TOP CARD: Diskusi Langsung dengan Tim Ahli */}
            <Reveal y={18}>
              <div className="group relative rounded-[22px] sm:rounded-[26px] border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#5fc94a]/50 hover:shadow-[0_12px_32px_rgba(95,201,74,0.10)] transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6">
                  {/* Left: HD Transparent Illustration */}
                  <div className="relative w-28 sm:w-36 md:w-40 shrink-0 flex items-center justify-center">
                    <Image
                      src="/images/contact/cs-consultant.webp"
                      alt={isEn ? "BidTech Expert Consultation" : "Konsultasi Tim Ahli BidTech"}
                      width={200}
                      height={170}
                      priority
                      className="w-full h-auto object-contain select-none transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Right: Title, Subtitle & Full-width WhatsApp CTA Button */}
                  <div className="min-w-0 flex-1 flex flex-col justify-center text-left">
                    <h3 className="font-[family-name:var(--font-plus-jakarta),sans-serif] text-base sm:text-lg md:text-xl font-bold text-slate-900 leading-snug">
                      {isEn ? "Direct Discussion with Expert Team" : "Diskusi Langsung dengan Tim Ahli"}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                      {isEn
                        ? "Get technology solution recommendations & timeline estimates with zero upfront commitment."
                        : "Dapatkan rekomendasi solusi teknologi & estimasi timeline tanpa biaya komitmen awal."}
                    </p>

                    {/* WhatsApp CTA Button */}
                    <a
                      href="https://wa.me/628217601455?text=Halo%20BidTech,%20saya%20ingin%20berdiskusi%20langsung%20dengan%20tim%20ahli%20mengenai%20proyek%20digital."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3.5 sm:mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-[#5fc94a] hover:bg-[#52b33f] active:scale-[0.99] text-white px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(95,201,74,0.30)] hover:shadow-[0_6px_22px_rgba(95,201,74,0.40)] transition-all cursor-pointer group/btn"
                    >
                      <FaWhatsapp className="size-4 sm:size-4.5" />
                      <span>{isEn ? "Contact WhatsApp Now" : "Hubungi WhatsApp Sekarang"}</span>
                      <span className="transition-transform duration-200 group-hover/btn:translate-x-1 font-bold">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Sub-label: SALURAN KOMUNIKASI RESMI */}
            <Reveal y={14} delay={50}>
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.08em] text-slate-400 mt-2 mb-1 px-1">
                {isEn
                  ? "OFFICIAL COMMUNICATION CHANNELS"
                  : "SALURAN KOMUNIKASI RESMI"}
              </p>
            </Reveal>

            {/* 6 BENTO CARDS: Grid 2 Kolom Sesuai Desain */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {/* Bento 1: WhatsApp */}
              <Reveal y={16} delay={70}>
                <a
                  href="https://wa.me/628217601455?text=Halo%20BidTech,%20saya%20ingin%20berkonsultasi%20mengenai%20proyek%20digital."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#25D366]/50 hover:shadow-[0_8px_24px_rgba(37,211,102,0.10)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-xs">
                        <FaWhatsapp className="size-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          WhatsApp
                        </h4>
                        <div className="mt-1 space-y-0.5 text-xs">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-slate-700">0821-7601-455</span>
                            <span className="text-slate-400 text-[11px]">{isEn ? "Sales Team 1" : "Tim Sales 1"}</span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-slate-700">0819-3018-9008</span>
                            <span className="text-slate-400 text-[11px]">{isEn ? "Sales Team 2" : "Tim Sales 2"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Reveal>

              {/* Bento 2: LinkedIn */}
              <Reveal y={16} delay={100}>
                <a
                  href="https://www.linkedin.com/company/pt-solusi-bisnis-jalanin-aja-dulu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#0A66C2]/50 hover:shadow-[0_8px_24px_rgba(10,102,194,0.10)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0A66C2] text-white shadow-xs">
                        <FaLinkedinIn className="size-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          LinkedIn
                        </h4>
                        <p className="mt-0.5 text-xs font-semibold text-slate-700">
                          Bidtech
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400 truncate group-hover:text-[#0A66C2] transition-colors">
                          https://www.linkedin.com/company/pt-solusi-bisnis-jalanin-aja-dulu/
                        </p>
                      </div>
                    </div>
                  </div>
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
                  <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-pink-300 hover:shadow-[0_8px_24px_rgba(225,29,72,0.10)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-xs">
                        <FaInstagram className="size-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          Instagram
                        </h4>
                        <p className="mt-0.5 text-xs font-semibold text-slate-700">
                          @bidtechsolutions
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400 truncate group-hover:text-pink-600 transition-colors">
                          https://www.instagram.com/bidtechsolutions/
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </Reveal>

              {/* Bento 4: TikTok */}
              <Reveal y={16} delay={160}>
                <a
                  href="https://www.tiktok.com/@bidtech_indonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-slate-400 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-black text-white shadow-xs">
                        <FaTiktok className="size-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          TikTok
                        </h4>
                        <p className="mt-0.5 text-xs font-semibold text-slate-700">
                          @bidtech_indonesia
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400 truncate group-hover:text-slate-900 transition-colors">
                          https://www.tiktok.com/@bidtech_indonesia
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </Reveal>

              {/* Bento 5: Facebook */}
              <Reveal y={16} delay={190}>
                <a
                  href="https://www.facebook.com/profile.php?id=61593083046844"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#1877F2]/50 hover:shadow-[0_8px_24px_rgba(24,119,242,0.10)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1877F2] text-white shadow-xs">
                        <FaFacebookF className="size-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          Facebook
                        </h4>
                        <p className="mt-0.5 text-xs font-semibold text-slate-700">
                          Bidtech Solutions
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400 truncate group-hover:text-[#1877F2] transition-colors">
                          https://www.facebook.com/profile.php?id=61593083046844
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </Reveal>

              {/* Bento 6: Gmail */}
              <Reveal y={16} delay={220}>
                <a
                  href="mailto:cs@bidtech.co.id"
                  className="block group h-full"
                >
                  <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-red-300 hover:shadow-[0_8px_24px_rgba(234,67,53,0.10)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200/90 shadow-xs">
                        <GmailIcon className="size-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          Gmail
                        </h4>
                        <p className="mt-0.5 text-xs font-semibold text-slate-700">
                          cs@bidtech.co.id
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400 truncate">
                          {isEn ? "Corporate Proposal & RFP" : "Proposal & RFP Korporat"}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </Reveal>
            </div>
          </div>

          {/* ================= SISI KANAN (lg:col-span-5): 2 Office Map Cards ================= */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 text-left">
            {/* Card 1: Kantor Jakarta */}
            <Reveal y={18} delay={80}>
              <div className="group rounded-[22px] sm:rounded-[26px] border border-slate-200/80 bg-white p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#5fc94a]/50 hover:shadow-[0_12px_32px_rgba(95,201,74,0.10)] transition-all duration-300">
                <div className="flex items-start gap-3 sm:gap-3.5 mb-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200/90 shadow-xs">
                    <GoogleMapsIcon className="size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {isEn ? "Jakarta Office" : "Kantor Jakarta"}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                      Wisma Bumiputera, Jl. Jend Sudirman Kav 75 Setiabudi No.02 Lantai 18, RT.003/RW.3, Kuningan, Jakarta Selatan 12910
                    </p>
                  </div>
                </div>

                {/* Google Maps Interactive Embed (Clean, tanpa tombol tambahan di atas peta) */}
                <div className="relative h-40 sm:h-44 md:h-48 w-full overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 shadow-inner group/map">
                  <iframe
                    title={isEn ? "Jakarta Office Map" : "Peta Lokasi Kantor Jakarta"}
                    src="https://maps.google.com/maps?width=100%25&height=100%25&hl=id&q=Wisma+Bumiputera+Jl+Jend+Sudirman+Kav+75+Setiabudi+Jakarta+Selatan&t=&z=15&ie=UTF8&output=embed"
                    className="w-full h-[calc(100%+260px)] -mt-[160px] -mb-[100px] border-0 select-none pointer-events-auto"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Tombol Buka Google Maps - pojok kanan bawah */}
                  <a
                    href="https://maps.google.com/?q=Wisma+Bumiputera+Jl+Jend+Sudirman+Kav+75+Setiabudi+Jakarta+Selatan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2 right-2 z-10 inline-flex items-center justify-center rounded-md bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-md border border-slate-200/80 transition-all hover:bg-slate-50 hover:shadow-lg active:scale-[0.97]"
                  >
                    Buka Google Maps
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Card 2: Kantor Batam HQ */}
            <Reveal y={18} delay={160}>
              <div className="group rounded-[22px] sm:rounded-[26px] border border-slate-200/80 bg-white p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#5fc94a]/50 hover:shadow-[0_12px_32px_rgba(95,201,74,0.10)] transition-all duration-300">
                <div className="flex items-start gap-3 sm:gap-3.5 mb-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200/90 shadow-xs">
                    <GoogleMapsIcon className="size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {isEn ? "Batam Office" : "Kantor Batam"}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                      King Business Centre, Blok A5 No.3, Kel. Belian, Kec. Batam Kota, Batam, 29464
                    </p>
                  </div>
                </div>

                {/* Google Maps Interactive Embed (Clean, tanpa tombol tambahan di atas peta) */}
                <div className="relative h-40 sm:h-44 md:h-48 w-full overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 shadow-inner group/map">
                  <iframe
                    title={isEn ? "BidTech Batam Office Map" : "Peta Lokasi Kantor Batam"}
                    src="https://maps.google.com/maps?width=100%25&height=100%25&hl=id&q=bidtech&t=&z=14&ie=UTF8&output=embed"
                    className="w-full h-[calc(100%+320px)] -mt-[220px] -mb-[100px] border-0 select-none pointer-events-auto"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Tombol Buka Google Maps - pojok kanan bawah */}
                  <a
                    href="https://maps.google.com/?q=King+Business+Centre+Blok+A5+No.3+Belian+Batam+Kota+Batam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2 right-2 z-10 inline-flex items-center justify-center rounded-md bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-md border border-slate-200/80 transition-all hover:bg-slate-50 hover:shadow-lg active:scale-[0.97]"
                  >
                    Buka Google Maps
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
