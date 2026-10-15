"use client";

import { useRouter } from "next/navigation";
import { DynamicNavbar } from "@/components/ui/dynamic-navbar";
import { useLanguage } from "@/components/providers/language-provider";

export function Navbar() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <DynamicNavbar
      brand="Deny Restaurant"
      items={[
        { label: t("Menu", "Menu"), href: "/menu" },
        { label: t("Staf & Koki", "Staff & Chefs"), href: "/staff" },
        { label: t("Cerita Kami", "Our Story"), href: "/story" },
      ]}
      ctaLabel={t("Pesan Sekarang", "Order Now")}
      onCtaClick={() => router.push("/menu")}
    />
  );
}
