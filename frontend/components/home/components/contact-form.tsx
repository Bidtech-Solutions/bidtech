"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";

import { useLanguage } from "@/lib/i18n";

interface SelectedPackage {
  service: string;
  plan: string;
  price: string;
}

export function ContactForm({
  selectedPackage,
}: {
  selectedPackage?: SelectedPackage | null;
}) {
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState(selectedPackage?.service ?? "");
  const [description, setDescription] = useState(
    selectedPackage
      ? `${t.contact.message.packageInterestPrefix} ${selectedPackage.plan} (${selectedPackage.price}).`
      : "",
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const message = [
      `${t.contact.message.greetingPrefix} *${name.trim() || "-"}* ${company.trim() ? `${t.contact.message.from} *${company.trim()}*` : ""}.`,
      `• *${t.contact.form.emailLabel}:* ${email.trim() || "-"}`,
      `• *${t.contact.message.whatsapp}:* ${whatsapp.trim() || "-"}`,
      `• *${t.contact.message.service}:* ${service || "-"}`,
      `• *${t.contact.message.description}:*`,
      `${description.trim() || "-"}`,
    ].join("\n");

    window.open(
      `https://wa.me/628217601455?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div>
      {/* Form Header */}
      <div>
        <h3 className="font-[family-name:var(--font-plus-jakarta),sans-serif] text-2xl sm:text-[28px] font-bold text-slate-900 tracking-[-0.02em] leading-snug">
          {t.contact.form.title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
          {t.contact.form.subtitle}
        </p>
      </div>

      <form className="mt-7 sm:mt-8 space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
        {/* Row 1: Nama Lengkap & Email */}
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
          <div>
            <label
              className="block text-xs font-bold text-slate-800 mb-1.5"
              htmlFor="contact-name"
            >
              {t.contact.form.nameLabel}
            </label>
            <input
              className="w-full rounded-[14px] border border-slate-200/90 bg-[#fbfcfd] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#45a02e] focus:outline-none focus:ring-4 focus:ring-[#45a02e]/10 transition-all shadow-xs"
              id="contact-name"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder={t.contact.form.namePlaceholder}
              required
              type="text"
              value={name}
            />
          </div>

          <div>
            <label
              className="block text-xs font-bold text-slate-800 mb-1.5"
              htmlFor="contact-email"
            >
              {t.contact.form.emailLabel}
            </label>
            <input
              className="w-full rounded-[14px] border border-slate-200/90 bg-[#fbfcfd] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#45a02e] focus:outline-none focus:ring-4 focus:ring-[#45a02e]/10 transition-all shadow-xs"
              id="contact-email"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder={t.contact.form.emailPlaceholder}
              type="email"
              value={email}
            />
          </div>
        </div>

        {/* Row 2: Nomor Whatsapp & Nama Perusahaan */}
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
          <div>
            <label
              className="block text-xs font-bold text-slate-800 mb-1.5"
              htmlFor="contact-whatsapp"
            >
              {t.contact.form.whatsappLabel}
            </label>
            <input
              className="w-full rounded-[14px] border border-slate-200/90 bg-[#fbfcfd] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#45a02e] focus:outline-none focus:ring-4 focus:ring-[#45a02e]/10 transition-all shadow-xs"
              id="contact-whatsapp"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setWhatsapp(e.target.value)}
              placeholder={t.contact.form.whatsappPlaceholder}
              required
              type="tel"
              value={whatsapp}
            />
          </div>

          <div>
            <label
              className="block text-xs font-bold text-slate-800 mb-1.5"
              htmlFor="contact-company"
            >
              {t.contact.form.companyLabel}
            </label>
            <input
              className="w-full rounded-[14px] border border-slate-200/90 bg-[#fbfcfd] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#45a02e] focus:outline-none focus:ring-4 focus:ring-[#45a02e]/10 transition-all shadow-xs"
              id="contact-company"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
              placeholder={t.contact.form.companyPlaceholder}
              type="text"
              value={company}
            />
          </div>
        </div>

        {/* Row 3: Pilih Layanan */}
        <div>
          <label
            className="block text-xs font-bold text-slate-800 mb-1.5"
            htmlFor="contact-service"
          >
            {t.contact.form.serviceLabel}
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none rounded-[14px] border border-slate-200/90 bg-[#fbfcfd] px-4 py-3 pr-10 text-sm text-slate-900 focus:bg-white focus:border-[#45a02e] focus:outline-none focus:ring-4 focus:ring-[#45a02e]/10 transition-all shadow-xs cursor-pointer"
              id="contact-service"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setService(e.target.value)}
              value={service}
            >
              <option disabled value="">
                {t.contact.form.servicePlaceholder}
              </option>
              {t.contact.form.services.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          </div>
        </div>

        {/* Row 4: Deskripsi Proyek */}
        <div>
          <label
            className="block text-xs font-bold text-slate-800 mb-1.5"
            htmlFor="contact-description"
          >
            {t.contact.form.descriptionLabel}
          </label>
          <textarea
            className="w-full resize-none rounded-[14px] border border-slate-200/90 bg-[#fbfcfd] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#45a02e] focus:outline-none focus:ring-4 focus:ring-[#45a02e]/10 transition-all shadow-xs leading-relaxed"
            id="contact-description"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            placeholder={t.contact.form.descriptionPlaceholder}
            rows={4}
            value={description}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            className="w-full rounded-[14px] bg-[#45a02e] hover:bg-[#3b8e26] py-3.5 sm:py-4 text-center text-sm sm:text-base font-bold text-white shadow-[0_8px_24px_rgba(69,160,46,0.25)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer"
            type="submit"
          >
            {t.contact.form.submit}
          </button>
        </div>

        {/* Privacy Note */}
        <p className="pt-1 text-center text-xs text-slate-400 leading-normal">
          {t.contact.form.privacyNote}
        </p>
      </form>
    </div>
  );
}

