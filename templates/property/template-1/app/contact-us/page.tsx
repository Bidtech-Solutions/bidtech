"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SubpageHero from "@/components/ui/SubpageHero";
import ContactBanner from "@/components/sections/ContactBanner";
import Toast from "@/components/ui/Toast";
import { GLOBAL_OFFICES } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function ContactUsPage() {
  const { lang } = useLanguage();
  const { isLight } = useTheme();
  const [formSent, setFormSent] = useState<boolean>(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jurisdiction: "Dubai",
    nature: "Acquisition",
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

  const faqs = [
    {
      q:
        lang === "en"
          ? "What is the protocol for confidential off-market acquisitions?"
          : "Bagaimana protokol akuisisi privat (off-market)?",
      a:
        lang === "en"
          ? "Prospective principals or their authorized family office representatives execute a mutual Non-Disclosure Agreement (NDA). Upon verification of buyer qualifications, full architectural dossiers, physical survey files, and private viewing schedules are released."
          : "Calon pembeli atau perwakilan family office resmi menandatangani Perjanjian Kerahasiaan (NDA). Setelah verifikasi kelayakan, dokumen arsitektural lengkap, berkas survei lahan, dan jadwal tur inspeksi privat akan diberikan.",
    },
    {
      q:
        lang === "en"
          ? "Can international non-residents purchase properties in Dubai, Switzerland, and Indonesia?"
          : "Dapatkah warga negara asing membeli properti di Dubai, Swiss, dan Indonesia?",
      a:
        lang === "en"
          ? "Yes. In Dubai, all signature properties lie within designated freehold zones granting UAE Golden Visas. In Switzerland, our alpine properties hold Lex Koller holiday home permits or private corporate structuring. In Indonesia, foreign ownership is legally facilitated via Hak Pakai on Freehold titles under the Job Creation Law."
          : "Bisa. Di Dubai, seluruh properti berada di zona hak milik bebas (freehold) yang berhak atas UAE Golden Visa. Di Swiss, properti pegunungan memiliki izin Lex Koller atau struktur korporasi privat. Di Indonesia, kepemilikan WNA diakomodasi resmi melalui Hak Pakai atas SHM.",
    },
    {
      q:
        lang === "en"
          ? "Can a commissioned residence be custom-altered by the atelier?"
          : "Dapatkah tata ruang hunian dimodifikasi khusus oleh atelier?",
      a:
        lang === "en"
          ? "Denn House maintains a dedicated bespoke alterations wing. Our lead architects accommodate custom art gallery expansions, underground vault reconfiguration, and private aviation moorings prior to final handover."
          : "Denn House memiliki divisi kustomisasi khusus. Arsitek utama kami siap mengakomodasi perluasan galeri seni, konfigurasi ulang brankas bawah tanah, maupun dermaga kapal sebelum serah terima.",
    },
    {
      q:
        lang === "en"
          ? "How are funds and transactions secured across international borders?"
          : "Bagaimana keamanan transaksi pembayaran lintas negara?",
      a:
        lang === "en"
          ? "Transactions proceed through tier-one Swiss private banks and government land registries (Dubai Land Department, Swiss Notary Offices, and Indonesian BPN) utilizing insured escrow accounts."
          : "Seluruh transaksi diproses melalui bank privat Swiss papan atas dan notaris resmi pemerintah (Dubai Land Department, Notaris Swiss, dan BPN) menggunakan rekening escrow bergaransi penuh.",
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setFormSent(true);
    setToast({
      isOpen: true,
      message:
        lang === "en"
          ? "Confidential consultation request received."
          : "Permintaan konsultasi rahasia berhasil diajukan.",
      subMessage:
        lang === "en"
          ? "Our Private Client Director will contact your office within 2 hours."
          : "Direktur Klien Privat kami akan menghubungi kantor Anda dalam waktu 2 jam.",
    });
  };

  const whatsappUrl = `https://wa.me/628136764825?text=${encodeURIComponent(
    lang === "en"
      ? "Hello Denn House Private Client Desk, I would like to schedule a confidential architectural consultation."
      : "Halo Meja Klien Privat Denn House, saya ingin menjadwalkan konsultasi arsitektur rahasia."
  )}`;

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 ${
        isLight ? "bg-architect-light text-neutral-900" : "bg-architect-dark text-white"
      }`}
    >
      <Navbar />

      <main className="w-full">
        {/* Subpage Hero (Matching Landing Page Hero Form) */}
        <SubpageHero
          darkImage="/images/contact-banner.webp"
          lightImage="/images/hero-light.webp"
          subheadEn="PRIVATE CLIENT DESK • DENN HOUSE"
          subheadId="MEJA KLIEN PRIVAT • DENN HOUSE"
          titlePrimary="DENN"
          titleSecondary="CONTACT"
          taglineEn="CONFIDENTIAL ADVISORY & BESPOKE INQUIRIES"
          taglineId="KONSULTASI RAHASIA & PERMINTAAN KHUSUS"
          descriptionEn="Connect directly with our senior partners and principal architects across Zurich, Dubai, Singapore, and Jakarta."
          descriptionId="Terhubung langsung dengan mitra senior dan prinsipal arsitek kami di Zurich, Dubai, Singapura, dan Jakarta."
          metricNumber="24/7"
          metricLabelEn="dedicated private client desk for confidential dossier transmission."
          metricLabelId="layanan meja klien privat untuk pengiriman berkas arsitektur rahasia."
          ctaTextEn="OPEN CONSULTATION FORM"
          ctaTextId="BUKA FORMULIR KONSULTASI"
          ctaHref="#consultation-desk"
          breadcrumbs={[
            {
              labelEn: "Contact Us",
              labelId: "Kontak Kami",
            },
          ]}
        />

        {/* Form & Direct Desk Channels Grid */}
        <section id="consultation-desk" className="py-16 sm:py-24 max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7">
              <div
                className={`p-8 sm:p-12 rounded-3xl border space-y-8 shadow-2xl transition-colors duration-500 ${
                  isLight
                    ? "bg-white border-neutral-200 text-neutral-900"
                    : "bg-[#111111] border-neutral-800 text-white"
                }`}
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-mono tracking-widest text-amber-500 uppercase">
                    {lang === "en" ? "DISCREET INTAKE" : "PENGAJUAN RAHASIA"}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                    {lang === "en" ? "Schedule Private Consultation" : "Jadwalkan Konsultasi Privat"}
                  </h2>
                  <p className={`text-xs ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                    {lang === "en"
                      ? "All transmissions are encrypted under Swiss banking data confidentiality standards."
                      : "Seluruh komunikasi dilindungi dengan standar kerahasiaan perbankan Swiss."}
                  </p>
                </div>

                {formSent ? (
                  <div className="p-8 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-500 space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-amber-500" />
                      <h3 className="text-lg font-bold uppercase">
                        {lang === "en" ? "Briefing Request Received" : "Permintaan Berhasil Diajukan"}
                      </h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isLight ? "text-neutral-800" : "text-neutral-300"}`}>
                      {lang === "en"
                        ? "Thank you. Our Private Client Desk has recorded your brief. An executive associate will reach out directly to your office within two business hours."
                        : "Terima kasih. Meja Klien Privat kami telah menerima permohonan Anda. Rekan eksekutif kami akan segera menghubungi kantor Anda dalam waktu dua jam kerja."}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className={`text-xs font-mono uppercase ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                          {lang === "en" ? "Full Legal Name *" : "Nama Lengkap *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={lang === "en" ? "e.g. Adrian Vance" : "cth. Adrian Vance"}
                          className={`w-full px-4 py-3 rounded-xl text-xs focus:outline-none focus:border-amber-400 transition-colors border ${
                            isLight
                              ? "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400"
                              : "bg-neutral-900 border-neutral-800 text-white placeholder-neutral-600"
                          }`}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className={`text-xs font-mono uppercase ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                          {lang === "en" ? "Confidential Email *" : "Email Rahasia *"}
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="client@familyoffice.com"
                          className={`w-full px-4 py-3 rounded-xl text-xs focus:outline-none focus:border-amber-400 transition-colors border ${
                            isLight
                              ? "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400"
                              : "bg-neutral-900 border-neutral-800 text-white placeholder-neutral-600"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className={`text-xs font-mono uppercase ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                          {lang === "en" ? "Phone / WhatsApp" : "Telepon / WhatsApp"}
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+62 ... / +41 ..."
                          className={`w-full px-4 py-3 rounded-xl text-xs focus:outline-none focus:border-amber-400 transition-colors border ${
                            isLight
                              ? "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400"
                              : "bg-neutral-900 border-neutral-800 text-white placeholder-neutral-600"
                          }`}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className={`text-xs font-mono uppercase ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                          {lang === "en" ? "Primary Territory" : "Wilayah Sasaran"}
                        </label>
                        <select
                          value={formData.jurisdiction}
                          onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl text-xs font-mono uppercase focus:outline-none focus:border-amber-400 transition-colors border ${
                            isLight
                              ? "bg-neutral-50 border-neutral-300 text-neutral-900"
                              : "bg-neutral-900 border-neutral-800 text-white"
                          }`}
                        >
                          <option value="Dubai">Dubai Hills / Palm Jumeirah</option>
                          <option value="Zurich">Zurich / Alpine Hills</option>
                          <option value="Singapore">Singapore Marina / Sentosa</option>
                          <option value="Jakarta">Jakarta SCBD / Menteng</option>
                          <option value="Batam">Batam Waterfront Enclaves</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className={`text-xs font-mono uppercase ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                        {lang === "en" ? "Briefing Details & Requirements" : "Keterangan Kebutuhan Spesifik"}
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={
                          lang === "en"
                            ? "Please detail property interests, preferred inspection dates, or bespoke architectural commission requirements..."
                            : "Jelaskan preferensi properti, rencana jadwal kunjungan, atau kebutuhan desain khusus..."
                        }
                        className={`w-full px-4 py-3 rounded-xl text-xs focus:outline-none focus:border-amber-400 transition-colors resize-none border ${
                          isLight
                            ? "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400"
                            : "bg-neutral-900 border-neutral-800 text-white placeholder-neutral-600"
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl active:scale-[0.99] cursor-pointer"
                    >
                      {lang === "en" ? "Submit Confidential Inquiry" : "Kirim Permintaan Konsultasi"}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right: Direct Concierge & Channels */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Priority Card */}
              <div
                className={`p-8 rounded-3xl border space-y-4 shadow-xl relative overflow-hidden transition-colors duration-500 ${
                  isLight
                    ? "bg-white border-neutral-200 text-neutral-900"
                    : "bg-[#141414] border-neutral-800 text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold uppercase tracking-tight">WhatsApp Priority Desk</h3>
                    <p className={`text-xs font-mono ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                      Direct partner connection
                    </p>
                  </div>
                </div>

                <p className={`text-xs leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                  {lang === "en"
                    ? "For instant verification, confidential dossier requests, or immediate viewing coordination with our Senior Directors."
                    : "Untuk verifikasi cepat, permintaan dokumen rahasia, atau koordinasi jadwal inspeksi langsung dengan Direktur Senior kami."}
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>+62 813-6764-825</span>
                </a>
              </div>

              {/* Telephone & Secure Mail */}
              <div
                className={`p-6 sm:p-8 rounded-3xl border space-y-6 transition-colors duration-500 ${
                  isLight
                    ? "bg-white border-neutral-200 text-neutral-900 shadow-sm"
                    : "bg-[#111111] border-neutral-800 text-white"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono uppercase text-neutral-400">TELEPHONE ENQUIRIES</div>
                    <a href="tel:+628136764825" className="text-sm font-bold font-mono hover:text-amber-500 transition-colors">
                      +62 813-6764-825
                    </a>
                    <div className={`text-xs ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>Mon – Sat • 09:00 – 21:00 UTC+7</div>
                  </div>
                </div>

                <div className={`border-t pt-4 flex items-start gap-4 ${isLight ? "border-neutral-100" : "border-neutral-800"}`}>
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono uppercase text-neutral-400">SECURE DISPATCH</div>
                    <a href="mailto:private@dennhouse.com" className="text-sm font-bold font-mono hover:text-amber-500 transition-colors">
                      private@dennhouse.com
                    </a>
                    <div className={`text-xs ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>Encrypted PGP Key Available</div>
                  </div>
                </div>

                <div className={`border-t pt-4 flex items-start gap-4 ${isLight ? "border-neutral-100" : "border-neutral-800"}`}>
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono uppercase text-neutral-400">RESPONSE STANDARD</div>
                    <div className="text-xs font-bold font-mono">Under 2 Hours Worldwide</div>
                    <div className={`text-xs ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>365 Days Client Coverage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Design Desks Grid */}
        <section className={`py-16 sm:py-20 border-t ${isLight ? "border-neutral-200 bg-neutral-50/60" : "border-neutral-900 bg-[#0E0E0E]/60"}`}>
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="space-y-2 mb-12">
              <span className="text-[11px] font-mono tracking-widest text-amber-500 uppercase">
                {lang === "en" ? "PHYSICAL ATELIERS" : "STUDIO FISIK"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                {lang === "en" ? "Global Client Lounges" : "Lounge Klien Global"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {GLOBAL_OFFICES.map((office, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl border space-y-4 shadow-lg transition-colors ${
                    isLight
                      ? "bg-white border-neutral-200"
                      : "bg-[#111111] border-neutral-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold uppercase">{office.city}</span>
                    <span className="text-amber-500 font-mono text-[10px] uppercase font-bold">
                      {lang === "en" ? "ACTIVE DESK" : "MEJA AKTIF"}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-amber-500">
                    {lang === "en" ? office.role : office.roleId}
                  </div>

                  <p className={`text-xs leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                    {office.address}
                  </p>

                  <div className={`pt-3 border-t text-[11px] font-mono space-y-1 ${isLight ? "border-neutral-100 text-neutral-500" : "border-neutral-800 text-neutral-400"}`}>
                    <div>{office.phone}</div>
                    <div className="text-amber-500 font-bold">{office.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Acquisition Protocols FAQ Accordion */}
        <section className={`py-16 sm:py-24 max-w-[1440px] mx-auto px-6 md:px-12 border-t ${isLight ? "border-neutral-200" : "border-neutral-900"}`}>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[11px] font-mono tracking-widest text-amber-500 uppercase">
                {lang === "en" ? "DISCRETION & COMPLIANCE" : "KERAHASIAAN & LEGALITAS"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                {lang === "en" ? "International Acquisition Protocols" : "Protokol Pembeli Internasional"}
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isLight
                        ? "bg-white border-neutral-200 shadow-sm"
                        : "bg-[#111111] border-neutral-800"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className={`text-sm font-bold uppercase tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-amber-500 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className={`px-5 pb-5 pt-1 text-xs leading-relaxed border-t ${isLight ? "border-neutral-100 text-neutral-700" : "border-neutral-800 text-neutral-300"}`}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Twilight Vision & Contact CTA Banner */}
        <ContactBanner />
      </main>

      <Footer />

      {/* Toast Alert */}
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        subMessage={toast.subMessage}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
