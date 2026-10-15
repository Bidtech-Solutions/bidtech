"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { useLanguage } from "@/lib/i18n";

interface UniversalCtaProps {
  className?: string;
  secondaryText?: string;
  secondaryHref?: string;
}

export function UniversalCta({
  className = "",
  secondaryText,
  secondaryHref,
}: UniversalCtaProps) {
  const { lang } = useLanguage();
  const pathname = usePathname();
  const isEn = lang === "en";

  const isPortfolioPage = pathname === "/portofolio";
  const defaultSecondaryHref = isPortfolioPage ? "/template-website" : "/portofolio";
  const defaultSecondaryText = isPortfolioPage
    ? isEn
      ? "Browse Templates"
      : "Lihat Template"
    : isEn
      ? "View Portfolio"
      : "Lihat Portofolio";

  const resolvedSecondaryHref = secondaryHref || defaultSecondaryHref;
  const resolvedSecondaryText = secondaryText || defaultSecondaryText;

  return (
    <section
      aria-labelledby="universal-cta-title"
      className={`landing-panel relative mx-auto max-w-7xl px-4 py-12 sm:px-5 sm:py-16 md:px-8 md:py-20 ${className}`}
      id="cta"
    >
      <Reveal y={24}>
        <div className="relative overflow-hidden rounded-[32px] border border-[#cdeec3] bg-[radial-gradient(ellipse_at_top_right,rgba(163,230,53,0.3),transparent_60%),linear-gradient(135deg,#f0faee_0%,#fbfefb_45%,#edf8eb_100%)] p-6 shadow-[0_24px_70px_rgba(95,201,74,0.14)] sm:rounded-[40px] sm:p-10 md:p-12 lg:py-14 lg:pl-14 lg:pr-0">
          <div className="grid grid-cols-1 items-center gap-10 lg:min-h-[470px] lg:grid-cols-12 lg:items-stretch lg:gap-8">
            {/* Left Content Column */}
            <div className="relative z-10 space-y-6 text-left lg:col-span-7 lg:self-center">
              <h2
                className="font-[family-name:var(--font-sora)] text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-slate-950 leading-[1.18]"
                id="universal-cta-title"
              >
                {isEn ? (
                  <>
                    Create Your Dream Website &amp; <br />
                    Application Together with <br />
                    <span className="text-[#45a02e]">BidTech</span>
                  </>
                ) : (
                  <>
                    Wujudkan Website &amp; <br />
                    Aplikasi Impian Bersama <br />
                    <span className="text-[#45a02e]">BidTech</span>
                  </>
                )}
              </h2>

              <p className="max-w-xl text-xs sm:text-sm sm:text-base leading-relaxed text-slate-600">
                {isEn
                  ? "Consult your digital business needs for free. From ready-to-use template selections to full customization, we are ready to help your business level up."
                  : "Konsultasikan kebutuhan digital bisnis Anda secara gratis. Dari pilihan template siap pakai hingga kustomisasi penuh, kami siap membantu bisnis Anda naik level."}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                {/* Primary Button: WhatsApp */}
                <a
                  href="https://wa.me/628217601455?text=Halo%20BidTech,%20saya%20ingin%20konsultasi%20pembuatan%20website%20dan%20aplikasi"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#45a02e] hover:bg-[#3d8e29] text-white px-6 sm:px-7 py-3.5 sm:py-4 text-sm font-bold shadow-[0_12px_28px_rgba(69,160,46,0.3)] transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer text-center"
                >
                  <svg className="size-4 fill-white shrink-0" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.394-10.416c-5.523 0-10 4.477-10 10 0 1.766.458 3.424 1.258 4.872l-1.336 4.887 5.011-1.314c1.401.764 3.003 1.198 4.707 1.198 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span>{isEn ? "Consult via WhatsApp" : "Konsultasi via WhatsApp"}</span>
                  <ArrowRight className="size-4" />
                </a>

                {/* Secondary Button */}
                <Link
                  href={resolvedSecondaryHref}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 px-6 sm:px-7 py-3.5 sm:py-4 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer text-center"
                >
                  <span>{resolvedSecondaryText}</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              {/* Bottom Checklist */}
              <div className="pt-6 border-t border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="text-[#45a02e] font-bold text-sm">✓</span>
                  <span>{isEn ? "Fast Response < 15 Minutes" : "Respon Cepat < 15 Menit"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#45a02e] font-bold text-sm">✓</span>
                  <span>
                    {isEn
                      ? "100% Free Consultation & No Commitment"
                      : "Konsultasi 100% Gratis & Tanpa Komitmen"}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <span className="text-[#45a02e] font-bold text-sm">✓</span>
                  <span>{isEn ? "Maintenance Guarantee" : "Garansi Maintenance"}</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="relative flex min-h-[420px] items-center justify-center pt-6 sm:min-h-[500px] lg:absolute lg:inset-y-0 lg:right-0 lg:w-[43%] lg:min-h-0 lg:pt-0">
              <div className="relative h-[420px] w-full max-w-[440px] sm:h-[500px] sm:max-w-[480px] lg:absolute lg:inset-0 lg:h-auto lg:max-w-none">
                {/* Main CTA Visual */}
                <div className="relative h-full w-full origin-bottom filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.14)] max-sm:translate-y-6 max-sm:scale-[1.12]">
                  <Image
                    src="/images/cta/model-8.webp"
                    alt="Konsultan BidTech menunjukkan website di ponsel"
                    fill
                    sizes="(min-width: 1024px) 500px, (min-width: 640px) 480px, 90vw"
                    className="object-contain object-bottom"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
