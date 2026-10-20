'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { t, isEn } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    guests: '2',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = isEn
      ? `Hello Chef's Table! I would like to make a reservation:\n- Name: ${form.name}\n- Phone: ${form.phone}\n- Date: ${form.date}\n- Guests: ${form.guests}\n- Notes: ${form.message || '-'}`
      : `Halo Chef's Table! Saya ingin melakukan reservasi:\n- Nama: ${form.name}\n- No. Telp: ${form.phone}\n- Tanggal: ${form.date}\n- Jumlah Tamu: ${form.guests} orang\n- Catatan: ${form.message || '-'}`;

    window.open(`https://wa.me/6282376680987?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="section pt-36 md:pt-44 pb-20 bg-white">
          <div className="shell">
            <Reveal>
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
                {/* Left Column: Info & Location Map */}
                <div className="space-y-6">
                  <div>
                    <span className="eyebrow mb-3 block text-ember font-bold text-xs tracking-widest uppercase">
                      {t.kontakPage.heroEyebrow}
                    </span>
                    <h1 className="heading text-3xl md:text-4xl lg:text-5xl mb-4 text-ink font-extrabold leading-tight">
                      {t.kontakPage.heroTitle}
                    </h1>
                    <p className="text-cocoa/80 text-base leading-relaxed mb-6 font-light">
                      {t.kontakPage.heroDesc}
                    </p>
                    
                    <a
                      href="tel:082376680987"
                      className="inline-flex items-center justify-center py-3 px-6 border border-ember text-ember rounded-full font-semibold text-center hover:bg-ember hover:text-white transition-colors duration-200 text-sm shadow-sm"
                    >
                      {t.kontakPage.callBtn}
                    </a>
                  </div>

                  {/* Map Box */}
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-cocoa/10 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="eyebrow text-ember text-xs font-bold">{t.kontakPage.locationTitle}</span>
                      <span className="text-xs text-cocoa/60 font-medium">Pagedangan, Banten</span>
                    </div>
                    <div className="w-full h-72 sm:h-80 rounded-xl overflow-hidden border border-cocoa/10">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126686.000000000002!2d106.55!3d-6.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb28888888889%3A0x123456789abcde!2sPagedangan%2C+Banten!5e0!3m2!1sid!2sid!4v1728123456789!5m2!1sid!2sid"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Chef's Table Location"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Reservation Form & Hours */}
                <div className="space-y-6">
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-cocoa/10 shadow-sm space-y-5">
                    <div>
                      <h3 className="heading text-xl mb-1 text-ink font-bold">
                        {t.kontakPage.formTitle}
                      </h3>
                      <p className="text-xs text-cocoa/70">
                        {t.kontakPage.formDesc}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-xs font-semibold text-cocoa/80 mb-1.5">
                            {t.kontakPage.nameLabel} *
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder={t.kontakPage.namePlaceholder}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-cocoa/15 rounded-xl text-sm text-ink placeholder:text-cocoa/40 focus:outline-none focus:border-ember transition-colors"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-xs font-semibold text-cocoa/80 mb-1.5">
                            {t.kontakPage.phoneLabel} *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            required
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder={t.kontakPage.phonePlaceholder}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-cocoa/15 rounded-xl text-sm text-ink placeholder:text-cocoa/40 focus:outline-none focus:border-ember transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="date" className="block text-xs font-semibold text-cocoa/80 mb-1.5">
                            {t.kontakPage.dateLabel} *
                          </label>
                          <input
                            type="date"
                            id="date"
                            required
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-cocoa/15 rounded-xl text-sm text-ink focus:outline-none focus:border-ember transition-colors"
                          />
                        </div>

                        <div>
                          <label htmlFor="guests" className="block text-xs font-semibold text-cocoa/80 mb-1.5">
                            {t.kontakPage.guestsLabel}
                          </label>
                          <select
                            id="guests"
                            value={form.guests}
                            onChange={(e) => setForm({ ...form, guests: e.target.value })}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-cocoa/15 rounded-xl text-sm text-ink focus:outline-none focus:border-ember transition-colors cursor-pointer"
                          >
                            <option value="1">1 Orang / Guest</option>
                            <option value="2">2 Orang / Guests</option>
                            <option value="4">3-4 Orang / Guests</option>
                            <option value="6">5-6 Orang / Guests</option>
                            <option value="10">7-10+ Orang / Large Group</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-xs font-semibold text-cocoa/80 mb-1.5">
                          {t.kontakPage.messageLabel}
                        </label>
                        <textarea
                          id="message"
                          rows={3}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder={t.kontakPage.messagePlaceholder}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-cocoa/15 rounded-xl text-sm text-ink placeholder:text-cocoa/40 focus:outline-none focus:border-ember transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-ember hover:bg-ember-dark text-cream font-bold text-sm rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                      >
                        {t.kontakPage.submitBtn}
                      </button>

                      {submitted && (
                        <p className="text-xs text-green-700 bg-green-50 p-3 rounded-xl border border-green-200">
                          {t.kontakPage.submittedSuccess}
                        </p>
                      )}
                    </form>
                  </div>

                  {/* Jam Operasional */}
                  <div className="bg-cream/40 p-5 rounded-2xl border border-cocoa/10 text-xs text-cocoa/80 space-y-2">
                    <p className="font-bold text-ink text-sm">
                      {t.kontakPage.openingHoursTitle}
                    </p>
                    <div className="flex justify-between py-1 border-b border-cocoa/10">
                      <span>{t.kontakPage.monFri}</span>
                      <span className="font-semibold text-ink">{t.kontakPage.monFriTime}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>{t.kontakPage.satSun}</span>
                      <span className="font-semibold text-ink">{t.kontakPage.satSunTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
