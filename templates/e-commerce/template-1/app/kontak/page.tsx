"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Store,
  CircleCheck,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTA from "@/app/cta";
import { useLanguage } from "@/context/LanguageContext";

// Custom SVG untuk Instagram
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WHATSAPP_NUMBER = "6281234567890";

export default function KontakPage() {
  const { language, t } = useLanguage();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = language === "en"
      ? `Hello KONTERKU,\n\nName: ${form.name}\nWhatsApp: ${form.phone}\n\nMessage:\n${form.message}\n\nI would like more information regarding KONTERKU products.`
      : `Halo KONTERKU,\n\nNama: ${form.name}\nNo. WhatsApp: ${form.phone}\n\nPesan:\n${form.message}\n\nSaya ingin mendapatkan informasi lebih lanjut mengenai produk KONTERKU.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-ink-900">
      <Navbar />

      <main className="flex-grow">
        {/* 1. FORM KONTAK */}
        <section id="form-kontak" className="bg-background pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold-600">
                  {t.contactPage.eyebrow}
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-ink-900">
                  {t.contactPage.titlePart1} <span className="block text-gold-600">{t.contactPage.titleHighlight}</span>
                </h1>
                <p className="mt-4 max-w-md text-base sm:text-lg leading-relaxed text-text-500">
                  {t.contactPage.desc}
                </p>
                <div className="mt-8 space-y-3.5">
                  {t.contactPage.checklist.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center flex-shrink-0">
                        <CircleCheck className="h-4 w-4 text-gold-600" />
                      </div>
                      <span className="text-sm font-medium text-text-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[var(--radius)] border border-border bg-surface p-6 shadow-soft sm:p-9">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-ink-900">
                        {t.contactPage.formName}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={t.contactPage.formNamePlaceholder}
                        className="w-full rounded-[var(--radius)] border border-border bg-background px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-text-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-ink-900">
                        {t.contactPage.formPhone}
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder={t.contactPage.formPhonePlaceholder}
                        className="w-full rounded-[var(--radius)] border border-border bg-background px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-text-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-ink-900">
                      {t.contactPage.formMsg}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t.contactPage.formMsgPlaceholder}
                      className="w-full resize-none rounded-[var(--radius)] border border-border bg-background px-4 py-3 text-sm leading-relaxed text-ink-900 outline-none transition-colors placeholder:text-text-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-[var(--radius)] bg-gold-500 px-6 py-3.5 text-sm font-bold text-ink-900 transition-all hover:bg-gold-400 shadow-soft hover:-translate-y-0.5"
                  >
                    <Send className="h-4 w-4" />
                    {t.contactPage.formSubmit}
                  </button>
                  <p className="text-center text-xs font-medium text-text-400">
                    {t.contactPage.formNote}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CONTACT OPTIONS */}
        <section className="bg-surface border-y border-border py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-2xl">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gold-600">{t.contactPage.optionsEyebrow}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink-900">
                {t.contactPage.optionsTitle}
              </h2>
              <p className="mt-3 text-base text-text-500 leading-relaxed">
                {t.contactPage.optionsDesc}
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-[var(--radius)] border border-border bg-background p-7 shadow-soft hover:shadow-soft-hover transition-all">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[calc(var(--radius)-4px)] bg-gold-50 border border-gold-200">
                  <MessageCircle className="h-6 w-6 text-gold-600" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-gold-500">{t.contactPage.card1Badge}</p>
                <h3 className="mt-2 text-xl font-extrabold text-ink-900">{t.contactPage.card1Title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-text-500">
                  {t.contactPage.card1Desc}
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold-600 transition-colors hover:text-gold-700"
                >
                  {t.contactPage.card1Action} <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="rounded-[var(--radius)] border border-border bg-background p-7 shadow-soft hover:shadow-soft-hover transition-all">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[calc(var(--radius)-4px)] bg-gold-50 border border-gold-200">
                  <Phone className="h-6 w-6 text-gold-600" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-gold-500">{t.contactPage.card2Badge}</p>
                <h3 className="mt-2 text-xl font-extrabold text-ink-900">{t.contactPage.card2Title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-text-500">
                  {t.contactPage.card2Desc}
                </p>
                <a
                  href="#form-kontak"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold-600 transition-colors hover:text-gold-700"
                >
                  {t.contactPage.card2Action} <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="rounded-[var(--radius)] border border-border bg-background p-7 shadow-soft hover:shadow-soft-hover transition-all">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[calc(var(--radius)-4px)] bg-gold-50 border border-gold-200">
                  <Store className="h-6 w-6 text-gold-600" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-gold-500">{t.contactPage.card3Badge}</p>
                <h3 className="mt-2 text-xl font-extrabold text-ink-900">{t.contactPage.card3Title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-text-500">
                  {t.contactPage.card3Desc}
                </p>
                <a
                  href="#lokasi"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold-600 transition-colors hover:text-gold-700"
                >
                  {t.contactPage.card3Action} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3. LOKASI & PETA */}
        <section id="lokasi" className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gold-600">{t.contactPage.locationEyebrow}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink-900">
                {t.contactPage.locationTitle}
              </h2>
            </div>
            
            <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:items-center">
              <div className="flex flex-col space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[calc(var(--radius)-4px)] border border-border bg-surface text-gold-600 shadow-soft">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-ink-900">{t.contactPage.addressTitle}</h3>
                    <p className="mt-1 text-sm text-text-500 leading-relaxed">
                      {t.contactPage.addressText}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[calc(var(--radius)-4px)] border border-border bg-surface text-gold-600 shadow-soft">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-ink-900">{t.contactPage.hoursTitle}</h3>
                    <p className="mt-1 text-sm text-text-500 leading-relaxed">
                      {t.contactPage.hoursText}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[calc(var(--radius)-4px)] border border-border bg-surface text-gold-600 shadow-soft">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-ink-900">{t.contactPage.directContactTitle}</h3>
                    <p className="mt-1 text-sm text-text-500 leading-relaxed">
                      0812-3456-7890 (WhatsApp)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[calc(var(--radius)-4px)] border border-border bg-surface text-gold-600 shadow-soft">
                    <InstagramIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-ink-900">{t.contactPage.socialTitle}</h3>
                    <p className="mt-1 text-sm text-text-500 leading-relaxed">
                      @kounterku.store
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full h-[380px] sm:h-[450px] lg:h-full min-h-[380px] rounded-[var(--radius)] overflow-hidden border border-border shadow-soft relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.057393457002!2d104.048479!3d1.129841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da9772a721b04f%3A0xb3671239c0fa1ec7!2sJl.%20Raja%20H.%20Fisabilillah%2C%20Kota%20Batam%2C%20Kepulauan%20Riau!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. CTA */}
        <CTA
          title={t.contactPage.ctaTitle}
          description={t.contactPage.ctaDesc}
          primaryButtonText={t.contactPage.ctaBtn}
          primaryButtonHref={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            language === "en"
              ? "Hello KONTERKU, I would like to inquire about products and services"
              : "Halo KONTERKU, saya ingin tanya seputar produk dan layanan"
          )}`}
        />
      </main>

      <footer className="flex-shrink-0">
        <Footer />
      </footer>
    </div>
  );
}
