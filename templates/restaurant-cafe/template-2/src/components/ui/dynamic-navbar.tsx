"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Sun, Moon, Utensils } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

export interface DynamicNavbarProps {
  brand?: string;
  items?: NavItem[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
}

const defaultItems: NavItem[] = [
  { label: "Menu", href: "/menu" },
  { label: "Staff", href: "/staff" },
  { label: "Story", href: "/story" },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export function DynamicNavbar({
  brand = "Deny Restaurant",
  items = defaultItems,
  ctaLabel = "Order",
  onCtaClick,
  className,
}: DynamicNavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (saved === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (!href) return;

    if (!href.startsWith("#")) {
      router.push(href);
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: Element | string, opts?: { offset?: number; duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    } else {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "fixed top-6 sm:top-7 md:top-8 left-1/2 -translate-x-1/2 z-50",
        className
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        scale: hovered ? 1.02 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 28,
        delay: 0.4,
        scale: { type: "spring", stiffness: 380, damping: 24, delay: 0 },
      }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-[28px] pointer-events-none -z-10"
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1.08 : 0.95,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
        style={{
          background:
            "radial-gradient(closest-side, rgb(255 90 31 / 0.35), transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      <motion.div
        className={cn(
          "relative overflow-hidden border",
          scrolled
            ? "bg-background/85 border-border shadow-xl backdrop-blur-2xl"
            : "bg-background/70 border-border/70 shadow-lg backdrop-blur-xl",
        )}
        animate={{
          borderRadius: open ? 24 : 9999,
          boxShadow: hovered
            ? "0 20px 50px -12px rgb(0 0 0 / 0.25), 0 0 0 1px rgb(255 90 31 / 0.15)"
            : "0 10px 30px -8px rgb(0 0 0 / 0.18)",
        }}
        transition={{
          borderRadius: {
            duration: 0.3,
            ease: easeOut,
            delay: open ? 0 : 0.2,
          },
          boxShadow: { duration: 0.25 },
        }}
      >
        {/* Centered Floating Pill Header */}
        <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2">
          {/* Logo & Brand Link */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label="Deny Restaurant Home"
            className="flex items-center gap-2 font-display font-extrabold text-sm sm:text-base px-2.5 sm:px-3 py-1 text-foreground select-none whitespace-nowrap hover:text-brand-500 transition-colors group"
          >
            <div className="relative size-7 sm:size-8 rounded-lg overflow-hidden bg-neutral-950 border border-white/10 shadow-glow group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/logo.png"
                alt="Deny Restaurant Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="tracking-tight">{brand}</span>
          </Link>

          {/* Desktop Navigation Links */}
          <span className="hidden md:flex items-center gap-1 mx-1">
            <span className="h-4 w-px bg-border" />
            {items.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium hover:text-foreground hover:bg-muted/80 hover:backdrop-blur-md transition-colors rounded-full",
                  pathname === item.href
                    ? "text-foreground bg-muted/80"
                    : "text-muted-foreground",
                )}
              >
                {item.label}
              </motion.a>
            ))}
            <span className="h-4 w-px bg-border" />
          </span>

          {/* Desktop Language Switcher */}
          <div className="hidden md:inline-flex items-center">
            <LanguageSwitcher compact />
          </div>

          {/* Desktop Theme Switcher */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="hidden md:inline-flex items-center justify-center size-8 rounded-full text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="size-4 text-amber-400" />
            ) : (
              <Moon className="size-4 text-gray-700" />
            )}
          </motion.button>

          {/* Desktop CTA Button */}
          <motion.button
            onClick={onCtaClick}
            whileHover={{ scale: 1.08, y: -1 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-brand-500 hover:text-primary-foreground hover:shadow-glow transition-colors cursor-pointer"
          >
            <ShoppingBag className="size-3.5" strokeWidth={2.5} />
            {ctaLabel}
          </motion.button>

          {/* Mobile Actions: Language Switcher + Hamburger */}
          <div className="md:hidden flex items-center gap-1.5">
            <LanguageSwitcher compact showIcon={false} />

            <motion.button
              onClick={() => setOpen((v) => !v)}
              whileTap={{ scale: 0.92 }}
              className="relative flex items-center justify-center size-8 rounded-full text-foreground hover:bg-muted transition-colors cursor-pointer"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <AnimatePresence initial={false} mode="wait">
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18, ease: easeOut }}
                    className="absolute"
                  >
                    <X className="size-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18, ease: easeOut }}
                    className="absolute"
                  >
                    <Menu className="size-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mobile-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.28,
                ease: easeOut,
              }}
              className="md:hidden overflow-hidden min-w-[260px] sm:min-w-[280px]"
            >
              <div className="px-3 pb-3 pt-1 flex flex-col gap-1 border-t border-border/50">
                {items.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      setOpen(false);
                      handleNavClick(e, item.href);
                    }}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{
                      duration: 0.2,
                      ease: easeOut,
                      delay: 0.04 * i,
                    }}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between",
                      pathname === item.href
                        ? "bg-brand-500/10 text-brand-500 font-bold"
                        : "text-foreground hover:bg-muted",
                    )}
                  >
                    <span>{item.label}</span>
                    {pathname === item.href && (
                      <span className="size-1.5 rounded-full bg-brand-500" />
                    )}
                  </motion.a>
                ))}

                {/* Mobile Drawer Language Row */}
                <div className="flex items-center justify-between px-3.5 py-2 my-0.5 rounded-xl bg-muted/60">
                  <span className="text-xs font-semibold text-foreground">
                    {t("Bahasa", "Language")}
                  </span>
                  <LanguageSwitcher compact showIcon={false} />
                </div>

                {/* Mobile Drawer Theme Row */}
                <div className="flex items-center justify-between px-3.5 py-2 my-0.5 rounded-xl bg-muted/60">
                  <span className="text-xs font-semibold text-foreground">
                    {t("Tampilan Tema", "Appearance")}
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-background text-foreground shadow-xs cursor-pointer border border-border"
                  >
                    {isDark ? <Sun className="size-3.5 text-amber-400" /> : <Moon className="size-3.5 text-gray-700" />}
                    {isDark ? t("Gelap", "Dark") : t("Terang", "Light")}
                  </button>
                </div>

                <motion.button
                  onClick={() => {
                    setOpen(false);
                    onCtaClick?.();
                  }}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{
                    duration: 0.2,
                    ease: easeOut,
                    delay: 0.04 * items.length,
                  }}
                  className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-bold shadow-glow hover:bg-brand-600 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="size-4" strokeWidth={2.5} />
                  {ctaLabel}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
}
