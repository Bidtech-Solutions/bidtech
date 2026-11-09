"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaTiktok,
  FaFacebookF,
} from "react-icons/fa6";

import { SmartNavLink } from "@/components/layouts/smart-nav-link";
import { useLanguage } from "@/lib/i18n";

const socialLinks = [
  {
    icon: FaEnvelope,
    href: "mailto:cs@bidtech.co.id",
    label: "Email",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/bidtechsolutions/",
    label: "Instagram",
  },
  {
    icon: FaTiktok,
    href: "https://www.tiktok.com/@bidtechsolutions?is_from_webapp=1&sender_device=pc",
    label: "TikTok",
  },
  {
    icon: FaFacebookF,
    href: "https://www.facebook.com/profile.php?id=61592059225349",
    label: "Facebook",
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/628217601455",
    label: "WhatsApp",
  },
];

export function SiteFooter() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <footer className="relative bg-white text-slate-900 border-t border-slate-200/80 pt-12 pb-8 sm:pt-16 sm:pb-10">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* Main 4-Column Grid: Brand Info & 3 Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-10 sm:pb-12">
          {/* Column 1: Brand Logo, Description & 5 Rounded Square Social Buttons */}
          <div className="md:col-span-5 lg:col-span-4 space-y-5 text-left">
            <Link href={isEn ? "/en" : "/id"} className="inline-block">
              <Image
                src="/logo/Logo.webp"
                alt="BidTech Logo"
                width={200}
                height={48}
                className="h-8 sm:h-9 w-auto object-contain"
                priority
              />
            </Link>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              {isEn
                ? "AI-powered instant website creation platform with high-speed, secure, and scale-up ready cloud hosting performance."
                : "Platform pembuatan website instan bertenaga AI dengan performa cloud hosting berkecepatan tinggi, aman, dan siap scale-up."}
            </p>

            {/* 5 Social / Contact Action Buttons in rounded-square containers */}
            <div className="flex items-center gap-2.5 pt-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex size-10 items-center justify-center rounded-2xl border border-slate-200/90 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#45a02e]/50 hover:bg-[#f0f9ea]/60 hover:text-[#45a02e] cursor-pointer"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Spacer Column on Large screens */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Column 2: Navigasi / Navigation */}
          <div className="md:col-span-2 lg:col-span-2 text-left">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-4 sm:mb-5">
              {isEn ? "Navigation" : "Navigasi"}
            </h4>
            <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm font-medium text-slate-600">
              <li>
                <SmartNavLink href="#hero" className="transition-colors hover:text-[#45a02e]">
                  {isEn ? "Home" : "Beranda"}
                </SmartNavLink>
              </li>
              <li>
                <SmartNavLink href="#services" className="transition-colors hover:text-[#45a02e]">
                  {isEn ? "Services" : "Layanan"}
                </SmartNavLink>
              </li>
              <li>
                <SmartNavLink href="#featured-solutions" className="transition-colors hover:text-[#45a02e]">
                  {isEn ? "Solutions" : "Solusi"}
                </SmartNavLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Layanan / Services */}
          <div className="md:col-span-2 lg:col-span-2 text-left">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-4 sm:mb-5">
              {isEn ? "Services" : "Layanan"}
            </h4>
            <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm font-medium text-slate-600">
              <li>
                <SmartNavLink href="#services" className="transition-colors hover:text-[#45a02e]">
                  {isEn ? "Website Development" : "Pengembangan Website"}
                </SmartNavLink>
              </li>
              <li>
                <SmartNavLink href="#services" className="transition-colors hover:text-[#45a02e]">
                  {isEn ? "Mobile Apps" : "Aplikasi Mobile"}
                </SmartNavLink>
              </li>
              <li>
                <SmartNavLink href="#services" className="transition-colors hover:text-[#45a02e]">
                  {isEn ? "ERP Solutions" : "Solusi ERP"}
                </SmartNavLink>
              </li>
              <li>
                <SmartNavLink href="#services" className="transition-colors hover:text-[#45a02e]">
                  {isEn ? "Custom Software" : "Software Kustom"}
                </SmartNavLink>
              </li>
            </ul>
          </div>

          {/* Column 4: Bantuan / Help & Support */}
          <div className="md:col-span-3 lg:col-span-3 text-left">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-4 sm:mb-5">
              {isEn ? "Help & Support" : "Bantuan"}
            </h4>
            <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm font-medium text-slate-600">
              <li>
                <SmartNavLink href="#contact" className="transition-colors hover:text-[#45a02e]">
                  {isEn ? "Help Center" : "Pusat Bantuan"}
                </SmartNavLink>
              </li>
              <li>
                <SmartNavLink href="#contact" className="transition-colors hover:text-[#45a02e]">
                  {isEn ? "Terms & Conditions" : "Syarat & Ketentuan"}
                </SmartNavLink>
              </li>
              <li>
                <SmartNavLink href="#contact" className="transition-colors hover:text-[#45a02e]">
                  {isEn ? "Contact Us" : "Hubungi Kami"}
                </SmartNavLink>
              </li>
              <li>
                <SmartNavLink href="#contact" className="transition-colors hover:text-[#45a02e]">
                  FAQ
                </SmartNavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-slate-200/80 pt-6 sm:pt-7" />

        {/* Bottom Bar: Copyright (Left) & Legal Links (Right) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500">
          <p className="text-center sm:text-left font-normal">
            {isEn
              ? "© 2026 Bidtech. All rights reserved."
              : "© 2026 Bidtech. Seluruh hak cipta dilindungi undang-undang."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 font-normal">
            <SmartNavLink href="#contact" className="hover:text-[#45a02e] transition-colors">
              {isEn ? "Terms & Conditions" : "Syarat & Ketentuan"}
            </SmartNavLink>
            <SmartNavLink href="#contact" className="hover:text-[#45a02e] transition-colors">
              {isEn ? "Privacy Policy" : "Kebijakan Privasi"}
            </SmartNavLink>
            <SmartNavLink href="#contact" className="hover:text-[#45a02e] transition-colors">
              {isEn ? "Cloud Security" : "Keamanan Cloud"}
            </SmartNavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
