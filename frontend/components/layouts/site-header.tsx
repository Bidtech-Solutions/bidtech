"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Check, ChevronDown, Globe } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";

import { SmartNavLink } from "@/components/layouts/smart-nav-link";
import { useLanguage, type Lang } from "@/lib/i18n";
import { logoAssets } from "@/lib/data";
import {
  getActiveHomeSection,
  isHomePath,
  isNavItemActive,
  scrollToSection,
} from "@/lib/section-navigation";

const MENU_EASE = [0.16, 1, 0.3, 1] as const;

const MENU_ITEM_VARIANTS: Variants = {
  open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: MENU_EASE } },
  closed: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

export function SiteHeader() {
  const { lang, setLang } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const langMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
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

  // Tutup menu mobile dengan tombol Escape atau klik di luar kartu menu
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (mobileMenuRef.current?.contains(target) || mobileToggleRef.current?.contains(target)) return;
      setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [mobileOpen]);

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

        {/* 2. Center: Navigation Links (Beranda, Layanan, Solusi, Kontak) with Green Hover & Active */}
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

          {/* Mobile Hamburger Toggle Button: 3 garis yang berubah halus menjadi X */}
          <button
            ref={mobileToggleRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            className={`relative flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 md:hidden cursor-pointer ${
              mobileOpen
                ? "border-[#45a02e]/40 bg-[#f0f9ea] text-[#45a02e]"
                : "border-slate-200 text-slate-800 hover:bg-slate-50"
            }`}
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span aria-hidden className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 h-0.5 w-4 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  mobileOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-4 rounded-full bg-current transition-all duration-200 motion-reduce:transition-none ${
                  mobileOpen ? "scale-x-0 opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-4 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  mobileOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu: kartu melayang di bawah tombol (fade + zoom dari pojok kanan atas).
          Posisi absolute, jadi isi halaman tidak ikut bergeser. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            ref={mobileMenuRef}
            initial={{ opacity: 0, scale: 0.92, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4, transition: { duration: 0.15, ease: "easeIn" } }}
            transition={{ duration: 0.28, ease: MENU_EASE }}
            className="absolute right-4 top-full z-50 mt-2 w-[min(18rem,calc(100vw-2rem))] origin-top-right overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.14)] md:hidden"
          >
            <motion.div
              className="p-2.5"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
                closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
              }}
            >
              <nav className="grid gap-1">
                {navLinks.map((item) => {
                  const active = isNavItemActive(item.href, pathname, activeSection);
                  return (
                    <motion.div key={item.label} variants={MENU_ITEM_VARIANTS}>
                      <SmartNavLink
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
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile Language Switcher */}
              <motion.div
                variants={MENU_ITEM_VARIANTS}
                className="mx-1 mt-2 flex items-center justify-between border-t border-slate-100 px-2.5 pt-3 pb-1.5"
              >
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
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
