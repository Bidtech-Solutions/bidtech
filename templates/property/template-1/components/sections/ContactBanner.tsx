"use client";

import Image from "next/image";
import { ArrowRight, MapPin, Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ContactBannerProps {
  lang?: "en" | "id";
  onTriggerToast?: (msg: string) => void;
}

export default function ContactBanner({ lang: propLang, onTriggerToast }: ContactBannerProps) {
  const { lang: contextLang } = useLanguage();
  const lang = propLang || contextLang || "en";

  const handleStartConversation = () => {
    if (onTriggerToast) {
      onTriggerToast(
        lang === "en"
          ? "Private Client Desk active. Our advisory team will respond within 2 hours."
          : "Meja Layanan Klien Privat aktif. Tim penasihat kami akan merespons dalam 2 jam."
      );
    }
    window.open("https://wa.me/628136764825", "_blank");
  };

  return (
    <section id="contact" className="relative bg-neutral-950 text-white py-24 sm:py-28 overflow-hidden border-b border-neutral-900 select-none">
      {/* Twilight Architectural Backdrop */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/contact-banner.webp"
          alt="Vision Banner"
          fill
          className="object-cover object-right opacity-35 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 space-y-8">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase block">
            {lang === "en" ? "CONTACT US" : "HUBUNGI KAMI"}
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            {lang === "en" ? (
              <>
                Have a vision?<br />Let’s build it together.
              </>
            ) : (
              <>
                Punya visi properti?<br />Mari wujudkan bersama.
              </>
            )}
          </h2>
        </div>

        {/* Start Conversation Button */}
        <div>
          <button
            onClick={handleStartConversation}
            className="group inline-flex items-center gap-4 bg-white text-black hover:bg-neutral-200 px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all shadow-2xl active:scale-95 cursor-pointer"
          >
            <span>{lang === "en" ? "START A CONVERSATION" : "MULAI PERCAKAPAN"}</span>
            <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Quick Contact Row */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-6 text-xs text-neutral-300">
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-neutral-400" />
              <span>{lang === "en" ? "Batam & Global Hubs" : "Batam & Hub Global"}</span>
            </div>
            <a href="tel:+628136764825" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-neutral-400" />
              <span>+62 813-6764-825</span>
            </a>
            <a
              href="https://wa.me/628136764825"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-neutral-400" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          <div className="font-mono text-neutral-400 text-xs">
            <span>{lang === "en" ? "EN | ID" : "ID | EN"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
