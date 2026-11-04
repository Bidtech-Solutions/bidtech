"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.97-4.48V8.62a8.28 8.28 0 0 0 3.8 1.52V6.69z"/>
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-border/80 pt-16 pb-20 sm:pb-12 text-txt-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid: 2 Columns on Mobile, 5 Columns on Tablet & Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-8 md:gap-x-5 lg:gap-10 mb-12 sm:mb-14">
          
          {/* Col 1: Brand Info (span 2 on mobile, span 4 on md & desktop) */}
          <div className="col-span-2 md:col-span-4 space-y-3.5 pb-2 sm:pb-0 border-b border-border/50 sm:border-0">
            <Link href="/" className="inline-flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.webp"
                alt="KONTERKU Logo"
                className="h-8 sm:h-9 w-auto object-contain mix-blend-multiply"
              />
            </Link>
            
            <p className="text-xs sm:text-[13.5px] text-txt-500 leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-2.5 pt-1">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-border/90 flex items-center justify-center text-ink-800 hover:bg-gold-50 hover:border-gold-400 hover:text-gold-600 transition-all"
                aria-label="WhatsApp"
              >
                <WhatsappIcon className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com/kounterku.store"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-border/90 flex items-center justify-center text-ink-800 hover:bg-gold-50 hover:border-gold-400 hover:text-gold-600 transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-border/90 flex items-center justify-center text-ink-800 hover:bg-gold-50 hover:border-gold-400 hover:text-gold-600 transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-border/90 flex items-center justify-center text-ink-800 hover:bg-gold-50 hover:border-gold-400 hover:text-gold-600 transition-all"
                aria-label="TikTok"
              >
                <TiktokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Menu (span 1 on mobile, span 2 on md/lg) */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="font-bold text-ink-900 text-sm sm:text-[15px]">
              {t.footer.menu}
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13.5px]">
              <li>
                <Link href="/" className="hover:text-gold-600 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/produk" className="hover:text-gold-600 transition-colors">
                  {t.nav.products}
                </Link>
              </li>
              <li>
                <Link href="/aksesoris" className="hover:text-gold-600 transition-colors">
                  {t.nav.accessories}
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="hover:text-gold-600 transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-gold-600 transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Kategori (span 1 on mobile, span 2 on md/lg) */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="font-bold text-ink-900 text-sm sm:text-[15px]">
              {t.footer.categories}
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13.5px]">
              <li>
                <Link href="/produk?category=HP+Baru" className="hover:text-gold-600 transition-colors">
                  {t.footer.categoryNew}
                </Link>
              </li>
              <li>
                <Link href="/produk?category=Second" className="hover:text-gold-600 transition-colors">
                  {t.footer.categorySecond}
                </Link>
              </li>
              <li>
                <Link href="/aksesoris" className="hover:text-gold-600 transition-colors">
                  {t.nav.accessories}
                </Link>
              </li>
              <li>
                <Link href="/produk?category=Tablet" className="hover:text-gold-600 transition-colors">
                  {t.productCatalog.categories.tablet}
                </Link>
              </li>
              <li>
                <Link href="/aksesoris?category=Audio" className="hover:text-gold-600 transition-colors">
                  {t.accessoriesPage.categories.audio}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Informasi (span 1 on mobile, span 2 on md/lg) */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="font-bold text-ink-900 text-sm sm:text-[15px]">
              {t.footer.information}
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13.5px]">
              <li>
                <Link href="/tentang-kami#cara-pembelian" className="hover:text-gold-600 transition-colors">
                  {t.footer.howToBuy}
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami#garansi-retur" className="hover:text-gold-600 transition-colors">
                  {t.footer.warrantyReturn}
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami#pengiriman" className="hover:text-gold-600 transition-colors">
                  {t.footer.shipping}
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami#syarat-ketentuan" className="hover:text-gold-600 transition-colors">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami#kebijakan-privasi" className="hover:text-gold-600 transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Kontak (span 1 on mobile, span 2 on md/lg) */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="font-bold text-ink-900 text-sm sm:text-[15px]">
              {t.footer.contact}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13.5px]">
              <li>
                <a 
                  href="https://wa.me/6281234567890" 
                  className="flex items-center gap-1.5 hover:text-gold-600 transition-colors"
                >
                  <PhoneIcon className="w-3.5 h-3.5 text-ink-900 flex-shrink-0" />
                  <span className="truncate">0812-3456-7890</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/kounterku.store" 
                  className="flex items-center gap-1.5 hover:text-gold-600 transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-ink-900 flex-shrink-0" />
                  <span className="truncate">@kounterku.store</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:kounterku@gmail.com" 
                  className="flex items-center gap-1.5 hover:text-gold-600 transition-colors"
                >
                  <MailIcon className="w-3.5 h-3.5 text-ink-900 flex-shrink-0" />
                  <span className="truncate">kounterku@...</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/70 text-center">
          <p className="text-xs sm:text-[13px] text-txt-400">
            &copy; 2024 KONTERKU. {t.footer.rights}
          </p>
        </div>

      </div>
    </footer>
  );
}
