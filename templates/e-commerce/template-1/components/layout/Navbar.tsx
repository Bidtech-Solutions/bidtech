"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { t, language } = useLanguage();

  const navLinks = [
    { name: t.nav.home, href: "/", id: "home" },
    { name: t.nav.products, href: "/produk", id: "produk" },
    { name: t.nav.accessories, href: "/aksesoris", id: "aksesoris" },
    { name: t.nav.about, href: "/tentang-kami", id: "tentang" },
    { name: t.nav.contact, href: "/kontak", id: "kontak" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Deteksi event scroll untuk efek sticky floating header yang konsisten
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animasi menu mobile
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo(
        ".mobile-nav-item",
        { y: -10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.25,
          stagger: 0.04,
          delay: 0.08,
          ease: "power2.out",
        }
      );
    }
  }, [isMobileMenuOpen]);

  const handleClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-border shadow-[0_8px_30px_rgba(0,0,0,0.06)] py-2.5 sm:py-3"
          : "bg-background/90 backdrop-blur-sm border-b border-border/70 shadow-none py-3.5 sm:py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            prefetch={true}
            className="flex-shrink-0 flex items-center transition-transform hover:scale-102"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.webp"
              alt="KONTERKU Smartphone Store"
              className={cn(
                "w-auto object-contain mix-blend-multiply transition-all duration-300",
                isScrolled ? "h-7 sm:h-8 md:h-9" : "h-8 sm:h-9 md:h-10"
              )}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-7">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch={true}
                  scroll={true}
                  onClick={handleClick}
                  className={cn(
                    "text-sm font-medium transition-all relative py-1 hover:text-gold-600 cursor-pointer",
                    isActive
                      ? "text-gold-600 font-bold"
                      : "text-ink-800 hover:text-ink-900"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gold-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions: Language Switcher & WhatsApp */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                language === "en"
                  ? "Hello KONTERKU, I would like to inquire about your smartphone products"
                  : "Halo KONTERKU, saya ingin bertanya tentang produk smartphone"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#F4C87F] via-[#E8B45E] to-[#DC9F3C] text-xs sm:text-sm font-bold text-ink-900 shadow-sm border border-gold-300/40 hover:opacity-95 hover:shadow-md active:scale-[0.98] transition-all duration-200",
                isScrolled ? "px-4 py-2" : "px-5 py-2.5"
              )}
            >
              <div className="w-5 h-5 rounded-full bg-ink-900/10 flex items-center justify-center mr-2">
                <WhatsappIcon className="w-3.5 h-3.5 text-ink-900" />
              </div>
              {t.nav.chatWa}
            </a>
          </div>

          {/* Mobile Actions: Hamburger Toggle Only */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-ink-800 hover:text-gold-500 p-2 rounded-xl border border-border/70 bg-white transition-transform duration-300 active:scale-90 shadow-xs"
              aria-label="Toggle Menu"
            >
              <div
                className={`transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-90" : "rotate-0"
                }`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-background transition-all duration-300 ease-in-out",
          isMobileMenuOpen
            ? "max-h-[calc(100vh-76px)] overflow-y-auto opacity-100 border-b border-border shadow-xl py-5 px-6 pointer-events-auto"
            : "max-h-0 overflow-hidden opacity-0 border-b-0 py-0 px-6 pointer-events-none shadow-none"
        )}
      >
        <div className="flex flex-col space-y-3">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                prefetch={true}
                scroll={true}
                onClick={handleClick}
                className={cn(
                  "mobile-nav-item text-base font-medium py-2.5 px-3.5 rounded-xl transition-all cursor-pointer",
                  isActive
                    ? "text-gold-600 font-bold bg-gold-50/80 border border-gold-200/60 shadow-xs"
                    : "text-ink-800 hover:text-gold-600 hover:bg-surface-soft"
                )}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Switcher Bahasa di dalam Drawer Mobile */}
          <div className="mobile-nav-item pt-3 pb-1 border-t border-border/70 flex items-center justify-between px-1">
            <span className="text-xs font-bold text-text-500 uppercase tracking-wider">
              {language === "en" ? "Language" : "Bahasa"}
            </span>
            <LanguageSwitcher showIcon={true} />
          </div>

          <div className="mobile-nav-item pt-1">
            <a
              href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                language === "en"
                  ? "Hello KONTERKU, I would like to inquire about your smartphone products"
                  : "Halo KONTERKU, saya ingin bertanya tentang produk smartphone"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#F4C87F] via-[#E8B45E] to-[#DC9F3C] px-5 py-3 text-sm font-bold text-ink-900 shadow-sm transition-all active:scale-98"
            >
              <WhatsappIcon className="w-4 h-4 mr-2 text-ink-900" />
              {t.nav.chatWa}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
