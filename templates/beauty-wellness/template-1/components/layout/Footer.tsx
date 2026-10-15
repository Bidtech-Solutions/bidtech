"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const { t, locale } = useLanguage();

  const navLabels: Record<string, string> = {
    "/fasilitas": t.nav.facilities,
    "/trainer": t.nav.trainer,
    "/membership": t.nav.membership,
    "/testimoni": t.nav.testimonials,
    "/lokasi": t.nav.locations,
  };
  const currentYear = new Date().getFullYear();

  const whatsappUrl = createWhatsAppUrl(
    locale === "en"
      ? `Hello Admin ${siteConfig.brand.name}, I would like to inquire about membership packages and club facilities.`
      : `Halo Admin ${siteConfig.brand.name}, saya ingin konsultasi mengenai pilihan paket membership dan fasilitas gym di ${siteConfig.brand.name}.`
  );

  return (
    <footer className="bg-[#0b0b0b] text-white">
      <Container>
        <div className="grid gap-8 py-12 sm:gap-12 sm:py-16 md:py-20 lg:grid-cols-[1.4fr_0.6fr_0.6fr_0.8fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Logo size="lg" withTagline />

            <p className="mt-6 text-sm leading-7 text-white/55">
              {t.footer.description}
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:text-white"
            >
              {t.footer.contactUs}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
              {t.footer.navigation}
            </p>

            <nav className="mt-5 flex flex-col gap-3.5">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-white/65 transition-colors hover:text-white"
                >
                  {navLabels[item.href] || item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
              {t.footer.social}
            </p>

            <div className="mt-5 flex flex-col gap-3.5">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
              >
                <FaInstagram size={15} />
                Instagram
              </a>

              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
              >
                <FaYoutube size={15} />
                YouTube
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
              {t.footer.contact}
            </p>

            <div className="mt-5 space-y-2.5 text-sm leading-6 text-white/65">
              <p>{siteConfig.contact.phone}</p>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="block transition-colors hover:text-white"
              >
                {siteConfig.contact.email}
              </a>

              <p>{siteConfig.contact.address}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} {siteConfig.brand.name}. {t.footer.copyright}
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <LanguageSwitcher variant="footer" />
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              {t.footer.privacyPolicy}
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-white"
            >
              {t.footer.termsOfService}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
