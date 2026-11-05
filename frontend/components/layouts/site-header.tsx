"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Check, ChevronDown, Globe, Menu, X } from "lucide-react";

import { SmartNavLink } from "@/components/layouts/smart-nav-link";
import { useLanguage, type Lang } from "@/lib/i18n";
import { logoAssets } from "@/lib/data";
import {
  getActiveHomeSection,
  isHomePath,
  isNavItemActive,
  scrollToSection,
} from "@/lib/section-navigation";

export function SiteHeader() {
  const { lang, setLang } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const langMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Close language dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (langMenuRef.current && !langMenuRef.current.contains(target)) {
        setLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync active section on scroll
  useEffect(() => {
    if (!isHomePath(pathname)) return;

    const syncScrollPosition = () => {
      const hash = window.location.hash;
      if (hash) {
        scrollToSection(hash, "auto");
      }
      setActiveSection(getActiveHomeSection());
    };

    const handleScroll = () => setActiveSection(getActiveHomeSection());
    const handleHashChange = () => syncScrollPosition();

    syncScrollPosition();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

  const handleLanguageChange = (targetLang: Lang) => {
    setLang(targetLang);
    setLangOpen(false);
    setMobileOpen(false);

    // Switch URL between /id and /en
    const current = pathname || "/id";
    let targetPath = current;

    if (current === "/id" || current === "/id/") {
      targetPath = targetLang === "en" ? "/en" : "/id";
    } else if (current === "/en" || current === "/en/") {
      targetPath = targetLang === "en" ? "/en" : "/id";
    } else if (current.startsWith("/id/")) {
      targetPath = `/${targetLang}/${current.slice(4)}`;
    } else if (current.startsWith("/en/")) {
      targetPath = `/${targetLang}/${current.slice(4)}`;
    } else {
      targetPath = `/${targetLang}${current.startsWith("/") ? current : `/${current}`}`;
    }

    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.push(`${targetPath}${hash}`);
  };

  // Main navigation links matching the reference image layout
  const navLinks = [
    { label: lang === "en" ? "Home" : "Beranda", href: "#hero" },
    { label: lang === "en" ? "Services" : "Layanan", href: "#services" },
    { label: lang === "en" ? "Solutions" : "Solusi", href: "#featured-solutions" },
    { label: lang === "en" ? "Pages" : "Halaman", href: `/${lang}/template-website` },
    { label: lang === "en" ? "Contact" : "Kontak", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-3.5 md:px-8">
        {/* 1. Left: BIDTECH Brand Logo */}
        <SmartNavLink className="flex items-center shrink-0" href="#hero">
          <Image
            src={logoAssets.main.src}
            alt={logoAssets.main.alt}
            width={180}
            height={44}
            priority
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </SmartNavLink>

        {/* 2. Center: Navigation Links (Beranda, Layanan, Solusi, Halaman, Kontak) with Green Hover & Active */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm">
          {navLinks.map((item) => {
            const active = isNavItemActive(item.href, pathname, activeSection);
            return (
              <SmartNavLink
                key={item.label}
                href={item.href}
                className={`transition-colors duration-200 cursor-pointer ${
                  active
                    ? "font-bold text-[#45a02e]"
                    : "font-medium text-slate-600 hover:text-[#45a02e]"
                }`}
              >
                {item.label}
              </SmartNavLink>
            );
          })}
        </nav>

        {/* 3. Right: Language Switcher & "Mulai Sekarang" CTA Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Switcher Dropdown (Globe + ID + Chevron) */}
          <div className="relative hidden sm:block" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#45a02e] transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              <Globe className="size-4 text-slate-500 group-hover:text-[#45a02e] transition-colors" />
              <span>{lang.toUpperCase()}</span>
              <ChevronDown
                className={`size-3 text-slate-400 transition-transform duration-200 ${
                  langOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                {(
                  [
                    { code: "id", label: "Indonesia" },
                    { code: "en", label: "English" },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => handleLanguageChange(option.code)}
                    className={`flex w-full items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold transition ${
                      lang === option.code
                        ? "bg-[#f0f9ea] text-[#45a02e]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span>{option.label}</span>
                    {lang === option.code && <Check className="size-3.5 text-[#45a02e]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Vibrant Green Pill CTA Button: Mulai Sekarang / Get Started */}
          <SmartNavLink
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-[#45a02e] hover:bg-[#388e22] text-white px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(69,160,46,0.25)] hover:shadow-[0_6px_20px_rgba(69,160,46,0.35)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 whitespace-nowrap cursor-pointer"
          >
            {lang === "en" ? "Get Started" : "Mulai Sekarang"}
          </SmartNavLink>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-800 transition-colors hover:bg-slate-50 md:hidden cursor-pointer"
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 py-4 md:hidden shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="mx-auto grid max-w-7xl gap-1.5">
            {navLinks.map((item) => {
              const active = isNavItemActive(item.href, pathname, activeSection);
              return (
                <SmartNavLink
                  key={item.label}
                  href={item.href}
                  onNavigate={() => setMobileOpen(false)}
                  className={`block rounded-xl px-3.5 py-2.5 text-sm transition ${
                    active
                      ? "bg-[#f0f9ea] text-[#45a02e] font-bold"
                      : "font-medium text-slate-600 hover:bg-slate-50 hover:text-[#45a02e]"
                  }`}
                >
                  {item.label}
                </SmartNavLink>
              );
            })}
          </nav>

          {/* Mobile Language Switcher */}
          <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between border-t border-slate-100 pt-3">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Globe className="size-3.5" />
              <span>{lang === "en" ? "Language:" : "Bahasa:"}</span>
            </div>
            <div className="flex gap-1.5">
              {(["id", "en"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleLanguageChange(code)}
                  className={`rounded-full border px-3 py-1 text-xs font-bold uppercase transition ${
                    lang === code
                      ? "border-[#45a02e] bg-[#f0f9ea] text-[#45a02e] shadow-sm"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
