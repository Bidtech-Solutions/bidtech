"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, Phone, Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { NAV_ITEMS } from "@/lib/data";
import { useLanguage, type Language } from "@/context/LanguageContext";
import { useTheme, type Theme } from "@/context/ThemeContext";

interface NavbarProps {
  lang?: Language;
  onToggleLang?: () => void;
  heroTheme?: Theme;
  onToggleHeroTheme?: () => void;
  hideNav?: boolean;
}

export default function Navbar({
  lang: propLang,
  onToggleLang: propOnToggleLang,
  heroTheme: propHeroTheme,
  onToggleHeroTheme: propOnToggleHeroTheme,
  hideNav = false,
}: NavbarProps) {
  const pathname = usePathname();
  const contextLang = useLanguage();
  const contextTheme = useTheme();

  const currentLang: Language = propLang || contextLang.lang;
  const toggleLang = propOnToggleLang || contextLang.toggleLang;

  const currentTheme: Theme = propHeroTheme || contextTheme.theme;
  const toggleTheme = propOnToggleHeroTheme || contextTheme.toggleTheme;
  const isLight = currentTheme === "light";

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastState = false;

    const handleScroll = (e?: any) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const lenisScroll =
            typeof e?.scroll === "number" ? e.scroll : (window as any).lenis?.scroll;
          const currentScroll =
            typeof lenisScroll === "number"
              ? lenisScroll
              : window.scrollY ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0;

          if (!lastState && currentScroll > 50) {
            lastState = true;
            setIsScrolled(true);
          } else if (lastState && currentScroll < 25) {
            lastState = false;
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });

    // Connect to Lenis smoothly even if dynamically loaded
    let lenisHooked = false;
    const tryConnectLenis = () => {
      if (typeof window !== "undefined" && (window as any).lenis && !lenisHooked) {
        (window as any).lenis.on("scroll", handleScroll);
        lenisHooked = true;
        return true;
      }
      return false;
    };

    tryConnectLenis();
    const lenisInterval = setInterval(() => {
      if (tryConnectLenis()) {
        clearInterval(lenisInterval);
      }
    }, 150);
    const stopCheck = setTimeout(() => clearInterval(lenisInterval), 4000);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      clearInterval(lenisInterval);
      clearTimeout(stopCheck);
      if (typeof window !== "undefined" && (window as any).lenis && lenisHooked) {
        (window as any).lenis.off("scroll", handleScroll);
      }
    };
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);

    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          if (typeof window !== "undefined" && (window as any).lenis) {
            (window as any).lenis.scrollTo(targetElement as HTMLElement, {
              offset: -20,
              duration: 1.2,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          } else {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    }
  };

  return (
    <>
      {/* 100% Fixed Vertical Top Anchor (z-[100] to sit above any Leaflet panes/controls) */}
      <header
        id="main-nav"
        className={`fixed top-3 sm:top-5 left-0 w-full z-[100] flex justify-center pointer-events-none px-3 sm:px-8 md:px-12 transition-all duration-300 ${
          hideNav
            ? "opacity-0 -translate-y-12 pointer-events-none invisible"
            : "opacity-100 translate-y-0"
        }`}
      >
        {/* Horizontal Morphing Shell: Starts wide, morphs into compact dock on scroll across ALL pages */}
        <div
          className={`w-full pointer-events-auto flex items-center justify-between rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled
              ? isLight
                ? "max-w-[880px] bg-white/90 backdrop-blur-xl border border-black/15 shadow-2xl px-4 sm:px-6 py-2 sm:py-2.5 text-neutral-900"
                : "max-w-[880px] glass-scrolled-dock px-4 sm:px-6 py-2 sm:py-2.5 text-white"
              : isLight
                ? "max-w-[1440px] bg-white/80 backdrop-blur-xl border border-black/10 px-3.5 sm:px-6 md:px-8 py-2 sm:py-3.5 shadow-xl text-neutral-900"
                : "max-w-[1440px] bg-black/55 md:bg-black/40 backdrop-blur-xl md:backdrop-blur-md border border-white/15 px-3.5 sm:px-6 md:px-8 py-2 sm:py-3.5 shadow-2xl text-white"
          }`}
        >
          {/* Left: Brand Monogram & Persistent Brand Text */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 group shrink-0 mr-2 sm:mr-4 md:mr-6"
            aria-label="Denn House Home"
          >
            <div
              className={`rounded-full border flex items-center justify-center font-bold transition-all duration-500 ease-out ${
                isLight
                  ? "bg-black/10 border-black/20 text-neutral-900"
                  : "bg-white/10 border-white/20 text-white"
              } ${
                isScrolled ? "w-7 h-7" : "w-7 h-7 sm:w-8 sm:h-8"
              } group-hover:scale-105`}
            >
              <Boxes
                className={`transition-all duration-500 ${
                  isLight ? "text-neutral-900" : "text-white"
                } ${isScrolled ? "w-3.5 h-3.5" : "w-3.5 h-3.5 sm:w-4 sm:h-4"}`}
              />
            </div>

            {/* Brand Text */}
            <div className="overflow-hidden flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-w-[170px] sm:max-w-[220px] opacity-100">
              <span
                className={`text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] font-extrabold uppercase whitespace-nowrap ${
                  isLight ? "text-neutral-900" : "text-white"
                }`}
              >
                DENN HOUSE
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav
            className={`hidden md:flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled
                ? "gap-5 lg:gap-6 text-[11px] font-mono tracking-widest uppercase"
                : "gap-6 lg:gap-8 text-xs font-medium tracking-wide"
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`transition-colors duration-200 whitespace-nowrap relative py-1 ${
                    isActive
                      ? isLight
                        ? "text-neutral-900 font-bold"
                        : "text-white font-bold"
                      : isLight
                        ? "text-neutral-600 hover:text-neutral-900"
                        : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {currentLang === "en" ? item.label : item.labelId}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-amber-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Controls & Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Light/Dark Mode Switcher (Active on ALL pages) */}
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
                isLight
                  ? "border-black/15 bg-black/5 hover:bg-black/10 text-neutral-800"
                  : "border-white/20 bg-white/10 hover:bg-white/15 text-white"
              } ${isScrolled ? "w-7 h-7" : "w-7 h-7 sm:w-8 sm:h-8"}`}
              title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label="Toggle Theme"
            >
              {isLight ? (
                <Moon className="w-3.5 h-3.5 text-amber-500 transition-transform duration-300" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-400 transition-transform duration-300" />
              )}
            </button>

            {/* Desktop Language Switch */}
            <button
              onClick={toggleLang}
              className={`hidden md:block font-mono font-bold transition-all duration-500 cursor-pointer ${
                isLight
                  ? "text-neutral-600 hover:text-neutral-900"
                  : "text-neutral-300 hover:text-white"
              } ${isScrolled ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1"}`}
              aria-label="Toggle Language"
            >
              {isScrolled
                ? currentLang === "en"
                  ? "EN"
                  : "ID"
                : currentLang === "en"
                ? "EN | ID"
                : "ID | EN"}
            </button>

            {/* Desktop Phone / WhatsApp Button */}
            <a
              href="https://wa.me/628136764825"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:flex items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-md active:scale-95 ${
                isLight
                  ? "bg-black text-white hover:bg-neutral-800"
                  : "bg-white text-black hover:bg-neutral-200"
              } ${
                isScrolled
                  ? "w-7 h-7 p-0 justify-center"
                  : "px-3.5 py-1.5 gap-2 text-xs font-bold tracking-tight"
              }`}
              title="Private Client Desk WhatsApp: +62 813-6764-825"
            >
              <div
                className={`overflow-hidden flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isScrolled ? "max-w-0 opacity-0" : "max-w-[150px] opacity-100"
                }`}
              >
                <span className="whitespace-nowrap font-mono text-[11px]">+62 813-6764-825</span>
              </div>

              <div
                className={`flex items-center justify-center transition-all duration-500 shrink-0 ${
                  isScrolled
                    ? isLight
                      ? "w-full h-full text-white"
                      : "w-full h-full text-black"
                    : isLight
                      ? "w-5 h-5 rounded-full bg-white text-black"
                      : "w-5 h-5 rounded-full bg-black text-white"
                }`}
              >
                <Phone className="w-3 h-3" />
              </div>
            </a>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={`flex md:hidden items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border transition-all duration-300 active:scale-90 cursor-pointer focus:outline-none ${
                isLight
                  ? "bg-black/5 hover:bg-black/10 border-black/15 text-neutral-900"
                  : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
              }`}
              aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={mobileMenuOpen}
            >
              <div className={`transition-transform duration-300 ${mobileMenuOpen ? "rotate-90" : "rotate-0"}`}>
                {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Smooth Backdrop Overlay (z-[110] above all map tiles) */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-md z-[110] md:hidden transition-opacity duration-300 ease-out ${
          !hideNav && mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      />

      {/* Mobile Drawer Panel with Spring Transition (z-[120] above all map tiles) */}
      <div
        className={`fixed inset-x-3.5 top-14 sm:top-16 z-[120] max-w-lg mx-auto rounded-3xl p-5 sm:p-6 flex flex-col gap-4 shadow-2xl md:hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isLight
            ? "bg-white/95 backdrop-blur-2xl border border-black/10 text-neutral-900"
            : "glass-scrolled-dock text-white"
        } ${
          !hideNav && mobileMenuOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        }`}
      >
        {/* Top Bar inside Drawer */}
        <div className={`flex items-center justify-between border-b pb-3.5 ${isLight ? "border-black/10" : "border-white/10"}`}>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${isLight ? "bg-black/10 border-black/20 text-neutral-900" : "bg-white/10 border-white/20 text-white"}`}>
              <Boxes className="w-3 h-3" />
            </div>
            <span className={`text-[11px] font-mono font-bold tracking-[0.2em] uppercase ${isLight ? "text-neutral-800" : "text-neutral-300"}`}>
              DENN HOUSE
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 border ${
              isLight
                ? "bg-black/5 hover:bg-black/10 border-black/15 text-neutral-700"
                : "bg-white/10 hover:bg-white/20 border-white/15 text-neutral-300 hover:text-white"
            }`}
            aria-label="Close menu"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 py-1">
          {NAV_ITEMS.map((item, idx) => {
            const isActive =
              pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 group active:scale-[0.98] ${
                  isActive
                    ? isLight
                      ? "bg-black/10 text-black font-bold"
                      : "bg-white/15 text-white font-bold"
                    : isLight
                      ? "hover:bg-black/5 text-neutral-700 hover:text-black"
                      : "hover:bg-white/10 text-neutral-300 hover:text-white"
                }`}
              >
                <span className="text-base font-medium tracking-tight">
                  {currentLang === "en" ? item.label : item.labelId}
                </span>
                <span
                  className={`text-[10px] font-mono ${
                    isActive ? "text-amber-500 font-bold" : isLight ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  0{idx + 1}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Direct Call / WhatsApp CTA Button */}
        <a
          href="https://wa.me/628136764825"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl font-bold text-xs tracking-wide transition-all duration-200 shadow-lg active:scale-[0.98] ${
            isLight
              ? "bg-black text-white hover:bg-neutral-800"
              : "bg-white text-black hover:bg-neutral-200"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isLight ? "bg-white text-black" : "bg-black text-white"}`}>
              <Phone className="w-3 h-3" />
            </div>
            <span className="font-mono text-xs">+62 813-6764-825</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>

        {/* Bottom Actions: Theme & Language */}
        <div className={`pt-3 border-t flex items-center justify-between ${isLight ? "border-black/10" : "border-white/10"}`}>
          <button
            onClick={() => toggleTheme()}
            className={`flex items-center gap-2 text-xs font-mono font-medium px-2.5 py-1.5 rounded-lg border active:scale-95 transition-all ${
              isLight
                ? "bg-black/5 border-black/10 text-neutral-800 hover:bg-black/10"
                : "bg-white/5 border-white/10 text-neutral-300 hover:text-white"
            }`}
          >
            {isLight ? (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-500" />
                <span>DARK MODE</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>LIGHT MODE</span>
              </>
            )}
          </button>

          <button
            onClick={() => toggleLang()}
            className={`text-xs font-mono font-medium px-2.5 py-1.5 rounded-lg border active:scale-95 transition-all ml-auto ${
              isLight
                ? "bg-black/5 border-black/10 text-neutral-800 hover:bg-black/10"
                : "bg-white/5 border-white/10 text-neutral-300 hover:text-white"
            }`}
          >
            {currentLang === "en" ? "INDONESIAN (ID)" : "ENGLISH (EN)"}
          </button>
        </div>
      </div>
    </>
  );
}
