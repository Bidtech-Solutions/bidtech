"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Search,
  Car,
  FileText,
  CreditCard,
  Shield,
  HelpCircle,
  Headphones,
} from "lucide-react";

import { getFaqs } from "@/lib/localizedData";
import { COMPANY_INFO } from "@/lib/data";
import type { Locale } from "@/lib/i18n";

// Categorized FAQs
export const FAQ_CATEGORIES = [
  { id: "pemesanan", nameKey: "faq.booking", icon: Car, titleKey: "faq.bookingTitle" },
  { id: "dokumen", nameKey: "faq.documents", icon: FileText, titleKey: "faq.documentsTitle" },
  { id: "pembayaran", nameKey: "faq.payment", icon: CreditCard, titleKey: "faq.paymentTitle" },
  { id: "asuransi", nameKey: "faq.insurance", icon: Shield, titleKey: "faq.insuranceTitle" },
];

export default function FaqClient() {
  const [activeCategory, setActiveCategory] = useState("pemesanan");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const faqs = getFaqs(locale);

  // Filter FAQs based on search or active category
  const displayedFaqs = useMemo(() => {
    if (searchQuery.trim() !== "") {
      return faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return faqs.filter((faq) => faq.category === activeCategory);
  }, [activeCategory, faqs, searchQuery]);

  const activeCategoryObj = FAQ_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        {/* 1. Dark & Gold Hero Banner with NTR Luxury Showroom Backdrop */}
        <section className="relative text-white pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24 overflow-hidden text-center border-b border-amber-500/20 bg-slate-950">
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
            <Image
              src="/images/background-3.webp"
              alt="NadimTrans RentCar Batam"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.9] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/85 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/50 z-[1]" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl z-[2] pointer-events-none" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white drop-shadow-md">
                {t("faq.title")}
              </h1>
              <p className="text-gray-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow-sm">
                {t("faq.description")}
              </p>

              {/* Centered Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="w-4 h-4 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder={t("faq.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-3.5 bg-white text-gray-900 placeholder-gray-400 rounded-full text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-amber-500/30 shadow-lg shadow-black/20 transition-all border border-amber-500/30"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Main Content (Sidebar + FAQs) */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Left Column: Category Sidebar */}
              <div className="lg:col-span-4">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-4">
                  {t("faq.category")}
                </p>
                <div className="space-y-1.5">
                  {FAQ_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id && searchQuery === "";
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setSearchQuery("");
                        }}
                        className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                          isActive
                            ? "bg-amber-50 text-amber-700 border border-amber-300 shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-amber-600"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? "text-amber-600" : "text-gray-500"
                          }`}
                        />
                        <span>{t(cat.nameKey)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: FAQs Accordion */}
              <div className="lg:col-span-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {searchQuery ? t("faq.results", { query: searchQuery }) : activeCategoryObj ? t(activeCategoryObj.titleKey) : ""}
                </h2>

                {displayedFaqs.length === 0 ? (
                  <div className="bg-gray-50 rounded-2xl p-10 text-center border border-gray-100">
                    <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-base font-bold text-gray-800 mb-1">
                      {t("faq.emptyTitle")}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      {t("faq.emptyDescription")}
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-xs text-amber-600 font-bold hover:underline"
                    >
                      {t("faq.reset")}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {displayedFaqs.map((faq) => {
                      const isExpanded = expandedId === faq.id;
                      return (
                        <div
                          key={faq.id}
                          className="flex items-start gap-3"
                        >
                          {/* Question Mark Icon */}
                          <div className="pt-4 text-amber-500 shrink-0">
                            <HelpCircle className="w-5 h-5 stroke-[1.8]" />
                          </div>

                          {/* Card Container */}
                          <div
                            className={`flex-1 rounded-2xl border transition-all duration-200 overflow-hidden ${
                              isExpanded
                                ? "bg-white border-amber-300 shadow-lg shadow-amber-500/5"
                                : "bg-white border-gray-100 shadow-sm hover:border-gray-200"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                              className="w-full px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                            >
                              <span
                                className={`text-sm sm:text-base font-bold transition-colors ${
                                  isExpanded ? "text-amber-600" : "text-gray-800"
                                }`}
                              >
                                {faq.question}
                              </span>
                            </button>

                            {isExpanded && (
                                <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                                  <div className="px-6 pb-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50/80 mt-1 pt-3">
                                    {faq.answer}
                                  </div>
                                </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

            {/* 3. Masih Memiliki Pertanyaan? Bottom Card */}
            <div className="mt-20 bg-slate-950 rounded-3xl p-8 sm:p-12 md:p-14 text-white text-center shadow-2xl border-2 border-amber-500/30">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight text-white">
                {t("faq.helpTitle")}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8 font-normal">
                {t("faq.helpDescription")}
              </p>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm px-8 py-4 rounded-full inline-flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <Headphones className="w-4 h-4" />
                <span>{t("faq.chat")}</span>
              </a>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
