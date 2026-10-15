"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Copy, ChevronDown, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { UniversalCta } from "@/components/shared/universal-cta";

export default function HubungiKamiPage() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("bidtech@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const message = [
      `Halo BidTech, saya *${name.trim() || "-"}* ${company.trim() ? `dari *${company.trim()}*` : ""}.`,
      `• *Email:* ${email.trim() || "-"}`,
      `• *Nomor WhatsApp:* ${whatsapp.trim() || "-"}`,
      `• *Layanan:* ${service || "-"}`,
      `• *Deskripsi Proyek:*`,
      `${description.trim() || "-"}`,
    ].join("\n");

    window.open(
      `https://wa.me/628217601455?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO HEADER */}
      <section className="relative pt-10 sm:pt-14 pb-8 sm:pb-12 overflow-hidden">
        {/* Soft Ambient Background Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[420px] w-full max-w-4xl rounded-full bg-[radial-gradient(ellipse_at_top,rgba(163,230,53,0.18)_0%,rgba(187,247,208,0.1)_45%,transparent_70%)] filter blur-3xl -z-10"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal y={16}>
            <h1 className="font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-slate-900 leading-tight">
              Siap Memulai Proyek <span className="text-[#3eb027]">Anda</span>
            </h1>
            <p className="mt-3.5 mx-auto max-w-2xl text-xs sm:text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda untuk konsultasi gratis dan mendiskusikan kebutuhan sistem atau website bisnis Anda.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. MAIN 2-COLUMN CONTACT SECTION: LEFT 4 CARDS & RIGHT FORM */}
      <section className="relative pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* KOLOM KIRI: 4 INFORMASI KONTAK (WhatsApp, Email, Jakarta, Batam) */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              
              {/* Card 1: Konsultasi Cepat WhatsApp */}
              <Reveal y={14}>
                <div className="rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:border-slate-300 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#f0f9ea] border border-[#d6f2c9] text-[#45a02e]">
                      <Mail className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        Konsultasi Cepat WhatsApp
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        0821-7601-455
                      </p>
                      <a
                        href="https://wa.me/628217601455?text=Halo%20BidTech,%20saya%20ingin%20konsultasi%20pembuatan%20website%20dan%20aplikasi"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#45a02e] hover:text-[#388e26] transition-colors group"
                      >
                        <span>Chat WhatsApp Sekarang</span>
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Card 2: Email Resmi */}
              <Reveal y={14} delay={50}>
                <div className="rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:border-slate-300 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#f0f9ea] border border-[#d6f2c9] text-[#45a02e]">
                      <Mail className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        Email Resmi
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                        Kirimkan dokumen TOR / RFP atau pertanyaan teknis
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <a
                          href="mailto:bidtech@gmail.com"
                          className="text-xs font-bold text-[#45a02e] hover:underline"
                        >
                          bidtech@gmail.com
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          title="Salin email"
                          className="inline-flex items-center justify-center p-1 text-slate-400 hover:text-[#45a02e] transition-colors cursor-pointer"
                        >
                          {copied ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#45a02e]">
                              <Check className="size-3.5" />
                              <span className="text-[10px]">Tersalin</span>
                            </span>
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Card 3: Kantor Jakarta */}
              <Reveal y={14} delay={100}>
                <div className="rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:border-slate-300 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#f0f9ea] border border-[#d6f2c9] text-[#45a02e]">
                      <MapPin className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        Kantor Jakarta
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                        Wisma Bumiputera, Jl. Jend Sudirman Kav 75 Setiabudi No.02 Lantai 18, RT.003/RW.3, Kuningan, Jakarta Selatan 12910
                      </p>
                    </div>
                  </div>

                  {/* Satellite Map Preview with Red Marker */}
                  <div className="relative mt-4 h-36 sm:h-40 w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-100">
                    <Image
                      src="/images/map-jakarta.jpg"
                      alt="Peta Lokasi Kantor Jakarta"
                      fill
                      sizes="(min-width: 1024px) 450px, 90vw"
                      className="object-cover"
                    />
                    {/* Red Location Pin in Center */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="relative flex items-center justify-center">
                        <span className="absolute size-6 rounded-full bg-red-500/30 animate-ping" />
                        <span className="size-4 rounded-full bg-red-600 border-2 border-white shadow-md flex items-center justify-center" />
                      </div>
                    </div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=-6.207275%2C106.822519"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-2.5 bottom-2.5 z-10 inline-flex items-center gap-1.5 rounded-lg bg-white/95 backdrop-blur-xs border border-slate-200/90 px-3 py-1.5 text-[11px] font-semibold text-slate-800 shadow-md hover:bg-white hover:text-[#45a02e] transition-all cursor-pointer"
                    >
                      <span>Buka Google Maps</span>
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Card 4: Kantor Batam */}
              <Reveal y={14} delay={150}>
                <div className="rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:border-slate-300 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#f0f9ea] border border-[#d6f2c9] text-[#45a02e]">
                      <MapPin className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        Kantor Batam
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                        King Business Centre, Blok A5 No.3, Kel. Belian, Kec. Batam Kota, Batam, 29494
                      </p>
                    </div>
                  </div>

                  {/* Satellite Map Preview with Red Marker */}
                  <div className="relative mt-4 h-36 sm:h-40 w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-100">
                    <Image
                      src="/images/map-batam.jpg"
                      alt="Peta Lokasi Kantor Batam"
                      fill
                      sizes="(min-width: 1024px) 450px, 90vw"
                      className="object-cover"
                    />
                    {/* Red Location Pin in Center */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="relative flex items-center justify-center">
                        <span className="absolute size-6 rounded-full bg-red-500/30 animate-ping" />
                        <span className="size-4 rounded-full bg-red-600 border-2 border-white shadow-md flex items-center justify-center" />
                      </div>
                    </div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=1.1058157731502605%2C104.07543166924557"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-2.5 bottom-2.5 z-10 inline-flex items-center gap-1.5 rounded-lg bg-white/95 backdrop-blur-xs border border-slate-200/90 px-3 py-1.5 text-[11px] font-semibold text-slate-800 shadow-md hover:bg-white hover:text-[#45a02e] transition-all cursor-pointer"
                    >
                      <span>Buka Google Maps</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* KOLOM KANAN: FORM MULAI KONSULTASI GRATIS */}
            <div className="lg:col-span-7">
              <Reveal y={16}>
                <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 sm:p-9 lg:p-10 shadow-[0_10px_36px_rgba(0,0,0,0.03)]">
                  
                  {/* Form Header */}
                  <div>
                    <h2 className="font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight leading-snug">
                      Mulai Konsultasi Gratis
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                      Isi formulir berikut dan kami akan langsung menyambungkan Anda ke WhatsApp representative resmi kami untuk pembahasan mendalam.
                    </p>
                  </div>

                  <form className="mt-7 sm:mt-8 space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                    
                    {/* Row 1: Nama Lengkap & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5" htmlFor="field-name">
                          Nama Lengkap
                        </label>
                        <input
                          id="field-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                          placeholder="Contoh: Budi Pratama"
                          className="w-full rounded-xl border border-slate-200/90 bg-[#fbfcfd] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#45a02e] focus:outline-hidden focus:ring-3 focus:ring-[#45a02e]/10 transition-all shadow-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5" htmlFor="field-email">
                          Email
                        </label>
                        <input
                          id="field-email"
                          type="email"
                          value={email}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                          placeholder="budi@perusahaan.com"
                          className="w-full rounded-xl border border-slate-200/90 bg-[#fbfcfd] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#45a02e] focus:outline-hidden focus:ring-3 focus:ring-[#45a02e]/10 transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Row 2: Nomor Whatsapp & Nama Perusahaan */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5" htmlFor="field-whatsapp">
                          Nomor Whatsapp
                        </label>
                        <input
                          id="field-whatsapp"
                          type="tel"
                          required
                          value={whatsapp}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setWhatsapp(e.target.value)}
                          placeholder="0812 - xxxx - xxxx"
                          className="w-full rounded-xl border border-slate-200/90 bg-[#fbfcfd] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#45a02e] focus:outline-hidden focus:ring-3 focus:ring-[#45a02e]/10 transition-all shadow-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5" htmlFor="field-company">
                          Nama Perusahaan
                        </label>
                        <input
                          id="field-company"
                          type="text"
                          value={company}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
                          placeholder="Nama Bisnis anda"
                          className="w-full rounded-xl border border-slate-200/90 bg-[#fbfcfd] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#45a02e] focus:outline-hidden focus:ring-3 focus:ring-[#45a02e]/10 transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Row 3: Pilih Layanan */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5" htmlFor="field-service">
                        Pilih Layanan
                      </label>
                      <div className="relative">
                        <select
                          id="field-service"
                          value={service}
                          onChange={(e: ChangeEvent<HTMLSelectElement>) => setService(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-slate-200/90 bg-[#fbfcfd] px-4 py-3 pr-10 text-sm text-slate-900 focus:bg-white focus:border-[#45a02e] focus:outline-hidden focus:ring-3 focus:ring-[#45a02e]/10 transition-all shadow-xs cursor-pointer"
                        >
                          <option value="">Pilih jenis layanan yang dibutuhkan</option>
                          <option value="Website Company Profile">Website Company Profile</option>
                          <option value="Template Website Siap Pakai">Template Website Siap Pakai</option>
                          <option value="Aplikasi Mobile Android & iOS">Aplikasi Mobile Android &amp; iOS</option>
                          <option value="Custom Software / ERP / CRM">Custom Software / ERP / CRM</option>
                          <option value="Toko Online / E-Commerce">Toko Online / E-Commerce</option>
                          <option value="Konsultasi IT & Maintenance">Konsultasi IT &amp; Maintenance</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      </div>
                    </div>

                    {/* Row 4: Deskripsi Proyek */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5" htmlFor="field-desc">
                        Deskripsi Proyek
                      </label>
                      <textarea
                        id="field-desc"
                        rows={4}
                        value={description}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                        placeholder="Jelaskan jenis bisnis, target pengguna, referensi website/sistem yang disukai, atau estimasi deadline yang diinginkan..."
                        className="w-full resize-none rounded-xl border border-slate-200/90 bg-[#fbfcfd] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#45a02e] focus:outline-hidden focus:ring-3 focus:ring-[#45a02e]/10 transition-all shadow-xs leading-relaxed"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full rounded-xl bg-[#5bb82e] hover:bg-[#4ea625] py-3.5 text-center text-sm sm:text-base font-bold text-white shadow-[0_8px_20px_rgba(91,184,46,0.28)] transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                      >
                        Kirim Pesan
                      </button>
                    </div>

                    {/* Microcopy note */}
                    <p className="pt-1 text-center text-[11px] text-slate-400 leading-normal">
                      Data Anda terlindungi privasinya. Kami tidak pernah membagikan kontak Anda kepada pihak ketiga.
                    </p>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BOTTOM CTA BANNER (Universal CTA) */}
      <UniversalCta className="pb-16 sm:pb-24" />
    </div>
  );
}
