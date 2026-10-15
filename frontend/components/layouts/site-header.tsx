"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Check, ChevronDown, Globe, Menu, X } from "lucide-react";

import { SmartNavLink } from "@/components/layouts/smart-nav-link";
import { useLanguage } from "@/lib/i18n";
import { brandClasses, logoAssets } from "@/lib/data";
import { getActiveHomeSection, isHomePath, isNavItemActive, scrollToSection } from "@/lib/section-navigation";

const DASHBOARD_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1" ? `${window.location.protocol}//dashboard.${window.location.hostname}` : "http://localhost:8000");

export function SiteHeader() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const menuRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
      if (companyRef.current && !companyRef.current.contains(event.target as Node)) {
        setCompanyOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setCompanyOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setCompanyOpen(false);
    setMobileOpen(false);
  }, [pathname]);

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

  const navItems = [
    { label: t.nav.findDesign ?? "Cari Design", href: "/template-website" },
    { label: t.nav.tutorial ?? "Tutorial", href: "/tutorial" },
    { label: t.nav.custom ?? "Custom", href: "#services" },
    { label: t.nav.portfolio ?? "Portofolio", href: "/portofolio" },
    { label: t.nav.contact ?? "Hubungi Kami", href: "/hubungi-kami" },
  ];

  const companyItems = [
    { label: t.nav.about ?? "Tentang", href: "/tentang" },
    { label: t.nav.blog ?? "Blog", href: "/blog" },
  ];

  const isCompanyActive = pathname === "/blog" || pathname === "/tentang";
  const isCompanyHighlighted = isCompanyActive || companyOpen;

  const handleCompanyMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setCompanyOpen(true);
  };

  const handleCompanyMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setCompanyOpen(false);
    }, 180);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3.5 py-2.5 sm:gap-4 sm:px-5 sm:py-4 md:px-8">
        <SmartNavLink className="flex items-center shrink-0" href="/">
          <Image
            src={logoAssets.main.src}
            alt={logoAssets.main.alt}
            width={logoAssets.main.width}
            height={logoAssets.main.height}
            priority
            className="h-8 w-auto object-contain sm:h-10 md:h-11"
          />
        </SmartNavLink>

        <nav className="hidden items-center gap-4.5 lg:gap-7 xl:gap-8 text-sm md:flex">
          {navItems.map((item) => {
            const active = isNavItemActive(item.href, pathname, activeSection);
            return (
              <SmartNavLink
                className={`relative pb-1 font-medium transition ${
                  active
                    ? "font-bold text-[#45a02e]"
                    : "text-slate-600 hover:text-[#45a02e]"
                }`}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </SmartNavLink>
            );
          })}

          {/* Perusahaan Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleCompanyMouseEnter}
            onMouseLeave={handleCompanyMouseLeave}
            ref={companyRef}
          >
            <button
              aria-expanded={companyOpen}
              aria-haspopup="true"
              className={`group flex items-center gap-1.5 pb-1 font-medium transition cursor-pointer select-none ${
                isCompanyHighlighted
                  ? "font-bold text-[#45a02e]"
                  : "text-slate-600 hover:text-[#45a02e]"
              }`}
              onClick={() => setCompanyOpen((v) => !v)}
              type="button"
            >
              <span>{t.nav.company ?? "Perusahaan"}</span>
              <ChevronDown
                className={`size-3.5 transition-transform duration-200 ${
                  companyOpen
                    ? "rotate-180 text-[#45a02e]"
                    : isCompanyActive
                      ? "text-[#45a02e]"
                      : "text-slate-400 group-hover:text-[#45a02e]"
                }`}
              />
            </button>

            {/* Dropdown Card */}
            {companyOpen && (
              <div className="absolute left-0 top-full pt-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="min-w-[130px] rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
                  {companyItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <SmartNavLink
                        className={`block rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                          active
                            ? "bg-[#edf8ea] text-[#45a02e] font-semibold"
                            : "text-slate-600 hover:bg-slate-50 hover:text-[#45a02e]"
                        }`}
                        href={item.href}
                        key={item.label}
                        onNavigate={() => setCompanyOpen(false)}
                      >
                        {item.label}
                      </SmartNavLink>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative hidden md:block" ref={menuRef}>
            <button
              className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition"
              onClick={() => setOpen((v) => !v)}
              type="button"
            >
              <Globe className="size-3.5 text-slate-500" />
              <span>{lang.toUpperCase()}</span>
              <ChevronDown className={`size-3 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-2 w-32 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-xl">
                {(
                  [
                    { code: "id", label: "Indonesia" },
                    { code: "en", label: "English" },
                  ] as const
                ).map((option) => (
                  <button
                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-lime-50 ${brandClasses.hoverTextPrimary}`}
                    key={option.code}
                    onClick={() => {
                      setLang(option.code);
                      setOpen(false);
                    }}
                    type="button"
                  >
                    {option.label}
                    {lang === option.code && <Check className={`size-3.5 ${brandClasses.textPrimary}`} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <SmartNavLink
            className="inline-flex h-9 sm:h-10 items-center justify-center rounded-full bg-[#48b02c] hover:bg-[#3ea023] text-white px-5 sm:px-6 text-xs sm:text-sm font-bold shadow-[0_4px_14px_rgba(72,176,44,0.35)] transition-all duration-200 hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
            href={DASHBOARD_URL}
          >
            {t.header.cta}
          </SmartNavLink>

          <button
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t.accessibility.closeMenu : t.accessibility.openMenu}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-slate-900 transition-colors hover:bg-slate-50 md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            type="button"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white/98 backdrop-blur-xl px-4 py-4 md:hidden shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => {
              const active = isNavItemActive(item.href, pathname, activeSection);
              return (
                <SmartNavLink
                  className={`rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-[#edf8ea] text-[#45a02e] font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  href={item.href}
                  key={item.label}
                  onNavigate={() => setMobileOpen(false)}
                >
                  {item.label}
                </SmartNavLink>
              );
            })}

            {/* Perusahaan Mobile Accordion */}
            <div className="pt-0.5">
              <button
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                  isCompanyActive
                    ? "bg-[#edf8ea] text-[#45a02e] font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                onClick={() => setMobileCompanyOpen((v) => !v)}
                type="button"
              >
                <span>{t.nav.company ?? "Perusahaan"}</span>
                <ChevronDown
                  className={`size-4 transition-transform duration-200 ${
                    mobileCompanyOpen ? "rotate-180 text-[#45a02e]" : "text-slate-400"
                  }`}
                />
              </button>

              {mobileCompanyOpen && (
                <div className="mt-1 space-y-1 pl-3">
                  {companyItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <SmartNavLink
                        className={`block rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                          active
                            ? "bg-lime-50/70 text-[#45a02e] font-semibold"
                            : "text-slate-600 hover:bg-slate-50 hover:text-[#45a02e]"
                        }`}
                        href={item.href}
                        key={item.label}
                        onNavigate={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </SmartNavLink>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>
          <div className="mx-auto mt-3 flex max-w-7xl items-center justify-between border-t border-zinc-100 pt-3">
            <span className="text-xs font-medium text-slate-400">Bahasa / Language:</span>
            <div className="flex gap-2">
              {(["id", "en"] as const).map((code) => (
                <button
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase transition ${
                    lang === code
                      ? `${brandClasses.borderPrimary} ${brandClasses.bgPrimary} text-black shadow-sm`
                      : "border-zinc-200 text-slate-600 hover:bg-slate-50"
                  }`}
                  key={code}
                  onClick={() => {
                    setLang(code);
                    setMobileOpen(false);
                  }}
                  type="button"
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
