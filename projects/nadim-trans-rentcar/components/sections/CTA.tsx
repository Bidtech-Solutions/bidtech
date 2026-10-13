"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getLocalizedPath, type Locale } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/data";

export default function CTA() {
  const locale = useLocale() as Locale;
  const isId = locale === "id";

  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    isId
      ? "Halo NadimTrans RentCar, saya ingin konsultasi dan pesan sewa mobil di Batam."
      : "Hello NadimTrans RentCar, I would like to inquire and book a rental car in Batam."
  )}`;

  return (
    <section className="relative w-full py-14 sm:py-20 md:py-24 bg-slate-950 text-white overflow-hidden border-t border-amber-500/20">
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-transparent blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[32px] border border-amber-400/30 bg-gradient-to-br from-slate-900/90 via-slate-950 to-amber-950/40 p-7 sm:p-12 md:p-16 shadow-2xl shadow-black/60">
          
          <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">
            {/* Tagline Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <span>★</span>
              <span>{isId ? "RESERVASI CEPAT & TERPERCAYA DI BATAM" : "FAST & TRUSTED RESERVATIONS IN BATAM"}</span>
              <span>★</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase font-bebas text-white">
              {isId ? (
                <>
                  LIBURAN, KERJAAN, dan SEMUA URUSAN,{" "}
                  <span className="text-amber-400 drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)]">
                    INGAT NADIMTRANS
                  </span>
                </>
              ) : (
                <>
                  HOLIDAYS, WORK, AND ALL YOUR NEEDS,{" "}
                  <span className="text-amber-400 drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)]">
                    REMEMBER NADIMTRANS
                  </span>
                </>
              )}
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {isId
                ? "Konsultasikan kebutuhan transportasi Anda di Batam bersama NadimTrans RentCar. Unit terawat, AC dingin, siap antar jemput Bandara Hang Nadim dan Pelabuhan Ferry."
                : "Consult your transportation needs in Batam with NadimTrans RentCar. Well-maintained fleet, cool AC, ready for Hang Nadim Airport and Ferry Terminal pick-up."}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              {/* WhatsApp Button (CTA Utama) */}
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white px-7 py-3.5 text-xs sm:text-sm font-black shadow-lg shadow-green-500/25 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer uppercase tracking-wider"
              >
                <svg className="size-4 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.394-10.416c-5.523 0-10 4.477-10 10 0 1.766.458 3.424 1.258 4.872l-1.336 4.887 5.011-1.314c1.401.764 3.003 1.198 4.707 1.198 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10z" />
                </svg>
                <span>{isId ? "Chat WhatsApp Sekarang" : "Chat on WhatsApp Now"}</span>
              </a>

              {/* Secondary Fleet Button */}
              <Link
                href={getLocalizedPath(locale, "/kendaraan")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/40 bg-white/10 hover:bg-white/20 text-amber-200 hover:text-white px-7 py-3.5 text-xs sm:text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider"
              >
                <span>{isId ? "Lihat Semua Armada" : "View All Fleet"}</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* Checklist Benefits */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-300">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="size-4 text-amber-400 shrink-0" />
                <span>{isId ? "Respon Cepat < 15 Menit" : "Fast Response < 15 Min"}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="size-4 text-amber-400 shrink-0" />
                <span>{isId ? "Antar Jemput Bandara & Ferry" : "Airport & Ferry Transfers"}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="size-4 text-amber-400 shrink-0" />
                <span>{isId ? "Lepas Kunci / Dengan Supir" : "Self-Drive / With Driver"}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}