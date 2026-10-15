"use client";

import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2 } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/data/site";

export default function TermsPage() {
  const { locale } = useLanguage();
  const isEn = locale === "en";

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="min-h-screen bg-[#f4f2ee]">
        {/* Header Hero */}
        <section className="relative isolate overflow-hidden bg-[#0b0b0b] pb-14 pt-28 text-white sm:pb-20 sm:pt-36 md:pt-40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-48 bottom-0 size-[420px] rounded-full bg-[var(--color-primary)]/15 blur-[150px]"
          />

          <Container className="px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-primary)]"
                >
                  <ArrowLeft size={14} />
                  <span>{isEn ? "Back to Home" : "Kembali ke Beranda"}</span>
                </Link>
                <span className="text-white/20">/</span>
                <span className="text-[var(--color-primary)]">
                  {isEn ? "Terms of Service" : "Syarat & Ketentuan"}
                </span>
              </div>

              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                  <FileText size={14} />
                  <span>{isEn ? "Membership Agreement" : "Perjanjian Keanggotaan"}</span>
                </span>

                <h1 className="mt-4 font-heading text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                  {isEn ? "Terms of Service" : "Syarat & Ketentuan"}
                </h1>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-white/70">
                  {isEn
                    ? `Last updated: October 2026. Welcome to ${siteConfig.brand.name}. By accessing our facilities or using our digital services, you agree to comply with the rules and guidelines set forth below.`
                    : `Terakhir diperbarui: Oktober 2026. Selamat datang di ${siteConfig.brand.name}. Dengan mengakses fasilitas gym kami atau menggunakan layanan kami, Anda menyetujui ketentuan dan peraturan yang berlaku di bawah ini.`}
                </p>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Content Section */}
        <section className="section-space">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl rounded-2xl sm:rounded-[2rem] border border-black/10 bg-white p-6 sm:p-10 lg:p-14 shadow-sm">
              <div className="space-y-10 text-sm leading-relaxed text-black/80 sm:text-base">
                {/* 1. Aturan Keanggotaan */}
                <div>
                  <h2 className="flex items-center gap-3 font-heading text-xl font-bold uppercase tracking-tight text-[#0b0b0b] sm:text-2xl">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-primary)]">
                      01
                    </span>
                    {isEn ? "Membership & Club Access" : "Keanggotaan & Akses Fasilitas"}
                  </h2>
                  <p className="mt-3 text-black/70">
                    {isEn
                      ? `Membership passes are personal to the registered athlete and cannot be transferred without written club approval. Members must present their digital pass at reception before entry.`
                      : `Keanggotaan bersifat personal atas nama member terdaftar dan tidak dapat dipindahtangankan tanpa persetujuan tertulis manajemen. Member wajib memindai tiket/kartu digital di resepsionis sebelum memasuki area latihan.`}
                  </p>
                </div>

                {/* 2. Etika & Keselamatan Fasilitas */}
                <div>
                  <h2 className="flex items-center gap-3 font-heading text-xl font-bold uppercase tracking-tight text-[#0b0b0b] sm:text-2xl">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-primary)]">
                      02
                    </span>
                    {isEn ? "Gym Etiquette & Safety" : "Etika & Keselamatan Area Gym"}
                  </h2>
                  <p className="mt-3 text-black/70">
                    {isEn
                      ? "To preserve an elite training environment for all members, everyone must adhere to the following community standards:"
                      : "Guna menjaga kenyamanan dan standar latihan kelas dunia bagi seluruh member, peraturan berikut wajib dipatuhi:"}
                  </p>
                  <ul className="mt-3 space-y-2 text-xs sm:text-sm text-black/75">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[var(--color-primary)] shrink-0" />
                      <span>{isEn ? "Always re-rack dumbbells, barbell plates, and functional gear after completing your sets." : "Wajib mengembalikan dumble, plat beban, dan peralatan fungsional ke rak semula setelah selesai digunakan."}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[var(--color-primary)] shrink-0" />
                      <span>{isEn ? "Wipe down sweat and benches using provided sanitization wipes after training." : "Gunakan handuk pribadi dan seka peralatan setelah selesai digunakan dengan cairan sanitasi yang disediakan."}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[var(--color-primary)] shrink-0" />
                      <span>{isEn ? "Wear proper athletic footwear (closed-toe gym shoes) at all times." : "Wajib mengenakan pakaian olahraga yang pantas dan sepatu olahraga tertutup di seluruh area latihan."}</span>
                    </li>
                  </ul>
                </div>

                {/* 3. Sesi Personal Trainer */}
                <div>
                  <h2 className="flex items-center gap-3 font-heading text-xl font-bold uppercase tracking-tight text-[#0b0b0b] sm:text-2xl">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-primary)]">
                      03
                    </span>
                    {isEn ? "Personal Training & Cancellations" : "Sesi Pelatih Privat & Pembatalan"}
                  </h2>
                  <p className="mt-3 text-black/70">
                    {isEn
                      ? "Private coaching appointments must be scheduled in advance with your assigned coach. Cancellations require at least 12 hours notice to reschedule without forfeiting the session credit."
                      : "Sesi latihan privat (PT) dijadwalkan terlebih dahulu dengan pelatih bersangkutan. Pembatalan atau penyesuaian jadwal wajib dikonfirmasikan paling lambat 12 jam sebelum sesi dimulai agar sesi tidak hangus."}
                  </p>
                </div>

                {/* 4. Pembayaran & Pembekuan Keanggotaan */}
                <div>
                  <h2 className="flex items-center gap-3 font-heading text-xl font-bold uppercase tracking-tight text-[#0b0b0b] sm:text-2xl">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-primary)]">
                      04
                    </span>
                    {isEn ? "Billing & Freeze Options" : "Pembayaran & Pembekuan Membership"}
                  </h2>
                  <p className="mt-3 text-black/70">
                    {isEn
                      ? "Pro and Elite members enjoy complimentary membership freeze options for travel or medical recovery (up to 30 days per year). Membership fees are non-refundable once activated."
                      : "Paket membership Pro dan Elite mendapatkan fasilitas freeze keanggotaan sementara (hingga 30 hari/tahun) saat bepergian atau pemulihan medis. Biaya keanggotaan yang sudah aktif bersifat final dan tidak dapat di-refund."}
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-black/10 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0b0b0b] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-primary)]"
                >
                  <ArrowLeft size={14} />
                  <span>{isEn ? "Back to Homepage" : "Kembali ke Beranda"}</span>
                </Link>

                <Link
                  href="/privacy"
                  className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] hover:underline"
                >
                  <span>{isEn ? "Read Privacy Policy →" : "Baca Kebijakan Privasi →"}</span>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
