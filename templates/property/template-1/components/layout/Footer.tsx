"use client";

import Link from "next/link";
import { ArrowUp, Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react";
import { useLanguage, type Language } from "@/context/LanguageContext";

interface FooterProps {
  lang?: Language;
}

export default function Footer({ lang: propLang }: FooterProps) {
  const contextLang = useLanguage();
  const currentLang = propLang || contextLang.lang;

  const scrollToTop = () => {
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: false, duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black text-white pt-20 pb-12 border-t border-neutral-900">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-16">
        {/* Brand Headline & Multi-Column Links */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-xs">
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <h3 className="text-sm font-black tracking-widest uppercase text-white font-mono">
              DENN HOUSE
            </h3>
            <p className="text-neutral-400 max-w-xs leading-relaxed text-xs">
              {currentLang === "en"
                ? "Architectural atelier crafting monumental monolithic residences across Zurich, Dubai, Singapore, and Jakarta."
                : "Atelier arsitektur yang merancang residensi monolitik monumental di Zurich, Dubai, Singapura, dan Jakarta."}
            </p>
            <p className="text-neutral-500 text-[11px] pt-4 font-mono">
              © {new Date().getFullYear()} Denn House Atelier. All rights reserved.
            </p>
          </div>

          {/* Column 1: Atelier */}
          <div className="space-y-3">
            <span className="font-bold tracking-wider uppercase text-neutral-300 block font-mono text-[11px]">
              {currentLang === "en" ? "Atelier" : "Atelier"}
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">
                  {currentLang === "en" ? "Philosophy & Story" : "Filosofi & Kisah"}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  {currentLang === "en" ? "Craftsmanship" : "Kriya & Material"}
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">
                  {currentLang === "en" ? "Architectural Team" : "Tim Arsitek"}
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white transition-colors">
                  {currentLang === "en" ? "Private Inquiries" : "Konsultasi Privat"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Properties */}
          <div className="space-y-3">
            <span className="font-bold tracking-wider uppercase text-neutral-300 block font-mono text-[11px]">
              {currentLang === "en" ? "Portfolio" : "Portofolio"}
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">
                  {currentLang === "en" ? "Signature Residences" : "Residensi Ikonik"}
                </Link>
              </li>
              <li>
                <Link href="/properties/sander-house" className="hover:text-white transition-colors">
                  Sander House (Dubai)
                </Link>
              </li>
              <li>
                <Link href="/properties/azure-villa" className="hover:text-white transition-colors">
                  Azure Villa (Palm Jumeirah)
                </Link>
              </li>
              <li>
                <Link href="/properties/seraphina-villa" className="hover:text-white transition-colors">
                  Seraphina Villa (Zurich)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Global Hubs */}
          <div className="space-y-3">
            <span className="font-bold tracking-wider uppercase text-neutral-300 block font-mono text-[11px]">
              {currentLang === "en" ? "Locations" : "Lokasi"}
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="/locations" className="hover:text-white transition-colors">
                  Batam (Nongsa & HarbourBay)
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white transition-colors">
                  Dubai (Emirates Hills)
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white transition-colors">
                  Zurich (Lake Zurich)
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white transition-colors">
                  Singapore & Jakarta
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Private Desk */}
          <div className="space-y-3">
            <span className="font-bold tracking-wider uppercase text-neutral-300 block font-mono text-[11px]">
              {currentLang === "en" ? "Private Desk" : "Meja Privat"}
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a
                  href="https://wa.me/628136764825"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-white"
                >
                  <MessageCircle className="w-3 h-3 text-amber-400" /> WhatsApp Direct
                </a>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white transition-colors">
                  {currentLang === "en" ? "Schedule Viewing" : "Jadwalkan Tur"}
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Instagram className="w-3 h-3" /> Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Linkedin className="w-3 h-3" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 border-t border-neutral-900 flex items-center justify-between text-neutral-500 text-[11px] font-mono">
          <div>
            DENN HOUSE ARCHITECTURAL DESIGN SYSTEM • SWISS EDITORIAL GRID
          </div>
          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
