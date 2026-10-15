"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  detectVisitorLocale,
  getLocalizedPath,
  LANGUAGE_PREFERENCE_KEY,
  LOCALES,
  type Locale,
} from "@/lib/i18n";

interface LocaleRedirectProps {
  locale: Locale;
  detectBrowserLocale?: boolean;
}

export default function LocaleRedirect({ locale, detectBrowserLocale = false }: LocaleRedirectProps) {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
      const secureFlag = isHttps ? "; Secure" : "";

      // 1. Jika pengguna saat ini sedang berada di rute bahasa spesifik (misal /en, /en-sg, /ms),
      // maka rute tersebut adalah kehendak aktif pengguna. Sinkronkan preferensi lokal ke bahasa ini
      // dan JANGAN PERNAH dialihkan ke rute lain.
      if (locale !== "id" || pathname.startsWith("/en") || pathname.startsWith("/ms")) {
        window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, locale);
        document.cookie = `${LANGUAGE_PREFERENCE_KEY}=${locale}; path=/; max-age=31536000; SameSite=Lax${secureFlag}`;
        return;
      }

      // 2. Jika berada di rute default (ID / tanpa prefix), cek apakah pengguna punya preferensi manual tersimpan
      const getCookieLocale = (): Locale | null => {
        if (typeof document === "undefined") return null;
        const match = document.cookie.match(new RegExp(`(?:^|; )${LANGUAGE_PREFERENCE_KEY}=([^;]*)`));
        const val = match ? decodeURIComponent(match[1]).trim().replace(/^["']|["']$/g, "").toLowerCase() : null;
        return (LOCALES as readonly string[]).includes(val as Locale) ? (val as Locale) : null;
      };

      const storedLocale =
        ((window.localStorage.getItem(LANGUAGE_PREFERENCE_KEY) as Locale | null)?.toLowerCase() as Locale | null) ||
        getCookieLocale();

      // Jika pengguna pernah memilih bahasa selain ID, arahkan ke rute bahasa tersebut
      if (storedLocale && storedLocale !== "id" && (LOCALES as readonly string[]).includes(storedLocale)) {
        window.location.assign(getLocalizedPath(storedLocale, pathname));
        return;
      }

      // 3. Jika pengguna belum pernah memilih bahasa manual dan auto-detection diaktifkan (hanya pada root /)
      if (!detectBrowserLocale || storedLocale === "id") return;

      // Cek apakah Timezone perangkat adalah Indonesia
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      const isIndonesianTz =
        tz === "Asia/Jakarta" ||
        tz === "Asia/Pontianak" ||
        tz === "Asia/Makassar" ||
        tz === "Asia/Jayapura" ||
        tz.includes("Jakarta") ||
        tz.includes("Makassar") ||
        tz.includes("Jayapura");

      // Jika timezone pengguna adalah Indonesia, kunci ke 'id' dan jangan redirect
      if (isIndonesianTz) {
        window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, "id");
        document.cookie = `${LANGUAGE_PREFERENCE_KEY}=id; path=/; max-age=31536000; SameSite=Lax${secureFlag}`;
        return;
      }

      // Deteksi instan untuk turis SG atau MY via timezone
      if (tz === "Asia/Singapore") {
        window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, "en-sg");
        document.cookie = `${LANGUAGE_PREFERENCE_KEY}=en-sg; path=/; max-age=31536000; SameSite=Lax${secureFlag}`;
        window.location.assign(getLocalizedPath("en-sg", pathname));
        return;
      }
      if (tz === "Asia/Kuala_Lumpur" || tz === "Asia/Kuching") {
        window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, "ms");
        document.cookie = `${LANGUAGE_PREFERENCE_KEY}=ms; path=/; max-age=31536000; SameSite=Lax${secureFlag}`;
        window.location.assign(getLocalizedPath("ms", pathname));
        return;
      }

      // 4. Verifikasi Geo-IP (Prioritas utama IP orang Indonesia agar langsung Bahasa Indonesia)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      fetch("https://api.country.is", { signal: controller.signal })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          clearTimeout(timeoutId);
          if (!data || !data.country) return;
          const country = String(data.country).toUpperCase();

          // Jika IP terdeteksi berasal dari Indonesia (ID): Tetap di Bahasa Indonesia
          if (country === "ID") {
            window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, "id");
            document.cookie = `${LANGUAGE_PREFERENCE_KEY}=id; path=/; max-age=31536000; SameSite=Lax${secureFlag}`;
            return;
          }

          let geoLocale: Locale | null = null;
          if (country === "SG") geoLocale = "en-sg";
          else if (country === "MY") geoLocale = "ms";
          else {
            const detected = detectVisitorLocale();
            if (detected !== "id") geoLocale = detected;
          }

          if (geoLocale) {
            window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, geoLocale);
            document.cookie = `${LANGUAGE_PREFERENCE_KEY}=${geoLocale}; path=/; max-age=31536000; SameSite=Lax${secureFlag}`;
            window.location.assign(getLocalizedPath(geoLocale, pathname));
          }
        })
        .catch(() => {
          // Jika Geo-IP offline/timeout, default tetap Bahasa Indonesia
        });

      return () => clearTimeout(timeoutId);
    } catch {
      // Abaikan jika browser storage tidak tersedia
    }
  }, [detectBrowserLocale, locale, pathname]);

  return null;
}
