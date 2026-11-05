import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["id", "en"] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = "id";

function getLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale === "en" || cookieLocale === "id") {
    return cookieLocale;
  }
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Ignore internal/static files that might pass matcher
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/logo") ||
    pathname.startsWith("/shared") ||
    pathname.startsWith("/demo") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 1. Root path "/" -> redirect to /id or /en based on cookie/default
  if (pathname === "/" || pathname === "") {
    const locale = getLocale(request);
    const url = new URL(`/${locale}${search}`, request.url);
    return NextResponse.redirect(url, 307);
  }

  // 2. Check if pathname starts with a supported locale (/id or /en)
  const pathnameIsMissingLocale = LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 3. If missing locale prefix (e.g. /template-website), redirect to /<locale>/<path>
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    const url = new URL(`/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}${search}`, request.url);
    return NextResponse.redirect(url, 307);
  }

  // 4. Request has a valid locale prefix (/id or /en)
  const currentLocale = pathname.startsWith("/en") ? "en" : "id";
  const response = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  });
  response.headers.set("x-locale", currentLocale);

  // Keep cookie in sync
  if (request.cookies.get("NEXT_LOCALE")?.value !== currentLocale) {
    response.cookies.set("NEXT_LOCALE", currentLocale, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images, logo, shared, demo (public media folders)
     * - favicon.ico, icon.png, manifest.webmanifest, robots.txt, sitemap.xml
     */
    "/((?!api|_next/static|_next/image|images|logo|shared|demo|favicon.ico|icon.png|manifest.webmanifest|robots.txt|sitemap.xml).*)",
  ],
};

