import { NextResponse, type NextRequest } from "next/server";
import { LANGUAGE_PREFERENCE_KEY, LOCALES, type Locale } from "@/lib/i18n";

/**
 * Mendapatkan origin publik yang sesungguhnya (mengatasi reverse proxy Nginx / Docker
 * agar tidak me-redirect ke 127.0.0.1:3040 yang menyebabkan blank page di browser pengunjung).
 */
function getPublicOrigin(request: NextRequest): string {
  const forwardedHost =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    request.nextUrl.host;
  const forwardedProto =
    request.headers.get("x-forwarded-proto") ||
    (request.url.startsWith("https") ? "https" : request.nextUrl.protocol.replace(":", ""));
  return `${forwardedProto}://${forwardedHost}`;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lewati file statis, aset Next, API, gambar, favicon, dsb.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icons") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const origin = getPublicOrigin(request);
  const isHttps = origin.startsWith("https") || process.env.NODE_ENV === "production";

  // 0. Cek parameter override ?lang= jika ada (misal dari share link / marketing)
  const langQuery = request.nextUrl.searchParams.get("lang")?.toLowerCase();
  if (langQuery && (LOCALES as readonly string[]).includes(langQuery)) {
    const cleanPath = pathname.replace(/^\/(en-sg|ms|en)(\/|$)/, "/") || "/";
    const targetPath =
      langQuery === "id"
        ? cleanPath
        : cleanPath === "/"
        ? `/${langQuery}`
        : `/${langQuery}${cleanPath}`;

    const redirectUrl = new URL(targetPath, origin);
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set(LANGUAGE_PREFERENCE_KEY, langQuery, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
      secure: isHttps,
    });
    return response;
  }

  // 1. Jika URL sudah memiliki prefix bahasa eksplisit (/en, /en-sg, /ms),
  // JANGAN PERNAH dialihkan ke URL lain! Pengguna sengaja mengakses bahasa tersebut.
  // Cukup sinkronkan cookie preferensi dengan locale URL aktif.
  const prefixMatch = pathname.match(/^\/(en-sg|ms|en)(\/|$)/);
  if (prefixMatch) {
    const currentLocale = prefixMatch[1] as Locale;
    const response = NextResponse.next();
    const rawCookie = request.cookies.get(LANGUAGE_PREFERENCE_KEY)?.value?.trim().toLowerCase();
    if (rawCookie !== currentLocale) {
      response.cookies.set(LANGUAGE_PREFERENCE_KEY, currentLocale, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
        sameSite: "lax",
        secure: isHttps,
      });
    }
    return response;
  }

  // 2. Cek preferensi cookie pengguna saat mengakses rute tanpa prefix (default ID)
  const rawCookie = request.cookies.get(LANGUAGE_PREFERENCE_KEY)?.value;
  const storedLocale = rawCookie?.trim().replace(/^["']|["']$/g, "").toLowerCase() as Locale | undefined;

  // Jika pengguna sebelumnya memilih bahasa asing dan sekarang membuka root '/',
  // arahkan ke bahasa pilihannya menggunakan public origin.
  if (storedLocale && storedLocale !== "id" && (LOCALES as readonly string[]).includes(storedLocale)) {
    if (pathname === "/") {
      const redirectUrl = new URL(`/${storedLocale}`, origin);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  // Jika preferensi adalah 'id', biarkan rute default tanpa redirect
  if (storedLocale === "id") {
    return NextResponse.next();
  }

  // 3. Jika belum ada preferensi sama sekali, auto-deteksi HANYA pada root '/'
  if (pathname === "/") {
    const country = (
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      request.geo?.country ||
      ""
    ).toUpperCase();

    // Jika terdeteksi IP Indonesia (ID), langsung tetapkan Bahasa Indonesia dan jangan redirect
    if (country === "ID") {
      const response = NextResponse.next();
      response.cookies.set(LANGUAGE_PREFERENCE_KEY, "id", {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
        sameSite: "lax",
        secure: isHttps,
      });
      return response;
    }

    if (country === "SG") {
      const response = NextResponse.redirect(new URL("/en-sg", origin));
      response.cookies.set(LANGUAGE_PREFERENCE_KEY, "en-sg", {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
        sameSite: "lax",
        secure: isHttps,
      });
      return response;
    }

    if (country === "MY") {
      const response = NextResponse.redirect(new URL("/ms", origin));
      response.cookies.set(LANGUAGE_PREFERENCE_KEY, "ms", {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
        sameSite: "lax",
        secure: isHttps,
      });
      return response;
    }

    // Cek Header Accept-Language browser (hanya jika negara bukan ID)
    if (country !== "ID") {
      const acceptLang = (request.headers.get("accept-language") || "").toLowerCase();

      // Jika browser memiliki preferensi Bahasa Indonesia
      if (acceptLang.includes("id") || acceptLang.startsWith("id-")) {
        const response = NextResponse.next();
        response.cookies.set(LANGUAGE_PREFERENCE_KEY, "id", {
          maxAge: 60 * 60 * 24 * 365,
          path: "/",
          sameSite: "lax",
          secure: isHttps,
        });
        return response;
      }

      if (acceptLang.includes("en-sg") || (acceptLang.includes("sg") && !acceptLang.includes("id"))) {
        const response = NextResponse.redirect(new URL("/en-sg", origin));
        response.cookies.set(LANGUAGE_PREFERENCE_KEY, "en-sg", {
          maxAge: 60 * 60 * 24 * 365,
          path: "/",
          sameSite: "lax",
          secure: isHttps,
        });
        return response;
      }

      if (
        acceptLang.startsWith("ms") ||
        acceptLang.includes("ms-my") ||
        acceptLang.includes("en-my") ||
        acceptLang.includes("-my")
      ) {
        const response = NextResponse.redirect(new URL("/ms", origin));
        response.cookies.set(LANGUAGE_PREFERENCE_KEY, "ms", {
          maxAge: 60 * 60 * 24 * 365,
          path: "/",
          sameSite: "lax",
          secure: isHttps,
        });
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
