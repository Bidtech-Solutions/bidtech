import { NextIntlClientProvider } from "next-intl";
import { Bebas_Neue, Inter } from "next/font/google";
import Script from "next/script";
import { cn } from "@/lib/utils";
import { getMessages, type Locale } from "@/lib/i18n";
import SmoothScroll from "@/components/providers/SmoothScroll";
import LocaleRedirect from "@/components/providers/LocaleRedirect";
import { LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";

const GOOGLE_ADS_ID = "AW-18510637052";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

interface RootDocumentProps {
  children: React.ReactNode;
  locale: Locale;
  detectBrowserLocale?: boolean;
}

export default function RootDocument({ children, locale, detectBrowserLocale = false }: RootDocumentProps) {
  return (
    <html lang={locale} className={cn("font-sans", inter.variable, bebasNeue.variable)}>
      <head>
        <LocalBusinessJsonLd locale={locale} />
        <WebSiteJsonLd locale={locale} />
        <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
      </head>
      <body className="bg-white text-gray-900">
        <NextIntlClientProvider locale={locale} messages={getMessages(locale)}>
          <LocaleRedirect locale={locale} detectBrowserLocale={detectBrowserLocale} />
          <SmoothScroll>{children}</SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
