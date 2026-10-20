'use client';

import Link from 'next/link';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { BRAND, FOOTER_LINKS } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, isEn } = useLanguage();
  const currentYear = new Date().getFullYear();

  const linksData = isEn ? FOOTER_LINKS.EN : FOOTER_LINKS.ID;

  return (
    <footer className="bg-cream text-ink border-t border-cocoa/10">
      <div className="shell py-16 md:py-20">
        <Stagger className="grid gap-10 md:grid-cols-4" stagger={0.1}>
          {/* Kolom 1 — Brand */}
          <StaggerItem className="md:col-span-1">
            <p className="mb-4 text-sm font-extrabold uppercase tracking-eyebrow text-ink">
              {BRAND.name}
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-cocoa/80">
              {isEn ? BRAND.descriptionEn : BRAND.description}
            </p>
          </StaggerItem>

          {/* Kolom 2 — Tautan Cepat */}
          {Object.entries(linksData).map(([heading, links]) => (
            <StaggerItem key={heading}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-eyebrow text-ink">
                {heading}
              </p>
              <ul className="space-y-2.5 text-sm">
                {links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="transition-colors duration-300 hover:text-gold text-cocoa/80"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}

          {/* Kolom 3 — Lokasi */}
          <StaggerItem>
            <p className="mb-4 text-xs font-semibold uppercase tracking-eyebrow text-ink">
              {t.footer.location}
            </p>
            <p className="max-w-[15rem] text-sm leading-relaxed text-cocoa/80">{BRAND.address}</p>
            <a
              href={`tel:${BRAND.phone.replace(/-/g, '')}`}
              className="mt-3 inline-block text-sm transition-colors duration-300 hover:text-gold font-medium"
            >
              {BRAND.phone}
            </a>
          </StaggerItem>

          {/* Kolom 4 — Ikuti Kami */}
          <StaggerItem>
            <p className="mb-4 text-xs font-semibold uppercase tracking-eyebrow text-ink">
              {t.footer.followUs}
            </p>
            <ul className="flex gap-3">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 transition-colors duration-300 hover:border-[#9E3B2B] hover:text-[#9E3B2B]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 transition-colors duration-300 hover:border-[#9E3B2B] hover:text-[#9E3B2B]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 transition-colors duration-300 hover:border-[#9E3B2B] hover:text-[#9E3B2B]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </a>
              </li>
            </ul>
          </StaggerItem>
        </Stagger>

        <Reveal>
          <div className="mt-14 flex flex-col gap-4 border-t border-ink/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {currentYear} {BRAND.name}. {t.footer.copyright}</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-gold transition-colors">{t.footer.privacy}</Link>
              <Link href="#" className="hover:text-gold transition-colors">{t.footer.terms}</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
