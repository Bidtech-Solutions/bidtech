"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUp,
  ArrowRight,
  Utensils,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { DynamicTextSlider } from "@/components/ui/dynamic-text-slider";
import { RevealText } from "@/components/ui/reveal-text";
import { useLanguage } from "@/components/providers/language-provider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const culinaryImages = [
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
];

export function Footer() {
  const { t } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const linksGridRef = useRef<HTMLDivElement>(null);
  const megaTextRef = useRef<HTMLHeadingElement>(null);

  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [timeString, setTimeString] = useState("");

  // Real-time clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      // Hero CTA Reveal
      if (heroCtaRef.current) {
        gsap.fromTo(
          heroCtaRef.current,
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: heroCtaRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "all",
          }
        );
      }

      // Links & Newsletter Stagger
      if (linksGridRef.current) {
        gsap.fromTo(
          linksGridRef.current.children,
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: linksGridRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out",
            clearProps: "all",
          }
        );
      }

      // Mega Background Kinetic Text Parallax Scrub
      if (megaTextRef.current && footerRef.current) {
        gsap.fromTo(
          megaTextRef.current,
          { y: 60, opacity: 0.12 },
          {
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1.2,
            },
            y: -20,
            opacity: 0.4,
            ease: "none",
          }
        );
      }
    },
    { scope: footerRef }
  );

  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number | string, opts?: { duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 2800);
  };

  const navLinks = [
    { label: t("Menu Interaktif", "Interactive Menu"), href: "/menu" },
    { label: t("Staf & Koki Kami", "Our Culinary Staff"), href: "/staff" },
    { label: t("Kisah & Filosofi Kami", "Our Story & Quality"), href: "/story" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-white dark:bg-[#0a0a0d] text-foreground dark:text-white pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-10 overflow-hidden transition-colors duration-300 border-t border-border/40"
    >
      {/* Dynamic Ambient Backdrops */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-[170px] pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-10"
      />

      <div className="container-app relative z-10 flex flex-col gap-6 sm:gap-10 md:gap-12">
        {/* Top Hero Statement & Major Call to Action */}
        <div ref={heroCtaRef} className="max-w-4xl mx-auto text-center">
          <p className="text-eyebrow mb-2 sm:mb-3 tracking-widest text-brand-500">
            {t("Rasakan Kesungguhan Rasa", "Experience The Obsession")}
          </p>

          <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-foreground dark:text-white leading-tight text-balance mb-2.5 sm:mb-5">
            {t("Diciptakan untuk penikmat", "Crafted for people who")}{" "}
            <DynamicTextSlider>
              <RevealText
                text="CARE"
                textColor="text-foreground dark:text-white"
                overlayColor="text-brand-500"
                letterImages={culinaryImages}
                className="font-display"
              />
            </DynamicTextSlider>{" "}
            {t("makanan berkualitas.", "about great food.")}
          </h2>

          <p className="text-xs sm:text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-5 sm:mb-8">
            {t(
              "Dari tungku api 500°C kami hingga pasta telur segar yang digilas tangan setiap hari, kami mengundang Anda merasakan pengalaman bersantap tanpa kompromi.",
              "From our 900°F wood-fired ovens to silky daily hand-rolled pasta, we invite you to experience dining without compromises."
            )}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4">
            <a
              href="/menu"
              onClick={(e) => handleNavClick(e, "/menu")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-base shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <Utensils className="size-4 sm:size-4.5" />
              {t("Jelajahi Seluruh Menu", "Explore Full Menu")}
              <ArrowRight className="size-4 sm:size-4.5" />
            </a>

            <a
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/15 text-foreground dark:text-white font-semibold text-xs sm:text-base backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <Calendar className="size-3.5 sm:size-4 text-brand-500" />
              {t("Reservasi Meja", "Reserve A Table")}
            </a>
          </div>
        </div>

        {/* 4 Columns: Navigation, Socials, Newsletter */}
        <div
          ref={linksGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 pb-4 sm:pb-10 pt-4 border-t border-border/40 dark:border-white/5"
        >
          {/* Brand Info */}
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="flex items-center gap-2.5 font-display font-black text-xl sm:text-2xl md:text-3xl tracking-tight text-foreground dark:text-white hover:text-brand-500 transition-colors mb-2 sm:mb-3 group"
            >
              <div className="size-8 sm:size-9 rounded-xl overflow-hidden bg-neutral-950 border border-white/10 shadow-glow shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src="/logo.png"
                  alt="Deny Restaurant Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span>Deny Restaurant<span className="text-brand-500">.</span></span>
            </a>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4">
              {t(
                "Bistro artisan modern yang menyajikan pizza fermentasi kayu bakar, burger smash, dan pasta telur segar.",
                "Modern artisanal bistro celebrating wood-fired sourdough pizza, smash burgers, and fresh pasta."
              )}
            </p>
            <div className="text-xs text-muted-foreground">
              {t("Waktu Dapur Lokal:", "Local Kitchen Time:")} <span className="text-foreground dark:text-gray-300 font-mono font-semibold">{timeString || "11:55 AM"}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-display font-bold text-xs sm:text-sm uppercase tracking-wider text-foreground dark:text-white mb-2.5 sm:mb-4">
              {t("Navigasi Cepat", "Quick Navigation")}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-brand-500 transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span className="size-1 rounded-full bg-brand-500" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Ecosystem */}
          <div>
            <h4 className="font-display font-bold text-xs sm:text-sm uppercase tracking-wider text-foreground dark:text-white mb-2.5 sm:mb-4">
              {t("Komunitas & Sosial", "Social Community")}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3 sm:mb-4">
              {t(
                "Ikuti sajian harian spesial kami, proses fermentasi adonan di balik layar, dan menu rahasia.",
                "Follow our daily kitchen specials, behind-the-scenes dough fermentation, and secret off-menu drops."
              )}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="size-8 sm:size-10 rounded-full bg-neutral-100 dark:bg-white/5 hover:bg-brand-500 text-foreground dark:text-white hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
              >
                <FaInstagram className="size-3.5 sm:size-4.5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="size-8 sm:size-10 rounded-full bg-neutral-100 dark:bg-white/5 hover:bg-brand-500 text-foreground dark:text-white hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
              >
                <FaTiktok className="size-3.5 sm:size-4.5" />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="size-8 sm:size-10 rounded-full bg-neutral-100 dark:bg-white/5 hover:bg-brand-500 text-foreground dark:text-white hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
              >
                <FaWhatsapp className="size-3.5 sm:size-4.5" />
              </a>
            </div>
          </div>

          {/* Tasting Club Newsletter */}
          <div>
            <h4 className="font-display font-bold text-xs sm:text-sm uppercase tracking-wider text-foreground dark:text-white mb-2.5 sm:mb-4">
              {t("Klub Cicip Deny", "The Tasting Club")}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3 sm:mb-4">
              {t(
                "Berlangganan untuk catatan mingguan koki, undangan mencicipi khusus, dan penawaran rahasia.",
                "Subscribe to receive weekly chef notes, private tasting invitations, and special perks."
              )}
            </p>

            {isSubscribed ? (
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>{t("Anda telah terdaftar di Klub Cicip!", "You're enrolled in the Tasting Club!")}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("Alamat email Anda", "Your email address")}
                  className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-neutral-100 dark:bg-white/5 text-foreground dark:text-white text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                />
                <button
                  type="submit"
                  className="w-full py-2 sm:py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-glow transition-all duration-200 cursor-pointer"
                >
                  {t("Gabung Meja Cicip", "Join Tasting Table")}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Mega Giant Brand Kinetic Text - Hidden on Mobile */}
        <div className="hidden md:block relative py-1 sm:py-2 text-center select-none overflow-hidden pointer-events-none">
          <h2
            ref={megaTextRef}
            className="font-display font-black text-[11vw] leading-[0.8] tracking-[-0.05em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-black/10 via-black/5 to-transparent dark:from-white/20 dark:via-white/10 to-transparent will-change-transform"
          >
            DENY RESTAURANT
          </h2>
        </div>

        {/* Bottom Utility Bar & GSAP Back to Top */}
        <div className="pt-3 sm:pt-6 border-t border-border/40 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Deny Restaurant. {t("Seluruh hak cipta dilindungi.", "All rights reserved.")}</p>

          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#privacy" className="hover:text-brand-500 transition-colors">{t("Kebijakan Privasi", "Privacy Policy")}</a>
            <a href="#terms" className="hover:text-brand-500 transition-colors">{t("Ketentuan Restoran", "Terms of Dining")}</a>
          </div>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-neutral-100 dark:bg-white/5 hover:bg-brand-500 text-foreground dark:text-white hover:text-white font-semibold transition-all duration-300 cursor-pointer shadow-xs text-xs"
          >
            <span>{t("Kembali ke atas", "Back to top")}</span>
            <div className="size-5 sm:size-6 rounded-full bg-black/5 dark:bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
              <ArrowUp className="size-3 sm:size-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
