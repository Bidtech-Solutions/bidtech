"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, FileText, CheckCircle2 } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/data/site";

export default function PrivacyPage() {
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
                  {isEn ? "Privacy Policy" : "Kebijakan Privasi"}
                </span>
              </div>

              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                  <ShieldCheck size={14} />
                  <span>{isEn ? "Legal & Data Protection" : "Perlindungan Data & Privasi"}</span>
                </span>

                <h1 className="mt-4 font-heading text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                  {isEn ? "Privacy Policy" : "Kebijakan Privasi"}
                </h1>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-white/70">
                  {isEn
                    ? `Last updated: October 2026. This Privacy Policy outlines how ${siteConfig.brand.name} collects, protects, and manages your personal information across all club facilities and digital platforms.`
                    : `Terakhir diperbarui: Oktober 2026. Kebijakan Privasi ini menjelaskan bagaimana ${siteConfig.brand.name} mengumpulkan, melindungi, dan mengelola data pribadi Anda di seluruh fasilitas gym dan platform digital kami.`}
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
                {/* 1. Pengumpulan Data */}
                <div>
                  <h2 className="flex items-center gap-3 font-heading text-xl font-bold uppercase tracking-tight text-[#0b0b0b] sm:text-2xl">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-primary)]">
                      01
                    </span>
                    {isEn ? "Information We Collect" : "Informasi yang Kami Kumpulkan"}
                  </h2>
                  <p className="mt-3 text-black/70">
                    {isEn
                      ? `When you register for a membership, book personal training sessions, or claim a trial pass at ${siteConfig.brand.name}, we may collect personal details including:`
                      : `Saat Anda mendaftar keanggotaan, memesan sesi pelatih privat, atau mengklaim uji coba gratis di ${siteConfig.brand.name}, kami dapat mengumpulkan informasi pribadi seperti:`}
                  </p>
                  <ul className="mt-3 space-y-2 text-xs sm:text-sm text-black/75">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[var(--color-primary)] shrink-0" />
                      <span>{isEn ? "Full name, contact phone number, and email address." : "Nama lengkap, nomor telepon (WhatsApp), dan alamat email."}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[var(--color-primary)] shrink-0" />
                      <span>{isEn ? "Fitness background, health goals, and medical clearances (for safety during training)." : "Data kebugaran fisik, tujuan latihan, dan riwayat kesehatan (untuk keselamatan sesi latihan)."}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[var(--color-primary)] shrink-0" />
                      <span>{isEn ? "Billing information and transaction history." : "Data pembayaran keanggotaan dan riwayat transaksi."}</span>
                    </li>
                  </ul>
                </div>

                {/* 2. Penggunaan Data */}
                <div>
                  <h2 className="flex items-center gap-3 font-heading text-xl font-bold uppercase tracking-tight text-[#0b0b0b] sm:text-2xl">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-primary)]">
                      02
                    </span>
                    {isEn ? "How We Use Your Data" : "Penggunaan Informasi"}
                  </h2>
                  <p className="mt-3 text-black/70">
                    {isEn
                      ? "Your information is used strictly to deliver an exceptional fitness experience, including club access verification, personal trainer scheduling, workout reminders, and billing receipts. We never sell or lease your personal information to third parties."
                      : "Data Anda digunakan semata-mata untuk memberikan pengalaman kebugaran terbaik, meliputi verifikasi akses gym, penjadwalan sesi pelatih, konfirmasi keanggotaan, dan bukti transaksi. Kami tidak pernah menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga manapun."}
                  </p>
                </div>

                {/* 3. Keamanan Data */}
                <div>
                  <h2 className="flex items-center gap-3 font-heading text-xl font-bold uppercase tracking-tight text-[#0b0b0b] sm:text-2xl">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-primary)]">
                      03
                    </span>
                    {isEn ? "Data Security & Retention" : "Keamanan dan Penyimpanan Data"}
                  </h2>
                  <p className="mt-3 text-black/70">
                    {isEn
                      ? "We implement industry-grade encryption, secure databases, and rigorous access permissions to safeguard your data against unauthorized access, alteration, or disclosure."
                      : "Kami menerapkan enkripsi standar industri, server database yang aman, dan protokol otorisasi ketat guna melindungi data Anda dari akses yang tidak sah atau kebocoran informasi."}
                  </p>
                </div>

                {/* 4. Hak Member */}
                <div>
                  <h2 className="flex items-center gap-3 font-heading text-xl font-bold uppercase tracking-tight text-[#0b0b0b] sm:text-2xl">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-primary)]">
                      04
                    </span>
                    {isEn ? "Your Rights & Contact" : "Hak Anda & Hubungi Kami"}
                  </h2>
                  <p className="mt-3 text-black/70">
                    {isEn
                      ? `You have the right to review, update, or request the deletion of your personal data at any time. For privacy inquiries, contact our data administrator at ${siteConfig.contact.email} or visit our club reception desk.`
                      : `Anda berhak meninjau, memperbarui, atau meminta penghapusan data pribadi Anda kapan saja. Untuk pertanyaan seputar privasi, hubungi administrator kami di ${siteConfig.contact.email} atau langsung di meja resepsionis klub.`}
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
                  href="/terms"
                  className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] hover:underline"
                >
                  <span>{isEn ? "Read Terms of Service →" : "Baca Syarat & Ketentuan →"}</span>
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
