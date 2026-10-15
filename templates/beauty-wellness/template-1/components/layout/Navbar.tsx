"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function Navbar() {
  const pathname = usePathname();
  const { t, locale } = useLanguage();

  const navLabels: Record<string, string> = {
    "/fasilitas": t.nav.facilities,
    "/trainer": t.nav.trainer,
    "/membership": t.nav.membership,
    "/testimoni": t.nav.testimonials,
    "/lokasi": t.nav.locations,
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const whatsappUrl = createWhatsAppUrl(
    locale === "en"
      ? `Hello Admin ${siteConfig.brand.name}, I would like to join as a new member. Could you please share the membership packages and current promo info?`
      : `Halo Admin ${siteConfig.brand.name}, saya ingin mendaftar keanggotaan baru di ${siteConfig.brand.name}. Boleh minta info pilihan paket membership dan promo yang berlaku saat ini?`
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          "transition-all duration-500",

          isScrolled || pathname !== "/"
            ? [
                "border-b border-white/10",
                "bg-[#0b0b0b]/85",
                "py-3",
                "text-white",
                "backdrop-blur-xl",
              ]
            : [
                "bg-transparent",
                "py-5",
                "text-white",
              ]
        )}
      >
        <div className="site-container flex items-center justify-between">
          <Logo size="md" />

          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Main navigation"
          >
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative text-[13px] font-medium",
                    "transition-colors duration-300",

                    "after:absolute after:-bottom-2 after:left-0",
                    "after:h-px",
                    "after:bg-[var(--color-primary)]",
                    "after:transition-all after:duration-300",

                    isActive
                      ? "text-white after:w-full font-semibold"
                      : "text-white/65 after:w-0 hover:text-white hover:after:w-full"
                  )}
                >
                  {(navLabels[item.href] || item.label)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <LanguageSwitcher variant="navbar" />
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group inline-flex items-center gap-2",
                "rounded-full",
                "bg-[var(--color-primary)]",
                "px-5 py-3",
                "text-xs font-semibold uppercase tracking-[0.08em]",
                "text-white",
                "transition-all duration-300",
                "hover:bg-[var(--color-primary-hover)]"
              )}
            >
              {locale === "id" ? "Daftar" : "Join Now"}

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div className="flex items-center gap-2.5 lg:hidden">
            <LanguageSwitcher variant="navbar" />
            <button
              type="button"
              aria-label={isMenuOpen ? (locale === "id" ? "Tutup menu" : "Close menu") : (locale === "id" ? "Buka menu" : "Open menu")}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
              className="relative z-50 flex size-10 items-center justify-center rounded-full border border-white/20 text-white"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.25,
            }}
            className="fixed inset-0 z-40 flex flex-col bg-[#0b0b0b] text-white lg:hidden"
          >
            <div className="site-container flex min-h-full flex-col justify-between overflow-y-auto px-4 pb-8 pt-24">
              <nav className="flex flex-col divide-y divide-white/10">
                {siteConfig.navigation.map((item, index) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <motion.div
                      key={item.label}
                      initial={{
                        opacity: 0,
                        x: -16,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        delay: 0.04 + index * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-center justify-between py-3.5"
                      >
                        <span className={cn(
                          "font-heading text-2xl font-bold uppercase tracking-tight sm:text-3xl",
                          isActive ? "text-[var(--color-primary)]" : "text-white"
                        )}>
                          {(navLabels[item.href] || item.label)}
                        </span>

                        <span className="font-heading text-xs font-semibold tracking-[0.2em] text-[var(--color-primary)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                <LanguageSwitcher variant="mobile" />

                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[var(--color-primary)] px-6 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[var(--color-primary)]/20"
                >
                  {t.nav.cta}
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
