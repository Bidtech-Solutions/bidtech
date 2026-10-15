"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { NAV_ITEMS } from "@/constants/navigation";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { getLocalizedPath, removeLocalePrefix, type Locale } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/data";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const currentPath = removeLocalePrefix(pathname);

  const waContactUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    locale === "id"
      ? "Halo NadimTrans RentCar, saya ingin konsultasi dan sewa mobil di Batam."
      : "Hello NadimTrans RentCar, I would like to inquire about renting a car in Batam."
  )}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hasHeroBanner =
    currentPath === "/" ||
    currentPath === "/kendaraan" ||
    currentPath === "/layanan" ||
    currentPath === "/faq";

  const isSolid = isScrolled || !hasHeroBanner || isMobileMenuOpen;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isSolid
          ? "bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-amber-500/20 text-white"
          : "bg-gradient-to-b from-black/80 via-black/30 to-transparent border-b border-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">

          {/* Logo Brand NTR */}
          <Link href={getLocalizedPath(locale, "/")} className="flex-shrink-0 flex items-center gap-2 sm:gap-2.5 lg:gap-3 group py-1">
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/icons/icon-2.webp"
                alt="NadimTrans RentCar Emblem"
                fill
                sizes="48px"
                className="object-contain drop-shadow-[0_2px_10px_rgba(212,175,55,0.45)]"
              />
            </div>
            <Image
              src="/icons/icon-3.webp"
              alt="NadimTrans Rentcar"
              width={240}
              height={80}
              className="h-8 sm:h-9 md:h-10 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop & Tablet Navigation */}
          <nav className="hidden md:flex gap-3.5 lg:gap-7 xl:gap-8 items-center">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === "/" ? currentPath === "/" : currentPath.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={getLocalizedPath(locale, item.href)}
                  className={`text-xs lg:text-sm tracking-wide transition-colors whitespace-nowrap ${
                    isActive
                      ? "font-bold text-amber-400"
                      : "font-medium text-white/90 hover:text-amber-300"
                  }`}
                >
                  {t(item.label)}
                </Link>
              );
            })}
          </nav>

          {/* Desktop & Tablet Right CTA */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <LanguageSwitcher />
            <a href={waContactUrl} target="_blank" rel="noreferrer">
              <Button size="sm" className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 rounded-xl font-bold px-3.5 sm:px-4 lg:px-6 h-9 lg:h-11 text-xs lg:text-sm shadow-md shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap cursor-pointer">
                {t("nav.contact")}
              </Button>
            </a>
          </div>

          {/* Mobile Right Icons */}
          <div className="md:hidden flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-xl text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label={isMobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-amber-500/20 shadow-2xl overflow-hidden text-white animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 pt-3 pb-6 space-y-1.5">
              <LanguageSwitcher mobile onNavigate={() => setIsMobileMenuOpen(false)} />
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === "/" ? currentPath === "/" : currentPath.startsWith(item.href);
                return (
                  <Link
                    key={item.label}
                    href={getLocalizedPath(locale, item.href)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                      isActive
                        ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        : "text-gray-200 hover:bg-white/5 hover:text-amber-300"
                    }`}
                  >
                    {t(item.label)}
                  </Link>
                );
              })}
              <div className="pt-3 mt-2 border-t border-white/10">
                <a href={waContactUrl} target="_blank" rel="noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button size="lg" className="w-full justify-center bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-bold rounded-xl py-3 shadow-md shadow-amber-500/30 cursor-pointer">
                    {t("nav.contact")}
                  </Button>
                </a>
              </div>
            </div>
          </div>
      )}
    </header>
  );
}
